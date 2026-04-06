/*
  # Seed Sacred Geometry Episodes and Practices Profiles

  1. New Content
    - 5 full episodes for the "Sacred Geometry and Cosmology" dialogue series
    - 6 practice profiles for the Applied Practices section
  
  2. Notes
    - Sacred Geometry series ID: 93289e19-4bdf-46ae-a8ac-48b3862af461
    - JSONB arrays used for key_questions, key_insights, steps, related_saints, themes, tags
*/

-- Sacred Geometry episodes
INSERT INTO series_episodes (series_id, episode_number, slug, title, description, duration_minutes, key_questions, key_insights, transcript) VALUES
(
  '93289e19-4bdf-46ae-a8ac-48b3862af461',
  1,
  'sacred-geometry-ep1-language-of-form',
  'The Language of Form: Geometry as Cosmological Grammar',
  'An opening exploration of why geometry appears across all major wisdom traditions as a primary vehicle for expressing cosmological understanding, from Islamic geometric art to Platonic solids.',
  75,
  '["Why does geometry appear across all wisdom traditions as a primary cosmological language?", "What is the relationship between mathematical form and metaphysical reality?", "How did Islamic geometric art function as more than decoration?"]'::jsonb,
  '["Geometry offers a non-verbal language capable of pointing toward realities that exceed ordinary linguistic description", "The recurrence of specific proportional relationships across unconnected traditions suggests a shared cosmological intuition", "Islamic geometric art was understood by its practitioners as a meditative technology, not merely aesthetic expression"]'::jsonb,
  'PROF. IBRAHIM HASSAN: I want to begin with a question that might seem obvious but which I think is genuinely puzzling: why geometry? Why, across traditions separated by centuries and continents, does geometry keep appearing as the primary vehicle for cosmological expression?

DR. LAYLA WINTERS: From a mathematical perspective, geometry has certain properties that make it uniquely suited to this function. Geometric relationships are eternal in a way that narrative or discursive description is not. The relationship between a circle''s circumference and its diameter does not depend on historical circumstance or cultural interpretation. In that sense, geometry participates in what mathematicians call necessity — it could not be otherwise.

SHEIKH OMAR AL-RASHID: The tradition speaks of this as al-hikmah al-ilahiyya — divine wisdom — expressing itself through form. Ibn Arabi''s concept of the a''yan al-thabita, the fixed archetypes, is in some ways a geometric concept: eternal patterns through which the divine names manifest in the world of forms. The geometry is not decoration added to meaning. The geometry is the meaning.

PROF. IBRAHIM HASSAN: And yet there is a tension here that I want to surface early. When we look at Islamic geometric art — the extraordinary complexity of the Alhambra''s tilework, for example — we can appreciate it aesthetically without understanding anything of its cosmological intent. The geometric language requires initiation into its grammar to be read. Does that create a problem?

DR. LAYLA WINTERS: Every language creates that problem. The point is not whether the language is accessible to the uninitiated but whether it is precise and capable of bearing the meaning its practitioners intend. What strikes me most about the mathematical sophistication of medieval Islamic geometric art is that the craftsmen who executed it were not simply following patterns. They were making choices that encoded specific cosmological relationships — the seventeen wallpaper symmetry groups, the quasi-crystalline patterns that anticipate Penrose tilings by five centuries.'
),
(
  '93289e19-4bdf-46ae-a8ac-48b3862af461',
  2,
  'sacred-geometry-ep2-circle-and-point',
  'The Circle and the Point: Centre, Circumference, and Divine Names',
  'Exploring the cosmological significance of the circle as the primary geometric form — the relationship between the unmanifest centre and the manifested circumference as a model for understanding emanation.',
  80,
  '["What does the relationship between centre and circumference reveal about cosmological structure?", "How does the concept of emanation in Islamic philosophy differ from creation ex nihilo?", "What is the significance of al-nuqta — the point — in Sufi geometric metaphysics?"]'::jsonb,
  '["The circle''s dimensionless centre parallels the divine essence which is beyond all attribute yet the source of all manifestation", "Emanation is not a temporal but an ontological relationship — not when but how things stand in relation to the divine", "Al-nuqta, the primordial point, represents divine self-disclosure before differentiation"]'::jsonb,
  'SHEIKH OMAR AL-RASHID: Let us sit with the circle for a moment. In Sufi geometry, the circle is the primary form because it contains within itself the relationship between the one and the many — the centre which is dimensionless, beyond all measurement, and the circumference which is the complete and equal expression of that centre at every point.

DR. LAYLA WINTERS: This maps precisely onto a mathematical concept that was not formalised until the nineteenth century: the relationship between a function and its values. The centre is the function — the generative rule. The circumference is the complete set of values generated by that rule. Both are necessary for the circle to exist, but they are of fundamentally different orders.

PROF. IBRAHIM HASSAN: What I find remarkable in Ibn Arabi''s treatment of this geometry is his insistence that the relationship is not temporal. It is not that the centre existed first and then produced the circumference. They are simultaneous and mutually constitutive. The centre is centre only in relation to a circumference. This is the logic of divine self-disclosure — al-tajalli — which is not an event in time but a permanent ontological relationship.

SHEIKH OMAR AL-RASHID: And this is why the tradition says that creation is not something that happened but something that is perpetually happening. Every moment is a new disclosure. The universe is not a product that was produced and then left to run; it is a perpetual emanation, like light from the sun. If the sun ceased to radiate, the light would not continue independently — it would simply cease.'
),
(
  '93289e19-4bdf-46ae-a8ac-48b3862af461',
  3,
  'sacred-geometry-ep3-square-and-triangle',
  'The Square, the Triangle, and the Transition from Unity to Multiplicity',
  'Investigating how the progression from circle to triangle to square in sacred geometry encodes a cosmological narrative of increasing differentiation from primordial unity.',
  70,
  '["What is the cosmological significance of the transition from circle to polygon?", "How do the triangle and square encode different stages in the manifestation of multiplicity?", "What does the relationship between 3 and 4 represent in Islamic geometric cosmology?"]'::jsonb,
  '["The triangle represents the first differentiation corresponding to the triad of essence, names, and qualities", "The square''s four directions map onto the complete articulation of the manifest world", "The odd numbers maintain a connection to unity that even numbers, by their divisibility, surrender"]'::jsonb,
  'PROF. IBRAHIM HASSAN: I want to address something that might seem like a puzzle: why, in virtually every sacred geometric tradition, does the sequence run from circle to triangle to square? Why this particular progression?

DR. LAYLA WINTERS: Mathematically, it is the sequence of increasing regularity — the circle as the limit of a polygon with infinite sides, then the triangle as the simplest possible polygon, then the square as the first regular polygon with an even number of sides. Each introduces a new kind of symmetry. The triangle has three-fold rotational symmetry; the square has four-fold. These are fundamentally different mathematical structures.

SHEIKH OMAR AL-RASHID: In the symbolic vocabulary of the tradition, the triangle is the first form that can contain — that can create an interior and an exterior, a here and a there. The circle, though it has an inside and outside, has no vertices, no angles — it is pure continuity. The triangle introduces the first genuine discontinuity, the first corner, the first point of decision. And this maps onto the first moment of differentiation in the divine self-disclosure — the distinction between the knowing, the known, and the act of knowing.

DR. LAYLA WINTERS: What is mathematically striking about this is that the triangle is the irreducible foundation of all polygon geometry. Any polygon can be decomposed into triangles — that is the basis of triangulation in computational geometry and structural engineering. The triangle is, in a precise mathematical sense, the atom of polygonal space. Which suggests that the tradition''s privileging of the triangle is not arbitrary mysticism but an intuition about mathematical structure that anticipates formal proof by centuries.'
),
(
  '93289e19-4bdf-46ae-a8ac-48b3862af461',
  4,
  'sacred-geometry-ep4-proportion-and-ratio',
  'Proportion, Ratio, and the Golden Mean in Islamic Architecture',
  'A detailed examination of how specific proportional relationships — particularly the golden ratio and root rectangles — were deliberately embedded in Islamic sacred architecture as cosmological statements.',
  85,
  '["How were specific mathematical proportions embedded in Islamic sacred architecture, and with what intent?", "What is the relationship between the golden ratio and organic growth?", "Can a building function as a cosmological instrument for calibrating human perception?"]'::jsonb,
  '["The golden ratio appears in Islamic architecture as cosmological statement — the proportion mediating between the finite and the infinite", "Islamic architects possessed precise methods for constructing irrational proportions using compass and straightedge", "Sacred architecture was understood as a device for recalibrating human perception toward cosmological order"]'::jsonb,
  'DR. LAYLA WINTERS: I want to introduce some precision into our discussion of proportion. When architects and geometers of the Islamic tradition spoke of al-nisba al-dhahabiyya — the golden proportion — they were not speaking loosely of any pleasing ratio. They were speaking of a specific mathematical relationship: the proportion in which the ratio of the whole to the larger part equals the ratio of the larger part to the smaller. This is an exact mathematical definition.

PROF. IBRAHIM HASSAN: And what is philosophically significant about this proportion is precisely what Dr. Winters has mentioned — it is the proportion that mediates between the commensurable and the incommensurable. The golden ratio is irrational; it cannot be expressed as a fraction of two integers. In Greek mathematics, irrational numbers were associated with the divine precisely because they exceeded the domain of ordinary measurement. They pointed toward something that the finite measuring mind could approach but never fully capture.

SHEIKH OMAR AL-RASHID: The tradition speaks of this as the proportion of the barzakh — the isthmus. The barzakh is the boundary that both separates and connects two domains. The golden proportion is the mathematical barzakh between the finite and the infinite. When an architect builds using this proportion, she is embedding in the material structure a pointer toward the threshold of manifestation itself.'
),
(
  '93289e19-4bdf-46ae-a8ac-48b3862af461',
  5,
  'sacred-geometry-ep5-living-geometry',
  'Living Geometry: Fractals, Self-Similarity, and the Breath of the Merciful',
  'A concluding synthesis connecting the self-similar structures found in Islamic geometric art with contemporary fractal mathematics and the concept of nafas al-rahman.',
  90,
  '["What is the connection between Islamic geometric art''s nested patterns and fractal geometry?", "How does nafas al-rahman function as a dynamic cosmological principle analogous to iterative function systems?", "What do these mathematical correspondences suggest about the nature of cosmological knowledge?"]'::jsonb,
  '["The quasi-crystalline patterns in medieval Islamic geometric art constitute an independent discovery of structures not formally described in Western mathematics until the twentieth century", "The concept of nafas al-rahman has a precise formal analogue in iterative function systems underlying fractal geometry", "These convergences suggest both traditions were responding to the same underlying structures in reality"]'::jsonb,
  'DR. LAYLA WINTERS: I want to close our series with what I think is the most remarkable mathematical fact about Islamic geometric art: the discovery, in the 1970s, that certain patterns from the Darb-i Imam shrine in Isfahan, dating from 1453, exhibit quasi-crystalline symmetry — specifically, the five-fold and ten-fold symmetry that Western mathematics proved impossible with periodic tiling until Penrose''s work in 1974. The pattern exists, in full mathematical correctness, five centuries before the mathematical framework that explains it was developed.

PROF. IBRAHIM HASSAN: The question this raises for me is not about priority. The question is: what does it mean that two completely independent investigative traditions — one mathematical, one spiritual-aesthetic — converge on the same structural relationships? Is this coincidence? Or are both correctly responding to structures genuinely present in reality?

SHEIKH OMAR AL-RASHID: The tradition would not be surprised by this. Ibn Arabi speaks of al-haqq al-makhluk bihi — the real through which creation occurs — as the divine self-disclosure in its aspect as the underlying pattern of all manifestation. The Sufi geometer in Isfahan and the mathematician working with group theory in Princeton are, from this perspective, both approaching the same reality from different directions. The fact that their approaches converge is not coincidence but confirmation.'
);

-- Practices profiles
INSERT INTO practices_profiles (slug, title, description, methodology, steps, practice_type, duration_minutes, difficulty_level, related_saints, themes, tags, featured) VALUES
(
  'dhikr-divine-remembrance',
  'Dhikr: The Practice of Divine Remembrance',
  'Dhikr — remembrance of the divine — is the axial practice of the Sufi path. Through rhythmic invocation of divine names, combined with breath and presence, the practitioner gradually realigns the heart from habitual forgetfulness toward sustained awareness. Classical texts describe dhikr as the polish that removes the rust of heedlessness from the mirror of the heart.',
  'Dhikr operates through the principle that the heart is transformed by what it repeatedly contemplates. The repeated invocation of a divine name is not mechanical repetition but a systematic discipline of attention: each repetition is an opportunity to renew presence and deepen awareness. Over time, practitioners describe a shift from voluntary to involuntary dhikr — a state in which the practice continues at a level beneath conscious intention.',
  '["Establish a clean, quiet space and a consistent time — ideally after fajr or before sleep", "Sit in a stable position, spine erect, hands resting on knees or in the lap", "Begin with three slow, conscious breaths, releasing the concerns of the day", "Recite Astaghfirullah 33 times to clear the field of distraction", "Take up the central invocation given by your teacher and recite with full attention for the appointed number", "Coordinate the invocation with the breath if your teacher has instructed this", "Close with three breaths of stillness, allowing the resonance to settle", "Maintain awareness of the quality of presence as you return to ordinary activity"]'::jsonb,
  'meditation',
  30,
  'beginner',
  '["Rumi", "Al-Ghazali", "Ibn Arabi", "Rabia al-Adawiyya"]'::jsonb,
  '["consciousness", "inner-development", "spiritual-practice"]'::jsonb,
  '["dhikr", "remembrance", "heart", "invocation", "breath"]'::jsonb,
  true
),
(
  'muraqaba-contemplative-vigilance',
  'Muraqaba: The Discipline of Contemplative Vigilance',
  'Muraqaba — watchful awareness or contemplative vigilance — is the practice of resting attention in sustained, non-grasping awareness of the divine presence. Where dhikr works through active invocation, muraqaba works through the progressive quieting of activity: the practitioner learns to hold awareness without content, remaining present without projecting or contracting.',
  'Muraqaba works by cultivating the capacity to remain present without the support of mental activity. Most human attention is relational — it functions by moving from object to object. Muraqaba trains the reverse: awareness that rests in its own nature without requiring an object. Classical teachers compare this to the quality of attention a sentinel maintains while watching: alert, open, unattached to any particular content, yet immediately responsive to whatever arises.',
  '["Muraqaba is typically taught by a qualified teacher after initial competence in dhikr has been established", "Begin as with dhikr: quiet space, stable posture, preliminary breaths", "Allow the stream of mental activity to be present without engagement", "Direct attention toward the awareness that perceives the stream of thought", "When attention is captured by a thought, gently disengage and return to witnessing awareness", "With practice, the gaps between thoughts lengthen and pure awareness becomes more accessible", "Extended sessions of 30-60 minutes are more productive than brief ones", "Regular consultation with a teacher is important to navigate experiences that arise"]'::jsonb,
  'meditation',
  45,
  'intermediate',
  '["Al-Ghazali", "Al-Qushayri", "Ibn Ata Allah al-Iskandari"]'::jsonb,
  '["consciousness", "inner-development", "epistemology"]'::jsonb,
  '["muraqaba", "contemplation", "vigilance", "presence", "awareness"]'::jsonb,
  true
),
(
  'tawba-return-and-renewal',
  'Tawba: The Station of Return and Moral Renewal',
  'Tawba — typically translated as repentance but more accurately understood as return — is the foundational station of the Sufi path. It is not a single act but a sustained orientation: the continuous return of attention, intention, and action toward alignment with the divine will. Classical texts describe tawba as the gate through which all other stations are entered.',
  'Tawba works through a structured three-part movement: recognition of misalignment (nadama), sincere intention to realign (azm), and active reorientation in thought, word, and deed (iqla). Unlike guilt, which tends toward paralysis, tawba is forward-oriented — its energy is the energy of return, not of self-condemnation.',
  '["Set aside time each evening for muhasaba — self-accounting — reviewing the day with honest attention", "Identify moments of misalignment: actions that caused harm, words spoken carelessly, self-serving intentions", "For each misalignment, make a sincere internal movement of return: acknowledge, release, and renew intention", "Where another person was involved, consider what practical amends are possible", "Recite Astaghfirullah 100 times with full awareness of its meaning", "Close with gratitude for the capacity to recognise misalignment — this capacity is itself a divine gift", "Do not carry the weight of the day into the following day — tawba includes release of guilt once sincere return has been made"]'::jsonb,
  'psychological_work',
  20,
  'beginner',
  '["Al-Ghazali", "Imam al-Nawawi", "Ibn Qayyim al-Jawziyya"]'::jsonb,
  '["inner-development", "ethics", "consciousness"]'::jsonb,
  '["tawba", "repentance", "return", "moral-renewal", "nafs"]'::jsonb,
  false
),
(
  'khidma-sacred-service',
  'Khidma: Service as Spiritual Technology',
  'Khidma — sacred service — is the practice of selfless service understood not as mere good works but as a systematic technology for ego-dissolution and the cultivation of compassion. The Sufi tradition teaches that the nafs is most effectively dissolved not through withdrawal from the world but through engaged, purposeful service conducted with the right internal orientation.',
  'Khidma works through the paradox of the ego: the self cannot dissolve itself through self-directed effort without creating a subtler ego — the ego of the spiritual achiever. Service to others, when conducted with the right internal conditions, creates a situation in which the self is genuinely required to subordinate its preferences to the needs of another.',
  '["Identify a form of service that genuinely stretches your comfort and requires real sacrifice", "Establish a regular commitment rather than sporadic acts — khidma requires sustained engagement", "Before each session, set a clear internal intention: this is for the divine and for the one served, not for my spiritual benefit", "During service, notice the ego''s reactions: desire for recognition, irritation with ingratitude, satisfaction of feeling virtuous", "Afterward, do not recount the service to others unless genuinely necessary", "Review your service practice periodically with your teacher or a trusted companion"]'::jsonb,
  'service',
  0,
  'intermediate',
  '["Rabia al-Adawiyya", "Al-Khidr", "Mevlana Jalaluddin Rumi"]'::jsonb,
  '["inner-development", "ethics", "applied-practice"]'::jsonb,
  '["khidma", "service", "selflessness", "compassion", "ego-dissolution"]'::jsonb,
  true
),
(
  'sohbet-sacred-companionship',
  'Sohbet: The Practice of Sacred Companionship',
  'Sohbet — sacred conversation or spiritual companionship — is the practice of intentional dialogue conducted in the presence of a teacher or among companions on the path. The tradition teaches that certain forms of understanding can only be transmitted through direct personal encounter — they cannot be reduced to text or technique.',
  'Sohbet operates through the principle the tradition calls baraka — grace or blessing — understood as the capacity for spiritual qualities to transmit from person to person through sincere, open presence. A gathering in which one or more participants are more advanced creates conditions in which their qualities become accessible to those who maintain the right internal posture: receptive, attentive, and free from the agenda of proving themselves.',
  '["Approach sohbet with the intention of learning, not of demonstrating knowledge", "Practice listening more than speaking — receptive attention is as important as what is said", "Allow silence — the pauses are often when transmission is most available", "If a question arises, hold it for a moment before asking", "After the gathering, take time in solitude to allow what was received to settle", "Maintain discretion about what occurs in sohbet", "Cultivate regular sohbet with companions on the path, not only with teachers"]'::jsonb,
  'relational',
  90,
  'intermediate',
  '["Mevlana Jalaluddin Rumi", "Shams-i-Tabrizi", "Baha-ud-Din Naqshband"]'::jsonb,
  '["inner-development", "consciousness", "community"]'::jsonb,
  '["sohbet", "companionship", "transmission", "baraka", "teacher"]'::jsonb,
  false
),
(
  'muhasaba-self-accounting',
  'Muhasaba: The Science of Self-Accounting',
  'Muhasaba — self-accounting or ethical self-examination — is the systematic practice of reviewing one''s inner states, motivations, and actions with the aim of identifying and correcting misalignments. Al-Harith al-Muhasibi described it as the science of making the interior correspond to the exterior.',
  'Muhasaba works by interrupting the ego''s habitual tendency toward self-justification. The ordinary mind minimises its failures, exaggerates its virtues, and explains away its misalignments. Muhasaba is a counter-practice: a deliberate, disciplined effort to see oneself clearly. Conducted regularly, it gradually erodes the structures of self-deception that are prerequisites for genuine spiritual development.',
  '["Establish a fixed time for daily muhasaba — the evening, before sleep, is traditional", "Begin with three breaths and the intention to see honestly, without self-protection", "Review the day in three domains: actions (what did I do?), words (what did I say?), intentions (what motivated me?)", "In the domain of intentions, be particularly precise about self-interest, desire for recognition, or fear", "For each misalignment, make tawba as described in the tawba practice guide", "Also review moments of alignment — gratitude for these is as important as acknowledgement of failures", "Make specific intentions for the following day based on what muhasaba has revealed", "If patterns recur, consider bringing them to a teacher or trusted companion"]'::jsonb,
  'psychological_work',
  20,
  'beginner',
  '["Al-Harith al-Muhasibi", "Al-Ghazali", "Ibn Ata Allah al-Iskandari"]'::jsonb,
  '["inner-development", "ethics", "psychology"]'::jsonb,
  '["muhasaba", "self-accounting", "introspection", "ethics", "character"]'::jsonb,
  false
);
