"use client";

import React from "react";
import { DownloadsGrid } from "@/components/marketing/DownloadsGrid"

export default function TeamsPage() {
  return (
    <>
      <main className="relative container mx-auto max-w-7xl z-10 px-6 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow">
        <section className="w-full flex flex-col items-center lg:px-16 mt-12 gap-6">
          <DownloadsGrid />
        </section>
      </main>
    </>
  );
}
