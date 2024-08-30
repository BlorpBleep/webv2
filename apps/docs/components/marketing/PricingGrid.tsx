import React, { useState } from "react";
import { Card } from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";

export const PricingGrid = () => {
  const [selectedPlan, setSelectedPlan] = useState("2-years");
  const [dedicatedIP, setDedicatedIP] = useState(false); // State for the dedicated Family Protector checkbox

  const handleCheckboxChange = (plan) => {
    setSelectedPlan(plan);
    console.log(`Selected Plan: ${plan}`);
  };

  const handleDedicatedIPChange = () => {
    const newState = !dedicatedIP; // Determine the new state
    setDedicatedIP(newState); // Update the state
    console.log(`Dedicated Family Protector toggled to: ${newState}`);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center w-full">
        {/* Offers Grid */}
        <div className="flex flex-col md:flex-row md:gap-4 mt-6 w-full max-w-[60%] mx-auto justify-center items-center relative">
          
          {/* 1 Month Plan */}
          <Card className="flex-1 md:flex-none bg-white rounded-lg flex flex-col justify-between h-[25vh] w-full md:w-2/5 relative">
            <div className="absolute top-4 right-4">
              <input
                type="checkbox"
                checked={selectedPlan === "1-month"}
                onChange={() => handleCheckboxChange("1-month")}
                className="appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-[#fc0] checked:border-transparent focus:outline-none"
              />
              {selectedPlan === "1-month" && (
                <svg
                  className="absolute inset-0 w-6 h-6 text-[#242538]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <div className="flex flex-col items-center justify-center text-center h-full">
              <h3 className="text-sm sm:text-lg font-bold text-black">1 Month</h3>
              <p className="text-sm sm:text-4xl font-bold text-black mt-2">11.99 €/mo</p>
              <div className="text-sm text-gray-600 mt-2">Billed 11.99 € every month</div>
            </div>
            <div className="text-sm text-gray-600 mt-4 text-center mb-4">14-day money-back guarantee</div>
          </Card> 
          
          {/* 2 Years + 2 Months Plan */}
          <Card className="flex-1 md:flex-none bg-[#242538] overflow-visible rounded-lg flex flex-col justify-between h-[30vh] relative w-full md:w-3/5 border-2 border-[#fc0]">
            {/* Offer Badge */}
            <div className="absolute left-1/2 top-[-15px] transform -translate-x-1/2 bg-[#fc0] text-[#242538] font-bold px-4 py-1 rounded-full text-center w-auto min-w-[150px]" style={{ zIndex: 100 }}>
              <span className="text-xs uppercase whitespace-nowrap">Best Value Save 82%</span>
            </div>
            <div className="absolute top-4 right-4">
              <input
                type="checkbox"
                checked={selectedPlan === "2-years"}
                onChange={() => handleCheckboxChange("2-years")}
                className="appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-[#fc0] checked:border-transparent focus:outline-none"
              />
              {selectedPlan === "2-years" && (
                <svg
                  className="absolute inset-0 w-6 h-6 text-[#242538]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <div className="flex flex-col items-center justify-center text-center h-full">
              <h3 className="text-sm sm:text-lg font-bold text-white">2 Years + 2 Months</h3>
              <p className="text-xl sm:text-4xl font-bold text-[#fc0] mt-2">2.19 €/mo</p>
              <div className="text-xs text-gray-400 mt-2">Billed 56.94 € first 2 years and yearly thereafter</div>
            </div>
            <div className="bg-[#212121] text-[#fc0] text-center text-sm font-semibold w-full py-3 rounded-b-lg">
              45-day money-back guarantee
            </div>
          </Card>

          {/* 6 Months Plan */}
          <Card className="flex-1 md:flex-none bg-white rounded-lg flex flex-col justify-between h-[25vh] w-full md:w-2/5 relative">
            <div className="absolute top-4 right-4">
              <input
                type="checkbox"
                checked={selectedPlan === "6-months"}
                onChange={() => handleCheckboxChange("6-months")}
                className="appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-[#fc0] checked:border-transparent focus:outline-none"
              />
              {selectedPlan === "6-months" && (
                <svg
                  className="absolute inset-0 w-6 h-6 text-[#242538]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <div className="flex flex-col items-center justify-center text-center h-full">
              <h3 className="text-sm sm:text-lg font-bold text-black">6 Months</h3>
              <p className="text-sm sm:text-4xl font-bold text-black mt-2">6.99 €/mo</p>
              <div className="text-sm text-gray-600 mt-2">Billed 41.94 € every 6 months</div>
            </div>
            <div className="text-sm text-gray-600 mt-4 text-center mb-4">45-day money-back guarantee</div>
          </Card>
        </div>
      </div>

      {/* New Locations Bar */}
      <div className="flex justify-between items-center md:w-5/6 bg-white border border-gray-300 rounded-bl-md rounded-br-md rounded-tr-md rounded-tl-none shadow p-6 mt-24 mx-auto relative">
        
        <div className="absolute left-[-1px] top-[-37px] bg-[#fc0] text-black font-bold px-4 py-2 text-sm rounded-tr-md rounded-tl-md">
          New locations added
        </div>

        <div className="flex flex-col space-y-2 ">
          <div className="inline-flex items-center">
            <AiOutlineGlobal size={20} />
            <span className="ml-2 font-bold">Include a Dedicated Family Protector to your VPN</span>
          </div>
          <div className="text-gray-600 text-sm">
          Upgrade your VPN experience with our switchable family protector for whole of family VPN protection.
          </div>
          <div>
            <a href="#" className="text-blue-500 font-bold">See available locations</a>
          </div>
        </div>
        <div className="relative">
          <input
            type="checkbox"
            checked={dedicatedIP}
            onChange={handleDedicatedIPChange} // Toggle the checkbox state
            className="appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-[#fc0] checked:border-transparent focus:outline-none"
          />
          {dedicatedIP && (
            <svg
              className="absolute inset-0 w-6 h-6 text-[#242538]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};
