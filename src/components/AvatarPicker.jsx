import { AVATARS, getAvatar } from '../game/avatars.js'

/** A round avatar chip: the icon on the avatar's color. */
export function AvatarBadge({ avatar, size = 40 }) {
  const data = typeof avatar === 'string' ? getAvatar(avatar) : avatar || getAvatar()
  return (
    <span
      className="avatar-badge"
      style={{ width: size, height: size, background: data.color, fontSize: Math.round(size * 0.55) }}
      role="img"
      aria-label={data.name}
      title={data.name}
    >
      {data.icon}
    </span>
  )
}

/** A grid to choose one of the built-in avatars. */
export function AvatarPicker({ value, onChange }) {
  const selected = getAvatar(value)
  return (
    <div className="avatar-picker">
      <div className="avatar-grid" role="radiogroup" aria-label="Choose an avatar">
        {AVATARS.map((avatar) => (
          <button
            key={avatar.id}
            type="button"
            role="radio"
            aria-checked={avatar.id === selected.id}
            className={`avatar-option ${avatar.id === selected.id ? 'selected' : ''}`}
            style={{ background: avatar.color }}
            title={avatar.name}
            onClick={() => onChange(avatar.id)}
          >
            <span aria-hidden="true">{avatar.icon}</span>
          </button>
        ))}
      </div>
      <p className="avatar-caption">
        <strong>{selected.name}</strong> — {selected.tagline}
      </p>
    </div>
  )
}
