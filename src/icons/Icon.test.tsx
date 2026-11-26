import { render, screen } from '@testing-library/react'
import { Icon, IconBoat, IconYotto } from './Icon'
import { iconData } from './icon-data'

describe('Icon', () => {
  it('is decorative (hidden from screen readers) by default', () => {
    const { container } = render(<IconBoat />)
    const svg = container.querySelector('svg')!
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg).toHaveAttribute('width', '24')
    expect(svg).toHaveAttribute('fill', 'currentColor')
  })

  it('becomes an image with a name when label is set', () => {
    render(<Icon name="Search" label="Search" />)
    expect(screen.getByRole('img', { name: 'Search' })).toBeInTheDocument()
  })

  it('keeps the original viewBox (Yotto mark is 40×42)', () => {
    const { container } = render(<IconYotto size={32} />)
    expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 40 42')
    expect(container.querySelectorAll('path')).toHaveLength(2)
  })

  it('has no hard-coded colours in any shape', () => {
    for (const shape of Object.values(iconData)) {
      for (const d of shape.paths) expect(d).not.toMatch(/fill|#/)
    }
  })
})
