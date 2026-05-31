# 🔵 UNIT 2: PHP FUNDAMENTALS
## Lesson 2: Server-Side Web Language

**Duration:** 3-4 hours of focused study  
**What You'll Learn:** How PHP works on a server and how to build dynamic websites  
**Why It Matters:** PHP powers millions of websites. Master this, and you'll understand how websites actually work.

---

## 📖 Introduction: What is PHP?

Think of a **restaurant**:
- **Browser (Customer):** You walk in and ask for a meal
- **PHP (Chef):** Takes your order, cooks the meal in the kitchen
- **Response (Served Plate):** Chef gives you the finished plate

PHP runs **on the server** (behind the scenes), not in the browser. The browser only sees the **final result**.

```
Browser asks → Server runs PHP → Server sends HTML back → Browser shows it
```

PHP is **not visible** to the person using the website. Only the **output** is visible.

---

## Lesson 2.1: PHP Basics — Starting PHP Code

### 🧠 The Concept

PHP code must be between `<?php` and `?>` tags. Everything outside these tags is treated as plain HTML.

### 📝 Reading Like English

"Start PHP code block, then do something, then end the code block."

### 🔧 Basic PHP Structure

```php
<?php
    // This is a comment - PHP ignores it
    echo "Hello, World!";  // Output text to browser
?>
```

**Reading Line by Line:**
- Line 1: "Start PHP code block"
- Line 2: "This is just a note to myself, not real code"
- Line 3: "Print/display the text 'Hello, World!' to the browser"
- Line 4: "End PHP code block"

**Output to browser:**
```
Hello, World!
```

### 📝 Multiple Commands

```php
<?php
    echo "Line 1";
    echo "Line 2";
    echo "Line 3";
?>
```

**Output:**
```
Line 1Line 2Line 3
```

**Why no line breaks?** Each `echo` just prints the text. Use `\n` for new lines:

```php
<?php
    echo "Line 1\n";
    echo "Line 2\n";
    echo "Line 3\n";
?>
```

**Output:**
```
Line 1
Line 2
Line 3
```

### 🎬 Real-World Example: Welcome Message

```php
<?php
    echo "Welcome to our website!\n";
    echo "Today is: ";
    echo date("Y-m-d");  // Built-in function to get current date
?>
```

**Output:**
```
Welcome to our website!
Today is: 2026-05-30
```

---

## Lesson 2.2: PHP Variables & Echo — Storing & Displaying Data

### 🧠 The Concept

Variables store data. `echo` displays it. String concatenation (`.`) joins text together.

### 📝 Variables & Echo

```php
<?php
    $name = "Patrick";
    $age = 25;
    $salary = 50000;
    
    echo "Name: " . $name . "\n";
    echo "Age: " . $age . "\n";
    echo "Salary: $" . $salary . "\n";
?>
```

**Reading Like English:**
- "Create variable name containing Patrick"
- "Create variable age containing 25"
- "Display: Name: plus the value of name"
- "Display: Age: plus the value of age"
- "Display: Salary: $plus the value of salary"

**Output:**
```
Name: Patrick
Age: 25
Salary: $50000
```

### 📝 String Concatenation (Joining Strings)

The **dot (.)** joins strings together:

```php
<?php
    $firstName = "Patrick";
    $lastName = "Arlan";
    
    echo "Full Name: " . $firstName . " " . $lastName;
?>
```

**Output:**
```
Full Name: Patrick Arlan
```

### 📝 String Interpolation (Modern Way)

Inside **double quotes**, PHP automatically replaces variables with their values:

```php
<?php
    $firstName = "Patrick";
    $lastName = "Arlan";
    $age = 25;
    
    // Old way (concatenation)
    echo "My name is " . $firstName . " " . $lastName;
    
    // Modern way (interpolation)
    echo "My name is $firstName $lastName and I am $age years old";
?>
```

**Both work the same way:**
```
My name is Patrick Arlan
My name is Patrick Arlan and I am 25 years old
```

**Key Rule:** Use **double quotes** `"..."` for interpolation. Single quotes `'...'` don't work:

```php
<?php
    $name = "Patrick";
    
    echo "Hello $name";      // Works: Hello Patrick
    echo 'Hello $name';      // Doesn't work: Hello $name (prints literally)
?>
```

### 🎬 Real-World Example: Employee Profile

```php
<?php
    $employeeId = 1001;
    $firstName = "Patrick";
    $lastName = "Arlan";
    $department = "Engineering";
    $salary = 55000;
    
    echo "===== EMPLOYEE PROFILE =====\n";
    echo "ID: $employeeId\n";
    echo "Name: $firstName $lastName\n";
    echo "Department: $department\n";
    echo "Salary: \$$salary\n";
    echo "=============================\n";
?>
```

**Output:**
```
===== EMPLOYEE PROFILE =====
ID: 1001
Name: Patrick Arlan
Department: Engineering
Salary: $55000
=============================
```

---

## Lesson 2.3: PHP Functions — Reusable Code Blocks

### 🧠 The Concept

A function is a **recipe** you write once, then use many times. Don't repeat code — use functions.

**Recipe analogy:**
- **Function definition:** "Here's how to make a cake"
- **Function call:** "Make me a cake" (the function does the work)

### 📝 Basic Function

```php
<?php
    // Define the function (write the recipe)
    function greet($name) {
        return "Hello, $name!";
    }
    
    // Call the function (use the recipe)
    echo greet("Patrick");  // Hello, Patrick!
    echo greet("Maria");    // Hello, Maria!
?>
```

**Reading Like English:**
- "Define a function called greet that takes a parameter name"
- "Return the text Hello, plus name, plus exclamation mark"
- "Call greet with Patrick, it returns and displays Hello, Patrick!"
- "Call greet with Maria, it returns and displays Hello, Maria!"

### 📝 Function with Multiple Parameters

```php
<?php
    function calculateBonus($salary, $percentage) {
        $bonus = $salary * ($percentage / 100);
        return $bonus;
    }
    
    $bonus1 = calculateBonus(50000, 10);   // 5000
    $bonus2 = calculateBonus(60000, 15);   // 9000
    
    echo "Bonus 1: $" . $bonus1 . "\n";
    echo "Bonus 2: $" . $bonus2 . "\n";
?>
```

**Output:**
```
Bonus 1: $5000
Bonus 2: $9000
```

### 📝 Function with Default Parameters

Sometimes you want a **default value** if the caller doesn't provide one:

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

### 📝 Function That Doesn't Return (Void)

Some functions just **do something**, not return something:

```php
<?php
    function printPaycheck($name, $amount) {
        echo "===== PAYCHECK =====\n";
        echo "Employee: $name\n";
        echo "Amount: \$$amount\n";
        echo "====================\n";
        // No return statement
    }
    
    printPaycheck("Patrick", 5000);
?>
```

**Output:**
```
===== PAYCHECK =====
Employee: Patrick
Amount: $5000
====================
```

### 🎬 Real-World Example: Salary Calculator

```php
<?php
    // Function to calculate net salary after tax
    function calculateNetSalary($grossSalary, $taxRate = 0.15) {
        $tax = $grossSalary * $taxRate;
        $netSalary = $grossSalary - $tax;
        return $netSalary;
    }
    
    // Function to calculate bonus
    function calculateBonus($salary) {
        return $salary * 0.10;  // 10% bonus
    }
    
    $grossSalary = 50000;
    $netSalary = calculateNetSalary($grossSalary);
    $bonus = calculateBonus($grossSalary);
    
    echo "Gross Salary: \$$grossSalary\n";
    echo "Tax (15%): \$" . ($grossSalary - $netSalary) . "\n";
    echo "Net Salary: \$$netSalary\n";
    echo "Bonus: \$$bonus\n";
    echo "Total (Net + Bonus): \$" . ($netSalary + $bonus) . "\n";
?>
```

**Output:**
```
Gross Salary: $50000
Tax (15%): $7500
Net Salary: $42500
Bonus: $5000
Total (Net + Bonus): $47500
```

---

## Lesson 2.4: PHP Arrays & Loops — Storing & Processing Multiple Items

### 🧠 The Concept

Arrays store multiple items. Loops process each item one at a time.

**Analogy:** An array is a **mailbox with multiple compartments**. A loop is **checking each compartment one by one**.

### 📝 Simple Array (Indexed)

```php
<?php
    $employees = array("Patrick", "Maria", "Juan", "Rosa");
    
    echo $employees[0];  // Patrick
    echo $employees[1];  // Maria
    echo $employees[2];  // Juan
    echo $employees[3];  // Rosa
?>
```

**Index starts at 0**, not 1.

### 📝 Loop Through Array (Foreach)

Instead of accessing each item manually, use `foreach`:

```php
<?php
    $employees = array("Patrick", "Maria", "Juan", "Rosa");
    
    foreach ($employees as $name) {
        echo "Employee: $name\n";
    }
?>
```

**Reading Like English:**
- "For each employee in the employees array, call it name"
- "Print Employee: plus the name"
- "Keep going until all are done"

**Output:**
```
Employee: Patrick
Employee: Maria
Employee: Juan
Employee: Rosa
```

### 📝 Associative Array (Key-Value Pairs)

Instead of numbers as index, use meaningful names as keys:

```php
<?php
    $employee = array(
        "id" => 1001,
        "name" => "Patrick",
        "department" => "Engineering",
        "salary" => 55000
    );
    
    echo "ID: " . $employee["id"] . "\n";
    echo "Name: " . $employee["name"] . "\n";
    echo "Department: " . $employee["department"] . "\n";
    echo "Salary: $" . $employee["salary"] . "\n";
?>
```

**Output:**
```
ID: 1001
Name: Patrick
Department: Engineering
Salary: $55000
```

**This is much easier to read than remembering index numbers!**

### 📝 Loop Through Associative Array

```php
<?php
    $employee = array(
        "name" => "Patrick",
        "age" => 25,
        "department" => "Engineering"
    );
    
    foreach ($employee as $key => $value) {
        echo "$key: $value\n";
    }
?>
```

**Reading Like English:**
- "For each item in employee, call the key 'key' and value 'value'"
- "Print key: plus value"

**Output:**
```
name: Patrick
age: 25
department: Engineering
```

### 📝 Array of Arrays (Nested)

Store multiple employees in one array:

```php
<?php
    $employees = array(
        array("name" => "Patrick", "salary" => 50000),
        array("name" => "Maria", "salary" => 55000),
        array("name" => "Juan", "salary" => 52000)
    );
    
    foreach ($employees as $emp) {
        echo "Name: " . $emp["name"] . ", Salary: $" . $emp["salary"] . "\n";
    }
?>
```

**Output:**
```
Name: Patrick, Salary: $50000
Name: Maria, Salary: $55000
Name: Juan, Salary: $52000
```

### 🎬 Real-World Example: Employee Report

```php
<?php
    $employees = array(
        array("name" => "Patrick", "department" => "Engineering", "salary" => 55000),
        array("name" => "Maria", "department" => "HR", "salary" => 50000),
        array("name" => "Juan", "department" => "Engineering", "salary" => 52000)
    );
    
    $totalSalary = 0;
    
    echo "===== EMPLOYEE REPORT =====\n";
    foreach ($employees as $emp) {
        echo "Name: " . $emp["name"] . "\n";
        echo "Dept: " . $emp["department"] . "\n";
        echo "Salary: $" . $emp["salary"] . "\n";
        echo "---\n";
        
        $totalSalary += $emp["salary"];
    }
    echo "Total Salary Budget: $" . $totalSalary . "\n";
?>
```

**Output:**
```
===== EMPLOYEE REPORT =====
Name: Patrick
Dept: Engineering
Salary: $55000
---
Name: Maria
Dept: HR
Salary: $50000
---
Name: Juan
Dept: Engineering
Salary: $52000
---
Total Salary Budget: $157000
```

---

## Lesson 2.5: PHP & HTML — Working with Web Forms

### 🧠 The Concept

HTML forms **collect data from users**. PHP **receives and processes** that data.

**Analogy:** 
- **HTML form:** A paper form the customer fills out
- **PHP:** The person reading the filled form and doing something with it

### 📝 Basic Form (HTML)

```html
<form method="POST" action="process.php">
    <input type="text" name="name" placeholder="Enter your name">
    <input type="email" name="email" placeholder="Enter your email">
    <button type="submit">Submit</button>
</form>
```

**Reading Like English:**
- "Create a form that sends data using POST method to process.php"
- "Input field for text named 'name'"
- "Input field for email named 'email'"
- "Submit button"

### 📝 PHP Receives Form Data

In `process.php`:

```php
<?php
    if ($_POST) {  // Check if form was submitted
        $name = $_POST["name"];      // Get value from name field
        $email = $_POST["email"];    // Get value from email field
        
        echo "Thank you, $name!\n";
        echo "We received your email: $email\n";
    }
?>
```

**Reading Like English:**
- "If POST request was made (form submitted)"
- "Get the value from form field 'name' and store in variable name"
- "Get the value from form field 'email' and store in variable email"
- "Print confirmation message"

### 📝 How It Works (Step by Step)

1. User opens form in browser
2. User types name and email
3. User clicks Submit button
4. Browser sends data to `process.php` using POST
5. PHP receives data in `$_POST` array
6. PHP processes the data and outputs response
7. Browser displays the response

```
[Browser]
    ↓ (User fills form)
[Form with data]
    ↓ (Click Submit)
[Send to Server]
    ↓
[PHP process.php]
    ↓ (Process data)
[PHP outputs response]
    ↓
[Browser displays]
```

### 📝 Processing Form Data

```php
<?php
    if ($_POST) {
        $name = $_POST["name"];
        $position = $_POST["position"];
        $salary = $_POST["salary"];
        
        // Calculate bonus
        $bonus = $salary * 0.10;
        
        echo "===== OFFER LETTER =====\n";
        echo "Dear $name,\n";
        echo "Congratulations! You're hired as a $position\n";
        echo "Starting Salary: \$$salary\n";
        echo "Annual Bonus: \$$bonus\n";
        echo "=======================\n";
    } else {
        echo "No form submitted yet.";
    }
?>
```

### 🎬 Real-World Example: Employee Registration

**HTML Form (registration.html):**
```html
<form method="POST" action="register.php">
    <input type="text" name="firstName" placeholder="First Name" required>
    <input type="text" name="lastName" placeholder="Last Name" required>
    <input type="email" name="email" placeholder="Email" required>
    <input type="text" name="department" placeholder="Department" required>
    <button type="submit">Register</button>
</form>
```

**PHP Processing (register.php):**
```php
<?php
    if ($_POST) {
        $firstName = $_POST["firstName"];
        $lastName = $_POST["lastName"];
        $email = $_POST["email"];
        $department = $_POST["department"];
        $fullName = $firstName . " " . $lastName;
        
        echo "===== REGISTRATION SUCCESSFUL =====\n";
        echo "Name: $fullName\n";
        echo "Email: $email\n";
        echo "Department: $department\n";
        echo "====================================\n";
        echo "Welcome to the company, $firstName!\n";
    }
?>
```

---

## 📝 COMPREHENSIVE ACTIVITIES

### Activity 1: Output Variables

**Hint:** Use `echo` to display variables. Remember string concatenation with `.` or use interpolation in double quotes.

**Task:**
Create a PHP script that:
1. Creates 3 variables: `$name`, `$position`, `$department`
2. Assign values to each (about yourself or someone you know)
3. Output them with labels like: "Name: [value]"

**Expected Output (example):**
```
Name: Patrick
Position: Software Developer
Department: Engineering
```

---

### Activity 2: Create & Use a Function

**Hint:** Function syntax: `function name($parameter) { ... return $value; }`. Call it with: `name($value)`.

**Task:**
Create a PHP script with a function that:
1. Takes `$salary` as parameter
2. Calculates net salary after 15% tax deduction
3. Returns the net salary
4. Test the function with salary = 50000

**Expected Output (example):**
```
Gross Salary: $50000
Tax (15%): $7500
Net Salary: $42500
```

**Hints for calculation:**
- Tax = salary × 0.15
- Net = salary - tax

---

### Activity 3: Loop Through Array

**Hint:** Use `foreach` loop. Syntax: `foreach ($array as $item) { ... }`

**Task:**
Create a PHP script that:
1. Creates an array of 5 job titles
2. Loops through and outputs each one with "Position: [title]"

**Expected Output (example):**
```
Position: Software Developer
Position: Project Manager
Position: Data Analyst
Position: UI Designer
Position: DevOps Engineer
```

---

### Activity 4: Associative Array

**Hint:** Use `array("key" => "value", ...)` syntax. Access with `$array["key"]`.

**Task:**
Create a PHP script that:
1. Creates an associative array for one employee with keys: `id`, `name`, `email`, `phone`
2. Assign realistic values
3. Output each key-value pair with labels

**Expected Output (example):**
```
Employee ID: 1001
Name: Patrick Arlan
Email: patrick@company.com
Phone: 555-1234
```

---

### Activity 5: Array of Employees (Challenge)

**Hint:** Create an array of arrays. Loop through outer array, then access inner array keys.

**Task:**
Create a PHP script with:
1. An array of 3 employees, each with: `name`, `department`, `salary`
2. Loop through each employee and display their info
3. Calculate and display the total salary spending

**Expected Output (example):**
```
Name: Patrick, Department: Engineering, Salary: $50000
Name: Maria, Department: HR, Salary: $45000
Name: Juan, Department: Engineering, Salary: $52000
---
Total Salary Budget: $147000
```

---

### Activity 6: Form Processing (Challenge)

**Hint:** Use HTML form with POST method, then PHP `if ($_POST)` to check if submitted. Access values with `$_POST["fieldName"]`.

**Task:**
Create TWO files:

1. **form.html** - Create an HTML form with:
   - Input field for `name`
   - Input field for `age`
   - Submit button

2. **process.php** - PHP script that:
   - Checks if form was submitted
   - Gets name and age from form
   - Outputs: "Hello [name], you are [age] years old"

**Expected Output (example):**
```
Hello Patrick, you are 25 years old
```

**File structure hints:**
- Form action should point to `process.php`
- Form method should be `POST`
- In PHP, check `if ($_POST)`

---

## 🧠 Key Concepts Summary

| Concept | Purpose | Example |
|---------|---------|---------|
| **echo** | Display output | `echo "Hello"` |
| **String Concatenation** | Join strings with `.` | `"Hello " . $name` |
| **String Interpolation** | Use variables in double quotes | `"Hello $name"` |
| **Function** | Reusable code block | `function greet($name) { return "Hi $name"; }` |
| **Array** | Store multiple items by index | `$items = array(1, 2, 3)` |
| **Associative Array** | Store items with named keys | `$emp = array("name" => "Patrick")` |
| **Foreach Loop** | Process each array item | `foreach ($array as $item) { ... }` |
| **$_POST** | Receive form data | `$name = $_POST["name"]` |

---

## 💡 Common Mistakes to Avoid

1. **Forgetting `<?php` and `?>`**
   - ❌ `echo "Hello";` (not in PHP tags)
   - ✅ `<?php echo "Hello"; ?>` (proper)

2. **Single vs Double Quotes**
   - ❌ `echo 'Hello $name';` (doesn't interpolate)
   - ✅ `echo "Hello $name";` (interpolates)

3. **Array Index Starting at 0**
   - ❌ `$arr[1]` for the first item
   - ✅ `$arr[0]` for the first item

4. **Missing Return in Function**
   - ❌ Function calculates but doesn't return
   - ✅ Always `return $result` if needed

5. **Forgetting Field Names in Forms**
   - ❌ `<input type="text">` (no name attribute)
   - ✅ `<input type="text" name="username">` (has name)

---

## 🎯 Next Steps

1. ✅ Complete all 6 activities
2. ✅ Test each one in a PHP environment (local server or online PHP IDE)
3. ✅ Make sure you understand HOW each part works, not just copy-paste
4. ✅ Move to Unit 3 (MySQL) when all activities pass

**You're building real website skills now!** 💪

---

## ✅ UNIT 2 ACTIVITY COMPLETION SUMMARY

### Activity Validation Results

| Activity | Task | Status |
|----------|------|--------|
| 1 | Output Variables | [x] CORRECT |
| 2 | Create & Use a Function | [x] CORRECT |
| 3 | Loop Through Array | [x] CORRECT |
| 4 | Associative Array | [x] CORRECT |
| 5 | Array of Employees (Challenge) | [x] CORRECT |
| 6 | Form Processing (Challenge) | [x] CORRECT |

---

### 🎯 Overall Assessment: ✅ ALL ACTIVITIES PASSED - UNIT 2 COMPLETE

**Validation Notes:**

✅ **Activity 1: Output Variables**
- Creates 3 variables with realistic values (Alice Johnson, Software Engineer, IT)
- Uses both string interpolation and concatenation properly
- Outputs with correct labels
- **CORRECT - Uses both interpolation ("Name: $name") and concatenation ("Department: " . $department)**

✅ **Activity 2: Create & Use a Function**
- Function `calculateNetSalary()` correctly defined with default parameter (15% tax)
- Takes `$salary` parameter
- Correctly calculates 15% tax deduction
- Returns array with both tax and net salary values
- Tests with $salary = 50000 showing $7,500 tax and $42,500 net
- Uses `number_format()` for proper currency display
- **CORRECT - All requirements met with proper function syntax and calculations**

✅ **Activity 3: Loop Through Array**
- Array created with 5 job titles (HR, ENGR, IT, SL, MNG)
- Uses `foreach` loop correctly
- Outputs each position with "POSITION:" label
- **CORRECT - Proper foreach syntax and array access**

✅ **Activity 4: Associative Array**
- Associative array created with all required keys: id, name, email, phone
- Assigns realistic values (Patrick, patrick@ex.com, 09694831145)
- Uses nested foreach loops to iterate through array and key-value pairs
- Outputs each key-value pair with labels
- **CORRECT - Proper associative array syntax and nested loop implementation**

✅ **Activity 5: Array of Employees (Challenge)**
- Array of 3 employees created with all required fields (Name, Department, Salary)
- Nested foreach loops properly display each employee's information
- Conditional check for Salary field uses `number_format()` for currency
- Total salary calculated correctly using `+=` operator
- Output includes formatted currency and total budget
- **CORRECT - Complex nested loops, conditionals, and calculations working perfectly**

✅ **Activity 6: Form Processing (Challenge)**
- Checks `if ($_POST)` to verify form submission
- Correctly retrieves form data using `$_POST["name"]` and `$_POST["age"]`
- Outputs correct format: "Hello [name], you are [age] years old"
- form.html created with proper POST method and action pointing to lesson2.php
- Successfully tested with form submission (Patrick, age 22)
- **CORRECT - Form integration working, data submission and retrieval successful**

---

### 📊 Skills Mastered

- ✅ Variables and data types (string, int, float, bool)
- ✅ String concatenation and interpolation in double quotes
- ✅ Function definition with parameters and default values
- ✅ Function return values and return types (returning arrays)
- ✅ Indexed arrays and foreach loops
- ✅ Associative arrays with key-value pairs
- ✅ Nested arrays and nested loops
- ✅ Built-in functions like `number_format()`, `date()`
- ✅ HTML form creation with POST method
- ✅ PHP form processing with `$_POST` superglobal
- ✅ Conditional statements within loops
- ✅ Mathematical operations and calculations

---

### 🚀 Ready for: **Unit 3 (MySQL) - Databases**

You have successfully completed Unit 2: PHP Fundamentals! You understand how to:
- Write PHP code with proper syntax
- Use variables and functions effectively
- Work with arrays (indexed and associative)
- Process HTML form data from users
- Format output for web display

**Next lesson will teach you how to store and retrieve data using MySQL databases!** 💪
