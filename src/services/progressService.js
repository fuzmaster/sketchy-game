/* ============================================================
   Gut Check — local progress service.
   Records finished runs into the active profile and unlocks achievements.
   Account-ready interface; default export is the LOCAL adapter. A remote
   adapter must recompute/validate progress server-side (see PRE_SHIP gate).
   ============================================================ */
import { authService } from './authService.js'
import { evaluateAchievements } from '../game/achievements.js'
import { MAX_HEARTS } from '../game/rules.js'

const QUICK_ANSWER_SECONDS = 4 // answered with at least this many seconds left

function favoriteDeck(deckPlays) {
  let best = null
  let bestCount = -1
  for (const [deckId, count] of Object.entries(deckPlays || {})) {
    if (count > bestCount) {
      best = deckId
      bestCount = count
    }
  }
  return best
}

export const localProgressService = {
  isRemote: false,

  /**
   * @param {string} profileId
   * @param {object} run { deckId, score, stats:{correct,wrong,missed,bestStreak},
   *   results, heartsRemaining, totalCards }
   * @returns {{ profile: object, newAchievements: object[] }}
   */
  recordRun(profileId, run) {
    const profiles = authService.listProfiles()
    const current = profiles.find((p) => p.id === profileId)
    if (!current) return { profile: null, newAchievements: [] }

    const { deckId, score, stats, results = [] } = run
    const answered = stats.correct + stats.wrong

    const bestScoreByDeck = { ...current.bestScoreByDeck }
    bestScoreByDeck[deckId] = Math.max(bestScoreByDeck[deckId] || 0, score)

    const bestStreakByDeck = { ...current.bestStreakByDeck }
    bestStreakByDeck[deckId] = Math.max(bestStreakByDeck[deckId] || 0, stats.bestStreak)

    const accuracyByDeck = { ...current.accuracyByDeck }
    const priorAcc = accuracyByDeck[deckId] || { correct: 0, answered: 0 }
    accuracyByDeck[deckId] = { correct: priorAcc.correct + stats.correct, answered: priorAcc.answered + answered }

    const deckPlays = { ...current.deckPlays }
    deckPlays[deckId] = (deckPlays[deckId] || 0) + 1

    const mathInRun = results.filter(
      (r) => r.resultType !== 'missed' && (r.card?.answerType === 'math-input' || r.deckId === 'math'),
    ).length

    const updated = {
      ...current,
      totalGames: (current.totalGames || 0) + 1,
      totalCorrect: (current.totalCorrect || 0) + stats.correct,
      totalWrong: (current.totalWrong || 0) + stats.wrong,
      totalMissed: (current.totalMissed || 0) + stats.missed,
      totalScore: (current.totalScore || 0) + score,
      bestScoreByDeck,
      bestStreakByDeck,
      accuracyByDeck,
      deckPlays,
      mathAnswered: (current.mathAnswered || 0) + mathInRun,
      favoriteDeck: favoriteDeck(deckPlays),
      updatedAt: Date.now(),
    }

    const heartsRemaining = run.heartsRemaining ?? 0
    const quickAnswers = results.filter(
      (r) => r.resultType === 'correct' && (r.timeRemaining || 0) >= QUICK_ANSWER_SECONDS,
    ).length
    const ctx = {
      bestStreakInRun: stats.bestStreak,
      accuracy: answered ? Math.round((stats.correct / answered) * 100) : 0,
      answered,
      missedInRun: stats.missed,
      completedDeck: heartsRemaining > 0, // survived the deck rather than running out of hearts
      heartsLost: MAX_HEARTS - heartsRemaining,
      quickAnswers,
      reviewOpened: false,
    }

    const newAchievements = evaluateAchievements(updated, ctx)
    if (newAchievements.length) {
      const at = Date.now()
      updated.achievements = { ...updated.achievements }
      for (const a of newAchievements) updated.achievements[a.id] = at
    }

    authService.saveProfiles(profiles.map((p) => (p.id === profileId ? updated : p)))
    return { profile: updated, newAchievements }
  },

  /** Unlock the "open the review screen" achievement when the player reviews. */
  markReviewOpened(profileId) {
    const profiles = authService.listProfiles()
    const current = profiles.find((p) => p.id === profileId)
    if (!current) return { profile: null, newAchievements: [] }
    const newAchievements = evaluateAchievements(current, { reviewOpened: true })
    if (!newAchievements.length) return { profile: current, newAchievements: [] }
    const at = Date.now()
    const updated = { ...current, achievements: { ...current.achievements } }
    for (const a of newAchievements) updated.achievements[a.id] = at
    updated.updatedAt = at
    authService.saveProfiles(profiles.map((p) => (p.id === profileId ? updated : p)))
    return { profile: updated, newAchievements }
  },
}

export const progressService = localProgressService
export default progressService
