/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@elbruso/shared", "@elbruso/types", "@elbruso/devtools"],
  // Отключаем Turbopack для стабильности
  // turbo: {},
};

export default nextConfig;
