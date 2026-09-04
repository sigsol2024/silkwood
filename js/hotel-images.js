/**
 * Silkwood Hotel — curated image map
 * Paths are relative to /images/hotel/ (web-safe folder names).
 * Only folders present in images/hotel are referenced.
 */
(function (global) {
  const BASE = "/images/hotel";

  function path(folder, file) {
    return BASE + "/" + folder + "/" + file;
  }

  function imgs(folder, files, alt) {
    return files.map(function (file, i) {
      return {
        src: path(folder, file),
        alt: alt + (files.length > 1 ? " — view " + (i + 1) : "")
      };
    });
  }

  const rooms = {
    classic: {
      id: "classic",
      name: "Classic Room",
      countLabel: "42 rooms",
      href: "/room-details?room=classic",
      bookUrl: "https://app.stayeazi.com/reservation/silkwood-hotels/classic-room",
      cover: path("rooms/classic", "silkwood-4.jpg"),
      gallery: imgs(
        "rooms/classic",
        [
          "silkwood-4.jpg",
          "silkwood-2.jpg",
          "silkwood-5.jpg",
          "silkwood-7.jpg",
          "silkwood-8.jpg",
          "silkwood-9.jpg",
          "silkwood-17.jpg",
          "silkwood-18.jpg"
        ],
        "Classic Room at Silkwood Hotel"
      ),
      intro:
        "A calm, individually decorated room with air-conditioning, Wi-Fi, a work desk, mini bar, safe, and satellite TV.",
      about: [
        "There are 42 Classic Rooms in the house — a considered base for business or leisure in Ikeja GRA.",
        "Each room has air-conditioning, a hairdryer, tea and coffee, a work desk, mini bar, in-room safe, satellite TV, and Wi-Fi.",
        "24-hour room service is available. Check-in is from 14:00; check-out is by 11:00. Enquire for rates and availability."
      ],
      amenities: {
        inRoom: ["Air-conditioning", "Work desk", "In-room safe", "Satellite TV"],
        bathroom: ["Hairdryer", "Bathrobes", "Bathroom slippers", "Toiletries"],
        services: ["Wi-Fi", "Mini bar", "Tea & coffee", "24-hour room service"]
      }
    },
    deluxe: {
      id: "deluxe",
      name: "Deluxe Room",
      countLabel: "30 rooms",
      href: "/room-details?room=deluxe",
      bookUrl: "https://app.stayeazi.com/reservation/silkwood-hotels/deluxe-room",
      cover: path("rooms/deluxe", "silkwood-11.jpg"),
      gallery: imgs(
        "rooms/deluxe",
        [
          "silkwood-11.jpg",
          "silkwood-10.jpg",
          "silkwood-12.jpg",
          "silkwood-14.jpg",
          "silkwood-15.jpg",
          "silkwood-16.jpg",
          "silkwood-42.jpg",
          "silkwood-46.jpg"
        ],
        "Deluxe Room at Silkwood Hotel"
      ),
      intro:
        "A larger stay with the same considered finish: tea and coffee, hairdryer, mini bar, and a desk for work or rest.",
      about: [
        "There are 30 Deluxe Rooms — more space for guests who want room to settle in during a Lagos stay.",
        "Each room has air-conditioning, a hairdryer, tea and coffee, a work desk, mini bar, in-room safe, satellite TV, and Wi-Fi.",
        "24-hour room service is available. Check-in is from 14:00; check-out is by 11:00. Enquire for rates and availability."
      ],
      amenities: {
        inRoom: ["Air-conditioning", "Work desk", "In-room safe", "Satellite TV"],
        bathroom: ["Hairdryer", "Bathrobes", "Bathroom slippers", "Toiletries"],
        services: ["Wi-Fi", "Mini bar", "Tea & coffee", "24-hour room service"]
      }
    },
    premium: {
      id: "premium",
      name: "Premium Room",
      countLabel: "24 rooms",
      href: "/room-details?room=premium",
      bookUrl: "https://app.stayeazi.com/reservation/silkwood-hotels/premium-room",
      cover: path("rooms/premium", "silkwood-22.jpg"),
      gallery: imgs(
        "rooms/premium",
        [
          "silkwood-22.jpg",
          "silkwood-19.jpg",
          "silkwood-21.jpg",
          "silkwood-24.jpg",
          "silkwood-26.jpg",
          "silkwood-28.jpg",
          "silkwood-49.jpg",
          "silkwood-52.jpg"
        ],
        "Premium Room at Silkwood Hotel"
      ),
      intro:
        "A step up in space and quiet, still with air-conditioning, satellite TV, a safe, and 24-hour room service.",
      about: [
        "There are 24 Premium Rooms — quieter stays with more room to work and rest.",
        "Each room has air-conditioning, a hairdryer, tea and coffee, a work desk, mini bar, in-room safe, satellite TV, and Wi-Fi.",
        "24-hour room service is available. Check-in is from 14:00; check-out is by 11:00. Enquire for rates and availability."
      ],
      amenities: {
        inRoom: ["Air-conditioning", "Work desk", "In-room safe", "Satellite TV"],
        bathroom: ["Hairdryer", "Bathrobes", "Bathroom slippers", "Toiletries"],
        services: ["Wi-Fi", "Mini bar", "Tea & coffee", "24-hour room service"]
      }
    },
    executive: {
      id: "executive",
      name: "Executive Room",
      countLabel: "6 rooms",
      href: "/room-details?room=executive",
      bookUrl: "https://app.stayeazi.com/reservation/silkwood-hotels/executive-room",
      cover: path("rooms/executive", "silkwood-171.jpg"),
      gallery: imgs(
        "rooms/executive",
        [
          "silkwood-171.jpg",
          "silkwood-169.jpg",
          "silkwood-173.jpg",
          "silkwood-176.jpg",
          "silkwood-180.jpg",
          "silkwood-185.jpg",
          "silkwood-190.jpg",
          "silkwood-193.jpg"
        ],
        "Executive Room at Silkwood Hotel"
      ),
      intro:
        "A quieter, more spacious room for longer stays or work in Ikeja GRA, with a desk, mini bar, air-conditioning, and Wi-Fi.",
      about: [
        "There are six Executive Rooms in the house — a quieter, more spacious stay for guests travelling for work or a longer visit to Ikeja GRA.",
        "Each room has air-conditioning, a hairdryer, tea and coffee, a work desk, mini bar, in-room safe, satellite TV, and Wi-Fi.",
        "24-hour room service is available. Check-in is from 14:00; check-out is by 11:00. Enquire for rates and availability."
      ],
      amenities: {
        inRoom: ["Air-conditioning", "Work desk", "In-room safe", "Satellite TV"],
        bathroom: ["Hairdryer", "Bathrobes", "Bathroom slippers", "Toiletries"],
        services: ["Wi-Fi", "Mini bar", "Tea & coffee", "24-hour room service"]
      }
    },
    diplomatic: {
      id: "diplomatic",
      name: "Diplomatic Suite",
      countLabel: "4 suites",
      href: "/room-details?room=diplomatic",
      bookUrl: "https://app.stayeazi.com/reservation/silkwood-hotels/diplomatic-suite",
      cover: path("rooms/diplomatic-suite", "silkwood-201.jpg"),
      gallery: imgs(
        "rooms/diplomatic-suite",
        [
          "silkwood-201.jpg",
          "silkwood-200.jpg",
          "silkwood-205.jpg",
          "silkwood-208.jpg",
          "silkwood-212.jpg",
          "silkwood-216.jpg",
          "silkwood-220.jpg",
          "silkwood-223.jpg"
        ],
        "Diplomatic Suite at Silkwood Hotel"
      ),
      intro:
        "The most private stay in the house, with a mini bar, safe, satellite TV, and 24-hour room service.",
      about: [
        "There are four Diplomatic Suites — the most private stays in the house for guests who need space and quiet.",
        "Each suite has air-conditioning, a hairdryer, tea and coffee, a work desk, mini bar, in-room safe, satellite TV, and Wi-Fi.",
        "24-hour room service is available. Check-in is from 14:00; check-out is by 11:00. Enquire for rates and availability."
      ],
      amenities: {
        inRoom: ["Air-conditioning", "Work desk", "In-room safe", "Satellite TV"],
        bathroom: ["Hairdryer", "Bathrobes", "Bathroom slippers", "Toiletries"],
        services: ["Wi-Fi", "Mini bar", "Tea & coffee", "24-hour room service"]
      }
    }
  };

  const poolBar = imgs(
    "pool-bar",
    [
      "silkwood-110.jpg",
      "silkwood-103.jpg",
      "silkwood-104.jpg",
      "silkwood-105.jpg",
      "silkwood-111.jpg",
      "silkwood-112.jpg",
      "silkwood-113.jpg",
      "silkwood-114.jpg",
      "silkwood-115.jpg",
      "silkwood-116.jpg",
      "silkwood-117.jpg",
      "silkwood-118.jpg",
      "silkwood-119.jpg",
      "silkwood-120.jpg"
    ],
    "Pool and Strands Bar at Silkwood Hotel"
  );

  const pool = imgs(
    "pool-bar",
    [
      "silkwood-118.jpg",
      "silkwood-119.jpg",
      "silkwood-114.jpg",
      "silkwood-113.jpg",
      "silkwood-104.jpg"
    ],
    "Pool at Silkwood Hotel"
  );

  const strandsBar = imgs(
    "pool-bar",
    [
      "silkwood-110.jpg",
      "silkwood-103.jpg",
      "silkwood-105.jpg",
      "silkwood-111.jpg",
      "silkwood-112.jpg",
      "silkwood-115.jpg",
      "silkwood-116.jpg",
      "silkwood-117.jpg",
      "silkwood-120.jpg"
    ],
    "Strands Bar at Silkwood Hotel"
  );

  const gym = imgs(
    "gym",
    ["silkwood-106.jpg", "silkwood-107.jpg", "silkwood-108.jpg", "silkwood-109.jpg"],
    "Gym at Silkwood Hotel"
  );

  const outdoor = imgs(
    "outdoor",
    [
      "silkwoodikeja.jpg",
      "silkwoodikeja-2.jpg",
      "silkwoodikeja-3.jpg",
      "silkwoodikeja-4.jpg",
      "silkwoodikeja-5.jpg",
      "silkwoodikeja-7c.jpg"
    ],
    "Silkwood Hotel exterior"
  );

  const floors = imgs(
    "floors",
    [
      "silkwood-130.jpg",
      "silkwood-132.jpg",
      "silkwood-135.jpg",
      "silkwood-138.jpg",
      "silkwood-140.jpg",
      "silkwood-145.jpg",
      "silkwood-197.jpg",
      "silkwood-199.jpg"
    ],
    "Silkwood Hotel interiors"
  );

  const reception = imgs(
    "reception",
    [
      "silkwood-78.jpg",
      "silkwood-80.jpg",
      "silkwood-85.jpg",
      "silkwood-90.jpg",
      "silkwood-94.jpg",
      "silkwood-98.jpg",
      "silkwoodikeja-8.jpg",
      "silkwoodikeja-9.jpg"
    ],
    "Silkwood Hotel reception lobby"
  );

  const conferenceHall = imgs(
    "conference-hall",
    [
      "silkwood-121.jpg",
      "silkwood-122.jpg",
      "silkwood-124.jpg",
      "silkwood-125.jpg",
      "silkwood-126.jpg",
      "silkwood-127.jpg",
      "silkwood-128.jpg",
      "silkwood-129.jpg"
    ],
    "Silkwood Hotel Conference Hall"
  );

  const mainHall = imgs(
    "main-hall",
    [
      "silkwood-154.jpg",
      "silkwood-156.jpg",
      "silkwood-158.jpg",
      "silkwood-160.jpg",
      "silkwood-162.jpg",
      "silkwood-164.jpg",
      "silkwood-166.jpg",
      "silkwood-168.jpg"
    ],
    "Silkwood Hotel Main Hall"
  );

  const meetingSpace = imgs(
    "meeting-space",
    [
      "silkwood-147.jpg",
      "silkwood-148.jpg",
      "silkwood-149.jpg",
      "silkwood-150.jpg",
      "silkwood-151.jpg",
      "silkwood-152.jpg",
      "silkwood-153.jpg"
    ],
    "Meeting space at Silkwood Hotel"
  );

  const SilkwoodImages = {
    rooms: rooms,
    roomOrder: ["classic", "deluxe", "premium", "executive", "diplomatic"],
    getRoom: function (id) {
      const key = (id || "").toLowerCase();
      if (key === "diplomatic-suite") return rooms.diplomatic;
      return rooms[key] || rooms.executive;
    },
    /** Rooms list page hero — rotate one of these on each load */
    roomsPageHero: [
      rooms.classic.gallery[0],
      rooms.classic.gallery[2] || rooms.classic.gallery[1],
      rooms.deluxe.gallery[0],
      rooms.deluxe.gallery[2] || rooms.deluxe.gallery[1],
      rooms.premium.gallery[0],
      rooms.premium.gallery[2] || rooms.premium.gallery[1],
      rooms.executive.gallery[0],
      rooms.executive.gallery[2] || rooms.executive.gallery[1],
      rooms.diplomatic.gallery[0],
      rooms.diplomatic.gallery[2] || rooms.diplomatic.gallery[1]
    ].filter(Boolean),
    /** Facilities page hero — rotate one of these on each load */
    facilitiesPageHero: [
      poolBar[0],
      poolBar[2] || poolBar[1],
      gym[0],
      gym[1] || gym[0],
      outdoor[0],
      outdoor[1] || outdoor[0],
      outdoor[2] || outdoor[0],
      reception[0],
      reception[2] || reception[1],
      reception[4] || reception[3] || reception[1]
    ].filter(Boolean),
    facilities: {
      poolBar: poolBar,
      pool: pool,
      strandsBar: strandsBar,
      gym: gym,
      reception: reception,
      restaurant: imgs(
        "restaurant",
        ["silkwood-55.jpg", "silkwood-60.jpg", "silkwood-67.jpg", "silkwood-73.jpg"],
        "Silkwood Hotel restaurant"
      ),
      hero: pool.slice(0, 4),
      intro: reception.slice(0, 1)
    },
    conference: {
      hall: conferenceHall,
      mainHall: mainHall,
      meetingSpace: meetingSpace,
      hero: conferenceHall[0]
    },
    /** Conference page hero — rotate one of these on each load (all three spaces) */
    conferencePageHero: [
      conferenceHall[0],
      conferenceHall[3] || conferenceHall[1],
      mainHall[0],
      mainHall[2] || mainHall[1],
      meetingSpace[0],
      meetingSpace[2] || meetingSpace[1]
    ].filter(Boolean),
    /** About page — Art of Discretion cards (pick one of 3 on each load) */
    aboutArt: {
      guestRelations: [
        rooms.classic.gallery[0],
        rooms.deluxe.gallery[1] || rooms.deluxe.gallery[0],
        rooms.executive.gallery[0]
      ].filter(Boolean),
      kitchen: imgs(
        "restaurant",
        ["silkwood-55.jpg", "silkwood-67.jpg", "silkwood-73.jpg"],
        "Restaurant at Silkwood Hotel"
      ),
      frontOffice: [
        reception[0],
        reception[2] || reception[1],
        reception[4] || reception[3] || reception[1]
      ].filter(Boolean)
    },
    about: {
      storyMain: outdoor[4] || outdoor[3] || outdoor[0], // silkwoodikeja-5 — distinct from overlay
      storyInset: outdoor[2] || outdoor[1], // silkwoodikeja-3
      philosophy: floors[1] || floors[0]
    },
    dining: {
      restaurant: imgs(
        "restaurant",
        [
          "silkwood-55.jpg",
          "silkwood-58.jpg",
          "silkwood-60.jpg",
          "silkwood-64.jpg",
          "silkwood-67.jpg",
          "silkwood-70.jpg",
          "silkwood-73.jpg",
          "silkwood-76.jpg",
          "silkwood-56.jpg",
          "silkwood-62.jpg",
          "silkwood-68.jpg",
          "silkwood-74.jpg",
          "silkwood-57.jpg",
          "silkwood-63.jpg",
          "silkwood-69.jpg",
          "silkwood-75.jpg"
        ],
        "Silkwood Hotel restaurant"
      )
    },
    home: {
      heroFallback: [
        outdoor[0],
        reception[0],
        reception[2],
        outdoor[2] || reception[4],
        outdoor[3] || reception[1]
      ],
      exterior: outdoor[0] || reception[6] || reception[0],
      pool: poolBar[0],
      gym: gym[0],
      dining: imgs("restaurant", ["silkwood-55.jpg"], "Silkwood Hotel restaurant")[0],
      facilitiesCollage: [
        poolBar[0],
        gym[0] || gym[1] || poolBar[1],
        imgs("restaurant", ["silkwood-55.jpg"], "Silkwood Hotel restaurant")[0]
      ],
      facilitiesSlider: [
        poolBar[0],
        gym[0] || poolBar[1],
        imgs("restaurant", ["silkwood-55.jpg"], "Silkwood Hotel restaurant")[0],
        poolBar[1] || poolBar[0],
        gym[1] || gym[0] || poolBar[2]
      ].filter(Boolean),
      conferenceTeaser: [
        conferenceHall[0],
        meetingSpace[0],
        mainHall[0],
        conferenceHall[1] || conferenceHall[0],
        meetingSpace[1] || meetingSpace[0],
        mainHall[1] || mainHall[0]
      ].filter(Boolean),
      destination: outdoor[1] || outdoor[0] || reception[3],
      cta: outdoor[4] || outdoor[0] || reception[4],
      mobileNav: reception[0]
    },
    about: {
      hero: outdoor[1] || outdoor[0] || reception[1] || reception[0],
      architecture: outdoor[0] || reception[3] || reception[0],
      interiors: mainHall.slice(0, 3),
      floors: floors.slice(0, 4)
    },
    contact: {
      hero: reception[0]
    },
    gallery: {
      categories: [
        { id: "all", label: "All" },
        { id: "rooms", label: "Rooms" },
        { id: "dining", label: "Dining" },
        { id: "facilities", label: "Facilities" },
        {
          id: "conference",
          label: "Conference & Meeting Space"
        },
        { id: "outdoor", label: "Outdoor" },
        { id: "floors", label: "Floors" }
      ],
      items: (function () {
        const list = [];
        function push(cat, arr) {
          arr.forEach(function (item) {
            list.push({
              src: item.src,
              alt: item.alt,
              category: cat
            });
          });
        }
        push("rooms", rooms.classic.gallery);
        push("rooms", rooms.deluxe.gallery);
        push("rooms", rooms.premium.gallery);
        push("rooms", rooms.executive.gallery);
        push("rooms", rooms.diplomatic.gallery);
        push(
          "dining",
          imgs(
            "restaurant",
            [
              "silkwood-55.jpg",
              "silkwood-58.jpg",
              "silkwood-60.jpg",
              "silkwood-64.jpg",
              "silkwood-67.jpg",
              "silkwood-70.jpg",
              "silkwood-73.jpg",
              "silkwood-76.jpg"
            ],
            "Silkwood Hotel restaurant"
          )
        );
        push("facilities", poolBar);
        push("facilities", gym);
        push("facilities", reception);
        push("conference", mainHall);
        push("conference", meetingSpace);
        push("conference", conferenceHall);
        push("outdoor", outdoor);
        push("floors", floors);
        return list;
      })()
    },
    /** Gaps at implement time */
    gaps: {
      restaurant: false,
      gym: false,
      floors: false,
      outdoor: false,
      spa: false
    },

    buildSliderHtml: function (items, options) {
      options = options || {};
      if (!items || !items.length) return "";
      const mod = options.modifier ? " " + options.modifier : "";
      const label = options.label || "Image gallery";
      let slides = "";
      let dots = "";
      items.forEach(function (item, i) {
        const active = i === 0 ? " is-active" : "";
        const loading = i === 0 ? "eager" : "lazy";
        const fetchPriority = i === 0 ? ' fetchpriority="high"' : "";
        slides +=
          '<div class="silkwood-slider__slide' +
          active +
          '" data-slide-index="' +
          i +
          '" role="group" aria-roledescription="slide" aria-label="' +
          (i + 1) +
          " of " +
          items.length +
          '">' +
          '<img src="' +
          item.src +
          '" alt="' +
          (item.alt || "") +
          '" loading="' +
          loading +
          '"' +
          fetchPriority +
          " />" +
          "</div>";
        dots +=
          '<button type="button" class="silkwood-slider__dot' +
          active +
          '" data-slider-dot="' +
          i +
          '" aria-label="Show image ' +
          (i + 1) +
          '"' +
          (i === 0 ? ' aria-current="true"' : "") +
          "></button>";
      });
      return (
        '<div class="silkwood-slider' +
        mod +
        '" data-silkwood-slider role="region" aria-roledescription="carousel" aria-label="' +
        label +
        '">' +
        '<div class="silkwood-slider__viewport">' +
        '<div class="silkwood-slider__track">' +
        slides +
        "</div></div>" +
        (items.length > 1
          ? '<button type="button" class="silkwood-slider__nav silkwood-slider__nav--prev" data-slider-prev aria-label="Previous image"><span class="material-symbols-outlined" aria-hidden="true">chevron_left</span></button>' +
            '<button type="button" class="silkwood-slider__nav silkwood-slider__nav--next" data-slider-next aria-label="Next image"><span class="material-symbols-outlined" aria-hidden="true">chevron_right</span></button>' +
            '<div class="silkwood-slider__dots" aria-hidden="false">' +
            dots +
            "</div>"
          : "") +
        "</div>"
      );
    }
  };

  global.SilkwoodImages = SilkwoodImages;
})(typeof window !== "undefined" ? window : globalThis);
