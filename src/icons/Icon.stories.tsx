import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon } from './Icon'
import { iconData, type IconName } from './icon-data'

const names = Object.keys(iconData) as IconName[]

const meta = {
  title: 'Foundations/Icons',
  component: Icon,
  tags: ['autodocs'],
  args: { name: 'Boat', size: 24 },
  argTypes: { name: { control: 'select', options: names } },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {}

/** Every icon. Import as `IconBoat`, `IconSearch`, … or `<Icon name="Boat" />`. */
export const Gallery: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-6 gap-4 bg-background p-6 text-foreground">
      {names.map((n) => (
        <div key={n} className="flex flex-col items-center gap-2 rounded-md border border-border bg-card p-4">
          <Icon name={n} size={32} />
          <span className="text-body-sm text-muted-foreground">Icon{n}</span>
        </div>
      ))}
    </div>
  ),
}

export const Coloured: Story = {
  render: () => (
    <div className="flex gap-4">
      <Icon name="FavFill" className="text-destructive" />
      <Icon name="Check" className="text-success" />
      <Icon name="Boat" className="text-primary" />
      <Icon name="Info" className="text-muted-foreground" />
    </div>
  ),
}
