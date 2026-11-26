/**
 * Shared look for MenuItem and Tabs triggers (Figma: "MenuItem", Status Off | On).
 * Selected state is driven by data attributes so both Radix Tabs (`data-state=active`)
 * and links (`data-selected`) get the same style.
 */
export const menuItemClasses = [
  'inline-flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-3',
  'font-heading text-h7 text-foreground whitespace-nowrap',
  'outline-none transition-[color,background-color,box-shadow] focus-visible:ring-[3px] focus-visible:ring-ring/50',
  'hover:text-primary',
  'data-[selected]:bg-glass data-[selected]:text-primary data-[selected]:shadow-tab',
  'data-[state=active]:bg-glass data-[state=active]:text-primary data-[state=active]:shadow-tab',
  'disabled:pointer-events-none disabled:opacity-50',
  '[&_svg]:size-6 [&_svg]:shrink-0',
].join(' ')

/** Glass bar that holds MenuItems or tab triggers. */
export const glassBarClasses =
  'flex items-center rounded-full bg-glass p-1 shadow-float backdrop-blur-sm'
