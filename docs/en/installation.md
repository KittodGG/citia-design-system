---
title: Installation
group: getting-started
order: 3
summary: One command installs Citia Design System into an ASP.NET Core app. Then use it, install without internet, or set up language, theme and Tailwind.
---

## Install

In the folder of your web project, the one with the `.csproj`:

```powershell
irm https://design.citia-engineering.com/install.ps1 | iex
```

Then `dotnet run`. That is all.

The command adds the `Citia.DesignSystem` package, a `nuget.config` for the Citia feed, the namespaces to `_ViewImports.cshtml` and the four partials to `_Layout.cshtml`. Run it again to update. It needs the .NET 10 SDK and PowerShell, which Windows has; on macOS and Linux run it inside `pwsh`.

### No internet on that machine {#offline}

1. Download `citia-ds-offline-<version>.zip` from the [latest release on GitHub](https://github.com/KittodGG/citia-design-system/releases/latest) and copy it to the machine.
2. Unzip it, then run this from the web project folder:

   ```powershell
   powershell -ExecutionPolicy Bypass -File C:\ds\install-citia-ds.ps1 -From C:\ds
   ```

The package goes into a `packages` folder next to the solution. Commit `packages/` and `nuget.config`, and every clone and build server restores without internet.

## Use it

Write components in any view:

```cshtml
<ds-alert tone="Success" title="Installed">Citia Design System is ready.</ds-alert>

<form method="post" class="ds-fieldset">
    <ds-field asp-for="Name" label="Project name" hint="Shown in lists." />
    <button type="submit" class="btn btn-primary">Save</button>
</form>
```

After a save, confirm it with a toast and redirect:

```csharp
this.Toast(Tone.Success, "Project saved");
return RedirectToPage();
```

Every component page shows its markup and tag helper. Build a full screen with the [quick start](./quick-start.md).

> [!NOTE]
> The default ASP.NET Core template links Bootstrap in `_Layout.cshtml`. Bootstrap restyles `.btn` and form controls over the design system, so remove that `<link>`. The installer warns when it finds one.

## Installer options

| Option | Default | Does |
| --- | --- | --- |
| `-Project` | current folder | The web project folder or `.csproj`. |
| `-From` | `feed` | Where the package comes from: `feed`, `github`, a `.nupkg`, a folder or the offline `.zip`. |
| `-Version` | latest stable | The version to install, for example `2.0.2`. |
| `-Vendor` | off | Keep the package in `packages/` even when online, so the app never needs the feed. |
| `-NoWire` | off | Add the package only; leave `_ViewImports` and the layout alone. |

With `irm`, pass options like this:

```powershell
& ([scriptblock]::Create((irm https://design.citia-engineering.com/install.ps1))) -Version 2.0.2 -Vendor
```

## Install by hand

This is what the installer does.

1. Put a `nuget.config` next to the solution. The mapping takes `Citia.*` only from the Citia feed and everything else only from nuget.org.

   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <configuration>
     <packageSources>
       <add key="nuget.org" value="https://api.nuget.org/v3/index.json" />
       <add key="citia" value="https://design.citia-engineering.com/nuget/v3/index.json" />
     </packageSources>
     <packageSourceMapping>
       <packageSource key="nuget.org"><package pattern="*" /></packageSource>
       <packageSource key="citia"><package pattern="Citia.*" /></packageSource>
     </packageSourceMapping>
   </configuration>
   ```

   Offline, use `<add key="citia-local" value="packages" />` with the `.nupkg` in that folder, and map `Citia.*` to `citia-local`.

2. In the web project folder: `dotnet add package Citia.DesignSystem`.
3. Add to `Pages/_ViewImports.cshtml` (Razor Pages) or `Views/_ViewImports.cshtml` (MVC):

   ```cshtml
   @using Citia.DesignSystem.Icons
   @using Citia.DesignSystem.Ui
   @using Citia.DesignSystem.Formatting
   @using Citia.DesignSystem.Localization
   @addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
   @addTagHelper *, Citia.DesignSystem
   ```

4. Add the partials to the layout:

   ```cshtml
   <html lang="en" data-theme="light">
   <head>
       <partial name="_DsHead" />          @* first in <head>: theme before first paint, stylesheet *@
       ...
   </head>
   <body>
       <partial name="_DsIconSprite" />    @* icon sprite, once per page *@
       ...
       <partial name="_DsToast" />         @* toast region and the toast queued by this.Toast(...) *@
       <partial name="_DsScripts" />       @* ds.js *@
   </body>
   </html>
   ```

Add `_DsConfirmDialog` and `_DsLeaveDialog` when you use confirm dialogs and unsaved-change guards. For a sidebar and top bar see [Page patterns](./page-patterns.md).

## Language and theme

The library speaks English and Indonesian. Let the request choose, in `Program.cs`:

```csharp
string[] languages = ["en", "id"];
app.UseRequestLocalization(new RequestLocalizationOptions()
    .SetDefaultCulture("en")
    .AddSupportedCultures(languages)
    .AddSupportedUICultures(languages));
```

and write the culture into the layout: `<html lang="@System.Globalization.CultureInfo.CurrentUICulture.TwoLetterISOLanguageName" data-theme="light">`. Server strings (`DsText`), dates and numbers (`Fmt`) and `ds.js` then follow `?culture=id`, the culture cookie or `Accept-Language`.

The theme follows the saved choice or the system preference. Give each app on the same domain its own storage key:

```cshtml
<partial name="_DsHead" model='new HeadOptions(Storage: "myapp")' />
```

Let people choose with the [theme switcher](./theme-switcher.md). More in [Theming](./theming.md) and [Localization](./localization.md).

## Pages without Razor {#static}

For plain HTML or another back end, download `citia-ds-static-<version>.zip` from the [release](https://github.com/KittodGG/citia-design-system/releases/latest). Copy its `citia-ds` folder into your site and start from its `index.html`:

```html
<link rel="stylesheet" href="/vendor/citia-ds/css/ds.css" />
<script type="module" src="/vendor/citia-ds/js/ds.js"></script>
```

The font URLs are relative, so any path works. Icons need `citia-ds/icons/sprite.svg` inside the page, and the files must be served over HTTP, not `file://`.

## Your own Tailwind build {#option-b}

By default `_DsHead` links the precompiled `ds.css`: every class the library and the examples on this site use, with no build step. To use any Tailwind utility in your views, build one CSS file that imports the design system. Clone `https://github.com/KittodGG/citia-design-system` next to your app and run `powershell -File tools/css.ps1` in it once, to download the pinned Tailwind CLI and daisyUI. Then write `Styles/app.css`:

```css
@import "tailwindcss" source(none);
@plugin "../../citia-design-system/.tools/daisyui.mjs" { themes: false; logs: false; }
@import "../../citia-design-system/src/Citia.DesignSystem/Styles/ds.css";
@source "../Pages";
@source "../Views";
@source "../../citia-design-system/src/Citia.DesignSystem/Views";
```

Build it with `..\citia-design-system\.tools\tailwindcss.exe -i Styles\app.css -o wwwroot\css\app.css --minify` (add `--watch` while you design), and point the head partial at it: `<partial name="_DsHead" model='new HeadOptions(Stylesheet: "~/css/app.css")' />`. Keep `themes: false`: the tokens already define every daisyUI variable.

## Common problems

| Symptom | Fix |
| --- | --- |
| `irm` is not recognised | Run the command in PowerShell, not in cmd. |
| `NU1101: Unable to find package Citia.DesignSystem` | No `nuget.config` with the Citia source applies to the project. Run the installer again from the web project folder. |
| `NU1900` warning on a machine without internet | NuGet cannot download its vulnerability data. If warnings are errors, set `<NuGetAudit>false</NuGetAudit>` there. |
| Buttons and inputs look like Bootstrap | Remove the Bootstrap `<link>` from the layout. |
| Light flash on dark pages | `_DsHead` must be the first stylesheet in `<head>`. |
| Icons are empty | Add `_DsIconSprite` once per page. |
| Toast does not appear | Add `_DsToast` and redirect after `this.Toast(...)`. |
| Font 404 under a sub-path | Serve the app at a domain root, or copy the fonts and use `Styles/fonts.root.css`. |
| `dotnet` rejects `net10.0` | Install the .NET 10 SDK; see [Requirements](./requirements.md). |
