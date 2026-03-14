import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media2.edu.metropolia.fi',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;