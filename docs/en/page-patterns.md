---
title: Page patterns
group: patterns
order: 1
summary: Eight page patterns on one app shell: list, detail, form, dashboard, settings, sign-in, first-run empty state and error pages, each with a live example and rules.
---

Every page in an application is one of eight patterns that run on one shell. A pattern fixes the order of the blocks, not their content: title on the start side, actions on the end side, one primary button, content inside a surface, the same spacing everywhere.

The examples use the DS classes from [App shell](./app-shell.md), [Page header](./page-header.md), [Table](./table.md), [Form](./form.md) and [Card](./card.md). Razor snippets use the package APIs described in [Razor and C# API](./razor-api.md).

## The shell

The shell is a sidebar, a sticky top bar and one `<main>`. Pages never repeat shell elements. Inside `main`, `.ds-page` stacks blocks with a 24px gap in this order: page header, toolbar or counts, then one or more surfaces.

| Block | Class | Rule |
| --- | --- | --- |
| Page header | `.ds-page-header` | One `<h1>` (`.ds-page-title`), one actions group on the end side, at most one muted line below the title |
| Counts | `.ds-counts` | One line of facts: "12 projects", "9 active" |
| Toolbar | `.ds-toolbar` | Text on the start side, actions on the end side; export on the start side, import and create on the end side |
| Surface | `.ds-surface`, `.ds-card` | Tables, forms and details always sit in a surface; the page background is not content |

## List page

Order: page header, counts, a surface with the table toolbar (search, filters, page size), the table and the pager. Search and filters use `GET` so the URL can be shared and the browser back button works. See [Data pattern](./data-pattern.md) for the rules of search, sort and paging.

```html preview title="List page"
<div class="ds-page">
  <header class="ds-page-header">
    <div><h1 class="ds-page-title">Projects</h1></div>
    <div class="ds-actions">
      <a class="btn btn-primary btn-sm" href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg>New project</a>
    </div>
  </header>
  <div class="ds-counts"><span><strong>12</strong> projects</span><span>9 active</span><span>3 on hold</span></div>
  <section class="ds-surface" aria-label="Project list">
    <form class="ds-table-toolbar" role="search">
      <div>
        <label for="pp-list-q">Search projects</label>
        <div class="ds-search">
          <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg>
          <input id="pp-list-q" type="search" class="input" placeholder="Search by code or name">
        </div>
      </div>
      <div>
        <label for="pp-list-status">Status</label>
        <select id="pp-list-status" class="select"><option>All statuses</option><option>Active</option><option>On hold</option></select>
      </div>
      <button type="button" class="btn">Apply</button>
    </form>
    <table class="ds-list-table">
      <thead><tr>
        <th scope="col" aria-sort="ascending"><a class="ds-sort" href="#">Code <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-arrow-up"></use></svg></a></th>
        <th scope="col">Name</th>
        <th scope="col">Owner</th>
        <th scope="col" class="ds-num">Budget</th>
        <th scope="col">Status</th>
      </tr></thead>
      <tbody>
        <tr>
          <td class="ds-primary-cell"><a href="#">PRJ-1024</a></td>
          <td data-label="Name">Warehouse sensors</td>
          <td data-label="Owner">Ayu Lestari</td>
          <td data-label="Budget" class="ds-num">48,500.00</td>
          <td data-label="Status"><span class="ds-status is-active">Active</span></td>
        </tr>
        <tr>
          <td class="ds-primary-cell"><a href="#">PRJ-1031</a></td>
          <td data-label="Name">Customer portal</td>
          <td data-label="Owner">Daniel Okafor</td>
          <td data-label="Budget" class="ds-num">112,000.00</td>
          <td data-label="Status"><span class="ds-status is-inactive">On hold</span></td>
        </tr>
      </tbody>
    </table>
    <footer class="ds-pager">
      <p role="status">1–10 of 12 projects</p>
      <nav aria-label="Pagination">
        <a class="btn btn-ghost btn-sm" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-left"></use></svg> Previous</a>
        <span class="ds-num">Page 1 of 2</span>
        <a class="btn btn-ghost btn-sm" href="#">Next <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-right"></use></svg></a>
      </nav>
    </footer>
  </section>
</div>
```

Rules:

- The first column is the identity (code or name) and a link to the detail page.
- Align numbers to the end with `.ds-num` and tabular figures; put units in `.ds-unit`, not in each cell.
- Design a state for 0 rows ([Empty state](./empty-state.md)), for loading ([Skeleton](./skeleton.md)) and for errors (an [Alert](./alert.md) above the table, with a retry action).
- Under 640px rows become labelled cards from each cell's `data-label`; a wide transactional table scrolls inside `.ds-table-scroll` instead.

```cshtml
@model ListPage<ProjectRow>
<partial name="_DsSortHeader" model='new SortHeaderModel("Code", "code", Model.Sort)' />
<partial name="_DsPager" model='Model.Pager("projects")' />
```

## Detail page

Order: page header with the status, one surface with a description list, secondary sections (history, related items), then a footer with Back on the start side and the main action on the end side. Destructive actions are ghost buttons, never primary.

```html preview title="Detail page"
<div class="ds-page">
  <header class="ds-page-header">
    <div><h1 class="ds-page-title">PRJ-1024 Warehouse sensors</h1></div>
    <span class="ds-status is-active">Active</span>
  </header>
  <section class="ds-surface">
    <div class="ds-card-body is-roomy">
      <dl class="ds-dl is-detail">
        <div><dt>Owner</dt><dd>Ayu Lestari</dd></div>
        <div><dt>Budget</dt><dd>48,500.00</dd></div>
        <div><dt>Start</dt><dd>12 Jan 2026</dd></div>
        <div><dt>Linked invoices</dt><dd>3</dd></div>
      </dl>
      <div class="ds-section">
        <h2 class="ds-section-title"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-history"></use></svg>History</h2>
        <ul class="ds-feed">
          <li>
            <span class="ds-feed-dot is-info"></span>
            <div><p class="ds-feed-title">Budget changed from 45,000.00 to 48,500.00</p><p class="ds-feed-sub">Daniel Okafor</p></div>
            <time class="ds-feed-time">01 Nov 2026 14:30</time>
          </li>
          <li>
            <span class="ds-feed-dot is-success"></span>
            <div><p class="ds-feed-title">Project created</p><p class="ds-feed-sub">Ayu Lestari</p></div>
            <time class="ds-feed-time">12 Jan 2026 09:12</time>
          </li>
        </ul>
      </div>
    </div>
    <div class="ds-form-actions">
      <a class="btn" href="#">Back to projects</a>
      <div>
        <button type="button" class="btn btn-ghost is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg>Delete</button>
        <a class="btn btn-primary" href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg>Edit project</a>
      </div>
    </div>
  </section>
</div>
```

Rules:

- Keep the record's identity visible when the page scrolls (code in the title).
- Order history newest first and show absolute dates; relative time ("2 h ago") goes in `title`, not in place of the date.
- Links to the page the user came from carry a local `returnUrl`; do not use `history.back()`. See [Workflows](./workflows.md).

## Create and edit form page

Order: page header, optional error summary, one surface with fieldsets, an optional group, then the form footer. The same layout serves create and edit; only the title and the button label change ("New project" and "Create project", "Edit project" and "Save changes"). The full rules (validation timing, dirty guard, multi-step) are in [Forms pattern](./forms-pattern.md).

```html preview title="Form page with an error"
<div class="ds-page">
  <header class="ds-page-header"><div><h1 class="ds-page-title">New project</h1></div></header>
  <div class="ds-error-summary" role="alert" tabindex="-1">
    <h2>The project was not saved</h2>
    <p>Fix 1 field below.</p>
    <ul><li><a href="#pp-form-budget">Enter the budget as a number, for example 48500 or 48500.50.</a></li></ul>
  </div>
  <section class="ds-surface">
    <div class="ds-card-body is-roomy">
      <div class="ds-form">
        <fieldset class="ds-fieldset">
          <legend>Project details</legend>
          <div class="ds-field-grid">
            <div class="ds-field">
              <label for="pp-form-name">Name</label>
              <input id="pp-form-name" class="input" value="Warehouse sensors" required>
            </div>
            <div class="ds-field">
              <label for="pp-form-budget">Budget</label>
              <input id="pp-form-budget" class="input" inputmode="decimal" value="48k" aria-invalid="true" aria-describedby="pp-form-budget-hint pp-form-budget-error">
              <p id="pp-form-budget-hint" class="ds-hint">Digits with a decimal point, for example 48500.50.</p>
              <p id="pp-form-budget-error" class="ds-field-error">Enter the budget as a number, for example 48500 or 48500.50.</p>
            </div>
          </div>
        </fieldset>
        <details class="ds-optional-group">
          <summary>Additional information <small>optional</small></summary>
          <div class="ds-field-grid">
            <div class="ds-field is-wide">
              <label for="pp-form-notes">Notes</label>
              <textarea id="pp-form-notes" class="textarea" rows="2"></textarea>
            </div>
          </div>
        </details>
      </div>
    </div>
    <div class="ds-form-actions">
      <a class="btn" href="#" data-ds-guard-skip>Cancel</a>
      <div>
        <button type="button" class="btn">Save and add another</button>
        <button type="button" class="btn btn-primary">Create project</button>
      </div>
    </div>
  </section>
</div>
```

Rules:

- One primary button, on the end side of the footer; Cancel on the start side, never primary.
- Use `.ds-field-grid` for two columns; it collapses to one column under 640px.
- After a successful save, redirect and show a toast (Post/Redirect/Get), see [Workflows](./workflows.md).

## Dashboard

Order: page header with an eyebrow line, a row of KPI tiles, then cards (chart, activity feed, a short table). A dashboard answers "what needs me?" first: put items that need action before totals.

```html preview title="Dashboard"
<div class="ds-page">
  <header class="ds-page-header is-portal">
    <div>
      <p class="ds-eyebrow">Monday, 02 Nov 2026</p>
      <h1 class="ds-page-title">Overview</h1>
    </div>
  </header>
  <div class="ds-kpis">
    <div class="ds-kpi is-primary">
      <div class="ds-kpi-top"><span class="ds-kpi-label">Open projects</span><span class="ds-kpi-icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-briefcase"></use></svg></span></div>
      <p class="ds-kpi-value">24</p>
      <p class="ds-kpi-sub">3 started this week</p>
    </div>
    <a class="ds-kpi is-warning" href="#">
      <div class="ds-kpi-top"><span class="ds-kpi-label">Awaiting approval</span><span class="ds-kpi-icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-clock"></use></svg></span></div>
      <p class="ds-kpi-value">5</p>
      <p class="ds-kpi-sub">Oldest waiting 4 days. Open the list.</p>
    </a>
    <a class="ds-kpi is-error" href="#">
      <div class="ds-kpi-top"><span class="ds-kpi-label">Overdue invoices</span><span class="ds-kpi-icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-alert"></use></svg></span></div>
      <p class="ds-kpi-value">2</p>
      <p class="ds-kpi-sub">INV-2026-0418 and 1 more</p>
    </a>
  </div>
  <div class="ds-grid-2">
    <article class="ds-card">
      <header class="ds-card-head"><h2>Invoices per day</h2><p>29–30 Oct 2026</p></header>
      <div class="ds-card-body">
        <svg class="ds-chart" viewBox="0 0 200 90" role="img" aria-label="Invoices: 29 October 38, 30 October 21.">
          <line class="ds-grid-line" x1="10" x2="200" y1="80" y2="80"/>
          <g><title>29 Oct: 38 invoices</title><rect class="ds-bar s-success" x="40" y="10" width="50" height="70"/></g>
          <g><title>30 Oct: 21 invoices</title><rect class="ds-bar s-success" x="110" y="42" width="50" height="38"/></g>
          <text x="65" y="88" text-anchor="middle">29 Oct</text>
          <text x="135" y="88" text-anchor="middle">30 Oct</text>
        </svg>
      </div>
    </article>
    <article class="ds-card">
      <header class="ds-card-head"><h2>Recent activity</h2></header>
      <div class="ds-card-body is-flush">
        <ul class="ds-feed">
          <li>
            <span class="ds-feed-dot is-success"></span>
            <div><p class="ds-feed-title">INV-2026-0419 paid</p><p class="ds-feed-sub">Mei Tanaka · 2,480.00</p></div>
            <time class="ds-feed-time">14:30</time>
          </li>
          <li>
            <span class="ds-feed-dot is-error"></span>
            <div><p class="ds-feed-title">Payment failed: card declined</p><p class="ds-feed-sub">Sofia Marquez · INV-2026-0420</p></div>
            <time class="ds-feed-time">13:05</time>
          </li>
        </ul>
      </div>
    </article>
  </div>
</div>
```

Rules:

- At most 4 KPI tiles in a row; each tile is one number, one label and one line of context. A tile that leads somewhere is a link.
- Every chart has `role="img"` and an `aria-label` that states the key numbers; a [table](./table.md) alternative is one click away.
- No gradients and no decoration. Colour marks status only.

## Settings

Settings pages group options in fieldsets inside one surface. Options apply on save, not instantly, unless the page says "Changes apply immediately". Group related options under a legend; explain each option in one line under its label.

```html preview title="Settings page"
<div class="ds-page">
  <header class="ds-page-header"><div><h1 class="ds-page-title">Notifications</h1><p class="ds-page-desc">Choose what reaches you and where.</p></div></header>
  <section class="ds-surface">
    <div class="ds-card-body is-roomy">
      <div class="ds-form">
        <fieldset class="ds-fieldset">
          <legend>Email</legend>
          <label class="ds-check-row">
            <input type="checkbox" class="checkbox" checked>
            <span><strong>Invoice paid</strong><small>One email when a customer pays an invoice.</small></span>
          </label>
          <label class="ds-check-row">
            <input type="checkbox" class="checkbox">
            <span><strong>Weekly summary</strong><small>Every Monday at 08:00.</small></span>
          </label>
        </fieldset>
        <fieldset class="ds-fieldset">
          <legend>Language</legend>
          <div class="ds-field">
            <label for="pp-set-lang">Interface language</label>
            <select id="pp-set-lang" class="select"><option>English</option><option>Bahasa Indonesia</option></select>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="ds-form-actions">
      <a class="btn" href="#" data-ds-guard-skip>Cancel</a>
      <div><button type="button" class="btn btn-primary">Save changes</button></div>
    </div>
  </section>
</div>
```

Rules:

- A destructive setting (delete account, revoke a key) lives in its own surface at the bottom, with a confirmation dialog.
- Secrets are shown once and masked afterwards; offer Copy next to the value.
- Use a [Switch](./switch.md) only for options that take effect immediately; use checkboxes in a form that has a Save button.

## Sign-in

One panel, one task: title, one sentence, the form, one primary button, one line of help. Errors appear in a `role="alert"` note above the fields and never say which of email or password was wrong.

```html preview title="Sign-in panel"
<div class="ds-auth-panel">
  <h1 class="ds-auth-title">Sign in to Northwind Portal</h1>
  <p class="ds-auth-subtitle">Use the account your administrator created for you.</p>
  <form class="ds-auth-form" novalidate>
    <div class="ds-note is-error" role="alert" tabindex="-1">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg>
      <p>The email or password is not correct. Check both and try again.</p>
    </div>
    <div class="ds-field">
      <label for="pp-in-email">Email</label>
      <input id="pp-in-email" type="email" class="input" autocomplete="username" autocapitalize="none" spellcheck="false" value="ayu.lestari@example.com">
    </div>
    <div class="ds-field">
      <label for="pp-in-pass">Password</label>
      <div class="ds-password">
        <input id="pp-in-pass" type="password" class="input" autocomplete="current-password">
        <button type="button" class="ds-password-toggle" data-ds-password-toggle aria-controls="pp-in-pass" aria-pressed="false" aria-label="Show password">
          <svg class="ds-icon" data-ds-password-icon="hidden" aria-hidden="true"><use href="#ds-icon-eye"></use></svg>
          <svg class="ds-icon" data-ds-password-icon="shown" aria-hidden="true" hidden><use href="#ds-icon-eye-off"></use></svg>
        </button>
      </div>
    </div>
    <label class="ds-check-row"><input type="checkbox" class="checkbox checkbox-primary"><span><strong>Keep me signed in</strong></span></label>
    <button type="button" class="btn btn-primary">Sign in</button>
  </form>
  <p class="ds-auth-note">Forgot your password? Contact your administrator.</p>
</div>
```

Rules:

- Set `autocomplete="username"` and `current-password` so password managers work; never block paste.
- No gradients or illustration on the form side; a hero image belongs to the separate hero column of [Auth layout](./auth-layout.md) and hides under 1024px.
- After 5 failed attempts show a rate-limit message with the wait time, not a generic error.

## First-run empty state

A page with no data yet is a chance to start, not an error. Show an icon, one sentence that says what will live here, and one primary action. Do not show filters, an empty table or a pager.

```html preview title="First-run empty state"
<div class="ds-page">
  <header class="ds-page-header"><div><h1 class="ds-page-title">Invoices</h1></div></header>
  <div class="ds-empty is-boxed">
    <span class="ds-empty-icon"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-receipt"></use></svg></span>
    <h2>No invoices yet</h2>
    <p>Invoices you create appear here with their status and due date.</p>
    <a class="btn btn-primary btn-sm" href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg>Create invoice</a>
  </div>
</div>
```

Distinguish three empty cases: first run (no data exists, offer the create action), no results (filters match nothing, offer "Clear filters") and no access (explain who can grant it). See [Empty state](./empty-state.md).

## Error pages

An error page says what happened and where to go next, in one sentence and one primary button. It never shows a system message, SQL or a stack trace. It shows a request ID so support can find the log entry. The page uses `.ds-empty` with an `<h1>`.

| Code | Sentence |
| --- | --- |
| 400 | The request could not be processed. Reload the page and try again. |
| 403 | You do not have access to this page. |
| 404 | The page or record was not found. |
| 429 | Too many requests. Wait a moment and try again. |
| 500 | Something went wrong while processing your request. |

```html preview title="Error page"
<div class="ds-empty is-boxed">
  <span class="ds-empty-icon"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-alert"></use></svg></span>
  <h1>The page or record was not found.</h1>
  <p>The link may have expired, or the record was deleted.</p>
  <a class="btn btn-primary btn-sm" href="#">Back to overview</a>
  <p class="ds-text-subtle">Request ID: <span class="ds-id">0HN7K2M9QX4B3:00000001</span></p>
</div>
```

```csharp
app.UseExceptionHandler("/Error");
app.UseStatusCodePagesWithReExecute("/Error/{0}");
```

## Responsive behaviour

| Width | What changes |
| --- | --- |
| 640px and below | Page header stacks; tables become labelled cards; `.ds-field-grid` is one column; form footer stacks with the primary action on top; inputs are 16px so iOS does not zoom |
| Below 1024px | Sidebar becomes a drawer from the start side; the auth hero hides |
| 1024px and above | Fixed sidebar of 16rem, collapsible to a 4.75rem rail; page padding grows to 2rem |
| 1180px and below | `.ds-toolbar` becomes one column; the action group moves to its own row |

Test each page at 360px, 768px and 1280px, in light and dark, in English and Indonesian.

## Usage

- Use exactly one `<h1>` per page and do not skip heading levels.
- Use one primary button per header or footer.
- Put tables and forms in `.ds-surface` or `.ds-card`.
- Put export on the start side and import or create on the end side of a toolbar.
- Do not use gradients, glass or decoration on sign-in and dashboard pages.
- Do not use `history.back()` for in-page Back links; use a local `returnUrl`.
