// const tableBody = document.getElementById('tableBody');
// const searchInput = document.getElementById('search');
// const monthFilter = document.getElementById('monthFilter');
// const loaderRow = document.getElementById('loaderRow');

// let allData = [];
// let filteredData = [];
// let renderIndex = 0;
// const batchSize = 20;

// function f(x) {
//   return (x || "").trim();
// }

// function isInSelectedMonth(dateStr) {
//   const selectedMonth = monthFilter.value; // e.g., "2025-06"
//   return !selectedMonth || dateStr.startsWith(selectedMonth);
// }

// function renderNextBatch() {
//   if (renderIndex >= filteredData.length) {
//     loaderRow.style.display = 'none';
//     return;
//   }

//   const batch = filteredData.slice(renderIndex, renderIndex + batchSize);
//   for (const u of batch) {
//     if (!u || !u.logs || typeof u.logs !== "object") {
//       console.warn("⛔ Invalid user log data", u);
//       continue;
//     }

//     const l = u.logs;
//     const dates = Object.keys(l).filter(isInSelectedMonth).sort();

//     if (dates.length === 0) {
//       tableBody.innerHTML += `
//         <tr>
//           <td class="px-4 py-2">${u.id}</td>
//           <td class="px-4 py-2">${u.n}</td>
//           <td colspan="6" class="px-4 py-2 text-gray-400 italic">Tidak ada data</td>
//         </tr>`;
//       continue;
//     }

//     dates.forEach((d, i) => {
//       const log = l[d];
//       tableBody.innerHTML += `
//         <tr class="hover:bg-pink-100 transition">
//           <td class="px-4 py-2">${i === 0 ? u.id : ""}</td>
//           <td class="px-4 py-2">${i === 0 ? u.n : ""}</td>
//           <td class="px-4 py-2">${d}</td>
//           <td class="px-4 py-2">${f(log.i1) || "-"}</td>
//           <td class="px-4 py-2">${f(log.o1) || "-"}</td>
//           <td class="px-4 py-2">${f(log.i2) || "-"}</td>
//           <td class="px-4 py-2">${f(log.o2) || "-"}</td>
//           <td class="px-4 py-2">${f(log.t) || "-"}</td>
//         </tr>`;
//     });
//   }

//   renderIndex += batchSize;
//   loaderRow.style.display = 'table-row';
// }

// function applyFilters() {
//   const term = searchInput.value.trim().toLowerCase();
//   filteredData = allData.filter(u => u.n.toLowerCase().includes(term));
//   renderIndex = 0;
//   tableBody.innerHTML = "";
//   renderNextBatch();
// }

// async function main() {
//   try {
//     const res = await fetch('https://pusatpneumatic.com/absen/data.json');
//     allData = await res.json();
//     filteredData = allData;
//     renderIndex = 0;
//     tableBody.innerHTML = "";
//     renderNextBatch();
//     // hitungRingkasan(allData);
//     hitungRingkasan(filteredData);

//     searchInput.addEventListener('input', () => {
//       const term = searchInput.value.trim().toLowerCase();
//       filteredData = allData.filter(u => u.n.toLowerCase().includes(term));
//       renderIndex = 0;
//       tableBody.innerHTML = "";
//       renderNextBatch();
//       hitungRingkasan(filteredData); // <- ini juga perlu
//     });

//     monthFilter.addEventListener('change', applyFilters);

//   } catch (e) {
//     console.error("❌", e);
//     tableBody.innerHTML = `<tr><td colspan="8" class="text-red-500 p-4">Gagal memuat data</td></tr>`;
//   }
// }

// function hitungRingkasan(data) {
//   let totalMenit = 0, telat = 0, lembur = 0;

//   for (const u of data) {
//     for (const tgl in u.logs || {}) {
//       if (!isInSelectedMonth(tgl)) continue;

//       const t = u.logs[tgl].t || "";
//       if (t.includes("-")) {
//         const [jamMasuk, jamPulang] = t.split("-");
//         const [hm, mm] = jamMasuk.split(":").map(Number);
//         const [hp, mp] = jamPulang.split(":").map(Number);

//         const masukMenit = hm * 60 + mm;
//         const pulangMenit = hp * 60 + mp;
//         const selisih = pulangMenit - masukMenit;

//         if (!isNaN(selisih)) totalMenit += selisih;
//         if (masukMenit > 8 * 60 + 5) telat++;
//         if (pulangMenit > 17 * 60 + 10) lembur++;
//       }
//     }
//   }

//   const jam = Math.floor(totalMenit / 60);
//   const lemburUpah = lembur * 15000;

//   document.getElementById('totalJam').textContent = jam;
//   document.getElementById('totalTelat').textContent = telat;
//   document.getElementById('totalLembur').textContent = lembur;
//   document.getElementById('totalUpah').textContent = "Rp" + lemburUpah.toLocaleString("id-ID");
// }

// document.getElementById('tabSummary').addEventListener('click', () => {
//   document.getElementById('summaryTab').classList.remove('hidden');
//   document.getElementById('detailTab').classList.add('hidden');
//   setActiveTab('tabSummary');
// });

// document.getElementById('tabDetail').addEventListener('click', () => {
//   document.getElementById('summaryTab').classList.add('hidden');
//   document.getElementById('detailTab').classList.remove('hidden');
//   setActiveTab('tabDetail');
// });

// function setActiveTab(id) {
//   document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
//   document.getElementById(id).classList.add('active');
// }

// // Lazy load dengan IntersectionObserver
// const observer = new IntersectionObserver(entries => {
//   if (entries[0].isIntersecting) renderNextBatch();
// }, { rootMargin: '100px' });

// observer.observe(loaderRow);
// window.onload = main;

document.addEventListener('DOMContentLoaded', async () => {
  const currentYear = new Date().getFullYear();
  const filePath = `../data/json/${currentYear}/absensi_2025-08-01_064956.json`; // Ganti sesuai nama file kamu

  try {
    const res = await fetch(filePath);
    if (!res.ok) throw new Error('Gagal memuat data JSON');

    const data = await res.json();
    const tbody = document.getElementById('dataBody');
    const thead = document.getElementById('dataHead');
    tbody.innerHTML = '';
    thead.innerHTML = '';

    let headerGenerated = false;

    data.forEach((rowObj, index) => {
      const rawString = Object.values(rowObj)[0];
      const parts = rawString.split(';').filter(s => s.trim() !== '');

      // Skip baris kosong
      if (parts.length === 0) return;

      // Auto-generate header dari baris ke-2 atau ke-3 yang berisi nama kolom
      if (!headerGenerated && parts.includes('Full Name')) {
        thead.innerHTML = `<tr>${parts.map(h => `<th class="px-4 py-2 border bg-gray-100 text-sm font-semibold">${h.trim()}</th>`).join('')}</tr>`;
        headerGenerated = true;
        return;
      }

      // Skip baris-baris awal yang bukan data
      if (parts.length < 3 || parts[0].toLowerCase().includes('transaction')) return;

      // Buat baris data
      const tr = document.createElement('tr');
      tr.innerHTML = parts.map(cell =>
        `<td class="px-4 py-2 border text-sm text-gray-700">${cell.trim()}</td>`
      ).join('');
      tbody.appendChild(tr);
    });

  } catch (err) {
    console.error('Gagal:', err);
  }
});
