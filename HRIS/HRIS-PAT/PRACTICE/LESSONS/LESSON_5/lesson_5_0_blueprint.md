# Chapter 5: React.js — The Framework

## Lesson 5.0: Frontend File & Folder Structure (The Blueprint)

Welcome to React! Before you write a single line of React code, you need to understand how professional projects are organized. A messy folder structure is a developer's worst nightmare. 

In this lesson, we will look at how your HRIS project is organized so you can copy that exact same professional structure for your Portfolio.

---

## Part 1: The Standard React File Structure

When you open a modern React + TypeScript project, inside the `src/` folder, you will typically see these subdirectories:

1. `components/` 
   - **What it is:** Reusable UI pieces that don't belong to any specific page.
   - **Examples:** `<Button />`, `<Navbar />`, `<Footer />`, `<Modal />`
2. `features/`
   - **What it is:** Where the actual "business logic" lives. We group files by the feature they belong to (e.g., all employee-related code goes into `features/employee/`).
3. `hooks/`
   - **What it is:** Custom React Hooks. These are functions that manage state or side-effects. 
   - **Examples:** `useAuth.ts`, `useWindowSize.ts`
4. `lib/`
   - **What it is:** Pure utility functions and helper scripts that have nothing to do with React UI.
   - **Examples:** `formatDate.ts`, `cn.ts` (a Tailwind helper)
5. `assets/`
   - **What it is:** Static files like images, SVGs, and fonts.

---

## Part 2: TypeScript Extensions (`.ts` vs `.tsx`)

You will notice two different file extensions in React projects. Here is the strict rule:

- **Use `.tsx`** when the file contains **JSX** (HTML-like syntax inside JavaScript). If your file has `<div>` or `<button>` in it, it MUST be `.tsx`.
- **Use `.ts`** when the file is pure logic. If it's just a function that calculates a number, or a custom hook that manages data, it is a `.ts` file.

---

## Part 3: The Feature Folder Pattern

The HRIS project uses a highly scalable architecture called the **Feature Folder Pattern**. 

Instead of putting all components in `components/` and all hooks in `hooks/`, you group things by the *Feature* they belong to. 

For example, look at the Employee feature. In a traditional bad structure, the files are scattered everywhere. In the Feature pattern, everything related to an Employee is tightly packed in one folder:
```
src/
└── features/
    └── employee/
        ├── EmployeeList.tsx    (The main view)
        ├── EmployeeCard.tsx    (A component only used by EmployeeList)
        ├── useEmployees.ts     (A hook to fetch employees from the database)
        └── employeeTypes.ts    (The TypeScript Interface for an Employee)
```

---

## 📝 Activity: Exploring the Blueprint

Let's study the HRIS codebase and apply it to your new Portfolio.

### Task 1: Map the HRIS structure
1. Open your `HRIS-PAT/hris/src/` folder in your code editor.
2. Create a new markdown file named `web-notes.md` (you can put it in your `PRACTICE/` folder).
3. Draw a quick text-based map of the folders you see inside `hris/src/`. Write 1 sentence next to each folder guessing what it's used for.

### Task 2: `.ts` vs `.tsx`
1. Inside `hris/src/`, find any file ending in `.ts` and any file ending in `.tsx`.
2. In your `web-notes.md`, write down the names of the two files you found and explain *why* one is `.ts` and the other is `.tsx`.

### Task 3: The `cn()` Utility
1. Open `hris/src/lib/utils.ts`. You will see a function called `cn`.
2. In your notes, write down why this function is located inside `lib/` and not inside `components/`.

### Task 4: Setup your Portfolio Structure
1. Navigate to your `PRACTICE/PORTFOLIO/src/` folder.
2. Manually create the following folders: `components/`, `features/`, `hooks/`, and `lib/`. (Leave them empty for now).

---

## 🧪 Test Checklist

- [ ] Created `web-notes.md` with the HRIS folder map
- [ ] Explained `.ts` vs `.tsx` in notes
- [ ] Explained why `utils.ts` is in the `lib/` folder
- [ ] Created the 4 core folders inside `PORTFOLIO/src/`

When you finish, tell me and I will check your notes!
