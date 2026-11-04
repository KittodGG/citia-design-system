---
title: Table
group: components
category: data-display
order: 11
summary: Hairline tables for records and numbers, in three kinds (list, master, wide) with caption, sticky head, totals, density, row states and cards on phones.
source: TPS app.css .pt-table L3526–3550, .master-table L1503–1600, .data-table-scroll L262–314
---

A table lines up records so people can scan and compare values in columns. Pick the kind by the data: `.ds-table` for a few short columns, `.ds-list-table` for master data with one record name that opens a detail, and `.ds-table-scroll` for wide transaction data with pinned columns. Add search, bulk actions and paging around any of them with the [data table](./data-table.md). Use a [list](./list.md) when rows have one value, and a [description list](./description-list.md) for one record.

## Examples

```html preview title="Table with caption, units and totals"
<div class="ds-card">
  <div class="ds-card-body is-flush">
    <div class="ds-table-wrap">
      <table class="ds-table">
        <caption>Invoices, November 2026<small>Amounts in US dollars, tax included</small></caption>
        <thead>
          <tr><th scope="col">Invoice</th><th scope="col">Customer</th><th scope="col">Issued</th><th scope="col" class="ds-num">Amount</th><th scope="col">Status</th></tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Invoice"><a class="ds-link-ref" href="#">INV-2026-0418</a></td>
            <td data-label="Customer"><div class="ds-cell-main"><span class="ds-avatar c0 is-round" aria-hidden="true">KS</span><div><div class="ds-cell-title">Kintara Studio</div><div class="ds-cell-sub">Ayu Lestari</div></div></div></td>
            <td data-label="Issued" class="ds-nowrap">3 Nov 2026</td>
            <td data-label="Amount" class="ds-num">4,280.00<span class="ds-unit">USD</span></td>
            <td data-label="Status"><span class="ds-pill is-success">Paid</span></td>
          </tr>
          <tr>
            <td data-label="Invoice"><a class="ds-link-ref" href="#">INV-2026-0419</a></td>
            <td data-label="Customer"><div class="ds-cell-main"><span class="ds-avatar c3 is-round" aria-hidden="true">ML</span><div><div class="ds-cell-title">Marquez Logistics</div><div class="ds-cell-sub">Sofia Marquez</div></div></div></td>
            <td data-label="Issued" class="ds-nowrap">5 Nov 2026</td>
            <td data-label="Amount" class="ds-num">1,150.50<span class="ds-unit">USD</span></td>
            <td data-label="Status"><span class="ds-pill is-warning">Due in 6 days</span></td>
          </tr>
          <tr>
            <td data-label="Invoice"><a class="ds-link-ref" href="#">INV-2026-0420</a></td>
            <td data-label="Customer"><div class="ds-cell-main"><span class="ds-avatar c5 is-round" aria-hidden="true">TH</span><div><div class="ds-cell-title">Tanaka Holdings</div><div class="ds-cell-sub">Mei Tanaka</div></div></div></td>
            <td data-label="Issued" class="ds-nowrap">9 Nov 2026</td>
            <td data-label="Amount" class="ds-num">12,904.25<span class="ds-unit">USD</span></td>
            <td data-label="Status"><span class="ds-pill is-error">Overdue 12 days</span></td>
          </tr>
        </tbody>
        <tfoot>
          <tr><th scope="row" colspan="3">Total, 3 invoices</th><td class="ds-num" data-label="Amount">18,334.75<span class="ds-unit">USD</span></td><td></td></tr>
        </tfoot>
      </table>
    </div>
  </div>
</div>
```

```html preview title="Compact and striped"
<div class="ds-card">
  <div class="ds-card-body is-flush">
    <table class="ds-table is-compact is-striped">
      <thead><tr><th scope="col">Task</th><th scope="col">Owner</th><th scope="col" class="ds-num">Hours</th><th scope="col" class="ds-num">Budget used</th></tr></thead>
      <tbody>
        <tr><td data-label="Task">Design review</td><td data-label="Owner">Mei Tanaka</td><td data-label="Hours" class="ds-num">6.5<span class="ds-unit">h</span></td><td data-label="Budget used" class="ds-num">42<span class="ds-unit">%</span></td></tr>
        <tr><td data-label="Task">API contract</td><td data-label="Owner">Daniel Okafor</td><td data-label="Hours" class="ds-num">14<span class="ds-unit">h</span></td><td data-label="Budget used" class="ds-num">78<span class="ds-unit">%</span></td></tr>
        <tr><td data-label="Task">Copy and translation</td><td data-label="Owner">Sofia Marquez</td><td data-label="Hours" class="ds-num">3.25<span class="ds-unit">h</span></td><td data-label="Budget used" class="ds-num">12<span class="ds-unit">%</span></td></tr>
        <tr><td data-label="Task">Accessibility audit</td><td data-label="Owner">Ayu Lestari</td><td data-label="Hours" class="ds-num">9<span class="ds-unit">h</span></td><td data-label="Budget used" class="ds-num">55<span class="ds-unit">%</span></td></tr>
      </tbody>
    </table>
  </div>
</div>
```

```html preview title="Master list with sort links"
<div class="ds-card">
  <div class="ds-card-body is-flush">
    <table class="ds-list-table">
      <thead>
        <tr>
          <th scope="col" aria-sort="ascending"><a class="ds-sort" href="#" title="Sort descending">Project <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-arrow-up"></use></svg></a></th>
          <th scope="col"><a class="ds-sort" href="#" title="Sort ascending">Owner <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevrons-up-down"></use></svg></a></th>
          <th scope="col" class="ds-num"><a class="ds-sort" href="#" title="Sort ascending">Budget <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevrons-up-down"></use></svg></a></th>
          <th scope="col">Status</th>
          <th scope="col"><span class="ds-visually-hidden">Actions</span></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="ds-primary-cell"><a href="#">PRJ-1024 Website relaunch</a></td>
          <td data-label="Owner">Ayu Lestari</td>
          <td data-label="Budget" class="ds-num">48,000<span class="ds-unit">USD</span></td>
          <td data-label="Status"><span class="ds-pill is-success">Active</span></td>
          <td class="ds-actions-cell"><div class="ds-row-actions"><a class="btn btn-ghost btn-sm" href="#">Edit</a></div></td>
        </tr>
        <tr>
          <td class="ds-primary-cell"><a href="#">PRJ-1031 Mobile app</a></td>
          <td data-label="Owner">Daniel Okafor</td>
          <td data-label="Budget" class="ds-num">112,500<span class="ds-unit">USD</span></td>
          <td data-label="Status"><span class="ds-pill is-neutral">On hold</span></td>
          <td class="ds-actions-cell"><div class="ds-row-actions"><a class="btn btn-ghost btn-sm" href="#">Edit</a></div></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

```html preview title="Wide table with pinned columns"
<div class="ds-card">
  <p class="ds-table-hint" data-ds-scroll-hint>Scroll sideways to see more columns. The invoice number stays in view.</p>
  <div class="ds-table-scroll" role="region" aria-label="Invoices, all columns" tabindex="0">
    <table data-ds-pin="1" data-ds-pin-primary="0" style="min-width:60rem">
      <thead>
        <tr><th scope="col">Invoice</th><th scope="col">Customer</th><th scope="col">Project</th><th scope="col">Issued</th><th scope="col">Due</th><th scope="col" class="ds-num">Net</th><th scope="col" class="ds-num">Tax</th><th scope="col" class="ds-num">Total</th><th scope="col" data-ds-pin-end>Status</th></tr>
      </thead>
      <tbody>
        <tr><td class="ds-nowrap"><a class="ds-link-ref" href="#">INV-2026-0418</a></td><td>Kintara Studio</td><td>PRJ-1024</td><td class="ds-nowrap">3 Nov 2026</td><td class="ds-nowrap">3 Dec 2026</td><td class="ds-num">3,890.91</td><td class="ds-num">389.09</td><td class="ds-num">4,280.00</td><td><span class="ds-pill is-success">Paid</span></td></tr>
        <tr><td class="ds-nowrap"><a class="ds-link-ref" href="#">INV-2026-0419</a></td><td>Marquez Logistics</td><td>PRJ-1031</td><td class="ds-nowrap">5 Nov 2026</td><td class="ds-nowrap">5 Dec 2026</td><td class="ds-num">1,045.91</td><td class="ds-num">104.59</td><td class="ds-num">1,150.50</td><td><span class="ds-pill is-warning">Due in 6 days</span></td></tr>
        <tr><td class="ds-nowrap"><a class="ds-link-ref" href="#">INV-2026-0420</a></td><td>Tanaka Holdings</td><td>PRJ-1040</td><td class="ds-nowrap">9 Nov 2026</td><td class="ds-nowrap">9 Dec 2026</td><td class="ds-num">11,731.14</td><td class="ds-num">1,173.11</td><td class="ds-num">12,904.25</td><td><span class="ds-pill is-error">Overdue</span></td></tr>
      </tbody>
    </table>
  </div>
</div>
```

```html preview title="Expandable rows"
<div class="ds-card">
  <div class="ds-table-toolbar is-inline">
    <button type="button" class="btn btn-ghost btn-sm" data-ds-tree-all="open" aria-controls="demo-expand">Expand all</button>
    <button type="button" class="btn btn-ghost btn-sm" data-ds-tree-all="close" aria-controls="demo-expand">Collapse all</button>
  </div>
  <div class="ds-table-scroll" role="region" aria-label="Invoice lines" tabindex="0">
    <table id="demo-expand">
      <thead><tr><th scope="col">Invoice and lines</th><th scope="col" class="ds-num">Quantity</th><th scope="col" class="ds-num">Amount</th></tr></thead>
      <tbody>
        <tr>
          <td class="ds-nowrap">
            <button type="button" class="btn btn-ghost btn-sm btn-square ds-tree-toggle" data-ds-tree-toggle aria-expanded="false" aria-controls="demo-expand-418" data-ds-label-expand="Show lines of INV-2026-0418" data-ds-label-collapse="Hide lines of INV-2026-0418" aria-label="Show lines of INV-2026-0418"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-right"></use></svg></button>
            <a class="ds-link-ref" href="#">INV-2026-0418</a>
          </td>
          <td class="ds-num">3</td><td class="ds-num">4,280.00<span class="ds-unit">USD</span></td>
        </tr>
      </tbody>
      <tbody id="demo-expand-418" hidden>
        <tr class="ds-tree-child"><td>Discovery workshop</td><td class="ds-num">1</td><td class="ds-num">1,200.00<span class="ds-unit">USD</span></td></tr>
        <tr class="ds-tree-child"><td>Design system audit</td><td class="ds-num">1</td><td class="ds-num">2,080.00<span class="ds-unit">USD</span></td></tr>
        <tr class="ds-tree-child"><td>Training session</td><td class="ds-num">1</td><td class="ds-num">1,000.00<span class="ds-unit">USD</span></td></tr>
        <tr class="ds-tree-summary"><td>Total INV-2026-0418</td><td class="ds-num">3</td><td class="ds-num">4,280.00<span class="ds-unit">USD</span></td></tr>
      </tbody>
    </table>
  </div>
</div>
```

## States

```html preview title="Selected, flagged, muted and busy rows"
<div class="ds-card">
  <div class="ds-card-body is-flush">
    <table class="ds-table">
      <thead><tr><th scope="col"><span class="ds-visually-hidden">Select</span></th><th scope="col">Invoice</th><th scope="col">Note</th><th scope="col" class="ds-num">Amount</th></tr></thead>
      <tbody>
        <tr aria-selected="true"><td><label class="ds-pick"><input type="checkbox" class="checkbox" checked aria-label="Select INV-2026-0421"></label></td><td data-label="Invoice">INV-2026-0421</td><td data-label="Note">Selected</td><td data-label="Amount" class="ds-num">980.00<span class="ds-unit">USD</span></td></tr>
        <tr class="is-flagged"><td><label class="ds-pick"><input type="checkbox" class="checkbox" aria-label="Select INV-2026-0422"></label></td><td data-label="Invoice">INV-2026-0422</td><td data-label="Note">Flagged: total differs from the purchase order by 40.00 USD</td><td data-label="Amount" class="ds-num">2,440.00<span class="ds-unit">USD</span></td></tr>
        <tr class="is-muted"><td><label class="ds-pick"><input type="checkbox" class="checkbox" aria-label="Select INV-2026-0423"></label></td><td data-label="Invoice">INV-2026-0423</td><td data-label="Note">Muted: cancelled</td><td data-label="Amount" class="ds-num">310.00<span class="ds-unit">USD</span></td></tr>
        <tr aria-busy="true"><td><label class="ds-pick"><input type="checkbox" class="checkbox" disabled aria-label="Select INV-2026-0424"></label></td><td data-label="Invoice">INV-2026-0424</td><td data-label="Note">Busy: sending to the customer</td><td data-label="Amount" class="ds-num">1,775.00<span class="ds-unit">USD</span></td></tr>
      </tbody>
    </table>
  </div>
</div>
```

```html preview title="Loading, empty and error"
<div style="display:grid;gap:1rem">
  <div class="ds-card" aria-busy="true">
    <table class="ds-table">
      <thead><tr><th scope="col">Invoice</th><th scope="col">Customer</th><th scope="col" class="ds-num">Amount</th></tr></thead>
      <tbody aria-label="Loading invoices">
        <tr><td><span class="ds-cell-skeleton" style="--ds-skeleton-w:6rem"></span></td><td><span class="ds-cell-skeleton" style="--ds-skeleton-w:10rem"></span></td><td><span class="ds-cell-skeleton ds-num" style="--ds-skeleton-w:4rem"></span></td></tr>
        <tr><td><span class="ds-cell-skeleton" style="--ds-skeleton-w:6rem"></span></td><td><span class="ds-cell-skeleton" style="--ds-skeleton-w:8rem"></span></td><td><span class="ds-cell-skeleton ds-num" style="--ds-skeleton-w:3rem"></span></td></tr>
        <tr><td><span class="ds-cell-skeleton" style="--ds-skeleton-w:6rem"></span></td><td><span class="ds-cell-skeleton" style="--ds-skeleton-w:9rem"></span></td><td><span class="ds-cell-skeleton ds-num" style="--ds-skeleton-w:4rem"></span></td></tr>
      </tbody>
    </table>
  </div>
  <div class="ds-card">
    <table class="ds-table">
      <thead><tr><th scope="col">Invoice</th><th scope="col">Customer</th><th scope="col" class="ds-num">Amount</th></tr></thead>
      <tbody>
        <tr class="ds-table-state"><td colspan="3"><div class="ds-table-state__body"><span>No invoices match "INV-2027". Clear the search or change the status filter.</span><a class="btn btn-ghost btn-sm" href="#">Clear filters</a></div></td></tr>
      </tbody>
    </table>
  </div>
  <div class="ds-card">
    <table class="ds-table">
      <thead><tr><th scope="col">Invoice</th><th scope="col">Customer</th><th scope="col" class="ds-num">Amount</th></tr></thead>
      <tbody>
        <tr class="ds-table-state is-error" role="alert"><td colspan="3"><div class="ds-table-state__body"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg><span>Invoices could not be loaded (network error).</span><button type="button" class="btn btn-ghost btn-sm">Try again</button></div></td></tr>
      </tbody>
    </table>
  </div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Default | Hairline row dividers at 70% of `--color-base-300`, tabular numbers |
| Hover | Pointer over a row | Content colour at `--ds-opacity-state-hover` over the row surface; pinned cells follow |
| Focus-visible | A clickable row with `tabindex="0"`, a sort link, the scroller | 2px `--ds-focus` ring inside the element |
| Selected | `aria-selected="true"`, `.is-selected` or a checked row checkbox | Primary tint at `--ds-opacity-state-selected` and a 3px primary edge on the first cell |
| Flagged | `.is-flagged` | 3px warning edge on the first cell; write the reason in a cell |
| Error row | `data-state="error"` | 3px error edge |
| Muted | `.is-muted` | Cells at `--ds-opacity-read` |
| Busy row | `aria-busy="true"` on the `tr` | Cells at `--ds-opacity-read`, no pointer events, `cursor: progress` |
| Sorted column | `aria-sort="ascending/descending"` | Header text in content colour, arrow at full opacity |
| Loading | Skeleton rows in an `aria-busy="true"` container | Bars of the real cell width with a shimmer; no layout shift |
| Empty | `.ds-table-state` row | One centred sentence and at most one action |
| Error | `.ds-table-state.is-error` | `--ds-error-text`, icon, retry button, `role="alert"` |
| Scrolled | `.is-scrolled` on the scroller | Edge shadow on the pinned column border |
| Narrow | 640px or less | Each row becomes a labelled card |
| Compact | `.is-compact` | Cell padding 6px by 12px instead of 12px by 16px |

## Anatomy

- `.ds-table-wrap` optional horizontal scroll; `.ds-table`, `.ds-list-table`, `.ds-table-scroll` (with `table` inside).
- `caption` (with `small` for a second line), `thead th`, `tbody tr`, `tfoot`.
- Modifiers: `is-compact`, `is-comfortable`, `is-striped`; rows `is-selected`, `is-flagged`, `is-muted`, `is-clickable`, `ds-group-row`, `ds-detail-row`, `ds-tree-child`, `ds-tree-summary`, `ds-table-state`.
- Cells: `.ds-num`, `.ds-unit`, `.ds-nowrap`, `.ds-cell-truncate`, `.ds-cell-muted`, `.ds-cell-main`, `.ds-cell-title`, `.ds-cell-sub`, `.ds-primary-cell`, `.ds-actions-cell`, `.ds-row-actions`, `.ds-pick`, `.ds-sort`, `.ds-cell-skeleton`.

## Usage

- Give every table a `caption` or an `aria-label`. Hide the caption with `ds-visually-hidden` when a heading already names it.
- Right-align numbers with `.ds-num` on both `th` and `td`, put the unit in `.ds-unit` after the number and format with `Fmt.Decimal` or `Fmt.Qty`.
- Show one unit style per column. Never mix `4,280` and `4.280,00` in a table.
- Put the identifier or name in the first column and keep it on one line (`.ds-nowrap`). Wrap long text; use `.ds-cell-truncate` (16rem) only with the full text in `title`.
- Keep the table at 640px and below readable by adding `data-label` to every cell except the main and actions cells.
- Do not turn a wide transaction table into cards. Use `.ds-table-scroll` and pin the identifier.
- Do not rely on a coloured edge alone for flagged rows. State the reason in a cell.
- Do not show more than 7 columns in `.ds-table`. Move the rest into a detail row or a wide table.

## Accessibility

- Use real `table`, `th scope="col"` and `th scope="row"` (totals). Do not use `div` grids for data.
- The scroller is `role="region"` with an `aria-label` and `tabindex="0"` so keyboard users can scroll it; the hint is text, not only a shadow.
- Sort headers expose `aria-sort`; the link or button says the next action in `title`.
- Selected rows set `aria-selected` and the checkbox is the control; the 3px edge and the tint are additions.
- Row checkboxes and tree toggles have an accessible name that includes the record (`Select INV-2026-0421`).
- Loading containers set `aria-busy="true"`; empty and error rows use plain text, the error row `role="alert"`.
- Forced colours: the selected row edge becomes a `Highlight` border; skeleton bars get a border.
- Motion: expanding rows fades and settles 5px over 160ms; collapse takes 140ms. Reduced motion removes the move and keeps the fade.

| Key | Action |
| --- | --- |
| Tab | Moves through links, checkboxes and buttons in reading order; the scroller is one stop |
| Arrow keys | Scroll a focused scroller |
| Enter, Space | Activates a sort header or expand toggle |

## Razor

Sort headers and the pager are partials. Sort and paging run on the server, so a query string (`sort`, `direction`, `page`, `size`, `q`) describes the whole state.

```cshtml
<table class="ds-list-table">
  <thead>
    <tr>
      <partial name="_DsSortHeader" model='new SortHeaderModel("Project", "name", Model.Rows.Sort)' />
      <partial name="_DsSortHeader" model='new SortHeaderModel("Budget", "budget", Model.Rows.Sort, Numeric: true)' />
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    @foreach (var row in Model.Rows.Rows) { <tr>…</tr> }
  </tbody>
</table>
<partial name="_DsPager" model='Model.Rows.Pager("projects")' />
```

`ListSort.Parse(sort, direction, allowedKeys, defaultKey)` checks the key against an allow-list, `PageSizes.Normalize(size)` limits the page size to 10, 20, 50 or 100 and `QueryUrl.With(Request, ("page", "2"))` keeps the rest of the query. See the [data table](./data-table.md) for the whole pattern.

## JavaScript

Pinned columns, the scroll hint and expandable rows use `table.js`.

| Attribute | Effect |
| --- | --- |
| `table[data-ds-pin="N"]` | Pins the first N columns; `data-ds-pin-primary="i"` is the one kept when space is short |
| `th[data-ds-pin-end]` | Pins that column to the end edge |
| `[data-ds-scroll-hint]` | Hint before the scroller; hidden when the table does not overflow |
| `button[data-ds-tree-toggle][aria-controls]` | Toggles the `tbody` it controls and swaps `aria-label` from `data-ds-label-expand` and `data-ds-label-collapse` |
| `[data-ds-tree-all="open/close"][aria-controls]` | Opens or closes every toggle inside the table with that id |

After you change rows or columns from script, dispatch `new Event("ds:tableupdate")` on the scroller. Toggling fires `ds:table:toggle` with `detail: { expanded, body }`.

## Tokens

`--ds-type-table-head-size|weight|tracking`, `--ds-type-callout-size`, `--ds-table-pad-y`, `--ds-table-pad-x`, `--ds-table-head-pad-y`, `--ds-opacity-state-hover|selected|pressed`, `--ds-opacity-read`, `--ds-size-table-max-height`, `--ds-z-table-head`, `--ds-z-pinned`, `--ds-shadow-pinned-start|end`, `--ds-border-accent`, `--ds-duration-shimmer`.

## Native and daisyUI

Builds on `table`. The DS tables do not use daisyUI `table`, `table-zebra` or `table-pin-rows`; `is-striped`, the sticky head and the pinned columns replace them. Checkbox cells use daisyUI `checkbox` inside `.ds-pick`.
