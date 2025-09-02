// main.js
import './css/input.css';
import './css/style.css';
import './js/app.js'; 
import { API_URL } from './js/config.js';
import { setupTabs } from './js/tabs.js';
import { formatJamMenit } from './js/utils.js';
import { getJamKerjaIdeal } from './js/ideal.js';
import { normalizeLogs, calculateSummaryForUser } from './js/summary.js';
import { initPeriodSelectors, updateMonthsForYear } from "./js/period.js";
import { sortTable, generateTableRows, generateTableHead } from './js/table.js';

document.addEventListener('DOMContentLoaded', async () => {

  function getSelectedFilePath() {
    const year = document.getElementById('yearSelect')?.value;
    const month = document.getElementById('monthSelect')?.value;
    return `${API_URL}/json/${year}/${year}-${month}.json`;
  }

  async function loadData() {
    const filePath = getSelectedFilePath();

    try {
      const res = await fetch(filePath);
      if (!res.ok) throw new Error('Gagal memuat data JSON');

      const data = await res.json();
      const nameInput   = document.getElementById('filterName');
      const summaryHead = document.getElementById('summaryHead');
      const summaryBody = document.getElementById('summaryBody');
      const detailHead  = document.getElementById('detailHead');
      const detailBody  = document.getElementById('detailBody');

      const ideal = getJamKerjaIdeal(data);

      const summaryColumns = [
        { key: "nama",         label: "Nama", type: "string"},
        { key: "workHours",    label: `Work<br>${ideal.formatted}`, type: "time" },
        { key: "lemburHours",  label: "Lembur (jam)", type: "time" },
        { key: "uangLembur",   label: "Uang Lembur", type: "string" },
        { key: "telatHours",   label: "Telat (jam)", type: "time" },
        { key: "earlyOutHours",label: "Early Out", type: "time" },
        { key: "absenceDays",  label: "Absence", type: "number" },
        { key: "breakHours",   label: "Break (jam)", type: "time" },
      ];

      const detailColumns = [
        { key: "nama",      label: "Nama", type: "string" },
        { key: "tanggal",   label: "Tanggal", type: "number" },
        { key: "jamMasuk",  label: "Jam Masuk", type: "time" },
        { key: "breakOut",  label: "Jam Break-Out", type: "time" },
        { key: "breakIn",   label: "Jam Break-In", type: "time" },
        { key: "jamKeluar", label: "Jam Keluar", type: "time" },
        { key: "ket",       label: "KET", type: "string" },
      ];

      // 1) Bersihin & generate header SEKALI
      summaryBody.innerHTML = "";
      detailBody.innerHTML  = "";
      generateTableHead(
        summaryColumns,
        summaryHead,
        "text-gray-800 font-semibold text-sm shadow-sm"
      );
      generateTableHead(
        detailColumns,
        detailHead,
        "text-gray-800 font-semibold text-sm shadow-sm"
      );

      // 2) Kumpulin semua baris
      const allSummaryRows = [];
      const allDetailRows  = [];
      const users = data.u || [];
      for (const user of users) {
        const nama = user.n;
        const days = (user.d || []).map(v => typeof v === "number" ? { s: v, l: [] } : v);
        const logs = normalizeLogs(days);
        const summary = await calculateSummaryForUser(logs, ideal, nama, data.y, data.m);

        // summary untuk 1 user (format tampilannya)
        allSummaryRows.push({
          nama,
          workHours:     summary.workHours,
          lemburHours:   summary.lemburHours,
          uangLembur:    `Rp${summary.uangLembur.toLocaleString()}`,
          telatHours:    summary.telatHours,
          earlyOutHours: summary.earlyOutHours,
          absenceDays:   summary.absenceDays,
          breakHours:    summary.breakHours,
        });

        // detail untuk 1 user
        const rows = logs.map(log => {
          let ket = "";
          if (log.status === 1) ket = "Tidak hadir";
          else if (log.status === 2) ket = "Libur";
          else if (log.isEmpty)     ket = "Missing Time";
          else if (log.holiday === 1) ket = "Tanggal Merah";

          return {
            nama,
            tanggal:   log.tanggal,
            jamMasuk:  formatJamMenit(log.jamMasuk),
            breakOut:  log.breaks.length >= 1 ? formatJamMenit(log.breaks[0]) : "-",
            breakIn:   log.breaks.length >= 2 ? formatJamMenit(log.breaks.at(-1)) : "-",
            jamKeluar: formatJamMenit(log.jamKeluar),
            ket
          };
        });

        allDetailRows.push(...rows);
      }

      // 3) Render SEKALI
      generateTableRows(allSummaryRows, summaryBody, summaryColumns);
      generateTableRows(allDetailRows,  detailBody,  detailColumns);

      // 4) Pasang sorting SETELAH header ready
      const sortStates = {};
      detailHead.querySelectorAll('th').forEach((th, i) => {
        th.addEventListener('click', () => {
          const type = th.dataset.type || "string";
          const k = `detail-${i}`;
          const next = (sortStates[k] === "asc") ? "desc" : "asc";
          sortStates[k] = next;
          sortTable(detailBody, i, type, next);
        });
      });
      summaryHead.querySelectorAll('th').forEach((th, i) => {
        th.addEventListener('click', () => {
          const type = th.dataset.type || "string";
          const k = `summary-${i}`;
          const next = (sortStates[k] === "asc") ? "desc" : "asc";
          sortStates[k] = next;
          sortTable(summaryBody, i, type, next);
        });
      });

      // 5) Filter name
      function filterTable() {
        const nameVal = nameInput.value.toLowerCase();
        [detailBody, summaryBody].forEach(tbody => {
          tbody.querySelectorAll('tr').forEach(row => {
            const nama = row.children[0]?.textContent?.toLowerCase() || "";
            row.style.display = nama.includes(nameVal) ? '' : 'none';
          });
        });
      }
      nameInput.addEventListener('input', filterTable);

    } catch (err) {
      console.error('❌ Gagal memuat JSON:', err);
      const msg = document.getElementById('message');
      if (msg) msg.innerText = 'Gagal memuat data. Periksa file JSON.';
    }
  }

  async function populateMonthYearSelectors() {
    try {
    const res = await fetch(`${API_URL}/json/list_index.json`);
    if (!res.ok) throw new Error('Failed to fetch list_index.json');
    const index = await res.json();

    // Get the latest year and month from the index data
    const years = Object.keys(index).sort().reverse();
    const latestYear = years[0];
    const months = index[latestYear].sort().reverse();
    const latestMonth = months[0];

    // Pass the latest year and month to initPeriodSelectors
    const { year } = await initPeriodSelectors(index, latestYear, latestMonth);

    const yearSelect = document.getElementById("yearSelect");
    const monthSelect = document.getElementById("monthSelect");

    yearSelect.addEventListener("change", async () => {
      await updateMonthsForYear(index, yearSelect.value);
      loadData();
    });
    monthSelect.addEventListener("change", loadData);

    loadData();
    } catch (err) {
    console.error('❌ Error initializing period selectors:', err);
    const msg = document.getElementById('message');
    if (msg) msg.innerText = 'Gagal memuat daftar tahun/bulan. Periksa file list_index.json.';
    }
  }

  await populateMonthYearSelectors();

  setupTabs(
    ".tab-btn",      // selector semua tombol tab
    ".tab-panel",    // selector semua panel/tab content
    ["bg-blue-600", "text-white"],   // class kalau aktif
    ["bg-gray-200", "text-gray-700"] // class kalau non-aktif
  );
});