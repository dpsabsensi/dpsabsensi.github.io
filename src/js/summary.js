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
      const durasi = t2 - t1;
      if (durasi > 0) breaks.push(durasi);
    }
  }

  return (jamKeluar - jamMasuk - breaks.reduce((a,b)=>a+b,0)) / 60;
}

/**
 * Hitung summary tanpa fetch lagi
 */
export async function calculateSummaryForUser(logs, ideal, nama = "") {
  if (!logs || logs.length === 0) return {
    workMinutes:0, workHours:"00:00", lemburHours:"00:00",
    uangLemburKotor:0, jamKerjaIdeal:"00:00", dendaTelat:0,
    uangLembur:0, telatHours:"00:00", earlyOutHours:"00:00",
    absenceDays:0, missingDays:0, holidayDays:0, breakHours:"00:00"
  };

  let totalWork=0, totalLembur=0, totalBreak=0, totalDenda=0;
  let totalTelat=0, totalEarly=0, missing=0, libur=0;
  const hariKerjaTercatat = new Set();

  const dendaPerHari = []; // 🔑 array buat log
  const lemburPerHari = [];

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

    const jamMasuk = log.jamMasuk;
    const jamKeluar = log.jamKeluar;

    // 🔑 tentukan jam kerja selesai sesuai hari
    const jamKerjaEnd = isSabtu(log.tanggal) 
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

    // console.log({
    //   tanggal: log.tanggal,
    //   jamMasuk,
    //   jamKeluar,
    //   jamKerjaEnd,
    //   totalBreak,
    //   breakHariIni: formatJamMenit(totalBreakHariIni),
    //   lembur: formatJamMenit(Math.max(jamKeluar - jamKerjaEnd, 0))
    // });
  });

  const absence = logs.filter(l => !l.holiday && l.isEmpty).length;
  const uangLemburKotor = Math.floor(totalLembur/60)*TARIF_LEMBUR_PER_JAM;
  const uangLembur = Math.max(uangLemburKotor-totalDenda,0);

  const x=totalWork-ideal.minutes;
  if (ideal) {
    const rumus = lemburPerHari.map(l => l.lembur).join(" + ");
    const total = lemburPerHari.reduce((a, b) => a + b.lembur, 0);
    console.log(`[ ${nama} ]
      Total Kerja  : ${formatJamMenit(totalWork)} (${totalWork} menit),
      Selisih      : ${formatJamMenit(x)} (${x} menit)
      Lembur Harian: ${rumus} = ${total} menit (${formatJamMenit(total)})`);
  }

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