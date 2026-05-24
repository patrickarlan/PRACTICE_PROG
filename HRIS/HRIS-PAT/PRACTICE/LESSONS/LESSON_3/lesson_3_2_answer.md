## 🎯 Lesson 3.2: CSS Flexbox & Layout — Answer Template

Complete each activity below and write your answers in the spaces provided.

---

## Activity 1: Your First Flexbox Row

Create a `flexbox.html` with 3 colored boxes side by side using Flexbox.

**Your HTML structure:**

```html
<!-- Paste your HTML here -->

```

**Your CSS:**

```css
/* Paste your CSS here */

```

**Test checklist:**
- [ ] 3 boxes are side by side in a row
- [ ] Text is centered inside each box
- [ ] There is a gap between the boxes

**What did you observe?**
___________

---

## Activity 2: Centering — The Classic Challenge

Center a card both horizontally AND vertically on the screen.

**Your CSS for `.centering-demo`:**

```css
/* Paste your centering CSS here */

```

**Answer these questions:**
1. What property centers items horizontally (on the main axis)?
   > ___________

2. What property centers items vertically (on the cross axis)?
   > ___________

3. Why does the container need a defined `height` for vertical centering to work?
   > ___________

**Test checklist:**
- [ ] Card is horizontally centered
- [ ] Card is vertically centered
- [ ] Container has a defined height

---

## Activity 3: Build a Navigation Bar

Build a nav bar with logo on the left and 3 links on the right.

**Your HTML:**

```html
<!-- Paste your navbar HTML here -->

```

**Your CSS:**

```css
/* Paste your navbar CSS here */

```

**Answer this question:**

Why did you use `justify-content: space-between` instead of `justify-content: center`?
> ___________

**Test checklist:**
- [ ] Logo is on the far left
- [ ] Links are on the far right
- [ ] Everything is vertically centered
- [ ] Links have a gap between them
- [ ] Hover effect works on links

---

## Activity 4: Switch to `column` Direction

Switch the box layout from row to column.

**Your CSS change:**

```css
/* Show the flex-direction: column container here */

```

**In your own words — what did changing `flex-direction` to `column` do?**
> ___________

**What is the difference between `justify-content` and `align-items` when `flex-direction` is `column`?**
> ___________

**Test checklist:**
- [ ] Boxes stack vertically instead of horizontally
- [ ] Boxes are centered horizontally on the page

---

## Activity 5: Wrapping Card Grid

Build a responsive card grid that wraps automatically.

**Your CSS:**

```css
/* Paste your card grid CSS here */

```

**Answer these questions:**

1. What does `flex-wrap: wrap` do?
   > ___________

2. What does `flex: 1 1 220px` mean? (Explain each number)
   > ___________
   > - `1` (flex-grow): ___________
   > - `1` (flex-shrink): ___________
   > - `220px` (flex-basis): ___________

3. When you resized the browser, what happened to the cards?
   > ___________

**Test checklist:**
- [ ] Cards display in a row
- [ ] Cards wrap to the next line on a narrow screen
- [ ] Gap is visible between cards
- [ ] Cards have styling (border, padding, radius)

---

## Activity 6: Sidebar Layout

Build a full-page sidebar + main content layout.

**Your CSS:**

```css
/* Paste your layout CSS here */

```

**Answer these questions:**

1. What does `flex: 0 0 220px` mean on the sidebar?
   > ___________

2. What does `flex: 1` mean on the main content area?
   > ___________

3. Why did you need `min-height: 100vh` on the layout container?
   > ___________

**Test checklist:**
- [ ] Sidebar is fixed at 220px wide
- [ ] Content area fills all remaining space
- [ ] Both sections fill the full page height
- [ ] Sidebar has dark background, content has light background
- [ ] Sidebar links stack vertically

---

## Activity 7: Inspect HRIS for Flexbox

Open HRIS at `http://localhost:5173` and use DevTools to find real Flexbox usage.

**Where did you find Flexbox? (List at least 2 places)**

1. Location: ___________
   - `justify-content` value seen: ___________
   - `align-items` value seen: ___________

2. Location: ___________
   - `justify-content` value seen: ___________
   - `align-items` value seen: ___________

**Did you see a `gap` property anywhere?**
> ___________

**What was the most interesting use of Flexbox you found?**
> ___________

---

## Activity 8: Build the HRIS Employee Card Row (Challenge)

Build a row of employee cards with semantic HTML and Flexbox layout.

**Your HTML:**

```html
<!-- Paste your card row HTML here -->

```

**Your CSS:**

```css
/* Paste your card CSS here */

```

**Explain these decisions:**

1. Why did you use `flex-direction: column` on `.emp-card`?
   > ___________

2. What trick did you use to push the footer to the bottom of every card even if the card content is different heights?
   > ___________

3. How did you put the name and badge on the same line in `.emp-card__header`?
   > ___________

**Test checklist:**
- [ ] Cards are in a row with a gap
- [ ] Header shows name + badge side by side
- [ ] Body content fills the middle
- [ ] Footer buttons are side by side at the bottom
- [ ] All cards have the same height regardless of content

---

## 📊 Reflection Questions

Answer these based on what YOU learned:

1. **What is the difference between `justify-content` and `align-items`?**
   > ___________

2. **When would you use `flex-direction: column` instead of `row`?**
   > ___________

3. **What problem does `flex-wrap: wrap` solve?**
   > ___________

4. **What is the "holy trinity" for perfectly centering an element?**
   > 1. `___________`
   > 2. `___________`
   > 3. `___________`

5. **What is the difference between `flex: 1` and `flex: 0 0 220px`? When would you use each?**
   > ___________

6. **Before Flexbox existed, what did developers use to lay things out? (Bonus — research this!)**
   > ___________

---

## 📊 Final Score: ___/20

**Summary:**
- [ ] All activities completed
- [ ] `flexbox.html` working in browser
- [ ] Reflection questions answered
- [ ] HRIS inspection done

**Ready for:** Lesson 3.3 (CSS Grid — Two-Dimensional Layouts)

---

**Next:** Complete all activities, open them in your browser, then submit for review.
