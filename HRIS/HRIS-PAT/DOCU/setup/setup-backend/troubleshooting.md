# 🛠️ Advanced Troubleshooting & Diagnostic Guide

This document provides high-level technical solutions for common and advanced issues encountered during the development, deployment, and auditing of the HRIS application.

---

## 🔐 Authentication & Security

### 1. Persistent 401 Unauthorized (JWT Secret Mismatch)
*   **Symptom**: All protected requests fail with 401 even after a successful login.
*   **Cause**: The `JWT_SECRET` in the `.env` file was changed, but the browser is still holding a token signed with the *old* secret.
*   **Solution**: 
    1.  Clear browser `localStorage` (F12 -> Application -> Local Storage -> Clear All).
    2.  Ensure the `JWT_SECRET` in `backend/.env` is at least 32 characters long.
    3.  Restart the backend server to ensure the new secret is loaded into memory.

---

---

## 🗄️ Database & Entity Framework

### 3. Migration Desync (Schema Mismatch)
*   **Symptom**: `dotnet ef database update` fails with "Table 'AccomplishmentReports' already exists" or "Column 'X' does not exist".
*   **Cause**: The local database schema has drifted from the migration history (often happens after a git pull with new migrations).
*   **Solution**:
    1.  **The "Clean Slate" Method**: Drop the local database and run `dotnet ef database update`.
    2.  **Manual Sync**: Check the `__EFMigrationsHistory` table. If a migration was manually applied but not recorded, insert its ID manually.

### 4. PostgreSQL Port Collision (5432 vs 5433)
*   **Symptom**: Connection timeout or "Password authentication failed" even with correct credentials.
*   *Cause**: You may have multiple PostgreSQL versions installed (e.g., v14 on 5432 and v16 on 5433).
*   **Solution**: Check `services.msc` for running Postgres instances. Update the `Port` in your `.env` connection string to match the instance holding your `hris_dev` database.

### 5. JSONB Serialization Errors
*   **Symptom**: Backend 500 when loading a report; error mentions "Could not deserialize JSON".
*   **Cause**: Manual database edits corrupted the `TasksJson` format.
*   **Solution**: Ensure the JSON structure in the database exactly matches the `TaskItem` DTO. If corrupted, clear the column or reset the record to `[]`.

---

## 🎨 Frontend & UI Architecture

### 6. "Context not found" Crash (MUI vs Shadcn)
*   **Symptom**: The entire UI goes white with a `TypeError: Cannot read property of undefined` in the console.
*   **Cause**: A developer imported a component from `@mui/material` instead of using the custom wrappers in `@/components`. MUI's theme engine is incompatible with our Shadcn/Tailwind root.
*   **Solution**: Remove the MUI import. Search the file for `react-admin` or `@mui/material` and replace with the appropriate custom component from `hris/src/components/`.

### 7. Vite 504 Gateway Timeout
*   **Symptom**: Frontend shows "504 Gateway Timeout" when attempting to fetch data.
*   **Cause**: The backend is paused at a breakpoint during a debug session, exceeding Vite's proxy timeout.
*   **Solution**: Continue the C# debugger or increase the `proxy.timeout` in `hris/vite.config.ts`.

---

## 📈 System Operations

### 8. Idempotency Key Violation (409 Conflict)
*   **Symptom**: User gets a "Report already exists" message when submitting.
*   **Cause**: The frontend submitted the same payload twice within milliseconds (Network race condition).
*   **Solution**: This is a **feature, not a bug**. The system prevents duplicate reports. If it happens frequently, verify that the "Submit" button correctly disables after the first click in `AccomplishmentReportCreate.tsx`.

### 9. Excel Export 400 Bad Request
*   **Symptom**: "Export Failed" toast message.
*   **Cause**: Attempting to export an empty list or a list where the `TasksJson` column is null.
*   **Solution**: Ensure at least one report is selected or visible in the list. Check the browser Network tab for the specific error message returned by the `Export` endpoint.
