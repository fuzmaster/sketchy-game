import { useEffect, useRef, useState } from 'react'
import { HUD } from '../components/HUD.jsx'
import { LiveTimer } from '../components/LiveTimer.jsx'
import { MessageCard } from '../components/MessageCard.jsx'
import { DecisionZones } from '../components/DecisionZones.jsx'
import { FeedbackTag } from '../components/FeedbackTag.jsx'
import { Confetti } from '../components/Confetti.jsx'
import { SWIPE_THRESHOLD } from '../game/rules.js'

/**
 * The gameplay screen: HUD, pace bar, the draggable card, and the decision
 * zones. Owns the local drag / throw interaction; the parent owns game state.
 *
 * Inputs are interchangeable: drag-throw past the threshold, tap a zone, or
 * press the ← / → arrow keys.
 */
export function PlayScreen({
  card,
  cardIndex,
  lives,
  score,
  streak,
  feedback,
  paused,
  confettiSeed,
  duration,
  tutorial,
  timerActive,
  timeRemaining,
  onDecide,
  onTimeout,
  onPause,
}) {
  const [drag, setDrag] = useState({ dx: 0, dy: 0, on: false, snap: false })
  const [fly, setFly] = useState(null)
  const start = useRef(null)
  const locked = !!feedback || paused || !!fly

  // Reset interaction state whenever a new card comes in.
  useEffect(() => {
    setDrag({ dx: 0, dy: 0, on: false, snap: false })
    setFly(null)
  }, [card.id])

  const commit = (side) => {
    if (locked) return
    setFly(side)
    onDecide(side)
  }

  const down = (e) => {
    if (locked) return
    start.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture?.(e.pointerId)
    setDrag((d) => ({ ...d, on: true, snap: false }))
  }
  const move = (e) => {
    if (!drag.on || locked) return
    setDrag({ dx: e.clientX - start.current.x, dy: e.clientY - start.current.y, on: true, snap: false })
  }
  const up = () => {
    if (!drag.on) return
    if (Math.abs(drag.dx) > SWIPE_THRESHOLD) commit(drag.dx > 0 ? 'legit' : 'sketchy')
    else setDrag({ dx: 0, dy: 0, on: false, snap: true })
  }

  // Keyboard: ← Sketchy, → Legit (ignored while locked or the tutorial is up).
  useEffect(() => {
    const onKey = (e) => {
      if (locked || tutorial) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        commit('sketchy')
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        commit('legit')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locked, tutorial, card.id])

  const active = drag.dx < -30 ? 'sketchy' : drag.dx > 30 ? 'legit' : null

  // The inner element carries the drag / fly / snap transform; the outer
  // element carries the entrance animation, so the two never fight.
  let innerStyle
  if (fly) {
    const dir = fly === 'legit' ? 1 : -1
    innerStyle = {
      transform: `translate(${dir * 640}px, -60px) rotate(${dir * 24}deg)`,
      opacity: 0,
      transition: 'transform .46s cubic-bezier(.4,.0,.7,.3), opacity .46s',
    }
  } else if (drag.on) {
    innerStyle = { transform: `translate(${drag.dx}px, ${drag.dy * 0.4}px) rotate(${drag.dx * 0.05}deg)` }
  } else if (drag.snap) {
    innerStyle = { transform: 'none', transition: 'transform .35s cubic-bezier(.3,1.4,.5,1)' }
  } else {
    innerStyle = { transform: 'none' }
  }

  // A timeout leaves the card in place and wiggles it (a committed decision
  // throws the card off-screen via `fly`, so it is already gone by feedback).
  if (feedback && feedback.type === 'slow') {
    innerStyle = { ...innerStyle, animation: 'wiggle .5s ease' }
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '16px 16px 14px' }}>
      <HUD lives={lives} score={score} streak={streak} onPause={onPause} />
      <div style={{ marginTop: 12 }}>
        <LiveTimer
          duration={duration}
          active={timerActive}
          resetKey={card.id}
          onTimeout={onTimeout}
          remainingRef={timeRemaining}
        />
      </div>

      {/* card area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          minHeight: 0,
        }}
      >
        <div
          key={card.id}
          className="card-enter anim-on"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          style={{ width: '100%', maxWidth: 330, touchAction: 'none', cursor: locked ? 'default' : 'grab' }}
        >
          <div style={innerStyle}>
            <MessageCard card={card} dx={drag.on ? drag.dx : 0} />
          </div>
        </div>
        {feedback && <FeedbackTag fb={feedback} />}
        {feedback && feedback.type === 'correct' && <Confetti seed={confettiSeed} />}
      </div>

      {/* decision zones */}
      <div style={{ marginTop: 10 }}>
        <DecisionZones active={active} onChoose={commit} locked={locked} showHelper={cardIndex < 3} />
      </div>
    </div>
  )
}
