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
        <div className="app-badge">{mode.icon}</div>
        <h1>Trivia Swipe</h1>
        <p>Trust your gut. Swipe fast. Learn something.</p>
      </div>

      <section className="menu-panel">
        <p className="profile-copy">Choose a player. Progress is saved on this device.</p>
        <div className="menu-row">
          <label htmlFor="profile">Player</label>
          <select id="profile" value={activeProfile.id} onChange={(event) => onSelectProfile(event.target.value)}>
            {profiles.map((profile) => (
              <option value={profile.id} key={profile.id}>
                {profile.name}
              </option>
            ))}
          </select>
        </div>
        <form className="profile-form" onSubmit={submitProfile}>
          <input
            value={name}
            maxLength={18}
            placeholder="New player name"
            onChange={(event) => setName(event.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </section>

      <section className="menu-panel">
        <h2>Choose Game</h2>
        <div className="option-grid">
          {Object.values(TRIVIA_MODES).map((item) => (
            <button
              className={`option-card ${modeId === item.id ? 'selected' : ''}`}
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
      </section>

      <section className="menu-panel">
        <h2>Difficulty</h2>
        <div className="option-grid">
          {Object.values(DIFFICULTIES).map((item) => (
            <button
              className={`option-card ${difficulty === item.id ? 'selected' : ''}`}
              type="button"
              key={item.id}
              onClick={() => onDifficultyChange(item.id)}
            >
              <strong>{item.label}</strong>
              <small>{item.description}</small>
            </button>
          ))}
        </div>
      </section>

      <div className="menu-summary">
        <span>{activeProfile.name}</span>
        <span>{mode.shortTitle}</span>
        <span>{DIFFICULTIES[difficulty].label}</span>
        <strong>Best {bestScore.toLocaleString()}</strong>
      </div>

      <button className="sound-toggle" aria-label={soundEnabled ? 'Sound On' : 'Muted'} onClick={onToggleSound}>
        {soundEnabled ? 'Sound On' : 'Muted'}
      </button>
      <button className="primary-button" onClick={onPlay}>
        Play
      </button>
      <p className="small-instruction">{mode.labels.instruction}</p>
    </div>
  )
}
