// url=https://www.figma.com/design/V36tWUjD8utwYT5m2wXWDE/Design-System-Yotto?node-id=24-97
// source=src/components/Button/Button.tsx
// component=Button
//
// Maps the CURRENT Figma "CTA" component (properties Type / Size / Style) to <Button>.
// When Figma is split into Variant / Size / Disabled (PLAN.md fix #3), replace the
// Type+Style logic with: getEnum('Variant', …) and getBoolean('Disabled').
import figma from 'figma'
const instance = figma.selectedInstance

const type = instance.getEnum('Type', {
  Active: 'active',
  Disabled: 'disabled',
  Line: 'line',
})

const style = instance.getEnum('Style', {
  Primary: 'primary',
  Solid: 'solid',
  Secondary: 'secondary',
})

const size = instance.getEnum('Size', {
  Big: 'lg',
  Small: 'sm',
})

// Type=Line: Primary → outline, Solid → cream, Secondary → magenta (decided 2026-11-26).
let variant = style
if (type === 'line') {
  if (style === 'solid') variant = 'cream'
  else if (style === 'secondary') variant = 'magenta'
  else variant = 'outline'
}
const disabled = type === 'disabled'

const labelLayer = instance.findText('CTA Text')
const label = labelLayer && 'textContent' in labelLayer ? labelLayer.textContent : 'CTA Text'

export default {
  example: figma.code`<Button variant="${variant}" size="${size}"${disabled ? ' disabled' : ''}>
  ${label}
</Button>`,
  imports: ['import { Button } from "@yotto/ui"'],
  id: 'button',
  metadata: { nestable: true },
}
