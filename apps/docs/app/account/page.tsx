"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/account/sidebar";
import Membership from "@/components/account/membership";
import Devices from "@/components/account/devices";
import Profiles from "@/components/account/profiles";
import Security from "@/components/account/security";
import Overview from "@/components/account/accountoverview";
import MembershipDetails from "@/components/account/MembershipDetails"; 
import { supabase } from "@/utils/supabase"; // Ensure you have supabase client setup in your project

export default function AccountPage() {
  const [selectedSection, setSelectedSection] = useState<string>("overview");
  const router = useRouter();

  const handleSectionSelect = (section: string) => {
    setSelectedSection(section);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut(); // Clear session in supabase
    router.push('/auth'); // Redirect to login page
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
      <Sidebar onSelect={handleSectionSelect} selected={selectedSection} onLogout={handleLogout} />
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
    </div>
  );
}
