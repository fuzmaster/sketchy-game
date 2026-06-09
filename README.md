# Trivia Swipe

A polished React + Vite swipe trivia hub with two local games:

- **Fresh or Fake**: weird food facts, true or false.
- **Scam Spotter**: suspicious messages, sketchy or legit.

## Getting Started

```bash
npm install
npm run dev
npm run build
npm run preview
```

Open the printed local URL, usually `http://localhost:5173`.

## How To Play

- Choose a player profile from the menu, or create a new local profile.
- Choose **Food Facts** or **Scam Spotter**.
- Choose **Easy** or **Hard**.
- Swipe right, tap the right answer, or press **Right Arrow**.
- Swipe left, tap the left answer, or press **Left Arrow**.
- Press **Escape** to pause.
- Wrong answers cost one heart.
- Timeouts count as missed, give no points, and do not cost hearts.
- Accuracy is based only on answered cards.
- Best scores and lifetime profile progress are saved in `localStorage`.

## MVP Scope

- 3 hearts.
- 50 food fact cards, balanced 25 Fresh / 25 Fake.
- 20 scam-spotting cards, balanced 10 Legit / 10 Sketchy.
- Shuffled deck every run.
- Local profiles with per-game/per-difficulty best scores.
- First-session tutorial.
- Pause, restart, game over, and review missed/wrong cards.
- No backend, accounts, payments, ads, categories, or external APIs.

## Project Structure

```text
src/
  App.jsx
  main.jsx
  styles.css
  game/
    foodCards.js
    scamCards.js
    triviaModes.js
    rules.js
    scoring.js
  utils/
    shuffle.js
  components/
    FeedbackOverlay.jsx
    FoodCard.jsx
    GameOverScreen.jsx
    GameScreen.jsx
    PauseMenu.jsx
    ReviewScreen.jsx
    StartScreen.jsx
    TimerBar.jsx
    TutorialOverlay.jsx
```
