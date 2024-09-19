"use client";

/* eslint-disable react/display-name */
import { Button, Link } from "@nextui-org/react";
import NextLink from "next/link";

import { title, subtitle, titleWrapper, sectionWrapper } from "@/components/primitives";
import { GradientBox } from "@/components/gradient-box";
import Image from "next/image";

export const Customization = () => {
  return (
    <section className={sectionWrapper({ class: "mt-16 lg:mt-44" })}>
      <div className="flex flex-col gap-8">
        <div>
          <div className={titleWrapper({ class: "inline md:block" })}>
            <h1 className={title({ size: "lg" })}>Protect Your Family</h1>
            <div className="mt-4">
              <h1 className={title({  size: "lg", color: "blue" })}>with CicadaVPN's Family Filter.</h1>
            </div>
          </div>
          <p className={subtitle()}>
            CicadaVPN's Family Filter feature allows you to block inappropriate content and ensure a safe browsing experience for everyone in your household. With just one click, you can activate the filter, giving you peace of mind that your family is protected online.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Image
            src="/images/family.png" // Update with the correct image path
            alt="Family using CicadaVPN's Family Filter"
            width={500}
            height={320}
            className="rounded-lg"
          />
          <div className="flex flex-col justify-center gap-6">
            <GradientBox
              isCentered
              className="h-full min-h-[320px] py-12 px-8"
              color="green"
              to="top-right"
            >
              <p className="md:text-4xl sm:text-xl text-white">
                Keep your family safe by blocking harmful websites and content. The Family Filter feature is easy to use, customizable, and ensures your children are only exposed to content you approve.
              </p>
            </GradientBox>
          </div>
        </div>
        <div className="flex w-1/2 justify-start">
          <Button
            aria-label="Learn more about the Family Filter"
            as={NextLink}
            className="max-w-fit bg-blue-100 text-blue-500 dark:bg-blue-200 dark:text-blue-900"
            href="/docs/features/familyfilter"
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
