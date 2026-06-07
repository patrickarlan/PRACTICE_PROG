# Lesson 3.4: Interactive UI — Activities & Answers

Use this file to record your progress and answers for Lesson 3.4.

---

## 📝 Activity: The "Edit Employee" Form

*(Instructions are in `lesson_3_4_interactive_ui.md`)*

**Your HTML (`interactive.html`):**
```html
<body>
    <div class="container">
        <h1>Edit Employee</h1>
        <form>
            <label for="first-name">First Name</label>
            <input type="text" id="first-name" name="first-name" />
            <label for="department">Department</label>
            <input type="text" id="department" name="department" />
            <button class="btn" type="submit">Save Changes</button>
            <button class="btn2" type="button" disabled>Locked</button>
        </form>
    </div>
</body>
```

**Your CSS:**
```css
<style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }

        .container {
            background-color: #ffffff;
            padding: 40px;
            width: 400px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            text-align: center;
        }

        label {
            display: block;
            margin-bottom: 5px;
        }


        input {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }

        input:focus {
            border-color: #5e90c8;
            box-shadow: 0 0 0 3px rgba(94, 144, 200, 0.25);
        }

        button {
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s ease, color 0.2s ease;
        }

        button:hover {
            transform: translateY(-2px);

        }


        .btn:hover {
            background-color: #5e90c8;
            color: white;
        }


        .btn2:hover:disabled {
            background-color: #6d6e70;
            color: white;
            opacity: 0.5;
            cursor: not-allowed;

        }
    </style>
```

**Test checklist:**
- [x] Every `<input>` has a linked `<label>` (using `for` and `id`)
- [x] Inputs have a visible `:focus` glow effect
- [x] Button has a smooth background color change on `:hover`
- [x] Button "lifts" on `:hover` using `transform: translateY()`
- [x] The "Locked" button shows `cursor: not-allowed` and is faded

---

## 📊 Reflection Questions

1. **What is the difference between `:hover` and `:focus`?**
   > `:hover` is when the mouse cursor is hovering over an element, while `:focus` is when an element has focus, which can happen by clicking on it or tabbing to it.

2. **What does `transition: background-color 0.2s ease;` do in plain English?**
   > It makes the background color change smoothly over 0.2 seconds.

3. **Why must every `<input>` have a linked `<label>`?**
   > It makes the input field more accessible to users who use screen readers or keyboard navigation.

4. **What does `transform: translateY(-4px)` do and why does it look good on hover?**
   > It moves the element 4 pixels upwards on the Y-axis, which makes it look like it's lifting off the page.

---

## 📊 Final Score: ___/10

**Summary:**
- [x] Activity completed (`interactive.html` built)
- [x] All 5 checklist items pass
- [x] Reflection questions answered

**Ready for:** Lesson 3.5 (Tailwind CSS & Production QA)
