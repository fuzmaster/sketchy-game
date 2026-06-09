import { sfxManifest } from './sfxManifest.js'

const SOUND_KEY = 'triviaSwipe.soundEnabled.v1'

let ctx = null
let enabled = localStorage.getItem(SOUND_KEY) !== 'off'
const buffers = new Map()

function audioContext() {
  if (!enabled || typeof window === 'undefined') return null
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass) return null
  try {
    if (!ctx) ctx = new AudioContextClass()
    if (ctx.state === 'suspended') ctx.resume().catch(() => {})
    return ctx
  } catch {
    return null
  }
}

export function unlockAudio() {
  audioContext()
}

export function isSoundEnabled() {
  return enabled
}

export function setSoundEnabled(nextEnabled) {
  enabled = Boolean(nextEnabled)
  localStorage.setItem(SOUND_KEY, enabled ? 'on' : 'off')
  if (enabled) unlockAudio()
}

async function playAsset(name) {
  const path = sfxManifest[name]
  if (!path) return false
  const context = audioContext()
  if (!context) return true
  try {
    if (!buffers.has(name)) {
      const response = await fetch(path)
      const data = await response.arrayBuffer()
      buffers.set(name, await context.decodeAudioData(data))
    }
    const source = context.createBufferSource()
    const gain = context.createGain()
    source.buffer = buffers.get(name)
    gain.gain.value = 0.35
    source.connect(gain).connect(context.destination)
    source.start()
    return true
  } catch {
    return false
  }
}

function tone({ frequency = 440, duration = 0.08, type = 'sine', delay = 0, volume = 0.06, slideTo = null }) {
  const context = audioContext()
  if (!context) return
  const start = context.currentTime + delay
  const oscillator = context.createOscillator()
  const gain = context.createGain()

  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, start)
  if (slideTo) oscillator.frequency.exponentialRampToValueAtTime(slideTo, start + duration)
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)

  oscillator.connect(gain).connect(context.destination)
  oscillator.start(start)
  oscillator.stop(start + duration + 0.02)
}

function generated(name, pattern) {
  return () => {
    if (!enabled) return
    playAsset(name).then((usedAsset) => {
      if (!usedAsset) pattern()
    })
  }
}

export const playTap = generated('tap', () => tone({ frequency: 720, duration: 0.035, type: 'triangle', volume: 0.035 }))
export const playSwipe = generated('swipe', () =>
  tone({ frequency: 420, slideTo: 980, duration: 0.09, type: 'sine', volume: 0.04 }),
)
export const playCorrect = generated('correct', () => {
  tone({ frequency: 620, duration: 0.075, type: 'triangle', volume: 0.055 })
  tone({ frequency: 900, duration: 0.09, type: 'triangle', delay: 0.075, volume: 0.055 })
})
export const playWrong = generated('wrong', () =>
  tone({ frequency: 210, slideTo: 150, duration: 0.12, type: 'square', volume: 0.035 }),
)
export const playTimeout = generated('timeout', () =>
  tone({ frequency: 300, duration: 0.12, type: 'triangle', volume: 0.035 }),
)
export const playStreak = generated('streak', () => {
  tone({ frequency: 700, duration: 0.055, type: 'sine', volume: 0.045 })
  tone({ frequency: 920, duration: 0.055, type: 'sine', delay: 0.055, volume: 0.045 })
  tone({ frequency: 1180, duration: 0.08, type: 'sine', delay: 0.11, volume: 0.045 })
})
export const playHeartLost = generated('heartLost', () =>
  tone({ frequency: 130, duration: 0.11, type: 'triangle', volume: 0.05 }),
)
export const playGameOver = generated('gameOver', () => {
  tone({ frequency: 520, duration: 0.09, type: 'triangle', volume: 0.045 })
  tone({ frequency: 390, duration: 0.09, type: 'triangle', delay: 0.09, volume: 0.045 })
  tone({ frequency: 260, duration: 0.13, type: 'triangle', delay: 0.18, volume: 0.045 })
})
export const playDeckSelect = generated('deckSelect', () =>
  tone({ frequency: 560, slideTo: 760, duration: 0.09, type: 'triangle', volume: 0.045 }),
)
export const playPause = generated('pause', () => tone({ frequency: 380, duration: 0.05, type: 'sine', volume: 0.035 }))
export const playResume = generated('resume', () => tone({ frequency: 540, duration: 0.05, type: 'sine', volume: 0.035 }))
