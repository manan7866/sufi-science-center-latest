@echo off
echo ========================================
echo Creating Sufi Science Center Database
echo ========================================
echo.

set PGPASSWORD=abmanan321

echo Step 1: Testing PostgreSQL connection...
"C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -d postgres -c "SELECT version();"
if %errorlevel% neq 0 (
    echo ERROR: Cannot connect to PostgreSQL!
    pause
    exit /b 1
)
echo.

echo Step 2: Creating user 'ssc_owner' (if not exists)...
"C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -d postgres -c "DO $$ BEGIN IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'ssc_owner') THEN CREATE ROLE ssc_owner WITH LOGIN PASSWORD 'fayazkhanpls321' CREATEDB; END IF; END $$;"
echo.

echo Step 3: Creating database 'sufisciencecenter_db' (if not exists)...
"C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -d postgres -c "SELECT 'CREATE DATABASE sufisciencecenter_db OWNER ssc_owner' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'sufisciencecenter_db')\gexec"
echo.

echo Step 4: Granting privileges...
"C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -d postgres -c "GRANT ALL PRIVILEGES ON DATABASE sufisciencecenter_db TO ssc_owner;"
echo.

echo Step 5: Testing connection with ssc_owner...
"C:\Program Files\PostgreSQL\17\bin\psql.exe" -U ssc_owner -d sufisciencecenter_db -c "SELECT current_database(), current_user;"
echo.

echo ========================================
echo Database setup complete!
echo ========================================
echo.
echo Database: sufisciencecenter_db
echo User: ssc_owner
echo Password: fayazkhanpls321
echo.
pause
