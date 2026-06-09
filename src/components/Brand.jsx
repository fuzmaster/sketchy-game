/* ============================================================
   SKETCHY!  —  brand lockups: wordmark, subtitle, app badge
   These are CSS stand-ins for shipped logo art.
   ============================================================ */
import { CheckGlyph } from './icons.jsx'

/** The "Sketchy!" wordmark with a cream rim and inked fill. */
export function Logo({ size = 64 }) {
  return (
    <div className="wm" style={{ fontSize: size }}>
      <span className="wm-rim" aria-hidden="true">
        Sketchy!
      </span>
      <span className="wm-ink">
        <span className="o">Sket</span>
        <span className="d">chy</span>
        <span className="o">!</span>
      </span>
    </div>
  )
}

/** Tagline lockup shown under the logo. */
export function SubtitleLockup({ size = 15 }) {
  return (
    <div className="sublock" style={{ fontSize: size }}>
      Spot <span className="s">scams</span> before
      <br />
      they spot <span className="y">you</span>
    </div>
  )
}

/** App-icon badge: orange/teal split tile with an "S" and a checkmark. */
export function AppBadge({ size = 120 }) {
  return (
    <div className="appbadge" style={{ width: size, height: size, fontSize: size }}>
      <span className="ab-s">S</span>
      <CheckGlyph size={size * 0.42} fill="#FFF6EB" stroke="#1F2328" />
    </div>
  )
}
