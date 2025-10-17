"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import {
  FaBars,
  FaBoxOpen,
  FaUserShield,
  FaThList,
  FaShoppingCart,
  FaTruck,
  FaImages,
  FaArrowLeft,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const pathname = usePathname();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  };

  const links = [
    { name: "Orders", href: "/dashboard/orders", icon: <FaShoppingCart /> },
    { name: "Products", href: "/dashboard/products", icon: <FaBoxOpen /> },
    { name: "Admins", href: "/dashboard/manageAdmin", icon: <FaUserShield /> },
    {
      name: "Categorys",
      href: "/dashboard/manageCategorie",
      icon: <FaThList />,
    },
    {
      name: "Delivery Charges",
      href: "/dashboard/deliveryCharges",
      icon: <FaTruck />,
    },
    { name: "Home Slider", href: "/dashboard/homeSlider", icon: <FaImages /> },
    { name: "Back Home", href: "/", icon: <FaArrowLeft /> },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white flex justify-between items-center px-4 py-3 shadow-md">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 cursor-pointer"
        >
          {isOpen ? <IoClose size={24} /> : <FaBars size={24} />}
        </button>
        <Link href="/dashboard">
          <Image
            src="https://merakiui.com/images/logo.svg"
            alt="Logo"
            width={100}
            height={30}
            className="h-8 w-auto"
          />
        </Link>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 px-4 py-8 bg-white border-r transition-transform duration-300
  flex flex-col
  ${isOpen ? "translate-x-0" : "-translate-x-full"} 
  md:translate-x-0 md:static md:h-screen md:flex`}
      >
        {/* Logo */}
        <div className="hidden md:flex justify-center mb-8">
          <Link href="/dashboard">
            <Image
              src="https://merakiui.com/images/logo.svg"
              alt="Logo"
              width={100}
              height={30}
              className="h-8 w-auto"
            />
          </Link>
        </div>
<Link href={'/'} className="text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm">Go Back</Link>
        {/* Navigation */}
        <nav className="flex flex-col gap-2 mt-6 flex-grow">
          {links.map(({ name, href, icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm uppercase transition
            ${
              active
                ? "bg-blue-600 text-white"
                : "text-gray-700 bg-gray-100 hover:bg-gray-200"
            }`}
              >
                {icon}
                {name}
              </Link>
            );
          })}
        </nav>

        {/* Logout button fixed at bottom */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 rounded hover:bg-red-500 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg- bg-black opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
