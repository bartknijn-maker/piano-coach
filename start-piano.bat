@echo off
REM Piano Coach - lokale start
REM Zet een kleine webserver aan in deze map en opent de app als los venster.
REM Waarom niet dubbelklikken op index.html: vanaf file:// werkt fetch() niet,
REM waardoor 35 van de 38 stukken alleen via de bestandskiezer te laden zijn.

cd /d "%~dp0"
set PORT=3457
set URL=http://localhost:%PORT%/

REM Draait de server al? Dan niet nog een keer starten.
netstat -ano | findstr /r /c:":%PORT% .*LISTENING" >nul 2>&1
if errorlevel 1 (
  start "Piano Coach server" /min cmd /c "python -m http.server %PORT%"
  REM even wachten tot de poort luistert
  timeout /t 2 /nobreak >nul
)

REM Chrome in app-modus geeft een schoon venster zonder adresbalk.
set CHROME="C:\Program Files\Google\Chrome\Application\chrome.exe"
if exist %CHROME% (
  start "" %CHROME% --app=%URL%
) else (
  start "" "%URL%"
)

exit
