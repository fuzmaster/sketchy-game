import { useState } from 'react'
import { DIFFICULTIES, TRIVIA_MODES } from '../game/triviaModes.js'

export function StartScreen({
  activeProfile,
  profiles,
  mode,
  modeId,
  difficulty,
  bestScore,
  soundEnabled,
  onCreateProfile,
  onSelectProfile,
  onModeChange,
  onDifficultyChange,
  onToggleSound,
  onPlay,
}) {
  const [name, setName] = useState('')

  function submitProfile(event) {
    event.preventDefault()
    onCreateProfile(name)
    setName('')
  }

  return (
    <div className="screen start-screen menu-screen">
      <div className="brand-lockup compact">
        <div className="gut-check-mark" aria-hidden="true">
          <span />
        </div>
        <h1>Gut Check</h1>
        <p>Swipe with your gut. Learn the tell.</p>
      </div>

      <section className="launch-panel">
        <div className="profile-strip">
          <div>
            <strong>{activeProfile.name}</strong>
            <span>Saved on this device</span>
          </div>
          <select aria-label="Choose player" value={activeProfile.id} onChange={(event) => onSelectProfile(event.target.value)}>
            {profiles.map((profile) => (
              <option value={profile.id} key={profile.id}>
                {profile.name}
              </option>
            ))}
          </select>
        </div>

        <form className="profile-form compact-profile-form" onSubmit={submitProfile}>
          <input
            value={name}
            maxLength={18}
            placeholder="New player"
            aria-label="New player name"
            onChange={(event) => setName(event.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        <div className="deck-grid" aria-label="Choose deck">
          {Object.values(TRIVIA_MODES).map((item) => (
            <button
              className={`deck-card ${modeId === item.id ? 'selected' : ''}`}
              type="button"
              key={item.id}
              onClick={() => onModeChange(item.id)}
            >
              <span>{item.icon}</span>
              <strong>{item.shortTitle}</strong>
              <small>{item.description}</small>
            </button>
          ))}
        </div>

        <div className="difficulty-tabs" aria-label="Choose difficulty">
          {Object.values(DIFFICULTIES).map((item) => (
            <button
              className={difficulty === item.id ? 'selected' : ''}
              type="button"
              key={item.id}
              onClick={() => onDifficultyChange(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="menu-summary">
          <span>{mode.shortTitle}</span>
          <span>{DIFFICULTIES[difficulty].label}</span>
          <strong>Best {bestScore.toLocaleString()}</strong>
        </div>

        <button className="primary-button" onClick={onPlay}>
          Play
        </button>

        <button className="sound-toggle" aria-label={soundEnabled ? 'Sound On' : 'Muted'} onClick={onToggleSound}>
          {soundEnabled ? 'Sound On' : 'Muted'}
        </button>
      </section>
    </div>
  )
}
