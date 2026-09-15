@echo off
chcp 65001 >nul
title SchatzerFilms Server
color 0A

echo.
echo   ============================================
echo     SCHATZERFILMS - FULLSTACK WEBSERVER
echo   ============================================
echo.

cd /d "%~dp0"

:: ── Check and install node_modules ──
if not exist "node_modules" (
    echo   [*] Installing Frontend packages...
    call npm install
    echo.
)

:: ── Firewall Rule for Port 5173 ──
set "RULE_NAME=SchatzerFilms Vite Dev Server"
netsh advfirewall firewall show rule name="%RULE_NAME%" >nul 2>&1
if errorlevel 1 (
    echo   [*] Creating firewall rule for port 5173...
    netsh advfirewall firewall add rule name="%RULE_NAME%" dir=in action=allow protocol=TCP localport=5173 >nul 2>&1
    if errorlevel 1 (
        echo   [!] WARNING: Could not create firewall rule.
        echo   [!] Please run this script as Administrator.
        echo.
    ) else (
        echo   [OK] Firewall rule created successfully.
        echo.
    )
) else (
    echo   [OK] Firewall rule already exists.
    echo.
)

set "LOCAL_IP=45.13.227.212"

echo.
echo   --------------------------------------------
echo     Server starting via Vite...
echo   --------------------------------------------
echo.
echo     Open in your browser:
echo     http://%LOCAL_IP%:5173
echo.
echo     Press CTRL+C to stop the server.
echo   --------------------------------------------
echo.

call npm run dev
pause
