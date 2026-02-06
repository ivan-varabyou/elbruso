/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@elbruso/frontend", "@elbruso/devtools"],
  env: {
    NEXT_PUBLIC_API_URL: "http://localhost:7100",
    NEXT_PUBLIC_ADMIN_API_URL: "http://localhost:7100/v1/admin",
  },
};

export default nextConfig;
