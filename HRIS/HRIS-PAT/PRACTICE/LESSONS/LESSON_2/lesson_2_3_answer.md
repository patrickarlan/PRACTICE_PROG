# Lesson 2.3: HTML Forms — Answer Sheet

---

## Activity 1: Create `login.html`

**Checklist:**
- [x] Created `login.html` file in `PRACTICE/html/` (combined into `login_registration.html`)
- [x] Proper HTML5 structure (`<!DOCTYPE>`, `<html>`, `<head>`, `<body>`)
- [x] Has a heading: "Login" (or similar)
- [x] `<form>` element with `action` and `method` attributes
- [x] Email input field with `<label>`
- [x] Password input field with `<label>`
- [x] Submit button
- [x] All inputs have `id` and `name` attributes
- [x] All labels use `for` attribute matching input `id`

**Notes:**
(Add any notes about this activity)

---

## Activity 2: Create `registration.html`

**Checklist:**
- [x] Created `registration.html` file in `PRACTICE/html/` (combined into `login_registration.html`)
- [x] Proper HTML5 structure
- [x] Has a heading: "Registration" (or similar)
- [x] `<form>` element with `action` and `method` attributes
- [x] Full Name field (text input)
- [x] Email field (email input)
- [x] Password field (password input)
- [x] Department field (dropdown select)
- [x] Position field (text input)
- [x] All inputs have `id` and `name` attributes
- [x] All labels use `for` attribute matching input `id`

**Notes:**
(Add any notes about this activity)

---

## Activity 3: Add Labels Everywhere

**Checklist:**
- [x] All input fields in `login.html` have labels
- [x] All input fields in `registration.html` have labels
- [x] Every `<label>` has a `for` attribute
- [x] Every input has a matching `id` attribute
- [x] Label text clearly describes what the input is for

**Example Check:**
```html
<label for="email">Email:</label>
<input type="email" id="email" name="email">
```

**Notes:**
(Add any notes about this activity)

---

## Activity 4: Add Checkbox

**Checklist:**
- [x] Checkbox added to `registration.html`
- [x] Checkbox text: "I agree to the terms and conditions"
- [x] Checkbox has `id` attribute
- [x] Checkbox has `name` attribute
- [x] Label is properly paired with checkbox using `for`
- [x] Checkbox displays and is clickable in browser

**Notes:**
(Add any notes about this activity)

---

## Activity 5: Add Radio Buttons

**Checklist:**
- [x] Two radio buttons added to `registration.html`
- [x] First radio button: Employee (value="employee")
- [x] Second radio button: Admin (value="admin")
- [x] Both radio buttons have same `name` attribute
- [x] Both radio buttons have different `value` attributes
- [x] Both radio buttons have `id` attributes
- [x] Labels are properly paired with each radio button using `for`
- [x] Only ONE radio button can be selected at a time
- [x] Radio buttons display correctly in browser

**Notes:**
(Add any notes about this activity)

---

## Activity 6: Compare with Real HRIS

**Checklist:**
- [x] Opened HRIS frontend at `http://localhost:5173`
- [x] Found and viewed the login page
- [x] Compared layout and structure to your `login.html`
- [x] Identified at least 3 differences
- [x] Wrote observations in the section below

**Observations - Differences Between Your Login & Real HRIS:**

**Difference 1:**
(What do you see in the real HRIS that you don't have in yours?)
My Login form is static and doesn't send any data on any servers/database yet. I also noticed that the design of my HRIS is more advance than my newly created since they are for practice.
---

**Difference 2:**
(What other difference did you notice?)
I also noticed that HRIS is more responsive and have more animations like carousel.
---

**Difference 3:**
(What else is different?)
My Forms are more  simple than the HRIS because it have other frameworks to work with. Unlike mine, i just depend on using HTML and STYLES for design
---

## Reflection Questions

Answer these based on what you learned in Lesson 2.3:

### **1. What is the difference between `<input type="text">` and `<textarea>`?**

Your Answer:
- `type="text"` is more of a text field that users can't expand its size visually but can input characters depending on its set limits
- `textarea` is like text input but more flexible because it can be resize via its expandable mover.

---

### **2. Why do we use the `name` attribute in form inputs? What happens if we don't include it?**

Your Answer:
- we use `name` because its what we use to be able to communicate with the backend. it is useful for accessibility and communication inside the project.

---

### **3. What's the difference between `<input type="checkbox">` and `<input type="radio">`?**

Your Answer:
- `radio` is more of a one-option selection for user. they can't choose different radio buttons since it is by default prohibited.
- `checkbox` can be multiple selection that users can use. this can be use on to-do lists and other related things.

---

### **4. Why is the `<label>` tag important? Can't we just write text next to the input?**

Your Answer:
- `label` is important because it is an attribute that can be controlled by the system. Without it, text labels cannot be access by users to design and put functions for them.

---

### **5. When would you use `method="GET"` vs `method="POST"` in a form?**

Your Answer:
**[CORRECT with minor clarification]** You described POST correctly (updating data). Here's the complete picture:
- `GET` = fetching/retrieving data (search forms, employee list filters) — data visible in URL
- `POST` = submitting/changing data (login, registration, updating employee) — data hidden in request body

Your login form should use `POST` ✓ (not GET, because passwords must never appear in URLs)
---

---

## ✅ Overall Completion Checklist

Review all activities before moving to Lesson 2.4:

**Activities 1-5 (Hands-on):**
- [x] Activity 1: `login.html` created with proper structure
- [x] Activity 2: `registration.html` created with all required fields
- [x] Activity 3: All inputs have labels with proper `for` and `id` attributes
- [x] Activity 4: Checkbox added to registration form
- [x] Activity 5: Two radio buttons added for employee/admin roles

**Activity 6 (Comparison):**
- [x] HRIS login page compared to your `login.html`
- [x] At least 3 differences documented

**Reflection:**
- [x] All 5 reflection questions answered
- [x] Answers show understanding of form concepts

**Overall:**
- [x] Both `login.html` and `registration.html` created (combined into `login_registration.html`)
- [x] All files saved in correct locations
- [x] Code is properly formatted and indented
- [x] Forms tested in browser and display correctly
- [x] Ready to move to Lesson 2.4 (Semantic HTML)
