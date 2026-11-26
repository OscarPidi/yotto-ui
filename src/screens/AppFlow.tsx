import * as React from 'react'
import { BoatDetailScreen } from './BoatDetailScreen'
import type { Boat } from './boats'
import { HomeScreen } from './HomeScreen'
import { LoginScreen } from './LoginScreen'
import { WelcomeScreen } from './WelcomeScreen'
import { OnboardingForm, type OnboardingAnswers } from './onboarding/OnboardingForm'

export type AppScreen = 'welcome' | 'login' | 'onboarding' | 'home' | 'boat'

/**
 * The sign-in journey wired end to end:
 * Welcome → Login (email/password, Apple or Google) → onboarding questions → Home → Boat detail.
 * In a real app swap the state for router routes; each screen only needs its callbacks.
 */
export function AppFlow({
  initialScreen = 'welcome',
  onOnboardingComplete,
  onScheduleVisit,
}: {
  initialScreen?: AppScreen
  onOnboardingComplete?: (answers: OnboardingAnswers) => void
  onScheduleVisit?: (boat: Boat) => void
}) {
  const [screen, setScreen] = React.useState<AppScreen>(initialScreen)
  const [boat, setBoat] = React.useState<Boat | null>(null)
  const toOnboarding = () => setScreen('onboarding')

  // Every new screen starts at the top (e.g. opening a boat from far down the Home list).
  const anchor = React.useRef<HTMLSpanElement>(null)
  React.useEffect(() => {
    const scroller = anchor.current?.closest('[data-scroll-root]') ?? document.scrollingElement
    scroller?.scrollTo?.({ top: 0 })
  }, [screen])

  let content: React.ReactNode = null
  switch (screen) {
    case 'welcome':
      content = <WelcomeScreen onGetStarted={() => setScreen('login')} onCreateAccount={() => setScreen('login')} />
      break
    case 'login':
      content = (
        <LoginScreen onLogin={toOnboarding} onContinueWithApple={toOnboarding} onContinueWithGoogle={toOnboarding} />
      )
      break
    case 'onboarding':
      content = (
        <OnboardingForm
          onExit={() => setScreen('login')}
          onComplete={(answers) => {
            onOnboardingComplete?.(answers)
            setScreen('home')
          }}
        />
      )
      break
    case 'home':
      content = (
        <HomeScreen
          onSelectBoat={(b) => {
            setBoat(b)
            setScreen('boat')
          }}
        />
      )
      break
    case 'boat':
      content = boat && (
        <BoatDetailScreen boat={boat} onBack={() => setScreen('home')} onScheduleVisit={onScheduleVisit} />
      )
      break
  }

  return (
    <>
      <span ref={anchor} hidden />
      {content}
    </>
  )
}
