// url=https://www.figma.com/design/V36tWUjD8utwYT5m2wXWDE/Design-System-Yotto?node-id=46-111
// source=src/components/Tabs/Tabs.tsx
// component=Tabs
import figma from 'figma'
const instance = figma.selectedInstance

// Figma builds tabs from MenuItem instances; in code each one is a TabsTrigger.
const labels = instance.findLayers((node) => 'textContent' in node && node.name === 'Menu Item')
const label = (i: number) => {
  const l = labels[i]
  return l && 'textContent' in l ? l.textContent : `Tab ${i + 1}`
}
const t1 = label(0)
const t2 = label(1)
const t3 = label(2)

export default {
  example: figma.code`<Tabs defaultValue="tab-1">
  <TabsList aria-label="…">
    <TabsTrigger value="tab-1">${t1}</TabsTrigger>
    <TabsTrigger value="tab-2">${t2}</TabsTrigger>
    <TabsTrigger value="tab-3">${t3}</TabsTrigger>
  </TabsList>
  <TabsContent value="tab-1">…</TabsContent>
  <TabsContent value="tab-2">…</TabsContent>
  <TabsContent value="tab-3">…</TabsContent>
</Tabs>`,
  imports: ['import { Tabs, TabsList, TabsTrigger, TabsContent } from "@yotto/ui"'],
  id: 'tabs',
  metadata: { nestable: false },
}
