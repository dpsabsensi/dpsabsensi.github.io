// table.js

// Generate <thead>
export function generateTableHead(columns, theadEl, extraClass = "") {
  theadEl.innerHTML = `
    <tr class="${extraClass}">
      ${columns.map(col => `
        <th 
          class="px-4 py-3 border-b text-center cursor-pointer"
          data-type="${col.type || "string"}"
          data-sort="${col.key}"
        >${col.label}</th>
      `).join("")}
    </tr>
  `;
}

// Generate <tbody>
export function generateTableRows(data, tbodyEl, columns) {
  tbodyEl.innerHTML = data.map(row => `
    <tr>
      ${columns.map(col => `
        <td class="px-4 py-2 border text-center">${row[col.key] ?? "-"}</td>
      `).join("")}
    </tr>
  `).join("");
}

// Sorting
export function sortTable(tbodyEl, column, type, direction = "asc") {
  const rows = Array.from(tbodyEl.querySelectorAll("tr"));

  const parseValue = (cell) => {
    const text = cell.textContent.trim();
    if (type === "number") return parseFloat(text) || 0;
    if (type === "time") {
      const [h, m] = text.split(":").map(Number);
      return h * 60 + (m || 0);
    }
    return text.toLowerCase();
  };

  rows.sort((a, b) => {
    const aVal = parseValue(a.children[column]);
    const bVal = parseValue(b.children[column]);
    return direction === "asc" ? aVal - bVal : bVal - aVal;
  });

  tbodyEl.innerHTML = "";
  rows.forEach(r => tbodyEl.appendChild(r));
}