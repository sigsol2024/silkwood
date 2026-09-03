$Root = "C:\Users\user pc\OneDrive\Documents\GitHub\silkwood"
$paths = @(
  "assets/brand/logo-on-light.png",
  "assets/brand/logo-on-dark.png",
  "assets/brand/favicon.png",
  "assets/brand/favicon.ico",
  "assets/brand/apple-touch-icon.png",
  "assets/Silkwood_Hotel_logo_animation_202608080934.mp4",
  "images/hotel/reception/silkwood-78.jpg"
)
Write-Output "=== ASSETS ==="
foreach ($p in $paths) {
  $ok = Test-Path -LiteralPath (Join-Path $Root $p)
  Write-Output ("{0} {1}" -f ($(if ($ok) { "OK" } else { "MISS" }), $p))
}
Write-Output "`n=== styles.css ==="
Select-String -Path (Join-Path $Root "styles.css") -Pattern "hero\.jpg|reception/silkwood-78" |
  ForEach-Object { Write-Output ("{0}:{1} {2}" -f $_.Filename, $_.LineNumber, $_.Line.Trim()) }

Write-Output "`n=== RE-AUDIT KEY LINES ==="
& (Join-Path $Root "tools\final-image-audit2.ps1") |
  Where-Object { $_ -match "CURATED=|BadHits=|NonHotel|terms|FACILITIES|PAGE MAPPING|^OK |MISS|Checked=|RESULT|EXTERNAL|OK_paths|MISSING" }
