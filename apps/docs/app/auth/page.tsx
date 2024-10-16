// app/auth/page.tsx

"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  Input,
  Button,
  Checkbox,
  Link,
  Spacer,
  Divider,
} from "@nextui-org/react";
import { FaApple, FaGoogle } from "react-icons/fa";
import { supabase } from "@/utils/supabaseClient";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showEmailSignUp, setShowEmailSignUp] = useState(false);
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setShowEmailSignUp(false);
    setShowEmailLogin(false);
    setError(null);
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
          lg:max-w-4xl
          w-full 
          flex 
          flex-col 
          lg:flex-row 
          p-6 
          bg-card 
          rounded-lg
          shadow-lg
          dark:bg-gray-800
        "
      >
        {/* Left Section: Form */}
        <div
          className={`
            flex-1
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
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            transition-opacity 
            transition-transform 
            duration-500 
            dark:bg-gray-800
          `}
        >
          {/* Logo Section */}
          <div className="flex justify-center w-full mb-6">
            <div
              className="flex-shrink-0"
              style={{ width: "60px", height: "60px" }}
            >
              {/* Light Mode Logo */}
              <Image
                src="/images/1024_black.png"
                alt="Logo"
                width={60}
                height={60}
                className="object-contain dark:hidden"
              />
              {/* Dark Mode Logo */}
              <Image
                src="/images/1024_white.png"
                alt="Logo"
                width={60}
                height={60}
                className="object-contain hidden dark:block"
              />
            </div>
          </div>

          {/* Form Title */}
          <h3 className="text-center mb-6 text-text text-2xl font-semibold dark:text-white">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h3>

          {/* Social Login Buttons */}
          <div className="flex flex-col items-center w-full max-w-xs mx-auto space-y-4">
            <Button
              variant="bordered"
              color="primary"
              aria-label={isLogin ? "Log In with Google" : "Sign Up with Google"}
              startContent={<FaGoogle />}
              onPress={() => handleOAuthLogin("google")}
              className="dark:bg-gray-300 justify-start rounded-full w-full"
            >
              {isLogin ? "Continue with Google" : "Sign Up with Google"}
            </Button>
            <Button
              variant="bordered"
              color="primary"
              aria-label={isLogin ? "Log In with Apple" : "Sign Up with Apple"}
              startContent={<FaApple />}
              onPress={() => handleOAuthLogin("apple")}
              className="dark:bg-gray-300 justify-start rounded-full w-full"
            >
              {isLogin ? "Continue with Apple" : "Sign Up with Apple"}
            </Button>
          </div>

          {/* Divider */}
          <Divider className="w-full my-6 dark:border-gray-600" />

          {/* Conditional Buttons for Email Authentication */}
          {isLogin ? (
            <>
              {!showEmailLogin && (
                <div className="flex justify-center w-full max-w-xs mx-auto">
                  <Button
                    variant="flat"
                    color="primary"
                    aria-label="Login with Email"
                    onPress={() => setShowEmailLogin(true)}
                    className="mb-4 dark:bg-gray-100 justify-start rounded-full w-full"
                  >
                    Login with Email
                  </Button>
                </div>
              )}

              {/* Authentication Form for Login with Email */}
              {showEmailLogin && (
                <div className="flex flex-col items-center w-full max-w-xs mx-auto">
                  <form onSubmit={handleAuth} className="w-full">
                    {/* Email Input */}
                    <label htmlFor="login-email" className="sr-only">
                      Email
                    </label>
                    <Input
                      id="login-email"
                      isClearable
                      color="primary"
                      size="lg"
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                      }
                      required
                      className="mb-4 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 w-full"
                    />

                    {/* Password Input */}
                    <label htmlFor="login-password" className="sr-only">
                      Password
                    </label>
                    <Input
                      id="login-password"
                      isClearable
                      color="primary"
                      size="lg"
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                      }
                      required
                      className="mb-4 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 w-full"
                    />

                    {/* Remember and Forgot Password */}
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-8">
                      <Checkbox
                        isSelected={remember}
                        onChange={() => setRemember(!remember)}
                        color="primary"
                        className=" dark:text-white"
                      >
                        <span className="text-sm">Remember for 30 days</span>
                        
                      </Checkbox>
                      <Link
                        href="/forgot-password"
                        color="primary"
                        className="mt-2 sm:mt-0 text-center sm:text-left dark:text-blue-400"
                      >
                        <span className="text-sm">Forgot password?</span>
                      </Link>
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      color="primary"
                      aria-label="Log In"
                      className="rounded-full w-full"
                    >
                      Log In
                    </Button>
                  </form>
                </div>
              )}
            </>
          ) : (
            <>
              {!showEmailSignUp && (
                <div className="flex justify-center w-full max-w-xs mx-auto">
                  <Button
                    variant="flat"
                    color="primary"
                    aria-label="Sign Up with Email"
                    onPress={() => setShowEmailSignUp(true)}
                    className="mb-4 dark:bg-gray-100 justify-start rounded-full w-full"
                  >
                    Sign Up with Email
                  </Button>
                </div>
              )}

              {/* Authentication Form for Sign Up with Email */}
              {showEmailSignUp && (
                <div className="flex flex-col items-center w-full max-w-xs mx-auto">
                  <form onSubmit={handleAuth} className="w-full">
                    {/* Email Input */}
                    <label htmlFor="signup-email" className="sr-only">
                      Email
                    </label>
                    <Input
                      id="signup-email"
                      isClearable
                      color="primary"
                      size="lg"
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                      }
                      required
                      className="mb-4 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 w-full"
                    />

                    {/* Password Input */}
                    <label htmlFor="signup-password" className="sr-only">
                      Password
                    </label>
                    <Input
                      id="signup-password"
                      isClearable
                      color="primary"
                      size="lg"
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                      }
                      required
                      className="mb-4 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 w-full"
                    />

                    {/* Confirm Password Input */}
                    <label htmlFor="signup-confirm-password" className="sr-only">
                      Confirm Password
                    </label>
                    <Input
                      id="signup-confirm-password"
                      isClearable
                      color="primary"
                      size="lg"
                      placeholder="Confirm Password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setConfirmPassword(e.target.value)
                      }
                      required
                      className="mb-4 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 w-full"
                    />

                    {/* Terms and Privacy Policy */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                      <Checkbox
                        isSelected={terms}
                        onChange={() => setTerms(!terms)}
                        color="primary"
                        className="mb-2 sm:mb-0 dark:text-white"
                      >
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          color="primary"
                          className="dark:text-blue-400"
                        >
                          Terms
                        </Link>{" "}
                        &{" "}
                        <Link
                          href="/privacy"
                          color="primary"
                          className="dark:text-blue-400"
                        >
                          Privacy Policy
                        </Link>
                      </Checkbox>
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      color="primary"
                      aria-label="Sign Up"
                      className="rounded-full w-full"
                    >
                      Sign Up
                    </Button>
                  </form>
                </div>
              )}
            </>
          )}

          {/* Toggle Link */}
          <Spacer y={1} />
          
          <p className="text-center text-sm text-text dark:text-white">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <Link
              href="#"
              color="primary"
              onPress={toggleMode}
              className="dark:text-blue-400 text-sm"
            >
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
            hidden lg:block 
            shadow-lg 
            dark:bg-gray-700
          "
          style={{
            backgroundImage:
              "url('https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/white-building.jpg')",
          }}
        >
          {/* Overlay with Testimonial Text */}
          <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
            <p className="text-white text-xl p-4 max-w-md text-center">
              "CicadaVPN has revolutionized my online security. It's fast, reliable, and incredibly easy to use!"
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
