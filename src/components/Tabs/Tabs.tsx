import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'
import { glassBarClasses, menuItemClasses } from '@/components/MenuItem/MenuItem.variants'

/**
 * Tabs — switch between views on the same page. Figma: "Tabs" (currently "Tabs container").
 * Same look as the bottom NavigationMenu items, without icons.
 *
 * ```tsx
 * <Tabs defaultValue="upcoming">
 *   <TabsList aria-label="Bookings">
 *     <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
 *     <TabsTrigger value="past">Past</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="upcoming">…</TabsContent>
 *   <TabsContent value="past">…</TabsContent>
 * </Tabs>
 * ```
 * Keyboard: arrow keys move between tabs. For page-to-page navigation use NavigationMenu.
 */
export function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn('flex flex-col gap-4', className)} {...props} />
}

export function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List data-slot="tabs-list" className={cn(glassBarClasses, 'w-full', className)} {...props} />
}

export function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return <TabsPrimitive.Trigger data-slot="tabs-trigger" className={cn(menuItemClasses, 'h-11', className)} {...props} />
}

export function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50', className)}
      {...props}
    />
  )
}
