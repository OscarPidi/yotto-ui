import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Radio, RadioGroup } from './Radio'

function Example() {
  return (
    <RadioGroup defaultValue="a" aria-label="Pick">
      <Radio value="a" aria-label="A" />
      <Radio value="b" aria-label="B" />
    </RadioGroup>
  )
}

describe('Radio', () => {
  it('renders an accessible radio group with the default selected', () => {
    render(<Example />)
    expect(screen.getByRole('radiogroup', { name: 'Pick' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'A' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'B' })).not.toBeChecked()
  })

  it('selects another option on click', async () => {
    render(<Example />)
    await userEvent.click(screen.getByRole('radio', { name: 'B' }))
    expect(screen.getByRole('radio', { name: 'B' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'A' })).not.toBeChecked()
  })
})
