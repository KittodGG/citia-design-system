---
title: Accessibility
group: foundations
order: 9
summary: WCAG 2.2 AA as a concrete checklist with success-criterion numbers, the DS classes and attributes that implement each rule, and a testing routine.
---

The target is WCAG 2.2 level AA. The checklist below names the success criterion (SC), the rule in plain numbers and the DS feature that implements it. Components inherit most of it; the rest is up to the page that uses them.

## Contrast

| SC | Rule | In the DS |
| --- | --- | --- |
| 1.4.3 | Text 4.5:1, large text (24px, or 18.66px bold) 3:1 | `--ds-subtle`, `--ds-muted`, `--ds-quiet` and the `--ds-*-text` tokens are tuned per theme |
| 1.4.11 | UI boundaries, icons, focus ring 3:1 | `--ds-control-border`, `--ds-focus` |
| 1.4.1 | Colour is never the only cue | Status pills carry a word; selected items carry a glyph or weight |

Pairs and ratios are listed on the [colour page](./color.md). The report is generated from `tokens/tokens.json` and checked on every token change.

## Keyboard and focus

| SC | Rule | In the DS |
| --- | --- | --- |
| 2.1.1 | Everything works with a keyboard | Native `<button>`, `<a href>`, `<dialog>`; no hover-only actions |
| 2.1.2 | No keyboard trap | Escape closes menus, popovers, sheets and dialogs |
| 2.4.1 | Bypass blocks | `.ds-skip-link` is the first focusable element and targets `#main` |
| 2.4.3 | Focus order follows reading order | No positive `tabindex` |
| 2.4.7 | Focus is visible | 2px `--ds-focus` ring, 2px offset (`:focus-visible`) |
| 2.4.11 | Focus not obscured | Sticky bars use `scroll-padding`; the ring is never removed |
| 3.2.1 | No context change on focus | Menus open on activation, not on focus |

Return focus to the trigger when a layer closes, without scrolling (`focus({ preventScroll: true })`, wrapped as `focusQuietly` in `core.js`). The first focus in a dialog goes to Cancel for irreversible actions and to the first field for forms.

```cshtml
<a class="ds-skip-link btn btn-primary" href="#main">Skip to content</a>
<main id="main" class="ds-main" tabindex="-1">…</main>
```

## Targets

| SC | Rule | In the DS |
| --- | --- | --- |
| 2.5.8 | At least 24×24px | Every control; compact density keeps a 24px hit area |
| 2.5.5 (AAA, followed) | 44×44px on touch | `--ds-size-target` on `(pointer: coarse)` |
| 2.5.7 | Dragging has a pointer alternative | Sortable and resizable items have buttons or arrow keys |

## Names, roles, values

| SC | Need | Implementation |
| --- | --- | --- |
| 4.1.2 | Icon-only button | `aria-label="Edit project PRJ-1024"`, icon `aria-hidden="true"` |
| 4.1.2 | Current page | `aria-current="page"` (`location`, `step` and `true` where they fit) |
| 4.1.2 | Disclosure | `aria-expanded` on the trigger |
| 1.3.1 | Sortable column | `aria-sort="ascending"` on the active `th` |
| 1.3.1 | Scrolling table | `role="region"`, `aria-label` and `tabindex="0"` on the wrapper |
| 4.1.3 | Status messages | `role="status"` (polite), `role="alert"` (errors) |
| 2.5.3 | Label in name | The accessible name contains the visible text |

### Live regions

Announce results without moving focus: save confirmations, result counts, toasts. Use `role="status"` for polite updates and `role="alert"` for errors that need attention now. The region must exist in the DOM before its text changes. Keep messages short ("5 results", "Invoice saved"). Do not announce on every keystroke.

## Forms

| SC | Rule | In the DS |
| --- | --- | --- |
| 1.3.1, 3.3.2 | Visible label tied by `for` and `id` | `.ds-field`; a placeholder is not a label |
| 3.3.1 | Errors identified in text | `aria-invalid="true"`, message below the field |
| 3.3.3 | Suggestion in the error | "Enter a date such as 2026-03-14", not "Invalid" |
| 1.3.5 | Input purpose | `autocomplete` on name, email, address fields |
| 3.3.7 | Redundant entry | Do not ask for what the user already gave in the same flow |
| 3.3.8 | Accessible authentication | Allow paste and password managers; no cognitive tests |

Put an error summary (`.ds-error-summary`) above the form on a failed submit, move focus to it, and link each entry to its field. Mark required fields with the word "required", not only an asterisk. Do not disable the submit button without saying why; keep it active and show the error.

```html preview title="Field with helper and error"
<div class="ds-field" style="max-width:26rem">
  <label for="a11y-code">Project code</label>
  <input id="a11y-code" class="input" value="PRJ-10" aria-invalid="true" aria-describedby="a11y-code-h a11y-code-e" />
  <p id="a11y-code-h" class="ds-hint">Format PRJ- followed by four digits.</p>
  <p id="a11y-code-e" class="ds-field-error">Add two more digits, for example PRJ-1024.</p>
</div>
```

## Motion and time

| SC | Rule | In the DS |
| --- | --- | --- |
| 2.3.3 | Motion on interaction can be disabled | `prefers-reduced-motion` in `accessibility.css`; see [Motion](./motion.md) |
| 2.2.2 | Moving content can be paused | Loops are limited to spinner, skeleton, live dot; all stop under reduced motion |
| 2.3.1 | No flashing | Nothing flashes more than 3 times per second |
| 2.2.1 | Timing adjustable | Toasts pause on hover and focus; error toasts do not auto-close |

## Reflow and zoom

| SC | Rule | In the DS |
| --- | --- | --- |
| 1.4.4 | Text resizes to 200% | Sizes in `rem`; nothing clips |
| 1.4.10 | Reflow at 320px, no 2-axis scroll | `minmax(min(100%, X), 1fr)` grids; tables scroll inside their own region |
| 1.4.12 | Text spacing overrides | Containers have no fixed heights for text |
| 1.4.13 | Hover and focus content | Tooltips are dismissable (Escape), hoverable and persistent |

## User preferences

| Preference | Effect |
| --- | --- |
| `prefers-reduced-motion` | Transforms and loops off, state words kept |
| `prefers-reduced-transparency` | Floating layers opaque, scrim 70% |
| `prefers-contrast: more` | Darker text tiers and borders |
| `forced-colors: active` | Focus `2px solid CanvasText`; status dots use `CanvasText` |
| `prefers-color-scheme` | Theme follows the system until the user picks one |

## Language

Set `<html lang="en">` or `lang="id"` from the request culture. Mark passages in another language with their own `lang`. Dates and numbers follow the culture; see [Localization](./localization.md).

## Testing routine

Run this before each page ships.

1. **Keyboard only.** Unplug the mouse. Tab through the page, open every menu, dialog and combobox, close with Escape. The ring is always visible and the order makes sense.
2. **Automated.** Run axe DevTools or Lighthouse accessibility on each state (open dialog, error form), not just the first load. Zero violations; automation finds about a third of problems.
3. **200% zoom and 320px.** No horizontal page scroll, no clipped text or controls.
4. **Screen readers.** NVDA with Edge or Chrome on Windows, VoiceOver on macOS and iOS Safari. Check icon button names, toast announcements, field errors and table regions.
5. **Themes and preferences.** Repeat 1–3 in light and dark, then with reduced motion, more contrast and forced colours.
6. **Both languages.** Run in English and Indonesian; Indonesian strings are longer.

## Usage

- Use the native element first: `<button>`, `<a href>`, `<input>`, `<details>`, `<dialog>`.
- Do not put `role="button"` on a `div`.
- Do not use `aria-label` to repeat visible text; it should add context only when the text is not enough.
- Do not use `title` as the only name or description.
- Do not rely on colour, position or shape alone to tell states apart.
