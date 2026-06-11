/* Generate PWA/favicon SVGs from the canonical Gus brand art.
   Run: node scripts/gen-icons.mjs  (re-run if the brand art changes) */
import { writeFileSync } from 'node:fs'
import { gusIcon } from '../src/brand/gusArt.js'

const icon = gusIcon({ size: 512 })
writeFileSync('public/icon.svg', icon.trim() + '\n')

// Maskable: full-bleed teal background with the face scaled into the safe zone.
const inner = icon
  .replace(/^[\s\S]*?<svg[^>]*>/, '')
  .replace(/<\/svg>[\s\S]*$/, '')
  .replace('<rect x="8" y="8" width="224" height="224" rx="54" fill="#00A79B" stroke="#1F2328" stroke-width="11"/>', '')
  .trim()

const maskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="512" height="512">
  <rect width="240" height="240" fill="#00A79B"/>
  <g transform="translate(120 120) scale(0.84) translate(-120 -120)">
    ${inner}
  </g>
</svg>
`
writeFileSync('public/icon-maskable.svg', maskable)
console.log('Wrote public/icon.svg and public/icon-maskable.svg')
