"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/account/sidebar";
import Membership from "@/components/account/membership";
import Devices from "@/components/account/devices";
import Accounts from "@/components/account/accounts";
import Security from "@/components/account/security";
import Overview from "@/components/account/accountoverview";
import MembershipDetails from "@/components/account/MembershipDetails";
import { supabase } from "@/utils/supabase";
import { FaChevronRight } from "react-icons/fa";

export default function AccountPage() {
  const [selectedSection, setSelectedSection] = useState<string>("overview");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        const token = data.session.access_token;

        // Decode the JWT to check for expiration
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );

        const parsedJwt = JSON.parse(jsonPayload);
        const currentTime = Math.floor(Date.now() / 1000);

        // Check if the token is expired
        if (parsedJwt.exp < currentTime) {
          await handleLogout();
        } else {
          // Set a timeout to log the user out when the token expires
          const timeLeft = (parsedJwt.exp - currentTime) * 1000;
          setTimeout(async () => {
            await handleLogout();
          }, timeLeft);
        }
      }
    };

    checkTokenExpiration();

    // Optional: Check the token expiration periodically, e.g., every minute
    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [router]);

  const handleSectionSelect = (section: string) => {
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
