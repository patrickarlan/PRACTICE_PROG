# 📋 PRACTICE EXAM - ANSWER KEY
## Complete Solutions for Self-Grading

**Instructions:** Check your answers against this key. For coding/debugging questions, compare your approach to the solution.

---

# 🟢 SECTION A: BASIC PROGRAMMING LOGIC - ANSWERS

**Q1.** What will this code output?
```
x = 10
y = 5
z = x + y * 2
print(z)
```
**Answer: B) 20**  
*Explanation: Multiplication happens first (5 * 2 = 10), then addition (10 + 10 = 20)*

---

**Q2.** Which loop would you use if you don't know how many times to repeat?
**Answer: B) While loop**  
*Explanation: While loops repeat until a condition becomes false. Perfect when you don't know exact count.*

---

**Q3.** What is the output?
```
for (i = 1; i <= 3; i++) {
    print(i)
}
```
**Answer: B) 1 2 3**  
*Explanation: i starts at 1, loop runs while i <= 3, so prints 1, 2, 3*

---

**Q4.** An array of 5 items has valid indices from 0 to 5.
**Answer: FALSE**  
*Explanation: Array of 5 items has indices 0, 1, 2, 3, 4. Index 5 is out of bounds.*

---

**Q5.** A function can be called multiple times with different parameters.
**Answer: TRUE**  
*Explanation: That's the whole point of functions - reusable code with different inputs.*

---

**Q6.** Write a condition that checks if age is between 18 and 65 (inclusive).
**Answer:** `age >= 18 && age <= 65` or `(age >= 18) AND (age <= 65)`  
*Explanation: Must check both boundaries with AND logic.*

---

**Q7.** What does the `%` operator do?
**Answer:** Returns the remainder after division (modulo operation)  
*Example: 10 % 3 = 1 (10 divided by 3 = 3 remainder 1)*

---

**Q8.** Create an array with 3 employee names.
**Answer:** `["Patrick", "Maria", "Juan"]` or similar  
*Accepted formats: Array, List, or any collection with 3 names*

---

# 🔵 SECTION B: PHP FUNDAMENTALS - ANSWERS

**Q9.** What is the correct syntax for a PHP variable?
**Answer: B) `$name = "Patrick";`**  
*Explanation: PHP variables start with $ sign*

---

**Q10.** How do you output text in PHP?
**Answer: D) Both A and B**  
*Both `print` and `echo` work, echo is more commonly used*

---

**Q11.** What will this code output?
```php
$salary = 50000;
$tax = $salary * 0.15;
$net = $salary - $tax;
echo $net;
```
**Answer: B) 42500**  
*Explanation: 50000 * 0.15 = 7500 (tax), 50000 - 7500 = 42500 (net)*

---

**Q12.** In PHP, `$name` and `name` are the same variable.
**Answer: FALSE**  
*Explanation: `$name` is a PHP variable, `name` is just text. The $ makes the difference.*

---

**Q13.** You can use both `.` and `+` for string concatenation in PHP.
**Answer: FALSE**  
*Explanation: PHP uses `.` for concatenation. The `+` operator adds numbers, not strings.*

---

**Q14.** Write a PHP line that outputs "Patrick earns $50000".
**Answer:** `echo "Patrick earns $" . $salary;` or `echo "Patrick earns $$salary";`  
*Either concatenation with `.` or string interpolation works*

---

**Q15.** What is the difference between `foreach` and `for` loop in PHP?
**Answer:** 
- `foreach`: Iterates through array values directly, simpler syntax
- `for`: Uses counter variable, more control, can skip items

---

**Q16.** Write a PHP function that takes a salary and returns 10% of it.
**Answer:**
```php
function calculateBonus($salary) {
    return $salary * 0.10;
}
```
*Or:*
```php
function getBonus($salary) {
    $bonus = $salary * 0.10;
    return $bonus;
}
```

---

# 🟠 SECTION C: MYSQL FUNDAMENTALS - ANSWERS

**Q17.** What does SQL stand for?
**Answer: B) Structured Query Language**

---

**Q18.** Which SQL command is used to create a new table?
**Answer: C) CREATE TABLE**

---

**Q19.** What will this query return?
```sql
SELECT name, salary FROM employees WHERE salary > 50000 ORDER BY salary DESC;
```
**Answer: B) Employees earning more than 50000, sorted descending**

---

**Q20.** Which is the correct INSERT syntax?
**Answer: B) `INSERT INTO employees VALUES ('Patrick', 50000);`**  
*Explanation: Correct syntax is INSERT INTO, not INSERT alone*

---

**Q21.** UPDATE and DELETE queries ALWAYS require a WHERE clause.
**Answer: FALSE**  
*Explanation: Technically you CAN write them without WHERE, but it would affect ALL rows - dangerous!*

---

**Q22.** In a PRIMARY KEY, values can be repeated.
**Answer: FALSE**  
*Explanation: PRIMARY KEY must be unique - that's the whole point*

---

**Q23.** Write SQL to find the number of employees in the "Engineering" department.
**Answer:**
```sql
SELECT COUNT(*) FROM employees WHERE department = 'Engineering';
```
*Or:*
```sql
SELECT COUNT(*) FROM employees WHERE department = 'Engineering' GROUP BY department;
```

---

**Q24.** What is the difference between DECIMAL(10,2) and VARCHAR(100)?
**Answer:**
- `DECIMAL(10,2)`: Number type, stores up to 10 digits total with 2 decimal places (for money)
- `VARCHAR(100)`: Text type, stores up to 100 characters

---

# 🔴 SECTION D: JAVA FUNDAMENTALS - ANSWERS

**Q25.** What is the correct way to declare a Java variable?
**Answer: A) `int age;`**  
*Explanation: Type comes first, then variable name*

---

**Q26.** Which of these is NOT a Java data type?
**Answer: C) text**  
*Explanation: Java uses `String`, not `text`*

---

**Q27.** What will this code output?
```java
String name = "Patrick";
int age = 25;
System.out.println("Name: " + name + ", Age: " + age);
```
**Answer: A) Name: Patrick, Age: 25**

---

**Q28.** How do you compare two strings in Java?
**Answer: B) `name.equals("Patrick")`**  
*Explanation: Use `.equals()` method, not `==` for strings*

---

**Q29.** What is the output?
```java
for (int i = 0; i < 3; i++) {
    System.out.println(i);
}
```
**Answer: C) 0 1 2**  
*Explanation: i goes 0, 1, 2 (stops at 2 because condition is i < 3)*

---

**Q30.** In Java, you must specify a type for every variable.
**Answer: TRUE**  
*Explanation: Java is strongly typed - always declare type*

---

**Q31.** A method with `void` return type can still return a value.
**Answer: FALSE**  
*Explanation: `void` means it returns nothing. Methods that return values use other types (int, double, String, etc.)*

---

**Q32.** Write a method that takes two numbers and returns their sum.
**Answer:**
```java
public static int sum(int a, int b) {
    return a + b;
}
```
*Or:*
```java
public static double add(double x, double y) {
    return x + y;
}
```

---

**Q33.** What does `public static void main(String[] args)` mean?
**Answer:**
- `public`: Anyone can call it
- `static`: Belongs to class, not objects
- `void`: Returns nothing
- `main`: Special name - entry point of program
- `String[] args`: Can receive command-line arguments

---

**Q34.** Write code to create an array of 3 salaries and print the first one.
**Answer:**
```java
int[] salaries = {50000, 55000, 48000};
System.out.println(salaries[0]);
```
*Or:*
```java
double[] salaries = {50000.0, 55000.0, 48000.0};
System.out.println(salaries[0]);
```

---

# 🟣 SECTION E: DEBUGGING & LOGICAL QUESTIONS - ANSWERS

**Q35.** Find and fix the error:
```java
for (int i = 0; i <= names.length; i++) {  // WRONG
    System.out.println(names[i]);
}
```

**What's wrong?** Off-by-one error. Array length is 3 (indices 0,1,2). Loop tries index 3 which doesn't exist.  

**How to fix:**
```java
for (int i = 0; i < names.length; i++) {  // FIXED
    System.out.println(names[i]);
}
```

**Error type:** Runtime Error (ArrayIndexOutOfBoundsException)

---

**Q36.** Identify and fix:
```java
if (salary = 60000) {  // WRONG - uses = not ==
    System.out.println("High earner");
}
```

**Error type:** Syntax Error (but may seem like logic)  

**Fixed code:**
```java
if (salary == 60000) {  // FIXED - use == for comparison
    System.out.println("High earner");
}
```

---

**Q37.** What's wrong?
```php
foreach ($employees as $emp) {
    echo $emp;  // Missing newline or separator
}
```

**What's missing?** Newline separator (`\n`) or space or comma to separate names  

**Fixed line:**
```php
echo $emp . "\n";  // or
echo $emp . " ";   // or
echo $emp . ", ";
```

---

**Q38.** Which is more efficient for finding "Patrick" in 100 names?
**Answer: B) Use a Set/HashMap**  
*Explanation: Set gives instant O(1) lookup. Looping is O(n) - much slower.*

---

**Q39.** UPDATE without WHERE clause - what happens?
**Answer: B) All employees' salaries are updated**  
*Explanation: Without WHERE, UPDATE applies to ALL rows - dangerous!*

---

# 🟡 SECTION F: CODING CHALLENGE - ANSWER

**Q40.** Complete Java Program:

**Full Solution:**
```java
public class PayrollSystem {
    
    // Method to calculate 10% bonus
    public static double calculateBonus(double salary) {
        return salary * 0.10;
    }
    
    public static void main(String[] args) {
        // Create arrays
        String[] names = {"Patrick", "Maria", "Juan"};
        double[] salaries = {50000, 55000, 48000};
        
        // Loop through employees
        for (int i = 0; i < names.length; i++) {
            String name = names[i];
            double salary = salaries[i];
            double bonus = calculateBonus(salary);
            boolean isHighEarner = salary > 50000;
            
            System.out.println(name + ": Salary=$" + salary + ", Bonus=$" + bonus + ", High Earner=" + isHighEarner);
        }
    }
}
```

**Expected Output:**
```
Patrick: Salary=$50000.0, Bonus=$5000.0, High Earner=true
Maria: Salary=$55000.0, Bonus=$5500.0, High Earner=true
Juan: Salary=$48000.0, Bonus=$4800.0, High Earner=false
```

**Grading Rubric for Q40 (3 points total):**
- (1 point) Arrays created correctly with 3 names and 3 salaries
- (1 point) Method created to calculate bonus and called correctly
- (1 point) Loop works correctly, output format matches

---

## 📊 SCORING SUMMARY

```
Section A (Logic):      ____ / 8 points
Section B (PHP):        ____ / 8 points
Section C (MySQL):      ____ / 8 points
Section D (Java):       ____ / 10 points
Section E (Debugging):  ____ / 6 points
Section F (Coding):     ____ / 3 points
                        -----------
TOTAL SCORE:            ____ / 40 points
```

**Score Interpretation:**
- **28-40 (70-100%):** ✅ **EXCELLENT** - You're ready for the exam!
- **21-27 (52-67%):** ⚠️ **GOOD** - Review weak areas before exam
- **Below 21 (<52%):** ❌ **NEEDS WORK** - Go back to lessons, retake exam

---

## 🎯 IF YOU SCORED BELOW 70%

**Find your weak areas:**
1. Low on Section A? → Review Unit 1 (Logic)
2. Low on Section B? → Review Unit 2 (PHP)
3. Low on Section C? → Review Unit 3 (MySQL)
4. Low on Section D? → Review Unit 4 (Java)
5. Low on Section E? → Review Unit 5 (Debugging)
6. Couldn't do Q40? → Practice Java activities

**Then:** Retake this practice exam after studying

---

## ✅ IF YOU SCORED 70%+

**You're ready for the real exam!**

**Next steps:**
1. Take one more quick review (1-2 hours)
2. Focus on any questions you got wrong
3. Get good sleep before the exam
4. Go in with confidence!

---

**Remember: This practice exam prepares you for the real thing. You've studied all 5 units. You know this material. Trust your preparation!**

**Good luck! 💪🚀**
