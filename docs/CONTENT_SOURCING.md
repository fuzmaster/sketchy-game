# Gut Check — Content Sourcing

How trivia content is researched and added. The goal: fun, accurate cards that
cite real sources — never scraped, never unsourced, never copied verbatim.

## Hard rules

- **Gameplay runs only from bundled, curated card data** in `src/game/*`. No
  live scraping or runtime calls to external sources during play.
- **No scraping** of Google or Reddit from the app or build.
- **Reddit is inspiration only**, never a factual source. Any Reddit-inspired
  idea must be verified against a reliable source before it becomes a card.
- **Wikipedia / Wikimedia**: use curated facts only. Paraphrase in your own
  concise words — do **not** copy long passages. Record the article URL and
  note the license (Wikipedia text is CC BY-SA 4.0).
- **No controversial medical or health claims.**
- Keep explanations short and human-readable.

## Card source fields

Factual cards should carry:

```js
sourceName: 'Wikipedia',
sourceUrl: 'https://en.wikipedia.org/wiki/Octopus',
sourceLicense: 'CC BY-SA 4.0',
```

Source links are shown **after** the answer (feedback overlay) and on the
**review** screen — never during timed play.

## Optional research aid

`scripts/generate-wikipedia-trivia.js` fetches random Wikipedia **topic ideas**
to research by hand. It outputs topics, not facts or finished cards, and is
never required for gameplay or builds:

```bash
node scripts/generate-wikipedia-trivia.js 10
```

Then verify each fact against the article, paraphrase it, and add a card with
the source fields above to the relevant deck in `src/game/`.

## Where decks live

Decks are colocated with the rest of the game logic in `src/game/`
(`foodCards.js`, `scamCards.js`, `quickMath.js`, `weirdFacts.js`) and registered
in `src/game/triviaModes.js`. Each deck is validated in dev by
`src/game/deckValidation.js`.
