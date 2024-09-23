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
import PricingOffer from "@/components/account/PricingOffer";
import { supabase } from "@/utils/supabaseClient";
import { FaChevronLeft } from "react-icons/fa";

export default function AccountPage() {
  const [selectedSection, setSelectedSection] = useState<string>("overview");
  const [hasActiveAccount, setHasActiveAccount] = useState<boolean>(false);
  const [hasRedeemedVoucher, setHasRedeemedVoucher] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserAccountAndVoucherStatus = async () => {
      try {
        console.log("Fetching user session...");
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !sessionData?.session) {
          console.error("Error fetching session:", sessionError?.message || "No session found.");
          router.push("/auth");
          return;
        }

        const userId = sessionData.session.user.id;
        console.log("User ID:", userId);

        // Fetch user account data
        const { data: accountsData, error: accountsError } = await supabase
          .from("accounts")
          .select("id, account_number, expiry")
          .eq("user_id", userId);

        if (accountsError || !accountsData) {
          console.error("Error fetching accounts:", accountsError?.message || "No accounts found.");
          setLoading(false);
          return;
        }

        const hasAccount = accountsData.length > 0;
        setHasActiveAccount(hasAccount);

        // Fetch vouchers
        const accountNumbers = accountsData.map((account) => account.account_number);
        const { data: vouchersData, error: vouchersError } = await supabase
          .from("vouchers")
          .select("id, is_used, associated_account")
          .in("associated_account", accountNumbers);

        if (vouchersError) {
          console.error("Error fetching vouchers:", vouchersError.message);
        }

        const redeemedVoucher = vouchersData?.some((voucher) => voucher.is_used);
        setHasRedeemedVoucher(redeemedVoucher);

        setLoading(false);
      } catch (error) {
        console.error("Unexpected error:", error);
        setLoading(false);
      }
    };

    checkUserAccountAndVoucherStatus();
  }, [router]);

  const handleSectionSelect = (section: string) => {
    setSelectedSection(section);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  const renderContent = () => {
    if (!hasActiveAccount && !hasRedeemedVoucher && !loading) {
      return <PricingOffer />;
    }

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

  // Prevent rendering until loading is false
  if (loading) {
    // You can return null or a loading indicator here
    return null; // or return <p>Loading...</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="hidden lg:block lg:w-64">
        <Sidebar onSelect={handleSectionSelect} selected={selectedSection} onLogout={handleLogout} />
      </div>
      <main className="flex-1 p-8 transition-transform transform">
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