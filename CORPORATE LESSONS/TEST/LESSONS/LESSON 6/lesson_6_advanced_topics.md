# 🚀 UNIT 6: ADVANCED TOPICS
## Lesson 6: Real Exam Concepts

**Duration:** 3-4 hours of focused study
**What You'll Learn:** Database Normalization, SQL JOINs, CRUD deep-dive, FizzBuzz, and Array algorithms
**Why It Matters:** These are the exact topics from the actual company exam you took. Mastering these means you are ready for the next attempt — or any other company.

---

## 📖 Introduction: Why These Topics Matter

You have already learned the fundamentals — variables, loops, functions, SQL, debugging. Unit 6 takes you to the **next level** that real company technical interviews actually test.

Think of it this way:
- **Units 1–5** = Learning the tools (hammer, nails, wood)
- **Unit 6** = Building an actual structure with those tools

These are not new languages — they build on what you already know.

---

## Lesson 6.1: Database Normalization (1NF, 2NF, 3NF)

### 🧠 The Concept

**Normalization** is the process of organizing a database to:
- Remove repeated/duplicate data (redundancy)
- Make data easier to update and maintain
- Reduce the chance of errors

**Analogy:** Imagine a contact book where you write the same person's address on 10 different pages. If they move, you have to update 10 pages! Normalization means you write the address only once and reference it everywhere else.

---

### 📝 The Problem: Unnormalized Table (0NF)

Imagine a company stores all its data in ONE giant table:

| OrderID | CustomerName | CustomerPhone | ItemName | ItemPrice | Department |
|---------|--------------|---------------|----------|-----------|------------|
| 1 | Patrick | 555-1234 | Laptop | 1000 | Engineering |
| 1 | Patrick | 555-1234 | Mouse | 50 | Engineering |
| 2 | Maria | 555-5678 | Keyboard | 80 | HR |

**Problems:**
- Patrick's phone appears twice — updating it means changing multiple rows
- If Patrick has no orders yet, we can't store his contact info at all
- Deleting an order might accidentally delete customer info

This is what we fix with normalization.

---

### 📝 First Normal Form (1NF)

**Rule:**
1. Each column must hold ONE value (no comma-separated lists in a cell)
2. Every row must be unique (have a Primary Key)

**Before 1NF (BAD):**

| OrderID | CustomerName | Items |
|---------|--------------|-------|
| 1 | Patrick | Laptop, Mouse |

*Problem: "Items" column holds multiple values in one cell!*

**After 1NF (GOOD):**

| OrderID | CustomerName | ItemName |
|---------|--------------|----------|
| 1 | Patrick | Laptop |
| 1 | Patrick | Mouse |

*Fix: One value per cell, one row per item.*

**Reading Like English:** "Each cell contains only one piece of information."

---

### 📝 Second Normal Form (2NF)

**Rule:**
1. Must already be in 1NF
2. Every non-key column must depend on the ENTIRE primary key — not just part of it

**Still in 2NF Problem:**

| OrderID | CustomerName | CustomerPhone | ItemName | ItemPrice |
|---------|--------------|---------------|----------|-----------|
| 1 | Patrick | 555-1234 | Laptop | 1000 |
| 1 | Patrick | 555-1234 | Mouse | 50 |

*Problem: `CustomerName` and `CustomerPhone` depend only on `CustomerID`, NOT on the order itself. They repeat whenever an order is made.*

**After 2NF — Split into TWO tables:**

**Customers Table:**
| CustomerID | CustomerName | CustomerPhone |
|------------|--------------|---------------|
| C1 | Patrick | 555-1234 |
| C2 | Maria | 555-5678 |

**Orders Table:**
| OrderID | CustomerID | ItemName | ItemPrice |
|---------|------------|----------|-----------|
| 1 | C1 | Laptop | 1000 |
| 1 | C1 | Mouse | 50 |

*Fix: Customer info lives in its own table. Orders just reference the CustomerID.*

**Reading Like English:** "Each piece of data belongs in exactly one place."

---

### 📝 Third Normal Form (3NF)

**Rule:**
1. Must already be in 2NF
2. No non-key column should depend on another non-key column (no transitive dependencies)

**2NF Problem Remaining:**

In our Customers table, what if we add a ZipCode and City?

| CustomerID | CustomerName | ZipCode | City |
|------------|--------------|---------|------|
| C1 | Patrick | 1100 | Quezon City |

*Problem: `City` depends on `ZipCode`, not on `CustomerID`. So if two customers have the same ZipCode, "Quezon City" is stored twice!*

**After 3NF — Split out the dependency:**

**Customers Table:**
| CustomerID | CustomerName | ZipCode |
|------------|--------------|---------|
| C1 | Patrick | 1100 |

**Locations Table:**
| ZipCode | City |
|---------|------|
| 1100 | Quezon City |

**Reading Like English:** "Every column describes the primary key, and nothing but the primary key."

---

### 🎬 Real-World Full Example

**Unnormalized — One table with everything:**

| EmpID | EmpName | DeptName | DeptManager | ProjectName | ProjectDeadline |
|-------|---------|----------|-------------|-------------|-----------------|
| 1 | Patrick | Engineering | Sir Rodel | Website | Dec 2026 |
| 1 | Patrick | Engineering | Sir Rodel | Mobile App | Mar 2027 |

**After 3NF — Four clean tables:**

```sql
-- Employees
CREATE TABLE employees (
    emp_id   INTEGER PRIMARY KEY,
    emp_name TEXT NOT NULL
);

-- Departments
CREATE TABLE departments (
    dept_id      INTEGER PRIMARY KEY,
    dept_name    TEXT NOT NULL,
    dept_manager TEXT NOT NULL
);

-- Employee-Department link
CREATE TABLE emp_dept (
    emp_id  INTEGER,
    dept_id INTEGER
);

-- Projects
CREATE TABLE projects (
    project_id       INTEGER PRIMARY KEY,
    emp_id           INTEGER,
    project_name     TEXT,
    project_deadline TEXT
);
```

**Reading Like English:** "Each table describes exactly one thing. Tables are connected through IDs."

---

### 📝 Normalization Quick Reference

| Normal Form | Rule in Plain English |
|-------------|----------------------|
| **1NF** | One value per cell. Every row is unique. |
| **2NF** | Non-key columns depend on the WHOLE primary key. |
| **3NF** | Non-key columns depend ONLY on the primary key, not on each other. |

---

### 📝 ACTIVITIES — Lesson 6.1

**Activity 1:** Spot the problem
The table below violates 1NF. Identify why and fix it.

| EmpID | EmpName | Skills |
|-------|---------|--------|
| 1 | Patrick | PHP, Java, SQL |

**Hint:** What's wrong with the Skills column?

---

**Activity 2:** Normalize to 2NF
This table is in 1NF but not 2NF. Identify the issue and split it into proper tables.

| OrderID | CustomerID | CustomerName | Product | Price |
|---------|------------|--------------|---------|-------|
| 1 | C1 | Patrick | Laptop | 1000 |

---

**Activity 3:** Design a normalized database
A bookstore needs to store: Books (title, author, genre), Customers (name, email), and Orders (which customer bought which book, and when).

Design a set of tables in 3NF. Write them as CREATE TABLE statements.

**Expected:**
- At least 3 tables
- Each table has a PRIMARY KEY
- No duplicate data across rows

---

## Lesson 6.2: SQL JOINs

### 🧠 The Concept

After normalization, your data is in multiple tables. **JOINs** let you pull data from multiple tables together in a single query.

**Analogy:** You have two lists:
- List A: Employees with their `dept_id`
- List B: Departments with `dept_name`

A JOIN combines them so you can see `emp_name` AND `dept_name` together in one result.

---

### 📝 Setup: Two Tables

```sql
-- Employees table
CREATE TABLE employees (
    id         INTEGER PRIMARY KEY,
    name       TEXT,
    dept_id    INTEGER
);

INSERT INTO employees VALUES (1, 'Patrick', 10);
INSERT INTO employees VALUES (2, 'Maria', 20);
INSERT INTO employees VALUES (3, 'Juan', NULL);   -- No department assigned!

-- Departments table
CREATE TABLE departments (
    id         INTEGER PRIMARY KEY,
    dept_name  TEXT
);

INSERT INTO departments VALUES (10, 'Engineering');
INSERT INTO departments VALUES (20, 'HR');
INSERT INTO departments VALUES (30, 'Sales');      -- No employee in Sales!
```

*Notice: Juan has no department. Sales has no employees. This is intentional — it shows how each JOIN behaves differently.*

---

### 📝 INNER JOIN — Only the matches

Returns rows that have matching values in BOTH tables.

```sql
SELECT employees.name, departments.dept_name
FROM employees
INNER JOIN departments ON employees.dept_id = departments.id;
```

**Result:**
| name | dept_name |
|------|-----------|
| Patrick | Engineering |
| Maria | HR |

*Juan is excluded (no dept_id). Sales is excluded (no employees).*

**Reading Like English:** "Give me employees AND their department, but only if both sides exist."

---

### 📝 LEFT JOIN — All from left, matches from right

Returns ALL rows from the LEFT table, and matched rows from the right. If no match, fills with NULL.

```sql
SELECT employees.name, departments.dept_name
FROM employees
LEFT JOIN departments ON employees.dept_id = departments.id;
```

**Result:**
| name | dept_name |
|------|-----------|
| Patrick | Engineering |
| Maria | HR |
| Juan | NULL |

*Juan is included (he's on the left/employees side), but dept_name is NULL because he has no department.*

**Reading Like English:** "Give me ALL employees. If they have a department, show it. If not, show NULL."

---

### 📝 RIGHT JOIN — All from right, matches from left

Returns ALL rows from the RIGHT table, and matched rows from the left.

```sql
SELECT employees.name, departments.dept_name
FROM employees
RIGHT JOIN departments ON employees.dept_id = departments.id;
```

**Result:**
| name | dept_name |
|------|-----------|
| Patrick | Engineering |
| Maria | HR |
| NULL | Sales |

*Sales is included (it's on the right/departments side), but name is NULL because no one is assigned there.*

**Reading Like English:** "Give me ALL departments. If they have employees, show them. If not, show NULL."

---

### 📝 FULL OUTER JOIN — Everything from both sides

Returns ALL rows from BOTH tables. NULLs where there is no match.

```sql
SELECT employees.name, departments.dept_name
FROM employees
FULL OUTER JOIN departments ON employees.dept_id = departments.id;
```

**Result:**
| name | dept_name |
|------|-----------|
| Patrick | Engineering |
| Maria | HR |
| Juan | NULL |
| NULL | Sales |

*Both Juan (no dept) and Sales (no employee) appear.*

**Reading Like English:** "Give me EVERYTHING from both tables, match where you can, NULL where you can't."

---

### 📝 JOIN Summary Table

| JOIN Type | What it returns |
|-----------|----------------|
| `INNER JOIN` | Only rows with matches in BOTH tables |
| `LEFT JOIN` | ALL from left + matching from right (NULL if no match) |
| `RIGHT JOIN` | ALL from right + matching from left (NULL if no match) |
| `FULL OUTER JOIN` | ALL from both (NULL where no match) |

---

### 🎬 Real-World Example: Employee + Department Report

```sql
-- Get all employee names and their department names
SELECT e.name AS employee, d.dept_name AS department
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id
ORDER BY d.dept_name;
```

*The `e` and `d` are aliases — shortcuts so you don't have to type the full table name every time.*

---

### 📝 ACTIVITIES — Lesson 6.2

**Activity 1:** Given these two tables:

```sql
CREATE TABLE students (id INTEGER, name TEXT, course_id INTEGER);
CREATE TABLE courses (id INTEGER, course_name TEXT);

INSERT INTO students VALUES (1, 'Patrick', 101);
INSERT INTO students VALUES (2, 'Maria', 102);
INSERT INTO students VALUES (3, 'Juan', NULL);
INSERT INTO courses VALUES (101, 'Programming');
INSERT INTO courses VALUES (102, 'Databases');
INSERT INTO courses VALUES (103, 'Networking');
```

Write queries using:
1. `INNER JOIN` — Show students with their course names
2. `LEFT JOIN` — Show all students, include those with no course
3. `RIGHT JOIN` — Show all courses, include those with no students

---

**Activity 2:** Predict the output
What does this query return?

```sql
SELECT s.name, c.course_name
FROM students s
LEFT JOIN courses c ON s.course_id = c.id;
```

---

## Lesson 6.3: CRUD Operations (Deep Dive)

### 🧠 The Concept

CRUD is the backbone of every application that touches data:
- **C**reate → `INSERT`
- **R**ead → `SELECT`
- **U**pdate → `UPDATE`
- **D**elete → `DELETE`

You learned the basics in Unit 3. Now we go deeper — safety practices, patterns, and real usage.

---

### 📝 CREATE — Adding Data

```sql
-- Basic INSERT
INSERT INTO employees (name, department, salary)
VALUES ('Patrick', 'Engineering', 50000);

-- Insert multiple rows at once
INSERT INTO employees (name, department, salary) VALUES
    ('Maria',   'HR',          45000),
    ('Juan',    'Engineering', 52000),
    ('Rosa',    'Sales',       48000);
```

**Reading Like English:** "Add a new row to the employees table with these values."

---

### 📝 READ — Getting Data (SELECT Patterns)

```sql
-- All rows, all columns
SELECT * FROM employees;

-- Specific columns only
SELECT name, salary FROM employees;

-- With filter
SELECT * FROM employees WHERE department = 'Engineering';

-- Sort results
SELECT * FROM employees ORDER BY salary DESC;

-- Limit results (top 3 earners)
SELECT * FROM employees ORDER BY salary DESC LIMIT 3;

-- Count rows
SELECT COUNT(*) FROM employees;

-- Aggregate functions
SELECT
    department,
    COUNT(*)     AS headcount,
    AVG(salary)  AS avg_salary,
    SUM(salary)  AS total_salary,
    MAX(salary)  AS highest_salary,
    MIN(salary)  AS lowest_salary
FROM employees
GROUP BY department;
```

---

### 📝 UPDATE — Changing Data

```sql
-- Update a single row (ALWAYS use WHERE!)
UPDATE employees SET salary = 55000 WHERE id = 1;

-- Update multiple columns at once
UPDATE employees
SET salary = 55000, department = 'Senior Engineering'
WHERE id = 1;

-- Update all rows in a condition
UPDATE employees SET salary = salary * 1.10
WHERE department = 'Engineering';   -- 10% raise to all Engineers
```

**⚠️ DANGER:** Never run `UPDATE employees SET salary = 0;` — this resets EVERYONE's salary to 0 with no WHERE!

---

### 📝 DELETE — Removing Data

```sql
-- Delete a specific row
DELETE FROM employees WHERE id = 1;

-- Delete by condition
DELETE FROM employees WHERE department = 'Sales';

-- ⚠️ DANGER: This deletes EVERYONE
-- DELETE FROM employees;
```

**Best practice before deleting:**
```sql
-- First verify who you're about to delete!
SELECT * FROM employees WHERE id = 1;
-- Then delete only if you're sure
DELETE FROM employees WHERE id = 1;
```

---

### 🎬 Real-World Example: Full CRUD Workflow

```sql
-- 1. CREATE the table
CREATE TABLE employees (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    department TEXT,
    salary     DECIMAL(10,2)
);

-- 2. CREATE (Insert) some employees
INSERT INTO employees (name, department, salary) VALUES
    ('Patrick', 'Engineering', 50000),
    ('Maria',   'HR',          45000),
    ('Juan',    'Sales',       48000);

-- 3. READ — verify they are there
SELECT * FROM employees;

-- 4. UPDATE — Patrick gets a raise
UPDATE employees SET salary = 55000 WHERE name = 'Patrick';

-- 5. READ — verify the update
SELECT name, salary FROM employees WHERE name = 'Patrick';

-- 6. DELETE — Juan resigns
DELETE FROM employees WHERE name = 'Juan';

-- 7. READ — verify final state
SELECT * FROM employees;
```

---

### 📝 ACTIVITIES — Lesson 6.3

**Activity 1:** Write SQL for all 4 CRUD operations on a `products` table with columns: `id`, `product_name`, `price`, `stock`.

1. CREATE the table
2. INSERT 3 products
3. SELECT all products where price > 100
4. UPDATE the price of one product
5. DELETE a product where stock = 0

---

**Activity 2:** Write a query to give everyone in the 'Engineering' department a 15% salary raise.

---

## Lesson 6.4: FizzBuzz Algorithm

### 🧠 The Concept

FizzBuzz is THE most common programming interview question in the world. Every developer has been asked this at least once. The point is not the problem itself — it tests whether you understand:
1. Loop logic
2. Modulo operator (`%`)
3. Condition ordering

**The Rule:**
- Number is divisible by 3 → print `"Fizz"`
- Number is divisible by 5 → print `"Buzz"`
- Number is divisible by BOTH 3 AND 5 → print `"FizzBuzz"`
- Otherwise → print the number

---

### 📝 The Modulo Operator `%`

`%` gives you the **remainder** after division.

```
15 % 3 = 0   → 15 divides evenly by 3 (no remainder)
15 % 5 = 0   → 15 divides evenly by 5 (no remainder)
10 % 3 = 1   → 10 / 3 = 3 remainder 1
7  % 5 = 2   → 7  / 5 = 1 remainder 2
```

**Key insight:** If `number % 3 == 0`, the number is a multiple of 3!

---

### 📝 The Ordering Rule — MOST IMPORTANT PART

**Wrong order (common mistake):**

```java
// ❌ WRONG — FizzBuzz condition is unreachable!
if (i % 3 == 0) {
    System.out.println("Fizz");
} else if (i % 5 == 0) {
    System.out.println("Buzz");
} else if (i % 3 == 0 && i % 5 == 0) {  // This NEVER runs!
    System.out.println("FizzBuzz");       // Why? Because 15 already matched % 3 above!
}
```

**Why it fails:** If `i = 15`, the first condition `15 % 3 == 0` is TRUE, so it prints "Fizz" and skips everything else. FizzBuzz never gets a chance.

**Correct order — most specific FIRST:**

```java
// ✅ CORRECT
if (i % 3 == 0 && i % 5 == 0) {  // BOTH — most specific, check first
    System.out.println("FizzBuzz");
} else if (i % 3 == 0) {
    System.out.println("Fizz");
} else if (i % 5 == 0) {
    System.out.println("Buzz");
} else {
    System.out.println(i);
}
```

---

### 🎬 Java Implementation (1 to 20)

```java
public class FizzBuzz {
    public static void main(String[] args) {

        // Start at 1, not 0! The problem says "1 to 20"
        for (int i = 1; i <= 20; i++) {

            // Check BOTH first (most specific)
            if (i % 3 == 0 && i % 5 == 0) {
                System.out.println("FizzBuzz");

            // Then check 3 alone
            } else if (i % 3 == 0) {
                System.out.println("Fizz");

            // Then check 5 alone
            } else if (i % 5 == 0) {
                System.out.println("Buzz");

            // Default: just print the number
            } else {
                System.out.println(i);
            }
        }
    }
}
```

**Expected Output:**
```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
16
17
Fizz
19
Buzz
```

---

### 🎬 PHP Implementation (1 to 20)

```php
<?php
for ($i = 1; $i <= 20; $i++) {

    if ($i % 3 == 0 && $i % 5 == 0) {
        echo "FizzBuzz\n";
    } else if ($i % 3 == 0) {
        echo "Fizz\n";
    } else if ($i % 5 == 0) {
        echo "Buzz\n";
    } else {
        echo "$i\n";
    }
}
?>
```

---

### 📝 ACTIVITIES — Lesson 6.4

**Activity 1:** Write a FizzBuzz from 1 to 100.

**Activity 2:** Modify FizzBuzz — add a new rule: If the number is divisible by 7, print "Jazz". Handle all combinations (FizzJazz, BuzzJazz, FizzBuzzJazz, etc.). *Hint: There are now 7 possible conditions. Think carefully about which is most specific.*

---

## Lesson 6.5: Finding Min/Max in Arrays (Without Built-ins)

### 🧠 The Concept

In an interview, you may be told: **"Find the minimum/maximum without using sort() or any helper method."** They want to see if you can think algorithmically using only loops and conditions.

**Analogy:** Imagine you have a deck of shuffled cards face-down. You flip them one at a time. You hold the lowest card you've seen so far. If you flip a lower one, you switch. By the time the deck is done, you're holding the lowest card.

---

### 📝 Finding the Maximum

```java
public static double getMaximum(double[] salaries) {

    // Step 1: Start by assuming the first item is the biggest
    double max = salaries[0];

    // Step 2: Loop from index 1 (we already used index 0)
    for (int i = 1; i < salaries.length; i++) {

        // Step 3: If current item is BIGGER than our max, update
        if (salaries[i] > max) {
            max = salaries[i];
        }
    }

    // Step 4: Return result
    return max;
}
```

---

### 📝 Finding the Minimum — Same Logic, Flipped Comparison

```java
public static double getMinimum(double[] salaries) {

    // Step 1: Start by assuming the first item is the SMALLEST
    double min = salaries[0];

    // Step 2: Loop from index 1
    for (int i = 1; i < salaries.length; i++) {

        // Step 3: If current item is SMALLER than our min, update
        //         ↑ Only this comparison changes from Max!
        if (salaries[i] < min) {
            min = salaries[i];
        }
    }

    // Step 4: Return result
    return min;
}
```

---

### 🎬 Complete Real-World Example

```java
public class SalaryStats {

    public static double getMaximum(double[] arr) {
        double max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) max = arr[i];
        }
        return max;
    }

    public static double getMinimum(double[] arr) {
        double min = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < min) min = arr[i];
        }
        return min;
    }

    public static double getAverage(double[] arr) {
        double total = 0;
        for (double val : arr) {
            total += val;
        }
        return total / arr.length;
    }

    public static void main(String[] args) {
        double[] salaries = {50000, 30000, 65000, 20000, 72000, 45000};

        System.out.println("Highest Salary: $" + getMaximum(salaries));  // 72000
        System.out.println("Lowest Salary:  $" + getMinimum(salaries));  // 20000
        System.out.println("Average Salary: $" + getAverage(salaries));  // 47000
    }
}
```

**Output:**
```
Highest Salary: $72000.0
Lowest Salary:  $20000.0
Average Salary: $47000.0
```

---

### 📝 PHP Version

```php
<?php
$salaries = [50000, 30000, 65000, 20000, 72000, 45000];

// Find minimum without built-ins
$min = $salaries[0];
foreach ($salaries as $salary) {
    if ($salary < $min) {
        $min = $salary;
    }
}

// Find maximum without built-ins
$max = $salaries[0];
foreach ($salaries as $salary) {
    if ($salary > $max) {
        $max = $salary;
    }
}

echo "Lowest:  $" . $min . "\n";  // 20000
echo "Highest: $" . $max . "\n";  // 72000
?>
```

---

### 📝 ACTIVITIES — Lesson 6.5

**Activity 1:** Write a Java method `getMinimum(int[] numbers)` that finds the minimum value. Test with `{8, 3, 17, 1, 25, 6}`. Expected: `1`.

**Activity 2:** Write a PHP program that given an array of employee salaries, prints:
- The name of the employee with the lowest salary
- The name of the employee with the highest salary

*Hint: Track both the name AND salary together, like you learned in Q14 of the mock exam.*

```php
$employees = array(
    array("name" => "Patrick", "salary" => 50000),
    array("name" => "Maria",   "salary" => 62000),
    array("name" => "Juan",    "salary" => 35000),
    array("name" => "Rosa",    "salary" => 47000)
);
```

**Expected Output:**
```
Lowest paid:  Juan — $35000
Highest paid: Maria — $62000
```

---

## 🧠 Key Concepts Summary

| Concept | What it is | Key Rule |
|---------|-----------|----------|
| **1NF** | One value per cell | Atomic values + Primary Key |
| **2NF** | No partial dependencies | All columns depend on whole PK |
| **3NF** | No transitive dependencies | Columns only describe the PK |
| **INNER JOIN** | Matching rows from both tables | Both sides must have a value |
| **LEFT JOIN** | All from left, matches from right | Left side always shows |
| **RIGHT JOIN** | All from right, matches from left | Right side always shows |
| **FULL OUTER JOIN** | Everything from both | Both sides always show |
| **CRUD** | Create, Read, Update, Delete | Always use WHERE on Update/Delete |
| **FizzBuzz** | Modulo pattern | Most specific condition (both) FIRST |
| **Min/Max** | Array traversal algorithm | Start with arr[0], loop from index 1 |

---

## 💡 Common Mistakes to Avoid

1. **Normalization** — Forgetting Foreign Keys when splitting tables. After you split, you need a reference column (e.g., `dept_id`) to link them back.
2. **JOINs** — Confusing LEFT and RIGHT. Remember: LEFT = all from the first table listed. RIGHT = all from the second table listed.
3. **UPDATE/DELETE** — Running without WHERE. Always test with a SELECT first!
4. **FizzBuzz** — Putting FizzBuzz condition last. It becomes unreachable! Most specific = FIRST.
5. **Min/Max** — Setting baseline to `0` instead of `arr[0]`. If all values are positive, `0` as baseline works by accident. But with negative numbers, it breaks completely.

---

## 🎯 Next Steps

1. ✅ Complete all activities in each lesson (6.1 through 6.5)
2. ✅ Save your SQL practice in the ACTS folder
3. ✅ Compile and run your Java FizzBuzz and Min/Max programs
4. ✅ Review the cheat sheet (LESSON_6_CHEAT_SHEET.md) before your next exam

**Every concept you learn now is one less thing that will surprise you in an interview! 🚀**
