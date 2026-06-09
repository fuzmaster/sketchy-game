/* ============================================================
   Gut Check — local profile service ("Local Profiles", NOT cloud accounts).
   These profiles live only in this browser. No auth, no server, no sync.

   This file defines an account-ready interface. The default export is the
   LOCAL adapter. A future remote adapter (Supabase/Firebase/etc.) must
   implement the same shape AND satisfy docs/PRE_SHIP_CHECKLIST.md (real auth,
   server-side validation, RLS, rate limits, bot protection) before it ships.
   ============================================================ */
import { DEFAULT_AVATAR_ID } from '../game/avatars.js'
import { KEYS, LEGACY_KEYS, readJSON, writeJSON, readString, writeString, clearAllGutCheckData } from './storage.js'

const GUEST = { id: 'guest', name: 'Guest', avatar: DEFAULT_AVATAR_ID }

export function makeProfile({ id, name, avatar = DEFAULT_AVATAR_ID }) {
  const now = Date.now()
  return {
    id,
    name,
    avatar,
    totalGames: 0,
    totalCorrect: 0,
    totalWrong: 0,
    totalMissed: 0,
    totalScore: 0,
    bestScoreByDeck: {},
    bestStreakByDeck: {},
    accuracyByDeck: {}, // deckId -> { correct, answered }
    deckPlays: {}, // deckId -> count
    mathAnswered: 0,
    achievements: {}, // achievementId -> unlockedAt (ms)
    favoriteDeck: null,
    createdAt: now,
    updatedAt: now,
  }
}

/** Fill in any missing fields so older / corrupted records stay usable. */
export function normalizeProfile(raw) {
  if (!raw || typeof raw !== 'object') return makeProfile({ ...GUEST, id: `profile-${Date.now()}` })
  const base = makeProfile({ id: raw.id || `profile-${Date.now()}`, name: raw.name || 'Player', avatar: raw.avatar })
  return {
    ...base,
    ...raw,
    avatar: raw.avatar || base.avatar,
    bestScoreByDeck: { ...raw.bestScoreByDeck },
    bestStreakByDeck: { ...raw.bestStreakByDeck },
    accuracyByDeck: { ...raw.accuracyByDeck },
    deckPlays: { ...raw.deckPlays },
    achievements: { ...raw.achievements },
    createdAt: raw.createdAt || base.createdAt,
    updatedAt: raw.updatedAt || base.updatedAt,
  }
}

function defaultProfiles() {
  return [makeProfile(GUEST)]
}

/** One-time migration from the pre-versioned `fresh-or-fake.*` keys. */
function migrateLegacyIfNeeded() {
  if (readString(KEYS.migratedFrom)) return
  const already = readJSON(KEYS.profiles, null)
  if (Array.isArray(already) && already.length) {
    writeString(KEYS.migratedFrom, 'noop')
    return
  }
  const legacy = readJSON(LEGACY_KEYS.profiles, null)
  if (Array.isArray(legacy) && legacy.length) {
    const migrated = legacy.map((old) => {
      const profile = normalizeProfile(old)
      profile.totalGames = old.gamesPlayed || 0
      profile.totalCorrect = old.totalCorrect || 0
      profile.totalWrong = old.totalWrong || 0
      profile.totalMissed = old.totalMissed || 0
      // old bestScores were keyed `${deck}.${difficulty}` — collapse to per-deck best.
      for (const [key, value] of Object.entries(old.bestScores || {})) {
        const deckId = String(key).split('.')[0]
        profile.bestScoreByDeck[deckId] = Math.max(profile.bestScoreByDeck[deckId] || 0, value || 0)
      }
      return profile
    })
    writeJSON(KEYS.profiles, migrated)
    const activeLegacy = readString(LEGACY_KEYS.activeProfile)
    if (activeLegacy) writeString(KEYS.activeProfile, activeLegacy)
  }
  writeString(KEYS.migratedFrom, LEGACY_KEYS.profiles)
}

export const localAuthService = {
  isRemote: false,

  listProfiles() {
    migrateLegacyIfNeeded()
    const saved = readJSON(KEYS.profiles, null)
    if (!Array.isArray(saved) || !saved.length) {
      const fresh = defaultProfiles()
      writeJSON(KEYS.profiles, fresh)
      return fresh
    }
    return saved.map(normalizeProfile)
  },

  saveProfiles(profiles) {
    writeJSON(KEYS.profiles, profiles)
    return profiles
  },

  getActiveProfileId() {
    return readString(KEYS.activeProfile) || this.listProfiles()[0].id
  },

  setActiveProfileId(id) {
    writeString(KEYS.activeProfile, id)
    return id
  },

  createProfile({ name, avatar }) {
    const cleanName = String(name || '').trim().slice(0, 18)
    if (!cleanName) return null
    const profiles = this.listProfiles()
    const profile = makeProfile({ id: `profile-${Date.now()}`, name: cleanName, avatar })
    const next = [...profiles, profile]
    this.saveProfiles(next)
    this.setActiveProfileId(profile.id)
    return { profiles: next, profile }
  },

  updateProfile(id, patch) {
    const next = this.listProfiles().map((profile) =>
      profile.id === id ? { ...profile, ...patch, updatedAt: Date.now() } : profile,
    )
    this.saveProfiles(next)
    return next
  },

  deleteProfile(id) {
    const remaining = this.listProfiles().filter((profile) => profile.id !== id)
    const next = remaining.length ? remaining : defaultProfiles()
    this.saveProfiles(next)
    if (this.getActiveProfileId() === id) this.setActiveProfileId(next[0].id)
    return next
  },

  resetAll() {
    clearAllGutCheckData()
    const fresh = defaultProfiles()
    writeJSON(KEYS.profiles, fresh)
    this.setActiveProfileId(fresh[0].id)
    return fresh
  },
}

// Local-only today. Swap for a remote adapter ONLY after the security gate.
export const authService = localAuthService
export default authService
