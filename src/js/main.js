// main.js
/** @type {import('tailwindcss').Config} */
import '../css/input.css';
import { setupTabSwitching } from '/src/js/tabs.js';
import { normalizeLogs, calculateSummaryForUser } from '/src/js/summary.js';

document.addEventListener('DOMContentLoaded', async () => {
  const currentYear = new Date().getFullYear();
  const filePath = `/data/json/${currentYear}/juni2025.json`; // sesuaikan nama file
  const summaryBody = document.getElementById('summaryBody');
  summaryBody.innerHTML = '';

  try {
    const res = await fetch(filePath);
    if (!res.ok) throw new Error('Gagal memuat data JSON');

    const data = await res.json();
    const tbody = document.getElementById('dataBody');
    const thead = document.getElementById('dataHead');

    // Header stylish
    thead.innerHTML = `
      <tr class="bg-gradient-to-r from-blue-200 to-blue-400 text-gray-800 font-semibold text-sm shadow-sm">
        <th class="px-4 py-3 border-b border-gray-300 text-center cursor-pointer" data-sort="nama">Nama</th>
        <th class="px-4 py-3 border-b border-gray-300 text-center cursor-pointer" data-sort="tanggal">Tanggal</th>
        <th class="px-4 py-3 border-b border-gray-300 text-center cursor-pointer" data-sort="masuk">Jam Masuk</th>
        <th class="px-4 py-3 border-b border-gray-300 text-center rounded-tr-lg cursor-pointer" data-sort="keluar">Jam Keluar</th>
      </tr>
    `;

    tbody.innerHTML = '';

    data.forEach(user => {
      const { nama, logs } = user;

      Object.entries(logs).forEach(([tanggal, absens]) => {
        const jamMasuk = absens.find(log => log.type === 'in')?.time || '-';
        const jamKeluar = absens.slice().reverse().find(log => log.type === 'out')?.time || '-';

        const tr = document.createElement('tr');
        tr.className = 'hover:bg-blue-50 transition-colors';
        tr.innerHTML = `
          <td class="px-4 py-3 border-b text-sm font-medium text-gray-700">${nama}</td>
          <td class="px-4 py-3 border-b text-center text-sm text-gray-600">${tanggal.replaceAll('\\/', '/')}</td>
          <td class="px-4 py-3 border-b text-center text-sm text-green-700 font-semibold">${jamMasuk}</td>
          <td class="px-4 py-3 border-b text-center text-sm text-red-700 font-semibold">${jamKeluar}</td>
        `;
        tbody.appendChild(tr);
      });

      const summaryLogs = normalizeLogs(user.logs);
      const summary = calculateSummaryForUser(summaryLogs);

      const row = document.createElement('tr');
      row.className = 'hover:bg-blue-50 transition-colors';
      row.innerHTML = `
        <td class="px-4 py-3 text-sm font-medium text-gray-800">${user.nama}</td>
        <td class="px-4 py-3 text-center">${summary.workHours}</td>
        <td class="px-4 py-3 text-center text-green-700 font-semibold">${summary.lemburHours}</td>
        <td class="px-4 py-3 text-center text-green-800 font-semibold">Rp${summary.uangLembur.toLocaleString()}</td>
        <td class="px-4 py-3 text-center text-red-700">${summary.telatHours}</td>
        <td class="px-4 py-3 text-center text-red-800">Rp${summary.dendaTelat.toLocaleString()}</td>
        <td class="px-4 py-3 text-center">${summary.earlyOutHours}</td>
        <td class="px-4 py-3 text-center">${summary.absenceDays}</td>
        <td class="px-4 py-3 text-center">${summary.breakHours}</td>
      `;
      summaryBody.appendChild(row);
    });

    const nameInput = document.getElementById('filterName');
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');

    function filterTable() {
      const nameVal = nameInput.value.toLowerCase();
      const startVal = startDate.value;
      const endVal = endDate.value;

      tbody.querySelectorAll('tr').forEach(row => {
        const nama = row.children[1].textContent.toLowerCase();
        const tanggal = row.children[2].textContent.replaceAll('\\/', '/');
        const rowDate = new Date(tanggal);

        const matchNama = nama.includes(nameVal);
        const matchStart = !startVal || rowDate >= new Date(startVal);
        const matchEnd = !endVal || rowDate <= new Date(endVal);

        row.style.display = matchNama && matchStart && matchEnd ? '' : 'none';
      });
    }

    let sortState = {};

    function sortTable(colIndex, isDate = false) {
      const rows = Array.from(tbody.querySelectorAll('tr'));
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

      tbody.innerHTML = '';
      rows.forEach(row => tbody.appendChild(row));
    }

    thead.querySelectorAll('th').forEach((th, i) => {
      const key = th.dataset.sort;
      if (key) {
        th.addEventListener('click', () => {
          const isDate = key === 'tanggal';
          sortTable(i, isDate);
        });
      }
    });

    [nameInput, startDate, endDate].forEach(el =>
      el.addEventListener('input', filterTable)
    );
  } catch (err) {
    console.error('❌ Gagal memuat JSON:', err);
    document.getElementById('message').innerText = 'Gagal memuat data. Periksa file JSON.';
  }

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