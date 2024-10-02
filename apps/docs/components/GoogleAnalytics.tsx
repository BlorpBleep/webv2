"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", "G-V5G9WX7FT1", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-V5G9WX7FT1`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V5G9WX7FT1', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
