// utils.js

// Mengubah waktu format "HH:MM" menjadi total menit
export function parseTime(str) {
  if (!str || typeof str !== 'string') return null;
  const [h, m] = str.split(':').map(Number);
  return h * 60 + m;
}

// Mengubah total menit menjadi format "Xj Ym"
export function formatJamMenit(menit) {
  const jam = Math.floor(menit / 60);
  const sisa = menit % 60;
  return `${jam}j ${sisa}m`;
}

export function isSabtu(tanggal) {
  const [year, month, day] = tanggal.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getDay() === 6; // 6 = Sabtu
}

// Fungsi untuk menghitung denda keterlambatan
export function hitungDendaTelat(menitTelat) {
  if (menitTelat <= 5) return 0;
  if (menitTelat <= 15) return 10000;
  if (menitTelat <= 30) return 25000;
  if (menitTelat <= 60) return 50000;
  return 100000;
}