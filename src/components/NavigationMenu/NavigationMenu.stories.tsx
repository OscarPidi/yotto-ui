import type { Meta, StoryObj } from '@storybook/react-vite'
import { MenuItem } from '@/components/MenuItem'
import { IconBoat, IconCalendar, IconUser, IconYotto } from '@/icons'
import { NavigationMenu } from './NavigationMenu'

const meta = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  args: { 'aria-label': 'Main' },
  decorators: [(Story) => <div className="w-100"><Story /></div>],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/V36tWUjD8utwYT5m2wXWDE/Design-System-Yotto?node-id=33-146' },
  },
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<typeof meta>

/** Mirrors Figma: Home selected, then My Boats, Schedules, Profile. */
export const Default: Story = {
  render: (args) => (
    <NavigationMenu {...args}>
      <MenuItem selected icon={<IconYotto />}>Home</MenuItem>
      <MenuItem icon={<IconBoat />}>My Boats</MenuItem>
      <MenuItem icon={<IconCalendar />}>Schedules</MenuItem>
      <MenuItem icon={<IconUser />}>Profile</MenuItem>
    </NavigationMenu>
  ),
}

/** The bar is frosted glass — this shows it over busy content. */
export const OverContent: Story = {
  render: (args) => (
    <div className="relative h-64 overflow-hidden rounded-lg bg-brand-gradient">
      <NavigationMenu {...args} className="absolute inset-x-0 bottom-0 px-2">
        <MenuItem selected icon={<IconYotto />}>Home</MenuItem>
        <MenuItem icon={<IconBoat />}>My Boats</MenuItem>
        <MenuItem icon={<IconCalendar />}>Schedules</MenuItem>
        <MenuItem icon={<IconUser />}>Profile</MenuItem>
      </NavigationMenu>
    </div>
  ),
}
