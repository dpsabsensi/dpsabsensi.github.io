// period.js
import { fetchTanggalMerah } from "./holiday.js";

/**
 * Ambil tahun & bulan dari select box
 */
export function getSelectedPeriod() {
  const year = document.getElementById("yearSelect")?.value;
  const month = document.getElementById("monthSelect")?.value;
  return { year, month };
}

/**
 * Set isi dropdown tahun & bulan dari index.json
 * @param {Object} index data dari list_index.json { "2025": ["01","02",...] }
 * @returns {Promise<{year:string, month:string}>} default period
 */
export async function initPeriodSelectors(index) {
  const yearSelect = document.getElementById("yearSelect");
  const monthSelect = document.getElementById("monthSelect");

  // isi dropdown tahun
  Object.keys(index).sort().forEach((year) => {
    const opt = document.createElement("option");
    opt.value = year;
    opt.textContent = year;
    yearSelect.appendChild(opt);
  });

  // default: tahun & bulan sekarang
  const now = new Date();
  const defaultYear = now.getFullYear().toString();
  const defaultMonth = String(now.getMonth() + 1).padStart(2, "0");

  yearSelect.value = defaultYear;

  // isi dropdown bulan
  const months = index[defaultYear];
  if (months) {
    monthSelect.innerHTML = "";
    months.forEach((month) => {
      const opt = document.createElement("option");
      opt.value = month;
      opt.textContent = month;
      monthSelect.appendChild(opt);
    });
    monthSelect.value = defaultMonth;
  }

  // fetch tanggal merah untuk default tahun
  await fetchTanggalMerah(defaultYear);

  return { year: defaultYear, month: defaultMonth };
}

/**
 * Update bulan ketika tahun berubah
 */
export async function updateMonthsForYear(index, year) {
  const monthSelect = document.getElementById("monthSelect");
  const months = index[year] || [];
  monthSelect.innerHTML = "";

  months.forEach((month) => {
    const opt = document.createElement("option");
    opt.value = month;
    opt.textContent = month;
    monthSelect.appendChild(opt);
  });

  // fetch tanggal merah ulang untuk tahun baru
  await fetchTanggalMerah(year);

  return months[0] || null; // kembalikan bulan pertama
}
