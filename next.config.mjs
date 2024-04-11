/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "fakeimg.pl",
        pathname: "**",
      },
    ],
  },
}

export default nextConfig;
