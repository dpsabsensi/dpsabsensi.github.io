// main.js
import './css/input.css';
import './css/style.css';
import './js/config.js';
import './js/app.js';
import { formatJamMenit } from './js/utils.js';
import { normalizeLogs, calculateSummaryForUser } from './js/summary.js';

import { setupTabSwitching } from './js/tabs.js';
import { initPeriodSelectors, updateMonthsForYear } from "./js/period.js";

document.addEventListener('DOMContentLoaded', async () => {

  function getSelectedFilePath() {
    const year = document.getElementById('yearSelect')?.value;
    const month = document.getElementById('monthSelect')?.value;
    return `https://pusatpneumatic.com/absen/json/${year}/${year}-${month}.json`;
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

      // Header Summary
      summaryHead.innerHTML = `
        <tr>
          <th class="px-4 py-3 border-b text-left">Nama</th>
          <th class="px-4 py-3 border-b text-center">Work</th>
          <th class="px-4 py-3 border-b text-center">Lembur (jam)</th>
          <th class="px-4 py-3 border-b text-center">Uang Lembur</th>
          <th class="px-4 py-3 border-b text-center">Telat (jam)</th>
          <th class="px-4 py-3 border-b text-center">Early Out</th>
          <th class="px-4 py-3 border-b text-center">Absence</th>
          <th class="px-4 py-3 border-b text-center">Break (jam)</th>
        </tr>
      `;

      // Header Detail
      detailHead.innerHTML = `
        <tr class="bg-gradient-to-r from-blue-200 to-blue-400 text-gray-800 font-semibold text-sm shadow-sm">
          <th class="px-4 py-3 border-b border-gray-300 text-center cursor-pointer" data-sort="nama">Nama</th>
          <th class="px-4 py-3 border-b border-gray-300 text-center cursor-pointer" data-sort="tanggal">Tanggal</th>
          <th class="px-4 py-3 border-b border-gray-300 text-center cursor-pointer" data-sort="masuk">Jam Masuk</th>
          <th class="px-4 py-3 border-b border-gray-300 text-center cursor-pointer" data-sort="breakout">Jam Break-Out</th>
          <th class="px-4 py-3 border-b border-gray-300 text-center cursor-pointer" data-sort="breakin">Jam Break-In</th>
          <th class="px-4 py-3 border-b border-gray-300 text-center cursor-pointer" data-sort="keluar">Jam Keluar</th>
          <th class="px-1 py-3 border-b border-gray-300 text-center rounded-tr-lg w-30">KET</th>
        </tr>
      `;

      const users = data.u || [];
      console.log("Users loaded:", users.map(u => u.n));

      for (const user of users) {
        const nama = user.n;
        const days = user.d || {};

        // normalisasi log
        const logs = normalizeLogs(days);

        // hitung summary menggunakan fungsi calculateSummaryForUser
        const summary = await calculateSummaryForUser(logs);

        // Detail per hari
        if (logs.length === 0) logs.push({ tanggal: '-', jamMasuk: '-', jamKeluar: '-', breaks: [], status: 0, holiday: 0 });
        logs.forEach(log => {
          let ket = "";
          if (log.status === 1) ket = "Tidak hadir";
          else if (log.status === 2) ket = "Libur";
          else if (log.isEmpty) ket = "Missing Time";
          else if (log.holiday === 1) ket = "Tanggal Merah";

          const breakOut = log.breaks.length ? formatJamMenit(log.breaks[0]) : '-';
          const breakIn = log.breaks.length ? formatJamMenit(log.breaks[log.breaks.length - 1]) : '-';

          const tr = document.createElement('tr');
          tr.className = 'hover:bg-blue-50 transition-colors';
          tr.innerHTML = `
            <td class="px-4 py-3 border-b text-sm font-medium text-gray-700">${nama}</td>
            <td class="px-4 py-3 border-b text-center text-sm text-gray-600">${log.tanggal}</td>
            <td class="px-4 py-3 border-b text-center text-sm text-green-700 font-semibold">${log.jamMasuk || '-'}</td>
            <td class="px-4 py-3 border-b text-center text-sm text-red-700 font-semibold">${breakOut}</td>
            <td class="px-4 py-3 border-b text-center text-sm text-red-700 font-semibold">${breakIn}</td>
            <td class="px-4 py-3 border-b text-center text-sm text-red-700 font-semibold">${log.jamKeluar || '-'}</td>
            <td class="px-4 py-3 border-b text-center text-sm text-blue-700">${ket}</td>
          `;
          detailBody.appendChild(tr);
        });

        // Summary row
        const row = document.createElement('tr');
        row.className = 'hover:bg-blue-50 transition-colors';
        row.innerHTML = `
          <td class="px-4 py-3 text-sm font-medium text-gray-800">${nama}</td>
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
      }

      // Filter
      function filterTable() {
        const nameVal = nameInput.value.toLowerCase();
        detailBody.querySelectorAll('tr').forEach(row => {
          const nama = row.children[0].textContent.toLowerCase();
          row.style.display = nama.includes(nameVal) ? '' : 'none';
        });
        summaryBody.querySelectorAll('tr').forEach(row => {
          const nama = row.children[0].textContent.toLowerCase();
          row.style.display = nama.includes(nameVal) ? '' : 'none';
        });
      }

      let sortState = {};
      function sortTable(colIndex, isDate = false) {
        const rows = Array.from(detailBody.querySelectorAll('tr'));
        const currentDir = sortState[colIndex] === 'asc' ? 'desc' : 'asc';
        sortState[colIndex] = currentDir;

        rows.sort((a,b) => {
          const valA = a.children[colIndex].textContent.trim();
          const valB = b.children[colIndex].textContent.trim();
          let compare;
          if (isDate) compare = new Date(valA) - new Date(valB);
          else if (!isNaN(valA) && !isNaN(valB)) compare = Number(valA) - Number(valB);
          else compare = valA.localeCompare(valB);
          return currentDir === 'asc' ? compare : -compare;
        });

        detailBody.innerHTML = '';
        rows.forEach(r => detailBody.appendChild(r));
      }

      detailHead.querySelectorAll('th').forEach((th,i) => {
        const key = th.dataset.sort;
        if (key) th.addEventListener('click', () => sortTable(i, key === 'tanggal'));
      });

      nameInput.addEventListener('input', filterTable);

    } catch (err) {
      console.error('❌ Gagal memuat JSON:', err);
      const msg = document.getElementById('message');
      if (msg) msg.innerText = 'Gagal memuat data. Periksa file JSON.';
    }
  }

  async function populateMonthYearSelectors() {
    const res = await fetch("https://pusatpneumatic.com/absen/json/list_index.json");
    const index = await res.json();

    const { year } = await initPeriodSelectors(index);
    const yearSelect = document.getElementById("yearSelect");
    const monthSelect = document.getElementById("monthSelect");

    yearSelect.addEventListener("change", async () => {
      await updateMonthsForYear(index, yearSelect.value);
      loadData();
    });
    monthSelect.addEventListener("change", loadData);

    loadData();
  }

  await populateMonthYearSelectors();

  setupTabSwitching({
    summaryId: "summaryTab",
    detailId: "detailTab",
    tabSummaryId: "tabSummary",
    tabDetailId: "tabDetail"
  });

});
