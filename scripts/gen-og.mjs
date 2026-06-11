/* Generate the 1200x630 social/OG image from the Gus brand art + wordmark.
   Run: node scripts/gen-og.mjs */
import { readFileSync, writeFileSync } from 'node:fs'
import { Resvg } from '@resvg/resvg-js'
import { gusSvg } from '../src/brand/gusArt.js'

const TEAL = '#00A79B',
  INK = '#1F2328',
  CREAM = '#FFF6EB',
  ORANGE = '#FF4D2D'

const font = readFileSync('design/baloo2-latin.woff2')

// halftone dots
let dots = ''
for (let x = 0; x < 1200; x += 40) for (let y = 0; y < 630; y += 40) dots += `<circle cx="${x}" cy="${y}" r="4" fill="#ffffff" opacity="0.14"/>`

// embed Gus (happy), viewBox 240 -> 380px at left
const gusInner = gusSvg('happy', { size: 240 })
  .replace(/^[\s\S]*?<svg[^>]*>/, '')
  .replace(/<\/svg>[\s\S]*$/, '')
const scale = 400 / 240

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="${TEAL}"/>
  ${dots}
  <rect x="26" y="26" width="1148" height="578" rx="34" fill="none" stroke="${INK}" stroke-width="5"/>
  <g transform="translate(70 115) scale(${scale})">${gusInner}</g>
  <g style="paint-order:stroke">
    <text x="1130" y="300" text-anchor="end" font-family="Baloo 2" font-weight="800" font-size="120"
          stroke="${CREAM}" stroke-width="13" paint-order="stroke">
      <tspan fill="${ORANGE}">Gut </tspan><tspan fill="${TEAL}">Check</tspan>
    </text>
  </g>
  <text x="1130" y="372" text-anchor="end" font-family="Baloo 2" font-weight="800" font-size="36" fill="${CREAM}">Trust your gut.</text>
  <text x="1130" y="418" text-anchor="end" font-family="Baloo 2" font-weight="800" font-size="36" fill="${CREAM}">Swipe fast. Learn something.</text>
</svg>`

writeFileSync('public/og-image.svg', svg + '\n')

const png = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: { fontBuffers: [font], defaultFontFamily: 'Baloo 2', loadSystemFonts: false },
}).render().asPng()
writeFileSync('public/og-image.png', png)
console.log('Wrote public/og-image.png (' + png.length + ' bytes) + og-image.svg')
