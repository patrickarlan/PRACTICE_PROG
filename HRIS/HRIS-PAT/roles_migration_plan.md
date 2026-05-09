# Migration Plan: Claims to AspNetRoles Unification

This document outlines the files affected and the steps required to fully migrate the HRIS project from a hybrid Claims/Roles system to a unified **AspNetRoles** system.

## 1. Backend Affected Files (ASP.NET Core)

### Core Identity & Setup
- [ ] **`Data/SeedDatabase.cs`**:
    - *Action*: Ensure `SeedRolesAsync` creates exactly `SUPERADMIN`, `CREATOR`, `APPROVER`, and `VIEWER`.
    - *Action*: Remove manual claim assignments (e.g., `Reviewer` claim) during seeding.
- [ ] **`Program.cs`**:
    - *Action*: Update Authorization Policies to use `RequireRole()` instead of `RequireClaim()`.
    - *Action*: Ensure JWT bearer configuration correctly maps the role claim.

### Service Layer (Business Logic)
- [ ] **`Services/EmployeeService.cs`**:
    - *Action*: Refactor `UpdateEmployeeRoleAsync` (or similar) to use `userManager.AddToRoleAsync` and `userManager.RemoveFromRolesAsync` exclusively.
    - *Action*: Remove all logic related to adding/removing specific permission claims.
- [ ] **`Services/utils/EmployeeServiceUTILS.cs`**:
    - *Action*: Update helper methods like `IsUserInRole` to check Identity roles.
- [ ] **`Services/utils/AccomplishmentReportServiceUTILS.cs`**:
    - *Action*: Update the "Send To" and "Visibility" logic to rely on roles (e.g., finding all users in the `APPROVER` role for a department).
- [ ] **`Services/AuthService.cs`**:
    - *Action*: Ensure the `GenerateJwtToken` method includes all assigned roles in the token claims using `ClaimTypes.Role`.

### API Layer
- [ ] **`Controllers/EmployeesController.cs`**:
    - *Action*: Update the endpoint that handles role/permission updates to be a single "Role Update" operation.
- [ ] **`Controllers/AccountController.cs`**:
    - *Action*: Ensure the login/profile response returns a clean list of Roles.

---

## 2. Frontend Affected Files (React + React Admin)

### Authorization Core
- [ ] **`hris/src/authProvider.ts`**:
    - *Action*: Update `getPermissions` and `canAccess` to parse the `roles` array from the JWT.
    - *Action*: Remove any code that checks for specific claims (e.g., `hasClaim('Reviewer')`).
- [ ] **`hris/src/auth/roles.ts`**:
    - *Action*: Standardize role constants to match backend (SUPERADMIN, CREATOR, APPROVER, VIEWER).

### Data Orchestration
- [ ] **`hris/src/dataProvider.ts`**:
    - *Action*: Ensure the employee transformer correctly maps the `roles` field from the API to the local state.

### UI Components (Gating & Display)
- [ ] **`hris/src/components/app-sidebar.tsx`**:
    - *Action*: Simplify visibility logic for "Management" or "Employee" tabs using strictly the roles.
- [ ] **`hris/src/features/employer/components/Team/RoleCell.tsx`**:
    - *Action*: Ensure the dropdown values match the new role list.
    - *Action*: Simplify the update mutation to send only the role name.
- [ ] **`hris/src/features/employee/pages/utils/DashboardUTILS.tsx`**:
    - *Action*: Refactor permission helpers (`isSuperAdmin`, `isApprover`, etc.) to use the unified roles array.
- [ ] **`hris/src/features/employer/components/Team/CreateEmployeeDialog.tsx`**:
    - *Action*: Update role selection logic.

---

## 3. Migration Strategy

1.  **Backend Refactor**:
    - Update `EmployeeService` to handle role changes.
    - Clean up `SeedDatabase` and run it to reset roles in the DB.
2.  **API Verification**:
    - Test the `/api/auth/login` and `/api/employees` endpoints to ensure roles are returned correctly.
3.  **Frontend Refactor**:
    - Update `authProvider.ts` first to ensure the app doesn't break.
    - Gradually update components to use the new role-based permissions.
4.  **Cleanup**:
    - Delete any unused "Permission" related components or utility functions.
