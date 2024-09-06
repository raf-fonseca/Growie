//TODO: update this to use remotePatterns
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com', 
      'lh3.googleusercontent.com', 
      'res.cloudinary.com'
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  output: "export"
};


export default nextConfig;
