export function ReviewScreen({ results, labels, onPlayAgain, onHome, onBack }) {
  const binaryLabel = {
    [labels.rightValue]: labels.right,
    [labels.leftValue]: labels.left,
  }
  const resultWord = { wrong: 'Wrong', missed: 'Missed' }

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
        <p className="empty-review">Nothing to review. Clean run.</p>
      ) : (
        <>
          <div className="review-list">
            {results.map((result) => {
              const card = result.card
              const isMultipleChoice = card.answerType === 'multiple-choice'
              const correctText = isMultipleChoice ? result.correctAnswer : binaryLabel[result.correctAnswer]
              return (
                <article className="review-item" key={`${card.id}-${result.timestamp}`}>
                  <span className="review-category">{card.category}</span>
                  <h2>{card.claim || card.prompt}</h2>
                  <p>
                    Correct answer:{' '}
                    <strong className={isMultipleChoice ? 'mc' : result.correctAnswer}>{correctText}</strong>
                  </p>
                  <p>
                    Your result: <strong>{resultWord[result.resultType] || result.resultType}</strong>
                  </p>
                  <p>{result.explanation}</p>
                  {card.sourceUrl && (
                    <a className="source-link" href={card.sourceUrl} target="_blank" rel="noopener noreferrer">
                      Source: {card.sourceName || 'link'}
                    </a>
                  )}
                </article>
              )
            })}
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
