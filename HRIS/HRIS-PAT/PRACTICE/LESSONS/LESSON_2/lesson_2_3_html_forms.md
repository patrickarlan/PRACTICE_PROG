# Lesson 2.3: HTML Forms

*Forms are how users interact with websites. They submit data like passwords, emails, selections, and more. Let's learn to build them the RIGHT way.*

---

## Part 1: The `<form>` Element

A **form** is a container that holds input fields and sends data to a server.

### Basic Syntax:
```html
<form action="/submit" method="POST">
    <!-- Input fields go here -->
    <button type="submit">Submit</button>
</form>
```

### Form Attributes:

| Attribute | What It Does | Example |
|-----------|--------------|---------|
| `action` | Where to send the form data | `action="/api/login"` |
| `method` | How to send data: POST or GET | `method="POST"` |
| `name` | Name of the form (for JavaScript) | `name="loginForm"` |

**Key Points:**
- `action="/api/login"` = Send data to the backend at this URL
- `method="POST"` = Secure method (data in body, not visible in URL)
- `method="GET"` = Data visible in URL (use only for searches, not passwords!)
- Every input needs a `<label>` for accessibility

---

## Part 2: Input Types

An **input** is a field where users type or select data.

### Common Input Types:

#### **Text Input**
```html
<input type="text" name="firstName" placeholder="Enter your first name">
```
- `name` = how the backend identifies this field
- `placeholder` = hint text that disappears when user types
- Output: Regular text box

---

#### **Password Input**
```html
<input type="password" name="password" placeholder="Enter your password">
```
- Hides what user types (shows dots instead)
- Used for passwords and sensitive data
- Output: Hidden text box (•••••)

---

#### **Email Input**
```html
<input type="email" name="email" placeholder="you@example.com">
```
- Browser validates it looks like an email
- Mobile keyboards show `@` button
- Output: Text box with email validation

---

#### **Number Input**
```html
<input type="number" name="age" min="18" max="120">
```
- Only allows numbers
- `min` and `max` set boundaries
- Output: Text box with up/down arrows

---

#### **Checkbox**
```html
<input type="checkbox" name="terms" id="terms">
<label for="terms">I agree to the terms and conditions</label>
```
- User can check or uncheck
- Multiple checkboxes can be selected
- `id` must match `<label>` `for` attribute
- Output: Checkable box with label

---

#### **Radio Button**
```html
<input type="radio" name="role" value="admin" id="admin">
<label for="admin">Admin</label>

<input type="radio" name="role" value="user" id="user">
<label for="user">User</label>
```
- User can pick ONLY ONE (like multiple choice test)
- All radio buttons with same `name` are grouped
- `value` = what gets sent to backend if selected
- `id` must match `<label>` `for` attribute
- Output: Selectable radio circles

---

#### **Submit Button**
```html
<button type="submit">Submit Form</button>
```
- Sends form data to the backend
- Only works inside a `<form>`
- Output: Clickable button

---

## Part 3: Labels & Form Structure

A **label** is text that describes an input field. ALWAYS pair inputs with labels!

### Right Way (Accessible):
```html
<label for="email">Email Address:</label>
<input type="email" id="email" name="email" placeholder="you@example.com">
```

### Wrong Way (Inaccessible):
```html
Email Address:
<input type="email" name="email" placeholder="you@example.com">
```

**Why Labels Matter:**
- ✅ Screen readers can read them aloud
- ✅ Users can click the label to focus the input
- ✅ Professional and accessible
- ✅ Required for semantic HTML

**Label Attributes:**
- `for="email"` = Links to the input with `id="email"`
- The `for` value MUST match the input's `id`

---

## Part 4: Dropdown (Select) Lists

A **dropdown** lets users pick from a predefined list.

### Syntax:
```html
<label for="department">Department:</label>
<select id="department" name="department">
    <option value="">-- Select a Department --</option>
    <option value="engineering">Engineering</option>
    <option value="sales">Sales</option>
    <option value="hr">Human Resources</option>
    <option value="marketing">Marketing</option>
</select>
```

### Element Breakdown:

| Tag | What It Does |
|-----|--------------|
| `<select>` | Container for the dropdown |
| `<option>` | Each choice in the dropdown |
| `value` | What gets sent to backend when selected |

**Key Points:**
- `<option value="">` = Empty placeholder (good practice)
- Each `<option>` needs a `value` (what backend receives)
- The text inside `<option>` is what users see
- Output: Dropdown menu

---

## Part 5: Text Areas

A **textarea** is a multi-line text input (for longer text like comments or messages).

### Syntax:
```html
<label for="bio">Tell us about yourself:</label>
<textarea id="bio" name="bio" rows="5" cols="40" placeholder="Enter your bio here..."></textarea>
```

### Textarea Attributes:

| Attribute | What It Does |
|-----------|--------------|
| `rows` | Height (number of visible lines) |
| `cols` | Width (number of visible characters) |
| `placeholder` | Hint text |

**Key Points:**
- `rows="5"` = Shows 5 lines of text
- Users can type multiple paragraphs
- Usually resizable by user
- Output: Large text box

---

## Part 6: The `name` Attribute — Why It Matters

The `name` attribute tells the backend **what each field represents**.

### Example:
```html
<form action="/api/login" method="POST">
    <input type="email" name="email">
    <input type="password" name="password">
    <button type="submit">Login</button>
</form>
```

When submitted, the backend receives:
```json
{
  "email": "patrick@example.com",
  "password": "mypassword123"
}
```

**The `name` attribute values (`email`, `password`) become the JSON keys!**

If you forgot the `name` attribute:
```html
<input type="email">  <!-- ❌ NO NAME! Won't send to backend -->
```

**Rule:** Every input needs a `name` so it can be sent to the backend! ✅

---

## Part 7: Complete Form Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HRIS Login</title>
    <style>
        form {
            max-width: 400px;
            margin: 50px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        
        label {
            display: block;
            margin-top: 10px;
            font-weight: bold;
        }
        
        input, select, textarea {
            width: 100%;
            padding: 8px;
            margin-top: 5px;
            border: 1px solid #ddd;
            border-radius: 3px;
            font-size: 14px;
        }
        
        button {
            width: 100%;
            padding: 10px;
            margin-top: 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 16px;
        }
        
        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <h1>HRIS Login</h1>
    
    <form action="/api/login" method="POST">
        <!-- Email Field -->
        <label for="email">Email Address:</label>
        <input type="email" id="email" name="email" placeholder="you@example.com" required>
        
        <!-- Password Field -->
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" required>
        
        <!-- Remember Me Checkbox -->
        <label for="rememberMe">
            <input type="checkbox" id="rememberMe" name="rememberMe">
            Remember me
        </label>
        
        <!-- Role Radio Buttons -->
        <fieldset>
            <legend>Login as:</legend>
            <input type="radio" id="employee" name="role" value="employee" checked>
            <label for="employee">Employee</label>
            
            <input type="radio" id="admin" name="role" value="admin">
            <label for="admin">Admin</label>
        </fieldset>
        
        <!-- Submit Button -->
        <button type="submit">Login</button>
    </form>
</body>
</html>
```

---

## 📋 Quick Reference (Cheat Sheet)

### Input Types:
```html
<input type="text" name="firstName">
<input type="email" name="email">
<input type="password" name="password">
<input type="number" name="age" min="18">
<input type="checkbox" id="terms" name="terms">
<input type="radio" name="role" value="admin">
```

### Labels:
```html
<label for="email">Email:</label>
<input type="email" id="email" name="email">
```

### Dropdown:
```html
<select name="department">
    <option value="">-- Select --</option>
    <option value="engineering">Engineering</option>
</select>
```

### Textarea:
```html
<textarea name="bio" rows="5" cols="40"></textarea>
```

### Complete Form:
```html
<form action="/api/submit" method="POST">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    
    <button type="submit">Submit</button>
</form>
```

---

## 📝 Activities

### **Activity 1: Create `login.html`**

Build a login form with:
- **Email field** with `<label>`
- **Password field** with `<label>`
- **Submit button**
- Proper form structure

**Example:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Login</title>
</head>
<body>
    <h1>Login</h1>
    
    <form action="/api/login" method="POST">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="you@example.com">
        
        <label for="password">Password:</label>
        <input type="password" id="password" name="password">
        
        <button type="submit">Login</button>
    </form>
</body>
</html>
```

---

### **Activity 2: Create `registration.html`**

Build a registration form with:
- **Full Name** (text input)
- **Email** (email input)
- **Password** (password input)
- **Department** (dropdown with: Engineering, Sales, HR, Marketing)
- **Position** (text input)

---

### **Activity 3: Add Labels Everywhere**

Make sure EVERY input has a `<label>` with proper `id` and `for` attributes:
```html
<label for="fullName">Full Name:</label>
<input type="text" id="fullName" name="fullName">
```

---

### **Activity 4: Add Checkbox**

In `registration.html`, add a checkbox:
```html
<input type="checkbox" id="terms" name="terms">
<label for="terms">I agree to the terms and conditions</label>
```

---

### **Activity 5: Add Radio Buttons**

In `registration.html`, add two radio buttons for user roles:
```html
<input type="radio" name="role" value="employee" id="employee">
<label for="employee">Employee</label>

<input type="radio" name="role" value="admin" id="admin">
<label for="admin">Admin</label>
```

---

### **Activity 6: Compare with Real HRIS**

1. Open your HRIS frontend in browser: `http://localhost:5173`
2. Go to the login page
3. Compare it to your `login.html`
4. Write down 3 differences (styling, extra fields, layout, etc.)
5. Save your observations in `PRACTICE/LESSONS/LESSON_2/lesson_2_3_answer.md`

---

## ✅ Checklist Before Moving On

- [ ] `login.html` created with email, password, submit button
- [ ] All inputs have `<label>` tags with proper `for` attributes
- [ ] `registration.html` created with Full Name, Email, Password, Department (dropdown), Position
- [ ] Department dropdown has 4 options
- [ ] Checkbox added for terms and conditions
- [ ] Two radio buttons added for Employee/Admin roles
- [ ] All inputs have proper `name` attributes
- [ ] Forms tested in browser and display correctly
- [ ] Activity 6 comparison completed
- [ ] All reflection questions answered

---

## 🎯 Key Takeaways

✅ **`<form>` = container** for collecting user input
✅ **`<input>` = single-line input** (email, text, password, etc.)
✅ **`<textarea>` = multi-line input** (for longer text)
✅ **`<select>` = dropdown list** (choose one from options)
✅ **`<label>` = ALWAYS pair with inputs** (accessibility!)
✅ **`name` attribute = REQUIRED** (sends data to backend)
✅ **`<button type="submit">` = submits form data**
✅ **Proper structure = usable and accessible forms**

---

## Next: Lesson 2.4 — Semantic HTML 🚀

Learn how to use meaningful tags like `<header>`, `<nav>`, `<main>`, `<section>` to structure pages like a pro!
