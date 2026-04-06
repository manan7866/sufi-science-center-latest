/*
  # Finalize Era (Historical Periods) Structure

  ## Summary
  Aligns historical_periods with the final academically structured era taxonomy:

  1. Prophetic & Foundational Transmission (570–661)
  2. Early Ascetic & Ethical Formation (632–800)
  3. Classical Theoretical Consolidation (800–1050)
  4. Institutional Tariqa Formation (1050–1300)
  5. Metaphysical & Philosophical Expansion (1200–1500)
  6. Imperial & Global Expansion (1450–1750)
  7. Reform, Renewal & Modern Rearticulation (1750–1950)

  ## Changes
  - Renames all existing eras to match final academic terminology
  - Adjusts year boundaries for scholarly accuracy
  - Soft-deletes "Contemporary" era (not in final spec)
*/

-- Era 1: Prophetic & Foundational Transmission
UPDATE historical_periods
SET name = 'Prophetic & Foundational Transmission',
    slug = 'prophetic-foundational-transmission',
    start_year = 570,
    end_year = 661,
    display_order = 1
WHERE slug = 'origin-prophetic-transmission' AND deleted_at IS NULL;

-- Era 2: Early Ascetic & Ethical Formation
UPDATE historical_periods
SET name = 'Early Ascetic & Ethical Formation',
    slug = 'early-ascetic-ethical-formation',
    start_year = 632,
    end_year = 850,
    display_order = 2
WHERE slug = 'companions-early-ascetics' AND deleted_at IS NULL;

-- Era 3: Classical Theoretical Consolidation
UPDATE historical_periods
SET name = 'Classical Theoretical Consolidation',
    slug = 'classical-theoretical-consolidation',
    start_year = 800,
    end_year = 1050,
    display_order = 3
WHERE slug = 'classical-formation' AND deleted_at IS NULL;

-- Era 4: Institutional Tariqa Formation
UPDATE historical_periods
SET name = 'Institutional Tariqa Formation',
    slug = 'institutional-tariqa-formation',
    start_year = 1050,
    end_year = 1300,
    display_order = 4
WHERE slug = 'institutional-orders' AND deleted_at IS NULL;

-- Era 5: Metaphysical & Philosophical Expansion
UPDATE historical_periods
SET name = 'Metaphysical & Philosophical Expansion',
    slug = 'metaphysical-philosophical-expansion',
    start_year = 1200,
    end_year = 1500,
    display_order = 5
WHERE slug = 'metaphysical-expansion' AND deleted_at IS NULL;

-- Era 6: Imperial & Global Expansion
UPDATE historical_periods
SET name = 'Imperial & Global Expansion',
    slug = 'imperial-global-expansion',
    start_year = 1450,
    end_year = 1750,
    display_order = 6
WHERE slug = 'global-spread' AND deleted_at IS NULL;

-- Era 7: Reform, Renewal & Modern Rearticulation
UPDATE historical_periods
SET name = 'Reform, Renewal & Modern Rearticulation',
    slug = 'reform-renewal-modern-rearticulation',
    start_year = 1750,
    end_year = 1950,
    display_order = 7
WHERE slug = 'reform-renewal' AND deleted_at IS NULL;

-- Soft-delete "Contemporary" era (not in final locked spec)
UPDATE historical_periods
SET deleted_at = now()
WHERE slug = 'contemporary' AND deleted_at IS NULL;
