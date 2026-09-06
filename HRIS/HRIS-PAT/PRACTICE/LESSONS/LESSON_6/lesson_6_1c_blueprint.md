# Chapter 6: ASP.NET Core & C# Basics

## Lesson 6.1c: Async/Await, Task<T> & LINQ — The Power Tools of C#

Welcome to the most important toolset in modern .NET backend engineering!

If you open the HRIS backend code, you will notice two things on almost every single line:
1. `async`, `await`, and `Task<T>`
2. `.Where(...)`, `.Select(...)`, `.FirstOrDefaultAsync(...)` (LINQ)

These are the two superpowers that make ASP.NET Core one of the fastest web frameworks in the world.

---

## Part 1: Why Async Matters — The Restaurant Waiter Metaphor

Imagine a restaurant with only ONE waiter (representing a CPU Server Thread).

```
   SYNCHRONOUS RESTAURANT (Slow, Thread Blocked)
   1. Waiter takes Order #1.
   2. Waiter walks into the kitchen and STANDS STILL waiting for the chef to cook (5 mins).
   3. Other customers are starving and cannot order!
   4. Waiter finally brings food to Table #1, then moves to Table #2.

   ASYNCHRONOUS RESTAURANT (Fast, Non-Blocking)
   1. Waiter takes Order #1 and hands the ticket to the kitchen.
   2. Instead of waiting, the waiter IMMEDIATELY takes orders for Tables #2, #3, and #4!
   3. When Chef rings the bell ("Order #1 is ready!"), ANY available waiter picks it up and serves it.
```

### In Web Development:
- **The Kitchen** = The PostgreSQL Database or external API.
- **The Waiter** = The ASP.NET Core thread.
- **`await`** = "Hey database, go execute this query. While you do that, let my server thread go handle other user requests!"

---

## Part 2: `Task<T>` — C#'s Version of `Promise<T>`

If you know JavaScript Promises, `Task` is the exact same thing:

```
┌───────────────────────────────┬────────────────────────────────────────────┐
│ JavaScript / TypeScript       │ C#                                         │
├───────────────────────────────┼────────────────────────────────────────────┤
│ Promise<void>                 │ Task                                       │
│ Promise<string>               │ Task<string>                               │
│ Promise<Employee[]>           │ Task<List<Employee>>                       │
│ async function getData() {...}│ public async Task<string> GetDataAsync() {}│
│ const res = await fetch()     │ var res = await client.GetAsync()          │
└───────────────────────────────┴────────────────────────────────────────────┘
```

### The 2 Golden Rules of Async in C#:
1. **If you use `await` inside a method, the method header MUST be marked `async`:**
   ```csharp
   public async Task<string> FetchUserNameAsync(int id)
   {
       await Task.Delay(500); // simulates waiting 500ms for database
       return "Patrick";
   }
   ```
2. **Never return `void` on an async method (except event handlers). Always return `Task` or `Task<T>`!**

---

## Part 3: The Async Chain in ASP.NET Core

Every layer in your backend awaits the layer beneath it:

```
HTTP GET /api/employees
       │
       ▼
[ Controller ]
var employees = await _employeeService.GetAllAsync();
       │
       ▼
[ Service ]
var data = await _context.Employees.ToListAsync();
       │
       ▼
[ PostgreSQL Database ]
Executes: SELECT * FROM "Employees";
```

Notice the chain: `Controller awaits Service` &rarr; `Service awaits Database`.

---

## Part 4: LINQ — Language Integrated Query (SQL Inside C#)

Before LINQ, programmers had to write messy `for` loops with 20 lines of `if` checks just to filter a list.
**LINQ** gives you clean, declarative, SQL-like queries right inside your C# code!

### The Essential LINQ Methods:

```csharp
List<Employee> employees = GetSampleEmployees();
```

### 1. `.Where()` — The Filter (Like SQL `WHERE` or JS `.filter()`)
```csharp
// Find all active employees:
var activeEmployees = employees.Where(e => e.IsActive).ToList();
```

### 2. `.Select()` — The Transformer (Like SQL `SELECT` or JS `.map()`)
```csharp
// Extract only employee names into a List<string>:
List<string> names = employees.Select(e => e.FullName).ToList();
```

### 3. `.FirstOrDefault()` — Find One (or Null)
```csharp
// Find the employee with Id == 101:
Employee? match = employees.FirstOrDefault(e => e.Id == 101);
```

### 4. `.OrderBy()` & `.OrderByDescending()` — Sorting (Like SQL `ORDER BY`)
```csharp
var sortedBySalary = employees.OrderByDescending(e => e.Salary).ToList();
```

### 5. `.Any()` & `.Count()` — Fast Checks
```csharp
bool hasSuperAdmin = employees.Any(e => e.Role == "SuperAdmin"); // true or false
int inactiveCount = employees.Count(e => !e.IsActive);
```

---

## Part 5: LINQ + Entity Framework Core = Automatic SQL!

Here is the magic of the HRIS backend:
When you write LINQ on a database table (`DbSet<Employee>`), Entity Framework Core **translates your C# code into real PostgreSQL SQL!**

```csharp
// What you write in C#:
var developers = await _context.Employees
    .Where(e => e.Department == "Engineering" && e.IsActive)
    .OrderBy(e => e.LastName)
    .ToListAsync();
```

```sql
-- What EF Core automatically generates and sends to PostgreSQL:
SELECT "Id", "FirstName", "LastName", "Department", "IsActive"
FROM "Employees"
WHERE "Department" = 'Engineering' AND "IsActive" = TRUE
ORDER BY "LastName" ASC;
```

You get full type-safety and auto-complete in C#, and PostgreSQL handles the lightning-fast filtering on the database engine!

---

## 📝 Activities: Async & LINQ Playground

### Task 1: Simulated Async Delay
1. Write an `async Task<string> FetchGreetingAsync(string name)` method.
2. Inside it, write `await Task.Delay(1000);` to simulate a 1-second network call.
3. Return `$"Hello, {name}! Your data was fetched asynchronously."`.
4. Call it from your test program using `await` and print the output.

### Task 2: Master LINQ Filtering & Chaining
Suppose you have this dataset:
```csharp
public record EmployeeRecord(int Id, string Name, string Department, double Salary, bool IsActive);

var team = new List<EmployeeRecord>
{
    new(1, "Patrick", "Engineering", 75000, true),
    new(2, "Alice",   "HR",          50000, true),
    new(3, "Bob",     "Engineering", 60000, false),
    new(4, "Charlie", "Engineering", 90000, true),
    new(5, "Diana",   "Marketing",   55000, false)
};
```
Write LINQ queries to:
1. Find all employees who are active (`.Where`).
2. Get the highest paid employee in "Engineering" (`.OrderByDescending` + `.FirstOrDefault`).
3. Check if there are any inactive employees (`.Any`).
4. **Chained Query:** In one single LINQ chain, get only active employees in "Engineering", ordered alphabetically by Name, and return only their names (`List<string>`).

### Task 3: Inspect HRIS Backend Async & LINQ
1. Open `backend/Services/AccomplishmentReportService.cs` (or `backend/Services/EmployeeService.cs`).
2. Find one method marked `async Task<...>`.
3. Locate an `await` statement that calls Entity Framework Core (e.g., `ToListAsync()`, `FirstOrDefaultAsync()`, or `SaveChangesAsync()`).
4. Copy that line into your notes and explain what database operation is happening!

---

## 🧪 Test Checklist

Keep track of your answers in `lesson_6_1c_answer.md`:

- [ ] Explained the difference between synchronous blocking and asynchronous non-blocking
- [ ] Created and awaited an `async Task<string>` method with `Task.Delay`
- [ ] Filtered a list using `.Where()` and transformed it using `.Select()`
- [ ] Found a single record using `.FirstOrDefault()`
- [ ] Built a chained LINQ expression (`.Where` &rarr; `.OrderBy` &rarr; `.Select`)
- [ ] Inspected real LINQ & async code inside the HRIS backend
