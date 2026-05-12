<# ACTIVITY #5: WRITING start-hris.ps1
THIS STARTS THE WHOLE PROJECT, INCLUDING THE FRONTEND AND BACKEND. IT IS NOT MEANT TO BE USED IN PRODUCTION, BUT RATHER FOR TESTING PURPOSES ONLY.
#>

# WELCOME MESSAGE

Write-Host "--- HRIS Full Stack Startup Utility ---" -ForegroundColor Cyan
# Start the backend in a new PowerShell window
function backendStart {
    $procs = Get-Process -Name 'dotnet' -ErrorAction SilentlyContinue
    if (!($procs)) {
        Write-Host "No existing backend processes found. Starting a new one..." -ForegroundColor Green
    }
    else {
        foreach ($p in $procs) {
            try {
                Stop-Process -Id $p.Id -Force -ErrorAction Stop
                Write-Host "Stopped backend PID $($p.Id)" -ForegroundColor Green
            }
            catch {
                Write-Host "Failed to stop backend PID $($p.Id): $_" -ForegroundColor Yellow
            }
        }
    }
    
    #user condition (Y/N) to ask if they want to start the backend
    $userInput = Read-Host "Do you want to start the backend? (Y/N)"
    if ($userInput -eq "Y") {
        Start-Process powershell -WorkingDirectory (Join-Path $PSScriptRoot "..\..\backend") -ArgumentList "-NoExit", "-Command", "dotnet watch run"
        Write-Host "BACKEND STARTED IN NEW WINDOW" -ForegroundColor Green
    }
    elseif ($userInput -eq "N") {
        Write-Host "Skipping backend startup." -ForegroundColor Yellow
    }
    else {
        Write-Host "Invalid input. Please enter Y or N." -ForegroundColor Red
    }
}

# Start the frontend in a new PowerShell window
function frontendStart { 
    $procs = Get-CimInstance Win32_Process | Where-Object {
        $_.Name -match 'node' -and $_.CommandLine -match 'npm run dev'
    }
    if (!($procs)) {
        Write-Host "No existing frontend processes found. Starting a new one..." -ForegroundColor Green
    }
    else {
        foreach ($p in $procs) {
            try {
                Stop-Process -Id $p.Id -Force -ErrorAction Stop
                Write-Host "Stopped frontend PID $($p.Id)" -ForegroundColor Green
            }
            catch {
                Write-Host "Failed to stop frontend PID $($p.Id): $_" -ForegroundColor Yellow
            }
        }
    }
    #user condition (Y/N) to ask if they want to start the frontend
    $userInput = Read-Host "Do you want to start the frontend? (Y/N)"
    if ($userInput -eq "Y") {
        Start-Process powershell -WorkingDirectory (Join-Path $PSScriptRoot "..\..\hris") -ArgumentList "-NoExit", "-Command", "npm run dev"
        Write-Host "FRONTEND STARTED IN NEW WINDOW" -ForegroundColor Green
    }
    elseif ($userInput -eq "N") {
        Write-Host "Skipping frontend startup." -ForegroundColor Yellow
    }
    else {
        Write-Host "Invalid input. Please enter Y or N." -ForegroundColor Red
    }
}

Write-Host " Starting the HRIS backend.." -ForegroundColor Yellow
backendStart
Start-Sleep -Seconds 5
Write-Host " Starting the HRIS frontend.." -ForegroundColor Yellow
frontendStart