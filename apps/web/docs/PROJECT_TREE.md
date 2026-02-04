# Структура проекта web

Генерировано: Чт 05 фев 2026 00:44:52 +03

/home/ivan/git/elbruso/apps/web
├── assets
│   └── img
│       ├── login-bg.jpg
│       └── logo.svg
├── dictionaries
│   ├── en.json
│   └── ru.json
├── docs
│   ├── COMPONENT_SYSTEM.md
│   ├── MIGRATION_TABLE.md
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
│   │   │   │       └── page.tsx
│   │   │   ├── tables-test
│   │   │   │   └── page.tsx
│   │   │   ├── workspace
│   │   │   │   ├── [workspaceId]
│   │   │   │   │   └── page.tsx
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
│   │       │   ├── Brands.smart.tsx
│   │       │   └── index.ts
│   │       ├── ChartsShowcase
│   │       │   ├── ChartsShowcase.smart.tsx
│   │       │   └── index.ts
│   │       ├── DataWavesBackground
│   │       │   ├── DataWavesBackground.smart.tsx
│   │       │   └── index.ts
│   │       ├── Footer
│   │       │   ├── Footer.smart.tsx
│   │       │   └── index.ts
│   │       ├── Header
│   │       │   ├── Header.smart.tsx
│   │       │   └── index.ts
│   │       ├── Hero
│   │       │   ├── Hero.smart.tsx
│   │       │   └── index.ts
│   │       ├── HomePage
│   │       │   ├── HomePage.tsx
│   │       │   └── index.ts
│   │       ├── InteractiveGrid
│   │       │   ├── index.ts
│   │       │   └── InteractiveGrid.smart.tsx
│   │       ├── LiveSportsChart
│   │       │   ├── chartConfig.constant.ts
│   │       │   ├── index.ts
│   │       │   └── LiveSportsChart.smart.tsx
│   │       └── ProductsShowcase
│   │           ├── index.ts
│   │           └── ProductsShowcase.smart.tsx
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

41 directories, 75 files
