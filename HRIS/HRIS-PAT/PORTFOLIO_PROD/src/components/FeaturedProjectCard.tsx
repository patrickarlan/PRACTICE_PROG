import { ExternalLink, ShieldCheck, Database, Layers } from 'lucide-react';

export function FeaturedProjectCard() {
    return (
        <div className="relative group col-span-1 md:col-span-2 rounded-2xl 
        bg-[#5B2A86]/25 border border-[#5B2A86]/50 hover:border-[#9B6DCC]/60 p-7 
        flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#2D0B59]/60">

            <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#5B2A86]/50 text-[#FFD1E8] border border-[#9B6DCC]/40">
                    Featured Enterprise System
                </span>
                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#FFD1E8] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>
            <div>
                <h3 className="text-xl font-bold text-[#F2D7FF] mb-2 group-hover:text-[#FFD1E8] transition-colors">
                    HRIS — Accomplishment Reporting System
                </h3>
                <p className="text-sm text-[#F2D7FF]/70 leading-relaxed mb-6">
                    A production full-stack Human Resource Information System featuring JWT claim-based RBAC,
                    pessimistic AR mutations, automated PostgreSQL, migrations, and custom Shadcn UI components.
                </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#5B2A86]/40">
                <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-,d bg-[#2D0B59]/60 
                    text-xs font medium text-[#F2D7FF] border border-[#52BA86/60]">
                        <Layers className="w-3.5 h-3.5 text-[#FFD1E8]" /> ASP.NET Core 10
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-,d bg-[#2D0B59]/60 
                    text-xs font medium text-[#F2D7FF] border border-[#52BA86/60]">
                        <Database className="w-3.5 h-3.5 text-[#FFD1E8]" /> PostgreSQL + EF Core
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-,d bg-[#2D0B59]/60 
                    text-xs font medium text-[#F2D7FF] border border-[#52BA86/60]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#FFD1E8]" /> React 19 + Shadcn UI
                    </span>
                </div>
            </div>
        </div>
    );
}