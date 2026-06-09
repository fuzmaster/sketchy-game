import { ChannelIcon } from './icons.jsx'
import { CHANNEL_LABEL } from '../game/cards.js'
import { SWIPE_THRESHOLD } from '../game/rules.js'
import { renderHighlight } from './highlight.jsx'

/**
 * The message card. `dx` is the live horizontal drag offset, used to fade the
 * SKETCHY / LEGIT stamps in as the player swipes.
 */
export function MessageCard({ card, dx = 0 }) {
  const sketchyOpacity = Math.max(0, Math.min(1, -dx / SWIPE_THRESHOLD))
  const legitOpacity = Math.max(0, Math.min(1, dx / SWIPE_THRESHOLD))

  return (
    <div className="msgcard">
      <span className="stamp sketchy" style={{ opacity: sketchyOpacity }}>
        SKETCHY
      </span>
      <span className="stamp legit" style={{ opacity: legitOpacity }}>
        LEGIT
      </span>
      <div className="msg-head">
        <span className="ch-ic">
          <ChannelIcon name={card.channel} size={30} />
        </span>
        <span className="ch-meta">
          <span className="ch-lab">{CHANNEL_LABEL[card.channel]}</span>
          <span className="ch-from">{card.from}</span>
        </span>
      </div>
      <div className="msg-body">{renderHighlight(card.text, card.hl)}</div>
    </div>
  )
}
