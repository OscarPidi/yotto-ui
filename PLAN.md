# PLAN — Yotto design system → `@yotto/ui`

Turn the Figma file **Design System Yotto** into a public React component library that people
and AI agents can read, use and build with correctly, with every Figma component linked to its
code through Code Connect.

- Figma: https://www.figma.com/design/V36tWUjD8utwYT5m2wXWDE/Design-System-Yotto
- Stack: Vite (library mode) · React · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui restyled to Yotto tokens · Storybook · Vitest · Figma Code Connect
- Agent instructions live in [CLAUDE.md](CLAUDE.md). This file is the roadmap and decision log.

---

## 1. Decisions

| Topic | Decision |
|---|---|
| Package name | `@yotto/ui` |
| Repository | Public, under the design owner's personal GitHub account. The owner creates it and signs in. |
| Fonts | Self-hosted. Inter from `@fontsource-variable/inter`. Surgena (headings) from licensed `.woff2` files the owner adds to `src/fonts/` (Bold, Semi Bold). Until then headings fall back to Inter. |
| Default theme | Light. Dark when the `dark` class is on `<html>` (shadcn convention). |
| Token names | shadcn names (`background`, `primary`, `muted-foreground`…) plus Yotto extras (`success`, `brand-gradient`). Agents already know shadcn names, so they guess right more often. |
| Icons | Yotto's own icons exported from Figma as SVG → React components (`<IconBoat size={24} />`), color from `currentColor`. |
| Figma clean-up | The design owner applies fixes in Figma using the exact names in section 3. Code follows Figma; mismatches are flagged, never guessed. |
| Build order | Button → Icons → Form controls (Input, RadioGroup, SelectableOption, Pill) → Navigation (Tabs, MenuItem, NavigationMenu, TopBar) → later: BoatCard, NewsCard, DayIndicator. |
| Button props | Figma `Type` is split into `Variant` (primary, secondary, solid, outline), `Size` (sm, lg), `Disabled` (boolean). |
| Naming rule | Figma property names become React prop names: Title Case → camelCase, variant values → lower-case (`Size=Small` → `size="sm"`, `Show Left Icon` → `leftIcon`). |

---

## 2. Figma audit (2026-11-26)

**What is already good**
- 17 text styles with a clear ramp (Display LG/SM, Headers H1–H7, Body xlg/lg/md/sm × Regular/Heavy), fonts linked to variables.
- Every text layer in components uses a text style.
- Almost every fill is linked to a variable (165 links), and components use auto layout.

**What exists**
- `Primitives` collection: 61 variables, one mode — colors (blue, red, magenta, green 0–50; neutrals 0–90; brand white), font names, `Number/4px…44px`.
- `Semantics` collection (light/dark): **only one variable**, `Colors/Background` (light `neutrals/80`, dark `neutrals/10`).
- Paint styles: `Gradient/Blue`, `Gradient/Red`. No shadow or grid styles.
- 13 components on *Basic Elements*; 23 icons + 3 icon sets on *Iconography*.

---

## 3. Figma fix list (by priority)

### P0 — blocks code and dark mode
1. **Create semantic color variables** in `Semantics` (light + dark), named exactly as in the token table (section 4): `background`, `foreground`, `card`, `card-foreground`, `popover`, `popover-foreground`, `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `muted`, `muted-foreground`, `accent`, `accent-foreground`, `destructive`, `destructive-foreground`, `success`, `success-foreground`, `border`, `input`, `ring`.
   *Why it matters most:* these names become the CSS variables and Tailwind classes (`bg-primary`) that code and agents use. Today all 165 color links point straight at primitives (e.g. `neutrals/90`), so nothing can switch to dark.
2. **Re-link component colors** (fills, strokes, text) to the semantic variables instead of primitives.
3. **Split Button `Type`** — it mixes state (Active/Disabled) with look (Line = outline). New properties: `Variant` = Primary | Solid | Secondary | Outline | Cream | Magenta, `Size` = Small | Large, `Disabled` = boolean.
4. **Button width** — variants are fixed width with 119px side padding. Make them hug content with token padding.

### P1 — matters a lot for agents
5. **Descriptions** on every component (0 of 13 have one) and every semantic variable: what it is, when to use it, when not to.
6. **Rename components** to the React names:
   CTA → `Button` · Input text → `Input` · Manu Item → `MenuItem` · controllers top → `TopBar` · Single selectors → `SelectableOption` · Tabs container → `Tabs` · Radio Button → `Radio` · Navigation Menu → `NavigationMenu` · Boat General Card → `BoatCard` · News Card → `NewsCard` · Day Indicator → `DayIndicator`. Fix typo `Upciming` → `Upcoming`.
7. **Property names**: `Status=On/Off` → boolean `Selected`; `Show Left Icon` + icon layer → instance-swap `Left Icon` (plus boolean `Show Left Icon` if needed); keep Title Case.
8. **Spacing and radius variables**: ~43 paddings/gaps and ~26 radii are typed by hand. Add a `Spacing` collection (`space/1` = 4 … `space/11` = 44) and `radius/sm` 8, `radius/md` 12, `radius/lg` 16, `radius/full` 9999; link them.
9. **Variable scopes**: all variables are "All scopes". Colors → fill/stroke/text only; spacing → gap/padding; radius → corner radius.

### P2 — polish
10. Icons: rename `Frame 1`; remove the duplicate `Calendar`; fix `Eye ` (trailing space); consistent case (`engine` → `Engine`, `logout` → `Logout`); single-color strokes; 24×24 base size.
11. Hard-coded fills: BoatCard (5), Top Navigation (2), NewsCard (1), TopBar (1).
12. Add elevation (shadow) styles if cards use shadows; keep gradients as brand-only styles.
13. Remove stray `Rectangle 1` and loose frames from *Basic Elements*.
14. Dark mode needs one more neutral between `neutrals/10` (#2e2e2e) and `neutrals/20` (#5e5d5d) for cards and muted surfaces — proposed `neutrals/15` = #3a3a3a.
15. **Icons found during export:** `Arrow / Direction=Left` draws a right arrow and `Direction=Right` a left arrow (swap names); the second `Calendar` (23:45) is a location pin → rename `Location`; `Person` draws a smiley face → rename `Smile` or redraw; `Frame 1` is a minus-in-circle → `Remove`; partner logos (Benetti, Riva…) belong in a separate "Logos" set, not icons.
16. **Input text layer names differ per variant** ("Input text" vs "Typin") — use one name, e.g. "Value".
17. **New tokens added in code — add matching Figma variables/effect styles:** `brand-gradient-foreground`, `cream` (brand white), `cream-foreground` (neutrals/10), `magenta` (light magenta/0, dark magenta/20), `glass` (light: white 60%, dark: neutrals/15 at 60%), shadows `glow` (0 0 12 / 12%), `float` (0 0 17 / 10%, + 6px background blur), `tab` (0 0 4 / 24%).

---

## 4. Token mapping table — ✅ approved 2026-11-26

Mapping of shadcn theme variables to Yotto primitives. Approved by the design owner; theme code follows this table exactly.

| shadcn variable | Used for | Light | Dark |
|---|---|---|---|
| `background` | Page background | neutrals/80 `#fafafa` | neutrals/10 `#2e2e2e` |
| `foreground` | Body text | neutrals/10 `#2e2e2e` | neutrals/80 `#fafafa` |
| `card` / `popover` | Cards, menus, sheets | neutrals/90 `#ffffff` | **neutrals/15 `#3a3a3a` (new)** |
| `card-foreground` / `popover-foreground` | Text on cards | neutrals/10 | neutrals/80 |
| `primary` | Solid button, links, active tab | blue/0 `#415dff` | blue/10 `#758aff` |
| `primary-foreground` | Text on primary | neutrals/90 `#ffffff` | neutrals/0 `#000000` |
| `secondary` | Secondary button fill | neutrals/90 `#ffffff` | neutrals/15 `#3a3a3a` |
| `secondary-foreground` | Secondary button text | blue/0 | blue/10 |
| `muted` | Disabled fills, quiet surfaces | neutrals/70 `#e7e7e7` | neutrals/15 |
| `muted-foreground` | Hints, captions, placeholders | neutrals/20 `#5e5d5d` | neutrals/40 `#a4a4a4` |
| `accent` | Selected option, hover | blue/50 `#eef0ff` | blue/0 `#415dff` |
| `accent-foreground` | Text on accent | blue/0 | neutrals/90 |
| `destructive` | Errors, delete | red/0 `#e96d83` | red/10 `#f699aa` |
| `destructive-foreground` | Text on destructive | neutrals/10 ⚠ | neutrals/0 |
| `success` *(Yotto)* | Success states | green/0 `#8be2d5` | green/10 `#a0e7dd` |
| `success-foreground` *(Yotto)* | Text on success | neutrals/10 | neutrals/0 |
| `border` | Dividers, card outlines | neutrals/60 `#d7d7d7` | neutrals/20 `#5e5d5d` |
| `input` | Input border (Initial) | neutrals/20 `#5e5d5d` | neutrals/40 `#a4a4a4` |
| `ring` | Focus outline (Input Focus) | blue/0 | blue/10 |
| `brand-gradient` *(Yotto)* | "Primary" gradient button, hero | Gradient/Blue | same |
| `brand-gradient-alt` *(Yotto)* | Accent gradient | Gradient/Red | same |
| `chart-1…5` | Charts | blue/0, green/0, magenta/0, red/0, blue/20 | blue/10, green/10, magenta/10, red/10, blue/30 |
| `sidebar-*` | shadcn sidebar | same as background/foreground/primary/border | same |
| `radius` | Base corner radius | 12px (Input) — Button uses `rounded-full` | same |
| `font-sans` / `font-heading` | Body / headings | Inter / Surgena | same |

Notes for the reviewer
- ⚠ White text on `red/0` is only 3.0:1 contrast (below the 4.5:1 accessibility minimum), so destructive uses dark text.
- White on `blue/0` passes (5.0:1). In dark mode `blue/0` is too dim on `#2e2e2e` (2.7:1), so primary brightens to `blue/10` with black text (6.8:1).
- The palette has no yellow/orange, so there is no `warning` token yet.

---

## 5. Phases and stop points

| # | Phase | Output | Stop? |
|---|---|---|---|
| 0 | Docs | `PLAN.md`, `CLAUDE.md`, `git init` | — |
| 1 | Scaffold | Vite library, Tailwind v4, shadcn init, Storybook with light/dark toggle, Vitest, ESLint/Prettier, `@figma/code-connect` | — |
| 2 | Tokens | `src/tokens/primitives.css`, `src/styles/globals.css` (`:root` + `.dark`), type utilities, fonts, Storybook *Foundations* page | ⏸ **Stop 1** — token table (section 4) before any theme code |
| 3 | Button | `Button.tsx`, stories, test, `Button.figma.ts` | ⏸ **Stop 2** — Figma vs Storybook in light and dark + Code Connect file |
| 4 | Icons, form controls, navigation | One commit per component; each with story, test, Code Connect, CLAUDE.md catalogue entry | — |
| 5 | Agent extras | `docs/components.md` generated from props; `pnpm check:tokens` fails on hard-coded colors | — |
| — | Anything leaving the computer | `git push`, creating the GitHub remote, `npm publish`, `figma connect publish` | ⏸ **Stop 3** — always ask first. The owner runs sign-ins; agents never handle passwords or tokens. |

Note: publishing Code Connect to Figma needs a Figma Organization or Enterprise plan. Check before Stop 3.

## 5b. Design decisions after review (answered 2026-11-26)

| # | Question | Decision | Figma follow-up |
|---|---|---|---|
| 1 | Line + Solid (cream) and Line + Secondary (magenta outline) | **Added as Button variants `cream` and `magenta`**, with new tokens `cream`, `cream-foreground`, `magenta` (dark mode: `magenta/20`). Code Connect maps Line+Solid → cream, Line+Secondary → magenta. | Add `Cream` and `Magenta` to the new `Variant` property. |
| 2 | Line + Primary looks like Active + Secondary | `outline` = transparent background with blue border; `secondary` = white fill with blue border. Outline is not for the blue gradient (unreadable there). | Make Line + Primary transparent when splitting the property. |
| 3 | Disabled text | **Grey text on grey** (readable), not white. | Change disabled variants to `muted-foreground` text. |
| 4 | Button width | **Fit the label**; `className="w-full"` for full width. | Fix-list item 4: hug contents. |
| 5 | Tokens added while building | `brand-gradient-foreground`, `glass`, `cream`, `cream-foreground`, `magenta`, `shadow-glow`, `shadow-float`, `shadow-tab`. Disabled buttons use the same 12% glow as active ones. | Fix-list item 17: add as Figma variables / effect styles. |
| 6 | Code Connect publishing | Needs a Figma Organization or Enterprise plan; files are ready and validated locally. | Owner decision on plan upgrade. |
| 7 | Surgena font | Renders on the owner's Mac (installed locally); elsewhere headings fall back to Inter. | Owner adds licensed `.woff2` files to `src/fonts/`. |
| 8 | Pill colours | **Dark text on a mint tint** (readable), not mint on mint. | Update Pill text colour in Figma. |
| 9 | Input error | **Red border and icons only**; typed text stays dark. Show the error message below the field. | Change error text colour in Figma. |
| 10 | TopBar logo | Use the Figma logo — but the file has **no vector version** (it's an image fill). Code keeps the Yotto mark (`IconYotto`) until an SVG exists. "Date and time" waits for DayIndicator. | Add the logo as a vector (SVG) component in Figma. |
| 11 | Radio "On" mark | **Keep the check mark** inside the filled circle. | None. |

## 6. Verification
- `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build` pass after every component.
- Each component compared with Figma screenshots in light and dark in Storybook.
- `npx figma connect parse` validates every `.figma.ts` locally (no publish).
- Agent test: a fresh agent with only `CLAUDE.md` builds a small screen; it must use only tokens and existing components.

## 7. Status log
- 2026-11-26 — Audit done, interview done, plan approved. Docs written. **Blocked on local tooling:** this Mac has no Node.js and no Apple Command Line Tools (git). Token table ready for Stop 1.
- 2026-11-26 — Node.js 26.13.1 installed to ~/.local/node (verified checksum). Scaffold done (Vite 8, React 19, TS 7, Tailwind 4, Storybook 10, Vitest 5, oxlint, Code Connect 2). Button built; all checks pass. Stop 2 approved. Waiting on commit identity.
- 2026-11-26 — Phase 4 done: 31 icons, Input, RadioGroup/Radio, SelectableOption, Pill, Tabs, MenuItem, NavigationMenu, TopBar (3 of 4 types), Foundations page. 29 tests pass; 9 Code Connect files validate; library build 68 KB JS + 91 KB CSS. Nothing committed yet (no commit identity).
- 2026-11-26 — Stop 1 approved. Theme written by hand: `src/tokens/primitives.css`, `src/styles/globals.css` (not yet compiled or tested — waiting for Node.js). Still blocked on Node.js + Command Line Tools for the scaffold and git.
- 2026-11-26 — Open questions answered (section 5b). Button gains `cream` and `magenta` variants; other answers keep current code. Repo live at https://github.com/OscarPidi/yotto-ui.
