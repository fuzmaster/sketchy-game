export function TimerBar({ percent }) {
  return (
    <div className="timer-wrap">
      <div className="timer-track" aria-label="Timer">
        <div className="timer-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="timer-copy">{percent < 35 ? 'Trust your gut!' : percent < 70 ? 'Fresh or fake?' : 'Quick bite!'}</span>
    </div>
  )
}
