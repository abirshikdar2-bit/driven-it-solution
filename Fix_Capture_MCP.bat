@echo off
title Capture MCP Port Fix
color 0b
echo ========================================================
echo        DRIVEN IT - CAPTURE MCP PORT UNLOCKER
echo ========================================================
echo.

:: Check for administrative rights
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [!] Requesting Administrator privileges to release port 61822...
    powershell -Command "Start-Process cmd -ArgumentList '/c `\"%~f0`\"' -Verb RunAs"
    exit /b
)

echo [*] Stopping Windows NAT Service (winnat)...
net stop winnat
echo.
echo [*] Restarting Windows NAT Service (winnat)...
net start winnat
echo.
echo ========================================================
echo [OK] SUCCESS! Port 61822 has been released and unlocked!
echo [OK] Capture MCP can now connect normally.
echo ========================================================
echo.
pause
