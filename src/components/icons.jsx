/* ============================================================
   SKETCHY!  —  SVG icons, glyphs, and motion doodles
   ============================================================ */

/** Per-channel message icon (text / email / package / marketplace / bank / job). */
export function ChannelIcon({ name, size = 30 }) {
  const p = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#1F2328',
    strokeWidth: 2.1,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  const icons = {
    text: (
      <svg {...p}>
        <path d="M4 5h16v11H9l-4 3v-3H4z" fill="#00A79D" stroke="#1F2328" />
        <circle cx="9" cy="10.5" r="1" fill="#fff" stroke="none" />
        <circle cx="12" cy="10.5" r="1" fill="#fff" stroke="none" />
        <circle cx="15" cy="10.5" r="1" fill="#fff" stroke="none" />
      </svg>
    ),
    email: (
      <svg {...p}>
        <rect x="3" y="5" width="18" height="14" rx="2.4" fill="#FFF6EB" />
        <path d="M4 7l8 6 8-6" />
      </svg>
    ),
    package: (
      <svg {...p}>
        <path d="M12 3l8 4v9l-8 4-8-4V7z" fill="#EDE5DA" />
        <path d="M4 7l8 4 8-4M12 11v9" />
      </svg>
    ),
    marketplace: (
      <svg {...p}>
        <path d="M4 9l1.5-4h13L20 9" fill="#FF4D2D" />
        <path d="M4 9h16v10H4z" fill="#FFF6EB" />
        <path d="M10 19v-5h4v5" />
      </svg>
    ),
    bank: (
      <svg {...p}>
        <path d="M12 3l9 5H3z" fill="#EDE5DA" />
        <path d="M5 9v8M10 9v8M14 9v8M19 9v8M3 20h18" />
      </svg>
    ),
    job: (
      <svg {...p}>
        <rect x="3" y="8" width="18" height="11" rx="2" fill="#00A79D" />
        <path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="#1F2328" />
        <path d="M3 13h18" stroke="#1F2328" />
      </svg>
    ),
  }
  return icons[name] || icons.text
}

/** Bold checkmark used for the "Legit" mark and the app badge. */
export function CheckGlyph({ size = 24, stroke = '#1F2328', fill = '#FFF6EB' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 13l5 5L20 6" stroke={fill} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 13l5 5L20 6" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Clock face used by the timer and the "too slow" feedback. */
export function ClockGlyph({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="13" r="8" fill="#FFF6EB" stroke="#1F2328" strokeWidth="2.2" />
      <path d="M12 13V9M12 13l3 2" stroke="#1F2328" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M9 3h6M12 3v2.5" stroke="#1F2328" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

/** Outcome face for the feedback tag: check / clock / "oof" frown. */
export function FaceGlyph({ kind, size = 30 }) {
  if (kind === 'slow') return <ClockGlyph size={size} />
  if (kind === 'correct') return <CheckGlyph size={size} fill="#fff" stroke="#1F2328" />
  /* wrong = oof face */
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="10" r="1.6" fill="#1F2328" />
      <circle cx="15" cy="10" r="1.6" fill="#1F2328" />
      <path d="M8 16c1.2-1.6 6.8-1.6 8 0" stroke="#1F2328" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

/** Decorative motion accents scattered around the start / game-over screens. */
export function Doodle({ type, color = '#FF4D2D', style, className = '' }) {
  const c = color
  const shapes = {
    speed: (
      <svg width="40" height="22" viewBox="0 0 40 22" fill="none">
        <path d="M2 6h26M8 13h24M0 19h18" stroke={c} strokeWidth="3.4" strokeLinecap="round" />
      </svg>
    ),
    spark: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path
          d="M13 1l2.4 8.6L24 12l-8.6 2.4L13 23l-2.4-8.6L2 12l8.6-2.4z"
          fill={c}
          stroke="#1F2328"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
    star: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 1l2.8 6.2 6.2.6-4.7 4.1 1.5 6.1L11 14.9 5.2 18.1l1.5-6.1L2 7.8l6.2-.6z"
          fill={c}
          stroke="#1F2328"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
    bolt: (
      <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
        <path d="M11 1L3 16h6l-2 11 10-16h-6z" fill={c} stroke="#1F2328" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
    swoosh: (
      <svg width="70" height="20" viewBox="0 0 70 20" fill="none">
        <path d="M2 12c18 8 48 6 66-8" stroke={c} strokeWidth="4.5" strokeLinecap="round" />
      </svg>
    ),
  }
  return (
    <div className={`doodle ${className}`} style={style}>
      {shapes[type]}
    </div>
  )
}
