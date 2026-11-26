import * as React from 'react'
import { RadioGroup } from '@/components/Radio'
import { SelectableOption } from '@/components/SelectableOption'
import { Tabs, TabsList, TabsTrigger } from '@/components/Tabs'
import { BigValue, ChipGroup, QuestionStep, Slider } from './parts'
import { budgetFromPosition, initialAnswers, type OnboardingAnswers } from './answers'

export type { OnboardingAnswers }

/**
 * Onboarding questionnaire shown after login — 10 questions, one per screen.
 * Figma: Yotto-Designs › Form (117:637), "Form Step 1" … "Form Step 10".
 */
const formatMoney = (n: number) =>
  n >= 1_000_000 ? `$${+(n / 1_000_000).toFixed(1)}M` : `$${Math.round(n / 1_000)}k`

const SIZE_MIN_FT = 20
const SIZE_MAX_FT = 200
const toMeters = (ft: number) => Math.round(ft * 0.3048)

type SingleChoice = { kind: 'single'; key: 'forWhom' | 'timeline' | 'experience' | 'funding' | 'condition'; options: string[] }
type MultiChoice = { kind: 'multi'; key: 'boatStyles' | 'activities'; options: string[] }
type Step = { question: string } & (
  | SingleChoice
  | MultiChoice
  | { kind: 'crew' }
  | { kind: 'budget' }
  | { kind: 'size' }
)

const STEPS: Step[] = [
  { kind: 'crew', question: "Let's start with who's coming along! What is your typical crew or group size onboard?" },
  {
    kind: 'single',
    key: 'forWhom',
    question: 'Who are we finding this boat for today?',
    options: ['Just for me (Personal use)', 'For a company or commercial use', 'On behalf of a client'],
  },
  {
    kind: 'single',
    key: 'timeline',
    question: 'How soon are you hoping to be out on the water with your new boat?',
    options: ['Within the next month!', 'In the next 1–3 months', 'Sometime this year', 'Just exploring for now'],
  },
  {
    kind: 'single',
    key: 'experience',
    question: 'How would you describe your boating experience?',
    options: ['Brand new to it (First boat!)', 'I have some experience', "I'm pretty experienced", "I'm a seasoned captain"],
  },
  { kind: 'budget', question: 'What is the ideal budget range you have in mind?' },
  {
    kind: 'single',
    key: 'funding',
    question: 'How are you planning to fund this adventure?',
    options: ['Cash', 'Marine Financing', 'A Mix of Both', 'Still figuring it out'],
  },
  {
    kind: 'multi',
    key: 'boatStyles',
    question: 'What style of boat are you visualizing?',
    options: ['Powerboat', 'Sailboat', 'Rigid Inflatable', 'Personal Watercraft', 'Commercial', 'Vessel', 'Something Else'],
  },
  {
    kind: 'single',
    key: 'condition',
    question: 'Are you looking for something brand new, or a pre-loved boat with some history?',
    options: ['Brand New', 'Used', 'Open to either'],
  },
  { kind: 'size', question: 'What size range feels just right for you?' },
  {
    kind: 'multi',
    key: 'activities',
    question: 'Finally, how do you plan to spend most of your time on the water?',
    options: ['Day Cruising', 'Fishing', 'Extended cruising', 'Watersports Charter', 'Racing', 'Other'],
  },
]

export interface OnboardingFormProps {
  /** Called with all answers after the last question. */
  onComplete?: (answers: OnboardingAnswers) => void
  /** Back arrow on the first question (e.g. return to login). */
  onExit?: () => void
  /** Start on a given question (1-based). Mainly for Storybook. */
  initialStep?: number
  defaultAnswers?: Partial<OnboardingAnswers>
}

export function OnboardingForm({ onComplete, onExit, initialStep = 1, defaultAnswers }: OnboardingFormProps) {
  const [index, setIndex] = React.useState(initialStep - 1)
  const [direction, setDirection] = React.useState<'forward' | 'back'>('forward')
  const [answers, setAnswers] = React.useState<OnboardingAnswers>({ ...initialAnswers, ...defaultAnswers })
  const set = <K extends keyof OnboardingAnswers>(key: K, value: OnboardingAnswers[K]) =>
    setAnswers((a) => ({ ...a, [key]: value }))

  const step = STEPS[index]
  const isLast = index === STEPS.length - 1

  const canContinue =
    step.kind === 'crew'
      ? Number(answers.crewSize) > 0
      : step.kind === 'single'
        ? answers[step.key] !== ''
        : step.kind === 'multi'
          ? answers[step.key].length > 0
          : true

  const goBack = () => {
    if (index === 0) return onExit?.()
    setDirection('back')
    setIndex(index - 1)
  }
  const goNext = () => {
    if (isLast) return onComplete?.(answers)
    setDirection('forward')
    setIndex(index + 1)
  }

  let body: React.ReactNode
  switch (step.kind) {
    case 'crew':
      body = (
        <label className="flex items-end justify-center gap-px text-foreground">
          <input
            // Native numeric keypad on phones (Figma shows the iOS keyboard open).
            inputMode="numeric"
            pattern="[0-9]*"
            autoFocus
            maxLength={3}
            placeholder="0"
            aria-label="Crew or group size"
            value={answers.crewSize}
            onChange={(e) => set('crewSize', e.target.value.replace(/\D/g, ''))}
            className="field-sizing-content min-w-12 bg-transparent text-right text-display-lg font-light caret-magenta outline-none placeholder:text-muted-foreground"
          />
          <span className="pl-2 text-h4">People</span>
        </label>
      )
      break
    case 'single':
      body = (
        <RadioGroup
          aria-label={step.question}
          value={answers[step.key]}
          onValueChange={(v) => set(step.key, v)}
          className="flex flex-col gap-2"
        >
          {step.options.map((o) => (
            <SelectableOption key={o} value={o}>
              {o}
            </SelectableOption>
          ))}
        </RadioGroup>
      )
      break
    case 'multi':
      body = (
        <ChipGroup
          label={step.question}
          options={step.options}
          value={answers[step.key]}
          onChange={(v) => set(step.key, v)}
        />
      )
      break
    case 'budget': {
      const amount = formatMoney(budgetFromPosition(answers.budgetPosition))
      body = (
        <div className="flex flex-col gap-21">
          <BigValue value={amount} unit="USD" />
          <Slider
            label="Budget"
            min={0}
            max={100}
            value={answers.budgetPosition}
            onChange={(v) => set('budgetPosition', v)}
            valueText={`${amount} USD`}
            minLabel="$1K"
            maxLabel="$5M"
          />
        </div>
      )
      break
    }
    case 'size': {
      const m = answers.sizeUnit === 'm'
      const shown = m ? toMeters(answers.sizeFt) : answers.sizeFt
      body = (
        <div className="-mt-14 flex flex-col">
          <Tabs value={answers.sizeUnit} onValueChange={(v) => set('sizeUnit', v as 'ft' | 'm')} className="mx-auto w-54">
            <TabsList aria-label="Unit">
              <TabsTrigger value="ft">FT</TabsTrigger>
              <TabsTrigger value="m">M</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="mt-8 flex flex-col gap-21">
            <BigValue value={String(shown)} unit={answers.sizeUnit} />
            <Slider
              label="Boat length"
              min={SIZE_MIN_FT}
              max={SIZE_MAX_FT}
              value={answers.sizeFt}
              onChange={(v) => set('sizeFt', v)}
              valueText={`${shown} ${m ? 'metres' : 'feet'}`}
              minLabel={String(m ? toMeters(SIZE_MIN_FT) : SIZE_MIN_FT)}
              maxLabel={String(m ? toMeters(SIZE_MAX_FT) : SIZE_MAX_FT)}
            />
          </div>
        </div>
      )
      break
    }
  }

  return (
    <QuestionStep
      step={index + 1}
      direction={direction}
      totalSteps={STEPS.length}
      question={step.question}
      hint={step.kind === 'multi' ? '(Pick as many as you like)' : undefined}
      canContinue={canContinue}
      onBack={goBack}
      onNext={goNext}
    >
      {body}
    </QuestionStep>
  )
}
