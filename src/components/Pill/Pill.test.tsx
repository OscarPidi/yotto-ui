import { render, screen } from '@testing-library/react'
import { Pill } from './Pill'

describe('Pill', () => {
  it('renders its text and uses tokens only', () => {
    render(<Pill>Available</Pill>)
    const pill = screen.getByText('Available')
    expect(pill).toHaveAttribute('data-slot', 'pill')
    expect(pill.className).toContain('bg-success/25')
    expect(pill.className).toContain('text-body-md')
  })
})
