/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'picsum.photos', 'cdn.shopify.com', 'via.placeholder.com'],
  },
  experimental: {
    serverActions: true,
  },
}
module.exports = nextConfig