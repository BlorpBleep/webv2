"use client";
import Layout from "./layout";
import React from "react";
import { FaApple, FaGoogle } from "react-icons/fa";


export default function LoginPage() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-700">
        Log in to your account and start securing your digital life.</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Email address</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter your password"
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Log in
            </button>
            <p className="text-center text-blue-500 mt-4 cursor-pointer">Forgot your password?</p>
          </form>



          <div className="mt-6">
  <button className="w-full mb-2 bg-gray-100 dark:bg-gray-700 py-2 rounded text-gray-800 dark:text-gray-200 flex items-center justify-between px-4">
    <FaApple /> <span className="mx-auto">Continue with Apple</span>
  </button>
  <button className="w-full bg-gray-100 dark:bg-gray-700 py-2 rounded text-gray-800 dark:text-gray-200 flex items-center justify-between px-4">
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