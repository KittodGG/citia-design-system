---
title: Toggle
group: components
category: actions
order: 6
summary: A two-state button that stays pressed or not, with aria-pressed. Ghost, outlined, filled and tonal styles, with or without a label.
---

A toggle is a button that switches one option on or off and stays that way: Bold, Mute, Show archived, Pin. It is a `button` with `aria-pressed`. Use a [switch](./switch.md) for a setting that applies at once in a form, a [checkbox](./checkbox.md) for a choice that is submitted with a form, a [toggle group](./toggle-group.md) for several related toggles, and a [button](./button.md) for an action that does not keep a state.

## Examples

### With a label

Click to switch. `data-ds-toggle` flips `aria-pressed`.

```html preview title="Text and icon toggles"
<div class="ds-actions is-start">
  <button type="button" class="ds-toggle" data-ds-toggle aria-pressed="false">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg>
    <span class="ds-btn__label">Pin project</span>
  </button>
  <button type="button" class="ds-toggle" data-ds-toggle aria-pressed="true">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg>
    <span class="ds-btn__label">Show archived</span>
  </button>
  <button type="button" class="ds-toggle" data-ds-toggle aria-pressed="false">
    <span class="ds-btn__label">Only my invoices</span>
  </button>
</div>
```

### Icon only

Icon-only toggles need `aria-label`, and the label does not change when the state changes.

```html preview title="Icon toggles"
<div class="ds-actions is-start">
  <button type="button" class="ds-toggle is-icon" data-ds-toggle aria-pressed="true" aria-label="Bold" title="Bold"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bold"></use></svg></button>
  <button type="button" class="ds-toggle is-icon" data-ds-toggle aria-pressed="false" aria-label="Italic" title="Italic"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-italic"></use></svg></button>
  <button type="button" class="ds-toggle is-icon" data-ds-toggle aria-pressed="false" aria-label="Underline" title="Underline"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-underline"></use></svg></button>
</div>
```

### Styles

Ghost is the default. Outlined adds a 1px edge, tonal a 12% tint. Filled shows a neutral fill while off and the solid teal while on.

```html preview title="Ghost, outlined, tonal, filled"
<div class="ds-actions is-start">
  <button type="button" class="ds-toggle" data-ds-toggle aria-pressed="false">Ghost</button>
  <button type="button" class="ds-toggle is-outlined" data-ds-toggle aria-pressed="false">Outlined</button>
  <button type="button" class="ds-toggle is-tonal" data-ds-toggle aria-pressed="false">Tonal</button>
  <button type="button" class="ds-toggle is-filled" data-ds-toggle aria-pressed="false">Filled</button>
  <button type="button" class="ds-toggle" aria-pressed="true">Ghost on</button>
  <button type="button" class="ds-toggle is-outlined" aria-pressed="true">Outlined on</button>
  <button type="button" class="ds-toggle is-tonal" aria-pressed="true">Tonal on</button>
  <button type="button" class="ds-toggle is-filled" aria-pressed="true">Filled on</button>
</div>
```

### Sizes

```html preview title="xs, sm, md, lg"
<div class="ds-actions is-start" style="align-items:center">
  <button type="button" class="ds-toggle is-outlined is-xs" data-ds-toggle aria-pressed="true">Extra small</button>
  <button type="button" class="ds-toggle is-outlined is-sm" data-ds-toggle aria-pressed="true">Small</button>
  <button type="button" class="ds-toggle is-outlined" data-ds-toggle aria-pressed="true">Medium</button>
  <button type="button" class="ds-toggle is-outlined is-lg" data-ds-toggle aria-pressed="true">Large</button>
</div>
```

### Glyph for each state

Wrap the glyphs in `.ds-toggle__off` and `.ds-toggle__on`. Only the one that matches `aria-pressed` shows. The accessible name stays the same.

```html preview title="Icon swap"
<button type="button" class="ds-toggle is-outlined" data-ds-toggle aria-pressed="false" aria-label="Mute notifications">
  <span class="ds-toggle__off"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bell"></use></svg>Notifications on</span>
  <span class="ds-toggle__on"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg>Muted</span>
</button>
```

## States

```html preview title="Toggle states"
<div style="overflow-x:auto"><table style="border-collapse:separate;border-spacing:.375rem .5rem;font-size:.8125rem">
<thead><tr><th></th><th scope="col" style="text-align:start">Rest</th><th scope="col" style="text-align:start">Hover</th><th scope="col" style="text-align:start">Focus</th><th scope="col" style="text-align:start">Pressed</th><th scope="col" style="text-align:start">On</th><th scope="col" style="text-align:start">Disabled</th><th scope="col" style="text-align:start">aria-disabled</th><th scope="col" style="text-align:start">Loading</th></tr></thead>
<tbody>
<tr><th scope="row" style="text-align:start;vertical-align:middle">Ghost</th>
<td><button type="button" class="ds-toggle is-sm" aria-pressed="false">Pin</button></td>
<td><button type="button" class="ds-toggle is-sm" aria-pressed="false" data-ds-demo="hover">Pin</button></td>
<td><button type="button" class="ds-toggle is-sm" aria-pressed="false" data-ds-demo="focus">Pin</button></td>
<td><button type="button" class="ds-toggle is-sm" aria-pressed="false" data-ds-demo="pressed">Pin</button></td>
<td><button type="button" class="ds-toggle is-sm" aria-pressed="true">Pin</button></td>
<td><button type="button" class="ds-toggle is-sm" aria-pressed="false" disabled>Pin</button></td>
<td><button type="button" class="ds-toggle is-sm" aria-pressed="false" aria-disabled="true" title="Available to admins">Pin</button></td>
<td><button type="button" class="ds-toggle is-sm" aria-pressed="false" aria-busy="true">Pin</button></td></tr>
<tr><th scope="row" style="text-align:start;vertical-align:middle">Outlined</th>
<td><button type="button" class="ds-toggle is-outlined is-sm" aria-pressed="false">Pin</button></td>
<td><button type="button" class="ds-toggle is-outlined is-sm" aria-pressed="false" data-ds-demo="hover">Pin</button></td>
<td><button type="button" class="ds-toggle is-outlined is-sm" aria-pressed="false" data-ds-demo="focus">Pin</button></td>
<td><button type="button" class="ds-toggle is-outlined is-sm" aria-pressed="false" data-ds-demo="pressed">Pin</button></td>
<td><button type="button" class="ds-toggle is-outlined is-sm" aria-pressed="true">Pin</button></td>
<td><button type="button" class="ds-toggle is-outlined is-sm" aria-pressed="false" disabled>Pin</button></td>
<td><button type="button" class="ds-toggle is-outlined is-sm" aria-pressed="false" aria-disabled="true" title="Available to admins">Pin</button></td>
<td><button type="button" class="ds-toggle is-outlined is-sm" aria-pressed="false" aria-busy="true">Pin</button></td></tr>
<tr><th scope="row" style="text-align:start;vertical-align:middle">Filled</th>
<td><button type="button" class="ds-toggle is-filled is-sm" aria-pressed="false">Pin</button></td>
<td><button type="button" class="ds-toggle is-filled is-sm" aria-pressed="false" data-ds-demo="hover">Pin</button></td>
<td><button type="button" class="ds-toggle is-filled is-sm" aria-pressed="false" data-ds-demo="focus">Pin</button></td>
<td><button type="button" class="ds-toggle is-filled is-sm" aria-pressed="false" data-ds-demo="pressed">Pin</button></td>
<td><button type="button" class="ds-toggle is-filled is-sm" aria-pressed="true">Pin</button></td>
<td><button type="button" class="ds-toggle is-filled is-sm" aria-pressed="false" disabled>Pin</button></td>
<td><button type="button" class="ds-toggle is-filled is-sm" aria-pressed="false" aria-disabled="true" title="Available to admins">Pin</button></td>
<td><button type="button" class="ds-toggle is-filled is-sm" aria-pressed="false" aria-busy="true">Pin</button></td></tr>
</tbody></table></div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest (off) | `aria-pressed="false"` | Ghost: text in the base colour. Outlined: 1px control edge. Filled: 8% neutral fill |
| Hover | Pointer over, on devices that hover | State layer 6% (10% on filled); 150ms |
| Focus-visible | Keyboard focus | 2px `--ds-focus` ring, 2px offset |
| Pressed | Pointer down | Layer 10% and scale 0.97 over 120ms |
| On | `aria-pressed="true"` | 12% primary tint, primary text, 2px edge: a shape cue as well as colour. Filled turns solid teal with white text |
| Disabled | `disabled` | 55% opacity, `not-allowed`, keeps its on or off look |
| aria-disabled | `aria-disabled="true"` | Same look, focusable, click ignored, reason in `title` and a description |
| Loading | `aria-busy="true"` | Spinner before the label; the state does not change until the request ends |
| Reduced motion | `prefers-reduced-motion` | No press scale; colour changes remain |
| Forced colours | `forced-colors: active` | On state uses `Highlight` and `HighlightText` |

## Anatomy

- `.ds-toggle`: the button. Styles: none (ghost), `is-outlined`, `is-tonal`, `is-filled`. Sizes: `is-xs`, `is-sm`, medium, `is-lg`, `is-xl`. `is-icon` for icon-only.
- `data-ds-toggle`: lets `toggle.js` flip `aria-pressed` on click.
- `.ds-toggle__off`, `.ds-toggle__on`: optional content shown for one state.
- `.ds-btn__label`: text wrapper.

## Usage

- Name the toggle by what it controls ("Bold", "Pin project"), not by the action ("Turn on bold"). The pressed state says whether it is on.
- Do not change the label when the state changes; screen readers would announce the state twice. Swap the glyph, not the name.
- Use a toggle for an immediate, reversible option. For settings that wait for a Save button use a [checkbox](./checkbox.md) or [switch](./switch.md).
- Do not use a toggle for a one-time action (use a [button](./button.md)) or for navigation (use [tabs](./tabs.md)).
- Group three or more related toggles in a [toggle group](./toggle-group.md).

## Accessibility

- Role: native `button` with `aria-pressed="true|false"`. Do not combine `aria-pressed` with `role="switch"` or `aria-checked`.
- Icon-only toggles need `aria-label`; the name stays constant.
- On is shown by tint, text colour and a thicker edge, not colour alone.
- `aria-disabled="true"` keeps the toggle focusable and ignores the click.
- Contrast: 4.5:1 for text, 3:1 for the edge, in both themes. Target: 44px on touch screens.

| Key | Action |
| --- | --- |
| Tab, Shift+Tab | Move focus |
| Enter, Space | Switch the toggle |

## Razor

```cshtml
<ds-toggle icon="bookmark" pressed="true" variant="outlined">Pin project</ds-toggle>
<ds-toggle icon="bold" label="Bold" size="sm" />
<ds-toggle variant="tonal" disabled-reason="Available to admins">Show archived</ds-toggle>
```

| Attribute | Effect |
| --- | --- |
| Child content, `icon`, `label` | Visible text and icon. Without child content the toggle is icon-only and `label` is its name |
| `variant` | `ghost` (default), `outlined`, `tonal`, `filled` |
| `size` | `xs`, `sm`, `md` (default), `lg`, `xl` |
| `pressed` | Initial state |
| `loading`, `disabled`, `disabled-reason` | As on [button](./button.md) |

## JavaScript

| Attribute or API | Effect |
| --- | --- |
| `[data-ds-toggle]` | Click flips `aria-pressed`. Without `aria-pressed` the module adds `false` on load |
| `DS.toggle.set(el, pressed)` | Sets the state and fires the event |

Event `ds:toggle:change` bubbles from the toggle with `detail.pressed`.

```js
document.addEventListener("ds:toggle:change", (event) => {
  if (event.target.id === "pin") save({ pinned: event.detail.pressed });
});
```

## Tokens

`--color-primary`, `--ds-quiet`, `--color-base-content`, `--ds-control-border`, `--ds-opacity-state-hover|pressed|selected`, `--ds-opacity-disabled`, `--ds-press-scale`, `--ds-radius-md|lg|box`, `--ds-size-target`, `--ds-focus`.

## Native and daisyUI

The toggle is a native `button` with `aria-pressed`. It is not the daisyUI `.toggle` (a switch built on a checkbox); that one is documented as [Switch](./switch.md). The DS toggle reads the `aria-pressed` selector that daisyUI also uses for `.btn`, and adds the tonal selected look.
