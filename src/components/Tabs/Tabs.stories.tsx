import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-96"><Story /></div>],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/V36tWUjD8utwYT5m2wXWDE/Design-System-Yotto?node-id=46-111' },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="upcoming">
      <TabsList aria-label="Bookings">
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="past">Past</TabsTrigger>
        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming" className="text-body-lg text-foreground">3 upcoming trips</TabsContent>
      <TabsContent value="past" className="text-body-lg text-foreground">12 past trips</TabsContent>
      <TabsContent value="cancelled" className="text-body-lg text-foreground">No cancelled trips</TabsContent>
    </Tabs>
  ),
}
