// url=https://www.figma.com/design/V36tWUjD8utwYT5m2wXWDE/Design-System-Yotto?node-id=92-87
// source=src/components/SelectableOption/SelectableOption.tsx
// component=SelectableOption
import figma from 'figma'
const instance = figma.selectedInstance

// Status On/Off is decided by the parent <RadioGroup value>.
const status = instance.getEnum('Status', { Off: 'off', On: 'on' })

const labelLayer = instance.findText('Just for me (Personal use)')
const label = labelLayer && 'textContent' in labelLayer ? labelLayer.textContent : 'Option'

export default {
  example: figma.code`<RadioGroup${status === 'on' ? ' defaultValue="option"' : ''} aria-label="…">
  <SelectableOption value="option">${label}</SelectableOption>
</RadioGroup>`,
  imports: ['import { RadioGroup, SelectableOption } from "@yotto/ui"'],
  id: 'selectable-option',
  metadata: { nestable: false },
}
