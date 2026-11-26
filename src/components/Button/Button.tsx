import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import { buttonVariants, type ButtonVariantProps } from './Button.variants'

/**
 * Button — the main action element. Figma: "Button" (currently named "CTA").
 *
 * Figma property → prop
 *   Variant  Primary | Solid | Secondary | Outline | Cream | Magenta
 *            → variant="primary" | "solid" | "secondary" | "outline" | "cream" | "magenta"
 *   Size     Large | Small                         → size="lg" | "sm"
 *   Disabled true | false                          → disabled
 *
 * When to use
 *   primary   — the one most important action on a screen (brand gradient). Max one per view.
 *   solid     — strong action when a gradient would be too loud, or a second key action.
 *   secondary — supporting action next to a primary/solid button.
 *   outline   — low-emphasis action on light or dark page backgrounds (not on the blue gradient).
 *   cream     — soft brand action on photos or the brand gradient (warm off-white fill, dark text).
 *   magenta   — accent action in magenta (outline on frosted glass), e.g. promotions.
 *
 * Disabled always uses grey text on a grey fill (readable; differs from Figma's white text on purpose).
 * Buttons fit their label; add `className="w-full"` for a full-width button.
 */
export interface ButtonProps extends React.ComponentProps<'button'>, ButtonVariantProps {
  /** Icon shown before the label (e.g. `<IconAdd />`). Figma: "Left Icon". */
  leftIcon?: React.ReactNode
  /** Icon shown after the label. Figma: "Right Icon". */
  rightIcon?: React.ReactNode
  /** Render the child element (e.g. a router `<Link>`) with button styles instead of a `<button>`. */
  asChild?: boolean
}

export function Button({
  className,
  variant,
  size,
  leftIcon,
  rightIcon,
  asChild = false,
  type,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      data-slot="button"
      data-variant={variant ?? 'primary'}
      data-size={size ?? 'lg'}
      className={cn(buttonVariants({ variant, size }), className)}
      {...(asChild ? {} : { type: type ?? 'button' })}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </Comp>
  )
}
