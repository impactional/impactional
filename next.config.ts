import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/programs/global-youth-circle",
        destination: "https://gyc.impactional.net", // Ganti dengan domain tujuan Anda (atau '/gyc')
        permanent: false, // false = 307 (sementara), ubah ke true = 308 jika sudah permanen
      },
    ];
  },
};

export default nextConfig;