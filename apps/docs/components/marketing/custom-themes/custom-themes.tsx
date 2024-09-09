"use client";

/* eslint-disable react/display-name */
import { useMemo, useState } from "react";
import { Tabs, Tab, Card, CardBody, Image } from "@nextui-org/react";
import NextImage from "next/image";
import { FaShieldAlt, FaUserSecret, FaMobileAlt, FaLock } from "react-icons/fa";
import { shopCartStyles } from "./styles";
import { title, subtitle, sectionWrapper, titleWrapper } from "@/components/primitives";
import { useIsMobile } from "@/hooks/use-media-query";

const themesTabs = (isMobile) => [
  {
    id: "privacy",
    title: () => <p className="group-data-[selected=true]:text-primary">Privacy</p>,
    icon: () => (
      <FaShieldAlt
        className="text-default-400 group-data-[selected=true]:text-primary"
        size={isMobile ? 34 : 44}
      />
    ),
    content: {
      description: ["Keep your browsing history & data private from prying eyes."],
    },
  },
  {
    id: "anonymity",
    title: () => <p className="group-data-[selected=true]:text-secondary">Anonymity</p>,
    icon: () => (
      <FaUserSecret
        className="text-default-400 group-data-[selected=true]:text-secondary"
        size={isMobile ? 34 : 44}
      />
    ),
    content: {
      description: ["Hide your IP address to stay anonymous online."],
    },
  },
  {
    id: "devices",
    title: () => <p className="group-data-[selected=true]:text-foreground">Devices</p>,
    icon: () => (
      <FaMobileAlt
        className="text-default-400 group-data-[selected=true]:text-foreground"
        size={isMobile ? 34 : 44}
      />
    ),
    content: {
      description: ["Protect all devices with one CicadaVPN account."],
    },
  },
  {
    id: "encryption",
    title: () => <p className="group-data-[selected=true]:text-warning">Encryption</p>,
    icon: () => (
      <FaLock
        className="text-default-400 group-data-[selected=true]:text-warning"
        size={isMobile ? 34 : 44}
      />
    ),
    content: {
      description: ["Secure data with military-grade encryption."],
    },
  },
];

type Theme = "privacy" | "anonymity" | "devices" | "encryption";
type Tab = { id: string; title: () => JSX.Element; icon: () => JSX.Element; content: any };

const CustomThemesExample = ({
  tabs,
  selectedTheme,
  onChangeTheme,
}: {
  tabs: Tab[];
  selectedTheme: Theme;
  onChangeTheme: (theme: Theme) => void;
}) => {
  const slots = useMemo(
    () =>
      shopCartStyles({
        theme: selectedTheme as Theme,
      }),
    [selectedTheme],
  );

  const onSelectionChange = (value: React.Key) => {
    onChangeTheme(value as Theme);
  };

  return (
    <div className="flex flex-col gap-6">
      <Tabs
        disableAnimation
        disableCursorAnimation
        aria-label="Custom themes tabs"
        classNames={{
          base: "w-full",
          tab: "px-0 w-fit h-auto data-[selected=true]:bg-transparent",
          tabList: "w-full justify-start gap-8",
          tabContent: "text-default-400 text-base",
        }}
        items={tabs}
        variant="light"
        onSelectionChange={onSelectionChange}
      >
        {(item) => (
          <Tab
            key={item.id}
            title={
              <div className="flex flex-col justify-center items-center gap-2">
                {item.icon()}
                {item.title()}
              </div>
            }
          />
        )}
      </Tabs>
      <Card className={slots.wrapper()} radius="lg">
        <CardBody className="relative flex-col md:flex-row md:items-center gap-4 md:gap-9 overflow-visible">
          <div className={slots.imageWrapper()}>
            <Image
              fill
              removeWrapper
              alt="VPN Service Image"
              as={NextImage}
              className={slots.img()}
              sizes="100vw"
              src="/images/vpn-privacy.png"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export const CustomThemes = () => {
  const isMobile = useIsMobile();
  const tabs = themesTabs(isMobile);
  const [selectedTheme, setSelectedTheme] = useState<Theme>(tabs[0].id as Theme);

  const selectedContent = tabs.find((tab) => tab.id === selectedTheme)?.content || {
    description: ["Default description."],
  };

  return (
    <section className={sectionWrapper({ class: "mt-24 lg:mt-22" })}>
      {/* Main Title aligned to the left */}
      <div className="flex justify-start">
        <div className="w-full lg:w-full text-left">
          <div className={titleWrapper()}>
            <h1 className={title({ size: "lg", class: "text-left" })}>Best VPN for</h1>
            <h1 className={title({ color: "blue", size: "lg", class: "text-left" })}>
              Privacy & Anonymity
            </h1>
          </div>
          {/* Updated text to span full width */}
          <p className={subtitle({ class: "w-full text-left" })}>
            Keep your internet activity hidden from anyone watching. This includes your ISP,
            hackers, advertisers, & the government.
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left-hand side with dynamic content */}
        <div className="w-full lg:w-1/2 p-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-md">
          <div className="flex flex-col gap-4 text-white">
            {selectedContent.description.map((desc, index) => (
              <p key={index} className={title({ size: "lg", class: "text-white" })}>
                {desc}
              </p>
            ))}
          </div>
        </div>

        {/* Right-hand side with tabs and image */}
        <div className="w-full lg:w-1/2">
          <CustomThemesExample
            selectedTheme={selectedTheme}
            tabs={tabs}
            onChangeTheme={setSelectedTheme}
          />
        </div>
      </div>
    </section>
  );
};
