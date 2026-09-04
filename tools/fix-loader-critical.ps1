$critical = @'
<style id="silkwood-loader-critical">
html{background:#fff1db}
body.silkwood-loading{overflow:hidden!important}
body.silkwood-loading>*:not(#silkwood-loader){visibility:hidden!important}
#silkwood-loader{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;pointer-events:auto;background:rgba(255,241,219,.96)}
#silkwood-loader .silkwood-loader__veil{position:absolute;inset:0;background:rgba(255,241,219,.94)}
#silkwood-loader .silkwood-loader__content{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:1.35rem;padding:1rem}
#silkwood-loader .silkwood-loader__logo{display:block;height:28px;width:auto;max-width:160px;opacity:0;object-fit:contain;transition:opacity .25s ease}
#silkwood-loader .silkwood-loader__logo.is-ready{opacity:.82}
#silkwood-loader .silkwood-loader__stage{position:relative;width:88px;height:88px}
#silkwood-loader .silkwood-loader__ring{position:absolute;inset:10px;border-radius:50%;border:1px solid rgba(26,12,4,.1);pointer-events:none}
#silkwood-loader .silkwood-loader__ring::after{content:"";position:absolute;inset:-3px;border-radius:50%;border:2px solid transparent;border-top-color:rgba(153,78,20,.85);border-right-color:rgba(153,78,20,.35);animation:silkwood-loader-spin 1s linear infinite}
#silkwood-loader.has-canvas-anim .silkwood-loader__ring::after{opacity:0;animation:none}
#silkwood-loader .silkwood-loader__canvas{display:block;width:88px;height:88px}
@keyframes silkwood-loader-spin{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){#silkwood-loader .silkwood-loader__ring::after{animation:none;border-top-color:rgba(153,78,20,.7);border-right-color:transparent}}
</style>
<link rel="preload" as="image" href="/assets/brand/logo-on-light.png" fetchpriority="high" />
'@

$logoImgPattern = '(<img class="silkwood-loader__logo"[^>]*src="/assets/brand/logo-on-light\.png"[^>]*)(/?>)'
$logoReadyScript = @'
<script>
(function(){var img=document.querySelector("#silkwood-loader .silkwood-loader__logo");if(!img)return;function ready(){img.classList.add("is-ready");}if(img.complete&&img.naturalWidth)ready();else{img.addEventListener("load",ready,{once:true});img.addEventListener("error",function(){img.style.visibility="hidden";},{once:true});}})();
</script>
'@

Get-ChildItem -Filter "*.html" | Where-Object { $_.Name -ne "coming.html" } | ForEach-Object {
  $raw = Get-Content $_.FullName -Raw
  if ($raw -notmatch 'id="silkwood-loader-critical"') {
    Write-Output ("skip " + $_.Name)
    return
  }

  $updated = [regex]::Replace(
    $raw,
    '(?s)<style id="silkwood-loader-critical">.*?</style>(?:\r?\n<link rel="preload" as="image" href="/assets/brand/logo-on-light\.png"[^>]*>)?',
    $critical.TrimEnd() + "`n"
  )

  # Upgrade logo img attrs
  $updated = [regex]::Replace(
    $updated,
    '<img class="silkwood-loader__logo" src="/assets/brand/logo-on-light\.png" alt="" width="160" height="54"\s*/?>',
    '<img class="silkwood-loader__logo" src="/assets/brand/logo-on-light.png" alt="" width="160" height="54" fetchpriority="high" decoding="async" />'
  )

  # Inject ready script once after loader block if missing
  if ($updated -notmatch 'silkwood-loader__logo"\)\.classList\.add\("is-ready"\)' -and $updated -notmatch 'querySelector\("#silkwood-loader \.silkwood-loader__logo"\)') {
    $updated = [regex]::Replace(
      $updated,
      '(id="silkwood-loader"[\s\S]*?</div>\s*</div>\s*</div>\s*</div>)',
      ('$1' + "`n" + $logoReadyScript.Trim()),
      1
    )
  }

  if ($updated -ne $raw) {
    Set-Content -Path $_.FullName -Value $updated -NoNewline
    Write-Output ("updated " + $_.Name)
  } else {
    Write-Output ("unchanged " + $_.Name)
  }
}

# Stamp css + site-chrome
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
