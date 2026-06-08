# 🗂️ Portfolio Setup Guide

## Step 1 — Scaffold the project

Open a terminal, navigate to the `PRACTICE` folder, and run:
```bash
cd PRACTICE
npx create-vite@latest PORTFOLIO --template react-ts
cd PORTFOLIO
```

## Step 2 — Install base dependencies
```bash
npm install
```

## Step 3 — Install Tailwind CSS
```bash
npm install tailwindcss @tailwindcss/vite
```

## Step 4 — Install React Router (for multi-page navigation)
```bash
npm install react-router-dom
```

## Step 5 — Configure Tailwind in `vite.config.ts`
Open `vite.config.ts` and edit it to look like this:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

## Step 6 — Add Tailwind to `src/index.css`
Replace ALL existing content in `src/index.css` with just this one line:
```css
@import "tailwindcss";
```

## Step 7 — Build the folder structure
Inside `src/`, manually create these folders and files:
```
src/
├── components/         ← Create this folder (reusable pieces like Navbar, Footer)
├── sections/           ← Create this folder (Hero, About, Projects, Contact)
├── assets/             ← Create this folder (images, your photo)
├── App.tsx             ← Already exists
├── index.css           ← Already exists (you edited this in Step 6)
└── main.tsx            ← Already exists
```

## Step 8 — Run it!
```bash
npm run dev
```
Open `http://localhost:5173` — your blank React + TypeScript + Tailwind frontend is running!

## Step 9 — Scaffold the C# Backend
To keep things organized, your backend should live in its own folder. Open a new terminal inside the `PORTFOLIO` folder and run:

```bash
# 1. Create a new Web API project in a folder called 'backend'
dotnet new webapi -n Portfolio.Api -o backend

# 2. Go into the backend folder
cd backend

# 3. Install the dependencies for Email and Database
dotnet add package MailKit
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

### The Final Full-Stack Folder Structure
After completing all steps, your PORTFOLIO folder will look like this:
```
PORTFOLIO/
├── backend/            ← Your C# ASP.NET Core API
│   ├── Controllers/
│   ├── Program.cs
│   └── Portfolio.Api.csproj
├── src/                ← Your React Frontend
│   ├── components/
│   ├── sections/
│   ├── assets/
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts
```
