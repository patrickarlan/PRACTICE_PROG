# 🚀 UNIT 6: ADVANCED TOPICS - QUICK START GUIDE

## 📚 Files Created

1. **lesson_6_advanced_topics.md** — Complete lesson with:
   - ✅ Lesson 6.1: Database Normalization (1NF, 2NF, 3NF)
   - ✅ Lesson 6.2: SQL JOINs (INNER, LEFT, RIGHT, FULL OUTER)
   - ✅ Lesson 6.3: CRUD Operations deep dive
   - ✅ Lesson 6.4: FizzBuzz Algorithm
   - ✅ Lesson 6.5: Min/Max without built-in methods
   - ✅ Real-world examples and activities for each lesson

2. **LESSON_6_CHEAT_SHEET.md** — Quick reference for:
   - ✅ Normalization rules table
   - ✅ All 4 JOIN types with results summary
   - ✅ CRUD syntax and safety checklist
   - ✅ FizzBuzz in Java and PHP
   - ✅ Min/Max algorithm template

---

## 🎯 The Activities (One Per Lesson)

| Lesson | Topic | Activities | Difficulty |
|--------|-------|------------|------------|
| 6.1 | Normalization | Fix 1NF, design 2NF, full 3NF design | ⭐⭐ Medium |
| 6.2 | SQL JOINs | Write INNER/LEFT/RIGHT JOIN queries | ⭐⭐ Medium |
| 6.3 | CRUD | Full CRUD on a products table | ⭐ Basic |
| 6.4 | FizzBuzz | 1–100, then add "Jazz" variant | ⭐⭐ Medium |
| 6.5 | Min/Max | Java method + PHP with name tracking | ⭐⭐ Medium |

---

## 🚀 How to Get Started

### Step 1: Read the Full Lesson
- Open `lesson_6_advanced_topics.md`
- Read one section at a time
- Pay attention to the ⚠️ danger notes

### Step 2: Study Each Example Before Coding
- Normalization → Trace the table splitting step by step
- JOINs → Draw the two tables on paper first
- FizzBuzz → Trace through i=1 to i=15 manually
- Min/Max → Trace through the array manually first

### Step 3: Do the Activities
- SQL Activities → Open your SQLite/phpMyAdmin and try them
- Java Activities → Create `.java` files in your JAVA folder
- PHP Activities → Create `.php` files in your ACTS folder

### Step 4: Check Your Work
- SQL: Run a `SELECT *` to verify your data
- Java: `javac FileName.java` → `java FileName`
- PHP: `php filename.php` in terminal

---

## 💡 Key Concepts to Lock In

### Normalization Memory Trick
```
1NF = "ONE value per cell"
2NF = "ALL columns depend on the WHOLE key"
3NF = "Columns ONLY describe the primary key"
```

### JOIN Memory Trick
```
INNER  = Intersection (only what's in both)
LEFT   = All of LEFT + intersection
RIGHT  = All of RIGHT + intersection
FULL   = Everything
```

### FizzBuzz Rule
```
BOTH (3 && 5) → FIRST
3 only        → SECOND
5 only        → THIRD
number        → LAST
```

### Min/Max Rule
```
Baseline = arr[0]   (never 0!)
Loop from index 1
Compare with < (min) or > (max)
Return after loop
```

---

## 📋 Activity Checklist

- [ ] Read Lesson 6.1 (Normalization)
- [ ] Complete Activity 6.1.1 — Fix the 1NF violation
- [ ] Complete Activity 6.1.2 — Normalize to 2NF
- [ ] Complete Activity 6.1.3 — Design full 3NF bookstore database
- [ ] Read Lesson 6.2 (SQL JOINs)
- [ ] Complete Activity 6.2.1 — Write all 3 JOIN queries
- [ ] Complete Activity 6.2.2 — Predict the LEFT JOIN output
- [ ] Read Lesson 6.3 (CRUD deep dive)
- [ ] Complete Activity 6.3.1 — Full CRUD on products table
- [ ] Complete Activity 6.3.2 — Engineering salary raise query
- [ ] Read Lesson 6.4 (FizzBuzz)
- [ ] Complete Activity 6.4.1 — FizzBuzz 1 to 100
- [ ] Complete Activity 6.4.2 — FizzBuzz with "Jazz" variant
- [ ] Read Lesson 6.5 (Min/Max)
- [ ] Complete Activity 6.5.1 — Java `getMinimum` method
- [ ] Complete Activity 6.5.2 — PHP find lowest/highest paid employee

---

## ✅ UNIT 6 COMPLETION SUMMARY

| # | Lesson | Status | Verified |
|---|--------|--------|----------|
| 6.1 | Database Normalization | [ ] | — |
| 6.2 | SQL JOINs | [ ] | — |
| 6.3 | CRUD Operations | [ ] | — |
| 6.4 | FizzBuzz Algorithm | [ ] | — |
| 6.5 | Min/Max Arrays | [ ] | — |

---

## 🔗 Files Location
- **Lesson:** `LESSON 6/lesson_6_advanced_topics.md`
- **Cheat Sheet:** `LESSON 6/LESSON_6_CHEAT_SHEET.md`
- **SQL Activities:** `ACTS/lesson6.sql` (create this as you work)
- **Java Activities:** `ACTS/JAVA/` folder
- **PHP Activities:** `ACTS/` folder

---

**These 5 topics were on the actual exam — master them and you're ready! 🚀**
