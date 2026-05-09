# HRIS Project Setup Guide

This document provides a streamlined guide to setting up the Human Resource Information System (HRIS) locally for development or presentation.

## Prerequisites
- **.NET 10 SDK**
- **Node.js (v18+)**
- **PostgreSQL** (Local instance recommended for high-performance presentation)

---

## ⚡ Quick Start (Automated)
The fastest way to get the system running is using the provided PowerShell scripts.

### 1. Backend Initialization
```powershell
.\backend\setup_backend\setup-backend.ps1
```
*This handles process cleanup, tool installation, database migration, and API startup on **Port 5107**.*

### 2. Frontend Initialization
```powershell
.\setup-frontend.ps1
```
*This handles npm installations and starts the Vite server on **Port 5173**.*

---

## 🛠️ Manual Setup

### 1. Backend (`/backend`)
1. **Environment**: Copy `.env.example` to `.env` and update `DB_CONNECTION_STRING`.
2. **Restore & Build**:
   ```bash
   dotnet restore
   ```
3. **Database**:
   ```bash
   dotnet ef database update
   ```
4. **Run**:
   ```bash
   dotnet run
   ```

### 2. Frontend (`/hris`)
1. **Install**:
   ```bash
   npm install
   ```
2. **Run**:
   ```bash
   npm run dev
   ```
   *The UI will be accessible at `http://localhost:5173`.*

---

## 🔍 Troubleshooting
- **Port Conflicts**: If Port 5107 or 5173 is locked, the automation scripts will attempt to free them automatically.
- **Database Connection**: Ensure PostgreSQL is running and your credentials in `backend/.env` are correct.
- **MUI Conflicts**: If you encounter UI crashes, ensure you are NOT importing from `@mui/material`. Use our custom wrappers in `@/components` instead.

## 📁 Key Directories
- **`/backend`**: ASP.NET Core 10 Web API Source.
- **`/hris`**: React 19 + Vite Frontend Source.
- **`/backend/setup_backend`**: Backend automation and SQL utilities.
