---
title: Requirements
group: getting-started
order: 2
summary: The SDK, tools and browser versions you need to use Citia Design System, and what happens in browsers that lack a newer feature.
---

The DS needs the .NET 10 SDK and nothing else to run. Node.js is never required. A Tailwind build is optional.

## Development machine

| Need | Version | Notes |
| --- | --- | --- |
| .NET SDK | 10.0.100 or later | The repository pins `10.0.100` in `global.json` with `rollForward: latestFeature`. Apps that reference the DS target `net10.0`. |
| Operating system | Windows 10/11, macOS 13+, Linux x64 | The CSS script ships verified binaries for Windows x64 and Linux x64. |
| Tailwind CSS standalone CLI | 4.3.3 | Optional. Only for [installation option B](./installation.md#option-b). Single executable, no Node. |
| daisyUI | 5.7.47 | Optional, same condition. Downloaded as `daisyui.mjs` and verified by SHA-256. |
| PowerShell | 5.1 or 7+ | Runs `tools/css.ps1`. On other systems download the binaries by hand. |
| Editor | Visual Studio, Rider or VS Code with C# Dev Kit | The Tailwind CSS IntelliSense extension is optional. |

Check the SDK with `dotnet --list-sdks`; a `10.0.x` line must be present.

```powershell
# Whole machine (administrator)
winget install Microsoft.DotNet.SDK.10

# Current user, no administrator rights, PATH untouched
Invoke-WebRequest https://dot.net/v1/dotnet-install.ps1 -OutFile $env:TEMP\dotnet-install.ps1
& $env:TEMP\dotnet-install.ps1 -Channel 10.0 -InstallDir "$env:LOCALAPPDATA\Microsoft\dotnet" -NoPath
```

## Server

| Need | Version |
| --- | --- |
| ASP.NET Core runtime | 10.x (`mcr.microsoft.com/dotnet/aspnet:10.0`) |
| Database, CDN, third-party service | None. The DS makes no network calls. |

Fonts are self-hosted: Manrope variable, Latin and Latin Extended subsets, served from `/_content/Citia.DesignSystem/fonts/`. Nothing loads from Google Fonts or any other origin, so the DS works on closed networks and passes strict Content Security Policies for `font-src 'self'`.

## Browsers

The DS uses current platform features instead of polyfills. Core features set the minimum; progressive enhancements add polish where available and are skipped silently elsewhere.

| Feature | Used for | Chrome / Edge | Firefox | Safari |
| --- | --- | --- | --- | --- |
| `@layer` | Cascade order of tokens, base, components | 99 | 97 | 15.4 |
| `:has()` | Selected cards, choice rows, table row state | 105 | 121 | 15.4 |
| `color-mix()` | Every tint, hover layer and border | 111 | 113 | 16.2 |
| `:user-invalid` | Validation shown only after interaction | 119 | 88 | 16.5 |
| CSS nesting | Component source | 120 | 117 | 17.2 |
| Popover API | Menus, popovers, tooltips, combobox lists | 114 | 125 | 17 |
| `@starting-style` | Enter animation of popovers, dialogs, toasts | 117 | 129 | 17.5 |
| `<dialog>` and `showModal()` | Dialog, sheet, command palette | 37 | 98 | 15.4 |

**Supported baseline: Chrome and Edge 120, Firefox 129, Safari 17.5 and later** (macOS, iOS, iPadOS). Below it, text and forms still work, but menus and overlays are not supported.

Progressive enhancements, all optional:

| Feature | Effect when present | When missing |
| --- | --- | --- |
| `field-sizing: content` (Chrome 123, Safari 26.2) | Textareas grow with their text | Fixed rows with normal scrolling |
| `interpolate-size: allow-keywords` (Chrome 129) | Height reveal on collapsibles and accordions animates | Content opens without the height animation |
| `anchor-positioning` (Chrome 125, Safari 26) | Overlay placement in CSS | JavaScript placement (`placeFloating`) |
| View Transitions (Chrome 111, Safari 18) | Soft cross-fade when the theme changes | Instant change |
| `text-wrap: balance` (Chrome 114, Safari 17.5) | Even line breaks in headings | Normal wrapping |

> [!NOTE]
> Without `@starting-style` an overlay still opens and closes correctly; it only skips the 160 to 220 ms enter animation. Without `prefers-reduced-motion` support, nothing changes because the DS animates only transform, opacity and colour.

## Standards

- WCAG 2.2 AA: 4.5:1 for text, 3:1 for boundaries and icons, 24px minimum targets (44px on coarse pointers). The 72 colour pairs are checked at token build time.
- Right-to-left layouts work through logical CSS properties; set `dir="rtl"` on `<html>`.
- Font licence: SIL OFL 1.1. Keep `OFL.txt` next to the font files.

Next: [Installation](./installation.md).
