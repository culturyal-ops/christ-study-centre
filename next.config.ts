import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  // Prevent Next from using C:\Users\eathe\ as the workspace root (wrong lockfile).
  turbopack: {
    root: path.resolve(__dirname),
  },
  serverExternalPackages: [
    '@prisma/client',
    '@prisma/adapter-neon',
    '@neondatabase/serverless',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
}

export default nextConfig
