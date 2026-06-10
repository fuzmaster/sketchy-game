import { useEffect, useRef, useState } from 'react'
import { FoodCard } from './FoodCard.jsx'
import { ChoiceCard } from './ChoiceCard.jsx'
import { TimerBar } from './TimerBar.jsx'
import { playSwipe } from '../audio/sfx.js'

export function GameScreen({
  card,
  cardIndex,
  totalCards,
  cardNumber,
  hearts,
  score,
  streak,
  duration,
  labels,
  soundEnabled,
  timerActive,
  timerResetKey,
  timeRemaining,
  swipeThreshold,
  onAnswer,
  onTimeout,
  onPause,
  onToggleSound,
}) {
  const [remaining, setRemaining] = useState(duration / 1000)
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false })
  const [flying, setFlying] = useState(null)
  const [picked, setPicked] = useState(null)
  const startPoint = useRef(null)
  const firedTimeout = useRef(false)
  const lastTick = useRef(null)

  const isMultipleChoice = card?.answerType === 'multiple-choice'

  useEffect(() => {
    setRemaining(duration / 1000)
    timeRemaining.current = duration / 1000
    firedTimeout.current = false
    lastTick.current = null
    setDrag({ x: 0, y: 0, active: false })
    setFlying(null)
    setPicked(null)
  }, [card?.id, duration, timerResetKey, timeRemaining])

  useEffect(() => {
    if (!timerActive) {
      lastTick.current = null
      return undefined
    }

    let raf
    const tick = (now) => {
      if (lastTick.current == null) lastTick.current = now
      const delta = (now - lastTick.current) / 1000
      lastTick.current = now
      const next = Math.max(0, timeRemaining.current - delta)
      timeRemaining.current = next
      setRemaining(next)
      if (next <= 0 && card && !firedTimeout.current) {
        firedTimeout.current = true
        onTimeout(card.id)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [card?.id, onTimeout, timeRemaining, timerActive])

  useEffect(() => {
    const onKey = (event) => {
      if (!timerActive) return
      if (event.key === 'Escape') {
        event.preventDefault()
        onPause()
        return
      }
      if (isMultipleChoice) {
        const n = Number(event.key)
        if (Number.isInteger(n) && n >= 1 && n <= (card?.choices?.length || 0)) {
          event.preventDefault()
          commit(card.choices[n - 1])
        }
        return
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        commit(labels.leftValue)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        commit(labels.rightValue)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // commit intentionally closes over the current card.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card?.id, timerActive])

  if (!card) return null

  function commit(answer) {
    if (!timerActive || flying || picked) return
    playSwipe()
    if (isMultipleChoice) setPicked(answer)
    else setFlying(answer)
    onAnswer(answer, card.id)
  }

  function pointerDown(event) {
    if (!timerActive || isMultipleChoice) return
    startPoint.current = { x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture?.(event.pointerId)
    setDrag({ x: 0, y: 0, active: true })
  }

  function pointerMove(event) {
    if (!drag.active || !startPoint.current || !timerActive) return
    setDrag({
      x: event.clientX - startPoint.current.x,
      y: event.clientY - startPoint.current.y,
      active: true,
    })
  }

  function pointerUp() {
    if (!drag.active) return
    if (Math.abs(drag.x) >= swipeThreshold) {
      commit(drag.x > 0 ? labels.rightValue : labels.leftValue)
    } else {
      setDrag({ x: 0, y: 0, active: false })
    }
  }

  const percent = Math.max(0, Math.min(100, (remaining / (duration / 1000)) * 100))
  const flyRight = flying != null && flying === labels.rightValue
  const cardTransform = flying
    ? `translateX(${flyRight ? 520 : -520}px) rotate(${flyRight ? 18 : -18}deg)`
    : `translate(${drag.x}px, ${drag.y * 0.25}px) rotate(${drag.x * 0.045}deg)`

  return (
    <div className="screen game-screen">
      <header className="hud">
        <div className="hearts" aria-label={`${hearts} hearts`}>
          {Array.from({ length: 3 }).map((_, index) => (
            <span key={index} className={index < hearts ? 'heart full' : 'heart'}>
              ♥
            </span>
          ))}
        </div>
        <div className="score-chip">
          <span>Score</span>
          <strong>{score}</strong>
        </div>
        <div className="score-chip">
          <span>Streak</span>
          <strong>x{streak}</strong>
        </div>
        <button className="pause-button" aria-label="Pause" onClick={onPause}>
          ||
        </button>
        <button
          className="sound-button"
          aria-label={soundEnabled ? 'Sound On' : 'Muted'}
          onClick={onToggleSound}
          type="button"
        >
          {soundEnabled ? 'Sound On' : 'Muted'}
        </button>
      </header>

      <TimerBar percent={percent} />

      {isMultipleChoice ? (
        <>
          <div className="card-zone">
            <ChoiceCard card={card} />
          </div>
          <div className="choice-grid" role="group" aria-label="Answer choices">
            {card.choices.map((choice) => (
              <button
                key={choice}
                type="button"
                className={`mc-choice ${picked === choice ? 'picked' : ''}`}
                onClick={() => commit(choice)}
                disabled={!timerActive}
              >
                {choice}
              </button>
            ))}
          </div>
          <div className="mc-count">#{cardNumber ?? cardIndex + 1}</div>
        </>
      ) : (
        <>
          <div className="card-zone">
            <div
              className="drag-card"
              onPointerDown={pointerDown}
              onPointerMove={pointerMove}
              onPointerUp={pointerUp}
              onPointerCancel={pointerUp}
              style={{
                transform: cardTransform,
                opacity: flying ? 0 : 1,
                transition: flying
                  ? 'transform .36s ease, opacity .36s ease'
                  : drag.active
                    ? 'none'
                    : 'transform .22s ease',
              }}
            >
              <FoodCard card={card} dragX={drag.x} labels={labels} />
            </div>
          </div>

          <div className="controls">
            <button className="choice-button fake-choice" onClick={() => commit(labels.leftValue)} disabled={!timerActive}>
              {labels.left}
            </button>
            <span className="card-count">#{cardNumber ?? cardIndex + 1}</span>
            <button className="choice-button fresh-choice" onClick={() => commit(labels.rightValue)} disabled={!timerActive}>
              {labels.right}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
