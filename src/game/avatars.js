/* ============================================================
   Gut Check — built-in player avatars (sticker-style trivia faces).
   No uploads, no real people, no copyrighted characters.
   ============================================================ */

export const AVATARS = [
  { id: 'brainy-banana', name: 'Brainy Banana', icon: '🍌', color: '#FFD166', tagline: 'Knows too much about fruit.' },
  { id: 'detective-note', name: 'Detective Note', icon: '🗒️', color: '#00A79B', tagline: 'Reads between the lines.' },
  { id: 'pixel-tomato', name: 'Pixel Tomato', icon: '🍅', color: '#FF4D2D', tagline: 'Fruit? Vegetable? Yes.' },
  { id: 'quiz-goblin', name: 'Quiz Goblin', icon: '👺', color: '#00A878', tagline: 'Hoards trivia, not gold.' },
  { id: 'rocket-brain', name: 'Rocket Brain', icon: '🚀', color: '#5b6bff', tagline: 'Answers at escape velocity.' },
  { id: 'suspicious-pigeon', name: 'Suspicious Pigeon', icon: '🐦', color: '#7c8a99', tagline: 'Trusts no breadcrumb.' },
  { id: 'taco-thinker', name: 'Taco Thinker', icon: '🌮', color: '#e8a33d', tagline: 'Ponders, then snacks.' },
  { id: 'professor-pickle', name: 'Professor Pickle', icon: '🥒', color: '#3fa34d', tagline: 'Tenured in brine studies.' },
  { id: 'panic-calculator', name: 'Panic Calculator', icon: '🧮', color: '#ff7a18', tagline: 'Math, but make it adrenaline.' },
  { id: 'fact-fox', name: 'Fact Fox', icon: '🦊', color: '#ff8c42', tagline: 'Quick, clever, mostly right.' },
  { id: 'scam-shark', name: 'Scam Shark', icon: '🦈', color: '#2c8c99', tagline: 'Smells a phishing link a mile off.' },
  { id: 'history-ghost', name: 'History Ghost', icon: '👻', color: '#b8c2cc', tagline: 'Was there. Remembers everything.' },
]

export const DEFAULT_AVATAR_ID = AVATARS[0].id

export function getAvatar(id) {
  return AVATARS.find((avatar) => avatar.id === id) || AVATARS[0]
}
