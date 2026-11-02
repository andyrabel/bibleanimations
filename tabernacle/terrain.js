// Procedural terrain for the camp at Sinai.

// Plan coordinates throughout: x = cubits east, n = cubits north.
// (Three.js world: X = x, Y = height, Z = -n.)
//
// A wide gravel plain, level where the tabernacle stands, rising into low
// dunes, with a granite massif to the south and lower hills on the other
// sides. The layout is schematic: the text doesn't say where in the plain the
// tabernacle stood.

export function hash2(i, j) {
  let h = (Math.imul(i, 374761393) + Math.imul(j, 668265263)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

export function noise2(x, y) {
  const i = Math.floor(x), j = Math.floor(y);
  const fx = x - i, fy = y - j;
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
  const a = hash2(i, j), b = hash2(i + 1, j), c = hash2(i, j + 1), d = hash2(i + 1, j + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

// Peaks: [x, n, height, radius]. The first is Sinai.
export const PEAKS = [
  [-350, -2200, 520, 420],
  [200, -2450, 420, 460],
  [-1000, -1950, 380, 420],
  [-1700, -1100, 330, 480],
  [900, -1950, 330, 420],
  [1700, -900, 260, 520],
  [1700, 600, 240, 520],
  [-1600, 500, 280, 520],
  [-500, 1700, 230, 520],
  [700, 1800, 200, 480],
];

// Radius of the level ground around the court.
const FLAT = 140;

export function ground(x, n) {
  const r = Math.hypot(x, n);
  const out = Math.min(1, Math.max(0, (r - FLAT) / 300));
  let h = out * out * (3 * (noise2(x / 90, n / 90) - 0.5) + 1.2 * (noise2(x / 25, n / 25) - 0.5) + 2);
  for (const [px, pn, ph, pr] of PEAKS) {
    const d = Math.hypot(x - px, n - pn) / pr;
    if (d > 2.6) continue;
    // Craggy: ridged noise scaled by a bell-shaped mass.
    const rough = 0.75 + 0.5 * Math.abs(noise2(x / 70, n / 70) - 0.5) * 2 + 0.25 * noise2(x / 23, n / 23);
    h += ph * Math.exp(-d * d * 1.6) * rough;
  }
  return h;
}
