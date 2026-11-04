---
title: Migrating from v1
group: reference
order: 4
summary: What changed from version 1 to 2: theme names, English slugs, universal examples, new tokens and modules, i18n, and the few behaviour notes. No breaking changes are intended.
---

Version 2 keeps every public class, attribute, partial and C# API of version 1. Existing applications keep working after the package update. This page lists what is new, what was renamed (with the old name still working) and what to check.

> [!NOTE]
> Version 1 was Indonesian-only and shaped by its first product. Version 2 is universal: no example, class comment or sample text assumes that product.

## At a glance

| Area | Version 1 | Version 2 |
| --- | --- | --- |
| Themes | `tps`, `tps-dark` | `light`, `dark`; `tps` and `tps-dark` stay as aliases |
| Languages | Indonesian docs and strings | English and Indonesian in docs, C# and JavaScript |
| Documentation slugs | Indonesian (`tombol`, `tabel`) | English (`button`, `table`); old addresses redirect |
| Components | About 30 families | Full catalog, see [Coverage](./coverage.md) |
| Examples | Domain-specific | Domain-neutral |
| Tokens | Palette, spacing, type, motion | Adds type roles, state layers, spring motion, target sizes, z-index scale |
| Behaviours | 12 areas in one file | One module per family under `js/modules/` |
| Breaking changes | | None intended |

## Themes

The theme names are now `light` and `dark`. The generated CSS answers to both names, so `data-theme="tps"` and `data-theme="tps-dark"` in your markup, in stored preferences and in your own CSS keep working.

| Version 1 | Version 2 | Note |
| --- | --- | --- |
| `data-theme="tps"` | `data-theme="light"` | alias kept |
| `data-theme="tps-dark"` | `data-theme="dark"` | alias kept |
| `HeadOptions(Light: "tps", Dark: "tps-dark")` | `HeadOptions()` | defaults changed to `light`, `dark`; pass the old names to keep them |
| `tokens.json` theme `tps` | theme `light` with `aliases: ["tps"]` | |

If your CSS or tests select `[data-theme="tps"]`, nothing changes. Move to the new names when convenient; the aliases will not be removed within version 2.

## Page addresses

Version 1 pages had Indonesian slugs and no language prefix. Version 2 pages have English slugs under `/en/` and `/id/`. Old addresses redirect to the matching Indonesian page, so bookmarks and links in your own documents still arrive.

| Version 1 slug | Version 2 slug |
| --- | --- |
| `pengantar` | [introduction](./introduction.md) |
| `persyaratan` | [requirements](./requirements.md) |
| `instalasi` | [installation](./installation.md) |
| `tema` | [theming](./theming.md) |
| `prinsip` | [principles](./principles.md) |
| `warna` | [color](./color.md) |
| `tipografi` | [typography](./typography.md) |
| `ruang-dan-tata-letak` | [spacing-layout](./spacing-layout.md) |
| `bentuk-dan-elevasi` | [shape-elevation](./shape-elevation.md) |
| `motion` | [motion](./motion.md) |
| `ikon` | [icons](./icons.md) |
| `aksesibilitas` | [accessibility](./accessibility.md) |
| `tombol` | [button](./button.md) |
| `form` | [form](./form.md) |
| `combobox-dan-tanggal` | [combobox](./combobox.md), [date-picker](./date-picker.md) |
| `tabel` | [data-table](./data-table.md), [table](./table.md) |
| `kartu-dan-data` | [card](./card.md), [stat](./stat.md), [chart](./chart.md) |
| `status` | [status](./status.md) |
| `umpan-balik` | [alert](./alert.md), [banner](./banner.md) |
| `notifikasi` | [toast](./toast.md), [notification-center](./notification-center.md) |
| `dialog-dan-menu` | [dialog](./dialog.md), [dropdown-menu](./dropdown-menu.md) |
| `navigasi` | [sidebar](./sidebar.md), [navbar](./navbar.md) |
| `pola-halaman` | [page-patterns](./page-patterns.md) |
| `alur-kerja` | [workflows](./workflows.md) |
| `konten` | [writing](./writing.md), [voice-and-tone](./voice-and-tone.md) |
| `perilaku-js` | [javascript](./javascript.md) |
| `razor-api` | [razor-api](./razor-api.md) |
| `token-referensi` | [tokens](./tokens.md) |
| `contoh-razor` | [razor-demo](./razor-demo.md) |
| `catatan-perubahan` | [changelog](./changelog.md) |
| `peta-asal-tps` | no longer published; the v1 page is kept under `docs/_legacy` |

## Examples and copy

Every TPS-specific example was replaced by domain-neutral content: projects (`PRJ-1024`), invoices (`INV-2026-0418`), people with mixed-locale names, amounts and dates. Tank illustrations, customs statuses and port search are gone from examples and from the token set; the chart classes (`ds-chart`, `ds-bar`, `ds-donut`) remain. If you copied example markup into your product, it still works; only the words differ.

## New in version 2

- **Tokens.** Type roles (`--ds-type-<role>-size|leading|weight|tracking`), state layers (`--ds-opacity-state-*`), spring and enter motion tokens, target sizes (`--ds-size-target`), the z-index scale and `--ds-focus`. See [Tokens](./tokens.md).
- **Components.** Buttons and their families, text and choice fields, pickers, upload, data display, feedback, overlays, navigation and layout. Each has a page with states, accessibility, Razor and JavaScript sections.
- **JavaScript modules.** One module per family, the `DS` API and `ds:*` events. See [JavaScript](./javascript.md).
- **Internationalisation.** English and Indonesian in the library: `DsText` and `Fmt` in C#, `addMessages` in JavaScript. See [Localization](./localization.md).
- **Preferences.** Reduced motion, reduced transparency, more contrast, forced colours, RTL and print are handled in `accessibility.css`. See [Accessibility](./accessibility.md).
- **Tag helpers.** Many more `ds-*` elements; see [Razor and C# API](./razor-api.md).

## What to check

Nothing is required, but these behaviours are worth a look when you update:

| Check | Why |
| --- | --- |
| Culture of the app | `Fmt.Date`, `Fmt.DateTime`, `Fmt.Decimal` and partial text follow `CultureInfo.CurrentCulture` and `CurrentUICulture`. Keep Indonesian output by setting `id-ID` (for example with request localization). `Fmt.Number` and `Fmt.Qty` are still culture-invariant |
| `HeadOptions` defaults | Now `light` and `dark`. Pass `Light: "tps", Dark: "tps-dark"` if your stylesheet defines only the old names |
| Strings in partials | `_DsPager`, `_DsPageSize`, `_DsConfirmDialog` and `_DsLeaveDialog` read `DsText`; English is the fallback. Override a string with `DsText.Add("id", …)` |
| Custom `data-theme` styles | Style both names, or the new one only |
| Stylesheet | Rebuild with `powershell -File tools/css.ps1` so the new component files are included |

## Not carried over

Polling notifications, live refresh with morphdom, server-side quick add, the XML viewer, Excel import and port search were product features of the first application. They are not part of the design system.
