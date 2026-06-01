# 🟣 UNIT 5: DEBUGGING & TROUBLESHOOTING
## Lesson 5: Finding and Fixing Errors

**Duration:** 2-3 hours of focused study  
**What You'll Learn:** How to find and fix errors in code  
**Why It Matters:** Every programmer encounters bugs. Learning to debug is a superpower.

---

## 📖 Introduction: What is Debugging?

**Think of debugging like being a detective:**
- Something is wrong (the program crashes or gives wrong output)
- You examine the evidence (error messages, code behavior)
- You find the culprit (the bug)
- You fix it (change the code)
- You verify it works (test it)

**Key Insight:** Errors are NOT failures. They're opportunities to learn. Every senior programmer you know debugs code every single day.

---

## Lesson 5.1: Types of Errors — Understanding What Went Wrong

### 🧠 The Concept

There are **three main types of errors:**

1. **Syntax Errors** - Code doesn't follow rules (won't even run)
2. **Logic Errors** - Code runs but does wrong thing (runs but wrong result)
3. **Runtime Errors** - Code breaks while running (crashes mid-execution)

Think of it like grammar:
- **Syntax Error** = Wrong grammar ("I am going to the store.")
- **Logic Error** = Correct grammar, wrong meaning ("I am going to the trash can to sleep.")
- **Runtime Error** = Following rules but impossible situation ("I am eating water with a fork.")

---

### 📝 Type 1: Syntax Errors (Code Won't Run)

**What it is:** Code doesn't follow the language rules  
**When you see it:** When you try to compile or run

**Java Example:**
```java
public class HelloWorld {
    public static void main(String[] args) {
        String name = "Patrick"  // Missing semicolon!
        System.out.println(name);
    }
}
```

**Error Message:**
```
error: ';' expected at line 3
```

**Reading Like English:** "The computer expected a semicolon at line 3, but didn't find one"

**How to Fix:**
```java
String name = "Patrick";  // Added semicolon
```

**Common Syntax Errors:**
| Error | Cause | Fix |
|-------|-------|-----|
| Missing semicolon | Forgot `;` at end | Add semicolon |
| Missing brace | Forgot `}` | Count opening/closing braces |
| Wrong bracket type | Used `(` instead of `[` | Match correct bracket |
| Missing quotes | Forgot `"` around text | Add quotes around strings |

---

### 📝 Type 2: Logic Errors (Code Runs, Wrong Result)

**What it is:** Code is valid but solves the wrong problem  
**When you see it:** When output doesn't match what you expect

**Java Example:**
```java
public class BonusCalculator {
    public static void main(String[] args) {
        double salary = 50000;
        
        if (salary > 60000) {  // Wrong condition!
            System.out.println("Gets 15% bonus");
        } else {
            System.out.println("Gets 5% bonus");
        }
    }
}
```

**Output:** `Gets 5% bonus`

**The Problem:** Patrick has 50000 salary, should get bonus, but condition checks > 60000. This is LOGIC ERROR - code runs fine but gives wrong answer!

**How to Fix:**
```java
if (salary >= 50000) {  // Changed condition
    System.out.println("Gets 15% bonus");
}
```

**Common Logic Errors:**
| Error | Cause | Fix |
|-------|-------|-----|
| Wrong comparison | Used `>` instead of `>=` | Review conditions |
| Off-by-one | Loop goes 0-4 instead of 0-5 | Check loop bounds |
| Wrong variable | Used `x` instead of `y` | Verify variable names |
| Assignment in condition | Used `=` instead of `==` | Use `==` for comparison |

---

### 📝 Type 3: Runtime Errors (Code Crashes While Running)

**What it is:** Code is valid and logic is correct, but something breaks during execution  
**When you see it:** When program crashes with an error message

**Java Example:**
```java
public class ArrayExample {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3};
        System.out.println(numbers[5]);  // Index 5 doesn't exist!
    }
}
```

**Error Message:**
```
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: 5
```

**Reading Like English:** "You tried to access index 5 in an array that only has indices 0-2"

**How to Fix:**
```java
if (numbers.length > 5) {  // Check if index exists
    System.out.println(numbers[5]);
} else {
    System.out.println("Index doesn't exist");
}
```

**Common Runtime Errors:**
| Error | Cause | Fix |
|-------|-------|-----|
| NullPointerException | Using null value | Check if value is null first |
| ArrayIndexOutOfBounds | Index too high | Check array length |
| NumberFormatException | Can't convert string to number | Validate input |
| Division by zero | Dividing by 0 | Check denominator first |

---

## Lesson 5.2: Debugging Strategy — The Detective Method

### 🧠 The Concept

When something goes wrong, follow these steps to find the bug:

1. **Read the error message** (top to bottom)
2. **Find the line number** (where error occurred)
3. **Trace the code** (what led to this line)
4. **Test with examples** (verify behavior)
5. **Fix and retest** (make sure it works)

---

### 📝 Step 1: Read the Error Message

**Never ignore error messages!** They tell you exactly what's wrong.

**Java Error Example:**
```
Exception in thread "main" java.lang.NullPointerException
    at Employee.main(Employee.java:7)
```

**Reading Like English:**
- "There's a NullPointerException" (null value used incorrectly)
- "It happened in Employee.java at line 7"
- "Go to line 7 and look for null"

---

### 📝 Step 2: Find and Examine the Line

```java
1: public class Employee {
2:    public static void main(String[] args) {
3:        String name = null;
4:        System.out.println("Name: " + name);
5:        System.out.println(name.length());  // ERROR IS HERE (line 5)
6:    }
7: }
```

**What's happening at line 5?**
- Trying to call `.length()` on `name`
- But `name` is null (no value)
- null doesn't have methods, so it crashes

---

### 📝 Step 3: Trace the Code (How Did We Get Here?)

```java
String name = null;  // Line 3: name is set to null
System.out.println(name.length());  // Line 5: trying to use name's method
// Problem: null has no methods!
```

**Fix:** Check if value is null before using it

```java
String name = null;

if (name != null) {
    System.out.println(name.length());  // Only run if name exists
} else {
    System.out.println("Name is null");
}
```

---

### 📝 Step 4: Test with Examples

After fixing, test with different scenarios:

```java
// Test 1: null value
String name = null;
if (name != null) {
    System.out.println("Length: " + name.length());
} else {
    System.out.println("Name is null");
}
// Output: Name is null ✅

// Test 2: real value
String name = "Patrick";
if (name != null) {
    System.out.println("Length: " + name.length());
} else {
    System.out.println("Name is null");
}
// Output: Length: 7 ✅
```

---

### 📝 Step 5: Use Debug Output (Printing to Understand)

When confused, print intermediate values:

```java
int salary = 50000;

System.out.println("DEBUG: salary = " + salary);  // What is it?

if (salary > 60000) {
    System.out.println("DEBUG: Condition true");
    System.out.println("Gets 15% bonus");
} else {
    System.out.println("DEBUG: Condition false");
    System.out.println("Gets 5% bonus");
}
```

**Output:**
```
DEBUG: salary = 50000
DEBUG: Condition false
Gets 5% bonus
```

This shows you the value AND which branch was taken!

---

## Lesson 5.3: Common Java Errors & How to Fix Them

### 📝 Error 1: Missing Semicolon (Syntax)

```java
// ❌ WRONG
int age = 25
System.out.println(age);

// ✅ RIGHT
int age = 25;
System.out.println(age);
```

**How to Debug:** Compiler tells you exactly where - look at that line and line before

---

### 📝 Error 2: Type Mismatch (Syntax)

```java
// ❌ WRONG - putting text in number variable
int age = "twenty-five";

// ✅ RIGHT - use correct type
int age = 25;
```

**Error Message:** `error: incompatible types: String cannot be converted to int`

**How to Debug:** Read the error - it tells you what type is wrong

---

### 📝 Error 3: Undefined Variable (Syntax)

```java
// ❌ WRONG - variable not created
System.out.println(name);

// ✅ RIGHT - create first, use after
String name = "Patrick";
System.out.println(name);
```

**Error Message:** `error: cannot find symbol - variable name`

**How to Debug:** Make sure variable is declared before use

---

### 📝 Error 4: NullPointerException (Runtime)

```java
// ❌ WRONG
String name = null;
System.out.println(name.length());  // null has no length!

// ✅ RIGHT - check first
String name = null;
if (name != null) {
    System.out.println(name.length());
}
```

**How to Debug:** Always check if something is null before using it

---

### 📝 Error 5: Array Index Out of Bounds (Runtime)

```java
// ❌ WRONG
String[] names = {"Patrick", "Maria"};  // Only 2 items (0 and 1)
System.out.println(names[5]);  // Index 5 doesn't exist!

// ✅ RIGHT - check array length
String[] names = {"Patrick", "Maria"};
if (names.length > 5) {
    System.out.println(names[5]);
} else {
    System.out.println("Index too high. Array has " + names.length + " items");
}
```

**How to Debug:** Remember arrays start at 0, last index is length-1

---

### 📝 Error 6: Wrong Comparison (Logic)

```java
// ❌ WRONG - uses assignment instead of comparison
int age = 25;
if (age = 18) {  // This assigns 18 to age!
    System.out.println("Adult");
}

// ✅ RIGHT - use comparison
int age = 25;
if (age == 18) {  // This compares
    System.out.println("Adult");
}
```

**How to Debug:** Use `==` to compare, not `=`

---

## Lesson 5.4: Real Debugging Scenarios

### 📝 Scenario 1: Wrong Output

**Problem:** Program runs but gives wrong answer

```java
public class GradeCalculator {
    public static void main(String[] args) {
        int score = 85;
        
        if (score > 90) {
            System.out.println("Grade: A");
        } else if (score > 80) {
            System.out.println("Grade: B");
        } else {
            System.out.println("Grade: C");
        }
    }
}
```

**Output:** `Grade: B` ✅ (This is actually correct!)

**Another test:**
```java
int score = 91;  // Should be A

// Output: Grade: B ❌ (WRONG! Should be A)
```

**The Bug:** Condition should be `>=` not `>`

```java
if (score >= 90) {  // Fixed!
    System.out.println("Grade: A");
}
```

**How to Debug:** Test multiple values, especially boundary cases (90, 91, 89)

---

### 📝 Scenario 2: Program Crashes

**Problem:** Program compiles but crashes when running

```java
public class Calculator {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30};
        
        for (int i = 0; i <= numbers.length; i++) {  // ❌ i <= length
            System.out.println(numbers[i]);  // Crashes when i = 3!
        }
    }
}
```

**Output:**
```
10
20
30
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: 3
```

**The Bug:** Loop condition should be `i < numbers.length` not `i <= `

```java
for (int i = 0; i < numbers.length; i++) {  // ✅ Fixed
    System.out.println(numbers[i]);
}
```

**How to Debug:** Arrays of length 3 have indices 0, 1, 2. Loop should stop at 2.

---

### 📝 Scenario 3: Unexpected Result

**Problem:** Logic seems right but result is weird

```java
public class SalaryCalculator {
    public static void main(String[] args) {
        double salary = 50000;
        double taxRate = 0.15;
        
        double tax = salary * taxRate;
        double net = salary - tax;
        
        System.out.println("Tax: " + tax);
        System.out.println("Net: " + net);
    }
}
```

**Output:**
```
Tax: 7500.0
Net: 42500.0
```

**Looks correct!** But what if we had a wrong condition earlier:

```java
if (salary < 50000) {  // ❌ WRONG - should be >
    System.out.println("No bonus");
} else {
    System.out.println("Gets bonus");
}
```

**How to Debug:** Add debug prints to trace value at each step

```java
System.out.println("DEBUG: salary = " + salary);
System.out.println("DEBUG: taxRate = " + taxRate);
System.out.println("DEBUG: tax = " + tax);
System.out.println("DEBUG: net = " + net);
```

---

## Lesson 5.5: Real Exam Debugging Questions

### 📝 Question 1: Find and Fix the Error

**Given Code:**
```java
public class Employee {
    public static void main(String[] args) {
        String[] names = {"Patrick", "Maria", "Juan"};
        
        for (int i = 0; i <= names.length; i++) {
            System.out.println(names[i]);
        }
    }
}
```

**What's Wrong?**
- Loop condition uses `<=` instead of `<`
- When i = 3, tries to access names[3] which doesn't exist
- ArrayIndexOutOfBoundsException

**What to Check:**
- Does the loop go one too far?
- Are array indices 0, 1, 2 only?

**Fixed Code:**
```java
for (int i = 0; i < names.length; i++) {  // Changed <= to <
    System.out.println(names[i]);
}
```

---

### 📝 Question 2: Why Doesn't This Work?

**Given Code:**
```java
public class BonusChecker {
    public static void main(String[] args) {
        int salary = 50000;
        
        if (salary = 60000) {  // ❌ WRONG
            System.out.println("High earner");
        } else {
            System.out.println("Regular earner");
        }
    }
}
```

**What's Wrong?**
- Uses `=` (assignment) instead of `==` (comparison)
- Assigns 60000 to salary instead of comparing

**Error Message:** `error: unexpected type - required: boolean, found: int`

**Fixed Code:**
```java
if (salary == 60000) {  // Changed = to ==
    System.out.println("High earner");
}
```

---

### 📝 Question 3: Logic Error - Wrong Result

**Given Code:**
```java
public class Grade {
    public static void main(String[] args) {
        int score = 85;
        
        if (score > 90) {
            System.out.println("A");
        } else if (score > 80) {
            System.out.println("B");
        } else if (score > 70) {
            System.out.println("C");
        } else {
            System.out.println("F");
        }
    }
}
```

**Problem:** What if score = 90? Should get A, but gets B

**Root Cause:** Condition is `score > 90` not `score >= 90`

**Fixed Code:**
```java
if (score >= 90) {  // Changed > to >=
    System.out.println("A");
}
```

**Lesson:** Test boundary values (90, 80, 70) not just middle values

---

## 🧠 Key Concepts Summary

| Concept | Definition | Example |
|---------|-----------|---------|
| **Syntax Error** | Code breaks grammar rules | Missing semicolon |
| **Logic Error** | Wrong condition or calculation | `>` instead of `>=` |
| **Runtime Error** | Crashes during execution | Accessing null or invalid index |
| **Debug** | Find and fix bugs | Use error message + print statements |
| **Test** | Verify fix works | Try multiple inputs |

---

## 🎯 Debugging Checklist

When you encounter an error:

- [ ] Read the error message completely
- [ ] Find the line number mentioned
- [ ] Look at the code at that line
- [ ] Trace backward to understand how you got here
- [ ] Add debug print statements if confused
- [ ] Test with multiple inputs
- [ ] Fix the issue
- [ ] Test again to verify fix
- [ ] Check for similar errors elsewhere in code

---

## 📝 HANDS-ON DEBUGGING ACTIVITIES

### Activity 1: Fix Syntax Errors

**Given Code (Has 3 Syntax Errors):**
```java
public class ErrorFinder {
    public static void main(String[] args) {
        String name = "Patrick"  // Error 1
        int age = 25
        System.out.println("Name: " + name);
        System.out.println(Age: " + age);  // Error 2
    }
}
```

**Hints:**
- Look for missing semicolons
- Check that quotes are properly matched
- Verify bracket pairing

**What to Fix:**
```
Error 1: Missing semicolon after "Patrick"
Error 2: Missing semicolon after 25
Error 3: Wrong quote placement in println statement
```

---

### Activity 2: Find Logic Errors

**Given Code:**
```java
public class BonusCalculator {
    public static void main(String[] args) {
        double salary = 55000;
        
        if (salary > 60000) {
            System.out.println("Bonus: 15%");
        } else if (salary > 50000) {
            System.out.println("Bonus: 10%");
        } else {
            System.out.println("Bonus: 5%");
        }
    }
}
```

**Current Output:** `Bonus: 10%`

**Expected Output:** `Bonus: 15%`

**Hints:**
- Check if conditions match the business rule
- Should 55000 get the same bonus as 60000?
- Think about boundary values

**What's Wrong:**
```
Condition should be >= not >
55000 should qualify for 15% bonus
```

---

### Activity 3: Runtime Error

**Given Code:**
```java
public class ArrayPrinter {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40};
        
        for (int i = 0; i <= numbers.length; i++) {
            System.out.println(numbers[i]);
        }
    }
}
```

**Problem:** Program crashes with ArrayIndexOutOfBoundsException

**Hints:**
- Check loop condition
- What's the last valid index in array of length 4?
- Should loop stop before or at length?

**What to Fix:**
```
Change i <= numbers.length to i < numbers.length
Array of length 4 has indices 0, 1, 2, 3
Loop tries to access index 4 which doesn't exist
```

---

### Activity 4: Complete Debugging Challenge

**Given Code (Multiple Errors):**
```java
public class EmployeeSystem {
    public static void main(String[] args) {
        String[] names = {"Patrick", "Maria", "Juan"};
        int[] salaries = {50000, 55000, 48000};
        
        // Loop through employees
        for (int i = 0; i <= names.length; i++) {  // Error 1
            String name = names[i];
            int salary = salaries[i];
            
            if (salary = 50000) {  // Error 2
                System.out.println(name + " gets bonus");
            }
        }
    }
}
```

**Hints:**
- Find array bounds issue
- Find comparison issue
- Think about what each error type is

**What to Fix:**
```
Error 1: Loop condition - change <= to <
Error 2: Use == not = for comparison
```

---

## 🎓 Key Takeaways for the Exam

1. **Read error messages** - They tell you what's wrong
2. **Identify error type** - Syntax? Logic? Runtime?
3. **Find the line** - Use line number from error
4. **Trace the code** - How did we get here?
5. **Test your fix** - Make sure it works
6. **Check for similar bugs** - Fix related issues too

---

## 🚀 You're Now a Debugging Expert!

You've learned:
- ✅ Three types of errors and how to recognize them
- ✅ How to read and understand error messages
- ✅ The detective method for finding bugs
- ✅ Common Java errors and fixes
- ✅ Real exam debugging scenarios

**Remember:** Every programmer debugs. It's not a weakness, it's a superpower. 💪

---

**Next Steps:**
1. ✅ Complete all 4 debugging activities
2. ✅ Try intentionally breaking code to learn
3. ✅ Practice reading error messages
4. ✅ Apply this to exam problems

**You're ready for anything the exam throws at you!** 🚀
