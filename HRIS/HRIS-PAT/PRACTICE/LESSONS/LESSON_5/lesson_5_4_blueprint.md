# Chapter 5: React.js — The Framework

## Lesson 5.4: React Routing & Single Page Applications (SPA)

You have built components, managed state, and fetched live data. Now it is time to give your portfolio **multiple pages** — without the browser ever doing a full reload. That is the core idea of a Single Page Application.

---

## Part 1: Multi-Page Website vs. Single Page Application

### The Old Way (Multi-Page Website)
Every time you click a link, the browser sends a full new request to the server, receives a completely new HTML file, and repaints the entire screen. You can see the page flash white for a split second. That is a full page reload.

```
Click "About" link
        │
        ▼
Browser sends GET /about.html to server
        │
        ▼
Server returns a completely new HTML file
        │
        ▼
Browser repaints entire screen ← (you see the white flash)
```

### The New Way (Single Page Application)
React loads ONE HTML file once. After that, clicking a "link" just tells React to swap out the component being displayed. The URL in the address bar changes, but the browser never reloads.

```
Click "About" link
        │
        ▼
React Router intercepts the click
        │
        ▼
React swaps out the displayed component
        │
        ▼
URL bar updates to /about ← (no white flash, instant!)
```

This is why React apps feel so fast and smooth — they behave more like a native desktop app.

---

## Part 2: The Pages Folder Pattern

Just like how we organized reusable pieces into `components/`, we organize top-level screens into a `pages/` folder.

```
src/
├── components/       ← Reusable building blocks (Navbar, Footer, ProjectCard)
├── pages/            ← Full screen views (one per route/URL)
│   ├── HomePage.tsx       → shown at route "/"
│   ├── ProjectsPage.tsx   → shown at route "/projects"
│   └── LoginPage.tsx      → shown at route "/login"
├── hooks/
├── lib/
└── App.tsx           ← The "router" that decides which page to show
```

Think of pages as the "rooms" in your portfolio house. Components are the "furniture" that can appear in any room.

---

## Part 3: React Router — The 4 Things You Need To Know

Your portfolio already has `react-router-dom` installed. Here are the only 4 pieces you need:

### 1. `<BrowserRouter>` — The Wrapper
Wraps your entire app and enables routing. Goes in `main.tsx`, wrapping `<App />`.

```tsx
// main.tsx
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

### 2. `<Routes>` + `<Route>` — The Map
Defines WHICH component to show for WHICH URL path. Goes in `App.tsx`.

```tsx
// App.tsx
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/login"    element={<LoginPage />} />
      </Routes>
      <Footer />
    </>
  );
}
```

Read it in plain English:
"When the URL is `/`, show `<HomePage />`. When the URL is `/projects`, show `<ProjectsPage />`."

### 3. `<Link>` — The Safe Anchor Tag
Use this instead of `<a href>` for internal navigation. It prevents the full page reload.

```tsx
import { Link } from 'react-router-dom';

// ❌ Old way — causes full page reload:
<a href="/projects">Projects</a>

// ✅ React Router way — instant, no reload:
<Link to="/projects">Projects</Link>
```

### 4. `useNavigate()` — Navigate with Code
Use this when you want to redirect the user programmatically (e.g., after clicking a button, or after a form submits successfully).

```tsx
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/projects')}>
      See My Projects
    </button>
  );
}
```

---

## Part 4: Protected Routes — Guarding Pages

Some pages should only be accessible if the user is logged in. A **Protected Route** is a wrapper component that checks a condition first. If the condition passes, it shows the page. If not, it redirects the user to login.

```
User visits /dashboard
        │
        ▼
ProtectedRoute checks: isLoggedIn?
        │
   ┌────┴─────┐
   YES        NO
   │           │
   ▼           ▼
Show        Redirect to
Dashboard   /login page
```

Here is what a simple `ProtectedRoute.tsx` looks like:

```tsx
// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  children: React.ReactNode;
}

export function ProtectedRoute({ isLoggedIn, children }: ProtectedRouteProps) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
```

Using it in `App.tsx`:
```tsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute isLoggedIn={isLoggedIn}>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

In plain English: "Before showing DashboardPage, check if the user is logged in. If not, send them to /login."

---

## 📝 Activities: Give Your Portfolio Real Pages

`react-router-dom` is already installed in your PORTFOLIO project. Let's set it up!

### Task 1: Wrap the App in BrowserRouter
1. Open `PORTFOLIO/src/main.tsx`.
2. Import `BrowserRouter` from `react-router-dom`.
3. Wrap the `<App />` component with `<BrowserRouter>`.

### Task 2: Create 2 Pages
1. Inside `PORTFOLIO/src/`, create a new folder called `pages/`.
2. Create `pages/HomePage.tsx` — Move your current hero section and GitHub card content into it.
3. Create `pages/ProjectsPage.tsx` — Move your current projects grid (`<main>` section with the ProjectCard grid) into it.
4. Both should be named exports (`export function HomePage()`).

### Task 3: Set Up Routes in App.tsx
1. In `App.tsx`, import `Routes` and `Route` from `react-router-dom`.
2. Replace the current inline content (hero, about, projects) with a `<Routes>` block.
3. Map `"/"` to `<HomePage />` and `"/projects"` to `<ProjectsPage />`.
4. Keep `<Navbar />` and `<Footer />` outside the `<Routes>` block so they appear on all pages.

### Task 4: Update Navbar Links
1. Open `Navbar.tsx`.
2. Replace the `<a href>` anchor tags with `<Link to>` from `react-router-dom`.
3. Update links: Home → `"/"`, Projects → `"/projects"`.

### Task 5: Add a useNavigate Button
1. In `HomePage.tsx`, add a button labeled "View My Projects →".
2. Use `useNavigate()` to redirect to `"/projects"` when it is clicked.

### Task 6: Create a Protected Route
1. Create `src/components/ProtectedRoute.tsx` as shown in Part 4 above.
2. In `App.tsx`, add a `useState<boolean>` called `isLoggedIn` (default `false`).
3. Add a new route `"/secret"` that is wrapped in `<ProtectedRoute>` and shows a simple page with just `<h1>Secret Page</h1>`.
4. Try visiting `/secret` in the browser — it should redirect you to `/login`.
5. Add a toggle button somewhere (e.g., in the Navbar) that sets `isLoggedIn` to `true`, then visit `/secret` again. It should now show the secret page!

---

## 🧪 Test Checklist

Update `lesson_5_4_answer.md` when done:

- [ ] `main.tsx` wraps `<App />` in `<BrowserRouter>`
- [ ] Created `src/pages/HomePage.tsx` and `src/pages/ProjectsPage.tsx`
- [ ] `App.tsx` uses `<Routes>` and `<Route>` to map URLs to pages
- [ ] `Navbar.tsx` uses `<Link to>` instead of `<a href>` for internal links
- [ ] A button in `HomePage.tsx` uses `useNavigate()` to go to `/projects`
- [ ] Created `ProtectedRoute.tsx` and verified it redirects unauthenticated users

---

## 📊 Final Score: ___/10

**Summary:**
- [ ] Activity completed (routes, pages, and protected route reviewed)
- [ ] All checklist items pass without compilation warnings

**Ready for:** Unit 6 — ASP.NET Core & C# Basics!
