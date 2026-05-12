# REFER TO THE PRACTICE/LESSONS/Sandbox
# LESSON 1.5 ACTIVITIES

# [x] ACTIVITY 1


# My First Powershell Script
Write-Host "Hello, Patrick! Ready to code?" -ForegroundColor Green

<# OUTPUT:
PS C:\Users\HP\Documents\PRACTICE_PROG\HRIS\HRIS-PAT\PRACTICE> .\hello.ps1
Hello, Patrick! Ready to code?
#>

# [x] ACTIVITY 2
Get-ExecutionPolicy
OUTPUT: Bypass
** This gets the current execution policies for the current session. ** 

# [x] ACTIVITY 3
PS C:\Users\HP\Documents\PRACTICE_PROG\HRIS\HRIS-PAT\PRACTICE\LESSONS\Sandbox> .\morning-setup.ps1
Good morning, developer!
Setting up HRIS on port 5107

** The script is a basic variable and condition script that allows the system to interact with the user using strings and its set variable. This introduce a basic script writing using Powershell and cmdlet commands. ** 

# [x] ACTIVITY 4
setup-backend.ps1:
```
function Stop-IfRunningByName([string]$name) {
    $procs = Get-Process -Name $name -ErrorAction SilentlyContinue
    if ($procs) {
        foreach ($p in $procs) {
            try { Stop-Process -Id $p.Id -Force -ErrorAction Stop; Write-Host "Stopped $name PID $($p.Id)" -ForegroundColor Green } catch { Write-Host "Failed to stop $name PID $($p.Id): $_" -ForegroundColor Yellow }
        }
    }
}
....
Stop-IfRunningByName -name 'backend'

```
# EXPLANATION: This function's summary is a process killer that kills 'backend' running process. the function will be declared then it will be executed after being given the definitions
# THIS FUNCTION EXISTS TO ENSURE THAT THE TERMINAL IS NOT RUNNING ANY BACKEND PROCESSES
# IF REMOVED: the project might not run if running backend is not killed when setting the .ps1

setup-frontend.ps1:
```
Write-Host "`n[1/3] Checking for Node.js..." -ForegroundColor Yellow
$nodePath = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodePath) {
    Write-Host "ERROR: Node.js is not installed. Please download and install it from https://nodejs.org/" -ForegroundColor Red
    exit 1
}
```
# EXPLANATION: This command search the project if Node.JS is installed. Conditions are "if its not installed, then print the error string. else it will continue to the other commands
# THIS COMMANDS EXISTS TO ENSURE THAT THE USER HAVE A NODE.JS INSTALLED TO FULLY RUN THE FRONTEND
# IF REMOVED: It will not affect the current project but it will cause error if node.js is not installed.

# [x] ACTIVITY 5
IN TEST folder under PRACTICE/TEST/start-hris.ps1