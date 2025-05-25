@echo off
echo Installing dependencies for WhatsApp AI Messenger...

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js is not installed! Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

:: Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo npm is not installed! Please install npm first.
    pause
    exit /b 1
)

:: Remove existing node_modules and package-lock.json if they exist
if exist node_modules (
    echo Removing existing node_modules...
    rmdir /s /q node_modules
)

if exist package-lock.json (
    echo Removing existing package-lock.json...
    del /f /q package-lock.json
)

:: Install dependencies
echo Installing dependencies...
call npm install

:: Check if installation was successful
if %errorlevel% equ 0 (
    echo.
    echo Dependencies installed successfully!
    echo.
    echo To start the application, run: npm start
) else (
    echo.
    echo There was an error installing dependencies.
    echo Please check the error messages above.
)

echo Building the application...
call npm run build

echo Creating desktop application...
call npm run electron-pack

echo Setup completed!
echo The installer can be found in the dist folder.
pause 