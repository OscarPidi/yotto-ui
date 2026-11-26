import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
  it('renders a labelled text field', () => {
    render(<Input aria-label="Email" />)
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('type', 'text')
  })

  it('accepts typing', async () => {
    render(<Input aria-label="Name" />)
    const field = screen.getByRole('textbox')
    await userEvent.type(field, 'Riva')
    expect(field).toHaveValue('Riva')
  })

  it('marks errors for assistive tech', () => {
    render(<Input aria-label="Email" error />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByRole('textbox').parentElement).toHaveAttribute('data-error', 'true')
  })

  it('keeps a real placeholder when given', () => {
    render(<Input aria-label="Search" placeholder="Search boats" />)
    expect(screen.getByPlaceholderText('Search boats')).toBeInTheDocument()
  })

  it('renders icons around the field', () => {
    render(<Input aria-label="x" leftIcon={<span data-testid="l" />} rightIcon={<span data-testid="r" />} />)
    const box = screen.getByRole('textbox').parentElement!
    expect(box.firstChild).toBe(screen.getByTestId('l'))
    expect(box.lastChild).toBe(screen.getByTestId('r'))
  })
})
