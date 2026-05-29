# 🚀 LESSON 1: BASIC PROGRAMMING LOGIC - CHEAT SHEET

## 6 CORE CONCEPTS (Master These!)

### 1️⃣ VARIABLES - Store Values
```php
$name = "Patrick";          // Text (String)
$age = 25;                  // Whole number (Integer)
$salary = 50000.50;         // Decimal (Float)
$isActive = true;           // True/False (Boolean)
$nothing = null;            // Empty/Nothing
```

---

### 2️⃣ OPERATIONS - Math & Comparisons

#### Math Operators
```php
$sum = 10 + 3;         // 13
$diff = 10 - 3;        // 7
$product = 10 * 3;     // 30
$quotient = 10 / 3;    // 3.33
$remainder = 10 % 3;   // 1 (modulo)
$power = 10 ** 2;      // 100
```

#### Comparison (Returns true/false)
```php
$equal = ($x == 5);     // Equal to?
$notEqual = ($x != 5);  // Not equal?
$greater = ($x > 5);    // Greater than?
$less = ($x < 5);       // Less than?
$greaterEq = ($x >= 5); // Greater or equal?
$lessEq = ($x <= 5);    // Less or equal?
```

#### Logical Operations (Combine conditions)
```php
if ($dept == "Engineering" && $salary > 45000) {  // AND - both true
if ($dept == "HR" || $dept == "Engineering") {    // OR - at least one true
if (!$isActive) {                                   // NOT - reverse
```

---

### 3️⃣ CONDITIONALS - Make Decisions

#### Simple If/Else
```php
if ($age >= 18) {
    echo "Adult";
} else {
    echo "Minor";
}
```

#### Multiple Conditions (else if)
```php
if ($score >= 90) {
    echo "Grade A";
} else if ($score >= 80) {
    echo "Grade B";
} else if ($score >= 70) {
    echo "Grade C";
} else {
    echo "Grade F";
}
```

#### With Conditions
```php
if ($dept == "Eng" && $salary > 45000) {
    echo "Eligible";
} else if ($dept == "HR" || $dept == "Research") {
    echo "Tech track";
} else {
    echo "Not eligible";
}
```

---

### 4️⃣ LOOPS - Repeat Actions

#### For Loop (Know the count)
```php
for ($i = 1; $i <= 5; $i++) {
    echo "Count: $i";  // Prints 1, 2, 3, 4, 5
}
// Syntax: for (start; condition; increment)
```

#### While Loop (Unknown count)
```php
$count = 0;
while ($count < 5) {
    echo "Count: $count";
    $count++;
}
```

#### Foreach Loop (Loop through array)
```php
$employees = array("Patrick", "Maria", "Juan");
foreach ($employees as $name) {
    echo "Employee: $name";
}
```

---

### 5️⃣ ARRAYS - Store Multiple Values

#### Indexed Array (Number positions)
```php
$employees = array("Patrick", "Maria", "Juan", "Rosa");

echo $employees[0];  // Patrick (first)
echo $employees[2];  // Juan (third)

// Loop through
foreach ($employees as $name) {
    echo $name;
}

// Count items
$count = count($employees);  // 4
```

#### Associative Array (Named keys)
```php
$employee = array(
    "name" => "Patrick",
    "age" => 25,
    "department" => "Engineering",
    "salary" => 50000
);

echo $employee["name"];       // Patrick
echo $employee["department"]; // Engineering
```

#### Array of Arrays (Database-like)
```php
$employees = array(
    array("id" => 1, "name" => "Patrick", "salary" => 50000),
    array("id" => 2, "name" => "Maria", "salary" => 55000)
);

// Access
echo $employees[0]["name"];  // Patrick
echo $employees[1]["salary"]; // 55000

// Loop
foreach ($employees as $emp) {
    echo $emp["name"] . ": " . $emp["salary"];
}
```

---

### 6️⃣ FUNCTIONS - Reusable Code

#### Simple Function
```php
function greet($name) {
    return "Hello, " . $name;
}

echo greet("Patrick");  // Hello, Patrick
```

#### Multiple Parameters
```php
function calculateBonus($salary, $percentage) {
    return $salary * ($percentage / 100);
}

$bonus = calculateBonus(50000, 10);  // 5000
```

#### Default Parameters
```php
function displayEmployee($name, $dept = "Unassigned") {
    echo "Name: $name, Dept: $dept";
}

displayEmployee("Patrick", "Engineering");  // Both shown
displayEmployee("Maria");                   // Dept uses default
```

#### Function with No Return (void)
```php
function printInfo($name, $salary) {
    echo "Name: $name\n";
    echo "Salary: $salary\n";
}

printInfo("Patrick", 50000);  // Prints, doesn't return
```

---

## DATA TYPES AT A GLANCE

| Type | PHP | Java | MySQL | Example |
|------|-----|------|-------|---------|
| Text | `string` | `String` | `VARCHAR(100)` | "Patrick" |
| Whole Number | `int` | `int` | `INT` | 25 |
| Decimal | `float`/`double` | `double` | `DECIMAL(10,2)` | 50000.50 |
| True/False | `bool` | `boolean` | `BOOLEAN` | true/false |
| Empty | `null` | `null` | `NULL` | null |

---

## QUICK SYNTAX CHEAT

### String Operations
```php
$firstName = "Patrick";
$lastName = "Arlan";
$fullName = $firstName . " " . $lastName;  // Concatenate with .
echo "My name is $fullName";               // Include variable in string
```

### Common Mistakes
```php
❌ $age = 18;        // Missing semicolon
✅ $age = 18;        // Correct

❌ if ($age = 18)    // Assignment (=), not comparison (==)
✅ if ($age == 18)   // Correct

❌ while ($i < 10)   // Infinite loop - i never changes
✅ while ($i < 10) { $i++; }  // Correct

❌ $arr[5]           // Index out of range on 5-item array (0-4)
✅ $arr[4]           // Correct - last item
```

---

## FLOW DIAGRAM

```
Program Start
    ↓
1. Create Variables (store data)
    ↓
2. Do Operations (math, compare)
    ↓
3. Use Conditionals (if/else - make decisions)
    ↓
4. Use Loops (for/while - repeat actions)
    ↓
5. Use Arrays (store multiple items)
    ↓
6. Use Functions (reuse code)
    ↓
Program End
```

---

## REAL-WORLD EXAMPLE: Employee Payroll

```php
<?php
    // 1. Variables - Define employee data
    $name = "Patrick";
    $salary = 50000;
    $yearsWorked = 5;
    $performanceRating = 4.5;
    
    // 2. Operations - Calculate values
    $monthlyPay = $salary / 12;
    $annualBonus = $salary * 0.10;
    
    // 3. Conditionals - Make decisions
    if ($yearsWorked >= 5 && $performanceRating >= 4.0) {
        $raisePercent = 0.10;
        $message = "Excellent! 10% raise";
    } else if ($yearsWorked >= 3) {
        $raisePercent = 0.07;
        $message = "Good performance. 7% raise";
    } else {
        $raisePercent = 0;
        $message = "No raise yet";
    }
    
    // 4. Loops - Process multiple employees
    $employees = array("Patrick", "Maria", "Juan");
    foreach ($employees as $emp) {
        echo "Processing: $emp\n";
    }
    
    // 5. Arrays - Store employee data
    $empData = array(
        "name" => "Patrick",
        "salary" => 50000,
        "department" => "Engineering"
    );
    
    // 6. Functions - Reuse code
    function calculateNetSalary($gross) {
        $tax = $gross * 0.15;
        return $gross - $tax;
    }
    
    $netPay = calculateNetSalary($salary);
    echo "Net Salary: $netPay";
?>
```

---

## QUICK REFERENCE: Loop Syntax

### For Loop
```php
for ($i = START; $i CONDITION; $i CHANGE)
    for ($i = 1; $i <= 10; $i++)  // 1 to 10
    for ($i = 0; $i < 5; $i++)    // 0 to 4
```

### While Loop
```php
while (CONDITION) {
    // code
    // must change something to eventually make CONDITION false
}
```

### Foreach Loop
```php
foreach (ARRAY as VARIABLE) {
    // use VARIABLE
}
```

---

## REMEMBER THIS!

1. **Variables** = Named storage boxes
2. **Operations** = Math or comparisons
3. **Conditionals** = "If this, then that"
4. **Loops** = "Repeat this X times"
5. **Arrays** = "Multiple items in one container"
6. **Functions** = "Reusable code blocks"

**Every program uses all 6 of these!** Once you master them, you can write ANY program in ANY language. 💪

---

## READING CODE AS ENGLISH

```php
if ($dept == "Engineering" && $salary > 45000) {
    echo "Eligible";
}
```

**Reading:** "If the department equals Engineering **AND** the salary is greater than 45000, then print Eligible"

```php
for ($i = 1; $i <= 10; $i++) {
    echo $i;
}
```

**Reading:** "Starting with i equals 1, while i is less than or equal to 10, print i and increase i by 1"

```php
foreach ($employees as $name) {
    echo $name;
}
```

**Reading:** "For each employee in the employees array, call it name and print it"

---

**Master these 6 concepts and you can learn any programming language!** 🚀
