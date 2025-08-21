// holidays.js
let tanggalMerah = new Set();

export async function fetchTanggalMerah() {
  const res = await fetch('https://api-harilibur.vercel.app/api');
  const data = await res.json();

  tanggalMerah = new Set(data
    .filter(item => item.is_national_holiday)
    .map(item => item.holiday_date));
}

export function isTanggalMerah(tanggal) {
  return tanggalMerah.has(tanggal);
}