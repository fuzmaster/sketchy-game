import { useMemo } from 'react'

const COLORS = ['#FF4D2D', '#00A79D', '#F4C536', '#FFF6EB']

/** A one-shot 14-particle confetti burst. `seed` re-rolls the particles. */
export function Confetti({ seed }) {
  const bits = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => {
      const ang = Math.random() * Math.PI * 2
      const dist = 90 + Math.random() * 150
      return {
        cx: (Math.cos(ang) * dist).toFixed(0) + 'px',
        cy: (Math.sin(ang) * dist - 40).toFixed(0) + 'px',
        cr: (Math.random() * 540 - 270).toFixed(0) + 'deg',
        bg: COLORS[i % COLORS.length],
        rad: Math.random() < 0.4 ? '50%' : '2px',
        delay: (Math.random() * 0.08).toFixed(2) + 's',
        size: (8 + Math.random() * 7).toFixed(0) + 'px',
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed])

  return (
    <div className="confetti">
      {bits.map((b, i) => (
        <i
          key={i}
          style={{
            '--cx': b.cx,
            '--cy': b.cy,
            '--cr': b.cr,
            background: b.bg,
            borderRadius: b.rad,
            width: b.size,
            height: b.size,
            animationDelay: b.delay,
          }}
        />
      ))}
    </div>
  )
}
