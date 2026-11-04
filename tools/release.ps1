<#
.SYNOPSIS
  Publishes Citia.DesignSystem: the Citia NuGet feed (https://design.citia-engineering.com/nuget/v3/index.json)
  and a GitHub release with the same package plus the offline and static bundles.

.DESCRIPTION
  One command per release, run by the design system maintainer. Stops at the first failed gate:
    1. Version comes from src/Citia.DesignSystem/Citia.DesignSystem.csproj (<Version>).
    2. CHANGELOG.md, docs/en/changelog.md and docs/id/changelog.md have a "## <version> - <date>" entry.
    3. Neither the feed nor GitHub has that version yet: a published version is never replaced.
    4. Git: the working tree is clean and pushed, so the release tag points at the code that was built.
    5. Tokens regenerate and every required WCAG contrast pair passes (tools/tokens.cs); ds.css rebuilds (tools/css.ps1).
       If that changes a committed file, the release stops: commit the regenerated files first.
    6. Pack, bundle (tools/bundle.ps1), smoke test the package, and smoke test the offline installer on a simulated
       machine without internet.
    7. Upload to the feed over SSH; smoke test again from the live feed, as a developer would.
    8. GitHub release v<version> with the .nupkg, citia-ds-offline-<version>.zip and citia-ds-static-<version>.zip.
  The documentation site is deployed separately with tools/deploy-site.ps1.

.EXAMPLE
  powershell -NoProfile -File tools/release.ps1
#>
param(
    # SSH host alias from ~/.ssh/config; the feed folder is relative to the deploy user's home.
    [string] $SshHost = $(if ($env:CITIA_DS_SSH_HOST) { $env:CITIA_DS_SSH_HOST } else { 'citia-ds-staging' }),
    [string] $FeedDir = 'apps/citia-ds-feed',
    [string] $FeedUrl = 'https://design.citia-engineering.com/nuget/v3/index.json',
    [string] $Repo = 'KittodGG/citia-design-system',
    [string] $Dotnet = $(if ($env:DOTNET) { $env:DOTNET } elseif (Test-Path "$env:LOCALAPPDATA\Microsoft\dotnet\dotnet.exe") { "$env:LOCALAPPDATA\Microsoft\dotnet\dotnet.exe" } else { 'dotnet' }),
    [switch] $SkipLiveCheck,
    [switch] $SkipGitHub
)

$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$csproj = Join-Path $root 'src/Citia.DesignSystem/Citia.DesignSystem.csproj'
$out = Join-Path $root 'artifacts/release'
$ps = (Get-Process -Id $PID).Path   # run child scripts in a separate process: they end with `exit`

function Exec([string] $exe, [string[]] $argv) {
    & $exe @argv
    if ($LASTEXITCODE -ne 0) { throw "$exe $($argv -join ' ') exited $LASTEXITCODE" }
}
function Step([string] $m) { Write-Host "== $m" -ForegroundColor Cyan }
function Invoke-Git([string[]] $argv) { $r = & git.exe -C $root @argv; if ($LASTEXITCODE -ne 0) { throw "git $($argv -join ' ') failed" }; return $r }

Step 'Version'
$version = (& $Dotnet msbuild $csproj -getProperty:Version).Trim()
if ($version -notmatch '^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$') { throw "Unexpected version '$version' in $csproj" }
$tag = "v$version"
Write-Host "Citia.DesignSystem $version"

Step 'Changelog'
foreach ($file in 'CHANGELOG.md', 'docs/en/changelog.md', 'docs/id/changelog.md') {
    $text = Get-Content (Join-Path $root $file) -Raw -Encoding UTF8
    if ($text -notmatch "(?m)^## $([regex]::Escape($version)) - ") { throw "$file has no '## $version - <date>' entry" }
    Write-Host "  $file ok"
}

Step 'Not published yet'
$flat = $FeedUrl -replace 'index\.json$', "flat/citia.designsystem/index.json"
$existing = (& curl.exe -s $flat) -join ''
if ($existing -match ('"' + [regex]::Escape($version.ToLowerInvariant()) + '"')) {
    throw "$version is already on the feed. Raise <Version> in the csproj and add a changelog entry."
}
if (-not $SkipGitHub) {
    # "release not found" on stderr is the expected answer; Windows PowerShell 5.1 would turn it into a terminating error.
    $prev = $ErrorActionPreference; $ErrorActionPreference = 'Continue'
    & gh release view $tag -R $Repo 2>$null | Out-Null
    $found = $LASTEXITCODE -eq 0
    $ErrorActionPreference = $prev
    if ($found) { throw "GitHub release $tag already exists in $Repo." }
}

Step 'Git'
if (-not $SkipGitHub) {
    $dirty = Invoke-Git @('status', '--porcelain')
    if ($dirty) { throw "Uncommitted changes:`n$($dirty -join "`n")" }
    Invoke-Git @('fetch', '--quiet', 'origin') | Out-Null
    $head = (Invoke-Git @('rev-parse', 'HEAD')).Trim()
    $branch = (Invoke-Git @('rev-parse', '--abbrev-ref', 'HEAD')).Trim()
    $remote = (Invoke-Git @('rev-parse', "origin/$branch")).Trim()
    if ($head -ne $remote) { throw "HEAD ($head) is not pushed to origin/$branch ($remote). Push first." }
    Write-Host "  $branch @ $head"
}

Step 'Tokens, contrast and CSS'
Push-Location $root
try { Exec $Dotnet @('run', 'tools/tokens.cs') } finally { Pop-Location }
Exec $ps @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', (Join-Path $PSScriptRoot 'css.ps1'), '-Target', 'ds')
if (-not $SkipGitHub) {
    $changed = Invoke-Git @('status', '--porcelain')
    if ($changed) { throw "Regenerating tokens or ds.css changed committed files. Commit them and run again:`n$($changed -join "`n")" }
}

Step 'Pack and bundle'
Remove-Item -Recurse -Force $out -ErrorAction SilentlyContinue
Exec $Dotnet @('pack', $csproj, '-c', 'Release', '-o', $out, '-warnaserror')
$nupkg = Join-Path $out "Citia.DesignSystem.$version.nupkg"
if (-not (Test-Path $nupkg)) { throw "Expected $nupkg" }
Exec $ps @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', (Join-Path $PSScriptRoot 'bundle.ps1'), '-Nupkg', $nupkg)
$offline = Join-Path $out "citia-ds-offline-$version.zip"
$static = Join-Path $out "citia-ds-static-$version.zip"

$smoke = Join-Path $PSScriptRoot 'smoke-test.ps1'
Step 'Smoke test: package'
Exec $ps @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', $smoke, '-PackageDir', $out, '-Version', $version, '-Dotnet', $Dotnet)
Step 'Smoke test: offline installer, no internet'
Exec $ps @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', $smoke, '-InstallFrom', $offline, '-Offline', '-Version', $version, '-Dotnet', $Dotnet)

Step "Upload to $SshHost`:$FeedDir"
$name = Split-Path $nupkg -Leaf
Exec 'ssh' @('-o', 'BatchMode=yes', $SshHost, "mkdir -p '$FeedDir' && test ! -e '$FeedDir/$name'")
Exec 'scp' @('-q', '-o', 'BatchMode=yes', $nupkg, "${SshHost}:$FeedDir/$name.uploading")
# Rename after the upload completes: the feed only lists *.nupkg, so a half-uploaded file is never offered.
Exec 'ssh' @('-o', 'BatchMode=yes', $SshHost, "mv -n '$FeedDir/$name.uploading' '$FeedDir/$name' && ls -l '$FeedDir/$name'")

Step 'Live feed'
$listed = (& curl.exe -s $flat) -join ''
if ($listed -notmatch ('"' + [regex]::Escape($version.ToLowerInvariant()) + '"')) { throw "Feed does not list $version yet: $listed" }
Write-Host "  $flat -> $listed"
if (-not $SkipLiveCheck) {
    Exec $ps @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', $smoke, '-Source', $FeedUrl, '-Version', $version, '-Dotnet', $Dotnet)
}

if (-not $SkipGitHub) {
    Step "GitHub release $tag"
    $log = Get-Content (Join-Path $root 'CHANGELOG.md') -Raw -Encoding UTF8
    $section = [regex]::Match($log, "(?ms)^## $([regex]::Escape($version)) - [^\n]*\n(.*?)(?=^## |\z)").Groups[1].Value.Trim()
    $notes = Join-Path $out 'release-notes.md'
    $body = @"
$section

### Install

``````powershell
dotnet add package Citia.DesignSystem --version $version
``````

Without access to the feed: download ``citia-ds-offline-$version.zip`` and run ``install-citia-ds.ps1 -From .``, or use ``citia-ds-static-$version.zip`` for pages without Razor. See https://design.citia-engineering.com/en/installation#offline.
"@
    [System.IO.File]::WriteAllText($notes, $body.Replace("`r`n", "`n"), (New-Object System.Text.UTF8Encoding $false))
    Exec 'gh' @('release', 'create', $tag, '-R', $Repo, '--target', $head, '--title', "Citia Design System $version", '--notes-file', $notes, $nupkg, $offline, $static)
}

Write-Host ''
Write-Host "Released Citia.DesignSystem $version." -ForegroundColor Green
Write-Host "Apps update with:  dotnet add package Citia.DesignSystem --version $version"
Write-Host "Without the feed:  citia-ds-offline-$version.zip from https://github.com/$Repo/releases/tag/$tag"
