---
title: Command
group: components
category: overlays
order: 9
summary: A search field over a grouped list of pages and actions, as a palette opened with a shortcut or inline, with empty and loading states.
---

A command palette lets people jump to any page or run any action by typing a few letters: "inv" finds Invoices, "new
cl" finds New client. It opens with a shortcut (Ctrl+K on Windows and Linux, Cmd+K on macOS) or a button, filters as the
user types, and runs the highlighted item with Enter. The same component works inline, for example as the body of a
"Move to project" dialog. Use a [Combobox](./combobox.md) to pick a value for a form field, a
[Search input](./search-input.md) to filter a list on the page, and a [Dropdown menu](./dropdown-menu.md) for a short
list of actions on one object.

## Examples

### Palette

On this site Ctrl+K already opens the documentation search, so this example uses Ctrl+J (Cmd+J on macOS). In an app
use `data-ds-command-shortcut="mod+k"`.

```html preview title="Command palette"
<button type="button" class="btn" data-ds-command-open="cmd-palette">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg>
  Search or run a command
  <kbd class="ds-kbd" data-ds-command-hint="cmd-palette">Ctrl J</kbd>
</button>

<dialog id="cmd-palette" class="ds-command-dialog" data-ds-command data-ds-command-shortcut="mod+j" aria-label="Command palette">
  <div class="ds-command">
    <div class="ds-command__search">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg>
      <input type="search" class="ds-command__input" placeholder="Type a command or search" aria-label="Command palette" data-ds-initial-focus>
      <kbd class="ds-kbd">Esc</kbd>
    </div>
    <div class="ds-command__list" aria-label="Results">
      <div class="ds-command__group">
        <div class="ds-command__group-label">Pages</div>
        <a href="#" class="ds-command__item" data-keywords="home overview"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-dashboard"></use></svg><span class="ds-command__text"><span class="ds-command__label">Dashboard</span></span><kbd class="ds-command__shortcut">G D</kbd></a>
        <a href="#" class="ds-command__item" data-keywords="billing"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-receipt"></use></svg><span class="ds-command__text"><span class="ds-command__label">Invoices</span><span class="ds-command__description">1,284 invoices, 17 overdue</span></span><kbd class="ds-command__shortcut">G I</kbd></a>
        <a href="#" class="ds-command__item" data-keywords="customers companies"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-building"></use></svg><span class="ds-command__text"><span class="ds-command__label">Clients</span></span><kbd class="ds-command__shortcut">G C</kbd></a>
        <a href="#" class="ds-command__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-briefcase"></use></svg><span class="ds-command__text"><span class="ds-command__label">Projects</span></span><kbd class="ds-command__shortcut">G P</kbd></a>
      </div>
      <div class="ds-command__group">
        <div class="ds-command__group-label">Actions</div>
        <div class="ds-command__item" data-value="new-invoice" data-keywords="create bill"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-plus"></use></svg><span class="ds-command__text"><span class="ds-command__label">New invoice</span></span><kbd class="ds-command__shortcut">N</kbd></div>
        <div class="ds-command__item" data-value="new-client" data-keywords="create customer"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-user-plus"></use></svg><span class="ds-command__text"><span class="ds-command__label">New client</span></span></div>
        <div class="ds-command__item" data-value="export" data-keywords="excel download"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-download"></use></svg><span class="ds-command__text"><span class="ds-command__label">Export invoices to Excel</span></span></div>
        <div class="ds-command__item" data-value="theme" data-keywords="dark light appearance"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-moon"></use></svg><span class="ds-command__text"><span class="ds-command__label">Switch theme</span></span></div>
      </div>
      <div class="ds-command__group">
        <div class="ds-command__group-label">People</div>
        <a href="#" class="ds-command__item" data-keywords="operations jakarta"><span class="ds-avatar is-sm" aria-hidden="true">AL</span><span class="ds-command__text"><span class="ds-command__label">Ayu Lestari</span><span class="ds-command__description">Operations lead</span></span></a>
        <a href="#" class="ds-command__item" data-keywords="finance lagos"><span class="ds-avatar is-sm" aria-hidden="true">DO</span><span class="ds-command__text"><span class="ds-command__label">Daniel Okafor</span><span class="ds-command__description">Finance</span></span></a>
        <a href="#" class="ds-command__item" data-keywords="design tokyo"><span class="ds-avatar is-sm" aria-hidden="true">MT</span><span class="ds-command__text"><span class="ds-command__label">Mei Tanaka</span><span class="ds-command__description">Design</span></span></a>
      </div>
    </div>
    <div class="ds-command__empty" hidden>
      <strong>No results for “<span data-ds-command-query></span>”</strong>
      <span data-ds-command-message>Check the spelling or search for a shorter word.</span>
    </div>
    <div class="ds-command__footer" aria-hidden="true">
      <span><kbd class="ds-kbd">↑</kbd><kbd class="ds-kbd">↓</kbd>to move</span>
      <span><kbd class="ds-kbd">Enter</kbd>to open</span>
      <span><kbd class="ds-kbd">Esc</kbd>to close</span>
    </div>
  </div>
</dialog>
```

### Inline

```html preview title="Move to project"
<div class="ds-command is-inline" style="max-width: 28rem">
  <div class="ds-command__search">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg>
    <input type="search" class="ds-command__input" placeholder="Find a project" aria-label="Find a project">
  </div>
  <div class="ds-command__list" aria-label="Projects">
    <div class="ds-command__group">
      <div class="ds-command__group-label">Recent</div>
      <div class="ds-command__item" data-value="PRJ-1024"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-briefcase"></use></svg><span class="ds-command__text"><span class="ds-command__label">Warehouse relocation</span></span><span class="ds-command__meta">PRJ-1024</span></div>
      <div class="ds-command__item" data-value="PRJ-1031"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-briefcase"></use></svg><span class="ds-command__text"><span class="ds-command__label">Brand refresh</span></span><span class="ds-command__meta">PRJ-1031</span></div>
    </div>
    <div class="ds-command__group">
      <div class="ds-command__group-label">All projects</div>
      <div class="ds-command__item" data-value="PRJ-1040"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-briefcase"></use></svg><span class="ds-command__text"><span class="ds-command__label">Annual audit 2026</span></span><span class="ds-command__meta">PRJ-1040</span></div>
      <div class="ds-command__item" data-value="PRJ-1052"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-briefcase"></use></svg><span class="ds-command__text"><span class="ds-command__label">Customer portal</span></span><span class="ds-command__meta">PRJ-1052</span></div>
      <div class="ds-command__item" data-value="PRJ-0998" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-archive"></use></svg><span class="ds-command__text"><span class="ds-command__label">Office move 2025</span><span class="ds-command__description">Archived, read only</span></span><span class="ds-command__meta">PRJ-0998</span></div>
    </div>
  </div>
  <div class="ds-command__empty" hidden><strong>No project matches “<span data-ds-command-query></span>”</strong><span data-ds-command-message>Archived projects are searched too.</span></div>
</div>
```

## States

```html preview title="Highlighted, empty, loading"
<div style="display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); align-items: start">
  <div class="ds-command" role="group" aria-label="Highlighted">
    <div class="ds-command__search"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg><input class="ds-command__input" value="inv" aria-label="Search"></div>
    <div class="ds-command__list">
      <div class="ds-command__item" aria-selected="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-receipt"></use></svg><span class="ds-command__text"><span class="ds-command__label"><mark>Inv</mark>oices</span></span></div>
      <div class="ds-command__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-plus"></use></svg><span class="ds-command__text"><span class="ds-command__label">New <mark>inv</mark>oice</span></span></div>
    </div>
  </div>
  <div class="ds-command" role="group" aria-label="Empty">
    <div class="ds-command__search"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg><input class="ds-command__input" value="payroll" aria-label="Search"></div>
    <div class="ds-command__empty"><strong>No results for “payroll”</strong><span>Check the spelling or search for a shorter word.</span></div>
  </div>
  <div class="ds-command" aria-busy="true" role="group" aria-label="Loading">
    <div class="ds-command__search"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg><input class="ds-command__input" value="okafor" aria-label="Search"></div>
    <div class="ds-command__loading"><span class="ds-spinner" aria-hidden="true"></span>Searching</div>
  </div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Closed | default | Palette hidden; the hint shows "Ctrl K" or "⌘K" for the platform |
| Opening | shortcut, `data-ds-command-open`, `DS.command.open()` | Scrim fades in; palette at 12% from the top, opacity + scale 0.98 → 1, 180ms; input focused and empty |
| Filtering | typing | Items not containing every typed word are hidden, empty groups hide, the first item is highlighted, the matched letters are bold |
| Highlighted | arrow keys, pointer move | Primary tint 12%, 2px primary bar on the inline start, icon in `--ds-primary-text` (`aria-selected="true"`) |
| Pressed | `:active` | Tint 18% |
| Disabled item | `aria-disabled="true"` | 55% opacity, skipped by the arrow keys, Enter does nothing |
| Empty | no item matches | `.ds-command__empty`: the query in bold and one hint line |
| Loading | remote search running for 300ms (`aria-busy="true"`) | Spinner and "Searching"; existing items dim to 60% |
| Error | remote search failed | Empty state with "Search is unavailable. Try again in a moment." |
| Closing | Escape, scrim press, item chosen | Back the same way, 140ms; focus returns to where it was |
| Reduced motion | media query | Opacity only |

## Anatomy

- `dialog.ds-command-dialog[data-ds-command]`: palette (omit for inline).
- `.ds-command` (`is-inline` outside a dialog).
- `.ds-command__search` with `.ds-command__input` (`role="combobox"`, added by script) and an optional `.ds-kbd` hint.
- `.ds-command__list` (`role="listbox"`) → `.ds-command__group` (`.ds-command__group-label`) → `.ds-command__item` (`role="option"`).
- Item parts: `.ds-icon` or `.ds-avatar`, `.ds-command__text` (`.ds-command__label`, `.ds-command__description`), `.ds-command__shortcut` or `.ds-command__meta`.
- `.ds-command__separator`, `.ds-command__empty` (`[data-ds-command-query]`, `[data-ds-command-message]`), `.ds-command__loading`, `.ds-command__footer`.

## Usage

- Use one palette per app, opened with Ctrl+K / Cmd+K and from a visible search button in the top bar.
- Group results by kind (Pages, Actions, People, Recent) and keep each group under 8 items before search narrows it.
- Write item labels as nouns for places ("Invoices") and verb phrases for actions ("New invoice").
- Add `data-keywords` with synonyms in the user's words ("bill" for invoice, "customer" for client) and both languages when the app is bilingual.
- Show only shortcuts that work.
- Keep remote search fast: start after 2 characters, show the spinner only after 300ms, cap results at 20.

## Accessibility

- The input is a `combobox` with `aria-expanded="true"`, `aria-controls` pointing at the `listbox`, and `aria-activedescendant` pointing at the highlighted `option`. Focus never leaves the input.
- Groups are `role="group"` named by their visible label.
- A polite status announces the number of results 400ms after typing stops ("8 results", "No results").
- The palette is a modal dialog with a name; Escape closes it and focus returns.

| Key | Action |
| --- | --- |
| Ctrl+K / Cmd+K (configurable) | Open or close the palette |
| ArrowDown / ArrowUp | Next / previous item (wraps, skips disabled items) |
| Enter | Run the highlighted item |
| Escape | Close the palette; inline: clear the query |
| Home / End | Move the caret in the input |

## Razor

```cshtml
<button type="button" class="btn" data-ds-command-open="palette">
    Search <kbd class="ds-kbd" data-ds-command-hint="palette">Ctrl K</kbd>
</button>

<ds-command id="palette" palette shortcut="mod+k" source="/api/search?q={query}" min-length="2">
    <ds-command-group label="Pages">
        <ds-command-item icon="dashboard" href="/" shortcut="G D">Dashboard</ds-command-item>
        <ds-command-item icon="receipt" href="/Invoices" keywords="billing bill tagihan">Invoices</ds-command-item>
    </ds-command-group>
    <ds-command-group label="Actions">
        <ds-command-item icon="file-plus" value="new-invoice" shortcut="N">New invoice</ds-command-item>
    </ds-command-group>
</ds-command>
```

`ds-command`: `id`, `palette`, `shortcut`, `placeholder`, `label`, `source`, `min-length`, `hints`.
`ds-command-item`: `icon`, `description`, `shortcut`, `href`, `value`, `keywords`, `disabled`, `danger`.

A `source` endpoint returns JSON, for example from a minimal API:

```csharp
app.MapGet("/api/search", (string q, AppDb db) => db.Clients
    .Where(c => c.Name.Contains(q))
    .Take(20)
    .Select(c => new { group = "Clients", label = c.Name, description = c.City, href = $"/Clients/{c.Id}", icon = "building" }));
```

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-command` on a `<dialog>` | Marks a palette |
| `data-ds-command-shortcut="mod+k"` | Shortcut: `mod` (Cmd on Apple, Ctrl elsewhere), `ctrl`, `meta`, `alt`, `shift` + a key, or a single key such as `/` (ignored while typing) |
| `data-ds-command-open="id"` | Opens the palette |
| `data-ds-command-hint="id"` | Fills the element with the platform's shortcut label |
| `data-keywords`, `data-value` on items | Extra match terms; value sent with `ds:command:select` |
| `data-ds-command-always` | Item never filtered out (for example "Search the help centre for …") |
| `data-ds-keep-open` | Palette stays open after the item runs |
| `data-ds-command-source`, `data-ds-command-min` | Remote results (JSON array), minimum query length |

```js
document.addEventListener("ds:command:select", (event) => {
  if (event.detail.value === "export") location.assign("/invoices/export?format=xlsx");
  if (event.detail.value === "new-invoice") DS.dialog.open("dlg-new-invoice");
});

DS.command.open("palette");
DS.command.setLoading("palette", true);
DS.command.setItems("palette", [{ group: "Clients", label: "Okafor Logistics", href: "/clients/88", icon: "building" }]);
DS.command.filter("palette", "okafor");
```

Events: `ds:command:select` (cancelable; `detail.value`, `detail.item`, `detail.query`), `ds:command:query`
(`detail.query`, on every input), plus `ds:dialog:open` / `ds:dialog:close` for the palette.

## Tokens

`--ds-popover`, `--color-base-300`, `--ds-shadow-overlay`, `--ds-radius-2xl`, `--ds-radius-md`, `--ds-scrim`,
`--color-primary`, `--ds-primary-text`, `--ds-opacity-state-selected`, `--ds-opacity-state-hover`, `--ds-opacity-disabled`,
`--ds-subtle`, `--ds-muted`, `--ds-focus`, `--ds-type-eyebrow-*`, `--ds-type-body-size`, `--ds-type-callout-size`,
`--ds-duration-base`, `--ds-duration-exit`, `--ds-ease-emphasized`, `--ds-ease-exit`.

## Native and daisyUI

- The palette is a native modal `<dialog>`; the list is plain HTML, so items that are links work without JavaScript (filtering and keyboard need it).
- `type="search"` gives the mobile keyboard a search key; the DS hides the native clear button to keep the row calm.
- daisyUI has no command component; the input inherits nothing from `.input` on purpose (the row is the field).
