"use client";

/* eslint-disable react/display-name */
import { useMemo, useState } from "react";
import { Tabs, Tab, Card, CardBody, Image } from "@nextui-org/react";
import NextImage from "next/image";
import { FaShieldAlt, FaUserSecret, FaMobileAlt, FaLock, FaTachometerAlt, FaAd, FaHeadset } from "react-icons/fa"; // Added icons
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
  {
    id: "speed",
    title: () => <p className="group-data-[selected=true]:text-green-500">Speed</p>,
    icon: () => (
      <FaTachometerAlt
        className="text-default-400 group-data-[selected=true]:text-green-500"
        size={isMobile ? 34 : 44}
      />
    ),
    content: {
      description: ["Experience blazing-fast VPN connections anywhere in the world."],
    },
  },
  {
    id: "ad-blocking",
    title: () => <p className="group-data-[selected=true]:text-yellow-500">Ad Blocking</p>,
    icon: () => (
      <FaAd
        className="text-default-400 group-data-[selected=true]:text-yellow-500"
        size={isMobile ? 34 : 44}
      />
    ),
    content: {
      description: ["Block ads and protect your browsing experience with built-in ad blockers."],
    },
  },
  {
    id: "support",
    title: () => <p className="group-data-[selected=true]:text-pink-500">Support</p>,
    icon: () => (
      <FaHeadset
        className="text-default-400 group-data-[selected=true]:text-pink-500"
        size={isMobile ? 34 : 44}
      />
    ),
    content: {
      description: ["Get 24/7 support from our expert team for any VPN-related issues."],
    },
  },
];

type Theme = "privacy" | "anonymity" | "devices" | "encryption" | "speed" | "ad-blocking" | "support";
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
    <div className="flex flex-col gap-6 h-full">
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
      <Card className={slots.wrapper()} radius="lg" style={{ flexGrow: 1 }}>
        <CardBody className="relative flex-col md:flex-row md:items-center gap-0 p-0 overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              fill
              removeWrapper
              alt="VPN Service Image"
              as={NextImage}
              className="object-cover rounded-lg m-0 p-0"
              sizes="100vw"
              src={`/images/${selectedTheme}.png`}
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
      <div className="flex flex-col gap-4 mb-8">
        <div className={titleWrapper()}>
          <h1 className={title({ size: "lg" })}>Best VPN for</h1>
          <div className="mt-4">
            <h1 className={title({ color: "blue", size: "lg" })}>
              Privacy & Anonymity
            </h1>
          </div>
        </div>
        <p className={subtitle({ class: "w-full text-left" })}>
          Keep your internet activity hidden from anyone watching. This includes your ISP,
          hackers, advertisers, & the government.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="p-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-md flex flex-col justify-center">
          <div className="flex flex-col gap-4 text-white h-full justify-center">
            {selectedContent.description.map((desc, index) => (
              <p key={index} className={title({ size: "lg", class: "text-white" })}>
                {desc}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-col h-full">
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