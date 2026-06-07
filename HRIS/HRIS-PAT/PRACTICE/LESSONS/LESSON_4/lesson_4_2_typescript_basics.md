# Chapter 4: JavaScript & TypeScript Basics

## Lesson 4.2: TypeScript Basics

In Lesson 4.1, you wrote JavaScript freely — you could store anything in any variable with no complaints. TypeScript is **JavaScript with strict rules about types.** It's the same language, but now the compiler watches over your shoulder and stops you from making mistakes before they become bugs.

Every single `.tsx` and `.ts` file in the HRIS project is TypeScript. Understanding it is not optional.

---

## Part 1: What is TypeScript and Why Does It Exist?

Imagine this JavaScript code:

```javascript
function getEmployeePay(employee) {
    return employee.salary * 12;
}
```

If someone calls this with the wrong data:
```javascript
getEmployeePay("Patrick"); // "Patrick" is a string, not an employee object
// Result: NaN (Not a Number) — silent, invisible bug in production!
```

JavaScript has **no idea** this is wrong. It just tries to run it and fails silently.

Now the same function in TypeScript:
```typescript
interface Employee {
    name: string;
    salary: number;
}

function getEmployeePay(employee: Employee) {
    return employee.salary * 12;
}

getEmployeePay("Patrick"); // ❌ TypeScript RED ERROR immediately, right in VS Code
// Error: Argument of type 'string' is not assignable to parameter of type 'Employee'
```

TypeScript catches this **before you even run the code.** It's your safety net.

---

## Part 2: Declaring Types

In TypeScript, after every variable or parameter name you add `: type` to tell the compiler what kind of data it holds.

```typescript
// Basic Types
const name: string = "Patrick";
const age: number = 22;
const isActive: boolean = true;

// Arrays — type followed by []
const fruits: string[] = ["Apple", "Banana", "Mango"];
const scores: number[] = [90, 85, 78];

// Void — for functions that return nothing
function logMessage(msg: string): void {
    console.log(msg);
    // No return statement needed
}

// Never — for functions that NEVER return (throw an error or run forever)
function throwError(message: string): never {
    throw new Error(message);
}
```

**Why `void` vs `never`?**
- `void` = "This function runs and finishes, but gives you nothing back."
- `never` = "This function literally never completes normally."

---

## Part 3: Interfaces — Defining the Shape of an Object

An `interface` is a blueprint that describes what properties an object must have and what type each property must be.

```typescript
interface Employee {
    id: number;
    name: string;
    department: string;
    isActive: boolean;
}
```

Once you define an interface, any object that claims to be an `Employee` **must** have all these properties with the correct types:

```typescript
// ✅ Correct — has all required properties with correct types
const employee1: Employee = {
    id: 1,
    name: "Patrick",
    department: "Engineering",
    isActive: true,
};

// ❌ Error — missing 'department'
const employee2: Employee = {
    id: 2,
    name: "Maria",
    isActive: true,
};
// TypeScript Error: Property 'department' is missing in type '...'
```

---

## Part 4: Optional Properties with `?`

Sometimes a property is not always required. You mark it optional with a `?` after its name:

```typescript
interface Department {
    id: number;
    name: string;
    code?: string; // This is optional — the object may or may not have it
}

// ✅ Both of these are valid:
const dept1: Department = { id: 1, name: "Engineering", code: "ENG" };
const dept2: Department = { id: 2, name: "HR" }; // No 'code' — still valid!
```

---

## Part 5: `readonly` Properties

Sometimes you want a property to be set once and never changed. Use `readonly`:

```typescript
interface Employee {
    readonly id: number; // Cannot be changed after creation
    name: string;
}

const emp: Employee = { id: 1, name: "Patrick" };

emp.name = "John"; // ✅ Fine — name is not readonly
emp.id = 99;       // ❌ Error: Cannot assign to 'id' because it is a read-only property.
```

This is very useful for database IDs — once an employee record is created, the ID should never change.

---

## Part 6: `type` Alias vs `interface`

You can also define a type using the `type` keyword. For objects, they look almost identical:

```typescript
// Using interface (preferred for objects)
interface Employee {
    name: string;
    role: string;
}

// Using type alias
type Employee = {
    name: string;
    role: string;
}
```

**Professor's Rule:** In the HRIS project and modern React/TypeScript, use `interface` for objects (especially API data shapes). Use `type` for simpler things like union types (covered in Lesson 4.3):

```typescript
// Great use of 'type': a union of specific allowed values
type Status = "active" | "inactive" | "pending";
```

---

## Part 7: Typing a Real HRIS Interface

Here's a real example of what an interface looks like in the HRIS frontend. Navigate to `hris/src/` and open any file — you'll see patterns like this:

```typescript
// Example from the HRIS project
export interface AccomplishmentReport {
    readonly reportId: number;
    title: string;
    description: string;
    status: "Pending" | "Approved" | "Rejected"; // Only these 3 strings are allowed
    submittedAt: string;
    employeeId: number;
}
```

Read it line by line in plain English:
- `readonly reportId: number` → "A number that can never be changed once set."
- `title: string` → "A text field."
- `status: "Pending" | "Approved" | "Rejected"` → "The status can ONLY ever be one of these 3 words."

---

## 📝 Activity: Rewrite `basics.js` in TypeScript

### Step 1: Create the file
Create a new folder `ts` inside `PRACTICE/` if it doesn't exist, then create `basics.ts` inside it.

### Step 2: Write the TypeScript code

In `basics.ts`, do all of the following:

1. **Typed Variables:** Rewrite your 5 variables from `basics.js` with explicit TypeScript types (`: string`, `: number`, `: boolean`, `: string[]`, and a typed object).

2. **Typed Arrow Function:** Rewrite `sayHello` with a typed parameter and a return type:
   ```typescript
   const sayHello = (name: string): string => {
       return `Welcome to JS, ${name}!`;
   }
   ```

3. **Employee Interface:** Create an `interface Employee` with these 4 fields:
   - `id: number`
   - `name: string`
   - `department: string`
   - `isActive: boolean`

4. **Use the Interface:** Create a variable of type `Employee` and fill it with your own data.

5. **Department Interface:** Create an `interface Department` with `id: number`, `name: string`, and `code?: string` (optional).

6. **Employee Array:** Create an array typed as `Employee[]` containing at least 3 employee objects.

7. **HRIS Real World:** Open any `.tsx` file inside `hris/src/` in the HRIS project. Find an interface or type that is defined there. Copy it into a comment in your `basics.ts` file and write (in comments) what each field means in plain English.

### Step 3: Run it with `npx tsx`

TypeScript cannot run directly with `node`. We need `tsx` which compiles and runs it for us:

```bash
# Navigate to the ts folder
cd PRACTICE/ts

# Run the file (npx means "use this tool without installing it permanently")
npx tsx basics.ts
```

*(If it asks you to install `tsx`, press Enter to confirm.)*

---

## 🧪 Test Checklist

- [ ] `PRACTICE/ts/basics.ts` created
- [ ] All 5 variables have explicit types
- [ ] `sayHello` function has typed parameter AND typed return value
- [ ] `interface Employee` defined with 4 required fields
- [ ] A variable of type `Employee` created with correct data
- [ ] `interface Department` defined with `code?` as optional
- [ ] `Employee[]` array created with 3 employees
- [ ] Real HRIS interface found, copied, and explained in comments
- [ ] File runs without TypeScript errors using `npx tsx basics.ts`

---

## 📊 Final Score: ___/10

**Summary:**
- [ ] Activity completed (`basics.ts` built and runs)
- [ ] All 9 checklist items pass
- [ ] Real HRIS interface found and explained

**Ready for:** Lesson 4.3 — Advanced TypeScript (Union Types, Generics & Nullables)
