import { useEffect, useMemo, useRef, useState } from 'react'
import { TRIVIA_MODES } from './game/triviaModes.js'
import { cardDuration, FEEDBACK_HOLD, MAX_HEARTS, STORAGE_KEYS, SWIPE_THRESHOLD } from './game/rules.js'
import { scoreForCorrect } from './game/scoring.js'
import { shuffle } from './utils/shuffle.js'
import { comboLabelFor } from './game/comboMilestones.js'
import { validateDeck } from './game/deckValidation.js'
import { chooseCardsAvoidingSeen, markCardsSeen } from './game/seenCards.js'
import {
  isSoundEnabled,
  playCorrect,
  playDeckSelect,
  playGameOver,
  playHeartLost,
  playPause,
  playResume,
  playStreak,
  playTap,
  playTimeout,
  playWrong,
  setSoundEnabled,
  unlockAudio,
} from './audio/sfx.js'
import { StartScreen } from './components/StartScreen.jsx'
import { TutorialOverlay } from './components/TutorialOverlay.jsx'
import { GameScreen } from './components/GameScreen.jsx'
import { FeedbackOverlay } from './components/FeedbackOverlay.jsx'
import { PauseMenu } from './components/PauseMenu.jsx'
import { GameOverScreen } from './components/GameOverScreen.jsx'
import { ReviewScreen } from './components/ReviewScreen.jsx'

const freshStats = () => ({ correct: 0, wrong: 0, missed: 0, bestStreak: 0 })
const defaultProfiles = () => [
  {
    id: 'guest',
    name: 'Guest',
    bestScores: {},
    gamesPlayed: 0,
    totalCorrect: 0,
    totalWrong: 0,
    totalMissed: 0,
  },
]

function loadProfiles() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.profiles) || 'null')
    return Array.isArray(saved) && saved.length ? saved : defaultProfiles()
  } catch {
    return defaultProfiles()
  }
}

function saveProfiles(profiles) {
  localStorage.setItem(STORAGE_KEYS.profiles, JSON.stringify(profiles))
}

function progressKey(modeId, difficulty) {
  return `${modeId}.${difficulty}`
}

export default function App() {
  const [gameState, setGameState] = useState('start')
  const [previousState, setPreviousState] = useState('start')
  const [profiles, setProfiles] = useState(() => loadProfiles())
  const [activeProfileId, setActiveProfileId] = useState(
    () => localStorage.getItem(STORAGE_KEYS.activeProfile) || loadProfiles()[0].id,
  )
  const [modeId, setModeId] = useState('food')
  const [difficulty, setDifficulty] = useState('normal')
  const mode = TRIVIA_MODES[modeId]
  const [deck, setDeck] = useState(() => shuffle(mode.cards.filter((card) => card.confidence === 'high')))
  const [cardIndex, setCardIndex] = useState(0)
  const [hearts, setHearts] = useState(MAX_HEARTS)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [stats, setStats] = useState(() => freshStats())
  const [results, setResults] = useState([])
  const [feedback, setFeedback] = useState(null)
  const [comboBadge, setComboBadge] = useState(null)
  const [soundEnabled, setSoundEnabledState] = useState(() => isSoundEnabled())
  const [timerResetKey, setTimerResetKey] = useState(0)

  const actionLocked = useRef(false)
  const timeRemaining = useRef(cardDuration(0, difficulty) / 1000)
  const roundId = useRef(0)
  const activeCardId = useRef(null)
  const feedbackTimeout = useRef(null)

  const activeProfile = profiles.find((profile) => profile.id === activeProfileId) || profiles[0]
  const currentCard = deck[cardIndex]
  const duration = cardDuration(cardIndex, difficulty)
  const bestScore = activeProfile.bestScores?.[progressKey(modeId, difficulty)] || 0
  activeCardId.current = currentCard?.id ?? null

  const missedOrWrong = useMemo(
    () => results.filter((result) => result.resultType === 'wrong' || result.resultType === 'missed'),
    [results],
  )

  useEffect(() => {
    return () => {
      if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current)
    }
  }, [])

  useEffect(() => {
    const unlock = () => {
      unlockAudio()
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
    window.addEventListener('pointerdown', unlock)
    window.addEventListener('keydown', unlock)
    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
  }, [])

  useEffect(() => {
    if (!import.meta.env.DEV) return
    Object.values(TRIVIA_MODES).forEach((triviaMode) => {
      validateDeck(triviaMode.cards, { deckId: triviaMode.id })
    })
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.activeProfile, activeProfileId)
  }, [activeProfileId])

  function createProfile(name) {
    const cleanName = name.trim().slice(0, 18)
    if (!cleanName) return
    const profile = {
      id: `profile-${Date.now()}`,
      name: cleanName,
      bestScores: {},
      gamesPlayed: 0,
      totalCorrect: 0,
      totalWrong: 0,
      totalMissed: 0,
    }
    const nextProfiles = [...profiles, profile]
    setProfiles(nextProfiles)
    saveProfiles(nextProfiles)
    setActiveProfileId(profile.id)
  }

  function selectProfile(profileId) {
    playTap()
    setActiveProfileId(profileId)
  }

  function changeMode(nextModeId) {
    playDeckSelect()
    setModeId(nextModeId)
  }

  function changeDifficulty(nextDifficulty) {
    playDeckSelect()
    setDifficulty(nextDifficulty)
  }

  function toggleSound() {
    const next = !soundEnabled
    setSoundEnabled(next)
    setSoundEnabledState(next)
    if (next) playTap()
  }

  function resetTimerLock() {
    actionLocked.current = false
    timeRemaining.current = cardDuration(cardIndex, difficulty) / 1000
    setTimerResetKey((key) => key + 1)
  }

  function startRun() {
    unlockAudio()
    playTap()
    if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current)
    roundId.current += 1
    const launchCards = mode.cards.filter((card) => card.confidence === 'high')
    const nextDeck = chooseCardsAvoidingSeen(launchCards, { profileId: activeProfile.id, deckId: modeId })
    setDeck(nextDeck)
    setCardIndex(0)
    setHearts(MAX_HEARTS)
    setScore(0)
    setStreak(0)
    setStats(freshStats())
    setResults([])
    setFeedback(null)
    setComboBadge(null)
    actionLocked.current = false
    timeRemaining.current = cardDuration(0, difficulty) / 1000
    setTimerResetKey((key) => key + 1)
    const tutorialKey = `${STORAGE_KEYS.tutorialSeen}.${modeId}`
    setGameState(sessionStorage.getItem(tutorialKey) ? 'playing' : 'tutorial')
  }

  function finishTutorial() {
    playTap()
    sessionStorage.setItem(`${STORAGE_KEYS.tutorialSeen}.${modeId}`, '1')
    setGameState('playing')
    resetTimerLock()
  }

  function pause() {
    if (gameState !== 'playing') return
    playPause()
    setPreviousState(gameState)
    setGameState('paused')
  }

  function resume() {
    playResume()
    setGameState(previousState === 'playing' ? 'playing' : 'playing')
  }

  function goHome() {
    playTap()
    if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current)
    roundId.current += 1
    setFeedback(null)
    actionLocked.current = false
    setGameState('start')
  }

  function updateProfileProgress(finalScore, finalStats) {
    const key = progressKey(modeId, difficulty)
    const nextProfiles = profiles.map((profile) => {
      if (profile.id !== activeProfile.id) return profile
      return {
        ...profile,
        bestScores: {
          ...(profile.bestScores || {}),
          [key]: Math.max(profile.bestScores?.[key] || 0, finalScore),
        },
        gamesPlayed: (profile.gamesPlayed || 0) + 1,
        totalCorrect: (profile.totalCorrect || 0) + finalStats.correct,
        totalWrong: (profile.totalWrong || 0) + finalStats.wrong,
        totalMissed: (profile.totalMissed || 0) + finalStats.missed,
      }
    })
    setProfiles(nextProfiles)
    saveProfiles(nextProfiles)
  }

  function endRun(finalScore = score, finalStats = stats, finalResults = results) {
    markCardsSeen(
      finalResults.map((result) => result.card),
      { profileId: activeProfile.id, deckId: modeId, maxStored: mode.cards.length },
    )
    updateProfileProgress(finalScore, finalStats)
    playGameOver()
    setFeedback(null)
    setStats(finalStats)
    setResults(finalResults)
    setGameState('gameover')
  }

  function advanceAfterFeedback(nextHearts, nextScore, nextStats, nextResults, resolvedCardId, resolvedRoundId) {
    if (resolvedRoundId !== roundId.current || activeCardId.current !== resolvedCardId) return
    setFeedback(null)
    actionLocked.current = false

    if (nextHearts <= 0 || cardIndex + 1 >= deck.length) {
      endRun(nextScore, nextStats, nextResults)
      return
    }

    setCardIndex((index) => index + 1)
    setTimerResetKey((key) => key + 1)
    setGameState('playing')
  }

  function resolveCard(playerAnswer, resultType = 'answered', cardId = currentCard?.id) {
    const resolvedCard = currentCard
    const resolvedRoundId = roundId.current
    if (!resolvedCard || resolvedCard.id !== cardId) return
    if (actionLocked.current || gameState !== 'playing') return
    actionLocked.current = true

    const wasMissed = resultType === 'missed'
    const wasCorrect = !wasMissed && playerAnswer === resolvedCard.answer
    const nextStreak = wasCorrect ? streak + 1 : 0
    const nextHearts = !wasMissed && !wasCorrect ? hearts - 1 : hearts
    const earned = wasCorrect ? scoreForCorrect(timeRemaining.current, nextStreak) : 0
    const nextScore = score + earned
    const result = {
      card: resolvedCard,
      playerAnswer,
      correctAnswer: resolvedCard.answer,
      wasCorrect,
      resultType: wasMissed ? 'missed' : wasCorrect ? 'correct' : 'wrong',
      explanation: resolvedCard.explanation,
      deckId: modeId,
      timestamp: Date.now(),
    }
    const nextStats = {
      correct: stats.correct + (wasCorrect ? 1 : 0),
      wrong: stats.wrong + (!wasMissed && !wasCorrect ? 1 : 0),
      missed: stats.missed + (wasMissed ? 1 : 0),
      bestStreak: Math.max(stats.bestStreak, nextStreak),
    }
    const nextResults = [...results, result]

    setScore(nextScore)
    setHearts(nextHearts)
    setStreak(nextStreak)
    setStats(nextStats)
    setResults(nextResults)
    setFeedback(result)
    setGameState('feedback')
    if (wasMissed) playTimeout()
    else if (wasCorrect) playCorrect()
    else {
      playWrong()
      playHeartLost()
    }
    const comboLabel = wasCorrect ? comboLabelFor(nextStreak) : null
    if (comboLabel) {
      setComboBadge(comboLabel)
      playStreak()
      setTimeout(() => setComboBadge(null), 1200)
    }

    feedbackTimeout.current = setTimeout(
      () => advanceAfterFeedback(nextHearts, nextScore, nextStats, nextResults, resolvedCard.id, resolvedRoundId),
      wasMissed ? FEEDBACK_HOLD.missed : wasCorrect ? FEEDBACK_HOLD.correct : FEEDBACK_HOLD.wrong,
    )
  }

  function showReview() {
    setGameState('review')
  }

  function closeReview() {
    setGameState('gameover')
  }

  const answered = stats.correct + stats.wrong
  const accuracy = answered ? Math.round((stats.correct / answered) * 100) : 0

  return (
    <main className="app-shell">
      <section className="phone-frame" aria-label="Trivia game menu">
        {gameState === 'start' && (
          <StartScreen
            activeProfile={activeProfile}
            profiles={profiles}
            mode={mode}
            modeId={modeId}
            difficulty={difficulty}
            bestScore={bestScore}
            soundEnabled={soundEnabled}
            onCreateProfile={createProfile}
            onSelectProfile={selectProfile}
            onModeChange={changeMode}
            onDifficultyChange={changeDifficulty}
            onToggleSound={toggleSound}
            onPlay={startRun}
          />
        )}

        {gameState === 'tutorial' && (
          <>
            <GameScreen
              card={currentCard}
              cardIndex={cardIndex}
              totalCards={deck.length}
              hearts={hearts}
              score={score}
              streak={streak}
              duration={duration}
              labels={mode.labels}
              soundEnabled={soundEnabled}
              timerActive={false}
              timerResetKey={timerResetKey}
              timeRemaining={timeRemaining}
              swipeThreshold={SWIPE_THRESHOLD}
              onAnswer={(answer, cardId) => resolveCard(answer, 'answered', cardId)}
              onTimeout={(cardId) => resolveCard(null, 'missed', cardId)}
              onPause={pause}
              onToggleSound={toggleSound}
            />
            <TutorialOverlay mode={mode} onDone={finishTutorial} />
          </>
        )}

        {(gameState === 'playing' || gameState === 'feedback' || gameState === 'paused') && (
          <GameScreen
            card={currentCard}
            cardIndex={cardIndex}
            totalCards={deck.length}
            hearts={hearts}
            score={score}
            streak={streak}
            duration={duration}
            labels={mode.labels}
            soundEnabled={soundEnabled}
            timerActive={gameState === 'playing'}
            timerResetKey={timerResetKey}
            timeRemaining={timeRemaining}
            swipeThreshold={SWIPE_THRESHOLD}
            onAnswer={(answer, cardId) => resolveCard(answer, 'answered', cardId)}
            onTimeout={(cardId) => resolveCard(null, 'missed', cardId)}
            onPause={pause}
            onToggleSound={toggleSound}
          />
        )}

        {gameState === 'feedback' && feedback && <FeedbackOverlay result={feedback} labels={mode.labels} />}
        {comboBadge && <div className="combo-badge">{comboBadge}</div>}

        {gameState === 'paused' && <PauseMenu onResume={resume} onRestart={startRun} onHome={goHome} />}

        {gameState === 'gameover' && (
          <GameOverScreen
            mode={mode}
            difficulty={difficulty}
            profile={activeProfile}
            score={score}
            bestScore={Math.max(bestScore, score)}
            accuracy={accuracy}
            stats={stats}
            hasReview={missedOrWrong.length > 0}
            takeaway={mode.takeaway}
            onPlayAgain={startRun}
            onReview={showReview}
            onHome={goHome}
          />
        )}

        {gameState === 'review' && (
          <ReviewScreen
            results={missedOrWrong}
            labels={mode.labels}
            onPlayAgain={startRun}
            onHome={goHome}
            onBack={closeReview}
          />
        )}
      </section>
    </main>
  )
}
