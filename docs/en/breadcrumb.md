---
title: Breadcrumb
group: components
category: navigation
order: 5
summary: Shows where the current page sits in the hierarchy. Slash or chevron separators, truncated long labels, and a collapsed middle menu in narrow containers.
source: TPS app.css .master-breadcrumb L1391–1403
---

A breadcrumb shows the path from the top of a site or an app to the current page, one link per level, and lets people jump up. Use it when the structure is at least three levels deep (Projects / PRJ-1024 / Invoices). It shows the path of the hierarchy, not the browsing history, and it is not a replacement for a back button or a [Navbar](./navbar.md). For steps of a process use a [Stepper](./stepper.md).

The last item is the current page, plain text with `aria-current="page"`. Links use the subtle tone with a 1px underline that darkens on hover, so they are never colour-only.

## Examples

### Slash and chevron separators

The separator is drawn by CSS, so it is not read aloud and not part of the markup. The slash is the default; `is-chevron` uses a chevron that mirrors in right-to-left pages.

```html preview title="Separators"
<nav class="ds-breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">Projects</a></li>
    <li><a href="#">PRJ-1024</a></li>
    <li><a href="#" aria-current="page">Invoices</a></li>
  </ol>
</nav>
<nav class="ds-breadcrumb is-chevron" aria-label="Breadcrumb (chevron)" style="margin-top:1.5rem">
  <ol>
    <li><a href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-home"/></svg><span class="ds-visually-hidden">Home</span></a></li>
    <li><a href="#">Customers</a></li>
    <li><a href="#">Okafor Trading</a></li>
    <li><span aria-current="page">INV-2026-0418</span></li>
  </ol>
</nav>
```

### Long labels

Each item is truncated at 16rem with an ellipsis. Put the full text in `title`; the accessible name always has the full text.

```html preview title="Truncated labels"
<nav class="ds-breadcrumb is-chevron" aria-label="Breadcrumb (long)">
  <ol>
    <li><a href="#">Projects</a></li>
    <li><a href="#" title="Annual brand guidelines refresh for the Southeast Asia region">Annual brand guidelines refresh for the Southeast Asia region</a></li>
    <li><span aria-current="page" title="Wireframes, round 3 (approved by Sofia Marquez)">Wireframes, round 3 (approved by Sofia Marquez)</span></li>
  </ol>
</nav>
```

### Collapsed middle

With `is-collapsible`, the items marked `data-collapsible` are replaced by a "..." button when the breadcrumb's container is narrower than 36rem. The button opens the hidden levels in a small menu. The rule uses the container width, so it also works in a narrow column of a wide page. Drag the preview narrower, or open this page on a phone.

```html preview title="Collapsing breadcrumb" 
<div style="max-width:22rem;border:1px dashed var(--color-base-300);padding:0.75rem;border-radius:0.5rem">
<nav class="ds-breadcrumb is-collapsible is-chevron" aria-label="Breadcrumb (collapsing)">
  <ol>
    <li><a href="#">Home</a></li>
    <li class="ds-breadcrumb__collapse">
      <details class="ds-breadcrumb__more" data-ds-popdown>
        <summary aria-label="Show hidden levels"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"/></svg></summary>
        <ul class="ds-breadcrumb__menu">
          <li><a href="#">Projects</a></li>
          <li><a href="#">Brand refresh</a></li>
          <li><a href="#">Deliverables</a></li>
        </ul>
      </details>
    </li>
    <li data-collapsible><a href="#">Projects</a></li>
    <li data-collapsible><a href="#">Brand refresh</a></li>
    <li data-collapsible><a href="#">Deliverables</a></li>
    <li><a href="#" aria-current="page">Wireframes</a></li>
  </ol>
</nav>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Link rest | none | `--ds-subtle` text, underline at 35% |
| Link hover | pointer over a link | `--color-base-content` text, full-strength underline |
| Link pressed | pointer down | `--color-base-content` text |
| Link focus-visible | keyboard focus | 2px `--ds-focus` ring |
| Current | last item, `aria-current="page"` | `--color-base-content`, weight 600, no underline, not a link |
| Truncated | label wider than 16rem (10rem when collapsed) | ellipsis, full text in `title` |
| Collapsed | container narrower than 36rem with `is-collapsible` | middle levels replaced by the "..." button |
| Menu open / closed | `[open]` on the `details` | menu enters with opacity and a 5px move over 160ms; closes on Escape, outside click or choosing a link |

## Anatomy

- `nav.ds-breadcrumb` root. Modifiers: `is-chevron`, `is-collapsible`.
- `ol > li` one level each. The current page has `aria-current="page"` on its link or span.
- `li[data-collapsible]` levels that fold into the menu.
- `li.ds-breadcrumb__collapse` holds `details.ds-breadcrumb__more[data-ds-popdown]` with `summary` and `ul.ds-breadcrumb__menu`; it is hidden until the container is narrow.

## Usage

- Start at the root of the section, not necessarily at "Home". Show 2 to 5 levels.
- Labels are the page titles, in sentence case. Use an icon for Home only if it carries a visually hidden label.
- Do not link the current page. Do not repeat the page title directly below as a second path.
- Collapse the middle, never the first or last level: the root and the parent stay visible.
- Render the hidden levels twice in the markup (inline and in the menu). The hidden copy is `display: none`, so screen readers read each level once.
- Do not use breadcrumbs on pages one or two levels deep.

## Accessibility

- A `<nav>` landmark named "Breadcrumb" (localised) containing an ordered list: screen readers announce the position in the list.
- The current page is marked with `aria-current="page"`.
- The "..." button is a `<summary>` with `aria-label="Show hidden levels"` and works as a native disclosure; Escape closes it and returns focus to it.
- Link targets are 24px high at least and 44px on touch screens (the "..." button).
- Contrast: links 4.5:1 in both themes; the separator uses `--ds-muted` and is decorative.

| Key | Action |
| --- | --- |
| Tab / Shift+Tab | Moves through the links and the "..." button |
| Enter / Space | Follows a link; opens or closes the hidden levels |
| Escape | Closes the open hidden-levels menu |

## Razor

```cshtml
<ds-breadcrumb separator="chevron" collapse="true">
    <ds-breadcrumb-item href="/" icon="home">Home</ds-breadcrumb-item>
    <ds-breadcrumb-item href="/projects">Projects</ds-breadcrumb-item>
    <ds-breadcrumb-item href="/projects/PRJ-1024">PRJ-1024</ds-breadcrumb-item>
    <ds-breadcrumb-item>Invoices</ds-breadcrumb-item>
</ds-breadcrumb>
```

The last item is always the current page. With `collapse` (default true) and more than 3 items, the tag helper writes the collapsible markup. `label` overrides the landmark name; `separator` is `slash` (default) or `chevron`.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `details[data-ds-popdown]` | The hidden-levels menu closes on Escape, outside pointer press, focus leaving and when a link inside is chosen |

The collapse itself is CSS (container query); no script is needed for it.

## Tokens

`--ds-subtle`, `--ds-muted`, `--color-base-content`, `--color-base-300`, `--ds-popover`, `--ds-shadow-menu`, `--ds-radius-xs`, `--ds-radius-md`, `--ds-radius-box`, `--ds-z-menu`, `--ds-enter-offset`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-duration-fast`, `--ds-duration-quick`, `--ds-ease-emphasized`.

## Native and daisyUI

A `<nav>` with an `<ol>`, as in the WAI-ARIA breadcrumb pattern. daisyUI's `breadcrumbs` class is not used. The v1 markup (`<nav class="ds-breadcrumb"><ol>` with `<li aria-current="page">` on the last item) keeps working, with the new truncation and hover states.
