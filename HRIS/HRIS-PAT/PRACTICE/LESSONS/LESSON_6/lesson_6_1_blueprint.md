# Chapter 6: ASP.NET Core & C# Basics

## Lesson 6.1: C# Fundamentals — Variables, Types & Syntax

Welcome to your first C# programming lesson!

If you know JavaScript and TypeScript, **you already know 60% of C#**. The loops (`for`, `while`), conditions (`if/else`), and operators (`+`, `&&`, `||`) look almost identical.

However, C# has one big difference: **It is strictly typed and compiled**. In JavaScript, a variable can be a string, and then suddenly become a number. In C#, that is completely forbidden.

---

## Part 1: Visualizing Data Types — The Strict Box Metaphor

In C#, think of variables as **labeled storage boxes**. A box labeled `int` can *only* hold integers. If you try to jam text into it, the compiler will stop you before your code ever runs.

```
+---------------+      +---------------+      +---------------+      +---------------+
|     string    |      |      int      |      |     double    |      |      bool     |
|   "Patrick"   |      |      25       |      |    50000.50   |      |      true     |
+---------------+      +---------------+      +---------------+      +---------------+
   Text/Words           Whole Numbers          Decimals               Yes/No
```

### The Core Types:
```csharp
string name = "Patrick";           // Text inside double quotes (never single quotes)
int age = 25;                      // Whole numbers (-2 billion to +2 billion)
double salary = 50000.50;          // Decimal numbers
bool isActive = true;              // true or false
char initial = 'P';                // Single character (uses single quotes)
```

### The `var` Keyword (Type Inference):
C# lets you write `var` if the compiler can clearly figure out the type from the right side:
```csharp
var name = "Patrick";  // C# knows this is a string
var count = 10;        // C# knows this is an int

// BUT it is still strictly typed!
count = "Hello";       // ❌ ERROR: Cannot convert string to int!
```

### Constants (`const`):
If a value should never change once declared:
```csharp
const int MaxRetries = 3;
const double TaxRate = 0.12;
// MaxRetries = 5;     // ❌ ERROR: Constants cannot be modified!
```

---

## Part 2: Null Safety — The `?` and Null Operators

In JavaScript, `null` and `undefined` cause notorious errors like `Cannot read properties of undefined`.
In modern C#, you have **Null Safety** built into the language.

### 1. Value Types cannot be null by default
```csharp
int age = null;        // ❌ COMPILE ERROR! Whole numbers cannot be null.
int? age = null;       // ✅ OK! The '?' makes it nullable.
```

### 2. The 3 Essential Null Operators:

```
┌───────────────────────────────────┬──────────────────────────────────────────┐
│ Operator                          │ Plain English Meaning                    │
├───────────────────────────────────┼──────────────────────────────────────────┤
│ Null-Conditional:   employee?.Name│ "If employee is null, STOP. Return null. │
│                                   │  Don't crash!"                           │
├───────────────────────────────────┼──────────────────────────────────────────┤
│ Null-Coalescing:    name ?? "N/A" │ "If name is null, use 'N/A' as fallback."│
├───────────────────────────────────┼──────────────────────────────────────────┤
│ Null-Assignment:    name ??= "Pat"│ "If name is currently null, assign Pat." │
└───────────────────────────────────┴──────────────────────────────────────────┘
```

#### Example in Action:
```csharp
string? supervisor = null;

// Without operators (Clunky):
string displayName;
if (supervisor != null) {
    displayName = supervisor;
} else {
    displayName = "No Supervisor Assigned";
}

// With the ?? operator (Clean & Professional):
string displayName = supervisor ?? "No Supervisor Assigned";
```

---

## Part 3: Collections — Where Lists Live

In JavaScript, you used arrays: `const list = [1, 2, 3]`.
In C#, you will use `List<T>` 95% of the time.

```
       Array (Fixed size)                   List<T> (Resizable)
┌─────┬─────┬─────┬─────┐           ┌─────┬─────┬─────┬─────┐ + More items!
│ "A" │ "B" │ "C" │ "D" │           │ "A" │ "B" │ "C" │ "D" │ ──> .Add("E")
└─────┴─────┴─────┴─────┘           └─────┴─────┴─────┴─────┘
```

### 1. `List<T>` (The Standard Workhorse)
`<T>` means Type. `List<string>` is a list of strings. `List<int>` is a list of integers.
```csharp
List<string> departments = new List<string>();
departments.Add("Engineering");
departments.Add("Human Resources");
departments.Add("Finance");

Console.WriteLine(departments.Count); // 3 (Notice it's .Count, NOT .length!)
```

### 2. Modern List Initialization:
```csharp
// Modern C# shorthand:
List<string> roles = ["Admin", "Reviewer", "Employee"];
```

### 3. `Dictionary<TKey, TValue>` (Key-Value Store)
Just like an object or Map in JS:
```csharp
Dictionary<string, int> employeeAges = new Dictionary<string, int>();
employeeAges["Patrick"] = 25;
employeeAges["Alice"] = 30;

Console.WriteLine(employeeAges["Patrick"]); // 25
```

---

## Part 4: Modern Control Flow & Switch Expressions

### Standard `if` / `else if` / `else`:
```csharp
double salary = 65000;

if (salary >= 70000)
{
    Console.WriteLine("Senior Level");
}
else if (salary >= 50000)
{
    Console.WriteLine("Mid Level");
}
else
{
    Console.WriteLine("Junior Level");
}
```

### The Modern `switch` Expression (Cleaner than JS switch!):
In modern C#, you can write switches as compact, expressive equations:

```csharp
string role = "Admin";

int accessLevel = role switch
{
    "SuperAdmin" => 1,
    "Admin"      => 2,
    "Reviewer"   => 3,
    "Employee"   => 4,
    _            => 99  // '_' means default / catch-all
};

Console.WriteLine($"Access Level: {accessLevel}"); // 2
```

---

## Part 5: String Manipulation & Interpolation

### 1. String Interpolation (`$"..."`)
C# uses `$` followed by `{variable}` (identical to JS template literals with `${}`):
```csharp
string firstName = "Patrick";
int age = 25;

// C# String Interpolation:
string message = $"Hello, my name is {firstName} and I am {age} years old.";
```

### 2. Handy String Methods:
```csharp
string text = "   HRIS System   ";

text.Trim();                   // "HRIS System" (removes outer spaces)
text.ToLower();                // "   hris system   "
text.ToUpper();                // "   HRIS SYSTEM   "
text.Contains("System");       // true
text.StartsWith("HR");         // false (due to spaces)

// The ultimate safe check for user input:
bool isBlank = string.IsNullOrWhiteSpace(text); // false
```

---

## 📝 Activities: C# Console Sandbox

We will run these practice exercises in a small C# Console project or scratch files!

### Task 1: Declare & Print Basic Types
1. Declare 4 variables: `employeeName` (string), `employeeId` (int), `hourlyRate` (double), and `isFullTime` (bool).
2. Print them using string interpolation: `$"Employee: {employeeName} (ID: {employeeId}) - Rate: ${hourlyRate} - Full-time: {isFullTime}"`.

### Task 2: Master the Null Operators
1. Declare `string? supervisorName = null;`.
2. Use the `??` operator to store the supervisor's name or `"None (Direct Report to CEO)"` into a variable called `assignedSupervisor`.
3. Print `assignedSupervisor`.

### Task 3: Working with `List<string>` & `foreach`
1. Create a `List<string>` containing 5 department names: `"Development"`, `"Design"`, `"HR"`, `"DevOps"`, and `"Sales"`.
2. Loop over them with `foreach (var dept in departments)`.
3. Inside the loop, check `if (dept.StartsWith("Dev"))` and print only those departments!

### Task 4: Switch Expression for HR Roles
1. Declare `string currentRole = "Reviewer";`.
2. Write a `switch` expression that returns:
   - `"SuperAdmin"` &rarr; `"Full System Access"`
   - `"Reviewer"` &rarr; `"Can Approve Reports"`
   - `"Employee"` &rarr; `"Can Submit Reports"`
   - `_` &rarr; `"Guest Access"`
3. Print the result.

---

## 🧪 Test Checklist

Keep track of your answers in `lesson_6_1_answer.md`:

- [ ] Declared variables of different types (`string`, `int`, `double`, `bool`)
- [ ] Used string interpolation `$"..."` correctly
- [ ] Demonstrated nullable variables (`string?`) and fallback with `??`
- [ ] Created a `List<string>` and filtered with `foreach` + `.StartsWith()`
- [ ] Created and tested a modern C# `switch` expression
