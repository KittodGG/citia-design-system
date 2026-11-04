---
title: Menubar
group: components
category: overlays
order: 8
summary: A horizontal bar of menus, as in desktop applications, with one Tab stop, arrow-key movement between menus and menus that follow the pointer.
---

A menubar is a row of menu buttons (File, Edit, View) that behaves like the menu bar of a desktop application. It suits
editors and tools with many commands: a document editor, a report builder, an admin console. The bar is one Tab stop;
ArrowLeft and ArrowRight move between its menus, and once one menu is open, moving the pointer or the arrow keys to the
next opens that one instead. Each menu is a [Dropdown menu](./dropdown-menu.md). For moving between pages use a
[Navbar](./navbar.md) or a [Navigation menu](./navigation-menu.md); for a handful of actions use a
[Toolbar](./toolbar.md).

## Examples

```html preview title="Report editor"
<div role="menubar" class="ds-menubar" aria-label="Report editor">
  <button type="button" role="menuitem" class="ds-menubar__item" aria-haspopup="menu" popovertarget="mb-file">File</button>
  <button type="button" role="menuitem" class="ds-menubar__item" aria-haspopup="menu" popovertarget="mb-edit">Edit</button>
  <button type="button" role="menuitem" class="ds-menubar__item" aria-haspopup="menu" popovertarget="mb-view">View</button>
  <button type="button" role="menuitem" class="ds-menubar__item" aria-haspopup="menu" popovertarget="mb-help">Help</button>
</div>

<div id="mb-file" popover class="ds-menu" role="menu" aria-label="File">
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-plus"></use></svg><span class="ds-menu__text">New report</span><kbd class="ds-menu__shortcut">Ctrl N</kbd></button>
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder-open"></use></svg><span class="ds-menu__text">Open</span><kbd class="ds-menu__shortcut">Ctrl O</kbd></button>
  <div class="ds-menu__sub" role="none">
    <button type="button" role="menuitem" class="ds-menu__item" aria-haspopup="menu" aria-controls="mb-file-recent"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-history"></use></svg><span class="ds-menu__text">Open recent</span><svg class="ds-menu__chevron" aria-hidden="true"><use href="#ds-icon-chevron-right"></use></svg></button>
    <div id="mb-file-recent" popover class="ds-menu" role="menu" aria-label="Open recent">
      <button type="button" role="menuitem" class="ds-menu__item"><span class="ds-menu__text">Q1 revenue by client</span></button>
      <button type="button" role="menuitem" class="ds-menu__item"><span class="ds-menu__text">Overdue invoices, March 2026</span></button>
      <button type="button" role="menuitem" class="ds-menu__item"><span class="ds-menu__text">Hours per project</span></button>
    </div>
  </div>
  <div role="separator" class="ds-menu__separator"></div>
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-save"></use></svg><span class="ds-menu__text">Save</span><kbd class="ds-menu__shortcut">Ctrl S</kbd></button>
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-download"></use></svg><span class="ds-menu__text">Export as Excel</span></button>
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-printer"></use></svg><span class="ds-menu__text">Print</span><kbd class="ds-menu__shortcut">Ctrl P</kbd></button>
</div>

<div id="mb-edit" popover class="ds-menu" role="menu" aria-label="Edit">
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-undo"></use></svg><span class="ds-menu__text">Undo</span><kbd class="ds-menu__shortcut">Ctrl Z</kbd></button>
  <button type="button" role="menuitem" class="ds-menu__item" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-redo"></use></svg><span class="ds-menu__text">Redo</span><kbd class="ds-menu__shortcut">Ctrl Y</kbd></button>
  <div role="separator" class="ds-menu__separator"></div>
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><span class="ds-menu__text">Duplicate chart</span><kbd class="ds-menu__shortcut">Ctrl D</kbd></button>
  <button type="button" role="menuitem" class="ds-menu__item is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Delete chart</span><kbd class="ds-menu__shortcut">Del</kbd></button>
</div>

<div id="mb-view" popover class="ds-menu" role="menu" aria-label="View">
  <button type="button" role="menuitemcheckbox" aria-checked="true" class="ds-menu__item"><span class="ds-menu__indicator" aria-hidden="true"><svg><use href="#ds-icon-check"></use></svg></span><span class="ds-menu__text">Show grid</span></button>
  <button type="button" role="menuitemcheckbox" aria-checked="false" class="ds-menu__item"><span class="ds-menu__indicator" aria-hidden="true"><svg><use href="#ds-icon-check"></use></svg></span><span class="ds-menu__text">Show data labels</span></button>
  <div role="separator" class="ds-menu__separator"></div>
  <div role="group" aria-labelledby="mb-view-zoom">
    <div id="mb-view-zoom" class="ds-menu__label" role="presentation">Zoom</div>
    <button type="button" role="menuitemradio" aria-checked="false" class="ds-menu__item"><span class="ds-menu__indicator" aria-hidden="true"></span><span class="ds-menu__text">75%</span></button>
    <button type="button" role="menuitemradio" aria-checked="true" class="ds-menu__item"><span class="ds-menu__indicator" aria-hidden="true"></span><span class="ds-menu__text">100%</span></button>
    <button type="button" role="menuitemradio" aria-checked="false" class="ds-menu__item"><span class="ds-menu__indicator" aria-hidden="true"></span><span class="ds-menu__text">Fit to width</span></button>
  </div>
</div>

<div id="mb-help" popover class="ds-menu" role="menu" aria-label="Help">
  <a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-help-circle"></use></svg><span class="ds-menu__text">Report builder guide</span></a>
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-keyboard"></use></svg><span class="ds-menu__text">Keyboard shortcuts</span><kbd class="ds-menu__shortcut">?</kbd></button>
</div>
```

## States

```html preview title="Bar item states"
<div role="menubar" class="ds-menubar" aria-label="States">
  <span role="menuitem" class="ds-menubar__item" tabindex="-1">Rest</span>
  <span role="menuitem" class="ds-menubar__item" tabindex="-1" aria-expanded="true">Open</span>
  <span role="menuitem" class="ds-menubar__item" tabindex="-1" aria-disabled="true">Disabled</span>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | default | Transparent, medium weight, 36px high (44px on touch) |
| Hover | `:hover` | State layer 6% |
| Pressed / open | `:active`, `aria-expanded="true"` | State layer 10% while its menu is open |
| Focus | `:focus-visible` | 2px inset `--ds-focus` ring |
| Disabled | `aria-disabled="true"` | 55% opacity, skipped by the arrow keys |
| Switching | pointer or ArrowLeft/Right while a menu is open | The open menu closes (140ms) and the next one opens (160ms) |
| Menu states | — | See [Dropdown menu](./dropdown-menu.md#states) |

## Anatomy

- `[role=menubar].ds-menubar`: the bar, with an accessible name.
- `.ds-menubar__item[role=menuitem][aria-haspopup=menu]`: one per menu, pointing at its menu with `popovertarget`.
- `[popover].ds-menu[role=menu]`: each menu, with the dropdown menu anatomy.

## Usage

- Use a menubar only when there are more than about 15 commands to organise; otherwise a toolbar with a "More" menu is simpler.
- Keep the bar to 3–7 menus with one-word names, in the conventional order: File, Edit, View, Insert, Format, Tools, Help.
- Show keyboard shortcuts in the menus and make them work on the page.
- Do not put navigation links in a menubar; it is for commands.

## Accessibility

- The bar is one Tab stop (roving `tabindex`); the last focused item is remembered.
- Each item has `aria-haspopup="menu"` and `aria-expanded`; each menu has a name.

| Key | Action |
| --- | --- |
| Tab | Into and out of the bar |
| ArrowRight / ArrowLeft (bar) | Next / previous item (wraps); opens it if a menu was open |
| Home / End (bar) | First / last item |
| Enter / Space / ArrowDown (bar) | Open the menu, first item highlighted |
| ArrowUp (bar) | Open the menu, last item highlighted |
| ArrowRight / ArrowLeft (menu) | Open a submenu / close it; on a plain item, move to the next / previous menu |
| Escape (menu) | Close and return focus to the bar item |

## Razor

```cshtml
<div role="menubar" class="ds-menubar" aria-label="Report editor">
    <button type="button" role="menuitem" class="ds-menubar__item" aria-haspopup="menu" popovertarget="mb-file">File</button>
    <button type="button" role="menuitem" class="ds-menubar__item" aria-haspopup="menu" popovertarget="mb-edit">Edit</button>
</div>

<ds-menu id="mb-file" label="File">
    <ds-menu-item icon="file-plus" shortcut="Ctrl N">New report</ds-menu-item>
    <ds-menu-item icon="save" shortcut="Ctrl S">Save</ds-menu-item>
</ds-menu>
<ds-menu id="mb-edit" label="Edit">
    <ds-menu-item icon="undo" shortcut="Ctrl Z">Undo</ds-menu-item>
</ds-menu>
```

## JavaScript

No extra attributes: `role="menubar"` turns on roving focus and menu switching. Menus fire the dropdown menu events
(`ds:menu:open`, `ds:menu:select`, `ds:menu:close`); `DS.menu.open(id)` and `DS.menu.closeAll()` work here too.

## Tokens

`--color-base-100`, `--color-base-300`, `--ds-radius-lg`, `--ds-radius-md`, `--ds-opacity-state-hover`,
`--ds-opacity-state-pressed`, `--ds-opacity-disabled`, `--ds-focus`, `--ds-size-target`, `--ds-size-target-compact`,
`--ds-type-callout-size`, `--ds-weight-medium`, and the [Dropdown menu](./dropdown-menu.md#tokens) tokens.

## Native and daisyUI

- Built from buttons and HTML popovers; without JavaScript each bar item still opens its menu.
- daisyUI `.menu-horizontal` is a navigation list, not an ARIA menubar; use it for links, and `.ds-menubar` for commands.
