# Database Migration Commands

Run these commands one by one in your terminal to populate the database.

## Environment Setup

First, set the database password:

```cmd
set PGPASSWORD=fayazkhanpls321
```

---

## Migration Commands (Run in Order)

### 1. Core Schema & Tables
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260213235841_initial_schema.sql"
```

### 2. Support & Engagement Tables
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214000741_support_engagement_tables.sql"
```

### 3. Dialogue Engagement Formats
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214005054_dialogue_engagement_formats.sql"
```

### 4. Assessment Data
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214014111_seed_assessment_data.sql"
```

### 5. Media Architecture
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214010534_media_architecture.sql"
```

### 6. Dialogue Series & Episodes (Includes Beginner/Intermediate/Advanced Series)
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214022147_expand_dialogue_series_with_episodes_and_recommendations.sql"
```

### 7. Transcript Content to Episodes
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214023216_add_transcript_content_to_episodes.sql"
```

### 8. Taxonomic Architecture
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214030108_create_taxonomic_architecture_v2.sql"
```

### 9. Theme Taxonomy
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214050146_expand_theme_taxonomy_and_add_display_order.sql"
```

### 10. Inner Development Architecture
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214055317_inner_development_architecture.sql"
```

### 11. Seed Inner Development Content (Study Circles + Mentorship)
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214055549_seed_inner_development_content.sql"
```

### 12. Stations Developmental Architecture
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214064839_create_stations_developmental_architecture.sql"
```

### 13. Seed Stations Framework
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214065108_seed_stations_developmental_framework.sql"
```

### 14. Application System
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214071234_create_application_system.sql"
```

### 15. Submission Portal System
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214024631_create_submission_portal_system.sql"
```

### 16. Portal Engagement Tables
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260218070315_create_portal_engagement_tables.sql"
```

### 17. Portal Full Functionality v3
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260327232043_portal_full_functionality_v3.sql"
```

### 18. Quran Commentary Tables
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260218064612_create_quran_commentary_tables.sql"
```

### 19. Membership Applications
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260218094156_create_membership_applications.sql"
```

### 20. Conference Submission System
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260218100121_create_conference_submission_system.sql"
```

### 21. Donation Stripe Integration
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260218113822_add_donation_stripe_rls_and_update_function.sql"
```

### 22. Conference Events & User Roles
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260327234314_add_conference_events_and_user_roles.sql"
```

### 23. Comprehensive Saints Data
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260218224628_20260218_seed_comprehensive_saints_v3.sql"
```

### 24. Normalize Saint Metadata and Geography
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214021559_normalize_saint_metadata_and_geography.sql"
```

### 25. Fix Assessment User ID and Recommendations
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214020349_fix_assessment_user_id_and_recommendations.sql"
```

### 26. Enable Anonymous Assessment Submissions
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214020940_enable_anonymous_assessment_submissions.sql"
```

### 27. Migrate Saint Regions to Hierarchical
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214050213_migrate_saint_regions_to_hierarchical.sql"
```

### 28. Seed Foundational Saints and Lineages
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214051625_seed_foundational_saints_and_lineages.sql"
```

### 29. Seed Prophetic Arabia Saints
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214051659_seed_prophetic_arabia_saints.sql"
```

### 30. Seed Persia & Iran Saints
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214051730_seed_persia_iran_saints.sql"
```

### 31. Seed Central Asia & Anatolia Saints
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214051856_seed_central_asia_anatolia_saints_v2.sql"
```

### 32. Seed Al-Andalus & South Asia Saints
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214051952_seed_al_andalus_south_asia_saints.sql"
```

### 33. Associate Saints with Themes, Lineages, Roles
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214052053_associate_saints_themes_lineages_roles.sql"
```

### 34. Complete Lineage Hierarchy
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214052632_complete_lineage_hierarchy.sql"
```

### 35. Associate Lineages with Saints
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214052658_associate_lineages_with_saints.sql"
```

### 36. Normalize Arabian Peninsula Hierarchy
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214053510_normalize_arabian_peninsula_hierarchy.sql"
```

### 37. Refine Origin Era Nomenclature
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214054232_refine_origin_era_nomenclature.sql"
```

### 38. Add Teaching Assessment Schema
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214061954_add_teaching_assessment_schema.sql"
```

### 39. Seed Teaching Assessment Data
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214062019_seed_teaching_assessment_data.sql"
```

### 40. NextGen Professional Disciplines
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260218101320_create_nextgen_professional_disciplines.sql"
```

### 41. Add View Count Increment Functions
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260218105300_add_view_count_increment_functions.sql"
```

### 42. Add Stripe Fields to Donations
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260218112542_add_stripe_fields_to_donations.sql"
```

### 43. Seed Sacred Geometry Episodes and Practices
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260218074949_seed_sacred_geometry_episodes_and_practices_v2.sql"
```

### 44. Phase 1 RLS Hardening
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260218105049_phase1_rls_hardening.sql"
```

### 45. Fix Support Tickets RLS and Portal Donations
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260218124920_fix_support_tickets_rls_and_portal_donations.sql"
```

### 46. Preserve All Live User Data
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260327191715_20260327000000_preserve_all_live_user_data.sql"
```

### 47. Reset Admin Password
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260327223451_reset_admin_password.sql"
```

### 48. Fix Admin Password BCrypt Cost
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260327224938_fix_admin_password_bcrypt_cost.sql"
```

### 49. Finalize Lineage Structure
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260218222717_20260218140001_finalize_lineage_structure.sql"
```

### 50. Finalize Region Structure
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260218222754_20260218140002_finalize_region_structure.sql"
```

### 51. Finalize Era Structure
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260218222816_20260218140003_finalize_era_structure.sql"
```

### 52. Finalize Theme Taxonomy
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260218222848_20260218140004_finalize_theme_taxonomy.sql"
```

### 53. Seed Hard Inquiry Sessions
```cmd
psql -U postgres -d sufisciencecenter_db -f "data/migrations/20260214024152_seed_hard_inquiry_sessions.sql"
```

---

## Verify Data

After running all migrations, check the data:

```cmd
psql -U postgres -d sufisciencecenter_db -c "SELECT 'study_circles' as table_name, COUNT(*) FROM study_circles UNION ALL SELECT 'saints', COUNT(*) FROM saints_cms UNION ALL SELECT 'dialogues', COUNT(*) FROM dialogues_cms;"
```

