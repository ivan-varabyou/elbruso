# Elbruso Design System

## Обзор

Дизайн-система Elbruso основана на Tailwind CSS и следует принципам минимализма Notion.so. Этот документ определяет стандарты для всех UI компонентов проекта.

## Цветовая палитра

### Основные цвета (Zinc)

Используем палитру `zinc` для создания чистого, профессионального интерфейса:

```css
/* Backgrounds */
--bg-primary: zinc-50      /* Основной фон приложения */
--bg-secondary: white      /* Фон панелей и карточек */
--bg-tertiary: zinc-100    /* Hover states, subtle backgrounds */

/* Text */
--text-primary: zinc-900   /* Основной текст */
--text-secondary: zinc-700 /* Вторичный текст */
--text-tertiary: zinc-600  /* Менее важный текст */
--text-muted: zinc-500     /* Подсказки, placeholder */
--text-disabled: zinc-400  /* Отключенные элементы */

/* Borders */
--border-primary: zinc-200/60    /* Основные границы (полупрозрачные) */
--border-secondary: zinc-100     /* Тонкие разделители */
--border-hover: zinc-300         /* Hover состояние */

/* Interactive */
--interactive-bg: zinc-100       /* Активные элементы */
--interactive-hover: zinc-50     /* Hover для кнопок */
--interactive-active: zinc-200   /* Active/pressed состояние */
```

### Акцентные цвета

Используем минимально для важных действий:

```css
/* Primary Action (используем редко!) */
--accent-primary: zinc-900       /* Основные кнопки */
--accent-hover: zinc-800         /* Hover для основных кнопок */

/* Resize Handles */
--resize-hover: blue-500/20      /* Hover для resize handles */
--resize-active: blue-500/30     /* Active для resize handles */
```

## Типографика

### Шрифты

```css
font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Размеры текста

| Назначение | Class | Size | Usage |
|------------|-------|------|-------|
| Page Title | `text-3xl font-bold` | 30px | Заголовки страниц |
| Section Title | `text-xl font-semibold` | 20px | Заголовки секций |
| Subsection | `text-lg font-medium` | 18px | Подзаголовки |
| Body | `text-sm` | 14px | Основной текст |
| Small | `text-xs` | 12px | Вторичный текст |
| Tiny | `text-[11px]` | 11px | Labels, hints |
| Micro | `text-[10px]` | 10px | Badges, avatars |

### Line Height

```css
leading-tight     /* 1.25 - для заголовков */
leading-normal    /* 1.5 - для обычного текста */
leading-relaxed   /* 1.625 - для длинного текста */
```

## Spacing

### Padding & Margin

Используем шкалу Tailwind с акцентом на компактность:

```css
/* Micro spacing */
p-0.5, p-1, p-1.5, p-2

/* Standard spacing */
p-2, p-2.5, p-3, p-4

/* Large spacing */
p-6, p-8, p-12, p-16
```

### Gap

```css
gap-1      /* 4px - минимальный gap */
gap-2      /* 8px - стандартный gap для иконок */
gap-2.5    /* 10px - gap для навигации */
gap-3      /* 12px - gap для карточек */
gap-4      /* 16px - большой gap */
```

## Компоненты

### Кнопки

#### Primary Button (редко используется)

```tsx
<button className="flex items-center gap-2 rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800">
  <Icon className="h-4 w-4" />
  <span>Action</span>
</button>
```

#### Secondary Button (основной стиль)

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
<div className="rounded-lg border border-zinc-100 bg-white p-4">
  {/* Content */}
</div>
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

## Иконки

### Размеры

| Context | Size | Class |
|---------|------|-------|
| Small buttons | 16px | `h-4 w-4` |
| Navigation | 18px | `h-[18px] w-[18px]` |
| Page icons | 24px | `h-6 w-6` |
| Large icons | 32px | `h-8 w-8` |

### Цвета

```css
text-zinc-400  /* Disabled */
text-zinc-500  /* Default */
text-zinc-600  /* Emphasized */
text-zinc-700  /* Strong */
text-zinc-900  /* Primary */
```

## Borders & Shadows

### Borders

```css
border-zinc-100        /* Тонкие разделители */
border-zinc-200        /* Стандартные границы */
border-zinc-200/60     /* Полупрозрачные (для панелей) */
border-zinc-300        /* Hover/focus состояния */
```

### Border Radius

```css
rounded-md    /* 6px - стандартный радиус */
rounded-lg    /* 8px - для карточек */
rounded-full  /* Круглые элементы (аватары) */
```

### Shadows

Используем минимально! Notion почти не использует тени.

```css
/* Только для модальных окон и dropdown */
shadow-sm     /* Очень легкая тень */
shadow-md     /* Средняя тень */
```

## Transitions

```css
transition-colors       /* Для изменения цвета */
transition-all          /* Для комплексных изменений */
duration-200           /* 200ms - стандартная скорость */
```

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

## Accessibility

### ARIA Labels

Всегда добавляйте `aria-label` для кнопок без текста:

```tsx
<button aria-label="Закрыть">
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

## Best Practices

### DO ✅

- Используйте zinc-палитру для всех серых оттенков
- Применяйте полупрозрачные границы (`/60`) для панелей
- Используйте `text-sm` как стандартный размер текста
- Добавляйте `transition-colors` для интерактивных элементов
- Используйте `gap-2.5` для навигационных элементов
- Делайте иконки `h-[18px] w-[18px]` в навигации

### DON'T ❌

- Не используйте яркие цвета (blue, red) без необходимости
- Не используйте тени без крайней необходимости
- Не делайте слишком большие отступы
- Не используйте `text-base` или больше для обычного текста
- Не используйте `border-gray-*` - только `border-zinc-*`
- Не делайте маленькие иконки (`h-3 w-3`) в основной навигации

## Примеры использования

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
    <p className="text-sm text-zinc-500 leading-relaxed">
      Content goes here
    </p>
  </div>
</div>
```

## Обновления

**Версия:** 1.0  
**Дата:** 2026-01-22  
**Автор:** Elbruso Team

---

**Важно:** Этот документ является живым стандартом. При добавлении новых компонентов обязательно документируйте их здесь с примерами кода.
