# 📝 LESSON 3 CHEAT SHEET: SQLite & Databases
## Quick Reference Guide for Terminal/CMD

---

## 1️⃣ OPENING & CLOSING DATABASE

### Open Database from PowerShell/Terminal
```powershell
# Navigate to your folder
cd "c:\Users\HP\Documents\PRACTICE_PROG\CORPORATE LESSONS\TEST"

# Open/create database
sqlite3 lesson3.db

# You'll see:
# SQLite version 3.x.x
# Enter ".help" for usage hints.
# sqlite>
```

### Exit Database
```sql
.exit
```
or
```sql
.quit
```

---

## 2️⃣ HELPFUL DOT COMMANDS (.commands)

These start with a dot and give you info about the database.

| Command | Purpose | Example |
|---------|---------|---------|
| `.tables` | List all tables | `sqlite> .tables` |
| `.schema` | Show all table structures | `sqlite> .schema` |
| `.schema tableName` | Show specific table structure | `sqlite> .schema employees` |
| `.headers on` | Show column names in output | `sqlite> .headers on` |
| `.headers off` | Hide column names | `sqlite> .headers off` |
| `.mode column` | Better column formatting | `sqlite> .mode column` |
| `.mode list` | Default list format | `sqlite> .mode list` |
| `.mode csv` | CSV format output | `sqlite> .mode csv` |
| `.help` | Show all dot commands | `sqlite> .help` |
| `.exit` | Exit database | `sqlite> .exit` |
| `.read file.sql` | Run SQL from file | `sqlite> .read lesson3.sql` |
| `.dump` | Export entire database | `sqlite> .dump` |
| `.output file.txt` | Save output to file | `sqlite> .output results.txt` |
| `.output stdout` | Return output to screen | `sqlite> .output stdout` |

---

## 3️⃣ FORMATTING YOUR OUTPUT

### Best Practice: Format at Start
```sql
.mode column
.headers on
```

### Before and After
**Without formatting:**
```
1|Patrick|Engineering|50000
2|Maria|HR|45000
```

**With formatting:**
```
id  name     department   salary
--  -------  -----------  -------
1   Patrick  Engineering  50000
2   Maria    HR           45000
```

---

## 4️⃣ CREATE TABLE

### Basic Syntax
```sql
CREATE TABLE tableName (
    column1 datatype,
    column2 datatype,
    column3 datatype
);
```

### Example: Employees Table
```sql
CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT,
    department TEXT,
    salary DECIMAL
);
```

### Example: With More Options
```sql
CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    department TEXT,
    salary DECIMAL(10,2),
    hire_date TEXT
);
```

### Data Types
| Type | Use For |
|------|---------|
| `INTEGER` | Whole numbers (1, 25, 1000) |
| `DECIMAL(10,2)` | Decimals (50000.50) |
| `REAL` | Floating point numbers |
| `TEXT` | Text/strings ("Patrick") |
| `VARCHAR(100)` | Text with max length |
| `DATE` | Dates (2026-05-31) |
| `BOOLEAN` | True/False (0 or 1) |

### Column Constraints
| Constraint | Meaning |
|-----------|---------|
| `PRIMARY KEY` | Unique identifier |
| `NOT NULL` | Required (can't be empty) |
| `AUTOINCREMENT` | Auto increment ID |
| `DEFAULT value` | Default value if not provided |
| `UNIQUE` | Each value must be unique |

---

## 5️⃣ INSERT DATA

### Basic Insert
```sql
INSERT INTO tableName (col1, col2, col3)
VALUES (value1, value2, value3);
```

### Example
```sql
INSERT INTO employees (id, name, department, salary)
VALUES (1, 'Patrick', 'Engineering', 50000);
```

### Insert Multiple Rows
```sql
INSERT INTO employees VALUES
(1, 'Patrick', 'Engineering', 50000),
(2, 'Maria', 'HR', 45000),
(3, 'Juan', 'Engineering', 52000);
```

### Insert Without Specifying ID (Auto-increment)
```sql
INSERT INTO employees (name, department, salary)
VALUES ('Rosa', 'Sales', 48000);
```

---

## 6️⃣ SELECT (VIEW) DATA

### Get Everything
```sql
SELECT * FROM employees;
```

### Get Specific Columns
```sql
SELECT name, salary FROM employees;
```

### With WHERE Filter
```sql
-- Get one employee
SELECT * FROM employees WHERE id = 1;

-- Get by name
SELECT * FROM employees WHERE name = 'Patrick';

-- Get by condition
SELECT * FROM employees WHERE salary > 50000;

-- Get multiple conditions (AND)
SELECT * FROM employees WHERE department = 'Engineering' AND salary > 45000;

-- Get multiple conditions (OR)
SELECT * FROM employees WHERE department = 'Engineering' OR department = 'HR';
```

### Order Results
```sql
-- Ascending (smallest first)
SELECT * FROM employees ORDER BY salary ASC;

-- Descending (largest first)
SELECT * FROM employees ORDER BY salary DESC;
```

### Limit Results
```sql
-- Get first 5 rows
SELECT * FROM employees LIMIT 5;

-- Get rows 3-7
SELECT * FROM employees LIMIT 5 OFFSET 2;
```

### Count Rows
```sql
SELECT COUNT(*) FROM employees;
```

### Calculate Total
```sql
SELECT SUM(salary) FROM employees;
SELECT AVG(salary) FROM employees;
SELECT MAX(salary) FROM employees;
SELECT MIN(salary) FROM employees;
```

---

## 7️⃣ UPDATE DATA

### Basic Update
```sql
UPDATE tableName SET column = value WHERE condition;
```

### Example
```sql
-- Update one person's salary
UPDATE employees SET salary = 52000 WHERE id = 1;

-- Update all Engineering salaries
UPDATE employees SET salary = 55000 WHERE department = 'Engineering';

-- Update multiple columns
UPDATE employees SET salary = 52000, department = 'IT' WHERE id = 1;
```

### ⚠️ IMPORTANT: Always use WHERE!
```sql
-- ❌ WRONG - Updates ALL rows!
UPDATE employees SET salary = 60000;

-- ✅ RIGHT - Updates only Patrick
UPDATE employees SET salary = 60000 WHERE id = 1;
```

---

## 8️⃣ DELETE DATA

### Delete Specific Row
```sql
DELETE FROM tableName WHERE condition;
```

### Example
```sql
-- Delete one employee
DELETE FROM employees WHERE id = 1;

-- Delete all HR employees
DELETE FROM employees WHERE department = 'HR';
```

### ⚠️ IMPORTANT: Always use WHERE!
```sql
-- ❌ WRONG - Deletes ALL rows!
DELETE FROM employees;

-- ✅ RIGHT - Deletes only Maria
DELETE FROM employees WHERE name = 'Maria';
```

---

## 🔟 ALTER TABLE (Modifying Table Structure)

### Add a New Column
```sql
ALTER TABLE employees
ADD COLUMN phone VARCHAR(20);
```

### Remove a Column
```sql
ALTER TABLE employees
DROP COLUMN phone;
```

### Change Data Type
```sql
ALTER TABLE employees
MODIFY COLUMN salary DECIMAL(12, 2);
```

### Rename a Column
```sql
ALTER TABLE employees
CHANGE COLUMN created_at hire_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
```

### Add Constraints
```sql
-- Make column required
ALTER TABLE employees
MODIFY COLUMN email VARCHAR(100) NOT NULL;

-- Add UNIQUE constraint
ALTER TABLE employees
ADD CONSTRAINT unique_email UNIQUE (email);

-- Add DEFAULT value
ALTER TABLE employees
MODIFY COLUMN department VARCHAR(50) DEFAULT 'Unassigned';
```

---

## 🔆 DROP TABLE

### Delete Entire Table
```sql
DROP TABLE employees;
```

⚠️ **This deletes the entire table - cannot undo!**

---

## 1️⃣1️⃣ RUNNING SQL FROM A FILE

### Option 1: Run File from PowerShell
```powershell
# In PowerShell (not in sqlite3)
sqlite3 lesson3.db < lesson3.sql

# Or
sqlite3 lesson3.db < C:\path\to\file.sql
```

### Option 2: Run File Inside SQLite
```sql
sqlite> .read lesson3.sql
```

### Create lesson3.sql File
Create a file with your SQL:
```sql
CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT,
    department TEXT,
    salary DECIMAL
);

INSERT INTO employees VALUES (1, 'Patrick', 'Engineering', 50000);
INSERT INTO employees VALUES (2, 'Maria', 'HR', 45000);

SELECT * FROM employees;
```

Then run it:
```powershell
sqlite3 lesson3.db < lesson3.sql
```

---

## 🔑 COMMON PATTERNS

### Pattern 1: Create Table + Insert Data
```sql
CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT,
    salary DECIMAL
);

INSERT INTO employees VALUES (1, 'Patrick', 50000);
INSERT INTO employees VALUES (2, 'Maria', 45000);

SELECT * FROM employees;
```

### Pattern 2: Filter + Calculate
```sql
-- Get total salary for Engineering
SELECT SUM(salary) FROM employees WHERE department = 'Engineering';

-- Get highest paid employee
SELECT * FROM employees ORDER BY salary DESC LIMIT 1;

-- Get average salary by department
SELECT department, AVG(salary) FROM employees GROUP BY department;
```

### Pattern 3: Update + Verify
```sql
-- Make change
UPDATE employees SET salary = 52000 WHERE id = 1;

-- Verify change
SELECT * FROM employees WHERE id = 1;
```

### Pattern 4: Delete + Check
```sql
-- Before delete, check who you're deleting
SELECT * FROM employees WHERE id = 1;

-- Delete
DELETE FROM employees WHERE id = 1;

-- Verify deleted
SELECT COUNT(*) FROM employees;
```

---

## 📊 WHERE CONDITIONS CHEAT SHEET

| Operator | Meaning | Example |
|----------|---------|---------|
| `=` | Equals | `WHERE id = 1` |
| `!=` or `<>` | Not equals | `WHERE name != 'Patrick'` |
| `>` | Greater than | `WHERE salary > 50000` |
| `<` | Less than | `WHERE salary < 45000` |
| `>=` | Greater or equal | `WHERE salary >= 50000` |
| `<=` | Less or equal | `WHERE salary <= 50000` |
| `BETWEEN` | Between range | `WHERE salary BETWEEN 45000 AND 55000` |
| `IN` | In list | `WHERE department IN ('HR', 'IT')` |
| `LIKE` | Pattern match | `WHERE name LIKE 'Pat%'` |
| `AND` | Both true | `WHERE dept = 'IT' AND salary > 50000` |
| `OR` | Either true | `WHERE dept = 'HR' OR dept = 'IT'` |
| `NOT` | Reverse | `WHERE NOT dept = 'HR'` |

---

## 🎯 STEP-BY-STEP TERMINAL WORKFLOW

### 1. Open Terminal
```powershell
# PowerShell
cd "c:\Users\HP\Documents\PRACTICE_PROG\CORPORATE LESSONS\TEST"
```

### 2. Open Database
```powershell
sqlite3 lesson3.db
```

### 3. Format Output
```sql
.mode column
.headers on
```

### 4. View Tables
```sql
.tables
```

### 5. View Table Structure
```sql
.schema employees
```

### 6. Run Your SQL
```sql
CREATE TABLE employees (...);
INSERT INTO employees VALUES (...);
SELECT * FROM employees;
```

### 7. Exit
```sql
.exit
```

---

## 🚨 COMMON MISTAKES

### ❌ Mistake 1: No Semicolon
```sql
-- WRONG
SELECT * FROM employees

-- RIGHT
SELECT * FROM employees;
```

### ❌ Mistake 2: Single Quotes for Strings
```sql
-- Sometimes wrong (double quotes for column names)
SELECT "name" FROM employees;

-- RIGHT (single quotes for text values)
SELECT * FROM employees WHERE name = 'Patrick';
```

### ❌ Mistake 3: UPDATE/DELETE Without WHERE
```sql
-- ❌ WRONG - Updates all rows!
UPDATE employees SET salary = 60000;

-- ✅ RIGHT
UPDATE employees SET salary = 60000 WHERE id = 1;
```

### ❌ Mistake 4: Wrong Table Name
```sql
-- WRONG (typo)
SELECT * FROM employes;

-- RIGHT
SELECT * FROM employees;
```

### ❌ Mistake 5: Missing Parentheses in CREATE
```sql
-- WRONG
CREATE TABLE employees
id INTEGER PRIMARY KEY,
name TEXT;

-- RIGHT
CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT
);
```

---

## 💾 USEFUL TERMINAL COMMANDS (PowerShell)

| Command | Purpose |
|---------|---------|
| `dir` | List files in folder |
| `ls` | List files (alternate) |
| `cd foldername` | Change directory |
| `cd ..` | Go up one folder |
| `pwd` | Show current path |
| `sqlite3 --version` | Check SQLite version |
| `sqlite3 db.db` | Open database |
| `cls` | Clear screen |

---

## 🎯 EXAM QUICK TIPS

**Q: How do I open a database?**
```powershell
sqlite3 lesson3.db
```

**Q: How do I create a table?**
```sql
CREATE TABLE tableName (column1 type, column2 type);
```

**Q: How do I add data?**
```sql
INSERT INTO tableName VALUES (value1, value2);
```

**Q: How do I see data?**
```sql
SELECT * FROM tableName;
```

**Q: How do I change data?**
```sql
UPDATE tableName SET column = value WHERE condition;
```

**Q: How do I delete data?**
```sql
DELETE FROM tableName WHERE condition;
```

**Q: How do I format output nicely?**
```sql
.mode column
.headers on
```

**Q: How do I run a SQL file?**
```powershell
sqlite3 lesson3.db < lesson3.sql
```

---

**You're ready for Unit 3! Open terminal and start practicing! 🚀**
