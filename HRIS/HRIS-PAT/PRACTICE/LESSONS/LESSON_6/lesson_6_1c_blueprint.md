# Chapter 6: ASP.NET Core & C# Basics

## Lesson 6.1c: Async/Await, Task<T> & LINQ — The Power Tools of C#

Welcome to the most important toolset in modern .NET backend engineering!

If you open any file in your HRIS backend, you will notice two things on almost every single line:
1. `async`, `await`, and `Task<T>`
2. `.Where(...)`, `.Select(...)`, `.FirstOrDefaultAsync(...)` (LINQ)

These two superpowers allow ASP.NET Core to handle millions of requests without breaking a sweat.

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
- **The Kitchen** = The PostgreSQL Database or external network API.
- **The Waiter** = The ASP.NET Core thread.
- **`await`** = *"Hey PostgreSQL, execute this SQL query. While you do that, let my server thread go serve other React users!"*

---

## Part 2: `Task<T>` — C#'s Version of `Promise<T>`

If you know JavaScript Promises, you already know C# Tasks!

```
┌─────────────────────────────────┬────────────────────────────────────────────┐
│ JavaScript / TypeScript         │ C#                                         │
├─────────────────────────────────┼────────────────────────────────────────────┤
│ Promise<void>                   │ Task                                       │
│ Promise<string>                 │ Task<string>                               │
│ Promise<Employee[]>             │ Task<List<Employee>>                       │
│ async function getData() {...}  │ public async Task<string> GetDataAsync() {}│
│ const res = await fetch(...)    │ var res = await client.GetAsync(...)       │
└─────────────────────────────────┴────────────────────────────────────────────┘
```

---

### Snippet 1: Writing an Async Method

```csharp
public async Task<string> FetchUserNameAsync(int id)
{
    // Simulates waiting 500ms for a database response without blocking the server thread:
    await Task.Delay(500); 

    return "Patrick";
}
```

#### 🔍 The 2 Golden Rules of Async in C#:
1. **If you use `await` inside a method, the method signature MUST have `async`:**
   ```csharp
   public async Task<string> MyMethod() // ✅ Correct!
   ```
2. **Never return `void` on an async method. Always return `Task` or `Task<T>`:**
   - Returning `void` prevents callers from awaiting errors.
   - Use `Task` if you don't return anything (like `void`).
   - Use `Task<string>` if you return a string.

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

Notice the unbroken chain: `Controller awaits Service` &rarr; `Service awaits Database`.

---

## Part 4: LINQ — Language Integrated Query (SQL Inside C#)

Before LINQ, developers had to write 15 lines of messy `for` loops and `if` statements just to filter a list.
**LINQ** gives you clean, declarative, SQL-like queries right inside your C# code!

---

### Snippet 2: LINQ Methods vs JavaScript Array Methods

Suppose you have a list of employees:
```csharp
List<Employee> employees = GetSampleEmployees();
```

| LINQ Method (C#) | JavaScript Equivalent | Plain-English Job |
| :--- | :--- | :--- |
| **`.Where(e => e.IsActive)`** | `.filter(e => e.isActive)` | **Filter**: Keeps only items that match the condition. |
| **`.Select(e => e.FullName)`** | `.map(e => e.fullName)` | **Transform**: Extracts or shapes the data. |
| **`.FirstOrDefault(e => e.Id == 1)`** | `.find(e => e.id === 1)` | **Find One**: Returns the first match, or `null` if not found. |
| **`.OrderBy(e => e.Salary)`** | `.sort((a,b) => a.salary - b.salary)` | **Sort Ascending**: Sorts from lowest to highest. |
| **`.OrderByDescending(e => e.Salary)`**| `.sort((a,b) => b.salary - a.salary)` | **Sort Descending**: Sorts from highest to lowest. |
| **`.Any(e => e.IsAdmin)`** | `.some(e => e.isAdmin)` | **Check**: Returns `true` if at least ONE item matches. |
| **`.Count(e => !e.IsActive)`** | `.filter(...).length` | **Count**: Returns the number of matching items. |
| **`.ToList()`** | *(Already an array in JS)* | **Materialize**: Finalizes the query into an active `List<T>`. |

---

### Snippet 3: Chaining LINQ Methods Together

You can chain LINQ methods into one elegant pipeline:

```csharp
List<string> developerNames = employees
    .Where(e => e.Department == "Engineering" && e.IsActive) // 1. Filter
    .OrderBy(e => e.FullName)                               // 2. Sort alphabetically
    .Select(e => e.FullName)                                // 3. Extract just names
    .ToList();                                              // 4. Save to List<string>
```

#### 🔍 What is happening here? (Line-by-Line Breakdown)
1. **`.Where(...)`**: Throws away everyone who is not an active member of Engineering.
2. **`.OrderBy(...)`**: Takes the remaining engineers and sorts them alphabetically.
3. **`.Select(...)`**: Drops the salary, ID, and department, extracting only the `FullName` string.
4. **`.ToList()`**: Converts the result into a clean `List<string>`.

---

## Part 5: LINQ + Entity Framework Core = Automatic SQL!

Here is the secret magic of the HRIS backend:
When you run LINQ queries on a database table (`_context.Employees`), Entity Framework Core **translates your C# code directly into PostgreSQL SQL!**

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

You write safe, strongly-typed C# with auto-complete in VS Code, and PostgreSQL does the lightning-fast filtering on the database server!

---

## 🏁 Lesson Summary & Key Takeaways (Cheat Sheet)

Here is your quick **freeCodeCamp-style cheat sheet** for Async/Await and LINQ:

### 1. Synchronous vs Asynchronous
* **Synchronous**: Blocks the server thread while waiting for the database or network.
* **Asynchronous (`async` / `await`)**: Frees up the server thread to handle other users while the database query executes in the background.

### 2. `Task` and `Task<T>`
* C#'s equivalent of JavaScript's **`Promise`**:
  * `Task` = `Promise<void>` (returns nothing).
  * `Task<string>` = `Promise<string>` (returns text).
* **The 2 Rules**:
  1. Any method using `await` must be marked `async`.
  2. Always return `Task` or `Task<T>` (never `void` on async methods).

### 3. LINQ Methods Cheat Sheet (vs JavaScript)
| C# LINQ | JavaScript Equivalent | Purpose |
| :--- | :--- | :--- |
| **`.Where(e => ...)`** | `.filter(e => ...)` | Filter records |
| **`.Select(e => ...)`** | `.map(e => ...)` | Project / transform properties |
| **`.FirstOrDefault(...)`**| `.find(...)` | Find single match or null |
| **`.OrderBy(...)`** | `.sort(...)` | Sort ascending |
| **`.OrderByDescending(...)`** | `.sort(...)` | Sort descending |
| **`.Any(...)`** | `.some(...)` | Check if at least one exists |
| **`.Count(...)`** | `.filter(...).length`| Count matching records |
| **`.ToListAsync()`** | *(Promise resolve)* | Execute SQL asynchronously & load list |

### 4. Entity Framework Core Translation
* Writing LINQ on `_context.DbSet` does not run in memory — EF Core compiles it into real **PostgreSQL SQL** (`SELECT ... FROM ... WHERE ...`).

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
