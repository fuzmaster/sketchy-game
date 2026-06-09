/**
 * Wrap a card's "hook" phrase (`hl`) in a highlight <mark>, leaving the rest as
 * plain text. Returns the original string if there's no hook or no match.
 * Shared by the play card and the post-game review list.
 */
export function renderHighlight(text, hl) {
  if (!hl) return text
  const i = text.indexOf(hl)
  if (i < 0) return text
  return [
    <span key="a">{text.slice(0, i)}</span>,
    <mark className="hl" key="b">
      {hl}
    </mark>,
    <span key="c">{text.slice(i + hl.length)}</span>,
  ]
}
