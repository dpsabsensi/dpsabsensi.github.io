// ideal.js
import { formatJamMenit } from './utils.js';

/**
 * Ambil jam kerja ideal dari data backend (hasil parse.php)
 * @param {Object} data - JSON hasil parse.php
 * @returns {{minutes:number, formatted:string, hariKerja:number, hariLibur:number}}
 */
export function getJamKerjaIdeal(data) {
  const ideal = data.i || {};
  const minutes   = ideal.m || 0;
  const hariKerja = ideal.k || 0;
  const hariLibur = ideal.l || 0;

  return {
    minutes,
    formatted: formatJamMenit(minutes),
    hariKerja,
    hariLibur
  };
}