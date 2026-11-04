<#
.SYNOPSIS
  Publishes the documentation site (with the NuGet feed) and deploys it to the staging VPS behind
  https://design.citia-engineering.com. Rolls back to the previous build when the health check fails.

.DESCRIPTION
  - Self-contained linux-x64 build: the server needs no .NET runtime.
  - Private planning docs (docs/_*) are not shipped.
  - The NuGet feed folder lives outside the app folder, so deploying the site never removes published packages.
  - Runs under PM2 as the deploy user (no sudo). nginx + Cloudflare in front: see setup-design-domain.sh on the server.

.EXAMPLE
  powershell -NoProfile -File tools/deploy-site.ps1
#>
param(
    # SSH host alias from ~/.ssh/config (HostName, User, IdentityFile). Server details stay out of the repository.
    [string] $SshHost = $(if ($env:CITIA_DS_SSH_HOST) { $env:CITIA_DS_SSH_HOST } else { 'citia-ds-staging' }),
    # Relative paths are under the deploy user's home folder.
    [string] $AppDir = 'apps/citia-ds',
    [string] $FeedDir = 'apps/citia-ds-feed',
    [string] $PublicUrl = 'https://design.citia-engineering.com',
    [int]    $Port = 5180,
    [string] $Dotnet = $(if ($env:DOTNET) { $env:DOTNET } elseif (Test-Path "$env:LOCALAPPDATA\Microsoft\dotnet\dotnet.exe") { "$env:LOCALAPPDATA\Microsoft\dotnet\dotnet.exe" } else { 'dotnet' })
)

$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$out = Join-Path $root 'artifacts/site'
$tgz = Join-Path $root 'artifacts/citia-ds-site.tgz'
$remoteScript = Join-Path $root 'artifacts/citia-ds-deploy.sh'

function Exec([string] $exe, [string[]] $argv) {
    & $exe @argv
    if ($LASTEXITCODE -ne 0) { throw "$exe exited $LASTEXITCODE" }
}

Write-Host '== Publish (linux-x64, self-contained)'
Remove-Item -Recurse -Force $out -ErrorAction SilentlyContinue
Exec $Dotnet @('publish', (Join-Path $root 'site/Citia.DesignSystem.Docs'), '-c', 'Release', '-r', 'linux-x64', '--self-contained', '-o', $out, '-warnaserror')

# Internal working notes stay in the repository.
Get-ChildItem (Join-Path $out 'content/docs') -Filter '_*' | Remove-Item -Recurse -Force

Write-Host '== Pack'
Remove-Item -Force $tgz -ErrorAction SilentlyContinue
Exec 'tar' @('-czf', $tgz, '-C', $out, '.')

$sh = @"
set -euo pipefail
APP='$AppDir'; FEED='$FeedDir'; URL='$PublicUrl'; PORT='$Port'
case "`$APP" in /*) ;; *) APP="`$HOME/`$APP" ;; esac
case "`$FEED" in /*) ;; *) FEED="`$HOME/`$FEED" ;; esac
mkdir -p "`$FEED"
rm -rf "`$APP.new"; mkdir -p "`$APP.new"
tar -xzf ~/apps/citia-ds-site.tgz -C "`$APP.new"
chmod +x "`$APP.new/Citia.DesignSystem.Docs"
rm -rf "`$APP.prev"
if [ -d "`$APP" ]; then mv "`$APP" "`$APP.prev"; fi
mv "`$APP.new" "`$APP"

cat > ~/apps/citia-ds.config.cjs <<CFG
module.exports = { apps: [{
  name: "citia-ds-docs",
  cwd: "`$APP",
  script: "`$APP/Citia.DesignSystem.Docs",
  interpreter: "none",
  env: {
    ASPNETCORE_ENVIRONMENT: "Production",
    ASPNETCORE_URLS: "http://127.0.0.1:`$PORT",
    NuGet__PackagesPath: "`$FEED",
    NuGet__PublicUrl: "`$URL",
    DOTNET_gcServer: "0",
    DOTNET_GCHeapHardLimit: "0x10000000"
  },
  max_memory_restart: "300M"
}]};
CFG

export PATH="`$(ls -d "`$HOME"/.nvm/versions/node/*/bin | tail -1):`$PATH"
pm2 startOrReload ~/apps/citia-ds.config.cjs --update-env >/dev/null
ok=0
for i in `$(seq 1 30); do
  if [ "`$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:`$PORT/en/")" = 200 ] \
     && [ "`$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:`$PORT/nuget/v3/index.json")" = 200 ]; then ok=1; break; fi
  sleep 1
done
if [ "`$ok" != 1 ]; then
  echo "health check failed, rolling back" >&2
  if [ -d "`$APP.prev" ]; then rm -rf "`$APP.failed"; mv "`$APP" "`$APP.failed"; mv "`$APP.prev" "`$APP"; pm2 restart citia-ds-docs --update-env >/dev/null; fi
  exit 1
fi
pm2 save >/dev/null
rm -f ~/apps/citia-ds-site.tgz ~/apps/citia-ds-deploy.sh
echo "deployed: `$(du -sh "`$APP" | cut -f1), feed `$(ls "`$FEED"/*.nupkg 2>/dev/null | wc -l) package(s), disk `$(df -h / | tail -1 | awk '{print `$5}') used"
"@
[System.IO.File]::WriteAllText($remoteScript, $sh.Replace("`r`n", "`n"), (New-Object System.Text.UTF8Encoding $false))

Write-Host "== Upload to $SshHost"
Exec 'scp' @('-q', '-o', 'BatchMode=yes', $tgz, $remoteScript, "${SshHost}:apps/")
Exec 'ssh' @('-o', 'BatchMode=yes', $SshHost, 'bash ~/apps/citia-ds-deploy.sh')

$code = & curl.exe -s -o NUL -w '%{http_code}' "$PublicUrl/nuget/v3/index.json"
Write-Host "== $PublicUrl/nuget/v3/index.json -> $code"
if ("$code" -ne '200') { throw "public feed answered $code" }
