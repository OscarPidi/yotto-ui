// url=https://www.figma.com/design/V36tWUjD8utwYT5m2wXWDE/Design-System-Yotto?node-id=27-91
// source=src/components/TopBar/TopBar.tsx
// component=TopBar
import figma from 'figma'
const instance = figma.selectedInstance

const type = instance.getEnum('Type', {
  'Page Name': 'page-name',
  Logo: 'logo',
  Stepper: 'stepper',
  'Date and time': 'date-time', // not built yet — falls back to page-name below
})
const showLeft = instance.getBoolean('Show Icon / Left')
const showRight = instance.getBoolean('Show Icon / Right')

let rightIcon
if (showRight) {
  const r = instance.findInstance('Icon / Calendar')
  if (r && r.type === 'INSTANCE') rightIcon = r.executeTemplate().example
}

const titleLayer = instance.findText('Section')
const title = titleLayer && 'textContent' in titleLayer ? titleLayer.textContent : 'Title'

let example
if (type === 'logo') {
  example = figma.code`<TopBar type="logo" />`
} else if (type === 'stepper') {
  example = figma.code`<TopBar type="stepper" step={1} totalSteps={5}${showLeft ? ' onBack={goBack}' : ''} />`
} else if (type === 'date-time') {
  example = figma.code`{/* TopBar "Date and time" is not in code yet (needs DayIndicator). */}
<TopBar title="${title}"${showLeft ? ' onBack={goBack}' : ''} />`
} else {
  example = figma.code`<TopBar
  title="${title}"${showLeft ? '\n  onBack={goBack}' : ''}${rightIcon ? figma.code`\n  rightIcon={${rightIcon}}\n  rightLabel="…"\n  onRightClick={…}` : ''}
/>`
}

export default {
  example,
  imports: ['import { TopBar } from "@yotto/ui"'],
  id: 'top-bar',
  metadata: { nestable: false },
}
