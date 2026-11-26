import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '@/lib/utils'
import { IconCheck } from '@/icons'

/**
 * RadioGroup + Radio — pick exactly one option. Figma: "Radio" (currently "Radio Button").
 *
 * Figma property → prop
 *   Status  Off | On → selection is controlled by the group: `<RadioGroup value="a">` / `defaultValue`
 *
 * Keyboard: arrow keys move between options, Space selects.
 *
 * ```tsx
 * <RadioGroup defaultValue="personal" aria-label="Use">
 *   <label className="flex items-center gap-2"><Radio value="personal" /> Personal</label>
 *   <label className="flex items-center gap-2"><Radio value="business" /> Business</label>
 * </RadioGroup>
 * ```
 * For full-width selectable rows use `SelectableOption` instead.
 */
export function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn('grid gap-3', className)} {...props} />
}

export type RadioProps = React.ComponentProps<typeof RadioGroupPrimitive.Item>

export function Radio({ className, ...props }: RadioProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio"
      className={cn(
        'peer inline-flex size-4 shrink-0 items-center justify-center rounded-full border border-muted-foreground bg-card',
        'outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator data-slot="radio-indicator" className="flex items-center justify-center">
        <IconCheck size={12} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}
