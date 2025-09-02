// period.js
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

  // Get all available years and sort them in descending order
  const years = Object.keys(index).sort().reverse();

  // Populate the year dropdown
  years.forEach((year) => {
    const opt = document.createElement("option");
    opt.value = year;
    opt.textContent = year;
    yearSelect.appendChild(opt);
  });

  // Determine the latest available year and month from the index
  const latestYear = years[0];
  const latestMonths = index[latestYear] ? index[latestYear].sort().reverse() : [];
  const latestMonth = latestMonths[0];

  // Set the year dropdown to the latest available year
  yearSelect.value = latestYear;

  // Populate the month dropdown with months for the latest year
  monthSelect.innerHTML = "";
  latestMonths.forEach((month) => {
    const opt = document.createElement("option");
    opt.value = month;
    opt.textContent = month;
    monthSelect.appendChild(opt);
  });

  // Set the month dropdown to the latest available month
  monthSelect.value = latestMonth;

  return { year: latestYear, month: latestMonth };
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

  return months[0] || null; // kembalikan bulan pertama
}
