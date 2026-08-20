# Cache busting / asset freshness

## Problem this solves

Browsers were keeping old HTML (and therefore old `?v=` asset URLs), so CSS/JS changes looked “stuck” until a hard refresh.

## Workflow (required before deploy)

```text
Edit css/silkwood.css or js/*.js
  → Run tools/stamp-assets.ps1
  → HTML gets new ?v=<hash> only for changed files
  → Deploy / push
  → Browser revalidates HTML
  → Downloads only assets whose hash changed
```

### Command

From the repo root (PowerShell):

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools\stamp-assets.ps1
```

Running it twice with no CSS/JS changes should report **unchanged** pages (idempotent).

### What gets stamped

Only these three shared assets, on these live pages:

| Asset | Pages |
|---|---|
| `/css/silkwood.css` | index, rooms, room-details, dining, facilities, about, contact, terms |
| `/js/site-chrome.js` | same |
| `/js/tailwind-theme.js` | same |

Not stamped: images, favicons, the logo video MP4, CDN scripts, `coming.html`, `reference_designs/`.

## Server configuration (which file applies where)

| Environment | Config that matters |
|---|---|
| **staging.silkwoodhotels.com (nginx)** | [`nginx-clean-urls.conf`](nginx-clean-urls.conf) — must be applied inside the nginx `server { }` block and reloaded. **`.htaccess` is ignored on staging.** |
| Apache / LiteSpeed | [`.htaccess`](.htaccess) — rewrite + `mod_headers` |

### Intended Cache-Control

| Response | Policy | Meaning |
|---|---|---|
| HTML (`/`, `/rooms`, `/about`, …) | `no-cache` | May store; **must revalidate** before reuse |
| `/css/*`, `/js/*` (with stamped `?v=`) | `public, max-age=31536000, immutable` | Long-lived; URL changes when content changes |
| `/images/*`, `/assets/*` | `public, max-age=31536000` | Long-lived; stable filenames |

Do **not** use site-wide `no-store`.

### Clean URLs

HTML revalidation must apply to clean paths (`/rooms`), not only `*.html`. The nginx snippet sets `Cache-Control: no-cache` on the catch-all `location /` that runs `try_files`, while `/css/`, `/js/`, `/images/`, `/assets/` use more specific prefixes for long cache.

Until the nginx snippet is applied on the server, stamp still fixes URL drift in HTML, but clean-URL HTML may keep heuristic caching.

## Verify after nginx apply

```bash
curl -sI https://staging.silkwoodhotels.com/
curl -sI https://staging.silkwoodhotels.com/rooms
curl -sI https://staging.silkwoodhotels.com/about
curl -sI "https://staging.silkwoodhotels.com/css/silkwood.css?v=<hash>"
curl -sI "https://staging.silkwoodhotels.com/js/site-chrome.js?v=<hash>"
```

Expect `Cache-Control: no-cache` on HTML clean URLs, and long-lived / immutable on CSS/JS.
