# 🧠 CODE SNIPPET DRILLS — Q5, Q11, Q13, Q14
## How to Start a Coding Problem — Step-by-Step

> **How to use this file:**
> For each question, read the **"How to think about it"** section first,
> then read the code **line by line** following the numbered steps in the comments.

---

## Q5 — PHP: Salary Category Function

### How to think about it
```
1. I need a FUNCTION → write: function name($parameter)
2. I need to CHECK CONDITIONS → write if / else if / else
3. I need to SEND A RESULT BACK → write: return "value"
4. I need to CALL it and DISPLAY it → write: echo functionName(value)
```

### The Code
```php
<?php

// STEP 1 — Define the function
//   Syntax: function functionName($param) { ... }
//   $salary is whatever value we pass in when calling it
function salaryCategory($salary) {

    // STEP 2 — Write your conditions, MOST SPECIFIC first
    //   Important: > 50000 must come BEFORE >= 30000
    //   Because if salary is 60000, both would match — we want the right one first

    if ($salary > 50000) {
        return "High";           // STEP 3 — return sends result back

    } else if ($salary >= 30000) {
        return "Mid";            // catches 30000 up to 50000

    } else {
        return "Low";            // anything below 30000
    }
}

// STEP 4 — Call the function and display the result
echo salaryCategory(75000) . "\n";   // High
echo salaryCategory(45000) . "\n";   // Mid
echo salaryCategory(20000) . "\n";   // Low
echo salaryCategory(50000) . "\n";   // Mid  ← 50000 is NOT > 50000!
echo salaryCategory(30000) . "\n";   // Mid  ← 30000 IS >= 30000

?>
```

### ⚠️ Boundary values to remember
| Salary | Category | Why |
|--------|----------|-----|
| 50001 | High | > 50000 ✅ |
| 50000 | Mid | NOT > 50000 ❌ falls to next |
| 30000 | Mid | >= 30000 ✅ |
| 29999 | Low | < 30000, falls to else |

---

## Q11 — Java: getHighest Method (Find Highest Salary)

### How to think about it
```
1. I need a METHOD → write the signature: public static double name(double[] param)
2. I need a STARTING POINT → assume first item is the max
3. I need to LOOP and COMPARE → for loop from index 1
4. I need to UPDATE when I find a bigger one → if (x > max) { max = x }
5. I need to RETURN the result → return max
```

### The Code
```java
public class SalaryFinder {

    // STEP 1 — Write the method signature
    //   public  → anyone can call it
    //   static  → needed to call from main without creating an object
    //   double  → return type (we return a decimal number)
    //   double[] salaries → input is an array of decimal numbers
    public static double getHighest(double[] salaries) {

        // STEP 2 — Start by assuming the first element is the biggest
        //   We need a baseline — array[0] is always a safe starting point
        double max = salaries[0];

        // STEP 3 — Loop from index 1 (skip 0, already set as baseline)
        for (int i = 1; i < salaries.length; i++) {

            // STEP 4 — If current item is bigger than our max, update max
            if (salaries[i] > max) {
                max = salaries[i];
            }
        }

        // STEP 5 — After loop ends, max holds the highest value
        return max;
    }

    public static void main(String[] args) {
        double[] salaries = {50000, 65000, 48000, 72000, 55000};

        double highest = getHighest(salaries);    // call the method
        System.out.println("Highest: $" + highest);
        // Output: Highest: $72000.0
    }
}
```

### ⚠️ Common mistakes to avoid
| Mistake | Why it's wrong | Fix |
|---------|---------------|-----|
| Start loop at `i = 0` | Compares index 0 to itself (wastes a step) | Start at `i = 1` |
| Use `double max = 0` as baseline | Fails if all salaries are negative | Use `salaries[0]` |
| Use `>=` instead of `>` | Works but updates unnecessarily | `>` is cleaner |

---

## Q13 — PHP: FizzBuzz (1 to 20)

### How to think about it
```
1. I need a LOOP from 1 to 20 → for ($i = 1; $i <= 20; $i++)
2. I need to CHECK DIVISIBILITY → use the % (modulo) operator
3. MOST IMPORTANT: FizzBuzz (divisible by BOTH 3 AND 5) goes FIRST
   → because else if stops at the first match — FizzBuzz must be caught early
4. Then check Fizz (÷3), then Buzz (÷5), then print the number
```

### The Code
```php
<?php

// STEP 1 — Loop from 1 to 20
//   ⚠️ Start at 1, NOT 0! The problem says "1 to 20"
for ($i = 1; $i <= 20; $i++) {

    // STEP 2 — FizzBuzz FIRST: divisible by BOTH 3 AND 5
    //   ⚠️ This MUST come before the individual checks
    //   If $i = 15: 15 % 3 == 0 AND 15 % 5 == 0
    //   If you checked % 3 first, it would print "Fizz" and skip FizzBuzz!
    if ($i % 3 == 0 && $i % 5 == 0) {
        echo "FizzBuzz ";

    // STEP 3 — Fizz: divisible by 3 only
    } else if ($i % 3 == 0) {
        echo "Fizz ";

    // STEP 4 — Buzz: divisible by 5 only
    } else if ($i % 5 == 0) {
        echo "Buzz ";

    // STEP 5 — Neither: just print the number
    } else {
        echo "$i ";
    }
}

?>
```

### ⚠️ The order rule — burned into memory
```
ALWAYS: FizzBuzz → Fizz → Buzz → number
NEVER:  Fizz → Buzz → FizzBuzz   (FizzBuzz becomes unreachable!)
```

### Expected output
```
1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz 16 17 Fizz 19 Buzz
```

---

## Q14 — PHP: Find Employee with Highest Salary

### How to think about it
```
1. I have an ARRAY OF ARRAYS → each employee has a name AND salary
2. I need to track TWO things: the highest SALARY and the winner's NAME
3. Start with the first employee as the current "winner"
4. Loop through all employees and compare salaries
5. If someone beats the current winner → update BOTH name AND salary
6. After loop → print the winner
```

### The Code
```php
<?php

$employees = array(
    array("name" => "Patrick", "salary" => 50000),
    array("name" => "Maria",   "salary" => 62000),
    array("name" => "Juan",    "salary" => 48000)
);

// STEP 1 — Set up TWO tracking variables using the first employee
//   Why first employee? It's a safe starting point we know exists
$highName = $employees[0]["name"];     // "Patrick"
$highSal  = $employees[0]["salary"];   // 50000

// STEP 2 — Loop through ALL employees (including index 0, it's fine)
foreach ($employees as $emp) {

    // STEP 3 — Compare this employee's salary to our current highest
    if ($emp["salary"] > $highSal) {

        // STEP 4 — Found a new winner! Update BOTH name AND salary
        $highSal  = $emp["salary"];
        $highName = $emp["name"];
    }
}

// STEP 5 — Print the result after the loop finishes
echo $highName . " has the highest salary: $" . $highSal . "\n";
// Output: Maria has the highest salary: $62000

?>
```

### ⚠️ The most common mistake on Q14
```
❌ Only tracking salary  →  you lose the employee's name
✅ Track BOTH from the start and update BOTH together
```

### Visualizing the loop
```
Start:  highName = "Patrick",  highSal = 50000

i=0  Patrick  50000  →  50000 > 50000? NO  →  no update
i=1  Maria    62000  →  62000 > 50000? YES →  highName="Maria", highSal=62000
i=2  Juan     48000  →  48000 > 62000? NO  →  no update

Result: Maria, 62000 ✅
```

---

## 🔑 General "How to Start" Formula

| When you see... | Start with... |
|----------------|---------------|
| "Write a function that..." | `function name($param) { ... return ...; }` |
| "Write a method that..." | `public static returnType name(type param) { ... return ...; }` |
| "Loop from X to Y" | `for ($i = X; $i <= Y; $i++)` |
| "Loop through an array" | `foreach ($arr as $item)` or `for (int i = 0; i < arr.length; i++)` |
| "Find the highest/lowest" | Set baseline = first item → loop → compare → update |
| "Check multiple conditions" | Most specific condition FIRST in if/else if chain |
