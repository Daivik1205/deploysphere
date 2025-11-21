import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-5 sm:px-9 lg:px-18 py-0 border-b border-[#14A64A]/20 bg-gradient-to-b from-black/95 to-black/80 backdrop-blur-md sticky top-0 z-50 shadow-lg shadow-[#14A64A]/5">
      <Link href="/" className="flex items-center cursor-pointer group">
        {/* Logo */}
        <Image 
          src="/logo.png" 
          alt="DeploySphere Logo" 
          width={80} 
          height={80}
          className="w-20 h-20 sm:w-20 sm:h-20 object-contain -mr-2 transition-transform group-hover:scale-105"
        />
        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#14A64A] transition-all group-hover:text-[#16b854]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          DeployChef
        </span>
      </Link>

      {/* center nav: hide on small screens */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8">
        <button className="text-[#E4DCC9] hover:text-[#14A64A] transition-all flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-[#14A64A]/10">
          About Us
          <span className="text-xs transition-transform hover:translate-y-0.5">▼</span>
        </button>
        <button className="text-[#E4DCC9] hover:text-[#14A64A] transition-all flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-[#14A64A]/10">
          Features
          <span className="text-xs transition-transform hover:translate-y-0.5">▼</span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/login">
          <button className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-transparent border border-[#14A64A] text-[#14A64A] font-semibold hover:bg-[#14A64A] hover:text-black transition-all text-sm sm:text-base shadow-md shadow-[#14A64A]/20">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#14A64A] text-black font-semibold hover:bg-[#16b854] hover:shadow-lg hover:shadow-[#14A64A]/40 transition-all text-sm sm:text-base shadow-md shadow-[#14A64A]/30">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
}