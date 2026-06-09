/** Chunky 3D button. `variant` = teal | orange | cream; `play` swaps in the display font. */
export function Button({ variant = 'teal', children, onClick, style, className = '', play = false }) {
  return (
    <button
      className={`btn btn-${variant} ${play ? 'btn-play' : ''} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
