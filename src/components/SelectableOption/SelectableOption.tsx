import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '@/lib/utils'
import { IconCheck } from '@/icons'

/**
 * SelectableOption — a full-width row the user taps to choose one option from a list
 * (e.g. "Just for me (Personal use)"). Figma: "SelectableOption" (currently "Single selectors").
 * Always place inside `<RadioGroup>`; it is a radio button under the hood.
 *
 * Figma property → prop
 *   Status  Off | On → selection is controlled by the parent RadioGroup (`value` / `defaultValue`)
 *
 * ```tsx
 * <RadioGroup defaultValue="personal" aria-label="Who is this for?">
 *   <SelectableOption value="personal">Just for me (Personal use)</SelectableOption>
 *   <SelectableOption value="company">For my company</SelectableOption>
 * </RadioGroup>
 * ```
 */
export interface SelectableOptionProps extends React.ComponentProps<typeof RadioGroupPrimitive.Item> {
  /** Optional icon before the label. */
  icon?: React.ReactNode
}

export function SelectableOption({ className, icon, children, ...props }: SelectableOptionProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="selectable-option"
      className={cn(
        'group flex w-full items-center gap-2.5 rounded-sm bg-muted p-4 text-left text-body-xl text-foreground',
        'outline-none transition-[background-color,box-shadow] focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'data-[state=checked]:bg-accent data-[state=checked]:shadow-glow',
        'disabled:cursor-not-allowed disabled:opacity-50',
        '[&>svg]:size-5 [&>svg]:shrink-0',
        className,
      )}
      {...props}
    >
      {icon}
      <span className="flex-1">{children}</span>
      {/* The radio circle (Figma: nested "Radio Button" instance) */}
      <span
        aria-hidden="true"
        className={cn(
          'inline-flex size-4 shrink-0 items-center justify-center rounded-full border border-muted-foreground bg-card',
          // border uses accent-foreground so the circle stays visible on the (dark-mode) blue row
          'group-data-[state=checked]:border-accent-foreground group-data-[state=checked]:bg-primary group-data-[state=checked]:text-primary-foreground',
        )}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <IconCheck size={12} />
        </RadioGroupPrimitive.Indicator>
      </span>
    </RadioGroupPrimitive.Item>
  )
}
