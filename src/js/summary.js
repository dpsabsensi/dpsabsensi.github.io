// summaryUtils.js
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

// Normalisasi log harian jadi array objek per tanggal
export function normalizeLogs(logs) {
  const result = [];

  for (const tanggal in logs) {
    const dayLogs = logs[tanggal];
    const masuk = dayLogs.find(l => l.type === 'in')?.time || null;
    const keluar = [...dayLogs].reverse().find(l => l.type === 'out')?.time || null;

    // Hitung break sebagai jeda antara out → in
    const breaks = [];
    for (let i = 0; i < dayLogs.length - 1; i++) {
      if (dayLogs[i].type === 'out' && dayLogs[i + 1].type === 'in') {
        const durasi = parseTime(dayLogs[i + 1].time) - parseTime(dayLogs[i].time);
        if (durasi > 0) breaks.push(durasi);
      }
    }

    result.push({
      tanggal,
      masuk,
      keluar,
      breaks
    });
  }

  return result;
}

// Hitung rekap kerja berdasarkan log per user
export function calculateSummaryForUser(logs) {
  let totalWork = 0;
  let totalLembur = 0;
  let totalBreak = 0;
  let totalDendaTelat = 0;
  let totalTelat = 0;
  let totalEarly = 0;
  let absence = 0;

  for (const log of logs) {
    const jamKerjaStart = parseTime(JAM_KERJA_MULAI);
    const jamKerjaEnd = parseTime(isSabtu(log.tanggal) ? JAM_KERJA_SELESAI_SABTU : JAM_KERJA_SELESAI);

    if (!log.masuk || !log.keluar) {
      absence++;
      continue;
    }

    const masuk = parseTime(log.masuk);
    const keluar = parseTime(log.keluar);
    const durasi = keluar - masuk;

    totalWork += durasi;

    const telat = masuk - jamKerjaStart;
    if (telat > TOLERANSI_MENIT) {
      totalTelat += telat;
      totalDendaTelat += hitungDendaTelat(telat);
    }

    const early = jamKerjaEnd - keluar;
    if (early > TOLERANSI_MENIT) {
      totalEarly += early;
    }

    const lembur = keluar - jamKerjaEnd;
    if (lembur > TOLERANSI_MENIT) {
      totalLembur += lembur;
    }

    totalBreak += log.breaks.reduce((a, b) => a + b, 0);
  }

  const uangLemburKotor = Math.floor(totalLembur / 60) * TARIF_LEMBUR_PER_JAM;
  const uangLemburBersih = Math.max(0, uangLemburKotor - totalDendaTelat); // Tidak boleh negatif

  return {
    workMinutes: totalWork,
    workHours: formatJamMenit(totalWork),
    lemburHours: formatJamMenit(totalLembur),
    uangLemburKotor,
    dendaTelat: totalDendaTelat,
    uangLembur: uangLemburBersih,
    telatHours: formatJamMenit(totalTelat),
    earlyOutHours: formatJamMenit(totalEarly),
    absenceDays: absence,
    breakHours: formatJamMenit(totalBreak),
  };
}