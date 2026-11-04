---
title: Segmented control
group: components
category: actions
order: 9
summary: One choice among 2 to 5 options that changes how content is shown. A raised thumb slides to the selected option; radio, button and link markup.
source: TPS app.css .view-switch L708–760
---

A segmented control picks one option from a short, mutually exclusive set and applies it at once: list or grid, daily or weekly, comfortable or compact. Use it for 2 to 5 options with short labels. For more options use a [Select](./select.md) or [Radio group](./radio-group.md); for views that have their own content panels use [Tabs](./tabs.md); for on/off use a [Switch](./switch.md).

The control has three markups. **Radios** (`<label><input type="radio">`) are the right choice inside a form: they submit a value and use native arrow-key navigation. **Buttons** with `aria-pressed` are for client-side view changes. **Links** with `aria-current` are for choices that reload the page with a new query string.

## Examples

### Radios

Arrow keys move between options and select them, as in any radio group. The radios are visually hidden but stay focusable.

```html preview title="Radio segments"
<div class="ds-segmented" role="radiogroup" aria-label="Table density" data-ds-segmented>
  <label><input type="radio" name="seg-density" value="comfortable" checked>Comfortable</label>
  <label><input type="radio" name="seg-density" value="compact">Compact</label>
</div>
```

### Buttons and icons

Icon-only options need an `aria-label`. Set `aria-pressed` on exactly one button.

```html preview title="Button segments with icons"
<div class="ds-segmented" role="group" aria-label="View" data-ds-segmented>
  <button type="button" aria-pressed="true" aria-label="List"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-list"/></svg></button>
  <button type="button" aria-pressed="false" aria-label="Grid"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-layout-grid"/></svg></button>
  <button type="button" aria-pressed="false" aria-label="Table"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-table"/></svg></button>
</div>
<div class="ds-segmented" role="group" aria-label="Range" data-ds-segmented style="margin-top:1.5rem">
  <button type="button" aria-pressed="false"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-calendar"/></svg>7 days</button>
  <button type="button" aria-pressed="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-calendar"/></svg>30 days</button>
  <button type="button" aria-pressed="false"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-calendar"/></svg>90 days</button>
</div>
```

### Links

Use links when the choice is a URL (`?view=weekly`). The server marks the current option with `aria-current="page"`.

```html preview title="Link segments"
<div class="ds-segmented" role="group" aria-label="Invoices by" data-ds-segmented>
  <a href="#" aria-current="page">Per customer</a>
  <a href="#">Per project</a>
</div>
```

### Sizes, full width and primary

`is-sm` (32px), default (40px), `is-lg` (48px). `is-full` fills the container with equal columns. `is-primary` fills the thumb with `--color-primary` for a choice that is the main control of the area.

```html preview title="Sizes, full width, primary"
<div class="ds-segmented is-sm" role="group" aria-label="Small" data-ds-segmented>
  <button type="button" aria-pressed="true">Day</button><button type="button" aria-pressed="false">Week</button><button type="button" aria-pressed="false">Month</button>
</div>
<div class="ds-segmented is-lg" role="group" aria-label="Large" data-ds-segmented style="margin-top:1rem">
  <button type="button" aria-pressed="true">Day</button><button type="button" aria-pressed="false">Week</button><button type="button" aria-pressed="false">Month</button>
</div>
<div class="ds-segmented is-full" role="group" aria-label="Full width" data-ds-segmented style="margin-top:1rem">
  <button type="button" aria-pressed="false">Invoices</button><button type="button" aria-pressed="true">Quotes</button>
</div>
<div class="ds-segmented is-primary" role="group" aria-label="Primary" data-ds-segmented style="margin-top:1rem">
  <button type="button" aria-pressed="true">Monthly</button><button type="button" aria-pressed="false">Yearly</button>
</div>
```

## States

```html preview title="Selected, disabled option, disabled group"
<div class="ds-segmented" role="radiogroup" aria-label="Plan" data-ds-segmented>
  <label><input type="radio" name="seg-st-1" value="free" checked>Free</label>
  <label><input type="radio" name="seg-st-1" value="team">Team</label>
  <label><input type="radio" name="seg-st-1" value="enterprise" disabled>Enterprise</label>
</div>
<fieldset disabled style="border:0;padding:0;margin:1.5rem 0 0">
  <legend class="ds-visually-hidden">Locked choice</legend>
  <div class="ds-segmented" role="radiogroup" aria-label="Locked" data-ds-segmented>
    <label><input type="radio" name="seg-st-2" value="a" checked>Monthly</label>
    <label><input type="radio" name="seg-st-2" value="b">Yearly</label>
  </div>
</fieldset>
<div class="ds-segmented" role="group" aria-label="Explained" data-ds-segmented style="margin-top:1.5rem">
  <button type="button" aria-pressed="true">Standard</button>
  <button type="button" aria-pressed="false" aria-disabled="true" title="Available after verification">Express</button>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | none | `--ds-subtle` text on the `--color-base-200` track |
| Hover | pointer over an option | text turns `--color-base-content`, 6% tint |
| Pressed | pointer down | 10% tint |
| Focus-visible | keyboard focus (also on the hidden radio) | 2px `--ds-focus` ring around the option |
| Selected | `:checked`, `aria-pressed="true"` or `aria-current` | raised `--color-base-100` thumb with a hairline and `--ds-shadow-xs`, full-contrast text; the thumb slides |
| Disabled | `disabled` on the input or button, or a disabled fieldset | 55% opacity, `not-allowed` cursor, no hover or press |
| aria-disabled | `aria-disabled="true"` | same look, stays focusable so the title can explain why |
| Without JavaScript | `data-ds-ready` not set | the selected option carries the raised fill itself; it just does not slide |

## Anatomy

- `.ds-segmented` the track and root. Modifiers: `is-sm`, `is-lg`, `is-full`, `is-primary`.
- Options: direct children `label`, `button` or `a`.
- `.ds-segmented__thumb` the sliding thumb, created by `tabs.js`.

## Usage

- Use 2 to 5 options, each a word or two, 16 characters at most. All options are equal width, so the longest label sets the size.
- Preselect one option. A segmented control has no "none" state.
- Apply the change immediately. If the choice needs a Save button, use a [Radio group](./radio-group.md).
- Do not use it for navigation between pages of a site (use [Tabs](./tabs.md) or a [Navbar](./navbar.md)) or for toggling one setting (use a [Switch](./switch.md)).
- Add one sentence under the control when the options are not self-explanatory.

## Accessibility

- Radios use `role="radiogroup"` (or a `<fieldset>` with a legend) and an accessible name. Buttons use `role="group"` and `aria-pressed`. Links use `aria-current`.
- Selected is not shown by colour alone: the raised thumb and contrast change mark it.
- Icon-only options need `aria-label`; the label names the option, not its state.
- Hit area is 40px high and 44px on touch screens.
- Motion: the thumb travels on `--ds-ease-spring` over `--ds-duration-spring` with no overshoot, continues from its current position when interrupted, and jumps under `prefers-reduced-motion`.
- Forced colours: the selected option gets a 2px `Highlight` border.

| Key | Action |
| --- | --- |
| Tab | Moves into the group (radios: to the checked option) and out |
| Arrow keys | Radios: select the next or previous option, wrapping |
| Space | Radios: select the focused option. Buttons: press it |
| Enter | Buttons and links: activate |

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-segmented` | Creates the sliding thumb and keeps it on the selected option. Buttons with `aria-pressed` behave as one choice. `data-ds-segmented="off"` opts out |

```js
document.addEventListener("ds:segmented:change", (e) => {
  console.log(e.detail.value);   // radio value, or button value / text
});
```

The thumb also follows changes made by your own code to `aria-pressed`, `aria-current`, `aria-checked` and radio state.

## Tokens

`--color-base-100`, `--color-base-200`, `--color-base-300`, `--color-base-content`, `--color-primary`, `--color-primary-content`, `--ds-subtle`, `--ds-focus`, `--ds-radius-lg`, `--ds-radius-xl`, `--ds-shadow-xs`, `--ds-size-target`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-opacity-disabled`, `--ds-duration-fast`, `--ds-duration-spring`, `--ds-ease-spring`.

## Native and daisyUI

Built on native radio inputs, buttons and links. daisyUI's `join` and `btn` group patterns are not used; the track and thumb are DS classes. The v1 markup (`.ds-segmented` with `<a>`, `<button aria-pressed>` or `<label>` children) is unchanged. The only visual change from v1 is the default look: a raised neutral thumb instead of a filled teal option; add `is-primary` for the v1 look. [Theme switcher](./theme-switcher.md) and [Language switcher](./language-switcher.md) are built on this control.
