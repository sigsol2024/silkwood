$hi = (Get-FileHash "js\hotel-images.js" -Algorithm SHA256).Hash.Substring(0,10).ToLowerInvariant()
Write-Output "hotel-images=$hi"
$page = Get-Content "facilities.html" -Raw
$page = [regex]::Replace($page, '/js/hotel-images\.js\?v=[a-f0-9]+', "/js/hotel-images.js?v=$hi")
Set-Content -Path "facilities.html" -Value $page -NoNewline
Write-Output "updated facilities.html"
