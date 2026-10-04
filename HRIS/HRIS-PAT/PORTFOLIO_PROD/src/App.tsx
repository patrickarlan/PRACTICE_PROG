import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#9B6DCC]/30 selection:text-[#FFD1E8]">
      <Navbar />
      {/* Main Content Area */}
      <main className="flex-1">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}