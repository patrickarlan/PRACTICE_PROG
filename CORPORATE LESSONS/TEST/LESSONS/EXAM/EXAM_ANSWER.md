# 📊 GRADE: 37/40 — 92.5% ✅ EXCELLENT PASS
> See **EXAM_ANSWER_GRADED.md** for full professor feedback | **EXAM_RETRY.md** for your retry questions.

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
B) 20 → ✅ CORRECT
  

**Q2.** Which loop would you use if you don't know how many times to repeat?

B) While loop → ✅ CORRECT

**Q3.** What is the output of this code?
```
for (i = 1; i <= 3; i++) {
    print(i)
}
```
B) 1 2 3 → ✅ CORRECT

## True or False

**Q4.** An array of 5 items has valid indices from 0 to 5.  
**Answer:** FALSE → ✅ CORRECT

**Q5.** A function can be called multiple times with different parameters.  
**Answer:** TRUE → ✅ CORRECT

## Short Answer

**Q6.** Write a condition that checks if age is between 18 and 65 (inclusive).  
**Answer:** if (age >= 18 && age <= 65) {} → ✅ CORRECT

**Q7.** What does the `%` operator do?  
**Answer:** MODAL, gets the remainder of divided numbers. → ✅ ACCEPTED *(note: correct term is "modulo", not "MODAL")*

**Q8.** Create an array with 3 employee names.  
**Answer:** PHP: $employee = array("Patrick", "Arlan", "Brequillo") → ✅ CORRECT

---

# 🔵 SECTION B: PHP FUNDAMENTALS (8 Questions × 1 point = 8 points)
**Time: 15 minutes**

## Multiple Choice

**Q9.** What is the correct syntax for a PHP variable?
B) `$name = "Patrick";` → ✅ CORRECT

**Q10.** How do you output text in PHP?
B) `echo "Hello";` → ❌ WRONG | Correct: D) Both A and B (`print` also works in PHP!)

**Q11.** What will this code output?
```php
$salary = 50000;
$tax = $salary * 0.15;
$net = $salary - $tax;
echo $net;
```
B) 42500 → ✅ CORRECT

## True or False

**Q12.** In PHP, `$name` and `name` are the same variable.  
**Answer:** FALSE → ✅ CORRECT

**Q13.** You can use both `.` and `+` for string concatenation in PHP.  
**Answer:** TRUE → ❌ WRONG | Correct: FALSE (PHP uses `.` for concatenation, `+` is for numbers only)

## Short Answer

**Q14.** Write a PHP line that outputs "Patrick earns $50000" where Patrick and 50000 are variables.  
**Answer:** 
- $name = Patrick; $sal = 50000; echo "$name earns $sal"; → ✅ ACCEPTED

**Q15.** What is the difference between `foreach` and `for` loop in PHP?  
**Answer:** 
- foreach loop is an item-driven loop where you can read through the list, item by item.
- for loop is an index-driven loop where you can count through the list using a position number.
→ ✅ CORRECT

**Q16.** Write a PHP function that takes a salary and returns 10% of it.  
**Answer:** 
- function salTen($sal) {return sal * .10} → ❌ WRONG | Missing `$` on `sal` inside function body. Should be: `return $sal * 0.10;`

---

# 🟠 SECTION C: MYSQL FUNDAMENTALS (8 Questions × 1 point = 8 points)
**Time: 15 minutes**

## Multiple Choice

**Q17.** What does SQL stand for?
B) Structured Query Language → ✅ CORRECT

**Q18.** Which SQL command is used to create a new table?
C) CREATE TABLE → ✅ CORRECT

**Q19.** What will this query return?
```sql
SELECT name, salary FROM employees WHERE salary > 50000 ORDER BY salary DESC;
```
B) Employees earning more than 50000, sorted descending → ✅ CORRECT

**Q20.** Which is the correct INSERT syntax?
B) `INSERT INTO employees VALUES ('Patrick', 50000);` → ✅ CORRECT

## True or False

**Q21.** UPDATE and DELETE queries ALWAYS require a WHERE clause.  
**Answer:** TRUE → ❌ WRONG | Correct: FALSE (SQL doesn't REQUIRE WHERE — it just affects ALL rows without it)

**Q22.** In a PRIMARY KEY, values can be repeated.  
**Answer:** FALSE → ✅ CORRECT (PRIMARY KEY must be unique)

## Short Answer

**Q23.** Write SQL to find the number of employees in the "Engineering" department.  
**Answer:** 
- SELECT COUNT(*) FROM employees WHERE department = 'ENGINEERING'; → ✅ CORRECT

**Q24.** What is the difference between DECIMAL(10,2) and VARCHAR(100)?  
**Answer:** 
- DECIMAL is for double/float numbers that sets 10 is precision and 2 is scale, while VARCHAR is for string values where 100 is the character limit. → ✅ CORRECT

---

# 🔴 SECTION D: JAVA FUNDAMENTALS (10 Questions × 1 point = 10 points)
**Time: 20 minutes**

## Multiple Choice

**Q25.** What is the correct way to declare a Java variable?
A) `int age;` → ✅ CORRECT

**Q26.** Which of these is NOT a Java data type?
C) text → ✅ CORRECT

**Q27.** What will this code output?
```java
String name = "Patrick";
int age = 25;
System.out.println("Name: " + name + ", Age: " + age);
```
A) Name: Patrick, Age: 25 → ✅ CORRECT

**Q28.** How do you compare two strings in Java?
B) `name.equals("Patrick")` → ✅ CORRECT

**Q29.** What is the output?
```java
for (int i = 0; i < 3; i++) {
    System.out.println(i);
}
```
C) 0 1 2 → ✅ CORRECT

## True or False

**Q30.** In Java, you must specify a type for every variable.  
**Answer:** TRUE → ✅ CORRECT

**Q31.** A method with `void` return type can still return a value.  
**Answer:** FALSE → ✅ CORRECT

## Short Answer

**Q32.** Write a method that takes two numbers and returns their sum.  
**Answer:** 
- public static double addNum(double a, double b) {return a + b} → ✅ ACCEPTED (logic correct, missing semicolon inside but structure is right)

**Q33.** What does `public static void main(String[] args)` mean?  
**Answer:** 
- it means its the main method for an entry point of any standalone java application. → ✅ CORRECT

**Q34.** Write code to create an array of 3 salaries and print the first one.  
**Answer:** 
- double[] salaries = {1000, 2000, 3000}; System.out.println(salaries[0]); → ✅ CORRECT

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

**What's wrong?** - syntax error in <= → ❌ WRONG ERROR TYPE | It is a **Runtime Error** (ArrayIndexOutOfBoundsException), NOT a syntax error. `<=` is valid syntax.
**How to fix?** - changed into < → ✅ CORRECT FIX
> ⚠️ Score: 1/2 (fix correct, error type wrong)
```java
public class Employee {
    public static void main(String[] args) {
        String[] names = {"Patrick", "Maria", "Juan"};
        
        for (int i = 0; i < names.length; i++) { 
            System.out.println(names[i]);
        }
    }
}
```
---

**Q36.** Identify the error type and fix it:
```java
int salary = 50000;
if (salary = 60000) {
    System.out.println("High earner");
}
```

**Error type (Syntax/Logic/Runtime)?** incompatible types: int cannot be convert into boolean → ⚠️ PARTIAL | You described the compiler message, not the error type. Correct type label: **Syntax Error**. Fix below is correct.
> ⚠️ Score: 1/2 (fix correct, type label not answered as Syntax/Logic/Runtime)
**Fixed code:** 
```java
int salary = 50000;
if (salary == 60000) {
    System.out.println("High earner");
}
```

> **Q40 Score: 2/3** ⚠️
> - ✅ Point 1: Arrays created correctly (names + salaries)
> - ⚠️ Point 2: Method signature wrong — should be `calculateBonus(double salary)` with 1 param only, not 2
> - ⚠️ Point 3: Output format mismatch — missing `Bonus=$` label; has extra spaces around `=` in labels

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

**What's missing?** The code is runnable, however, a space is missing in order for the names to be properly print → ✅ CORRECT
**Fixed line:** 
- echo "$emp "; → ✅ CORRECT | Score: 2/2

---

## Logical Reasoning (1 point each)

**Q38.** You have an array of 100 names and need to find if "Patrick" is in it. Which is more efficient:
**Answer:** 
- B) Use a Set/HashMap → ✅ CORRECT (O(1) lookup vs O(n) loop)
---

**Q39.** You're updating employee salaries. The WHERE clause is missing. What happens?
**Answer:**
- B) All employees' salaries are updated → ✅ CORRECT
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

public class sectionF {
	
	
	public static double calculateBonus(double sal, double bonus) {
		  return sal * bonus;
	  }
	
	public static void main(String[] args) {
		String[] empl = {"Patrick", "Maria", "Juan"};
		double[] sal = {50000, 55000, 48000};
		
		for (int i = 0; i < empl.length; i++) {
			System.out.println(
				empl[i] + ": Salary = $" +
				sal[i] + ", " + 
				calculateBonus(sal[i], 0.10) + ", " +
				"High Earner = " +
				(sal[i] > 50000)
			);
		}
	}
}
```

---
