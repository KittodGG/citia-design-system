---
title: Empty state
group: components
category: feedback
order: 6
summary: What a list, table or page shows when it has nothing to show: first use, no results after filtering, an error with retry, no permission, and a compact inline form.
source: TPS app.css .pt-empty L3587–3590, .master-empty L1674–1687, _EmptyState partial
---

An empty state replaces content that is not there. It says why, in one sentence, and offers the one thing the person can do about it. The reason decides the variant: nothing created yet (first use), nothing matches (no results), the data could not be loaded (error) or the person may not see it (permission). While data is loading use a skeleton; an empty state appears only when loading has finished.

## Examples

First use. The person has never created one of these. Say what the thing is for and offer the primary action; a secondary link is optional.

```html preview title="First use"
<div class="ds-empty is-first-use is-boxed">
  <span class="ds-empty-icon"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-briefcase"></use></svg></span>
  <h2>Create your first project</h2>
  <p>Projects group invoices, files and comments for one client. Add one to start tracking work.</p>
  <div class="ds-empty__actions">
    <a class="btn btn-primary btn-sm" href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg>New project</a>
    <a class="btn btn-ghost btn-sm" href="#">Import from CSV</a>
  </div>
</div>
```

No results. Data exists but the filters hide it. Name the filters and offer to clear them.

```html preview title="No results"
<div class="ds-empty is-no-results is-boxed">
  <span class="ds-empty-icon"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-search"></use></svg></span>
  <h2>No invoices match these filters</h2>
  <p>Status "Overdue" and client "Mei Tanaka" return no invoices. Remove a filter or search for something else.</p>
  <div class="ds-empty__actions">
    <button type="button" class="btn btn-sm">Clear filters</button>
  </div>
</div>
```

Error. The data could not be loaded. Say what failed and offer a retry; keep the technical detail out of the sentence.

```html preview title="Error with retry"
<div class="ds-empty is-error is-boxed">
  <span class="ds-empty-icon"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg></span>
  <h2>We could not load invoices</h2>
  <p>The server did not answer. Your data is safe. Check your connection and try again.</p>
  <div class="ds-empty__actions">
    <button type="button" class="btn btn-primary btn-sm"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-refresh"></use></svg>Try again</button>
  </div>
  <p class="ds-empty__hint">Reference 7F3A-2026-1102</p>
</div>
```

Permission. The person is signed in but may not see this. Say who can grant access.

```html preview title="No permission"
<div class="ds-empty is-permission is-boxed">
  <span class="ds-empty-icon"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-lock"></use></svg></span>
  <h2>You do not have access to billing</h2>
  <p>Only workspace admins can see invoices and payment methods. Ask Ayu Lestari to add you.</p>
  <div class="ds-empty__actions">
    <button type="button" class="btn btn-sm">Request access</button>
  </div>
</div>
```

Compact inline. For a table body, a card or a menu: one row, small icon, one sentence, an optional action.

```html preview title="Compact inline"
<div style="display:grid;gap:.75rem;border:1px solid var(--color-base-300);border-radius:var(--ds-radius-box)">
  <div class="ds-empty is-compact">
    <span class="ds-empty-icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file"></use></svg></span>
    <h3>No files yet</h3>
    <p>Drop files here or choose them.</p>
    <div class="ds-empty__actions"><button type="button" class="btn btn-sm">Upload</button></div>
  </div>
  <div class="ds-empty is-compact is-no-results" style="border-top:1px solid var(--color-base-300)">
    <span class="ds-empty-icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg></span>
    <h3>No matches for "Okafor"</h3>
  </div>
</div>
```

## States

An empty state is static; its states belong to its action buttons and to the loading sequence around it.

| State | Trigger | Appearance |
| --- | --- | --- |
| First use | Nothing created | 56px primary-tinted icon, heading, sentence, primary action and optional secondary |
| No results | Filters hide everything | Neutral icon (search), names the filters, "Clear filters" |
| Error | Load failed | Error-tinted icon, retry button, optional reference |
| Permission | Access denied | Warning-tinted icon (lock), who can grant access |
| Compact | `is-compact` | One row, 32px icon, 14px heading |
| Boxed | `is-boxed` | Dashed 1px border and the page surface; for a whole page or panel |
| Retrying | `aria-busy="true"` on the retry button | Spinner before the label, same width, input blocked |
| Button states | On the actions | Hover, pressed, focus-visible and disabled as on any [button](./button.md) |

The tint of the icon circle is a supporting cue only: the icon shape and the heading say the same thing in words.

## Anatomy

- `.ds-empty`: the container, centred column. Variants `is-first-use`, `is-no-results`, `is-error`, `is-permission`, `is-compact`; `is-boxed` adds the dashed border.
- `.ds-empty-icon` (also `.ds-empty__icon`): the 48px circle holding the icon.
- A heading (`h2`, `h3` or `h4`), `p` for the sentence.
- `.ds-empty__actions`: one or two actions. A direct child `.btn` also works for the version 1 markup.
- `.ds-empty__hint`: a small line such as an error reference.

## Usage

- One heading of at most 50 characters and one sentence of at most 2 lines (about 160 characters).
- Write what the person can do, not an apology: "Create your first project", not "Sorry, nothing here".
- Use one primary action. A second action is a ghost button or a link.
- Name the filters in a no-results message and put "Clear filters" next to the sentence.
- Match the heading level to the page: `h2` for a page, `h3` inside a card that has an `h2`.
- Do not show an empty state while loading; use a skeleton and replace it when the data arrives.
- Do not use an illustration that fills the screen. The icon circle is enough.
- Do not use the error variant for a failure that has a better home, such as a form error next to its field.

## Accessibility

- The heading names the situation, so screen reader users who jump by heading find it. When the empty state replaces content after a filter change, announce it: put `role="status"` on the container or update a live region ("0 results").
- The icon is decorative (`aria-hidden="true"`).
- Actions are normal buttons or links with visible text; the focus ring is 2px.
- Contrast: the heading is the full text colour and the sentence is `--ds-subtle` (4.5:1 or more); the icon circle is a tint over the surface and the icon reaches 3:1.

| Key | Action |
| --- | --- |
| Tab | Moves to the actions |
| Enter, Space | Activates the focused action |

There is no motion in the empty state itself; the container does not animate in, so a result list that empties does not flash.

## Razor

The tag helper renders the standard empty state: icon, heading, sentence and one action. Use plain markup for the other variants.

```cshtml
<ds-empty icon="briefcase" title="Create your first project" action-label="New project" action-href="/Projects/Create" boxed>
    Projects group invoices, files and comments for one client.
</ds-empty>

<div class="ds-empty is-no-results is-boxed">
    <span class="ds-empty-icon"><ds-icon name="search" size="lg" /></span>
    <h2>No invoices match these filters</h2>
    <p>Remove a filter or search for something else.</p>
    <div class="ds-empty__actions"><a class="btn btn-sm" href="?">Clear filters</a></div>
</div>
```

| Attribute | Effect |
| --- | --- |
| `icon`, `title` | Icon name and heading |
| `action-label`, `action-href`, `action-icon` | The single primary action |
| `boxed` | Dashed border |
| `level` | Heading level 2 to 4 |

## Tokens

`--color-primary`, `--color-error`, `--color-warning`, `--ds-subtle`, `--ds-muted`, `--color-base-100`, `--color-base-300`, `--ds-radius-box`, `--ds-radius-full`, `--ds-type-section-size`, `--ds-type-callout-size`.

## Native and daisyUI

An empty state is a `div` with a heading, a paragraph and daisyUI `btn` buttons. The DS does not use daisyUI's `hero`. The `.btn` margin for the version 1 direct-child button lives in the utilities layer so it beats daisyUI's button rules.
