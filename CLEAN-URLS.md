# Clean URLs — server setup

Staging (`staging.silkwoodhotels.com`) runs **nginx**. Confirmed: `/.htaccess` returns 403 and is ignored; `/rooms` currently 404s until these rules are applied.

## Required on staging (nginx)

1. Open the nginx site config for `staging.silkwoodhotels.com` (hosting panel → Nginx config, or SSH/`sites-available`).
2. Inside the `server { ... }` block, paste the rules from `nginx-clean-urls.conf`
   (or `include` that file if your layout supports it).
3. Test and reload:
   ```bash
   sudo nginx -t && sudo systemctl reload nginx
   ```
4. Verify:
   - `https://staging.silkwoodhotels.com/rooms` → **200**
   - `https://staging.silkwoodhotels.com/rooms.html` → **301** to `/rooms`
   - `https://staging.silkwoodhotels.com/index.html` → **301** to `/`
   - Refresh on `/rooms` still works (no 404)
   - CSS/JS/images load from `/css/…`, `/js/…`, `/images/…`

Without step 2–3, clean links in the HTML will **404** even after you deploy the updated site files.

If you do not have SSH access, ask your host to add the contents of `nginx-clean-urls.conf` to the staging (and later production) vhost.

## Apache / LiteSpeed hosts

Deploy the root `.htaccess` file; it handles the same redirects and rewrites.

## Repo changes (already done)

- All live page links use clean paths (`/rooms`, `/conference`, `/gallery`, `/contact`, …; home is `/`).
- Expected public URLs include `/conference` and `/gallery` (plus existing `/`, `/rooms`, `/room-details`, `/dining`, `/facilities`, `/about`, `/contact`, `/terms`, `/coming`).
- Shared header/footer/nav in `js/site-chrome.js` updated the same way.
- Asset URLs are root-absolute (`/css/…`, `/js/…`, `/images/…`, `/assets/…`) so they work on clean paths.
- Each page has a `rel="canonical"` pointing at the clean `https://silkwoodhotels.com/…` URL.
- HTML filenames were **not** renamed (`rooms.html` still exists on disk).
