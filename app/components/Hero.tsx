import React from 'react';
import DeploymentDiagram from './DeploymentDiagram';

export default function Hero() {
  return (
    <div className="max-w-8xl mx-auto px-20 py-25">
      <div className="grid grid-cols-[1.3fr_1fr] gap-[200px] items-center">

        {/* Left Content */}
        <div>
          <h1 
            className="text-7xl font-bold text-[#14A64A] mb-2 leading-tight whitespace-nowrap"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Build. Deploy. Scale.
          </h1>
          
          <p className="text-2xl text-[#E4DCC9] mb-10 leading-relaxed translate-x-2 translate-y-1">
            DeploySphere automates builds, deployments, and scaling from any Git repo — with zero setup. Instant deploys, previews, and CI/CD on AWS.
          </p>

          {/*  ---------- Modified CTA section ---------- */}
          <div className="flex items-center justify-between gap-6 bg-black/10 p-4 rounded-lg w-[75%]">

            {/* Left text with vertical bar */}
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-1 h-10 bg-[#14A64A] rounded"></div>

              <p className="text-[#14A64A] font-medium text-lg leading-tight whitespace-normal max-w-[350px]">
                Start deploying instantly with DeploySphere
              </p>
            </div>

            {/* Right Button */}
            <button className="px-8 py-3 rounded-lg bg-[#14A64A] text-black font-semibold hover:bg-[#0f8a3d] transition-colors text-lg whitespace-nowrap">
              Get Started
            </button>
          </div>
          {/* ------------------------------------------- */}
        </div>

        {/* Right Diagram */}
        <DeploymentDiagram />
      </div>
    </div>
  );
}
