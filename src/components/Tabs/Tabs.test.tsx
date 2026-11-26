import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'

describe('Tabs', () => {
  it('shows the panel of the clicked tab', async () => {
    render(
      <Tabs defaultValue="a">
        <TabsList aria-label="Example">
          <TabsTrigger value="a">First</TabsTrigger>
          <TabsTrigger value="b">Second</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Panel A</TabsContent>
        <TabsContent value="b">Panel B</TabsContent>
      </Tabs>,
    )
    expect(screen.getByRole('tablist', { name: 'Example' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'First' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Panel A')).toBeVisible()

    await userEvent.click(screen.getByRole('tab', { name: 'Second' }))
    expect(screen.getByRole('tab', { name: 'Second' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Panel B')).toBeVisible()
  })
})
