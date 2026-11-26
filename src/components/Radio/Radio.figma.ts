// url=https://www.figma.com/design/V36tWUjD8utwYT5m2wXWDE/Design-System-Yotto?node-id=53-348
// source=src/components/Radio/Radio.tsx
// component=Radio
import figma from 'figma'
const instance = figma.selectedInstance

// Status On/Off is decided by the parent <RadioGroup value>, not by a prop on Radio.
const status = instance.getEnum('Status', { Off: 'off', On: 'on' })

export default {
  example: figma.code`<Radio value="${status === 'on' ? 'selected-option' : 'option'}" />`,
  imports: ['import { Radio, RadioGroup } from "@yotto/ui"'],
  id: 'radio',
  metadata: { nestable: true },
}
