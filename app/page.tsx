import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 font-['Inter'] selection:bg-[#14A64A]/30">
      {/* Global Background Gradient */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#14A64A]/15 via-black to-black" />
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
      </div>
    </div>
  );
}