---
title: Project structure
group: getting-started
order: 6
summary: A map of the repository: what each folder owns, which files are generated, and the commands that rebuild them.
---

The repository has one source of truth for design values (`tokens/`), one library that ships (`src/`), one site that documents it (`site/`) and the pages it shows (`docs/`).

## Repository map

```text
citia-design-system/
├─ tokens/
│  ├─ tokens.json                  DTCG source of truth for every design value
│  └─ descriptions.id.json         Indonesian token descriptions
├─ tools/
│  ├─ tokens.cs                    token generator + contrast check (dotnet run tools/tokens.cs)
│  ├─ css.ps1                      CSS build with Tailwind standalone + daisyUI
│  ├─ smoke-test.ps1               installs the package into a new app and checks it
│  ├─ release.ps1                  publishes the package to the Citia NuGet feed
│  └─ deploy-site.ps1              deploys this site and the feed
├─ src/Citia.DesignSystem/         Razor Class Library, packed as the NuGet package
│  ├─ Styles/
│  │  ├─ ds.css                    import list: the entry for apps with their own Tailwind build
│  │  ├─ ds.bundle.css             Tailwind + daisyUI + ds.css, builds the precompiled stylesheet
│  │  ├─ generated/                tokens.css, tailwind-theme.css (never edit)
│  │  ├─ base.css, native.css      element defaults
│  │  ├─ daisyui-overrides.css     global daisyUI alignment
│  │  ├─ components/*.css          one file per component family
│  │  ├─ accessibility.css         reduced motion/transparency, more contrast, forced colours
│  │  └─ fonts.css                 @font-face for Manrope
│  ├─ TagHelpers/                  <ds-*> tag helpers
│  ├─ Views/Shared/_Ds*.cshtml     partials: _DsHead, _DsScripts, _DsIconSprite, _DsToast, ...
│  ├─ Ui/, Formatting/, Icons/     C# records, Fmt, icon helpers
│  ├─ Localization/                DsText and the English and Indonesian string tables
│  └─ wwwroot/
│     ├─ css/ds.css                precompiled stylesheet (generated)
│     ├─ js/ds.js, core.js, modules/   behaviours
│     ├─ fonts/manrope/            self-hosted variable font
│     ├─ icons/                    icons.json source and sprite.svg (generated)
│     └─ tokens/                   resolved tokens.json and contrast.json (generated)
├─ site/Citia.DesignSystem.Docs/   documentation site (Razor Pages + Markdig)
├─ docs/
│  ├─ en/<slug>.md                 English pages
│  └─ id/<slug>.md                 Indonesian pages, same slugs
├─ Directory.Build.props, global.json, Citia.DesignSystem.sln
└─ .tools/                         Tailwind CLI and daisyUI (downloaded, ignored by Git)
```

## What each part owns

| Part | Owns | Change it when |
| --- | --- | --- |
| `tokens/tokens.json` | Colour per theme, type roles, spacing, radius, shadow, motion, z-index, breakpoints | A value or a theme changes. Then run the generator. |
| `tools/tokens.cs` | Generated CSS, JSON, icon sprite and token reference pages, plus the 72-pair contrast check | You add a colour pair to verify. |
| `Styles/components/*.css` | The look of one component family, using tokens only, inside `@layer components` | A component's appearance changes. |
| `Styles/accessibility.css` | Overrides for user preferences, loaded last | A preference needs handling everywhere. |
| `TagHelpers/` and `Views/Shared/` | Server-side markup for components that benefit from it | You add or change Razor API. |
| `wwwroot/js/modules/*.js` | One behaviour per family, opt-in with `data-ds-*` attributes | A behaviour changes. |
| `Localization/` | Strings for Razor output, English and Indonesian | You add a visible string. |
| `docs/` | The page for each component, foundation and pattern | Anything above changes. |

## Generated files

Do not edit these by hand; the next build overwrites them.

| File | Produced by |
| --- | --- |
| `Styles/generated/tokens.css`, `tailwind-theme.css` | `dotnet run tools/tokens.cs` |
| `wwwroot/tokens/tokens.json`, `contrast.json` | `dotnet run tools/tokens.cs` |
| `wwwroot/icons/sprite.svg`, `Icons/IconSet.g.cs` | `dotnet run tools/tokens.cs`, from `icons.json` |
| `docs/en/tokens.md`, `docs/id/tokens.md` | `dotnet run tools/tokens.cs` |
| `wwwroot/css/ds.css`, `site/.../wwwroot/css/docs.css` | `powershell -File tools/css.ps1` |

## Commands

| Command | Does |
| --- | --- |
| `dotnet run tools/tokens.cs` | Rebuild tokens, icons and reference pages; check contrast (exit 1 on failure). |
| `powershell -NoProfile -File tools/css.ps1 [-Target ds\|docs] [-Watch]` | Build the CSS. |
| `dotnet build Citia.DesignSystem.sln` | Build the library and the docs site. |
| `dotnet run --project site/Citia.DesignSystem.Docs` | Run the docs at `http://localhost:5180`. |
| `dotnet pack src/Citia.DesignSystem -c Release -o artifacts` | Produce the NuGet package. |
| `powershell -NoProfile -File tools/smoke-test.ps1 -PackageDir artifacts -Version <v>` | Install the package into a new app and check it. |
| `powershell -NoProfile -File tools/release.ps1` | Publish a release; see [Releases and updates](./releases.md). |
| `powershell -NoProfile -File tools/deploy-site.ps1` | Deploy this site and the feed. |

## Where things load from

At runtime a consuming app sees the library's static assets under `/_content/Citia.DesignSystem/` (`css/ds.css`, `js/ds.js`, `fonts/`, `icons/`, `tokens/`). The CSS sources are also packed under `styles/` so an app can import them into its own Tailwind build.

## Where to add things

- **A component:** CSS in `Styles/components/<family>.css`, behaviour in `wwwroot/js/modules/<family>.js`, tag helper in `TagHelpers/`, strings in `Localization/`, and a page pair in `docs/en` and `docs/id`.
- **A colour or size:** `tokens/tokens.json`, then regenerate.
- **A language:** `DsText.Add` for server strings, `DS.addMessages` for browser strings, a new folder `docs/<code>/`.

Next: [Principles](./principles.md).
