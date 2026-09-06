# Chapter 6: ASP.NET Core & C# Basics

## Lesson 6.1b: C# Classes, Methods & Object-Oriented Programming (OOP)

C# is an **Object-Oriented** language from top to bottom. In TypeScript or JavaScript, you can write loose functions floating in a file. In C#, **almost every line of code lives inside a class**.

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

- **Class**: The blueprint or cookie cutter. It specifies *what data and actions* an entity has.
- **Object / Instance**: The actual cookie created from that cutter, sitting in computer memory.

```csharp
// 1. Defining the blueprint
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}

// 2. Creating instances with 'new'
Employee emp1 = new Employee();
emp1.Id = 101;
emp1.Name = "Patrick";

Employee emp2 = new Employee { Id = 102, Name = "Alice" };
```

---

## Part 2: Properties vs Fields — Why `{ get; set; }` Everywhere?

In older languages like Java or C++, you had to write tedious getters and setters:
```java
// The old, tedious way:
private string name;
public string getName() { return this.name; }
public void setName(string value) { this.name = value; }
```

In C#, we have **Properties**:
```csharp
public class Employee
{
    // 1. Auto-Property (Standard):
    public string Name { get; set; } = string.Empty;

    // 2. Init-Only Property:
    // Can only be set when the object is created! Cannot be modified later (immutable).
    public int Id { get; init; }

    // 3. Computed Property (Calculated on the fly, no setter!):
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string FullName => $"{FirstName} {LastName}";
}
```

---

## Part 3: Access Modifiers & `private readonly`

Access modifiers control **who can see or touch your variables**.

```
┌─────────────────┬────────────────────────────────────────────────────────┐
│ Modifier        │ Who can access it?                                     │
├─────────────────┼────────────────────────────────────────────────────────┤
│ public          │ Everyone, from any file or project.                    │
│ private         │ ONLY inside this exact class (hidden from outside).    │
│ protected       │ Inside this class AND any child classes that inherit.  │
│ internal        │ Anywhere within the same project/assembly.             │
│ private readonly│ Can ONLY be set in the constructor, then locked tight! │
└─────────────────┴────────────────────────────────────────────────────────┘
```

### The Golden Pattern of .NET Services: `private readonly`
Open ANY service in your HRIS backend (like `backend/Services/EmployeeService.cs`) and you will see this:
```csharp
public class EmployeeService
{
    // 🔒 Locked dependency. Set once during startup, impossible to overwrite!
    private readonly AppDbContext _context;

    public EmployeeService(AppDbContext context)
    {
        _context = context;
    }
}
```

---

## Part 4: Constructors — Booting Up the Object

A **constructor** is a special method with the **same name as the class** that runs automatically whenever `new` is called.

### 1. Traditional Constructor:
```csharp
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Department { get; set; }

    // Constructor with default values
    public Employee(int id, string name, string department = "Unassigned")
    {
        Id = id;
        Name = name;
        Department = department;
    }
}

// Usage:
var emp = new Employee(1, "Patrick"); // Department automatically becomes "Unassigned"
```

### 2. Modern C# Primary Constructor (C# 12+):
You'll see this in modern .NET 10 code. You declare the parameters right in the class header:
```csharp
public class EmployeeService(AppDbContext context)
{
    // context is directly available throughout the class without boilerplate!
}
```

---

## Part 5: Methods & Method Overloading

Methods are the **actions** a class can perform.

```csharp
public class Employee
{
    public bool IsActive { get; set; } = true;

    // Void method: performs an action, returns nothing
    public void Deactivate()
    {
        IsActive = false;
        Console.WriteLine("Employee account deactivated.");
    }

    // Method with return type:
    public double CalculateBonus(double percentage)
    {
        return 50000 * (percentage / 100);
    }
}
```

---

## Part 6: Inheritance & Interfaces — The Architecture Backbone

### 1. Inheritance (`:` operator)
A child class inherits all properties and methods of the parent class:
```csharp
// Parent Class
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}

// Child Class inherits from Employee
public class Manager : Employee
{
    public int TeamSize { get; set; } // Manager has everything Employee has, PLUS TeamSize!
}
```

### 2. Interfaces (The `I` Prefix)
An **Interface** is a **contract**. It doesn't contain code — it only lists what methods and properties a class **promises** to implement.

```
       INTERFACE (Contract)                   CLASS (Implementation)
   ┌───────────────────────────┐           ┌───────────────────────────┐
   │  interface IGreetable     │           │  class Employee :         │
   │                           │           │       IGreetable          │
   │  string Greet();          │           │                           │
   │  (No body, just rules)    │           │  public string Greet() {  │
   │                           │ ────────> │     return "Hello!";      │
   │                           │           │  }                        │
   └───────────────────────────┘           └───────────────────────────┘
```

Why do we use interfaces in ASP.NET?
- Because your Controller doesn't need to know *how* `EmployeeService` talks to PostgreSQL. It only cares that `IEmployeeService` has a method called `GetAllAsync()`.
- This is the foundation of **Dependency Injection (DI)** and automated unit testing!

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
