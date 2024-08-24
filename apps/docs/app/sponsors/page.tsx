"use client";

import React from "react";
import { TeamsGrid } from "@/components/marketing/TeamsGrid"

export default function TeamsPage() {
  return (
    <>
      <main className="relative container mx-auto max-w-7xl z-10 px-6 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow">
        <section className="w-full flex flex-col items-center lg:px-16 mt-12 gap-6">
          <div className="text-center max-w-xl">
            <h1 className="mb-2 font-bold text-4xl">Buy a VPN for your team: 2 Years for 2.19 €/mo</h1>
            <h5 className="text-default-500 text-lg">
              A team that contains the basis of the NextUI design system to help you design your applications.
            </h5>
          </div>
          <TeamsGrid />
        </section>
      </main>
    </>
  );
}
