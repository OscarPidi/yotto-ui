# CLAUDE.md — how to use and extend `@yotto/ui`

This repository is the **Yotto design system** as a React component library. If you are an agent
building UI for Yotto, read this file first and follow it exactly. Roadmap and decisions: [PLAN.md](PLAN.md).

- Package: `@yotto/ui`
- Source of truth for design: Figma file *Design System Yotto* — https://www.figma.com/design/V36tWUjD8utwYT5m2wXWDE/Design-System-Yotto
- Catalog: Storybook (`pnpm storybook`)
- Stack: React · TypeScript · Tailwind CSS v4 · shadcn/ui (restyled) · Vite · Storybook · Vitest · Figma Code Connect

> Status (2026-11-26): tokens, icons, Button, form controls and navigation ready. Sections marked *(planned)* are not built yet. Update this file whenever something lands.

---

## 1. Golden rules

1. **Use existing components first.** Check the catalogue (section 4) and Storybook before writing new UI. Compose; don't recreate.
2. **Only semantic tokens.** Use Tailwind classes built from semantic tokens: `bg-background`, `text-foreground`, `bg-primary text-primary-foreground`, `border-border`, `text-muted-foreground`, `ring-ring`. Never hex values, `rgb()`, Tailwind palette colors (`bg-blue-500`), or primitive names (`blue-0`, `neutrals-80`) in components or app code.
3. **Only scale values** for spacing and radius (`p-4`, `gap-2`, `rounded-md`, `rounded-full`). No arbitrary values like `p-[13px]`.
4. **Only the type scale** for text (`text-h1` … `text-h7`, `text-display-lg`, `text-body-lg`, `font-heading`). No ad-hoc font sizes.
5. **Every component must work in light and dark.** Never style for one mode only. Dark mode = `dark` class on `<html>`.
6. **Props mirror Figma.** Figma property → React prop: Title Case → camelCase; variant values → lower-case short form. Example: Figma `Variant=Outline, Size=Small, Disabled=true` → `<Button variant="outline" size="sm" disabled>`.
7. **Never handle secrets.** Don't read, write, print or ask for passwords, npm/GitHub/Figma tokens. The owner signs in and publishes.
8. **Ask before anything leaves the computer**: `git push`, creating remotes, `npm publish`, `figma connect publish`.

## 2. Using the library

```tsx
import "@yotto/ui/styles.css";            // tokens, fonts, base styles — import once at app root
import { Button, Input, IconBoat } from "@yotto/ui";

<Button variant="primary" size="lg" leftIcon={<IconBoat />}>Book a boat</Button>
<Input aria-label="Email" type="email" placeholder="you@example.com" />
<Button asChild variant="outline"><a href="/boats">See boats</a></Button>
```

Theme: light by default. Add `class="dark"` to `<html>` for dark mode.

## 3. Tokens

Semantic color tokens (CSS variables → Tailwind classes). Full mapping to primitives: PLAN.md section 4.

| Token | Use for |
|---|---|
| `background` / `foreground` | Page background / default text |
| `card`, `popover` (+ `-foreground`) | Raised surfaces: cards, menus, sheets |
| `primary` (+ `-foreground`) | Main action, links, active tab, selected state |
| `secondary` (+ `-foreground`) | Secondary action (white button, blue text) |
| `muted` (+ `-foreground`) | Disabled fills, quiet surfaces / hints, captions, placeholders |
| `accent` (+ `-foreground`) | Selected option background, hover |
| `destructive` (+ `-foreground`) | Errors, destructive actions |
| `success` (+ `-foreground`) | Confirmations |
| `border`, `input`, `ring` | Dividers / input borders / focus outline |
| `brand-gradient`, `brand-gradient-alt` | Brand moments only (hero, the gradient primary button). Not for regular surfaces. Classes: `bg-brand-gradient`, `bg-brand-gradient-alt`. |
| `brand-gradient-foreground` | Text on a brand gradient (white in both modes). |
| `glass` | Frosted bars (Tabs, NavigationMenu). Pair with `backdrop-blur-sm`. |

Typography: `font-heading` = Surgena (headings, display); `font-sans` = Inter (body).
Type styles: `text-display-lg` 72/80, `text-display-sm` 44/48, `text-h1` 44/48, `text-h2` 36/40, `text-h3` 32/36, `text-h4` 28/32, `text-h5` 20/28, `text-h6` 16/20, `text-h7` 14/20, `text-body-xl` 16/20, `text-body-lg` 14/16, `text-body-md` 12/14, `text-body-sm` 10/14 (add `font-semibold` for the Heavy versions).
Spacing: 4px steps (`1` = 4px … `11` = 44px). Radius: `rounded-sm` 8, `rounded-md` 12, `rounded-lg` 16, `rounded-full`.
Elevation: `shadow-glow` (buttons, inputs, selected rows) · `shadow-float` (floating glass bars) · `shadow-tab` (selected item in a glass bar).

## 4. Component catalogue

Import everything from `@yotto/ui`. Every component works in light and dark, and has a Storybook page and a Code Connect file.

| Component | Figma name (current → proposed) | Status | Props and usage |
|---|---|---|---|
| `Button` | CTA → Button | **ready** | `variant`: `primary` (gradient, default — max one per view) \| `solid` (blue) \| `secondary` (white, blue border) \| `outline` (transparent, blue border) · `size`: `lg` (44px, default) \| `sm` (32px) · `disabled` · `leftIcon`, `rightIcon` · `asChild` (render a link with button styles) · all `<button>` props |
| `Input` | Input text → Input | **ready** | `error` (red border + `aria-invalid`) · `leftIcon`, `rightIcon` · `containerClassName` (outer box) · all `<input>` props. Focus and filled styles are automatic. Always give a label or `aria-label`. |
| `RadioGroup` + `Radio` | Radio Button → Radio | **ready** | Group: `value` / `defaultValue` / `onValueChange`, `aria-label`. Item: `value`, `disabled`. Wrap each Radio in a `<label>` with its text. |
| `SelectableOption` | Single selectors → SelectableOption | **ready** | Full-width choice row; must sit inside `RadioGroup`. `value`, `icon`, `disabled`, children = label. |
| `Pill` | Pill | **ready** | Read-only status label. Children = text. Not clickable. |
| `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | Tabs container → Tabs | **ready** | Switch views within one page. `Tabs`: `value`/`defaultValue`/`onValueChange`. `TabsList`: `aria-label`. `TabsTrigger`/`TabsContent`: `value`. |
| `NavigationMenu` | Navigation Menu | **ready** | Floating bottom app bar (frosted glass) — not a dropdown. `aria-label` (required), children = 3–5 `MenuItem`. |
| `MenuItem` | Manu Item → MenuItem | **ready** | One destination in NavigationMenu. `selected` (sets `aria-current="page"`) · `icon` · `asChild` (wrap a router link). |
| `TopBar` | controllers top → TopBar | **ready** (3 of 4 types) | `type`: `page-name` (default) \| `logo` \| `stepper` · `title` · `onBack`, `backLabel` · `rightIcon`, `rightLabel`, `onRightClick` · `logo` · `step`, `totalSteps`. Type "Date and time" not built yet. |
| `Icon` + 31 named icons | Icon / * | **ready** | `<IconBoat />` or `<Icon name="Boat" />` · `size` (default 24) · `label` (only for icon-only meaning; otherwise hidden from screen readers) · colour via text classes (`className="text-primary"`). |
| `BoatCard`, `NewsCard`, `DayIndicator` | Boat General Card, News Card, Day Indicator | later | — |

Icons: `IconArrowRight`, `IconArrowLeft`, `IconArrowUp`, `IconArrowDown`, `IconChevronUp`, `IconChevronRight`, `IconChevronDown`, `IconChevronLeft`, `IconPassword`, `IconCalendar`, `IconLocation`, `IconFavLine`, `IconFavFill`, `IconCheck`, `IconCancel`, `IconEye`, `IconBoat`, `IconPerson`, `IconStar`, `IconYotto`, `IconInfo`, `IconEngine`, `IconUser`, `IconDotMenu`, `IconAdd`, `IconRemove`, `IconLogout`, `IconDocument`, `IconNotification`, `IconSearch`, `IconEdit`. Shapes live in `src/icons/icon-data.ts` (exported from Figma; each entry notes its Figma name).

### Composition example

```tsx
<TopBar title="Bookings" onBack={goBack} />
<Tabs defaultValue="upcoming">
  <TabsList aria-label="Bookings">
    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
    <TabsTrigger value="past">Past</TabsTrigger>
  </TabsList>
  <TabsContent value="upcoming">…</TabsContent>
  <TabsContent value="past">…</TabsContent>
</Tabs>
<NavigationMenu aria-label="Main" className="fixed inset-x-4 bottom-4">
  <MenuItem selected icon={<IconYotto />}>Home</MenuItem>
  <MenuItem icon={<IconBoat />}>My Boats</MenuItem>
  <MenuItem icon={<IconCalendar />}>Schedules</MenuItem>
  <MenuItem icon={<IconUser />}>Profile</MenuItem>
</NavigationMenu>
```

## 5. Project layout

```
src/
  styles/globals.css        # @import tailwind; :root and .dark tokens; @theme mapping
  tokens/primitives.css     # raw palette from Figma (never used directly in components)
  fonts/                    # Surgena .woff2 (licensed, added by owner)
  lib/utils.ts              # cn() helper
  components/<Name>/
    <Name>.tsx              # the component (shadcn/Radix base, restyled)
    <Name>.variants.ts      # (some) shared style recipe
    <Name>.stories.tsx      # every variant, light + dark
    <Name>.figma.ts         # Code Connect template (parserless): Figma properties → props
    <Name>.test.tsx         # behaviour + accessibility basics
    index.ts
  icons/                    # icon-data.ts (shapes exported from Figma) + Icon.tsx — re-export from Figma, never draw by hand
  index.ts                  # public exports
```

## 6. Adding or changing a component

1. Read the Figma component (properties, variants, description, light and dark).
2. If Figma has hard-coded values, primitive colors or unclear names, **stop and report** — don't guess. Fixes go in PLAN.md section 3.
3. Start from shadcn (`pnpm dlx shadcn@latest add <name>`) when one exists; restyle with semantic tokens and `cva` variants named after the Figma properties.
4. Write the story (all variants, both themes), the Code Connect file, and a test.
5. Run `pnpm typecheck && pnpm lint && pnpm test && pnpm build` and `npx figma connect parse`.
6. Compare with Figma in light and dark.
7. Update the catalogue (section 4), export from `src/index.ts`, commit with a clear message.

## 7. Commands

Node.js lives in `~/.local/node/bin` on the owner's Mac (already on PATH in new Terminal windows).

| Command | What it does |
|---|---|
| `pnpm dev` / `pnpm storybook` | Storybook catalog on localhost |
| `pnpm build` | Builds the library to `dist/` |
| `pnpm test` | Vitest |
| `pnpm typecheck`, `pnpm lint` | Type and lint checks |
| `pnpm check:tokens` | Fails if components contain hard-coded colors |
| Icons | Re-export shapes from Figma (Iconography page) into `src/icons/icon-data.ts`; add a named export in `Icon.tsx` |
| `pnpm figma:parse` | Validates Code Connect files locally |
| `pnpm check` | Runs everything above in order — run before every commit |
| `npx figma connect publish` | **Owner only** — sends mappings to Figma |

## 8. Never

- Never hard-code a color, size, font or shadow.
- Never use primitive tokens (`blue-0`, `neutrals-80`, `--yotto-*`) outside `src/styles/` and `src/tokens/`.
- Never ship an icon-only button without an accessible name (`aria-label` or `label`).
- Never add a component without a story, a Code Connect file and a catalogue entry.
- Never rename a prop without renaming the Figma property (and vice versa).
- Never push, publish or sign in on the owner's behalf.
