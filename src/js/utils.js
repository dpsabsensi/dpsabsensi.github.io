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

// export function isSabtu(tanggal) {
//   console.log("isSabtu tanggal:", tanggal);
//   const [year, month, day] = tanggal.split('-').map(Number);
//   const date = new Date(year, month - 1, day);
//   console.log("→ Day:", date.getDay());
//   return date.getDay() === 6;
// }

// export function isSabtu(tanggal) {
//   // Ganti semua "/" jadi "-"
//   const [year, month, day] = tanggal.replace(/\//g, '-').split('-').map(Number);
//   const date = new Date(year, month - 1, day);
//   return date.getDay() === 6;
// }

export function isSabtu(tanggal) {
  if (!tanggal) return false;
  const t = tanggal.replace(/\//g, '-'); // normalisasi
  const parts = t.split('-').map(Number);
  let y, m, d;
  // tebak format paling umum
  if (parts[0] >= 1900) {        // YYYY-MM-DD
    [y, m, d] = parts;
  } else if (parts[2] >= 1900) { // DD-MM-YYYY
    [d, m, y] = parts;
  } else {                       // fallback (anggap YYYY-MM-DD)
    [y, m, d] = parts;
  }
  const date = new Date(y, (m ?? 1) - 1, d ?? 1);
  return !Number.isNaN(date.getTime()) && date.getDay() === 6;
}

// Fungsi untuk menghitung denda keterlambatan
export function hitungDendaTelat(menitTelat) {
  if (menitTelat <= 5) return 0;
  if (menitTelat <= 15) return 10000;
  if (menitTelat <= 30) return 25000;
  if (menitTelat <= 60) return 50000;
  return 100000;
}