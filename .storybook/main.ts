import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-themes', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  // Build the catalog as a normal app, not as the library bundle.
  viteFinal: async (cfg) => {
    if (cfg.build) delete cfg.build.lib
    return cfg
  },
}

export default config
