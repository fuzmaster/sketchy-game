/* ============================================================
   SKETCHY!  —  Dev Notes panel
   Hidden from the public UI; toggled with the "?" key. Documents the
   design system and game rules (palette, type, layout, motion, handoff).
   ============================================================ */

function Sec({ t, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div
        style={{
          fontFamily: 'var(--ff-head)',
          fontWeight: 800,
          fontSize: 13,
          letterSpacing: '.08em',
          color: 'var(--teal)',
          textTransform: 'uppercase',
          marginBottom: 6,
        }}
      >
        {t}
      </div>
      <div style={{ fontFamily: 'var(--ff-body)', fontWeight: 600, fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink)' }}>
        {children}
      </div>
    </div>
  )
}

function Sw({ c }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: 13,
        height: 13,
        borderRadius: 4,
        background: c,
        border: '1.5px solid #1F2328',
        verticalAlign: '-2px',
        marginRight: 5,
      }}
    />
  )
}

export function DevNotes({ open, onClose }) {
  if (!open) return null
  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', justifyContent: 'flex-end', background: 'rgba(31,35,40,.45)' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(420px, 92vw)',
          height: '100%',
          background: 'var(--cream)',
          borderLeft: '4px solid var(--ink)',
          boxShadow: '-12px 0 40px rgba(31,35,40,.3)',
          overflowY: 'auto',
          padding: '22px 22px 40px',
          animation: 'sheet-up .3s ease both',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ fontFamily: 'var(--ff-display)', fontSize: 24, color: 'var(--ink)' }}>Dev Notes</div>
          <button className="btn btn-cream" onClick={onClose} style={{ padding: '6px 12px', fontSize: 14 }}>
            Close ✕
          </button>
        </div>

        <Sec t="Color palette">
          <Sw c="#FF4D2D" />Orange <code>#FF4D2D</code> — Sketchy / danger / wrong
          <br />
          <Sw c="#00A79D" />Teal <code>#00A79D</code> — Legit / correct / primary brand
          <br />
          <Sw c="#1F2328" />Charcoal <code>#1F2328</code> — every outline + body text
          <br />
          <Sw c="#FFF6EB" />Cream <code>#FFF6EB</code> — card &amp; sticker fills, light text
          <br />
          <Sw c="#EDE5DA" />Soft beige <code>#EDE5DA</code> — page backdrop / empty track
          <br />
          <Sw c="#F4C536" />Gold <code>#F4C536</code> — "Too slow" only (used sparingly)
        </Sec>
        <Sec t="Typography">
          <b>Luckiest Guy</b> — display pops only (PLAY, "Good job!", grade letter). Never body.
          <br />
          <b>Baloo 2</b> 700–800 — UI: buttons, labels, badges, zone names.
          <br />
          <b>Nunito</b> 800–900 — message body. Card text is the largest thing on screen:
          <b> 27px / 1.34</b>, never below 24px.
        </Sec>
        <Sec t="Component list (V1)">
          Logo wordmark · subtitle lockup · chunky button (teal/orange/cream) · message card (+ highlight mark) ·
          drag stamps · decision zone (×2) + "or" coin · hearts (×3) · score bubble · streak starburst · pace bar +
          clock · feedback tag (correct/wrong/slow) · explanation sticker · confetti · tutorial overlay · pause
          overlay · game-over burst + accuracy ring + 3 stat tiles.
          <br />
          <b>Cut in V1:</b> coins, rewards, refill / + buttons, leaderboard, settings, daily rewards, social — none
          present.
        </Sec>
        <Sec t="Spacing & layout">
          8px base grid. Screen padding 16px. Card padding 20px. Gameplay = 4 fixed bands in a flex column (HUD ·
          pace · card · zones); the card band flexes to fill. Stack gaps 9–12px.
        </Sec>
        <Sec t="Card">
          Max-width 330px, fluid below. Charcoal border 3px, radius 22px. One highlight <code>&lt;mark&gt;</code>{' '}
          per card (orange marker at 30% alpha) on the "hook" phrase — present on legit AND sketchy cards so it never
          reveals the answer. Halftone is a faint corner accent only (34% opacity). Sticker shadow = hard 5px charcoal
          offset + soft 18px ambient. No ribbon, no footer chip — keep it clean.
        </Sec>
        <Sec t="Buttons & tap targets">
          Min tap target 56px tall; PLAY / primary ~64px. Swipe zones ≥78px tall, full half-width. Chunky 3D = 3px
          charcoal border + 6px solid colored bottom shadow; <code>:active</code> drops 5px.
        </Sec>
        <Sec t="Swipe zones">
          Two equal halves + an "or" coin on the seam. Left = orange <b>Sketchy</b> (S glyph), right = teal{' '}
          <b>Legit</b> (✓). No "(scam)/(not a scam)" subtitles. Tiny "Swipe left / Swipe right" helper shows on the{' '}
          <b>first 3 cards only</b>, then hides. Both are tap targets AND drag indicators: dragging past ±30px lights
          the matching zone (+12% brightness, lifts 3px). Commit threshold 92px. Inputs are interchangeable:
          drag-throw, tap a zone, or <b>← / → arrow keys</b> on desktop.
        </Sec>
        <Sec t="Motion notes (per element)">
          <b>Card enter:</b> 420ms, translateY 28→0 + scale .9→1 + slight rotate, spring <code>(.2,1.2,.4,1)</code>.
          <br />
          <b>Swipe L/R:</b> card follows finger (rotate ≈ dx·0.05°); release past 92px throws it ±640px + 24° over
          460ms ease-out; under threshold springs back 350ms.
          <br />
          <b>Correct pop:</b> tag bursts in (scale .72→1, 420ms) + 14-particle confetti + score count-up + streak
          bump.
          <br />
          <b>Wrong shake:</b> 500ms horizontal shake on the card.
          <br />
          <b>Too slow wiggle:</b> 500ms rotate wiggle, gold tag, no heart lost.
          <br />
          <b>Heart loss:</b> the emptied heart does a 420ms pop/break.
          <br />
          <b>Streak increase:</b> starburst badge pops (pop-soft 400ms).
          <br />
          <b>Game over:</b> burst title scales in (500ms spring); stats fade up. All gated by{' '}
          <code>prefers-reduced-motion</code>; entrances animate transform only (never opacity) so content is never
          invisible mid-frame.
        </Sec>
        <Sec t="Feedback timing">
          On decision: card throws off → feedback tag bursts in → explanation sticker pops 120ms later → hold ~1.5s
          (correct) / 1.75s (wrong) / 1.65s (slow) → next card auto-enters. No "Next" button. Timer is paused during
          feedback and the tutorial. Slow costs no heart in V1.
        </Sec>
        <Sec t="Responsive / desktop">
          Mobile-first canvas 393×852. ≤640px wide (or ≤720px tall) → full-bleed, no bezel, <code>100dvh</code>.
          Larger → centered in a charcoal sticker phone frame on a halftone beige backdrop. One layout at all sizes;
          it letterboxes, never reflows.
        </Sec>
        <Sec t="Handoff (Phaser / React)">
          State machine: <code>start → play → over</code>, with <code>feedback</code> (correct/wrong/slow),{' '}
          <code>paused</code>, and first-run <code>tutorial</code> sub-states. 50-card deck, shuffled each round
          (Fisher–Yates). Speed curve: <b>9s</b> for the first 5 cards, <b>7s</b> through card 12, <b>6s</b> after.
          Scoring: 100 + streak·12 + timeBonus(≤60). 3 hearts: wrong −1; <b>timeout = "missed"</b> (no heart, no
          points, not counted in accuracy). Inputs: drag-throw, tap a zone, or ← / → keys. Best score in localStorage.
          Dev Notes are hidden from the public UI — press <b>"?"</b> to toggle. The "Sketchy!" wordmark + app-icon
          mark are CSS stand-ins; ship real logo art (mascot slots removed for MVP).
        </Sec>
      </div>
    </div>
  )
}
