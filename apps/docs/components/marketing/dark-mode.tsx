"use client";

/* eslint-disable react/display-name */
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import NextLink from "next/link";

import { GradientBox } from "@/components";
import { title, subtitle, titleWrapper, sectionWrapper } from "@/components/primitives";

const teamsFeatures = [
  {
    title: "Centralized Management",
    description: "Easily manage team members, add or remove users, and allocate VPN access centrally.",
    link: "/teams",
  },
  {
    title: "Flexible Billing",
    description: "Manage billing and invoicing from a single portal, with flexible subscription options for your team.",
    link: "/teams",
  },
  {
    title: "Team Member Benefits",
    description: "Team members retain VPN benefits, even when removed from the team account.",
    link: "/teams",
  },
  {
    title: "Subscription Sharing",
    description: "Share your subscription across multiple members without any additional cost.",
    link: "/teams",
  },
  {
    title: "Admin Control",
    description: "Full administrative control over team settings, security policies, and user permissions.",
    link: "/teams",
  },
  {
    title: "Easy Onboarding",
    description: "Quick and easy onboarding for new team members with minimal setup required.",
    link: "/teams",
  },
];

export const DarkMode = () => {
  return (
    <section id="teams" className={sectionWrapper({ class: "mt-16 lg:mt-44" })}>
      <div className="flex flex-col gap-8">
        <div>
          <div className={titleWrapper()}>
            <h1 className={title({ size: "lg" })}>CicadaVPN for Teams</h1>
            <div className="mt-4">
              <h1 className={title({ size: "lg", color: "yellow" })}>Manage Your Team with Ease.</h1>
            </div>
          </div>
          <p className={subtitle()}>
            CicadaVPN’s Teams feature allows you to manage VPN access for your entire team in one place. Easily add or remove members, control permissions, and streamline billing – all from a single, intuitive dashboard.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* 2-column, 3-row grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamsFeatures.map((feature, index) => (
              <Link key={index} href={feature.link}>
                <div className="bg-white dark:bg-default-400/10 p-4 rounded-lg shadow-md cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 transition-all duration-200 h-full flex flex-col">
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-default-500 dark:text-default-400 flex-grow">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
          {/* Image on the right side, centered */}
          <GradientBox
            className="h-full min-h-[320px] py-2 px-1 flex justify-center items-center"
            color="orange"
            to="top-right"
          >
            <Image
              src="/images/teams.png" // Update with the correct image path
              alt="CicadaVPN Teams"
              width={490}
              height={490}
              className="rounded-lg"
            />
          </GradientBox>
        </div>
        <div className="flex w-1/2 justify-start">
          <Button
            aria-label="Learn more about CicadaVPN's Teams features"
            as={NextLink}
            className="max-w-fit bg-orange-300 text-orange-700 dark:bg-orange-200 dark:text-orange-900"
            href="/teams"
            radius="full"
            size="md"
            variant="flat"
          >
            Learn more
          </Button>
        </div>
      </div>
    </section>
  );
};