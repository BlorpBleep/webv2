// app/account/page.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/utils/supabaseClient";
import {
  FaUser,
  FaTabletAlt,
  FaRedoAlt,
  FaEdit,
  FaEye,
  FaEyeSlash,
  FaCopy,
  FaTrashAlt,
  FaCheck,
  FaShieldAlt,
  FaListAlt,
  FaShareAlt,
} from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Button,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import type { Database } from "@/types/supabase"; // Adjust the path as necessary.

// Define type aliases
type UserData = Database["public"]["Tables"]["users"]["Row"];
type AccountData = Database["public"]["Tables"]["accounts"]["Row"];
type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
type Device = Database["public"]["Tables"]["devices"]["Row"];
type Referral = Database["public"]["Tables"]["referrals"]["Row"];

// Define Backdrop Type
type BackdropType = "opaque" | "blur" | "transparent";

const AccountPage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showPubKey, setShowPubKey] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // To display errors in UI
  const [referralStats, setReferralStats] = useState<{
    ordered: number;
    delivered: number;
    cancelled: number;
  }>({ ordered: 0, delivered: 0, cancelled: 0 });

  // Modal state management using useDisclosure
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState<BackdropType>("opaque");

  const handleOpen = (b: BackdropType) => {
    setBackdrop(b);
    console.log(`Opening modal with backdrop: ${b}`);
    onOpen();
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA");
  };

  const formatCurrency = (amount: number, currency: string): string => {
    const formatted = new Intl.NumberFormat("en", {
      style: "currency",
      currency,
    }).format(amount / 100);
    return formatted;
  };

  // Create refs for each card
  const membershipRef = useRef<HTMLDivElement>(null);
  const subscriptionRef = useRef<HTMLDivElement>(null);
  const transactionRef = useRef<HTMLDivElement>(null);
  const devicesRef = useRef<HTMLDivElement>(null);
  const securityRef = useRef<HTMLDivElement>(null);
  const referRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch session data
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error("Error fetching session:", sessionError.message);
          setError("Failed to fetch session data.");
          return;
        }

        const userId = sessionData?.session?.user?.id;
        if (!userId) {
          console.error("No user ID found in session.");
          setError("User not authenticated.");
          return;
        }

        // Fetch user data
        const { data: userDetails, error: userError } = await supabase
          .from<"users", UserData>("users")
          .select("full_name, email, avatar_url, billing_address, payment_method")
          .eq("id", userId)
          .single();

        if (userError) {
          console.error("Error fetching user data:", userError.message);
          setError("Failed to fetch user data.");
        } else {
          setUserData(userDetails);
          console.log("User Data:", userDetails);
        }

        // Fetch account data
        const { data: accountsData, error: accountError } = await supabase
          .from<"accounts", AccountData>("accounts")
          .select("id, account_number, referral_code, expiry, created_at, apple_api_response, apple_receipt, can_add_devices, can_add_ports, cryptotoken, marked_inactive_by_user, max_devices, max_ports, status, user_id")
          .eq("user_id", userId)
          .limit(1)
          .single();

        if (accountError) {
          console.error("Error fetching account data:", accountError.message);
          setError("Failed to fetch account data.");
        }

        setAccountData(accountsData || null);
        console.log("Account Data:", accountsData);

        // Fetch subscriptions
        const { data: subscriptionsData, error: subsError } = await supabase
          .from<"subscriptions", Subscription>("subscriptions")
          .select("cancel_at, cancel_at_period_end, canceled_at, created, current_period_end, current_period_start, ended_at, id, metadata, price_id, quantity, amount, currency, description, status, stripe_subscription_id, trial_end, trial_start, user_id")
          .eq("user_id", userId);

        if (subsError) {
          console.error("Error fetching subscriptions data:", subsError.message);
          setError("Failed to fetch subscriptions.");
        } else {
          setSubscriptions(subscriptionsData || []);
          console.log("Subscriptions Data:", subscriptionsData);
        }

        // Fetch devices
        if (accountsData) {
          const { data: devicesData, error: devicesError } = await supabase
            .from<"devices", Device>("devices")
            .select("account_number, event_type, hijack_dns, id, ipv4_address, ipv6_address, last_active, name, pubkey")
            .eq("account_number", accountsData.account_number);

          if (devicesError) {
            console.error("Error fetching devices data:", devicesError.message);
            setError("Failed to fetch devices.");
          } else {
            setDevices(devicesData || []);
            console.log("Devices Data:", devicesData);
          }
        }

        // Fetch referral stats
        if (accountsData?.referral_code) {
          console.log("Referral Code:", accountsData.referral_code);
          const { data: referralData, error: referralError } = await supabase
            .from("referrals")
            .select("status")
            .eq("referral_code", accountsData.referral_code);

          if (referralError) {
            console.error("Error fetching referral data:", referralError.message);
          } else {
            const ordered =
              referralData?.filter((ref: any) => ref.status === "ordered").length || 0;
            const delivered =
              referralData?.filter((ref: any) => ref.status === "delivered").length || 0;
            const cancelled =
              referralData?.filter((ref: any) => ref.status === "cancelled").length || 0;
            setReferralStats({ ordered, delivered, cancelled });
            console.log("Referral Stats:", { ordered, delivered, cancelled });
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCopy = (text: string): void => {
    if (!text) return;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopyFeedback(true);
        console.log("Copied to clipboard:", text);
        setTimeout(() => setCopyFeedback(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text:", err);
      });
  };

  const generateReferralLink = (code: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cicadavpn.com";
    return `${baseUrl}/refer/${code}`;
  };

  const handleShare = (platform: string) => {
    console.log(`Share button clicked: ${platform}`);
    const referralLink = generateReferralLink(accountData?.referral_code || "");
    console.log(`Referral Link: ${referralLink}`);
    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          referralLink
        )}&text=${encodeURIComponent("Join me on CicaDaVPN! Use my referral link: ")}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          referralLink
        )}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          referralLink
        )}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=Join me on CicaDaVPN&body=${encodeURIComponent(
          "Use my referral link to join: " + referralLink
        )}`;
        break;
      case "tiktok":
        // TikTok does not have a direct share URL. You might need to use other methods.
        alert("TikTok sharing is not supported directly. Please copy the link manually.");
        return;
      default:
        alert("Unsupported platform");
        return;
    }

    console.log(`Opening share URL: ${shareUrl}`);
    const newWindow = window.open(shareUrl, "_blank");

    if (newWindow) {
      newWindow.focus();
      console.log("Share dialog opened successfully.");
    } else {
      alert("Unable to open share dialog. Please allow pop-ups for this website.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      {/* Icon Links */}
      <div className="flex space-x-8 mb-8">
        {/* NextUI uses onPress instead of onClick */}
        <Button
          variant="ghost"
          className="flex flex-col items-center text-gray-500"
          onPress={() =>
            membershipRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          aria-label="Membership"
        >
          <FaUser className="text-3xl" />
          <span className="mt-2">Membership</span>
        </Button>
        <Button
          variant="ghost"
          className="flex flex-col items-center text-gray-500"
          onPress={() =>
            subscriptionRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          aria-label="Subscription"
        >
          <FaRedoAlt className="text-3xl" />
          <span className="mt-2">Subscription</span>
        </Button>
        <Button
          variant="ghost"
          className="flex flex-col items-center text-gray-500"
          onPress={() =>
            transactionRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          aria-label="Transactions"
        >
          <FaListAlt className="text-3xl" />
          <span className="mt-2">Transactions</span>
        </Button>
        <Button
          variant="ghost"
          className="flex flex-col items-center text-gray-500"
          onPress={() =>
            devicesRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          aria-label="Devices"
        >
          <FaTabletAlt className="text-3xl" />
          <span className="mt-2">Devices</span>
        </Button>
        <Button
          variant="ghost"
          className="flex flex-col items-center text-gray-500"
          onPress={() =>
            securityRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          aria-label="Security"
        >
          <FaShieldAlt className="text-3xl" />
          <span className="mt-2">Security</span>
        </Button>
        <Button
          variant="ghost"
          className="flex flex-col items-center text-gray-500"
          onPress={() => referRef.current?.scrollIntoView({ behavior: "smooth" })}
          aria-label="Refer & Earn"
        >
          <FaShareAlt className="text-3xl" />
          <span className="mt-2">Refer & Earn</span>
        </Button>
      </div>

      {/* Divider */}
      <Divider className="w-full mb-8" />

      {/* Membership Details Card */}
      <Card className="mb-6 w-full lg:w-1/2" ref={membershipRef}>
        <CardHeader className="flex items-center">
          <FaUser className="text-2xl text-blue-600 mr-4" />
          <h2 className="text-lg font-medium">Membership Details</h2>
        </CardHeader>
        <Divider />
        <CardBody className="py-8 px-6">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            {/* User Avatar */}
            {userData?.avatar_url && (
              <div className="flex justify-center md:justify-start mb-4 md:mb-0 md:mr-6">
                <img
                  src={userData.avatar_url}
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            )}
            {/* User Details */}
            <div className="w-full">
              <div className="grid grid-cols-2 gap-4">
                <p className="font-semibold">Full Name:</p>
                <p>{userData?.full_name || "N/A"}</p>

                <p className="font-semibold">Email:</p>
                <p>{userData?.email || "N/A"}</p>

                <p className="font-semibold">Account Number:</p>
                <p className="flex items-center">
                  {accountData?.account_number
                    ? accountData.account_number.replace(/(\w{4})(?=\w)/g, "$1 ")
                    : "N/A"}{" "}
                  <Button
                    variant="ghost"
                    className="flex items-center text-blue-600"
                    onPress={() =>
                      accountData?.account_number
                        ? handleCopy(accountData.account_number.replace(/\s+/g, ""))
                        : null
                    }
                    aria-label="Copy Account Number"
                  >
                    <FaCopy className="mr-2" />
                    Copy
                  </Button>
                  {copyFeedback && <FaCheck className="inline ml-2 text-green-600" />}
                </p>

                <p className="font-semibold">Join Date:</p>
                <p>{formatDate(accountData?.created_at)}</p>

                <p className="font-semibold">Days Remaining:</p>
                <p>
                  {accountData?.expiry
                    ? Math.max(
                        Math.ceil(
                          (new Date(accountData.expiry).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24)
                        ),
                        0
                      )
                    : "N/A"}
                </p>

                <p className="font-semibold">Role:</p>
                <p>Account Holder</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <Divider className="my-6 w-full lg:w-1/2" />

      {/* Refer and Earn Card */}
      <Card className="mb-6 w-full lg:w-1/2" ref={referRef}>
        <CardHeader className="flex items-center">
          <FaShareAlt className="text-2xl text-green-600 mr-4" />
          <h2 className="text-lg font-medium">Refer and Earn</h2>
        </CardHeader>
        <Divider />
        <CardBody className="py-8 px-6">
          {/* Introductory Text */}
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Share your unique referral link with friends and earn rewards for every successful sign-up, just like Tesla's Refer & Earn model! As a thank you, we'll send you awards including free months, a free hoodie, backpack, baseball cap, or wireless charger.
          </p>

          {/* Layout Split: Left (1/3) and Right (2/3) */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Left Section (1/3) */}
            <div className="w-full md:w-1/3 flex flex-col justify-center">
              <h3 className="text-xl font-semibold mb-2">Invite Friends</h3>
              <h4 className="text-md font-medium mb-2">Earn Rewards</h4>
              <p className="text-sm mb-4">
                For every friend you refer who signs up and stays active, you'll receive exclusive rewards! As a thank you, we'll send you awards including free months, a free hoodie, backpack, baseball cap, or wireless charger.
              </p>
              <a
                href="/docs/policies/referral_terms"
                className="text-blue-600 hover:underline text-sm"
              >
                Learn more
              </a>
            </div>

            {/* Right Section (2/3) */}
            <div className="w-full md:w-2/3">
              <div className="flex items-center justify-between bg-white border-2 border-dashed border-red-500 p-4 rounded">
                <div>
                  <p className="text-sm font-semibold mb-2">UNIQUE REFERRAL LINK</p>
                  {/* Updated Referral Link as Clickable Button */}
                  <Button
                    variant="link"
                    onPress={() => {
                      const link = generateReferralLink(accountData?.referral_code || "");
                      handleCopy(link);
                    }}
                    className="font-mono text-sm truncate text-blue-600 hover:underline"
                    aria-label="Copy Referral Link"
                  >
                    {accountData?.referral_code
                      ? generateReferralLink(accountData.referral_code)
                      : "N/A"}
                  </Button>
                </div>
                <div className="flex flex-col items-center">
                  <Button
                    onPress={() => {
                      console.log("Share button clicked");
                      handleOpen("opaque"); // Set backdrop to 'opaque'
                    }}
                    className="text-blue-600 hover:text-blue-800 focus:outline-none"
                    aria-label="Share Referral Link"
                    variant="ghost"
                  >
                    <FaShareAlt size={20} />
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">SHARE THROUGH</p>
                </div>
              </div>

              {/* Referral Stats - Confined to Right Section */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded shadow">
                  <p className="text-sm font-semibold">Friends Ordered</p>
                  <p className="text-lg font-bold">{referralStats.ordered}</p>
                </div>
                <div className="p-4 bg-white rounded shadow">
                  <p className="text-sm font-semibold">Delivered</p>
                  <p className="text-lg font-bold">{referralStats.delivered}</p>
                </div>
                <div className="p-4 bg-white rounded shadow">
                  <p className="text-sm font-semibold">Cancelled</p>
                  <p className="text-lg font-bold">{referralStats.cancelled}</p>
                </div>
              </div>

              {/* Placeholder Text */}
              <p className="mt-4 text-xs text-gray-500">
                Dates reflect when the order was placed
              </p>
            </div>
          </div>

          {/* Share Modal */}
          <Modal
            closeButton
            aria-labelledby="share-modal"
            isOpen={isOpen} // Corrected from 'open' to 'isOpen'
            onClose={() => {
              console.log("Modal closed");
              onClose();
            }}
            backdrop={backdrop} // Ensure 'backdrop' is of type BackdropType
          >
            <ModalContent>
              <>
                <ModalHeader className="flex flex-col gap-1">Share Your Referral Link</ModalHeader>
                <ModalBody>
                  <div className="flex flex-col space-y-4">
                    {/* Twitter */}
                    <Button
                      onPress={() => {
                        console.log("Twitter share clicked");
                        handleShare("twitter");
                      }}
                      className="flex items-center justify-center"
                      color="primary"
                      variant="solid"
                    >
                      <FaShareAlt className="mr-2" />
                      Twitter
                    </Button>
                    {/* Facebook */}
                    <Button
                      onPress={() => {
                        console.log("Facebook share clicked");
                        handleShare("facebook");
                      }}
                      className="flex items-center justify-center"
                      color="primary"
                      variant="solid"
                    >
                      <FaShareAlt className="mr-2" />
                      Facebook
                    </Button>
                    {/* LinkedIn */}
                    <Button
                      onPress={() => {
                        console.log("LinkedIn share clicked");
                        handleShare("linkedin");
                      }}
                      className="flex items-center justify-center"
                      color="primary"
                      variant="solid"
                    >
                      <FaShareAlt className="mr-2" />
                      LinkedIn
                    </Button>
                    {/* Email */}
                    <Button
                      onPress={() => {
                        console.log("Email share clicked");
                        handleShare("email");
                      }}
                      className="flex items-center justify-center"
                      color="primary"
                      variant="solid"
                    >
                      <FaShareAlt className="mr-2" />
                      Email
                    </Button>
                    {/* TikTok */}
                    <Button
                      onPress={() => {
                        console.log("TikTok share clicked");
                        handleShare("tiktok");
                      }}
                      className="flex items-center justify-center"
                      color="secondary" // Different color for TikTok
                      variant="solid"
                    >
                      <FaShareAlt className="mr-2" />
                      TikTok
                    </Button>
                    {/* Copy Link */}
                    <Button
                      onPress={() => {
                        console.log("Copy Link clicked");
                        handleCopy(generateReferralLink(accountData?.referral_code || ""));
                      }}
                      className="flex items-center justify-center"
                      color="default"
                      variant="solid"
                    >
                      <FaCopy className="mr-2" />
                      Copy Link
                    </Button>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => {
                      console.log("Close button clicked");
                      onClose();
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      console.log("Action button clicked");
                      onClose();
                    }}
                  >
                    Action
                  </Button>
                </ModalFooter>
              </>
            </ModalContent>
          </Modal>
        </CardBody>
      </Card>
      <Divider className="my-6 w-full lg:w-1/2" />

      {/* Latest Subscription Card */}
      <Card className="mb-6 w-full lg:w-1/2" ref={subscriptionRef}>
        <CardHeader className="flex items-center">
          <FaRedoAlt className="text-2xl text-blue-600 mr-4" />
          <h2 className="text-lg font-medium">Latest Subscription</h2>
        </CardHeader>
        <Divider />
        <CardBody className="py-8 px-6">
          {subscriptions.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              <p className="font-semibold">Description:</p>
              <p>{subscriptions[subscriptions.length - 1].description || "N/A"}</p>

              <p className="font-semibold">Purchase Date:</p>
              <p>{formatDate(subscriptions[subscriptions.length - 1].created)}</p>

              <p className="font-semibold">Amount:</p>
              <p>
                {formatCurrency(
                  subscriptions[subscriptions.length - 1].amount || 0,
                  subscriptions[subscriptions.length - 1].currency || "USD"
                )}
              </p>

              <p className="font-semibold">Renewal Date:</p>
              <p>{formatDate(subscriptions[subscriptions.length - 1].current_period_end)}</p>
            </div>
          ) : (
            <p>No subscriptions available.</p>
          )}
        </CardBody>
      </Card>
      <Divider className="my-6 w-full lg:w-1/2" />

      {/* Transaction History Card */}
      <Card className="mb-6 w-full lg:w-1/2" ref={transactionRef}>
        <CardHeader className="flex items-center">
          <FaListAlt className="text-2xl text-blue-600 mr-4" />
          <h2 className="text-lg font-medium">Transaction History</h2>
        </CardHeader>
        <Divider />
        <CardBody className="py-8 px-6">
          {subscriptions.length > 0 ? (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="text-left pb-2">Description</th>
                  <th className="text-left pb-2">Amount</th>
                  <th className="text-left pb-2">Purchase Date</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub.id} className="border-t">
                    <td className="py-2">{sub.description}</td>
                    <td className="py-2">
                      {formatCurrency(sub.amount || 0, sub.currency || "USD")}
                    </td>
                    <td className="py-2">{formatDate(sub.created)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No transactions available.</p>
          )}
        </CardBody>
      </Card>
      <Divider className="my-6 w-full lg:w-1/2" />

      {/* Devices Card */}
      <Card className="mb-6 w-full lg:w-1/2" ref={devicesRef}>
        <CardHeader className="flex items-center">
          <FaTabletAlt className="text-2xl text-blue-600 mr-4" />
          <h2 className="text-lg font-medium">Devices</h2>
        </CardHeader>
        <Divider />
        <CardBody className="py-8 px-6">
          {devices.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="text-left pb-2">Name</th>
                    <th className="text-left pb-2">IPv4 Address</th>
                    <th className="text-left pb-2">Public Key</th>
                    <th className="text-left pb-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((device) => (
                    <tr key={device.id} className="border-t">
                      <td className="py-2">{device.name || "N/A"}</td>
                      <td className="py-2">{device.ipv4_address || "N/A"}</td>
                      <td className="py-2 flex items-center whitespace-nowrap">
                        <span className="mr-4">
                          {showPubKey ? device.pubkey || "N/A" : "•••••••••••••••"}
                        </span>
                        {showPubKey ? (
                          <Button
                            variant="ghost"
                            className="flex items-center text-blue-600 mr-2"
                            onPress={() => {
                              console.log("Hiding public key");
                              setShowPubKey(false);
                            }}
                            aria-label="Hide Public Key"
                          >
                            <FaEyeSlash />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            className="flex items-center text-blue-600 mr-2"
                            onPress={() => {
                              console.log("Showing public key");
                              setShowPubKey(true);
                            }}
                            aria-label="Show Public Key"
                          >
                            <FaEye />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          className="flex items-center text-blue-600 mr-1"
                          onPress={() => handleCopy(device.pubkey || "")}
                          aria-label="Copy Public Key"
                        >
                          <FaCopy className="mr-1" />
                          Copy
                        </Button>
                        {copyFeedback && <FaCheck className="inline text-green-600" />}
                      </td>
                      <td className="py-2">
                        <Button
                          variant="ghost"
                          className="flex items-center text-red-600"
                          onPress={() => console.log("Delete device", device.name)}
                          aria-label={`Delete device ${device.name}`}
                        >
                          <FaTrashAlt />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No devices added yet.</p>
          )}
        </CardBody>
      </Card>
      <Divider className="my-6 w-full lg:w-1/2" />

      {/* Security Card */}
      <Card className="mb-6 w-full lg:w-1/2" ref={securityRef}>
        <CardHeader className="flex items-center">
          <FaShieldAlt className="text-2xl text-blue-600 mr-4" />
          <h2 className="text-lg font-medium">Security</h2>
        </CardHeader>
        <Divider />
        <CardBody className="py-8 px-6">
          <div className="grid grid-cols-2 gap-4">
            <p className="font-semibold">Email:</p>
            <p className="flex items-center">
              {userData?.email || "N/A"}
              <Button
                variant="ghost"
                className="flex items-center text-blue-600 ml-2"
                onPress={() => {
                  console.log("Edit Email clicked");
                  // Implement edit functionality
                }}
                aria-label="Edit Email"
              >
                <FaEdit />
              </Button>
            </p>

            <p className="font-semibold">Account Number:</p>
            <p className="flex items-center">
              {accountData?.account_number || "N/A"}
              <Button
                variant="ghost"
                className="flex items-center text-blue-600 ml-2"
                onPress={() => {
                  console.log("Edit Account Number clicked");
                  // Implement edit functionality
                }}
                aria-label="Edit Account Number"
              >
                <FaEdit />
              </Button>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AccountPage;
