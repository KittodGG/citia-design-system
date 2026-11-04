---
title: States
group: foundations
order: 8
summary: The state matrix every component follows: pointer, keyboard, selection, availability, validation and activity states, state layers, focus rules and environment states.
---

Every interactive component has more than a resting look. Citia DS designs and documents each state, expresses it with native HTML and ARIA before any class, and verifies it in both themes. This page is the shared reference; each component page repeats the table for its own states.

## State matrix

| Group | States | Expressed by | Visual rule |
| --- | --- | --- | --- |
| Pointer | rest, hover, pressed | `:hover` inside `@media (hover: hover)`, `:active` | Hover is a state layer (`--ds-opacity-state-hover`) or one step deeper surface. Pressed is `--ds-opacity-state-pressed` plus `scale(var(--ds-press-scale))` on buttons and chips only |
| Keyboard | focus-visible, focus-within | `:focus-visible`, `:focus-within` | 2px ring in `--ds-focus`, 2px offset; never removed, never hidden by sticky UI; no ring on mouse focus |
| Selection | selected, checked, indeterminate, on/off, current | `:checked`, `:indeterminate`, `aria-checked`, `aria-pressed`, `aria-selected`, `aria-current` | Tonal fill (`--ds-opacity-state-selected` of primary) with primary text, or a check glyph. Never colour alone |
| Disclosure | expanded, collapsed, open, closed | `aria-expanded`, `[open]`, `:popover-open` | Chevron rotates 180° (90° for trees); the panel enters with the [motion](./motion.md) rules |
| Availability | disabled, aria-disabled, read-only | `:disabled`, `[aria-disabled="true"]`, `[readonly]` | Disabled uses `--ds-opacity-disabled`, `cursor: not-allowed`, no hover or press. `aria-disabled` stays focusable and explains why. Read-only keeps normal contrast and is selectable |
| Validation | required, invalid, success, warning | `required`, `:user-invalid`, `aria-invalid="true"`, `[data-state="success"]` | Error border plus `--ds-error-text` message with an icon below the field, linked by `aria-describedby`. Validate on blur, re-validate on input after the first error |
| Activity | busy, progress, success, error feedback | `aria-busy="true"`, `[data-state="loading"]`, transient `is-copied` | Busy keeps the width, shows a spinner and a readable label, blocks interaction. Indicators appear after about 300ms. Transient success lasts 1.6–2s |
| Content | empty, placeholder, autofill, overflow, skeleton | `:placeholder-shown`, `:autofill`, `text-overflow`, `.ds-skeleton` | Placeholder uses `--ds-subtle` (4.5:1). Autofill keeps the theme surface. Long text wraps or truncates with the full text available |
| Drag | dragging, drop target | `[data-dragging]`, `[data-drop-target]` | Lifted surface with `--ds-shadow-panel`; drop target tinted with `--ds-opacity-state-drag` and a dashed primary border |
| Variants | tone, size, density | `is-*` modifiers, daisyUI `btn-*` | Every variant and state stays legible in both themes: 4.5:1 for text, 3:1 for boundaries and icons |
| Environment | dark, reduced motion, reduced transparency, more contrast, forced colours, RTL, 200% zoom, 320px, print | media queries, `[dir="rtl"]` | See [Environment states](#environment-states) |

## Buttons

```html preview title="Button states"
<div style="display:flex;flex-wrap:wrap;gap:.75rem;align-items:center">
  <button type="button" class="btn">Rest</button>
  <button type="button" class="btn" aria-pressed="true">Pressed (toggled)</button>
  <button type="button" class="btn" disabled>Disabled</button>
  <button type="button" class="btn" aria-disabled="true" title="Add a client first">aria-disabled</button>
  <button type="button" class="btn btn-primary" aria-busy="true"><span class="ds-spinner" aria-hidden="true"></span> Sending</button>
  <button type="button" class="btn btn-primary">Primary</button>
  <button type="button" class="btn btn-error">Delete</button>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Hover | Pointer over, on devices that hover | Deeper surface or state layer at 6% |
| Focus-visible | Keyboard focus | 2px `--ds-focus` ring, 2px offset |
| Pressed | Pointer down | State layer at 10%, scale 0.97 over 120ms |
| Toggled | `aria-pressed="true"` | Tonal selected fill and primary text |
| Disabled | `disabled` | 55% opacity, `not-allowed`, no hover or press, not focusable |
| aria-disabled | `aria-disabled="true"` | Disabled look, stays focusable, tooltip or helper explains why |
| Busy | `aria-busy="true"` | Spinner before the label, same width, input blocked |

## Fields

```html preview title="Field states"
<div style="display:grid;gap:1rem;max-width:26rem">
  <div class="ds-field"><label for="st-rest">Rest</label><input id="st-rest" class="input" placeholder="Project name" /></div>
  <div class="ds-field"><label for="st-filled">Filled</label><input id="st-filled" class="input" value="Harbour redesign" /></div>
  <div class="ds-field"><label for="st-ro">Read-only</label><input id="st-ro" class="input" value="PRJ-1024" readonly /></div>
  <div class="ds-field"><label for="st-dis">Disabled</label><input id="st-dis" class="input" value="Ayu Lestari" disabled /></div>
  <div class="ds-field"><label for="st-inv">Invalid</label><input id="st-inv" class="input" value="2026-13-40" aria-invalid="true" aria-describedby="st-inv-e" /><p id="st-inv-e" class="ds-field-error">Enter a valid date, for example 2026-03-14.</p></div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Focus | Keyboard or pointer focus | Primary border and 2px ring |
| Placeholder | `:placeholder-shown` | `--ds-subtle` text, never the only label |
| Read-only | `readonly` | No border emphasis, normal contrast, selectable |
| Disabled | `disabled` | 55% opacity, not focusable, excluded from submit |
| Invalid | `aria-invalid="true"` | Error border, icon and message below, `aria-describedby` link |

## Choice controls

```html preview title="Checkbox, radio and switch"
<div style="display:flex;flex-wrap:wrap;gap:1.5rem 2rem;align-items:center">
  <label style="display:inline-flex;gap:.5rem;align-items:center"><input type="checkbox" class="checkbox" /> Unchecked</label>
  <label style="display:inline-flex;gap:.5rem;align-items:center"><input type="checkbox" class="checkbox" checked /> Checked</label>
  <label style="display:inline-flex;gap:.5rem;align-items:center"><input type="checkbox" class="checkbox" aria-checked="mixed" /> Mixed</label>
  <label style="display:inline-flex;gap:.5rem;align-items:center"><input type="checkbox" class="checkbox" disabled checked /> Disabled</label>
  <label style="display:inline-flex;gap:.5rem;align-items:center"><input type="radio" class="radio" name="st-r" checked /> Selected</label>
  <label style="display:inline-flex;gap:.5rem;align-items:center"><input type="radio" class="radio" name="st-r" /> Other</label>
  <label style="display:inline-flex;gap:.5rem;align-items:center"><input type="checkbox" role="switch" class="toggle" checked /> On</label>
  <label style="display:inline-flex;gap:.5rem;align-items:center"><input type="checkbox" role="switch" class="toggle" disabled /> Off, disabled</label>
</div>
```

Mixed is `aria-checked="mixed"` in markup or `input.indeterminate = true` in script; HTML has no attribute for it.

## Disclosure and loading

```html preview title="Details, spinner and skeleton"
<div style="display:grid;gap:1rem;max-width:26rem">
  <details style="border:1px solid var(--color-base-300);border-radius:var(--ds-radius-box);padding:.75rem 1rem"><summary style="cursor:pointer;font-weight:600">Collapsed</summary><p style="margin:.5rem 0 0">Hidden until opened.</p></details>
  <details open style="border:1px solid var(--color-base-300);border-radius:var(--ds-radius-box);padding:.75rem 1rem"><summary style="cursor:pointer;font-weight:600">Expanded</summary><p style="margin:.5rem 0 0">Shown, and the summary reports `aria-expanded` natively.</p></details>
  <div style="display:flex;align-items:center;gap:.75rem"><span class="ds-spinner" aria-hidden="true"></span><span role="status">Loading invoices</span></div>
  <div class="skeleton" style="height:1rem;width:70%" aria-hidden="true"></div>
  <div class="skeleton" style="height:1rem;width:45%" aria-hidden="true"></div>
</div>
```

## State layers

A state layer is a wash of the content colour over the surface. It works on any surface in both themes because it is computed with `color-mix()`.

```ds-tokens
opacity
```

| Token | Value | Use |
| --- | --- | --- |
| `--ds-opacity-state-hover` | 0.06 | Hover |
| `--ds-opacity-state-pressed` | 0.10 | Pressed |
| `--ds-opacity-state-selected` | 0.12 | Selected, current |
| `--ds-opacity-state-drag` | 0.16 | Drop target |
| `--ds-opacity-disabled` | 0.55 | Disabled and busy controls |

## Focus ring rules

- 2px solid `--ds-focus` with a 2px offset on `:focus-visible`. Components flush with their edge use -2px.
- Never `outline: none` without an equivalent replacement.
- Focus is not hidden by sticky headers or bottom bars (WCAG 2.4.11). Use `scroll-padding` equal to the sticky height.
- No ring on mouse focus; `:focus-visible` handles this.
- Focus ring contrast is 3:1 against both the surface and the control.

## Expressing state

1. **Native first.** `disabled`, `checked`, `readonly`, `required`, `open`, `:user-invalid`.
2. **ARIA when native does not exist.** `aria-pressed`, `aria-expanded`, `aria-selected`, `aria-current`, `aria-invalid`, `aria-busy`, `aria-disabled`.
3. **`data-state` last**, only when no ARIA state fits (for example `data-state="success"`).
4. Style from the attribute, not from a parallel class, so assistive technology and CSS can never disagree.

## Environment states

| Environment | Behaviour |
| --- | --- |
| Dark | Every state is checked in `data-theme="dark"`; state layers keep working because they mix the content colour |
| Reduced motion | Transforms go, short opacity cross-fades stay, loops stop. See [Motion](./motion.md) |
| Reduced transparency | Floating layers become opaque, scrim rises to 70% |
| More contrast | `--ds-subtle` becomes full content colour, borders turn darker |
| Forced colours | Focus uses `2px solid CanvasText`; selection needs a glyph or border, not a fill |
| RTL | Logical properties; chevrons and indicators mirror |
| 200% zoom and 320px | No clipping, no horizontal scroll except inside a data region |

## Usage

- Show every state that can occur; do not ship a control with only its rest look.
- Prefer `aria-disabled` over `disabled` when the user needs to learn why an action is unavailable.
- Never express state with colour alone. Add a glyph, a weight change or an indicator.
- Do not show a loading indicator for work under 300ms.

## Accessibility

State is announced through the same attributes that style it: `aria-busy` for busy regions, `aria-invalid` with `aria-describedby` for errors, `aria-pressed` for toggles. See [Accessibility](./accessibility.md).
