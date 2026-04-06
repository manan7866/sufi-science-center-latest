/*
  # Seed Assessment Data

  1. Creates Main Assessment
    - Multi-Dimensional Development Assessment
  
  2. Seeds Assessment Questions
    - 12 questions across 4 dimensions
    - cognitive_patterns (3 questions)
    - emotional_intelligence (3 questions)
    - contemplative_capacity (3 questions)
    - transformative_readiness (3 questions)
  
  3. No RLS changes - already configured
*/

-- Delete existing assessment if present (for re-runnability)
DELETE FROM assessment_questions WHERE assessment_id IN (SELECT id FROM assessments WHERE slug = 'multi-dimensional-development');
DELETE FROM assessments WHERE slug = 'multi-dimensional-development';

INSERT INTO assessments (id, slug, title, description, version, is_active, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'multi-dimensional-development',
  'Multi-Dimensional Development Assessment',
  'A comprehensive evaluation covering cognitive patterns, emotional intelligence, contemplative capacity, and transformative readiness.',
  1,
  true,
  now(),
  now()
);

INSERT INTO assessment_questions (id, assessment_id, dimension, question_text, weight, order_index, created_at, updated_at)
SELECT
  gen_random_uuid(),
  id,
  'cognitive_patterns',
  'How would you describe your primary approach to understanding reality? Rate your alignment with contemplative and intuitive methods of knowing.',
  1.0,
  1,
  now(),
  now()
FROM assessments WHERE slug = 'multi-dimensional-development';

INSERT INTO assessment_questions (id, assessment_id, dimension, question_text, weight, order_index, created_at, updated_at)
SELECT
  gen_random_uuid(),
  id,
  'cognitive_patterns',
  'Rate your comfort level with exploring ideas that fundamentally challenge your core beliefs and worldview.',
  1.0,
  2,
  now(),
  now()
FROM assessments WHERE slug = 'multi-dimensional-development';

INSERT INTO assessment_questions (id, assessment_id, dimension, question_text, weight, order_index, created_at, updated_at)
SELECT
  gen_random_uuid(),
  id,
  'cognitive_patterns',
  'How frequently do you engage in deep self-reflection and examination of your thought patterns and assumptions?',
  1.0,
  3,
  now(),
  now()
FROM assessments WHERE slug = 'multi-dimensional-development';

INSERT INTO assessment_questions (id, assessment_id, dimension, question_text, weight, order_index, created_at, updated_at)
SELECT
  gen_random_uuid(),
  id,
  'emotional_intelligence',
  'Rate your ability to identify and name specific emotions as they arise in real-time.',
  1.0,
  4,
  now(),
  now()
FROM assessments WHERE slug = 'multi-dimensional-development';

INSERT INTO assessment_questions (id, assessment_id, dimension, question_text, weight, order_index, created_at, updated_at)
SELECT
  gen_random_uuid(),
  id,
  'emotional_intelligence',
  'When faced with intense emotions, how effectively can you observe them without being overwhelmed or suppressing them?',
  1.0,
  5,
  now(),
  now()
FROM assessments WHERE slug = 'multi-dimensional-development';

INSERT INTO assessment_questions (id, assessment_id, dimension, question_text, weight, order_index, created_at, updated_at)
SELECT
  gen_random_uuid(),
  id,
  'emotional_intelligence',
  'Rate your capacity to genuinely empathize with perspectives that are very different from your own.',
  1.0,
  6,
  now(),
  now()
FROM assessments WHERE slug = 'multi-dimensional-development';

INSERT INTO assessment_questions (id, assessment_id, dimension, question_text, weight, order_index, created_at, updated_at)
SELECT
  gen_random_uuid(),
  id,
  'contemplative_capacity',
  'Rate your current level of meditation or contemplative practice experience and consistency.',
  1.0,
  7,
  now(),
  now()
FROM assessments WHERE slug = 'multi-dimensional-development';

INSERT INTO assessment_questions (id, assessment_id, dimension, question_text, weight, order_index, created_at, updated_at)
SELECT
  gen_random_uuid(),
  id,
  'contemplative_capacity',
  'How frequently have you experienced states of deep inner stillness, expanded awareness, or transcendent consciousness?',
  1.0,
  8,
  now(),
  now()
FROM assessments WHERE slug = 'multi-dimensional-development';

INSERT INTO assessment_questions (id, assessment_id, dimension, question_text, weight, order_index, created_at, updated_at)
SELECT
  gen_random_uuid(),
  id,
  'contemplative_capacity',
  'Rate your ability to remain present, centered, and non-reactive during challenging or stressful situations.',
  1.0,
  9,
  now(),
  now()
FROM assessments WHERE slug = 'multi-dimensional-development';

INSERT INTO assessment_questions (id, assessment_id, dimension, question_text, weight, order_index, created_at, updated_at)
SELECT
  gen_random_uuid(),
  id,
  'transformative_readiness',
  'How committed are you to personal transformation, even if it requires significant changes to your life, relationships, or identity?',
  1.0,
  10,
  now(),
  now()
FROM assessments WHERE slug = 'multi-dimensional-development';

INSERT INTO assessment_questions (id, assessment_id, dimension, question_text, weight, order_index, created_at, updated_at)
SELECT
  gen_random_uuid(),
  id,
  'transformative_readiness',
  'Rate the availability of time, space, and resources in your life for engaging in deep developmental and spiritual work.',
  1.0,
  11,
  now(),
  now()
FROM assessments WHERE slug = 'multi-dimensional-development';

INSERT INTO assessment_questions (id, assessment_id, dimension, question_text, weight, order_index, created_at, updated_at)
SELECT
  gen_random_uuid(),
  id,
  'transformative_readiness',
  'Rate your openness to guidance, teachings, and learning from spiritual traditions and experienced teachers.',
  1.0,
  12,
  now(),
  now()
FROM assessments WHERE slug = 'multi-dimensional-development';
