# Chapter 3: Styling the Web with CSS

## Lesson 3.2: CSS Flexbox & Layout — Taming the Page

Imagine you're arranging furniture in a room. You could measure every piece down to the centimeter and place it exactly — that's the old way (CSS `float` and `position`). Or you could tell the room itself: "line everything up in a row, space them evenly, center them in the middle." That's **Flexbox** — you give instructions to the *container*, and it handles the layout of everything inside.

Before Flexbox, building even a simple horizontal navigation bar was painful. Developers used hacks like `float: left`, `clearfix`, and `display: inline-block` that were brittle and hard to reason about. Flexbox made all of that obsolete. It is the foundation of modern CSS layout, and it's used everywhere in professional web apps — including HRIS.

---

## Part 1: What is Flexbox?

Flexbox (Flexible Box Layout) is a CSS layout model that distributes space along a single axis — either a **row** (horizontal) or a **column** (vertical). Two roles exist:

- **The Flex Container** — the parent element you activate Flexbox on.
- **The Flex Items** — the direct children of that container.

You activate Flexbox with one line on the **parent**:

```css
.container {
    display: flex;
}
```

That's it. Every direct child of `.container` is now a flex item, and they automatically line up in a **row** by default.

### The Two Axes

```
MAIN AXIS (direction of flex) ─────────────────────────>
                    ┌──────────┬──────────┬──────────┐
CROSS AXIS          │ Item 1   │ Item 2   │ Item 3   │
(perpendicular) ↕   │          │          │          │
                    └──────────┴──────────┴──────────┘
```

- **Main Axis**: The direction flex items are laid out (`row` = left-to-right, `column` = top-to-bottom).
- **Cross Axis**: Perpendicular to the main axis.

This distinction is critical because `justify-content` controls the **main axis** and `align-items` controls the **cross axis**.

---

## Part 2: `flex-direction` — Which Way Do Things Flow?

`flex-direction` sets which axis becomes the main axis.

```css
.container {
    display: flex;
    flex-direction: row;          /* Default: items go left → right */
    flex-direction: row-reverse;  /* Items go right → left */
    flex-direction: column;       /* Items go top → bottom */
    flex-direction: column-reverse; /* Items go bottom → top */
}
```

### Visual Comparison:

**`row` (default):**
```
┌──────┬──────┬──────┐
│  A   │  B   │  C   │
└──────┴──────┴──────┘
```

**`column`:**
```
┌──────┐
│  A   │
├──────┤
│  B   │
├──────┤
│  C   │
└──────┘
```

**In plain English:** `flex-direction` is like choosing whether to arrange items in a line going across the room or in a stack going up the wall.

---

## Part 3: `justify-content` — Spacing Along the Main Axis

After items are laid out, there's usually leftover space. `justify-content` decides what to do with it.

```css
.container {
    display: flex;
    justify-content: flex-start;     /* Default: pile everything at the start */
    justify-content: flex-end;       /* Pile everything at the end */
    justify-content: center;         /* Center everything */
    justify-content: space-between;  /* First/last at edges, equal space between */
    justify-content: space-around;   /* Equal space around each item */
    justify-content: space-evenly;   /* Truly equal space everywhere */
}
```

### Visual Comparison (with 3 items in a row):

```
flex-start:    [A][B][C]______________
flex-end:      ______________[A][B][C]
center:        ______[A][B][C]______
space-between: [A]_______[B]_______[C]
space-around:  __[A]____[B]____[C]__
space-evenly:  ___[A]___[B]___[C]___
```

**Real-world use:** `space-between` is the most common in navigation bars — logo on the left, links on the right.

---

## Part 4: `align-items` — Spacing Along the Cross Axis

`align-items` controls how items are positioned on the **perpendicular** axis.

```css
.container {
    display: flex;
    align-items: stretch;      /* Default: items stretch to fill the container height */
    align-items: flex-start;   /* Items stack at the top */
    align-items: flex-end;     /* Items stack at the bottom */
    align-items: center;       /* Items centered vertically */
    align-items: baseline;     /* Items aligned by their text baseline */
}
```

### Visual Comparison (container has fixed height):

```
stretch:          ┌────┬────┬────┐
                  │ A  │ B  │ C  │  (all fill full height)
                  └────┴────┴────┘

flex-start:       ┌──┬──┬──┐
                  │A │B │C │
                  │  │  │  │   (items hug the top)
                  └──┴──┴──┘

center:           │         │
                  │ ┌─┬─┬─┐ │
                  │ │A│B│C│ │   (items centered)
                  │ └─┴─┴─┘ │
                  
```

**In plain English:** If `justify-content` is horizontal alignment, `align-items` is vertical alignment.

---

## Part 5: `gap` — Spacing Between Items

`gap` is the cleanest way to add space between flex items. No margin hacks needed.

```css
.container {
    display: flex;
    gap: 16px;         /* Same gap between all items */
    gap: 16px 24px;    /* Row gap, Column gap */
    row-gap: 16px;     /* Only between rows */
    column-gap: 24px;  /* Only between columns */
}
```

**Before `gap` existed (the old way — messy):**
```css
.item:not(:last-child) {
    margin-right: 16px;
}
```

**After `gap` (clean):**
```css
.container {
    display: flex;
    gap: 16px;
}
```

**In plain English:** `gap` is the gutter between items. Think of it as the space between tiles on a floor.

---

## Part 6: `flex-wrap` — What Happens When Items Don't Fit?

By default, flex items all stay on one line — they shrink to fit. This is called `nowrap`. If you want items to wrap to the next line when there's not enough space, use `flex-wrap: wrap`.

```css
.container {
    display: flex;
    flex-wrap: nowrap;   /* Default: all items on one line (they shrink) */
    flex-wrap: wrap;     /* Items wrap to the next line when needed */
    flex-wrap: wrap-reverse; /* Wrap, but lines go in reverse order */
}
```

### Visual Comparison (6 items, narrow container):

```
nowrap (items shrink to fit):
┌───┬───┬───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │
└───┴───┴───┴───┴───┴───┘

wrap (items move to next line):
┌────┬────┬────┐
│ 1  │ 2  │ 3  │
├────┬────┬────┤
│ 4  │ 5  │ 6  │
└────┴────┴────┘
```

**Real-world use:** Card grids. You have 6 employee cards. On desktop they show 3 per row. When the screen shrinks, they wrap to 2 per row, then 1 per row.

---

## Part 7: Flex Item Properties

So far, all properties were on the **container**. These go on individual **items**.

### `flex-grow` — How much does an item grow?

```css
.item-a { flex-grow: 1; } /* Takes up 1 share of leftover space */
.item-b { flex-grow: 2; } /* Takes up 2 shares (twice as wide as A) */
.item-c { flex-grow: 0; } /* Does not grow (default) */
```

```
Container: ────────────────────────────────────────────
item-a (1): ────────────
item-b (2): ────────────────────────
item-c (0): ──────
```

### `flex-shrink` — How much does an item shrink?

When there's NOT enough space, `flex-shrink` determines which items give up space first.

```css
.item { flex-shrink: 1; }  /* Default: shrinks equally with others */
.item { flex-shrink: 0; }  /* Never shrinks — keeps original size */
.item { flex-shrink: 2; }  /* Shrinks twice as fast as others */
```

### `flex-basis` — What is the item's starting size?

```css
.item { flex-basis: auto;   } /* Default: size is based on content */
.item { flex-basis: 200px;  } /* Start at 200px before growing/shrinking */
.item { flex-basis: 33.33%; } /* Start at 1/3 of the container */
```

### The Shorthand: `flex`

```css
/* flex: grow shrink basis */
.item { flex: 1 1 auto;  } /* Common: grow, shrink, auto basis */
.item { flex: 1;         } /* Shorthand: "take up equal share" */
.item { flex: 0 0 200px; } /* Fixed size, never grows or shrinks */
```

**In plain English:** `flex: 1` on all items means "divide the space equally." Like splitting a pizza fairly.

### `align-self` — Override alignment for ONE item

```css
.container { align-items: flex-start; }  /* All items at top */
.special   { align-self: center; }       /* But THIS one is centered */
```

---

## Part 8: The Perfect Centering Solution

The #1 question every CSS beginner has: "How do I center something perfectly?" Flexbox answers this once and for all.

```css
/* CENTER ANYTHING — horizontally AND vertically */
.container {
    display: flex;
    justify-content: center;  /* Center on main axis (horizontal) */
    align-items: center;      /* Center on cross axis (vertical) */
    height: 100vh;            /* Must have a defined height */
}
```

```html
<div class="container">
    <div class="centered-box">I am perfectly centered!</div>
</div>
```

**Result:**
```
┌──────────────────────────────────┐
│                                  │
│                                  │
│    ┌──────────────────────┐      │
│    │  I am perfectly      │      │
│    │  centered!           │      │
│    └──────────────────────┘      │
│                                  │
│                                  │
└──────────────────────────────────┘
```

This is the solution to the classic "vertically center a div" problem that used to require complex hacks. With Flexbox, it's 3 lines.

---

## Part 9: Real-World Flexbox Patterns

These are the patterns you'll use every single day as a developer.

### Pattern 1: Navigation Bar (Most Common)

```css
nav {
    display: flex;
    justify-content: space-between; /* Logo left, links right */
    align-items: center;            /* Vertically center everything */
    padding: 0 24px;
    height: 64px;
    background-color: #1e293b;
}

.nav-links {
    display: flex;
    gap: 24px;  /* Space between navigation links */
}
```

```html
<nav>
    <div class="logo">HRIS System</div>
    <ul class="nav-links">
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/employees">Employees</a></li>
        <li><a href="/reports">Reports</a></li>
    </ul>
</nav>
```

**Why `space-between`?** Logo on the far left, links on the far right. Exactly like every navigation bar you've ever seen.

---

### Pattern 2: Card Grid (Used in HRIS Employee List)

```css
.cards-container {
    display: flex;
    flex-wrap: wrap;          /* Wrap to next line on small screens */
    gap: 20px;
    padding: 20px;
}

.card {
    flex: 1 1 280px;          /* Grow/shrink, minimum 280px wide */
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

```html
<div class="cards-container">
    <div class="card">Employee 1</div>
    <div class="card">Employee 2</div>
    <div class="card">Employee 3</div>
    <div class="card">Employee 4</div>
    <div class="card">Employee 5</div>
</div>
```

**Why `flex: 1 1 280px`?** Cards grow to fill space, shrink if needed, but never go below 280px — so 3 cards fit on desktop, 2 on tablet, 1 on mobile. Automatically responsive.

---

### Pattern 3: Sidebar Layout

```css
.page-layout {
    display: flex;
    min-height: 100vh;
}

.sidebar {
    flex: 0 0 250px;          /* Fixed 250px, never grows or shrinks */
    background-color: #1e293b;
    padding: 20px;
}

.main-content {
    flex: 1;                  /* Takes all remaining space */
    padding: 24px;
    background-color: #f8fafc;
}
```

```html
<div class="page-layout">
    <aside class="sidebar">
        <nav><!-- Sidebar links --></nav>
    </aside>
    <main class="main-content">
        <!-- Page content -->
    </main>
</div>
```

**This is the exact layout pattern used in the HRIS application.** The sidebar is `flex: 0 0 250px` (fixed width) and the main content area is `flex: 1` (takes all remaining space).

---

### Pattern 4: Button Group (Inline Flex)

```css
.button-group {
    display: inline-flex;   /* Like flex, but doesn't stretch full width */
    gap: 8px;
    align-items: center;
}
```

```html
<div class="button-group">
    <button>Edit</button>
    <button>Delete</button>
    <button>View</button>
</div>
```

**Why `inline-flex`?** Regular `flex` makes the container take full width. `inline-flex` keeps the container only as wide as its contents — like `inline-block` but with flex superpowers.

---

### Pattern 5: Form Row Layout (Label + Input Side by Side)

```css
.form-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
}

.form-row label {
    flex: 0 0 120px;    /* Fixed label width */
    text-align: right;
    font-weight: 600;
}

.form-row input {
    flex: 1;            /* Input takes remaining space */
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
}
```

```html
<form>
    <div class="form-row">
        <label for="name">Full Name:</label>
        <input type="text" id="name" name="name">
    </div>
    <div class="form-row">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email">
    </div>
</form>
```

---

## Part 10: Flexbox in the HRIS Application

To see Flexbox in action in a real codebase, let's look at how HRIS uses it.

### HRIS Header Bar

The main app header uses the classic `justify-content: space-between` pattern:

```css
/* Similar to how HRIS layouts its header */
.app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    padding: 0 16px;
    border-bottom: 1px solid #e2e8f0;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 12px;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 8px;
}
```

### Why Flexbox Over Old Methods?

| Old Way (floats) | Flexbox |
|------------------|---------|
| `float: left` → must clear floats | Just `display: flex` |
| Vertical centering requires `position: absolute` hacks | `align-items: center` |
| Distributing space requires math | `justify-content: space-between` |
| Responsive requires complex media queries | `flex-wrap: wrap` |
| "Holy Grail" layout is legendary for difficulty | 10 lines of Flexbox |

---

## Part 11: Common Flexbox Debugging Tips

Things that go wrong, and how to fix them:

### Problem 1: Items Overflowing the Container

```css
/* ❌ Items overflow the container */
.container { display: flex; }

/* ✅ Fix: Allow wrapping */
.container {
    display: flex;
    flex-wrap: wrap;
}
```

### Problem 2: Items Don't Stretch to Full Height

```css
/* ❌ Items have different heights */
.container { display: flex; align-items: flex-start; }

/* ✅ Fix: Use default stretch */
.container {
    display: flex;
    align-items: stretch; /* This is the default, but make it explicit */
}
```

### Problem 3: Can't Center Vertically

```css
/* ❌ Vertical centering doesn't work */
.container { display: flex; }

/* ✅ Fix: Container needs a defined height */
.container {
    display: flex;
    align-items: center;
    height: 200px;  /* Without a height, there's nothing to center within! */
}
```

### Problem 4: Items Are All the Same Size But Shouldn't Be

```css
/* ❌ All items grow equally */
.sidebar { flex: 1; }  /* Same as main — both fight for equal space */
.main    { flex: 1; }

/* ✅ Fix: Use flex-grow values to set proportion */
.sidebar { flex: 0 0 250px; }  /* Fixed sidebar */
.main    { flex: 1; }          /* Main fills remaining space */
```

---

## 🎯 Key Takeaways

✅ **`display: flex`** activates Flexbox on the parent container

✅ **`flex-direction`** sets the main axis: `row` (horizontal) or `column` (vertical)

✅ **`justify-content`** controls spacing on the **main axis** — use `space-between` for navbars

✅ **`align-items`** controls alignment on the **cross axis** — use `center` for vertical centering

✅ **`gap`** is the clean way to add space between flex items — no margin hacks

✅ **`flex-wrap: wrap`** lets items spill to the next line — essential for responsive card grids

✅ **`flex: 1`** on an item means "take up equal share of available space"

✅ **`flex: 0 0 Xpx`** means "fixed size, never grow or shrink" — use for sidebars

✅ **The holy trinity for perfect centering:** `display: flex` + `justify-content: center` + `align-items: center`

---

## 📝 Practice Activities

### **Activity 1: Your First Flexbox Row**

Create a new file `flexbox.html` in your `PRACTICE/html/` folder.

Build a row of **3 colored boxes** side by side using Flexbox:

```html
<div class="flex-container">
    <div class="box box-red">Box 1</div>
    <div class="box box-green">Box 2</div>
    <div class="box box-blue">Box 3</div>
</div>
```

```css
.flex-container {
    display: flex;
    /* Your additions here... */
}

.box {
    width: 100px;
    height: 100px;
    color: white;
    font-weight: bold;
    /* Center the text inside each box */
}

.box-red   { background-color: #ef4444; }
.box-green { background-color: #22c55e; }
.box-blue  { background-color: #3b82f6; }
```

**Goals:**
- [ ] 3 boxes are side by side
- [ ] Text is centered inside each box (hint: use `display: flex` on `.box` too!)
- [ ] A gap of `16px` between boxes

---

### **Activity 2: Centering — The Classic Challenge**

In the same `flexbox.html`, create a section that perfectly centers a card both horizontally AND vertically on the screen:

```html
<div class="centering-demo">
    <div class="centered-card">
        <h2>I Am Centered!</h2>
        <p>Both horizontally and vertically.</p>
    </div>
</div>
```

**Goals:**
- [ ] `.centering-demo` uses `display: flex`
- [ ] The card is centered both ways
- [ ] `.centering-demo` has `height: 300px` (so there's space to center within)
- [ ] The card has padding, a background color, and rounded corners

---

### **Activity 3: Build a Navigation Bar**

Create a navigation bar using Flexbox that has the logo on the left and 3 links on the right, all vertically centered:

```html
<nav class="navbar">
    <div class="nav-logo">HRIS</div>
    <ul class="nav-links">
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Employees</a></li>
        <li><a href="#">Reports</a></li>
    </ul>
</nav>
```

**Goals:**
- [ ] Logo is on the far left, links are on the far right (use `justify-content: space-between`)
- [ ] Everything is vertically centered
- [ ] The 3 nav links are in a row with a gap between them
- [ ] Navbar has a dark background and the text is white
- [ ] Links turn a different color on hover

---

### **Activity 4: Switch to `column` Direction**

In your `flexbox.html`, take your 3-box row from Activity 1 and add a new section that stacks the same boxes **vertically** using `flex-direction: column`.

**Goals:**
- [ ] Add a second `.flex-container` with `flex-direction: column`
- [ ] The same 3 boxes stack vertically
- [ ] They are aligned to the center of the page horizontally (`align-items: center`)
- [ ] Write in your answer file: "What did changing `flex-direction` to `column` do?"

---

### **Activity 5: Wrapping Card Grid**

Build a responsive card grid where cards wrap to the next line automatically:

```html
<div class="card-grid">
    <div class="employee-card">Alice Johnson — Engineering</div>
    <div class="employee-card">Bob Smith — Sales</div>
    <div class="employee-card">Carol White — HR</div>
    <div class="employee-card">David Lee — Engineering</div>
    <div class="employee-card">Eva Martinez — Finance</div>
    <div class="employee-card">Frank Brown — HR</div>
</div>
```

**Goals:**
- [ ] Cards are displayed in a row
- [ ] Cards wrap to the next line when the screen is narrow (`flex-wrap: wrap`)
- [ ] Each card has `flex: 1 1 220px` (minimum 220px wide)
- [ ] There is a gap of `16px` between all cards
- [ ] Cards have a border, padding, and rounded corners
- [ ] Resize your browser window — cards should rearrange automatically

---

### **Activity 6: Sidebar Layout**

Build a full-page sidebar layout like a real dashboard application:

```html
<div class="dashboard-layout">
    <aside class="sidebar">
        <h3>Navigation</h3>
        <nav>
            <a href="#">Dashboard</a>
            <a href="#">Employees</a>
            <a href="#">Reports</a>
            <a href="#">Settings</a>
        </nav>
    </aside>
    <main class="content-area">
        <h1>Dashboard</h1>
        <p>Welcome to the HRIS system. Select a section from the sidebar.</p>
    </main>
</div>
```

**Goals:**
- [ ] `.dashboard-layout` is a flex container
- [ ] `.sidebar` is **fixed at 220px** and never grows or shrinks
- [ ] `.content-area` takes up **all remaining space**
- [ ] Both sidebar and content area fill the full page height (`min-height: 100vh`)
- [ ] Sidebar has a dark background, content area has a light background
- [ ] Sidebar links are stacked vertically with a gap (use `flex-direction: column` inside the sidebar)

---

### **Activity 7: Inspect HRIS for Flexbox**

Open your HRIS frontend at `http://localhost:5173`. Open DevTools (F12) → Elements tab.

1. Click on the **main navigation/header** area.
2. Look at the CSS panel — do you see `display: flex`? What properties are used?
3. Click on the **main content area** — is it a flex container?
4. Find **at least 2 places** where Flexbox is used in the real app.

**Write in your answer file:**
- Where did you find Flexbox being used?
- What `justify-content` or `align-items` values did you see?
- Did you spot a `gap` property anywhere?

---

### **Activity 8: Build the HRIS Employee Card Row (Challenge)**

Recreate this layout: A row of 3 employee cards, each with a name, department badge, and two action buttons at the bottom.

```html
<div class="employee-row">
    <article class="emp-card">
        <header class="emp-card__header">
            <h3>Alice Johnson</h3>
            <span class="badge">Engineering</span>
        </header>
        <section class="emp-card__body">
            <p>Senior Developer</p>
            <p>ID: #1001</p>
        </section>
        <footer class="emp-card__footer">
            <button class="btn btn-edit">Edit</button>
            <button class="btn btn-delete">Delete</button>
        </footer>
    </article>
    <!-- Repeat for 2 more cards -->
</div>
```

**Goals:**
- [ ] `.employee-row` uses Flexbox with a gap between cards
- [ ] `.emp-card` uses `display: flex` + `flex-direction: column` (header, body, footer stacked)
- [ ] `.emp-card__header` uses Flexbox to put the name and badge on the same line (`justify-content: space-between`)
- [ ] `.emp-card__footer` uses Flexbox to place both buttons side by side with a gap
- [ ] Cards all have equal height even if content differs (hint: `flex: 1` on `.emp-card__body` to push the footer down)

---

## ✅ Completion Checklist

**Activities Done:**
- [ ] Activity 1: Created `flexbox.html` with 3-box row
- [ ] Activity 2: Added centered card section
- [ ] Activity 3: Built Navigation Bar
- [ ] Activity 4: Switched to column direction
- [ ] Activity 5: Built wrapping card grid
- [ ] Activity 6: Built sidebar layout
- [ ] Activity 7: Inspected HRIS for Flexbox
- [ ] Activity 8: Built HRIS Employee Card Row

**Files Saved:**
- [ ] `PRACTICE/html/flexbox.html` created and working
- [ ] Opened in browser and verified visually
- [ ] `lesson_3_2_answer.md` filled out

---

## 🚀 What's Next?

Once you're comfortable with Flexbox, you'll learn:
- **Lesson 3.3:** CSS Grid — for two-dimensional layouts (rows AND columns at the same time)
- **Lesson 3.4:** Responsive Design — using Flexbox + media queries to handle all screen sizes
- **Lesson 3.9:** Tailwind CSS — using pre-built utility classes like `flex`, `justify-center`, `items-center`, `gap-4` which are all just Flexbox under the hood

**Pro Tip:** Flexbox and CSS Grid are the two layout systems you will use for the rest of your career. Flexbox is for one-dimensional layouts (rows OR columns). Grid is for two-dimensional layouts (rows AND columns at the same time). When you're not sure which to use — if you only need one direction, use Flexbox. If you need both directions at once, use Grid.

**Connect to HRIS:** Every list of cards, every navigation bar, every form with a label next to an input — all of these in the real HRIS application are laid out with Flexbox. Now you understand exactly how they work.
