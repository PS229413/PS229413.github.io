/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
}
module.exports = {
    output: 'export', // Allows Next.js to export static HTML
    distDir: 'out', // Optional: to specify a custom build directory
  };

