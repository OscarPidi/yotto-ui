import * as React from 'react'
import { cn } from '@/lib/utils'
import { glassBarClasses } from '@/components/MenuItem/MenuItem.variants'

/**
 * NavigationMenu — the app's floating bottom bar (frosted glass) holding 3–5 MenuItems.
 * Figma: "NavigationMenu". Not a dropdown menu (this differs from shadcn's NavigationMenu).
 *
 * ```tsx
 * <NavigationMenu aria-label="Main">
 *   <MenuItem selected icon={<IconBoat />}>My Boats</MenuItem>
 *   <MenuItem icon={<IconCalendar />}>Schedules</MenuItem>
 *   <MenuItem icon={<IconUser />}>Profile</MenuItem>
 * </NavigationMenu>
 * ```
 * Mark exactly one item `selected`. Put the bar at the bottom of the screen
 * (e.g. `className="fixed inset-x-4 bottom-4"`).
 */
export interface NavigationMenuProps extends React.ComponentProps<'nav'> {
  /** Required: names the landmark for screen readers, e.g. "Main". */
  'aria-label': string
}

export function NavigationMenu({ className, children, ...props }: NavigationMenuProps) {
  return (
    <nav data-slot="navigation-menu" className={cn('w-full py-3', className)} {...props}>
      <div className={cn(glassBarClasses, 'h-15.5 px-1.25')}>{children}</div>
    </nav>
  )
}
