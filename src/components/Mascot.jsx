/* ============================================================
   Gut Check — "Gus", the sticker-style mascot.
   Inline animated SVG (no images): gentle bob, blinking eyes, a little wave.
   All motion is paused under prefers-reduced-motion (see styles.css).
   ============================================================ */
export function Mascot({ size = 104, className = '' }) {
  return (
    <svg
      className={`mascot ${className}`}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label="Gut Check mascot"
    >
      {/* ground shadow (stays put while the body bobs) */}
      <ellipse cx="100" cy="188" rx="44" ry="8" fill="#1F2328" opacity="0.12" />

      <g className="mascot-bob">
        {/* arms */}
        <path className="mascot-wave" d="M40 116 q-16 4 -18 22" fill="none" stroke="#1F2328" strokeWidth="8" strokeLinecap="round" />
        <path d="M160 116 q16 4 18 22" fill="none" stroke="#1F2328" strokeWidth="8" strokeLinecap="round" />

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

        {/* eyes */}
        <g className="mascot-eyes">
          <circle cx="78" cy="90" r="15" fill="#FFF6EB" stroke="#1F2328" strokeWidth="5" />
          <circle cx="122" cy="90" r="15" fill="#FFF6EB" stroke="#1F2328" strokeWidth="5" />
          <circle cx="81" cy="93" r="6.5" fill="#1F2328" />
          <circle cx="125" cy="93" r="6.5" fill="#1F2328" />
          <circle cx="84" cy="88" r="2.4" fill="#FFF6EB" />
          <circle cx="128" cy="88" r="2.4" fill="#FFF6EB" />
        </g>

        {/* smile */}
        <path d="M84 116 q16 14 32 0" fill="none" stroke="#1F2328" strokeWidth="5" strokeLinecap="round" />

        {/* belly badge with check */}
        <ellipse cx="100" cy="146" rx="34" ry="22" fill="#FFF6EB" stroke="#1F2328" strokeWidth="6" />
        <path d="M85 146 l9 10 l20 -24" fill="none" stroke="#00A79B" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M85 146 l9 10 l20 -24" fill="none" stroke="#1F2328" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}
