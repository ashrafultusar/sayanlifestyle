"use client";
import Link from "next/link";
import { useState } from "react";
import { FiPhoneCall, FiSearch, FiMenu, FiX } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";
import { PiShirtFoldedLight } from "react-icons/pi";
import { GiWinterHat, GiTrousers } from "react-icons/gi";
import { MdChildCare } from "react-icons/md";
import { FaShirt } from "react-icons/fa6";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { label: "Jersey", icon: <PiShirtFoldedLight /> },
    { label: "Tshirt", icon: <FaShirt /> },
    { label: "Creative T-Shirt", icon: <FaShirt /> },
    { label: "Winter Clothes", icon: <GiWinterHat /> },
    { label: "Trousers", icon: <GiTrousers /> },
    { label: "Kids", icon: <MdChildCare /> },
  ];

  return (
    <div className="w-full  shadow-sm relative z-50 text-black">
      {/* Top Layer */}
      <div className="bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
         <Link href={'/'}> <div className="flex items-center space-x-2 text-xl font-bold">
            SAYAN
          </div></Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <input
              type="text"
              placeholder="Search for products"
              className="w-full border rounded-l-full px-4 py-2 text-sm outline-none"
            />
            <button className="bg-black text-white rounded-r-full px-4">
              <FiSearch />
            </button>
          </div>

          {/* Contact & Facebook */}
          <div className="hidden md:flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <FiPhoneCall />
              <span>09639-184415</span>
            </div>
            <Link href="#">
              <FaFacebookF className="text-blue-600" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileMenuOpen(true)}
          >
            <FiMenu />
          </button>
        </div>
      </div>

      {/* Bottom Layer */}
      <div className="hidden md:flex w-full bg-blue-50 ">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 text-sm font-medium">
          <div className="flex items-center space-x-6">
            {categories.map((cat, i) => (
              <Link
                key={i}
                href="#"
                className="flex items-center space-x-1 text-gray-700 hover:text-black"
              >
                {cat.icon}
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>

          <Link href="#" className="hover:text-black">
            Login / Register
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 ">
          <div className="text-lg font-bold">SAYAN</div>
          <button onClick={() => setMobileMenuOpen(false)}>
            <FiX className="text-2xl" />
          </button>
        </div>

        {/* Search in mobile */}
        <div className="p-4 flex">
          <input
            type="text"
            placeholder="Search for products"
            className="flex-1 border rounded-l-full px-3 py-2 text-sm outline-none"
          />
          <button className="bg-black text-white rounded-r-full px-4">
            <FiSearch />
          </button>
        </div>

        {/* Contact & Facebook */}
        <div className="p-4 space-y-3 text-sm border-t">
          <div className="flex items-center space-x-2">
            <FiPhoneCall />
            <span>09639-184415</span>
          </div>
          <Link href="#">
            <FaFacebookF className="text-blue-600" />
          </Link>
        </div>

        {/* Categories */}
        <div className="p-4 space-y-3 border-t">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href="#"
              className="flex items-center space-x-2 py-2 border-b"
            >
              {cat.icon}
              <span>{cat.label}</span>
            </Link>
          ))}
        </div>

        {/* Login/Register */}
        <div className="p-4 border-t">
          <Link href="#">Login / Register</Link>
        </div>
      </div>
    </div>
  );
}
