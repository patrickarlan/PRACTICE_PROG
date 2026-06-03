# 📝 LESSON 6 CHEAT SHEET: Advanced Topics
## Quick Reference for Normalization, JOINs, CRUD, FizzBuzz, Min/Max

---

## 1️⃣ DATABASE NORMALIZATION

| Form | Rule in Plain English | Fix |
|------|-----------------------|-----|
| **1NF** | One value per cell. Every row is unique. | Split multi-values into separate rows |
| **2NF** | Non-key columns must depend on the WHOLE primary key. | Move partial dependencies to their own table |
| **3NF** | Non-key columns only depend on the primary key, NOT on each other. | Move transitive dependencies to their own table |

### Quick Example Workflow
```
❌ One giant table with repeating data
    ↓ Apply 1NF
✅ One value per cell, rows are unique
    ↓ Apply 2NF
✅ Split out columns that don't depend on full PK
    ↓ Apply 3NF
✅ Split out columns that depend on other non-key columns
```

### Key Terms
- **Primary Key (PK):** Unique identifier for each row
- **Foreign Key (FK):** A column that references the PK of another table
- **Redundancy:** When the same data is stored in more than one place

---

## 2️⃣ SQL JOINs

### Setup to visualize
```
Employees (id, name, dept_id)    Departments (id, dept_name)
-----------------------------------------------
1  Patrick  10                   10  Engineering
2  Maria    20                   20  HR
3  Juan     NULL                 30  Sales (no employees!)
```

### The 4 JOINs
```sql
-- INNER JOIN: Only matching rows (Patrick + Maria)
SELECT e.name, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id;

-- LEFT JOIN: All employees, match if possible (Juan shows as NULL)
SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id;

-- RIGHT JOIN: All departments, match if possible (Sales shows as NULL)
SELECT e.name, d.dept_name
FROM employees e
RIGHT JOIN departments d ON e.dept_id = d.id;

-- FULL OUTER JOIN: Everyone from both sides
SELECT e.name, d.dept_name
FROM employees e
FULL OUTER JOIN departments d ON e.dept_id = d.id;
```

### Results at a glance
| JOIN Type | Patrick | Maria | Juan (no dept) | Sales (no emp) |
|-----------|---------|-------|----------------|----------------|
| INNER | ✅ | ✅ | ❌ | ❌ |
| LEFT | ✅ | ✅ | ✅ (NULL dept) | ❌ |
| RIGHT | ✅ | ✅ | ❌ | ✅ (NULL emp) |
| FULL OUTER | ✅ | ✅ | ✅ (NULL dept) | ✅ (NULL emp) |

---

## 3️⃣ CRUD OPERATIONS

```sql
-- CREATE (Insert)
INSERT INTO employees (name, dept, salary) VALUES ('Patrick', 'Engineering', 50000);

-- READ (Select)
SELECT * FROM employees WHERE salary > 45000 ORDER BY salary DESC;

-- UPDATE (⚠️ Always use WHERE!)
UPDATE employees SET salary = 55000 WHERE id = 1;

-- DELETE (⚠️ Always use WHERE!)
DELETE FROM employees WHERE id = 1;
```

### CRUD Safety Checklist
- Before UPDATE: Run a SELECT with the same WHERE clause first
- Before DELETE: Run `SELECT * FROM table WHERE condition;` to verify
- Never run `UPDATE table SET ...;` or `DELETE FROM table;` without WHERE!

---

## 4️⃣ FIZZBUZZ

### The 3 Rules
1. Divisible by 3 → `"Fizz"`
2. Divisible by 5 → `"Buzz"`
3. Divisible by BOTH → `"FizzBuzz"` **(check this FIRST!)**

### Java
```java
for (int i = 1; i <= 20; i++) {
    if      (i % 3 == 0 && i % 5 == 0) System.out.println("FizzBuzz");
    else if (i % 3 == 0)                System.out.println("Fizz");
    else if (i % 5 == 0)                System.out.println("Buzz");
    else                                System.out.println(i);
}
```

### PHP
```php
for ($i = 1; $i <= 20; $i++) {
    if      ($i % 3 == 0 && $i % 5 == 0) echo "FizzBuzz\n";
    else if ($i % 3 == 0)                 echo "Fizz\n";
    else if ($i % 5 == 0)                 echo "Buzz\n";
    else                                  echo "$i\n";
}
```

### ⚠️ The Golden Rule
```
FizzBuzz → Fizz → Buzz → number
NEVER put FizzBuzz last — it becomes unreachable!
```

---

## 5️⃣ MIN / MAX WITHOUT BUILT-INS

### Java
```java
public static double getMinimum(double[] arr) {
    double min = arr[0];                     // Start with first item
    for (int i = 1; i < arr.length; i++) {  // Loop from index 1
        if (arr[i] < min) min = arr[i];      // Update if smaller found
    }
    return min;
}

public static double getMaximum(double[] arr) {
    double max = arr[0];
    for (int i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];      // Update if BIGGER found
    }
    return max;
}
```

### PHP
```php
$min = $arr[0];
foreach ($arr as $val) {
    if ($val < $min) $min = $val;
}

$max = $arr[0];
foreach ($arr as $val) {
    if ($val > $max) $max = $val;
}
```

### The 4-Step Algorithm
```
1. Set baseline = arr[0]  (first item, NOT zero!)
2. Loop from index 1
3. Compare: if smaller/bigger, update baseline
4. Return baseline after loop
```

---

## 🔑 REMEMBER THESE!

| Topic | Key Rule |
|-------|----------|
| 1NF | One value per cell |
| 2NF | Whole PK dependency |
| 3NF | PK-only dependency |
| INNER JOIN | Both sides must match |
| LEFT JOIN | All from left, NULL from right |
| WHERE | Always use on UPDATE & DELETE |
| FizzBuzz | BOTH condition goes FIRST |
| Min/Max | Start with `arr[0]`, not `0` |
