
<#
Setup-Backend.ps1 - HRIS Environment Setup & Cleanup Utility

This script prepares the backend environment for Accomplishment Report RBAC interactions,
real-time SignalR notifications, allocates .NET 10 requirements, applies all database migrations,
and starts the local API.

Usage: run from the backend/setup_backend folder in PowerShell (Administrator recommended for stopping processes)
  .\setup-backend.ps1
#>

Write-Host "--- HRIS Backend Setup Utility ---" -ForegroundColor Cyan

# Ensure script runs relative to its location (repository root)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir

function Stop-IfRunningByName([string]$name) {
    $procs = Get-Process -Name $name -ErrorAction SilentlyContinue
    if ($procs) {
        foreach ($p in $procs) {
            try { Stop-Process -Id $p.Id -Force -ErrorAction Stop; Write-Host "Stopped $name PID $($p.Id)" -ForegroundColor Green } catch { Write-Host "Failed to stop $name PID $($p.Id): $_" -ForegroundColor Yellow }
        }
    }
}

function Stop-DotnetWatchProcesses() {
    $watchers = Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -and $_.CommandLine -match 'dotnet' -and $_.CommandLine -match 'watch' }
    if ($watchers) {
        foreach ($w in $watchers) {
            try { Stop-Process -Id $w.ProcessId -Force -ErrorAction Stop; Write-Host "Stopped dotnet watch PID $($w.ProcessId)" -ForegroundColor Green } catch { Write-Host "Failed to stop PID $($w.ProcessId): $_" -ForegroundColor Yellow }
        }
    }
}

function Stop-PortListener([int]$port) {
    # Use ${port} to delimit variable in the string to avoid parser/linter confusion
    $lines = netstat -ano | Select-String ":${port}"
    if ($lines) {
        foreach ($line in $lines) {
            $parts = ($line -split '\s+') | Where-Object { $_ -ne '' }
            # avoid assigning to automatic variable $pid; use a local name instead
            $listenerId = $parts[-1]
            if ($listenerId -and ($listenerId -as [int])) {
                try {
                    Stop-Process -Id $listenerId -Force -ErrorAction Stop
                    Write-Host "Stopped process $listenerId that was listening on port $port" -ForegroundColor Green
                }
                catch {
                    Write-Host "Could not stop PID ${listenerId}: $_" -ForegroundColor Yellow
                }
            }
        }
    }
}

Write-Host "`n[0/5] Attempting to stop lingering processes (backend.exe, dotnet watch) and free port 5107..." -ForegroundColor Yellow
Stop-IfRunningByName -name 'backend'
Stop-DotnetWatchProcesses
Stop-PortListener -port 5107

# Try removing stale PDB if present (may fail if still locked)
$pdbPath = Join-Path -Path $scriptDir -ChildPath '..\obj\Debug\net10.0\backend.pdb'
if (Test-Path $pdbPath) {
    try { Remove-Item $pdbPath -Force -ErrorAction Stop; Write-Host "Removed stale pdb: $pdbPath" -ForegroundColor Green } catch { Write-Host "Could not remove $pdbPath (might still be locked): $_" -ForegroundColor Yellow }
}

Write-Host "`n[1/5] Checking for .NET 10 SDK..." -ForegroundColor Yellow
$dotnetVersion = dotnet --version 2>$null
if ($null -eq $dotnetVersion) {
    Write-Host "ERROR: .NET 10 SDK not found. Please download it from: https://dotnet.microsoft.com/download" -ForegroundColor Red
    exit 1
}
else {
    Write-Host "Found .NET: $dotnetVersion" -ForegroundColor Green
}

Write-Host "`n[2/5] Installing/Updating Entity Framework Core Global Tools..." -ForegroundColor Yellow
$efList = dotnet tool list -g | Select-String "dotnet-ef"
if ($efList) {
    Write-Host "Updating dotnet-ef..." -ForegroundColor Magenta
    dotnet tool update --global dotnet-ef
}
else {
    Write-Host "Installing dotnet-ef..." -ForegroundColor Magenta
    dotnet tool install --global dotnet-ef
}

Write-Host "`n[3/5] Restoring NuGet Packages..." -ForegroundColor Yellow
$backendRoot = [System.IO.Path]::GetFullPath((Join-Path -Path $scriptDir -ChildPath "..\..\..\backend"))
if (Test-Path $backendRoot) {
    Set-Location -Path $backendRoot
} else {
    Write-Host "ERROR: Backend directory not found at $backendRoot" -ForegroundColor Red
    exit 1
}
dotnet restore
if ($LASTEXITCODE -ne 0) {
    Write-Host "FAILED: Dependencies could not be restored. Check your internet connection or NuGet sources." -ForegroundColor Red
    exit 1
}

Write-Host "`nSUCCEEDED: Backend dependencies restored." -ForegroundColor Green

Write-Host "`n[4/5] Applying Database Migrations (If Needed)..." -ForegroundColor Yellow
$runMigrations = Read-Host "Run EF migrations now to apply any new database schema changes? (Y/n)"
if ($runMigrations -eq '' -or $runMigrations -match '^[Yy]') {
    Write-Host "Running 'dotnet ef database update'..." -ForegroundColor Cyan
    dotnet ef database update
    if ($LASTEXITCODE -ne 0) { 
        Write-Host "Migrations failed or returned non-zero exit code. Please check the backend errors." -ForegroundColor Yellow 
    }
    else {
        Write-Host "Database is up to date." -ForegroundColor Green
    }
}

Write-Host "`n[5/5] Starting Backend Server..." -ForegroundColor Yellow
$startNow = Read-Host "Start backend now with 'dotnet run' (recommended) or 'dotnet watch run'? (Y/n)"
if ($startNow -eq '' -or $startNow -match '^[Yy]') {
    Write-Host "Starting backend... (use Ctrl+C to stop)" -ForegroundColor Cyan
    dotnet run
}
else {
    Write-Host "`nSetup complete. Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Configure backend/.env (see README.md)" -ForegroundColor Cyan
    Write-Host "  2. Run 'dotnet ef database update' if you skipped migrations" -ForegroundColor Cyan
    Write-Host "  3. Start backend: cd ..; dotnet run" -ForegroundColor Cyan
}
