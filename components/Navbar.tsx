import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-black text-white shadow-md z-50">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <Link href="/" passHref>
          <Image
            src="/logo.svg" 
            alt="Treepz Logo"
            width={100}
            height={100}
            className="object-contain cursor-pointer"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center space-x-6">
        <Link href="/my-booking" className="hover:text-gray-300">
          My Booking
        </Link>
        <Link href="/contact-us" className="hover:text-gray-300">
          Contact Us
        </Link>
        <Link href="/about-us" className="hover:text-gray-300">
          About Us
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
