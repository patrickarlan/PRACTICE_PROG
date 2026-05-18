# Chapter 1: The Invisible World of the Web

## Lesson 1.6: The Art of Debugging & Error Handling — Becoming a Code Detective

Every developer spends a significant portion of their time debugging. This is **not a sign of weakness** — it is the core skill that separates good developers from great ones. In fact, the best developers are often the best *debuggers*. They know how to think like detectives, carefully observing clues and tracing errors back to their source.

This lesson teaches you a systematic approach to finding and fixing bugs. You will learn that errors are not failures—they are **messages from your code telling you exactly what went wrong**.

---

## Part 1: Understanding the Three Types of Errors

Before you can fix an error, you need to recognize what *type* of error you're dealing with. Errors fall into three categories:

### 1. Syntax Errors — The Compiler's Complaint

**Syntax errors** occur when you write code that doesn't follow the language's grammar rules. The compiler or browser detects these *before* your program even runs.

**In plain English:** You forgot a closing bracket, misspelled a keyword, or made a grammatical mistake in your code.

**Examples of syntax errors:**

```javascript
// Missing closing bracket
const greeting = "Hello, World!"
console.log(greeting  // ❌ SyntaxError: missing closing parenthesis

// Typo in keyword
let x = 5
if (x > 3) {  // ❌ SyntaxError: "if" is misspelled as "iof"
    console.log("X is greater than 3")
}

// Missing semicolon (in some contexts)
const name = "Patrick"
const age = 25  // ❌ No semicolon (usually caught by linters, not always a syntax error)
```

**How you'll know:** You'll see an error message **before** your code even runs. Your IDE will highlight the problem with a red squiggly line.

**The fix:** Read the error message carefully. It tells you exactly which line has the problem. Usually it's a simple fix: add a bracket, fix the spelling, or add a semicolon.

---

### 2. Runtime Errors — The Crash During Execution

**Runtime errors** occur *after* your code starts running. The code is syntactically correct, but something goes wrong during execution.

**In plain English:** Your code is spelled correctly, but it's asking the computer to do something impossible.

**Examples of runtime errors:**

```javascript
// Trying to read a property on null
let user = null
console.log(user.name)  // ❌ TypeError: Cannot read property 'name' of null

// Array index out of bounds
const colors = ["red", "blue", "green"]
console.log(colors[10])  // Returns: undefined (or crashes in some contexts)

// Calling a method that doesn't exist
const number = 42
number.toUpperCase()  // ❌ TypeError: number.toUpperCase is not a function
```

**C# Example:**

```csharp
// Trying to query a null database context
DbContext db = null;
var employees = db.Employees.ToList();  // ❌ NullReferenceException: Object reference not set to an instance of an object

// File doesn't exist
string content = File.ReadAllText("nonexistent.txt");  // ❌ FileNotFoundException
```

**How you'll know:** Your program starts, but then **crashes** with an error message in the console. The error tells you the type (NullReferenceException, TypeError, etc.), the message, and the line where it occurred.

**The fix:** Look at the stack trace (the list of function calls that led to the error). Trace backward to find where the null value came from, or where the wrong type was used.

---

### 3. Logic Errors — The Hardest Kind

**Logic errors** occur when your code runs without crashing, but produces the **wrong result**. The computer did exactly what you asked—you just asked for the wrong thing.

**In plain English:** Your code is correct, but your thinking was wrong.

**Examples of logic errors:**

```javascript
// Calculate annual salary (but forgot to multiply by 12)
function calculateAnnualSalary(monthlySalary) {
    return monthlySalary  // ❌ Should be: monthlySalary * 12
}
calculateAnnualSalary(5000)  // Returns: 5000 (wrong! Should be 60000)

// Check if a date is in the future (but used the wrong comparison)
function isInFuture(date) {
    return new Date() < date  // ✅ Correct
    // But if you wrote: return new Date() > date  // ❌ Logic error!
}

// Filter active employees (but left out the condition)
const activeEmployees = employees.filter(emp => emp.status === "active")  // ✅ Correct
// But if you wrote: const activeEmployees = employees.filter(emp => true)  // ❌ Returns ALL employees!
```

**C# Example:**

```csharp
// Calculate average salary (but forgot to divide)
public decimal GetAverageSalary(List<Employee> employees) {
    decimal total = 0;
    foreach (var emp in employees) {
        total += emp.Salary;
    }
    return total;  // ❌ Logic error! Should be: return total / employees.Count;
}
```

**How you'll know:** The program runs fine, but the output is wrong. You might not notice immediately. You might see it when testing, or even in production (very bad).

**The fix:** This is the hardest kind to fix because the computer won't tell you what's wrong. *You* have to realize the logic is flawed. This is why unit tests are so important—they catch logic errors automatically.

---

## Part 2: The Developer's Mindset — Think Like a Detective 🔍

Debugging is detective work. When something goes wrong, you follow clues, form hypotheses, and test them. Here's the systematic approach:

### The Six-Step Debugging Process

#### **Step 1: Observe the Symptom**

What is the **actual, wrong behavior** you're seeing?

```
❌ Bad observation: "It's broken"
✅ Good observation: "When I click the Submit button, the form disappears but no data is saved to the database"
```

Be specific. Write down:
- What did you do?
- What did you expect to happen?
- What actually happened instead?

**In plain English:** You're a detective at a crime scene. Don't say "something happened." Say "the vase is broken, and there's a muddy footprint on the table."

---

#### **Step 2: Read the Error Message Fully**

Don't panic when you see an error. Error messages are **gifts**—they're your code telling you exactly what went wrong.

**What to look for in an error message:**

```
TypeError: Cannot read property 'name' of undefined
    at getUserName (app.js:42:5)
    at renderUser (app.js:55:10)
```

- **Error type:** `TypeError` — what kind of problem is it?
- **Message:** `Cannot read property 'name' of undefined` — what specifically failed?
- **File and line:** `app.js:42:5` — exactly where did it happen?
- **Stack trace:** The chain of function calls that led to the error.

**In plain English:** The error message is like a breadcrumb trail. Follow it backward to find the root cause.

---

#### **Step 3: Isolate the Layer**

Full-stack applications have three layers:
- **Frontend** (the browser, React)
- **Backend** (the server, ASP.NET Core)
- **Database** (PostgreSQL)

Where does the problem actually live?

**Ask these questions:**

- Is the error in the browser console? → **Frontend problem**
- Is the error in the terminal where the backend is running? → **Backend problem**
- Are requests reaching the backend at all? → Check the Network tab in DevTools
- Is the data in the database correct? → **Database problem**

**Example:**

```
Symptom: "When I submit the form, nothing happens"

❌ First assumption: "The button code is broken"
✅ Better investigation:
   1. Check the browser console for errors
   2. Check the Network tab to see if a request was even sent
   3. If a request was sent, check the backend terminal for errors
   4. If the backend processed it, check the database to see if data was saved
```

---

#### **Step 4: Form a Hypothesis**

Based on your investigation, make an educated guess about what's wrong.

```
✅ Good hypothesis: "The problem is that the API endpoint returns a 401 (Unauthorized) error, which means the JWT token is missing or expired."

❌ Bad hypothesis: "Something is broken"
```

Write it down. Be specific.

---

#### **Step 5: Test the Hypothesis**

Make **one small change** to test your hypothesis. Then run the code again and see if it fixes the problem.

```
Hypothesis: "The backend isn't running on the right port"
Test: "I'll check if http://localhost:5107 is reachable"
Result: "No response. The backend isn't running. Let me start it."
```

**Important:** Only change **one thing** at a time. If you change three things and it works, you won't know which change fixed it.

---

#### **Step 6: Document the Fix**

Once you fix the bug, **write it down** in your `troubleshooting.md` file. Future-you (or a teammate) will thank you.

**Format:**

```markdown
## Error: Login button doesn't work

**Where it happened:** HRIS frontend, login page

**Cause:** JWT token was expired. The backend was returning a 401 Unauthorized response, but the frontend wasn't checking for it.

**Fix:** Added a check in the frontend to catch 401 responses and redirect to the login page. Also added a token refresh endpoint in the backend.

**How to prevent:** Always handle 401 responses in API calls, and refresh tokens before they expire.
```

---

## Part 3: Frontend Debugging Tools

Your browser is your best friend for debugging frontend issues. Here are the tools at your disposal:

### The Browser Console

Press **F12** to open Developer Tools, then click the **Console** tab. This is where all your `console.log()` outputs appear, along with errors and warnings.

**console.log() — Print messages to the console**

```javascript
const user = { name: "Patrick", age: 25 }
console.log(user)  // Output: { name: "Patrick", age: 25 }
console.log("User name:", user.name)  // Output: User name: Patrick
```

**console.warn() — Print warnings (yellow text)**

```javascript
if (user.age < 18) {
    console.warn("User is under 18. Some features may be restricted.")
}
```

**console.error() — Print errors (red text)**

```javascript
if (!apiKey) {
    console.error("API key is missing! The app won't work without it.")
}
```

**console.table() — Display objects as a table**

```javascript
const employees = [
    { id: 1, name: "Alice", role: "Manager" },
    { id: 2, name: "Bob", role: "Developer" },
    { id: 3, name: "Charlie", role: "Designer" }
]
console.table(employees)
// Output: A beautiful table with 3 rows and 3 columns
```

**In plain English:** `console.log()` is your conversation with the code. You're asking: "Hey code, what's your value right now?"

---

### Breakpoints — Pause and Inspect

Open the **Sources** tab in DevTools. You can click on a line number to set a **breakpoint**—this pauses the code at that exact line so you can inspect variables.

**How to use breakpoints:**

1. Open DevTools (F12)
2. Click the **Sources** tab
3. Find the file you want to debug (e.g., `App.jsx`)
4. Click on a line number to set a breakpoint
5. Do the action that triggers that code
6. The code pauses at your breakpoint
7. Inspect variables in the right panel

**Why this is powerful:** You can see exactly what values variables have at that moment, and step through the code line-by-line.

---

### React DevTools Extension

If you're debugging React, install the **React DevTools Extension** (available for Chrome and Firefox). This shows you:

- The component tree (which components are rendering)
- The props passed to each component
- The state of each component
- Which components are re-rendering (and why)

**In plain English:** React DevTools is like an X-ray machine for your React app. You can see the inner structure.

---

### React Error Boundaries

An **Error Boundary** is a special React component that catches errors in its child components and displays a fallback UI instead of crashing the whole app.

```javascript
import { Component } from 'react'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by boundary:", error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong. Please refresh the page.</h1>
        }
        return this.props.children
    }
}

export default ErrorBoundary
```

**How to use it:**

```javascript
<ErrorBoundary>
    <UserProfile />  {/* If this component crashes, the boundary catches it */}
</ErrorBoundary>
```

---

## Part 4: Backend Debugging Tools

Backend errors are trickier because you can't see them in a browser. You need to read logs and understand stack traces.

### Reading Stack Traces

When your backend crashes, you get a **stack trace**—a list of function calls that led to the error.

**Example stack trace:**

```
System.NullReferenceException: Object reference not set to an instance of an object.
   at HRIS.Services.EmployeeService.GetEmployeeById(Int32 id) in C:\project\Services\EmployeeService.cs:line 45
   at HRIS.Controllers.EmployeesController.Get(Int32 id) in C:\project\Controllers\EmployeesController.cs:line 30
   at lambda_method(Closure , Object , Object[] )
   at Microsoft.AspNetCore.Mvc.Infrastructure.ActionMethodExecutor.TaskOfActionResultExecutor.Execute(IActionInvoker invoker, Object receiver, Object[] arguments, Object state)
```

**How to read it (from bottom to top):**

1. The request came in to `EmployeesController.Get()` at line 30
2. That called `EmployeeService.GetEmployeeById()` at line 45
3. At line 45, something was null when it shouldn't have been

**In plain English:** The stack trace is a breadcrumb trail backward through your code. Follow it from bottom to top to find the source.

---

### Structured Logging with Serilog

The HRIS project uses **Serilog**, a professional logging library. Instead of just printing text, Serilog logs *structured* information that you can search and filter.

**In Program.cs, you might see:**

```csharp
builder.Host.UseSerilog((context, loggerConfig) => {
    loggerConfig
        .WriteTo.Console()
        .WriteTo.File("logs/app-.txt", rollingInterval: RollingInterval.Day);
});
```

**What logs look like:**

```
[10:45:23 INF] Application started
[10:45:25 INF] User 'patrick' logged in
[10:45:30 WRN] API call took 5000ms (slower than expected)
[10:45:35 ERR] Database connection failed: Connection timeout
```

**Log levels:**
- `INF` — Information (normal operations)
- `WRN` — Warnings (something unexpected, but recoverable)
- `ERR` — Errors (something failed)
- `DBG` — Debug (detailed information for developers)

---

### try-catch Blocks in C#

Use `try-catch` to handle expected errors gracefully:

```csharp
public async Task<IActionResult> GetEmployee(int id) {
    try {
        var employee = await _employeeService.GetEmployeeById(id);
        if (employee == null) {
            return NotFound("Employee not found");
        }
        return Ok(employee);
    }
    catch (Exception ex) {
        _logger.LogError(ex, "Error retrieving employee {EmployeeId}", id);
        return StatusCode(500, "Internal server error");
    }
}
```

**In plain English:** "Try to do this. If something goes wrong, catch the error and handle it gracefully."

---

### Global Exception Handling Middleware

In ASP.NET Core, you can set up **middleware** in `Program.cs` that catches *all* unhandled errors:

```csharp
app.UseExceptionHandler(errorApp => {
    errorApp.Run(async context => {
        var exception = context.Features.Get<IExceptionHandlerPathFeature>()?.Error;
        
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = 500;
        
        await context.Response.WriteAsJsonAsync(new {
            message = "An unexpected error occurred",
            details = exception?.Message  // Don't show full stack trace in production!
        });
    });
});
```

**Why this matters:**
- **Development:** You want to see full error details for debugging
- **Production:** You want to hide error details from users (security risk)

```csharp
if (app.Environment.IsDevelopment()) {
    app.UseDeveloperExceptionPage();  // Show detailed errors
}
else {
    app.UseExceptionHandler("/error");  // Show generic error page
}
```

---

### ProblemDetails — Standard Error Responses

Modern APIs return errors in a standard format called **ProblemDetails** (RFC 7807):

```json
{
    "type": "https://api.example.com/errors/not-found",
    "title": "Not Found",
    "status": 404,
    "detail": "Employee with ID 99 was not found",
    "instance": "/employees/99"
}
```

ASP.NET Core can generate this automatically:

```csharp
return Problem(
    detail: "Employee not found",
    statusCode: 404,
    title: "Not Found"
);
```

---

## Part 5: Common Full-Stack Issues & Solutions

Here are the most common errors you'll encounter and how to fix them:

### 1. CORS Error — The Backend is Blocking the Frontend

**Symptom:**
```
Access to XMLHttpRequest at 'http://localhost:5107/api/employees' from origin 'http://localhost:5173' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

**What it means:** The frontend (on port 5173) is trying to call the backend (on port 5107), but the backend isn't allowing cross-origin requests.

**The fix in Program.cs:**

```csharp
var builder = WebApplicationBuilder.CreateBuilder(args);

// Configure CORS
builder.Services.AddCors(options => {
    options.AddPolicy("AllowFrontend", policy => {
        policy
            .WithOrigins("http://localhost:5173")  // Allow frontend
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();
app.UseCors("AllowFrontend");  // Apply the CORS policy

app.MapControllers();
app.Run();
```

---

### 2. 401 Unauthorized — Invalid or Missing Token

**Symptom:**
```
Response: 401 Unauthorized
```

**What it means:** The backend rejected the request because you're not authenticated. Your JWT token is missing, expired, or invalid.

**Causes:**
- You didn't include the token in the request header
- The token expired
- The token was signed with a different secret key

**The fix (frontend):**

```javascript
const response = await fetch('http://localhost:5107/api/employees', {
    headers: {
        'Authorization': `Bearer ${token}`  // Include the token
    }
})
```

**Or if the token is expired, refresh it:**

```javascript
if (response.status === 401) {
    // Token is expired, refresh it
    const newToken = await refreshToken();
    // Retry the request with the new token
}
```

---

### 3. 404 Not Found — Wrong URL or Backend Not Running

**Symptom:**
```
Response: 404 Not Found
```

**What it means:** The server doesn't recognize the endpoint you're trying to call. Either:
- You have the wrong URL
- The backend isn't running
- The endpoint was deleted

**The fix:**

1. Check the endpoint URL: is it `/api/employees` or `/employees`?
2. Make sure the backend is running: `dotnet watch run`
3. Check Swagger to see all available endpoints: `http://localhost:5107/swagger`

---

### 4. 500 Internal Server Error — Something Crashed on the Backend

**Symptom:**
```
Response: 500 Internal Server Error
```

**What it means:** The backend received your request and tried to process it, but something crashed.

**The fix:**

1. Look at the backend terminal for error messages
2. Read the stack trace to find where the crash happened
3. Check if a required resource (database, external API) is available

---

### 5. ERR_CONNECTION_REFUSED — Backend Isn't Running

**Symptom:**
```
net::ERR_CONNECTION_REFUSED
```

**What it means:** The frontend tried to reach the backend, but the backend isn't listening on that port. The backend isn't running.

**The fix:**
1. Start the backend: `dotnet watch run` in the backend folder
2. Verify it's running on the correct port (usually `http://localhost:5107`)
3. Check your frontend's API URL configuration

---

## Part 6: The troubleshooting.md File

Professional developers keep a personal journal of bugs they've encountered and how they fixed them. This is your **troubleshooting.md** file.

**Template:**

```markdown
# My Troubleshooting Journal

## Error: [Brief description]

**Where it happened:** 
[File name, component name, or endpoint]

**Symptom:**
[What did you observe?]

**Cause:**
[Why did it happen?]

**Fix:**
[What did you do to solve it?]

**How to prevent:**
[What will you do next time?]

---

## Error: [Next bug]
...
```

**Example entry:**

```markdown
## Error: Login button doesn't send request

**Where it happened:** 
Frontend, LoginPage.jsx, onClick handler

**Symptom:**
When I click the login button, nothing happens. The browser console shows no errors.

**Cause:**
The button's onClick handler was calling `handleLogin()`, but that function wasn't checking if the username and password were provided. The form was sending empty values to the backend.

**Fix:**
Added validation before sending the request:
```javascript
if (!username || !password) {
    console.error("Username and password are required");
    return;
}
```
Then tested the login again and it worked.

**How to prevent:**
Always validate form inputs before sending them to the backend. Use React form libraries like react-hook-form to make validation easier.
```

---

## 🎯 Practice Activities

### Activity 1: Create Your troubleshooting.md

In your `PRACTICE/` folder, create a file called `troubleshooting.md`. Write a template with the sections shown above.

Then, fill in the very first entry: the 404 error you saw in Lesson 1.1 when you visited `http://localhost:5107` without anything running.

**What to write:**
```markdown
## Error: 404 Not Found when visiting backend URL

**Where it happened:** 
Browser, when visiting http://localhost:5107

**Symptom:**
I got a "Cannot GET /" error, or the page was blank

**Cause:**
The backend server was running, but I was visiting the root URL `/` instead of an actual endpoint like `/api/employees`

**Fix:**
Visited `/swagger` instead to see the API documentation, or visited a real endpoint like `/api/employees`

**How to prevent:**
Always check the Swagger documentation to see what endpoints are available
```

---

### Activity 2: Frontend Debugging — Console Inspection

1. Open your HRIS frontend in the browser
2. Press **F12** to open DevTools
3. Go to the **Console** tab
4. Look for any warnings or errors
5. Screenshot what you see (or write down the messages)
6. Try to interpret at least one message: What does it mean? Where is it coming from?

---

### Activity 3: Simulate a Runtime Error

In your browser console (F12 → Console), type this:

```javascript
null.toString()
```

You'll get an error. Read it carefully:
- What is the error type?
- What does the message say?
- Write it down in your `troubleshooting.md` and explain what it means

---

### Activity 4: Backend Error Hunt

1. Start your HRIS backend (if not already running)
2. Look at the terminal where the backend is running
3. Find a log line tagged `[WRN]` (warning) or `[ERR]` (error)
4. Copy that line and write it in your `troubleshooting.md`
5. Research what it means and write your interpretation

---

### Activity 5: Research CORS Errors

1. Look up "CORS error" on Google or MDN
2. Write in your `web-notes.md`:
   - What causes a CORS error?
   - What does "Cross-Origin" mean?
   - How is it fixed in ASP.NET Core? (Hint: look for `AddCors` in your backend's `Program.cs`)

---

### Activity 6: Break It on Purpose

1. Open your HRIS frontend in the browser
2. Open DevTools (F12 → Network tab)
3. Find where your frontend configures the backend API URL (look for `http://localhost:5107`)
4. Temporarily change it to a wrong port, like `http://localhost:5999`
5. Try to use the app (e.g., load the employee list)
6. Look at the Network tab — what error do you see?
7. Look at the Console tab — what error message appears?
8. Write down what you see in your `troubleshooting.md`
9. **Fix it back** to the correct port so the app works again

---

## 🎓 Key Takeaways

✅ **Syntax errors** are caught before your code runs. Fix them by reading the error message.

✅ **Runtime errors** happen during execution. Use console logs and stack traces to find them.

✅ **Logic errors** are the hardest. Your code runs fine but produces the wrong result. Unit tests catch these.

✅ **Follow the six-step debugging process:** Observe → Read error → Isolate → Hypothesize → Test → Document

✅ **Use the browser Console** to inspect variables with `console.log()`

✅ **Use breakpoints** (in the Sources tab) to pause code and inspect state

✅ **Read stack traces from bottom to top** to trace errors backward

✅ **CORS errors** happen when frontend and backend are on different origins. Fix with `AddCors`

✅ **401 errors** mean your token is missing or invalid. Include it in the `Authorization` header

✅ **404 errors** mean the endpoint doesn't exist or the backend isn't running

✅ **500 errors** mean something crashed on the backend. Check the terminal logs

✅ **Keep a `troubleshooting.md`** to document bugs and their fixes

---

## 📚 What's Next?

Once you complete these activities, you'll have powerful debugging skills. You can now:
- Read and understand error messages
- Use professional debugging tools
- Trace errors back to their source
- Document solutions for future reference

In Unit 2, we'll learn **HTML** — the foundation of every webpage. You'll build static pages, tables, and forms. But you'll already have the skills to debug when something goes wrong!

See you there! 🚀
