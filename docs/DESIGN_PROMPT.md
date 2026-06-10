# Gut Check — Design Prompt (paste into your design chat)

Copy the brief below into the design tool to refresh the **logo / app icon**
(primary ask) and, optionally, a few supporting assets. It's written to match
the existing sticker/arcade style so new art drops straight in.

---

## Brief

You're designing the brand mark for **Gut Check**, a fast, mobile-first **swipe
trivia game**. Tagline: **"Trust your gut. Swipe fast. Learn something."**
Players read a card and swipe to judge it (e.g. Fresh/Fake, Sketchy/Legit,
True/Nope) or tap a multiple-choice answer, building streaks against a timer.

**Vibe:** playful, punchy, confident — comic/sticker/arcade, *not* a corporate
quiz app, not childish, not dark/cyberpunk. Think bold stickers with thick
hand-drawn outlines.

### Visual system (match exactly)
- **Palette:** cream `#FFF6EB` (fills), charcoal `#1F2328` (every outline + text),
  teal `#00A79B` (primary/"correct"), orange `#FF4D2D` (danger/"wrong"),
  green `#00A878` (fresh/yes), gold/yellow `#FFD166` (accents), soft beige
  `#EDE5DA` (backdrop).
- **Outlines:** thick charcoal strokes, slightly rounded corners, a chunky
  "hard offset" shadow (a solid charcoal shadow a few px down) — sticker look.
- **Type:** heavy rounded sans (the app uses a Trebuchet/Arial-Rounded-bold
  feel). Wordmark should feel bold and friendly, slight tilt is welcome.
- **Motion-friendly:** flat shapes, minimal gradients, reads at small sizes.

### What I need
1. **App icon / primary mark** (square, rounded-corner tile, ~rounded 22%):
   the hero asset. Must be instantly readable at 48px and as a browser favicon.
2. **Wordmark** "Gut Check" — bold, friendly, on transparent background.
3. **Lockup** — icon + wordmark + tagline arrangement (stacked, centered).
4. (Optional) a **1200×630 OG/social image** using the icon + tagline on a
   teal background.

### Direction: a cute mascot (kid-friendly)
We want the brand led by a **cute, friendly mascot** so it appeals to kids as
well as adults — think approachable sticker character, not a corporate logo.
There's already a working in-app placeholder mascot ("Gus") to build on: a
rounded **teal blob** with a thick charcoal outline, big friendly cream eyes,
rosy orange cheeks, a little smile, a tiny sprout + orange spark on its head,
and a cream **belly badge with a checkmark** (ties to "Gut Check → correct").
See `src/components/Mascot.jsx`.

Please design a polished, professional version of this mascot:
- **Personality:** warm, curious, a little cheeky — encouraging, never mean.
- **Expressions / poses** (a small set we can swap in during play): idle,
  happy/celebrate (correct), oops/wince (wrong), and sleepy/"too slow" (timeout).
- **Animation-friendly:** clean separable parts (eyes, mouth, arms) so it can
  blink, bob, and react. Subtle motion only.
- **App icon:** a simplified **mascot face** that reads at 48px and as a
  favicon (the current placeholder icon is a teal tile with the mascot's face).

Keep shapes bold and few, high contrast, thick charcoal outlines. Avoid: fine
detail, photoreal, gradient-heavy rendering, tiny text inside the icon,
copyrighted characters, real human faces.

### Deliverables
- **SVG** (preferred) with transparent background, plus PNG exports at
  512 / 192 / 48 px for the icon, and a favicon.
- Show the icon on **both** a cream and a teal background to confirm contrast.
- Provide the charcoal-outline version and a one-color fallback.

### Where it's used
- Home screen lockup (currently a small CSS stand-in to replace).
- Browser tab favicon + `theme-color` is teal `#00A79B`.
- Social share image (OG/Twitter), currently a placeholder.

---

## (Optional) supporting refresh
If you want to extend it: tidy, consistent **deck badge icons** in the same
sticker style for the 7 decks — Fresh or Fake (🥑), Scam Spotter (🕵), Quick
Math (🧮), Weird Facts (🤯), Animal Facts (🦊), History Hits (🏛️), Science
Snacks (🔬) — so the home grid feels cohesive instead of using raw emoji.
