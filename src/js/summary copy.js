// summary.js
import {
  JAM_KERJA_MULAI,
  JAM_KERJA_SELESAI,
  JAM_KERJA_SELESAI_SABTU,
  TOLERANSI_MENIT,
  TARIF_LEMBUR_PER_JAM
} from './config.js';

import { parseTime, formatJamMenit, hitungDendaTelat, isSabtu } from './utils.js';
import { isTanggalMerah, fetchTanggalMerah } from './holiday.js';
import { listWorkdays } from './workdays.js';

export function normalizeLogs(logs) {
  const result = [];
  for (const tanggal in logs) {
    const dayLogs = logs[tanggal];
    const jamMasuk = dayLogs.find(l => l.type === 'in')?.time || null;
    const jamKeluar = [...dayLogs].reverse().find(l => l.type === 'out')?.time || null;

    const breaks = [];
    for (let i = 0; i < dayLogs.length - 1; i++) {
      if (dayLogs[i].type === 'break-out' && dayLogs[i + 1].type === 'break-in') {
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

export function hitungJamKerjaBersih(logArray) {
  const jamMasuk = logArray.find(l => l.type === 'in')?.time || null;
  const jamKeluar = [...logArray].reverse().find(l => l.type === 'out')?.time || null;

  if (!jamMasuk || !jamKeluar) return 0;

  const breaks = [];
  for (let i = 0; i < logArray.length - 1; i++) {
    if (logArray[i].type === 'break-out' && logArray[i + 1].type === 'break-in') {
      const durasi = parseTime(logArray[i + 1].time) - parseTime(logArray[i].time);
      if (durasi > 0) breaks.push(durasi);
    }
  }

  const jamMasukMenit = parseTime(jamMasuk);
  const jamKeluarMenit = parseTime(jamKeluar);
  const totalBreak = breaks.reduce((a, b) => a + b, 0);
  const durasiMenit = jamKeluarMenit - jamMasukMenit - totalBreak;

  return durasiMenit / 60; // hasil jam desimal
}

export async function calculateSummaryForUser(logs) {
  if (!logs || logs.length === 0) {
    return {
      workMinutes: 0,
      workHours: "0j 0m",
      lemburHours: "0j 0m",
      uangLemburKotor: 0,
      jamKerjaIdeal: "0j 0m",
      dendaTelat: 0,
      uangLembur: 0,
      telatHours: "0j 0m",
      earlyOutHours: "0j 0m",
      absenceDays: 0,
      missingDays: 0,
      holidayDays: 0,
      breakHours: "0j 0m",
    };
  }

  const semuaTanggal = logs.map(l => l.tanggal);
  const jamKerjaStart = parseTime(JAM_KERJA_MULAI);
  const firstDate = new Date(semuaTanggal[0]);
  const tahun = firstDate.getFullYear();
  const bulan = semuaTanggal[0].split('-')[1];

  await fetchTanggalMerah(tahun);

  const hariKerjaIdeal = await listWorkdays(tahun, bulan);
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
    const tanggalLibur = isTanggalMerah(log.tanggal);
    if (tanggalLibur && !log.jamMasuk && !log.jamKeluar) {
      libur++;
      continue;
    }

    if (!log.jamMasuk || !log.jamKeluar) {
      missing++;
      continue;
    }

    const jamMasuk = parseTime(log.jamMasuk);
    const jamKeluar = parseTime(log.jamKeluar);
    const jamKerjaEnd = parseTime(isSabtu(log.tanggal) ? JAM_KERJA_SELESAI_SABTU : JAM_KERJA_SELESAI);
    const durasi = jamKeluar - jamMasuk;

    hariKerjaTercatat.add(log.tanggal);
    totalWork += durasi;

    const telat = jamMasuk - jamKerjaStart;
    if (telat > TOLERANSI_MENIT) {
      totalTelat += telat;
      totalDendaTelat += hitungDendaTelat(telat);
    }

    const early = jamKerjaEnd - jamKeluar;
    if (early > TOLERANSI_MENIT) totalEarly += early;

    const lembur = jamKeluar - jamKerjaEnd;
    if (lembur > TOLERANSI_MENIT) totalLembur += lembur;

    totalBreak += log.breaks.reduce((a, b) => a + b, 0);
  }

  const absenceList = hariKerjaIdeal.filter(tgl => {
    const alasan = [];
    if (hariKerjaTercatat.has(tgl)) alasan.push("✅ hadir");
    else if (isTanggalMerah(tgl)) alasan.push("🚫 tanggal merah");
    else alasan.push("❌ tidak hadir");
    // console.log(`[Absence Check] ${tgl} → ${alasan.join(", ")}`);
    return !hariKerjaTercatat.has(tgl) && !isTanggalMerah(tgl);
  });
  const absence = absenceList.length;

  const uangLemburKotor = Math.floor(totalLembur / 60) * TARIF_LEMBUR_PER_JAM;
  const uangLemburBersih = Math.max(uangLemburKotor - totalDendaTelat, 0);

  const jamKerjaIdeal = hariKerjaIdeal.reduce((total, tgl) => {
    const end = parseTime(isSabtu(tgl) ? JAM_KERJA_SELESAI_SABTU : JAM_KERJA_SELESAI);
    const start = parseTime(JAM_KERJA_MULAI);
    return total + (end - start);
  }, 0);

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
