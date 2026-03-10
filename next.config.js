/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: 'C:/Users/Fatih/Documents/GitHub/blognext/Fatih-Inan-Web-Developer-Blog',
  reactStrictMode: true,
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
};

module.exports = nextConfig;