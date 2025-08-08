// main.js
/** @type {import('tailwindcss').Config} */
import '../css/input.css';
import '../css/style.css';
import './config.js';
import './utils.js';
import './holiday.js';
import './workdays.js';
import { setupTabSwitching } from '/src/js/tabs.js';
import { normalizeLogs, calculateSummaryForUser } from '/src/js/summary.js';

document.addEventListener('DOMContentLoaded', async () => {
  function getSelectedFilePath() {
    const year = document.getElementById('yearSelect')?.value;
    const month = document.getElementById('monthSelect')?.value;
    return `/data/json/${year}/${year}-${month}.json`;
  }

  async function loadData() {
    const filePath = getSelectedFilePath();

    try {
      const res = await fetch(filePath);
      if (!res.ok) throw new Error('Gagal memuat data JSON');


      const data = await res.json();
      const nameInput = document.getElementById('filterName');
      const summaryHead = document.getElementById('summaryHead');
      const summaryBody = document.getElementById('summaryBody');
      const detailHead = document.getElementById('detailHead');
      const detailBody = document.getElementById('detailBody');
      
      summaryBody.innerHTML = '';
      detailBody.innerHTML = '';

      data.forEach(user => {
        const { nama, logs } = user;
        const summaryLogs = normalizeLogs(user.logs);
        const summary = calculateSummaryForUser(summaryLogs);

        summaryHead.innerHTML = `
          <tr>
            <th class="px-4 py-3 border-b text-left">Nama</th>
            <th class="px-4 py-3 border-b text-center">Work<br>(${summary.jamKerjaIdeal} jam)</th>
            <th class="px-4 py-3 border-b text-center">Lembur (jam)</th>
            <th class="px-4 py-3 border-b text-center">Uang Lembur</th>
            <th class="px-4 py-3 border-b text-center">Telat (jam)</th>
            <th class="px-4 py-3 border-b text-center">Early Out</th>
            <th class="px-4 py-3 border-b text-center">Absence</th>
            <th class="px-4 py-3 border-b text-center">Break (jam)</th>
          </tr>
        `;

        detailHead.innerHTML = `
          <tr class="bg-gradient-to-r from-blue-200 to-blue-400 text-gray-800 font-semibold text-sm shadow-sm">
            <th class="px-4 py-3 border-b border-gray-300 text-center cursor-pointer" data-sort="nama">Nama</th>
            <th class="px-4 py-3 border-b border-gray-300 text-center cursor-pointer" data-sort="tanggal">Tanggal</th>
            <th class="px-4 py-3 border-b border-gray-300 text-center cursor-pointer" data-sort="masuk">Jam Masuk</th>
            <th class="px-4 py-3 border-b border-gray-300 text-center cursor-pointer" data-sort="masuk">Jam Break-In</th>
            <th class="px-4 py-3 border-b border-gray-300 text-center cursor-pointer" data-sort="masuk">Jam Break-Out</th>
            <th class="px-4 py-3 border-b border-gray-300 text-center cursor-pointer" data-sort="masuk">Jam Keluar</th>
            <th class="px-1 py-3 border-b border-gray-300 text-center cursor-pointer rounded-tr-lg w-30" data-sort="keluar">MT</th>
          </tr>
        `;

        Object.entries(logs).forEach(([tanggal, absens]) => {
          const jamMasuk = absens.find(log => log.type === 'in')?.time || '-';
          const jamKeluar = absens.slice().reverse().find(log => log.type === 'out')?.time || '-';
          const breakIn = absens.find(log => log.type === 'break-in')?.time || '-';
          const breakOut = absens.slice().reverse().find(log => log.type === 'break-out')?.time || '-';
          const status = (jamMasuk === '-' || jamKeluar === '-') ? '⚠️' : '';

          const tr = document.createElement('tr');
          tr.className = 'hover:bg-blue-50 transition-colors';
          tr.innerHTML = `
            <td class="px-4 py-3 border-b text-sm font-medium text-gray-700">${nama}</td>
            <td class="px-4 py-3 border-b text-center text-sm text-gray-600">${tanggal.replaceAll('\\/', '/')}</td>
            <td class="px-4 py-3 border-b text-center text-sm text-green-700 font-semibold">${jamMasuk}</td>
            <td class="px-4 py-3 border-b text-center text-sm text-red-700 font-semibold">${breakIn}</td>
            <td class="px-4 py-3 border-b text-center text-sm text-red-700 font-semibold">${breakOut}</td>
            <td class="px-4 py-3 border-b text-center text-sm text-red-700 font-semibold">${jamKeluar}</td>
            <td class="px-4 py-3 border-b text-center text-sm">${status}</td>
          `;
          detailBody.appendChild(tr);
        });

        const row = document.createElement('tr');
        row.className = 'hover:bg-blue-50 transition-colors';
        row.innerHTML = `
          <td class="px-4 py-3 text-sm font-medium text-gray-800">${user.nama}</td>
          <td class="px-4 py-3 text-center">${summary.workHours}</td>
          <td class="px-4 py-3 text-center text-green-700 font-semibold">${summary.lemburHours}</td>
          <td class="px-4 py-3 text-center font-semibold relative group cursor-pointer ${summary.uangLembur < 0 ? 'text-red-700' : 'text-green-800'}">
            Rp${summary.uangLembur.toLocaleString()}
            <div class="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-3 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Rp${summary.uangLemburKotor.toLocaleString()} - Rp${summary.dendaTelat.toLocaleString()}
            </div>
          </td>
          <td class="px-4 py-3 text-center text-red-700">${summary.telatHours}</td>
          <td class="px-4 py-3 text-center">${summary.earlyOutHours}</td>
          <td class="px-4 py-3 text-center">${summary.absenceDays}</td>
          <td class="px-4 py-3 text-center">${summary.breakHours}</td>
        `;
        summaryBody.appendChild(row);
      });

      function filterTable() {
        const nameVal = nameInput.value.toLowerCase();

        // Filter detail table
        detailBody.querySelectorAll('tr').forEach(row => {
          const nama = row.children[0].textContent.toLowerCase();
          const tanggal = row.children[1].textContent.replaceAll('\\/', '/');
          const rowDate = new Date(tanggal);

          const matchNama = nama.includes(nameVal);

          row.style.display = matchNama ? '' : 'none';
        });

        // Filter summary table
        summaryBody.querySelectorAll('tr').forEach(row => {
          const nama = row.children[0].textContent.toLowerCase();
          const matchNama = nama.includes(nameVal);
          row.style.display = matchNama ? '' : 'none'; // tanggal tidak relevan di summary
        });
      }

      let sortState = {};

      function sortTable(colIndex, isDate = false) {
        const rows = Array.from(detailBody.querySelectorAll('tr'));
        const currentDir = sortState[colIndex] === 'asc' ? 'desc' : 'asc';
        sortState[colIndex] = currentDir;

        rows.sort((a, b) => {
          const valA = a.children[colIndex].textContent.trim();
          const valB = b.children[colIndex].textContent.trim();

          let compare;
          if (isDate) {
            compare = new Date(valA) - new Date(valB);
          } else if (!isNaN(valA) && !isNaN(valB)) {
            compare = Number(valA) - Number(valB);
          } else {
            compare = valA.localeCompare(valB);
          }

          return currentDir === 'asc' ? compare : -compare;
        });

        detailBody.innerHTML = '';
        rows.forEach(row => detailBody.appendChild(row));
      }

      detailHead.querySelectorAll('th').forEach((th, i) => {
        const key = th.dataset.sort;
        if (key) {
          th.addEventListener('click', () => {
            const isDate = key === 'tanggal';
            sortTable(i, isDate);
          });
        }
      });

      [nameInput].forEach(el =>
        el.addEventListener('input', filterTable)
      );

    } catch (err) {
      console.error('❌ Gagal memuat JSON:', err);
      document.getElementById('message').innerText = 'Gagal memuat data. Periksa file JSON.';
    }
  }

  async function populateMonthYearSelectors() {
    const yearSelect = document.getElementById('yearSelect');
    const monthSelect = document.getElementById('monthSelect');

    const res = await fetch('/data/json/list_index.json'); // JSON ini disiapkan dari backend
    const index = await res.json();

    // Isi dropdown tahun
    Object.keys(index).sort().forEach(year => {
      const opt = document.createElement('option');
      opt.value = year;
      opt.textContent = year;
      yearSelect.appendChild(opt);
    });

    // Event: Jika tahun dipilih, update bulan
    yearSelect.addEventListener('change', () => {
      const selectedYear = yearSelect.value;
      const months = index[selectedYear] || [];

      monthSelect.innerHTML = '';
      months.forEach(month => {
        const opt = document.createElement('option');
        opt.value = month;
        opt.textContent = month;
        monthSelect.appendChild(opt);
      });

      // Fetch ulang
      loadData();
    });

    monthSelect.addEventListener('change', loadData);

    // Set default to current year/month
    const now = new Date();
    const defaultYear = now.getFullYear().toString();
    const defaultMonth = String(now.getMonth() + 1).padStart(2, '0'); // hasil: "08"
    // const defaultMonth = now.toLocaleString('id-ID', { month: 'long' }).toLowerCase();

    yearSelect.value = defaultYear;
    const months = index[defaultYear];
    if (months) {
      months.forEach(month => {
        const opt = document.createElement('option');
        opt.value = month;
        opt.textContent = month;
        monthSelect.appendChild(opt);
      });
      monthSelect.value = defaultMonth;
    }

    loadData(); // pertama kali load
  }

  await populateMonthYearSelectors();

  setupTabSwitching({
    summaryId: "summaryTab",
    detailId: "detailTab",
    tabSummaryId: "tabSummary",
    tabDetailId: "tabDetail"
  });
});

export default {
  content: [
    "./*.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}