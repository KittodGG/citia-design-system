---
title: Resizable
group: components
category: layout
order: 7
summary: Panels separated by a draggable, keyboard-operable handle with minimum and maximum sizes, collapse on double click and optional saved sizes.
---

A resizable group lets people decide how much room each panel gets: a file list beside a preview, a code editor above a console. Use it when the right split depends on the task. When the split is fixed use the [Split layout](./stack-grid.md); for a panel that opens over the page use a [Sheet](./sheet.md).

## Examples

### Horizontal split

Drag the handle, focus it and press the arrow keys, or double-click to collapse the left panel.

```html preview title="Two panels"
<div class="ds-resizable" data-ds-resizable style="--ds-resizable-height: 14rem">
  <div class="ds-resizable__panel" style="--ds-panel-size: 30" data-min="20" data-max="60" data-collapsible>
    <ul class="ds-stack is-gap-xs" style="padding: 0.75rem; list-style: none; margin: 0"><li>Invoices</li><li>Projects</li><li>Members</li></ul>
  </div>
  <div class="ds-resizable__handle" role="separator" tabindex="0" aria-label="Resize list"></div>
  <div class="ds-resizable__panel" style="--ds-panel-size: 70"><div style="padding: 0.75rem">INV-2026-0418, issued 2 Nov 2026 to Northwind, 1,240.00 due 30 Nov 2026.</div></div>
</div>
```

### Three panels, nested vertical

```html preview title="Editor layout"
<div class="ds-resizable" data-ds-resizable data-ds-resizable-id="docs-editor" style="--ds-resizable-height: 18rem">
  <div class="ds-resizable__panel" style="--ds-panel-size: 20" data-min="15" data-collapsible><div style="padding: 0.75rem">Files</div></div>
  <div class="ds-resizable__handle" role="separator" tabindex="0" aria-label="Resize files"></div>
  <div class="ds-resizable__panel" style="--ds-panel-size: 80">
    <div class="ds-resizable is-vertical is-bare" data-ds-resizable style="--ds-resizable-height: 100%">
      <div class="ds-resizable__panel" style="--ds-panel-size: 65" data-min="30"><div style="padding: 0.75rem">Editor</div></div>
      <div class="ds-resizable__handle" role="separator" tabindex="0" aria-label="Resize console"></div>
      <div class="ds-resizable__panel" style="--ds-panel-size: 35" data-min="15" data-collapsible><div style="padding: 0.75rem">Console</div></div>
    </div>
  </div>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | none | 1px hairline `--color-base-300` |
| Hover | Pointer over the handle (hover devices) | Line turns primary-tinted; a 4×32px grip appears |
| Focus-visible | Keyboard focus | Line and grip in `--ds-focus` |
| Dragging | `data-dragging` on the handle and the group | Primary line and grip; text selection off; panels follow the pointer without easing |
| At minimum or maximum | Size reaches `data-min` or `data-max` | Stops; `aria-valuenow` equals `aria-valuemin` or `aria-valuemax` |
| Collapsed | Double click or Enter on a collapsible panel | Panel eases to 0 in 500ms (spring, no overshoot); `aria-expanded="false"` on the handle |
| Restored | Double click or Enter again | Returns to its previous size |
| Disabled | `aria-disabled="true"` | Opacity 0.55, `not-allowed`, no pointer or key response |
| Vertical | `.is-vertical` | Panels stacked; handle is horizontal with `row-resize` |
| Touch | `(pointer: coarse)` | Hit area 44px wide |

## Anatomy

- `.ds-resizable[data-ds-resizable]`: the group. `.is-vertical`, `.is-bare` (no frame). Height from `--ds-resizable-height`.
- `.ds-resizable__panel`: a panel. Size in percent as `--ds-panel-size`; `data-min`, `data-max` (percent, default 10 and 100), `data-collapsible`.
- `.ds-resizable__handle`: `role="separator"` between two panels, focusable.

## Usage

- Set sensible limits: `data-min` of 15 to 25 stops panels from becoming unusable; allow collapse for secondary panels only.
- Keep 2 or 3 panels per axis. For more, use nested groups.
- Name each handle by what it resizes ("Resize files").
- Store sizes with `data-ds-resizable-id` when the layout is a workspace the person returns to.
- Do not use a resizable group on a phone-width layout; stack the panels or use a [Sheet](./sheet.md).

## Accessibility

- The handle is a window splitter: `role="separator"`, `tabindex="0"`, `aria-orientation` (vertical for side-by-side panels), `aria-valuenow`, `aria-valuemin`, `aria-valuemax` (percent of the leading panel) and `aria-controls` pointing at that panel. `aria-valuetext` reads "30%" or "collapsed".
- Collapsible handles expose `aria-expanded`.
- Pointer capture keeps the drag working when the pointer leaves the handle; Escape is not needed because the drag ends on release.
- Reduced motion: collapse and restore jump to the new size without easing.
- Forced colours: the handle uses `CanvasText` and `Highlight`.

| Key | Action |
| --- | --- |
| Tab | Focus the handle |
| Right, Left (side by side); Down, Up (stacked) | Grow, shrink the leading panel by 5% (10% with Shift); mirrored in right-to-left |
| Home | Smallest size of the leading panel |
| End | Largest size |
| Enter | Collapse or restore the collapsible panel |

## Razor

```cshtml
<ds-resizable persist="workspace" height="20rem">
    <ds-resizable-panel size="30" min="20" max="60" collapsible>...</ds-resizable-panel>
    <ds-resizable-handle label="Resize list" />
    <ds-resizable-panel size="70">...</ds-resizable-panel>
</ds-resizable>
```

Attributes: `ds-resizable` takes `orientation` (`horizontal`, `vertical`), `persist`, `height`, `step`, `bare`; `ds-resizable-panel` takes `size`, `min`, `max`, `collapsible`; `ds-resizable-handle` takes `label`.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-resizable` | Turns the group into a resizable group |
| `data-ds-resizable-id="name"` | Saves sizes in `localStorage` (`<prefix>-resizable-name`) |
| `data-step="5"` | Keyboard step in percent |
| `data-min`, `data-max`, `data-collapsible` | On panels: limits and collapse |

API: `DS.resizable.setSizes(element, [30, 70])`. Events: `ds:resizable:resize` (`detail.sizes`) and `ds:resizable:collapse` (`detail.index`, `detail.collapsed`). Strings: `resizable.handle`, `resizable.size`, `resizable.collapsed`.

## Tokens

`--color-base-300`, `--color-primary`, `--ds-focus`, `--ds-radius-box`, `--ds-duration-spring`, `--ds-ease-spring`, `--ds-duration-fast`, `--ds-opacity-disabled`.

## Native and daisyUI

Built on flexbox (`flex-grow` carries the percentage), pointer events with pointer capture, and the ARIA separator role. daisyUI has no equivalent.
