# 📝 LESSON 4 CHEAT SHEET: Java Fundamentals
## Quick Reference Guide for Terminal/CMD

---

## 🔌 USING CLASSES FROM OTHER FILES (Imports)

### The Concept
Write code once in one file, use it in many files. Like calling a function from another file.

### Creating a Helper Class (File 1: Calculator.java)
```java
public class Calculator {
    public static double calculateBonus(double salary) {
        return salary * 0.10;  // 10% bonus
    }
    
    public static double calculateTax(double salary) {
        return salary * 0.15;  // 15% tax
    }
}
```

### Using It in Another File (File 2: Main.java)
```java
public class Main {
    public static void main(String[] args) {
        double salary = 50000;
        
        // Use Calculator's methods from other file!
        double bonus = Calculator.calculateBonus(salary);
        double tax = Calculator.calculateTax(salary);
        
        System.out.println("Salary: $" + salary);
        System.out.println("Bonus: $" + bonus);
        System.out.println("Tax: $" + tax);
    }
}
```

### Compile Both Files
```powershell
javac Calculator.java
javac Main.java
java Main
```

### Built-in Imports
```java
import java.util.ArrayList;    // Import specific class
import java.util.HashMap;
import java.util.Stack;
import java.util.*;             // Import ALL from java.util
```

### Public vs Private
```java
public class Account {
    public double balance;      // Other files can access ✅
    private String pin;         // Only this file ❌
    
    public void deposit(double amount) {  // Can be called from other files ✅
        balance += amount;
    }
    
    private void verifyPin(String pin) {  // Only use inside this class ❌
        // Check PIN
    }
}
```

### Real Example: Multi-File System

**File 1: Employee.java**
```java
public class Employee {
    public String name;
    public double salary;
    
    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
}
```

**File 2: Payroll.java**
```java
public class Payroll {
    public static double calculateNet(double salary) {
        return salary * 0.85;  // 15% tax
    }
}
```

**File 3: Main.java**
```java
public class Main {
    public static void main(String[] args) {
        Employee emp = new Employee("Patrick", 50000);
        double net = Payroll.calculateNet(emp.salary);
        
        System.out.println(emp.name + " net: $" + net);
    }
}
```

---

## 1️⃣ SETUP: INSTALLING JAVA JDK

### Check If Java Is Installed
```powershell
java -version
javac -version
```

### If Not Installed
1. Go to: `oracle.com/java/technologies/downloads/`
2. Download "JDK 21" (latest)
3. Run installer, accept defaults
4. Restart your computer
5. Verify with commands above

---

## 2️⃣ FILE STRUCTURE & NAMING

### Creating Your First Java File
```
IMPORTANT: Filename MUST match class name!
```

**Example:**
```
Filename: HelloWorld.java
Class name: public class HelloWorld { }
```

### File Location
```
Create folder: C:\Users\HP\Documents\PRACTICE_PROG\JAVA_CODE\
Save all .java files here
```

---

## 3️⃣ COMPILE & RUN (STEP BY STEP)

### Step 1: Navigate to Folder
```powershell
cd C:\Users\HP\Documents\PRACTICE_PROG\JAVA_CODE
```

### Step 2: Compile Java Code
```powershell
javac HelloWorld.java
```
This creates `HelloWorld.class` file (compiled version)

### Step 3: Run the Program
```powershell
java HelloWorld
```
Note: Type class name, NOT the filename (no .java)

### Quick Workflow Example
```powershell
# 1. Create/edit HelloWorld.java
# 2. Compile
javac HelloWorld.java

# 3. Run
java HelloWorld

# Output appears here:
# Hello, World!
```

---

## 4️⃣ BASIC JAVA PROGRAM STRUCTURE

### Required Template
```java
public class ClassName {
    public static void main(String[] args) {
        // Your code here
    }
}
```

**Reading Line by Line:**
- `public class ClassName` = Create a public class
- `public static void main(String[] args)` = Entry point (where program starts)
- Everything inside `main` runs when you execute the program

### Example: Employee Information
```java
public class Employee {
    public static void main(String[] args) {
        System.out.println("Welcome to Employee System");
        System.out.println("========================");
    }
}
```

**To Run:**
```powershell
javac Employee.java
java Employee
```

---

## 5️⃣ VARIABLES & DATA TYPES

### Basic Data Types

| Type | Use For | Example |
|------|---------|---------|
| `int` | Whole numbers | 25, 1001, 50000 |
| `double` | Decimal numbers | 50000.50, 123.45 |
| `String` | Text/Words | "Patrick", "Engineering" |
| `boolean` | True/False | true, false |
| `char` | Single character | 'A', 'P' |

### Declaring Variables
```java
// Type name = value;
int employeeId = 1001;
String name = "Patrick";
double salary = 50000.50;
boolean isActive = true;
```

### Printing Variables
```java
String name = "Patrick";
int age = 25;
double salary = 50000.50;

System.out.println("Name: " + name);
System.out.println("Age: " + age);
System.out.println("Salary: $" + salary);
```

**Output:**
```
Name: Patrick
Age: 25
Salary: $50000.5
```

### ⚠️ KEY DIFFERENCE FROM PHP
| PHP | Java |
|-----|------|
| `$name = "Patrick";` | `String name = "Patrick";` |
| No type needed | Type REQUIRED |
| `.` to concatenate | `+` to concatenate |
| `echo` to print | `System.out.println()` |

---

## 6️⃣ CONDITIONALS: IF/ELSE

### Basic If/Else
```java
int salary = 50000;

if (salary > 45000) {
    System.out.println("Above average");
} else {
    System.out.println("Below average");
}
```

### Multiple Conditions (else if)
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

### Logical Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `&&` | AND (both true) | `if (age > 18 && salary > 50000)` |
| `||` | OR (either true) | `if (dept == "IT" || dept == "HR")` |
| `!` | NOT (reverse) | `if (!isActive)` |

### String Comparison
```java
String dept = "Engineering";

// ❌ WRONG
if (dept == "Engineering") { }

// ✅ RIGHT - Use .equals()
if (dept.equals("Engineering")) {
    System.out.println("Tech team");
}
```

### Switch Statement
```java
String department = "Engineering";

switch (department) {
    case "Engineering":
        System.out.println("Tech team");
        break;
    case "HR":
        System.out.println("People team");
        break;
    case "Sales":
        System.out.println("Revenue team");
        break;
    default:
        System.out.println("Unknown");
}
```

---

## 7️⃣ LOOPS: FOR, WHILE, FOR-EACH

### For Loop (When You Know How Many Times)
```java
for (int i = 1; i <= 5; i++) {
    System.out.println("Count: " + i);
}
```

**Breakdown:**
```
for (initialize; condition; increment)
     int i = 1  (start at 1)
              i <= 5  (continue while true)
                   i++  (add 1 each time)
```

**Output:**
```
Count: 1
Count: 2
Count: 3
Count: 4
Count: 5
```

### While Loop (When You Don't Know How Many Times)
```java
int count = 0;

while (count < 5) {
    System.out.println("Count: " + count);
    count++;  // Increase by 1
}
```

### For-Each Loop (For Arrays)
```java
String[] employees = {"Patrick", "Maria", "Juan"};

for (String name : employees) {
    System.out.println("Employee: " + name);
}
```

**Output:**
```
Employee: Patrick
Employee: Maria
Employee: Juan
```

---

## 8️⃣ METHODS: REUSABLE CODE

### Basic Method Structure
```java
public static return_type methodName(parameter1, parameter2) {
    // Code here
    return value;
}
```

### Method That Returns a Value
```java
public static double calculateBonus(double salary) {
    double bonus = salary * 0.10;  // 10% bonus
    return bonus;
}

// Call it in main:
public static void main(String[] args) {
    double bonus = calculateBonus(50000);  // Returns 5000
    System.out.println("Bonus: $" + bonus);
}
```

### Method With Multiple Parameters
```java
public static double calculateNetSalary(double salary, double taxRate) {
    double tax = salary * taxRate;
    double net = salary - tax;
    return net;
}

// Call it:
double net = calculateNetSalary(50000, 0.15);  // Returns 42500
System.out.println("Net: $" + net);
```

### Method That Doesn't Return (void)
```java
public static void printInfo(String name, String dept) {
    System.out.println("Name: " + name);
    System.out.println("Department: " + dept);
}

// Call it:
printInfo("Patrick", "Engineering");
```

### Method Syntax Reference

| Part | Meaning | Example |
|------|---------|---------|
| `public` | Anyone can call | Always use for now |
| `static` | Belongs to class | Always use in main |
| `return_type` | What it sends back | int, double, String, void |
| `methodName` | Name of method | calculateBonus |
| `(parameters)` | Input data | (double salary, int years) |
| `return` | Send back value | return bonus; |

---

## 9️⃣ ARRAYS: STORING MULTIPLE ITEMS

### Creating Arrays

**Array of Strings:**
```java
String[] employees = {"Patrick", "Maria", "Juan", "Rosa"};
```

**Array of Numbers:**
```java
int[] salaries = {50000, 55000, 48000, 52000};
double[] bonuses = {5000.50, 5500.75, 4800.25, 5200.00};
```

### Accessing Array Items
```java
String[] employees = {"Patrick", "Maria", "Juan"};

System.out.println(employees[0]);  // Patrick
System.out.println(employees[1]);  // Maria
System.out.println(employees[2]);  // Juan
```

**Remember: Index starts at 0!**

### Array Length
```java
String[] employees = {"Patrick", "Maria", "Juan"};
int count = employees.length;  // 3
System.out.println("Total: " + count);
```

### Looping Through Arrays

**Option 1: For Loop**
```java
int[] salaries = {50000, 55000, 48000};

for (int i = 0; i < salaries.length; i++) {
    System.out.println("Salary: $" + salaries[i]);
}
```

**Option 2: For-Each Loop (Easier)**
```java
int[] salaries = {50000, 55000, 48000};

for (int salary : salaries) {
    System.out.println("Salary: $" + salary);
}
```

### Example: Employee Report
```java
public class EmployeeReport {
    public static void main(String[] args) {
        String[] names = {"Patrick", "Maria", "Juan"};
        double[] salaries = {50000, 55000, 48000};
        
        double total = 0;
        
        for (int i = 0; i < names.length; i++) {
            System.out.println(names[i] + ": $" + salaries[i]);
            total += salaries[i];
        }
        
        System.out.println("Total: $" + total);
    }
}
```

**Output:**
```
Patrick: $50000.0
Maria: $55000.0
Juan: $48000.0
Total: $153000.0
```

---

## 🔟 COMPARISON OPERATORS

| Operator | Meaning | Example |
|----------|---------|---------|
| `==` | Equals | `if (age == 25)` |
| `!=` | Not equals | `if (name != "Patrick")` |
| `>` | Greater than | `if (salary > 50000)` |
| `<` | Less than | `if (salary < 45000)` |
| `>=` | Greater or equal | `if (salary >= 50000)` |
| `<=` | Less or equal | `if (salary <= 50000)` |

---

## 1️⃣1️⃣ COMMON MISTAKES

### ❌ Mistake 1: Filename Doesn't Match Class Name
```java
// File: Employee.java
public class EmployeeData {  // WRONG - name mismatch
    public static void main(String[] args) { }
}

// ✅ RIGHT
public class Employee {  // Matches filename
    public static void main(String[] args) { }
}
```

### ❌ Mistake 2: Forgetting Type Declaration
```java
// WRONG
name = "Patrick";  // What type is name?

// ✅ RIGHT
String name = "Patrick";  // Clear type
```

### ❌ Mistake 3: Using == for Strings
```java
String dept = "Engineering";

// ❌ WRONG
if (dept == "Engineering") { }

// ✅ RIGHT
if (dept.equals("Engineering")) { }
```

### ❌ Mistake 4: Forgetting Semicolons
```java
// WRONG
int age = 25

// ✅ RIGHT
int age = 25;
```

### ❌ Mistake 5: Wrong Array Index
```java
String[] employees = {"Patrick", "Maria", "Juan"};  // 3 items (indices 0, 1, 2)

System.out.println(employees[3]);  // ERROR - index out of bounds

System.out.println(employees[2]);  // ✅ Correct (Juan)
```

### ❌ Mistake 6: Using = Instead of ==
```java
// WRONG (assignment, not comparison)
if (age = 25) { }

// ✅ RIGHT (comparison)
if (age == 25) { }
```

### ❌ Mistake 7: Forgetting Braces
```java
// WRONG
if (salary > 50000)
    System.out.println("High earner");
    System.out.println("Count this too?");  // Confusion!

// ✅ RIGHT
if (salary > 50000) {
    System.out.println("High earner");
    System.out.println("Count this too?");
}
```

---

## 1️⃣2️⃣ TERMINAL COMMANDS

### Navigation
| Command | Purpose |
|---------|---------|
| `cd path` | Change directory |
| `cd ..` | Go up one folder |
| `dir` | List files (Windows) |
| `ls` | List files (Mac/Linux) |
| `pwd` | Show current path |
| `cls` | Clear screen (Windows) |
| `clear` | Clear screen (Mac/Linux) |

### Java Commands
| Command | Purpose |
|---------|---------|
| `java -version` | Check Java version |
| `javac --version` | Check compiler version |
| `javac FileName.java` | Compile Java file |
| `java ClassName` | Run Java program |

---

## 1️⃣3️⃣ STEP-BY-STEP ACTIVITY WORKFLOW

### For Each Activity:

**1. Create the File**
```powershell
# Use text editor or IDE to create Activity1.java
# Save in your Java folder
```

**2. Write the Code**
```java
public class Activity1 {
    public static void main(String[] args) {
        // Write your code here based on activity description
    }
}
```

**3. Save the File**
- Name: `Activity1.java` (matches class name)
- Location: Your Java code folder

**4. Open Terminal**
```powershell
cd C:\Users\HP\Documents\PRACTICE_PROG\JAVA_CODE
```

**5. Compile**
```powershell
javac Activity1.java
```

**6. Run**
```powershell
java Activity1
```

**7. Check Output**
- Compare your output to the expected output in lesson
- If matches → Activity complete! ✅
- If different → Re-read hint, review code, try again

**8. Move to Next Activity**
- Repeat steps for Activity2, Activity3, etc.

---

## 1️⃣4️⃣ QUICK SYNTAX REFERENCE

### Print to Console
```java
System.out.println("Text");           // With newline
System.out.print("Text");             // Without newline
System.out.println("Result: " + var); // Concatenate
```

### Variable Declaration
```java
int age = 25;
double salary = 50000.50;
String name = "Patrick";
boolean isActive = true;
char grade = 'A';
```

### If/Else
```java
if (condition) {
    // Code if true
} else if (condition2) {
    // Code if condition2 true
} else {
    // Code if both false
}
```

### For Loop
```java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
```

### While Loop
```java
while (condition) {
    // Code repeats
}
```

### For-Each Loop
```java
for (String name : employees) {
    System.out.println(name);
}
```

### Method Definition
```java
public static double calculate(double x) {
    return x * 2;
}
```

### Array
```java
String[] names = {"Patrick", "Maria"};
System.out.println(names[0]);  // Patrick
System.out.println(names.length);  // 2
```

---

## 🎯 EXAM QUICK TIPS

**Q: What's the basic structure?**
```java
public class ClassName {
    public static void main(String[] args) {
        // Code here
    }
}
```

**Q: How do I declare a variable?**
```java
String name = "Patrick";
int age = 25;
double salary = 50000.50;
```

**Q: How do I print something?**
```java
System.out.println("Text here");
System.out.println("Value: " + variable);
```

**Q: How do I use if/else?**
```java
if (condition) {
    // Code
} else {
    // Other code
}
```

**Q: How do I create a loop?**
```java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
```

**Q: How do I create an array?**
```java
String[] names = {"Patrick", "Maria", "Juan"};
System.out.println(names[0]);  // Patrick
```

**Q: How do I create a method?**
```java
public static double bonus(double salary) {
    return salary * 0.10;
}
```

**Q: How do I compare strings?**
```java
// ✅ RIGHT
if (name.equals("Patrick")) { }

// ❌ WRONG
if (name == "Patrick") { }
```

**Q: How do I compile and run?**
```powershell
javac FileName.java   # Compile
java FileName         # Run (no .java)
```

---

## ✅ ACTIVITY CHECKLIST

For each activity:
- [ ] Read activity description
- [ ] Read the hint
- [ ] Create ClassName.java file
- [ ] Write code based on hint
- [ ] Save file
- [ ] Compile: `javac ClassName.java`
- [ ] Run: `java ClassName`
- [ ] Compare output to expected
- [ ] Output matches? ✅ Move to next
- [ ] Output different? Re-read hint and try again

---

## 🚀 YOU'RE READY FOR THE EXAM!

**You've covered all 4 units:**
- ✅ Unit 1: Basic Programming Logic
- ✅ Unit 2: PHP Fundamentals
- ✅ Unit 3: MySQL Fundamentals
- ✅ Unit 4: Java Fundamentals

**Final Steps:**
1. Complete all 6 Java activities
2. Make sure each compiles and runs correctly
3. Do a quick review of all units
4. Go to the exam confident! 💪

---

**Good luck! You've got this!** 🚀
