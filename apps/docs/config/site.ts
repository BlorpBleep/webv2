export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "CicadaVPN |The best VPN service for ultimate performance",
  description: "Get 63% off CicadaVPN + 3 months free for a friend",
  ogImage: "https://nextui.org/twitter-cards/nextui.jpeg",
  author: "Junior Garcia",
  email: "jrgarciadev@gmail.com",
  siteUrl: "https://nextui.org",
  creator: "@getnextui",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nextui.org",
    siteName: "NextUI",
    description: "The best online VPN service for ultimate performance | cicadaVPN",
    images: [
      {
        url: "https://nextui.org/twitter-cards/nextui.jpeg",
        width: 1200,
        height: 630,
        alt: "NextUI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CicadaVPN |The best VPN service for ultimate performance",
    description: "CicadaVPN |The best VPN service for ultimate performance",
    image: "https://nextui.org/twitter-cards/nextui.jpeg",
    creator: "@getnextui",
  },
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui-docs-v2.vercel.app",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
    portfolio: "https://jrgarciadev.com",

  },
};
