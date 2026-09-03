$ErrorActionPreference = "Continue"
$Root = "C:\Users\user pc\OneDrive\Documents\GitHub\silkwood"
$hi = [IO.File]::ReadAllText((Join-Path $Root "js\hotel-images.js"))

$missing = New-Object System.Collections.Generic.List[string]
$checked = 0

[regex]::Matches($hi, 'path\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*\)') | ForEach-Object {
  $folder = $_.Groups[1].Value
  $file = $_.Groups[2].Value
  $full = Join-Path $Root ("images\hotel\" + ($folder -replace "/", "\") + "\" + $file)
  $script:checked++
  if (-not (Test-Path -LiteralPath $full)) {
    $missing.Add("path: $folder/$file")
  }
}

[regex]::Matches($hi, 'imgs\(\s*"([^"]+)"\s*,\s*\[([^\]]+)\]', [System.Text.RegularExpressions.RegexOptions]::Singleline) | ForEach-Object {
  $folder = $_.Groups[1].Value
  [regex]::Matches($_.Groups[2].Value, '"([^"]+\.(?:jpg|jpeg|png|webp))"') | ForEach-Object {
    $file = $_.Groups[1].Value
    $full = Join-Path $Root ("images\hotel\" + ($folder -replace "/", "\") + "\" + $file)
    $script:checked++
    if (-not (Test-Path -LiteralPath $full)) {
      $missing.Add("imgs: $folder/$file")
    }
  }
}

Write-Output "=== CURATED MAP FILE CHECK ==="
Write-Output ("Checked={0} Missing={1}" -f $checked, $missing.Count)
$missing | ForEach-Object { Write-Output ("MISS {0}" -f $_) }
if ($missing.Count -eq 0) { Write-Output "CURATED=PASS" } else { Write-Output "CURATED=FAIL" }

Write-Output "`n=== LIVE HTML/JS/CSS BAD PATTERNS ==="
$files = @()
$files += Get-ChildItem $Root -Filter "*.html" -File
$files += Get-ChildItem (Join-Path $Root "js") -Filter "*.js" -File
if (Test-Path (Join-Path $Root "css")) {
  $files += Get-ChildItem (Join-Path $Root "css") -Filter "*.css" -File
}
# also root styles.css if present
if (Test-Path (Join-Path $Root "styles.css")) {
  $files += Get-Item (Join-Path $Root "styles.css")
}

$patterns = @(
  '/images/hero\.jpg',
  'images/hero\.jpg',
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
  'MEETING%20SPACE',
  'image_backup',
  'silkwood-copy',
  'silkwood-2b'
)

$badHits = 0
foreach ($p in $patterns) {
  $hits = @(Select-String -Path $files.FullName -Pattern $p -ErrorAction SilentlyContinue)
  if ($hits.Count -gt 0) {
    foreach ($h in $hits) {
      $line = $h.Line.Trim()
      if ($line.Length -gt 120) { $line = $line.Substring(0, 120) }
      Write-Output ("BAD [{0}] {1}:{2} {3}" -f $p, $h.Filename, $h.LineNumber, $line)
      $badHits++
    }
  }
}
Write-Output ("BadHits={0}" -f $badHits)

Write-Output "`n=== /images REFS NOT UNDER hotel/ ==="
$nonHotel = @(Select-String -Path $files.FullName -Pattern '/images/[a-zA-Z0-9_./%-]+' -ErrorAction SilentlyContinue |
  Where-Object { $_.Line -notmatch '/images/hotel/' })
foreach ($h in $nonHotel) {
  # skip comments about paths
  if ($h.Line -match 'BASE\s*=|/images/hotel') { continue }
  $line = $h.Line.Trim()
  if ($line.Length -gt 140) { $line = $line.Substring(0, 140) }
  Write-Output ("{0}:{1} {2}" -f $h.Filename, $h.LineNumber, $line)
}
Write-Output ("NonHotelCount={0}" -f $nonHotel.Count)

Write-Output "`n=== WHICH PAGES LINK styles.css ==="
$styleHits = @(Select-String -Path (Get-ChildItem $Root -Filter "*.html" -File).FullName -Pattern 'styles\.css' -ErrorAction SilentlyContinue)
if ($styleHits.Count -eq 0) { Write-Output "styles.css NOT linked from any live HTML" }
else { $styleHits | ForEach-Object { Write-Output ("{0}:{1}" -f $_.Filename, $_.LineNumber) } }

Write-Output "`n=== HERO.JPG EXISTS? ==="
Write-Output ("images/hero.jpg exists={0}" -f (Test-Path -LiteralPath (Join-Path $Root "images\hero.jpg")))

Write-Output "`n=== FACILITIES MAIN HALL CHECK ==="
$fac = [IO.File]::ReadAllText((Join-Path $Root "facilities.html"))
if ($fac -match 'main-hall|mainHall|Main Hall') {
  Write-Output "WARN facilities mentions Main Hall"
} else {
  Write-Output "OK facilities has no Main Hall"
}

Write-Output "`n=== TERMS HOTEL PHOTO CHECK ==="
$terms = [IO.File]::ReadAllText((Join-Path $Root "terms.html"))
$termImgs = [regex]::Matches($terms, '/images/hotel/[^"''\s]+')
Write-Output ("terms hotel image refs={0}" -f $termImgs.Count)

Write-Output "`n=== PAGE MAPPING SNAPSHOT ==="
$map = @(
  @{ Page="index.html"; Expect=@("outdoor","rooms/classic","rooms/deluxe","rooms/premium","pool-bar","restaurant") },
  @{ Page="rooms.html"; Expect=@("rooms/classic","rooms/deluxe","rooms/premium","rooms/executive","rooms/diplomatic-suite") },
  @{ Page="room-details.html"; Expect=@("rooms/executive","restaurant","pool-bar") },
  @{ Page="dining.html"; Expect=@("restaurant","pool-bar") },
  @{ Page="facilities.html"; Expect=@("pool-bar","reception") },
  @{ Page="conference.html"; Expect=@("conference-hall","meeting-space") },
  @{ Page="gallery.html"; Expect=@("reception") },
  @{ Page="about.html"; Expect=@("outdoor","floors") },
  @{ Page="contact.html"; Expect=@("reception") },
  @{ Page="coming.html"; Expect=@("reception") }
)
foreach ($m in $map) {
  $text = [IO.File]::ReadAllText((Join-Path $Root $m.Page))
  $missExpect = @()
  foreach ($e in $m.Expect) {
    if ($text -notmatch [regex]::Escape("/images/hotel/$e/")) { $missExpect += $e }
  }
  if ($missExpect.Count -eq 0) {
    Write-Output ("OK {0}" -f $m.Page)
  } else {
    Write-Output ("MISS_EXPECT {0} :: {1}" -f $m.Page, ($missExpect -join ", "))
  }
}
