@echo off
echo ========================================
echo Pushing Foundations Data to Database
echo ========================================
echo.

set PGPASSWORD=fayazkhanpls321

echo [1/8] Seeding Foundational Saints and Lineages...
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214051625_seed_foundational_saints_and_lineages.sql"
echo.

echo [2/8] Seeding Prophetic Arabia Saints...
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214051659_seed_prophetic_arabia_saints.sql"
echo.

echo [3/8] Seeding Persia Iran Saints...
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214051730_seed_persia_iran_saints.sql"
echo.

echo [4/8] Seeding Central Asia Anatolia Saints...
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214051856_seed_central_asia_anatolia_saints_v2.sql"
echo.

echo [5/8] Seeding Al-Andalus South Asia Saints...
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214051952_seed_al_andalus_south_asia_saints.sql"
echo.

echo [6/8] Finalizing Lineage Structure...
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260218222717_20260218140001_finalize_lineage_structure.sql"
echo.

echo [7/8] Finalizing Region Structure...
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260218222754_20260218140002_finalize_region_structure.sql"
echo.

echo [8/8] Finalizing Theme Taxonomy...
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260218222848_20260218140004_finalize_theme_taxonomy.sql"
echo.

echo ========================================
echo Foundations Data Push Complete!
echo ========================================
echo.
echo Verifying data...
psql -U postgres -d sufisciencecenter_db -c "SELECT 'lineages' as table_name, COUNT(*) FROM lineages WHERE deleted_at IS NULL UNION ALL SELECT 'regions', COUNT(*) FROM regions WHERE deleted_at IS NULL UNION ALL SELECT 'themes', COUNT(*) FROM themes WHERE deleted_at IS NULL UNION ALL SELECT 'historical_periods', COUNT(*) FROM historical_periods WHERE deleted_at IS NULL UNION ALL SELECT 'saints', COUNT(*) FROM saints_cms WHERE deleted_at IS NULL;"
echo.
pause
