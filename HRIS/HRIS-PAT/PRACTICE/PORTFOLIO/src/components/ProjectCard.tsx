// interface ProjectCard
interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    projectUrl: string;
}

export function ProjectCard({ title, description, tags, projectUrl }: ProjectCardProps) {
    return (
        <article className="card hover:scale-105 transition-transform duration-300 
        m-2 p-6 bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-zinc-50">{title}</h3>
            <p className="text-zinc-400 mt-2 text-sm">{description}</p>
            <div className="mt-2">
                {tags.map((tag, index) => (
                    <span key={index} className="inline-block px-2 py-1 mr-2 text-sm 
                    text-white bg-blue-500 rounded">{tag}</span>
                ))}
            </div>
            <a href={projectUrl} className="inline-block mt-4 text-xs 
                    font-semibold text-sky-400 hover:underline">
                Link to project &rarr;
            </a>
        </article>
    )
}
