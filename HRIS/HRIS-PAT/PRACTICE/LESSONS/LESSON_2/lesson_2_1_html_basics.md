# Chapter 2: The Skeleton of the Web — HTML

## Lesson 2.1: HTML Basics — Building the Structure

Every website you visit is built on **HTML** (HyperText Markup Language). HTML is the skeleton—it defines the structure and content of a webpage. Without HTML, there is no webpage.

**In plain English:** HTML is the blueprint that tells your browser: "This is a heading. This is a paragraph. This is a link. This is an image."

---

## Part 1: What is an HTML Tag?

An **HTML tag** is a label that wraps content to give it meaning and structure.

### Opening and Closing Tags

Most HTML tags come in pairs: **opening** and **closing**.

```html
<tagname>content goes here</tagname>
```

**Examples:**

```html
<p>This is a paragraph.</p>
<h1>This is a heading.</h1>
<a href="https://google.com">Click me to go to Google</a>
```

**In plain English:** The opening tag says "Start here." The closing tag says "Stop here." Everything in between is the content.

---

## Part 2: Common HTML Tags

### **Headings (`<h1>` through `<h6>`)**

Headings show the importance of content. `<h1>` is the most important, `<h6>` is the least.

```html
<h1>Main Title — Most Important</h1>
<h2>Subtitle</h2>
<h3>Section heading</h3>
<h6>Least important heading</h6>
```

**In plain English:** Think of headings like a book outline. The title is H1. Chapter names are H2. Section names are H3.

---

### **Paragraphs (`<p>`)**

The `<p>` tag wraps text content. It automatically adds space before and after the paragraph.

```html
<p>This is a paragraph of text. The browser will automatically wrap text to fit the screen.</p>
<p>This is another paragraph. Notice the space between paragraphs.</p>
```

**Output:**
```
This is a paragraph of text. The browser will automatically wrap text to fit the screen.

This is another paragraph. Notice the space between paragraphs.
```

---

### **Links (`<a>`)**

The `<a>` tag creates a clickable link. The `href` attribute tells the browser where to go.

```html
<a href="https://google.com">Click here to visit Google</a>
<a href="https://github.com">Go to GitHub</a>
```

**Key attribute:** `href="URL"` — The URL where the link points to.

---

### **Images (`<img>`)**

The `<img>` tag displays an image. Unlike most tags, it doesn't have a closing tag.

```html
<img src="https://via.placeholder.com/200" alt="A placeholder image">
```

**Key attributes:**
- `src="URL"` — The URL of the image file
- `alt="text"` — Alternative text if the image doesn't load (also for accessibility)

**In plain English:** `src` is "Where is the picture?" and `alt` is "What should I show if the picture is broken?"

---

### **Division (`<div>`)**

The `<div>` tag is a **container** that groups related content together. It's invisible by itself but useful for organizing and styling.

```html
<div>
    <h2>Product Card</h2>
    <p>Price: $19.99</p>
    <p>In stock</p>
</div>
```

**In plain English:** A `<div>` is like a box. You put things inside it to keep them organized.

---

### **Span (`<span>`)**

The `<span>` tag is like a `<div>`, but it's **inline** (doesn't create new lines). Use it for small chunks of text.

```html
<p>This word is <span style="color: red;">red</span> and this is normal.</p>
```

**Output:**
```
This word is red and this is normal.
```

---

## Part 3: HTML Attributes

An **attribute** is extra information about a tag. It goes inside the opening tag.

### **Syntax:**

```html
<tagname attribute="value">content</tagname>
```

---

### **Common Attributes:**

**`href`** — Where a link goes
```html
<a href="https://google.com">Google</a>
```

**`src`** — Where an image comes from
```html
<img src="https://example.com/image.png" alt="Description">
```

**`alt`** — Alternative text for images
```html
<img src="photo.jpg" alt="A beautiful sunset">
```

**`id`** — A unique identifier for one element
```html
<div id="main-section">This is the main section</div>
```

**In plain English:** Every element can have only ONE `id`. It's like a person's ID number—unique.

**`class`** — A label that can be used on many elements
```html
<p class="intro-text">This is an introduction.</p>
<p class="intro-text">This is another introduction.</p>
<div class="intro-text">This is also labeled as intro text.</div>
```

**In plain English:** A `class` is like a label you can stick on many things. Multiple elements can have the same class.

**`style`** — Inline CSS styling
```html
<h1 style="color: blue; font-size: 32px;">Blue Heading</h1>
```

**`type`** — Specifies the type of input or element
```html
<input type="email">
<input type="password">
```

---

## Part 4: Nesting Elements (Parent & Child)

**Nesting** means putting one element inside another. The element on the outside is the **parent**. The element on the inside is the **child**.

### **Example:**

```html
<div>
    <h2>Product Card</h2>
    <p>Price: $29.99</p>
    <a href="https://example.com">Buy Now</a>
</div>
```

In this example:
- `<div>` is the parent
- `<h2>`, `<p>`, and `<a>` are children of `<div>`

### **Rules:**

1. **Proper nesting:** Close tags in the reverse order you opened them.

✅ **Correct:**
```html
<div>
    <p>Hello</p>
</div>
```

❌ **Wrong:**
```html
<div>
    <p>Hello
</div>
</p>
```

2. **Indentation:** Indent child elements to show the hierarchy.

```html
<div>
    <h2>Title</h2>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
</div>
```

**In plain English:** Proper nesting keeps your code organized and prevents browser confusion.

---

## Part 5: The Basic HTML Skeleton

Every HTML file starts with the same structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
</head>
<body>
    <!-- All visible content goes here -->
    <h1>Welcome to My Website</h1>
    <p>This is the content users see.</p>
</body>
</html>
```

### **What Each Part Does:**

**`<!DOCTYPE html>`** — Tells the browser this is an HTML5 document

**`<html lang="en">`** — The root element. Everything goes inside this. `lang="en"` says the language is English.

**`<head>`** — Contains metadata (information about the page that users don't see)
- `<meta charset="UTF-8">` — Character encoding
- `<meta name="viewport">` — Mobile responsiveness
- `<title>` — The title shown in the browser tab

**`<body>`** — Contains all visible content

**Comments** — Notes for yourself
```html
<!-- This is a comment. It's not displayed on the page. -->
```

---

## Part 6: Example: Building a Simple Page

Let's build a page with everything we've learned:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Website</title>
</head>
<body>
    <!-- Main section with id -->
    <div id="main-section">
        <h1>Welcome to My Website</h1>
        
        <!-- Introduction paragraph with class -->
        <p class="intro-text">This is a simple HTML page showing the basics.</p>
        
        <!-- Card-like structure -->
        <div>
            <h2>About Me</h2>
            <p>I'm learning HTML basics.</p>
            <p>I'm building a website from scratch.</p>
            <p>This is fun and educational!</p>
        </div>
        
        <!-- Link to external site -->
        <p>
            <a href="https://google.com">Visit Google</a>
        </p>
        
        <!-- Image example -->
        <img src="https://via.placeholder.com/300" alt="A placeholder image">
    </div>
</body>
</html>
```

**What this page shows:**
- ✓ Basic skeleton
- ✓ Heading hierarchy
- ✓ Paragraphs
- ✓ A div with id="main-section"
- ✓ Paragraphs with class="intro-text"
- ✓ A link to Google
- ✓ An image with alt text
- ✓ Proper nesting and indentation

---

## 🎯 Practice Activities

Complete these activities and write your answers in `PRACTICE/LESSONS/LESSON_2/lesson_2_1_answer.md`.

### **Activity 1: Create the HTML Skeleton**

In `PRACTICE/html/`, create a file called `index.html`.

Write the basic HTML skeleton with:
- `<!DOCTYPE html>`
- `<html>` tag with `lang="en"`
- `<head>` with `<title>My First Webpage</title>`
- `<body>` tag (empty for now)

**Checklist:**
- [ ] File created at `PRACTICE/html/index.html`
- [ ] DOCTYPE declaration present
- [ ] HTML, head, and body tags present
- [ ] Proper nesting and indentation
- [ ] Title is set

---

### **Activity 2: Add Content**

Inside the `<body>`, add:
1. A heading (`<h1>`) — "Welcome to My Page"
2. A paragraph (`<p>`) — Write a few sentences about yourself
3. A link (`<a>`) — Link to `https://google.com` with text "Visit Google"

**Example:**
```html
<body>
    <h1>Welcome to My Page</h1>
    <p>My name is Patrick. I'm learning HTML basics...</p>
    <a href="https://google.com">Visit Google</a>
</body>
```

**Checklist:**
- [ ] H1 heading added
- [ ] Paragraph added with personal text
- [ ] Link added with correct href
- [ ] All tags properly nested and closed

---

### **Activity 3: Add an Image**

Add an `<img>` tag with a working image URL and alt text.

**Example:**
```html
<img src="https://via.placeholder.com/400x300" alt="A sample image">
```

**You can use:**
- `https://via.placeholder.com/400x300` (placeholder)
- `https://picsum.photos/400/300` (random photo)
- Any public image URL

**Checklist:**
- [ ] Image tag added
- [ ] src attribute with valid URL
- [ ] alt attribute with descriptive text
- [ ] Image displays when you open the file in browser

---

### **Activity 4: Create a Card Layout**

Create a `<div>` that contains a `<h2>` and three `<p>` tags. This simulates a card.

**Example:**
```html
<div>
    <h2>My Favorite Languages</h2>
    <p>JavaScript is fun and interactive.</p>
    <p>Python is clean and readable.</p>
    <p>C# is powerful for backend work.</p>
</div>
```

**Checklist:**
- [ ] Div created
- [ ] H2 heading inside div
- [ ] Three paragraphs inside div
- [ ] Proper nesting (all content inside div)

---

### **Activity 5: Add Attributes**

1. Add `id="main-section"` to your outer `<div>` (the card)
2. Add `class="intro-text"` to each of the three `<p>` tags

**Example:**
```html
<div id="main-section">
    <h2>My Favorite Languages</h2>
    <p class="intro-text">JavaScript is fun...</p>
    <p class="intro-text">Python is clean...</p>
    <p class="intro-text">C# is powerful...</p>
</div>
```

**Checklist:**
- [ ] id="main-section" added to div
- [ ] class="intro-text" added to all three paragraphs
- [ ] Attributes are in the opening tags
- [ ] Spelling is correct

---

### **Activity 6: Test in Browser**

1. Save your `index.html` file
2. Open your file explorer
3. Double-click `index.html` (it will open in your default browser)
4. Take a screenshot of what it looks like
5. In your answer file, paste the screenshot or describe what you see

**What to verify:**
- [ ] Page loads without errors
- [ ] Heading displays
- [ ] Paragraphs display with spacing
- [ ] Link is clickable (blue and underlined)
- [ ] Image displays
- [ ] All content is visible

---

### **Activity 7: Reflection**

In your answer file, write:

1. **What did you learn?** — Describe the HTML tags you used and what they do.

2. **What is an id vs a class?** — Explain the difference in your own words.

3. **Why do we need alt text on images?** — (Hint: think about accessibility and broken links)

4. **What's the difference between a div and a span?** — (Hint: think about line breaks)

---

## 🎓 Key Takeaways

✅ **HTML tags** are labels that give structure and meaning to content

✅ **Attributes** provide extra information (like `href`, `src`, `id`, `class`)

✅ **Nesting** means putting elements inside other elements to organize content

✅ **The HTML skeleton** is the same for every page

✅ **Proper indentation** makes code readable and prevents errors

✅ **Alt text** on images is important for accessibility

✅ **id** is unique to one element; **class** can be used on many elements

---

## 📚 What's Next?

Once you complete these activities, you'll move to **Lesson 2.2: HTML Lists & Tables**, where you'll learn:
- How to create bullet lists (`<ul>`)
- How to create numbered lists (`<ol>`)
- How to build data tables (`<table>`)

See you there! 🚀
