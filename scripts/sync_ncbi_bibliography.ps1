param(
  [string]$BibliographyUrl = "https://www.ncbi.nlm.nih.gov/myncbi/runwen.yao.1/bibliography/public/",
  [string]$Output = "",
  [int]$BatchSize = 80
)

$ErrorActionPreference = "Stop"

if (-not $Output) {
  $Output = Join-Path (Split-Path -Parent $PSScriptRoot) "publications-data.js"
}

$headers = @{
  "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
  "Accept-Language" = "en-US,en;q=0.9"
}

function HtmlDecode([string]$text) {
  if (-not $text) { return "" }
  return [System.Net.WebUtility]::HtmlDecode($text).Trim()
}

function CleanWhitespace([string]$text) {
  if (-not $text) { return "" }
  return ([regex]::Replace($text, "\s+", " ")).Trim()
}

function Get-YearFromArticle($articleNode) {
  $year = $articleNode.MedlineCitation.Article.Journal.JournalIssue.PubDate.Year
  if ($year) { return [int]$year }

  $articleDateYear = $articleNode.MedlineCitation.Article.ArticleDate.Year | Select-Object -First 1
  if ($articleDateYear) { return [int]$articleDateYear }

  $medlineDate = [string]$articleNode.MedlineCitation.Article.Journal.JournalIssue.PubDate.MedlineDate
  if ($medlineDate) {
    $m = [regex]::Match($medlineDate, "\b(19|20)\d{2}\b")
    if ($m.Success) { return [int]$m.Value }
  }

  return 0
}

function Build-Citation($articleNode) {
  $volume = [string]$articleNode.MedlineCitation.Article.Journal.JournalIssue.Volume
  $issue = [string]$articleNode.MedlineCitation.Article.Journal.JournalIssue.Issue
  $pages = [string]$articleNode.MedlineCitation.Article.Pagination.MedlinePgn

  $volumeIssue = ""
  if ($volume -and $issue) {
    $volumeIssue = "$volume($issue)"
  } elseif ($volume) {
    $volumeIssue = $volume
  } elseif ($issue) {
    $volumeIssue = "($issue)"
  }

  if ($volumeIssue -and $pages) {
    return "${volumeIssue}:$pages"
  }
  if ($volumeIssue) { return $volumeIssue }
  if ($pages) { return $pages }
  return ""
}

function Build-Authors($articleNode) {
  $names = New-Object System.Collections.Generic.List[string]
  $authorList = $articleNode.MedlineCitation.Article.AuthorList
  if (-not $authorList) {
    return "Authors unavailable"
  }

  foreach ($author in $authorList.Author) {
    $collective = [string]$author.CollectiveName
    if ($collective) {
      $names.Add((CleanWhitespace (HtmlDecode $collective)))
      continue
    }

    $last = [string]$author.LastName
    $fore = [string]$author.ForeName
    if ($last -and $fore) {
      $names.Add((CleanWhitespace (HtmlDecode "$fore $last")))
    } elseif ($last) {
      $names.Add((CleanWhitespace (HtmlDecode $last)))
    }
  }

  if ($names.Count -eq 0) {
    return "Authors unavailable"
  }

  return ($names -join ", ")
}

function Get-ArticleIds($articleNode) {
  $result = @{
    PMID = ""
    DOI = ""
    PMCID = ""
  }

  foreach ($idNode in $articleNode.PubmedData.ArticleIdList.ArticleId) {
    $idType = [string]$idNode.IdType
    $value = [string]$idNode.'#text'
    if (-not $value) {
      $value = [string]$idNode
    }

    if ($idType -eq "pubmed") { $result.PMID = $value }
    elseif ($idType -eq "doi") { $result.DOI = $value }
    elseif ($idType -eq "pmc") { $result.PMCID = $value }
  }

  return $result
}

function Convert-ArticleToPublication($articleNode) {
  $title = CleanWhitespace (HtmlDecode ([string]$articleNode.MedlineCitation.Article.ArticleTitle))
  $journal = CleanWhitespace (HtmlDecode ([string]$articleNode.MedlineCitation.Article.Journal.Title))
  $year = Get-YearFromArticle $articleNode
  $authors = Build-Authors $articleNode
  $citation = Build-Citation $articleNode
  $ids = Get-ArticleIds $articleNode

  $links = New-Object System.Collections.Generic.List[object]
  if ($ids.PMID) {
    $links.Add(@{ label = "PubMed"; url = "https://pubmed.ncbi.nlm.nih.gov/$($ids.PMID)/" })
  }
  if ($ids.PMCID) {
    $links.Add(@{ label = "PMC"; url = "https://pmc.ncbi.nlm.nih.gov/articles/$($ids.PMCID)/" })
  }
  if ($ids.DOI) {
    $links.Add(@{ label = "DOI"; url = "https://doi.org/$($ids.DOI)" })
  }

  $sourceUrl = if ($ids.PMID) { "https://pubmed.ncbi.nlm.nih.gov/$($ids.PMID)/" } else { "" }

  return [ordered]@{
    year = $year
    title = $title
    authors = $authors
    journal = $journal
    citation = $citation
    sourceUrl = $sourceUrl
    links = $links
  }
}

# 1) Extract all PMIDs from public My Bibliography page.
$bibHtml = (Invoke-WebRequest -Uri $BibliographyUrl -Headers $headers).Content
$pmidMatches = [regex]::Matches($bibHtml, 'PubMed PMID:\s*(\d+)', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
$pmids = $pmidMatches | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique

# Fallback: some page variants expose PMIDs as data attributes instead of visible text.
if (-not $pmids -or $pmids.Count -eq 0) {
  $pmidMatches = [regex]::Matches($bibHtml, 'data-pmid="(\d+)"', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  $pmids = $pmidMatches | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
}

# Additional fallback: generic PMID formats in rendered HTML text.
if (-not $pmids -or $pmids.Count -eq 0) {
  $pmidMatches = [regex]::Matches($bibHtml, '\bPMID[:\s]+(\d+)\b', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  $pmids = $pmidMatches | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
}

if (-not $pmids -or $pmids.Count -eq 0) {
  throw "No PMIDs found from the NCBI public bibliography URL. Please verify the URL is public and contains citations."
}

# 2) Pull full citation metadata from NCBI E-utilities.
$publications = New-Object System.Collections.Generic.List[object]
for ($i = 0; $i -lt $pmids.Count; $i += $BatchSize) {
  $take = [Math]::Min($BatchSize, $pmids.Count - $i)
  $idChunk = ($pmids[$i..($i + $take - 1)] -join ",")
  $efetchUrl = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=$idChunk&retmode=xml"
  $xmlText = (Invoke-WebRequest -Uri $efetchUrl -Headers $headers).Content
  [xml]$xml = $xmlText

  # E-utilities may return different XML roots (or error XML). Use XPath so shape changes
  # do not crash under StrictMode.
  $articleNodes = $xml.SelectNodes("//PubmedArticle")
  if (-not $articleNodes -or $articleNodes.Count -eq 0) {
    $errorNodes = $xml.SelectNodes("//ERROR")
    if ($errorNodes -and $errorNodes.Count -gt 0) {
      $messages = ($errorNodes | ForEach-Object { CleanWhitespace (HtmlDecode $_.InnerText) } | Where-Object { $_ }) -join " | "
      throw "NCBI efetch returned an error for batch starting at index ${i}: $messages"
    }
    throw "NCBI efetch returned no PubmedArticle nodes for batch starting at index $i."
  }

  foreach ($article in $articleNodes) {
    $pub = Convert-ArticleToPublication $article
    if ($pub.title) {
      $publications.Add($pub)
    }
  }
}

# 3) Sort by year desc, then title.
$sorted = $publications | Sort-Object @{Expression = { -1 * [int]($_.year) }}, @{Expression = { $_.title.ToLowerInvariant() }}

$json = $sorted | ConvertTo-Json -Depth 8
$content = @"
// Auto-generated by scripts/sync_ncbi_bibliography.ps1
// Source: NCBI My Bibliography + PubMed efetch. Manual edits will be overwritten.
window.publicationsData = $json;
"@

[System.IO.File]::WriteAllText($Output, $content, [System.Text.Encoding]::UTF8)
Write-Output "Wrote $($sorted.Count) publications to $Output"
