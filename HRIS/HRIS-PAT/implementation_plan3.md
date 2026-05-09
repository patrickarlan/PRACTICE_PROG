# Implementation Plan 3: Phase 24 - Strict Approver Alignment

Enforce a strict constraint where any user (including Viewers) can only be assigned as an **Approver** to exactly one team at a time. This mirrors the existing constraint for **Members** (Creators).

## User Review Required

> [!IMPORTANT]
> **Data Integrity Check**: Before applying the database unique constraint, we must ensure no users are currently assigned to multiple teams as approvers. If they are, the migration will fail. I will provide a script/check for this.

> [!NOTE]
> **Workflow Impact**: To move an approver from Team A to Team B, an Admin MUST first remove them from Team A's sequence.

## Proposed Changes

### 1. Database Layer (EF Core)

#### [MODIFY] [ApplicationDbContext.cs](file:///c:/Users/HP/source/repos/mrccdrc27/HRIS/backend/Data/ApplicationDbContext.cs)
- Add a unique index on the `UserId` column in the `ApprovalTeamApprover` entity.
- This prevents the database from ever accepting a second assignment for the same user.

### 2. Backend Logic (API)

#### [MODIFY] [ApprovalTeamsController.cs](file:///c:/Users/HP/source/repos/mrccdrc27/HRIS/backend/Controllers/ApprovalTeamsController.cs)
- Add a validation check in `UpdateApprovalTeam` and `CreateApprovalTeam`.
- Before saving, check if any of the incoming `Approver.UserId`s are already assigned to a DIFFERENT `ApprovalTeamId`.
- Return a clear 400 Bad Request if a conflict is found (e.g., "User [Name] is already an approver for Team [X]").

### 3. Frontend UI (React Admin / Shadcn)

#### [MODIFY] [ApprovalTeamApproverDialog.tsx](file:///c:/Users/HP/source/repos/mrccdrc27/HRIS/hris/src/features/team-management/ApprovalTeamApproverDialog.tsx)
- Update the `filteredEmployees` memoized logic.
- Fetch the list of all teams and extract all active approver IDs (excluding the current team being edited).
- Filter out these users from the selection list so they cannot be picked.
- Add a "Already Assigned" tooltip or indicator if possible, or simply hide them to maintain consistency with the Members dialog.

### 4. UI Polish

#### [MODIFY] [ApprovalTeamCell.tsx](file:///c:/Users/HP/source/repos/mrccdrc27/HRIS/hris/src/features/employer/components/Team/ApprovalTeamCell.tsx)
- Since a user can now only have ONE managed team, the logic will prioritize showing that team name in the blue "Management" box.
- The emerald badges will still act as a fallback for existing data or future-proofing, but will typically only show one item.

## Verification Plan

### Automated Tests
1. **API Validation Test**:
   - Try to POST a new team with an approver who is already in another team -> Expect 400 Error.
2. **Database Constraint Test**:
   - Manually try to insert a duplicate `UserId` into `ApprovalTeamApprovers` -> Expect DB Exception.

### Manual Verification
1. **Frontend Filtering**:
   - Open Team A, add Jen as an approver.
   - Open Team B, check the "Add Approver" list -> Jen should be missing from the list.
2. **Role Behavior**:
   - Log in as Jen (Viewer). Verify she can approve reports for Team A.
   - Verify her "Team AR" tab still shows all reports globally (as per Viewer permissions).
