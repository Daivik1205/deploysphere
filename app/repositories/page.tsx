'use client';

import React, { useMemo, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import ImportPanel from '@/app/components/ImportPanel';
import { supabase } from '@/lib/supabase';

// --- Types ---
type Repository = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  private: boolean;
  language: string | null;
  updated_at: string;
  deploymentStatus: 'DEPLOYED' | null;
};

export default function RepositoriesPage() {
  // --- State ---
  // DEFAULT IS FALSE: User MUST click the button to see lists
  const [hasAccess, setHasAccess] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);

  // --- Actions ---

  async function handleGrantAccess() {
    setLoading(true);
    
    // In a real scenario, you might trigger the OAuth here again 
    // or just check the session if they are already logged in.
    // For this specific request, we simulate the "Granting" process visually.
    
    // Simulate API delay
    setTimeout(() => {
        setHasAccess(true);
        fetchGithubRepos(); // Fetch data only AFTER granting access
    }, 800);
  }

  // --- Mock Data Fetching ---
  async function fetchGithubRepos() {
    // We already set loading to true in handleGrantAccess, 
    // but we keep it here to simulate the network request time
    setTimeout(() => {
      setRepos([
        // DEPLOYED EXAMPLES
        {
          id: 101,
          name: 'quikcart-frontend',
          full_name: 'yourname/quikcart-frontend',
          html_url: 'https://github.com/yourname/quikcart-frontend',
          description: 'E-commerce frontend built with Next.js and Tailwind.',
          private: false,
          language: 'TypeScript',
          updated_at: '2 hours ago',
          deploymentStatus: 'DEPLOYED',
        },
        {
          id: 104,
          name: 'portfolio-v2',
          full_name: 'yourname/portfolio-v2',
          html_url: 'https://github.com/yourname/portfolio-v2',
          description: 'Personal portfolio website.',
          private: false,
          language: 'JavaScript',
          updated_at: '1 week ago',
          deploymentStatus: 'DEPLOYED',
        },
        // UNDEPLOYED EXAMPLES
        {
          id: 102,
          name: 'inventory-api',
          full_name: 'yourname/inventory-api',
          html_url: 'https://github.com/yourname/inventory-api',
          description: 'Backend service for inventory management.',
          private: true,
          language: 'Go',
          updated_at: '1 day ago',
          deploymentStatus: null,
        },
        {
          id: 103,
          name: 'cloudchef-platform',
          full_name: 'yourname/cloudchef-platform',
          html_url: 'https://github.com/yourname/cloudchef-platform',
          description: 'Local deployment platform for cloud apps.',
          private: true,
          language: 'TypeScript',
          updated_at: '5 mins ago',
          deploymentStatus: null,
        },
        {
            id: 105,
            name: 'react-native-chat',
            full_name: 'yourname/react-native-chat',
            html_url: 'https://github.com/yourname/react-native-chat',
            description: null,
            private: false,
            language: 'JavaScript',
            updated_at: '3 weeks ago',
            deploymentStatus: null,
          },
      ]);
      setLoading(false);
    }, 1000);
  }

  // --- Filtering & Splitting ---
  const filteredRepos = useMemo(() => {
    return repos.filter(r => 
      r.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [repos, searchQuery]);

  const deployedRepos = filteredRepos.filter(r => r.deploymentStatus === 'DEPLOYED');
  const undeployedRepos = filteredRepos.filter(r => r.deploymentStatus === null);

  // --- Component for a Single Repo Row ---
  const RepoRow = ({ repo }: { repo: Repository }) => (
    <div className="group relative flex flex-col sm:flex-row sm:items-center justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition-all hover:border-[#14A64A]/30 hover:bg-zinc-900/80 hover:shadow-lg hover:shadow-[#14A64A]/5">
        <div className="flex-1 pr-4 mb-4 sm:mb-0">
            <div className="flex items-center gap-3">
                <h4 className="text-lg font-bold text-zinc-100 font-['Space_Grotesk'] group-hover:text-[#14A64A] transition-colors">
                    {repo.name}
                </h4>
                {repo.private && (
                    <span className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium uppercase text-zinc-400 font-['Inter']">
                        Private
                    </span>
                )}
                {repo.deploymentStatus === 'DEPLOYED' && (
                    <span className="flex items-center gap-1 rounded-full bg-[#14A64A]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#14A64A] font-['Inter'] border border-[#14A64A]/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#14A64A]" />
                    Active
                    </span>
                )}
            </div>
            <p className="mt-1 text-sm text-zinc-400 font-['Inter'] line-clamp-1">
                {repo.description || 'No description provided.'}
            </p>
            <div className="mt-3 flex items-center gap-4 text-xs text-zinc-500 font-['Inter']">
                {repo.language && (
                    <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-zinc-600 group-hover:bg-[#14A64A] transition-colors" />
                    {repo.language}
                    </span>
                )}
                <span>Updated {repo.updated_at}</span>
            </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* GitHub Link */}
            <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noreferrer"
                className="rounded-lg p-2.5 text-zinc-500 hover:bg-zinc-800 hover:text-white transition-colors"
                title="View on GitHub"
            >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
            </a>
            
            {/* Action Buttons */}
            {repo.deploymentStatus === 'DEPLOYED' ? (
                <button className="whitespace-nowrap rounded-lg border border-zinc-700 bg-transparent px-5 py-2 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-all font-['Inter']">
                    Manage
                </button>
            ) : (
                <button className="whitespace-nowrap rounded-lg bg-zinc-100 px-5 py-2 text-sm font-bold text-black hover:bg-[#14A64A] hover:text-white transition-all font-['Inter'] shadow-md">
                    Deploy
                </button>
            )}
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-[#14A64A]/30 font-['Inter']">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#14A64A]/10 via-black to-black" />
      
      <div className="relative z-10">
        <Navbar />

        <main className="mx-auto max-w-5xl px-6 py-12">
          
          {/* TOP SECTION: Heading + Grant Access Button */}
          <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-[#14A64A] font-['Space_Grotesk']">
                Repositories
              </h1>
              <p className="mt-2 text-base text-zinc-400 font-['Inter']">
                Connect and manage your GitHub projects.
              </p>
            </div>

            {/* Top Grant Access Button - ALWAYS VISIBLE and CLICKABLE to unlock view */}
            <button
                onClick={handleGrantAccess}
                disabled={hasAccess || loading}
                className={`group flex items-center gap-2 rounded-xl border border-[#14A64A]/20 bg-[#14A64A]/10 px-5 py-3 text-sm font-bold text-[#14A64A] transition-all font-['Inter'] ${hasAccess ? 'cursor-default opacity-50' : 'hover:bg-[#14A64A] hover:text-white hover:shadow-lg hover:shadow-[#14A64A]/20 active:scale-95'}`}
            >
                {loading ? (
                    <svg className="h-5 w-5 animate-spin text-current" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                ) : (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                )}
                {hasAccess ? 'Access Granted' : 'Grant GitHub Access'}
            </button>
          </header>

          {/* CONTROLS (SEARCH & IMPORT) - VISUALLY DISABLED UNTIL ACCESS GRANTED */}
          <div className={`mb-12 transition-opacity duration-300 ${!hasAccess ? 'opacity-40 pointer-events-none select-none' : 'opacity-100'}`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="group relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="h-5 w-5 text-zinc-500 group-focus-within:text-[#14A64A] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        disabled={!hasAccess}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search through your repositories..."
                        className="block w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 pl-10 pr-3 text-zinc-200 placeholder-zinc-500 focus:border-[#14A64A]/50 focus:ring-1 focus:ring-[#14A64A]/50 focus:outline-none transition-all font-['Inter']"
                    />
                </div>
                <button
                    onClick={() => setShowImportModal(true)}
                    disabled={!hasAccess}
                    className="whitespace-nowrap rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-700 transition-all font-['Inter'] shadow-sm"
                    >
                    Import from URL
                </button>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <section className="min-h-[400px]">
            {!hasAccess ? (
              // --- STATE 1: NO ACCESS (STRICT GATE) ---
              // This is now the DEFAULT state until the user clicks "Grant Access"
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 py-24 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-6 rounded-full bg-zinc-900 p-6 ring-1 ring-zinc-800 shadow-2xl">
                  <svg className="h-12 w-12 text-zinc-600" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white font-['Space_Grotesk']">
                  Please Grant GitHub Access
                </h3>
                <p className="max-w-md text-zinc-400 mb-8 font-['Inter']">
                  To view and deploy your repositories, we need permission to read your GitHub account.
                </p>
                <button
                  onClick={handleGrantAccess}
                  disabled={loading}
                  className="rounded-lg bg-[#14A64A] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#14A64A]/20 transition-all hover:bg-[#14A64A]/90 hover:shadow-[#14A64A]/30 active:scale-95 font-['Inter'] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Connecting...' : 'Grant Access'}
                </button>
              </div>

            ) : loading ? (
              // --- STATE 2: LOADING (Between Click and List) ---
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 w-full animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/50" />
                ))}
              </div>

            ) : (
              // --- STATE 3: LISTS (Unlocked) ---
              <div className="space-y-12 animate-in fade-in duration-500">
                
                {/* SECTION 1: DEPLOYED PROJECTS */}
                {deployedRepos.length > 0 && (
                    <div>
                        <div className="mb-4 flex items-center gap-2 border-b border-zinc-800 pb-3">
                            <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">Deployed Projects</h2>
                            <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">{deployedRepos.length}</span>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {deployedRepos.map((repo) => <RepoRow key={repo.id} repo={repo} />)}
                        </div>
                    </div>
                )}

                {/* SECTION 2: UNDEPLOYED (AVAILABLE) */}
                <div>
                     <div className="mb-4 flex items-center gap-2 border-b border-zinc-800 pb-3">
                        <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">Available Repositories</h2>
                        <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">{undeployedRepos.length}</span>
                    </div>
                    
                    {undeployedRepos.length > 0 ? (
                         <div className="grid grid-cols-1 gap-4">
                            {undeployedRepos.map((repo) => <RepoRow key={repo.id} repo={repo} />)}
                        </div>
                    ) : (
                        <div className="py-8 text-center text-zinc-500 font-['Inter']">
                            No other repositories found matching your search.
                        </div>
                    )}
                </div>

              </div>
            )}
          </section>
        </main>

        {/* Import Modal */}
        {showImportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl animate-in fade-in zoom-in duration-200 p-6">
                <h4 className="text-xl font-bold text-white font-['Space_Grotesk']">
                  Import from URL
                </h4>
                <p className="mt-2 text-sm text-zinc-400 font-['Inter']">
                   Enter a public GitHub repository URL.
                </p>

                <ImportPanel 
                    compact 
                    onImport={() => {}} 
                    onCompactImport={(val) => {
                        console.log("Importing:", val);
                        setShowImportModal(false);
                    }}
                />
                
                <div className="mt-4 flex justify-end">
                    <button 
                        onClick={() => setShowImportModal(false)}
                        className="text-xs text-zinc-500 hover:text-white"
                    >
                        Close
                    </button>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}