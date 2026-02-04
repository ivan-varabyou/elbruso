# Структура проекта web

Генерировано: Ср 04 фев 2026 09:05:28 +03

/home/ivan/git/elbruso/apps/web
├── assets
│   └── img
│       ├── login-bg.jpg
│       └── logo.svg
├── dictionaries
│   ├── en.json
│   └── ru.json
├── docs
│   └── PROJECT_TREE.md
├── public
│   ├── assets
│   │   └── img
│   │       └── login-bg.jpg
│   ├── images
│   │   └── auth-bg.jpg
│   ├── apple-touch-icon.png
│   ├── favicon-96x96.png
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── russia.geojson
│   ├── site.webmanifest
│   ├── web-app-manifest-192x192.png
│   └── web-app-manifest-512x512.png
├── src
│   ├── app
│   │   ├── (auth)
│   │   │   ├── forgot-password
│   │   │   │   └── page.tsx
│   │   │   ├── login
│   │   │   │   ├── login.css
│   │   │   │   └── page.tsx
│   │   │   ├── register
│   │   │   │   ├── page.tsx
│   │   │   │   └── register.css
│   │   │   ├── reset-password
│   │   │   │   └── page.tsx
│   │   │   ├── AUTH_CONFIG.md
│   │   │   ├── AuthStats.css
│   │   │   ├── AuthStats.tsx
│   │   │   └── layout.tsx
│   │   ├── (profile)
│   │   │   ├── dashboard
│   │   │   │   └── page.tsx
│   │   │   ├── indicators
│   │   │   │   └── page.tsx
│   │   │   ├── organizations
│   │   │   │   └── page.tsx
│   │   │   ├── seasons
│   │   │   │   └── page.tsx
│   │   │   ├── settings
│   │   │   │   └── page.tsx
│   │   │   ├── tables
│   │   │   │   └── [id]
│   │   │   ├── tables-test
│   │   │   │   └── page.tsx
│   │   │   ├── workspace
│   │   │   │   ├── [workspaceId]
│   │   │   │   └── page.tsx
│   │   │   ├── workspaces
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   └── home
│   │       ├── Brands
│   │       │   ├── Brands.tsx
│   │       │   └── index.ts
│   │       ├── ChartsShowcase
│   │       │   ├── ChartsShowcase.tsx
│   │       │   └── index.ts
│   │       ├── DataWavesBackground
│   │       │   ├── DataWavesBackground.tsx
│   │       │   └── index.ts
│   │       ├── Footer
│   │       │   ├── Footer.tsx
│   │       │   └── index.ts
│   │       ├── Header
│   │       │   ├── Header.tsx
│   │       │   └── index.ts
│   │       ├── Hero
│   │       │   ├── Hero.tsx
│   │       │   └── index.ts
│   │       ├── HomePage
│   │       │   ├── HomePage.tsx
│   │       │   └── index.ts
│   │       ├── InteractiveGrid
│   │       │   ├── index.ts
│   │       │   └── InteractiveGrid.tsx
│   │       ├── LiveSportsChart
│   │       │   ├── chartConfig.ts
│   │       │   ├── index.ts
│   │       │   └── LiveSportsChart.tsx
│   │       └── ProductsShowcase
│   │           ├── index.ts
│   │           └── ProductsShowcase.tsx
│   ├── pages
│   └── types
│       └── next-shim.d.ts
├── AGENT.md
├── get-dictionary.ts
├── i18n-config.ts
├── inject-source.cjs
├── middleware.ts
├── next.config.mjs
├── next-env.d.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── tsconfig.tsbuildinfo

41 directories, 71 files
