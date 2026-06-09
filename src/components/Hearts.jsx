import { useEffect, useRef, useState } from 'react'

/** Row of hearts; the gained/lost heart plays a brief pop / break animation. */
export function Hearts({ lives, max = 3 }) {
  const prev = useRef(lives)
  const [fx, setFx] = useState({ i: -1, kind: '' })

  useEffect(() => {
    if (lives < prev.current) setFx({ i: lives, kind: 'break' })
    else if (lives > prev.current) setFx({ i: lives - 1, kind: 'pop' })
    prev.current = lives
    const t = setTimeout(() => setFx({ i: -1, kind: '' }), 430)
    return () => clearTimeout(t)
  }, [lives])

  return (
    <div className="hearts">
      {Array.from({ length: max }).map((_, i) => {
        const full = i < lives
        const anim = fx.i === i ? fx.kind : ''
        return (
          <span key={i} className={`heart ${full ? 'full' : 'empty'} ${anim}`}>
            ♥
          </span>
        )
      })}
    </div>
  )
}
