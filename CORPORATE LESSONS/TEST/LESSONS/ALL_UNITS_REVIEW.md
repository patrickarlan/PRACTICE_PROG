# 📚 ALL UNITS — QUICK REVIEW GUIDE
## Patrick Arlan | Sandman Software Systems Inc. Exam Prep
### Units 1–5 | Most Important Concepts + Examples Only

---

> 💡 **How to use this:** Read each section top to bottom. Focus on the code examples.
> If something feels shaky, go back to the full lesson for that unit.

---

# 🟢 UNIT 1 — BASIC PROGRAMMING LOGIC

## The 6 Core Concepts (Everything builds on these)

### 1. Variables — Name your data
```php
$name    = "Patrick";   // String  (text)
$age     = 25;          // Integer (whole number)
$salary  = 50000.50;    // Float   (decimal)
$active  = true;        // Boolean (true/false)
$nothing = null;        // Null    (empty)
```

### 2. Operators — Math & comparisons
```php
10 + 3   // 13    (addition)
10 % 3   // 1     (remainder — called MODULO)
$x == 5  // equal?     (double ==, NOT single =)
$x != 5  // not equal?
$x >= 5  // greater or equal?
```
> ⚠️ `%` = **modulo** (gets the remainder). `=` assigns, `==` compares!

### 3. Conditionals — Make decisions
```php
if ($score >= 90) {
    echo "Grade A";
} else if ($score >= 80) {
    echo "Grade B";
} else {
    echo "Grade F";
}
```

### 4. Loops — Repeat actions
```php
// For loop: know the count
for ($i = 1; $i <= 5; $i++) { echo $i; }  // 1 2 3 4 5

// While loop: unknown count
while ($count < 5) { $count++; }

// Foreach: loop through array
foreach ($employees as $name) { echo $name; }
```

### 5. Arrays — Multiple items in one box
```php
$names = array("Patrick", "Maria", "Juan");
echo $names[0];  // Patrick  ← index starts at 0, NOT 1!
echo $names[2];  // Juan
echo count($names);  // 3
```
> ⚠️ Array of 5 items → valid indices are **0 to 4**, NOT 0 to 5!

### 6. Functions — Reusable code blocks
```php
function calculateBonus($salary) {
    return $salary * 0.10;
}
$bonus = calculateBonus(50000);  // 5000
```

---

# 🔵 UNIT 2 — PHP FUNDAMENTALS

## PHP-Specific Rules to Remember

### Output — Two valid ways
```php
echo "Hello";         // ✅ Works
print "Hello";        // ✅ Also works!
// Both A and B are correct — D) Both A and B
```

### Variables — ALWAYS need `$`
```php
$name = "Patrick";    // ✅ Correct
name = "Patrick";     // ❌ Wrong — no dollar sign
```

### String concatenation — Use `.` NOT `+`
```php
$full = "Patrick" . " " . "Arlan";  // ✅ Correct — use dot
$full = "Patrick" + " Arlan";       // ❌ Wrong — + is for numbers only
```

### String interpolation — Use double quotes
```php
echo "Hello $name";   // ✅ Works — $name gets replaced
echo 'Hello $name';   // ❌ Prints literally: Hello $name
```

### PHP Function — Remember the `$` on ALL variables inside
```php
function calculateTen($sal) {
    return $sal * 0.10;   // ✅ $sal has dollar sign inside
    // return sal * 0.10; // ❌ Wrong — missing $
}
```

### Loops Quick Reference
```php
// foreach — item-driven (reads item by item)
foreach ($employees as $emp) { echo $emp; }

// for — index-driven (counts with position number)
for ($i = 0; $i < count($employees); $i++) { echo $employees[$i]; }
```

### Useful Built-in Functions
```php
strlen("Hello")        // 5   (string length)
strtoupper("hello")   // HELLO
count($arr)           // array length
number_format(50000, 2)  // 50,000.00
```

---

# 🟠 UNIT 3 — MYSQL FUNDAMENTALS

## The 5 Core SQL Commands (CRUD)

### CREATE — Build a table
```sql
CREATE TABLE employees (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    name      TEXT        NOT NULL,
    department VARCHAR(50),
    salary    DECIMAL(10,2)
);
```

### INSERT — Add data
```sql
INSERT INTO employees (name, department, salary)
VALUES ('Patrick', 'Engineering', 50000);
```

### SELECT — Read data
```sql
SELECT * FROM employees;                                 -- all rows
SELECT name, salary FROM employees WHERE salary > 50000; -- filtered
SELECT * FROM employees ORDER BY salary DESC;            -- sorted
SELECT COUNT(*) FROM employees WHERE department = 'Engineering'; -- count
```

### UPDATE — Change data
```sql
UPDATE employees SET salary = 52000 WHERE id = 1;
-- ⚠️ Always use WHERE! Without it → ALL rows get updated
```

### DELETE — Remove data
```sql
DELETE FROM employees WHERE id = 1;
-- ⚠️ Always use WHERE! Without it → ALL rows get deleted
```

## ⚠️ Key True/False Facts
- `UPDATE`/`DELETE` **do NOT require** WHERE by syntax. SQL won't stop you from omitting it. It just affects ALL rows. → **Answer: FALSE** ("ALWAYS require" is false)
- `PRIMARY KEY` values **cannot be repeated** → TRUE
- `DECIMAL(10,2)` = up to 10 digits, 2 after decimal point
- `VARCHAR(100)` = text up to 100 characters

## Aggregate Functions
```sql
SELECT SUM(salary) FROM employees;   -- total
SELECT AVG(salary) FROM employees;   -- average
SELECT MAX(salary) FROM employees;   -- highest
SELECT MIN(salary) FROM employees;   -- lowest
```

---

# 🔴 UNIT 4 — JAVA FUNDAMENTALS

## Java vs PHP — Key Differences

| | PHP | Java |
|---|---|---|
| Variable | `$name = "Patrick";` | `String name = "Patrick";` |
| Type | Not required | **REQUIRED** |
| Concatenate | `.` dot | `+` plus |
| Output | `echo` | `System.out.println()` |
| String compare | `==` | `.equals()` |

## Basic Program Structure (Required every time)
```java
public class ClassName {
    public static void main(String[] args) {
        // code here
    }
}
// ⚠️ filename MUST match class name: ClassName.java
```

## Variables — Type is REQUIRED
```java
int    age    = 25;
double salary = 50000.50;
String name   = "Patrick";
boolean active = true;
```

## String Comparison — Use `.equals()`, NOT `==`
```java
String dept = "Engineering";
if (dept.equals("Engineering")) { ... }  // ✅ Correct
if (dept == "Engineering") { ... }       // ❌ Wrong in Java!
```

## Arrays
```java
String[] names   = {"Patrick", "Maria", "Juan"};
double[] salaries = {50000, 55000, 48000};

System.out.println(names[0]);    // Patrick
System.out.println(names.length); // 3  ← .length (no parentheses)
```

## Loops
```java
// For loop — with index
for (int i = 0; i < names.length; i++) {
    System.out.println(names[i]);
}

// For-each loop — simpler
for (String name : names) {
    System.out.println(name);
}
```

## Methods (Functions in Java)
```java
public static double calculateBonus(double salary) {
    return salary * 0.10;
}
// Called as: double bonus = calculateBonus(50000);
```
- `public` = anyone can call it
- `static` = belongs to the class (use in main)
- `double` = return type (`void` = returns nothing)

## User Input (Scanner) — Like Console.ReadLine()
To read input from the user in the terminal, you must use `Scanner`.
```java
import java.util.Scanner;  // ⚠️ MUST import this first!

public class InputExample {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);  // Create the scanner

        System.out.print("Enter your name: ");
        String name = scanner.nextLine();          // Read text (string)

        System.out.print("Enter your age: ");
        int age = scanner.nextInt();               // Read a number (int)

        System.out.println("Hello " + name + ", you are " + age);
    }
}
```

## Imports & Multiple Files (Lesson 4.7)
In real projects, code is split into multiple files (classes). You use **imports** to bring them together.
- **Built-in imports:** `import java.util.ArrayList;` (pulls from Java's built-in library)
- **Custom classes:** If `Calculator.java` is in the same folder as `Main.java`, you can use `Calculator.calculateBonus(50)` directly without importing!
- **Packages:** If classes are in different folders (packages), you must import them: `import models.Employee;`

### Example: Using a Helper Class
**File 1: Calculator.java**
```java
public class Calculator {
    public static double getBonus(double salary) {
        return salary * 0.10; // 10% bonus
    }
}
```

**File 2: Main.java**
```java
public class Main {
    public static void main(String[] args) {
        // We use Calculator.getBonus directly because they are in the same folder!
        double myBonus = Calculator.getBonus(50000); 
        System.out.println("My bonus is: $" + myBonus);
    }
}
```

| Visibility | Who can access it? |
|------------|--------------------|
| `public` | ANY other file can access it |
| `private` | ONLY the file it is inside can access it |

## `public static void main(String[] args)` — What it means
> It is the **entry point** of any standalone Java application. The program starts executing here.

---

# 🟣 UNIT 5 — DEBUGGING & TROUBLESHOOTING

## The 3 Error Types — Know them cold!

| Type | When does it happen? | Example |
|------|---------------------|---------|
| **Syntax Error** | Won't compile — bad grammar | `if (age = 18)` → using `=` instead of `==` |
| **Logic Error** | Runs but gives wrong result | `i <= names.length` off-by-one |
| **Runtime Error** | Crashes while running | `ArrayIndexOutOfBoundsException`, `NullPointerException` |

## Syntax Error Examples
```java
int age = 25    // ❌ Missing semicolon
if (x = 5) {}  // ❌ Assignment instead of comparison (fix: ==)
```

## Logic Error Examples
```java
// ❌ Off-by-one — crashes because index 3 doesn't exist (0,1,2 only)
for (int i = 0; i <= names.length; i++) { ... }
// ✅ Fix: change <= to <
for (int i = 0; i < names.length; i++) { ... }
```

## Runtime Error Examples
```java
// NullPointerException
String name = null;
name.length();  // ❌ null has no method! → add null check

// ArrayIndexOutOfBoundsException
int[] arr = {10, 20, 30};
arr[5];  // ❌ index 5 doesn't exist → check arr.length first

// Division by zero
100 / 0;  // ❌ impossible → check if divisor != 0
```

## Debugging Workflow
```
1. READ the error message → get the line number
2. GO to that line in the code
3. ADD debug print statements → System.out.println("DEBUG: x = " + x);
4. TEST with different values (normal, edge, zero, null)
5. FIX → RE-RUN to verify
```

## Quick Fix Cheat
| Problem | Fix |
|---------|-----|
| Won't compile | Look for missing `;` `}` `"` |
| Array crashes | Change `i <= arr.length` → `i < arr.length` |
| Null crashes | Add `if (value != null)` before using it |
| Wrong result | Check `>` vs `>=` on boundaries |
| Syntax error in `if` | Check: are you using `==` not `=`? |

---

# 🏆 MUST-REMEMBER FACTS FOR THE EXAM

| Topic | Key Fact |
|-------|----------|
| Array index | Starts at **0**. 5-item array → indices 0–4 |
| `%` operator | **Modulo** — gets the **remainder** |
| PHP concatenation | Only `.` works, NOT `+` |
| PHP variables | ALL must start with `$` — including inside functions |
| PHP output | Both `echo` and `print` work |
| Java strings | Compare with `.equals()`, NOT `==` |
| Java types | Type declaration is **REQUIRED** |
| Java void | `void` method returns **nothing** |
| SQL WHERE | Not required by syntax (just dangerous without it) |
| SQL PRIMARY KEY | Values must be **unique** |
| Error types | Syntax=won't compile, Logic=wrong result, Runtime=crashes |
| `main` method | Entry point of a Java program |

---

*Good luck on your exam! You've already scored 37/40 + a 100% retry. You've got this! 💪🚀*
