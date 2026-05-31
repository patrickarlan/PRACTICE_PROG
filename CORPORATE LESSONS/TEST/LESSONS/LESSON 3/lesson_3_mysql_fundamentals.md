# 🟠 UNIT 3: MYSQL FUNDAMENTALS
## Lesson 3: Database Language

**Duration:** 3-4 hours of focused study  
**What You'll Learn:** How to store, retrieve, and manage data in databases  
**Why It Matters:** Every website stores data in databases. Master SQL, and you control the data.

---

## 📖 Introduction: What is MySQL?

Think of a **filing cabinet**:
- **Database** = The whole filing cabinet
- **Table** = One drawer in the cabinet (like an Excel spreadsheet)
- **Row** = One piece of paper (one record)
- **Column** = One field on the paper (like Name, Age, Salary)

MySQL is a **language to ask questions** about the data:
- "Show me all employees" → SELECT
- "Add a new employee" → INSERT
- "Change someone's salary" → UPDATE
- "Remove an employee" → DELETE

**The flow:**
```
You write SQL → MySQL reads it → Database returns answer → You see result
```

---

## Lesson 3.1: MySQL Basics — Understanding Tables

### 🧠 The Concept

A **table** is like a spreadsheet with rows and columns.

```
employees table:
┌────┬─────────┬─────────────┬──────────┐
│ id │  name   │   email     │ salary   │
├────┼─────────┼─────────────┼──────────┤
│ 1  │ Patrick │ p@email.com │ 50000    │
│ 2  │ Maria   │ m@email.com │ 55000    │
│ 3  │ Juan    │ j@email.com │ 48000    │
└────┴─────────┴─────────────┴──────────┘
```

**Vocabulary:**
- **Column (Field):** A category of data (id, name, email, salary)
- **Row (Record):** One person's complete data
- **Table:** All the data organized in rows and columns
- **Primary Key:** A unique ID for each row (no duplicates)

### 📝 Reading Like English

"This table has employees. Each employee has an id, name, email, and salary."

### 🎬 Real-World Example: Departments Table

```
departments table:
┌────┬─────────────────┬──────────┐
│ id │ dept_name       │ manager  │
├────┼─────────────────┼──────────┤
│ 1  │ Engineering     │ Patrick  │
│ 2  │ Human Resources │ Maria    │
│ 3  │ Sales           │ Juan     │
└────┴─────────────────┴──────────┘
```

Each row is one department. The `id` uniquely identifies each one.

---

## Lesson 3.2: CREATE TABLE — Building the Structure

### 🧠 The Concept

Before storing data, you must define the **structure** of the table. This is like creating a blank spreadsheet with labeled columns.

### 📝 Basic CREATE TABLE

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    salary DECIMAL(10, 2),
    department VARCHAR(50)
);
```

**Reading Line by Line:**
- Line 1: "Create a table called employees"
- Line 2: "Column id: whole number, primary key (unique), auto-increment (automatically numbered)"
- Line 3: "Column name: text up to 100 characters, NOT NULL (required, cannot be empty)"
- Line 4: "Column email: text up to 100 characters (can be empty)"
- Line 5: "Column salary: decimal with up to 10 total digits, 2 after decimal (like 50000.50)"
- Line 6: "Column department: text up to 50 characters"

### 📝 Data Types Explained

| Data Type | Use | Example |
|-----------|-----|---------|
| `INT` | Whole numbers | 25, 1001, 50000 |
| `VARCHAR(n)` | Text (max n characters) | "Patrick", "Engineering" |
| `DECIMAL(10,2)` | Decimal numbers | 50000.50, 123.45 |
| `DATE` | Dates | 2026-05-31 |
| `TIMESTAMP` | Date and time | 2026-05-31 14:30:00 |
| `BOOLEAN` | True/False | TRUE, FALSE |

### 📝 Constraints (Rules)

| Constraint | Meaning |
|-----------|---------|
| `PRIMARY KEY` | Unique identifier, cannot be empty |
| `NOT NULL` | Must have a value, cannot be empty |
| `AUTO_INCREMENT` | Automatically increases by 1 |
| `DEFAULT value` | Default value if not provided |

### 🎬 Real-World Example: Complete Employee Table

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    salary DECIMAL(10, 2),
    department VARCHAR(50),
    hire_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**What this means:**
- `id`: Automatically numbered (1, 2, 3, ...)
- `first_name`, `last_name`, `email`: Required (must have values)
- `salary`, `department`: Optional
- `hire_date`: Date when hired
- `is_active`: True/False, defaults to TRUE
- `created_at`: Automatically set to current date/time

---

## Lesson 3.3: INSERT — Adding Data

### 🧠 The Concept

INSERT is how you **add new rows** to a table.

### 📝 Basic INSERT

```sql
INSERT INTO employees (first_name, last_name, email, salary, department)
VALUES ('Patrick', 'Arlan', 'patrick@email.com', 50000, 'Engineering');
```

**Reading Like English:**
- "Insert into employees table"
- "Columns: first_name, last_name, email, salary, department"
- "Values: Patrick, Arlan, patrick@email.com, 50000, Engineering"

### 📝 Multiple Inserts

```sql
INSERT INTO employees (first_name, last_name, email, salary, department)
VALUES 
('Patrick', 'Arlan', 'patrick@email.com', 50000, 'Engineering'),
('Maria', 'Santos', 'maria@email.com', 55000, 'HR'),
('Juan', 'Dela Cruz', 'juan@email.com', 48000, 'Sales');
```

**This adds 3 employees at once!**

### 📝 Insert Without Specifying Columns

If you provide values for ALL columns (in order), you can skip the column names:

```sql
INSERT INTO employees 
VALUES (NULL, 'Patrick', 'Arlan', 'patrick@email.com', 50000, 'Engineering', '2024-01-15', TRUE, CURRENT_TIMESTAMP);
```

**`NULL` for id because `AUTO_INCREMENT` will handle it automatically.**

### 🎬 Real-World Example: Bulk Employee Data Entry

```sql
INSERT INTO employees (first_name, last_name, email, salary, department, hire_date)
VALUES 
('Patrick', 'Arlan', 'patrick@email.com', 55000, 'Engineering', '2024-01-15'),
('Maria', 'Santos', 'maria@email.com', 50000, 'HR', '2024-02-20'),
('Juan', 'Dela Cruz', 'juan@email.com', 48000, 'Sales', '2024-03-10'),
('Rosa', 'Garcia', 'rosa@email.com', 52000, 'Engineering', '2024-01-25'),
('Miguel', 'Lopez', 'miguel@email.com', 45000, 'IT', '2024-04-05');
```

---

## Lesson 3.4: SELECT — Retrieving Data

### 🧠 The Concept

SELECT is how you **ask questions** about the data. It's the most important SQL command.

### 📝 Select Everything

```sql
SELECT * FROM employees;
```

**Reading Like English:** "Select all columns from employees table"

**Output:** All rows and all columns

### 📝 Select Specific Columns

```sql
SELECT first_name, last_name, salary FROM employees;
```

**Reading Like English:** "Select first_name, last_name, salary from employees"

**Output:** Only those 3 columns

### 📝 SELECT with WHERE (Filtering)

```sql
SELECT * FROM employees WHERE salary > 50000;
```

**Reading Like English:** "Select all employees where salary is greater than 50000"

**Output:** Only employees earning more than $50,000

### 📝 WHERE Conditions

| Condition | Meaning | Example |
|-----------|---------|---------|
| `=` | Equals | `WHERE department = 'Engineering'` |
| `<>` or `!=` | Not equals | `WHERE department != 'Sales'` |
| `>` | Greater than | `WHERE salary > 50000` |
| `<` | Less than | `WHERE salary < 50000` |
| `>=` | Greater or equal | `WHERE salary >= 50000` |
| `<=` | Less or equal | `WHERE salary <= 50000` |
| `AND` | Both conditions true | `WHERE salary > 50000 AND department = 'Engineering'` |
| `OR` | At least one true | `WHERE department = 'HR' OR department = 'Sales'` |

### 📝 ORDER BY (Sorting)

```sql
SELECT * FROM employees ORDER BY salary DESC;
```

**Reading Like English:** "Select all employees, ordered by salary in descending order (highest first)"

```sql
SELECT * FROM employees ORDER BY salary ASC;
```

**ASC = Ascending (lowest first), DESC = Descending (highest first)**

### 📝 COUNT (Counting Rows)

```sql
SELECT COUNT(*) FROM employees;
```

**Output:** Total number of employees (5)

```sql
SELECT COUNT(*) FROM employees WHERE department = 'Engineering';
```

**Output:** Number of Engineering employees (2)

### 📝 LIMIT (Limiting Results)

```sql
SELECT * FROM employees LIMIT 3;
```

**Output:** First 3 employees only

### 🎬 Real-World Examples

**Example 1: Find high earners**
```sql
SELECT first_name, last_name, salary 
FROM employees 
WHERE salary > 50000 
ORDER BY salary DESC;
```

**Example 2: Count by department**
```sql
SELECT department, COUNT(*) as employee_count
FROM employees
GROUP BY department;
```

**Example 3: Get one specific employee**
```sql
SELECT * FROM employees WHERE id = 1;
```

---

## Lesson 3.5: UPDATE — Changing Data

### 🧠 The Concept

UPDATE is how you **modify existing data**.

**⚠️ WARNING:** Always use WHERE to specify which rows to update. Without WHERE, you update EVERYTHING!

### 📝 Update One Column

```sql
UPDATE employees SET salary = 55000 WHERE id = 1;
```

**Reading Like English:** "Update employees table, set salary to 55000 where id equals 1"

**Translation:** Patrick's salary becomes $55,000

### 📝 Update Multiple Columns

```sql
UPDATE employees 
SET salary = 60000, department = 'Management' 
WHERE id = 1;
```

**Reading Like English:** "Update employees, set salary to 60000 AND department to Management where id is 1"

### 📝 Update All Rows (CAREFUL!)

```sql
UPDATE employees SET salary = salary * 1.05;
```

**Reading Like English:** "Update all employees, multiply salary by 1.05 (5% raise for everyone)"

**⚠️ No WHERE clause = affects ALL employees!**

### 📝 Conditional Updates

```sql
UPDATE employees 
SET salary = salary * 1.10 
WHERE department = 'Engineering';
```

**Reading Like English:** "Give all Engineering employees a 10% raise"

### 📝 Update with Multiple Conditions

```sql
UPDATE employees 
SET salary = 52000 
WHERE department = 'Sales' AND id > 2;
```

**Reading Like English:** "Update employees in Sales department with id greater than 2, set salary to 52000"

### 🎬 Real-World Examples

**Example 1: Promotion with raise**
```sql
UPDATE employees 
SET department = 'Management', salary = 65000 
WHERE id = 1;
```

**Example 2: Department-wide raise**
```sql
UPDATE employees 
SET salary = salary * 1.08 
WHERE department = 'Engineering';
```

**Example 3: Fix an email**
```sql
UPDATE employees 
SET email = 'newemail@company.com' 
WHERE first_name = 'Patrick';
```

---

## Lesson 3.6: DELETE — Removing Data

### 🧠 The Concept

DELETE is how you **remove rows** from a table.

**⚠️ CRITICAL WARNING:** Always use WHERE! Without WHERE, you delete EVERYTHING!

### 📝 Delete One Row

```sql
DELETE FROM employees WHERE id = 5;
```

**Reading Like English:** "Delete from employees where id equals 5"

**Translation:** Employee #5 is gone

### 📝 Delete Multiple Rows

```sql
DELETE FROM employees WHERE department = 'Sales';
```

**Reading Like English:** "Delete all employees in Sales department"

### 📝 Delete Conditionally

```sql
DELETE FROM employees WHERE salary < 40000 AND department = 'IT';
```

**Reading Like English:** "Delete IT employees earning less than $40,000"

### 🎬 Real-World Examples

**Example 1: Remove one employee**
```sql
DELETE FROM employees WHERE id = 3;
```

**Example 2: Remove all inactive employees**
```sql
DELETE FROM employees WHERE is_active = FALSE;
```

**Example 3: Clean up old records**
```sql
DELETE FROM employees WHERE hire_date < '2024-01-01';
```

---

## 📝 COMPREHENSIVE ACTIVITIES

### Activity 1: CREATE TABLE

**Hint:** Use CREATE TABLE with appropriate data types and constraints (INT, VARCHAR, DECIMAL, NOT NULL, PRIMARY KEY, AUTO_INCREMENT).

**Task:**
1. Create a `departments` table with columns:
   - `id` (whole number, primary key, auto-increment)
   - `department_name` (text, max 50 chars, required)
   - `manager` (text, max 100 chars)

2. Create a `salaries` table with columns:
   - `id` (whole number, primary key, auto-increment)
   - `employee_id` (whole number)
   - `amount` (decimal with 2 decimal places)
   - `salary_date` (date)

**Expected Structure:**
```
departments: 3 columns (id, department_name, manager)
salaries: 4 columns (id, employee_id, amount, salary_date)
```

---

### Activity 2: INSERT Data

**Hint:** Use INSERT INTO with VALUES. You can add multiple rows at once using comma-separated value groups.

**Task:**
Insert 5 employees into the employees table with:
- Realistic names
- Different departments (Engineering, HR, Sales, IT, Management)
- Different salaries (40000-60000 range)
- Different emails

**Expected Output:** 5 rows added

---

### Activity 3: SELECT Queries

**Hint:** Use SELECT with WHERE for filtering, ORDER BY for sorting, COUNT(*) for counting.

**Task:**
Write queries to:
1. Select all employees
2. Select only names and salaries of employees earning more than 50000
3. Select all employees from Engineering department
4. Count total employees
5. Select employees ordered by salary (highest first)

**Expected Outputs:**
```
Query 1: All 5 employees
Query 2: Only high earners
Query 3: Only Engineering dept
Query 4: Number 5 (or whatever you inserted)
Query 5: List ordered by salary DESC
```

---

### Activity 4: UPDATE Data

**Hint:** Use UPDATE with SET to change values, and WHERE to specify which rows. Format: `UPDATE table SET column = value WHERE condition;`

**Task:**
1. Give employee with id=1 a 10% salary raise
2. Move employee "Maria" to 'HR' department
3. Update email of employee id=2

**Expected:** Values changed in database

---

### Activity 5: DELETE Data

**Hint:** Use DELETE FROM with WHERE to specify which rows to delete. BE CAREFUL - always use WHERE!

**Task:**
1. Delete employee with id = 5 (if you have one)
2. Delete all employees earning less than 40000
3. Show remaining employees

**Expected:** Some rows removed, others remain

---

## 🧠 Key Concepts Summary

| Command | Purpose | Example |
|---------|---------|---------|
| **CREATE TABLE** | Build table structure | `CREATE TABLE name (...)` |
| **INSERT** | Add new data | `INSERT INTO table VALUES (...)` |
| **SELECT** | Retrieve data | `SELECT * FROM table` |
| **WHERE** | Filter data | `WHERE column = value` |
| **ORDER BY** | Sort data | `ORDER BY column DESC` |
| **UPDATE** | Change data | `UPDATE table SET column = value` |
| **DELETE** | Remove data | `DELETE FROM table WHERE ...` |
| **COUNT** | Count rows | `SELECT COUNT(*) FROM table` |

---

## 💡 Common Mistakes to Avoid

1. **Forgetting WHERE in UPDATE/DELETE**
   - ❌ `UPDATE employees SET salary = 60000;` (changes ALL salaries!)
   - ✅ `UPDATE employees SET salary = 60000 WHERE id = 1;` (only one person)

2. **Wrong Data Type**
   - ❌ `email INT` (email should be VARCHAR)
   - ✅ `email VARCHAR(100)` (correct)

3. **Quotes Around Numbers**
   - ❌ `WHERE salary = '50000'` (works but wrong type)
   - ✅ `WHERE salary = 50000` (correct)

4. **Missing Column Name**
   - ❌ `INSERT INTO employees VALUES ('Patrick', ...);` (which column is first?)
   - ✅ `INSERT INTO employees (first_name, last_name, ...) VALUES ('Patrick', ...);` (clear)

5. **SELECT * instead of specific columns**
   - ❌ `SELECT * FROM employees;` (too much data)
   - ✅ `SELECT first_name, last_name, salary FROM employees;` (only what you need)

---

## 🎯 Next Steps

1. ✅ Complete all 5 activities
2. ✅ Test each SQL query in a database tool (MySQL Workbench or PhpMyAdmin)
3. ✅ Make sure you understand each command
4. ✅ Ready for Unit 4 (Java) when done

**You now understand how data is stored and managed!** 💪
