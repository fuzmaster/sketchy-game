import { foodCards } from './foodCards.js'
import { scamCards } from './scamCards.js'
import { quickMathCards } from './quickMath.js'
import { weirdFactsCards } from './weirdFacts.js'
import { animalFactsCards } from './animalFacts.js'
import { historyHitsCards } from './historyHits.js'
import { scienceSnacksCards } from './scienceSnacks.js'

export const TRIVIA_MODES = {
  food: {
    id: 'food',
    title: 'Fresh or Fake',
    shortTitle: 'Fresh or Fake',
    subtitle: 'Swipe through weird food facts before the kitchen timer runs out.',
    description: 'Weird food facts. Swipe Fresh if it’s true, Fake if it’s false.',
    takeaway: 'Food facts are weird. Look for precise wording and cooking-vs-botany clues.',
    icon: '🥑',
    answerType: 'binary',
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
    answerType: 'binary',
    cards: scamCards,
    labels: {
      right: 'Legit',
      left: 'Sketchy',
      rightValue: 'fresh',
      leftValue: 'fake',
      instruction: 'Swipe left for Sketchy. Swipe right for Legit.',
    },
  },
  math: {
    id: 'math',
    title: 'Quick Math',
    shortTitle: 'Quick Math',
    subtitle: 'Fast mental math. Tap the right answer before the timer runs out.',
    description: 'Reflex mental math. Tap the correct answer.',
    takeaway: 'Estimate first, then check. Round numbers and percentages are your friends.',
    icon: '🧮',
    answerType: 'multiple-choice',
    cards: quickMathCards,
    labels: {
      instruction: 'Tap the correct answer.',
    },
  },
  weird: {
    id: 'weird',
    title: 'Weird Facts',
    shortTitle: 'Weird Facts',
    subtitle: 'Strange-but-real trivia. Decide if each claim is true or no way.',
    description: 'Strange-but-real trivia. Swipe True or No Way.',
    takeaway: 'The wildest-sounding claims are often true. Watch for popular myths.',
    icon: '🤯',
    answerType: 'binary',
    cards: weirdFactsCards,
    labels: {
      right: 'True',
      left: 'No Way',
      rightValue: 'true',
      leftValue: 'false',
      instruction: 'Swipe left for No Way. Swipe right for True.',
    },
  },
  animal: {
    id: 'animal',
    title: 'Animal Facts',
    shortTitle: 'Animal Facts',
    subtitle: 'Wild animal claims. Decide if each one is for real or nope.',
    description: 'Wild animal claims. Swipe For Real or Nope.',
    takeaway: 'Animals are stranger than fiction — and plenty of “facts” are myths.',
    icon: '🦊',
    answerType: 'binary',
    cards: animalFactsCards,
    labels: {
      right: 'For Real',
      left: 'Nope',
      rightValue: 'true',
      leftValue: 'false',
      instruction: 'Swipe left for Nope. Swipe right for For Real.',
    },
  },
  history: {
    id: 'history',
    title: 'History Hits',
    shortTitle: 'History Hits',
    subtitle: 'Order the past. Tap which came first — or when it happened.',
    description: 'Which came first? Tap the answer.',
    takeaway: 'When in doubt, anchor to a date you know and reason out from there.',
    icon: '🏛️',
    answerType: 'multiple-choice',
    cards: historyHitsCards,
    labels: {
      instruction: 'Tap the correct answer.',
    },
  },
  science: {
    id: 'science',
    title: 'Science Snacks',
    shortTitle: 'Science Snacks',
    subtitle: 'Bite-size science. Decide if each claim is true or nope.',
    description: 'Bite-size science. Swipe True or Nope.',
    takeaway: 'Intuition misleads in science — check for the classic myths.',
    icon: '🔬',
    answerType: 'binary',
    cards: scienceSnacksCards,
    labels: {
      right: 'True',
      left: 'Nope',
      rightValue: 'true',
      leftValue: 'false',
      instruction: 'Swipe left for Nope. Swipe right for True.',
    },
  },
}

/** Decks shown as "Coming soon" — visible but not playable yet. */
export const COMING_SOON_DECKS = []

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
