# Lesson 2.2: HTML Lists & Tables

*Lists and tables are fundamental for organizing data. Almost every website uses them. Let's learn to build them the right way.*

---

## Part 1: Unordered Lists (`<ul>` & `<li>`)

An **unordered list** shows items in bullet points (no particular order).

### Syntax:
```html
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```

### Output:
```
• Item 1
• Item 2
• Item 3
```

### Real Example:
```html
<h2>Skills I Want to Learn</h2>
<ul>
    <li>React & TypeScript</li>
    <li>C# & ASP.NET Core</li>
    <li>PostgreSQL & SQL</li>
    <li>Docker & DevOps</li>
    <li>Git & GitHub</li>
</ul>
```

**Key Points:**
- `<ul>` = **Unordered List** (bullet points)
- `<li>` = **List Item** (each bullet point)
- Use when order doesn't matter

---

## Part 2: Ordered Lists (`<ol>` & `<li>`)

An **ordered list** shows items numbered (order matters).

### Syntax:
```html
<ol>
    <li>First step</li>
    <li>Second step</li>
    <li>Third step</li>
</ol>
```

### Output:
```
1. First step
2. Second step
3. Third step
```

### Real Example:
```html
<h2>Steps to Build a Web App</h2>
<ol>
    <li>Design the database schema</li>
    <li>Build the backend API</li>
    <li>Build the frontend UI</li>
    <li>Connect frontend to backend</li>
    <li>Test everything</li>
    <li>Deploy to production</li>
</ol>
```

**Key Points:**
- `<ol>` = **Ordered List** (numbered)
- `<li>` = **List Item** (each item)
- Use when order matters (steps, rankings, etc.)

---

## Part 3: Nested Lists

You can put lists inside lists!

```html
<h2>Web Development Stack</h2>
<ul>
    <li>Frontend
        <ul>
            <li>React</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
        </ul>
    </li>
    <li>Backend
        <ul>
            <li>C#</li>
            <li>ASP.NET Core</li>
            <li>Entity Framework</li>
        </ul>
    </li>
    <li>Database
        <ul>
            <li>PostgreSQL</li>
            <li>SQL</li>
        </ul>
    </li>
</ul>
```

**Output:**
```
• Frontend
  ◦ React
  ◦ TypeScript
  ◦ Tailwind CSS
• Backend
  ◦ C#
  ◦ ASP.NET Core
  ◦ Entity Framework
• Database
  ◦ PostgreSQL
  ◦ SQL
```

---

## Part 4: HTML Tables

A **table** displays data in rows and columns.

### Basic Syntax:
```html
<table>
    <tr>
        <th>Column 1</th>
        <th>Column 2</th>
        <th>Column 3</th>
    </tr>
    <tr>
        <td>Data 1</td>
        <td>Data 2</td>
        <td>Data 3</td>
    </tr>
</table>
```

### Table Tags Explained:

| Tag | What It Does |
|-----|--------------|
| `<table>` | Container for the entire table |
| `<tr>` | **Table Row** — one horizontal line |
| `<th>` | **Table Header** — column label (bold by default) |
| `<td>` | **Table Data** — regular cell data |
| `<thead>` | Groups header rows (for organization) |
| `<tbody>` | Groups data rows (for organization) |
| `<tfoot>` | Groups footer rows (rarely used) |

### Table Header Alignment: The `scope` Attribute

By default, `<th>` headers align with `<td>` cells based on **position** (which column they're in). However, you can make this **explicit** using the `scope` attribute:

**`scope="col"`** — This header applies to the entire **column** below it:
```html
<th scope="col">Employee Name</th>
<th scope="col">Department</th>
```

**`scope="row"`** — This header applies to the entire **row** to the right of it:
```html
<th scope="row">Employee 1</th>
<td>Alice</td>
<td>Engineering</td>
```

**Why use `scope`?**
- ✅ Makes your code **explicit** and easier to understand
- ✅ Helps **screen readers** understand table structure (accessibility)
- ✅ Essential for **complex tables** with multiple headers
- ✅ Professional best practice

**Example with `scope`:**
```html
<table>
    <thead>
        <tr>
            <th scope="col">Employee ID</th>
            <th scope="col">Name</th>
            <th scope="col">Department</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>001</td>
            <td>Alice</td>
            <td>Engineering</td>
        </tr>
    </tbody>
</table>
```

---

## Part 5: Proper Table Structure

**The RIGHT way to build a table:**

```html
<table>
    <thead>
        <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
        </tr>
    </thead>
    
    <tbody>
        <tr>
            <td>001</td>
            <td>Alice Johnson</td>
            <td>Engineering</td>
            <td>Senior Developer</td>
        </tr>
        
        <tr>
            <td>002</td>
            <td>Bob Smith</td>
            <td>Sales</td>
            <td>Sales Manager</td>
        </tr>
        
        <tr>
            <td>003</td>
            <td>Carol White</td>
            <td>HR</td>
            <td>HR Specialist</td>
        </tr>
    </tbody>
</table>
```

### Output:

| Employee ID | Name | Department | Position |
|-------------|------|------------|----------|
| 001 | Alice Johnson | Engineering | Senior Developer |
| 002 | Bob Smith | Sales | Sales Manager |
| 003 | Carol White | HR | HR Specialist |

**Key Points:**
- ✅ Use `<thead>` for headers
- ✅ Use `<tbody>` for data
- ✅ Use `<th>` for header cells
- ✅ Use `<td>` for data cells
- ✅ Proper structure = easier to style and maintain

---

## Part 6: Table with Borders & Styling

By default, tables have no visible borders. Add styling:

```html
<style>
    table {
        border-collapse: collapse;
        width: 100%;
    }
    
    table, th, td {
        border: 1px solid black;
    }
    
    th {
        background-color: #4CAF50;
        color: white;
        padding: 10px;
    }
    
    td {
        padding: 10px;
    }
    
    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
</style>

<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>001</td>
            <td>Alice</td>
            <td>Engineering</td>
        </tr>
        <tr>
            <td>002</td>
            <td>Bob</td>
            <td>Sales</td>
        </tr>
    </tbody>
</table>
```

**This creates:**
- Visible borders
- Green header
- Alternating row colors
- Padding for spacing

---

## Part 7: Complex Table Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Employee Directory</title>
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #2c3e50; color: white; }
        tr:nth-child(even) { background-color: #ecf0f1; }
        tr:hover { background-color: #bdc3c7; }
    </style>
</head>
<body>
    <h1>Employee Directory</h1>
    
    <table>
        <thead>
            <tr>
                <th>Employee ID</th>
                <th>Full Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Hire Date</th>
            </tr>
        </thead>
        
        <tbody>
            <tr>
                <td>E001</td>
                <td>Alice Johnson</td>
                <td>Engineering</td>
                <td>Senior Developer</td>
                <td>2022-01-15</td>
            </tr>
            
            <tr>
                <td>E002</td>
                <td>Bob Smith</td>
                <td>Sales</td>
                <td>Sales Manager</td>
                <td>2021-06-20</td>
            </tr>
            
            <tr>
                <td>E003</td>
                <td>Carol White</td>
                <td>HR</td>
                <td>HR Specialist</td>
                <td>2023-03-10</td>
            </tr>
        </tbody>
    </table>
</body>
</html>
```

---

## 📋 Quick Reference (Cheat Sheet)

**Copy these templates and fill in your own content!**

### Unordered List (Bullets):
```html
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```

### Ordered List (Numbers):
```html
<ol>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
</ol>
```

### Simple Table:
```html
<table>
    <thead>
        <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Data 1</td>
            <td>Data 2</td>
            <td>Data 3</td>
        </tr>
        <tr>
            <td>Data 4</td>
            <td>Data 5</td>
            <td>Data 6</td>
        </tr>
    </tbody>
</table>
```

### Nested List (List inside a list):
```html
<ul>
    <li>Parent Item 1
        <ul>
            <li>Child Item 1</li>
            <li>Child Item 2</li>
        </ul>
    </li>
    <li>Parent Item 2</li>
</ul>
```

---

## 📝 Activities

### **Activity 1: Create `table.html`**

Create an HTML file with a table showing 4 employees:
- **Columns:** Employee ID, Name, Department, Position
- **Use `<thead>` and `<tbody>`** for proper structure
- **Add `scope="col"` to each `<th>` header** for semantic clarity and accessibility
- **Add 3 rows** of fake employee data

**Example Structure:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Employee Table</title>
</head>
<body>
    <h1>Employee Directory</h1>
    
    <table>
        <thead>
            <tr>
                <th scope="col">Employee ID</th>
                <th scope="col">Name</th>
                <th scope="col">Department</th>
                <th scope="col">Position</th>
            </tr>
        </thead>
        
        <tbody>
            <tr>
                <td>001</td>
                <td>Patrick Arlan</td>
                <td>Engineering</td>
                <td>Developer</td>
            </tr>
            
            <!-- Add 2 more rows here -->
        </tbody>
    </table>
</body>
</html>
```

---

### **Activity 2: Create a Bullet List**

Add a bullet list of **5 programming languages you want to learn**:

```html
<h2>Languages I Want to Learn</h2>
<ul>
    <li>JavaScript</li>
    <li>Python</li>
    <li><!-- Add 3 more --></li>
</ul>
```

---

### **Activity 3: Create a Numbered List**

Add a numbered list of **3 steps to start the HRIS project** (from memory, don't look at the docs!):

```html
<h2>Steps to Build HRIS</h2>
<ol>
    <li>Step 1</li>
    <li>Step 2</li>
    <li>Step 3</li>
</ol>
```

---

### **Activity 4: Combine Everything**

Create `PRACTICE/html/table.html` with:
1. A heading "HTML Lists & Tables Practice"
2. A **table** with 4 employee rows (using `scope="col"` on all `<th>` headers)
3. A **bullet list** of 5 programming languages
4. A **numbered list** of 3 HRIS steps
5. Use proper indentation and comments

---

### **Activity 5: Test in Browser**

1. Save `table.html`
2. Open it in your browser (double-click)
3. Verify:
   - [ ] Table displays correctly with all rows
   - [ ] Bullet list appears as bullets
   - [ ] Numbered list appears as numbers
   - [ ] All content is visible and readable
4. Take a screenshot

---

### **Activity 6: Reflection**

Answer these in `PRACTICE/LESSONS/LESSON_2/lesson_2_2_answer.md`:

1. **What is the difference between `<ul>` and `<ol>`?**
2. **Why do we use `<thead>` and `<tbody>` in tables?**
3. **What tag do you use for header cells in a table?** (`<th>` or `<td>`?)
4. **Can you nest a list inside another list?** (Yes/No and why?)
5. **When would you use a table vs a list?** (Example: when to use each)

---

## ✅ Checklist Before Moving On

- [ ] `table.html` created with proper structure
- [ ] Table has 4 columns and 3+ employee rows
- [ ] `<thead>` and `<tbody>` properly used
- [ ] All `<th>` headers have `scope="col"` attribute
- [ ] Bullet list with 5 languages added
- [ ] Numbered list with 3 HRIS steps added
- [ ] File tested in browser
- [ ] Screenshot taken
- [ ] Reflection questions answered

---

## 🎯 Key Takeaways

✅ **`<ul>` = unordered lists** (bullets)
✅ **`<ol>` = ordered lists** (numbers)
✅ **`<li>` = list items** (goes inside `<ul>` or `<ol>`)
✅ **`<table>` = data tables** (rows & columns)
✅ **`<thead>` + `<tbody>`** = organize table structure
✅ **`<th>` = header cells, `<td>` = data cells**
✅ **Proper structure** makes styling and maintenance easier

---

## Next: Lesson 2.3 — HTML Forms 🚀

Get ready to build login forms, registration forms, and learn about form validation!
