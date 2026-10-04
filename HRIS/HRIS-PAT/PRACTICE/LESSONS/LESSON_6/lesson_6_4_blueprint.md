# Chapter 6: ASP.NET Core & C# Basics

## Lesson 6.4: Data Transfer Objects (DTOs) — The Secure Messengers

In Lesson 6.0 you compared a Model and a DTO in the real HRIS backend. Now you'll understand the full picture and build your own.

> **Reading note:** The whole lesson is readable without a laptop. Only the activities need code.

**By the end of this lesson you will be able to:**
* Explain three reasons we never return raw database models.
* Write a Request DTO and a Response DTO.
* Map a Model to a DTO (and back) inside a Service.
* Add validation rules to a Request DTO.

---

## Part 1: The Problem — Returning the Raw Model

Suppose your database model looks like this:

```csharp
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Department { get; set; } = "";
    public string PasswordHash { get; set; } = "";
    public double Salary { get; set; }
    public string InternalNotes { get; set; } = "";
}
```

If a Controller returns this directly, React receives **everything**:

```json
{ "id": 1, "name": "Patrick", "passwordHash": "x8f#291a", "salary": 90000, "internalNotes": "..." }
```

Anyone can open the browser's Network tab and read it. That is a **security leak**.

### Three Reasons to Use DTOs

| Reason | Explanation |
| :--- | :--- |
| 🔒 **Security** | Hide sensitive fields (`PasswordHash`, `Salary`). |
| 📦 **Efficiency** | Send only what the screen needs (3 fields, not 30). |
| 🧱 **Stability** | You can change the database model without breaking the frontend. |

```
 Database Model (everything)          DTO (safe subset)
┌───────────────────────────┐       ┌───────────────────────┐
│ Id                        │ ────► │ Id                    │
│ Name                      │ ────► │ Name                  │
│ Department                │ ────► │ Department            │
│ PasswordHash              │  ✖    └───────────────────────┘
│ Salary                    │  ✖        React only ever
│ InternalNotes             │  ✖        sees this
└───────────────────────────┘
```

**On "stability":** imagine you rename the database column `Department` to `DepartmentName`. If React reads the model directly, every screen using `department` breaks. With a DTO, you change *one* mapping line in the Service, and the DTO (and React) stay exactly the same. The DTO is a **stable promise** to the frontend.

---

## Part 2: Request DTOs vs Response DTOs

DTOs work in **both directions**:

| Type | Direction | Example name | Contains |
| :--- | :--- | :--- | :--- |
| **Response DTO** | Backend → React | `EmployeeResponseDto` | Only the fields the client may see |
| **Request DTO** | React → Backend | `CreateEmployeeRequestDto` | Only the fields the client is allowed to send |

### Snippet 1: The Two DTOs

```csharp
// DTOs/EmployeeResponseDto.cs  (going OUT)
public class EmployeeResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
}

// DTOs/CreateEmployeeRequestDto.cs  (coming IN)
public class CreateEmployeeRequestDto
{
    public string Name { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
}
```

#### 🔍 What is happening here?

* **Response DTO** has `Id` because the client should see which employee is which.
* **Request DTO** has **no `Id`**. The server creates the ID. The client must not choose it.
* Neither contains `PasswordHash` or `Salary`. The client can't read them or set them.

This is exactly what you found in Lesson 6.0: `ReportId`, `CreatedAt`, and `ApprovedById` were missing from `AccomplishmentReportCreateDto`.

### Why a Request DTO matters: "over-posting"

Imagine there is **no** Request DTO and the Controller accepts the full `Employee` model. A malicious user sends:

```json
{ "name": "Mallory", "department": "HR", "salary": 999999, "id": 1 }
```

ASP.NET happily fills **every** property it finds: `salary`, even `id`. The attacker just gave themselves a huge salary, or overwrote employee #1. This attack is called **over-posting** (or mass assignment).

With a Request DTO that only has `Name` and `Department`, the extra fields are **ignored**. The attacker can't set what the DTO doesn't contain.

```
Attacker sends:  { name, department, salary, id }
                         │
                         ▼   CreateEmployeeRequestDto only has: name, department
Server keeps:    { name, department }       salary and id are thrown away
```

---

## Part 3: Validation Rules on a Request DTO

A Request DTO is also the perfect place to say "these fields are required." You use **attributes**, the `[...]` labels you met in Lesson 6.2:

### Snippet 2: A Validated Request DTO

```csharp
using System.ComponentModel.DataAnnotations;

public class CreateEmployeeRequestDto
{
    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Department { get; set; } = string.Empty;
}
```

#### 🔍 What is happening here?

| Attribute | Plain-English Explanation |
| :--- | :--- |
| `[Required]` | "This field must be present and not empty." |
| `[StringLength(100, MinimumLength = 3)]` | "Between 3 and 100 characters." |

Because your Controller has `[ApiController]` (Lesson 6.2), ASP.NET checks these rules **before your method runs**. If React sends `{ "name": "Al" }`, the client automatically gets **400 Bad Request** with a message about which rule failed. Your Controller and Service never even see the bad data.

The real HRIS-PAT DTO does this too. `AccomplishmentReportCreateDto` has `[Required]` on `Date` and `Accomplishments`.

---

## Part 4: Mapping — Converting Model ↔ DTO

Something has to **copy** the safe fields from the Model into the DTO. That copying is called **mapping**. You do it inside the **Service**.

### Snippet 3: Manual Mapping in the Service

```csharp
public EmployeeResponseDto? GetById(int id)
{
    var employee = _employees.FirstOrDefault(e => e.Id == id);
    if (employee == null) return null;

    return MapToDto(employee);
}

public EmployeeResponseDto Create(CreateEmployeeRequestDto request)
{
    var employee = new Employee
    {
        Id = _employees.Count == 0 ? 1 : _employees.Max(e => e.Id) + 1,
        Name = request.Name,
        Department = request.Department
    };
    _employees.Add(employee);

    return MapToDto(employee);
}

// One helper so the mapping is written ONCE, not copy-pasted everywhere
private static EmployeeResponseDto MapToDto(Employee e) => new()
{
    Id = e.Id,
    Name = e.Name,
    Department = e.Department
};
```

#### 🔍 What is happening here?

* **In `GetById`:** it finds the full Model, then builds a **new DTO** with only 3 fields. The `Salary` never leaves the Service.
* **In `Create`:** it takes the Request DTO (input from React), builds a full `Employee` Model, and fills in the fields the client isn't allowed to control (like `Id`).
* **`MapToDto`:** a small private helper. If a DTO field changes later, you fix it in **one** place.
* `new() { Prop = value }` is the **object initializer** from Lesson 6.1b.

### Snippet 4: Mapping a List with LINQ `.Select()`

```csharp
public List<EmployeeResponseDto> GetAll() =>
    _employees
        .Select(e => MapToDto(e))
        .ToList();
```

`.Select()` is the C# version of JavaScript's `.map()` from Lesson 6.1c. You saw this same pattern in the Lesson 6.0 snippet for `GetAllEmployeesAsync()`.

### Snippet 5: The Controller Using DTOs

```csharp
[HttpPost]
public IActionResult Create([FromBody] CreateEmployeeRequestDto request)
{
    var created = _employeeService.Create(request);
    return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
}
```

#### 🔍 What is happening here?

* The Controller's parameter type changed from `Employee` to **`CreateEmployeeRequestDto`**. That is the entire change on the Controller side.
* `created` is already an `EmployeeResponseDto`, so only safe fields go back to React.
* Validation (`[Required]`) already happened before this method started, thanks to `[ApiController]`.

### A DTO for Updates (PUT)

Updating usually allows different fields than creating, so it gets its own DTO:

```csharp
public class UpdateEmployeeRequestDto
{
    [Required] public string Name { get; set; } = string.Empty;
    [Required] public string Department { get; set; } = string.Empty;
}
```

Notice it still has no `Id`. The ID comes from the URL (`PUT /api/employees/5`), never from the body.

### What About AutoMapper?

**AutoMapper** is a library that does this copying automatically when you have many fields. It's useful, but learn **manual mapping first** so you understand what it's doing. HRIS-PAT maps manually, which is perfectly professional.

---

## Part 5: The Full Flow With DTOs

```
React  ── POST { name, department } ──►  Controller
                                          │ ASP.NET validates [Required] rules (400 if invalid)
                                          │ receives CreateEmployeeRequestDto
                                          ▼
                                        Service
                                          │ builds the full Employee Model (adds Id, etc.)
                                          │ saves it
                                          │ maps Model → EmployeeResponseDto
                                          ▼
React  ◄── 201 { id, name, department } ── Controller
```

The Model never touches the outside world. DTOs are the only things that cross the boundary.

### Common Mistakes

| Mistake | Why it's a problem |
| :--- | :--- |
| Returning the Model "just for now" | Sensitive fields leak the moment real data exists. |
| Putting `Id` in the Create request DTO | The client could choose or overwrite IDs. |
| Copy-pasting the mapping in every method | A field change means editing five places. Use one `MapToDto`. |
| Forgetting `= string.Empty` on string properties | You get null-safety warnings (Lesson 6.1). |
| Using the same DTO for everything | Create, update, and response each allow different fields. |

---

## 🏁 Lesson Summary & Key Takeaways (Cheat Sheet)

### 1. Why DTOs
* 🔒 Security · 📦 Efficiency · 🧱 Stability. Never return raw database models.

### 2. Two Kinds
* **Response DTO**: what the backend sends out (safe fields only).
* **Request DTO**: what the backend accepts (no server-controlled fields like `Id`).
* Request DTOs also stop **over-posting**: extra fields the client sends are ignored.

### 3. Validation
* `[Required]` and `[StringLength(...)]` on Request DTOs.
* With `[ApiController]`, invalid input gets an automatic **400** before your code runs.

### 4. Mapping
* Convert Model ↔ DTO inside the **Service**.
* Single item: `new Dto { A = model.A, ... }` (put it in one `MapToDto` helper).
* Lists: `.Select(e => MapToDto(e)).ToList()`.
* AutoMapper automates this, but manual mapping comes first.

### 5. The Rule
* The Model stays **inside** the backend. Only DTOs cross the boundary.

### 6. Unit 6 Complete! 🎉
You now understand the whole backend architecture: folders (6.0) → C# language (6.1) → Controllers (6.2) → Services & DI (6.3) → DTOs (6.4).
**What's Next:** **Unit 7: Database & Entity Framework Core**, where your fake in-memory list becomes a real PostgreSQL database.

---

## ✅ Check Your Understanding

Answer in your own words in `lesson_6_4_answer.md`:

1. Name three reasons we don't return the raw database model.
2. Why does `CreateEmployeeRequestDto` not have an `Id`?
3. What is "over-posting" and how does a Request DTO prevent it?
4. Where does the mapping from Model to DTO happen, the Controller or the Service? Why?
5. What happens if React sends `{ "name": "Al" }` to an endpoint whose DTO says `[StringLength(100, MinimumLength = 3)]`?

---

## 📝 Activities: Add DTOs to Your API

> Continue in `PRACTICE/backend/PracticeApi/`.

### Task 1: Response DTO
1. Create a `DTOs/` folder.
2. Add `EmployeeResponseDto.cs` with only `Id`, `Name`, `Department`.
3. Add a `Salary` property to your `Employee` model (and give your fake employees salaries) so there is something to hide.

### Task 2: Request DTOs
1. Add `CreateEmployeeRequestDto.cs` with `Name` and `Department`, both `[Required]`, and `Name` with `[StringLength(100, MinimumLength = 3)]`.
2. Add `UpdateEmployeeRequestDto.cs` for PUT.

### Task 3: Update the Service
1. Make `GetAll()`, `GetById()`, `Create()` and `Update()` accept/return DTOs.
2. Write one `MapToDto` helper and use `.Select()` for the list.
3. Update `IEmployeeService` so the signatures match.

### Task 4: Update the Controller
1. Make the POST and PUT endpoints accept the Request DTOs.

### Task 5: Verify in Swagger
1. Confirm `Salary` is **not** in any response.
2. Confirm the POST request-body schema no longer shows `Id` or `Salary`.
3. POST `{ "name": "Al", "department": "HR" }` and record the status code and message.
4. POST `{ "name": "Dana", "department": "HR", "salary": 999999 }` and check that the extra `salary` was ignored.

### Task 6: Real-World Check
1. Open `HRIS-PAT/backend/DTOs/` and pick any DTO you haven't used before.
2. Find its matching Model. List which fields are missing from the DTO and why you think so.
3. Find one validation attribute (like `[Required]`) in a DTO and say what it enforces.

---

## 🧪 Test Checklist

Keep track of your answers in `lesson_6_4_answer.md`:

- [ ] Created `EmployeeResponseDto` (no sensitive fields)
- [ ] Created `CreateEmployeeRequestDto` and `UpdateEmployeeRequestDto` (no `Id`, with validation)
- [ ] Service maps Model ↔ DTO using one `MapToDto` helper and `.Select()`
- [ ] Controller POST and PUT accept the Request DTOs
- [ ] Verified in Swagger that `Salary` never appears in responses
- [ ] Verified that invalid input returns 400 and extra fields are ignored
- [ ] Compared a real HRIS DTO against its Model
- [ ] Answered the "Check Your Understanding" questions
