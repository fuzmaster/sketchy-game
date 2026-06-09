import { useEffect, useRef, useState } from 'react'
import { TimerBar } from './TimerBar.jsx'

/**
 * Self-ticking countdown, isolated so its per-frame re-renders don't touch the
 * rest of the play screen. Resets whenever `resetKey` or `duration` changes,
 * pauses when `active` is false, fires `onTimeout` once when it hits zero, and
 * mirrors the live remaining time into `remainingRef` for score bonuses.
 */
export function LiveTimer({ duration, active, resetKey, onTimeout, remainingRef }) {
  const [ms, setMs] = useState(duration)
  const fired = useRef(false)

  useEffect(() => {
    setMs(duration)
    fired.current = false
  }, [resetKey, duration])

  useEffect(() => {
    if (remainingRef) remainingRef.current = ms
  })

  useEffect(() => {
    if (!active) return
    let raf
    let last = performance.now()
    const tick = (now) => {
      const dt = now - last
      last = now
      setMs((prev) => {
        const next = prev - dt
        if (next <= 0) {
          if (!fired.current) {
            fired.current = true
            onTimeout()
          }
          return 0
        }
        return next
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, resetKey])

  const pct = Math.max(0, (ms / duration) * 100)

  return (
    <div>
      <TimerBar pct={pct} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
        <span className="pill-tag">{pct <= 28 ? 'Quick — trust your gut!' : 'Keep it going!'}</span>
      </div>
    </div>
  )
}
