$css = "e57e3eb2ef"
$sc = "f0f48b751d"
# Prefer live hashes from files
try { $css = (Get-FileHash "css\silkwood.css" -Algorithm SHA256).Hash.Substring(0,10).ToLowerInvariant() } catch {}
try { $sc = (Get-FileHash "js\site-chrome.js" -Algorithm SHA256).Hash.Substring(0,10).ToLowerInvariant() } catch {}
Write-Output "silkwood=$css"
Write-Output "site-chrome=$sc"

function Write-WithRetry($path, $content) {
  for ($i = 1; $i -le 8; $i++) {
    try {
      [System.IO.File]::WriteAllText($path, $content)
      return $true
    } catch {
      Start-Sleep -Milliseconds (120 * $i)
    }
  }
  return $false
}

Get-ChildItem -Filter "*.html" | Where-Object { $_.Name -ne "coming.html" } | ForEach-Object {
  $raw = [System.IO.File]::ReadAllText($_.FullName)
  $u = [regex]::Replace($raw, '/css/silkwood\.css\?v=[a-f0-9]+', "/css/silkwood.css?v=$css")
  $u = [regex]::Replace($u, '/js/site-chrome\.js\?v=[a-f0-9]+', "/js/site-chrome.js?v=$sc")
  if ($u -eq $raw) {
    Write-Output ("ok " + $_.Name)
    return
  }
  if (Write-WithRetry $_.FullName $u) {
    Write-Output ("stamped " + $_.Name)
  } else {
    Write-Output ("FAILED " + $_.Name)
  }
}
