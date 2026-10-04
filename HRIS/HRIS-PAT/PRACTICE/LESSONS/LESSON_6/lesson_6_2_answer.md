# Lesson 6.2: ASP.NET Core Controllers & Routing

## 🧪 Test Checklist

- [ ] Created a Web API project with controllers and Swagger working
- [ ] `GET /api/employees` returns 3 employees
- [ ] `GET /api/employees/{id}` returns one employee, or 404 for a bad ID
- [ ] `POST /api/employees` adds a new employee and returns 201
- [ ] `PUT` updates an employee, and `DELETE` removes one and returns 204
- [ ] Tested all endpoints in Swagger
- [ ] Answered the "Check Your Understanding" questions

---

## ✅ Check Your Understanding

1. Two things ASP.NET uses to pick the method:
2. Why `NotFound()` instead of `Ok(null)`:
3. `Ok()` vs `CreatedAtAction()` vs `NoContent()`:
4. What `[ApiController]` does on invalid JSON:
5. Why the list is `static`:

---

## 💻 Activity Notes & Answers

### Tasks 1 & 2: Project and Swagger Setup
- Command used:
- URL shown in the terminal:
- Did `/swagger` load?

### Task 3: GET Endpoint
```csharp
// Paste your GetAll() here
```

### Task 4: GET by ID
```csharp
// Paste your GetById() here
```

### Task 5: POST
```csharp
// Paste your Create() here
```

### Task 6: PUT and DELETE
```csharp
// Paste your Update() and Delete() here
```

### Task 7: Swagger Results
| Endpoint | Status code received |
| :--- | :--- |
| GET /api/employees | |
| GET /api/employees/1 | |
| GET /api/employees/999 | |
| POST /api/employees | |
| PUT /api/employees/1 | |
| PUT /api/employees/999 | |
| DELETE /api/employees/1 | |
| DELETE /api/employees/999 | |

---

## 📊 Final Score: ___/10

**Summary:**
- [ ] Activities reviewed
- [ ] Understood Controller, verbs, and response helpers
