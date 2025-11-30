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
    <nav className="sticky top-0 z-50 h-20 w-full border-b border-white/5 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* LOGO - INCREASED SIZE */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Image 
            src="/full.svg"
            alt="CloudChef Logo"
            width={200}
            height={60}
            priority
            className="h-12 w-auto object-contain sm:h-14 md:h-16" 
          />
        </Link>

        {/* Center Nav - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-sm font-medium text-zinc-400 transition-colors hover:text-[#14A64A]">
            About Us
          </Link>
          <Link href="#" className="text-sm font-medium text-zinc-400 transition-colors hover:text-[#14A64A]">
            Features
          </Link>
        </div>

        {/* Right Side (Auth) */}
        <div className="flex items-center gap-4">
          {loading ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-zinc-800" />
          ) : user ? (
            <>
              <div className="hidden items-center gap-3 sm:flex">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full border border-zinc-700 object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-[#14A64A]/20 flex items-center justify-center text-xs font-bold text-[#14A64A]">
                    {username?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium text-zinc-200">
                  {username || 'User'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-lg border border-zinc-700 bg-black/50 px-4 py-2 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-600 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="rounded-lg bg-[#14A64A] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#14A64A]/20 transition-all hover:bg-[#14A64A]/90 hover:shadow-[#14A64A]/30 active:scale-95">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}