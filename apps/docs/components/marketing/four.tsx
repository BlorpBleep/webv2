"use client";

import Image from "next/image";
import React from "react";

export const Four = () => {
  return (
    <section className="grid grid-cols-2 gap-4 p-8">
      {/* Top Left Card */}
      <div className="bg-black text-white p-8 rounded-tl-lg flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-4">Effortless online privacy with a VPN</h1>
        <p className="mb-6">Surfshark connects, reconnects, stays alert, and protects you online 24/7 wherever you go. With its intuitive design, you will master it in no time.</p>
        <a href="#" className="font-bold text-white">
          More about VPN &gt;
        </a>
      </div>

      {/* Top Right Card with Image */}
      <div className="relative bg-yellow-400 rounded-tr-lg flex items-end overflow-hidden">
        <Image 
          src="/images/vpn-section-main.webp"
          alt="Person using VPN"
          layout="fill"
          objectFit="cover"
          className="rounded-tr-lg"
        />
      </div>

      {/* Bottom Left Card */}
      <div className="bg-teal-500 text-white p-8 rounded-bl-lg flex flex-col justify-center">
        <h2 className="text-xl font-bold mb-4">Experience the web before advertising happened</h2>
        <p className="text-sm">Free of ads, cookie pop-ups, & trackers.</p>
      </div>

      {/* Bottom Middle Card */}
      <div className="bg-white text-black p-8 flex flex-col justify-center">
        <h2 className="text-xl font-bold mb-4">Work, play, and explore without a glitch</h2>
        <p className="text-sm">Connected to high-speed VPN servers.</p>
      </div>

      {/* Bottom Right Card */}
      <div className="bg-black text-white p-8 rounded-br-lg flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-2">100+</h2>
        <p className="text-sm mb-4">Countries</p>
        <h2 className="text-2xl font-bold mb-2">3200+</h2>
        <p className="text-sm">RAM-only servers</p>
      </div>
    </section>
  );
};
