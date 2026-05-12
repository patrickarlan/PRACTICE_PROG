#  Morning Developer setup script

$isDeveloper = $true
$projectName = "HRIS"
$backendPort = 5107

if ($isDeveloper) {
    Write-Host "Good morning, developer!" -ForegroundColor Cyan
    Write-Host "Setting up $projectName on port $backendPort" -ForegroundColor Yellow
}
else {
    Write-Host "This Script is for developers only." - ForegroundColor Red
}
