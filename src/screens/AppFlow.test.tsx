import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppFlow } from './AppFlow'
import { budgetFromPosition } from './onboarding/answers'

const next = () => userEvent.click(screen.getByRole('button', { name: 'Next' }))
const pick = (name: string) => userEvent.click(screen.getByRole('radio', { name }))

describe('Sign-in journey', () => {
  it('goes Welcome → Login → 10 questions → Home and reports the answers', async () => {
    const onComplete = vi.fn()
    render(<AppFlow onOnboardingComplete={onComplete} />)

    await userEvent.click(screen.getByRole('button', { name: 'Get Started' }))
    await userEvent.type(screen.getByLabelText('Email'), 'sam@example.com')
    await userEvent.type(screen.getByLabelText('Password'), 'test-pass')
    await userEvent.click(screen.getByRole('button', { name: 'Log In' }))

    // 1 · crew size — Next stays disabled until a number is entered
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1')
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled()
    await userEvent.type(screen.getByLabelText('Crew or group size'), '12')
    await next()
    // 2–4 · single choice
    await pick('For a company or commercial use')
    await next()
    await pick('In the next 1–3 months')
    await next()
    await pick('I have some experience')
    await next()
    // 5 · budget slider (default value is fine)
    expect(screen.getByRole('slider', { name: 'Budget' })).toBeInTheDocument()
    await next()
    // 6 · funding
    await pick('Marine Financing')
    await next()
    // 7 · multi choice
    await userEvent.click(screen.getByRole('button', { name: 'Sailboat' }))
    await userEvent.click(screen.getByRole('button', { name: 'Vessel' }))
    expect(screen.getByRole('button', { name: 'Sailboat' })).toHaveAttribute('aria-pressed', 'true')
    await next()
    // 8 · condition
    await pick('Used')
    await next()
    // 9 · size, switch to metres
    await userEvent.click(screen.getByRole('tab', { name: 'M' }))
    expect(screen.getByText('12')).toBeInTheDocument() // 40 ft ≈ 12 m
    await next()
    // 10 · activities
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '10')
    await userEvent.click(screen.getByRole('button', { name: 'Fishing' }))
    await next()

    expect(screen.getByRole('heading', { name: 'All Boats' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument()
    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        crewSize: '12',
        forWhom: 'For a company or commercial use',
        boatStyles: ['Sailboat', 'Vessel'],
        sizeFt: 40,
        sizeUnit: 'm',
        activities: ['Fishing'],
      }),
    )
  })

  it('back on the first question returns to login', async () => {
    render(<AppFlow initialScreen="onboarding" />)
    await userEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument()
  })

  it('budget slider covers $1K to $5M', () => {
    expect(budgetFromPosition(0)).toBe(1_000)
    expect(budgetFromPosition(100)).toBe(5_000_000)
  })
})
