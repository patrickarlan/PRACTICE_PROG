# HRIS Backend Server - Turnover & Setup Guide

This is the backend server for the Human Resource Information System (HRIS). It provides RESTful APIs, real-time WebSocket notifications, and role-based access control (RBAC) to support the frontend application.

This document is written as a "Plug and Play" guide for senior developers and incoming teams to seamlessly set up, run, and understand the core architecture.

---

## 🛠️ System Specifications & Tech Stack

- **Framework**: ASP.NET Core 10.0 (Web API)
- **ORM**: Entity Framework Core 10.0
- **Database**: PostgreSQL (via `Npgsql.EntityFrameworkCore.PostgreSQL`)
- **Authentication**: ASP.NET Core Identity + JWT Bearer Tokens
- **Real-Time Comm**: SignalR (WebSockets for push notifications)
- **Environment Management**: DotNetEnv (Loads `.env` files locally)
- **JSON Serialization**: Built-in `System.Text.Json` (configured for dynamic DTOs and EF Core JSONB mapping)

---

## 🚀 First-Time "Plug & Play" Setup

You do **not** need SQL scripts or database backup files to set up the database. Entity Framework (EF) Core handles the complete schema generation and initial data seeding.

### Step 1: Environment Configuration
1. Navigate to the `backend` folder.
2. Duplicate the `.env.example` file and rename the copy to `.env`.
3. Open `.env` and configure your local settings:
   - `DB_CONNECTION_STRING`: Ensure this points to an active PostgreSQL instance (e.g., `Host=localhost;Port=5432;Database=hris_dev;Username=postgres;Password=yourpassword`).
   - `JWT_SECRET`: A secure key (at least 32 characters) for signing tokens.
   - Adjust default test account credentials if necessary.

### Step 2: Automated Setup (Recommended)
We have provided a PowerShell script to automate tool installation, package restoration, database migrations, and application startup.

Open PowerShell (Run as Administrator recommended) and navigate to the setup folder:
```powershell
cd backend\setup_backend
.\setup-backend.ps1
```
*(Press `Y` when prompted to apply database migrations. This will build your schema and seed default users).*

### Step 3: Manual Setup (Alternative)
If you prefer standard CLI commands, run the following inside the `backend` directory:
```powershell
dotnet restore
dotnet tool install --global dotnet-ef   # If not already installed
dotnet ef database update                # Creates schema & seeds data
dotnet run                               # Starts the server (http://localhost:5107)
```

---
  
## 🏗️ Core Architecture & Features

### 1. Role-Based Access Control (RBAC)
The system uses ASP.NET Core Identity roles for governance:
- **`SuperAdmin`**: System governance. Can manage all users, roles, departments, and teams.
- **`Viewer`**: Typically assigned to HR or high-level managers. Can view all reports within their assigned teams/departments without participating in the approval sequence.
- **`Approver`**: Team Leads or Managers who are part of the parallel approval flow (First-Responder model).
- **`Creator`**: The **Standard User** role. Every employee is a "Creator" by default, allowing them to draft and submit Accomplishment Reports (ARs).

### 2. Team & Department Hierarchy
Access is further refined by **Approval Teams**:
- Users are linked to a specific team.
- Reports are routed to all defined `Approvers` within the team simultaneously (Parallel Approval).
- `Viewers` are CC'd on all reports within their assigned teams.
  
### 3. Phase 12: Unified Administrative Oversight
The system now features a **Global Administrative UI** that ensures parity between the "Management" and "Super Admin" views:
- **Participation Metrics**: Participation ratios (e.g., 3/10) are now strictly filtered for **Submitters** (active Employees & Team Leads), excluding non-reporting administrative overhead.
- **Interactive Analytics**: High-contrast, interactive tooltips provide simplified, real-time context for every submission status.
- **Pending Actions**: A unified "Intervention Queue" that alerts HR and Management to reports requiring immediate review, featuring animated Clock3 icons and amber-themed visual urgency.

### 2. Real-Time Notifications (SignalR)
The application features a real-time push notification system:
- **Hub**: `NotificationHub` mapped at `/hubs/notifications`.
- **Flow**: When critical actions occur (e.g., Report Submitted, Approved, Returned, or Viewed), the `NotificationService` persists the alert to the PostgreSQL `Notifications` table and pushes a live SignalR event (`ReceiveNotification`) to the specific user's connection group (`user-{userId}`).

### 3. Unified API Responses
All API endpoints return a standardized wrapper DTO: `ApiResponse<T>`.
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```
The frontend `dataProvider.ts` is strictly configured to unwrap this structure.

---

## 🗄️ Database Migrations (Turnover Notice)

The `Migrations` folder contains the step-by-step history required to build the database from scratch. 

### ⚠️ CRITICAL: Do Not Delete the Migrations Folder
If you delete this folder, EF Core will lose the blueprint required to build the database on a new machine. The incoming developer *must* have these files to run `dotnet ef database update` successfully.

### How to Clean Up ("Squash") Migrations Later:
Once the new team has successfully initialized their databases, senior developers may want to "squash" the massive migration history into a single clean slate:
1. **Verify**: Ensure the local database schema perfectly matches the current codebase.
2. **Delete**: Remove the entire `Migrations` folder.
3. **Re-Initialize**: Run `dotnet ef migrations add InitialCreate`.
4. **Result**: EF Core generates one single file representing the final state, effectively resetting the history tree.

---

## 🧪 Default Seeded Accounts
Upon the first successful database migration (`dotnet ef database update`), the `SeedDatabase` utility automatically populates standard testing accounts, roles, and permission claims.

**Plug & Play Ready**: A senior developer can simply run `dotnet ef database update` to get a fully functioning system with all complex role hierarchies (SuperAdmin, Team Leads, Employees) and initial data ready for demonstration.

Default accounts (configured in `.env`):
- **SuperAdmin**: `admin@hris.local`
- **Employee**: `USER_SAMPLE_EMAIL`
- **Approver**: `APPROVER_EMAIL`
- **Viewer**: `VIEWER_EMAIL`
 