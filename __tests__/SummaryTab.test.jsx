// summaryTabs.test.js
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SummaryTab from '../src/js/tabs.js'

const summaryData = {
  work: 480,
  lembur: 120,
  uangLembur: 5000,
  telat: 30,
  earlyOut: 0,
  absence: 0,
  break: 60
}

describe('SummaryTab', () => {
  it('should display summary correctly', () => {
    render(<SummaryTab summary={summaryData} />)

    expect(screen.getByText(/work/i)).toBeDefined()
    expect(screen.getByText(/480/i)).toBeDefined()
    expect(screen.getByText(/uang lembur/i)).toHaveTextContent("5000")
  })
})
