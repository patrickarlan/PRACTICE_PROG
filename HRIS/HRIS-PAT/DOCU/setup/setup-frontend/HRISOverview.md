# Human Resource Information System (HRIS) - MVP

## Project Overview
This HRIS is a comprehensive, modern full-stack application designed to streamline employee data management with a specialized focus on **Accomplishment Reports (AR)**. It features a unified administrative workflow, a custom Shadcn UI + Tailwind CSS frontend, and a secure ASP.NET Core 10 backend.

---

## Key Features

### 1. Accomplishment Reports (AR) Lifecycle
- **Unified Workflow**: Reports progress through 4 distinct states: **Draft**, **Pending** (Awaiting Review), **Approved**, and **Returned** (Requires Revision with Feedback).
- **Tabular Task Entry**: Stores granular tasks using a high-performance JSONB structure, tracking clients, task names, and precise durations (Start/End times).
- **Activity Timeline**: A visual, chronological history of status changes and reviewer comments attached to every report.
- **Excel Flattening**: Advanced export feature that unpacks JSONB tasks into individual Excel rows for payroll and auditing.

### 2. Identity & Approval Team Architecture
The system uses strict Role-Based Access Control (RBAC) combined with dynamic Approval Teams:
- **Creator**: The standard role. Can create, edit (if pending/returned), and track personal reports.
- **Approver**: Team Leads/Managers. Approves reports based on assigned `ApprovalTeams` in a parallel First-Responder hierarchy.
- **Viewer**: Read-only oversight role for specific teams or departments.
- **SuperAdmin**: The master role. Full control over user management, roles, teams, and system configuration.

### 3. Global Administrative Dashboards
- **Dashboard Parity**: 1:1 visual and functional synchronization between Management and Super Admin dashboards.
- **Interactive Analytics**: High-contrast tooltips provide simplified, real-time context (e.g., "3 out of 10 reports pending") in a user-friendly sentence case.
- **Accuracy-First Metrics**: Participation ratios strictly filter for **Submitters** (active staff), excluding administrative overhead for cleaner data.
- **Intervention Queue**: A unified "Pending Actions" panel with amber-themed urgency and animated status indicators.

### 4. Integrated Notification Ecosystem
- **Database-Driven Inbox**: A centralized alert system that persists all critical AR lifecycle events (Submission, Approval, Return).
- **Interactive Navigation**: One-click navigation from any notification directly to the relevant report.

---

## 🚀 Setup & Installation (Plug & Play)

### Prerequisites
- **.NET 10 SDK**
- **Node.js (v18+)**
- **PostgreSQL**

### 1. Automated Setup (Recommended)
We provide two PowerShell scripts to automate the entire environment preparation:

- **Backend Setup**:
  ```powershell
  .\setup-backend.ps1
  ```
  *Restores packages, verifies .NET tools, and runs `dotnet ef database update` to build the full schema and seed roles/teams.*

- **Frontend Setup**:
  ```powershell
  .\setup-frontend.ps1
  ```
  *Installs all npm dependencies and starts the Vite development server.*

### 2. Manual Setup
If you prefer manual control:

**Backend (`/backend`)**
```bash
dotnet restore
dotnet ef database update  # Creates schema & seeds admin@hris.local
dotnet run                # Starts on http://localhost:5107
```

**Frontend (`/hris`)**
```bash
npm install
npm run dev               # Starts on http://localhost:5173
```

---

## Technical Stack
- **Backend**: ASP.NET Core 10, Entity Framework Core, PostgreSQL (JSONB).
- **Frontend**: React 19, React Admin v5 (Data Core), Shadcn UI, Tailwind CSS.
- **Aesthetics**: Premium high-contrast dark modes, emerald/amber accent palettes, and responsive micro-animations.
