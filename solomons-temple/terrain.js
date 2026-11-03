// Procedural terrain for Jerusalem in Solomon's day.
import { COURT, GREAT } from './data.js';

// Plan coordinates throughout: x = cubits east, n = cubits north, with the
// origin at the temple. (Three.js world: X = x, Y = height, Z = -n.)
//
// The shape follows the Holy Week animation's Jerusalem (which is in metres,
// with the same origin): the temple hill with the City of David running south
// from it, the Tyropoeon Valley on its west, the Hinnom round the south, the
// Kidron on the east and the Mount of Olives across it. Heights here are
// cubits above the temple court, with the relief exaggerated a little.

const M = 0.45;        // metres in a cubit
export const COURT_Y = -0.6;   // the inner court; the house's foundation stands a little above it

const VALLEYS = {
  kidron: {
    pts: [[330, 1300], [330, 700], [300, 300], [290, 0], [262, -350], [205, -700], [140, -1000], [118, -1170], [160, -1700]],
    floor: [128, 118, 92, 80, 60, 36, 10, 0, -40],
    slope: 0.55,
  },
  tyropoeon: {
    pts: [[-470, 650], [-400, 420], [-300, 200], [-200, 20], [-170, -200], [-150, -480], [-110, -760], [-60, -1000], [60, -1160], [118, -1170]],
    floor: [168, 158, 140, 122, 112, 88, 40, 14, 3, 0],
    slope: 0.3,
  },
  hinnom: {
    pts: [[-900, 300], [-880, 0], [-860, -350], [-790, -720], [-600, -1000], [-300, -1150], [0, -1190], [118, -1170]],
    floor: [160, 150, 130, 95, 52, 20, 6, 0],
    slope: 0.75,
  },
};

function interp(table, v) {
  if (v <= table[0][0]) return table[0][1];
  for (let i = 1; i < table.length; i++) {
    if (v <= table[i][0]) {
      const [a, ha] = table[i - 1], [b, hb] = table[i];
      return ha + (hb - ha) * (v - a) / (b - a);
    }
  }
  return table[table.length - 1][1];
}

function smin(a, b, k) {
  const h = Math.max(0, Math.min(1, 0.5 + 0.5 * (b - a) / k));
  return b + (a - b) * h - k * h * (1 - h);
}
const smax = (a, b, k) => -smin(-a, -b, k);

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

// Distance (metres) from (x, n) to a valley's centre line, and the floor height there.
function valleyDist(v, x, n) {
  let best = Infinity, floor = 0;
  for (let i = 1; i < v.pts.length; i++) {
    const [ax, an] = v.pts[i - 1], [bx, bn] = v.pts[i];
    const dx = bx - ax, dn = bn - an;
    const l2 = dx * dx + dn * dn;
    let t = ((x - ax) * dx + (n - an) * dn) / l2;
    t = Math.max(0, Math.min(1, t));
    const d = Math.hypot(x - (ax + dx * t), n - (an + dn * t));
    if (d < best) {
      best = d;
      floor = v.floor[i - 1] + (v.floor[i] - v.floor[i - 1]) * t;
    }
  }
  return { d: best, floor };
}

// Crest of the temple ridge (the City of David to the south, rising north), by northing.
const RIDGE = [[-1150, 10], [-900, 45], [-700, 80], [-480, 112], [-300, 134], [0, 142], [300, 150], [800, 165], [1400, 172]];
// Crest of the Mount of Olives, by northing.
const OLIVES = [[-1400, 150], [-700, 195], [0, 216], [150, 218], [600, 212], [1300, 200]];

// Natural ground in metres (x, n in metres).
function natural(x, n) {
  const ridge = interp(RIDGE, n) - 0.0011 * x * x;
  const west = 172 - 0.00011 * (x + 600) ** 2 - 0.00007 * (n + 380) ** 2;
  const north = 150 + 0.02 * (n - 300) - 0.00012 * (x + 150) ** 2;
  const dx = x - 900;
  const olives = interp(OLIVES, n) - (dx < 0 ? 0.0006 * dx * dx : (0.075 * dx * dx) / (dx + 400));
  const south = 120 - 0.00008 * (x + 200) ** 2 - 0.0006 * (n + 1500) ** 2;

  let h = smax(ridge, west, 40);
  h = smax(h, north, 40);
  h = smax(h, olives, 40);
  h = smax(h, south, 40);
  for (const v of Object.values(VALLEYS)) {
    const { d, floor } = valleyDist(v, x, n);
    h = smin(h, floor + v.slope * d * d / (d + 50), 12);
  }
  h += 2.2 * (noise2(x / 60, n / 60) - 0.5) + 0.7 * (noise2(x / 15, n / 15) - 0.5);
  return h;
}
// Vertical exaggeration about the hilltop, so the valleys read from the air.
const RELIEF = 1.3;

const TOP = natural(0, 0);   // the hilltop where the house stands
export function rawGround(x, n) {
  return ((natural(x * M, n * M) - TOP) * RELIEF) / M;
}

// Level ground: the inner court just under the house's floor (y = 0), the great court
// terraced down a little round it.
// Each pad is a rectangle with a soft edge `e` cubits wide.
const PADS = [
  { x0: GREAT.west, x1: GREAT.east, n0: GREAT.south, n1: GREAT.north, h: -1.5, e: 70 },
  { x0: COURT.west, x1: COURT.east, n0: -COURT.half, n1: COURT.half, h: COURT_Y, e: 12 },
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
