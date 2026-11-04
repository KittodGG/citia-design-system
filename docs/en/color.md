---
title: Colour
group: foundations
order: 2
summary: Semantic colour roles, status colours with words and icons, state layers, dark-mode rules, the primitive palette and the live contrast results for 72 pairs.
---

Colour works in three layers: **primitives** (raw hex values), **semantic roles** (`primary`, `base-100`, `error`) and **Citia extensions** (`--ds-link`, `--ds-focus`). Components use only the last two. Every role has a value in the light and the dark theme, and the swatches below are rendered live from `tokens.json`, so they are always current.

The source is `tokens/tokens.json`. Never edit `Styles/generated/tokens.css` by hand; run `dotnet run tools/tokens.cs`.

## Semantic roles {#roles}

The daisyUI 5 roles. Each swatch shows light on the left and dark on the right. Use them as `var(--color-primary)` or as Tailwind utilities (`bg-primary`, `text-base-content`).

```ds-swatches core
```

| Role | Use |
| --- | --- |
| `base-100` | Surfaces: cards, tables, inputs, menus. |
| `base-200` | Page background, table headers, quiet fills. |
| `base-300` | Hairline borders and dividers (1px). |
| `base-content` | Body text and icons on the base surfaces. |
| `primary`, `primary-content` | The one primary action, selection, focus; text on top of it. |
| `secondary`, `accent` | Sidebar surface and active markers. Not focus rings. |
| `info`, `success`, `warning`, `error` | Status fills and borders (see below). |

Surfaces are neutral and warm. Teal appears on the primary action, the current navigation item, the selection and the focus ring, and nowhere else by default.

## Citia extensions {#extensions}

Roles that daisyUI does not have. CSS names are `--ds-<name>`; Tailwind reads `--color-<name>` (`text-link`, `bg-popover`, `border-control`).

```ds-swatches ext
```

| Token | Use |
| --- | --- |
| `--ds-subtle` | Secondary text: hints, captions, metadata (8.7:1 in light). |
| `--ds-muted` | Tertiary text that still passes AA (6.04:1). Never for essential information. |
| `--ds-control-border` | Borders of inputs, selects, secondary buttons. At least 3:1 against the surface (3.37:1 light, 4.44:1 dark). |
| `--ds-link` | Links in running text and tables. Always underlined or otherwise marked. |
| `--ds-error-text`, `--ds-warning-text` | Text on pale error or warning tint; the base colours are too light for small text in the light theme. |
| `--ds-focus` | The 2px focus ring. The only focus colour. |
| `--ds-popover`, `--ds-popover-border`, `--ds-popover-hover` | Floating layers: solid, not transparent. |
| `--ds-scrim` | Modal backdrop. |

> [!IMPORTANT]
> Blue is for links. Teal is for the primary action, selection and focus. Do not use a link colour on a button or a status.

## Status colours {#status}

Status uses four hues with fixed meaning. A tonal (pale) fill carries the area; the saturated colour appears only as a 1px border, an icon or a dot. A status always includes a word, and the icon shape differs per tone, so it survives colour-blindness and greyscale.

| Tone | Meaning | Icon | Example word |
| --- | --- | --- | --- |
| `info` | Neutral news, in progress | `info` | Scheduled |
| `success` | Done, healthy | `check-circle` | Paid |
| `warning` | Needs attention, not failed | `alert-triangle` | Awaiting payment |
| `error` | Failed or destructive | `x-circle` | Overdue |

```html preview title="Status with word and icon"
<div class="flex flex-wrap gap-3">
  <span class="ds-pill is-info">Scheduled</span>
  <span class="ds-pill is-success">Paid</span>
  <span class="ds-pill is-warning">Awaiting payment</span>
  <span class="ds-pill is-error">Overdue</span>
  <span class="ds-pill is-neutral">Draft</span>
</div>
```

Rules:

- Write the status as a word. Colour and dot support it.
- Text on a tint uses `base-content` or the `-text` role, never the base status colour in the light theme.
- Do not mark an error with red alone: add the message beside the field, linked with `aria-describedby`.
- Do not change a meaning to suit a brand. A brand may adjust a tone, not a meaning.

## State layers {#state-layers}

Hover, press, selection and drag are expressed as a translucent layer of the content colour over the surface, not as new colours. Tokens:

| Token | Value | Used for |
| --- | --- | --- |
| `--ds-opacity-state-hover` | 0.06 | Hover on rows, ghost buttons, menu items |
| `--ds-opacity-state-pressed` | 0.10 | Pointer down |
| `--ds-opacity-state-selected` | 0.12 | Selected rows, current item, chosen option (with the primary colour) |
| `--ds-opacity-state-drag` | 0.16 | Drop targets and dragged items |

```css
.app-row:hover {
  background: color-mix(in oklab, var(--color-base-content) calc(var(--ds-opacity-state-hover) * 100%), var(--color-base-100));
}
.app-row[aria-selected="true"] {
  background: color-mix(in oklab, var(--color-primary) calc(var(--ds-opacity-state-selected) * 100%), var(--color-base-100));
}
```

Because layers mix from tokens, they adjust to any theme with no new hex values. Tints stay at 16% or lower so text on them keeps 4.5:1.

## Tint and border recipes {#recipes}

| Purpose | Range | Example |
| --- | --- | --- |
| Soft fill on a surface | 6 to 12% | `color-mix(in oklab, var(--color-error) 10%, var(--color-base-100))` |
| Soft fill on nothing | 4 to 16% | `color-mix(in oklab, var(--color-primary) 10%, transparent)` |
| Tone border | 22 to 45% | `color-mix(in oklab, var(--color-info) 35%, var(--color-base-300))` |
| Text selection | 24% | `color-mix(in oklab, var(--color-primary) 24%, transparent)` |

## Dark mode {#dark}

The dark theme is designed, not inverted.

- Surfaces are blue-black (`base-100` `#151c25`, page `#0e141b`), not pure black, so shadows and hairlines still read.
- `primary` becomes `#00a4b2` with dark text `#0e141b`; light uses `#00838f` with white.
- `--ds-focus` becomes aqua `#00d4df` (9.38:1) because the light focus colour is too dark on a dark page.
- `--ds-link` moves to the `info` blue `#7aa2f7` (6.81:1).
- Status colours get lighter (`success` `#34d399`, `error` `#f87171`) and their `-text` roles equal the base colours, which already pass 4.5:1.
- Popovers are lifted with a little white (`color-mix` with 6% white) so a layer separates from the page without relying on shadow; shadows are darker (`.36`) because the page already is.
- Avoid pure white text (`base-content` is `#e6edf3`) and large saturated areas, which glare on dark.

Choose the theme in markup with `data-theme="light"` or `"dark"`; see [Theming](./theming.md).

## Primitive palette {#palette}

The raw values behind the roles. Hover a chip for its note.

```ds-palette
```

> [!WARNING]
> Components never use primitives. Write `var(--color-primary)`, not `#00838f` or `teal.600`. When a theme changes, only the semantic roles are remapped; a component that used a primitive would be left behind.

## Contrast results {#contrast}

`dotnet run tools/tokens.cs` computes the WCAG 2.2 ratio of 72 pairs in both themes and writes `wwwroot/tokens/contrast.json`. A required pair below 4.5:1 (text) or 3:1 (boundaries, focus ring, icons) fails the build. Pairs marked informational do not decide the result.

```ds-contrast
```

## Do and don't {#usage}

- Do use roles through variables: `color: var(--ds-subtle)`, `border-color: var(--ds-control-border)`.
- Do pair every status colour with a word and an icon.
- Do keep one `btn-primary` per area; teal marks it.
- Do check any new text-on-colour pair and add it to `tools/tokens.cs`.
- Don't use hex values, primitives or Tailwind palette classes (`bg-red-500`) in components.
- Don't tint above 16% behind text, or use gradients, glows or large saturated blocks.
- Don't use colour alone for state: selected rows also get a check, a bar or a weight change.
- Don't use blue for buttons or teal for links.

```css
.app-ref { color: var(--ds-link); text-decoration: underline; }
.app-hint { color: var(--ds-subtle); }
.app-field { border: 1px solid var(--ds-control-border); background: var(--color-base-100); }
```

```cshtml
<a asp-page="Details" asp-route-id="@Model.Id" class="text-link underline underline-offset-2">INV-2026-0418</a>
<p class="text-subtle">Format INV-YYYY-NNNN</p>
<input class="input border-control" />
```

Those utilities come from `generated/tailwind-theme.css` and resolve per element, so a nested `data-theme` keeps its own colours.
