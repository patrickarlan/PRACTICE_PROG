# Chapter 6: ASP.NET Core & C# Basics

## Lesson 6.2: ASP.NET Core Controllers & Routing

In Lesson 6.0 you saw that a **Controller** is the "waiter" of the backend: it receives the HTTP request and sends back the response. In this lesson you will learn exactly how that works, and then build your own.

> **Reading note:** You can read this whole lesson without a laptop. Only the activities at the end need you to code.

**By the end of this lesson you will be able to:**
* Explain how a request travels from React to a Controller method.
* Write `GET`, `GET by id`, `POST`, `PUT`, and `DELETE` endpoints.
* Return the correct HTTP status code for each situation.
* Test your API in Swagger.

---

## Part 1: What Is a Controller, Really?

A Controller is just a **C# class** whose **methods** are connected to **URLs**.

```
React:  fetch("http://localhost:5107/api/employees")
                          │
                          ▼
     ┌─────────────────────────────────────────────┐
     │  EmployeesController (class)                │
     │                                             │
     │  GetAll()   <── GET    /api/employees       │
     │  GetById()  <── GET    /api/employees/5     │
     │  Create()   <── POST   /api/employees       │
     │  Update()   <── PUT    /api/employees/5     │
     │  Delete()   <── DELETE /api/employees/5     │
     └─────────────────────────────────────────────┘
```

Each method is one **endpoint**. It works like React Router: a URL maps to a piece of code. In React, `/projects` maps to `<ProjectPage />`. In the backend, `GET /api/employees` maps to `GetAll()`.

### How does ASP.NET find your controllers?

Two lines in `Program.cs` make this work. Without them your controller is invisible:

```csharp
builder.Services.AddControllers();   // 1. "Register all controller classes"
// ...
app.MapControllers();                // 2. "Turn their [Route]s into real URLs"
```

You saw `MapControllers()` in Lesson 6.0. In HRIS-PAT, `AddControllers()` is on line 115 of `Program.cs` and `MapControllers()` is on line 330.

### The life of one request

```
 1. React sends   GET /api/employees
        │
 2.     ▼  Middleware pipeline (CORS, authentication...) from Program.cs
        │
 3.     ▼  Routing: "Which method matches GET + /api/employees?"
        │
 4.     ▼  EmployeesController.GetAll() runs
        │
 5.     ▼  It returns Ok(employees)   →  HTTP 200 + JSON
        │
 6. React receives  [{"id":1,"name":"Patrick"}, ...]
```

Notice step 3. ASP.NET picks the method using **both** the URL **and** the HTTP verb. The same URL `/api/employees` can run different methods depending on whether the request is GET or POST.

---

## Part 2: HTTP Verbs — The Four Actions

You learned GET, POST, PUT, DELETE in Lesson 1.1. Each has a matching **attribute** in C#:

| HTTP Verb | C# Attribute | What it means | Real-life analogy |
| :--- | :--- | :--- | :--- |
| GET | `[HttpGet]` | Read data | Looking at a menu |
| POST | `[HttpPost]` | Create new data | Placing a new order |
| PUT | `[HttpPut]` | Update existing data | Changing your order |
| DELETE | `[HttpDelete]` | Remove data | Cancelling your order |

An **attribute** is the `[...]` label written above a method. It does not run code. It *labels* the method so ASP.NET knows when to call it.

---

### Snippet 1: A Minimal Controller

```csharp
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        var employees = new List<string> { "Patrick", "Alice", "Bob" };
        return Ok(employees);
    }
}
```

#### 🔍 What is happening here? (Line-by-Line)

| Line of Code | Plain-English Explanation |
| :--- | :--- |
| `using Microsoft.AspNetCore.Mvc;` | Imports the ASP.NET tools. Like `import { ... } from 'react'`. |
| `[ApiController]` | Label: "This class is a web API controller." Turns on automatic behaviors (see the box below). |
| `[Route("api/[controller]")]` | Sets the base URL. `[controller]` is replaced by the class name **minus** the word "Controller". `EmployeesController` becomes `employees`, so the URL is `/api/employees`. |
| `: ControllerBase` | Inherits helper methods such as `Ok()`, `NotFound()`, `BadRequest()`. |
| `[HttpGet]` | "Run this method when a GET request arrives at `/api/employees`." |
| `IActionResult` | The return type: "some kind of HTTP response" (status code + optional data). |
| `return Ok(employees);` | Sends **200 OK** and converts the list to JSON automatically. |

React receives: `["Patrick","Alice","Bob"]`.

> **Why `[controller]` and not just writing `employees`?**
> The token is replaced by the class name, so renaming the class renames the URL. If you rename `EmployeesController` to `StaffController`, the URL becomes `/api/staff` automatically.

#### What `[ApiController]` actually does for you

It adds three automatic behaviors:

1. **Automatic 400 errors.** If the incoming JSON is invalid (missing a `[Required]` field, wrong data type), ASP.NET returns **400 Bad Request** *before your method even runs*.
2. **Automatic body reading.** Complex-type parameters (like an `Employee`) are read from the JSON body without needing `[FromBody]` (we still write it in this course to make it obvious).
3. **Clear error messages.** The 400 response includes details about which field failed.

That is why HRIS-PAT puts `[ApiController]` at the top of every Controller.

#### `ControllerBase` vs `Controller`

* `ControllerBase`: for APIs that return **data (JSON)**. This is what we use.
* `Controller`: adds support for HTML views. We never need it, because React renders our UI.

---

## Part 3: Route Parameters & Request Bodies

### Snippet 2: Getting One Item by ID

```csharp
[HttpGet("{id}")]
public IActionResult GetById(int id)
{
    var employee = _employees.FirstOrDefault(e => e.Id == id);

    if (employee == null)
        return NotFound();

    return Ok(employee);
}
```

#### 🔍 What is happening here?

* **`[HttpGet("{id}")]`**: The `{id}` in curly braces is a **placeholder** in the URL. A request to `/api/employees/5` matches this method. The full URL is the base route (`api/employees`) + `/{id}`.
* **`int id`**: ASP.NET takes the `5` from the URL and passes it in as the `id` parameter. **The names must match** (`{id}` and `id`).
* **`FirstOrDefault(...)`**: The LINQ method from Lesson 6.1c. It returns the match, or `null` if nothing matches.
* **`return NotFound();`**: Sends **404 Not Found**. React can then show "Employee not found."

```
GET /api/employees/5
                    │
                    ▼  "{id}" captures the value 5
GetById(int id)  →  id = 5
```

### Snippet 3: Creating Data with `[FromBody]`

```csharp
[HttpPost]
public IActionResult Create([FromBody] Employee newEmployee)
{
    newEmployee.Id = _employees.Count == 0 ? 1 : _employees.Max(e => e.Id) + 1;
    _employees.Add(newEmployee);

    return CreatedAtAction(nameof(GetById), new { id = newEmployee.Id }, newEmployee);
}
```

#### 🔍 What is happening here?

* **`[FromBody]`**: Means "read this parameter from the **JSON body** of the request." React sends `{ "name": "Dana", "department": "HR" }` and ASP.NET converts it into an `Employee` object for you.
* **The `Id` line**: The server picks the next ID. It uses `Count == 0 ? 1 : ...` because calling `.Max()` on an empty list would crash.
* **`_employees.Add(...)`**: Adds it to the list (a fake database for now).
* **`CreatedAtAction(...)`**: Sends **201 Created**. It also adds a `Location` header with the URL of the new item (`/api/employees/4`). The three arguments are: *which method finds this item* (`nameof(GetById)`), *the route values* (`new { id = ... }`), and *the data to return*.

```
React sends:   POST /api/employees
               Content-Type: application/json
               { "name": "Dana", "department": "HR" }

Server replies: 201 Created
               Location: /api/employees/4
               { "id": 4, "name": "Dana", "department": "HR" }
```

> **Important for testing:** the request must include the header `Content-Type: application/json`, otherwise you get **415 Unsupported Media Type**. Swagger adds this for you. In React, `fetch` needs `headers: { "Content-Type": "application/json" }`.

### Snippet 4: Updating with PUT

```csharp
[HttpPut("{id}")]
public IActionResult Update(int id, [FromBody] Employee updated)
{
    var employee = _employees.FirstOrDefault(e => e.Id == id);
    if (employee == null)
        return NotFound();

    employee.Name = updated.Name;
    employee.Department = updated.Department;

    return Ok(employee);
}
```

#### 🔍 What is happening here?

* **It uses both** a route parameter (`id`, *which* employee) **and** a body (`updated`, the *new values*).
* It first checks the employee exists. If not, **404**.
* It copies the new values onto the existing object, then returns **200 OK** with the updated employee.

### Snippet 5: Removing with DELETE

```csharp
[HttpDelete("{id}")]
public IActionResult Delete(int id)
{
    var employee = _employees.FirstOrDefault(e => e.Id == id);
    if (employee == null)
        return NotFound();

    _employees.Remove(employee);
    return NoContent();
}
```

#### 🔍 What is happening here?

* **`NoContent()`** sends **204 No Content**: "It worked, and there is nothing to send back." A deleted item has nothing to return, so this is the standard reply.

---

## Part 4: Response Helper Methods

| Method | Status Code | When to use it |
| :--- | :---: | :--- |
| `Ok(data)` | 200 | Success, here is your data |
| `CreatedAtAction(...)` | 201 | A new item was created |
| `NoContent()` | 204 | Success, nothing to send back (common for DELETE) |
| `BadRequest("message")` | 400 | The client sent invalid data |
| `Unauthorized()` | 401 | Not logged in (you'll use this in Unit 8) |
| `NotFound()` | 404 | That item does not exist |

These are the same status codes you studied in Lesson 1.1. Now you are the one sending them. In HRIS-PAT's `EmployeesController`, `GetEmployee` returns `NotFound(...)` when the employee doesn't exist and `Ok(...)` otherwise, exactly like Snippet 2.

---

## Part 5: The Complete Controller (Put It All Together)

```csharp
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    // "static" = one shared list for the whole app (see the note below)
    private static readonly List<Employee> _employees = new()
    {
        new Employee { Id = 1, Name = "Patrick", Department = "Engineering" },
        new Employee { Id = 2, Name = "Alice",   Department = "HR" },
        new Employee { Id = 3, Name = "Bob",     Department = "Finance" }
    };

    [HttpGet]
    public IActionResult GetAll() => Ok(_employees);

    // GetById, Create, Update, Delete from the snippets above...
}
```

And the model, in `Models/Employee.cs`:

```csharp
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
}
```

> **Why `static`?** ASP.NET creates a **brand-new controller object for every request** and throws it away afterward. A normal (non-static) list would be recreated each time, so a POST would "forget" its data by the next GET. `static` makes one list shared by all requests. This is only a stand-in for a real database, which arrives in Unit 7.

**What React receives:** ASP.NET converts C# `PascalCase` property names to JSON `camelCase` automatically, so `Name` arrives as `"name"`.

---

## Part 6: Swagger — A Free Testing Playground

**Swagger** automatically builds a web page listing every endpoint in your API. You can click **Try it out** and send real requests without writing any frontend code. It's like Postman, built into your project.

```
http://localhost:5107/swagger
┌────────────────────────────────────────┐
│ GET    /api/employees          [Try it]│
│ GET    /api/employees/{id}     [Try it]│
│ POST   /api/employees          [Try it]│
│ PUT    /api/employees/{id}     [Try it]│
│ DELETE /api/employees/{id}     [Try it]│
└────────────────────────────────────────┘
```

### Setting it up (the HRIS-PAT way)

Newer .NET templates no longer include the Swagger UI by default, so you add it yourself. HRIS-PAT uses the **Swashbuckle** package:

1. In your project folder run: `dotnet add package Swashbuckle.AspNetCore`
   *(If you get a version error, open `HRIS-PAT/backend/backend.csproj` and use the same version number.)*
2. In `Program.cs`, **before** `builder.Build()`:
   ```csharp
   builder.Services.AddControllers();
   builder.Services.AddEndpointsApiExplorer();
   builder.Services.AddSwaggerGen();
   ```
3. In `Program.cs`, **after** `builder.Build()`:
   ```csharp
   app.UseSwagger();
   app.UseSwaggerUI();
   app.MapControllers();
   ```
4. Run the app and open `/swagger` on the URL shown in the terminal.

(HRIS-PAT does the same thing at lines 87-88 and 251-252 of `Program.cs`.)

**How to use it:** click an endpoint → **Try it out** → fill in the parameters → **Execute**. Look at the **Response body** and the **status code** below.

---

## Part 7: Common Errors & What They Mean

| You see... | Most likely cause | Fix |
| :--- | :--- | :--- |
| **404 Not Found** on a URL you're sure exists | Route typo, or `MapControllers()` / `AddControllers()` missing | Check `[Route]` and `Program.cs` |
| **405 Method Not Allowed** | Right URL, wrong verb (e.g. POST to a GET-only URL) | Check the `[HttpXxx]` attribute |
| **415 Unsupported Media Type** | Body sent without `Content-Type: application/json` | Add the header |
| **400 Bad Request** with a field list | JSON was invalid for the model | Read the error body; fix the JSON |
| **500 Internal Server Error** | An exception in your C# code | Read the terminal output; it shows the exception |
| `id` is always `0` in your method | Route placeholder `{id}` doesn't match the parameter name | Make both say `id` |

---

## 🏁 Lesson Summary & Key Takeaways (Cheat Sheet)

### 1. Controller Basics
* A Controller is a C# class. Each **method** is an **endpoint** (URL + verb).
* `[ApiController]` + `[Route("api/[controller]")]` + `: ControllerBase` is the standard header.
* `AddControllers()` and `MapControllers()` in `Program.cs` make controllers work.
* The Controller's only job: **receive the request, call a Service, return a response.**

### 2. Verb Attributes
* `[HttpGet]`, `[HttpPost]`, `[HttpPut]`, `[HttpDelete]`
* `[HttpGet("{id}")]` captures a value from the URL (names must match).
* `[FromBody]` reads JSON from the request body.

### 3. Response Helpers
* `Ok()` 200 · `CreatedAtAction()` 201 · `NoContent()` 204 · `BadRequest()` 400 · `NotFound()` 404

### 4. What `[ApiController]` Gives You
* Automatic 400 on invalid input, automatic body binding, and clear error details.

### 5. Tools
* **Swagger** = a built-in page to test your endpoints (`AddSwaggerGen`, `UseSwagger`, `UseSwaggerUI`).

### 6. Remember
* Controllers are recreated per request, so shared fake data must be `static`.
* The URL + the verb together pick the method.

### 7. What's Next
In **Lesson 6.3**, you'll notice the Controller you wrote has logic stuffed inside it. You will move that logic into a **Service** and learn **Dependency Injection**.

---

## ✅ Check Your Understanding

Answer these in your own words in `lesson_6_2_answer.md`:

1. What two things does ASP.NET use to decide which controller method runs?
2. Why does `GetById` return `NotFound()` instead of `Ok(null)`?
3. What is the difference between `Ok()`, `CreatedAtAction()`, and `NoContent()`?
4. What does `[ApiController]` do when a client sends invalid JSON?
5. Why is the fake employee list marked `static`?

---

## 📝 Activities: Build Your First Controller

> Put all code in a new project at `PRACTICE/backend/PracticeApi/`.

### Task 1: Create the Project
1. Open a terminal inside `PRACTICE/backend/`.
2. Run: `dotnet new webapi --use-controllers -n PracticeApi`
3. Run it with `dotnet run` inside the project folder and open the URL shown in the terminal.

### Task 2: Set Up Swagger
1. Follow **Part 6** to add Swashbuckle and the three Swagger lines.
2. Open `/swagger` and confirm you can see the default weather endpoint.

### Task 3: A GET Endpoint
1. Create `Models/Employee.cs` and `Controllers/EmployeesController.cs`.
2. Keep a `private static readonly List<Employee>` with 3 fake employees.
3. Write `[HttpGet] GetAll()` returning the list.

### Task 4: GET by ID
1. Write `[HttpGet("{id}")] GetById(int id)`.
2. Return `NotFound()` if the ID does not exist.

### Task 5: POST
1. Write `[HttpPost] Create([FromBody] Employee newEmployee)`.
2. Add it to the list and return `CreatedAtAction(...)`.

### Task 6: PUT and DELETE
1. Write `[HttpPut("{id}")] Update(...)`, returning `NotFound()` for a bad ID.
2. Write `[HttpDelete("{id}")] Delete(...)`, returning `NoContent()` on success.

### Task 7: Test Everything in Swagger
1. Test all 5 endpoints and record the status codes in your answer file.
2. Deliberately test a bad ID (`999`) on GET, PUT and DELETE.

### Task 8 (Advanced, optional): XML Comments
1. Add `///` summary comments above your methods, like the ones in HRIS-PAT's `EmployeesController`.
2. Enabling them in Swagger takes extra configuration (`GenerateDocumentationFile` in the `.csproj` and `IncludeXmlComments`). Look it up and try.

---

## 🧪 Test Checklist

Keep track of your answers in `lesson_6_2_answer.md`:

- [ ] Created a Web API project with controllers and Swagger working
- [ ] `GET /api/employees` returns 3 employees
- [ ] `GET /api/employees/{id}` returns one employee, or 404 for a bad ID
- [ ] `POST /api/employees` adds a new employee and returns 201
- [ ] `PUT` updates an employee, and `DELETE` removes one and returns 204
- [ ] Tested all endpoints in Swagger
- [ ] Answered the "Check Your Understanding" questions
