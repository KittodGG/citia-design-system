# Citia.DesignSystem

Design system for Citia web apps on ASP.NET Core (.NET 10, MVC and Razor Pages): tokens, precompiled CSS
(Tailwind CSS v4 + daisyUI 5), vanilla JavaScript behaviours, Razor tag helpers and partials, in English and Indonesian.

Documentation: https://design.citia-engineering.com

## Install

```powershell
dotnet add package Citia.DesignSystem
```

`_ViewImports.cshtml`:

```cshtml
@using Citia.DesignSystem.Icons
@using Citia.DesignSystem.Ui
@using Citia.DesignSystem.Formatting
@using Citia.DesignSystem.Localization
@addTagHelper *, Citia.DesignSystem
```

Layout:

```cshtml
<head>
    <partial name="_DsHead" />
</head>
<body>
    <partial name="_DsIconSprite" />
    @RenderBody()
    <partial name="_DsToast" />
    <partial name="_DsScripts" />
</body>
```

Static assets are served from `/_content/Citia.DesignSystem/` (`css/ds.css`, `js/ds.js`, fonts, icons, tokens).
CSS sources for your own Tailwind build ship in the package under `styles/`.

Full steps, including localization and theming: https://design.citia-engineering.com/en/installation
