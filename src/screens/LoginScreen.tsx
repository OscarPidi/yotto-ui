import * as React from 'react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { cn } from '@/lib/utils'
import logoDarkOnLight from './assets/logo-dark-on-light.png'
import logoLightOnDark from './assets/logo-light-on-dark.png'
import iconMail from './assets/icon-mail.svg'
import iconLock from './assets/icon-lock.svg'
import googleLogo from './assets/google-logo.svg'

/**
 * Login — email + password, or continue with Apple / Google.
 * Figma: Yotto-Designs › Welcome Screens › "Login" (88:529).
 */
export interface LoginScreenProps {
  onLogin?: (credentials: { email: string; password: string }) => void
  onContinueWithApple?: () => void
  onContinueWithGoogle?: () => void
  className?: string
}

/** Social sign-in buttons are 40px (Figma), slimmer than Button size="lg". */
const socialButton =
  'relative flex h-10 w-full items-center justify-center gap-1.5 rounded-full text-body-lg font-semibold outline-none transition-opacity hover:opacity-90 focus-visible:ring-[3px] focus-visible:ring-ring/50'

export function LoginScreen({
  onLogin,
  onContinueWithApple,
  onContinueWithGoogle,
  className,
}: LoginScreenProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    onLogin?.({ email: String(data.get('email') ?? ''), password: String(data.get('password') ?? '') })
  }

  return (
    <main className={cn('flex min-h-full flex-col bg-background px-5 pt-21.5 pb-23 text-center', className)}>
      {/* Logo: the PNG has built-in padding, so it is cropped to the visible wordmark. */}
      <div className="mx-auto h-15 w-50 shrink-0 overflow-hidden">
        <img src={logoDarkOnLight} alt="Yotto" className="-mx-8.5 -mt-6.5 w-67 max-w-none dark:hidden" />
        <img src={logoLightOnDark} alt="Yotto" className="-mx-8.5 -mt-6.5 hidden w-67 max-w-none dark:block" />
      </div>

      <div className="min-h-8 flex-1" />

      <h1 className="text-h2 text-foreground">Let’s Start</h1>
      <p className="mt-3 text-body-xl text-muted-foreground">Lorem ipsum dolor sit amet, consectetur.</p>

      <form className="mt-6 flex flex-col" onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          autoComplete="email"
          aria-label="Email"
          placeholder="Enter your email"
          required
          leftIcon={<img src={iconMail} alt="" width={16} height={16} />}
          containerClassName="relative rounded-b-none focus-within:z-10"
        />
        <Input
          name="password"
          type="password"
          autoComplete="current-password"
          aria-label="Password"
          placeholder="Password"
          required
          leftIcon={<img src={iconLock} alt="" width={16} height={16} />}
          containerClassName="relative -mt-px rounded-t-none focus-within:z-10"
        />
        <Button type="submit" variant="solid" className="mt-7.5 w-full">
          Log In
        </Button>
      </form>

      <div className="min-h-8 flex-1" />

      <div className="flex items-center gap-3.5 text-body-lg text-foreground">
        <span aria-hidden className="h-px flex-1 bg-linear-to-r from-transparent to-foreground" />
        Or
        <span aria-hidden className="h-px flex-1 bg-linear-to-l from-transparent to-foreground" />
      </div>

      <div className="mt-3 flex flex-col gap-3">
        <button type="button" className={cn(socialButton, 'bg-foreground text-background')} onClick={onContinueWithApple}>
          {/* Apple logo glyph (SF Pro, as in Figma) — only renders on Apple devices. */}
          <span aria-hidden className="text-h5">{''}</span>
          Continue with Apple
        </button>
        <button
          type="button"
          className={cn(socialButton, 'border border-border bg-card font-medium text-card-foreground')}
          onClick={onContinueWithGoogle}
        >
          <img src={googleLogo} alt="" width={18.15} height={20} className="absolute left-3" />
          Sign in with Google
        </button>
      </div>

      <p className="mt-5 text-body-md text-muted-foreground">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </p>
    </main>
  )
}
