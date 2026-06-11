import { gusSvg } from '../brand/gusArt.js'

/* ============================================================
   Gut Check — "Gus", the official brand mascot.
   Renders the canonical anime/kawaii Gus SVG (see src/brand/gusArt.js,
   ported from the Gut Check Brand Sheet). Motion by mood:
     idle  — bob + blink (the logo)
     happy — celebrate pop (correct)
     oops  — static wince face (wrong)
     sleepy— static sleepy face (timeout)
   All motion is paused under prefers-reduced-motion (see styles.css).
   ============================================================ */
const MOTION = { idle: 'gus-bob', happy: 'gus-pop' }

export function Mascot({ size = 104, mood = 'idle', className = '' }) {
  return (
    <div
      className={`mascot mascot--${mood} ${MOTION[mood] || ''} ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Gut Check mascot"
      dangerouslySetInnerHTML={{ __html: gusSvg(mood, { size }) }}
    />
  )
}
