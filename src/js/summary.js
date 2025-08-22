// summary.js
import {
  JAM_KERJA_MULAI,
  JAM_KERJA_SELESAI,
  JAM_KERJA_SELESAI_SABTU,
  TOLERANSI_MENIT,
  TARIF_LEMBUR_PER_JAM
} from './config.js';
import { parseTime, formatJamMenit, hitungDendaTelat, isSabtu, toYmd } from './utils.js';

/**
 * Normalisasi log harian
 */
export function normalizeLogs(days) {
  return Object.entries(days).map(([tanggal, info]) => {
    const logs = info.l || []; // compact enum logs
    let jamMasuk = null;
    let jamKeluar = null;
    const breaks = [];

    logs.forEach((l, idx) => {
      const [time, type] = l;
      if (type === 0 && !jamMasuk) jamMasuk = time; // IN
      if (type === 1) jamKeluar = time; // OUT

      // BREAK_OUT -> BREAK_IN
      if (idx < logs.length - 1) {
        const [nextTime, nextType] = logs[idx + 1];
        if (type === 3 && nextType === 2) {
          const durasi = parseTime(nextTime) - parseTime(time);
          if (durasi > 0) breaks.push(durasi);
        }
      }
    });

    return {
      tanggal: toYmd(tanggal),
      jamMasuk,
      jamKeluar,
      breaks,
      isEmpty: !jamMasuk && !jamKeluar,
      holiday: info.s === 2, // status L = libur
      status: info.s
    };
  });
}

/**
 * Hitung jam kerja bersih dari log array
 */
export function hitungJamKerjaBersih(logArray) {
  const jamMasuk = logArray.find(l => l.type === 0)?.time || null;
  const jamKeluar = [...logArray].reverse().find(l => l.type === 1)?.time || null;
  if (!jamMasuk || !jamKeluar) return 0;

  const breaks = [];
  for (let i = 0; i < logArray.length - 1; i++) {
    const [t1, type1] = logArray[i];
    const [t2, type2] = logArray[i + 1];
    if (type1 === 3 && type2 === 2) {
      const durasi = parseTime(t2) - parseTime(t1);
      if (durasi > 0) breaks.push(durasi);
    }
  }

  return (parseTime(jamKeluar) - parseTime(jamMasuk) - breaks.reduce((a,b)=>a+b,0)) / 60;
}

/**
 * Hitung summary tanpa fetch lagi
 */
export async function calculateSummaryForUser(logs) {
  if (!logs || logs.length === 0) return {
    workMinutes:0, workHours:"0j 0m", lemburHours:"0j 0m",
    uangLemburKotor:0, jamKerjaIdeal:"0j 0m", dendaTelat:0,
    uangLembur:0, telatHours:"0j 0m", earlyOutHours:"0j 0m",
    absenceDays:0, missingDays:0, holidayDays:0, breakHours:"0j 0m"
  };

  let totalWork=0, totalLembur=0, totalBreak=0, totalDenda=0;
  let totalTelat=0, totalEarly=0, missing=0, libur=0;
  const hariKerjaTercatat = new Set();

  const dendaPerHari = []; // 🔑 array buat log

  logs.forEach(log => {
    if (log.holiday && !log.jamMasuk && !log.jamKeluar) {
      libur++; 
      return; 
    }
    hariKerjaTercatat.add(log.tanggal);

    if (!log.jamMasuk || !log.jamKeluar) {
      missing++; 
      return; 
    }

    const jamMasuk = parseTime(log.jamMasuk);
    const jamKeluar = parseTime(log.jamKeluar);
    const jamKerjaEnd = parseTime(isSabtu(log.tanggal) ? JAM_KERJA_SELESAI_SABTU : JAM_KERJA_SELESAI);
    const durasi = jamKeluar - jamMasuk;
    totalWork += durasi;

    // ✅ Denda telat per hari
    const telat = jamMasuk - parseTime(JAM_KERJA_MULAI);
    if (telat > TOLERANSI_MENIT) {
      totalTelat += telat;
      const dendaHariIni = hitungDendaTelat(telat);
      totalDenda += dendaHariIni;
    }

    // Early out
    const early = jamKerjaEnd - jamKeluar;
    if (early > TOLERANSI_MENIT) totalEarly += early;

    // Lembur
    const lembur = jamKeluar - jamKerjaEnd;
    if (lembur > TOLERANSI_MENIT) {
      totalLembur += lembur;
    }

    // Break
    const totalBreakHariIni = log.breaks.reduce((a,b)=>a+b,0);
    totalBreak += totalBreakHariIni;
  });

  const absence = logs.filter(l => !l.holiday && l.isEmpty).length;

  const uangLemburKotor = Math.floor(totalLembur/60)*TARIF_LEMBUR_PER_JAM;
  const uangLembur = Math.max(uangLemburKotor-totalDenda,0);

  const jamKerjaIdeal = logs.reduce((sum, log) => {
    if (log.holiday) return sum;
    const end = parseTime(isSabtu(log.tanggal) ? JAM_KERJA_SELESAI_SABTU : JAM_KERJA_SELESAI);
    const start = parseTime(JAM_KERJA_MULAI);
    return sum + (end-start);
  },0);

  return {
    workMinutes: totalWork,
    workHours: formatJamMenit(totalWork),
    lemburHours: formatJamMenit(totalLembur),
    uangLemburKotor,
    jamKerjaIdeal: formatJamMenit(jamKerjaIdeal),
    dendaTelat: totalDenda,
    uangLembur,
    telatHours: formatJamMenit(totalTelat),
    earlyOutHours: formatJamMenit(totalEarly),
    absenceDays: absence,
    missingDays: missing,
    holidayDays: libur,
    breakHours: formatJamMenit(totalBreak),
    dendaPerHari,
  };
}