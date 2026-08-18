(function () {
  const ADDRESS = "51 Sobo Ariobiodu Street, GRA Ikeja, Lagos, Nigeria";
  const MAPS_URL =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(ADDRESS);
  const BOOK_HREF = "contact.html";

  const NAV = [
    { id: "rooms", label: "Rooms & Suites", href: "rooms.html" },
    { id: "dining", label: "Dining", href: "dining.html" },
    { id: "facilities", label: "Facilities", href: "facilities.html" },
    { id: "about", label: "About", href: "about.html" },
    { id: "contact", label: "Contact", href: "contact.html" }
  ];

  function navLinkClass(page, item, overHero) {
    const base =
      "font-label-caps text-sm uppercase tracking-widest transition-colors duration-300 nav-link";
    if (overHero) {
      return page === item.id
        ? `${base} text-white border-b border-golden-ochre pb-1`
        : `${base} text-white/90 hover:text-white`;
    }
    return page === item.id
      ? `${base} text-warm-copper border-b border-golden-ochre pb-1`
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
<a class="silkwood-logo silkwood-logo--header shrink-0 hover:opacity-80 transition-opacity ${extraClass || ""}" href="index.html" aria-label="Silkwood Hotel home">
  <img class="logo-on-dark" src="assets/brand/logo-on-dark.png" alt="Silkwood Hotel" width="200" height="68" />
  <img class="logo-on-light" src="assets/brand/logo-on-light.png" alt="Silkwood Hotel" width="200" height="68" />
</a>`;
  }

  function renderHeader(page) {
    const overHero = page !== "terms";
    const menuColor = overHero ? "text-white" : "text-ink";
    return `
<a class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-vanilla-cream focus:text-ink focus:px-3 focus:py-2" href="#main">Skip to content</a>
<header class="flex justify-between items-center w-full px-margin-mobile lg:px-margin-desktop py-4 max-w-container-max mx-auto z-50 fixed top-0 left-0 right-0 bg-transparent transition-all duration-300 ${overHero ? "" : "nav-scrolled"}" id="site-header" aria-label="Primary">
  ${logoPair("")}
  <nav class="hidden lg:flex items-center gap-8">
    ${navLinks(page, overHero)}
  </nav>
  <a class="hidden lg:inline-flex bg-warm-copper text-white px-8 py-3 font-label-caps uppercase tracking-widest hover:bg-golden-ochre transition-colors duration-300" href="${BOOK_HREF}">Book Now</a>
  <button class="lg:hidden inline-flex items-center justify-center ${menuColor} p-1 -mr-1" type="button" aria-label="Open menu" data-menu-open>
    <span class="material-symbols-outlined text-[1.875rem] leading-none" aria-hidden="true">menu</span>
  </button>
</header>
<div class="silkwood-mobile-nav" id="mobile-nav" hidden>
  <div class="silkwood-mobile-nav__top">
    <a class="silkwood-logo" href="index.html" aria-label="Silkwood Hotel home">
      <img src="assets/brand/logo-on-light.png" alt="Silkwood Hotel" width="180" height="61" />
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
        <img src="images/hero.jpg" alt="" />
      </div>
      <a class="silkwood-mobile-nav__cta inline-flex items-center justify-center px-5 py-3.5 bg-warm-copper text-white font-label-caps uppercase tracking-widest hover:bg-golden-ochre" href="${BOOK_HREF}">Book Now</a>
    </div>
  </div>
</div>`;
  }

  function renderFooter() {
    return `
<footer class="bg-ink text-white py-16">
  <div class="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-12">
    <div class="md:col-span-1">
      <a class="silkwood-logo silkwood-logo--footer inline-block mb-6 hover:opacity-90" href="index.html" aria-label="Silkwood Hotel home">
        <img src="assets/brand/logo-on-dark.png" alt="Silkwood Hotel" width="200" height="68" />
      </a>
      <p class="font-body-md text-gray-400 text-sm">
        A four-star stay in Ikeja GRA, Lagos. Warm hospitality, thoughtful rooms, and everything you need for business or leisure.
      </p>
    </div>
    <div>
      <h4 class="font-label-caps text-golden-ochre mb-6 tracking-widest">Explore</h4>
      <ul class="space-y-3 font-body-md text-sm text-gray-300">
        <li><a class="hover:text-white transition-colors" href="rooms.html">Rooms &amp; Suites</a></li>
        <li><a class="hover:text-white transition-colors" href="dining.html">Dining</a></li>
        <li><a class="hover:text-white transition-colors" href="facilities.html">Facilities</a></li>
      </ul>
    </div>
    <div>
      <h4 class="font-label-caps text-golden-ochre mb-6 tracking-widest">Information</h4>
      <ul class="space-y-3 font-body-md text-sm text-gray-300">
        <li><a class="hover:text-white transition-colors" href="contact.html">Contact</a></li>
        <li><a class="hover:text-white transition-colors" href="${MAPS_URL}" target="_blank" rel="noopener noreferrer">Location</a></li>
        <li><a class="hover:text-white transition-colors" href="terms.html">Terms</a></li>
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
  <div class="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop mt-16 pt-8 border-t border-white/10 text-center text-xs text-gray-500 font-body-md">
    © ${new Date().getFullYear()} Silkwood Hotel. All rights reserved.
  </div>
</footer>`;
  }

  function initChrome() {
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

    document.querySelectorAll(".scroll-reveal").forEach((el) => {
      if (!("IntersectionObserver" in window)) {
        el.classList.add("visible");
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          });
        },
        { threshold: 0.12 }
      );
      io.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChrome);
  } else {
    initChrome();
  }

  window.SilkwoodChrome = {
    mapsUrl: MAPS_URL,
    address: ADDRESS,
    bookHref: BOOK_HREF
  };
})();
