import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginScreen } from './LoginScreen'
import { WelcomeScreen } from './WelcomeScreen'

describe('WelcomeScreen', () => {
  it('fires both actions', async () => {
    const onGetStarted = vi.fn()
    const onCreateAccount = vi.fn()
    render(<WelcomeScreen onGetStarted={onGetStarted} onCreateAccount={onCreateAccount} />)
    expect(screen.getByRole('heading', { name: 'Welcome to Yotto' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Get Started' }))
    await userEvent.click(screen.getByRole('button', { name: 'Create an Account' }))
    expect(onGetStarted).toHaveBeenCalledOnce()
    expect(onCreateAccount).toHaveBeenCalledOnce()
  })
})

describe('LoginScreen', () => {
  it('submits email and password', async () => {
    const onLogin = vi.fn()
    render(<LoginScreen onLogin={onLogin} />)
    await userEvent.type(screen.getByLabelText('Email'), 'sam@example.com')
    await userEvent.type(screen.getByLabelText('Password'), 'test-pass')
    await userEvent.click(screen.getByRole('button', { name: 'Log In' }))
    expect(onLogin).toHaveBeenCalledWith({ email: 'sam@example.com', password: 'test-pass' })
  })

  it('offers Apple and Google sign-in', async () => {
    const onApple = vi.fn()
    const onGoogle = vi.fn()
    render(<LoginScreen onContinueWithApple={onApple} onContinueWithGoogle={onGoogle} />)
    await userEvent.click(screen.getByRole('button', { name: 'Continue with Apple' }))
    await userEvent.click(screen.getByRole('button', { name: 'Sign in with Google' }))
    expect(onApple).toHaveBeenCalledOnce()
    expect(onGoogle).toHaveBeenCalledOnce()
  })
})
