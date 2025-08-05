// utils.js

// Mengubah waktu format "HH:MM" menjadi total menit
export function parseTime(str) {
  const [h, m] = str.split(':').map(Number);
  return h * 60 + m;
}

// Mengubah total menit menjadi format "Xj Ym"
export function formatJamMenit(menit) {
  const jam = Math.floor(menit / 60);
  const sisa = menit % 60;
  return `${jam}j ${sisa}m`;
}

// Mengambil nama hari dari string tanggal "YYYY-MM-DD"
export function getDayName(tanggal) {
  const date = new Date(tanggal);
  return date.toLocaleDateString('id-ID', { weekday: 'long' });
}

// Mengecek apakah tanggal tersebut hari Sabtu
export function isSabtu(tanggal) {
  return getDayName(tanggal).toLowerCase() === 'sabtu';
}

// Fungsi untuk menghitung denda keterlambatan
export function hitungDendaTelat(menitTelat) {
  if (menitTelat <= 5) return 0;
  if (menitTelat <= 15) return 10000;
  if (menitTelat <= 30) return 25000;
  if (menitTelat <= 60) return 50000;
  return 100000;
}