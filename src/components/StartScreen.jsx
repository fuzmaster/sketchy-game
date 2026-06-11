import { useState } from 'react'
import { COMING_SOON_DECKS, DIFFICULTIES, TRIVIA_MODES } from '../game/triviaModes.js'
import { ACHIEVEMENTS } from '../game/achievements.js'
import { AVATARS, DEFAULT_AVATAR_ID, getAvatar } from '../game/avatars.js'
import { AvatarBadge, AvatarPicker } from './AvatarPicker.jsx'
import { Mascot } from './Mascot.jsx'
import { gusBadge } from '../brand/gusArt.js'

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
  onSetAvatar,
  onModeChange,
  onDifficultyChange,
  onToggleSound,
  onOpenAchievements,
  onResetData,
  onPlay,
}) {
  const [name, setName] = useState('')
  const [newAvatar, setNewAvatar] = useState(DEFAULT_AVATAR_ID)
  const [editingAvatar, setEditingAvatar] = useState(false)

  const unlockedCount = ACHIEVEMENTS.filter((a) => activeProfile.achievements?.[a.id]).length
  const profileAvatar = getAvatar(activeProfile.avatar)

  function submitProfile(event) {
    event.preventDefault()
    onCreateProfile(name, newAvatar)
    setName('')
    setNewAvatar(DEFAULT_AVATAR_ID)
  }

  function confirmReset() {
    if (window.confirm('Reset all local Gut Check data on this device? Profiles, scores, and achievements will be erased.')) {
      onResetData()
    }
  }

  return (
    <div className="screen start-screen menu-screen">
      <div className="brand-lockup compact">
        <Mascot size={112} />
        <div className="wm" role="img" aria-label="Gut Check">
          <span className="wm-rim" aria-hidden="true">Gut Check</span>
          <span className="wm-ink">
            <span className="g">Gut</span> <span className="c">Check</span>
          </span>
        </div>
        <p>Trust your gut. Swipe fast. Learn something.</p>
      </div>

      <section className="launch-panel">
        <div className="profile-strip">
          <button
            type="button"
            className="profile-avatar-button"
            aria-label="Change avatar"
            onClick={() => setEditingAvatar((open) => !open)}
          >
            <AvatarBadge avatar={profileAvatar} size={44} />
          </button>
          <div>
            <strong>{activeProfile.name}</strong>
            <span>Local profile · this device</span>
          </div>
          <select aria-label="Choose player" value={activeProfile.id} onChange={(event) => onSelectProfile(event.target.value)}>
            {profiles.map((profile) => (
              <option value={profile.id} key={profile.id}>
                {profile.name}
              </option>
            ))}
          </select>
        </div>

        {editingAvatar && (
          <AvatarPicker
            value={activeProfile.avatar}
            onChange={(id) => {
              onSetAvatar(id)
            }}
          />
        )}

        <form className="profile-form compact-profile-form" onSubmit={submitProfile}>
          <button
            type="button"
            className="new-avatar-chip"
            aria-label="Pick avatar for new player"
            title={getAvatar(newAvatar).name}
            onClick={() => setNewAvatar((current) => nextAvatarId(current))}
          >
            <AvatarBadge avatar={newAvatar} size={34} />
          </button>
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
              <span className="deck-badge" aria-hidden="true" dangerouslySetInnerHTML={{ __html: gusBadge(item.id, { size: 44 }) }} />
              <strong>{item.shortTitle}</strong>
              <small>{item.description}</small>
            </button>
          ))}
          {COMING_SOON_DECKS.map((item) => (
            <button
              className="deck-card coming-soon"
              type="button"
              key={item.id}
              disabled
              aria-disabled="true"
              title="Coming soon"
            >
              <span>{item.icon}</span>
              <strong>{item.shortTitle}</strong>
              <small>Coming soon</small>
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

        <div className="menu-actions">
          <button type="button" className="ghost-button" onClick={onOpenAchievements}>
            🏅 Achievements {unlockedCount}/{ACHIEVEMENTS.length}
          </button>
          <button type="button" className="ghost-button" onClick={onToggleSound} aria-label={soundEnabled ? 'Sound On' : 'Muted'}>
            {soundEnabled ? '🔊 Sound On' : '🔇 Muted'}
          </button>
        </div>

        <button type="button" className="reset-link" onClick={confirmReset}>
          Reset local data
        </button>
      </section>
    </div>
  )
}

const AVATAR_IDS = AVATARS.map((avatar) => avatar.id)

function nextAvatarId(currentId) {
  const index = AVATAR_IDS.indexOf(currentId)
  return AVATAR_IDS[(index + 1) % AVATAR_IDS.length]
}
