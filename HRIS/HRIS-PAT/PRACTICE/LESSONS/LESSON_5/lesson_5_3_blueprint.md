# Chapter 5: React.js — The Framework

## Lesson 5.3: Fetching Data from an API ??

Up until now, **all your data has been hardcoded** inside your app. Real websites pull data from the internet — from external servers called **APIs**.

In this lesson, you will learn how React fetches live data from the internet, how to handle the time it takes for data to arrive, and how to display it gracefully in your portfolio.

---

## Part 1: What is an API? (The Restaurant Analogy ???)

Imagine you''re at a restaurant:
- **You** = The browser (the client)
- **The Menu** = The API documentation (tells you what you can order)
- **Your Order** = The HTTP request you send
- **The Kitchen** = The server processing your request
- **Your Food** = The JSON data the server sends back

An **API (Application Programming Interface)** is a service that lives on a server and responds to requests with structured data (usually **JSON**).

### Example — A Raw GitHub API Response:
When you visit `https://api.github.com/users/torvalds`, the server responds with JSON data like this:

```json
{
  "login": "torvalds",
  "name": "Linus Torvalds",
  "public_repos": 8,
  "followers": 248000,
  "avatar_url": "https://avatars.githubusercontent.com/u/1024025"
}
```

No HTML, no styling — just **clean, raw data**. Your React app receives this and decides *how* to display it!

---

## Part 2: `async/await` — Waiting Politely for Data ?

Fetching data from the internet is **slow** (network requests can take 100ms–2000ms). JavaScript does not pause for it — it keeps running. This is called **asynchronous** code.

To handle this gracefully, we use `async/await`:

```ts
// This function is "async" — it can wait for slow things
async function getGitHubUser(username: string) {
  // "await" pauses THIS function until the response arrives
  const response = await fetch(`https://api.github.com/users/${username}`);

  // Parse the raw response body as JSON
  const data = await response.json();

  return data;
}
```

### Key Terms:
| Term | What it means |
| :--- | :--- |
| `async` | Marks a function as one that handles slow operations |
| `await` | Pauses *only the async function* while waiting for a Promise |
| `fetch()` | The built-in browser tool for making HTTP requests |
| `.json()` | Reads and parses the raw response body into a JavaScript object |
| `Promise` | A placeholder for a value that will arrive in the future |

---

## Part 3: The Golden Pattern — `useEffect` + `fetch` ??

In React, you almost always fetch data inside a `useEffect` hook. Here is the complete, industry-standard pattern:

```tsx
import { useState, useEffect } from ''react'';

// 1. Define a TypeScript interface for the shape of your data
interface GitHubUser {
  login: string;
  name: string;
  public_repos: number;
  followers: number;
  avatar_url: string;
}

function GitHubProfile() {
  // 2. Three state variables: the data, a loading flag, and an error message
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 3. useEffect with [] — fetch once when component mounts
  useEffect(() => {
    // 4. Define the async fetch function INSIDE the effect
    async function fetchUser() {
      try {
        const response = await fetch(''https://api.github.com/users/patrickarlan'');

        // 5. Always check if the response is OK before parsing!
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data: GitHubUser = await response.json();
        setUser(data);  // 6. Store the data in state
      } catch (err) {
        setError(''Failed to fetch profile. Check your internet connection!'');
      } finally {
        setIsLoading(false); // 7. ALWAYS turn off loading, even on error
      }
    }

    fetchUser(); // 8. Call the async function
  }, []); // 9. Empty array = run only once on mount

  // 10. Render different UI based on state
  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: ''red'' }}>{error}</p>;
  if (!user) return null;

  return (
    <div>
      <img src={user.avatar_url} alt={user.name} width={100} />
      <h2>{user.name} (@{user.login})</h2>
      <p>Repos: {user.public_repos} | Followers: {user.followers}</p>
    </div>
  );
}
```

### Why 3 State Variables?
Because a fetch can be in one of exactly **3 states**:
1. ? **Loading** — we are waiting for the network response
2. ? **Success** — data arrived, render it
3. ? **Error** — something broke, show a friendly message

Always handle all three!

---

## Part 4: The `try / catch / finally` Pattern ???

When fetching data, things can go wrong: no internet, server is down, API limit hit.
`try/catch/finally` is your safety net:

```ts
try {
  // Code that MIGHT throw an error
  const response = await fetch(url);
  const data = await response.json();
  setData(data);
} catch (error) {
  // Runs if ANYTHING in the try block throws
  setError(''Something went wrong!'');
} finally {
  // ALWAYS runs, success OR failure
  setIsLoading(false);
}
```

Think of it like this:
- `try` ? "I will attempt this risky thing..."
- `catch` ? "...but if it explodes, I will handle it gracefully"
- `finally` ? "...and no matter what happens, clean up after yourself"

---

## Part 5: Custom Hooks for Data Fetching ??

Just like how `useProjects` cleaned up your project state, you can extract fetch logic into a reusable custom hook called `useGitHubProfile`.

```ts
// src/hooks/useGitHubProfile.ts

import { useState, useEffect } from ''react'';

interface GitHubUser {
  login: string;
  name: string;
  public_repos: number;
  followers: number;
  avatar_url: string;
  bio: string | null;
  html_url: string;
}

export function useGitHubProfile(username: string) {
  const [profile, setProfile] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data: GitHubUser = await response.json();
        setProfile(data);
      } catch (err) {
        setError(''Could not load GitHub profile.'');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, [username]); // Re-fetches whenever the username changes!

  return { profile, isLoading, error };
}
```

Now in your component, it is just one clean line:
```tsx
const { profile, isLoading, error } = useGitHubProfile(''patrickarlan'');
```

Clean. Reusable. Testable.

---

## Part 6: The `response.ok` Check — Why It Matters ??

`fetch()` does NOT throw an error for bad HTTP status codes (404, 500, etc.) — it only throws if the network request itself fails.

```ts
// WRONG — This will NOT catch 404 Not Found!
const response = await fetch(''https://api.github.com/users/this_user_does_not_exist_xyz'');
const data = await response.json(); // Still runs! Gets the error message body instead.

// CORRECT — Manually check response.ok
const response = await fetch(''https://api.github.com/users/this_user_does_not_exist_xyz'');
if (!response.ok) {
  throw new Error(`HTTP Error: ${response.status}`); // 404 will now be caught!
}
const data = await response.json();
```

Always check `response.ok`!

---

## Part 7: The Services Layer & Axios 🛠️

In small projects, calling `fetch()` inside a hook is fine. But as your app grows, you might fetch from dozens of endpoints. If you need to change a header, an API key, or a URL, you would have to search and edit dozens of files.

### 1. The Services Layer (Separation of Concerns)
To solve this, we create dedicated service files (e.g., `src/services/gitHubService.ts`) whose ONLY job is to talk to the server. Your hooks then call these functions.

* **Hook:** Handles React state (`isLoading`, `error`, `profile`).
* **Service:** Handles raw HTTP communication (`fetch`, endpoints, headers).

```typescript
// src/services/gitHubService.ts
export async function fetchGitHubUserData(username: string) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) throw new Error("API call failed");
  return response.json();
}
```

### 2. Axios vs. Built-in Fetch
In many corporate codebases (including parts of this HRIS), developers use a library called **Axios** instead of the browser's native `fetch()`. Here is why:

| Feature | Browser `fetch()` | `axios` |
| :--- | :--- | :--- |
| **JSON Parsing** | Manual (`await response.json()`) | Automatic (data is parsed automatically) |
| **Error Handling** | Doesn't fail on 404/500 (needs `response.ok`) | Fails automatically on 4xx/5xx status codes |
| **Interceptors** | None (must write custom wrappers) | Built-in (allows you to run code before request/response) |
| **Package Size** | Built-in (0 bytes added) | External library (adds dependencies) |

---

## ?? Activities: Fetching Live Data for Your Portfolio

### Task 1: Create the `useGitHubProfile` Custom Hook
1. Inside `src/hooks/`, create a new file: `useGitHubProfile.ts`.
2. Implement the hook exactly as shown in **Part 5** above.
3. It should accept a `username: string` parameter.
4. It must return `{ profile, isLoading, error }`.
5. Include the `GitHubUser` interface inside this file (with at least: `login`, `name`, `public_repos`, `followers`, `avatar_url`, `bio`, `html_url`).

### Task 2: Create a `GitHubCard` Component
1. Inside `src/components/`, create a new file: `GitHubCard.tsx`.
2. This component should **use your `useGitHubProfile` hook** to fetch live data.
3. Display these 3 UI states clearly:
   - **Loading**: Show a loading text or spinner (e.g., `"? Fetching GitHub profile..."`)
   - **Error**: Show a red error message
   - **Success**: Display the GitHub user's `avatar_url`, `name`, `login`, `bio`, `public_repos`, `followers`, and a link to `html_url`
4. Pass your own GitHub username (e.g., `"patrickarlan"`) as the `username` prop from `App.tsx`.

### Task 3: Add `GitHubCard` to Your Portfolio's `App.tsx`
1. In `App.tsx`, import and render your new `<GitHubCard username="your-github-username" />`.
2. Place it inside a new `<section>` with an `id="about"` between the hero and the projects sections.
3. Give the section a heading like `"About Me"`.

---

## ?? Test Checklist

To submit this lesson for grading, verify your work and update `lesson_5_3_answer.md`:

- [ ] Created `src/hooks/useGitHubProfile.ts` with a working fetch hook
- [ ] Created `src/components/GitHubCard.tsx` that uses the hook and handles all 3 states (loading, error, success)
- [ ] Added `<GitHubCard />` to `App.tsx` inside an `id="about"` section
- [ ] The app renders live GitHub profile data (avatar, name, bio, repo count, followers) from the API
- [ ] The `response.ok` check is present in the hook

---

## ?? Final Score: ___/10

**Summary:**
- [ ] Activity completed (`useGitHubProfile.ts`, `GitHubCard.tsx`, and `App.tsx` reviewed)
- [ ] All checklist items pass without compilation warnings

**Ready for:** Lesson 5.4 — React Router & Multi-Page Navigation!
