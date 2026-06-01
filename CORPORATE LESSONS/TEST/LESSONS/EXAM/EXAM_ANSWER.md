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
B) 20  
  

**Q2.** Which loop would you use if you don't know how many times to repeat?

B) While loop  

**Q3.** What is the output of this code?
```
for (i = 1; i <= 3; i++) {
    print(i)
}
```
B) 1 2 3  

## True or False

**Q4.** An array of 5 items has valid indices from 0 to 5.  
**Answer:** FALSE

**Q5.** A function can be called multiple times with different parameters.  
**Answer:** TRUE

## Short Answer

**Q6.** Write a condition that checks if age is between 18 and 65 (inclusive).  
**Answer:** if (age >= 18 && age <= 65) {}

**Q7.** What does the `%` operator do?  
**Answer:** MODAL, gets the remainder of divided numbers.

**Q8.** Create an array with 3 employee names.  
**Answer:** PHP: $employee = array("Patrick", "Arlan", "Brequillo")

---

# 🔵 SECTION B: PHP FUNDAMENTALS (8 Questions × 1 point = 8 points)
**Time: 15 minutes**

## Multiple Choice

**Q9.** What is the correct syntax for a PHP variable?
B) `$name = "Patrick";`  

**Q10.** How do you output text in PHP?
B) `echo "Hello";`  

**Q11.** What will this code output?
```php
$salary = 50000;
$tax = $salary * 0.15;
$net = $salary - $tax;
echo $net;
```
B) 42500  

## True or False

**Q12.** In PHP, `$name` and `name` are the same variable.  
**Answer:** FALSE

**Q13.** You can use both `.` and `+` for string concatenation in PHP.  
**Answer:** TRUE

## Short Answer

**Q14.** Write a PHP line that outputs "Patrick earns $50000" where Patrick and 50000 are variables.  
**Answer:** 
- $name = Patrick; $sal = 50000; echo "$name earns $sal";

**Q15.** What is the difference between `foreach` and `for` loop in PHP?  
**Answer:** 
- foreach loop is an item-driven loop where you can read through the list, item by item.
- for loop is an index-driven loop where you can count through the list using a position number.

**Q16.** Write a PHP function that takes a salary and returns 10% of it.  
**Answer:** 
- function salTen($sal) {return sal * .10}

---

# 🟠 SECTION C: MYSQL FUNDAMENTALS (8 Questions × 1 point = 8 points)
**Time: 15 minutes**

## Multiple Choice

**Q17.** What does SQL stand for?
B) Structured Query Language  

**Q18.** Which SQL command is used to create a new table?
C) CREATE TABLE  

**Q19.** What will this query return?
```sql
SELECT name, salary FROM employees WHERE salary > 50000 ORDER BY salary DESC;
```
B) Employees earning more than 50000, sorted descending  

**Q20.** Which is the correct INSERT syntax?
B) `INSERT INTO employees VALUES ('Patrick', 50000);`  

## True or False

**Q21.** UPDATE and DELETE queries ALWAYS require a WHERE clause.  
**Answer:** TRUE

**Q22.** In a PRIMARY KEY, values can be repeated.  
**Answer:** FALSE

## Short Answer

**Q23.** Write SQL to find the number of employees in the "Engineering" department.  
**Answer:** 
- SELECT COUNT(*) FROM employees WHERE department = 'ENGINEERING';

**Q24.** What is the difference between DECIMAL(10,2) and VARCHAR(100)?  
**Answer:** 
- DECIMAL is for double/float numbers that sets 10 is precision and 2 is scale, while VARCHAR is for string values where 100 is the character limit.

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