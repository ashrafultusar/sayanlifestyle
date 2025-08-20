"use client";
import Sidebar from "@/Components/dashboard/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {

  const {data:session,status}=useSession()
  const router=useRouter()

  useEffect(() => {
    if (status === "loading") return; 
    if (!session) {
      router.push("/login"); 
    } else if (session.user.role !== "admin") {
      router.push("/"); 
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Checking authentication...</p>
      </div>
    );
  }

  if (!session || session.user.role !== "admin") {
    return null; 
  }
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
