'use client';
import React, { useRef } from 'react';

export default function ImportPanel({
  onImport,
  compact,
  onCompactImport,
}: {
  onImport: () => void;
  compact?: boolean;
  onCompactImport?: (val: string) => void;
}) {
  const compactRef = useRef<HTMLInputElement | null>(null);

  const handleCompactSubmit = () => {
    const v = compactRef.current?.value?.trim() ?? '';
    if (v && onCompactImport) onCompactImport(v);
  };

  if (compact) {
    return (
      <div className="group relative flex items-center gap-3 rounded-xl border border-[#14A64A]/10 bg-[#14A64A]/5 p-2 transition-all hover:border-[#14A64A]/20 hover:shadow-lg hover:shadow-[#14A64A]/10">
        <div className="flex-1 pl-2">
          <input
            ref={compactRef}
            placeholder="owner/repo or https://github.com/owner/repo"
            className="w-full bg-transparent text-sm font-medium font-['Inter'] text-zinc-200 placeholder-[#14A64A]/40 outline-none"
            onKeyDown={(e) => e.key === 'Enter' && handleCompactSubmit()}
          />
        </div>

        <button
          onClick={handleCompactSubmit}
          className="rounded-lg bg-[#14A64A] px-4 py-2 text-sm font-semibold font-['Inter'] text-white shadow-lg shadow-[#14A64A]/20 transition-all hover:bg-[#14A64A]/90 hover:shadow-[#14A64A]/30 active:scale-95"
        >
          Import
        </button>
      </div>
    );
  }

  return (
    <aside className="rounded-xl border border-[#14A64A]/10 bg-zinc-900/40 p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-white">
            Import Project
          </h3>
          <p className="mt-1 text-sm font-['Inter'] text-[#14A64A]/60">
            Connect your GitHub repository for continuous deployment.
          </p>
        </div>

        <button
          onClick={onImport}
          className="rounded-lg bg-[#14A64A] px-5 py-2.5 text-sm font-semibold font-['Inter'] text-white shadow-lg shadow-[#14A64A]/20 transition-all hover:bg-[#14A64A]/90 hover:shadow-[#14A64A]/30 active:scale-95"
        >
          Import from GitHub
        </button>
      </div>
    </aside>
  );
}