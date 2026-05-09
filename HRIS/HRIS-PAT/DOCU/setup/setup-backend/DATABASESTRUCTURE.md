# Database Setup & Schema Guide (HRIS Backend)

This document describes the PostgreSQL schema, key tables, and constraints for the HRIS database. Entity Framework (EF) Core automatically manages these structures via migrations.

## 1. Database Creation & Migrations

The database is generated automatically using EF Core. You do not need to execute raw `.sql` files.

1. Configure `DB_CONNECTION_STRING` in your `backend/.env` file.
2. Run `.\setup-backend.ps1` (located in `backend/setup_backend/`) to apply migrations, OR run:
   ```powershell
   dotnet ef database update
   ```

## 2. Key Tables and Columns

### 2.1 `AccomplishmentReportEXP` (Mapped to `AccomplishmentReports` in EF)
This is the core table storing grouped Accomplishment Reports. Instead of saving one row per task, tasks are stored as a structured JSONB array, drastically reducing database complexity.

**Columns:**
- `ReportId` - `int` (Primary Key, Auto-increment)
- `Date` - `date` (Required)
- `Title` - `string` (Max: 64 chars)
- `Status` - `string` (e.g., Pending, Approved, Returned. Default: "Pending")
- `IdempotencyKey` - `Guid` (Unique, prevents duplicate submissions)
- `CreatedAt` - `timestamp with time zone` (Default: UTC Now)
- `IsDeleted` - `boolean` (Soft delete flag)
- `IsModifiedByAdmin` - `boolean`

**Break Tracking:**
- `BreakStartTime` / `BreakEndTime` - `TimeOnly`
- `BreakDurationMinutes` - `int`

**Relational Mappings (Strings pointing to `AspNetUsers.Id`):**
- `UserId` - Owner/Submitter of the report.
- `ReceiverId` - Assigned Approver.
- `ViewerId` - Assigned Viewer (CC).
- `ReturnedById` - ID of the last person who returned the report.
- `CurrentApproverId` - ID of the primary approver (or the specific reviewer in parallel mode).

**JSONB Collections:**
- `Tasks` (`jsonb`): A serialized list of `ARTask` objects.
  - `Client` (String, Max 64 chars)
  - `TaskName` (String, Max 300 chars)
  - `Particulars` (String, Unlimited)
  - `StartTime` / `EndTime` (TimeOnly)
- `FeedbackHistory` (`jsonb`): A serialized list of `ARFeedback` objects tracking the review lifecycle.
- `ApprovalFlowSnapshot` (`jsonb`): Stores the sequence of approvers at the time of submission.

### 2.2 `ApprovalTeams`
Manages the grouping of creators and the parallel/multiple approver hierarchy for their reports.

**Columns:**
- `Id` - `int` (PK)
- `Name` - `string` (Max 25)
- `CreatedAt` - `timestamp`

### 2.3 `ApprovalTeamMembers` (Creators)
Links employees to specific approval teams.
- `UserId` (Unique, one team per creator)
- `ApprovalTeamId`

### 2.4 `ApprovalTeamApprovers` (Approvers/Viewers)
Defines the primary and backup approvers for a team (Parallel/First-Responder model).
- `UserId` (Approvers can manage multiple teams simultaneously)
- `ApprovalTeamId`
- `Order` - `int` (Hierarchy level: 1 = Primary, 2+ = Backups)

### 2.5 `Departments`
Top-level organizational grouping.
- `Id` - `int` (PK)
- `Name` / `Code` (Unique)

### 2.6 `AspNetUsers` (Identity User Data)
The system extends the default ASP.NET Core Identity user model (`ApplicationUser`).

**Custom Columns:**
- `FullName` - `text`
- `Position` - `text`
- `DepartmentId` - `int` (Foreign Key -> Departments)
- `ApprovalTeamId` - `int` (Foreign Key -> ApprovalTeams)
- `EmployeeID` - `int` (Unique employee number)

### 2.7 `Notifications`
This table tracks real-time system alerts pushed via SignalR.

---

## 3. Notes for Future Schema Changes

1. Modify your C# class models inside `backend/Models`.
2. Generate a new migration:
   ```powershell
   dotnet ef migrations add DescriptiveNameOfChange
   ```
3. Apply to the local database:
   ```powershell
   dotnet ef database update
   ```
