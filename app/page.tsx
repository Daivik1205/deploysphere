import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-[#E4DCC9]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      <Hero />
    </div>
  );
}