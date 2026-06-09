import { ACHIEVEMENTS } from '../game/achievements.js'

/** Full list of achievements with locked / unlocked state for a profile. */
export function AchievementsScreen({ profile, onBack }) {
  const owned = profile.achievements || {}
  const unlockedCount = ACHIEVEMENTS.filter((a) => owned[a.id]).length

  return (
    <div className="screen achievements-screen">
      <header className="achievements-head">
        <button type="button" className="ghost-button" onClick={onBack} aria-label="Back">
          ←
        </button>
        <h2>Achievements</h2>
        <span className="achievements-count">
          {unlockedCount}/{ACHIEVEMENTS.length}
        </span>
      </header>

      <ul className="achievements-list">
        {ACHIEVEMENTS.map((achievement) => {
          const unlocked = Boolean(owned[achievement.id])
          return (
            <li key={achievement.id} className={`achievement-row ${unlocked ? 'unlocked' : 'locked'}`}>
              <span className="achievement-icon" aria-hidden="true">
                {unlocked ? achievement.icon : '🔒'}
              </span>
              <span className="achievement-meta">
                <strong>{achievement.name}</strong>
                <small>{achievement.description}</small>
              </span>
              <span className={`achievement-rarity ${achievement.rarity}`}>{achievement.rarity}</span>
            </li>
          )
        })}
      </ul>

      <button type="button" className="primary-button" onClick={onBack}>
        Done
      </button>
    </div>
  )
}
