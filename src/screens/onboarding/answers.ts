/** Answers collected by the onboarding questionnaire (Figma: Yotto-Designs › Form). */
export interface OnboardingAnswers {
  crewSize: string
  forWhom: string
  timeline: string
  experience: string
  /** Slider position 0–100 on a log scale from $1K to $5M; see `budgetFromPosition`. */
  budgetPosition: number
  funding: string
  boatStyles: string[]
  condition: string
  /** Length in feet (the M tab only changes how it is shown). */
  sizeFt: number
  sizeUnit: 'ft' | 'm'
  activities: string[]
}

export const initialAnswers: OnboardingAnswers = {
  crewSize: '',
  forWhom: '',
  timeline: '',
  experience: '',
  budgetPosition: 56, // ≈ $122k, as in Figma
  funding: '',
  boatStyles: [],
  condition: '',
  sizeFt: 40,
  sizeUnit: 'ft',
  activities: [],
}

const BUDGET_MIN = 1_000
const BUDGET_MAX = 5_000_000
/** Log scale so both $5k and $2M are reachable with a thumb. */
export const budgetFromPosition = (p: number) => {
  const raw = BUDGET_MIN * (BUDGET_MAX / BUDGET_MIN) ** (p / 100)
  const magnitude = 10 ** Math.max(0, Math.floor(Math.log10(raw)) - 1)
  return Math.round(raw / magnitude) * magnitude
}
