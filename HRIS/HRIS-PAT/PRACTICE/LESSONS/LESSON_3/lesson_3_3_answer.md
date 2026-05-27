# Lesson 3.3: CSS Grid & Responsive Design - Activities & Answers

Use this file to record your progress and answers for Lesson 3.3.

---

## 📝 Activity 1: The Mobile-First Dashboard & Activity 2: The Desktop Upgrade

*(Instructions are in `lesson_3_3_grid_and_responsive.md`)*

**Your HTML (`grid.html`):**
```html
<body>
    <div class="app-layout">
        <header class="app-header">HRIS System</header>
        <aside class="app-sidebar">HRIS Sidebar</aside>
        <main class="app-content">HRIS Content</main>
        <footer class="app-footer">@2026 HRIS</footer>
    </div>
</body>


```

**Your CSS (`styles.css` or inside `<style>`):**
```css
/* MOBILE-FIRST CSS */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            min-height: 100vh;
        }

        .app-layout {
            display: grid;
            min-height: 100vh;
            gap: 10px;

            grid-template-columns: 1fr;
            grid-template-rows: auto auto 1fr auto;
            grid-template-areas:
                "header"
                "sidebar"
                "content"
                "footer";
        }

        .app-header {
            grid-area: header;
            background: #5e90c8;
            padding: 24px 32px;
            color: white;
        }

        .app-sidebar {
            grid-area: sidebar;
            background: #d4d8e3;
            padding: 24px 16px;
        }

        .app-content {
            grid-area: content;
            padding: 32px;
        }

        .app-footer {
            grid-area: footer;
            background: #2c3e50;
            color: white;
            padding: 16px 32px;
        }

        @media (min-width:768px) {
            .app-layout {
                grid-template-columns: 250px 1fr;
                grid-template-rows: auto 1fr auto;
                grid-template-areas:
                    "header header"
                    "sidebar content"
                    "footer footer";
            }
        }

```

**Test checklist:**
- [x] You included `<meta name="viewport" ...>` in the `<head>`
- [x] On mobile (narrow screen), the layout is a single column stack
- [x] At 768px (wider screen), the sidebar pops to the left side
- [x] At 768px, the Header and Footer stretch across the entire top and bottom

---

## 📊 Reflection Questions

Answer these based on what YOU learned:

1. **What is the golden rule for choosing between Flexbox and CSS Grid?**
   > CSS Grid is for 2D layouts (rows AND columns). CSS Flexbox is for 1D layouts (a row OR a column).

2. **What does the `fr` unit mean in CSS Grid? Why is `1fr 1fr 1fr` better than `33% 33% 33%`?**
   > fr means fraction of the available space. it is better than percentage because it automatically adjusts to the available space.

3. **In "Mobile-First Design", why do we write the mobile CSS first and use `@media (min-width: 768px)` for desktop, instead of doing it the other way around?**
   > We write the mobile CSS first and use `@media (min-width: 768px)` for desktop because it is easier to maintain and debug. It is also more efficient because it only loads the CSS that is needed for the current device.

4. **What does `grid-column: 1 / -1;` do?**
   > grid-column: 1 / -1; stretches the element to span across all columns of the grid.

---

## 📊 Final Score: 10/10

**Summary:**
- [x] Activities 1 & 2 completed
- [x] `grid.html` is fully responsive in the browser
- [x] Reflection questions answered

**Ready for:** Lesson 3.4 (Interactive UI)

---

**Next:** Build your responsive grid, paste your code here, and answer the questions. Then let me know so I can review it!
