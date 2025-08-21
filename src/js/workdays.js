// workdays.js
import { isTanggalMerah } from './holiday.js';

export async function listWorkdays(year, month) {
  const hasil = [];
  const totalHari = new Date(year, month, 0).getDate();

  for (let tgl = 1; tgl <= totalHari; tgl++) {
    const tanggal = `${year}-${String(month).padStart(2, '0')}-${String(tgl).padStart(2, '0')}`;
    const date = new Date(`${tanggal}T00:00:00`);
    const day = date.getDay();

    if (day === 0) continue; // Minggu
    if (isTanggalMerah(tanggal)) continue;

    hasil.push(tanggal);
  }

  return hasil;
}