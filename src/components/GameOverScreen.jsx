export function GameOverScreen({
  mode,
  difficulty,
  profile,
  score,
  bestScore,
  accuracy,
  stats,
  hasReview,
  onPlayAgain,
  onReview,
  onHome,
}) {
  const title = accuracy >= 80 ? 'Good job!' : stats.missed > stats.correct ? 'Kitchen closed!' : 'Nice run!'

  return (
    <div className="screen gameover-screen">
      <div className="result-burst">
        <span>🍽</span>
        <h1>{title}</h1>
        <p>
          {profile.name} · {mode.shortTitle} · {difficulty}
        </p>
      </div>
      <div className="stats-grid">
        <Stat label="Score" value={score.toLocaleString()} />
        <Stat label="Best" value={bestScore.toLocaleString()} />
        <Stat label="Accuracy" value={`${accuracy}%`} />
        <Stat label="Best streak" value={`x${stats.bestStreak}`} />
        <Stat label="Correct" value={stats.correct} />
        <Stat label="Wrong" value={stats.wrong} />
        <Stat label="Missed" value={stats.missed} />
      </div>
      <div className="button-stack">
        <button className="primary-button" onClick={onPlayAgain}>
          Play Again
        </button>
        <button className="secondary-button" onClick={onReview} disabled={!hasReview}>
          Review Missed
        </button>
        <button className="secondary-button" onClick={onHome}>
          Home
        </button>
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}
