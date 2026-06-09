/* ============================================================
   Gut Check — Weird Facts deck (binary: True / No Way).
   Curated and paraphrased in our own words. Factual cards cite a real source.
   No medical/health claims. Wikipedia text is CC BY-SA; facts here are short
   paraphrases, not copied passages.
   answer: 'true' (real) | 'false' (myth / not true).
   ============================================================ */

const WIKI = 'CC BY-SA 4.0'

const rawWeirdFactsCards = [
  { id: 'weird-001', category: 'Animals', claim: 'Octopuses have three hearts.', highlight: 'three hearts', answer: 'true', explanation: 'Two hearts pump blood to the gills and one pumps it to the rest of the body.', graphic: { type: 'emoji', value: '🐙' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Octopus', sourceLicense: WIKI },
  { id: 'weird-002', category: 'Space', claim: 'A day on Venus is longer than its year.', highlight: 'longer than its year', answer: 'true', explanation: 'Venus rotates so slowly that one rotation takes longer than its orbit around the Sun.', graphic: { type: 'emoji', value: '🪐' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Venus', sourceLicense: WIKI },
  { id: 'weird-003', category: 'Animals', claim: 'Sharks have existed longer than trees.', highlight: 'longer than trees', answer: 'true', explanation: 'Sharks date back over 400 million years, predating the earliest trees.', graphic: { type: 'emoji', value: '🦈' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Shark', sourceLicense: WIKI },
  { id: 'weird-004', category: 'Animals', claim: 'Wombats produce cube-shaped droppings.', highlight: 'cube-shaped', answer: 'true', explanation: 'Their intestines shape the droppings into cubes, which resist rolling away.', graphic: { type: 'emoji', value: '🟫' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Wombat', sourceLicense: WIKI },
  { id: 'weird-005', category: 'History', claim: 'The shortest recorded war lasted under an hour.', highlight: 'under an hour', answer: 'true', explanation: 'The 1896 Anglo-Zanzibar War ended in roughly 38 minutes.', graphic: { type: 'emoji', value: '⚔️' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Anglo-Zanzibar_War', sourceLicense: WIKI },
  { id: 'weird-006', category: 'Inventions', claim: 'The Eiffel Tower can be slightly taller in summer.', highlight: 'taller in summer', answer: 'true', explanation: 'Heat expands the iron, so the tower grows a little when it warms up.', graphic: { type: 'emoji', value: '🗼' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Eiffel_Tower', sourceLicense: WIKI },
  { id: 'weird-007', category: 'Space', claim: 'A bolt of lightning is hotter than the surface of the Sun.', highlight: 'hotter than the surface of the Sun', answer: 'true', explanation: 'A lightning channel can reach about 30,000 K; the Sun’s surface is about 5,800 K.', graphic: { type: 'emoji', value: '🌩️' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Lightning', sourceLicense: WIKI },
  { id: 'weird-008', category: 'Language', claim: 'A group of flamingos is called a flamboyance.', highlight: 'a flamboyance', answer: 'true', explanation: '“A flamboyance” is a commonly used collective noun for flamingos.', graphic: { type: 'emoji', value: '🦩' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Flamingo', sourceLicense: WIKI },
  { id: 'weird-009', category: 'Animals', claim: 'Goldfish have only a three-second memory.', highlight: 'three-second memory', answer: 'false', explanation: 'It’s a myth — goldfish can remember things for weeks or months.', graphic: { type: 'emoji', value: '🐠' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Goldfish', sourceLicense: WIKI },
  { id: 'weird-010', category: 'Weather', claim: 'Lightning never strikes the same place twice.', highlight: 'never strikes the same place twice', answer: 'false', explanation: 'It often does — tall structures like skyscrapers get struck repeatedly.', graphic: { type: 'emoji', value: '⚡' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Lightning', sourceLicense: WIKI },
  { id: 'weird-011', category: 'Brains', claim: 'Humans only use 10% of their brains.', highlight: '10% of their brains', answer: 'false', explanation: 'A myth — brain scans show activity across virtually the whole brain.', graphic: { type: 'emoji', value: '🧠' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Ten_percent_of_the_brain_myth', sourceLicense: WIKI },
  { id: 'weird-012', category: 'Space', claim: 'The Great Wall of China is easily seen from space with the naked eye.', highlight: 'from space with the naked eye', answer: 'false', explanation: 'It’s very hard to see unaided from orbit; it’s narrow and blends with the land.', graphic: { type: 'emoji', value: '🧱' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Great_Wall_of_China', sourceLicense: WIKI },
  { id: 'weird-013', category: 'Animals', claim: 'Bats are blind.', highlight: 'blind', answer: 'false', explanation: 'All bats can see; many also use echolocation to navigate in the dark.', graphic: { type: 'emoji', value: '🦇' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Bat', sourceLicense: WIKI },
  { id: 'weird-014', category: 'Geography', claim: 'Measured from base to peak, Mount Everest is the tallest mountain on Earth.', highlight: 'base to peak', answer: 'false', explanation: 'Mauna Kea is taller base-to-peak; most of it is underwater. Everest is the highest above sea level.', graphic: { type: 'emoji', value: '🏔️' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Mauna_Kea', sourceLicense: WIKI },
]

export const weirdFactsCards = rawWeirdFactsCards.map((card) => ({
  ...card,
  deckId: 'weird',
  answerType: 'binary',
  confidence: 'high',
  difficulty: card.difficulty || 'medium',
}))
