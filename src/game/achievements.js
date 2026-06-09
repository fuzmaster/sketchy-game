/* ============================================================
   Gut Check — local achievements.
   Each definition has a `check(ctx)` predicate. The progress service builds
   `ctx` from a finished run + the updated profile and unlocks any that newly
   pass. Local-only today; the same definitions can drive server achievements
   later.
   ============================================================ */

export const ACHIEVEMENTS = [
  { id: 'first-gut-check', name: 'First Gut Check', description: 'Finish your first round.', icon: '🎯', rarity: 'common', check: (c) => c.profile.totalGames >= 1 },
  { id: 'hot-streak', name: 'Hot Streak', description: 'Hit a 5 streak.', icon: '🔥', rarity: 'common', check: (c) => c.bestStreakInRun >= 5 },
  { id: 'locked-in', name: 'Locked In', description: 'Hit an 8 streak.', icon: '🔒', rarity: 'rare', check: (c) => c.bestStreakInRun >= 8 },
  { id: 'gut-check-mode', name: 'Gut Check Mode', description: 'Hit a 10 streak.', icon: '⚡', rarity: 'rare', check: (c) => c.bestStreakInRun >= 10 },
  { id: 'untouchable', name: 'Untouchable', description: 'Hit a 15 streak.', icon: '🛡️', rarity: 'epic', check: (c) => c.bestStreakInRun >= 15 },
  { id: 'food-brain', name: 'Food Brain', description: 'Play Fresh or Fake 5 times.', icon: '🥑', rarity: 'common', deckId: 'food', check: (c) => (c.profile.deckPlays?.food || 0) >= 5 },
  { id: 'scam-shield', name: 'Scam Shield', description: 'Play Scam Spotter 5 times.', icon: '🕵️', rarity: 'common', deckId: 'scam', check: (c) => (c.profile.deckPlays?.scam || 0) >= 5 },
  { id: 'math-snack', name: 'Math Snack', description: 'Answer 25 math cards.', icon: '🧮', rarity: 'rare', check: (c) => (c.profile.mathAnswered || 0) >= 25 },
  { id: 'perfect-run', name: 'Perfect Run', description: 'Finish a round with 100% accuracy.', icon: '💯', rarity: 'epic', check: (c) => c.answered > 0 && c.accuracy === 100 },
  { id: 'comeback-kid', name: 'Comeback Kid', description: 'Win a round after losing 2 hearts.', icon: '💪', rarity: 'rare', check: (c) => c.completedDeck && c.heartsLost >= 2 },
  { id: 'no-misses', name: 'No Misses', description: 'Finish with 0 missed cards.', icon: '✅', rarity: 'common', check: (c) => c.answered > 0 && c.missedInRun === 0 },
  { id: 'speedy-swipe', name: 'Speedy Swipe', description: 'Answer 10 cards quickly in one run.', icon: '💨', rarity: 'rare', check: (c) => c.quickAnswers >= 10 },
  { id: 'review-crew', name: 'Review Crew', description: 'Open the review screen after a run.', icon: '🔎', rarity: 'common', check: (c) => c.reviewOpened },
]

export function getAchievement(id) {
  return ACHIEVEMENTS.find((a) => a.id === id) || null
}

/** Return the definitions newly unlocked by this context (not already owned). */
export function evaluateAchievements(profile, ctx) {
  const owned = profile.achievements || {}
  return ACHIEVEMENTS.filter((a) => !owned[a.id]).filter((a) => {
    try {
      return a.check({ ...ctx, profile })
    } catch {
      return false
    }
  })
}
