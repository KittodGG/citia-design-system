---
title: Data table
group: components
category: data-display
order: 12
summary: A table with toolbar, search, filter chips, column menu, density, row selection with a bulk action bar, sorting, paging and row actions. Server-side first.
source: TPS list pages (_DsSortHeader, _DsPager, _DsPageSize), shadcn/ui Data Table, Material 3 data tables
---

A data table is the full working surface for a collection: find records, narrow them, pick some, act on them. It wraps a [table](./table.md) in `.ds-data-table` and adds the toolbar, the bulk action bar and the pager. Large collections stay on the server: the query string holds search, filter, sort, page and size, and each change loads a new page. For a handful of rows on one page, the same toolbar can filter in the browser. Use a plain [table](./table.md) for read-only data, and a [list](./list.md) for one-value rows.

## Examples

```html preview title="Invoices: search, chips, columns, density, selection and row actions"
<div class="ds-data-table" id="demo-invoices" data-ds-table data-ds-select data-total="24">
  <div class="ds-table-progress" aria-hidden="true"></div>
  <div class="ds-table-toolbar is-inline" role="search">
    <div class="ds-search">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg>
      <input type="search" class="input" aria-label="Search invoices" placeholder="Search invoices" data-ds-table-search autocomplete="off">
    </div>
    <div class="ds-chips" role="group" aria-label="Status" data-ds-filter-group="status">
      <button type="button" class="ds-chip" data-ds-filter-value="" aria-pressed="true">All</button>
      <button type="button" class="ds-chip" data-ds-filter-value="paid" aria-pressed="false">Paid</button>
      <button type="button" class="ds-chip" data-ds-filter-value="due" aria-pressed="false">Due soon</button>
      <button type="button" class="ds-chip" data-ds-filter-value="overdue" aria-pressed="false">Overdue</button>
      <button type="button" class="ds-chip" data-ds-filter-value="draft" aria-pressed="false">Draft</button>
    </div>
    <span class="ds-table-toolbar__spacer"></span>
    <div class="ds-table-toolbar__group">
      <details class="ds-disclosure-menu" data-ds-menu>
        <summary class="btn btn-ghost btn-sm"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-columns"></use></svg>Columns</summary>
        <div class="ds-menu-panel">
          <div class="ds-table-columns">
            <label><input type="checkbox" class="checkbox checkbox-sm" data-ds-column="owner">Owner</label>
            <label><input type="checkbox" class="checkbox checkbox-sm" data-ds-column="issued">Issued</label>
          </div>
          <button type="button" class="btn btn-ghost btn-sm" data-ds-columns-reset>Show all columns</button>
        </div>
      </details>
      <div class="ds-density-toggle" role="group" aria-label="Row density">
        <button type="button" data-ds-density-set="comfortable" aria-pressed="true" aria-label="Comfortable rows" title="Comfortable rows"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-rows"></use></svg></button>
        <button type="button" data-ds-density-set="compact" aria-pressed="false" aria-label="Compact rows" title="Compact rows"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-list"></use></svg></button>
      </div>
      <a class="btn btn-ghost btn-sm" href="#" data-ds-export="Excel"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-download"></use></svg>Export</a>
    </div>
  </div>
  <div class="ds-bulk-bar" data-ds-bulk inert aria-hidden="true">
    <div class="ds-bulk-bar__inner">
      <span class="ds-bulk-bar__count" data-ds-select-count role="status">No rows selected</span>
      <button type="button" class="btn btn-ghost btn-sm" data-ds-select-everything hidden>Select all 24 invoices</button>
      <div class="ds-bulk-bar__actions">
        <button type="button" class="btn btn-ghost btn-sm"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-send"></use></svg>Send reminder</button>
        <button type="button" class="btn btn-ghost btn-sm"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-download"></use></svg>Export</button>
        <button type="button" class="btn btn-ghost btn-sm" style="color:var(--ds-error-text)"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg>Delete</button>
        <button type="button" class="btn btn-ghost btn-sm" data-ds-select-clear>Clear selection</button>
      </div>
    </div>
  </div>
  <table class="ds-table">
    <caption class="ds-visually-hidden">Invoices, November 2026</caption>
    <thead>
      <tr>
        <th scope="col"><label class="ds-pick"><input type="checkbox" class="checkbox" data-ds-select-all aria-label="Select all invoices on this page"></label></th>
        <th scope="col" aria-sort="ascending"><a class="ds-sort" href="#" title="Sort descending">Invoice <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-arrow-up"></use></svg></a></th>
        <th scope="col">Customer</th>
        <th scope="col" data-col="owner" hidden>Owner</th>
        <th scope="col" data-col="issued" hidden>Issued</th>
        <th scope="col" class="ds-num"><a class="ds-sort" href="#" title="Sort ascending">Amount <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevrons-up-down"></use></svg></a></th>
        <th scope="col">Status</th>
        <th scope="col"><span class="ds-visually-hidden">Actions</span></th>
      </tr>
    </thead>
    <tbody>
        <tr data-filter-status="paid">
          <td><label class="ds-pick"><input type="checkbox" class="checkbox" data-ds-select-row value="INV-2026-0418" aria-label="Select INV-2026-0418"></label></td>
          <td data-label="Invoice"><a class="ds-link-ref" href="#">INV-2026-0418</a></td>
          <td data-label="Customer">Kintara Studio</td>
          <td data-label="Owner" data-col="owner" hidden>Ayu Lestari</td>
          <td data-label="Issued" data-col="issued" class="ds-nowrap" hidden>3 Nov 2026</td>
          <td data-label="Amount" class="ds-num">4,280.00<span class="ds-unit">USD</span></td>
          <td data-label="Status"><span class="ds-pill is-success">Paid</span></td>
          <td class="ds-actions-cell"><button type="button" class="btn btn-ghost btn-sm btn-square" aria-haspopup="menu" popovertarget="dt-row-0418" aria-label="Actions for INV-2026-0418"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg></button><div id="dt-row-0418" popover class="ds-menu" role="menu" aria-label="Actions for INV-2026-0418" data-ds-align="end"><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg><span class="ds-menu__text">View</span></a><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><span class="ds-menu__text">Duplicate</span></a><a href="#" role="menuitem" class="ds-menu__item is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Delete</span></a></div></td>
        </tr>
        <tr data-filter-status="due">
          <td><label class="ds-pick"><input type="checkbox" class="checkbox" data-ds-select-row value="INV-2026-0419" aria-label="Select INV-2026-0419"></label></td>
          <td data-label="Invoice"><a class="ds-link-ref" href="#">INV-2026-0419</a></td>
          <td data-label="Customer">Marquez Logistics</td>
          <td data-label="Owner" data-col="owner" hidden>Sofia Marquez</td>
          <td data-label="Issued" data-col="issued" class="ds-nowrap" hidden>5 Nov 2026</td>
          <td data-label="Amount" class="ds-num">1,150.50<span class="ds-unit">USD</span></td>
          <td data-label="Status"><span class="ds-pill is-warning">Due soon</span></td>
          <td class="ds-actions-cell"><button type="button" class="btn btn-ghost btn-sm btn-square" aria-haspopup="menu" popovertarget="dt-row-0419" aria-label="Actions for INV-2026-0419"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg></button><div id="dt-row-0419" popover class="ds-menu" role="menu" aria-label="Actions for INV-2026-0419" data-ds-align="end"><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg><span class="ds-menu__text">View</span></a><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><span class="ds-menu__text">Duplicate</span></a><a href="#" role="menuitem" class="ds-menu__item is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Delete</span></a></div></td>
        </tr>
        <tr data-filter-status="overdue">
          <td><label class="ds-pick"><input type="checkbox" class="checkbox" data-ds-select-row value="INV-2026-0420" aria-label="Select INV-2026-0420"></label></td>
          <td data-label="Invoice"><a class="ds-link-ref" href="#">INV-2026-0420</a></td>
          <td data-label="Customer">Tanaka Holdings</td>
          <td data-label="Owner" data-col="owner" hidden>Mei Tanaka</td>
          <td data-label="Issued" data-col="issued" class="ds-nowrap" hidden>9 Nov 2026</td>
          <td data-label="Amount" class="ds-num">12,904.25<span class="ds-unit">USD</span></td>
          <td data-label="Status"><span class="ds-pill is-error">Overdue</span></td>
          <td class="ds-actions-cell"><button type="button" class="btn btn-ghost btn-sm btn-square" aria-haspopup="menu" popovertarget="dt-row-0420" aria-label="Actions for INV-2026-0420"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg></button><div id="dt-row-0420" popover class="ds-menu" role="menu" aria-label="Actions for INV-2026-0420" data-ds-align="end"><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg><span class="ds-menu__text">View</span></a><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><span class="ds-menu__text">Duplicate</span></a><a href="#" role="menuitem" class="ds-menu__item is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Delete</span></a></div></td>
        </tr>
        <tr data-filter-status="paid">
          <td><label class="ds-pick"><input type="checkbox" class="checkbox" data-ds-select-row value="INV-2026-0421" aria-label="Select INV-2026-0421"></label></td>
          <td data-label="Invoice"><a class="ds-link-ref" href="#">INV-2026-0421</a></td>
          <td data-label="Customer">Okafor and Sons</td>
          <td data-label="Owner" data-col="owner" hidden>Daniel Okafor</td>
          <td data-label="Issued" data-col="issued" class="ds-nowrap" hidden>10 Nov 2026</td>
          <td data-label="Amount" class="ds-num">980.00<span class="ds-unit">USD</span></td>
          <td data-label="Status"><span class="ds-pill is-success">Paid</span></td>
          <td class="ds-actions-cell"><button type="button" class="btn btn-ghost btn-sm btn-square" aria-haspopup="menu" popovertarget="dt-row-0421" aria-label="Actions for INV-2026-0421"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg></button><div id="dt-row-0421" popover class="ds-menu" role="menu" aria-label="Actions for INV-2026-0421" data-ds-align="end"><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg><span class="ds-menu__text">View</span></a><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><span class="ds-menu__text">Duplicate</span></a><a href="#" role="menuitem" class="ds-menu__item is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Delete</span></a></div></td>
        </tr>
        <tr data-filter-status="draft">
          <td><label class="ds-pick"><input type="checkbox" class="checkbox" data-ds-select-row value="INV-2026-0422" aria-label="Select INV-2026-0422"></label></td>
          <td data-label="Invoice"><a class="ds-link-ref" href="#">INV-2026-0422</a></td>
          <td data-label="Customer">Lestari Coffee</td>
          <td data-label="Owner" data-col="owner" hidden>Ayu Lestari</td>
          <td data-label="Issued" data-col="issued" class="ds-nowrap" hidden>12 Nov 2026</td>
          <td data-label="Amount" class="ds-num">2,440.00<span class="ds-unit">USD</span></td>
          <td data-label="Status"><span class="ds-pill is-neutral">Draft</span></td>
          <td class="ds-actions-cell"><button type="button" class="btn btn-ghost btn-sm btn-square" aria-haspopup="menu" popovertarget="dt-row-0422" aria-label="Actions for INV-2026-0422"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg></button><div id="dt-row-0422" popover class="ds-menu" role="menu" aria-label="Actions for INV-2026-0422" data-ds-align="end"><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg><span class="ds-menu__text">View</span></a><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><span class="ds-menu__text">Duplicate</span></a><a href="#" role="menuitem" class="ds-menu__item is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Delete</span></a></div></td>
        </tr>
        <tr data-filter-status="paid">
          <td><label class="ds-pick"><input type="checkbox" class="checkbox" data-ds-select-row value="INV-2026-0423" aria-label="Select INV-2026-0423"></label></td>
          <td data-label="Invoice"><a class="ds-link-ref" href="#">INV-2026-0423</a></td>
          <td data-label="Customer">Hana Kim Studio</td>
          <td data-label="Owner" data-col="owner" hidden>Hana Kim</td>
          <td data-label="Issued" data-col="issued" class="ds-nowrap" hidden>14 Nov 2026</td>
          <td data-label="Amount" class="ds-num">310.00<span class="ds-unit">USD</span></td>
          <td data-label="Status"><span class="ds-pill is-success">Paid</span></td>
          <td class="ds-actions-cell"><button type="button" class="btn btn-ghost btn-sm btn-square" aria-haspopup="menu" popovertarget="dt-row-0423" aria-label="Actions for INV-2026-0423"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg></button><div id="dt-row-0423" popover class="ds-menu" role="menu" aria-label="Actions for INV-2026-0423" data-ds-align="end"><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg><span class="ds-menu__text">View</span></a><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><span class="ds-menu__text">Duplicate</span></a><a href="#" role="menuitem" class="ds-menu__item is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Delete</span></a></div></td>
        </tr>
        <tr data-filter-status="due">
          <td><label class="ds-pick"><input type="checkbox" class="checkbox" data-ds-select-row value="INV-2026-0424" aria-label="Select INV-2026-0424"></label></td>
          <td data-label="Invoice"><a class="ds-link-ref" href="#">INV-2026-0424</a></td>
          <td data-label="Customer">Pratama Retail</td>
          <td data-label="Owner" data-col="owner" hidden>Rafi Pratama</td>
          <td data-label="Issued" data-col="issued" class="ds-nowrap" hidden>16 Nov 2026</td>
          <td data-label="Amount" class="ds-num">1,775.00<span class="ds-unit">USD</span></td>
          <td data-label="Status"><span class="ds-pill is-warning">Due soon</span></td>
          <td class="ds-actions-cell"><button type="button" class="btn btn-ghost btn-sm btn-square" aria-haspopup="menu" popovertarget="dt-row-0424" aria-label="Actions for INV-2026-0424"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg></button><div id="dt-row-0424" popover class="ds-menu" role="menu" aria-label="Actions for INV-2026-0424" data-ds-align="end"><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg><span class="ds-menu__text">View</span></a><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><span class="ds-menu__text">Duplicate</span></a><a href="#" role="menuitem" class="ds-menu__item is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Delete</span></a></div></td>
        </tr>
        <tr data-filter-status="draft">
          <td><label class="ds-pick"><input type="checkbox" class="checkbox" data-ds-select-row value="INV-2026-0425" aria-label="Select INV-2026-0425"></label></td>
          <td data-label="Invoice"><a class="ds-link-ref" href="#">INV-2026-0425</a></td>
          <td data-label="Customer">Nordlys AS</td>
          <td data-label="Owner" data-col="owner" hidden>Ingrid Solberg</td>
          <td data-label="Issued" data-col="issued" class="ds-nowrap" hidden>18 Nov 2026</td>
          <td data-label="Amount" class="ds-num">6,120.00<span class="ds-unit">USD</span></td>
          <td data-label="Status"><span class="ds-pill is-neutral">Draft</span></td>
          <td class="ds-actions-cell"><button type="button" class="btn btn-ghost btn-sm btn-square" aria-haspopup="menu" popovertarget="dt-row-0425" aria-label="Actions for INV-2026-0425"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg></button><div id="dt-row-0425" popover class="ds-menu" role="menu" aria-label="Actions for INV-2026-0425" data-ds-align="end"><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg><span class="ds-menu__text">View</span></a><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><span class="ds-menu__text">Duplicate</span></a><a href="#" role="menuitem" class="ds-menu__item is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Delete</span></a></div></td>
        </tr>
      <tr class="ds-table-state" data-ds-table-empty hidden><td colspan="8"><div class="ds-table-state__body"><span>No invoice matches. Clear the search or pick another status.</span></div></td></tr>
    </tbody>
  </table>
  <footer class="ds-pager">
    <p role="status" data-ds-table-count>1–8 of 24 invoices</p>
    <nav aria-label="Pagination">
      <a class="btn btn-ghost btn-sm" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-left"></use></svg> Previous</a>
      <span class="ds-num">Page 1 of 3</span>
      <a class="btn btn-ghost btn-sm" href="#" rel="next">Next <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-right"></use></svg></a>
    </nav>
  </footer>
</div>
```

The demo filters the 8 rows in the browser (`data-ds-table-search`, `data-ds-filter-group`). In an application, search, chips, sorting and paging are links and a GET form, as in the server-side pattern below. Select a row to see the bulk bar slide in; Shift+click another row to select the range.

```html preview title="Loading, empty and error in the shell"
<div style="display:grid;gap:1rem">
  <div class="ds-data-table" aria-busy="true">
    <div class="ds-table-progress" aria-hidden="true"></div>
    <div class="ds-table-toolbar is-inline"><div class="ds-search"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg><input type="search" class="input" aria-label="Search projects" placeholder="Search projects" disabled></div></div>
    <table class="ds-table">
      <caption class="ds-visually-hidden">Projects, loading</caption>
      <thead><tr><th scope="col">Project</th><th scope="col">Owner</th><th scope="col" class="ds-num">Budget</th></tr></thead>
      <tbody>
        <tr><td><span class="ds-cell-skeleton" style="--ds-skeleton-w:9rem"></span></td><td><span class="ds-cell-skeleton" style="--ds-skeleton-w:7rem"></span></td><td><span class="ds-cell-skeleton ds-num" style="--ds-skeleton-w:4rem"></span></td></tr>
        <tr><td><span class="ds-cell-skeleton" style="--ds-skeleton-w:11rem"></span></td><td><span class="ds-cell-skeleton" style="--ds-skeleton-w:6rem"></span></td><td><span class="ds-cell-skeleton ds-num" style="--ds-skeleton-w:3rem"></span></td></tr>
      </tbody>
    </table>
  </div>
  <div class="ds-data-table">
    <table class="ds-table">
      <caption class="ds-visually-hidden">Projects</caption>
      <thead><tr><th scope="col">Project</th><th scope="col">Owner</th><th scope="col" class="ds-num">Budget</th></tr></thead>
      <tbody><tr class="ds-table-state"><td colspan="3"><div class="ds-empty"><span class="ds-empty-icon"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-folder"></use></svg></span><h3>No projects yet</h3><p>Projects you create appear here with their owner and budget.</p><a class="btn btn-primary btn-sm" href="#">New project</a></div></td></tr></tbody>
    </table>
  </div>
  <div class="ds-data-table">
    <table class="ds-table">
      <caption class="ds-visually-hidden">Projects</caption>
      <thead><tr><th scope="col">Project</th><th scope="col">Owner</th><th scope="col" class="ds-num">Budget</th></tr></thead>
      <tbody><tr class="ds-table-state is-error" role="alert"><td colspan="3"><div class="ds-table-state__body"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg><span>Projects could not be loaded. Check your connection.</span><button type="button" class="btn btn-ghost btn-sm">Try again</button></div></td></tr></tbody>
    </table>
  </div>
</div>
```

```html preview title="Server-side toolbar: a GET form"
<div class="ds-data-table">
  <form class="ds-table-toolbar is-inline" method="get" role="search">
    <input type="hidden" name="sort" value="issued">
    <input type="hidden" name="direction" value="desc">
    <div class="ds-search">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg>
      <input type="search" name="q" value="Okafor" class="input" aria-label="Search invoices" placeholder="Search invoices" autocomplete="off">
    </div>
    <select name="status" class="select" aria-label="Status"><option value="">All statuses</option><option value="paid" selected>Paid</option><option value="due">Due soon</option></select>
    <span class="ds-table-toolbar__spacer"></span>
    <div class="ds-table-toolbar__group">
      <a class="btn btn-ghost btn-sm" href="#">Reset</a>
      <label class="ds-page-size"><span>Show</span><select name="size" class="select select-sm" aria-label="Rows per page"><option>10</option><option selected>20</option><option>50</option></select><span>per page</span></label>
    </div>
  </form>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Default | Toolbar on the card surface, hairline under it, rows as in the [table](./table.md) |
| Hover, pressed, focus-visible | Rows, sort links, chips, buttons | Row tint at `--ds-opacity-state-hover`; chips and buttons as their own components; 2px `--ds-focus` ring |
| Row selected | Row checkbox checked | Primary tint, 3px edge, header checkbox checked or indeterminate |
| Header indeterminate | Some but not all rows selected | Dash in the header checkbox |
| Bulk bar open | One or more rows selected | Bar reveals under the toolbar over 240ms (`grid-template-rows`) with a 150ms fade; the count is announced |
| Bulk bar closed | No rows selected | Bar collapsed, `inert`, hidden from assistive technology |
| Filter chip on | `aria-pressed="true"` | Primary chip; rows without the value hide |
| Column hidden | Column menu checkbox cleared | Cells with that `data-col` get `hidden`; pinned offsets recalculate |
| Density | `data-density="comfortable/compact"` | Cell padding 12px by 16px, or 6px by 12px |
| Loading | `aria-busy="true"` on `.ds-data-table` | After 300ms a 2px progress bar runs under the top edge; the table stays readable and ignores clicks |
| Empty (no data) | No rows at all | `.ds-table-state` row with an [empty state](./empty-state.md) and one action |
| Empty (no match) | Filters match nothing | One sentence and "Clear filters"; `tr[data-ds-table-empty]` shows it in the client mode |
| Error | Load failed | `.ds-table-state.is-error` with `role="alert"` and a retry button |
| Row busy | `aria-busy="true"` on a `tr` | Cells dimmed, row inert |
| Row error | `data-state="error"` on a `tr` | 3px error edge; explain in a cell |
| Narrow | 640px or less | Toolbar wraps, rows become cards, the row checkbox moves to the card corner |

## Anatomy

- `.ds-data-table` shell with `data-ds-table` (density, columns, client filter) and `data-ds-select` (selection); `data-total` is the number of records on all pages.
- `.ds-table-progress` busy bar.
- `.ds-table-toolbar.is-inline` with `.ds-search`, `.ds-chips`, `.ds-table-toolbar__spacer`, `.ds-table-toolbar__group`, `.ds-table-columns`, `.ds-density-toggle`.
- `.ds-bulk-bar` with `.ds-bulk-bar__inner`, `.ds-bulk-bar__count`, `.ds-bulk-bar__actions`.
- The table (`.ds-table`, `.ds-list-table` or `.ds-table-scroll`), `_DsSortHeader` headers, `.ds-pick` checkbox cells, `.ds-actions-cell` with a [dropdown menu](./dropdown-menu.md) (`popover`, so the table scroller never clips it) for row actions.
- `.ds-pager` (partial `_DsPager`) and `.ds-page-size` (partial `_DsPageSize`).

## Usage

- Put search first, then the 1 or 2 filters people use most, and the rest (columns, density, export) at the end. More than 4 filters belong in a [sheet](./sheet.md) or a filter dialog.
- Keep the selection to the current page. Offer "Select all 24 invoices" (`data-ds-select-everything`) only when the server can act on the whole result.
- Put the 3 most common bulk actions in the bar and the destructive one last, in the error colour, with a confirmation [dialog](./alert-dialog.md).
- Show the number of records and the range ("1–8 of 24 invoices"), never only "Page 1".
- Keep sort, page and size in the query string so a reload, a shared link and Back all work.
- Do not put row menus in `.ds-table-scroll`: its scroll container clips them. Use `.ds-table` or `.ds-list-table`, or a single "View" link in the last column.
- Do not clear the selection silently when the user searches: rows that leave the result leave the selection, and the count updates.

## Accessibility

- The shell is not a grid: it is a `table` with a toolbar (`role="search"`) around it. Selection uses real checkboxes in the first column.
- The header checkbox is named "Select all invoices on this page"; row checkboxes name the record.
- The selected count is in a `role="status"` element, so a screen reader hears "3 selected" when it changes; filter results announce "Showing 3 of 8 rows".
- The bulk bar is `inert` while closed, so Tab skips it; opening it does not move focus. Clear selection returns focus to the header checkbox.
- Sort links name the next action in `title`; the sorted header has `aria-sort`.
- Column and density controls announce their result ("Owner column hidden").

| Key | Action |
| --- | --- |
| Space | On a row checkbox: toggles it. On a focused row (`tabindex="0"`): toggles its checkbox |
| Shift+click, Shift+Space | Selects the range from the last toggled row |
| Arrow Up, Arrow Down | Moves between row checkboxes; with Shift, extends the selection |
| Ctrl+A or Cmd+A | Selects every visible row (not while typing in a field) |
| Escape | Clears the selection; clears the search box when focus is in it |
| Enter | In the search box: submits the form (server mode) |

## Razor

`<ds-data-table-toolbar>` renders the server toolbar, `_DsSortHeader` the headers, `_DsPager` and `_DsPageSize` the footer.

```cshtml
<div class="ds-data-table" id="invoices" data-ds-table data-ds-select data-total="@Model.Rows.Total">
  <ds-data-table-toolbar search-value="@Model.Q" search-label="Search invoices" density
      export-href="@Url.Page("Export", new { Model.Q, Model.Sort, Model.Direction })" export-kind="Excel"
      reset-href="@Url.Page("Index")" column-owner="Owner" column-issued="Issued" hidden-columns="issued">
    <select name="status" class="select" aria-label="Status" data-ds-autosubmit>…</select>
    <partial name="_DsPageSize" model="Model.Rows.PageSize" />
  </ds-data-table-toolbar>

  <div class="ds-bulk-bar" data-ds-bulk inert aria-hidden="true">…</div>

  <table class="ds-table">
    <thead>
      <tr>
        <th scope="col"><label class="ds-pick"><input type="checkbox" class="checkbox" data-ds-select-all aria-label="Select all"></label></th>
        <partial name="_DsSortHeader" model='new SortHeaderModel("Invoice", "number", Model.Rows.Sort)' />
        <th scope="col" data-col="owner">Owner</th>
        <partial name="_DsSortHeader" model='new SortHeaderModel("Amount", "amount", Model.Rows.Sort, Numeric: true)' />
      </tr>
    </thead>
    <tbody>@foreach (var invoice in Model.Rows.Rows) { <tr>…</tr> }</tbody>
  </table>

  <partial name="_DsPager" model='Model.Rows.Pager("invoices")' />
</div>
```

| Attribute of `<ds-data-table-toolbar>` | Effect |
| --- | --- |
| `search-name`, `search-value`, `search-label`, `search-placeholder` | The search field (name defaults to `q`; empty hides it) |
| `client` | Renders a `div` and filters the rows in the page instead of submitting |
| `density`, `density-value` | Comfortable and compact toggle, and which is pressed |
| `export-href`, `export-label`, `export-kind` | Export link (`data-ds-export` shows the "preparing" toast) |
| `reset-href` | Reset link back to the unfiltered page |
| `column-<key>="Label"`, `hidden-columns="key,key"` | Columns menu and the columns that start hidden |
| `keep` | Query keys copied into hidden fields (default `sort,direction,size`; `page` is dropped, so a new search starts on page 1) |
| `action` | Form action (default: the current URL) |

The child content (your filters) goes between the search box and the tools.

### Server-side pattern

Read the query, allow-list the sort key, sort and filter the whole result, then cut the page. The partials only read the same names.

```csharp
public sealed class IndexModel(AppDbContext db) : PageModel
{
    static readonly string[] SortKeys = ["number", "amount", "issued"];

    [BindProperty(SupportsGet = true)] public string? Q { get; set; }
    [BindProperty(SupportsGet = true)] public string? Status { get; set; }
    [BindProperty(SupportsGet = true)] public string? Sort { get; set; }
    [BindProperty(SupportsGet = true)] public string? Direction { get; set; }
    [BindProperty(SupportsGet = true)] public int? Size { get; set; }
    [BindProperty(SupportsGet = true, Name = "page")] public int PageNumber { get; set; } = 1;

    public ListPage<Invoice> Rows { get; private set; } = default!;

    public async Task OnGetAsync()
    {
        var sort = ListSort.Parse(Sort, Direction, SortKeys, defaultKey: "issued", defaultDescending: true);
        var size = PageSizes.Normalize(Size);

        var query = db.Invoices.AsNoTracking()
            .Where(i => Status == null || i.Status == Status)
            .Where(i => Q == null || EF.Functions.Like(i.Number, $"%{Q}%") || EF.Functions.Like(i.Customer, $"%{Q}%"));

        query = (sort.Key, sort.Descending) switch
        {
            ("amount", false) => query.OrderBy(i => i.Amount).ThenBy(i => i.Id),
            ("amount", true) => query.OrderByDescending(i => i.Amount).ThenBy(i => i.Id),
            ("number", false) => query.OrderBy(i => i.Number),
            ("number", true) => query.OrderByDescending(i => i.Number),
            (_, false) => query.OrderBy(i => i.Issued).ThenBy(i => i.Id),
            _ => query.OrderByDescending(i => i.Issued).ThenBy(i => i.Id),
        };

        var total = await query.CountAsync();
        var page = Math.Clamp(PageNumber, 1, Math.Max(1, (int)Math.Ceiling(total / (double)size)));
        var rows = await query.Skip((page - 1) * size).Take(size).ToListAsync();
        Rows = new ListPage<Invoice>(rows, Q, page, size, total, sort);
    }
}
```

`QueryUrl.With(Request, ("page", "2"))` builds same-page links that keep every other key. The bulk bar posts the selected `value`s (the checkboxes) with a normal form to a handler; for "all N" (`ds:selection:selectall`) post the current filter instead of the ids.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `.ds-data-table[data-ds-table]` | Enables density, columns and the client filter; `id` plus `data-ds-persist` remembers density and hidden columns per browser |
| `[data-ds-density-set="compact/comfortable"]` | Density buttons (`aria-pressed`) |
| `input[data-ds-column="key"]`, `[data-col="key"]`, `[data-ds-columns-reset]` | Column visibility |
| `input[data-ds-table-search]`, `[data-ds-table-count]`, `tr[data-ds-table-empty]` | Client text filter, count line, and the "no match" row |
| `[data-ds-filter-group="key"] > [data-ds-filter-value="v"]`, `tr[data-filter-key="v"]` | Filter chips; an empty value is "all" |
| `[data-ds-select]` | Enables selection inside the element (`data-total` = all records; `data-ds-select-click` makes a click on empty row space toggle) |
| `thead input[data-ds-select-all]`, `tbody input[data-ds-select-row]` | Header and row checkboxes (`.ds-pick > input` also works) |
| `[data-ds-bulk]` | Bulk bar; gets `data-open` and loses `inert` while rows are selected |
| `[data-ds-select-count]`, `[data-ds-select-clear]`, `[data-ds-select-everything]` | Count text (give it `role="status"`), clear button, and "select all N" button |

Events bubble from the shell: `ds:selection:change` (`detail: { count, total, values, rows }`), `ds:selection:selectall`, `ds:table:density`, `ds:table:columns` (`detail: { hidden }`), `ds:table:filter` (`detail: { shown, total, query }`), `ds:table:toggle`.

API: `DS.selection.clear(root)`, `DS.selection.selectAll(root)`, `DS.selection.values(root)`, `DS.selection.count(root)`, `DS.dataTable.setDensity(root, "compact")`.

## Tokens

`--ds-table-pad-y`, `--ds-table-pad-x`, `--ds-opacity-state-selected`, `--ds-opacity-state-hover`, `--ds-duration-layout`, `--ds-duration-fast`, `--ds-ease-emphasized`, `--ds-radius-card`, `--ds-space-card-x`, `--ds-z-table-head-pinned-end`, `--color-primary`.

## Native and daisyUI

Builds on `table`, `form[method="get"]`, `input[type="search"]`, `details` (menus) and `input[type="checkbox"]`. Uses daisyUI `btn`, `input`, `select` and `checkbox`. The server pattern needs no JavaScript except for the bulk bar and selection; sort, search, filters, paging and export are links and a GET form.
