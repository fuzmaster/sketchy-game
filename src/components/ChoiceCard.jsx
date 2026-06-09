/** A multiple-choice prompt card (Quick Math and similar). No swipe. */
export function ChoiceCard({ card }) {
  return (
    <article className="choice-card">
      <div className="card-meta">
        {card.graphic?.value && (
          <span className="card-graphic" aria-hidden="true">
            {card.graphic.value}
          </span>
        )}
        <span>{card.category}</span>
      </div>
      <p className="choice-prompt">{card.prompt}</p>
    </article>
  )
}
