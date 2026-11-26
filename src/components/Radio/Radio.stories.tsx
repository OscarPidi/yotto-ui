import type { Meta, StoryObj } from '@storybook/react-vite'
import { Radio, RadioGroup } from './Radio'

const meta = {
  title: 'Components/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/V36tWUjD8utwYT5m2wXWDE/Design-System-Yotto?node-id=53-348' },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="personal" aria-label="Who is this for?" className="text-body-lg text-foreground">
      <label className="flex items-center gap-2"><Radio value="personal" /> Personal use</label>
      <label className="flex items-center gap-2"><Radio value="company" /> Company</label>
      <label className="flex items-center gap-2"><Radio value="other" disabled /> Other (disabled)</label>
    </RadioGroup>
  ),
}
