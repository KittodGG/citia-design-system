# Changelog

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versions follow SemVer: a change to a token or class that forces a project to change its markup raises the major version. 

## 2.0.2 - 4 Nov 2026

### Fixed

- The precompiled `ds.css` (installation option A) now contains every daisyUI class the library and the documentation use. It was built without scanning any markup, so daisyUI 5 left out `.btn-sm`, `.btn-ghost`, `.badge`, `.card`, `.menu`, `.kbd`, `.tooltip`, `.dropdown`, the `.input` border and more. Apps with their own Tailwind build (option B) were not affected.
- The command palette accepts only `http:` and `https:` links (relative or absolute) from `data-ds-command-source` results. A `javascript:` or `data:` link in the JSON is dropped instead of becoming a clickable item.

### Added

- Install without the Citia feed: `install-citia-ds.ps1` copies the package into the app repository (`packages/`) and points `nuget.config` at it, so clones and build servers restore with no network. See [Installation](docs/en/installation.md#offline).
- Every release on GitHub carries the package, an offline zip (package + installer) and a static zip (CSS, JavaScript, fonts and icons with relative paths) for pages that do not use Razor.
- The smoke test checks the daisyUI classes in `ds.css`, and can run the installer on a simulated machine without internet.

## 2.0.1 - 4 Nov 2026

First version published as a NuGet package for every Citia app; see [Releases and updates](docs/en/releases.md).

### Fixed

- `<partial name="_DsHead" />` without a model no longer throws on pages that have their own model (every Razor Page with a `PageModel`). The partial now accepts any model and falls back to the default `HeadOptions`.

### Added

- Package metadata: readme, project URL, tags and release notes link, shown in the NuGet feed.
- `tools/smoke-test.ps1`: installs the packed package into a new Razor Pages app and checks rendering, assets, language, validation and toasts, in Development and as a published app.
- Citia NuGet feed at `https://design.citia-engineering.com/nuget/v3/index.json`, served by the documentation site. `tools/release.ps1` checks the changelog, contrast and smoke test before it publishes; `tools/deploy-site.ps1` deploys the site.

### Changed

- The documentation site shows the version of the package it is built with, so site and package cannot drift.

## 2.0.0 - 2 Nov 2026

Version 2 turns the library extracted from a single product into a universal design system for ASP.NET Core (.NET 10). No breaking change is intended; see [Migrating from v1](docs/en/migration-v1.md).

### Added

- A complete component catalog covering shadcn/ui, Material 3, Tailwind UI application UI and daisyUI 5: actions, text and choice fields, pickers, upload, data display, feedback, overlays, navigation and layout. See [Coverage](docs/en/coverage.md).
- English and Indonesian everywhere: documentation, C# strings (`DsText`, culture-aware `Fmt`) and JavaScript (`addMessages`, `locale`).
- Tokens: type roles, state layers, spring and enter motion, target sizes, z-index scale, `--ds-focus`.
- State matrix on every component: pointer, keyboard, selection, disclosure, availability, validation, activity, content, drag, variants and environment.
- JavaScript: one module per family, the `DS` API (`init`, `configure`, `addMessages`, `theme`, `toast`, `confirm`, `guard` and more), `ds:*` events and `DS.init(root)` for partial updates.
- User preferences in `accessibility.css`: reduced motion, reduced transparency, more contrast, forced colours.
- Right-to-left support through logical properties.
- Documentation: getting started, foundations, component pages, patterns (page, forms, data, workflows, feedback), content (writing, voice and tone) and reference (JavaScript, Razor and C#, coverage, migration).
- Many more tag helpers and partials; see [Razor and C# API](docs/en/razor-api.md).

### Changed

- Themes are named `light` and `dark`; `tps` and `tps-dark` remain as aliases.
- Documentation slugs are English; version 1 addresses redirect.
- All examples and copy are domain-neutral; the TPS-specific tank illustration tokens and examples were removed.
- `HeadOptions` defaults to `light` and `dark`.

### Fixed

- Focus ring colour keeps at least 3:1 against both surfaces.

## 1.0.0 - 2 Nov 2026

First release, extracted from INTEGRA TPS Integration (branch `feature/tps-integration`, commit `88cd8e4`).

### Added

- DTCG tokens in `tokens/tokens.json`: primitive palette, light and dark themes, 17 type roles, spacing, radius, border, shadow, size, z-index, motion and opacity.
- `tools/tokens.cs` (.NET 10, one file): builds the CSS, JSON, icon and reference outputs and checks WCAG contrast pairs.
- `tools/css.ps1`: Tailwind CSS standalone and daisyUI with SHA-256 verification, Windows and Linux, without Node.js.
- Razor Class Library `Citia.DesignSystem`: tag helpers `ds-icon`, `ds-pill`, `ds-tag`, `ds-empty`; partials `_DsHead`, `_DsScripts`, `_DsIconSprite`, `_DsToast`, `_DsConfirmDialog`, `_DsLeaveDialog`, `_DsPager`, `_DsSortHeader`, `_DsPageSize`, `_DsSidebarNav`; helpers `Icon`, `Tone`, `ToastMessage`, `ListSort`, `ListPage<T>`, `QueryUrl`, `NavModel`, `Avatar`, `Fmt`, `Wib`.
- `ds-*` component CSS and a prebuilt `ds.css` for applications without Tailwind.
- `ds.js`: three-mode theme, collapsible sidebar, navigation groups, drawer, back links, dialogs and confirmation, toasts, unsaved-changes guard, export lock, copy, password toggle, auto-submit, submit once, pinned table columns, tree rows, ARIA combobox.
- 73 icons, Manrope variable font and the Cally calendar.
- Documentation site on ASP.NET Core Razor Pages with a scroll tracker, light and dark themes, search and live previews.
