---
title: Avatar
group: components
category: data-display
order: 1
summary: A person, team or entity as an image, initials or icon, with presence, sizes, stacked groups and a +N overflow.
source: TPS app.css .pt-avatar L3552–3559, Helpers/PortalUi.cs
---

An avatar identifies a person or entity at a glance. It shows an image when there is one and falls back to initials on one of eight stable colours, then to an icon. Use an [indicator](./indicator.md) to pin a [badge](./badge.md) to it, and a plain name column when identity is not the point of the row.

## Examples

```html preview title="Initials, broken image and icon"
<div style="display:flex;gap:.75rem;align-items:center;flex-wrap:wrap">
  <span class="ds-avatar c0" role="img" aria-label="Ayu Lestari"><span aria-hidden="true">AL</span></span>
  <span class="ds-avatar c1" role="img" aria-label="Daniel Okafor"><span aria-hidden="true">DO</span></span>
  <span class="ds-avatar c5 is-round" role="img" aria-label="Mei Tanaka"><span aria-hidden="true">MT</span></span>
  <span class="ds-avatar c3 is-solid is-round" role="img" aria-label="Sofia Marquez"><span aria-hidden="true">SM</span></span>
  <span class="ds-avatar is-neutral is-round" role="img" aria-label="Unknown user"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-user"></use></svg></span>
  <span class="ds-avatar c2 is-round" role="img" aria-label="Broken image, initials shown"><span aria-hidden="true">BI</span><img class="ds-avatar__img" src="/missing/avatar.png" alt=""></span>
</div>
```

```html preview title="Sizes xs to xl"
<div style="display:flex;gap:.75rem;align-items:center;flex-wrap:wrap">
  <span class="ds-avatar c0 is-xs is-round" role="img" aria-label="Ayu Lestari"><span aria-hidden="true">AL</span></span>
  <span class="ds-avatar c0 is-sm is-round" role="img" aria-label="Ayu Lestari"><span aria-hidden="true">AL</span></span>
  <span class="ds-avatar c0 is-md is-round" role="img" aria-label="Ayu Lestari"><span aria-hidden="true">AL</span></span>
  <span class="ds-avatar c0 is-lg is-round" role="img" aria-label="Ayu Lestari"><span aria-hidden="true">AL</span></span>
  <span class="ds-avatar c0 is-xl is-round" role="img" aria-label="Ayu Lestari"><span aria-hidden="true">AL</span></span>
  <span class="ds-avatar c4 is-xs" role="img" aria-label="Daniel Okafor"><span aria-hidden="true">DO</span></span>
  <span class="ds-avatar c4 is-xl" role="img" aria-label="Daniel Okafor"><span aria-hidden="true">DO</span></span>
</div>
```

```html preview title="Presence with text"
<div style="display:flex;gap:1.5rem;flex-wrap:wrap">
  <span class="ds-avatar-item">
    <span class="ds-avatar c0 is-round" role="img" aria-label="Ayu Lestari"><span aria-hidden="true">AL</span><span class="ds-avatar__presence" data-presence="online" aria-hidden="true"></span></span>
    <span class="ds-avatar-item__text"><span class="ds-avatar-item__name">Ayu Lestari</span><span class="ds-avatar-item__meta">Online</span></span>
  </span>
  <span class="ds-avatar-item">
    <span class="ds-avatar c1 is-round" role="img" aria-label="Daniel Okafor"><span aria-hidden="true">DO</span><span class="ds-avatar__presence" data-presence="away" aria-hidden="true"></span></span>
    <span class="ds-avatar-item__text"><span class="ds-avatar-item__name">Daniel Okafor</span><span class="ds-avatar-item__meta">Away</span></span>
  </span>
  <span class="ds-avatar-item">
    <span class="ds-avatar c5 is-round" role="img" aria-label="Mei Tanaka"><span aria-hidden="true">MT</span><span class="ds-avatar__presence" data-presence="busy" aria-hidden="true"></span></span>
    <span class="ds-avatar-item__text"><span class="ds-avatar-item__name">Mei Tanaka</span><span class="ds-avatar-item__meta">In a meeting</span></span>
  </span>
  <span class="ds-avatar-item">
    <span class="ds-avatar c3 is-round" role="img" aria-label="Sofia Marquez"><span aria-hidden="true">SM</span><span class="ds-avatar__presence" data-presence="offline" aria-hidden="true"></span></span>
    <span class="ds-avatar-item__text"><span class="ds-avatar-item__name">Sofia Marquez</span><span class="ds-avatar-item__meta">Offline</span></span>
  </span>
</div>
```

```html preview title="Group with +N overflow"
<div class="ds-avatar-group" role="group" aria-label="Project members">
  <span class="ds-avatar c0 is-round" role="img" aria-label="Ayu Lestari" title="Ayu Lestari"><span aria-hidden="true">AL</span></span>
  <span class="ds-avatar c1 is-round" role="img" aria-label="Daniel Okafor" title="Daniel Okafor"><span aria-hidden="true">DO</span></span>
  <span class="ds-avatar c5 is-round" role="img" aria-label="Mei Tanaka" title="Mei Tanaka"><span aria-hidden="true">MT</span></span>
  <button type="button" class="ds-avatar is-more is-round" aria-label="3 more: Sofia Marquez, Rafi Pratama, Hana Kim" title="Sofia Marquez, Rafi Pratama, Hana Kim"><span aria-hidden="true">+3</span></button>
</div>
```

## States

```html preview title="Interactive, disabled, loading"
<div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
  <button type="button" class="ds-avatar c0 is-round" aria-label="Open profile of Ayu Lestari"><span aria-hidden="true">AL</span></button>
  <button type="button" class="ds-avatar c1 is-round" aria-label="Profile unavailable" disabled><span aria-hidden="true">DO</span></button>
  <span class="ds-avatar is-round" aria-busy="true" role="img" aria-label="Loading"></span>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Default | Tonal fill (16% of the hue) with hue-tinted initials |
| Loading image | Image not yet decoded | Initials stay visible behind the image |
| Broken image | `error` event or `naturalWidth` 0 | `data-state="failed"` hides the image; initials show |
| Hover | Pointer over a button or link avatar | 2px ring at 35% of the hue |
| Focus-visible | Keyboard focus on a button or link avatar | 2px `--ds-focus` ring, 2px offset |
| Pressed | `:active` | Brightness drops 6% |
| Disabled | `disabled` or `aria-disabled="true"` | `--ds-opacity-disabled`, `cursor: not-allowed` |
| Loading | `aria-busy="true"` | Bone with a shimmer; stops under reduced motion |
| Presence | `data-presence` on `.ds-avatar__presence` | online: filled; away: notch; busy: bar; offline: hollow ring |

## Anatomy

- `.ds-avatar` with `c0`–`c7` hue, `is-xs|sm|md|lg|xl`, `is-round` (alias `is-circle`) or `is-square`, `is-solid`, `is-neutral`.
- `.ds-avatar__img` image, `.ds-avatar__presence` dot.
- `.ds-avatar-group` stack (`is-spread` removes the overlap), `.ds-avatar.is-more` overflow.
- `.ds-avatar-item` avatar with `__text`, `__name`, `__meta`.

## Usage

- Pass the full name to `Avatar.Initials` and `Avatar.ColorClass`: the same name always gets the same colour.
- Show at most 4 avatars in a group, then `+N`. Put the hidden names in `title` and in the accessible name.
- Use `xs` (20px) only next to text that repeats the name; initials are 9px there.
- Do not use presence colour alone: the text beside the avatar or the accessible name must say it.
- Use `is-round` for people and `is-square` for teams, projects and organisations.

## Accessibility

- A meaningful avatar is `role="img"` with `aria-label` (name, plus presence). Decorative next to the name: `aria-hidden="true"`.
- Presence shapes differ (filled, notch, bar, hollow) so state is not colour only.
- Tonal initials keep at least 4.5:1 on the tinted fill in both themes.

| Key | Action |
| --- | --- |
| Tab | Moves to a button or link avatar |
| Enter, Space | Activates a button avatar (Enter for a link) |

## Razor

```cshtml
<ds-avatar name="Ayu Lestari" src="/img/ayu.jpg" size="lg" shape="circle" presence="online" />
<ds-avatar icon="user" label="Guest" />
<ds-avatar-group names="@Model.Members" max="4" size="sm" label="Project members" />
```

`Avatar.Initials("Ayu Lestari")` returns `AL`; `Avatar.ColorClass("Ayu Lestari")` returns `c0` to `c7`.

## JavaScript

| Attribute or class | Effect |
| --- | --- |
| `img.ds-avatar__img` inside `.ds-avatar` | `chips.js` hides it on `error` (also when it failed before the script ran) |

## Tokens

`--ds-size-avatar` (set by the size class), `--ds-radius-box`, `--ds-radius-full`, `--ds-focus`, `--ds-duration-shimmer`, `--ds-opacity-disabled`, `--color-success`, `--color-warning`, `--color-error`.

## Native and daisyUI

Builds on `span`, `button` or `a`. It replaces daisyUI `avatar` and `avatar-group`; the DS names add initials, presence and stable hues. daisyUI `avatar` markup still renders but does not get these states.
