---
title: Link
group: components
category: actions
order: 8
summary: Text that navigates. Inline, standalone with an arrow, external with an icon and a hidden note, current, disabled, and visited in long text.
source: TPS app.css .ds-link, .ds-link-ref
---

A link goes somewhere: another page, a section, a file, another site. It is an `<a href>`. Use a [button](./button.md) for an action that changes data or the current view, even if it looks like text (`btn-link`), and [navigation components](./breadcrumb.md) for site-level wayfinding.

## Examples

### Inline

Inline links sit inside a sentence. They keep the text colour and are always underlined, so colour is never the only cue. Hover thickens the underline from 1px to 2px.

```html preview title="Inline"
<p style="max-width:34rem">Invoice <a class="ds-link" href="#">INV-2026-0418</a> was sent to Ayu Lestari on 14 March. Read the <a class="ds-link" href="#">payment terms</a> or contact <a class="ds-link" href="#">billing support</a> if something looks wrong.</p>
```

### Accent and subtle

`is-accent` uses the teal link colour. `is-subtle` softens a link in dense or secondary text.

```html preview title="Accent and subtle"
<div style="display:grid;gap:.5rem;max-width:34rem">
  <p>Open the <a class="ds-link is-accent" href="#">project timeline</a> to see every milestone.</p>
  <p class="ds-text-subtle">Last edited by Daniel Okafor. <a class="ds-link is-subtle" href="#">View history</a></p>
</div>
```

### Identifier link

`.ds-link-ref` is the blue, underlined link for record identifiers such as project codes and invoice numbers. Blue is reserved for links.

```html preview title="Identifier link"
<p>Linked to <a class="ds-link-ref" href="#">PRJ-1024</a> and <a class="ds-link-ref" href="#">INV-2026-0418</a>.</p>
```

### Standalone

A standalone link stands on its own line as a call to read on or go further. It has the arrow, no underline at rest, and an underline on hover and focus. The arrow nudges 2px on hover.

```html preview title="Standalone with arrow"
<div style="display:grid;gap:.75rem;justify-items:start">
  <a class="ds-link is-standalone" href="#">View all invoices</a>
  <a class="ds-link is-standalone" href="#">Open the integration guide</a>
</div>
```

### External

An external link opens in a new tab, shows an arrow icon, and tells screen readers "(opens in a new tab)" through hidden text. Always add `rel="noopener noreferrer"`.

```html preview title="External"
<p>Read the <a class="ds-link is-external" href="https://developer.mozilla.org/docs/Web/Accessibility" target="_blank" rel="noopener noreferrer">MDN accessibility guide<span class="ds-visually-hidden"> (opens in a new tab)</span></a> for details.</p>
```

### Current

`aria-current="page"` marks the link that points to the page the user is on. It becomes semibold with a 2px accent underline.

```html preview title="Current"
<nav aria-label="Invoice sections" class="ds-actions is-start" style="gap:1.25rem">
  <a class="ds-link" href="#" aria-current="page">Overview</a>
  <a class="ds-link" href="#">Line items</a>
  <a class="ds-link" href="#">Payments</a>
  <a class="ds-link" href="#">Activity</a>
</nav>
```

### Disabled

A disabled link has no `href`, `role="link"` and `aria-disabled="true"`. It is dimmed, shows `not-allowed`, and ignores clicks. Explain why in nearby text.

```html preview title="Disabled"
<p>Next step: <a class="ds-link" role="link" aria-disabled="true" aria-describedby="why-link" title="Complete the client details first">Preview invoice</a>. <span id="why-link" class="ds-text-subtle">Complete the client details first.</span></p>
```

### Visited, in long text

`:visited` styling is off by default. Inside prose, where "already read" helps, add `is-prose` (or place the link in a `.ds-prose` container) and visited links turn a muted purple.

```html preview title="Visited in prose"
<p style="max-width:34rem">Before you publish, read the <a class="ds-link is-prose" href="/en/button">button guidelines</a> and the <a class="ds-link is-prose" href="/en/introduction">introduction</a>. Pages you already opened change colour.</p>
```

## States

```html preview title="Link states"
<div style="display:grid;gap:.5rem;justify-items:start">
  <a class="ds-link" href="#">Rest</a>
  <a class="ds-link" href="#" style="text-decoration-thickness:2px">Hover (frozen: 2px underline)</a>
  <a class="ds-link" href="#" style="outline:2px solid var(--ds-focus);outline-offset:2px">Focus-visible (frozen)</a>
  <a class="ds-link" href="#" aria-current="page">Current</a>
  <a class="ds-link" role="link" aria-disabled="true">Disabled</a>
  <a class="ds-link is-standalone" href="#">Standalone</a>
  <a class="ds-link is-external" href="#" target="_blank" rel="noopener noreferrer">External<span class="ds-visually-hidden"> (opens in a new tab)</span></a>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | None | Underline 1px, offset 0.2em, text colour (accent, subtle, or blue for identifiers) |
| Hover | Pointer over, on devices that hover | Underline thickens to 2px over 150ms; standalone shows its underline and the arrow moves 2px |
| Focus-visible | Keyboard focus | 2px `--ds-focus` ring, 2px offset, small radius |
| Pressed | Pointer down | Opacity 0.72. No scale: links are text |
| Visited | `:visited` with `is-prose` or `.ds-prose` | Muted purple mixed from the link blue and error red |
| Current | `aria-current` other than `false` | Semibold, base text colour, 2px accent underline |
| Disabled | `aria-disabled="true"`, no `href` | 55% opacity, no underline, `not-allowed`, click ignored |
| External | `.is-external` | Trailing arrow icon, hidden "(opens in a new tab)" text |
| Reduced motion | `prefers-reduced-motion` | The arrow does not move; underline changes stay |
| Forced colours | `forced-colors: active` | Always underlined; icons use `LinkText` |

## Anatomy

- `a.ds-link`: the link. Modifiers: `is-accent`, `is-subtle`, `is-standalone`, `is-external`, `is-prose`.
- `a.ds-link-ref`: version 1 identifier link, blue.
- `.ds-visually-hidden`: the "opens in a new tab" note inside an external link.

## Usage

- Write link text that makes sense alone: "payment terms", not "click here". Aim for 2 to 5 words.
- Underline every inline link. Do not rely on colour to tell a link from text.
- Use `target="_blank"` only for external sites or files that interrupt a task, and tell people with the icon and hidden text.
- Use a standalone link once per section at most.
- Do not use a link for an action ("Delete"). Use a [button](./button.md), or `btn btn-link` if it must look like text.
- Do not disable a link without explaining why; remove the link if it will never be available.

## Accessibility

- Links are `<a href>`; the accessible name is the text. Add `aria-current="page"` for the current page, or `true` for the current step.
- A disabled link keeps `role="link"` and `aria-disabled="true"` so assistive technology still reads it.
- External links announce "(opens in a new tab)" through visually hidden text, not through the icon alone.
- Contrast: link text 4.5:1 against the page in both themes; the underline gives a second cue (WCAG 1.4.1).
- Target: inline links inside text are exempt from the 44px rule; standalone links are at least 24px tall, and 44px on touch screens.

| Key | Action |
| --- | --- |
| Tab, Shift+Tab | Move focus |
| Enter | Follow the link |

## Razor

```cshtml
<p>See <ds-link href="@Url.Action("Terms")">payment terms</ds-link>.</p>
<ds-link href="@Url.Action("Index", "Invoices")" standalone>View all invoices</ds-link>
<ds-link href="https://developer.mozilla.org" external>MDN</ds-link>
<ds-link href="@Url.Action("Overview")" current>Overview</ds-link>
<ds-link disabled>Preview invoice</ds-link>
```

| Attribute | Effect |
| --- | --- |
| `href` | Target. Without it the link renders as disabled |
| `standalone`, `external` | Arrow; new tab with icon and hidden text |
| `current`, `disabled`, `prose` | `aria-current="page"`; disabled pattern; visited colour |
| `tone` | `accent` or `subtle` |

## JavaScript

None. Clicks on `aria-disabled` links are cancelled by the shared guard in `toggle.js`.

## Tokens

`--ds-link`, `--ds-quiet`, `--ds-subtle`, `--ds-muted`, `--color-base-content`, `--color-error` (visited mix), `--ds-radius-xs`, `--ds-border-focus`, `--ds-focus`, `--ds-opacity-disabled`, `--ds-duration-fast|quick`, `--ds-ease-standard|emphasized`.

## Native and daisyUI

The link is a native `<a href>`. daisyUI `link`, `link-hover` and `link-primary` still work; `.ds-link` adds the underline rules, the standalone and external glyphs, the current and disabled states, and the `:visited` rule for prose.
