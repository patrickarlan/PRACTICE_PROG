# 🏆 PORTFOLIO_BUILD_STEPS_POLISH: Hands-on Polish Curriculum (freeCodeCamp Style)

Welcome to your production portfolio polish guide! This document follows the **freeCodeCamp 4-part structure**:
1. **🎯 Objective:** What you are building.
2. **💡 The Concept:** Why we build it this way.
3. **📝 The Task & Code:** The clean, copy-paste-ready TypeScript/React code.
4. **🧪 Check Your Code:** The verification checklist in your browser.

All components throughout this guide use your **5 Semantic Design Tokens**:
* **`brand-bg` (`#2D0B59`):** App backdrop / dark foundation
* **`brand-surface` (`#5B2A86`):** Card panels, frosted borders, and button backings
* **`brand-muted` (`#9B6DCC`):** Secondary text, subtle tags, and borders
* **`brand-text` (`#F2D7FF`):** Headings & primary readable text
* **`brand-accent` (`#FFD1E8`):** Glow badges, pulsing dots, and primary CTA accents

> [!TIP]
> **Why Semantic Tokens?** You never have to manually edit hex codes again! If you ever want to change your portfolio's theme in the future, you change just **5 lines in `src/index.css`**, and your entire portfolio updates everywhere instantly.

---

## 🗺️ Polish Curriculum Overview

* **Module P1: Foundation & Quick Wins**
  * Step 1: Semantic Tokens & Smooth Scrolling (`index.html` & `src/index.css`)
  * Step 2: The Polished Semantic Footer (`src/components/Footer.tsx`)
* **Module P2: Navigation & Action Components**
  * Step 3: Reusable Social Links Component (`src/components/SocialLinks.tsx`)
  * Step 4: The 4-Section Sticky Navbar (`src/components/Navbar.tsx`)
* **Module P3: Scroll Sections & Interactivity**
  * Step 5: Smooth Reveal-on-Scroll Hook (`src/hooks/useInView.ts`)
  * Step 6: Tech Logo Marquee Carousel (`src/components/TechCarousel.tsx`)
  * Step 7: Projects Showcase Section (`src/components/ProjectsSection.tsx`)
  * Step 8: Skills, Education & Experience Section (`src/components/SkillsSection.tsx`)
  * Step 8b: The Dedicated Contact Section (`src/components/ContactSection.tsx`)
* **Module P4: Assembling the Scroll Story**
  * Step 9: Assemble the 4 Scrollable Sections in `src/pages/HomePage.tsx`
  * Step 10: Wire Clean Production Shell in `src/App.tsx`

---

# ═══════════════════════════════════════
# 📦 MODULE P1: FOUNDATION & QUICK WINS
# ═══════════════════════════════════════

---

### Step 1: Semantic Tokens & Smooth Scrolling

#### 🎯 Objective:
Register the 5 semantic color tokens inside `@theme` in `src/index.css`, enable smooth scrolling, and set your professional browser tab title.

#### 💡 The Concept:
Using `@theme { --color-brand-*: ...; }` tells Tailwind CSS v4 to generate utility classes like `bg-brand-bg`, `text-brand-text`, `border-brand-surface/40`, etc.

#### 📝 Code Implementation:
1. Open `index.html` in the root of `PORTFOLIO_PROD` and update `<title>`:
```html
<title>Patrick Arlan | Computer Engineering & Full-Stack Developer</title>
```

2. Open `src/index.css` and configure your design tokens:
```css
@import "tailwindcss";

@theme {
  --color-brand-bg: #2D0B59;        /* Main background */
  --color-brand-surface: #5B2A86;   /* Cards, borders & surfaces */
  --color-brand-muted: #9B6DCC;     /* Secondary text & badges */
  --color-brand-text: #F2D7FF;      /* Main headings & body text */
  --color-brand-accent: #FFD1E8;    /* Glowing dots & buttons */
}

html {
  scroll-behavior: smooth;
}

@layer base {
  body {
    background-color: var(--color-brand-bg);
    background-image: radial-gradient(ellipse at 50% -10%, var(--color-brand-surface) 0%, var(--color-brand-bg) 70%, #1a0533 100%);
    background-attachment: fixed;
    color: var(--color-brand-text);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    min-height: 100vh;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
```

#### 🧪 Check Your Code:
- [ ] Browser tab displays "Patrick Arlan | Computer Engineering & Full-Stack Developer".
- [ ] Background radial glow renders smoothly with no editor warnings.

---

### Step 2: The Polished Semantic Footer

#### 🎯 Objective:
Create a frosted semantic footer featuring your credentials, copyright, resume download, and a beta chat button.

#### 💡 The Concept:
A good footer gives recruiters quick access to your resume and contact info even after they finish scrolling through your entire portfolio.

#### 📝 Code Implementation:
Update `src/components/Footer.tsx`:

```tsx
// src/components/Footer.tsx
import { Terminal, Download, MessageSquare } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-brand-surface/40 bg-brand-bg/80 backdrop-blur-md py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-brand-text/70">
        
        {/* 1. Left: Built with info */}
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-brand-accent" />
          <span>Designed &amp; Built by <strong className="text-brand-text">Patrick Arlan</strong></span>
        </div>

        {/* 2. Center: Action Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="/Patrick_Arlan_Resume.pdf"
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-surface/40 border border-brand-muted/30 hover:border-brand-accent/50 hover:text-brand-accent transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Resume
          </a>

          <button
            onClick={() => alert("Homelab Live Chat is currently in development! Feel free to reach out via email.")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-surface/40 border border-brand-muted/30 hover:border-brand-accent/50 hover:text-brand-accent transition-all cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Chat (Beta)
          </button>
        </div>

        {/* 3. Right: Tech stack & copyright */}
        <div className="flex items-center gap-3 text-brand-muted">
          <span>React 19 • Tailwind CSS • ASP.NET Core</span>
          <span>© {new Date().getFullYear()}</span>
        </div>

      </div>
    </footer>
  );
}
```

#### 🧪 Check Your Code:
- [ ] The footer uses clean semantic classes (`border-brand-surface/40`, `text-brand-text`, etc.).
- [ ] Clicking "Resume" triggers a download.
- [ ] Clicking "Chat (Beta)" displays the alert.

---

# ═══════════════════════════════════════
# 🧭 MODULE P2: NAVIGATION & ACTIONS
# ═══════════════════════════════════════

---

### Step 3: Reusable Social Links Component

#### 🎯 Objective:
Create a reusable social icon bar supporting **GitHub, LinkedIn, Facebook, and Instagram** with `rel="noreferrer noopener"` security.

#### 💡 The Concept:
Building this as a standalone component lets you use it in the Navbar, Hero, Contact Section, and Footer without duplicating code.

#### 📝 Code Implementation:
Create `src/components/SocialLinks.tsx`:

```tsx
// src/components/SocialLinks.tsx
import { Github, Linkedin, Facebook, Instagram } from 'lucide-react';

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className = '' }: SocialLinksProps) {
  const socials = [
    { name: 'GitHub', href: 'https://github.com', icon: Github },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
    { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
    { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {socials.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={social.name}
            className="p-2 rounded-lg bg-brand-surface/30 border border-brand-muted/30 text-brand-text/80 
                       hover:text-brand-accent hover:border-brand-accent/50 hover:bg-brand-surface/60 
                       transition-all shadow-sm"
          >
            <Icon className="w-4 h-4" />
          </a>
        );
      })}
    </div>
  );
}
```

#### 🧪 Check Your Code:
- [ ] File created at `src/components/SocialLinks.tsx`.
- [ ] Icons have `rel="noreferrer noopener"` and `aria-label`.

---

### Step 4: The 4-Section Sticky Navbar

#### 🎯 Objective:
Update `src/components/Navbar.tsx` to feature:
1. Links pointing to your **4 scrollable sections**: `Home` (`#home`), `Projects` (`#projects`), `Skills` (`#skills`), and `Contact` (`#contact`).
2. Social links.
3. "Download Resume" button.
4. "Chat" button.

#### 📝 Code Implementation:
Update `src/components/Navbar.tsx`:

```tsx
// src/components/Navbar.tsx
import { Code2, Download, MessageSquare } from 'lucide-react';
import { SocialLinks } from './SocialLinks';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-surface/40 bg-brand-bg/75 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-lg bg-brand-surface/40 border border-brand-muted/30 text-brand-accent group-hover:bg-brand-surface/60 transition-colors">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="font-bold tracking-tight text-brand-text group-hover:text-brand-accent transition-colors">
            Patrick<span className="text-brand-accent">.dev</span>
          </span>
        </a>

        {/* 4 Core Section Anchors */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-text/70">
          <a href="#home" className="hover:text-brand-accent transition-colors">
            Home
          </a>
          <a href="#projects" className="hover:text-brand-accent transition-colors">
            Projects
          </a>
          <a href="#skills" className="hover:text-brand-accent transition-colors">
            Skills
          </a>
          <a href="#contact" className="hover:text-brand-accent transition-colors">
            Contact
          </a>
        </nav>

        {/* Header Actions: Socials + Resume + Chat */}
        <div className="flex items-center gap-3">
          <SocialLinks className="hidden lg:flex" />

          <a
            href="/Patrick_Arlan_Resume.pdf"
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold 
                       bg-gradient-to-r from-brand-surface to-brand-muted text-brand-text 
                       border border-brand-muted/40 hover:from-brand-muted hover:to-brand-accent 
                       hover:text-brand-bg transition-all shadow-md shadow-brand-bg/60 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Resume
          </a>

          <button
            onClick={() => alert("Homelab Live Chat is currently in development! Feel free to reach out via email.")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold 
                       bg-brand-surface/30 border border-brand-muted/30 text-brand-text 
                       hover:bg-brand-surface/60 hover:text-brand-accent transition-all cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-brand-accent" />
            Chat
          </button>
        </div>

      </div>
    </header>
  );
}
```

#### 🧪 Check Your Code:
- [ ] Navbar displays `Home`, `Projects`, `Skills`, and `Contact`.
- [ ] Social icons appear on desktop.
- [ ] "Resume" and "Chat" buttons are visible in the header.

---

# ═══════════════════════════════════════
# 🎬 MODULE P3: SCROLL SECTIONS & ANIMATIONS
# ═══════════════════════════════════════

---

### Step 5: Smooth Reveal-on-Scroll Hook

#### 🎯 Objective:
Create a reusable React hook `useInView` that uses the browser's native `IntersectionObserver` to trigger smooth fade-in animations as the visitor scrolls down.

#### 📝 Code Implementation:
Create `src/hooks/useInView.ts`:

```tsx
// src/hooks/useInView.ts
import { useState, useEffect, useRef } from 'react';

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Unobserve once revealed so it doesn't flicker on scroll up
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  return { ref, isVisible };
}
```

#### 🧪 Check Your Code:
- [ ] File created at `src/hooks/useInView.ts` with no TypeScript compiler errors.

---

### Step 6: Tech Logo Marquee Carousel

#### 🎯 Objective:
Build an animated horizontal carousel displaying tech logos that continuously glides and pauses on hover.

#### 📝 Code Implementation:
Create `src/components/TechCarousel.tsx`:

```tsx
// src/components/TechCarousel.tsx
const techList = [
  'C# / .NET 10',
  'ASP.NET Core',
  'PostgreSQL',
  'Entity Framework',
  'React 19',
  'TypeScript',
  'Tailwind CSS v4',
  'Docker',
  'C++',
  'REST APIs',
  'Git / GitHub',
  'Linux / Ubuntu',
];

export function TechCarousel() {
  // Duplicate list so the loop is seamless
  const duplicatedTech = [...techList, ...techList];

  return (
    <div className="w-full overflow-hidden py-6 relative">
      {/* Edge gradient masks for smooth fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-brand-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-brand-bg to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
        {duplicatedTech.map((tech, idx) => (
          <span
            key={idx}
            className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold 
                       bg-brand-surface/25 border border-brand-surface/50 text-brand-text/90 
                       hover:border-brand-accent/50 hover:text-brand-accent transition-all shadow-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
```

Add the marquee animation keyframes to `src/index.css`:
```css
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  display: flex;
  width: max-content;
  animation: marquee 25s linear infinite;
}
```

#### 🧪 Check Your Code:
- [ ] Badges scroll seamlessly across the screen.
- [ ] Hovering the carousel pauses the motion.

---

### Step 7: Projects Showcase Section

#### 🎯 Objective:
Create a dedicated `#projects` section displaying your **Top 3 Featured Projects** with screenshots/highlights and a "View All Projects Archive" button.

#### 📝 Code Implementation:
Create `src/components/ProjectsSection.tsx`:

```tsx
// src/components/ProjectsSection.tsx
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';

export function ProjectsSection() {
  const { ref, isVisible } = useInView(0.1);

  const featuredProjects = [
    {
      title: 'HRIS — Accomplishment Reporting System',
      description: 'Production enterprise system featuring JWT claim-based RBAC, pessimistic AR mutations, automated PostgreSQL migrations, and custom Shadcn UI components.',
      tags: ['C# ASP.NET Core 10', 'PostgreSQL', 'React 19', 'Docker'],
      link: 'https://github.com',
      highlight: 'Flagship Enterprise System',
    },
    {
      title: 'Production Developer Portfolio',
      description: 'High-performance portfolio built with Vite 6, React 19, TypeScript, and Tailwind CSS v4 featuring Bento Grid architecture and custom animations.',
      tags: ['React 19', 'TypeScript', 'Tailwind CSS v4'],
      link: 'https://github.com',
      highlight: 'Modern Web Architecture',
    },
    {
      title: 'Microcontroller Telemetry Monitor',
      description: 'Hardware telemetry tracker interfacing with sensor modules, real-time logging, and low-level C++ embedded programming.',
      tags: ['C++', 'Embedded Systems', 'IoT', 'Hardware'],
      link: 'https://github.com',
      highlight: 'Computer Engineering Capstone',
    },
  ];

  return (
    <section id="projects" className="w-full max-w-6xl mx-auto px-6 py-20 scroll-mt-20">
      <div
        ref={ref}
        className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold text-brand-accent uppercase tracking-wider">
              Featured Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text mt-1">
              Projects &amp; Systems
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent hover:text-brand-text transition-colors mt-4 md:mt-0"
          >
            View All Projects Archive <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.title}
              className="rounded-2xl bg-brand-surface/25 border border-brand-surface/50 hover:border-brand-muted/60 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-bg/60"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-brand-surface/50 text-brand-accent border border-brand-muted/40">
                    {project.highlight}
                  </span>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-brand-muted hover:text-brand-accent transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <h3 className="text-lg font-bold text-brand-text mb-2">{project.title}</h3>
                <p className="text-xs text-brand-text/70 leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-brand-surface/40">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[11px] font-medium bg-brand-bg/60 border border-brand-surface/50 text-brand-text/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

#### 🧪 Check Your Code:
- [ ] Section has `id="projects"` and `scroll-mt-20`.
- [ ] Cards display badges and hover effects.

---

### Step 8: Skills, Education & Experience Section

#### 🎯 Objective:
Create the `#skills` section featuring:
1. The **Tech Logo Marquee Carousel**.
2. Categorized Skill Badges (Backend, Frontend, Database, DevOps).
3. An **Education & Journey Timeline** tailored for a fresh Computer Engineering graduate.

#### 📝 Code Implementation:
Create `src/components/SkillsSection.tsx`:

```tsx
// src/components/SkillsSection.tsx
import { GraduationCap, Award } from 'lucide-react';
import { TechCarousel } from './TechCarousel';
import { useInView } from '../hooks/useInView';

export function SkillsSection() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section id="skills" className="w-full max-w-6xl mx-auto px-6 py-20 scroll-mt-20">
      <div
        ref={ref}
        className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-brand-accent uppercase tracking-wider">
            Technical Stack &amp; Background
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text mt-1">
            Skills &amp; Education
          </h2>
        </div>

        {/* 🎠 Logo Marquee */}
        <TechCarousel />

        {/* Education & Experience Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* Education Card */}
          <div className="rounded-2xl bg-brand-surface/25 border border-brand-surface/50 p-7">
            <div className="flex items-center gap-2 mb-4 text-brand-accent">
              <GraduationCap className="w-5 h-5" />
              <h3 className="text-lg font-bold text-brand-text">Education</h3>
            </div>
            <div className="border-l-2 border-brand-muted/40 pl-4 space-y-4">
              <div>
                <span className="text-xs text-brand-accent font-semibold">2022 — Present</span>
                <h4 className="text-base font-bold text-brand-text">Bachelor of Science in Computer Engineering</h4>
                <p className="text-xs text-brand-text/70 mt-1">
                  Focus on software architectures, digital logic, embedded systems, and enterprise web solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Certifications & Learning */}
          <div className="rounded-2xl bg-brand-surface/25 border border-brand-surface/50 p-7">
            <div className="flex items-center gap-2 mb-4 text-brand-accent">
              <Award className="w-5 h-5" />
              <h3 className="text-lg font-bold text-brand-text">Certifications &amp; Focus</h3>
            </div>
            <div className="border-l-2 border-brand-muted/40 pl-4 space-y-4">
              <div>
                <span className="text-xs text-brand-accent font-semibold">In Progress</span>
                <h4 className="text-base font-bold text-brand-text">freeCodeCamp Front End Development Libraries</h4>
                <p className="text-xs text-brand-text/70 mt-1">
                  Hands-on mastery of modern React component patterns, state orchestration, and responsive design.
                </p>
              </div>
              <div>
                <span className="text-xs text-brand-muted font-semibold">Self-Driven Mastery</span>
                <h4 className="text-base font-bold text-brand-text">Full-Stack C# ASP.NET Core &amp; PostgreSQL</h4>
                <p className="text-xs text-brand-text/70 mt-1">
                  REST APIs, JWT authentication, EF Core migrations, and containerized Docker environments.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
```

#### 🧪 Check Your Code:
- [ ] Section has `id="skills"` and `scroll-mt-20`.
- [ ] Logo carousel and Education cards are displayed cleanly.

---

### Step 8b: The Dedicated Contact Section

#### 🎯 Objective:
Create the `#contact` section featuring a high-impact call to action, single-click "Copy Email" card with feedback toast, direct social links, and your location.

#### 💡 The Concept:
A frictionless contact section lets recruiters email you in one click or connect on LinkedIn immediately after viewing your work.

#### 📝 Code Implementation:
Create `src/components/ContactSection.tsx`:

```tsx
// src/components/ContactSection.tsx
import { useState } from 'react';
import { Mail, Check, Copy, MapPin, Send } from 'lucide-react';
import { SocialLinks } from './SocialLinks';
import { useInView } from '../hooks/useInView';

export function ContactSection() {
  const { ref, isVisible } = useInView(0.1);
  const [copied, setCopied] = useState(false);
  const email = 'patrick.arlan.dev@gmail.com'; // replace with your real email

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="w-full max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
      <div
        ref={ref}
        className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="rounded-3xl bg-gradient-to-b from-brand-surface/30 to-brand-bg/60 border border-brand-surface/50 p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-brand-surface/50 text-brand-accent border border-brand-muted/40 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            Open to Full-Stack, Backend &amp; Junior Roles
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-text tracking-tight mb-4">
            Let's Build Something Together.
          </h2>

          <p className="text-sm sm:text-base text-brand-text/80 max-w-xl mx-auto mb-10 leading-relaxed">
            Whether you have an internship opportunity, a project to collaborate on, or just want to discuss C#, React, or homelab architecture — my inbox is always open!
          </p>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            {/* Copy Email Button */}
            <button
              onClick={handleCopy}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold 
                         bg-gradient-to-r from-brand-surface to-brand-muted text-brand-text 
                         border border-brand-muted/40 hover:from-brand-muted hover:to-brand-accent hover:text-brand-bg 
                         transition-all shadow-lg shadow-brand-bg/60 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>{email}</span>
              {copied ? (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-300 font-bold ml-2">
                  <Check className="w-3.5 h-3.5" /> Copied!
                </span>
              ) : (
                <Copy className="w-3.5 h-3.5 text-brand-text/60 ml-2" />
              )}
            </button>

            {/* Direct Mailto */}
            <a
              href={`mailto:${email}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold 
                         bg-brand-bg/60 border border-brand-surface/60 text-brand-text 
                         hover:border-brand-accent/50 hover:text-brand-accent transition-all"
            >
              <Send className="w-4 h-4" />
              Send Direct Email
            </a>
          </div>

          {/* Socials & Location */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 border-t border-brand-surface/40 text-xs text-brand-text/70">
            <SocialLinks />
            <span className="hidden sm:inline">•</span>
            <div className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-accent" />
              <span>Philippines 🇵🇭 • Open to Remote &amp; Relocation</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
```

#### 🧪 Check Your Code:
- [ ] Section has `id="contact"` and `scroll-mt-20`.
- [ ] Clicking the email button copies to clipboard and displays "Copied!".

---

# ═══════════════════════════════════════
# 🚀 MODULE P4: THE FULL SCROLL STORY
# ═══════════════════════════════════════

---

### Step 9: Assemble the 4-Section Story in `src/pages/HomePage.tsx`

#### 🎯 Objective:
Combine:
1. `#home` &rarr; `<Hero />` + `<BentoGrid />`
2. `#projects` &rarr; `<ProjectsSection />`
3. `#skills` &rarr; `<SkillsSection />`
4. `#contact` &rarr; `<ContactSection />`

#### 📝 Code Implementation:
Update `src/pages/HomePage.tsx`:

```tsx
// src/pages/HomePage.tsx
import { Hero } from '../components/Hero';
import { BentoGrid } from '../components/BentoGrid';
import { ProjectsSection } from '../components/ProjectsSection';
import { SkillsSection } from '../components/SkillsSection';
import { ContactSection } from '../components/ContactSection';

export function HomePage() {
  return (
    <>
      {/* 1. Home Section: Hero + Bento Grid */}
      <section id="home" className="scroll-mt-20">
        <Hero />
        <BentoGrid />
      </section>

      {/* 2. Projects Showcase */}
      <ProjectsSection />

      {/* 3. Skills, Carousel & Education */}
      <SkillsSection />

      {/* 4. Contact & Socials Section */}
      <ContactSection />
    </>
  );
}
```

---

### Step 10: Wire Clean Production Shell in `src/App.tsx`

#### 🎯 Objective:
Ensure `App.tsx` renders the Navbar, `<Routes>`, and Footer seamlessly with semantic selection highlights.

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
    <div className="min-h-screen flex flex-col justify-between selection:bg-brand-muted/30 selection:text-brand-accent">
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

#### 🧪 Final Check:
- [ ] Open `http://localhost:5173`.
- [ ] Clicking **Home**, **Projects**, **Skills**, or **Contact** in the navbar smoothly scrolls to each section.
- [ ] As you scroll down, sections smoothly fade and slide in.
- [ ] Tech logos continuously scroll in the marquee carousel.
- [ ] Clicking **"View All Projects Archive"** navigates to `/projects`.
- [ ] Run `npm run build` — builds cleanly with zero errors!
