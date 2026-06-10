/* ============================================================
   Gut Check — "Gus", the sticker-style mascot.
   Inline animated SVG (no images). Supports moods:
     idle  — gentle bob + blink + little wave (the logo)
     happy — arms up, big grin, sparkles, celebrate bounce (correct)
     oops  — squinted eyes, frown, sweat drop, wince shake (wrong)
     sleepy— closed eyes, yawn, "Zzz", slow sway (timeout)
   All motion is paused under prefers-reduced-motion (see styles.css).
   ============================================================ */

function Eyes({ mood }) {
  if (mood === 'sleepy') {
    return (
      <g>
        <path d="M66 92 q12 9 24 0" fill="none" stroke="#1F2328" strokeWidth="5" strokeLinecap="round" />
        <path d="M110 92 q12 9 24 0" fill="none" stroke="#1F2328" strokeWidth="5" strokeLinecap="round" />
      </g>
    )
  }
  if (mood === 'oops') {
    return (
      <g>
        <ellipse cx="78" cy="91" rx="14" ry="4.5" fill="#FFF6EB" stroke="#1F2328" strokeWidth="5" />
        <ellipse cx="122" cy="91" rx="14" ry="4.5" fill="#FFF6EB" stroke="#1F2328" strokeWidth="5" />
      </g>
    )
  }
  // idle + happy: open eyes (idle blinks)
  return (
    <g className={mood === 'idle' ? 'mascot-eyes' : ''}>
      <circle cx="78" cy="90" r="15" fill="#FFF6EB" stroke="#1F2328" strokeWidth="5" />
      <circle cx="122" cy="90" r="15" fill="#FFF6EB" stroke="#1F2328" strokeWidth="5" />
      <circle cx="81" cy="93" r="6.5" fill="#1F2328" />
      <circle cx="125" cy="93" r="6.5" fill="#1F2328" />
      <circle cx="84" cy="88" r="2.4" fill="#FFF6EB" />
      <circle cx="128" cy="88" r="2.4" fill="#FFF6EB" />
    </g>
  )
}

function Mouth({ mood }) {
  if (mood === 'happy') {
    return (
      <path d="M82 112 q18 26 36 0 q-18 8 -36 0 Z" fill="#1F2328" stroke="#1F2328" strokeWidth="3" strokeLinejoin="round" />
    )
  }
  if (mood === 'oops') {
    return <path d="M86 124 q14 -10 28 0" fill="none" stroke="#1F2328" strokeWidth="5" strokeLinecap="round" />
  }
  if (mood === 'sleepy') {
    return <ellipse cx="100" cy="122" rx="7" ry="9" fill="#1F2328" />
  }
  return <path d="M84 116 q16 14 32 0" fill="none" stroke="#1F2328" strokeWidth="5" strokeLinecap="round" />
}

function Arms({ mood }) {
  if (mood === 'happy') {
    return (
      <g>
        <path d="M44 104 q-14 -12 -8 -30" fill="none" stroke="#1F2328" strokeWidth="8" strokeLinecap="round" />
        <path d="M156 104 q14 -12 8 -30" fill="none" stroke="#1F2328" strokeWidth="8" strokeLinecap="round" />
      </g>
    )
  }
  return (
    <g>
      <path
        className={mood === 'idle' ? 'mascot-wave' : ''}
        d="M40 116 q-16 4 -18 22"
        fill="none"
        stroke="#1F2328"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path d="M160 116 q16 4 18 22" fill="none" stroke="#1F2328" strokeWidth="8" strokeLinecap="round" />
    </g>
  )
}

function Extras({ mood }) {
  if (mood === 'happy') {
    return (
      <g className="mascot-sparkles" aria-hidden="true">
        <path d="M40 56 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 Z" fill="#FFD166" stroke="#1F2328" strokeWidth="3" strokeLinejoin="round" />
        <path d="M160 50 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 Z" fill="#FFD166" stroke="#1F2328" strokeWidth="3" strokeLinejoin="round" />
      </g>
    )
  }
  if (mood === 'oops') {
    return <path d="M150 78 q8 12 0 18 q-8 -6 0 -18 Z" fill="#4ea4ff" stroke="#1F2328" strokeWidth="3" strokeLinejoin="round" />
  }
  if (mood === 'sleepy') {
    return (
      <g className="mascot-zzz" fill="#1F2328" fontFamily="inherit" fontWeight="900">
        <text x="150" y="58" fontSize="22">z</text>
        <text x="168" y="42" fontSize="28">Z</text>
      </g>
    )
  }
  return null
}

export function Mascot({ size = 104, mood = 'idle', className = '' }) {
  return (
    <svg
      className={`mascot mascot--${mood} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label="Gut Check mascot"
    >
      {/* ground shadow (stays put while the body bobs) */}
      <ellipse cx="100" cy="188" rx="44" ry="8" fill="#1F2328" opacity="0.12" />

      <g className="mascot-bob">
        <Arms mood={mood} />
        <Extras mood={mood} />

        {/* sprout + spark */}
        <path d="M100 36 q6 -16 -8 -24" fill="none" stroke="#1F2328" strokeWidth="7" strokeLinecap="round" />
        <circle cx="88" cy="10" r="8" fill="#FF4D2D" stroke="#1F2328" strokeWidth="5" />

        {/* body */}
        <path
          d="M100 36 C150 36 170 70 170 112 C170 156 142 178 100 178 C58 178 30 156 30 112 C30 70 50 36 100 36 Z"
          fill="#00A79B"
          stroke="#1F2328"
          strokeWidth="8"
        />

        {/* cheeks */}
        <circle cx="58" cy="110" r="10" fill="#FF4D2D" opacity="0.5" />
        <circle cx="142" cy="110" r="10" fill="#FF4D2D" opacity="0.5" />

        <Eyes mood={mood} />
        <Mouth mood={mood} />

        {/* belly badge with check */}
        <ellipse cx="100" cy="146" rx="34" ry="22" fill="#FFF6EB" stroke="#1F2328" strokeWidth="6" />
        <path d="M85 146 l9 10 l20 -24" fill="none" stroke="#00A79B" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M85 146 l9 10 l20 -24" fill="none" stroke="#1F2328" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}
