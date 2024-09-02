"use client";

import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const checkJwtAndRedirect = async () => {
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData?.session) {
        console.log("No session found, redirecting to login...");
        router.push("/auth");
        return;
      }

      const token = sessionData.session.access_token;

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

      if (parsedJwt.exp < currentTime) {
        console.log("Token expired, logging out...");
        await supabase.auth.signOut();
        router.push("/auth");
      } else {
        console.log("Token is valid.");
      }
    };

    checkJwtAndRedirect();
  }, [router]);

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
