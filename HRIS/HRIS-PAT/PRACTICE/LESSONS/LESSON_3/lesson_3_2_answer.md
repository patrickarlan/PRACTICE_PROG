## 🎯 Lesson 3.2: CSS Flexbox & Layout — Answer Template

Complete each activity below and write your answers in the spaces provided.

---

## Activity 1: Your First Flexbox Row

Create a `flexbox.html` with 3 colored boxes side by side using Flexbox.

**Your HTML structure:**

```html
<section class="activity1">
   <section class="box-parent">
      <div class="box-children">
            <div class="box box1">box 1</div>
            <div class="box box2">box 2</div>
            <div class="box box3">box 3</div>
      </div>
   </section>
</section>
```

**Your CSS:**

```css
.box-parent {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .box-children {
        gap: 5px;
        display: flex;
    }

    .box {
        padding: 20px;
        border: 5px solid black;
    }

    .box1 {
        background: red;
    }

    .box2 {
        background: yellow;
    }

    .box3 {
        background: green;
    }

```

**Test checklist:**
- [x] 3 boxes are side by side in a row
- [x] Text is centered inside each box
- [x] There is a gap between the boxes

**What did you observe?**
> I observed that the boxes are side by side in a row and the text is centered inside each box.

---

## Activity 2: Centering — The Classic Challenge

Center a card both horizontally AND vertically on the screen.

**Your CSS for `.centering-demo`:**

```css
.cards-parent {
        width: 100%;
        height: 400px;
        gap: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card-hori {
        width: 200px;
        height: 100px;
        background: black;
    }

    .card-verti {
        width: 100px;
        height: 200px;
        background: black;
    }

    .card-hori,
    .card-verti {
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        border: 5px solid red;
    }

```

**Answer these questions:**
1. What property centers items horizontally (on the main axis)?
   > justify-content

2. What property centers items vertically (on the cross axis)?
   > align-items

3. Why does the container need a defined `height` for vertical centering to work?
   > to have a defined space to center the items within

**Test checklist:**
- [x] Card is horizontally centered
- [x] Card is vertically centered
- [x] Container has a defined height

---

## Activity 3: Build a Navigation Bar

Build a nav bar with logo on the left and 3 links on the right.

**Your HTML:**

```html
<section class="activity3">
    <nav class="nav">
        <h5 class="logo">logo</h5>
        <div class="nav-links">
            <a href='/'>home</a>
            <a href='/'>about</a>
            <a href='/'>contact</a>
        </div>
    </nav>
</section>

```

**Your CSS:**

```css
nav {
        width: 100%;
        background: grey;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
    }

    .nav-links {
        display: flex;
        gap: 24px
    }

    .nav-links a:hover {
        transform: scale(1.03);
        color: black;
    }

    .nav-links a {
        color: white;
        transition: transform 0.3s ease, color 0.3s ease;
        text-decoration: none;
    }

```

**Answer this question:**

Why did you use `justify-content: space-between` instead of `justify-content: center`?
> To have a space between the logo and the links

**Test checklist:**
- [x] Logo is on the far left
- [x] Links are on the far right
- [x] Everything is vertically centered
- [x] Links have a gap between them
- [x] Hover effect works on links

---

## Activity 4: Switch to `column` Direction

Switch the box layout from row to column.

**Your CSS change:**

```css
main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        flex-direction: column;
        gap: 20px;
    }


    /*activity1*/
    .box-parent {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .box-children {
        gap: 5px;
        display: flex;
    }

    .box {
        padding: 20px;
        border: 5px solid black;
    }

    .box1 {
        background: red;
    }

    .box2 {
        background: yellow;
    }

    .box3 {
        background: green;
    }

```

**In your own words — what did changing `flex-direction` to `column` do?**
> It makes the boxes stack vertically instead of horizontally.

**What is the difference between `justify-content` and `align-items` when `flex-direction` is `column`?**
> When `flex-direction` is `column`, `justify-content` aligns items along the column (vertically), and `align-items` aligns items along the row (horizontally).

**Test checklist:**
- [x] Boxes stack vertically instead of horizontally
- [x] Boxes are centered horizontally on the page

---

## Activity 5: Wrapping Card Grid

Build a responsive card grid that wraps automatically.

**Your CSS:**

```css
 .card-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        justify-content: center;
        padding: 20px;
    }

    .card {
        background: grey;
        padding: 10px;
        border-radius: 10px;
        border: 5px solid black;
        flex: 1 1 220px;

    }

```

**Answer these questions:**

1. What does `flex-wrap: wrap` do?
   > It allows the cards to wrap to the next line on a narrow screen

2. What does `flex: 1 1 220px` mean? (Explain each number)
   > flex: 1 1 220px is a shorthand for flex-grow, flex-shrink, and flex-basis
   > - `1` (flex-grow): It allows the cards to grow to fill the available space
   > - `1` (flex-shrink): It allows the cards to shrink to fit within the container
   > - `220px` (flex-basis): It means that the cards will have a basis of 220px

3. When you resized the browser, what happened to the cards?
   > The cards are responsive enough to recognize the browser side and gets to adjust their own size.

**Test checklist:**
- [x] Cards display in a row
- [x] Cards wrap to the next line on a narrow screen
- [x] Gap is visible between cards
- [x] Cards have styling (border, padding, radius)

---

## Activity 6: Sidebar Layout

Build a full-page sidebar + main content layout.

**Your HTML:**

```html
<!--activity6: sidebar layout-->
<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        margin: 0;
    }

    .page-wrapper {
        display: flex;
        flex: 1;
        border-right: 0.5px solid #e5e5e5;
    }

    aside {
        flex: 0 0 220px;
        flex-shrink: 0;
        background: #6a6a6a;
        padding: 24px 16px;
        display: flex;
        flex-direction: column;
        gap: 32px;
        border-right: 0.5px solid #e5e5e5;
    }

    .logo {
        color: whitesmoke;
        font-size: 25px;
        font-weight: 500;
        letter-spacing: -0.3px;
    }

    nav {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .nav-section {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .nav-label {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #f5f4f4;
        padding: 0 8px;
        margin-bottom: 4px;
    }

    .nav-section a {
        font-size: 13px;
        color: #ffffff;
        text-decoration: none;
        padding: 6px 8px;
        border-radius: 6px;
        transition: background 0.15s, color 0.15s;
    }

    .nav-section a:hover {
        background: #fff;
        color: #111;
    }

    main {
        flex: 1;
        padding: 32px;
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    h1 {
        font-size: 18px;
        font-weight: 500;
    }

    .card-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }

    .card {
        flex: 1 1 120px;
        background: #fff;
        border: 0.5px solid #e5e5e5;
        border-radius: 10px;
        padding: 20px 16px;
        font-size: 13px;
        color: #777;
    }

    footer {
        padding: 16px 32px;
        border-top: 0.5px solid #e5e5e5;
        font-size: 12px;
        color: #aaa;
    }
</style>
<html>

<body>
    <div class="page-wrapper">
        <aside>
            <span class="logo">Sidebar</span>
            <nav>
                <div class="nav-section">
                    <span class="nav-label">Navigation</span>
                    <a href="/">Home</a>
                    <a href="/">About Us</a>
                    <a href="/">Contact Us</a>
                </div>

                <div class="nav-section">
                    <span class="nav-label">Options</span>
                    <a href="/">Settings</a>
                    <a href="/">Profile</a>
                </div>
            </nav>
        </aside>

        <main>
            <h1>SAMPLE PAGE WITH SIDEBAR</h1>
            <section class="card-grid">
                <div class="card">Card 1</div>
                <div class="card">Card 2</div>
                <div class="card">Card 3</div>
                <div class="card">Card 4</div>
            </section>
        </main>
    </div>
    <footer>
        <h2>PATRICK @2026</h2>
    </footer>
</body>

</html>

```

**Answer these questions:**

1. What does `flex: 0 0 220px` mean on the sidebar?
   > it keeps off the sidebar from sizing itself. the 0 0 means the grow and shrink must remain 0 and 220px is the basis

2. What does `flex: 1` mean on the main content area?
   > 

3. Why did you need `min-height: 100vh` on the layout container?
   > to set a minimum height that comes from the browser size itself 

**Test checklist:**
- [x] Sidebar is fixed at 220px wide
- [x] Content area fills all remaining space
- [x] Both sections fill the full page height
- [x] Sidebar has dark background, content has light background
- [x] Sidebar links stack vertically

---

## Activity 7: Inspect HRIS for Flexbox

Open HRIS at `http://localhost:3000` and use DevTools to find real Flexbox usage.

**Where did you find Flexbox? (List at least 2 places)**

1. Location: hris: admin dashboard: <header>: flex items-center
   - `justify-content` value seen: center
   - `align-items` value seen: center

2. Location: hris: admin dashboard: <button>: inline-flex
   - `justify-content` value seen: center
   - `align-items` value seen: center

**Did you see a `gap` property anywhere?**
> .gap-1 {
    gap: calc(var(--spacing) * 1);
}

**What was the most interesting use of Flexbox you found?**
> The HRIS has a complex way of using the flexbox because it has a lot of CSS properties and values that are used to make the layout look the way it does. 

---

## Activity 8: Build the HRIS Employee Card Row (Challenge)

Build a row of employee cards with semantic HTML and Flexbox layout.

**Your HTML:**

```html
refer to sidebar.html
```

**Your CSS:**

```css
refer to sidebar.html

```

**Explain these decisions:**

1. Why did you use `flex-direction: column` on `.emp-card`?
   > to stack the items vertically

2. What trick did you use to push the footer to the bottom of every card even if the card content is different heights?
   > Put flex: 1 on the card's middle body section to make it stretch and push the footer down.

3. How did you put the name and badge on the same line in `.emp-card__header`?
   > Put `display: flex` and `justify-content: space-between` on the header so the name and badge sit on opposite ends.

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
   > `justify-content` controls alignment along the main axis (horizontal by default), while `align-items` controls alignment along the cross axis (vertical by default).

2. **When would you use `flex-direction: column` instead of `row`?**
   > `flex-direction: column` is used when you want to stack items vertically instead of horizontally.

3. **What problem does `flex-wrap: wrap` solve?**
   > It lets items break onto a new line when there’s not enough space, instead of squishing everything into one line or overflowing the container.

4. **What is the "holy trinity" for perfectly centering an element?**
   > 1. `display: flex`
   > 2. `justify-content: center`
   > 3. `align-items: center`

5. **What is the difference between `flex: 1` and `flex: 0 0 220px`? When would you use each?**
   > `flex: 1` allows an element to grow and shrink, taking up available space, while `flex: 0 0 220px` keeps the element at a fixed size of 220px and prevents it from growing or shrinking.

6. **Before Flexbox existed, what did developers use to lay things out? (Bonus — research this!)**
   > Before Flexbox, developers used tables, floats, and inline-block elements to lay out web pages.

---

## 📊 Final Score: 20/20

**Summary:**
- [x] All activities completed
- [x] `flexbox.html` working in browser
- [x] Reflection questions answered
- [x] HRIS inspection done

**Ready for:** Lesson 3.3 (CSS Grid — Two-Dimensional Layouts)

---

**Next:** Complete all activities, open them in your browser, then submit for review.
