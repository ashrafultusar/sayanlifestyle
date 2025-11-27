"use client";

import Sidebar from "@/Components/dashboard/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardLayout = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login"); 
     
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return null; 
  }

  return (
    <div className="flex min-h-screen overflow-hidden ">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 overflow-auto h-screen
      ">{children}</main>
    </div>
  );
};

export default DashboardLayout;
