import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { ground, noise2, valleyDist, VALLEYS } from './terrain.js';
import * as DATA from './data.js';
import {
  VERSIONS, current, chooseVersion, setVersion as useVersion, remember, pick as tr, t, english,
  localizeDOM, fillVersionSelect, noticeHTML, loadLanguages,
} from '../i18n.js';
import { createNarrator, verseLine } from '../narrator.js';

const { WALL, THICK_SEGMENTS, GATES, TOWERS, FEATURES, STOPS, INTRO, FINALE, PARTS } = DATA;
// Text fields are strings or { [version]: string, default }; lang/*.js add the other languages.
await loadLanguages(DATA, import.meta.url);

// ---------------------------------------------------------------- constants
const WALL_H = 8;        // wall height above ground (m)
const CH = 1;            // course height
const BL = 2;            // nominal block length
const THICK = 2.8;       // wall thickness (Kenyon: c. 2.5-3 m on the east crest)
const GATE_HALF = 8.5;   // half-width of a gatehouse along the wall
const DOOR_Z = -1.9;     // door line, near the city end of the gate passage
const RAMP = 30;         // metres over which a section rises behind the build frontier
const LAG = 0.12;        // per-course delay, in ramp lengths
const OVERVIEW_C = new THREE.Vector3(0, 50, -110);
const HOLD_SCALE = 0.5;  // default pause at each stop, relative to the reading-time estimate
const SOUTH = Math.PI / 2;  // overview angle that looks north from the south

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
function easeOutBack(p) {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * (p - 1) ** 3 + c1 * (p - 1) ** 2;
}
const v3 = (x, n, y) => new THREE.Vector3(x, y, -n);

useVersion(chooseVersion());
const params = new URLSearchParams(location.search);
// ?record: the video exporter (video/export.py) steps the tour frame by frame.
const RECORD = params.has('record');
if (RECORD) document.body.classList.add('record');
const UP = new THREE.Vector3(0, 1, 0);

// ---------------------------------------------------------------- renderer & scene
const app = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
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

const MAT = {
  stone: new THREE.MeshStandardMaterial({ map: stoneTexture(), roughness: 0.95 }),
  block: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.92 }),
  plain: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95, flatShading: true }),
  rock: new THREE.MeshStandardMaterial({ color: 0xcdbb92, roughness: 1, flatShading: true }),
  wood: new THREE.MeshStandardMaterial({ color: 0x7d5130, roughness: 0.8 }),
  darkWood: new THREE.MeshStandardMaterial({ color: 0x5a381d, roughness: 0.8 }),
  iron: new THREE.MeshStandardMaterial({ color: 0x2f2d2c, roughness: 0.45, metalness: 0.6 }),
  char: new THREE.MeshStandardMaterial({ color: 0x1d1814, roughness: 1 }),
  roof: new THREE.MeshStandardMaterial({ color: 0x8e5b32, roughness: 0.85, flatShading: true }),
  flatRoof: new THREE.MeshStandardMaterial({ color: 0xc8b083, roughness: 1 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x241c15, roughness: 1 }),
  water: new THREE.MeshStandardMaterial({ color: 0x3f93b8, roughness: 0.15, metalness: 0.1, emissive: 0x0b2a3a }),
  trunk: new THREE.MeshStandardMaterial({ color: 0x6b5238, roughness: 1 }),
  leaf: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, flatShading: true }),
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

function wallAt(s) {
  s = ((s % WALL_LEN) + WALL_LEN) % WALL_LEN;
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

// ---------------------------------------------------------------- gates
const wallGateS = Object.keys(GATES).map((k) => wallById[k].s);
function nearGate(s) {
  return wallGateS.some((gs) => {
    const d = Math.abs(s - gs) % WALL_LEN;
    return Math.min(d, WALL_LEN - d) < GATE_HALF;
  });
}

// A built thing (gate or tower) that rises from ruins as the frontier passes.
const structures = []; // { s, setProgress(p), progress, static }
const gateObjs = {};
const towerObjs = {};

function makeGate(key, def) {
  const wp = wallById[key];
  const s = wp.s;
  const { tx, tn } = tangentAt(s, 3);
  const { x, n } = wp;
  const { lo, hi } = footprint(x, n, tx, tn, span(-8, 8, 5), span(-4, 7, 4));
  const g0 = lo - 0.6;
  const H = hi + WALL_H + 3 - g0;
  const gl = ground(x, n) - g0;          // passage floor, local height
  const G = framedGroup(x, n, tx, tn, g0);
  const passTop = gl + 5.6;
  const parts = { towers: [], upper: [], beams: [], doors: [], bolts: [], bars: [], roof: [], char: [], top: [] };

  for (const side of [-1, 1]) {
    parts.towers.push(add(G, stoneBox(6, H, 10), MAT.stone, side * 5, 0, 1.5));
    for (const [mx, mz] of [[-2.2, -2.9], [2.2, -2.9], [-2.2, 5.9], [2.2, 5.9], [0, 5.9]]) {
      parts.top.push(add(G, stoneBox(1.4, 1.3, 1.1), MAT.stone, side * 5 + mx, H, 1.5 + mz - 1.5));
    }
  }
  const upperY = def.beams ? passTop + 0.5 : passTop;
  parts.upper.push(add(G, stoneBox(4, H - upperY, 8), MAT.stone, 0, upperY, 1));

  if (def.beams) {
    // "laid the beams thereof": timber joists roofing the passage, ends showing.
    const bg = new THREE.CylinderGeometry(0.2, 0.2, 9, 8).rotateX(Math.PI / 2);
    for (const bx of span(-1.75, 1.75, 6)) parts.beams.push(add(G, bg, MAT.darkWood, bx, passTop + 0.25, 1));
  }
  if (def.doors || def.intact) {
    // Two leaves near the inner mouth of the passage, iron-strapped. A gate
    // standing intact keeps its doors, though the text doesn't mention them.
    for (const side of [-1, 1]) {
      const leaf = new THREE.Group();
      leaf.position.set(side, gl, DOOR_Z);
      G.add(leaf);
      add(leaf, baseBox(1.98, 5.4, 0.28), MAT.wood);
      for (const sy of [0.8, 2.7, 4.6]) for (const sz of [0.16, -0.16]) add(leaf, baseBox(1.9, 0.16, 0.05), MAT.iron, 0, sy, sz);
      parts.doors.push(leaf);
    }
  }
  if (def.bolts) {
    // "the locks thereof": a lock box and drop-bolts at the meeting stiles (city side).
    const B = new THREE.Group();
    G.add(B);
    add(B, baseBox(0.55, 0.65, 0.2), MAT.iron, 0, gl + 2.4, DOOR_Z - 0.25);
    const rod = new THREE.CylinderGeometry(0.08, 0.08, 1.2, 8);
    for (const bx of [-0.22, 0.22]) {
      add(B, rod, MAT.iron, bx, gl + 0.7, DOOR_Z - 0.24);
      add(B, rod, MAT.iron, bx, gl + 4.7, DOOR_Z - 0.24);
    }
    parts.bolts.push(B);
  }
  if (def.bars) {
    // "the bars thereof": crossbars seated in sockets in the jambs (city side).
    const B = new THREE.Group();
    G.add(B);
    for (const by of [1.5, 3.9]) {
      add(B, baseBox(4.6, 0.34, 0.34), MAT.darkWood, 0, gl + by, DOOR_Z - 0.55);
      for (const bx of [-1.2, 1.2]) add(B, baseBox(0.12, 0.4, 0.4), MAT.iron, bx, gl + by - 0.03, DOOR_Z - 0.55);
      for (const sx of [-1, 1]) add(B, baseBox(0.35, 0.6, 0.55), MAT.iron, sx * 1.95, gl + by - 0.13, DOOR_Z - 0.55);
    }
    parts.bars.push(B);
  }
  if (def.covered) {
    // "covered it": a timber roof over the gatehouse.
    const rg = new THREE.ConeGeometry(1, 1, 4).rotateY(Math.PI / 4).translate(0, 0.5, 0);
    const r = add(G, rg, MAT.roof, 0, H, 1.5);
    r.scale.set(17.5 / Math.SQRT2, 4.5, 11.5 / Math.SQRT2);
    r.userData.sy = 4.5;
    parts.roof.push(r);
  }
  if (!def.intact) {
    // Charred timbers: "the gates thereof are burned with fire" (1:3; 2:13).
    for (let i = 0; i < 4; i++) {
      const c = add(G, baseBox(2 + rand(), 0.25, 0.5), MAT.char, (rand() - 0.5) * 3, gl + 0.05, (rand() - 0.5) * 5);
      c.rotation.y = rand() * Math.PI;
      parts.char.push(c);
    }
  }

  const ruin = Math.min(1, (gl + 2.2) / H);
  const obj = {
    key, s, def, group: G, H, gl, g0, progress: -1, static: !!def.intact,
    labelPos: G.localToWorld(new THREE.Vector3(0, H + 7, 1.5)),
    center: G.localToWorld(new THREE.Vector3(0, gl + 3.5, DOOR_Z)),
    setProgress(p) {
      if (p === this.progress) return;
      this.progress = p;
      const sy = lerp(ruin, 1, easeInOut(clamp01(p / 0.6)));
      for (const t of parts.towers) t.scale.y = sy;
      const show = (list, a, b, axis = 'y') => {
        const k = clamp01((p - a) / (b - a));
        for (const m of list) {
          m.visible = k > 0;
          const base = m.userData.sy ?? 1;
          if (axis === 'y') m.scale.y = Math.max(0.001, k) * base;
          else m.scale.setScalar(Math.max(0.001, easeOutBack(k)));
        }
      };
      show(parts.upper, 0.45, 0.65);
      show(parts.top, 0.6, 0.7);
      show(parts.beams, 0.5, 0.62, 'all');
      show(parts.doors, 0.65, 0.82);
      show(parts.bolts, 0.82, 0.92, 'all');
      show(parts.bars, 0.88, 1, 'all');
      show(parts.roof, 0.75, 0.95);
      for (const c of parts.char) c.visible = p < 0.3;
    },
  };
  obj.setProgress(obj.static ? 1 : 0);
  structures.push(obj);
  gateObjs[key] = obj;
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
  const body = add(G, stoneBox(w, H, d), MAT.stone, 0, 0, vC);
  const top = [];
  const k = Math.max(2, Math.round(w / 3));
  for (const u of span(-w / 2 + 0.7, w / 2 - 0.7, k)) {
    top.push(add(G, stoneBox(1.3, 1.3, 1), MAT.stone, u, H, vC + d / 2 - 0.5));
    top.push(add(G, stoneBox(1.3, 1.3, 1), MAT.stone, u, H, vC - d / 2 + 0.5));
  }
  for (const v of span(vC - d / 2 + 2, vC + d / 2 - 2, Math.max(2, k - 1))) {
    top.push(add(G, stoneBox(1, 1.3, 1.3), MAT.stone, -w / 2 + 0.5, H, v));
    top.push(add(G, stoneBox(1, 1.3, 1.3), MAT.stone, w / 2 - 0.5, H, v));
  }
  if (def.chamber) {
    // The "upper room" of the corner: a roofed watch-chamber on the tower.
    top.push(add(G, stoneBox(w * 0.55, 3.6, d * 0.55), MAT.stone, 0, H, vC));
    top.push(add(G, baseBox(w * 0.62, 0.4, d * 0.62), MAT.darkWood, 0, H + 3.6, vC));
    top.push(add(G, baseBox(1.2, 1.4, 0.2), MAT.dark, 0, H + 1.4, vC + d * 0.275 + 0.05));
  }
  const ruin = Math.min(1, 3 / H);
  const obj = {
    key, s, def, group: G, H, progress: -1, static: false,
    labelPos: G.localToWorld(new THREE.Vector3(0, H + (def.chamber ? 11 : 7), vC)),
    center: G.localToWorld(new THREE.Vector3(0, H * 0.6, vC)),
    setProgress(p) {
      if (p === this.progress) return;
      this.progress = p;
      body.scale.y = lerp(ruin, 1, easeInOut(clamp01(p / 0.8)));
      for (const t of top) t.visible = p > 0.85;
    },
  };
  obj.setProgress(0);
  structures.push(obj);
  towerObjs[key] = obj;
}

for (const [k, def] of Object.entries(GATES)) makeGate(k, def);
for (const [k, def] of Object.entries(TOWERS)) makeTower(k, def);

// ---------------------------------------------------------------- wall blocks
// Every block of the wall is an instance. Blocks "in ruin" are present from
// the start (the bottom courses, darker and weathered); the rest rise into
// place course by course as the build frontier passes.
const blocks = [];
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
    const ruinH = 0.4 + 2.8 * noise2(s / 18, si * 7.3);
    for (let c = 0; c < nC; c++) {
      let uu = u;
      if (c % 2) {
        if (i === ncol - 1) continue;
        uu = u + bl / 2;
        if (nearGate(sg.s0 + uu)) continue;
      }
      const above = base + (c + 1) * CH - lo;
      blocks.push({
        s: sg.s0 + uu, c, x: sg.a.x + sg.tx * uu, n: sg.a.n + sg.tn * uu, y: base + (c + 0.5) * CH,
        yaw, sx: bl * 0.95, sy: CH * 0.92, sz: sg.thick, ruin: above <= ruinH,
      });
    }
    if (i % 2 === 0) {
      blocks.push({
        s, c: nC, x: cx + sg.tn * (half - 0.35), n: cn - sg.tx * (half - 0.35), y: base + nC * CH + 0.55,
        yaw, sx: bl * 0.55, sy: 1.1, sz: 0.7, ruin: false,
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
  for (let c = 0; c < nC; c++) {
    const above = base + (c + 1) * CH - lo;
    blocks.push({ s: p.s, c, x: p.x, n: p.n, y: base + (c + 0.5) * CH, yaw, sx: t, sy: CH * 0.92, sz: t, ruin: above <= 1.6 });
  }
});
blocks.sort((a, b) => a.s - b.s);

const blockMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), MAT.block, blocks.length);
blockMesh.castShadow = blockMesh.receiveShadow = true;
blockMesh.frustumCulled = false;
{
  const fresh = ['#f1e7cf', '#e9ddbf', '#e2d3ae', '#ece2c8', '#dccb9f'].map((h) => new THREE.Color(h));
  const old = new THREE.Color('#a39478');
  const c = new THREE.Color();
  blocks.forEach((b, i) => {
    c.copy(fresh[(rand() * fresh.length) | 0]);
    if (b.ruin) c.lerp(old, 0.35 + rand() * 0.2);
    blockMesh.setColorAt(i, c);
  });
}
scene.add(blockMesh);
const blockS = Float64Array.from(blocks, (b) => b.s);

// Rubble heaps: "there is much rubbish" (4:10). They clear as each stretch is built.
const rubble = [];
segs.forEach((sg) => {
  for (let u = 1; u < sg.len; u += 2.2) {
    if (rand() > 0.8) continue;
    const s = sg.s0 + u;
    if (nearGate(s) && rand() < 0.5) continue;
    const inner = rand() < 0.25;
    const v = inner ? -(sg.thick / 2 + 1 + rand() * 5) : sg.thick / 2 + 1 + rand() * rand() * 16;
    const uu = u + (rand() - 0.5) * 2;
    const x = sg.a.x + sg.tx * uu + sg.tn * v, n = sg.a.n + sg.tn * uu - sg.tx * v;
    const sy = 0.45 + rand() * 0.6;
    rubble.push({
      s, x, n, y: ground(x, n) + sy * 0.2, sx: 0.7 + rand() * 1.1, sy, sz: 0.6 + rand() * 0.9,
      q: new THREE.Quaternion().setFromEuler(new THREE.Euler(rand() * 0.6 - 0.3, rand() * Math.PI * 2, rand() * 0.6 - 0.3)),
    });
  }
});
rubble.sort((a, b) => a.s - b.s);
const rubbleMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), MAT.block, rubble.length);
rubbleMesh.castShadow = rubbleMesh.receiveShadow = true;
rubbleMesh.frustumCulled = false;
{
  const c = new THREE.Color();
  rubble.forEach((r, i) => rubbleMesh.setColorAt(i, c.setHSL(0.11, 0.22 + rand() * 0.1, 0.5 + rand() * 0.15)));
}
scene.add(rubbleMesh);
const rubbleS = Float64Array.from(rubble, (r) => r.s);

const _m = new THREE.Matrix4(), _p = new THREE.Vector3(), _q = new THREE.Quaternion(), _s = new THREE.Vector3();
function setBlock(i, p) {
  const b = blocks[i];
  if (p <= 0) {
    _m.makeScale(0, 0, 0);
  } else {
    const e = p >= 1 ? 1 : Math.max(0.001, easeOutBack(p));
    const lift = (1 - p) ** 2 * 16;
    _p.set(b.x, b.y + lift, -b.n);
    _q.setFromAxisAngle(UP, b.yaw);
    _s.set(b.sx * e, b.sy * e, b.sz * e);
    _m.compose(_p, _q, _s);
  }
  blockMesh.setMatrixAt(i, _m);
}
function setRubble(i, p) {
  const r = rubble[i];
  const k = 1 - smooth(clamp01(p));
  if (k <= 0.001) _m.makeScale(0, 0, 0);
  else _m.compose(_p.set(r.x, r.y - (1 - k) * 0.6, -r.n), r.q, _s.set(r.sx * k, r.sy * k, r.sz * k));
  rubbleMesh.setMatrixAt(i, _m);
}
// First index with s > v.
function upper(arr, v) {
  let lo = 0, hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] <= v) lo = mid + 1; else hi = mid;
  }
  return lo;
}

// Everything up to sDone is finished; everything beyond is in ruins.
function applyStatic(sDone) {
  blocks.forEach((b, i) => setBlock(i, b.ruin || b.s <= sDone ? 1 : 0));
  rubble.forEach((r, i) => setRubble(i, r.s <= sDone ? 1 : 0));
  blockMesh.instanceMatrix.needsUpdate = true;
  rubbleMesh.instanceMatrix.needsUpdate = true;
  for (const st of structures) if (!st.static) st.setProgress(st.s <= sDone ? 1 : 0);
}

// Animate the stretch (A, B] with the build frontier at sF.
function updateBuild(A, B, sF) {
  for (let i = upper(blockS, A), e = upper(blockS, B); i < e; i++) {
    const b = blocks[i];
    if (b.ruin) continue;
    setBlock(i, clamp01((sF - b.s) / RAMP - b.c * LAG));
  }
  for (let i = upper(rubbleS, A), e = upper(rubbleS, B); i < e; i++) setRubble(i, (sF - rubble[i].s) / RAMP);
  blockMesh.instanceMatrix.needsUpdate = true;
  rubbleMesh.instanceMatrix.needsUpdate = true;
  for (const st of structures) {
    if (!st.static && st.s > A && st.s <= B) st.setProgress(clamp01((sF - st.s) / (RAMP * 2)));
  }
}

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

// The Temple (Zerubbabel's, rebuilt 516 BC) with its court, facing east.
{
  const { x, n, g } = featurePos('temple');
  const T = new THREE.Group();
  T.position.set(x, g - 1.5, -n);
  scene.add(T);
  add(T, stoneBox(64, 3, 42), MAT.stone, -2, 0, 0);
  add(T, stoneBox(34, 15, 13), MAT.stone, -6, 3, 0);
  add(T, stoneBox(6, 19, 18), MAT.stone, 14, 3, 0);
  add(T, baseBox(0.4, 7, 3.2), MAT.dark, 17.05, 3, 0);
  add(T, stoneBox(7, 3, 7), MAT.stone, 32, 0.5, 0);           // altar
  add(T, baseBox(35, 0.6, 14), MAT.roof, -6, 18, 0);
  // Court enclosure
  const cw = 150, cd = 150;
  for (const [cx, cz, w, d] of [[5, -cd / 2, cw, 2.5], [5, cd / 2, cw, 2.5], [5 - cw / 2, 0, 2.5, cd], [5 + cw / 2, 0, 2.5, cd]]) {
    const gx = x + cx, gn = n - cz;
    const lo = Math.min(ground(gx - w / 2, gn - d / 2), ground(gx + w / 2, gn + d / 2), ground(gx, gn));
    add(T, stoneBox(w, 5 + (g - lo), d), MAT.stone, cx, lo - g + 0.5, cz);
  }
}

// Named houses and buildings along the east side.
{
  for (const [key, w, h, d] of [['eliashib', 16, 7, 12], ['mighty', 22, 6, 11]]) {
    const { x, n } = featurePos(key);
    const sg = nearestTangent(x, n);
    building(x, n, sg.tx, sg.tn, w, h, d);
  }
  // Armory, with the "going up" to it.
  {
    const { x, n } = featurePos('armory');
    const sg = nearestTangent(x, n);
    const G = building(x, n, sg.tx, sg.tn, 14, 8, 12);
    for (let i = 0; i < 7; i++) add(G, stoneBox(4, 1 + i * 0.9, 1.6), MAT.stone, -10 - (6 - i) * 1.6 + 2, 0, -2);
  }
  // King's upper house, with the court of the guard beside it.
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
  const water = add(G, baseBox(w, 0.2, d), MAT.water, 0, rimH - 0.02);
  water.castShadow = false;
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

// Houses: "the city was large and great: but the people were few therein,
// and the houses were not builded" (7:4). Sparse, with many still ruined.
// Houses stand in rows along a few streets: a spine up the ridge from Siloam
// to the Temple, lanes down to the gates, and a street in the western valley.
// Others back onto the inside of the wall, where families repaired "every one
// over against his house" (3:23, 28-30).
const STREETS = [
  [[25, -450], [22, -300], [18, -150], [20, 0], [25, 150], [30, 300], [35, 425]],
  [[-42, -415], [22, -330]],                                     // to the Dung Gate
  [[-98, 58], [-40, 38], [20, 10]],                              // to the Valley Gate
  [[25, 170], [105, 166]],                                       // to the Water Gate
  [[30, 330], [135, 356]],                                       // to the Horse Gate
  [[-98, 70], [-120, 250], [-150, 450], [-172, 610], [-130, 690]],
  [[-150, 450], [-40, 452]],
  [[-130, 690], [0, 702], [100, 692]],
];
{
  const reserved = Object.values(FEATURES).filter((f) => f.kind === 'feature');
  // Keep the camera positions at each stop clear of rooftops.
  const stopCams = STOPS.map((st) => {
    const v = { side: 'in', dist: 45, along: -28, ...st.view };
    const s = (st.closing ? WALL_LEN : wallById[st.wall].s) + v.along;
    const p = wallAt(s), { tx, tn } = tangentAt(s, 25);
    const off = (v.side === 'out' ? 1 : -1) * v.dist;
    return { x: p.x + tn * off, n: p.n - tx * off };
  });
  const list = [];
  const r = mulberry32(731);
  const radius = (h) => Math.min(h.w, h.d) / 2;
  // Try a house of frontage w and depth d centred at (x, n), facing along (tx, tn).
  function place(x, n, tx, tn, w, d, minWall) {
    if (!insideCity(x, n) || wallDist(x, n) < minWall) return;
    if (x > -35 && x < 125 && n > 435 && n < 605) return;
    if (reserved.some((f) => Math.hypot(f.x - x, f.n - n) < 24)) return;
    if (Math.hypot(x - 36, n + 416) < 34) return;
    if (Object.keys(GATES).some((k) => Math.hypot(wallById[k].x - x, wallById[k].n - n) < 22)) return;
    if (stopCams.some((c) => Math.hypot(c.x - x, c.n - n) < 28)) return;
    const { lo, hi } = footprint(x, n, tx, tn, [-w / 2, w / 2], [-d / 2, d / 2]);
    if (hi - lo > 6) return;
    const me = { w, d };
    if (list.some((h) => Math.hypot(h.x - x, h.n - n) < radius(h) + radius(me) + 1.5)) return;
    const ruin = r() < 0.4;
    list.push({ x, n, w, d, h: ruin ? 1 + r() * 1.4 : 3.5 + r() * 2.5, ruin, yaw: Math.atan2(tn, tx) });
  }
  // Walk a polyline, filling plots on one side (+1 left, -1 right) at a setback.
  // Plots come in short terraces with empty or abandoned lots between them.
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
  // Against the wall first, then both sides of each street.
  const ring = [...pts, pts[0]].map((p) => [p.x, p.n]);
  row(ring, 1, 9, 0.5, 9);
  for (const path of STREETS) for (const side of [1, -1]) row(path, side, 2.5, path === STREETS[0] ? 0.75 : 0.55, 16);
  const body = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0), MAT.plain, list.length);
  const roof = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0), MAT.plain, list.length);
  const plaster = ['#ecdcb6', '#e0c595', '#f1e6cb', '#d9bf8c', '#e8cfa2'].map((h) => new THREE.Color(h));
  const roofs = ['#bfa070', '#b0865a', '#c9aa76'].map((h) => new THREE.Color(h));
  const ruinC = new THREE.Color('#b3a37f');
  list.forEach((h, i) => {
    const c = Math.cos(h.yaw), s = Math.sin(h.yaw);
    const { lo } = footprint(h.x, h.n, c, s, [-h.w / 2, h.w / 2], [-h.d / 2, h.d / 2]);
    _q.setFromAxisAngle(UP, h.yaw);
    body.setMatrixAt(i, _m.compose(_p.set(h.x, lo - 1, -h.n), _q, _s.set(h.w, h.h + 1, h.d)));
    body.setColorAt(i, h.ruin ? ruinC : plaster[i % plaster.length]);
    if (h.ruin) _m.makeScale(0, 0, 0);
    else _m.compose(_p.set(h.x, lo + h.h, -h.n), _q, _s.set(h.w + 0.5, 0.45, h.d + 0.5));
    roof.setMatrixAt(i, _m);
    roof.setColorAt(i, roofs[i % roofs.length]);
  });
  for (const m of [body, roof]) { m.castShadow = m.receiveShadow = true; scene.add(m); }
}

// Olive trees: Mount of Olives, the King's Garden, the valley floors.
{
  const list = [];
  const gardens = { x: 80, n: -565 };
  for (let i = 0; i < 16000 && list.length < 1100; i++) {
    const x = -900 + rand() * 2100, n = -1000 + rand() * 2100;
    if (insideCity(x, n) || wallDist(x, n) < 20) continue;
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
  list.forEach((t, i) => {
    _q.setFromAxisAngle(UP, t.yaw);
    trunk.setMatrixAt(i, _m.compose(_p.set(t.x, t.y - 0.3, -t.n), _q, _s.set(t.k, t.k, t.k)));
    crown.setMatrixAt(i, _m.compose(_p.set(t.x, t.y + 3.2 * t.k, -t.n), _q, _s.set(1.25 * t.k, 0.8 * t.k, 1.15 * t.k)));
    crown.setColorAt(i, greens[i % greens.length]);
  });
  for (const m of [trunk, crown]) { m.castShadow = true; m.receiveShadow = true; scene.add(m); }
}

// ---------------------------------------------------------------- builders
// A small crew at each stop, on the stretch in view and mostly on the camera's
// side. Crew size grows with the number of groups Nehemiah 3 names there;
// priests wear white.
{
  const people = [];
  STOPS.forEach((st) => {
    const end = st.closing ? WALL_LEN : wallById[st.wall].s;
    const groups = english(st.builders).split(/·|&/).length;
    const count = Math.min(16, 4 + groups * 3);
    const priests = /priest/i.test(english(st.builders));
    const camOut = st.view?.side === 'out';
    for (let k = 0, tries = 0; k < count && tries < 200; tries++) {
      const sw = end - 35 + rand() * 50;
      if (nearGate(sw)) continue;
      const p = wallAt(sw);
      const out = rand() < 0.75 ? camOut : !camOut;
      const d = (out ? 1 : -1) * (p.thick / 2 + 1.5 + rand() * 4);
      const x = p.x + p.tn * d, n = p.n - p.tx * d;
      people.push({ x, n, y: ground(x, n), priest: priests && rand() < 0.8, k: 0.95 + rand() * 0.15 });
      k++;
    }
  });
  const body = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.26, 0.4, 1.3, 6).translate(0, 0.65, 0), MAT.plain, people.length);
  const head = new THREE.InstancedMesh(new THREE.SphereGeometry(0.21, 8, 6).translate(0, 1.52, 0), MAT.plain, people.length);
  const tunics = ['#8a5a3c', '#b8874f', '#6f7f8c', '#9c6b4e', '#c9b48a', '#7a6a4f', '#5f7656', '#a8553a'].map((h) => new THREE.Color(h));
  const white = new THREE.Color('#f2eee4');
  const heads = ['#a8714c', '#8e5c3c', '#e6dccb', '#c0a888'].map((h) => new THREE.Color(h));
  people.forEach((m, i) => {
    _m.compose(_p.set(m.x, m.y - 0.1, -m.n), _q.identity(), _s.setScalar(m.k * 1.15));
    body.setMatrixAt(i, _m);
    head.setMatrixAt(i, _m);
    body.setColorAt(i, m.priest ? white : tunics[Math.floor(rand() * tunics.length)]);
    head.setColorAt(i, heads[Math.floor(rand() * heads.length)]);
  });
  for (const m of [body, head]) { m.castShadow = true; scene.add(m); }
}

// ---------------------------------------------------------------- labels
const labels = [];
function makeLabel(text, kind, pos, keys, anchor = pos) {
  const el = document.createElement('div');
  el.className = `label ${kind}`;
  el.textContent = tr(text);
  const obj = new CSS2DObject(el);
  obj.position.copy(pos);
  scene.add(obj);
  labels.push({ el, obj, kind, keys, anchor, text, opacity: -1, hidden: false });
}

// Is the label behind a hill as seen from the camera? (e.g. the Kidron seen
// from west of the city.) Samples the terrain along the line of sight.
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
for (const t of Object.values(towerObjs)) makeLabel(t.def.name, 'tower', t.labelPos, [`tower:${t.key}`]);
for (const [k, f] of Object.entries(FEATURES)) {
  const gy = ground(f.x, f.n);
  makeLabel(f.name, f.kind, v3(f.x, f.n, gy + f.lift), [`feature:${k}`], v3(f.x, f.n, gy + 3));
}

function updateLabels(activeKeys) {
  const overview = tour.phase === 'intro' || tour.phase === 'finale';
  const checkOcclusion = occlusionFrame++ % 6 === 0;
  for (const lb of labels) {
    if (checkOcclusion) lb.hidden = behindTerrain(camera.position, lb.anchor);
    const d = camera.position.distanceTo(lb.obj.position);
    let o = 1;
    if (lb.kind === 'feature' || lb.kind === 'tower') o = clamp01((800 - d) / 300);
    else if (lb.kind === 'gate') o = overview ? 1 : clamp01((1400 - d) / 500);
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
const stops = STOPS.map((st, i) => {
  const s = st.closing ? WALL_LEN : wallById[st.wall].s;
  return { ...st, i, s };
});
stops.forEach((st, i) => {
  st.buildA = i === 0 ? -1 : stops[i - 1].s;
  st.buildB = i === 0 ? 0 : st.s;
  if (st.target) st.look = v3(st.target.x, st.target.n, ground(st.target.x, st.target.n) + 5);
  else if (st.gate) st.look = gateObjs[st.gate].center.clone();
  else if (st.towers) st.look = towerObjs[st.towers[0]].center.clone();
  else { const p = wallAt(st.s); st.look = v3(p.x, p.n, ground(p.x, p.n) + 5); }
  st.activeKeys = new Set([
    ...(st.gate ? [`gate:${st.gate}`] : []),
    ...(st.towers ?? []).map((t) => `tower:${t}`),
    ...(st.feature ? [`feature:${st.feature}`] : []),
  ]);
  const v = { side: 'in', dist: 45, h: 26, along: -28, ...st.view };
  st.cam = { s: st.s + v.along, off: (v.side === 'out' ? 1 : -1) * v.dist, h: v.h };
  st.pos = camAt(st.cam.s, st.cam.off, st.cam.h);
});

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
  detached: false,
  explore: false,
};
let fly = null;

function wordCount(st) { return `${tr(st.quote)} ${tr(st.note)}`.split(/\s+/).length; }

function startFly(toIndex) {
  const to = stops[toIndex];
  const from = tour.i >= 0 ? stops[tour.i] : null;
  const sequential = from && toIndex === tour.i + 1 && !tour.detached;
  if (!sequential) applyStatic(toIndex > 0 ? stops[toIndex - 1].buildB : -1);
  const fromPos = view.pos.clone(), fromLook = view.look.clone();
  let dur;
  if (sequential) dur = Math.min(12, Math.max(5.5, Math.abs(to.cam.s - from.cam.s) / 35));
  else dur = Math.min(7.5, Math.max(3.3, fromPos.distanceTo(to.pos) / 150));
  fly = {
    t: 0, dur, sequential, from, to, fromPos, fromLook,
    build: { A: to.buildA, B: to.buildB },
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

function flyToOverview(then) {
  fly = {
    t: 0, dur: 6, sequential: false, fromPos: view.pos.clone(), fromLook: view.look.clone(),
    to: { pos: overviewPos(tour.orbitA), look: OVERVIEW_C.clone() }, build: null, done: then,
  };
  tour.phase = 'fly';
  hidePopup();
}

const _away = new THREE.Vector3();
function stepFly(dt) {
  fly.t += dt / fly.dur;
  const u = clamp01(fly.t);
  const e = easeArrive(u);
  if (fly.sequential) {
    const A = fly.from.cam, B = fly.to.cam;
    const flip = Math.sign(A.off) !== Math.sign(B.off);
    const s = lerp(A.s, B.s, e);
    // Pull up and back mid-flight so the stretch is seen against the whole city.
    const arc = Math.sin(Math.PI * u);
    const zoom = Math.min(1, 0.5 + Math.abs(B.s - A.s) / 300) * Math.sqrt(arc);
    const pos = camAt(s, lerp(A.off, B.off, e), lerp(A.h, B.h, e) + (flip ? 24 : 7) * arc);
    _away.set(pos.x - OVERVIEW_C.x, 0, pos.z - OVERVIEW_C.z).normalize();
    pos.addScaledVector(_away, 220 * zoom).y += 260 * zoom;
    const ahead = wallAt(s + 45);
    const mid = v3(ahead.x, ahead.n, ground(ahead.x, ahead.n) + 5);
    view.pos.copy(pos);
    view.look.lerpVectors(fly.from.look, fly.to.look, e).lerp(mid, arc * 0.65).lerp(OVERVIEW_C, zoom * 0.35);
  } else {
    const arc = Math.min(260, fly.fromPos.distanceTo(fly.to.pos) * 0.22) * Math.sin(Math.PI * u);
    view.pos.lerpVectors(fly.fromPos, fly.to.pos, e).y += arc;
    view.look.lerpVectors(fly.fromLook, fly.to.look, easeInOut(clamp01(u * 1.15)));
  }
  if (fly.build) {
    const { A, B } = fly.build;
    const sF = lerp(A - 2, B + RAMP * 2.8, smooth(clamp01(u * 1.05)));
    updateBuild(A, B, sF);
  }
  if (u >= 1) {
    const done = fly.done;
    if (fly.build) updateBuild(fly.build.A, fly.build.B, Infinity);
    fly = null;
    done();
  }
}

function holdFor(st) {
  const read = Math.min(16, Math.max(8, 4 + wordCount(st) * 0.13)) * tour.holdScale;
  return Math.max(read, narrationSpan(`stop:${st.i}`));
}

function arrive(i) {
  const st = stops[i];
  tour.phase = 'hold';
  tour.holdT = 0;
  tour.holdDur = holdFor(st);
  hideNext();
  showPopup(st);
  narrator.say(verseLine(tr(st.ref), tr(st.quote), t('nehemiah.book')));
  cue(`stop:${i}`);
}

function finish() {
  narrator.stop();
  tour.i = stops.length;
  applyStatic(WALL_LEN);
  flyToOverview(() => {
    tour.phase = 'finale';
    showCard(FINALE, true);
    narrator.say(verseLine(tr(FINALE.ref), tr(FINALE.quote), t('nehemiah.book')));
    cue('finale');
  });
  updateProgress();
}

function next() {
  if (tour.explore) setExplore(false);
  if (tour.phase === 'intro' || tour.phase === 'finale') return begin();
  if (fly && fly.build) {
    // Skip to the end of the current flight.
    fly.t = 1;
    stepFly(0);
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
  hideCard();
  applyStatic(-1);
  tour.i = -1;
  tour.detached = true;
  setPlaying(true);
  startFly(0);
}

function update(dt) {
  const t = dt * tour.speed;
  narrator.update(dt);
  if (tour.explore) return;
  if (tour.phase === 'intro') {
    // Hold the view from the south, with a gentle sway.
    tour.introT += dt;
    tour.orbitA = SOUTH + 0.12 * Math.sin(tour.introT * 0.12);
  } else if (tour.phase === 'finale') tour.orbitA += dt * 0.025;
  if (tour.phase === 'intro' || tour.phase === 'finale') {
    if (!fly) {
      view.pos.copy(overviewPos(tour.orbitA));
      view.look.copy(OVERVIEW_C);
    }
  }
  if (fly) {
    if (tour.playing || !fly.build) stepFly(fly.build ? t : dt);
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
controls.minDistance = 15;
controls.maxDistance = 3000;

function setExplore(on) {
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
      fly = {
        t: 0, dur: 2.5, sequential: false, fromPos: view.pos.clone(), fromLook: view.look.clone(),
        to: st, build: null, done: () => { tour.phase = 'hold'; if (resume === 'fly') tour.holdT = 0; },
      };
      if (resume === 'fly') { applyStatic(st.buildB); tour.detached = true; }
    } else {
      const phase = tour.phase;
      flyToOverview(() => { tour.phase = phase; });
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
const narrator = createNarrator({ box: ui.narration, mute: ui.mute, volume: ui.volume, voice: ui.voice }, { enabled: !RECORD });
const timerBar = document.createElement('i');

const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);

function showPopup(st) {
  const g = st.gate ? GATES[st.gate] : null;
  const chips = g
    ? `<ul class="chips" aria-label="${t('gateChips')}">
        <li class="status">${esc(tr(g.repair))}</li>
        ${Object.entries(PARTS)
          .map(([k, p]) => `<li class="${g[k] ? 'yes' : 'no'}" title="${t(g[k] ? 'recorded' : 'notMentioned')}">${esc(tr(p))}</li>`).join('')}
      </ul>`
    : '';
  ui.popup.innerHTML = `
    <div class="kicker">${t('stopOf', { n: st.i + 1, total: stops.length })} · ${t('nehemiah.book')} ${st.ref} (${VERSIONS[current.version].abbr})</div>
    <h2>${esc(tr(st.title))}</h2>
    <blockquote>${esc(tr(st.quote))}</blockquote>
    <p>${esc(tr(st.note))}</p>
    ${chips}
    <div class="builders"><span>${t('repairedBy')}</span> ${esc(tr(st.builders))}</div>
    <div class="timer"></div>`;
  ui.popup.querySelector('.timer').appendChild(timerBar);
  timerBar.style.transform = 'scaleX(0)';
  ui.popup.classList.add('show');
}
function hidePopup() { ui.popup.classList.remove('show'); }
function showNext(st) {
  ui.nextChip.innerHTML = `<span>${t('next')}</span> ${esc(tr(st.title))} <em>3:${esc(st.ref.replace(/^3:/, ''))}</em>`;
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
    </div>
    <p class="credits">${noticeHTML()}<br>${t('lukeThomas')}</p>`;
  ui.card.classList.add('show');
  ui.card.querySelector('[data-act=begin]').onclick = begin;
  ui.card.querySelector('[data-act=explore]').onclick = () => { hideCard(); setExplore(true); };
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
    b.title = `${tr(st.title)} (3:${st.ref.replace(/^3:/, '')})`;
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
  ui.credit.textContent = t('creditLuke', { abbr: VERSIONS[v].abbr });
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
ui.version.onchange = () => { remember(ui.version.value); setVersion(ui.version.value); };
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
applyStatic(-1);
setVersion(current.version);
showCard(INTRO, false);
setPlaying(false);

const clock = new THREE.Clock();
const noKeys = new Set();
let viewShift = 0;   // shifts the frame right so the popup doesn't cover the subject
function frame(dt) {
  update(dt);
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
if (!RECORD) renderer.setAnimationLoop(() => frame(Math.min(clock.getDelta(), 0.05)));

// The compass turns with the camera's heading (plan: east = X, north = -Z).
const compassRose = document.getElementById('compass-rose');
const _dir = new THREE.Vector3();
let compassDeg = null;
function updateCompass() {
  camera.getWorldDirection(_dir);
  const deg = Math.round((-Math.atan2(_dir.x, -_dir.z) * 180) / Math.PI * 2) / 2;
  if (deg !== compassDeg) compassRose.style.transform = `rotate(${(compassDeg = deg)}deg)`;
}

// ---------------------------------------------------------------- recording
// The exporter reads the narration script, synthesises it, passes back each clip's length,
// then calls step() once per video frame. Holds stretch to fit their narration, and step()
// reports when each clip should start (cues), in seconds of video time.
const NARR_LEAD = 0.8, NARR_TAIL = 1.8;
const narration = {};
const cues = [];
let recT = 0;
function narrationSpan(id) { return id in narration ? NARR_LEAD + narration[id] + NARR_TAIL : 0; }
function cue(id) { if (RECORD) cues.push({ id, t: recT + NARR_LEAD }); }

// The same lines the live tour reads (verseLine in narrator.js).
function narrationScript() {
  const book = t('nehemiah.book');
  return [
    { id: 'intro', text: verseLine(tr(INTRO.ref), tr(INTRO.quote), book) },
    ...stops.map((st) => ({ id: `stop:${st.i}`, text: verseLine(tr(st.ref), tr(st.quote), book) })),
    { id: 'finale', text: verseLine(tr(FINALE.ref), tr(FINALE.quote), book) },
  ];
}

// CSS transitions follow video time too, not wall-clock time.
const animClock = new WeakMap();
function stepAnimations(dt) {
  for (const a of document.getAnimations()) {
    const t = animClock.has(a) ? animClock.get(a) + dt * 1000 : 0;
    animClock.set(a, t);
    a.pause();
    a.currentTime = t;
  }
}

const RECORD_END = 7;   // seconds of finale orbit after its narration
let recEnd = Infinity;
if (RECORD) {
  window.__record = {
    script: narrationScript,
    start(durations) {
      Object.assign(narration, durations);
      cue('intro');
    },
    step(dt) {
      recT += dt;
      if (tour.phase === 'intro' && recT >= narrationSpan('intro') + 1) begin();
      if (tour.phase === 'finale' && recEnd === Infinity) recEnd = recT + narrationSpan('finale') + RECORD_END;
      frame(dt);
      stepAnimations(dt);
      return { t: recT, cues: cues.splice(0), done: recT >= recEnd };
    },
  };
}

// Handy for debugging from the console.
window.__tour = {
  tour, stops, jump, next, applyStatic, view,
  advance(sec) { for (let t = 0; t < sec; t += 0.05) update(0.05); },
};
