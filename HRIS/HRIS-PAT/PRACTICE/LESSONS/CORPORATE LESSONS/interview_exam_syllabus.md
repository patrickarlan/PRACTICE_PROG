# 💼 Interview Exam Preparation Syllabus
**Company:** Sandman Software Systems Inc (Quezon City)  
**Exam Date:** This Wednesday, 1:00 PM  
**Duration:** Intensive crash course  
**Focus:** Basic Programming Logic, PHP, MySQL, Java Fundamentals

---

## 📌 How This Works
- We learn **one concept at a time**
- You **read code like English sentences** (Professor's Method)
- **Activities are practical** — write code, see results immediately
- **No memorization** — understand the logic, patterns will follow

---

## 🟢 UNIT 1: BASIC PROGRAMMING LOGIC (Foundation for All 3 Languages)
*Before learning PHP, MySQL, and Java, you need to think like a programmer. Logic transcends languages.*

---

### Lesson 1.1: Variables & Data Types — Storing Information

**The Concept (English):**
"A variable is a container that holds a value. Like a box labeled 'name' that contains 'Patrick'."

**PHP:**
```php
$name = "Patrick";      // Container labeled '$name' holds the text "Patrick"
$age = 25;              // Container labeled '$age' holds the number 25
$isFull = true;         // Container labeled '$isFull' holds true or false
$salary = 50000.50;     // Container labeled '$salary' holds a decimal number
```

**Reading Like English:**
- Line 1: "Create a variable named name, and put the text Patrick inside it"
- Line 2: "Create a variable named age, and put the number 25 inside it"
- Line 3: "Create a variable named isFull, and put the boolean value true inside it"

**MySQL:**
```sql
CREATE TABLE employees (
    id INT,                    -- Integer container
    name VARCHAR(100),         -- Text container (max 100 characters)
    salary DECIMAL(10, 2),     -- Decimal number container
    is_active BOOLEAN          -- True/False container
);
```

**Reading Like English:**
- "Create a table called employees with 4 columns"
- "Column 1: id, holds whole numbers"
- "Column 2: name, holds text up to 100 characters"
- "Column 3: salary, holds decimal numbers"
- "Column 4: is_active, holds true or false"

**Java:**
```java
String name = "Patrick";       // Text variable
int age = 25;                  // Whole number variable
boolean isFull = true;         // True/false variable
double salary = 50000.50;      // Decimal number variable
```

**Reading Like English:**
- Line 1: "Create a String variable called name containing Patrick"
- Line 2: "Create an int (whole number) variable called age containing 25"
- Line 3: "Create a boolean variable called isFull containing true"
- Line 4: "Create a double (decimal) variable called salary containing 50000.50"

**Key Insight:** All languages have the same data types (text, number, true/false), just different syntax.

---

### Lesson 1.2: Basic Operations — Math & Logic

**PHP:**
```php
$x = 10;
$y = 5;
$sum = $x + $y;         // 10 + 5 = 15
$difference = $x - $y;  // 10 - 5 = 5
$product = $x * $y;     // 10 * 5 = 50
$quotient = $x / $y;    // 10 / 5 = 2
$remainder = $x % $y;   // 10 % 5 = 0 (modulo: remainder after division)
```

**Reading Like English:**
- "Add 10 and 5, result is 15"
- "Subtract 5 from 10, result is 5"
- "Multiply 10 by 5, result is 50"
- "Divide 10 by 5, result is 2"
- "Find remainder when 10 divided by 5, result is 0"

**Java:**
```java
int x = 10;
int y = 5;
int sum = x + y;        // 15
int product = x * y;    // 50
int remainder = x % y;  // 0
```

**MySQL:**
```sql
SELECT 10 + 5;          -- Result: 15
SELECT 10 * 5;          -- Result: 50
SELECT 10 % 5;          -- Result: 0
```

---

### Lesson 1.3: Conditionals (if/else) — Making Decisions

**The Logic:**
"If something is true, do action A. Otherwise, do action B."

**PHP:**
```php
$age = 25;

if ($age >= 18) {
    echo "You are an adult";        // Execute this if age is 18 or more
} else {
    echo "You are a minor";         // Execute this if age is less than 18
}
// Output: "You are an adult"
```

**Reading Like English:**
- "If age is greater than or equal to 18"
- "Then print 'You are an adult'"
- "Otherwise print 'You are a minor'"
- Since age is 25, it prints 'You are an adult'

**Java:**
```java
int age = 25;

if (age >= 18) {
    System.out.println("You are an adult");
} else {
    System.out.println("You are a minor");
}
// Output: You are an adult
```

**MySQL (in queries):**
```sql
SELECT name, age, 
    CASE 
        WHEN age >= 18 THEN 'Adult'
        ELSE 'Minor'
    END AS status
FROM employees;
-- Returns the status based on age
```

**Real-World Example:**
```php
$salary = 50000;
$department = "Engineering";

if ($department == "Engineering" && $salary > 45000) {
    echo "Eligible for bonus";
} else {
    echo "Not eligible";
}
// Output: "Eligible for bonus"
```

**Reading Like English:**
- "If department equals Engineering AND salary is greater than 45000"
- "Then print 'Eligible for bonus'"
- "Otherwise print 'Not eligible'"
- Since both conditions are true, prints "Eligible for bonus"

---

### Lesson 1.4: Loops — Repeating Actions

**The Logic:**
"Do this action multiple times until a condition is false."

**PHP - For Loop (when you know how many times):**
```php
for ($i = 1; $i <= 5; $i++) {
    echo $i . "\n";  // Print 1, then 2, then 3, etc.
}
// Output:
// 1
// 2
// 3
// 4
// 5
```

**Reading Like English:**
- "Start with i equals 1"
- "While i is less than or equal to 5"
- "Print i, then increase i by 1"
- "Keep repeating until i is greater than 5"

**PHP - While Loop (when you don't know how many times):**
```php
$count = 0;
while ($count < 5) {
    echo $count . "\n";
    $count++;  // Increase by 1
}
// Output: 0 1 2 3 4
```

**Reading Like English:**
- "While count is less than 5"
- "Print count"
- "Increase count by 1"
- "Keep repeating"

**Java:**
```java
for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}
// Output: 1 2 3 4 5

int count = 0;
while (count < 5) {
    System.out.println(count);
    count++;
}
// Output: 0 1 2 3 4
```

**MySQL - No traditional loops, but same idea:**
```sql
-- Simulates 5 rows
SELECT 1 AS number UNION ALL
SELECT 2 UNION ALL
SELECT 3 UNION ALL
SELECT 4 UNION ALL
SELECT 5;
-- Result: 1, 2, 3, 4, 5
```

---

### Lesson 1.5: Arrays/Collections — Storing Multiple Items

**PHP:**
```php
$employees = array("Patrick", "Maria", "Juan", "Rosa");
echo $employees[0];  // Patrick (first item, index starts at 0)
echo $employees[1];  // Maria
echo $employees[2];  // Juan

// Loop through array
foreach ($employees as $name) {
    echo $name . "\n";
}
// Output: Patrick Maria Juan Rosa (each on new line)
```

**Reading Like English:**
- "Create an array called employees with 4 names"
- "Item at position 0 is Patrick"
- "Item at position 1 is Maria"
- "For each name in the employees array, print the name"

**Java:**
```java
String[] employees = {"Patrick", "Maria", "Juan", "Rosa"};
System.out.println(employees[0]);  // Patrick

for (String name : employees) {
    System.out.println(name);
}
// Output: Patrick Maria Juan Rosa
```

**MySQL:**
```sql
SELECT id, name FROM employees WHERE name IN ('Patrick', 'Maria', 'Juan', 'Rosa');
-- Returns all 4 employees
```

---

### Lesson 1.6: Functions — Reusable Logic Blocks

**PHP:**
```php
function greet($name) {
    return "Hello, " . $name . "!";
}

echo greet("Patrick");  // Hello, Patrick!
echo greet("Maria");    // Hello, Maria!
```

**Reading Like English:**
- "Create a function called greet that takes a name parameter"
- "It returns the text 'Hello, ' plus the name plus '!'"
- "Call greet with 'Patrick', get back 'Hello, Patrick!'"
- "Call greet with 'Maria', get back 'Hello, Maria!'"

**Java:**
```java
public static String greet(String name) {
    return "Hello, " + name + "!";
}

System.out.println(greet("Patrick"));  // Hello, Patrick!
System.out.println(greet("Maria"));    // Hello, Maria!
```

**MySQL (stored procedures - functions in databases):**
```sql
CREATE FUNCTION greet(name VARCHAR(100))
RETURNS VARCHAR(200)
BEGIN
    RETURN CONCAT('Hello, ', name, '!');
END;

SELECT greet('Patrick');  -- Hello, Patrick!
```

---

**📝 Activities for Unit 1:**

1. **Variables & Data Types:**
   - Create variables for: your name, age, monthly salary, is_active (true/false)
   - Write in PHP, Java, and MySQL syntax

2. **Conditionals:**
   - Write an if/else: "If salary > 50000, print 'High earner', else print 'Regular earner'"
   - Do this in PHP and Java

3. **Loops:**
   - Print numbers 1 to 10 using a for loop in PHP
   - Print numbers 1 to 10 using a while loop in Java

4. **Arrays:**
   - Create an array of 5 department names in PHP
   - Loop through and print each one

5. **Functions:**
   - Create a function that takes two numbers and returns their sum
   - Test it with PHP and Java

---

## 🔵 UNIT 2: PHP FUNDAMENTALS (Server-Side Web Language)

### Lesson 2.1: PHP Basics — What is PHP?

**The Concept:**
PHP runs on the server. When someone visits your website, the server runs PHP code and sends the result to the browser.

```
Browser → Request → Server runs PHP code → Response (HTML) → Browser displays it
```

**PHP Syntax (Basic):**
```php
<?php
    // Everything between <?php and ?> is PHP code
    echo "Hello World";
    // echo = print output to the browser
?>
```

**Reading Like English:**
- "Start PHP code block"
- "Output the text 'Hello World' to the browser"
- "End PHP code block"

---

### Lesson 2.2: PHP Variables & Echo (Output)

```php
<?php
    $name = "Patrick";
    $age = 25;
    $department = "Engineering";
    
    echo "My name is " . $name;
    echo "I am " . $age . " years old";
    echo "I work in " . $department;
    
    // Modern way (string interpolation):
    echo "I am $age years old and work in $department";
?>
```

**Reading Like English:**
- "Create variable name = Patrick"
- "Create variable age = 25"
- "Output 'My name is ' concatenated with the value of $name"
- "The . symbol joins strings together"
- "In double quotes, PHP automatically replaces $age with its value"

---

### Lesson 2.3: PHP Functions

```php
<?php
    function calculateBonus($salary) {
        $bonus = $salary * 0.10;  // 10% of salary
        return $bonus;
    }
    
    $employeeSalary = 50000;
    $bonus = calculateBonus($employeeSalary);
    
    echo "Salary: $employeeSalary";
    echo "Bonus: $bonus";
    echo "Total: " . ($employeeSalary + $bonus);
?>
```

**Reading Like English:**
- "Create a function called calculateBonus that takes salary as input"
- "Calculate bonus as 10% of salary"
- "Return the bonus value"
- "Create variable employeeSalary = 50000"
- "Call calculateBonus with 50000, store result in bonus"
- "Output salary, bonus, and total"

---

### Lesson 2.4: PHP Arrays & Loops

```php
<?php
    $employees = array(
        "Patrick",
        "Maria",
        "Juan",
        "Rosa"
    );
    
    foreach ($employees as $emp) {
        echo "Employee: " . $emp . "\n";
    }
    
    // Associative array (key-value pairs)
    $employee = array(
        "name" => "Patrick",
        "age" => 25,
        "department" => "Engineering"
    );
    
    echo "Name: " . $employee["name"];
    echo "Department: " . $employee["department"];
?>
```

**Reading Like English:**
- "Create an array of employee names"
- "For each employee in the array, print 'Employee: ' and their name"
- "Create an associative array with key-value pairs"
- "Access the value using the key: $employee['name'] gives 'Patrick'"

---

### Lesson 2.5: PHP & HTML (Working with Web Forms)

```html
<form method="POST" action="process.php">
    <input type="text" name="name" placeholder="Enter name">
    <input type="email" name="email" placeholder="Enter email">
    <button type="submit">Submit</button>
</form>
```

**PHP receives the form data:**
```php
<?php
    if ($_POST) {  // If form was submitted
        $name = $_POST["name"];      // Get name from form
        $email = $_POST["email"];    // Get email from form
        
        echo "Thank you " . $name;
        echo "We received your email: " . $email;
    }
?>
```

**Reading Like English:**
- "If POST request was made (form submitted)"
- "Get the value from the form field named 'name' and store in $name"
- "Get the value from the form field named 'email' and store in $email"
- "Output confirmation message"

---

**📝 Activities for PHP:**

1. **Create output:**
   - Write a PHP script that creates 3 variables (name, position, department) and outputs them

2. **Create a function:**
   - Write a PHP function that calculates salary after 15% tax deduction
   - Test with salary = 50000

3. **Loop through array:**
   - Create an array of 5 job titles
   - Loop through and output each one with "Position: [title]"

4. **Associative array:**
   - Create an employee object with keys: id, name, email, phone
   - Output each value

5. **Form processing (challenge):**
   - Create an HTML form with name and age inputs
   - Create PHP that receives them and outputs "Hello [name], you are [age] years old"

---

## 🟠 UNIT 3: MYSQL FUNDAMENTALS (Database Language)

### Lesson 3.1: MySQL Basics — What is MySQL?

**The Concept:**
MySQL is a database — it stores data in organized tables (like Excel spreadsheets). You use SQL to query (ask questions) the database.

**Table Example:**
```
employees table:
┌────┬─────────┬─────────────┬──────────────┐
│ id │  name   │   email     │   salary     │
├────┼─────────┼─────────────┼──────────────┤
│ 1  │ Patrick │ p@email.com │ 50000        │
│ 2  │ Maria   │ m@email.com │ 55000        │
│ 3  │ Juan    │ j@email.com │ 48000        │
└────┴─────────┴─────────────┴──────────────┘
```

---

### Lesson 3.2: CREATE TABLE (Creating Structure)

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    salary DECIMAL(10, 2),
    department VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Reading Like English:**
- "Create a table called employees"
- "Column id: whole number, primary key (unique identifier), auto-increment (auto-numbered)"
- "Column name: text up to 100 characters, NOT NULL (required, cannot be empty)"
- "Column email: text up to 100 characters"
- "Column salary: decimal number with 10 digits total, 2 decimal places"
- "Column department: text up to 50 characters"
- "Column created_at: timestamp, default value is current timestamp"

---

### Lesson 3.3: INSERT (Adding Data)

```sql
INSERT INTO employees (name, email, salary, department)
VALUES ('Patrick', 'p@email.com', 50000, 'Engineering');

INSERT INTO employees (name, email, salary, department)
VALUES ('Maria', 'm@email.com', 55000, 'HR');

INSERT INTO employees (name, email, salary, department)
VALUES ('Juan', 'j@email.com', 48000, 'Marketing');
```

**Reading Like English:**
- "Insert into employees table, columns: name, email, salary, department"
- "Add values: Patrick, p@email.com, 50000, Engineering"
- "Insert another row with Maria's data"
- "Insert another row with Juan's data"

---

### Lesson 3.4: SELECT (Retrieving Data)

```sql
-- Get all employees
SELECT * FROM employees;

-- Get specific columns
SELECT name, email, salary FROM employees;

-- Get employees earning more than 50000
SELECT name, salary FROM employees WHERE salary > 50000;

-- Get employees in Engineering department
SELECT * FROM employees WHERE department = 'Engineering';

-- Get employees sorted by salary (highest first)
SELECT name, salary FROM employees ORDER BY salary DESC;

-- Get count of employees
SELECT COUNT(*) FROM employees;
```

**Reading Like English:**
- "Select all columns from employees table"
- "Select name, email, salary columns from employees"
- "Select name and salary where salary is greater than 50000"
- "Select all where department equals 'Engineering'"
- "Select ordered by salary in descending order (highest first)"
- "Count total rows in employees table"

---

### Lesson 3.5: UPDATE (Changing Data)

```sql
-- Update Patrick's salary
UPDATE employees
SET salary = 55000
WHERE name = 'Patrick';

-- Update multiple employees' department
UPDATE employees
SET department = 'Engineering'
WHERE name = 'Maria' OR name = 'Juan';

-- Give everyone a 5% raise
UPDATE employees
SET salary = salary * 1.05;
```

**Reading Like English:**
- "Update employees table, set salary to 55000 where name is Patrick"
- "Update employees, set department to Engineering where name is Maria or Juan"
- "Update all employees, multiply their salary by 1.05 (5% increase)"

---

### Lesson 3.6: DELETE (Removing Data)

```sql
-- Delete Patrick's record
DELETE FROM employees
WHERE name = 'Patrick';

-- Delete all employees from Marketing
DELETE FROM employees
WHERE department = 'Marketing';
```

**Reading Like English:**
- "Delete from employees where name equals Patrick"
- "Delete from employees where department equals Marketing"

---

**📝 Activities for MySQL:**

1. **CREATE TABLE:**
   - Create a `departments` table with id, department_name, manager
   - Create a `salaries` table with id, employee_id, amount, date

2. **INSERT:**
   - Insert 5 employees with different departments and salaries

3. **SELECT queries:**
   - Select all employees
   - Select only names earning more than 50000
   - Select all from Engineering department
   - Count total employees

4. **UPDATE:**
   - Give Patrick a 10% salary raise
   - Move Maria to 'HR' department

5. **DELETE:**
   - Delete an employee with id = 5

---

## 🔴 UNIT 4: JAVA FUNDAMENTALS (Object-Oriented Language)

### Lesson 4.1: Java Basics — Structure & Syntax

**The Concept:**
Java is compiled (converted to machine code before running). It's stricter about types and organization than PHP.

```java
public class Employee {
    public static void main(String[] args) {
        System.out.println("Hello World");
        
        String name = "Patrick";
        int age = 25;
        double salary = 50000.50;
        
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Salary: " + salary);
    }
}
```

**Reading Like English:**
- "Create a public class called Employee"
- "Inside, create a main method (entry point)"
- "Print 'Hello World' to console"
- "Create String variable name = Patrick"
- "Create int variable age = 25"
- "Create double variable salary = 50000.50"
- "Print each variable with its label"

---

### Lesson 4.2: Java Variables & Data Types

```java
String name = "Patrick";           // Text
int age = 25;                      // Whole number
double salary = 50000.50;          // Decimal number
boolean isActive = true;           // True/False
char grade = 'A';                  // Single character

// Output them
System.out.println(name);
System.out.println(age);
System.out.println(salary);
```

**Reading Like English:**
- "Create String variable name with value Patrick"
- "Create int variable age with value 25"
- "Create double variable salary with decimal value"
- "Create boolean variable isActive with value true"
- "Create char variable grade with value A"
- "Print each one to the console"

---

### Lesson 4.3: Java Conditionals

```java
int salary = 50000;

if (salary > 50000) {
    System.out.println("High earner");
} else if (salary == 50000) {
    System.out.println("Exactly 50000");
} else {
    System.out.println("Below 50000");
}
// Output: Exactly 50000

// Switch statement
String department = "Engineering";

switch (department) {
    case "Engineering":
        System.out.println("Tech department");
        break;
    case "HR":
        System.out.println("Human Resources");
        break;
    case "Sales":
        System.out.println("Sales department");
        break;
    default:
        System.out.println("Unknown department");
}
// Output: Tech department
```

**Reading Like English:**
- "If salary is greater than 50000, print 'High earner'"
- "Else if salary equals 50000, print 'Exactly 50000'"
- "Else print 'Below 50000'"
- "Since salary is 50000, print 'Exactly 50000'"

---

### Lesson 4.4: Java Loops

```java
// For loop
for (int i = 1; i <= 5; i++) {
    System.out.println("Count: " + i);
}
// Output: Count: 1 through Count: 5

// While loop
int count = 0;
while (count < 5) {
    System.out.println("Count: " + count);
    count++;
}
// Output: Count: 0 through Count: 4

// For-each loop (iterating arrays)
String[] employees = {"Patrick", "Maria", "Juan"};
for (String emp : employees) {
    System.out.println("Employee: " + emp);
}
// Output: Employee: Patrick, Maria, Juan
```

**Reading Like English:**
- "For i starting at 1, while i is less than or equal to 5, increase i by 1"
- "For each iteration, print 'Count: ' and i"
- "While count is less than 5, print count, then increase count"
- "For each employee in employees array, print 'Employee: ' and name"

---

### Lesson 4.5: Java Functions (Methods)

```java
public class Calculator {
    
    // Method that calculates bonus
    public static double calculateBonus(double salary) {
        double bonus = salary * 0.10;  // 10% of salary
        return bonus;
    }
    
    // Method that prints employee info
    public static void printEmployee(String name, String department) {
        System.out.println("Name: " + name);
        System.out.println("Department: " + department);
    }
    
    public static void main(String[] args) {
        double salary = 50000;
        double bonus = calculateBonus(salary);
        
        System.out.println("Salary: " + salary);
        System.out.println("Bonus: " + bonus);
        System.out.println("Total: " + (salary + bonus));
        
        printEmployee("Patrick", "Engineering");
    }
}
```

**Reading Like English:**
- "Create a public static method calculateBonus that takes salary as parameter"
- "Calculate bonus as 10% of salary"
- "Return the bonus value"
- "Create a public static method printEmployee that takes name and department"
- "Print the name and department"
- "In main, call calculateBonus with 50000"
- "Print salary, bonus, and total"
- "Call printEmployee with Patrick and Engineering"

---

### Lesson 4.6: Java Arrays & Collections

```java
// Simple array
String[] employees = {"Patrick", "Maria", "Juan", "Rosa"};
System.out.println(employees[0]);  // Patrick

// Loop through array
for (String emp : employees) {
    System.out.println(emp);
}

// ArrayList (dynamic array - grows as needed)
import java.util.ArrayList;

ArrayList<String> teamMembers = new ArrayList<>();
teamMembers.add("Patrick");
teamMembers.add("Maria");
teamMembers.add("Juan");

System.out.println(teamMembers.get(0));  // Patrick
System.out.println(teamMembers.size());  // 3

for (String member : teamMembers) {
    System.out.println(member);
}
```

**Reading Like English:**
- "Create an array of employees with 4 names"
- "Get the first employee (index 0): Patrick"
- "For each employee in the array, print it"
- "Create an ArrayList of Strings called teamMembers"
- "Add Patrick, Maria, Juan to the list"
- "Get first member: Patrick"
- "Get size of list: 3"
- "Print each member"

---

**📝 Activities for Java:**

1. **Basic output:**
   - Create Employee class with main method
   - Create variables: name, age, salary, department
   - Print all of them

2. **Conditionals:**
   - Create a program that checks if salary > 50000
   - Output "High earner" or "Regular earner"

3. **Loops:**
   - Print numbers 1 to 10 using for loop
   - Print only even numbers using while loop

4. **Arrays:**
   - Create array of 5 job titles
   - Loop through and print each one

5. **Functions:**
   - Create method calculateTax(salary) that returns 15% of salary
   - Create method greet(name) that returns "Hello, [name]!"
   - Test both methods

6. **Challenge:**
   - Create Employee class with properties: id, name, salary
   - Create method giveRaise(percentage) that increases salary
   - Create array of 3 employees
   - Give each a 5% raise and print new salaries

---

## 🎯 EXAM STRATEGY & TIPS

**What the Exam Likely Tests:**

1. **Basic Logic** (40%)
   - If/else conditions
   - Loops (for, while)
   - Array iteration
   - Function/method creation

2. **PHP** (30%)
   - Variables and output
   - Conditionals
   - Loops
   - Working with arrays
   - Basic form processing

3. **MySQL** (15%)
   - CREATE TABLE
   - INSERT
   - SELECT with WHERE
   - Basic UPDATE/DELETE

4. **Java** (15%)
   - Variables and types
   - Conditionals
   - Loops
   - Simple methods

**Problem-Solving Approach:**

1. **Read the problem slowly** — break it into steps
2. **Identify the logic** — what needs to happen?
3. **Choose the right tool** — PHP for server, MySQL for data, Java for logic
4. **Code like you're writing English** — use the Professor's Method
5. **Test your code** — run it, see if output matches expectation

**Time Management (1 hour exam assumed):**
- 5 min: Read all problems
- 45 min: Code solutions (prioritize easier ones)
- 10 min: Review and test

---

---

## 🔧 UNIT 5: DEBUGGING & TROUBLESHOOTING (Critical Exam Skill)
*Most programming exams include debugging questions: "Find the error and fix it" or "Why doesn't this code work?" This unit teaches you to think like a detective.*

---

### Lesson 5.1: Common PHP Errors & How to Find Them

#### Error Type 1: Syntax Errors (Code Won't Run)

**Bad Code:**
```php
<?php
    $name = "Patrick"  // Missing semicolon!
    echo $name;
?>
```

**Error Message:**
```
Parse error: syntax error, unexpected 'echo' in file.php on line 3
```

**Reading Like English:**
- "There's a syntax problem on line 3"
- "The echo keyword is unexpected because the previous line isn't properly finished"
- "Fix: Add semicolon at end of line 2"

**Fixed Code:**
```php
<?php
    $name = "Patrick";  // Semicolon added
    echo $name;
?>
```

#### Error Type 2: Undefined Variable (Using a Variable That Doesn't Exist)

**Bad Code:**
```php
<?php
    echo $name;  // $name was never created!
?>
```

**Error Message:**
```
Notice: Undefined variable: name in file.php on line 2
Output: (blank)
```

**How to Debug:**
- Check if the variable is spelled correctly
- Check if the variable was created before being used
- Check if the variable is in the correct scope

**Fixed Code:**
```php
<?php
    $name = "Patrick";  // Create variable first
    echo $name;         // Then use it
?>
```

#### Error Type 3: Type Mismatch (Wrong Data Type)

**Bad Code:**
```php
<?php
    $age = "twenty-five";  // String instead of number
    $result = $age + 5;
    echo $result;  // What happens?
?>
```

**Output:**
```
25  // PHP tries to convert string to number, succeeds partially
```

**How to Debug:**
- Check what data type each variable should be
- Use `var_dump()` to see actual types

**Fixed Code:**
```php
<?php
    $age = 25;  // Use number, not string
    $result = $age + 5;
    echo $result;  // Output: 30
?>
```

#### Error Type 4: Logic Error (Code Runs But Wrong Result)

**Bad Code:**
```php
<?php
    $salary = 50000;
    
    if ($salary > 60000) {
        echo "You get a bonus";
    }
    // Outputs nothing, but Patrick has 50000, so this is correct!
?>
```

**The Problem:**
- Code runs without errors, but the logic is wrong
- Patrick should get a bonus, but the condition checks > 60000, not >= 50000

**How to Debug:**
- Read the logic in plain English
- Test with different inputs
- Use `echo` to print intermediate values

**Fixed Code:**
```php
<?php
    $salary = 50000;
    
    if ($salary >= 50000) {  // Changed condition
        echo "You get a bonus";  // Now outputs
    }
?>
```

#### Error Type 5: Array Index Out of Bounds

**Bad Code:**
```php
<?php
    $employees = array("Patrick", "Maria");
    echo $employees[5];  // Index 5 doesn't exist!
?>
```

**Error:**
```
Notice: Undefined offset: 5
Output: (blank)
```

**How to Debug:**
- Check array length with `count()`
- Check valid indices (usually 0 to count-1)

**Fixed Code:**
```php
<?php
    $employees = array("Patrick", "Maria");
    
    if (isset($employees[1])) {  // Check if index exists
        echo $employees[1];  // Output: Maria
    }
?>
```

#### Debugging Tool: var_dump()

```php
<?php
    $name = "Patrick";
    $age = 25;
    $salary = 50000.50;
    
    var_dump($name);    // Shows: string(7) "Patrick"
    var_dump($age);     // Shows: int(25)
    var_dump($salary);  // Shows: float(50000.5)
?>
```

**Reading Like English:**
- "var_dump shows the type and value of a variable"
- "Use it when you're confused about what a variable contains"

---

### Lesson 5.2: Common MySQL Errors & How to Find Them

#### Error Type 1: Syntax Errors (Invalid SQL)

**Bad Code:**
```sql
SELECT * FROM employees WHERE id = 1;  -- Missing semicolon (required in MySQL)
```

**Error Message:**
```
Error: You have an error in your SQL syntax
```

**Fixed Code:**
```sql
SELECT * FROM employees WHERE id = 1;
```

#### Error Type 2: Table or Column Doesn't Exist

**Bad Code:**
```sql
SELECT name, emaiL FROM employees;  -- Column 'emaiL' doesn't exist (should be 'email')
```

**Error Message:**
```
Error: Unknown column 'emaiL' in 'field list'
```

**Fixed Code:**
```sql
SELECT name, email FROM employees;  -- Correct column name
```

#### Error Type 3: Wrong Data Type in WHERE Clause

**Bad Code:**
```sql
SELECT * FROM employees WHERE name = 25;  -- name is text, comparing to number
```

**Result:**
```
Empty result (no match because "Patrick" ≠ 25)
```

**Fixed Code:**
```sql
SELECT * FROM employees WHERE id = 25;  -- Compare number to number
```

#### Error Type 4: Missing WHERE (Accidental Update/Delete All)

**Bad Code:**
```sql
UPDATE employees SET salary = 60000;  -- No WHERE clause!
-- This updates ALL employees' salary to 60000!
```

**Fixed Code:**
```sql
UPDATE employees SET salary = 60000 WHERE id = 1;  -- Update only Patrick
```

#### Error Type 5: Logic Error in JOIN

**Bad Code:**
```sql
SELECT employees.name, departments.name
FROM employees
JOIN departments ON employees.id = departments.id;  -- Wrong join condition!
```

**Problem:**
- This tries to match employee IDs with department IDs (they'll never match)
- Should match employee department_id with department id

**Fixed Code:**
```sql
SELECT employees.name, departments.name
FROM employees
JOIN departments ON employees.department_id = departments.id;
```

#### Debugging Tool: Check Row Count

```sql
SELECT COUNT(*) FROM employees;  -- How many rows total?
-- Result: 3

SELECT COUNT(*) FROM employees WHERE salary > 50000;  -- How many earn more than 50000?
-- Result: 1

SELECT * FROM employees ORDER BY id DESC LIMIT 1;  -- Show the last added employee
```

---

### Lesson 5.3: Common Java Errors & How to Find Them

#### Error Type 1: Syntax Errors (Code Won't Compile)

**Bad Code:**
```java
public class Employee {
    public static void main(String[] args) {
        String name = "Patrick"  // Missing semicolon
        System.out.println(name);
    }
}
```

**Error Message:**
```
error: ';' expected at line 4
```

**Fixed Code:**
```java
public class Employee {
    public static void main(String[] args) {
        String name = "Patrick";  // Semicolon added
        System.out.println(name);
    }
}
```

#### Error Type 2: Type Mismatch

**Bad Code:**
```java
int age = "twenty-five";  // Assigning string to int
```

**Error Message:**
```
error: incompatible types: String cannot be converted to int
```

**Fixed Code:**
```java
int age = 25;  // Use correct type
```

#### Error Type 3: Undefined Variable

**Bad Code:**
```java
public class Employee {
    public static void main(String[] args) {
        System.out.println(name);  // name not defined
    }
}
```

**Error Message:**
```
error: cannot find symbol - variable name
```

**Fixed Code:**
```java
public class Employee {
    public static void main(String[] args) {
        String name = "Patrick";  // Define first
        System.out.println(name);
    }
}
```

#### Error Type 4: NullPointerException (Runtime Error)

**Bad Code:**
```java
String name = null;
System.out.println(name.length());  // null has no length!
```

**Error Message:**
```
Exception in thread "main" java.lang.NullPointerException
```

**How to Debug:**
- Always check if something is null before using it
- Use `if (name != null)` before accessing

**Fixed Code:**
```java
String name = null;
if (name != null) {
    System.out.println(name.length());
} else {
    System.out.println("Name is null");
}
```

#### Error Type 5: Array Index Out of Bounds

**Bad Code:**
```java
String[] employees = {"Patrick", "Maria"};
System.out.println(employees[5]);  // Index 5 doesn't exist!
```

**Error Message:**
```
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: 5
```

**Fixed Code:**
```java
String[] employees = {"Patrick", "Maria"};
if (employees.length > 5) {
    System.out.println(employees[5]);
} else {
    System.out.println("Index doesn't exist. Array has " + employees.length + " items");
}
```

#### Error Type 6: Logic Error (Wrong Comparison)

**Bad Code:**
```java
int age = 25;
if (age = 18) {  // Single = is assignment, not comparison!
    System.out.println("Adult");
}
```

**Error Message:**
```
error: unexpected type - required: boolean, found: int
```

**Fixed Code:**
```java
int age = 25;
if (age == 18) {  // Double == for comparison
    System.out.println("Adult");
} else if (age > 18) {
    System.out.println("Still adult");
}
```

#### Debugging Tool: System.out.println()

```java
String name = "Patrick";
int age = 25;

System.out.println("Name: " + name);        // Print to see value
System.out.println("Age: " + age);          // Print to see value
System.out.println("Age type: " + (age instanceof Integer));  // Check type

int result = age + 5;
System.out.println("Result: " + result);    // Verify calculation
```

---

### Lesson 5.4: General Debugging Strategy

#### Step 1: Read the Error Message (Top to Bottom)

**Example Error:**
```
java.lang.NullPointerException
    at Employee.main(Employee.java:5)
```

**Reading Like English:**
- "There's a NullPointerException"
- "It happened at line 5 in the main method of Employee class"
- "Go to line 5, something is null that shouldn't be"

#### Step 2: Identify the Line

```java
1: public class Employee {
2:    public static void main(String[] args) {
3:        String name = null;
4:        System.out.println("Name: " + name);
5:        System.out.println(name.length());  // ERROR IS HERE
6:    }
7: }
```

**Fix:** Line 5 tries to call `.length()` on null. Add a null check first.

#### Step 3: Print Debug Information

```java
String name = null;
System.out.println("DEBUG: name = " + name);           // What is it?
System.out.println("DEBUG: name is null? " + (name == null));  // Is it null?

if (name != null) {
    System.out.println(name.length());
}
```

#### Step 4: Test with Different Inputs

**Original code:**
```php
function getDiscount($salary) {
    if ($salary > 50000) {
        return 0.15;  // 15% discount
    } else {
        return 0.10;  // 10% discount
    }
}
```

**Test cases:**
```php
echo getDiscount(60000);   // Expected: 0.15
echo getDiscount(40000);   // Expected: 0.10
echo getDiscount(50000);   // Expected: 0.10 (boundary case!)
```

#### Step 5: Check Edge Cases (Boundary Values)

```java
// Bad: Only tests happy path
int age = 25;
if (age >= 18) {
    System.out.println("Adult");
}

// Good: Test boundaries
testAge(18);    // Boundary: exactly 18
testAge(17);    // Just below boundary
testAge(19);    // Just above boundary
testAge(-5);    // Invalid input
testAge(150);   // Extreme input
```

---

### Lesson 5.5: Real Exam Debugging Scenarios

#### Scenario 1: "Find and Fix the Error"

**Given Code:**
```php
<?php
    $employees = array("Patrick", "Maria", "Juan");
    
    for ($i = 0; $i <= count($employees); $i++) {
        echo $employees[$i];
    }
?>
```

**What's Wrong?**
- `$i <= count($employees)` should be `$i < count($employees)`
- If array has 3 items (indices 0, 1, 2), loop will try index 3 which doesn't exist

**Fixed Code:**
```php
<?php
    $employees = array("Patrick", "Maria", "Juan");
    
    for ($i = 0; $i < count($employees); $i++) {  // Changed <= to <
        echo $employees[$i];
    }
?>
```

#### Scenario 2: "Why Doesn't This Work?"

**Given Code:**
```sql
SELECT * FROM employees 
WHERE department = 'Engineering' 
AND salary = 50000;
```

**The Problem:**
- Database has no employee with exact salary 50000 (there are 50000.50, 49999, etc.)
- Query returns empty result

**Fixed Code:**
```sql
SELECT * FROM employees 
WHERE department = 'Engineering' 
AND salary >= 50000;  -- Range instead of exact match
```

#### Scenario 3: "Complete the Code and Fix It"

**Incomplete Code:**
```java
public class Calculator {
    public static int divide(int a, int b) {
        return a / b;
    }
    
    public static void main(String[] args) {
        System.out.println(divide(10, 0));  // What happens?
    }
}
```

**The Problem:**
- Division by zero causes ArithmeticException

**Fixed Code:**
```java
public class Calculator {
    public static int divide(int a, int b) {
        if (b == 0) {
            System.out.println("Error: Cannot divide by zero");
            return 0;
        }
        return a / b;
    }
    
    public static void main(String[] args) {
        System.out.println(divide(10, 2));   // Output: 5
        System.out.println(divide(10, 0));   // Output: Error message
    }
}
```

---

**📝 Activities for Debugging:**

1. **PHP Debugging:**
   - Write code with 3 intentional errors (syntax, undefined variable, logic)
   - Run it and see the error messages
   - Fix each one

2. **MySQL Debugging:**
   - Create a table, insert 5 rows
   - Write a SELECT query with a WHERE clause that returns no results
   - Identify why and fix it

3. **Java Debugging:**
   - Write code that causes NullPointerException
   - Add null checks to fix it
   - Test with valid and null inputs

4. **Mixed Debugging Challenge:**
   - Given: PHP code that fetches from MySQL and displays results
   - Find and fix 5 errors across PHP and SQL

5. **Error Recognition:**
   - Read 10 code snippets (mix of correct and incorrect)
   - For each, identify: Is it correct? If not, what's wrong and how to fix?

---

## 🎯 FINAL EXAM STRATEGY & TIPS

**What the Exam Likely Tests (Revised):**

1. **Basic Logic** (35%)
   - If/else, loops, arrays
   - **+ Debugging:** Spot and fix logic errors

2. **PHP** (25%)
   - Variables, functions, arrays
   - **+ Debugging:** Fix syntax and runtime errors

3. **MySQL** (15%)
   - CRUD operations
   - **+ Debugging:** Fix query errors

4. **Java** (15%)
   - Basics, conditionals, loops
   - **+ Debugging:** Fix type and null errors

5. **Debugging** (10%)
   - Identify errors in given code
   - Write fixes

**Debugging Mindset for Exam:**

1. **Don't panic when you see error code** — Every error has a cause
2. **Read the error message first** — It tells you what's wrong
3. **Check line by line** — Use the Professor's Method to read code like English
4. **Test edge cases** — Boundaries, nulls, empty arrays
5. **Add debug output** — Print variables to verify values

**Time Management Revised (1 hour exam):**
- 5 min: Read all problems
- 40 min: Code solutions (easier ones first)
- 10 min: Debug code (find/fix errors)
- 5 min: Review

---

**Next Steps:**

1. Start with **Unit 1** (Basic Logic) + **Unit 5.4** (Debugging Strategy)
2. Then **Unit 2** (PHP) + **Unit 5.1** (PHP Errors)
3. Then **Unit 3** (MySQL) + **Unit 5.2** (MySQL Errors)
4. Then **Unit 4** (Java) + **Unit 5.3** (Java Errors)
5. Do **Unit 5.5** (Real Scenarios) as final practice
6. **Review this entire syllabus Tuesday night** before exam

**You've got this! Debugging is a superpower! 🚀**
