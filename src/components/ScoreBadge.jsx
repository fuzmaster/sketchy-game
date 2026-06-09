import { useCountUp } from '../hooks/useCountUp.js'

/** Speech-bubble score badge with an animated count-up value. */
export function ScoreBadge({ score }) {
  const value = useCountUp(score)
  return (
    <div className="scoreb">
      <div className="lab">SCORE</div>
      <div className="val">{value.toLocaleString()}</div>
    </div>
  )
}
