Task:  
Design a fully responsive hero section for a SaaS platform that performs audit and analysis of structured tabular data for sports organizations. The hero must strictly follow the Codivoo design system (colors, typography, spacing, UI tokens) and resolve all adaptive issues identified earlier.

1. Layout Requirements
Use a two‑column layout on desktop:

Left column: headline, subheadline, CTAs, trust metrics

Right column: dashboard preview with table audit indicators and a line chart

On tablet (≤1024px):
Columns shrink proportionally, visual panel scales down.

On mobile (≤768px):
Stack columns vertically:

Text content first

Visual panel second

CTAs become vertical with 24px spacing

2. Content
Headline (H1)
“Audit Sports Data with Confidence and Clarity”

Subheadline
“Codivoo helps sports organizations validate, visualize, and act on complex tabular data instantly.”

Primary CTA
Label: Start Free Audit

Style: solid primary blue

Secondary CTA
Label: View Demo Dataset

Style: outline button

Trust Metrics
“Trusted by 200+ sports organizations”

“99.9% audit accuracy”

“45% faster data validation”

3. Visual Panel (Right Side)
Create a simplified dashboard preview that includes:

A table with:

Green checkmarks for validated rows

Orange flags for warnings

Red markers for anomalies

A line chart labeled “Data Quality Over Time”

A metric card:

“Anomalies Detected: 12”

Ensure the visual is clean, minimal, and consistent with Codivoo’s UI style.

4. Design System Tokens (Mandatory)
Colors
Primary blue: #1A73E8

Hover blue: #1664C4

Pressed blue: #0F4C81

Success green: #34A853

Warning orange: #FB8C00

Error red: #EA4335

Gray 600 text: #424242

Background subtle: #F5F5F5

Border light: #E0E0E0

Typography
Font: Sans‑serif

H1: 48–56px bold (32px on mobile)

Subheadline: 18–22px regular

Body: 14–16px

Caption: 12–13px

Spacing
4‑point grid

Hero padding top: 96px desktop / 64px mobile

Hero padding bottom: 80px desktop / 48px mobile

Column gap: 32px

CTA gap: 16px desktop / 24px mobile

Components
Buttons: 44px height, radius 8px

Cards: radius 12px, subtle shadow

Charts: smooth curves, rounded points

5. Adaptive Behavior (Critical)
The agent must ensure:

Responsive typography using fluid scaling or clamp()

Visual panel simplification on mobile (collapse into a single card)

Trust metrics repositioning on mobile (above CTAs or condensed)

Touch targets ≥44px

WCAG AA contrast compliance

Keyboard focus states (2px blue outline)

Reduced motion support (disable animations if needed)

6. Style & Tone
Clean, modern, analytical

High contrast, data‑centric

Soft rounded shapes

Generous whitespace

Professional SaaS aesthetic

7. Deliverable
Produce a fully responsive hero section layout that visually matches the Codivoo design system and includes all content, adaptive rules, and corrected inconsistencies.
