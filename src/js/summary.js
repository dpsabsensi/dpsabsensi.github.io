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

import {
  isTanggalMerah
} from './holiday.js';

import {
  getHariKerjaSeharusnya,
  getHariKerjaSeharusnyaDariKalender
} from './workdays.js';

// Normalisasi log harian jadi array objek per tanggal
export function normalizeLogs(logs) {
  const result = [];

  for (const tanggal in logs) {
    const dayLogs = logs[tanggal];
    const jamMasuk = dayLogs.find(l => l.type === 'in')?.time || null;
    const jamKeluar = [...dayLogs].reverse().find(l => l.type === 'out')?.time || null;

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
      jamMasuk,
      jamKeluar,
      breaks,
      isEmpty: !jamMasuk && !jamKeluar,
      holiday: isTanggalMerah(tanggal)
    });
  }

  return result;
}

// Hitung rekap kerja berdasarkan log per user
export function calculateSummaryForUser(logs) {
  const semuaTanggal = logs.map(l => l.tanggal);
  const jamKerjaStart = parseTime(JAM_KERJA_MULAI);
  // Dengan:
  const tahun = semuaTanggal[0].split('-')[0];
  const bulan = semuaTanggal[0].split('-')[1];
  const hariKerjaIdeal = getHariKerjaSeharusnyaDariKalender(Number(tahun), Number(bulan));
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
    const tanggalLibur = isTanggalMerah(log.tanggal);
    const jamMasuk = parseTime(log.jamMasuk);
    const jamKeluar = parseTime(log.jamKeluar);
    const durasi = jamKeluar - jamMasuk;

    if (tanggalLibur) {
      libur++;
      if (!log.jamMasuk && !log.jamKeluar) continue;
    }

    if (jamMasuk === null || jamKeluar === null) {
      missing++;
      continue;
    }

    // Tercatat sebagai hari kerja valid
    hariKerjaTercatat.add(log.tanggal);

    totalWork += durasi;

    const telat = jamMasuk - jamKerjaStart;
    if (telat > TOLERANSI_MENIT) {
      totalTelat += telat;
      totalDendaTelat += hitungDendaTelat(telat);
    }

    const early = jamKerjaEnd - jamKeluar;
    if (early > TOLERANSI_MENIT) {
      totalEarly += early;
    }

    const lembur = jamKeluar - jamKerjaEnd;
    if (lembur > TOLERANSI_MENIT) {
      totalLembur += lembur;
    }

    totalBreak += log.breaks.reduce((a, b) => a + b, 0);
  }

  const absence = hariKerjaIdeal.filter(tgl => !hariKerjaTercatat.has(tgl)).length;
  const uangLemburKotor = Math.floor(totalLembur / 60) * TARIF_LEMBUR_PER_JAM;
  const uangLemburBersih = Math.max(uangLemburKotor - totalDendaTelat, 0);

  const jamKerjaIdeal = hariKerjaIdeal.reduce((total, tgl) => {
    const end = parseTime(isSabtu(tgl) ? JAM_KERJA_SELESAI_SABTU : JAM_KERJA_SELESAI);
    const start = parseTime(JAM_KERJA_MULAI);
    // const durasi = end - start;

    // console.log(`[AUDIT] ${tgl} ${isSabtu(tgl) ? '(Sabtu)' : ''} → ${durasi} menit`);

    return total + (end - start);
  }, 0);

  console.log('[AUDIT] Total menit kerja ideal:', jamKerjaIdeal, 'menit');
  console.log('[AUDIT] Total jam kerja ideal:', (jamKerjaIdeal / 60).toFixed(2), 'jam');

  return {
    workMinutes: totalWork,
    workHours: formatJamMenit(totalWork),
    lemburHours: formatJamMenit(totalLembur),
    uangLemburKotor,
    jamKerjaIdeal: formatJamMenit(jamKerjaIdeal),
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