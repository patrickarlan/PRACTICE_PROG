# 🔴 UNIT 4: JAVA FUNDAMENTALS - QUICK START GUIDE

## 📚 Files Created

1. **lesson_4_java_fundamentals.md** - Complete lesson with:
   - ✅ 6 core Java concepts (Basics, Variables, Conditionals, Loops, Methods, Arrays)
   - ✅ Simple analogies (stricter colleague, blueprints, recipes)
   - ✅ Real-world examples for each concept
   - ✅ 6 practice activities with HINTS ONLY (no answers shown)

---

## 🎯 The 6 Activities (Exam-Ready)

| # | Activity | Focus | Difficulty |
|---|----------|-------|-----------|
| 1 | Variables & Output | Declaration, printing | ⭐ Basic |
| 2 | Conditionals | if/else, comparisons | ⭐ Basic |
| 3 | Loops | for, while, for-each | ⭐ Basic |
| 4 | Methods | Definition, return, call | ⭐⭐ Medium |
| 5 | Arrays | Creation, loops, calculation | ⭐⭐ Medium |
| 6 | Complete Program | All skills combined | ⭐⭐⭐ Challenge |

---

## 💻 JAVA SETUP INSTRUCTIONS

### Step 1: Install Java JDK (Development Kit)

**Windows:**
1. Go to: `oracle.com/java/technologies/downloads/`
2. Download "JDK 21" (or latest)
3. Click the installer
4. Follow the installation wizard (accept defaults)
5. Restart your computer

**Verify Installation:**
```bash
java -version
javac -version
```

If you see version numbers, Java is installed! ✅

### Step 2: Create a Folder for Your Code

Create a folder like: `C:\Users\HP\Documents\PRACTICE_PROG\JAVA_CODE\`

This is where you'll save all your `.java` files.

---

## 🚀 How to Create & Run a Java Program

### Step 1: Write the Code
Create a file named `HelloWorld.java` with this content:

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

**IMPORTANT:** 
- Filename MUST match class name (HelloWorld.java for class HelloWorld)
- Save in your Java folder

### Step 2: Compile the Code
Open Command Prompt and navigate to your Java folder:

```bash
cd C:\Users\HP\Documents\PRACTICE_PROG\JAVA_CODE
javac HelloWorld.java
```

This creates a `HelloWorld.class` file (the compiled version).

### Step 3: Run the Program
```bash
java HelloWorld
```

**Output:**
```
Hello, World!
```

---

## 📋 For Each Activity

### File Naming Convention
```
Activity 1: Activity1.java
Activity 2: Activity2.java
Activity 3: Activity3.java
etc.
```

### Structure Template
Every activity file should follow this structure:

```java
public class ActivityN {
    
    // Helper methods if needed (for Activities 4-6)
    
    public static void main(String[] args) {
        // Your activity code here
    }
}
```

### Compile & Run Each Activity
```bash
javac Activity1.java
java Activity1

javac Activity2.java
java Activity2
```

### Verify Output Matches Expected
- Compare your output to the "Expected Output" in the lesson
- If it matches, activity is CORRECT ✅
- If different, review the hint and try again

---

## 📝 Activity Creation Workflow

**For Each Activity:**

1. **Read the Activity** in lesson (understand what it needs)
2. **Read the Hint** (guidance without answers)
3. **Write Code** in a new `.java` file
4. **Save File** with activity name (Activity1.java, etc.)
5. **Compile** with `javac ActivityN.java`
6. **Run** with `java ActivityN`
7. **Check Output** against expected output
8. **Move to Next Activity**

---

## 🔑 Quick Command Reference

| Task | Command |
|------|---------|
| Check Java version | `java -version` |
| Compile program | `javac FileName.java` |
| Run program | `java FileName` |
| List files | `dir` (Windows) or `ls` (Mac/Linux) |
| Change folder | `cd path\to\folder` |
| Clear screen | `cls` (Windows) or `clear` (Mac/Linux) |

---

## 💡 Java Quick Reference

### Printing Output
```java
System.out.println("Text");     // Print with newline
System.out.print("Text");       // Print without newline
System.out.println("Result: " + variable);  // Concatenate
```

### Variable Declaration
```java
int age = 25;                   // Whole number
double salary = 50000.50;       // Decimal
String name = "Patrick";        // Text
boolean active = true;          // True/False
```

### Conditionals
```java
if (condition) {
    // Code
} else if (condition) {
    // Code
} else {
    // Code
}
```

### Loops
```java
for (int i = 0; i < 5; i++) {   // For loop
    System.out.println(i);
}

while (condition) {              // While loop
    // Code
}

for (String name : array) {      // For-each loop
    System.out.println(name);
}
```

### Methods
```java
public static return_type methodName(parameter) {
    // Code
    return value;
}
```

### Arrays
```java
String[] names = {"Patrick", "Maria"};  // Create array
names[0];                                // Access item
names.length;                            // Get size
```

---

## 🐛 Common Errors & How to Fix

| Error | Cause | Fix |
|-------|-------|-----|
| `class name mismatch` | Filename ≠ class name | Rename file to match class |
| `cannot find symbol` | Variable not declared | Add type: `String name = ...` |
| `operator == cannot be applied to String` | Comparing Strings wrong | Use `.equals()` instead |
| `missing semicolon` | No ; at end of line | Add semicolon |
| `incompatible types` | Wrong data type | Check variable type |

---

## 📊 Progress Tracking

### Activity Checklist
- [ ] Read lesson carefully
- [ ] Understand the hint
- [ ] Write Activity1.java
- [ ] Compile & run
- [ ] Output matches expected ✅
- [ ] Move to Activity2

**Repeat for all 6 activities**

---

## 🎓 Key Learning Goals

After Unit 4, you should be able to:
- ✅ Create and run a basic Java program
- ✅ Declare variables with correct types
- ✅ Use conditionals (if/else)
- ✅ Write loops (for, while, for-each)
- ✅ Create and call methods
- ✅ Work with arrays
- ✅ Combine all skills in one program

---

## ✅ You're Ready for the Exam!

**You've now completed ALL 4 UNITS:**
- ✅ Unit 1: Basic Programming Logic
- ✅ Unit 2: PHP Fundamentals
- ✅ Unit 3: MySQL Fundamentals
- ✅ Unit 4: Java Fundamentals

**Next Step:** Complete all 6 Java activities, then do a final review of all units before Wednesday's exam! 🚀

---

## 💬 Troubleshooting

**Problem: "Command not recognized: javac"**
- Solution: Java not installed or not in PATH. Restart computer after installing Java.

**Problem: "Class name doesn't match filename"**
- Solution: Save file as ExactlyMatchingClassName.java (case-sensitive)

**Problem: "Output doesn't match expected"**
- Solution: Re-read the activity hint, check your logic, ask yourself "what should this do?"

**Problem: "File not found"**
- Solution: Make sure you're in the right folder where you saved the .java file

---

**Good luck with Java! You've got this!** 💪
