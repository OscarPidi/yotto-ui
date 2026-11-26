import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import { menuItemClasses } from './MenuItem.variants'

/**
 * MenuItem — one destination in the bottom NavigationMenu (icon above label).
 * Figma: "MenuItem" (currently "Manu Item").
 *
 * Figma property → prop
 *   Status     Off | On      → selected (also sets aria-current="page")
 *   Show Icon  + icon layer  → icon={<IconCalendar />}
 *
 * Use `asChild` to render your router link: `<MenuItem asChild selected><Link to="/">Home</Link></MenuItem>`.
 * For switching views inside one page, use Tabs instead.
 */
export interface MenuItemProps extends React.ComponentProps<'button'> {
  /** The current page / active destination. Figma: Status=On. */
  selected?: boolean
  /** Icon above the label (24px). Figma: "Show Icon". */
  icon?: React.ReactNode
  /** Render the child element (e.g. a router `<Link>`) instead of a `<button>`. */
  asChild?: boolean
}

export function MenuItem({ selected = false, icon, asChild = false, className, children, type, ...props }: MenuItemProps) {
  const Comp = asChild ? Slot : 'button'
  const common = {
    'data-slot': 'menu-item',
    'data-selected': selected || undefined,
    'aria-current': selected ? ('page' as const) : undefined,
    className: cn(menuItemClasses, icon ? 'h-13' : 'h-11', className),
    ...(asChild ? {} : { type: type ?? 'button' }),
    ...props,
  }
  if (asChild) {
    // With asChild, the link's own children are the label; the icon is added before them.
    const child = React.Children.only(children) as React.ReactElement<{ children?: React.ReactNode }>
    return (
      <Comp {...common}>
        {React.cloneElement(child, undefined, <>{icon}{child.props.children}</>)}
      </Comp>
    )
  }
  return (
    <Comp {...common}>
      {icon}
      {children}
    </Comp>
  )
}
