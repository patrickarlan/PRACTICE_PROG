# Implementation Plan - Refactoring Approval Teams (Idea 1)

This plan outlines the transition from a department-based approval routing system to a team-based system using associative tables. This provides maximum flexibility for defining who belongs to a team and who approves their reports, independent of their tagged department.

## User Review Required

> [!IMPORTANT]
> **Relationship Change**: Users will now be explicitly assigned to Approval Teams via a new `ApprovalTeamMember` table. This replaces the implicit `user.Department -> Department Approver` routing logic.
> **Sequential Approvers**: The current `jsonb` approver list in `ApprovalTeam` will be moved to a dedicated `ApprovalTeamApprover` table to improve query performance and data integrity.

> [!WARNING]
> **Existing Data**: A migration script will be needed to move existing `jsonb` approver data and current `user.ApprovalTeamId` assignments to the new associative tables.

## Proposed Changes

### Backend Models

#### [NEW] [ApprovalTeamMember.cs](file:///c:/Users/HP/source/repos/mrccdrc27/HRIS/backend/Models/ApprovalTeamMember.cs)
- Create a many-to-many junction table between `ApprovalTeam` and `ApplicationUser`.
- `Id` (int)
- `ApprovalTeamId` (int)
- `UserId` (string)
- Navigation properties.

#### [NEW] [ApprovalTeamApprover.cs](file:///c:/Users/HP/source/repos/mrccdrc27/HRIS/backend/Models/ApprovalTeamApprover.cs)
- Create a many-to-many junction table between `ApprovalTeam` and `ApplicationUser` for the approval chain.
- `Id` (int)
- `ApprovalTeamId` (int)
- `UserId` (string)
- `Order` (int) - Defines the sequence (e.g., 1 for First Approver, 2 for Second Approver).

#### [MODIFY] [ApprovalTeam.cs](file:///c:/Users/HP/source/repos/mrccdrc27/HRIS/backend/Models/ApprovalTeam.cs)
- Remove `Approvers` (`jsonb`) column.
- Add `ICollection<ApprovalTeamMember> Members`.
- Add `ICollection<ApprovalTeamApprover> Approvers`.

#### [MODIFY] [ApplicationUser.cs](file:///c:/Users/HP/source/repos/mrccdrc27/HRIS/backend/Models/ApplicationUser.cs)
- Potentially remove `ApprovalTeamId` and use the `Members` collection for many-to-many support (as per "WE ADD ASSOCIATIVE TABLE").

---

### Backend Logic & API

#### [MODIFY] [ApplicationDbContext.cs](file:///c:/Users/HP/source/repos/mrccdrc27/HRIS/backend/Data/ApplicationDbContext.cs)
- Register `DbSet<ApprovalTeamMember>` and `DbSet<ApprovalTeamApprover>`.
- Configure relationships and cascading deletes.
- Remove JSONB conversion logic for `ApprovalTeam.Approvers`.

#### [MODIFY] [AccomplishmentReportService.cs](file:///c:/Users/HP/source/repos/mrccdrc27/HRIS/backend/Services/AccomplishmentReportService.cs)
- Update `SubmitReportAsync` logic:
    - Find the user's `ApprovalTeam` (via `ApprovalTeamMember`).
    - If multiple teams exist, use the first one (or primary).
    - Retrieve the `ApprovalTeamApprover` with `Order = 1` for the initial `ReceiverId`.
- Update `ApproveReportAsync` logic:
    - Find the next approver in the sequence (`Order + 1`) from the same team.

#### [MODIFY] [ApprovalTeamsController.cs](file:///c:/Users/HP/source/repos/mrccdrc27/HRIS/backend/Controllers/ApprovalTeamsController.cs)
- Update `POST` and `PUT` endpoints to handle the nested collections of `Members` and `Approvers`.
- Include `Members` and `Approvers` in `GET` responses.

---

### Frontend (React Admin)

#### [MODIFY] [ApprovalTeamDialog.tsx](file:///c:/Users/HP/source/repos/mrccdrc27/HRIS/hris/src/features/team-management/ApprovalTeamDialog.tsx)
- **Team Members Section**: Add a Multi-Select or Checkbox group to assign users to the team.
- **Approver Sequence Section**: Refactor to save to the new `Approvers` collection format.
- Ensure only relevant users (e.g., with `Approver` claim) are selectable in the Approver section, while any user can be a Member.

#### [MODIFY] [ApprovalTeamList.tsx](file:///c:/Users/HP/source/repos/mrccdrc27/HRIS/hris/src/features/team-management/pages/ApprovalTeamList.tsx)
- Update the "Assigned Users" count column to pull from the `Members` collection.

---

## Verification Plan

### Automated Tests
- **EF Migration**: Run `dotnet ef migrations add RefactorApprovalTeams` and verify the generated script.
- **API Testing**: Use Postman/Swagger to create a team with members and approvers, then submit an AR as a member and verify it routes to the correct first approver.

### Manual Verification
1.  **Setup Team**: Create "Team Dev" with Patrick/Marc as members and Joren -> Jen as approvers.
2.  **Submission**: Log in as Patrick, submit a report.
3.  **Routing**: Verify Joren sees the report in his "Pending" list.
4.  **Approval**: Joren approves; verify Jen now sees the report.
5.  **Final Approval**: Jen approves; verify report status becomes "Approved".
