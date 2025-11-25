'use client';

import React from 'react';
import DeploymentDiagram from './DeploymentDiagram';

export default function Hero() {
  return (
    <section className="w-full px-6 sm:px-10 lg:px-20 overflow-hidden relative flex items-center" style={{ height: 'calc(100vh - 73px)' }}>
      {/* Light green glow from top */}
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-[#14A64A]/10 via-[#14A64A]/5 to-transparent pointer-events-none" />
      
      {/* Light green glow from bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-[#14A64A]/20 via-[#14A64A]/10 to-transparent pointer-events-none" />
      
      {/* Container: stacks on small screens, row layout on md+ */}
      <div className="mx-auto w-full max-w-[1500px] flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-20 relative z-10">

        {/* LEFT: flexible, allow wrapping on small screens */}
        <div className="w-full md:flex-1 md:max-w-[600px] min-w-0">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#14A64A] mb-2 leading-tight break-words"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Build. Deploy. Scale.
          </h1>

          <p className="text-base sm:text-lg md:text-2xl text-[#E4DCC9] mb-6 sm:mb-10 leading-relaxed">
            DeployChef automates builds, deployments, and scaling from any Git repo — with zero setup.
            Instant deploys, previews, and CI/CD on AWS.
          </p>

          {/* CTA block: stacks on very small screens */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-black/10 p-4 rounded-lg w-full sm:w-auto">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-1 h-10 bg-[#14A64A] rounded" />
              <p className="text-[#14A64A] font-medium text-base sm:text-lg leading-tight whitespace-normal max-w-[350px]">
                Start deploying instantly with DeployChef
              </p>
            </div>

            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="mt-3 sm:mt-0 px-6 py-2 sm:px-8 sm:py-3 rounded-lg bg-[#14A64A] text-black font-semibold hover:bg-[#0f8a3d] transition-colors text-base sm:text-lg whitespace-nowrap"
            >
              Dashboard
            </button>
          </div>
        </div>

        {/* RIGHT: diagram - always visible, scales to fit container */}
        <div className="w-full md:w-auto md:flex-1 md:max-w-[455px] flex items-center justify-center overflow-hidden">
          <DeploymentDiagram />
        </div>
      </div>
    </section>
  );
}
