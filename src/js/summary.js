// summary.js
import {
  JAM_KERJA_MULAI,
  JAM_KERJA_SELESAI,
  JAM_KERJA_SELESAI_SABTU,
  TOLERANSI_MENIT,
  TARIF_LEMBUR_PER_JAM
} from './config.js';
import { formatJamMenit, isSabtu, hitungDendaTelat } from './utils.js';

/*
  Normalisasi log harian
*/
export function normalizeLogs(days) {
  if (!Array.isArray(days)) {
    console.warn("normalizeLogs: input bukan array", days);
    return [];
  }

  return days.map((info, index) => {
    const tanggal = index + 1;

    if (typeof info === "number") {
      return {
        tanggal,
        jamMasuk: null,
        jamKeluar: null,
        breaks: [],
        isEmpty: true,
        holiday: info === 2,
        status: info
      };
    }

    const logs = info.l || [];
    let jamMasuk = null;
    let jamKeluar = null;
    const breaks = [];

    logs.forEach((l, idx) => {
      const [time, type] = l;
      if (type === 0 && !jamMasuk) jamMasuk = time; // IN
      if (type === 1) jamKeluar = time;             // OUT

      if (idx < logs.length - 1) {
        const [nextTime, nextType] = logs[idx + 1];
        if (type === 2 && nextType === 3) {
          const durasi = nextTime - time;
          if (durasi > 0) breaks.push(durasi);
        }
      }
    });

    return {
      tanggal,
      jamMasuk,
      jamKeluar,
      breaks,
      isEmpty: !jamMasuk && !jamKeluar,
      holiday: info.s === 2,
      status: info.s
    };
  });
}

/**
 * Hitung summary tanpa fetch lagi
 */
export async function calculateSummaryForUser(logs, year, month) {
  if (!logs || logs.length === 0) return {
    workMinutes:0, workHours:"00:00", lemburHours:"00:00",
    uangLemburKotor:0, jamKerjaIdeal:"00:00", dendaTelat:0,
    uangLembur:0, telatHours:"00:00", earlyOutHours:"00:00",
    absenceDays:0, missingDays:0, holidayDays:0, breakHours:"00:00"
  };

  let totalWork=0, totalLembur=0, totalBreak=0, totalDenda=0;
  let totalTelat=0, totalEarly=0, missing=0, libur=0;
  const hariKerjaTercatat = new Set();

  const dendaPerHari = [];
  const lemburPerHari = [];

  // Mendapatkan tanggal, bulan, dan tahun saat ini
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  // Menentukan batas tanggal untuk perhitungan
  const batasTanggal = (year === currentYear && month === currentMonth) ? currentDay : 31;

  logs.forEach(log => {
    // Abaikan hari-hari di luar batas tanggal jika bulan ini
    if (log.tanggal > batasTanggal) {
      return;
    }

    if (log.holiday && !log.jamMasuk && !log.jamKeluar) {
      libur++; 
      return; 
    }
    hariKerjaTercatat.add(log.tanggal);

    if (!log.jamMasuk || !log.jamKeluar) {
      missing++; 
      return; 
    }

    const jamMasuk = log.jamMasuk;
    const jamKeluar = log.jamKeluar;

    // 🔑 tentukan jam kerja selesai sesuai hari
    const jamKerjaEnd = isSabtu(year, month, log.tanggal) 
      ? JAM_KERJA_SELESAI_SABTU 
      : JAM_KERJA_SELESAI;

    const durasi = jamKeluar - jamMasuk;
    totalWork += durasi;

    // ✅ Denda telat per hari
    const telat = jamMasuk - JAM_KERJA_MULAI;
    if (telat > TOLERANSI_MENIT) {
      totalTelat += telat;
      const dendaHariIni = hitungDendaTelat(telat);
      totalDenda += dendaHariIni;
      dendaPerHari.push({ tanggal: log.tanggal, telat, denda: dendaHariIni });
    }

    // Early out
    const early = jamKerjaEnd - jamKeluar;
    if (early > TOLERANSI_MENIT) totalEarly += early;

    // ✅ Lembur: hanya hitung di atas jam kerja selesai
    const lembur = jamKeluar - jamKerjaEnd;
    if (lembur > TOLERANSI_MENIT) {
      totalLembur += lembur;
      lemburPerHari.push({ tanggal: log.tanggal, lembur });
    }

    // Break
    const totalBreakHariIni = log.breaks.reduce((a,b)=>a+b,0);
    totalBreak += totalBreakHariIni;
  });

  const absence = logs.filter(l => !l.holiday && l.isEmpty && l.tanggal <= batasTanggal).length;
  const uangLemburKotor = Math.floor(totalLembur/60)*TARIF_LEMBUR_PER_JAM;
  const uangLembur = Math.max(uangLemburKotor-totalDenda,0);

  return {
    workMinutes: totalWork,
    workHours: formatJamMenit(totalWork),
    lemburHours: formatJamMenit(totalLembur),
    uangLemburKotor,
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