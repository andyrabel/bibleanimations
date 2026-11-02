import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ground, noise2 } from './terrain.js';
import {
  TENT, COURT, PLACES, FEATURES, STOPS, INTRO, FINALE, VERSIONS, DEFAULT_VERSION, TERMS, MATERIALS,
} from './data.js';

// ---------------------------------------------------------------- constants
// One world unit is one cubit.
const BT = 0.75;         // board thickness (not given in the text)
const OUT_N = TENT.half + BT;   // outer face of the side walls
const OUT_W = TENT.west - BT;   // outer face of the back wall
const OVERVIEW_C = new THREE.Vector3(-6, 10, 0);
const FINALE_LOOK = new THREE.Vector3(-6, -12, 0);   // lower, so the tent and cloud clear the finale card
const HOLD_SCALE = 0.5;  // default pause at each stop, relative to the reading-time estimate
const NORTH_EAST = -1.0; // overview angle: from the north-east, looking towards Sinai

// ---------------------------------------------------------------- helpers
function mulberry32(a) {
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(1446);
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

// Bible version: text fields in data.js are strings or { [version]: string, default },
// and may contain {term} placeholders filled from TERMS.
let version = DEFAULT_VERSION;
try {
  const saved = localStorage.getItem('bibleVersion');
  if (saved in VERSIONS) version = saved;
} catch {}
const pick = (v) => (v == null || typeof v === 'string' ? v : v[version] ?? v.default);
function tr(v) {
  return pick(v)?.replace(/\{(\w+)\}/g, (m, k) => {
    const t = pick(TERMS[k[0].toLowerCase() + k.slice(1)]);
    if (t == null) return m;
    return k[0] === k[0].toUpperCase() ? t[0].toUpperCase() + t.slice(1) : t;
  });
}
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
scene.fog = new THREE.Fog(0xeadcc4, 500, 4200);
// A soft environment so the gold, silver and bronze read as metal.
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.55;

const camera = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, 0.3, 9000);

scene.add(new THREE.HemisphereLight(0xdfeaff, 0xc4a77a, 1.1));
const sun = new THREE.DirectionalLight(0xfff0d4, 2.7);
sun.position.copy(OVERVIEW_C).add(new THREE.Vector3(170, 260, -110));
sun.target.position.copy(OVERVIEW_C);
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
Object.assign(sun.shadow.camera, { left: -85, right: 85, top: 85, bottom: -85, near: 50, far: 700 });
sun.shadow.bias = -0.0003;
sun.shadow.normalBias = 0.04;
scene.add(sun, sun.target);

function skyTexture() {
  const c = document.createElement('canvas');
  c.width = 4; c.height = 512;
  const g = c.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#5f9fdc');
  grad.addColorStop(0.55, '#bcd6ea');
  grad.addColorStop(1, '#f1dcb8');
  g.fillStyle = grad;
  g.fillRect(0, 0, 4, 512);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ---------------------------------------------------------------- materials
const YARN = ['#3b3f8f', '#6b2d6b', '#b3242c'];   // blue (violet), purple, scarlet

function canvasTexture(size, draw) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  draw(c.getContext('2d'), size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return t;
}
function weave(g, s, base) {
  g.fillStyle = base;
  g.fillRect(0, 0, s, s);
  for (let i = 0; i < s; i += 2) {
    g.fillStyle = `rgba(110,90,60,${0.03 + rand() * 0.04})`;
    g.fillRect(0, i, s, 1);
    g.fillStyle = `rgba(255,255,255,${0.03 + rand() * 0.05})`;
    g.fillRect(i, 0, 1, s);
  }
}
// A cherub, schematically: body, head, two wings spread up and out.
function cherub(g, cx, cy, k, body, wing) {
  g.fillStyle = wing;
  for (const s of [-1, 1]) {
    g.beginPath();
    g.moveTo(cx, cy);
    g.quadraticCurveTo(cx + s * 55 * k, cy - 80 * k, cx + s * 100 * k, cy - 46 * k);
    g.quadraticCurveTo(cx + s * 60 * k, cy - 18 * k, cx + s * 8 * k, cy + 16 * k);
    g.fill();
    g.strokeStyle = 'rgba(255,255,255,0.35)';
    g.lineWidth = 2 * k;
    for (let f = 1; f < 5; f++) {
      g.beginPath();
      g.moveTo(cx + s * 10 * k, cy + 2 * k);
      g.lineTo(cx + s * (30 + f * 16) * k, cy - (20 + f * 8) * k);
      g.stroke();
    }
  }
  g.fillStyle = body;
  g.beginPath();
  g.ellipse(cx, cy + 40 * k, 15 * k, 42 * k, 0, 0, Math.PI * 2);
  g.fill();
  g.beginPath();
  g.arc(cx, cy - 12 * k, 13 * k, 0, Math.PI * 2);
  g.fill();
}
function bands(g, s, y, h) {
  YARN.forEach((c, i) => { g.fillStyle = c; g.fillRect(0, y + (i * h) / 3, s, h / 3 - 1); });
}

const TEX = {
  // Linen curtains of the tabernacle, worked with cherubim (26:1). One tile = 4 cubits.
  curtain: canvasTexture(256, (g, s) => {
    weave(g, s, '#efe6d2');
    bands(g, s, 4, 18);
    bands(g, s, s - 22, 18);
    cherub(g, s / 2, s / 2 - 6, 0.95, YARN[2], YARN[0]);
    cherub(g, 0, s / 2 - 6, 0.6, YARN[1], YARN[0]);
    cherub(g, s, s / 2 - 6, 0.6, YARN[1], YARN[0]);
  }),
  // The veil: coloured yarn and linen with cherubim (26:31). Mapped once over the whole veil.
  veil: canvasTexture(512, (g, s) => {
    const grad = g.createLinearGradient(0, 0, 0, s);
    grad.addColorStop(0, YARN[0]); grad.addColorStop(0.5, YARN[1]); grad.addColorStop(1, YARN[2]);
    g.fillStyle = grad;
    g.fillRect(0, 0, s, s);
    for (let i = 0; i < s; i += 2) { g.fillStyle = `rgba(0,0,0,${rand() * 0.07})`; g.fillRect(0, i, s, 1); }
    g.fillStyle = '#efe6d2';
    g.fillRect(0, 0, s, 10); g.fillRect(0, s - 10, s, 10);
    for (const [x, y] of [[128, 150], [384, 150], [128, 380], [384, 380]]) cherub(g, x, y, 1.05, '#d8b24a', '#efe6d2');
  }),
  // Embroidered doorway curtain and court gate: no cherubim (26:36; 27:16). Mapped once.
  screen: canvasTexture(512, (g, s) => {
    weave(g, s, '#efe6d2');
    const w = s / 15;
    for (let i = 0; i < 15; i++) {
      if (i % 2) continue;
      g.fillStyle = YARN[(i / 2) % 3];
      g.fillRect(i * w, 0, w, s);
    }
    for (let i = 1; i < 15; i += 2) {
      for (let y = 30; y < s; y += 60) {
        g.fillStyle = YARN[(i + y / 60) % 3 | 0];
        g.beginPath();
        g.moveTo(i * w + w / 2, y - 14); g.lineTo(i * w + w - 4, y); g.lineTo(i * w + w / 2, y + 14); g.lineTo(i * w + 4, y);
        g.fill();
      }
    }
  }),
  // Plain fine linen for the court hangings. One tile = 5 cubits.
  linen: canvasTexture(128, (g, s) => {
    weave(g, s, '#f4efe2');
    g.fillStyle = 'rgba(120,100,70,0.12)';
    g.fillRect(0, 0, s, 3);
  }),
};

const MAT = {
  gold: new THREE.MeshStandardMaterial({ color: 0xe0ad3c, metalness: 0.85, roughness: 0.3 }),
  silver: new THREE.MeshStandardMaterial({ color: 0xdcdce2, metalness: 0.85, roughness: 0.28 }),
  bronze: new THREE.MeshStandardMaterial({ color: 0xb5773d, metalness: 0.8, roughness: 0.38 }),
  wood: new THREE.MeshStandardMaterial({ color: 0x9c6c3e, roughness: 0.8 }),
  curtain: new THREE.MeshStandardMaterial({ map: TEX.curtain, roughness: 1 }),
  veil: new THREE.MeshStandardMaterial({ map: TEX.veil, roughness: 1 }),
  screen: new THREE.MeshStandardMaterial({ map: TEX.screen, roughness: 1 }),
  linen: new THREE.MeshStandardMaterial({ map: TEX.linen, roughness: 1 }),
  goat: new THREE.MeshStandardMaterial({ color: 0x3d322b, roughness: 1 }),
  rams: new THREE.MeshStandardMaterial({ color: 0x9a3a28, roughness: 0.9 }),
  outer: new THREE.MeshStandardMaterial({ color: 0x8c7b64, roughness: 0.95 }),
  stone: new THREE.MeshStandardMaterial({ color: 0x9d998e, roughness: 0.9 }),
  bread: new THREE.MeshStandardMaterial({ color: 0xd9ac6c, roughness: 0.9 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x241c15, roughness: 1 }),
  char: new THREE.MeshStandardMaterial({ color: 0x2a1f18, roughness: 1 }),
  cord: new THREE.MeshStandardMaterial({ color: 0xcbb68a, roughness: 1 }),
  water: new THREE.MeshStandardMaterial({ color: 0x5aa0b8, roughness: 0.1, metalness: 0.2, emissive: 0x0b2a3a }),
  flame: new THREE.MeshBasicMaterial({ color: 0xffb347 }),
  plain: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95, flatShading: true }),
};
// The south wall and the curtain clasps get their own metal so they can fade
// with the coverings for the cutaway views.
MAT.goldSouth = MAT.gold.clone();
MAT.goldClasp = MAT.gold.clone();
MAT.bronzeClasp = MAT.bronze.clone();
const COVER_MATS = [MAT.curtain, MAT.goat, MAT.rams, MAT.outer, MAT.goldClasp, MAT.bronzeClasp];

// Box with its base at y = 0. With `tile`, UVs repeat the texture every `tile` units.
function box(w, h, d, tile) {
  const geo = new THREE.BoxGeometry(w, h, d);
  if (tile) {
    const uv = geo.attributes.uv;
    for (let f = 0; f < 6; f++) {
      const [du, dv] = f < 2 ? [d, h] : f < 4 ? [w, d] : [w, h];
      for (let k = 0; k < 4; k++) {
        const i = f * 4 + k;
        uv.setXY(i, (uv.getX(i) * du) / tile, (uv.getY(i) * dv) / tile);
      }
    }
  }
  return geo.translate(0, h / 2, 0);
}
function add(parent, geo, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = m.receiveShadow = true;
  parent.add(m);
  return m;
}
// A group at plan position (x, n), base height y, local +X east, +Z south.
function placed(x, n, y = 0) {
  const g = new THREE.Group();
  g.position.set(x, y, -n);
  scene.add(g);
  return g;
}
const cylX = (r, len, seg = 10) => new THREE.CylinderGeometry(r, r, len, seg).rotateZ(Math.PI / 2);
const cylZ = (r, len, seg = 10) => new THREE.CylinderGeometry(r, r, len, seg).rotateX(Math.PI / 2);

// ---------------------------------------------------------------- terrain
{
  const SIZE = 6400, SEG = 320;
  const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG);
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, 0, 600);
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) p.setY(i, ground(p.getX(i), -p.getZ(i)));
  const g2 = geo.toNonIndexed();
  g2.computeVertexNormals();
  const pos = g2.attributes.position, nor = g2.attributes.normal;
  const col = new Float32Array(pos.count * 3);
  const C = {
    sand: new THREE.Color('#dcc493'), gravel: new THREE.Color('#c3a678'), granite: new THREE.Color('#a4664a'),
    dark: new THREE.Color('#77503f'), court: new THREE.Color('#e6d4ab'),
  };
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i += 3) {
    const x = (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3;
    const n = -(pos.getZ(i) + pos.getZ(i + 1) + pos.getZ(i + 2)) / 3;
    const h = (pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3;
    const slope = 1 - nor.getY(i);
    c.copy(C.sand).lerp(C.gravel, clamp01((noise2(x / 60, n / 60) - 0.35) * 2));
    c.lerp(C.granite, clamp01((h - 30) / 120));
    c.lerp(C.dark, clamp01((slope - 0.15) / 0.3) * clamp01(h / 60));
    const j = 0.94 + noise2(x / 8, n / 8) * 0.1;
    for (let k = 0; k < 3; k++) {
      col[(i + k) * 3] = c.r * j; col[(i + k) * 3 + 1] = c.g * j; col[(i + k) * 3 + 2] = c.b * j;
    }
  }
  g2.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const terrain = new THREE.Mesh(g2, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true }));
  terrain.receiveShadow = true;
  scene.add(terrain);

  // Finer, level ground under the court, a little paler where it is trodden.
  const pad = new THREE.Mesh(
    new THREE.PlaneGeometry(COURT.east - COURT.west + 30, COURT.half * 2 + 30).rotateX(-Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: C.court, roughness: 1 }),
  );
  pad.position.y = 0.02;
  pad.receiveShadow = true;
  scene.add(pad);
}

// ---------------------------------------------------------------- build groups
// Each piece belongs to a group named in STOPS[].build. A group's progress p
// (0..1) raises its pieces one after another: 'drop' falls in with a little
// overshoot, 'lower' comes down at full size, 'grow' scales up in place.
const groups = {};
function piece(key, obj, mode = 'drop', lift = 6) {
  groups[key] ??= { key, items: [], p: -1 };
  groups[key].items.push({ obj, mode, lift, pos: obj.position.clone(), scale: obj.scale.clone() });
  return obj;
}
function setItem(it, k) {
  const o = it.obj;
  o.visible = k > 0;
  if (k <= 0) return;
  o.position.copy(it.pos);
  o.scale.copy(it.scale);
  if (it.mode === 'drop') {
    o.position.y += (1 - k) ** 2 * it.lift;
    o.scale.multiplyScalar(k >= 1 ? 1 : Math.max(0.001, easeOutBack(k)));
  } else if (it.mode === 'lower') {
    o.position.y += (1 - smooth(k)) * it.lift;
  } else {
    o.scale.multiplyScalar(Math.max(0.001, smooth(k)));
  }
}
function setGroup(key, p) {
  const g = groups[key];
  if (!g || p === g.p) return;
  g.p = p;
  const n = g.items.length;
  const w = Math.min(1, Math.max(0.12, 4 / n));   // each piece's share of the group's time
  g.items.forEach((it, i) => setItem(it, clamp01((p - (n > 1 ? i / (n - 1) : 0) * (1 - w)) / w)));
}
const groupP = (key) => Math.max(0, groups[key]?.p ?? 0);

// ---------------------------------------------------------------- bases, boards, bars, pillars
// Boards, in the order they go up: south side east to west, the back wall
// south to north (with a corner board at each end), north side west to east.
const boards = [];
for (let i = 0; i < 20; i++) boards.push({ x: TENT.east - 0.75 - 1.5 * i, n: -(TENT.half + BT / 2), w: 1.5, alongX: true, south: true });
boards.push({ x: OUT_W + BT / 2, n: -TENT.half - BT / 2 + 0.25, w: 1.25, alongX: false });
for (let i = 0; i < 6; i++) boards.push({ x: OUT_W + BT / 2, n: -3.75 + 1.5 * i, w: 1.5, alongX: false });
boards.push({ x: OUT_W + BT / 2, n: TENT.half + BT / 2 - 0.25, w: 1.25, alongX: false });
for (let i = 19; i >= 0; i--) boards.push({ x: TENT.east - 0.75 - 1.5 * i, n: TENT.half + BT / 2, w: 1.5, alongX: true });

const VEIL_PILLARS = [-3.75, -1.25, 1.25, 3.75];
const DOOR_PILLARS = [-4.75, -2.375, 0, 2.375, 4.75];

// "Two bases under one board for its two tenons" (26:19): silver.
for (const b of boards) {
  for (const s of [-1, 1]) {
    const off = s * b.w / 4;
    const geo = b.alongX ? box(b.w / 2 - 0.06, 0.7, BT + 0.25) : box(BT + 0.25, 0.7, b.w / 2 - 0.06);
    const m = add(scene, geo, MAT.silver, b.x + (b.alongX ? off : 0), 0, -(b.n + (b.alongX ? 0 : off)));
    piece('bases', m, 'drop', 4);
  }
}
for (const n of VEIL_PILLARS) piece('bases', add(scene, box(0.8, 0.7, 0.8), MAT.silver, TENT.veil, 0, -n), 'drop', 4);
for (const n of DOOR_PILLARS) piece('bases', add(scene, box(0.8, 0.7, 0.8), MAT.bronze, TENT.east, 0, -n), 'drop', 4);

// Boards of acacia overlaid with gold, ten cubits by one and a half (26:15-16, 29).
const southMeshes = [];
for (const b of boards) {
  const geo = b.alongX ? box(b.w - 0.05, TENT.height, BT) : box(BT, TENT.height, b.w - 0.05);
  const m = add(scene, geo, b.south ? MAT.goldSouth : MAT.gold, b.x, 0.05, -b.n);
  if (b.south) southMeshes.push(m);
  piece('boards', m, 'drop', 8);
}

// Five bars a side; the middle bar runs end to end (26:26-28).
{
  const r = 0.14, len = TENT.east - OUT_W, mid = (TENT.east + OUT_W) / 2, half = len / 2 - 0.15;
  const runs = [
    [mid, len, 5], [mid + len / 4, half, 8.2], [mid - len / 4, half, 8.2], [mid + len / 4, half, 1.8], [mid - len / 4, half, 1.8],
  ];
  for (const side of [-1, 1]) {
    for (const [x, l, y] of runs) {
      const m = add(scene, cylX(r, l), side < 0 ? MAT.goldSouth : MAT.gold, x, y, -side * (OUT_N + r));
      if (side < 0) southMeshes.push(m);
      piece('bars', m, 'drop', 3);
    }
  }
  const wl = OUT_N * 2, wh = wl / 2 - 0.15;
  for (const [n, l, y] of [[0, wl, 5], [wl / 4, wh, 8.2], [-wl / 4, wh, 8.2], [wl / 4, wh, 1.8], [-wl / 4, wh, 1.8]]) {
    piece('bars', add(scene, cylZ(r, l), MAT.gold, OUT_W - r, y, -n), 'drop', 3);
  }
}

// Pillars overlaid with gold: four for the veil, five for the doorway (26:32, 37).
for (const [x, ns] of [[TENT.veil, VEIL_PILLARS], [TENT.east, DOOR_PILLARS]]) {
  for (const n of ns) {
    const m = add(scene, new THREE.CylinderGeometry(0.22, 0.26, TENT.height, 14).translate(0, TENT.height / 2, 0), MAT.gold, x, 0.05, -n);
    add(m, new THREE.TorusGeometry(0.13, 0.04, 6, 12), MAT.gold, x < TENT.east ? -0.26 : 0.26, TENT.height - 0.5, 0).rotation.y = Math.PI / 2;
    piece('pillars', m, 'drop', 8);
  }
}

// ---------------------------------------------------------------- curtains & coverings
// A set of curtains laid across the tent, each `width` wide and `span` long,
// unrolled east to west: over the roof, then down the back wall. `front` is
// how much hangs folded over the doorway first. `off` lifts the set clear of
// the one beneath.
const coverMeshes = [];
function curtainSet(key, { count, width, span, off, front = 0, mat, tile, clasps }) {
  const east = TENT.east + 0.3 + off, top = TENT.height + off, half = OUT_N + off;
  const R = east - (OUT_W - off);            // roof length
  const drop = Math.min(top - 0.3, (span - half * 2) / 2);
  const t = 0.05;
  for (let i = 0; i < count; i++) {
    const u0 = -front + i * width, u1 = u0 + width;
    const G = placed(0, 0);
    let a = Math.max(u0, 0), b = Math.min(u1, R);
    if (a < b) {
      add(G, box(b - a, t, half * 2, tile), mat, east - (a + b) / 2, top, 0);
      for (const s of [-1, 1]) add(G, box(b - a, drop, t, tile), mat, east - (a + b) / 2, top - drop, s * (half + t / 2));
    }
    a = Math.max(u0, R); b = Math.min(u1, R + top);
    if (a < b) add(G, box(t, b - a, half * 2, tile), mat, east - R - t / 2, top - (b - R), 0);
    a = u0; b = Math.min(u1, 0);
    if (a < b) add(G, box(t, b - a, half * 2, tile), mat, east + t / 2, top + a, 0);
    if (clasps && clasps.after === i) {
      // Fifty clasps joining the two sets, along the seam (26:6, 11).
      const x = east - u1;
      for (let k = 0; k < 50; k++) {
        const z = -half - drop + ((half + drop) * 2 * (k + 0.5)) / 50;
        const zc = Math.max(-half, Math.min(half, z));
        const y = Math.abs(z) > half ? top - (Math.abs(z) - half) : top + t;
        add(G, box(0.22, 0.1, 0.12), clasps.mat, x, y, Math.abs(z) > half ? Math.sign(z) * (half + t) : zc);
      }
    }
    G.traverse((o) => o.isMesh && coverMeshes.push(o));
    piece(key, G, 'lower', 12);
  }
}
// Ten linen curtains, 28 x 4, in two sets of five joined by gold clasps (26:1-6).
curtainSet('linen', { count: 10, width: 4, span: 28, off: 0.03, mat: MAT.curtain, tile: 4, clasps: { after: 4, mat: MAT.goldClasp } });
// Eleven of goats' hair, 30 x 4, the sixth doubled over the front (26:7-13).
curtainSet('goathair', { count: 11, width: 4, span: 30, off: 0.18, front: 2, mat: MAT.goat, clasps: { after: 5, mat: MAT.bronzeClasp } });
// Rams' skins, then the outer covering (26:14). No sizes given: shown over the roof.
for (const [mat, off] of [[MAT.rams, 0.34], [MAT.outer, 0.46]]) {
  const G = placed(0, 0);
  const east = TENT.east + 0.3 + off, west = OUT_W - off, half = OUT_N + off, top = TENT.height + off;
  add(G, box(east - west, 0.08, half * 2), mat, (east + west) / 2, top, 0);
  for (const s of [-1, 1]) add(G, box(east - west, 1.2, 0.08), mat, (east + west) / 2, top - 1.2, s * half);
  add(G, box(0.08, 1.2, half * 2), mat, west, top - 1.2, 0);
  G.traverse((o) => o.isMesh && coverMeshes.push(o));
  piece('skins', G, 'lower', 10);
}

// The veil, hung from the four pillars under the clasps (26:31-33).
{
  const m = add(scene, box(0.08, TENT.height - 0.3, TENT.half * 2), MAT.veil, TENT.veil - 0.32, 0.1, 0);
  piece('veil', m, 'lower', 10);
}
// The doorway curtain, on the five pillars (26:36-37).
{
  const m = add(scene, box(0.08, TENT.height - 0.3, OUT_N * 2), MAT.screen, TENT.east + 0.34, 0.1, 0);
  piece('screen', m, 'lower', 10);
}

// ---------------------------------------------------------------- furniture
// Effects: flames that flicker, smoke that rises.
const flames = [];
function flame(parent, x, y, z, h = 0.22, r = 0.06) {
  const holder = new THREE.Group();
  holder.position.set(x, y, z);
  parent.add(holder);
  const f = new THREE.Mesh(new THREE.ConeGeometry(r, h, 8).translate(0, h / 2, 0), MAT.flame);
  holder.add(f);
  flames.push({ mesh: f, phase: rand() * 10 });
  return holder;
}
const smokes = [];
function smoke(key, x, n, y, { count, size, rise, color, speed, spread }) {
  // The puffs follow the group's progress, so make sure the group exists.
  if (!groups[key]) piece(key, placed(x, n, y), 'grow');
  const puffs = [];
  for (let i = 0; i < count; i++) {
    const m = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1, 1),
      new THREE.MeshStandardMaterial({ color, roughness: 1, transparent: true, opacity: 0, depthWrite: false }),
    );
    m.visible = false;
    scene.add(m);
    puffs.push({ m, phase: i / count, drift: rand() * Math.PI * 2 });
  }
  smokes.push({ key, origin: v3(x, n, y), puffs, size, rise, speed, spread });
}

// The ark: an open chest, the tablets, poles, then the cover with its cherubim (25:10-22).
{
  const { x, n } = PLACES.ark;
  const L = 2.5, W = 1.5, H = 1.5, t = 0.08;
  const A = placed(x, n);
  add(A, box(L, t, W), MAT.gold);
  for (const s of [-1, 1]) {
    add(A, box(L, H, t), MAT.gold, 0, 0, s * (W / 2 - t / 2));
    add(A, box(t, H, W), MAT.gold, s * (L / 2 - t / 2), 0, 0);
    add(A, box(L + 0.1, 0.1, 0.06), MAT.gold, 0, H - 0.18, s * (W / 2 + 0.03));   // moulding (25:11)
    add(A, box(0.06, 0.1, W + 0.1), MAT.gold, s * (L / 2 + 0.03), H - 0.18, 0);
  }
  piece('ark', A, 'drop', 5);
  const T = placed(x, n, 0.08);
  for (const s of [-1, 1]) add(T, box(0.5, 0.85, 0.1), MAT.stone, s * 0.32, 0, 0);
  piece('tablets', T, 'drop', 4);
  // Four rings and two poles (25:12-15).
  const P = placed(x, n);
  for (const s of [-1, 1]) {
    add(P, cylX(0.06, 6), MAT.gold, 0, 0.45, s * (W / 2 + 0.14));
    for (const e of [-1, 1]) add(P, new THREE.TorusGeometry(0.12, 0.035, 6, 14).rotateY(Math.PI / 2), MAT.gold, e * 0.95, 0.45, s * (W / 2 + 0.14));
  }
  piece('poles', P, 'drop', 3);
  // The cover with two cherubim of one piece with it, facing each other,
  // wings spread upward over it (25:17-20).
  const C = placed(x, n, H);
  add(C, box(L, 0.12, W), MAT.gold);
  for (const s of [-1, 1]) {
    const K = new THREE.Group();
    K.position.set(s * 0.92, 0.12, 0);
    K.rotation.y = s < 0 ? 0 : Math.PI;     // local +X faces the middle
    C.add(K);
    add(K, new THREE.CylinderGeometry(0.13, 0.2, 0.62, 10).translate(0, 0.31, 0), MAT.gold);
    add(K, new THREE.SphereGeometry(0.13, 12, 8), MAT.gold, 0.05, 0.74, 0);
    for (const side of [-1, 1]) {
      const wing = new THREE.Group();
      wing.position.set(-0.04, 0.55, side * 0.13);
      wing.rotation.set(side * 0.35, 0, -0.75);   // up and over towards the middle
      K.add(wing);
      add(wing, box(0.03, 0.95, 0.42), MAT.gold, 0, 0, side * 0.12);
    }
  }
  piece('cover', C, 'drop', 4);
}

// The table, with its moulding, rim, rings and poles (25:23-28), and the bread.
{
  const { x, n } = PLACES.table;
  const L = 2, W = 1, H = 1.5;
  const G = placed(x, n);
  add(G, box(L, 0.08, W), MAT.gold, 0, H - 0.08, 0);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) add(G, box(0.09, H - 0.08, 0.09), MAT.gold, sx * (L / 2 - 0.1), 0, sz * (W / 2 - 0.1));
  for (const s of [-1, 1]) {
    add(G, box(L - 0.1, 0.17, 0.04), MAT.gold, 0, H - 0.3, s * (W / 2 - 0.1));   // rim a handbreadth wide
    add(G, box(0.04, 0.17, W - 0.1), MAT.gold, s * (L / 2 - 0.1), H - 0.3, 0);
    add(G, box(L + 0.04, 0.05, 0.04), MAT.gold, 0, H, s * (W / 2));               // moulding
    add(G, cylX(0.035, 3), MAT.gold, 0, 0.9, s * (W / 2 + 0.03));
  }
  piece('table', G, 'drop', 5);
  // Twelve loaves in two rows (Leviticus 24:5-6).
  for (const sx of [-1, 1]) {
    for (let k = 0; k < 6; k++) {
      const m = add(scene, new THREE.CylinderGeometry(0.3, 0.3, 0.09, 16).translate(0, 0.045, 0), MAT.bread, x + sx * 0.48, H + 0.01 + k * 0.1, -n);
      piece('bread', m, 'drop', 1.5);
    }
  }
}

// The lampstand: base, shaft, three branches each side, seven lamps (25:31-37).
// Its height isn't given. The branches spread east-west so the lamps face the table.
const lampLight = new THREE.PointLight(0xffb560, 0, 16, 1.6);
{
  const { x, n } = PLACES.lampstand;
  const top = 3.1;
  const G = placed(x, n);
  add(G, new THREE.CylinderGeometry(0.2, 0.42, 0.25, 16), MAT.gold);
  add(G, new THREE.CylinderGeometry(0.055, 0.07, top, 10).translate(0, top / 2, 0), MAT.gold);
  for (const y of [0.9, 1.5, top - 1.05, top - 0.7, top - 0.35]) add(G, new THREE.SphereGeometry(0.1, 10, 8), MAT.gold, 0, y, 0);
  const tips = [0];
  for (const r of [0.38, 0.76, 1.14]) {
    add(G, new THREE.TorusGeometry(r, 0.045, 8, 32, Math.PI).rotateZ(Math.PI), MAT.gold, 0, top, 0);
    for (const s of [-1, 1]) {
      add(G, new THREE.SphereGeometry(0.08, 10, 8), MAT.gold, s * r * 0.7, top - r * 0.7, 0);
      tips.push(s * r);
    }
  }
  for (const u of tips) add(G, new THREE.CylinderGeometry(0.11, 0.05, 0.12, 12), MAT.gold, u, top + 0.02, 0);
  piece('lampstand', G, 'drop', 5);
  for (const u of tips) piece('lamps', flame(placed(x, n), u, top + 0.08, 0), 'grow');
  lampLight.position.copy(v3(x, n + 0.6, top + 0.6));
  scene.add(lampLight);
}

// The altar of incense: a cubit square, two high, with horns and a moulding (30:1-5).
{
  const { x, n } = PLACES.incense;
  const G = placed(x, n);
  add(G, box(1, 2, 1), MAT.gold);
  for (const s of [-1, 1]) {
    add(G, box(1.06, 0.06, 0.04), MAT.gold, 0, 1.82, s * 0.52);
    add(G, box(0.04, 0.06, 1.06), MAT.gold, s * 0.52, 1.82, 0);
  }
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) add(G, box(0.13, 0.16, 0.13), MAT.gold, sx * 0.43, 2, sz * 0.43);
  piece('incense', G, 'drop', 5);
  smoke('smoke', x, n, 2.05, { count: 26, size: 0.2, rise: 7, color: 0xd8d4cc, speed: 0.1, spread: 0.6 });
}

// The altar of burnt offering: five cubits square, three high, hollow, with
// horns, a ledge, a bronze grating halfway down, rings and poles (27:1-8).
const fireLight = new THREE.PointLight(0xff8a3a, 0, 22, 1.4);
{
  const { x, n } = PLACES.altar;
  const S = 5, H = 3, t = 0.15;
  const G = placed(x, n);
  for (const s of [-1, 1]) {
    add(G, box(S, H, t), MAT.bronze, 0, 0, s * (S / 2 - t / 2));
    add(G, box(t, H, S), MAT.bronze, s * (S / 2 - t / 2), 0, 0);
    add(G, box(S + 0.24, 0.16, 0.12), MAT.bronze, 0, H / 2 - 0.1, s * (S / 2 + 0.06));   // ledge
    add(G, box(0.12, 0.16, S + 0.24), MAT.bronze, s * (S / 2 + 0.06), H / 2 - 0.1, 0);
    add(G, cylX(0.07, 7.5), MAT.wood, 0, H / 2 - 0.35, s * (S / 2 + 0.3));                // poles
    for (const e of [-1, 1]) add(G, new THREE.TorusGeometry(0.16, 0.05, 6, 14).rotateY(Math.PI / 2), MAT.bronze, e * 1.9, H / 2 - 0.35, s * (S / 2 + 0.3));
  }
  // Grating of network halfway down (27:4-5).
  const grate = add(G, box(S - 2 * t, 0.08, S - 2 * t), MAT.dark, 0, H / 2, 0);
  grate.castShadow = false;
  for (let k = -2; k <= 2; k++) {
    add(G, box(S - 2 * t, 0.1, 0.06), MAT.bronze, 0, H / 2 + 0.02, k * 0.9);
    add(G, box(0.06, 0.1, S - 2 * t), MAT.bronze, k * 0.9, H / 2 + 0.02, 0);
  }
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      add(G, new THREE.ConeGeometry(0.28, 0.5, 4).rotateY(Math.PI / 4).translate(0, 0.25, 0), MAT.bronze, sx * (S / 2 - 0.25), H, sz * (S / 2 - 0.25));
    }
  }
  piece('altar', G, 'drop', 6);
  // Wood, fire and smoke: "offered on it the burnt offering" (40:29).
  const F = placed(x, n, H / 2 + 0.1);
  for (let k = 0; k < 7; k++) {
    const log = add(F, cylX(0.16, 2.4 + rand()), MAT.char, (rand() - 0.5) * 1.6, 0.16 + (k % 3) * 0.25, (rand() - 0.5) * 2.4);
    log.rotation.y = rand() * Math.PI;
  }
  for (let k = 0; k < 9; k++) flame(F, (rand() - 0.5) * 2.4, 0.4, (rand() - 0.5) * 2.4, 1.6 + rand() * 1.4, 0.35 + rand() * 0.25);
  piece('fire', F, 'grow');
  smoke('fire', x, n, H + 0.6, { count: 30, size: 0.9, rise: 32, color: 0x8d877f, speed: 0.07, spread: 1.6 });
  fireLight.position.copy(v3(x, n, H + 1.5));
  scene.add(fireLight);
}

// The basin on its stand (30:18; 38:8). No size or shape is given.
{
  const { x, n } = PLACES.laver;
  const G = placed(x, n);
  add(G, new THREE.CylinderGeometry(0.5, 0.75, 0.3, 20), MAT.bronze);
  add(G, new THREE.CylinderGeometry(0.22, 0.32, 1.7, 16).translate(0, 0.85, 0), MAT.bronze);
  const bowl = add(G, new THREE.SphereGeometry(1, 28, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), MAT.bronze, 0, 2.35, 0);
  bowl.scale.set(1.15, 0.6, 1.15);
  bowl.material = MAT.bronze.clone();
  bowl.material.side = THREE.DoubleSide;
  piece('laver', G, 'drop', 5);
  const W = add(scene, new THREE.CircleGeometry(1.07, 28).rotateX(-Math.PI / 2), MAT.water, x, 2.22, -n);
  W.castShadow = false;
  piece('water', W, 'grow');
}

// ---------------------------------------------------------------- people
// Moses, Aaron and his sons washing at the basin (40:31). Aaron wears the robe
// of the ephod, all of blue, the ephod, the breastpiece and the turban with
// its gold plate (28:4-39); his sons wear linen tunics, sashes and caps (28:40).
function person(x, n, { robe, ephod, turban, cap, sash, head = '#d8cdb8' }) {
  const G = placed(x, n);
  const dx = PLACES.laver.x - x, dn = PLACES.laver.n - n;
  G.rotation.y = Math.atan2(dn, dx);   // local +X faces the basin
  add(G, new THREE.CylinderGeometry(0.3, 0.46, 2.9, 12).translate(0, 1.45, 0), new THREE.MeshStandardMaterial({ color: robe, roughness: 0.95 }));
  add(G, new THREE.SphereGeometry(0.3, 14, 10), MAT.plain.clone(), 0, 3.25, 0).material.color.set('#a8754f');
  if (ephod) {
    add(G, new THREE.CylinderGeometry(0.36, 0.4, 1.1, 12).translate(0, 1.6, 0), new THREE.MeshStandardMaterial({ color: '#c9a24a', roughness: 0.6, metalness: 0.3 }));
    add(G, box(0.05, 0.45, 0.45), new THREE.MeshStandardMaterial({ color: '#d4b25a', roughness: 0.5, metalness: 0.4 }), 0.36, 2.05, 0);
  }
  if (sash) add(G, new THREE.CylinderGeometry(0.39, 0.4, 0.18, 12).translate(0, 1.7, 0), new THREE.MeshStandardMaterial({ color: sash, roughness: 1 }));
  if (turban) {
    add(G, new THREE.CylinderGeometry(0.3, 0.27, 0.36, 14).translate(0, 3.42, 0), MAT.linen);
    add(G, box(0.04, 0.1, 0.24), MAT.gold, 0.3, 3.45, 0);
  } else if (cap) {
    add(G, new THREE.ConeGeometry(0.3, 0.42, 14).translate(0, 3.6, 0), MAT.linen);
  } else {
    add(G, new THREE.SphereGeometry(0.33, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: head, roughness: 1 }), 0, 3.3, 0);
  }
  piece('priests', G, 'grow');
}
{
  const { x, n } = PLACES.laver;
  person(x + 1.8, n + 1.6, { robe: '#7a5a3c', head: '#d8cdb8' });                         // Moses
  person(x + 2.0, n - 1.4, { robe: YARN[0], ephod: true, turban: true });                // Aaron
  for (const [dx, dn] of [[-1.9, 1.6], [-2.1, -1.3], [-0.6, 2.4], [-0.4, -2.4]]) {
    person(x + dx, n + dn, { robe: '#f1ece0', cap: true, sash: YARN[1] });              // his sons
  }
}

// The camp of Israel around the tabernacle (40:38): goat-hair tents. The
// tribal layout of Numbers 2 isn't modelled.
{
  const list = [];
  const r = mulberry32(12);
  const clusters = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2 + r() * 0.3;
    const d = 230 + r() * 260;
    return { x: Math.cos(a) * d, n: Math.sin(a) * d };
  });
  for (const c of clusters) {
    for (let k = 0; k < 40; k++) {
      const x = c.x + (r() - 0.5) * 140, n = c.n + (r() - 0.5) * 140;
      if (Math.hypot(x, n) < 170 || ground(x, n) > 12) continue;
      if (list.some((t) => Math.hypot(t.x - x, t.n - n) < 14)) continue;
      list.push({ x, n, w: 9 + r() * 6, d: 6 + r() * 3, h: 3 + r() * 1.5, yaw: r() * Math.PI });
    }
  }
  const geo = new THREE.CylinderGeometry(0.7, 0.7, 1, 3).rotateX(-Math.PI / 2).rotateY(Math.PI / 2).translate(0, 0.35, 0);
  const tents = new THREE.InstancedMesh(geo, MAT.plain, list.length);
  const cols = ['#2f2722', '#3d3129', '#4a3d33', '#5b4a3c', '#2a2420'].map((h) => new THREE.Color(h));
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), p = new THREE.Vector3(), s = new THREE.Vector3();
  list.forEach((t, i) => {
    q.setFromAxisAngle(UP, t.yaw);
    tents.setMatrixAt(i, m.compose(p.set(t.x, ground(t.x, t.n) - 0.2, -t.n), q, s.set(t.w, t.h, t.d)));
    tents.setColorAt(i, cols[i % cols.length]);
  });
  tents.castShadow = tents.receiveShadow = true;
  scene.add(tents);
}

// ---------------------------------------------------------------- court
// Sixty pillars at five-cubit spacing round a 100 x 50 court (27:9-18), on
// bronze bases, with silver hooks, bands and capitals (27:17; 38:17), held by
// bronze pegs and cords (27:19; 35:18). Order: from the gate, round by the north.
{
  const ring = [];
  const { west: W, east: E, half: H } = COURT;
  for (let n = COURT.gate; n < H; n += 5) ring.push([E, n]);
  for (let x = E; x > W; x -= 5) ring.push([x, H]);
  for (let n = H; n > -H; n -= 5) ring.push([W, n]);
  for (let x = W; x < E; x += 5) ring.push([x, -H]);
  for (let n = -H; n < COURT.gate; n += 5) ring.push([E, n]);
  const Hh = COURT.height;
  const outward = (x, n) => {
    const ox = x >= E ? 1 : x <= W ? -1 : 0, on = n >= H ? 1 : n <= -H ? -1 : 0;
    const l = Math.hypot(ox, on);
    return [ox / l, on / l];
  };
  for (const [x, n] of ring) {
    const G = placed(x, n);
    add(G, box(0.6, 0.5, 0.6), MAT.bronze);
    add(G, new THREE.CylinderGeometry(0.17, 0.19, Hh, 10).translate(0, Hh / 2, 0), MAT.wood, 0, 0.1, 0);
    add(G, new THREE.CylinderGeometry(0.24, 0.2, 0.3, 10), MAT.silver, 0, Hh, 0);
    add(G, new THREE.CylinderGeometry(0.2, 0.2, 0.12, 10), MAT.silver, 0, Hh - 0.6, 0);
    const [ox, on] = outward(x, n);
    const a = new THREE.Vector3(0, Hh - 0.3, 0), b = new THREE.Vector3(ox * 3, 0.15, -on * 3);
    const cord = add(G, new THREE.CylinderGeometry(0.025, 0.025, a.distanceTo(b), 4), MAT.cord);
    cord.position.copy(a).add(b).multiplyScalar(0.5);
    cord.quaternion.setFromUnitVectors(UP, b.clone().sub(a).normalize());
    add(G, box(0.12, 0.35, 0.12), MAT.bronze, b.x, 0, b.z);
    piece('courtPillars', G, 'drop', 5);
  }
  // Linen hangings between the pillars, everywhere but the gate.
  ring.forEach(([x, n], i) => {
    const [x2, n2] = ring[(i + 1) % ring.length];
    if (x === E && x2 === E && Math.max(Math.abs(n), Math.abs(n2)) <= COURT.gate) return;
    const along = x2 !== x;
    const [ox, on] = outward((x + x2) / 2, (n + n2) / 2);
    const m = add(scene, along ? box(5, Hh - 0.35, 0.06, 5) : box(0.06, Hh - 0.35, 5, 5), MAT.linen,
      (x + x2) / 2 + ox * 0.22, 0.2, -((n + n2) / 2 + on * 0.22));
    piece('hangings', m, 'lower', 6);
  });
  // The gate curtain, twenty cubits, embroidered (27:16).
  const g = add(scene, box(0.08, Hh - 0.35, COURT.gate * 2), MAT.screen, E + 0.24, 0.2, 0);
  piece('gate', g, 'lower', 6);
}

// The cloud and the glory (40:34-38): shown in the finale.
const cloud = new THREE.Group();
const gloryLight = new THREE.PointLight(0xffe2a0, 0, 60, 1.2);
{
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x6d6658, roughness: 1, transparent: true, opacity: 0.93 });
  const r = mulberry32(40);
  for (let k = 0; k < 70; k++) {
    const y = 13 + r() ** 0.8 * 70;
    const spread = 9 + (y - 13) * 0.12;
    const m = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 2), mat);
    const a = r() * Math.PI * 2, d = r() * spread;
    m.position.set(Math.cos(a) * d * 1.5, y, Math.sin(a) * d * 0.7);
    m.scale.setScalar(5 + r() * 6);
    cloud.add(m);
  }
  cloud.position.copy(v3((TENT.west + TENT.east) / 2, 0, 0));
  cloud.visible = false;
  scene.add(cloud);
  gloryLight.position.copy(v3((TENT.west + TENT.east) / 2, 0, 6));
  scene.add(gloryLight);
}

// Everything up to (not including) stop i is built; the rest is not.
function applyStatic(i) {
  stops.forEach((st, j) => st.build.forEach((k) => setGroup(k, j < i ? 1 : 0)));
}

// ---------------------------------------------------------------- labels
const labels = [];
function makeLabel(text, kind, pos, keys, group, inside) {
  const el = document.createElement('div');
  el.className = `label ${kind}`;
  el.textContent = tr(text);
  const obj = new CSS2DObject(el);
  obj.position.copy(pos);
  scene.add(obj);
  labels.push({ el, obj, kind, keys, group, inside, text, opacity: -1 });
}
const insideTent = (x, n) => x < TENT.east - 0.5 && x > TENT.west && Math.abs(n) < TENT.half;
for (const [k, f] of Object.entries(FEATURES)) {
  makeLabel(f.name, f.kind, v3(f.x, f.n, ground(f.x, f.n) + f.lift), [`feature:${k}`], f.group, f.kind === 'item' && insideTent(f.x, f.n));
}

function updateLabels(activeKeys, cut) {
  const overview = tour.phase === 'intro' || tour.phase === 'finale';
  const far = camera.position.distanceTo(OVERVIEW_C);
  for (const lb of labels) {
    const d = camera.position.distanceTo(lb.obj.position);
    let o = 1;
    if (lb.kind === 'item') o = overview ? 0 : clamp01((70 - d) / 30);
    else if (lb.kind === 'feature') o = overview ? 0 : clamp01((90 - d) / 40);
    else o = clamp01((far - 80) / 60);
    if (lb.inside && !overview && cut < 0.5) o = 0;
    const active = lb.keys.some((k) => activeKeys.has(k));
    if (active) o = 1;
    if (lb.group && groupP(lb.group) < 0.9) o = 0;
    o = Math.round(o * 20) / 20;
    if (o !== lb.opacity) { lb.el.style.opacity = o; lb.opacity = o; }
    lb.el.classList.toggle('active', active);
  }
}

// ---------------------------------------------------------------- tour
const stops = STOPS.map((st, i) => {
  const look = v3(st.look.x, st.look.n, st.look.y);
  const pos = v3(st.cam.x, st.cam.n, st.cam.y);
  const activeKeys = new Set(Object.entries(FEATURES).filter(([, f]) => st.build.includes(f.group)).map(([k]) => `feature:${k}`));
  return { ...st, i, look, pos, activeKeys };
});

function overviewPos(a) {
  return new THREE.Vector3(OVERVIEW_C.x + Math.cos(a) * 165, 52, OVERVIEW_C.z + Math.sin(a) * 165);
}

const view = { pos: overviewPos(NORTH_EAST), look: OVERVIEW_C.clone() };
const tour = {
  phase: 'intro',     // intro | fly | hold | finale
  i: -1,
  playing: false,
  speed: 1,
  holdT: 0, holdDur: 10,
  holdScale: HOLD_SCALE,
  orbitA: NORTH_EAST,
  introT: 0,
  detached: false,
  explore: false,
  cut: 0,             // cutaway amount, eased towards the current stop's
  glory: 0,           // the cloud, eased in for the finale
};
let fly = null;

function wordCount(st) { return `${tr(st.quote)} ${tr(st.note)}`.split(/\s+/).length; }

function startFly(toIndex) {
  const to = stops[toIndex];
  const from = tour.i >= 0 ? stops[tour.i] : null;
  const sequential = from && toIndex === tour.i + 1 && !tour.detached;
  if (!sequential) applyStatic(toIndex);
  const fromPos = view.pos.clone(), fromLook = view.look.clone();
  const d = fromPos.distanceTo(to.pos);
  const dur = sequential ? Math.min(10, Math.max(6.5, d / 7)) : Math.min(7.5, Math.max(4.5, d / 40));
  fly = { t: 0, dur, d, fromPos, fromLook, to, build: to.build, done: () => arrive(toIndex) };
  tour.i = toIndex;
  tour.phase = 'fly';
  tour.detached = false;
  // With no pause, the last stop's text stays up through the next flight.
  if (tour.holdScale > 0 || !sequential) hidePopup();
  showNext(to);
  updateProgress();
}

function flyToOverview(then, look = OVERVIEW_C) {
  const to = { pos: overviewPos(tour.orbitA), look: look.clone() };
  fly = { t: 0, dur: 6, d: view.pos.distanceTo(to.pos), fromPos: view.pos.clone(), fromLook: view.look.clone(), to, build: null, done: then };
  tour.phase = 'fly';
  hidePopup();
}

function stepFly(dt) {
  fly.t += dt / fly.dur;
  const u = clamp01(fly.t);
  const e = easeArrive(u);
  // Rise over the tent between stops, and back for a wider view on long hops.
  const arc = Math.min(40, 4 + fly.d * 0.3) * Math.sin(Math.PI * u);
  view.pos.lerpVectors(fly.fromPos, fly.to.pos, e).y += arc;
  view.look.lerpVectors(fly.fromLook, fly.to.look, easeInOut(clamp01(u * 1.15)));
  if (fly.build) {
    const p = smooth(clamp01(u * 1.1 - 0.05));
    const G = fly.build.length;
    fly.build.forEach((k, i) => setGroup(k, clamp01(p * G - i)));
  }
  if (u >= 1) {
    const done = fly.done;
    if (fly.build) fly.build.forEach((k) => setGroup(k, 1));
    fly = null;
    done();
  }
}

function holdFor(st) {
  return Math.min(16, Math.max(8, 4 + wordCount(st) * 0.13)) * tour.holdScale;
}

function arrive(i) {
  const st = stops[i];
  tour.phase = 'hold';
  tour.holdT = 0;
  tour.holdDur = holdFor(st);
  hideNext();
  showPopup(st);
}

function finish() {
  tour.i = stops.length;
  applyStatic(stops.length);
  flyToOverview(() => {
    tour.phase = 'finale';
    showCard(FINALE, true);
  }, FINALE_LOOK);
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
  applyStatic(0);
  tour.i = -1;
  tour.detached = true;
  setPlaying(true);
  startFly(0);
}

function update(dt) {
  const t = dt * tour.speed;
  // Cutaway and cloud ease towards where the tour is.
  const inTour = tour.phase === 'hold' || tour.phase === 'fly';
  if (!tour.explore) {
    const wantCut = inTour && stops[tour.i]?.cutaway ? 1 : 0;
    tour.cut = lerp(tour.cut, wantCut, 1 - Math.exp(-dt * 2.2));
    tour.glory = lerp(tour.glory, tour.phase === 'finale' ? 1 : 0, 1 - Math.exp(-dt * (tour.phase === 'finale' ? 0.7 : 3)));
  }
  if (tour.explore) return;
  if (tour.phase === 'intro') {
    tour.introT += dt;
    tour.orbitA = NORTH_EAST + 0.15 * Math.sin(tour.introT * 0.12);
  } else if (tour.phase === 'finale') tour.orbitA += dt * 0.03;
  if ((tour.phase === 'intro' || tour.phase === 'finale') && !fly) {
    view.pos.copy(overviewPos(tour.orbitA));
    view.look.copy(tour.phase === 'finale' ? FINALE_LOOK : OVERVIEW_C);
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
    if (tour.playing && tour.holdT >= tour.holdDur) {
      if (tour.i >= stops.length - 1) finish();
      else startFly(tour.i + 1);
    }
  }
}

// Fades the coverings and the south wall, so the furniture can be seen.
let cutShown = -1;
function applyCut(cut) {
  const c = Math.round(cut * 50) / 50;
  if (c === cutShown) return;
  const was = cutShown > 0;
  cutShown = c;
  for (const m of [...COVER_MATS, MAT.goldSouth]) {
    m.transparent = c > 0;
    m.depthWrite = c === 0;
    m.opacity = lerp(1, m === MAT.goldSouth ? 0.05 : 0.04, c);
    if (was !== c > 0) m.needsUpdate = true;
  }
  for (const m of coverMeshes) m.castShadow = c < 0.5;
  for (const m of southMeshes) m.castShadow = c < 0.5;
}

// Flames flicker; smoke rises; the cloud settles.
function updateEffects(time) {
  for (const f of flames) {
    if (!f.mesh.parent.visible) continue;
    const k = time * 9 + f.phase;
    f.mesh.scale.set(0.85 + 0.15 * Math.sin(k * 1.3), 0.8 + 0.35 * Math.abs(Math.sin(k)), 0.85 + 0.15 * Math.cos(k * 1.1));
  }
  for (const s of smokes) {
    const amt = groupP(s.key);
    for (const p of s.puffs) {
      p.m.visible = amt > 0.01;
      if (!p.m.visible) continue;
      const t = (time * s.speed + p.phase) % 1;
      const sway = Math.sin(time * 0.6 + p.drift) * s.spread * t;
      p.m.position.copy(s.origin).add(_tmp.set(Math.cos(p.drift) * sway + t * s.spread, t * s.rise, Math.sin(p.drift) * sway));
      p.m.scale.setScalar(s.size * (0.4 + t * 2.4));
      p.m.material.opacity = amt * 0.5 * Math.sin(Math.PI * t);
    }
  }
  lampLight.intensity = groupP('lamps') * 2.5;
  fireLight.intensity = groupP('fire') * (14 + 3 * Math.sin(time * 11));
  const g = tour.glory;
  cloud.visible = g > 0.01;
  if (cloud.visible) {
    cloud.position.y = (1 - smooth(g)) * 60;
    cloud.rotation.y = time * 0.02;
    cloud.scale.setScalar(0.6 + 0.4 * smooth(g));
  }
  gloryLight.intensity = g * 40;
}
const _tmp = new THREE.Vector3();

// ---------------------------------------------------------------- explore mode
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI * 0.48;
controls.minDistance = 2;
controls.maxDistance = 2500;

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
        t: 0, dur: 2.5, d: view.pos.distanceTo(st.pos), fromPos: view.pos.clone(), fromLook: view.look.clone(),
        to: st, build: null, done: () => { tour.phase = 'hold'; if (resume === 'fly') tour.holdT = 0; },
      };
      if (resume === 'fly') { applyStatic(st.i + 1); tour.detached = true; }
    } else {
      const phase = tour.phase;
      flyToOverview(() => { tour.phase = phase; }, phase === 'finale' ? FINALE_LOOK : OVERVIEW_C);
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
};
const timerBar = document.createElement('i');

const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);

function showPopup(st) {
  const chips = `<ul class="chips" aria-label="What the text says it is made of">
      ${Object.entries(MATERIALS)
        .map(([k, t]) => {
          const yes = st.materials.includes(k);
          return `<li class="${yes ? 'yes' : 'no'}" title="${yes ? 'Named in the text' : 'Not used here'}">${esc(tr(t))}</li>`;
        }).join('')}
    </ul>`;
  ui.popup.innerHTML = `
    <div class="kicker">Stop ${st.i + 1} of ${stops.length} · Exodus ${st.ref} (${VERSIONS[version].abbr})</div>
    <h2>${esc(tr(st.title))}</h2>
    <blockquote>${esc(tr(st.quote))}</blockquote>
    <p>${esc(tr(st.note))}</p>
    ${chips}
    ${st.size ? `<div class="facts"><span>Size</span> ${esc(tr(st.size))}</div>` : ''}
    ${st.made ? `<div class="facts"><span>Made by</span> ${esc(tr(st.made))}</div>` : ''}
    <div class="timer"></div>`;
  ui.popup.querySelector('.timer').appendChild(timerBar);
  timerBar.style.transform = 'scaleX(0)';
  ui.popup.classList.add('show');
}
function hidePopup() { ui.popup.classList.remove('show'); }
function showNext(st) {
  ui.nextChip.innerHTML = `<span>Next</span> ${esc(tr(st.title))} <em>${esc(st.ref)}</em>`;
  ui.nextChip.classList.add('show');
}
function hideNext() { ui.nextChip.classList.remove('show'); }

// The version's copyright notice, with the publisher's link where its terms require one.
function noticeHTML() {
  const { notice, link } = VERSIONS[version];
  return esc(notice) + (link ? ` <a href="${link}" target="_blank" rel="noopener">${esc(link.replace(/^https:\/\/|\/$/g, ''))}</a>` : '');
}
let cardShown = null;
function showCard(c, finale) {
  cardShown = { c, finale };
  ui.card.innerHTML = `
    <div class="kicker">${esc(c.ref)} (${VERSIONS[version].abbr})</div>
    <h1>${esc(tr(c.title))}</h1>
    <blockquote>${esc(tr(c.quote))}</blockquote>
    <p>${esc(tr(c.note))}</p>
    ${c.aside ? `<p class="aside">${esc(tr(c.aside))}</p>` : ''}
    <div class="actions">
      <button class="primary" data-act="begin">${finale ? 'Replay the tour' : 'Begin the tour'}</button>
      <button data-act="explore">Explore freely</button>
    </div>
    <p class="credits">${noticeHTML()}</p>`;
  ui.card.classList.toggle('low', finale);
  ui.card.classList.add('show');
  ui.card.querySelector('[data-act=begin]').onclick = begin;
  ui.card.querySelector('[data-act=explore]').onclick = () => { hideCard(); setExplore(true); };
}
function hideCard() { ui.card.classList.remove('show'); }

function setPlaying(on) {
  tour.playing = on;
  ui.play.classList.toggle('paused', !on);
  ui.play.setAttribute('aria-label', on ? 'Pause' : 'Play');
  ui.play.title = on ? 'Pause (Space)' : 'Play (Space)';
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
    b.setAttribute('aria-label', `Go to stop ${i + 1}: ${tr(st.title)}`);
  });
}
titleProgress();

for (const [k, v] of Object.entries(VERSIONS)) ui.version.add(new Option(v.abbr, k));
// Re-renders every piece of text on screen in the chosen version.
function setVersion(v) {
  version = v;
  ui.version.value = v;
  ui.version.title = VERSIONS[v].name;
  ui.credit.textContent = `Scripture: ${VERSIONS[v].abbr}`;
  ui.credit.title = VERSIONS[v].notice;
  try { localStorage.setItem('bibleVersion', v); } catch {}
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
ui.version.onchange = () => setVersion(ui.version.value);
ui.pause.onchange = () => {
  tour.holdScale = Number(ui.pause.value);
  if (tour.phase === 'hold') tour.holdDur = holdFor(stops[tour.i]);
};
addEventListener('keydown', (e) => {
  if (e.target.closest('select')) return;
  if (e.code === 'Space') { e.preventDefault(); ui.play.click(); }
  else if (e.code === 'ArrowRight') next();
  else if (e.code === 'ArrowLeft') prev();
  else if (e.key === 'e' || e.key === 'E') ui.explore.click();
});

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  labelRenderer.setSize(innerWidth, innerHeight);
});

// ---------------------------------------------------------------- loop
applyStatic(0);
setVersion(version);
showCard(INTRO, false);
setPlaying(false);

const clock = new THREE.Clock();
const noKeys = new Set();
let viewShift = 0;   // shifts the frame right so the popup doesn't cover the subject
let time = 0;
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05);
  time += dt;
  update(dt);
  applyCut(tour.cut);
  updateEffects(time);
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
  const inTour = tour.phase === 'hold' || tour.phase === 'fly';
  updateLabels(inTour ? stops[tour.i]?.activeKeys ?? noKeys : noKeys, tour.cut);
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
});

// Handy for debugging from the console.
window.__tour = {
  tour, stops, jump, next, applyStatic, view, groups,
  advance(sec) { for (let t = 0; t < sec; t += 0.05) update(0.05); },
};
