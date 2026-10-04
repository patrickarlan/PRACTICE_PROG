import { UserCheck, GraduationCap } from 'lucide-react';

export function AboutCard() {
    return (
        <div className="col-span-1 md:col-span-2 rounded-2xl bg-[#5B2A86]/25 border border-[#5B2A86]/50 
        hover:border-[#9B6DCC]/60 p-7 flex flex-col justify-between transition-all duration-300">
            <div className="flex items-center gap-2 mb-3 text-[#FFD1E8]">
                <GraduationCap className="w-5 h-5" />
                <h3 className="text-base font-bold text-[#F2D7FF]">About Patrick</h3>
            </div>

            <p className="text-sm text-[#F2D7FF]/80 leading-relaxed mb-4">
                As a Computer Engineering student, I bridge the gap between low-level hardware principles and
                high-level enterprise cloud systems. I value type-safety,
                clean domain-driven architecture, and accessible, responsive design
            </p>
            <div className="flex items-center gap-4 text-xs text-[#F2D7FF]/60 pt-3 border-t border-[#5B2A86]/40">
                <span className="inline-flex items-center gap-1 text-[#F2D7FF]">
                    <UserCheck className="w-3.5 h-3.5 text-[#FFD1E8]" /> Open to Internships &amp; Roles
                </span>
                <span>•</span>
                <span>Based in the Philippines 🇵🇭</span>
            </div>
        </div>
    );
}