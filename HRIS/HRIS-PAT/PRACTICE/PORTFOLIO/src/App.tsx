// portfolio activity
import './App.css'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ProjectCard } from './components/ProjectCard'

function App() {

  return (
    <>
      <Navbar />

      {/* hero between Navbar and the grid welcoming users   */}
      <section className="m-2">
        <h1 className="text-2xl font-bold">Hi! These are my projects!</h1>
        <p className="m-2 text-zinc-400">
          I am a Computer Engineering Student with the passion to build mini projects!
        </p>
      </section>

      {/*main grid for project cards */}
      <main className="flex-1 max-w-6xl mx-auto py-12 px-6">
        <h2 id="projects" className="text-3xl font-bold mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard
            title="AFICS (CAPSTONE PROJECT)"
            description="This is a description of my first project."
            tags={["Python1", " tkinter", "CSS"]}
            projectUrl="https://github.com/"
          />

          <ProjectCard
            title="HRIS WEB APP"
            description="This is a description of my second project."
            tags={["React", "C#", "HTML", "CSS"]}
            projectUrl="https://github.com/"
          />

          <ProjectCard
            title="HOMELAB SERVER"
            description="This is a description of my third project."
            tags={["Ubuntu", "Linux", "OpenSSH"]}
            projectUrl="https://github.com/"
          />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
