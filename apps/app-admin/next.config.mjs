/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@elbruso/frontend", "@elbruso/devtools", "hyperformula"],
  env: {
    NEXT_PUBLIC_API_URL: "http://localhost:7100",
    NEXT_PUBLIC_ADMIN_API_URL: "http://localhost:7100/v1/admin",
  },
  compiler: {
    removeConsole: false,
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /[\\/]node_modules[\\/]hyperformula[\\/]/,
      exclude: /[\\/]node_modules[\\/]hyperformula[\\/]打包/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-typescript", ["@babel/preset-env", { targets: "defaults" }]],
          plugins: [],
          sourceType: "unambiguous",
        },
      },
    });
    return config;
  },
};

export default nextConfig;
