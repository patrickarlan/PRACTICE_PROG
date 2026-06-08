# Chapter 4: JavaScript & TypeScript Basics

## Lesson 4.5: Arrays, Objects & React Patterns

This is the final lesson before React. You are going to learn the three most common JavaScript patterns used in React development. If you understand these three things, React will feel incredibly easy.

---

## Part 1: Destructuring

Destructuring is a fancy word for "unpacking" variables from objects and arrays.

### Object Destructuring
Normally, to get data out of an object, you do this:
```typescript
const employee = { name: "Patrick", role: "Developer" };
const name = employee.name;
const role = employee.role;
```

**Destructuring** lets you do it in one line:
```typescript
const { name, role } = employee;
```
*(This is how we extract "Props" in React components!)*

### Array Destructuring
You can do the same thing with arrays, but it unpacks by position (index) instead of by name.
```typescript
const colors = ["Red", "Green", "Blue"];

const [firstColor, secondColor] = colors;
console.log(firstColor); // "Red"
console.log(secondColor); // "Green"
```
*(This is exactly how React's `useState` hook works!)*

---

## Part 2: The Spread Operator (`...`)

The Spread Operator (`...`) does exactly what it sounds like: it "spreads" the contents of an array or object into a new one.

In React, you are **not allowed** to modify existing data directly (this is called mutation). Instead, you must create a *copy* of the data with the new changes. 

### Copying and Updating Objects
```typescript
const employee = { id: 1, name: "Patrick", dept: "HR" };

// ❌ BAD (Mutating the original object)
// employee.dept = "IT"; 

// ✅ GOOD (Creating a copy with the spread operator)
const updatedEmployee = {
    ...employee,      // Copy everything from the original
    dept: "IT"        // Override the department
};
```

### Copying and Adding to Arrays
```typescript
const fruits = ["Apple", "Banana"];

// ✅ GOOD (Create a new array, spread the old one in, and add a new item at the end)
const moreFruits = [...fruits, "Mango"]; // ["Apple", "Banana", "Mango"]
```

---

## Part 3: Short-Circuit Evaluation (`&&` and `||`)

In traditional programming, you use `if` statements to conditionally run code. In React, we use short-circuit evaluation inside our HTML to conditionally show things on the screen.

### The `&&` Operator (If True, Do This)
In React, `&&` means "If the left side is true, render the right side."
```typescript
const isLoggedIn = true;

// If isLoggedIn is true, it prints the second part. If false, it does nothing.
isLoggedIn && console.log("Welcome to the Dashboard!");
```

### The `||` Operator (Fallback Value)
`||` means "If the left side is false/empty, use the right side."
```typescript
const username = ""; // Empty string is falsy

// If username is empty, fallback to "Guest"
const displayName = username || "Guest";
console.log(displayName); // "Guest"
```

---

## 📝 Activity: React Patterns

### Step 1: Create the file
Inside `PRACTICE/ts/`, create a new file named `patterns.ts`.

### Step 2: Write the Code
Complete these tasks in `patterns.ts`:

1. **Object Destructuring:**
   - Copy this object:
     ```typescript
     const user = { firstName: "Patrick", lastName: "Star", age: 25 };
     ```
   - Use destructuring to extract `firstName` and `age` into variables in a single line.
   - `console.log` them.

2. **Array Destructuring:**
   - Copy this array:
     ```typescript
     const coordinates = [10.5, 20.1, 99.9];
     ```
   - Use destructuring to extract the first two numbers into variables called `x` and `y`.
   - `console.log(x, y)`.

3. **The Spread Operator (Objects):**
   - Create a new variable called `updatedUser`.
   - Use the spread operator `...` to copy all properties from the `user` object above, but change the `age` to `26`.
   - `console.log(updatedUser)`.

4. **The Spread Operator (Arrays):**
   - Create a new array called `newCoordinates`.
   - Use the spread operator to copy the `coordinates` array and add `55.5` to the end of it.
   - `console.log(newCoordinates)`.

5. **Short-Circuit (`&&`):**
   - Create a variable `let hasError: boolean = true;`
   - Use `&&` (no `if` statements!) to `console.log("An error occurred!")` only when `hasError` is true.

### Step 3: Run the code
Run the file in your terminal:
```bash
npx tsx patterns.ts
```

---

## 🧪 Test Checklist

- [ ] `PRACTICE/ts/patterns.ts` created
- [ ] Successfully destructured object properties
- [ ] Successfully destructured array positions
- [ ] Successfully copied and updated an object using `...` spread
- [ ] Successfully copied and added to an array using `...` spread
- [ ] Used `&&` short-circuiting correctly
- [ ] File runs without errors using `npx tsx patterns.ts`

---

## 📊 Final Score: ___/10

**Summary:**
- [ ] Activity completed (`patterns.ts` built and runs)
- [ ] All 7 checklist items pass

**Ready for:** Unit 5 — React Fundamentals!
