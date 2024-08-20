"use client";

import NextLink from "next/link";
import {Button, Chip} from "@nextui-org/react";
import {ArrowRightIcon} from "@nextui-org/shared-icons";
import dynamic from "next/dynamic";

import {FloatingComponents} from "./floating-components";

import {title, subtitle} from "@/components/primitives";
import {trackEvent} from "@/utils/va";

const BgLooper = dynamic(() => import("./bg-looper").then((mod) => mod.BgLooper), {
  ssr: false,
});

export const Hero = () => {
  const handlePressAnnouncement = (name: string, url: string) => {
    trackEvent("NavbarItem", {
      name,
      action: "press",
      category: "home - hero",
      data: url,
    });
  };

  return (
    <section className="flex relative overflow-hidden w-screen h-screen justify-end items-center">
  
  {/* Video Background */}
  <video 
    autoPlay 
    loop 
    muted 
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
    src="video.mp4" // Ensure the path is correct
  />

<div className="flex relative z-10 flex-col gap-6 w-full max-w-2xl lg:w-3/4 xl:mt-10 px-8 md:px-12 lg:px-16">
<div className="text-left leading-8 md:leading-10">
      <div className="inline-block">
        <h1 className={title({color: "violet"})}>Get 63% off&nbsp;</h1>
        <h1 className={title()}>CicadaVPN + 3 months free&nbsp;</h1>
        <h1 className={title({color: "blue"})}>for a friend</h1>
      </div>
    </div>

    <h2 className={subtitle({fullWidth: true, class: "text-left"})}>
      Choose a 2-year plan, gift your friend 3 months CicadaVPN protection free.
    </h2>

    <div className="flex flex-col md:flex-row items-start gap-4">
      <Button
        as={NextLink}
        className="w-full md:h-11 md:w-auto"
        color="primary"
        endContent={
          <ArrowRightIcon
            className="group-data-[hover=true]:translate-x-0.5 outline-none transition-transform"
            strokeWidth={2}
          />
        }
        href="/docs/guide/introduction"
        radius="full"
        size="lg"
        onPress={() => {
          trackEvent("Hero - Get Started", {
            name: "Get Started",
            action: "click",
            category: "landing-page",
            data: "/docs/guide/introduction",
          });
        }}
      >
        Get the Deal
      </Button>

      <Button
        as={NextLink}
        className="w-full md:h-11 md:w-auto"
        color="secondary"
        href="/docs/guide/introduction"
        radius="full"
        size="lg"
        onPress={() => {
          trackEvent("Hero - Get Started", {
            name: "Free Trial",
            action: "click",
            category: "landing-page",
            data: "/docs/guide/introduction",
          });
        }}
      >
        Try free for 7 days
      </Button>
    </div>
  </div>


</section>

  
  );
};
