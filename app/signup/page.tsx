"use client";

import Link from "next/link";
import { useState, useLayoutEffect } from "react";
import { Github } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : () => {};

  useIsomorphicLayoutEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleGitHubSignup = async () => {
    setLoading(true);
    setError("");
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      }
    });
    
    if (error) {
      setError("Failed to sign up with GitHub");
      setLoading(false);
    }
  };

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
      <div className="relative z-10 w-full max-w-[420px] mx-4">

        <div
          className="rounded-2xl p-8"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.55), rgba(3,3,3,0.35))",
            border: "1px solid rgba(20,166,74,0.12)",
            boxShadow: "0 10px 30px rgba(6,19,9,0.55)",
            backdropFilter: "blur(8px)",
          }}
        >

          {/* LOGO */}
          <div className="flex items-center justify-center mb-6">
            <img
              src="/full.svg"
              alt="DeployChef Logo"
              width={230}
              height={230}
              className="object-contain -mr-2"
            />
          </div>

          <h2 className="text-3xl font-bold text-[#E4E1DA] mb-3 text-center" style={{ fontFamily: "Space Grotesk" }}>
            Sign Up
          </h2>
          
          <p className="text-[#E4E1DA]/70 text-center mb-8 text-sm">
            Create your account with GitHub
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* GITHUB SIGNUP BUTTON */}
          <button 
            onClick={handleGitHubSignup}
            disabled={loading}
            className="w-full py-4 rounded-lg bg-white text-black font-semibold flex items-center justify-center gap-3 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Github className="w-6 h-6" />
            {loading ? "Connecting..." : "Continue with GitHub"}
          </button>

          {/* LOGIN LINK */}
          <div className="text-center pt-6">
            <span className="text-[#E4E1DA]/80">Already have an account?</span>
            <Link href="/login" className="text-[#14A64A] ml-1 font-semibold">
              Login
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
