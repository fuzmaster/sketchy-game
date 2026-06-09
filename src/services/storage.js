/* ============================================================
   Gut Check — versioned localStorage primitives.
   All persistence goes through here so keys are namespaced/versioned and
   reads degrade gracefully on corrupted or unavailable storage.
   ============================================================ */

export const STORAGE_VERSION = 1
const ns = (key) => `gutcheck:v${STORAGE_VERSION}:${key}`

export const KEYS = {
  profiles: ns('profiles'),
  activeProfile: ns('activeProfile'),
  settings: ns('settings'),
  migratedFrom: ns('migratedFrom'),
}

/** Legacy (pre-versioned) keys, kept only for one-time migration. */
export const LEGACY_KEYS = {
  profiles: 'fresh-or-fake.profiles',
  activeProfile: 'fresh-or-fake.activeProfile',
}

export function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (raw == null) return fallback
    const value = JSON.parse(raw)
    return value == null ? fallback : value
  } catch {
    return fallback
  }
}

export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    // Quota exceeded, private mode, or storage disabled — fail soft.
    return false
  }
}

export function readString(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key)
    return raw == null ? fallback : raw
  } catch {
    return fallback
  }
}

export function writeString(key, value) {
  try {
    localStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

export function removeKeys(keys) {
  for (const key of keys) {
    try {
      localStorage.removeItem(key)
    } catch {
      /* ignore */
    }
  }
}

/** Wipe everything Gut Check owns (current + legacy keys). */
export function clearAllGutCheckData() {
  removeKeys([...Object.values(KEYS), ...Object.values(LEGACY_KEYS)])
}
