// holiday.js
import { hitungJamKerjaBersih } from './summary.js';
import { toYmd } from './utils.js';

// Cache tanggal merah per tahun
// Bentuk: { "2025": { "2025-08-17": true, "2025-12-25": true, ... } }
let cacheTanggalMerah = {};

// === Fetch daftar tanggal merah dari API (sekali per tahun, cache) ===
export async function fetchTanggalMerah(year) {
  if (cacheTanggalMerah[year]) {
    return cacheTanggalMerah[year]; // langsung ambil dari cache
  }

  const res = await fetch(`https://libur.deno.dev/api?year=${year}`);
  if (!res.ok) throw new Error("Gagal fetch tanggal merah");

  const data = await res.json();
  const map = {};

  data.forEach(item => {
    if (item.is_national_holiday) {
      map[item.date] = true;
    }
  });

  cacheTanggalMerah[year] = map;
  return map;
}

// === Cek apakah tanggal tertentu masuk tanggal merah ===
export function isTanggalMerah(tanggal) {
  const key = toYmd(tanggal);
  if (!key) return false;

  const year = key.split("-")[0];
  return !!cacheTanggalMerah[year]?.[key];
}

// === Debug investigasi absence ===
export async function investigasiAbsence(year, month) {
  const now = new Date();
  year = year || now.getFullYear();
  month = month || String(now.getMonth() + 1).padStart(2, '0');

  try {
    // Pastikan tanggal merah sudah di-fetch
    await fetchTanggalMerah(year);

    const url = `https://pusatpneumatic.com/absen/json/${year}/${year}-${month}.json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`[HTTP ${res.status}] Gagal mengambil data`);

    const data = await res.json();

    data.forEach(karyawan => {
      let totalHariKerja = 0;
      let totalJamKerja = 0;

      for (const [tanggal, logArray] of Object.entries(karyawan.logs)) {
        // Skip kalau tanggal merah
        if (isTanggalMerah(tanggal)) continue;

        const hours = hitungJamKerjaBersih(logArray);
        if (hours > 0) {
          totalHariKerja++;
          totalJamKerja += hours;
        }
      }

      // Debug opsional
      console.log(`[${karyawan.nama}] Hari Kerja: ${totalHariKerja}, Jam: ${totalJamKerja}`);
    });
  } catch (err) {
    console.error('❌ investigasiAbsence gagal:', err);
  }
}