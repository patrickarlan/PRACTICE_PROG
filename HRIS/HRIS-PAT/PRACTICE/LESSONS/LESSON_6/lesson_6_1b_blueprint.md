# Chapter 6: ASP.NET Core & C# Basics

## Lesson 6.1b: C# Classes, Methods & Object-Oriented Programming (OOP)

C# is an **Object-Oriented** language from top to bottom. In JavaScript, you can write loose functions floating freely in a file. In C#, **every piece of code lives inside a class**.

When you open the HRIS backend, every Controller, Service, Model, and DTO is a C# class. Let's master the mechanics.

---

## Part 1: Classes vs Objects — The Cookie Cutter Metaphor

```
      THE CLASS (Blueprint)                    THE OBJECT (Instance)
   ┌───────────────────────────┐           ┌───────────────────────────┐
   │  class Employee           │           │  emp1                     │
   │  - Id: int                │   new()   │  - Id: 101                │
   │  - Name: string           │ ────────> │  - Name: "Patrick"        │
   │  - Department: string     │           │  - Department: "Dev"      │
   └───────────────────────────┘           └───────────────────────────┘
      (Only written ONCE)                  (Can make thousands of these!)
```

- **Class**: The blueprint or cookie cutter. It defines *what properties and actions* exist.
- **Object / Instance**: The actual physical cookie created from that cutter, occupying computer memory.

---

### Snippet 1: Defining a Class & Creating Instances

```csharp
// 1. Defining the blueprint
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}

// 2. Creating instances using the 'new' keyword
Employee emp1 = new Employee();
emp1.Id = 101;
emp1.Name = "Patrick";

// 3. Object initializer syntax (Shorthand):
Employee emp2 = new Employee { Id = 102, Name = "Alice" };
```

#### 🔍 What is happening here? (Line-by-Line Breakdown)

| Line of Code | Plain-English Explanation |
| :--- | :--- |
| `public class Employee` | `public` means any file in our project can use this blueprint. `class Employee` declares the new type name. |
| `public int Id { get; set; }` | An integer property called `Id`. `{ get; set; }` allows reading and writing this value. |
| `public string Name { get; set; } = string.Empty;` | A string property initialized to an empty string `""` so it never starts as a crash-prone `null`. |
| `Employee emp1 = new Employee();` | The `new` keyword calls the constructor and allocates memory for `emp1`. |
| `new Employee { Id = 102, ... }` | **Object Initializer Syntax**: A clean C# shorthand to set properties immediately upon creation without repetitive lines. |

---

## Part 2: Properties vs Fields — Why `{ get; set; }` Everywhere?

In older languages like Java or C++, you had to write tedious manual getter and setter functions:
```java
// The old, verbose way in Java:
private string name;
public string getName() { return this.name; }
public void setName(string value) { this.name = value; }
```

In C#, Microsoft invented **Properties** to do all of that in one clean line!

---

### Snippet 2: The 3 Types of Properties

```csharp
public class Employee
{
    // Type 1: Standard Auto-Property (Read & Write)
    public string Name { get; set; } = string.Empty;

    // Type 2: Init-Only Property (Immutable / Read-Only after creation)
    public int Id { get; init; }

    // Type 3: Computed Property (Calculated on the fly, no setter!)
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string FullName => $"{FirstName} {LastName}";
}
```

#### 🔍 What is happening here? (Line-by-Line Breakdown)

| Property Style | Plain-English Explanation |
| :--- | :--- |
| **`{ get; set; }`** | **Auto-Property**: Anyone can read (`get`) or modify (`set`) this value anytime. |
| **`{ get; init; }`** | **Init-Only**: You can ONLY set this when creating the object (e.g. `new Employee { Id = 1 }`). After that, it is **locked permanently** and cannot be changed! Great for database primary keys. |
| **`FullName => $"{FirstName} {LastName}";`** | **Computed Property**: Notice there is no `{ get; set; }`. The fat arrow `=>` means: *"Whenever someone asks for `FullName`, dynamically calculate it right now by combining `FirstName` and `LastName`."* |

---

## Part 3: Access Modifiers & `private readonly`

Access modifiers control **who is allowed to see or touch your variables**.

```
┌──────────────────┬─────────────────────────────────────────────────────────┐
│ Modifier         │ Who can access it?                                      │
├──────────────────┼─────────────────────────────────────────────────────────┤
│ public           │ Anyone, anywhere in the entire solution.                │
│ private          │ ONLY code inside this exact class (hidden from others). │
│ protected        │ Inside this class AND any child classes that inherit it.│
│ internal         │ Anywhere within the same project/assembly.              │
│ private readonly │ Can ONLY be assigned in the constructor, then locked!   │
└──────────────────┴─────────────────────────────────────────────────────────┘
```

---

### Snippet 3: The Golden Pattern of .NET Services (`private readonly`)

Open ANY service in your HRIS backend (like `backend/Services/EmployeeService.cs`) and you will see this:

```csharp
public class EmployeeService
{
    // 🔒 The locked database link
    private readonly AppDbContext _context;

    // Constructor: ASP.NET injects the database connection here
    public EmployeeService(AppDbContext context)
    {
        _context = context;
    }
}
```

#### 🔍 Why is `private readonly` used on every service?
* **`private`**: Prevents outside code or controllers from tampering with `_context`.
* **`readonly`**: Ensures that once `_context` is set in the constructor, **no one can reassign it or set it to null** anywhere else in the file. It is bulletproof!

---

## Part 4: Constructors — Booting Up the Object

A **Constructor** is a method with the **exact same name as the class**. It runs automatically whenever `new` is called.

---

### Snippet 4: Traditional vs Modern Primary Constructors

```csharp
// Traditional Constructor
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Department { get; set; }

    // Constructor with a default parameter value:
    public Employee(int id, string name, string department = "Unassigned")
    {
        Id = id;
        Name = name;
        Department = department;
    }
}

// Usage:
var emp = new Employee(1, "Patrick"); 
// Department automatically becomes "Unassigned"!
```

```csharp
// Modern C# Primary Constructor (C# 12+):
public class EmployeeService(AppDbContext context)
{
    // 'context' is directly available everywhere inside this class!
    // Zero boilerplate fields or constructor bodies needed!
}
```

---

## Part 5: Methods — Actions the Object Can Perform

---

### Snippet 5: Void Methods vs Methods with Return Values

```csharp
public class Employee
{
    public bool IsActive { get; set; } = true;
    public double BaseSalary { get; set; } = 50000;

    // 1. Void Method: Performs an action, returns NOTHING
    public void Deactivate()
    {
        IsActive = false;
        Console.WriteLine("Employee account deactivated.");
    }

    // 2. Method with Return Value: Takes input, returns a number
    public double CalculateBonus(double bonusPercentage)
    {
        double bonusAmount = BaseSalary * (bonusPercentage / 100);
        return bonusAmount;
    }
}
```

#### 🔍 What is happening here?
* **`void`**: Means "empty". The method does something (like changing `IsActive = false`), but doesn't give you back a number or string.
* **`double CalculateBonus(...)`**: Says "I require a decimal number `bonusPercentage` as input, and I promise to return a `double` calculation back to you."

---

## Part 6: Inheritance & Interfaces — The Architecture Backbone

---

### Snippet 6: Inheritance (`:` Parent Class)

When a child class inherits from a parent, it gets all the parent's properties for free:

```csharp
// Parent Class
public class Employee
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
}

// Child Class inherits from Employee using the colon ':'
public class Manager : Employee
{
    public int TeamSize { get; set; } 
    // Manager automatically has Id AND FullName, PLUS TeamSize!
}
```

---

### Snippet 7: Interfaces (The `I` Prefix Contract)

An **Interface** is a **contract**. It contains **no executable code** — only the names of methods and properties a class promises to have.

```csharp
// 1. The Interface (The Rulebook)
public interface IGreetable
{
    string Greet();
}

// 2. The Class implementing the Interface
public class Employee : IGreetable
{
    public string FullName { get; set; } = "Patrick";

    // Signs the contract by providing the real implementation:
    public string Greet()
    {
        return $"Hello, my name is {FullName}!";
    }
}
```

#### 🔍 Why are Interfaces so crucial in ASP.NET Core?
* In `EmployeesController.cs`, the controller doesn't ask for a concrete `EmployeeService`. It asks for **`IEmployeeService`**.
* This means the controller doesn't care *how* the service works — it only cares that `GetAllEmployeesAsync()` exists. 
* This allows you to easily swap the real database service with a fake test service during unit tests without changing a single line of Controller code!

---

## 📝 Activities: Building Domain Models

### Task 1: Create an `Employee` Class
1. Create a class `Employee` with:
   - Properties: `int Id`, `string FullName`, `string Department`, `bool IsActive`.
   - A computed property `string StatusLabel => IsActive ? "Active" : "Inactive";`.
2. Add a constructor that takes `(int id, string fullName, string department = "General")`.

### Task 2: Add Behavior (Method)
1. Add a method `void Deactivate()` that sets `IsActive = false`.
2. Instantiate an employee, print their `StatusLabel`, call `Deactivate()`, and print `StatusLabel` again to see it change!

### Task 3: Create an Interface & Implement It
1. Create an interface `IGreetable`:
   ```csharp
   public interface IGreetable
   {
       string Greet();
   }
   ```
2. Make `Employee` implement `IGreetable`:
   ```csharp
   public class Employee : IGreetable
   {
       public string Greet() => $"Hello, my name is {FullName} from {Department}.";
   }
   ```

### Task 4: Inheritance
1. Create a `Manager` class that inherits from `Employee`:
   ```csharp
   public class Manager : Employee
   {
       public int TeamSize { get; set; }
       public Manager(int id, string name, int teamSize) : base(id, name, "Management")
       {
           TeamSize = teamSize;
       }
   }
   ```
2. Instantiate a `Manager` and print both their inherited `FullName` and their `TeamSize`.

### Task 5: Real-World HRIS Code Audit
1. Open `backend/Controllers/EmployeesController.cs` or any service file in `backend/Services/`.
2. Find the constructor. Identify the `private readonly` dependency injected into it.
3. Find an interface name (hint: starts with `I`). Write down what you found in your answer file!

---

## 🧪 Test Checklist

Keep track of your answers in `lesson_6_1b_answer.md`:

- [ ] Created `Employee` class with auto-properties and computed property `StatusLabel`
- [ ] Created constructor with default parameter value
- [ ] Implemented method `Deactivate()` to modify object state
- [ ] Created and implemented interface `IGreetable`
- [ ] Created child class `Manager` inheriting from `Employee` with `base()` constructor
- [ ] Inspected a real HRIS backend file and identified the constructor + injected dependency
