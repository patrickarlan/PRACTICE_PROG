# 🟠 UNIT 3: MYSQL FUNDAMENTALS - QUICK START GUIDE

## 📚 Files Created

1. **lesson_3_mysql_fundamentals.md** - Complete lesson with:
   - ✅ 6 core SQL concepts (Basics, CREATE, INSERT, SELECT, UPDATE, DELETE)
   - ✅ Simple analogies (filing cabinet, spreadsheet, filing system)
   - ✅ Real-world examples for each concept
   - ✅ 5 practice activities with HINTS ONLY (no answers shown)

2. **lesson3.sql** - SQL activity template with:
   - ✅ Commented TODO sections for all 5 activities
   - ✅ Hints in the comments
   - ✅ Verification queries at the end
   - ✅ Ready to paste into MySQL

---

## 🎯 The 5 Activities (Exam-Ready)

| # | Activity | Focus | Difficulty |
|---|----------|-------|-----------|
| 1 | CREATE TABLE | Table structure & data types | ⭐ Basic |
| 2 | INSERT | Adding data | ⭐ Basic |
| 3 | SELECT | Querying & filtering | ⭐⭐ Medium |
| 4 | UPDATE | Modifying data | ⭐⭐ Medium |
| 5 | DELETE | Removing data | ⭐⭐ Medium |

---

## 🚀 How to Get Started

### Step 1: Read the Lesson
- Open `lesson_3_mysql_fundamentals.md`
- Read each section (Basics, CREATE, INSERT, SELECT, UPDATE, DELETE)
- Study the examples and analogies
- **Understand the WHY, not just the syntax**

### Step 2: Understand the Hints
Hints guide without spoiling:
- ✅ "Use WHERE to filter data" - helpful hint
- ✅ "Syntax: `DELETE FROM table WHERE condition`" - good hint
- ❌ Showing complete working code - that's an answer!

### Step 3: Write SQL in lesson3.sql
- Open `TEST/ACTS/lesson3.sql` in MySQL Workbench or PhpMyAdmin
- Find Activity 1
- Replace the TODO with your SQL code
- Run it (Ctrl+Enter or click Execute)
- Check if it worked
- Move to Activity 2

### Step 4: Test & Verify
- Run the verification queries at the bottom
- Make sure your data is correct
- If something fails, re-read the lesson example

---

## 💡 Important Tips

### Before Writing SQL
1. Read the lesson for that command
2. Study the example provided
3. Understand what you're trying to DO
4. THEN write your code

### SQL Best Practices
1. **Always use WHERE in UPDATE/DELETE** - Without WHERE, you change EVERYTHING
2. **Use specific column names** - Don't use SELECT * unless you need all columns
3. **Test with small data first** - Make sure queries work before running on big tables
4. **Comments are helpful** - Use `--` for notes

### Tools to Use
- **MySQL Workbench** - Professional tool (free download)
- **PhpMyAdmin** - Web-based, easier for beginners
- **Online SQL Editor** - SQLiteonline.com for quick testing

---

## 🔑 Quick Reference: The 6 Commands

### 1. CREATE TABLE
```sql
CREATE TABLE name (
    id INT PRIMARY KEY AUTO_INCREMENT,
    column_name DATA_TYPE CONSTRAINT
);
```

### 2. INSERT
```sql
INSERT INTO table (col1, col2, col3) 
VALUES ('val1', val2, 'val3');
```

### 3. SELECT
```sql
SELECT * FROM table;
SELECT col1, col2 FROM table;
SELECT * FROM table WHERE condition;
SELECT * FROM table ORDER BY column DESC;
SELECT COUNT(*) FROM table;
```

### 4. UPDATE
```sql
UPDATE table SET column = value WHERE condition;
-- WARNING: Always use WHERE!
```

### 5. DELETE
```sql
DELETE FROM table WHERE condition;
-- WARNING: Always use WHERE!
```

### 6. Data Types
- `INT` - whole numbers
- `VARCHAR(n)` - text (max n chars)
- `DECIMAL(10,2)` - decimals
- `DATE` - dates
- `BOOLEAN` - true/false

---

## ❓ Stuck? Debug Process

1. **Read the error message** - MySQL tells you what's wrong
2. **Check syntax** - Missing semicolons, quotes, parentheses?
3. **Re-read the example** - How did the lesson do it?
4. **Start simple** - Test with basic query first
5. **Add complexity** - Then add WHERE, ORDER BY, etc.

### Common Errors
- `Syntax error` → Missing semicolon or typo
- `Unknown column` → Column name doesn't exist
- `Unknown table` → Table not created yet
- `Incorrect number of values` → Too many/few values in INSERT

---

## 📊 SQL vs English

| English | SQL | Notes |
|---------|-----|-------|
| "Show me everyone" | SELECT * FROM employees; | * means all columns |
| "Show names and salaries" | SELECT name, salary FROM employees; | Comma separates columns |
| "Show Engineering people" | SELECT * FROM employees WHERE dept='Engineering'; | WHERE filters |
| "Show in salary order" | SELECT * FROM employees ORDER BY salary; | ORDER BY sorts |
| "How many employees?" | SELECT COUNT(*) FROM employees; | COUNT(*) counts rows |
| "Add Patrick" | INSERT INTO employees VALUES (...); | VALUES provides data |
| "Change Patrick's salary" | UPDATE employees SET salary=60000 WHERE name='Patrick'; | SET changes, WHERE specifies which |
| "Remove Patrick" | DELETE FROM employees WHERE name='Patrick'; | DELETE removes |

---

## 🎓 Learning Goals

After Unit 3, you should be able to:
- ✅ Design a table structure with appropriate data types
- ✅ Add data to a database using INSERT
- ✅ Retrieve data using SELECT with filters
- ✅ Modify existing data with UPDATE
- ✅ Remove data with DELETE
- ✅ Write complex queries with WHERE, ORDER BY, COUNT

---

## 📋 Activity Checklist

- [ ] Read Lesson 3.1 (Basics)
- [ ] Complete Activity 1: CREATE TABLE
- [ ] Read Lesson 3.2 (CREATE TABLE)
- [ ] Complete Activity 2: INSERT
- [ ] Read Lesson 3.3 (INSERT)
- [ ] Read Lesson 3.4 (SELECT)
- [ ] Complete Activity 3: SELECT Queries
- [ ] Read Lesson 3.5 (UPDATE)
- [ ] Complete Activity 4: UPDATE
- [ ] Read Lesson 3.6 (DELETE)
- [ ] Complete Activity 5: DELETE
- [ ] Run verification queries ✅

---

## 🔗 Files Location
- **Lesson:** `lesson_3_mysql_fundamentals.md`
- **Activities:** `TEST/ACTS/lesson3.sql`

---

**Ready to master databases? Start with the lesson!** 🚀

---

## 🎯 Exam Tips for Unit 3

1. **Read queries carefully** - Know what "SELECT" vs "INSERT" vs "UPDATE" means
2. **Always identify the WHERE** - Check if the query has the right filter
3. **Test your logic** - "Delete where salary < 40000" - is that who you mean to delete?
4. **SQL is English-like** - Translate to English first, then write SQL
5. **Common exam questions:**
   - "Write a query to show all X"
   - "Create a table with Y columns"
   - "Update X to be Y where Z"
   - "Delete X where Y condition"

These 5 activities cover ALL of those!
