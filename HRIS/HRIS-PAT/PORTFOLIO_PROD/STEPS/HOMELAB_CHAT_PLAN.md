# 🏠 PORTFOLIO_PROD: Homelab + Private Chat — Future Plan

> **Status:** 📝 Planning only. Nothing here is built yet.
> **Start this plan after:** the portfolio (Modules 1–4) is polished and deployed.

---

## 🎯 Objectives

1. **Homelab as a real, working server** hosting the portfolio's backend, with layered security (spam, abuse, and intrusion resistance).
2. **Private chat feature** so visitors and employers can message me directly from the portfolio.
3. **Database to store messages privately.** Messages are never exposed publicly. Only I can read them, through an authenticated admin inbox.

> [!IMPORTANT]
> **A note on "invulnerable":** no system is 100% unhackable. The realistic goal is **defense in depth**: several independent layers, so that if one fails, the others still protect the homelab and the data. Every layer below exists for that reason.

---

## 🧭 Architecture Overview

```
 Visitor Browser (React portfolio on Vercel/Netlify)
        │  HTTPS
        ▼
 Cloudflare (DNS + WAF + Turnstile + Rate Limit)
        │  Encrypted outbound tunnel (no open router ports)
        ▼
 ┌──────────────────── HOMELAB ────────────────────┐
 │  cloudflared (tunnel)                           │
 │      │                                          │
 │  Reverse proxy (Caddy / Nginx)                  │
 │      │                                          │
 │  ASP.NET Core 10 API  ── SignalR (live chat)    │
 │      │   Rate limiting • Validation • JWT       │
 │      ▼                                          │
 │  PostgreSQL (private Docker network only)       │
 │      │                                          │
 │  Backups (encrypted, off-box copy)              │
 └─────────────────────────────────────────────────┘
        ▲
        │  Admin access ONLY via Tailscale / Cloudflare Access
      Me (admin inbox + SSH)
```

**Key principles**
- **No port forwarding.** The home IP is never exposed.
- **Database is never reachable from the internet.** Only the API container can talk to it.
- **Admin surface is separate** from the public surface and is not reachable by random visitors.

---

## 🧱 Tech Stack (matches skills I already have)

| Layer | Choice | Why |
| :--- | :--- | :--- |
| Frontend | React 19 + Tailwind (existing portfolio) | Already built |
| API | ASP.NET Core 10 Web API | Same stack as the HRIS project |
| Real-time | SignalR (WebSockets) | Native to ASP.NET Core |
| Database | PostgreSQL + EF Core | Same as HRIS |
| Auth (admin only) | ASP.NET Core Identity + JWT | Same as HRIS |
| Containers | Docker + Docker Compose | Reproducible, isolated |
| Public access | Cloudflare Tunnel (`cloudflared`) | Hides home IP, no open ports |
| Anti-bot | Cloudflare Turnstile | Free, low-friction captcha |
| Private admin access | Tailscale (and/or Cloudflare Access) | Admin is never public |
| Monitoring | Uptime Kuma | Know when the homelab is down |

---

## 🛡️ Security Layers

### Layer 1: Network
- [ ] Use **Cloudflare Tunnel**. Close all inbound ports on the router.
- [ ] Put the homelab on a **separate VLAN / isolated network** from personal devices (if the router supports it).
- [ ] Host firewall (UFW or nftables): default-deny inbound.
- [ ] SSH: keys only, password login disabled, reachable **only over Tailscale**.

### Layer 2: Edge (Cloudflare)
- [ ] Enable WAF managed rules and bot protection.
- [ ] Cloudflare **rate limiting** rule on the chat endpoints.
- [ ] **Turnstile** on the "start chat" / "send message" action. The server verifies the token.
- [ ] Restrict the API **CORS** policy to the portfolio's exact domain only.

### Layer 3: Application (ASP.NET Core)
- [ ] Built-in **Rate Limiting middleware** (for example, 3 new messages per IP per 5 minutes).
- [ ] **Input validation:** max message length, trim, reject empty or control characters.
- [ ] **Output encoding:** never render message content as raw HTML (React escapes by default; never use `dangerouslySetInnerHTML`).
- [ ] No stack traces or internal errors returned to clients.
- [ ] Security headers (HSTS, `X-Content-Type-Options`, CSP).
- [ ] Parameterized queries only (EF Core does this by default).
- [ ] Optional: basic profanity / link filter, plus a daily message cap per conversation.

### Layer 4: Data & Secrets
- [ ] DB container on an **internal Docker network** with no published port.
- [ ] Secrets in `.env` / Docker secrets, **never committed to git**. Keep `.env` in `.gitignore`.
- [ ] Strong, unique DB password and JWT signing key.
- [ ] DB user for the API has **least privilege** (no superuser).
- [ ] Disk encryption on the homelab host, if possible.

### Layer 5: Admin Access
- [ ] Admin inbox lives at a **separate route and subdomain** (for example `admin.yourdomain.com`).
- [ ] Protected by **Cloudflare Access or Tailscale-only** access, plus **JWT login** in the app.
- [ ] Strong password plus (ideally) 2FA.
- [ ] **This is where `ProtectedRoute.tsx` from Module 5 becomes real.** The front-end guard hides the UI, and the **server enforces** `[Authorize]` on every admin endpoint.

### Layer 6: Operations
- [ ] Automated, **encrypted DB backups** with an off-machine copy, and a **tested restore**.
- [ ] Auto-updates for OS and containers (unattended-upgrades, Watchtower or manual patch schedule).
- [ ] Brute-force protection (CrowdSec or fail2ban).
- [ ] Uptime monitoring and an alert when the server goes down.
- [ ] Log rotation. **Do not log message bodies or personal data.**

---

## 🤖 Anti-Spam & Anti-Bot (No Visitor Login)

**Decision:** visitors do **not** log in. Bots are stopped by stacking several cheap checks instead.

| # | Check | What it stops |
| :--- | :--- | :--- |
| 1 | **Cloudflare Turnstile** (verified server-side) | Automated scripts and basic bots |
| 2 | **Rate limit per IP** (e.g. 3 new conversations / 10 min) | Flooding from one source |
| 3 | **Rate limit per conversation** (e.g. 10 messages / min, 100 / day) | A single abusive chat |
| 4 | **Honeypot field** (hidden input real users never fill) | Dumb form-filling bots |
| 5 | **Minimum time-to-submit** (e.g. reject if sent < 2 seconds after opening) | Instant bot submissions |
| 6 | **Max message length** (e.g. 1,000 characters) | Huge payloads / spam walls |
| 7 | **Duplicate message detection** | Copy-paste spam |
| 8 | **Auto-block list** (hashed IP) after repeated violations | Repeat offenders |
| 9 | **Global kill switch** (an env flag to disable new chats instantly) | Emergency during an attack |

- [ ] Turnstile token verified on the **server**, never trusted from the browser alone.
- [ ] All limits live in config, so they can be tuned without code changes.
- [ ] Rejected requests get a generic error and **no detail** that helps an attacker.

---

## 🦠 Malware Prevention (Links & Files)

The safest way to defend against malware is to **not accept the dangerous things at all.**

### Files: **not supported**
- [ ] **No file uploads. No images. No attachments.** The chat is **text-only**.
- [ ] The API has **no upload endpoint**, so there is nothing to exploit.
- [ ] If a visitor needs to share a file, they use email or a link to a service they control, and I decide whether to open it.

### Links: **blocked or neutralized**
Choose one policy (**✅ DECIDED: Option A**, block all URLs):

| Option | Behavior | Trade-off |
| :--- | :--- | :--- |
| **A. Block URLs (Recommended)** | The server rejects messages containing `http://`, `https://`, `www.`, or common link patterns. Message: "Links aren't allowed, please describe it in text or email me." | Safest. Blocks phishing and malware links. Slight friction for legit visitors. |
| **B. Store as inert text** | Allow links but they are **never clickable** and shown with a warning in the admin inbox. | Visitors can share a portfolio or LinkedIn link. I must copy-paste manually. |
| **C. Allow-list** | Only allow links to trusted domains (linkedin.com, github.com). | Flexible, needs maintenance. |

- [ ] Regardless of option: **never auto-link or auto-preview** URLs in the admin inbox.
- [ ] Never fetch or open a visitor-supplied URL from the server (prevents SSRF).
- [ ] Render all messages as **plain text** only. No `dangerouslySetInnerHTML`, no Markdown or HTML rendering.
- [ ] Strip control characters and zero-width characters (used to hide spam or obfuscate links).
- [ ] Add a **Content-Security-Policy** header so injected scripts could not run even if one slipped through.

---

## 🔐 Encryption Plan

There are three places data can be exposed. Each one gets its own protection.

| Where | Protection | How |
| :--- | :--- | :--- |
| **In transit** (visitor → server) | **TLS / HTTPS** | Provided by Cloudflare and the tunnel. Use **WSS** for SignalR. Enforce HTTPS + HSTS. |
| **At rest, disk level** | **Full-disk encryption** | LUKS (Linux) or BitLocker on the homelab host. Protects against stolen hardware. |
| **At rest, message level** | **Application-level encryption** of `Messages.Body` | AES-256-GCM, encrypted by the API before saving to PostgreSQL. A DB leak or stolen backup shows only ciphertext. |

### Application-level encryption details
- [ ] Use **ASP.NET Core Data Protection** or a well-reviewed library (AES-GCM via `System.Security.Cryptography`). **Never invent your own crypto.**
- [ ] The **encryption key is stored separately from the database** (environment secret / Docker secret / key file with strict permissions), never in git.
- [ ] Back up the key **separately** from DB backups. **Lose the key = lose all messages.**
- [ ] Plan for **key rotation** (store a key version with each message).
- [ ] **Backups are encrypted** too, and stored off-machine.

> [!NOTE]
> **This is not end-to-end encryption (E2EE).** The server must be able to decrypt messages so I can read them in the admin inbox. That is a realistic trade-off here. It protects against DB leaks, stolen backups and stolen disks, but **not** against someone who fully controls the running server. This is why Layers 1–6 above matter just as much.

> [!TIP]
> **Trade-off:** encrypted message bodies **can't be searched with SQL**. That's fine for a small personal inbox. Metadata (timestamps, status) stays unencrypted so I can sort and filter.

---

## 💬 Chat Feature Design

### User flow
1. Visitor clicks **"Chat with Patrick"** on the portfolio.
2. Enters a **name** and an **optional email**, then passes **Turnstile**.
3. API creates a **conversation** and returns a random, unguessable **conversation token**.
4. Visitor sends messages. Delivery is real-time via SignalR if I'm online, and stored either way.
5. I get a **push notification** (ntfy, Telegram, or email) for new messages.
6. I reply from the **private admin inbox**. The visitor sees my reply in the same thread.

### Suggested data model

| Table | Key fields |
| :--- | :--- |
| `Conversations` | `Id (GUID)`, `VisitorName`, `VisitorEmail?`, `TokenHash`, `CreatedAt`, `LastActivityAt`, `Status` (Open / Closed / Blocked) |
| `Messages` | `Id`, `ConversationId`, `Sender` (Visitor / Admin), `Body`, `SentAt`, `ReadAt?` |
| `BlockedClients` | `Id`, `IpHash`, `Reason`, `CreatedAt` |

### Privacy rules (objective 3)
- [ ] Messages are **never returned by any public endpoint**. A visitor can only access their **own** conversation, using the token.
- [ ] Store only the **hash** of the conversation token, not the token itself.
- [ ] Store a **hash** of the IP (for abuse control), not the raw IP.
- [ ] Add a short **privacy notice** in the chat widget ("Messages are stored privately and only visible to Patrick").
- [ ] **Retention policy:** auto-delete old closed conversations (for example after 90 days).
- [ ] Provide a way to **delete a conversation** on request.

### Graceful fallback
- [ ] If the homelab is **offline**, the widget shows: *"I'm offline right now. Please email me instead."* The portfolio itself must keep working without the homelab.

---

## 🗺️ Phased Roadmap

### Phase 0: Finish the portfolio (now)
- [ ] Polish the Bento Grid, Projects page, and Contact section.
- [ ] Remove or hide the demo `/secret` route for production.
- [ ] Deploy the static portfolio (Vercel or Netlify) on a custom domain.

### Phase 1: Homelab foundation
- [ ] Prepare the server (OS, updates, firewall, SSH keys, Tailscale).
- [ ] Install Docker and Docker Compose.
- [ ] Set up Cloudflare account and domain, and create a **Cloudflare Tunnel**.
- [ ] Deploy a **"hello world" API** through the tunnel to verify the setup end to end.

### Phase 2: Backend (ASP.NET Core)
- [ ] Create the API project (`PortfolioChat.Api`).
- [ ] Models + EF Core migrations for `Conversations` and `Messages`.
- [ ] Endpoints: start conversation, send message, get my conversation.
- [ ] Add rate limiting, validation, CORS, Turnstile verification.
- [ ] Anti-spam checks: honeypot, min time-to-submit, duplicate detection, auto-block list, kill switch.
- [ ] Malware safeguards: text-only (no upload endpoint), URL blocking, character sanitizing.
- [ ] Application-level AES-GCM encryption of `Messages.Body`, with key stored outside the DB.
- [ ] Dockerize the API and PostgreSQL with Compose (internal network).

### Phase 3: Real-time + Admin
- [ ] Add **SignalR** hub for live messages.
- [ ] Admin authentication (Identity + JWT).
- [ ] Admin endpoints (list, read, reply, close, block), all `[Authorize]`.
- [ ] Notification on new message (ntfy or Telegram).

### Phase 4: Frontend integration
- [ ] Chat widget component in the portfolio (floating button, plum and pink theme).
- [ ] Admin inbox page behind `ProtectedRoute` on a separate, restricted subdomain.
- [ ] Offline / error fallback states.

### Phase 5: Hardening & operations
- [ ] Backups and a restore test.
- [ ] Monitoring (Uptime Kuma) and alerts.
- [ ] CrowdSec or fail2ban, auto-update policy.
- [ ] Basic security review: try spamming, oversized payloads, and direct DB access from outside. All should fail.

---

## ✅ Definition of Done

- [ ] Home IP is not discoverable from the portfolio or DNS.
- [ ] No inbound ports are open on the router.
- [ ] Spamming the chat gets rate-limited or blocked.
- [ ] Messages are only readable by me through the authenticated admin inbox.
- [ ] The DB cannot be reached from outside the Docker network.
- [ ] Backups run and a restore has been tested.
- [ ] The portfolio still works if the homelab is offline.

---

## ❓ Open Questions (decide before Phase 1)

1. **Hardware:** what is the homelab running on (mini PC, Raspberry Pi, old laptop)? This affects performance and power cost.
2. **Domain:** do I already own one? Cloudflare Tunnel needs a domain on Cloudflare.
3. **Notifications:** ntfy, Telegram, or email?
4. **Chat style:** live real-time chat, or an asynchronous "leave a message" inbox first (simpler, and a good Phase 1 MVP)?
5. **Visitor identity:** require an email, or allow fully anonymous chat?
6. **Internet / ISP:** is the connection behind CGNAT? (Cloudflare Tunnel works in that case, port forwarding would not.)

---

## 📚 Skills This Project Will Practice

- Docker and Docker Compose networking
- Reverse proxies and tunnels
- ASP.NET Core: rate limiting, SignalR, Identity/JWT, EF Core
- PostgreSQL administration and backups
- Linux server hardening
- Threat modeling and defense in depth
