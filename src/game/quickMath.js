/* ============================================================
   Gut Check — Quick Math deck (multiple-choice, reflex-style).
   Fast and fair: mental math, estimation, money, time, fractions, patterns.
   answerType: 'multiple-choice' — `answer` must be one of `choices`.
   ============================================================ */

const rawQuickMathCards = [
  { id: 'math-001', category: 'Percent', prompt: 'What is 15% of 80?', choices: ['8', '10', '12', '15'], answer: '12', explanation: '10% of 80 is 8, and half of that (5%) is 4. 8 + 4 = 12.', difficulty: 'easy', graphic: { type: 'emoji', value: '📊' } },
  { id: 'math-002', category: 'Logic', prompt: 'You have 3 hearts. You lose 1, then gain 2. How many?', choices: ['3', '4', '5', '6'], answer: '4', explanation: '3 − 1 = 2, then 2 + 2 = 4.', difficulty: 'easy', graphic: { type: 'emoji', value: '❤️' } },
  { id: 'math-003', category: 'Fractions', prompt: 'Which is bigger: 3/4 or 2/3?', choices: ['3/4', '2/3'], answer: '3/4', explanation: '3/4 = 0.75 and 2/3 ≈ 0.67, so 3/4 is bigger.', difficulty: 'easy', graphic: { type: 'emoji', value: '🍕' } },
  { id: 'math-004', category: 'Mental Math', prompt: 'What is 7 × 8?', choices: ['48', '54', '56', '63'], answer: '56', explanation: '7 × 8 = 56.', difficulty: 'easy', graphic: { type: 'emoji', value: '✖️' } },
  { id: 'math-005', category: 'Order of Ops', prompt: 'What is 9 + 6 × 2?', choices: ['30', '24', '21', '18'], answer: '21', explanation: 'Multiply first: 6 × 2 = 12, then 9 + 12 = 21.', difficulty: 'medium', graphic: { type: 'emoji', value: '🧮' } },
  { id: 'math-006', category: 'Money', prompt: "What's a 20% tip on a $50 bill?", choices: ['$5', '$8', '$10', '$12'], answer: '$10', explanation: '10% of $50 is $5, so 20% is $10.', difficulty: 'easy', graphic: { type: 'emoji', value: '💵' } },
  { id: 'math-007', category: 'Time', prompt: 'How many minutes are in 2.5 hours?', choices: ['120', '140', '150', '210'], answer: '150', explanation: '2 hours = 120 minutes, plus 30 = 150.', difficulty: 'easy', graphic: { type: 'emoji', value: '⏰' } },
  { id: 'math-008', category: 'Patterns', prompt: 'Next in the sequence: 2, 4, 8, 16, ?', choices: ['20', '24', '30', '32'], answer: '32', explanation: 'Each number doubles, so 16 × 2 = 32.', difficulty: 'medium', graphic: { type: 'emoji', value: '🔢' } },
  { id: 'math-009', category: 'Money', prompt: 'What is $20.00 − $13.50?', choices: ['$5.50', '$6.00', '$6.50', '$7.50'], answer: '$6.50', explanation: '$20.00 − $13.50 = $6.50.', difficulty: 'easy', graphic: { type: 'emoji', value: '🪙' } },
  { id: 'math-010', category: 'Estimation', prompt: 'Roughly, what is 49 × 21?', choices: ['~900', '~1000', '~1200', '~1500'], answer: '~1000', explanation: '≈ 50 × 20 = 1000 (actual 1029).', difficulty: 'medium', graphic: { type: 'emoji', value: '🎯' } },
  { id: 'math-011', category: 'Fractions', prompt: 'What is 3/4 as a percent?', choices: ['60%', '70%', '75%', '80%'], answer: '75%', explanation: '3 ÷ 4 = 0.75 = 75%.', difficulty: 'easy', graphic: { type: 'emoji', value: '🍰' } },
  { id: 'math-012', category: 'Rounding', prompt: 'Round 47 to the nearest 10.', choices: ['40', '45', '50', '60'], answer: '50', explanation: '47 is closer to 50 than to 40.', difficulty: 'easy', graphic: { type: 'emoji', value: '📏' } },
  { id: 'math-013', category: 'Compare', prompt: 'Which is largest?', choices: ['0.5', '1/3', '0.45'], answer: '0.5', explanation: '0.5 > 0.45 > 1/3 (≈ 0.33).', difficulty: 'medium', graphic: { type: 'emoji', value: '⚖️' } },
  { id: 'math-014', category: 'Mental Math', prompt: 'What is 12 × 5?', choices: ['50', '55', '60', '65'], answer: '60', explanation: '12 × 5 = 60.', difficulty: 'easy', graphic: { type: 'emoji', value: '✖️' } },
  { id: 'math-015', category: 'Fractions', prompt: "You've answered 3 of 12 cards. What fraction is left?", choices: ['1/4', '1/2', '2/3', '3/4'], answer: '3/4', explanation: '9 of 12 remain, and 9/12 = 3/4.', difficulty: 'medium', graphic: { type: 'emoji', value: '📚' } },
  { id: 'math-016', category: 'Percent', prompt: 'A $40 jacket is 25% off. What do you pay?', choices: ['$25', '$28', '$30', '$32'], answer: '$30', explanation: '25% of $40 is $10 off, so you pay $30.', difficulty: 'medium', graphic: { type: 'emoji', value: '🧥' } },
]

export const quickMathCards = rawQuickMathCards.map((card) => ({
  ...card,
  deckId: 'math',
  answerType: 'multiple-choice',
  confidence: 'high',
}))
