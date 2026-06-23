# Chapter 5: React.js — The Framework

## Lesson 5.2: React State & Hooks

In this lesson, you will learn how to make your React components **interactive**. 

Up until now, you've passed static data down using `props`. But websites are alive; users click buttons, open dropdowns, submit forms, and fetch data. This requires the components to remember and update their own data. In React, this changing data is called **State**.

---

## Part 1: What is State?

In plain English: **State is a component's memory.**
While `props` are read-only and passed *into* a component from its parent, `state` is private data owned and managed *inside* the component itself.

Whenever a component's **state** changes, React automatically re-runs (re-renders) the component function and updates the screen to show the new data.

---

## Part 2: The `useState` Hook

To declare state in a React functional component, we use the `useState` hook. 

```tsx
import { useState } from 'react';

export function Counter() {
  // Declare a state variable named "count", and a function to update it named "setCount"
  // The initial value is 0.
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### Explaining the Array Destructuring Syntax:
`const [count, setCount] = useState<number>(0);`
* **`count`**: The current value of the state variable.
* **`setCount`**: The setter function. This is the **only** way you are allowed to modify `count`.
* **`useState<number>(0)`**: We pass the initial state value (`0`) as an argument. In TypeScript, we can use generic brackets `<number>` to enforce the data type.

---

## Part 3: The `useEffect` Hook

Components often need to do things that aren't related to rendering HTML: fetching data from a database, setting timers, or subscribing to events. These are called **Side Effects**.

The `useEffect` hook lets you synchronize a component with external systems. It runs your code at specific times during a component's lifecycle.

### Syntax:
```tsx
useEffect(() => {
  // Code to run goes here...
}, [dependencies]);
```

### The 3 modes of the Dependency Array (`[]`):
1. **No array at all:** Runs on *every single render*. (Rarely used).
   ```tsx
   useEffect(() => {
     console.log("I run on every render!");
   });
   ```
2. **An empty array `[]`:** Runs **only once** when the component first loads (mounts). (Extremely common for fetching initial data).
   ```tsx
   useEffect(() => {
     console.log("Component loaded for the first time!");
   }, []);
   ```
3. **Array with variables `[count]`:** Runs when the component mounts, and then re-runs **only when** those specific variables change.
   ```tsx
   useEffect(() => {
     console.log(`The count changed! New value is ${count}`);
   }, [count]);
   ```

---

## Part 4: Custom Hooks — Clean Architecture

As you write more React, you'll notice components becoming bloated with state and side-effect logic. 

**Rule:** Clean React components should focus on UI layout, not heavy calculations or state management.

To solve this, we extract logic into **Custom Hooks**. A custom hook is simply a TypeScript function whose name starts with `use` (e.g., `useProjects`), and that can call other React hooks.

### Example:
```tsx
// src/hooks/useToggle.ts
import { useState } from 'react';

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue((prev) => !prev);
  
  return [value, toggle] as const;
}
```

---

## Part 5: Where to Put Logic? (Standard Rules)

| If the logic is... | Put it in a... | File Extension |
| :--- | :--- | :--- |
| **Pure logic** (no React variables, hooks, or UI; e.g. calculating tax, formatting dates) | **Utility Function** (in `lib/`) | `.ts` |
| **Stateful logic** (uses `useState` or `useEffect` to fetch data, handle filters, or manage forms) | **Custom Hook** (in `hooks/`) | `.ts` |
| **Visual representation** (returns HTML/JSX markup) | **Component** (in `components/` or `features/`) | `.tsx` |

---

## 📝 Activities: Interactive Portfolio Features

Let's make your portfolio interactive! Implement the following features inside your `PRACTICE/PORTFOLIO/` codebase:

### Task 1: Project Counter in the Hero
1. Open [App.tsx](file:///c:/Users/HP/Documents/PRACTICE_PROG/HRIS/HRIS-PAT/PRACTICE/PORTFOLIO/src/App.tsx).
2. Create a "Like" counter in your hero section.
3. Declare a `likes` state variable starting at `0`.
4. Render the current likes count in your hero banner text.
5. Add a "👍 Like Portfolio" button next to it. Clicking it should increment the count.
6. Use `useEffect` with a dependency array to `console.log` the new likes count every time it changes.

### Task 2: Expandable Details (Toggle Card)
1. Add an "Expand / Collapse Details" toggle button inside your [ProjectCard.tsx](file:///c:/Users/HP/Documents/PRACTICE_PROG/HRIS/HRIS-PAT/PRACTICE/PORTFOLIO/src/components/ProjectCard.tsx).
2. Inside `ProjectCard`, declare a boolean state variable `isExpanded` (default `false`).
3. Add a button at the bottom of the card: if collapsed, the button text should say "Show Details"; if expanded, it should say "Hide Details".
4. When `isExpanded` is `true`, render a simple extra `<p>` tag describing a feature of that project (e.g., *"Tech stack details, architecture design patterns, and highlights."*).

### Task 3: Load Log
1. In your `App.tsx`, write a `useEffect` hook with an empty dependency array `[]`.
2. When the app loads, print a greeting to the console: `"Welcome to Patrick's Portfolio dev environment!"`.

### Task 4: Move Project Data to a Custom Hook
Right now, your project list is hardcoded in the JSX of `App.tsx`. Let's manage this state dynamically and abstract it into a custom hook.

1. Inside `src/hooks/`, create a new file named `useProjects.ts`.
2. Write a custom hook named `useProjects` that:
   - Declares a state variable `projects` containing the initial array of project objects (title, description, tags, url).
   - Exposes a function `addProject(newProject: Project)` to append a new project to the array.
3. Import `useProjects` into `App.tsx`.
4. Loop through the array returned by your custom hook to render your `<ProjectCard />` components dynamically in the grid!
5. Add a simple form or a single button at the top of your projects section named "🚀 Add Secret Project". When clicked, it should call `addProject` to dynamically inject a 4th project card onto the screen!
