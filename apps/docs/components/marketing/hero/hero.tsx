"use client";

import NextLink from "next/link";
import { Button } from "@nextui-org/react";
import { ArrowRightIcon } from "@nextui-org/shared-icons";
import dynamic from "next/dynamic";

import { title, subtitle } from "@/components/primitives";
import { trackEvent } from "@/utils/va";

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
    <section className="relative overflow-hidden w-screen h-screen flex flex-col justify-between items-center">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="video_8njVpHML.mp4" // Ensure the path is correct
      />

      {/* Hero Text Container */}
      <div className="absolute top-[10%] left-0 right-0 z-10 px-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-2xl lg:max-w-3/4 text-center">
          <div className="leading-8 md:leading-10">
            <h1 className={title({ color: "violet" })}>Get 63% off&nbsp;</h1>
            <h1 className={title()}>CicadaVPN + 3 months free&nbsp;</h1>
            <h1 className={title({ color: "blue" })}>for a friend</h1>
          </div>
          <h2 className={subtitle({ fullWidth: true, class: "text-center mt-4 text-white" })}>
            Choose a 2-year plan, gift your friend 3 months CicadaVPN protection free.
          </h2>
        </div>
      </div>

      {/* Buttons positioned up by 30% from the bottom */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 absolute bottom-[18%] w-full z-10 px-4 md:px-0">
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
    </section>
  );
};
