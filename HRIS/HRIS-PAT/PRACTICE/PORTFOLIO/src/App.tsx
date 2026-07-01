// portfolio activity
import './App.css'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ProjectCard } from './components/ProjectCard'
import { useEffect, useState } from 'react'
import { useProjects } from './hooks/useProjects'

function App() {
  const [likes, setLikes] = useState(0)
  const { projects, addProject } = useProjects()
  const handleLikeClick = () => {
    setLikes(likes + 1)
  }
  useEffect(() => {
    console.log("Likes: ", likes)
  }, [likes])

  // Task 3: Load Log
  useEffect(() => {
    console.log("Welcome to Patrick's Porfolio dev environment!");
  }, [])
  return (
    <>
      <Navbar />

      {/* Hero section with centered button */}
      <section className="flex flex-col items-center text-center py-12">
        <h1 className="text-3xl font-bold">Hi! These are my projects!</h1>
        <p className="m-2 text-zinc-400">
          I am a Computer Engineering Student with the passion to build mini projects!
        </p>

        {/* TASK 1: Project Counter in the Hero */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <p className='bg-white text-zinc-950 px-3 py-2 border border-zinc-300 rounded-lg font-semibold'>
            Likes: {likes}
          </p>
          <button onClick={handleLikeClick} className='px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 cursor-pointer transition-colors'>
            👍 Like Portfolio
          </button>
        </div>
      </section>

      {/*main grid for project cards */}
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
            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded 
            hover:bg-purple-700 cursor-pointer transition-colors self-start sm:self-auto">
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
      <Footer />
    </>
  )
}

export default App
