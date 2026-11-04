---
title: Footer
group: components
category: layout
order: 9
summary: A quiet footer for the bottom of an app or a page: legal line, links and, for page footers, grouped link columns.
---

The footer closes a page with the facts people look for last: who owns the product, the legal pages and a way to get help. In an application keep it to one line; on a public page use the grouped layout. Navigation that people use all the time belongs in the [Sidebar](./sidebar.md), not here.

## Examples

### App footer

One line: legal text on the start side, links on the end side. It sits at the bottom of `.ds-shell-main` after `main`.

```html preview title="App footer"
<footer class="ds-footer">
  <p class="ds-footer__legal">© 2026 Citia Engineering. Version 2.0.1</p>
  <ul class="ds-footer__links">
    <li><a href="#">Help centre</a></li>
    <li><a href="#">Privacy</a></li>
    <li><a href="#">Terms</a></li>
    <li><a href="#">Status</a></li>
  </ul>
</footer>
```

### Page footer

```html preview title="Page footer"
<footer class="ds-footer is-page">
  <div class="ds-footer__brand"><span>Citia</span><p>Projects, invoices and people in one workspace.</p></div>
  <div class="ds-footer__cols">
    <nav class="ds-footer__group" aria-label="Product"><h2 class="ds-footer__title">Product</h2><a href="#">Overview</a><a href="#">Pricing</a><a href="#">Changelog</a></nav>
    <nav class="ds-footer__group" aria-label="Company"><h2 class="ds-footer__title">Company</h2><a href="#">About</a><a href="#">Careers</a><a href="#">Contact</a></nav>
    <nav class="ds-footer__group" aria-label="Legal"><h2 class="ds-footer__title">Legal</h2><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Security</a></nav>
  </div>
  <p class="ds-footer__legal">© 2026 Citia Engineering. All rights reserved.</p>
</footer>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | none | Muted text (`--ds-subtle`), hairline on top |
| Link hover | Pointer over a link (hover devices) | Text colour to full contrast and underline |
| Link focus-visible | Keyboard focus | 2px ring `--ds-focus`, 2px offset |
| Current page | `aria-current="page"` on a link | Keep the underline and weight 600 in your own markup |
| Narrow | Under 640px | Legal line and links stack; link columns wrap to 2 or 1 |
| Long links | Indonesian or long labels | Wrap onto the next row; nothing is truncated |
| Print | `@media print` | Kept at the end of the page |
| Flush | `.is-flush` | No top hairline, for pages that already end in a surface |

## Anatomy

- `.ds-footer`: the block. `.is-page` for the grouped layout, `.is-flush` without the top line.
- `.ds-footer__legal`: copyright and version.
- `.ds-footer__links`: inline list of links (app footer).
- `.ds-footer__brand`: name and one sentence (page footer).
- `.ds-footer__cols`, `.ds-footer__group`, `.ds-footer__title`: columns of links under a heading.

## Usage

- App footer: 3 to 5 links at most; no social icons.
- Page footer: 2 to 4 groups with 3 to 6 links each, ordered by how often people need them.
- Write link labels as what they open ("Privacy", "Terms"), not "Click here".
- Do not repeat the top navigation or put the primary action in the footer.

## Accessibility

- Use `<footer>` (a `contentinfo` landmark when it is a child of `body`; inside `main` or a shell column it is a plain group, which is fine).
- Each link group is a `nav` with `aria-label`; the group heading is a real heading (`h2`) so people can jump to it.
- Links keep a 24px minimum height and 4.5:1 contrast on the page surface; underline appears on hover and focus so colour is not the only cue.
- No motion.

## Tokens

`--ds-subtle`, `--color-base-content`, `--color-base-300`, `--ds-main-pad-x` (in the shell), `--ds-type-eyebrow-*`, `--ds-focus`, `--ds-duration-fast`.

## Native and daisyUI

Built on `footer`, `ul`, `nav` and `a`. daisyUI's `footer` component is a table of columns with its own spacing and colours; this one is quieter and shares the shell padding.
