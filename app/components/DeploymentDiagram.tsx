import React from 'react';
import Image from 'next/image';

export default function DeploymentDiagram() {
  return (
    <div className="relative w-[455px] h-[400px]">
      {/* Arrows SVG - Background */}
      <div className="absolute inset-10 flex items-center justify-center translate-x-1">
        <Image 
          src="/arrows.svg" 
          alt="Flow arrows" 
          width={500} 
          height={500}
          className="w-[380px] h-[370px]"
        />
      </div>

      {/* Repository Icon - Top Center */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <Image 
          src="/repository.svg" 
          alt="Repository" 
          width={120} 
          height={120}
          className="w-[110px] h-[110px]"
        />
        <span 
          className="text-[#14A64A] text-2xl font-bold"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Repository
        </span>
      </div>

      {/* Build Icon - Bottom Right */}
      <div className="absolute bottom-0 right-0 flex flex-col items-center gap-1 -translate-x-3">
        <Image 
          src="/build.svg" 
          alt="Build" 
          width={120} 
          height={120}
          className="w-[110px] h-[110px]"
        />
        <span 
          className="text-[#14A64A] text-2xl font-bold"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Build
        </span>
      </div>

      {/* Deploy Icon - Bottom Left */}
      <div className="absolute bottom-0 left-0 flex flex-col items-center -translate-x-3">
        <Image 
          src="/deploy.svg" 
          alt="Deploy" 
          width={120} 
          height={120}
          className="w-[132px] h-[132px]"
        />
        <span 
          className="text-[#14A64A] text-2xl font-bold"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Deploy
        </span>
      </div>
    </div>
  );
}