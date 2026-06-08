# Chapter 4: JavaScript & TypeScript Basics

## Lesson 4.4: Advanced Functions (Arguments, Callbacks & Async)

Functions are the building blocks of all code. In React, **everything** is a function. A component is a function. A click handler is a function. Understanding how data flows in and out of functions is critical.

---

## Part 1: Arguments Deep Dive

You already know how to pass a basic argument `(name: string)`. But TypeScript gives us more control.

### 1. Optional Arguments (`?`)
Sometimes you don't need to provide all the data. Use `?` to make an argument optional.
```typescript
function sendEmail(to: string, cc?: string) {
    if (cc) {
        console.log(`Sending to ${to} and CCing ${cc}`);
    } else {
        console.log(`Sending to ${to}`);
    }
}

sendEmail("patrick@hris.com"); // Works perfectly without CC
```

### 2. Default Arguments (`=`)
Instead of making it optional, you can provide a default fallback value if the user doesn't provide one.
```typescript
// If role is not provided, it defaults to "Employee"
function createAccount(name: string, role: string = "Employee") {
    console.log(`Created ${role} account for ${name}`);
}

createAccount("Patrick"); // "Created Employee account for Patrick"
createAccount("Maria", "Manager"); // "Created Manager account for Maria"
```

### 3. Rest Parameters (`...`)
What if you want to accept an unknown number of arguments? The `...` syntax gathers them all into an array.
```typescript
function logAll(...messages: string[]) {
    // messages is now an array of strings!
    messages.forEach(msg => console.log(msg));
}

logAll("Server started", "Database connected", "User logged in");
```

---

## Part 2: Higher-Order Functions & Callbacks

A **Higher-Order Function** is a function that takes *another* function as an argument. The function you pass in is called a **Callback**.

You already used this in Lesson 4.1 with `.map()`!

```typescript
const numbers = [1, 2, 3, 4, 5];

// .filter() is a higher-order function.
// It loops through the array, and runs our callback function on every item.
// If our callback returns true, it keeps the item.

const evens = numbers.filter((num) => {
    return num % 2 === 0;
});

console.log(evens); // [2, 4]
```

In React, you will use Callbacks constantly for buttons:
```tsx
// "When this button is clicked, run this callback function"
<button onClick={() => console.log("Clicked!")}>Save</button>
```

---

## Part 3: Closures (React's Secret Weapon)

A **Closure** is when a function "remembers" the variables outside of it, even after the outside function has finished running.

```typescript
function makeCounter() {
    let count = 0; // This variable lives inside makeCounter

    // We return a brand new function
    return function() {
        count++; // It remembers the 'count' variable from above!
        return count;
    }
}

const myCounter = makeCounter();
console.log(myCounter()); // 1
console.log(myCounter()); // 2
```
*Why does this matter?* Because React's `useState` hook works exactly like this under the hood. It uses closures to "remember" state between screen renders!

---

## Part 4: Async Functions & Promises

Sometimes code takes time (e.g., fetching data from a database). JavaScript doesn't wait; it keeps running the next lines of code immediately. 

To handle this, we use **Promises**. A Promise means *"I don't have the data yet, but I promise I will give it to you when I'm done."*

We handle Promises using the `async` and `await` keywords.
- `async`: Marks a function as returning a Promise.
- `await`: Pauses the function until the Promise finishes.

```typescript
// 1. We mark the function as 'async'
async function fetchUser(id: number): Promise<string> {
    try {
        // 2. We 'await' the fake network request. It pauses here.
        const response = await simulateNetworkRequest(id);
        return `User is ${response}`;
    } catch (error) {
        // 3. If the network request fails, it jumps here.
        return "Failed to fetch user";
    }
}
```

---

## 📝 Activity: Advanced Functions

### Step 1: Create the file
Inside `PRACTICE/ts/`, create a new file named `functions.ts`.

### Step 2: Write the Code
Complete these tasks in `functions.ts`:

1. **Format Employee (Defaults & Optionals):**
   - Write a function `formatEmployee(name: string, department?: string, role: string = "Employee"): string`.
   - It should return a sentence describing the employee.
   - Call it 3 times:
     1. Providing only a name.
     2. Providing a name and department.
     3. Providing all three arguments.
   - `console.log` all three results.

2. **Rest Parameters:**
   - Write `function logAll(...items: string[]): void` that loops through `items` using `.forEach()` and prints each one.
   - Call it with 4 different string arguments at once.

3. **Higher-Order Functions:**
   - Create an array of numbers `[10, 20, 30, 40, 50]`.
   - Use `.filter()` to keep only numbers greater than 25.
   - Use `.map()` on the result to multiply them by 2.
   - *Challenge: Chain the `.filter()` and `.map()` together in one line!*

4. **Async/Await:**
   - Copy this fake database function into your file:
     ```typescript
     function fakeDbCall(): Promise<string> {
         return new Promise((resolve) => setTimeout(() => resolve("Data loaded!"), 2000));
     }
     ```
   - Write an `async` function called `getData()`.
   - Inside it, `console.log("Loading...")`.
   - Then, use `await` to call `fakeDbCall()` and store the result in a variable.
   - `console.log` the result.
   - Finally, call `getData()` at the bottom of your file.

### Step 3: Run the code
Run the file in your terminal:
```bash
npx tsx functions.ts
```
*(Notice how the `getData()` function pauses for 2 seconds before printing "Data loaded!"? That's the power of await!)*

---

## 🧪 Test Checklist

- [ ] `PRACTICE/ts/functions.ts` created
- [ ] `formatEmployee` correctly uses optional `?` and default `=` arguments
- [ ] `logAll` correctly uses `...rest` parameters
- [ ] Array chained with `.filter().map()` correctly
- [ ] `async/await` function successfully pauses for 2 seconds and prints the result
- [ ] File runs without errors using `npx tsx functions.ts`

---

## 📊 Final Score: ___/10

**Summary:**
- [ ] Activity completed (`functions.ts` built and runs)
- [ ] All 6 checklist items pass

**Ready for:** Lesson 4.5 — Arrays, Objects & React Patterns!
