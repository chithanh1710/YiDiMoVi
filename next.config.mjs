/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "phim.nguonc.com",
        port: "",
        pathname: "/public/images/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
