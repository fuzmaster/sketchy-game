import { Mascot } from './Mascot.jsx'

const MOOD_BY_RESULT = { correct: 'happy', wrong: 'oops', missed: 'sleepy' }

export function FeedbackOverlay({ result, labels }) {
  const card = result.card
  const isMultipleChoice = card.answerType === 'multiple-choice'
  const mood = MOOD_BY_RESULT[result.resultType] || 'idle'
  const binaryLabel = {
    [labels.rightValue]: labels.right,
    [labels.leftValue]: labels.left,
  }
  const correctText = isMultipleChoice ? result.correctAnswer : binaryLabel[result.correctAnswer]
  const title = result.resultType === 'missed' ? 'Too slow!' : result.wasCorrect ? 'Nice!' : 'Oof, not quite.'

  return (
    <div className="feedback-layer" aria-live="polite">
      <div className={`feedback-card ${result.resultType}`}>
        <Mascot mood={mood} size={72} className="feedback-mascot" />
        <h2>{title}</h2>
        <p className="feedback-answer">
          {result.resultType === 'missed' ? 'No points. Next one.' : 'Correct answer:'}{' '}
          <strong className={isMultipleChoice ? 'mc' : result.correctAnswer}>{correctText}</strong>
        </p>
        <p>{result.explanation}</p>
        {card.sourceUrl && (
          <a className="source-link" href={card.sourceUrl} target="_blank" rel="noopener noreferrer">
            Source: {card.sourceName || 'link'}
          </a>
        )}
      </div>
    </div>
  )
}
