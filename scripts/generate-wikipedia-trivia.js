#!/usr/bin/env node
/* ============================================================
   Gut Check — Wikipedia trivia RESEARCH AID (developer-only, OPTIONAL).

   This script is NOT required for gameplay. Gut Check ships and runs entirely
   from bundled, curated card data in src/game/*. This tool only fetches
   CANDIDATE TOPICS to research by hand.

   Hard rules (see docs/CONTENT_SOURCING.md):
   - It outputs topic ideas, NOT finished cards and NOT facts to copy.
   - Every factual card you add must be verified against a reliable source and
     carry sourceName / sourceUrl / sourceLicense.
   - Paraphrase in your own words. Do not paste long Wikipedia passages.
   - No medical / health claims. No Reddit as a factual source.

   Usage (Node 18+, has global fetch):
     node scripts/generate-wikipedia-trivia.js [count]
   ============================================================ */

const COUNT = Math.min(Math.max(parseInt(process.argv[2] || '10', 10) || 10, 1), 25)
const SUMMARY_API = 'https://en.wikipedia.org/api/rest_v1/page/random/summary'

async function fetchCandidateTopic() {
  const res = await fetch(SUMMARY_API, { headers: { accept: 'application/json' } })
  if (!res.ok) throw new Error(`Wikipedia API ${res.status}`)
  const data = await res.json()
  return {
    title: data.title,
    description: data.description || '',
    url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(data.title)}`,
  }
}

async function main() {
  if (typeof fetch !== 'function') {
    console.error('This script needs Node 18+ (global fetch).')
    process.exit(1)
  }
  console.log(`\nCandidate topics to RESEARCH (not facts, not cards) — ${COUNT}:\n`)
  for (let i = 0; i < COUNT; i++) {
    try {
      const topic = await fetchCandidateTopic()
      console.log(`• ${topic.title}${topic.description ? ` — ${topic.description}` : ''}`)
      console.log(`  ${topic.url}`)
    } catch (err) {
      console.log(`• (skipped: ${err.message})`)
    }
  }
  console.log(
    '\nNext: verify each fact against the article, paraphrase it, and add a card\n' +
      'with sourceName/sourceUrl/sourceLicense to the relevant deck in src/game/.\n',
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
