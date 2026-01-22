# Auth Configuration Guide

## Quick Start

To change the login background image, edit `apps/web/src/app/(auth)/auth.config.ts`:

```typescript
export const authConfig = {
  backgrounds: {
    login: '/assets/img/your-new-image.jpg',
    register: '/assets/img/register-bg.jpg',
  },
  // ...
};
```

## Configuration Options

### Background Images

```typescript
backgrounds: {
  login: '/assets/img/login-bg.jpg',      // Login page background
  register: '/assets/img/login-bg.jpg',   // Register page background
}
```

**How to change:**
1. Add your image to `apps/web/public/assets/img/`
2. Update the path in config
3. Restart dev server

### Gradient Overlay

```typescript
gradientOverlay: {
  enabled: true,                          // Toggle overlay on/off
  opacity: 0.85,                          // 0-1, affects readability
  colors: {
    start: 'rgba(102, 126, 234, 0.85)',  // Top-left color
    end: 'rgba(118, 75, 162, 0.85)',     // Bottom-right color
  },
}
```

### Decorative Circles

```typescript
decorations: {
  enabled: true,                          // Toggle decorations on/off
  circles: [
    { size: 400, top: -100, right: -100, animation: '20s' },
    { size: 300, bottom: -50, left: '10%', animation: '15s' },
    { size: 200, top: '50%', left: '50%', animation: '25s' },
  ],
}
```

### Layout

```typescript
layout: {
  leftPanelWidth: '40%',   // Form panel width
  rightPanelWidth: '60%',  // Background panel width
}
```

## Examples

### Dark Theme
```typescript
gradientOverlay: {
  enabled: true,
  opacity: 0.9,
  colors: {
    start: 'rgba(17, 24, 39, 0.9)',
    end: 'rgba(31, 41, 55, 0.9)',
  },
}
```

### No Overlay (Pure Image)
```typescript
gradientOverlay: {
  enabled: false,
}
```

### Minimal Decorations
```typescript
decorations: {
  enabled: false,
}
```

## Best Practices

1. **Image Size**: Recommended 1920x1080 or higher
2. **File Format**: Use `.jpg` for photos, `.png` for graphics
3. **File Size**: Optimize images to < 500KB for faster loading
4. **Contrast**: Ensure text is readable over the background
