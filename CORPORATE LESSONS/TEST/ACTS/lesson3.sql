-- ============================================
-- UNIT 3: MYSQL FUNDAMENTALS - ACTIVITIES
-- ============================================
-- This file contains all SQL activities for Unit 3
-- Run each section in MySQL Workbench or PhpMyAdmin
-- ============================================

-- ============================================
-- ACTIVITY 1: CREATE TABLE
-- ============================================
-- TODO: Create a departments table with:
--       - id (INT, PRIMARY KEY, AUTO_INCREMENT)
--       - department_name (VARCHAR 50, NOT NULL)
--       - manager (VARCHAR 100)

-- YOUR CODE HERE:

-- ============================================
-- TODO: Create a salaries table with:
--       - id (INT, PRIMARY KEY, AUTO_INCREMENT)
--       - employee_id (INT)
--       - amount (DECIMAL 10,2)
--       - salary_date (DATE)

-- YOUR CODE HERE:

-- ============================================
-- TODO: Create an employees table (if not exists) with:
--       - id (INT, PRIMARY KEY, AUTO_INCREMENT)
--       - first_name (VARCHAR 50, NOT NULL)
--       - last_name (VARCHAR 50, NOT NULL)
--       - email (VARCHAR 100)
--       - salary (DECIMAL 10,2)
--       - department (VARCHAR 50)

-- YOUR CODE HERE:

-- ============================================
-- ACTIVITY 2: INSERT DATA
-- ============================================
-- TODO: Insert 5 employees into employees table
--       Include: first_name, last_name, email, salary, department
--       Use different departments: Engineering, HR, Sales, IT, Management
--       Salaries in range: 40000-60000

-- YOUR CODE HERE:

-- ============================================
-- ACTIVITY 3: SELECT QUERIES
-- ============================================

-- TODO 3.1: Select all employees
-- Hint: SELECT * FROM employees;

-- YOUR CODE HERE:

-- TODO 3.2: Select only names and salaries of employees earning > 50000
-- Hint: SELECT column1, column2 FROM table WHERE condition;

-- YOUR CODE HERE:

-- TODO 3.3: Select all employees from Engineering department
-- Hint: WHERE column = 'value'

-- YOUR CODE HERE:

-- TODO 3.4: Count total employees
-- Hint: SELECT COUNT(*) FROM table;

-- YOUR CODE HERE:

-- TODO 3.5: Select employees ordered by salary (highest first)
-- Hint: ORDER BY column DESC (DESC = descending, highest first)

-- YOUR CODE HERE:

-- ============================================
-- ACTIVITY 4: UPDATE DATA
-- ============================================

-- TODO 4.1: Give employee with id=1 a 10% salary raise
-- Hint: UPDATE table SET column = column * 1.10 WHERE id = 1;
-- Remember: 10% raise = multiply by 1.10

-- YOUR CODE HERE:

-- TODO 4.2: Move employee "Maria" to 'HR' department
-- Hint: UPDATE table SET department = 'HR' WHERE first_name = 'Maria';

-- YOUR CODE HERE:

-- TODO 4.3: Update email of employee id=2
-- Hint: UPDATE table SET email = 'newemail@example.com' WHERE id = 2;

-- YOUR CODE HERE:

-- ============================================
-- ACTIVITY 5: DELETE DATA
-- ============================================

-- TODO 5.1: Delete employee with id=5
-- Hint: DELETE FROM table WHERE id = 5;

-- YOUR CODE HERE:

-- TODO 5.2: Delete all employees earning less than 40000
-- Hint: DELETE FROM table WHERE salary < 40000;

-- YOUR CODE HERE:

-- TODO 5.3: Show remaining employees
-- Hint: SELECT * FROM employees;

-- YOUR CODE HERE:

-- ============================================
-- VERIFICATION QUERIES (Run these to check your work)
-- ============================================

-- Check all employees
SELECT * FROM employees;

-- Check employees count
SELECT COUNT(*) as total_employees FROM employees;

-- Check by department
SELECT department, COUNT(*) as count
FROM employees
GROUP BY
    department;

-- Check salary range
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary DESC;

-- ============================================
-- END OF ACTIVITIES
-- ============================================