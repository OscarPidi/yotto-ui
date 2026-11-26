import type { Preview } from '@storybook/react-vite'
import { withThemeByClassName } from '@storybook/addon-themes'
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    backgrounds: { disable: true },
    a11y: { test: 'error' },
  },
  decorators: [
    // Toolbar toggle: adds/removes the `dark` class on <html>, exactly like a real app.
    withThemeByClassName({
      themes: { light: '', dark: 'dark' },
      defaultTheme: 'light',
    }),
  ],
}

export default preview
