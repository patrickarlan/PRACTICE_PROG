## 🎯 Practice Activities (Lesson 3.1 Answer Template)

Let's put these CSS fundamentals to practice in your `PRACTICE/` folder. Write your answers and notes in `lesson_3_1_answer.md`.

---

## Activity 1: Link External CSS

Create a `styles.css` file and link it to your `index.html`:

**Your answer:**
1. Created file: `PRACTICE/html/styles.css` ✓
2. Added to `index.html`:
```html
<link rel="stylesheet" href="styles.css">
```
3. Test: Open index.html in browser and verify styles load

---

## Activity 2: Style Basic Elements

Style these elements in your CSS:

**Your answer:**
```css
/* Style the body */
body {
    background-color: #f5f5f5;
    color: #333;
    font-family: Arial, sans-serif;
    line-height: 1.6;
}

/* Style h1 */
h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    text-align: center;
    margin-bottom: 20px;
}

/* Style paragraphs */
p {
    line-height: 1.8;
    color: #666;
    max-width: 600px;
}
```

**Test this by:**
- [ ] Opening your HTML in browser
- [ ] Verifying background is light gray
- [ ] Verifying h1 is large and centered
- [ ] Verifying paragraphs have good spacing

---

## Activity 3: Create a Card

Style a `<div class="card">` component:

**Your HTML:**
```html
<div class="card">
    <h2>Card Title</h2>
    <p>This is card content. It should look like a distinct box with rounded corners and shadow.</p>
</div>

<div class="card">
    <h2>Another Card</h2>
    <p>Multiple cards should have consistent styling.</p>
</div>
```

**Your CSS:**
```css
.card {
    background-color: white;
    border: 1px solid #ecf0f1;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card h2 {
    margin-top: 0;
    color: #2c3e50;
    border-bottom: 2px solid #007bff;
    padding-bottom: 10px;
}

.card p {
    color: #555;
    margin-bottom: 0;
}
```

**Verification:**
- [ ] Cards have rounded corners
- [ ] Cards have subtle shadow
- [ ] Cards have proper padding inside
- [ ] Cards have margin between them
- [ ] Multiple cards look consistent

---

## Activity 4: Understand the Box Model

Create this HTML:
```html
<div class="box-demo"></div>
```

Style it:
```css
.box-demo {
    width: 200px;
    padding: 20px;
    margin: 30px;
    border: 2px solid blue;
    background-color: lightblue;
}
```

**Draw it in your notes:**
```
Outer edge of MARGIN ┌─────────────────────────────┐
                     │  MARGIN: 30px               │
                     │  ┌─────────────────────┐    │
                     │  │ BORDER: 2px blue    │    │
                     │  │ ┌─────────────────┐ │    │
                     │  │ │ PADDING: 20px   │ │    │
                     │  │ │ ┌─────────────┐ │ │    │
                     │  │ │ │ CONTENT     │ │ │    │
                     │  │ │ │ 200px wide  │ │ │    │
                     │  │ │ └─────────────┘ │ │    │
                     │  │ └─────────────────┘ │    │
                     │  └─────────────────────┘    │
                     └─────────────────────────────┘
```

**Questions to answer:**
1. What's the total width from outer margin edge to outer margin edge?
   - Answer: 200px (content) + 20px (left padding) + 20px (right padding) + 2px (left border) + 2px (right border) + 30px (left margin) + 30px (right margin) = **334px**

2. What's the difference between padding and margin?
   - Answer: Padding is INSIDE the border (pushes content away from edge). Margin is OUTSIDE the border (creates space between elements).

---

## Activity 5: Selector Practice

Create HTML with different selector types:

**HTML:**
```html
<p>This is a regular paragraph.</p>
<p>This is another regular paragraph.</p>

<div class="highlight">
    <p>This paragraph is inside a highlight div.</p>
</div>

<div id="important">
    <p>This is the most important paragraph on the page.</p>
</div>
```

**CSS:**
```css
/* Element selector */
p {
    color: black;
}

/* Class selector */
.highlight {
    background-color: yellow;
    padding: 10px;
}

/* ID selector */
#important {
    background-color: red;
    color: white;
    border: 3px solid darkred;
    padding: 15px;
}

/* Combined: p inside .highlight */
.highlight p {
    font-weight: bold;
}

/* Combined: p inside #important */
#important p {
    font-size: 1.2rem;
}
```

**Test specificity:**
- [ ] Regular paragraphs are black
- [ ] Paragraphs in .highlight have yellow background and are bold
- [ ] Paragraph in #important is RED with white text (ID overrides)

---

## Activity 6: Create a Simple Layout

Build an HTML page with structure:

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="styles.css">
    <title>My Simple Site</title>
</head>
<body>
    <header>
        <h1>My Website</h1>
        <nav>
            <a href="#" class="button">Home</a>
            <a href="#" class="button">About</a>
            <a href="#" class="button">Contact</a>
        </nav>
    </header>

    <main>
        <div class="card">
            <h2>Welcome</h2>
            <p>This is my first CSS-styled website.</p>
        </div>

        <div class="card">
            <h2>Features</h2>
            <p>Using CSS to make it look nice.</p>
        </div>
    </main>

    <footer>
        <p>&copy; 2026 My Website. All rights reserved.</p>
    </footer>
</body>
</html>
```

**CSS:**
```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
    color: #333;
}

header {
    background-color: #2c3e50;
    color: white;
    padding: 20px;
    margin-bottom: 30px;
}

header h1 {
    margin: 0;
    font-size: 2rem;
}

nav {
    margin-top: 15px;
}

.button {
    display: inline-block;
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    margin-right: 10px;
    text-decoration: none;
    border-radius: 4px;
}

.button:hover {
    background-color: #0056b3;
}

main {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
}

.card {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

footer {
    background-color: #34495e;
    color: white;
    text-align: center;
    padding: 20px;
    margin-top: 30px;
}
```

**Verification checklist:**
- [ ] Header is dark with white text
- [ ] Navigation buttons are blue
- [ ] Buttons change color on hover
- [ ] Main content is centered and has max-width
- [ ] Cards have consistent styling
- [ ] Footer is at bottom with dark background
- [ ] Overall layout looks professional

---

## Activity 7: Hover Effects

Create interactive elements:

```css
/* Links */
a {
    color: #007bff;
    text-decoration: none;
    transition: all 0.3s ease;
}

a:hover {
    color: #0056b3;
    text-decoration: underline;
}

/* Buttons */
.button {
    transition: all 0.3s ease;
}

.button:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.button:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Cards */
.card {
    transition: all 0.3s ease;
}

.card:hover {
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    transform: translateY(-4px);
}
```

**Test by:**
- [ ] Hovering over links (should change color and underline)
- [ ] Hovering over buttons (should lift up with shadow)
- [ ] Clicking buttons (should feel pressed)
- [ ] Hovering over cards (should lift up)

---

## Activity 8: Responsive Newsletter Signup

Create a form-based layout:

```html
<div class="newsletter">
    <h2>Subscribe to Our Newsletter</h2>
    <p>Get the latest updates delivered to your inbox.</p>
    
    <form>
        <input type="email" placeholder="Enter your email" required>
        <button type="submit" class="button-primary">Subscribe</button>
    </form>
</div>
```

**CSS:**
```css
.newsletter {
    background-color: #ecf0f1;
    padding: 40px;
    border-radius: 8px;
    max-width: 500px;
    margin: 30px auto;
    text-align: center;
}

.newsletter h2 {
    color: #2c3e50;
    margin-top: 0;
    font-size: 1.8rem;
}

.newsletter p {
    color: #7f8c8d;
    margin-bottom: 20px;
}

form {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
}

input[type="email"] {
    padding: 12px 15px;
    border: 1px solid #bdc3c7;
    border-radius: 4px;
    font-size: 1rem;
    min-width: 250px;
}

input[type="email"]:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0,123,255,0.25);
}

.button-primary {
    padding: 12px 30px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    transition: all 0.3s ease;
}

.button-primary:hover {
    background-color: #0056b3;
}

.button-primary:active {
    transform: scale(0.98);
}
```

**Verification:**
- [ ] Form is centered
- [ ] Input has proper padding and border
- [ ] Input focuses with blue highlight
- [ ] Button is blue and clickable
- [ ] Button changes color on hover
- [ ] Visual hierarchy is clear (heading > text > input)
- [ ] Spacing is consistent and professional

---

## 📊 Reflection Questions

Answer these in your notes:

1. **What's the difference between margin and padding?**
   - Padding: inside, pushes content away from border
   - Margin: outside, creates space between elements

2. **Why use external CSS instead of inline?**
   - Reusable across multiple files
   - Keeps HTML clean
   - Easier to maintain
   - Browser can cache it

3. **What does "cascading" mean in CSS?**
   - Styles flow downward, last rule wins
   - More specific selectors override general ones

4. **How would you center a block element horizontally?**
   - `margin: 0 auto;` (if it has a width)
   - or use `display: flex;` with `justify-content: center;`

5. **When would you use an ID selector vs a class?**
   - ID: unique elements, used once per page
   - Class: elements that appear multiple times, multiple styling instances

---

Let me know when you've completed these activities!
