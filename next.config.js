/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.schema.io'],
  },
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
        config.resolve.fallback = {
            fs: false
        }
    }

    return config;
}
}


module.exports = nextConfig