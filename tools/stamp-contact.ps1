$hi = (Get-FileHash "js\hotel-images.js" -Algorithm SHA256).Hash.Substring(0,10).ToLowerInvariant()
$sc = (Get-FileHash "js\site-chrome.js" -Algorithm SHA256).Hash.Substring(0,10).ToLowerInvariant()
$raw = Get-Content "contact.html" -Raw
$u = [regex]::Replace($raw, '/js/hotel-images\.js\?v=[a-f0-9]+', "/js/hotel-images.js?v=$hi")
$u = [regex]::Replace($u, '/js/site-chrome\.js\?v=[a-f0-9]+', "/js/site-chrome.js?v=$sc")
Set-Content -Path "contact.html" -Value $u -NoNewline
Write-Output "hotel-images=$hi"
Write-Output "site-chrome=$sc"
