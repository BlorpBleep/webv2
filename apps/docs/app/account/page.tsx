// File: app/account/page.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaTabletAlt,
  FaRedoAlt,
  FaEdit,
  FaCheck,
  FaShieldAlt,
  FaShareAlt,
} from "react-icons/fa";
import { MdIosShare } from "react-icons/md"; // Share Icon
import { RiFileCopyLine } from "react-icons/ri"; // Copy Icon
import { IoEyeOutline } from "react-icons/io5"; // Reveal Icon
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Link,
  useDisclosure,
} from "@nextui-org/react"; // NextUI components

import {
  getUserDetails,
  getAccountDetails,
  getSubscriptions,
  getDevices,
  getReferrals,
} from "./supabaseCalls"; // Import data fetching functions

import { supabase } from "../../utils/supabaseClient"; // Ensure correct path
import type { Database } from "../../types/supabase"; // Ensure correct path

type UserData = Database["public"]["Tables"]["users"]["Row"];
type AccountData = Database["public"]["Tables"]["accounts"]["Row"];
type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
type Device = Database["public"]["Tables"]["devices"]["Row"];
type Referral = Database["public"]["Tables"]["referrals"]["Row"];

// Date formatting function
const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
};

const AccountPage: React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showPubKey, setShowPubKey] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);
  const [referralStats, setReferralStats] = useState<{
    ordered: number;
    delivered: number;
    cancelled: number;
    referralDates: { date: string }[]; // Referral dates
  }>({ ordered: 0, delivered: 0, cancelled: 0, referralDates: [] });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState<"opaque" | "blur" | "transparent">("opaque");

  const membershipRef = useRef<HTMLDivElement>(null);
  const referralRef = useRef<HTMLDivElement>(null);
  const subscriptionRef = useRef<HTMLDivElement>(null);
  const devicesRef = useRef<HTMLDivElement>(null);
  const securityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !sessionData?.session?.user?.id) {
          router.push("/auth");
          return;
        }
        const userId = sessionData.session.user.id;

        // Fetch user details
        const userDetails = await getUserDetails(userId);
        setUserData(userDetails);

        // Fetch account details
        const accountsData = await getAccountDetails(userId);
        setAccountData(accountsData);

        // Fetch subscriptions
        const subscriptionsData = await getSubscriptions(userId);
        setSubscriptions(subscriptionsData);

        // Fetch devices
        if (accountsData && accountsData.account_number) {
          const devicesData = await getDevices(accountsData.account_number);
          setDevices(devicesData);
        }

        // Fetch referrals and compute statistics
        if (accountsData?.referral_code) {
          const referralData = await getReferrals(accountsData.referral_code);

          const ordered = referralData.filter((ref) => ref.status === "ordered").length;
          const delivered = referralData.filter((ref) => ref.status === "delivered").length;
          const cancelled = referralData.filter((ref) => ref.status === "cancelled").length;

          const referralDates = referralData.map((ref) => ({
            date: formatDate(ref.created_at),
          }));

          setReferralStats({ ordered, delivered, cancelled, referralDates });
        }
      } catch (error: any) {
        setError(`An unexpected error occurred: ${error.message || error}`);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleCopy = (text: string, key: string): void => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => setCopyFeedback((prev) => ({ ...prev, [key]: false })), 2000);
    });
  };

  const generateReferralLink = (code: string | null | undefined): string => {
    if (!code) return "https://cicadavpn.com/refer/default"; // Provide a default referral link or handle accordingly
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cicadavpn.com";
    return `${baseUrl.replace("www.", "")}/refer/${code}`;
  };

  const handleShare = (platform: string) => {
    const referralLink = generateReferralLink(accountData?.referral_code);
    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          referralLink
        )}&text=${encodeURIComponent("Join me on CicadaVPN! Use my referral link: ")}`;
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
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          "Join me on CicadaVPN! Use my referral link: " + referralLink
        )}`;
        break;
      case "pinterest":
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
          referralLink
        )}&description=${encodeURIComponent("Join me on CicadaVPN! Use my referral link: ")}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=Join me on CicadaVPN&body=${encodeURIComponent(
          "Use my referral link to join: " + referralLink
        )}`;
        break;
      case "sms":
        shareUrl = `sms:?body=${encodeURIComponent(
          "Join me on CicadaVPN! Use my referral link: " + referralLink
        )}`;
        break;
      default:
        alert("Unsupported platform");
        return;
    }

    const newWindow = window.open(shareUrl, "_blank");
    if (newWindow) {
      newWindow.focus();
    } else {
      alert("Unable to open share dialog. Please allow pop-ups for this website.");
    }
  };

  const handleOpen = (type: "opaque" | "blur" | "transparent") => {
    setBackdrop(type);
    onOpen();
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

      <div className="flex space-x-8 mb-8">

        <Button
          variant="ghost"
          className="border-none text-gray-900 dark:text-white flex flex-col items-center"
          onClick={() => referralRef.current?.scrollIntoView({ behavior: "smooth" })}
          aria-label="Refer & Earn"
        >
          <FaShareAlt size={80} color="grey" />
          <span className="mt-2 text-medium">Refer & Earn</span>
        </Button>

        <Button
          variant="ghost"
          className="border-none text-gray-900 dark:text-white flex flex-col items-center"
          onClick={() => subscriptionRef.current?.scrollIntoView({ behavior: "smooth" })}
          aria-label="Subscriptions"
        >
          <FaRedoAlt size={80} color="grey" />
          <span className="mt-2 text-medium">Subscriptions</span>
        </Button>

        <Button
          variant="ghost"
          className="border-none text-gray-900 dark:text-white flex flex-col items-center"
          onClick={() => devicesRef.current?.scrollIntoView({ behavior: "smooth" })}
          aria-label="Devices"
        >
          <FaTabletAlt size={80} color="grey" />
          <span className="mt-2 text-medium">Devices</span>
        </Button>

        <Button
          variant="ghost"
          className="border-none text-gray-900 dark:text-white flex flex-col items-center"
          onClick={() => securityRef.current?.scrollIntoView({ behavior: "smooth" })}
          aria-label="Security"
        >
          <FaShieldAlt size={80} color="grey" />
          <span className="mt-2 text-medium">Security</span>
        </Button>
      </div>

      {/* Membership Details */}
      <Card className="mb-6 w-full max-w-3xl bg-white dark:bg-gray-700" ref={membershipRef}>
        <CardHeader className="flex items-center">
          <FaUser className="text-gray-400 mr-4" size={24} />
          <h2 className="text-lg font-medium">Membership Details</h2>
        </CardHeader>
        <Divider />
        <CardBody className="py-8 px-6">
          <div className="flex flex-col">
            <div className="flex justify-between mb-4">
              <p className="font-semibold">Full Name:</p>
              <p>{userData?.full_name || "N/A"}</p>
            </div>

            <div className="flex justify-between mb-4">
              <p className="font-semibold">Email:</p>
              <p>{userData?.email || "N/A"}</p>
            </div>





            <div className="flex justify-between items-center mb-4 flex-direction: row-reverse; ">
              <p className="font-semibold">Account Number:</p>
              <div className="flex items-center border-2 border-dashed border-gray-300 p-2 rounded">
                <p className="text-red-600 dark:text-red-200 font-bold">
                  {accountData?.account_number
                    ? accountData.account_number.replace(/(\w{4})(?=\w)/g, "$1 ")
                    : "N/A"}
                </p>
                <Button
                  variant="ghost"
                  className="border-none flex items-center text-red-600 dark:text-red-200 ml-2 p-0"
                  onPress={() =>
                    accountData?.account_number
                      ? handleCopy(accountData.account_number.replace(/\s+/g, ""), "accountNumber")
                      : null
                  }
                  aria-label="Copy Account Number"
                >
                  <RiFileCopyLine size={24} color="grey" />
                </Button>
                {copyFeedback["accountNumber"] && <FaCheck className="inline ml-2 text-green-600" size={24} />}
              </div>
            </div>




            <div className="flex justify-between mb-4">
              <p className="font-semibold">Join Date:</p>
              <p>{formatDate(accountData?.created_at)}</p>
            </div>

            <div className="flex justify-between mb-4">
              <p className="font-semibold">Days Remaining:</p>
              <p>
                {accountData?.expiry
                  ? `${Math.max(
                      Math.ceil(
                        (new Date(accountData.expiry).getTime() - new Date().getTime()) /
                          (1000 * 60 * 60 * 24)
                      ),
                      0
                    )} days`
                  : "N/A"}
              </p>
            </div>

            <div className="flex justify-between mb-4">
              <p className="font-semibold">Role:</p>
              <p>Account Holder</p>
            </div>
      
            <div className="flex justify-between mb-4">
              <p className="font-semibold">Total Devices Active:</p>
              <p>{devices.length}</p>
            </div>

            <div className="flex justify-between mb-4">
              <p className="font-semibold">Most Recent Subscription:</p>
              <p>
                {subscriptions.length > 0
                  ? formatDate(
                      subscriptions
                        .map((sub) => sub.created)
                        .filter((created): created is string => created !== null)
                        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0]
                    )
                  : "N/A"}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Refer and Earn */}
      <Card className="mb-6 w-full max-w-3xl bg-white dark:bg-gray-700" ref={referralRef}>
        <CardHeader className="flex items-center">
          <FaShareAlt className="text-gray-400 mr-4" size={24} />
          <h2 className="text-lg font-medium">Refer and Earn</h2>
        </CardHeader>
        <Divider />
        <CardBody className="py-8 px-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3 flex flex-col justify-center">
              <h3 className="text-xl font-semibold mb-2">Invite Friends</h3>
              <h4 className="text-md font-medium mb-2">Earn Rewards</h4>
              <p className="text-sm mb-4">
                For every friend you refer who signs up and stays active, you'll receive exclusive
                rewards including free months, a free hoodie, backpack, baseball cap, or wireless charger.
              </p>
              <p className="text-sm mb-4">
                The more friends you invite, the more rewards you can earn! Share your referral link now and start earning exclusive benefits. By inviting your network, you contribute to the growth of CicadaVPN and increase your chances of receiving even bigger rewards in the future.
              </p>
              <a
                href="/docs/policies/referral_terms"
                className="text-blue-600 hover:underline text-sm"
              >
                Learn more
              </a>
            </div>

            <div className="w-full md:w-2/3">
              <div className="flex flex-col">
                {/* Referral Link */}
                <div className="flex items-center justify-between bg-white dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 rounded">
                  <div className="flex-grow">
                    <p className="text-sm font-semibold mb-2">UNIQUE REFERRAL LINK</p>
                    <div className="flex flex-col">
                      <Link
                        href={generateReferralLink(accountData?.referral_code)}
                        isExternal
                        className="font-mono text-lg text-red-600 dark:text-red-200 font-bold hover:underline mb-2"
                        aria-label="Referral Link"
                      >
                        {accountData?.referral_code
                          ? generateReferralLink(accountData.referral_code)
                          : "N/A"}
                      </Link>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          className="border-none flex items-center text-blue-600"
                          onPress={() =>
                            accountData?.referral_code
                              ? handleCopy(generateReferralLink(accountData.referral_code), "referralLink")
                              : null
                          }
                          aria-label="Copy Referral Link"
                        >
                          <RiFileCopyLine size={24} color="grey" />
                        </Button>
                        <Button
                          variant="ghost"
                          className="border-none flex items-center text-blue-600"
                          onPress={onOpen}
                          aria-label="Share Referral Link"
                        >
                          <MdIosShare size={24} color="grey" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Referral Dates */}
                <div className="mt-6">
                  <h4 className="text-sm mb-2">Dates reflect when the order was placed</h4>
                  <table className="table-auto w-full border-t border-gray-300 dark:border-gray-600">
                    <thead>
                      <tr>
                        <th className="text-left pb-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referralStats.referralDates.map((dateObj, idx) => (
                        <tr key={idx} className="border-t border-gray-300 dark:border-gray-600">
                          <td className="py-2">{dateObj.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Referral Statistics */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white dark:bg-gray-700 border rounded shadow text-center flex items-center justify-center">
                  <div>
                    <p className="text-sm font-semibold">Friends Ordered</p>
                    <p className="text-lg font-bold">{referralStats.ordered}</p>
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-700 border rounded shadow text-center flex items-center justify-center">
                  <div>
                    <p className="text-sm font-semibold">Delivered</p>
                    <p className="text-lg font-bold">{referralStats.delivered}</p>
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-700 border rounded shadow text-center flex items-center justify-center">
                  <div>
                    <p className="text-sm font-semibold">Cancelled</p>
                    <p className="text-lg font-bold">{referralStats.cancelled}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Subscriptions */}
      <Card className="mb-6 w-full max-w-3xl bg-white dark:bg-gray-800" ref={subscriptionRef}>
        <CardHeader className="flex items-center">
          <FaRedoAlt className="text-gray-400 mr-4" size={24} />
          <h2 className="text-lg font-medium">Subscriptions</h2>
        </CardHeader>
        <Divider />
        <CardBody className="py-8 px-6">
          {subscriptions.length > 0 ? (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="text-left pb-2">Description</th>
                  <th className="text-left pb-2">Amount</th>
                  <th className="text-left pb-2">Status</th>
                  <th className="text-left pb-2">Plan Added</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub, idx) => (
                  <tr key={idx} className="border-t border-gray-300 dark:border-gray-600">
                    <td className="py-2">{sub.description || "N/A"}</td>
                    <td className="py-2">
                      {sub.amount !== null
                        ? sub.currency === "USD"
                          ? `$${(sub.amount / 100).toFixed(2)}`
                          : sub.currency === "EUR"
                          ? `€${(sub.amount / 100).toFixed(2)}`
                          : `${sub.amount} ${sub.currency}`
                        : "N/A"}
                    </td>
                    <td className="py-2">{sub.cancel_at ? "Cancelled" : "Active"}</td>
                    <td className="py-2">{formatDate(sub.created)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No subscriptions found.</p>
          )}
        </CardBody>
      </Card>

      {/* Devices */}
      <Card className="mb-6 w-full max-w-3xl bg-white dark:bg-gray-800" ref={devicesRef}>
        <CardHeader className="flex items-center">
          <FaTabletAlt className="text-gray-400 mr-4" size={24} />
          <h2 className="text-lg font-medium">Devices</h2>
        </CardHeader>
        <Divider />
        <CardBody className="py-8 px-6">
          {devices.length > 0 ? (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="text-left pb-2">Name</th>
                  <th className="text-left pb-2">IPv4 Address</th>
                  <th className="text-left pb-2">Public Key</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device, idx) => (
                  <tr key={idx} className="border-t border-gray-300 dark:border-gray-600">
                    <td className="py-2">{device.name || "N/A"}</td>
                    <td className="py-2">{device.ipv4_address || "N/A"}</td>
                    <td className="py-2 flex items-center">
                      <span className="font-mono">
                        {device.pubkey
                          ? showPubKey
                            ? device.pubkey
                            : `${"*".repeat(10)}${device.pubkey.slice(-4)}`
                          : "N/A"}
                      </span>
                      <div className="flex ml-2 space-x-2">
                        <Button
                          variant="ghost"
                          className="border-none flex items-center text-gray-400 p-0"
                          onPress={() => setShowPubKey(!showPubKey)}
                          aria-label="Toggle Public Key Visibility"
                        >
                          <IoEyeOutline size={24} color="grey" />
                        </Button>
                        <Button
                          variant="ghost"
                          className="border-none flex items-center text-gray-400 p-0"
                          onPress={() => {
                            if (device.pubkey) {
                              handleCopy(device.pubkey, `devicePubKey_${idx}`);
                            }
                          }}
                          aria-label="Copy Public Key"
                        >
                          <RiFileCopyLine size={24} color="grey" />
                        </Button>
                        {copyFeedback[`devicePubKey_${idx}`] && (
                          <FaCheck className="inline ml-2 text-green-600" size={24} />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No devices found.</p>
          )}
        </CardBody>
      </Card>

      {/* Security */}
      <Card className="mb-6 w-full max-w-3xl bg-white dark:bg-gray-800" ref={securityRef}>
        <CardHeader className="flex items-center">
          <FaShieldAlt className="text-gray-400 mr-4" size={24} />
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
                className="border-none flex items-center text-gray-400 ml-2"
                onPress={() => handleOpen("opaque")}
                aria-label="Edit Email"
              >
                <FaEdit size={24} color="grey" />
              </Button>
            </p>

            <p className="font-semibold">Account Number:</p>
            <div className="flex items-center border-2 border-dashed border-gray-300 p-2 rounded">
              <p className="text-red-600 dark:text-red-200 font-bold">
                {accountData?.account_number
                  ? accountData.account_number.replace(/(\w{4})(?=\w)/g, "$1 ")
                  : "N/A"}
              </p>
              <Button
                variant="ghost"
                className="border-none flex items-center text-red-600 dark:text-red-200 ml-2"
                onPress={() => handleCopy(accountData?.account_number || "", "securityAccountNumber")}
                aria-label="Copy Account Number"
              >
                <RiFileCopyLine size={24} color="grey" />
              </Button>
              {copyFeedback["securityAccountNumber"] && <FaCheck className="inline ml-2 text-green-600" size={24} />}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Share Referral Link Modal */}
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Share Your Referral Link</ModalHeader>
          <ModalBody>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <MdIosShare className="text-gray-400 mr-2" size={24} />
                <Link
                  onClick={() => handleShare("email")}
                  className="text-blue-600 hover:underline"
                  href="#"
                >
                  Share on Email
                </Link>
              </div>
              <Divider />

              <div className="flex items-center">
                <MdIosShare className="text-gray-400 mr-2" size={24} />
                <Link
                  onClick={() => handleShare("twitter")}
                  className="text-blue-600 hover:underline"
                  href="#"
                >
                  Share on Twitter (X)
                </Link>
              </div>

              <div className="flex items-center">
                <MdIosShare className="text-gray-400 mr-2" size={24} />
                <Link
                  onClick={() => handleShare("facebook")}
                  className="text-blue-600 hover:underline"
                  href="#"
                >
                  Share on Facebook
                </Link>
              </div>

              <div className="flex items-center">
                <MdIosShare className="text-gray-400 mr-2" size={24} />
                <Link
                  onClick={() => handleShare("linkedin")}
                  className="text-blue-600 hover:underline"
                  href="#"
                >
                  Share on LinkedIn
                </Link>
              </div>

              <div className="flex items-center">
                <MdIosShare className="text-gray-400 mr-2" size={24} />
                <Link
                  onClick={() => handleShare("whatsapp")}
                  className="text-blue-600 hover:underline"
                  href="#"
                >
                  Share on WhatsApp
                </Link>
              </div>

              <div className="flex items-center">
                <MdIosShare className="text-gray-400 mr-2" size={24} />
                <Link
                  onClick={() => handleShare("pinterest")}
                  className="text-blue-600 hover:underline"
                  href="#"
                >
                  Share on Pinterest
                </Link>
              </div>

              <div className="flex items-center">
                <MdIosShare className="text-gray-400 mr-2" size={24} />
                <Link
                  onClick={() => handleShare("sms")}
                  className="text-blue-600 hover:underline"
                  href="#"
                >
                  Share on SMS
                </Link>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AccountPage;
