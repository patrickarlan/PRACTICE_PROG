import { Code2, Download, MessageSquare } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SocialLinks } from './SocialLinks';

export function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    // Scrolls to a section by ID. If not on the home page, navigates there first.
    const scrollToSection = (sectionId: string) => {
        if (location.pathname === '/') {
            // Already on home — just scroll
            const el = document.getElementById(sectionId);
            el?.scrollIntoView({ behavior: 'smooth' });
        } else {
            // On another page — go home first, then scroll after React renders
            navigate('/');
            setTimeout(() => {
                const el = document.getElementById(sectionId);
                el?.scrollIntoView({ behavior: 'smooth' });
            }, 150);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-brand-surface/40 bg-brand-bg/75 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo — always navigates to home root */}
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="p-2 rounded-lg bg-brand-surface/40 border border-brand-muted/30 text-brand-accent group-hover:bg-brand-surface/60 transition-colors">
                        <Code2 className="w-5 h-5" />
                    </div>
                    <span className="font-bold tracking-tight text-brand-text group-hover:text-brand-accent transition-colors">
                        Patrick<span className="text-brand-accent">.dev</span>
                    </span>
                </Link>

                {/* 4 Core Section Anchors — route-aware smooth scroll */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-text/70">
                    <button
                        onClick={() => scrollToSection('home')}
                        className="hover:text-brand-accent transition-colors cursor-pointer"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => scrollToSection('projects')}
                        className="hover:text-brand-accent transition-colors cursor-pointer"
                    >
                        Projects
                    </button>
                    <button
                        onClick={() => scrollToSection('skills')}
                        className="hover:text-brand-accent transition-colors cursor-pointer"
                    >
                        Skills
                    </button>
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="hover:text-brand-accent transition-colors cursor-pointer"
                    >
                        Contact
                    </button>
                </nav>

                {/* Header Actions: Socials + Resume + Chat */}
                <div className="flex items-center gap-3">
                    <SocialLinks className="hidden lg:flex" />

                    <a
                        href="/Patrick_Arlan_Resume.pdf"
                        download
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold 
                       bg-gradient-to-r from-brand-surface to-brand-muted text-brand-text 
                       border border-brand-muted/40 hover:from-brand-muted hover:to-brand-accent 
                       hover:text-brand-bg transition-all shadow-md shadow-brand-bg/60 cursor-pointer"
                    >
                        <Download className="w-3.5 h-3.5" />
                        Resume
                    </a>

                    <button
                        onClick={() => alert("Homelab Live Chat is currently in development! Feel free to reach out via email.")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold 
                       bg-brand-surface/30 border border-brand-muted/30 text-brand-text 
                       hover:bg-brand-surface/60 hover:text-brand-accent transition-all cursor-pointer"
                    >
                        <MessageSquare className="w-3.5 h-3.5 text-brand-accent" />
                        Chat
                    </button>
                </div>

            </div>
        </header>
    );
}