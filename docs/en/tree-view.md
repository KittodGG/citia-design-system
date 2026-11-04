---
title: Tree view
group: components
category: data-display
order: 14
summary: An ARIA tree for nested data such as files, categories and permissions, with animated expand and collapse, selection, tri-state checkboxes and lazy loading.
source: WAI-ARIA Authoring Practices tree pattern, shadcn/ui tree recipes, Material 3 navigation lists
---

A tree view shows hierarchy: folders and files, categories and sub-categories, roles and permissions. Users open and close branches, move with the arrow keys, and optionally select one or several items or tick boxes. Use it when depth is real and people browse it. Use [navigation](./sidebar.md) for site structure, an [accordion](./accordion.md) for a few sections of content, a [list](./list.md) for flat data and expandable [table rows](./table.md) when each node has several columns.

## Examples

```html preview title="File tree, single selection"
<ul class="ds-tree" role="tree" aria-label="Project PRJ-1024 files" data-ds-tree>
  <li class="ds-tree__item" role="treeitem" aria-expanded="true" data-value="design">
    <div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="folder" data-ds-icon-open="folder-open"></span><span class="ds-tree__label">Design</span><span class="ds-tree__meta">2</span></div>
    <ul class="ds-tree__group" role="group">
      <li class="ds-tree__item" role="treeitem" aria-selected="true" data-value="design/brand-guide.pdf"><div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="file-pdf"></span><span class="ds-tree__label">Brand guide.pdf</span></div></li>
      <li class="ds-tree__item" role="treeitem" data-value="design/wireframes.fig"><div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="file"></span><span class="ds-tree__label">Wireframes.fig</span></div></li>
    </ul>
  </li>
  <li class="ds-tree__item" role="treeitem" aria-expanded="false" data-value="finance">
    <div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="folder" data-ds-icon-open="folder-open"></span><span class="ds-tree__label">Finance</span><span class="ds-tree__meta">3</span></div>
    <ul class="ds-tree__group" role="group">
      <li class="ds-tree__item" role="treeitem" data-value="finance/budget-2027.xlsx"><div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="file-xls"></span><span class="ds-tree__label">Budget 2027.xlsx</span></div></li>
      <li class="ds-tree__item" role="treeitem" data-value="finance/inv-0418.pdf"><div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="file-pdf"></span><span class="ds-tree__label">INV-2026-0418.pdf</span></div></li>
      <li class="ds-tree__item" role="treeitem" aria-expanded="false" data-value="finance/archive">
        <div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="folder" data-ds-icon-open="folder-open"></span><span class="ds-tree__label">Archive 2025</span><span class="ds-tree__meta">1</span></div>
        <ul class="ds-tree__group" role="group">
          <li class="ds-tree__item" role="treeitem" data-value="finance/archive/q4.xlsx"><div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="file-xls"></span><span class="ds-tree__label">Q4 summary.xlsx</span></div></li>
        </ul>
      </li>
    </ul>
  </li>
  <li class="ds-tree__item" role="treeitem" data-value="notes"><div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="file-text"></span><span class="ds-tree__label">Meeting notes.txt</span></div></li>
  <li class="ds-tree__item" role="treeitem" aria-disabled="true" data-value="legal"><div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="lock"></span><span class="ds-tree__label">Legal (no access)</span></div></li>
</ul>
```

```html preview title="Checkboxes with tri-state parents"
<ul class="ds-tree" role="tree" aria-label="Role permissions" data-ds-tree data-ds-tree-checkable data-ds-name="permission">
  <li class="ds-tree__item" role="treeitem" aria-expanded="true" data-value="invoices">
    <div class="ds-tree__row"><span class="ds-tree__label">Invoices</span></div>
    <ul class="ds-tree__group" role="group">
      <li class="ds-tree__item" role="treeitem" aria-checked="true" data-value="invoices.view"><div class="ds-tree__row"><span class="ds-tree__label">View</span></div></li>
      <li class="ds-tree__item" role="treeitem" aria-checked="true" data-value="invoices.create"><div class="ds-tree__row"><span class="ds-tree__label">Create</span></div></li>
      <li class="ds-tree__item" role="treeitem" aria-checked="false" data-value="invoices.approve"><div class="ds-tree__row"><span class="ds-tree__label">Approve</span></div></li>
    </ul>
  </li>
  <li class="ds-tree__item" role="treeitem" aria-expanded="true" data-value="projects">
    <div class="ds-tree__row"><span class="ds-tree__label">Projects</span></div>
    <ul class="ds-tree__group" role="group">
      <li class="ds-tree__item" role="treeitem" aria-checked="false" data-value="projects.view"><div class="ds-tree__row"><span class="ds-tree__label">View</span></div></li>
      <li class="ds-tree__item" role="treeitem" aria-checked="false" data-value="projects.edit"><div class="ds-tree__row"><span class="ds-tree__label">Edit</span></div></li>
    </ul>
  </li>
</ul>
```

```html preview title="Multiple selection and lazy loading"
<div style="display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));max-width:44rem">
  <ul class="ds-tree is-dense" role="tree" aria-label="Customer regions" data-ds-tree data-ds-tree-select="multiple">
    <li class="ds-tree__item" role="treeitem" aria-expanded="true">
      <div class="ds-tree__row"><span class="ds-tree__label">Asia</span></div>
      <ul class="ds-tree__group" role="group">
        <li class="ds-tree__item" role="treeitem" aria-selected="true"><div class="ds-tree__row"><span class="ds-tree__label">Indonesia</span><span class="ds-tree__meta">128</span></div></li>
        <li class="ds-tree__item" role="treeitem" aria-selected="true"><div class="ds-tree__row"><span class="ds-tree__label">Japan</span><span class="ds-tree__meta">41</span></div></li>
        <li class="ds-tree__item" role="treeitem"><div class="ds-tree__row"><span class="ds-tree__label">Singapore</span><span class="ds-tree__meta">57</span></div></li>
      </ul>
    </li>
    <li class="ds-tree__item" role="treeitem" aria-expanded="false">
      <div class="ds-tree__row"><span class="ds-tree__label">Europe</span></div>
      <ul class="ds-tree__group" role="group">
        <li class="ds-tree__item" role="treeitem"><div class="ds-tree__row"><span class="ds-tree__label">Norway</span><span class="ds-tree__meta">19</span></div></li>
        <li class="ds-tree__item" role="treeitem"><div class="ds-tree__row"><span class="ds-tree__label">Spain</span><span class="ds-tree__meta">33</span></div></li>
      </ul>
    </li>
  </ul>

  <ul class="ds-tree" role="tree" aria-label="Customers, loaded on demand" data-ds-tree>
    <li class="ds-tree__item" role="treeitem" aria-expanded="false" data-ds-tree-src="#demo-tree-latam" data-ds-tree-delay="900">
      <div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="folder" data-ds-icon-open="folder-open"></span><span class="ds-tree__label">Latin America</span></div>
    </li>
    <li class="ds-tree__item" role="treeitem" aria-expanded="false" data-ds-tree-src="#demo-tree-missing" data-ds-tree-delay="600">
      <div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="folder" data-ds-icon-open="folder-open"></span><span class="ds-tree__label">Africa (fails)</span></div>
    </li>
  </ul>
</div>
<template id="demo-tree-latam">
  <li role="treeitem"><div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="file"></span><span class="ds-tree__label">Marquez Logistics, Mexico</span></div></li>
  <li role="treeitem"><div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="file"></span><span class="ds-tree__label">Costa Verde SA, Chile</span></div></li>
</template>
```

Open "Latin America": the row shows a spinner for 900ms (the demo simulates latency with `data-ds-tree-delay`), then the children slide open. "Africa (fails)" points to a template that does not exist, so it shows the failed state and offers "Retry".

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Default | 36px rows, 20px indent per level, chevron, icon, label, optional meta |
| Hover | Pointer over a row | State layer `--ds-opacity-state-hover` on the row |
| Pressed | `:active` | State layer `--ds-opacity-state-pressed` |
| Focus-visible | The treeitem has focus | 2px `--ds-focus` ring inside the row (not around the children) |
| Expanded, collapsed | `aria-expanded="true/false"` | Chevron turns 90° (150ms); the group opens in 240ms (height and 160ms fade) and closes in 140ms |
| Selected | `aria-selected="true"` | Primary tint, 3px primary edge, accent label, heavier weight |
| Checked, unchecked, mixed | `aria-checked="true/false/mixed"` | Checkbox filled with a check or a dash; parents derive from children |
| Disabled | `aria-disabled="true"` | `--ds-opacity-disabled`, `cursor: not-allowed`, skipped by arrow keys |
| Loading | `aria-busy="true"` | Spinner replaces the chevron; the live region says "Loading Latin America" |
| Load failed | `data-state="error"` | Error-coloured "Retry" in the meta slot; the branch stays closed |
| Empty branch | Loaded with no children | Quiet note "Name is empty" |
| Long label | Wider than the row | Ellipsis with the full text available through the label (set `title`) |

## Anatomy

- `ul.ds-tree[role="tree"][data-ds-tree]` with `is-dense`; nested `ul.ds-tree__group[role="group"]`.
- `li.ds-tree__item[role="treeitem"]` (focus lives here) with `aria-expanded` on branches, `aria-selected` or `aria-checked`, `aria-disabled`, `data-value`.
- `.ds-tree__row` (hit area), `.ds-tree__toggle` (chevron, added by script), `.ds-tree__check` (added by script when checkable), `.ds-tree__icon`, `.ds-tree__label`, `.ds-tree__meta`, `.ds-tree__note`.
- Levels come from the nesting, up to 8 deep.

## Usage

- Keep labels short and unique within a branch. Put counts or sizes in `.ds-tree__meta`.
- Use `data-ds-tree-select="single"` (default) to pick one item, `multiple` to pick several, and `data-ds-tree-checkable` for settings such as permissions. Do not combine selection and checkboxes in one tree.
- Load big branches lazily (`data-ds-tree-src`) and return at most about 200 children; offer search above the tree beyond that.
- Open the branch that contains the current item and keep the rest closed.
- Do not nest more than 5 levels; 8 is the hard limit of the indent styles.
- Do not use a tree for page navigation. A link inside a row works (Enter follows it), but site navigation belongs in the [sidebar](./sidebar.md).

## Accessibility

- Follows the WAI-ARIA tree pattern: `role="tree"`, `treeitem`, `group`, `aria-level`, `aria-setsize`, `aria-posinset` (set by the script), one tab stop (roving `tabindex`), `aria-multiselectable` for several.
- Give the tree an `aria-label`. Checkboxes use `aria-checked` on the treeitem (`mixed` for partly checked parents); the drawn box is `aria-hidden`.
- Expansion, loading, load failures and the number of checked items are announced through a polite live region.
- Selected rows have an edge and a heavier label, and checked boxes carry a glyph, so state is never colour alone. Forced colours use `Highlight`.
- Rows are 44px high with a coarse pointer.
- Reduced motion removes the height animation; the fade stays at 140ms or less.

| Key | Action |
| --- | --- |
| Arrow Down, Arrow Up | Moves to the next and previous visible item |
| Arrow Right | Closed branch: opens it. Open branch: moves to its first child |
| Arrow Left | Open branch: closes it. Otherwise moves to the parent |
| Home, End | First and last visible item |
| `*` | Opens every closed sibling at the current level |
| Enter | Follows a link in the row, otherwise selects (or toggles the check; in a tree without selection, toggles the branch); retries a failed load |
| Space | Selects, or toggles the selection in a multiple tree, or toggles the check |
| Ctrl+A or Cmd+A | Multiple tree: selects every visible item |
| Letters | Jumps to the next visible item whose label starts with what you type |
| Click, double click | Click selects or toggles; double click toggles a branch; the chevron always toggles |

## Razor

There is no tag helper; render the nodes recursively with a partial or a local function.

```cshtml
@functions {
  IHtmlContent Node(FolderNode node) => ... // renders li.ds-tree__item and, for folders, the nested ul
}
<ul class="ds-tree" role="tree" aria-label="@Model.Title" data-ds-tree data-ds-name="folder">
  @foreach (var node in Model.Roots) { @Node(node) }
</ul>
```

For lazy branches render `data-ds-tree-src="@Url.Page("Children", new { id = node.Id })"`; the handler returns only the `<li role="treeitem">` items of that branch, as HTML.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-tree` | Wires the tree (builds toggles, checkboxes, icons and the ARIA positions) |
| `data-ds-tree-select="single/multiple/none"` | Selection mode (default single) |
| `data-ds-tree-checkable` | Checkboxes with tri-state propagation |
| `data-ds-name="field"` | Hidden inputs hold the selected or checked `data-value` values for a form |
| `data-ds-tree-src="/url"` or `"#template-id"` | Lazy children, fetched as HTML or cloned from a `template` |
| `data-ds-tree-delay="ms"` | Adds latency to the load, for demos |
| `data-ds-icon`, `data-ds-icon-open` | Icon names; the open one shows while the branch is expanded |

Events bubble from the tree: `ds:tree:toggle` (`{ item, expanded }`), `ds:tree:select` (`{ item, items, values }`), `ds:tree:check` (`{ item, checked, values }`), `ds:tree:activate`, `ds:tree:load` (cancelable; call `event.detail.load(nodes)` or `.fail()` to load the children yourself), `ds:tree:loaded`, `ds:tree:error`.

API: `DS.tree.load(item, nodes)`, `DS.tree.fail(item)`, `DS.tree.setExpanded(item, true)`, `DS.tree.expandAll(tree)`, `DS.tree.collapseAll(tree)`.

## Tokens

`--ds-tree-indent`, `--ds-tree-row`, `--ds-opacity-state-hover|pressed|selected|disabled`, `--ds-duration-layout`, `--ds-duration-quick`, `--ds-duration-exit`, `--ds-ease-emphasized`, `--ds-control-border`, `--color-primary`, `--ds-border-accent`, `--ds-focus`.

## Native and daisyUI

Builds on `ul` and `li` with ARIA roles; there is no native tree element. daisyUI `menu` with nested `details` is a navigation menu, not a tree, and does not give the roving focus, selection or tri-state behaviour. The DS tree does not use it.
