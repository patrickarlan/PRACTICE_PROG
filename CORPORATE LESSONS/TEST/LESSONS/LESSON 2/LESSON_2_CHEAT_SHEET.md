# 📝 LESSON 2 CHEAT SHEET: PHP FUNDAMENTALS
## Quick Reference Guide for Job Application Exam

---

## 1️⃣ PHP BASICS

### Opening & Closing Tags
```php
<?php
    // Your code here
?>
```

### Echo (Output)
```php
<?php
    echo "Hello, World!\n";      // String with newline
    echo "Line 1", "Line 2";     // Multiple items
    echo 42;                     // Numbers
    echo true;                   // Booleans
?>
```

### Comments
```php
<?php
    // Single line comment
    /* Multi-line
       comment */
    # Hash comment
?>
```

---

## 2️⃣ VARIABLES & DATA TYPES

### Variable Declaration
```php
<?php
    $name = "Patrick";           // String
    $age = 25;                   // Integer
    $salary = 50000.50;          // Float/Double
    $isActive = true;            // Boolean
    $empty = null;               // Null (empty)
?>
```

### Reading Variables
```php
<?php
    echo $name;                  // Output: Patrick
    echo "Name: $name";          // Interpolation
    echo "Age: " . $age;         // Concatenation
?>
```

### String Operations
| Operation | Example | Output |
|-----------|---------|--------|
| **Concatenation** | `"Hello " . "World"` | `Hello World` |
| **Interpolation** | `"Name: $name"` | `Name: Patrick` |
| **Length** | `strlen("Hello")` | `5` |
| **Uppercase** | `strtoupper("hello")` | `HELLO` |
| **Lowercase** | `strtolower("HELLO")` | `hello` |
| **First char** | `$str[0]` | First character |

---

## 3️⃣ ARITHMETIC & COMPARISON

### Math Operators
```php
<?php
    $x = 10;
    $y = 3;
    
    echo $x + $y;      // 13 (Addition)
    echo $x - $y;      // 7  (Subtraction)
    echo $x * $y;      // 30 (Multiplication)
    echo $x / $y;      // 3.33... (Division)
    echo $x % $y;      // 1  (Modulo/Remainder)
    echo $x ** $y;     // 1000 (Exponent)
?>
```

### Comparison Operators
```php
<?php
    $a = 10;
    $b = 5;
    
    $a == $b;          // false (Equal to)
    $a != $b;          // true  (Not equal)
    $a > $b;           // true  (Greater than)
    $a < $b;           // false (Less than)
    $a >= $b;          // true  (Greater or equal)
    $a <= $b;          // false (Less or equal)
?>
```

### Logical Operators
```php
<?php
    $dept = "Engineering";
    $salary = 50000;
    
    // AND (&&) - Both must be true
    if ($dept == "Engineering" && $salary > 45000) {
        echo "Eligible for bonus";
    }
    
    // OR (||) - At least one must be true
    if ($dept == "HR" || $dept == "Engineering") {
        echo "Technical track";
    }
    
    // NOT (!) - Reverse the condition
    if (!false) {
        echo "This runs";
    }
?>
```

---

## 4️⃣ CONDITIONALS (if/else)

### Simple If
```php
<?php
    if ($age >= 18) {
        echo "Adult";
    }
?>
```

### If/Else
```php
<?php
    if ($age >= 18) {
        echo "Adult";
    } else {
        echo "Minor";
    }
?>
```

### If/Else If/Else
```php
<?php
    if ($score >= 90) {
        echo "Grade: A";
    } else if ($score >= 80) {
        echo "Grade: B";
    } else if ($score >= 70) {
        echo "Grade: C";
    } else {
        echo "Grade: F";
    }
?>
```

### Combined Conditions
```php
<?php
    $dept = "Engineering";
    $yearsExp = 5;
    
    if ($dept == "Engineering" && $yearsExp >= 3) {
        echo "Senior role";
    } else if ($dept == "HR" || $yearsExp >= 5) {
        echo "Leadership eligible";
    } else {
        echo "Standard role";
    }
?>
```

---

## 5️⃣ ARRAYS & LOOPS

### Indexed Array
```php
<?php
    $employees = array("Patrick", "Maria", "Juan");
    
    echo $employees[0];   // Patrick
    echo $employees[1];   // Maria
    echo $employees[2];   // Juan
    
    echo count($employees);  // 3 (Get array length)
?>
```

### Associative Array (Key-Value)
```php
<?php
    $employee = array(
        "name" => "Patrick",
        "age" => 25,
        "department" => "Engineering",
        "salary" => 50000
    );
    
    echo $employee["name"];        // Patrick
    echo $employee["salary"];      // 50000
    
    // Check if key exists
    if (isset($employee["email"])) {
        echo "Email found";
    }
?>
```

### Array of Arrays (Nested)
```php
<?php
    $employees = array(
        array("name" => "Patrick", "salary" => 50000),
        array("name" => "Maria", "salary" => 55000),
        array("name" => "Juan", "salary" => 52000)
    );
    
    echo $employees[0]["name"];    // Patrick
    echo $employees[1]["salary"];  // 55000
?>
```

### Foreach Loop (Most Common)
```php
<?php
    $jobs = array("HR", "Engineering", "IT", "Sales");
    
    foreach ($jobs as $job) {
        echo "Position: $job\n";
    }
    // Output: Position: HR, Position: Engineering, etc.
    
    // With key-value pairs
    $employee = array("name" => "Patrick", "age" => 25);
    foreach ($employee as $key => $value) {
        echo "$key: $value\n";
    }
    // Output: name: Patrick, age: 25
?>
```

### For Loop
```php
<?php
    for ($i = 1; $i <= 5; $i++) {
        echo "Count: $i\n";
    }
    // Output: Count: 1, Count: 2, ... Count: 5
?>
```

### While Loop
```php
<?php
    $count = 0;
    while ($count < 5) {
        echo "Count: $count\n";
        $count++;
    }
    // Output: Count: 0, Count: 1, Count: 2, Count: 3, Count: 4
?>
```

### Common Array Functions
```php
<?php
    $arr = array(5, 2, 8, 1);
    
    count($arr);           // 4 (Length)
    array_push($arr, 10);  // Add to end
    array_pop($arr);       // Remove from end
    sort($arr);            // Sort ascending
    rsort($arr);           // Sort descending
    in_array(5, $arr);     // Check if exists (true/false)
    implode(", ", $arr);   // Join with separator
    explode(",", $str);    // Split string to array
?>
```

---

## 6️⃣ FUNCTIONS

### Basic Function
```php
<?php
    function greet($name) {
        return "Hello, $name!";
    }
    
    echo greet("Patrick");  // Hello, Patrick!
?>
```

### Function with Multiple Parameters
```php
<?php
    function calculateBonus($salary, $percentage) {
        $bonus = $salary * ($percentage / 100);
        return $bonus;
    }
    
    echo calculateBonus(50000, 10);  // 5000
?>
```

### Function with Default Parameters
```php
<?php
    function displayEmployee($name, $dept = "Unassigned") {
        return "$name works in $dept";
    }
    
    echo displayEmployee("Patrick", "Engineering");  // Patrick works in Engineering
    echo displayEmployee("Maria");                   // Maria works in Unassigned
?>
```

### Function Returning Array
```php
<?php
    function calculateSalary($salary) {
        $tax = $salary * 0.15;
        $net = $salary - $tax;
        
        return array(
            "gross" => $salary,
            "tax" => $tax,
            "net" => $net
        );
    }
    
    $result = calculateSalary(50000);
    echo $result["net"];  // 42500
?>
```

### Function with Void (No Return)
```php
<?php
    function printPaycheck($name, $amount) {
        echo "===== PAYCHECK =====\n";
        echo "Employee: $name\n";
        echo "Amount: \$$amount\n";
    }
    
    printPaycheck("Patrick", 5000);
?>
```

### Built-in Functions
```php
<?php
    // String functions
    strlen("Hello");              // 5
    strtoupper("hello");          // HELLO
    substr("Hello", 0, 3);        // Hel
    str_replace("old", "new", $str);
    
    // Number functions
    abs(-10);                     // 10
    round(3.7);                   // 4
    floor(3.9);                   // 3
    ceil(3.1);                    // 4
    rand(1, 10);                  // Random number 1-10
    number_format(50000, 2);      // 50000.00
    
    // Array functions
    count($arr);                  // Array length
    array_push($arr, $value);     // Add to end
    implode(", ", $arr);          // Join array to string
    
    // Date/Time
    date("Y-m-d");                // 2026-05-31
    date("H:i:s");                // 14:30:45
    time();                       // Current timestamp
?>
```

---

## 7️⃣ HTML FORMS & PHP

### HTML Form
```html
<form method="POST" action="process.php">
    <input type="text" name="name" placeholder="Your name" required>
    <input type="email" name="email" placeholder="Your email" required>
    <input type="number" name="age" placeholder="Your age" required>
    <textarea name="message" rows="5"></textarea>
    <button type="submit">Submit</button>
</form>
```

### Receiving Form Data in PHP
```php
<?php
    if ($_POST) {  // Check if form was submitted
        $name = $_POST["name"];     // Get form field
        $email = $_POST["email"];
        $age = $_POST["age"];
        
        echo "Hello $name, welcome!";
    } else {
        echo "Please fill out the form above.";
    }
?>
```

### Form Data with Validation
```php
<?php
    if ($_POST) {
        // Get form data
        $name = isset($_POST["name"]) ? $_POST["name"] : "";
        $age = isset($_POST["age"]) ? $_POST["age"] : 0;
        
        // Validate
        if (empty($name)) {
            echo "Name is required!";
        } else if ($age < 18) {
            echo "Must be 18 or older";
        } else {
            echo "Hello $name, you are $age years old";
        }
    }
?>
```

### Superglobals
```php
<?php
    $_POST;       // Form data from POST requests
    $_GET;        // URL parameters (form data from GET)
    $_SERVER;     // Server info (IP, method, etc.)
    $_SESSION;    // Session variables
    $_COOKIE;     // Cookie values
    $_FILES;      // Uploaded files
?>
```

---

## 8️⃣ QUICK SYNTAX REFERENCE

### Variable Rules
```php
<?php
    $name = "value";           // Starts with $
    $my_var = "value";         // Underscores allowed
    $myVar = "value";          // Camel case OK
    $_var = "value";           // Can start with underscore
    
    // ❌ WRONG
    // $123 = "value";          // Can't start with number
    // $my-var = "value";       // Hyphens not allowed
    // my_var = "value";        // Must have $
?>
```

### Data Type Casting
```php
<?php
    $string = "123";
    $int = (int)$string;       // Convert to integer
    $float = (float)"45.67";   // Convert to float
    $bool = (bool)"yes";       // Convert to boolean
    $array = (array)$value;    // Convert to array
?>
```

### Increment & Decrement
```php
<?php
    $count = 5;
    
    $count++;        // 6 (Increment)
    $count--;        // 5 (Decrement)
    $count += 5;     // 10 (Add 5)
    $count -= 3;     // 7 (Subtract 3)
    $count *= 2;     // 14 (Multiply by 2)
    $count /= 2;     // 7 (Divide by 2)
?>
```

---

## 9️⃣ COMMON PATTERNS

### Pattern 1: Check & Process Form
```php
<?php
    if ($_POST) {
        $name = $_POST["name"];
        $age = $_POST["age"];
        
        if ($age >= 18) {
            echo "Welcome, $name";
        } else {
            echo "You must be 18+";
        }
    } else {
        echo "Submit the form above";
    }
?>
```

### Pattern 2: Loop Through Employee Array
```php
<?php
    $employees = array(
        array("name" => "Patrick", "salary" => 50000),
        array("name" => "Maria", "salary" => 55000)
    );
    
    $total = 0;
    foreach ($employees as $emp) {
        echo "Name: " . $emp["name"] . "\n";
        $total += $emp["salary"];
    }
    echo "Total: $" . number_format($total, 2);
?>
```

### Pattern 3: Function with Calculation
```php
<?php
    function calculateNetSalary($salary, $taxRate = 0.15) {
        $tax = $salary * $taxRate;
        $net = $salary - $tax;
        
        return array(
            "gross" => $salary,
            "tax" => $tax,
            "net" => $net
        );
    }
    
    $result = calculateNetSalary(50000);
    echo "Tax: $" . number_format($result["tax"], 2);
    echo "Net: $" . number_format($result["net"], 2);
?>
```

### Pattern 4: Conditional in Loop
```php
<?php
    $scores = array(
        array("name" => "Patrick", "score" => 85),
        array("name" => "Maria", "score" => 92),
        array("name" => "Juan", "score" => 78)
    );
    
    foreach ($scores as $student) {
        echo $student["name"] . ": ";
        if ($student["score"] >= 90) {
            echo "A";
        } else if ($student["score"] >= 80) {
            echo "B";
        } else {
            echo "C";
        }
        echo "\n";
    }
?>
```

---

## 🔟 THINGS TO REMEMBER FOR EXAM

1. **Variables start with `$`** → `$name`, not `name`
2. **Arrays start at index 0** → `$arr[0]` is first item, not `$arr[1]`
3. **Foreach is most common loop** → Use `foreach` for arrays, `for` for counting
4. **Double quotes for interpolation** → `"Hello $name"` works, `'Hello $name'` doesn't
5. **Functions need return statement** → `return $value;` to send data back
6. **Form method should be POST** → `<form method="POST" action="file.php">`
7. **Access form data with $_POST** → `$_POST["fieldName"]`
8. **Check if array key exists** → Use `isset()` or `if ($key)`
9. **Use number_format() for money** → `number_format($amount, 2)` → "50,000.00"
10. **Use \n for new lines in output** → `echo "Line 1\n"; echo "Line 2\n";`

---

## 📌 EXAM QUICK TIPS

**Q: How do I create a variable?**
```php
$variableName = value;
```

**Q: How do I output something?**
```php
echo "Text here";
```

**Q: How do I loop through an array?**
```php
foreach ($array as $item) {
    // Do something with $item
}
```

**Q: How do I create a function?**
```php
function myFunction($param) {
    return $result;
}
```

**Q: How do I get form data?**
```php
if ($_POST) {
    $value = $_POST["fieldName"];
}
```

**Q: How do I check a condition?**
```php
if (condition) {
    // Do this
} else {
    // Do that
}
```

---

**Good luck on your exam! 🚀 You've got this!**
