import { STORAGE_KEYS } from './rules.js'

function readSeen() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.seenCards) || '{}')
  } catch {
    return {}
  }
}

function writeSeen(seen) {
  localStorage.setItem(STORAGE_KEYS.seenCards, JSON.stringify(seen))
}

function shuffled(cards) {
  const copy = [...cards]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]]
  }
  return copy
}

export function chooseCardsAvoidingSeen(cards, { profileId, deckId }) {
  const seen = readSeen()
  const seenIds = new Set(seen[profileId]?.[deckId] || [])
  const unseen = cards.filter((card) => !seenIds.has(card.id))
  if (!unseen.length) return shuffled(cards)

  const recentlySeen = cards.filter((card) => seenIds.has(card.id))
  return [...shuffled(unseen), ...shuffled(recentlySeen)]
}

export function markCardsSeen(cards, { profileId, deckId, maxStored }) {
  const seen = readSeen()
  const profileSeen = seen[profileId] || {}
  const previous = profileSeen[deckId] || []
  const merged = [...previous, ...cards.map((card) => card.id)]
  profileSeen[deckId] = [...new Set(merged)].slice(-(maxStored || cards.length))
  seen[profileId] = profileSeen
  writeSeen(seen)
}
