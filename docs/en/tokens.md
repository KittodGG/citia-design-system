---
title: Tokens
group: reference
order: 1
summary: Every token with its final value in each theme. Generated from tokens/tokens.json.
---

> [!NOTE]
> This page is **generated** by `dotnet run tools/tokens.cs`. Edit `tokens/tokens.json` (and `tokens/descriptions.id.json` for Indonesian), then run it again. Source: TPS/TPS.Integration/Styles/app.css @ 88cd8e4.

## Theme names and aliases

Each theme answers to its name and to its aliases in `data-theme` (aliases keep existing apps working).

| `data-theme` | Value |
| --- | --- |
| `light` | light · alias: `tps` |
| `dark` | dark · alias: `tps-dark` |

## Theme colours

The first column is the CSS variable. `--color-*` follows daisyUI 5; `--ds-*` are the Citia extensions.

| Variable | `light` | `dark` | Role |
| --- | --- | --- | --- |
| `--color-base-100` | `#f9f9f6` | `#151c25` | Surface: cards, tables, inputs, document sidebar. |
| `--color-base-200` | `#f1f2ee` | `#0e141b` | Page background, table headers, read-only fields. |
| `--color-base-300` | `#dfe3dd` | `#253040` | Borders and dividers. |
| `--color-base-content` | `#0f172a` | `#e6edf3` | Primary text. |
| `--color-primary` | `#00838f` | `#00a4b2` | Primary actions, active navigation, brand focus. |
| `--color-primary-content` | `#ffffff` | `#0e141b` |  |
| `--color-secondary` | `#00767f` | `#05666f` | Application sidebar background. |
| `--color-secondary-content` | `#ffffff` | `#ffffff` |  |
| `--color-accent` | `#00a4b2` | `#00d4df` | Focus ring, active rail marker, charts. |
| `--color-accent-content` | `#0f172a` | `#0e141b` |  |
| `--color-neutral` | `#0f172a` | `#e6edf3` |  |
| `--color-neutral-content` | `#f6f8fa` | `#0e141b` |  |
| `--color-info` | `#3b6fd4` | `#7aa2f7` |  |
| `--color-info-content` | `#ffffff` | `#0e141b` |  |
| `--color-success` | `#047857` | `#34d399` |  |
| `--color-success-content` | `#ffffff` | `#0e141b` |  |
| `--color-warning` | `#c2410c` | `#f59e0b` |  |
| `--color-warning-content` | `#ffffff` | `#0e141b` |  |
| `--color-error` | `#dc2626` | `#f87171` |  |
| `--color-error-content` | `#ffffff` | `#0e141b` |  |
| `--ds-control-border` | `#7b8a94` | `#74848f` | Border for inputs, selects and secondary buttons (≥ 3:1). |
| `--ds-quiet` | `#006a73` | `var(--color-primary)` | Quiet teal text: ghost buttons, eyebrows, empty-state icons. |
| `--ds-link` | `#2b5cc4` | `var(--color-info)` | Identity link (.ds-link-ref). Blue is only for links. |
| `--ds-error-text` | `#b91c1c` | `var(--color-error)` |  |
| `--ds-warning-text` | `#9a3412` | `var(--color-warning)` |  |
| `--ds-popover` | `var(--color-base-100)` | `color-mix(in oklab, var(--color-base-100) 94%, #ffffff)` | Floating layer surface (dropdown, calendar, combobox). |
| `--ds-popover-border` | `var(--ds-control-border)` | `var(--ds-control-border)` |  |
| `--ds-popover-hover` | `color-mix(in oklab, var(--color-base-content) 7%, var(--color-base-100))` | `color-mix(in oklab, var(--color-base-100) 88%, #ffffff)` |  |
| `--ds-subtle` | `color-mix(in oklab, var(--color-base-content) 75%, var(--color-base-100))` | `color-mix(in oklab, var(--color-base-content) 75%, var(--color-base-100))` | Secondary text: field help, captions, meta labels. |
| `--ds-muted` | `color-mix(in oklab, var(--color-base-content) 68%, transparent)` | `color-mix(in oklab, var(--color-base-content) 68%, transparent)` | Tertiary text that still passes AA on base-100 (.text-muted). |
| `--ds-focus` | `#00838f` | `#00d4df` | Focus ring. The older version used accent (#00a4b2 = 2.86:1 on base-100); the DS uses primary so it is ≥ 3:1 (WCAG 1.4.11). |
| `--ds-scrim` | `rgb(8 18 28 / .4)` | `rgb(8 18 28 / .4)` | Modal backdrop (::backdrop). |
| `--ds-excel` | `#1d6f42` | `#1d6f42` |  |
| `--ds-excel-hover` | `#185c37` | `#185c37` |  |
| `--ds-pdf` | `#b30b00` | `#b30b00` |  |
| `--ds-pdf-hover` | `#8f0900` | `#8f0900` |  |
| `--ds-syntax-tag` | `#006780` | `#66d9e8` | XML/HTML tag. |
| `--ds-syntax-attr` | `#8c3a17` | `#edba82` | XML/HTML attribute. |
| `--ds-primary-soft` | `color-mix(in oklab, var(--color-primary) 12%, var(--color-base-100))` | `color-mix(in oklab, var(--color-primary) 20%, var(--color-base-100))` | Tonal primary fill for status surfaces (alerts, pills, chips, selected rows). Pair with --ds-primary-text or base content. |
| `--ds-info-soft` | `color-mix(in oklab, var(--color-info) 12%, var(--color-base-100))` | `color-mix(in oklab, var(--color-info) 20%, var(--color-base-100))` | Tonal info fill for status surfaces (alerts, pills, chips, selected rows). Pair with --ds-info-text or base content. |
| `--ds-success-soft` | `color-mix(in oklab, var(--color-success) 12%, var(--color-base-100))` | `color-mix(in oklab, var(--color-success) 20%, var(--color-base-100))` | Tonal success fill for status surfaces (alerts, pills, chips, selected rows). Pair with --ds-success-text or base content. |
| `--ds-warning-soft` | `color-mix(in oklab, var(--color-warning) 12%, var(--color-base-100))` | `color-mix(in oklab, var(--color-warning) 20%, var(--color-base-100))` | Tonal warning fill for status surfaces (alerts, pills, chips, selected rows). Pair with --ds-warning-text or base content. |
| `--ds-error-soft` | `color-mix(in oklab, var(--color-error) 12%, var(--color-base-100))` | `color-mix(in oklab, var(--color-error) 20%, var(--color-base-100))` | Tonal error fill for status surfaces (alerts, pills, chips, selected rows). Pair with --ds-error-text or base content. |
| `--ds-neutral-soft` | `color-mix(in oklab, var(--color-base-content) 6%, var(--color-base-100))` | `color-mix(in oklab, var(--color-base-content) 10%, var(--color-base-100))` | Tonal neutral fill: tags, inactive pills, inline code backgrounds. |
| `--ds-info-text` | `#2b5cc4` | `var(--color-info)` | Info text and icons on light surfaces (≥ 4.5:1). |
| `--ds-success-text` | `#047857` | `var(--color-success)` | Success text and icons on light surfaces (≥ 4.5:1). |
| `--ds-primary-text` | `#006a73` | `var(--color-primary)` | Primary-coloured text on light surfaces (≥ 4.5:1). |
| `--ds-chart-1` | `var(--color-primary)` | `var(--color-primary)` | Categorical chart series 1. Graphic contrast on base-100 (≥ 3.9:1); use in this order, never as the only cue (label or legend). |
| `--ds-chart-2` | `#3a61c4` | `#86a9f7` | Categorical chart series 2. Graphic contrast on base-100 (≥ 3.9:1); use in this order, never as the only cue (label or legend). |
| `--ds-chart-3` | `#c26300` | `#f0a646` | Categorical chart series 3. Graphic contrast on base-100 (≥ 3.9:1); use in this order, never as the only cue (label or legend). |
| `--ds-chart-4` | `#c72c53` | `#f6838e` | Categorical chart series 4. Graphic contrast on base-100 (≥ 3.9:1); use in this order, never as the only cue (label or legend). |
| `--ds-chart-5` | `#137738` | `#6cd092` | Categorical chart series 5. Graphic contrast on base-100 (≥ 3.9:1); use in this order, never as the only cue (label or legend). |
| `--ds-chart-6` | `#8048b6` | `#be95ec` | Categorical chart series 6. Graphic contrast on base-100 (≥ 3.9:1); use in this order, never as the only cue (label or legend). |
| `--ds-chart-7` | `#576574` | `#a0b0c1` | Categorical chart series 7. Graphic contrast on base-100 (≥ 3.9:1); use in this order, never as the only cue (label or legend). |
| `--ds-chart-8` | `#857d0b` | `#c9c261` | Categorical chart series 8. Graphic contrast on base-100 (≥ 3.9:1); use in this order, never as the only cue (label or legend). |

## Shadows per theme

| Variable | `light` | `dark` | Role |
| --- | --- | --- | --- |
| `--ds-shadow-popover` | `0 .5rem 1.5rem rgb(15 23 42 / .16)` | `0 .5rem 1.5rem rgb(0 0 0 / .36)` | Floating layer: combobox, calendar, popover menu. |
| `--ds-shadow-lift` | `0 14px 26px -16px rgb(6 30 46 / .5), 0 2px 6px rgb(6 30 46 / .06)` | `0 14px 28px -14px rgb(0 0 0 / .8)` | Interactive card on hover/focus. |
| `--ds-shadow-pinned-end` | `-4px 0 8px rgb(0 0 0 / .04)` | `-4px 0 8px rgb(0 0 0 / .16)` | Right sticky column while the table scrolls. |

## daisyUI shape

| Variable | Value | Role |
| --- | --- | --- |
| `--radius-selector` | `0.375rem` | Checkbox, toggle, badge. |
| `--radius-field` | `0.375rem` | Button, input, select, tab. |
| `--radius-box` | `0.625rem` | Card, modal, alert, surface. |
| `--size-selector` | `0.25rem` |  |
| `--size-field` | `0.25rem` |  |
| `--border` | `1px` |  |
| `--depth` | `0` | 0 = flat surface without the built-in daisyUI gradient or shadow. |
| `--noise` | `0` |  |

## Primitive palette

Components never use primitives directly. Change them here; themes follow through `{palette.*}` references.

| Token | Value | Notes |
| --- | --- | --- |
| `palette.white` | `#ffffff` |  |
| `palette.teal.500` | `#00a4b2` | Main teal. Large graphics (container fill), primary of the dark theme. White text on it is only 3.0:1, so it is not a button color for the light theme. |
| `palette.teal.600` | `#00838f` | Main teal-600. Primary of the light theme (white text ≥ 4.5:1). |
| `palette.teal.700` | `#00767f` | Secondary of the light theme; sidebar background. |
| `palette.teal.750` | `#006a73` | Quiet teal text in the light theme. |
| `palette.teal.800` | `#05666f` | Secondary of the dark theme; dark sidebar background. |
| `palette.aqua.400` | `#00d4df` | Accent of the dark theme; active marker. |
| `palette.paper.50` | `#f9f9f6` | Off-white surface (light base-100). Review directive of 29 Oct 2026. |
| `palette.paper.100` | `#f1f2ee` | Off-white background (light base-200). |
| `palette.paper.200` | `#dfe3dd` | Quiet line/border (light base-300). |
| `palette.steel.400` | `#7b8a94` | Control border in the light theme (≥ 3:1 against the surface). |
| `palette.steel.450` | `#74848f` | Control border in the dark theme. |
| `palette.slate.900` | `#0f172a` | Main ink of the light theme; neutral. |
| `palette.frost.50` | `#f6f8fa` | Neutral content of the light theme. |
| `palette.frost.100` | `#e6edf3` | Main ink of the dark theme. |
| `palette.night.700` | `#253040` | Border of the dark theme (base-300). |
| `palette.night.800` | `#151c25` | Surface of the dark theme (base-100). |
| `palette.night.900` | `#0e141b` | Background of the dark theme (base-200); text on light colors in the dark theme. |
| `palette.blue.400` | `#7aa2f7` | Info and links in the dark theme (≥ 5.3:1 on base-100/200/300). |
| `palette.blue.500` | `#3b6fd4` | Info in the light theme (4.47:1 on base-200, so not a link text color). |
| `palette.blue.600` | `#2b5cc4` | Links in the light theme (≥ 5.75:1 on base-100, base-200 and hover rows). |
| `palette.emerald.400` | `#34d399` |  |
| `palette.emerald.700` | `#047857` |  |
| `palette.amber.500` | `#f59e0b` |  |
| `palette.orange.700` | `#c2410c` |  |
| `palette.orange.800` | `#9a3412` | Warning text in the light theme. |
| `palette.red.400` | `#f87171` |  |
| `palette.red.600` | `#dc2626` |  |
| `palette.red.700` | `#b91c1c` | Error text in the light theme. |
| `palette.excel.600` | `#1d6f42` | Excel green: import/download/export .xlsx. |
| `palette.excel.700` | `#185c37` |  |
| `palette.pdf.600` | `#b30b00` | PDF red: export .pdf. |
| `palette.pdf.700` | `#8f0900` |  |
| `palette.avatar.c0` | `#00838f` |  |
| `palette.avatar.c1` | `#2b5cc4` |  |
| `palette.avatar.c2` | `#7c3aed` |  |
| `palette.avatar.c3` | `#c2410c` |  |
| `palette.avatar.c4` | `#047857` |  |
| `palette.avatar.c5` | `#be185d` |  |
| `palette.avatar.c6` | `#4d7c0f` |  |
| `palette.avatar.c7` | `#0e7490` |  |
| `palette.brand.deep` | `#04222a` |  |
| `palette.brand.ink` | `#0b1720` |  |
| `palette.brand.amber` | `#ffb938` |  |

## Font

| Variable | Value | Notes |
| --- | --- | --- |
| `--ds-font-sans` | `"Manrope", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` | Manrope variable 200–800 (400–800 in use), self-hosted, OFL 1.1. |
| `--ds-font-mono` | `ui-monospace, "Cascadia Mono", "Segoe UI Mono", Consolas, "SF Mono", Menlo, monospace` | For XML, literal code and secret keys only. |
| `--ds-weight-regular` | `400` |  |
| `--ds-weight-medium` | `500` |  |
| `--ds-weight-semibold` | `600` |  |
| `--ds-weight-strong` | `650` |  |
| `--ds-weight-bold` | `700` |  |
| `--ds-weight-heavy` | `750` |  |
| `--ds-weight-extrabold` | `800` |  |

## Typography

| Variable | Value | Notes |
| --- | --- | --- |
| `--ds-type-display-size` | `clamp(2rem, 3vw, 3rem)` | Hero title of the login/landing page (.auth-hero-title). |
| `--ds-type-display-leading` | `1.1` |  |
| `--ds-type-display-weight` | `750` |  |
| `--ds-type-display-tracking` | `-0.04em` |  |
| `--ds-type-title-1-size` | `clamp(1.75rem, 2.5vw, 2.25rem)` | Page title (h1) for list/form/detail views (.master-heading h1). |
| `--ds-type-title-1-leading` | `1.15` |  |
| `--ds-type-title-1-weight` | `650` |  |
| `--ds-type-title-1-tracking` | `-0.035em` |  |
| `--ds-type-title-2-size` | `clamp(1.375rem, 2vw, 1.75rem)` | Portal/dashboard screen title (.pt-header h1). |
| `--ds-type-title-2-leading` | `1.2` |  |
| `--ds-type-title-2-weight` | `750` |  |
| `--ds-type-title-2-tracking` | `-0.03em` |  |
| `--ds-type-title-3-size` | `clamp(1.25rem, 1.6vw, 1.625rem)` | Top bar title (.topbar-title). |
| `--ds-type-title-3-leading` | `1.25` |  |
| `--ds-type-title-3-weight` | `750` |  |
| `--ds-type-title-3-tracking` | `-0.03em` |  |
| `--ds-type-title-auth-size` | `1.75rem` | Login panel title (.auth-title). |
| `--ds-type-title-auth-leading` | `1.2` |  |
| `--ds-type-title-auth-weight` | `650` |  |
| `--ds-type-title-auth-tracking` | `-0.02em` |  |
| `--ds-type-headline-size` | `1.25rem` | Dialog title, empty state (.qa-title, .master-empty h2). |
| `--ds-type-headline-leading` | `1.3` |  |
| `--ds-type-headline-weight` | `650` |  |
| `--ds-type-headline-tracking` | `-0.01em` |  |
| `--ds-type-section-size` | `1.0625rem` | Fieldset legend, form section title (.master-fieldset legend). |
| `--ds-type-section-leading` | `1.4` |  |
| `--ds-type-section-weight` | `650` |  |
| `--ds-type-section-tracking` | `0` |  |
| `--ds-type-card-title-size` | `0.9375rem` | Card title (.pt-card-head h2). |
| `--ds-type-card-title-leading` | `1.4` |  |
| `--ds-type-card-title-weight` | `700` |  |
| `--ds-type-card-title-tracking` | `0` |  |
| `--ds-type-body-size` | `1rem` | Body text and all inputs (16 px prevents zoom on iOS). |
| `--ds-type-body-leading` | `1.5` |  |
| `--ds-type-body-weight` | `400` |  |
| `--ds-type-body-tracking` | `0` |  |
| `--ds-type-label-size` | `0.9375rem` | Field label (.master-field > label). |
| `--ds-type-label-leading` | `1.5` |  |
| `--ds-type-label-weight` | `600` |  |
| `--ds-type-label-tracking` | `0` |  |
| `--ds-type-callout-size` | `0.875rem` | Table content, navigation items, buttons. |
| `--ds-type-callout-leading` | `1.5` |  |
| `--ds-type-callout-weight` | `400` |  |
| `--ds-type-callout-tracking` | `0` |  |
| `--ds-type-footnote-size` | `0.8125rem` | Field help, data table headers, notes (.master-help). |
| `--ds-type-footnote-leading` | `1.5` |  |
| `--ds-type-footnote-weight` | `400` |  |
| `--ds-type-footnote-tracking` | `0` |  |
| `--ds-type-caption-size` | `0.75rem` | KPI captions, time, meta (.pt-kpi-sub). |
| `--ds-type-caption-leading` | `1.4` |  |
| `--ds-type-caption-weight` | `400` |  |
| `--ds-type-caption-tracking` | `0` |  |
| `--ds-type-eyebrow-size` | `0.6875rem` | Sidebar group heading, portal eyebrow, badge label (.sb-group-toggle, .pt-eyebrow). |
| `--ds-type-eyebrow-leading` | `1rem` |  |
| `--ds-type-eyebrow-weight` | `700` |  |
| `--ds-type-eyebrow-tracking` | `0.08em` |  |
| `--ds-type-table-head-size` | `0.6875rem` | Modern table header (.pt-table th). |
| `--ds-type-table-head-leading` | `1rem` |  |
| `--ds-type-table-head-weight` | `700` |  |
| `--ds-type-table-head-tracking` | `0.06em` |  |
| `--ds-type-micro-size` | `0.625rem` | Notification badge count (.notif-badge). |
| `--ds-type-micro-leading` | `1` |  |
| `--ds-type-micro-weight` | `800` |  |
| `--ds-type-micro-tracking` | `0` |  |
| `--ds-type-metric-size` | `1.75rem` | KPI figure (.pt-kpi-value). |
| `--ds-type-metric-leading` | `1.1` |  |
| `--ds-type-metric-weight` | `750` |  |
| `--ds-type-metric-tracking` | `-0.03em` |  |

## Spacing

| Variable | Value | Notes |
| --- | --- | --- |
| `--ds-space-0` | `0` |  |
| `--ds-space-0-5` | `0.125rem` |  |
| `--ds-space-1` | `0.25rem` |  |
| `--ds-space-1-5` | `0.375rem` |  |
| `--ds-space-2` | `0.5rem` |  |
| `--ds-space-2-5` | `0.625rem` |  |
| `--ds-space-3` | `0.75rem` |  |
| `--ds-space-3-5` | `0.875rem` |  |
| `--ds-space-4` | `1rem` |  |
| `--ds-space-4-5` | `1.125rem` |  |
| `--ds-space-5` | `1.25rem` |  |
| `--ds-space-6` | `1.5rem` |  |
| `--ds-space-7` | `1.75rem` |  |
| `--ds-space-8` | `2rem` |  |
| `--ds-space-10` | `2.5rem` |  |
| `--ds-space-12` | `3rem` |  |
| `--ds-space-field-stack` | `0.5rem` | Label → input → help (8 px). |
| `--ds-space-field-group` | `1.5rem` | Between field groups and between form sections (24 px). |
| `--ds-space-section` | `2rem` | Between large blocks in a form/detail view (32 px). |
| `--ds-space-card-x` | `1.125rem` | Horizontal padding of portal cards. |
| `--ds-space-card-y` | `1rem` |  |
| `--ds-space-panel` | `2rem` | Desktop form/detail content padding; 1.25rem at ≤ 640 px. |
| `--ds-space-toolbar-gap` | `1rem 1.5rem` | Row × column gap of the page toolbar. |

## Radius

| Variable | Value | Notes |
| --- | --- | --- |
| `--ds-radius-none` | `0` |  |
| `--ds-radius-xs` | `0.125rem` | Link focus. |
| `--ds-radius-sm` | `0.25rem` | Master status, menu items. |
| `--ds-radius-md` | `0.375rem` | Fields, buttons (radius-field). |
| `--ds-radius-lg` | `0.5rem` | Navigation pills, combobox popup, options. |
| `--ds-radius-box` | `0.625rem` | Surfaces, modals, alerts (radius-box). |
| `--ds-radius-xl` | `0.75rem` | Top bar controls, tab container, notice. |
| `--ds-radius-card` | `0.875rem` | Portal cards, KPI, dropzone, panel. |
| `--ds-radius-2xl` | `1rem` | Large dialog. |
| `--ds-radius-full` | `999px` | Pill, chip, badge, dot. |

## Border

| Variable | Value | Notes |
| --- | --- | --- |
| `--ds-border-hairline` | `1px` |  |
| `--ds-border-emphasis` | `1.5px` | Dropzone with a dashed outline. |
| `--ds-border-focus` | `2px` | Focus ring, active rail marker. |
| `--ds-border-accent` | `3px` | Left accent line (problem rows, existing data). |
| `--ds-border-rail` | `4px` | Child rail in tree tables. |
| `--ds-border-edge` | `0.3125rem` | Left edge of notification banner/card (5 px). |
| `--ds-border-tone-bar` | `0.25rem` | Left color bar of KPI card. |

## Fixed shadows

| Variable | Value | Notes |
| --- | --- | --- |
| `--ds-shadow-none` | `none` |  |
| `--ds-shadow-xs` | `0 1px 2px rgb(15 23 42 / .08)` | Active tab/segment. |
| `--ds-shadow-menu` | `0 4px 16px rgb(0 0 0 / .04)` | Table row menu (inline). |
| `--ds-shadow-panel` | `0 8px 30px rgb(0 0 0 / .1)` | Info panel in the top bar. |
| `--ds-shadow-overlay` | `0 18px 40px -18px rgb(15 23 42 / .35)` | Notification panel. |
| `--ds-shadow-pinned-start` | `3px 0 5px -3px rgb(0 0 0 / .24)` | Left sticky column while the table scrolls. |

## Size

| Variable | Value | Notes |
| --- | --- | --- |
| `--ds-size-target` | `2.75rem` | Minimum touch target for all controls (44 px). |
| `--ds-size-target-compact` | `2.25rem` | Action icons in dense desktop tables (36 px). Not for touch screens. |
| `--ds-size-control-lg` | `3rem` | Master form input (48 px). |
| `--ds-size-icon-sm` | `1rem` |  |
| `--ds-size-icon-md` | `1.125rem` | Navigation icon (18 px). |
| `--ds-size-icon-lg` | `1.25rem` |  |
| `--ds-size-icon-xl` | `2rem` | Dropzone icon, account avatar. |
| `--ds-size-avatar` | `2.25rem` |  |
| `--ds-size-sidebar` | `16rem` |  |
| `--ds-size-sidebar-rail` | `4.75rem` |  |
| `--ds-size-topbar` | `4.75rem` |  |
| `--ds-size-auth-panel` | `24rem` |  |
| `--ds-size-dialog-sm` | `34rem` |  |
| `--ds-size-dialog-lg` | `54rem` |  |
| `--ds-size-panel` | `24rem` | Notification panel. |
| `--ds-size-popover-calendar` | `22rem` |  |
| `--ds-size-menu` | `15rem` |  |
| `--ds-size-measure` | `65ch` | Paragraph reading width. |
| `--ds-size-table-max-height` | `min(68dvh, 44rem)` |  |

## Z-index

| Variable | Value | Notes |
| --- | --- | --- |
| `--ds-z-pinned` | `2` |  |
| `--ds-z-pinned-end` | `3` |  |
| `--ds-z-table-head` | `5` |  |
| `--ds-z-table-head-pinned` | `6` |  |
| `--ds-z-table-head-pinned-end` | `7` |  |
| `--ds-z-sticky` | `10` | Sticky action bar. |
| `--ds-z-menu` | `20` |  |
| `--ds-z-combobox` | `30` |  |
| `--ds-z-popover` | `40` |  |
| `--ds-z-notification` | `45` |  |
| `--ds-z-modal` | `999` | daisyUI .modal default. |
| `--ds-z-tooltip` | `1000` |  |

## Motion

| Variable | Value | Notes |
| --- | --- | --- |
| `--ds-duration-instant` | `120ms` | Table row hover. |
| `--ds-duration-fast` | `150ms` | Chip, menu, icon button, tree table. |
| `--ds-duration-quick` | `160ms` | Popover/menu entrance, sidebar controls. |
| `--ds-duration-base` | `180ms` | Dialog, view transition, drawer, KPI. |
| `--ds-duration-theme` | `200ms` | Theme/back icon. |
| `--ds-duration-enter` | `220ms` | Page entrance. |
| `--ds-duration-layout` | `240ms` | Sidebar width. |
| `--ds-duration-settle` | `350ms` | Illustration card. |
| `--ds-duration-tracker` | `680ms` | Documentation scroll tracker marker. |
| `--ds-duration-rise` | `1500ms` | Data animation (rising value). |
| `--ds-duration-exit` | `140ms` | Exit of popovers, menus, tooltips and toasts: shorter than the entrance so dismissal feels immediate. |
| `--ds-duration-spring` | `500ms` | Length of the critically damped spring curve (--ds-ease-spring): panels, sheets, switches, segmented indicators. |
| `--ds-duration-spring-bounce` | `450ms` | Length of the light-bounce spring curve (--ds-ease-spring-bounce): only after a gesture with momentum (drag release, flick). |
| `--ds-duration-shimmer` | `1600ms` | One sweep of the skeleton shimmer. |
| `--ds-ease-standard` | `ease` |  |
| `--ds-ease-out` | `ease-out` |  |
| `--ds-ease-in-out` | `ease-in-out` |  |
| `--ds-ease-emphasized` | `cubic-bezier(0.22, 1, 0.36, 1)` | Smooth exit for markers and panels. |
| `--ds-ease-settle` | `cubic-bezier(0.22, 0.8, 0.26, 1)` |  |
| `--ds-ease-rise` | `cubic-bezier(0.2, 0.75, 0.25, 1)` |  |
| `--ds-ease-ping` | `cubic-bezier(0, 0, 0.2, 1)` |  |
| `--ds-ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Accelerating exit: things leave faster than they arrive. |
| `--ds-ease-spring` | `linear(0, 0.043, 0.14, 0.258, 0.376, 0.487, 0.584, 0.667, 0.736, 0.793, 0.838, 0.874, 0.903, 0.925, 0.943, 0.956, 0.967, 0.975, 0.981, 0.986, 0.989, 0.992, 0.994, 0.995, 1)` | Critically damped spring (damping 1.0, response 0.4 s) sampled for CSS. Pair with --ds-duration-spring. No overshoot. |
| `--ds-ease-spring-bounce` | `linear(0, 0.036, 0.122, 0.235, 0.356, 0.475, 0.585, 0.682, 0.764, 0.831, 0.885, 0.926, 0.957, 0.98, 0.995, 1.005, 1.011, 1.014, 1.015, 1.015, 1.014, 1.012, 1.01, 1.008, 1.007, 1.005, 1.004, 1.003, 1)` | Spring with 1.5% overshoot (damping 0.8, response 0.35 s). Pair with --ds-duration-spring-bounce. Only for momentum-driven motion. |
| `--ds-press-scale` | `0.97` | Button pressed (:active). |
| `--ds-enter-offset` | `5px` |  |
| `--ds-lift` | `-2px` | KPI card on hover. |

## Opacity

| Variable | Value | Notes |
| --- | --- | --- |
| `--ds-opacity-disabled` | `0.55` |  |
| `--ds-opacity-pager-disabled` | `0.45` |  |
| `--ds-opacity-read` | `0.62` | Read notifications, dimmed rows. |
| `--ds-opacity-state-hover` | `0.06` | State layer: hover tint mixed over a surface (color-mix with currentColor or the accent). |
| `--ds-opacity-state-pressed` | `0.1` | State layer: pressed tint. |
| `--ds-opacity-state-selected` | `0.12` | State layer: selected / checked / current tint. |
| `--ds-opacity-state-drag` | `0.16` | State layer: element being dragged or drop target under the pointer. |

## Breakpoints

| Variable | Value | Notes |
| --- | --- | --- |
| `--ds-breakpoint-xs` | `360px` |  |
| `--ds-breakpoint-sm` | `640px` | Phone: tables become labeled rows, actions drop to their own row. |
| `--ds-breakpoint-md` | `768px` |  |
| `--ds-breakpoint-lg` | `1024px` | Sidebar becomes a fixed column (drawer open). |
| `--ds-breakpoint-xl` | `1280px` |  |

## Tailwind utilities

`Styles/generated/tailwind-theme.css` registers the tokens with Tailwind v4: `text-link`, `text-quiet`, `border-control`, `bg-popover`, `text-subtle`, `text-muted`, `bg-excel`, `bg-pdf`, `shadow-popover`, `shadow-lift`, `text-title-1`, `text-body`, `text-eyebrow`, `rounded-card`, `rounded-box`, `ease-emphasized`, and more.
