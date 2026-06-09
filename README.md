# Gut Check

**Trust your gut. Swipe fast. Learn something.**

Gut Check is a fast, mobile-first **swipe trivia** game. Read a card, trust your
gut, and swipe before the timer runs out. Spot fake claims, catch scams, and
build streaks — and pick up something useful along the way.

> Live demo: _add your deploy URL here_
>
> Screenshot: _add `docs/screenshot.png`_

## Features

- ⚡ Fast swipe / tap / keyboard play, mobile-first with a desktop frame.
- 🎴 Multiple trivia decks (see **Decks** below).
- ❤️ 3-heart run loop with a difficulty-aware timer.
- 🔥 Streaks and combo milestone feedback (no currencies, no pay-to-win).
- 👤 **Local profiles** with avatars and lifetime progress.
- 🏅 Local achievements.
- 🔁 Review missed/wrong cards after a run, with explanations.
- 🔊 Generated Web Audio sound effects with a persisted mute toggle.
- 🧠 First-session tutorial, pause, restart, and game-over summary.
- 💾 Everything saved locally in `localStorage` — no account or backend required.

## Game Modes

- **Practice / Classic** — randomized local rounds. This is the current mode.
- _Daily Challenge, Ranked Sprint_ — planned, and only meaningful with a real
  backend (see **Roadmap** and the account-ready notes below).

## Decks

| Deck | Status | Answer |
| --- | --- | --- |
| Fresh or Fake | ✅ Playable | swipe: Fake ⟵ / ⟶ Fresh |
| Scam Spotter | ✅ Playable | swipe: Sketchy ⟵ / ⟶ Legit |
| Quick Math | ✅ Playable | multiple-choice (tap / keys 1–4) |
| Weird Facts | ✅ Playable | swipe: No Way ⟵ / ⟶ True (sourced facts) |
| Animal Facts | ✅ Playable | swipe: Nope ⟵ / ⟶ For Real (sourced facts) |
| History Hits · Science Snacks | 🔜 Coming soon | — |

Card model supports `answerType: 'binary' | 'multiple-choice'` (with
`math-input` reserved for later), optional tiny `graphic`, and source fields.
Factual decks cite a real source — see `docs/CONTENT_SOURCING.md`.

Gameplay always runs from **bundled, curated card data**. No live scraping, no
runtime calls to external sources during play.

## Getting Started

```bash
npm install
npm run dev
npm run build
npm run preview
```

Open the printed local URL (usually `http://localhost:5173`).

## How to Play

- Pick a **local profile** (or create one) and an avatar.
- Choose a deck and a difficulty (Easy / Normal / Hard).
- **Swipe right / tap right / press →** for the right-hand answer.
- **Swipe left / tap left / press ←** for the left-hand answer.
- **Esc** pauses.
- Wrong answers cost a heart. Timeouts are "missed" — no points, no heart lost,
  and not counted in accuracy.
- Best scores, settings, avatar, and lifetime progress are saved on **this
  device**.

## Local Profiles (not cloud accounts)

Gut Check uses **local profiles**, not accounts. There is no sign-in, no server,
and no cloud sync. Profiles live only in this browser. The codebase ships with
**account-ready service interfaces** (`src/services/`) backed by local adapters,
so a real backend can be added later without rewiring the UI — but no online
account system exists today.

## Achievements

Local, on-device achievements (first run, streak milestones, perfect runs, deck
play counts, and more). They unlock as you play and show on the game-over screen
and in your profile. There is no global/competitive component yet.

## Anti-Bot / Fair Competition Roadmap

Leaderboards in this build are **local to this device** and are labeled as such.
They are **not** global and make **no** bot-resistance claims, because
client-side scores can be manipulated.

Real online competition requires server-side enforcement and is intentionally
**not** implemented until it can be done honestly:

- Server-generated, signed game sessions and server-chosen question sets.
- Server-side score recomputation and impossible-timing rejection.
- Per-user / per-IP rate limits and Turnstile-style bot challenges.
- Replay and duplicate-submission protection.
- Separate guest/local and verified-account scores.

See `docs/PRE_SHIP_CHECKLIST.md` for the full gate.

## Tech Stack

- React 18 + Vite 5
- Plain CSS (sticker/arcade theme via CSS variables)
- Web Audio API for sound effects
- `localStorage` for all persistence
- No backend, database, auth, payments, ads, or paid APIs

## Project Structure

```text
src/
  App.jsx                 # game state machine + wiring
  main.jsx
  styles.css
  game/
    triviaModes.js        # deck registry
    foodCards.js          # Fresh or Fake deck
    scamCards.js          # Scam Spotter deck
    rules.js              # hearts, timing, storage keys
    scoring.js
    comboMilestones.js
    deckValidation.js
    seenCards.js          # local "recently seen" rotation
  audio/                  # sfx + manifest
  utils/                  # shuffle
  components/             # screens + UI (GameScreen, ReviewScreen, JbdFooter, ...)
  services/               # account-ready interfaces + local adapters
docs/
  PRE_SHIP_CHECKLIST.md
```

## Data & Privacy

Gut Check currently stores **local profiles and scores in browser
`localStorage`** on your own device. No cloud accounts, database, or backend are
used unless a future account system is explicitly configured. Nothing is
transmitted off your device. You can clear all local data from the app's reset
control, or by clearing site data in your browser.

## Security / Pre-Ship

This is a frontend-only static app: no auth, no backend, no database, no paid
APIs, no data-sending forms, `localStorage` only, and no global leaderboard. See
`docs/PRE_SHIP_CHECKLIST.md`. Real accounts or global competition must pass the
account/security gate in that document first.

## Roadmap

- More playable decks (Quick Math, Weird Facts, and beyond) with sourced facts.
- Multiple-choice and math-input answer types.
- Expanded achievements.
- _Optional, future:_ real accounts + fair, server-validated competition.

## Credits

Built by **Jacob Britten** — Media Systems Architect.
[Portfolio](https://jacobbritten.com) ·
[Projects](https://jacobbritten.com/projects.html) ·
[The Lab](https://jacobbritten.com/lab.html) ·
[Ko-fi](https://ko-fi.com/jacobbritten) ·
[PayPal](https://www.paypal.com/donate/?hosted_button_id=47A4JJ4WNBY9U)
