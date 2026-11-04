---
title: Tabs
group: components
category: navigation
order: 3
summary: Switch between views of the same object. Underline, pill and boxed styles, panel or link tabs, a sliding indicator, horizontal overflow and vertical layout.
source: TPS app.css .pt-tabs L3639–3642
---

Tabs switch between views of one object: the Overview, Activity and Files of a project, for example. Each tab shows its own panel, or opens its own URL. Use tabs for 2 to 7 peer views. For a single choice that changes how the same data is shown, use a [Segmented control](./segmented-control.md). For ordered steps, use a [Stepper](./stepper.md). For site-wide destinations, use a [Navbar](./navbar.md).

There are two kinds. **Panel tabs** follow the WAI-ARIA tabs pattern: one tab list, one panel per tab, arrow-key navigation, no page load. **Link tabs** are a `<nav>` of links; each tab is a page and the current one has `aria-current="page"`.

## Examples

### Underline

The default. A 2px indicator in `--color-primary` slides to the selected tab on the spring easing. The list has a hairline under it.

```html preview title="Underline tabs (panel tabs)"
<div class="ds-tabs" data-ds-tabs>
  <div class="ds-tabs__list" role="tablist" aria-label="Project PRJ-1024">
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-u-overview" aria-controls="tabs-u-overview-p" aria-selected="true">Overview</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-u-activity" aria-controls="tabs-u-activity-p" aria-selected="false" tabindex="-1">Activity <span class="ds-tabs__count">12</span></button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-u-files" aria-controls="tabs-u-files-p" aria-selected="false" tabindex="-1">Files <span class="ds-tabs__count">4</span></button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-u-billing" aria-controls="tabs-u-billing-p" aria-selected="false" tabindex="-1" disabled>Billing</button>
  </div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-u-overview-p" aria-labelledby="tabs-u-overview" tabindex="0">
    <p>Project PRJ-1024 is on track. Next milestone: design review on 14 Nov 2026.</p>
  </div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-u-activity-p" aria-labelledby="tabs-u-activity" tabindex="0" hidden>
    <p>Ayu Lestari commented on INV-2026-0418 two hours ago. Daniel Okafor approved the budget.</p>
  </div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-u-files-p" aria-labelledby="tabs-u-files" tabindex="0" hidden>
    <p>4 files, 18.4 MB. Last upload by Mei Tanaka on 2 Nov 2026.</p>
  </div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-u-billing-p" aria-labelledby="tabs-u-billing" tabindex="0" hidden>
    <p>Billing is not available on this plan.</p>
  </div>
</div>
```

### Pill and boxed

`is-pill` gives the selected tab a tonal fill and no track. `is-boxed` puts the tabs on a track with a raised thumb, the same look as the [Segmented control](./segmented-control.md) but with panels.

```html preview title="Pill and boxed"
<div class="ds-tabs is-pill" data-ds-tabs>
  <div class="ds-tabs__list" role="tablist" aria-label="Report range">
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-p-day" aria-controls="tabs-p-day-p" aria-selected="true">Day</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-p-week" aria-controls="tabs-p-week-p" aria-selected="false" tabindex="-1">Week</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-p-month" aria-controls="tabs-p-month-p" aria-selected="false" tabindex="-1">Month</button>
  </div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-p-day-p" aria-labelledby="tabs-p-day" tabindex="0"><p>24 invoices issued today.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-p-week-p" aria-labelledby="tabs-p-week" tabindex="0" hidden><p>131 invoices issued this week.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-p-month-p" aria-labelledby="tabs-p-month" tabindex="0" hidden><p>542 invoices issued in November 2026.</p></div>
</div>

<div class="ds-tabs is-boxed" data-ds-tabs style="margin-top:2rem">
  <div class="ds-tabs__list" role="tablist" aria-label="Account">
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-b-profile" aria-controls="tabs-b-profile-p" aria-selected="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-user"/></svg>Profile</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-b-security" aria-controls="tabs-b-security-p" aria-selected="false" tabindex="-1"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-shield"/></svg>Security</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-b-alerts" aria-controls="tabs-b-alerts-p" aria-selected="false" tabindex="-1"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bell"/></svg>Alerts</button>
  </div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-b-profile-p" aria-labelledby="tabs-b-profile" tabindex="0"><p>Sofia Marquez, Finance lead.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-b-security-p" aria-labelledby="tabs-b-security" tabindex="0" hidden><p>Two-factor sign-in is on. Last password change: 3 Oct 2026.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-b-alerts-p" aria-labelledby="tabs-b-alerts" tabindex="0" hidden><p>Email alerts for invoices above 10,000.</p></div>
</div>
```

### Link tabs

Use links when every view has its own URL (so it can be shared, bookmarked and reloaded). There is no tablist role and no panel: the page below the tabs changes. Mark the current page with `aria-current="page"`.

```html preview title="Link tabs"
<nav class="ds-tabs" aria-label="Customer sections" data-ds-tabs>
  <div class="ds-tabs__list">
    <a class="ds-tabs__tab" href="#" aria-current="page">Details</a>
    <a class="ds-tabs__tab" href="#">Invoices <span class="ds-tabs__count">8</span></a>
    <a class="ds-tabs__tab" href="#">Contacts</a>
    <a class="ds-tabs__tab" href="#" aria-disabled="true" title="Available on the Business plan">Contracts</a>
  </div>
</nav>
```

### Manual activation

With `data-ds-activation="manual"` the arrow keys move focus without changing the panel; Enter or Space activates. Use it when panels are expensive to load or when activation changes the URL.

```html preview title="Manual activation"
<div class="ds-tabs" data-ds-tabs data-ds-activation="manual">
  <div class="ds-tabs__list" role="tablist" aria-label="Exports">
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-m-csv" aria-controls="tabs-m-csv-p" aria-selected="true">CSV</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-m-xlsx" aria-controls="tabs-m-xlsx-p" aria-selected="false" tabindex="-1">Spreadsheet</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-m-pdf" aria-controls="tabs-m-pdf-p" aria-selected="false" tabindex="-1">PDF</button>
  </div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-m-csv-p" aria-labelledby="tabs-m-csv" tabindex="0"><p>Plain text, comma separated. Opens in any editor.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-m-xlsx-p" aria-labelledby="tabs-m-xlsx" tabindex="0" hidden><p>One sheet per month, with formulas kept.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-m-pdf-p" aria-labelledby="tabs-m-pdf" tabindex="0" hidden><p>Fixed layout for printing and archiving.</p></div>
</div>
```

### Overflow

When the tabs do not fit, the list scrolls. A fade appears on each side that still has tabs, and small buttons scroll by 60% of the width. The selected tab is brought into view when it changes. Resize the window to see it.

```html preview title="Scrolling tab list"
<div class="ds-tabs" data-ds-tabs style="max-width:28rem">
  <div class="ds-tabs__list" role="tablist" aria-label="Departments">
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-o-1" aria-controls="tabs-o-1-p" aria-selected="true">Finance</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-o-2" aria-controls="tabs-o-2-p" aria-selected="false" tabindex="-1">Engineering</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-o-3" aria-controls="tabs-o-3-p" aria-selected="false" tabindex="-1">Customer support</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-o-4" aria-controls="tabs-o-4-p" aria-selected="false" tabindex="-1">Human resources</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-o-5" aria-controls="tabs-o-5-p" aria-selected="false" tabindex="-1">Legal</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-o-6" aria-controls="tabs-o-6-p" aria-selected="false" tabindex="-1">Operations</button>
  </div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-o-1-p" aria-labelledby="tabs-o-1" tabindex="0"><p>14 people.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-o-2-p" aria-labelledby="tabs-o-2" tabindex="0" hidden><p>38 people.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-o-3-p" aria-labelledby="tabs-o-3" tabindex="0" hidden><p>22 people.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-o-4-p" aria-labelledby="tabs-o-4" tabindex="0" hidden><p>9 people.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-o-5-p" aria-labelledby="tabs-o-5" tabindex="0" hidden><p>5 people.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-o-6-p" aria-labelledby="tabs-o-6" tabindex="0" hidden><p>17 people.</p></div>
</div>
```

### Vertical

`is-vertical` puts the list on the inline-start side, with the indicator on its inline-end edge. Arrow Up and Down move between tabs. Use it for settings pages with 5 or more sections.

```html preview title="Vertical tabs"
<div class="ds-tabs is-vertical" data-ds-tabs>
  <div class="ds-tabs__list" role="tablist" aria-orientation="vertical" aria-label="Settings">
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-v-general" aria-controls="tabs-v-general-p" aria-selected="true">General</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-v-team" aria-controls="tabs-v-team-p" aria-selected="false" tabindex="-1">Team</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-v-billing" aria-controls="tabs-v-billing-p" aria-selected="false" tabindex="-1">Billing</button>
  </div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-v-general-p" aria-labelledby="tabs-v-general" tabindex="0"><p>Workspace name: Northwind. Time zone: Asia/Jakarta.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-v-team-p" aria-labelledby="tabs-v-team" tabindex="0" hidden><p>6 members. 2 pending invitations.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-v-billing-p" aria-labelledby="tabs-v-billing" tabindex="0" hidden><p>Next invoice: INV-2026-0431 on 1 Dec 2026.</p></div>
</div>
```

### Sizes

`is-sm` (32px tabs) and `is-lg` (48px tabs). The default is 40px. On touch screens every size grows to 44px.

```html preview title="Sizes"
<div class="ds-tabs is-sm" data-ds-tabs>
  <div class="ds-tabs__list" role="tablist" aria-label="Small">
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-s-a" aria-selected="true">Small</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-s-b" aria-selected="false" tabindex="-1">Compact</button>
  </div>
</div>
<div class="ds-tabs is-lg" data-ds-tabs style="margin-top:1.5rem">
  <div class="ds-tabs__list" role="tablist" aria-label="Large">
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-l-a" aria-selected="true">Large</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-l-b" aria-selected="false" tabindex="-1">Spacious</button>
  </div>
</div>
```

## States

Selected, disabled and a tab with a count are shown below. Hover, pressed and focus come from the pointer and keyboard: hover tints the tab with 6% of the text colour, pressed with 10%, focus draws the 2px ring inside the tab (an outer ring would be clipped by the scrolling list).

```html preview title="Selected, disabled, aria-disabled, count"
<div class="ds-tabs is-boxed" data-ds-tabs>
  <div class="ds-tabs__list" role="tablist" aria-label="States">
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-st-1" aria-selected="true">Selected</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-st-2" aria-selected="false" tabindex="-1">Rest</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-st-3" aria-selected="false" tabindex="-1" disabled>Disabled</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-st-4" aria-selected="false" tabindex="-1" aria-disabled="true" title="Requires the Business plan">Locked</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-st-5" aria-selected="false" tabindex="-1">Count <span class="ds-tabs__count">128</span></button>
  </div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | none | `--ds-subtle` text, no fill |
| Hover | pointer over the tab (devices with hover) | text becomes `--color-base-content`, 6% tint |
| Pressed | pointer down | 10% tint, no scale |
| Focus-visible | keyboard focus | 2px `--ds-focus` ring inside the tab |
| Selected | `aria-selected="true"` or `aria-current="page"` | full-contrast text, sliding indicator (underline, tonal pill or raised thumb) and a tonal count |
| Disabled | `disabled` | 55% opacity, `not-allowed` cursor, skipped by arrow keys |
| aria-disabled | `aria-disabled="true"` | same look; keeps its tooltip explaining why; skipped by arrow keys, click is ignored |
| Overflow | list wider than the container | edge fades on the hidden sides, scroll buttons |
| Without JavaScript | `data-ds-ready` not set | the selected tab carries its own underline or fill; panels need the script to switch |

## Anatomy

- `.ds-tabs` root. Modifiers: `is-pill`, `is-boxed`, `is-vertical`, `is-sm`, `is-lg`, `is-full`.
- `.ds-tabs__list` the row of tabs (`role="tablist"` for panel tabs). Scrolls horizontally.
- `.ds-tabs__tab` one tab: a `<button role="tab">` or an `<a>`.
- `.ds-tabs__count` optional count after the label.
- `.ds-tabs__panel` the panel (`role="tabpanel"`).
- `.ds-tabs__indicator` and `.ds-tabs__scroll` are created by `tabs.js`.

## Usage

- Use 2 to 7 tabs. Past 7, group the views or use a [Navigation menu](./navigation-menu.md).
- Keep labels to one or two words, 24 characters at most. Indonesian labels grow about 40%; the list scrolls rather than wraps.
- Put the most used view first and select it by default.
- Do not nest tabs inside tabs.
- Do not use tabs for steps that must be done in order; use a [Stepper](./stepper.md).
- Use link tabs when a view needs its own URL; use panel tabs when switching should not reload the page.
- Disabled tabs hide the reason. Prefer `aria-disabled="true"` with a `title` or a tooltip that says why.
- Do not put a primary button inside the tab list.

## Accessibility

Panel tabs follow the [WAI-ARIA tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/). The list has `role="tablist"` and an accessible name, each tab has `role="tab"`, `aria-selected` and `aria-controls`, each panel has `role="tabpanel"` and `aria-labelledby`. Only the selected tab is in the Tab order (`tabindex="0"`); the others are `-1`. Panels are focusable (`tabindex="0"`) so keyboard users can reach content that has no focusable element.

| Key | Action |
| --- | --- |
| Tab | Moves into the list on the selected tab, then to the panel |
| Arrow Right / Arrow Left | Next or previous tab (swapped in right-to-left pages); wraps at the ends |
| Arrow Down / Arrow Up | Next or previous tab in vertical tabs |
| Home / End | First or last enabled tab |
| Enter / Space | Activates the focused tab (manual activation only) |

- Automatic activation (default) selects the tab as focus arrives. Use `data-ds-activation="manual"` when showing a panel is slow.
- Contrast: unselected text is `--ds-subtle` (above 4.5:1 on both themes); the indicator is `--color-primary`, above 3:1 against the surface.
- Selected is never colour alone: the indicator, tonal fill or raised thumb marks it.
- Scroll buttons are a pointer aid and are removed from the Tab order and the accessibility tree; keyboard users scroll with the arrow keys, which also reveal the focused tab.
- Motion: the indicator travels on `--ds-ease-spring` over `--ds-duration-spring` (500ms) with no overshoot, starts from where it is on screen if interrupted, and jumps under `prefers-reduced-motion`. Panels fade in with a 5px rise over 160ms.
- Forced colours: the indicator and the selected tab use `Highlight`.

## Razor

```cshtml
<ds-tabs label="Project PRJ-1024" variant="underline" hash>
    <ds-tab id="overview" label="Overview">
        <p>Project PRJ-1024 is on track.</p>
    </ds-tab>
    <ds-tab id="activity" label="Activity" count="12" icon="history">
        <partial name="_Activity" model="Model.Activity" />
    </ds-tab>
    <ds-tab id="billing" label="Billing" disabled>Not available on this plan.</ds-tab>
</ds-tabs>

@* Link tabs: href on every tab, current on the open page *@
<ds-tabs label="Customer sections">
    <ds-tab label="Details" href="/customers/42" current />
    <ds-tab label="Invoices" href="/customers/42/invoices" count="8" />
</ds-tabs>
```

| Attribute | Effect |
| --- | --- |
| `label` | Accessible name of the tab list or the link nav |
| `variant` | `underline` (default), `pill`, `boxed` |
| `size` | `sm`, `md` (default), `lg` |
| `vertical`, `full` | Vertical layout; tabs share the width |
| `manual` | Manual activation |
| `hash` | Sync the selected tab with the URL hash |
| `selected` | Id of the tab selected on first render (default: the first enabled) |

`ds-tab` takes `id`, `label`, `icon`, `count`, `disabled`, and for link tabs `href` and `current`. Child content of a panel tab is its panel.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-tabs` | On the `.ds-tabs` root: ARIA wiring, roving tabindex, indicator, overflow |
| `data-ds-activation="manual"` | Arrow keys move focus only; Enter or Space selects |
| `data-ds-tabs-hash` | Select the tab named by the URL hash and update the hash on change |
| `data-ds-tab="name"` | Name used for the hash (default: the panel id) |

```js
DS.tabs.select("#project-tabs", 2);          // by index, tab id or tab element
DS.tabs.refresh("#project-tabs");            // re-measure after the layout changed
document.addEventListener("ds:tabs:change", (e) => {
  console.log(e.detail.tab.id, e.detail.panel?.id);
});
```

`ds:tabs:change` bubbles from the root and carries `tab`, `panel`, `index` and `previous`. Call `DS.init(root)` after inserting tabs dynamically.

## Tokens

`--color-primary`, `--color-base-100`, `--color-base-200`, `--color-base-300`, `--color-base-content`, `--ds-subtle`, `--ds-quiet`, `--ds-focus`, `--ds-radius-lg`, `--ds-radius-xl`, `--ds-radius-full`, `--ds-shadow-xs`, `--ds-size-target`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-primary-soft`, `--ds-opacity-disabled`, `--ds-duration-fast`, `--ds-duration-quick`, `--ds-duration-spring`, `--ds-ease-standard`, `--ds-ease-emphasized`, `--ds-ease-spring`, `--ds-enter-offset`.

## Native and daisyUI

Panel tabs are `<button role="tab">` and `<div role="tabpanel">`; link tabs are `<a>` inside a `<nav>`. daisyUI's `.tabs` and `.tab` classes still work on their own, and the DS only aligns their focus ring and disabled look. For the DS tabs, daisyUI names are accepted as aliases on the root: `tabs-border` equals the default underline, `tabs-box` equals `is-boxed`, `tabs-sm` and `tabs-lg` equal `is-sm` and `is-lg`. The v1 markup (`<nav class="ds-tabs">` with links as direct children) keeps working and renders as boxed tabs.
