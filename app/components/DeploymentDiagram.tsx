import React from 'react';
import Image from 'next/image';

export default function DeploymentDiagram() {
  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[455px] aspect-square mx-auto overflow-visible">
      {/* Arrows SVG - Background */}
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
        <Image 
          src="/arrows.svg" 
          alt="Flow arrows" 
          width={500} 
          height={500}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      {/* Repository Icon - Top Center */}
      <div className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2">
        <Image 
          src="/repository.svg" 
          alt="Repository" 
          width={120} 
          height={120}
          className="w-[60px] sm:w-[75px] md:w-[88px] lg:w-[106px] h-[50px] sm:h-[68px] md:h-[78px] lg:h-[96px]"
          priority
        />
        <span 
          className="text-[#14A64A] text-sm sm:text-base md:text-lg lg:text-2xl font-bold whitespace-nowrap"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Repository
        </span>
      </div>

      {/* Build Icon - Bottom Right */}
      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 flex flex-col items-center gap-0.5 sm:gap-1">
        <Image 
          src="/build.svg" 
          alt="Build" 
          width={120} 
          height={120}
          className="w-[70px] sm:w-[85px] md:w-[98px] lg:w-[116px] h-[50px] sm:h-[68px] md:h-[78px] lg:h-[96px]"
          priority
        />
        <span 
          className="text-[#14A64A] text-sm sm:text-base md:text-lg lg:text-2xl font-bold whitespace-nowrap"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Build
        </span>
      </div>

      {/* Deploy Icon - Bottom Left */}
      <div className="absolute bottom-2.5 sm:bottom-4 left-0 sm:left-2 flex flex-col items-center gap-0.5 sm:gap-1">
        <Image 
          src="/deploy.svg" 
          alt="Deploy" 
          width={120} 
          height={120}
          className="w-[60px] sm:w-[75px] md:w-[90px] lg:w-[105px] h-[50px] sm:h-[68px] md:h-[78px] lg:h-[96px]"
          priority
        />
        <span 
          className="text-[#14A64A] text-sm sm:text-base md:text-lg lg:text-2xl font-bold whitespace-nowrap"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Deploy
        </span>
      </div>
    </div>
  );
}