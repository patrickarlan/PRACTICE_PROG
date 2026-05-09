# ⚙️ Backend Automation Utility (`setup-backend.ps1`)

The `setup-backend.ps1` script is a **Deployment and Maintenance Utility** designed to automate the entire backend lifecycle. It serves as a "One-Click" solution to ensure the server is configured, synchronized, and ready for production or demonstration.

---

## 🚀 How to Run
To bypass execution policy restrictions, open your terminal at the **Backend Setup directory**:
`PS C:\Users\HP\Documents\PRACTICE_PROG\HRIS\HRIS-PAT\DOCU\setup\setup-backend> .\setup-backend.ps1`

Run this command:
```powershell
powershell -ExecutionPolicy Bypass -File .\setup-backend.ps1
```

---

## 🏗️ 5-Phase Automation Workflow

### **Phase 0: Environment Sanitization**
> **Goal**: Prevent "Port in use" or "File locked" errors.
- Forcefully terminates any lingering `backend.exe` or `dotnet watch` processes.
- **Port Management**: Specifically targets and frees **Port 5107** to ensure a clean launch.

### **Phase 1 & 2: Tool & SDK Validation**
> **Goal**: Verify core development requirements.
- **.NET Check**: Confirms the presence of the **.NET 10 SDK**.
- **EF Core Tools**: Automatically installs or updates the `dotnet-ef` global tools required for database communication.

### **Phase 3: Dependency Restoration**
> **Goal**: Sync all library versions.
- Executes `dotnet restore` to download and map all NuGet packages (PostgreSQL drivers, SignalR, Identity Security, etc.).

### **Phase 4: Database Synchronization**
> **Goal**: Ensure the data schema matches the code.
- Runs `dotnet ef database update` to build the full PostgreSQL schema.
- **Identity Seeding**: Automatically populates the system with master roles (`SuperAdmin`), `ApprovalTeams`, and default test accounts.

### **Phase 5: Standardized Launch**
> **Goal**: Start the server with optimal settings.
- Initializes the backend API on **Port 5107**, providing a consistent entry point for the frontend application.