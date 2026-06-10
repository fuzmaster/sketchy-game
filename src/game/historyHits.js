/* ============================================================
   Gut Check — History Hits deck (multiple-choice).
   "Which came first / when did it happen" style. Curated, paraphrased, sourced.
   answerType: 'multiple-choice' — `answer` must be one of `choices`.
   ============================================================ */

const WIKI = 'CC BY-SA 4.0'

const rawHistoryHitsCards = [
  { id: 'hist-001', category: 'Ancient', prompt: 'Which was built first?', choices: ['Great Pyramid of Giza', 'Roman Colosseum'], answer: 'Great Pyramid of Giza', explanation: 'The Great Pyramid (~2560 BC) predates the Colosseum (~80 AD) by over 2,000 years.', difficulty: 'easy', graphic: { type: 'emoji', value: '🏛️' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza', sourceLicense: WIKI },
  { id: 'hist-002', category: 'Inventions', prompt: 'Which was invented first?', choices: ['Printing press', 'Telescope'], answer: 'Printing press', explanation: 'Gutenberg’s press (~1440) came before the telescope (~1608).', difficulty: 'medium', graphic: { type: 'emoji', value: '🖨️' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Printing_press', sourceLicense: WIKI },
  { id: 'hist-003', category: 'Modern', prompt: 'In what century did the Titanic sink?', choices: ['19th', '20th', '21st'], answer: '20th', explanation: 'The Titanic sank in 1912, in the 20th century.', difficulty: 'easy', graphic: { type: 'emoji', value: '🚢' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Titanic', sourceLicense: WIKI },
  { id: 'hist-004', category: 'Revolutions', prompt: 'Which revolution happened first?', choices: ['American Revolution', 'French Revolution'], answer: 'American Revolution', explanation: 'The American Revolution (1775) preceded the French Revolution (1789).', difficulty: 'medium', graphic: { type: 'emoji', value: '🗽' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/American_Revolution', sourceLicense: WIKI },
  { id: 'hist-005', category: 'Modern', prompt: 'Which happened first?', choices: ['First Moon landing', 'Fall of the Berlin Wall'], answer: 'First Moon landing', explanation: 'Apollo 11 landed in 1969; the Berlin Wall fell in 1989.', difficulty: 'easy', graphic: { type: 'emoji', value: '🌕' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Apollo_11', sourceLicense: WIKI },
  { id: 'hist-006', category: 'Institutions', prompt: 'Which is older?', choices: ['University of Oxford', 'The United States'], answer: 'University of Oxford', explanation: 'Teaching at Oxford dates to ~1096, long before the U.S. was founded in 1776.', difficulty: 'medium', graphic: { type: 'emoji', value: '🎓' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/University_of_Oxford', sourceLicense: WIKI },
  { id: 'hist-007', category: 'Modern', prompt: 'When did World War II end?', choices: ['1918', '1945', '1962'], answer: '1945', explanation: 'World War II ended in 1945; 1918 was the end of World War I.', difficulty: 'easy', graphic: { type: 'emoji', value: '🕊️' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/World_War_II', sourceLicense: WIKI },
  { id: 'hist-008', category: 'Inventions', prompt: 'Which came first?', choices: ['Telephone', 'Practical light bulb'], answer: 'Telephone', explanation: 'Bell patented the telephone in 1876; Edison’s practical bulb followed in 1879.', difficulty: 'hard', graphic: { type: 'emoji', value: '☎️' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Telephone', sourceLicense: WIKI },
  { id: 'hist-009', category: 'Ancient', prompt: 'Which ancient wonder still stands today?', choices: ['Great Pyramid of Giza', 'Hanging Gardens of Babylon', 'Colossus of Rhodes'], answer: 'Great Pyramid of Giza', explanation: 'The Great Pyramid is the only ancient wonder still largely intact.', difficulty: 'medium', graphic: { type: 'emoji', value: '🗿' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Seven_Wonders_of_the_Ancient_World', sourceLicense: WIKI },
  { id: 'hist-010', category: 'Leaders', prompt: 'Who was U.S. president first?', choices: ['George Washington', 'Abraham Lincoln'], answer: 'George Washington', explanation: 'Washington took office in 1789; Lincoln in 1861.', difficulty: 'easy', graphic: { type: 'emoji', value: '🎩' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/George_Washington', sourceLicense: WIKI },
  { id: 'hist-011', category: 'Modern', prompt: 'When did the first iPhone launch?', choices: ['2003', '2007', '2011'], answer: '2007', explanation: 'Apple released the first iPhone in 2007.', difficulty: 'medium', graphic: { type: 'emoji', value: '📱' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/IPhone_(1st_generation)', sourceLicense: WIKI },
  { id: 'hist-012', category: 'Landmarks', prompt: 'Which was completed first?', choices: ['Statue of Liberty', 'Eiffel Tower'], answer: 'Statue of Liberty', explanation: 'The Statue of Liberty was dedicated in 1886; the Eiffel Tower opened in 1889.', difficulty: 'hard', graphic: { type: 'emoji', value: '🗽' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Statue_of_Liberty', sourceLicense: WIKI },
  { id: 'hist-013', category: 'Empires', prompt: 'Which empire was earliest?', choices: ['Roman Empire', 'Ottoman Empire', 'British Empire'], answer: 'Roman Empire', explanation: 'The Roman Empire began around 27 BC, long before the Ottoman or British empires.', difficulty: 'medium', graphic: { type: 'emoji', value: '🏺' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Roman_Empire', sourceLicense: WIKI },
  { id: 'hist-014', category: 'Leaders', prompt: 'Who lived earliest?', choices: ['Cleopatra', 'Genghis Khan', 'Napoleon'], answer: 'Cleopatra', explanation: 'Cleopatra (69–30 BC) lived long before Genghis Khan (~1162) and Napoleon (1769).', difficulty: 'medium', graphic: { type: 'emoji', value: '👑' }, sourceName: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Cleopatra', sourceLicense: WIKI },
]

export const historyHitsCards = rawHistoryHitsCards.map((card) => ({
  ...card,
  deckId: 'history',
  answerType: 'multiple-choice',
  confidence: 'high',
  difficulty: card.difficulty || 'medium',
}))
