---
title: Floating action button
group: components
category: actions
order: 5
summary: The one main action of a screen as a raised round-cornered button, placed bottom-end above the safe area. Regular, small, large, extended.
---

A floating action button (FAB) holds the single most common action of a screen, such as New invoice or Compose, and stays within reach while the content scrolls. Use it once per screen, on screens with a clear creation action. Use a [button](./button.md) in a page header when the action is not the point of the screen, an [icon button](./icon-button.md) for secondary tools, and a [split button](./split-button.md) when the action has variations.

## Examples

### Sizes

Small 40px, regular 56px, large 96px. The glyph is 20px, 24px and 36px.

```html preview title="Small, regular, large"
<div class="ds-actions is-start" style="align-items:center">
  <button type="button" class="ds-fab is-sm" aria-label="New invoice" title="New invoice"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-fab" aria-label="New invoice" title="New invoice"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-fab is-lg" aria-label="New invoice" title="New invoice"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
</div>
```

### Extended

Add a label for a clearer action. The label is the accessible name, so no `aria-label` is needed.

```html preview title="Extended"
<div class="ds-actions is-start" style="align-items:center">
  <button type="button" class="ds-fab is-extended"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg><span class="ds-btn__label">New invoice</span></button>
  <button type="button" class="ds-fab is-extended is-tonal"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg><span class="ds-btn__label">Compose</span></button>
  <button type="button" class="ds-fab is-extended is-surface"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-upload"></use></svg><span class="ds-btn__label">Upload file</span></button>
</div>
```

### Colours

Primary is the default. Tonal and surface keep an opaque fill, because the FAB sits over content.

```html preview title="Primary, tonal, surface"
<div class="ds-actions is-start" style="align-items:center">
  <button type="button" class="ds-fab" aria-label="Add"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-fab is-tonal" aria-label="Edit"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg></button>
  <button type="button" class="ds-fab is-surface" aria-label="Scan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-camera"></use></svg></button>
</div>
```

### Placement

`is-floating` fixes the FAB to the bottom-end corner, 16px from the edges and above the device safe area. `is-start` moves it to the start corner. Set `--ds-fab-offset` to lift it above a bottom navigation or snackbar. The preview below is clipped to a frame so you can see the position.

```html preview title="Floating, bottom-end"
<div style="position:relative;height:12rem;overflow:hidden;transform:translateZ(0);border:1px solid var(--color-base-300);border-radius:var(--ds-radius-box)">
  <p class="ds-text-subtle" style="padding:1rem">Invoices list. The button stays bottom-end while the list scrolls.</p>
  <button type="button" class="ds-fab is-extended is-floating"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg><span class="ds-btn__label">New invoice</span></button>
</div>
```

### Hide on scroll

`data-ds-fab-hide` hides the FAB while the user scrolls down and shows it again on scroll up, so it never covers the last rows of a list. It stays visible while it has focus.

```html
<button type="button" class="ds-fab is-floating" data-ds-fab-hide aria-label="New invoice" title="New invoice">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg>
</button>
```

## States

```html preview title="FAB states"
<div class="ds-actions is-start" style="align-items:center">
  <button type="button" class="ds-fab" aria-label="Rest"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-fab" data-ds-demo="hover" aria-label="Hover"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-fab" data-ds-demo="focus" aria-label="Focus"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-fab" data-ds-demo="pressed" aria-label="Pressed"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-fab" disabled aria-label="Disabled"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-fab" aria-disabled="true" aria-label="aria-disabled" title="Choose a project first"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-fab" aria-busy="true" aria-label="Loading"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-fab is-success" aria-label="Success"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-fab is-extended" aria-busy="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg><span class="ds-btn__label">Creating…</span></button>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | None | Filled teal (or tonal, surface), `--ds-shadow-popover` elevation |
| Hover | Pointer over, on devices that hover | State layer 10% deeper; 150ms. The shadow does not change |
| Focus-visible | Keyboard focus | 2px `--ds-focus` ring, 2px offset |
| Pressed | Pointer down | Layer 16% and scale 0.97 over 120ms |
| Selected | `aria-pressed="true"` | 2px inner edge (a FAB that opens a speed dial) |
| Disabled | `disabled` | 55% opacity, no shadow, `not-allowed` |
| aria-disabled | `aria-disabled="true"` | Same look, focusable, reason in `title` and a description |
| Loading | `aria-busy="true"` | Spinner replaces the glyph; the extended label stays readable; clicks blocked |
| Success | `.is-success` | Tonal green and check glyph for 1.6 to 2 seconds |
| Hidden on scroll | `data-ds-hidden="true"` | Slides 100% plus 2rem down, fades, and leaves the tab order after 500ms. Never while focused |
| Reduced motion | `prefers-reduced-motion` | No slide, no press scale; the FAB only fades |
| Touch | `(pointer: coarse)` | Small FAB grows to 44px |

## Anatomy

- `.ds-fab`: the button (or `a`). Sizes `is-sm`, regular, `is-lg`. Colours `is-tonal`, `is-surface`.
- `is-extended`: icon plus `.ds-btn__label`.
- `is-floating`: fixed placement; `is-start` for the start corner. `--ds-fab-offset` lifts it.
- `data-ds-fab-hide`: hide on scroll down.

## Usage

- Use one FAB per screen, for the action people take most there. A screen without a clear primary creation action has no FAB.
- Use the extended form when the icon alone is ambiguous or on first use. A bare plus is fine for "add" on a list.
- Keep it clear of other fixed UI: set `--ds-fab-offset` to the height of a bottom navigation (56px) plus 8px.
- Do not put a FAB and a filled primary button on the same screen, do not stack FABs, and do not use it for destructive actions.
- On wide screens (1024px and above) prefer the header [button](./button.md); a FAB suits phones and tablets.

## Accessibility

- An icon-only FAB needs `aria-label`; an extended FAB is named by its label.
- Place the FAB late in the DOM (after the content) so keyboard users reach the content first.
- It hides on scroll only for pointer and touch scrolling; focusing it, or any control inside it, always shows it.
- Safe-area insets (`env(safe-area-inset-*)`) keep it clear of the home indicator and notches.
- Contrast: the glyph or label is 4.5:1 against the fill; the FAB is 3:1 against the page through its fill or edge.
- Target: 56px by default, 44px minimum for the small size on touch screens.

| Key | Action |
| --- | --- |
| Tab, Shift+Tab | Move focus |
| Enter, Space | Activate |

## Razor

```cshtml
<ds-fab icon="plus" label="New invoice" floating hide-on-scroll />
<ds-fab icon="plus" floating variant="tonal">New invoice</ds-fab>
<ds-fab icon="plus" size="sm" label="Add" href="@Url.Action("Create")" />
```

| Attribute | Effect |
| --- | --- |
| `icon`, `label` | Icon name; accessible name of an icon-only FAB |
| Child content | Makes the FAB extended; it becomes the label |
| `size` | `sm`, `md` (default), `lg` |
| `variant` | `primary` (default), `tonal`, `surface` |
| `floating`, `start` | Fixed placement; start corner |
| `hide-on-scroll` | `data-ds-fab-hide` |
| `loading`, `disabled`, `disabled-reason`, `href` | As on [button](./button.md) |

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-fab-hide` | Sets `data-ds-hidden="true"` while the user scrolls down past 80px, removes it on scroll up |

The same API as [button](./button.md) applies: `DS.button.loading(fab, true)` and `DS.button.success(fab)`.

## Tokens

`--ds-shadow-popover`, `--ds-radius-xl|2xl`, `--ds-space-4|8`, `--ds-z-sticky`, `--ds-fab-offset` (custom, default 0), `--color-primary`, `--color-primary-content`, `--ds-duration-spring`, `--ds-ease-spring`, `--ds-duration-quick`, `--ds-opacity-state-*`.

## Native and daisyUI

The FAB is a `button` or `a` that uses the button state engine. daisyUI has no FAB; its `fab` speed dial component is not used. The DS component keeps the `translate` and `opacity` transitions on a spring ease with no overshoot.
