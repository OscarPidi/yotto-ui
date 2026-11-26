import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pill } from './Pill'

const meta = {
  title: 'Components/Pill',
  component: Pill,
  tags: ['autodocs'],
  args: { children: 'Pill Info' },
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/V36tWUjD8utwYT5m2wXWDE/Design-System-Yotto?node-id=64-255' },
  },
} satisfies Meta<typeof Pill>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const OnACard: Story = {
  render: () => (
    <div className="flex gap-2 rounded-lg bg-card p-4 shadow-glow">
      <Pill>Available</Pill>
      <Pill>Skipper included</Pill>
    </div>
  ),
}
