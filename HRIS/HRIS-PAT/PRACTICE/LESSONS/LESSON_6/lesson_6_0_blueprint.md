# Chapter 6: ASP.NET Core & C# Basics

## Lesson 6.0: Backend File & Folder Structure (The Blueprint)

Before writing a single line of C# code, you need to understand **how a professional backend is organized**. Just like how you learned the React `src/` folder pattern before writing components, this lesson maps out the terrain of the backend.

You already have a real, working example right in front of you — the HRIS backend at `HRIS-PAT/backend/`. We will use it as the reference.

---

## Part 1: The Big Picture — Where Does the Backend Fit?

```
BROWSER (React App)
      |
      |  HTTP Requests (GET, POST, PUT, DELETE)
      |
      v
+-------------------------------------+
|        ASP.NET CORE BACKEND         |
|  (runs on localhost:5107)           |
|                                     |
|  Program.cs  <- starts everything  |
|      |                              |
|      +-- Controllers/               |
|      +-- Services/                  |
|      +-- Models/                    |
|      +-- DTOs/                      |
|      +-- Interfaces/                |
|      +-- Migrations/                |
+----------------+--------------------+
                 |
                 v
         PostgreSQL Database
```

The backend is a **middleman**. The React frontend never talks to the database directly -- it always goes through the backend API.

---

## Part 2: The Layered Architecture -- The 6 Folders You Must Know

Think of building a house. There are separate teams: architects, electricians, plumbers. Each team has ONE job and doesn't interfere with the others. A backend works the same way.

```
HTTP REQUEST comes in
        |
        v
+------------------+
|  CONTROLLERS/    |  <- The "Reception Desk"
|                  |    Receives the request.
|                  |    Validates inputs.
|                  |    Calls the Service.
|                  |    Returns the response.
|                  |    NO business logic here!
+--------+---------+
         | calls
         v
+------------------+
|   SERVICES/      |  <- The "Brain"
|                  |    All business logic lives here.
|                  |    Decides WHAT to do.
|                  |    Calls the database.
|                  |    Throws errors if rules are broken.
+--------+---------+
         | talks to
         v
+------------------+
|   DATABASE       |  <- Via Entity Framework (EF Core)
|  (PostgreSQL)    |    using Models/ and Migrations/
+------------------+
```

### The 6 Folders Explained

| Folder | Job | Analogy |
| :--- | :--- | :--- |
| `Controllers/` | Receives HTTP requests, returns responses | The waiter taking your order |
| `Services/` | Contains all business logic | The chef cooking your food |
| `Models/` | C# classes that map to database tables | The ingredient list |
| `DTOs/` | Simplified data objects sent to the frontend | The plated dish (only what the customer sees) |
| `Interfaces/` | Contracts that define what a Service must do | A job description |
| `Migrations/` | Auto-generated DB schema change history | Git history, but for your database |

---

## Part 3: Deep Dive -- What Each File Actually Looks Like

### Models/ -- The Database Blueprint
A Model is a plain C# class that maps to a database table. Every property becomes a column.

```csharp
// Models/Employee.cs
public class Employee
{
    public int Id { get; set; }           // column: "Id" (primary key)
    public string FullName { get; set; }  // column: "FullName"
    public string Department { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}
```

### DTOs/ -- What Gets Sent to the Frontend
A DTO (Data Transfer Object) is what you ACTUALLY send to React. It is a trimmed-down version of the Model.
You NEVER send the raw Model directly -- it might contain passwords or internal data the frontend shouldn't see.

```csharp
// DTOs/EmployeeDto.cs
public class EmployeeDto
{
    public int Id { get; set; }
    public string FullName { get; set; }
    public string Department { get; set; }
    // Notice: no "IsActive" or "CreatedAt" -- the frontend doesn't need those
}
```

**Why bother?** Imagine your Model has a `PasswordHash` field.
If you returned the raw Model, you'd send the password hash to every browser. DTOs prevent that.

### Services/ -- The Business Logic
The Service contains all the "rules" of your application.

```csharp
// Services/EmployeeService.cs
public class EmployeeService : IEmployeeService
{
    private readonly AppDbContext _context;

    // Database is "injected" through the constructor (Dependency Injection!)
    public EmployeeService(AppDbContext context)
    {
        _context = context;
    }

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

### Controllers/ -- The Entry Point
The Controller receives the HTTP request and delegates the work to the Service.
It should be thin -- no logic, just coordination.

```csharp
// Controllers/EmployeesController.cs
[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly IEmployeeService _employeeService;

    public EmployeesController(IEmployeeService employeeService)
    {
        _employeeService = employeeService;
    }

    // Handles: GET /api/employees
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var employees = await _employeeService.GetAllEmployeesAsync();
        return Ok(employees); // 200 OK
    }
}
```

In plain English: "When a GET request arrives at /api/employees, ask the Service to get all employees, then return them."

### Interfaces/ -- The Job Description
An Interface is a contract. It says "any class that implements me MUST have these methods."

```csharp
// Interfaces/IEmployeeService.cs
public interface IEmployeeService
{
    Task<List<EmployeeDto>> GetAllEmployeesAsync();
    Task<EmployeeDto> GetByIdAsync(int id);
    Task CreateAsync(EmployeeDto dto);
}
```

---

## Part 4: Program.cs -- Where Everything Is Wired Together

`Program.cs` is the first file that runs. It registers all the services and configures middleware.

```csharp
// Program.cs (simplified)
var builder = WebApplication.CreateBuilder(args);

// 1. Register services (Dependency Injection)
builder.Services.AddScoped<IEmployeeService, EmployeeService>();

// 2. Configure CORS so the React frontend can talk to this backend
builder.Services.AddCors(options => {
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:5173").AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

// 3. Apply middleware
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run(); // 4. Start the server
```

---

## Part 5: The Full Request Journey

This is the most important diagram. Memorize this flow:

```
React Frontend sends: GET http://localhost:5107/api/employees
                                        |
                                        v
                             [ EmployeesController ]
                             Receives the HTTP request.
                             Calls _employeeService.GetAllEmployeesAsync()
                                        |
                                        v
                             [ EmployeeService ]
                             Queries the database:
                             _context.Employees.ToListAsync()
                             Maps results to EmployeeDto objects
                                        |
                                        v
                             [ PostgreSQL Database ]
                             Returns rows from "Employees" table
                                        |
                              (back up the chain)
                                        |
                                        v
                             [ EmployeesController ]
                             return Ok(employees);
                                        |
                                        v
              React Frontend receives JSON: [{ "id": 1, "fullName": "..." }, ...]
```

---

## Part 6: Naming Conventions in C#

| Thing | Convention | Example |
| :--- | :--- | :--- |
| Classes | PascalCase | `EmployeeService` |
| Methods | PascalCase | `GetAllEmployeesAsync()` |
| Properties | PascalCase | `public string FullName` |
| Variables | camelCase | `var employeeCount = 5;` |
| Private fields | _camelCase | `private readonly AppDbContext _context;` |
| Interfaces | IPascalCase | `IEmployeeService` |

---

## Activities: Explore the HRIS Backend

All activities use the REAL backend code at `HRIS-PAT/backend/`. You are a code archaeologist today.

### Task 1: Map the Backend Folder Structure
1. Open the `HRIS-PAT/backend/` folder in VS Code.
2. In `backend-notes.md`, draw a text tree of all the subfolders you see.
3. Write ONE sentence next to each folder describing what it contains.

### Task 2: Trace a Request
1. Open `Controllers/EmployeesController.cs`.
2. Find any method decorated with `[HttpGet]`.
3. Identify which Service method it calls.
4. Open that Service file and find what the Service does.
5. Write the full journey: Controller method -> Service method -> DB query.

### Task 3: Compare Model vs. DTO
1. Find any file inside `Models/` (e.g., `Employee.cs`).
2. Find its corresponding DTO file inside `DTOs/`.
3. List 3 differences between them.
4. Write one sentence explaining WHY those fields were left out of the DTO.

### Task 4: Read Program.cs
1. Open `Program.cs` in the HRIS backend.
2. Find where services are registered (`builder.Services.AddScoped...`).
3. List 5 services you see being registered.
4. Find where `UseCors` is called and note what origins are allowed.

---

## Test Checklist

Update `lesson_6_0_answer.md` when done:

- [ ] Created a text map of the backend folder structure with one-sentence descriptions
- [ ] Traced a full request from a Controller method to a Service method to a DB query
- [ ] Compared a Model to its DTO and listed 3 differences with explanations
- [ ] Listed 5 services registered in `Program.cs` and noted the CORS origins

---

## Final Score: ___/10

**Summary:**
- [ ] Activity completed (`backend-notes.md` reviewed)
- [ ] All 4 tasks answered

**Ready for:** Lesson 6.1 -- C# Fundamentals: Variables, Types & Syntax!
