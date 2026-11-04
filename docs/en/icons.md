---
title: Icons
group: foundations
order: 6
summary: The inline SVG icon set on a 24px grid with one 2px stroke, the sizes, accessible use, and how to add an icon.
source: docs/_legacy/ikon.md
---

The set is outline icons on a 24px grid: 2px stroke, round caps and joins, `stroke="currentColor"`, so an icon takes the colour of the text around it. The geometry follows Lucide. The source is `wwwroot/icons/icons.json`; the generator turns it into a sprite and a C# table. Icons accompany words and never replace them: a primary button keeps its label.

The set also keeps domain icons for logistics apps (`tank`, `ship`, `port`, `warehouse`, `truck`). They are ordinary entries and stay available to any product.

## All icons

Select an icon to copy its name. The grid is rendered live from `Icon.Names`.

```ds-icons
```

## Sizes

| Class | Size | Use |
| --- | --- | --- |
| `ds-icon` | 16px (`--ds-size-icon-sm`) | Inside buttons and text |
| `ds-icon is-xs` | 12px | Small markers, chevrons in badges |
| `ds-icon is-md` | 18px (`--ds-size-icon-md`) | Sidebar navigation |
| `ds-icon is-lg` | 20px (`--ds-size-icon-lg`) | Toolbar controls, empty states |
| `ds-icon is-xl` | 32px (`--ds-size-icon-xl`) | Dropzones, account avatars |

```html preview title="Icon sizes"
<div class="ds-actions is-start">
  <svg class="ds-icon is-xs" aria-hidden="true"><use href="#ds-icon-folder"></use></svg>
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"></use></svg>
  <svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-folder"></use></svg>
  <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-folder"></use></svg>
  <svg class="ds-icon is-xl" aria-hidden="true"><use href="#ds-icon-folder"></use></svg>
</div>
```

## Usage

- Use one stroke weight. Do not mix this set with icons of another weight or style.
- Pair an icon with a word: "Download invoice" with `download`. Icon-only controls are for repeated, well-known actions (close, more, search).
- Use one icon for one meaning. Two sidebar items never share an icon.
- Do not write colours in the icon. Set `color` on the parent.
- `star-filled` is the only filled icon; it marks an active favourite, with `star` as the inactive state.

## Accessibility

- Decorative icons carry `aria-hidden="true"` and `focusable="false"` (the default).
- A control that holds only an icon needs a name: `aria-label` on the `<button>` or `<a>`.
- Give an icon a `label` (`role="img"`) only when it stands alone and no element names it. Never label an icon that sits next to text.
- Never let an icon carry meaning alone: write the status in words.
- Icon buttons keep a 44px hit area on coarse pointers.

## Razor

```cshtml
@using Citia.DesignSystem.Icons

<ds-icon name="folder" size="lg" />
<button type="button" class="btn btn-ghost btn-square" aria-label="Delete INV-2026-0418">@Icon.Svg("trash")</button>
@Icon.Svg("alert-triangle", "ds-icon is-lg", label: "Warning")
```

`Icon.Svg(name, class)` throws `ArgumentException` for an unknown name, so a typo fails in development. Use `Icon.Exists(name)` to test and `Icon.Names` to list. `<ds-icon name size>` accepts `xs`, `md`, `lg`, `xl`; without `size` the icon is 16px. For static HTML render `<partial name="_DsIconSprite" />` once, then reference `<svg class="ds-icon"><use href="#ds-icon-NAME"></use></svg>`.

## JavaScript

`icon(name, className)` from `core.js` returns an inline SVG string, decorative by default. An unknown name returns an empty `<svg>`.

```js
import { icon } from "/_content/Citia.DesignSystem/js/core.js";
button.insertAdjacentHTML("afterbegin", icon("plus"));
```

## Adding an icon

1. Add an entry to `src/Citia.DesignSystem/wwwroot/icons/icons.json`: a lower-case hyphenated name and the inner markup of the `<svg>` (no wrapper) on the 24px grid, 2px padding from the edge, no colours.
2. Run `dotnet run tools/tokens.cs` from the repository root. It regenerates `Icons/IconSet.g.cs` and `wwwroot/icons/sprite.svg` and prints the icon count.
3. If the paths come from Lucide or another source, keep its licence text in the icons section of `NOTICE.md`.

> [!NOTE]
> Version 1 of this page is in `docs/_legacy/ikon.md` (Indonesian).
