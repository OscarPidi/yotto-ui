import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Input — single-line text field. Figma: "Input" (currently named "Input text").
 *
 * Figma property → prop
 *   Status          Initial | Focus | Filled → automatic (focus ring while typing, darker border once filled)
 *   Status          Error                    → error
 *   Show Left Icon  + icon layer             → leftIcon={<IconPassword />}
 *   Show Right Icon + icon layer             → rightIcon={<IconEye />}
 *
 * Always pair with a visible label or `aria-label`. Put the error message next to the
 * field and link it with `aria-describedby`.
 */
export interface InputProps extends React.ComponentProps<'input'> {
  /** Shows the error state (red border) and sets `aria-invalid`. Figma: Status=Error. */
  error?: boolean
  /** Icon at the start of the field (20px). Figma: "Show Left Icon". */
  leftIcon?: React.ReactNode
  /** Icon or icon button at the end of the field (20px). Figma: "Show Right Icon". */
  rightIcon?: React.ReactNode
  /** Classes for the outer box (width, margins). `className` goes to the `<input>` itself. */
  containerClassName?: string
}

export function Input({
  error = false,
  leftIcon,
  rightIcon,
  className,
  containerClassName,
  type = 'text',
  ...props
}: InputProps) {
  return (
    <div
      data-slot="input"
      data-error={error || undefined}
      className={cn(
        'flex h-11 w-full items-center gap-2.5 rounded-md border border-input bg-background px-3',
        'text-muted-foreground transition-[border-color,box-shadow]',
        // Icons follow the state colour (they use currentColor).
        // Filled: darker border + icons once the field has a value (Figma: Status=Filled)
        'has-[input:not(:placeholder-shown)]:border-foreground has-[input:not(:placeholder-shown)]:text-foreground has-[input:not(:placeholder-shown)]:shadow-glow',
        // Focus (Figma: Status=Focus)
        'focus-within:border-ring focus-within:text-ring focus-within:shadow-glow',
        'focus-within:has-[input:not(:placeholder-shown)]:border-ring focus-within:has-[input:not(:placeholder-shown)]:text-ring',
        // Error (Figma: Status=Error)
        'data-[error]:border-destructive data-[error]:text-destructive data-[error]:shadow-glow',
        'data-[error]:has-[input:not(:placeholder-shown)]:border-destructive data-[error]:has-[input:not(:placeholder-shown)]:text-destructive',
        'has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50',
        '[&_svg]:size-5 [&_svg]:shrink-0',
        containerClassName,
      )}
    >
      {leftIcon}
      <input
        type={type}
        aria-invalid={error || undefined}
        // A placeholder is needed for the automatic "filled" style; a single space is invisible.
        placeholder={props.placeholder ?? ' '}
        className={cn(
          'h-full min-w-0 flex-1 bg-transparent text-body-lg text-foreground outline-none',
          'placeholder:text-muted-foreground disabled:cursor-not-allowed',
          className,
        )}
        {...props}
      />
      {rightIcon}
    </div>
  )
}
