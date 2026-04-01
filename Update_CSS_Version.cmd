@echo off
setlocal

set "ROOT=%~dp0"
set "SCRIPT=%ROOT%scripts\bump_secondary_css_version.ps1"

if not exist "%SCRIPT%" (
  echo ERROR: Script not found:
  echo %SCRIPT%
  echo.
  pause
  exit /b 1
)

echo --------------------------------------------
echo Bumping shared CSS cache version
echo --------------------------------------------
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT%"
set "CODE=%ERRORLEVEL%"

echo.
if "%CODE%"=="0" (
  echo Done. HTML files now point to the latest secondary.css version.
) else (
  echo Failed with exit code %CODE%.
)
echo.
pause
exit /b %CODE%
