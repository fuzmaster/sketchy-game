# Gut Check — Pre-Ship Checklist

A launch gate for Gut Check. This reflects the **current build**, which is a
frontend-only React + Vite app with no backend, no accounts, and no network
calls. Re-run this gate whenever the architecture changes (especially before
adding real accounts or a global leaderboard).

---

## Verdict

**Safe to ship as a frontend-only, local-only game.**

Gut Check is a static single-page app. It stores profiles, settings, and best
scores in the browser's `localStorage` on the player's own device. It sends no
data anywhere, has no login, and exposes no secrets. The risk surface is small.

It is **not** ready to be described as having accounts, cloud sync, or global/
competitive leaderboards — those are explicitly out of scope until the backend
section below is satisfied.

---

## Top Risks

1. **Misrepresentation risk (highest).** Calling local profiles "accounts" or
   the on-device best-score list a "global leaderboard" would mislead players.
   Current copy must keep them labeled as local / on this device.
2. **Third-party links.** The footer links out to external sites (portfolio,
   Ko-fi, PayPal). These open in a new tab with `rel="noopener noreferrer"`.
3. **localStorage corruption / quota.** Bad or full storage must degrade
   gracefully to defaults rather than white-screening.
4. **Content accuracy.** Trivia explanations are educational; factual decks must
   cite a real source and avoid medical/health claims.

---

## Ship Blockers

- [ ] No code path calls a backend, auth provider, or paid API.
- [ ] No secrets, API keys, or tokens exist in the client bundle or repo.
- [ ] Local profiles are labeled "Local Profiles" / "Saved on this device."
- [ ] Any score list is labeled "This device" — never "global."
- [ ] No claims of bot protection or cheat-proof scoring anywhere in the UI.
- [ ] `npm run build` succeeds with no errors.
- [ ] App loads and is playable from a clean `localStorage`.

---

## Security Review

| Area | Status | Notes |
| --- | --- | --- |
| Authentication | N/A | No auth. No login form. |
| Server-side validation | N/A | No server. |
| Secrets in client | ✅ None | No API keys/tokens shipped. |
| Database access control | N/A | No database. |
| XSS surface | ✅ Low | React escapes content; no `dangerouslySetInnerHTML` on user input. |
| External links | ✅ | `target="_blank"` + `rel="noopener noreferrer"`. |
| Dependencies | ⚠️ Run `npm audit` | Keep dev deps patched. |

---

## Privacy & Legal Review

- **Data collected:** none transmitted. Profile name, avatar, settings, and best
  scores live only in the player's browser `localStorage`.
- **Cookies / trackers:** none.
- **Third parties:** outbound links only (user-initiated).
- **Data deletion:** the player can clear all local data from the app (reset
  button) or by clearing site data in their browser.
- **Privacy policy page:** not required for a no-collection static app, but a
  short note is included in the README. Add a dedicated policy page **before**
  any account system ships.

---

## Abuse & Cost Protection

- **Server cost:** none (static hosting only).
- **Paid APIs:** none.
- **Rate limiting:** N/A (no server endpoints to abuse).
- **Leaderboards:** local only; no submission endpoint exists, so there is
  nothing to spam or forge.

---

## Failure Case Testing

- [ ] Corrupted `localStorage` JSON → app falls back to default profile.
- [ ] `localStorage` disabled / full → app still loads and plays (no crash).
- [ ] Rapid double-tap / key-mash on a card → resolves exactly once.
- [ ] Tab backgrounded mid-card → timer/feedback recover without double-scoring.
- [ ] Reduced-motion preference respected.
- [ ] Works with sound muted and unmuted.

---

## Required Fix Plan

Nothing blocking for the current frontend-only scope. Standard maintenance:

- Run `npm audit` and patch high/critical advisories before each release.
- Replace the OG/Twitter image and canonical URL placeholders once a domain
  exists.

---

## Final Verification Checklist

- [ ] `npm install && npm run build` clean.
- [ ] `npm audit` reviewed.
- [ ] Manual playthrough on desktop and a mobile viewport.
- [ ] Footer links open correctly in a new tab.
- [ ] No console errors during a full round + review + game over.
- [ ] README and this checklist still accurate for the shipped build.

---

## Before Real Accounts or a Global Leaderboard (hard requirements)

Do **not** add accounts or a global/competitive leaderboard until **all** of
the following are in place — see `src/services/*` for the account-ready
interfaces that keep this path honest:

- [ ] Real authentication (managed provider: Supabase / Firebase / similar).
- [ ] Server-side input and score validation (never trust the client).
- [ ] Row-level / per-user authorization (e.g. Supabase RLS).
- [ ] Bot protection (Cloudflare Turnstile or equivalent) before score submit.
- [ ] Per-user and per-IP rate limits on auth and score endpoints.
- [ ] Server-generated, signed game sessions for ranked modes.
- [ ] Replay / duplicate-submission protection and timing sanity checks.
- [ ] Privacy policy + Terms pages.
- [ ] Data export and deletion flow.
- [ ] Security headers (CSP, HSTS, etc.) on the host.
- [ ] No secrets in the frontend; service-role keys server-side only.
- [ ] A fresh pass through this entire checklist.
