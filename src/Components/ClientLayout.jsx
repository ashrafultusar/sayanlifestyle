"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import Navbar from "@/Components/NavBar";
import Footer from "@/Components/Footer";
import ClientProvider from "@/Components/ClientProvider";
import { ToastContainer } from "react-toastify";
import { DataProvider } from "@/context/DataContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Hide Navbar/Footer on these routes
  const hideLayoutOn = ["/dashboard", "/login"];
  const shouldHideLayout = hideLayoutOn.some(path => pathname.startsWith(path));

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <DataProvider>
      <ToastContainer />
      {!shouldHideLayout && <Navbar />}

      <ClientProvider>
        <main style={{ minHeight: "calc(100vh - 64px - 64px)" }}>{children}</main>
      </ClientProvider>
      </DataProvider>
      {!shouldHideLayout && <Footer />}
    </div>
  );
}
