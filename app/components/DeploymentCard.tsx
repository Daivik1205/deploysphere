// app/components/DeploymentCard.tsx
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
};

function statusColor(status: Status) {
  switch (status) {
    case 'ACTIVE':
      return 'ring-emerald-400/60';
    case 'INACTIVE':
      return 'ring-yellow-400/60';
    case 'DEACTIVATED':
      return 'ring-rose-400/60';
    default:
      return 'ring-gray-400/60';
  }
}

export default function DeploymentCard({ data, onToggle }: { data: Deployment; onToggle: (id: string) => void }) {
  return (
    <article className={`rounded-2xl p-4 bg-gradient-to-b from-[#05210c] to-[#083116] border border-[#164a25] ${statusColor(data.status)} ring-2 ring-opacity-30 shadow-[0_8px_24px_rgba(3,60,23,0.6)]`}>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="w-full sm:w-40 h-36 sm:h-24 rounded-md overflow-hidden bg-white/5 flex items-center justify-center">
          <div className="text-xs sm:text-xs text-[#E4DCC9] text-center px-2">Preview</div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xl sm:text-2xl font-bold truncate" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{data.name}</h3>
          <p className="text-sm text-[#cfe7cc] font-medium">Repo: <span className="font-normal">{data.repo}</span></p>
          <p className="mt-2 text-sm leading-snug text-[#C9E6C9] line-clamp-3">{data.desc}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[#124224] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${data.status === 'ACTIVE' ? 'text-emerald-400' : data.status === 'INACTIVE' ? 'text-yellow-300' : 'text-rose-300'}`}>
            <span className={`w-3 h-3 rounded-full inline-block ${data.status === 'ACTIVE' ? 'bg-emerald-400' : data.status === 'INACTIVE' ? 'bg-yellow-300' : 'bg-rose-400'}`} />
            {data.status}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-[#CFE6C8]">{data.updated}</span>
          <button onClick={() => onToggle(data.id)} className="px-3 py-1 rounded-md bg-white/6 hover:bg-white/8 text-sm">Toggle</button>
        </div>
      </div>
    </article>
  );
}
