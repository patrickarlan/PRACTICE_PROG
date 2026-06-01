# 📋 COMPREHENSIVE PRACTICE EXAM
## Interview Exam Preparation - Final Mock Exam

**Company:** Sandman Software Systems Inc  
**Duration:** 90 minutes (1.5 hours)  
**Format:** Mixed - Objective, True/False, Multiple Choice, Debugging, Coding  
**Total Questions:** 40 questions across all 5 units  
**Passing Score:** 70% (28/40 correct)

---

## 📖 EXAM INSTRUCTIONS

1. **Time Management:** 90 minutes total
   - Section A (Logic): 15 min
   - Section B (PHP): 15 min
   - Section C (MySQL): 15 min
   - Section D (Java): 20 min
   - Section E (Debugging): 15 min
   - Section F (Coding): 10 min

2. **For Coding/Debugging Questions:**
   - Write on paper or in a text editor
   - Show your work/reasoning
   - Compile and test when possible

3. **Scoring:**
   - Objective/True-False/Multiple Choice: 1 point each
   - Debugging: 2 points each
   - Coding: 3 points each

---

# 🟢 SECTION A: BASIC PROGRAMMING LOGIC (8 Questions × 1 point = 8 points)
**Time: 15 minutes**

## Multiple Choice

**Q1.** What will this code output?
```
x = 10
y = 5
z = x + y * 2
print(z)
```
A) 30  
B) 20  
C) 15  
D) 25  

**Q2.** Which loop would you use if you don't know how many times to repeat?
A) For loop  
B) While loop  
C) Foreach loop  
D) Do-while loop

**Q3.** What is the output of this code?
```
for (i = 1; i <= 3; i++) {
    print(i)
}
```
A) 0 1 2  
B) 1 2 3  
C) 1 2 3 4  
D) 3 2 1

## True or False

**Q4.** An array of 5 items has valid indices from 0 to 5.  
**Answer:** ___________

**Q5.** A function can be called multiple times with different parameters.  
**Answer:** ___________

## Short Answer

**Q6.** Write a condition that checks if age is between 18 and 65 (inclusive).  
**Answer:** ___________

**Q7.** What does the `%` operator do?  
**Answer:** ___________

**Q8.** Create an array with 3 employee names.  
**Answer:** ___________

---

# 🔵 SECTION B: PHP FUNDAMENTALS (8 Questions × 1 point = 8 points)
**Time: 15 minutes**

## Multiple Choice

**Q9.** What is the correct syntax for a PHP variable?
A) `var name = "Patrick";`  
B) `$name = "Patrick";`  
C) `name = "Patrick";`  
D) `@name = "Patrick";`

**Q10.** How do you output text in PHP?
A) `print "Hello";`  
B) `echo "Hello";`  
C) `output "Hello";`  
D) Both A and B

**Q11.** What will this code output?
```php
$salary = 50000;
$tax = $salary * 0.15;
$net = $salary - $tax;
echo $net;
```
A) 50000  
B) 42500  
C) 7500  
D) 57500

## True or False

**Q12.** In PHP, `$name` and `name` are the same variable.  
**Answer:** ___________

**Q13.** You can use both `.` and `+` for string concatenation in PHP.  
**Answer:** ___________

## Short Answer

**Q14.** Write a PHP line that outputs "Patrick earns $50000" where Patrick and 50000 are variables.  
**Answer:** ___________

**Q15.** What is the difference between `foreach` and `for` loop in PHP?  
**Answer:** ___________

**Q16.** Write a PHP function that takes a salary and returns 10% of it.  
**Answer:** ___________

---

# 🟠 SECTION C: MYSQL FUNDAMENTALS (8 Questions × 1 point = 8 points)
**Time: 15 minutes**

## Multiple Choice

**Q17.** What does SQL stand for?
A) Structured Query List  
B) Structured Query Language  
C) Simple Query Language  
D) System Query Language

**Q18.** Which SQL command is used to create a new table?
A) MAKE TABLE  
B) NEW TABLE  
C) CREATE TABLE  
D) INSERT TABLE

**Q19.** What will this query return?
```sql
SELECT name, salary FROM employees WHERE salary > 50000 ORDER BY salary DESC;
```
A) All employees with salary exactly 50000, sorted ascending  
B) Employees earning more than 50000, sorted descending  
C) First employee earning more than 50000  
D) Total salary of employees earning more than 50000

**Q20.** Which is the correct INSERT syntax?
A) `INSERT employees VALUES ('Patrick', 50000);`  
B) `INSERT INTO employees VALUES ('Patrick', 50000);`  
C) `ADD INTO employees ('Patrick', 50000);`  
D) `INSERT employees SET name='Patrick', salary=50000;`

## True or False

**Q21.** UPDATE and DELETE queries ALWAYS require a WHERE clause.  
**Answer:** ___________

**Q22.** In a PRIMARY KEY, values can be repeated.  
**Answer:** ___________

## Short Answer

**Q23.** Write SQL to find the number of employees in the "Engineering" department.  
**Answer:** ___________

**Q24.** What is the difference between DECIMAL(10,2) and VARCHAR(100)?  
**Answer:** ___________

---

# 🔴 SECTION D: JAVA FUNDAMENTALS (10 Questions × 1 point = 10 points)
**Time: 20 minutes**

## Multiple Choice

**Q25.** What is the correct way to declare a Java variable?
A) `int age;`  
B) `age int;`  
C) `declare int age;`  
D) `var age = int;`

**Q26.** Which of these is NOT a Java data type?
A) String  
B) boolean  
C) text  
D) double

**Q27.** What will this code output?
```java
String name = "Patrick";
int age = 25;
System.out.println("Name: " + name + ", Age: " + age);
```
A) Name: Patrick, Age: 25  
B) "Name: Patrick, Age: 25"  
C) Name: Patrick Age: 25  
D) Compilation error

**Q28.** How do you compare two strings in Java?
A) `name == "Patrick"`  
B) `name.equals("Patrick")`  
C) `name = "Patrick"`  
D) `name.compare("Patrick")`

**Q29.** What is the output?
```java
for (int i = 0; i < 3; i++) {
    System.out.println(i);
}
```
A) 0 1 2 3  
B) 1 2 3  
C) 0 1 2  
D) 3 2 1 0

## True or False

**Q30.** In Java, you must specify a type for every variable.  
**Answer:** ___________

**Q31.** A method with `void` return type can still return a value.  
**Answer:** ___________

## Short Answer

**Q32.** Write a method that takes two numbers and returns their sum.  
**Answer:** ___________

**Q33.** What does `public static void main(String[] args)` mean?  
**Answer:** ___________

**Q34.** Write code to create an array of 3 salaries and print the first one.  
**Answer:** ___________

---

# 🟣 SECTION E: DEBUGGING & LOGICAL QUESTIONS (6 Questions)
**Time: 15 minutes**

## Debugging Activity (2 points each)

**Q35.** Find and fix the error in this code:
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

**What's wrong?** ___________  
**How to fix?** ___________

---

**Q36.** Identify the error type and fix it:
```java
int salary = 50000;
if (salary = 60000) {
    System.out.println("High earner");
}
```

**Error type (Syntax/Logic/Runtime)?** ___________  
**Fixed code:** ___________

---

**Q37.** What's wrong with this code? (2 points)
```php
<?php
    $employees = array("Patrick", "Maria", "Juan");
    
    foreach ($employees as $emp) {
        echo $emp;  // Missing what?
    }
?>
```

**What's missing?** ___________  
**Fixed line:** ___________

---

## Logical Reasoning (1 point each)

**Q38.** You have an array of 100 names and need to find if "Patrick" is in it. Which is more efficient:
A) Loop through all 100 names  
B) Use a Set/HashMap  
C) Both are the same speed  
D) It depends on the names

**Answer:** ___________

---

**Q39.** You're updating employee salaries. The WHERE clause is missing. What happens?
A) Only one employee's salary is updated  
B) All employees' salaries are updated  
C) No one's salary is updated  
D) Error occurs

**Answer:** ___________

---

# 🟡 SECTION F: CODING CHALLENGE (3 points)
**Time: 10 minutes**

## **Q40.** Complete Java Program (3 points)

**Requirement:** Write a Java program that:
1. Creates an array of 3 employees with names: "Patrick", "Maria", "Juan"
2. Creates an array of their salaries: 50000, 55000, 48000
3. Creates a method called `calculateBonus(salary)` that returns 10% of salary
4. Loops through each employee and prints:
   - Employee name
   - Salary
   - Bonus (using the method)
   - Whether they're a high earner (salary > 50000)

**Example Output:**
```
Patrick: Salary=$50000.0, Bonus=$5000.0, High Earner=true
Maria: Salary=$55000.0, Bonus=$5500.0, High Earner=true
Juan: Salary=$48000.0, Bonus=$4800.0, High Earner=false
```

**Hints:**
- Use the method to calculate bonus
- Use conditional to check high earner
- Loop through arrays with index

**Your Code:**
```java
// Write your complete code here
// Remember to include class declaration and main method


```

---

## 📊 SCORING GUIDE

```
Sections A-D: 34 questions × 1 point = 34 points
Section E: 4 debugging/logical × 1-2 points = 6 points
Section F: 1 coding challenge = 3 points

TOTAL: 40 questions = 40 points
```

**Score Interpretation:**
- 28-40 (70-100%): ✅ **PASS** - Ready for exam!
- 21-27 (52-67%): ⚠️ **Need Review** - Study weak areas
- Below 21 (<52%): ❌ **Study More** - Go back to lessons

---

## 🎯 HOW TO USE THIS EXAM

1. **First Attempt:** Take it under timed conditions (90 min)
2. **Check Answers:** Compare with answer key (coming next)
3. **Review Errors:** Go back to relevant lesson
4. **Take Again:** Retake to verify improvement

---

## 💡 EXAM TIPS

✅ **Do:**
- Read questions carefully
- For coding: Write pseudocode first, then code
- For debugging: Identify error type first, then fix
- Check your work if time allows
- Use boundary values when testing

❌ **Don't:**
- Guess randomly
- Rush through questions
- Ignore error messages
- Leave coding question blank
- Second-guess too much

---

## 🚀 YOU'VE GOT THIS!

This exam covers everything from Units 1-5. If you score 70%+, you're ready for the real exam!

Remember: This is practice. The real exam will have similar question types but different scenarios.

**Take the exam, check your answers, identify weak areas, study those areas, retake it!**

Good luck! 💪

---

*Answer Key will be provided separately so you can self-grade*
