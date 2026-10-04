# Chapter 6: ASP.NET Core & C# Basics

## Lesson 6.3: The Service Pattern — The Brain of the Backend

In Lesson 6.2 you wrote a Controller with logic inside it. That works for a demo, but real projects don't do it. This lesson shows you why, and how professionals fix it.

> **Reading note:** The whole lesson is readable without a laptop. Only the activities need code.

**By the end of this lesson you will be able to:**
* Explain why Controllers must stay thin.
* Write an Interface + Service pair.
* Explain Dependency Injection in your own words.
* Register a service and choose the right lifetime.

---

## Part 1: The Problem — A "Fat" Controller

Imagine your Controller also had to check whether the name is empty, block duplicates, and calculate IDs:

```csharp
[HttpPost]
public IActionResult Create([FromBody] Employee emp)
{
    if (string.IsNullOrWhiteSpace(emp.Name)) return BadRequest("Name required");
    if (_employees.Any(e => e.Name == emp.Name)) return BadRequest("Duplicate");
    emp.Id = _employees.Max(e => e.Id) + 1;
    _employees.Add(emp);
    return Ok(emp);
}
```

Problems:
* **Hard to test.** You can't test the rules without simulating an HTTP request.
* **Hard to reuse.** Another controller that needs the same rule must copy and paste it.
* **Messy.** HTTP code (status codes, `Ok()`) and business rules are tangled together.

**The fix:** Move the thinking into a **Service**.

```
BEFORE:                         AFTER:
┌──────────────┐                ┌──────────────┐
│  Controller  │                │  Controller  │  ← only HTTP stuff
│  (everything)│                └──────┬───────┘
└──────────────┘                       │ calls
                                ┌──────▼───────┐
                                │   Service    │  ← all the rules
                                └──────────────┘
```

**Restaurant analogy:** The waiter (Controller) shouldn't cook. The waiter takes the order to the chef (Service) and brings back the food.

### Who decides what?

| Question | Who answers it |
| :--- | :--- |
| "Which URL and verb is this?" | **Controller** |
| "Is the name allowed? Is it a duplicate?" | **Service** |
| "Which HTTP status code do I send?" | **Controller** |
| "What are the next ID and the saved data?" | **Service** |

The Service never says `Ok()` or `NotFound()`. It doesn't know HTTP exists. It just reports what happened, and the Controller translates that into a status code.

---

## Part 2: Interfaces — Write the Contract First

Before writing the Service, you write an **Interface**, the list of things the Service promises to do.

### Snippet 1: The Interface

```csharp
public interface IEmployeeService
{
    List<Employee> GetAll();
    Employee? GetById(int id);
    (bool Succeeded, string Message, Employee? Employee) Create(Employee employee);
}
```

#### 🔍 What is happening here?

* **`interface`**: A contract with **no code inside**, only method signatures.
* **`I` prefix**: A C# naming rule (`IEmployeeService`).
* **`Employee?`**: The `?` means "this may return null" (when the ID isn't found).
* **The tuple `(bool Succeeded, string Message, Employee? Employee)`**: A way to return **several values at once**. This lets the Service report "it failed, and here's why" without knowing anything about HTTP. HRIS-PAT does exactly this: `UpdateEmployeeProfileAsync` returns `(bool Succeeded, string Message)`, and the Controller checks `result.Succeeded`.

### Snippet 2: The Service (the real implementation)

```csharp
public class EmployeeService : IEmployeeService
{
    private readonly List<Employee> _employees = new()
    {
        new Employee { Id = 1, Name = "Patrick", Department = "Engineering" },
        new Employee { Id = 2, Name = "Alice",   Department = "HR" }
    };

    public List<Employee> GetAll() => _employees;

    public Employee? GetById(int id) =>
        _employees.FirstOrDefault(e => e.Id == id);

    public (bool Succeeded, string Message, Employee? Employee) Create(Employee employee)
    {
        if (string.IsNullOrWhiteSpace(employee.Name))
            return (false, "Name is required.", null);

        if (_employees.Any(e => e.Name == employee.Name))
            return (false, "An employee with that name already exists.", null);

        employee.Id = _employees.Count == 0 ? 1 : _employees.Max(e => e.Id) + 1;
        _employees.Add(employee);

        return (true, "Employee created.", employee);
    }
}
```

#### 🔍 What is happening here?

| Line of Code | Plain-English Explanation |
| :--- | :--- |
| `: IEmployeeService` | "I promise to provide every method in that contract." If you forget one, the compiler errors. |
| `private readonly List<Employee> _employees` | The fake database. `private readonly` = locked and hidden. |
| `public List<Employee> GetAll() => _employees;` | The `=>` form is a one-line method body. |
| `return (false, "Name is required.", null);` | Business rule: reject the request and explain why. Notice there is no HTTP code here. |
| `employee.Id = ... + 1;` | Business logic lives here now: "give the new employee the next ID." |
| `return (true, "Employee created.", employee);` | Success: report it and hand back the new employee. |

### The Controller now just translates

```csharp
[HttpPost]
public IActionResult Create([FromBody] Employee newEmployee)
{
    var result = _employeeService.Create(newEmployee);

    if (!result.Succeeded)
        return BadRequest(result.Message);

    return CreatedAtAction(nameof(GetById), new { id = result.Employee!.Id }, result.Employee);
}
```

Compare this with the "fat" version in Part 1. The rules are gone. The Controller only turns the Service's answer into an HTTP response. (`result.Employee!` means "I know this isn't null here because Succeeded is true".)

**Why bother with the interface?** The Controller will depend on the *contract*, not the specific class. You could swap in a database-backed service later and the Controller would not change.

### A real-world note: services are usually `async`

In Lesson 6.1c you learned `async`/`await`. Real services that talk to a database are async. The same interface would look like this in HRIS-PAT:

```csharp
Task<List<Employee>> GetAllAsync();
Task<Employee?> GetByIdAsync(int id);
```

We keep the practice code synchronous so you can focus on the pattern. In Unit 7 it becomes async when a real database is added.

---

## Part 3: Dependency Injection (DI) — The Magic Delivery

Here is the question: the Controller needs an `IEmployeeService`. Who creates it?

**Without DI**, the Controller would build it itself:
```csharp
var service = new EmployeeService();   // ❌ the Controller is now glued to this exact class
```

**With DI**, the Controller just says "I need one" and ASP.NET delivers it:

```csharp
public class EmployeesController : ControllerBase
{
    private readonly IEmployeeService _employeeService;

    public EmployeesController(IEmployeeService employeeService)
    {
        _employeeService = employeeService;
    }

    [HttpGet]
    public IActionResult GetAll() => Ok(_employeeService.GetAll());
}
```

```
        ┌──────────────────────────┐
        │  ASP.NET DI Container    │   "I know how to build an
        │  (the delivery service)  │    IEmployeeService → EmployeeService"
        └────────────┬─────────────┘
                     │ injects it into the constructor
                     ▼
        EmployeesController(IEmployeeService employeeService)
```

#### 🔍 What is happening here?

* The **constructor** asks for `IEmployeeService`. This is the "I need one" request.
* ASP.NET sees the request, builds an `EmployeeService`, and passes it in.
* `private readonly` stores it so it can't be replaced later.
* The Controller now only calls `_employeeService.GetAll()`. It has no idea *how* the data is fetched.

### Services can need other things too

A Service can ask for its own dependencies in its constructor. ASP.NET delivers them in a chain. This is the real constructor from HRIS-PAT's `EmployeeService.cs`:

```csharp
public EmployeeService(
    UserManager<ApplicationUser> userManager,
    ApplicationDbContext context)
{
    _userManager = userManager;
    _context = context;
}
```

```
Controller asks for → IEmployeeService
                          │ ASP.NET builds EmployeeService, which asks for →
                          ├── UserManager<ApplicationUser>   (user accounts)
                          └── ApplicationDbContext           (database)
ASP.NET builds those too, then delivers the whole chain.
```

You never write `new` for any of them.

### Snippet 3: Registering the Service in `Program.cs`

ASP.NET only knows how to deliver what you've **registered**:

```csharp
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
```

Read it as: *"Whenever someone asks for `IEmployeeService`, give them an `EmployeeService`."*

This is the same line you found in HRIS-PAT's `Program.cs` (line 143).

**What if you forget to register it?** The app crashes the first time the controller is used, with an error like:

```
InvalidOperationException: Unable to resolve service for type
'IEmployeeService' while attempting to activate 'EmployeesController'.
```

Translation: "The controller asked for something nobody registered." The fix is always to add the missing `AddScoped` line.

### Swapping implementations (why the interface pays off)

Because the Controller only knows the interface, you can swap the class behind it by changing one line:

```csharp
// Today:
builder.Services.AddScoped<IEmployeeService, EmployeeService>();

// Later, for testing, without touching the Controller at all:
builder.Services.AddScoped<IEmployeeService, FakeEmployeeService>();
```

This is also how unit tests (Unit 11) replace a real database with fake data.

---

## Part 4: Lifetimes — How Long Does the Service Live?

| Method | Lifetime | Analogy |
| :--- | :--- | :--- |
| `AddSingleton` | One instance for the **entire app** | One shared office printer |
| `AddScoped` | One new instance **per HTTP request** | A fresh notepad for each customer visit |
| `AddTransient` | A new instance **every time it's requested** | A disposable cup |

```
Request 1 ──► Scoped: instance A      Singleton: instance X
Request 2 ──► Scoped: instance B      Singleton: instance X   (same one)
Request 3 ──► Scoped: instance C      Singleton: instance X   (same one)
```

**Rule of thumb:** use **`AddScoped`** for services that work with a database. HRIS-PAT registers `IEmployeeService`, `INotificationService` and `IAuditLogService` as Scoped, and uses Singleton only for things like the email sender.

### ⚠️ The Trap in THIS Lesson's Practice Code

Our practice service keeps its fake data **inside the service object**, in `_employees`. Now think about what each lifetime does:

* **Scoped:** a brand-new `EmployeeService` (and a brand-new list) is created for every request. A POST adds an employee, then the next GET gets a *fresh* service with the original data. **Your new employee vanishes.**
* **Singleton:** one service, one list, shared forever. The data survives between requests.

So for the **practice** service, register it as a **Singleton**:

```csharp
// Practice only: the "database" is a list in memory, so the service must live forever.
builder.Services.AddSingleton<IEmployeeService, EmployeeService>();
```

Once Unit 7 adds a real database, the data lives in PostgreSQL instead of inside the service, and you'll switch to `AddScoped`, like HRIS-PAT.

---

## 🏁 Lesson Summary & Key Takeaways (Cheat Sheet)

### 1. Thin Controller, Smart Service
* Controller: receives the request, calls the Service, picks the HTTP status code.
* Service: validation, rules, calculations, data access. It knows nothing about HTTP.

### 2. The 3-Piece Recipe
1. **Interface** (`IEmployeeService`): the contract.
2. **Service** (`EmployeeService : IEmployeeService`): the implementation.
3. **Registration** (`AddScoped<IEmployeeService, EmployeeService>()`): tells ASP.NET how to build it.

### 3. Dependency Injection
* Ask for what you need in the **constructor**. Don't use `new`.
* Store it as `private readonly`.
* ASP.NET delivers it (and everything *it* needs) from the DI container.
* Forgot to register? You get `Unable to resolve service for type...`.

### 4. Lifetimes
* `Singleton` = one forever · `Scoped` = one per request (default for database services) · `Transient` = new every time.
* In-memory fake data needs a Singleton. Real database services use Scoped.

### 5. Returning Results
* A Service can return a tuple `(bool Succeeded, string Message, ...)` and let the Controller choose the status code.

### 6. What's Next
In **Lesson 6.4**, you'll stop returning raw `Employee` objects to React and learn **DTOs**.

---

## ✅ Check Your Understanding

Answer in your own words in `lesson_6_3_answer.md`:

1. Why shouldn't a Service return `Ok()` or `NotFound()`?
2. What does the DI container do when a Controller's constructor asks for `IEmployeeService`?
3. What error appears if you forget `AddScoped`, and what does it mean?
4. Why must the practice service be a Singleton, but HRIS-PAT's services are Scoped?

---

## 📝 Activities: Refactor to the Service Pattern

> Continue in your `PRACTICE/backend/PracticeApi/` project from Lesson 6.2.

### Task 1: Create the Interface
1. Create a `Services/` folder.
2. Create `IEmployeeService.cs` with `GetAll()`, `GetById(int id)`, `Create(...)`, `Update(...)` and `Delete(int id)`.

### Task 2: Create the Service
1. Create `EmployeeService.cs` that implements the interface.
2. Move the fake employee list and all logic out of your controller and into the service.
3. In `Create`, add the two rules from Snippet 2 (name required, no duplicate names) and return the tuple.

### Task 3: Register It
1. In `Program.cs`, add `builder.Services.AddSingleton<IEmployeeService, EmployeeService>();`.

### Task 4: Inject It
1. Update `EmployeesController` to take `IEmployeeService` in its constructor and store it as `private readonly`.
2. Make each endpoint just call the service, and translate the result into the right status code.

### Task 5: Verify
1. Run the app and re-test every endpoint in Swagger. They should behave exactly as before.
2. POST a duplicate name and confirm you get **400** with the message from the Service.

### Task 6: The Lifetime Experiment
1. Temporarily change the registration to `AddScoped`.
2. POST a new employee, then GET all. Write down what happened to the new employee.
3. Change it back to `AddSingleton`, repeat, and write down the difference.
4. Explain *why* in one or two sentences.

### Task 7: Break It On Purpose
1. Comment out the registration line and run the app. Hit any endpoint.
2. Copy the error message into your answer file and explain it. Then restore the line.

### Task 8: Real-World Comparison
1. Open `HRIS-PAT/backend/Services/EmployeeService.cs`.
2. Write 2 things it does that yours doesn't (hint: look at its constructor parameters, and whether its methods are `async`).

---

## 🧪 Test Checklist

Keep track of your answers in `lesson_6_3_answer.md`:

- [ ] Created `IEmployeeService` interface
- [ ] Created `EmployeeService` implementing it, with the logic moved out of the controller
- [ ] Registered the service in `Program.cs`
- [ ] Injected the service into the controller via the constructor (`private readonly`)
- [ ] All endpoints still work after the refactor, and duplicates return 400
- [ ] Ran the lifetime experiment and explained the result
- [ ] Triggered the "unable to resolve service" error and explained it
- [ ] Compared my service with the HRIS-PAT one
