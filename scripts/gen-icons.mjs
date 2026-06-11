/* Generate PWA/favicon SVGs + PNGs from the canonical Gus brand art.
   Run: node scripts/gen-icons.mjs  (re-run if the brand art changes) */
import { writeFileSync } from 'node:fs'
import { Resvg } from '@resvg/resvg-js'
import { gusIcon, gusMono } from '../src/brand/gusArt.js'

function pngFromSvg(svg, width) {
  return new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng()
}

// --- SVGs ---
const icon = gusIcon({ size: 512 })
writeFileSync('public/icon.svg', icon.trim() + '\n')

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
writeFileSync('public/gus-mono.svg', gusMono('idle', { size: 240 }).trim() + '\n')

// --- PNGs ---
for (const size of [512, 192, 180, 48]) {
  writeFileSync(`public/icon-${size}.png`, pngFromSvg(icon, size))
}
writeFileSync('public/icon-maskable-512.png', pngFromSvg(maskable, 512))
writeFileSync('public/apple-touch-icon.png', pngFromSvg(icon, 180))

console.log('Wrote icon SVGs + PNGs (512/192/180/48), maskable, mono, apple-touch-icon.')
