# Chapter 3: Styling the Web with CSS

## Lesson 3.5: Tailwind CSS & Production QA

You've mastered raw CSS — layouts, hover states, animations. You know *how* CSS works under the hood. Now it's time to learn how the **real HRIS project** actually writes its CSS every day: with **Tailwind CSS**.

In this lesson, you'll learn why Tailwind exists, how to read it, and how to apply it. You'll also do your first **Production QA Check** — a mini audit to make sure your UI doesn't break on mobile.

---

## Part 1: What is Tailwind CSS and Why Use It?

When you built `interactive.html`, you wrote CSS rules like this:

```css
.btn {
    background-color: #3b82f6;
    padding: 10px 16px;
    border-radius: 6px;
    font-weight: bold;
    transition: background-color 0.2s ease;
}
.btn:hover {
    background-color: #2563eb;
}
```

Then in your HTML:
```html
<button class="btn">Save</button>
```

This works fine. But there's a problem: **as the project grows, you end up with hundreds of CSS classes scattered across many files.** You have to constantly jump between your HTML and your CSS file. It also makes your CSS file massive and hard to maintain.

### Tailwind's Solution: Utility Classes

Tailwind CSS gives you hundreds of tiny, single-purpose CSS classes that you apply *directly in your HTML*. Instead of writing a custom `.btn` class, you just stack utility classes:

```html
<!-- Raw CSS approach -->
<button class="btn">Save</button>

<!-- Tailwind approach -->
<button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition">
    Save
</button>
```

At first, this looks messy. But you quickly realize it means **you never have to open a separate CSS file again.** Everything about how an element looks is visible right where the element is.

### Tailwind vs Raw CSS

| | Raw CSS | Tailwind CSS |
|---|---|---|
| **Where styles live** | Separate `.css` file | Directly in HTML |
| **Class naming** | You invent names (`.btn`, `.card`) | Pre-defined utilities (`bg-blue-500`) |
| **Bundle size** | Grows as you add CSS | Tiny — Tailwind removes unused classes at build time |
| **Speed of development** | Slower (write CSS + HTML) | Faster (just HTML) |
| **Learning curve** | Easier to start | Slightly higher (memorizing utilities) |
| **Used in HRIS?** | ❌ | ✅ Yes — exclusively |

---

## Part 2: Reading Tailwind Classes

Tailwind class names follow a very readable pattern. Once you learn the pattern, you can read any Tailwind class like plain English.

### The Pattern: `property-value`

```
bg-blue-500     → background-color: #3b82f6
text-white      → color: white
font-bold       → font-weight: bold
p-4             → padding: 1rem (16px)
px-4            → padding-left: 1rem; padding-right: 1rem
py-2            → padding-top: 0.5rem; padding-bottom: 0.5rem
m-2             → margin: 0.5rem
rounded-md      → border-radius: 6px
shadow-sm       → box-shadow: 0 1px 2px rgba(0,0,0,0.05)
text-lg         → font-size: 1.125rem
```

### The Spacing Scale

Tailwind uses a numeric scale for spacing. You just need to know the rule:

| Class | Value | In pixels |
|---|---|---|
| `p-1` | 0.25rem | 4px |
| `p-2` | 0.5rem | 8px |
| `p-4` | 1rem | 16px |
| `p-6` | 1.5rem | 24px |
| `p-8` | 2rem | 32px |

This applies to `m-` (margin), `px-`, `py-`, `mx-`, `my-`, `gap-`, `w-`, `h-` as well.

### Common Utilities You'll Use Daily

```
Layout:
flex            → display: flex
grid            → display: grid
block           → display: block
hidden          → display: none
items-center    → align-items: center
justify-between → justify-content: space-between
gap-4           → gap: 1rem

Sizing:
w-full          → width: 100%
w-64            → width: 16rem (256px)
h-screen        → height: 100vh
max-w-md        → max-width: 28rem

Text:
text-sm         → font-size: 0.875rem
text-base       → font-size: 1rem
text-xl         → font-size: 1.25rem
text-gray-700   → color: #374151
font-semibold   → font-weight: 600
text-center     → text-align: center

Colors:
bg-white        → background-color: white
bg-gray-100     → background-color: #f3f4f6
bg-blue-500     → background-color: #3b82f6
border-gray-300 → border-color: #d1d5db
text-red-500    → color: #ef4444

Borders & Shadows:
border          → border-width: 1px
border-2        → border-width: 2px
rounded         → border-radius: 4px
rounded-lg      → border-radius: 8px
rounded-full    → border-radius: 9999px (circle)
shadow          → a standard box shadow
shadow-lg       → a larger box shadow
```

---

## Part 3: Hover, Focus, and State Modifiers

Remember pseudo-classes from Lesson 3.4? Tailwind has them too, using **prefixes**:

```html
<!-- :hover -->
<button class="bg-blue-500 hover:bg-blue-600 transition">
    Save
</button>

<!-- :focus -->
<input class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />

<!-- :disabled -->
<button class="bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
    Locked
</button>
```

The rule is simple: put the **state name followed by a colon** before the utility class.

- `hover:bg-blue-600` → apply `background-color: #2563eb` on hover
- `focus:border-blue-500` → apply `border-color: #3b82f6` on focus
- `disabled:opacity-50` → apply `opacity: 0.5` when disabled

---

## Part 4: Responsive Prefixes

This is where Tailwind truly shines. Making a layout responsive takes just a few extra characters.

Tailwind uses a **mobile-first** approach:
- Classes without a prefix apply to **all screen sizes** (mobile first)
- Prefixed classes like `md:` apply only on **medium screens and above**

```
sm:   → @media (min-width: 640px)
md:   → @media (min-width: 768px)
lg:   → @media (min-width: 1024px)
xl:   → @media (min-width: 1280px)
```

### Example: Responsive Grid

```html
<!-- Mobile: 1 column. Tablet (md): 2 columns. Desktop (lg): 3 columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div class="bg-white p-4 rounded shadow">Card 1</div>
    <div class="bg-white p-4 rounded shadow">Card 2</div>
    <div class="bg-white p-4 rounded shadow">Card 3</div>
</div>
```

You just solved 3.3's entire responsive grid exercise in a single class string!

---

## Part 5: Reading Real HRIS Code

Now that you know the vocabulary, you can read the actual HRIS component code. Let's look at a real button from the project:

```tsx
// From hris/src/components/create-button.tsx
<button
  className="
    inline-flex items-center gap-2
    bg-blue-600 hover:bg-blue-700
    text-white text-sm font-medium
    px-4 py-2
    rounded-md
    transition-colors duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
  "
>
  Create Employee
</button>
```

Read it line by line in plain English:
- `inline-flex items-center gap-2` → "lay out the icon and text side-by-side, centered, with a small gap"
- `bg-blue-600 hover:bg-blue-700` → "blue background that darkens on hover"
- `text-white text-sm font-medium` → "white, small, medium-weight text"
- `px-4 py-2` → "16px left/right padding, 8px top/bottom"
- `rounded-md` → "slightly rounded corners"
- `transition-colors duration-200` → "smoothly animate color changes over 0.2 seconds"
- `disabled:opacity-50 disabled:cursor-not-allowed` → "faded and blocked cursor when disabled"

**You just read production React code.**

---

## Part 6: The Production QA Checklist

When you finish building any UI — even a practice one — you should run a quick **QA (Quality Assurance) check** before calling it done. Here are the 3 most important checks:

### ✅ Check 1: Mobile Overflow (No Horizontal Scrollbar)

> Shrink your browser window to **360px wide** (the smallest common phone screen).
> There should be **zero horizontal scrolling**.

A horizontal scrollbar means something is overflowing off the screen — a fixed-width element, text that doesn't wrap, or a flex row that doesn't wrap. Fix it with `max-w-full`, `overflow-x-hidden`, or `flex-wrap`.

### ✅ Check 2: Color Contrast (Text is Readable)

> Light gray text on a white background might look sleek but could fail accessibility standards.

**Rule of thumb:**
- Body text should be at least `text-gray-700` on white
- Use `text-gray-500` or lighter only for helper text / placeholders
- Never use `text-gray-300` on a `bg-white` surface for important content

### ✅ Check 3: Focus States (Keyboard Navigation Works)

> Click into your form. Now press `Tab` to jump between inputs.
> Can you visually *see* which element is focused?

Every input and button should have a visible `:focus` ring. In Tailwind:
```html
<input class="focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400" />
```
If `focus:outline-none` is set without a replacement ring, keyboard users are effectively blind.

---

## 📝 Activity: Rebuild the "Edit Employee" Form in Tailwind

Now it's your turn. You already built the "Edit Employee" form in Lesson 3.4 using raw CSS. This time, you'll rebuild it using **only Tailwind utility classes** — no `<style>` tag, no `.css` file.

**Setup:** For this activity, you don't need a full React project. Use the CDN link to get Tailwind in a plain HTML file.

### Step 1: Create the file

Create `tailwind_form.html` inside your `PRACTICE/html/` folder with this starter:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Form Practice</title>
    <!-- This loads Tailwind CSS from the internet (CDN) — no install needed! -->
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center">

    <!-- Build your form here! -->

</body>
</html>
```

### Step 2: Build the form

Inside `<body>`, recreate the "Edit Employee" form with Tailwind classes. Your form must include:

1. **A white card container** (`bg-white`, `rounded-lg`, `shadow-md`, `p-8`, `w-96`)
2. **A heading** `Edit Employee` (`text-xl`, `font-bold`, `mb-6`, `text-gray-800`)
3. **Two labeled inputs**: First Name and Department
   - Label: `block text-sm font-medium text-gray-700 mb-1`
   - Input: `w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`
4. **A "Save Changes" button**: `w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors duration-200 mb-2`
5. **A "Locked" disabled button**: `w-full bg-gray-300 text-gray-500 font-semibold py-2 rounded-md cursor-not-allowed opacity-60`

### Step 3: Run the Production QA Checklist

After building the form, complete these 3 checks:

1. **Mobile check:** Shrink your browser window to 360px. Does anything overflow or look broken?
2. **Contrast check:** Is the text on every element easy to read? Is there enough contrast?
3. **Focus check:** Click into the First Name input. Can you see a blue focus ring? Press Tab — does the focus ring move to the Department input, then the buttons?

---

## 🧪 Test Checklist

Before filling in your answer file, verify all of these yourself:

- [x] `tailwind_form.html` built with **zero** `<style>` tags or external `.css` files
- [x] Both inputs have linked `<label>` tags (using `for` and `id`)
- [x] Inputs show a visible blue focus ring on click/tab
- [x] "Save Changes" button visibly darkens on `:hover`
- [x] "Locked" button appears faded and shows `cursor-not-allowed`
- [x] No horizontal scroll at 360px viewport width
- [x] All text is readable (sufficient contrast)

---

## 💬 Reflection Questions

Answer these in your `lesson_3_5_answer.md` file:

1. **In your own words, what is the main difference between writing raw CSS and writing Tailwind CSS?**
   > ___________

2. **What does `md:grid-cols-2` mean? Break down each part of that class.**
   > ___________

3. **What is the purpose of the `transition-colors` class? What would the button look like without it?**
   > ___________

4. **What does "mobile-first" mean in Tailwind? Why is it better to start from mobile and scale up?**
   > ___________

---

## 📊 Final Score: ___/10

**Summary:**
- [ ] Activity completed (`tailwind_form.html` built)
- [ ] All 7 checklist items pass
- [ ] Production QA checklist completed (3 checks)
- [ ] Reflection questions answered

**Ready for:** Lesson 3.5.0 — Node.js & the Frontend Development Environment
