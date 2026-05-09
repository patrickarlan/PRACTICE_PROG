<#
setup-frontend.ps1 - HRIS Frontend Setup & Execution Utility (Phase 4 Ready)

This script prepares the frontend development environment by installing
all required dependencies (including mapped React Admin + Shadcn UI packages) 
and starting the local development server.

Usage: run from repository root in PowerShell
  .\setup-frontend.ps1
#>

Write-Host "--- HRIS Frontend Setup Utility ---" -ForegroundColor Cyan

# Ensure script runs relative to its location (repository root)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir

Write-Host "`n[1/3] Checking for Node.js..." -ForegroundColor Yellow
$nodePath = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodePath) {
    Write-Host "ERROR: Node.js is not installed. Please download and install it from https://nodejs.org/" -ForegroundColor Red
    exit 1
}
$nodeVersion = node -v
Write-Host "Found Node.js: $nodeVersion" -ForegroundColor Green

Write-Host "`n[2/3] Installing NPM Dependencies..." -ForegroundColor Yellow
$frontendDir = [System.IO.Path]::GetFullPath((Join-Path -Path $scriptDir -ChildPath '..\..\..\hris'))
if (-not (Test-Path $frontendDir)) {
    Write-Host "ERROR: Frontend directory 'hris' not found at $frontendDir" -ForegroundColor Red
    exit 1
}

Set-Location -Path $frontendDir

if (-Not (Test-Path "node_modules")) {
    Write-Host "Node modules missing. Running clean npm install..." -ForegroundColor Cyan
}
else {
    Write-Host "Node modules exist. Checking for updated packages..." -ForegroundColor Cyan
}

npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "FAILED: npm install encountered an error. Please check the logs above." -ForegroundColor Red
    exit 1
}

Write-Host "`nSUCCEEDED: Frontend dependencies fully installed." -ForegroundColor Green

Write-Host "`n[3/3] Start Local Server" -ForegroundColor Yellow
$startNow = Read-Host "Start frontend development server now with 'npm run dev'? (Y/n)"
if ($startNow -eq '' -or $startNow -match '^[Yy]') {
    Write-Host "Starting Vite server... (use Ctrl+C to stop)" -ForegroundColor Cyan
    npm run dev
}
else {
    Write-Host "`nSetup complete. Next steps:" -ForegroundColor Cyan
    Write-Host "  1. cd hris" -ForegroundColor Cyan
    Write-Host "  2. npm run dev" -ForegroundColor Cyan
}
