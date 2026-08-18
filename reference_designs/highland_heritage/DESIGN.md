---
name: Highland Heritage
colors:
  surface: '#fbf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#fbf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ee'
  surface-container: '#f0eee9'
  surface-container-high: '#eae8e3'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c19'
  on-surface-variant: '#434843'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#737973'
  outline-variant: '#c3c8c1'
  surface-tint: '#4d6453'
  primary: '#061b0e'
  on-primary: '#ffffff'
  primary-container: '#1b3022'
  on-primary-container: '#819986'
  inverse-primary: '#b4cdb8'
  secondary: '#695d46'
  on-secondary: '#ffffff'
  secondary-container: '#efdec0'
  on-secondary-container: '#6d614a'
  tertiary: '#211500'
  on-tertiary: '#ffffff'
  tertiary-container: '#3a2800'
  on-tertiary-container: '#b18d48'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d0e9d4'
  primary-fixed-dim: '#b4cdb8'
  on-primary-fixed: '#0b2013'
  on-primary-fixed-variant: '#364c3c'
  secondary-fixed: '#f2e0c3'
  secondary-fixed-dim: '#d5c5a8'
  on-secondary-fixed: '#231a08'
  on-secondary-fixed-variant: '#504530'
  tertiary-fixed: '#ffdea5'
  tertiary-fixed-dim: '#e9c176'
  on-tertiary-fixed: '#261900'
  on-tertiary-fixed-variant: '#5d4201'
  background: '#fbf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e4e2dd'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 84px
    fontWeight: '400'
    lineHeight: 92px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '300'
    lineHeight: 30px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  label-caps:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.15em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-desktop: 80px
  margin-mobile: 24px
  section-gap: 160px
---

## Brand & Style

This design system embodies the soul of Jos—a sanctuary where colonial heritage meets the rugged beauty of the Shere Hills. The brand personality is **Editorial, Timeless, and Organic**, moving away from clinical digital interfaces toward the warmth of a luxury travel journal.

The visual style is **Minimalist Editorial**. It prioritizes high-impact immersion, using generous whitespace (the "cool highland air") to let large-scale photography tell the story of the destination. Layouts are intentionally asymmetrical, mirroring the unpredictable lines of natural rock formations and mountain ridgelines. The emotional response is one of calm, discovery, and quiet prestige.

## Colors

The palette is derived directly from the Jos plateau landscape. 

- **Deep Forest Green (#1B3022):** Used for primary typography and deep-immersion backgrounds. It represents the lush vegetation and stability.
- **Warm Sand (#E6D5B8):** The foundational surface color for sectional shifts. It evokes the sun-drenched granite of the hills.
- **Muted Earth Gold (#C5A059):** Reserved for delicate accents, high-level interactive signals, and heritage iconography.
- **Soft Sky Blue (#A8C6D1):** A secondary accent used for cooling the palette, ideal for secondary buttons or soft dividers.
- **Canvas Neutral (#F9F7F2):** The primary background color, providing a softer, more organic feel than pure white.

## Typography

The typography strategy relies on the tension between the high-contrast elegance of **Playfair Display** and the geometric clarity of **Montserrat**.

- **Headlines:** Use Playfair Display for all storytelling elements. For the largest displays, use "Optical Sizing" if available to preserve the hairline thins of the serifs.
- **Body Text:** Use Montserrat with a "Light" (300) or "Regular" (400) weight. Increase line height (leading) significantly to maintain an editorial, breathable feel.
- **Micro-copy:** Use "Label-caps" for eyebrow headings or utility links. The increased letter spacing ensures legibility and adds a premium, "stamped" aesthetic.

## Layout & Spacing

This design system utilizes an **Asymmetrical Editorial Grid**. Rather than a rigid 12-column structure, it favors a modular approach where content is "anchored" to different vertical axes, creating a sense of movement.

- **White Space:** Use extreme vertical padding between sections (160px+) to signify luxury and prevent information density.
- **Image Treatment:** Images should vary in aspect ratio—mixing tall portrait "lifestyle" shots with wide cinematic "landscape" shots. Some images should bleed off the edge of the screen to break the container.
- **Breakpoints:**
  - **Desktop (1440px+):** Full asymmetrical freedom.
  - **Tablet (768px - 1024px):** Transition to a more centered, simplified 2-column stack.
  - **Mobile (Under 768px):** Single-column focus, maintaining high-contrast typography and large imagery.

## Elevation & Depth

To maintain a tactile, organic feel, the design system avoids heavy drop shadows and synthetic blurs. Depth is achieved through **Layering and Tonal Contrast**.

- **Stacked Surfaces:** Elements overlap physically. For example, a text block might partially cover a hero image, or a small caption card might sit on the corner of a photo.
- **Tonal Tiers:** Use the *Warm Sand* (#E6D5B8) color to create "islands" of content against the *Canvas* (#F9F7F2) background.
- **Subtle Ambient Shadows:** If elevation is required (e.g., for a booking modal), use a very soft, multi-layered shadow tinted with the Primary Green: `0px 20px 40px rgba(27, 48, 34, 0.05)`.
- **Dividers:** Use thin (0.5px) lines in Earth Gold or Deep Green to separate content without adding visual bulk.

## Shapes

The shape language is **Architectural and Sharp**. 

- **Corners:** Elements use 0px border radius (Sharp). This reinforces the "Highland Station" heritage and matches the precise, geometric nature of the mountain-inspired logo.
- **Containers:** Frame images with significant padding rather than rounding corners.
- **Geometry:** Subtle mountain-inspired angles can be used as background masks or decorative divider shapes, appearing as low-opacity Deep Green overlays.

## Components

### Buttons
Primary buttons are solid Deep Forest Green with White or Gold text. They are rectangular (sharp corners) and use the "Label-caps" typography. Secondary buttons use a 1px Gold outline with a high-contrast hover effect (solid fill).

### Icons
Use high-precision, thin-stroke (1px) icons. The style should be minimal and hospitality-focused (e.g., simplified keys, mountain peaks, and weather symbols). Icons should always be paired with text to ensure a classic feel.

### Cards
Cards are defined by their content rather than borders. A card consists of a high-quality image, a Playfair Display title, and a Montserrat caption. No shadows or borders should be applied to the container itself; use whitespace to define the boundaries.

### Input Fields
Inputs are minimalist: a single 1px bottom border in Deep Green. Labels float above in small caps. Error states should use a muted terracotta rather than bright red to stay within the organic palette.

### Navigation
The header is transparent, transitioning to Warm Sand on scroll. Use a serif font for main navigation links to maintain the editorial "magazine" header aesthetic.