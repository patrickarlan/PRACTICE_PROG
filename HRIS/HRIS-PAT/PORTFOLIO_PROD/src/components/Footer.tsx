import { Terminal, Download, MessageSquare } from "lucide-react";
export function Footer() {
    return (
        <footer className="w-full border-t border-brand-surface/40 bg-brand-bg/80 backdrop-blur-md py-12 mt-auto">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-brand-text/70">
                {/* 1. Left: Built with info */}
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-brand-accent" />
                    <span>Designed &amp; Built by <strong className="text-brand-text">Patrick Arlan</strong></span>
                </div>
                {/* 2. Center: Action Buttons (both Resume and Chat sit inside here) */}
                <div className="flex items-center gap-3">
                    <a
                        href="/Patrick_Arlan_Resume.pdf"
                        download
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-surface/40 border border-brand-muted/30 hover:border-brand-accent/50 hover:text-brand-accent transition-all cursor-pointer"
                    >
                        <Download className="w-3.5 h-3.5" />
                        Resume
                    </a>
                    <button
                        onClick={() => alert("Homelab Live Chat is currently in development! Feel free to reach out via email.")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-surface/40 border border-brand-muted/30 hover:border-brand-accent/50 hover:text-brand-accent transition-all cursor-pointer"
                    >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Chat (Beta)
                    </button>
                </div>
                {/* 3. Right: Tech stack & copyright */}
                <div className="flex items-center gap-3 text-brand-muted">
                    <span>React 19 • Tailwind CSS • ASP.NET Core</span>
                    <span>© {new Date().getFullYear()}</span>
                </div>
            </div>
        </footer>
    );
}
