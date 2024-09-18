// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true, // Ensure this is set if you use the App Directory
    },
    output: 'export', // Export static HTML
    images: {
      unoptimized: true, // Disable image optimization
      domains: ['lh3.googleusercontent.com'], // Allow external image domains
    },
  };
  
  module.exports = nextConfig;
  