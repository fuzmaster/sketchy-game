/**
 * Build a CSS `polygon(...)` clip-path shaped like a comic starburst.
 *
 * @param {number} points  Number of outer spikes.
 * @param {number} inner   Inner-radius ratio (0–1); lower = spikier.
 * @returns {string} A `polygon(...)` value for `clip-path`.
 */
export function starburst(points = 14, inner = 0.74) {
  const step = Math.PI / points
  const out = []
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? 0.5 : 0.5 * inner
    const a = i * step - Math.PI / 2
    const x = (50 + Math.cos(a) * r * 100).toFixed(2)
    const y = (50 + Math.sin(a) * r * 100).toFixed(2)
    out.push(`${x}% ${y}%`)
  }
  return `polygon(${out.join(', ')})`
}
