export function ReviewScreen({ results, labels, onPlayAgain, onHome, onBack }) {
  const answerLabels = {
    [labels.rightValue]: labels.right,
    [labels.leftValue]: labels.left,
    wrong: 'Wrong',
    missed: 'Missed',
  }
  return (
    <div className="screen review-screen">
      <div className="review-top">
        <button className="mini-button" onClick={onBack}>
          Back
        </button>
        <button className="mini-button fresh-button" onClick={onPlayAgain}>
          Play Again
        </button>
        <button className="mini-button" onClick={onHome}>
          Home
        </button>
      </div>
      <h1>Review Bites</h1>
      {results.length === 0 ? (
        <p className="empty-review">Nothing to review. Clean plate.</p>
      ) : (
        <>
          <div className="review-list">
            {results.map((result) => (
              <article className="review-item" key={`${result.card.id}-${result.timestamp}`}>
                <span className="review-category">{result.card.category}</span>
                <h2>{result.card.claim}</h2>
                <p>
                  Correct answer: <strong className={result.correctAnswer}>{answerLabels[result.correctAnswer]}</strong>
                </p>
                <p>
                  Player result: <strong>{answerLabels[result.resultType]}</strong>
                </p>
                <p>{result.explanation}</p>
              </article>
            ))}
          </div>
          <div className="review-bottom">
            <button className="mini-button fresh-button" onClick={onPlayAgain}>
              Play Again
            </button>
            <button className="mini-button" onClick={onHome}>
              Home
            </button>
          </div>
        </>
      )}
    </div>
  )
}
