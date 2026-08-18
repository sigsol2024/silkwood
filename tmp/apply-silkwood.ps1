$root = "C:\Users\user pc\OneDrive\Documents\GitHub\silkwood"

$pages = [ordered]@{
  "index.html" = "home"
  "rooms.html" = "rooms"
  "room-details.html" = "rooms"
  "dining.html" = "dining"
  "facilities.html" = "facilities"
  "about.html" = "about"
  "contact.html" = "contact"
  "terms.html" = "terms"
}

function Replace-TailwindConfig([string]$html) {
  return [regex]::Replace($html, '(?s)<script id="tailwind-config">.*?</script>', '<script src="js/tailwind-theme.js"></script>')
}

function Inject-HeadAssets([string]$html) {
  if ($html -match 'css/silkwood.css') { return $html }
  $inject = @'
<link rel="icon" href="assets/brand/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" href="assets/brand/favicon.png" />
<link rel="apple-touch-icon" href="assets/brand/apple-touch-icon.png" />
<link rel="stylesheet" href="css/silkwood.css" />
'@
  return $html.Replace('<script src="js/tailwind-theme.js"></script>', "<script src=`"js/tailwind-theme.js`"></script>`r`n$inject")
}

function Strip-SiteNav([string]$html, [string]$file) {
  switch ($file) {
    "index.html" { return [regex]::Replace($html, '(?s)<!-- Top Navigation -->\s*<header[\s\S]*?</header>\s*', '') }
    "rooms.html" { return [regex]::Replace($html, '(?s)<!-- Top Navigation -->\s*<header[\s\S]*?</header>\s*', '') }
    "dining.html" { return [regex]::Replace($html, '(?s)<!-- Top Navigation -->\s*<nav[\s\S]*?</nav>\s*', '') }
    "contact.html" { return [regex]::Replace($html, '(?s)<!-- TopNavBar -->\s*<nav[\s\S]*?</nav>\s*', '') }
    "about.html" { return [regex]::Replace($html, '(?s)<!-- TopNavBar -->\s*<nav[\s\S]*?</nav>\s*', '') }
    "facilities.html" { return [regex]::Replace($html, '(?s)<nav class="flex justify-between items-center[\s\S]*?id="navbar"[\s\S]*?</nav>\s*', '') }
    "room-details.html" { return [regex]::Replace($html, '(?s)<!-- TopNavBar -->\s*<header[\s\S]*?</header>\s*', '') }
    "terms.html" { return [regex]::Replace($html, '(?s)<!-- SUPPRESSED NAV:.*?-->\s*', '') }
  }
  return $html
}

function Strip-Footer([string]$html) {
  return [regex]::Replace($html, '(?s)<footer[\s\S]*?</footer>\s*', '')
}

function Inject-Chrome([string]$html, [string]$page) {
  if ($html -notmatch 'data-page=') {
    $html = [regex]::Replace($html, '<body([^>]*)>', "<body data-page=`"$page`"`$1>")
  }
  if ($html -notmatch 'site-header-root') {
    $html = [regex]::Replace($html, '(<body[^>]*>)', "`$1`r`n<div id=`"site-header-root`"></div>")
  }
  if ($html -notmatch '\sid="main"') {
    if ($html -match '<main[\s>]') {
      $html = [regex]::Replace($html, '<main', '<main id="main"', 1)
    }
  }
  if ($html -notmatch 'site-footer-root') {
    $html = $html.Replace('</body>', "<div id=`"site-footer-root`"></div>`r`n<script src=`"js/site-chrome.js`"></script>`r`n</body>")
  } elseif ($html -notmatch 'js/site-chrome.js') {
    $html = $html.Replace('</body>', "<script src=`"js/site-chrome.js`"></script>`r`n</body>")
  }
  return $html
}

function Brand-Copy([string]$html) {
  $pairs = @(
    @('The Hill Station Jos', 'Silkwood Hotel'),
    @('the Hill Station Jos', 'Silkwood Hotel'),
    @('Hill Station Jos', 'Silkwood Hotel'),
    @('The Hill Station', 'Silkwood Hotel'),
    @('the Hill Station', 'Silkwood Hotel'),
    @('Hill Station', 'Silkwood Hotel'),
    @('Discover the Jos Plateau', 'Discover Ikeja GRA'),
    @('Jos Plateau Landscape', 'Lagos city setting'),
    @('the Jos Plateau', 'Ikeja GRA, Lagos'),
    @('Jos Plateau', 'Lagos'),
    @('Shere Hills', 'Ikeja GRA'),
    @('Plateau State', 'Lagos'),
    @('Highland Fare', 'Lagos Fare'),
    @('Highland Sanctuary', 'City Sanctuary'),
    @('Highland Retreat', 'Garden Suite'),
    @('Highland Fitness', 'Fitness Studio'),
    @('Jos Highland Spa', 'Silkwood Spa'),
    @('The Plateau Vista Suite', 'The Executive Suite'),
    @('The Plateau Vista', 'The Executive Suite'),
    @('Plateau Vista', 'Executive Suite'),
    @('Heritage Executive Room', 'Executive Room'),
    @('Heritage Suite', 'Deluxe Suite'),
    @("The Miner's Quarters", 'The Courtyard Room'),
    @('The Jos Grand', 'The Premier Suite'),
    @('Original Wing', 'Main House'),
    @('A Sanctuary in the Highlands', 'A refined stay in Ikeja GRA'),
    @('A Sanctuary in the IKEJA GRA', 'A refined stay in Ikeja GRA'),
    @('A Sanctuary in the Ikeja GRA', 'A refined stay in Ikeja GRA'),
    @('the highlands', 'Ikeja GRA'),
    @('highland timber', 'warm timber'),
    @("Jos's natural character", 'a calm city setting'),
    @('of Jos', 'of Lagos'),
    @('in Jos', 'in Lagos'),
    @('10 Tudor Road,<br/>GRA, Jos, Lagos.', '51 Sobo Ariobiodu Street,<br/>GRA Ikeja, Lagos.'),
    @('+234 (0) 800 123 4567<br/>reservations@hillstation.com', '+234 813 751 9675<br/>reservations@silkwoodhotels.com'),
    @('reservations@hillstation.com', 'reservations@silkwoodhotels.com'),
    @('The Journey<br/>to the Plateau', 'Find Us<br/>in Ikeja GRA'),
    @('to the Plateau', 'in Ikeja GRA'),
    @('the Plateau', 'the city'),
    @('the plateau', 'the city'),
    @('rgba(6, 27, 14,', 'rgba(26, 12, 4,'),
    @('rgba(6,27,14,', 'rgba(26,12,4,'),
    @('#061b0e', '#1A0C04'),
    @('#061B0E', '#1A0C04'),
    @('#1b3022', '#1A0C04'),
    @('#1B3022', '#1A0C04'),
    @('#fbf9f4', '#FFF1DB'),
    @('from-primary/', 'from-ink/'),
    @('via-primary/', 'via-ink/'),
    @('to-primary/', 'to-ink/'),
    @('bg-primary-container', 'bg-ink'),
    @('hover:bg-primary-container', 'hover:bg-ink'),
    @('selection:bg-primary-container', 'selection:bg-peach-cream')
  )
  foreach ($p in $pairs) {
    $html = $html.Replace($p[0], $p[1])
  }
  return $html
}

foreach ($file in $pages.Keys) {
  $path = Join-Path $root $file
  $html = [IO.File]::ReadAllText($path)
  $html = Replace-TailwindConfig $html
  $html = Inject-HeadAssets $html
  $html = Strip-SiteNav $html $file
  $html = Strip-Footer $html
  $html = Inject-Chrome $html $pages[$file]
  $html = Brand-Copy $html
  [IO.File]::WriteAllText($path, $html)
  Write-Output ("processed " + $file + " len=" + $html.Length)
}
