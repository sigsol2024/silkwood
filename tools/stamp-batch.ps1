$hashes = @{}
@(
  @{ Path = "js\hotel-images.js"; Key = "hotel-images"; Pattern = '/js/hotel-images\.js\?v=[a-f0-9]+'; Prefix = "/js/hotel-images.js?v=" },
  @{ Path = "js\site-chrome.js"; Key = "site-chrome"; Pattern = '/js/site-chrome\.js\?v=[a-f0-9]+'; Prefix = "/js/site-chrome.js?v=" },
  @{ Path = "css\silkwood.css"; Key = "silkwood"; Pattern = '/css/silkwood\.css\?v=[a-f0-9]+'; Prefix = "/css/silkwood.css?v=" }
) | ForEach-Object {
  $h = (Get-FileHash $_.Path -Algorithm SHA256).Hash.Substring(0,10).ToLowerInvariant()
  $hashes[$_.Key] = @{ Hash = $h; Pattern = $_.Pattern; Prefix = $_.Prefix }
  Write-Output ("{0}={1}" -f $_.Key, $h)
}

Get-ChildItem -Filter "*.html" | Where-Object { $_.Name -ne "coming.html" } | ForEach-Object {
  $raw = Get-Content $_.FullName -Raw
  $updated = $raw
  foreach ($k in $hashes.Keys) {
    $info = $hashes[$k]
    $updated = [regex]::Replace($updated, $info.Pattern, ($info.Prefix + $info.Hash))
  }
  if ($updated -ne $raw) {
    Set-Content -Path $_.FullName -Value $updated -NoNewline
    Write-Output ("stamped " + $_.Name)
  }
}
Write-Output "done"
