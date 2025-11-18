"use client";
import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import DeploymentCard, { Deployment } from '../components/DeploymentCard';

const initialDeployments: Deployment[] = [
  { id: '1', name: 'Market Price', repo: 'market-price', desc: 'Marketing website deployment for QuikCart Application', status: 'ACTIVE', updated: '2 hr Ago' },
  { id: '2', name: 'Banking App', repo: 'banking-app', desc: 'Banking website deployment for QuikCart Application', status: 'DEACTIVATED', updated: '2 hr Ago' },
  { id: '3', name: 'Landing Page', repo: 'landing-page', desc: 'Landing page for upcoming product launch', status: 'INACTIVE', updated: '30 min Ago' },
  { id: '4', name: 'Admin Panel', repo: 'admin-panel', desc: 'Internal admin panel for operations', status: 'ACTIVE', updated: '4 hr Ago' },
  { id: '5', name: 'Docs Site', repo: 'docs-site', desc: 'Documentation site for SDK and CLI', status: 'ACTIVE', updated: '1 day Ago' },
];

export default function DeploymentsPage() {
  const [deployments, setDeployments] = useState<Deployment[]>(initialDeployments);

  function toggleStatus(id: string) {
    setDeployments((d) =>
      d.map((x) =>
        x.id === id
          ? {
              ...x,
              status: x.status === 'ACTIVE' ? 'DEACTIVATED' : x.status === 'DEACTIVATED' ? 'INACTIVE' : 'ACTIVE',
            }
          : x
      )
    );
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Space+Grotesk:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen bg-black text-[#E4DCC9]" style={{ fontFamily: 'Inter, sans-serif' }}>
        <Navbar />

        <main className="max-w-[1500px] mx-auto px-8 py-12">
          <header className="mb-8">
            <h1
              className="text-6xl font-extrabold text-[#14A64A] mb-2"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Welcome back Vikky!
            </h1>
            <p className="text-xl text-[#DDE6D8]">Here are your recent deployments</p>
          </header>

          <section className="grid grid-cols-3 gap-8">
            {deployments.map((d) => (
              <DeploymentCard key={d.id} data={d} onToggle={toggleStatus} />
            ))}

            {/* Add Deployment Card */}
            <div className="col-span-1 row-span-1 rounded-2xl p-6 flex flex-col items-center justify-center bg-gradient-to-b from-[#04210b] to-[#063116] border border-[#164a25] shadow-[0_8px_24px_rgba(3,60,23,0.45)]">
              <h3 className="text-3xl font-extrabold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                ADD DEPLOYMENTS
              </h3>
              <button
                className="relative w-15 h-15 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-emerald-500/30 shadow-[inset_0_0_15px_rgba(0,0,0,0.6),0_0_18px_rgba(16,185,129,0.25)] hover:shadow-[inset_0_0_18px_rgba(0,0,0,0.6),0_0_30px_rgba(16,185,129,0.45)] transition-all duration-300 group overflow-hidden"
              >
                <span className="absolute inset-0 rounded-full border border-emerald-400/60 group-hover:border-emerald-300 transition-all duration-300"></span>

                <span className="absolute inset-[5px] rounded-full bg-gradient-to-br from-emerald-900/30 to-emerald-700/10"></span>

                <span className="relative text-5xl font-extrabold text-emerald-300 group-hover:text-emerald-200 drop-shadow-[0_3px_8px_rgba(0,0,0,0.7)] transition-all duration-300 select-none -translate-y-1">
                  +
                </span>
              </button>
            </div>
          </section>

          <p className="mt-8 text-sm text-[#98BFA0]">
            Tip: Click <span className="font-semibold">Toggle</span> on any card to cycle its status and test the UI.
          </p>
        </main>

        <style jsx global>{`
          body {
            font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          }
          h1, h2, h3 {
            font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
          }
        `}</style>
      </div>
    </>
  );
}
