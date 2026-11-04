---
title: Context menu
group: components
category: overlays
order: 7
summary: The actions of an item at the pointer, opened by right click, long-press on touch, Shift+F10 or the menu key, with the same anatomy as a dropdown menu.
---

A context menu shows the actions that apply to what is under the pointer: a file, a row, a card on a board. It opens at
the pointer on right click, after a 500ms long-press on touch screens, and at the focused element with Shift+F10 or the
ContextMenu key. Its items, keyboard and states are those of the [Dropdown menu](./dropdown-menu.md). A context menu is
a shortcut, never the only way: every action in it must also be reachable from a visible button or menu.

## Examples

### File list

Right click a file (or long-press it on a phone, or focus it and press Shift+F10). The pressed row travels with the
selection event as `detail.context`.

```html preview title="Files"
<ul data-ds-context-menu="ctx-file" aria-label="Files in PRJ-1024" style="display: grid; gap: 0.25rem; margin: 0; padding: 0; list-style: none">
  <li><button type="button" class="btn btn-ghost w-full" style="justify-content: flex-start" data-ds-context-item data-file="site-plan.pdf"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-pdf"></use></svg>site-plan.pdf<span class="ds-menu__meta" style="margin-inline-start: auto">2.4 MB</span></button></li>
  <li><button type="button" class="btn btn-ghost w-full" style="justify-content: flex-start" data-ds-context-item data-file="stock-count-wave-1.xlsx"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-xls"></use></svg>stock-count-wave-1.xlsx<span class="ds-menu__meta" style="margin-inline-start: auto">380 KB</span></button></li>
  <li><button type="button" class="btn btn-ghost w-full" style="justify-content: flex-start" data-ds-context-item data-file="handover-notes.docx"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-text"></use></svg>handover-notes.docx<span class="ds-menu__meta" style="margin-inline-start: auto">54 KB</span></button></li>
</ul>

<div id="ctx-file" popover class="ds-menu" role="menu" aria-label="File actions">
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg><span class="ds-menu__text">Open</span><kbd class="ds-menu__shortcut">Enter</kbd></button>
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-download"></use></svg><span class="ds-menu__text">Download</span></button>
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg><span class="ds-menu__text">Rename</span><kbd class="ds-menu__shortcut">F2</kbd></button>
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-link"></use></svg><span class="ds-menu__text">Copy link</span><kbd class="ds-menu__shortcut">Ctrl L</kbd></button>
  <div role="separator" class="ds-menu__separator"></div>
  <button type="button" role="menuitem" class="ds-menu__item is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Move to bin</span><kbd class="ds-menu__shortcut">Del</kbd></button>
</div>
```

### Canvas area

A region without its own focusable children gets `tabindex="0"` from the script, so keyboard users can reach the menu.

```html preview title="Board area"
<div class="ds-context-area" data-ds-context-menu="ctx-board" aria-label="Board: Brand refresh">
  Right click or long-press anywhere in this area
</div>

<div id="ctx-board" popover class="ds-menu" role="menu" aria-label="Board">
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg><span class="ds-menu__text">New card</span><kbd class="ds-menu__shortcut">N</kbd></button>
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-columns"></use></svg><span class="ds-menu__text">New column</span></button>
  <div role="separator" class="ds-menu__separator"></div>
  <button type="button" role="menuitemcheckbox" aria-checked="true" class="ds-menu__item"><span class="ds-menu__indicator" aria-hidden="true"><svg><use href="#ds-icon-check"></use></svg></span><span class="ds-menu__text">Show due dates</span></button>
  <button type="button" role="menuitemcheckbox" aria-checked="false" class="ds-menu__item"><span class="ds-menu__indicator" aria-hidden="true"><svg><use href="#ds-icon-check"></use></svg></span><span class="ds-menu__text">Show avatars</span></button>
  <div role="separator" class="ds-menu__separator"></div>
  <button type="button" role="menuitem" class="ds-menu__item" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-clipboard"></use></svg><span class="ds-menu__text">Paste<span class="ds-menu__description">Nothing copied yet</span></span><kbd class="ds-menu__shortcut">Ctrl V</kbd></button>
</div>
```

## States

The menu states are those of the [Dropdown menu](./dropdown-menu.md#states). The region adds two.

```html preview title="Region at rest and pressed"
<div style="display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr))">
  <div class="ds-context-area" data-ds-context-menu="none" style="min-height: 6rem">Rest</div>
  <div class="ds-context-area" data-ds-context-menu="none" data-ds-pressing style="min-height: 6rem">Long-press in progress</div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Region rest | default | No visual change; `.ds-context-area` shows a dashed hint box for empty canvases |
| Long-press | touch held for 150ms (`[data-ds-pressing]`) | Region tints with the hover state layer; the menu opens at 500ms with an 8ms vibration where supported |
| Long-press cancelled | finger moves more than 10px, lifts, or the system scrolls | Tint fades out, nothing opens |
| Open at pointer | right click | Menu top-left corner at the pointer (flips to stay on screen), grows from that corner, 160ms |
| Open from keyboard | Shift+F10, ContextMenu key | Below the focused element, first item highlighted |
| Native menu | Shift + right click when `data-ds-context-native="shift"` | Browser's own menu |
| Closed | Escape, outside press, selection, Tab | Focus returns to the element that had it |

## Anatomy

- Region: any element with `data-ds-context-menu="menu-id"`; optional `.ds-context-area` for empty canvases.
- `[data-ds-context-item]` inside the region: the item that was pressed, sent as `detail.context`.
- The menu: a `[popover].ds-menu[role=menu]` with the [Dropdown menu](./dropdown-menu.md#anatomy) anatomy.

## Usage

- Offer the same actions in a visible place (a row's "More" button, a toolbar). People who do not know about right click or long-press must not lose anything.
- Order items by frequency; keep destructive items last.
- Keep the menu under 10 items; no submenus deeper than one level.
- Do not replace the browser menu on text people may want to copy, links, or inputs. Use `data-ds-context-native="shift"` when the browser menu is still useful.

## Accessibility

- The region must be focusable (a focusable child, or `tabindex="0"` added by the script) and should have an accessible name.
- Shift+F10 and the ContextMenu key open the menu at the focused element with the first item highlighted; Escape returns focus there.
- Inside the menu, keyboard behaviour is the same as the dropdown menu.

| Key | Action |
| --- | --- |
| Shift+F10 / ContextMenu | Open the menu at the focused element |
| ArrowDown / ArrowUp, Home / End | Move the highlight |
| A–Z | Typeahead |
| Enter / Space | Activate |
| Escape | Close and return focus |

## Razor

```cshtml
<ul data-ds-context-menu="file-menu" aria-label="Files">
    @foreach (var file in Model.Files)
    {
        <li><a asp-page="/Files/Open" asp-route-id="@file.Id" data-ds-context-item data-value="@file.Id">@file.Name</a></li>
    }
</ul>

<ds-menu id="file-menu" label="File actions">
    <ds-menu-item icon="download" value="download">Download</ds-menu-item>
    <ds-menu-item icon="pencil" value="rename" shortcut="F2">Rename</ds-menu-item>
    <ds-menu-separator />
    <ds-menu-item icon="trash" value="delete" danger>Move to bin</ds-menu-item>
</ds-menu>
```

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-context-menu="id"` | Opens the menu with that id on right click, long-press, Shift+F10 or ContextMenu inside the element |
| `data-ds-context-item` | Marks the element sent as `detail.context` |
| `data-ds-context-native="shift"` | Shift + right click shows the browser menu |

```js
document.addEventListener("ds:menu:select", (event) => {
  const file = event.detail.context?.dataset.file;
  if (event.target.closest("#ctx-file") && file) console.log(event.detail.value, file);
});

DS.contextMenu.open(region, 320, 240); // at a point; omit x/y to open at the focused element
```

Events: `ds:context-menu:open` on the region (`detail.context`), then the menu events `ds:menu:open`, `ds:menu:select`,
`ds:menu:close`.

## Tokens

Those of the [Dropdown menu](./dropdown-menu.md#tokens), plus `--ds-opacity-state-hover` (long-press tint),
`--ds-duration-settle` (tint fade), `--ds-control-border` and `--ds-radius-xl` (`.ds-context-area`).

## Native and daisyUI

- Uses the native `contextmenu` event, which browsers fire for right click, Shift+F10 and the ContextMenu key; long-press is detected with pointer events because iOS does not fire `contextmenu`.
- The menu is an HTML popover; without JavaScript the browser menu appears as usual.
- daisyUI has no context menu.
