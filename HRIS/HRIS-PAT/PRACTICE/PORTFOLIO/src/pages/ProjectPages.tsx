import { ProjectCard } from '../components/ProjectCard'
import { useProjects } from '../hooks/useProjects'

export function ProjectPage() {
    const { projects, addProject } = useProjects()

    return (
        <main className="flex-1 max-w-6xl mx-auto py-12 px-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <h2 id="projects" className="text-3xl font-bold">Projects</h2>
                <button
                    onClick={() => addProject({
                        title: "SECRET PROJECT 🤫",
                        description: "This is a super secret project dynamically added!",
                        tags: ["Secret", "React", "TypeScript"],
                        projectUrl: "https://github.com"
                    })}
                    className="px-4 py-2 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 cursor-pointer transition-colors">
                    🚀 Add Secret Project
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        title={project.title}
                        description={project.description}
                        tags={project.tags}
                        projectUrl={project.projectUrl}
                    />
                ))}
            </div>
        </main>
    )
}