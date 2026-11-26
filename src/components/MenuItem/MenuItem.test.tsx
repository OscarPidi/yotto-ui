import { render, screen } from '@testing-library/react'
import { MenuItem } from './MenuItem'

describe('MenuItem', () => {
  it('marks the selected item as the current page', () => {
    render(<MenuItem selected>Home</MenuItem>)
    const item = screen.getByRole('button', { name: 'Home' })
    expect(item).toHaveAttribute('aria-current', 'page')
    expect(item).toHaveAttribute('data-selected', 'true')
  })

  it('is not current when not selected', () => {
    render(<MenuItem>Profile</MenuItem>)
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-current')
  })

  it('renders a link with the icon inside when asChild', () => {
    render(
      <MenuItem asChild selected icon={<svg data-testid="icon" />}>
        <a href="/boats">My Boats</a>
      </MenuItem>,
    )
    const link = screen.getByRole('link', { name: 'My Boats' })
    expect(link).toHaveAttribute('aria-current', 'page')
    expect(link.firstChild).toBe(screen.getByTestId('icon'))
  })
})
