import { render, screen } from '@testing-library/react'
import { MenuItem } from '@/components/MenuItem'
import { NavigationMenu } from './NavigationMenu'

describe('NavigationMenu', () => {
  it('is a named navigation landmark with its items', () => {
    render(
      <NavigationMenu aria-label="Main">
        <MenuItem selected>Home</MenuItem>
        <MenuItem>Profile</MenuItem>
      </NavigationMenu>,
    )
    const nav = screen.getByRole('navigation', { name: 'Main' })
    expect(nav).toContainElement(screen.getByRole('button', { name: 'Home' }))
    expect(screen.getAllByRole('button')).toHaveLength(2)
  })
})
