'use client';

import React from 'react';
import Image from 'next/image';

export default function DeploymentDiagram() {
  // 1. KEEPING 375 as requested
  const topX = 250, topY = 64;
  const rightX = 420, rightY = 375; // Kept at 375
  const leftX = 80, leftY = 375;    // Kept at 375

  // 2. UPDATING CSS TO MATCH SVG
  // 375 is exactly 75% of the 500px viewbox height (375/500 = 0.75)
  const topCss = { left: '50%', top: '16%' };
  const rightCss = { left: '84%', top: '80%' }; // Changed from 80% to 75%
  const leftCss = { left: '16%', top: '80%' };  // Changed from 80% to 75%

  // Styling constants
  const mainStroke = '#14A64A';
  const strokeWidth = 5;
  const coreStroke = '#BFFFD6';
  const coreWidth = 1.6;

  return (
    <div className="relative mx-auto w-full max-w-[450px] aspect-square select-none">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-8px); }
        }
        .diagram-svg { z-index: 10; position: absolute; inset: 0; pointer-events: none; }
        .node-float {
          animation: float 3.5s ease-in-out infinite;
          position: absolute;
          transform: translate(-50%, -50%);
          z-index: 30; 
        }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
        .node-overlay { opacity: 0.18; }
        .node-overlay:hover { opacity: 0.36; }
      `}} />

      <div className="absolute inset-0 rounded-full bg-[#14A64A]/5 blur-[80px]" />

      <svg
        className="diagram-svg"
        viewBox="0 0 500 500"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* CRITICAL FIX FOR "IDENTICAL LINES":
             Added filterUnits="userSpaceOnUse". 
             This prevents the horizontal line from clipping its glow because it lacks height.
          */}
          <filter id="neonGlowUniform" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          id="path1"
          d={`M ${topX} ${topY} L ${rightX} ${rightY}`}
          fill="none"
          stroke={mainStroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          filter="url(#neonGlowUniform)"
        />
        <path
          id="path2"
          d={`M ${rightX} ${rightY} L ${leftX} ${leftY}`}
          fill="none"
          stroke={mainStroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          filter="url(#neonGlowUniform)"
        />
        <path
          id="path3"
          d={`M ${leftX} ${leftY} L ${topX} ${topY}`}
          fill="none"
          stroke={mainStroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          filter="url(#neonGlowUniform)"
        />

        <path d={`M ${topX} ${topY} L ${rightX} ${rightY}`} fill="none" stroke={coreStroke} strokeWidth={coreWidth} strokeLinecap="round" opacity="0.95" />
        <path d={`M ${rightX} ${rightY} L ${leftX} ${leftY}`} fill="none" stroke={coreStroke} strokeWidth={coreWidth} strokeLinecap="round" opacity="0.95" />
        <path d={`M ${leftX} ${leftY} L ${topX} ${topY}`} fill="none" stroke={coreStroke} strokeWidth={coreWidth} strokeLinecap="round" opacity="0.95" />

        <circle r="6" fill={mainStroke} filter="url(#neonGlowUniform)">
          <animateMotion repeatCount="indefinite" dur="3s" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
            <mpath href="#path1" />
          </animateMotion>
        </circle>
        <circle r="6" fill={mainStroke} filter="url(#neonGlowUniform)">
          <animateMotion repeatCount="indefinite" dur="3s" begin="1s" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
            <mpath href="#path2" />
          </animateMotion>
        </circle>
        <circle r="6" fill={mainStroke} filter="url(#neonGlowUniform)">
          <animateMotion repeatCount="indefinite" dur="3s" begin="2s" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
            <mpath href="#path3" />
          </animateMotion>
        </circle>
      </svg>

      {/* Nodes updated to top: 75% */}
      <div className="node-float flex flex-col items-center gap-3" style={topCss}>
        <div className="relative group cursor-default">
          <div className="absolute inset-0 rounded-2xl bg-[#14A64A] blur-xl node-overlay transition-opacity duration-500 group-hover:opacity-75" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#14A64A]/50">
            <Image src="/repository.svg" alt="Repository" width={48} height={48} className="drop-shadow-[0_0_12px_rgba(20,166,74,0.45)]" />
          </div>
        </div>
        <div className="rounded-full border border-white/10 bg-black/80 px-3 py-1 backdrop-blur-md">
          <span className="text-xs font-bold tracking-widest text-white font-mono">REPOSITORY</span>
        </div>
      </div>

      <div className="node-float delay-1000 flex flex-col items-center gap-3" style={rightCss}>
        <div className="relative group cursor-default">
          <div className="absolute inset-0 rounded-2xl bg-[#14A64A] blur-xl node-overlay transition-opacity duration-500 group-hover:opacity-75" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-white/8 bg-black/92 backdrop-blur-xl shadow-2xl transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#14A64A]/40">
            <Image src="/build.svg" alt="Build" width={56} height={56} className="drop-shadow-[0_0_12px_rgba(20,166,74,0.45)]" />
          </div>
        </div>
        <div className="rounded-full border border-white/10 bg-black/80 px-3 py-1 backdrop-blur-md">
          <span className="text-xs font-bold tracking-widest text-white font-mono">BUILD</span>
        </div>
      </div>

      <div className="node-float delay-2000 flex flex-col items-center gap-3" style={leftCss}>
        <div className="relative group cursor-default">
          <div className="absolute inset-0 rounded-2xl bg-[#14A64A] blur-xl node-overlay transition-opacity duration-500 group-hover:opacity-75" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-white/8 bg-black/92 backdrop-blur-xl shadow-2xl transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#14A64A]/40">
            <Image src="/deploy.svg" alt="Deploy" width={56} height={56} className="drop-shadow-[0_0_12px_rgba(20,166,74,0.45)]" />
          </div>
        </div>
        <div className="rounded-full border border-white/10 bg-black/80 px-3 py-1 backdrop-blur-md">
          <span className="text-xs font-bold tracking-widest text-white font-mono">DEPLOY</span>
        </div>
      </div>
    </div>
  );
}