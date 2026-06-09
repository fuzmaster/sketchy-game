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
}

export function cardDuration(index, difficulty = 'easy') {
  if (difficulty === 'hard') {
    if (index < 5) return 6500
    if (index < 15) return 5200
    return 4200
  }
  if (index < 5) return 9000
  if (index < 15) return 7000
  return 6000
}
