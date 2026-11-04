<#
  Citia Design System installer for ASP.NET Core (MVC or Razor Pages, .NET 10).

  Online, from the folder of your web project:
      irm https://design.citia-engineering.com/install.ps1 | iex

  Offline, from the unzipped citia-ds-offline-<version>.zip:
      powershell -ExecutionPolicy Bypass -File install-citia-ds.ps1 -From .

  It adds the Citia.DesignSystem package, writes nuget.config, adds the namespaces and tag helpers to _ViewImports.cshtml
  and the four partials to _Layout.cshtml. Running it again is safe; with a newer version it is the update.

  Options (with irm: & ([scriptblock]::Create((irm https://design.citia-engineering.com/install.ps1))) -Version 2.0.2):
    -Project <path>   web project folder or .csproj (default: the current folder)
    -From <source>    feed (default) | github | a .nupkg | a folder | the offline .zip
    -Version <x.y.z>  default: the latest stable version
    -Vendor           keep the package in <repository>/packages so the app restores without the feed (automatic offline)
    -NoWire           only add the package; leave _ViewImports and the layout as they are
#>
& {
    [CmdletBinding()]
    param(
        [string] $Project = '.',
        [string] $From = 'feed',
        [string] $Version,
        [switch] $Vendor,
        [switch] $NoWire,
        [string] $Root,
        [string] $Repo = 'KittodGG/citia-design-system',
        [string] $FeedUrl = 'https://design.citia-engineering.com/nuget/v3',
        [string] $Dotnet = $(if ($env:DOTNET) { $env:DOTNET } else { 'dotnet' })
    )

    $ErrorActionPreference = 'Stop'
    $ProgressPreference = 'SilentlyContinue'
    [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12
    $id = 'Citia.DesignSystem'
    $utf8 = New-Object System.Text.UTF8Encoding $false
    function Say([string] $m) { Write-Host "  $m" }

    # ---------- project and repository root ----------
    $projectPath = (Resolve-Path $Project).Path
    if ((Get-Item $projectPath).PSIsContainer) {
        $found = @(Get-ChildItem $projectPath -Filter *.csproj -File)
        if ($found.Count -ne 1) { throw "Expected one .csproj in $projectPath, found $($found.Count). Run this in the web project folder or pass -Project path\to\App.csproj." }
        $projectPath = $found[0].FullName
    }
    $projectDir = Split-Path $projectPath -Parent
    if (-not $Root) {
        # Nearest folder above the project with a solution, a nuget.config or .git; otherwise the project folder.
        $Root = $projectDir
        $dir = $projectDir
        while ($dir) {
            $marker = Get-ChildItem $dir -File -ErrorAction SilentlyContinue | Where-Object { $_.Name -match '\.slnx?$' -or $_.Name -ieq 'nuget.config' }
            if ($marker -or (Test-Path (Join-Path $dir '.git'))) { $Root = $dir; break }
            $parent = Split-Path $dir -Parent
            if (-not $parent -or $parent -eq $dir) { break }
            $dir = $parent
        }
    }
    $Root = (Resolve-Path $Root).Path
    Write-Host "Citia Design System -> $projectPath" -ForegroundColor Cyan

    # ---------- package source ----------
    $offline = $From -notin 'feed', 'github'
    $useLocal = $offline -or $Vendor -or $From -eq 'github'
    $packages = Join-Path $Root 'packages'
    if ($useLocal) {
        $temp = Join-Path ([System.IO.Path]::GetTempPath()) ('citia-ds-install-' + [guid]::NewGuid().ToString('N').Substring(0, 8))
        New-Item -ItemType Directory $temp | Out-Null
        function Pick([string] $folder) {
            $all = @(Get-ChildItem $folder -Recurse -Filter "$id.*.nupkg" -File)
            if ($Version) { $all = @($all | Where-Object { $_.Name -eq "$id.$Version.nupkg" }) }
            if ($all.Count -eq 0) { throw "No $id$(if ($Version) { " $Version" }) package in $folder" }
            return ($all | Sort-Object { [version](($_.BaseName.Substring($id.Length + 1) -split '-')[0]) }, Name | Select-Object -Last 1).FullName
        }
        try {
            if ($From -eq 'feed') {
                if (-not $Version) { $Version = @((Invoke-RestMethod "$FeedUrl/flat/citia.designsystem/index.json").versions | Where-Object { $_ -notmatch '-' })[-1] }
                $v = $Version.ToLowerInvariant()
                $src = Join-Path $temp "$id.$Version.nupkg"
                Invoke-WebRequest "$FeedUrl/flat/citia.designsystem/$v/citia.designsystem.$v.nupkg" -OutFile $src -UseBasicParsing
            } elseif ($From -eq 'github') {
                $api = if ($Version) { "https://api.github.com/repos/$Repo/releases/tags/v$Version" } else { "https://api.github.com/repos/$Repo/releases/latest" }
                $asset = (Invoke-RestMethod $api -Headers @{ 'User-Agent' = 'citia-ds-install' }).assets | Where-Object { $_.name -like "$id.*.nupkg" } | Select-Object -First 1
                if (-not $asset) { throw "No package in the GitHub release ($api)" }
                $src = Join-Path $temp $asset.name
                Invoke-WebRequest $asset.browser_download_url -OutFile $src -UseBasicParsing
            } else {
                $path = (Resolve-Path $From).Path
                if ((Get-Item $path).PSIsContainer) { $src = Pick $path }
                elseif ($path -like '*.zip') { Expand-Archive $path -DestinationPath $temp -Force; $src = Pick $temp }
                elseif ($path -like '*.nupkg') { $src = $path }
                else { throw "-From takes feed, github, a .nupkg, a folder or the offline .zip." }
            }
            $name = Split-Path $src -Leaf
            if (-not $Version) { $Version = $name.Substring($id.Length + 1, $name.Length - $id.Length - 1 - '.nupkg'.Length) }
            New-Item -ItemType Directory -Force $packages | Out-Null
            $target = Join-Path $packages $name
            if ((Resolve-Path $src).Path -ne $target) { Copy-Item $src $target -Force }
            Say "package  packages/$name"
        } finally { Remove-Item -Recurse -Force $temp -ErrorAction SilentlyContinue }
    }

    # ---------- nuget.config ----------
    $existing = Get-ChildItem $Root -File | Where-Object { $_.Name -ieq 'nuget.config' } | Select-Object -First 1
    $configPath = if ($existing) { $existing.FullName } else { Join-Path $Root 'nuget.config' }
    $xml = New-Object System.Xml.XmlDocument
    if ($existing) { $xml.Load($configPath) }
    else { $xml.LoadXml('<?xml version="1.0" encoding="utf-8"?><configuration><packageSources><add key="nuget.org" value="https://api.nuget.org/v3/index.json" /></packageSources></configuration>') }
    $cfg = $xml.SelectSingleNode('/configuration')
    $sources = $cfg.SelectSingleNode('packageSources')
    if (-not $sources) { $sources = $cfg.AppendChild($xml.CreateElement('packageSources')) }
    $key = if ($useLocal) { 'citia-local' } else { 'citia' }
    $value = if ($useLocal) { 'packages' } else { "$FeedUrl/index.json" }
    $add = $sources.SelectSingleNode("add[@key='$key']")
    if (-not $add) { $add = $sources.AppendChild($xml.CreateElement('add')); $add.SetAttribute('key', $key) }
    $add.SetAttribute('value', $value)

    $mapping = $cfg.SelectSingleNode('packageSourceMapping')
    if (-not $mapping) {
        # A new mapping section applies to every package: keep each existing source for everything else.
        $mapping = $cfg.AppendChild($xml.CreateElement('packageSourceMapping'))
        $keys = @($sources.SelectNodes('add') | ForEach-Object { $_.GetAttribute('key') } | Where-Object { $_ -notin 'citia', 'citia-local' })
        if (-not $sources.SelectSingleNode('clear') -and $keys -notcontains 'nuget.org') { $keys += 'nuget.org' }
        foreach ($k in $keys) {
            $ps = $mapping.AppendChild($xml.CreateElement('packageSource')); $ps.SetAttribute('key', $k)
            $p = $ps.AppendChild($xml.CreateElement('package')); $p.SetAttribute('pattern', '*')
        }
    }
    # Citia.* comes from exactly one source: the one chosen now.
    foreach ($node in @($mapping.SelectNodes("packageSource/package[@pattern='Citia.*']"))) {
        $parent = $node.ParentNode
        if ($parent.GetAttribute('key') -ne $key) {
            [void]$parent.RemoveChild($node)
            if (-not $parent.SelectSingleNode('package')) { [void]$parent.ParentNode.RemoveChild($parent) }
        }
    }
    $mine = $mapping.SelectSingleNode("packageSource[@key='$key']")
    if (-not $mine) { $mine = $mapping.AppendChild($xml.CreateElement('packageSource')); $mine.SetAttribute('key', $key) }
    if (-not $mine.SelectSingleNode("package[@pattern='Citia.*']")) { $p = $mine.AppendChild($xml.CreateElement('package')); $p.SetAttribute('pattern', 'Citia.*') }
    $settings = New-Object System.Xml.XmlWriterSettings
    $settings.Indent = $true; $settings.IndentChars = '  '; $settings.Encoding = $utf8
    $writer = [System.Xml.XmlWriter]::Create($configPath, $settings)
    try { $xml.Save($writer) } finally { $writer.Dispose() }
    Say "config   $configPath ($key)"

    # ---------- package reference ----------
    $argv = @('add', $projectPath, 'package', $id)
    if ($Version) { $argv += @('--version', $Version) }
    # Windows PowerShell 5.1 turns redirected stderr into terminating errors under 'Stop': collect it under 'Continue'.
    $ErrorActionPreference = 'Continue'
    $out = & $Dotnet @argv 2>&1 | ForEach-Object { "$_" }
    $code = $LASTEXITCODE
    $ErrorActionPreference = 'Stop'
    if ($code -ne 0) { $out | Out-Host; throw "dotnet add package failed ($code)" }
    $added = ($out | Select-String "PackageReference for package '$id' version '([^']+)'" | Select-Object -First 1)
    if ($added) { $Version = $added.Matches[0].Groups[1].Value }
    Say "package  $id $Version"

    # ---------- _ViewImports and layout ----------
    if (-not $NoWire) {
        $kind = if (Test-Path (Join-Path $projectDir 'Pages')) { 'Pages' } else { 'Views' }
        $imports = Join-Path $projectDir "$kind/_ViewImports.cshtml"
        $text = if (Test-Path $imports) { [System.IO.File]::ReadAllText($imports) } else { '' }
        $need = @('@using Citia.DesignSystem.Icons', '@using Citia.DesignSystem.Ui', '@using Citia.DesignSystem.Formatting',
                  '@using Citia.DesignSystem.Localization', '@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers', '@addTagHelper *, Citia.DesignSystem')
        $missing = @($need | Where-Object { $text -notmatch [regex]::Escape($_) })
        if ($missing.Count) {
            if ($text.Length -and -not $text.EndsWith("`n")) { $text += "`r`n" }
            [System.IO.File]::WriteAllText($imports, $text + ($missing -join "`r`n") + "`r`n", $utf8)
            Say "imports  $kind/_ViewImports.cshtml (+$($missing.Count) lines)"
        } else { Say "imports  $kind/_ViewImports.cshtml (already set)" }

        $layout = Join-Path $projectDir "$kind/Shared/_Layout.cshtml"
        if (-not (Test-Path $layout)) {
            Write-Warning "No $kind/Shared/_Layout.cshtml. Add the partials to your layout by hand: _DsHead, _DsIconSprite, _DsToast, _DsScripts."
        } else {
            $l = [System.IO.File]::ReadAllText($layout)
            $before = $l
            # First match only; <head> must not match <header>.
            function Once([string] $s, [string] $pattern, [string] $replacement) { ([regex]::new($pattern, 'IgnoreCase')).Replace($s, $replacement, 1) }
            if ($l -notmatch '_DsHead') { $l = Once $l '(<head(\s[^>]*)?>)' "`$1`r`n    <partial name=`"_DsHead`" />" }
            if ($l -notmatch '_DsIconSprite') { $l = Once $l '(<body(\s[^>]*)?>)' "`$1`r`n    <partial name=`"_DsIconSprite`" />" }
            if ($l -notmatch '_DsToast') { $l = Once $l '(\s*)(</body>)' "`r`n    <partial name=`"_DsToast`" />`$1`$2" }
            if ($l -notmatch '_DsScripts') { $l = Once $l '(\s*)(</body>)' "`r`n    <partial name=`"_DsScripts`" />`$1`$2" }
            if ($l -notmatch '<html[^>]*data-theme') { $l = Once $l '<html(?=[\s>])' '<html data-theme="light"' }
            if ($l -ne $before) { [System.IO.File]::WriteAllText($layout, $l, $utf8); Say "layout   $kind/Shared/_Layout.cshtml (partials added)" }
            else { Say "layout   $kind/Shared/_Layout.cshtml (already set)" }
            if ($l -match 'bootstrap(\.min)?\.css') {
                Write-Warning "The layout still links Bootstrap CSS. It restyles .btn and .form-control over the design system: remove that <link> when you can."
            }
        }
    }

    Write-Host ''
    Write-Host "Done: $id $Version." -ForegroundColor Green
    if ($useLocal) { Write-Host "Commit packages/$id.$Version.nupkg and nuget.config: clones and build servers then restore without the feed." }
    Write-Host 'Try it in any view:  <ds-alert tone="Success" title="Citia Design System is ready" />'
    Write-Host 'Docs: https://design.citia-engineering.com/en/installation'
} @args
