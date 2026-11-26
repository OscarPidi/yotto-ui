import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconCalendar } from '@/icons'
import { MenuItem } from './MenuItem'

const meta = {
  title: 'Components/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  args: { children: 'Menu Item', selected: false, icon: <IconCalendar /> },
  argTypes: { icon: { control: false } },
  decorators: [(Story) => <div className="flex w-28 rounded-full bg-glass p-1"><Story /></div>],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/V36tWUjD8utwYT5m2wXWDE/Design-System-Yotto?node-id=33-46' },
  },
} satisfies Meta<typeof MenuItem>

export default meta
type Story = StoryObj<typeof meta>

export const Off: Story = {}
export const On: Story = { args: { selected: true } }
export const TextOnly: Story = { args: { icon: undefined } }
export const AsLink: Story = {
  render: (args) => (
    <MenuItem {...args} asChild>
      <a href="#schedules">Schedules</a>
    </MenuItem>
  ),
}
