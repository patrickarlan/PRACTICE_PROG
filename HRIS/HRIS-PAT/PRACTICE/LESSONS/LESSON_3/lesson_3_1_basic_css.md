# Chapter 3: Styling the Web with CSS

## Lesson 3.1: Basic CSS — How to Make Websites Beautiful

Imagine you've built a house with perfectly organized rooms (HTML). Now you need to paint the walls, choose furniture colors, arrange the furniture, and add decorations. That's what CSS does. CSS (Cascading Style Sheets) is the paintbrush of web development. It takes plain, boring HTML and transforms it into something visually appealing.

Without CSS, every website would look like this: plain black text on a white background, no colors, no spacing, no design. CSS is what makes websites look professional.

---

## Part 1: What is CSS and How Does It Work?

### The Client-Server Model of Styling

When you visit a website, here's what happens:

1. **Browser requests HTML** — "Give me the structure"
2. **Browser receives HTML** — "Here's your page structure"
3. **Browser finds `<link>` tags** — "I need to load CSS files"
4. **Browser requests CSS** — "Give me the styles"
5. **Browser receives CSS** — "Here are the styles"
6. **Browser applies styles to HTML** — "Now I'll make it pretty"
7. **Browser displays the styled page** — User sees the beautiful website

### Three Ways to Add CSS

#### **1. External CSS (The Professional Way)**

Create a separate `.css` file and link it in your HTML:

```html
<!-- In your HTML file -->
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```

```css
/* In styles.css */
body {
    background-color: #f5f5f5;
    font-family: Arial, sans-serif;
}

h1 {
    color: #333;
    font-size: 2.5rem;
}
```

**Why this is best:**
- ✅ Reusable across multiple HTML files
- ✅ Keeps HTML and CSS separate (clean code)
- ✅ Browser caches CSS file (faster loading)
- ✅ Easy to maintain

#### **2. Internal CSS (Quick and Dirty)**

Write CSS inside a `<style>` tag in your HTML:

```html
<head>
    <style>
        body {
            background-color: white;
        }
        h1 {
            color: blue;
        }
    </style>
</head>
```

**When to use:** Quick prototypes, one-off projects, learning

#### **3. Inline CSS (Last Resort)**

Apply styles directly to HTML elements:

```html
<h1 style="color: blue; font-size: 2rem;">Hello World</h1>
```

**Why NOT to use:** 
- ❌ Hard to maintain
- ❌ Can't reuse styles
- ❌ Mixes HTML and CSS
- ❌ Nightmarish for large projects

**In plain English:** Inline CSS is like writing a unique instruction on every piece of furniture instead of having one instruction manual. Don't do it.

---

## Part 2: CSS Selectors — Targeting Elements

A selector is how you tell CSS "which HTML elements should I style?" There are many ways to select elements.

### **Element Selectors — The Basics**

Target HTML elements by name:

```css
/* Style all <p> tags */
p {
    color: black;
    line-height: 1.6;
}

/* Style all <h1> tags */
h1 {
    font-size: 2.5rem;
    color: #333;
}

/* Style all <a> tags */
a {
    text-decoration: none;
    color: blue;
}
```

**Result:** Every `<p>` on the page gets the same styling.

### **Class Selectors — Targeting Groups**

Use `.classname` to style multiple elements that share a class:

```css
/* All elements with class="button" */
.button {
    background-color: blue;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
}

.warning {
    background-color: red;
    color: white;
}
```

```html
<button class="button">Click Me</button>
<button class="button warning">Delete</button>
<a href="#" class="button">Link Button</a>
```

**Why classes are powerful:** One class can be applied to MANY different elements.

### **ID Selectors — Targeting One Specific Element**

Use `#idname` to style a unique element:

```css
/* Only the element with id="header" */
#header {
    background-color: navy;
    color: white;
    padding: 20px;
}

#main-content {
    max-width: 1200px;
    margin: 0 auto;
}
```

```html
<div id="header">Header goes here</div>
<div id="main-content">Content goes here</div>
```

**Important rule:** Each ID should be unique on a page. Use classes when styling multiple elements.

### **Combining Selectors — More Specific**

```css
/* All <p> tags inside a <div> */
div p {
    color: gray;
}

/* Direct children only */
div > p {
    margin: 10px;
}

/* Multiple selectors at once */
h1, h2, h3 {
    font-family: 'Arial', sans-serif;
}

/* Class inside an element */
div.card {
    border: 1px solid #ccc;
    padding: 15px;
}
```

### **Pseudo-Classes — Special States**

These let you style elements based on their state:

```css
/* When user hovers over a link */
a:hover {
    color: red;
    text-decoration: underline;
}

/* When a link has been visited */
a:visited {
    color: purple;
}

/* First child element */
li:first-child {
    font-weight: bold;
}

/* Last child element */
li:last-child {
    border-bottom: none;
}

/* Every nth element */
li:nth-child(2n) {
    background-color: #f5f5f5;  /* Stripe rows */
}

/* Focus state for form inputs */
input:focus {
    border: 2px solid blue;
    outline: none;
}
```

---

## Part 3: Common CSS Properties — The Building Blocks

### **Colors and Text**

```css
h1 {
    color: #333;                    /* Text color (hex) */
    background-color: #f5f5f5;      /* Background color */
    font-family: 'Arial', sans-serif; /* Font */
    font-size: 2rem;                /* Size */
    font-weight: bold;              /* Bold */
    text-align: center;             /* Alignment */
    line-height: 1.6;               /* Space between lines */
    letter-spacing: 2px;            /* Space between letters */
    text-transform: uppercase;      /* Transform text */
    text-decoration: underline;     /* Underline, overline, etc. */
}
```

**Color formats:**
- **Named:** `color: red;`
- **Hex:** `color: #FF0000;` (same as red)
- **RGB:** `color: rgb(255, 0, 0);`
- **RGBA:** `color: rgba(255, 0, 0, 0.5);` (with transparency)

### **Sizing**

```css
div {
    width: 100%;                    /* Full width */
    width: 500px;                   /* Exact pixels */
    width: 50%;                     /* 50% of parent */
    width: 50vw;                    /* 50% of viewport */
    
    height: 200px;
    min-width: 300px;               /* Never smaller than this */
    max-width: 1200px;              /* Never larger than this */
}
```

**Units:**
- **px** (pixels) — exact size
- **%** (percent) — relative to parent
- **rem** (relative em) — relative to root font size
- **em** — relative to element's font size
- **vw/vh** (viewport) — relative to browser window

### **Spacing: Margin and Padding**

This is crucial. The Box Model is how CSS measures spacing.

```css
div {
    /* Padding: space INSIDE the element */
    padding: 20px;                  /* All sides */
    padding: 10px 20px;             /* Top/Bottom, Left/Right */
    padding: 10px 15px 20px 25px;   /* Top, Right, Bottom, Left */
    padding-top: 10px;              /* Individual sides */
    
    /* Margin: space OUTSIDE the element */
    margin: 20px;
    margin: 0 auto;                 /* Center horizontally */
    margin-top: 30px;
}
```

**In plain English:** 
- **Padding** is the space between the content and the border (inside)
- **Margin** is the space between the border and other elements (outside)

Think of it like a picture frame:
- The photo is the **content**
- The cardboard around it is **padding**
- The wall space around the frame is **margin**

### **The Box Model Visualized**

```
┌─────────────────────────────────────────┐
│         MARGIN (outer space)             │
│  ┌───────────────────────────────────┐  │
│  │  BORDER (the edge)                │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ PADDING (inner space)       │  │  │
│  │  │ ┌───────────────────────┐   │  │  │
│  │  │ │  CONTENT              │   │  │  │
│  │  │ │  (the actual stuff)   │   │  │  │
│  │  │ └───────────────────────┘   │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### **Borders**

```css
div {
    border: 2px solid #333;         /* Width, style, color */
    border-width: 2px;
    border-style: solid;            /* solid, dashed, dotted */
    border-color: #333;
    border-radius: 5px;             /* Rounded corners */
    border-radius: 50%;             /* Circle */
    border-top: 1px solid red;      /* Individual sides */
}
```

### **Backgrounds**

```css
div {
    background-color: #f5f5f5;
    background-image: url('bg.jpg');
    background-size: cover;         /* Cover entire area */
    background-position: center;
    background-repeat: no-repeat;
    
    /* Shorthand */
    background: #f5f5f5 url('bg.jpg') center / cover no-repeat;
}
```

---

## Part 4: Understanding the Cascade

"Cascading" in CSS means styles flow downward. If you define the same property twice, the last one wins:

```css
p {
    color: blue;    /* All paragraphs are blue */
}

.warning {
    color: red;     /* .warning paragraphs are red */
}

#special {
    color: green;   /* #special paragraph is green */
}

p {
    color: purple;  /* Now ALL paragraphs are purple (comes last) */
}
```

**Specificity:** More specific selectors override general ones:

```
ID (most specific)      #header
Class                   .button
Element (least)         p
```

### **Inheritance**

Some properties are inherited from parent to child:

```html
<div style="color: blue; font-size: 16px;">
    <p>This paragraph is BLUE and 16px (inherited)</p>
</div>
```

Text properties like `color` and `font-size` are inherited, but spacing properties like `margin` and `padding` are NOT.

---

## Part 5: Layout and Spacing Patterns

### **Centering Elements (The Problem Every Developer Faces)**

#### **Center Text**

```css
div {
    text-align: center;  /* Centers inline content */
}
```

#### **Center Block Horizontally**

```css
div {
    width: 500px;        /* Must have a width */
    margin: 0 auto;      /* Auto margin on left/right */
}
```

#### **Center Block Both Ways**

```css
div {
    display: flex;
    justify-content: center;    /* Horizontal */
    align-items: center;        /* Vertical */
    height: 200px;              /* Height required */
}
```

### **Creating Cards (Common Pattern)**

```css
.card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card h2 {
    margin-top: 0;
    color: #333;
}

.card p {
    color: #666;
    line-height: 1.6;
}
```

### **Creating Buttons**

```css
.button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
}

.button:hover {
    background-color: #0056b3;
}

.button:active {
    transform: scale(0.98);
}
```

---

## Part 6: Real-World CSS Patterns from HRIS

### **Typography Hierarchy**

In the HRIS application, they use different font sizes for hierarchy:

```css
h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 20px;
}

h2 {
    font-size: 2rem;
    color: #34495e;
    margin-bottom: 15px;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
    font-size: 1rem;
    line-height: 1.6;
    color: #333;
}
```

### **Color Scheme**

Define a consistent color palette:

```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --warning-color: #ffc107;
    
    --text-dark: #2c3e50;
    --text-light: #7f8c8d;
    --border-color: #ecf0f1;
}

.button-primary {
    background-color: var(--primary-color);
}

.alert-danger {
    background-color: var(--danger-color);
    color: white;
}
```

### **Spacing Scale**

Use consistent spacing:

```css
/* Spacing scale */
.spacing-xs { margin: 4px; }
.spacing-sm { margin: 8px; }
.spacing-md { margin: 16px; }
.spacing-lg { margin: 24px; }
.spacing-xl { margin: 32px; }

/* Apply to specific sides */
.mt-md { margin-top: 16px; }
.mb-lg { margin-bottom: 24px; }
.p-md { padding: 16px; }
```

---

## 🎯 Key Takeaways

✅ **CSS connects to HTML** via `<link>` tags (external is best)

✅ **Selectors target elements**: element, `.class`, `#id`, and combinations

✅ **Box Model** = Content + Padding + Border + Margin

✅ **Specificity matters**: ID > Class > Element

✅ **Cascade flows downward**: Last rule wins

✅ **Properties are inherited**: Color, font, text properties flow down

✅ **Common properties**: color, background-color, padding, margin, border, width, height

✅ **Spacing is critical**: Proper padding and margin make designs look professional

✅ **Consistency is key**: Use color schemes, spacing scales, typography hierarchies

---

## 📝 Practice Activities

### **Activity 1: Link External CSS**
Create a `styles.css` file and link it to your `index.html`:
```html
<link rel="stylesheet" href="styles.css">
```

### **Activity 2: Style Basic Elements**
In your CSS file, style:
- `body` — background color and text color
- `h1` — larger font, different color
- `p` — line-height for readability, specific color

### **Activity 3: Create a Card**
Style a `<div class="card">` with:
- Border
- Padding
- Rounded corners (`border-radius`)
- Box shadow
- Margin

Test it by creating multiple cards in HTML.

### **Activity 4: Understand the Box Model**
Create a div with:
- `width: 200px`
- `padding: 20px`
- `margin: 30px`
- `border: 2px solid blue`

Draw it in your notes showing each layer (margin, border, padding, content).

### **Activity 5: Selector Practice**
Create HTML with:
- Multiple paragraphs (style with element selector)
- Multiple divs with `class="highlight"` (style with class)
- One special div with `id="important"` (style with ID)

Verify specificity: ID should override class, class should override element.

### **Activity 6: Create a Simple Layout**
Build a page with:
- Header with navigation buttons (use `.button` class)
- Main content area with cards
- Footer

Use consistent spacing, colors, and typography.

### **Activity 7: Hover Effects**
Add interactivity:
- Links change color on hover
- Buttons change background on hover
- Cards have shadow on hover

Use `:hover` pseudo-class.

### **Activity 8: Responsive Spacing**
Create a newsletter signup form with:
- Proper padding inside the form
- Proper margin around the form
- Centered button
- Clear visual hierarchy

---

## 🚀 What's Next?

Once you master basic CSS, you'll learn:
- **Lesson 3.2:** Flexbox (layout without grid positions)
- **Lesson 3.3:** Tailwind CSS (utility-first styling, what HRIS uses)

CSS is the difference between a functional website and a beautiful one. Mastering spacing, colors, and typography will make everything you build look professional.

**Pro Tip:** Spend time on CSS fundamentals now. Every single day as a developer, you'll be writing CSS. Getting good at it pays dividends forever.
