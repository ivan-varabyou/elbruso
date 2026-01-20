# Implementation Plan - Hero Page Redesign (Elbruso)

Redesign the landing page to match the provided reference image (Codivoo Technologies) while maintaining the Elbruso branding and FSD architecture.

## Phase 1: Design Tokens & Global Styles
- [ ] Update `tailwind.config.ts` with accurate palette from the image:
  - Base Coral: `#FF6B6B` or similar (used for buttons and highlights).
  - Dark Slate: `#2D3436` (used for main buttons).
  - Background Light: `#F9FAFB`.
  - Typography: Serif-like heading font or high-quality sans-serif.
- [ ] Update `globals.css` with layout utilities.

## Phase 2: Shared UI Components
- [ ] Update `Button` component to support the specific styles:
  - `variant="coral"` (Request a Demo style).
  - `variant="dark"` (Try for Free style).
  - `variant="outline"` (Book a Free Consultation style).
- [ ] Create `Logo` component.

## Phase 3: Header Development
- [ ] Implement `Header` widget:
  - Sticky/Glassmorphism effect.
  - Centered navigation links.
  - Action buttons (Sign In, Request a Demo).

## Phase 4: Hero Section Redesign
- [ ] **Left Column**:
  - Headline: Large, bold typography.
  - Subheadline with specific width.
  - Action buttons (Try for Free, Book a Free Consultation).
  - Bottom metrics cards (10,000+, 45%, 99.9%) with border and specific alignment.
- [ ] **Right Column**:
  - Complex composition of two layered cards.
  - Card 1: Statistics/Earnings mockup.
  - Card 2: Main dashboard interface mockup (tilted/layered).

## Phase 5: Brands & Portfolio Section
- [ ] Implement marquee or grid of partner logos (Jeep, HubSpot, Stripe, etc.).

## Phase 6: Product Showcase Section
- [ ] Implement "Our Products" headline.
- [ ] Category tabs (Accounting Software, School Management, etc.) with active state (tab indicator).
- [ ] Feature detail block:
  - Left: "Accounting Software" key features list with custom checkmarks.
  - Right: App screenshot mockup.

## Phase 7: Verification
- [ ] Run ESLint to ensure FSD compliance.
- [ ] Browser verification to match visual balance.
