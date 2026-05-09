# Implementation Plan: Phase 29 - Remote Scheduler System

## Goal Description
Implement a "Remote Scheduler" that governs when users are allowed to submit Accomplishment Reports. If a user's current submission date does not fall within a configured shift (matching Month, Weekday, and Year), the system will prevent the report from being saved.

## Proposed Changes

### 1. Backend Infrastructure

#### [NEW] `ShiftConfiguration.cs` (Models)
Create a model to store the JSON-based schedule definitions.
- `Id`: Primary Key
- `ShiftName`: string (e.g., "Full Shift")
- `Months`: List<string> (stored as JSONB)
- `Weekdays`: List<string> (stored as JSONB)
- `Year`: string (e.g., "2026")
- `StartTime`: TimeOnly
- `EndTime`: TimeOnly
- `IsActive`: bool
- **Note**: These schedules are **Global** (system-wide).

#### [MODIFY] `ApplicationDbContext.cs`
- Register `DbSet<ShiftConfiguration>`.
- Add JSONB conversion logic for `Months` and `Weekdays`.

### 2. Validation Logic

#### [NEW] `ShiftValidationService.cs`
Implement the core "Submission Gate" logic:
- **`IsSubmissionAllowed(userId, date)`**: 
  - Uses **Philippines Standard Time (PST)** for all date comparisons (`UTC+8`).
  - Fetches all active **Global** `ShiftConfigurations`.
  - Checks if `date.Month` (abbreviated), `date.DayOfWeek` (abbreviated), and `date.Year` match any entry in the allowed lists.

#### [MODIFY] `AccomplishmentReportController.cs`
- In the `POST` (Create) and `PUT` (Update/Submit) methods, call the `ShiftValidationService`.
- If allowed: Proceed with save.
- If denied: Return `400 Bad Request` with a clear message: *"Unauthorized Submission: No active shift found for [Current Date]."*

### 3. Frontend Integration

#### [MODIFY] `Config.tsx` & `ShiftManagement.tsx`
- Refactor the existing UI components to fetch and save data to the new `/api/ShiftConfigurations` endpoint instead of using local state.
- Implement "Save" and "Delete" functionality for schedules.

#### [MODIFY] `AccomplishmentReportForm` (Optional)
- Proactively check the scheduler before the user even starts a report, showing a warning banner if they are "Off-Shift."


## Verification Plan

### Automated Tests
- Unit test for `ShiftValidationService` with various mock schedules (e.g., "Mon-Fri only" rejecting a Sunday submission).
- API integration test for the 400 Bad Request response.

### Manual Verification
- Create a "Weekend Only" shift and attempt to submit a report on a Monday.
- Verify that the error message appears clearly in the frontend toast notifications.
