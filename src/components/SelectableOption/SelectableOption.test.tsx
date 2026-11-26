import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RadioGroup } from '@/components/Radio'
import { SelectableOption } from './SelectableOption'

describe('SelectableOption', () => {
  it('works as a radio named by its text', async () => {
    render(
      <RadioGroup aria-label="Use">
        <SelectableOption value="personal">Just for me</SelectableOption>
        <SelectableOption value="company">Company</SelectableOption>
      </RadioGroup>,
    )
    const personal = screen.getByRole('radio', { name: 'Just for me' })
    expect(personal).not.toBeChecked()
    await userEvent.click(personal)
    expect(personal).toBeChecked()
    expect(personal).toHaveAttribute('data-state', 'checked')
  })
})
