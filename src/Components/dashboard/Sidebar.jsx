// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useState, useEffect, useRef } from "react";
// import { usePathname } from "next/navigation";
// import { signOut, useSession } from "next-auth/react";

// import {
//   FaBars,
//   FaBoxOpen,
//   FaUserShield,
//   FaThList,
//   FaShoppingCart,
//   FaTruck,
//   FaImages,
//   FaArrowLeft,
// } from "react-icons/fa";
// import { IoClose } from "react-icons/io5";

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const dropdownRef = useRef(null);

//   const pathname = usePathname();
//   const { data: session } = useSession();

//   const handleLogout = async () => {
//     await signOut({
//       redirect: true,
//       callbackUrl: "/login",
//     });
//   };

//   const links = [
//     { name: "Orders", href: "/dashboard/orders", icon: <FaShoppingCart /> },
//     { name: "Products", href: "/dashboard/products", icon: <FaBoxOpen /> },
//     { name: "Admins", href: "/dashboard/manageAdmin", icon: <FaUserShield /> },
//     {
//       name: "Categorys",
//       href: "/dashboard/manageCategorie",
//       icon: <FaThList />,
//     },
//     {
//       name: "Delivery Charges",
//       href: "/dashboard/deliveryCharges",
//       icon: <FaTruck />,
//     },
//     { name: "Home Slider", href: "/dashboard/homeSlider", icon: <FaImages /> },
//     { name: "Back Home", href: "/", icon: <FaArrowLeft /> },
//   ];

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <>
//       {/* Mobile Topbar */}
//       <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white flex justify-between items-center px-4 py-3 shadow-md navbar no-print">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="p-2 cursor-pointer"
//         >
//           {isOpen ? <IoClose size={24} /> : <FaBars size={24} />}
//         </button>
//         <Link href="/dashboard">
//           <Image
//             src="https://merakiui.com/images/logo.svg"
//             alt="Logo"
//             width={100}
//             height={30}
//             className="h-8 w-auto"
//           />
//         </Link>
//       </div>

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 z-40 h-screen w-64 px-4 py-8 bg-white border-r transition-transform duration-300
//   flex flex-col
//   ${isOpen ? "translate-x-0" : "-translate-x-full"} 
//   md:translate-x-0 md:static md:h-screen md:flex`}
//       >
//         {/* Logo */}
//         <div className="hidden md:flex justify-center mb-8 navbar no-print">
//           <Link href="/dashboard">
//             <Image
//               src="https://merakiui.com/images/logo.svg"
//               alt="Logo"
//               width={100}
//               height={30}
//               className="h-8 w-auto"
//             />
//           </Link>
//         </div>

//         {/* Navigation */}
//         <nav className="flex flex-col gap-2 mt-6 flex-grow">
//           {links.map(({ name, href, icon }) => {
//             const active = pathname === href;
//             return (
//               <Link
//                 key={name}
//                 href={href}
//                 className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm uppercase transition
//             ${
//               active
//                 ? "bg-blue-600 text-white"
//                 : "text-gray-700 bg-gray-100 hover:bg-gray-200"
//             }`}
//               >
//                 {icon}
//                 {name}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Logout button fixed at bottom */}
//         <div className="mt-auto">
//           <button
//             onClick={handleLogout}
//             className="w-full px-4 py-2 bg-red-600 rounded hover:bg-red-500 cursor-pointer"
//           >
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Overlay for Mobile */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg- bg-black opacity-40 z-30 md:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}
//     </>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  ShoppingBag,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Truck,
  Layers,
  Users,
  Image as ImageIcon,
  ArrowLeft,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true); // Desktop Toggle
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Mobile Drawer
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  const links = [
    { name: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
    { name: "Products", href: "/dashboard/products", icon: Layers },
    { name: "Admins", href: "/dashboard/manageAdmin", icon: Users },
    { name: "Categories", href: "/dashboard/manageCategorie", icon: Layers },
    { name: "Shipping", href: "/dashboard/deliveryCharges", icon: Truck },
    { name: "Home Slider", href: "/dashboard/homeSlider", icon: ImageIcon },
    { name: "Back Home", href: "/", icon: ArrowLeft },
  ];

  return (
    <>
      {/* --- 1. Mobile & Tablet Top Navbar (Visible only on < 1024px) --- */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0f172a] flex items-center justify-between px-5 z-[60] border-b border-white/5 shadow-xl">
        <div className="relative w-28 h-8">
          <Image 
            src="/assets/logo1.jpeg" 
            alt="Logo" 
            fill 
            className="object-contain" 
          />
        </div>
        
        {/* Hamburger Icon on Right Side */}
        <button
          className="p-2 text-white hover:bg-white/10 rounded-lg transition-all"
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* --- 2. Sidebar Main Container --- */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-[100]
          bg-[#0f172a] text-gray-400
          transition-all duration-500 ease-in-out border-r border-white/5
          /* Desktop Logic */
          lg:static lg:translate-x-0 ${isOpen ? "lg:w-72" : "lg:w-20"}
          /* Mobile Logic */
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          w-[280px] lg:h-screen
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section (Desktop Only) */}
          <div className="hidden lg:flex items-center justify-between px-6 py-8">
            <div className={`relative h-10 transition-all duration-300 ${isOpen ? "w-32" : "w-0 opacity-0 overflow-hidden"}`}>
               <Image src="/assets/logo1.jpeg" alt="Logo" fill className="object-contain" />
            </div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-blue-600 text-white shadow-lg rounded-full p-1 hover:scale-110 transition-transform"
            >
              {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>

          {/* Mobile Close Button (Visible only on Drawer) */}
          <div className="lg:hidden flex justify-end p-4">
            <button 
              className="text-white p-2 bg-white/5 rounded-full" 
              onClick={() => setIsMobileOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-4 mt-4 lg:mt-0">
            <p className={`text-[10px] uppercase tracking-[3px] text-gray-500 mb-6 px-3 font-black ${!isOpen && "lg:hidden"}`}>
              Management
            </p>

            <nav className="space-y-1.5">
              {links.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`
                      flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300
                      text-[12px] font-bold uppercase tracking-[1.5px]
                      ${isActive 
                        ? "bg-white text-[#0f172a] shadow-[0_10px_20px_rgba(255,255,255,0.1)]" 
                        : "hover:bg-white/5 hover:text-white"}
                    `}
                  >
                    <item.icon size={20} className={`shrink-0 ${isActive ? "text-[#0f172a]" : "text-gray-500"}`} />
                    <span className={`transition-opacity duration-300 ${!isOpen && "lg:hidden opacity-0"}`}>
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sign Out */}
          <div className="p-4 border-t border-white/5 mt-auto">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 group transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-red-500/20 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                <X size={20} />
              </div>
              <span className={`text-[11px] font-black text-red-500 uppercase tracking-widest ${!isOpen && "lg:hidden"}`}>
                Sign Out
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* --- 3. Mobile Backdrop Overlay --- */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}