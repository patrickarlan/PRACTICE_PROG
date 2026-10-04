# 📋 PORTFOLIO_PROD: Tasks & Objectives Roadmap

Welcome to your production portfolio milestone tracker. Use this document as your quick checklist and guide. For detailed, freeCodeCamp-style explanations, code snippets, and tests for each step, refer to [PORTFOLIO_BUILD_STEPS.md](file:///c:/Users/HP/Documents/PRACTICE_PROG/HRIS/HRIS-PAT/PORTFOLIO_PROD/STEPS/PORTFOLIO_BUILD_STEPS.md).

---

## 🧭 High-Level Milestone Tracker

| Step | Component / File | Core Objective | Status |
| :--- | :--- | :--- | :---: |
| **01** | `src/components/Navbar.tsx` | Glassmorphic sticky header with branding, nav links, and Lucide icons | `[ ]` |
| **02** | `src/components/Footer.tsx` | Sleek minimal dark footer with dynamic year, social links, and status | `[ ]` |
| **03** | `src/App.tsx` | Integrate shell frame (Navbar + Content Area + Footer) | `[ ]` |
| **04** | `src/components/Hero.tsx` | High-impact hero section with pulsing status badge and gradient typography | `[ ]` |
| **05** | `src/data/projectsData.ts` | Strong TypeScript data models for HRIS, API, and full-stack projects | `[ ]` |
| **06** | `src/components/BentoGrid.tsx` | 3-column Bento container mimicking Vercel / Linear design systems | `[ ]` |
| **07** | `src/components/FeaturedProjectCard.tsx` | Col-span-2 spotlight card featuring your C# ASP.NET + React HRIS | `[ ]` |
| **08** | `src/components/TechStackCard.tsx` | Categorized tech matrix (Frontend, Backend, Database, Cloud) with badges | `[ ]` |
| **09** | `src/components/InteractiveWidgetCard.tsx` | Live interactive card with `useState` likes and GitHub uptime simulator | `[ ]` |
| **10** | `src/components/AboutCard.tsx` | Engineering bio card highlighting architecture, clean code, and CS focus | `[ ]` |
| **11** | `src/pages/HomePage.tsx` | Assemble Hero + Bento Grid into a clean home route | `[ ]` |
| **12** | `src/pages/ProjectsPage.tsx` | Dedicated portfolio archive page with category filtering | `[ ]` |
| **13** | `src/components/ProtectedRoute.tsx` | Reusable React Router auth guard simulating role/login protection | `[ ]` |
| **14** | `src/App.tsx` (Final Routing) | Multi-page routing (`/`, `/projects`, `/secret`, `/login`) + auth toggle | `[ ]` |

---

## 📦 Module 1: The App Frame (Shell)

### 📌 Step 1: The Modern Glassmorphic Navbar
* **File:** `src/components/Navbar.tsx`
* **Objective:** Build a fixed/sticky navigation header featuring a frosted glass blur backdrop (`backdrop-blur-md`), your logo/initials with a Lucide icon (`Code2`), navigation links (`Home`, `Projects`), and a primary GitHub action button (`ArrowUpRight`).
* **Key Concept:** Translucent layering in Tailwind v4 (`bg-zinc-950/75`), sticky positioning (`sticky top-0 z-50`), and SVG icon components.

### 📌 Step 2: The Minimalist Footer
* **File:** `src/components/Footer.tsx`
* **Objective:** Build an understated dark footer displaying dynamic copyright year (`new Date().getFullYear()`), live tech stack badges (React 19 + Tailwind v4 + ASP.NET Core), and social profile links.
* **Key Concept:** Dynamic JavaScript expressions in JSX and subtle border dividers (`border-t border-zinc-800/60`).

### 📌 Step 3: Shell Integration
* **File:** `src/App.tsx`
* **Objective:** Wire `<Navbar />` and `<Footer />` together using a sticky footer flex column layout (`min-h-screen flex flex-col justify-between`) so the page content expands smoothly.
* **Key Concept:** CSS Flexbox layout structure for full-height web applications.

---

## 🚀 Module 2: The Hero Section (The Hook)

### 📌 Step 4: Pulsing Status Badge & Gradient Headline
* **File:** `src/components/Hero.tsx`
* **Objective:** Create an attention-grabbing hero header with an animated pulsing status badge (`Available for Hire / Full-Stack C# & React`), a high-contrast gradient title, an impactful subheading, and direct CTA buttons (e.g., "Explore Projects" & "Download Resume").
* **Key Concept:** Tailwind CSS animations (`animate-pulse`), gradient text clipping (`bg-clip-text text-transparent bg-gradient-to-r`), and responsive typography (`text-4xl sm:text-6xl`).

---

## 🍱 Module 3: Bento Grid Architecture (The Core Showcase)

### 📌 Step 5: Data Models & Static Repository
* **File:** `src/data/projectsData.ts`
* **Objective:** Define strict TypeScript interfaces (`Project`, `TechCategory`) and seed realistic project data centered around your ASP.NET Core + PostgreSQL HRIS project and upcoming tools.
* **Key Concept:** TypeScript type safety, decoupling data from presentation components.

### 📌 Step 6: Bento Grid Container Layout
* **File:** `src/components/BentoGrid.tsx`
* **Objective:** Create the parent grid wrapper using a responsive 3-column CSS Grid (`grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto`).
* **Key Concept:** CSS Grid responsive column definitions and gap spacing.

### 📌 Step 7: Bento Card 1 — Flagship Project Spotlight (HRIS)
* **File:** `src/components/FeaturedProjectCard.tsx`
* **Objective:** Build an asymmetric 2-column wide card (`md:col-span-2`) spotlighting your real Human Resource Information System with tech pills (`ASP.NET Core`, `PostgreSQL`, `React 19`, `Docker`), architectural highlights, and live demo/repo links.
* **Key Concept:** Grid column spanning (`col-span-2`), hover elevation (`hover:border-zinc-700 transition duration-300`), and semantic tags.

### 📌 Step 8: Bento Card 2 — Tech Stack Matrix
* **File:** `src/components/TechStackCard.tsx`
* **Objective:** Build a 1-column card (`md:col-span-1`) neatly organizing your engineering toolkit into categorized chips (Frontend, Backend, Database & Cloud).
* **Key Concept:** Mapping nested arrays in React and styling compact badge badges with color accents.

### 📌 Step 9: Bento Card 3 — Interactive Developer Widget
* **File:** `src/components/InteractiveWidgetCard.tsx`
* **Objective:** Build a card featuring live interactive React state: an interactive "Endorse / Like" button with counter and a simulated system health/uptime indicator.
* **Key Concept:** `useState` hook, event handling (`onClick`), and interactive micro-animations.

### 📌 Step 10: Bento Card 4 — About & Engineering Philosophy
* **File:** `src/components/AboutCard.tsx`
* **Objective:** Build a card summarizing your engineering background, computer science fundamentals, and commitment to clean code and scalable architecture.
* **Key Concept:** Polished typography styling and visual balance within the Bento Grid.

---

## 🗺️ Module 4: Client-Side Routing & Dedicated Pages

### 📌 Step 11: Create Home Page
* **File:** `src/pages/HomePage.tsx`
* **Objective:** Encapsulate the Hero and Bento Grid into a dedicated page component to prepare for multi-page client-side navigation.
* **Key Concept:** Page-level component composition.

### 📌 Step 12: Create Dedicated Projects Archive Page
* **File:** `src/pages/ProjectsPage.tsx`
* **Objective:** Build a full-page catalog listing all projects with active category filtering pills (e.g., `All`, `Full-Stack`, `Backend`, `Frontend`) using React state.
* **Key Concept:** Client-side array filtering (`projects.filter(...)`) tied to selected tab state.

---

## 🛡️ Module 5: Auth Guard & Protected Routes

### 📌 Step 13: Create Protected Route Guard
* **File:** `src/components/ProtectedRoute.tsx`
* **Objective:** Create a higher-order wrapper component that checks an authentication condition (`isLoggedIn`); if false, it redirects to `/login` using React Router's `<Navigate to="..." replace />`.
* **Key Concept:** Client-side route protection, conditionally rendering `children` vs. `<Navigate />`.

### 📌 Step 14: Wire Client Routing & Auth Toggle
* **File:** `src/App.tsx`
* **Objective:** Wire up `<Routes>` with `<Route path="/" element={<HomePage />} />`, `<Route path="/projects" element={<ProjectsPage />} />`, and a protected `<Route path="/secret" />`. Add a login toggle button in the Navbar to test state transitions live in the browser.
* **Key Concept:** React Router v6+ declarative routing, URL synchronization without page reload, and lifting state up.

---

## 💡 How We Will Work Together

1. **You write the code:** Open [PORTFOLIO_BUILD_STEPS.md](file:///c:/Users/HP/Documents/PRACTICE_PROG/HRIS/HRIS-PAT/PORTFOLIO_PROD/STEPS/PORTFOLIO_BUILD_STEPS.md) for the exact code and step-by-step guidance.
2. **Follow the freeCodeCamp Flow:** For each step, read the **Objective**, understand the **Concept**, write the **Code**, and check the **Verification** items.
3. **Ask questions anytime:** If you get an error, want to understand *why* a Tailwind class was used, or want to customize a card's content, ask right here!
