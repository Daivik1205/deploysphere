"use client";

import Link from "next/link";
import { useState, useLayoutEffect } from "react";
import { Eye, EyeOff, Facebook, Github } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : () => {};

  // Scroll lock without hydration error
  useIsomorphicLayoutEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden relative flex items-center justify-center bg-black">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 100%, rgba(20,166,74,0.05), transparent 60%), linear-gradient(180deg, #000, #071c0f 60%, #0b3520 100%)",
        }}
      />

      {/* SPHERES */}
      <div
        className="absolute -left-20 -top-20 w-[420px] h-[420px] rounded-full"
        style={{
          filter: "blur(36px)",
          background:
            "radial-gradient(circle, rgba(32,200,96,0.9), rgba(12,90,45,0.9) 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute -right-20 -bottom-20 w-[520px] h-[520px] rounded-full"
        style={{
          filter: "blur(36px)",
          background:
            "radial-gradient(circle, rgba(32,200,96,0.9), rgba(12,90,45,0.9) 40%, transparent 70%)",
        }}
      />

      {/* CARD */}
      <div className="relative z-10 w-full max-w-[420px] mx-4 scale-[0.82] origin-top translate-y-16">

        <div
          className="rounded-2xl p-7"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.55), rgba(3,3,3,0.35))",
            border: "1px solid rgba(20,166,74,0.12)",
            boxShadow: "0 10px 30px rgba(6,19,9,0.55)",
            backdropFilter: "blur(8px)",
          }}
        >

          {/* LOGO */}
          <div className="flex items-center justify-center mb-4">
            <img
              src="/full.svg"
              alt="DeploySphere"
              width={260}
              height={80}
              className="object-contain"
            />
          </div>

          <h2 className="text-3xl font-bold text-[#E4E1DA] mb-5" style={{ fontFamily: "Space Grotesk" }}>
            Login
          </h2>

          <div className="space-y-4">

            {/* USERNAME */}
            <input
              type="text"
              placeholder="Username / Email ID"
              className="w-full px-4 py-3 bg-black/30 border border-[#E4E1DA]/10 text-[#E4E1DA] rounded-lg"
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 bg-black/30 border border-[#E4E1DA]/10 text-[#E4E1DA] rounded-lg"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#E4E1DA] hover:text-[#14A64A] transition-colors"
              >
                {showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* REMEMBER ME */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="w-4 h-4 accent-[#14A64A]"
              />
              <p className="text-[#E4E1DA]/80 text-sm">Remember me</p>
            </div>

            {/* LOGIN BUTTON */}
            <button
              className="w-full py-3 rounded-lg text-black font-semibold"
              style={{
                background: "linear-gradient(180deg, #14A64A, #12954A)",
              }}
            >
              Login
            </button>

            {/* FORGOT PASSWORD */}
            <div className="text-center pt-1">
              <Link href="/forgot" className="text-[#E4E1DA]/70 hover:text-[#14A64A] text-sm">
                Forgot password?
              </Link>
            </div>

            {/* OR */}
            <div className="flex items-center gap-3 py-2">
              <div className="flex-1 h-px bg-[#E4E1DA]/10" />
              <span className="text-[#E4E1DA]/50 text-sm">Or</span>
              <div className="flex-1 h-px bg-[#E4E1DA]/10" />
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex justify-center gap-4">

              {/* GOOGLE */}
              <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                <FcGoogle className="w-7 h-7" />
              </button>

              {/* FACEBOOK */}
              <button className="w-12 h-12 bg-[#1877F2] rounded-full flex items-center justify-center shadow-md">
                <Facebook className="w-6 h-6 text-white" />
              </button>

              {/* GITHUB */}
              <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                <Github className="w-6 h-6 text-black" />
              </button>
            </div>

            {/* SIGNUP LINK */}
            <div className="text-center pt-5">
              <span className="text-[#E4E1DA]/80">Don’t have an account?</span>
              <Link href="/signup" className="text-[#14A64A] ml-1 font-semibold">
                Signup
              </Link>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
