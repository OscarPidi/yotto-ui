import * as React from 'react'
import { HomeScreen } from './HomeScreen'
import { LoginScreen } from './LoginScreen'
import { WelcomeScreen } from './WelcomeScreen'
import { OnboardingForm, type OnboardingAnswers } from './onboarding/OnboardingForm'

export type AppScreen = 'welcome' | 'login' | 'onboarding' | 'home'

/**
 * The sign-in journey wired end to end:
 * Welcome → Login (email/password, Apple or Google) → onboarding questions → Home.
 * In a real app swap the state for router routes; each screen only needs its callbacks.
 */
export function AppFlow({
  initialScreen = 'welcome',
  onOnboardingComplete,
}: {
  initialScreen?: AppScreen
  onOnboardingComplete?: (answers: OnboardingAnswers) => void
}) {
  const [screen, setScreen] = React.useState<AppScreen>(initialScreen)
  const toOnboarding = () => setScreen('onboarding')

  switch (screen) {
    case 'welcome':
      return <WelcomeScreen onGetStarted={() => setScreen('login')} onCreateAccount={() => setScreen('login')} />
    case 'login':
      return (
        <LoginScreen onLogin={toOnboarding} onContinueWithApple={toOnboarding} onContinueWithGoogle={toOnboarding} />
      )
    case 'onboarding':
      return (
        <OnboardingForm
          onExit={() => setScreen('login')}
          onComplete={(answers) => {
            onOnboardingComplete?.(answers)
            setScreen('home')
          }}
        />
      )
    case 'home':
      return <HomeScreen />
  }
}
