import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Pill — small read-only label for a status or attribute (e.g. "Available", "New").
 * Figma: "Pill". Not clickable; for choices use SelectableOption or Tabs.
 *
 * Figma: mint text on light mint. Code uses dark text on a mint tint for readable contrast
 * (Figma's colours are ~1.6:1, below the 4.5:1 minimum) — see PLAN.md open questions.
 */
export type PillProps = React.ComponentProps<'span'>

export function Pill({ className, ...props }: PillProps) {
  return (
    <span
      data-slot="pill"
      className={cn(
        'inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap rounded-sm bg-success/25 p-1 text-body-md text-foreground',
        '[&>svg]:size-3',
        className,
      )}
      {...props}
    />
  )
}
