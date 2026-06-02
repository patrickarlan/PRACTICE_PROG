# 📋 GRADED EXAM ANSWERS
## Graded by: Professor AI | Date: 2026-06-02
### Overall Result: 37/40 — 92.5% ✅ EXCELLENT PASS

---

## 📊 SCORE SUMMARY

| Section | Topic | Score |
|---------|-------|-------|
| A | Basic Programming Logic | ✅ 8 / 8 |
| B | PHP Fundamentals | ❌ 5 / 8 |
| C | MySQL Fundamentals | ❌ 7 / 8 |
| D | Java Fundamentals | ✅ 10 / 10 |
| E | Debugging & Logical | ⚠️ 5 / 6 |
| F | Coding Challenge | ⚠️ 2 / 3 |
| **TOTAL** | | **37 / 40 (92.5%)** |

---

# 🟢 SECTION A: BASIC PROGRAMMING LOGIC — 8/8 ✅

**Q1.** B) 20 → ✅ **CORRECT** (5×2=10 first, then 10+10=20)

**Q2.** B) While loop → ✅ **CORRECT**

**Q3.** B) 1 2 3 → ✅ **CORRECT**

**Q4.** FALSE → ✅ **CORRECT** (Valid indices are 0–4 only)

**Q5.** TRUE → ✅ **CORRECT**

**Q6.** `if (age >= 18 && age <= 65) {}` → ✅ **CORRECT**

**Q7.** "MODAL, gets the remainder of divided numbers." → ✅ **ACCEPTED**
> ⚠️ Note: The word "MODAL" is incorrect — the correct term is **"modulo"**. However, the definition is correct. Accepted.

**Q8.** `$employee = array("Patrick", "Arlan", "Brequillo")` → ✅ **CORRECT** (Any 3 names accepted)

---

# 🔵 SECTION B: PHP FUNDAMENTALS — 5/8 ❌

**Q9.** B) `$name = "Patrick";` → ✅ **CORRECT**

**Q10.** B) `echo "Hello";` → ❌ **WRONG** [-1]
> ✏️ Correct Answer: **D) Both A and B**
> Both `print` and `echo` output text in PHP. You only picked echo — `print` also works.

**Q11.** B) 42500 → ✅ **CORRECT** (50000 × 0.15 = 7500; 50000 - 7500 = 42500)

**Q12.** FALSE → ✅ **CORRECT** (`$name` needs the `$`, plain `name` is just text)

**Q13.** TRUE → ❌ **WRONG** [-1]
> ✏️ Correct Answer: **FALSE**
> In PHP, only the `.` operator concatenates strings. The `+` operator is for numbers, NOT strings. `"Hello" + " World"` in PHP gives `0`, not `"Hello World"`.

**Q14.** `echo "$name earns $sal";` → ✅ **ACCEPTED**
> Note: Variable names `$name` and `$sal` differ from example but the technique is correct.

**Q15.** foreach = item-driven, for = index-driven → ✅ **CORRECT**

**Q16.** `function salTen($sal) {return sal * .10}` → ❌ **WRONG** [-1]
> ✏️ Correct Answer:
> ```php
> function calculateBonus($sal) {
>     return $sal * 0.10;
> }
> ```
> Two issues in your answer:
> 1. Inside the function body, `sal` should be `$sal` (missing the `$` dollar sign)
> 2. Missing semicolon after `return sal * .10`

---

# 🟠 SECTION C: MYSQL FUNDAMENTALS — 7/8 ❌

**Q17.** B) Structured Query Language → ✅ **CORRECT**

**Q18.** C) CREATE TABLE → ✅ **CORRECT**

**Q19.** B) Employees earning more than 50000, sorted descending → ✅ **CORRECT**

**Q20.** B) `INSERT INTO employees VALUES ('Patrick', 50000);` → ✅ **CORRECT**

**Q21.** TRUE → ❌ **WRONG** [-1]
> ✏️ Correct Answer: **FALSE**
> Technically, you **CAN** write UPDATE/DELETE without a WHERE clause — SQL will not give an error. However, it will affect **ALL rows**, which is very dangerous. The statement says "ALWAYS require", which is false. WHERE is best practice, but not enforced by the language.

**Q22.** FALSE → ✅ **CORRECT** (PRIMARY KEY values must be unique)

**Q23.** `SELECT COUNT(*) FROM employees WHERE department = 'ENGINEERING';` → ✅ **CORRECT**
> Note: SQL string comparison is case-insensitive in most engines. Accepted.

**Q24.** DECIMAL vs VARCHAR explanation → ✅ **CORRECT** (Precision/scale vs character limit)

---

# 🔴 SECTION D: JAVA FUNDAMENTALS — 10/10 ✅

**Q25.** A) `int age;` → ✅ **CORRECT**

**Q26.** C) text → ✅ **CORRECT** (Java uses `String`, not `text`)

**Q27.** A) Name: Patrick, Age: 25 → ✅ **CORRECT**

**Q28.** B) `name.equals("Patrick")` → ✅ **CORRECT**

**Q29.** C) 0 1 2 → ✅ **CORRECT**

**Q30.** TRUE → ✅ **CORRECT** (Java is strongly typed)

**Q31.** FALSE → ✅ **CORRECT** (`void` means no return value)

**Q32.** `public static double addNum(double a, double b) {return a + b}` → ✅ **ACCEPTED**
> Note: Missing semicolon inside `{}` but the logic and structure are correct. Accepted.

**Q33.** "it means its the main method for an entry point..." → ✅ **CORRECT**

**Q34.** `double[] salaries = {1000, 2000, 3000}; System.out.println(salaries[0]);` → ✅ **CORRECT**

---

# 🟣 SECTION E: DEBUGGING & LOGICAL — 5/6 ⚠️

## Debugging (2 points each)

**Q35.** Array loop fix → **1/2** ⚠️
> ✅ **Fix is CORRECT** — changed `<=` to `<`
> ❌ **Error type is WRONG** — You said "syntax error in <=". That is incorrect.
> ✏️ The correct error type is: **Runtime Error** (specifically: `ArrayIndexOutOfBoundsException`)
> The `<=` is valid syntax — it only causes a crash *when the program runs*, making it a Runtime Error.

**Q36.** Assignment vs comparison fix → **1/2** ⚠️
> ✅ **Fix is CORRECT** — changed `=` to `==`
> ❌ **Error type label is WRONG** — You described the compiler message, not the type.
> ✏️ The question asks for **Syntax/Logic/Runtime**. The correct answer is: **Syntax Error**
> (The compiler rejects `if (salary = 60000)` because it expects a boolean, not an assignment)

**Q37.** Missing separator → **2/2** ✅ **CORRECT**
> Adding `echo "$emp ";` with a space is a valid fix. Full marks.

## Logical Reasoning (1 point each)

**Q38.** B) Use a Set/HashMap → ✅ **CORRECT** (O(1) lookup vs O(n) loop)

**Q39.** B) All employees' salaries are updated → ✅ **CORRECT**

---

# 🟡 SECTION F: CODING CHALLENGE — 2/3 ⚠️

**Q40.** Java Program

**Point 1 — Arrays created correctly:** ✅ **(1/1)**
> `String[] empl` and `double[] sal` with correct names and salaries. ✅

**Point 2 — Method created and called correctly:** ⚠️ **(0.5/1)**
> ⚠️ Your `calculateBonus` takes **two parameters** `(double sal, double bonus)`, but the requirement specifies it should only take **one** `(double salary)` with the 10% hardcoded inside.
> The correct signature: `public static double calculateBonus(double salary) { return salary * 0.10; }`
> Your version works functionally when called as `calculateBonus(sal[i], 0.10)` but the method signature does not match the requirement.

**Point 3 — Loop + Output format:** ⚠️ **(0.5/1)**
> ✅ Loop logic is correct
> ❌ Output format doesn't match the expected format:
> - Expected: `Patrick: Salary=$50000.0, Bonus=$5000.0, High Earner=true`
> - Yours outputs: `Patrick: Salary = $50000.0, 5000.0, High Earner = true`
> Issues: Space around `=` in "Salary = $", missing "Bonus=$" label before the bonus value, space around `=` in "High Earner = "

---

## 🔴 ITEMS TO RETRY (4 items)

| # | Question | What Was Wrong |
|---|----------|----------------|
| Q10 | PHP output syntax | Answered B (echo only) — Correct is D (both print AND echo) |
| Q13 | PHP string concatenation | Said TRUE — Correct is FALSE (only `.` works, not `+`) |
| Q16 | PHP function | Missing `$` on `sal` inside function body |
| Q21 | UPDATE/DELETE WHERE | Said TRUE — Correct is FALSE (WHERE is not required by SQL) |

> See **EXAM_RETRY.md** for your retry questions.

---

*"Great performance, Patrick! 37/40 is excellent. Study the 4 wrong items and you're fully exam-ready! 💪"*
