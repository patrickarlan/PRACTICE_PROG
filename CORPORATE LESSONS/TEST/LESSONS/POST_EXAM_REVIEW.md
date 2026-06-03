# 🚀 POST-EXAM LEARNING GUIDE
## Turning Failure into Future Success

> Failing an exam is never the end — it's just a diagnostic tool telling you exactly what you need to learn next. You already know how to write code; now we're just adding a few more professional concepts to your toolkit.

---

## 1️⃣ DATABASE NORMALIZATION (1NF, 2NF, 3NF)

**What is it?** Normalization is the process of organizing data in a database to reduce redundancy (repeating data) and improve data integrity.

### 🔴 Unnormalized Data (The Problem)
Imagine a table where everything is crammed together:
| OrderID | CustomerName | CustomerPhone | ItemName | ItemPrice |
|---------|--------------|---------------|----------|-----------|
| 1       | Patrick      | 555-1234      | Laptop   | 1000      |
| 1       | Patrick      | 555-1234      | Mouse    | 50        |

*Problem:* Patrick's name and phone number are repeated. If his phone number changes, we have to update it in multiple places!

### 🟢 First Normal Form (1NF)
**Rule:** Each column must hold a single value (atomic), and every row must have a unique identifier (Primary Key).
*Fix:* Ensure no lists separated by commas in a single cell. Our table above is actually in 1NF, but it has repetition.

### 🟢 Second Normal Form (2NF)
**Rule:** Must be in 1NF, AND all non-key columns must depend on the ENTIRE primary key.
*Fix:* Separate the Order info from the Item info.

**Orders Table**
| OrderID | CustomerName | CustomerPhone |
|---------|--------------|---------------|
| 1       | Patrick      | 555-1234      |

**OrderItems Table**
| OrderID | ItemName | ItemPrice |
|---------|----------|-----------|
| 1       | Laptop   | 1000      |
| 1       | Mouse    | 50        |

### 🟢 Third Normal Form (3NF)
**Rule:** Must be in 2NF, AND no non-key column can depend on another non-key column (no transitive dependency).
*Fix:* In the Orders table, `CustomerPhone` depends on `CustomerName`, not the `OrderID`. We need a Customers table!

**Customers Table**
| CustomerID | CustomerName | CustomerPhone |
|------------|--------------|---------------|
| C1         | Patrick      | 555-1234      |

**Orders Table**
| OrderID | CustomerID |
|---------|------------|
| 1       | C1         |

**Items Table**
| ItemID | ItemName | ItemPrice |
|--------|----------|-----------|
| I1     | Laptop   | 1000      |
| I2     | Mouse    | 50        |

*Result:* No repeated data. If Patrick changes his phone number, we update it in ONE row in the Customers table.

---

## 2️⃣ TABLE JOINs

When you normalize a database (like above), your data is split into multiple tables. **JOINs** are how you put them back together to read them.

Imagine two tables:
**Employees** (id, name, dept_id)
**Departments** (id, dept_name)

| JOIN Type | What it does | Venn Diagram Idea |
|-----------|--------------|-------------------|
| **INNER JOIN** | Returns ONLY records that have matching values in BOTH tables. | The overlapping middle. |
| **LEFT JOIN** | Returns ALL records from the left table, and matched records from the right table. | The whole left circle + middle. |
| **RIGHT JOIN** | Returns ALL records from the right table, and matched records from the left. | The whole right circle + middle. |
| **FULL OUTER JOIN**| Returns ALL records when there is a match in either left or right table. | Both entire circles. |

### INNER JOIN Example
```sql
SELECT Employees.name, Departments.dept_name
FROM Employees
INNER JOIN Departments ON Employees.dept_id = Departments.id;
```
*Gets only employees who belong to a department, and departments that have employees.*

---

## 3️⃣ CRUD OPERATIONS

This is the bread and butter of all applications.
- **C**reate → `INSERT`
- **R**ead   → `SELECT`
- **U**pdate → `UPDATE`
- **D**elete → `DELETE`

```sql
-- CREATE
INSERT INTO users (name, age) VALUES ('Patrick', 25);

-- READ
SELECT * FROM users WHERE age > 18;

-- UPDATE (Always use WHERE!)
UPDATE users SET age = 26 WHERE name = 'Patrick';

-- DELETE (Always use WHERE!)
DELETE FROM users WHERE name = 'Patrick';
```

---

## 4️⃣ FIZZBUZZ (The Classic Interview Question)

**The Goal:** Loop through numbers. If multiple of 3 → "Fizz". If multiple of 5 → "Buzz". If BOTH → "FizzBuzz".

**The Secret:** The condition for BOTH (`% 3 == 0 && % 5 == 0`) **MUST** go first!

### Java Implementation
```java
for (int i = 1; i <= 20; i++) {
    // 1. Check BOTH first
    if (i % 3 == 0 && i % 5 == 0) {
        System.out.println("FizzBuzz");
    } 
    // 2. Check 3
    else if (i % 3 == 0) {
        System.out.println("Fizz");
    } 
    // 3. Check 5
    else if (i % 5 == 0) {
        System.out.println("Buzz");
    } 
    // 4. Default
    else {
        System.out.println(i);
    }
}
```

---

## 5️⃣ ARRAY MINIMUM VALUE (Without Built-in Methods)

You already learned how to find the *highest* value. Finding the *minimum* is exactly the same logic, just flip the `>` to a `<`.

**The Algorithm:**
1. Assume the first item (`array[0]`) is the smallest.
2. Loop through the rest of the array starting from index 1.
3. If you find a number *smaller* than your current minimum, update your minimum.

### Java Implementation
```java
public static double getMinimum(double[] salaries) {
    // 1. Set baseline to the first item
    double min = salaries[0];

    // 2. Loop starting from index 1
    for (int i = 1; i < salaries.length; i++) {
        
        // 3. Compare and update
        if (salaries[i] < min) {   // <-- Notice we use < instead of >
            min = salaries[i];
        }
    }
    
    // 4. Return result
    return min;
}

// In main:
// double[] salaries = {50000, 30000, 65000, 20000};
// double lowest = getMinimum(salaries);  // returns 20000
```
