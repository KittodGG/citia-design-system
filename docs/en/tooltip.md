---
title: Tooltip
group: components
category: feedback
order: 4
summary: A short label or hint that appears after a 500ms hover or on keyboard focus, on any focusable element, in a plain or a rich variant that is never interactive.
---

A tooltip names an icon button, shows a keyboard shortcut or explains a truncated value. It carries no essential information and no controls: whatever it says must also be available some other way. For content with links or buttons use a [popover](./popover.md). For a preview of a linked page use a [hover card](./hover-card.md).

## Examples

Hover the buttons (or focus them with Tab). The first tooltip waits 500ms; moving to the next button shows its tooltip at once.

```html preview title="Plain"
<div class="ds-actions is-start">
  <button type="button" class="btn btn-square" data-ds-tooltip="Add a comment" data-ds-tooltip-kbd="C">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg>
  </button>
  <button type="button" class="btn btn-square" data-ds-tooltip="Refresh data" data-ds-tooltip-kbd="R">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-refresh"></use></svg>
  </button>
  <button type="button" class="btn btn-square" data-ds-tooltip="Delete invoice INV-2026-0418">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg>
  </button>
  <button type="button" class="btn" data-ds-tooltip="Saved at 14:05 by Ayu Lestari">Last saved</button>
</div>
```

Placement. The default is above the element. The tooltip flips to the opposite side when it would leave the screen.

```html preview title="Placement"
<div class="ds-actions is-start" style="padding:2.5rem 4rem">
  <button type="button" class="btn" data-ds-tooltip="Top" data-ds-tooltip-placement="top">Top</button>
  <button type="button" class="btn" data-ds-tooltip="Bottom" data-ds-tooltip-placement="bottom">Bottom</button>
  <button type="button" class="btn" data-ds-tooltip="Left" data-ds-tooltip-placement="left">Left</button>
  <button type="button" class="btn" data-ds-tooltip="Right" data-ds-tooltip-placement="right">Right</button>
  <button type="button" class="btn" data-ds-tooltip="Aligned to the start" data-ds-tooltip-placement="bottom-start">Bottom start</button>
</div>
```

Rich. A title and a sentence on a light surface. Still not interactive.

```html preview title="Rich"
<div class="ds-actions is-start">
  <button type="button" class="btn" data-ds-tooltip-title="Archive project" data-ds-tooltip="Hides PRJ-1024 from the list. Files and comments are kept for 12 months." data-ds-tooltip-kbd="Shift A">Archive</button>
  <button type="button" class="btn" data-ds-tooltip-title="Approval needed" data-ds-tooltip="Daniel Okafor has to approve invoices above 5,000.00.">Why is this locked?</button>
</div>
```

Disabled controls. A disabled button does not receive pointer or focus events, so wrap it in a focusable element that carries the tooltip (or use `aria-disabled="true"`, which stays focusable). Truncated text shows its full value with `data-ds-tooltip-overflow`.

```html preview title="Disabled and truncated"
<div class="ds-actions is-start">
  <span class="ds-tooltip-wrap" tabindex="0" data-ds-tooltip="You need the Admin role to delete invoices">
    <button type="button" class="btn" disabled>Delete invoice</button>
  </span>
  <button type="button" class="btn" aria-disabled="true" data-ds-tooltip="Add a client first">Create invoice</button>
  <span data-ds-tooltip-overflow style="display:inline-block;max-width:11rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">Quarterly revenue and expense reconciliation for the Surabaya office</span>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Hidden | Default | Not rendered |
| Delayed | Pointer over the trigger | Nothing for 500ms, then the tooltip appears |
| Warm | Another tooltip was open within 400ms | Appears at once, with no motion |
| Entering | Show | Opacity 0 to 1 and a 5px move from the trigger over 160ms |
| Focus | Keyboard focus (`:focus-visible`) | Appears at once |
| Hoverable | Pointer moves onto the tooltip | Stays open (WCAG 1.4.13) |
| Dismissed | Escape, blur, scroll, resize, click on the trigger, pointer leaves | Closes in 140ms |
| Rich | `data-ds-tooltip-title` | Light surface with a hairline border, title and text |
| Disabled trigger | Wrapped in `.ds-tooltip-wrap`, or `aria-disabled="true"` | The wrapper or the control is focusable and shows the tooltip |
| Touch | Touch pointer | No hover tooltip; keyboard focus still works |

## Anatomy

- Trigger: any element with `data-ds-tooltip`, `data-ds-tooltip-title` or `data-ds-tooltip-overflow`.
- `.ds-tooltip`: the layer, created by the script with `role="tooltip"` and `popover="manual"` so it sits above dialogs. `is-rich` for the rich variant.
- `.ds-tooltip__title`, `.ds-tooltip__text`, `.ds-tooltip__kbd`: the parts.
- `.ds-tooltip-wrap`: the focusable wrapper for a disabled control.

## Usage

- Keep plain tooltips under 80 characters, on one or two lines. A rich tooltip has a title of up to 30 characters and a text of up to 120.
- Use a tooltip to name an icon-only button. The script copies the text into `aria-label` when the control has no name, so the name exists for assistive technology.
- Show a shortcut with `data-ds-tooltip-kbd`, not in the sentence.
- Do not put links, buttons or form fields in a tooltip. Use a [popover](./popover.md).
- Do not rely on a tooltip on touch devices. Put the information on screen or behind a visible control.
- Do not put a tooltip on text that is already fully visible.
- Explain why a control is unavailable, in the tooltip of its wrapper or `aria-disabled` control: "Add a client first".

## Accessibility

- Pattern: WAI-ARIA tooltip. The tooltip has `role="tooltip"` and the trigger points to it with `aria-describedby`. A control with no accessible name receives `aria-label` from the tooltip text instead (and no `aria-describedby`, to avoid reading it twice).
- A tooltip is shown on keyboard focus without a delay. Elements that are not natively focusable get `tabindex="0"` so keyboard users can reach the tooltip.
- WCAG 1.4.13: dismissible (Escape closes it without moving focus), hoverable (the pointer can enter it) and persistent (it stays until the pointer or focus leaves, or Escape).
- The plain tooltip is an inverted surface (neutral background, neutral content text) so it is at least 7:1 in both themes. The rich tooltip uses the normal surface and text.
- Reduced motion: the tooltip only fades over 120ms.

| Key | Action |
| --- | --- |
| Tab, Shift+Tab | Focus shows the tooltip of the focused element; leaving hides it |
| Escape | Closes the open tooltip and does not close a dialog behind it |

## Razor

```cshtml
<button type="button" class="btn btn-square" ds-tooltip="Delete invoice" ds-tooltip-kbd="Del" ds-tooltip-placement="bottom">
    <ds-icon name="trash" />
</button>

<ds-tooltip text="You need the Admin role">
    <button type="button" class="btn" disabled>Delete invoice</button>
</ds-tooltip>
```

| Attribute | Effect |
| --- | --- |
| `ds-tooltip` | The text; any element |
| `ds-tooltip-title` | Makes it rich |
| `ds-tooltip-placement` | `top`, `bottom`, `left`, `right`, with `-start` or `-end` |
| `ds-tooltip-kbd` | A shortcut shown after the text |
| `ds-tooltip-delay` | Hover delay in ms |

The element `<ds-tooltip text="…">` renders a focusable `span.ds-tooltip-wrap` for disabled controls.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-tooltip="text"` | Plain tooltip |
| `data-ds-tooltip-title="Title"` | Rich tooltip (with `data-ds-tooltip` as the text) |
| `data-ds-tooltip-kbd="Ctrl K"` | Shortcut |
| `data-ds-tooltip-placement` | `top` (default), `bottom`, `left`, `right`, optional `-start` or `-end` |
| `data-ds-tooltip-delay="0"` | Hover delay in ms (default 500) |
| `data-ds-tooltip-overflow` | Shows the element's text only when it is truncated |

`DS.tooltip.show(element)` and `DS.tooltip.hide()` for code. Content is read when the tooltip opens, so changing the attribute updates it.

## Tokens

`--color-neutral`, `--color-neutral-content`, `--color-base-100`, `--color-base-300`, `--ds-radius-lg`, `--ds-shadow-menu`, `--ds-z-tooltip`, `--ds-enter-offset`, `--ds-duration-quick`, `--ds-duration-exit`, `--ds-ease-emphasized`, `--ds-ease-exit`, `--ds-focus`.

## Native and daisyUI

The tooltip is a native `popover="manual"` element placed with `placeFloating`, not daisyUI's CSS-only `.tooltip`, which cannot flip, cannot be dismissed with Escape and does not appear on keyboard focus. Browsers without the Popover API get a fixed element with the same classes.
