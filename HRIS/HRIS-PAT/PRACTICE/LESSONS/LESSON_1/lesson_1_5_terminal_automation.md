# Chapter 1: The Invisible World of the Web

## Lesson 1.5: Terminal Automation with PowerShell — Writing Scripts That Do the Work For You

Imagine you walk into your office every morning and need to:
1. Brew a cup of coffee
2. Open your laptop
3. Navigate to three different folders
4. Start three different programs
5. Open your email

Every single day, the same steps. Repeating the same actions manually is not just tedious—it's a waste of time that could be spent actually building things. What if instead, you pressed a single button and **all of those steps happened automatically?** That is what a script does. A script is your personal assistant that handles the boring, repetitive work so you can focus on creative problem-solving.

---

## Part 1: Understanding Scripts and Automation

### 1. What is a Script?

A **script** is a file containing a series of commands that a computer can execute automatically, one after another. Instead of you typing commands manually into a terminal, you write them once in a file, and then you can run that entire sequence with a single command.

**In plain English:** A script is a list of instructions for your computer. You write it once, and you can run it a thousand times without typing anything.

**Example of a manual workflow:**
```
Step 1: Type: cd C:\Users\HP\Documents\PRACTICE_PROG\HRIS\HRIS-PAT\backend
Step 2: Type: dotnet watch run
Step 3: Switch to another terminal window
Step 4: Type: cd C:\Users\HP\Documents\PRACTICE_PROG\HRIS\HRIS-PAT\hris
Step 5: Type: npm run dev
Step 6: Wait for both to start
```

**With a script, you just type:**
```
.\start-hris.ps1
```

And everything happens automatically.

---

### 2. Why Use Scripts?

**Consistency:** When you automate a process, it always runs the same way. No forgotten steps, no typos, no "wait, what was I supposed to do next?"

**Speed:** Starting your entire development environment takes seconds instead of five minutes of typing.

**Error Prevention:** Humans make mistakes. Scripts don't. If a command is correct the first time, it will be correct every time.

**Documentation:** A script is documentation. Reading `start-hris.ps1` tells future developers exactly what commands are needed to start the HRIS application.

---

### 3. What is PowerShell?

**PowerShell** is Microsoft's scripting language and command-line shell for Windows. Think of it as an evolved version of the ancient DOS prompt. While `cmd.exe` was basic and limited, PowerShell is powerful, modern, and designed for automation.

**Why PowerShell instead of Git Bash?**
- PowerShell is native to Windows and deeply integrated with the operating system
- It has superior scripting capabilities (`if/else`, loops, variables, functions)
- It can interact with Windows system features that Git Bash cannot
- Professional Windows development almost always uses PowerShell

**On other systems:**
- **macOS/Linux:** You would use Bash instead of PowerShell
- **Windows Subsystem for Linux (WSL):** You can use either PowerShell or Bash
- **HRIS Project:** We use PowerShell for setup automation on Windows

---

## Part 2: PowerShell Fundamentals

### 4. Variables — Storing Information

In PowerShell, variables store information that you might need later. Unlike JavaScript or C# where you declare a type (`string`, `int`), PowerShell variables are **loosely typed**—they can hold any kind of data.

**Declaring a variable in PowerShell:**

All variables in PowerShell start with a `$` symbol. The `$` tells PowerShell "this is a variable, not a plain word."

```powershell
$projectName = "HRIS"
$developmentPort = 5107
$isProduction = $false
$teamMembers = @("Patrick", "Alice", "Bob")  # This is an array
```

**Reading a variable:**

To use the value stored in a variable, you also prefix it with `$`.

```powershell
Write-Host "Welcome to $projectName"  # This outputs: Welcome to HRIS
Write-Host "The backend runs on port $developmentPort"  # The backend runs on port 5107
```

**In plain English:** A variable is a labeled box. You put information inside the box (using `=`), and later you can take that information out by using the variable name again.

---

### 5. The Core Commands: Your PowerShell Toolkit

#### **Write-Host: Speaking to the User**

`Write-Host` is how you print text to the console. Whenever you want your script to tell the user what's happening, you use `Write-Host`.

```powershell
Write-Host "Starting the HRIS application..."
Write-Host "Backend is running on port 5107"
```

**Output:**
```
Starting the HRIS application...
Backend is running on port 5107
```

**With colors (for emphasis):**

```powershell
Write-Host "Success!" -ForegroundColor Green
Write-Host "Error occurred!" -ForegroundColor Red
Write-Host "Warning: Check your connection." -ForegroundColor Yellow
```

---

#### **Set-Location: Navigating Folders**

`Set-Location` is the PowerShell equivalent of the `cd` command you learned in Git Bash. It changes your current working directory.

```powershell
Set-Location "C:\Users\HP\Documents\PRACTICE_PROG\HRIS\HRIS-PAT\backend"
# You are now inside the backend folder
```

**Shorter syntax:**

PowerShell allows abbreviations for common commands:

```powershell
cd "C:\Users\HP\Documents\PRACTICE_PROG\HRIS\HRIS-PAT\backend"
# This is the same as Set-Location
```

**Relative paths:**

You can also use relative paths if you're already in a parent directory:

```powershell
cd backend  # Go into the backend folder (relative)
cd ..       # Go up one level to the parent folder
cd .        # Current folder (useful in some contexts)
```

---

#### **Start-Process: Opening Programs**

`Start-Process` is how you launch new programs from within a script. This is especially powerful because you can start multiple programs at once.

**Basic syntax:**

```powershell
Start-Process -FilePath "notepad.exe"
# This opens Notepad
```

**Starting a program in a new terminal window:**

This is important for running the backend and frontend simultaneously:

```powershell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; dotnet watch run"
# This opens a new PowerShell window, navigates to backend, and runs dotnet watch run
```

**Breaking it down:**
- `-FilePath "powershell"` — Open PowerShell
- `-ArgumentList` — Pass arguments to PowerShell
- `"-NoExit"` — Keep the window open after the command finishes
- `"-Command", "..."` — The command to run in that new window

---

### 6. Control Flow: Making Decisions (if/else)

Sometimes you want your script to behave differently based on conditions. For example, "If the backend folder exists, run it. Otherwise, print an error message."

**The if/else structure:**

```powershell
if (condition) {
    # Code that runs if the condition is TRUE
} else {
    # Code that runs if the condition is FALSE
}
```

**Real example:**

```powershell
$backendPath = "C:\Users\HP\Documents\PRACTICE_PROG\HRIS\HRIS-PAT\backend"

if (Test-Path $backendPath) {
    Write-Host "Backend folder found! Starting development server..." -ForegroundColor Green
    Set-Location $backendPath
    dotnet watch run
} else {
    Write-Host "ERROR: Backend folder not found at $backendPath" -ForegroundColor Red
    Write-Host "Please check the path and try again."
}
```

**Common conditions:**

- `Test-Path $path` — Does a file or folder exist?
- `$variable -eq "value"` — Does the variable equal this value?
- `$number -gt 100` — Is the number greater than 100?
- `$number -lt 100` — Is the number less than 100?
- `$status -ne "running"` — Is the status NOT equal to "running"?

**With multiple conditions:**

```powershell
if ($isDeveloper -eq $true -and $hasGitInstalled -eq $true) {
    Write-Host "You're all set!"
} elseif ($isDeveloper -eq $true -and $hasGitInstalled -eq $false) {
    Write-Host "You need to install Git."
} else {
    Write-Host "This script is for developers only."
}
```

---

## Part 3: Reading and Writing Scripts

### 7. Execution Policies: Permission to Run Scripts

PowerShell has a security feature called **Execution Policies**. By default, Windows prevents unsigned scripts from running to protect against malicious code.

When you try to run a `.ps1` file for the first time, you might see:

```
PS C:\> .\hello.ps1
.\hello.ps1 : File ... cannot be loaded because running scripts is disabled on this system.
```

**The solution:**

You have a few options:

**Option 1: Set the policy to RemoteSigned (Recommended)**

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

This means: "Allow locally created scripts to run, but downloaded scripts must be signed."

**Option 2: Bypass for a single script**

```powershell
PowerShell -ExecutionPolicy Bypass -File ".\hello.ps1"
```

This runs the script without changing the system-wide policy.

**In plain English:** Execution policies are like a lock on your computer. You need permission to run scripts. You can either change the lock (Option 1) or use a master key for just one script (Option 2).

---

### 8. Reading and Understanding Existing Scripts

When you encounter a script you didn't write, how do you understand it?

**Example: Looking at a setup script**

```powershell
# ======================
# HRIS Development Setup
# ======================

Write-Host "Setting up HRIS development environment..." -ForegroundColor Cyan

# Navigate to backend folder
Set-Location "backend"
Write-Host "Running backend setup..." -ForegroundColor Yellow

# Check if dotnet is installed
if (!(Get-Command dotnet -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: .NET SDK is not installed!" -ForegroundColor Red
    exit  # Stop the script
}

# Install backend dependencies
dotnet restore
Write-Host "Backend setup complete!" -ForegroundColor Green

# Navigate to frontend folder
Set-Location "..\hris"
Write-Host "Running frontend setup..." -ForegroundColor Yellow

# Install frontend dependencies
npm install
Write-Host "Frontend setup complete!" -ForegroundColor Green

Write-Host "All done! You can now run the application." -ForegroundColor Cyan
```

**How to read this script like an English sentence:**

1. **Line 1-3:** Comments explaining what the script does
2. **Line 6:** Print a greeting to the user
3. **Line 9:** Navigate to the backend folder
4. **Line 10:** Tell the user what we're doing
5. **Line 13-17:** Check if .NET is installed; if not, print an error and stop
6. **Line 20:** Install backend dependencies (like npm install)
7. **Line 21:** Celebrate the success
8. **Line 24-25:** Navigate to frontend and print status
9. **Line 28:** Install frontend dependencies
10. **Line 29:** Celebrate
11. **Line 31:** Final message to the user

**Key takeaway:** Scripts are stories. Read them from top to bottom. Look for comments (lines starting with `#`) to understand the intent. Watch for conditions (`if` statements) that might skip certain parts.

---

### 9. Comments: Documenting Your Script

Comments are lines of text that PowerShell **ignores**. They're for humans to read. Always comment your scripts!

```powershell
# This is a single-line comment

<#
This is a multi-line comment.
It can span several lines.
Use this when you have a lot to explain.
#>

# Navigate to the backend folder (This comment explains WHY we're doing this)
Set-Location "backend"
```

---

## Part 4: Building Real Automation Scripts

### 10. Writing Your First Real Script: start-hris.ps1

Now let's write a practical script that starts both the backend and frontend of the HRIS application.

**What we want to accomplish:**
1. Print a message to the user
2. Open a new PowerShell window and start the backend (`dotnet watch run`)
3. Open a new PowerShell window and start the frontend (`npm run dev`)
4. Print a completion message

**The complete script:**

```powershell
# =====================================
# HRIS Development Environment Starter
# =====================================
# This script starts both the backend and frontend servers
# Place this file in the HRIS-PAT root folder and run: .\start-hris.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting HRIS Development Environment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Define paths
$rootPath = Get-Location
$backendPath = Join-Path $rootPath "backend"
$frontendPath = Join-Path $rootPath "hris"

# Check if paths exist
if (!(Test-Path $backendPath)) {
    Write-Host "ERROR: Backend folder not found at $backendPath" -ForegroundColor Red
    exit
}

if (!(Test-Path $frontendPath)) {
    Write-Host "ERROR: Frontend folder not found at $frontendPath" -ForegroundColor Red
    exit
}

# Start Backend in a new window
Write-Host "Starting Backend on port 5107..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; dotnet watch run"

# Start Frontend in a new window
Write-Host "Starting Frontend on port 5173..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; npm run dev"

Write-Host ""
Write-Host "✅ Both servers are starting in new windows!" -ForegroundColor Green
Write-Host "Backend:  http://localhost:5107" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host "Note: Close the terminal windows to stop the servers." -ForegroundColor Cyan
```

**Breaking this down in plain English:**

- **Lines 1-8:** Comments and greeting. We tell the user what's happening.
- **Lines 11-12:** We store the current folder location and build paths to backend and frontend folders.
- **Lines 15-24:** We check if those folders exist. If not, we print an error and `exit` (stop the script).
- **Lines 27-28:** We open a new PowerShell window. Inside that window, we navigate to the backend folder and run `dotnet watch run`.
- **Lines 31-32:** We open another new PowerShell window. Inside that window, we navigate to the frontend folder and run `npm run dev`.
- **Lines 34-40:** We print success messages showing the user the URLs where the servers are running.

---

### 11. Advanced Techniques: Waiting and Checking Status

Sometimes you want your script to wait for something to complete before moving on.

```powershell
Write-Host "Backend is starting. Waiting for it to be ready (10 seconds)..." -ForegroundColor Yellow
Start-Sleep -Seconds 10  # Pause for 10 seconds

Write-Host "Now starting frontend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd hris; npm run dev"
```

**Or, you might want to run commands in sequence (not in parallel):**

```powershell
# Start backend and WAIT for it to exit before continuing
$backendProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; dotnet watch run" -PassThru
$backendProcess.WaitForExit()  # Script pauses here until the backend window closes

Write-Host "Backend stopped. Cleaning up..." -ForegroundColor Yellow
```

---

## Part 5: Best Practices for Scripts

### 12. Guidelines for Writing Good Scripts

**1. Always use comments:**
```powershell
# Good: Explains the WHY
# We check if the backend folder exists to provide a clear error message to the user
if (!(Test-Path $backendPath)) { ... }

# Bad: No explanation
if (!(Test-Path $backendPath)) { ... }
```

**2. Use descriptive variable names:**
```powershell
# Good
$developmentBackendPort = 5107

# Bad
$p = 5107
```

**3. Provide user feedback:**
```powershell
# Good: User knows what's happening
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install
Write-Host "Dependencies installed successfully!" -ForegroundColor Green

# Bad: Silent, confusing
npm install
```

**4. Handle errors gracefully:**
```powershell
# Good: Tell the user what went wrong
if (!(Test-Path $backendPath)) {
    Write-Host "ERROR: Backend folder not found!" -ForegroundColor Red
    Write-Host "Expected location: $backendPath" -ForegroundColor Red
    exit
}

# Bad: Script crashes with no explanation
Set-Location $backendPath  # Script crashes if this path doesn't exist
```

**5. Make scripts idempotent (safe to run multiple times):**

If your script deletes something, make sure it checks if it exists first. If it creates a folder, make sure it doesn't error if the folder already exists.

---

## 🎯 Practice Activities

Now it's time to get hands-on. Complete these activities in order.

### Activity 1: Your First PowerShell Script

Create a file called `hello.ps1` in your `PRACTICE/` folder:

```powershell
# My first PowerShell script
Write-Host "Hello, Patrick! Ready to code?" -ForegroundColor Green
```

Save it, then run it:

```powershell
cd C:\Users\HP\Documents\PRACTICE_PROG\HRIS\HRIS-PAT\PRACTICE
.\hello.ps1
```

**Expected output:**
```
Hello, Patrick! Ready to code?
```

If you get an execution policy error, run this first:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

### Activity 2: Understanding Execution Policies

Research execution policies by running:

```powershell
Get-ExecutionPolicy
```

This tells you the current policy. Write down what you see in your `web-notes.md`, along with a simple explanation of what execution policies do.

---

### Activity 3: Variables and Decisions

Create a script called `morning-setup.ps1`:

```powershell
# Morning developer setup script

$isDeveloper = $true
$projectName = "HRIS"
$backendPort = 5107

if ($isDeveloper) {
    Write-Host "Good morning, developer!" -ForegroundColor Cyan
    Write-Host "Setting up $projectName on port $backendPort" -ForegroundColor Yellow
} else {
    Write-Host "This script is for developers only." -ForegroundColor Red
}
```

Run it and observe the output.

---

### Activity 4: Analyzing an Existing Script

Look at the `setup-frontend.ps1` or `setup-backend.ps1` script in your HRIS-PAT project (if they exist). Pick ONE command or section from it and write in your notes:

1. What does this line do?
2. Why do you think it's there?
3. What happens if you remove it?

---

### Activity 5: Writing start-hris.ps1

Write a script called `start-hris.ps1` in your HRIS-PAT root folder. This script should:

1. Print a welcome message in green
2. Start the backend with `dotnet watch run` in a new window
3. Start the frontend with `npm run dev` in a new window
4. Print completion messages with the URLs (http://localhost:5107 and http://localhost:5173)

**Hint:** Use `Start-Process powershell -ArgumentList "-NoExit", "-Command", "..."` to open new windows.

Test it by running:
```powershell
cd C:\Users\HP\Documents\PRACTICE_PROG\HRIS\HRIS-PAT
.\start-hris.ps1
```

You should see both development servers start automatically!

---

## 🎓 Key Takeaways

✅ **Scripts automate repetitive tasks**, saving time and preventing human error.

✅ **PowerShell is the modern scripting language for Windows development.**

✅ **Variables store information** using the `$` prefix.

✅ **Write-Host prints messages** to tell the user what's happening.

✅ **Set-Location and cd** navigate between folders.

✅ **Start-Process launches new programs**, allowing you to start multiple servers at once.

✅ **if/else statements** let scripts make decisions based on conditions.

✅ **Comments explain the WHY**, making scripts maintainable.

✅ **Execution policies are security features** that you can adjust when needed.

✅ **Good scripts are readable, well-commented, and provide user feedback.**

---

## 📚 What's Next?

Once you complete these activities, you'll have a powerful skill: **automation**. You can now:
- Write scripts to set up development environments
- Automate repetitive tasks
- Create personal tools that boost your productivity

In Lesson 1.6, we'll learn **debugging and error handling**—the detective work that turns broken code into working code. See you there!
