// url=https://www.figma.com/design/V36tWUjD8utwYT5m2wXWDE/Design-System-Yotto?node-id=33-46
// source=src/components/MenuItem/MenuItem.tsx
// component=MenuItem
import figma from 'figma'
const instance = figma.selectedInstance

const status = instance.getEnum('Status', { Off: 'off', On: 'on' })
const showIcon = instance.getBoolean('Show Icon')

let icon
if (showIcon) {
  const iconLayer = instance.findInstance('Icon / Calendar')
  if (iconLayer && iconLayer.type === 'INSTANCE') icon = iconLayer.executeTemplate().example
}

const labelLayer = instance.findText('Menu Item')
const label = labelLayer && 'textContent' in labelLayer ? labelLayer.textContent : 'Menu Item'

export default {
  example: figma.code`<MenuItem${status === 'on' ? ' selected' : ''}${icon ? figma.code` icon={${icon}}` : ''}>${label}</MenuItem>`,
  imports: ['import { MenuItem } from "@yotto/ui"'],
  id: 'menu-item',
  metadata: { nestable: true },
}
