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

### Lesson 1.1b: Full-Stack Architecture Overview — Where Everything Lives

*Now that you understand Client, Server, and HTTP, it's time to see the COMPLETE picture: where every file goes, what each file does, and how frontend and backend communicate. This is the master blueprint.*

**The Big Picture: Browser → Frontend → Backend → Database**

```
┌─────────────────────────────────────────────────────────────────┐
│ USER'S BROWSER                                                  │
│ ┌───────────────────────────────────────────────────────────┐  │
│ │ index.html (loaded once)                                  │  │
│ │ ├─ React app loads here (ReactDOM.render())              │  │
│ │ ├─ TypeScript + JSX compiles to JavaScript               │  │
│ │ └─ All the UI interactions happen here                   │  │
│ └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                          ↓ (API calls)
┌─────────────────────────────────────────────────────────────────┐
│ FRONTEND SERVER (Vite - runs on localhost:5173)                │
│ ┌─ package.json (what packages we use)                        │
│ ├─ vite.config.ts (how to build & serve files)                │
│ ├─ tsconfig.json (TypeScript rules)                           │
│ ├─ tailwind.config.ts (CSS configuration)                     │
│ ├─ .env (API_URL=http://localhost:5107)                       │
│ └─ src/                                                        │
│    ├─ main.tsx (entry point - loads index.html)               │
│    ├─ App.tsx (root component)                                │
│    ├─ components/ (reusable UI pieces)                        │
│    ├─ pages/ (page-level components)                          │
│    ├─ services/ (fetch() calls to backend API)                │
│    └─ hooks/ (React hooks)                                    │
└─────────────────────────────────────────────────────────────────┘
                          ↓ (HTTP requests)
┌─────────────────────────────────────────────────────────────────┐
│ BACKEND SERVER (ASP.NET Core - runs on localhost:5107)         │
│ ┌─ Program.cs (entry point - starts the server)               │
│ │   ├─ Configures CORS (allows frontend to talk to backend)   │
│ │   ├─ Registers services (dependency injection)              │
│ │   ├─ Configures JWT authentication                          │
│ │   └─ Sets up middleware (logging, error handling)           │
│ │                                                              │
│ ├─ appsettings.json (configuration - database, logging, etc.) │
│ ├─ appsettings.Development.json (dev-only settings)           │
│ ├─ .env (secrets: DB_PASSWORD, JWT_SECRET)                    │
│ │                                                              │
│ ├─ Controllers/ (receives HTTP requests)                      │
│ │   └─ EmployeesController.cs                                 │
│ │       ├─ [HttpGet] /api/employees                           │
│ │       └─ [HttpPost] /api/employees                          │
│ │                                                              │
│ ├─ Services/ (business logic)                                 │
│ │   └─ EmployeeService.cs                                     │
│ │       ├─ GetAllEmployees()                                  │
│ │       └─ CreateEmployee()                                   │
│ │                                                              │
│ ├─ Models/ (database entities)                                │
│ │   └─ Employee.cs (maps to database table)                   │
│ │                                                              │
│ ├─ DTOs/ (objects sent to frontend)                           │
│ │   └─ EmployeeDto.cs (simplified version of Employee)        │
│ │                                                              │
│ └─ Migrations/ (auto-generated database changes)              │
│    └─ 20240520_InitialCreate.cs                               │
└─────────────────────────────────────────────────────────────────┘
                          ↓ (SQL queries)
┌─────────────────────────────────────────────────────────────────┐
│ POSTGRESQL DATABASE (runs on localhost:5432)                   │
│ ├─ hris_db (database name)                                    │
│ ├─ employees (table)                                          │
│ │   ├─ id (integer)                                           │
│ │   ├─ name (text)                                            │
│ │   ├─ department (text)                                      │
│ │   └─ position (text)                                        │
│ │                                                              │
│ └─ other tables...                                             │
└─────────────────────────────────────────────────────────────────┘
```

---

**Frontend vs Backend: Where Things Go**

| Question | Frontend | Backend |
|----------|----------|---------|
| **Entry point?** | `index.html` | `Program.cs` |
| **Configuration file?** | `.env` or `vite.config.ts` | `appsettings.json` + `.env` |
| **Language?** | TypeScript / JavaScript | C# |
| **Framework?** | React + Vite | ASP.NET Core |
| **Where does UI live?** | React components (`.tsx`) | NOT HERE |
| **Where does business logic live?** | NOT HERE (or minimal state logic) | Services & Controllers |
| **Database access?** | NOT HERE | Entity Framework Core in Repositories |
| **Authentication config?** | Stores JWT token in localStorage | Issues JWT, validates it in `Program.cs` |
| **API URLs?** | `.env` (API_URL) | Defined in Controllers |
| **Run command?** | `npm run dev` | `dotnet watch run` |
| **Port?** | 5173 (Vite dev server) | 5107 (Kestrel web server) |
| **Restart needed when?** | Change React code, CSS, `.env` | Change C# code, `Program.cs`, migrations |

---

**The Request-Response Cycle (Detailed)**

**Scenario:** User clicks "Load Employees" button in React

```
1. USER CLICKS BUTTON IN BROWSER
   ↓
2. FRONTEND (React component)
   → useEffect hook triggers
   → calls service.getEmployees()
   → which calls fetch('http://localhost:5107/api/employees')
   → sends HTTP GET request
   ↓
3. FRONTEND SERVER (Vite)
   → Routes the request to the backend
   ↓
4. BACKEND SERVER (ASP.NET Core)
   → localhost:5107/api/employees arrives at EmployeesController
   → [HttpGet] method is invoked
   → Calls _employeeService.GetAllEmployees()
   ↓
5. BACKEND SERVICE
   → EmployeeService.GetAllEmployees()
   → Calls _repository.GetAll() or _context.Employees.ToList()
   ↓
6. DATABASE
   → Executes SQL: SELECT * FROM employees;
   → Returns rows from database
   ↓
7. BACKEND SERVICE
   → Maps Model objects to DTOs (for safety)
   → Returns List<EmployeeDto>
   ↓
8. BACKEND CONTROLLER
   → Receives the list
   → Returns Ok(employeeList)  [HTTP 200]
   → Serializes to JSON
   ↓
9. NETWORK
   → HTTP response with JSON body travels back to browser
   ↓
10. FRONTEND SERVER (Vite)
    → Routes response back to React
    ↓
11. FRONTEND (React)
    → fetch() promise resolves
    → Response JSON is parsed
    → setEmployees(data) updates state
    → Component re-renders with new data
    ↓
12. BROWSER
    → Displays the list of employees!
```

---

**Key Files Explained: What They Do**

### Frontend Files

**`index.html`** (The absolute entry point)
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>HRIS</title>
</head>
<body>
    <div id="root"></div>  <!-- React mounts HERE -->
    <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```
- **What:** The only HTML file. Browser loads this ONCE.
- **Why:** React takes over from here and creates all UI dynamically.
- **When to change:** Almost never. Only for global meta tags, favicon, etc.

**`src/main.tsx`** (Startup script for React)
```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```
- **What:** Finds the `<div id="root">` in `index.html` and mounts the React app there.
- **Why:** Connects the static HTML to the dynamic React application.
- **When to change:** Almost never.

**`src/App.tsx`** (Root React component)
```tsx
function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
```
- **What:** The top-level React component. Defines page layout and routing.
- **Why:** Orchestrates which components show on which pages.
- **When to change:** When adding new pages or reorganizing layout.

**`.env`** (Frontend configuration)
```
VITE_API_URL=http://localhost:5107
VITE_APP_NAME=HRIS
```
- **What:** Variables accessible in React code via `import.meta.env.VITE_API_URL`
- **Why:** Different API URLs for dev/staging/production without changing code.
- **When to change:** When deploying to different environments.
- **IMPORTANT:** Never commit sensitive values like API keys!

**`vite.config.ts`** (Build & dev server configuration)
```ts
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5107',
        changeOrigin: true,
      }
    }
  },
})
```
- **What:** Tells Vite how to build and serve your app.
- **Why:** Configure ports, proxies, plugins.
- **When to change:** Rarely. Usually only for advanced build options.

**`tailwind.config.ts`** (CSS design system)
```ts
export default {
  theme: {
    colors: {
      primary: '#3B82F6',
      secondary: '#10B981',
    }
  }
}
```
- **What:** Configuration for Tailwind CSS utility classes.
- **Why:** Define your app's color palette, spacing, fonts globally.
- **When to change:** When updating design system.

**`src/services/employeeService.ts`** (API communication)
```ts
export const employeeService = {
  async getAll() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/employees`);
    return response.json();
  },
  
  async create(employee: EmployeeDto) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/employees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee),
    });
    return response.json();
  }
};
```
- **What:** Functions that call the backend API.
- **Why:** Centralize all fetch() calls so components don't know about URLs.
- **When to change:** When backend API endpoints change.

---

### Backend Files

**`Program.cs`** (The absolute entry point)
```csharp
var builder = WebApplicationBuilder.CreateBuilder(args);

// Register services (Dependency Injection)
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddDbContext<AppDbContext>();

// Configure middleware
builder.Services.AddCors(options => {
    options.AddPolicy("AllowFrontend", builder =>
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
    );
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer();

var app = builder.Build();

// Use middleware
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
```
- **What:** Starts the backend server, configures everything.
- **Why:** All backend setup happens here (services, authentication, CORS, middleware).
- **When to change:** Adding new services, middleware, or authentication schemes.
- **IMPORTANT:** If you change `Program.cs`, you MUST restart the backend!

**`appsettings.json`** (Configuration)
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=hris_db;Username=postgres;Password=..."
  },
  "Jwt": {
    "SecretKey": "your-secret-key-here"
  }
}
```
- **What:** Non-sensitive configuration values.
- **Why:** Different settings for different environments (dev vs production).
- **When to change:** When configuring database, logging, JWT, etc.
- **IMPORTANT:** Don't put secrets here! Use `.env` and `IConfiguration` instead.

**`.env`** (Backend secrets)
```
DB_PASSWORD=postgres_password_123
JWT_SECRET=your-super-secret-key-min-32-characters
```
- **What:** Sensitive values loaded by code, not committed to Git.
- **Why:** Security. API keys, passwords should never be in version control.
- **When to change:** When deploying to new environments.

**`Controllers/EmployeesController.cs`** (HTTP endpoints)
```csharp
[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly IEmployeeService _service;
    
    public EmployeesController(IEmployeeService service) {
        _service = service;
    }
    
    [HttpGet]
    public async Task<ActionResult<List<EmployeeDto>>> GetAll() {
        var employees = await _service.GetAllEmployees();
        return Ok(employees);
    }
    
    [HttpPost]
    public async Task<ActionResult<EmployeeDto>> Create([FromBody] CreateEmployeeRequest request) {
        var employee = await _service.CreateEmployee(request);
        return CreatedAtAction(nameof(GetAll), employee);
    }
}
```
- **What:** Handles HTTP requests and responses.
- **Why:** Defines API endpoints (GET /api/employees, POST /api/employees, etc.).
- **When to change:** When adding new endpoints or changing request/response formats.
- **RULE:** Controllers should be THIN. All business logic goes in Services!

**`Services/EmployeeService.cs`** (Business logic)
```csharp
public interface IEmployeeService {
    Task<List<EmployeeDto>> GetAllEmployees();
    Task<EmployeeDto> CreateEmployee(CreateEmployeeRequest request);
}

public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository _repository;
    
    public EmployeeService(IEmployeeRepository repository) {
        _repository = repository;
    }
    
    public async Task<List<EmployeeDto>> GetAllEmployees() {
        var employees = await _repository.GetAllAsync();
        return employees.Select(e => new EmployeeDto {
            Id = e.Id,
            Name = e.Name,
            Department = e.Department
        }).ToList();
    }
    
    public async Task<EmployeeDto> CreateEmployee(CreateEmployeeRequest request) {
        // Validation
        if (string.IsNullOrEmpty(request.Name))
            throw new ArgumentException("Name is required");
        
        // Business logic
        var employee = new Employee { Name = request.Name, Department = request.Department };
        var created = await _repository.AddAsync(employee);
        
        return new EmployeeDto { Id = created.Id, Name = created.Name, Department = created.Department };
    }
}
```
- **What:** Contains all business logic.
- **Why:** Controllers should NOT have logic. Services make code testable and reusable.
- **When to change:** When business rules change.

**`Models/Employee.cs`** (Database entity)
```csharp
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Department { get; set; }
    public string Position { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
```
- **What:** C# class that maps to a database table.
- **Why:** Entity Framework uses this to create/read database tables.
- **When to change:** When database schema changes (then create a Migration).

**`DTOs/EmployeeDto.cs`** (Safe response object)
```csharp
public class EmployeeDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Department { get; set; }
}
// Notice: no CreatedAt (internal field, not sent to frontend)
```
- **What:** Simplified version of Model, sent to frontend.
- **Why:** Never send the full Model to the frontend. Hide sensitive fields.
- **When to change:** When frontend needs different fields than the Model has.

---

**Development Workflow: Starting Everything**

**Step 1: Start the Database**
```powershell
# PostgreSQL is usually running as a service
# Or use Docker:
docker run -p 5432:5432 -e POSTGRES_PASSWORD=password postgres
```
- Check: Open pgAdmin, can you connect?

**Step 2: Start the Backend**
```powershell
cd backend
dotnet watch run
# Backend is now running on http://localhost:5107
# Check: http://localhost:5107/swagger shows API docs
```

**Step 3: Start the Frontend**
```powershell
cd hris  # or wherever your React app is
npm run dev
# Frontend is now running on http://localhost:5173
# Check: Browser shows the app, no CORS errors
```

**Step 4: Test the Connection**
- Open browser DevTools → Network tab
- Click a button that fetches data
- See the request go to `http://localhost:5107/api/...`
- See JSON response come back

---

**Quick Reference: "Where do I put this?"**

| If you want to... | File/Location | Why |
|-------------------|---------------|-----|
| ...change the API URL | `.env` (frontend) | Different URLs for dev/prod |
| ...change database connection | `appsettings.json` or `.env` (backend) | Different DBs for dev/prod |
| ...add a new endpoint | `Controllers/` + `Services/` (backend) | That's where API code goes |
| ...add a new page | `src/pages/` (frontend) | That's where page components go |
| ...change the color scheme | `tailwind.config.ts` (frontend) | That's the design system |
| ...change business logic | `Services/` (backend) | Controllers are thin, Services have logic |
| ...add a new database table | `Models/` (backend) + Migration | That's where database schema goes |
| ...hide a field from frontend | `DTO` file (backend) | Never send raw Model, use DTO |
| ...add a global middleware | `Program.cs` (backend) | That's where middleware is registered |
| ...add a global style | `src/App.css` or Tailwind config (frontend) | Global styles go at the top level |

---

**📝 Activities:**

1. **Map your HRIS project:**
   - Create a text file with the directory structure
   - For each major folder/file, write one sentence: "What does this do?"
   - Compare to the diagram above

2. **Trace a Request:**
   - Open HRIS frontend → click "View Employees"
   - Open DevTools → Network tab
   - Find the request to `/api/employees`
   - Click it, look at Request/Response tabs
   - Trace: Browser → Frontend → Backend → Database → back up

3. **Find each file type:**
   - Backend: `Program.cs`, `appsettings.json`, `.env`, a Controller, a Service, a Model, a DTO
   - Frontend: `index.html`, `src/main.tsx`, `src/App.tsx`, `.env`, `vite.config.ts`, `package.json`
   - Take screenshots of each

4. **Understand the startup:**
   - Start backend: `dotnet watch run`
   - Watch the console: Find where it says "Now listening on http://localhost:5107"
   - Start frontend: `npm run dev`
   - Watch the console: Find where it says the Vite server is running
   - Open browser DevTools → look at Network tab as frontend loads

5. **Restart test:**
   - Backend is running
   - Change something in `Program.cs` (add a comment)
   - Watch the terminal: It should restart automatically
   - Now change a React component (change text in App.tsx)
   - Frontend hot-reloads (no restart needed)
   - Understand: Backend restarts for C# changes, Frontend hot-reloads for JS/TS changes

6. **Configuration exploration:**
   - Open backend `.env` → what secrets are there?
   - Open backend `appsettings.json` → what configuration?
   - Open frontend `.env` → what environment variables?
   - Write: "Why is JWT_SECRET in backend .env but API_URL in frontend .env?"

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

### Lesson 2.4: Semantic HTML — Structuring Pages Like a Pro

*Non-semantic HTML uses generic tags like `<div>` for everything. Semantic HTML uses **meaningful** tags that describe what content is inside them. This is crucial for search engines, accessibility, and maintainability.*

**Why Semantic HTML Matters:**

1. **SEO (Search Engine Optimization):** Google understands your page structure better and ranks you higher.
2. **Accessibility:** Screen readers for blind users can navigate your site properly.
3. **Maintainability:** Your code is clearer and easier to understand.
4. **Better styling:** Semantic tags have built-in browser defaults you can rely on.

**Semantic HTML Tags:**

```
<header>
  - Top of the page or section
  - Contains: site logo, main heading, navigation
  - Use case: Top navbar of your website

<nav>
  - Navigation menu
  - Contains: links to main pages
  - Use case: Main menu, breadcrumbs, footer links

<main>
  - Primary content of the page
  - Should be only ONE <main> per page
  - Contains: the unique content that varies per page
  - Use case: All the "meat" of the page (excluding headers, footers, sidebars)

<section>
  - Thematic grouping of related content
  - Use when content needs a heading
  - Use case: "Featured Products", "Team Members", "Blog Posts"

<article>
  - Self-contained, independent content
  - Can be published elsewhere and still make sense
  - Use case: Blog post, news article, product review, comment

<aside>
  - Sidebar or supplementary content
  - Tangentially related to main content
  - Use case: Related links, ads, "Did you know?", sidebar widgets

<footer>
  - Bottom of page or section
  - Contains: copyright, links, contact info
  - Use case: Footer with contact, social links, copyright
```

**Bad HTML Structure (Using divs everywhere):**

```html
<div class="page">
  <div class="top-bar">
    <div class="logo">MyCompany</div>
    <div class="menu">
      <div><a href="/">Home</a></div>
      <div><a href="/about">About</a></div>
    </div>
  </div>
  
  <div class="content">
    <div class="article">
      <h1>My Blog Post</h1>
      <p>Great content here...</p>
    </div>
  </div>
  
  <div class="bottom">
    <p>&copy; 2024 MyCompany</p>
  </div>
</div>
```

**Good HTML Structure (Semantic):**

```html
<header>
  <h1>MyCompany</h1>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>

<main>
  <article>
    <h1>My Blog Post</h1>
    <p>Great content here...</p>
  </article>
</main>

<footer>
  <p>&copy; 2024 MyCompany</p>
</footer>
```

**Complete Real-World Example:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Portfolio</title>
</head>
<body>
  <!-- HEADER: Logo, navigation, branding -->
  <header>
    <div class="logo">
      <h1>John Developer</h1>
      <p>Full-Stack Web Developer</p>
    </div>
    <nav>
      <a href="#home">Home</a>
      <a href="#projects">Projects</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <!-- MAIN: Primary page content -->
  <main>
    
    <!-- HERO SECTION -->
    <section id="home">
      <h2>Welcome to my portfolio</h2>
      <p>I build fast, scalable web applications with React and C#</p>
      <button>View My Work</button>
    </section>

    <!-- PROJECTS SECTION -->
    <section id="projects">
      <h2>My Projects</h2>
      
      <!-- Each project is an ARTICLE -->
      <article>
        <h3>HRIS System</h3>
        <p>Full-stack HR management system built with React and ASP.NET Core</p>
        <a href="https://github.com/...">View on GitHub</a>
      </article>

      <article>
        <h3>E-Commerce Platform</h3>
        <p>Online store with real-time inventory tracking</p>
        <a href="https://github.com/...">View on GitHub</a>
      </article>
    </section>

    <!-- ABOUT SECTION -->
    <section id="about">
      <h2>About Me</h2>
      <p>I'm a developer passionate about building great user experiences...</p>
      
      <!-- ASIDE: Supplementary content -->
      <aside>
        <h3>Skills</h3>
        <ul>
          <li>React & TypeScript</li>
          <li>C# & ASP.NET Core</li>
          <li>PostgreSQL</li>
          <li>Docker</li>
        </ul>
      </aside>
    </section>

    <!-- CONTACT SECTION -->
    <section id="contact">
      <h2>Get In Touch</h2>
      <form>
        <input type="email" placeholder="Your email" required>
        <textarea placeholder="Your message"></textarea>
        <button type="submit">Send</button>
      </form>
    </section>

  </main>

  <!-- FOOTER: Copyright, links, contact info -->
  <footer>
    <p>&copy; 2024 John Developer. All rights reserved.</p>
    <nav>
      <a href="https://github.com/...">GitHub</a>
      <a href="https://linkedin.com/...">LinkedIn</a>
      <a href="https://twitter.com/...">Twitter</a>
    </nav>
  </footer>
</body>
</html>
```

**Key Principles:**

1. **One `<main>` per page** — Don't use multiple `<main>` tags
2. **Use `<section>` for groups** — When content is related and needs a heading
3. **Use `<article>` for standalone content** — Blog posts, comments, cards
4. **Use `<header>` and `<footer>` for metadata** — Navigation, copyright, author info
5. **Nest semantically** — `<header>` → `<nav>`, `<main>` → `<section>` → `<article>`
6. **Don't overuse divs** — Use semantic tags first, divs only for layout/styling

**When to Use What:**

| Tag | Use When |
|-----|----------|
| `<header>` | Top of page/section with introductory content or nav |
| `<nav>` | Navigation links (menus, breadcrumbs) |
| `<main>` | Primary unique content (only one per page!) |
| `<section>` | Thematic grouping that needs a heading |
| `<article>` | Self-contained piece (blog post, comment, product card) |
| `<aside>` | Tangentially related info (sidebar, ads, related links) |
| `<footer>` | Bottom of page/section with meta info |
| `<div>` | Generic wrapper when semantic tags don't fit (layout, styling) |

**📝 Activities:**

1. **Restructure your `index.html`:**
   - Wrap everything in semantic tags
   - Add a `<header>` with a title and `<nav>`
   - Wrap main content in `<main>`
   - Add a `<footer>` at the bottom

2. **Create a properly structured blog post page:**
   ```html
   <header>
     <h1>My Blog</h1>
     <nav><!-- links --></nav>
   </header>
   
   <main>
     <article>
       <h2>Blog Post Title</h2>
       <p>Posted on <time datetime="2024-05-20">May 20, 2024</time></p>
       <p>Blog content...</p>
     </article>
   </main>
   
   <footer>
     <p>&copy; 2024</p>
   </footer>
   ```

3. **Restructure your table.html:**
   - Put the table inside a `<section>` with a heading
   - Use `<header>` for page title
   - Use `<footer>` for any notes

4. **Restructure your form.html:**
   - Use semantic structure for a contact page
   - Put form in `<main>` → `<section>`
   - Include `<header>` and `<footer>`

5. **Compare real websites:**
   - Open HRIS in your browser
   - Right-click → "Inspect" → look at the HTML structure
   - Find `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
   - Screenshot and add to notes: "What semantic tags does HRIS use?"

6. **Validate your HTML:**
   - Use [W3C Validator](https://validator.w3.org/)
   - Paste your HTML and check for structure issues
   - Fix any errors

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

### Lesson 5.1b: Building Semantic React Components

*Now that you understand how to write React components, it's time to build them the **RIGHT WAY** using semantic HTML. This is where Lesson 2.4 (Semantic HTML) comes alive in React.*

**Why Semantic HTML in React Matters:**

1. **Accessibility:** Screen readers can navigate your app properly
2. **SEO:** If you ever use Next.js, semantic HTML helps search rankings
3. **Professional Code:** Other developers (and future-you) will understand your code instantly
4. **Better maintainability:** Semantic components are self-documenting

**The Connection: Semantic HTML → React Components**

When you build a React component, you're building reusable UI blocks. The structure you learned in Lesson 2.4 applies directly:

```tsx
// ❌ BAD: Generic divs (like bad HTML)
function Page() {
  return (
    <div className="page">
      <div className="top">
        <h1>My App</h1>
      </div>
      <div className="menu">
        <a href="/">Home</a>
        <a href="/about">About</a>
      </div>
      <div className="content">
        <p>Welcome to my app</p>
      </div>
      <div className="bottom">
        <p>&copy; 2024</p>
      </div>
    </div>
  );
}

// ✅ GOOD: Semantic HTML (like good HTML structure)
function Page() {
  return (
    <>
      <Header />
      <Navigation />
      <main>
        <section>
          <p>Welcome to my app</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

**Building Semantic React Components:**

**Component 1: Header Component** (`Header.tsx`)
```tsx
export function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <h1>Employee Management System</h1>
      <p>Manage all your employees efficiently</p>
    </header>
  );
}
```

**Component 2: Navigation Component** (`Navigation.tsx`)
```tsx
export function Navigation() {
  return (
    <nav className="bg-gray-800 text-white">
      <ul className="flex gap-4 p-4">
        <li><a href="/" className="hover:underline">Home</a></li>
        <li><a href="/employees" className="hover:underline">Employees</a></li>
        <li><a href="/reports" className="hover:underline">Reports</a></li>
        <li><a href="/settings" className="hover:underline">Settings</a></li>
      </ul>
    </nav>
  );
}
```

**Component 3: Employee Card Component** (`EmployeeCard.tsx`)
```tsx
interface EmployeeCardProps {
  id: number;
  name: string;
  department: string;
  position: string;
}

// Use <article> for each employee card (self-contained content)
export function EmployeeCard({ id, name, department, position }: EmployeeCardProps) {
  return (
    <article className="border rounded-lg p-4 shadow-md">
      <header>
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-gray-600">{position}</p>
      </header>
      
      <section className="mt-4">
        <dl className="space-y-2">
          <div>
            <dt className="font-semibold text-gray-700">Department</dt>
            <dd>{department}</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-700">Employee ID</dt>
            <dd>#{id}</dd>
          </div>
        </dl>
      </section>
      
      <footer className="mt-4 flex gap-2">
        <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
        <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
      </footer>
    </article>
  );
}
```

**Component 4: Employees List Component** (`EmployeesList.tsx`)
```tsx
interface EmployeeCardProps {
  id: number;
  name: string;
  department: string;
  position: string;
}

export function EmployeesList({ employees }: { employees: EmployeeCardProps[] }) {
  return (
    <section>
      <header>
        <h2 className="text-2xl font-bold mb-4">All Employees</h2>
      </header>
      
      {/* Use semantic HTML: grid of <article> elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} {...employee} />
        ))}
      </div>
    </section>
  );
}
```

**Component 5: Footer Component** (`Footer.tsx`)
```tsx
export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <nav className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <section>
            <h4 className="font-bold mb-2">Company</h4>
            <ul className="space-y-1">
              <li><a href="/about" className="hover:underline">About Us</a></li>
              <li><a href="/careers" className="hover:underline">Careers</a></li>
              <li><a href="/blog" className="hover:underline">Blog</a></li>
            </ul>
          </section>
          
          <section>
            <h4 className="font-bold mb-2">Support</h4>
            <ul className="space-y-1">
              <li><a href="/help" className="hover:underline">Help Center</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
              <li><a href="/faq" className="hover:underline">FAQ</a></li>
            </ul>
          </section>
          
          <section>
            <h4 className="font-bold mb-2">Legal</h4>
            <ul className="space-y-1">
              <li><a href="/privacy" className="hover:underline">Privacy</a></li>
              <li><a href="/terms" className="hover:underline">Terms</a></li>
            </ul>
          </section>
        </div>
      </nav>
      
      <div className="border-t border-gray-800 p-6 text-center text-gray-400">
        <p>&copy; 2024 Employee Management System. All rights reserved.</p>
      </div>
    </footer>
  );
}
```

**Complete Page Using Semantic Components** (`App.tsx`)
```tsx
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { EmployeesList } from './components/EmployeesList';
import { Footer } from './components/Footer';

export default function App() {
  // Mock data
  const employees = [
    { id: 1, name: 'Alice Johnson', department: 'Engineering', position: 'Senior Dev' },
    { id: 2, name: 'Bob Smith', department: 'Sales', position: 'Sales Manager' },
    { id: 3, name: 'Carol White', department: 'HR', position: 'HR Specialist' },
  ];

  return (
    <>
      <Header />
      <Navigation />
      
      <main className="max-w-6xl mx-auto p-4">
        <EmployeesList employees={employees} />
      </main>
      
      <Footer />
    </>
  );
}
```

**Key Semantic Patterns in React:**

| Pattern | HTML | React Example |
|---------|------|---------------|
| Page layout | `<header>`, `<main>`, `<footer>` | Top-level `<Header />`, `<main>`, `<Footer />` |
| Card | `<article>` | `<article className="card">` in card component |
| Section grouping | `<section>` | `<section>` for major content groups |
| Navigation | `<nav>`, `<ul>`, `<li>`, `<a>` | `<Navigation />` with proper list structure |
| Lists | `<ul>`, `<ol>`, `<li>` | `.map()` → `<ul><li>` or grid of `<article>` |
| Forms | `<form>`, `<label>`, `<input>` | Form component with semantic structure |
| Data display | `<dl>`, `<dt>`, `<dd>` | Description list for key-value pairs |

**Best Practices:**

1. **One `<main>` per page** — Only use `<main>` once at the App level
2. **Use `<header>` in components** — Each component can have its own `<header>` for titles
3. **Use `<section>` to group content** — Wraps related content that has a heading
4. **Use `<article>` for cards** — Each card is self-contained (EmployeeCard, BlogPost, etc.)
5. **Use `<nav>` for navigation** — Links, menus, breadcrumbs
6. **Use `<footer>` in components** — Actions, metadata, secondary info
7. **Always use `<label>` in forms** — Connect labels to inputs with `htmlFor`
8. **Use semantic elements over generic divs** — Only use `<div>` for layout/styling

**📝 Activities:**

1. **Refactor your Navbar component:**
   ```tsx
   export function Navbar() {
     return (
       <header>
         <h1>My App Logo</h1>
         <nav>
           <ul>
             <li><a href="/">Home</a></li>
             <li><a href="/about">About</a></li>
           </ul>
         </nav>
       </header>
     );
   }
   ```

2. **Refactor your EmployeeCard to use `<article>`:**
   - Wrap the entire card in `<article>`
   - Use `<header>` for name/title
   - Use `<section>` for details
   - Use `<footer>` for action buttons

3. **Create a properly structured page:**
   - `Header` component at top
   - `Navigation` component below header
   - `main` tag wrapping page content
   - `Footer` component at bottom
   - Make sure there's only ONE `<main>` in the entire app

4. **Inspect the HRIS app semantically:**
   - Open HRIS in browser
   - Right-click → Inspect
   - Look for semantic tags: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
   - Find examples of each and screenshot them
   - Note: If most of the page is generic `<div>` tags, that's the "old way" — now you know better!

5. **Create a Dashboard section component using semantic HTML:**
   ```tsx
   export function DashboardSection() {
     return (
       <section className="mb-8">
         <header className="mb-4">
           <h2>Dashboard Overview</h2>
         </header>
         
         <article className="stat-card">
           {/* Statistics card content */}
         </article>
       </section>
     );
   }
   ```

6. **Check accessibility:**
   - Install VS Code extension: "axe DevTools"
   - Run it on your React app
   - Fix any accessibility issues it finds
   - Many of these issues are fixed by using semantic HTML!

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

## ══════════════════════════════════════════════════════════════════════════
## 🎯 UNIT 15: CAPSTONE — YOUR PROFESSIONAL PORTFOLIO
## ══════════════════════════════════════════════════════════════════════════
*Build your portfolio website using everything you've learned. This is your showcase — a production-ready project that demonstrates your full-stack skills to employers.*

---

### Why a Portfolio Project?
- **Real Project:** You own this project. It's not a practice exercise — it's your professional brand.
- **Deploy It:** Unlike the mini HRIS, you'll actually deploy this to the web and share it.
- **Showcase Skills:** Employers see your code on GitHub, visit your live site, and understand your capabilities.
- **Iterate Forever:** Unlike a course project, you'll keep building on this. Add features, improve design, optimize performance.

---

### Project: Your Portfolio Website

**What It Is:**
A professional portfolio website that showcases **you** — your projects, skills, testimonials, and how to contact you. Built with the full stack you've learned.

**Tech Stack:**
- **Frontend:** React + TypeScript + Tailwind CSS + Shadcn UI
- **Backend:** ASP.NET Core + EF Core + PostgreSQL
- **Security:** JWT tokens for admin access
- **Deployment:** Docker + deployed to cloud (Azure, AWS, or DigitalOcean)

---

### Lesson 15.1: Planning Your Portfolio

**What Your Portfolio Should Include:**

1. **Public Pages:**
   - **Home/Hero:** Who you are, your headline, CTA (Call To Action)
   - **Projects Page:** Display your best work (cards with images, descriptions, live links, GitHub links)
   - **About Page:** Your story, background, skills
   - **Contact Page:** Contact form that sends emails or saves to database
   - **Blog (Optional):** Articles about web development, lessons learned

2. **Admin Dashboard (JWT Protected):**
   - **Project Manager:** Add, edit, delete your projects
   - **Contact Manager:** View messages from the contact form
   - **Stats Dashboard:** View how many people visited, viewed projects, etc.

**📝 Activities:**

1. **Design your portfolio:**
   - Sketch the pages (even simple wireframes in notes)
   - List 3-5 projects you want to showcase
   - Write your bio/about section

2. **Identify the core features:**
   - What makes this *YOUR* portfolio, not a template?
   - What unique features will impress employers? (animations, dark mode, performance, unique design?)

3. **Plan the database schema:**
   ```
   Projects:
   - Id (PK)
   - Title
   - Description
   - TechStack (comma-separated or JSON)
   - ImageUrl
   - GithubLink
   - LiveLink
   - CreatedAt

   ContactMessages:
   - Id (PK)
   - Name
   - Email
   - Message
   - CreatedAt

   PortfolioStats:
   - Id (PK)
   - PageViews
   - ProjectClicks
   - MessageCount
   ```

4. **Create the GitHub repository:**
   - Initialize a new repo: `portfolio` (or `yourname-portfolio`)
   - Add `.gitignore` for C# and Node
   - Create `README.md` with your project description

---

### Lesson 15.2: Building the Frontend

**Key Components:**

1. **Navigation Bar**
   - Logo/name
   - Links: Home, Projects, About, Contact
   - (Optional) Dark mode toggle
   - (Optional) Admin login button

2. **Hero Section**
   - Your photo or avatar (Shadcn Avatar)
   - Headline: e.g., "Full-Stack Developer | React & C# Engineer"
   - CTA button: "View My Work" or "Contact Me"
   - Social links: GitHub, LinkedIn, Twitter

3. **Projects Showcase (Fetches from Backend API)**
   - Grid of project cards
   - Each card shows: image, title, description, tech stack tags, buttons (View Live, GitHub)
   - Filter by tech stack (React, C#, TypeScript, etc.)
   - (Optional) Search functionality

4. **About Section**
   - Your bio
   - Skills: Show as a list or visual bars
   - Timeline of experience (roles, companies, dates)

5. **Contact Form**
   - Name, Email, Subject, Message fields
   - Validation
   - Submit to backend API
   - Success message: "Thanks for reaching out! I'll get back to you soon."

6. **Admin Pages (Protected by JWT)**
   - Admin Login
   - Project Manager (CRUD operations)
   - Contact Messages Viewer
   - Stats Dashboard

**📝 Activities:**

1. **Set up the Vite + React project:**
   ```bash
   npm create vite@latest portfolio -- --template react-ts
   cd portfolio
   npm install
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   npm install shadcn-ui
   ```

2. **Build the Hero section first** — this is the most important part.

3. **Create the Projects grid component:**
   - Mock data initially (hardcoded projects)
   - Later, connect to backend API

4. **Build the Contact form:**
   - Form with validation
   - Submit button that calls backend API

5. **Implement JWT authentication for admin pages:**
   - Login form
   - Store JWT token in localStorage
   - Create a `ProtectedRoute` component

6. **Add responsive design:**
   - Mobile-first (Tailwind breakpoints)
   - Test on phone-sized screens

---

### Lesson 15.3: Building the Backend

**API Endpoints:**

```
GET /api/projects — Get all projects (public)
GET /api/projects/{id} — Get single project (public)

POST /api/projects — Create project (protected)
PUT /api/projects/{id} — Update project (protected)
DELETE /api/projects/{id} — Delete project (protected)

POST /api/contact — Submit contact form (public)
GET /api/contact — View messages (protected)

GET /api/stats — View portfolio stats (protected)

POST /api/auth/login — Admin login (public)
```

**📝 Activities:**

1. **Create a new ASP.NET Core Web API project:**
   ```bash
   dotnet new webapi -n PortfolioBackend
   cd PortfolioBackend
   dotnet add package Microsoft.EntityFrameworkCore.Npgsql
   dotnet add package Microsoft.EntityFrameworkCore.Tools
   dotnet add package System.IdentityModel.Tokens.Jwt
   ```

2. **Set up the database:**
   - Create DbContext with `Project`, `ContactMessage` entities
   - Run migrations
   - Seed sample projects

3. **Build the Project Controller:**
   - `GetAll()` — return all projects
   - `GetById(id)` — return single project
   - `Create(dto)` — add new project [Authorize]
   - `Update(id, dto)` — modify project [Authorize]
   - `Delete(id)` — remove project [Authorize]

4. **Build the Contact Controller:**
   - `Submit(dto)` — save contact message
   - `GetAll()` — return all messages [Authorize]

5. **Implement JWT authentication:**
   ```csharp
   [ApiController]
   [Route("api/auth")]
   public class AuthController : ControllerBase
   {
       [HttpPost("login")]
       public IActionResult Login([FromBody] LoginRequest request)
       {
           // Validate hardcoded admin credentials (or fetch from database)
           if (request.Email != "admin@portfolio.com" || request.Password != "YourPassword123!")
               return Unauthorized();

           var token = GenerateJwtToken();
           return Ok(new { token });
       }
   }
   ```

6. **Add CORS for frontend:**
   ```csharp
   builder.Services.AddCors(options =>
       options.AddPolicy("AllowFrontend", policy =>
           policy.WithOrigins("http://localhost:5173", "https://yourportfolio.com")
                 .AllowAnyMethod()
                 .AllowAnyHeader()
   );
   ```

7. **Test all endpoints with Postman or cURL**

---

### Lesson 15.4: Connecting Frontend ↔ Backend

**📝 Activities:**

1. **Create API service file:**
   ```typescript
   // src/services/api.ts
   const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5107/api";

   export const fetchProjects = async () => {
       const res = await fetch(`${API_URL}/projects`);
       return res.json();
   };

   export const submitContactForm = async (data: ContactData) => {
       const res = await fetch(`${API_URL}/contact`, {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(data),
       });
       return res.json();
   };
   ```

2. **Update Projects component to use real API:**
   ```typescript
   useEffect(() => {
       fetchProjects().then(setProjects);
   }, []);
   ```

3. **Test the full flow:**
   - Frontend loads projects from backend
   - Contact form submits to backend
   - Messages appear in admin dashboard

---

### Lesson 15.5: Styling & Polish

**Make It Shine:**

1. **Design:**
   - Choose a color scheme (use [coolors.co](https://coolors.co))
   - Consistent typography (1-2 font families)
   - Spacing & alignment (use Tailwind grid/flex)

2. **Animations:**
   - Fade-in on scroll (use libraries like `react-intersection-observer`)
   - Hover effects on project cards
   - Smooth transitions on all interactive elements

3. **Dark Mode (Optional but impressive):**
   - Use Tailwind's dark mode
   - Store preference in localStorage
   - Toggle in navbar

4. **Accessibility:**
   - Alt text on all images
   - Proper semantic HTML
   - Keyboard navigation
   - Contrast ratios pass WCAG AA

5. **Performance:**
   - Image optimization (compress, use modern formats like WebP)
   - Lazy load images below the fold
   - Code splitting for large bundles

**📝 Activities:**

1. Implement dark mode toggle
2. Add page transition animations
3. Optimize images (use `next-gen` formats or a tool like TinyPNG)
4. Test with Lighthouse (`npm run build && npx light-house http://localhost:5173`)

---

### Lesson 15.6: Testing Your Portfolio

**📝 Activities:**

1. **Unit tests for utility functions:**
   - Test form validation logic
   - Test API service helpers

2. **Component tests:**
   - Test that projects render correctly
   - Test that contact form validation works
   - Test that admin login requires correct credentials

3. **E2E tests:**
   - User flow: Visit site → View projects → Submit contact form
   - Admin flow: Login → Add project → Verify it appears on public site

4. **Manual testing:**
   - Test on mobile, tablet, desktop
   - Test on Chrome, Firefox, Safari
   - Test contact form email delivery
   - Test broken image links

---

### Lesson 15.7: Deployment

**Deploy to the Web:**

1. **Backend Deployment (Azure, AWS, or DigitalOcean):**
   - Create Docker image for backend
   - Push to container registry
   - Deploy to cloud platform
   - Set up database in cloud (Azure SQL, AWS RDS, or managed PostgreSQL)
   - Environment variables: connection string, JWT secret, admin password

2. **Frontend Deployment (Vercel, Netlify, or same cloud):**
   - Build React app: `npm run build`
   - Deploy to Vercel: `npm install -g vercel && vercel`
   - OR deploy to same cloud as backend with Docker

3. **Custom Domain:**
   - Buy domain (Namecheap, GoDaddy, etc.)
   - Point DNS to your deployment
   - Your portfolio is now live at `yourname.dev` (or similar)

4. **HTTPS/SSL:**
   - Automatically handled by Vercel/Netlify
   - If self-hosting, use Let's Encrypt (free)

**📝 Activities:**

1. Choose deployment platform
2. Deploy backend to cloud
3. Deploy frontend to Vercel/Netlify
4. Set up custom domain
5. Test live site works end-to-end

---

### Lesson 15.8: Maintaining & Iterating

**This is just the beginning:**

Your portfolio is not a one-time project. Keep it fresh:

1. **Add new projects as you build them**
2. **Blog about your learning journey** — write articles about what you built and why
3. **Improve design & performance** — keep refining
4. **Collect testimonials** — ask colleagues/mentors to vouch for your skills
5. **Add analytics** — track visitors and which projects get clicks
6. **Stay current** — update tech stack as you learn new tools

**📝 Activities:**

1. Add your first blog post: "Building My Portfolio" or "What I Learned in the Full-Stack Course"
2. Get feedback from a peer or mentor
3. Plan 2-3 improvements for next week
4. Commit regularly to GitHub

---

### Portfolio Project Checklist

✅ GitHub repo created and public  
✅ React frontend with 5+ pages  
✅ ASP.NET Core backend with API  
✅ PostgreSQL database  
✅ JWT authentication for admin  
✅ Responsive design (mobile, tablet, desktop)  
✅ Contact form with backend submission  
✅ 3+ projects showcased  
✅ Styled with Tailwind + Shadcn  
✅ Tested (unit, component, or E2E)  
✅ Deployed to live URL  
✅ Custom domain  
✅ README explaining setup  
✅ Professional code (clean, commented where needed)  

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
