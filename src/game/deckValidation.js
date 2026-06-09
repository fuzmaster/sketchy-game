export function validateDeck(deck, { deckId, validAnswers } = {}) {
  const errors = []
  const ids = new Set()

  deck.forEach((card, index) => {
    const label = card.id || `${deckId || 'deck'}[${index}]`
    if (!card.id) errors.push(`${label}: missing id`)
    if (card.id && ids.has(card.id)) errors.push(`${label}: duplicate id`)
    if (card.id) ids.add(card.id)

    if (!card.claim && !card.text && !card.prompt) errors.push(`${label}: missing claim/text/prompt`)
    if (!card.explanation || !card.explanation.trim()) errors.push(`${label}: missing explanation`)
    if (card.confidence !== 'high') errors.push(`${label}: launch cards must use confidence high`)
    if (!['easy', 'medium', 'hard'].includes(card.difficulty)) errors.push(`${label}: missing/invalid difficulty`)

    if (card.answerType === 'multiple-choice') {
      if (!Array.isArray(card.choices) || card.choices.length < 2) {
        errors.push(`${label}: multiple-choice card needs at least 2 choices`)
      } else if (!card.choices.includes(card.answer)) {
        errors.push(`${label}: answer is not one of the choices`)
      }
    } else {
      // binary: answer must be one of the deck's two swipe values (when known)
      const allowed = validAnswers || ['fresh', 'fake']
      if (!allowed.includes(card.answer)) errors.push(`${label}: invalid answer "${card.answer}"`)
    }
  })

  if (errors.length) {
    throw new Error(`Deck validation failed for ${deckId || 'deck'}:\n${errors.join('\n')}`)
  }
}
