# Lesson 3.5: Frontend Development Environment & Node.js — Answer Guide

## Activity 1: Install Node.js

**Expected Outcome:**
- Node.js LTS version installed (e.g., v20.x.x or v22.x.x)
- npm comes automatically with Node.js

**Verification:**
```bash
node --version
# Output: v20.13.0 (or similar — exact version depends on when you installed)

npm --version
# Output: 10.5.0 (or similar)
```

**Troubleshooting:**
- If `node --version` gives an error: Node.js is not installed or not in PATH
- If command not found after installing: Restart Git Bash/terminal after installation
- On Windows: Use Git Bash, not Command Prompt (may require restart)

---

## Activity 2: Create Your First Node.js Program

**File: `PRACTICE/nodejs/hello.js`**

```javascript
console.log("I am learning Node.js!");

// Extra examples:
const name = "Patrick";
console.log(`Hello, ${name}!`);

const numbers = [1, 2, 3, 4, 5];
numbers.forEach(num => console.log(`Number: ${num}`));
```

**To Run:**
```bash
cd PRACTICE/nodejs
node hello.js
```

**Expected Output:**
```
I am learning Node.js!
Hello, Patrick!
Number: 1
Number: 2
Number: 3
Number: 4
Number: 5
```

**Reflection Questions:**
- Q: Is this code running in a browser? 
  A: No, it's running directly on your computer via Node.js.
- Q: Could this code use `window` or `document`?
  A: No — those are browser APIs. Node.js is a different environment.

---

## Activity 3: Explore HRIS package.json

**File Location:** `HRIS-PAT/hris/package.json`

**Expected Content (from that file):**

```json
{
  "name": "hris-frontend",
  "version": "1.0.0",
  "type": "module",
  "description": "Frontend for the HRIS project",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --report-unused-disable-directives-skip-comment",
    "test": "vitest"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0",
    "@tanstack/react-query": "^5.66.0",
    "@shadcn/ui": "^0.8.0",
    "tailwindcss": "^3.4.1"
  },
  "devDependencies": {
    "typescript": "^5.2.2",
    "vite": "^5.4.0",
    "eslint": "^8.50.0",
    "@vitejs/plugin-react": "^4.0.3"
  }
}
```

**Explanation of Scripts (Plain English):**

| Script | Command | Purpose |
|--------|---------|---------|
| `npm run dev` | `vite` | Start the development server on localhost:5173 with hot reload |
| `npm run build` | `tsc && vite build` | Check TypeScript for errors, then create optimized production build in `dist/` |
| `npm run preview` | `vite preview` | Serve the production build locally to test it before deployment |
| `npm run lint` | `eslint ...` | Check code for style violations and report issues |
| `npm run test` | `vitest` | Run unit tests for the project |

**Key Dependencies:**
- `react` — The UI framework
- `react-dom` — React's DOM binding (renders React to HTML)
- `react-router-dom` — Client-side routing (page navigation)
- `@tanstack/react-query` — Data fetching & caching
- `@shadcn/ui` — Pre-built UI components
- `tailwindcss` — Utility-first CSS framework

**Reflection:**
- Q: Why is `typescript` in devDependencies, not dependencies?
  A: TypeScript is only used during development. It compiles to JavaScript before deployment. The browser runs JavaScript, not TypeScript.

---

## Activity 4: Start HRIS Dev Server

**Steps:**

```bash
# Navigate to the frontend folder
cd c:/Users/HP/Documents/PRACTICE_PROG/HRIS/HRIS-PAT/hris

# If this is your first time, install dependencies
npm install

# Start the dev server
npm run dev
```

**Expected Output:**
```
✨ Vite v5.4.0  ready in 1256 ms

➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

**What to Do:**
1. Open your browser and go to http://localhost:5173
2. The HRIS frontend loads
3. Open `src/App.tsx` in your editor
4. Change something visible (e.g., the title or a component text)
5. Save the file
6. **Watch the browser update instantly without a full refresh**

**Observing Hot Module Replacement (HMR):**
- Original code: `<h1>HRIS Dashboard</h1>`
- You change it to: `<h1>HRIS Dashboard (Updated!)</h1>`
- You save the file
- The browser automatically updates (no F5 refresh needed)
- The React state is preserved (if you had input fields with text, that text stays)

**Troubleshooting:**
- `Port 5173 is already in use`: Another app is using this port. Close it or run `npm run dev -- --port 5174`
- `ENOENT: no such file or directory, open 'node_modules/...'`: Run `npm install` again
- Dev server crashes: Check the error message in the terminal, likely a TypeScript error in your code

---

## Activity 5: Understand .env Configuration

**File Location 1:** `HRIS-PAT/hris/.env` (don't commit this)
```
VITE_API_URL=http://localhost:5107
VITE_ENVIRONMENT=development
```

**File Location 2:** `HRIS-PAT/hris/.env.example` (safe to commit)
```
VITE_API_URL=http://localhost:5107
VITE_ENVIRONMENT=development
```

**Why .env is in .gitignore:**
- `.env` contains your local configuration
- If you change `VITE_API_URL` to your staging server, you don't want to commit that
- Each developer might have a different local setup

**Why .env.example exists:**
- New developers see what environment variables are needed
- They copy it: `cp .env.example .env`
- Then fill in their own values

**How to Use These Variables in Code:**

```typescript
// config.ts
const API_URL = import.meta.env.VITE_API_URL;
// import.meta.env.VITE_API_URL = "http://localhost:5107"

const request = await fetch(`${API_URL}/api/employees`);
```

**Important:** Only variables with the `VITE_` prefix are exposed to the browser. This is a security feature — you don't want to accidentally expose secrets like database passwords to the client-side code.

---

## Activity 6: npm install Workflow

**Steps:**

```bash
cd c:/Users/HP/Documents/PRACTICE_PROG/HRIS/HRIS-PAT/hris

# Delete node_modules to simulate a fresh start
rm -rf node_modules

# Reinstall from scratch
npm install
```

**What Happens:**
1. npm reads `package-lock.json` (the exact recipe)
2. Downloads each package from npmjs.org
3. Creates `node_modules/` folder with thousands of files
4. Installs the exact versions specified in `package-lock.json`

**Finding React's Version in package-lock.json:**

```bash
grep -A 5 '"react":' package-lock.json | head -10
```

Or manually:
1. Open `package-lock.json`
2. Search for `"react":`
3. Look for the nested `"version"` field

**Expected Output (partial):**
```json
"node_modules/react": {
  "version": "18.3.1",
  "resolved": "https://registry.npmjs.org/react/-/react-18.3.1.tgz",
  "integrity": "sha512-wS+hAgJShR0KhQn0Cc4VOpJanxI9F5P8qfRCo/sDg8fHqfBrTJG5L+1HT2Ey5a+3YMBTH0fJ1K0aBxRXVa0FEg=="
}
```

**Reflection Questions:**
- Q: Why should you commit `package-lock.json` but not `node_modules/`?
  A: `package-lock.json` is small and specifies exact versions. `node_modules/` is huge (100MB+) and can be regenerated from `package-lock.json`.
- Q: Why do you need `npm install`?
  A: Because you can't commit `node_modules/` to Git. When you clone a repo, you need to reinstall all dependencies.

---

## Bonus: Understanding npm semver

**Semantic Versioning Examples:**

```json
"react": "18.3.1"        // MAJOR . MINOR . PATCH
```

- `18` = Major version (breaking changes)
- `3` = Minor version (new features, backward compatible)
- `1` = Patch version (bug fixes only)

**Version Ranges:**

```json
"react": "^18.3.1"   // Allow 18.x.x (e.g., 18.5.2 OK, 19.0.0 NOT OK)
"react": "~18.3.1"   // Allow 18.3.x (e.g., 18.3.5 OK, 18.4.0 NOT OK)
"react": "18.3.1"    // Exact version only (18.3.1 OK, 18.3.2 NOT OK)
"react": "*"         // Any version (DANGEROUS, don't do this)
"react": ">=18.0.0"  // 18.0.0 or higher
```

**Real-World Example:**
```json
{
  "dependencies": {
    "react": "^18.3.1",           // Accept 18.3.1 - 18.99.99
    "tailwindcss": "^3.4.1",      // Accept 3.4.1 - 3.99.99
    "@tanstack/react-query": "^5.66.0"  // Accept 5.66.0 - 5.99.99
  }
}
```

When you run `npm install`, npm installs the **latest compatible version** that satisfies these ranges. That exact version is then locked in `package-lock.json`.

---

## Summary Checklist

- ✅ Node.js and npm installed
- ✅ Created `hello.js` and ran it with `node`
- ✅ Explored HRIS `package.json` and explained each script
- ✅ Started `npm run dev` and observed the app on localhost:5173
- ✅ Changed a file and saw hot reload in action
- ✅ Understood the purpose of `.env` vs `.env.example`
- ✅ Ran `npm install` and found React's version in `package-lock.json`
- ✅ Understand that Node.js is the runtime, npm is the package manager, and Vite is the build tool

**Next Steps:** You're ready for Unit 4: JavaScript & TypeScript Basics. You now understand the environment where JavaScript code will run!
