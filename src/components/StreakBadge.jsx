import { useEffect, useMemo, useRef, useState } from 'react'
import { starburst } from '../utils/starburst.js'

/** Starburst streak badge; pops whenever the streak increases. */
export function StreakBadge({ streak }) {
  const burst = useMemo(() => starburst(13, 0.7), [])
  const [bump, setBump] = useState(false)
  const prev = useRef(streak)

  useEffect(() => {
    if (streak > prev.current) {
      setBump(true)
      const t = setTimeout(() => setBump(false), 420)
      prev.current = streak
      return () => clearTimeout(t)
    }
    prev.current = streak
  }, [streak])

  return (
    <div className={`streakb ${bump ? 'bump' : ''}`}>
      <div className="bg-ink" style={{ clipPath: burst }} />
      <div className="bg-cream" style={{ clipPath: burst }} />
      <div className="inner">
        <div className="lab">STREAK</div>
        <div className="val">x{streak}</div>
      </div>
    </div>
  )
}
