import { CheckGlyph } from './icons.jsx'

/**
 * The two tap targets / drag indicators: left = Sketchy, right = Legit.
 * `active` lights the matching zone while dragging; `showHelper` shows the
 * "Swipe left / right" hint (first few cards only).
 */
export function DecisionZones({ active, onChoose, locked, showHelper }) {
  const tap = (side) => {
    if (!locked) onChoose(side)
  }
  return (
    <div className="zones">
      <div
        className={`zone left ${active === 'sketchy' ? 'active' : ''}`}
        onClick={() => tap('sketchy')}
      >
        {showHelper && <div className="z-help">Swipe left</div>}
        <div className="z-row">
          <span className="z-glyph">S</span>
          <span className="z-name">Sketchy</span>
        </div>
      </div>
      <div
        className={`zone right ${active === 'legit' ? 'active' : ''}`}
        onClick={() => tap('legit')}
      >
        {showHelper && <div className="z-help">Swipe right</div>}
        <div className="z-row">
          <CheckGlyph size={28} fill="#FFF6EB" stroke="#1F2328" />
          <span className="z-name">Legit</span>
        </div>
      </div>
      <div className="or">or</div>
    </div>
  )
}
