"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/account/sidebar";
import Membership from "@/components/account/membership";
import Devices from "@/components/account/devices";
import Accounts from "@/components/account/accounts";
import Security from "@/components/account/security";
import Vouchers from "@/components/account/vouchers";
import AccountOverview from "@/components/account/accountoverview";
import { supabase } from "@/utils/supabase";
import { FaChevronRight } from "react-icons/fa";

export default function AccountPage() {
  const [selectedSection, setSelectedSection] = useState<string>("overview");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const router = useRouter();

  const handleSectionSelect = (section: string) => {
    console.log("Section selected:", section);
    setSelectedSection(section);
    setIsSidebarVisible(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "overview":
        return <AccountOverview onSelectSection={handleSectionSelect} />;
      case "membership":
        return <Membership />;
      case "devices":
        return <Devices />;
      case "accounts":
        return <Accounts />;
      case "security":
        return <Security />;
      case "vouchers":
        return <Vouchers />;
      default:
        return <AccountOverview onSelectSection={handleSectionSelect} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="lg:hidden fixed top-[5rem] left-4 z-50">
        <div onClick={toggleSidebar} className="tab" aria-label="Toggle sidebar">
          <FaChevronRight />
        </div>
      </div>

      <div
        className={`sidebar ${isSidebarVisible ? "active" : ""} lg:relative lg:translate-x-0 lg:w-64`}
      >
        <Sidebar onSelect={handleSectionSelect} selected={selectedSection} onLogout={handleLogout} />
      </div>

      <main
        className={`flex-1 p-8 transition-transform transform ${
          isSidebarVisible ? "lg:translate-x-0" : ""
        }`}
      >
        {renderContent()}
      </main>
    </div>
  );
}
