"use client";

import React, { useState } from "react";
import ActivationForm from "./ActivationForm"; // Import the new ActivationForm component

export default function PricingOffer() {
  const [selectedPlan, setSelectedPlan] = useState("2-years");
  const [showActivationForm, setShowActivationForm] = useState(false);

  // Dynamic button link based on the selected plan
  const getPlanLink = () => {
    switch (selectedPlan) {
      case "2-years":
        return "https://buy.stripe.com/3cs3cOgCi0Z784obIN";
      case "6-months":
        return "https://buy.stripe.com/6oE7t485MgY5doI3ci";
      case "1-month":
        return "https://buy.stripe.com/5kA28K1HobDL5WgbIP";
      default:
        return "#";
    }
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="max-w-4xl mx-auto text-gray-900 dark:text-white p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold dark:text-gray-100">Privacy Made Simple!</h1>
      </div>

      {/* Plan Options */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-md p-6 space-y-4">
        {/* 2 Years + 4 Months Plan */}
        <div
          onClick={() => handlePlanSelect("2-years")}
          className={`cursor-pointer border ${selectedPlan === "2-years" ? "border-yellow-500" : "border-gray-300"} rounded-md p-4 flex items-center justify-between`}
        >
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedPlan === "2-years"}
              onChange={() => handlePlanSelect("2-years")}
              className="form-checkbox text-yellow-500"
            />
            <div>
              <h2 className="font-bold text-lg dark:text-white">2 Years + 4 Months</h2>
              <span className="text-sm text-yellow-600 bg-yellow-100 dark:bg-yellow-500 px-2 rounded-md">Save 84%</span>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total billing 56.94 €</p>
            </div>
          </div>
          <p className="text-xl font-bold dark:text-white">2.03 €/mo</p>
        </div>

        {/* 6 Months Plan */}
        <div
          onClick={() => handlePlanSelect("6-months")}
          className={`cursor-pointer border ${selectedPlan === "6-months" ? "border-yellow-500" : "border-gray-300"} rounded-md p-4 flex items-center justify-between`}
        >
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedPlan === "6-months"}
              onChange={() => handlePlanSelect("6-months")}
              className="form-checkbox text-yellow-500"
            />
            <div>
              <h2 className="font-bold text-lg dark:text-white">6 Months</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total billing 41.94 €</p>
            </div>
          </div>
          <p className="text-xl font-bold dark:text-white">6.99 €/mo</p>
        </div>

        {/* 1 Month Plan */}
        <div
          onClick={() => handlePlanSelect("1-month")}
          className={`cursor-pointer border ${selectedPlan === "1-month" ? "border-yellow-500" : "border-gray-300"} rounded-md p-4 flex items-center justify-between`}
        >
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedPlan === "1-month"}
              onChange={() => handlePlanSelect("1-month")}
              className="form-checkbox text-yellow-500"
            />
            <div>
              <h2 className="font-bold text-lg dark:text-white">1 Month</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total billing 11.99 €</p>
            </div>
          </div>
          <p className="text-xl font-bold dark:text-white">11.99 €/mo</p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center mt-6">
        <a href={getPlanLink()} className="bg-yellow-500 text-white font-bold py-3 px-8 rounded-md hover:bg-yellow-400">
          Get Cicada VPN
        </a>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Cancel Anytime</p>
      </div>

      {/* Money-back Guarantee */}
      <div className="bg-blue-50 dark:bg-blue-900 text-center text-blue-900 dark:text-blue-100 p-4 rounded-md mt-6">
        <p className="font-bold">Covered By Our 45-Day Money-Back Guarantee</p>
        <p className="text-sm mt-1">You have 45 full days to try Cicada VPN risk-free. Love it or get your money back, no-questions-asked.</p>
      </div>

      {/* Activation Key */}
      <div className="mt-8 p-4 border-t border-gray-300 dark:border-gray-600 text-center sm:text-left">
        <h3 className="font-bold text-lg dark:text-white">Activation Key</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Did you buy Cicada VPN from a store? Or were you part of one of our campaigns? Put your activation key to good use here.
        </p>
        <div className="mt-4 sm:text-right">
          <button
            className="bg-gray-800 dark:bg-gray-700 text-white py-2 px-6 rounded-md hover:bg-gray-700 dark:hover:bg-gray-600"
            onClick={() => setShowActivationForm(true)} // Show the activation form
          >
            Use your activation key
          </button>
        </div>
      </div>

      {/* Render Activation Form */}
      {showActivationForm && <ActivationForm onClose={() => setShowActivationForm(false)} />}
    </div>
  );
}
