/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@elbruso/ui",
    "@elbruso/types",
    "@elbruso/debug",
    "@elbruso/shared",
  ],
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      const pathCopierPath = path.resolve(
        __dirname,
        "../../packages/path-copier/dist/loader.js",
      );
      config.module.rules.push({
        test: /\.(tsx|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: pathCopierPath,
          },
        ],
      });
    }
    return config;
  },
};

export default nextConfig;
