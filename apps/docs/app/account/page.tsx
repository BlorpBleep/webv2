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
import { FaChevronLeft } from "react-icons/fa";

export default function AccountPage() {
  const [selectedSection, setSelectedSection] = useState<string>("overview");
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
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
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
      {/* Sidebar only on large screens */}
      <div className="hidden lg:block lg:w-64">
        <Sidebar onSelect={handleSectionSelect} selected={selectedSection} onLogout={handleLogout} />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 transition-transform transform">
        {/* Back Link */}
        {selectedSection !== "overview" && (
          <button
            onClick={() => setSelectedSection("overview")}
            className="flex items-center mb-4 text-gray-700 dark:text-gray-300 hover:text-primary"
          >
            <FaChevronLeft className="mr-2" />
            Back to Account Overview
          </button>
        )}

        {renderContent()}
      </main>
    </div>
  );
}
