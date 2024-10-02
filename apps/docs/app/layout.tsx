import "@/styles/globals.css";
import "@/styles/sandpack.css";
import { Metadata } from "next";
import { clsx } from "@nextui-org/shared-utils";

import { Providers } from "./providers";
import { Cmdk } from "@/components/cmdk";
import manifest from "@/config/routes.json";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProBanner } from "@/components/pro-banner";
import GoogleAnalytics from "@/components/GoogleAnalytics"; // Import the Google Analytics component

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Cicada",
    "VPN",
    "Tailwind CSS",
    "NextUI",
    "React Aria",
    "Server Components",
    "React Components",
    "UI Components",
    "UI Kit",
    "UI Library",
    "UI Framework",
    "UI Design System",
  ],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  twitter: siteConfig.twitter,
  openGraph: siteConfig.openGraph,
  authors: [
    {
      name: "dawatere",
      url: "https://cicadavpn.com",
    },
  ],
  creator: "dawatere",
  alternates: {
    canonical: "https://cicadavpn.com",
    types: {
      "application/rss+xml": [{ url: "https://cicadavpn.com/feed.xml", title: "cicadavpn RSS Feed" }],
    },
  },
  viewport:
    "viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
  metadataBase: new URL("https://cicadavpn.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning dir="ltr" lang="en">
      <head />
      <body className={clsx("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "system" }}>
          <GoogleAnalytics /> {/* Add Google Analytics tracking */}
          <div className="relative flex flex-col min-h-screen">
            <ProBanner />
            <Navbar mobileRoutes={manifest.mobileRoutes} routes={manifest.routes} />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Cmdk />
        </Providers>
      </body>
    </html>
  );
}
