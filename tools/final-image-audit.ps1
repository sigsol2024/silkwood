$ErrorActionPreference = "Continue"
$Root = "C:\Users\user pc\OneDrive\Documents\GitHub\silkwood"
$Hotel = Join-Path $Root "images\hotel"

Write-Output "=== 1. FOLDER INVENTORY ==="
Get-ChildItem -LiteralPath $Hotel -Directory | Sort-Object Name | ForEach-Object {
  $files = @(Get-ChildItem -LiteralPath $_.FullName -Recurse -File -Include *.jpg,*.jpeg,*.png,*.webp -ErrorAction SilentlyContinue)
  Write-Output ("{0}={1}" -f $_.Name, $files.Count)
}
$rooms = Join-Path $Hotel "rooms"
Get-ChildItem -LiteralPath $rooms -Directory -ErrorAction SilentlyContinue | Sort-Object Name | ForEach-Object {
  $c = @(Get-ChildItem -LiteralPath $_.FullName -File -ErrorAction SilentlyContinue).Count
  Write-Output ("rooms/{0}={1}" -f $_.Name, $c)
}

Write-Output "`n=== 2. EXTRACT ALL IMAGE URLS FROM LIVE CODE ==="
$scan = @(
  "index.html","rooms.html","room-details.html","dining.html","facilities.html",
  "about.html","contact.html","terms.html","conference.html","gallery.html","coming.html",
  "js\hotel-images.js","js\site-chrome.js"
)

# Match absolute site image paths and common broken patterns
$rx = [regex]'((?:src|href|content|url)\s*[=:(]\s*["'']?)(/images/[^"''\s)?]+)|(["''])(/images/[^"'']+)(["''])|(url\(["'']?)(/images/[^"'')]+)|(["''])(https://lh3\.googleusercontent\.com[^"'']+)(["''])'

$all = New-Object System.Collections.Generic.List[object]
foreach ($rel in $scan) {
  $path = Join-Path $Root $rel
  if (-not (Test-Path -LiteralPath $path)) {
    Write-Output ("MISSING_SOURCE {0}" -f $rel)
    continue
  }
  $text = [IO.File]::ReadAllText($path)
  # simpler extraction
  $matches = [regex]::Matches($text, '/images/[A-Za-z0-9_./%-]+\.(?:jpg|jpeg|png|webp|gif)|https://lh3\.googleusercontent\.com[^"''\s<>]+')
  foreach ($m in $matches) {
    $all.Add([pscustomobject]@{ File = $rel; Url = $m.Value })
  }
}

# Also extract hotel-images.js path() constructions: path("folder","file")
$hi = Join-Path $Root "js\hotel-images.js"
$hiText = [IO.File]::ReadAllText($hi)
$pathCalls = [regex]::Matches($hiText, 'path\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*\)')
foreach ($m in $pathCalls) {
  $url = "/images/hotel/" + $m.Groups[1].Value + "/" + $m.Groups[2].Value
  $all.Add([pscustomobject]@{ File = "js\hotel-images.js(path)"; Url = $url })
}
# imgs("folder",[...])
$imgsBlocks = [regex]::Matches($hiText, 'imgs\(\s*"([^"]+)"\s*,\s*\[([^\]]+)\]', [System.Text.RegularExpressions.RegexOptions]::Singleline)
foreach ($m in $imgsBlocks) {
  $folder = $m.Groups[1].Value
  $files = [regex]::Matches($m.Groups[2].Value, '"([^"]+\.(?:jpg|jpeg|png|webp))"')
  foreach ($f in $files) {
    $url = "/images/hotel/" + $folder + "/" + $f.Groups[1].Value
    $all.Add([pscustomobject]@{ File = "js\hotel-images.js(imgs)"; Url = $url })
  }
}

Write-Output ("Total raw refs={0}" -f $all.Count)

Write-Output "`n=== 3. VALIDATE EACH UNIQUE /images PATH ==="
$missing = New-Object System.Collections.Generic.List[object]
$ok = 0
$external = 0
$byUrl = $all | Group-Object Url
foreach ($g in ($byUrl | Sort-Object Name)) {
  $url = $g.Name
  $used = ($g.Group | Select-Object -ExpandProperty File -Unique) -join ", "
  if ($url -like "https://*") {
    $external++
    Write-Output ("[EXT] {0}  << {1}" -f $url.Substring(0, [Math]::Min(90, $url.Length)), $used)
    continue
  }
  $rel = $url.TrimStart("/").Replace("/", [IO.Path]::DirectorySeparatorChar)
  # decode %20 if any
  $rel = [Uri]::UnescapeDataString($rel)
  $full = Join-Path $Root $rel
  if (Test-Path -LiteralPath $full) {
    $ok++
  } else {
    $missing.Add([pscustomobject]@{ Url = $url; UsedBy = $used })
    Write-Output ("[MISSING] {0}  << {1}" -f $url, $used)
  }
}

Write-Output "`n=== 4. OLD/FORBIDDEN PATTERNS ON LIVE PAGES ==="
$badPatterns = @(
  '/images/hero\.jpg',
  '/images/hotel/hotel-\d+',
  '/images/hotel/(classic|deluxe|premium|executive|diplomatic)-room',
  '/images/hotel/meeting-room',
  '/images/hotel/restaurant(?:-\d)?\.jpg',
  '/images/hotel/stay\.jpg',
  '/images/hotel/exterior\.jpg',
  '/images/hotel/about-hero\.jpg',
  'POOL%20BAR',
  'CONFRENCE',
  'RECEPTION_',
  'MAIN%20HALL',
  'MEETING%20SPACE'
)
$liveHtmlJs = Get-ChildItem $Root -File -Include *.html,*.js | Where-Object { $_.FullName -notmatch 'reference_designs|node_modules|image_backup|_extract' }
foreach ($pat in $badPatterns) {
  $hits = Select-String -Path ($liveHtmlJs | Where-Object { $_.DirectoryName -eq $Root -or $_.Directory.Name -eq 'js' } | Select-Object -ExpandProperty FullName) -Pattern $pat -ErrorAction SilentlyContinue
  if ($hits) {
    foreach ($h in $hits) {
      Write-Output ("[BAD] {0}:{1} :: {2}" -f $h.Filename, $h.LineNumber, $h.Line.Trim().Substring(0, [Math]::Min(140, $h.Line.Trim().Length)))
    }
  }
}

Write-Output "`n=== 5. SUMMARY ==="
Write-Output ("OK_paths={0}" -f $ok)
Write-Output ("MISSING_paths={0}" -f $missing.Count)
Write-Output ("EXTERNAL={0}" -f $external)
if ($missing.Count -eq 0) { Write-Output "RESULT=PASS" } else { Write-Output "RESULT=FAIL" }
