# Chapter 3: Styling the Web with CSS

## Lesson 3.4: Interactive UI — Forms, States & Animations

So far, your layouts look good but feel "dead." A real app like HRIS needs to feel alive and responsive to the user's actions.

In this lesson, you'll learn how CSS handles **UI states** (hover, focus, disabled) and **micro-animations** (smooth transitions). These are the small details that separate a beginner's project from a professional-looking app.

---

## Part 1: CSS Pseudo-Classes — Styling "Moments"

A **pseudo-class** is a special keyword you add to a CSS selector that targets an element at a specific *moment* or *state*. Think of it like saying: "Style this button, but ONLY when the user is hovering over it."

The format is always: `selector:state { rules }`

### The 4 States You Must Know

| State | What it means | When it fires |
|---|---|---|
| `:hover` | Mouse is over the element | User moves their cursor on top |
| `:focus` | Element is actively selected | User clicks an input or tabs into it |
| `:disabled` | Element is locked/inactive | When `disabled` attribute is set in HTML |
| `:active` | Element is being clicked | The exact moment the mouse button is pressed down |

#### Example — Button Hover:
```css
.btn {
    background: #5e90c8;
    color: white;
    padding: 10px 24px;
    border: none;
    cursor: pointer;
}

/* Change background ONLY when mouse is on top */
.btn:hover {
    background: #3a6ea5;
}
```

#### Example — Input Focus Glow:
```css
.form-input {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
    outline: none; /* Remove the ugly browser default outline */
}

/* Add a blue glow ONLY when the user clicks into the input */
.form-input:focus {
    border-color: #5e90c8;
    box-shadow: 0 0 0 3px rgba(94, 144, 200, 0.25);
}
```

---

## Part 2: CSS `transition` — Smooth Animations

Without `transition`, state changes are instant and jarring. With `transition`, they become smooth and feel professional.

The format is: `transition: property duration timing-function;`

```css
.btn {
    background: #5e90c8;
    
    /* "When 'background-color' changes, take 0.2 seconds to do it smoothly" */
    transition: background-color 0.2s ease;
}

.btn:hover {
    background: #3a6ea5; /* This change now animates smoothly! */
}
```

> **Pro Tip:** `ease` means it starts slow, speeds up, then slows down at the end. It looks the most natural. Other options are `linear` (constant speed) and `ease-in-out`.

### You can transition multiple properties:
```css
.btn {
    background: #5e90c8;
    transform: scale(1); /* Normal size */
    transition: background-color 0.2s ease, transform 0.2s ease;
}

.btn:hover {
    background: #3a6ea5;
    transform: scale(1.05); /* Grows 5% bigger on hover! */
}
```

---

## Part 3: CSS `transform` — Moving and Scaling Elements

`transform` lets you move, rotate, and scale elements without affecting the rest of the layout.

The most common transforms:
- `scale(1.05)` — Scale the element to 105% of its normal size
- `translateY(-4px)` — Move the element 4px upward
- `rotate(45deg)` — Rotate the element 45 degrees

These look great combined with `transition`:
```css
.card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
    transform: translateY(-4px); /* Card "lifts" up on hover */
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15); /* Shadow gets bigger as it lifts */
}
```
This is the exact same animation used on the employee cards in the real HRIS app!

---

## Part 4: Accessibility — The Disabled State & Labels

### The Disabled State
When a form is locked (e.g., an employee can't edit an Approved report), you add the `disabled` attribute to the button in HTML. You then style it with CSS to make it visually obvious.

```html
<button class="btn" disabled>Submit</button>
```

```css
.btn:disabled {
    opacity: 0.5;          /* Make it look faded/grayed out */
    cursor: not-allowed;   /* Show the "no" cursor when hovering */
}
```

### The `<label>` Tag (Accessibility 101)
Every single `<input>` in a form MUST have a linked `<label>`. This is not optional in professional development.

**Why?** When a user clicks the label text ("First Name"), the browser automatically focuses the input. Screen readers also use labels to tell visually impaired users what the input is for.

**The Rule:** The `for` attribute on the `<label>` must exactly match the `id` on the `<input>`.

```html
<!-- ✅ Correct: Label is linked to the input -->
<label for="first-name">First Name</label>
<input type="text" id="first-name" name="first-name" />

<!-- ❌ Wrong: No label at all -->
<input type="text" placeholder="First Name" />
```

---

## 📝 Activity: Build the "Edit Employee" Form

Now it's your turn to put all of this together!

1. Create a file called `interactive.html` in your `PRACTICE/html/` folder.
2. Build a simple "Edit Employee" form with these fields:
   - Full Name (text input)
   - Department (text input)
   - A "Save Changes" button
3. Apply the CSS rules from the lesson:
   - Give the inputs a styled border and add a `:focus` glow effect.
   - Give the button a background color and a smooth `:hover` transition.
   - Add a `transform: translateY(-2px)` on button hover to make it "lift".
   - Add a second button called "Locked" and give it the `disabled` attribute. Style `:disabled` so it looks faded and shows `cursor: not-allowed`.
4. Make sure EVERY input has a properly linked `<label>`.

---

**Next Steps:** Open `lesson_3_4_answer.md`, paste your code, and answer the reflection questions. Then let me know when you're done so I can review it!
