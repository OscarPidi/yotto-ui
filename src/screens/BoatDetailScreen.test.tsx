import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppFlow } from './AppFlow'
import { BoatDetailScreen } from './BoatDetailScreen'
import { sampleBoats } from './boats'

const boat = sampleBoats[1]

describe('BoatDetailScreen', () => {
  it('shows the four key facts', () => {
    render(<BoatDetailScreen boat={boat} />)
    expect(screen.getByRole('heading', { name: boat.name })).toBeInTheDocument()
    expect(screen.getByText('Length Overall').nextSibling).toHaveTextContent(boat.length)
    expect(screen.getByText('Owner & Guests').nextSibling).toHaveTextContent(boat.guests)
    expect(screen.getByText('Engine Type').nextSibling).toHaveTextContent(boat.engineType)
    expect(screen.getByText('GPS Radar').nextSibling).toHaveTextContent('Yes')
  })

  it('says No when the boat has no GPS radar', () => {
    render(<BoatDetailScreen boat={sampleBoats[2]} />)
    expect(screen.getByText('GPS Radar').nextSibling).toHaveTextContent('No')
  })

  it('switches the General Information tabs', async () => {
    render(<BoatDetailScreen boat={boat} />)
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Guest Capacity')
    await userEvent.click(screen.getByRole('tab', { name: 'Performance' }))
    expect(within(screen.getByRole('tabpanel')).getByText('38 KNOTS')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('tab', { name: 'Anatomy' }))
    expect(within(screen.getByRole('tabpanel')).getByText('72,000 LBS')).toBeInTheDocument()
  })

  it('schedules a visit, goes back and toggles favourite', async () => {
    const onSchedule = vi.fn()
    const onBack = vi.fn()
    render(<BoatDetailScreen boat={boat} onScheduleVisit={onSchedule} onBack={onBack} />)
    await userEvent.click(screen.getByRole('button', { name: 'Schedule a visit' }))
    expect(onSchedule).toHaveBeenCalledWith(boat)
    const fav = screen.getByRole('button', { name: 'Save to favourites' })
    await userEvent.click(fav)
    expect(fav).toHaveAttribute('aria-pressed', 'true')
    await userEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(onBack).toHaveBeenCalledOnce()
  })

  it('opens from a Home card and returns to Home', async () => {
    render(<AppFlow initialScreen="home" />)
    await userEvent.click(screen.getByRole('button', { name: boat.name }))
    expect(screen.getByRole('heading', { level: 1, name: boat.name })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(screen.getByRole('heading', { name: 'All Boats' })).toBeInTheDocument()
  })
})
