// Procedural terrain for Jerusalem c. 445 BC.
import { FEATURES } from './data.js';

// Plan coordinates throughout: x = metres east, n = metres north.
// (Three.js world: X = x, Y = height, Z = -n.)
//
// The shape is schematic but follows the real topography: a narrow eastern
// ridge (City of David rising north to the Temple Mount), the deep Kidron
// Valley on the east, the shallower Central Valley on the west, the Hinnom
// Valley curving round the south-west, and the Mount of Olives across the
// Kidron. Heights are metres above an arbitrary datum (~640 m above sea level).

export const VALLEYS = {
  kidron: {
    pts: [[300, 1100], [270, 800], [250, 550], [235, 300], [225, 50], [205, -200], [160, -450], [120, -620], [110, -900], [100, -1200]],
    floor: [45, -12],
    slope: 0.6,
  },
  central: {
    pts: [[-300, 1000], [-300, 700], [-275, 450], [-245, 200], [-200, -50], [-150, -300], [-90, -500], [40, -620]],
    floor: [70, 0],
    slope: 0.35,
  },
  hinnom: {
    pts: [[-760, 700], [-760, 300], [-700, -150], [-520, -480], [-250, -640], [0, -665], [120, -630]],
    floor: [90, -4],
    slope: 0.5,
  },
};

for (const v of Object.values(VALLEYS)) {
  v.cum = [0];
  for (let i = 1; i < v.pts.length; i++) {
    const [ax, an] = v.pts[i - 1], [bx, bn] = v.pts[i];
    v.cum.push(v.cum[i - 1] + Math.hypot(bx - ax, bn - an));
  }
  v.len = v.cum[v.cum.length - 1];
}

// Vertical exaggeration, so the valleys read clearly from the air.
const RELIEF = 1.4;

// Crest height of the eastern ridge by northing.
const RIDGE = [[-1200, 5], [-650, 18], [-500, 40], [-200, 57], [100, 70], [350, 88], [520, 98], [800, 106], [1400, 112]];

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

// Distance from (x, n) to a valley's centre line, plus the fraction along it.
export function valleyDist(v, x, n) {
  let best = Infinity, bestT = 0;
  for (let i = 1; i < v.pts.length; i++) {
    const [ax, an] = v.pts[i - 1], [bx, bn] = v.pts[i];
    const dx = bx - ax, dn = bn - an;
    const l2 = dx * dx + dn * dn;
    let t = ((x - ax) * dx + (n - an) * dn) / l2;
    t = Math.max(0, Math.min(1, t));
    const d = Math.hypot(x - (ax + dx * t), n - (an + dn * t));
    if (d < best) {
      best = d;
      bestT = (v.cum[i - 1] + Math.sqrt(l2) * t) / v.len;
    }
  }
  return { d: best, t: bestT };
}

function rawGround(x, n) {
  const plateau = interp(RIDGE, n) - 0.00035 * (x - 20) ** 2;
  const westHill = 125 - 0.00028 * (x + 520) ** 2 - 0.0001 * (n - 200) ** 2;
  const olives = 175 - 0.0005 * (x - 820) ** 2 - 0.00002 * (n - 250) ** 2;
  const southHill = 105 - 0.0002 * x * x - 0.0006 * (n + 1000) ** 2;

  let h = smax(plateau, westHill, 30);
  h = smax(h, olives, 30);
  h = smax(h, southHill, 30);
  h = smax(h, 25, 20);

  for (const v of Object.values(VALLEYS)) {
    const { d, t } = valleyDist(v, x, n);
    const floor = v.floor[0] + (v.floor[1] - v.floor[0]) * t;
    h = smin(h, floor + v.slope * d * d / (d + 40), 10);
  }

  h += 1.6 * (noise2(x / 45, n / 45) - 0.5) + 0.6 * (noise2(x / 13, n / 13) - 0.5);
  return h * RELIEF;
}

// Level pads under built features (the Temple court, pools, named houses).
const PADS = [
  ['temple', 55], ['poolShelah', 26], ['artificialPool', 16], ['tombs', 16],
  ['eliashib', 14], ['mighty', 16], ['armory', 16], ['kingsHouse', 24],
].map(([k, r]) => ({ x: FEATURES[k].x, n: FEATURES[k].n, r, h: rawGround(FEATURES[k].x, FEATURES[k].n) }));

export function ground(x, n) {
  let h = rawGround(x, n);
  for (const p of PADS) {
    const d = Math.hypot(x - p.x, n - p.n);
    if (d < p.r) {
      const w = Math.min(1, (p.r - d) / (p.r * 0.45));
      h += (p.h - h) * w * w * (3 - 2 * w);
    }
  }
  return h;
}
