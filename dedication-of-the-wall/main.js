import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
// The city is Nehemiah's Wall's: the same wall, gates, towers, landmarks and terrain.
import { ground, noise2, valleyDist, VALLEYS } from '../nehemiahs-wall/terrain.js';
import * as CITY from '../nehemiahs-wall/data.js';
import * as DATA from './data.js';
import {
  VERSIONS, current, chooseVersion, setVersion as useVersion, remember, pick as tr, t,
  localizeDOM, fillVersionSelect, noticeHTML, feedbackHTML, loadLanguages,
} from '../i18n.js';
import { createNarrator, titleLine, verseLine } from '../narrator.js';
import { track } from '../analytics.js';
import { openShare } from '../share.js';

const { WALL, THICK_SEGMENTS, TOWERS, FEATURES } = CITY;
const { INSTRUMENTS, PEOPLE, STOPS, INTRO, FINALE } = DATA;
// Text fields are strings or { [version]: string, default }; lang/*.js add the other languages.
await Promise.all([
  loadLanguages(CITY, new URL('../nehemiahs-wall/', import.meta.url)),
  loadLanguages(DATA, import.meta.url),
]);

// ---------------------------------------------------------------- constants
const WALL_H = 8;        // wall height above ground (m)
const CH = 1;            // course height
const BL = 2;            // nominal block length
const THICK = 2.8;       // wall thickness
const GATE_HALF = 8.5;   // half-width of a gatehouse along the wall
const DOOR_Z = -1.9;     // door line, near the city end of the gate passage
const OVERVIEW_C = new THREE.Vector3(0, 50, -110);
const HOLD_SCALE = 0.5;  // default pause at each stop, relative to the reading-time estimate
const SOUTH = Math.PI / 2;  // overview angle that looks north from the south
const WALK_V = -0.3;     // centre of the walkway across the top of the wall (+ is outwards)
const LANE = 0.42;       // the processions walk two abreast, this far either side of the centre
const GAP = 1.15;        // metres between ranks
const RAMP_SLOPE = 0.7;  // steepest climb on top of the wall, up onto a gate or tower
const STAIR_W = 2.2;     // stairs up the inside face of the wall
const STAIR_LEN = 16;
const WALK_RATE = 40;    // metres a procession covers per second of flight
const FINALE_POS = { x: 640, n: 360, y: 46 };   // on the Mount of Olives, looking back at the city
const FINALE_LOOK = { x: 40, n: 470, y: 20 };

// ---------------------------------------------------------------- helpers
function mulberry32(a) {
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(445);
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
// Like easeInOut, but leaves sooner and takes longer over the arrival.
const easeArrive = (t) => easeInOut(t ** 0.8);
const v3 = (x, n, y) => new THREE.Vector3(x, y, -n);
// A fixed camera point from data.js: y is metres above the ground there.
const fixed = (p) => v3(p.x, p.n, ground(p.x, p.n) + p.y);

useVersion(chooseVersion());
const UP = new THREE.Vector3(0, 1, 0);

// ---------------------------------------------------------------- renderer & scene
const app = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.05;
app.prepend(renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(innerWidth, innerHeight);
labelRenderer.domElement.className = 'labels';
app.insertBefore(labelRenderer.domElement, renderer.domElement.nextSibling);

const scene = new THREE.Scene();
scene.background = skyTexture();
scene.fog = new THREE.Fog(0xeadfc8, 900, 3000);

const camera = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, 1, 9000);

scene.add(new THREE.HemisphereLight(0xdfeaff, 0xb39b70, 1.5));
const sun = new THREE.DirectionalLight(0xfff0d4, 2.7);
sun.position.set(700, 950, 520);
sun.target.position.copy(OVERVIEW_C);
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
Object.assign(sun.shadow.camera, { left: -1000, right: 1000, top: 1000, bottom: -1000, near: 100, far: 3200 });
sun.shadow.bias = -0.0004;
sun.shadow.normalBias = 0.6;
scene.add(sun, sun.target);

function skyTexture() {
  const c = document.createElement('canvas');
  c.width = 4; c.height = 512;
  const g = c.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#5f9fdc');
  grad.addColorStop(0.55, '#b8d6ee');
  grad.addColorStop(1, '#f3dfbd');
  g.fillStyle = grad;
  g.fillRect(0, 0, 4, 512);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ---------------------------------------------------------------- materials
function stoneTexture() {
  // 4 m x 2 m tile: two courses of 2 m x 1 m ashlar blocks in running bond.
  const c = document.createElement('canvas');
  c.width = 512; c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#b8a67f';
  g.fillRect(0, 0, 512, 256);
  for (let r = 0; r < 2; r++) {
    for (let k = -1; k < 3; k++) {
      const x0 = k * 256 + (r ? 128 : 0), y0 = r * 128;
      const l = 84 + rand() * 10;
      g.fillStyle = `hsl(${40 + rand() * 6}, ${30 + rand() * 12}%, ${l}%)`;
      g.fillRect(x0 + 4, y0 + 4, 248, 120);
      g.fillStyle = 'rgba(255,255,255,0.18)';
      g.fillRect(x0 + 14, y0 + 12, 228, 100);
      for (let i = 0; i < 40; i++) {
        g.fillStyle = `rgba(120,100,70,${0.08 + rand() * 0.12})`;
        g.fillRect(x0 + 6 + rand() * 240, y0 + 6 + rand() * 116, 2 + rand() * 4, 2 + rand() * 3);
      }
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return t;
}
function puffTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.5, 'rgba(255,255,255,0.45)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

const MAT = {
  stone: new THREE.MeshStandardMaterial({ map: stoneTexture(), roughness: 0.95 }),
  block: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.92 }),
  plain: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95, flatShading: true }),
  rock: new THREE.MeshStandardMaterial({ color: 0xcdbb92, roughness: 1, flatShading: true }),
  wood: new THREE.MeshStandardMaterial({ color: 0x7d5130, roughness: 0.8 }),
  darkWood: new THREE.MeshStandardMaterial({ color: 0x5a381d, roughness: 0.8 }),
  iron: new THREE.MeshStandardMaterial({ color: 0x2f2d2c, roughness: 0.45, metalness: 0.6 }),
  roof: new THREE.MeshStandardMaterial({ color: 0x8e5b32, roughness: 0.85, flatShading: true }),
  flatRoof: new THREE.MeshStandardMaterial({ color: 0xc8b083, roughness: 1 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x241c15, roughness: 1 }),
  water: new THREE.MeshStandardMaterial({ color: 0x3f93b8, roughness: 0.15, metalness: 0.1, emissive: 0x0b2a3a }),
  trunk: new THREE.MeshStandardMaterial({ color: 0x6b5238, roughness: 1 }),
  leaf: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, flatShading: true }),
  silver: new THREE.MeshStandardMaterial({ color: 0xd9dde2, roughness: 0.3, metalness: 0.9 }),
  bronze: new THREE.MeshStandardMaterial({ color: 0xc08a3e, roughness: 0.35, metalness: 0.85 }),
  embers: new THREE.MeshStandardMaterial({ color: 0x2a1408, emissive: 0xff4a00, emissiveIntensity: 0 }),
  smoke: new THREE.SpriteMaterial({ map: puffTexture(), color: 0x9d968c, transparent: true, depthWrite: false, opacity: 0 }),
};

// Box with base at y = 0 whose UVs tile the stone texture at true scale.
function stoneBox(w, h, d) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const uv = geo.attributes.uv;
  for (let f = 0; f < 6; f++) {
    const [du, dv] = f < 2 ? [d, h] : f < 4 ? [w, d] : [w, h];
    for (let k = 0; k < 4; k++) {
      const i = f * 4 + k;
      uv.setXY(i, (uv.getX(i) * du) / 4, (uv.getY(i) * dv) / 2);
    }
  }
  geo.translate(0, h / 2, 0);
  return geo;
}
function baseBox(w, h, d) {
  return new THREE.BoxGeometry(w, h, d).translate(0, h / 2, 0);
}
function add(parent, geo, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = m.receiveShadow = true;
  parent.add(m);
  return m;
}
// Group whose local +X runs along the wall (direction of travel), +Z points
// out of the city, +Y up.
function framedGroup(x, n, tx, tn, y) {
  const g = new THREE.Group();
  const X = new THREE.Vector3(tx, 0, -tn);
  const Z = new THREE.Vector3().crossVectors(X, UP);
  g.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(X, UP, Z));
  g.position.set(x, y, -n);
  scene.add(g);
  return g;
}
// Min/max ground over a local grid (u along, v outward).
function footprint(x, n, tx, tn, us, vs) {
  let lo = Infinity, hi = -Infinity;
  for (const u of us) for (const v of vs) {
    const g = ground(x + tx * u + tn * v, n + tn * u - tx * v);
    lo = Math.min(lo, g);
    hi = Math.max(hi, g);
  }
  return { lo, hi };
}
const span = (a, b, k) => Array.from({ length: k }, (_, i) => a + ((b - a) * i) / (k - 1));

// ---------------------------------------------------------------- wall path
const pts = WALL.map((p) => ({ ...p }));
const NW = pts.length;
const segs = [];
let WALL_LEN = 0;
for (let i = 0; i < NW; i++) {
  const a = pts[i], b = pts[(i + 1) % NW];
  const len = Math.hypot(b.x - a.x, b.n - a.n);
  a.s = WALL_LEN;
  segs.push({ a, b, len, tx: (b.x - a.x) / len, tn: (b.n - a.n) / len, s0: WALL_LEN, thick: THICK_SEGMENTS[a.id] ?? THICK });
  WALL_LEN += len;
}
const wallById = Object.fromEntries(pts.map((p) => [p.id, p]));
const POLY = pts.map((p) => [p.x, p.n]);
const wrapS = (s) => ((s % WALL_LEN) + WALL_LEN) % WALL_LEN;

function wallAt(s) {
  s = wrapS(s);
  let seg = segs[segs.length - 1];
  for (const sg of segs) if (s < sg.s0 + sg.len) { seg = sg; break; }
  const t = s - seg.s0;
  return { x: seg.a.x + seg.tx * t, n: seg.a.n + seg.tn * t, tx: seg.tx, tn: seg.tn, thick: seg.thick };
}
function tangentAt(s, w = 20) {
  let tx = 0, tn = 0;
  for (const d of [-w, -w / 2, 0, w / 2, w]) {
    const p = wallAt(s + d);
    tx += p.tx; tn += p.tn;
  }
  const l = Math.hypot(tx, tn);
  return { tx: tx / l, tn: tn / l };
}
// The point v metres outwards from the wall's centre line at s.
function offsetAt(s, v) {
  const p = wallAt(s);
  return { x: p.x + p.tn * v, n: p.n - p.tx * v };
}
function insideCity(x, n) {
  let c = false;
  for (let i = 0, j = NW - 1; i < NW; j = i++) {
    const [xi, ni] = POLY[i], [xj, nj] = POLY[j];
    if (ni > n !== nj > n && x < ((xj - xi) * (n - ni)) / (nj - ni) + xi) c = !c;
  }
  return c;
}
function wallDist(x, n) {
  let best = Infinity;
  for (const sg of segs) {
    let t = (x - sg.a.x) * sg.tx + (n - sg.a.n) * sg.tn;
    t = Math.max(0, Math.min(sg.len, t));
    best = Math.min(best, Math.hypot(x - (sg.a.x + sg.tx * t), n - (sg.a.n + sg.tn * t)));
  }
  return best;
}
// Arc length of the wall point nearest (x, n).
function nearestS(x, n) {
  let best = Infinity, out = 0;
  for (const sg of segs) {
    let t = (x - sg.a.x) * sg.tx + (n - sg.a.n) * sg.tn;
    t = Math.max(0, Math.min(sg.len, t));
    const d = Math.hypot(x - (sg.a.x + sg.tx * t), n - (sg.a.n + sg.tn * t));
    if (d < best) { best = d; out = sg.s0 + t; }
  }
  return out;
}

// ---------------------------------------------------------------- terrain
{
  const SIZE = 2900, SEG = 290;
  const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG);
  geo.rotateX(-Math.PI / 2);
  geo.translate(120, 0, -60);
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) p.setY(i, ground(p.getX(i), -p.getZ(i)));
  const g2 = geo.toNonIndexed();
  g2.computeVertexNormals();
  const pos = g2.attributes.position, nor = g2.attributes.normal;
  const col = new Float32Array(pos.count * 3);
  const C = {
    scrub: new THREE.Color('#adb260'), grass: new THREE.Color('#77a647'), rock: new THREE.Color('#e2cf9e'),
    dirt: new THREE.Color('#dbbb8a'), garden: new THREE.Color('#4a9a38'), terra: new THREE.Color('#c27a4c'),
  };
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i += 3) {
    const x = (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3;
    const z = (pos.getZ(i) + pos.getZ(i + 1) + pos.getZ(i + 2)) / 3;
    const h = (pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3;
    const n = -z;
    const slope = 1 - nor.getY(i);
    const nz = noise2(x / 35, n / 35);
    c.copy(C.scrub).lerp(C.grass, clamp01((42 - h) / 40) * 0.75);
    c.lerp(C.rock, clamp01((slope - 0.06) / 0.16 + (nz - 0.5) * 0.7));
    // Patches of red terra rossa soil on the gentler slopes.
    c.lerp(C.terra, clamp01((noise2(x / 110, n / 110) - 0.5) * 3.5) * clamp01(1 - slope / 0.2) * 0.5);
    if (insideCity(x, n)) c.lerp(C.dirt, 0.7);
    const gd = Math.hypot(x - 80, n + 565);
    if (gd < 80) c.lerp(C.garden, clamp01((80 - gd) / 35) * 0.9);
    const j = 0.94 + noise2(x / 6, n / 6) * 0.1;
    for (let k = 0; k < 3; k++) {
      col[(i + k) * 3] = c.r * j; col[(i + k) * 3 + 1] = c.g * j; col[(i + k) * 3 + 2] = c.b * j;
    }
  }
  g2.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const terrain = new THREE.Mesh(g2, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true }));
  terrain.receiveShadow = true;
  scene.add(terrain);
}

// ---------------------------------------------------------------- gates & towers
// The gates of chapter 3, finished, plus the Gate of Ephraim (12:39). The
// Gate of the Guard is built with the temple court.
const GATES = {
  ...Object.fromEntries(Object.entries(CITY.GATES).map(([k, def]) => [k, { ...def, s: wallById[k].s }])),
  ...Object.fromEntries(Object.entries(DATA.GATES).filter(([, def]) => !def.court)
    .map(([k, def]) => [k, { ...def, s: nearestS(def.at.x, def.at.n) }])),
};
const OPEN = new Set(['valley']);   // the Levites come in through the Valley Gate
const wallGateS = Object.values(GATES).map((g) => g.s);
function nearGate(s) {
  return wallGateS.some((gs) => {
    const d = Math.abs(s - gs) % WALL_LEN;
    return Math.min(d, WALL_LEN - d) < GATE_HALF;
  });
}

// What stands on top of the wall: { s0, s1, y } for each gate and tower.
const tops = [];
const gateObjs = {};
const towerObjs = {};

function makeGate(key, def) {
  const s = def.s;
  const { tx, tn } = tangentAt(s, 3);
  const { x, n } = wallAt(s);
  const { lo, hi } = footprint(x, n, tx, tn, span(-8, 8, 5), span(-4, 7, 4));
  const g0 = lo - 0.6;
  const H = hi + WALL_H + 3 - g0;
  const gl = ground(x, n) - g0;          // passage floor, local height
  const G = framedGroup(x, n, tx, tn, g0);
  const passTop = gl + 5.6;

  for (const side of [-1, 1]) {
    add(G, stoneBox(6, H, 10), MAT.stone, side * 5, 0, 1.5);
    for (const [mx, mz] of [[-2.2, -2.9], [2.2, -2.9], [-2.2, 5.9], [2.2, 5.9], [0, 5.9]]) {
      add(G, stoneBox(1.4, 1.3, 1.1), MAT.stone, side * 5 + mx, H, mz);
    }
  }
  const upperY = def.beams ? passTop + 0.5 : passTop;
  add(G, stoneBox(4, H - upperY, 8), MAT.stone, 0, upperY, 1);

  if (def.beams) {
    const bg = new THREE.CylinderGeometry(0.2, 0.2, 9, 8).rotateX(Math.PI / 2);
    for (const bx of span(-1.75, 1.75, 6)) add(G, bg, MAT.darkWood, bx, passTop + 0.25, 1);
  }
  if (def.doors || def.intact) {
    // Two leaves near the inner mouth of the passage, iron-strapped. An open
    // gate has them swung back against the passage walls.
    for (const side of [-1, 1]) {
      const leaf = new THREE.Group();
      leaf.position.set(side, gl, DOOR_Z);
      if (OPEN.has(key)) {
        leaf.position.set(side * 1.85, gl, DOOR_Z - 0.99);
        leaf.rotation.y = Math.PI / 2;
      }
      G.add(leaf);
      add(leaf, baseBox(1.98, 5.4, 0.28), MAT.wood);
      for (const sy of [0.8, 2.7, 4.6]) for (const sz of [0.16, -0.16]) add(leaf, baseBox(1.9, 0.16, 0.05), MAT.iron, 0, sy, sz);
    }
  }
  if (def.bolts && !OPEN.has(key)) {
    const B = new THREE.Group();
    G.add(B);
    add(B, baseBox(0.55, 0.65, 0.2), MAT.iron, 0, gl + 2.4, DOOR_Z - 0.25);
    const rod = new THREE.CylinderGeometry(0.08, 0.08, 1.2, 8);
    for (const bx of [-0.22, 0.22]) {
      add(B, rod, MAT.iron, bx, gl + 0.7, DOOR_Z - 0.24);
      add(B, rod, MAT.iron, bx, gl + 4.7, DOOR_Z - 0.24);
    }
  }
  if (def.bars && !OPEN.has(key)) {
    for (const by of [1.5, 3.9]) {
      add(G, baseBox(4.6, 0.34, 0.34), MAT.darkWood, 0, gl + by, DOOR_Z - 0.55);
      for (const sx of [-1, 1]) add(G, baseBox(0.35, 0.6, 0.55), MAT.iron, sx * 1.95, gl + by - 0.13, DOOR_Z - 0.55);
    }
  }
  if (def.covered) {
    const rg = new THREE.ConeGeometry(1, 1, 4).rotateY(Math.PI / 4).translate(0, 0.5, 0);
    const r = add(G, rg, MAT.roof, 0, H, 1.5);
    r.scale.set(17.5 / Math.SQRT2, 4.5, 11.5 / Math.SQRT2);
  }
  // A roofed gate can't be walked over; the procession steps round its roof.
  tops.push({ s0: s - GATE_HALF, s1: s + GATE_HALF, y: g0 + H });
  gateObjs[key] = {
    key, s, def, group: G,
    labelPos: G.localToWorld(new THREE.Vector3(0, H + 7, 1.5)),
    center: G.localToWorld(new THREE.Vector3(0, gl + 3.5, DOOR_Z)),
  };
}

function makeTower(key, def) {
  const wp = wallById[key];
  const s = wp.s;
  const { tx, tn } = tangentAt(s, 6);
  const w = def.size, d = def.size;
  const vC = d / 2 - THICK / 2;   // inner face flush with the wall's inner face
  const { lo, hi } = footprint(wp.x, wp.n, tx, tn, span(-w / 2, w / 2, 3), span(vC - d / 2, vC + d / 2, 3));
  const g0 = lo - 0.6;
  const H = hi + WALL_H + 4 - g0;
  const G = framedGroup(wp.x, wp.n, tx, tn, g0);
  add(G, stoneBox(w, H, d), MAT.stone, 0, 0, vC);
  const k = Math.max(2, Math.round(w / 3));
  for (const u of span(-w / 2 + 0.7, w / 2 - 0.7, k)) {
    add(G, stoneBox(1.3, 1.3, 1), MAT.stone, u, H, vC + d / 2 - 0.5);
    add(G, stoneBox(1.3, 1.3, 1), MAT.stone, u, H, vC - d / 2 + 0.5);
  }
  for (const v of span(vC - d / 2 + 2, vC + d / 2 - 2, Math.max(2, k - 1))) {
    add(G, stoneBox(1, 1.3, 1.3), MAT.stone, -w / 2 + 0.5, H, v);
    add(G, stoneBox(1, 1.3, 1.3), MAT.stone, w / 2 - 0.5, H, v);
  }
  if (def.chamber) {
    add(G, stoneBox(w * 0.55, 3.6, d * 0.55), MAT.stone, 0, H, vC);
    add(G, baseBox(w * 0.62, 0.4, d * 0.62), MAT.darkWood, 0, H + 3.6, vC);
    add(G, baseBox(1.2, 1.4, 0.2), MAT.dark, 0, H + 1.4, vC + d * 0.275 + 0.05);
  }
  tops.push({ s0: s - w / 2, s1: s + w / 2, y: g0 + H });
  towerObjs[key] = {
    key, s, def, group: G,
    labelPos: G.localToWorld(new THREE.Vector3(0, H + (def.chamber ? 11 : 7), vC)),
    center: G.localToWorld(new THREE.Vector3(0, H * 0.6, vC)),
  };
}

for (const [k, def] of Object.entries(GATES)) makeGate(k, def);
for (const [k, def] of Object.entries(TOWERS)) makeTower(k, def);

// ---------------------------------------------------------------- wall blocks
// The finished wall, every block an instance. The bottom courses, which
// survived from the old wall, are darker.
const blocks = [];
const NTOP = Math.ceil(WALL_LEN);
const rawTop = new Float32Array(NTOP).fill(-Infinity);   // top of the wall's courses, per metre of s
function raiseTop(s0, s1, y) {
  for (let j = Math.floor(s0); j <= Math.ceil(s1); j++) {
    const i = ((j % NTOP) + NTOP) % NTOP;
    rawTop[i] = Math.max(rawTop[i], y);
  }
}
segs.forEach((sg, si) => {
  const ncol = Math.max(1, Math.round(sg.len / BL));
  const bl = sg.len / ncol;
  const yaw = Math.atan2(sg.tn, sg.tx);
  const half = sg.thick / 2;
  for (let i = 0; i < ncol; i++) {
    const u = (i + 0.5) * bl;
    const s = sg.s0 + u;
    if (nearGate(s)) continue;
    const cx = sg.a.x + sg.tx * u, cn = sg.a.n + sg.tn * u;
    const { lo, hi } = footprint(cx, cn, sg.tx, sg.tn, [-bl / 2, bl / 2], [-half, half]);
    const base = lo - 0.6;
    const nC = Math.ceil((hi + WALL_H - base) / CH);
    const oldH = 0.4 + 2.8 * noise2(s / 18, si * 7.3);
    raiseTop(s - bl / 2 + 0.5, s + bl / 2 - 0.5, base + nC * CH);
    for (let c = 0; c < nC; c++) {
      let uu = u;
      if (c % 2) {
        if (i === ncol - 1) continue;
        uu = u + bl / 2;
        if (nearGate(sg.s0 + uu)) continue;
      }
      const above = base + (c + 1) * CH - lo;
      blocks.push({
        s: sg.s0 + uu, x: sg.a.x + sg.tx * uu, n: sg.a.n + sg.tn * uu, y: base + (c + 0.5) * CH,
        yaw, sx: bl * 0.95, sy: CH * 0.92, sz: sg.thick, old: above <= oldH,
      });
    }
    if (i % 2 === 0) {
      blocks.push({
        s, x: cx + sg.tn * (half - 0.35), n: cn - sg.tx * (half - 0.35), y: base + nC * CH + 0.55,
        yaw, sx: bl * 0.55, sy: 1.1, sz: 0.7, old: false,
      });
    }
  }
});
// Corner piers where the wall changes direction.
pts.forEach((p, i) => {
  if (nearGate(p.s)) return;
  const a = segs[(i - 1 + NW) % NW], b = segs[i];
  const yaw = Math.atan2(a.tn + b.tn, a.tx + b.tx);
  const t = Math.max(a.thick, b.thick) + 0.2;
  const l = Math.hypot(a.tx + b.tx, a.tn + b.tn);
  const tx = (a.tx + b.tx) / l, tn = (a.tn + b.tn) / l;
  const { lo, hi } = footprint(p.x, p.n, tx, tn, [-t / 2, t / 2], [-t / 2, t / 2]);
  const base = lo - 0.6;
  const nC = Math.ceil((hi + WALL_H - base) / CH);
  raiseTop(p.s - t / 2, p.s + t / 2, base + nC * CH);
  for (let c = 0; c < nC; c++) {
    const above = base + (c + 1) * CH - lo;
    blocks.push({ s: p.s, x: p.x, n: p.n, y: base + (c + 0.5) * CH, yaw, sx: t, sy: CH * 0.92, sz: t, old: above <= 1.6 });
  }
});

const blockMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), MAT.block, blocks.length);
blockMesh.castShadow = blockMesh.receiveShadow = true;
const blockColors = [];
{
  const fresh = ['#f1e7cf', '#e9ddbf', '#e2d3ae', '#ece2c8', '#dccb9f'].map((h) => new THREE.Color(h));
  const old = new THREE.Color('#a39478');
  const m = new THREE.Matrix4(), q = new THREE.Quaternion();
  blocks.forEach((b, i) => {
    const c = fresh[(rand() * fresh.length) | 0].clone();
    if (b.old) c.lerp(old, 0.35 + rand() * 0.2);
    blockColors.push(c);
    blockMesh.setColorAt(i, c);
    q.setFromAxisAngle(UP, b.yaw);
    blockMesh.setMatrixAt(i, m.compose(new THREE.Vector3(b.x, b.y, -b.n), q, new THREE.Vector3(b.sx, b.sy, b.sz)));
  });
}
scene.add(blockMesh);

// The walkway: the top of the courses, raised over gates and towers, with
// ramps of steps up to them no steeper than RAMP_SLOPE.
for (const tp of tops) raiseTop(tp.s0, tp.s1, tp.y);
for (let pass = 0; pass < 2; pass++) {
  for (let j = 0; j < NTOP; j++) if (rawTop[j] === -Infinity) rawTop[j] = rawTop[(j + NTOP - 1) % NTOP];
}
const walkTop = Float32Array.from(rawTop);
for (let pass = 0; pass < 2; pass++) {
  for (let j = 0; j < NTOP; j++) walkTop[j] = Math.max(walkTop[j], walkTop[(j + NTOP - 1) % NTOP] - RAMP_SLOPE);
  for (let j = NTOP - 1; j >= 0; j--) walkTop[j] = Math.max(walkTop[j], walkTop[(j + 1) % NTOP] - RAMP_SLOPE);
}
function wallTop(s) {
  const f = wrapS(s), j = Math.floor(f) % NTOP;
  return lerp(walkTop[j], walkTop[(j + 1) % NTOP], f - Math.floor(f));
}
{
  const steps = [];
  for (let j = 0; j < NTOP; j++) {
    const rise = walkTop[j] - rawTop[j];
    if (rise > 0.2 && !tops.some((tp) => wrapS(j - tp.s0) < tp.s1 - tp.s0)) steps.push({ s: j + 0.5, y0: rawTop[j] - 0.2, h: rise + 0.2 });
  }
  const mesh = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0), MAT.block, steps.length);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), c = new THREE.Color('#e4d7b4');
  steps.forEach((st, i) => {
    const p = offsetAt(st.s, WALK_V), { tx, tn } = tangentAt(st.s, 1);
    q.setFromAxisAngle(UP, Math.atan2(tn, tx));
    mesh.setMatrixAt(i, m.compose(new THREE.Vector3(p.x, st.y0, -p.n), q, new THREE.Vector3(1.04, st.h, 2.2)));
    mesh.setColorAt(i, c);
  });
  mesh.castShadow = mesh.receiveShadow = true;
  scene.add(mesh);
}

// ---------------------------------------------------------------- stairs
// Flights up the inside face of the wall: where the choirs go up beside the
// Valley Gate (12:31), and come down after the Water Gate and the Sheep Gate.
function stairV(s) { return -(wallAt(s).thick / 2 + STAIR_W / 2); }
function makeStair(bottom, top) {
  const dir = Math.sign(top - bottom);
  const foot = offsetAt(bottom, stairV(bottom));
  const st = { bottom, top, dir, yFoot: ground(foot.x, foot.n), yTop: wallTop(top) };
  const n = Math.round(STAIR_LEN / 0.8);
  for (let i = 0; i < n; i++) {
    const s = bottom + dir * ((i + 0.5) * STAIR_LEN) / n;
    const p = offsetAt(s, stairV(s)), { tx, tn } = tangentAt(s, 2);
    const y = lerp(st.yFoot, st.yTop, (i + 1) / n);
    const lo = Math.min(ground(p.x, p.n), st.yFoot) - 1;
    const G = framedGroup(p.x, p.n, tx, tn, lo);
    add(G, stoneBox(STAIR_LEN / n + 0.05, y - lo, STAIR_W), MAT.stone);
  }
  return st;
}

// ---------------------------------------------------------------- routes
// A route is a line through plan space with heights, measured in metres:
// up a stair, along the top of the wall, down a stair, over the ground.
// at(d) gives the point d metres along it (straight on beyond either end).
class Route {
  constructor() { this.p = []; this.marks = {}; }
  push(x, n, y, s) {
    const last = this.p[this.p.length - 1];
    if (last && Math.hypot(last.x - x, last.n - n, last.y - y) < 0.05) return;
    this.p.push({ x, n, y, s });
  }
  ground(list) {
    const last = this.p[this.p.length - 1];
    if (last) list = [[last.x, last.n], ...list];
    for (let i = 1; i < list.length; i++) {
      const [ax, an] = list[i - 1], [bx, bn] = list[i];
      const k = Math.max(1, Math.ceil(Math.hypot(bx - ax, bn - an)));
      for (let j = i === 1 ? 0 : 1; j <= k; j++) {
        const x = lerp(ax, bx, j / k), n = lerp(an, bn, j / k);
        this.push(x, n, ground(x, n));
      }
    }
    return this;
  }
  stair(st, down) {
    const k = 32;
    for (let j = 0; j <= k; j++) {
      const u = down ? 1 - j / k : j / k;
      const s = st.bottom + st.dir * u * STAIR_LEN;
      const p = offsetAt(s, stairV(s));
      this.push(p.x, p.n, lerp(st.yFoot, st.yTop, u));
    }
    return this;
  }
  wall(from, to, ids) {
    const dir = Math.sign(to - from), len = Math.abs(to - from);
    for (let u = 0; u <= len; u++) {
      const s = from + dir * u;
      const p = offsetAt(s, WALK_V);
      this.push(p.x, p.n, wallTop(s), s);
    }
    this.wallMarks = [...(this.wallMarks ?? []), ...ids];
    return this;
  }
  mark(name) { this.marks[name] = this.p.length - 1; return this; }
  finish() {
    this.cum = [0];
    for (let i = 1; i < this.p.length; i++) {
      const a = this.p[i - 1], b = this.p[i];
      this.cum.push(this.cum[i - 1] + Math.hypot(b.x - a.x, b.n - a.n, b.y - a.y));
    }
    this.len = this.cum[this.cum.length - 1];
    for (const [k, i] of Object.entries(this.marks)) this.marks[k] = this.cum[i];
    // A wall id marks the point above it.
    for (const id of this.wallMarks ?? []) {
      const s = wallById[id].s;
      let best = Infinity;
      this.p.forEach((q, i) => {
        if (q.s === undefined) return;
        const d = Math.abs(wrapS(q.s - s + WALL_LEN / 2) - WALL_LEN / 2);
        if (d < best) { best = d; this.marks[id] = this.cum[i]; }
      });
    }
    return this;
  }
  // { x, n, y, hx, hn, s } at d metres along; (hx, hn) is the heading.
  at(d) {
    const { p, cum } = this;
    let i = 1;
    if (d >= this.len) i = p.length - 1;
    else if (d > 0) {
      let lo = 1, hi = p.length - 1;
      while (lo < hi) { const m = (lo + hi) >> 1; if (cum[m] < d) lo = m + 1; else hi = m; }
      i = lo;
    }
    const a = p[i - 1], b = p[i], l = cum[i] - cum[i - 1] || 1;
    const t = (d - cum[i - 1]) / l;
    const h = Math.hypot(b.x - a.x, b.n - a.n) || 1;
    return {
      x: lerp(a.x, b.x, t), n: lerp(a.n, b.n, t), y: lerp(a.y, b.y, clamp01(t)),
      hx: (b.x - a.x) / h, hn: (b.n - a.n) / h,
      s: a.s !== undefined && b.s !== undefined ? lerp(a.s, b.s, t) : undefined,
    };
  }
}

const SV = wallById.valley.s, SW = wallById.water.s;
const routes = {
  1: new Route().stair(makeStair(SV + 12, SV + 12 + STAIR_LEN)).mark('top')
    .wall(SV + 13 + STAIR_LEN, SW + 11, ['dung', 'stairs', 'water'])
    .stair(makeStair(SW + 12 + STAIR_LEN, SW + 12), true)
    .ground([[104, 262], [94, 340], [70, 404], [46, 424], [45, 452]])
    .finish(),
  2: new Route().stair(makeStair(SV - 12, SV - 12 - STAIR_LEN)).mark('top')
    .wall(SV - 13 - STAIR_LEN, -11, ['broad', 'fish', 'sheep'])
    .stair(makeStair(-12 - STAIR_LEN, -12), true)
    .ground([[124, 698], [96, 668], [64, 632], [45, 612]]).mark('guard')
    .ground([[45, 588]])
    .finish(),
};

// ---------------------------------------------------------------- landmarks
function featurePos(key) {
  const f = FEATURES[key];
  return { x: f.x, n: f.n, g: ground(f.x, f.n) };
}
function nearestTangent(x, n) {
  let best = Infinity, out = segs[0];
  for (const sg of segs) {
    let t = (x - sg.a.x) * sg.tx + (n - sg.a.n) * sg.tn;
    t = Math.max(0, Math.min(sg.len, t));
    const d = Math.hypot(x - (sg.a.x + sg.tx * t), n - (sg.a.n + sg.tn * t));
    if (d < best) { best = d; out = sg; }
  }
  return out;
}
// A simple flat-roofed stone building, sunk to the lowest corner.
function building(x, n, tx, tn, w, h, d, parent) {
  const { lo } = footprint(x, n, tx, tn, [-w / 2, w / 2], [-d / 2, d / 2]);
  const G = parent ?? framedGroup(x, n, tx, tn, lo - 1);
  add(G, stoneBox(w, h + 1, d), MAT.stone);
  add(G, baseBox(w + 0.6, 0.5, d + 0.6), MAT.flatRoof, 0, h + 1);
  return G;
}

// The Temple (Zerubbabel's, rebuilt 516 BC) with its court, facing east. The
// court has openings north, south and east; the north one is shown as the
// Gate of the Guard (12:39).
const COURT = { x0: -30, x1: 120, n0: 445, n1: 595, door: 45 };
const ALTAR = { x: 72, n: 520 };
let altarTop;
let guardGate;
{
  const { x, n, g } = featurePos('temple');
  const T = new THREE.Group();
  T.position.set(x, g - 1.5, -n);
  scene.add(T);
  add(T, stoneBox(64, 3, 42), MAT.stone, -2, 0, 0);
  add(T, stoneBox(34, 15, 13), MAT.stone, -6, 3, 0);
  add(T, stoneBox(6, 19, 18), MAT.stone, 14, 3, 0);
  add(T, baseBox(0.4, 7, 3.2), MAT.dark, 17.05, 3, 0);
  add(T, stoneBox(7, 3, 7), MAT.stone, ALTAR.x - x, 0.5, 0);
  add(T, baseBox(4, 0.3, 4), MAT.embers, ALTAR.x - x, 3.5, 0).castShadow = false;
  altarTop = v3(ALTAR.x, ALTAR.n, g + 2.3);
  add(T, baseBox(35, 0.6, 14), MAT.roof, -6, 18, 0);
  // Court walls, in pieces round the openings.
  const piece = (x0, n0, x1, n1) => {
    const cx = (x0 + x1) / 2, cn = (n0 + n1) / 2, w = Math.max(2.5, x1 - x0), d = Math.max(2.5, n1 - n0);
    const lo = Math.min(ground(x0, n0), ground(x1, n1), ground(cx, cn));
    add(T, stoneBox(w, 5 + (g - lo), d), MAT.stone, cx - x, lo - g + 0.5, n - cn);
  };
  const { x0, x1, n0, n1, door } = COURT;
  for (const cn of [n0, n1]) {
    piece(x0, cn, door - 5, cn);
    piece(door + 5, cn, x1, cn);
  }
  piece(x0, n0, x0, n1);
  piece(x1, n0, x1, ALTAR.n - 6);
  piece(x1, ALTAR.n + 6, x1, n1);
  // The Gate of the Guard: piers and a lintel over the north opening.
  const G = new THREE.Group();
  G.position.set(door, ground(door, n1) - 0.5, -n1);
  scene.add(G);
  for (const side of [-1, 1]) add(G, stoneBox(3.4, 9, 4.4), MAT.stone, side * 6.2, 0, 0);
  add(G, stoneBox(15.8, 2, 4.4), MAT.stone, 0, 7.5, 0);
  guardGate = { labelPos: v3(door, n1, ground(door, n1) + 16), center: v3(door, n1, ground(door, n1) + 4) };
}

// Named houses and buildings along the east side.
{
  for (const [key, w, h, d] of [['eliashib', 16, 7, 12], ['mighty', 22, 6, 11]]) {
    const { x, n } = featurePos(key);
    const sg = nearestTangent(x, n);
    building(x, n, sg.tx, sg.tn, w, h, d);
  }
  {
    const { x, n } = featurePos('armory');
    const sg = nearestTangent(x, n);
    const G = building(x, n, sg.tx, sg.tn, 14, 8, 12);
    for (let i = 0; i < 7; i++) add(G, stoneBox(4, 1 + i * 0.9, 1.6), MAT.stone, -10 - (6 - i) * 1.6 + 2, 0, -2);
  }
  {
    const { x, n } = featurePos('kingsHouse');
    const sg = nearestTangent(x, n);
    const G = building(x, n, sg.tx, sg.tn, 26, 9, 18);
    add(G, stoneBox(14, 5, 10), MAT.stone, -3, 10.5, 0);
    add(G, baseBox(14.6, 0.5, 10.6), MAT.roof, -3, 15.5, 0);
    for (const [cx, cz, w, d] of [[-24, -9, 22, 1.2], [-24, 9, 22, 1.2], [-35, 0, 1.2, 19]]) add(G, stoneBox(w, 4, d), MAT.stone, cx, 0, cz);
  }
}

// Tombs of David: rock-cut tunnel tombs in an outcrop.
{
  const { x, n, g } = featurePos('tombs');
  const sg = nearestTangent(x, n);
  const G = framedGroup(x, n, sg.tx, sg.tn, g - 2);
  add(G, baseBox(18, 7, 8), MAT.rock, 0, 0, 2);
  add(G, baseBox(12, 2, 6), MAT.rock, -2, 7, 2.5);
  for (const u of [-5.5, 0, 5.5]) add(G, baseBox(2.2, 3.2, 0.4), MAT.dark, u, 2.2, -2.05);
}

// Pools: the Pool of Siloam, "the pool that was made", and the Gihon Spring.
function pool(key, w, d) {
  const { x, n } = featurePos(key);
  const sg = nearestTangent(x, n);
  const { lo, hi } = footprint(x, n, sg.tx, sg.tn, [-w / 2, w / 2], [-d / 2, d / 2]);
  const G = framedGroup(x, n, sg.tx, sg.tn, lo - 1);
  const rimH = Math.min(hi - lo, 3) + 1.4;
  add(G, stoneBox(w + 2, rimH, d + 2), MAT.stone);
  add(G, baseBox(w, 0.2, d), MAT.water, 0, rimH - 0.02).castShadow = false;
  return G;
}
pool('poolSiloam', 22, 12);
pool('artificialPool', 16, 9);
{
  const { x, n, g } = featurePos('gihon');
  const sg = nearestTangent(x, n);
  const G = framedGroup(x, n, sg.tx, sg.tn, g - 1);
  const r = add(G, new THREE.DodecahedronGeometry(6, 0), MAT.rock, -4, 0, -3);
  r.scale.set(1.3, 0.8, 1);
  add(G, baseBox(2.6, 2.6, 1), MAT.dark, -4, 1.2, 2.2);
  add(G, baseBox(8, 0.3, 6), MAT.water, 0, 0.9, 5).castShadow = false;
}

// Stairs going down from the City of David.
{
  const a = { x: 22, n: -392 }, b = { x: 50, n: -440 };
  const len = Math.hypot(b.x - a.x, b.n - a.n);
  const tx = (b.x - a.x) / len, tn = (b.n - a.n) / len;
  const steps = 22;
  const ya = ground(a.x, a.n) + 0.3, yb = ground(b.x, b.n) + 0.3;
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const x = lerp(a.x, b.x, t), n = lerp(a.n, b.n, t);
    const top = lerp(ya, yb, t);
    const lo = Math.min(ground(x - 2, n), ground(x + 2, n), ground(x, n)) - 1;
    const G = framedGroup(x, n, tx, tn, lo);
    add(G, stoneBox(len / steps + 0.1, top - lo, 4), MAT.stone);
  }
}

// ---------------------------------------------------------------- the gathering place
// Inside the Valley Gate, in the gate's frame: U along the wall (towards the
// Dung Gate), IN into the city.
const GATHER = (() => {
  const p = wallById.valley, { tx, tn } = tangentAt(SV, 10);
  const at = (u, v) => ({ x: p.x + tx * u - tn * v, n: p.n + tn * u + tx * v });
  return { at, face: { hx: tn, hn: -tx } };   // waiting, they face the wall
})();
// Where the Levites and singers come from (12:28-29): up the valley from the
// south (Netophah) and down it from the north (Geba, Azmaveth), in through the
// Valley Gate.
const STREAMS = [
  new Route().ground([[-178, -230], [-150, -60], [-138, 30], [GATHER.at(0, -16).x, GATHER.at(0, -16).n], [GATHER.at(0, 6).x, GATHER.at(0, 6).n]]).finish(),
  new Route().ground([[-250, 330], [-190, 170], [-150, 85], [GATHER.at(0, -16).x, GATHER.at(0, -16).n], [GATHER.at(0, 6).x, GATHER.at(0, 6).n]]).finish(),
];

// ---------------------------------------------------------------- houses
// Houses: "the city was large and great: but the people were few therein,
// and the houses were not builded" (7:4). Sparse, with many still ruined.
// They stand in rows along a few streets, and back onto the inside of the wall.
// The gathering place, the stairs and the choirs' ways to the temple are kept clear.
const STREETS = [
  [[25, -450], [22, -300], [18, -150], [20, 0], [25, 150], [30, 300], [35, 425]],
  [[-42, -415], [22, -330]],
  [[-98, 58], [-40, 38], [20, 10]],
  [[25, 170], [105, 166]],
  [[30, 330], [135, 356]],
  [[-98, 70], [-120, 250], [-150, 450], [-172, 610], [-130, 690]],
  [[-150, 450], [-40, 452]],
  [[-130, 690], [0, 702], [100, 692]],
];
function nearRoute(x, n, r, d) {
  for (let i = 0; i < r.p.length; i += 2) if (Math.hypot(r.p[i].x - x, r.p[i].n - n) < d) return true;
  return false;
}
{
  const reserved = Object.values(FEATURES).filter((f) => f.kind === 'feature');
  const gatherC = GATHER.at(0, 18);
  const list = [];
  const r = mulberry32(731);
  const radius = (h) => Math.min(h.w, h.d) / 2;
  function place(x, n, tx, tn, w, d, minWall) {
    if (!insideCity(x, n) || wallDist(x, n) < minWall) return;
    if (x > -35 && x < 125 && n > 435 && n < 605) return;
    if (reserved.some((f) => Math.hypot(f.x - x, f.n - n) < 24)) return;
    if (Math.hypot(x - 36, n + 416) < 34) return;
    if (Object.keys(GATES).some((k) => { const p = wallAt(GATES[k].s); return Math.hypot(p.x - x, p.n - n) < 22; })) return;
    if (Math.hypot(gatherC.x - x, gatherC.n - n) < 36) return;
    if (Object.values(routes).some((rt) => nearRoute(x, n, rt, 12))) return;
    const { lo, hi } = footprint(x, n, tx, tn, [-w / 2, w / 2], [-d / 2, d / 2]);
    if (hi - lo > 6) return;
    const me = { w, d };
    if (list.some((h) => Math.hypot(h.x - x, h.n - n) < radius(h) + radius(me) + 1.5)) return;
    const ruin = r() < 0.4;
    list.push({ x, n, w, d, h: ruin ? 1 + r() * 1.4 : 3.5 + r() * 2.5, ruin, yaw: Math.atan2(tn, tx) });
  }
  function row(path, side, setback, keep, minWall) {
    for (let i = 1; i < path.length; i++) {
      const [ax, an] = path[i - 1], [bx, bn] = path[i];
      const len = Math.hypot(bx - ax, bn - an), tx = (bx - ax) / len, tn = (bn - an) / len;
      let run = 0;
      for (let u = 4 + r() * 6; u < len - 4;) {
        const w = 6 + r() * 5, d = 7 + r() * 4;
        if (run <= 0) run = r() < keep ? 2 + Math.floor(r() * 4) : -(1 + Math.floor(r() * 3));
        const c = u + w / 2, off = side * (setback + d / 2);
        if (run > 0) place(ax + tx * c - tn * off, an + tn * c + tx * off, tx, tn, w, d, minWall);
        run += run > 0 ? -1 : 1;
        u += w + (run === 0 ? 4 + r() * 6 : 0.4 + r() * 1.2);
      }
    }
  }
  const ring = [...pts, pts[0]].map((p) => [p.x, p.n]);
  row(ring, 1, 9, 0.5, 9);
  for (const path of STREETS) for (const side of [1, -1]) row(path, side, 2.5, path === STREETS[0] ? 0.75 : 0.55, 16);
  const body = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0), MAT.plain, list.length);
  const roof = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0), MAT.plain, list.length);
  const plaster = ['#ecdcb6', '#e0c595', '#f1e6cb', '#d9bf8c', '#e8cfa2'].map((h) => new THREE.Color(h));
  const roofs = ['#bfa070', '#b0865a', '#c9aa76'].map((h) => new THREE.Color(h));
  const ruinC = new THREE.Color('#b3a37f');
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), P = new THREE.Vector3(), S = new THREE.Vector3();
  list.forEach((h, i) => {
    const c = Math.cos(h.yaw), s = Math.sin(h.yaw);
    const { lo } = footprint(h.x, h.n, c, s, [-h.w / 2, h.w / 2], [-h.d / 2, h.d / 2]);
    q.setFromAxisAngle(UP, h.yaw);
    body.setMatrixAt(i, m.compose(P.set(h.x, lo - 1, -h.n), q, S.set(h.w, h.h + 1, h.d)));
    body.setColorAt(i, h.ruin ? ruinC : plaster[i % plaster.length]);
    if (h.ruin) m.makeScale(0, 0, 0);
    else m.compose(P.set(h.x, lo + h.h, -h.n), q, S.set(h.w + 0.5, 0.45, h.d + 0.5));
    roof.setMatrixAt(i, m);
    roof.setColorAt(i, roofs[i % roofs.length]);
  });
  for (const mesh of [body, roof]) { mesh.castShadow = mesh.receiveShadow = true; scene.add(mesh); }
}

// Olive trees: Mount of Olives, the King's Garden, the valley floors.
{
  const list = [];
  const gardens = { x: 80, n: -565 };
  for (let i = 0; i < 16000 && list.length < 1100; i++) {
    const x = -900 + rand() * 2100, n = -1000 + rand() * 2100;
    if (insideCity(x, n) || wallDist(x, n) < 20) continue;
    if (STREAMS.some((rt) => nearRoute(x, n, rt, 5))) continue;
    const h = ground(x, n);
    let p = 0.03;
    if (x > 300 && h > 40) p = 0.35;
    if (valleyDist(VALLEYS.kidron, x, n).d < 30) p = 0.3;
    if (valleyDist(VALLEYS.hinnom, x, n).d < 45) p = 0.15;
    if (Math.hypot(x - gardens.x, n - gardens.n) < 70) p = 1;
    if (rand() > p) continue;
    list.push({ x, n, y: h, k: 0.8 + rand() * 0.6, yaw: rand() * 6.28 });
  }
  const trunk = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.25, 0.4, 2.6, 5).translate(0, 1.3, 0), MAT.trunk, list.length);
  const crown = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(2.6, 0), MAT.leaf, list.length);
  const greens = ['#809d55', '#6d8c47', '#90a85f', '#5e8a42'].map((h) => new THREE.Color(h));
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), P = new THREE.Vector3(), S = new THREE.Vector3();
  list.forEach((tr_, i) => {
    q.setFromAxisAngle(UP, tr_.yaw);
    trunk.setMatrixAt(i, m.compose(P.set(tr_.x, tr_.y - 0.3, -tr_.n), q, S.setScalar(tr_.k)));
    crown.setMatrixAt(i, m.compose(P.set(tr_.x, tr_.y + 3.2 * tr_.k, -tr_.n), q, S.set(1.25 * tr_.k, 0.8 * tr_.k, 1.15 * tr_.k)));
    crown.setColorAt(i, greens[i % greens.length]);
  });
  for (const mesh of [trunk, crown]) { mesh.castShadow = true; mesh.receiveShadow = true; scene.add(mesh); }
}

// ---------------------------------------------------------------- people
// Each procession, front to back, as 12:31-42 lists it. Choir 1: Ezra in front
// (12:36), the choir, Hoshaiah and half the leaders, priests' sons with
// trumpets, Zechariah and his kinsmen with "the instruments of David".
// Choir 2: the choir, Nehemiah, half the officials, the priests with trumpets
// (12:40-41) and half the people. Levites and singers wear linen (2 Chr 5:12).
const COLORS = {
  linen: ['#f4f0e6', '#ece6d8', '#f7f4ec'].map((h) => new THREE.Color(h)),
  leader: ['#5d3f6e', '#2f5d6e', '#7a3a2a', '#4a6a3a', '#3d4a7a'].map((h) => new THREE.Color(h)),
  people: ['#8a5a3c', '#b8874f', '#6f7f8c', '#9c6b4e', '#c9b48a', '#7a6a4f', '#5f7656', '#a8553a'].map((h) => new THREE.Color(h)),
  women: ['#a0525a', '#7c6a9a', '#c08a5a', '#5e7f8f', '#9c7a3c', '#b56f4a'].map((h) => new THREE.Color(h)),
  skin: ['#a8714c', '#8e5c3c', '#b98262', '#9a6646'].map((h) => new THREE.Color(h)),
  ezra: new THREE.Color('#33406e'),
  nehemiah: new THREE.Color('#8c2f2f'),
};
const pickC = (list) => list[Math.floor(rand() * list.length)];
const SINGER_INSTR = ['lyre', null, 'cymbals', 'harp', null, 'lyre'];
const DAVID_INSTR = ['lyre', 'harp', 'cymbals'];

const figures = [];
function figure(o) {
  const f = {
    x: 0, n: 0, y: 0, hx: 1, hn: 0, k: 0.95 + rand() * 0.15, phase: rand() * 10,
    body: pickC(COLORS.people), head: pickC(COLORS.skin), inst: null, moving: 0, ...o,
  };
  f.idx = figures.push(f) - 1;
  return f;
}
const choirs = {};
for (const c of [1, 2]) {
  const list = [];
  const push = (count, o) => { for (let i = 0; i < count; i++) list.push(typeof o === 'function' ? o(i) : { ...o }); };
  const singers = (i) => ({ role: 'choir', body: pickC(COLORS.linen), inst: SINGER_INSTR[i % SINGER_INSTR.length], arrive: true });
  if (c === 1) {
    push(1, { role: 'ezra', body: COLORS.ezra });
    push(32, singers);
    push(13, () => ({ role: 'leader', body: pickC(COLORS.leader) }));
    push(8, () => ({ role: 'priest', body: pickC(COLORS.linen), inst: 'trumpet' }));
    push(9, (i) => ({ role: 'levite', body: pickC(COLORS.linen), inst: DAVID_INSTR[i % 3], arrive: true }));
  } else {
    push(32, singers);
    push(1, { role: 'nehemiah', body: COLORS.nehemiah });
    push(14, () => ({ role: 'leader', body: pickC(COLORS.leader) }));
    push(7, () => ({ role: 'priest', body: pickC(COLORS.linen), inst: 'trumpet' }));
    push(96, () => ({ role: 'people', body: pickC(rand() < 0.5 ? COLORS.people : COLORS.women) }));
  }
  const sgn = c === 1 ? 1 : -1, cols = c === 1 ? 8 : 10;
  const route = routes[c];
  const start = route.at(0);
  const members = list.map((o, k) => {
    const row = Math.floor(k / 2), lane = k % 2 ? LANE : -LANE;
    // Waiting in the gathering place, front ranks nearest the stairs.
    const slot = GATHER.at(sgn * (9 + (k % cols) * 1.25), 7 + Math.floor(k / cols) * 1.3);
    const f = figure({ ...o, choir: c, order: k, row, lane, slot, slotFace: GATHER.face });
    f.startDist = Math.hypot(slot.x - start.x, slot.n - start.n);
    return f;
  });
  // In the temple court, the two choirs face each other across the altar's axis.
  const end = route.at(route.len);
  const eCols = c === 1 ? 21 : 25;
  members.forEach((f) => {
    const x = (c === 1 ? 40 : 36) + (f.order % eCols) * 1.3;
    const n = c === 1 ? 496 - Math.floor(f.order / eCols) * 1.4 : 544 + Math.floor(f.order / eCols) * 1.4;
    f.end = { x, n };
    f.endFace = { hx: 0, hn: c === 1 ? 1 : -1 };
    f.endDist = Math.hypot(x - end.x, n - end.n);
  });
  route.marks.gather = Math.min(...members.map((f) => f.row * GAP - f.startDist)) - 0.5;
  route.marks.formed = route.marks.top + 2 + Math.max(...members.map((f) => f.row)) * GAP;
  route.marks.court = route.len + Math.max(...members.map((f) => f.row * GAP + f.endDist)) + 0.5;
  choirs[c] = { route, members, lead: route.marks.gather, sgn };
}
// The Levites and singers come in from their villages, two streams of them.
const arrivals = figures.filter((f) => f.arrive);
arrivals.forEach((f, i) => {
  f.stream = STREAMS[i % 2];
  f.ord = Math.floor(i / 2);
  const e = f.stream.at(f.stream.len);
  f.arrDist = Math.hypot(f.slot.x - e.x, f.slot.n - e.n);
});
const ARRIVE_GAP = 2.2;
const ARRIVE_LEN = Math.max(...arrivals.map((f) => f.stream.len + f.arrDist + f.ord * ARRIVE_GAP));

// The rest of the people, waiting in the temple court east of the altar,
// women and children among them (12:43).
const crowd = [];
{
  const r = mulberry32(4312);
  for (let tries = 0; crowd.length < 280 && tries < 20000; tries++) {
    const x = 84 + r() * 32, n = COURT.n0 + 4 + r() * (COURT.n1 - COURT.n0 - 8);
    if (Math.abs(n - ALTAR.n) < 7 && x > 112) continue;
    if (crowd.some((f) => Math.hypot(f.x - x, f.n - n) < 1.25)) continue;
    const kind = r();
    const child = kind < 0.2, woman = !child && kind < 0.6;
    crowd.push(figure({
      role: 'crowd', x, n, y: ground(x, n), hx: -1, hn: 0, k: child ? 0.55 + r() * 0.15 : 0.92 + r() * 0.15,
      body: pickC(woman ? COLORS.women : COLORS.people),
    }));
  }
}

// Instanced bodies, heads and instruments. Figures face local +X.
const FIG = {
  body: new THREE.InstancedMesh(new THREE.CylinderGeometry(0.26, 0.4, 1.3, 7).translate(0, 0.65, 0), MAT.plain, figures.length),
  head: new THREE.InstancedMesh(new THREE.SphereGeometry(0.21, 8, 6).translate(0, 1.52, 0), MAT.plain, figures.length),
};
const INST = {
  trumpet: new THREE.CylinderGeometry(0.09, 0.022, 0.85, 8).translate(0, 0.425, 0).rotateZ(-(Math.PI / 2 - 0.55)).translate(0.14, 1.47, 0),
  lyre: new THREE.BoxGeometry(0.05, 0.48, 0.36).rotateZ(-0.35).translate(0.3, 1.08, 0),
  harp: new THREE.BoxGeometry(0.05, 0.78, 0.26).rotateZ(-0.2).translate(0.3, 1.02, 0),
  cymbals: new THREE.CylinderGeometry(0.13, 0.13, 0.025, 12).rotateX(Math.PI / 2),
};
const INST_MAT = { trumpet: MAT.silver, lyre: MAT.wood, harp: MAT.darkWood, cymbals: MAT.bronze };
const instMesh = {};
for (const [kind, geo] of Object.entries(INST)) {
  const who = figures.filter((f) => f.inst === kind);
  const per = kind === 'cymbals' ? 2 : 1;
  const mesh = new THREE.InstancedMesh(geo, INST_MAT[kind], Math.max(1, who.length * per));
  mesh.count = who.length * per;
  who.forEach((f, i) => { f.instI = i * per; });
  mesh.castShadow = true;
  mesh.frustumCulled = false;
  scene.add(mesh);
  instMesh[kind] = mesh;
}
for (const m of Object.values(FIG)) { m.castShadow = true; m.frustumCulled = false; scene.add(m); }
figures.forEach((f) => { FIG.body.setColorAt(f.idx, f.body); FIG.head.setColorAt(f.idx, f.head); });

// Where each figure is, from the state of the tour alone.
function place(f, st) {
  if (f.arrive && st.gather < 1) {
    const d = st.gather * ARRIVE_LEN - f.ord * ARRIVE_GAP;
    const L = f.stream.len;
    if (d <= L) {
      const p = f.stream.at(d);
      return go(f, p.x + p.hn * (f.ord % 2 ? 0.5 : -0.5), p.n - p.hx * (f.ord % 2 ? 0.5 : -0.5), p.y, p.hx, p.hn);
    }
    const e = f.stream.at(L);
    return blend(f, e, f.slot, (d - L) / f.arrDist, f.slotFace);
  }
  if (f.choir) {
    const c = choirs[f.choir], R = c.route;
    const d = st.lead[f.choir] - f.row * GAP;
    if (d <= 0) return blend(f, f.slot, laneAt(R, 0, f.lane), 1 + d / f.startDist, f.slotFace, true);
    if (d >= R.len) return blend(f, laneAt(R, R.len, f.lane), f.end, (d - R.len) / f.endDist, f.endFace);
    const p = laneAt(R, d, f.lane);
    return go(f, p.x, p.n, p.y, p.hx, p.hn);
  }
}
function laneAt(R, d, lane) {
  const p = R.at(d);
  return { ...p, x: p.x - p.hn * lane, n: p.n + p.hx * lane };
}
function go(f, x, n, y, hx, hn) {
  f.tx = x; f.tn = n; f.ty = y; f.thx = hx; f.thn = hn;
}
// Walking from a to b, t of the way. At rest (t <= 0 when `atA`, else t >= 1)
// the figure faces `face`.
function blend(f, a, b, t, face, atA) {
  t = clamp01(t);
  const x = lerp(a.x, b.x, t), n = lerp(a.n, b.n, t);
  const y = lerp(a.y ?? ground(a.x, a.n), b.y ?? ground(b.x, b.n), t);
  const l = Math.hypot(b.x - a.x, b.n - a.n) || 1;
  const rest = atA ? t <= 0 : t >= 1;
  go(f, x, n, y, rest ? face.hx : (b.x - a.x) / l, rest ? face.hn : (b.n - a.n) / l);
}

const _m = new THREE.Matrix4(), _p = new THREE.Vector3(), _q = new THREE.Quaternion(), _s = new THREE.Vector3();
const _e = new THREE.Euler(), _l = new THREE.Matrix4(), _w = new THREE.Matrix4();
let clockT = 0;
function updateFigures(dt, st, snap) {
  clockT += dt;
  const turn = snap ? 1 : 1 - Math.exp(-dt * 8);
  for (const f of figures) {
    if (f.role === 'crowd') { f.tx = f.x; f.tn = f.n; f.ty = f.y; f.thx = f.hx; f.thn = f.hn; } else place(f, st);
    const moved = snap ? 0 : Math.hypot(f.tx - f.x, f.tn - f.n);
    f.moving = lerp(f.moving, moved > 0.004 ? 1 : 0, snap ? 1 : 1 - Math.exp(-dt * 6));
    f.x = f.tx; f.n = f.tn; f.y = f.ty;
    f.hx = lerp(f.hx, f.thx, turn); f.hn = lerp(f.hn, f.thn, turn);
    const yaw = Math.atan2(f.hn, f.hx);
    f.phase += dt;
    // A bob in step while walking; a little sway while singing; leaps for joy at the sacrifices.
    const bob = f.moving * 0.07 * Math.abs(Math.sin(f.phase * 6.5));
    const joy = f.role === 'crowd' || !f.moving ? st.smoke * 0.12 * Math.max(0, Math.sin(f.phase * 5 + f.idx)) : 0;
    const sway = (1 - f.moving) * 0.035 * Math.sin(f.phase * 1.7 + f.idx);
    _e.set(sway, yaw, 0, 'YXZ');
    _q.setFromEuler(_e);
    _w.compose(_p.set(f.x, f.y - 0.05 + bob + joy, -f.n), _q, _s.setScalar(f.k * 1.15));
    FIG.body.setMatrixAt(f.idx, _w);
    FIG.head.setMatrixAt(f.idx, _w);
    if (f.inst === 'cymbals') {
      const gap = 0.05 + 0.07 * Math.abs(Math.sin(f.phase * 4.2));
      for (const side of [-1, 1]) {
        _m.multiplyMatrices(_w, _l.makeTranslation(0.34, 1.12, side * gap));
        instMesh.cymbals.setMatrixAt(f.instI + (side > 0 ? 1 : 0), _m);
      }
    } else if (f.inst) instMesh[f.inst].setMatrixAt(f.instI, _w);
  }
  for (const m of [...Object.values(FIG), ...Object.values(instMesh)]) m.instanceMatrix.needsUpdate = true;
}

// ---------------------------------------------------------------- effects
// The purification (12:30): a light spreading round the wall both ways from
// the Valley Gate, slowly at first, then fading once it has gone all the way
// round. The text doesn't say how they purified; this only marks it.
const _c = new THREE.Color(), GLOW = new THREE.Color(1.9, 1.5, 0.7);
let purifyShown = -1;
function updatePurify(p) {
  if (p === purifyShown) return;
  purifyShown = p;
  const front = p ** 1.8 * (WALL_LEN / 2 + 60);
  const fade = p > 0 && p < 1 ? 1 - smooth(clamp01((p - 0.8) / 0.2)) : 0;
  blocks.forEach((b, i) => {
    const d = Math.abs(wrapS(b.s - SV + WALL_LEN / 2) - WALL_LEN / 2);
    const g = fade * clamp01((front - d) / 30 + 1) * (0.55 + 0.45 * Math.exp(-(((d - front) / 25) ** 2)));
    blockMesh.setColorAt(i, _c.copy(blockColors[i]).lerp(GLOW, g * 0.85));
  });
  blockMesh.instanceColor.needsUpdate = true;
}

// The smoke of the sacrifices (12:43), rising from the altar.
const smoke = [];
{
  for (let i = 0; i < 70; i++) {
    const sp = new THREE.Sprite(MAT.smoke.clone());
    sp.userData = { phase: i / 70, dx: (rand() - 0.5) * 3, dz: (rand() - 0.5) * 3 };
    sp.visible = false;
    scene.add(sp);
    smoke.push(sp);
  }
}
function updateSmoke(level) {
  MAT.embers.emissiveIntensity = level * 0.8;
  for (const sp of smoke) {
    sp.visible = level > 0.01;
    if (!sp.visible) continue;
    const u = (sp.userData.phase + clockT * 0.06) % 1;
    sp.position.set(altarTop.x + sp.userData.dx * (1 + u) + u * u * 14, altarTop.y + 1 + u * 34, altarTop.z + sp.userData.dz * (1 + u) - u * 5);
    sp.scale.setScalar(3 + u * 14);
    sp.material.opacity = level * 0.85 * Math.sin(Math.PI * Math.min(1, u * 1.4)) * (1 - u);
  }
}

// ---------------------------------------------------------------- labels
const labels = [];
function makeLabel(text, kind, pos, keys, anchor = pos, follow = null) {
  const el = document.createElement('div');
  el.className = `label ${kind}`;
  el.textContent = tr(text);
  const obj = new CSS2DObject(el);
  obj.position.copy(pos);
  scene.add(obj);
  labels.push({ el, obj, kind, keys, anchor, text, follow, opacity: -1, hidden: false });
}

// Is the label behind a hill as seen from the camera?
function behindTerrain(from, to) {
  for (let k = 1; k < 24; k++) {
    _ray.lerpVectors(from, to, k / 24);
    if (ground(_ray.x, -_ray.z) > _ray.y + 2) return true;
  }
  return false;
}
const _ray = new THREE.Vector3();
let occlusionFrame = 0;
for (const g of Object.values(gateObjs)) makeLabel(g.def.name, 'gate', g.labelPos, [`gate:${g.key}`]);
makeLabel(DATA.GATES.guard.name, 'gate', guardGate.labelPos, ['gate:guard']);
for (const tw of Object.values(towerObjs)) makeLabel(tw.def.name, 'tower', tw.labelPos, [`tower:${tw.key}`]);
for (const [k, f] of Object.entries(FEATURES)) {
  const gy = ground(f.x, f.n);
  makeLabel(f.name, f.kind, v3(f.x, f.n, gy + f.lift), [`feature:${k}`], v3(f.x, f.n, gy + 3));
}
for (const [k, p] of Object.entries(PEOPLE)) {
  const members = choirs[p.choir].members;
  const who = p.k === 'choir' ? members.find((f) => f.role === 'choir' && f.order >= 14)
    : typeof p.k === 'number' ? members[p.k] : members.find((f) => f.role === p.k);
  makeLabel(p.name, p.big ? 'person big' : 'person', new THREE.Vector3(), [`person:${k}`], undefined, who);
}

function updateLabels(activeKeys) {
  const overview = tour.phase === 'intro' || tour.phase === 'finale';
  const checkOcclusion = occlusionFrame++ % 6 === 0;
  for (const lb of labels) {
    if (lb.follow) {
      lb.obj.position.set(lb.follow.x, lb.follow.y + (lb.kind === 'person' ? 3.2 : 9), -lb.follow.n);
      lb.anchor = lb.obj.position;
    }
    if (checkOcclusion) lb.hidden = behindTerrain(camera.position, lb.anchor);
    const d = camera.position.distanceTo(lb.obj.position);
    let o = 1;
    if (lb.kind === 'feature' || lb.kind === 'tower') o = clamp01((800 - d) / 300);
    else if (lb.kind === 'gate') o = overview ? 1 : clamp01((1400 - d) / 500);
    else if (lb.follow) o = overview ? 0 : clamp01(((lb.kind === 'person' ? 260 : 600) - d) / 100);
    else if (!overview) o = clamp01((1600 - d) / 500) * clamp01((d - 150) / 150);
    if (lb.hidden) o = 0;
    const active = lb.keys.some((k) => activeKeys.has(k));
    if (active) o = 1;
    o = Math.round(o * 20) / 20;
    if (o !== lb.opacity) { lb.el.style.opacity = o; lb.opacity = o; }
    lb.el.classList.toggle('active', active);
  }
}

// ---------------------------------------------------------------- tour
// The state of the world is { lead: { 1, 2 }, gather, purify, smoke }: how far
// along its route the head of each choir is, and how far each effect has run.
// Each stop says what it is on arrival; flights run from one to the next.
const START = { lead: { 1: choirs[1].route.marks.gather, 2: choirs[2].route.marks.gather }, gather: 0, purify: 0, smoke: 0 };
const stops = STOPS.map((st, i) => ({ ...st, i }));
{
  let prev = START;
  for (const st of stops) {
    const s = { ...prev, lead: { ...prev.lead } };
    for (const c of [1, 2]) if (st[`lead${c}`]) s.lead[c] = choirs[c].route.marks[st[`lead${c}`]];
    if (st.effect) s[st.effect] = 1;
    st.before = prev;
    st.state = prev = s;
    if (st.view) {
      const c = choirs[st.view.follow], head = c.route.at(s.lead[st.view.follow]);
      const v = { side: 'in', dist: 45, h: 24, along: 10, ...st.view };
      st.wcam = { s: head.s + c.sgn * v.along, off: (v.side === 'out' ? 1 : -1) * v.dist, h: v.h };
      st.pos = camAt(st.wcam.s, st.wcam.off, st.wcam.h);
      const q = c.route.at(s.lead[st.view.follow] - 10);
      st.look = v3(q.x, q.n, q.y + 1);
    } else {
      st.pos = fixed(st.cam);
      st.look = fixed(st.look);
    }
    st.activeKeys = new Set(st.keys ?? []);
  }
}
function mixState(a, b, e, u) {
  return {
    lead: { 1: lerp(a.lead[1], b.lead[1], e), 2: lerp(a.lead[2], b.lead[2], e) },
    gather: lerp(a.gather, b.gather, u), purify: lerp(a.purify, b.purify, u), smoke: lerp(a.smoke, b.smoke, smooth(u)),
  };
}
const world = { state: START, snap: true };
function applyState(s) { world.state = s; world.snap = true; }

function camAt(s, off, h) {
  const p = wallAt(s);
  const { tx, tn } = tangentAt(s, 25);
  const x = p.x + tn * off, n = p.n - tx * off;
  const y = Math.max(ground(p.x, p.n) + h, ground(x, n) + 10);
  return new THREE.Vector3(x, y, -n);
}
function overviewPos(a) {
  return new THREE.Vector3(OVERVIEW_C.x + Math.cos(a) * 980, 560, OVERVIEW_C.z + Math.sin(a) * 980);
}
const finaleLook = fixed(FINALE_LOOK);
function finalePos(a) {
  const p = fixed(FINALE_POS), r = Math.hypot(p.x - finaleLook.x, p.z - finaleLook.z);
  const a0 = Math.atan2(p.z - finaleLook.z, p.x - finaleLook.x);
  return new THREE.Vector3(finaleLook.x + Math.cos(a0 + a) * r, p.y, finaleLook.z + Math.sin(a0 + a) * r);
}

const view = { pos: overviewPos(SOUTH), look: OVERVIEW_C.clone() };
const tour = {
  phase: 'intro',     // intro | fly | hold | finale
  i: -1,
  playing: false,
  speed: 1,
  holdT: 0, holdDur: 10,
  holdScale: HOLD_SCALE,
  orbitA: SOUTH,
  introT: 0,
  finaleT: 0,
  detached: false,
  explore: false,
};
let fly = null;

function wordCount(st) { return `${tr(st.quote)} ${tr(st.note)}`.split(/\s+/).length; }

function startFly(toIndex) {
  const to = stops[toIndex];
  const from = tour.i >= 0 ? stops[tour.i] : null;
  const sequential = from && toIndex === tour.i + 1 && !tour.detached;
  if (!sequential) applyState(to.before);
  const along = sequential && from.wcam && to.wcam && from.view.follow === to.view.follow;
  const fromPos = view.pos.clone(), fromLook = view.look.clone();
  let dur;
  if (along) dur = Math.min(12, Math.max(5.5, Math.abs(to.wcam.s - from.wcam.s) / 35));
  else dur = Math.min(7.5, Math.max(3.3, fromPos.distanceTo(to.pos) / 150));
  const walk = Math.max(...[1, 2].map((c) => Math.abs(to.state.lead[c] - to.before.lead[c])));
  if (walk > 0) dur = Math.max(dur, Math.min(14, 2.5 + walk / WALK_RATE));
  dur = Math.max(dur, { gather: 11, purify: 8, smoke: 5 }[to.effect] ?? 0);
  fly = {
    t: 0, dur, along, from, to, fromPos, fromLook, tour: true,
    done: () => arrive(toIndex),
  };
  tour.i = toIndex;
  tour.phase = 'fly';
  narrator.stop();
  tour.detached = false;
  // With no pause, the last stop's text stays up through the next flight.
  if (tour.holdScale > 0 || !sequential) hidePopup();
  showNext(to);
  updateProgress();
}

function flyTo(pos, look, then) {
  fly = {
    t: 0, dur: 6, along: false, fromPos: view.pos.clone(), fromLook: view.look.clone(),
    to: { pos, look }, tour: false, done: then,
  };
  tour.phase = 'fly';
  hidePopup();
}

const _away = new THREE.Vector3();
function stepFly(dt) {
  fly.t += dt / fly.dur;
  const u = clamp01(fly.t);
  const e = easeArrive(u);
  if (fly.along) {
    const A = fly.from.wcam, B = fly.to.wcam;
    const flip = Math.sign(A.off) !== Math.sign(B.off);
    const s = lerp(A.s, B.s, e);
    // Pull up and back mid-flight so the procession is seen against the whole city.
    const arc = Math.sin(Math.PI * u);
    const zoom = Math.min(1, 0.3 + Math.abs(B.s - A.s) / 500) * Math.sqrt(arc);
    const pos = camAt(s, lerp(A.off, B.off, e), lerp(A.h, B.h, e) + (flip ? 24 : 7) * arc);
    _away.set(pos.x - OVERVIEW_C.x, 0, pos.z - OVERVIEW_C.z).normalize();
    pos.addScaledVector(_away, 70 * zoom).y += 80 * zoom;
    view.pos.copy(pos);
    // Keep looking at the head of the procession as it goes round corners.
    const c = fly.to.view.follow;
    const head = choirs[c].route.at(lerp(fly.to.before.lead[c], fly.to.state.lead[c], e) - 10);
    view.look.set(head.x, head.y + 1, -head.n);
  } else {
    const arc = Math.min(260, fly.fromPos.distanceTo(fly.to.pos) * 0.22) * Math.sin(Math.PI * u);
    view.pos.lerpVectors(fly.fromPos, fly.to.pos, e).y += arc;
    view.look.lerpVectors(fly.fromLook, fly.to.look, easeInOut(clamp01(u * 1.15)));
  }
  if (fly.tour) world.state = mixState(fly.to.before, fly.to.state, e, u);
  if (u >= 1) {
    const done = fly.done;
    fly = null;
    done();
  }
}

function holdFor(st) {
  return Math.min(16, Math.max(8, 4 + wordCount(st) * 0.13)) * tour.holdScale;
}

function arrive(i) {
  track('tour_stop', { stop: i + 1 });
  const st = stops[i];
  tour.phase = 'hold';
  tour.holdT = 0;
  tour.holdDur = holdFor(st);
  hideNext();
  showPopup(st);
  narrator.sayNext(verseLine(st.ref, tr(st.quote), t('nehemiah.book')));
}

function finish() {
  track('tour_complete');
  narrator.stop();
  tour.i = stops.length;
  applyState(stops[stops.length - 1].state);
  tour.finaleT = 0;
  flyTo(finalePos(0), finaleLook, () => {
    tour.phase = 'finale';
    showCard(FINALE, true);
    narrator.say(verseLine(tr(FINALE.ref), tr(FINALE.quote), t('nehemiah.book')));
  });
  updateProgress();
}

function next() {
  if (tour.explore) setExplore(false);
  if (tour.phase === 'intro' || tour.phase === 'finale') return begin();
  if (fly && fly.tour) {
    // Skip to the end of the current flight.
    fly.t = 1;
    stepFly(0);
    world.snap = true;
    return;
  }
  if (tour.i >= stops.length - 1) return finish();
  startFly(tour.i + 1);
}
function prev() {
  if (tour.explore) setExplore(false);
  if (tour.phase === 'intro') return;
  const target = tour.phase === 'finale' ? stops.length - 1 : Math.max(0, tour.i - 1);
  hideCard();
  tour.detached = true;
  startFly(target);
}
function jump(i) {
  if (tour.explore) setExplore(false);
  hideCard();
  tour.detached = true;
  if (!tour.playing) setPlaying(true);
  startFly(i);
}
function begin() {
  track('tour_start');
  hideCard();
  applyState(START);
  tour.i = -1;
  tour.detached = true;
  setPlaying(true);
  startFly(0);
  narrator.say(titleLine(t('dedication.title'), t('dedication.subtitle')));
}

function update(dt) {
  const t = dt * tour.speed;
  narrator.update(dt);
  if (tour.explore) return;
  if (tour.phase === 'intro') {
    // Hold the view from the south, with a gentle sway.
    tour.introT += dt;
    tour.orbitA = SOUTH + 0.12 * Math.sin(tour.introT * 0.12);
    if (!fly) {
      view.pos.copy(overviewPos(tour.orbitA));
      view.look.copy(OVERVIEW_C);
    }
  } else if (tour.phase === 'finale' && !fly) {
    // Looking back across the Kidron, drifting slowly.
    tour.finaleT += dt;
    view.pos.copy(finalePos(0.1 * Math.sin(tour.finaleT * 0.08)));
    view.look.copy(finaleLook);
  }
  if (fly) {
    if (tour.playing || !fly.tour) stepFly(fly.tour ? t : dt);
  } else if (tour.phase === 'hold') {
    const st = stops[tour.i];
    if (tour.playing) tour.holdT += t;
    const k = tour.holdDur ? clamp01(tour.holdT / tour.holdDur) : 1;
    // A slow push-in while we read.
    view.pos.copy(st.pos).lerp(st.look, 0.08 * smooth(k));
    view.look.copy(st.look);
    timerBar.style.transform = `scaleX(${k})`;
    // Stay until the verse has been read.
    if (tour.playing && tour.holdT >= tour.holdDur && !narrator.busy()) {
      if (tour.i >= stops.length - 1) finish();
      else startFly(tour.i + 1);
    }
  }
}

// ---------------------------------------------------------------- explore mode
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI * 0.47;
controls.minDistance = 8;
controls.maxDistance = 3000;

function setExplore(on) {
  if (on && !tour.explore) track('explore');
  tour.explore = on;
  controls.enabled = on;
  ui.explore.classList.toggle('on', on);
  ui.explore.setAttribute('aria-pressed', on);
  document.body.classList.toggle('exploring', on);
  if (on) {
    controls.target.copy(view.look);
    camera.position.copy(view.pos);
    controls.update();
  } else {
    // Glide back to wherever the tour was.
    view.pos.copy(camera.position);
    view.look.copy(controls.target);
    if (tour.phase === 'hold' || tour.phase === 'fly') {
      const st = stops[tour.i];
      const resume = tour.phase;
      if (resume === 'fly') { applyState(st.state); tour.detached = true; }
      flyTo(st.pos, st.look, () => { tour.phase = 'hold'; if (resume === 'fly') tour.holdT = 0; });
    } else {
      const phase = tour.phase;
      if (phase === 'finale') flyTo(finalePos(0), finaleLook, () => { tour.phase = phase; });
      else flyTo(overviewPos(tour.orbitA), OVERVIEW_C.clone(), () => { tour.phase = phase; });
    }
  }
}

// ---------------------------------------------------------------- UI
const ui = {
  popup: document.getElementById('popup'),
  card: document.getElementById('card'),
  nextChip: document.getElementById('next-chip'),
  play: document.getElementById('play'),
  prev: document.getElementById('prev'),
  next: document.getElementById('next'),
  explore: document.getElementById('explore'),
  speed: document.getElementById('speed'),
  pause: document.getElementById('pause'),
  version: document.getElementById('version'),
  credit: document.getElementById('credit'),
  progress: document.getElementById('progress'),
  narration: document.getElementById('narration'),
  mute: document.getElementById('mute'),
  volume: document.getElementById('volume'),
  voice: document.getElementById('voice'),
};
const narrator = createNarrator({ box: ui.narration, mute: ui.mute, volume: ui.volume, voice: ui.voice });
const timerBar = document.createElement('i');

const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);

function showPopup(st) {
  const chips = st.instruments
    ? `<ul class="chips" aria-label="${t('instrumentChips')}">
        ${Object.entries(INSTRUMENTS).map(([k, name]) => {
          const yes = st.instruments.includes(k);
          return `<li class="${yes ? 'yes' : 'no'}" title="${t(yes ? 'recorded' : 'notMentioned')}">${esc(tr(name))}</li>`;
        }).join('')}
      </ul>`
    : '';
  ui.popup.innerHTML = `
    <div class="kicker">${t('stopOf', { n: st.i + 1, total: stops.length })} · ${t('nehemiah.book')} ${st.ref} (${VERSIONS[current.version].abbr})</div>
    <h2>${esc(tr(st.title))}</h2>
    <blockquote>${esc(tr(st.quote))}</blockquote>
    <p>${esc(tr(st.note))}</p>
    ${chips}
    <div class="builders"><span>${t('who')}</span> ${esc(tr(st.who))}</div>
    <div class="timer"></div>`;
  ui.popup.querySelector('.timer').appendChild(timerBar);
  timerBar.style.transform = 'scaleX(0)';
  ui.popup.classList.add('show');
}
function hidePopup() { ui.popup.classList.remove('show'); }
function showNext(st) {
  ui.nextChip.innerHTML = `<span>${t('next')}</span> ${esc(tr(st.title))} <em>${esc(st.ref)}</em>`;
  ui.nextChip.classList.add('show');
}
function hideNext() { ui.nextChip.classList.remove('show'); }

let cardShown = null;
function showCard(c, finale) {
  cardShown = { c, finale };
  ui.card.innerHTML = `
    <div class="kicker">${esc(tr(c.ref))} (${VERSIONS[current.version].abbr})</div>
    <h1>${esc(tr(c.title))}</h1>
    <blockquote>${esc(tr(c.quote))}</blockquote>
    <p>${esc(tr(c.note))}</p>
    ${c.aside ? `<p class="aside">${esc(tr(c.aside))}</p>` : ''}
    <div class="actions">
      <button class="primary" data-act="begin">${t(finale ? 'replay' : 'begin')}</button>
      <button data-act="explore">${t('exploreFreely')}</button>
      ${finale ? `<button data-act="share">${t('share')}</button>` : ''}
    </div>
    <p class="credits">${noticeHTML()}<br>${feedbackHTML()}</p>`;
  ui.card.classList.add('show');
  ui.card.querySelector('[data-act=begin]').onclick = begin;
  ui.card.querySelector('[data-act=explore]').onclick = () => { hideCard(); setExplore(true); };
  if (finale) ui.card.querySelector('[data-act=share]').onclick = openShare;
}
function hideCard() { ui.card.classList.remove('show'); }

function setPlaying(on) {
  tour.playing = on;
  narrator.setPaused(!on);
  ui.play.classList.toggle('paused', !on);
  ui.play.setAttribute('aria-label', t(on ? 'pause' : 'play'));
  ui.play.title = t(on ? 'pauseTitle' : 'playTitle');
}

stops.forEach((st, i) => {
  const b = document.createElement('button');
  b.onclick = () => jump(i);
  ui.progress.appendChild(b);
});
function titleProgress() {
  stops.forEach((st, i) => {
    const b = ui.progress.children[i];
    b.title = `${tr(st.title)} (${st.ref})`;
    b.setAttribute('aria-label', t('goTo', { n: i + 1, title: tr(st.title) }));
  });
}
titleProgress();

fillVersionSelect(ui.version);
// Re-renders every piece of text on screen in the chosen version (and its language).
function setVersion(v) {
  useVersion(v);
  localizeDOM();
  narrator.refresh();
  setPlaying(tour.playing);
  ui.version.value = v;
  ui.version.title = VERSIONS[v].name;
  ui.credit.textContent = t('credit', { abbr: VERSIONS[v].abbr });
  ui.credit.title = VERSIONS[v].notice;
  for (const lb of labels) lb.el.textContent = tr(lb.text);
  titleProgress();
  const st = stops[tour.i];
  if (st && ui.popup.classList.contains('show')) {
    const scale = timerBar.style.transform;
    showPopup(st);
    timerBar.style.transform = scale;
    if (tour.phase === 'hold') tour.holdDur = holdFor(st);
  }
  if (st && ui.nextChip.classList.contains('show')) showNext(st);
  if (cardShown && ui.card.classList.contains('show')) showCard(cardShown.c, cardShown.finale);
}
function updateProgress() {
  [...ui.progress.children].forEach((b, i) => {
    b.classList.toggle('done', i < tour.i);
    b.classList.toggle('current', i === tour.i);
  });
}

ui.play.onclick = () => {
  if (tour.phase === 'intro' || tour.phase === 'finale') return begin();
  if (tour.explore) setExplore(false);
  setPlaying(!tour.playing);
};
ui.next.onclick = next;
ui.prev.onclick = prev;
ui.explore.onclick = () => { if (ui.card.classList.contains('show')) hideCard(); setExplore(!tour.explore); };
ui.speed.onchange = () => { tour.speed = Number(ui.speed.value); };
ui.pause.value = String(HOLD_SCALE);
ui.version.onchange = () => {
  remember(ui.version.value);
  setVersion(ui.version.value);
  track('version_change', { version: ui.version.value });
};
ui.pause.onchange = () => {
  tour.holdScale = Number(ui.pause.value);
  if (tour.phase === 'hold') tour.holdDur = holdFor(stops[tour.i]);
};
addEventListener('keydown', (e) => {
  if (e.target.closest('select, input')) return;
  if (e.code === 'Space') { e.preventDefault(); ui.play.click(); }
  else if (e.code === 'ArrowRight') next();
  else if (e.code === 'ArrowLeft') prev();
  else if (e.key === 'e' || e.key === 'E') ui.explore.click();
  else if (e.key === 'm' || e.key === 'M') narrator.toggleMute();
});

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  labelRenderer.setSize(innerWidth, innerHeight);
});

// ---------------------------------------------------------------- loop
setVersion(current.version);
showCard(INTRO, false);
setPlaying(false);

const clock = new THREE.Clock();
const noKeys = new Set();
let viewShift = 0;   // shifts the frame right so the popup doesn't cover the subject
function frame(dt) {
  update(dt);
  updateFigures(dt, world.state, world.snap);
  world.snap = false;
  updatePurify(world.state.purify);
  updateSmoke(world.state.smoke);
  const wantShift = !tour.explore && (tour.phase === 'hold' || tour.phase === 'fly') && innerWidth > 900 ? 0.14 : 0;
  viewShift = lerp(viewShift, wantShift, 1 - Math.exp(-dt * 2.5));
  if (viewShift > 0.002) camera.setViewOffset(innerWidth, innerHeight, -innerWidth * viewShift, 0, innerWidth, innerHeight);
  else camera.clearViewOffset();
  if (tour.explore) {
    controls.update();
  } else {
    camera.position.copy(view.pos);
    camera.lookAt(view.look);
  }
  updateLabels(tour.phase === 'hold' || tour.phase === 'fly' ? stops[tour.i]?.activeKeys ?? noKeys : noKeys);
  updateCompass();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}
renderer.setAnimationLoop(() => frame(Math.min(clock.getDelta(), 0.05)));

// The compass turns with the camera's heading (plan: east = X, north = -Z).
const compassRose = document.getElementById('compass-rose');
const _dir = new THREE.Vector3();
let compassDeg = null;
function updateCompass() {
  camera.getWorldDirection(_dir);
  const deg = Math.round((-Math.atan2(_dir.x, -_dir.z) * 180) / Math.PI * 2) / 2;
  if (deg !== compassDeg) compassRose.style.transform = `rotate(${(compassDeg = deg)}deg)`;
}

// Handy for debugging from the console.
window.__tour = {
  tour, stops, jump, next, view, world, choirs, routes,
  applyStatic(i) { applyState(i > 0 ? stops[i - 1].state : START); },
  advance(sec) { for (let t = 0; t < sec; t += 0.05) { update(0.05); updateFigures(0.05, world.state, world.snap); world.snap = false; } },
};
