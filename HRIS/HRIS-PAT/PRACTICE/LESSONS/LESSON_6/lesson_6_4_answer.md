# Lesson 6.4: Data Transfer Objects (DTOs) — The Secure Messengers

## 🧪 Test Checklist

- [ ] Created `EmployeeResponseDto` (no sensitive fields)
- [ ] Created `CreateEmployeeRequestDto` and `UpdateEmployeeRequestDto` (no `Id`, with validation)
- [ ] Service maps Model ↔ DTO using one `MapToDto` helper and `.Select()`
- [ ] Controller POST and PUT accept the Request DTOs
- [ ] Verified in Swagger that `Salary` never appears in responses
- [ ] Verified that invalid input returns 400 and extra fields are ignored
- [ ] Compared a real HRIS DTO against its Model
- [ ] Answered the "Check Your Understanding" questions

---

## ✅ Check Your Understanding

1. Three reasons we don't return the raw model:
2. Why the Create request DTO has no `Id`:
3. What over-posting is, and how a Request DTO prevents it:
4. Where mapping happens (Controller or Service) and why:
5. What happens when `{ "name": "Al" }` is sent:

---

## 💻 Activity Notes & Answers

### Tasks 1 & 2: The DTOs
```csharp
// Paste your DTO classes here
```

### Task 3: Mapping in the Service
```csharp
// Paste MapToDto and your .Select() code here
```

### Task 5: Swagger Verification
- Is `Salary` missing from responses?
- Does the POST schema show `Id` or `Salary`?
- Status code and message for `{ "name": "Al", ... }`:
- Was the extra `salary` ignored when posting `{ "name": "Dana", ..., "salary": 999999 }`?

### Task 6: Real-World Check
- **DTO chosen:**
- **Matching Model:**
- **Fields missing from the DTO:**
- **Why were they left out?**
- **A validation attribute I found and what it enforces:**

---

## 📊 Final Score: ___/10

**Summary:**
- [ ] Activities reviewed
- [ ] Understood Request DTO vs Response DTO, validation, and mapping
- [ ] Unit 6 complete
