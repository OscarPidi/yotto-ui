import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconCalendar } from '@/icons'
import { TopBar } from './TopBar'

const noop = () => {}

const meta = {
  title: 'Components/TopBar',
  component: TopBar,
  tags: ['autodocs'],
  args: { type: 'page-name', title: 'Section', onBack: noop },
  argTypes: {
    type: { control: 'inline-radio', options: ['page-name', 'logo', 'stepper'] },
    rightIcon: { control: false },
    logo: { control: false },
  },
  decorators: [(Story) => <div className="w-105 bg-background"><Story /></div>],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/V36tWUjD8utwYT5m2wXWDE/Design-System-Yotto?node-id=27-91' },
  },
} satisfies Meta<typeof TopBar>

export default meta
type Story = StoryObj<typeof meta>

export const PageName: Story = {
  args: { rightIcon: <IconCalendar />, rightLabel: 'Open calendar', onRightClick: noop },
}
export const Logo: Story = { args: { type: 'logo' } }
export const Stepper: Story = { args: { type: 'stepper', step: 1, totalSteps: 12 } }
export const StepperHalfway: Story = { args: { type: 'stepper', step: 3, totalSteps: 6 } }
