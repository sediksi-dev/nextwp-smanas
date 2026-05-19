import type { NextConfig } from "next";

const cmsUrl = process.env.WP_URL;
const parsedCmsUrl = cmsUrl ? new URL(cmsUrl) : null;

const baseRemotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  {
    protocol: "https",
    hostname: "picsum.photos",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "loremflickr.com",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "img.youtube.com",
    pathname: "/**",
  },
];

if (parsedCmsUrl) {
  baseRemotePatterns.push({
    protocol: parsedCmsUrl.protocol.replace(":", "") as "http" | "https",
    hostname: parsedCmsUrl.hostname,
    pathname: "/**",
  });
}

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: baseRemotePatterns,
    unoptimized: true,
  },
  redirects() {
    return [
      {
        source: '/wp-admin',
        destination: 'https://dash.smanasionalmalang.sch.id/wp-admin',
        permanent: false,
      },
      {
        source: '/admin',
        destination: 'https://dash.smanasionalmalang.sch.id/wp-admin',
        permanent: false,
      },
      {
        source: '/login',
        destination: 'https://dash.smanasionalmalang.sch.id/wp-admin',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
