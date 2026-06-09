import { foodCards } from './foodCards.js'
import { scamCards } from './scamCards.js'

export const TRIVIA_MODES = {
  food: {
    id: 'food',
    title: 'Fresh or Fake',
    shortTitle: 'Fresh or Fake',
    subtitle: 'Swipe through weird food facts before the kitchen timer runs out.',
    description: 'Weird food facts. Swipe Fresh if it’s true, Fake if it’s false.',
    takeaway: 'Food facts are weird. Look for precise wording and cooking-vs-botany clues.',
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
    description: 'Real-world sketchy messages. Swipe Sketchy or Legit.',
    takeaway: 'Watch for urgency, payment pressure, password/code requests, and strange links.',
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
  normal: {
    id: 'normal',
    label: 'Normal',
    description: 'Balanced timer for quick rounds.',
  },
  hard: {
    id: 'hard',
    label: 'Hard',
    description: 'Faster timer for sharper runs.',
  },
}
