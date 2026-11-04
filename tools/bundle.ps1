<#
.SYNOPSIS
  Builds the two download bundles of a release from its .nupkg, so every channel ships the same bytes:
    citia-ds-offline-<version>.zip  the NuGet package + install-citia-ds.ps1, for machines without the Citia feed
    citia-ds-static-<version>.zip   plain files (css, js, fonts, icons, tokens) for apps without NuGet or Razor

.EXAMPLE
  powershell -NoProfile -File tools/bundle.ps1 -Nupkg artifacts/release/Citia.DesignSystem.2.0.1.nupkg
#>
param(
    [Parameter(Mandatory)] [string] $Nupkg,
    [string] $Out
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$Nupkg = (Resolve-Path $Nupkg).Path
if (-not $Out) { $Out = Split-Path $Nupkg -Parent }
New-Item -ItemType Directory -Force $Out | Out-Null
$name = Split-Path $Nupkg -Leaf
if ($name -notmatch '^Citia\.DesignSystem\.(.+)\.nupkg$') { throw "Not a Citia.DesignSystem package: $name" }
$version = $Matches[1]
$utf8 = New-Object System.Text.UTF8Encoding $false
$work = Join-Path ([System.IO.Path]::GetTempPath()) ('citia-ds-bundle-' + [guid]::NewGuid().ToString('N').Substring(0, 8))
New-Item -ItemType Directory $work | Out-Null

# ZipFile.CreateFromDirectory on Windows PowerShell 5.1 writes '\' separators, which other platforms read as file names.
function New-Zip([string] $dir, [string] $zipPath) {
    Remove-Item $zipPath -ErrorAction SilentlyContinue
    $archive = [System.IO.Compression.ZipFile]::Open($zipPath, 'Create')
    try {
        $base = (Resolve-Path $dir).Path.TrimEnd([char]92, [char]47) + [System.IO.Path]::DirectorySeparatorChar
        foreach ($f in Get-ChildItem $dir -Recurse -File) {
            $entry = $f.FullName.Substring($base.Length).Replace([string][char]92, '/')
            [void][System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $f.FullName, $entry, 'Optimal')
        }
    } finally { $archive.Dispose() }
}

try {
    # ---------- offline ----------
    $off = Join-Path $work 'offline'
    New-Item -ItemType Directory $off | Out-Null
    Copy-Item $Nupkg $off
    Copy-Item (Join-Path $PSScriptRoot 'install-citia-ds.ps1') $off
    [System.IO.File]::WriteAllText((Join-Path $off 'README.txt'), @"
Citia Design System $version, offline install
=============================================

For ASP.NET Core (.NET 10) apps on machines that cannot reach https://design.citia-engineering.com.
Nothing in the package loads from the internet at runtime: CSS, JavaScript, fonts and icons are served by your app.

1. Unzip this file anywhere.
2. From PowerShell:

     powershell -NoProfile -ExecutionPolicy Bypass -File install-citia-ds.ps1 -From . -Project <path to your web project>

   It copies $name into <repository>\packages\, adds that folder to nuget.config for Citia.* packages only,
   and adds the package reference to the project.
3. Commit packages\$name and nuget.config. Every clone and build server then restores without the Citia feed.
4. Wire _ViewImports and the layout: docs page "Installation" (also in the repository: docs/en/installation.md).

Update later: run the script again with the newer zip. Roll back: run it with the older one.
"@.Replace("`r`n", "`n").Replace("`n", "`r`n"), $utf8)
    $offZip = Join-Path $Out "citia-ds-offline-$version.zip"
    New-Zip $off $offZip

    # ---------- static ----------
    $st = Join-Path $work 'static'
    $assets = Join-Path $st 'citia-ds'
    New-Item -ItemType Directory -Force $assets | Out-Null
    $zip = [System.IO.Compression.ZipFile]::OpenRead($Nupkg)
    try {
        foreach ($e in $zip.Entries) {
            if (-not $e.FullName.StartsWith('staticwebassets/') -or $e.FullName.EndsWith('/')) { continue }
            $rel = [System.Uri]::UnescapeDataString($e.FullName.Substring('staticwebassets/'.Length))
            $dest = Join-Path $assets $rel
            New-Item -ItemType Directory -Force (Split-Path $dest -Parent) | Out-Null
            [System.IO.Compression.ZipFileExtensions]::ExtractToFile($e, $dest, $true)
        }
    } finally { $zip.Dispose() }

    # The RCL addresses its files from the site root (/_content/Citia.DesignSystem/...). Make them relative to css/ds.css,
    # so the folder works under any path.
    $css = Join-Path $assets 'css/ds.css'
    $text = [System.IO.File]::ReadAllText($css)
    $count = ([regex]::Matches($text, '/_content/Citia\.DesignSystem/')).Count
    [System.IO.File]::WriteAllText($css, $text.Replace('/_content/Citia.DesignSystem/', '../'), $utf8)
    if ($count -eq 0) { Write-Warning 'ds.css had no /_content/ URLs to rewrite' }
    $left = Get-ChildItem $assets -Recurse -File -Include *.css, *.js | Select-String -SimpleMatch '/_content/Citia.DesignSystem/' -List
    if ($left) { throw "Absolute /_content/ URLs remain in: $($left.Path -join ', ')" }

    [System.IO.File]::WriteAllText((Join-Path $st 'index.html'), @"
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Citia Design System $version, static files</title>
  <meta name="color-scheme" content="light dark" />
  <!-- Theme before first paint (same as the _DsHead partial): saved choice, else the system preference. -->
  <script>
    (function (c) {
      try {
        var h = document.documentElement, m = localStorage.getItem(c.s + "-theme");
        if (m !== "light" && m !== "dark") m = "system";
        var dark = m === "dark" || (m === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
        h.setAttribute("data-theme", dark ? c.d : c.l); h.dataset.dsScheme = dark ? "dark" : "light";
        h.dataset.dsMode = m; h.dataset.dsLight = c.l; h.dataset.dsDark = c.d; h.dataset.dsStorage = c.s;
      } catch (e) { }
    })({ l: "light", d: "dark", s: "ds" });
  </script>
  <link rel="preload" href="citia-ds/fonts/manrope/manrope-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="citia-ds/css/ds.css" />
</head>
<body>
  <!-- Icon sprite: icons use <use href="#ds-icon-NAME">. Server templates can paste citia-ds/icons/sprite.svg here instead. -->
  <script>
    fetch("citia-ds/icons/sprite.svg").then(function (r) { return r.text(); })
      .then(function (svg) { document.body.insertAdjacentHTML("afterbegin", svg); });
  </script>

  <main style="display: grid; gap: var(--ds-space-6); max-width: 48rem; margin-inline: auto; padding: var(--ds-space-8) var(--ds-space-4);">
    <header class="ds-page-header">
      <div>
        <p class="ds-eyebrow">Static files</p>
        <h1 class="ds-page-title">Citia Design System $version</h1>
      </div>
      <div class="ds-segmented ds-theme-switcher" role="group" aria-label="Theme" data-ds-segmented>
        <button type="button" data-ds-theme-set="light" aria-pressed="false" aria-label="Light" title="Light"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-sun"/></svg></button>
        <button type="button" data-ds-theme-set="dark" aria-pressed="false" aria-label="Dark" title="Dark"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-moon"/></svg></button>
        <button type="button" data-ds-theme-set="system" aria-pressed="false" aria-label="System" title="System"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-monitor"/></svg></button>
      </div>
    </header>

    <div class="ds-alert is-info" role="status">
      <svg class="ds-icon ds-alert__icon" aria-hidden="true"><use href="#ds-icon-info"></use></svg>
      <div class="ds-alert__body">
        <p class="ds-alert__title">Everything on this page loads from the citia-ds folder</p>
        <div class="ds-alert__text">No CDN and no internet: copy the folder next to your pages.</div>
      </div>
    </div>

    <form class="ds-fieldset" onsubmit="event.preventDefault(); DS.toast({ tone: 'success', title: 'Saved', text: 'The toast comes from ds.js.' });">
      <div class="ds-field">
        <label for="name">Project name</label>
        <input id="name" name="name" class="input" required aria-describedby="name-hint" />
        <p id="name-hint" class="ds-hint">Shown in lists.</p>
      </div>
      <div class="ds-actions">
        <span class="ds-pill is-success">Ready</span>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>
  </main>

  <div class="ds-toast-region" data-ds-toast-region data-position="bottom-end" role="region" aria-label="Notifications" aria-live="polite" aria-relevant="additions text"></div>
  <script type="module" src="citia-ds/js/ds.js"></script>
</body>
</html>
"@.Replace("`r`n", "`n"), $utf8)

    [System.IO.File]::WriteAllText((Join-Path $st 'README.md'), @"
# Citia Design System $version, static files

For pages that are not ASP.NET Core Razor (plain HTML, other back ends, closed networks). Nothing loads from a CDN.

- ``citia-ds/css/ds.css``: every component, tokens, light and dark themes, Manrope font (relative URLs).
- ``citia-ds/js/ds.js``: behaviours, an ES module: ``<script type="module" src="citia-ds/js/ds.js"></script>``.
- ``citia-ds/icons/sprite.svg``: icons, used as ``<svg class="ds-icon"><use href="#ds-icon-NAME"/></svg>`` once the sprite is in the page.
- ``citia-ds/tokens/tokens.json``: design tokens for other tools.

Copy the ``citia-ds`` folder next to your pages and start from ``index.html``. Serve the files over HTTP:
browsers do not load ES modules from ``file://``.

The markup for each component is on https://design.citia-engineering.com (the HTML tab of each example).
Tag helpers, partials, DsText and Fmt need ASP.NET Core: use the NuGet package there.
"@.Replace("`r`n", "`n"), $utf8)

    $stZip = Join-Path $Out "citia-ds-static-$version.zip"
    New-Zip $st $stZip

    Write-Host "Bundles for $version"
    Get-Item $offZip, $stZip | ForEach-Object { Write-Host ("  {0}  {1:N0} bytes" -f $_.Name, $_.Length) }
}
finally {
    Remove-Item -Recurse -Force $work -ErrorAction SilentlyContinue
}
