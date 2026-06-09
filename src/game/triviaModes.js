import { foodCards } from './foodCards.js'
import { scamCards } from './scamCards.js'

export const TRIVIA_MODES = {
  food: {
    id: 'food',
    title: 'Fresh or Fake',
    shortTitle: 'Food Facts',
    subtitle: 'Swipe through weird food facts before the kitchen timer runs out.',
    icon: '🥑',
    cards: foodCards,
    labels: {
      right: 'Fresh',
      left: 'Fake',
      rightValue: 'fresh',
      leftValue: 'fake',
      instruction: 'Swipe left for Fake. Swipe right for Fresh.',
    },
  },
  scam: {
    id: 'scam',
    title: 'Scam Spotter',
    shortTitle: 'Scam Spotter',
    subtitle: 'Swipe through suspicious messages and spot the trick before it spots you.',
    icon: '🕵',
    cards: scamCards,
    labels: {
      right: 'Legit',
      left: 'Sketchy',
      rightValue: 'fresh',
      leftValue: 'fake',
      instruction: 'Swipe left for Sketchy. Swipe right for Legit.',
    },
  },
}

export const DIFFICULTIES = {
  easy: {
    id: 'easy',
    label: 'Easy',
    description: 'Roomier timer for casual play.',
  },
  hard: {
    id: 'hard',
    label: 'Hard',
    description: 'Faster timer for sharper runs.',
  },
}
