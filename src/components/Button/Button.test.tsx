import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders a button with type="button" by default', () => {
    render(<Button>Book</Button>)
    const btn = screen.getByRole('button', { name: 'Book' })
    expect(btn).toHaveAttribute('type', 'button')
    expect(btn).toHaveAttribute('data-variant', 'primary')
    expect(btn).toHaveAttribute('data-size', 'lg')
  })

  it('applies variant and size classes from tokens only', () => {
    render(<Button variant="solid" size="sm">Go</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('bg-primary')
    expect(btn.className).toContain('text-primary-foreground')
    expect(btn.className).toContain('text-body-lg')
    expect(btn.className).not.toMatch(/#[0-9a-f]{3,6}/i)
  })

  it('keeps both type-scale and colour classes (cn does not drop them)', () => {
    render(<Button variant="solid">Go</Button>)
    const cls = screen.getByRole('button').className
    expect(cls).toContain('text-h5')
    expect(cls).toContain('text-primary-foreground')
  })

  it('has cream and magenta brand variants built from tokens', () => {
    render(
      <>
        <Button variant="cream">Cream</Button>
        <Button variant="magenta">Magenta</Button>
      </>,
    )
    expect(screen.getByRole('button', { name: 'Cream' }).className).toContain('bg-cream')
    expect(screen.getByRole('button', { name: 'Cream' }).className).toContain('text-cream-foreground')
    const magenta = screen.getByRole('button', { name: 'Magenta' }).className
    expect(magenta).toContain('border-magenta')
    expect(magenta).toContain('text-magenta')
  })

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>No</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders icons around the label', () => {
    render(<Button leftIcon={<span data-testid="l" />} rightIcon={<span data-testid="r" />}>Mid</Button>)
    const btn = screen.getByRole('button')
    expect(btn.firstChild).toBe(screen.getByTestId('l'))
    expect(btn.lastChild).toBe(screen.getByTestId('r'))
  })

  it('renders as its child with asChild', () => {
    render(<Button asChild><a href="/boats">Boats</a></Button>)
    const link = screen.getByRole('link', { name: 'Boats' })
    expect(link).toHaveAttribute('data-slot', 'button')
    expect(link).not.toHaveAttribute('type')
  })
})
