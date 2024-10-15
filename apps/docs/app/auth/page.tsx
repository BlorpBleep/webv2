// app/auth/page.tsx

"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  Input,
  Button,
  Checkbox,
  Link,
  Spacer,
  Divider, // Imported Divider
} from "@nextui-org/react";
import { FaApple, FaGoogle } from "react-icons/fa";
import { supabase } from "@/utils/supabaseClient"; // Corrected import path

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showEmailSignUp, setShowEmailSignUp] = useState(false); // State for sign-up
  const [showEmailLogin, setShowEmailLogin] = useState(false); // State for login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false); // State for animation
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setShowEmailSignUp(false); // Reset sign-up visibility when toggling mode
    setShowEmailLogin(false); // Reset login visibility when toggling mode
    setError(null); // Clear any existing errors
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isLogin) {
      if (showEmailLogin) {
        // Handle Login with Email
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setError(error.message ?? "An unknown error occurred");
        } else {
          router.push("/account");
        }
      } else {
        // OAuth login is handled by buttons; no action needed here
      }
    } else {
      if (showEmailSignUp) {
        // Handle Sign Up with Email
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/account`,
          },
        });

        if (error) {
          setError(error.message ?? "An unknown error occurred");
        } else {
          router.push("/account");
        }
      } else {
        // OAuth sign-up is handled by buttons; no action needed here
      }
    }
  };

  const handleOAuthLogin = async (provider: "apple" | "google") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/account`,
      },
    });

    if (error) {
      setError(error.message ?? "An unknown error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card
        className="
          max-w-3xl 
          lg:max-w-4xl  /* Increased max-width by ~10% on large screens */
          w-full 
          flex 
          flex-col 
          lg:flex-row  /* Switch to row on large screens */
          p-6 
          bg-card 
          rounded-lg
          shadow-lg
          dark:bg-gray-800  /* Dark mode background */
        "
      >
        {/* Left Section: Form */}
        <div
          className={`
            flex-[1.1]  /* Increased flex size by 10% */
            flex 
            flex-col 
            items-center 
            justify-center 
            p-8 
            bg-card 
            rounded-tl-lg 
            rounded-bl-lg 
            lg:rounded-tr-lg 
            lg:rounded-bl-none 
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            transition-opacity 
            transition-transform 
            duration-500
            dark:bg-gray-800  /* Dark mode background */
          `}
        >
          {/* Form Title */}
          <h3 className="text-center mb-6 text-text text-2xl font-semibold dark:text-white">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h3>

          {/* Social Login Buttons */}
          <Button
            variant="bordered"
            color="primary"
            fullWidth
            startContent={<FaGoogle />}
            onPress={() => handleOAuthLogin("google")}
            className="mb-4 justify-start rounded-full"
          >
            {isLogin ? "Continue with Google" : "Sign Up with Google"}
          </Button>
          <Button
            variant="bordered"
            color="primary"
            fullWidth
            startContent={<FaApple />}
            onPress={() => handleOAuthLogin("apple")}
            className="mb-6 dark:bg-gray-300 justify-start rounded-full"
          >
            {isLogin ? "Continue with Apple" : "Sign Up with Apple"}
          </Button>

          {/* Divider */}
          <Divider className="w-full mb-6 dark:border-gray-600" /> {/* Added Divider with dark border */}

          {/* Conditional Buttons for Email Authentication */}
          {isLogin ? (
            <>
              {!showEmailLogin && (
                <Button
                  variant="flat"
                  color="primary"
                  fullWidth
                  onPress={() => setShowEmailLogin(true)}
                  className="mb-4 dark:bg-gray-100 justify-start rounded-full"
                >
                  Login with Email
                </Button>
              )}

              {/* Authentication Form for Login with Email */}
              {showEmailLogin && (
                <form onSubmit={handleAuth} className="w-full">
                  <Input
                    isClearable
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    required
                    className="mb-4 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" /* Removed border classes, added dark:border */
                  />
                  <Input
                    isClearable
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    required
                    className="mb-4 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" /* Removed border classes, added dark:border */
                  />

                  <div
                    className="
                      flex 
                      flex-col 
                      sm:flex-row 
                      justify-between 
                      items-center 
                      mb-4
                    "
                  >
                    <Checkbox
                      isSelected={remember}
                      onChange={() => setRemember(!remember)}
                      color="primary"
                      className="mb-2 sm:mb-0 dark:text-white" /* Added dark text */
                    >
                      Remember for 15 days
                    </Checkbox>
                    <Link
                      href="/forgot-password"
                      color="primary"
                      className="mt-2 sm:mt-0 text-center sm:text-left dark:text-blue-400"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {error && <p className="text-red-500 mb-4">{error}</p>}

                  <Button
                    type="submit"
                    color="primary"
                    fullWidth
                    className="rounded-full"
                  >
                    Log In
                  </Button>
                </form>
              )}
            </>
          ) : (
            <>
              {!showEmailSignUp && (
                <Button
                  variant="flat"
                  color="primary"
                  fullWidth
                  onPress={() => setShowEmailSignUp(true)}
                  className="mb-4 justify-start rounded-full"
                >
                  Sign Up with Email
                </Button>
              )}

              {/* Authentication Form for Sign Up with Email */}
              {showEmailSignUp && (
                <form onSubmit={handleAuth} className="w-full">
                  <Input
                    isClearable
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    required
                    className="mb-4 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" /* Removed border classes, added dark:border */
                  />
                  <Input
                    isClearable
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    required
                    className="mb-4 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" /* Removed border classes, added dark:border */
                  />
                  <Input
                    isClearable
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setConfirmPassword(e.target.value)
                    }
                    required
                    className="mb-4 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" /* Removed border classes, added dark:border */
                  />

                  <div
                    className="
                      flex 
                      flex-col 
                      sm:flex-row 
                      justify-between 
                      items-center 
                      mb-4
                    "
                  >
                    <Checkbox
                      isSelected={terms}
                      onChange={() => setTerms(!terms)}
                      color="primary"
                      className="mb-2 sm:mb-0 dark:text-white" /* Added dark text */
                    >
                      I agree to the{" "}
                      <Link href="/terms" color="primary" className="dark:text-blue-400">
                        Terms
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" color="primary" className="dark:text-blue-400">
                        Privacy Policy
                      </Link>
                    </Checkbox>
                  </div>

                  {error && <p className="text-red-500 mb-4">{error}</p>}

                  <Button
                    type="submit"
                    color="primary"
                    fullWidth
                    className="rounded-full"
                  >
                    Sign Up
                  </Button>
                </form>
              )}
            </>
          )}

          {/* Toggle Link */}
          <Spacer y={1} />
          <p className="text-center text-text dark:text-white">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <Link href="#" color="primary" onPress={toggleMode} className="dark:text-blue-400">
              {isLogin ? "Sign Up" : "Log In"}
            </Link>
          </p>
        </div>

        {/* Right Section: Testimonial */}
        <div
          className="
            flex-1 
            bg-cover 
            bg-center 
            rounded-tr-lg 
            rounded-br-lg 
            hidden lg:block  /* Ensure visibility on large screens only */
            shadow-lg
            dark:bg-gray-700  /* Dark mode background for testimonial */
          "
          style={{
            backgroundImage:
              "url('https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/white-building.jpg')",
          }}
        >
          {/* Optional: Add overlay or testimonial text here */}
        </div>
      </Card>
    </div>
  );
}
