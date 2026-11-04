---
title: Data pattern
group: patterns
order: 3
summary: Search, filters, sort, pagination, bulk actions, empty, loading and error states, and export for lists and tables of records.
---

Lists of records are the core of most applications. This page fixes how people find, narrow, order and act on rows. Components: [Table](./table.md), [Data table](./data-table.md), [Pagination](./pagination.md), [Search input](./search-input.md), [Empty state](./empty-state.md), [Skeleton](./skeleton.md).

## Search

- One search field per list, above the table, labelled "Search <things>" with a placeholder that names the searchable fields ("Search by code or name").
- Search submits with `GET` (`?q=`) so the URL is shareable. Typing may also filter live with a 300ms debounce (`data-ds-autosubmit`), but Enter always works.
- Match case-insensitively and ignore accents and extra spaces; search the visible columns.
- Keep the query in the field after the results load, and say what was searched in the result line ("3 results for "okafor"").
- Search resets paging to page 1.

## Filters

- Show at most 3 filters inline (status, owner, date). Put the rest behind a "Filters" [Popover](./popover.md) or [Sheet](./sheet.md) with a count badge ("Filters 2").
- Active filters appear as removable chips above the table; "Clear filters" removes all of them at once.
- Filters apply on "Apply" for several controls, or at once for a single control; say which in the layout and keep it consistent in the product.
- Filters live in the URL, so a filtered list can be bookmarked and the back button restores it.

```html preview title="Filter chips and result line"
<div class="ds-surface">
  <form class="ds-table-toolbar" role="search">
    <div>
      <label for="dp-q">Search invoices</label>
      <div class="ds-search">
        <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg>
        <input id="dp-q" type="search" class="input" value="okafor">
      </div>
    </div>
    <div>
      <label for="dp-st">Status</label>
      <select id="dp-st" class="select"><option>Unpaid</option><option>Paid</option><option>All statuses</option></select>
    </div>
    <button type="button" class="btn">Apply</button>
  </form>
  <div class="ds-counts" style="padding-inline:1rem">
    <span><strong>3</strong> results for "okafor"</span>
    <span class="ds-chip">Status: Unpaid <button type="button" class="ds-icon-btn" aria-label="Remove filter Status: Unpaid"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></span>
    <a href="#">Clear filters</a>
  </div>
</div>
```

## Sort

- Only columns people compare are sortable: names, dates, amounts, statuses. Not notes or action columns.
- The header is a link or button inside `<th aria-sort>`. First click sorts ascending, the second descending, the third returns to the default order.
- Show the direction with an arrow icon and `aria-sort`, never with colour alone.
- Sort keys come from a fixed allowlist on the server (`ListSort.Parse`); a column name in the URL never reaches the query.
- Sorting keeps the search and filters and resets to page 1.

## Pagination

- Default page size 10; offer 10, 20, 50, 100 (`PageSizes.All`). Remember the choice per list.
- The pager shows the range ("1–10 of 57 projects") and Previous, "Page 1 of 6", Next. Do not show a page number list for more than 7 pages.
- Use a pager for records people look up; use "Load more" or infinite scroll only for feeds and timelines.
- Keep the scroll position of the table header in view when the page changes: scroll to the top of the table.
- Keep the total accurate; if counting is expensive, say "more than 10,000" instead of a wrong number.

## Bulk actions

- Each row has a checkbox; the header checkbox selects the visible page and shows an indeterminate state when some rows are selected.
- When one row or more is selected, a bar replaces the toolbar: "3 selected", the actions, and "Clear selection". Offer "Select all 57 results" only after the page is selected.
- Name actions with a verb and the object ("Archive 3 projects"). A destructive bulk action opens a confirm dialog that repeats the count and states if it can be undone.
- Report the result in a toast with the counts, and keep failures visible ("2 archived, 1 failed: PRJ-1031 has open invoices") with a link to the failed rows.

```html preview title="Selection bar"
<div class="ds-surface">
  <div class="ds-table-toolbar" role="toolbar" aria-label="Bulk actions">
    <p role="status"><strong>3 selected</strong></p>
    <div class="ds-actions">
      <button type="button" class="btn btn-sm">Archive</button>
      <button type="button" class="btn btn-sm">Assign owner</button>
      <button type="button" class="btn btn-ghost btn-sm is-danger">Delete</button>
      <button type="button" class="btn btn-ghost btn-sm">Clear selection</button>
    </div>
  </div>
</div>
```

## Empty, loading and error

| State | Show | Do |
| --- | --- | --- |
| First run | [Empty state](./empty-state.md) with a create action | Hide the toolbar and the pager |
| No results | "No projects match your filters" and "Clear filters" | Keep the toolbar so people can change the query |
| Loading | [Skeleton](./skeleton.md) rows matching the column layout, after 300ms | Keep the header and the toolbar; no spinner over the whole page |
| Refreshing | Thin progress under the toolbar, `aria-busy="true"` on the table | Keep old rows until new ones arrive |
| Error | [Alert](./alert.md) above the table: what failed and "Try again" | Keep the last good rows if there are any, marked as possibly stale |

## Export

- Export buttons sit on the start side of the toolbar, under the result line, named for the format ("Export CSV", "Export Excel").
- Export what the user sees: the same search, filters and sort, not only the current page. State the row count in the button or a hint when it is large ("Export 1,240 rows").
- Mark the button busy with `data-ds-export` for the duration of the download so it cannot be double-clicked, and confirm with a toast when a file was generated in the background.
- Use the same formats as the screen for dates and the machine format for numbers (dot decimal, no grouping) so a spreadsheet can read them.

## Usage

- Do keep search, filter and sort state in the URL.
- Do show the result count whenever a filter or search is active.
- Do not hide the toolbar when there are no results.
- Do not offer bulk actions without a clear selection count.
- Do not show a spinner over a table that already has rows; mark it busy instead.
