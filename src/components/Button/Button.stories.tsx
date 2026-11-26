import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
)

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'CTA Text', variant: 'primary', size: 'lg', disabled: false },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'solid', 'secondary', 'outline', 'cream', 'magenta'] },
    size: { control: 'inline-radio', options: ['lg', 'sm'] },
    leftIcon: { control: false },
    rightIcon: { control: false },
  },
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/V36tWUjD8utwYT5m2wXWDE/Design-System-Yotto?node-id=24-97' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const Solid: Story = { args: { variant: 'solid' } }
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Outline: Story = { args: { variant: 'outline' } }
export const Cream: Story = { args: { variant: 'cream' } }
export const Magenta: Story = { args: { variant: 'magenta' } }

/** Cream and magenta are made for brand backgrounds (photos, gradient). */
export const OnBrandBackground: Story = {
  render: () => (
    <div className="flex gap-4 rounded-lg bg-brand-gradient p-8">
      <Button variant="cream">CTA Text</Button>
      <Button variant="magenta">CTA Text</Button>
    </div>
  ),
}
export const Small: Story = { args: { size: 'sm' } }
export const Disabled: Story = { args: { disabled: true } }
export const WithIcon: Story = { args: { leftIcon: <PlusIcon /> } }

/** Every variant × size × state — mirrors the Figma component set. */
export const Matrix: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-6 items-center gap-4 bg-background p-6 text-foreground">
      {(['primary', 'solid', 'secondary', 'outline', 'cream', 'magenta'] as const).map((variant) => (
        <div key={variant} className="flex flex-col items-start gap-3">
          <span className="text-body-md text-muted-foreground">{variant}</span>
          <Button variant={variant}>CTA Text</Button>
          <Button variant={variant} size="sm">CTA Text</Button>
          <Button variant={variant} disabled>CTA Text</Button>
          <Button variant={variant} size="sm" disabled>CTA Text</Button>
        </div>
      ))}
    </div>
  ),
}
