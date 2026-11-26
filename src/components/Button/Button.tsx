import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import { buttonVariants, type ButtonVariantProps } from './Button.variants'

/**
 * Button — the main action element. Figma: "Button" (currently named "CTA").
 *
 * Figma property → prop
 *   Variant  Primary | Solid | Secondary | Outline → variant="primary" | "solid" | "secondary" | "outline"
 *   Size     Large | Small                         → size="lg" | "sm"
 *   Disabled true | false                          → disabled
 *
 * When to use
 *   primary   — the one most important action on a screen (brand gradient). Max one per view.
 *   solid     — strong action when a gradient would be too loud, or a second key action.
 *   secondary — supporting action next to a primary/solid button.
 *   outline   — low-emphasis action, also on coloured or image backgrounds.
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
