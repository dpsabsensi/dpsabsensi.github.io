// summary.js
import {
  JAM_KERJA_MULAI,
  JAM_KERJA_SELESAI,
  JAM_KERJA_SELESAI_SABTU,
  TOLERANSI_MENIT,
  TARIF_LEMBUR_PER_JAM
} from './config.js';

import {
  parseTime,
  formatJamMenit,
  hitungDendaTelat,
  isSabtu
} from './utils.js';

import { isTanggalMerah } from './holiday.js';
import { getHariKerjaSeharusnyaDariKalender } from './workdays.js';

// Normalisasi log harian jadi array objek per tanggal
export function normalizeLogs(logs) {
  const result = [];

  for (const tanggal in logs) {
    const dayLogs = logs[tanggal];
    const jamMasuk = dayLogs.find(l => l.type === 'in')?.time || null;
    const jamKeluar = [...dayLogs].reverse().find(l => l.type === 'out')?.time || null;

    // Hitung break (jeda antara out → in)
    const breaks = [];
    for (let i = 0; i < dayLogs.length - 1; i++) {
      if (dayLogs[i].type === 'out' && dayLogs[i + 1].type === 'in') {
        const durasi = parseTime(dayLogs[i + 1].time) - parseTime(dayLogs[i].time);
        if (durasi > 0) breaks.push(durasi);
      }
    }

    result.push({
      tanggal,
      jamMasuk,
      jamKeluar,
      breaks,
      isEmpty: !jamMasuk && !jamKeluar,
      holiday: isTanggalMerah(tanggal)
    });
  }

  return result;
}

// Hitung rekap kerja per user
export function calculateSummaryForUser(logs) {
  if (!logs.length) return null;

  const semuaTanggal = logs.map(l => l.tanggal);
  const jamKerjaStart = parseTime(JAM_KERJA_MULAI);

  const [tahun, bulan] = semuaTanggal[0].split('-').map(Number);
  const hariKerjaIdeal = getHariKerjaSeharusnyaDariKalender(tahun, bulan);
  const hariKerjaTercatat = new Set();

  let totalWork = 0;
  let totalLembur = 0;
  let totalBreak = 0;
  let totalDendaTelat = 0;
  let totalTelat = 0;
  let totalEarly = 0;
  let missing = 0;
  let libur = 0;

  for (const log of logs) {
    const jamKerjaEnd = parseTime(isSabtu(log.tanggal) ? JAM_KERJA_SELESAI_SABTU : JAM_KERJA_SELESAI);
    const tanggalLibur = log.holiday;

    // Lewatin hari libur yang kosong
    if (tanggalLibur && !log.jamMasuk && !log.jamKeluar) {
      libur++;
      continue;
    }

    const jamMasuk = parseTime(log.jamMasuk);
    const jamKeluar = parseTime(log.jamKeluar);

    // Catat missing (hanya in/out)
    if (jamMasuk === null || jamKeluar === null) {
      missing++;
      continue;
    }

    // Masuk daftar kerja
    hariKerjaTercatat.add(log.tanggal);

    // Durasi kerja total
    const durasiKerja = jamKeluar - jamMasuk;
    totalWork += durasiKerja;

    // Telat
    const telat = jamMasuk - jamKerjaStart;
    if (telat > TOLERANSI_MENIT) {
      totalTelat += telat;
      totalDendaTelat += hitungDendaTelat(telat);
    }

    // Pulang cepat
    const early = jamKerjaEnd - jamKeluar;
    if (early > TOLERANSI_MENIT) {
      totalEarly += early;
    }

    // Lembur
    const lembur = jamKeluar - jamKerjaEnd;
    if (lembur > TOLERANSI_MENIT) {
      totalLembur += lembur;
    }

    // Break total
    totalBreak += log.breaks.reduce((a, b) => a + b, 0);
  }

  // Absence = hari kerja ideal tapi tidak tercatat
  const absence = hariKerjaIdeal.filter(tgl => !hariKerjaTercatat.has(tgl)).length;

  // Hitung uang lembur
  const uangLemburKotor = Math.floor(totalLembur / 60) * TARIF_LEMBUR_PER_JAM;
  const uangLemburBersih = Math.max(uangLemburKotor - totalDendaTelat, 0);

  // Jam kerja ideal total
  const jamKerjaIdeal = hariKerjaIdeal.reduce((total, tgl) => {
    const end = parseTime(isSabtu(tgl) ? JAM_KERJA_SELESAI_SABTU : JAM_KERJA_SELESAI);
    return total + (end - jamKerjaStart);
  }, 0);

  // Debug log (opsional)
  console.log(`📊 Lembur: ${formatJamMenit(totalLembur)}, Kotor: Rp${uangLemburKotor}, Denda: Rp${totalDendaTelat}, Bersih: Rp${uangLemburBersih}`);

  return {
    jamKerjaIdeal: formatJamMenit(jamKerjaIdeal),
    workMinutes: totalWork,
    workHours: formatJamMenit(totalWork),
    lemburHours: formatJamMenit(totalLembur),
    uangLemburKotor,
    dendaTelat: totalDendaTelat,
    uangLembur: uangLemburBersih,
    telatHours: formatJamMenit(totalTelat),
    earlyOutHours: formatJamMenit(totalEarly),
    absenceDays: absence,
    missingDays: missing,
    holidayDays: libur,
    breakHours: formatJamMenit(totalBreak),
  };
}
