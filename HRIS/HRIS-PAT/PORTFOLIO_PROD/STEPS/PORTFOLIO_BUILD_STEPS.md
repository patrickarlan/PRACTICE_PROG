# 🏆 PORTFOLIO_PROD: Full Step-by-Step Curriculum (freeCodeCamp Style)

Welcome to your production portfolio build plan! This document is organized in the **freeCodeCamp step-by-step method**. 

Every step has:
1. **🎯 Objective:** What you are building.
2. **💡 The Concept:** Why we do it this way and what the syntax means.
3. **📝 The Task & Code:** The exact code to write.
4. **🧪 Check Your Code:** The verification checklist to ensure it works in your browser before moving to the next step.

---

## 🗺️ Curriculum Overview

* **Module 1: The App Frame (Shell)**
  * Step 1: The Modern Glassmorphic Navbar
  * Step 2: The Minimalist Footer
  * Step 3: Wiring the Shell in `App.tsx`
* **Module 2: The Hero Section (The Hook)**
  * Step 4: Pulsing Status Badge & High-Impact Headline
  * Step 5: Primary Action Buttons & Social Bar
* **Module 3: The Bento Grid Architecture (The Core)**
  * Step 6: The Bento Grid Container Layout
  * Step 7: Bento Card 1 — Flagship Project Spotlight (HRIS System)
  * Step 8: Bento Card 2 — Tech Stack Matrix
  * Step 9: Bento Card 3 — Interactive Developer Widget (State + Likes)
  * Step 10: Bento Card 4 — About Me & Engineering Philosophy
* **Module 4: Client-Side Routing & Dedicated Pages**
  * Step 11: Create `src/pages/HomePage.tsx`
  * Step 12: Create `src/pages/ProjectsPage.tsx`
  * Step 13: Wire up `<Routes>` in `App.tsx`
* **Module 5: Custom Hooks & Protected Route**
  * Step 14: Create `src/hooks/useProjects.ts`
  * Step 15: Create `src/components/ProtectedRoute.tsx`
  * Step 16: Wire up the `/secret` route and Login toggle

---

# ═══════════════════════════════════════
# 📦 MODULE 1: THE APP FRAME (SHELL)
# ═══════════════════════════════════════

---

### Step 1: The Modern Glassmorphic Navbar

#### 🎯 Objective:
Create a sticky header with a frosted-glass blur effect that stays pinned at the top when scrolling, displaying your branding, navigation links, and a GitHub button with Lucide icons.

#### 💡 The Concept:
* **Glassmorphism:** `bg-zinc-950/75 backdrop-blur-md border-b border-zinc-800/80` creates a modern translucent glass panel.
* **Sticky Navigation:** `sticky top-0 z-50` keeps the navbar above all other content.
* **Lucide Icons:** Instead of emojis, modern software uses crisp SVG icon components (`<Code2 />`, `<ArrowUpRight />`).

#### 📝 Code Implementation:
Create `src/components/Navbar.tsx`:

```tsx
// src/components/Navbar.tsx
import { Code2, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/75 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            Patrick<span className="text-emerald-400">.dev</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link to="/" className="hover:text-white transition-colors">
            About
          </Link>
          <Link to="/projects" className="hover:text-white transition-colors">
            Projects
          </Link>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-all cursor-pointer"
          >
            GitHub
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </a>
        </div>

      </div>
    </header>
  );
}
```

#### 🧪 Check Your Code:
- [ ] File created at `src/components/Navbar.tsx`.
- [ ] No TypeScript compiler errors.

---

### Step 2: The Minimalist Footer

#### 🎯 Objective:
Build a clean, non-intrusive footer displaying copyright info, tech stack credentials, and quick social links.

#### 💡 The Concept:
A professional footer should be subtle and ground the page without overwhelming the user. Using muted text (`text-zinc-500`) with hover transitions gives an elegant finish.

#### 📝 Code Implementation:
Create `src/components/Footer.tsx`:

```tsx
// src/components/Footer.tsx
import { Terminal } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-900 bg-zinc-950 py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        
        {/* Left: Built with info */}
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>Designed & Built by Patrick Arlan</span>
        </div>

        {/* Right: Tech Stack badge */}
        <div className="flex items-center gap-4 text-zinc-400">
          <span>React 19 • TypeScript • Tailwind CSS</span>
          <span>© {new Date().getFullYear()}</span>
        </div>

      </div>
    </footer>
  );
}
```

#### 🧪 Check Your Code:
- [ ] File created at `src/components/Footer.tsx`.
- [ ] Uses dynamic year `new Date().getFullYear()`.

---

### Step 3: Wire the Shell in `App.tsx`

#### 🎯 Objective:
Render `<Navbar />` and `<Footer />` in `App.tsx` so they wrap the central viewport area.

#### 💡 The Concept:
Using `flex flex-col min-h-screen` with `flex-1` on the `<main>` tag ensures that even on tall monitor screens, the footer always pushes cleanly to the bottom.

#### 📝 Code Implementation:
Update `src/App.tsx`:

```tsx
// src/App.tsx
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-300">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-extrabold text-white">App Frame Ready! 🚀</h1>
        <p className="text-zinc-400 mt-2 text-sm">Next up: The Bento Hero section.</p>
      </main>

      <Footer />
    </div>
  );
}
```

#### 🧪 Check Your Code:
- [ ] Open `http://localhost:5173`.
- [ ] You see the sticky glassmorphic navbar at the top.
- [ ] You see the footer pinned cleanly at the bottom.

---

# ═══════════════════════════════════════
# 🚀 MODULE 2: THE HERO SECTION (THE HOOK)
# ═══════════════════════════════════════

---

### Step 4: Build the Hero Component

#### 🎯 Objective:
Create a high-impact intro featuring a pulsing status pill badge, a bold gradient headline, and a clean engineering elevator pitch.

#### 💡 The Concept:
* **Ambient Glow:** Subtle radial background gradients draw the user's eye to the center without harsh contrast.
* **Gradient Text:** `bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent` gives headlines a sleek metallic sheen.
* **Pulsing Badge:** An active green pulse (`animate-pulse`) signals availability and vitality.

#### 📝 Code Implementation:
Create `src/components/Hero.tsx`:

```tsx
// src/components/Hero.tsx
import { ArrowRight, Sparkles, FolderCode } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative w-full py-20 px-6 flex flex-col items-center text-center overflow-hidden">
      
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 🟢 Status Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        Computer Engineering Student • Full-Stack Developer
      </div>

      {/* Headline */}
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-tight sm:leading-none mb-6">
        Building Scalable Systems & <br />
        <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
          Modern Web Architectures.
        </span>
      </h1>

      {/* Subtext */}
      <p className="text-zinc-400 max-w-xl text-base sm:text-lg mb-8 leading-relaxed">
        Passionate about crafting enterprise-grade backends with ASP.NET Core & PostgreSQL, coupled with performant, typed React interfaces.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-emerald-500 text-zinc-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
        >
          <FolderCode className="w-4 h-4" />
          View My Projects
          <ArrowRight className="w-4 h-4" />
        </Link>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 hover:bg-zinc-800/80 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          Get In Touch
        </a>
      </div>

    </section>
  );
}
```

#### 🧪 Check Your Code:
- [ ] Import and render `<Hero />` in `App.tsx` under `<Navbar />`.
- [ ] Browser shows the gradient headline and pulsing badge.

---

# ═══════════════════════════════════════
# 🍱 MODULE 3: THE BENTO GRID ARCHITECTURE
# ═══════════════════════════════════════

---

### Step 5: Bento Card 1 — Flagship Project Spotlight (HRIS)

#### 🎯 Objective:
Create a showcase card for your flagship project: the **HRIS (Human Resource Information System)** with role-based badges and direct callouts.

#### 📝 Code Implementation:
Create `src/components/FeaturedProjectCard.tsx`:

```tsx
// src/components/FeaturedProjectCard.tsx
import { ExternalLink, ShieldCheck, Database, Layers } from 'lucide-react';

export function FeaturedProjectCard() {
  return (
    <div className="relative group col-span-1 md:col-span-2 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-black/40">
      
      {/* Top Tag & Link */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Featured Enterprise System
        </span>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="text-zinc-500 hover:text-white transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Title & Description */}
      <div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
          HRIS — Accomplishment Reporting System
        </h3>
        <p className="text-sm text-zinc-400 leading-relaxed mb-6">
          A production full-stack Human Resource Information System featuring JWT claim-based RBAC, pessimistic AR mutations, automated PostgreSQL migrations, and custom Shadcn UI components.
        </p>
      </div>

      {/* Feature Highlights & Tech Badges */}
      <div className="space-y-4 pt-4 border-t border-zinc-800/60">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800/60 text-xs font-medium text-zinc-300 border border-zinc-700/50">
            <Layers className="w-3.5 h-3.5 text-cyan-400" /> ASP.NET Core 10
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800/60 text-xs font-medium text-zinc-300 border border-zinc-700/50">
            <Database className="w-3.5 h-3.5 text-blue-400" /> PostgreSQL + EF Core
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800/60 text-xs font-medium text-zinc-300 border border-zinc-700/50">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> React 19 + Shadcn UI
          </span>
        </div>
      </div>

    </div>
  );
}
```

---

### Step 6: Bento Card 2 — Core Tech Stack Matrix

#### 🎯 Objective:
Create a visual card highlighting your primary programming languages, frameworks, and databases with modern badge styling.

#### 📝 Code Implementation:
Create `src/components/TechStackCard.tsx`:

```tsx
// src/components/TechStackCard.tsx
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
    <div className="col-span-1 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 p-7 flex flex-col justify-between transition-all duration-300">
      
      <div>
        <div className="flex items-center gap-2 mb-3 text-emerald-400">
          <Cpu className="w-5 h-5" />
          <h3 className="text-base font-bold text-white">Core Tech Stack</h3>
        </div>
        <p className="text-xs text-zinc-400 mb-5">
          Technologies and tools I specialize in for enterprise applications:
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech.name}
            className="px-2.5 py-1 rounded-md bg-zinc-800/70 border border-zinc-700/60 text-xs font-medium text-zinc-200 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
          >
            {tech.name}
          </span>
        ))}
      </div>

    </div>
  );
}
```

---

### Step 7: Bento Card 3 — Interactive Developer Widget

#### 🎯 Objective:
Reinforce React state (`useState` + `useEffect`) by creating an interactive card with a live "Like Portfolio" button and live timestamp.

#### 📝 Code Implementation:
Create `src/components/InteractiveWidgetCard.tsx`:

```tsx
// src/components/InteractiveWidgetCard.tsx
import { useState, useEffect } from 'react';
import { ThumbsUp, Activity } from 'lucide-react';

export function InteractiveWidgetCard() {
  const [likes, setLikes] = useState<number>(0);
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="col-span-1 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 p-7 flex flex-col justify-between transition-all duration-300">
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5" /> Live Widget
        </span>
        <span className="text-xs font-mono text-zinc-500">{time}</span>
      </div>

      <div>
        <h4 className="text-base font-bold text-white mb-1">Interactive React State</h4>
        <p className="text-xs text-zinc-400 mb-4">
          Demonstrates client-side state persistence and lifecycle hooks.
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-zinc-800/60">
        <span className="text-sm font-semibold text-zinc-300">
          Likes: <span className="text-emerald-400 font-bold">{likes}</span>
        </span>
        <button
          onClick={() => setLikes(likes + 1)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all cursor-pointer"
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          Give Kudos
        </button>
      </div>

    </div>
  );
}
```

---

### Step 8: Bento Card 4 — About Me & Philosophy

#### 🎯 Objective:
Create an engineering identity card highlighting your approach to computer engineering, clean code, and full-stack development.

#### 📝 Code Implementation:
Create `src/components/AboutCard.tsx`:

```tsx
// src/components/AboutCard.tsx
import { UserCheck, GraduationCap } from 'lucide-react';

export function AboutCard() {
  return (
    <div className="col-span-1 md:col-span-2 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 p-7 flex flex-col justify-between transition-all duration-300">
      
      <div className="flex items-center gap-2 mb-3 text-emerald-400">
        <GraduationCap className="w-5 h-5" />
        <h3 className="text-base font-bold text-white">About Patrick</h3>
      </div>

      <p className="text-sm text-zinc-300 leading-relaxed mb-4">
        As a Computer Engineering student, I bridge the gap between low-level hardware principles and high-level enterprise cloud systems. I value type-safety, clean domain-driven architecture, and accessible, responsive design.
      </p>

      <div className="flex items-center gap-4 text-xs text-zinc-500 pt-3 border-t border-zinc-800/60">
        <span className="inline-flex items-center gap-1 text-zinc-400">
          <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> Open to Internships & Roles
        </span>
        <span>•</span>
        <span>Based in the Philippines 🇵🇭</span>
      </div>

    </div>
  );
}
```

---

### Step 9: Assemble the Bento Grid Container

#### 🎯 Objective:
Combine all 4 cards into a cohesive, responsive CSS Grid.

#### 📝 Code Implementation:
Create `src/components/BentoGrid.tsx`:

```tsx
// src/components/BentoGrid.tsx
import { FeaturedProjectCard } from './FeaturedProjectCard';
import { TechStackCard } from './TechStackCard';
import { InteractiveWidgetCard } from './InteractiveWidgetCard';
import { AboutCard } from './AboutCard';

export function BentoGrid() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeaturedProjectCard />
        <TechStackCard />
        <InteractiveWidgetCard />
        <AboutCard />
      </div>
    </section>
  );
}
```

#### 🧪 Check Your Code:
- [ ] Add `<Hero />` and `<BentoGrid />` inside `App.tsx`.
- [ ] On desktop (`md:`), the grid displays a balanced 3-column layout.
- [ ] On mobile, it smoothly collapses into a single column.
- [ ] Clicking "Give Kudos" increments the like counter in real time!

---

# ═══════════════════════════════════════
# 🚦 MODULE 4: CLIENT-SIDE ROUTING & PAGES
# ═══════════════════════════════════════

---

### Step 10: Create `HomePage.tsx`

#### 🎯 Objective:
Extract the Hero and BentoGrid into a clean page view component.

#### 📝 Code Implementation:
Create `src/pages/HomePage.tsx`:

```tsx
// src/pages/HomePage.tsx
import { Hero } from '../components/Hero';
import { BentoGrid } from '../components/BentoGrid';

export function HomePage() {
  return (
    <>
      <Hero />
      <BentoGrid />
    </>
  );
}
```

---

### Step 11: Create `ProjectsPage.tsx`

#### 🎯 Objective:
Create a dedicated catalog page to showcase all of your mini-projects.

#### 📝 Code Implementation:
Create `src/pages/ProjectsPage.tsx`:

```tsx
// src/pages/ProjectsPage.tsx
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
      
      {/* Page Header */}
      <div className="mb-12">
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          Portfolio Archive
        </span>
        <h1 className="text-4xl font-extrabold text-white mt-1">All Projects & Systems</h1>
        <p className="text-zinc-400 mt-2 text-sm max-w-xl">
          A collection of full-stack web applications, APIs, and computer engineering experiments.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectList.map((project) => (
          <div
            key={project.title}
            className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 p-6 flex flex-col justify-between transition-all hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <FolderGit2 className="w-6 h-6 text-emerald-400" />
                <ExternalLink className="w-4 h-4 text-zinc-500 hover:text-white transition-colors cursor-pointer" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">{project.description}</p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-800/60">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-800 text-zinc-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
```

---

### Step 12: Wire Up `<Routes>` in `App.tsx`

#### 🎯 Objective:
Connect `/` to `HomePage` and `/projects` to `ProjectsPage`.

#### 📝 Code Implementation:
Update `src/App.tsx`:

```tsx
// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-300">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
```

#### 🧪 Check Your Code:
- [ ] Clicking **Projects** in the navbar navigates to `/projects` instantly without full page reload.
- [ ] Clicking **Patrick.dev** logo navigates back to `/`.

---

# ═══════════════════════════════════════
# 🔒 MODULE 5: PROTECTED ROUTE & AUTH GUARD
# ═══════════════════════════════════════

---

### Step 13: Create `ProtectedRoute.tsx`

#### 🎯 Objective:
Create an authentication guard component using `<Navigate />`.

#### 📝 Code Implementation:
Create `src/components/ProtectedRoute.tsx`:

```tsx
// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  children: React.ReactNode;
}

export function ProtectedRoute({ isLoggedIn, children }: ProtectedRouteProps) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
```

---

### Step 14: Add Login State & Secret Route

#### 🎯 Objective:
Add `isLoggedIn` state to `App.tsx`, pass it down to `Navbar`, and protect `/secret`.

#### 📝 Code Implementation:
1. Update `Navbar.tsx` props:
```tsx
interface NavbarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export function Navbar({ isLoggedIn, setIsLoggedIn }: NavbarProps) {
  // ... inside nav list, add Secret link and Login button:
  // <Link to="/secret" className="text-amber-400 font-semibold">Secret 🔒</Link>
  // <button onClick={() => setIsLoggedIn(!isLoggedIn)} className="px-3 py-1 text-xs rounded bg-emerald-600 text-white">
  //    {isLoggedIn ? 'Log out' : 'Log in'}
  // </button>
}
```

2. Add the `/secret` route to `App.tsx`:
```tsx
<Route
  path="/secret"
  element={
    <ProtectedRoute isLoggedIn={isLoggedIn}>
      <div className="py-24 text-center">
        <h1 className="text-3xl font-bold text-emerald-400">🔒 Secret Admin Console</h1>
        <p className="text-zinc-400 mt-2">Protected route unlocked via React Router guard.</p>
      </div>
    </ProtectedRoute>
  }
/>
<Route
  path="/login"
  element={
    <div className="py-24 text-center">
      <h1 className="text-2xl font-bold text-rose-400">Access Denied 🚫</h1>
      <p className="text-zinc-400 mt-2">Please click 'Log in' in the navbar to unlock this page.</p>
    </div>
  }
/>
```

#### 🧪 Final Check:
- [ ] While logged out, clicking **Secret 🔒** redirects to `/login`.
- [ ] Clicking **Log in** turns the button into **Log out**.
- [ ] Clicking **Secret 🔒** now displays the protected Secret Admin Console!
- [ ] Entire app builds cleanly with `npm run build` without any errors!
