// summary.test.js
import { describe, it, expect } from 'vitest'
import { calculateSummaryForUser } from '../src/js/summary.js'

const dummyLogs = [
  {
    user: 'Budi',
    date: '2025-08-04', // Senin
    checkIn: '08:10',
    checkOut: '17:10',
    breaks: 60,
  },
  {
    user: 'Budi',
    date: '2025-08-09', // Sabtu
    checkIn: '08:00',
    checkOut: '14:00',
    breaks: 30,
  },
]

describe('calculateSummaryForUser', () => {
  it('should calculate correct summary including penalty for lateness and adjusted work hours on Saturday', () => {
    const summary = calculateSummaryForUser(dummyLogs, 'Budi')

    expect(summary.work).toBe(8 * 60 + 6 * 60) // Monday (8h) + Saturday (6h)
    expect(summary.break).toBe(90) // 60 + 30
    expect(summary.telat).toBe(10) // Monday 08:10 -> 10 mins late
    expect(summary.earlyOut).toBe(0) // Pulang tidak lebih awal
    expect(summary.absence).toBe(0)
    expect(summary.lembur).toBe(70) // Monday: 17:10 → 16:05 = 65 mins + 5 mins buffer
    expect(summary.uangLembur).toBe(5000 - 10000) // 1 jam x 5000 - 10 menit = denda 10rb
  })
})