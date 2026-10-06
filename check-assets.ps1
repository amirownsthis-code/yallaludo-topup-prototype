$ErrorActionPreference = 'Stop'
$projectRoot = $PSScriptRoot
$sourceFiles = @(Get-Item -LiteralPath (Join-Path $projectRoot 'index.html'))
$sourceFiles += @(Get-ChildItem -LiteralPath (Join-Path $projectRoot 'src') -Recurse -File)

$assetPaths = @($sourceFiles | Select-String -Pattern '/images/[A-Za-z0-9_.-]+' -AllMatches |
    ForEach-Object { $_.Matches.Value } | Sort-Object -Unique)

$missing = @($assetPaths |
    Where-Object { $_ -ne '/images/banner-1.webp' -and $_ -ne '/images/banner-1.png' } |
    Where-Object { -not (Test-Path -LiteralPath (Join-Path $projectRoot ('public' + $_)) -PathType Leaf) })

$hasBanner = (Test-Path -LiteralPath (Join-Path $projectRoot 'public/images/banner-1.webp') -PathType Leaf) -or
    (Test-Path -LiteralPath (Join-Path $projectRoot 'public/images/banner-1.png') -PathType Leaf)
if (-not $hasBanner) { $missing += '/images/banner-1.webp OR /images/banner-1.png' }

if ($missing.Count -gt 0) {
    Write-Host 'Missing assets in public/images:'
    $missing | ForEach-Object { Write-Host $_ }
    exit 1
}

Write-Host 'All statically referenced image filenames are present in public/images.'
Write-Host 'Filename existence only: check capitalization and visual rendering separately.'
exit 0
