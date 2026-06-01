# 📝 LESSON 5 CHEAT SHEET: Debugging & Troubleshooting
## Quick Reference Guide for Finding and Fixing Errors

---

## 1️⃣ ERROR TYPES AT A GLANCE

| Type | When | How to Fix |
|------|------|-----------|
| **Syntax** | Won't compile | Read error message, fix code grammar |
| **Logic** | Runs, wrong result | Test with examples, check conditions |
| **Runtime** | Crashes while running | Read stack trace, add null checks |

---

## 2️⃣ SYNTAX ERRORS (Won't Compile)

### Missing Semicolon
```java
// ❌ WRONG
int age = 25

// ✅ RIGHT
int age = 25;
```

### Missing Quotes
```java
// ❌ WRONG
System.out.println(Hello World);

// ✅ RIGHT
System.out.println("Hello World");
```

### Missing Braces
```java
// ❌ WRONG
if (age > 18)
    System.out.println("Adult")  // Which code belongs to if?

// ✅ RIGHT
if (age > 18) {
    System.out.println("Adult");
}
```

### Type Mismatch
```java
// ❌ WRONG
int age = "twenty-five";  // String in int

// ✅ RIGHT
int age = 25;  // Number in int
String age = "twenty-five";  // String in String
```

---

## 3️⃣ LOGIC ERRORS (Wrong Result)

### Wrong Comparison Operator
```java
// ❌ WRONG - 55000 should get bonus too
if (salary > 50000) {  // Only gets > 50000, not =
    System.out.println("Gets bonus");
}

// ✅ RIGHT
if (salary >= 50000) {  // Gets >= 50000 (includes 50000)
    System.out.println("Gets bonus");
}
```

### Off-by-One Error
```java
// ❌ WRONG - tries to access index 3 which doesn't exist
String[] names = {"Patrick", "Maria", "Juan"};  // Indices: 0, 1, 2
for (int i = 0; i <= names.length; i++) {  // Goes to 3!
    System.out.println(names[i]);
}

// ✅ RIGHT
for (int i = 0; i < names.length; i++) {  // Stops at 2
    System.out.println(names[i]);
}
```

### Assignment Instead of Comparison
```java
// ❌ WRONG - assigns instead of compares
if (age = 18) {  // This SETS age to 18
    System.out.println("Adult");
}

// ✅ RIGHT
if (age == 18) {  // This COMPARES
    System.out.println("Adult");
}
```

### Wrong Variable
```java
// ❌ WRONG - comparing to tax instead of salary
if (tax > 10000) {
    System.out.println("High tax");
}

// ✅ RIGHT
if (salary > 50000) {
    System.out.println("High earner");
}
```

---

## 4️⃣ RUNTIME ERRORS (Crashes)

### NullPointerException (null value)
```java
// ❌ WRONG
String name = null;
System.out.println(name.length());  // null has no length!

// ✅ RIGHT
String name = null;
if (name != null) {
    System.out.println(name.length());
} else {
    System.out.println("Name is null");
}
```

### ArrayIndexOutOfBoundsException (wrong index)
```java
// ❌ WRONG
int[] numbers = {10, 20, 30};  // Indices: 0, 1, 2
System.out.println(numbers[5]);  // Index 5 doesn't exist!

// ✅ RIGHT
if (numbers.length > 5) {
    System.out.println(numbers[5]);
} else {
    System.out.println("Index too high");
}
```

### Division by Zero
```java
// ❌ WRONG
int result = 100 / 0;  // Can't divide by zero!

// ✅ RIGHT
int divisor = 5;
if (divisor != 0) {
    int result = 100 / divisor;
} else {
    System.out.println("Can't divide by zero");
}
```

---

## 5️⃣ DEBUGGING WORKFLOW

### Step 1: Read the Error
```
Exception in thread "main" java.lang.NullPointerException
    at Employee.main(Employee.java:7)
```
**Translation:** NullPointerException at line 7 in Employee.java

### Step 2: Go to the Line
Look at the code at line 7 and the lines before it

### Step 3: Add Debug Output
```java
System.out.println("DEBUG: name = " + name);
System.out.println("DEBUG: name is null? " + (name == null));

if (name != null) {
    System.out.println("DEBUG: name.length = " + name.length());
}
```

### Step 4: Test with Examples
```java
// Test 1: null
name = null;
// Test 2: empty string
name = "";
// Test 3: normal value
name = "Patrick";
```

### Step 5: Verify Fix
Run code again and check output

---

## 6️⃣ COMMON ERROR MESSAGES

| Message | Meaning | Fix |
|---------|---------|-----|
| `error: ';' expected` | Missing semicolon | Add `;` at end of line |
| `error: cannot find symbol` | Variable not defined | Declare variable first |
| `error: incompatible types` | Wrong data type | Use correct type |
| `NullPointerException` | Using null value | Check if `!= null` first |
| `ArrayIndexOutOfBoundsException` | Invalid array index | Check `< array.length` |
| `NumberFormatException` | String can't convert to number | Validate input first |

---

## 7️⃣ BOUNDARY VALUE TESTING

Always test edges:

```java
// Test boundary values (90 is boundary for A/B grade)
testGrade(89);   // Should be B
testGrade(90);   // Should be A (BOUNDARY!)
testGrade(91);   // Should be A

// Test limits
testArray(0);           // First index
testArray(array.length - 1);  // Last index
testArray(array.length);      // OUT OF BOUNDS!

// Test special cases
testSalary(0);          // Zero
testSalary(-1000);      // Negative
testSalary(999999);     // Very large
```

---

## 8️⃣ ERROR CHECKLIST

When something goes wrong:

- [ ] Does it compile? (No = Syntax error)
- [ ] Does it run? (Crashes = Runtime error)
- [ ] Does it give right answer? (No = Logic error)
- [ ] Read error message completely
- [ ] Find line number from error
- [ ] Look at code at that line
- [ ] Trace backward to understand
- [ ] Add debug print statements
- [ ] Test with multiple values
- [ ] Fix the issue
- [ ] Retest to verify

---

## 🎯 QUICK FIXES

| Problem | Quick Fix |
|---------|-----------|
| Won't compile | Look for missing `;` `}` `"` |
| Wrong output | Check conditions with `>=` vs `>` |
| Crashes on array | Check `i < array.length` not `<=` |
| Crashes on null | Add `if (value != null)` check |
| Wrong calculation | Verify math operations |
| Loop infinite | Check loop condition |

---

## 🚨 TOP 5 EXAM DEBUGGING QUESTIONS

### 1. Find the Syntax Error
```java
int age = 25  // Missing semicolon
```
**Answer:** Add semicolon

### 2. Fix the Logic Error
```java
if (salary > 50000) // Should be >=
```
**Answer:** Change to `>=` for boundary

### 3. Fix the Array Error
```java
for (int i = 0; i <= names.length; i++)  // Off by one
```
**Answer:** Change `<=` to `<`

### 4. Fix the Comparison
```java
if (age = 18)  // Assignment, not comparison
```
**Answer:** Change `=` to `==`

### 5. Fix the Null Error
```java
String name = null;
System.out.println(name.length());  // Crashes
```
**Answer:** Add null check first

---

## 💡 REMEMBER

- **Syntax errors** = Computer can't understand (won't run)
- **Logic errors** = Computer understands but solves wrong problem (runs, wrong output)
- **Runtime errors** = Computer hits impossible situation while running (crashes)
- **Debug = Think like detective:** Find evidence → Follow clues → Solve problem

---

**Master debugging and you can fix anything!** 🔍✨
