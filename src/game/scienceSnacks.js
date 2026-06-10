/* ============================================================
   Gut Check — Science Snacks deck (binary: True / Nope).
   Bite-size science, curated and paraphrased with real sources. No medical or
   health claims. Wikipedia text is CC BY-SA; these are short paraphrases.
   answer: 'true' (real) | 'false' (myth / not true).
   ============================================================ */

const WIKI = 'CC BY-SA 4.0'

const rawScienceSnacksCards = [
  { id: 'sci-001', category: 'Space', claim: 'Sound cannot travel through the vacuum of space.', highlight: 'cannot travel', answer: 'true', difficulty: 'easy', explanation: 'Sound needs a medium to travel through; space is nearly empty, so it can’t carry sound.', graphic: { type: 'emoji', value: '🔇' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Outer_space', sourceLicense: WIKI },
  { id: 'sci-002', category: 'Chemistry', claim: 'Diamond and graphite are both made of pure carbon.', highlight: 'pure carbon', answer: 'true', difficulty: 'medium', explanation: 'Same element, different arrangement of atoms — that’s why their properties differ so much.', graphic: { type: 'emoji', value: '💎' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Carbon', sourceLicense: WIKI },
  { id: 'sci-003', category: 'Physics', claim: 'Most of an atom is empty space.', highlight: 'empty space', answer: 'true', difficulty: 'medium', explanation: 'The nucleus is tiny compared with the atom; the electrons occupy a vast space around it.', graphic: { type: 'emoji', value: '⚛️' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Atom', sourceLicense: WIKI },
  { id: 'sci-004', category: 'Space', claim: 'Sunlight takes about 8 minutes to reach Earth.', highlight: 'about 8 minutes', answer: 'true', difficulty: 'easy', explanation: 'Light covers the ~150 million km from the Sun to Earth in roughly 8 minutes 20 seconds.', graphic: { type: 'emoji', value: '☀️' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Sunlight', sourceLicense: WIKI },
  { id: 'sci-005', category: 'Space', claim: 'A teaspoon of neutron-star material would weigh billions of tons.', highlight: 'billions of tons', answer: 'true', difficulty: 'hard', explanation: 'Neutron stars are so dense that a sugar-cube-sized piece would weigh about as much as a mountain.', graphic: { type: 'emoji', value: '🌟' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Neutron_star', sourceLicense: WIKI },
  { id: 'sci-006', category: 'Physics', claim: 'Most metals expand when they are heated.', highlight: 'expand when they are heated', answer: 'true', difficulty: 'easy', explanation: 'Heat makes atoms vibrate more and take up slightly more room — that’s thermal expansion.', graphic: { type: 'emoji', value: '🌡️' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Thermal_expansion', sourceLicense: WIKI },
  { id: 'sci-007', category: 'Physics', claim: 'Helium makes your voice sound higher because sound travels faster through it.', highlight: 'travels faster through it', answer: 'true', difficulty: 'medium', explanation: 'Sound moves faster in helium, which shifts the resonances of your voice upward.', graphic: { type: 'emoji', value: '🎈' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Helium', sourceLicense: WIKI },

  { id: 'sci-008', category: 'Materials', claim: 'Old windows are thicker at the bottom because glass slowly flows like a liquid.', highlight: 'slowly flows like a liquid', answer: 'false', difficulty: 'medium', explanation: 'A myth — glass is an amorphous solid. Old panes vary because of how they were made.', graphic: { type: 'emoji', value: '🪟' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Glass', sourceLicense: WIKI },
  { id: 'sci-009', category: 'Space', claim: 'The far side of the Moon never gets any sunlight.', highlight: 'never gets any sunlight', answer: 'false', difficulty: 'medium', explanation: 'The “dark side” still gets sunlight — we just never see it from Earth.', graphic: { type: 'emoji', value: '🌙' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Far_side_of_the_Moon', sourceLicense: WIKI },
  { id: 'sci-010', category: 'Earth', claim: 'Seasons happen because Earth is closer to the Sun in summer.', highlight: 'closer to the Sun in summer', answer: 'false', difficulty: 'medium', explanation: 'Seasons come from Earth’s tilted axis, not its distance from the Sun.', graphic: { type: 'emoji', value: '🍂' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Season', sourceLicense: WIKI },
  { id: 'sci-011', category: 'Physics', claim: 'A penny dropped from a skyscraper could kill a pedestrian below.', highlight: 'could kill a pedestrian', answer: 'false', difficulty: 'medium', explanation: 'A penny’s terminal velocity is too low to be deadly — it would sting at most.', graphic: { type: 'emoji', value: '🪙' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Terminal_velocity', sourceLicense: WIKI },
  { id: 'sci-012', category: 'Biology', claim: 'Humans have exactly five senses.', highlight: 'exactly five senses', answer: 'false', difficulty: 'easy', explanation: 'We have more — including balance and the sense of where our body is (proprioception).', graphic: { type: 'emoji', value: '🖐️' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Sense', sourceLicense: WIKI },
  { id: 'sci-013', category: 'Chemistry', claim: 'Perfectly pure water is an excellent conductor of electricity.', highlight: 'excellent conductor', answer: 'false', difficulty: 'hard', explanation: 'Pure water barely conducts; it’s the dissolved minerals and salts that carry current.', graphic: { type: 'emoji', value: '💧' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Purified_water', sourceLicense: WIKI },
  { id: 'sci-014', category: 'Earth', claim: 'Mount Everest is the point on Earth closest to outer space.', highlight: 'closest to outer space', answer: 'false', difficulty: 'hard', explanation: 'Because Earth bulges at the equator, the summit of Chimborazo is actually closer to space.', graphic: { type: 'emoji', value: '🏔️' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Chimborazo', sourceLicense: WIKI },
]

export const scienceSnacksCards = rawScienceSnacksCards.map((card) => ({
  ...card,
  deckId: 'science',
  answerType: 'binary',
  confidence: 'high',
  difficulty: card.difficulty || 'medium',
}))
