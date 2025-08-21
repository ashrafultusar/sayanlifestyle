"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBoxOpen,
  FaUserShield,
  FaThList,
  FaShoppingCart,
  FaTruck,
  FaImages,
  FaSignOutAlt,
} from "react-icons/fa";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Products", href: "/dashboard/products", icon: <FaBoxOpen /> },
   
    { name: "Admins", href: "/dashboard/manageAdmin", icon: <FaUserShield /> },
    { name: "Categorys", href: "/dashboard/manageCategorie", icon: <FaThList /> },
    { name: "Orders", href: "/dashboard/orders", icon: <FaShoppingCart /> },
    { name: "Delivery Charges", href: "/dashboard/deliveryCharges", icon: <FaTruck /> },
    { name: "Home Slider", href: "/dashboard/homeSlider", icon: <FaImages /> },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg border-r h-screen flex flex-col sticky top-0">
      {/* Logo / Header */}
      <div className="px-6 py-5 border-b flex items-center justify-center">
        <img
          className="h-8"
          src="https://merakiui.com/images/logo.svg"
          alt="Logo"
        />
      </div>

      {/* Navigation Links */}
      <nav className="mt-6 flex-1">
        {links.map((link) => {
          const active = pathname.startsWith(link.href);
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition 
                ${active ? "bg-gray-200 font-semibold text-gray-900" : ""}`}
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button (Always at Bottom) */}
      <div className="border-t">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 w-full px-6 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
