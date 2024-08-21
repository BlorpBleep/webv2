"use client";

import { Icon } from "@iconify/react/dist/offline";
import arrowRightIcon from "@iconify/icons-solar/arrow-right-linear";
import type { SVGProps } from 'react';
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { trackEvent } from "@/utils/va";
import emitter from "@/libs/emitter";

// Define the SVG component
export function SolarLockKeyholeUnlockedBoldDuotone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" style={{ verticalAlign: 'middle', marginLeft: '0.3em' }} {...props}>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#D6009A', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#8a56cc', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#D6009A', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path fill="url(#gradient)" d="M2 16c0-2.828 0-4.243.879-5.121C3.757 10 5.172 10 8 10h8c2.828 0 4.243 0 5.121.879C22 11.757 22 13.172 22 16s0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16" opacity={0.5}></path>
      <path fill="url(#gradient)" d="M12 18a2 2 0 1 0 0-4a2 2 0 0 0 0 4M6.75 8a5.25 5.25 0 0 1 10.335-1.313a.75.75 0 0 0 1.452-.374A6.75 6.75 0 0 0 5.25 8v2.055a24 24 0 0 1 1.5-.051z"></path>
    </svg>
  );
}

const hideOnPaths = ["examples"];

export const ProBanner = () => {
  const handleClick = () => {
    trackEvent("NextUI Pro Banner", {
      action: "click",
      category: "landing-page",
    });
  };

  const pathname = usePathname();
  const shouldBeVisible = !hideOnPaths.some((path) => pathname.includes(path));

  useEffect(() => {
    if (!shouldBeVisible) return;

    const handleScroll = () => {
      if (window.scrollY < 48) {
        emitter.emit("proBannerVisibilityChange", "visible");
      } else {
        emitter.emit("proBannerVisibilityChange", "hidden");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [shouldBeVisible]);

  if (!shouldBeVisible) return null;

  return (
    <div className="relative z-50 isolate flex items-center gap-x-6 overflow-hidden bg-background border-b-1 border-divider px-6 py-1 sm:px-3.5 sm:before:flex-1">
      <div
        aria-hidden="true"
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] dark:from-[#F54180] dark:to-[#338EF7] opacity-20 dark:opacity-10"
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r  from-[#ff80b5] to-[#9089fc] dark:from-[#F54180] dark:to-[#338EF7]  opacity-30 dark:opacity-20"
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
        />
      </div>

      <div className="flex w-full items-center justify-between md:justify-center gap-x-3">
        <a
          className="text-small flex items-end sm:text-[0.93rem] text-foreground hover:opacity-80 transition-opacity"
          href="https://nextui.pro?utm_source=nextui.org&utm_medium=top-banner"
          rel="noopener noreferrer"
          target="_blank"
          onClick={handleClick}
        >

          <span
            className="inline-flex md:ml-1 animate-text-gradient font-medium bg-clip-text text-transparent bg-[linear-gradient(90deg,#D6009A_0%,#8a56cc_50%,#D6009A_100%)] dark:bg-[linear-gradient(90deg,#FFEBF9_0%,#8a56cc_50%,#FFEBF9_100%)]"
            style={{
              fontSize: "inherit",
              backgroundSize: "200%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            🕵️‍♂️ 188.26.211.91 🔓
            <span className="hidden px-1 md:inline">UNPROTECTED!</span>

          </span>
        </a>
        <a
          className="flex group min-w-[120px] items-center font-semibold text-foreground shadow-sm gap-1.5 relative overflow-hidden rounded-full p-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          href="https://nextui.pro?utm_source=nextui.org&utm_medium=top-banner"
          rel="noopener noreferrer"
          onClick={handleClick}
        >
          <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F54180_0%,#338EF7_50%,#F54180_100%)]" />
          <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background group-hover:bg-background/70 transition-background px-3 py-1 text-sm font-medium text-foreground backdrop-blur-3xl">
            Get Started
            <Icon
              aria-hidden="true"
              className="outline-none transition-transform group-hover:translate-x-0.5 [&>path]:stroke-[2px]"
              icon={arrowRightIcon}
              width={16}
            />
          </div>
        </a>
      </div>
    </div>
  );
};
