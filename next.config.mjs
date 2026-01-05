import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { 
    ignoreDuringBuilds: true,
  }
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Deduplicate React to prevent multiple instances
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        react: join(__dirname, 'node_modules', 'react'),
        'react-dom': join(__dirname, 'node_modules', 'react-dom'),
      }
    }
    return config
  },
}

export default nextConfig
