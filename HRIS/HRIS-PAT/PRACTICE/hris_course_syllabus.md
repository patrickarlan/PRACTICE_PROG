# 📘 Full-Stack Web Development: From Zero to HRIS
**Professor:** Antigravity AI  
**Student:** Patrick  
**Goal:** Learn web development with C#, React.js, TypeScript, Tailwind CSS, Shadcn UI, and PostgreSQL — from scratch, hands-on, using the HRIS project as your blueprint.

---

> ### 📌 How to Use This Syllabus
> - Every lesson has **Activities (📝)** you must complete before moving on.
> - All activities go in your `C:\Users\HP\Documents\PRACTICE_PROG\HRIS\PRACTICE\` folder.
> - When you finish an activity, ask me to **check your work or explain the next one**.
> - Do NOT skip activities. They are how you actually learn.
> - **Professor's Method (🗣️):** I will explain code syntax in plain English sentence form so you can learn to "read" code naturally.

---

## ═══════════════════════════════════
## 🟢 UNIT 1: THE WEB & HOW IT WORKS
## ═══════════════════════════════════
*Before writing any code, you need to understand the big picture of how the internet and web apps work.*

---

### Lesson 1.1: What is the Web?
- What happens when you type a URL in a browser?
- What is a **Client** and what is a **Server**?
- What is **HTTP**? (How the browser and server talk to each other.)
- What is a **Request** and a **Response**?
- What are HTTP Status Codes? (200 = OK, 401 = Unauthorized, 404 = Not Found, 500 = Server Error)

**📝 Activities:**
1. Open your browser, go to `http://localhost:5107` (your HRIS backend), and describe what you see.
2. Open the **Developer Tools** (F12), go to the "Network" tab, and visit your HRIS frontend. Look at the list of requests being made. Write down 3 of them.
3. In your practice folder, create a file called `web-notes.md`. Write in your own words what a Client and Server are.
4. Look at your HRIS frontend in the Network tab. Find a request that returns a **200** status and one that returns a **401**. Write what each one means.
5. Research: What is the difference between `GET`, `POST`, `PUT`, and `DELETE` HTTP methods? Write a short summary.

---

### Lesson 1.2: Frontend vs Backend vs Database
- What is the **Frontend**? (What the user sees)
- What is the **Backend**? (The brain — processes logic)
- What is the **Database**? (Where data is stored permanently)
- How do they connect? (API calls and SQL queries)
- The concept of **Separation of Concerns**: why we split these into 3 distinct layers instead of one big blob of code.
- What is a **Full-Stack Developer**? (Someone who can work on all three layers)

**📝 Activities:**
1. Look at your HRIS project folder and identify which folder is the frontend, which is the backend.
2. In `web-notes.md`, draw a simple text diagram showing how the browser → frontend → backend → database flow works.
3. Open the HRIS frontend in your browser. Click around and describe 2 things that are "frontend only" (e.g., the look of a button) and 2 things that require the backend (e.g., loading employee data).
4. Go to `backend/Controllers/` in HRIS-PAT. Open any controller file and read it. Try to guess what it does even if you don't understand the syntax yet.
5. Open pgAdmin and look at the tables in your database. Write down 5 table names you find there.

---

### Lesson 1.3: What is an API and How Does It Work?
- What is an **API**? (Application Programming Interface — the bridge between frontend and backend).
- **How does it work?** (The frontend sends a request to a specific URL called an "endpoint", the backend processes it, and returns data, usually as JSON).
- **Visualizing APIs with Swagger:** Swagger is a tool that reads the backend code and creates a webpage where you can see all available endpoints and even test them!
- **Where do we create it?** (We create APIs in the **Backend** project using Controllers).

**📝 Activities:**
1. In `web-notes.md`, write a simple explanation of what an API is using an analogy (e.g., a waiter, a postman, or a translator).
2. Look at the HRIS frontend network tab again. Find a request that returns a list of employees. Note the URL (this is the API endpoint).
3. Open a new tab in your browser and go to `https://jsonplaceholder.typicode.com/todos/1`. This is a free public API. Describe what you see on the screen.
4. In your notes, explain the difference between a regular website URL (that returns HTML) and an API URL (that returns raw data/JSON).
5. **Explore Swagger:** Open your browser and go to `http://localhost:5107/swagger` (or your backend port). Look at the list of endpoints and try to "Execute" one to see the JSON response.
6. Identify where in the HRIS-PAT project the API controllers are located.

---

### Lesson 1.4: Version Control with Git & Git Bash
- What is Git and why do we use it?
- **Git Bash:** What it is, why it's better than PowerShell for Git on Windows, and how to use it.
- **Unix/Bash commands** you'll use daily: `ls`, `cd`, `mkdir`, `touch`, `cat`, `clear`, `pwd`
- Basic Git commands: `git init`, `git add`, `git commit`, `git status`, `git log`, `git diff`
- Advanced Git: `git stash`, `git stash pop`, `git reset`, `git commit --amend`
- Creating a repository on GitHub and pushing code (`git remote add origin`, `git push -u origin main`)
- Concept of branches (`main` vs feature branches) — `git checkout -b`, `git merge`
- Understanding and resolving Merge Conflicts (conflict markers: `<<<<<<<`, `=======`, `>>>>>>>`)

**📝 Activities:**
1. **Initialize & Ignore:** Initialize a git repo (if not done). Create a `.gitignore` and ignore `node_modules/` and `.env`. Commit these files.
2. **History Check:** Run `git log --oneline`. Copy the output into your notes. How many commits do you see?
3. **The Stash Trick:** Make a small change to a file (don't commit it). Run `git status`. Run `git stash` and check status again. Run `git stash pop`. Explain what happened.
4. **Branching and Diff:** Create a new branch: `git checkout -b feature/advanced-git`. Modify a file. Run `git diff` to see the output. Commit the change.
5. **Simulate a Conflict:** In your notes, describe the merge conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), what they mean, and the steps to resolve a merge conflict.
6. **Pushing to GitHub:** Write the 3 commands needed to connect and push your code to a new GitHub repository for the first time. (Hint: `git remote add origin`, `git add/commit`, `git push -u origin main`)
7. **The Gitignore Fix:** Write the command to stop Git from tracking a folder named `bin/` that was accidentally committed. Include the steps to update `.gitignore` and commit.

---

### Lesson 1.5: Terminal Automation with PowerShell (.ps1)
- What is a script and why do we use it?
- Running `.ps1` files on Windows (Understanding Execution Policies).
- Basic PowerShell commands: `Write-Host`, `Set-Location`, `Start-Process`, `if/else`, variables with `$`.
- How to read a setup script.
- Writing scripts that automate multi-step startup tasks.

**📝 Activities:**
1. In your `PRACTICE/` folder, create a file called `hello.ps1`. Write a script that prints `"Hello, Patrick! Ready to code?"` to the console using `Write-Host`.
2. Try to run it in your terminal using `.\hello.ps1`. If you get an error about execution policies, research how to bypass it or set it to `RemoteSigned`.
3. In `web-notes.md`, explain in your own words why having a setup script is better than manually typing 10 commands every time you start work.
4. Look at the `setup-frontend` or `setup-backend` scripts you are currently running (if they are open). Try to find one command in them and guess what it does based on what you've learned.
5. Write a `start-hris.ps1` that navigates to the `backend` folder and runs `dotnet watch run`, then navigates to the `hris` folder and runs `npm run dev`. (Hint: you will need to open each in a new terminal window using `Start-Process`.)

---

### Lesson 1.6: The Art of Debugging & Error Handling
*Every developer spends a significant portion of their time debugging. This is not a sign of weakness — it is the core skill that separates good developers from great ones. This lesson teaches you how to think like a detective when things go wrong.*

- **The Three Types of Errors:**
  - **Syntax Errors:** Caught before the program even runs. The compiler or browser says "I can't understand this code." (e.g., a missing bracket `}` or a typo in a keyword).
  - **Runtime Errors:** The code starts running, but crashes mid-way. (e.g., trying to read a property on `null`, or calling an API that is down).
  - **Logic Errors:** The hardest kind. The code runs perfectly without crashing, but produces the wrong result. (e.g., calculating a salary but forgetting to multiply by 12 for the annual figure).
- **The Developer's Mindset: Think Like a Detective 🔍**
  - Step 1: **Observe the symptom** — What is the actual wrong behavior?
  - Step 2: **Read the error message fully** — Don't panic! Error messages are helpful. Read the file name, line number, and the message.
  - Step 3: **Isolate the layer** — Is it a Frontend issue? A Backend issue? A Database issue? Or a connection issue between them?
  - Step 4: **Form a hypothesis** — "I think the problem might be X."
  - Step 5: **Test the hypothesis** — Make one change and test again.
  - Step 6: **Document the fix** — Write it in your `troubleshooting.md` so you never forget it.
- **Frontend Debugging Tools:**
  - The Browser **Console** tab: Your first stop. All `console.log`, warnings, and errors appear here.
  - `console.log`, `console.warn`, `console.error`, `console.table` — different log levels for different situations.
  - The Browser **Sources** tab: Set **breakpoints** to pause code execution at a specific line and inspect variables.
  - **React DevTools Extension:** Inspect the component tree, props, and state visually in the browser.
  - **React Error Boundaries:** A special React component that catches errors in its child components and displays a fallback UI instead of crashing the whole app.
- **Backend Debugging Tools:**
  - Reading **Stack Traces** in the terminal — How to trace the error back to its origin.
  - **Structured Logging with Serilog:** A professional logging library that writes structured, searchable logs (used in the HRIS project).
  - `try-catch` blocks in C#: For handling specific, expected failures gracefully.
  - **Global Exception Handling Middleware:** A centralized place in `Program.cs` that catches ALL unhandled errors and returns a clean, safe response — instead of exposing raw stack traces to users.
  - `app.UseDeveloperExceptionPage()` (Development) vs `app.UseExceptionHandler()` (Production) — Why showing full errors in production is a security risk.
  - **ProblemDetails format:** The RFC-standard JSON format for returning API errors in a consistent, machine-readable way.
- **Troubleshooting Common Full-Stack Issues:**
  - `CORS Error`: The backend is blocking requests from the frontend. How to fix it.
  - `401 Unauthorized`: Your JWT token is missing, expired, or invalid.
  - `404 Not Found`: You have the wrong endpoint URL or the backend is not running.
  - `500 Internal Server Error`: Something crashed on the backend. Check the terminal logs.
  - `ERR_CONNECTION_REFUSED`: The backend server is not running at all.
- **The `troubleshooting.md` File:** A developer's personal journal of bugs they have encountered and how they fixed them. You will build yours throughout this course.

**📝 Activities:**
1. In your `PRACTICE/` folder, create a file called `troubleshooting.md`. Write a template with sections: **Error**, **Where it happened**, **Cause**, **Fix**. Then, fill in the very first entry with the 404 error you saw in Lesson 1.1 when visiting `http://localhost:5107`.
2. Open your HRIS frontend in the browser. Open DevTools (F12) → Console. Do you see any warnings or errors? Screenshot or write down what you see and try to interpret one.
3. **Simulate a Runtime Error:** In your browser console, type: `null.toString()`. Read the error that appears. Write down the error type and message in your notes.
4. **Backend Error Hunt:** In your HRIS backend terminal, look at the log output. Find a log line that is tagged `[WRN]` (Warning) or `[ERR]` (Error). What does it say? Write it in your `troubleshooting.md`.
5. **Research:** Look up what a `CORS` error is. Write in your notes: what causes it, and what the fix is in an ASP.NET Core backend (hint: look for `builder.Services.AddCors`).
6. **Break it on purpose:** Temporarily change your HRIS frontend's API base URL to a wrong port (e.g., `5999`). Observe the error that appears in the browser console and the Network tab. Write down what you see. Then fix it back.

---

## ══════════════════════════════════════
## 🟡 UNIT 2: HTML — THE SKELETON
## ══════════════════════════════════════
*HTML is the foundation of every webpage. Everything you see on the web is built on HTML.*

---

### Lesson 2.1: HTML Basics
- What is an HTML tag? (Opening and closing tags)
- Common tags: `<html>`, `<head>`, `<body>`, `<h1>`–`<h6>`, `<p>`, `<a>`, `<img>`, `<div>`, `<span>`
- What is an HTML attribute? (e.g., `href`, `src`, `id`, `class`)
- Nesting elements (parent and child elements)

**📝 Activities:**
1. In `PRACTICE/html/`, create a file called `index.html`. Write the basic HTML skeleton (`<html>`, `<head>`, `<body>`).
2. Inside `<body>`, add: a heading (`<h1>`), a paragraph (`<p>`), and a link (`<a>`) that goes to `https://google.com`.
3. Add an image tag `<img>` with any image URL from the internet.
4. Create a `<div>` that wraps a `<h2>` and three `<p>` tags inside it. This simulates a "card" layout.
5. Add `id="main-section"` to your outer `<div>`. Add `class="intro-text"` to your paragraphs.
6. Open the file in your browser by double-clicking it and take a screenshot of what it looks like.

---

### Lesson 2.2: HTML Lists & Tables
- Unordered lists (`<ul>`, `<li>`)
- Ordered lists (`<ol>`, `<li>`)
- Tables (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`)

**📝 Activities:**
1. Create `table.html`. Build an HTML table with 4 columns: `Employee ID`, `Name`, `Department`, `Position`.
2. Add 3 fake employee rows inside the table.
3. Use `<thead>` and `<tbody>` to properly separate the header from the data rows.
4. Add a bullet list of 5 programming languages you want to learn.
5. Add a numbered list of the 3 steps to start the HRIS project (from memory — don't look!).

---

### Lesson 2.3: HTML Forms
- The `<form>` element
- `<input>` types: `text`, `password`, `email`, `number`, `checkbox`, `radio`
- `<label>`, `<select>`, `<textarea>`, `<button>`
- What is `name` attribute and why it matters

**📝 Activities:**
1. Create `login.html`. Build a login form with an Email field and a Password field, and a Submit button.
2. Create `registration.html`. Build a form with: Full Name, Email, Password, Department (dropdown), and Position (text input).
3. Add `<label>` tags to every input field so they are properly labeled.
4. Add a checkbox that says "I agree to the terms and conditions."
5. Add two radio buttons for "Admin" and "Employee" roles.
6. Look at the HRIS login page in your browser. Compare it to your `login.html`. What does the real one have that yours doesn't?

---

## ══════════════════════════════════════
## 🟡 UNIT 3: CSS & TAILWIND — THE SKIN
## ══════════════════════════════════════
*CSS makes HTML look good. Tailwind CSS is a utility-first way to write CSS faster.*

---

### Lesson 3.1: Basic CSS
- What is CSS and how does it connect to HTML? (`<link>` tag and inline styles)
- Selectors: element, `.class`, `#id`
- Common properties: `color`, `background-color`, `font-size`, `margin`, `padding`, `border`, `width`, `height`
- The Box Model (margin, border, padding, content)

**📝 Activities:**
1. Create `styles.css` in your html folder. Link it to your `index.html`.
2. Set the `body` background to a dark color and text to white.
3. Style your `<h1>` tag to be large, bold, and a different color.
4. Give your `<div>` a background color, rounded corners (`border-radius`), and padding.
5. Set the width of your table to 100% and add borders to each cell.
6. Draw the CSS Box Model in `web-notes.md` and explain each part in your own words.

---

### Lesson 3.2: CSS Flexbox & Layout
- What is Flexbox?
- `display: flex`, `flex-direction`, `justify-content`, `align-items`, `gap`
- Centering elements with Flexbox

**📝 Activities:**
1. Create `flexbox.html`. Make a row of 3 colored boxes side by side using Flexbox.
2. Center those 3 boxes horizontally and vertically on the page.
3. Add `gap` between the boxes.
4. Switch `flex-direction` to `column` and see what happens.
5. Recreate a simple navigation bar with a logo on the left and 3 links on the right using Flexbox.

---

### Lesson 3.3: Tailwind CSS (The Way HRIS Does It)
- What is Tailwind and why use it instead of raw CSS?
- Installing Tailwind in a Vite/React project
- Common utilities: `flex`, `p-4`, `m-2`, `text-lg`, `font-bold`, `bg-blue-500`, `rounded`, `shadow`
- Responsive prefixes: `sm:`, `md:`, `lg:`

**📝 Activities:**
1. In `PRACTICE/frontend/`, create a React app with Vite. Install Tailwind CSS following the official docs.
2. Replicate your `index.html` layout but inside a React component using Tailwind classes instead of a CSS file.
3. Create a styled card component using Tailwind with: a title, a description, and a button.
4. Make the card change its background color on hover using Tailwind's `hover:` prefix.
5. Make the card layout change from a single column on mobile to 3 columns on desktop using `md:grid-cols-3`.

---

## ══════════════════════════════════════════
## 🟠 UNIT 4: JAVASCRIPT & TYPESCRIPT BASICS
## ══════════════════════════════════════════
*JavaScript makes web pages interactive. TypeScript is JavaScript with strict types (which is what HRIS uses).*

---

### Lesson 4.1: JavaScript Fundamentals
- Variables: `let`, `const`, `var`
- Data types: `string`, `number`, `boolean`, `null`, `undefined`, `array`, `object`
- Functions: regular functions and arrow functions
- `console.log()` for debugging
- `if/else`, loops (`for`, `forEach`, `map`)

**📝 Activities:**
1. In `PRACTICE/js/`, create `basics.js`. Declare 5 variables: your name, age, a boolean, an array of 3 fruits, and an object with a name and position.
2. Write a function called `greet(name)` that returns `"Hello, [name]!"`.
3. Write a `for` loop that prints every fruit from your array.
4. Use `.map()` on your array to create a new array where every fruit name has `" 🍎"` appended to it.
5. Write an `if/else` that checks if age is over 18 and prints different messages.
6. Open your browser console (F12 → Console) and type `console.log("I am learning JS!")`. Screenshot the result.

---

### Lesson 4.2: TypeScript Basics
- What is TypeScript and why does it exist? (The compiler as your safety net)
- Declaring types: `: string`, `: number`, `: boolean`, `: void`, `: never`
- Interfaces: defining the shape of an object
- `type` alias vs `interface` — when to use which
- Optional properties with `?` and default values
- `readonly` properties (immutable fields)

**📝 Activities:**
1. In `PRACTICE/ts/`, create `basics.ts`. Re-write your JavaScript basics from Lesson 4.1 with proper TypeScript types.
2. Create an `interface Employee` with fields: `id: number`, `name: string`, `department: string`, `isActive: boolean`.
3. Create a variable of type `Employee` and fill it with data.
4. Create an `interface Department` with `id`, `name`, and `code`. Make `code` optional with `?`.
5. Create an array of type `Employee[]` with 3 employees in it.
6. Look at `hris/src/` in the HRIS project and find a `.tsx` file that defines an interface. Copy it into your notes and explain what each field means.

---

### Lesson 4.3: Advanced TypeScript — Types, Generics & Nullables
*This is where TypeScript goes from "nice to have" to a superpower. Understanding these concepts is what separates a TypeScript beginner from a TypeScript developer.*

- **Union Types (`|`):** A variable that can be one of several types.
  - `let status: "active" | "inactive" | "pending"` — only those exact string values are allowed.
  - `let id: string | number` — can be either.
- **Intersection Types (`&`):** Combining multiple types into one.
- **Nullable Types & the problem of `null`:**
  - In TypeScript, `null` and `undefined` are their own types.
  - `let name: string | null = null` — explicitly allowing null.
  - The `strictNullChecks` compiler option and why it saves you from `Cannot read property of null` crashes.
- **Handling Nullables Safely:**
  - **Optional Chaining (`?.`):** `employee?.department?.name` — if any part is null/undefined, it stops and returns `undefined` instead of crashing.
  - **Nullish Coalescing (`??`):** `const name = employee.name ?? "Unknown"` — uses the right side only if the left is `null` or `undefined`.
  - **Non-null Assertion (`!`):** `employee!.name` — telling TypeScript "I guarantee this is not null." Use sparingly!
- **Generics (`<T>`):** Writing code that works with any type while remaining type-safe.
  - `function getFirst<T>(arr: T[]): T` — a function that works on any array.
  - `Promise<Employee[]>` — a Promise that resolves to an Employee array.
  - `useState<Employee[]>([])` — React's useState typed to hold an Employee array.
- **Utility Types (built into TypeScript):**
  - `Partial<T>` — makes all fields optional (great for update DTOs).
  - `Pick<T, 'id' | 'name'>` — creates a type with only selected fields.
  - `Omit<T, 'password'>` — creates a type with a field removed.
  - `Record<string, number>` — an object where all keys are strings and all values are numbers.
- **Type Guards:** Narrowing down a union type at runtime.
  - `typeof`, `instanceof`, and custom `is` guards.

**📝 Activities:**
1. Create `advanced-types.ts`. Write a variable `status` typed as `"active" | "inactive" | "pending"`. Try to assign it `"deleted"` and read the TypeScript error.
2. Write a nullable variable: `let supervisor: string | null = null`. Use `?.` to safely access a `.length` property on it without crashing.
3. Use `??` to provide a fallback: If `supervisor` is null, display `"No Supervisor Assigned"`.
4. Write a generic function `wrapInArray<T>(item: T): T[]` that takes any value and returns it in an array. Test it with a string, a number, and an Employee object.
5. Create an interface `FullEmployee`. Use `Omit<FullEmployee, 'passwordHash'>` to create a safe `PublicEmployee` type.
6. Open any TypeScript file in the HRIS frontend. Find at least one usage of `?.` or `??`. Copy it into your notes and explain why it is there.

---

### Lesson 4.4: Advanced Functions — Arguments, Arrow Functions, Callbacks & Closures
*Functions are the building blocks of all code. Understanding every facet of how functions work — how arguments flow in, how values flow out, and how functions can be stored inside other functions — is critical.*

- **Function Signatures in TypeScript:**
  - Named function: `function greet(name: string): string { ... }`
  - Arrow function: `const greet = (name: string): string => ...`
  - When to use which (arrow functions in React components and callbacks, named functions for hoisting).
- **Arguments deep-dive:**
  - Required vs Optional arguments: `function send(to: string, cc?: string)`
  - Default argument values: `function paginate(page: number = 1, size: number = 10)`
  - Rest parameters (`...args`): `function log(...messages: string[]): void` — accepts any number of arguments.
- **Return types and `void`:**
  - `void` — the function does something but returns nothing.
  - `never` — the function never returns (it throws an error or runs forever).
- **Higher-Order Functions:** Functions that take other functions as arguments or return functions.
  - `.map()`, `.filter()`, `.reduce()` are all higher-order functions.
  - `const filtered = employees.filter(emp => emp.isActive)` — `isActive` callback is passed in.
- **Closures:** A function that "remembers" the variables from its outer scope.
  - This is how React hooks work under the hood. `useState` uses closures to remember state between renders.
- **Immediately Invoked Function Expressions (IIFE):** `(() => { ... })()` — a function that runs immediately.
- **Async Functions:** `async function fetchEmployees(): Promise<Employee[]>` — always returns a Promise.
  - `await` pauses execution inside an async function until the Promise resolves.
  - Error handling with `try/catch` inside async functions.

**📝 Activities:**
1. Write a function `formatEmployee(name: string, department?: string, role: string = "Employee"): string` that returns a formatted description. Call it 3 times with different combinations of arguments.
2. Write a `rest parameter` function: `function logAll(...items: string[]): void` that logs each item. Call it with 1, 3, and 5 arguments.
3. Use `.filter()` on an `Employee[]` array to get only active employees. Use `.map()` to get only their names. Chain them together in one line.
4. Write a closure: Create a function `makeCounter()` that returns another function. Every time the returned function is called, it increments and returns a count. Demonstrate that two separate counters don't share state.
5. Write an `async` function `fetchUser(id: number): Promise<Employee>` that uses `await` and a `try/catch`. Simulate success with a resolved Promise and simulate failure with a rejected one.
6. Find a real async function in the HRIS frontend service files. Copy the function signature into your notes and explain what it does line by line.

---

### Lesson 4.5: JavaScript/TypeScript in Practice — Arrays, Objects & Patterns Used in HRIS
*This lesson bridges the gap between theory and what you will actually see in the HRIS codebase. These are the patterns you will encounter every single day.*

- **Destructuring:**
  - Array destructuring: `const [first, second] = myArray`
  - Object destructuring: `const { name, department } = employee`
  - Destructuring with renaming: `const { name: employeeName } = employee`
  - Destructuring function arguments: `function greet({ name, department }: Employee)`
- **Spread Operator (`...`):**
  - Copying arrays: `const copy = [...original]`
  - Merging objects: `const updated = { ...employee, department: "HR" }` — this is how you update state in React without mutating it.
- **Short-circuit evaluation:**
  - `&&` — `isLoggedIn && <Dashboard />` — renders the component only if logged in (used everywhere in React).
  - `||` — `name || "Anonymous"` — fallback value.
- **Template Literals:** `` `Hello, ${name}!` `` — building strings with embedded expressions.
- **`Array.reduce()` deep dive:** The most powerful array method — used to sum, group, or transform arrays into any shape.
- **Object methods:** `Object.keys()`, `Object.values()`, `Object.entries()` — iterating over objects.

**📝 Activities:**
1. Given an `employee` object, use destructuring to extract `name` and `department` into separate variables in a single line.
2. Create a copy of an employee object but with a different `department` using the spread operator. Verify the original is unchanged.
3. Write a `reduce()` function that counts how many employees are in each department and returns an object like `{ "HR": 3, "Dev": 5 }`.
4. Find a real usage of the spread operator (`...`) in the HRIS frontend (hint: look in form handlers or state updates). Copy it into your notes and explain why the spread was necessary.
5. Write a template literal that generates a full employee description: `"John Doe is a Software Engineer in the Development department."` from an object.

---

## ══════════════════════════════════════
## 🟠 UNIT 5: REACT.JS — THE FRAMEWORK
## ══════════════════════════════════════
*React is the JavaScript library used to build the HRIS frontend. It turns code into a living, interactive user interface.*

---

### Lesson 5.0: Frontend File & Folder Structure (The Blueprint)
*Before you write a single React component, you need to understand how to organize your code properly. A messy project is a broken project.*

- Why does folder structure matter? (Maintainability, scalability, onboarding new developers)
- The standard frontend structure used in professional React + TypeScript projects:
  - `src/components/` — Reusable UI components (buttons, cards, modals).
  - `src/components/ui/` — Base design system components (usually from Shadcn).
  - `src/features/` — Feature-based folders that group related components, hooks, and utils together (e.g., `features/employee/`, `features/auth/`).
  - `src/pages/` or `src/app/` — Top-level page components that represent a route.
  - `src/hooks/` — Custom React hooks (`useEmployees.ts`, `useAuth.ts`).
  - `src/lib/` — Utility functions, helpers (`utils.ts`, `cn.ts`).
  - `src/context/` — React Context providers for global state.
  - `src/types/` or inline interfaces — TypeScript type definitions.
  - `src/services/` or `src/api/` — Functions that call the backend API.
- When to use `.tsx` vs `.ts`:
  - `.tsx` — When the file contains JSX (returns HTML-like UI).
  - `.ts` — When the file is pure TypeScript logic with no visual output (hooks, utils, types, services).
- The **Feature Folder Pattern** (how HRIS does it): Each feature (Employee, Auth, Dashboard) has its own folder containing its own components, utils, and types. This means everything related to employees lives inside `features/employee/`.

**📝 Activities:**
1. Look at your HRIS project's `hris/src/` folder. Draw a text-based map of all its subdirectories and describe what each folder is for.
2. Open any `.tsx` file and any `.ts` file in the project. Explain in your notes why one has JSX and the other doesn't.
3. Find the `features/` folder in HRIS. Pick one feature folder (e.g., `employee`). List the files inside it and guess what each one does based on its name.
4. Look at `hris/src/lib/utils.ts`. What does the `cn()` function do? Why is it in `lib/` and not in `components/`?
5. In `web-notes.md`, write your own description of when you would use a `hooks/` folder vs a `utils/` folder.

---

### Lesson 5.1: React Components & JSX
- What is a Component? (A reusable piece of UI)
- JSX: Writing HTML inside JavaScript
- Functional components
- Exporting and importing components
- Passing data using `props`
- **Named exports vs Default exports** and when to use each.
- **Component file naming conventions**: PascalCase for components (`EmployeeCard.tsx`), camelCase for hooks and utils (`useEmployee.ts`, `formatDate.ts`).

**📝 Activities:**
1. In your `PRACTICE/frontend/` React app, set up the proper folder structure: `src/components/`, `src/features/`, `src/hooks/`, `src/lib/`.
2. Create a component called `EmployeeCard.tsx` inside `src/components/`. It should display a name and a department.
3. Render 3 `<EmployeeCard />` components in your `App.tsx`, each with different data passed as `props`.
4. Create a `Navbar.tsx` component with a logo text and 3 navigation links.
5. Create a `Footer.tsx` component with your name and the current year.
6. Style all 3 components using Tailwind CSS.
7. Add a TypeScript `interface` called `EmployeeCardProps` to properly type the `props` of your `EmployeeCard`.

---

### Lesson 5.2: React State & Hooks
- What is State? (Data that changes over time)
- `useState`: Reading and updating state
- `useEffect`: Running code when the component loads
- Re-renders and how React updates the UI
- **Custom Hooks**: Extracting logic out of components into reusable hook functions (e.g., `useEmployees.ts` that handles fetching and loading state).
- When to put logic in a **component** vs a **hook** vs a **utility function**.

**📝 Activities:**
1. Add a `useState` counter to your `App.tsx`. Show the count and add a button to increment it.
2. Create a component called `ToggleCard.tsx` that shows/hides a block of text when a button is clicked.
3. Add a `useState` that stores a list of employee names. Render the list on screen.
4. Add a button that adds a new fake name to the list and watch the UI update.
5. Use `useEffect` to run a `console.log("Component loaded!")` message when the page first loads.
6. Use `useEffect` to run code every time the counter changes and log the new value.
7. **Extract a custom hook:** Move the employee list `useState` and any related logic into a new file `src/hooks/useEmployeeList.ts`. Import and use it in your component. Verify it still works.

---

### Lesson 5.3: Fetching Data from an API
- What is `fetch()` and how does it work?
- `async` and `await` syntax
- Connecting React to your backend API
- Handling loading and error states
- **The `services/` or `api/` layer**: Why we don't call `fetch()` directly inside components. We create dedicated service files (e.g., `src/services/employeeService.ts`) that centralize all API calls.
- What is `axios` and how does it differ from `fetch()`?

**📝 Activities:**
1. In your practice backend, create a simple GET endpoint that returns a list of 3 fake employees as JSON.
2. Create a `src/services/employeeService.ts` file. Write a function `getEmployees()` inside it that uses `fetch()` to call the backend endpoint.
3. In your React frontend, use `useEffect` to call `getEmployees()` from the service file.
4. Store the returned employees in a `useState` variable and display them using `.map()`.
5. Add a loading message that shows while the data is being fetched.
6. Add an error message that shows if the fetch fails (test it by temporarily breaking the backend URL).

---

### Lesson 5.4: React Routing (Single Page Apps)
- What is React Router and Single Page Application (SPA) architecture?
- Setting up routes for Login, Dashboard, and Employees
- Navigating between pages using `<Link>` and `useNavigate`
- **Protected Routes**: How to prevent unauthenticated users from accessing certain pages.
- The `src/app/` or `src/pages/` pattern: Where your top-level page components live.

**📝 Activities:**
1. Install `react-router-dom` in your practice frontend.
2. Set up a simple routing system with two pages: "Home" and "Employees". Put these pages inside `src/pages/`.
3. Create a Navigation component with links to both pages.
4. Use `useNavigate` to redirect the user to the Employees page after a button click.
5. Create a simple `ProtectedRoute.tsx` component that checks if a `isLoggedIn` state is true. If not, redirect to a Login page.

---

## ══════════════════════════════════════════
## 🔵 UNIT 6: ASP.NET CORE & C# BASICS
## ══════════════════════════════════════════
*C# is the programming language used for the HRIS backend. ASP.NET Core is the framework that makes it a web server.*

---

### Lesson 6.0: Backend File & Folder Structure (The Blueprint)
*Just like the frontend, a well-organized backend is a maintainable backend. The HRIS project follows a professional layered architecture. Understanding this structure before writing code is critical.*

- The **Layered Architecture** of a professional .NET backend:
  - `Controllers/` — The entry point. Receives HTTP requests and sends back HTTP responses. **It does NOT contain business logic.**
  - `Services/` — The brain. Contains all the business logic. The Controller calls the Service.
  - `Repositories/` (optional) — The data layer. Handles direct database queries. The Service calls the Repository.
  - `Models/` — The C# classes that represent your database tables (also called Entities).
  - `DTOs/` — Data Transfer Objects. Simplified versions of Models designed to be sent to the client safely.
  - `Interfaces/` — Contracts that define what a Service or Repository must do (enables Dependency Injection).
  - `Migrations/` — Auto-generated files that track changes to your database schema.
  - `Program.cs` — The app's entry point. Configures services, middleware, and starts the server.
- **The Request Journey:** `HTTP Request → Controller → Service → Repository → Database → back up the chain`
- **Why this separation?** If your business logic is in the Controller, it becomes untestable and unmaintainable. The Service pattern ensures the Controller only handles HTTP concerns (input/output) and nothing else.
- **Naming conventions in C#:** Classes are `PascalCase`, methods are `PascalCase`, variables are `camelCase`, interfaces are prefixed with `I` (e.g., `IEmployeeService`).

**📝 Activities:**
1. Look at the `backend/` folder in HRIS-PAT. List all the subfolders and write one sentence describing what each one contains.
2. Open `EmployeesController.cs`. Find a method that calls a service. Trace the call — find the service it calls and what that service does.
3. Open any service file in HRIS-PAT. Read through it. Try to identify the database call (the line that talks to `_context` or `_repository`).
4. Find one `DTO` file in the project. Compare it to its corresponding `Model` file. Write down 3 differences (e.g., missing fields, renamed properties).
5. Open `Program.cs` in the HRIS backend. Find the section where services are registered (`builder.Services.Add...`). List 5 services you see registered there.

---

### Lesson 6.1: C# Fundamentals — Variables, Types & Syntax
*C# is a strongly-typed, object-oriented language. Every variable must have a declared type, every method must declare what it returns, and every class must declare its responsibilities. Let's learn the language from the ground up.*

- **Basic Types & Variable Declaration:**
  - `string name = "Patrick";` — text.
  - `int age = 25;` — whole numbers.
  - `double salary = 50000.50;` — decimal numbers.
  - `bool isActive = true;` — true or false.
  - `var` keyword: Let the compiler infer the type (`var name = "Patrick"` — C# knows it's a string).
  - Constants: `const int MaxRetries = 3;` — can never be changed after declaration.
- **Nullable Types — The `?` Operator:**
  - By default, value types in C# cannot be null. `int id = null` is a compile error!
  - `int? id = null;` — the `?` makes any type nullable.
  - `string? supervisor = null;` — reference types can also be explicitly nullable with `strictNullCheck` settings.
  - **Null-conditional operator (`?.`):** `employee?.Supervisor?.Name` — stops the chain if any part is null.
  - **Null-coalescing operator (`??`):** `string display = name ?? "Unknown";` — fallback if null.
  - **Null-coalescing assignment (`??=`):** `name ??= "Default";` — only assigns if the variable IS null.
  - `if (value is null)` vs `if (value == null)` — the modern C# pattern-based null check.
- **Collections:**
  - `List<string> names = new List<string>();` — a resizable array.
  - `Dictionary<string, int>` — a key-value pair store (like a lookup table).
  - `IEnumerable<T>` — the base interface for anything you can loop over.
  - Array: `string[] roles = { "Admin", "Viewer", "Creator" };`
- **Control Flow:**
  - `if/else if/else`, `switch`, `switch expressions` (modern C#).
  - `for`, `foreach`, `while` loops.
  - `break`, `continue`, `return`.
- **String Manipulation:**
  - String interpolation: `$"Hello, {name}!"` — the C# equivalent of JS template literals.
  - `string.IsNullOrEmpty(value)` and `string.IsNullOrWhiteSpace(value)` — the safe null checks.
  - `.ToLower()`, `.Trim()`, `.Contains()`, `.StartsWith()`, `.Split()`.

**📝 Activities:**
1. In `PRACTICE/backend/`, create a new .NET Console App. Declare 5 variables of different types. Print them using `$"..."` string interpolation.
2. Declare a `string? supervisor = null`. Use `?.` and `??` to safely print either the supervisor's length or `"No Supervisor"`.
3. Create a `List<string>` of 5 department names. Loop through them with `foreach`. Filter the list to only print names that start with "D".
4. Write an `if/else` that checks if an employee's salary is above 50,000 and prints different messages.
5. Write a `switch` expression (modern C# style) that maps a string role to an integer access level: `"SuperAdmin" => 1`, `"Admin" => 2`, `"Viewer" => 3`.

---

### Lesson 6.1b: C# Classes, Methods & Object-Oriented Programming
*Object-Oriented Programming (OOP) is the heart of C#. Everything in C# is a class. Understanding classes, constructors, methods, and inheritance is non-negotiable.*

- **Classes & Objects:**
  - A `class` is a blueprint. An `object` is an instance of that blueprint.
  - `public class Employee { ... }` — defines the blueprint.
  - `var emp = new Employee();` — creates an instance (object) from the blueprint.
- **Properties vs Fields:**
  - A **field** is a raw variable: `private string _name;` (private, internal storage).
  - A **property** is a controlled accessor with `get` and `set`: `public string Name { get; set; }`.
  - **Auto-properties:** `public string Name { get; set; }` — shorthand.
  - **Init-only properties:** `public string Name { get; init; }` — can only be set during construction. Immutable after that.
  - **Computed property:** `public string FullName => $"{FirstName} {LastName}";` — no setter, calculated on demand.
- **Access Modifiers:**
  - `public` — accessible from anywhere.
  - `private` — accessible only inside this class. Fields that store internal state should always be private.
  - `protected` — accessible inside this class and any class that inherits from it.
  - `internal` — accessible only within the same project/assembly.
  - `private readonly` — the most common pattern for injected dependencies: can only be set in the constructor, never changed again.
- **Constructors:**
  - A special method that runs when you `new` up an object.
  - `public EmployeeService(AppDbContext context) { _context = context; }` — this is how Dependency Injection works!
  - Primary constructors (C# 12): `public class EmployeeService(AppDbContext context)` — shorthand.
- **Methods:**
  - `public string GetFullName() { return $"{FirstName} {LastName}"; }` — a method with a return type.
  - `public void Deactivate() { IsActive = false; }` — a `void` method returns nothing.
  - **Method overloading:** Having two methods with the same name but different parameters.
- **Inheritance & Interfaces:**
  - `class Manager : Employee` — Manager inherits from Employee.
  - `interface IEmployeeService { Task<List<Employee>> GetAllAsync(); }` — a contract with no implementation.
  - A class implements an interface: `class EmployeeService : IEmployeeService`.
  - **Why interfaces?** They allow you to swap implementations without changing the code that uses them (Dependency Injection depends on this).

**📝 Activities:**
1. Write a `class Employee` with properties: `Id`, `FullName`, `Department`, `IsActive`. Add a computed property `StatusLabel` that returns `"Active"` or `"Inactive"` based on `IsActive`.
2. Add a constructor that requires `Id` and `FullName`. Make `Department` optional in the constructor with a default of `"Unassigned"`.
3. Add a method `Deactivate()` that sets `IsActive = false` and prints a message. Call it on an instance.
4. Create an `interface IGreetable` with one method `string Greet()`. Make your `Employee` class implement it.
5. Create a `Manager` class that inherits from `Employee`. Add a `TeamSize` property specific to `Manager`. Create an instance of it.
6. Open any `*Service.cs` file in HRIS-PAT. Identify: the constructor, the injected dependencies (`private readonly`), and one method. Write an explanation of what each part does.

---

### Lesson 6.1c: Async/Await, Task<T> & LINQ — The Power Tools of C#
*These are the three most commonly misunderstood but most important concepts in modern C# backend development. HRIS uses all three of them heavily.*

- **Why Async Matters:**
  - When your backend queries a database, it has to wait. If your code is synchronous, the entire thread is blocked — no other requests can be served.
  - `async` and `await` let the thread go do other work while waiting for the database to respond.
  - Rule: If a method calls `await` inside it, it must be marked `async`. And it must return `Task` (void) or `Task<T>` (with a return value).
- **`Task<T>` — The Promise of C#:**
  - `Task<List<Employee>>` means "I promise to return a list of employees... eventually."
  - It is the C# equivalent of `Promise<Employee[]>` in TypeScript.
- **The Async Pattern in HRIS:**
  - Controller calls: `var employees = await _employeeService.GetAllAsync();`
  - Service calls: `var result = await _context.Employees.ToListAsync();`
  - Every method in the chain must be `async` and `await` the one below it.
- **LINQ (Language Integrated Query):**
  - LINQ lets you query collections using readable, SQL-like syntax directly in C#.
  - **Method syntax (most common in HRIS):**
    - `.Where(e => e.IsActive)` — filter: like SQL `WHERE`.
    - `.Select(e => e.Name)` — project: like SQL `SELECT`.
    - `.FirstOrDefault(e => e.Id == id)` — find one or return null.
    - `.OrderBy(e => e.Name)` / `.OrderByDescending(e => e.Salary)`.
    - `.Any(e => e.IsAdmin)` — returns `true` if at least one matches.
    - `.Count(e => e.IsActive)` — count matching items.
    - `.ToList()` / `.ToListAsync()` — materialize the query into a real list.
  - **LINQ on EF Core (Database queries):** When you use LINQ on a `DbSet<T>`, EF Core translates it into actual SQL under the hood!
  - `_context.Employees.Where(e => e.Department == "Dev").ToListAsync()` → generates `SELECT * FROM Employees WHERE Department = 'Dev'`.

**📝 Activities:**
1. Write an `async Task<string> GetGreetingAsync(string name)` method that uses `await Task.Delay(500)` to simulate a wait, then returns a greeting string. Call it from `Main` using `await`.
2. Create a `List<Employee>` with 5 employees (mix of active/inactive, different departments). Use LINQ to:
   - Get only active employees.
   - Get only the names of employees in "Development".
   - Check if any employee is an admin.
   - Count how many employees are inactive.
3. Chain LINQ: In one expression, get all active employees in "Development", ordered by name, and select only their names as a `List<string>`.
4. Open any `*Service.cs` in HRIS-PAT. Find one LINQ query. Copy it into your notes and translate it into plain English: *"Find all employees where..."*
5. Look at a service method that is `async`. Trace every `await` keyword in it. What is it waiting for? Write it in your notes.

---


### Lesson 6.2: ASP.NET Core Controllers & Routing
- Creating a Web API project with `dotnet new webapi`
- What is a Controller? (How it handles requests)
- HTTP Verbs in C#: `[HttpGet]`, `[HttpPost]`, `[HttpPut]`, `[HttpDelete]`
- Route parameters: `[HttpGet("{id}")]` and `[FromBody]` for request bodies
- **The Controller's only job:** Receive the request, validate it, call the appropriate Service method, and return the result. Nothing more.
- **`[ApiController]` attribute**: What it does and why it's always at the top of a Controller.
- **Swagger Documentation:** How ASP.NET Core automatically generates documentation for your endpoints.
- Returning `Ok()`, `NotFound()`, `BadRequest()`, `CreatedAtAction()`

**📝 Activities:**
1. Create a new Web API project inside `PRACTICE/backend/`. Run it and see the default weather API.
2. Create a new `EmployeeController.cs` in a `Controllers/` folder. Write a `[HttpGet]` method that returns the list of 3 fake employees.
3. Write a `[HttpGet("{id}")]` method that returns a single employee by their ID. Return `NotFound()` if the ID doesn't exist.
4. Write a `[HttpPost]` method that accepts a new employee via `[FromBody]` and adds it to the list.
5. Test all your endpoints using the built-in Swagger UI (`/swagger`).
6. **Advanced:** Try to add XML comments (`///`) to your controller methods and see if they appear in Swagger.
7. Add proper routing by decorating the controller with `[Route("api/[controller]")]`.

---

### Lesson 6.3: The Service Pattern — The Brain of the Backend
- **Why Controllers must be thin:** A Controller that contains business logic is a code smell. It becomes unmaintainable, untestable, and violates the Single Responsibility Principle.
- **What goes in a Service?** All the "thinking" — validation logic, calculations, rules, data transformation.
- Creating an `EmployeeService.cs` in a `Services/` folder.
- **Interfaces (`IEmployeeService`):** Why we define a contract (interface) before writing the implementation. This allows for easy testing and swapping of implementations.
- **Dependency Injection (DI):** ASP.NET Core's built-in system for giving a class the dependencies it needs without it having to create them itself. The service is "injected" into the constructor.
- **Lifetime scopes:** `AddSingleton` (one for the whole app), `AddScoped` (one per HTTP request), `AddTransient` (new one every time). Why does it matter?

**📝 Activities:**
1. Create a `Services/` folder. Create `IEmployeeService.cs` interface with method signatures for: `GetAll()`, `GetById(int id)`, `Create(Employee employee)`.
2. Create `EmployeeService.cs` that implements `IEmployeeService`. Move all the logic from your controller here.
3. Register your service in `Program.cs` using `builder.Services.AddScoped<IEmployeeService, EmployeeService>()`.
4. Inject `IEmployeeService` into your `EmployeeController` via the constructor (`private readonly IEmployeeService _employeeService;`).
5. Verify your endpoints still work the same way after the refactor.
6. Open HRIS-PAT's `backend/` folder. Find a real service file. Compare its structure to what you built. What is it doing that yours isn't?

---

### Lesson 6.4: Data Transfer Objects (DTOs) — The Secure Messengers
- **Why we don't return raw Database Entities to the client:** Security (exposing password hashes, internal IDs), Over-fetching (sending 30 fields when the frontend only needs 3), and Breaking Changes (your database model might change but your API contract should stay stable).
- Creating `DTOs/` folder and DTO classes in C#.
- **Request DTOs vs Response DTOs:** A `CreateEmployeeRequest.cs` (what the client sends in) vs an `EmployeeResponse.cs` (what we send back out).
- Manually mapping an Entity to a DTO.
- Introduction to **AutoMapper** as a tool to automate this mapping.

**📝 Activities:**
1. Create a `DTOs/` folder. Create `EmployeeResponseDto.cs` that only exposes `Id`, `Name`, and `Department`.
2. Create `CreateEmployeeRequestDto.cs` that defines what fields a client must send to create a new employee.
3. Update your `EmployeeService` to return `EmployeeResponseDto` instead of the raw `Employee` model.
4. Update your `EmployeeController`'s POST method to accept `CreateEmployeeRequestDto` instead of the raw model.
5. Verify that your Swagger UI now shows the correct request and response shapes.
6. Look at the HRIS-PAT project. Find a real DTO file. Does it match a model file exactly? What fields are missing and why do you think they were removed?

---

## ══════════════════════════════════════════
## 🔵 UNIT 7: DATABASE & ENTITY FRAMEWORK CORE
## ══════════════════════════════════════════
*Your data needs to be saved permanently. PostgreSQL is the database. Entity Framework Core (EF Core) is how C# talks to it.*

---

### Lesson 7.1: PostgreSQL & The .env File
- Installing PostgreSQL and creating a database
- Connection strings (what they look like and what each part means)
- What is a `.env` file? Why do we hide secrets there?
- Using `DotNetEnv` to load `.env` in .NET

**📝 Activities:**
1. Open pgAdmin and create a new database called `hris_practice`.
2. Create a `.env` file in your practice backend. Add a connection string: `DB_CONNECTION=Host=localhost;Database=hris_practice;Username=postgres;Password=yourpassword`.
3. Install the `DotNetEnv` NuGet package and load the `.env` in `Program.cs`.
4. Print the connection string to the console to verify it loaded correctly.
5. Look at the `.env.example` in HRIS-PAT. Write in your notes what each key means.

---

### Lesson 7.2: Entity Framework Core & Migrations
- Installing EF Core and the Npgsql provider
- Creating a `DbContext` and `DbSet`
- What is a Migration? (Code that creates/changes database tables)
- Running `dotnet ef migrations add` and `dotnet ef database update`

**📝 Activities:**
1. Install EF Core NuGet packages in your practice backend.
2. Create an `AppDbContext.cs` with a `DbSet<Employee>`.
3. Register the `DbContext` in `Program.cs` using your `.env` connection string.
4. Run `dotnet ef migrations add InitialCreate` and inspect the generated migration file.
5. Run `dotnet ef database update` and verify the table was created in pgAdmin.
6. Add a new property to your `Employee` model, create a new migration, and update the database.

---

### Lesson 7.3: Database Seeding
- What is Seeding? (Auto-creating default data)
- Writing an idempotent seed (runs safely multiple times without duplicates)
- Seeding admin users, roles, and default data

**📝 Activities:**
1. Write a `SeedDatabase.cs` class that checks if an employee exists before creating one.
2. Call your seed method in `Program.cs` after migrations run.
3. Add seed data for 3 employees and verify they appear in pgAdmin.
4. Run the app twice and confirm the seed data is NOT duplicated.
5. Look at the HRIS-PAT `SeedDatabase.cs`. Find one thing your version is missing and add it.

---

## ══════════════════════════════════════════
## 🟣 UNIT 8: AUTHENTICATION (LOGIN SYSTEM)
## ══════════════════════════════════════════
*Authentication is the process of verifying who a user is. HRIS uses JWT tokens for this.*

---

### Lesson 8.1: Understanding JWT
- What is a JWT (JSON Web Token)?
- The 3 parts of a JWT: Header, Payload, Signature
- How login flow works: Request → Verify → Return Token
- Reading a JWT at `https://jwt.io`

**📝 Activities:**
1. Log into your HRIS frontend. Open Developer Tools → Application → Local Storage. Find the JWT token stored there.
2. Copy that token and paste it into `https://jwt.io`. Read the decoded payload and describe what you see.
3. In `web-notes.md`, write down what `exp`, `sub`, and any role/claim fields you see in the token mean.
4. Let the token expire by waiting or changing your computer clock. Try to use the app and observe what happens.
5. Research: What is the difference between `localStorage` and `sessionStorage`? Which is safer for storing tokens?

---

### Lesson 8.2: Implementing JWT in .NET
- Installing Microsoft.AspNetCore.Authentication.JwtBearer
- Configuring JWT in `Program.cs`
- Generating a token on login
- Protecting endpoints with `[Authorize]`

**📝 Activities:**
1. Add JWT authentication to your practice backend's `Program.cs`.
2. Create a `AuthController.cs` with a `/api/auth/login` POST endpoint that accepts email and password.
3. If the credentials match a hardcoded user, return a generated JWT token.
4. Add `[Authorize]` to your `EmployeeController`. Test that accessing it without a token returns 401.
5. Use Swagger to authenticate with your token and test that authorized access works.

---

## ══════════════════════════════════════════════
## 🟣 UNIT 9: SHADCN UI — PREMIUM COMPONENTS
## ══════════════════════════════════════════════
*Shadcn UI is the component library used in HRIS to replace the default React Admin components.*

---

### Lesson 9.1: Installing & Using Shadcn
- What is Shadcn UI and how is it different from other libraries?
- Installing Shadcn in a Vite + React + Tailwind project
- Understanding the `cn()` utility function (merging Tailwind classes safely)
- Using your first Shadcn components: `Button`, `Card`, `Input`, `Badge`

**📝 Activities:**
1. Install Shadcn UI in your practice frontend following the official docs.
2. Add a `<Button>` component from Shadcn to your app. Try all its variants: `default`, `outline`, `ghost`, `destructive`.
3. Build an Employee Card using Shadcn's `<Card>` component with a title, description, and a `<Badge>` for the department.
4. Add a Shadcn `<Input>` and `<Button>` to create a basic search bar (no functionality yet, just the UI).
5. Look at the `cn()` function in the HRIS project (`hris/src/lib/utils.ts`). Copy it to your practice project and use it on a component.

---

### Lesson 9.2: Building Real UI from HRIS
- Shadcn `<Table>` component
- Shadcn `<Dialog>` (modal windows)
- Shadcn `<Select>` (dropdown menus)

**📝 Activities:**
1. Build a full employee list table using Shadcn's `<Table>` with columns: Name, Department, Position, Status.
2. Add a Shadcn `<Badge>` to the Status column that is green for "Active" and red for "Inactive".
3. Add a "View Details" button on each row. When clicked, open a Shadcn `<Dialog>` with the employee's details.
4. Add a `<Select>` dropdown to filter the table by department.
5. Connect your table to the real API from your practice backend and display live data.

---

### Lesson 9.3: Advanced Forms and Validation
- React Hook Form for managing form state efficiently
- Zod for schema validation
- Connecting Zod to Shadcn UI forms

**📝 Activities:**
1. Install React Hook Form and Zod in your practice frontend.
2. Build a registration form using Shadcn UI's `<Form>` components.
3. Add validation rules: Name must be at least 3 characters, email must be valid.
4. Try to submit the form with invalid data and verify that error messages appear.

---

## ══════════════════════════════════════════════
## 🟤 UNIT 10: FINAL PROJECT (MINI HRIS)
## ══════════════════════════════════════════════
*Put everything together. Build a mini version of the HRIS with a frontend, a backend, and a real database.*

---

### Final Project: Mini Employee Management System
**Requirements:**
- A React + TypeScript + Tailwind + Shadcn frontend.
- An ASP.NET Core + EF Core + PostgreSQL backend.
- A JWT-protected login page.
- An employee list page that fetches from the backend.
- The ability to add a new employee (POST request + form).

**📝 Deliverables:**
1. A working login page with real JWT authentication.
2. An employees page that lists all employees from the database.
3. A "Create Employee" form that saves data to the database.
4. A status badge that shows if the employee is Active or Inactive.
5. A delete button that removes an employee from the database.
6. A `.env` file for the backend and `.env` for the frontend (not committed to GitHub).
7. A `README.md` file explaining how to set up and run your mini project.

---

## ══════════════════════════════════════════════════════════════════
## 🟢 UNIT 11: TESTING — ENSURING YOUR CODE ACTUALLY WORKS
## ══════════════════════════════════════════════════════════════════
*Anyone can write code that works once. Professional developers write code that still works after changes, refactors, and bug fixes. Tests are the safety net.*

---

### Lesson 11.1: Frontend Testing with Jest & React Testing Library
- **What is a Unit Test?** (Testing one small piece of code in isolation)
- **What is Integration Testing?** (Testing multiple pieces working together)
- **Test structure:** Arrange (set up), Act (do something), Assert (verify the result)
- Installing Jest and React Testing Library in a React project
- Testing React components without rendering them in a browser
- **Mocking:** Replacing real functions with fake versions during testing (e.g., fake API calls)

**📝 Activities:**
1. In your practice frontend, install Jest and React Testing Library.
2. Write a test for a simple utility function (e.g., `formatCurrency(100)` should return `"$100.00"`).
3. Write a test for your `EmployeeCard` component. Assert that it displays the employee's name on screen.
4. Mock an API call in a test. Create a test that verifies your component shows a loading state, then displays data.
5. Write a test that verifies clicking a button calls a mock function (testing component interaction).
6. Run your tests and see them pass: `npm test`.

---

### Lesson 11.2: Backend Testing with xUnit & Moq
- **Unit testing C# code:** Creating a test project alongside your main project
- **Naming conventions:** `EmployeeServiceTests.cs` for testing `EmployeeService.cs`
- **Mocking dependencies:** Using `Moq` to fake the database/repository
- **Test fixtures:** Reusable setup code (`[SetUp]` or `[Fact]`)
- **Assertions in xUnit:** `Assert.Equal()`, `Assert.True()`, `Assert.Throws()`

**📝 Activities:**
1. Create a new `EmployeeServiceTests` project in `PRACTICE/backend/`.
2. Write a test: `GetAllAsync_ReturnsActiveEmployees()` that mocks the repository and tests that the service filters correctly.
3. Write a test for your `CreateAsync` method. Mock the repository's `Add()` call and verify it was called.
4. Write a test that verifies an exception is thrown when creating a duplicate employee.
5. Run your tests: `dotnet test` and see them pass.

---

### Lesson 11.3: End-to-End Testing (E2E)
- **What is E2E Testing?** (Testing the entire application flow from frontend to backend to database)
- **Tools:** Playwright or Cypress
- **When to write E2E tests:** Critical user flows (login, create employee, submit form)
- **Why E2E tests are slower:** They start the whole app and interact with it like a real user would.

**📝 Activities:**
1. Install Playwright (or Cypress) in your frontend.
2. Write an E2E test that:
   - Logs into the application
   - Navigates to the employee list
   - Creates a new employee
   - Verifies the employee appears in the list
3. Run the test and watch it execute the entire flow in a real browser.
4. Add a test for error handling: try to create an employee with invalid data and verify the error message appears.

---

### Lesson 11.4: Test-Driven Development (TDD) & Coverage
- **What is Test-Driven Development?** (Write tests FIRST, then write code to pass them)
- **Red-Green-Refactor cycle:** Write a failing test (Red) → Write code to pass it (Green) → Clean up (Refactor)
- **Code Coverage:** What percentage of your code is tested? Tools: `nyc` for JavaScript, `coverlet` for C#.
- **Coverage goals:** Aim for 80%+ coverage on critical paths, not 100% (some code doesn't need tests).

**📝 Activities:**
1. Pick a new feature you want to build. Write 3 tests FIRST for that feature (they will fail).
2. Write the minimum code needed to make those tests pass.
3. Refactor your code to make it cleaner while keeping the tests passing.
4. Run coverage reports: `npm test -- --coverage` (frontend) and `dotnet test /p:CollectCoverage=true` (backend).
5. Identify a function in your code with 0% coverage. Write a test for it.

---

## ══════════════════════════════════════════════════════════════════════
## 🟠 UNIT 12: DEPLOYMENT & CONTAINERIZATION WITH DOCKER
## ══════════════════════════════════════════════════════════════════════
*Your app running on your machine is one thing. Your app running reliably on a server for thousands of users is a different challenge. Containers solve this.*

---

### Lesson 12.1: Docker Fundamentals
- **What is Docker?** (A container — a lightweight, isolated environment that packages your app and all its dependencies)
- **Images vs Containers:** An image is a blueprint; a container is a running instance.
- **Dockerfile:** The recipe that tells Docker how to build an image.
- **Basic Dockerfile commands:** `FROM`, `COPY`, `RUN`, `EXPOSE`, `CMD`

**📝 Activities:**
1. Install Docker Desktop for your operating system.
2. Create a `Dockerfile` for your practice frontend React app:
   - Start from `node:20-alpine` image
   - Copy your source code in
   - Run `npm install` and `npm run build`
   - Use `nginx` as the web server
3. Build the image: `docker build -t my-frontend .`
4. Run a container from that image: `docker run -p 3000:80 my-frontend`
5. Visit `http://localhost:3000` and verify your app is running inside a container.

---

### Lesson 12.2: Containerizing the Backend
- Creating a `.NET` Dockerfile
- Multi-stage builds (build in one stage, run in another for a smaller image)
- Exposing ports from a container

**📝 Activities:**
1. Create a `Dockerfile` for your practice .NET backend:
   - Start from `mcr.microsoft.com/dotnet/sdk:10.0` for building
   - Publish the app with `dotnet publish`
   - Use `mcr.microsoft.com/dotnet/aspnet:10.0` as the runtime image
   - Expose port `5107`
2. Build the image: `docker build -t my-backend .`
3. Run it: `docker run -p 5107:5107 my-backend`
4. Verify your backend API is accessible from outside the container.

---

### Lesson 12.3: Docker Compose (Multi-Container Orchestration)
- **What is Docker Compose?** (A tool to run multiple containers together as a service)
- `docker-compose.yml` syntax
- **Services:** Frontend, Backend, Database
- **Networks:** How containers talk to each other (all containers in a compose are on the same network)
- **Volumes:** Persisting data (e.g., the database doesn't lose data when the container stops)
- **Environment variables:** `.env` file for compose

**📝 Activities:**
1. Create a `docker-compose.yml` file with 3 services:
   - `frontend`: Your React app (expose port 3000)
   - `backend`: Your .NET API (expose port 5107)
   - `postgres`: A PostgreSQL database (expose port 5432)
2. Link the backend to the database using `depends_on` and environment variables.
3. Run the whole stack: `docker-compose up`
4. Verify all 3 containers are running: `docker ps`
5. Test the entire flow: frontend → backend → database.
6. Stop everything: `docker-compose down`

---

### Lesson 12.4: Pushing to a Docker Registry (Hub/Container Registry)
- What is Docker Hub?
- Tagging images: `docker tag my-backend username/my-backend:latest`
- Pushing images: `docker push username/my-backend`
- Using images from a registry: `docker pull username/my-backend`

**📝 Activities:**
1. Create a Docker Hub account (free).
2. Tag your backend image: `docker tag my-backend yourusername/my-backend:1.0`
3. Push it: `docker push yourusername/my-backend:1.0`
4. Verify it appears on Docker Hub in your account.
5. From a different folder, pull it back: `docker pull yourusername/my-backend:1.0` and run it.

---

## ══════════════════════════════════════════════════════════════════════
## 🔵 UNIT 13: SECURITY BEST PRACTICES
## ══════════════════════════════════════════════════════════════════════
*Users trust you with their data. Security is not optional. It is the foundation of every feature.*

---

### Lesson 13.1: Password Security & Hashing
- **Why storing passwords in plain text is catastrophic:** If the database is leaked, every user's password is compromised.
- **Password hashing:** Converting a password into a one-way string using an algorithm (`bcrypt`, `Argon2`, `PBKDF2`).
- **Salting:** Adding randomness to make dictionary attacks impossible.
- **Implementing password hashing in C#:** Using `BCrypt.Net` NuGet package.

**📝 Activities:**
1. Install `BCrypt.Net-Next` NuGet package in your backend.
2. In your `User` model, replace `Password` with `PasswordHash`.
3. When a user registers, hash the password: `string hash = BCrypt.Net.BCrypt.HashPassword(password);`
4. When a user logs in, verify: `bool isValid = BCrypt.Net.BCrypt.Verify(incomingPassword, storedHash);`
5. Try to view the database. Confirm the passwords are hashed, not plaintext.

---

### Lesson 13.2: Input Validation & SQL Injection Prevention
- **What is SQL Injection?** (An attacker types SQL code into an input field to bypass security)
- **Example:** Login form: Username: `admin' --` password: (anything) — this might let them in without a password!
- **Prevention:** Never concatenate user input into SQL queries. Use **parameterized queries** (which Entity Framework Core does automatically).
- **Frontend validation:** Catching basic mistakes early (email format, required fields).
- **Backend validation:** Never trust frontend validation. Always validate on the backend.

**📝 Activities:**
1. In your `EmployeeService`, write a method that validates a new employee:
   - Name must not be null or empty
   - Email must be a valid email format
   - Age must be between 18 and 80
2. Throw `ArgumentException` with descriptive messages if validation fails.
3. Call this validation in your `CreateAsync` method before saving.
4. Test by trying to create an employee with invalid data from your frontend and verify the error is caught.
5. Verify that all your LINQ queries use parameterized queries (they should, but check).

---

### Lesson 13.3: CORS & API Security
- **What is CORS (Cross-Origin Resource Sharing)?** (A security policy that prevents websites from randomly accessing your API)
- **Why it exists:** Without CORS, a malicious website could trick a user's browser into sending requests to your API.
- **Configuring CORS in ASP.NET Core:** In `Program.cs`, add specific allowed origins (never use `*` in production).
- **HTTP Headers:** `Authorization`, `X-API-Key`, custom headers for security.

**📝 Activities:**
1. In your backend's `Program.cs`, add CORS:
   ```csharp
   builder.Services.AddCors(options => options.AddPolicy("AllowFrontend", policy =>
       policy.WithOrigins("http://localhost:3000")
           .AllowAnyMethod()
           .AllowAnyHeader()
   ));
   app.UseCors("AllowFrontend");
   ```
2. In your frontend, add a custom API header. Update your fetch/axios to include: `headers: { "X-Custom-Header": "MySecret" }`
3. In your backend, verify the header is present in requests.
4. Change the allowed origin to a wrong domain and confirm the frontend can't reach the backend.

---

### Lesson 13.4: Secrets Management & Environment Variables
- **What are Secrets?** (API keys, database passwords, JWT keys — anything that grants access)
- **Why environment variables?** (Keeping secrets out of your code, which gets committed to GitHub)
- **`.env` files:** Not committed to version control; loaded at runtime.
- **In production:** Using a secrets manager (AWS Secrets Manager, Azure Key Vault, HashiCorp Vault).

**📝 Activities:**
1. Create a `.env` file in your backend with: `JWT_SECRET=your-super-secret-key-min-32-chars` and `DB_PASSWORD=yourpostgrespassword`.
2. Load these in `Program.cs` using `DotNetEnv` or `IConfiguration`.
3. Use the JWT_SECRET when generating and validating tokens.
4. Add `.env` to your `.gitignore` and create `.env.example` with placeholder values.
5. Research: What does your production environment (if you deploy) use for secrets management?

---

### Lesson 13.5: HTTPS & Transport Security
- **What is HTTPS?** (HTTP with encryption using SSL/TLS certificates)
- **Why it matters:** Without HTTPS, anyone on the same network can intercept your API requests and steal data.
- **Self-signed certificates for development** (`dotnet dev-certs https`)
- **Let's Encrypt for production:** Free SSL certificates.

**📝 Activities:**
1. Generate a development certificate: `dotnet dev-certs https --trust`
2. Start your backend and visit `https://localhost:5107` (notice the `https`).
3. In your frontend, update the API base URL to `https://localhost:5107`.
4. Verify requests work over HTTPS.
5. Research: How do you get an SSL certificate for production? (Hint: Let's Encrypt is free.)

---

## ══════════════════════════════════════════════════════════════════════════
## 🟣 UNIT 14: MONITORING, LOGGING & PERFORMANCE OPTIMIZATION
## ══════════════════════════════════════════════════════════════════════════
*A fast app is a good app. A slow app frustrates users and wastes money on servers. Logging helps you find problems.*

---

### Lesson 14.1: Structured Logging
- **What is a Log?** (A timestamped record of what your app is doing)
- **Log Levels:** `Debug`, `Information`, `Warning`, `Error`, `Critical`
- **Structured Logging:** Logs with machine-readable fields (not just text blobs)
- **Serilog in C#:** Writing structured logs that can be searched and filtered
- **Log aggregation:** Collecting logs from all your servers in one place (tools: ELK Stack, Splunk, DataDog)

**📝 Activities:**
1. Install `Serilog` and `Serilog.Sinks.Console` NuGet packages.
2. Configure Serilog in `Program.cs`:
   ```csharp
   Log.Logger = new LoggerConfiguration()
       .MinimumLevel.Information()
       .WriteTo.Console()
       .CreateLogger();
   ```
3. Inject `ILogger<T>` into your service and log key events:
   - `_logger.LogInformation("Fetching {count} employees", count);`
   - `_logger.LogError(ex, "Failed to create employee");`
4. Run your app and watch logs appear in the console with timestamps.
5. Change the minimum level to `Debug` and see more detailed logs.

---

### Lesson 14.2: Exception Handling & Error Reporting
- **Global exception handlers:** Catching ALL unhandled errors in one place (middleware)
- **Returning safe error responses:** Never expose stack traces to users (security risk)
- **Error tracking services:** Services like Sentry that collect and alert you to errors in production

**📝 Activities:**
1. In your `Program.cs`, add global exception handling middleware:
   ```csharp
   app.UseExceptionHandler(errorApp =>
   {
       errorApp.Run(async context =>
       {
           var exception = context.Features.Get<IExceptionHandlerPathFeature>()?.Error;
           _logger.LogError(exception, "Unhandled exception");
           context.Response.StatusCode = 500;
           await context.Response.WriteAsJsonAsync(new { message = "Internal server error" });
       });
   });
   ```
2. Throw an unhandled exception in a controller and verify it's caught and logged.
3. (Optional) Install `Sentry.AspNetCore` and set up error reporting to Sentry's free tier.

---

### Lesson 14.3: Frontend Performance — Code Splitting & Lazy Loading
- **Bundle size:** If your JavaScript bundle is 500KB, users have to download it all before your app runs.
- **Code splitting:** Splitting your bundle into smaller chunks that load on demand.
- **Lazy loading:** Loading a component or route only when the user needs it.
- **React.lazy()** and `<Suspense>` — how to lazy load components in React.

**📝 Activities:**
1. In your practice frontend, use `React.lazy()` to lazy load a component:
   ```jsx
   const EmployeeListPage = React.lazy(() => import('./pages/EmployeeListPage'));
   ```
2. Wrap it with `<Suspense fallback={<div>Loading...</div>}>` in your router.
3. Run `npm run build` and check the bundle size with `npm run build -- --stats`.
4. Use dynamic imports for routes: ` const route = { path: '/employees', lazy: () => import('./pages/EmployeeList') };`

---

### Lesson 14.4: Backend Performance — Database Queries & Caching
- **N+1 Queries:** A common performance trap where you load a list of employees (1 query) then load each one's department (N more queries). Total: N+1 queries!
- **Solution: Eager Loading:** Using `Include()` in EF Core to load related data in one query.
- **Caching:** Storing frequently accessed data in memory so you don't hit the database repeatedly.
- **Redis:** An in-memory data store for caching. (Advanced, but good to know about.)

**📝 Activities:**
1. Write a LINQ query that loads employees with their department in ONE query:
   ```csharp
   var employees = await _context.Employees.Include(e => e.Department).ToListAsync();
   ```
2. Compare it to loading without `Include()` and observe the difference in the database logs.
3. (Optional) Install `StackExchange.Redis` and implement a simple cache decorator for your service:
   ```csharp
   public async Task<List<Employee>> GetAllAsync()
   {
       var cacheKey = "all_employees";
       var cached = _cache.Get<List<Employee>>(cacheKey);
       if (cached != null) return cached;
       
       var data = await _context.Employees.ToListAsync();
       _cache.Set(cacheKey, data, TimeSpan.FromMinutes(5));
       return data;
   }
   ```

---

### Lesson 14.5: Profiling & Identifying Bottlenecks
- **Load Testing:** Simulating many users hitting your app at once to see where it breaks.
- **Frontend profiling:** Using browser DevTools to find slow JavaScript.
- **Backend profiling:** Using application insights or log analysis to find slow database queries.
- **Identifying the bottleneck:** Is it slow because of frontend rendering, slow API calls, or slow database queries?

**📝 Activities:**
1. In your browser DevTools, go to Performance tab. Click record, use your app, then stop. Analyze what took the longest.
2. Add intentional delays to your API calls and see how it affects the user experience.
3. In your backend, add timing logs:
   ```csharp
   var sw = Stopwatch.StartNew();
   var result = await _context.Employees.ToListAsync();
   _logger.LogInformation("Query took {ms}ms", sw.ElapsedMilliseconds);
   ```
4. Identify which of your queries is slowest and optimize it with an index or eager loading.
5. Use a tool like Apache JMeter or `hey` to load test your backend: `hey -n 1000 -c 10 http://localhost:5107/api/employees`

---

## ═══════════════════════════════════════════════════════════════════════
## 📚 CONGRATULATIONS! YOU'VE COMPLETED THE FULL-STACK WEB DEV COURSE!
## ═══════════════════════════════════════════════════════════════════════

You now have a solid foundation in:
- ✅ Web fundamentals and how the internet works
- ✅ Frontend: React, TypeScript, Tailwind, Shadcn
- ✅ Backend: ASP.NET Core, C#, services, dependency injection
- ✅ Database: PostgreSQL, Entity Framework Core
- ✅ Authentication: JWT tokens
- ✅ Testing: Unit, integration, and E2E tests
- ✅ Deployment: Docker and containers
- ✅ Security: Hashing, validation, CORS, secrets management
- ✅ Monitoring: Logging, performance profiling

### What's Next?
1. **Contribute to the HRIS project:** Apply these skills to the production application.
2. **Build more projects:** Reinforce learning by building real applications.
3. **Go deeper:** Learn about microservices, message queues, distributed systems.
4. **Stay updated:** The web constantly evolves. Keep learning new frameworks and tools.

### Career Path
With this skill set, you're ready for:
- **Junior Full-Stack Developer** roles
- **Backend Developer** roles (focusing on ASP.NET Core)
- **Frontend Developer** roles (focusing on React)
- **DevOps Engineer** roles (containers, CI/CD, monitoring)

Thank you for committing to learning. Now go build something amazing! 🚀
