import React from "react";
import MembershipDetails from "@/components/account/MembershipDetails";
import QuickLinks from "@/components/account/QuickLinks";

interface AccountOverviewProps {
  onSelectSection: (section: string) => void;
}

export default function AccountOverview({ onSelectSection }: AccountOverviewProps) {
  return (
    <div className="space-y-6">
      <MembershipDetails onSelectSection={onSelectSection} />
      <QuickLinks onSelectSection={onSelectSection} />
    </div>
  );
}
