# 🟢 UNIT 1: BASIC PROGRAMMING LOGIC
## Lesson 1: The Foundation of All Programming

**Duration:** 3-4 hours of focused study  
**What You'll Learn:** How to think like a programmer — the core logic that transcends all languages  
**Why It Matters:** These concepts are identical in PHP, Java, MySQL, and every other language. Master this, and learning new languages becomes easy.

---

## 📖 Introduction: What is Programming Logic?

Programming is not about memorizing syntax. It's about **solving problems step-by-step**.

Think of a chef making a recipe:
1. **Gather ingredients** (variables)
2. **Mix them** (operations)
3. **Check if something's right** (conditionals)
4. **Repeat a process** (loops)
5. **Organize ingredients in containers** (arrays)
6. **Reuse favorite recipes** (functions)

Every programming language just uses different words for these concepts. Learn the concepts, and you own them all.

---

## 🎯 Learning Objectives

By the end of this unit, you will:
- ✅ Create and use variables to store different types of data
- ✅ Perform mathematical and logical operations
- ✅ Make decisions with if/else conditionals
- ✅ Repeat actions with loops
- ✅ Store multiple items in arrays
- ✅ Organize code into reusable functions
- ✅ Read code as English sentences

---

## Lesson 1.1: Variables & Data Types — Storing Information

### 🧠 The Concept

A **variable** is a container that holds a value. Like a labeled box on a shelf.

```
┌─────────────┐
│   $name     │  ← Variable name (label on the box)
├─────────────┤
│  "Patrick"  │  ← Value inside (what's in the box)
└─────────────┘
```

When you need the value later, you call the variable by name: `$name` → it gives you `"Patrick"`.

### 📝 Reading Like English

"Create a variable named name and put the text 'Patrick' inside it."

### 🔧 PHP Example

```php
<?php
    $name = "Patrick";          // Text (String)
    $age = 25;                  // Whole number (Integer)
    $salary = 50000.50;         // Decimal number (Float/Double)
    $isActive = true;           // Boolean (True or False)
    $department = "Engineering"; // Another text
?>
```

**Reading Line by Line:**
- Line 1: "Create variable name containing the text Patrick"
- Line 2: "Create variable age containing the number 25"
- Line 3: "Create variable salary containing the decimal 50000.50"
- Line 4: "Create variable isActive containing the boolean true"
- Line 5: "Create variable department containing the text Engineering"

### 🔧 Java Example

```java
String name = "Patrick";           // Text
int age = 25;                      // Whole number
double salary = 50000.50;          // Decimal number
boolean isActive = true;           // Boolean
```

**Reading Like English:**
- "Declare a String variable named name with value Patrick"
- "Declare an int variable named age with value 25"
- "Declare a double variable named salary with value 50000.50"
- "Declare a boolean variable named isActive with value true"

### 🗄️ MySQL Example

```sql
CREATE TABLE employees (
    id INT,                    -- Whole number
    name VARCHAR(100),         -- Text (max 100 characters)
    salary DECIMAL(10, 2),     -- Decimal (10 total digits, 2 after decimal point)
    is_active BOOLEAN,         -- Boolean (TRUE/FALSE)
    hire_date DATE             -- Date (YYYY-MM-DD)
);
```

**Reading Like English:**
- "Create a table called employees"
- "Column id: integer data type"
- "Column name: text data type, maximum 100 characters"
- "Column salary: decimal data type"
- "Column is_active: boolean data type"
- "Column hire_date: date data type"

### 📊 Data Types Comparison Across Languages

| Concept | PHP | Java | MySQL | Example |
|---------|-----|------|-------|---------|
| Text | `string` | `String` | `VARCHAR(100)` | "Patrick" |
| Whole Number | `int` | `int` | `INT` | 25 |
| Decimal | `float`/`double` | `double` | `DECIMAL(10,2)` | 50000.50 |
| True/False | `bool` | `boolean` | `BOOLEAN` | true |
| Nothing/Empty | `null` | `null` | `NULL` | null |

### 🎬 Real-World Example: Employee Record

```php
<?php
    // An employee's information
    $employeeId = 1001;
    $firstName = "Patrick";
    $lastName = "Arlan";
    $department = "Engineering";
    $position = "Software Developer";
    $salary = 55000.00;
    $joinDate = "2024-01-15";
    $isActive = true;
    
    // Display the employee info
    echo "Employee ID: $employeeId";
    echo "Name: $firstName $lastName";
    echo "Position: $position in $department";
    echo "Salary: $salary";
    echo "Join Date: $joinDate";
    echo "Active: $isActive";
?>
```

**Why Each Data Type?**
- `$employeeId` is `int` because IDs are whole numbers
- `$firstName` is `string` because names are text
- `$salary` is `float` because salaries have cents (.00)
- `$isActive` is `bool` because someone is either active or not
- `$joinDate` is `string` because we'll store it as text

---

## Lesson 1.2: Basic Operations — Math & Logic

### 🧠 The Concept

Operations let you **do something** with variables. Add them, subtract, compare them, combine them.

### 📝 Arithmetic Operations (Math)

#### PHP Example

```php
<?php
    $x = 10;
    $y = 3;
    
    // Addition
    $sum = $x + $y;           // 10 + 3 = 13
    
    // Subtraction
    $difference = $x - $y;    // 10 - 3 = 7
    
    // Multiplication
    $product = $x * $y;       // 10 * 3 = 30
    
    // Division
    $quotient = $x / $y;      // 10 / 3 = 3.333...
    
    // Modulo (remainder after division)
    $remainder = $x % $y;     // 10 % 3 = 1 (because 10 = 3*3 + 1)
    
    // Exponentiation (power)
    $power = $x ** 2;         // 10 ^ 2 = 100
    
    echo "10 + 3 = $sum";
    echo "10 - 3 = $difference";
    echo "10 * 3 = $product";
    echo "10 / 3 = $quotient";
    echo "10 % 3 = $remainder";
    echo "10 ** 2 = $power";
?>
```

**Output:**
```
10 + 3 = 13
10 - 3 = 7
10 * 3 = 30
10 / 3 = 3.333...
10 % 3 = 1
10 ** 2 = 100
```

#### Java Example

```java
int x = 10;
int y = 3;

int sum = x + y;           // 13
int difference = x - y;    // 7
int product = x * y;       // 30
int quotient = x / y;      // 3 (integer division, no decimals)
int remainder = x % y;     // 1

System.out.println("10 + 3 = " + sum);
System.out.println("10 % 3 = " + remainder);
```

### 📝 Comparison Operations (True/False)

These return `true` or `false`. Used to make decisions.

```php
<?php
    $salary = 50000;
    
    // Equal to
    $equal = ($salary == 50000);        // true
    
    // Not equal to
    $notEqual = ($salary != 60000);     // true
    
    // Greater than
    $greater = ($salary > 45000);       // true
    
    // Less than
    $less = ($salary < 60000);          // true
    
    // Greater than or equal
    $greaterEqual = ($salary >= 50000); // true
    
    // Less than or equal
    $lessEqual = ($salary <= 50000);    // true
?>
```

**Reading Like English:**
- "$salary equals 50000?" → true
- "$salary does not equal 60000?" → true
- "$salary is greater than 45000?" → true
- "$salary is less than 60000?" → true

### 📝 Logical Operations (Combining Conditions)

```php
<?php
    $department = "Engineering";
    $salary = 50000;
    $yearsExperience = 5;
    
    // AND (&&) - ALL conditions must be true
    $eligible1 = ($department == "Engineering" && $salary > 45000);
    // Is department Engineering? YES. Is salary > 45000? YES. Result: true
    
    $eligible2 = ($department == "Engineering" && $salary < 40000);
    // Is department Engineering? YES. Is salary < 40000? NO. Result: false
    
    // OR (||) - AT LEAST ONE condition must be true
    $eligible3 = ($department == "HR" || $department == "Engineering");
    // Is department HR? NO. Is department Engineering? YES. Result: true
    
    $eligible4 = ($department == "Sales" || $department == "Marketing");
    // Is department Sales? NO. Is department Marketing? NO. Result: false
    
    // NOT (!) - Reverses true/false
    $inactive = !$isActive;  // If isActive is true, inactive is false
?>
```

**Reading Like English:**
- "If department is Engineering AND salary is greater than 45000, then eligible"
- "If department is HR OR department is Engineering, then eligible"
- "If NOT active, then employee is inactive"

### 🎬 Real-World Example: Calculating Employee Bonus

```php
<?php
    $salary = 50000;
    $yearsExperience = 5;
    $performanceRating = 4.5;  // Out of 5
    
    // Calculate bonus: 10% of salary
    $baseBonus = $salary * 0.10;
    
    // Add experience bonus: 1% per year
    $experienceBonus = $salary * ($yearsExperience * 0.01);
    
    // Add performance bonus: 0.5% per rating point
    $performanceBonus = $salary * ($performanceRating * 0.005);
    
    // Total bonus
    $totalBonus = $baseBonus + $experienceBonus + $performanceBonus;
    
    echo "Base Bonus: $baseBonus";           // 5000
    echo "Experience Bonus: $experienceBonus"; // 2500
    echo "Performance Bonus: $performanceBonus"; // 1125
    echo "Total Bonus: $totalBonus";        // 8625
?>
```

---

## Lesson 1.3: Conditionals (if/else) — Making Decisions

### 🧠 The Concept

"If something is true, do action A. Otherwise, do action B."

This is how programs make decisions.

```
           ┌─ Is condition true? ─┐
           │                      │
         YES                      NO
          ↓                        ↓
      Do Action A            Do Action B
```

### 📝 Basic If/Else

#### PHP Example

```php
<?php
    $age = 25;
    
    if ($age >= 18) {
        echo "You are an adult";
    } else {
        echo "You are a minor";
    }
    // Output: "You are an adult"
?>
```

**Reading Like English:**
- "If age is greater than or equal to 18"
- "Then print 'You are an adult'"
- "Otherwise print 'You are a minor'"
- "Since age is 25, the first condition is true, so print 'You are an adult'"

#### Java Example

```java
int age = 25;

if (age >= 18) {
    System.out.println("You are an adult");
} else {
    System.out.println("You are a minor");
}
// Output: You are an adult
```

### 📝 Multiple Conditions (else if)

```php
<?php
    $score = 85;
    
    if ($score >= 90) {
        echo "Grade: A";
    } else if ($score >= 80) {
        echo "Grade: B";
    } else if ($score >= 70) {
        echo "Grade: C";
    } else {
        echo "Grade: F";
    }
    // Output: "Grade: B"
?>
```

**Reading Like English:**
- "If score is 90 or higher, grade is A"
- "Else if score is 80 or higher, grade is B"
- "Else if score is 70 or higher, grade is C"
- "Else grade is F"
- "Since score is 85, the second condition is true, so grade is B"

### 📝 Combining Conditions with AND (&&)

```php
<?php
    $salary = 50000;
    $department = "Engineering";
    
    if ($department == "Engineering" && $salary > 45000) {
        echo "Eligible for bonus";
    } else {
        echo "Not eligible";
    }
    // Output: "Eligible for bonus"
?>
```

**Reading Like English:**
- "If department equals Engineering AND salary is greater than 45000"
- "Then print 'Eligible for bonus'"
- "Otherwise print 'Not eligible'"
- "Since BOTH conditions are true, print 'Eligible for bonus'"

### 📝 Combining Conditions with OR (||)

```php
<?php
    $department = "Engineering";
    
    if ($department == "Engineering" || $department == "Research") {
        echo "Qualifies for technical track";
    } else {
        echo "Qualifies for business track";
    }
    // Output: "Qualifies for technical track"
?>
```

**Reading Like English:**
- "If department is Engineering OR department is Research"
- "Then print 'Qualifies for technical track'"
- "Otherwise print 'Qualifies for business track'"
- "Since the first condition is true, print 'Qualifies for technical track'"

### 🎬 Real-World Example: Employee Raise Decision

```php
<?php
    $yearsExperience = 5;
    $performanceRating = 4.2;  // Out of 5
    $currentSalary = 50000;
    
    // Determine raise percentage
    if ($performanceRating >= 4.5 && $yearsExperience >= 3) {
        $raisePercent = 0.10;  // 10% raise
        $raiseReason = "Excellent performance and experience";
    } else if ($performanceRating >= 4.0 && $yearsExperience >= 2) {
        $raisePercent = 0.07;  // 7% raise
        $raiseReason = "Good performance";
    } else if ($performanceRating >= 3.5 || $yearsExperience >= 5) {
        $raisePercent = 0.05;  // 5% raise
        $raiseReason = "Average performance or long tenure";
    } else {
        $raisePercent = 0.00;  // No raise
        $raiseReason = "Performance below expectations";
    }
    
    $raiseAmount = $currentSalary * $raisePercent;
    $newSalary = $currentSalary + $raiseAmount;
    
    echo "Current Salary: $currentSalary";
    echo "Raise: $raisePercent (Reason: $raiseReason)";
    echo "Raise Amount: $raiseAmount";
    echo "New Salary: $newSalary";
?>
```

---

## Lesson 1.4: Loops — Repeating Actions

### 🧠 The Concept

A loop repeats an action multiple times. Instead of writing the same code 10 times, you write it once and tell it "do this 10 times".

```
Loop iteration 1: Do action
Loop iteration 2: Do action
Loop iteration 3: Do action
... (keep going until condition is false)
Loop ends
```

### 📝 For Loop (When You Know How Many Times)

#### PHP Example

```php
<?php
    // Print numbers 1 to 5
    for ($i = 1; $i <= 5; $i++) {
        echo "Count: $i\n";
    }
?>
```

**Output:**
```
Count: 1
Count: 2
Count: 3
Count: 4
Count: 5
```

**Reading Like English:**
- "Start with i equals 1"
- "While i is less than or equal to 5"
- "Print 'Count: ' and the value of i"
- "Increase i by 1 (i++)"
- "Go back to the while condition and check again"
- "When i becomes 6, the condition is false, so stop"

**Breaking Down the For Loop Syntax:**

```
for (initialize; condition; increment)
    │         │        │       │
    │         │        │       └─ Happens after each iteration (i++)
    │         │        └─────────── Loop continues while this is true (i <= 5)
    │         └──────────────────── Initial value of counter (i = 1)
    └────────────────────────────── The keyword "for"
```

#### Java Example

```java
for (int i = 1; i <= 5; i++) {
    System.out.println("Count: " + i);
}
// Output: Count: 1 through Count: 5
```

### 📝 While Loop (When You Don't Know How Many Times)

```php
<?php
    $count = 0;
    
    while ($count < 5) {
        echo "Count: $count\n";
        $count++;  // Increase by 1
    }
?>
```

**Output:**
```
Count: 0
Count: 1
Count: 2
Count: 3
Count: 4
```

**Reading Like English:**
- "While count is less than 5"
- "Print 'Count: ' and the value"
- "Increase count by 1"
- "Go back and check the condition"
- "When count becomes 5, the condition is false, so stop"

### 📝 Real-World Example: Processing Employee List

```php
<?php
    $employees = array("Patrick", "Maria", "Juan", "Rosa");
    
    echo "=== Processing Employees ===\n";
    
    for ($i = 0; $i < count($employees); $i++) {
        $employeeName = $employees[$i];
        echo "Processing employee $i: $employeeName\n";
    }
    
    echo "\n=== Payroll Processing ===\n";
    
    // Simulate payroll
    $salary = 50000;
    $month = 1;
    
    while ($month <= 12) {
        $monthlyPay = $salary / 12;
        echo "Month $month: Pay $monthlyPay\n";
        $month++;
    }
?>
```

---

## Lesson 1.5: Arrays/Collections — Storing Multiple Items

### 🧠 The Concept

An array is a container that holds multiple values, organized by position (index).

```
Array: employees
┌─────────┬────────┬────────┬────────┐
│Patrick  │ Maria  │  Juan  │  Rosa  │
├─────────┼────────┼────────┼────────┤
│ Index 0 │Index 1 │Index 2 │Index 3 │
└─────────┴────────┴────────┴────────┘
```

Index starts at **0**, not 1. The first item is at index 0.

### 📝 Creating and Accessing Arrays

#### PHP Example

```php
<?php
    // Create array
    $employees = array("Patrick", "Maria", "Juan", "Rosa");
    
    // Access by index (position)
    echo $employees[0];  // Patrick (first)
    echo $employees[1];  // Maria (second)
    echo $employees[2];  // Juan (third)
    echo $employees[3];  // Rosa (fourth)
    
    // Get array length
    $count = count($employees);  // 4
    echo "Total employees: $count";
?>
```

### 📝 Looping Through Arrays

```php
<?php
    $employees = array("Patrick", "Maria", "Juan", "Rosa");
    
    // Method 1: For loop with index
    for ($i = 0; $i < count($employees); $i++) {
        echo "Employee $i: " . $employees[$i] . "\n";
    }
    
    // Method 2: Foreach (easier to read)
    foreach ($employees as $name) {
        echo "Employee: $name\n";
    }
?>
```

**Output:**
```
Employee 0: Patrick
Employee 1: Maria
Employee 2: Juan
Employee 3: Rosa
```

### 📝 Associative Arrays (Key-Value Pairs)

Sometimes you want to access values by name, not number.

```php
<?php
    // Regular array (indexed by number)
    $indexed = array("Patrick", "Maria", "Juan");
    
    // Associative array (indexed by key/name)
    $employee = array(
        "name" => "Patrick",
        "age" => 25,
        "department" => "Engineering",
        "salary" => 50000
    );
    
    // Access by key
    echo "Name: " . $employee["name"];         // Patrick
    echo "Department: " . $employee["department"]; // Engineering
    echo "Salary: " . $employee["salary"];     // 50000
    
    // Loop through key-value pairs
    foreach ($employee as $key => $value) {
        echo "$key: $value\n";
    }
?>
```

**Output:**
```
name: Patrick
age: 25
department: Engineering
salary: 50000
```

#### Java Example

```java
// Array
String[] employees = {"Patrick", "Maria", "Juan", "Rosa"};
System.out.println(employees[0]);  // Patrick

// Loop
for (String name : employees) {
    System.out.println("Employee: " + name);
}
```

### 🎬 Real-World Example: Employee Database

```php
<?php
    // Array of employees (each is an associative array)
    $employees = array(
        array(
            "id" => 1,
            "name" => "Patrick",
            "department" => "Engineering",
            "salary" => 55000
        ),
        array(
            "id" => 2,
            "name" => "Maria",
            "department" => "HR",
            "salary" => 50000
        ),
        array(
            "id" => 3,
            "name" => "Juan",
            "department" => "Engineering",
            "salary" => 52000
        )
    );
    
    // Loop through and display
    foreach ($employees as $emp) {
        echo "ID: " . $emp["id"] . "\n";
        echo "Name: " . $emp["name"] . "\n";
        echo "Department: " . $emp["department"] . "\n";
        echo "Salary: " . $emp["salary"] . "\n";
        echo "---\n";
    }
    
    // Find total salary spending
    $totalSalary = 0;
    foreach ($employees as $emp) {
        $totalSalary += $emp["salary"];  // Add to total
    }
    echo "Total Salary Budget: $totalSalary";
?>
```

---

## Lesson 1.6: Functions — Reusable Logic Blocks

### 🧠 The Concept

A function is a reusable block of code. Instead of writing the same logic 10 times, write it once as a function and call it 10 times.

```
Function Definition:
    function greet(name) {
        return "Hello, " + name
    }

Function Calls:
    greet("Patrick")  → "Hello, Patrick"
    greet("Maria")    → "Hello, Maria"
    greet("Juan")     → "Hello, Juan"
```

### 📝 Basic Function

#### PHP Example

```php
<?php
    // Define function
    function greet($name) {
        $message = "Hello, " . $name . "!";
        return $message;
    }
    
    // Call function
    echo greet("Patrick");  // Hello, Patrick!
    echo greet("Maria");    // Hello, Maria!
    echo greet("Juan");     // Hello, Juan!
?>
```

**Reading Like English:**
- "Define a function called greet that takes a name parameter"
- "Inside, create a message combining 'Hello, ' and the name and '!'"
- "Return the message"
- "Call greet with 'Patrick', it returns and outputs 'Hello, Patrick!'"

### 📝 Function with Multiple Parameters

```php
<?php
    function calculateBonus($salary, $percentage) {
        $bonus = $salary * ($percentage / 100);
        return $bonus;
    }
    
    $bonus1 = calculateBonus(50000, 10);   // 5000
    $bonus2 = calculateBonus(60000, 15);   // 9000
    
    echo "Bonus 1: $bonus1";
    echo "Bonus 2: $bonus2";
?>
```

**Reading Like English:**
- "Define a function calculateBonus with parameters salary and percentage"
- "Calculate bonus as salary multiplied by (percentage divided by 100)"
- "Return the bonus"
- "Call calculateBonus with 50000 and 10, get 5000"
- "Call calculateBonus with 60000 and 15, get 9000"

### 📝 Function with Default Parameters

```php
<?php
    function displayEmployee($name, $department = "Unassigned") {
        echo "Name: $name\n";
        echo "Department: $department\n";
    }
    
    displayEmployee("Patrick", "Engineering");  // Shows both
    displayEmployee("Maria");                   // Department defaults to "Unassigned"
?>
```

**Output:**
```
Name: Patrick
Department: Engineering

Name: Maria
Department: Unassigned
```

### 📝 Function That Does Something But Returns Nothing (void)

```php
<?php
    function printEmployeeInfo($name, $salary) {
        echo "Employee: $name\n";
        echo "Salary: $salary\n";
        echo "---\n";
        // No return statement
    }
    
    printEmployeeInfo("Patrick", 50000);
    printEmployeeInfo("Maria", 55000);
?>
```

### 🎬 Real-World Example: Employee Salary Management

```php
<?php
    // Function to calculate net salary after tax
    function calculateNetSalary($grossSalary, $taxRate = 0.15) {
        $tax = $grossSalary * $taxRate;
        $netSalary = $grossSalary - $tax;
        return $netSalary;
    }
    
    // Function to calculate years until retirement
    function yearsUntilRetirement($currentAge, $retirementAge = 65) {
        $years = $retirementAge - $currentAge;
        return $years > 0 ? $years : 0;
    }
    
    // Function to determine eligibility for benefits
    function isEligibleForBenefits($yearsWorked, $grossSalary) {
        if ($yearsWorked >= 1 && $grossSalary >= 30000) {
            return true;
        }
        return false;
    }
    
    // Use the functions
    $grossSalary = 50000;
    $netSalary = calculateNetSalary($grossSalary);
    echo "Gross Salary: $grossSalary\n";
    echo "Net Salary: $netSalary\n";
    
    $yearsWorked = 3;
    $eligible = isEligibleForBenefits($yearsWorked, $grossSalary);
    echo "Eligible for benefits: " . ($eligible ? "Yes" : "No") . "\n";
    
    $yearsToRetirement = yearsUntilRetirement(45);
    echo "Years until retirement: $yearsToRetirement\n";
?>
```

#### Java Example

```java
public class EmployeeManagement {
    
    // Function to calculate bonus
    public static double calculateBonus(double salary, double percentage) {
        return salary * (percentage / 100);
    }
    
    // Function to display employee
    public static void displayEmployee(String name, String department) {
        System.out.println("Name: " + name);
        System.out.println("Department: " + department);
    }
    
    public static void main(String[] args) {
        double bonus = calculateBonus(50000, 10);
        System.out.println("Bonus: " + bonus);
        
        displayEmployee("Patrick", "Engineering");
    }
}
```

---

## 📝 COMPREHENSIVE ACTIVITIES

### Activity 1: Variables Practice

**Create a PHP script that:**
1. Creates 5 variables for an employee:
   - `$employeeId` (number)
   - `$firstName` (text)
   - `$lastName` (text)
   - `$salary` (decimal)
   - `$isActive` (boolean)

2. Echo all variables with labels

3. Create a new variable `$fullName` by combining first and last name

4. Calculate `$annualBonus` as 10% of salary

**Expected Output:**
```
Employee ID: 1001
First Name: Patrick
Last Name: Arlan
Salary: 50000
Is Active: 1
Full Name: Patrick Arlan
Annual Bonus: 5000
```

---

### Activity 2: Operations Practice

**Create a PHP script that:**
1. Creates two salary variables: `$oldSalary` and `$newSalary`
2. Calculate the difference
3. Calculate the percentage increase: `($newSalary - $oldSalary) / $oldSalary * 100`
4. Check if salary increased (use comparison)
5. Check if the increase is at least 5% (use logical operators)

**Test Cases:**
- oldSalary = 50000, newSalary = 55000 (10% increase ✓)
- oldSalary = 50000, newSalary = 51000 (2% increase ✓)
- oldSalary = 50000, newSalary = 50000 (0% increase ✓)

---

### Activity 3: Conditionals Practice

**Create a PHP script that determines employee bonus eligibility:**

```
If years_worked >= 5 AND salary >= 50000:
    Bonus = 15%
Else if years_worked >= 3 AND salary >= 40000:
    Bonus = 10%
Else if years_worked >= 1:
    Bonus = 5%
Else:
    Bonus = 0%
```

**Test with 3 different employees**

---

### Activity 4: Loops Practice

**Create a PHP script that:**
1. Uses a `for` loop to print numbers 1 to 10
2. Uses a `while` loop to print numbers 20 to 15 (counting down)
3. Uses a `foreach` loop to print each month of the year

**Expected Output (sample):**
```
1 2 3 4 5 6 7 8 9 10
20 19 18 17 16 15
January February March ... December
```

---

### Activity 5: Arrays Practice

**Create a PHP script with an array of 5 employees:**

```php
$employees = array(
    array("name" => "Patrick", "department" => "Engineering", "salary" => 50000),
    array("name" => "Maria", "department" => "HR", "salary" => 45000),
    // ... 3 more
);
```

**Then:**
1. Loop through and print each employee's info
2. Calculate total salary spending
3. Count how many employees are in Engineering
4. Find average salary

---

### Activity 6: Functions Practice

**Create 4 functions:**

1. `calculateTax($salary)` - Returns 15% of salary
2. `calculateNetSalary($salary)` - Returns salary minus tax
3. `formatCurrency($amount)` - Returns amount formatted as currency (e.g., "$50,000.00")
4. `isHighEarner($salary)` - Returns true if salary > 60000

**Test each function with multiple inputs**

---

### Activity 7: Real-World Scenario

**Create a complete payroll system:**

1. Define an array of employees with: id, name, department, gross_salary
2. Create functions:
   - `calculateTax($salary)` - 15% tax
   - `calculateNetSalary($salary)` - gross minus tax
   - `calculateBonus($salary, $department)` - Engineering gets 10% bonus, others get 5%
   - `printPayslip($employee)` - Displays formatted payslip

3. Loop through all employees and print their payslip

**Expected Output (sample):**
```
===== PAYSLIP =====
Employee: Patrick
Department: Engineering
Gross Salary: 50000
Tax (15%): 7500
Bonus (10%): 5000
Net Salary: 47500
==================
```

---

### Activity 8: Challenge - Logic Puzzle

**Write code to solve this:**
- Create an array of 10 employee salaries
- Calculate which ones are above average
- Count how many are in each range:
  - Below $40,000
  - $40,000 - $50,000
  - $50,000 - $60,000
  - Above $60,000

**Expected Output (sample):**
```
Total Employees: 10
Average Salary: 50000

Below $40,000: 2 employees
$40,000 - $50,000: 4 employees
$50,000 - $60,000: 3 employees
Above $60,000: 1 employee
```

---

## 🧠 Key Concepts Summary

| Concept | Purpose | Example |
|---------|---------|---------|
| **Variable** | Store a value | `$name = "Patrick"` |
| **Data Type** | What kind of value | `string`, `int`, `float`, `bool` |
| **Operation** | Do something with values | `$sum = $x + $y` |
| **Conditional** | Make a decision | `if ($age >= 18) { ... }` |
| **Loop** | Repeat an action | `for ($i = 0; $i < 10; $i++)` |
| **Array** | Store multiple values | `$items = array(1, 2, 3)` |
| **Function** | Reusable code block | `function greet($name) { ... }` |

---

## 💡 Common Mistakes to Avoid

1. **Off-by-One Error in Arrays**
   - ❌ `$arr[5]` on an array with 5 items (indices 0-4)
   - ✅ `$arr[4]` for the last item

2. **Forgetting Semicolons (PHP)**
   - ❌ `$x = 5` (missing semicolon)
   - ✅ `$x = 5;` (correct)

3. **Using = Instead of ==**
   - ❌ `if ($age = 18)` (assignment, not comparison)
   - ✅ `if ($age == 18)` (comparison)

4. **Infinite Loop**
   - ❌ `while ($i < 10)` without `$i++`
   - ✅ `while ($i < 10) { echo $i; $i++; }`

5. **Forgetting Return Statement**
   - ❌ Function calculates value but doesn't return it
   - ✅ Always include `return` if you need the result

---

## 🎯 Next Steps

1. ✅ Complete all 8 activities
2. ✅ Write each in both **PHP and Java** (see patterns)
3. ✅ Run and verify outputs
4. ✅ Review this lesson before moving to Unit 2 (PHP)

**You've mastered the foundation! Every language is just syntax on top of these concepts.** 💪

---

## ✅ LESSON 1 ACTIVITY VERIFICATION & DETAILED GRADING

| Activity | Status | Feedback |
|----------|--------|----------|
| Activity 1: Variables Practice | [x] CORRECT | ✅ Fixed! Employee ID corrected to 1001, salary set to 50000, annual bonus correctly calculated at $5,000. All 5 variables and labels output correctly. |
| Activity 2: Operations Practice | [x] CORRECT | ✅ Fixed! All 3 test cases now included: (1) 50000→55000 (10%), (2) 50000→51000 (2%), (3) 50000→50000 (0%). Uses loop to iterate through all test cases efficiently. |
| Activity 3: Conditionals Practice | [x] CORRECT | ✅ Perfect. Logic matches requirements exactly. All 3 test cases correct: Patrick 15% (5yrs,50k), Arlan 5% (2yrs,25k), Brequillo 15% (6yrs,60k). |
| Activity 4: Loops Practice | [x] CORRECT | ✅ All 3 loops perfect: For (1-10), While (20-15 countdown), Foreach (12 months with names). Output format matches expected. |
| Activity 5: Arrays Practice | [x] CORRECT | ✅ Fixed! Now includes: (1) Loop through employees, (2) Total salary, (3) Count Engineering employees (3), (4) Calculate average salary ($54,000). All 4 requirements met. |
| Activity 6: Functions Practice | [x] CORRECT | ✅ Fixed! Now tests all 4 functions with **multiple inputs** (4 different salaries: $23k, $50k, $65k, $40k). Comprehensive testing showing different scenarios. |
| Activity 7: Real-World Scenario | [x] CORRECT | ✅ Fixed! Array structure now matches requirement: id, name, department, gross_salary. Updated all function references (sal→gross_salary, dept→department, Engr→Engineering). All fields correct. |
| Activity 8: Challenge Logic Puzzle | [x] CORRECT | ✅ Excellent. Creates 10 salaries, calculates average (39400), counts above average (5), correctly counts ranges: <40k (5), 40-50k (0), 50-60k (4), >60k (1). Perfect logic. |

---

### 📊 FINAL SCORING
- **Correct (PASS):** 8/8 activities (100%) ✅
- **Incomplete:** 0/8 activities 
- **Incorrect:** 0/8 activities
- **Overall Pass Rate:** 100% 🎉

### 🔧 DETAILED FIXES REQUIRED

**Activity 1 - Fix:**
```php
$employeeId = 1001;  // Change from 0001 to 1001
$firstName = "Patrick";
$lastName = "Arlan";
$salary = 50000;     // Change from 10000 to 50000
$isActive = true;
$annualBonus = $salary * 0.10;  // CALCULATE bonus, don't store 0.10
```

**Activity 2 - Add All 3 Test Cases:**
```php
// Test case 1: 50000 → 55000 (10% increase)
$test1_old = 50000; $test1_new = 55000;
// Test case 2: 50000 → 51000 (2% increase)
$test2_old = 50000; $test2_new = 51000;
// Test case 3: 50000 → 50000 (0% increase)
$test3_old = 50000; $test3_new = 50000;
```

**Activity 5 - Add Missing Requirements:**
```php
// After the loop, add:
$engineeringCount = 0;
foreach ($employees as $emp) {
    if ($emp["dept"] == "Engineering") $engineeringCount++;
}
$averageSalary = $total / count($employees);
echo "Total Employees in Engineering: " . $engineeringCount . "\n";
echo "Average Salary: $" . number_format($averageSalary, 2) . "\n";
```

**Activity 6 - Test with Multiple Inputs:**
```php
// Instead of just one test:
$salaries = [23000, 50000, 65000, 40000];  // Multiple test values
foreach ($salaries as $sal) {
    echo "Salary: $" . number_format($sal, 2) . "\n";
    echo "Tax: $" . number_format(calculateTax($sal), 2) . "\n";
    // ... etc
}
```

**Activity 7 - Fix Array Structure:**
```php
$employees = array(
    array("id" => 1, "name" => "Patrick", "department" => "Engineering", "gross_salary" => 50000),
    array("id" => 2, "name" => "Arlan", "department" => "Management", "gross_salary" => 40000),
    array("id" => 3, "name" => "Brequillo", "department" => "HR", "gross_salary" => 30000)
);
```

---

**RECOMMENDATION:** Review Activities 1, 2, 5, 6, and 7. Activities 3, 4, and 8 demonstrate strong understanding of loops, conditionals, and array logic.
