import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * Yotto type-scale utilities (defined in globals.css). Registered as font sizes so
 * tailwind-merge doesn't confuse `text-h5` with a text colour like `text-primary`.
 */
const TYPE_SCALE = [
  'display-lg', 'display-sm',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7',
  'body-xl', 'body-lg', 'body-md', 'body-sm',
]

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: TYPE_SCALE }],
    },
  },
})

/** Merge class names; later Tailwind classes win over earlier ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
