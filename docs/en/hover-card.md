---
title: Hover card
group: components
category: overlays
order: 5
summary: A preview of a linked person, project or document that appears after half a second of hover or on keyboard focus, never the only way to the content.
---

A hover card previews what a link points to (a person, a project, an invoice) so the user can decide whether to follow
it. It opens after 500ms of hover or when the link receives keyboard focus, stays open while the pointer moves into it,
and closes 300ms after the pointer leaves. It never opens on touch: the link itself is the way in, and everything in the
card must also be on the page it links to. Use a [Tooltip](./tooltip.md) for a short label of an icon button and a
[Popover](./popover.md) for content the user opens on purpose.

## Examples

### Person

```html preview title="Assignee preview"
<p>Assigned to
  <a href="#" data-ds-hover-card="hc-ayu">Ayu Lestari</a>
  on 4 March 2026.
</p>

<div id="hc-ayu" popover="manual" class="ds-hover-card" data-ds-side="bottom" data-ds-align="start">
  <div class="ds-hover-card__head">
    <span class="ds-avatar" aria-hidden="true">AL</span>
    <div>
      <p class="ds-hover-card__title">Ayu Lestari</p>
      <p class="ds-hover-card__meta">Operations lead · Jakarta office</p>
    </div>
  </div>
  <p class="ds-hover-card__body">Owns 6 projects, including PRJ-1024 Warehouse relocation.</p>
  <div class="ds-hover-card__footer">
    <span>Local time 14:20 WIB</span>
    <span>Joined January 2023</span>
  </div>
</div>
```

### Project, with an arrow

```html preview title="Project preview"
<p>This invoice belongs to
  <a href="#" data-ds-hover-card="hc-prj">PRJ-1031</a>.
</p>

<div id="hc-prj" popover="manual" class="ds-hover-card is-arrow" data-ds-side="top" data-ds-align="center">
  <p class="ds-hover-card__title">PRJ-1031 · Brand refresh</p>
  <p class="ds-hover-card__meta">Tanaka Studio · owner Mei Tanaka</p>
  <p class="ds-hover-card__body">New logo, colours and templates for print and web. Phase 2 of 3.</p>
  <div class="ds-hover-card__footer">
    <span>Budget IDR 185.000.000</span>
    <span>Due 15 May 2026</span>
  </div>
</div>
```

## States

```html preview title="Trigger and card"
<div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: flex-start">
  <p style="margin: 0">Rest: <a href="#" data-ds-hover-card="none">Daniel Okafor</a></p>
  <p style="margin: 0">Open: <a href="#" data-ds-hover-card="none" data-state="open">Daniel Okafor</a></p>
  <div class="ds-hover-card" role="group" aria-label="Card">
    <p class="ds-hover-card__title">Daniel Okafor</p>
    <p class="ds-hover-card__meta">Finance · Lagos branch</p>
  </div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | default | Link with a 1px dotted underline (only on text links) |
| Waiting | pointer over the link | Nothing yet; the card opens after 500ms (`data-ds-open-delay`) |
| Open | delay passed, or keyboard focus (300ms) | Card grows from the link side, 160ms emphasized; underline turns solid (`data-state="open"`) |
| Pointer in the card | pointer moves into the card | Stays open; text can be selected, links in it work |
| Closing | pointer leaves link and card for 300ms, blur, Escape | Fades back towards the link, 140ms |
| Touch | `pointer: coarse` or a touch | Never opens; the tap follows the link |
| Reduced motion | media query | Opacity only |

## Anatomy

- Trigger: a link (or button) with `data-ds-hover-card="id"`.
- `[popover=manual].ds-hover-card`: the card; `is-arrow` adds a pointer.
- `.ds-hover-card__head` (avatar, title, meta), `.ds-hover-card__title`, `.ds-hover-card__meta`, `.ds-hover-card__body`, `.ds-hover-card__footer`.

## Usage

- Use hover cards on links to people, projects and documents in dense text and tables, where opening each link would be slow.
- Repeat nothing that is not also on the target page; the card is a shortcut, not a container.
- Keep it to a title, one line of meta, at most two lines of body and a footer of facts. No forms.
- Do not put the only copy of an action in a hover card; at most one link that repeats the trigger.
- Keep the 500ms delay. Shorter delays open cards while the pointer only crosses the text.

## Accessibility

- The trigger keeps its own role and name; the card is supplementary and does not change it.
- Keyboard users get the card on focus (300ms) and close it with Escape; focus stays on the link.
- Screen reader users reach the same information by following the link, so the card adds no `aria-describedby`.
- The card does not open on touch, so it never hides the target on phones.

| Key | Action |
| --- | --- |
| Tab onto the link | Opens the card after 300ms |
| Escape | Closes the card |
| Enter | Follows the link |
| Tab away | Closes the card |

## Razor

```cshtml
<a asp-page="/People/Details" asp-route-id="@person.Id" data-ds-hover-card="@($"hc-{person.Id}")">@person.Name</a>

<ds-hover-card id="@($"hc-{person.Id}")" side="bottom" align="start">
    <div class="ds-hover-card__head">
        <span class="ds-avatar" aria-hidden="true">@person.Initials</span>
        <div><p class="ds-hover-card__title">@person.Name</p><p class="ds-hover-card__meta">@person.Role</p></div>
    </div>
</ds-hover-card>
```

`ds-hover-card` attributes: `id`, `side`, `align`, `arrow`.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-hover-card="id"` | Links the trigger to the card |
| `data-ds-open-delay="500"` | Hover delay in ms (focus uses at most 300ms) |
| `data-ds-close-delay="300"` | Delay before closing after the pointer leaves |
| `data-ds-side`, `data-ds-align` on the card | Preferred placement (bottom, centre by default) |

```js
DS.hoverCard.open("hc-ayu");
DS.hoverCard.close("hc-ayu");
```

Events: `ds:popover:open` and `ds:popover:close` bubble from the card.

## Tokens

`--ds-popover`, `--color-base-300`, `--ds-shadow-popover`, `--ds-radius-xl`, `--ds-z-popover`, `--ds-subtle`,
`--ds-type-card-title-*`, `--ds-type-callout-*`, `--ds-type-footnote-size`, `--ds-duration-quick`, `--ds-duration-exit`,
`--ds-ease-emphasized`, `--ds-ease-exit`.

## Native and daisyUI

- HTML Popover API with `popover="manual"`, so a hover card never closes an open menu or popover. Without JavaScript the card stays hidden and the link works as usual.
- daisyUI has no hover card; `.dropdown-hover` opens on hover without a delay or keyboard support and is not recommended for previews.
