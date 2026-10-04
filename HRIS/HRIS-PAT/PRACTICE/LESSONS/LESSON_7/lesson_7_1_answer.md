# Lesson 7.1: PostgreSQL & The .env File (Connecting to the Vault)

## 🧪 Test Checklist

- [ ] Created database `hris_practice` in pgAdmin
- [ ] Created `.env` with real credentials and `.env.example` with dummy placeholders
- [ ] Confirmed `.env` is ignored by `.gitignore`
- [ ] Installed NuGet package `DotNetEnv`
- [ ] Loaded environment variables via `Env.Load()` in `Program.cs`
- [ ] Successfully printed connection string confirmation to console on startup
- [ ] Answered the "Check Your Understanding" questions

---

## ✅ Check Your Understanding

1. What happens to data stored in a `List<Employee>` when you restart the backend?
2. What are the 5 parts of a PostgreSQL connection string, and what does each part specify?
3. Why is it dangerous to commit a `.env` file to a public GitHub repository?
4. What is the purpose of a `.env.example` file?
5. What line of code in `Program.cs` triggers `DotNetEnv` to read the `.env` file?

---

## 💻 Activity Notes & Answers

### Task 1: Database in pgAdmin
- Database Name created: 
- Host & Port verified: 

### Task 2: `.env` and `.env.example`
- Show your safe `.env.example` contents (with dummy values):
```env
// Paste .env.example contents here
```
- Is `.env` listed in `.gitignore`? (Yes/No):

### Task 3: `DotNetEnv` Setup & Startup Log
- NuGet installation command used:
- Code snippet from `Program.cs` loading `Env.Load()`:
```csharp
// Paste snippet here
```
- Console output text when running `dotnet run`:

---

## 📊 Final Score: ___/10

**Summary:**
- [ ] Activities reviewed
- [ ] PostgreSQL connection string mechanics and .env security understood
