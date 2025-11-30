'use client';

import React from 'react';
import DeploymentDiagram from './DeploymentDiagram';

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-80px)] w-full items-center justify-center overflow-hidden px-6 py-12 lg:px-8">
      
      {/* Content Container */}
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center justify-between gap-12 lg:flex-row lg:gap-20">

        {/* LEFT: Text Content */}
        <div className="flex flex-1 flex-col items-start lg:max-w-xl">

          <h1 className="mt-6 font-['Space_Grotesk'] text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]">
            Build. Deploy. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14A64A] to-emerald-200">
              Scale.
            </span>
          </h1>

          <p className="mt-6 text-lg text-zinc-400 leading-relaxed max-w-lg font-['Inter']">
            DeployChef automates builds, deployments, and scaling from any Git repo with zero setup. Instant previews and CI/CD on AWS.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="w-full sm:w-auto rounded-xl bg-[#14A64A] px-8 py-3.5 text-base font-bold text-white shadow-[0_0_20px_rgba(20,166,74,0.3)] transition-all hover:bg-[#14A64A]/90 hover:shadow-[0_0_30px_rgba(20,166,74,0.5)] active:scale-95"
            >
              Go to Dashboard
            </button>
            <button className="w-full sm:w-auto rounded-xl border border-zinc-700 bg-zinc-900/50 px-8 py-3.5 text-base font-semibold text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white">
              View Documentation
            </button>
          </div>
          
          <p className="mt-6 text-sm text-zinc-500 font-['Inter']">
            No credit card required for hobby projects.
          </p>
        </div>

        {/* RIGHT: Diagram */}
        <div className="relative flex w-full flex-1 items-center justify-center lg:justify-end">
          {/* Ambient Glow behind diagram */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[100px] bg-[#14A64A]" />
          
          <div className="relative z-10 w-full max-w-[500px]">
            <DeploymentDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}