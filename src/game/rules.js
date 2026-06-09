/* ============================================================
   SKETCHY!  —  game rules: deck, pacing, scoring, grading
   ============================================================ */
import { CARDS } from './cards.js'

/** Starting lives. */
export const MAX_LIVES = 3

/** Default per-card time (ms) — also the initial value for the time ref. */
export const CARD_TIME = 9000

/** Pixels of horizontal drag required to commit a throw. */
export const SWIPE_THRESHOLD = 92

/** How long the feedback overlay holds before the next card, by outcome (ms). */
export const FEEDBACK_HOLD = {
  correct: 1450,
  wrong: 1750,
  slow: 1650,
}

/** localStorage keys. */
export const STORAGE_KEYS = {
  best: 'sketchy.best',
  tutorialSeen: 'sketchy.tut',
}

/**
 * Speed curve — roomy early, brisk later, never a bomb-timer.
 * 9s for the first 5 cards, 7s through card 12, 6s after.
 */
export function cardDuration(index) {
  return index < 5 ? 9000 : index < 12 ? 7000 : 6000
}

/** Fisher–Yates shuffle into a fresh deck. */
export function buildDeck() {
  const deck = CARDS.slice()
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

/** Time bonus for a correct answer (0–60), scaled by how much time was left. */
export function timeBonus(remainingMs, durationMs) {
  return Math.round((remainingMs / durationMs) * 60)
}

/** Points for a correct answer: base + streak reward + time bonus. */
export function scoreForCorrect(nextStreak, bonus) {
  return 100 + nextStreak * 12 + bonus
}

/** Letter grade from accuracy percentage. */
export function gradeFor(accuracy) {
  if (accuracy >= 90) return 'A'
  if (accuracy >= 75) return 'B'
  if (accuracy >= 60) return 'C'
  if (accuracy >= 40) return 'D'
  return 'F'
}
