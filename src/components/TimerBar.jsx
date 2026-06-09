import { ClockGlyph } from './icons.jsx'

/** Presentational pace bar; turns orange and glows when time runs low. */
export function TimerBar({ pct }) {
  const warn = pct <= 28
  return (
    <div className="timer">
      <ClockGlyph size={26} />
      <div className="track">
        <div className={`fill ${warn ? 'warn' : ''}`} style={{ width: `${Math.max(0, pct)}%` }} />
      </div>
    </div>
  )
}
