# Chapter 6: ASP.NET Core & C# Basics

## Lesson 6.1: C# Fundamentals — Variables, Types & Syntax

Welcome to your first C# programming lesson!

If you already know JavaScript and TypeScript, **you already know 60% of C#**. The loops (`for`, `while`), conditions (`if/else`), and math operators look almost identical.

However, C# has one major difference: **It is strictly typed and compiled**. In JavaScript, a variable can start as a string, and then suddenly become a number. In C#, that is completely forbidden.

---

## Part 1: Visualizing Data Types — The Strict Box Metaphor

In C#, think of variables as **labeled, physical storage boxes**. 
A box labeled `int` has the physical shape of a whole number. If you try to jam text or a decimal into it, the C# compiler stops you before your code ever runs!

```
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│     string      │   │       int       │   │     double      │   │      bool       │
│   "Patrick"     │   │       25        │   │    50000.50     │   │      true       │
└─────────────────┘   └─────────────────┘   └─────────────────┘   └─────────────────┘
   Text / Sentences      Whole Numbers          Decimals               Yes / No
```

### Snippet 1: Declaring Core Types

```csharp
string name = "Patrick";
int age = 25;
double salary = 50000.50;
bool isActive = true;
char grade = 'A';
```

#### 🔍 What is happening here? (Line-by-Line Breakdown)

| Line of Code | JavaScript / TypeScript Equivalent | Plain-English Explanation |
| :--- | :--- | :--- |
| `string name = "Patrick";` | `let name: string = "Patrick";` | **`string`** holds text. **Crucial Rule:** C# strings MUST use double quotes `""`. Single quotes will cause a compile error! |
| `int age = 25;` | `let age: number = 25;` | **`int`** holds whole numbers (from -2 billion to +2 billion). No decimals allowed. |
| `double salary = 50000.50;` | `let salary: number = 50000.50;` | **`double`** holds floating-point decimal numbers. |
| `bool isActive = true;` | `let isActive: boolean = true;` | **`bool`** holds either `true` or `false` (in C#, it is `bool`, not `boolean`). |
| `char grade = 'A';` | *(No JS equivalent)* | **`char`** holds exactly ONE character and MUST use single quotes `''`. |

---

### Snippet 2: The `var` Keyword (Type Inference)

In C#, you can write `var` instead of writing the type name, **BUT it is NOT like JavaScript's loose `var`!**

```csharp
var name = "Patrick";  // C# figures out: "This is a string!"
var count = 10;        // C# figures out: "This is an int!"

// ❌ COMPILE ERROR:
count = "Hello";       // Error: Cannot implicitly convert type 'string' to 'int'
```

#### 🔍 What is happening here?
* In **JavaScript**, `var x = 10; x = "hello";` is allowed (dynamic typing).
* In **C#**, `var` is just a shortcut so you don't have to type long class names. Once C# decides `count` is an `int`, it is **locked as an `int` forever**.

---

### Snippet 3: Constants (`const`)

```csharp
const int MaxRetries = 3;
const double TaxRate = 0.12;

// ❌ COMPILE ERROR:
MaxRetries = 5; // Error: The left-hand side of an assignment must be a variable
```

#### 🔍 What is happening here?
* **`const`** locks the value permanently. If anyone tries to modify it anywhere in the program, the compiler immediately rejects the code. 
* By convention in C#, constants are written in **PascalCase** (`MaxRetries`, not `MAX_RETRIES`).

---

## Part 2: Null Safety — The `?` and Null Operators

In JavaScript, you often see the dreaded error:
`TypeError: Cannot read properties of undefined`

C# eliminates this with **Null Safety**.

```csharp
// 1. Value types cannot be null by default:
int age = null;        // ❌ COMPILE ERROR: Cannot convert null to 'int'

// 2. The '?' makes a type nullable:
int? age = null;       // ✅ Allowed! Can hold an integer OR null.
string? supervisor = null; // ✅ Allowed! Can hold text OR null.
```

---

### Snippet 4: The 3 Essential Null Operators (`?.`, `??`, `??=`)

```csharp
string? supervisor = null;

// Operator 1: The Null-Coalescing Operator (??) -> "The Fallback"
string displayName = supervisor ?? "No Supervisor Assigned";

// Operator 2: The Null-Conditional Operator (?.) -> "The Safe Navigator"
int? nameLength = supervisor?.Length;

// Operator 3: The Null-Coalescing Assignment (??=) -> "Assign only if null"
supervisor ??= "Default Supervisor";
```

#### 🔍 What is happening here? (Line-by-Line Breakdown)

| Operator | Code Example | Plain-English Meaning |
| :--- | :--- | :--- |
| **Fallback (`??`)** | `supervisor ?? "No Supervisor"` | *"Look at `supervisor`. If it has a value, use it. But if it is `null`, fallback to `"No Supervisor"`."* Exactly like `??` in modern JavaScript! |
| **Safe Navigator (`?.`)** | `supervisor?.Length` | *"If `supervisor` is null, stop immediately and return null. **Do NOT crash** trying to read `.Length` on null!"* |
| **Assign if Null (`??=`)** | `supervisor ??= "Default"` | *"Only assign `"Default"` if `supervisor` is currently null. If it already has a name, don't touch it!"* |

---

## Part 3: Collections — `List<T>` and `Dictionary<TKey, TValue>`

In JavaScript, you put everything into arrays: `[1, 2, 3]`.
In C#, fixed arrays exist, but in real web APIs you will use **`List<T>`** 95% of the time.

```
       Array: string[3]                      List<string>
  Fixed size (locked at 3)             Dynamically grows as you add!
┌──────────┬──────────┬──────────┐    ┌──────────┬──────────┬──────────┐ ──+ Add()
│ "Dev"    │ "HR"     │ "Design" │    │ "Dev"    │ "HR"     │ "Design" │ ──+ Add()
└──────────┴──────────┴──────────┘    └──────────┴──────────┴──────────┘
```

---

### Snippet 5: Working with `List<T>`

```csharp
// 1. Create an empty list of strings:
List<string> departments = new List<string>();

// 2. Add items to it:
departments.Add("Engineering");
departments.Add("Human Resources");
departments.Add("Finance");

// 3. Check the size:
Console.WriteLine(departments.Count); // Output: 3

// 4. Modern C# shorthand initialization:
List<string> roles = ["Admin", "Reviewer", "Employee"];
```

#### 🔍 What is happening here? (Line-by-Line Breakdown)

| Line of Code | Plain-English Explanation |
| :--- | :--- |
| `List<string> departments` | The `<string>` part is called a **Generic**. It tells C#: "This list can **only** contain strings. You cannot accidentally add a number or boolean to it." |
| `= new List<string>();` | The `new` keyword allocates fresh memory in your computer to hold the new list object. |
| `.Add("Engineering");` | In JavaScript you wrote `.push()`. In C#, the method is called **`.Add()`**. |
| `departments.Count` | In JavaScript you wrote `.length`. In C# lists, the property is called **`.Count`** (with a capital `C`). |

---

### Snippet 6: `Dictionary<TKey, TValue>` (Key-Value Lookups)

Just like a JavaScript Object (`{ "Patrick": 25 }`) or `Map`:

```csharp
Dictionary<string, int> employeeAges = new Dictionary<string, int>();

// Adding / Setting key-value pairs:
employeeAges["Patrick"] = 25;
employeeAges["Alice"] = 30;

// Reading a value by its key:
Console.WriteLine(employeeAges["Patrick"]); // Output: 25
```

#### 🔍 What is happening here?
* `Dictionary<string, int>` means: The **Key** is a `string` (the employee's name), and the **Value** is an `int` (their age).
* Looking up an item by key (`employeeAges["Patrick"]`) is near-instantaneous, even if you have 100,000 employees.

---

## Part 4: Modern Control Flow & Switch Expressions

---

### Snippet 7: `if` / `else if` / `else`

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
* Identical to JavaScript! Curly braces `{ }` wrap each condition block.

---

### Snippet 8: The Modern C# `switch` Expression

In older C# (and JavaScript), `switch` statements required tedious `case:`, `break;`, `case:`, `break;`.
Modern C# introduces **Switch Expressions** which are clean, compact equations:

```csharp
string role = "Admin";

int accessLevel = role switch
{
    "SuperAdmin" => 1,
    "Admin"      => 2,
    "Reviewer"   => 3,
    "Employee"   => 4,
    _            => 99   // The '_' underscore means "default / anything else"
};

Console.WriteLine($"Access Level: {accessLevel}"); // Output: 2
```

#### 🔍 What is happening here? (Line-by-Line Breakdown)

| Line of Code | Plain-English Explanation |
| :--- | :--- |
| `int accessLevel = role switch` | Says: "Evaluate the variable `role`, match it to one of the options below, and store the resulting number directly into `accessLevel`." |
| `"Admin" => 2,` | The fat arrow `=>` means **maps to**. If `role == "Admin"`, produce the number `2`. |
| `_ => 99` | The underscore `_` is called the **Discard** or **Catch-All**. It acts as the `default` case if none of the above strings matched. |

---

## Part 5: String Manipulation & Interpolation

---

### Snippet 9: String Interpolation (`$"..."`)

```csharp
string firstName = "Patrick";
int age = 25;

// String Interpolation:
string message = $"Hello, my name is {firstName} and I am {age} years old.";
```

#### 🔍 Comparison to JavaScript:
* **JavaScript**: Uses backticks and dollar-curly: `Hello, ${firstName}`.
* **C#**: Uses a dollar sign **outside** normal double quotes: `$"Hello, {firstName}"`.

---

### Snippet 10: Common String Methods

```csharp
string text = "   HRIS System   ";

string clean = text.Trim();              // "HRIS System" (removes outer spaces)
string lower = text.ToLower();           // "   hris system   "
bool hasWord = text.Contains("System");  // true
bool starts  = text.StartsWith("HR");    // false (because of the leading spaces!)

// The gold standard check for form inputs:
bool isEmpty = string.IsNullOrWhiteSpace(text); // false
```

#### 🔍 Why `string.IsNullOrWhiteSpace()` is so popular in backend code:
When a user submits a form on React, they might send `""` (empty string), `"   "` (spaces), or `null`.
`string.IsNullOrWhiteSpace(text)` catches all three cases in one safe check without crashing your API!

---

## 🏁 Lesson Summary & Key Takeaways (Cheat Sheet)

Congratulations on completing the core concepts of C# syntax! Here is your quick **freeCodeCamp-style cheat sheet** to review before tackling the activities:

### 1. The Core Types
* **`string`**: Text wrapped in **double quotes** `""` (e.g., `"Patrick"`). Single quotes `''` are strictly reserved for single `char` characters (e.g., `'A'`).
* **`int`**: Whole numbers without decimals (e.g., `25`, `-10`).
* **`double`**: Floating-point decimal numbers (e.g., `50000.50`).
* **`bool`**: `true` or `false` (note it is `bool`, not `boolean`).
* **`var`**: Compile-time type inference. Unlike JS, once inferred, the variable is **strictly typed and locked forever**.
* **`const`**: Permanent constant in PascalCase (e.g., `const int MaxRetries = 3;`).

### 2. Null Safety & Operators
* Value types (`int`, `bool`) cannot be null unless marked with `?` (`int? age = null;`).
* **`?.` (Safe Navigation)**: `employee?.Name` — Stops and returns null if the object is null (prevents runtime crashes).
* **`??` (Fallback)**: `supervisor ?? "None"` — Uses the fallback value if the left side is null.
* **`??=` (Assign if null)**: `name ??= "Default"` — Only assigns if the variable is currently null.

### 3. Collections
* Use **`List<T>`** for dynamic arrays that can grow or shrink:
  * Add items with **`.Add()`** (replaces JS `.push()`).
  * Check size with **`.Count`** (replaces JS `.length`).
* Use **`Dictionary<TKey, TValue>`** for fast key-value lookups (like JS Objects or Maps).

### 4. Modern Control Flow
* `if`, `else if`, `else` work identically to JavaScript.
* **Switch Expressions**: Clean functional equations using `=>` and `_`:
  ```csharp
  int level = role switch {
      "Admin" => 1,
      _       => 99  // default / catch-all
  };
  ```

### 5. String Manipulation
* **Interpolation**: `$"Hello, {name}!"` (note the `$` before double quotes, replacing JS `` `${}` ``).
* **Safe Check**: `string.IsNullOrWhiteSpace(str)` catches `null`, `""`, and `"   "` safely in one call.

---

## 📝 Activities: C# Console Sandbox

We will write and run these practice exercises together!

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
