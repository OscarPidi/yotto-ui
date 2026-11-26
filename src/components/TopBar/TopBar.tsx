import * as React from 'react'
import { cn } from '@/lib/utils'
import { IconArrowLeft, IconYotto } from '@/icons'

/**
 * TopBar — the header at the top of a screen. Figma: "TopBar" (currently "controllers top").
 *
 * Figma property → prop
 *   Type  Page Name | Logo | Stepper → type="page-name" | "logo" | "stepper"
 *   Type  Date and time              → not built yet (needs DayIndicator, planned later)
 *   Show Icon / Left                 → onBack (shows a back-arrow button)
 *   Show Icon / Right                → rightIcon + onRightClick + rightLabel
 *
 * ```tsx
 * <TopBar type="page-name" title="Bookings" onBack={() => history.back()}
 *         rightIcon={<IconCalendar />} rightLabel="Open calendar" onRightClick={openCalendar} />
 * <TopBar type="stepper" step={2} totalSteps={5} onBack={prev} />
 * <TopBar type="logo" />
 * ```
 */
export interface TopBarProps extends Omit<React.ComponentProps<'header'>, 'title'> {
  type?: 'page-name' | 'logo' | 'stepper'
  /** Screen title (type="page-name"). Rendered as the page's main heading text. */
  title?: React.ReactNode
  /** Shows a back button on the left. Figma: "Show Icon / Left". */
  onBack?: () => void
  /** Accessible name for the back button. Default "Back". */
  backLabel?: string
  /** Icon for the action on the right. Figma: "Show Icon / Right". */
  rightIcon?: React.ReactNode
  /** Click handler for the right action. */
  onRightClick?: () => void
  /** Accessible name for the right action (required when rightIcon is set). */
  rightLabel?: string
  /** Logo for type="logo". Defaults to the Yotto mark. */
  logo?: React.ReactNode
  /** Current step, 1-based (type="stepper"). */
  step?: number
  /** Total steps (type="stepper"). */
  totalSteps?: number
}

const iconButton =
  'inline-flex size-10 shrink-0 items-center justify-center rounded-full text-foreground outline-none ' +
  'hover:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg]:size-5'

export function TopBar({
  type = 'page-name',
  title,
  onBack,
  backLabel = 'Back',
  rightIcon,
  onRightClick,
  rightLabel,
  logo,
  step = 1,
  totalSteps = 1,
  className,
  ...props
}: TopBarProps) {
  const back = onBack ? (
    <button type="button" className={iconButton} onClick={onBack} aria-label={backLabel}>
      <IconArrowLeft />
    </button>
  ) : (
    <span className="size-10 shrink-0" aria-hidden="true" />
  )

  if (type === 'logo') {
    return (
      <header data-slot="top-bar" data-type={type} className={cn('flex h-11 items-center justify-center px-4', className)} {...props}>
        {logo ?? <IconYotto size={28} className="text-primary" label="Yotto" />}
      </header>
    )
  }

  if (type === 'stepper') {
    const pct = Math.min(100, Math.max(0, (step / Math.max(totalSteps, 1)) * 100))
    return (
      <header data-slot="top-bar" data-type={type} className={cn('flex h-11 items-center gap-4 px-3', className)} {...props}>
        {back}
        <div
          role="progressbar"
          aria-label="Progress"
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-valuenow={step}
          aria-valuetext={`Step ${step} of ${totalSteps}`}
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted"
        >
          <div className="h-full rounded-full bg-success transition-[width] duration-700 ease-glide motion-reduce:transition-none" style={{ width: `${pct}%` }} />
        </div>
        <span className="size-10 shrink-0" aria-hidden="true" />
      </header>
    )
  }

  return (
    <header data-slot="top-bar" data-type={type} className={cn('flex h-12 items-center gap-2 px-2', className)} {...props}>
      {back}
      <h1 className="min-w-0 flex-1 truncate text-center text-h5 text-foreground">{title}</h1>
      {rightIcon ? (
        <button type="button" className={iconButton} onClick={onRightClick} aria-label={rightLabel}>
          {rightIcon}
        </button>
      ) : (
        <span className="size-10 shrink-0" aria-hidden="true" />
      )}
    </header>
  )
}
