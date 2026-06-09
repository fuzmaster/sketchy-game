import { Button } from '../components/Button.jsx'

/** First-run "How to play" overlay. */
export function TutorialOverlay({ onDismiss }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 60,
        background: 'rgba(31,35,40,.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        className="sticker"
        style={{ width: '100%', maxWidth: 300, padding: '24px 22px', animation: 'pop-soft .3s ease both' }}
      >
        <div
          style={{
            fontFamily: 'var(--ff-display)',
            fontSize: 26,
            color: 'var(--ink)',
            textAlign: 'center',
            marginBottom: 18,
          }}
        >
          How to play
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          <div className="tut-step">
            <div className="tut-num t1">1</div>
            <div className="tut-txt">Read the message.</div>
          </div>
          <div className="tut-step">
            <div className="tut-num t2">2</div>
            <div className="tut-txt">
              Swipe <span className="s">left</span> if it's Sketchy.
            </div>
          </div>
          <div className="tut-step">
            <div className="tut-num t3">3</div>
            <div className="tut-txt">
              Swipe <span className="y">right</span> if it's Legit.
            </div>
          </div>
        </div>
        <Button
          variant="teal"
          onClick={onDismiss}
          style={{ fontSize: 18, padding: '13px 0', width: '100%', marginTop: 22 }}
        >
          Got it!
        </Button>
      </div>
    </div>
  )
}
