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
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
