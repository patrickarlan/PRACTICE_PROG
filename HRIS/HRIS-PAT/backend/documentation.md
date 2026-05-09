# HRIS (Human Resource Information System) Backend Documentation

## Prerequisites
The following tools must be installed on your machine to run the backend:

1. **.NET 10 SDK**
   - [Download .NET 10](https://dotnet.microsoft.com/download)
   - Verify with: `dotnet --version`

2. **PostgreSQL**
   - [Download PostgreSQL](https://www.postgresql.org/download/)
   - Default Port: `5432`

3. **Entity Framework Core Tools**
   - Install globally via terminal:
     ```powershell
     dotnet tool install --global dotnet-ef
     ```
   - Update if already installed:
     ```powershell
     dotnet tool update --global dotnet-ef
     ```

## Local Configuration

### 1. Environment Variables (`.env`)
Create a `.env` file in the `backend/` directory with the following content:

```env
DB_CONNECTION_STRING="Host=localhost;Port=5432;Database=hris_dev;Username=postgres;Password=YOUR_PASSWORD"
JWT_SECRET="YOUR_LONG_RANDOM_SECRET_KEY_AT_LEAST_32_CHARS"
JWT_ISSUER="http://localhost:5107"
JWT_AUDIENCE="http://localhost:3000"
ENABLE_SWAGGER=true
SUPERADMIN_EMAIL="admin@hris.local"
SUPERADMIN_PASSWORD="SuperAdmin@123"
```

### 2. Database Setup
Once PostgreSQL is running and your `.env` is configured, apply the migrations:

```powershell
cd backend
dotnet ef database update
```

## Running the Backend

### Development Mode (with Hot Reload)
```powershell
cd backend
dotnet watch run
```

### Regular Run
```powershell
cd backend
dotnet run
```

## API Access
- **Swagger UI:** [http://localhost:5107/swagger](http://localhost:5107/swagger) (When `ENABLE_SWAGGER=true`)
  - *Note: We use Microsoft's built-in OpenAPI schema generation in .NET 10 instead of Swashbuckle to avoid dependency conflicts.*
- **Health Check:** [http://localhost:5107/health](http://localhost:5107/health)

## Accomplishment Report Updates
The AR feature now supports full status tracking and draft saving.

- Added `Status` to `backend/Models/AccomplishmentReport.cs`, with default value `"Pending"`.
- Added `Status` to `backend/DTOs/AccomplishmentReportCreateDto.cs` so the frontend can send both `Draft` and `Pending` states.
- Updated `backend/Controllers/AccomplishmentReportsController.cs` to map `dto.Status` into new reports and preserve draft state.
- Created a review-aware `Review Status` badge in the frontend list views, with consistent pill sizing for all statuses.
- Renamed `Reviewing Status` to `Review Status` in AR list filters and columns.
- Normalized the UI so short labels like `Pending` and `Draft` use the same badge width as longer labels like `Submitted`.

## Core Technologies
- **Framework:** .NET 10 (Minimal APIs & Controllers)
- **ORM:** Entity Framework Core
- **Database:** PostgreSQL
- **Auth:** ASP.NET Core Identity & JWT


## API Standards
All controllers should return data using the `ApiResponse<T>` wrapper:

- **Success:** `return Ok(ApiResponse<T>.SuccessResponse(data))`
- **Error:** The global middleware handles this automatically if you `throw new Exception("message")`.

## API Coding Standards

### 1. Standard API Response
Every endpoint must return the `ApiResponse<T>` wrapper. This ensures a consistent response shape for the frontend and easier error handling.

#### `ApiResponse<T>` shape

```json
{
   "success": true | false,
   "message": "Optional human-readable message",
   "data": <T>
}
```

Example (C#):

```csharp
return Ok(ApiResponse<IEnumerable<EmployeeDto>>.SuccessResponse(employees, "Fetched employees"));
```

- For operations without return data (Update/Delete), use a dummy object `new { }` to avoid nullability issues:
```csharp
return Ok(ApiResponse<object>.SuccessResponse(new { }, "Action successful"));
```

### 2. Service Pattern
Controllers should delegate business logic to services (e.g., `IEmployeeService`, `IAccomplishmentReportService`). The project now follows a pattern where controllers are thin HTTP adapters and services contain business logic.

Key points:

- Implement `IEmployeeService` in `backend/Services/EmployeeService.cs` and inject the interface into controllers such as `EmployeesController`.
- Service methods typically return UI-friendly DTOs or projections (the current `EmployeeService` returns flattened objects suitable for react-admin).
- Example `IEmployeeService` surface:
   - `Task<IEnumerable<object>> GetAllEmployeesAsync(string currentUserId)`
   - `Task<object?> GetEmployeeByIdAsync(string id)`
   - `Task<bool> CreateEmployeeAsync(ApplicationUser user, string password)`

### 3. RBAC (Role-Based Data Scoping)
RBAC is enforced in the service layer (not the controller). 

Current behavior in `EmployeeService`:
- `SuperAdmin` — sees all employees
- Non-SuperAdmin (e.g., `Manager`) — sees only employees in the same `Department` as the requesting user

Current behavior in `AccomplishmentReportService` (Phase 4):
- `SuperAdmin` — sees all reports from all departments and employees.
- `Manager` or `Admin` — sees reports strictly from employees matching their `Department`.
- `Viewer` (an employee with `Permission: Viewer`) — sees other employees' reports in the same department.
- `Approver` (an employee with `Permission: Approver`) — can approve/reject pending accomplishment reports.
- `Standard Employee` — sees only reports that they authored (`UserId == currentUserId`).
Only Managers/Admins/Approvers can Approve/Reject reports. Standard Users cannot modify reports once they've been Approved or Rejected.

This approach centralizes access rules and makes controllers simpler to test.

### 4. Frontend Integration (Phase 4 Completed)
The frontend `react-admin` system communicates with the API via a centralized Data Provider mapping.

- **Data Provider Mapping:** `hris/src/dataProvider.ts` unwraps the backend `ApiResponse<T>` payload automatically so UI components receive the `data` array perfectly matching the UI components. It also transforms property mappings like ID mappings (`reportId` -> `id`).
- **Resource Routing:** Set up via `Admin` components under `hris/src/App.tsx`.
- **UI Architecture:** We heavily use Shadcn UI & Tailwind integrated directly with components built entirely in `/components/ui`. No direct Material UI wrappers (from `react-admin`) are referenced across DataGrids to guarantee consistent theme compatibility and avoid `breakpoints of null` crashes caused by mixing Shadcn providers with MUI.
- **Pessimistic Mutations:** Use `mutationMode="pessimistic"` in standard React Admin buttons (`<DeleteButton>`, `<SaveButton>`) to ensure that frontend state only updates when backend operations definitively succeed. This avoids UX bugs where deleted items "bounce back" on failure.
- A new Team dashboard role editor now supports `Employee` and `EM: Viewer` values for non-admin users, while protecting `Admin`/`SuperAdmin` accounts from role changes.
- A new EM viewer dashboard is planned under the `Reports` sidebar section after `My Workspace` to surface other users' accomplishment reports for viewers.
- Ensure the frontend `VITE_API_URL` environment variable points at the backend base URL (e.g. `http://localhost:5107`).

### 5. Architectural Patterns

#### Soft Delete (Archive)
Entities that shouldn't be permanently destroyed (e.g. `AccomplishmentReport`) use a soft delete pattern instead of EF Core's default hard delete.
- Entities implement a boolean property (e.g. `IsArchived`).
- When a `DELETE` request arrives, the service layer marks it as archived instead of `_context.Remove(...)`.
- Top-level `GetAllAsync` and similar read queries explicitly filter out archived records (`.Where(x => !x.IsArchived)`).

### 6. Troubleshooting & Common Issues

- Binding errors (port in use):
   - `netstat -ano | findstr :5107` — find PID
   - `Stop-Process -Id <PID> -Force` — stop the process
- Locked PDB file (`backend.pdb`): usually caused by a running `backend.exe` or a stray `dotnet watch` process. Use the included `setup-backend.ps1` to attempt safe cleanup (it will try to stop `backend.exe` and `dotnet watch` instances). Manual commands:

```powershell
Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -and $_.CommandLine -match 'backend\\bin' } | Select-Object ProcessId,Name,CommandLine
Stop-Process -Id <PID> -Force
Remove-Item backend\obj\Debug\net10.0\backend.pdb -Force -ErrorAction SilentlyContinue
```

### 6. Automated Setup & Git Sync Workflows
There are helper scripts in the repository root intended to help you quickly start things up whenever there are new changes or if you are freshly cloning the repo:

#### Backend (`setup-backend.ps1`)
Runs through cleaning lingering lock files, checking the .NET SDK, updating global tools, restoring NuGets, optionally updating the local database with `dotnet ef database update` migrations (crucial whenever fetching new code), and optionally starting the backend.

```powershell
# From the repository root
.\setup-backend.ps1
```

#### Frontend (`setup-frontend.ps1`)
Checks if Node.js is installed, traverses into the `hris/` directory, installs NPM dependencies via `npm install`, and starts the Vite development server. Run this whenever merging changes that affect `package.json`.

```powershell
# From the repository root
.\setup-frontend.ps1
```

### 7. Known Issues & Identity Constraints

- **Blank Spaces in Usernames**: ASP.NET Core Identity naturally rejects usernames with spaces to prevent URL and system parsing issues for IDs. To fix this, our UI accepts full names (e.g. `Jane Doe`), maps the unspaced version to the required `UserName` (`JaneDoe`), and stores the actual readable name in the `FullName` database column we have migrated. If you interact heavily with identity, avoid manually inserting spaces into `UserName`—use `FullName` instead.