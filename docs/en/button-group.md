---
title: Button group
group: components
category: actions
order: 2
summary: Attach related buttons into one joined control with shared edges, or space them evenly. Horizontal, vertical, full width, any variant.
---

A button group joins buttons that act on the same thing: previous, today, next; copy, print, download. The edges are shared and only the outer corners stay round. Use a [toggle group](./toggle-group.md) when the buttons keep a selected state, a [split button](./split-button.md) when one action has a menu of alternatives, and [pagination](./pagination.md) for page numbers.

## Examples

### Attached

```html preview title="Attached"
<div class="ds-btn-group" role="group" aria-label="Date range navigation">
  <button type="button" class="btn">Previous</button>
  <button type="button" class="btn">Today</button>
  <button type="button" class="btn">Next</button>
</div>
```

### With icons

```html preview title="Icons and labels"
<div class="ds-btn-group" role="group" aria-label="Invoice actions">
  <button type="button" class="btn">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg>
    Copy
  </button>
  <button type="button" class="btn">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-printer"></use></svg>
    Print
  </button>
  <button type="button" class="btn">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-download"></use></svg>
    Download
  </button>
</div>
```

### Variants

Any variant works. Filled groups get a divider tinted from the content colour; outline and ghost groups share a single edge.

```html preview title="Primary, outline, soft"
<div style="display:grid;gap:.75rem;justify-items:start">
  <div class="ds-btn-group" role="group" aria-label="Approval">
    <button type="button" class="btn btn-primary">Approve</button>
    <button type="button" class="btn btn-primary">Request changes</button>
  </div>
  <div class="ds-btn-group" role="group" aria-label="Report period">
    <button type="button" class="btn btn-outline">Week</button>
    <button type="button" class="btn btn-outline">Month</button>
    <button type="button" class="btn btn-outline">Quarter</button>
  </div>
  <div class="ds-btn-group" role="group" aria-label="Sort order">
    <button type="button" class="btn btn-soft">Oldest</button>
    <button type="button" class="btn btn-soft">Newest</button>
  </div>
</div>
```

### Sizes

Set the size on each button. All items in a group use the same size.

```html preview title="xs, sm, md, lg"
<div style="display:grid;gap:.75rem;justify-items:start">
  <div class="ds-btn-group" role="group" aria-label="Extra small"><button type="button" class="btn btn-xs">Left</button><button type="button" class="btn btn-xs">Center</button><button type="button" class="btn btn-xs">Right</button></div>
  <div class="ds-btn-group" role="group" aria-label="Small"><button type="button" class="btn btn-sm">Left</button><button type="button" class="btn btn-sm">Center</button><button type="button" class="btn btn-sm">Right</button></div>
  <div class="ds-btn-group" role="group" aria-label="Medium"><button type="button" class="btn">Left</button><button type="button" class="btn">Center</button><button type="button" class="btn">Right</button></div>
  <div class="ds-btn-group" role="group" aria-label="Large"><button type="button" class="btn btn-lg">Left</button><button type="button" class="btn btn-lg">Center</button><button type="button" class="btn btn-lg">Right</button></div>
</div>
```

### Vertical

```html preview title="Vertical"
<div class="ds-btn-group is-vertical" role="group" aria-label="Zoom">
  <button type="button" class="btn btn-square" aria-label="Zoom in"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-zoom-in"></use></svg></button>
  <button type="button" class="btn btn-square" aria-label="Zoom out"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-zoom-out"></use></svg></button>
  <button type="button" class="btn btn-square" aria-label="Fit to screen"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-maximize"></use></svg></button>
</div>
```

### Full width

`is-block` makes each button share the row equally.

```html preview title="Full width"
<div class="ds-btn-group is-block" role="group" aria-label="Payment method" style="max-width:26rem">
  <button type="button" class="btn">Card</button>
  <button type="button" class="btn">Transfer</button>
  <button type="button" class="btn">Cash</button>
</div>
```

### Spaced

`is-spaced` removes the joining and keeps an 8px gap. The group keeps its `role` and name.

```html preview title="Spaced"
<div class="ds-btn-group is-spaced" role="group" aria-label="Row actions">
  <button type="button" class="btn btn-sm">Approve</button>
  <button type="button" class="btn btn-sm">Reject</button>
  <button type="button" class="btn btn-sm btn-ghost">Notes</button>
</div>
```

## States

Each item keeps the full [button](./button.md) state set. In a group the item that is hovered, focused, selected or current is raised (`z-index`) so its whole edge draws over the neighbours.

```html preview title="Item states"
<div style="display:grid;gap:.75rem;justify-items:start">
  <div class="ds-btn-group" role="group" aria-label="Rest, hover, focus, pressed">
    <button type="button" class="btn">Rest</button>
    <button type="button" class="btn" data-ds-demo="hover">Hover</button>
    <button type="button" class="btn" data-ds-demo="focus">Focus-visible</button>
    <button type="button" class="btn" data-ds-demo="pressed">Pressed</button>
  </div>
  <div class="ds-btn-group" role="group" aria-label="Availability and activity">
    <button type="button" class="btn" aria-pressed="true">Selected</button>
    <button type="button" class="btn" disabled>Disabled</button>
    <button type="button" class="btn" aria-disabled="true" title="Available after approval">aria-disabled</button>
    <button type="button" class="btn" aria-busy="true">Loading</button>
    <button type="button" class="btn is-success">Success</button>
  </div>
  <div class="ds-btn-group" role="group" aria-label="Filled group">
    <button type="button" class="btn btn-primary">Approve</button>
    <button type="button" class="btn btn-primary" disabled>Request changes</button>
  </div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | None | Shared 1px edges, outer corners round, inner corners square |
| Hover | Pointer over an item | The item's state layer; the item is raised above its neighbours |
| Focus-visible | Keyboard focus | 2px `--ds-focus` ring drawn above all items |
| Pressed | Pointer down | The item scales to 0.97 and deepens; neighbours do not move |
| Selected | `aria-pressed="true"` on an item | Tonal fill and 2px edge on that item only |
| Disabled | `disabled` | 55% opacity on that item; the joint stays |
| aria-disabled | `aria-disabled="true"` | Same look, focusable, explains why |
| Loading | `aria-busy="true"` | Spinner inside that item; the group width does not change |
| Success | `.is-success` | Tonal green on that item for 1.6 to 2 seconds |
| RTL | `dir="rtl"` | Radii and joints mirror through logical properties |

## Anatomy

- `.ds-btn-group`: the container (`inline-flex`).
- Items: `.btn` (or `.ds-icon-button`, `.ds-toggle`, an anchor with `.btn`). Any variant, one size.
- Modifiers: `is-vertical`, `is-block`, `is-spaced`.

## Usage

- Group two to five related actions. Beyond five, use a menu or a [split button](./split-button.md).
- Give every group `role="group"` and an `aria-label` that names what the buttons act on.
- Keep one variant per group, except for a single primary item at the end.
- Write short labels, one or two words. In Indonesian the group grows by about 40%; it wraps to a second line only in `is-block`.
- Do not use a group for navigation between pages, or for a choice that must stay visible. Use [tabs](./tabs.md) or a [toggle group](./toggle-group.md).

## Accessibility

- `role="group"` with `aria-label` (or `aria-labelledby`) tells assistive technology the buttons belong together.
- Every button is its own tab stop. A group does not move focus with arrow keys; for arrow-key navigation use a [toggle group](./toggle-group.md).
- Icon-only items need `aria-label`; a vertical group of icon buttons names each one.
- Contrast and target size follow the [button](./button.md): 44px hit area on touch screens, each item at least 24px.

| Key | Action |
| --- | --- |
| Tab, Shift+Tab | Move between items |
| Enter, Space | Activate the focused item |

## Razor

The group is markup; its items can be `<ds-button>` tag helpers.

```cshtml
<div class="ds-btn-group" role="group" aria-label="Invoice actions">
    <ds-button icon="copy">Copy</ds-button>
    <ds-button icon="printer">Print</ds-button>
    <ds-button icon="download">Download</ds-button>
</div>
```

## Tokens

`--ds-border-hairline`, `--ds-control-border`, `--ds-radius-md|lg|box`, `--ds-space-2` (spaced gap), `--ds-focus`, plus the [button](./button.md) tokens.

## Native and daisyUI

`.ds-btn-group` is the DS counterpart of daisyUI `.join`. Both work: `.join` items keep their corners through `--join-*` variables that the button already reads. The DS group adds vertical, full width, spaced, divider tints for filled items and the raised hover and focus edge.
