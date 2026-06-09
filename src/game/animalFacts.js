/* ============================================================
   Gut Check — Animal Facts deck (binary: For Real / Nope).
   Curated and paraphrased in our own words, each factual card cites a real
   source. No medical/health claims. Wikipedia text is CC BY-SA; facts here are
   short paraphrases, not copied passages.
   answer: 'true' (real) | 'false' (myth / not true).
   ============================================================ */

const WIKI = 'CC BY-SA 4.0'

const rawAnimalFactsCards = [
  { id: 'animal-001', category: 'Mammals', claim: 'Sea otters hold paws while sleeping so they don’t drift apart.', highlight: 'hold paws while sleeping', answer: 'true', difficulty: 'easy', explanation: 'They raft together and sometimes hold paws to keep the group from floating away.', graphic: { type: 'emoji', value: '🦦' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Sea_otter', sourceLicense: WIKI },
  { id: 'animal-002', category: 'Birds', claim: 'A group of crows is called a murder.', highlight: 'a murder', answer: 'true', difficulty: 'easy', explanation: '“A murder of crows” is a traditional collective noun for the birds.', graphic: { type: 'emoji', value: '🐦‍⬛' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Crow', sourceLicense: WIKI },
  { id: 'animal-003', category: 'Ocean', claim: 'Octopuses have blue blood.', highlight: 'blue blood', answer: 'true', difficulty: 'medium', explanation: 'Their blood uses copper-based hemocyanin to carry oxygen, which looks blue.', graphic: { type: 'emoji', value: '🐙' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Hemocyanin', sourceLicense: WIKI },
  { id: 'animal-004', category: 'Tiny Life', claim: 'Tardigrades have survived exposure to the vacuum of space.', highlight: 'vacuum of space', answer: 'true', difficulty: 'hard', explanation: 'In a 2007 experiment, some tardigrades survived direct exposure to space.', graphic: { type: 'emoji', value: '🧫' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Tardigrade', sourceLicense: WIKI },
  { id: 'animal-005', category: 'Mammals', claim: 'Cats can’t taste sweetness.', highlight: 'taste sweetness', answer: 'true', difficulty: 'medium', explanation: 'Cats lack a working sweet taste receptor, so sugar doesn’t register.', graphic: { type: 'emoji', value: '🐈' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Cat', sourceLicense: WIKI },
  { id: 'animal-006', category: 'Insects', claim: 'Honeybees can be trained to recognize human faces.', highlight: 'recognize human faces', answer: 'true', difficulty: 'hard', explanation: 'Studies show bees can learn to tell apart human face-like patterns.', graphic: { type: 'emoji', value: '🐝' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Bee_learning_and_communication', sourceLicense: WIKI },
  { id: 'animal-007', category: 'Birds', claim: 'Gentoo penguins court a mate by offering a pebble.', highlight: 'offering a pebble', answer: 'true', difficulty: 'easy', explanation: 'Gentoo penguins present pebbles, which are prized for building nests.', graphic: { type: 'emoji', value: '🐧' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Gentoo_penguin', sourceLicense: WIKI },
  { id: 'animal-008', category: 'Birds', claim: 'An ostrich’s eye is bigger than its brain.', highlight: 'bigger than its brain', answer: 'true', difficulty: 'medium', explanation: 'Each ostrich eye is larger than its brain — among the biggest eyes of any land animal.', graphic: { type: 'emoji', value: '🦩' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Ostrich', sourceLicense: WIKI },

  { id: 'animal-009', category: 'Birds', claim: 'Flamingos are born bright pink.', highlight: 'born bright pink', answer: 'false', difficulty: 'easy', explanation: 'They hatch grey; the pink comes later from pigments in their food.', graphic: { type: 'emoji', value: '🦩' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Flamingo', sourceLicense: WIKI },
  { id: 'animal-010', category: 'Mammals', claim: 'Camels store water in their humps.', highlight: 'store water in their humps', answer: 'false', difficulty: 'easy', explanation: 'Humps store fat, not water — the fat can be used for energy when food is scarce.', graphic: { type: 'emoji', value: '🐪' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Camel', sourceLicense: WIKI },
  { id: 'animal-011', category: 'Mammals', claim: 'Bulls charge because they hate the color red.', highlight: 'hate the color red', answer: 'false', difficulty: 'medium', explanation: 'Cattle are red-green colorblind; it’s the movement of the cape that provokes them.', graphic: { type: 'emoji', value: '🐂' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Cattle', sourceLicense: WIKI },
  { id: 'animal-012', category: 'Mammals', claim: 'Elephants are terrified of mice.', highlight: 'terrified of mice', answer: 'false', difficulty: 'easy', explanation: 'A popular myth — there’s no good evidence elephants are scared of mice.', graphic: { type: 'emoji', value: '🐘' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Elephant', sourceLicense: WIKI },
  { id: 'animal-013', category: 'Ocean', claim: 'Starfish have a brain.', highlight: 'have a brain', answer: 'false', difficulty: 'medium', explanation: 'Starfish have no brain — they use a decentralized nerve net instead.', graphic: { type: 'emoji', value: '⭐' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Starfish', sourceLicense: WIKI },
  { id: 'animal-014', category: 'Birds', claim: 'Touching a baby bird makes its mother abandon it.', highlight: 'abandon it', answer: 'false', difficulty: 'medium', explanation: 'A myth — most birds have a weak sense of smell and won’t reject a touched chick.', graphic: { type: 'emoji', value: '🐣' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Fledge', sourceLicense: WIKI },
  { id: 'animal-015', category: 'Mammals', claim: 'Mice love cheese more than any other food.', highlight: 'more than any other food', answer: 'false', difficulty: 'easy', explanation: 'Another myth — mice generally prefer grains and sweet foods over cheese.', graphic: { type: 'emoji', value: '🐭' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/House_mouse', sourceLicense: WIKI },
]

export const animalFactsCards = rawAnimalFactsCards.map((card) => ({
  ...card,
  deckId: 'animal',
  answerType: 'binary',
  confidence: 'high',
  difficulty: card.difficulty || 'medium',
}))
