/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Allow local network access for mobile testing
  allowedDevOrigins: [
    'http://192.168.1.92:3000',
    'http://localhost:3000',
  ],
}

export default nextConfig
