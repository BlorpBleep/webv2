"use client";

import NextLink from "next/link";
import { Button, Chip } from "@nextui-org/react";
import { ArrowRightIcon } from "@nextui-org/shared-icons";
import dynamic from "next/dynamic";
import { GithubIcon } from "@/components/icons";
import { title, subtitle } from "@/components/primitives";
import { trackEvent } from "@/utils/va";
import Image from "next/image";

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
    <section className="flex relative overflow-hidden lg:overflow-visible w-full flex-nowrap translate-y-[-10%] justify-between items-center h-[calc(100vh_-_64px)] 2xl:h-[calc(84vh_-_64px)]">
      <div className="flex relative z-20 flex-col gap-6 w-full lg:w-1/2 xl:mt-10">
        <div className="w-full flex justify-center md:hidden">
          <Chip
            as={NextLink}
            className="bg-default-100/50 hover:bg-default-100 border-default-200/80 dark:border-default-100/80 transition-colors cursor-pointer"
            color="default"
            href="/blog/v2.3.0"
            variant="dot"
            onClick={() => handlePressAnnouncement("New version v2.4.0", "/blog/v2.4.0")}
          >
            New version v2.4.0&nbsp;
            <span aria-label="emoji" role="img">
              🚀
            </span>
          </Chip>
        </div>

        <div className="text-center leading-8 md:leading-10 md:text-left">
          <div className="inline-block">
            <h1 className={title()}>Get 63% off&nbsp;</h1>
            <h1 className={title({ color: "violet" })}>CicadaVPN </h1>
          </div>
          <h1 className={title({ color: "blue" })}> + 3 months free for a friend</h1>
        </div>
        <h2 className={subtitle({ fullWidth: true, class: "text-center md:text-left" })}>
          Choose a 2-year plan, gift your friend 3 months CicadaVPN protection free.
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
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
            href="/pricing"
            radius="full"
            size="lg"
            onPress={() => {
              trackEvent("Hero - Get Started", {
                name: "Get Started",
                action: "click",
                category: "landing-page",
                data: "/pricing",
              });
            }}
          >
            Get the Deal
          </Button>

          <Button
            as={NextLink}
            className="w-full md:h-11 md:w-auto"
            color="secondary"
            href="/pricing"
            radius="full"
            size="lg"
            onPress={() => {
              trackEvent("Hero - Free Trial", {
                name: "Free Trial",
                action: "click",
                category: "landing-page",
                data: "/pricing",
              });
            }}
          >
            Try free for 7 days
          </Button>
        </div>
      </div>

      {/* Right-hand side image */}
      <div className="relative z-10 w-full lg:w-1/2 flex justify-center items-center">
        <Image
          src="/images/cicada.png"
          alt="CicadaVPN"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>

      <BgLooper />
    </section>
  );
};
