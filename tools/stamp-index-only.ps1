$css = (Get-FileHash "css\silkwood.css" -Algorithm SHA256).Hash.Substring(0,10).ToLowerInvariant()
$js = (Get-FileHash "js\site-chrome.js" -Algorithm SHA256).Hash.Substring(0,10).ToLowerInvariant()
Write-Output "css=$css"
Write-Output "js=$js"

$index = Get-Content "index.html" -Raw
$index = [regex]::Replace($index, '/css/silkwood\.css\?v=[a-f0-9]+', "/css/silkwood.css?v=$css")
$index = [regex]::Replace($index, '/js/site-chrome\.js\?v=[a-f0-9]+', "/js/site-chrome.js?v=$js")
Set-Content -Path "index.html" -Value $index -NoNewline
Write-Output "updated index.html"
