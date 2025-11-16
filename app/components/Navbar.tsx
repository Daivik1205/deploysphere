import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-20 py-3 border-b border-gray-800">
      <Link href="/" className="flex items-center gap-1 cursor-pointer">
        {/* Logo */}
        <Image 
          src="/logo.svg" 
          alt="DeploySphere Logo" 
          width={48} 
          height={48}
          className="w-12 h-12"
        />
        <span className="text-3xl font-bold text-[#14A64A]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          DeploySphere
        </span>
      </Link>

      <div className="flex items-center gap-8">
        <button className="text-[#E4DCC9] hover:text-[#14A64A] transition-colors flex items-center gap-1">
          About Us
          <span className="text-xs">▼</span>
        </button>
        <button className="text-[#E4DCC9] hover:text-[#14A64A] transition-colors flex items-center gap-1">
          Features
          <span className="text-xs">▼</span>
        </button>
        <button className="text-[#E4DCC9] hover:text-[#14A64A] transition-colors flex items-center gap-1">
          Resources
          <span className="text-xs">▼</span>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/login">
          <button className="px-6 py-2 rounded-lg bg-[#14A64A] text-black font-semibold hover:bg-[#0f8a3d] transition-colors">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="px-6 py-2 rounded-lg bg-[#14A64A] text-black font-semibold hover:bg-[#0f8a3d] transition-colors">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
}