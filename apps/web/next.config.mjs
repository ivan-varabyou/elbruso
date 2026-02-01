/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@shared", "@elbruso/types", "@devtools"],
};

export default nextConfig;
