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
  { id: 'math-017', category: 'Percent', prompt: 'What is 25% of 200?', choices: ['25', '40', '50', '75'], answer: '50', explanation: '25% is one quarter, and 200 ÷ 4 = 50.', difficulty: 'easy', graphic: { type: 'emoji', value: '📊' } },
  { id: 'math-018', category: 'Mental Math', prompt: 'What is 6 × 9?', choices: ['45', '54', '56', '63'], answer: '54', explanation: '6 × 9 = 54.', difficulty: 'easy', graphic: { type: 'emoji', value: '✖️' } },
  { id: 'math-019', category: 'Mental Math', prompt: 'What is 100 − 37?', choices: ['53', '63', '67', '73'], answer: '63', explanation: '100 − 37 = 63.', difficulty: 'easy', graphic: { type: 'emoji', value: '➖' } },
  { id: 'math-020', category: 'Mental Math', prompt: 'What is 3 squared (3²)?', choices: ['6', '8', '9', '12'], answer: '9', explanation: '3² = 3 × 3 = 9.', difficulty: 'easy', graphic: { type: 'emoji', value: '🔢' } },
  { id: 'math-021', category: 'Rounding', prompt: 'Round 8.6 to the nearest whole number.', choices: ['7', '8', '9', '10'], answer: '9', explanation: '8.6 is closer to 9 than to 8.', difficulty: 'easy', graphic: { type: 'emoji', value: '📏' } },
  { id: 'math-022', category: 'Fractions', prompt: 'What is 1/2 + 1/4?', choices: ['1/3', '2/6', '3/4', '5/8'], answer: '3/4', explanation: '1/2 is 2/4, and 2/4 + 1/4 = 3/4.', difficulty: 'medium', graphic: { type: 'emoji', value: '🍕' } },
  { id: 'math-023', category: 'Time', prompt: 'A movie starts at 7:45 and runs 90 minutes. When does it end?', choices: ['8:45', '9:00', '9:15', '9:30'], answer: '9:15', explanation: '90 minutes is 1.5 hours; 7:45 + 1:30 = 9:15.', difficulty: 'medium', graphic: { type: 'emoji', value: '⏰' } },
  { id: 'math-024', category: 'Percent', prompt: 'What is 10% of 250?', choices: ['15', '20', '25', '30'], answer: '25', explanation: '10% means move the decimal one place: 250 → 25.', difficulty: 'easy', graphic: { type: 'emoji', value: '💵' } },
  { id: 'math-025', category: 'Compare', prompt: 'Which is largest?', choices: ['0.7', '3/4', '0.65'], answer: '3/4', explanation: '3/4 = 0.75, which beats 0.7 and 0.65.', difficulty: 'medium', graphic: { type: 'emoji', value: '⚖️' } },
  { id: 'math-026', category: 'Mental Math', prompt: 'What is double 24?', choices: ['42', '46', '48', '52'], answer: '48', explanation: '24 + 24 = 48.', difficulty: 'easy', graphic: { type: 'emoji', value: '✖️' } },
]

export const quickMathCards = rawQuickMathCards.map((card) => ({
  ...card,
  deckId: 'math',
  answerType: 'multiple-choice',
  confidence: 'high',
}))
