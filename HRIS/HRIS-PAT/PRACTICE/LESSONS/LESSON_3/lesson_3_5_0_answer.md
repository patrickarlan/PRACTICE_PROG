## 📝 Activity: Explore Your Own HRIS Project

No new files to build this time. Navigate your actual HRIS project and answer these questions in the answer file.

**Steps:**

1. Open `hris/package.json`. Find the `"scripts"` section.
2. Open a terminal, navigate to the `hris/` folder and run `npm run dev`.
3. Look at your `.env` file inside `hris/`. What is the value of `VITE_API_URL`?
4. Open your browser to `http://localhost:5173`. Open any source file (e.g., `hris/src/App.tsx`), add a comment, save — watch the browser.

---

## 💬 Reflection Questions

Answer these in `lesson_3_5_0_answer.md`:

1. **In plain English, what is the difference between `npm install` and `npm run dev`?**
   > `npm install` is used to install utilities and libraries in Node.js for frontend development while `npm run dev` is used to start the development server for the frontend development.

2. **Why does the `VITE_` prefix matter in `.env` files?**
   > the VITE_ prefix is used to identify the variables that are used in the frontend development.

3. **What is Hot Module Replacement (HMR)? Describe what you saw when you saved `App.tsx`.**
   > HMR is a feature of Vite that allows you to see the changes you make in your code reflected in the browser without having to manually refresh the page. It is a feature that is used in frontend development to speed up the development process.

---

## 📊 Final Score: 10/10

**Summary:**
- [x] Explored `package.json` and read the scripts
- [x] Successfully ran `npm run dev` and saw the HRIS app
- [x] Found the `VITE_API_URL` value in `.env`
- [x] Observed hot reload in action
- [x] Reflection questions answered

**Ready for:** Lesson 4.1 — JavaScript Fundamentals
