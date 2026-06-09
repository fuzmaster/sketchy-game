/* ============================================================
   SKETCHY!  —  app shell + game state machine
   Screens: start → play → over, with feedback / paused / tutorial
   sub-states layered over play.
   ============================================================ */
import { useEffect, useRef, useState } from 'react'
import { StartScreen } from './screens/StartScreen.jsx'
import { PlayScreen } from './screens/PlayScreen.jsx'
import { GameOverScreen } from './screens/GameOverScreen.jsx'
import { PauseOverlay } from './screens/PauseOverlay.jsx'
import { TutorialOverlay } from './screens/TutorialOverlay.jsx'
import { DevNotes } from './screens/DevNotes.jsx'
import {
  buildDeck,
  cardDuration,
  gradeFor,
  scoreForCorrect,
  timeBonus,
  CARD_TIME,
  FEEDBACK_HOLD,
  MAX_LIVES,
  STORAGE_KEYS,
} from './game/rules.js'

const freshStats = () => ({ answered: 0, correct: 0, scams: 0, bestStreak: 0, missed: 0 })

export default function App() {
  const [screen, setScreen] = useState('start') // start | play | over
  const [deck, setDeck] = useState(() => buildDeck())
  const [index, setIndex] = useState(0)
  const [lives, setLives] = useState(MAX_LIVES)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [paused, setPaused] = useState(false)
  const [confettiSeed, setConfettiSeed] = useState(0)
  const [summary, setSummary] = useState(null)
  const [devOpen, setDevOpen] = useState(false)
  const [tutorial, setTutorial] = useState(false)
  const [best, setBest] = useState(() => Number(localStorage.getItem(STORAGE_KEYS.best) || 0))

  // Tallies live in a ref so deferred timeouts read fresh values.
  const stats = useRef(freshStats())
  const timeRemaining = useRef(CARD_TIME)

  const card = deck[index]
  const duration = cardDuration(index)
  const locked = !!feedback || paused

  // Hidden Dev Notes toggle (not in the public UI) — press "?".
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '?') setDevOpen((o) => !o)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function startGame() {
    setDeck(buildDeck())
    setIndex(0)
    setLives(MAX_LIVES)
    setScore(0)
    setStreak(0)
    setFeedback(null)
    setPaused(false)
    setSummary(null)
    stats.current = freshStats()
    setTutorial(!localStorage.getItem(STORAGE_KEYS.tutorialSeen))
    setScreen('play')
  }

  function dismissTutorial() {
    setTutorial(false)
    localStorage.setItem(STORAGE_KEYS.tutorialSeen, '1')
  }

  function endGame(reason, finalScore) {
    const s = stats.current
    const accuracy = s.answered ? Math.round((s.correct / s.answered) * 100) : 0
    const fs = finalScore != null ? finalScore : score
    const newBest = fs > best
    if (newBest) {
      setBest(fs)
      localStorage.setItem(STORAGE_KEYS.best, String(fs))
    }
    setSummary({
      reason,
      score: fs,
      bestStreak: s.bestStreak,
      scamsSpotted: s.scams,
      accuracy,
      grade: gradeFor(accuracy),
      newBest,
    })
    setTimeout(() => setScreen('over'), 30)
  }

  function advance(nextLives) {
    setFeedback(null)
    if (nextLives <= 0) {
      endGame('phished')
      return
    }
    if (index + 1 >= deck.length) {
      endGame('survived')
      return
    }
    setIndex((i) => i + 1)
  }

  function handleDecide(choice) {
    if (locked) return
    const correct = choice === card.answer
    const s = stats.current
    s.answered++
    let nextLives = lives

    if (correct) {
      s.correct++
      if (card.answer === 'sketchy') s.scams++
      const nextStreak = streak + 1
      s.bestStreak = Math.max(s.bestStreak, nextStreak)
      const bonus = timeBonus(timeRemaining.current, cardDuration(index))
      setScore((v) => v + scoreForCorrect(nextStreak, bonus))
      setStreak(nextStreak)
      setConfettiSeed((x) => x + 1)
    } else {
      nextLives = lives - 1
      setLives(nextLives)
      setStreak(0)
    }

    setFeedback({ type: correct ? 'correct' : 'wrong', answer: card.answer, why: card.why })
    setTimeout(() => advance(nextLives), correct ? FEEDBACK_HOLD.correct : FEEDBACK_HOLD.wrong)
  }

  function handleTimeout() {
    if (locked) return
    const s = stats.current
    s.missed++ // tracked as "missed" — never a wrong answer, never in accuracy
    setStreak(0)
    setFeedback({ type: 'slow', answer: card.answer, why: card.why })
    setTimeout(() => advance(lives), FEEDBACK_HOLD.slow)
  }

  return (
    <div className="stage">
      <div className="device">
        <div className="screen">
          {screen === 'start' && <StartScreen onPlay={startGame} />}

          {screen === 'play' && (
            <PlayScreen
              card={card}
              cardIndex={index}
              lives={lives}
              score={score}
              streak={streak}
              feedback={feedback}
              paused={paused}
              confettiSeed={confettiSeed}
              duration={duration}
              tutorial={tutorial}
              timerActive={screen === 'play' && !feedback && !paused && !tutorial}
              timeRemaining={timeRemaining}
              onDecide={handleDecide}
              onTimeout={handleTimeout}
              onPause={() => setPaused(true)}
            />
          )}

          {screen === 'over' && summary && (
            <GameOverScreen summary={summary} onAgain={startGame} onMenu={() => setScreen('start')} />
          )}

          {screen === 'play' && tutorial && <TutorialOverlay onDismiss={dismissTutorial} />}

          {screen === 'play' && paused && (
            <PauseOverlay
              onResume={() => setPaused(false)}
              onRestart={startGame}
              onMenu={() => {
                setPaused(false)
                setScreen('start')
              }}
            />
          )}
        </div>
      </div>

      <DevNotes open={devOpen} onClose={() => setDevOpen(false)} />
    </div>
  )
}
