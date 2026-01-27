/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@shared", "@elbruso/types", "@elbruso/debug"],
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.module.rules.push({
        test: /\.(tsx|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "@elbruso/path-copier/dist/loader.js",
          },
        ],
      });
    }
    return config;
  },
};

export default nextConfig;
