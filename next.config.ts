import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2400],
  },
  async redirects() {
    return [
      { source: '/work', destination: '/portfolio', permanent: true },
      { source: '/work/tharif-zahraa', destination: '/portfolio/tharif-zahraa', permanent: true },
      { source: '/work/:path*', destination: '/portfolio', permanent: true },
      { source: '/services/:path+', destination: '/services', permanent: true },
    ]
  },
}

export default nextConfig
