// utils.js

/**
 * Parse jam string "HH:MM" jadi menit
 */
export function parseTime(str) {
  if (!str) return null;
  const [h, m] = str.split(":").map(Number);
  return h * 60 + m;
}

export function formatJamMenit(menit) {
  if (menit == null) return "-";
  const h = Math.floor(menit / 60);
  const m = String(menit % 60).padStart(2, "0");
  return `${h}:${m}`;
}

const aturanDenda = [
  [5, 0],
  [15, 10000],
  [30, 25000],
  [60, 50000],
  [Infinity, 100000]
];

export function hitungDendaTelat(menitTelat) {
  return aturanDenda.find(([max]) => menitTelat <= max)[1];
}

export function isSabtu(year, month, tanggal) {
  // month di JS 0-based
  const d = new Date(year, month - 1, tanggal);
  // if(d.getDay() === 6 || d.getDay() === 0) console.log('sabtu');
  return d.getDay() === 6 || d.getDay() === 0;
}

export function toYmd(input) {
  if (!input) return "";
  if (input instanceof Date) {
    const y = input.getFullYear();
    const m = String(input.getMonth() + 1).padStart(2, "0");
    const d = String(input.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  let s = String(input).trim();
  if (s.includes("/")) {
    const [a, b, c] = s.split("/");
    if (a.length <= 2 && b.length <= 2 && c.length === 4) return `${c}-${String(a).padStart(2, "0")}-${String(b).padStart(2, "0")}`;
    if (a.length === 4) return `${a}-${String(b).padStart(2, "0")}-${String(c).padStart(2, "0")}`;
  }
  if (s.includes("-")) {
    const [y, m, d] = s.split("-");
    if (y.length === 4) return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }
  return s;
}