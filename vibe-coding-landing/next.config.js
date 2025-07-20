/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Netlify deployment
  output: 'export',
  trailingSlash: true,
  
  // Image optimization (disabled for static export)
  images: {
    unoptimized: true, // Required for static export
  },
  
  // Simplified configuration
  experimental: {
    // Remove optimizeCss temporarily
    // optimizeCss: true,
    optimizePackageImports: ['@/components/ui', '@/lib'],
  },
  
  // Basic webpack configuration
  webpack: (config, { dev, isServer }) => {
    return config
  },
  
  // Compression
  compress: true,
  
  // Powered by header
  poweredByHeader: false,
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig 