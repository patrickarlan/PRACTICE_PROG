# 🔴 UNIT 4: JAVA FUNDAMENTALS
## Lesson 4: Object-Oriented Language

**Duration:** 3-4 hours of focused study  
**What You'll Learn:** How to write programs in Java and understand object-oriented basics  
**Why It Matters:** Java is one of the most popular languages. Many companies use it. Master Java syntax, and you master a language used worldwide.

---

## 📖 Introduction: What is Java?

Think of **Java as a stricter, more organized colleague**:
- **Python/PHP:** Relaxed, flexible (you can do things many ways)
- **Java:** Strict, organized (one right way, everything must be declared clearly)

**Key difference from PHP:**
- **PHP:** Runs on a server, sends HTML to browser
- **Java:** Runs on a computer (desktop, server, or phone), creates complete programs

Java is **compiled**, meaning you write code → Java converts it to machine code → then it runs. This makes it faster and catches errors before running.

```
You write Java code (.java file)
    ↓
Java Compiler converts to machine code (.class file)
    ↓
Java Virtual Machine (JVM) runs the machine code
    ↓
Program executes
```

**The Philosophy:** "Write once, run anywhere" - Same Java code runs on Windows, Mac, Linux without changes.

---

## Lesson 4.1: Java Basics — Structure & Syntax

### 🧠 The Concept

Every Java program needs a **class** and a **main method**. Think of it like a building:
- **Class** = The entire building
- **Main method** = The front door (entry point)

### 📝 Basic Java Program

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

**Reading Line by Line:**
- Line 1: "Create a public class called HelloWorld"
- Line 2: "Create the main method - this is where the program starts"
- Line 3: "Print the text 'Hello, World!' to the console"
- Line 4: "End the main method"
- Line 5: "End the class"

**To Run This:**
1. Save as `HelloWorld.java`
2. Compile: `javac HelloWorld.java` (creates HelloWorld.class)
3. Run: `java HelloWorld` (executes the program)

### 📝 Understanding the Syntax

```java
public class ClassName {
    // Class code goes here
}
```

- `public` = Anyone can use this
- `class` = This is a class (template/blueprint)
- `ClassName` = Name of the class (must match filename)

### 📝 The Main Method

```java
public static void main(String[] args) {
    // Program code goes here
}
```

- `public` = Can be called from anywhere
- `static` = Belongs to the class, not to individual objects
- `void` = Doesn't return anything
- `String[] args` = Can receive text commands when starting the program
- `main` = Special name - Java looks for this to start

**Think of it:** Every Java program needs a main method to know where to start executing.

### 🎬 Real-World Example: Employee Information Program

```java
public class EmployeeInfo {
    public static void main(String[] args) {
        System.out.println("===== EMPLOYEE MANAGEMENT SYSTEM =====");
        System.out.println("Welcome to the system");
        System.out.println("========================================");
    }
}
```

**Output:**
```
===== EMPLOYEE MANAGEMENT SYSTEM =====
Welcome to the system
========================================
```

---

## Lesson 4.2: Java Variables & Data Types

### 🧠 The Concept

Java is **strongly typed**, meaning you must declare what type each variable is. This prevents mistakes.

### 📝 Basic Data Types

| Type | Use | Example |
|------|-----|---------|
| `int` | Whole numbers | 25, 1001, 50000 |
| `double` | Decimal numbers | 50000.50, 123.45 |
| `String` | Text | "Patrick", "Engineering" |
| `boolean` | True/False | true, false |
| `char` | Single character | 'A', 'P' |

### 📝 Declaring Variables

```java
public class EmployeeData {
    public static void main(String[] args) {
        // Declare and initialize variables
        String name = "Patrick";
        int age = 25;
        double salary = 50000.50;
        boolean isActive = true;
        
        // Print variables
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Salary: " + salary);
        System.out.println("Active: " + isActive);
    }
}
```

**Reading Like English:**
- "Create a String variable called name with value Patrick"
- "Create an int variable called age with value 25"
- "Create a double variable called salary with value 50000.50"
- "Create a boolean variable called isActive with value true"

**Output:**
```
Name: Patrick
Age: 25
Salary: 50000.5
Active: true
```

### 📝 Key Differences from PHP

| Concept | PHP | Java |
|---------|-----|------|
| Variable declaration | `$name = "Patrick";` | `String name = "Patrick";` |
| Data type needed? | No (flexible) | Yes (required) |
| String concatenation | `"Hello " . $name` | `"Hello " + name` |
| Print to console | `echo` | `System.out.println()` |

### 🎬 Real-World Example: Employee Salary Calculation

```java
public class SalaryCalculator {
    public static void main(String[] args) {
        String employeeName = "Patrick";
        int employeeId = 1001;
        double grossSalary = 50000;
        double taxRate = 0.15;  // 15% tax
        
        double tax = grossSalary * taxRate;
        double netSalary = grossSalary - tax;
        
        System.out.println("Employee: " + employeeName);
        System.out.println("ID: " + employeeId);
        System.out.println("Gross Salary: $" + grossSalary);
        System.out.println("Tax (15%): $" + tax);
        System.out.println("Net Salary: $" + netSalary);
    }
}
```

**Output:**
```
Employee: Patrick
ID: 1001
Gross Salary: $50000.0
Tax (15%): $7500.0
Net Salary: $42500.0
```

---

## Lesson 4.3: Java Conditionals — Making Decisions

### 🧠 The Concept

Use `if`, `else if`, and `else` to make decisions. Java syntax is similar to PHP but requires more structure.

### 📝 Basic If/Else

```java
int age = 25;

if (age >= 18) {
    System.out.println("You are an adult");
} else {
    System.out.println("You are a minor");
}
```

**Output:** `You are an adult`

### 📝 Multiple Conditions (else if)

```java
int score = 85;

if (score >= 90) {
    System.out.println("Grade: A");
} else if (score >= 80) {
    System.out.println("Grade: B");
} else if (score >= 70) {
    System.out.println("Grade: C");
} else {
    System.out.println("Grade: F");
}
```

**Output:** `Grade: B`

### 📝 Logical Operators (AND, OR)

```java
int salary = 50000;
String department = "Engineering";

if (department.equals("Engineering") && salary > 45000) {
    System.out.println("Eligible for bonus");
} else {
    System.out.println("Not eligible");
}
```

**Reading Like English:**
- "If department equals Engineering AND salary is greater than 45000"
- "Then print Eligible for bonus"

**Important:** Use `.equals()` to compare Strings in Java, not `==`

### 📝 Switch Statement (Cleaner for Many Conditions)

```java
String department = "Engineering";

switch (department) {
    case "Engineering":
        System.out.println("Tech department");
        break;
    case "HR":
        System.out.println("Human Resources");
        break;
    case "Sales":
        System.out.println("Sales department");
        break;
    default:
        System.out.println("Unknown department");
}
```

**Output:** `Tech department`

### 🎬 Real-World Example: Employee Bonus Eligibility

```java
public class BonusCalculator {
    public static void main(String[] args) {
        int yearsWorked = 5;
        double salary = 50000;
        
        if (yearsWorked >= 5 && salary >= 50000) {
            System.out.println("Bonus: 15%");
        } else if (yearsWorked >= 3 && salary >= 40000) {
            System.out.println("Bonus: 10%");
        } else if (yearsWorked >= 1) {
            System.out.println("Bonus: 5%");
        } else {
            System.out.println("No bonus");
        }
    }
}
```

**Output:** `Bonus: 15%`

---

## Lesson 4.4: Java Loops — Repeating Actions

### 🧠 The Concept

Loops repeat code multiple times. Java has three main types: `for`, `while`, and `for-each`.

### 📝 For Loop (When You Know How Many Times)

```java
for (int i = 1; i <= 5; i++) {
    System.out.println("Count: " + i);
}
```

**Output:**
```
Count: 1
Count: 2
Count: 3
Count: 4
Count: 5
```

**Breaking Down the For Loop:**
```
for (initialize; condition; increment)
     │          │        │       │
     │          │        │       └─ i++ (increase by 1 each time)
     │          │        └─────────── i <= 5 (continue while true)
     │          └──────────────────── int i = 1 (start value)
     └────────────────────────────── for keyword
```

### 📝 While Loop (When You Don't Know How Many Times)

```java
int count = 0;

while (count < 5) {
    System.out.println("Count: " + count);
    count++;  // Increase by 1
}
```

**Output:**
```
Count: 0
Count: 1
Count: 2
Count: 3
Count: 4
```

### 📝 For-Each Loop (Loop Through Arrays)

```java
String[] employees = {"Patrick", "Maria", "Juan", "Rosa"};

for (String name : employees) {
    System.out.println("Employee: " + name);
}
```

**Output:**
```
Employee: Patrick
Employee: Maria
Employee: Juan
Employee: Rosa
```

**Reading Like English:** "For each name in employees array, print Employee: plus the name"

### 🎬 Real-World Example: Payroll System

```java
public class PayrollSystem {
    public static void main(String[] args) {
        String[] employees = {"Patrick", "Maria", "Juan"};
        double salary = 50000;
        
        System.out.println("===== MONTHLY PAYROLL =====");
        
        for (String name : employees) {
            double monthlyPay = salary / 12;
            System.out.println(name + ": $" + monthlyPay);
        }
    }
}
```

**Output:**
```
===== MONTHLY PAYROLL =====
Patrick: $4166.666666666667
Maria: $4166.666666666667
Juan: $4166.666666666667
```

---

## Lesson 4.5: Java Methods — Reusable Code Blocks

### 🧠 The Concept

A **method** is like a function. You write it once, call it many times. Think of it as a recipe you use repeatedly.

### 📝 Basic Method

```java
public class EmployeeBonus {
    
    // Define the method
    public static double calculateBonus(double salary) {
        double bonus = salary * 0.10;  // 10% bonus
        return bonus;
    }
    
    // Main method
    public static void main(String[] args) {
        // Call the method
        double bonus1 = calculateBonus(50000);   // 5000
        double bonus2 = calculateBonus(60000);   // 6000
        
        System.out.println("Bonus 1: $" + bonus1);
        System.out.println("Bonus 2: $" + bonus2);
    }
}
```

**Output:**
```
Bonus 1: $5000.0
Bonus 2: $6000.0
```

### 📝 Method Syntax

```java
public static return_type methodName(parameter1, parameter2) {
    // Code here
    return value;
}
```

- `public` = Anyone can call this
- `static` = Belongs to class, not to objects
- `return_type` = What the method returns (int, double, String, void)
- `methodName` = Name of the method
- `(parameters)` = Input data the method needs
- `return` = Send back a value

### 📝 Method with Multiple Parameters

```java
public static double calculateNetSalary(double salary, double taxRate) {
    double tax = salary * taxRate;
    double net = salary - tax;
    return net;
}

// Call it:
double netSalary = calculateNetSalary(50000, 0.15);  // 42500
System.out.println("Net: $" + netSalary);
```

### 📝 Method That Doesn't Return (void)

```java
public static void printEmployeeInfo(String name, String department) {
    System.out.println("Name: " + name);
    System.out.println("Department: " + department);
}

// Call it:
printEmployeeInfo("Patrick", "Engineering");
```

**Output:**
```
Name: Patrick
Department: Engineering
```

### 🎬 Real-World Example: Complete Salary Calculator

```java
public class CompleteCalculator {
    
    // Calculate tax (15%)
    public static double calculateTax(double salary) {
        return salary * 0.15;
    }
    
    // Calculate net salary
    public static double calculateNet(double salary, double tax) {
        return salary - tax;
    }
    
    // Calculate bonus (10%)
    public static double calculateBonus(double salary) {
        return salary * 0.10;
    }
    
    public static void main(String[] args) {
        double salary = 50000;
        double tax = calculateTax(salary);
        double net = calculateNet(salary, tax);
        double bonus = calculateBonus(salary);
        
        System.out.println("Gross: $" + salary);
        System.out.println("Tax: $" + tax);
        System.out.println("Net: $" + net);
        System.out.println("Bonus: $" + bonus);
    }
}
```

**Output:**
```
Gross: $50000.0
Tax: $7500.0
Net: $42500.0
Bonus: $5000.0
```

---

## Lesson 4.6: Java Arrays — Storing Multiple Items

### 🧠 The Concept

An **array** stores multiple values of the same type. Think of it as a row of boxes, each holding one item.

### 📝 Creating Arrays

```java
// Array of Strings
String[] employees = {"Patrick", "Maria", "Juan", "Rosa"};

// Access items (remember: index starts at 0)
System.out.println(employees[0]);  // Patrick
System.out.println(employees[1]);  // Maria
System.out.println(employees[2]);  // Juan

// Get array length
int count = employees.length;  // 4
System.out.println("Total: " + count);
```

### 📝 Array of Numbers

```java
int[] salaries = {50000, 55000, 48000, 52000};

// Loop through array
for (int i = 0; i < salaries.length; i++) {
    System.out.println("Salary " + i + ": $" + salaries[i]);
}
```

**Output:**
```
Salary 0: $50000
Salary 1: $55000
Salary 2: $48000
Salary 3: $52000
```

### 📝 Array of Objects (Advanced)

In Java, you can create an array of custom objects. For now, understand the concept:

```java
// Create array of people (we'll simplify this)
String[][] employees = {
    {"Patrick", "Engineering", "50000"},
    {"Maria", "HR", "45000"},
    {"Juan", "Sales", "48000"}
};

// Loop through employees
for (int i = 0; i < employees.length; i++) {
    System.out.println("Name: " + employees[i][0]);
    System.out.println("Department: " + employees[i][1]);
    System.out.println("Salary: $" + employees[i][2]);
    System.out.println("---");
}
```

### 📝 ArrayList (Dynamic Arrays)

Unlike regular arrays, `ArrayList` grows as needed:

```java
import java.util.ArrayList;

ArrayList<String> teamMembers = new ArrayList<>();
teamMembers.add("Patrick");
teamMembers.add("Maria");
teamMembers.add("Juan");

// Access items
System.out.println(teamMembers.get(0));  // Patrick

// Loop through
for (String member : teamMembers) {
    System.out.println("Team: " + member);
}

// Get size
System.out.println("Total: " + teamMembers.size());
```

### 🎬 Real-World Example: Employee Report

```java
public class EmployeeReport {
    public static void main(String[] args) {
        String[] names = {"Patrick", "Maria", "Juan", "Rosa"};
        double[] salaries = {50000, 55000, 48000, 52000};
        
        System.out.println("===== EMPLOYEE REPORT =====");
        
        double total = 0;
        for (int i = 0; i < names.length; i++) {
            System.out.println(names[i] + ": $" + salaries[i]);
            total += salaries[i];
        }
        
        System.out.println("Total Salary: $" + total);
        System.out.println("Average Salary: $" + (total / names.length));
    }
}
```

**Output:**
```
===== EMPLOYEE REPORT =====
Patrick: $50000.0
Maria: $55000.0
Juan: $48000.0
Rosa: $52000.0
Total Salary: $205000.0
Average Salary: $51250.0
```

---

## 📝 COMPREHENSIVE ACTIVITIES

### Activity 1: Basic Output & Variables

**Hint:** Create a class with a main method. Use `System.out.println()` to print. Declare variables with types (String, int, double).

**Task:**
Create a Java program that:
1. Declares 4 variables: name (String), employeeId (int), department (String), salary (double)
2. Assign values to each (about yourself or someone you know)
3. Print them with labels

**Expected Output (example):**
```
Name: Patrick Arlan
Employee ID: 1001
Department: Engineering
Salary: $55000.0
```

---

### Activity 2: Conditionals

**Hint:** Use `if`, `else if`, `else` statements. Remember to use `.equals()` when comparing Strings.

**Task:**
Create a Java program that:
1. Takes a salary value
2. Determines bonus eligibility:
   - If salary >= 50000: "15% bonus"
   - If salary >= 40000: "10% bonus"
   - Otherwise: "5% bonus"

**Expected Output (example with 50000):**
```
Salary: $50000
Bonus: 15%
```

---

### Activity 3: Loops

**Hint:** Use `for` loop to repeat. Use loop counter `i` to control how many times. Print inside the loop.

**Task:**
Create a Java program that:
1. Uses a for loop to print numbers 1 to 10
2. Uses a while loop to count down from 10 to 1
3. Uses a for-each loop to print employee names from an array

**Expected Output (example):**
```
1 2 3 4 5 6 7 8 9 10
10 9 8 7 6 5 4 3 2 1
Patrick Maria Juan Rosa
```

---

### Activity 4: Methods

**Hint:** Define method with `public static return_type methodName(parameters)`. Use `return` to send back value. Call it from main.

**Task:**
Create a Java program with 3 methods:
1. `calculateTax(salary)` - Returns 15% of salary
2. `calculateNetSalary(salary)` - Returns salary minus tax
3. `isHighEarner(salary)` - Returns true if salary > 60000

Test each method with salary = 50000

**Expected Output (example):**
```
Gross: $50000.0
Tax: $7500.0
Net: $42500.0
High Earner: false
```

---

### Activity 5: Arrays

**Hint:** Create array with `Type[] name = {value1, value2, ...}`. Loop with `for` or `for-each`. Use `.length` to get size.

**Task:**
Create a Java program that:
1. Creates an array of 5 employee names
2. Creates an array of 5 corresponding salaries
3. Loops through and displays each name with salary
4. Calculates total salary
5. Calculates average salary

**Expected Output (example):**
```
Patrick: $50000.0
Maria: $55000.0
Juan: $48000.0
Rosa: $52000.0
Miguel: $45000.0
Total Salary: $250000.0
Average Salary: $50000.0
```

---

### Activity 6: Complete Program (Challenge)

**Hint:** Combine all skills: variables, conditionals, loops, methods, arrays. Create a realistic employee management scenario.

**Task:**
Create a complete Java program that:
1. Defines an array of employee names
2. Defines an array of their salaries
3. Uses a method to calculate bonus (10% for all)
4. Loops through employees and displays:
   - Name, salary, bonus
   - Whether they're a high earner (>50000)
5. Shows total salary and total bonus budget

**Expected Output (example):**
```
===== PAYROLL SYSTEM =====
Patrick: $50000.0, Bonus: $5000.0, High Earner: true
Maria: $55000.0, Bonus: $5500.0, High Earner: true
Juan: $48000.0, Bonus: $4800.0, High Earner: false
Total Salary: $153000.0
Total Bonus Budget: $15300.0
```

---

## Lesson 4.7: Imports & Using Classes From Other Files

### 🧠 The Concept

In real programs, you don't put everything in one file. You split code into multiple files (one class per file), then **import** them when you need them.

**Think of it:** Like a restaurant having separate departments (kitchen, cashier, delivery). You call methods from other departments, you don't do everything yourself.

### 📝 File Organization

**Typical Project Structure:**
```
Project/
├── Calculator.java          (Helper class with calculation methods)
├── Employee.java            (Helper class with employee data)
├── Main.java               (Main program that uses other classes)
└── EmployeePayroll.java    (Another program using same classes)
```

---

### 📝 Basic Import (Built-in Classes)

**Built-in Java imports** - These come with Java automatically:

```java
import java.util.ArrayList;    // Import ArrayList from java.util package
import java.util.HashMap;      // Import HashMap from java.util package
import java.util.*;            // Import ALL classes from java.util

public class MyProgram {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();  // Can use ArrayList now
        HashMap<Integer, String> map = new HashMap<>();
    }
}
```

**Common Imports:**
```java
import java.util.ArrayList;     // Dynamic arrays
import java.util.HashMap;       // Hash maps
import java.util.List;          // List interface
import java.util.Set;           // Set interface
import java.util.Stack;         // Stack
import java.util.Queue;         // Queue
```

---

### 📝 Custom Import (Your Own Classes)

**Scenario:** You create multiple files for organization.

**File 1: Calculator.java** (Helper class)
```java
public class Calculator {
    // Methods that other classes can use
    public static double calculateBonus(double salary) {
        return salary * 0.10;  // 10% bonus
    }
    
    public static double calculateTax(double salary) {
        return salary * 0.15;  // 15% tax
    }
}
```

**File 2: Employee.java** (Another helper class)
```java
public class Employee {
    public String name;
    public int id;
    public double salary;
    
    // Constructor
    public Employee(String name, int id, double salary) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }
    
    public void display() {
        System.out.println("Name: " + name + ", ID: " + id + ", Salary: $" + salary);
    }
}
```

**File 3: PayrollSystem.java** (Main program using both)
```java
public class PayrollSystem {
    public static void main(String[] args) {
        // Create employee
        Employee emp = new Employee("Patrick", 1001, 50000);
        emp.display();  // Use Employee's method
        
        // Use Calculator's methods
        double bonus = Calculator.calculateBonus(emp.salary);
        double tax = Calculator.calculateTax(emp.salary);
        
        System.out.println("Bonus: $" + bonus);
        System.out.println("Tax: $" + tax);
        System.out.println("Net: $" + (emp.salary - tax + bonus));
    }
}
```

**How to compile and run:**
```powershell
# Compile all files
javac Calculator.java
javac Employee.java
javac PayrollSystem.java

# Run
java PayrollSystem
```

**Output:**
```
Name: Patrick, ID: 1001, Salary: $50000.0
Bonus: $5000.0
Tax: $7500.0
Net: $47500.0
```

---

### 📝 Visibility: public vs private

**public:** Can be used from OTHER files  
**private:** Can ONLY be used inside THIS file

```java
public class BankAccount {
    public double balance;        // Other files can access
    private String pin;           // Only this file can access
    
    public void deposit(double amount) {  // Can be called from other files
        balance += amount;
    }
    
    private void verifyPin(String pin) {  // Only used inside BankAccount
        // Check if PIN is correct
    }
}

// In another file:
public class ATM {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount();
        acc.deposit(1000);              // ✅ Works (public)
        acc.balance;                    // ✅ Can access (public)
        acc.verifyPin("1234");          // ❌ ERROR (private)
        acc.pin;                        // ❌ ERROR (private)
    }
}
```

---

### 📝 Real-World Example: Multi-File System

**File 1: SalaryCalculator.java**
```java
public class SalaryCalculator {
    
    public static double calculateNetSalary(double gross, double taxRate) {
        return gross * (1 - taxRate);
    }
    
    public static double calculateBonus(double salary, double rate) {
        return salary * rate;
    }
}
```

**File 2: Employee.java**
```java
public class Employee {
    private String name;
    private int id;
    private double salary;
    private String department;
    
    public Employee(String name, int id, double salary, String department) {
        this.name = name;
        this.id = id;
        this.salary = salary;
        this.department = department;
    }
    
    public double getNetSalary() {
        return SalaryCalculator.calculateNetSalary(salary, 0.15);  // Use another class!
    }
    
    public double getBonus() {
        return SalaryCalculator.calculateBonus(salary, 0.10);  // Use another class!
    }
    
    public void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("ID: " + id);
        System.out.println("Salary: $" + salary);
        System.out.println("Department: " + department);
        System.out.println("Net Salary: $" + getNetSalary());
        System.out.println("Bonus: $" + getBonus());
    }
}
```

**File 3: Main.java**
```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Employee> employees = new ArrayList<>();
        
        employees.add(new Employee("Patrick", 1001, 50000, "Engineering"));
        employees.add(new Employee("Maria", 1002, 55000, "HR"));
        employees.add(new Employee("Juan", 1003, 48000, "Sales"));
        
        for (Employee emp : employees) {
            emp.displayInfo();
            System.out.println("---");
        }
    }
}
```

**File Structure:**
```
Project/
├── SalaryCalculator.java
├── Employee.java
└── Main.java
```

**Compile & Run:**
```powershell
javac SalaryCalculator.java
javac Employee.java
javac Main.java

java Main
```

---

### 📝 Packages (Organizing Into Folders)

**Real projects use packages** to organize code:

```
Project/
├── util/
│   ├── SalaryCalculator.java
│   └── DateUtils.java
├── models/
│   ├── Employee.java
│   └── Department.java
└── Main.java
```

**File: util/SalaryCalculator.java**
```java
package util;  // Declare package at top

public class SalaryCalculator {
    public static double calculateNetSalary(double gross, double taxRate) {
        return gross * (1 - taxRate);
    }
}
```

**File: models/Employee.java**
```java
package models;  // Different package

import util.SalaryCalculator;  // Import from util package

public class Employee {
    private String name;
    private double salary;
    
    public double getNetSalary() {
        return SalaryCalculator.calculateNetSalary(salary, 0.15);  // Use imported class
    }
}
```

**File: Main.java**
```java
import models.Employee;
import util.SalaryCalculator;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Employee emp = new Employee("Patrick", 50000);
        System.out.println("Net: $" + emp.getNetSalary());
    }
}
```

---

### 🎬 Real-World Example: Multi-File Employee System

**Step 1: Create SalaryCalculator.java**
```java
public class SalaryCalculator {
    
    public static double calculateTax(double salary) {
        return salary * 0.15;  // 15% tax
    }
    
    public static double calculateBonus(double salary, int yearsWorked) {
        if (yearsWorked >= 5) return salary * 0.15;
        if (yearsWorked >= 3) return salary * 0.10;
        return salary * 0.05;
    }
    
    public static boolean isHighEarner(double salary) {
        return salary > 60000;
    }
}
```

**Step 2: Create Employee.java**
```java
public class Employee {
    public String name;
    public int id;
    public double salary;
    public int yearsWorked;
    
    public Employee(String name, int id, double salary, int yearsWorked) {
        this.name = name;
        this.id = id;
        this.salary = salary;
        this.yearsWorked = yearsWorked;
    }
    
    public void showPayroll() {
        double tax = SalaryCalculator.calculateTax(salary);
        double bonus = SalaryCalculator.calculateBonus(salary, yearsWorked);
        boolean isHigh = SalaryCalculator.isHighEarner(salary);
        
        System.out.println("Employee: " + name);
        System.out.println("Gross: $" + salary);
        System.out.println("Tax: $" + tax);
        System.out.println("Bonus: $" + bonus);
        System.out.println("Net: $" + (salary - tax + bonus));
        System.out.println("High Earner: " + isHigh);
    }
}
```

**Step 3: Create PayrollSystem.java**
```java
import java.util.ArrayList;

public class PayrollSystem {
    public static void main(String[] args) {
        ArrayList<Employee> employees = new ArrayList<>();
        
        employees.add(new Employee("Patrick", 1001, 50000, 5));
        employees.add(new Employee("Maria", 1002, 65000, 8));
        employees.add(new Employee("Juan", 1003, 48000, 2));
        
        for (Employee emp : employees) {
            emp.showPayroll();
            System.out.println("---");
        }
    }
}
```

---

---

## 🧠 Key Concepts Summary

| Concept | Purpose | Example |
|---------|---------|---------|
| **Class** | Container for code | `public class Employee { }` |
| **Main method** | Entry point | `public static void main(String[] args)` |
| **Variables** | Store data | `int age = 25;` |
| **Conditionals** | Make decisions | `if (salary > 50000) { }` |
| **Loops** | Repeat actions | `for (int i = 0; i < 5; i++) { }` |
| **Methods** | Reusable code | `public static double calculate(int x)` |
| **Arrays** | Store multiple items | `String[] names = {"Patrick", "Maria"}` |

---

## 💡 Common Mistakes to Avoid

1. **Forgetting Type Declaration**
   - ❌ `name = "Patrick";` (what type?)
   - ✅ `String name = "Patrick";` (clear type)

2. **Using = Instead of ==**
   - ❌ `if (age = 25)` (assignment, not comparison)
   - ✅ `if (age == 25)` (comparison)

3. **Using == for Strings**
   - ❌ `if (name == "Patrick")` (doesn't work for Strings)
   - ✅ `if (name.equals("Patrick"))` (correct)

4. **Forgetting Semicolons**
   - ❌ `int age = 25` (missing semicolon)
   - ✅ `int age = 25;` (complete)

5. **Wrong Array Index**
   - ❌ `employees[5]` on array with 5 items (indices 0-4)
   - ✅ `employees[4]` for the last item

6. **Forgetting Main Method**
   - ❌ Class with methods but no main (won't run)
   - ✅ Always include main method as entry point

---

## 🎯 Next Steps

1. ✅ Complete all 6 activities
2. ✅ Save each as `.java` file
3. ✅ Compile each with `javac FileName.java`
4. ✅ Run each with `java FileName`
5. ✅ Make sure output matches expected

**You've covered the entire exam syllabus!** 🚀
