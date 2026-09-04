$h = (Get-FileHash "js\site-chrome.js" -Algorithm SHA256).Hash.Substring(0,10).ToLowerInvariant()
Write-Output "site-chrome=$h"
Get-ChildItem -Filter "*.html" | Where-Object { $_.Name -ne "coming.html" } | ForEach-Object {
  $raw = Get-Content $_.FullName -Raw
  $u = [regex]::Replace($raw, '/js/site-chrome\.js\?v=[a-f0-9]+', "/js/site-chrome.js?v=$h")
  if ($u -ne $raw) {
    Set-Content -Path $_.FullName -Value $u -NoNewline
    Write-Output ("stamped " + $_.Name)
  }
}
