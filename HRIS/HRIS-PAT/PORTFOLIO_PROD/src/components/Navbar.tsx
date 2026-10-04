import { Code2, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#5B2A86]/40 bg-[#2D0B59]/70 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="p-2 rounded-lg bg-[#5B2A86]/40 border border-[#9B6DCC]/30 text-[#FFD1E8] group-hover:bg-[#5B2A86]/60 transition-colors">
                        <Code2 className="w-5 h-5" />
                    </div>
                    <span className="font-bold tracking-tight text-[#F2D7FF] group-hover:text-[#FFD1E8] transition-colors">
                        Patrick<span className="text-[#FFD1E8]">.dev</span>
                    </span>
                </Link>
                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#F2D7FF]/70">
                    <Link to="/" className="hover:text-[#FFD1E8] transition-colors">
                        About
                    </Link>
                    <Link to="/projects" className="hover:text-[#FFD1E8] transition-colors">
                        Projects
                    </Link>
                    <a href="#contact" className="hover:text-[#FFD1E8] transition-colors">
                        Contact
                    </a>
                </nav>
                {/* Action Button: Violet to Blossom Gradient */}
                <div className="flex items-center gap-3">
                    <a
                        href="https://github.com/patrickarlan"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold 
                       bg-gradient-to-r from-[#5B2A86] to-[#9B6DCC] text-[#F2D7FF] 
                       border border-[#9B6DCC]/40 hover:from-[#9B6DCC] hover:to-[#FFD1E8] 
                       hover:text-[#2D0B59] transition-all shadow-lg shadow-[#2D0B59]/50 cursor-pointer"
                    >
                        GitHub
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                </div>
            </div>
        </header>
    );
}