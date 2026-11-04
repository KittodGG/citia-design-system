# Builds the design-system CSS with the Tailwind CSS standalone CLI + daisyUI (no Node.js), same pins as TPS Integration.
# First run downloads the pinned, SHA-256 verified binaries into .tools/ (ignored by Git).
#   powershell -NoProfile -File tools/css.ps1                 # build both outputs (minified)
#   powershell -NoProfile -File tools/css.ps1 -Target docs -Watch
# Outputs:
#   src/Citia.DesignSystem/wwwroot/css/ds.css               prebuilt stylesheet for apps without Tailwind
#   site/Citia.DesignSystem.Docs/wwwroot/css/docs.css       documentation site
param(
  [ValidateSet('all', 'ds', 'docs')][string]$Target = 'all',
  [switch]$Watch
)
$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$tools = Join-Path $root '.tools'
New-Item -ItemType Directory -Force $tools | Out-Null

$onWindows = $IsWindows -or $env:OS -eq 'Windows_NT'
$cliName = if ($onWindows) { 'tailwindcss.exe' } else { 'tailwindcss' }
# Keep versions and hashes in sync with Dockerfile (css stage) and with TPS Integration tools/css.ps1.
$files = @(
  @{ Name = 'daisyui.mjs';       Url = 'https://github.com/saadeghi/daisyui/releases/download/v5.7.47/daisyui.mjs';       Sha = '85819d3fe86a852237b439b13f481481aac58e562ac47694cd11c3038e994f2a' },
  @{ Name = 'daisyui-theme.mjs'; Url = 'https://github.com/saadeghi/daisyui/releases/download/v5.7.47/daisyui-theme.mjs'; Sha = 'd92d2f488933dab757f046e81ebd4986e51e9423307798dc3545d09a15542c89' }
)
if ($onWindows) {
  $files += @{ Name = 'tailwindcss.exe'; Url = 'https://github.com/tailwindlabs/tailwindcss/releases/download/v4.3.3/tailwindcss-windows-x64.exe'; Sha = 'e0e260ce048014e9268f6237ff18f8ccf02cef521cbd0ae04e82c2cdf7aa3955' }
} else {
  # Linux x64 (Docker, CI). Other platforms: download the matching release asset and add its SHA-256 here.
  $files += @{ Name = 'tailwindcss'; Url = 'https://github.com/tailwindlabs/tailwindcss/releases/download/v4.3.3/tailwindcss-linux-x64'; Sha = 'dc61b3ac6b8c9ca874c0cc4c57b2409791a64c5540404ca5f5367360babc313a' }
}

foreach ($f in $files) {
  $path = Join-Path $tools $f.Name
  if ((Test-Path -LiteralPath $path) -and (Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash -eq $f.Sha) { continue }
  Write-Host "Downloading $($f.Name)"
  Invoke-WebRequest $f.Url -OutFile $path -UseBasicParsing
  if ((Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash -ne $f.Sha) {
    [IO.File]::Delete($path)
    throw "SHA-256 mismatch for $($f.Name)"
  }
  if (-not $onWindows) { chmod +x $path }
}

$cli = Join-Path $tools $cliName
$jobs = @()
if ($Target -in 'all', 'ds') {
  $jobs += @{ Dir = Join-Path $root 'src/Citia.DesignSystem'; In = 'Styles/ds.bundle.css'; Out = 'wwwroot/css/ds.css' }
}
if ($Target -in 'all', 'docs') {
  $jobs += @{ Dir = Join-Path $root 'site/Citia.DesignSystem.Docs'; In = 'Styles/docs.css'; Out = 'wwwroot/css/docs.css' }
}
if ($Watch -and $jobs.Count -gt 1) { throw 'Use -Watch with -Target ds or -Target docs.' }

foreach ($job in $jobs) {
  Push-Location $job.Dir
  try {
    if ($Watch) { & $cli -i $job.In -o $job.Out --watch }
    else { & $cli -i $job.In -o $job.Out --minify }
    if ($LASTEXITCODE -ne 0) { throw "tailwindcss failed ($LASTEXITCODE) for $($job.In)" }
    Write-Host "Built $($job.Dir)\$($job.Out)"
  } finally { Pop-Location }
}
