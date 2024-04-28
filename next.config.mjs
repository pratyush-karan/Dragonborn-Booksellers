/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["books.google.com"], // Add the hostname here
  },
};

export default nextConfig;
