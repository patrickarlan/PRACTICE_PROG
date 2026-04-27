# Lesson 01: C# Fundamentals Exercise

This exercise covers Printing, String Literals, Variables, and Characters.

## Part 1: Concept Review
*   **string**: Double quotes `"Text"`. Used for names, sentences, etc.
*   **char**: Single quotes `'A'`. Used for single symbols or grades.
*   **int**: Whole numbers like `25`.
*   **double/decimal**: Numbers with points like `19.99`.
*   **Console.WriteLine()**: Prints text and moves to the next line.

---

## Part 2: Task - The Student Profile
Your goal is to create a small program that displays a student's record.

**Requirements:**
1.  Open your `Basics/CSBasics.cs` (or create a new file `Exercises/Solution.cs`).
2.  Create the following variables:
    *   A **string** for the student's full name.
    *   An **int** for their age.
    *   A **char** for their middle initial.
    *   A **double** for their current GPA.
    *   A **bool** for whether they are currently enrolled (true/false).
3.  **Print** all of them to the console in a nice format.

**Example Output:**
```text
Student: John D. Doe
Age: 20
GPA: 3.8
Enrolled: True
```

---

## Part 3: Bug Hunter (Error Fixing)
Look at the code below. There are **4 errors**. Can you identify and fix them?

```csharp
string studentName = 'Alice';
int grade = "A";
double gpa = 4,0;
char initial = "B"
```

---

## Part 4: Challenge Task
Try to combine (concatenate) your variables into a single sentence using the `+` symbol.

**Goal**: Print something like:
`"Hello, my name is [Name] and I am [Age] years old."`

---

### How to submit:
Try to write the code for Part 2 and Part 4 in your project. If you get stuck or want me to check your work, just ask!
