$files = @{
  "js\hotel-images.js" = "hotel-images"
  "js\site-chrome.js" = "site-chrome"
  "css\silkwood.css" = "silkwood"
}
$hashes = @{}
foreach ($kv in $files.GetEnumerator()) {
  $h = (Get-FileHash $kv.Key -Algorithm SHA256).Hash.Substring(0,10).ToLowerInvariant()
  $hashes[$kv.Value] = $h
  Write-Output "$($kv.Value)=$h"
}
$page = Get-Content "room-details.html" -Raw
$page = [regex]::Replace($page, '/js/hotel-images\.js\?v=[a-f0-9]+', "/js/hotel-images.js?v=$($hashes['hotel-images'])")
$page = [regex]::Replace($page, '/js/site-chrome\.js\?v=[a-f0-9]+', "/js/site-chrome.js?v=$($hashes['site-chrome'])")
$page = [regex]::Replace($page, '/css/silkwood\.css\?v=[a-f0-9]+', "/css/silkwood.css?v=$($hashes['silkwood'])")
Set-Content -Path "room-details.html" -Value $page -NoNewline

# Home also loads site-chrome + silkwood; stamp those shared assets on live pages that reference them
Get-ChildItem -Filter "*.html" | Where-Object { $_.Name -notin @('coming.html') } | ForEach-Object {
  $raw = Get-Content $_.FullName -Raw
  $updated = $raw
  $updated = [regex]::Replace($updated, '/js/site-chrome\.js\?v=[a-f0-9]+', "/js/site-chrome.js?v=$($hashes['site-chrome'])")
  $updated = [regex]::Replace($updated, '/css/silkwood\.css\?v=[a-f0-9]+', "/css/silkwood.css?v=$($hashes['silkwood'])")
  if ($updated -ne $raw) {
    Set-Content -Path $_.FullName -Value $updated -NoNewline
    Write-Output "stamped $($_.Name)"
  }
}
Write-Output "done"
