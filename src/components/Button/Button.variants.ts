import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Button style recipe. Use `buttonVariants({ variant, size })` to give a non-button
 * element (rare) the exact Button look. Prefer `<Button asChild>` instead.
 */
export const buttonVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full shadow-glow',
    'transition-[color,background-color,border-color,opacity] outline-none',
    'focus-visible:ring-[3px] focus-visible:ring-ring/50',
    'disabled:pointer-events-none',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-brand-gradient text-brand-gradient-foreground hover:opacity-90 disabled:bg-none',
        solid: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary:
          'border border-primary bg-secondary text-secondary-foreground hover:bg-accent disabled:border-transparent',
        outline:
          'border border-primary bg-transparent text-primary hover:bg-accent disabled:border-transparent',
      },
      size: {
        lg: 'h-11 px-6 text-h5 [&_svg]:size-5',
        sm: 'h-8 px-4 text-body-lg font-semibold [&_svg]:size-4',
      },
    },
    compoundVariants: [
      // Disabled look is the same for every variant (Figma: grey fill, no border).
      {
        variant: ['primary', 'solid', 'secondary', 'outline'],
        className: 'disabled:bg-muted disabled:text-muted-foreground',
      },
    ],
    defaultVariants: { variant: 'primary', size: 'lg' },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
