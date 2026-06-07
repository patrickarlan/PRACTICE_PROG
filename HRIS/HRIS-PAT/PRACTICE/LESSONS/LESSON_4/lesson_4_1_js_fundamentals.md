# Chapter 4: JavaScript & TypeScript Basics

## Lesson 4.1: JavaScript Fundamentals

HTML gives a webpage structure. CSS makes it look good. **JavaScript (JS) makes it do things.** 

JavaScript is the engine behind every button click, every form submission, and every dynamic update on the screen. In the HRIS project, it's what grabs employee data from the database and displays it on the screen.

Before we can use React, we need to make sure your core JavaScript skills are solid.

---

## Part 1: Variables (`let`, `const`, `var`)

Variables are containers for storing data. In modern JavaScript, we only use two keywords to create them: `let` and `const`. 

*(Note: You might see `var` in old code tutorials. We **never** use it anymore because it behaves unpredictably. Forget `var` exists!)*

```javascript
// 1. const = CONSTANT. The value cannot be changed later.
const myName = "Patrick";
// myName = "John"; // ❌ ERROR! You can't reassign a const.

// 2. let = LET it change. The value can be updated later.
let age = 25;
age = 26; // ✅ Perfectly fine!
```

**Professor's Rule of Thumb:** *Always default to `const`. Only use `let` if you know the value needs to change later (like a counter or a toggled state).*

---

## Part 2: Data Types

JavaScript variables can hold many types of data. Here are the ones you will use every day:

```javascript
// 1. String (Text)
const department = "Engineering";

// 2. Number (Whole numbers or decimals)
const salary = 55000.50;

// 3. Boolean (True or False)
const isActive = true;

// 4. Null & Undefined (Empty values)
let manager = null;       // "I explicitly set this to nothing"
let assignedTask;         // undefined - "This variable exists, but has no value yet"

// 5. Array (A list of items)
const fruits = ["Apple", "Banana", "Mango"];
console.log(fruits[0]);   // Prints "Apple" (Arrays start at 0!)

// 6. Object (A collection of properties, like a dictionary)
const employee = {
    firstName: "Patrick",
    role: "Developer",
    isEmployed: true
};
console.log(employee.firstName); // Prints "Patrick"
```

---

## Part 3: Functions (Regular vs Arrow)

Functions are reusable blocks of code. You pass data in, it does something, and it returns a result.

There are two ways to write functions. You need to know both, but the HRIS project mostly uses the modern "Arrow" syntax.

### 1. Regular Functions (The Old Way)
```javascript
function greet(name) {
    return "Hello, " + name + "!";
}

console.log(greet("Patrick")); // Prints: "Hello, Patrick!"
```

### 2. Arrow Functions (The Modern Way)
This does exactly the same thing, but it's shorter and cleaner.
```javascript
const greetModern = (name) => {
    return `Hello, ${name}!`; 
}
// Note the backticks ` ` instead of quotes. This is called a Template Literal.
// It lets you inject variables directly using ${} without doing string math (+).
```

If the arrow function is super simple and just returns one thing, you can even write it on one line:
```javascript
const add = (a, b) => a + b;
```

---

## Part 4: Control Flow & Loops

How do we make decisions or repeat actions in JavaScript?

### `if / else`
```javascript
const age = 20;

if (age >= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are a minor.");
}
```

### `for` Loop (The traditional way)
Useful when you want to count up or repeat something a specific number of times.
```javascript
const fruits = ["Apple", "Banana", "Mango"];

for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}
```

### `.forEach()` and `.map()` (The React ways)
In React and modern JS, we rarely use `for` loops to go through arrays. Instead, we use array methods.

**1. `.forEach()` - Do something for every item**
```javascript
const fruits = ["Apple", "Banana", "Mango"];

fruits.forEach((fruit) => {
    console.log(fruit); 
});
```

**2. `.map()` - Transform an array into a NEW array**
This is **critical** for React. We use `.map()` to turn a list of data into a list of UI components.
```javascript
const numbers = [1, 2, 3];

// Take every number, and return a new array where it's multiplied by 2
const doubled = numbers.map((num) => num * 2);

console.log(doubled); // Prints: [2, 4, 6]
```

---

## 📝 Activity: Write Your First JS File

Time to put this into practice. We are going to write a pure JavaScript file and run it using the Node.js runtime we learned about in Lesson 3.5.0!

### Step 1: Create the file
1. Create a new folder named `js` inside the `PRACTICE` directory (if it doesn't exist).
2. Create a new file called `basics.js` inside `PRACTICE/js/`.

### Step 2: Write the code
Write code in `basics.js` to accomplish the following tasks:

1. **Variables:** Declare 5 variables:
   - Your name (string)
   - Your age (number)
   - `isStudent` (boolean)
   - `favoriteFoods` (array of 3 strings)
   - `person` (an object with a `firstName` and `jobTitle` property)
2. **Function:** Write an arrow function called `sayHello(name)` that returns `"Welcome to JS, [name]!"`. Call the function with your name variable and `console.log` the result.
3. **If/Else:** Write an `if/else` statement that checks if your age is over 18. If true, print `"You can vote!"`, else print `"Too young to vote!"`.
4. **For Loop:** Write a traditional `for` loop that prints out every item in your `favoriteFoods` array one by one.
5. **Map:** Use `.map()` on your `favoriteFoods` array to create a NEW array where every food has the word `" is delicious"` appended to it. Print this new array.

### Step 3: Run the code!
Open a terminal in VS Code, navigate to the `PRACTICE/js/` folder, and run your file using Node:

```bash
node basics.js
```
*(You should see all your `console.log` outputs appear in the terminal!)*

### Step 4: The Browser Console
Node lets us run JS in the terminal. The browser lets us run JS on a webpage.
1. Open Google Chrome.
2. Press `F12` to open Developer Tools.
3. Click the **Console** tab.
4. Type `console.log("I am learning JS in the browser!")` and press Enter.
5. Take a screenshot of the result.

---

## 🧪 Test Checklist

- [ ] `PRACTICE/js/basics.js` created and runs without errors
- [ ] Variables (string, number, boolean, array, object) correctly declared
- [ ] Arrow function created and tested
- [ ] `if/else` logic works
- [ ] `for` loop prints array items
- [ ] `.map()` successfully transforms the array
- [ ] Ran the file using `node basics.js` in the terminal
- [ ] Executed `console.log` in the Chrome Developer Tools Console

---

## 📊 Final Score: ___/10

**Summary:**
- [ ] Activity completed (`basics.js` built and run)
- [ ] All 8 checklist items pass
- [ ] Browser console screenshot saved

**Ready for:** Lesson 4.2 — TypeScript Basics
