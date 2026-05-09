# HRIS Project Context (GEMINI.md)

## Project Overview
This is a comprehensive **Human Resource Information System (HRIS)** designed to manage employee data and "Accomplishment Reports" (AR). The system follows a modern full-stack architecture with a focus on role-based workflows and a polished, custom UI.

### Architecture
- **Backend**: ASP.NET Core 10 (Web API) using Entity Framework Core with PostgreSQL.
- **Frontend**: React 19 (Vite) utilizing **React Admin v5** for data orchestration, but with a **custom Shadcn UI + Tailwind CSS** replacement for the default Material UI (MUI) components.
- **Authentication**: ASP.NET Core Identity with JWT Bearer tokens and Claim-Based Role Management (e.g., `Reviewer` claim).

---

## Building and Running

### Prerequisites
- **.NET 10 SDK**
- **Node.js (v18+)**
- **PostgreSQL** (Connection string should be in `backend/.env`)

### Automated Setup
The project includes PowerShell scripts for environment preparation:
- **Backend**: `.\setup-backend.ps1` (Restores packages, applies EF migrations, and starts the API on port 5107).
- **Frontend**: `.\setup-frontend.ps1` (Installs dependencies and starts the Vite dev server).

### Manual Commands
#### Backend (`/backend`)
```powershell
dotnet restore
dotnet ef database update  # Applies schema changes
dotnet run                # Starts on http://localhost:5107 (or as configured)
```

#### Frontend (`/hris`)
```bash
npm install
npm run dev               # Starts on http://localhost:5173
```

---

## Development Conventions & Critical Rules

### ⚠️ CRITICAL: UI Component Imports
This project **completely replaces** React Admin's default MUI components with Shadcn UI. 
- **Rule**: NEVER import UI components directly from `react-admin` or `@mui/material` (e.g., `<SimpleForm>`, `<Datagrid>`, `<DeleteButton>`).
- **Reason**: Mixing MUI's theme engine with the custom Shadcn setup causes theme provider crashes.
- **Solution**: ALWAYS use the custom wrappers provided in `hris/src/components/`.
  ```tsx
  // ✅ Correct
  import { SimpleForm, DeleteButton } from '@/components';
  ```

### Data Flow & API Pattern
- **ApiResponse Wrapper**: The backend wraps all responses in a unified `ApiResponse<T>` DTO.
- **DataProvider**: `hris/src/dataProvider.ts` automatically unwraps these responses and maps backend IDs (e.g., `reportId`) to React Admin's required `id` field.
- **Pessimistic Mutations**: All Accomplishment Report mutations (Create/Update/Delete) use `mutationMode="pessimistic"` to ensure UI consistency and prevent "bounce-back" errors.

### Security & RBAC
- **Claim-Based Roles**: Beyond basic `Admin`/`Employee` roles, the system uses **Identity Claims** (e.g., `Reviewer`) for granular permissions.
- **Status Guards**: Records (especially ARs) are visually and logically locked based on their `status` (Pending, Approved, Rejected). Employees cannot edit or delete reports once they are no longer "Pending".

---

## Key Files & Documentation
- `backend/Program.cs`: Main API configuration, middleware, and auth policies.
- `hris/src/dataProvider.ts`: The bridge between the frontend and the .NET API.
- `hris/README.md`: Detailed frontend-specific rules and architecture notes.
- `backend/tasksforHRIS/AR_Implementation_Tasks.md`: Current implementation roadmap and feature specifications.
- `backend/Models/AccomplishmentReport.cs`: Core data model for the AR feature.

---

## Testing Guidelines
1. **Role Testing**: Always verify features with at least two accounts:
   - **Employee**: To test submission and personal dashboard restrictions.
   - **Admin/Reviewer**: To test approval workflows and department-wide visibility.
2. **Database Verification**: Use `pgAdmin 4` or `dotnet ef` to verify that status transitions and claim assignments reflect correctly in the PostgreSQL tables.
