import { useMemo } from 'react'
import { Doodle } from '../components/icons.jsx'
import { Button } from '../components/Button.jsx'
import { starburst } from '../utils/starburst.js'

function Stat({ label, value, color }) {
  return (
    <div className="sticker" style={{ padding: '10px 4px', textAlign: 'center' }}>
      <div
        style={{
          fontFamily: 'var(--ff-head)',
          fontWeight: 700,
          fontSize: 10,
          letterSpacing: '.08em',
          color: 'var(--ink-soft)',
        }}
      >
        {label}
      </div>
      <div style={{ fontFamily: 'var(--ff-head)', fontWeight: 800, fontSize: 21, lineHeight: 1.05, color }}>
        {value}
      </div>
    </div>
  )
}

/** End-of-run summary: burst title, accuracy ring + grade, and stat tiles. */
export function GameOverScreen({ summary, onAgain, onMenu }) {
  const burst = useMemo(() => starburst(16, 0.78), [])
  const acc = summary.accuracy
  const title = acc >= 80 ? 'Good job!' : acc >= 50 ? 'Nice run!' : 'Almost got you.'
  const sub =
    acc >= 80
      ? 'You spotted the sketchy ones.'
      : acc >= 50
        ? 'Not bad — a few slipped past.'
        : 'The scammers got a few past you.'
  const ringDeg = Math.round(acc * 3.6)

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '28px 20px 22px',
        textAlign: 'center',
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      <Doodle type="spark" color="#FF4D2D" className="spin" style={{ top: 18, left: 20 }} />
      <Doodle type="star" color="#00A79D" className="spin" style={{ top: 26, right: 24 }} />

      {/* burst title */}
      <div style={{ position: 'relative', width: 300, height: 104, display: 'grid', placeItems: 'center', marginTop: 4 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--ink)', clipPath: burst }} />
        <div style={{ position: 'absolute', inset: 0, background: 'var(--cream)', clipPath: burst, transform: 'scale(.93)' }} />
        <div
          style={{
            position: 'relative',
            fontFamily: 'var(--ff-display)',
            fontSize: 38,
            color: 'var(--orange)',
            WebkitTextStroke: '2px #1F2328',
            paintOrder: 'stroke fill',
            transform: 'rotate(-3deg)',
            lineHeight: 0.9,
            animation: 'burst-in .5s cubic-bezier(.2,1.3,.4,1) both',
          }}
        >
          {title}
        </div>
      </div>
      <div className="pill-tag" style={{ marginTop: 8, background: 'var(--teal)' }}>
        {sub}
      </div>
      {summary.newBest && (
        <div className="pill-tag" style={{ marginTop: 8, background: 'var(--orange)' }}>
          New best score!
        </div>
      )}

      {/* accuracy ring (hero stat) */}
      <div
        className="sticker"
        style={{ marginTop: 8, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 16, width: '100%', justifyContent: 'center' }}
      >
        <div style={{ position: 'relative', width: 70, height: 70, display: 'grid', placeItems: 'center' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: `conic-gradient(var(--teal) ${ringDeg}deg, var(--sand-deep) ${ringDeg}deg)`,
            }}
          />
          <div
            style={{
              position: 'relative',
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: 'var(--cream)',
              border: '3px solid var(--ink)',
              display: 'grid',
              placeItems: 'center',
              fontFamily: 'var(--ff-display)',
              fontSize: 24,
              color: 'var(--ink)',
            }}
          >
            {summary.grade}
          </div>
        </div>
        <div style={{ textAlign: 'left' }}>
          <div
            style={{
              fontFamily: 'var(--ff-head)',
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: '.12em',
              color: 'var(--ink-soft)',
            }}
          >
            ACCURACY
          </div>
          <div style={{ fontFamily: 'var(--ff-head)', fontWeight: 800, fontSize: 30, color: 'var(--orange)' }}>
            {acc}%
          </div>
        </div>
      </div>

      {/* stat tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 9, width: '100%', marginTop: 10 }}>
        <Stat label="SCORE" value={summary.score.toLocaleString()} color="var(--orange)" />
        <Stat label="BEST STREAK" value={'x' + summary.bestStreak} color="var(--teal)" />
        <Stat label="SCAMS SPOTTED" value={summary.scamsSpotted} color="var(--orange)" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 11, width: '100%', marginTop: 18 }}>
        <Button variant="teal" play onClick={onAgain} style={{ fontSize: 22, padding: '15px 0', borderRadius: 20 }}>
          PLAY AGAIN
        </Button>
        <Button variant="cream" onClick={onMenu} style={{ fontSize: 18, padding: '13px 0', borderRadius: 20 }}>
          HOME
        </Button>
      </div>
    </div>
  )
}
