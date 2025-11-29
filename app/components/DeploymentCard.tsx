'use client';

import React from 'react';

type Status = 'ACTIVE' | 'INACTIVE' | 'DEACTIVATED';

export type Deployment = {
  id: string;
  name: string;
  repo: string;
  desc: string;
  status: Status;
  updated: string;
  commit: string;
  fix: string;
  preview?: string;
};

export default function DeploymentCard({ data }: { data: Deployment }) {
  const getStatusStyle = (status: Status) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-[#14A64A]/10 text-[#14A64A] border-[#14A64A]/20';
      case 'INACTIVE':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'DEACTIVATED':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    }
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 transition-all hover:border-[#14A64A]/30 hover:bg-zinc-900/60 hover:shadow-xl hover:shadow-[#14A64A]/5">
      
      {/* Card Header & Preview */}
      <div className="flex flex-col gap-6 p-6 sm:flex-row">
        {/* Preview Placeholder */}
        <div className="shrink-0">
          <div className="flex h-32 w-full items-center justify-center rounded-xl border border-zinc-800 bg-black/40 sm:w-48 transition-colors group-hover:border-[#14A64A]/20">
            <svg className="h-8 w-8 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-bold text-white font-['Space_Grotesk'] group-hover:text-[#14A64A] transition-colors">
                {data.name}
              </h2>
              <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider font-['Inter'] ${getStatusStyle(data.status)}`}>
                {data.status}
              </span>
            </div>
            
            <p className="mt-1 text-xs text-zinc-500 font-['Inter']">
              Repo: <span className="text-zinc-300">{data.repo}</span>
            </p>
            
            <p className="mt-3 text-sm text-zinc-400 font-['Inter'] line-clamp-2">
              {data.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Info / Actions */}
      <div className="mt-auto border-t border-zinc-800/50 bg-black/20 px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
             <div className="flex items-center gap-2 text-xs text-zinc-500 font-['Inter']">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {data.updated}
             </div>
             <div className="flex items-center gap-2 text-xs text-zinc-500 font-['Inter']">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
                Commit: <span className="font-mono text-zinc-400">{data.commit}</span>
             </div>
          </div>

          <button className="rounded-lg bg-zinc-800 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[#14A64A] hover:shadow-lg hover:shadow-[#14A64A]/20 font-['Inter']">
            View Logs
          </button>
        </div>
      </div>
    </article>
  );
}