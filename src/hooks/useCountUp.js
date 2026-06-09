import { useEffect, useState } from 'react'

/**
 * Animate a number toward `value` with an ease-out cubic over `ms`.
 * Uses requestAnimationFrame with a setTimeout safety net so the final
 * value always lands even if rAF is throttled (e.g. background tab).
 */
export function useCountUp(value, ms = 460) {
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const from = display
    if (from === value) return

    let raf
    let start
    let done = false
    const finish = () => {
      if (!done) {
        done = true
        setDisplay(value)
      }
    }
    const tick = (t) => {
      if (start === undefined) start = t
      const k = Math.min(1, (t - start) / ms)
      setDisplay(Math.round(from + (value - from) * (1 - Math.pow(1 - k, 3))))
      if (k < 1) raf = requestAnimationFrame(tick)
      else finish()
    }
    raf = requestAnimationFrame(tick)
    const safety = setTimeout(finish, ms + 220)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(safety)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return display
}
