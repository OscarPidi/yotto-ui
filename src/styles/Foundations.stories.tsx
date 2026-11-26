import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Foundations/Tokens',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const colors: [token: string, use: string][] = [
  ['background', 'Page background'],
  ['foreground', 'Body text'],
  ['card', 'Cards, menus, sheets'],
  ['primary', 'Main action, links, selected'],
  ['primary-foreground', 'Text on primary'],
  ['secondary', 'Secondary button fill'],
  ['secondary-foreground', 'Secondary button text'],
  ['muted', 'Disabled, quiet surfaces'],
  ['muted-foreground', 'Hints, placeholders'],
  ['accent', 'Selected option, hover'],
  ['accent-foreground', 'Text on accent'],
  ['destructive', 'Errors'],
  ['success', 'Confirmations, progress'],
  ['border', 'Dividers, outlines'],
  ['input', 'Input border'],
  ['ring', 'Focus outline'],
  ['glass', 'Frosted bars (tabs, bottom nav)'],
]

/** Semantic colours. Switch light/dark in the toolbar — every swatch updates. */
export const Colors: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 bg-background p-6 text-foreground">
      {colors.map(([token, use]) => (
        <div key={token} className="flex items-center gap-3">
          <div className="size-12 shrink-0 rounded-md border border-border" style={{ background: `var(--${token})` }} />
          <div>
            <div className="text-body-lg font-semibold">{token}</div>
            <div className="text-body-md text-muted-foreground">{use}</div>
            <code className="text-body-sm text-muted-foreground">bg-{token}</code>
          </div>
        </div>
      ))}
      <div className="col-span-3 flex gap-4">
        <div className="h-12 flex-1 rounded-md bg-brand-gradient" />
        <div className="h-12 flex-1 rounded-md bg-brand-gradient-alt" />
      </div>
    </div>
  ),
}

const type: [cls: string, spec: string][] = [
  ['text-display-lg', 'Display LG · Surgena Bold 72/80'],
  ['text-display-sm', 'Display SM · Surgena Bold 44/48'],
  ['text-h1', 'H1 · Surgena Bold 44/48'],
  ['text-h2', 'H2 · Surgena Bold 36/40'],
  ['text-h3', 'H3 · Surgena Bold 32/36'],
  ['text-h4', 'H4 · Surgena Bold 28/32'],
  ['text-h5', 'H5 · Surgena Semi Bold 20/28'],
  ['text-h6', 'H6 · Surgena Semi Bold 16/20'],
  ['text-h7', 'H7 · Surgena Semi Bold 14/20'],
  ['text-body-xl', 'Body XL · Inter 16/20'],
  ['text-body-lg', 'Body LG · Inter 14/16'],
  ['text-body-md', 'Body MD · Inter 12/14'],
  ['text-body-sm', 'Body SM · Inter 10/14'],
]

/** Type scale — mirrors the Figma text styles. Add `font-semibold` for "Heavy". */
export const Typography: Story = {
  render: () => (
    <div className="flex flex-col gap-4 bg-background p-6 text-foreground">
      {type.map(([cls, spec]) => (
        <div key={cls} className="flex items-baseline gap-6">
          <code className="w-36 shrink-0 text-body-md text-muted-foreground">{cls}</code>
          <span className={cls}>Book your next trip</span>
          <span className="ml-auto text-body-sm text-muted-foreground">{spec}</span>
        </div>
      ))}
    </div>
  ),
}

/** Elevation and radius. */
export const Shape: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 bg-background p-6 text-body-md text-foreground">
      {['shadow-glow', 'shadow-float', 'shadow-tab'].map((s) => (
        <div key={s} className={`flex size-28 items-center justify-center rounded-md bg-card ${s}`}>{s}</div>
      ))}
      {['rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-full'].map((r) => (
        <div key={r} className={`flex size-28 items-center justify-center border border-border bg-muted ${r}`}>{r}</div>
      ))}
    </div>
  ),
}
