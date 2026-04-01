@echo off
setlocal

set "ROOT=%~dp0"
set "SCRIPT=%ROOT%scripts\sync_ncbi_bibliography.ps1"
set "URL=https://www.ncbi.nlm.nih.gov/myncbi/runwen.yao.1/bibliography/public/"

if not exist "%SCRIPT%" (
  echo ERROR: Script not found:
  echo %SCRIPT%
  echo.
  pause
  exit /b 1
)

echo --------------------------------------------
echo Updating publications from NCBI bibliography
echo --------------------------------------------
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT%" -BibliographyUrl "%URL%"
set "CODE=%ERRORLEVEL%"

echo.
if "%CODE%"=="0" (
  echo Done. publications-data.js has been updated.
) else (
  echo Failed with exit code %CODE%.
)
echo.
pause
exit /b %CODE%

