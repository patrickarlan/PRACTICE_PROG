# Database Utility Scripts

This directory contains the essential SQL scripts required for maintaining the HRIS database schema, triggers, and backups.

## 🗂️ Script Catalog

### 1. `master-setup.sql` (Recommended)
*   **Importance**: The definitive, up-to-date schema script generated directly from the latest Entity Framework migrations.
*   **What it includes**: All current tables including `Departments`, `ApprovalTeamApprovers`, `ShiftConfigurations`, and the expanded `AccomplishmentReportEXP` fields.
*   **When to run**: Use this for fresh manual installations if you cannot run `dotnet ef database update`.

### 2. `repair_audit_logs.sql`
*   **Importance**: This is the master "source of truth" for the system's audit logging logic. It defines the secure PostgreSQL triggers that track changes to reports and user accounts.
*   **What it fixes**: 
    *   Ensures sensitive data (like `PasswordHash`) is **never** logged.
    *   Synchronizes the "SYSTEM" fallback so attribution is always correct.
    *   Optimizes logging to prevent "doubled" entries.
*   **When to run**: Run this if the Audit Logs in the UI show "Unknown" or if triggers are accidentally deleted/disabled in pgAdmin.

### 3. `setup-database.sql` (Legacy)
*   **Importance**: The foundational script used for the project's initial database creation.
*   **Note**: This is now **legacy** and does not contain recent Phase 14-28 structural changes. Use `master-setup.sql` instead.

### 4. `setup-test.sql` (Legacy)
*   **Importance**: Similar to `setup-database.sql` but targeting a test environment. Legacy.

---

## 🚀 How to Run
Most scripts can be executed via the terminal from the `backend` folder:
```powershell
psql -d hris_dev -f setup_backend/sql/filename.sql
```
