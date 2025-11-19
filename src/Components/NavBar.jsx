"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiPhoneCall, FiSearch, FiMenu, FiX } from "react-icons/fi";
import { FaCartArrowDown, FaFacebookF } from "react-icons/fa";
import { useData } from "@/context/DataContext";

export default function Navbar() {
  const router = useRouter();
  const { categories } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/collection?search=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm("");
  };

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("checkoutData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData)) {
          setCartCount(parsedData.length);
        }
      }
    } catch {}
  }, []);

  return (
    <div className="w-full shadow-sm relative z-50 text-black">
      {/* Top Layer */}
      <div className="bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo + Brand Name */}
          <Link href={"/"} className="flex items-center gap-2">
            
            <span className="font-[Montserrat] text-xl uppercase tracking-wide text-gray-900">
              <span className="text-orange-500">Sayan</span> Lifestyle
            </span>
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
              className="w-full border border-gray-300 rounded-l-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-orange-400"
            />
            <button
              type="submit"
              className="bg-black text-white rounded-r-full px-4 hover:bg-orange-500 transition-colors duration-300"
            >
              <FiSearch />
            </button>
          </form>

          {/* Contact & Facebook & Cart */}
          <div className="hidden md:flex items-center space-x-5 text-sm">
            <div className="flex items-center space-x-1 text-gray-700">
              <a
                href="https://wa.me/01903550555"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-green-600 transition"
              >
                <FiPhoneCall className="text-orange-500" />
                <span>01903550555</span>
              </a>
            </div>

            <Link
              target="_blank"
              href="https://www.facebook.com/people/Sayan-Lifestyle/61581716045681/?mibextid=ZbWKwL"
            >
              <FaFacebookF className="text-blue-600 hover:text-blue-800 transition-colors duration-300" />
            </Link>

            {/* Cart Icon with Badge */}
            <Link href="/checkout" className="relative">
              <FaCartArrowDown className="text-2xl text-gray-700 hover:text-black transition-colors duration-300" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {cartCount}
                </span>
              )}
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
        <div className="container mx-auto flex items-center justify-between px-4 py-2 text-sm">
          <div className="flex items-center space-x-6 uppercase font-bold">
            {categories?.map((cat, i) => (
              <Link
                key={i}
                href={`/collection?category=${encodeURIComponent(cat?.name)}`}
                className="hover:text-orange-500 transition-colors duration-300"
              >
                {cat?.name}
              </Link>
            ))}
          </div>
          <Link href={"/collection"}>
            <button className="hover:text-orange-500 transition-colors duration-300 uppercase font-bold cursor-pointer">
              Collection
            </button>
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
        <div className="flex items-center justify-between p-4 border-b">
          <Link href={"/"} className="flex items-center gap-2">
           
            <span className="font-[Montserrat] text-xl uppercase tracking-wide text-gray-900">
              <span className="text-orange-500">Sayan</span> Lifestyle
            </span>
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
            className="flex-1 border border-gray-300 rounded-l-full px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="bg-black text-white rounded-r-full px-4 hover:bg-orange-500 transition-colors duration-300"
          >
            <FiSearch />
          </button>
        </form>

        {/* Contact & Categories */}
        <div className="p-4 border-t space-y-3 text-sm">
          <div className="flex items-center space-x-2 text-gray-700">
            <a
              href="https://wa.me/01903550555"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-green-600 transition"
            >
              <FiPhoneCall className="text-orange-500" />
              <span>01903550555</span>
            </a>
          </div>
          <Link href="#">
            <FaFacebookF className="text-blue-600 hover:text-blue-800 transition-colors duration-300" />
          </Link>
        </div>

        <div className="p-4 border-t space-y-3">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={`/collection?category=${encodeURIComponent(cat?.name)}`}
              className="hover:text-orange-500 uppercase block border-b py-2 transition-colors duration-300"
            >
              {cat?.name}
            </Link>
          ))}
          <Link href={"/collection"}>
            <button className="hover:text-orange-500 transition-colors duration-300 uppercase font-bold">
              Collection
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
