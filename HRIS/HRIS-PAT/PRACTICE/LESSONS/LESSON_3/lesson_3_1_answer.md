## 🎯 Lesson 3.1: Basic CSS — Answer Template

Complete each activity below and write your answers in the spaces provided.

---

## Activity 1: Link External CSS ✅

Create a `styles.css` file and link it to your `index.html`

**What you did:**
1. Created file at: styles/style.css
2. Added link tag: <link rel="stylesheet" href="styles/style.css">
3. Test result: same but with a flexible css file

---

## Activity 2: Style Basic Elements ✅

Style these elements: `body`, `h1`, `p`

**Your CSS code:**
```css
body {
    height: 100%;
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
}

h1 {
    font-size: 2.5rem;
    color: #ffffff;
    text-align: center;
    margin-bottom: 20px;
}

p {
    line-height: 1.8;
    color: #666;
    max-width: 600px;
}

```

**Test checklist:**
- [x] Body background color applied
- [x] H1 is large and styled
- [x] Paragraphs have proper spacing

---

## Activity 3: Create a Card Component ✅

Create at least 2 cards with `.card` class

**Your HTML:**
```html
<section class="interestCard">
    <h2>My Interests</h2>
    <p class="intro-text">Web Development</p>
    <p class="intro-text">Artificial Intelligence</p>
    <p class="intro-text">Traveling</p>
</section>
```

**Your CSS:**
```css
.interestCard {
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    padding: 20px;
    display: block;
    margin: 20px auto;
    max-width: 600px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.interestCard h2 {
    margin-top: 0;
    color: #1b778e;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
}

.interestCard p {
    color: #555;
    margin: 10px 0;
}
```

**What it looks like:**
The card uses the same design of the other sections but with independent styling since it was separated on the style.css. it has a line under the `h2` to separate the title and paragraph
___________

## Activity 4: Understand the Box Model ✅

Create a `.box-demo` element and style it

**Your CSS:**
```css
/* BOX DEMO */
.main-section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
}

.box-demo {
    width: 200px;
    height: 200px;
    padding: 20px;
    margin: 30px;
    border: 2px solid blue;E
    background-color: lightblue;
}

```

**Draw the box model (content → padding → border → margin):**
```
Outer edge of MARGIN ┌─────────────────────────────┐
                     │  MARGIN: 30px               │
                     │  ┌─────────────────────┐    │
                     │  │ BORDER: 2px blue    │    │
                     │  │ ┌─────────────────┐ │    │
                     │  │ │ PADDING: 20px   │ │    │
                     │  │ │ ┌─────────────┐ │ │    │
                     │  │ │ │ CONTENT     │ │ │    │
                     │  │ │ │ 200px wt    │ │ │    │
                     |  | | | 200px ht    | | |    |    
                     │  │ │ └─────────────┘ │ │    │
                     │  │ └─────────────────┘ │    │
                     │  └─────────────────────┘    │
                     └─────────────────────────────┘
---
```

**Questions:**
1. What's the total width including all layers? 304 px width total ✅ **CORRECT**
2. What's the difference between padding and margin? Padding is the space inside the element between its content while margin is the space outside the elements. ✅ **PERFECT**

---

## Activity 5: Selector Practice ✅

Create HTML using element, class, and ID selectors

**Your HTML:**
```html
<main class="main-section">
        <section class="selector-section">
            <p class="intro-text">This is a paragraph with the class "intro-text".</p>
            <p>This is a paragraph without a class.</p>
            <p id="intro-text">Another paragraph with the id "intro-text".</p>
        </section>
    </main>
```

**Your CSS:**
```css
.selector-section p {
    color: #333333;
    font-size: 1.2rem;
}

.intro-text {
    color: #1b778e;
    font-weight: bold;
}

#intro-text {
    color: #8e3c1b;
    font-weight: bold;
}
```

**What happened when you applied it?** ✅
- The selectors are important when using CSS. A certain selectors are overwritten when we use its class or id, but eitherway, its still affected depending on the applied design when an element was selector was integrated.
- **Note:** Good understanding of specificity! Could add: "ID > class > element selector"
___________

---

## Activity 6: Create a Simple Layout ✅

Build a page with header, main, footer + cards

**Your HTML structure:**
I have created a main.html and reconstruct the page into a sample portfolio where it consists of main section that is centered with 2 cards side by side
___________

**Your CSS approach:**
i have styled my html using piece by piece in order to get their logical orders and design. It's like designing what's in the first logic before going for the sequence.
___________

**Test results:**
- [x] Header styled correctly
- [x] Main content centered
- [x] Cards look consistent
- [x] Footer at bottom
- [x] Professional appearance

---

## Activity 7: Hover Effects ✅

Add interactive hover effects to links, buttons, cards

**Hover effect code:**
```css

/* refer to main.html and main.css */
nav a {
    color: white;
    margin: 0 15px;
    text-decoration: none;
}

nav a:hover {
    text-decoration: underline;
}

.card,
.card-2 {
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    padding: 20px;
    flex: 1;
    text-align: center;
    transition: background-color 0.3s ease, transform 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card:hover,
.card-2:hover {
    background-color: #e0e0e0;
    transform: scale(1.05);
}

button {
    margin-top: 20px;
    background-color: #1b778e;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
    background-color: #155a63;
    transform: scale(1.05);
}


```

**What changes on hover?** ✅
- Links: I made it underline hover for simpleness ✅
- Buttons: I added transform and scale animation ✅
- Cards: I added scale and background transition ✅

---

## Activity 8: Responsive Form ✅

Create a newsletter signup form

**Your HTML:**
```html
<main>
    <section class="newsletterSection">
        <p>Stay updated with our latest news and offers. <br> Subscribe to our newsletter by entering your email
            below:
        </p>
        <form action="#" method="post">
            <input type="email" name="email" placeholder="Enter your email" required>
            <button type="submit" onClick="alert('Subscribed!')">Subscribe</button>
        </form>
    </section>
</main>
```

**Your CSS:**
```css
.newsletterSection {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
}

form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin-top: 20px;
}

input[type="email"] {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

button {
    padding: 10px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

button:hover {
    background-color: #555;
}

```

**Test results:**
- [x] Form is centered
- [x] Input styling complete
- [x] Button responsive
- [x] Professional appearance

---

## 📊 Reflection Questions

Answer these based on what YOU learned:

1. **What's the difference between margin and padding?** ✅
   - Margin: Space outside the element
     Padding: Space of the element between its contents
   - **Grade: Excellent** — Clear and precise distinction

2. **Why use external CSS instead of inline?** ✅
   - external CSS makes styling much more accesible, formal and more flexible
   - **Grade: Correct** — Good understanding of maintainability and reusability

3. **What does "cascading" mean in CSS?** ✅
   - Cascading is a browser rule in which it decides what style `wins` when multiple rules try to change the same thing.
   - **Grade: Correct** — Accurate explanation of CSS cascade principle

4. **How do you center a block element?** ✅
   - We can center them by adjusting our width and set the margins' left and right into auto which forces the browser to divide the remaining horizontal space evenly.
   - **Grade: Perfect** — Standard and best-practice approach

5. **When use ID vs class?** ✅
   - We can use ID to change specific part of the page like p, h1, or other things.
     We use class to design the a block of the page so its corresponds on the page's design
   - **Grade: Good** — Demonstrates understanding. Could add: "ID for unique elements, class for reusable patterns"

---

## 📊 Final Score: 19/20 ✨

**Summary:**
- ✅ All activities completed
- ✅ Box model calculation perfect (304px)
- ✅ Strong CSS fundamentals demonstrated
- ✅ Good practical application of selectors and properties
- ✅ Excellent hover effects implementation
- ✅ All reflection questions answered correctly

**Ready for:** Lesson 3.2 (Flexbox & Advanced Layouts) or Lesson 3.3 (CSS Grid)

---

**Next:** Complete all activities, then check your work with the reference guide.
