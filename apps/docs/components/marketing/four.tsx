"use client";

import React from "react";
import Image from "next/image";

export const Four = () => {
  return (
    <section className="grid grid-cols-2 gap-0 w-full h-screen">
      {/* Top Left Box */}
      <div className="bg-black text-white p-8 rounded-tl-[48px] flex items-center justify-center">
        <div>
          <h1 className="text-5xl font-bold mb-4" style={{ lineHeight: '1' }}>Effortless online privacy with a VPN</h1>
          <p className="text-xl mb-6">
            Surfshark connects, reconnects, stays alert, and protects you online 24/7 wherever you go.
            With its intuitive design, you will master it in no time.
          </p>
          <a href="#" className="font-bold text-white text-lg">
            More about VPN &gt;
          </a>
        </div>
      </div>

      {/* Top Right Box */}
      <div className="bg-yellow-400 p-8 rounded-tr-[48px] relative overflow-hidden">
        <Image 
          src="/images/vpn-section-main.webp"
          alt="Person using VPN"
          layout="fill"
          objectFit="cover"
          className="rounded-tr-[48px]"
        />
      </div>

      {/* Bottom Left Box */}
      <div className="bg-teal-500 p-8 rounded-bl-[48px] flex items-center justify-center relative overflow-hidden">
        <div className="relative z-10 text-black text-left">
          <h2 className="text-3xl font-bold mb-4">
            Experience the web before advertising happened
          </h2>
          <p className="text-xl">
            Free of ads, cookie pop-ups, & trackers.
          </p>
        </div>
        <div className="absolute inset-0 flex justify-center items-center">
          <Image 
            src="/images/vpn-section-experience.svg"
            alt="Experience Icon"
            width={200}
            height={200}
            className="opacity-80"
          />
        </div>
      </div>

      {/* Bottom Right Box with Sub-Grid */}
      <div className="bg-white rounded-br-[48px] flex flex-col">
        <div className="flex flex-row h-full">
          {/* Left Sub-Box */}
          <div className="flex-1 bg-gray-200 flex items-center justify-center border-b border-r relative overflow-hidden">
            <div className="relative z-10 text-center">
              <p className="text-xl">Work, play, and explore without a glitch</p>
              <p>Connected to high-speed VPN servers.</p>
            </div>
            <div className="absolute inset-0 flex justify-center items-center">
              <Image 
                src="/images/vpn-section-speed.svg"
                alt="Speed Icon"
                width={120}
                height={120}
                className="opacity-50"
              />
            </div>
          </div>
          {/* Right Sub-Boxes */}
          <div className="flex flex-col w-1/2">
            <div className="flex-1 bg-white border-b flex items-center justify-center relative overflow-hidden">
              <div className="relative z-10 text-center">
                <h2 className="text-black text-2xl font-bold">100+</h2>
                <p>Countries</p>
              </div>
              <div className="absolute inset-0 flex justify-center items-center">
                <Image 
                  src="/images/vpn-section-countries.svg"
                  alt="Countries Icon"
                  width={120}
                  height={120}
                  className="opacity-50"
                />
              </div>
            </div>
            <div className="flex-1 bg-black text-white flex items-center justify-center rounded-br-[48px] relative overflow-hidden">
              <div className="relative z-10 text-center">
                <h2 className="text-2xl font-bold">3200+</h2>
                <p>RAM-only servers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
