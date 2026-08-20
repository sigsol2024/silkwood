(function () {
  const ADDRESS = "51 Sobo Ariobiodu Street, GRA Ikeja, Lagos, Nigeria";
  const MAPS_URL =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(ADDRESS);
  const BOOK_HREF = "/rooms";

  const NAV = [
    { id: "rooms", label: "Rooms & Suites", href: "/rooms" },
    { id: "dining", label: "Dining", href: "/dining" },
    { id: "facilities", label: "Facilities", href: "/facilities" },
    { id: "about", label: "About", href: "/about" },
    { id: "contact", label: "Contact", href: "/contact" }
  ];

  function navLinkClass(page, item, overHero) {
    const base =
      "font-label-caps text-sm uppercase tracking-widest transition-colors duration-300 nav-link";
    if (overHero) {
      return page === item.id
        ? `${base} text-white`
        : `${base} text-white/90 hover:text-white`;
    }
    return page === item.id
      ? `${base} text-warm-copper`
      : `${base} text-on-surface hover:text-warm-copper`;
  }

  function navLinks(page, overHero) {
    return NAV.map((item) => {
      const current = page === item.id ? ' aria-current="page"' : "";
      return `<a class="${navLinkClass(page, item, overHero)}" href="${item.href}"${current}>${item.label}</a>`;
    }).join("\n");
  }

  function logoPair(extraClass) {
    return `
<a class="silkwood-logo silkwood-logo--header shrink-0 hover:opacity-80 transition-opacity ${extraClass || ""}" href="/" aria-label="Silkwood Hotel home">
  <img class="logo-on-dark" src="/assets/brand/logo-on-dark.png" alt="Silkwood Hotel" width="200" height="68" />
  <img class="logo-on-light" src="/assets/brand/logo-on-light.png" alt="Silkwood Hotel" width="200" height="68" />
</a>`;
  }

  function renderHeader(page) {
    const overHero = page !== "terms";
    const menuColor = overHero ? "text-white" : "text-ink";
    return `
<a class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-vanilla-cream focus:text-ink focus:px-3 focus:py-2" href="#main">Skip to content</a>
<header class="flex justify-between items-center w-full px-margin-mobile lg:px-margin-desktop py-4 max-w-container-max mx-auto z-50 fixed top-0 left-0 right-0 bg-transparent transition-all duration-500 ${overHero ? "" : "nav-scrolled"}" id="site-header" aria-label="Primary">
  ${logoPair("")}
  <nav class="hidden lg:flex items-center gap-8">
    ${navLinks(page, overHero)}
  </nav>
  <a class="hidden lg:inline-flex btn-interact bg-warm-copper text-white px-8 py-3 font-label-caps uppercase tracking-widest" href="${BOOK_HREF}">Book Now</a>
  <button class="lg:hidden inline-flex items-center justify-center ${menuColor} p-1 -mr-1" type="button" aria-label="Open menu" data-menu-open>
    <span class="material-symbols-outlined text-[1.875rem] leading-none" aria-hidden="true">menu</span>
  </button>
</header>
<div class="silkwood-mobile-nav" id="mobile-nav" hidden>
  <div class="silkwood-mobile-nav__top">
    <a class="silkwood-logo" href="/" aria-label="Silkwood Hotel home">
      <img src="/assets/brand/logo-on-light.png" alt="Silkwood Hotel" width="180" height="61" />
    </a>
    <button class="inline-flex items-center justify-center text-ink p-1 -mr-1" type="button" aria-label="Close menu" data-menu-close>
      <span class="material-symbols-outlined text-[1.875rem] leading-none" aria-hidden="true">close</span>
    </button>
  </div>
  <div class="silkwood-mobile-nav__body">
    <nav aria-label="Mobile navigation">
      ${NAV.map((item) => {
        const current = page === item.id ? ' aria-current="page"' : "";
        return `<a href="${item.href}"${current}>${item.label}</a>`;
      }).join("")}
    </nav>
    <div class="silkwood-mobile-nav__divider" aria-hidden="true"></div>
    <div class="silkwood-mobile-nav__aside">
      <div class="silkwood-mobile-nav__media">
        <img src="/images/hero.jpg" alt="" />
      </div>
      <a class="silkwood-mobile-nav__cta btn-interact inline-flex items-center justify-center px-5 py-3.5 bg-warm-copper text-white font-label-caps uppercase tracking-widest" href="${BOOK_HREF}">Book Now</a>
    </div>
  </div>
</div>`;
  }

  function renderFooter() {
    return `
<footer class="bg-ink text-white py-16">
  <div class="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-12">
    <div class="md:col-span-1">
      <a class="silkwood-logo silkwood-logo--footer inline-block mb-6 hover:opacity-90" href="/" aria-label="Silkwood Hotel home">
        <img src="/assets/brand/logo-on-dark.png" alt="Silkwood Hotel" width="200" height="68" />
      </a>
      <p class="font-body-md text-gray-400 text-sm">
        A four-star stay in Ikeja GRA, Lagos. Warm hospitality, thoughtful rooms, and everything you need for business or leisure.
      </p>
    </div>
    <div>
      <h4 class="font-label-caps text-golden-ochre mb-6 tracking-widest">Explore</h4>
      <ul class="space-y-3 font-body-md text-sm text-gray-300">
        <li><a class="hover:text-white transition-colors" href="/rooms">Rooms &amp; Suites</a></li>
        <li><a class="hover:text-white transition-colors" href="/dining">Dining</a></li>
        <li><a class="hover:text-white transition-colors" href="/facilities">Facilities</a></li>
      </ul>
    </div>
    <div>
      <h4 class="font-label-caps text-golden-ochre mb-6 tracking-widest">Information</h4>
      <ul class="space-y-3 font-body-md text-sm text-gray-300">
        <li><a class="hover:text-white transition-colors" href="/contact">Contact</a></li>
        <li><a class="hover:text-white transition-colors" href="${MAPS_URL}" target="_blank" rel="noopener noreferrer">Location</a></li>
        <li><a class="hover:text-white transition-colors" href="/terms">Terms</a></li>
      </ul>
    </div>
    <div>
      <h4 class="font-label-caps text-golden-ochre mb-6 tracking-widest">Newsletter</h4>
      <p class="font-body-md text-gray-400 text-sm mb-4">Subscribe for exclusive offers and updates.</p>
      <form class="flex" action="mailto:reservations@silkwoodhotels.com" method="post" enctype="text/plain">
        <input class="bg-transparent border-b border-gray-500 focus:border-white outline-none py-2 text-sm w-full text-white min-w-0" placeholder="Email address" type="email" name="email" required />
        <button class="border-b border-gray-500 py-2 px-2 hover:text-golden-ochre transition-colors" type="submit" aria-label="Subscribe">
          <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </form>
    </div>
  </div>
  <div class="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop mt-16 pt-8 border-t border-white/10 text-center text-xs text-gray-500 font-body-md space-y-2">
    <p>© ${new Date().getFullYear()} Silkwood Hotel. All rights reserved.</p>
    <p>
      Designed by |
      <a class="hover:text-gray-300 transition-colors" href="https://signature-solutions.com/" target="_blank" rel="noopener noreferrer">Signature Solutions</a>
    </p>
  </div>
</footer>`;
  }

  const LOADER_LOG_KEY = "silkwood-loader-log";
  const loaderLog = [];
  let heroStarted = false;

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function startHeroEntrance() {
    if (heroStarted) return;
    heroStarted = true;
    document.body.classList.add("silkwood-hero-ready");
    document.querySelectorAll(".hero-enter").forEach((el) => {
      el.classList.add("is-ready");
      el.querySelectorAll(
        ".reveal, .reveal-up, .reveal-left, .reveal-right, .blur-reveal, .image-reveal, .scroll-reveal, .fade-in-up, .fade-up, .reveal-on-scroll"
      ).forEach((child) => {
        child.classList.add("is-inview", "visible");
      });
    });
  }

  const LOGO_INTRO_NEAR_END_SEC = 0.7;
  const LOGO_INTRO_READY_MS = 8000;
  const LOGO_INTRO_HARD_MS = 14000;
  const LOGO_INTRO_EXIT_MS = 900;
  let logoIntroState = null;

  function isWideViewport() {
    return window.matchMedia("(min-width: 1024px)").matches;
  }

  function isLogoIntroEligible() {
    if (document.body.getAttribute("data-page") !== "home") return false;
    if (!document.getElementById("silkwood-logo-intro")) return false;
    if (prefersReducedMotion()) return false;
    return isWideViewport();
  }

  function prepareLogoVideo(video) {
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.preload = "auto";

    const source = video.querySelector("source");
    const src =
      (source && source.getAttribute("src")) ||
      video.getAttribute("src") ||
      "";
    if (src && video.getAttribute("src") !== src) {
      video.setAttribute("src", src);
    }
  }

  function initLogoIntroPrefetch() {
    if (!isLogoIntroEligible()) return;
    const video = document.querySelector("#silkwood-logo-intro video");
    if (!video) return;
    prepareLogoVideo(video);
    try {
      video.load();
    } catch (e) {
      /* ignore */
    }
    logLoader("logo-intro-prefetch");
  }

  function onLoaderComplete(reason) {
    logLoader("loader-complete-handoff", { reason: reason || null });
    if (isLogoIntroEligible()) {
      startLogoIntro(reason);
    } else {
      startHeroEntrance();
    }
  }

  function cleanupLogoIntro() {
    if (!logoIntroState || logoIntroState.cleaned) return;
    logoIntroState.cleaned = true;

    logoIntroState.timers.forEach((id) => window.clearTimeout(id));
    logoIntroState.timers = [];

    logoIntroState.listeners.forEach(({ target, type, fn, opts }) => {
      try {
        target.removeEventListener(type, fn, opts);
      } catch (e) {
        /* ignore */
      }
    });
    logoIntroState.listeners = [];

    if (logoIntroState.mq && logoIntroState.onMqChange) {
      try {
        if (logoIntroState.mq.removeEventListener) {
          logoIntroState.mq.removeEventListener(
            "change",
            logoIntroState.onMqChange
          );
        } else if (logoIntroState.mq.removeListener) {
          logoIntroState.mq.removeListener(logoIntroState.onMqChange);
        }
      } catch (e) {
        /* ignore */
      }
    }

    const video = logoIntroState.video;
    if (video) {
      try {
        video.pause();
        video.removeAttribute("src");
        const source = video.querySelector("source");
        if (source) source.removeAttribute("src");
        video.load();
      } catch (e) {
        /* ignore */
      }
    }

    const overlay = logoIntroState.overlay;
    if (overlay) {
      overlay.classList.remove("is-active", "is-transitioning", "is-exiting");
      overlay.classList.add("is-done");
      overlay.setAttribute("aria-hidden", "true");
    }

    document.body.classList.remove("silkwood-logo-intro-active");
    logoIntroState = null;
  }

  function skipLogoIntroToHero(reason) {
    logLoader("logo-intro-skip", { reason: reason || null });
    cleanupLogoIntro();
    startHeroEntrance();
  }

  function finishLogoIntroOverlay(reason) {
    if (!logoIntroState || logoIntroState.cleaned) return;
    if (logoIntroState.finishing) return;
    logoIntroState.finishing = true;

    const overlay = logoIntroState.overlay;
    if (overlay) {
      overlay.classList.add("is-exiting");
    }

    window.setTimeout(function () {
      cleanupLogoIntro();
      logLoader("logo-intro-finished", { reason: reason || null });
    }, LOGO_INTRO_EXIT_MS);
  }

  function triggerLogoIntroNearEnd() {
    if (!logoIntroState || logoIntroState.cleaned || logoIntroState.nearEndFired) {
      return;
    }
    logoIntroState.nearEndFired = true;

    const overlay = logoIntroState.overlay;
    if (overlay) {
      overlay.classList.add("is-transitioning");
    }

    startHeroEntrance();
    logLoader("logo-intro-near-end");
  }

  function startLogoIntro(loaderReason) {
    const overlay = document.getElementById("silkwood-logo-intro");
    const video = overlay && overlay.querySelector("video");
    if (!overlay || !video) {
      startHeroEntrance();
      return;
    }

    try {
      logoIntroState = {
        overlay: overlay,
        video: video,
        cleaned: false,
        finishing: false,
        nearEndFired: false,
        playing: false,
        timers: [],
        listeners: []
      };

      function trackListener(target, type, fn, opts) {
        target.addEventListener(type, fn, opts);
        logoIntroState.listeners.push({
          target: target,
          type: type,
          fn: fn,
          opts: opts
        });
      }

      prepareLogoVideo(video);
      document.body.classList.add("silkwood-logo-intro-active");
      overlay.classList.add("is-active");
      overlay.setAttribute("aria-hidden", "false");
      logLoader("logo-intro-start", { loaderReason: loaderReason || null });

      const mq = window.matchMedia("(min-width: 1024px)");
      function onMqChange() {
        if (!mq.matches) skipLogoIntroToHero("viewport-narrow");
      }
      logoIntroState.mq = mq;
      logoIntroState.onMqChange = onMqChange;
      try {
        if (mq.addEventListener) {
          mq.addEventListener("change", onMqChange);
        } else if (mq.addListener) {
          mq.addListener(onMqChange);
        }
      } catch (e) {
        /* ignore mq listener failures */
      }

      trackListener(video, "error", function () {
        skipLogoIntroToHero("video-error");
      });

      trackListener(video, "ended", function () {
        if (!logoIntroState || logoIntroState.cleaned) return;
        if (!logoIntroState.nearEndFired) triggerLogoIntroNearEnd();
        finishLogoIntroOverlay("ended");
      });

      trackListener(video, "timeupdate", function () {
        if (!logoIntroState || logoIntroState.cleaned) return;
        const duration = video.duration;
        if (!duration || !isFinite(duration)) return;
        if (duration - video.currentTime <= LOGO_INTRO_NEAR_END_SEC) {
          triggerLogoIntroNearEnd();
        }
      });

      function tryPlay() {
        if (!logoIntroState || logoIntroState.cleaned || logoIntroState.playing) {
          return;
        }
        logoIntroState.playing = true;
        prepareLogoVideo(video);
        const playPromise = video.play();
        if (playPromise && typeof playPromise.then === "function") {
          playPromise
            .then(function () {
              logLoader("logo-intro-playing");
            })
            .catch(function (err) {
              logLoader("logo-intro-play-rejected", {
                message: err && err.message ? err.message : String(err)
              });
              skipLogoIntroToHero("play-rejected");
            });
        }
      }

      function beginPlaybackWhenReady() {
        if (video.readyState >= 2) {
          tryPlay();
          return;
        }

        try {
          video.load();
        } catch (e) {
          /* ignore */
        }

        let readyTimer = window.setTimeout(function () {
          if (!logoIntroState || logoIntroState.cleaned || logoIntroState.playing) {
            return;
          }
          // Last attempt: play if any data exists, otherwise skip cleanly
          if (video.readyState >= 2) {
            tryPlay();
          } else if (video.readyState >= 1) {
            tryPlay();
          } else {
            skipLogoIntroToHero("ready-timeout");
          }
        }, LOGO_INTRO_READY_MS);
        logoIntroState.timers.push(readyTimer);

        function onReady() {
          if (!logoIntroState || logoIntroState.cleaned) return;
          window.clearTimeout(readyTimer);
          tryPlay();
        }

        trackListener(video, "canplay", onReady);
        trackListener(video, "loadeddata", onReady);
        trackListener(video, "canplaythrough", onReady);
      }

      beginPlaybackWhenReady();

      const hardTimer = window.setTimeout(function () {
        if (!logoIntroState || logoIntroState.cleaned) return;
        if (!logoIntroState.nearEndFired) triggerLogoIntroNearEnd();
        finishLogoIntroOverlay("hard-timeout");
      }, LOGO_INTRO_HARD_MS);
      logoIntroState.timers.push(hardTimer);
    } catch (err) {
      logLoader("logo-intro-exception", {
        message: err && err.message ? err.message : String(err)
      });
      skipLogoIntroToHero("exception");
    }
  }

  function forceHeroIfStuck() {
    if (heroStarted) return;
    if (logoIntroState && !logoIntroState.cleaned) {
      skipLogoIntroToHero("global-failsafe");
      return;
    }
    startHeroEntrance();
  }

  function initScrollReveals() {
    const selector = [
      ".reveal",
      ".reveal-up",
      ".reveal-left",
      ".reveal-right",
      ".blur-reveal",
      ".image-reveal",
      ".scroll-reveal",
      ".fade-in-up",
      ".fade-up",
      ".reveal-on-scroll"
    ].join(",");

    const nodes = Array.prototype.slice.call(document.querySelectorAll(selector));
    if (!nodes.length) return;

    function revealEl(el) {
      el.classList.add("is-inview", "visible");
    }

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      nodes.forEach(revealEl);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealEl(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    nodes.forEach((el) => {
      if (el.closest(".hero-enter")) return;
      io.observe(el);
    });
  }

  function initMouseParallax() {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    const targets = Array.prototype.slice.call(
      document.querySelectorAll(".parallax-subtle")
    );
    if (!targets.length) return;

    let raf = 0;
    let mx = 0;
    let my = 0;

    function apply() {
      raf = 0;
      targets.forEach((el) => {
        const depth = parseFloat(el.getAttribute("data-parallax") || "8");
        const x = mx * depth;
        const y = my * depth;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    }

    window.addEventListener(
      "pointermove",
      (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        mx = (e.clientX - cx) / cx;
        my = (e.clientY - cy) / cy;
        if (!raf) raf = requestAnimationFrame(apply);
      },
      { passive: true }
    );
  }

  function bindBookingPlaceholders() {
    document.querySelectorAll("[data-booking-pending]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
      });
    });
  }

  function logLoader(event, detail) {
    const entry = {
      t: new Date().toISOString(),
      event: event,
      detail: detail || null,
      readyState: document.readyState,
      href: location.href
    };
    loaderLog.push(entry);
    try {
      sessionStorage.setItem(LOADER_LOG_KEY, JSON.stringify(loaderLog));
    } catch (e) {
      /* ignore quota / private mode */
    }
    if (window.console && typeof console.info === "function") {
      console.info("[SilkwoodLoader]", event, detail || "");
    }
  }

  function initLoader() {
    if (document.getElementById("silkwood-loader")) {
      logLoader("skip-already-present");
      return;
    }
    if (!document.body) {
      logLoader("defer-no-body");
      document.addEventListener("DOMContentLoaded", initLoader, { once: true });
      return;
    }

    logLoader("init-start");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const root = document.createElement("div");
    root.id = "silkwood-loader";
    root.className = "silkwood-loader";
    root.setAttribute("role", "status");
    root.setAttribute("aria-live", "polite");
    root.setAttribute("aria-busy", "true");
    root.setAttribute("aria-label", "Loading Silkwood Hotel");
    root.innerHTML = `
      <div class="silkwood-loader__veil" aria-hidden="true"></div>
      <div class="silkwood-loader__content">
        <img class="silkwood-loader__logo" src="/assets/brand/logo-on-light.png" alt="" width="160" height="54" />
        <div class="silkwood-loader__stage" aria-hidden="true">
          <div class="silkwood-loader__ring"></div>
          <canvas class="silkwood-loader__canvas" width="176" height="176"></canvas>
        </div>
      </div>`;

    document.body.appendChild(root);
    document.body.classList.add("silkwood-loading");
    logLoader("dom-injected", { reduceMotion: reduceMotion });

    const canvas = root.querySelector(".silkwood-loader__canvas");
    const ctx = canvas && canvas.getContext ? canvas.getContext("2d") : null;
    if (!ctx) logLoader("canvas-unavailable");
    const size = 176;
    const center = size / 2;
    const radius = 52;
    const trail = [];
    const trailMax = 28;
    let angle = -Math.PI / 2;
    let startedAt = performance.now();
    let rafId = 0;
    let dismissed = false;
    const minVisibleMs = 650;
    const maxWaitMs = 4000;
    const copper = { r: 153, g: 78, b: 20 };

    function speedAt(elapsedMs) {
      const cycle = 4200;
      const phase = ((elapsedMs % cycle) / cycle) * Math.PI * 2;
      // Slow -> faster -> slow, continuous (0.55 … 1.85)
      return 0.55 + 1.3 * (0.5 - 0.5 * Math.cos(phase));
    }

    function drawFrame(now) {
      if (!ctx || dismissed) return;
      const elapsed = now - startedAt;
      const omega = speedAt(elapsed) * 0.042;
      angle += omega;

      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;
      trail.push({ x, y });
      if (trail.length > trailMax) trail.shift();

      ctx.clearRect(0, 0, size, size);

      // Soft path guide
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(26, 12, 4, 0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Fading trail segments
      for (let i = 0; i < trail.length - 1; i += 1) {
        const t = (i + 1) / trail.length;
        const p = trail[i];
        const alpha = 0.04 + t * 0.28;
        const r = 1.1 + t * 2.1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${copper.r}, ${copper.g}, ${copper.b}, ${alpha})`;
        ctx.fill();
      }

      // Lead dot
      const lead = trail[trail.length - 1] || { x, y };
      ctx.beginPath();
      ctx.arc(lead.x, lead.y, 3.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${copper.r}, ${copper.g}, ${copper.b}, 0.88)`;
      ctx.fill();

      // Soft halo
      ctx.beginPath();
      ctx.arc(lead.x, lead.y, 6.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${copper.r}, ${copper.g}, ${copper.b}, 0.12)`;
      ctx.fill();

      rafId = requestAnimationFrame(drawFrame);
    }

    if (ctx && !reduceMotion) {
      rafId = requestAnimationFrame(drawFrame);
      logLoader("animation-started");
    } else if (ctx && reduceMotion) {
      // Static refined mark for reduced motion
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(26, 12, 4, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(center + radius, center, 3.4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(153, 78, 20, 0.75)";
      ctx.fill();
      logLoader("reduced-motion-static");
    }

    function dismiss(reason) {
      if (dismissed) return;
      dismissed = true;
      if (rafId) cancelAnimationFrame(rafId);
      root.setAttribute("aria-busy", "false");
      root.classList.add("is-leaving");
      document.body.classList.remove("silkwood-loading");
      onLoaderComplete(reason);
      logLoader("dismiss", {
        reason: reason || "unknown",
        visibleMs: Math.round(performance.now() - startedAt)
      });
      window.setTimeout(() => {
        if (root.parentNode) root.parentNode.removeChild(root);
        logLoader("removed-from-dom");
      }, 850);
    }

    const shownAt = performance.now();
    function tryDismiss(reason) {
      const waited = performance.now() - shownAt;
      const remaining = Math.max(0, minVisibleMs - waited);
      logLoader("try-dismiss", {
        reason: reason,
        waitedMs: Math.round(waited),
        remainingMs: Math.round(remaining)
      });
      window.setTimeout(function () {
        dismiss(reason);
      }, remaining);
    }

    if (document.readyState === "complete") {
      logLoader("page-already-complete");
      tryDismiss("readyState-complete");
    } else {
      logLoader("waiting-for-window-load");
      window.addEventListener(
        "load",
        function () {
          tryDismiss("window-load");
        },
        { once: true }
      );
    }

    // Failsafe: never stay stuck if assets hang
    window.setTimeout(function () {
      dismiss("max-wait-failsafe");
    }, maxWaitMs);
  }

  function initChrome() {
    try {
      initLoader();
    } catch (err) {
      logLoader("initLoader-error", {
        message: err && err.message ? err.message : String(err)
      });
    }

    const page = document.body.getAttribute("data-page") || "home";
    const headerRoot = document.getElementById("site-header-root");
    const footerRoot = document.getElementById("site-footer-root");
    if (headerRoot) headerRoot.innerHTML = renderHeader(page);
    if (footerRoot) footerRoot.innerHTML = renderFooter();

    const header = document.getElementById("site-header");
    const overHero = page !== "terms";

    function setScrolled(scrolled) {
      if (!header || !overHero) return;
      header.classList.toggle("nav-scrolled", scrolled);
      header.classList.toggle("py-2", scrolled);
      header.classList.toggle("py-4", !scrolled);
    }

    if (overHero) {
      const onScroll = () => setScrolled(window.scrollY > 50);
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    const mobile = document.getElementById("mobile-nav");

    function openMenu() {
      if (!mobile) return;
      mobile.hidden = false;
      requestAnimationFrame(() => mobile.classList.add("is-open"));
      document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      if (!mobile) return;
      mobile.classList.remove("is-open");
      document.body.style.overflow = "";
      setTimeout(() => {
        if (!mobile.classList.contains("is-open")) mobile.hidden = true;
      }, 400);
    }

    document.querySelectorAll("[data-menu-open]").forEach((btn) => {
      btn.addEventListener("click", openMenu);
    });
    document.querySelectorAll("[data-menu-close]").forEach((btn) => {
      btn.addEventListener("click", closeMenu);
    });
    if (mobile) {
      mobile.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    initScrollReveals();
    initMouseParallax();
    bindBookingPlaceholders();
    initLogoIntroPrefetch();

    if (!document.getElementById("silkwood-loader")) {
      onLoaderComplete("no-loader");
    }

    window.setTimeout(forceHeroIfStuck, 20000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChrome);
  } else {
    initChrome();
  }

  window.SilkwoodChrome = {
    mapsUrl: MAPS_URL,
    address: ADDRESS,
    bookHref: BOOK_HREF,
    loaderLog: loaderLog,
    getLoaderLog: function () {
      try {
        return JSON.parse(sessionStorage.getItem(LOADER_LOG_KEY) || "[]");
      } catch (e) {
        return loaderLog.slice();
      }
    }
  };
})();
