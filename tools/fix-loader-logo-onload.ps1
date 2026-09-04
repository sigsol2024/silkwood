$pages = Get-ChildItem -Filter "*.html" | Where-Object { $_.Name -ne "coming.html" }
foreach ($p in $pages) {
  $raw = Get-Content $p.FullName -Raw
  $u = $raw

  # Ensure logo has onload for instant fade-in (cached + network)
  $u = [regex]::Replace(
    $u,
    '<img class="silkwood-loader__logo" src="/assets/brand/logo-on-light\.png" alt="" width="160" height="54"(?: fetchpriority="high" decoding="async")?(?: onload="this\.classList\.add\(''is-ready''\)")?\s*/?>',
    '<img class="silkwood-loader__logo" src="/assets/brand/logo-on-light.png" alt="" width="160" height="54" fetchpriority="high" decoding="async" onload="this.classList.add(''is-ready'')" />'
  )

  # Inject early logo-ready script after loader if missing
  if ($u -notmatch 'silkwood-loader__logo"\)\.classList\.add\("is-ready"\)' -and $u -notmatch 'querySelector\("#silkwood-loader \.silkwood-loader__logo"\)') {
    $script = "<script>(function(){var img=document.querySelector('#silkwood-loader .silkwood-loader__logo');if(!img)return;function r(){img.classList.add('is-ready');}if(img.complete&&img.naturalWidth)r();else{img.addEventListener('load',r,{once:true});}})();</script>`n"
    $u = $u -replace '(</div>\r?\n)(<div id="site-header-root"></div>)', ('$1' + $script + '$2')
  }

  if ($u -ne $raw) {
    Set-Content -Path $p.FullName -Value $u -NoNewline
    Write-Output ("patched " + $p.Name)
  } else {
    Write-Output ("ok " + $p.Name)
  }
}
