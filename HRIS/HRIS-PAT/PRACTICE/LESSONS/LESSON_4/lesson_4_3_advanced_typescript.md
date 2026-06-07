# Chapter 4: JavaScript & TypeScript Basics

## Lesson 4.3: Advanced TypeScript (Union Types, Generics & Nullables)

In Lesson 4.2, you learned how to type basic variables and objects. But real-world data is rarely that simple. Sometimes a variable can be more than one type. Sometimes a value might be missing entirely (`null`). 

This lesson covers the "superpowers" of TypeScript. This is the stuff that separates beginners from professional React developers. You will see these concepts *everywhere* in the HRIS project.

---

## Part 1: Union Types (`|`)

A Union Type means "this variable can be Type A **OR** Type B". We use the pipe symbol (`|`) to create them.

### Union of basic types
```typescript
let myId: string | number;

myId = 123;      // ✅ fine
myId = "ABC-12"; // ✅ fine
myId = true;     // ❌ Error: boolean is not string or number
```

### Union of literal strings (Extremely common in React)
You can lock a string down so it only accepts specific words.

```typescript
// The status can ONLY be one of these three exact words
let status: "active" | "inactive" | "pending";

status = "active";  // ✅ fine
status = "deleted"; // ❌ Error: Type '"deleted"' is not assignable to type '"active" | "inactive" | "pending"'
```

---

## Part 2: Handling Nullables Safely

The number one cause of web apps crashing is the "Cannot read property of undefined" error. This happens when you try to read data from an object that doesn't exist yet.

TypeScript forces you to handle `null` explicitly.

```typescript
// explicitly telling TypeScript "this might be null"
let supervisor: string | null = null; 
```

How do we safely work with variables that might be null? We have two magic operators:

### 1. Optional Chaining (`?.`)
If you try to read `employee.department.name` but `department` is null, the app crashes. 
Optional chaining stops the crash.

```typescript
// In plain English: "Get the department name, but if department is null, just stop and return undefined instead of crashing."
const deptName = employee.department?.name;
```

### 2. Nullish Coalescing (`??`)
If a value is null, provide a fallback (a default value).

```typescript
// In plain English: "Use supervisor name, but if it is null/undefined, use 'No Supervisor Assigned' instead."
const displaySupervisor = supervisor ?? "No Supervisor Assigned";
```

*(Note: `??` is better than `||` because `||` triggers on any "falsy" value like `0` or `""`, whereas `??` ONLY triggers on `null` or `undefined`.)*

---

## Part 3: Generics (`<T>`)

Generics are like variables, but for **Types**. They allow you to write reusable code that works with any type, while remaining strictly typed.

Instead of writing a function that only takes strings, you write a function that takes `<T>` (which stands for "Type").

```typescript
// "T" is a placeholder. When we call the function, T gets replaced by the actual type.
function wrapInArray<T>(item: T): T[] {
    return [item];
}

// Hover over these variables in VS Code to see the magic:
const stringArray = wrapInArray<string>("Hello");   // returns string[]
const numberArray = wrapInArray<number>(99);        // returns number[]
const boolArray = wrapInArray(true);                // TS is smart enough to guess <boolean> automatically!
```

You will see Generics constantly in React. For example, when you fetch data from an API, you tell the fetching function what *shape* of data you expect to get back:
```typescript
// "Fetch the data, and treat the result as an array of Employees"
const data = await fetchApi<Employee[]>('/api/employees');
```

---

## Part 4: Utility Types (Bonus)

TypeScript has built-in tools to transform types quickly. Here is the most common one you'll use when updating databases:

### `Partial<T>`
Makes every field in an interface optional. Perfect for updating a user where you might only send the `name` and leave the rest alone.

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

// Partial<User> makes it act like this:
// { id?: number, name?: string, email?: string }

const updatePayload: Partial<User> = {
    name: "Patrick New Name" // ✅ fine, we don't need to provide id or email
};
```

---

## 📝 Activity: Advanced Types

### Step 1: Create the file
Inside `PRACTICE/ts/`, create a new file named `advanced.ts`.

### Step 2: Write the Code
Complete these 4 tasks in `advanced.ts`:

1. **Union Type:**
   - Create a variable `status` typed as `"active" | "inactive" | "pending"`.
   - Assign it the value `"active"`.
   - *(Optional: Try assigning it `"deleted"` just to see the red squiggly error, then delete it).*

2. **Nullables and Optional Chaining (`?.`):**
   - Create an object called `company` that looks like this:
     ```typescript
     const company = {
         name: "Tech Corp",
         manager: null // The manager is currently null
     };
     ```
   - Use `?.` to safely attempt to read `company.manager.name` and log it to the console. (It should print `undefined` without crashing).

3. **Nullish Coalescing (`??`):**
   - Create a variable: `let supervisor: string | null = null;`
   - Use `??` to `console.log` a fallback string: `"No Supervisor Assigned"`.

4. **Generics:**
   - Write the generic function `wrapInArray<T>(item: T): T[]` (feel free to copy it from the lesson above).
   - Call it once with a string, once with a number, and log both results.

### Step 3: Run the code
Run the file in your terminal:
```bash
npx tsx advanced.ts
```

---

## 🧪 Test Checklist

- [ ] `PRACTICE/ts/advanced.ts` created
- [ ] Variable `status` created with specific string union types
- [ ] Safely attempted to read a null property using `?.`
- [ ] Handled a null value safely using `??`
- [ ] Generic function `<T>` created and tested with different data types
- [ ] File runs without errors using `npx tsx advanced.ts`

---

## 📊 Final Score: ___/10

**Summary:**
- [ ] Activity completed (`advanced.ts` built and runs)
- [ ] All 6 checklist items pass

**Ready for:** Unit 5 — React Fundamentals!
