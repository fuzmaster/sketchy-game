import { useEffect, useMemo, useRef, useState } from 'react'
import { TRIVIA_MODES } from './game/triviaModes.js'
import { cardDuration, FEEDBACK_HOLD, MAX_HEARTS, STORAGE_KEYS, SWIPE_THRESHOLD } from './game/rules.js'
import { scoreForCorrect } from './game/scoring.js'
import { shuffle } from './utils/shuffle.js'
import { comboLabelFor } from './game/comboMilestones.js'
import { validateDeck } from './game/deckValidation.js'
import { chooseCardsAvoidingSeen, markCardsSeen } from './game/seenCards.js'
import { authService } from './services/authService.js'
import { progressService } from './services/progressService.js'
import { leaderboardService } from './services/leaderboardService.js'
import { DEFAULT_AVATAR_ID } from './game/avatars.js'
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
import { AchievementsScreen } from './components/AchievementsScreen.jsx'
import { JbdFooter } from './components/JbdFooter.jsx'

const freshStats = () => ({ correct: 0, wrong: 0, missed: 0, bestStreak: 0 })

export default function App() {
  const [gameState, setGameState] = useState('start')
  const [previousState, setPreviousState] = useState('start')
  const [profiles, setProfiles] = useState(() => authService.listProfiles())
  const [activeProfileId, setActiveProfileId] = useState(() => authService.getActiveProfileId())
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
  const [runAchievements, setRunAchievements] = useState([])
  const [achievementToast, setAchievementToast] = useState(null)

  const actionLocked = useRef(false)
  const timeRemaining = useRef(cardDuration(0, difficulty) / 1000)
  const roundId = useRef(0)
  const activeCardId = useRef(null)
  const feedbackTimeout = useRef(null)
  const toastTimeout = useRef(null)

  const activeProfile = profiles.find((profile) => profile.id === activeProfileId) || profiles[0]
  const currentCard = deck[cardIndex]
  const duration = cardDuration(cardIndex, difficulty)
  const bestScore = leaderboardService.bestScore(activeProfile, modeId)
  activeCardId.current = currentCard?.id ?? null

  const missedOrWrong = useMemo(
    () => results.filter((result) => result.resultType === 'wrong' || result.resultType === 'missed'),
    [results],
  )

  useEffect(() => {
    return () => {
      if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current)
      if (toastTimeout.current) clearTimeout(toastTimeout.current)
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
      const labels = triviaMode.labels || {}
      validateDeck(triviaMode.cards, {
        deckId: triviaMode.id,
        validAnswers: labels.rightValue ? [labels.rightValue, labels.leftValue] : undefined,
      })
    })
  }, [])

  useEffect(() => {
    authService.setActiveProfileId(activeProfileId)
  }, [activeProfileId])

  function showAchievementToast(unlocked) {
    if (!unlocked.length) return
    setAchievementToast(unlocked[0])
    playStreak()
    if (toastTimeout.current) clearTimeout(toastTimeout.current)
    toastTimeout.current = setTimeout(() => setAchievementToast(null), 2600)
  }

  function createProfile(name, avatar = DEFAULT_AVATAR_ID) {
    const result = authService.createProfile({ name, avatar })
    if (!result) return
    setProfiles(result.profiles)
    setActiveProfileId(result.profile.id)
  }

  function selectProfile(profileId) {
    playTap()
    setActiveProfileId(profileId)
  }

  function setProfileAvatar(avatarId) {
    playTap()
    setProfiles(authService.updateProfile(activeProfileId, { avatar: avatarId }))
  }

  function resetLocalData() {
    const fresh = authService.resetAll()
    setProfiles(fresh)
    setActiveProfileId(fresh[0].id)
    setRunAchievements([])
    setGameState('start')
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
    setRunAchievements([])
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
    setGameState('playing')
  }

  function goHome() {
    playTap()
    if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current)
    roundId.current += 1
    setFeedback(null)
    actionLocked.current = false
    setGameState('start')
  }

  function openAchievements() {
    playTap()
    setPreviousState(gameState)
    setGameState('achievements')
  }

  function closeAchievements() {
    playTap()
    setGameState(previousState === 'gameover' ? 'gameover' : 'start')
  }

  function endRun(finalScore, finalStats, finalResults, heartsRemaining) {
    markCardsSeen(
      finalResults.map((result) => result.card),
      { profileId: activeProfile.id, deckId: modeId, maxStored: mode.cards.length },
    )
    const { newAchievements } = progressService.recordRun(activeProfile.id, {
      deckId: modeId,
      score: finalScore,
      stats: finalStats,
      results: finalResults,
      heartsRemaining,
      totalCards: deck.length,
    })
    setProfiles(authService.listProfiles())
    setRunAchievements(newAchievements)
    showAchievementToast(newAchievements)
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
      endRun(nextScore, nextStats, nextResults, nextHearts)
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
      pointsEarned: earned,
      timeRemaining: timeRemaining.current,
      streakAtAnswer: nextStreak,
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
    const { newAchievements } = progressService.markReviewOpened(activeProfile.id)
    if (newAchievements.length) {
      setProfiles(authService.listProfiles())
      setRunAchievements((prev) => [...prev, ...newAchievements])
      showAchievementToast(newAchievements)
    }
    setGameState('review')
  }

  function closeReview() {
    setGameState('gameover')
  }

  const answered = stats.correct + stats.wrong
  const accuracy = answered ? Math.round((stats.correct / answered) * 100) : 0

  return (
    <main className="app-shell">
      <section className="phone-frame" aria-label="Gut Check game menu">
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
            onSetAvatar={setProfileAvatar}
            onModeChange={changeMode}
            onDifficultyChange={changeDifficulty}
            onToggleSound={toggleSound}
            onOpenAchievements={openAchievements}
            onResetData={resetLocalData}
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
        {achievementToast && (
          <div className="achievement-toast" role="status">
            <span className="achievement-toast__icon" aria-hidden="true">
              {achievementToast.icon}
            </span>
            <span className="achievement-toast__text">
              <small>Achievement unlocked</small>
              <strong>{achievementToast.name}</strong>
            </span>
          </div>
        )}

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
            newAchievements={runAchievements}
            onPlayAgain={startRun}
            onReview={showReview}
            onAchievements={openAchievements}
            onHome={goHome}
          />
        )}

        {gameState === 'achievements' && (
          <AchievementsScreen profile={activeProfile} onBack={closeAchievements} />
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

      <JbdFooter />
    </main>
  )
}
