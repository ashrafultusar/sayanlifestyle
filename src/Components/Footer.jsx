"use client";
import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaMailBulk,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 py-12 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-800 pb-10">
        {/* Logo Section */}
        <div>
          <h2 className="text-3xl font-extrabold text-white mb-4 tracking-wide hover:text-orange-500 transition-colors duration-300">
            SAYAN
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            SAYAN is your trusted online destination for quality products,
            excellent service, and customer satisfaction. We strive to bring
            you the best experience every day.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-lg border-l-4 border-orange-500 pl-3">
            CONTACT US
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1 text-orange-500" />
              <span>
                As Salam Bohumukhi Somobay Somity Building, 4th Floor, Plot
                No-79, Block-A, Zoo Road, Mirpur-2, Dhaka 1216
              </span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-orange-500" />
              <a
                href="sayansofficial08@gmail.com"
                className="hover:text-orange-400 transition"
              >
                sayansofficial08@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-orange-500" />
              <a
                href="https://wa.me/01903550555"
                target="_blank"
                className="hover:text-orange-400 transition"
              >
                01903550555
              </a>
            </li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-lg border-l-4 border-orange-500 pl-3">
            FOLLOW US
          </h3>
          <div className="flex items-center gap-4">
            <Link target="_blank" href="https://www.facebook.com/people/Sayan-Lifestyle/61581716045681/?mibextid=ZbWKwL"
           
              className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-transform transform hover:scale-110"
            >
              <FaFacebookF className="text-white text-lg" />
            </Link>
            <a
              href="https://wa.me/8809639184415"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 p-3 rounded-full transition-transform transform hover:scale-110"
            >
              <FaWhatsapp className="text-white text-lg" />
            </a>
            <a
              href="#"
              className="bg-red-600 hover:bg-red-700 p-3 rounded-full transition-transform transform hover:scale-110"
            >
              <FaMailBulk className="text-white text-lg" />
            </a>
          </div>
          <p className="text-sm mt-4 text-gray-400">
        
              Career with SAYAN
           
          </p>
        </div>

        {/* Useful Links Section */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-lg border-l-4 border-orange-500 pl-3">
            USEFUL LINKS
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/about"
                className="hover:text-orange-400 transition"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-orange-400 transition">
                Wholesale
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-orange-400 transition">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-orange-400 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-orange-400 transition">
                Return & Refund Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center text-gray-500 text-sm pt-6">
        © {new Date().getFullYear()} SAYAN. All Rights Reserved. |
        <a href="https://ashraful-tusar.vercel.app" className="text-orange-400"> Designed by Tusar</a>
      </div>
    </footer>
  );
};

export default Footer;
