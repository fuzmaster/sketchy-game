import { Button } from '../components/Button.jsx'

/** Modal shown when the player pauses mid-run. */
export function PauseOverlay({ onResume, onRestart, onMenu }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 50,
        background: 'rgba(31,35,40,.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        className="sticker"
        style={{ width: '100%', maxWidth: 280, padding: '26px 22px', textAlign: 'center', animation: 'pop-soft .3s ease both' }}
      >
        <div style={{ fontFamily: 'var(--ff-display)', fontSize: 34, color: 'var(--ink)', transform: 'rotate(-2deg)' }}>
          Paused
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
          <Button variant="teal" onClick={onResume} style={{ fontSize: 18, padding: '13px 0' }}>
            RESUME
          </Button>
          <Button variant="orange" onClick={onRestart} style={{ fontSize: 16, padding: '11px 0' }}>
            RESTART
          </Button>
          <Button variant="cream" onClick={onMenu} style={{ fontSize: 16, padding: '11px 0' }}>
            MAIN MENU
          </Button>
        </div>
      </div>
    </div>
  )
}
