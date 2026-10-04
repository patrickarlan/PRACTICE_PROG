# Lesson 6.3: The Service Pattern — The Brain of the Backend

## 🧪 Test Checklist

- [ ] Created `IEmployeeService` interface
- [ ] Created `EmployeeService` implementing it, with the logic moved out of the controller
- [ ] Registered the service in `Program.cs`
- [ ] Injected the service into the controller via the constructor (`private readonly`)
- [ ] All endpoints still work after the refactor, and duplicates return 400
- [ ] Ran the lifetime experiment and explained the result
- [ ] Triggered the "unable to resolve service" error and explained it
- [ ] Compared my service with the HRIS-PAT one

---

## ✅ Check Your Understanding

1. Why a Service shouldn't return `Ok()` or `NotFound()`:
2. What the DI container does for a constructor parameter:
3. The error from a missing registration, and what it means:
4. Why the practice service is Singleton but HRIS-PAT's are Scoped:

---

## 💻 Activity Notes & Answers

### Tasks 1 & 2: Interface and Service
```csharp
// Paste IEmployeeService and EmployeeService here
```

### Task 3: Registration line
```csharp
// Paste your registration line here
```

### Task 4: Controller constructor
```csharp
// Paste your controller constructor here
```

### Task 5: Verification
- Did every endpoint behave the same as before?
- Status code and message for a duplicate name:

### Task 6: Lifetime Experiment
- With `AddScoped`, after POST then GET, the new employee:
- With `AddSingleton`, after POST then GET, the new employee:
- Why:

### Task 7: Break It On Purpose
- Error message:
- What it means:

### Task 8: Comparison with HRIS-PAT
1. 
2. 

---

## 📊 Final Score: ___/10

**Summary:**
- [ ] Activities reviewed
- [ ] Understood interface, service, dependency injection, and lifetimes
