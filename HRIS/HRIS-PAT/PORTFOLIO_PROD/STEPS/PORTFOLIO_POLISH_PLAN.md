# 🎨 PORTFOLIO_PROD: Polish Plan (v2)

> **Goal:** turn the working portfolio into a presentable, intermediate-level site that a recruiter understands in 10 seconds.
> **Rule:** I write the code, my assistant reviews and guides.
> **Audience:** recruiters and hiring managers looking at a **fresh Computer Engineering graduate**.

---

## 🧭 The Design Direction (decided)

| Decision | Choice |
| :--- | :--- |
| **Concept** | A **scroll story**: one long page where each section reveals itself as you scroll, like a modern article |
| **Scroll order** | 1. **Bento Grid** → 2. **Projects** → 3. **Skills** (logo carousel + experience) |
| **Header nav** | 4 anchors: **Home (Bento)**, **Projects**, **Skills**, **Contact** |
| **Header & Footer actions** | **Social buttons** (Facebook, GitHub, LinkedIn, Instagram), **Download Resume**, **Chat button** |
| **Chat button** | **Placeholder only for now.** Real chat comes later (see [HOMELAB_CHAT_PLAN.md](./HOMELAB_CHAT_PLAN.md)) |
| **Animations** | Fade / slide-in on scroll, tech logo carousel, subtle hover effects |
| **Layout order** | **Desktop first.** Get the outline right, then do the mobile layout |
| **Palette** | Royal Plum & Blossom Pink (unchanged) |

### The page flow

```
┌───────────────────────────────────────────────────┐
│ HEADER (sticky)                                   │
│ Logo   Home · Projects · Skills · Contact [CV][💬]│
├───────────────────────────────────────────────────┤
│ 1. HOME: Bento Grid (first page)                  │
│    Intro + PHOTO · Tech · HRIS spotlight · About  │
│                       ↓ fade-in on scroll         │
├───────────────────────────────────────────────────┤
│ 2. PROJECTS                                       │
│    Featured project cards (fade/slide in)         │
│    "View all projects →" (/projects archive)      │
│                       ↓                           │
├───────────────────────────────────────────────────┤
│ 3. SKILLS                                         │
│    ◄◄ logo carousel: C#  React  TS  PostgreSQL ►► │
│    Skills grouped + "Currently learning"          │
│    Education / Experience timeline                │
│                       ↓                           │
├───────────────────────────────────────────────────┤
│ 4. CONTACT                                        │
│    Copy email · Direct email · Socials · Location │
├───────────────────────────────────────────────────┤
│ FOOTER: email · socials · [Resume] · [💬 Chat]    │
└───────────────────────────────────────────────────┘
```

> [!NOTE]
> We keep `/projects` as an **archive page** ("View all projects"). The home page shows only the **top 3 featured** projects.

---

## ✨ Scroll Interactivity Plan

The goal is "modern and smooth", not "heavy". Each effect has a purpose.

| Effect | What it does | How we build it | Phase |
| :--- | :--- | :--- | :---: |
| **Fade + slide-up on scroll** | Each section and card appears as it enters the viewport | Custom `useInView` hook with the browser's `IntersectionObserver` + Tailwind transition classes | 🔴 Core |
| **Staggered reveal** | Cards appear one after another (small delay each) | `transition-delay` based on the card's index | 🔴 Core |
| **Smooth anchor scrolling** | Header links glide to sections | `scroll-behavior: smooth` + `scroll-mt-20` (so the sticky header doesn't cover headings) | 🔴 Core |
| **Active header link** | The current section's link is highlighted while scrolling | `IntersectionObserver` per section | 🟡 Medium |
| **Logo carousel (marquee)** | Tech logos scroll endlessly, pausing on hover | CSS `@keyframes` marquee with the logo list duplicated for a seamless loop | 🟡 Medium |
| **Scroll progress bar** | Thin gradient bar at the top shows page progress | `scroll` event + `useState`/CSS variable | 🟢 Nice-to-have |
| **Card hover lift / glow** | Cards rise and glow on hover | Tailwind `hover:-translate-y-1` + shadow | 🟡 Medium |
| **Subtle parallax glow** | Background glow shifts slowly while scrolling | CSS only, keep it very light | 🟢 Nice-to-have |

**Library decision:** start **without** an animation library. The `useInView` hook is a great React exercise (`useEffect`, `useRef`, cleanup) and keeps the bundle small. If we later want fancier effects, we can add **Motion** (formerly Framer Motion).

**Guardrails**
- [ ] Respect **`prefers-reduced-motion`**: turn animations off for users who request it.
- [ ] Animate only `opacity` and `transform` (smooth, cheap on the GPU).
- [ ] Reveal **once**. Don't re-animate every time an element re-enters the view.
- [ ] Keep durations around **500–700 ms**. Longer feels slow.
- [ ] Make sure content is visible even if JavaScript fails or the observer doesn't fire.

---

## 🎠 Tech Logo Carousel

- [ ] Choose logos for tech you **actually know**: C#, .NET, ASP.NET Core, PostgreSQL, React, TypeScript, JavaScript, Tailwind, Git, Docker, and so on.
- [ ] Source: `react-icons` (the `Si*` set has brand logos) or SVG files in `src/assets/logos/`.
- [ ] Endless horizontal loop, **pauses on hover**.
- [ ] Add a **fade mask on both edges** so logos fade in and out smoothly.
- [ ] Logos with names under them, or a tooltip, for accessibility.
- [ ] Honest list only. Don't show a logo you couldn't discuss in an interview.

---

## 💬 Header & Footer Actions

| Button | Header | Footer | Behavior now |
| :--- | :---: | :---: | :--- |
| **Social icons** (GitHub, LinkedIn, Facebook, Instagram) | ✅ | ✅ | Open in a new tab |
| **Download Resume** | ✅ | ✅ | Downloads the PDF |
| **Chat** | ✅ | ✅ | **Placeholder**: shows "Chat is coming soon, email me in the meantime" (a small modal or tooltip) |

- [ ] Build `SocialLinks.tsx`, `ResumeButton.tsx` and `ChatButton.tsx` as reusable components, used in both the header and the footer.
- [ ] Keep the header uncluttered: icons only for socials (with `aria-label`), and one clear **Resume** button.
- [ ] On desktop there is room for all three. Mobile (later) moves them into the hamburger menu.

---

## 🔍 Current State (from the browser)

| Area | Status | Note |
| :--- | :---: | :--- |
| Navbar | ✅ | Purple theme done. "About" links to `/` and "Contact" points to `#contact`, which doesn't exist yet. |
| Hero | ✅ | Text only. **No photo, no personal intro.** |
| Bento Grid | ✅ | 4 cards working. Content is generic. |
| Footer | ⚠️ | Still the old **black / green** colors. Needs the plum palette. |
| Projects page | ⚠️ | Placeholder projects. No screenshots. |
| Contact section | ❌ | Doesn't exist yet. |
| Photo / images | ❌ | None yet. |
| Resume button | ❌ | Not yet. |
| Social buttons | ❌ | Not yet. |
| SEO / favicon | ❌ | Default Vite title and icon. |

---

## 🖼️ The Photo

Yes, add a photo. Visitors connect with a face, and it makes the site feel personal.

**Placement:** inside the **first Bento card** (intro card), on the right side.

**Photo checklist**
- [ ] Clear, well-lit, friendly. Plain background is fine.
- [ ] Square crop, about **800×800 px**.
- [ ] Export as **`.webp`** (or `.jpg`), **under 200 KB**.
- [ ] Save in `src/assets/` (or `public/`).
- [ ] Add meaningful `alt` text.
- [ ] Style: rounded, with a plum-to-pink gradient ring or glow behind it.
- [ ] Privacy: use a photo without your school ID, address or other personal info in the background.

---

## 🔗 References to Study (look, don't copy)

| Site | Why look at it |
| :--- | :--- |
| **brittanychiang.com** ⭐ | **Chosen reference** for the scroll sections: intro, about, experience, projects, with a sticky section nav. |
| **joshwcomeau.com** | Personality and small animations. |
| **leerob.com** | Minimal, content-first layout. |
| **Search: "bento grid portfolio"** | See how others arrange the first-page cards. |

**Homework (10 min, on brittanychiang.com):**
1. What did you see first?
2. Which section did you like most?
3. What would you borrow for your own site?

---

## 🗺️ Sections (with the fresh-graduate additions)

| # | Section | Purpose | Priority |
| :--- | :--- | :--- | :---: |
| 1 | **Bento first page** (intro + photo + highlights) | Who you are in one glance | 🔴 High |
| 2 | **About** | Short story: why you code, what you're aiming for | 🔴 High |
| 3 | **Education** | Computer Engineering degree, school, year, honors | 🔴 High |
| 4 | **Experience / Training** | Internship (if any), OJT, volunteer or school work | 🟡 Medium |
| 5 | **Certifications** | freeCodeCamp React cert (in progress), other courses | 🟡 Medium |
| 6 | **Projects** | HRIS, this portfolio, thesis/capstone, school projects. Screenshots and links | 🔴 High |
| 7 | **Skills** | Grouped: Backend, Frontend, Database, Tools. Add a **"Currently learning"** list | 🟡 Medium |
| 8 | **Resume download** | 1-page PDF button | 🔴 High |
| 9 | **Social links** | Facebook, GitHub, LinkedIn, Instagram | 🔴 High |
| 10 | **Contact** | Professional email + socials (later: the homelab chat) | 🔴 High |
| 11 | **Footer** | Fix to match the palette | 🟢 Quick win |

### 🎓 Fresh-graduate tips (what recruiters look for when there's no work history)
- **Projects are your experience.** Write each one as: *problem → what you built → tech → result.*
- **Thesis / capstone** counts. List it as a project.
- **Show learning in public:** the freeCodeCamp cert, "Currently learning", and this portfolio itself.
- **Add one line of impact** per project (for example "role-based access for Admin / Reviewer / Employee").
- **Honest beats inflated.** Don't list skills you can't explain in an interview.
- **Keep the resume to 1 page.**

---

## 📎 Resume & Social Buttons

### Resume
- [ ] Save the PDF as `public/Patrick_Arlan_Resume.pdf`.
- [ ] Button: `<a href="/Patrick_Arlan_Resume.pdf" download>`.
- [ ] Place it in the **Navbar** (replace or sit beside GitHub), the **Hero/Bento**, and the **Contact** section.
- [ ] Remove personal details you don't want public (home address, phone) from the PDF.

### Social buttons
| Platform | Notes |
| :--- | :--- |
| **GitHub** | Most important for developers. Pin your best repos first. |
| **LinkedIn** | Most important for recruiters. Complete your profile. |
| **Facebook** | Check your public posts and photos first, or link only a professional page. |
| **Instagram** | Same: check that the public content is appropriate, or leave it out. |

- [ ] Create a reusable `SocialLinks.tsx` component and use it in the Bento card, Contact section and Footer.
- [ ] All links use `target="_blank"` with `rel="noreferrer noopener"`.
- [ ] Add `aria-label` to each icon-only link (for example `aria-label="GitHub profile"`).

> [!TIP]
> Newer versions of `lucide-react` may not include brand icons (GitHub, LinkedIn, Facebook, Instagram). If an import fails, use `react-icons` (`npm i react-icons`, then `FaGithub`, `FaLinkedin`, `FaFacebook`, `FaInstagram`).

---

## ✅ Polish Checklist (desktop first, in order)

### Block 1: Quick wins (15 min)
- [ ] Update `Footer.tsx` to the plum palette (Step 2 code in the build steps).
- [ ] Change the page title and favicon (`index.html`).
- [ ] Replace the placeholder GitHub link with your real profile.
- [ ] Gather your content (see "Content I Need From You").

### Block 2: First-page Bento redesign (25 min)
- [ ] Add the **photo** to the intro card.
- [ ] Rewrite the intro in your own voice ("Hi, I'm Patrick…").
- [ ] Build reusable `SocialLinks`, `ResumeButton` and placeholder `ChatButton` components.
- [ ] Use them in the **header** and the first page.
- [ ] Polish the other Bento cards: equal padding, hover effects, real content.

### Block 3: Scroll sections (30 min)
- [ ] Wrap each part in a section with an `id`: `#home` (Bento), `#projects`, `#skills`.
- [ ] Header links (**Home, Projects, Skills**) scroll smoothly: `scroll-behavior: smooth`, plus `scroll-mt-20` so the sticky header doesn't cover headings.
- [ ] **Projects section:** top 3 featured with screenshots, plus a "View all projects →" link to `/projects`.
- [ ] **Skills section:** grouped skills, "Currently learning", and the Education / Experience timeline.
- [ ] Optional: highlight the active header link while scrolling.

### Block 3b: Animations (30 min)
- [ ] Write the `useInView` hook (`IntersectionObserver`) and a reusable `<Reveal>` wrapper.
- [ ] Fade + slide-up the sections and cards, with a staggered delay.
- [ ] Build the **tech logo carousel** (CSS marquee, pause on hover, edge fade).
- [ ] Add `prefers-reduced-motion` support.
- [ ] Optional: scroll progress bar.

### Block 4: Content & cleanup (20 min)
- [ ] Real projects with GitHub links on `/projects`.
- [ ] **Footer:** email, social icons, Resume button, Chat button (plum palette).
- [ ] Chat button placeholder: "Chat is coming soon, email me in the meantime".
- [ ] Remove demo `/secret` and `/login` routes and the `ProtectedRoute` wiring from the live site.

### Block 5: Desktop review (10 min)
- [ ] Check spacing, alignment and contrast at 1440px and 1920px wide.
- [ ] Fix anything that looks off before starting mobile.

### Block 6: Mobile layout (separate session)
- [ ] Test with browser DevTools device mode (360px to 430px).
- [ ] Stack the Bento into one column, photo above text.
- [ ] Add a hamburger menu to the Navbar (the links are currently hidden on small screens).
- [ ] Check tap target sizes and text readability.

### Block 7: Final pass
- [ ] Re-check animations on mobile (lighter, shorter) and with reduced motion on.
- [ ] Alt text and keyboard focus states.
- [ ] SEO: meta description and Open Graph preview image.
- [ ] Run `npm run build` and fix any warnings.

---

## ✍️ Content I Need From You

Rough notes are fine:

1. **Your photo** (or tell me you'll take one).
2. **2 to 3 sentences** about who you are and what you're aiming for.
3. **Education:** school, degree, year, any honors.
4. **Experience / training:** internship or OJT, if any, or school work.
5. **Your real projects:** name, one-line description, tech used, GitHub link and a screenshot if possible. Include your **thesis or capstone**.
6. **Certifications / courses.**
7. **Social links:** GitHub, LinkedIn, Facebook, Instagram URLs you're happy to make public.
8. **Professional email** to display.
9. **Resume PDF**, if you have one.

---

## 🚀 After Polish

1. Deploy to **Vercel** with a custom domain.
2. Follow [HOMELAB_CHAT_PLAN.md](./HOMELAB_CHAT_PLAN.md) for the homelab and private chat.
