export function validateDeck(deck, { deckId, validAnswers = ['fresh', 'fake'] } = {}) {
  const errors = []
  const ids = new Set()

  deck.forEach((card, index) => {
    const label = card.id || `${deckId || 'deck'}[${index}]`
    if (!card.id) errors.push(`${label}: missing id`)
    if (card.id && ids.has(card.id)) errors.push(`${label}: duplicate id`)
    if (card.id) ids.add(card.id)
    if (!card.claim && !card.text) errors.push(`${label}: missing claim/text`)
    if (!validAnswers.includes(card.answer)) errors.push(`${label}: invalid answer`)
    if (!card.explanation || !card.explanation.trim()) errors.push(`${label}: missing explanation`)
    if (card.confidence !== 'high') errors.push(`${label}: launch cards must use confidence high`)
    if (!['easy', 'medium', 'hard'].includes(card.difficulty)) errors.push(`${label}: missing/invalid difficulty`)
  })

  if (errors.length) {
    throw new Error(`Deck validation failed for ${deckId || 'deck'}:\n${errors.join('\n')}`)
  }
}
