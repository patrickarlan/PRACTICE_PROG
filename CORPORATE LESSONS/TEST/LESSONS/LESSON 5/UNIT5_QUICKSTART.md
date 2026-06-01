# 🟣 UNIT 5: DEBUGGING & TROUBLESHOOTING - QUICK START GUIDE

## 📚 Files Created

1. **lesson_5_debugging_troubleshooting.md** - Complete lesson with:
   - ✅ Error types (Syntax, Logic, Runtime)
   - ✅ Debugging strategy (5-step method)
   - ✅ Common Java errors & fixes
   - ✅ Real debugging scenarios
   - ✅ 4 hands-on debugging activities with HINTS ONLY (no answers shown)

---

## 🎯 The 4 Activities (Debugging Practice)

| # | Activity | Focus | Difficulty |
|---|----------|-------|-----------|
| 1 | Fix Syntax Errors | Find and fix 3 syntax errors | ⭐ Basic |
| 2 | Find Logic Errors | Identify wrong conditions | ⭐ Basic |
| 3 | Fix Runtime Error | Array index bounds problem | ⭐⭐ Medium |
| 4 | Complete Challenge | Multiple error types | ⭐⭐⭐ Challenge |

---

## 💻 HOW TO CREATE & RUN DEBUGGING ACTIVITIES

### Step 1: Create Activity File

Create a file named `Activity1.java` with the BUGGY code from the lesson

**Example: Activity1.java (Has errors on purpose!)**
```java
public class Activity1 {
    public static void main(String[] args) {
        String name = "Patrick"  // Error 1: Missing semicolon
        int age = 25
        System.out.println("Name: " + name);
        System.out.println(Age: " + age);  // Error 2: Wrong quotes
    }
}
```

### Step 2: Identify the Errors

- Read the code line by line
- Use hints from lesson
- Find all errors (syntax, logic, or runtime)

### Step 3: Fix the Errors

In your activity file, fix each error:

```java
public class Activity1 {
    public static void main(String[] args) {
        String name = "Patrick";  // FIXED: Added semicolon
        int age = 25;  // FIXED: Added semicolon
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);  // FIXED: Corrected quotes
    }
}
```

### Step 4: Compile

```bash
cd C:\Users\HP\Documents\PRACTICE_PROG\JAVA_CODE
javac Activity1.java
```

If errors: Fix and compile again  
If success: Compiled successfully! ✅

### Step 5: Run

```bash
java Activity1
```

If it crashes: Debug using error message  
If output is correct: Activity complete! ✅

### Step 6: Verify Output

Compare your output to expected output from lesson

---

## 📋 For Each Activity

### File Naming Convention
```
Activity 1: Activity1.java
Activity 2: Activity2.java
Activity 3: Activity3.java
Activity 4: Activity4.java
```

### Save Location
```
C:\Users\HP\Documents\PRACTICE_PROG\JAVA_CODE\
```

### Workflow for Each Activity

1. **Read the activity** in lesson (understand what's wrong)
2. **Copy buggy code** into Activity#.java file
3. **Read the hints** (guidance on what to look for)
4. **Identify errors** (find bugs in the code)
5. **Fix the errors** (change code to make it correct)
6. **Save file** with activity name
7. **Compile:** `javac Activity#.java`
8. **Run:** `java Activity#`
9. **Verify output** matches expected from lesson
10. **Move to next activity**

---

## 🔑 Quick Command Reference

| Task | Command |
|------|---------|
| Navigate folder | `cd C:\Users\HP\Documents\PRACTICE_PROG\JAVA_CODE` |
| List files | `dir` |
| Check Java version | `java -version` |
| Compile program | `javac Activity1.java` |
| Run program | `java Activity1` |
| Clear screen | `cls` |

---

## 📝 Common Debugging Commands

### If compilation fails:
```bash
# Read the error message carefully
javac Activity1.java
# Look for: line number and error type
```

### If program crashes:
```bash
# Run it and read the error
java Activity1
# Error message tells you what's wrong
```

### If output is wrong:
```bash
# Program runs but gives wrong result
# Use debug print statements:
System.out.println("DEBUG: variable = " + variable);
```

---

## 🎓 Key Learning Goals

After Unit 5, you should be able to:
- ✅ Identify error types (Syntax, Logic, Runtime)
- ✅ Read and understand error messages
- ✅ Use debugging strategy to find bugs
- ✅ Fix common Java errors
- ✅ Test and verify fixes
- ✅ Prevent bugs with boundary testing

---

## 💡 Debugging Tips for Exam

1. **Read error messages carefully** - They tell you exactly what's wrong
2. **Find the line number** - Error message shows you where the problem is
3. **Test boundary values** - 90, not just 50 (test edges!)
4. **Add debug output** - Print variables to see what's happening
5. **Check arrays carefully** - Remember indices start at 0
6. **Verify conditions** - Use `>=` not just `>` if needed
7. **Test multiple cases** - Don't test just one scenario

---

## 📊 Progress Tracking

### Activity Checklist
- [ ] Read activity in lesson
- [ ] Identify all errors (find at least 1!)
- [ ] Create Activity#.java file
- [ ] Fix all errors in code
- [ ] Compile: javac Activity#.java
- [ ] Run: java Activity#
- [ ] Output correct? ✅
- [ ] Move to next activity

**Repeat for all 4 activities**

---

## 🚀 Success Criteria

**Activity complete when:**
- ✅ Code compiles without errors
- ✅ Program runs without crashing
- ✅ Output matches expected result
- ✅ You understand what was wrong and why

---

## ⚡ Speed Tips

- **Don't guess:** Read error message first
- **Use search:** Ctrl+F to find similar code
- **Test incrementally:** Fix one error, compile, see next error
- **Keep notes:** Write down what each error was

---

## 🎯 You're Now a Debugger!

You've learned:
- ✅ How to recognize error types
- ✅ How to read error messages
- ✅ How to use debugging strategy
- ✅ How to test and verify

**On the exam:** When you see a debugging question, use these skills. You've got this! 💪

---

## 📞 Troubleshooting This Unit

**Q: My file won't compile**
- A: Check for missing `;` `}` `"` and quotes

**Q: Program compiles but crashes**
- A: Read the crash message, add null check or array bounds check

**Q: Program runs but wrong output**
- A: Logic error - verify conditions with boundary testing

**Q: I don't understand the error**
- A: Google the exact error message or re-read the lesson

---

**Good luck debugging! Remember: Every bug you fix is a lesson learned!** 🔍✨
