# Tech Spec — VaibhavPixel

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.3.0 | UI framework |
| react-dom | ^18.3.0 | React DOM renderer |
| three | ^0.166.0 | WebGL engine (scenes, geometries, shaders, renderer) |
| @react-three/fiber | ^8.16.0 | React renderer for Three.js (declarative scene graph) |
| @react-three/drei | ^9.108.0 | Helpers: useTexture, useVideoTexture, useDetectGPU, useViewportSize |
| @react-three/postprocessing | ^2.16.0 | Post-processing: EffectComposer, Noise, Vignette |
| gsap | ^3.12.0 | Animation engine: ScrollTrigger, timelines |
| lenis | ^1.1.0 | Smooth scroll with inertia |
| sass | ^1.77.0 | SCSS compilation |
| tailwindcss | ^3.4.0 | Utility-first CSS |
| autoprefixer | ^10.4.0 | CSS vendor prefixes |
| postcss | ^8.4.0 | CSS processing |
| typescript | ^5.4.0 | Type safety |
| vite | ^5.3.0 | Build tool |
| @vitejs/plugin-react | ^4.3.0 | React support for Vite |
| @types/react | ^18.3.0 | React type definitions |
| @types/react-dom | ^18.3.0 | React DOM type definitions |
| @types/three | ^0.166.0 | Three.js type definitions |

---

## Component Inventory

### Layout

| Component | Source | Reuse |
|-----------|--------|-------|
| Navigation | Custom | Single — fixed top nav with scroll-triggered glassmorphism |
| Footer | Custom | Single |
| WebGLCanvas | Custom (R3F Canvas) | Single — fixed fullscreen canvas, all WebGL lives here |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | Text overlay on WebGL carousel background |
| ClientMarquee | Custom | CSS infinite-scroll marquee |
| AboutSection | Custom | 2-column with decorative 3D shapes |
| FeaturesGrid | Custom | 4x2 CSS grid |
| ProcessSection | Custom | 3 alternating-layout steps |
| PortfolioShowcase | Custom | Contains a focused WebGL carousel instance |
| ServicesSection | Custom | Accordion-style categories |
| TestimonialsSection | Custom | 2-column video testimonial cards |
| PricingSection | Custom | 2 pricing cards |
| FAQSection | Custom | Accordion FAQ |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| WebGLCarousel | Custom (R3F) | HeroSection, PortfolioShowcase — configured differently per instance |
| CarouselItem | Custom (R3F mesh) | WebGLCarousel — one per image/video |
| CustomShaderMaterial | Custom (ShaderMaterial) | CarouselItem — vertex deformation + fragment sampling |
| PostProcessing | Custom (EffectComposer) | WebGLCanvas — grain, scanlines, vignette |
| AccordionItem | Custom | ServicesSection, FAQSection |
| CTAButton | Custom | Multiple sections — text link and button variants |
| SectionNumber | Custom | Multiple sections — "(01)" decorative numbering |
| DecorativeShape | Custom (CSS/3D) | AboutSection, FeaturesGrid — abstract floating forms |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Scroll-driven carousel rotation | GSAP ScrollTrigger | Scrub: 2, maps scroll progress to carousel.rotation.y | **🔒 High** |
| Card tilt from scroll velocity | GSAP (nullTarget tween) + custom shader | Velocity computed per frame, smoothed via lerp, GSAP animates uRotation uniform | **🔒 High** |
| Custom vertex shader (Y-rotation + X-bend) | Raw GLSL in ShaderMaterial | Two-pass deformation: rotation matrix then parabolic bend | **🔒 High** |
| Film grain post-processing | Custom shader (EffectComposer) | Procedural noise via sin/hash, animated by time uniform | **🔒 High** |
| Scanlines post-processing | Custom shader (EffectComposer) | Sin-based horizontal line overlay | Medium |
| Page load sequence | GSAP timeline | Staggered opacity/translateY on hero elements, 100ms offsets | Medium |
| Smooth scroll | Lenis | lerp: 0.1, wheelMultiplier: 0.3, synced with GSAP ticker | Medium |
| Client marquee | CSS @keyframes | translateX infinite loop, duplicated content | Low |
| Accordion expand/collapse | CSS transition | Height animation (0 → scrollHeight), chevron rotation | Low |
| Nav glassmorphism | CSS transition | Background/backdrop-filter toggle at 100px scroll | Low |
| Hover effects (cards, buttons) | CSS transition | border-color, background, transform changes | Low |

---

## State & Logic Plan

### Lenis ↔ GSAP ↔ R3F Three-Way Sync

The most critical architecture decision: smooth scroll velocity must reach the WebGL shader uniforms on every frame without React re-renders.

**Architecture:**
1. Lenis is initialized once at the app root and stored in a React context ref
2. A single `useFrame` loop in R3F reads Lenis's `velocity` via the shared ref (not props)
3. The same loop applies lerp smoothing to velocity and writes it to a shared mutable ref
4. GSAP animates a `nullTarget` value based on the smoothed velocity; the animated value writes to `uRotation` uniform
5. GSAP ticker drives Lenis (`lenis.raf`) and calls `ScrollTrigger.update()`

This requires all data flowing through **refs and uniforms**, not React state. The carousel rotation angle, per-card rotation, and scroll velocity must never trigger React re-renders.

### GPU Tier → Carousel Configuration

`useDetectGPU` from drei runs once on mount to determine the GPU tier. The result sets:
- Number of carousel items (12–32)
- Bend factor (0.006–0.02)
- Whether post-processing is enabled

This configuration is computed once and passed as props to WebGLCarousel. No runtime switching needed.

### Carousel Reuse with Different Configurations

The same WebGLCarousel component is used in Hero and Portfolio with different props:
- Hero: more items, larger radius, fills viewport as background
- Portfolio: fewer items, tighter curve, contained in 80vh section

The component accepts configuration props (itemCount, radius, bendFactor) rather than hardcoding values. Two instances can coexist because they render in the same fixed canvas with different scene positions or visibility.

### Video Texture Fallback

The last carousel item attempts to load a video texture via `useVideoTexture`. If loading fails (caught via onError), it falls back to a static image texture. The video element must be explicitly cleaned up on unmount to prevent memory leaks.
