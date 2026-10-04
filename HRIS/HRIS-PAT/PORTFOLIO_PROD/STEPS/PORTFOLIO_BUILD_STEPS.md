# 🏆 PORTFOLIO_PROD: Full Step-by-Step Curriculum (freeCodeCamp Style)

Welcome to your production portfolio build plan! This document is organized in the **freeCodeCamp step-by-step method**. 

All component snippets and styling throughout this guide use your **custom 5-color Royal Plum & Blossom Pink palette**:
* **Deep Midnight Plum (`#2D0B59`):** App backdrop / dark foundation.
* **Rich Royal Violet (`#5B2A86`):** Card backings, frosted borders, and surface panels.
* **Amethyst Lilac (`#9B6DCC`):** Secondary accents, subtle borders, and tech tags.
* **Pale Soft Mist (`#F2D7FF`):** High-contrast, crystal-clear readable typography and headings.
* **Blossom Pink (`#FFD1E8`):** Glow accents, pulsing status badges, and interactive highlights.

---

## 🗺️ Curriculum Overview

* **Module 1: The App Frame (Shell)**
  * Step 1: The Modern Glassmorphic Navbar (`src/components/Navbar.tsx`)
  * Step 2: The Minimalist Footer (`src/components/Footer.tsx`)
  * Step 3: Wiring the Shell in `App.tsx`
* **Module 2: The Hero Section (The Hook)**
  * Step 4: Pulsing Status Badge, Gradient Headline & Action Buttons (`src/components/Hero.tsx`)
* **Module 3: The Bento Grid Architecture (The Core)**
  * Step 5: Bento Card 1 — Flagship Project Spotlight (HRIS System)
  * Step 6: Bento Card 2 — Tech Stack Matrix
  * Step 7: Bento Card 3 — Interactive Developer Widget (State + Likes)
  * Step 8: Bento Card 4 — About Me & Engineering Philosophy
  * Step 9: Assemble the Bento Grid Container (`src/components/BentoGrid.tsx`)
* **Module 4: Client-Side Routing & Dedicated Pages**
  * Step 10: Create `src/pages/HomePage.tsx`
  * Step 11: Create `src/pages/ProjectsPage.tsx`
  * Step 12: Wire up `<Routes>` in `App.tsx`
* **Module 5: Protected Route & Auth Guard**
  * Step 13: Create `src/components/ProtectedRoute.tsx`
  * Step 14: Add Login State & Secret Admin Console Route

---

# ═══════════════════════════════════════
# 📦 MODULE 1: THE APP FRAME (SHELL)
# ═══════════════════════════════════════

---

### Step 1: The Modern Glassmorphic Navbar

#### 🎯 Objective:
Create a sticky header with a frosted-glass blur effect that stays pinned at the top when scrolling, displaying your branding, navigation links, and a GitHub button with Lucide icons.

#### 💡 The Concept:
* **Glassmorphism:** `bg-[#2D0B59]/70 backdrop-blur-md border-b border-[#5B2A86]/40` creates a translucent glass panel that lets background gradients show through softly.
* **Sticky Navigation:** `sticky top-0 z-50` keeps the navbar elevated above all other scrollable content.
* **Lucide Icons:** Modern crisp SVG icon components (`<Code2 />`, `<ArrowUpRight />`).

#### 📝 Code Implementation:
Create `src/components/Navbar.tsx`:

```tsx
// src/components/Navbar.tsx
import { Code2, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#5B2A86]/40 bg-[#2D0B59]/70 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-lg bg-[#5B2A86]/40 border border-[#9B6DCC]/30 text-[#FFD1E8] group-hover:bg-[#5B2A86]/60 transition-colors">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="font-bold tracking-tight text-[#F2D7FF] group-hover:text-[#FFD1E8] transition-colors">
            Patrick<span className="text-[#FFD1E8]">.dev</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#F2D7FF]/70">
          <Link to="/" className="hover:text-[#FFD1E8] transition-colors">
            About
          </Link>
          <Link to="/projects" className="hover:text-[#FFD1E8] transition-colors">
            Projects
          </Link>
          <a href="#contact" className="hover:text-[#FFD1E8] transition-colors">
            Contact
          </a>
        </nav>

        {/* Action Button: Violet to Amethyst Gradient */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold 
                       bg-gradient-to-r from-[#5B2A86] to-[#9B6DCC] text-[#F2D7FF] 
                       border border-[#9B6DCC]/40 hover:from-[#9B6DCC] hover:to-[#FFD1E8] 
                       hover:text-[#2D0B59] transition-all shadow-lg shadow-[#2D0B59]/50 cursor-pointer"
          >
            GitHub
            <ArrowUpRight className="w-3.5 h-3.5" />
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
Build a clean, non-intrusive footer displaying copyright info, tech stack credentials, and quick social links matching the purple theme.

#### 💡 The Concept:
A professional footer grounds the page without distracting from the main content. Using translucent borders (`border-t border-[#5B2A86]/30`) and soft lilac text (`text-[#F2D7FF]/60`) gives an understated, polished look.

#### 📝 Code Implementation:
Create `src/components/Footer.tsx`:

```tsx
// src/components/Footer.tsx
import { Terminal } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-[#5B2A86]/30 bg-[#2D0B59]/80 backdrop-blur-md py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F2D7FF]/60">
        
        {/* Left: Built with info */}
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#FFD1E8]" />
          <span>Designed &amp; Built by Patrick Arlan</span>
        </div>

        {/* Right: Tech Stack badge */}
        <div className="flex items-center gap-4 text-[#9B6DCC]">
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
Using `flex flex-col min-h-screen` with `flex-1` on `<main>` ensures that even on large monitors, the footer always pushes cleanly to the bottom.

#### 📝 Code Implementation:
Update `src/App.tsx`:

```tsx
// src/App.tsx
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#9B6DCC]/30 selection:text-[#FFD1E8]">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-extrabold text-[#F2D7FF]">App Frame Ready! 🚀</h1>
        <p className="text-[#9B6DCC] mt-2 text-sm">Next up: The Bento Hero section.</p>
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
* **Gradient Text:** `bg-gradient-to-r from-[#F2D7FF] via-[#9B6DCC] to-[#FFD1E8] bg-clip-text text-transparent` gives headlines a soft, glowing metallic sheen.
* **Pulsing Badge:** An active pink pulse (`animate-pulse`) signals availability.

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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#5B2A86]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 🌸 Pulsing Status Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#5B2A86]/50 text-[#FFD1E8] border border-[#9B6DCC]/40 mb-6 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-[#FFD1E8] animate-pulse"></span>
        Computer Engineering Student • Full-Stack Developer
      </div>

      {/* Headline with Custom Gradient */}
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F2D7FF] max-w-3xl leading-tight sm:leading-none mb-6">
        Building Scalable Systems &amp; <br />
        <span className="bg-gradient-to-r from-[#F2D7FF] via-[#9B6DCC] to-[#FFD1E8] bg-clip-text text-transparent">
          Modern Web Architectures.
        </span>
      </h1>

      {/* Subtext */}
      <p className="text-[#F2D7FF]/80 max-w-xl text-base sm:text-lg mb-8 leading-relaxed">
        Passionate about crafting enterprise-grade backends with ASP.NET Core &amp; PostgreSQL, coupled with performant, typed React interfaces.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold 
                     bg-gradient-to-r from-[#5B2A86] to-[#9B6DCC] text-[#F2D7FF] 
                     border border-[#9B6DCC]/40 hover:from-[#9B6DCC] hover:to-[#FFD1E8] hover:text-[#2D0B59] 
                     transition-all shadow-lg shadow-[#2D0B59]/60 cursor-pointer"
        >
          <FolderCode className="w-4 h-4" />
          View My Projects
          <ArrowRight className="w-4 h-4" />
        </Link>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold 
                     bg-[#5B2A86]/30 border border-[#9B6DCC]/40 text-[#F2D7FF] 
                     hover:bg-[#5B2A86]/60 hover:text-[#FFD1E8] transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#FFD1E8]" />
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
    <div className="relative group col-span-1 md:col-span-2 rounded-2xl bg-[#5B2A86]/25 border border-[#5B2A86]/50 hover:border-[#9B6DCC]/60 p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#2D0B59]/60">
      
      {/* Top Tag & Link */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#5B2A86]/50 text-[#FFD1E8] border border-[#9B6DCC]/40">
          Featured Enterprise System
        </span>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="text-[#9B6DCC] hover:text-[#FFD1E8] transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Title & Description */}
      <div>
        <h3 className="text-xl font-bold text-[#F2D7FF] mb-2 group-hover:text-[#FFD1E8] transition-colors">
          HRIS — Accomplishment Reporting System
        </h3>
        <p className="text-sm text-[#F2D7FF]/70 leading-relaxed mb-6">
          A production full-stack Human Resource Information System featuring JWT claim-based RBAC, pessimistic AR mutations, automated PostgreSQL migrations, and custom Shadcn UI components.
        </p>
      </div>

      {/* Feature Highlights & Tech Badges */}
      <div className="space-y-4 pt-4 border-t border-[#5B2A86]/40">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#2D0B59]/60 text-xs font-medium text-[#F2D7FF] border border-[#5B2A86]/60">
            <Layers className="w-3.5 h-3.5 text-[#FFD1E8]" /> ASP.NET Core 10
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#2D0B59]/60 text-xs font-medium text-[#F2D7FF] border border-[#5B2A86]/60">
            <Database className="w-3.5 h-3.5 text-[#9B6DCC]" /> PostgreSQL + EF Core
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#2D0B59]/60 text-xs font-medium text-[#F2D7FF] border border-[#5B2A86]/60">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FFD1E8]" /> React 19 + Shadcn UI
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
    <div className="col-span-1 rounded-2xl bg-[#5B2A86]/25 border border-[#5B2A86]/50 hover:border-[#9B6DCC]/60 p-7 flex flex-col justify-between transition-all duration-300">
      
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
            className="px-2.5 py-1 rounded-md bg-[#2D0B59]/60 border border-[#5B2A86]/60 text-xs font-medium text-[#F2D7FF]/90 hover:border-[#FFD1E8]/50 hover:text-[#FFD1E8] transition-colors"
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
    <div className="col-span-1 rounded-2xl bg-[#5B2A86]/25 border border-[#5B2A86]/50 hover:border-[#9B6DCC]/60 p-7 flex flex-col justify-between transition-all duration-300">
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[#FFD1E8] flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5" /> Live Widget
        </span>
        <span className="text-xs font-mono text-[#9B6DCC]">{time}</span>
      </div>

      <div>
        <h4 className="text-base font-bold text-[#F2D7FF] mb-1">Interactive React State</h4>
        <p className="text-xs text-[#F2D7FF]/70 mb-4">
          Demonstrates client-side state persistence and lifecycle hooks.
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#5B2A86]/40">
        <span className="text-sm font-semibold text-[#F2D7FF]">
          Likes: <span className="text-[#FFD1E8] font-bold">{likes}</span>
        </span>
        <button
          onClick={() => setLikes(likes + 1)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold 
                     bg-[#5B2A86]/50 text-[#FFD1E8] border border-[#9B6DCC]/40 
                     hover:bg-[#5B2A86]/80 hover:border-[#FFD1E8]/60 transition-all cursor-pointer"
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
    <div className="col-span-1 md:col-span-2 rounded-2xl bg-[#5B2A86]/25 border border-[#5B2A86]/50 hover:border-[#9B6DCC]/60 p-7 flex flex-col justify-between transition-all duration-300">
      
      <div className="flex items-center gap-2 mb-3 text-[#FFD1E8]">
        <GraduationCap className="w-5 h-5" />
        <h3 className="text-base font-bold text-[#F2D7FF]">About Patrick</h3>
      </div>

      <p className="text-sm text-[#F2D7FF]/80 leading-relaxed mb-4">
        As a Computer Engineering student, I bridge the gap between low-level hardware principles and high-level enterprise cloud systems. I value type-safety, clean domain-driven architecture, and accessible, responsive design.
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
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#9B6DCC]/30 selection:text-[#FFD1E8]">
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
  // inside nav list:
  // <Link to="/secret" className="text-[#FFD1E8] font-semibold">Secret 🔒</Link>
  // <button onClick={() => setIsLoggedIn(!isLoggedIn)} className="px-3 py-1 text-xs rounded bg-[#5B2A86] border border-[#9B6DCC]/40 text-[#F2D7FF] hover:bg-[#9B6DCC] hover:text-[#2D0B59] transition-all">
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
        <h1 className="text-3xl font-bold text-[#FFD1E8]">🔒 Secret Admin Console</h1>
        <p className="text-[#F2D7FF]/70 mt-2">Protected route unlocked via React Router guard.</p>
      </div>
    </ProtectedRoute>
  }
/>
<Route
  path="/login"
  element={
    <div className="py-24 text-center">
      <h1 className="text-2xl font-bold text-rose-400">Access Denied 🚫</h1>
      <p className="text-[#F2D7FF]/70 mt-2">Please click 'Log in' in the navbar to unlock this page.</p>
    </div>
  }
/>
```

#### 🧪 Final Check:
- [ ] While logged out, clicking **Secret 🔒** redirects to `/login`.
- [ ] Clicking **Log in** turns the button into **Log out**.
- [ ] Clicking **Secret 🔒** now displays the protected Secret Admin Console!
- [ ] Entire app builds cleanly with `npm run build` without any errors!
