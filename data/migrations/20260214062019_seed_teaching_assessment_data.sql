/*
  # Seed Teaching Assessment Data

  1. Creates Teaching Assessment
    - Personalized Teaching Path Assessment

  2. Seeds 25 Assessment Questions
    - doctrinal_grounding (5 questions)
    - psychological_maturity (5 questions)
    - ethical_responsibility (5 questions)
    - transmission_capacity (5 questions)
    - interfaith_literacy (5 questions)

  3. Purpose
    - Advanced-level evaluation for teaching capacity
    - Does not grant spiritual authority
    - Provides structured developmental guidance
*/

-- Insert teaching assessment
INSERT INTO assessments (slug, title, description, version, is_active, assessment_type)
VALUES (
  'teaching-path-evaluation',
  'Personalized Teaching Path Assessment',
  'Evaluate your spiritual teaching capacity through an integrated Sufi-scientific framework. This assessment examines doctrinal grounding, psychological maturity, ethical responsibility, transmission capacity, and interfaith literacy.',
  1,
  true,
  'teaching'
)
ON CONFLICT (slug) DO NOTHING;

-- Insert doctrinal grounding questions
INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'doctrinal_grounding'::assessment_dimension,
  'Rate your depth of knowledge in core Islamic theology, including tawhid, attributes of Allah, and prophetic teachings.',
  1.0,
  1
FROM assessments WHERE slug = 'teaching-path-evaluation';

INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'doctrinal_grounding'::assessment_dimension,
  'How well do you understand the metaphysical foundations of Sufism, including concepts of fana, baqa, and spiritual stations?',
  1.0,
  2
FROM assessments WHERE slug = 'teaching-path-evaluation';

INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'doctrinal_grounding'::assessment_dimension,
  'Rate your familiarity with the textual sources of Islamic spirituality, including Quran, Hadith, and classical Sufi texts.',
  1.0,
  3
FROM assessments WHERE slug = 'teaching-path-evaluation';

INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'doctrinal_grounding'::assessment_dimension,
  'How confident are you in distinguishing authentic spiritual teachings from cultural accretions or contemporary distortions?',
  1.0,
  4
FROM assessments WHERE slug = 'teaching-path-evaluation';

INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'doctrinal_grounding'::assessment_dimension,
  'Rate your understanding of different schools of Islamic jurisprudence and their relationship to spiritual practice.',
  1.0,
  5
FROM assessments WHERE slug = 'teaching-path-evaluation';

-- Insert psychological maturity questions
INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'psychological_maturity'::assessment_dimension,
  'How stable is your ego structure when receiving criticism or challenges to your spiritual understanding?',
  1.0,
  6
FROM assessments WHERE slug = 'teaching-path-evaluation';

INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'psychological_maturity'::assessment_dimension,
  'Rate your awareness of your own psychological projections, shadow material, and unconscious motivations.',
  1.0,
  7
FROM assessments WHERE slug = 'teaching-path-evaluation';

INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'psychological_maturity'::assessment_dimension,
  'How comfortable are you holding spiritual authority without it inflating your sense of self-importance?',
  1.0,
  8
FROM assessments WHERE slug = 'teaching-path-evaluation';

INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'psychological_maturity'::assessment_dimension,
  'Rate your capacity to navigate interpersonal conflicts with wisdom, compassion, and emotional regulation.',
  1.0,
  9
FROM assessments WHERE slug = 'teaching-path-evaluation';

INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'psychological_maturity'::assessment_dimension,
  'How effectively can you distinguish your personal preferences from universal spiritual principles when guiding others?',
  1.0,
  10
FROM assessments WHERE slug = 'teaching-path-evaluation';

-- Insert ethical responsibility questions
INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'ethical_responsibility'::assessment_dimension,
  'Rate your understanding of the ethical responsibilities and potential abuses of spiritual authority.',
  1.0,
  11
FROM assessments WHERE slug = 'teaching-path-evaluation';

INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'ethical_responsibility'::assessment_dimension,
  'How committed are you to maintaining strict confidentiality and appropriate boundaries in student-teacher relationships?',
  1.0,
  12
FROM assessments WHERE slug = 'teaching-path-evaluation';

INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'ethical_responsibility'::assessment_dimension,
  'Rate your orientation toward financial transparency and avoiding exploitation in spiritual teaching contexts.',
  1.0,
  13
FROM assessments WHERE slug = 'teaching-path-evaluation';

INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'ethical_responsibility'::assessment_dimension,
  'How aware are you of power dynamics and the potential for causing harm when occupying a teaching role?',
  1.0,
  14
FROM assessments WHERE slug = 'teaching-path-evaluation';

INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'ethical_responsibility'::assessment_dimension,
  'Rate your commitment to continuous self-examination and accountability in your role as a potential teacher.',
  1.0,
  15
FROM assessments WHERE slug = 'teaching-path-evaluation';

-- Insert transmission capacity questions
INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'transmission_capacity'::assessment_dimension,
  'Rate your ability to communicate complex spiritual concepts in clear, accessible language appropriate to different audiences.',
  1.0,
  16
FROM assessments WHERE slug = 'teaching-path-evaluation';

INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'transmission_capacity'::assessment_dimension,
  'How effectively can you diagnose a student''s current developmental stage and offer appropriate guidance?',
  1.0,
  17
FROM assessments WHERE slug = 'teaching-path-evaluation';

INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'transmission_capacity'::assessment_dimension,
  'Rate your pedagogical skill in designing learning experiences that facilitate genuine transformation.',
  1.0,
  18
FROM assessments WHERE slug = 'teaching-path-evaluation';

INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'transmission_capacity'::assessment_dimension,
  'How capable are you of adapting traditional teachings to contemporary contexts without compromising their essential wisdom?',
  1.0,
  19
FROM assessments WHERE slug = 'teaching-path-evaluation';

INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'transmission_capacity'::assessment_dimension,
  'Rate your cross-cultural literacy and ability to work effectively with students from diverse backgrounds.',
  1.0,
  20
FROM assessments WHERE slug = 'teaching-path-evaluation';

-- Insert interfaith literacy questions
INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'interfaith_literacy'::assessment_dimension,
  'Rate your knowledge of the core scriptures and teachings of major world religious traditions beyond Islam.',
  1.0,
  21
FROM assessments WHERE slug = 'teaching-path-evaluation';

INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'interfaith_literacy'::assessment_dimension,
  'How well do you understand the historical and civilizational contexts that shaped different spiritual traditions?',
  1.0,
  22
FROM assessments WHERE slug = 'teaching-path-evaluation';

INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'interfaith_literacy'::assessment_dimension,
  'Rate your ability to identify universal spiritual principles across diverse religious and philosophical systems.',
  1.0,
  23
FROM assessments WHERE slug = 'teaching-path-evaluation';

INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'interfaith_literacy'::assessment_dimension,
  'How comfortable are you engaging in respectful dialogue with practitioners and scholars of other faith traditions?',
  1.0,
  24
FROM assessments WHERE slug = 'teaching-path-evaluation';

INSERT INTO assessment_questions (assessment_id, dimension, question_text, weight, order_index)
SELECT
  id,
  'interfaith_literacy'::assessment_dimension,
  'Rate your understanding of contemporary interfaith challenges and opportunities for spiritual cooperation.',
  1.0,
  25
FROM assessments WHERE slug = 'teaching-path-evaluation';
