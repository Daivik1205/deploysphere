'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        setUsername(
          user.user_metadata?.user_name ||
          user.user_metadata?.preferred_username ||
          user.email?.split('@')[0]
        );
        setAvatarUrl(user.user_metadata?.avatar_url || null);
      } else {
        setUser(null);
        setUsername(null);
        setAvatarUrl(null);
      }

      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        checkUser();
      } else {
        setUser(null);
        setUsername(null);
        setAvatarUrl(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUsername(null);
    setAvatarUrl(null);
    window.location.href = '/';
  };

  return (
    <nav className="flex items-center justify-between px-5 sm:px-9 lg:px-18 h-20 border-b border-[#14A64A]/20 bg-gradient-to-b from-black/95 to-black/80 backdrop-blur-md sticky top-0 z-50 shadow-lg shadow-[#14A64A]/5 overflow-hidden">
      
      {/* LOGO - bounded but same visual size */}
      <Link href="/" className="flex items-center w-40 h-full group">
        <div className="flex items-center h-full">
          <Image 
            src="/full.svg"
            alt="CloudChef Logo"
            width={160}
            height={160}
            className=" w-[200px] h-[200px] object-contain ml-2 transition-transform group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Center Nav */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8">
        <button className="text-[#E4DCC9] hover:text-[#14A64A] transition-all flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-[#14A64A]/10">
          About Us
          <span className="text-xs">▼</span>
        </button>
        <button className="text-[#E4DCC9] hover:text-[#14A64A] transition-all flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-[#14A64A]/10">
          Features
          <span className="text-xs">▼</span>
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {loading ? (
          <div className="w-20 h-8 bg-[#14A64A]/20 rounded-lg animate-pulse" />
        ) : user ? (
          <>
            <div className="flex items-center gap-2">
              {avatarUrl && (
                <Image
                  src={avatarUrl}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full border-2 border-[#14A64A]/30 object-cover"
                />
              )}
              <span className="text-[#E4DCC9] font-semibold hidden sm:inline">
                {username || user.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-[#14A64A] text-[#14A64A] font-semibold hover:bg-[#14A64A] hover:text-black transition-all shadow-md shadow-[#14A64A]/20"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <button className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-[#14A64A] text-[#14A64A] font-semibold hover:bg-[#14A64A] hover:text-black transition-all shadow-md shadow-[#14A64A]/20">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#14A64A] text-black font-semibold hover:bg-[#16b854] hover:shadow-lg hover:shadow-[#14A64A]/40 transition-all shadow-md shadow-[#14A64A]/30">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
