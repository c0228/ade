@echo off
REM Set centralized pycache folder
REM ===== Add project root to Python path =====
set PYTHONPATH=%~dp0
set PYCACHE_DIR=%PYTHONPATH%__pycache__
if not exist "%PYCACHE_DIR%" mkdir "%PYCACHE_DIR%"

REM Set environment variable for Python compiled files
set PYTHONPYCACHEPREFIX=%PYCACHE_DIR%

echo Using PROJECT_ROOT: %PYTHONPATH%
python -m main %*