# 🚀 DSA FOUNDATIONS FOR JUNIOR DEVELOPERS
## Quick Structural Thinking Guide (1-2 Hours)

**Goal:** Learn to think like a developer about data and algorithms  
**Not:** Heavy theory or complex algorithms  
**Focus:** Problem-solving mindset and code organization

---

## 📌 WHY DSA MATTERS FOR JUNIOR DEVS

**Scenario 1: You're given a task**
```
"Find all duplicate emails in a list of 100,000 users"
```
- Bad thinking: Loop through list multiple times ❌ SLOW
- DSA thinking: Use a Map to track seen emails ✅ FAST

**Scenario 2: You're debugging**
```
"Why is this search feature so slow?"
```
- Bad thinking: "I dunno, loops are fast"
- DSA thinking: "Oh, we're searching linearly through sorted data. Should use binary search instead"

**Scenario 3: You're designing a feature**
```
"We need a system to undo/redo changes"
```
- Bad thinking: "Just store everything in an array?"
- DSA thinking: "We need a Stack - LIFO (Last In First Out)"

---

## 🏗️ PART 1: CORE DATA STRUCTURES

### 1. Arrays (You Know This!)
```java
int[] numbers = {1, 2, 3, 4, 5};
```
**When to use:** Storing ordered data, iterating through items  
**Speed:** Fast access by position, slow insertion/deletion  

---

### 2. Maps/Hash Maps (Key-Value Pairs)

**The Concept:** Like a dictionary where you look up a key to get a value

```java
// Example 1: Count occurrences
Map<String, Integer> emailCount = new HashMap<>();
emailCount.put("patrick@email.com", 1);
emailCount.put("maria@email.com", 1);

if (emailCount.containsKey("patrick@email.com")) {
    int count = emailCount.get("patrick@email.com");
    emailCount.put("patrick@email.com", count + 1);
}

// Example 2: Fast lookup
Map<Integer, String> employees = new HashMap<>();
employees.put(1001, "Patrick");
employees.put(1002, "Maria");

String name = employees.get(1001);  // Instant! No searching needed
```

**When to use:** Fast lookups, counting, caching  
**Speed:** Super fast (O(1) - instant lookup)  
**Real-world:** User database (ID → User info), cache systems

---

### 3. Lists (Dynamic Arrays)

```java
List<String> employees = new ArrayList<>();
employees.add("Patrick");
employees.add("Maria");
employees.add("Juan");

// Grows automatically - no size limit!
```

**When to use:** Don't know size ahead of time  
**Speed:** Similar to arrays, more flexible  

---

### 4. Stacks (Last In, First Out)

**Real-world analogy:** Stack of plates - take from top, put on top

```java
Stack<String> actions = new Stack<>();
actions.push("typed text");      // Add to top
actions.push("pressed enter");   // Add to top
actions.push("deleted word");    // Add to top

String lastAction = actions.pop();  // Remove from top: "deleted word"
String nextAction = actions.pop();  // Remove from top: "pressed enter"
```

**When to use:** Undo/Redo, browser back button, function calls  
**Operations:** push (add), pop (remove from top), peek (look at top)

---

### 5. Queues (First In, First Out)

**Real-world analogy:** Queue at store - first person in, first person out

```java
Queue<String> tasks = new LinkedList<>();
tasks.add("Process order");      // Add to back
tasks.add("Send email");         // Add to back
tasks.add("Update inventory");   // Add to back

String firstTask = tasks.remove();  // Remove from front: "Process order"
String nextTask = tasks.remove();   // Remove from front: "Send email"
```

**When to use:** Task scheduling, message processing, printing queue  
**Operations:** add (to back), remove (from front), peek (look at front)

---

### 6. Sets (Unique Items Only)

```java
Set<String> uniqueEmails = new HashSet<>();
uniqueEmails.add("patrick@email.com");
uniqueEmails.add("patrick@email.com");  // Duplicate! Ignored
uniqueEmails.add("maria@email.com");

System.out.println(uniqueEmails.size());  // 2, not 3!
```

**When to use:** Removing duplicates, membership testing ("is this in the set?")  
**Speed:** Fast lookups

---

## 🧠 PART 2: ALGORITHM THINKING FRAMEWORK

### The Problem-Solving Process

**Step 1: Understand the Problem**
```
"Count duplicate emails in a list of users"
Input: List of 100,000 emails
Output: Emails that appear more than once
Constraint: Should be fast
```

**Step 2: Think About Data Structure**
```
What do I need to STORE?
→ Each email and HOW MANY TIMES it appeared
→ Map<String, Integer> is perfect!

Why not array?
→ Array would need searching through all emails repeatedly
→ Map gives instant lookup
```

**Step 3: Write Pseudo-Code (English, not Java)**
```
1. Create a map to count emails
2. Loop through all emails:
   - If email already in map: increase count
   - If email NOT in map: add it with count 1
3. Loop through map:
   - If count > 1: this email is duplicate
   - Print it
```

**Step 4: Write Real Code**
```java
Map<String, Integer> emailCount = new HashMap<>();

// Step 1: Count
for (String email : emails) {
    if (emailCount.containsKey(email)) {
        emailCount.put(email, emailCount.get(email) + 1);
    } else {
        emailCount.put(email, 1);
    }
}

// Step 2: Find duplicates
for (String email : emailCount.keySet()) {
    if (emailCount.get(email) > 1) {
        System.out.println("Duplicate: " + email);
    }
}
```

---

## 🎯 PART 3: COMMON PATTERNS (Recognize These!)

### Pattern 1: COUNTING
```
"How many times does each name appear?"
→ Use Map<String, Integer>

Map<String, Integer> nameCount = new HashMap<>();
for (String name : names) {
    nameCount.put(name, nameCount.getOrDefault(name, 0) + 1);
}
```

### Pattern 2: LOOKING UP (Is This In The List?)
```
"Is this email already registered?"
→ Use Set or Map (instant answer)

Set<String> registeredEmails = new HashSet<>(Arrays.asList(emails));
if (registeredEmails.contains(userEmail)) {
    System.out.println("Already registered!");
}
```

### Pattern 3: LAST-IN-FIRST-OUT (Undo)
```
"Implement undo functionality"
→ Use Stack

Stack<String> history = new Stack<>();
history.push("typed: hello");
history.push("typed: world");
// Undo
String lastAction = history.pop();  // "typed: world"
```

### Pattern 4: FIRST-IN-FIRST-OUT (Queue)
```
"Process tasks in order received"
→ Use Queue

Queue<Task> tasks = new LinkedList<>();
tasks.add(task1);
tasks.add(task2);
Task current = tasks.remove();  // Gets task1 first
```

### Pattern 5: FINDING UNIQUE (Remove Duplicates)
```
"Get unique values from list"
→ Use Set

Set<String> uniqueValues = new HashSet<>(Arrays.asList(values));
```

---

## 🔍 PART 4: SEARCHING & FILTERING (Algorithm Thinking)

### Linear Search (Check Each Item)
```java
// Find Patrick in a list
for (String name : employees) {
    if (name.equals("Patrick")) {
        System.out.println("Found!");
        return true;
    }
}
```
**Speed:** Slow (checks each item)  
**Use when:** List is small or unsorted  

---

### Binary Search (Half the List Each Time)
```java
// ONLY works on SORTED list
// Like finding a page in a dictionary

int[] salaries = {30000, 40000, 50000, 60000, 70000};  // SORTED!

int target = 50000;
int left = 0;
int right = salaries.length - 1;

while (left <= right) {
    int mid = (left + right) / 2;
    
    if (salaries[mid] == target) {
        System.out.println("Found at index " + mid);
        return true;
    } else if (salaries[mid] < target) {
        left = mid + 1;  // Search right half
    } else {
        right = mid - 1;  // Search left half
    }
}
```
**Speed:** MUCH faster (halves search space each time)  
**Use when:** List is sorted  

---

## 💡 PART 5: REAL LOGICAL PROBLEMS (Exam-Style)

### Problem 1: Find Duplicates
```
Given: ["patrick@email.com", "maria@email.com", "patrick@email.com"]
Find: All duplicate emails
```

**Solution Thinking:**
1. Use a Map to count occurrences
2. Return emails with count > 1

```java
Map<String, Integer> emailCount = new HashMap<>();
for (String email : emails) {
    emailCount.put(email, emailCount.getOrDefault(email, 0) + 1);
}

List<String> duplicates = new ArrayList<>();
for (String email : emailCount.keySet()) {
    if (emailCount.get(email) > 1) {
        duplicates.add(email);
    }
}
```

---

### Problem 2: Two Sum
```
Given: [2, 7, 11, 15], target = 9
Find: Two numbers that add up to 9
Output: [0, 1] (indices of 2 and 7)
```

**Bad Approach:**
```java
// Check every pair - SLOW
for (int i = 0; i < nums.length; i++) {
    for (int j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] == target) {
            return new int[]{i, j};
        }
    }
}
```

**Smart Approach (Using Map):**
```java
Map<Integer, Integer> seen = new HashMap<>();

for (int i = 0; i < nums.length; i++) {
    int complement = target - nums[i];
    
    if (seen.containsKey(complement)) {
        return new int[]{seen.get(complement), i};
    }
    
    seen.put(nums[i], i);
}
```

**Why Better?** Loop once instead of twice. Map lookups are instant.

---

### Problem 3: First Unique Character
```
Given: "aabbcc"
Find: First character that appears only once
Output: -1 (no unique characters)

Given: "abac"
Find: First character that appears only once
Output: 0 ('a' appears twice, 'b' appears once, so 'b' is at index 1... wait no)
Actually: 'b' is first unique at index 1
```

**Solution:**
```java
Map<Character, Integer> charCount = new HashMap<>();

// Count all characters
for (char c : s.toCharArray()) {
    charCount.put(c, charCount.getOrDefault(c, 0) + 1);
}

// Find first with count = 1
for (int i = 0; i < s.length(); i++) {
    if (charCount.get(s.charAt(i)) == 1) {
        return i;
    }
}

return -1;  // No unique character found
```

---

### Problem 4: Valid Parentheses
```
Given: "()" , "()[]{}" , "([)]"
Check: Are parentheses properly matched?

"()" → true (open, close)
"([)]" → false (open (, open [, close ), close ] - WRONG ORDER!)
```

**Solution Using Stack:**
```java
Stack<Character> stack = new Stack<>();

for (char c : s.toCharArray()) {
    if (c == '(' || c == '[' || c == '{') {
        stack.push(c);  // Opening bracket: add to stack
    } else {
        if (stack.isEmpty()) return false;  // Extra closing bracket
        
        char open = stack.pop();
        if (!isMatching(open, c)) return false;  // Wrong pair
    }
}

return stack.isEmpty();  // All should be matched
```

**Why Stack?** Last opening bracket should match first closing bracket (LIFO!)

---

## 📊 PART 6: COMPLEXITY BASICS (Just Know This)

### Big O Notation (Simplified)

| Notation | Example | Speed | Use Case |
|----------|---------|-------|----------|
| O(1) | Map lookup | ⚡ Instant | Hash maps, direct access |
| O(n) | Loop through array | 🔵 Normal | Simple iteration |
| O(n²) | Nested loops | 🔴 Slow | Bubble sort, brute force |
| O(log n) | Binary search | ⚡ Very fast | Searching sorted data |

**In Real Terms:**
```
Searching 1,000,000 items:
- O(1): Instant ⚡
- O(n): 1 million operations
- O(log n): ~20 operations
- O(n²): 1 trillion operations 🔴
```

**Your Takeaway:** Use Maps/Sets for O(1), avoid nested loops for large data.

---

## 🎬 PART 7: REAL EXAM-STYLE LOGICAL QUESTIONS

### Question 1: Employee Salary Bonus
```
Given: 
- List of employees with salaries
- Need to find highest earner in Engineering dept
- Calculate bonus (10% if salary > 50000, else 5%)

Approach:
1. Filter employees by department (use Map? No - just loop)
2. Find max salary
3. Calculate bonus
```

```java
List<Employee> engineers = new ArrayList<>();
double maxSalary = 0;

for (Employee emp : employees) {
    if (emp.department.equals("Engineering")) {
        engineers.add(emp);
        maxSalary = Math.max(maxSalary, emp.salary);
    }
}

// Find employee with max salary
for (Employee emp : engineers) {
    if (emp.salary == maxSalary) {
        double bonus = emp.salary > 50000 ? emp.salary * 0.10 : emp.salary * 0.05;
        System.out.println(emp.name + " bonus: $" + bonus);
    }
}
```

---

### Question 2: Grade Distribution
```
Given: List of student grades
Find: How many A's, B's, C's, D's, F's

Map is PERFECT for this!
```

```java
Map<String, Integer> gradeCounts = new HashMap<>();

for (int grade : grades) {
    String letterGrade;
    if (grade >= 90) letterGrade = "A";
    else if (grade >= 80) letterGrade = "B";
    else if (grade >= 70) letterGrade = "C";
    else if (grade >= 60) letterGrade = "D";
    else letterGrade = "F";
    
    gradeCounts.put(letterGrade, gradeCounts.getOrDefault(letterGrade, 0) + 1);
}

// Print results
for (String grade : gradeCounts.keySet()) {
    System.out.println(grade + ": " + gradeCounts.get(grade));
}
```

---

### Question 3: Most Frequent Word
```
Given: "the quick brown fox jumps over the lazy dog the"
Find: Most frequently occurring word
```

```java
Map<String, Integer> wordCount = new HashMap<>();
String[] words = sentence.split(" ");

for (String word : words) {
    wordCount.put(word, wordCount.getOrDefault(word, 0) + 1);
}

// Find word with max count
String mostFrequent = "";
int maxCount = 0;

for (String word : wordCount.keySet()) {
    if (wordCount.get(word) > maxCount) {
        maxCount = wordCount.get(word);
        mostFrequent = word;
    }
}

System.out.println(mostFrequent + " appears " + maxCount + " times");
```

---

## 🔑 QUICK REFERENCE: WHEN TO USE WHAT

| Problem | Data Structure | Why |
|---------|---|---|
| "Find duplicates" | Map | Count occurrences |
| "Is this already used?" | Set | Fast membership check |
| "Undo/Redo" | Stack | LIFO (last in first out) |
| "Process in order" | Queue | FIFO (first in first out) |
| "Count occurrences" | Map | Count frequency |
| "Unique values only" | Set | Automatic deduplication |
| "Store and access by ID" | Map | Key-value instant lookup |
| "Sorted data lookup" | Array + Binary Search | Very fast search |

---

## 💻 QUICK CODING PATTERNS

### Pattern: Count Everything
```java
Map<T, Integer> count = new HashMap<>();
for (T item : items) {
    count.put(item, count.getOrDefault(item, 0) + 1);
}
```

### Pattern: Check If Exists (Deduplication)
```java
Set<T> seen = new HashSet<>();
for (T item : items) {
    if (seen.contains(item)) {
        // Duplicate found!
    }
    seen.add(item);
}
```

### Pattern: Track Last N Items (Undo)
```java
Stack<T> history = new Stack<>();
history.push(item);  // Add
history.pop();       // Undo
```

### Pattern: Process in Order (Queue)
```java
Queue<T> tasks = new LinkedList<>();
tasks.add(task);      // Add to back
tasks.remove();       // Take from front
```

---

## 🎯 KEY TAKEAWAYS FOR THE EXAM

1. **Understand the problem first** - What are you storing? What do you need to find?

2. **Choose the right structure:**
   - Need fast lookup? → **Map or Set**
   - Need to count? → **Map**
   - Need undo? → **Stack**
   - Need ordered processing? → **Queue**

3. **Think in pseudo-code before Java** - Plan in English first

4. **Recognize patterns** - Duplicate finding, searching, counting all use similar approaches

5. **Loop efficiently** - One loop > nested loops when possible

6. **Use built-in methods** - `getOrDefault()`, `contains()`, etc.

---

## 🎓 STUDY PLAN FOR TOMORROW

**1-Hour Study Session:**

| Time | Task |
|------|------|
| 0-15 min | Read Part 1 (Data Structures) - understand each one |
| 15-30 min | Read Part 2 (Algorithm Thinking) + Part 3 (Patterns) |
| 30-45 min | Work through Part 5 (Real Problems) - write code |
| 45-60 min | Review Part 7 (Exam Questions) + Quick Reference |

**During the Exam:**
- When you see "logical problem": Think about what structure to use
- Choose Map/Set for fast lookups
- Use the pseudo-code approach: English first, then code

---

**You've got this! DSA is just thinking smartly about data.** 🚀

---

## 📚 PART 8: DSA + SYLLABUS CONNECTION (How It All Fits Together)

### 🔗 DSA + UNIT 1: Basic Programming Logic

**What you learned:**
- Variables, conditionals, loops, arrays, functions

**How DSA enhances it:**
- **Loops:** Now you understand WHEN to use nested loops (O(n²)) vs single loops (O(n))
- **Arrays:** Know when to use Array vs other structures
- **Functions:** Design functions to solve specific DSA patterns
- **Conditionals:** Use if/else to implement search algorithms

**Example from Unit 1 → DSA:**
```java
// Unit 1 (basic loop)
for (int i = 0; i < employees.length; i++) {
    if (employees[i].equals("Patrick")) {
        System.out.println("Found!");
    }
}

// DSA thinking (same code, but now you know it's O(n) linear search)
// If list was sorted, could use binary search → O(log n) instead!
```

---

### 🔗 DSA + UNIT 2: PHP Fundamentals

**What you learned:**
- Variables, functions, arrays, associative arrays, loops

**How DSA enhances it:**
- **Associative Arrays:** These ARE Hash Maps! You already know DSA here!
- **Functions:** Build reusable DSA algorithms (counting, searching, filtering)
- **Loops:** Optimize loops for performance

**PHP Example (You Already Did This in Unit 2!):**
```php
<?php
// Unit 2 Activity 5: Array of Employees
$employees = array("Patrick", "Maria", "Juan", "Rosa");
$salaries = array(50000, 55000, 48000, 52000);

// This is Array + Loop = DSA pattern!
$total = 0;
for ($i = 0; $i < count($employees); $i++) {
    $total += $salaries[$i];
}

// NOW with DSA thinking:
// This is O(n) - one loop through all items
// If we had millions, this pattern matters!

// Better approach: Associative array
$employeeSalaries = array(
    "Patrick" => 50000,      // Map<String, Integer>!
    "Maria" => 55000,
    "Juan" => 48000
);

// Instant lookup: O(1)
echo $employeeSalaries["Patrick"];  // 50000 instantly!
?>
```

**Unit 2 Connection:** Your form processing activity was really data structure manipulation!

---

### 🔗 DSA + UNIT 3: MySQL Fundamentals

**What you learned:**
- CREATE TABLE, INSERT, SELECT, WHERE, ORDER BY

**How DSA enhances it:**
- **Tables:** Collections of data (like Arrays)
- **WHERE clause:** Filtering (like loops with conditionals)
- **Primary Key:** Index structure (Database uses trees internally!)
- **ORDER BY:** Sorting

**SQL Example with DSA Thinking:**
```sql
-- Unit 3: Basic SELECT
SELECT * FROM employees WHERE salary > 50000;

-- DSA thinking:
-- Without index: O(n) - scans all rows
-- With index on salary: O(log n) - uses tree structure!

-- Practical: This is why databases create indexes
-- Indexes are DSA structures (usually B-Trees) that speed up searching
```

**Real Performance Impact:**
```
Searching 1,000,000 employees:
- Without index: 1,000,000 operations
- With index on salary: ~20 operations
That's 50,000x faster!
```

**Database Indexes Use Tree Structures (Advanced DSA):**
```
Database engineers use B-Trees internally to organize data
You don't write this, but knowing it helps you understand:
- Why CREATE INDEX is important
- Why certain queries are slow
- How databases organize data
```

---

### 🔗 DSA + UNIT 4: Java Fundamentals

**What you learned:**
- Classes, methods, conditionals, loops, arrays, ArrayList

**How DSA enhances it:**
- **ArrayList:** Dynamic arrays! Perfect for DSA patterns
- **Methods:** Build DSA algorithms (search, count, sort)
- **Collections:** ArrayList, HashMap are DSA structures built-in

**Java Example (Real DSA Code):**
```java
import java.util.*;

public class DSAPatterns {
    
    // Pattern 1: Counting (Map)
    public static Map<String, Integer> countFrequency(String[] items) {
        Map<String, Integer> count = new HashMap<>();
        for (String item : items) {
            count.put(item, count.getOrDefault(item, 0) + 1);
        }
        return count;
    }
    
    // Pattern 2: Finding duplicates (Set)
    public static List<String> findDuplicates(String[] items) {
        Set<String> seen = new HashSet<>();
        List<String> duplicates = new ArrayList<>();
        
        for (String item : items) {
            if (seen.contains(item)) {
                duplicates.add(item);
            }
            seen.add(item);
        }
        return duplicates;
    }
    
    // Pattern 3: Undo/Redo (Stack)
    public static class EditorWithUndo {
        private Stack<String> history = new Stack<>();
        
        public void type(String text) {
            history.push(text);
        }
        
        public String undo() {
            if (!history.isEmpty()) {
                return history.pop();
            }
            return "Nothing to undo";
        }
    }
    
    public static void main(String[] args) {
        String[] emails = {"a@b.com", "c@d.com", "a@b.com", "e@f.com", "c@d.com"};
        
        Map<String, Integer> freq = countFrequency(emails);
        System.out.println("Frequency: " + freq);
        
        List<String> dups = findDuplicates(emails);
        System.out.println("Duplicates: " + dups);
        
        EditorWithUndo editor = new EditorWithUndo();
        editor.type("Hello");
        editor.type(" World");
        System.out.println("Undo: " + editor.undo());
    }
}
```

---

## 🎯 PART 9: CONNECTING ALL 4 UNITS + DSA

### The Big Picture

```
UNIT 1: Basic Logic
├─ Variables, loops, conditionals
└─ Foundation: All DSA uses these!

UNIT 2: PHP
├─ Associative arrays = Hash Maps
├─ Loops over arrays = Iteration
└─ DSA in Action: You used Maps without realizing it!

UNIT 3: MySQL
├─ Tables = Collections of data
├─ WHERE = Filtering algorithm
├─ Indexes = Tree structures (DSA!)
└─ DSA in Databases: Performance depends on structures

UNIT 4: Java
├─ ArrayList = Dynamic arrays
├─ HashMap = Hash maps
├─ Stack, Queue = Collections
└─ DSA Native: Java has DSA structures built-in

DSA FOUNDATIONS
└─ Understanding WHEN and WHY to use each structure
```

### Real-World Scenario: Building a User Management System

**Requirements:**
1. Store user data (id, name, email, salary)
2. Find user by email instantly
3. Find all duplicates
4. Display in salary order

**Old Way (No DSA Thinking):**
```java
// Just loop through array repeatedly - SLOW!
User[] users = new User[100000];

for (User u : users) {
    if (u.email.equals("patrick@email.com")) {
        // Found!
    }
}
// Does this 100 times = 10 million operations 🔴
```

**DSA Way:**
```java
// Use appropriate structures
Map<String, User> userByEmail = new HashMap<>();  // Instant lookup
List<User> allUsers = new ArrayList<>();           // All data

// Add users
for (User u : users) {
    userByEmail.put(u.email, u);
    allUsers.add(u);
}

// Find by email: Instant! O(1)
User patrick = userByEmail.get("patrick@email.com");

// Display sorted: Already in list, just sort
Collections.sort(allUsers, (a, b) -> Double.compare(a.salary, b.salary));

// Find duplicates: Count emails
Map<String, Integer> emailCount = new HashMap<>();
for (User u : allUsers) {
    emailCount.put(u.email, emailCount.getOrDefault(u.email, 0) + 1);
}
```

**Performance Impact:**
```
Old way: 10 million + operations
DSA way: ~100,000 operations
That's 100x faster! And you're a junior dev with a superpower.
```

---

## 📝 PART 10: HANDS-ON ACTIVITIES

### Activity 1: Counting Problem (Map)

**Task:** You have a list of departments. Count how many employees in each.

**Data:**
```
["Engineering", "HR", "Engineering", "Sales", "HR", "Engineering"]
```

**Expected Output:**
```
Engineering: 3
HR: 2
Sales: 1
```

**Starter Code:**
```java
public class CountDepartments {
    public static void main(String[] args) {
        String[] departments = {"Engineering", "HR", "Engineering", 
                               "Sales", "HR", "Engineering"};
        
        Map<String, Integer> count = new HashMap<>();
        
        // TODO: Loop through departments and count
        // Use getOrDefault() method
        
        // TODO: Print results
    }
}
```

**Solution:**
```java
for (String dept : departments) {
    count.put(dept, count.getOrDefault(dept, 0) + 1);
}

for (String dept : count.keySet()) {
    System.out.println(dept + ": " + count.get(dept));
}
```

---

### Activity 2: Find Duplicates (Set)

**Task:** Find which emails appear more than once.

**Data:**
```
["patrick@test.com", "maria@test.com", "patrick@test.com", 
 "juan@test.com", "maria@test.com"]
```

**Expected Output:**
```
Duplicates found:
patrick@test.com
maria@test.com
```

**Starter Code:**
```java
public class FindDuplicates {
    public static void main(String[] args) {
        String[] emails = {"patrick@test.com", "maria@test.com", 
                          "patrick@test.com", "juan@test.com", "maria@test.com"};
        
        Map<String, Integer> count = new HashMap<>();
        
        // TODO: Count emails
        
        // TODO: Find those with count > 1
        
        List<String> duplicates = new ArrayList<>();
        
        // TODO: Print duplicates
    }
}
```

---

### Activity 3: Undo System (Stack)

**Task:** Build a simple text editor with undo.

**Requirements:**
```
1. User types: "Hello"
2. User types: " World"
3. User types: "!"
4. User undo: Should remove "!"
5. User undo: Should remove " World"
```

**Starter Code:**
```java
public class TextEditor {
    private Stack<String> history = new Stack<>();
    
    public void type(String text) {
        // TODO: Add to history
    }
    
    public void undo() {
        // TODO: Remove last action
    }
    
    public void display() {
        // TODO: Show current text
    }
    
    public static void main(String[] args) {
        TextEditor editor = new TextEditor();
        editor.type("Hello");
        editor.display();     // Hello
        editor.type(" World");
        editor.display();     // Hello World
        editor.type("!");
        editor.display();     // Hello World!
        editor.undo();
        editor.display();     // Hello World
        editor.undo();
        editor.display();     // Hello
    }
}
```

---

### Activity 4: Task Queue (Queue)

**Task:** Process tasks in order (first in, first out).

**Data:**
```
Tasks: "Process order 1", "Send email", "Update inventory", "Ship item"
```

**Expected Output:**
```
Processing: Process order 1
Processing: Send email
Processing: Update inventory
Processing: Ship item
```

**Starter Code:**
```java
public class TaskProcessor {
    private Queue<String> tasks = new LinkedList<>();
    
    public void addTask(String task) {
        // TODO: Add to queue (back of line)
    }
    
    public void processTasks() {
        // TODO: Remove and process from front
    }
    
    public static void main(String[] args) {
        TaskProcessor processor = new TaskProcessor();
        processor.addTask("Process order 1");
        processor.addTask("Send email");
        processor.addTask("Update inventory");
        processor.addTask("Ship item");
        processor.processTasks();
    }
}
```

---

### Activity 5: Combined Challenge (All Structures)

**Real Scenario:** You're building an employee management system.

**Requirements:**
1. Store employees: name, id, salary, department
2. Find employee by ID instantly (Map)
3. Count employees per department (Map)
4. Track changes for undo (Stack)
5. Process pending tasks (Queue)

**Starter Code:**
```java
import java.util.*;

public class EmployeeSystem {
    private Map<Integer, String> employees = new HashMap<>();
    private Map<String, Integer> deptCount = new HashMap<>();
    private Stack<String> changes = new Stack<>();
    private Queue<String> tasks = new LinkedList<>();
    
    public void addEmployee(int id, String name, String dept) {
        // TODO: Add to employees map
        // TODO: Count departments
        // TODO: Track change in stack
    }
    
    public void removeEmployee(int id) {
        // TODO: Remove from map
        // TODO: Track change
    }
    
    public void addTask(String task) {
        // TODO: Add to queue
    }
    
    public void processTasks() {
        // TODO: Process all tasks from queue
    }
    
    public void showDepartmentCounts() {
        // TODO: Show dept -> count
    }
    
    public void showChanges() {
        // TODO: Show all changes made
    }
    
    public static void main(String[] args) {
        EmployeeSystem sys = new EmployeeSystem();
        
        sys.addEmployee(1001, "Patrick", "Engineering");
        sys.addEmployee(1002, "Maria", "HR");
        sys.addEmployee(1003, "Juan", "Engineering");
        
        sys.showDepartmentCounts();
        
        sys.addTask("Send welcome email");
        sys.addTask("Setup workstation");
        sys.processTasks();
        
        sys.showChanges();
    }
}
```

---

## 🧪 PART 11: MINI EXAMS (Logical Question Practice)

### Mini Exam 1: Array Operations
```
Question: Given an array of salaries, find:
1. Total salary
2. Average salary
3. How many earn > 50000
4. Maximum salary

Salary: [45000, 50000, 55000, 48000, 60000]
```

**Solution:**
```java
int[] salaries = {45000, 50000, 55000, 48000, 60000};

int total = 0;
for (int sal : salaries) {
    total += sal;
}

double average = total / (double) salaries.length;

int aboveThreshold = 0;
for (int sal : salaries) {
    if (sal > 50000) aboveThreshold++;
}

int max = salaries[0];
for (int sal : salaries) {
    if (sal > max) max = sal;
}

System.out.println("Total: " + total);
System.out.println("Average: " + average);
System.out.println("Above 50000: " + aboveThreshold);
System.out.println("Maximum: " + max);
```

---

### Mini Exam 2: Map Problem
```
Question: Given a string "programming", find:
1. Count each character
2. Which character appears most
3. Which character appears only once

Example: "programming"
p: 1, r: 2, o: 1, g: 2, a: 1, m: 2, i: 1, n: 1
Most frequent: r, g, m (appear 2 times)
Only once: p, o, a, i, n
```

**Solution:**
```java
String word = "programming";
Map<Character, Integer> charCount = new HashMap<>();

// Count
for (char c : word.toCharArray()) {
    charCount.put(c, charCount.getOrDefault(c, 0) + 1);
}

// Most frequent
int maxCount = 0;
for (int count : charCount.values()) {
    maxCount = Math.max(maxCount, count);
}

System.out.println("Character counts: " + charCount);
System.out.println("Most frequent appears: " + maxCount + " times");

// Only once
for (char c : charCount.keySet()) {
    if (charCount.get(c) == 1) {
        System.out.println(c + " appears only once");
    }
}
```

---

### Mini Exam 3: Real Interview Question
```
Question: Two Sum

Given: [2, 7, 11, 15], target = 9
Find: Two numbers that add up to target
Return: Indices [0, 1] (2 + 7 = 9)

Edge cases:
- [3, 3], target = 6 → [0, 1]
- [2, 7, 11], target = 5 → [] (not found)
```

**Solution (Efficient with Map):**
```java
public static int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();
    
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        
        if (seen.containsKey(complement)) {
            return new int[]{seen.get(complement), i};
        }
        
        seen.put(nums[i], i);
    }
    
    return new int[]{};  // Not found
}
```

---

## 🎓 PART 12: FINAL PREPARATION FOR WEDNESDAY EXAM

### How DSA Thinking Helps on Wednesday

**If you see a "logical question":**

1. **Read the problem** - Identify what you're storing
2. **Choose structure:**
   - Need fast lookup? → Map
   - Need duplicates removed? → Set
   - Need LIFO? → Stack
   - Need FIFO? → Queue
   - Need ordered? → Array + maybe sort

3. **Write pseudo-code** - English first

4. **Implement** - Java code

5. **Test edge cases** - Empty, single item, duplicates

### Common Exam Questions & Answers

| Question | Answer |
|----------|--------|
| "Find duplicates" | Use Map to count, filter those > 1 |
| "Check if exists" | Use Set for instant lookup |
| "Count occurrences" | Use Map<Item, Count> |
| "Most frequent" | Use Map, find max count |
| "Track changes" | Use Stack (undo) |
| "Process in order" | Use Queue |
| "Sort by value" | Collections.sort() or use TreeMap |
| "Unique items only" | Use Set |

---

## ✅ STUDY CHECKLIST FOR TOMORROW

- [ ] Read Part 1 (Data Structures) - 15 min
- [ ] Read Part 2-3 (Algorithm Thinking) - 15 min
- [ ] Work through Part 5 (Real Problems) - 15 min
- [ ] Do Activity 1 (Counting) - 10 min
- [ ] Do Activity 2 (Duplicates) - 10 min
- [ ] Do Mini Exam 1 - 10 min
- [ ] Review Quick Reference - 5 min

**Total: ~1.5 hours**

---

## 🚀 YOU'RE NOW A DSA JUNIOR DEV!

You've learned:
- ✅ Core data structures (Map, Set, Stack, Queue, ArrayList)
- ✅ When to use each one
- ✅ Common patterns (counting, deduplication, searching)
- ✅ How it connects to Units 1-4
- ✅ Real problem-solving approach

**On Wednesday exam:**
- When you see a logical question, you'll think structurally
- You'll know the best tool for the job
- You'll write efficient code
- You'll stand out from other candidates

**After the exam:**
- You'll keep learning DSA (sorting, advanced trees, dynamic programming)
- You'll recognize these patterns in real code
- You'll become a strong junior dev

**Remember:** Every senior dev you know started where you are. They just learned to think in data structures. Now you have too.

**Good luck on the exam! You've prepared like a champion!** 💪🚀

---

**Next Steps:**
1. ✅ Finish Unit 4 today
2. ✅ Study DSA tomorrow (1.5 hours)
3. ✅ Final review Tuesday
4. ✅ Exam Wednesday - Crush it!
5. ✅ Continue learning DSA after for junior dev career
