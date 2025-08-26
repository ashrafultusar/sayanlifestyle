import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Logo */}
        <div className="flex-1">
          {/* <img
            src="/logo.png" // <-- Replace with your actual logo path or URL
            alt="SAYAN Logo"
            className="w-32"
          /> */}

<div className="flex items-center space-x-2 text-2xl font-extrabold tracking-wide cursor-pointer hover:text-orange-500 transition-colors duration-300">
              SAYAN
            </div>
        </div>

        {/* Contact Us */}
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-4">CONTACT US</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1" />
             Mirpur 1 
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope />
              Email: lifestylesayans@gmail.com

            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt />
              Phone: 0900000-00000
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-4">FOLLOW US</h3>
          <div className="flex items-center gap-3 mb-2">
            <a href="#" className="text-white bg-blue-600 p-2 rounded-full">
              <FaFacebookF />
            </a>
            <a href="#" className="text-white bg-orange-600 p-2 rounded-full">
              <FaInstagram />
            </a>
            <a href="#" className="text-white bg-red-600 p-2 rounded-full">
              <FaPinterestP />
            </a>
          </div>
          <p className="text-sm mt-2">Career with  SAYAN</p>
        </div>

        {/* Useful Links */}
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-4">USEFUL LINKS</h3>
          <ul className="space-y-2 text-sm">
            <Link href={"/about"}>
              <li className="pb-2 text-sm">About Us</li>
            </Link>
            <li>
              <a href="#">Wholesale</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Return Refund Policy</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
