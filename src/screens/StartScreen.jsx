import { Logo, SubtitleLockup, AppBadge } from '../components/Brand.jsx'
import { Doodle } from '../components/icons.jsx'
import { Button } from '../components/Button.jsx'

/** The title screen. */
export function StartScreen({ onPlay }) {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '34px 22px 30px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Doodle type="speed" color="#FF4D2D" className="float" style={{ top: 30, left: 18 }} />
      <Doodle type="spark" color="#00A79D" className="spin" style={{ top: 24, right: 22 }} />

      <div style={{ marginTop: 8 }}>
        <Logo size={60} />
      </div>
      <div style={{ marginTop: 16 }}>
        <SubtitleLockup size={16} />
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          width: '100%',
        }}
      >
        <div className="float" style={{ position: 'relative' }}>
          <Doodle type="swoosh" color="#FF4D2D" style={{ bottom: -16, left: -26 }} />
          <Doodle type="spark" color="#FF4D2D" style={{ top: -14, right: -20 }} />
          <AppBadge size={132} />
        </div>
      </div>

      <Button
        variant="teal"
        play
        onClick={onPlay}
        style={{ fontSize: 30, padding: '16px 0', width: '100%', borderRadius: 22 }}
      >
        PLAY <span style={{ fontSize: 22 }}>▶</span>
      </Button>

      <div
        style={{
          marginTop: 14,
          fontFamily: 'var(--ff-head)',
          fontWeight: 800,
          fontSize: 13,
          color: 'var(--ink-soft)',
        }}
      >
        Swipe <span style={{ color: 'var(--orange)' }}>left for Sketchy</span> ·{' '}
        <span style={{ color: 'var(--teal)' }}>right for Legit</span>
      </div>
    </div>
  )
}
