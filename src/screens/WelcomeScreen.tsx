import { Button } from '@/components/Button'
import { cn } from '@/lib/utils'
import welcomePhoto from './assets/welcome-photo.png'
import logoLightOnDark from './assets/logo-light-on-dark.png'

/**
 * Welcome — first screen of the app. Figma: Yotto-Designs › Welcome Screens › "Welcme" (91:85).
 * Full-bleed photo with an ocean scrim; looks the same in light and dark (only the buttons follow the theme).
 */
export interface WelcomeScreenProps {
  onGetStarted?: () => void
  onCreateAccount?: () => void
  className?: string
}

export function WelcomeScreen({ onGetStarted, onCreateAccount, className }: WelcomeScreenProps) {
  return (
    <main
      className={cn(
        'relative isolate flex min-h-full flex-col items-center overflow-hidden bg-scrim px-5 pt-19.5 pb-5 text-center text-scrim-foreground',
        className,
      )}
    >
      {/* Photo + scrim (decorative) */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <img src={welcomePhoto} alt="" className="absolute inset-x-0 -top-55 size-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent from-45% to-scrim to-60%" />
      </div>

      <img src={logoLightOnDark} alt="Yotto" className="w-93.5 max-w-full" />

      <div className="mt-auto flex w-full flex-col items-center">
        <h1 className="text-h2">Welcome to Yotto</h1>
        <p className="mt-3 text-body-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        </p>
        <Button variant="solid" className="mt-5 w-full" onClick={onGetStarted}>
          Get Started
        </Button>
        <Button variant="secondary" className="mt-9 w-full" onClick={onCreateAccount}>
          Create an Account
        </Button>
      </div>

      <p className="mt-24 text-body-md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </p>
    </main>
  )
}
