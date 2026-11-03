// Procedural terrain: "a very high mountain" (Ezekiel 40:2), not a real place.
import { LEVEL, OUTER, INNER } from './data.js';

// Plan coordinates throughout: x = cubits east, n = cubits north, with the
// origin at the altar. (Three.js world: X = x, Y = height, Z = -n.)
//
// A broad, level summit holds the temple; round it the mountain falls away in
// ridges and gullies to a plain far below, with lower hills in the distance.

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
function fbm(x, y, oct = 4) {
  let s = 0, a = 0.5, f = 1;
  for (let k = 0; k < oct; k++) { s += a * noise2(x * f, y * f); f *= 2.03; a *= 0.5; }
  return s;
}
// Ridged noise: sharp crests, for the spurs running down the slopes.
function ridged(x, y, oct = 4) {
  let s = 0, a = 0.5, f = 1;
  for (let k = 0; k < oct; k++) { s += a * (1 - Math.abs(2 * noise2(x * f, y * f) - 1)) ** 2; f *= 2.1; a *= 0.5; }
  return s;
}

const SUMMIT = 420;     // radius of the level top, in cubits
const DROP = 2300;      // how far the mountain falls to the plain
const SHOULDER = 1400;  // the slope is steepest SHOULDER / √2 beyond the top

// Natural ground: the summit, a rounded shoulder, then the slope easing out to the plain.
export function rawGround(x, n) {
  // A slightly irregular outline, so the top isn't a perfect circle.
  const a = Math.atan2(n, x);
  const r = Math.hypot(x, n) * (1 + 0.12 * (fbm(Math.cos(a) * 2 + 7, Math.sin(a) * 2 + 3, 3) - 0.5));
  const d = Math.max(0, r - SUMMIT);
  const fall = DROP * (1 - Math.exp(-((d / SHOULDER) ** 2))) + 0.05 * d;
  let h = LEVEL.outside - Math.min(fall, DROP + 600);
  // Spurs and gullies, growing with the slope.
  const k = Math.min(1, d / 400);
  h += k * (ridged(x / 900, n / 900) - 0.45) * 420 * Math.min(1, d / 1500 + 0.3);
  h += (fbm(x / 160, n / 160) - 0.5) * (4 + 40 * k);
  // Distant hills on the plain.
  const far = Math.max(0, Math.hypot(x, n) - 9000);
  h += Math.min(1, far / 6000) * (fbm(x / 5000 + 11, n / 5000) - 0.3) * 2600;
  return h;
}

// Level ground: the summit at the foot of the outer wall, the outer court
// inside it, and the inner court's terrace. Each pad is a rectangle with a soft edge `e`.
const PADS = [
  { x0: -OUTER - 60, x1: OUTER + 60, n0: -OUTER - 60, n1: OUTER + 60, h: LEVEL.outside, e: 240 },
  { x0: -OUTER, x1: OUTER, n0: -OUTER, n1: OUTER, h: LEVEL.outer, e: 3 },
  { x0: INNER.west, x1: INNER.east, n0: -INNER.half, n1: INNER.half, h: LEVEL.inner, e: 1 },
];
export function ground(x, n) {
  let h = rawGround(x, n);
  for (const p of PADS) {
    const dx = Math.max(p.x0 - x, 0, x - p.x1), dn = Math.max(p.n0 - n, 0, n - p.n1);
    const d = Math.hypot(dx, dn);
    if (d < p.e) {
      const w = 1 - d / p.e;
      h += (p.h - h) * w * w * (3 - 2 * w);
    }
  }
  return h;
}
