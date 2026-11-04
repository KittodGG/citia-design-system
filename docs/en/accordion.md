---
title: Accordion
group: components
category: layout
order: 8
summary: A stack of headings that each reveal a panel, built on details, with exclusive (single) or independent (multiple) opening, an animated reveal and a disabled item.
source: TPS .payload-details L3502–3504, .bc-guide-entry
---

An accordion hides secondary content behind headings so a page stays short: frequently asked questions, settings groups, a long help topic. It works without JavaScript because each item is a native `details`. Use it when people usually need one or two panels, not all of them. For one disclosure use a [collapsible](./collapsible.md). To switch between peer views use [tabs](./tabs.md). If people need everything, show everything.

## Examples

Multiple. Any number of items can be open. This is the default.

```html preview title="Multiple"
<div class="ds-accordion" style="max-width:40rem">
  <details class="ds-accordion__item" open>
    <summary class="ds-accordion__trigger">When is an invoice due?</summary>
    <div class="ds-accordion__panel"><p>Invoices are due 30 days after they are sent, for example INV-2026-0418 sent on 2 Nov 2026 is due on 2 Dec 2026. You can change the term for each client.</p></div>
  </details>
  <details class="ds-accordion__item">
    <summary class="ds-accordion__trigger">Can I change an invoice after sending it?</summary>
    <div class="ds-accordion__panel"><p>Not once the client has opened it. Issue a credit note and a new invoice instead; both stay linked to the project.</p></div>
  </details>
  <details class="ds-accordion__item">
    <summary class="ds-accordion__trigger">Who can see my invoices?</summary>
    <div class="ds-accordion__panel"><p>Workspace admins and the people you share the project with. Ayu Lestari can add or remove access.</p></div>
  </details>
</div>
```

Single. Opening an item closes the others. The items share a `name`, which is the native exclusive accordion; `data-ds-accordion="single"` also covers browsers that lack it.

```html preview title="Single, with hints"
<div class="ds-accordion" data-ds-accordion="single" style="max-width:40rem">
  <details class="ds-accordion__item" name="plan" open>
    <summary class="ds-accordion__trigger"><span class="ds-accordion__label"><span>Starter</span><span class="ds-accordion__hint">For one person</span></span><span class="ds-accordion__meta">Free</span></summary>
    <div class="ds-accordion__panel"><p>3 projects, 1 GB of files and email support.</p></div>
  </details>
  <details class="ds-accordion__item" name="plan">
    <summary class="ds-accordion__trigger"><span class="ds-accordion__label"><span>Team</span><span class="ds-accordion__hint">Up to 20 people</span></span><span class="ds-accordion__meta">12.00 / month</span></summary>
    <div class="ds-accordion__panel"><p>Unlimited projects, 50 GB of files and approvals.</p></div>
  </details>
  <details class="ds-accordion__item" name="plan">
    <summary class="ds-accordion__trigger"><span class="ds-accordion__label"><span>Business</span><span class="ds-accordion__hint">Single sign-on and audit log</span></span><span class="ds-accordion__meta">38.00 / month</span></summary>
    <div class="ds-accordion__panel"><p>Everything in Team, 1 TB of files and a named contact.</p></div>
  </details>
</div>
```

Card and separated variants, with a disabled item. A disabled item stays focusable and cannot be opened; say why in its text or with a tooltip.

```html preview title="Card and separated"
<div style="display:grid;gap:1.5rem;max-width:40rem">
  <div class="ds-accordion is-card">
    <details class="ds-accordion__item" open>
      <summary class="ds-accordion__trigger">Notifications</summary>
      <div class="ds-accordion__panel"><p>Choose which comments and approvals send an email.</p></div>
    </details>
    <details class="ds-accordion__item">
      <summary class="ds-accordion__trigger">Language and region</summary>
      <div class="ds-accordion__panel"><p>English or Bahasa Indonesia, with the date and number formats of your region.</p></div>
    </details>
    <details class="ds-accordion__item" aria-disabled="true">
      <summary class="ds-accordion__trigger" aria-disabled="true"><span class="ds-accordion__label"><span>Single sign-on</span><span class="ds-accordion__hint">Available on the Business plan</span></span></summary>
      <div class="ds-accordion__panel"><p>Not available.</p></div>
    </details>
  </div>
  <div class="ds-accordion is-separated">
    <details class="ds-accordion__item"><summary class="ds-accordion__trigger">Billing details</summary><div class="ds-accordion__panel"><p>Company name, tax number and invoice address.</p></div></details>
    <details class="ds-accordion__item"><summary class="ds-accordion__trigger">Payment methods</summary><div class="ds-accordion__panel"><p>Cards and bank transfer.</p></div></details>
  </div>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Collapsed | No `open` | Chevron down; the panel is not rendered |
| Expanded | `open` | Chevron rotated 180° and primary; the heading text in full colour |
| Hover | Pointer over the heading, on hover devices | State layer at 6% |
| Pressed | Pointer down | State layer at 10% |
| Focus-visible | Keyboard focus | 2px `--ds-focus` ring inside the heading |
| Opening | Toggle | The panel grows over 240ms and its content fades in (reduced motion: instant) |
| Closing | Toggle | The panel shrinks over 140ms |
| Disabled | `aria-disabled="true"` on the item | 55% opacity, `not-allowed`, stays focusable, does not toggle |
| Exclusive | Shared `name` or `data-ds-accordion="single"` | Opening one closes the others |
| Hash target | `#id` inside a closed item | The item opens on load or on navigation |

The height animation uses `::details-content` and `interpolate-size`. Browsers without them open and close instantly; nothing else changes.

## Anatomy

- `.ds-accordion`: the group. `is-card` (one bordered group) and `is-separated` (a card per item); the default is flush with hairlines.
- `details.ds-accordion__item`: one item. `name` makes it part of an exclusive group.
- `summary.ds-accordion__trigger`: the heading and the chevron (drawn with CSS).
- `.ds-accordion__label`, `.ds-accordion__hint`, `.ds-accordion__meta`, `.ds-accordion__icon`: optional parts of the heading.
- `.ds-accordion__panel`: the content.
- The version 1 `.ds-disclosure` and `.ds-disclosure-list` still work and share the same motion and chevron.

## Usage

- Write headings that say what is inside, as a question or a noun: "Who can see my invoices?", "Notifications". Keep them under 60 characters.
- Open the first item only when most people need it. Open none when the headings are enough.
- Use single for choices that exclude each other or long panels. Use multiple for independent topics.
- Keep a panel under about 120 words. Longer content deserves its own page.
- Add "Expand all" and "Collapse all" when a multiple accordion has 6 or more items (`data-ds-accordion-all`).
- Do not nest accordions more than one level.
- Do not hide required form fields in a closed panel: validation errors would be invisible. Open the panel that contains the error.
- Do not disable an item without saying why.

## Accessibility

- Pattern: WAI-ARIA accordion, using native `details` and `summary`. The summary is the button, announced with its expanded or collapsed state by the browser. The panel needs no extra role.
- Keyboard: Enter or Space toggles. Arrow Up, Arrow Down, Home and End move between headings (optional in the pattern, provided by the script).
- A disabled item uses `aria-disabled="true"` on the item and its summary, so it can still be read and focused.
- Contrast: heading 4.5:1 or more, chevron 3:1 or more, in both themes. The heading target is at least 44px high.
- Motion: the chevron rotates in 160ms and the panel animates in 240ms; reduced motion removes the movement and keeps a 120ms fade.
- Find in page opens a closed item that contains the match.

| Key | Action |
| --- | --- |
| Enter, Space | Toggle the focused item |
| Arrow Down | Focus the next heading |
| Arrow Up | Focus the previous heading |
| Home, End | Focus the first or the last heading |
| Tab | Moves through headings and the controls in open panels |

## Razor

```cshtml
<ds-accordion single>
    <ds-accordion-item title="Starter" hint="For one person" meta="Free" open>3 projects, 1 GB of files.</ds-accordion-item>
    <ds-accordion-item title="Team" hint="Up to 20 people" meta="12.00 / month">Unlimited projects and approvals.</ds-accordion-item>
    <ds-accordion-item title="Business" disabled hint="Available on request">Single sign-on.</ds-accordion-item>
</ds-accordion>
```

| Attribute | Effect |
| --- | --- |
| `ds-accordion single` | Exclusive: the items get one shared `name` |
| `name` | Use a fixed group name instead of a generated one |
| `card`, `separated` | Variants |
| `ds-accordion-item title`, `hint`, `meta`, `icon` | Heading parts |
| `open`, `disabled` | Item state |

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-accordion="single"` | The script gives items without a `name` one shared `name`, closes extra open items on load, and enforces exclusivity where the browser does not |
| `data-ds-accordion-all="open\|close"` | On a button with `aria-controls="<accordion id>"`: opens or closes every enabled item |

`DS.accordion.openAll(element)` and `DS.accordion.closeAll(element)`. Event `ds:accordion:toggle` (`detail.open`) bubbles from the item.

## Tokens

`--color-base-300`, `--color-base-100`, `--ds-subtle`, `--ds-quiet`, `--ds-radius-box`, `--ds-radius-lg`, `--ds-size-target`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-opacity-disabled`, `--ds-duration-layout`, `--ds-duration-exit`, `--ds-duration-quick`, `--ds-ease-emphasized`, `--ds-focus`.

## Native and daisyUI

Each item is a native `details` with a `summary`. The exclusive behaviour is the native `name` attribute. The DS does not use daisyUI's `collapse` (it needs a hidden checkbox and cannot be exclusive without JavaScript).
