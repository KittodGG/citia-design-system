---
title: Principles
group: foundations
order: 1
summary: Apple's eight design principles adapted into checkable rules, plus the five Citia rules for states, motion, borders, colour and content, with the numbers behind them.
---

These principles decide every component. When a new component breaks one, change the component, not the principle. Each rule is written so it can be checked in a review: a number, a state, a word.

## Eight principles, adapted

Apple's design principles are the frame. Each becomes a rule here.

| Principle | The rule in the DS |
| --- | --- |
| Purpose | A screen has one job and one primary action: one `btn-primary` per area. Anything that does not serve the job is removed. |
| Agency | The person decides. Nothing is submitted by a stray Enter; unsaved edits trigger a dialog that can be cancelled; destructive actions can be confirmed or undone. |
| Responsibility | Say what will happen. Labels name the result ("Delete 3 invoices"), and irreversible actions ask first with the same verb on the confirm button. |
| Familiarity | Use native elements, platform shortcuts and standard patterns (tabs, menus, tables with sortable headers) before inventing. The same icon means the same thing everywhere. |
| Flexibility | Light and dark, keyboard and touch, mouse and pen, English and Indonesian, 200% zoom, reduced motion and transparency, higher contrast, right-to-left. |
| Simplicity | Remove decisions, not information. Show important data in full; remove repeated explanation. Progressive disclosure, not hiding. |
| Craft | A token for every value, an 8pt grid, contrast tested on 72 pairs in both themes, no magic numbers in a component. |
| Delight | Small, physical feedback: a press scale of `--ds-press-scale`, a switch thumb that travels, a toast that settles. Never decoration, never a surprise. |

## Citia rules

### State completeness {#states}

A component is finished when every state is designed, not when its resting look is.

- Every interactive component covers rest, hover, focus-visible, pressed, selected, disabled and, where they apply, loading, invalid, read-only and empty.
- A state table is mandatory on every component page.
- Every variant must stay legible in every state, in both themes: 4.5:1 for text, 3:1 for boundaries and icons.
- State comes from the platform (`:hover`, `:focus-visible`, `:checked`, `[aria-expanded]`), not from extra classes.
- State is never conveyed by colour alone. Add a glyph, a word, a weight or an indicator.

### Quiet motion {#motion}

Motion explains a change and then gets out of the way.

- Colour and opacity changes take 150ms (`--ds-duration-fast`). Press feedback takes 120ms.
- Menus, popovers and toasts enter in 160 to 220ms and leave in 140ms: exit is faster than enter.
- Things enter moving at most 5px (`--ds-enter-offset`) or scaling from 0.96, from the side of their trigger, and leave the same way.
- Travelling indicators (switch thumb, tab underline, slider snap) take 500ms on a critically damped spring with no overshoot. Bounce is only for gestures that carry momentum, such as a sheet flick.
- Animate only `transform`, `opacity` and colour. Never `width`, `height`, `top` or `left`.
- Respond on pointer-down. Animations are interruptible and restart from their on-screen value.
- Nothing loops except spinners, skeletons, live dots and indeterminate progress. No parallax, no lift on dense data UI.
- With `prefers-reduced-motion: reduce`, movement goes and short cross-fades (up to 150ms) stay.

### Hairlines, not boxes {#hairlines}

- Separate with a 1px border in `--color-base-300`, not with a heavier border, a filled panel or a drop shadow.
- Shadows exist only for layers that float (menus, popovers, dialogs) and come from four tokens: `xs`, `menu`, `panel`, `overlay`.
- Radii are crisp and few (`--ds-radius-*`). No gradients, no glow, no glassmorphism except the translucent bars that sit over scrolling content, which turn opaque under `prefers-reduced-transparency`.
- Field borders use `--ds-control-border`, at least 3:1 against the surface, so a field is findable without hover.

### Scarce colour {#colour}

- Surfaces are neutral. Teal (`--color-primary`) marks the one primary action, selection and focus.
- Status uses pale tonal fills with a word and an icon. A large saturated area is a defect.
- Blue is for links only. Do not use brand colour for decoration.
- Hierarchy comes from type: Manrope with size, weight and tracking set together, tabular numbers for data.

See [Colour](./color.md) for roles, status and dark mode.

### Real content {#content}

- Previews and examples use believable, domain-neutral data with mixed-locale names (Ayu Lestari, Daniel Okafor, Mei Tanaka, Sofia Marquez), project codes (`PRJ-1024`), invoice numbers (`INV-2026-0418`), amounts and dates.
- No lorem ipsum, no placeholder people or companies, no emoji, no marketing language.
- Labels are verbs that name the result. Status is a word first, colour second.
- Leave room for 40% longer text: Indonesian runs longer than English, so no fixed-width labels.

## Numbers to remember

| Topic | Value |
| --- | --- |
| Touch target | 44px (`--ds-size-target`); 24px minimum for any pointer |
| Focus ring | 2px, 2px offset, `--ds-focus`, never removed |
| Text contrast | 4.5:1; boundaries and icons 3:1 |
| Border | 1px, `--color-base-300` |
| Press scale | `--ds-press-scale` on buttons and chips only |
| Enter offset | 5px |
| Hover and focus transition | 150ms |
| Indicator travel | 500ms, no overshoot |
| State layers | hover 6%, pressed 10%, selected 12%, drag 16% |
| Helper text | at most 60 characters |

## Fluid interface, in practice

- **Respond immediately.** Feedback starts on pointer-down, not on click.
- **Stay interruptible.** Press again mid-animation and the element reverses from where it is.
- **Keep spatial consistency.** A sheet leaves toward the edge it came from; a menu closes into its button.
- **Use springs for gestures only.** Ordinary transitions use duration and easing tokens.
- **Honour the system.** `prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-contrast: more` and `forced-colors` are handled in one file, `accessibility.css`, loaded last so it always wins.

Next: [Colour](./color.md).
