function highlightClaim(claim, highlight) {
  if (!highlight) return claim
  const index = claim.indexOf(highlight)
  if (index < 0) return claim
  return (
    <>
      {claim.slice(0, index)}
      <mark>{highlight}</mark>
      {claim.slice(index + highlight.length)}
    </>
  )
}

export function FoodCard({ card, dragX, labels }) {
  const freshOpacity = Math.max(0, Math.min(1, dragX / 92))
  const fakeOpacity = Math.max(0, Math.min(1, -dragX / 92))

  return (
    <article className="food-card">
      <span className="answer-stamp stamp-fake" style={{ opacity: fakeOpacity }}>
        {labels.left}
      </span>
      <span className="answer-stamp stamp-fresh" style={{ opacity: freshOpacity }}>
        {labels.right}
      </span>
      <div className="card-meta">
        <span className="food-icon" aria-hidden="true">
          {card.id.startsWith('scam') ? '!' : card.answer === 'fresh' ? '🥬' : '🍅'}
        </span>
        <span>{card.category}</span>
      </div>
      <p>{highlightClaim(card.claim, card.highlight)}</p>
    </article>
  )
}
