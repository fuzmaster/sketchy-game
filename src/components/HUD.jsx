import { Hearts } from './Hearts.jsx'
import { ScoreBadge } from './ScoreBadge.jsx'
import { StreakBadge } from './StreakBadge.jsx'
import { MAX_LIVES } from '../game/rules.js'

/** Top bar during play: hearts · score · streak · pause. */
export function HUD({ lives, score, streak, onPause }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
      <div className="sticker" style={{ padding: '7px 10px', borderRadius: 14 }}>
        <Hearts lives={lives} max={MAX_LIVES} />
      </div>
      <ScoreBadge score={score} />
      <StreakBadge streak={streak} />
      <button
        className="sticker"
        onClick={onPause}
        aria-label="Pause"
        style={{
          width: 42,
          height: 42,
          display: 'grid',
          placeItems: 'center',
          cursor: 'pointer',
          borderRadius: 13,
          padding: 0,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16">
          <rect x="3" y="2" width="3.4" height="12" rx="1.2" fill="#1F2328" />
          <rect x="9.6" y="2" width="3.4" height="12" rx="1.2" fill="#1F2328" />
        </svg>
      </button>
    </div>
  )
}
