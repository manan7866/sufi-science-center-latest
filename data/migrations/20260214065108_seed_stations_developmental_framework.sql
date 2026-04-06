/*
  # Seed Stations of the Path - Developmental Framework

  ## Overview
  Populates the station system with a comprehensive developmental cartography
  organized into four phases with detailed psychological and behavioral frameworks.

  ## Data Structure
  1. Phase I: Orientation (3 stations)
  2. Phase II: Discipline (4 stations)
  3. Phase III: Interior Refinement (4 stations)
  4. Phase IV: Expansive Awareness (4 stations)

  Each station includes:
  - Classical definitions
  - Psychological dimensions
  - Behavioral markers
  - Common distortions
  - Integration notes
*/

-- Insert Phase I: Orientation
INSERT INTO station_phases (phase_number, name_english, name_arabic, description, developmental_focus)
VALUES (
  1,
  'Orientation',
  'التوجيه',
  'The foundational phase where practitioners establish ethical grounding and cognitive reorientation. This phase involves recognizing patterns requiring transformation and developing initial capacity for self-observation.',
  'Ethical sensitivity, awareness cultivation, and detachment calibration'
) ON CONFLICT (phase_number) DO NOTHING;

-- Insert Phase II: Discipline
INSERT INTO station_phases (phase_number, name_english, name_arabic, description, developmental_focus)
VALUES (
  2,
  'Discipline',
  'الانضباط',
  'The consolidation phase where practitioners develop sustained practices and emotional regulation. This phase establishes the behavioral and attentional infrastructure necessary for deeper transformation.',
  'Emotional regulation, attentional training, and practice stabilization'
) ON CONFLICT (phase_number) DO NOTHING;

-- Insert Phase III: Interior Refinement
INSERT INTO station_phases (phase_number, name_english, name_arabic, description, developmental_focus)
VALUES (
  3,
  'Interior Refinement',
  'التنقية الداخلية',
  'The integrative phase where practitioners refine motivations and develop sophisticated trust architectures. This phase emphasizes psychological purification and intention clarification.',
  'Trust development, acceptance integration, and motivational purification'
) ON CONFLICT (phase_number) DO NOTHING;

-- Insert Phase IV: Expansive Awareness
INSERT INTO station_phases (phase_number, name_english, name_arabic, description, developmental_focus)
VALUES (
  4,
  'Expansive Awareness',
  'الوعي التوسعي',
  'The realization phase where practitioners integrate direct knowing and experience ego-transcendence. This phase represents the culmination of developmental work and return to embodied service.',
  'Devotional maturation, gnosis, ego dissolution, and integrated return'
) ON CONFLICT (phase_number) DO NOTHING;

-- Get phase IDs for foreign key references
DO $$
DECLARE
  phase1_id uuid;
  phase2_id uuid;
  phase3_id uuid;
  phase4_id uuid;
BEGIN
  SELECT id INTO phase1_id FROM station_phases WHERE phase_number = 1;
  SELECT id INTO phase2_id FROM station_phases WHERE phase_number = 2;
  SELECT id INTO phase3_id FROM station_phases WHERE phase_number = 3;
  SELECT id INTO phase4_id FROM station_phases WHERE phase_number = 4;

  -- ============================================================================
  -- PHASE I: ORIENTATION
  -- ============================================================================

  -- Station 1.1: Tawbah (Reorientation)
  INSERT INTO spiritual_stations (
    phase_id, order_in_phase, name_arabic, name_transliteration, name_english,
    classical_definition, psychological_dimension, developmental_markers,
    common_distortions, integration_notes
  ) VALUES (
    phase1_id, 1, 'التوبة', 'Tawbah', 'Reorientation',
    'Classical Sufism defines tawbah as turning away from patterns of harm and redirecting consciousness toward the Divine. Al-Qushayri describes it as "returning from what is blameworthy according to Sacred Law to what is praiseworthy." It is universally recognized as the foundational station.',
    'Psychologically, tawbah represents cognitive reorientation—the recognition of maladaptive patterns and the deliberate restructuring of behavioral priorities. It involves metacognitive awareness: observing one''s own thought patterns and choosing alternative responses. This station cultivates agency and intentionality.',
    'Observable markers include: increased self-reflection capacity, willingness to acknowledge mistakes without defensive justification, behavioral pattern interruption, value clarification exercises, and sustained effort to align actions with stated principles.',
    'Common distortions include performative guilt displays, excessive self-flagellation that paralyzes action, obsessive rumination without behavioral change, spiritual bypassing of practical accountability, and treating tawbah as a one-time event rather than ongoing recalibration.',
    'Tawbah stabilizes when reorientation becomes integrated into daily awareness—when practitioners develop automatic pattern recognition and course correction without requiring crisis intervention. The station matures from reactive repair to proactive alignment.'
  ) ON CONFLICT (phase_id, order_in_phase) DO NOTHING;

  -- Station 1.2: Waraʿ (Ethical Sensitivity)
  INSERT INTO spiritual_stations (
    phase_id, order_in_phase, name_arabic, name_transliteration, name_english,
    classical_definition, psychological_dimension, developmental_markers,
    common_distortions, integration_notes
  ) VALUES (
    phase1_id, 2, 'الورع', 'Waraʿ', 'Ethical Sensitivity',
    'Waraʿ is described by classical authorities as scrupulousness—abstaining not only from the clearly prohibited but also from the ambiguous and doubtful. Al-Ghazali emphasizes it as protective vigilance that safeguards the heart from contamination through questionable choices.',
    'This station develops refined ethical discernment and heightened sensitivity to moral nuance. It cultivates the capacity to detect subtle ethical dimensions in ordinary decisions. Psychologically, it represents the development of sophisticated consequential thinking and values-based decision architecture.',
    'Markers include: pausing before decisions to assess ethical implications, increased discomfort with ethical ambiguity, questioning consumption patterns and their systemic effects, developing personal ethical standards beyond social norms, and willingness to sacrifice convenience for principles.',
    'Distortions manifest as obsessive-compulsive scrupulosity that creates paralysis, judgmental rigidity toward others, spiritual elitism and superiority complexes, anxiety-driven perfectionism, and using ethical standards as weapons rather than personal disciplines.',
    'Waraʿ integrates when ethical sensitivity becomes internalized discernment rather than anxious rule-following. The practitioner develops intuitive ethical navigation without requiring exhaustive deliberation for every minor choice. It becomes character rather than calculation.'
  ) ON CONFLICT (phase_id, order_in_phase) DO NOTHING;

  -- Station 1.3: Zuhd (Detachment Calibration)
  INSERT INTO spiritual_stations (
    phase_id, order_in_phase, name_arabic, name_transliteration, name_english,
    classical_definition, psychological_dimension, developmental_markers,
    common_distortions, integration_notes
  ) VALUES (
    phase1_id, 3, 'الزهد', 'Zuhd', 'Detachment Calibration',
    'Zuhd is traditionally understood as renunciation—not necessarily abandoning possessions, but emptying the heart of attachment to them. Ibn Ata Allah states: "True zuhd is that nothing changes in you whether you have something or lack it." The focus is internal orientation, not external poverty.',
    'Psychologically, zuhd represents recalibrating the relationship between identity and acquisition. It involves recognizing how material accumulation is used to manage existential anxiety and developing alternative sources of security and meaning. This station cultivates non-attachment without repression.',
    'Behavioral indicators include: reduced impulsive purchasing, ability to release possessions without emotional distress, decreased status anxiety, experimentation with voluntary simplicity, recognition of sufficiency thresholds, and redirecting energy from acquisition to contribution.',
    'Common distortions include performative poverty as identity branding, contempt for those who possess wealth, repression of legitimate material needs, spiritual materialism (collecting experiences instead of objects), and using asceticism to avoid adult responsibilities.',
    'Zuhd stabilizes when practitioners achieve equanimity regarding material circumstances—neither grasping when absent nor clinging when present. The station matures from effortful renunciation to natural sufficiency. Practitioners engage material reality without existential dependency on it.'
  ) ON CONFLICT (phase_id, order_in_phase) DO NOTHING;

  -- ============================================================================
  -- PHASE II: DISCIPLINE
  -- ============================================================================

  -- Station 2.1: Ṣabr (Emotional Regulation)
  INSERT INTO spiritual_stations (
    phase_id, order_in_phase, name_arabic, name_transliteration, name_english,
    classical_definition, psychological_dimension, developmental_markers,
    common_distortions, integration_notes
  ) VALUES (
    phase2_id, 1, 'الصبر', 'Ṣabr', 'Emotional Regulation',
    'Ṣabr is patient perseverance in the face of difficulty. Classical texts distinguish three types: patience in obedience, patience in avoiding disobedience, and patience with divine decree. Al-Muhasibi describes it as "holding the self back from anxiety and the tongue from complaint."',
    'This station develops emotional regulation capacity—the ability to experience difficult emotions without reactive behavior. It cultivates distress tolerance, delayed gratification, and the space between stimulus and response. Psychologically, it builds the prefrontal cortex''s capacity to modulate limbic reactivity.',
    'Observable markers include: reduced impulsive reactions under stress, ability to maintain commitments despite discomfort, tolerance for ambiguity and uncertainty, capacity to process emotions without immediate discharge, and perseverance through extended difficulties without collapse.',
    'Distortions include emotional suppression masquerading as patience, passive acceptance of injustice that requires action, using patience as avoidance of necessary conflict, toxic positivity that denies legitimate suffering, and spiritual bypassing of trauma that requires professional intervention.',
    'Ṣabr integrates when emotional regulation becomes automatic—when practitioners develop stable capacity to remain present with difficulty without either repression or reactivity. The station matures from white-knuckled endurance to spacious equanimity.'
  ) ON CONFLICT (phase_id, order_in_phase) DO NOTHING;

  -- Station 2.2: Shukr (Gratitude Stabilization)
  INSERT INTO spiritual_stations (
    phase_id, order_in_phase, name_arabic, name_transliteration, name_english,
    classical_definition, psychological_dimension, developmental_markers,
    common_distortions, integration_notes
  ) VALUES (
    phase2_id, 2, 'الشكر', 'Shukr', 'Gratitude Stabilization',
    'Shukr is gratitude expressed through heart recognition, tongue acknowledgment, and limb action. Classical authorities emphasize that true gratitude uses blessings in ways that honor their Source. Al-Ghazali states: "Gratitude is recognizing the benefactor and using the benefit appropriately."',
    'This station cultivates sustained gratitude as a cognitive-emotional orientation rather than sporadic positive thinking. It involves neurological rewiring—training attention toward generative appreciation rather than threat detection and deficit scanning. It builds psychological resilience through recognition of support.',
    'Markers include: spontaneous recognition of unearned advantages, decreased entitlement mentality, increased generosity as expression of abundance consciousness, ability to find meaning in difficulty, capacity to appreciate ordinary experiences, and using resources in service rather than hoarding.',
    'Common distortions include toxic positivity that denies legitimate suffering, gratitude as spiritual bypassing of systemic injustice, performative thankfulness for social approval, using gratitude practices to suppress anger at real violations, and treating gratitude as magical thinking rather than relational acknowledgment.',
    'Shukr stabilizes when gratitude becomes an automatic perceptual filter rather than an imposed practice. Practitioners develop a baseline orientation of appreciation that persists through varying circumstances. Gratitude becomes character structure rather than mood management technique.'
  ) ON CONFLICT (phase_id, order_in_phase) DO NOTHING;

  -- Station 2.3: Dhikr (Attentional Training)
  INSERT INTO spiritual_stations (
    phase_id, order_in_phase, name_arabic, name_transliteration, name_english,
    classical_definition, psychological_dimension, developmental_markers,
    common_distortions, integration_notes
  ) VALUES (
    phase2_id, 3, 'الذكر', 'Dhikr', 'Attentional Training',
    'Dhikr is remembrance of the Divine through repeated invocation. The Quran commands: "Remember Me, and I will remember you" (2:152). Classical teachers distinguish between dhikr of the tongue, dhikr of the heart, and dhikr of the innermost being—progressively deeper levels of conscious awareness.',
    'This station represents systematic attentional training—the deliberate cultivation of sustained focus and metacognitive awareness. Psychologically, it develops executive function, reduces default mode network dominance, and strengthens the capacity for present-moment awareness. It is cognitive training through sacred repetition.',
    'Behavioral markers include: established daily practice routines, increased present-moment awareness in ordinary activities, reduced mental rumination and anxiety, enhanced focus capacity, ability to redirect wandering attention, and spontaneous remembrance arising during daily life.',
    'Distortions include mechanical repetition without presence, using dhikr as dissociation from difficult emotions, spiritual bypassing of practical responsibilities, treating practice as merit accumulation, competing over quantity without quality, and using sacred practice for ego enhancement.',
    'Dhikr stabilizes when remembrance becomes continuous—when the practice transitions from scheduled sessions to ambient awareness. Advanced practitioners develop persistent background awareness that contextualizes all experience within sacred framing. Dhikr becomes the operating system rather than an application.'
  ) ON CONFLICT (phase_id, order_in_phase) DO NOTHING;

  -- Station 2.4: Tawakkul (Trust Architecture) - Early Development
  INSERT INTO spiritual_stations (
    phase_id, order_in_phase, name_arabic, name_transliteration, name_english,
    classical_definition, psychological_dimension, developmental_markers,
    common_distortions, integration_notes
  ) VALUES (
    phase2_id, 4, 'التوكل', 'Tawakkul', 'Trust Development',
    'Tawakkul is reliance upon Allah while engaging appropriate means. The classical formula states: "Tie your camel, then trust in Allah"—combining practical action with spiritual trust. It is neither passive fatalism nor anxious self-reliance, but calibrated dependence that recognizes limited human control.',
    'This station begins developing trust architecture—the psychological capacity to tolerate uncertainty while acting effectively. It involves distinguishing between controllable and uncontrollable factors and releasing anxious attachment to outcomes. Psychologically, it reduces hypervigilance and catastrophic thinking.',
    'Early markers include: reduced control anxiety, ability to plan without obsessive contingency mapping, tolerance for outcome uncertainty, decreased need for guarantees before acting, recognition of support networks, and willingness to take measured risks without demanding certainty.',
    'Common distortions include passive fatalism avoiding necessary action, spiritual bypassing of planning and preparation, using trust as excuse for irresponsibility, reckless behavior justified as faith, and anxiety suppression rather than genuine trust development.',
    'In this phase, tawakkul begins stabilizing as basic trust—practitioners develop initial capacity to act without guarantees. This is foundational trust that will deepen significantly in Phase III as Interior Refinement work progresses.'
  ) ON CONFLICT (phase_id, order_in_phase) DO NOTHING;

  -- ============================================================================
  -- PHASE III: INTERIOR REFINEMENT
  -- ============================================================================

  -- Station 3.1: Tawakkul (Trust Architecture) - Deep Integration
  INSERT INTO spiritual_stations (
    phase_id, order_in_phase, name_arabic, name_transliteration, name_english,
    classical_definition, psychological_dimension, developmental_markers,
    common_distortions, integration_notes
  ) VALUES (
    phase3_id, 1, 'التوكل المتقدم', 'Tawakkul al-Mutaqaddim', 'Trust Architecture (Advanced)',
    'At advanced levels, tawakkul becomes complete surrender of outcome attachment while maintaining full engagement in process. Ibn Ata Allah writes: "Depend on Allah alone, with a dependence that includes all other forms of depending." This represents sophisticated trust beyond basic stress management.',
    'Deep tawakkul involves restructuring fundamental assumptions about security, control, and providence. It is not positive thinking but ontological reorientation—recognizing that ultimate outcomes transcend human manipulation. This station develops profound psychological flexibility and existential ease.',
    'Advanced markers include: acting with full commitment while holding outcomes lightly, equanimity through major life transitions, capacity to release cherished plans without bitterness, trust maintained through extended uncertainty, and ability to find meaning in apparent setbacks.',
    'At this level, distortions include spiritual arrogance about one''s trust capacity, using surrender language to avoid legitimate grief, detachment that becomes dissociation, and conflating acceptance with approval of injustice.',
    'Advanced tawakkul integrates as stable character structure—practitioners naturally operate from trust without requiring self-reminders. This represents fundamental psychological reorganization where anxiety no longer dominates decision-making. Trust becomes one''s baseline rather than achievement.'
  ) ON CONFLICT (phase_id, order_in_phase) DO NOTHING;

  -- Station 3.2: Riḍā (Acceptance Integration)
  INSERT INTO spiritual_stations (
    phase_id, order_in_phase, name_arabic, name_transliteration, name_english,
    classical_definition, psychological_dimension, developmental_markers,
    common_distortions, integration_notes
  ) VALUES (
    phase3_id, 2, 'الرضا', 'Riḍā', 'Acceptance Integration',
    'Riḍā is contentment with divine decree—accepting what unfolds without internal rebellion. Al-Qushayri distinguishes it from mere patience: sabr is enduring difficulty, while rida is welcoming it. This station represents profound peace with reality as it is, not as one wishes it to be.',
    'Psychologically, riḍā develops radical acceptance—the capacity to cease fighting reality while still working to change what can be changed. It involves releasing the secondary suffering created by resistance to primary suffering. This station cultivates deep peace through acceptance of what is beyond control.',
    'Observable markers include: reduced complaint and resentment, ability to find wisdom in difficulty, decreased need to explain or justify circumstances, graceful aging and acceptance of limitation, peace with mortality, and profound equanimity through loss.',
    'Distortions include passive acceptance of injustice requiring action, fatalism that precludes agency, spiritual bypassing of legitimate grief and anger, using acceptance to avoid trauma processing, and toxic positivity that denies real suffering.',
    'Riḍā integrates when acceptance becomes automatic—when practitioners no longer waste energy fighting unchangeable realities. This creates immense psychological freedom and energy for effective action on what can be influenced. Acceptance becomes the foundation for wise engagement.'
  ) ON CONFLICT (phase_id, order_in_phase) DO NOTHING;

  -- Station 3.3: Ikhlāṣ (Intention Purification)
  INSERT INTO spiritual_stations (
    phase_id, order_in_phase, name_arabic, name_transliteration, name_english,
    classical_definition, psychological_dimension, developmental_markers,
    common_distortions, integration_notes
  ) VALUES (
    phase3_id, 3, 'الإخلاص', 'Ikhlāṣ', 'Intention Purification',
    'Ikhlāṣ is sincerity—performing actions solely for the Divine without admixture of ego-gratification, social approval, or self-congratulation. The Prophet stated: "Actions are by intentions." Classical authorities consider ikhlāṣ the most difficult station because ego constantly contaminates motivation.',
    'This station involves sophisticated metacognitive awareness of motivation and the systematic purification of intention. Psychologically, it requires observing ego''s subtle infiltrations: performing good acts for recognition, spiritual practice for superiority, or service for identity construction. It develops motivational transparency.',
    'Markers include: reduced need for recognition or credit, ability to serve anonymously, discomfort with praise that doesn''t redirect to the Source, internal monitoring of motivation during action, willingness to abandon actions if ego becomes primary driver, and humility regarding achievements.',
    'Common distortions include obsessive self-scrutiny that creates paralysis, using intention-monitoring as excuse to avoid action, spiritual pride about one''s sincerity, performative humility that seeks recognition for humility, and treating ikhlāṣ as achievable perfection rather than ongoing refinement.',
    'Ikhlāṣ stabilizes when intention purification becomes automatic background awareness rather than obsessive foreground concern. Advanced practitioners develop subtle internal sensors that detect ego contamination without creating paralysis. Sincerity becomes natural rather than effortful.'
  ) ON CONFLICT (phase_id, order_in_phase) DO NOTHING;

  -- Station 3.4: Murāqabah (Witnessing Presence)
  INSERT INTO spiritual_stations (
    phase_id, order_in_phase, name_arabic, name_transliteration, name_english,
    classical_definition, psychological_dimension, developmental_markers,
    common_distortions, integration_notes
  ) VALUES (
    phase3_id, 4, 'المراقبة', 'Murāqabah', 'Witnessing Presence',
    'Murāqabah is vigilant awareness of the Divine Presence—living with consciousness that one is perpetually witnessed. The Quran states: "He is with you wherever you are" (57:4). This station cultivates continuous God-consciousness that contextualizes all experience within sacred awareness.',
    'Psychologically, murāqabah develops persistent metacognitive awareness and ethical accountability through internalized witnessing. It creates psychological integrity through the recognition that private and public selves are equally visible. This station eliminates ethical compartmentalization.',
    'Observable markers include: behavioral consistency across public and private contexts, reduced hypocrisy and compartmentalization, heightened ethical sensitivity, spontaneous self-correction when behavior contradicts values, living as though always visible, and sacred awareness permeating ordinary activities.',
    'Distortions include paranoid surveillance consciousness creating anxiety, using witnessing awareness as superego weapon, scrupulosity that creates paralysis, spiritual bypassing of shadow work, and treating murāqabah as thought policing rather than loving presence.',
    'Murāqabah integrates when witnessing presence becomes continuous background awareness—when practitioners naturally operate from consciousness of being seen without this creating anxiety. It becomes the stable operating context for all activity, creating profound ethical coherence and psychological integration.'
  ) ON CONFLICT (phase_id, order_in_phase) DO NOTHING;

  -- ============================================================================
  -- PHASE IV: EXPANSIVE AWARENESS
  -- ============================================================================

  -- Station 4.1: Maḥabbah (Devotional Love)
  INSERT INTO spiritual_stations (
    phase_id, order_in_phase, name_arabic, name_transliteration, name_english,
    classical_definition, psychological_dimension, developmental_markers,
    common_distortions, integration_notes
  ) VALUES (
    phase4_id, 1, 'المحبة', 'Maḥabbah', 'Devotional Love',
    'Maḥabbah is transformative love of the Divine that becomes the organizing principle of consciousness. Rabi''a al-Adawiyya prayed: "If I worship You from fear of Hell, burn me in Hell; if from hope of Paradise, exclude me from Paradise; but if I worship You for Your own sake, do not withhold Your eternal beauty." This is love purified of transactionality.',
    'This station represents the flowering of devotional maturity—when spiritual practice transcends discipline and becomes spontaneous expression of love. Psychologically, it involves the integration of attachment systems with spiritual orientation, creating secure sacred attachment that organizes identity and purpose.',
    'Markers include: spontaneous tears or emotional overflow in sacred contexts, practice becoming joy rather than duty, constant background longing for the Beloved, finding Divine presence in creation, service becoming love''s expression, and willingness to sacrifice anything for the relationship.',
    'Distortions include emotional intoxication without ethical grounding, using spiritual love to avoid human relationships, sentimentality without transformation, attachment to spiritual experiences rather than the Divine, and conflating neurological euphoria with authentic love.',
    'Maḥabbah stabilizes when devotional love becomes the constant background of awareness—when practitioners live in continuous relationship with the Beloved regardless of emotional state. The station matures from emotional intensity to profound intimacy that persists through varying phenomenology.'
  ) ON CONFLICT (phase_id, order_in_phase) DO NOTHING;

  -- Station 4.2: Maʿrifah (Gnosis)
  INSERT INTO spiritual_stations (
    phase_id, order_in_phase, name_arabic, name_transliteration, name_english,
    classical_definition, psychological_dimension, developmental_markers,
    common_distortions, integration_notes
  ) VALUES (
    phase4_id, 2, 'المعرفة', 'Maʿrifah', 'Direct Knowing',
    'Maʿrifah is direct experiential knowledge of ultimate reality—knowing by being rather than knowing by learning. Al-Junayd states: "Gnosis is the removal of the veils of conceptual knowledge." This is unmediated recognition that transcends discursive reasoning while not contradicting it.',
    'Psychologically, maʿrifah represents non-dual awareness—the experiential collapse of subject-object duality and recognition of fundamental unity. It involves temporary suspension of the default mode network''s self-construction and direct perception of underlying reality. This is transformative insight rather than conceptual understanding.',
    'Indicators include: spontaneous insights that reorganize understanding, recognition of unity underlying apparent multiplicity, seeing Divine attributes manifesting in creation, direct perception beyond conceptual mediation, and radical cognitive restructuring following realization experiences.',
    'Common distortions include intellectual understanding mistaken for experiential knowing, spiritual inflation following insight experiences, using gnosis language to claim authority, treating realization as achievement rather than grace, and severing maʿrifah from ethical embodiment.',
    'Maʿrifah integrates when direct knowing stabilizes as persistent background awareness rather than sporadic peak experience. Advanced practitioners maintain recognition of unity while functioning effectively in multiplicity. Gnosis becomes lived reality rather than remembered experience.'
  ) ON CONFLICT (phase_id, order_in_phase) DO NOTHING;

  -- Station 4.3: Fanāʾ (Ego Dissolution)
  INSERT INTO spiritual_stations (
    phase_id, order_in_phase, name_arabic, name_transliteration, name_english,
    classical_definition, psychological_dimension, developmental_markers,
    common_distortions, integration_notes
  ) VALUES (
    phase4_id, 3, 'الفناء', 'Fanāʾ', 'Ego Dissolution',
    'Fanāʾ is annihilation of the constructed self in the Divine Reality—the experiential death of egoic identity and recognition that only the Divine exists. Al-Ghazali describes it as "the absence of consciousness of self and the absence of consciousness of that absence." This is radical deconstruction of subject-hood.',
    'Psychologically, fanāʾ represents temporary dissolution of the self-construct—the experiential recognition that the separate self is conceptual rather than ontological. It involves complete release of identity narratives and direct experience of non-separation. This can be terrifying and liberating simultaneously.',
    'Phenomenological markers include: temporary loss of subject-object duality, experience of consciousness without personal center, profound peace beyond understanding, recognition of Divine attributes as one''s true nature, and radical freedom from identity constraints.',
    'Severe distortions include psychotic decomposition mistaken for spiritual attainment, premature ego dissolution without adequate integration capacity, spiritual bypassing of developmental work, using fanāʾ language without experiential basis, and neglecting embodied responsibilities through dissociation.',
    'Fanāʾ does not stabilize as permanent state—it is typically a profound but temporary experience that fundamentally reorganizes understanding. The value is not maintaining ego dissolution but how it transforms subsequent functioning. It destroys illusions that prevent authentic living.'
  ) ON CONFLICT (phase_id, order_in_phase) DO NOTHING;

  -- Station 4.4: Baqāʾ (Integrated Return)
  INSERT INTO spiritual_stations (
    phase_id, order_in_phase, name_arabic, name_transliteration, name_english,
    classical_definition, psychological_dimension, developmental_markers,
    common_distortions, integration_notes
  ) VALUES (
    phase4_id, 4, 'البقاء', 'Baqāʾ', 'Integrated Return',
    'Baqāʾ is subsistence in the Divine after fanāʾ—the return to functional selfhood while maintaining recognition of ultimate unity. If fanāʾ is mystical death, baqāʾ is mystical resurrection. The self returns but transformed, operating as Divine instrument rather than autonomous agent. This is enlightened embodiment.',
    'Psychologically, baqāʾ represents post-conventional integration—returning to ordinary functioning with fundamental identity reorganization. The practitioner operates in the world with practical effectiveness while maintaining awareness of non-separation. This station embodies the completion of the developmental journey.',
    'Observable markers include: profound ordinariness combined with extraordinary presence, effective functioning without ego-driven motivation, spontaneous appropriate response without deliberation, service without self-consciousness, wisdom expressed through simple living, and teaching through being rather than speaking.',
    'Distortions include spiritual bypassing of ongoing psychological work, premature claims of completion, using baqāʾ language for spiritual status, treating return as failure rather than maturation, and conflating functional selfhood with egoic reidentification.',
    'Baqāʾ represents stable integration of realization into embodied life. This is the mature expression of the path: practitioners live as both human and Divine manifestation simultaneously. They function effectively in multiplicity while never forgetting unity. This is the goal—not escape from life but sacred participation in it.'
  ) ON CONFLICT (phase_id, order_in_phase) DO NOTHING;

END $$;