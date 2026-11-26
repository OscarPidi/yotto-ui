// url=https://www.figma.com/design/V36tWUjD8utwYT5m2wXWDE/Design-System-Yotto?node-id=33-146
// source=src/components/NavigationMenu/NavigationMenu.tsx
// component=NavigationMenu
import figma from 'figma'
const instance = figma.selectedInstance

// Each nested MenuItem renders through its own Code Connect template.
const items = instance.findConnectedInstances((node) => node.codeConnectId() === 'menu-item')
const item1 = items[0] ? items[0].executeTemplate().example : undefined
const item2 = items[1] ? items[1].executeTemplate().example : undefined
const item3 = items[2] ? items[2].executeTemplate().example : undefined
const item4 = items[3] ? items[3].executeTemplate().example : undefined
const item5 = items[4] ? items[4].executeTemplate().example : undefined

export default {
  example: figma.code`<NavigationMenu aria-label="Main">
  ${item1}
  ${item2}
  ${item3}
  ${item4}${item5 ? figma.code`
  ${item5}` : ''}
</NavigationMenu>`,
  imports: ['import { NavigationMenu, MenuItem } from "@yotto/ui"'],
  id: 'navigation-menu',
  metadata: { nestable: false },
}
