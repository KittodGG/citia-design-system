---
title: Motion
group: foundations
order: 7
summary: Motion that explains a change and then gets out of the way: duration and easing tokens, springs, enter and exit symmetry, interruptibility and reduced motion.
---

Motion in Citia DS is physical and quiet. It shows where something came from, what changed and that the interface heard you. It is short, anchored to the element that caused it, interruptible, and mostly invisible. It never decorates.

## Tokens

```ds-motion
```

## Which token for what

| Use | Duration | Easing |
| --- | --- | --- |
| Colour, background, border, opacity on hover and focus | `--ds-duration-fast` (150ms) | `--ds-ease-standard` |
| Press feedback | `--ds-duration-instant` (120ms) | `--ds-ease-out` |
| Enter of popover, menu, tooltip, toast, dropdown | `--ds-duration-quick` (160ms) to `--ds-duration-enter` (220ms) | `--ds-ease-emphasized` |
| Exit of the same | `--ds-duration-exit` (140ms) | `--ds-ease-exit` |
| Indicators that travel (switch thumb, tab indicator, slider snap), panels, sheets | `--ds-duration-spring` (500ms) | `--ds-ease-spring` |
| After a gesture with momentum only (sheet flick, carousel throw) | `--ds-duration-spring-bounce` (450ms) | `--ds-ease-spring-bounce` |
| Dialog | `--ds-duration-base` (180ms) | `--ds-ease-emphasized` |
| Skeleton shimmer | `--ds-duration-shimmer` (1600ms) | linear, infinite |

Under 100ms feels instant and over 300ms feels slow for feedback. Only travelling indicators and panels may run longer, up to 500ms.

## Rules

1. **Enter is opacity plus a small move from the trigger.** Translate at most `--ds-enter-offset` (5px) or scale from 0.96–0.98, with `transform-origin` on the side of the trigger. Menus open from their button; sheets slide from their edge and leave the same way.
2. **Exit is faster than enter** and uses the exit easing: 140ms against 160–220ms.
3. **Animate only `transform` and `opacity`**, plus colours. Reveal height with `grid-template-rows: 0fr` to `1fr` or `interpolate-size: allow-keywords`; never animate `top`, `left`, `width` or `height`.
4. **Respond on pointer-down.** Press feedback runs through `:active`, never after the click.
5. **Stay interruptible.** A reopened element continues from where it is. CSS transitions do this; keyframe animations restart, so prefer transitions.
6. **Restraint.** One motion per state change. No bounce on things that did not move by gesture. No infinite animation except spinner, skeleton, live dot and indeterminate progress. No parallax. No hover lift on dense data UI; only clickable cards lift, by `--ds-lift` (-2px).

## Springs

A spring gives a surface mass: it starts fast and settles without a hard stop. The DS has two curves, both written as CSS `linear()` easings so they work in plain transitions.

- `--ds-ease-spring` with `--ds-duration-spring` (500ms) is **critically damped**: it reaches the target without overshoot. Use it for anything that moves because the user chose something (a switch, a tab indicator, a panel, a sheet).
- `--ds-ease-spring-bounce` with `--ds-duration-spring-bounce` (450ms) is a **light bounce** that overshoots by about 1.5%. Use it only after a gesture that carried momentum, such as flicking a sheet or throwing a carousel. Never on buttons, menus or anything the user did not push.

```html preview title="Critically damped spring and standard ease"
<style>
  .mo-track { position: relative; height: 2.75rem; border: 1px solid var(--color-base-300); border-radius: var(--ds-radius-full); background: var(--color-base-200); max-width: 22rem; }
  .mo-thumb { position: absolute; inset-block: .25rem; inset-inline-start: .25rem; width: 2.125rem; border-radius: var(--ds-radius-full); background: var(--color-primary); box-shadow: var(--ds-shadow-xs); transition: transform var(--ds-duration-spring) var(--ds-ease-spring); }
  .mo-track.is-standard .mo-thumb { transition-duration: var(--ds-duration-base); transition-timing-function: var(--ds-ease-standard); }
  .mo-track:hover .mo-thumb, .mo-track:focus-within .mo-thumb { transform: translateX(11.25rem); }
  [dir="rtl"] .mo-track:hover .mo-thumb, [dir="rtl"] .mo-track:focus-within .mo-thumb { transform: translateX(-11.25rem); }
  @media (hover: none) { .mo-track .mo-thumb { transform: translateX(11.25rem); } }
  @media (prefers-reduced-motion: reduce) { .mo-thumb { transition-property: opacity; } }
</style>
<div style="display:grid;gap:.75rem">
  <div class="mo-track" tabindex="0" aria-label="Spring demo"><span class="mo-thumb"></span></div>
  <div class="mo-track is-standard" tabindex="0" aria-label="Standard ease demo"><span class="mo-thumb"></span></div>
  <p class="ds-text-subtle" style="margin:0">Hover or focus a track. Top: spring (500ms). Bottom: standard ease (180ms).</p>
</div>
```

In JavaScript, use the Web Animations API with the same tokens (read them with `getComputedStyle(document.documentElement)`), start from the current on-screen value, and hand the release velocity of a gesture to the animation so it does not restart from zero. Check `matchMedia("(prefers-reduced-motion: reduce)").matches` first.

## Enter and exit symmetry

What leaves should leave the way it came. A menu that grew from its button shrinks back toward it; a sheet that slid from the bottom slides down. Exit is shorter (140ms) because the user has already decided and is waiting for the next thing.

```html preview title="Disclosure with grid-rows reveal"
<style>
  .mo-panel { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows var(--ds-duration-exit) var(--ds-ease-exit), opacity var(--ds-duration-exit) var(--ds-ease-exit); }
  .mo-panel > div { overflow: hidden; min-height: 0; }
  details[open] > .mo-panel { grid-template-rows: 1fr; opacity: 1; transition-duration: var(--ds-duration-enter); transition-timing-function: var(--ds-ease-emphasized); }
  .mo-details { max-width: 26rem; border: 1px solid var(--color-base-300); border-radius: var(--ds-radius-box); padding: .75rem 1rem; background: var(--color-base-100); }
  .mo-details summary { cursor: pointer; font-weight: 600; min-height: 1.75rem; }
  @media (prefers-reduced-motion: reduce) { .mo-panel { transition-property: opacity; } }
</style>
<details class="mo-details" open>
  <summary>Payment terms</summary>
  <div class="mo-panel"><div><p style="margin:.5rem 0 0">Net 30 from the invoice date. A 1.5% monthly fee applies after the due date.</p></div></div>
</details>
```

> [!NOTE]
> A closed `<details>` hides its content immediately in most browsers, so the exit shown above is only visible where `::details-content` transitions are supported. The enter always animates. Component pages state which browsers animate the exit.

## Interruptibility

People double-click, change their mind and navigate in the middle of an animation. A transition reverses from its current value; it does not jump to the end or restart. Test this: open and close a menu three times in under a second. The motion must stay smooth and never get stuck.

- Do not block input while something animates. A control stays pressable during its own transition.
- Prefer CSS transitions to `@keyframes` for anything toggled by state.
- For `[popover]`, `dialog` and `display` toggles use `@starting-style` and `transition-behavior: allow-discrete`, so CSS alone animates both directions.

## Press feedback

A button reacts when the pointer goes down, not when it lifts. `:active` applies `transform: scale(var(--ds-press-scale))` (0.97) over 120ms plus the pressed state layer. Press scale applies to buttons and chips only. Do not move a button on hover; the click target must stay under the cursor.

```html preview title="Press feedback"
<div style="display:flex;flex-wrap:wrap;gap:.75rem">
  <button type="button" class="btn btn-primary">Send invoice</button>
  <button type="button" class="btn">Save draft</button>
  <button type="button" class="btn btn-ghost">Cancel</button>
</div>
```

## Page and theme transitions

- Between pages, `@view-transition { navigation: auto }` gives a 180ms cross-fade on multi-page apps.
- On a theme change, `ds.js` calls `document.startViewTransition()` so colours cross-fade instead of flashing. It is skipped when reduced motion is on or the browser has no support.

## Reduced motion

`accessibility.css` is unlayered and loaded last, so it wins over component motion. Under `prefers-reduced-motion: reduce`:

- Durations drop to 0.01ms, iteration counts to 1, `scroll-behavior` to `auto`.
- View transitions are disabled.
- Transforms go: button press scale, card lift, chevron rotation.
- Looping indicators (`.ds-spinner`, the live dot pulse, busy progress) are hidden, because a loop would freeze mid-cycle. The text label that carries the state stays.
- Colour and opacity changes that explain state remain (cross-fades of 150ms or less). Reduced motion is not the absence of feedback.

When you write a component that moves, add its own `@media (prefers-reduced-motion: reduce)` block that removes the transform and keeps an opacity fade. In JavaScript, check `reduceMotion()` before animating.

## Usage

- Add no duration or easing outside the tokens. A new one goes into `tokens.json`.
- Do not run an animation longer than 500ms, and never one that makes the user wait.
- Do not use motion as the only signal. Pair it with a colour, text or icon change.
- Do not animate layout properties (`width`, `height`, `top`, `left`) every frame.

## Tokens

`--ds-duration-*`, `--ds-ease-*`, `--ds-press-scale`, `--ds-enter-offset`, `--ds-lift`.
