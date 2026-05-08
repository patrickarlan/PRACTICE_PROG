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
- **Where do we create it?** (We create APIs in the **Backend** project using Controllers).
- **How is it used?** (The frontend uses it to load data or send user inputs to the backend).

**📝 Activities:**
1. In `web-notes.md`, write a simple explanation of what an API is using an analogy (e.g., a waiter, a postman, or a translator).
2. Look at the HRIS frontend network tab again. Find a request that returns a list of employees. Note the URL (this is the API endpoint).
3. Open a new tab in your browser and go to `https://jsonplaceholder.typicode.com/todos/1`. This is a free public API. Describe what you see on the screen.
4. In your notes, explain the difference between a regular website URL (that returns HTML) and an API URL (that returns raw data/JSON).
5. Identify where in the HRIS-PAT project the API controllers are located.

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
- What is TypeScript and why does it exist?
- Declaring types: `: string`, `: number`, `: boolean`
- Interfaces: defining the shape of an object
- Type vs Interface
- Optional properties with `?`

**📝 Activities:**
1. In `PRACTICE/ts/`, create `basics.ts`. Re-write your JavaScript basics from Lesson 4.1 with proper TypeScript types.
2. Create an `interface Employee` with fields: `id: number`, `name: string`, `department: string`, `isActive: boolean`.
3. Create a variable of type `Employee` and fill it with data.
4. Create an `interface Department` with `id`, `name`, and `code`. Make `code` optional with `?`.
5. Create an array of type `Employee[]` with 3 employees in it.
6. Look at `hris/src/` in the HRIS project and find a `.tsx` file that defines an interface. Copy it into your notes and explain what each field means.

---

## ══════════════════════════════════════
## 🟠 UNIT 5: REACT.JS — THE FRAMEWORK
## ══════════════════════════════════════
*React is the JavaScript library used to build the HRIS frontend. It turns code into a living, interactive user interface.*

---

### Lesson 5.1: React Components & JSX
- What is a Component? (A reusable piece of UI)
- JSX: Writing HTML inside JavaScript
- Functional components
- Exporting and importing components
- Passing data using `props`

**📝 Activities:**
1. In your `PRACTICE/frontend/` React app, create a component called `EmployeeCard.tsx`. It should display a name and a department.
2. Render 3 `<EmployeeCard />` components in your `App.tsx`, each with different data passed as `props`.
3. Create a `Navbar.tsx` component with a logo text and 3 navigation links.
4. Create a `Footer.tsx` component with your name and the current year.
5. Style all 3 components using Tailwind CSS.
6. Add a TypeScript `interface` called `EmployeeCardProps` to properly type the `props` of your `EmployeeCard`.

---

### Lesson 5.2: React State & Hooks
- What is State? (Data that changes over time)
- `useState`: Reading and updating state
- `useEffect`: Running code when the component loads
- Re-renders and how React updates the UI

**📝 Activities:**
1. Add a `useState` counter to your `App.tsx`. Show the count and add a button to increment it.
2. Create a component called `ToggleCard.tsx` that shows/hides a block of text when a button is clicked.
3. Add a `useState` that stores a list of employee names. Render the list on screen.
4. Add a button that adds a new fake name to the list and watch the UI update.
5. Use `useEffect` to run a `console.log("Component loaded!")` message when the page first loads.
6. Use `useEffect` to run code every time the counter changes and log the new value.

---

### Lesson 5.3: Fetching Data from an API
- What is `fetch()` and how does it work?
- `async` and `await` syntax
- Connecting React to your backend API
- Handling loading and error states

**📝 Activities:**
1. In your practice backend, create a simple GET endpoint that returns a list of 3 fake employees as JSON.
2. In your React frontend, use `fetch()` inside a `useEffect` to call that endpoint.
3. Store the returned employees in a `useState` variable.
4. Display the list of employees on screen using `.map()`.
5. Add a loading message that shows while the data is being fetched.
6. Add an error message that shows if the fetch fails (test it by temporarily breaking the backend URL).

---

## ══════════════════════════════════════════
## 🔵 UNIT 6: ASP.NET CORE & C# BASICS
## ══════════════════════════════════════════
*C# is the programming language used for the HRIS backend. ASP.NET Core is the framework that makes it a web server.*

---

### Lesson 6.1: C# Fundamentals
- Variables and types: `string`, `int`, `bool`, `List<>`, `Dictionary<>`
- Classes, Methods, Constructors
- `public` vs `private` access modifiers
- `null` and nullable types with `?`

**📝 Activities:**
1. In `PRACTICE/backend/`, create a new .NET Console App. Write a class called `Employee` with `Id`, `Name`, and `Department` properties.
2. Create an instance of `Employee`, set its properties, and print them with `Console.WriteLine`.
3. Write a method `GetFullInfo()` inside the class that returns a formatted string.
4. Create a `List<Employee>` with 3 employees and loop through them with `foreach`.
5. Practice making a property nullable (e.g., `string? Supervisor`) and check if it's null before printing.

---

### Lesson 6.2: ASP.NET Core Controllers & Routing
- Creating a Web API project with `dotnet new webapi`
- What is a Controller? (How it handles requests)
- HTTP Verbs in C#: `[HttpGet]`, `[HttpPost]`, `[HttpPut]`, `[HttpDelete]`
- Route parameters: `[HttpGet("{id}")]`
- Returning `Ok()`, `NotFound()`, `BadRequest()`

**📝 Activities:**
1. Create a new Web API project inside `PRACTICE/backend/`. Run it and see the default weather API.
2. Create a new `EmployeeController.cs`. Write a `[HttpGet]` method that returns the list of 3 fake employees from Lesson 6.1.
3. Write a `[HttpGet("{id}")]` method that returns a single employee by their ID.
4. Write a `[HttpPost]` method that accepts a new employee and adds it to the list.
5. Test all your endpoints using your browser or a tool like Postman / the built-in Swagger UI (`/swagger`).
6. Add proper routing by decorating the controller with `[Route("api/[controller]")]`.

---

### Lesson 6.3: The Service Pattern (How HRIS does it)
- Why we move logic OUT of Controllers and into Services
- Creating an `EmployeeService.cs`
- Dependency Injection in ASP.NET Core

**📝 Activities:**
1. Create `EmployeeService.cs`. Move your fake employee list and all logic from the controller into this service.
2. Create an interface `IEmployeeService.cs` that defines what your service can do.
3. Register your service in `Program.cs` using `builder.Services.AddScoped<IEmployeeService, EmployeeService>()`.
4. Inject `IEmployeeService` into your `EmployeeController` using the constructor.
5. Verify your endpoints still work the same way after the refactor.

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
