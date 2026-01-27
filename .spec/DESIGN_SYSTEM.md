# Elbruso Design System

## Overview

Unified visual and interaction framework for Elbruso. Combines Notion.so minimalism with Tailwind CSS for clean, professional interfaces.

---

## Color System

### Zinc Palette (UI Components)

Used for backgrounds, borders, text, and interactive elements:

```css
/* Backgrounds */
--bg-primary: zinc-50 /* Main app background */ --bg-secondary: white /* Panels and cards */
  --bg-tertiary: zinc-100 /* Hover states, subtle backgrounds */ /* Text */ --text-primary: zinc-900
  /* Primary text */ --text-secondary: zinc-700 /* Secondary text */ --text-tertiary: zinc-600
  /* Less important text */ --text-muted: zinc-500 /* Hints, placeholders */
  --text-disabled: zinc-400 /* Disabled elements */ /* Borders */ --border-primary: zinc-200/60
  /* Main borders (semi-transparent) */ --border-secondary: zinc-100 /* Thin dividers */
  --border-hover: zinc-300 /* Hover state */ /* Interactive */ --interactive-bg: zinc-100
  /* Active elements */ --interactive-hover: zinc-50 /* Button hover */
  --interactive-active: zinc-200 /* Active/pressed state */;
```

### Blue Accents (Charts & Status)

Used for charts, data visualization, and key interactive elements:

| Token              | Hex     | Usage                              |
| ------------------ | ------- | ---------------------------------- |
| primary_blue       | #1A73E8 | Primary buttons, links, highlights |
| primary_blue_dark  | #0F4C81 | Pressed states, dark accents       |
| primary_blue_light | #4285F4 | Charts, secondary accents          |
| chart_blue         | #4285F4 | Primary data line                  |

### Semantic Colors (Feedback)

Used for status indicators and system feedback:

| Token              | Hex     | Meaning                          |
| ------------------ | ------- | -------------------------------- |
| success_green      | #34A853 | Positive metrics, success states |
| success_green_dark | #0F9D58 | Strong positive emphasis         |
| warning_orange     | #FB8C00 | Alerts, attention                |
| warning_yellow     | #FBBC05 | Soft warnings, highlights        |
| error_red          | #EA4335 | Errors, negative metrics         |
| error_red_dark     | #D32F2F | Critical errors                  |

### Chart Colors (Data Visualization)

Consistent color mapping for charts:

| Token        | Hex     | Usage             |
| ------------ | ------- | ----------------- |
| chart_blue   | #4285F4 | Primary metric    |
| chart_green  | #0F9D58 | Positive trend    |
| chart_orange | #F39C12 | Secondary metrics |
| chart_red    | #D32F2F | Negative trend    |
| chart_yellow | #F4B400 | Highlighted data  |

---

## Typography

### Font Family

```css
font-family:
  Inter,
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  sans-serif;
```

### Type Scale

| Style           | Size     | Weight    | Tailwind Class          | Usage                      |
| --------------- | -------- | --------- | ----------------------- | -------------------------- |
| H1 (Page Title) | 28-32 px | Bold      | `text-3xl font-bold`    | Page headers               |
| H2 (Section)    | 22-26 px | Semi-bold | `text-xl font-semibold` | Section headers            |
| H3 (Subsection) | 18-20 px | Medium    | `text-lg font-medium`   | Card titles, table headers |
| Body            | 14-16 px | Regular   | `text-sm`               | Main text                  |
| Caption         | 12-13 px | Regular   | `text-xs`               | Metadata, timestamps       |

### Line Height

```css
leading-tight     /* 1.25 - for headings */
leading-normal    /* 1.5 - for regular text */
leading-relaxed   /* 1.625 - for long text */
```

---

## Spacing

### Tailwind Spacing Scale

```css
/* Micro */
p-0.5, p-1, p-1.5, p-2    /* 2-8px */

/* Standard */
p-2, p-2.5, p-3, p-4      /* 8-16px */

/* Large */
p-6, p-8, p-12, p-16      /* 24-64px */
```

### Gap Scale

```css
gap-1      /* 4px - minimal gap */
gap-2      /* 8px - standard for icons */
gap-2.5    /* 10px - navigation gap */
gap-3      /* 12px - cards gap */
gap-4      /* 16px - large gap */
```

---

## Components

### Buttons

#### Primary Button (Rarely Used)

```tsx
<button className="flex items-center gap-2 rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800">
  <Icon className="h-4 w-4" />
  <span>Action</span>
</button>
```

#### Secondary Button (Standard)

```tsx
<button className="flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50">
  <Icon className="h-4 w-4" />
  <span>Action</span>
</button>
```

#### Icon Button

```tsx
<button className="flex h-7 w-7 items-center justify-center rounded hover:bg-zinc-100 transition-colors">
  <Icon className="h-4 w-4 text-zinc-500" />
</button>
```

#### Icon Button (Large)

```tsx
<button className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-zinc-100 transition-colors">
  <Icon className="h-[18px] w-[18px] text-zinc-500" />
</button>
```

### Navigation Items

```tsx
<div className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900">
  <Icon className="h-[18px] w-[18px]" />
  <span>Label</span>
</div>

/* Active state */
<div className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors bg-zinc-100 text-zinc-900 font-medium">
  <Icon className="h-[18px] w-[18px]" />
  <span>Label</span>
</div>
```

### Input Fields

```tsx
<input
  type="text"
  className="flex-1 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-300"
  placeholder="Placeholder..."
/>
```

### Cards

```tsx
<div className="rounded-lg border border-zinc-100 bg-white p-4">{/* Content */}</div>
```

### Page Headers

```tsx
<div className="border-b border-zinc-100 px-4 py-2">
  <div className="flex items-center gap-3">
    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
      <Icon className="h-6 w-6" />
    </div>
    <h1 className="text-3xl font-bold text-zinc-900">Page Title</h1>
  </div>
</div>
```

---

## Iconography

### Sizes

| Context       | Size | Tailwind Class      |
| ------------- | ---- | ------------------- |
| Small buttons | 16px | `h-4 w-4`           |
| Navigation    | 18px | `h-[18px] w-[18px]` |
| Page icons    | 24px | `h-6 w-6`           |
| Large icons   | 32px | `h-8 w-8`           |

### Colors

```css
text-zinc-400  /* Disabled */
text-zinc-500  /* Default */
text-zinc-600  /* Emphasized */
text-zinc-700  /* Strong */
text-zinc-900  /* Primary */
```

### Style Guidelines

- Minimalistic design
- Rounded corners
- Consistent stroke width
- Outline or duotone style

---

## Borders & Shadows

### Borders

```css
border-zinc-100        /* Thin dividers */
border-zinc-200        /* Standard borders */
border-zinc-200/60     /* Semi-transparent (for panels) */
border-zinc-300        /* Hover/focus states */
```

### Border Radius

```css
rounded-md    /* 6px - standard */
rounded-lg    /* 8px - for cards */
rounded-full  /* Circle elements (avatars) */
```

### Shadows

Use sparingly! Notion uses minimal shadows.

```css
/* Only for modals and dropdowns */
shadow-sm     /* Very light */
shadow-md     /* Medium */
```

---

## Transitions

```css
transition-colors       /* Color changes */
transition-all          /* Complex changes */
duration-200           /* 200ms - standard speed */
```

---

## Layout

### Panels

```css
/* Left Panel */
width: 56px (collapsed) | 180-400px (expanded, resizable)
min-width: 180px
max-width: 400px

/* Right Panel */
width: 44px (collapsed) | 280-600px (expanded, resizable)
min-width: 280px
max-width: 600px
```

### Resize Handles

```tsx
<div className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500/20 active:bg-blue-500/30 group z-10">
  <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
    <GripVertical className="h-4 w-4 text-zinc-400" />
  </div>
</div>
```

---

## Accessibility

### ARIA Labels

Always add `aria-label` for icon-only buttons:

```tsx
<button aria-label="Close">
  <X className="h-4 w-4" />
</button>
```

### Focus States

```css
focus:outline-none
focus:ring-1
focus:ring-zinc-300
focus-visible:ring-1
focus-visible:ring-zinc-400
```

### General Guidelines

- Contrast meets WCAG AA
- Status colors always paired with icons or text
- Minimum touch target: 44px
- Keyboard focus states clearly visible

---

## Best Practices

### DO ✅

- Use zinc palette for all grays
- Apply semi-transparent borders (`/60`) for panels
- Use `text-sm` as standard text size
- Add `transition-colors` for interactive elements
- Use `gap-2.5` for navigation elements
- Make navigation icons `h-[18px] w-[18px]`

### DON'T ❌

- Don't use bright colors (blue, red) without necessity
- Don't use shadows unless absolutely necessary
- Don't make padding too large
- Don't use `text-base` or larger for regular text
- Don't use `border-gray-*` - only `border-zinc-*`
- Don't make small icons (`h-3 w-3`) in main navigation

---

## Examples

### Sidebar Item

```tsx
<Link href="/dashboard">
  <div className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900">
    <LayoutDashboard className="h-[18px] w-[18px]" />
    <span>Dashboard</span>
  </div>
</Link>
```

### Page Layout

```tsx
<div className="h-full">
  {/* Header */}
  <div className="border-b border-zinc-100 px-4 py-2">
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
        <Icon className="h-6 w-6" />
      </div>
      <h1 className="text-3xl font-bold text-zinc-900">Page Title</h1>
    </div>
  </div>

  {/* Content */}
  <div className="px-16 py-8">
    <p className="text-sm text-zinc-500 leading-relaxed">Content goes here</p>
  </div>
</div>
```

---

## Quick Reference

### Color Mapping

| Purpose         | Color System   | Example Classes                           |
| --------------- | -------------- | ----------------------------------------- |
| Backgrounds     | zinc           | `bg-zinc-50`, `bg-white`                  |
| Text            | zinc           | `text-zinc-900`, `text-zinc-500`          |
| Borders         | zinc           | `border-zinc-200`, `border-zinc-100`      |
| Primary Actions | zinc-900       | `bg-zinc-900`, `hover:bg-zinc-800`        |
| Charts/Status   | blue/green/red | `#1A73E8`, `#34A853`, `#EA4335`           |
| Hover States    | zinc           | `hover:bg-zinc-50`, `hover:text-zinc-900` |

### Component Checklist

- [ ] Buttons use `rounded-md`, `transition-colors`
- [ ] Icons are `h-4 w-4` (small) or `h-[18px] w-[18px]` (navigation)
- [ ] Text is `text-sm` by default
- [ ] Cards have `border-zinc-100`, `bg-white`
- [ ] Focus states have `focus:ring-zinc-300`
- [ ] ARIA labels on icon-only buttons

---

**Version:** 2.0 (Merged)
**Date:** 2026-01-26
