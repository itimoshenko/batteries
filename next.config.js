/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: process.env.NEXT_PUBLIC_MAIN_PAGE,
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
