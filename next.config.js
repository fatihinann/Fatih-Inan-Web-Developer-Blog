/** @type {import('next').NextConfig} */
const nextConfig = {
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