$css = (Get-FileHash "css\silkwood.css" -Algorithm SHA256).Hash.Substring(0,10).ToLowerInvariant()
$sc = (Get-FileHash "js\site-chrome.js" -Algorithm SHA256).Hash.Substring(0,10).ToLowerInvariant()
Write-Output "silkwood=$css"
Write-Output "site-chrome=$sc"
Get-ChildItem -Filter "*.html" | Where-Object { $_.Name -ne "coming.html" } | ForEach-Object {
  $raw = Get-Content $_.FullName -Raw
  $u = [regex]::Replace($raw, '/css/silkwood\.css\?v=[a-f0-9]+', "/css/silkwood.css?v=$css")
  $u = [regex]::Replace($u, '/js/site-chrome\.js\?v=[a-f0-9]+', "/js/site-chrome.js?v=$sc")
  if ($u -ne $raw) {
    Set-Content -Path $_.FullName -Value $u -NoNewline
    Write-Output ("stamped " + $_.Name)
  }
}
