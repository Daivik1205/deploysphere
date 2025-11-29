'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'; // Adjust path if needed
import DeploymentCard, { Deployment } from '../components/DeploymentCard'; // Adjust path if needed
import { supabase } from '@/lib/supabase';

const initialDeployments: Deployment[] = [
  { 
    id: '1', 
    name: 'Banking App', 
    repo: 'market-price', 
    desc: 'Banking website deployment for QuikCart Application', 
    status: 'ACTIVE', 
    updated: '2hr Ago',
    commit: '#5da9af2',
    fix: 'Logo Updates'
  },
  { 
    id: '2', 
    name: 'Marketplace', 
    repo: 'market-price', 
    desc: 'Full stack marketplace solution with payment integration.', 
    status: 'INACTIVE', 
    updated: '5hr Ago',
    commit: '#8ab1cd3',
    fix: 'Stripe API fix'
  },
  { 
    id: '3', 
    name: 'Admin Dashboard', 
    repo: 'admin-panel', 
    desc: 'Internal dashboard for monitoring user activity.', 
    status: 'INACTIVE', 
    updated: '1 day Ago',
    commit: '#2fe41a1',
    fix: 'Chart.js update'
  },
];

export default function DeploymentsPage() {
  const [deployments, setDeployments] = useState<Deployment[]>(initialDeployments);
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Handle redirect or show login state
        // window.location.href = '/login'; 
      } else {
        // Try to get metadata name or fallback to part of email
        const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
        setUserName(name);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-[#14A64A]/30 font-['Inter']">
      {/* Global Gradient Background */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#14A64A]/20 via-black to-black" />

      <div className="relative z-10">
        <Navbar />

        <main className="mx-auto max-w-7xl px-6 py-12">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white font-['Space_Grotesk']">
              Welcome back, <span className="text-[#14A64A]">{userName}</span>
            </h1>
            <p className="mt-3 text-lg text-zinc-400 font-['Inter']">
              Here is an overview of your recent deployments.
            </p>
          </header>

          <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {deployments.map((d) => (
              <DeploymentCard key={d.id} data={d} />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}