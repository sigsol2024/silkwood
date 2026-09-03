$ErrorActionPreference = "Continue"
$Root = Split-Path -Parent $PSScriptRoot
$Hotel = Join-Path $Root "images\hotel"

Write-Output "=== FOLDER COUNTS ==="
Get-ChildItem -LiteralPath $Hotel -Directory | ForEach-Object {
  $c = @(Get-ChildItem -LiteralPath $_.FullName -Recurse -File -Include *.jpg,*.jpeg,*.png -ErrorAction SilentlyContinue).Count
  Write-Output ("{0}={1}" -f $_.Name, $c)
}
$roomsRoot = Join-Path $Hotel "rooms"
if (Test-Path $roomsRoot) {
  Get-ChildItem -LiteralPath $roomsRoot -Directory | ForEach-Object {
    $c = @(Get-ChildItem -LiteralPath $_.FullName -File -ErrorAction SilentlyContinue).Count
    Write-Output ("rooms/{0}={1}" -f $_.Name, $c)
  }
}

Write-Output "`n=== LIVE PAGE IMAGE REFS (hotel + hero + lh3) ==="
$pages = @(
  "index.html","rooms.html","room-details.html","dining.html","facilities.html",
  "about.html","contact.html","terms.html","conference.html","gallery.html","coming.html",
  "js\hotel-images.js","js\site-chrome.js"
)
$rx = [regex]'(/images/hotel/[^"''\s)?]+|/images/hero\.jpg|https://lh3\.googleusercontent\.com[^"''\s]+)'
$missing = @()
$refs = @{}
foreach ($p in $pages) {
  $path = Join-Path $Root $p
  if (-not (Test-Path $path)) { Write-Output "MISSING FILE $p"; continue }
  $text = [IO.File]::ReadAllText($path)
  foreach ($m in $rx.Matches($text)) {
    $url = $m.Value
    if (-not $refs.ContainsKey($url)) { $refs[$url] = New-Object System.Collections.Generic.List[string] }
    $refs[$url].Add($p)
  }
}

foreach ($url in ($refs.Keys | Sort-Object)) {
  $ok = "EXT"
  if ($url -like "/images/*") {
    $rel = $url.TrimStart("/").Replace("/", [IO.Path]::DirectorySeparatorChar)
    $full = Join-Path $Root $rel
    if (Test-Path -LiteralPath $full) { $ok = "OK" } else { $ok = "MISSING"; $missing += $url }
  }
  $used = ($refs[$url] | Select-Object -Unique) -join ","
  Write-Output ("[{0}] {1}  << {2}" -f $ok, $url, $used)
}

Write-Output "`n=== MISSING COUNT ==="
Write-Output $missing.Count
$missing | ForEach-Object { Write-Output $_ }
