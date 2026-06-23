# Chapter 5: React.js — The Framework

## Lesson 5.1: React Components & JSX

Now that you have your project's folders ready, it's time to build your very first React components! In this lesson, we will cover the core building blocks of React: **Components**, **JSX**, **Props**, **Typescript Interfaces**, and **Exports/Imports**.

To make this directly useful for your Capstone Portfolio, we will adapt the syllabus's `EmployeeCard` into a `ProjectCard` (which you will use to showcase your projects, like this HRIS!).

---

## Part 1: What is a Component?

In React, a **Component** is a self-contained, reusable block of code that controls a part of the user interface (UI). 
Think of it like a custom HTML element. Instead of writing the same HTML over and over, you write it once as a component and reuse it.

In modern React, components are written as **JavaScript/TypeScript Functions** that return JSX:

```tsx
// A simple functional component
export function WelcomeMessage() {
  return <h1>Welcome to my website!</h1>;
}
```

---

## Part 2: JSX — HTML inside JavaScript

React uses a syntax extension called **JSX (JavaScript XML)**. It looks like HTML, but it has the full power of JavaScript.

### Critical Rules of JSX:
1. **You must return a single parent element.** JSX cannot return multiple adjacent tags unless they are wrapped in a parent tag or a **Fragment** (`<> ... </>`):
   ```tsx
   // ❌ INVALID
   return (
     <h1>Hello</h1>
     <p>World</p>
   );

   // ✅ VALID (using Fragment)
   return (
     <>
       <h1>Hello</h1>
       <p>World</p>
     </>
   );
   ```

2. **`class` becomes `className`.** Because `class` is a reserved keyword in JavaScript/TypeScript, we must use `className` for styling:
   ```tsx
   // ✅ Valid class syntax in React
   return <div className="bg-blue-500 text-white p-4">Content</div>;
   ```

3. **Self-closing tags are mandatory.** Any tag that doesn't wrap content *must* end with a forward slash (`/`).
   - HTML: `<img src="url">`, `<input type="text">`, `<br>`
   - JSX: `<img src="url" />`, `<input type="text" />`, `<br />`

4. **JavaScript inside curly braces `{}`.** You can write any valid JavaScript expression (like variables, math, or function calls) directly inside JSX by wrapping it in `{}`:
   ```tsx
   const name = "Patrick";
   return <p>Hello, my name is {name}!</p>;
   ```

---

## Part 3: Passing Data with Props

Components are only useful if they can display different data. We pass data into components using **Props** (short for properties), just like HTML attributes.

In TypeScript, we **must** define a Type or an `interface` to specify what props our component expects. This prevents bugs before the code even runs!

### 1. Define the Interface (The contract):
```tsx
interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[]; // an array of strings
  projectUrl: string;
}
```

### 2. Create the Component (Receiving props):
We use **object destructuring** to pull the values out of the `props` object:

```tsx
export function ProjectCard({ title, description, tags, projectUrl }: ProjectCardProps) {
  return (
    <article className="border border-zinc-800 rounded-xl p-6 bg-zinc-900 shadow-md">
      <h3 className="text-xl font-bold text-zinc-100">{title}</h3>
      <p className="text-zinc-400 mt-2 text-sm">{description}</p>
      
      {/* Rendering tags */}
      <div className="flex gap-2 mt-4">
        {tags.map((tag) => (
          <span key={tag} className="text-xs bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <a 
        href={projectUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-block mt-4 text-xs font-semibold text-sky-400 hover:text-sky-300 hover:underline"
      >
        View Project →
      </a>
    </article>
  );
}
```

---

## Part 4: Named Exports vs. Default Exports

There are two ways to export a component in React:

### 1. Named Exports (Recommended for Reusable Components)
You put `export` directly in front of the function:
```tsx
export function Navbar() { ... }
```
To import it, you **must use curly braces `{}`** and match the exact name:
```tsx
import { Navbar } from './components/Navbar';
```

### 2. Default Exports (Recommended for page-level or root components)
You write `export default` at the end of the file or in front of the function:
```tsx
export default function App() { ... }
```
To import it, you do **not** use curly braces, and you can name it whatever you want:
```tsx
import App from './App';
import MainApp from './App'; // Also works!
```

**Rule of thumb:**
- Always use **Named Exports** for elements in `components/`, `features/`, `hooks/`, and `lib/`. It makes your imports clean and predictable.
- Use **Default Exports** for root layout configs and page-level routes.

---

## Part 5: Component Naming Conventions

Always follow these industry-standard naming rules:
1. **PascalCase** for components (first letter of every word capitalized):
   - `ProjectCard.tsx`
   - `Navbar.tsx`
   - `EmployeeCard.tsx`
2. **camelCase** for hooks, utilities, and helper files (first letter lowercase, rest capitalized):
   - `useEmployees.ts`
   - `formatDate.ts`
   - `utils.ts`

---

## 📝 Activities: Building UI Components

You will now build your first set of custom UI components for your **Portfolio** inside `PRACTICE/PORTFOLIO/src/`!

### Task 1: Create `Navbar.tsx`
1. Inside `PORTFOLIO/src/components/`, create a new file named `Navbar.tsx`.
2. Implement it as a **functional component** with a **named export**.
3. Use semantic HTML (`<header>`, `<nav>`).
4. Include a logo/name text (e.g. "Patrick's Portfolio") and 3 anchor links: "About", "Projects", and "Contact" (set their `href` to `#about`, `#projects`, `#contact` for now).
5. Style it using Tailwind CSS: make it look sleek (e.g., sticky top, blurred background backdrop, dark border).

### Task 2: Create `Footer.tsx`
1. Inside `PORTFOLIO/src/components/`, create a new file named `Footer.tsx`.
2. Implement it as a **functional component** with a **named export**.
3. Use semantic HTML (`<footer>`, `<p>`).
4. Display a copyright statement with your name and the current year dynamically rendered in JSX (Hint: Use `{new Date().getFullYear()}`).
5. Style it using Tailwind CSS (e.g., border top, muted text, padding).

### Task 3: Create `ProjectCard.tsx`
1. Inside `PORTFOLIO/src/components/`, create a new file named `ProjectCard.tsx`.
2. Implement it with a **named export** and create a TypeScript `interface` named `ProjectCardProps` to type its props:
   - `title`: string
   - `description`: string
   - `tags`: string[]
   - `projectUrl`: string
3. Use semantic HTML (`<article>`, `<h3>`, `<p>`).
4. Style it using Tailwind CSS to look premium (e.g., cards with hover scale effects, glassmorphic backgrounds, clean typography).

### Task 4: Put It All Together in `App.tsx`
1. Open `PORTFOLIO/src/App.tsx`.
2. Clear out the boilerplate content inside the return statement (everything inside `<></>`).
3. Import your `Navbar`, `Footer`, and `ProjectCard` components.
4. Set up a simple grid layout inside your `App.tsx` main content area and render at least **3** `<ProjectCard />` components with different props. (One of them should be your "HRIS - Human Resource Information System"!).
5. Add a simple hero section between the `Navbar` and the grid, welcoming visitors to your portfolio.
6. Make sure there are no TypeScript compiler errors or Vite build failures.

---

## 🧪 Test Checklist

To submit this lesson for grading, verify your work and update the checklist in `lesson_5_1_answer.md`:
1. Create `PRACTICE/LESSONS/LESSON_5/lesson_5_1_answer.md`.
2. Run your Vite app using `npm run dev` to verify the page renders beautifully.
3. Check that your components utilize semantic HTML (`<header>`, `<nav>`, `<article>`, `<footer>`).
4. Check that TypeScript has no errors regarding the `ProjectCardProps` interface.
