# Gut Check — AI Image Prompt Kit (Gus)

Prompts for ChatGPT / DALL·E (or any image model) to generate **richer, detailed
Gus assets** that stay on-brand. The in-app mascot is crisp vector
(`src/brand/gusArt.js`) — use these AI prompts for **marketing, store
screenshots, stickers, hero art, expression sheets**, then hand the PNGs back and
they get wired in.

> **Consistency tip:** generate one image first, then attach it (or
> `public/og-image.png` / `public/icon-512.png`) as a **reference image** for
> every later prompt and say *"keep the exact same character and style as the
> attached."* Reuse the **Character Bible** block verbatim each time.

---

## 1) Character Bible (paste this at the top of every prompt)

> **Character:** "Gus", the mascot for a kids-and-adults swipe trivia game.
> A cute **kawaii teal blob** creature — a rounded, soft, egg/blob body in
> **teal (#00A79B)** with a **thick, even charcoal (#1F2328) outline** in a flat
> **sticker** style. Big **glossy anime eyes** with **cream (#FFF6EB)** whites, a
> deep navy-blue iris, and bright catch-light highlights. **Rosy orange
> (#FF4D2D)** oval cheek blush. A small soft **":3" cat mouth.** On top of his
> head a tiny **green (#00A878) leaf sprout** on a short charcoal stem, plus a
> little **orange 8-point sparkle**. On his belly a **cream circle badge with a
> green checkmark.** Two small stubby arms. Warm, curious, friendly, a little
> cheeky — never mean.
>
> **Style:** flat 2D vector **sticker / kawaii** illustration. Thick uniform
> charcoal outlines, bold simple shapes, minimal flat shading, slightly rounded
> and chunky. **No gradients-as-crutch, no 3D, no photoreal, no realistic
> textures, no drop-shadow background.**
>
> **Palette (use these exactly):** cream `#FFF6EB`, charcoal `#1F2328`, teal
> `#00A79B`, green `#00A878`, orange `#FF4D2D`, gold `#FFD166`, beige `#EDE5DA`.

**Global technical directives** (append to most prompts):
`transparent background, single centered character, no text, no letters, no
watermark, high resolution, 1:1 square, clean edges.`

**Negative / avoid:** `text, words, letters, signature, watermark, 3D render,
realistic, photo, gradient mesh, busy background, drop shadow, extra limbs,
muddy colors, cyberpunk, dark mood.`

---

## 2) Expression sheet (the four game states)

Use one per image (transparent), or ask for a 2×2 sheet.

- **Idle:** `[Character Bible] Gus standing calmly, facing forward, big open
  glossy eyes, tiny content ":3" smile, arms relaxed at his sides. [technical]`
- **Happy / correct:** `[Character Bible] Gus celebrating — eyes squeezed into
  joyful "^_^" arcs, wide open smile with a little orange tongue, both stubby
  arms thrown up, three small gold sparkles around him. [technical]`
- **Oops / wrong:** `[Character Bible] Gus wincing — eyes squeezed shut in a
  ">_<" expression, tiny round "o" mouth, a single light-blue sweat drop near
  his temple, shoulders scrunched. [technical]`
- **Sleepy / timeout:** `[Character Bible] Gus dozing off — eyes closed in
  gentle downward curves, a tiny yawning mouth, two small "Z" zzz shapes
  floating above his head, slightly slumped. [technical]`

_2×2 sheet version:_ `... a 2x2 grid showing the SAME Gus in four expressions —
idle, happy (arms up + sparkles), oops (sweat drop, >_<), sleepy (zzz) — evenly
spaced, identical character, transparent background, no text.`

---

## 3) App icon

> `[Character Bible] App icon: a simplified front-facing **Gus face** centered
> on a **rounded-square teal (#00A79B) tile** with a thick charcoal border and a
> faint cream polka-dot halftone. Big glossy eyes, orange cheeks, ":3" mouth, and
> the cream belly checkmark badge near the chin. Bold and readable at small
> sizes. 1:1, no text, flat sticker style.`

## 4) Deck badge stickers (set of 7)

> `[Character Bible — style/palette only] A set of 7 matching **sticker badge
> icons**, each a rounded-square tile with a thick charcoal outline and a single
> bold glyph, same flat sticker style and palette. Tiles + glyphs:
> 1) Fresh or Fake — green tile, an apple;
> 2) Scam Spotter — teal tile, a magnifying glass;
> 3) Quick Math — orange tile, plus/minus/percent symbols;
> 4) Weird Facts — gold tile, a star/sparkle;
> 5) Animal Facts — cream tile, a little cat face;
> 6) History Hits — beige tile, a classical column/temple;
> 7) Science Snacks — charcoal tile, a lab flask.
> Even grid, transparent background, no text.`

## 5) Hero / marketing illustration

> `[Character Bible] Gus mid-game, leaning forward and **swiping a rounded trivia
> card** to one side with a confident grin, small motion swoosh lines, a couple
> of gold sparkles. Dynamic, fun, friendly. Flat sticker style. Plain teal or
> transparent background, no text.`

## 6) Loading / empty-state poses (nice-to-have)

> `[Character Bible] Gus giving a friendly thumbs-up and a wink, small sparkle.`
> `[Character Bible] Gus shrugging with an "all clear" smile (for an empty
> "nothing to review" state).`
> `[Character Bible] Gus peeking in from the side edge, curious.`

---

## Workflow back into the app

1. Generate at the **largest** size offered; export **transparent PNG**.
2. Drop files in `public/` (e.g. `public/art/gus-happy.png`) and tell me what
   they are — I'll wire them in (marketing page, store shots, or swap the
   in-game expressions to the illustrated set).
3. For anything that must stay **crisp at any size in-app** (the live mascot,
   icon, badges), the **SVG in `src/brand/gusArt.js` stays the source of truth**;
   AI raster art is best for marketing, store, stickers, and social.

**Reality check:** image models won't hit the exact hex values or vector
crispness perfectly, and may wander between generations — that's why the
reference-image trick + the verbatim Character Bible matter. Pick the best
generation, then we keep using it as the style anchor.
