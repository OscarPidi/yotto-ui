import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioGroup } from '@/components/Radio'
import { IconBoat, IconUser } from '@/icons'
import { SelectableOption } from './SelectableOption'

const meta = {
  title: 'Components/SelectableOption',
  component: SelectableOption,
  tags: ['autodocs'],
  args: { value: 'personal', children: 'Just for me (Personal use)' },
  decorators: [(Story) => <div className="w-96"><Story /></div>],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/V36tWUjD8utwYT5m2wXWDE/Design-System-Yotto?node-id=92-87' },
  },
} satisfies Meta<typeof SelectableOption>

export default meta
type Story = StoryObj<typeof meta>

/** Mirrors Figma: first row Off, second row On. */
export const Group: Story = {
  render: () => (
    <RadioGroup defaultValue="company" aria-label="Who is this for?">
      <SelectableOption value="personal">Just for me (Personal use)</SelectableOption>
      <SelectableOption value="company">For my company</SelectableOption>
      <SelectableOption value="later" disabled>Decide later (disabled)</SelectableOption>
    </RadioGroup>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <RadioGroup defaultValue="owner" aria-label="I am a…">
      <SelectableOption value="owner" icon={<IconBoat />}>Boat owner</SelectableOption>
      <SelectableOption value="guest" icon={<IconUser />}>Guest</SelectableOption>
    </RadioGroup>
  ),
}
