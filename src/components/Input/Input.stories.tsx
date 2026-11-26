import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconEye, IconPassword, IconSearch } from '@/icons'
import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'Input text', 'aria-label': 'Example field', error: false, disabled: false },
  argTypes: { leftIcon: { control: false }, rightIcon: { control: false } },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/V36tWUjD8utwYT5m2wXWDE/Design-System-Yotto?node-id=26-36' },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Initial: Story = {}
export const Filled: Story = { args: { defaultValue: 'Typing' } }
export const Error: Story = { args: { defaultValue: 'Typing', error: true } }
export const Disabled: Story = { args: { disabled: true } }
export const WithIcons: Story = {
  args: { type: 'password', placeholder: 'Password', leftIcon: <IconPassword />, rightIcon: <IconEye /> },
}

/** Mirrors the Figma component set: Initial, Filled, Error (click a field to see Focus). */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 bg-background p-6">
      <Input aria-label="Initial" placeholder="Input text" leftIcon={<IconSearch />} />
      <Input aria-label="Filled" defaultValue="Typing" leftIcon={<IconPassword />} rightIcon={<IconEye />} />
      <Input aria-label="Error" defaultValue="Typing" error leftIcon={<IconPassword />} rightIcon={<IconEye />} />
    </div>
  ),
}
