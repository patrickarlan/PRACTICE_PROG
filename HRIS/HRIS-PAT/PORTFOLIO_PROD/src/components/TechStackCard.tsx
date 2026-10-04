import { Cpu } from 'lucide-react';

const technologies = [
    { name: 'C# / .NET 10', category: 'Backend' },
    { name: 'ASP.NET Core', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Entity Framework', category: 'ORM' },
    { name: 'React 19', category: 'Frontend' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Docker', category: 'DevOps' },
];

export function TechStackCard() {
    return (
        <div className="col-span-1 rounded-2xl bg-[#5B2A86]/25 border border-[#5B2A86]/50 
        hover:border-[#9B6DCC]/60 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300">
            <div>
                <div className="flex items-center gap-2 mb-3 text-[#FFD1E8]">
                    <Cpu className="w-5 h-5" />
                    <h3 className="text-base font-bold text-[#F2D7FF]">Core Tech Stack</h3>
                </div>
                <p className="text-xs text-[#F2D7FF]/70 mb-5">
                    Technologies and tools I specialize in for enterprise applications:
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                    <span
                        key={tech.name}
                        className="px-2.5 py-1 rounded-md bg-[#2D0B59]/60 border border-[#5B2A86]/60 
                        text-xs font-medium text-[#F2D7FF]/90 hover:border-[#FFD1E8]/50 hover:text-[#FFD1E8] 
                        transition-colors">
                        {tech.name}
                    </span>
                ))}
            </div>
        </div>
    );
}