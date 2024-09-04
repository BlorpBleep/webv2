"use client";

import { useRef } from "react";
import { trackEvent } from "@/utils/va";
import { Tooltip, Button } from "@nextui-org/react";

// OS Detection function moved here for direct usage
const detectOS = () => {
  const userAgent = window.navigator.userAgent;

  if (userAgent.indexOf("Windows") !== -1) {
    return "/downloads/windows.msi";
  } else if (userAgent.indexOf("Mac OS") !== -1) {
    return "/downloads/macos.pkg";
  } else if (userAgent.indexOf("Linux") !== -1) {
    return "/downloads/linux.tar.gz";
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return "https://apps.apple.com/us/app/cicadavpn/id6499138575";
  } else if (/Android/i.test(userAgent)) {
    return "https://play.google.com/store/apps/details?id=com.vpn.client";
  } else if (userAgent.indexOf("Amazon") !== -1) {
    return "https://www.amazon.com/dp/B00XXXXXXXX";
  }

  // Default fallback to Windows
  return "/downloads/windows.msi";
};

export const DownloadButton = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleDownloadClick = () => {
    const downloadLink = detectOS();
    window.open(downloadLink, "_blank");
  };

  const handleConfetti = async () => {
    const { clientWidth, clientHeight } = document.documentElement;
    const boundingBox = buttonRef.current?.getBoundingClientRect?.();

    const targetY = boundingBox?.y ?? 0;
    const targetX = boundingBox?.x ?? 0;
    const targetWidth = boundingBox?.width ?? 0;

    const targetCenterX = targetX + targetWidth / 2;
    const confetti = (await import("canvas-confetti")).default;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 70,
      origin: {
        y: targetY / clientHeight,
        x: targetCenterX / clientWidth,
      },
    });

    trackEvent("LandingPage - Confetti Button", {
      action: "press",
      category: "landing-page",
    });
  };

  return (
    <Tooltip content={"Auto-detect & download your software"}>
      <Button
        ref={buttonRef}
        disableRipple
        className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
        size="lg"
        onPress={() => {
          handleConfetti();
          handleDownloadClick(); // Trigger OS-based download
        }}
      >
        Auto-detect | Download
      </Button>
    </Tooltip>
  );
};
