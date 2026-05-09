# HRIS End-to-End (E2E) Test Plan

## 1. Overview
The Human Resource Information System (HRIS) is designed to streamline employee data management and the submission/approval workflow of Accomplishment Reports (AR). This test plan outlines the strategy for validating the system's end-to-end functionality, focusing on user experience, data integrity, and role-based security.

**Scope:**
- Authentication and Session Management.
- Accomplishment Report (AR) Lifecycle (Create -> Submit -> Review -> Approve/Return).
- Team Management and Permissions.
- Role-Based Access Control (RBAC) enforcement.

---

## 2. User Roles & Permissions

| Role | Permissions | Constraints | Default Configuration |
| :--- | :--- | :--- | :--- |
| **Employee** | Create ARs, Edit/Delete Pending ARs, View dashboard. | Cannot view others' ARs; Cannot approve. | Role: `Creator` |
| **Approver** | View all ARs, Approve/Return ARs, Manage Team. | Must have `Approver` claim. | Role: `HR Management`, Claim: `Permission: Approver` |
| **Viewer** | Read-only access to all reports and team data. | Cannot modify any data. | Role: `Creator`, Claim: `Permission: Viewer` |
| **Admin** | Full system access, Role/Claim management. | N/A | Role: `SuperAdmin` |

---

## 3. Test Scenarios by Role

### A. Persona: Employee
#### **Flow: Authentication**
- **TC-EMP-01: Successful Login**
  - Steps: Enter valid employee credentials.
  - Verification: Redirected to `/ar-dashboard`; Token stored in local storage.
- **TC-EMP-02: Logout**
  - Steps: Click logout button.
  - Verification: Session cleared; Redirected to login page.

#### **Flow: Accomplishment Report (AR) Lifecycle**
- **TC-EMP-03: Create & Submit AR**
  - Steps: Navigate to "Create AR", fill in Title, Date, and at least one Task.
  - Data Requirements:
    - **Title**: Must be descriptive (e.g., "Daily Log - 2026-04-27").
    - **Account/Project**: Valid project name.
    - **Task**: Clear description of work.
    - **Start/End Time**: Must be valid 24h format (e.g., 09:00 to 18:00). Total hours must be > 0.
  - Verification: Report appears in dashboard with status `Pending`. Date and times persist correctly.
- **TC-EMP-04: Edit Pending AR**
  - Steps: Click edit on a `Pending` report, change title, save.
  - Verification: Updates reflected in the list; status remains `Pending`.
- **TC-EMP-05: Handle Returned AR**
  - Steps: Find a report marked `Returned`, read feedback, edit as requested, and resubmit.
  - Verification: Action is logged in `FeedbackHistory`; status returns to `Pending`.

---

### B. Persona: Regular User (Admin/Reviewer)
#### **Flow: Review Queue**
- **TC-REV-01: Global Visibility**
  - Steps: Navigate to `/ar-reviews`.
  - Verification: List shows reports from multiple different employees.
- **TC-REV-02: Approve Report**
  - Steps: Select a `Pending` report, review details, click `Approve`.
  - Verification: Status changes to `Approved`; Report is locked for employee editing.
- **TC-REV-03: Return for Revision**
  - Steps: Select a `Pending` report, click `Return`, enter feedback message (e.g., "Please add more detail to Task 1").
  - Verification: Status changes to `Returned`; Employee receives notification/update.

#### **Flow: Team Oversight**
- **TC-REV-04: Manage Member Permissions**
  - Steps: Navigate to `/team`, select an employee, modify their claims (e.g., add `Approver`).
  - Verification: Employee now has access to the Review tab upon their next login.

---

## 4. Preconditions & Test Data

### **Environment Setup**
- **Backend API**: `http://localhost:5107` (Ensure PostgreSQL is running).
- **Frontend App**: `http://localhost:3000`.

### **Seed Data Requirements**
| Entity | Test Value | Purpose |
| :--- | :--- | :--- |
| **Employee User** | `employee@hris.test` / `Password123!` | Standard submission testing. |
| **Admin User** | `admin@hris.test` / `SuperAdmin@123!` | Reviewer/Manager workflow testing. |
| **Test Report** | Title: "Weekly Sync", Status: "Pending" | Existing data for immediate review testing. |

---

## 5. Expected Outcomes

- **Pass Criteria**:
  - All Shadcn UI components render correctly without layout shifts.
  - Status transitions (Pending -> Approved/Returned) are atomic and consistent.
  - The UI correctly locks fields (Read-only) for `Approved` reports.
  - No "Forbidden" or "Internal Server Error" alerts appear during valid workflows.
- **Fail Criteria**:
  - An employee can view or edit another employee's report via URL manipulation.
  - A report stays `Pending` even after an approval action is confirmed.
  - Frontend crashes due to missing data in the `ApiResponse` wrapper.

---

## 6. Out of Scope

- **Performance Benchmarking**: Testing the system under 100+ concurrent users.
- **External Notifications**: Actual delivery of emails (validated via logs/database only).
- **Mobile Native Testing**: Testing on iOS/Android devices (Responsive web only).
- **Legacy Browser Support**: Testing on Internet Explorer or versions of Chrome/Firefox older than 2 years.
