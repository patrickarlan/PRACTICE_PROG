import { Terminal } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t border-zinc-900 bg-zinc-950 py-10 mt-auto">
            <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
                {/* Left: Built with info */}
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span>Designed & Built by Patrick Arlan</span>
                </div>

                <div className="flex items-center gap-4">
                    <span>React 19 • TypeScript • Tailwind CSS</span>
                    <span>© {new Date().getFullYear()}</span>
                </div>
            </div>
        </footer>
    );
}