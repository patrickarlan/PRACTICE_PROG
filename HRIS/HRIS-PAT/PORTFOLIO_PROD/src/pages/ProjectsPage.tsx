import { FolderGit2, ExternalLink } from 'lucide-react';

const projectList = [
    {
        title: 'HRIS Management Suite',
        description: 'Enterprise HR system with ASP.NET Core 10 WebAPI, JWT auth, and PostgreSQL.',
        tags: ['C#', 'ASP.NET Core', 'PostgreSQL', 'React'],
    },
    {
        title: 'Portfolio V2 (Production)',
        description: 'Modern developer portfolio with Bento Grid architecture and React 19.',
        tags: ['React 19', 'TypeScript', 'Tailwind CSS'],
    },
    {
        title: 'Embedded System Monitor',
        description: 'Hardware telemetry tracker built with C++ and microcontrollers.',
        tags: ['C++', 'IoT', 'Hardware'],
    },
];

export function ProjectsPage() {
    return (
        <div className="w-full max-w-6xl mx-auto px-6 py-16">
            {/*Page Header*/}
            <div className="mb-12">
                <span className="text-xs font-semibold text-[#FFD1E8] uppercase tracking-wider">
                    Portfolio Archive
                </span>
                <h1 className="text-4xl font-extrabold text-[#F2D7FF] mt-1">All Projects &amp; Systems</h1>
                <p className="text-[#F2D7FF]/70 mt-2 text-sm max-w-xl">
                    A collection of full-stack web applications, APIs, and computer engineering experiments.
                </p>
            </div>
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectList.map((project) => (
                    <div
                        key={project.title}
                        className="rounded-xl bg-[#5B2A86]/25 border border-[#5B2A86]/50 hover:border-[#9B6DCC]/60 p-6 flex flex-col justify-between transition-all hover:-translate-y-1"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <FolderGit2 className="w-6 h-6 text-[#FFD1E8]" />
                                <a href="https://github.com" target="_blank" rel="noreferrer">
                                    <ExternalLink className="w-4 h-4 text-[#9B6DCC] hover:text-[#FFD1E8] transition-colors cursor-pointer" />
                                </a>
                            </div>
                            <h3 className="text-lg font-bold text-[#F2D7FF] mb-2">{project.title}</h3>
                            <p className="text-xs text-[#F2D7FF]/70 leading-relaxed mb-6">{project.description}</p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#5B2A86]/40">
                            {project.tags.map((tag) => (
                                <span key={tag} className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#2D0B59]/60 border border-[#5B2A86]/50 text-[#F2D7FF]">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}