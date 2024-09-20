"use client";

/* eslint-disable react/display-name */
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

import { GradientBox } from "@/components";
import { title, subtitle, titleWrapper, sectionWrapper } from "@/components/primitives";

const cicadaFeatures = [
  {
    title: "SwitchGuard",
    description: "Seamlessly switch between servers without disconnecting.",
    link: "/docs/features/switchguard",
  },
  {
    title: "ThreatBlocker",
    description: "Automatically block malicious websites and potential threats.",
    link: "/docs/features/threatblocker",
  },
  {
    title: "SpeedBoost",
    description: "Optimize your connection for faster speeds and performance.",
    link: "/docs/features/speedboost",
  },
  {
    title: "AdDefender",
    description: "Block annoying ads and pop-ups across all your devices.",
    link: "/docs/features/addefender",
  },
  {
    title: "TwinShield",
    description: "Dual-layer protection to keep your data safe at all times.",
    link: "/docs/features/twinshield",
  },
  {
    title: "CustomDNS",
    description: "Customize your DNS settings for enhanced security and control.",
    link: "/docs/features/customdns",
  },
];

export const A11yOtb = () => {
  return (
    <section className={sectionWrapper({ class: "mt-16 lg:mt-44" })}>
      <div className="flex flex-col gap-8">
        <div>
          <div className={titleWrapper()}>
            <h1 className={title({ size: "lg" })}>Feature-Rich and Secure</h1>
            <div className="mt-4">
              <h1 className={title({ size: "lg", color: "blue" })}>CicadaVPN Does Everything You Need.</h1>
            </div>
          </div>
          <p className={subtitle()}>
            Privacy, speed, or advanced features, CicadaVPN has it all. Explore our features for your online security & content access needs.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* 2-column, 3-row grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cicadaFeatures.map((feature, index) => (
              <Link key={index} href={feature.link}>
                <div className="bg-white dark:bg-default-400/10 p-4 rounded-lg shadow-md cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 transition-all duration-200">
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-default-500 dark:text-default-400">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
          {/* Image on the right side, centered */}
          <GradientBox
            className="h-full min-h-[320px] py-2 px-4 flex justify-center items-center"
            color="green"
            to="top-right"
          >
            <Image
              src="/images/features.png" // Update with the correct image path
              alt="CicadaVPN Features"
              width={420}
              height={420}
              className="rounded-lg"
            />
          </GradientBox>
        </div>
        <div className="flex w-1/2 justify-start">
          <Button
            aria-label="Learn more about CicadaVPN's features"
            as={Link}
            className="max-w-fit mt-2 bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-300"
            href="/docs/features/switchguard"
            radius="full"
            size="sm"
            variant="flat"
          >
            Learn more
          </Button>
        </div>
      </div>
    </section>
  );
};
