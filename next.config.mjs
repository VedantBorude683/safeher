/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  /*
   * Rewrite all paths that don't match a real Next.js route back to `/`.
   * This lets react-router-dom (BrowserRouter) handle client-side routing
   * without getting a 404 on hard reload or direct URL access.
   */
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/',
      },
    ]
  },
}

export default nextConfig
