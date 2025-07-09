"use client";
import Link from "next/link";
import { useState } from "react";
import {
  FiPhoneCall,
  FiSearch,
  FiMenu,
  FiX,
  FiChevronRight,
} from "react-icons/fi";
import {
  FaTwitter,
  FaFacebookF,
  FaPinterestP,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-full shadow-sm border-b relative z-50">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 bg-[#E3B793] rounded-full flex items-center justify-center text-white text-xl font-bold">
            <span>∞</span>
          </div>
          <span className="text-2xl font-bold italic text-gray-800">SAYAN</span>
        </div>

        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/services">Services</Link>
          </li>
          <li>
            <Link href="/pages">Pages</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-1 text-gray-800">
            <FiPhoneCall className="text-[#E3B793]" />
            <div className="text-sm leading-4">
              <div className="text-xs text-gray-500">Call Anytime</div>
              <div className="text-base font-medium">+1- (246) 333-0089</div>
            </div>
          </div>

          <FiSearch className="text-xl text-gray-700 cursor-pointer" />

          <button className="bg-[#E3B793] text-white font-semibold text-sm px-5 py-2 rounded hover:bg-[#d09f74] transition">
            BOOK APPOINTMENT
          </button>
        </div>

        <button
          className="md:hidden text-2xl text-gray-700 cursor-pointer"
          onClick={() => setMobileMenuOpen(true)}
        >
          <FiMenu />
        </button>
      </nav>

      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-transform duration-500 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-gray-900 text-white z-50 transform transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#E3B793] rounded-full flex items-center justify-center text-white text-lg font-bold">
              <span>∞</span>
            </div>
            <span className="text-xl font-bold italic">Taylor</span>
          </div>

          <button
            className="cursor-pointer text-white text-xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FiX />
          </button>
        </div>

        <ul className="flex flex-col p-4 space-y-2 font-medium">
          {[
            ["Home", "/"],
            ["About", "/about"],
            ["Services", "/services"],
            ["Pages", "/pages"],
            ["Blog", "/blog"],
            ["Contact", "/contact"],
          ].map(([label, path]) => (
            <li
              key={path}
              className="flex justify-between items-center border-b border-gray-800 py-2 cursor-pointer"
            >
              <Link href={path}>{label}</Link>
              <FiChevronRight />
            </li>
          ))}
        </ul>

        <div className="flex justify-center space-x-4 py-6 border-t border-gray-800">
          <a href="#" className="text-white hover:text-[#E3B793]">
            <FaTwitter />
          </a>
          <a href="#" className="text-white hover:text-[#E3B793]">
            <FaFacebookF />
          </a>
          <a href="#" className="text-white hover:text-[#E3B793]">
            <FaPinterestP />
          </a>
          <a href="#" className="text-white hover:text-[#E3B793]">
            <FaInstagram />
          </a>
          <a href="#" className="text-white hover:text-[#E3B793]">
            <FaYoutube />
          </a>
        </div>
      </div>
    </div>
  );
}
