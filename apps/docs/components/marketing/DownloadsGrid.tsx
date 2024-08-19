"use client";

import React from "react";
import { tv } from "tailwind-variants";
import { Card } from "@nextui-org/react";

const pricingStyles = tv({
  slots: {
    container: "grid grid-cols-1 md:grid-cols-3 gap-6 mt-12",
    card: "border-transparent bg-white/5 dark:bg-default-400/10 backdrop-blur-lg",
    header: "text-center",
    body: "text-center",
    price: "text-4xl font-bold text-yellow-500",
    description: "text-base text-default-500 mt-2",
  },
});

export const DownloadsGrid = () => {
  const slots = pricingStyles();

  return (
    <div className={slots.container()}>
      <Card className={slots.card()}>
        <div className={slots.body()}>
          <h3 className={slots.header()}>1 Month</h3>
          <p className={slots.price()}>11.99 €/mo</p>
          <p className={slots.description()}>Billed 11.99 € every month</p>
          <p className={slots.description()}>14-day money-back guarantee</p>
        </div>
      </Card>
      <Card className={slots.card()}>
        <div className={slots.body()}>
          <h3 className={slots.header()}>2 Years + 2 Months</h3>
          <p className={slots.price()}>2.19 €/mo</p>
          <p className={slots.description()}>Billed 56.94 € first 2 years</p>
          <p className={slots.description()}>45-day money-back guarantee</p>
        </div>
      </Card>
      <Card className={slots.card()}>
        <div className={slots.body()}>
          <h3 className={slots.header()}>6 Months</h3>
          <p className={slots.price()}>6.99 €/mo</p>
          <p className={slots.description()}>Billed 41.94 € every 6 months</p>
          <p className={slots.description()}>45-day money-back guarantee</p>
        </div>
      </Card>
    </div>
  );
};
