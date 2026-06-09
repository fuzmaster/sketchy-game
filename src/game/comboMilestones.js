export const comboMilestones = {
  3: 'Warming Up',
  5: 'Hot Streak',
  8: 'Locked In',
  10: 'Gut Check Mode',
  15: 'Untouchable',
}

export function comboLabelFor(streak) {
  return comboMilestones[streak] || null
}
