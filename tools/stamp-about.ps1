$h = (Get-FileHash "js\hotel-images.js" -Algorithm SHA256).Hash.Substring(0,10).ToLowerInvariant()
Write-Output "hotel-images=$h"
$raw = Get-Content "about.html" -Raw
$u = [regex]::Replace($raw, '/js/hotel-images\.js\?v=[a-f0-9]+', "/js/hotel-images.js?v=$h")
Set-Content -Path "about.html" -Value $u -NoNewline
Write-Output "stamped about.html"
