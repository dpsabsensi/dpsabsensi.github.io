// config.js
export const API_URL = 'https://pusatpneumatic.com/absen';

export const JAM_KERJA_MULAI = 480;          // 08:00
export const JAM_KERJA_SELESAI = 960;        // 16:00
export const JAM_KERJA_SELESAI_SABTU = 840;  // 14:00
export const TOLERANSI_MENIT = 5;
export const TARIF_LEMBUR_PER_JAM = 5000;

export const DENDA_TELAT_RULES = [
  { batas: 10, denda: 10000 },   // <= 10 menit
  { batas: 30, denda: 50000 },   // >10 dan <=30 menit
  { batas: Infinity, denda: 100000 }, // >30 menit
];