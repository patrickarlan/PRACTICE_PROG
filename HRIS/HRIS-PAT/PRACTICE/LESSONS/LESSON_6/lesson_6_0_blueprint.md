# Chapter 6: ASP.NET Core & C# Basics

## Lesson 6.0: Backend File & Folder Structure (The Blueprint)

Before writing your first line of C# code, you need to understand **how a professional backend is organized**. 

In React, you learned that components go into `components/`, pages go into `pages/`, and hooks go into `hooks/`. 
The backend works the exact same way — it has dedicated folders for each job.

You already have a real, production-ready backend in front of you: the HRIS backend at `HRIS-PAT/backend/`. We will use it as our reference guide.

---

## Part 1: The Big Picture — Where Does the Backend Fit?

```
┌────────────────────────────────────────────────────────┐
│                   BROWSER (React App)                  │
│               Runs at http://localhost:5173            │
└───────────────────────────┬────────────────────────────┘
                            │
                            │ 1. HTTP Request (e.g. GET /api/employees)
                            ▼
┌────────────────────────────────────────────────────────┐
│                 ASP.NET CORE WEB API                   │
│               Runs at http://localhost:5107            │
│                                                        │
│   Program.cs  <-- The engine ignition (starts server)  │
│       │                                                │
│       ├── Controllers/  <-- Receptionist (gets request)│
│       ├── Services/     <-- The Brain (business logic) │
│       ├── Models/       <-- Database Table blueprints  │
│       ├── DTOs/         <-- Clean packages for frontend│
│       ├── Interfaces/   <-- Rulebooks & Contracts      │
│       └── Migrations/   <-- Database change history    │
└───────────────────────────┬────────────────────────────┘
                            │
                            │ 2. SQL Queries (SELECT * FROM Employees)
                            ▼
┌────────────────────────────────────────────────────────┐
│                  POSTGRESQL DATABASE                   │
│          Stores real tables with rows & columns        │
└────────────────────────────────────────────────────────┘
```

> **The Golden Rule**: The React frontend **NEVER** talks to the database directly. If it did, anyone could open DevTools and steal or delete all your company data!
> The backend acts as a **secure security guard and middleman**.

---

## Part 2: The Layered Architecture — The 6 Folders

Think of a high-end restaurant:
- **`Controllers/`** = The **Waiter**. Smiles at the customer, takes the order ticket, brings back the plate. The waiter **never** cooks!
- **`Services/`** = The **Chef in the kitchen**. Knows all the recipes, checks if ingredients are fresh, cooks the meal.
- **`Models/`** = The **Pantry Inventory**. Every box in the pantry has an exact label and expiration date.
- **`DTOs/`** = The **Plated Dish**. You don't serve the customer raw onion peels or the wholesale invoice; you only serve the finished meal on a clean plate.
- **`Interfaces/`** = The **Job Description**. Lists what skills the chef and waiter must have.
- **`Migrations/`** = The **Kitchen Renovation Log**. A written history of every shelf added or removed over time.

---

## Part 3: Deep Dive — Understanding the Code Snippets Line-by-Line

When you look at C# code for the first time, words like `public`, `class`, `{ get; set; }`, `Task<IActionResult>`, and `[HttpGet]` can look intimidating. Let's demystify every single one of them!

---

### Snippet 1: `Models/` — The Database Blueprint

A **Model** represents a single table in PostgreSQL. Each property inside it represents a column.

```csharp
// Models/Employee.cs
public class Employee
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}
```

#### 🔍 What is happening here? (Line-by-Line)

| Line of Code | Plain-English Explanation |
| :--- | :--- |
| `public class Employee` | `public` means this file can be seen by other files in our project. `class Employee` is the blueprint name. In PostgreSQL, this will become the **"Employees" table**. |
| `public int Id { get; set; }` | `int` means whole number (1, 2, 3). This is the row's unique ID (Primary Key). `{ get; set; }` means C# is allowed to read (`get`) and update (`set`) this value. |
| `public string FullName { get; set; }` | `string` means text. In PostgreSQL, this becomes a text column called `FullName`. |
| `public bool IsActive { get; set; }` | `bool` means true or false (`true` = currently working, `false` = resigned). |
| `public DateTime CreatedAt { get; set; }` | `DateTime` stores both the calendar date and timestamp when the employee was hired. |

```
                 HOW C# MAPS TO POSTGRESQL:
        C# Model                           PostgreSQL Table
┌─────────────────────────┐           ┌───────┬────────────┬──────────┐
│ public int Id           │ ────────> │  Id   │  FullName  │ IsActive │
│ public string FullName  │ ────────> ├───────┼────────────┼──────────┤
│ public bool IsActive    │ ────────> │   1   │  Patrick   │   true   │
└─────────────────────────┘           └───────┴────────────┴──────────┘
```

---

### Snippet 2: `DTOs/` — Data Transfer Object (What Frontend Sees)

**DTO** stands for **Data Transfer Object**. It is a simplified version of the Model specifically formatted for your React frontend.

```csharp
// DTOs/EmployeeDto.cs
public class EmployeeDto
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
}
```

#### 🔍 Why do we create DTOs instead of just sending the Model?

1. **Security (Hiding Private Data):**
   Imagine your `Employee` model had a `PasswordHash` or `SocialSecurityNumber` column for authentication. If you returned the Model directly, React would receive every employee's password hash in the browser network tab! A DTO only includes safe fields.
2. **Bandwidth & Speed:**
   If a table has 40 columns, but the React dropdown only needs `Id` and `FullName`, sending only 2 columns is 20x faster.

```
PostgreSQL Row (Model)                 Safe DTO (Sent to React)
┌───────────────────────────┐         ┌───────────────────────────┐
│ Id: 1                     │         │ Id: 1                     │
│ FullName: "Patrick"       │ ──────> │ FullName: "Patrick"       │
│ Department: "Engineering" │         │ Department: "Engineering" │
│ PasswordHash: "x8f#291a!" │ ──❌──  └───────────────────────────┘
│ InternalNotes: "Secret"   │ ──❌──  (React never sees secrets!)
└───────────────────────────┘
```

---

### Snippet 3: `Interfaces/` — The Contract (Job Description)

Before building a service, we write an **Interface**. It has a capital `I` at the beginning (e.g., `IEmployeeService`).
Notice that it **has no code inside** — only method names followed by semicolons!

```csharp
// Interfaces/IEmployeeService.cs
public interface IEmployeeService
{
    Task<List<EmployeeDto>> GetAllEmployeesAsync();
    Task<EmployeeDto?> GetByIdAsync(int id);
}
```

#### 🔍 What is happening here? (Line-by-Line)

| Line of Code | Plain-English Explanation |
| :--- | :--- |
| `public interface IEmployeeService` | Declares a **rulebook**. It says: "Whoever claims to be an `EmployeeService` MUST fulfill these promises." |
| `Task<List<EmployeeDto>>` | **`Task`** is C#'s version of JavaScript's `Promise`. It means "this will take some time, so wait for it asynchronously."<br>**`List<EmployeeDto>`** means an array of employee DTOs. |
| `GetAllEmployeesAsync();` | The name of the method. The word `Async` at the end is a standard C# convention telling developers this method must be `await`ed. |
| `;` (Semicolon, no `{}`) | Interfaces do not do the work; they only state **what** must be done, not **how**. |

---

### Snippet 4: `Services/` — The Brain & Business Logic

The Service is the class that **actually does the heavy lifting**: reading from PostgreSQL, calculating salaries, checking rules, and packaging data into DTOs.

```csharp
// Services/EmployeeService.cs
public class EmployeeService : IEmployeeService
{
    // 1. Storage box for database connection
    private readonly AppDbContext _context;

    // 2. Constructor: "Injects" the database connection
    public EmployeeService(AppDbContext context)
    {
        _context = context;
    }

    // 3. The actual worker method
    public async Task<List<EmployeeDto>> GetAllEmployeesAsync()
    {
        return await _context.Employees
            .Select(e => new EmployeeDto {
                Id = e.Id,
                FullName = e.FullName,
                Department = e.Department
            })
            .ToListAsync();
    }
}
```

#### 🔍 What is happening here? (Line-by-Line)

| Line of Code | Plain-English Explanation |
| :--- | :--- |
| `: IEmployeeService` | The colon `:` means **implements**. It tells C#: "This class is signing the contract to fulfill the `IEmployeeService` job description." |
| `private readonly AppDbContext _context;` | `AppDbContext` is the master bridge to PostgreSQL. `private readonly` means this database link is locked and cannot be accidentally deleted or overwritten by mistake. |
| `public EmployeeService(AppDbContext context)` | This is a **Constructor** (runs automatically when the service starts). ASP.NET automatically hands the open database connection to `_context`. This pattern is called **Dependency Injection (DI)**. |
| `public async Task<...>` | Just like in JavaScript `async function()`, this allows us to use `await` so our server never freezes while waiting for PostgreSQL. |
| `_context.Employees` | Tells Entity Framework: "Go look at the `Employees` table in the database." |
| `.Select(e => new EmployeeDto { ... })` | This is **LINQ** (Language Integrated Query). It transforms each database row `e` into a safe `EmployeeDto`. In JavaScript, this is identical to `.map(e => ({ id: e.id, ... }))`! |
| `.ToListAsync();` | Executes the SQL command on PostgreSQL and converts the rows into a C# list. |

---

### Snippet 5: `Controllers/` — The Receptionist / Waiter

The Controller is the public door of your backend. When your React app makes a `fetch()` or `axios.get()` call, it hits a Controller method.

```csharp
// Controllers/EmployeesController.cs
[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly IEmployeeService _employeeService;

    // Injecting the service contract
    public EmployeesController(IEmployeeService employeeService)
    {
        _employeeService = employeeService;
    }

    // Listens for: GET http://localhost:5107/api/employees
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var employees = await _employeeService.GetAllEmployeesAsync();
        return Ok(employees); // Sends HTTP 200 OK with JSON data
    }
}
```

#### 🔍 What is happening here? (Line-by-Line)

| Line of Code | Plain-English Explanation |
| :--- | :--- |
| `[ApiController]` | The square brackets `[...]` are called **Attributes** in C# (similar to decorators). This tells ASP.NET: "This class handles web HTTP requests and automatically turns JSON into C# objects." |
| `[Route("api/[controller]")]` | Sets the URL endpoint. The token `[controller]` is automatically replaced by the class name minus the word "Controller". Since the class is `EmployeesController`, the URL becomes: **`/api/employees`**! |
| `: ControllerBase` | Inherits built-in helper tools from ASP.NET (like `Ok()`, `NotFound()`, `BadRequest()`, and `Unauthorized()`). |
| `[HttpGet]` | Specifies that this method ONLY responds to **HTTP GET** requests (when React fetches data). If React sends a POST or DELETE, this method will ignore it. |
| `Task<IActionResult>` | `IActionResult` represents an **HTTP Response** (status code + headers + data). |
| `var employees = await _employeeService.GetAllEmployeesAsync();` | The controller **does zero database work itself**. It politely asks `_employeeService` to fetch the data. |
| `return Ok(employees);` | Packages the data into a **Status 200 OK** response and serializes `employees` into JSON for React. |

---

### Snippet 6: `Program.cs` — The Master Blueprint & Power Switch

`Program.cs` is the **very first file** that executes when you type `dotnet run`. It configures all your tools and starts the web server.

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);

// 1. Dependency Injection: Register our Service
builder.Services.AddScoped<IEmployeeService, EmployeeService>();

// 2. CORS Policy: Allow React (port 5173) to connect
builder.Services.AddCors(options => {
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader());
});

var app = builder.Build();

// 3. Middlewares (The Pipeline)
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run(); // 4. Ignition: Starts listening on port 5107!
```

#### 🔍 What is happening here? (Line-by-Line)

| Line of Code | Plain-English Explanation |
| :--- | :--- |
| `WebApplication.CreateBuilder(args);` | Initializes the server container and reads configuration files (like `appsettings.json` and `.env`). |
| `builder.Services.AddScoped<IEmployeeService, EmployeeService>();` | **Dependency Injection Registration**: Teaches ASP.NET: *"Whenever a Controller asks for `IEmployeeService`, automatically create and provide a new instance of `EmployeeService`."* |
| `builder.Services.AddCors(...)` | **CORS (Cross-Origin Resource Sharing)**: By default, browsers block web pages on port `5173` from calling APIs on port `5107`. This rule grants official permission to `http://localhost:5173`. |
| `var app = builder.Build();` | Freezes the configuration and builds the actual web application. |
| `app.UseCors(...)`, `app.UseAuthentication(...)` | **Middleware Pipeline**: Every incoming HTTP request must pass through these filters in order before reaching your Controller (check CORS &rarr; verify JWT token &rarr; check user permissions). |
| `app.MapControllers();` | Scans the whole project for classes with `[ApiController]` and turns their routes into active URLs. |
| `app.Run();` | Fires up the server and begins listening for incoming requests! |

---

## Part 4: The Full Request Cycle in Action

Let's watch what happens when you open your browser and view your employees:

```
1. YOU click "Employees" in your React app.
   React runs: fetch("http://localhost:5107/api/employees")
                                  │
                                  ▼
2. Request hits ASP.NET Core Middleware Pipeline (Program.cs)
   - Checks CORS: "Is port 5173 allowed?" -> YES!
   - Checks Auth: "Is the user logged in?" -> YES!
                                  │
                                  ▼
3. Request reaches EmployeesController.cs
   - Method with [HttpGet] triggers.
   - Calls: await _employeeService.GetAllEmployeesAsync()
                                  │
                                  ▼
4. EmployeeService.cs runs business logic
   - Asks PostgreSQL via EF Core: SELECT "Id", "FullName", "Department" FROM "Employees";
   - Maps database rows to safe EmployeeDto objects.
                                  │
                                  ▼
5. EmployeesController packages the result
   - Runs: return Ok(employees);
   - Sends HTTP 200 OK + JSON payload back across the wire.
                                  │
                                  ▼
6. React receives the JSON:
   [ { "id": 1, "fullName": "Patrick", "department": "Engineering" } ]
   and renders it into beautiful Tailwind cards!
```

---

## 📝 Activities: Explore the Real HRIS Backend

Now that you understand what all these keywords mean, let's explore your actual backend codebase at `HRIS-PAT/backend/`!

### Task 1: Map the Backend Folder Structure
1. Open the `HRIS-PAT/backend/` folder in your file explorer or terminal.
2. In `backend-notes.md` (or your answer sheet), list the subfolders you see:
   - `Controllers/`
   - `Services/`
   - `Models/`
   - `DTOs/`
   - `Data/`
3. Write one plain-English sentence next to each folder explaining its responsibility.

### Task 2: Trace a Controller Method
1. Open `backend/Controllers/EmployeesController.cs`.
2. Find any method marked with `[HttpGet]`.
3. Look at its return statement: what Service method does it call?
4. Open that corresponding Service file in `backend/Services/` and find the database query line containing `_context`.

### Task 3: Compare a Model vs its DTO
1. Open `backend/Models/AccomplishmentReport.cs` (or `Employee.cs`).
2. Open the matching file in `backend/DTOs/`.
3. List 2 fields that exist in the Model but were intentionally left out of the DTO.
4. Why do you think those fields were left out?

### Task 4: Inspect Program.cs
1. Open `backend/Program.cs`.
2. Find where `builder.Services.AddScoped` is called.
3. List 3 Services registered there.
4. Find `app.UseCors(...)` and see which frontend URL is permitted.

---

## 🧪 Test Checklist

Keep track of your answers in `lesson_6_0_answer.md`:

- [ ] Created a text map of the backend folder structure with one-sentence descriptions
- [ ] Traced a full request from a Controller method to a Service method to a DB query
- [ ] Compared a Model to its DTO and listed differences with explanations
- [ ] Listed services registered in `Program.cs` and identified CORS settings
