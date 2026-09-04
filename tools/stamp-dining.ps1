$hi = (Get-FileHash "js\hotel-images.js" -Algorithm SHA256).Hash.Substring(0,10).ToLowerInvariant()
Write-Output "hotel-images=$hi"
$dining = Get-Content "dining.html" -Raw
$dining = [regex]::Replace($dining, '/js/hotel-images\.js\?v=[a-f0-9]+', "/js/hotel-images.js?v=$hi")
Set-Content -Path "dining.html" -Value $dining -NoNewline
Write-Output "updated dining.html"
