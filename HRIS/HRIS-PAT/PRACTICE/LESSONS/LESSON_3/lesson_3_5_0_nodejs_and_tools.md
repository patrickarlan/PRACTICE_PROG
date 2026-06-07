# Chapter 3.5: The Frontend Toolchain — Node.js, npm & Vite

*You've been running HRIS this whole time — which means you've already been using these tools. This lesson just puts names to what's already happening under the hood.*

---

## Part 1: What is Node.js?

Your browser runs JavaScript inside the browser. **Node.js lets JavaScript run on your computer** — outside the browser, like any normal program.

You don't use it to write your app's UI. You use it to **power the tools that build your app**.

> **In HRIS:** Node.js runs Vite (the dev server), compiles TypeScript, and installs packages. Without it, you couldn't run `npm run dev`.

That's all you need to know conceptually. The three things it gives you are:

| Tool | What it does |
|---|---|
| `node` | Runs JavaScript files on your computer |
| `npm` | Installs code libraries (packages) |
| `npx` | Runs a package without installing it permanently |

---

## Part 2: The 3 npm Commands You Use Every Day

```bash
# 1. Install all project dependencies (run once after cloning)
npm install

# 2. Start the development server with hot reload
npm run dev

# 3. Build the app for production (creates a dist/ folder)
npm run build
```

That's 90% of your daily npm usage. Everything else is rare.

---

## Part 3: Reading `package.json`

`package.json` is the **blueprint of your project**. It tells Node.js what libraries your app needs and what commands to run.

Open `hris/package.json`. Here's what each section means:

```json
{
  "scripts": {
    "dev":     "vite",              // npm run dev   → starts dev server
    "build":   "tsc && vite build", // npm run build → TypeScript check, then bundle
    "lint":    "eslint ..."         // npm run lint  → checks code style
  },
  "dependencies": {
    "react": "^18.3.1"              // Libraries shipped WITH your app
  },
  "devDependencies": {
    "typescript": "^5.2.2"          // Libraries only used DURING development
  }
}
```

**Key rule:** `dependencies` go to production. `devDependencies` do not.

---

## Part 4: Vite — What Happens When You `npm run dev`

```
You type: npm run dev
    ↓
Vite starts a server on localhost:5173
    ↓
Vite watches your .tsx and .ts files
    ↓
When you save a file → Vite recompiles it in milliseconds
    ↓
Browser updates INSTANTLY — no manual refresh needed (Hot Module Replacement)
```

This is why you see changes live while coding. That's Vite doing its job.

---

## Part 5: `.env` Files — One Rule to Remember

The `.env` file stores configuration that changes between environments (local, staging, production).

```
# hris/.env
VITE_API_URL=http://localhost:5107
```

**The one rule:** In Vite, any variable must start with `VITE_` to be accessible in your code.

```typescript
// How you use it in code:
const apiUrl = import.meta.env.VITE_API_URL;
```

**Never commit `.env` to Git** — it's in `.gitignore` for a reason. It can contain secrets. Commit `.env.example` (a blank template) instead.

---

## Part 6: `node_modules` — Don't Touch It

After `npm install`, a `node_modules/` folder appears. It contains thousands of files — all the libraries your app and Vite need.

**Rules:**
- ✅ Never edit files inside `node_modules/`
- ✅ Never commit it to Git (it's in `.gitignore`)
- ✅ If something breaks, delete it and run `npm install` again — it will be recreated

---

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
   > ___________

2. **Why does the `VITE_` prefix matter in `.env` files?**
   > ___________

3. **What is Hot Module Replacement (HMR)? Describe what you saw when you saved `App.tsx`.**
   > ___________

---

## 📊 Final Score: ___/10

**Summary:**
- [ ] Explored `package.json` and read the scripts
- [ ] Successfully ran `npm run dev` and saw the HRIS app
- [ ] Found the `VITE_API_URL` value in `.env`
- [ ] Observed hot reload in action
- [ ] Reflection questions answered

**Ready for:** Lesson 4.1 — JavaScript Fundamentals
