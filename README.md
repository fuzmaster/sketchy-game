# Sketchy! — Scam Spotter

A fast, swipe-to-judge game: read each message and decide whether it's a
**scam (Sketchy)** or **safe (Legit)** before the timer runs out.

This is a clean React + Vite rebuild of the original single-file prototype,
restructured into proper modules while preserving the comic/sticker visual
style and the exact game rules.

## Getting started

```bash
npm install
npm run dev      # start the dev server (Vite)
npm run build    # production build to dist/
npm run preview  # preview the production build
```

Open the printed local URL (default http://localhost:5173).

## How to play

- **Read** the message on the card.
- **Sketchy?** Swipe **left**, tap the orange zone, or press **←**.
- **Legit?** Swipe **right**, tap the teal zone, or press **→**.
- You have **3 hearts**. A wrong answer costs one heart. Letting the timer run
  out is a **miss** — no heart lost, no points, and it doesn't count against
  your accuracy.
- The deck is 50 cards, reshuffled every round. Your best score is saved
  locally.

Press **`?`** at any time to toggle the hidden **Dev Notes** panel (design
system + handoff reference).

## Game rules

| Rule | Value |
| --- | --- |
| Deck | 50 cards, Fisher–Yates shuffle each round |
| Lives | 3 (wrong = −1; timeout = miss, no penalty) |
| Pace | 9s for cards 1–5, 7s through card 12, 6s after |
| Score | `100 + streak × 12 + timeBonus` (time bonus 0–60) |
| Accuracy | correct ÷ decisions made (timeouts excluded) |
| Grade | A ≥ 90 · B ≥ 75 · C ≥ 60 · D ≥ 40 · F otherwise |
| End | Game over when hearts hit 0, or the deck is cleared |

## Project structure

```
src/
  main.jsx              # React entry; imports global + component styles
  App.jsx               # state machine: start → play → over

  game/
    cards.js            # the 50-card deck + channel labels
    rules.js            # deck build, pacing, scoring, grading, constants

  hooks/
    useCountUp.js       # animated number count-up

  utils/
    starburst.js        # comic starburst clip-path generator

  components/
    icons.jsx           # channel icons, glyphs, motion doodles
    Brand.jsx           # logo wordmark, subtitle, app badge
    Button.jsx          # chunky 3D button
    Hearts.jsx          # lives display
    ScoreBadge.jsx      # speech-bubble score
    StreakBadge.jsx     # starburst streak
    TimerBar.jsx        # presentational pace bar
    LiveTimer.jsx       # self-ticking countdown
    Confetti.jsx        # correct-answer burst
    MessageCard.jsx     # the message card + highlight
    DecisionZones.jsx   # Sketchy / Legit tap targets
    FeedbackTag.jsx     # correct / wrong / slow overlay
    HUD.jsx             # top bar (hearts · score · streak · pause)

  screens/
    StartScreen.jsx
    PlayScreen.jsx      # owns the drag / throw / keyboard interaction
    GameOverScreen.jsx
    PauseOverlay.jsx
    TutorialOverlay.jsx
    DevNotes.jsx        # hidden design/handoff reference ("?")

  styles/
    global.css          # design tokens, reset, layout shell, animations
    components.css       # comic/sticker component styles
```

## Design system

- **Palette:** orange `#FF4D2D` (sketchy/danger), teal `#00A79D`
  (legit/primary), charcoal `#1F2328` (outlines/text), cream `#FFF6EB`
  (fills), soft beige `#EDE5DA` (backdrop), gold `#F4C536` ("too slow" only).
- **Type:** Luckiest Guy (display pops), Baloo 2 (UI), Nunito (message body),
  loaded from Google Fonts.
- **Layout:** mobile-first 393×852 canvas. On phones it goes full-bleed; on
  larger screens it letterboxes inside a charcoal phone frame on a halftone
  backdrop — one layout that never reflows.

All motion is gated behind `prefers-reduced-motion`.

## Credits

The original `Sketchy.html` design lives in [`design/`](design/) for reference.
