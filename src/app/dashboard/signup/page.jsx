"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

const SignUp = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
  
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        toast.success("✅ Registration successful!");
        // login after register (optional)
        await signIn("credentials", {
          email,
          password,
          redirect: true,
          callbackUrl: "/dashboard/manageAdmin", // এখানে তোমার admin panel route
        });
      } else {
        toast.error(data.error || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  



  return (
    <div className="flex w-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <div
        className="hidden bg-cover lg:block lg:w-1/2"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?auto=format&fit=crop&w=1575&q=80')",
        }}
      ></div>

      <form onSubmit={handleSubmit} className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div className="flex justify-center mx-auto">
          <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="Logo" />
        </div>

        <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
          Create your account
        </p>

       

        {/* Email/password form */}
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
          <span className="text-xs text-center text-gray-500 uppercase">
            or register with email
          </span>
          <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        </div>

        <div className="mt-4">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Name</label>
          <input id="name" name="name" type="text" required className="block w-full px-4 py-2 border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300" />
        </div>

        <div className="mt-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Email</label>
          <input id="email" name="email" type="email" required className="block w-full px-4 py-2 border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300" />
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Password</label>
          <input id="password" name="password" type="password" required className="block w-full px-4 py-2 border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300" />
        </div>

        <div className="mt-6">
          <button type="submit" className="w-full px-6 py-3 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
