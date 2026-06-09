export const MAX_HEARTS = 3
export const SWIPE_THRESHOLD = 92

export const FEEDBACK_HOLD = {
  correct: 1350,
  wrong: 1550,
  missed: 1450,
}

export const STORAGE_KEYS = {
  profiles: 'fresh-or-fake.profiles',
  activeProfile: 'fresh-or-fake.activeProfile',
  tutorialSeen: 'fresh-or-fake.tutorialSeen',
  seenCards: 'triviaSwipe_seenCards_v1',
}

export function cardDuration(index, difficulty = 'normal') {
  if (difficulty === 'easy') {
    if (index < 5) return 11000
    if (index < 15) return 9000
    return 8000
  }
  if (difficulty === 'hard') {
    if (index < 5) return 7000
    if (index < 15) return 6000
    return 5000
  }
  if (index < 5) return 9000
  if (index < 15) return 7000
  return 6000
}
