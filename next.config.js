/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

module.exports = nextConfig;