// url=https://www.figma.com/design/V36tWUjD8utwYT5m2wXWDE/Design-System-Yotto?node-id=64-255
// source=src/components/Pill/Pill.tsx
// component=Pill
import figma from 'figma'
const instance = figma.selectedInstance

const textLayer = instance.findText('Pill Info')
const label = textLayer && 'textContent' in textLayer ? textLayer.textContent : 'Pill'

export default {
  example: figma.code`<Pill>${label}</Pill>`,
  imports: ['import { Pill } from "@yotto/ui"'],
  id: 'pill',
  metadata: { nestable: true },
}
