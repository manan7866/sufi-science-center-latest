@echo off
set PGPASSWORD=fayazkhanpls321

echo ========================================
echo Dumping ONLY data from PostgreSQL database
echo ========================================
echo.
echo Database: sufisciencecenter_db
echo Output: dump.sql (data only, no schema)
echo.

"C:\Program Files\PostgreSQL\17\bin\pg_dump.exe" -U postgres -d sufisciencecenter_db --data-only --inserts --no-owner --no-privileges --disable-triggers -f dump.sql

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo Data dump completed successfully!
    echo ========================================
    echo.
    echo Output file: dump.sql
) else (
    echo.
    echo ERROR: Data dump failed!
)

echo.
pause
