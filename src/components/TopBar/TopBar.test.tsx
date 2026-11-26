import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TopBar } from './TopBar'

describe('TopBar', () => {
  it('shows the title as a heading and a working back button', async () => {
    const onBack = vi.fn()
    render(<TopBar title="Bookings" onBack={onBack} />)
    expect(screen.getByRole('heading', { name: 'Bookings' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(onBack).toHaveBeenCalledOnce()
  })

  it('has no back button without onBack', () => {
    render(<TopBar title="Home" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('names the right action', async () => {
    const onRight = vi.fn()
    render(<TopBar title="x" rightIcon={<svg />} rightLabel="Open calendar" onRightClick={onRight} />)
    await userEvent.click(screen.getByRole('button', { name: 'Open calendar' }))
    expect(onRight).toHaveBeenCalledOnce()
  })

  it('reports stepper progress', () => {
    render(<TopBar type="stepper" step={2} totalSteps={5} />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '2')
    expect(bar).toHaveAttribute('aria-valuetext', 'Step 2 of 5')
  })

  it('shows the Yotto mark for type="logo"', () => {
    render(<TopBar type="logo" />)
    expect(screen.getByRole('img', { name: 'Yotto' })).toBeInTheDocument()
  })
})
