export function FeedbackOverlay({ result, labels }) {
  const answerLabel = {
    [labels.rightValue]: labels.right,
    [labels.leftValue]: labels.left,
  }
  const title = result.resultType === 'missed'
    ? 'Too slow!'
    : result.wasCorrect
      ? result.correctAnswer === labels.rightValue
        ? `${labels.right} fact!`
        : 'Good catch!'
      : 'Oof, not quite.'

  return (
    <div className="feedback-layer" aria-live="polite">
      <div className={`feedback-card ${result.resultType}`}>
        <h2>{title}</h2>
        <p className="feedback-answer">
          {result.resultType === 'missed' ? 'No points. Next one.' : 'Correct answer:'}{' '}
          <strong className={result.correctAnswer}>{answerLabel[result.correctAnswer]}</strong>
        </p>
        <p>{result.explanation}</p>
      </div>
    </div>
  )
}
