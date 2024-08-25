import React, { useState, useEffect } from "react";
import { FaChevronRight, FaUser } from "react-icons/fa";
import { supabase } from "@/utils/supabase"; // Ensure you have supabase client setup in your project

interface MembershipDetailsProps {
  onSelectSection: (section: string) => void;
}

export default function MembershipDetails({
  onSelectSection,
}: MembershipDetailsProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [uuid, setUuid] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const session = await supabase.auth.getSession();
      if (session.error) return; // Handle session error

      const userId = session.data.session?.user.id;
      const { data: user, error } = await supabase
        .from("users")
        .select("full_name, avatar_url, id")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error.message);
        return;
      }

      if (user) {
        setFullName(user.full_name);
        setAvatarUrl(user.avatar_url || null);
        setUuid(formatUuid(user.id));
        console.log("Avatar URL: ", user.avatar_url); // Debugging step
      }
    };

    fetchUserProfile();
  }, []);

  const formatUuid = (uuid: string) => {
    return uuid.match(/.{1,4}/g)?.join(" ") || uuid;
  };

  return (
    <div className="mb-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
        Account
      </h1>
      <h2 className="text-l font-medium mb-4 text-gray-700 dark:text-gray-400">
        Membership details
      </h2>

      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800 mb-4 relative">
        <div className="mb-4" style={{ marginLeft: "-1.5rem" }}>
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: "linear-gradient(to right, rgb(229, 9, 20), rgb(141, 34, 88))",
              color: "#fff",
              fontWeight: "500",
              lineHeight: "2.5",
              padding: "0.1875rem 1rem 0.3125rem",
              fontSize: "0.875rem",
              borderRadius: "0px 1rem 1rem 0px",
            }}
          >
            Member since May 2017
          </span>
        </div>
        <div className="text-gray-900 font-semibold dark:text-white text-xl mb-2">
          {fullName || "Full Name Not Available"}
        </div>
        <div className="text-gray-500 dark:text-gray-400 text-sm">
          {uuid || "UUID Not Available"}
        </div>
        <div className="absolute top-4 right-4">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="rounded-full"
              style={{ width: "60px", height: "60px" }} // Add border to see if image loads
              onError={(e) => {
                console.error("Image failed to load"); // Debugging step
                e.currentTarget.src = ""; // Handle fallback in case of error
              }}
            />
          ) : (
            <FaUser className="w-10 h-10 text-gray-500" />
          )}
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6">
          Premium plan
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Next payment: 5 September 2024
        </p>
        <p className="text-gray-500 dark:text-gray-400">VISA •••• 4485</p>
        <hr className="my-1 border-gray-200 dark:border-gray-700" />
        <div className="mt-4">
          <button
            onClick={() => onSelectSection("membership")}
            className="w-full flex justify-between items-center px-2 py-3 text-lg font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center">
              <FaUser className="w-5 h-5 text-gray-500 mr-2" />
              <span>Manage membership</span>
            </div>
            <FaChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
