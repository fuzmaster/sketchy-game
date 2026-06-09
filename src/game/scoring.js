export function scoreForCorrect(timeRemainingSeconds, streak) {
  return 100 + Math.floor(timeRemainingSeconds * 5) + streak * 12
}
