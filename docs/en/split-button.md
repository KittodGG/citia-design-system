---
title: Split button
group: components
category: actions
order: 3
summary: One primary action with a menu trigger for a few close alternatives. Built on details, works without JavaScript, keyboard complete.
---

A split button pairs the action people use most with a menu of variations: Save, with Save as draft and Save and close. The left segment runs the default action in one click; the right segment opens the menu. Use a plain [button](./button.md) when there are no alternatives, a [dropdown menu](./dropdown-menu.md) when no option is the default, and a [button group](./button-group.md) when every option should stay visible.

## Examples

### Primary

```html preview title="Primary split button"
<div style="min-height:11rem">
  <div class="ds-split-button" role="group" aria-label="Save options">
    <button type="button" class="btn btn-primary ds-split-button__action">Save</button>
    <details class="ds-split-button__menu" data-ds-menu>
      <summary class="btn btn-primary ds-split-button__toggle" aria-label="More save options">
        <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg>
      </summary>
      <div class="ds-split-button__panel">
        <button type="button" class="ds-split-button__item">Save as draft</button>
        <button type="button" class="ds-split-button__item">Save and close</button>
        <button type="button" class="ds-split-button__item">Save as template</button>
      </div>
    </details>
  </div>
</div>
```

### Variants and sizes

The segments take any button variant and size. Both segments carry the same classes.

```html preview title="Secondary, outline, small"
<div class="ds-actions is-start" style="align-items:start;min-height:11rem">
  <div class="ds-split-button" role="group" aria-label="Export options">
    <button type="button" class="btn ds-split-button__action">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-download"></use></svg>
      Export
    </button>
    <details class="ds-split-button__menu" data-ds-menu>
      <summary class="btn ds-split-button__toggle" aria-label="More export formats"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg></summary>
      <div class="ds-split-button__panel">
        <a class="ds-split-button__item" href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-xls"></use></svg>Excel (.xlsx)</a>
        <a class="ds-split-button__item" href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-pdf"></use></svg>PDF</a>
        <a class="ds-split-button__item" href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-text"></use></svg>CSV</a>
      </div>
    </details>
  </div>
  <div class="ds-split-button" role="group" aria-label="Review options">
    <button type="button" class="btn btn-outline btn-sm ds-split-button__action">Approve</button>
    <details class="ds-split-button__menu" data-ds-menu>
      <summary class="btn btn-outline btn-sm ds-split-button__toggle" aria-label="More review options"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg></summary>
      <div class="ds-split-button__panel">
        <button type="button" class="ds-split-button__item">Approve with comment</button>
        <button type="button" class="ds-split-button__item">Request changes</button>
        <div class="ds-split-button__separator" role="separator"></div>
        <button type="button" class="ds-split-button__item is-danger">Reject</button>
      </div>
    </details>
  </div>
</div>
```

### Menu open

`open` on the `details` shows the panel. The chevron turns 180 degrees and the trigger keeps its pressed layer.

```html preview title="Open"
<div style="min-height:11rem">
  <div class="ds-split-button" role="group" aria-label="Send options">
    <button type="button" class="btn btn-primary ds-split-button__action">Send invoice</button>
    <details class="ds-split-button__menu" data-ds-menu open>
      <summary class="btn btn-primary ds-split-button__toggle" aria-label="More send options"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg></summary>
      <div class="ds-split-button__panel">
        <button type="button" class="ds-split-button__item">Send and mark as paid</button>
        <button type="button" class="ds-split-button__item">Schedule for later</button>
        <button type="button" class="ds-split-button__item" aria-disabled="true" title="Add a recipient first">Send a copy to me</button>
      </div>
    </details>
  </div>
</div>
```

## States

```html preview title="Split button states"
<div class="ds-actions is-start" style="align-items:center">
  <div class="ds-split-button" role="group" aria-label="Disabled"><button type="button" class="btn ds-split-button__action" disabled>Save</button><details class="ds-split-button__menu"><summary class="btn ds-split-button__toggle" aria-label="More" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg></summary></details></div>
  <div class="ds-split-button" role="group" aria-label="Loading"><button type="button" class="btn btn-primary ds-split-button__action" aria-busy="true">Saving…</button><details class="ds-split-button__menu"><summary class="btn btn-primary ds-split-button__toggle" aria-label="More" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg></summary></details></div>
  <div class="ds-split-button" role="group" aria-label="Success"><button type="button" class="btn btn-primary ds-split-button__action is-success">Saved</button><details class="ds-split-button__menu"><summary class="btn btn-primary ds-split-button__toggle" aria-label="More"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg></summary></details></div>
  <div class="ds-split-button" role="group" aria-label="Hover and focus"><button type="button" class="btn ds-split-button__action" data-ds-demo="hover">Hover</button><details class="ds-split-button__menu"><summary class="btn ds-split-button__toggle" aria-label="More" data-ds-demo="focus"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg></summary></details></div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | None | Two segments sharing one edge; a divider tinted from the content colour separates them |
| Hover | Pointer over a segment | Only that segment takes the state layer |
| Focus-visible | Keyboard focus | 2px `--ds-focus` ring around the focused segment, drawn above its neighbour |
| Pressed | Pointer down | The pressed segment deepens and scales to 0.97 |
| Open | `details[open]` | Chevron rotated 180 degrees, trigger keeps the pressed layer, panel visible |
| Disabled | `disabled` on the action, `aria-disabled` on the trigger | 55% opacity; a disabled split button disables both segments |
| aria-disabled | `aria-disabled="true"` | Same look; stays focusable and explains why |
| Loading | `aria-busy="true"` on the action | Spinner replaces the icon, width kept; disable the trigger while busy |
| Success | `.is-success` | Tonal green with a check glyph for 1.6 to 2 seconds |
| Menu item | hover, focus, disabled, danger | 6% layer on hover, 2px inset ring on focus, 55% opacity when disabled, red text for destructive items |
| Menu motion | Open and close | The panel fades and moves 5px from the trigger over 160ms; exit is 140ms. Reduced motion keeps only the fade |

## Anatomy

- `.ds-split-button`: container, `position: relative`.
- `.ds-split-button__action`: the primary segment, a `.btn`.
- `details.ds-split-button__menu[data-ds-menu]` with `summary.ds-split-button__toggle`: the trigger segment, a `.btn`.
- `.ds-split-button__panel`: the floating panel under the trigger, aligned to the start of the control. Add `is-end` on `.ds-split-button` to align it to the end (for controls at the end of a row) and `is-up` to open upward.
- `.ds-split-button__item`: a button or link in the panel. `is-danger` for destructive items, `.ds-split-button__separator` between groups.

## Usage

- Make the action the one people choose most. The menu holds two to five variations of it.
- Keep the menu labels as short verbs. Put a destructive item last, after a separator.
- Give the trigger an `aria-label` that names what the menu holds ("More save options").
- Do not put unrelated actions in the menu. Use a [dropdown menu](./dropdown-menu.md) for that.
- Do not nest menus inside the panel.

## Accessibility

- The action is a normal button. The trigger is a `summary` with `aria-haspopup="menu"`, and the browser exposes the expanded state of the `details`.
- The panel gets `role="menu"` and items `role="menuitem"` when the page loads. Without JavaScript the panel still opens and closes as a native `details`.
- Opening with the keyboard moves focus into the menu. Escape closes it and returns focus to the trigger. Tabbing out closes it.
- A disabled item uses `aria-disabled="true"` so it can still be read; its click is ignored.
- Contrast and target size follow the [button](./button.md): 4.5:1 for labels, 44px hit area on touch screens, 44px menu rows on touch screens.

| Key | Action |
| --- | --- |
| Tab | Move to the action, then to the trigger |
| Enter, Space (on the action) | Run the default action |
| Enter, Space (on the trigger) | Open the menu and focus the first item |
| ArrowDown, ArrowUp (on the trigger) | Open the menu and focus the first or last item |
| ArrowDown, ArrowUp (in the menu) | Next or previous item, wrapping |
| Home, End | First or last item |
| Enter, Space (on an item) | Run the item and close the menu |
| Escape | Close the menu and return focus to the trigger |
| Tab | Leave the menu and close it |

## JavaScript

`toggle.js` handles every `details.ds-split-button__menu`.

| Behaviour | Effect |
| --- | --- |
| Outside press | Closes any open split menu |
| Item activation | Closes the menu and returns focus to the trigger; `data-ds-keep-open` on an item keeps it open |
| `data-ds-menu` | Shared with the dropdown menu module: one open menu at a time |

Items are ordinary buttons and links. Listen to their `click` events, or give them `data-ds-*` attributes of other modules (for example `data-ds-confirm`).

## Tokens

`--ds-popover`, `--ds-popover-border`, `--ds-shadow-popover`, `--ds-radius-box`, `--ds-radius-md`, `--ds-z-menu`, `--ds-enter-offset`, `--ds-duration-quick|exit`, `--ds-ease-emphasized|exit`, `--ds-opacity-state-hover|pressed`, `--ds-opacity-disabled`, `--ds-size-target`, plus the [button](./button.md) tokens.

## Native and daisyUI

The trigger is a native `details` and `summary`, so the menu works without JavaScript. Both segments are `.btn` and share the button state engine. The panel is not a daisyUI `dropdown`; it is positioned by CSS under the trigger and animated with `@starting-style` and `::details-content`, so both directions are interruptible CSS transitions.
