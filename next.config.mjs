/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    optimizePackageImports: ["@/components/ui", "@/common"],
  },
}

export default nextConfig
