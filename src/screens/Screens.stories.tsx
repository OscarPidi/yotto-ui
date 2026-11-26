import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { AppFlow } from './AppFlow'
import { HomeScreen } from './HomeScreen'
import { LoginScreen } from './LoginScreen'
import { WelcomeScreen } from './WelcomeScreen'
import { OnboardingForm } from './onboarding/OnboardingForm'

/** Phone-sized frame (402 × 874, as in Figma). */
const Phone = ({ children }: { children: React.ReactNode }) => (
  <div data-scroll-root className="h-218.5 w-100.5 overflow-y-auto rounded-lg shadow-float">{children}</div>
)

const meta = {
  title: 'Screens/Sign-in journey',
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jl650cKEU7cndhv6pCe7Xk/Yotto-Designs?node-id=76-1435',
    },
  },
  decorators: [(Story) => <Phone><Story /></Phone>],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** Click through the whole journey: Welcome → Login → 10 questions → Home. */
export const FullFlow: Story = {
  render: () => <AppFlow onOnboardingComplete={fn()} />,
}

export const Welcome: Story = {
  render: () => <WelcomeScreen onGetStarted={fn()} onCreateAccount={fn()} />,
}

export const Login: Story = {
  render: () => (
    <LoginScreen onLogin={fn()} onContinueWithApple={fn()} onContinueWithGoogle={fn()} />
  ),
}

const formDesign = {
  design: { type: 'figma', url: 'https://www.figma.com/design/jl650cKEU7cndhv6pCe7Xk/Yotto-Designs?node-id=117-637' },
}

export const FormCrewSize: Story = {
  name: 'Form 1 · Crew size (number)',
  parameters: formDesign,
  render: () => <OnboardingForm onComplete={fn()} onExit={fn()} defaultAnswers={{ crewSize: '12' }} />,
}
export const FormSingleChoice: Story = {
  name: 'Form 2 · Single choice',
  parameters: formDesign,
  render: () => (
    <OnboardingForm initialStep={2} onComplete={fn()} defaultAnswers={{ forWhom: 'For a company or commercial use' }} />
  ),
}
export const FormBudget: Story = {
  name: 'Form 5 · Budget (slider)',
  parameters: formDesign,
  render: () => <OnboardingForm initialStep={5} onComplete={fn()} />,
}
export const FormBoatStyle: Story = {
  name: 'Form 7 · Multiple choice',
  parameters: formDesign,
  render: () => (
    <OnboardingForm initialStep={7} onComplete={fn()} defaultAnswers={{ boatStyles: ['Sailboat', 'Something Else'] }} />
  ),
}
export const FormSize: Story = {
  name: 'Form 9 · Size (unit tabs + slider)',
  parameters: formDesign,
  render: () => <OnboardingForm initialStep={9} onComplete={fn()} />,
}

export const Home: Story = {
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/jl650cKEU7cndhv6pCe7Xk/Yotto-Designs?node-id=89-1017' },
  },
  render: () => <HomeScreen onViewAll={fn()} onSelectBoat={fn()} />,
}
