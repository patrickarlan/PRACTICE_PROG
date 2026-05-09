# 🖥️ Frontend Automation Utility (`setup-frontend.ps1`)

The `setup-frontend.ps1` script is a **Frontend Execution Utility** designed to streamline the preparation and launch of the React 19 application. It ensures that the development environment is consistent, dependencies are fully mapped, and the UI is presentation-ready.

---

## 🚀 How to Run
To bypass execution policy restrictions, open your terminal at the **Project Root directory**:
`PS C:\Users\HP\source\repos\mrccdrc27\HRIS>`

Run this command:
```powershell
powershell -ExecutionPolicy Bypass -File .\setup-frontend.ps1
```

---

## 🏗️ 3-Phase Automation Workflow

### **Phase 1: Environment Validation**
> **Goal**: Confirm core development runtime.
- **Node.js Check**: Verifies that **Node.js** is installed and accessible.
- **Version Awareness**: Ensures the system is compatible with modern ESM (EcmaScript Modules) requirements used by Vite.

### **Phase 2: Dependency Mapping & Installation**
> **Goal**: Synchronize the UI library ecosystem.
- **Directory Verification**: Confirms the integrity of the `/hris` source folder.
- **NPM Restoration**: Executes `npm install` to download and map all critical libraries:
  - **React 19 & Vite**: The core UI runtime.
  - **React Admin v5**: The data orchestration engine.
  - **Shadcn UI & Tailwind**: The custom design system.
- **Self-Healing**: Automatically detects if `node_modules` is missing or corrupt and performs a clean restoration.

### **Phase 3: Standardized Server Execution**
> **Goal**: Initialize the web portal with zero-config.
- **Vite Initialization**: Launches the development server on **Port 5173**.
- **Interactive Startup**: Prompts the user to start the server immediately, ensuring the transition from setup to demonstration is seamless.

---

## 💡 Key Technical Benefits
- **Zero-Manual-Config**: Eliminates the need to manually navigate folders or run repeated CLI commands.
- **Architectural Consistency**: Ensures that every developer is using the exact same library versions, preventing design regressions in the custom Shadcn UI layout.
- **Rapid Handoff**: Allows a senior developer to set up the entire HRIS frontend in less than 60 seconds.
