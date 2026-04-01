param(
  [string]$UserId = "LvwsvigAAAAJ",
  [string]$Lang = "en",
  [int]$PageSize = 100,
  [double]$PauseSeconds = 0.8,
  [string]$Output = ""
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if (-not $Output) {
  $Output = Join-Path (Split-Path -Parent $PSScriptRoot) "publications-data.js"
}

$ScholarBase = "https://scholar.google.com"

function Get-ScholarHtml {
  param([string]$Url)
  $headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
    "Accept-Language" = "en-US,en;q=0.9"
  }
  $resp = Invoke-WebRequest -Uri $Url -Headers $headers
  return $resp.Content
}

function Strip-Html {
  param([string]$Text)
  if (-not $Text) { return "" }
  $value = [regex]::Replace($Text, "<[^>]+>", "")
  $value = [System.Net.WebUtility]::HtmlDecode($value)
  return ([regex]::Replace($value, "\s+", " ")).Trim()
}

function Split-VenueLine {
  param(
    [string]$VenueLine,
    [Nullable[int]]$Year
  )
  if (-not $VenueLine) {
    return @{
      journal = "Google Scholar"
      citation = $(if ($Year) { "$Year" } else { "" })
    }
  }

  $parts = $VenueLine.Split(",") | ForEach-Object { $_.Trim() } | Where-Object { $_ }
  if ($parts.Count -eq 0) {
    return @{
      journal = "Google Scholar"
      citation = $(if ($Year) { "$Year" } else { "" })
    }
  }

  if ($parts.Count -eq 1) {
    $citation = ""
    if ($Year -and ($parts[0] -notmatch [regex]::Escape("$Year"))) {
      $citation = "$Year"
    }
    return @{ journal = $parts[0]; citation = $citation }
  }

  $journal = $parts[0]
  $citation = ($parts | Select-Object -Skip 1) -join ", "
  if ($Year -and ($citation -notmatch [regex]::Escape("$Year"))) {
    $citation = if ($citation) { "$citation, $Year" } else { "$Year" }
  }
  return @{ journal = $journal; citation = $citation }
}

function Get-DetailMap {
  param([string]$DetailHtml)
  $map = @{}
  $matches = [regex]::Matches($DetailHtml, '<div class="gsc_oci_field">(.*?)</div>\s*<div class="gsc_oci_value">(.*?)</div>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
  foreach ($m in $matches) {
    $k = Strip-Html $m.Groups[1].Value
    $v = Strip-Html $m.Groups[2].Value
    if ($k -and $v) {
      $map[$k] = $v
    }
  }
  return $map
}

function Get-FirstYear {
  param([string]$Text)
  if (-not $Text) { return $null }
  $m = [regex]::Match($Text, '\b(19|20)\d{2}\b')
  if ($m.Success) { return [int]$m.Value }
  return $null
}

$publications = New-Object System.Collections.Generic.List[object]
$offset = 0

while ($true) {
  $query = "user=$UserId&hl=$Lang&cstart=$offset&pagesize=$PageSize"
  $url = "$ScholarBase/citations?$query"
  $html = Get-ScholarHtml -Url $url

  $rows = [regex]::Matches($html, '<tr class="gsc_a_tr".*?</tr>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
  if ($rows.Count -eq 0) { break }

  foreach ($rowMatch in $rows) {
    $row = $rowMatch.Value
    $titleMatch = [regex]::Match($row, '<a class="gsc_a_at" href="([^"]+)".*?>(.*?)</a>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
    if (-not $titleMatch.Success) { continue }

    $title = Strip-Html $titleMatch.Groups[2].Value
    $relativeUrl = [System.Net.WebUtility]::HtmlDecode($titleMatch.Groups[1].Value)
    $detailUrl = [System.Uri]::new([System.Uri]$ScholarBase, $relativeUrl).AbsoluteUri

    $grayFields = [regex]::Matches($row, '<div class="gs_gray">(.*?)</div>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
    $authorsList = if ($grayFields.Count -gt 0) { Strip-Html $grayFields[0].Groups[1].Value } else { "" }
    $venueLine = if ($grayFields.Count -gt 1) { Strip-Html $grayFields[1].Groups[1].Value } else { "" }

    $yearText = ""
    $yearMatch = [regex]::Match($row, '<span class="gsc_a_h gsc_a_hc gs_ibl">(.*?)</span>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
    if (-not $yearMatch.Success) {
      $yearMatch = [regex]::Match($row, '<span class="gsc_a_yi">(.*?)</span>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
    }
    if (-not $yearMatch.Success) {
      $yearMatch = [regex]::Match($row, '<td class="gsc_a_y".*?>(.*?)</td>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
    }
    if ($yearMatch.Success) {
      $yearText = Strip-Html $yearMatch.Groups[1].Value
    }
    $year = Get-FirstYear -Text $yearText

    $detailMap = @{}
    try {
      $detailHtml = Get-ScholarHtml -Url $detailUrl
      $detailMap = Get-DetailMap -DetailHtml $detailHtml
    } catch {
      $detailMap = @{}
    }

    $authors = if ($detailMap.ContainsKey("Authors")) { $detailMap["Authors"] } else { $authorsList }
    if (-not $authors) { $authors = "Authors unavailable" }

    $journal = ""
    if ($detailMap.ContainsKey("Journal")) { $journal = $detailMap["Journal"] }
    elseif ($detailMap.ContainsKey("Conference")) { $journal = $detailMap["Conference"] }
    elseif ($detailMap.ContainsKey("Book")) { $journal = $detailMap["Book"] }

    $pubDateText = if ($detailMap.ContainsKey("Publication date")) { $detailMap["Publication date"] } else { "" }
    $yearFromDetail = Get-FirstYear -Text $pubDateText
    if ($yearFromDetail) { $year = $yearFromDetail }

    $venue = Split-VenueLine -VenueLine $(if ($journal) { $journal } else { $venueLine }) -Year $year

    $links = New-Object System.Collections.Generic.List[object]
    $links.Add(@{ label = "Scholar"; url = $detailUrl })

    if ($detailMap.ContainsKey("DOI")) {
      $doiValue = $detailMap["DOI"].Trim()
      if ($doiValue) {
        $doiUrl = if ($doiValue -match '^https?://') { $doiValue } else { "https://doi.org/$doiValue" }
        $links.Add(@{ label = "DOI"; url = $doiUrl })
      }
    }

    $publications.Add([ordered]@{
      year = $(if ($year) { $year } else { 0 })
      title = $title
      authors = $authors
      journal = $venue.journal
      citation = $venue.citation
      sourceUrl = $detailUrl
      links = $links
    })
  }

  if ($rows.Count -lt $PageSize) { break }
  $offset += $rows.Count
  Start-Sleep -Milliseconds ([int]($PauseSeconds * 1000))
}

# De-duplicate by title + year
$seen = @{}
$deduped = New-Object System.Collections.Generic.List[object]

$sorted = $publications | Sort-Object @{Expression = { -1 * [int]($_.year) }}, @{Expression = { $_.title.ToLowerInvariant() }}
foreach ($p in $sorted) {
  $key = "{0}|{1}" -f $p.title.ToLowerInvariant(), $p.year
  if ($seen.ContainsKey($key)) { continue }
  $seen[$key] = $true
  $deduped.Add($p)
}

if ($deduped.Count -eq 0) {
  throw "No publications found. Scholar may have blocked the request or the profile id may be incorrect."
}

$json = $deduped | ConvertTo-Json -Depth 8
$outputText = @"
// Auto-generated by scripts/sync_google_scholar.ps1
// Source: Google Scholar profile sync. Manual edits will be overwritten.
window.publicationsData = $json;
"@

[System.IO.File]::WriteAllText($Output, $outputText, [System.Text.Encoding]::UTF8)
Write-Output "Wrote $($deduped.Count) publications to $Output"
