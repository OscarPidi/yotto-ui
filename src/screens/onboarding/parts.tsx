import * as React from 'react'
import { Button } from '@/components/Button'
import { TopBar } from '@/components/TopBar'
import { cn } from '@/lib/utils'

/*
 * Building blocks for the onboarding questionnaire. Figma: Yotto-Designs › Form (117:637).
 * These are screen-level parts, not library components yet. If they get reused elsewhere,
 * promote them (Chip, Slider, BigNumberField) to src/components with a Figma counterpart.
 */

/** One question page: stepper bar, question, answer area, sticky "Next" bar. */
export function QuestionStep({
  step,
  totalSteps,
  question,
  hint,
  canContinue,
  onBack,
  onNext,
  nextLabel = 'Next',
  direction = 'forward',
  children,
}: {
  step: number
  totalSteps: number
  /** Which way the user moved, so the new question slides in from the matching side. */
  direction?: 'forward' | 'back'
  question: string
  /** Small helper line under the question, e.g. "(Pick as many as you like)". */
  hint?: string
  canContinue: boolean
  onBack: () => void
  onNext: () => void
  nextLabel?: string
  children: React.ReactNode
}) {
  const headingId = React.useId()
  const formRef = React.useRef<HTMLFormElement>(null)
  const headingRef = React.useRef<HTMLHeadingElement>(null)

  // On every step change: scroll to the top and move focus to the new question, so keyboard
  // and screen-reader users land on it (unless a field already took focus, e.g. crew size).
  React.useEffect(() => {
    const form = formRef.current
    const scroller = form?.closest('[data-scroll-root]') ?? document.scrollingElement
    scroller?.scrollTo?.({ top: 0 })
    const active = document.activeElement
    if (!form?.contains(active) || active instanceof HTMLButtonElement) headingRef.current?.focus({ preventScroll: true })
  }, [step])

  // Staggered entrance: question → hint → answers. motion-reduce users get no movement.
  const enter = cn(
    direction === 'back' ? 'animate-step-in-back' : 'animate-step-in-forward',
    'motion-reduce:animate-none',
  )

  return (
    <form
      ref={formRef}
      aria-labelledby={headingId}
      className="flex min-h-full flex-col bg-background"
      onSubmit={(e) => {
        e.preventDefault()
        if (canContinue) onNext()
      }}
    >
      {/* dark: card and the empty progress track (muted) are the same grey, so use the page background */}
      <div className="sticky top-0 z-10 bg-card shadow-float dark:bg-background">
        <TopBar type="stepper" step={step} totalSteps={totalSteps} onBack={onBack} />
      </div>

      {/* key={step} remounts only the content, so it re-animates while the bars stay put */}
      <div key={step} className="flex flex-1 flex-col overflow-x-clip px-4 pt-14 pb-8">
        <div className="min-h-24">
          <h1 id={headingId} ref={headingRef} tabIndex={-1} className={cn('text-h4 text-foreground outline-none', enter)}>
            {question}
          </h1>
        </div>
        <div className="flex h-15 items-center justify-center">
          {hint ? (
            <p className={cn('text-body-md font-semibold text-foreground', enter)} style={{ animationDelay: '70ms' }}>
              {hint}
            </p>
          ) : null}
        </div>
        <div className={enter} style={{ animationDelay: '140ms' }}>
          {children}
        </div>
      </div>

      <div className="sticky bottom-0 bg-card px-5 py-3 shadow-float">
        <Button type="submit" variant="solid" className="w-full" disabled={!canContinue}>
          {nextLabel}
        </Button>
      </div>
    </form>
  )
}

/** Multi-select chip (toggle button). Figma: the pill-shaped options in Form Step 7 / 10. */
export function ChipGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: readonly string[]
  value: string[]
  onChange: (next: string[]) => void
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap justify-center gap-3">
      {options.map((option) => {
        const on = value.includes(option)
        return (
          <button
            key={option}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(on ? value.filter((v) => v !== option) : [...value, option])}
            className={cn(
              'rounded-sm bg-muted p-2 text-body-xl text-muted-foreground outline-none',
              'transition-[background-color,box-shadow,color] focus-visible:ring-[3px] focus-visible:ring-ring/50',
              'aria-pressed:bg-accent aria-pressed:text-accent-foreground aria-pressed:shadow-glow',
            )}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

/**
 * Slider: native range input (keyboard + screen reader support for free) drawn over the
 * Figma track. Figma: "Frame 8" in Form Step 5 / 9.
 */
export function Slider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  valueText,
  minLabel,
  maxLabel,
}: {
  label: string
  min: number
  max: number
  step?: number
  value: number
  onChange: (value: number) => void
  valueText?: string
  minLabel: string
  maxLabel: string
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-6">
        <div className="absolute inset-x-0 top-1/2 h-1.75 -translate-y-1/2 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-success" style={{ width: `${pct}%` }} />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 size-6 -translate-x-1/2 rounded-full border border-card bg-success shadow-glow"
          style={{ left: `${pct}%` }}
        />
        <input
          type="range"
          aria-label={label}
          aria-valuetext={valueText}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="peer absolute inset-0 size-full cursor-pointer opacity-0"
        />
      </div>
      <div className="flex justify-between text-body-xl text-foreground">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  )
}

/** Big centred value with a small unit after it, e.g. "$122k USD" or "40 ft". */
export function BigValue({ value, unit }: { value: string; unit: string }) {
  return (
    <p className="flex items-center justify-center text-foreground" aria-live="polite">
      <span className="text-display-lg">{value}</span>
      <span className="text-h4">{unit}</span>
    </p>
  )
}
