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

### 📖 The Normal Forms — Definitions First

Before we look at examples, understand what each Normal Form (NF) is trying to solve. They are **levels of database cleanliness**, applied in order — you cannot skip levels.

---

#### 🔴 0NF — Unnormalized Form: "The Junk Drawer"

**Analogy:** Imagine a junk drawer in your kitchen where you throw everything — receipts, batteries, a pen, your old phone, chopsticks, rubber bands. It's all in one place, nothing is organized, and some bags have multiple items crammed inside them.

**That's 0NF.** One massive table where everything is thrown together.

**Signs you are in 0NF:**
- A cell contains multiple values separated by commas: `"PHP, Java, SQL"`
- The same person's name, phone, address repeats in 10 different rows
- There is no clear Primary Key to identify rows uniquely

**The problem:** You can't reliably find, update, or delete anything without risking breaking something else.

---

#### 🟡 1NF — First Normal Form: "One Thing Per Box"

**Analogy:** Think of a lunch box with compartments — rice in one compartment, viand in another, fruit in another. Each compartment holds exactly ONE type of thing. You would never cram your rice AND your fruit AND your drink all into one compartment.

**That's 1NF.** Each cell (compartment) holds exactly ONE piece of data.

**The Rule:**
1. **No comma-separated values in a single cell** — "PHP, Java" must become two separate rows
2. **Every row must have a unique identifier** (Primary Key) so the database knows which row is which

**Before 1NF ❌**
| EmpID | EmpName | Skills |
|-------|---------|--------|
| 1 | Patrick | PHP, Java, SQL |

*Problem: THREE skills are crammed into ONE cell. You can't search for "Java" employees without messy workarounds.*

**After 1NF ✅**
| EmpID | EmpName | Skill |
|-------|---------|-------|
| 1 | Patrick | PHP |
| 1 | Patrick | Java |
| 1 | Patrick | SQL |

*Fix: One skill per row. Now you can easily search for "Java" employees.*

**Key rule to memorize:** 👉 *"If you see a comma inside a cell, it's a 1NF violation. Always."*

---

#### 🟠 2NF — Second Normal Form: "Each Column Must Be About the WHOLE ID"

**Analogy:** Imagine you are filling out a school report card. The report card's main ID is `(Student_ID + Subject_ID)` — because one student can have grades in many subjects.

Now imagine someone puts the student's home address on the report card. Does the home address belong to the Student+Subject combination? **No!** The address is only about the Student. It doesn't care about which subject you're in.

**That's a 2NF violation** — a column that only describes PART of the ID (just the Student), not the WHOLE ID (Student + Subject).

**The Rule:**
- Must already be in 1NF
- Every column must describe the **ENTIRE** primary key — not just one part of it
- This only matters when the primary key is made of **two or more columns** (composite key)

**Before 2NF ❌** *(Primary Key = EmpID + ProjectID)*
| EmpID | ProjectID | EmpName | Department | ProjectDeadline |
|-------|-----------|---------|------------|-----------------|
| 1 | P1 | Patrick | IT | Dec 2026 |
| 1 | P2 | Patrick | IT | Mar 2027 |

*Problem: `EmpName` and `Department` only describe `EmpID`. They have nothing to do with `ProjectID`. So every time Patrick gets a new project, we repeat his name and department.*

**After 2NF ✅** — Split into focused tables:

**Employees Table** *(EmpID is the PK — EmpName belongs here)*
| EmpID | EmpName | Department |
|-------|---------|------------|
| 1 | Patrick | IT |

**Projects Table** *(ProjectID is the PK — Deadline belongs here)*
| ProjectID | ProjectDeadline |
|-----------|-----------------|
| P1 | Dec 2026 |
| P2 | Mar 2027 |

**Assignments Table** *(Links them together)*
| EmpID | ProjectID |
|-------|-----------|
| 1 | P1 |
| 1 | P2 |

**Key rule to memorize:** 👉 *"Ask each column: 'Are you describing the FULL primary key, or just part of it?' If it's only part — move it out."*

> 💡 **Shortcut:** If your table has only ONE primary key column (not two), it automatically passes 2NF. Skip straight to checking 3NF.

---

#### 🟢 3NF — Third Normal Form: "Columns Must Report to the ID, Not to Each Other"

**Analogy:** Imagine an office where all employees report directly to the CEO (Primary Key). That's clean.

Now imagine Employee A tells Employee B what to do, and Employee B tells Employee C — and the CEO doesn't directly manage B or C. That's a chain of command that bypasses the CEO. In database terms, that chain is called a **transitive dependency**, and it's a 3NF violation.

**The Rule:**
- Must already be in 2NF
- No column should be determined by (depend on) another non-key column
- Every column must describe ONLY the Primary Key, and NOTHING ELSE

**The Classic Sign:** Column A → Column B → Primary Key (chain of 2 steps = problem!)
*It should always be: Column → Primary Key directly (1 step only)*

**Before 3NF ❌**
| EmpID | EmpName | SalaryLevel | BaseSalary |
|-------|---------|-------------|------------|
| 1 | Patrick | Level 2 | 50000 |
| 2 | Maria | Level 3 | 75000 |
| 3 | Juan | Level 2 | 50000 |

*Problem: `BaseSalary` doesn't describe the `EmpID` directly. It describes the `SalaryLevel`. The chain is: `EmpID` → `SalaryLevel` → `BaseSalary`. That extra step is the transitive dependency!*

*Also notice Juan and Patrick both have Level 2 / 50000 — repeating data! If Level 2 salary changes, you have to update two rows.*

**After 3NF ✅** — Pull the chain apart:

**Employees Table**
| EmpID | EmpName | SalaryLevel |
|-------|---------|-------------|
| 1 | Patrick | Level 2 |
| 2 | Maria | Level 3 |
| 3 | Juan | Level 2 |

**Pay Scales Table** *(Now SalaryLevel → BaseSalary is its own table)*
| SalaryLevel | BaseSalary |
|-------------|------------|
| Level 2 | 50000 |
| Level 3 | 75000 |

*Fix: If Level 2 salary changes to 55000, update ONE row in Pay Scales. Done.*

**Key rule to memorize:** 👉 *"Ask each column: 'Am I describing the Primary Key, or am I describing another column?' If it's another column — move it out."*

---

### 📊 Quick NF Summary Table

| Normal Form | Analogy | The Rule | Key Question |
|-------------|---------|----------|--------------|
| **0NF** | Junk drawer | No rules at all | "Is this a complete mess?" |
| **1NF** | Lunch box compartments | One value per cell, every row has a unique ID | "Does any cell have more than one value?" |
| **2NF** | Report card (Student+Subject) | Every column describes the WHOLE primary key | "Does any column describe only PART of the primary key?" |
| **3NF** | CEO chain of command | Every column reports to the PK directly — no chains | "Does any column describe another column instead of the PK?" |

---

### 📝 The Problem: Unnormalized Table (0NF)

Imagine a company stores all its data in ONE giant table:

| OrderID | CustomerName | CustomerPhone | ItemName | ItemPrice | Department |
|---------|--------------|---------------|----------|-----------|------------|
| 1 | Patrick | 555-1234 | Laptop | 1000 | Engineering |
| 1 | Patrick | 555-1234 | Mouse | 50 | Engineering |
| 2 | Maria | 555-5678 | Keyboard | 80 | HR |

**Problems (Database Anomalies):**
When data is not normalized, you encounter three major problems, known as **Database Anomalies**:

1. **Insertion Anomaly (Can't Add Data):** You want to insert data, but you can't because another piece of data is missing. 
   *Example:* If a new department is created, but no employee is assigned yet, you can't add the department to this table because every row requires an employee!

2. **Deletion Anomaly (Accidental Loss):** You delete one thing, and accidentally lose something else entirely.
   *Example:* If we delete Patrick's only order, his phone number is deleted from the database entirely. We just lost our customer's contact info!

3. **Update Anomaly (Inconsistent Data):** You update data in one place, but forget to update it elsewhere.
   *Example:* Patrick gets a new phone number. You update it on his "Laptop" row, but forget to update his "Mouse" row. Now Patrick has two different phone numbers, and the database is broken.

This is exactly why we need Normalization — to eliminate these anomalies!

---

### 🎯 Deep Dive: The Employee_Department Anomalies (GeeksforGeeks Example)

Let's look at another classic example of an unnormalized table that suffers from all three anomalies.

**Before Normalization (The Messy Table):**

| Emp_ID | Emp_Name | Department | Dept_Location | Emp_Skills |
|--------|----------|------------|---------------|------------|
| 101 | Nick Wise | HR | London | Recruitment, Payroll |
| 102 | John Cader | Finance | Australia | Budgeting |
| 103 | Lily Case | HR | London | Recruitment |
| 104 | Ford Dawid | IT | Chicago | Programming, Testing |

**Why is this table bad?**
1. **Insertion Anomaly:** If the company creates a new "Marketing" department in "New York", but hasn't hired anyone yet, we **cannot** add the Marketing department to this database! The system requires an `Emp_ID` to save a row.
2. **Deletion Anomaly:** Ford Dawid (104) is the only person in the IT department. If Ford quits and we delete his row, we accidentally delete the fact that the IT department is located in Chicago!
3. **Update Anomaly:** If the HR department moves from London to Paris, we have to update multiple rows (Nick Wise AND Lily Case). If we update Nick but forget Lily, the database becomes inconsistent (HR is in two places at once).
4. **1NF Violation:** Nick and Ford have multiple skills separated by commas in the `Emp_Skills` column.

---

#### 🔍 STEP 1 — ANALYZE: Which Rules Are Violated?

Before touching anything, you scan the table and check each Normal Form rule one by one:

| Check | Question to Ask | Result for This Table |
|-------|----------------|-----------------------|
| **1NF** | Does any cell have more than one value (commas)? | ❌ YES — `Emp_Skills` has "Recruitment, Payroll" and "Programming, Testing" |
| **2NF** | Does any column depend on only PART of the primary key? | ❌ YES — `Dept_Location` depends on `Department`, not on `Emp_ID` |
| **3NF** | Does any column depend on another non-key column? | ❌ YES — `Dept_Location` is determined by `Department` (not the primary key directly) |

**Conclusion:** This table violates ALL three — 1NF, 2NF, and 3NF. We must fix them all.

---

#### 📋 STEP 2 — PLAN: What Tables Will We Create?

Now that we know the violations, we plan how to split the table:

| Problem Found | Solution |
|--------------|---------|
| `Emp_Skills` has comma values (1NF) | Move Skills into its own table: **Employee_Skills** (one row per skill) |
| `Department` + `Dept_Location` repeat for every employee (2NF/3NF) | Move Department data into its own table: **Department** |
| Employees still need to know their department (link needed) | Add a `Dept_ID` column to the Employee table as a Foreign Key |

**Plan: Create 3 tables**
- **Employee** — stores each person's ID, name, and their department reference (`Dept_ID`)
- **Department** — stores each department's ID, name, and location
- **Employee_Skills** — stores each skill on its own row, linked by `Emp_ID`

---

#### ⚙️ STEP 3 — EXECUTE: Build the Normalized Tables

**1. Employee Table** *(only employee-specific data, with a link to Department)*
| Emp_ID | Emp_Name | Dept_ID |
|--------|----------|---------|
| 101 | Nick Wise | D1 |
| 102 | John Cader | D2 |
| 103 | Lily Case | D1 |
| 104 | Ford Dawid | D3 |

**2. Department Table** *(department-specific data only)*
| Dept_ID | Department | Dept_Location |
|---------|------------|---------------|
| D1 | HR | London |
| D2 | Finance | Australia |
| D3 | IT | Chicago |

*(Insertion Anomaly fixed! We can now add `D4 | Marketing | New York` even with zero employees!)*
*(Deletion Anomaly fixed! If Ford quits, IT's location stays safe in this table!)*
*(Update Anomaly fixed! If HR moves to Paris, we update ONE row here — done!)*

**3. Employee Skills Table** *(one skill per row — 1NF fixed!)*
| Emp_ID | Emp_Skills |
|--------|------------|
| 101 | Recruitment |
| 101 | Payroll |
| 102 | Budgeting |
| 103 | Recruitment |
| 104 | Programming |
| 104 | Testing |

*(No more commas! Every cell holds exactly one value!)*

> ✅ **Result:** Three clean tables, all anomalies eliminated, all Normal Form rules satisfied.

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

### 🎯 Exam-Style 1NF Example (This is what appeared in the actual exam!)

You are given a table with employees, but some columns contain **two values separated by a comma** inside a single cell. This is a **1NF violation**.

**The Problematic Table (what you'd see in the exam):**

| EmpID | EmpName | PhoneNumbers | Skills |
|-------|---------|--------------|--------|
| 1 | Patrick | 555-1234, 555-9999 | PHP, Java |
| 2 | Maria | 555-5678 | SQL |
| 3 | Juan | 555-1111, 555-2222 | Java, Python |

**Violations spotted:**
- `PhoneNumbers` — Patrick has TWO phone numbers in one cell
- `PhoneNumbers` — Juan has TWO phone numbers in one cell
- `Skills` — Patrick has TWO skills in one cell
- `Skills` — Juan has TWO skills in one cell

> ⚠️ **Rule:** One cell = One value. Always. No commas separating multiple values in a single cell.

**How to fix it — apply 1NF:**

Split each multi-value cell into its own row. The employee info repeats, but each cell now holds exactly ONE value.

**Fixed Employees Table (1NF compliant):**

| EmpID | EmpName | Phone |
|-------|---------|-------|
| 1 | Patrick | 555-1234 |
| 1 | Patrick | 555-9999 |
| 2 | Maria | 555-5678 |
| 3 | Juan | 555-1111 |
| 3 | Juan | 555-2222 |

**Fixed Skills Table (1NF compliant):**

| EmpID | Skill |
|-------|-------|
| 1 | PHP |
| 1 | Java |
| 2 | SQL |
| 3 | Java |
| 3 | Python |

**Why split Skills into a separate table?**
Because an employee can have many skills and a skill can belong to many employees. Keeping them together would create more repetition.

> 💡 **Exam tip:** When you see a column with "value1, value2" in a cell — that is ALWAYS a 1NF violation. The fix is always: split into multiple rows (or a separate table), one value per row.

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

### 🎯 Exam-Style 2NF Example
You are given a table tracking which employees are assigned to which projects, and the department the employee belongs to. The Primary Key is a combination of `(EmpID, ProjectID)`.

| EmpID | ProjectID | EmpName | Department | ProjectName |
|-------|-----------|---------|------------|-------------|
| 1 | P1 | Patrick | IT | Website |
| 1 | P2 | Patrick | IT | Mobile App |
| 2 | P1 | Maria | HR | Website |

**Violations spotted:**
- `EmpName` and `Department` depend ONLY on `EmpID`, not on the `ProjectID`. 
- Every time Patrick is assigned to a new project, we have to type out his name and department again (Partial Dependency).

**How to fix it — apply 2NF:**
Split into tables where columns depend on the WHOLE primary key.

**Employees Table:**
| EmpID | EmpName | Department |
|-------|---------|------------|
| 1 | Patrick | IT |
| 2 | Maria | HR |

**Projects Table:**
| ProjectID | ProjectName |
|-----------|-------------|
| P1 | Website |
| P2 | Mobile App |

**Assignments Table (The link between them):**
| EmpID | ProjectID |
|-------|-----------|
| 1 | P1 |
| 1 | P2 |
| 2 | P1 |

> 💡 **Exam tip:** If a table uses two IDs as its primary key (like EmpID + ProjectID), but a column only describes ONE of those IDs (like EmpName only describing EmpID), it's a 2NF violation!

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

### 🎯 Exam-Style 3NF Example
You are given a table tracking employee payroll. The Primary Key is `EmpID`.

| EmpID | EmpName | JobTitle | SalaryLevel | BaseSalary |
|-------|---------|----------|-------------|------------|
| 1 | Patrick | Developer | Level 2 | 50000 |
| 2 | Maria | Manager | Level 3 | 75000 |
| 3 | Juan | Tester | Level 2 | 50000 |

**Violations spotted:**
- `BaseSalary` depends on the `SalaryLevel`, not directly on the `EmpID`.
- If Patrick gets promoted to Level 3, we have to manually update his BaseSalary to 75000. If we forget, he's a Level 3 making Level 2 money (Update Anomaly!).

**How to fix it — apply 3NF:**
Move the transitive dependency into its own table.

**Employees Table:**
| EmpID | EmpName | JobTitle | SalaryLevel |
|-------|---------|----------|-------------|
| 1 | Patrick | Developer | Level 2 |
| 2 | Maria | Manager | Level 3 |
| 3 | Juan | Tester | Level 2 |

**Pay Scales Table:**
| SalaryLevel | BaseSalary |
|-------------|------------|
| Level 2 | 50000 |
| Level 3 | 75000 |

> 💡 **Exam tip:** If Column A determines Column B, but neither are the Primary Key, it's a 3NF violation (called a transitive dependency). Split them out!

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

### 💡 How Far Should You Normalize? (When to Stop)

This is a great real-world question. More tables does NOT always mean a better database. Here is the honest answer:

**The general rule in most companies: Stop at 3NF.**

3NF eliminates virtually all practical data problems. Going further (4NF, 5NF...) exists in theory, but most real applications never need it, and it makes the database harder to work with.

---

### ⚠️ The Danger of Over-Normalization

Yes — you CAN split a database too much. This is called **over-normalization**, and it creates its own problems:

| Problem | What It Means |
|---------|---------------|
| **Too many JOINs** | Every query needs 5–10 JOINs just to get basic data. Queries become slow and hard to write. |
| **Harder to read** | Even simple reports become complex queries that are difficult for any developer to understand. |
| **Slower performance** | The more tables you JOIN together, the longer the database takes to respond. |

**Example of over-normalization:**
Splitting a person's `first_name` and `last_name` into their own separate table is extreme and pointless. They always appear together, they belong together.

---

### ✅ The Checklist: Should You Normalize This?

Before splitting data into a new table, ask yourself these questions:

| Question | If YES → | If NO → |
|----------|----------|---------|
| Does this data repeat in multiple rows? | Normalize it (move it to its own table) | Leave it where it is |
| Will this data be updated independently? | Normalize it | Leave it where it is |
| Does this cell contain multiple values (commas)? | Normalize it (1NF violation!) | Leave it where it is |
| Do I need to look up this data separately? | Normalize it | Leave it where it is |
| Is this data tiny and always tied to one record? | Leave it where it is | — |

---

### 📌 Real-World Guidance

Think of it like organizing your room:
- **Under-normalized (messy):** Everything thrown on the floor — hard to find things, messy to maintain.
- **Properly normalized (3NF):** A shelf for books, a drawer for clothes, a box for cables — organized and easy to update.
- **Over-normalized:** Every single shirt in its own labeled box, every shoe in its own drawer, every page of a book in its own folder — technically organized, but insane to use.

**Practical guidelines that most developers follow:**

1. **Always reach 1NF** — Never allow commas in a cell. No exceptions.
2. **Always reach 2NF** — If a column doesn't describe the primary key, move it to its own table.
3. **Reach 3NF for important, frequently-changing data** (e.g., Department location, Employee salary grade, Product prices).
4. **Stop at 3NF for data that rarely changes or is always tied to one record** (e.g., a person's birthday, a product's creation date).
5. **Never split atomic values** — Don't separate `first_name` and `last_name` into different tables. That is too far.

> 💡 **Summary:** Normalize to remove real problems (repeating data, anomalies). Stop when splitting would create more complexity than it solves. **3NF is almost always the sweet spot.**

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
