import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['storage.googleapis.com', 'coinpayments.net', 'via.placeholder.com'],
    minimumCacheTTL: 1500000,
  },
};

export default nextConfig;
