---
title: Theme switcher
group: components
category: navigation
order: 7
summary: Let people pick light, dark or system theme. A segmented control with a sliding thumb, or one icon toggle, both driven by theme.js with a saved choice and no flash.
---

The theme switcher lets people choose how the interface looks: Light, Dark, or System (follow the operating system, live). The choice is saved in the browser and applied before the first paint, so a returning visitor never sees a flash of the wrong theme. Use the **segmented** form in settings and in a sidebar or footer, where all three options fit. Use the **icon toggle** in a navbar or top bar, where space is tight; it flips between light and dark.

Both forms are driven by `theme.js`; there is nothing to configure in the markup beyond the data attributes.

## Examples

### Segmented (icons)

Three icon buttons, each with an accessible name and a tooltip. `aria-pressed` marks the saved choice; the thumb slides to it. Try it: this changes the theme of the whole page.

```html preview title="Segmented switcher, icons"
<div class="ds-segmented ds-theme-switcher" role="group" aria-label="Theme" data-ds-segmented>
  <button type="button" data-ds-theme-set="light" aria-pressed="false" aria-label="Light" title="Light"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-sun"/></svg></button>
  <button type="button" data-ds-theme-set="dark" aria-pressed="false" aria-label="Dark" title="Dark"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-moon"/></svg></button>
  <button type="button" data-ds-theme-set="system" aria-pressed="false" aria-label="System" title="System"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-monitor"/></svg></button>
</div>
```

### Segmented with labels

Use `has-labels` in settings pages, where words are clearer than icons.

```html preview title="Segmented switcher, labels"
<div class="ds-segmented ds-theme-switcher has-labels" role="group" aria-label="Theme" data-ds-segmented>
  <button type="button" data-ds-theme-set="light" aria-pressed="false"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-sun"/></svg><span>Light</span></button>
  <button type="button" data-ds-theme-set="dark" aria-pressed="false"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-moon"/></svg><span>Dark</span></button>
  <button type="button" data-ds-theme-set="system" aria-pressed="false"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-monitor"/></svg><span>System</span></button>
</div>
<p class="ds-text-subtle" style="margin-top:0.75rem;font-size:0.875rem">System follows your device and changes with it, for example at sunset.</p>
```

### Icon toggle

One 40px button that flips between light and dark. It shows the current theme (a sun in light mode, a moon in dark mode) and its label names the action: "Switch to dark theme". The icons cross-fade and turn a quarter.

```html preview title="Icon toggle"
<button type="button" class="ds-theme-toggle" data-ds-theme-toggle aria-label="Switch to dark theme">
  <svg class="ds-icon ds-theme-toggle__light" aria-hidden="true"><use href="#ds-icon-sun"/></svg>
  <svg class="ds-icon ds-theme-toggle__dark" aria-hidden="true"><use href="#ds-icon-moon"/></svg>
</button>
```

### Sizes

`is-sm` and `is-lg` apply to the segmented form like any segmented control.

```html preview title="Small segmented"
<div class="ds-segmented ds-theme-switcher is-sm" role="group" aria-label="Theme (small)" data-ds-segmented>
  <button type="button" data-ds-theme-set="light" aria-pressed="false" aria-label="Light" title="Light"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-sun"/></svg></button>
  <button type="button" data-ds-theme-set="dark" aria-pressed="false" aria-label="Dark" title="Dark"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-moon"/></svg></button>
  <button type="button" data-ds-theme-set="system" aria-pressed="false" aria-label="System" title="System"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-monitor"/></svg></button>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | none | `--ds-subtle` icon on the track |
| Hover | pointer over an option or the toggle | 6% tint; text turns full contrast |
| Pressed (active press) | pointer down | 10% tint |
| Focus-visible | keyboard focus | 2px `--ds-focus` ring |
| Selected | `aria-pressed="true"` | raised thumb under the option, full-contrast icon |
| System selected | no saved choice | the System option is pressed; the page follows the OS and updates live |
| Dark | `html[data-ds-scheme="dark"]` | toggle shows the moon, label reads "Switch to light theme" |
| Changing | after a click | the page cross-fades for 200ms (View Transitions); instant under reduced motion |
| Another tab changed it | `storage` event | the page follows without animation |

## Anatomy

- `.ds-segmented.ds-theme-switcher` root with `role="group"`, a name and `data-ds-segmented`. Modifier `has-labels`.
- Options: `button[data-ds-theme-set="light|dark|system"]`.
- `.ds-theme-toggle[data-ds-theme-toggle]` the single button, with `.ds-theme-toggle__light` and `.ds-theme-toggle__dark` icons.

## Usage

- Offer all three options when you can. "System" is the best default for new visitors.
- Put the toggle in the top bar or navbar, and the segmented form in a settings page and in the sidebar footer.
- Do not hide the theme control behind more than one click.
- Do not animate the theme change yourself; `theme.js` handles the cross-fade and respects reduced motion.
- Include `_DsHead` (or the inline `theme-init.js`) in `<head>`, before the stylesheet. Without it the first paint can flash.
- Test every screen in both themes.

## Accessibility

- The segmented form is a group of toggle buttons: `aria-pressed` is true on the saved choice. Icon-only buttons have `aria-label` and `title` (localised: "Light", "Dark", "System").
- The toggle has an `aria-label` that names the action and updates after each change ("Switch to dark theme" / "Switch to light theme").
- Selected is shown by the raised thumb as well as the colour change.
- Contrast: icons keep 3:1 or better in both themes; the focus ring is `--ds-focus`.
- Forced colours: the selected option gets a 2px `Highlight` border.
- The theme change is announced by the label change only; no live region is needed because the whole page changes.

| Key | Action |
| --- | --- |
| Tab / Shift+Tab | Moves between the buttons |
| Enter / Space | Applies the theme |

## Razor

```cshtml
<ds-theme-switcher />                          @* segmented, icons *@
<ds-theme-switcher variant="labels" />         @* segmented with words *@
<ds-theme-switcher variant="toggle" />         @* single icon button *@
<ds-theme-switcher size="sm" label="Colour theme" />
```

The labels come from `DsText` ("theme.light", "theme.dark", "theme.system", "theme.label") and follow the request culture.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-theme-set="light\|dark\|system"` | Applies and saves that choice; `aria-pressed` follows the saved choice |
| `data-ds-theme-toggle` | Flips light and dark; keeps `aria-label` and `title` up to date |
| `data-ds-theme-icon="light\|dark"` | Optional children of a toggle, shown by state (hidden attribute). The `.ds-theme-toggle` icons need no attribute: CSS shows them |

```js
DS.theme.get();        // active theme name, e.g. "light"
DS.theme.getMode();    // "light" | "dark" | "system" (the saved choice)
DS.theme.isDark();
DS.theme.set("dark");  // saves and applies; set("system") clears the saved choice
DS.theme.toggle();

document.addEventListener("ds:themechange", (e) => console.log(e.detail.mode, e.detail.theme));
```

The choice is saved in `localStorage` under `<prefix>-theme` (`ds-theme` by default; the prefix comes from `data-ds-storage` on `<html>`). Saving "system" removes the key. The `<meta name="theme-color">` follows the page surface.

## Tokens

`--color-base-200`, `--color-base-300`, `--color-base-100`, `--color-base-content`, `--ds-subtle`, `--ds-focus`, `--ds-radius-xl`, `--ds-radius-lg`, `--ds-shadow-xs`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-duration-enter`, `--ds-duration-theme`, `--ds-duration-spring`, `--ds-ease-emphasized`, `--ds-ease-spring`.

## Native and daisyUI

Native `<button>` elements. daisyUI's `swap` and `theme-controller` are not used, because the DS themes are named by `data-theme` on `<html>` and the choice must work before the first paint. See [Theming](./theming.md) for how the themes are defined.
