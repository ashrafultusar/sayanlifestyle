"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiPhoneCall, FiSearch, FiMenu, FiX } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";
import useCategories from "@/hook/useCategories";

export default function Navbar() {
  const router = useRouter();
  const { categories } = useCategories();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/collection?search=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm(""); // Optional: clear input after search
  };

  return (
    <div className="w-full shadow-sm relative z-50 text-black">
      {/* Top Layer */}
      <div className="bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link href={"/"}>
            <div className="flex items-center space-x-2 text-xl font-bold">
              SAYAN
            </div>
          </Link>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md mx-6"
          >
            <input
              type="text"
              placeholder="Search for products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded-l-full px-4 py-2 text-sm outline-none"
            />
            <button
              type="submit"
              className="bg-black text-white rounded-r-full px-4"
            >
              <FiSearch />
            </button>
          </form>

          {/* Contact & Facebook */}
          <div className="hidden md:flex items-center space-x-4 text-sm">
            <Link href={"/dashboard"}>
              <button className="cursor-pointer px-2 py-2 rounded-md border">
                Dashboard
              </button>
            </Link>
            <div className="flex items-center space-x-1">
              <FiPhoneCall />
              <span>09639-184415</span>
            </div>
            <Link href="#">
              <FaFacebookF className="text-blue-600" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden cursor-pointer text-2xl"
            onClick={() => setMobileMenuOpen(true)}
          >
            <FiMenu />
          </button>
        </div>
      </div>

      {/* Bottom Categories (Desktop) */}
      <div className="hidden md:flex w-full bg-blue-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 text-sm font-medium">
          <div className="flex items-center space-x-6">
            {categories?.map((cat, i) => (
              <Link
                key={i}
                href={`/collection?category=${encodeURIComponent(cat?.name)}`}
                className="hover:text-orange-400"
              >
                {cat?.name}
              </Link>
            ))}
          </div>
          <Link href="/collection" className="hover:text-orange-400">
            All Collection
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
        <div className="flex items-center justify-between p-4">
          <Link href={"/"}>
            <div className="text-lg font-bold">SAYAN</div>
          </Link>
          <button onClick={() => setMobileMenuOpen(false)}>
            <FiX className="text-2xl cursor-pointer" />
          </button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearchSubmit} className="p-4 flex">
          <input
            type="text"
            placeholder="Search for products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border rounded-l-full px-3 py-2 text-sm outline-none"
          />
          <button
            type="submit"
            className="bg-black text-white rounded-r-full px-4"
          >
            <FiSearch />
          </button>
        </form>

        {/* Contact & Categories */}
        <div className="p-4 border-t space-y-3 text-sm">
          <div className="flex items-center space-x-2">
            <FiPhoneCall />
            <span>09639-184415</span>
          </div>
          <Link href="#">
            <FaFacebookF className="text-blue-600" />
          </Link>
        </div>

        <div className="p-4 border-t space-y-3">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={`/collection?category=${encodeURIComponent(cat?.name)}`}
              className="hover:text-orange-400 block border-b py-2"
            >
              {cat?.name}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t">
          <Link href="/collection" className="hover:text-black">
            Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
