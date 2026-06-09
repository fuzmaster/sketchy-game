const LINKS = [
  { label: 'Portfolio', href: 'https://jacobbritten.com' },
  { label: 'Projects', href: 'https://jacobbritten.com/projects.html' },
  { label: 'The Lab', href: 'https://jacobbritten.com/lab.html' },
  { label: 'Ko-fi', href: 'https://ko-fi.com/jacobbritten' },
  {
    label: 'PayPal',
    href: 'https://www.paypal.com/donate/?hosted_button_id=47A4JJ4WNBY9U',
  },
]

/**
 * Small, themed attribution footer. Rendered on the teal app background below
 * the phone frame on desktop only (hidden on short/mobile viewports via CSS), so
 * it never reduces the playable area during gameplay.
 */
export function JbdFooter() {
  return (
    <footer className="jbd-footer">
      <p className="jbd-footer__by">
        Built by <strong>Jacob Britten</strong> — Media Systems Architect
      </p>
      <nav className="jbd-footer__nav" aria-label="Jacob Britten">
        {LINKS.map((link, i) => (
          <span key={link.href} className="jbd-footer__item">
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
            {i < LINKS.length - 1 && <span className="jbd-footer__sep" aria-hidden="true">·</span>}
          </span>
        ))}
      </nav>
    </footer>
  )
}
