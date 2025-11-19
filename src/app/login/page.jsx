"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const SignIn = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Logged in successfully!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error("Authentication failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-300 to-green-200 relative">
      {/* Back to Home */}
      <Link
        href="/"
        className="absolute top-4 left-4 flex items-center text-white hover:text-gray-200"
      >
        <FaArrowLeft className="mr-1" />
        Back to Home
      </Link>

      <form
        onSubmit={handleSubmit}
        className="bg-teal-700/80 backdrop-blur-md rounded-lg shadow-lg p-8 w-80 flex flex-col items-center"
      >
        {/* User Icon */}
        <div className="text-white text-6xl mb-6">
          <FaUser />
        </div>

        {/* Email Input */}
        <div className="w-full mb-4">
          <div className="flex items-center text-gray-200 mb-1">
            <FaEnvelope className="mr-2" />
            <label htmlFor="email" className="text-sm">
              Email ID
            </label>
          </div>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 rounded bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div className="w-full mb-4">
          <div className="flex items-center text-gray-200 mb-1">
            <FaLock className="mr-2" />
            <label htmlFor="password" className="text-sm">
              Password
            </label>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full px-3 py-2 rounded bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Enter your password"
          />
        </div>

        {/* Remember me */}
        <div className="w-full flex justify-between items-center text-white text-sm mb-6">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2 accent-white" />
            Remember me
          </label>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-teal-800 hover:bg-teal-900 text-white py-2 rounded font-semibold transition-colors cursor-pointer"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default SignIn;
