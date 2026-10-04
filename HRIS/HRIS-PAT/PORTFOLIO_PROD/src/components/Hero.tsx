import { ArrowRight, Sparkles, FolderCode } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
    return (
        <section className="relative w-full py-20 px-6 flex flex-col items-center text-center overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#5B2A86]/30 
           rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#5B2A86]/50 text-[#FFD1E8] border border-[#9B6DCC]/40 mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#FFD1E8] animate-pulse"></span>
                Computer Engineering Student • Full-Stack Developer
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F2D7FF] max-w-3xl leading-tight sm:leading-none mb-6">
                Building Scalable Systems &amp; <br />
                <span className="bg-gradient-to-r from-[#F2D7FF] via-[#9B6DCC] to-[#FFD1E8] bg-clip-text text-transparent">
                    Modern Web Architectures.
                </span>
            </h1>

            <p className="text-[#F2D7FF]/80 max-w-xl text-base sm:text-lg mb-8 leading-relaxed">
                Passionate about crafting enterprise-grade backends with ASP.NET Core &amp; PostgreSQL, coupled with performant, typed React interfaces.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold 
                                bg-gradient-to-r from-[#5B2A86] to-[#9B6DCC] text-[#F2D7FF] 
                                border border-[#9B6DCC]/40 hover:from-[#9B6DCC] hover:to-[#FFD1E8] hover:text-[#2D0B59] 
                                transition-all shadow-lg shadow-[#2D0B59]/60 cursor-pointer">
                    <FolderCode className="w-4 h-4" />
                    View My Projects
                    <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold 
                     bg-[#5B2A86]/30 border border-[#9B6DCC]/40 text-[#F2D7FF] 
                     hover:bg-[#5B2A86]/60 hover:text-[#FFD1E8] transition-all cursor-pointer">
                    <Sparkles className="w-4 h-4 text-[#FFD1E8]" />
                    Get In Touch
                </a>
            </div>
        </section>
    )
}