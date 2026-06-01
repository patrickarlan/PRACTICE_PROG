# 🟠 Lesson 4.7: Connected Java Files - How to Organize Code

## 📁 File Structure

```
JAVAtest/
├── Calculator.java    → Helper class (calculation methods)
├── Printer.java       → Helper class (printing methods)
├── Main.java          → Main program (calls other classes)
└── README.md          → This file
```

---

## 📚 How It Works

### **File 1: Calculator.java**
- **Purpose:** Helper class with calculation methods
- **Methods:**
  - `calculateBonus(salary)` → Returns 10% bonus
  - `calculateTax(salary)` → Returns 15% tax
  - `calculateNetSalary(salary)` → Returns salary minus tax
- **No main method** - Not a standalone program
- **Can be used by:** Any other file that needs calculations

### **File 2: Printer.java**
- **Purpose:** Helper class with printing methods
- **Methods:**
  - `printEmployeeInfo(name, id, salary)` → Displays employee info
  - `printSalaryBreakdown(...)` → Displays salary details
  - `printHeader(title)` → Prints a title
- **No main method** - Not a standalone program
- **Can be used by:** Any other file that needs printing

### **File 3: Main.java**
- **Purpose:** Main program that uses both Calculator and Printer
- **Has main method** - This is where the program starts
- **Calls methods from:**
  - `Calculator.calculateBonus()`
  - `Calculator.calculateTax()`
  - `Calculator.calculateNetSalary()`
  - `Printer.printHeader()`
  - `Printer.printEmployeeInfo()`
  - `Printer.printSalaryBreakdown()`

---

## 🔄 Flow Diagram

```
Main.java (starts here)
    ↓
Calls Printer.printHeader("PAYROLL SYSTEM")
    ↓
Calls Printer.printEmployeeInfo(...)
    ↓
Calls Calculator.calculateBonus(50000)
    ↓
Calls Calculator.calculateTax(50000)
    ↓
Calls Calculator.calculateNetSalary(50000)
    ↓
Calls Printer.printSalaryBreakdown(...)
    ↓
Program ends ✅
```

---

## 🏃 How to Compile & Run

### **Step 1: Compile All Files**
```powershell
cd "C:\Users\HP\Documents\PRACTICE_PROG\CORPORATE LESSONS\TEST\ACTS\JAVA\JAVAtest"
javac Calculator.java Printer.java Main.java
```

**What happens:**
- Creates `Calculator.class`
- Creates `Printer.class`
- Creates `Main.class`

### **Step 2: Run the Main Program**
```powershell
java Main
```

**Expected Output:**
```
*** PAYROLL SYSTEM - LESSON 4.7 ***

========== EMPLOYEE INFO ==========
Name: Patrick
ID: 1001
Salary: $50000
==================================

========== SALARY BREAKDOWN ==========
Gross Salary: $50000
Bonus (10%): $5000.0
Tax (15%): $7500.0
Net Salary: $42500.0
=====================================

✅ Program completed successfully!
```

---

## 💡 Key Concepts

### **1. Static Methods**
```java
public static double calculateBonus(double salary) {
    return salary * 0.10;
}
```
- `public` = Can be called from other classes
- `static` = Belongs to the class, not an object
- Can call without creating an instance: `Calculator.calculateBonus(50000)`

### **2. Calling Methods from Other Files**
```java
// Inside Main.java
double bonus = Calculator.calculateBonus(50000);  // Calls Calculator's method
Printer.printHeader("Title");  // Calls Printer's method
```

### **3. Organization Benefits**
- ✅ Cleaner code
- ✅ Easy to maintain
- ✅ Reusable classes
- ✅ Better structure for large projects

---

## 🎯 What Each Class Does

| Class | Does What? | Has main()? | Example Usage |
|-------|-----------|-----------|---------------|
| Calculator | Math calculations | ❌ No | `Calculator.calculateBonus(5000)` |
| Printer | Prints output | ❌ No | `Printer.printEmployeeInfo(...)` |
| Main | Orchestrates everything | ✅ Yes | `java Main` |

---

## 📝 Example: How Main.java Uses Other Classes

```java
public class Main {
    public static void main(String[] args) {
        // Step 1: Use Printer to show header
        Printer.printHeader("PAYROLL");
        
        // Step 2: Define data
        double salary = 50000;
        
        // Step 3: Use Calculator for calculations
        double bonus = Calculator.calculateBonus(salary);
        double tax = Calculator.calculateTax(salary);
        
        // Step 4: Use Printer to display results
        Printer.printSalaryBreakdown(salary, bonus, tax, ...);
    }
}
```

**Reading Like English:**
1. "Print a header saying PAYROLL"
2. "Set salary to 50000"
3. "Calculate the bonus using Calculator class"
4. "Calculate the tax using Calculator class"
5. "Print the breakdown using Printer class"

---

## 🚀 Try This

### **Modify Main.java to Add More Employees**

```java
public static void main(String[] args) {
    Printer.printHeader("PAYROLL SYSTEM - MULTIPLE EMPLOYEES");
    
    // Employee 1
    Printer.printEmployeeInfo("Patrick", 1001, 50000);
    printCalculations(50000);
    
    // Employee 2
    Printer.printEmployeeInfo("Maria", 1002, 60000);
    printCalculations(60000);
}

public static void printCalculations(double salary) {
    double bonus = Calculator.calculateBonus(salary);
    double tax = Calculator.calculateTax(salary);
    double net = Calculator.calculateNetSalary(salary);
    Printer.printSalaryBreakdown(salary, bonus, tax, net);
}
```

---

## ✅ Learning Checklist

- [ ] Understand Calculator.java has no main()
- [ ] Understand Printer.java has no main()
- [ ] Understand Main.java has main() (starting point)
- [ ] Compile all 3 files with javac
- [ ] Run with `java Main`
- [ ] See all three working together
- [ ] Modify one class and re-compile/run
- [ ] Try adding more methods to Calculator
- [ ] Try adding more methods to Printer

---

## 🎓 Real-World Example

This structure is used in **real companies**:

```
Project: Employee Management System

├── models/
│   ├── Employee.java
│   ├── Department.java
│   └── Salary.java
│
├── services/
│   ├── PayrollCalculator.java
│   ├── ReportGenerator.java
│   └── DatabaseService.java
│
├── ui/
│   ├── MainWindow.java
│   ├── InputForm.java
│   └── OutputDisplay.java
│
└── Main.java (starts the whole system)
```

**Same concept, just more organized!** 🚀
