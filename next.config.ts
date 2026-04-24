import type { NextConfig } from "next";

const cmsUrl = process.env.NEXT_PUBLIC_WP_URL;
const parsedCmsUrl = cmsUrl ? new URL(cmsUrl) : null;

const nextConfig: NextConfig = {
  images: parsedCmsUrl
    ? {
      remotePatterns: [
        {
          protocol: parsedCmsUrl.protocol.replace(":", "") as "http" | "https",
          hostname: parsedCmsUrl.hostname,
          pathname: "/**",
        },
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
          hostname: "loremflickr.com",
          pathname: "/**",
        }
      ],
    }
    : undefined,
};

export default nextConfig;
