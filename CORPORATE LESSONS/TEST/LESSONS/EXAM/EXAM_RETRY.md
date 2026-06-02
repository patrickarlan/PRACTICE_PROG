# 📋 EXAM RETRY — FULL PERFECTION LIST
## For: Patrick Arlan | Retry Date: 02/06/2026
## Goal: Perfect score — re-answer everything that wasn't 100% correct

---

> **Items included:**
> - ❌ **Fully wrong:** Q10, Q13, Q16, Q21
> - ⚠️ **Partial credit (fix was right, label was wrong):** Q35, Q36
> - ⚠️ **Partial credit (logic right, format/signature off):** Q40

---

# 🔵 SECTION B: PHP FUNDAMENTALS

## Q10. How do you output text in PHP?

**Your Answer:** D) Both A and B → ✅ CORRECT

---

## Q13. You can use both `.` and `+` for string concatenation in PHP.

**Your Answer (True/False):** FALSE → ✅ CORRECT (PHP only uses `.` for concatenation, `+` is for numbers)

---

## Q16. Write a PHP function that takes a salary and returns 10% of it.

> ⚠️ Your previous answer had `sal` without `$` inside the function body. Remember: ALL PHP variables need `$`.

**Your Answer:** → ✅ CORRECT (`$sal` properly used inside the function)
```php
function salCal($sal) {
	return $sal * 0.10;
}
```
---

# 🟠 SECTION C: MYSQL FUNDAMENTALS

## Q21. UPDATE and DELETE queries ALWAYS require a WHERE clause.

> ⚠️ Think carefully about the word "ALWAYS" — does SQL actually *prevent* you from running without WHERE?

**Your Answer (True/False):** FALSE → ✅ CORRECT (SQL does NOT require WHERE — it's just dangerous without it)

---

# 🟣 SECTION E: DEBUGGING

## Q35. Find and fix the error in this code:

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

> ⚠️ Your fix was correct last time. This retry focuses on the **error type label only**.
> Choose from: **Syntax Error / Logic Error / Runtime Error**

**What's wrong?** <= IN for loop: for (int i = 0; i <= names.length; i++) → ✅ CORRECT

**Error type (Syntax/Logic/Runtime)?** RUNTIME ERROR: ArrayIndexOutOfBounds → ✅ CORRECT

**How to fix?** use < instead of <= → ✅ CORRECT

---

## Q36. Identify the error type and fix it:

```java
int salary = 50000;
if (salary = 60000) {
    System.out.println("High earner");
}
```

> ⚠️ Your fix was correct last time. This retry focuses on the **error type label only**.
> Do NOT describe the error message — answer using: **Syntax Error / Logic Error / Runtime Error**

**Error type (Syntax/Logic/Runtime)?** SYNTAX ERROR: in `if (salary = 60000) {}` → ✅ CORRECT

**Fixed code:**
```java
int salary = 50000;
if (salary == 60000) {
    System.out.println("High earner");
}
```
---

# 🟡 SECTION F: CODING CHALLENGE

## Q40. Complete Java Program (3 points)

**Requirement:** Write a Java program that:
1. Creates an array of 3 employees with names: "Patrick", "Maria", "Juan"
2. Creates an array of their salaries: 50000, 55000, 48000
3. Creates a method called `calculateBonus(salary)` that returns 10% of salary — **one parameter only, 10% hardcoded inside**
4. Loops through each employee and prints:
   - Employee name
   - Salary
   - Bonus (using the method)
   - Whether they're a high earner (salary > 50000)

**Expected Output (match this exactly):**
```
Patrick: Salary=$50000.0, Bonus=$5000.0, High Earner=false
Maria: Salary=$55000.0, Bonus=$5500.0, High Earner=true
Juan: Salary=$48000.0, Bonus=$4800.0, High Earner=false
```

> ⚠️ Two things to fix from last time:
> 1. `calculateBonus` must take **only one parameter** (`double salary`) — the 10% goes inside the method
> 2. Output format must match **exactly** — no spaces around `=`, include the `Bonus=$` label

**Your Corrected Code:** → ✅ CORRECT (1-param method ✅, output format exact ✅, High Earner logic correct ✅)
```java
// Write your complete corrected code here
// Remember: class declaration, calculateBonus method (1 param), main method
public class sectionF {
	
	
	public static double calculateBonus(double sal) {
		  return sal * 0.10;
	  }
	
	public static void main(String[] args) {
		String[] empl = {"Patrick", "Maria", "Juan"};
		double[] sal = {50000, 55000, 48000};
		
		for (int i = 0; i < empl.length; i++) {
			System.out.println(
				empl[i] + ": Salary=$" +
				sal[i] + ", " + 
				"Bonus=$" +
				calculateBonus(sal[i]) + ", " +
				"High Earner=" +
				(sal[i] > 50000)
			);
		}
	}
}


```

---

## 🏆 RETRY RESULT: 7/7 — 100% PERFECT!

> **Professor's Note:** Excellent work, Patrick! Every single item is now correct. You clearly understood your mistakes and fixed them properly. Q40 in particular showed great improvement — correct method signature, correct output format, and correct logic. You are FULLY ready for Wednesday's exam! 🚀💪
