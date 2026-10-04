# Chapter 7: Database & Entity Framework Core

## Lesson 7.1: PostgreSQL & The .env File (Connecting to the Vault)

Welcome to **Unit 7**! Up until now, your practice backend stored data inside a temporary in-memory list (`List<Employee>`). 

The moment you restart your server or turn off your computer, **all in-memory data vanishes**. 

In the real world, user accounts, payroll records, and accomplishment reports must be saved permanently. **PostgreSQL** is the database engine that stores this data, and **Connection Strings + `.env` files** are how our backend securely unlocks the database vault.

> **Reading note:** You can read and understand this entire lesson away from your computer. Only the activities at the end require coding.

**By the end of this lesson you will be able to:**
* Explain what a relational database (PostgreSQL) is and how it differs from in-memory lists.
* Dissect every component of a database **Connection String**.
* Explain what a **`.env`** file is, why it must NEVER be committed to Git, and how `.env.example` works.
* Load and read environment variables in ASP.NET Core using **`DotNetEnv`**.

---

## Part 1: In-Memory vs Database Storage

```
IN-MEMORY STORAGE (Unit 6)                  DATABASE STORAGE (Unit 7+)
┌────────────────────────────────┐         ┌────────────────────────────────┐
│      ASP.NET Core Server       │         │      ASP.NET Core Server       │
│                                │         │                                │
│   List<Employee> _employees    │         │   Sends SQL queries via        │
│   (Lives inside RAM memory)    │         │   Connection String            │
└───────────────┬────────────────┘         └───────────────┬────────────────┘
                │ Server stops                             │ Saves to disk
                ▼                                          ▼
       💥 ALL DATA LOST!                   ┌────────────────────────────────┐
                                           │      PostgreSQL Database       │
                                           │  (Permanent storage on disk)   │
                                           │                                │
                                           │  Tables survive restarts,      │
                                           │  crashes, and server reboots!  │
                                           └────────────────────────────────┘
```

* **RAM (In-Memory)** is blazing fast, but volatile (erased on shutdown).
* **PostgreSQL (Database)** writes data directly to physical disk storage in structured tables with relations, indexes, and ACID guarantees (data safety).

---

## Part 2: What is PostgreSQL & pgAdmin?

* **PostgreSQL ("Postgres")**: A free, open-source, enterprise-grade **Relational Database Management System (RDBMS)**. It runs as a background service on your machine (default port `5432`).
* **pgAdmin**: The official desktop graphical user interface (GUI) for PostgreSQL. It lets you click through databases, view table rows, inspect columns, and run SQL queries visually without using a command line.

```
       pgAdmin 4 (Desktop GUI)
                 │
                 │ You inspect tables & run queries visually
                 ▼
       PostgreSQL Service (localhost:5432)
                 ▲
                 │ Your backend connects & executes queries automatically
                 │
       ASP.NET Core API (localhost:5107)
```

---

## Part 3: The Anatomy of a Connection String

To connect to a database, your application needs an **address, a username, and a password**. This information is packaged into a single string called a **Connection String**.

Here is what the real connection string looks like in `HRIS-PAT`:

```
Host=localhost;Port=5432;Database=hris_practice;Username=postgres;Password=yourpassword
```

### Dissecting the 5 Essential Parts:

```
┌──────────────┬─────────────────────────┬───────────────────────────────────────────┐
│ Component    │ Example                 │ Plain-English Job                         │
├──────────────┼─────────────────────────┼───────────────────────────────────────────┤
│ Host         │ Host=localhost          │ Where the database lives.                 │
│              │                         │ (localhost = this computer; or an IP)     │
├──────────────┼─────────────────────────┼───────────────────────────────────────────┤
│ Port         │ Port=5432               │ The door number. PostgreSQL's default     │
│              │                         │ networking port is 5432.                  │
├──────────────┼─────────────────────────┼───────────────────────────────────────────┤
│ Database     │ Database=hris_practice  │ The specific database catalog name.       │
│              │                         │ One Postgres server can hold many DBs.    │
├──────────────┼─────────────────────────┼───────────────────────────────────────────┤
│ Username     │ Username=postgres       │ The login account name (default superuser │
│              │                         │ in PostgreSQL is "postgres").             │
├──────────────┼─────────────────────────┼───────────────────────────────────────────┤
│ Password     │ Password=yourpassword   │ The secret master key set during Postgres │
│              │                         │ installation.                             │
└──────────────┴─────────────────────────┴───────────────────────────────────────────┘
```

> **Memory Trick:** Think of it like sending mail to an apartment:  
> `Host` = Street address &bull; `Port` = Gate number &bull; `Database` = Apartment # &bull; `Username` + `Password` = Keycard to open the door.

---

## Part 4: Why Secrets Belong in `.env` (Never in Git!)

### The Catastrophic Mistake
Imagine you hardcode your connection string directly inside `Program.cs`:

```csharp
// ❌ HORRIBLE MISTAKE! DO NOT DO THIS!
var connectionString = "Host=localhost;Database=hris;Username=postgres;Password=SuperSecretPassword123";
```

You type `git commit` and `git push` to GitHub.
Now **your database password is published on the internet for everyone to see!** Automated hacker bots scan GitHub public commits every second searching for leaked database passwords.

---

### The Solution: The `.env` File & `.gitignore`

We store all sensitive credentials in a plain-text file named **`.env`** (short for *environment*).

```
# .env (Lives ONLY on your local machine)
DB_CONNECTION_STRING="Host=localhost;Port=5432;Database=hris_practice;Username=postgres;Password=MySecretPassword"
JWT_SECRET_KEY="ThisIsASuperSecretKeyThatShouldNeverBeLeaked123!"
```

Then, in your **`.gitignore`** file:
```gitignore
# Tell Git to NEVER upload this file to GitHub:
.env
*.env
```

### What is `.env.example`?
Since `.env` is ignored by Git, another developer downloading your repo won't know what environment variables your app requires!

So we commit a safe template file named **`.env.example`** with fake dummy values:

```
# .env.example (Safe to push to GitHub!)
DB_CONNECTION_STRING="Host=localhost;Port=5432;Database=hris_db;Username=postgres;Password=YOUR_PASSWORD_HERE"
```

When a new teammate clones the repo, they simply copy `.env.example`, rename it to `.env`, and fill in their personal local password!

---

## Part 5: Reading `.env` in ASP.NET Core with `DotNetEnv`

By default, .NET reads configuration from `appsettings.json`. However, enterprise microservices and modern Docker stacks use `.env` files. 

In `HRIS-PAT`, we use the battle-tested library **`DotNetEnv`**.

### Snippet 1: Loading the `.env` at Application Startup

Open `HRIS-PAT/backend/Program.cs` and look at lines 2 and 27–28:

```csharp
using DotNetEnv;

// 1. Parse and load the .env file into the system environment:
Env.Load();

// 2. Read the variable safely from memory:
var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");

if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("DB_CONNECTION_STRING is missing in .env!");
}
```

#### 🔍 What is happening here? (Line-by-Line Breakdown)

| Line of Code | Plain-English Explanation |
| :--- | :--- |
| `using DotNetEnv;` | Imports the DotNetEnv namespace (installed via NuGet package `DotNetEnv`). |
| `Env.Load();` | Tells the program: *"Search the current folder for a `.env` file, read all `KEY=VALUE` pairs, and inject them into system memory."* |
| `Environment.GetEnvironmentVariable(...)` | Standard .NET method to retrieve an environment variable by name. |
| `if (string.IsNullOrEmpty(...))` | **Fail-fast defensive check**: If the developer forgot to create their `.env` file, stop the app immediately with a helpful error message instead of crashing silently later. |

---

## 🏁 Lesson Summary & Key Takeaways (Cheat Sheet)

### 1. In-Memory vs. Database
* **In-Memory (`List<T>`)**: Temporary RAM storage; erased whenever the app stops or restarts.
* **Database (PostgreSQL)**: Permanent disk storage; handles high volume, concurrent users, and data relations safely.

### 2. Connection String Anatomy
* Format: `Host=...;Port=5432;Database=...;Username=...;Password=...`
* Defines **where** the database is located and **who** is allowed to log in.

### 3. The Rules of Environment Variables
* **Rule #1**: NEVER hardcode connection strings or passwords in C# files.
* **Rule #2**: Put secrets in `.env` and ensure `.env` is listed inside `.gitignore`.
* **Rule #3**: Provide a dummy `.env.example` in GitHub so other developers know what variables to configure.

### 4. How .NET Loads `.env`
* Package: `DotNetEnv`
* Ignition: Call `Env.Load();` at the very top of `Program.cs`.
* Retrieval: `Environment.GetEnvironmentVariable("KEY_NAME");`.

### 5. What's Next
In **Lesson 7.2**, you will connect Entity Framework Core (EF Core) to this database connection, write your first **Migration**, and watch C# automatically create tables in PostgreSQL!

---

## ✅ Check Your Understanding

Answer these in your own words in `lesson_7_1_answer.md`:

1. What happens to data stored in a `List<Employee>` when you restart the backend?
2. What are the 5 parts of a PostgreSQL connection string, and what does each part specify?
3. Why is it dangerous to commit a `.env` file to a public GitHub repository?
4. What is the purpose of a `.env.example` file?
5. What line of code in `Program.cs` triggers `DotNetEnv` to read the `.env` file?

---

## 📝 Activities: Set Up Your Practice Database

> Perform these tasks inside `PRACTICE/backend/PracticeApi/`.

### Task 1: Verify PostgreSQL & Create Database
1. Open **pgAdmin 4** on your machine and log in with your master PostgreSQL password.
2. Under "Servers" &rarr; "PostgreSQL", right click on **Databases** &rarr; **Create** &rarr; **Database...**
3. Name the database **`hris_practice`** and click **Save**.

### Task 2: Create `.env` and `.env.example`
1. Inside `PRACTICE/backend/PracticeApi/`, create a new file named `.env`.
2. Add your connection string (replace `YOUR_PASSWORD` with your actual Postgres password):
   ```env
   DB_CONNECTION_STRING="Host=localhost;Port=5432;Database=hris_practice;Username=postgres;Password=YOUR_PASSWORD"
   ```
3. Create a second file named `.env.example` with the password placeholder left blank.
4. Verify your `.gitignore` includes `.env`.

### Task 3: Install `DotNetEnv` & Load in `Program.cs`
1. In your terminal inside `PRACTICE/backend/PracticeApi/`, install the package:
   ```bash
   dotnet add package DotNetEnv
   ```
2. At the very top of `Program.cs`, add:
   ```csharp
   using DotNetEnv;

   Env.Load();
   ```
3. Read the variable and print a safe confirmation message to the terminal on startup:
   ```csharp
   var connStr = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
   Console.WriteLine(string.IsNullOrEmpty(connStr) 
       ? "❌ Failed to load DB_CONNECTION_STRING!" 
       : "✅ Successfully loaded DB_CONNECTION_STRING from .env!");
   ```
4. Run `dotnet run` and verify you see the green success message in your terminal!

---

## 🧪 Test Checklist

Keep track of your answers in `lesson_7_1_answer.md`:

- [ ] Created database `hris_practice` in pgAdmin
- [ ] Created `.env` with real credentials and `.env.example` with dummy placeholders
- [ ] Confirmed `.env` is ignored by `.gitignore`
- [ ] Installed NuGet package `DotNetEnv`
- [ ] Loaded environment variables via `Env.Load()` in `Program.cs`
- [ ] Successfully printed connection string confirmation to console on startup
- [ ] Answered the "Check Your Understanding" questions
