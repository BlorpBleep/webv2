"use client";

import React from "react";
import { tv } from "tailwind-variants";
import { Card } from "@nextui-org/react";

const pricingStyles = tv({
  slots: {
    container: "grid grid-cols-1 md:grid-cols-3 gap-48 mt-24", // Increased gap to 8
    card: "border-transparent bg-white/5 dark:bg-default-400/10 backdrop-blur-lg",
    header: "text-center",
    body: "text-center",
    price: "text-4xl font-bold text-yellow-500",
    description: "text-base text-default-500 mt-2",
  },
});

export const PricingGrid = () => {
  const slots = pricingStyles();

  return (
    <div className={slots.container()}>
      <Card className={`${slots.card()} transform scale-[1.5]`}>
        <div className={slots.body()}>
          <h3 className={slots.header()}>1 Month</h3>
          <p className={slots.price()}>11.99 €/mo</p>
          <p className={slots.description()}>Billed 11.99 € every month</p>
          <p className={slots.description()}>14-day money-back guarantee</p>
        </div>
      </Card>
      <Card className={`${slots.card()} transform scale-[1.8] border-2 border-yellow-500`}>
        <div className={slots.body()}>
          <h3 className={slots.header()}>2 Years + 2 Months</h3>
          <p className={slots.price()}>2.19 €/mo</p>
          <p className={slots.description()}>Billed 56.94 € first 2 years</p>
          <p className={slots.description()}>45-day money-back guarantee</p>
          <p className="text-sm text-yellow-500 font-bold mt-2">BEST VALUE - SAVE 82%</p>
        </div>
      </Card>
      <Card className={`${slots.card()} transform scale-[1.5]`}>
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
