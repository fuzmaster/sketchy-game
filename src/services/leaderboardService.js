/* ============================================================
   Gut Check — LOCAL leaderboard ("This device" only).
   This is NOT a global or competitive leaderboard. Client-side scores can be
   manipulated, so this only ranks the local profiles on this browser. A real
   global leaderboard requires server-side score validation, signed sessions,
   bot protection, and rate limits (see docs/PRE_SHIP_CHECKLIST.md) before it
   can honestly be called "global".
   ============================================================ */

export const localLeaderboardService = {
  isRemote: false,
  scope: 'this-device',
  label: 'This device',

  /** Best local score for a profile on a deck. */
  bestScore(profile, deckId) {
    return profile?.bestScoreByDeck?.[deckId] || 0
  },

  /** Rank the local profiles by best score on a deck (this device only). */
  deviceRanking(profiles, deckId) {
    return profiles
      .map((profile) => ({
        profileId: profile.id,
        name: profile.name,
        avatar: profile.avatar,
        score: profile.bestScoreByDeck?.[deckId] || 0,
      }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
  },
}

export const leaderboardService = localLeaderboardService
export default leaderboardService
