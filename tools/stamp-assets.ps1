# Silkwood — content-hash stamp for shared CSS/JS
# Run from repo root or any cwd: powershell -File tools/stamp-assets.ps1
# Same file contents always produce the same hash. Unchanged pages are not rewritten.

$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
if (-not (Test-Path (Join-Path $Root "index.html"))) {
  Write-Error "Could not find index.html at repo root: $Root"
}

function Get-ShortHash([string]$RelativePath) {
  $full = Join-Path $Root $RelativePath
  if (-not (Test-Path $full)) {
    Write-Error "Missing asset: $RelativePath"
  }
  $sha = Get-FileHash -Path $full -Algorithm SHA256
  return $sha.Hash.Substring(0, 10).ToLowerInvariant()
}

$Assets = @(
  @{ Path = "css/silkwood.css"; Url = "/css/silkwood.css" },
  @{ Path = "js/site-chrome.js"; Url = "/js/site-chrome.js" },
  @{ Path = "js/tailwind-theme.js"; Url = "/js/tailwind-theme.js" },
  @{ Path = "js/hotel-images.js"; Url = "/js/hotel-images.js" }
)

$Pages = @(
  "index.html",
  "rooms.html",
  "room-details.html",
  "dining.html",
  "facilities.html",
  "about.html",
  "contact.html",
  "terms.html",
  "conference.html",
  "gallery.html"
)

$Hashes = @{}
foreach ($asset in $Assets) {
  $Hashes[$asset.Url] = Get-ShortHash $asset.Path
  Write-Host ("{0} -> v={1}" -f $asset.Url, $Hashes[$asset.Url])
}

$changedPages = 0
foreach ($page in $Pages) {
  $pagePath = Join-Path $Root $page
  if (-not (Test-Path $pagePath)) {
    Write-Warning "Skip missing page: $page"
    continue
  }

  $original = [IO.File]::ReadAllText($pagePath)
  $updated = $original

  foreach ($asset in $Assets) {
    $url = [regex]::Escape($asset.Url)
    $hash = $Hashes[$asset.Url]
    # Match /path/file.ext or /path/file.ext?v=anything (no nested ?v=)
    $pattern = "(?<![A-Za-z0-9._-])$url(?:\?v=[^`"'\s>]*)?"
    $replacement = "$($asset.Url)?v=$hash"
    $updated = [regex]::Replace($updated, $pattern, $replacement)
  }

  if ($updated -ne $original) {
    [IO.File]::WriteAllText($pagePath, $updated)
    $changedPages += 1
    Write-Host "updated $page"
  } else {
    Write-Host "unchanged $page"
  }
}

Write-Host ""
Write-Host ("Done. Pages rewritten: {0} / {1}" -f $changedPages, $Pages.Count)
if ($changedPages -eq 0) {
  Write-Host "Idempotent: no HTML changes needed."
}
