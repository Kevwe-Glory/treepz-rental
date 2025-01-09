'use client';

import { useState } from "react";
import Image from 'next/image';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PhoneIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing!");
      setEmail("");
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <ToastContainer />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section: Contact Information and Social Icons */}
        <div className="w-full max-w-lg">  
          <h4 className="text-lg md:text-xl font-semibold mb-4">Kenya Treepz Rental</h4>
          <div className="flex items-center space-x-2 mt-2">
            {/* Clickable Phone Number */}
            <PhoneIcon className="w-5 h-5 text-gray-400" />
            <a href="tel:+1234567890" className="text-sm text-[#F8B02B] hover:underline" aria-label="Call Treepz at +1 234 567 890">
              +1 234 567 890
            </a>
          </div>

          {/* Email Link */}
          <div className="mt-3">
            <a href="mailto:contact@treepz.com" className="text-sm text-[#F8B02B] hover:underline">
              contact@treepz.com
            </a>
          </div>

          <div className="flex space-x-4 mt-3">
            {/* Social Icons from Public Folder with matching color */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Treepz on Facebook">
              <Image
                src="/facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
                className="transition duration-300"
                style={{ filter: 'invert(32%) sepia(100%) saturate(315%) hue-rotate(16deg) brightness(95%) contrast(92%)' }} 
                priority
              />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="/twitter.svg"
                alt="Twitter"
                width={24}
                height={24}
                className="transition duration-300"
                style={{ filter: 'invert(32%) sepia(100%) saturate(315%) hue-rotate(16deg) brightness(95%) contrast(92%)' }}
                priority
              />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="/linkedin.svg"
                alt="LinkedIn"
                width={24}
                height={24}
                className="transition duration-300"
                style={{ filter: 'invert(32%) sepia(100%) saturate(315%) hue-rotate(16deg) brightness(95%) contrast(92%)' }} 
                priority
              />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="/instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
                className="transition duration-300"
                style={{ filter: 'invert(32%) sepia(100%) saturate(315%) hue-rotate(16deg) brightness(95%) contrast(92%)' }} 
                priority
              />
            </a>
          </div>
        </div>

        {/* Right Section: Subscribe Section */}
        <div className="w-full max-w-md">
          <h4 className="text-lg font-semibold mb-2">Subscribe for Updates</h4>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`w-full p-3 rounded-md border text-black ${email ? 'border-gray-300' : 'border-red-500'} focus:border-[#F8B02B] focus:ring-black mb-3 sm:mb-0 sm:mr-2`}
            />
            <button
              type="submit"
              className="bg-[#F8B02B] text-black py-2 px-6 rounded-md hover:bg-[#ddb36a] focus:outline-none focus:ring-2 focus-ring-[#F8B02B] transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-sm md:text-base text-gray-500 mt-6">
        © {new Date().getFullYear()} Treepz. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
