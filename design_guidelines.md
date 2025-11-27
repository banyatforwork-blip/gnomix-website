# Gnomix Linux Website - Design Guidelines

## Design Approach
**Glassmorphism-First Design System** inspired by modern tech product sites (Apple, Vercel, Linear) combined with GNOME's clean aesthetic principles. The design emphasizes frosted glass effects, smooth animations, and premium feel while maintaining clarity and usability across all devices.

## Typography System

**Font Stack:**
- Primary: Inter (Google Fonts) - headings and UI elements
- Secondary: JetBrains Mono - code snippets and technical content

**Hierarchy:**
- Hero Headline: text-6xl md:text-7xl lg:text-8xl, font-bold, tracking-tight
- Section Headers: text-4xl md:text-5xl, font-bold
- Subsections: text-2xl md:text-3xl, font-semibold
- Body Large: text-lg md:text-xl, font-normal
- Body: text-base, font-normal
- Caption: text-sm, opacity-80

## Layout System

**Spacing Units:** Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 consistently
- Section padding: py-16 md:py-24 lg:py-32
- Card padding: p-6 md:p-8
- Element gaps: gap-4 md:gap-6 lg:gap-8
- Container max-width: max-w-7xl with px-4 md:px-6 lg:px-8

**Grid System:**
- Features: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Comparison: grid-cols-1 lg:grid-cols-2
- Gallery: grid-cols-2 md:grid-cols-3 lg:grid-cols-4

## Glassmorphism Components

**Glass Card Base:**
- backdrop-blur-xl with semi-transparent backgrounds
- border: border border-white/20
- Rounded corners: rounded-2xl md:rounded-3xl
- Shadow: shadow-2xl with subtle glow effects

**Navigation Bar:**
- Fixed top position with backdrop-blur-md
- Sticky glass effect that appears on scroll
- Mobile: Full-width hamburger with glass drawer
- Desktop: Horizontal with glass pill buttons

**Hero Section:**
- Full viewport height (min-h-screen) with gradient mesh background
- Large hero image showing Gnomix desktop (1920x1080)
- Floating glass card overlay with main CTA
- Animated particle background layer
- Download button with blurred glass background (backdrop-blur-md, bg-white/10)

**Feature Cards:**
- Grid layout with staggered animation reveals
- 3D tilt effect on hover (desktop only)
- Scale animation on tap (mobile)
- Icon area with animated gradient backgrounds
- Glass borders with subtle shine effect

**Download Section:**
- Multiple version cards in glass containers
- Animated progress indicators
- File size and checksum in monospace font
- Primary download button with prominent glass styling

**FAQ Accordion:**
- Glass panels with smooth expand/collapse
- Plus/minus icon rotation animation
- Staggered reveal of multiple items
- Search filter with glass input field

**Gallery/Screenshots:**
- Masonry grid on desktop, single column on mobile
- Lightbox with glass backdrop and blur
- Swipe gestures for mobile navigation
- Thumbnail hover effects with lift animation

**Statistics Counters:**
- Large animated numbers with counting effect
- Glass card containers in 3-column grid (mobile stacks)
- Icons with pulse animations
- Scroll-triggered reveals

## Animation Specifications

**Page Load:**
- Hero elements fade-in with stagger (0.1s delay between)
- Glass cards slide-up from below with opacity transition
- Background gradient animates smoothly (3s duration)

**Scroll Interactions:**
- Parallax on hero background (0.5x scroll speed)
- Section elements fade-in when 20% visible
- Stagger child elements by 100ms
- Scroll progress indicator grows from top

**Hover States (Desktop):**
- Cards lift (translateY -8px) with scale 1.02
- Glass borders brighten (opacity +20%)
- 3D tilt following cursor position
- Smooth transitions (300ms cubic-bezier)

**Tap States (Mobile):**
- Quick scale pulse (0.95 → 1.0)
- Ripple effect from tap point
- Haptic-style feedback (scale bounce)

**Theme Toggle:**
- Smooth color transitions (500ms)
- Icon rotation animation
- Glass opacity adjustments

## Custom Cursor (Desktop Only)

Preserve existing cursor with enhanced interactions:
- Default: Custom cursor from original site
- Hover on glass elements: Cursor scales 1.2x
- Hover on buttons: Cursor transforms to pointer with glow
- Dragging/Interactive: Cursor changes to grabbing state

## Responsive Breakpoints

- Mobile: 320px - 767px (single column, touch-optimized)
- Tablet: 768px - 1023px (2-column layouts)
- Laptop: 1024px - 1439px (full features, animations)
- Desktop: 1440px+ (enhanced effects, parallax)

**Mobile Optimizations:**
- Hamburger menu with glass drawer animation
- Reduced particle count for performance
- Simplified 3D effects (scale only)
- Touch-friendly tap targets (min 44px)
- Swipe gestures for carousels

## Images

**Required Images:**

1. **Hero Background (1920x1080):** Gnomix desktop screenshot showing clean GNOME interface with nautilus file manager and terminal, blurred slightly for depth
2. **Feature Screenshots (4x, 800x600):** Individual GNOME apps in action - Settings, Software, Files, Terminal
3. **Gallery Images (8x, 1200x800):** Various desktop configurations, dark/light themes, different workspaces
4. **Comparison Mockup (1200x400):** Side-by-side of Ubuntu vs Gnomix showing visual differences
5. **Community Banner (1600x400):** Abstract GNOME-inspired geometric pattern for community section background

All images use rounded-3xl corners and subtle glass overlay effects.

## Accessibility

- Focus rings: visible ring-2 ring-offset-2 on interactive elements
- Reduced motion: Disable animations when prefers-reduced-motion is active
- Touch targets: Minimum 44x44px on mobile
- Contrast: Ensure text on glass meets WCAG AA standards
- Keyboard navigation: Full site navigable without mouse