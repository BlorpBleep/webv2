"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/account/sidebar";
import Membership from "@/components/account/membership";
import Devices from "@/components/account/devices";
import Accounts from "@/components/account/accounts";
import Security from "@/components/account/security";
import Overview from "@/components/account/accountoverview";
import MembershipDetails from "@/components/account/MembershipDetails";
import { supabase } from "@/utils/supabase"; // Ensure you have supabase client setup in your project
import { FaChevronRight } from "react-icons/fa"; // Import the arrow icon

export default function AccountPage() {
  const [selectedSection, setSelectedSection] = useState<string>("overview");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // State to handle sidebar visibility on mobile
  const router = useRouter();

  const handleSectionSelect = (section: string) => {
    setSelectedSection(section);
    setIsSidebarVisible(false); // Hide sidebar after selecting a section on mobile
  };

  const handleLogout = async () => {
    await supabase.auth.signOut(); // Clear session in supabase
    router.push('/auth'); // Redirect to login page
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible); // Toggle sidebar visibility
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
      case "accounts":
        return <Accounts />;
      case "security":
        return <Security />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="lg:hidden fixed top-[5rem] left-4 z-50">
        {/* Small blue tab for mobile */}
        <div
          onClick={toggleSidebar}
          className="tab"
          aria-label="Toggle sidebar"
        >
          <FaChevronRight />
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`sidebar ${isSidebarVisible ? "active" : ""} lg:relative lg:translate-x-0 lg:w-64`}
      >
        <Sidebar onSelect={handleSectionSelect} selected={selectedSection} onLogout={handleLogout} />
      </div>

      {/* Main Content */}
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
