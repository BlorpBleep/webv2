"use client";
import Layout from "./layout";
import React, { useState, useEffect } from "react";
import { FaApple, FaGoogle } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

// Initialize Supabase client using environment variables
console.log("Initializing Supabase client...");
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
console.log("Supabase client initialized:", supabase);

export default function LoginPage() {
  console.log("LoginPage component rendered");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    console.log("Login form submitted");
    console.log("Email:", email);
    console.log("Password: [HIDDEN]");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      console.log("Supabase response received");

      if (error) {
        console.error("Error during login:", error.message);
        setError(error.message ?? "An unknown error occurred");
      } else {
        console.log("Login successful, user data:", data);
        console.log("Redirecting to /account");
        router.push("/account");
      }
    } catch (err) {
      console.error("Unexpected error during login:", err);
      setError("An unexpected error occurred during login");
    }
  };

  const handleOAuthLogin = async (provider: "apple" | "google") => {
    console.log(`Starting OAuth login with ${provider}`);
    try {
      console.log("About to call signInWithOAuth...");
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      console.log("signInWithOAuth call completed");

      if (error) {
        console.error(`Error during ${provider} OAuth login:`, error.message);
        setError(error.message ?? "An unknown error occurred");
      } else {
        console.log(`${provider} OAuth login initiated`);
      }
    } catch (err) {
      console.error(`Unexpected error during ${provider} OAuth login:`, err);
      setError(`An unexpected error occurred during ${provider} OAuth login`);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered");
    const handleOAuthResponse = async () => {
      console.log("Checking for OAuth response in URL...");
      const hash = window.location.hash;
      console.log("URL hash:", hash);

      if (hash) {
        console.log("Processing OAuth response...");
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");
        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);

        if (accessToken && refreshToken) {
          try {
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            console.log("Supabase session response received");

            if (error) {
              console.error("Error setting the session with Supabase:", error.message);
              setError("Error setting the session with Supabase");
            } else {
              console.log("Session set successfully, user data:", data);
              console.log("Redirecting to /account");
              router.push("/account");
            }
          } catch (err) {
            console.error("Unexpected error while setting the session:", err);
            setError("An unexpected error occurred while setting the session");
          }
        } else {
          console.error("OAuth callback did not contain valid tokens");
          setError("OAuth callback did not contain valid tokens");
        }
      } else {
        console.log("No OAuth response found in URL.");
      }
    };

    handleOAuthResponse();
  }, [router]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-700">
            Log in
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  console.log("Email input changed:", e.target.value);
                  setEmail(e.target.value);
                }}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  console.log("Password input changed: [HIDDEN]");
                  setPassword(e.target.value);
                }}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Log in
            </button>
            <p className="text-center text-blue-500 mt-4 cursor-pointer">Forgot your password?</p>
          </form>

          <div className="mt-6">
            <button
              onClick={() => handleOAuthLogin("apple")}
              className="w-full mb-2 bg-gray-100 dark:bg-gray-700 py-2 rounded text-gray-800 dark:text-gray-200 flex items-center justify-between px-4"
            >
              <FaApple /> <span className="mx-auto">Continue with Apple</span>
            </button>
            <button
              onClick={() => handleOAuthLogin("google")}
              className="w-full bg-gray-100 dark:bg-gray-700 py-2 rounded text-gray-800 dark:text-gray-200 flex items-center justify-between px-4"
            >
              <FaGoogle /> <span className="mx-auto">Continue with Google</span>
            </button>
          </div>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account yet? <span className="text-blue-500 cursor-pointer">Get Started</span>
          </p>
        </div>
      </div>
    </Layout>
  );
}
