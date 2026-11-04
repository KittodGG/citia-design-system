# Citia Design System

## Install

In the folder of your ASP.NET Core web project:

```powershell
irm https://design.citia-engineering.com/install.ps1 | iex
```

Then `dotnet run`. The command adds the `Citia.DesignSystem` package, a `nuget.config`, the tag helpers in `_ViewImports.cshtml` and the partials in `_Layout.cshtml`. Run it again to update.

No internet on that machine: download `citia-ds-offline-<version>.zip` from the [latest release](https://github.com/KittodGG/citia-design-system/releases/latest), unzip it and run `install-citia-ds.ps1 -From <unzipped folder>` from the web project folder.

## Use

```cshtml
<ds-alert tone="Success" title="Installed">Citia Design System is ready.</ds-alert>
<ds-field asp-for="Name" label="Project name" />
<button type="submit" class="btn btn-primary">Save</button>
```

Documentation, with every component and its markup: https://design.citia-engineering.com

## What it is

A design system for **ASP.NET Core (.NET 10)** web applications, in English and Indonesian, light and dark. Manrope type, hairline borders, one teal accent, motion that explains and never decorates.

- **Tokens.** One DTCG source (`tokens/tokens.json`) generates CSS variables, a Tailwind theme, daisyUI themes and C# icon data, and checks WCAG 2.2 AA contrast.
- **Components.** A complete catalog that covers shadcn/ui, Material 3, Tailwind UI application UI and daisyUI 5, each with every state designed. See `docs/en/coverage.md`.
- **Razor Class Library.** Tag helpers (`<ds-icon>`, `<ds-avatar>`, ...), partial views (`_DsHead`, `_DsPager`, ...) and C# helpers (`Fmt`, `Tone`, `ListPage<T>`, `DsText`).
- **JavaScript.** `ds.js`, vanilla ES modules with no dependencies. Every behaviour is opt-in through `data-ds-*` attributes and the HTML works without it.
- **CSS.** Tailwind CSS standalone and daisyUI, built without Node.js. Nothing loads from a CDN.
- **Documentation site.** ASP.NET Core Razor Pages with live previews, search, light and dark themes, in both languages.

## Work on the design system

Requirements: .NET SDK 10 and PowerShell.

```powershell
powershell -NoProfile -File tools/css.ps1     # download Tailwind + daisyUI (SHA-256 verified) and build the CSS
dotnet build Citia.DesignSystem.sln
```

## Build and run

| Command | Purpose |
| --- | --- |
| `dotnet run tools/tokens.cs` | Regenerate every token output and check the contrast pairs (exit 1 on failure) |
| `powershell -File tools/css.ps1 [-Target all\|ds\|docs] [-Watch]` | Build the CSS |
| `dotnet build Citia.DesignSystem.sln` | Build the library and the documentation site |
| `dotnet run --project site/Citia.DesignSystem.Docs` | Run the documentation at http://localhost:5180 |
| `docker build -f site/Citia.DesignSystem.Docs/Dockerfile -t citia-ds-docs .` | Documentation image |
| `dotnet pack src/Citia.DesignSystem -c Release -o artifacts` | NuGet package |
| `powershell -File tools/smoke-test.ps1 -PackageDir artifacts -Version <v>` | Install the package into a new app and check it renders (also `-Source <feed url>`) |
| `powershell -File tools/release.ps1` | Publish the csproj version to the Citia feed: changelog, contrast and smoke-test gates, then upload |
| `powershell -File tools/deploy-site.ps1` | Deploy the documentation site and feed to the staging server, with rollback |

## Structure

```text
citia-design-system/
├─ tokens/tokens.json                 single source of truth for tokens (DTCG)
├─ tools/
│  ├─ tokens.cs                       generator: CSS, JSON, icons, reference, contrast check
│  ├─ css.ps1                         Tailwind standalone + daisyUI -> ds.css and docs.css
│  ├─ smoke-test.ps1                  installs the package into a new app and checks it
│  ├─ release.ps1                     publishes the package to the Citia NuGet feed
│  └─ deploy-site.ps1                 deploys the documentation site (and feed)
├─ src/Citia.DesignSystem/            Razor Class Library (net10.0)
│  ├─ Styles/                         ds.css (entry), base, components/*.css, generated/*.css
│  ├─ TagHelpers/  Views/Shared/      tag helpers and _Ds*.cshtml partials
│  ├─ Ui/  Formatting/  Localization/ Tone, Paging, Toast, Fmt, DsText
│  └─ wwwroot/                        css/ds.css, js/ds.js and modules, fonts, icons
├─ site/Citia.DesignSystem.Docs/      documentation site (Razor Pages + Markdig)
├─ docs/en/*.md, docs/id/*.md         documentation pages (files starting with _ are internal)
├─ Directory.Build.props, global.json, Citia.DesignSystem.sln
└─ .tools/                            CSS binaries (ignored by Git)
```

## Documentation

Run the site, or start at `docs/en/introduction.md`. Groups: Getting started, Foundations, Components, Patterns (page, forms, data, workflows, feedback), Content (writing, voice and tone) and Reference (tokens, JavaScript, Razor and C# API, coverage, migration, changelog). Contributors read `docs/_contributing.md` first.

Version 1 users: see `docs/en/migration-v1.md`. No breaking changes are intended.

## Licences of third-party material

- Manrope: SIL Open Font License 1.1 (`src/Citia.DesignSystem/wwwroot/fonts/manrope/OFL.txt`).
- Cally: MIT (`src/Citia.DesignSystem/wwwroot/lib/cally/LICENSE`).
- Icons: drawn in the style of Lucide (ISC), Feather (MIT) and Tabler (MIT); see `src/Citia.DesignSystem/wwwroot/icons/NOTICE.md`.
- Tailwind CSS (MIT) and daisyUI (MIT) are downloaded at build time and not committed.

Copyright 2026 Citia Engineering Indonesia.
