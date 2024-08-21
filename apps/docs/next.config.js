const withContentlayer = require("next-contentlayer").withContentlayer;

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@nextui-org/react", "@nextui-org/theme"],
  swcMinify: true,
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  redirects: async () => [
    {
      source: '/privacy',
      destination: '/docs/policies/privacy',
      permanent: true,
    },
    ...(await require("./next-redirect.js")())
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "opencollective-production.s3.us-west-1.amazonaws.com",
      "avatars.githubusercontent.com",
      "logo.clearbit.com",
      "i.pravatar.cc",
      "nextui.org",
    ],
  },
};

module.exports = withContentlayer(nextConfig);
