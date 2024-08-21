"use client";
import Layout from "./layout";
import React, { useState } from "react";
import { FaApple, FaGoogle } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation"; // Use useRouter for navigation

// Initialize Supabase client using environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize the router

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message ?? "An unknown error occurred");
    } else {
      router.push("/account"); // Redirect to /account on success
    }
  };

  const handleOAuthLogin = async (provider: "apple" | "google") => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });

    if (error) {
      setError(error.message ?? "An unknown error occurred");
    } else {
      router.push("/account"); // Redirect to /account on success
    }
  };

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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
