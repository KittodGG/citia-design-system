---
title: daisyUI alignment
group: reference
order: 2
summary: How every daisyUI 5 component reads the design-system tokens, which batch refines it, its DS equivalent, and the restyled components without an owner.
---

The design system builds on daisyUI 5.7: `.btn`, `.input`, `.select`, `.checkbox`, `.menu`, `.modal` and the rest stay usable, and the DS refines them instead of replacing them. This page lists every daisyUI component, where its DS look comes from and which DS component to prefer. For bare HTML without classes, see [native elements](./native-elements.md). [Bahasa Indonesia](../id/daisyui.md).

Two mechanisms apply:

1. **Global variables.** `generated/tokens.css` defines every daisyUI theme variable per theme (`light`, `dark`, aliases `tps`, `tps-dark`), so all components read DS colours, radii and sizes, with no depth gradient and no noise. daisyUI's own themes stay off.
2. **Component rules.** daisyUI 5 emits every component inside the `utilities` layer (sub-layers `daisyui.l1` to `l3`). DS rules that must win sit directly in `@layer utilities`, which beats any sub-layer whatever the specificity. Owner batches refine their component in their own file; `daisyui-overrides.css` restyles the components without an owner, with `:where()` selectors so Tailwind utilities and owner refinements still win.

## Global variables

| Variable | DS value | Effect |
| --- | --- | --- |
| `--color-base-100/200/300`, `--color-base-content` | DS surfaces and text | Every surface, border and text colour |
| `--color-primary` … `--color-error` and `-content` | Teal primary, status colours | Every tone class (`btn-primary`, `badge-success`, …) |
| `--radius-selector` | 0.375rem (`--ds-radius-md`) | Checkbox, toggle, badge, tab |
| `--radius-field` | 0.375rem | Button, input, select, join items |
| `--radius-box` | 0.625rem (`--ds-radius-box`) | Card, modal, alert, dropdown, mockups |
| `--size-selector` | 0.25rem | Checkbox, radio, toggle base size (×6 = 24px) |
| `--size-field` | 0.25rem | Button, input, select base height (×10 = 40px; the DS lifts targets to 44px) |
| `--border` | 1px | Every component border |
| `--depth` | 0 | No inset gradient or drop shadow on buttons and fields |
| `--noise` | 0 | No noise texture |

## Examples

Components without an owner batch, restyled in `daisyui-overrides.css`.

### Chat

```html preview title="chat, chat-bubble tones, header and footer"
<div style="max-width:34rem">
  <div class="chat chat-start">
    <div class="chat-header">Mei Tanaka <time datetime="2026-10-30T09:12">09:12</time></div>
    <div class="chat-bubble">Can you confirm the delivery window for PRJ-1024?</div>
    <div class="chat-footer">Delivered</div>
  </div>
  <div class="chat chat-end">
    <div class="chat-header">You <time datetime="2026-10-30T09:14">09:14</time></div>
    <div class="chat-bubble chat-bubble-primary">Thursday, 13:00 to 15:00. Daniel will meet the driver.</div>
    <div class="chat-footer">Read 09:15</div>
  </div>
  <div class="chat chat-start">
    <div class="chat-bubble chat-bubble-warning">The loading dock closes at 14:30 on Thursdays.</div>
  </div>
</div>
```

### Countdown, radial progress, swap, text rotate

```html preview title="Quantities and toggles"
<div style="display:flex;flex-wrap:wrap;gap:2rem;align-items:center">
  <span class="countdown" style="font-size:1.75rem" role="timer" aria-label="Session expires in 4 minutes 32 seconds">
    <span style="--value:4" aria-hidden="true">4</span>:<span style="--value:32;--digits:2" aria-hidden="true">32</span>
  </span>
  <div class="radial-progress" style="--value:68" role="progressbar" aria-valuenow="68" aria-valuemin="0" aria-valuemax="100" aria-label="Upload progress"><span>68%</span></div>
  <label class="swap swap-rotate" aria-label="Toggle favourite">
    <input type="checkbox">
    <svg class="swap-off ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-star"></use></svg>
    <svg class="swap-on ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-star-filled"></use></svg>
  </label>
  <p>Ship <span class="text-rotate"><span><span>invoices</span><span>quotes</span><span>orders</span></span></span> on time.</p>
</div>
```

### Join, label, floating label and validator

```html preview title="Grouped controls and validation hints"
<div style="display:grid;gap:1.25rem;max-width:30rem">
  <div class="join">
    <button class="btn join-item" type="button">Day</button>
    <button class="btn join-item" type="button" aria-pressed="true">Week</button>
    <button class="btn join-item" type="button">Month</button>
  </div>
  <label class="input">
    <span class="label">https://</span>
    <input type="text" placeholder="company.co.id" aria-label="Website">
  </label>
  <label class="floating-label">
    <span>Invoice number</span>
    <input class="input" type="text" placeholder="Invoice number" value="INV-2026-0418">
  </label>
  <div>
    <input class="input validator" type="email" required placeholder="name@company.com" aria-label="Billing email" aria-describedby="dz-email-hint">
    <p class="validator-hint" id="dz-email-hint">Enter a full email address.</p>
  </div>
</div>
```

### List, stack, filter, diff

```html preview title="Layout helpers"
<div style="display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));align-items:start">
  <ul class="list">
    <li class="list-row"><div><strong>Ayu Lestari</strong><div class="ds-text-subtle">Finance</div></div><span>12 tasks</span></li>
    <li class="list-row"><div><strong>Daniel Okafor</strong><div class="ds-text-subtle">Procurement</div></div><span>8 tasks</span></li>
    <li class="list-row"><div><strong>Sofia Marquez</strong><div class="ds-text-subtle">Finance lead</div></div><span>5 tasks</span></li>
  </ul>
  <div class="stack" style="width:12rem">
    <div class="card bg-base-100 border border-base-300"><div class="card-body">INV-2026-0418</div></div>
    <div class="card bg-base-100 border border-base-300"><div class="card-body">INV-2026-0417</div></div>
    <div class="card bg-base-100 border border-base-300"><div class="card-body">INV-2026-0416</div></div>
  </div>
  <form class="filter">
    <input class="btn filter-reset" type="radio" name="dz-status" aria-label="All">
    <input class="btn" type="radio" name="dz-status" aria-label="Open">
    <input class="btn" type="radio" name="dz-status" aria-label="Paid">
    <input class="btn" type="radio" name="dz-status" aria-label="Overdue">
  </form>
  <figure class="diff aspect-16/9" tabindex="0" aria-label="Compare the old and new invoice layout">
    <div class="diff-item-1" role="img" tabindex="0"><div style="display:grid;align-items:center;justify-items:start;padding-inline:1.5rem;background:var(--color-base-100);font-weight:700">Before: 9 days</div></div>
    <div class="diff-item-2" role="img"><div style="display:grid;align-items:center;justify-items:end;padding-inline:1.5rem;background:var(--ds-primary-soft);font-weight:700">After: 4 days</div></div>
    <div class="diff-resizer"></div>
  </figure>
</div>
```

### Hero and dock

```html preview title="hero and dock (shown in place, not fixed)"
<div style="display:grid;gap:1.5rem">
  <div class="hero bg-base-100 border border-base-300" style="min-height:14rem">
    <div class="hero-content text-center">
      <div style="max-width:28rem">
        <h1>Close the month in two days</h1>
        <p style="margin-block:0.75rem 1.25rem">Approve invoices, match payments and export the ledger from one place.</p>
        <button class="btn btn-primary" type="button">Start reconciliation</button>
      </div>
    </div>
  </div>
  <div class="dock" style="position:relative">
    <button type="button"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-home"></use></svg><span class="dock-label">Home</span></button>
    <button type="button" aria-current="page"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-inbox"></use></svg><span class="dock-label">Inbox</span></button>
    <button type="button"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-settings"></use></svg><span class="dock-label">Settings</span></button>
    <button type="button" aria-disabled="true"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-bar-chart"></use></svg><span class="dock-label">Reports</span></button>
  </div>
</div>
```

### Mockups, mask, aura, glass

```html preview title="mockup-code, mockup-browser, mockup-window, mask, aura, glass"
<div style="display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(17rem,1fr));align-items:start">
  <div class="mockup-code">
    <pre data-prefix="$"><code>dotnet add package Citia.DesignSystem</code></pre>
    <pre data-prefix=">"><code>installed 2.0.0</code></pre>
  </div>
  <div class="mockup-browser">
    <div class="mockup-browser-toolbar"><div class="input">app.company.co.id/invoices</div></div>
    <div style="padding:2rem;background:var(--color-base-100)">Invoice list</div>
  </div>
  <div class="mockup-window">
    <div style="padding:2rem;background:var(--color-base-100)">Settings window</div>
  </div>
  <div style="display:flex;gap:1rem;align-items:center">
    <img class="mask mask-squircle" src="/images/citia-favicon.png" alt="Citia" width="64" height="64">
    <div class="aura text-primary"><button class="btn" type="button">Aura renders as a calm ring</button></div>
  </div>
  <div class="glass" style="padding:1.25rem;border-radius:var(--ds-radius-box)">Glass becomes the DS translucent material.</div>
</div>
```

## States

| Component | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Chat bubble | tone | `chat-bubble-*` | Primary is the only filled bubble; info, success, warning, error use the `--ds-*-soft` tonal fills with body text |
| Dock item | hover / pressed / focus | `:hover`, `:active`, `:focus-visible` | Text deepens; scales to 97%; 2px inset focus ring |
| Dock item | current | `aria-current`, `.dock-active` | `--ds-quiet` colour and the indicator bar growing on the spring |
| Dock item | disabled | `aria-disabled="true"`, `disabled` | 55% opacity, `cursor: not-allowed` |
| Swap | focus / pressed / disabled | `:has(input:focus-visible)`, `:active`, `:has(input:disabled)` | Focus ring on the wrapper; 97% press; 55% opacity |
| Diff | focus | `:focus-visible` on the figure or the first item | 2px `--ds-focus` ring, 2px offset |
| Floating label | focus | `:focus-within` | Label turns `--ds-quiet`, moves up in 180ms |
| Validator | invalid | `:user-invalid`, `aria-invalid` | Error border, hint in `--ds-error-text` (no layout shift: the hint space is reserved) |
| Radial progress | value | `--value` | Arc moves on the spring over a 14% track |
| Every component | reduced motion | `prefers-reduced-motion: reduce` | Swap rotate and flip become cross-fades, hover-3d stops tilting, text-rotate shows the first phrase, countdown digits switch without sliding |

## Audit

Status: **Owner** = refined by the owner batch in its file; **Here** = restyled in `daisyui-overrides.css`; **Neutralised** = kept for compatibility but toned down to the DS principles; **Tokens** = reads the global variables only.

| daisyUI | Classes | Status | Styled in | DS equivalent | Notes |
| --- | --- | --- | --- | --- | --- |
| Alert | `alert`, `alert-*` | Owner | `feedback.css` (A8) | [Alert](./alert.md) | Tonal fills, icon plus title |
| Avatar | `avatar`, `avatar-group`, `avatar-online` | Owner | `status.css`, `display.css` (A5) | [Avatar](./avatar.md) | |
| Badge | `badge`, `badge-*` | Owner | `status.css` (A5) | [Badge](./badge.md) | |
| Breadcrumbs | `breadcrumbs` | Owner | `navigation.css` (A10) | [Breadcrumb](./breadcrumb.md) | |
| Button | `btn`, `btn-*` | Owner | `button.css`, `actions.css` (A1) | [Button](./button.md) | 44px targets, press scale |
| Calendar | `cally`, `pika-*`, `rdp-*` | Owner | `calendar.css` (A4) | [Calendar](./calendar.md) | |
| Card | `card`, `card-body`, `card-title` | Owner | `surface.css` (A5) | [Card](./card.md) | |
| Carousel | `carousel`, `carousel-item` | Owner | `media.css` (A7) | [Carousel](./carousel.md) | |
| Chat | `chat`, `chat-bubble`, `chat-*` | Here | `daisyui-overrides.css` | none | Tonal bubbles, 12px radius, caption metadata |
| Checkbox | `checkbox`, `checkbox-*` | Owner | `choices.css` (A3) | [Checkbox](./checkbox.md) | Bare checkbox: [native](./native-elements.md) |
| Collapse | `collapse`, `collapse-title`, `collapse-content` | Owner | `disclosure.css` (A8) | [Collapsible](./collapsible.md), [Accordion](./accordion.md) | |
| Countdown | `countdown` | Here | `daisyui-overrides.css` | none | Tabular digits, emphasized slide; give it `role="timer"` and a text label |
| Diff | `diff`, `diff-item-*`, `diff-resizer` | Here | `daisyui-overrides.css` | none | DS focus ring and handle |
| Divider | `divider`, `divider-*` | Owner | `media.css` (A7) | [Separator](./separator.md) | |
| Dock | `dock`, `dock-label`, `dock-active` | Here, A10 may refine | `daisyui-overrides.css`, `nav-bars.css` | [Bottom navigation](./bottom-navigation.md) | Translucent bar, 44px items, current colour |
| Drawer | `drawer`, `drawer-side`, `drawer-toggle` | Owner | `shell.css` (A11), `sheet.css` (A9) | [Sidebar](./sidebar.md), [Sheet](./sheet.md) | |
| Dropdown | `dropdown`, `dropdown-content` | Owner | `menu.css`, `popover.css` (A9) | [Dropdown menu](./dropdown-menu.md) | |
| FAB | `fab`, `fab-flower` | Owner | `actions.css` (A1) | [FAB](./fab.md) | |
| Fieldset | `fieldset`, `fieldset-legend` | Owner | `field.css` (A2) | [Fieldset](./fieldset.md) | |
| File input | `file-input` | Owner | `upload.css` (A4) | [File upload](./file-upload.md) | Bare file input: [native](./native-elements.md) |
| Filter | `filter`, `filter-reset` | Here | `daisyui-overrides.css` | [Toggle group](./toggle-group.md) | Token durations, 6px gap; items are `.btn` (A1) |
| Footer | `footer`, `footer-title` | Owner | `shell.css`, `layout.css` (A11) | [Footer](./footer.md) | |
| Hero | `hero`, `hero-content`, `hero-overlay` | Here | `daisyui-overrides.css` | [Page header](./page-header.md) | Card radius, scrim overlay, display type for `h1` |
| Hover 3D | `hover-3d` | Neutralised | `daisyui-overrides.css` | none | No overshoot, no tilt under reduced motion; avoid in product UI |
| Hover gallery | `hover-gallery` | Here | `daisyui-overrides.css` | [Carousel](./carousel.md) | Hover only: not usable by keyboard or touch, prefer a carousel |
| Indicator | `indicator`, `indicator-item` | Owner | `display.css` (A5) | [Indicator](./indicator.md) | |
| Input | `input`, `input-*` | Owner | `field.css`, `inputs.css` (A2) | [Input](./input.md) | |
| Join | `join`, `join-item` | Here (tokens) | `daisyui-overrides.css` | [Button group](./button-group.md), [Input group](./input-group.md) | Radius from `--radius-field`; focused item on top |
| Kbd | `kbd`, `kbd-*` | Owner | `code.css` (A6) | [Kbd](./kbd.md) | Bare `kbd`: [native](./native-elements.md) |
| Label | `label`, `floating-label` | Here | `daisyui-overrides.css` | [Field](./field.md) | `--ds-subtle` text (≥ 4.5:1), token motion |
| Link | `link`, `link-*` | Owner | `button.css`, `actions.css` (A1) | [Link](./link.md) | |
| List | `list`, `list-row` | Here, A6 may refine | `daisyui-overrides.css`, `lists.css` | [List](./list.md) | Hairline separators in `--color-base-300` |
| Loading | `loading`, `loading-*` | Owner | `media.css` (A7) | [Spinner](./spinner.md) | Static under reduced motion |
| Mask | `mask`, `mask-*` | Tokens | none | [Avatar](./avatar.md) | Shapes only; keep `alt` on masked images |
| Megamenu | `megamenu`, `megamenu-*` | Owner | `nav-bars.css`, `navigation.css` (A10) | [Navigation menu](./navigation-menu.md) | |
| Menu | `menu`, `menu-*` | Owner | `menu.css` (A9), `shell.css` (A11) | [Dropdown menu](./dropdown-menu.md), [Sidebar](./sidebar.md) | |
| Mockup | `mockup-code`, `mockup-browser`, `mockup-window`, `mockup-phone` | Here | `daisyui-overrides.css` | [Code block](./code-block.md) | Code surface instead of the inverted neutral block; phone frame keeps daisyUI's device colours |
| Modal | `modal`, `modal-box`, `modal-action` | Owner | `overlay.css` (A9) | [Dialog](./dialog.md) | |
| Navbar | `navbar`, `navbar-*` | Owner | `nav-bars.css` (A10) | [Navbar](./navbar.md) | |
| OTP | `otp`, `otp-*` | Owner | `choices.css` (A3) | [OTP input](./otp-input.md) | |
| Pagination | `join` + `btn` | Owner | `navigation.css` (A10) | [Pagination](./pagination.md) | daisyUI has no own class |
| Progress | `progress`, `progress-*` | Owner | `dataviz.css`, `media.css` (A7) | [Progress](./progress.md) | Bare `progress`: [native](./native-elements.md) |
| Radial progress | `radial-progress` | Here | `daisyui-overrides.css` | [Progress](./progress.md) | Primary arc over a 14% track, spring motion, tabular label |
| Radio | `radio`, `radio-*` | Owner | `choices.css` (A3) | [Radio group](./radio-group.md) | |
| Range | `range`, `range-*` | Owner | `choices.css` (A3) | [Slider](./slider.md) | |
| Rating | `rating`, `rating-*` | Owner | `choices.css` (A3) | [Rating](./rating.md) | |
| Select | `select`, `select-*` | Owner | `field.css`, `inputs.css` (A2) | [Select](./select.md) | Bare `select`: customizable picker in [native](./native-elements.md) |
| Skeleton | `skeleton`, `skeleton-text` | Owner | `media.css` (A7) | [Skeleton](./skeleton.md) | Static under reduced motion |
| Stack | `stack`, `stack-*` | Here | `daisyui-overrides.css` | none | Children inherit the radius |
| Stat | `stats`, `stat`, `stat-*` | Owner | `surface.css` (A5) | [Stat](./stat.md) | |
| Status | `status`, `status-*` | Owner | `status.css` (A5) | [Status](./status.md) | |
| Steps | `steps`, `step`, `step-*` | Owner | `disclosure.css` (A8) | [Stepper](./stepper.md) | |
| Swap | `swap`, `swap-on`, `swap-off` | Here | `daisyui-overrides.css` | [Toggle](./toggle.md) | Token motion, focus ring, press; cross-fade under reduced motion |
| Tab | `tabs`, `tab`, `tab-content` | Owner | `navigation.css` (A10) | [Tabs](./tabs.md) | |
| Table | `table`, `table-*` | Owner | `table.css` (A6) | [Table](./table.md) | Bare `table`: [native](./native-elements.md) |
| Text rotate | `text-rotate` | Neutralised | `daisyui-overrides.css` | none | Decorative loop; 12s cycle, first phrase only under reduced motion; avoid in product UI |
| Textarea | `textarea`, `textarea-*` | Owner | `field.css`, `inputs.css` (A2) | [Textarea](./textarea.md) | |
| Timeline | `timeline`, `timeline-*` | Owner | `lists.css` (A6) | [Timeline](./timeline.md) | |
| Toast | `toast`, `toast-*` | Owner | `notification.css` (A8) | [Toast](./toast.md) | |
| Toggle | `toggle`, `toggle-*` | Owner | `choices.css` (A3) | [Switch](./switch.md) | Bare switch: `input[type=checkbox][role=switch]` |
| Tooltip | `tooltip`, `tooltip-*` | Owner | `tooltip.css` (A8) | [Tooltip](./tooltip.md) | |
| Validator | `validator`, `validator-hint` | Here | `daisyui-overrides.css` | [Validation](./validation.md) | Hint in `--ds-error-text`, footnote size |
| Aura | `aura`, `aura-*` | Neutralised | `daisyui-overrides.css` | none | No glow and no loop in the DS: renders a calm 2px ring in `currentColor` |
| Glass | `glass` | Neutralised | `daisyui-overrides.css` | none | Becomes the DS translucent material (82% surface, blur, hairline); opaque under reduced transparency |
| Radius utilities | `rounded-box`, `rounded-field`, `rounded-selector` | Tokens | `tokens.css` | `--ds-radius-*` | Read the global radius variables |
| Typography | `prose` | Tokens | none | [Prose](./prose.md) | daisyUI only sets colours for the Tailwind typography plugin; use `.ds-prose` |

## Usage

- Keep the daisyUI class as the base and add DS classes on top (`btn btn-primary`), never re-create a daisyUI component from scratch.
- Prefer the DS equivalent when one exists: it adds states, keyboard behaviour and Razor helpers.
- Do not use `aura`, `hover-3d`, `text-rotate` or `hover-gallery` in product screens: they move without a reason or hide content behind hover.
- Do not set `--depth` or `--noise` above 0 per component; the DS look is flat with hairlines.
- Override a daisyUI rule from your own CSS in `@layer utilities`; a rule in `@layer components` loses to daisyUI.

## Accessibility

- Every restyled component keeps the 2px `--ds-focus` ring; the dock uses an inset ring so it stays inside the bar.
- Text on tonal chat bubbles uses the body colour (≥ 4.5:1); the primary bubble uses `--color-primary-content`.
- Countdown and radial progress are visual: give them `role="timer"` or `role="progressbar"` with `aria-valuenow` and a text label.
- Swap needs an accessible name on the label (`aria-label`) and the state comes from the checkbox inside.
- Reduced motion: listed in the states table; loops in `loading`, `skeleton`, `text-rotate` and `aura` stop (see `accessibility.css`).

## Tokens

Global: `--radius-selector`, `--radius-field`, `--radius-box`, `--size-selector`, `--size-field`, `--border`, `--depth`, `--noise`. Restyled components: `--color-base-100/200/300`, `--color-base-content`, `--color-primary(-content)`, `--color-neutral(-content)`, `--ds-*-soft`, `--ds-subtle`, `--ds-muted`, `--ds-quiet`, `--ds-error-text`, `--ds-focus`, `--ds-scrim`, `--ds-control-border`, `--ds-radius-*`, `--ds-shadow-xs|menu`, `--ds-duration-*`, `--ds-ease-*`, `--ds-press-scale`, `--ds-z-sticky`, `--ds-type-*`.

## Native and daisyUI

daisyUI is a Tailwind CSS plugin; the build loads it with `themes: false` so only DS themes exist. Tailwind emits a daisyUI component only when its class appears in a scanned source (`@source`), so an app that uses `.chat` must have it in a scanned view. The prebuilt `wwwroot/css/ds.css` for apps without Tailwind carries only the classes the integrator safelists.
