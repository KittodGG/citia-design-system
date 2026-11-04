---
title: Pagination
group: components
category: navigation
order: 6
summary: Numbered pages with ellipsis, previous and next, optional first and last, a compact mobile form, plus the list footer partial and the page-size select.
source: TPS _Pager, _PtPager, .master-pagination (unified)
---

Pagination moves through a result set that is split into pages. Use numbered pagination (`.ds-pagination`) when people jump to a specific page or need a sense of size, such as the 24 pages of an invoice list. Use the **list footer** (`_DsPager`) under tables, where the range text ("21–40 of 128 invoices") and previous / next are enough. For long feeds where position does not matter, prefer "Load more" or infinite scroll with a visible end. Pagination changes the page through links, so it works without JavaScript, can be bookmarked and keeps filters in the URL.

## Examples

### Numbered, with ellipsis

The numbers are links. The current page has `aria-current="page"`. Ellipses stand in for skipped runs; the helper keeps 1 page at each end and 1 on each side of the current page by default.

```html preview title="Numbered pagination (page 8 of 24)"
<nav class="ds-pagination" aria-label="Pagination">
  <ul class="ds-pagination__list">
    <li><a class="ds-pagination__link is-prev" href="#" rel="prev" aria-label="Previous"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-left"/></svg><span>Previous</span></a></li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-label="Go to page 1">1</a></li>
    <li class="ds-pagination__gap" aria-hidden="true">…</li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-label="Go to page 7">7</a></li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-current="page" aria-label="Page 8">8</a></li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-label="Go to page 9">9</a></li>
    <li class="ds-pagination__gap" aria-hidden="true">…</li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-label="Go to page 24">24</a></li>
    <li class="ds-pagination__summary">Page 8 of 24</li>
    <li><a class="ds-pagination__link is-next" href="#" rel="next" aria-label="Next"><span>Next</span><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-right"/></svg></a></li>
  </ul>
</nav>
```

### First and last, outline, sizes

First and last buttons (`.ds-pagination__edge`) help in sets of more than 20 pages. `is-outline` gives every link a hairline border. `is-sm` is 32px, `is-lg` 44px; the default is 36px.

```html preview title="Edges, outline, small"
<nav class="ds-pagination is-outline is-sm" aria-label="Pagination (outline)">
  <ul class="ds-pagination__list">
    <li class="ds-pagination__edge"><a class="ds-pagination__link is-first" aria-disabled="true" aria-label="First page"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevrons-left"/></svg></a></li>
    <li><a class="ds-pagination__link is-prev" aria-disabled="true" aria-label="Previous"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-left"/></svg><span>Previous</span></a></li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-current="page" aria-label="Page 1">1</a></li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-label="Go to page 2">2</a></li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-label="Go to page 3">3</a></li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-label="Go to page 4">4</a></li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-label="Go to page 5">5</a></li>
    <li class="ds-pagination__gap" aria-hidden="true">…</li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-label="Go to page 12">12</a></li>
    <li class="ds-pagination__summary">Page 1 of 12</li>
    <li><a class="ds-pagination__link is-next" href="#" rel="next" aria-label="Next"><span>Next</span><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-right"/></svg></a></li>
    <li class="ds-pagination__edge"><a class="ds-pagination__link is-last" href="#" aria-label="Last page"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevrons-right"/></svg></a></li>
  </ul>
</nav>
```

### Compact (narrow containers)

Below 32rem of container width (a phone, or a narrow card) the numbers and first/last fold away and "Page 8 of 24" sits between previous and next. `is-simple` forces this form at any width.

```html preview title="Compact form (is-simple)"
<nav class="ds-pagination is-simple" aria-label="Pagination (compact)">
  <ul class="ds-pagination__list">
    <li><a class="ds-pagination__link is-prev" href="#" rel="prev" aria-label="Previous"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-left"/></svg><span>Previous</span></a></li>
    <li class="ds-pagination__summary">Page 8 of 24</li>
    <li><a class="ds-pagination__link is-next" href="#" rel="next" aria-label="Next"><span>Next</span><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-right"/></svg></a></li>
  </ul>
</nav>
```

### List footer and page size

`_DsPager` renders the footer of a list: the range on the left, previous / page / next on the right. `_DsPageSize` is the rows-per-page select inside the list's GET form; it submits on change. They are server partials, shown here as their HTML.

```html preview title="Pager footer and page size"
<div style="border:1px solid var(--color-base-300);border-radius:0.75rem;background:var(--color-base-100)">
  <div style="padding:1rem">
    <label class="ds-page-size"><span>Show</span>
      <select class="select select-sm" aria-label="Rows per page"><option>10</option><option selected>20</option><option>50</option><option>100</option></select>
      <span>per page</span></label>
  </div>
  <footer class="ds-pager">
    <p role="status">21–40 of 128 invoices</p>
    <nav aria-label="Pagination (list)">
      <a class="btn btn-ghost btn-sm" href="#" rel="prev"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-left"/></svg> Previous</a>
      <span class="ds-num">Page 2 of 7</span>
      <a class="btn btn-ghost btn-sm" href="#" rel="next">Next <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-right"/></svg></a>
    </nav>
  </footer>
</div>
```

## States

```html preview title="Current, disabled ends, hover and focus come from interaction"
<nav class="ds-pagination" aria-label="Pagination (states)">
  <ul class="ds-pagination__list">
    <li><a class="ds-pagination__link is-prev" aria-disabled="true" aria-label="Previous"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-left"/></svg><span>Previous</span></a></li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-current="page" aria-label="Page 1">1</a></li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-label="Go to page 2">2</a></li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-label="Go to page 3">3</a></li>
    <li class="ds-pagination__summary">Page 1 of 3</li>
    <li><a class="ds-pagination__link is-next" href="#" aria-label="Next"><span>Next</span><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-right"/></svg></a></li>
  </ul>
</nav>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | none | `--color-base-content` text, no fill or border (outline: hairline border) |
| Hover | pointer over a link | 6% tint |
| Pressed | pointer down | 10% tint |
| Focus-visible | keyboard focus | 2px `--ds-focus` ring |
| Current | `aria-current="page"` | tonal primary fill, `--ds-quiet` text, 1px primary-tinted border, weight 700; not clickable |
| Disabled end | `aria-disabled="true"` on previous or next on the first or last page | 45% opacity, `not-allowed` cursor, no `href`, not focusable |
| Ellipsis | `.ds-pagination__gap` | `--ds-muted` text, `aria-hidden` |
| Compact | container below 32rem, or `is-simple` | numbers hidden, "Page n of N" shown |
| Empty | one page or fewer | the tag helper renders nothing |

## Anatomy

- `nav.ds-pagination` root with an accessible name. Modifiers: `is-outline`, `is-simple`, `is-sm`, `is-lg`.
- `ul.ds-pagination__list`, one `li` per control.
- `.ds-pagination__link` any link; `is-prev`, `is-next`, `is-first`, `is-last` for the arrows.
- `li.ds-pagination__page` a numbered page; `li.ds-pagination__edge` first or last; `li.ds-pagination__gap` the ellipsis; `li.ds-pagination__summary` the "Page n of N" text for compact mode.
- List footer: `footer.ds-pager` with `p` (range) and `nav`; `label.ds-page-size` with a `select`.

## Usage

- Show at most 7 number slots on desktop: first, last, current, one on each side and two ellipses.
- Put pagination below the list, aligned to the end of the table or centred under a grid.
- Keep filters and sort in the page links; changing the filter returns to page 1. Never page by POST.
- Previous and next are always present; disable them at the ends instead of removing them, so the layout stays still.
- Page sizes: 10, 20, 50 and 100. Remember the choice in the URL (`size=20`).
- Do not use pagination for fewer than 2 pages. Do not paginate a list that can be filtered to fit one screen.
- Always tell people where they are in the set: the range text, or "Page 8 of 24".

## Accessibility

- A `<nav>` landmark with a name ("Pagination", localised). If a page has two paginations, give each a distinct label.
- Every number link has an accessible name ("Go to page 9"); the current one reads "Page 8" and has `aria-current="page"`.
- `rel="prev"` and `rel="next"` on the arrows help crawlers and assistive tools.
- Disabled ends are not links (no `href`), so they leave the tab order and are read as unavailable text.
- Targets are 36px (32px small) and 44px on touch screens.
- The range text in the footer is `role="status"`, so a screen reader announces the new range after a page loads without a reload.

| Key | Action |
| --- | --- |
| Tab / Shift+Tab | Moves through the page links |
| Enter | Follows the link |

## Razor

```cshtml
@* Numbered pagination: links keep the current query and set ?page=n *@
<ds-pagination page="Model.Rows.Page" page-count="Model.Rows.PageCount" edges />

@* Path URLs instead of a query string *@
<ds-pagination page="3" page-count="12" href-template="/invoices/page/{0}" outline size="sm" />

@* Compact only *@
<ds-pagination page="3" page-count="12" simple />

@* List footer and page size (existing partials) *@
<form method="get" data-ds-autosubmit>
    <partial name="_DsPageSize" model="Model.Rows.PageSize" />
</form>
<partial name="_DsPager" model="Model.Rows.Pager("invoices")" />
```

| Attribute | Effect |
| --- | --- |
| `page`, `page-count` | Current page (1-based) and number of pages |
| `href-template` | URL with `{0}` for the page; default: current URL with `page=n` (`page` is dropped for page 1) |
| `siblings`, `boundaries` | Pages beside the current one (1) and at each end (1) |
| `edges` | First and last page buttons |
| `simple`, `outline`, `size` | Compact form, bordered links, `sm` or `lg` |
| `label` | Overrides the landmark name |

`PageRange.Compute(page, pageCount, siblings, boundaries)` returns the numbers with `null` where an ellipsis goes, for custom markup.

## JavaScript

None. Pagination is links; the page-size select submits through the `data-ds-autosubmit` behaviour of the form.

## Tokens

`--color-primary`, `--color-base-content`, `--color-base-100`, `--color-base-300`, `--ds-quiet`, `--ds-subtle`, `--ds-muted`, `--ds-focus`, `--ds-radius-lg`, `--ds-space-card-x`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-primary-soft`, `--ds-opacity-pager-disabled`, `--ds-duration-fast`, `--ds-ease-standard`.

## Native and daisyUI

Links in a list inside a `<nav>`. daisyUI's `join` and `btn` classes are not used for the numbered form; the footer partial keeps `btn btn-ghost btn-sm` and the page-size select is a daisyUI `select select-sm`.
