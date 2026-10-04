# 🚀 PORTFOLIO_PROD: Clean Initialization & Setup Guide

Welcome to the build of your **Production Portfolio (`PORTFOLIO_PROD`)**! 

This guide gives you the exact, step-by-step instructions to initialize a fresh, professional React 19 + TypeScript + Tailwind CSS project from scratch. You will run these commands yourself in your terminal so you own the setup.

---

## 📋 The Setup Plan

```
PORTFOLIO_PROD/
  ├── src/
  │    ├── components/    <-- Reusable UI elements (Navbar, Footer, BentoCard...)
  │    ├── pages/         <-- Route views (HomePage, ProjectsPage...)
  │    ├── hooks/         <-- Custom state & data hooks (useProjects...)
  │    ├── data/          <-- Static project info & portfolio constants
  │    ├── types/         <-- TypeScript interfaces
  │    ├── App.tsx        <-- Main routing shell
  │    ├── main.tsx       <-- BrowserRouter root entry
  │    └── index.css      <-- Tailwind CSS imports
  ├── vite.config.ts      <-- Vite + Tailwind v4 plugin configuration
  └── package.json        <-- Dependencies
```

---

## Step 1: Open Terminal in `PORTFOLIO_PROD`

Open PowerShell or your terminal inside the `PORTFOLIO_PROD` folder:

```powershell
cd c:\Users\HP\Documents\PRACTICE_PROG\HRIS\HRIS-PAT\PORTFOLIO_PROD
```

Confirm that the folder is empty:
```powershell
Get-ChildItem
```
*(It should return nothing).*

---

## Step 2: Initialize Vite with React & TypeScript

Run the standard Vite creator command directly inside the current folder (`.`):

```powershell
npm create vite@latest . -- --template react-ts
```

> **What this does:** Generates a clean, modern Vite project pre-configured for React and TypeScript inside `PORTFOLIO_PROD`.

Once generated, install the default base packages:
```powershell
npm install
```

---

## Step 3: Install Required Production Dependencies

We need:
1. **`react-router-dom`**: For client-side routing and protected routes.
2. **`@tailwindcss/vite`** and **`tailwindcss`**: Tailwind CSS v4.
3. **`lucide-react`**: Beautiful, modern SVG icons used across industry portfolios (GitHub, ExternalLink, Code, Terminal, etc.).

Run this single command:

```powershell
npm install react-router-dom lucide-react @tailwindcss/vite tailwindcss
```

---

## Step 4: Configure Tailwind CSS v4 in `vite.config.ts`

Open `vite.config.ts` in your editor. Add `@tailwindcss/vite` as a plugin:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

---

## Step 5: Clean Up Default Vite Boilerplate

Vite ships with demo styles and SVG files that we don't need and will only cause layout bugs if left behind.

1. **Delete `src/App.css`** (We will use pure Tailwind utility classes).
2. **Delete `src/assets/react.svg`** and `public/vite.svg`.
3. Open **`src/index.css`**, delete everything inside it, and replace it with this clean, modern dark-theme baseline:

```css
@import "tailwindcss";

@layer base {
  body {
    background-color: #09090b; /* zinc-950 */
    color: #f4f4f5;            /* zinc-100 */
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    min-height: 100vh;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
```

> **Why this matters:** In the sandbox portfolio, Vite's default CSS had `#root { max-width: 1126px; text-align: center; }` which forced everything to be centered and broke wide layouts. This clean baseline gives you 100% control!

---

## Step 6: Create Your Clean Folder Structure

Inside `PORTFOLIO_PROD/src/`, create the 5 standard production folders:

```powershell
mkdir src\components
mkdir src\pages
mkdir src\hooks
mkdir src\types
mkdir src\data
```

---

## Step 7: Clean `App.tsx` & Wrap `main.tsx` in `BrowserRouter`

### 1. Update `src/main.tsx`
Ensure `BrowserRouter` wraps `<App />` right from the start:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

### 2. Reset `src/App.tsx` to a Clean Canvas
Replace `src/App.tsx` with this clean test placeholder:

```tsx
export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        PORTFOLIO_PROD Online
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
        Patrick's Production Portfolio
      </h1>
      <p className="text-zinc-400 max-w-md text-center text-sm">
        Vite 6 + React 19 + TypeScript + Tailwind CSS v4 setup is clean and ready for Bento Grid architecture.
      </p>
    </div>
  )
}
```

---

## Step 8: The Smoke Test 🚀

Start the development server:

```powershell
npm run dev
```

Open the local URL shown in your terminal (e.g. `http://localhost:5173`).

### What you should see:
* A deep dark background (`#09090b`).
* A glowing green pulsing badge saying **"PORTFOLIO_PROD Online"**.
* Crisp white typography with zero centering bugs or weird borders.

---

## 🎯 Next Step:
Once your server boots with the green badge, let me know! We will then build the **Bento Grid HomePage components** piece-by-piece!
