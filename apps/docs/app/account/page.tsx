"use client"; 

import React, { useState } from "react";
import Sidebar from "@/components/account/sidebar";
import Membership from "@/components/account/membership";
import Devices from "@/components/account/devices";
import Profiles from "@/components/account/profiles";
import Security from "@/components/account/security";
import Overview from "@/components/account/accountoverview";
import MembershipDetails from "@/components/account/MembershipDetails"; // Import MembershipDetails

export default function AccountPage() {
  const [selectedSection, setSelectedSection] = useState<string>("overview");

  const handleSectionSelect = (section: string) => {
    setSelectedSection(section);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "overview":
        return (
          <>
            <MembershipDetails onSelectSection={handleSectionSelect} />
            <Overview />
          </>
        );
      case "membership":
        return <Membership />;
      case "devices":
        return <Devices />;
      case "profiles":
        return <Profiles />;
      case "security":
        return <Security />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar onSelect={handleSectionSelect} selected={selectedSection} />
      <main className="flex-1 p-8">

        {renderContent()}
      </main>
    </div>
  );
}
