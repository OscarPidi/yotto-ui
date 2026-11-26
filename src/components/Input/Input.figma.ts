// url=https://www.figma.com/design/V36tWUjD8utwYT5m2wXWDE/Design-System-Yotto?node-id=26-36
// source=src/components/Input/Input.tsx
// component=Input
import figma from 'figma'
const instance = figma.selectedInstance

// Focus and Filled are automatic in code; only Error needs a prop.
const status = instance.getEnum('Status', {
  Initial: 'initial',
  Focus: 'focus',
  Filled: 'filled',
  Error: 'error',
})
const error = status === 'error'

const showLeft = instance.getBoolean('Show Left Icon')
const showRight = instance.getBoolean('Show Right Icon')

let leftIcon
if (showLeft) {
  const left = instance.findInstance('Icon / Password')
  if (left && left.type === 'INSTANCE') leftIcon = left.executeTemplate().example
}
let rightIcon
if (showRight) {
  const right = instance.findInstance('Icon / Eye ')
  if (right && right.type === 'INSTANCE') rightIcon = right.executeTemplate().example
}

// The text layer is "Input text" in Initial but "Typin" in other variants — take the first text layer.
const textLayer = instance.findLayers((node) => 'textContent' in node)[0]
const text = textLayer && 'textContent' in textLayer ? textLayer.textContent : ''
const valueProp = status === 'initial' ? `placeholder="${text}"` : `defaultValue="${text}"`

export default {
  example: figma.code`<Input
  aria-label="…"
  ${valueProp}${error ? '\n  error' : ''}${leftIcon ? figma.code`\n  leftIcon={${leftIcon}}` : ''}${rightIcon ? figma.code`\n  rightIcon={${rightIcon}}` : ''}
/>`,
  imports: ['import { Input } from "@yotto/ui"'],
  id: 'input',
  metadata: { nestable: true },
}
