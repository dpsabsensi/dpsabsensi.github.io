// workdays.js
import { isTanggalMerah } from './holiday.js';

export function getHariKerjaSeharusnya(listTanggal) {
  const hasil = [];

  for (const tanggal of listTanggal) {
    const [y, m, d] = tanggal.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const day = date.getDay(); // 0 = Minggu, 6 = Sabtu

    if (day === 0) continue; // Minggu
    if (isTanggalMerah(tanggal)) continue; // Tanggal merah

    hasil.push(tanggal);
  }
  
  console.log('[AUDIT] Hari kerja ideal (total):', hasil.length);
  console.log('[AUDIT] Tanggal hari kerja ideal:', hasil);

  return hasil;
}

export function getHariKerjaSeharusnyaDariKalender(tahun, bulan) {
  const hasil = [];
  const totalHari = new Date(tahun, bulan, 0).getDate(); // bulan: 1-12

  for (let tgl = 1; tgl <= totalHari; tgl++) {
    const tanggal = `${tahun}-${String(bulan).padStart(2, '0')}-${String(tgl).padStart(2, '0')}`;
    const date = new Date(`${tanggal}T00:00:00`);
    const day = date.getDay(); // 0 = Minggu, 6 = Sabtu

    if (day === 0) continue; // Minggu
    if (isTanggalMerah(tanggal)) continue;

    hasil.push(tanggal);
  }

  // console.log('[AUDIT] Hari kerja ideal (kalender):', hasil.length);
  return hasil;
}