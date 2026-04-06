/*
  # Refine Origin Era Nomenclature & Transmission Scope

  ## 1. Problem Statement
    - Current "Prophetic Era" label is chronologically accurate but conceptually incomplete
    - Ali ibn Abi Talib (d. 661) represents direct transmission, not secondary companionship
    - Institutional positioning requires explicit acknowledgment of transmission lineage
    - Era must reflect spiritual transmission, not just historical chronology

  ## 2. Solution: "Origin & Prophetic Transmission"
    - Rename "Prophetic Era" → "Origin & Prophetic Transmission"
    - Extend timeframe: 570-661 (Prophet's birth → Ali's martyrdom)
    - Move Ali ibn Abi Talib to this foundational era
    - Maintains academic tone while clarifying transmission architecture

  ## 3. Rationale
    - Ali represents direct transmission (barakah, spiritual knowledge)
    - Multiple Sufi chains (silsila) trace through Ali
    - This is not devotional categorization but structural accuracy
    - Distinguishes origin-transmission from later companionship development

  ## 4. Changes Applied
    - Update historical_periods: name, slug, timeframe
    - Reassign Ali ibn Abi Talib to Origin & Prophetic Transmission
    - Preserve other companions in "Companions & Early Ascetics" (632-750)
*/

-- Update the Prophetic Era to Origin & Prophetic Transmission
UPDATE historical_periods
SET 
  name = 'Origin & Prophetic Transmission',
  slug = 'origin-prophetic-transmission',
  start_year = 570,
  end_year = 661,
  description = 'The foundational period encompassing the Prophet Muhammad''s life and the direct transmission of spiritual knowledge through immediate inheritors of Prophetic wisdom, particularly those through whom major Sufi chains trace their lineage.'
WHERE slug = 'prophetic-era';

-- Move Ali ibn Abi Talib to Origin & Prophetic Transmission era
UPDATE saints
SET historical_period_id = (
  SELECT id FROM historical_periods WHERE slug = 'origin-prophetic-transmission'
)
WHERE name = 'Ali ibn Abi Talib'
  AND deleted_at IS NULL;
