<#
.SYNOPSIS
  Installs the packed Citia.DesignSystem NuGet package into a brand-new Razor Pages app,
  following docs/en/installation.md, and checks that it renders and serves its assets.

.DESCRIPTION
  Proves the package is "plug and play": no source checkout, no copied CSS or JS.
  Runs the app twice: `dotnet run` (Development) and `dotnet publish` (Production).
  Exits 1 on the first failed check. Works on Windows PowerShell 5.1 and PowerShell 7 (Linux CI).

.EXAMPLE
  dotnet pack src/Citia.DesignSystem -c Release -o ./artifacts
  powershell -NoProfile -File tools/smoke-test.ps1 -PackageDir ./artifacts -Version 2.0.1

.EXAMPLE
  # As a developer would: straight from the published Citia feed.
  powershell -NoProfile -File tools/smoke-test.ps1 -Source https://design.citia-engineering.com/nuget/v3/index.json -Version 2.0.1

.EXAMPLE
  # Through tools/install-citia-ds.ps1 from the offline zip, on a simulated machine without internet.
  powershell -NoProfile -File tools/smoke-test.ps1 -InstallFrom artifacts/release/citia-ds-offline-2.0.2.zip -Version 2.0.2 -Offline
#>
param(
    [string] $PackageDir,
    [string] $Source,
    [string] $InstallFrom,
    [switch] $Offline,
    [Parameter(Mandatory)] [string] $Version,
    [string] $Dotnet = $(if ($env:DOTNET) { $env:DOTNET } else { 'dotnet' }),
    [int]    $Port = 5391,
    [switch] $Keep
)

$ErrorActionPreference = 'Stop'
if (-not $PackageDir -and -not $Source -and -not $InstallFrom) { throw 'Give -PackageDir (a folder with the .nupkg), -Source (a NuGet feed URL) or -InstallFrom (for install-citia-ds.ps1).' }
if ($InstallFrom -and $InstallFrom -notin 'feed', 'github') { $InstallFrom = (Resolve-Path $InstallFrom).Path }
$feed = if ($Source) { $Source } elseif ($PackageDir) { (Resolve-Path $PackageDir).Path } else { '' }
# Only for a local test feed (http://localhost): NuGet refuses plain-HTTP sources otherwise.
$insecure = if ($feed -like 'http://*') { ' allowInsecureConnections="true"' } else { '' }
$onWindows = [System.Environment]::OSVersion.Platform -eq 'Win32NT'
$curl = if ($onWindows) { 'curl.exe' } else { 'curl' }

$work = Join-Path ([System.IO.Path]::GetTempPath()) ("citia-ds-smoke-" + [guid]::NewGuid().ToString('N').Substring(0, 8))
New-Item -ItemType Directory -Path $work | Out-Null
# Isolated package cache: a re-packed package with the same version must not come from an old cache.
$env:NUGET_PACKAGES = Join-Path $work 'nuget-packages'
# Same for NuGet's HTTP cache (30 minutes): it would still list the versions a feed had before the last upload.
$env:NUGET_HTTP_CACHE_PATH = Join-Path $work 'nuget-http-cache'
$env:DOTNET_CLI_TELEMETRY_OPTOUT = '1'
$env:DOTNET_NOLOGO = '1'

$failures = 0
function Pass([string] $m) { Write-Host "  ok    $m" -ForegroundColor Green }
function Fail([string] $m) { Write-Host "  FAIL  $m" -ForegroundColor Red; $script:failures++ }
function Check([bool] $cond, [string] $m) { if ($cond) { Pass $m } else { Fail $m } }
function Exec([string] $exe, [string[]] $argv) {
    & $exe @argv | Out-Host
    if ($LASTEXITCODE -ne 0) { throw "$exe $($argv -join ' ') exited $LASTEXITCODE" }
}
function Write-Utf8([string] $path, [string] $text) {
    [System.IO.File]::WriteAllText($path, $text.Replace("`r`n", "`n"), (New-Object System.Text.UTF8Encoding $false))
}

try {
    Write-Host "== Create app in $work"
    Push-Location $work
    Exec $Dotnet @('new', 'webapp', '-n', 'SmokeApp', '-o', 'SmokeApp', '--no-https', '--framework', 'net10.0')
    Set-Location SmokeApp

    $noAudit = @()
    if ($Offline) {
        # Every outgoing request goes to a closed port: NuGet cannot reach any feed, as on a machine without internet.
        $env:HTTP_PROXY = 'http://127.0.0.1:9'; $env:HTTPS_PROXY = 'http://127.0.0.1:9'; $env:ALL_PROXY = 'http://127.0.0.1:9'
        $env:NO_PROXY = '127.0.0.1,localhost'
        # The vulnerability audit downloads data from nuget.org; offline it can only warn (NU1900), which -warnaserror fails.
        $noAudit = @('-p:NuGetAudit=false')
        Write-Host '== Offline: all HTTP(S) goes to a closed proxy'
    }

    if ($InstallFrom) {
        Write-Host "== install-citia-ds.ps1 -From $InstallFrom"
        $ps = (Get-Process -Id $PID).Path
        Exec $ps @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', (Join-Path $PSScriptRoot 'install-citia-ds.ps1'),
            '-From', $InstallFrom, '-Version', $Version, '-Project', $PWD.Path, '-Root', $PWD.Path, '-Dotnet', $Dotnet)
        Check (Test-Path (Join-Path $PWD "packages/Citia.DesignSystem.$Version.nupkg")) 'installer vendored the package into packages/'
        Check ((Get-Content (Join-Path $PWD 'nuget.config') -Raw) -match 'citia-local') 'installer wrote the citia-local source'
    } else {
    Write-Utf8 (Join-Path $PWD 'nuget.config') @"
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="citia" value="$feed"$insecure />
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" />
  </packageSources>
  <packageSourceMapping>
    <packageSource key="nuget.org"><package pattern="*" /></packageSource>
    <packageSource key="citia"><package pattern="Citia.*" /></packageSource>
  </packageSourceMapping>
</configuration>
"@

    Write-Host "== dotnet add package Citia.DesignSystem $Version"
    Exec $Dotnet @('add', 'package', 'Citia.DesignSystem', '--version', $Version)
    }

    # --- Files exactly as docs/en/installation.md describes ---
    Write-Utf8 (Join-Path $PWD 'Program.cs') @'
using System.Globalization;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddRazorPages();

var app = builder.Build();

string[] languages = ["en", "id"];
app.UseRequestLocalization(new RequestLocalizationOptions()
    .SetDefaultCulture("en")
    .AddSupportedCultures(languages)
    .AddSupportedUICultures(languages));

app.UseStaticFiles();
app.UseRouting();
app.MapStaticAssets();
app.MapRazorPages().WithStaticAssets();
app.Run();
'@

    # With the installer, keep the template's own _ViewImports and layout: the installer must wire them itself.
    if (-not $InstallFrom) {
    Write-Utf8 (Join-Path $PWD 'Pages/_ViewImports.cshtml') @'
@using SmokeApp
@namespace SmokeApp.Pages
@using Citia.DesignSystem.Icons
@using Citia.DesignSystem.Ui
@using Citia.DesignSystem.Formatting
@using Citia.DesignSystem.Localization
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@addTagHelper *, Citia.DesignSystem
'@

    Remove-Item -Force -ErrorAction SilentlyContinue (Join-Path $PWD 'Pages/Shared/_Layout.cshtml.css')
    Write-Utf8 (Join-Path $PWD 'Pages/Shared/_Layout.cshtml') @'
@using System.Globalization
<!DOCTYPE html>
<html lang="@CultureInfo.CurrentUICulture.TwoLetterISOLanguageName" data-theme="light">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>@ViewData["Title"] - Smoke</title>
    <partial name="_DsHead" />
</head>
<body>
    <partial name="_DsIconSprite" />
    <a class="ds-skip-link btn btn-primary btn-sm" href="#main">@DsText.T("skip")</a>
    <main id="main">@RenderBody()</main>
    <partial name="_DsToast" />
    <partial name="_DsScripts" />
    @await RenderSectionAsync("Scripts", required: false)
</body>
</html>
'@
    }

    Write-Utf8 (Join-Path $PWD 'Pages/Index.cshtml') @'
@page
@model IndexModel
@{ ViewData["Title"] = "Smoke"; }

<header class="ds-page-header">
    <h1 class="ds-page-title">Smoke test</h1>
</header>

<ds-alert tone="Info" title="Installed from NuGet">Rendered by the package tag helpers.</ds-alert>
<p><ds-pill tone="Success">Paid</ds-pill> <ds-icon name="check" /> <span id="amount">@Fmt.Decimal(1250.5m)</span></p>

<form method="post">
    <ds-field asp-for="Input.Name" label="Project name" hint="Shown in lists." />
    <button type="submit" class="btn btn-primary">Save</button>
</form>

<ds-empty icon="receipt" title="No invoices yet">Invoices you create appear here.</ds-empty>
'@

    Write-Utf8 (Join-Path $PWD 'Pages/Index.cshtml.cs') @'
using System.ComponentModel.DataAnnotations;
using Citia.DesignSystem.Ui;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SmokeApp.Pages;

public class IndexModel : PageModel
{
    [BindProperty] public ProjectInput Input { get; set; } = new();

    public IActionResult OnPost()
    {
        if (!ModelState.IsValid) return Page();
        this.Toast(Tone.Success, "Project saved", $"{Input.Name} is ready.");
        return RedirectToPage();
    }

    public class ProjectInput
    {
        [Required] public string Name { get; set; } = "";
    }
}
'@

    function Test-Running([string] $label, [string] $base) {
        Write-Host "== Checks ($label)"
        $jar = Join-Path $work "cookies-$label.txt"

        $html = (& $curl -s -c $jar -b $jar "$base/") -join "`n"
        Check ($LASTEXITCODE -eq 0 -and $html.Length -gt 0) 'GET / answers'
        Check ($html -match 'data-theme="light"') 'layout rendered with data-theme'
        Check ($html -notmatch '<ds-[a-z]') 'no unprocessed <ds-*> tags (tag helpers registered)'
        Check ($html -match 'class="ds-alert') 'ds-alert rendered'
        Check ($html -match 'class="ds-pill') 'ds-pill rendered'
        Check ($html -match 'class="ds-field') 'ds-field rendered from asp-for'
        Check ($html -match 'class="ds-empty') 'ds-empty rendered'
        Check ($html -match '<symbol') '_DsIconSprite rendered'
        Check ($html -match 'ds-toast') '_DsToast rendered'

        $css = [regex]::Match($html, '(?:href)="([^"]*_content/Citia\.DesignSystem/css/ds[^"]*\.css[^"]*)"').Groups[1].Value
        $js = [regex]::Match($html, '(?:src|href)="([^"]*_content/Citia\.DesignSystem/js/ds[^"]*\.js[^"]*)"').Groups[1].Value
        $font = [regex]::Match($html, 'href="([^"]*_content/Citia\.DesignSystem/fonts/[^"]+)"').Groups[1].Value
        Check ($css -ne '') "_DsHead links ds.css ($css)"
        Check ($js -ne '') "_DsScripts loads ds.js ($js)"
        foreach ($asset in @($css, $js, $font) | Where-Object { $_ }) {
            $url = if ($asset.StartsWith('http')) { $asset } else { $base + $asset.Replace('&amp;', '&') }
            $out = & $curl -s -o (Join-Path $work 'asset.bin') -w '%{http_code} %{size_download}' $url
            $parts = "$out".Split(' ')
            Check ($parts[0] -eq '200' -and [int64]$parts[1] -gt 0) "asset $asset -> $out"
        }
        $cssSize = (& $curl -s -o (Join-Path $work 'ds.css') -w '%{size_download}' "$base/_content/Citia.DesignSystem/css/ds.css")
        Check ([int64]"$cssSize" -gt 100000) "ds.css is the full precompiled build ($cssSize bytes)"
        # daisyUI 5 only emits scanned classes: these are used by the library's own partials and by the documentation.
        $cssText = [System.IO.File]::ReadAllText((Join-Path $work 'ds.css'))
        $missing = @('btn-ghost', 'btn-sm', 'badge', 'card', 'menu', 'kbd', 'modal', 'tooltip', 'loading', 'join', 'dropdown') |
            Where-Object { $cssText -notmatch ('\.' + [regex]::Escape($_) + '[{,:]') }
        Check ($missing.Count -eq 0) "ds.css has the daisyUI classes the library and docs use$(if ($missing) { ' (missing: ' + ($missing -join ', ') + ')' })"

        $id = (& $curl -s "$base/?culture=id") -join "`n"
        # The template layout writes lang="en" literally; the documented layout writes the request culture.
        if (-not $InstallFrom) { Check ($id -match '<html lang="id"') '?culture=id switches <html lang>' }
        Check ($id -match '1\.250,5') 'Fmt.Decimal follows the Indonesian culture'

        $token = [regex]::Match($html, 'name="__RequestVerificationToken" type="hidden" value="([^"]+)"').Groups[1].Value
        Check ($token -ne '') 'antiforgery token present'
        $after = (& $curl -s -L -c $jar -b $jar --data-urlencode "Input.Name=Alpha" --data-urlencode "__RequestVerificationToken=$token" "$base/") -join "`n"
        Check ($after -match 'Project saved') 'this.Toast + redirect shows the toast'

        $invalid = (& $curl -s -c $jar -b $jar --data-urlencode "Input.Name=" --data-urlencode "__RequestVerificationToken=$token" "$base/") -join "`n"
        Check ($invalid -match 'aria-invalid="true"|ds-field-error|input-error') 'server validation error rendered on the field'
    }

    function Wait-Up([string] $base, [System.Diagnostics.Process] $proc) {
        $body = Join-Path $work 'wait.html'
        $code = '000'
        for ($i = 0; $i -lt 90; $i++) {
            if ($proc.HasExited) { throw "app exited early (code $($proc.ExitCode))" }
            $code = "$(& $curl -s -o $body -w '%{http_code}' "$base/")"
            if ($code -eq '200') { return }
            if ($code -like '5*') { break }
            Start-Sleep -Milliseconds 1000
        }
        $detail = if (Test-Path $body) { ((Get-Content $body -Raw) -replace '<[^>]+>', ' ' -replace '\s+', ' ').Trim() } else { '' }
        if ($detail.Length -gt 400) { $detail = $detail.Substring(0, 400) }
        throw "GET $base/ answered HTTP $code. $detail"
    }

    function Start-App([string] $exe, [string[]] $argv, [string] $envName, [string] $dir = $PWD.Path) {
        $psi = New-Object System.Diagnostics.ProcessStartInfo
        $psi.FileName = $exe
        $psi.Arguments = ($argv | ForEach-Object { if ($_ -match '\s') { '"' + $_ + '"' } else { $_ } }) -join ' '
        $psi.WorkingDirectory = $dir
        $psi.UseShellExecute = $false
        $psi.RedirectStandardOutput = $true
        $psi.RedirectStandardError = $true
        $psi.EnvironmentVariables['ASPNETCORE_ENVIRONMENT'] = $envName
        $psi.EnvironmentVariables['NUGET_PACKAGES'] = $env:NUGET_PACKAGES
        $psi.EnvironmentVariables['NUGET_HTTP_CACHE_PATH'] = $env:NUGET_HTTP_CACHE_PATH
        $p = [System.Diagnostics.Process]::Start($psi)
        # Drain output so the child never blocks on a full pipe.
        $null = $p.StandardOutput.ReadToEndAsync()
        $null = $p.StandardError.ReadToEndAsync()
        return $p
    }

    function Stop-App([System.Diagnostics.Process] $p) {
        if ($p -and -not $p.HasExited) {
            # `dotnet run` starts the app as a child process: stop the whole tree.
            if ($onWindows) {
                # stderr from taskkill must not become a terminating error under Windows PowerShell 5.1.
                $prev = $ErrorActionPreference; $ErrorActionPreference = 'Continue'
                & taskkill.exe /T /F /PID $p.Id 2>$null | Out-Null
                $ErrorActionPreference = $prev
            }
            else { try { $p.Kill($true) } catch { $p.Kill() } }
            $p.WaitForExit(10000) | Out-Null
        }
    }

    Write-Host "== Build"
    Exec $Dotnet (@('build', '-c', 'Debug', '-warnaserror') + $noAudit)

    $base = "http://127.0.0.1:$Port"
    $p = Start-App $Dotnet @('run', '--no-build', '--urls', $base) 'Development'
    try { Wait-Up $base $p; Test-Running 'development' $base } finally { Stop-App $p }

    Write-Host "== Publish (Release)"
    Exec $Dotnet (@('publish', '-c', 'Release', '-o', 'out') + $noAudit)
    $base2 = "http://127.0.0.1:$($Port + 1)"
    # Run from the publish folder, as a server would: the content root (and wwwroot) is the working directory.
    $outDir = Join-Path $PWD 'out'
    $p2 = Start-App $Dotnet @((Join-Path $outDir 'SmokeApp.dll'), '--urls', $base2) 'Production' $outDir
    try { Wait-Up $base2 $p2; Test-Running 'published' $base2 } finally { Stop-App $p2 }
}
catch {
    Fail $_.Exception.Message
}
finally {
    Pop-Location
    if (-not $Keep) { Remove-Item -Recurse -Force $work -ErrorAction SilentlyContinue } else { Write-Host "Kept $work" }
}

if ($failures -gt 0) { Write-Host "Smoke test failed: $failures check(s)." -ForegroundColor Red; exit 1 }
Write-Host "Smoke test passed: Citia.DesignSystem $Version installs and runs from NuGet." -ForegroundColor Green
