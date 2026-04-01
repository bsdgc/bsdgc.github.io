param(
  [string]$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path,
  [string]$Version
)

$ErrorActionPreference = "Stop"

if (-not $Version) {
  $Version = Get-Date -Format "yyyyMMdd-HHmmss"
}

$htmlFiles = Get-ChildItem -Path $Root -Filter "*.html" -File
$pattern = 'secondary\.css\?v=[^"]+'
$replacement = "secondary.css?v=$Version"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$updated = @()

foreach ($file in $htmlFiles) {
  $content = [System.IO.File]::ReadAllText($file.FullName)
  $next = [System.Text.RegularExpressions.Regex]::Replace($content, $pattern, $replacement)

  if ($next -ne $content) {
    [System.IO.File]::WriteAllText($file.FullName, $next, $utf8NoBom)
    $updated += $file.Name
  }
}

Write-Host "secondary.css version: $Version"

if ($updated.Count -eq 0) {
  Write-Host "No HTML files needed updating."
  exit 0
}

Write-Host "Updated files:"
$updated | ForEach-Object { Write-Host " - $_" }
