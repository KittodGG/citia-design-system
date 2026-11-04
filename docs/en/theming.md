---
title: Theming
group: getting-started
order: 5
summary: How light and dark themes work, how to follow the system setting, how to add a brand theme in tokens.json, and the checklist for a rebrand.
---

Every colour in every component comes from a theme variable. A rebrand means changing values in `tokens/tokens.json`, running one command and rebuilding the CSS. No component class changes.

## Light, dark and aliases

The DS ships two themes, selected with the `data-theme` attribute:

| `data-theme` | Scheme | Notes |
| --- | --- | --- |
| `light` | Light | Default. Warm off-white surfaces, teal primary. |
| `dark` | Dark | Used when the system prefers dark and nothing is saved. |
| `tps`, `tps-dark` | Light, dark | Legacy aliases from version 1. They resolve to the same values, so existing apps keep working. Prefer `light` and `dark` in new code. |

Each theme in `tokens.json` carries metadata under `$extensions.ds`:

```json
"light": {
  "$extensions": { "ds": {
    "label": "Light", "colorScheme": "light",
    "default": true, "prefersdark": false,
    "themeColor": "#f9f9f6", "aliases": ["tps"]
  } }
}
```

| Key | Meaning |
| --- | --- |
| `label` | Name shown in switchers. |
| `colorScheme` | `light` or `dark`; sets the browser `color-scheme` so native controls and scrollbars match. |
| `default` | The theme written to `:root`. Exactly one. |
| `prefersdark` | Applied when the system prefers dark and there is no `data-theme` yet. Exactly one. |
| `themeColor` | Browser UI colour (`<meta name="theme-color">`). |
| `aliases` | Extra `data-theme` names that select this theme. |

## How the theme is chosen

1. The server writes a default: `<html data-theme="light">`.
2. `_DsHead` runs a tiny script **before** the stylesheet. It reads the saved choice from `localStorage` (`<prefix>-theme`: `light`, `dark`, or empty for "follow the system"), then sets `data-theme`, `data-ds-mode` (`light`, `dark`, `system`) and `data-ds-scheme` (`light`, `dark`) on `<html>`. Nothing flashes.
3. `ds.js` handles `[data-ds-theme-toggle]` and `[data-ds-theme-set="light|dark|system"]`, updates the theme-color meta tag, and follows the operating system while the mode is `system`.

```html preview title="Theme choice (changes this site's theme)"
<div class="ds-segmented" role="group" aria-label="Theme">
  <button type="button" data-ds-theme-set="light" aria-pressed="false">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-sun"></use></svg>Light
  </button>
  <button type="button" data-ds-theme-set="dark" aria-pressed="false">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-moon"></use></svg>Dark
  </button>
  <button type="button" data-ds-theme-set="system" aria-pressed="false">System</button>
</div>
```

The DS saves only an explicit choice. With none saved, the theme tracks the operating system and changes live when it changes.

### Hooks for your CSS

Use `data-ds-scheme` when a rule must differ in dark but must not depend on a theme name, so it survives a brand theme:

```css
:root[data-ds-scheme="dark"] .logo-on-light { display: none; }
```

From JavaScript: `DS.theme.set("dark")`, `DS.theme.set("system")`. Read the current scheme from `document.documentElement.dataset.dsScheme`.

### A different theme per section

`data-theme` works on any element, and the variables resolve per element. A dark hero on a light page, or a preview canvas:

```html
<section data-theme="dark" class="p-8 bg-base-100 text-base-content">
  <h2>Always dark</h2>
</section>
```

Keep nested themes to large, self-contained regions. Do not nest to restyle a single control.

## Anatomy of a theme

Each theme in `tokens.json` under `themes.<name>` has three groups:

| Group | CSS output | Contents |
| --- | --- | --- |
| `color` | `--color-*` | The 20 daisyUI 5 roles: `base-100/200/300`, `base-content`, `primary`, `secondary`, `accent`, `neutral`, `info`, `success`, `warning`, `error`, each with `*-content`. |
| `ext` | `--ds-*` | Citia roles: `control-border`, `quiet`, `link`, `error-text`, `warning-text`, `popover*`, `subtle`, `muted`, `focus`, `scrim`, `syntax-*`. |
| `shadow` | `--ds-shadow-*` | Shadows, tuned per theme (heavier in dark). |

Values point at primitives (`{palette.teal.600}`), so one change in the palette flows to every theme that uses it. Space, radius, type, motion and z-index are shared by all themes.

## Add a brand theme

Example: a product with an indigo primary, theme names `acme` and `acme-dark`.

1. **Add primitives** to `palette`. Do not edit primitives other themes use.

   ```json
   "indigo": {
     "500": { "$value": "#4f6bed" },
     "600": { "$value": "#3a53c9" },
     "700": { "$value": "#2f45a8" }
   }
   ```

2. **Copy** `themes.light` to `themes.acme` and `themes.dark` to `themes.acme-dark`. Change the brand references: `primary`, `secondary`, `accent`, `quiet`, `focus`. Leave `success`, `warning`, `error` and `link` unless you have a reason.
3. **Set metadata.** In `acme`: `label`, `colorScheme: "light"`, `default: true`. In `acme-dark`: `colorScheme: "dark"`, `prefersdark: true`. Set `default` and `prefersdark` to `false` on the DS themes you replace, or delete them from your copy.
4. **Regenerate and check** from the repository root:

   ```powershell
   dotnet run tools/tokens.cs     # rebuilds CSS, JSON, Tailwind theme; exits 1 if a required pair fails
   powershell -NoProfile -File tools/css.ps1
   ```

5. **Use the names** in the layout:

   ```cshtml
   <html lang="en" data-theme="acme">
   <partial name="_DsHead" model='new HeadOptions(Light: "acme", Dark: "acme-dark", Storage: "acme")' />
   ```

### Contrast check

`tools/tokens.cs` computes WCAG contrast for 72 pairs across both themes (text on surfaces, text on primary, control borders, focus ring, links, status text, sidebar states) and writes `wwwroot/tokens/contrast.json`. A required pair under 4.5:1 for text, or 3:1 for boundaries and icons, exits with code 1. The full table is on [Colour](./color.md#contrast). When you introduce a component that puts text on a new colour, add its pair to `tools/tokens.cs`.

| Role | Requirement |
| --- | --- |
| `primary` with `primary-content` | Button text at least 4.5:1 |
| `control-border` against `base-100` | Field borders at least 3:1 |
| `link` on `base-100`, `base-200` and hover rows | At least 4.5:1 |
| `focus` on `base-100` and `base-200` | Focus ring at least 3:1 |
| Dark theme | Brand colours one step lighter, with dark `*-content` |

> [!WARNING]
> Do not change what a status colour means. Green stays success, orange stays caution, red stays failure or destructive. A brand may adjust the tone, not the meaning.

## Rebrand checklist

- [ ] Palette primitives added; existing primitives untouched.
- [ ] Light and dark themes both defined, names set in `HeadOptions` and `<html data-theme>`.
- [ ] `default` and `prefersdark` flags set on exactly one theme each.
- [ ] `dotnet run tools/tokens.cs` ends with "All required pairs pass (72 checked)".
- [ ] `tools/css.ps1` run; Option B apps rebuilt.
- [ ] Brand font, if different, added in `Styles/fonts.css` and `--ds-font-sans`; weights and tracking checked on [Typography](./typography.md).
- [ ] Logo and favicon replaced for both schemes; `themeColor` matches the page background.
- [ ] Every page checked in light and dark with the focus ring visible on primary buttons, links and inputs.
- [ ] `Storage` prefix unique per app on a shared domain.

Space, radius, type scale, motion and breakpoints stay as they are unless the product truly differs (a kiosk needing 56px targets, for instance). Record the reason in the token `$description`.

## Theme per docs site

This documentation site reads its themes from `appsettings.json` (`LightTheme`, `DarkTheme`, `Storage`). Point them at your brand themes to reuse the site for another product.
