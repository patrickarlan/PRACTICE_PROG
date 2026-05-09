# Sequential Approval Workflow and Role System Refactor

This plan outlines the "Data Deep Change" required to implement a sequential approval team workflow and a refined role hierarchy. The goal is to move from a single-supervisor model to a flexible, multi-stage approval process, supporting complex organizational structures.

## User Review Required

> [!IMPORTANT]
> **Sequential Approval Logic**: The proposed logic assumes that when an AR is submitted, it follows the `order` defined in the `ApprovalTeam`. If an approver rejects/returns the AR, it goes back to the `Creator` for revision.
> **Viewer Role (Jen)**: The `Viewer` role has broad read access but can only approve ARs specifically routed to them in the sequence.
> **Owner/Admin Role (Eric)**: Can see all ARs (historical and current) but cannot approve unless they are the designated `CurrentApprover`.

## Real-World Case Example

| User | Role | Team Assignment | Approval Order |
| :--- | :--- | :--- | :--- |
| **Marc** | Creator | 'dev' | - |
| **Joren** | Approver | 'PM' | 'dev' #1 |
| **Jen** | Viewer | - | 'dev' #2, 'PM' #1 |
| **Eric** | Admin | - | Fallback/Direct |

### Scenarios:
1.  **Marc's AR**: Marc (dev) -> Joren (dev #1) -> Jen (dev #2) -> **Approved**.
2.  **Joren's AR**: Joren (PM) -> Jen (PM #1) -> **Approved**.
3.  **Eric (Owner)**: Can monitor Marc's and Joren's ARs at any stage but doesn't intervene unless assigned.

## Role Hierarchy & Permissions

The system follows a strict hierarchy for access levels:
**Creator** (Marc) < **Approver** (Joren) < **Viewer** (Jen) < **Admin** (Eric)

| Role | Access Level | Key Permissions |
| :--- | :--- | :--- |
| **Creator** | Level 1 | Create AR, View Own AR. |
| **Approver** | Level 2 | View/Approve ARs explicitly assigned to them. |
| **Viewer** | Level 3 | View all submitted ARs, Aggregated Dashboard. Can Approve ARs sent to them. NO Config access. |
| **Admin** | Level 4 | Full access (All ARs, History Logs, Team Configuration). |

## 3-Table Configuration Architecture

The system will be anchored by three primary tables to manage the workflow:

1.  **Net User** (`AspNetUsers`): Stores employee profile, `ApprovalTeamId`, and `SubstituteId`.
2.  **Roles** (`AspNetRoles`): Manages the hierarchy (**Creator, Approver, Viewer, Admin**).
3.  **Approval Team**: Stores the sequential approval sequences (Team Name + ordered Approver list).

---

### 1. Backend Models & Database [MODIFY/NEW]

#### [NEW] [ApprovalTeam.cs](file:///c:/Users/User/Intern%20Work/HRIS/backend/Models/ApprovalTeam.cs)
Create a new model to define the approval groups.
```csharp
public class ApprovalTeam
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; } = string.Empty;
    
    [Column(TypeName = "jsonb")]
    public List<ApproverConfig> Approvers { get; set; } = new();
}

public class ApproverConfig
{
    public string UserId { get; set; } = string.Empty;
    public int Order { get; set; } // Sequential order (1, 2, 3...)
}
```

#### [MODIFY] [ApplicationUser.cs](file:///c:/Users/User/Intern%20Work/HRIS/backend/Models/ApplicationUser.cs)
Extend the user model to link to a team and a substitute.
```csharp
public int? ApprovalTeamId { get; set; }
[ForeignKey("ApprovalTeamId")]
public ApprovalTeam? ApprovalTeam { get; set; }

public string? SubstituteId { get; set; }
[ForeignKey("SubstituteId")]
public ApplicationUser? Substitute { get; set; }
```

#### [MODIFY] [AccomplishmentReport.cs](file:///c:/Users/User/Intern%20Work/HRIS/backend/Models/AccomplishmentReport.cs)
Update to track the current stage of the sequential workflow.
```csharp
public int CurrentApprovalStage { get; set; } = 0; // 0 = Draft/Pending, 1 = First Approver, etc.
public string? CurrentApproverId { get; set; }

// Snapshot of the team at submission time to ensure consistency if the team config changes
[Column(TypeName = "jsonb")]
public List<ApproverConfig> ApprovalFlowSnapshot { get; set; } = new();
```

---

### 2. Role System Refactor [MODIFY]

#### [MODIFY] [SeedDatabase.cs](file:///c:/Users/User/Intern%20Work/HRIS/backend/Data/SeedDatabase.cs)
Update default roles and their hierarchy.
1.  **Creator**: Base employee.
2.  **Approver**: Middle management/Team leaders.
3.  **Viewer**: Upper management/Audit.
4.  **Admin**: System administrators.

#### [MODIFY] [Authorization Policies](file:///c:/Users/User/Intern%20Work/HRIS/backend/Program.cs)
Update policies to reflect the new hierarchy:
*   `CanViewAllARs`: Admin, Viewer.
*   `CanReviewAssignedARs`: Approver (where `CurrentApproverId == UserId`), Viewer (if assigned).
*   `CanManageTeams`: Admin.

---

### 3. Approval Logic [MODIFY]

#### [MODIFY] [AccomplishmentReportService.cs](file:///c:/Users/User/Intern%20Work/HRIS/backend/Services/AccomplishmentReportService.cs)
Implement the sequential logic:
*   **Submit**: Set `CurrentApprovalStage = 1`, set `CurrentApproverId` to the user with `Order = 1` in the team.
*   **Approve**: 
    *   If there is a next approver in the snapshot, increment `CurrentApprovalStage` and update `CurrentApproverId`.
    *   If no next approver, set status to `Approved`.
*   **Return**: Set status back to `Pending` (or `Returned`), reset `CurrentApprovalStage = 0`.

---

### 4. Frontend Updates [MODIFY]

#### Role-Based Dashboard & Navigation
*   **Creator (Marc)**: Show "My ARs" only.
*   **Approver (Joren)**: Show "Pending Reviews" (where they are the current approver).
*   **Viewer (Jen)**: 
    *   Show "Aggregated Dashboard" (all submitted ARs).
    *   Show "Pending Reviews" only for ARs explicitly routed to her.
    *   No access to Team Configuration or History Logs (Audit).
*   **Admin (Eric)**: 
    *   Full access including Team Configuration and History Logs.
    *   Can see all current and historical ARs.

#### [NEW] Approval Team Management
*   Create React Admin resources for `ApprovalTeam` to allow Admins to manage sequences.

## Verification Plan

### Automated Tests
*   **Unit Tests**: Verify the `ApprovalReportService` correctly increments stages.
*   **Integration Tests**: Verify that a user with the `Approver` role cannot see ARs they aren't currently assigned to.

### Manual Verification
1.  Create an `ApprovalTeam` with 2 approvers.
2.  Assign a `Creator` to this team.
3.  Submit an AR as the `Creator`.
4.  Verify it appears in the inbox of the 1st `Approver` and NOT the 2nd.
5.  Approve as the 1st `Approver`.
6.  Verify it moves to the inbox of the 2nd `Approver`.
7.  Verify the `Viewer` can see the AR at any stage in the "All ARs" view.
