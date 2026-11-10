import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ground, noise2 } from './terrain.js';
import * as DATA from './data.js';
import {
  VERSIONS, current, chooseVersion, setVersion as useVersion, remember, pick, t,
  localizeDOM, fillVersionSelect, noticeHTML, feedbackHTML, loadLanguages,
} from '../i18n.js';
import { createNarrator, titleLine, verseLine } from '../narrator.js';
import { track } from '../analytics.js';
import { openShare } from '../share.js';
import { popupLift } from '../popup.js';

const { TERMS, ATONE, WEARING, LABELS, CAMP, STONES, NAMES_HE, HOLY_HE, STOPS, INTRO, FINALE } = DATA;
await loadLanguages(DATA, import.meta.url);

// ---------------------------------------------------------------- constants
// One world unit is one cubit; the tent, court and furniture stand where they
// do in the Tabernacle animation.
const TENT = { west: -30, east: 0, half: 5, height: 10, veil: -20 };
const COURT = { west: -50, east: 50, half: 25, height: 5, gate: 10 };
const BT = 0.75;                 // board thickness (not given in the text)
const OUT_N = TENT.half + BT;
const OUT_W = TENT.west - BT;
const DOOR_PILLARS = [-4.75, -2.375, 0, 2.375, 4.75];
const VEIL_PILLARS = [-3.75, -1.25, 1.25, 3.75];
const LAVER = { x: 12, n: 0 };
const ALTAR = { x: 25, n: 0 };
const ARK = { x: -25, n: 0 };
const TABLE = { x: -10, n: 3 };
const LAMPSTAND = { x: -10, n: -3 };
const INCENSE = { x: -17.5, n: 0 };
const PYRE = { x: 330, n: -110 };             // outside the camp (16:27); the place is a guess
const OVERVIEW_C = new THREE.Vector3(-2, 0, 0);
const FINALE_C = new THREE.Vector3(8, 2, 0);
const HOLD_SCALE = 0.5;  // default pause at each stop, relative to the reading-time estimate
const SOUTH_EAST = 0.55; // overview angle: from the south-east
const DEPTH = 0.68;      // bodies and garments are lathes, squashed front to back by this much
const WALK_UNIT = 9;     // cubits of walking that take as long as one step of the rite
const SEC_PER_UNIT = 1.1;
const FOLLOW = { x: 4, n: -15, y: 9 };   // the camera's offset from someone walking

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
// Steady speed with a short start and stop (`a` of the time at each end, or only the start).
function walkEase(t, a = 0.12, stop = true) {
  if (t < a) return (t * t) / (2 * a * (1 - (stop ? a : a / 2)));
  if (stop && t > 1 - a) return 1 - ((1 - t) * (1 - t)) / (2 * a * (1 - a));
  return (t - a / 2) / (1 - (stop ? a : a / 2));
}
const v3 = (x, n, y) => new THREE.Vector3(x, y, -n);
const plan = (p) => new THREE.Vector3(p.x, 0, -p.n);
const P = (x, n) => ({ x, n });
const yawTo = (a, b) => Math.atan2(b.n - a.n, b.x - a.x);
const lerpAngle = (a, b, k) => a + Math.atan2(Math.sin(b - a), Math.cos(b - a)) * k;
// Distance in plan from (x, n) to a polyline of plan points.
function distToPath(x, n, pts) {
  let best = Infinity;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i];
    const dx = b.x - a.x, dn = b.n - a.n;
    const k = clamp01(((x - a.x) * dx + (n - a.n) * dn) / (dx * dx + dn * dn));
    best = Math.min(best, Math.hypot(x - a.x - dx * k, n - a.n - dn * k));
  }
  return best;
}

// Bible version: text fields in data.js are strings or { [version]: string, default }
// (lang/*.js add the other languages), and may contain {term} placeholders filled from TERMS.
useVersion(chooseVersion());
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
// A soft environment so the gold reads as metal and the stones catch the light.
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.6;

const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.05, 9000);

scene.add(new THREE.HemisphereLight(0xdfeaff, 0xc4a77a, 1.15));
// Morning sun from the south-east.
const sun = new THREE.DirectionalLight(0xfff0d4, 2.6);
sun.position.set(150, 210, 110);
sun.target.position.set(0, 0, 0);
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
Object.assign(sun.shadow.camera, { left: -45, right: 45, top: 45, bottom: -45, near: 120, far: 420 });
sun.shadow.bias = -0.0002;
sun.shadow.normalBias = 0.02;
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
const HEBREW = '"Noto Serif Hebrew", "SBL Hebrew", "Ezra SIL", "Times New Roman", serif';

function canvasTexture(w, draw, h = w) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
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
// Text cut into a surface: a dark stroke with a light edge below it.
function engrave(g, text, x, y, size, dark, light) {
  g.font = `700 ${size}px ${HEBREW}`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.direction = 'rtl';
  g.fillStyle = light;
  g.fillText(text, x, y + size * 0.05);
  g.fillStyle = dark;
  g.fillText(text, x, y);
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
  }
  g.fillStyle = body;
  g.beginPath();
  g.ellipse(cx, cy + 40 * k, 15 * k, 42 * k, 0, 0, Math.PI * 2);
  g.fill();
  g.beginPath();
  g.arc(cx, cy - 12 * k, 13 * k, 0, Math.PI * 2);
  g.fill();
}

const TEX = {
  // The doorway curtain: embroidered, no cherubim (26:36). Mapped once.
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
  // The veil: coloured yarn and linen with cherubim (26:31). Mapped once.
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
  // The linen curtains that make the ceiling, worked with cherubim (26:1). One tile = 4 cubits.
  curtain: canvasTexture(256, (g, s) => {
    weave(g, s, '#efe6d2');
    YARN.forEach((c, i) => { g.fillStyle = c; g.fillRect(0, 4 + i * 6, s, 5); g.fillRect(0, s - 22 + i * 6, s, 5); });
    cherub(g, s / 2, s / 2 - 6, 0.95, YARN[2], YARN[0]);
    cherub(g, 0, s / 2 - 6, 0.6, YARN[1], YARN[0]);
    cherub(g, s, s / 2 - 6, 0.6, YARN[1], YARN[0]);
  }),
  // Plain fine linen for the court hangings. One tile = 5 cubits.
  linen: canvasTexture(128, (g, s) => {
    weave(g, s, '#f4efe2');
    g.fillStyle = 'rgba(120,100,70,0.12)';
    g.fillRect(0, 0, s, 3);
  }),
  // Gold-covered boards, a cubit and a half wide. One tile = 1.5 cubits.
  boards: canvasTexture(64, (g, s) => {
    g.fillStyle = '#ffffff';
    g.fillRect(0, 0, s, s);
    g.fillStyle = '#8a6a30';
    g.fillRect(0, 0, 2, s);
  }),
  // "A tunic of checkered work" of fine linen (Exodus 28:39).
  tunic: canvasTexture(64, (g, s) => {
    weave(g, s, '#f2ede1');
    for (let y = 0; y < s; y += 8) for (let x = (y / 8) % 2 ? 8 : 0; x < s; x += 16) { g.fillStyle = 'rgba(150,130,100,0.18)'; g.fillRect(x, y, 8, 8); }
  }),
  // Plain linen: the garments of this day (16:4), the undergarments and the turban.
  plainLinen: canvasTexture(64, (g, s) => weave(g, s, '#f6f2e8')),
  // The robe, "all of blue" (28:31), woven.
  robe: canvasTexture(64, (g, s) => {
    weave(g, s, '#36428f');
    for (let i = 0; i < 300; i++) { g.fillStyle = `rgba(20,20,60,${rand() * 0.25})`; g.fillRect(rand() * s, rand() * s, 2, 1); }
  }),
  // Ephod, band and breastpiece: gold, blue, purple, scarlet and fine linen (28:6, 8, 15).
  ephod: canvasTexture(128, (g, s) => {
    weave(g, s, '#d4a640');
    for (let y = 0; y < s; y += 16) {
      YARN.forEach((c, i) => { g.fillStyle = c; g.fillRect(0, y + 3 + i * 3, s, 2); });
      g.fillStyle = 'rgba(244,236,214,0.8)';
      g.fillRect(0, y + 13, s, 1);
    }
    for (let i = 0; i < 700; i++) { g.fillStyle = `rgba(255,226,130,${0.3 + rand() * 0.5})`; g.fillRect(rand() * s, rand() * s, 3, 1); }
  }),
  // Sash: fine linen with blue, purple and scarlet, embroidered (39:29).
  sash: canvasTexture(64, (g, s) => {
    weave(g, s, '#efe6d2');
    YARN.forEach((c, i) => { g.fillStyle = c; g.fillRect(0, i * 21 + 2, s, 9); });
    for (let x = 4; x < s; x += 10) { g.fillStyle = '#efe6d2'; g.fillRect(x, 13, 3, 3); g.fillRect(x + 5, 34, 3, 3); }
  }),
  // The plate: "Holy to the LORD", engraved like a seal (28:36).
  plate: canvasTexture(320, (g, w, h) => {
    const grad = g.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#f7d77c'); grad.addColorStop(0.5, '#d9a93c'); grad.addColorStop(1, '#a87a22');
    g.fillStyle = grad;
    g.fillRect(0, 0, w, h);
    g.strokeStyle = 'rgba(110,70,10,0.6)';
    g.lineWidth = 3;
    g.strokeRect(6, 6, w - 12, h - 12);
    engrave(g, HOLY_HE, w / 2, h / 2 + 2, 62, 'rgba(85,52,8,0.9)', 'rgba(255,240,190,0.7)');
  }, 112),
};
TEX.tunic.repeat.set(5, 7);
TEX.plainLinen.repeat.set(4, 4);
TEX.robe.repeat.set(6, 6);
TEX.ephod.repeat.set(3, 3);
TEX.sash.repeat.set(5, 1);
TEX.plate.wrapS = TEX.plate.wrapT = THREE.ClampToEdgeWrapping;

// An onyx stone for a shoulder, with six names in order of birth (28:9-10).
// Drawn upside down: the stone's face is mapped from a cylinder's cap, which
// turns it round.
function onyxTexture(names) {
  return canvasTexture(256, (g, s) => {
    g.translate(s, s); g.rotate(Math.PI);
    const grad = g.createRadialGradient(s * 0.4, s * 0.35, 10, s / 2, s / 2, s / 2);
    grad.addColorStop(0, '#3a3532'); grad.addColorStop(1, '#141210');
    g.fillStyle = grad;
    g.fillRect(0, 0, s, s);
    g.strokeStyle = 'rgba(230,225,215,0.18)';
    for (let k = 0; k < 5; k++) { g.lineWidth = 3 + k; g.beginPath(); g.ellipse(s / 2, s / 2, 60 + k * 18, 44 + k * 14, 0.3, 0, Math.PI * 2); g.stroke(); }
    names.forEach((nm, i) => engrave(g, nm, i % 2 ? s * 0.32 : s * 0.68, s * (0.33 + 0.17 * Math.floor(i / 2)), 34, 'rgba(235,228,212,0.9)', 'rgba(0,0,0,0.6)'));
  });
}
// A breastpiece stone engraved with one name (28:21).
function stoneTexture(color, name) {
  return canvasTexture(128, (g, s) => {
    g.translate(s, s); g.rotate(Math.PI);
    const c = new THREE.Color(color);
    const grad = g.createRadialGradient(s * 0.38, s * 0.35, 4, s / 2, s / 2, s / 2);
    grad.addColorStop(0, `#${c.clone().lerp(new THREE.Color('#ffffff'), 0.45).getHexString()}`);
    grad.addColorStop(0.6, color);
    grad.addColorStop(1, `#${c.clone().multiplyScalar(0.55).getHexString()}`);
    g.fillStyle = grad;
    g.fillRect(0, 0, s, s);
    const light = c.r * 0.3 + c.g * 0.59 + c.b * 0.11 > 0.6;
    engrave(g, name, s / 2, s / 2, 32, light ? 'rgba(60,50,40,0.75)' : 'rgba(255,250,240,0.8)', light ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.45)');
  });
}

const MAT = {
  gold: new THREE.MeshStandardMaterial({ color: 0xe0ad3c, metalness: 0.85, roughness: 0.3 }),
  boards: new THREE.MeshStandardMaterial({ color: 0xe0ad3c, map: TEX.boards, metalness: 0.85, roughness: 0.3 }),
  bronze: new THREE.MeshStandardMaterial({ color: 0xb5773d, metalness: 0.8, roughness: 0.38 }),
  silver: new THREE.MeshStandardMaterial({ color: 0xdcdce2, metalness: 0.85, roughness: 0.28 }),
  wood: new THREE.MeshStandardMaterial({ color: 0x9c6c3e, roughness: 0.8 }),
  screen: new THREE.MeshStandardMaterial({ map: TEX.screen, roughness: 1 }),
  veil: new THREE.MeshStandardMaterial({ map: TEX.veil, roughness: 1 }),
  curtain: new THREE.MeshStandardMaterial({ map: TEX.curtain, roughness: 1 }),
  linen: new THREE.MeshStandardMaterial({ map: TEX.linen, roughness: 1 }),
  goat: new THREE.MeshStandardMaterial({ color: 0x3d322b, roughness: 1 }),
  rams: new THREE.MeshStandardMaterial({ color: 0x9a3a28, roughness: 0.9 }),
  outer: new THREE.MeshStandardMaterial({ color: 0x8c7b64, roughness: 0.95 }),
  bread: new THREE.MeshStandardMaterial({ color: 0xd9ac6c, roughness: 0.9 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x241c15, roughness: 1 }),
  char: new THREE.MeshStandardMaterial({ color: 0x2a1f18, roughness: 1, emissive: 0x5a1a04, emissiveIntensity: 0.6 }),
  water: new THREE.MeshStandardMaterial({ color: 0x5aa0b8, roughness: 0.1, metalness: 0.2, emissive: 0x0b2a3a }),
  // Flames shade by height (vertex colours): a pale core inside an orange tongue.
  flame: new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.88, depthWrite: false, toneMapped: false, side: THREE.DoubleSide }),
  flameCore: new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false }),
  blood: new THREE.MeshStandardMaterial({ color: 0x6a1010, roughness: 0.35, metalness: 0.05 }),
  coals: new THREE.MeshStandardMaterial({ color: 0x4a1a08, emissive: 0xff5a14, emissiveIntensity: 1.4, roughness: 0.9 }),
  incense: new THREE.MeshStandardMaterial({ color: 0xc89a5c, roughness: 1 }),
  lot: new THREE.MeshStandardMaterial({ color: 0xd8d0c0, roughness: 0.7 }),
  hoof: new THREE.MeshStandardMaterial({ color: 0x1e1a16, roughness: 0.6 }),
  // Garments (Exodus 28).
  tunic: new THREE.MeshStandardMaterial({ map: TEX.tunic, roughness: 1, side: THREE.DoubleSide }),
  plainLinen: new THREE.MeshStandardMaterial({ map: TEX.plainLinen, roughness: 1, side: THREE.DoubleSide }),
  robe: new THREE.MeshStandardMaterial({ map: TEX.robe, roughness: 0.9, side: THREE.DoubleSide }),
  ephod: new THREE.MeshStandardMaterial({ map: TEX.ephod, roughness: 0.55, metalness: 0.3, side: THREE.DoubleSide }),
  sash: new THREE.MeshStandardMaterial({ map: TEX.sash, roughness: 1, side: THREE.DoubleSide }),
  plate: new THREE.MeshStandardMaterial({ map: TEX.plate, metalness: 0.75, roughness: 0.28, side: THREE.DoubleSide }),
  onyx: new THREE.MeshStandardMaterial({ color: 0x1e1b19, roughness: 0.15, metalness: 0.1 }),
  urim: new THREE.MeshStandardMaterial({ color: 0xd6cfc0, roughness: 0.6 }),
  yarn: YARN.map((c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.8 })),
  // People.
  eye: new THREE.MeshStandardMaterial({ color: 0x1a120c, roughness: 0.25 }),
  eyeWhite: new THREE.MeshStandardMaterial({ color: 0xe4dccd, roughness: 0.35 }),
  plainTunic: new THREE.MeshStandardMaterial({ color: 0xd9ccb0, roughness: 1, side: THREE.DoubleSide }),
  cloak: new THREE.MeshStandardMaterial({ color: 0x7a5a3c, roughness: 1, side: THREE.DoubleSide }),
  headCloth: new THREE.MeshStandardMaterial({ color: 0xe6dcc6, roughness: 1, side: THREE.DoubleSide }),
  plain: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95 }),
};
const hairMats = {};
const hairMat = (c) => (hairMats[c] ??= new THREE.MeshStandardMaterial({ color: c, roughness: 1, side: THREE.DoubleSide }));

// The south wall and the coverings get their own materials, so they can fade
// for the views inside the tent.
MAT.boardsSouth = MAT.boards.clone();
MAT.goldSouth = MAT.gold.clone();
MAT.silverSouth = MAT.silver.clone();
const COVER_MATS = [MAT.curtain, MAT.goat, MAT.rams, MAT.outer];
const coverMeshes = [], southMeshes = [];

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
const lathe = (pts, seg = 32, phi0 = 0, phiLen = Math.PI * 2) => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), seg, phi0, phiLen);
// A rod from a to b (local vectors).
function rod(parent, a, b, r, mat, seg = 6) {
  const m = add(parent, new THREE.CylinderGeometry(r, r, a.distanceTo(b), seg), mat);
  m.position.copy(a).add(b).multiplyScalar(0.5);
  m.quaternion.setFromUnitVectors(UP, b.clone().sub(a).normalize());
  return m;
}
// A tube through local points.
const tubeThrough = (pts, r, seg = 24) => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p))), seg, r, 6);
// A unit rod along +Y, stretched between two points each frame (ropes, water).
function stretch(m, a, b) {
  const d = _tmp.copy(b).sub(a);
  const len = d.length();
  m.position.copy(a);
  m.quaternion.setFromUnitVectors(UP, d.divideScalar(len || 1));
  m.scale.set(1, len, 1);
}
const _tmp = new THREE.Vector3();

// Displaces a geometry's vertices along their direction from `c` by a little
// bumpy noise, for hair, beards and wool.
function lumpy(geo, amt, f, c = new THREE.Vector3()) {
  const pos = geo.attributes.position, v = new THREE.Vector3(), d = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    d.copy(v).sub(c).normalize();
    const n = Math.sin(d.x * f + 1.3) * Math.sin(d.y * f * 1.7 + 0.4) * Math.sin(d.z * f * 1.3 + 2.1)
      + 0.5 * Math.sin(d.x * f * 2.3 + d.z * f * 1.9 + 0.7) * Math.cos(d.y * f * 2.1);
    v.addScaledVector(d, n * amt);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

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
    dark: new THREE.Color('#77503f'),
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

  // Level, trodden ground in the court, with a little grain for the close-ups.
  const grain = canvasTexture(256, (g, s) => {
    g.fillStyle = '#e6d4ab';
    g.fillRect(0, 0, s, s);
    for (let i = 0; i < 2600; i++) {
      g.fillStyle = `rgba(${rand() < 0.5 ? '120,95,60' : '255,250,235'},${0.08 + rand() * 0.14})`;
      g.fillRect(rand() * s, rand() * s, 1 + rand() * 2, 1 + rand() * 2);
    }
  });
  grain.repeat.set(40, 20);
  const pad = new THREE.Mesh(
    new THREE.PlaneGeometry(COURT.east - COURT.west + 30, COURT.half * 2 + 30).rotateX(-Math.PI / 2),
    new THREE.MeshStandardMaterial({ map: grain, roughness: 1 }),
  );
  pad.position.y = 0.02;
  pad.receiveShadow = true;
  scene.add(pad);
}

// ---------------------------------------------------------------- build groups
// Each piece belongs to a group named in STOPS[].build. A group's progress p
// (0..1) raises its pieces one after another: 'drop' falls in with a little
// overshoot, 'lower' comes down at full size (a garment going on over the
// head), 'grow' scales up in place, 'wrap' winds in round a body, and 'off'
// lifts away (a garment taken off). Walks (below) are groups too.
const groups = {};
function piece(key, obj, mode = 'drop', lift = 6) {
  groups[key] ??= { key, items: [], p: -1 };
  groups[key].items.push({ obj, mode, lift, pos: obj.position.clone(), scale: obj.scale.clone(), rot: obj.rotation.y });
  return obj;
}
function setItem(it, k) {
  const o = it.obj;
  if (it.mode === 'off') {
    o.visible = k < 1;
    o.position.copy(it.pos);
    o.position.y += smooth(k) * it.lift;
    return;
  }
  o.visible = k > 0;
  if (k <= 0) return;
  o.position.copy(it.pos);
  o.scale.copy(it.scale);
  o.rotation.y = it.rot;
  if (it.mode === 'drop') {
    o.position.y += (1 - k) ** 2 * it.lift;
    o.scale.multiplyScalar(k >= 1 ? 1 : Math.max(0.001, easeOutBack(k)));
  } else if (it.mode === 'lower') {
    o.position.y += (1 - smooth(k)) * it.lift;
  } else if (it.mode === 'wrap') {
    const e = smooth(k);
    o.rotation.y = it.rot + (1 - e) * 2.4;
    o.scale.set(it.scale.x * (1 + (1 - e) * 0.6), it.scale.y, it.scale.z * (1 + (1 - e) * 0.6));
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
// A group that only drives something computed each frame (an arm, the water).
const marker = (key) => piece(key, new THREE.Object3D(), 'grow');
// How long a group takes during a flight, in WALK_UNITs (walks set their own).
const WEIGHT = {
  bathe: 4, linen: 2, lots: 2, bullDown: 1.2, goatDown: 1.2, coals: 1.6, cloud: 2.6,
  sprinkle1: 4, sprinkle2: 4, sprinkle3: 3.5, hands: 1.4, unlinen: 1.5, pile: 0.6, rams: 2, burn: 1.5, carry: 1, pyre: 1.5,
  horn1: 0.8, horn2: 0.8, horn3: 0.8, horn4: 0.8,
  tunic: 0.5, sash: 0.5, robe: 0.5, hem: 0.5, ephod: 0.5, onyx: 0.4, band: 0.4, breastpiece: 0.5, stones: 0.5, chains: 0.4, urim: 0.4, turban: 0.5, plate: 0.5,
};
const weightOf = (k) => groups[k]?.weight ?? WEIGHT[k] ?? 1;

// ---------------------------------------------------------------- the tent
// Set up as in Exodus 40: gold boards and bars, the linen ceiling and the
// coverings over them, the doorway curtain on five pillars, and the veil on
// four. The coverings and the south wall fade for the views inside.
{
  const len = TENT.east - OUT_W;
  for (const s of [-1, 1]) {
    const m = add(scene, box(len, TENT.height, BT, 1.5), s < 0 ? MAT.boardsSouth : MAT.boards, (TENT.east + OUT_W) / 2, 0.05, -s * (TENT.half + BT / 2));
    if (s < 0) southMeshes.push(m);
  }
  add(scene, box(BT, TENT.height, OUT_N * 2, 1.5), MAT.boards, OUT_W + BT / 2, 0.05, 0);
  // Silver bases under the boards (26:19).
  for (const s of [-1, 1]) {
    const m = add(scene, box(len, 0.7, BT + 0.25), s < 0 ? MAT.silverSouth : MAT.silver, (TENT.east + OUT_W) / 2, 0, -s * (TENT.half + BT / 2));
    if (s < 0) southMeshes.push(m);
  }
  // Five bars a side, the middle one end to end (26:26-28).
  for (const s of [-1, 1]) {
    for (const [x, l, y] of [[OUT_W + len / 2, len, 5], [OUT_W + len * 0.75, len / 2 - 0.15, 8.2], [OUT_W + len * 0.25, len / 2 - 0.15, 8.2], [OUT_W + len * 0.75, len / 2 - 0.15, 1.8], [OUT_W + len * 0.25, len / 2 - 0.15, 1.8]]) {
      const m = add(scene, cylX(0.14, l), s < 0 ? MAT.goldSouth : MAT.gold, x, y, -s * (OUT_N + 0.14));
      if (s < 0) southMeshes.push(m);
    }
  }
  // The doorway: five gold pillars on bronze bases, and the embroidered curtain (26:36-37).
  for (const n of DOOR_PILLARS) {
    add(scene, box(0.8, 0.7, 0.8), MAT.bronze, TENT.east, 0, -n);
    add(scene, new THREE.CylinderGeometry(0.22, 0.26, TENT.height, 16).translate(0, TENT.height / 2, 0), MAT.gold, TENT.east, 0.05, -n);
  }
  add(scene, box(0.08, TENT.height - 0.3, OUT_N * 2), MAT.screen, TENT.east + 0.34, 0.1, 0);
  // The veil on four gold pillars with silver bases (26:31-33).
  for (const n of VEIL_PILLARS) {
    add(scene, box(0.8, 0.7, 0.8), MAT.silver, TENT.veil, 0, -n);
    add(scene, new THREE.CylinderGeometry(0.22, 0.26, TENT.height, 14).translate(0, TENT.height / 2, 0), MAT.gold, TENT.veil, 0.05, -n);
  }
  add(scene, box(0.08, TENT.height - 0.3, TENT.half * 2), MAT.veil, TENT.veil - 0.32, 0.1, 0);
  // The linen curtains make the ceiling (26:1-6); goats' hair over them, down
  // the sides and back, the sixth curtain doubled over the front (26:7-13);
  // rams' skins and the outer covering on top (26:14).
  const cover = (m) => { coverMeshes.push(m); return m; };
  cover(add(scene, box(len + 0.3, 0.04, OUT_N * 2, 4), MAT.curtain, (TENT.east + 0.3 + OUT_W) / 2, TENT.height + 0.03, 0));
  const off = 0.18, east = TENT.east + 0.3 + off, west = OUT_W - off, top = TENT.height + off, half = OUT_N + off;
  cover(add(scene, box(east - west, 0.06, half * 2), MAT.goat, (east + west) / 2, top, 0));
  for (const s of [-1, 1]) cover(add(scene, box(east - west, top - 0.3, 0.06), MAT.goat, (east + west) / 2, 0.3, s * half));
  cover(add(scene, box(0.06, top - 0.3, half * 2), MAT.goat, west, 0.3, 0));
  cover(add(scene, box(0.06, 2, half * 2), MAT.goat, east + 0.03, top - 2, 0));
  for (const [mat, o] of [[MAT.rams, 0.34], [MAT.outer, 0.46]]) {
    const e = TENT.east + 0.3 + o, w = OUT_W - o, h = OUT_N + o, tp = TENT.height + o;
    cover(add(scene, box(e - w, 0.08, h * 2), mat, (e + w) / 2, tp, 0));
    for (const s of [-1, 1]) cover(add(scene, box(e - w, 1.2, 0.08), mat, (e + w) / 2, tp - 1.2, s * h));
  }
}

// ---------------------------------------------------------------- furniture
const flames = [];
// A teardrop lathe, fat low and pointed at the top, coloured along its height
// through `stops` ([t, colour], t from 0 at the base to 1 at the tip).
function flameGeometry(r, h, stops) {
  const pts = [];
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    pts.push(new THREE.Vector2(r * Math.sin(Math.PI * Math.pow(t, 0.45)) * (1 - 0.15 * t) + 0.001, t * h));
  }
  const geo = new THREE.LatheGeometry(pts, 10);
  const pos = geo.attributes.position, col = [], c = new THREE.Color(), a = new THREE.Color(), b = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const t = pos.getY(i) / h;
    let k = 1;
    while (k < stops.length - 1 && stops[k][0] < t) k++;
    const [t0, c0] = stops[k - 1], [t1, c1] = stops[k];
    c.copy(a.set(c0)).lerp(b.set(c1), THREE.MathUtils.clamp((t - t0) / (t1 - t0), 0, 1));
    col.push(c.r, c.g, c.b);
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  return geo;
}
const FLAME_OUTER = [[0, 0xffc22e], [0.35, 0xff8c1a], [0.75, 0xf0521a], [1, 0xb8260f]];
const FLAME_CORE = [[0, 0xfffbe0], [0.6, 0xffe066], [1, 0xffa726]];
function flame(parent, x, y, z, h = 0.22, r = 0.06) {
  const holder = new THREE.Group();
  holder.position.set(x, y, z);
  parent.add(holder);
  const f = new THREE.Mesh(flameGeometry(r, h, FLAME_OUTER), MAT.flame);
  const core = new THREE.Mesh(flameGeometry(r * 0.55, h * 0.6, FLAME_CORE), MAT.flameCore);
  f.renderOrder = 1;
  holder.add(core, f);
  flames.push({ mesh: f, core, phase: rand() * 10, boost: () => 1 });
  return holder;
}
const smokes = [];
// Puffs rise from `origin`, or from anywhere in an `area` [east-west, north-south]
// round it, while `amount()` is above zero.
function smoke(origin, { count, size, rise, color, speed, spread, area = [0, 0], alpha = 0.5, amount = () => 1 }) {
  const puffs = [];
  for (let i = 0; i < count; i++) {
    const m = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1, 1),
      new THREE.MeshStandardMaterial({ color, roughness: 1, transparent: true, opacity: 0, depthWrite: false }),
    );
    m.visible = false;
    scene.add(m);
    puffs.push({ m, phase: (i * 0.618) % 1, drift: rand() * Math.PI * 2, ox: (rand() - 0.5) * area[0], oz: (rand() - 0.5) * area[1] });
  }
  const s = { origin, puffs, size, rise, speed, spread, alpha, amount };
  smokes.push(s);
  return s;
}

// The ark and its cover with two cherubim of one piece with it, facing each
// other, wings spread up over it (25:10-22).
const ARK_H = 1.5, ARK_L = 2.5;
const COVER_Y = ARK_H + 0.12;     // the top of the cover
{
  const W = 1.5, t = 0.08;
  const A = placed(ARK.x, ARK.n);
  add(A, box(ARK_L, t, W), MAT.gold);
  for (const s of [-1, 1]) {
    add(A, box(ARK_L, ARK_H, t), MAT.gold, 0, 0, s * (W / 2 - t / 2));
    add(A, box(t, ARK_H, W), MAT.gold, s * (ARK_L / 2 - t / 2), 0, 0);
    add(A, box(ARK_L + 0.1, 0.1, 0.06), MAT.gold, 0, ARK_H - 0.18, s * (W / 2 + 0.03));
    add(A, box(0.06, 0.1, W + 0.1), MAT.gold, s * (ARK_L / 2 + 0.03), ARK_H - 0.18, 0);
    add(A, cylX(0.06, 6), MAT.gold, 0, 0.45, s * (W / 2 + 0.14));
    for (const e of [-1, 1]) add(A, new THREE.TorusGeometry(0.12, 0.035, 6, 14).rotateY(Math.PI / 2), MAT.gold, e * 0.95, 0.45, s * (W / 2 + 0.14));
  }
  const C = placed(ARK.x, ARK.n, ARK_H);
  add(C, box(ARK_L, 0.12, W), MAT.gold);
  for (const s of [-1, 1]) {
    const K = new THREE.Group();
    K.position.set(s * 0.92, 0.12, 0);
    K.rotation.y = s < 0 ? 0 : Math.PI;
    C.add(K);
    add(K, new THREE.CylinderGeometry(0.13, 0.2, 0.62, 10).translate(0, 0.31, 0), MAT.gold);
    add(K, new THREE.SphereGeometry(0.13, 12, 8), MAT.gold, 0.05, 0.74, 0);
    for (const side of [-1, 1]) {
      const wing = new THREE.Group();
      wing.position.set(-0.04, 0.55, side * 0.13);
      wing.rotation.set(side * 0.35, 0, -0.75);
      K.add(wing);
      add(wing, box(0.03, 0.95, 0.42), MAT.gold, 0, 0, side * 0.12);
    }
  }
}

// The table with the bread (25:23-30; Leviticus 24:5-6), the lampstand, lit
// (25:31-37), and the gold altar of incense (30:1-5), in the Holy Place.
const lampLight = new THREE.PointLight(0xffb560, 2.5, 16, 1.6);
{
  const G = placed(TABLE.x, TABLE.n);
  const L = 2, W = 1, H = 1.5;
  add(G, box(L, 0.08, W), MAT.gold, 0, H - 0.08, 0);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) add(G, box(0.09, H - 0.08, 0.09), MAT.gold, sx * (L / 2 - 0.1), 0, sz * (W / 2 - 0.1));
  for (const s of [-1, 1]) {
    add(G, box(L - 0.1, 0.17, 0.04), MAT.gold, 0, H - 0.3, s * (W / 2 - 0.1));
    add(G, box(L + 0.04, 0.05, 0.04), MAT.gold, 0, H, s * (W / 2));
    for (let k = 0; k < 6; k++) add(G, new THREE.CylinderGeometry(0.3, 0.3, 0.09, 16).translate(0, 0.045, 0), MAT.bread, s * 0.48, H + 0.01 + k * 0.1, 0);
  }

  const top = 3.1;
  const S = placed(LAMPSTAND.x, LAMPSTAND.n);
  add(S, new THREE.CylinderGeometry(0.2, 0.42, 0.25, 16), MAT.gold);
  add(S, new THREE.CylinderGeometry(0.055, 0.07, top, 10).translate(0, top / 2, 0), MAT.gold);
  const tips = [0];
  for (const r of [0.38, 0.76, 1.14]) {
    add(S, new THREE.TorusGeometry(r, 0.045, 8, 32, Math.PI).rotateZ(Math.PI), MAT.gold, 0, top, 0);
    tips.push(r, -r);
  }
  for (const u of tips) {
    add(S, new THREE.CylinderGeometry(0.11, 0.05, 0.12, 12), MAT.gold, u, top + 0.02, 0);
    flame(S, u, top + 0.08, 0);
  }
  lampLight.position.copy(v3(LAMPSTAND.x, LAMPSTAND.n + 0.6, top + 0.6));
  scene.add(lampLight);

  const I = placed(INCENSE.x, INCENSE.n);
  add(I, box(1, 2, 1), MAT.gold);
  for (const s of [-1, 1]) {
    add(I, box(1.06, 0.06, 0.04), MAT.gold, 0, 1.82, s * 0.52);
    add(I, box(0.04, 0.06, 1.06), MAT.gold, s * 0.52, 1.82, 0);
  }
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) add(I, box(0.13, 0.16, 0.13), MAT.gold, sx * 0.43, 2, sz * 0.43);
}

// ---------------------------------------------------------------- court, basin, altar
// The court: sixty pillars, linen hangings five cubits high, the gate curtain on the east (27:9-19).
{
  const ring = [];
  const { west: W, east: E, half: H } = COURT;
  for (let n = COURT.gate; n < H; n += 5) ring.push([E, n]);
  for (let x = E; x > W; x -= 5) ring.push([x, H]);
  for (let n = H; n > -H; n -= 5) ring.push([W, n]);
  for (let x = W; x < E; x += 5) ring.push([x, -H]);
  for (let n = -H; n < COURT.gate; n += 5) ring.push([E, n]);
  const Hh = COURT.height;
  for (const [x, n] of ring) {
    const G = placed(x, n);
    add(G, box(0.6, 0.5, 0.6), MAT.bronze);
    add(G, new THREE.CylinderGeometry(0.17, 0.19, Hh, 10).translate(0, Hh / 2, 0), MAT.wood, 0, 0.1, 0);
    add(G, new THREE.CylinderGeometry(0.24, 0.2, 0.3, 10), MAT.silver, 0, Hh, 0);
  }
  ring.forEach(([x, n], i) => {
    const [x2, n2] = ring[(i + 1) % ring.length];
    if (x === E && x2 === E && Math.max(Math.abs(n), Math.abs(n2)) <= COURT.gate) return;
    const along = x2 !== x;
    const ox = x === E && x2 === E ? 1 : x === W && x2 === W ? -1 : 0;
    const on = n === H && n2 === H ? 1 : n === -H && n2 === -H ? -1 : 0;
    add(scene, along ? box(5, Hh - 0.35, 0.06, 5) : box(0.06, Hh - 0.35, 5, 5), MAT.linen, (x + x2) / 2 + ox * 0.22, 0.2, -((n + n2) / 2 + on * 0.22));
  });
  add(scene, box(0.08, Hh - 0.35, COURT.gate * 2), MAT.screen, E + 0.24, 0.2, 0);
}

// The bronze basin on its stand (30:18; 38:8), with water in it.
const BASIN_Y = 2.22;
{
  const G = placed(LAVER.x, LAVER.n);
  add(G, new THREE.CylinderGeometry(0.5, 0.75, 0.3, 24), MAT.bronze);
  add(G, new THREE.CylinderGeometry(0.22, 0.32, 1.7, 16).translate(0, 0.85, 0), MAT.bronze);
  const bowl = add(G, new THREE.SphereGeometry(1, 32, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), MAT.bronze.clone(), 0, 2.35, 0);
  bowl.scale.set(1.15, 0.6, 1.15);
  bowl.material.side = THREE.DoubleSide;
  add(G, new THREE.CircleGeometry(1.07, 32).rotateX(-Math.PI / 2), MAT.water, 0, BASIN_Y, 0).castShadow = false;
}

// The altar of burnt offering (27:1-8), its fire burning (Leviticus 6:13).
// Its four horns take the blood (16:18).
const fireLight = new THREE.PointLight(0xff8a3a, 12, 22, 1.4);
const ALTAR_H = 3;
const HORNS = { NW: P(ALTAR.x - 2.25, 2.25), NE: P(ALTAR.x + 2.25, 2.25), SE: P(ALTAR.x + 2.25, -2.25), SW: P(ALTAR.x - 2.25, -2.25) };
const hornBlood = {};
{
  const { x, n } = ALTAR;
  const S = 5, H = ALTAR_H, t = 0.15;
  const G = placed(x, n);
  for (const s of [-1, 1]) {
    add(G, box(S, H, t), MAT.bronze, 0, 0, s * (S / 2 - t / 2));
    add(G, box(t, H, S), MAT.bronze, s * (S / 2 - t / 2), 0, 0);
    add(G, box(S + 0.24, 0.16, 0.12), MAT.bronze, 0, H / 2 - 0.1, s * (S / 2 + 0.06));
    add(G, box(0.12, 0.16, S + 0.24), MAT.bronze, s * (S / 2 + 0.06), H / 2 - 0.1, 0);
  }
  add(G, box(S - 2 * t, 0.08, S - 2 * t), MAT.dark, 0, H / 2, 0).castShadow = false;
  const horn = new THREE.ConeGeometry(0.28, 0.5, 4).rotateY(Math.PI / 4).translate(0, 0.25, 0);
  for (const [k, h] of Object.entries(HORNS)) {
    add(scene, horn, MAT.bronze, h.x, H, -h.n);
    const b = add(scene, new THREE.ConeGeometry(0.3, 0.42, 4, 1, true).rotateY(Math.PI / 4).translate(0, 0.29, 0), MAT.blood, h.x, H, -h.n);
    b.material = MAT.blood.clone();
    b.material.side = THREE.DoubleSide;
    b.castShadow = false;
    hornBlood[k] = b;
  }
  const F = placed(x, n, H / 2 + 0.1);
  for (let k = 0; k < 7; k++) {
    const log = add(F, cylX(0.16, 2.4 + rand()), MAT.char, (rand() - 0.5) * 1.6, 0.16 + (k % 3) * 0.25, (rand() - 0.5) * 2.4);
    log.rotation.y = rand() * Math.PI;
  }
  // The fire burns higher with the burnt offerings (16:24-25).
  for (let k = 0; k < 9; k++) flame(F, (rand() - 0.5) * 2.4, 0.4, (rand() - 0.5) * 2.4, 1.6 + rand() * 1.4, 0.35 + rand() * 0.25);
  for (let k = 0; k < 8; k++) flame(F, (rand() - 0.5) * 2.8, 0.35, (rand() - 0.5) * 2.8, 0.7 + rand() * 0.6, 0.25 + rand() * 0.15);
  for (const f of flames.slice(-17)) f.boost = () => 1 + 0.7 * groupP('burn') * (1 - 0.4 * groupP('pyre'));
  smoke(v3(x, n, H + 0.6), { count: 34, size: 0.9, rise: 32, color: 0x8d877f, speed: 0.07, spread: 1.6, amount: () => 1 + 1.2 * groupP('burn') });
  fireLight.position.copy(v3(x, n, H + 1.5));
  scene.add(fireLight);
}

// ---------------------------------------------------------------- the camp
// As in the Tabernacle animation (Numbers 2-3). Tents near the way the goat
// is led out, or the place of burning, are left out.
const LEAD_PTS = [P(6.3, -1.5), P(8.2, -2.4), P(12, -3.4), P(16, -4.6), P(30, -4.8), P(40, -3.2), P(50, -0.8), P(62, 0),
  P(95, 3), P(150, 40), P(200, 55), P(290, 55), P(420, 72), P(700, 110)];
const LEAD_END = P(200, 55);         // where the flight leaves them; they walk on while the stop is held
const tentSpots = [];
{
  const r = mulberry32(12);
  const list = [];
  const SIDES = { east: [1, 0], south: [0, -1], west: [-1, 0], north: [0, 1] };
  const frame = (side) => { const [ox, on] = SIDES[side]; return { ox, on, ax: -on, an: ox }; };
  const toPlan = (f, out, along) => ({ x: f.ox * out + f.ax * along, n: f.on * out + f.an * along });
  function block(side, count, out0, along0, width, gap = 13) {
    const f = frame(side);
    const cols = Math.max(1, Math.floor(width / gap));
    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / cols), col = i % cols;
      const along = along0 + (col - (cols - 1) / 2) * gap + (r() - 0.5) * 1.5;
      const p = toPlan(f, out0 + row * (gap - 2) + (r() - 0.5) * 1.5, along);
      const tent = { ...p, w: 8 + r() * 2.5, d: 5.5 + r() * 1.5, h: 3.2 + r() * 0.8, yaw: Math.atan2(f.an, f.ax) };
      if (distToPath(p.x, p.n, LEAD_PTS) < 7 || Math.hypot(p.x - PYRE.x, p.n - PYRE.n) < 25) continue;
      list.push(tent);
    }
    return f;
  }
  const flags = [];
  const COLORS = ['#b3242c', '#3b3f8f', '#2f7a4a', '#c99a2e', '#6b2d6b', '#d0d0c8', '#1f6f8b', '#a8552a', '#4a4a4a', '#8f2f5c', '#5f7f2a', '#c5703a'];
  CAMP.tribes.forEach((tb, i) => {
    const along = tb.place * 110;
    const f = block(tb.side, Math.round(tb.men / 1000), 175, along, 105);
    flags.push({ ...toPlan(f, 165, along), color: COLORS[i], h: tb.place === 0 ? 14 : 10 });
  });
  for (const l of CAMP.levites) {
    const count = l.tents ?? Math.round(l.count / 500);
    const inner = (l.side === 'east' || l.side === 'west' ? COURT.east : COURT.half) + 16;
    if (l.tents) for (const k of [-1, 1]) block(l.side, count / 2, inner, k * 27, 30, 12);
    else block(l.side, count, inner, 0, l.side === 'east' || l.side === 'west' ? 66 : 110, 12);
  }
  const geo = new THREE.CylinderGeometry(0.7, 0.7, 1, 3).rotateX(-Math.PI / 2).rotateY(Math.PI / 2).translate(0, 0.35, 0);
  const tents = new THREE.InstancedMesh(geo, MAT.plain, list.length);
  const cols = ['#2f2722', '#3d3129', '#4a3d33', '#5b4a3c', '#2a2420'].map((h) => new THREE.Color(h));
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), p = new THREE.Vector3(), s = new THREE.Vector3();
  list.forEach((tn, i) => {
    q.setFromAxisAngle(UP, tn.yaw);
    tents.setMatrixAt(i, m.compose(p.set(tn.x, ground(tn.x, tn.n) - 0.2, -tn.n), q, s.set(tn.w, tn.h, tn.d)));
    tents.setColorAt(i, cols[i % cols.length]);
    tentSpots.push(tn);
  });
  tents.castShadow = tents.receiveShadow = true;
  scene.add(tents);
  for (const fl of flags) {
    const F = placed(fl.x, fl.n, ground(fl.x, fl.n));
    add(F, new THREE.CylinderGeometry(0.12, 0.15, fl.h, 6).translate(0, fl.h / 2, 0), MAT.wood);
    add(F, box(3.2, 2.2, 0.06), new THREE.MeshStandardMaterial({ color: fl.color, roughness: 0.9, side: THREE.DoubleSide }), 1.6, fl.h - 2.4, 0);
  }
}

// The congregation outside the court gate: they humble themselves and do no
// work (16:29). One figure stands for many. A way is kept clear for the
// offerings coming in and the goat going out.
{
  const r = mulberry32(8);
  const list = [];
  for (let i = 0; i < 640; i++) {
    const x = COURT.east + 4 + r() ** 0.8 * 40, n = (r() - 0.5) * 80;
    if (x < 66 && Math.abs(n - 2) < 9) continue;
    if (distToPath(x, n, LEAD_PTS) < 4.5) continue;
    if (tentSpots.some((tn) => Math.hypot(tn.x - x, tn.n - n) < 6)) continue;
    list.push({ x, n, h: 0.9 + r() * 0.2, c: r() });
  }
  const body = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.22, 0.38, 2.7, 8).translate(0, 1.35, 0), MAT.plain, list.length);
  const head = new THREE.InstancedMesh(new THREE.SphereGeometry(0.2, 10, 8).translate(0, 2.95, 0), MAT.plain, list.length);
  const cols = ['#d9ccb0', '#8a6a48', '#6b4e36', '#c9b48e', '#a33a2c', '#3f4f7a', '#e6dcc6', '#7a5a3c'].map((h) => new THREE.Color(h));
  const skin = new THREE.Color('#a8754f');
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), p = new THREE.Vector3(), s = new THREE.Vector3();
  list.forEach((f, i) => {
    q.setFromAxisAngle(UP, Math.PI + (r() - 0.5));
    m.compose(p.set(f.x, ground(f.x, f.n), -f.n), q, s.set(1, f.h, 1));
    body.setMatrixAt(i, m);
    head.setMatrixAt(i, m);
    body.setColorAt(i, cols[Math.floor(f.c * cols.length)]);
    head.setColorAt(i, r() < 0.5 ? skin : cols[6]);
  });
  for (const im of [body, head]) { im.castShadow = im.receiveShadow = true; scene.add(im); }
}

// ---------------------------------------------------------------- people
// Figures face local +X; local +Z is their right hand. Bodies and garments are
// lathes inside a group squashed front to back by DEPTH, so they read as
// bodies rather than bells. Heights in cubits: shoulders 2.55, head 3.1.

// Arms from the shoulders: `out` away from the body, `fwd` forward, `bend` at the elbow.
// fn(shoulder, elbow, side) adds whatever goes on the arm; returns the shoulders.
function limbs(parent, pose, fn) {
  return [-1, 1].map((s) => {
    const S = new THREE.Group();
    S.position.set(0, 2.55, s * 0.36);
    S.rotation.set(-s * pose.out, 0, pose.fwd);
    parent.add(S);
    const E = new THREE.Group();
    E.position.y = -0.72;
    E.rotation.z = pose.bend;
    S.add(E);
    fn(S, E, s);
    return { S, E, s, pose };
  });
}
// A group in `parent` squashed front to back, for lathes.
function squashed(parent) {
  const B = new THREE.Group();
  B.scale.x = DEPTH;
  parent.add(B);
  return B;
}
const POSE = { out: 0.16, fwd: 0.06, bend: 0.28 };

// The skull and face: an egg with a brow, cheekbones, eye sockets and a
// narrower jaw, centred on the origin, facing +X.
function headGeo() {
  const geo = new THREE.SphereGeometry(1, 36, 28);
  const pos = geo.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const front = Math.max(0, v.x), low = Math.max(0, -v.y);
    v.z *= 1 - 0.22 * low * low;
    if (v.x < 0) v.x *= 1 + 0.08 * Math.max(0, v.y + 0.3) - 0.3 * low;
    v.x += 0.06 * front ** 4 * Math.exp(-(((v.y - 0.22) / 0.12) ** 2));
    v.x -= 0.07 * front ** 2 * Math.exp(-(((v.y - 0.06) / 0.11) ** 2) - (((Math.abs(v.z) - 0.36) / 0.16) ** 2));
    v.z += Math.sign(v.z) * 0.04 * front * Math.exp(-(((v.y + 0.05) / 0.15) ** 2));
    pos.setXYZ(i, v.x * 0.2, v.y * 0.225, v.z * 0.182);
  }
  geo.computeVertexNormals();
  return geo;
}
// A beard round the jaw and chin, `long` drawing it down to a point.
function beardGeo(long) {
  const geo = new THREE.SphereGeometry(1, 32, 22, Math.PI - 2.15, 4.3, Math.PI * 0.44, Math.PI * 0.56);
  const pos = geo.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const low = Math.max(0, -v.y);
    v.y *= 1 + long * low;
    v.z *= 1 - 0.38 * low * low;
    v.x *= 1 - 0.15 * low;
    pos.setXYZ(i, v.x * 0.172 + 0.045, v.y * 0.2 + 3.07, v.z * 0.188);
  }
  return lumpy(geo, 0.012, 11, new THREE.Vector3(0.03, 3.05, 0));
}
const skinMats = {};
const skinMat = (c) => (skinMats[c] ??= new THREE.MeshStandardMaterial({ color: c, roughness: 0.72 }));
const UPPER_ARM = lathe([[0.074, -0.74], [0.078, -0.66], [0.096, -0.42], [0.104, -0.18], [0.098, 0]], 14);
const FOREARM = lathe([[0.05, -0.62], [0.052, -0.58], [0.07, -0.36], [0.082, -0.13], [0.075, 0]], 14);
const LEG = lathe([[0.05, -1.4], [0.046, -1.34], [0.062, -1.2], [0.088, -0.98], [0.083, -0.86], [0.076, -0.74], [0.11, -0.56], [0.134, -0.2], [0.135, 0.02]], 14);

// The body, wearing linen undergarments from the waist to the thighs (Exodus 28:42).
// fig.head holds the head and anything worn on it; fig.neck turns it.
function figure({ beard, hair, skin = '#a8754f', long = 0.5, pose = POSE }) {
  const G = new THREE.Group();
  scene.add(G);
  const sk = skinMat(skin);
  const B = squashed(G);
  add(B, lathe([[0.001, 1.2], [0.25, 1.22], [0.29, 1.5], [0.28, 1.75], [0.3, 2.05], [0.35, 2.4], [0.37, 2.55], [0.3, 2.66], [0.12, 2.74], [0.001, 2.76]]), sk);
  add(B, lathe([[0.29, 1.12], [0.3, 1.3], [0.29, 1.5], [0.27, 1.62]]), MAT.plainLinen);
  const legs = [-1, 1].map((s) => {
    const L = new THREE.Group();
    L.position.set(0, 1.5, s * 0.14);
    G.add(L);
    add(L, LEG, sk);
    add(L, new THREE.SphereGeometry(1, 16, 10), sk, 0.08, -1.45, 0).scale.set(0.13, 0.045, 0.062);
    add(L, new THREE.SphereGeometry(0.05, 12, 8), sk, -0.01, -1.43, 0).scale.set(1, 0.85, 0.95);
    add(L, new THREE.SphereGeometry(1, 12, 8), sk, 0.19, -1.475, s * 0.008).scale.set(0.045, 0.024, 0.055);
    return L;
  });
  const arms = limbs(G, pose, (S, E, s) => {
    add(S, new THREE.SphereGeometry(0.1, 14, 10), sk, 0, -0.09, 0);
    add(S, UPPER_ARM, sk);
    add(E, new THREE.SphereGeometry(0.074, 12, 8), sk);
    add(E, FOREARM, sk);
    const H = new THREE.Group();
    H.position.y = -0.61;
    E.add(H);
    add(H, new THREE.SphereGeometry(1, 14, 10), sk, 0, -0.05, 0).scale.set(0.052, 0.068, 0.032);
    add(H, new THREE.CapsuleGeometry(0.024, 0.05, 4, 10), sk, 0.002, -0.115, -s * 0.008).scale.set(1.9, 1, 1);
    const T = add(H, new THREE.CapsuleGeometry(0.014, 0.04, 4, 8), sk, 0.042, -0.06, -s * 0.012);
    T.rotation.set(-s * 0.35, 0, 0.35);
    H.rotation.x = s * 0.12;
  });
  add(G, new THREE.CylinderGeometry(0.083, 0.1, 0.32, 14), sk, 0, 2.72, 0);
  const neck = new THREE.Group();
  neck.position.y = 2.8;
  G.add(neck);
  const head = new THREE.Group();
  head.position.y = -2.8;
  neck.add(head);
  add(head, headGeo(), sk, 0, 3.12, 0);
  rod(head, new THREE.Vector3(0.185, 3.175, 0), new THREE.Vector3(0.215, 3.095, 0), 0.016, sk, 8);
  add(head, new THREE.SphereGeometry(0.021, 12, 8), sk, 0.21, 3.092, 0);
  for (const s of [-1, 1]) add(head, new THREE.SphereGeometry(0.016, 8, 6), sk, 0.198, 3.083, s * 0.02);
  for (const s of [-1, 1]) {
    const e = add(head, new THREE.SphereGeometry(1, 12, 8), sk, -0.005, 3.125, s * 0.178);
    e.scale.set(0.038, 0.062, 0.016);
    e.rotation.set(s * 0.25, -s * 0.3, 0.12);
  }
  const eyes = new THREE.Group();
  eyes.position.set(0.168, 3.162, 0);
  head.add(eyes);
  for (const s of [-1, 1]) {
    add(eyes, new THREE.SphereGeometry(0.024, 14, 10), MAT.eyeWhite, 0, 0, s * 0.066).scale.set(0.8, 0.75, 1);
    add(eyes, new THREE.SphereGeometry(0.014, 12, 8), MAT.eye, 0.015, 0, s * 0.064).scale.set(0.6, 1, 1);
    add(head, new THREE.SphereGeometry(0.026, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.36), sk, 0.166, 3.166, s * 0.066).scale.set(0.85, 0.8, 1.05);
  }
  const hm = hairMat(hair), bm = hairMat(beard);
  for (const s of [-1, 1]) {
    const b = add(head, new THREE.CapsuleGeometry(0.011, 0.05, 4, 8).rotateX(Math.PI / 2), hm, 0.18, 3.207, s * 0.068);
    b.rotation.set(s * 0.1, -s * 0.35, 0);
  }
  add(head, lumpy(new THREE.SphereGeometry(0.214, 32, 18, -Math.PI / 2 - 0.15, Math.PI + 0.3, 0, Math.PI * 0.78), 0.01, 9), hm, -0.016, 3.14, 0).scale.set(1, 1.12, 0.94);
  add(head, lumpy(new THREE.SphereGeometry(0.214, 32, 10, 0, Math.PI * 2, 0, Math.PI * 0.28), 0.008, 9), hm, -0.02, 3.14, 0).scale.set(1, 1.12, 0.94);
  add(head, beardGeo(long), bm);
  add(head, lumpy(tubeThrough([[0.165, 3.015, -0.08], [0.198, 3.048, -0.05], [0.214, 3.058, 0], [0.198, 3.048, 0.05], [0.165, 3.015, 0.08]], 0.018, 16), 0.004, 14, new THREE.Vector3(0.1, 3.05, 0)), bm);
  return { G, arms, legs, neck, head, eyes, blink: rand() * 4, step: 0 };
}

// Garments. Each returns its group, which is the piece that goes on. A
// tunic's sleeves are on the figure's own arms, which move, and show only
// while the tunic is on (syncSleeves).
const sleeved = [];
function tunic(fig, mat = MAT.tunic) {
  const T = new THREE.Group();
  fig.G.add(T);
  add(squashed(T), lathe([[0.34, 0.22], [0.33, 0.7], [0.315, 1.2], [0.315, 1.6], [0.318, 1.9], [0.365, 2.35], [0.392, 2.53], [0.322, 2.67], [0.152, 2.77], [0.132, 2.8]]), mat);
  const sleeves = fig.arms.flatMap(({ S, E }) => [
    add(S, new THREE.CylinderGeometry(0.128, 0.11, 0.76, 12, 1, true).translate(0, -0.37, 0), mat),
    add(E, new THREE.CylinderGeometry(0.105, 0.088, 0.56, 12, 1, true).translate(0, -0.28, 0), mat),
  ]);
  sleeved.push({ T, fig, sleeves });
  return T;
}
function syncSleeves() {
  for (const { T, fig, sleeves } of sleeved) {
    let on = true, lift = 0;
    for (let o = T; o && o !== fig.G; o = o.parent) { on &&= o.visible; lift += o.position.y; }
    for (const m of sleeves) m.visible = on && lift < 0.3;
  }
}
// A sash wound round the waist, its ends hanging in front (39:29); plain for the linen garments.
function sash(fig, mat = MAT.sash, trim = true) {
  const S = new THREE.Group();
  fig.G.add(S);
  const B = squashed(S);
  add(B, new THREE.CylinderGeometry(0.335, 0.33, 0.17, 32, 1, true), mat, 0, 1.64, 0);
  if (trim) add(B, new THREE.TorusGeometry(0.334, 0.012, 6, 32).rotateX(Math.PI / 2), MAT.yarn[2], 0, 1.56, 0);
  add(S, new THREE.SphereGeometry(0.05, 10, 8), mat, 0.212, 1.6, -0.06).scale.set(0.45, 1, 1.2);
  for (const [dz, len, a] of [[-0.035, 0.62, 0.04], [-0.095, 0.52, -0.04]]) {
    add(S, box(0.014, len, 0.07), mat, 0.214, 1.58 - len, dz).rotation.x = a;
  }
  return S;
}
// A turban of fine linen wound round the head (28:39; 16:4); its shape isn't given.
function turban(fig) {
  const T = new THREE.Group();
  fig.head.add(T);
  for (let k = 0; k < 4; k++) {
    const m = add(T, new THREE.TorusGeometry(0.2 - k * 0.026, 0.062 - k * 0.006, 10, 28).rotateX(Math.PI / 2), MAT.plainLinen, -0.015, 3.3 + k * 0.058, 0);
    m.rotation.z = (k % 2 ? 1 : -1) * 0.06;
    m.scale.z = 0.94;
  }
  add(T, new THREE.SphereGeometry(0.17, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), MAT.plainLinen, -0.015, 3.44, 0).scale.y = 0.6;
  return T;
}
// Puts a garment in a group of its own, so it can be taken off as well as put on.
function removable(obj) {
  const W = new THREE.Group();
  obj.parent.add(W);
  W.add(obj);
  return W;
}

// Aaron, eighty-three or more (Exodus 7:7), grey-bearded.
const aaron = figure({ beard: '#b9b3aa', hair: '#8f877e', skin: '#a2704b', long: 0.95 });
const A = aaron.G;

// The holy linen garments (16:4): tunic, sash and turban over the undergarments,
// put on after bathing, taken off in the tent (16:23) and left there.
for (const [mode, lift, g] of [['lower', 3.2, tunic(aaron, MAT.plainLinen)], ['wrap', 0, sash(aaron, MAT.plainLinen, false)], ['lower', 1.6, turban(aaron)]]) {
  piece('linen', g, mode, lift);
  piece('unlinen', removable(g), 'off', mode === 'lower' ? lift : 1.2);
}
// Left folded by the wall (the place is a guess).
{
  const G = placed(-7.3, -3.1, 0.02);
  for (let k = 0; k < 3; k++) {
    const m = add(G, box(0.95 - k * 0.1, 0.09, 0.65 - k * 0.05), MAT.plainLinen, 0, k * 0.09, 0);
    m.rotation.y = (k - 1) * 0.12;
  }
  piece('pile', G, 'drop', 0.6);
}

// The high priest's own garments (Exodus 28), put on in the tent (16:24), as
// in the Priestly Garments animation.
piece('tunic', tunic(aaron), 'lower', 3.2);
piece('sash', sash(aaron), 'wrap');
{
  const R = new THREE.Group();
  A.add(R);
  const B = squashed(R);
  add(B, lathe([[0.455, 0.55], [0.42, 0.8], [0.375, 1.3], [0.37, 1.62], [0.355, 1.9], [0.378, 2.3], [0.418, 2.53], [0.345, 2.69], [0.172, 2.8], [0.148, 2.83]], 40), MAT.robe);
  add(B, new THREE.TorusGeometry(0.157, 0.022, 8, 28).rotateX(Math.PI / 2), MAT.robe, 0, 2.83, 0);
  add(B, new THREE.TorusGeometry(0.455, 0.014, 6, 40).rotateX(Math.PI / 2), MAT.robe, 0, 0.55, 0);
  piece('robe', R, 'lower', 3.2);
  // Pomegranates and gold bells round the hem (28:33-34).
  const bell = lathe([[0.001, 0.075], [0.016, 0.072], [0.024, 0.05], [0.03, 0.015], [0.04, 0], [0.036, 0.004], [0.001, 0.01]], 14);
  for (let k = 0; k < 36; k++) {
    const a = (k / 36) * Math.PI * 2;
    const H = new THREE.Group();
    H.position.set(Math.cos(a) * 0.455 * DEPTH, 0, Math.sin(a) * 0.455);
    A.add(H);
    if (k % 2) {
      add(H, bell, MAT.gold, 0, 0.43, 0);
      add(H, new THREE.SphereGeometry(0.012, 6, 4), MAT.gold, 0, 0.43, 0);
    } else {
      const c = MAT.yarn[(k / 2) % 3];
      add(H, new THREE.SphereGeometry(0.042, 12, 8), c, 0, 0.47, 0).scale.y = 1.12;
      add(H, new THREE.ConeGeometry(0.022, 0.035, 6), c, 0, 0.43, 0).rotation.x = Math.PI;
    }
    add(H, new THREE.CylinderGeometry(0.004, 0.004, 0.06, 4), MAT.yarn[0], 0, 0.52, 0);
    piece('hem', H, 'grow');
  }
}
const SHOULDER = (s) => new THREE.Vector3(0.05, 2.79, s * 0.25);
{
  const E = new THREE.Group();
  A.add(E);
  const B = squashed(E);
  const prof = [[0.43, 1.22], [0.398, 1.5], [0.388, 1.75], [0.39, 2.0], [0.41, 2.3]];
  add(B, lathe(prof, 24, Math.PI / 2 - 1.12, 2.24), MAT.ephod);
  add(B, lathe(prof, 24, (3 * Math.PI) / 2 - 1.12, 2.24), MAT.ephod);
  for (const s of [-1, 1]) {
    const z = s * 0.205, x = 0.41 * DEPTH;
    add(E, tubeThrough([[x, 2.29, z], [x * 0.8, 2.56, s * 0.235], [0, 2.75, s * 0.25], [-x * 0.8, 2.56, s * 0.235], [-x, 2.29, z]], 0.048, 20), MAT.ephod);
  }
  piece('ephod', E, 'lower', 2.8);
  for (const s of [-1, 1]) {
    const O = new THREE.Group();
    O.position.copy(SHOULDER(s));
    O.rotation.z = -0.62;
    A.add(O);
    const names = s > 0 ? NAMES_HE.slice(0, 6) : NAMES_HE.slice(6);
    const stone = add(O, new THREE.CylinderGeometry(1, 1, 1, 32), [MAT.onyx, new THREE.MeshStandardMaterial({ map: onyxTexture(names), roughness: 0.18 }), MAT.onyx]);
    stone.scale.set(0.058, 0.03, 0.074);
    add(O, new THREE.TorusGeometry(1, 0.11, 8, 32).rotateX(Math.PI / 2), MAT.gold, 0, 0.004, 0).scale.set(0.064, 0.064, 0.08);
    piece('onyx', O, 'grow');
  }
  const W = new THREE.Group();
  A.add(W);
  add(squashed(W), new THREE.CylinderGeometry(0.425, 0.43, 0.13, 36, 1, true), MAT.ephod, 0, 1.56, 0);
  add(W, new THREE.SphereGeometry(0.045, 10, 8), MAT.ephod, 0.3, 1.56, 0.12).scale.set(0.6, 1, 1.2);
  for (const [dz, len, a] of [[0.1, 0.42, 0.05], [0.16, 0.34, -0.08]]) add(W, box(0.02, len, 0.07), MAT.ephod, 0.3, 1.55 - len, dz).rotation.x = a;
  piece('band', W, 'wrap');
}
const BP = { x: 0.31, y: 2.1, half: 0.25, t: 0.06 };
{
  const Pc = new THREE.Group();
  A.add(Pc);
  add(Pc, box(BP.t, BP.half * 2, BP.half * 2), MAT.ephod, BP.x, BP.y - BP.half, 0);
  add(Pc, cylZ(BP.t / 2, BP.half * 2, 10), MAT.ephod, BP.x, BP.y + BP.half, 0);
  for (let r = 0; r < 4; r++) for (let k = 0; k < 3; k++) add(Pc, box(0.012, 0.094, 0.112), MAT.gold, BP.x + BP.t / 2, BP.y + 0.165 - r * 0.11 - 0.047, (1 - k) * 0.135);
  piece('breastpiece', Pc, 'lower', 1.4);
  STONES.forEach((color, i) => {
    const r = Math.floor(i / 3), k = i % 3;
    const S = new THREE.Group();
    S.position.set(BP.x + BP.t / 2 + 0.012, BP.y + 0.165 - r * 0.11, (1 - k) * 0.135);
    S.rotation.z = -Math.PI / 2;
    A.add(S);
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.1, metalness: 0.05 });
    add(S, new THREE.CylinderGeometry(1, 1, 1, 24), [mat, new THREE.MeshStandardMaterial({ map: stoneTexture(color, NAMES_HE[i]), roughness: 0.08, metalness: 0.05 }), mat]).scale.set(0.036, 0.022, 0.044);
    piece('stones', S, 'grow');
  });
  const C = new THREE.Group();
  A.add(C);
  for (const s of [-1, 1]) {
    const top = new THREE.Vector3(BP.x + 0.02, BP.y + BP.half + 0.01, s * (BP.half - 0.03));
    add(C, new THREE.TorusGeometry(0.022, 0.006, 6, 14).rotateY(Math.PI / 2), MAT.gold, top.x, top.y, top.z);
    const sh = SHOULDER(s);
    for (const tw of [-1, 1]) {
      const pts = [];
      for (let k = 0; k <= 16; k++) {
        const u = k / 16;
        const p = new THREE.Vector3().lerpVectors(top, sh, u);
        p.x += Math.sin(Math.PI * u) * 0.05 + Math.sin(u * 40 + tw * 1.6) * 0.006;
        p.z += Math.cos(u * 40 + tw * 1.6) * 0.006;
        pts.push([p.x, p.y, p.z]);
      }
      add(C, tubeThrough(pts, 0.006, 48), MAT.gold);
    }
    const lo = new THREE.Vector3(BP.x - 0.01, BP.y - BP.half + 0.03, s * (BP.half - 0.05));
    const ep = new THREE.Vector3(0.39 * DEPTH + 0.01, 1.68, s * (BP.half - 0.05));
    add(C, new THREE.TorusGeometry(0.018, 0.005, 6, 12).rotateY(Math.PI / 2), MAT.gold, lo.x, lo.y, lo.z);
    add(C, new THREE.TorusGeometry(0.018, 0.005, 6, 12).rotateY(Math.PI / 2), MAT.gold, ep.x, ep.y, ep.z);
    rod(C, lo, ep, 0.008, MAT.yarn[0]);
  }
  piece('chains', C, 'grow');
  for (const s of [-1, 1]) piece('urim', add(A, new THREE.CapsuleGeometry(0.018, 0.05, 4, 10), MAT.urim, BP.x, BP.y - 0.02, s * 0.07), 'lower', 0.9);
}
piece('turban', turban(aaron), 'lower', 1.6);
{
  const Pl = new THREE.Group();
  aaron.head.add(Pl);
  const r = 0.27, arc = 0.8;
  add(Pl, new THREE.CylinderGeometry(r, r, 0.072, 24, 1, true, Math.PI / 2 - arc / 2, arc), MAT.plate, -0.015, 3.29, 0).castShadow = false;
  add(Pl, new THREE.TorusGeometry(r - 0.004, 0.007, 6, 48).rotateX(Math.PI / 2), MAT.yarn[0], -0.015, 3.305, 0).scale.z = 0.94;
  piece('plate', Pl, 'lower', 0.8);
}

// "A man who stands ready" leads the goat away (16:21); "the one who burns"
// the sin offerings outside the camp (16:28). Plain tunics and cloaks.
function layman(look) {
  const fig = figure(look);
  tunic(fig, MAT.plainTunic);
  add(squashed(fig.G), lathe([[0.42, 0.9], [0.38, 1.6], [0.36, 2.3], [0.41, 2.6], [0.26, 2.78]]), look.cloak);
  add(fig.head, new THREE.SphereGeometry(0.235, 16, 10, 0, Math.PI * 2, 0, Math.PI / 1.75), MAT.headCloth, -0.02, 3.15, 0).scale.set(1, 1.15, 0.97);
  return fig;
}
const man = layman({ beard: '#3a2a1e', hair: '#2e2218', skin: '#a8754f', long: 0.5, cloak: MAT.cloak });
const burner = layman({ beard: '#4a3424', hair: '#3a2a1e', skin: '#9f6c48', long: 0.35, cloak: new THREE.MeshStandardMaterial({ color: 0x5c4a36, roughness: 1, side: THREE.DoubleSide }) });

// ---------------------------------------------------------------- animals
// Schematic animals facing local +X: a young bull, two rams and two male
// goats (16:3, 5). Legs hang from the body so they can swing and fold; the
// head nods from the neck. `down` (0..1) folds the legs and lowers the body,
// which is how the slaughter is shown.
const BEASTS = {
  bull: { len: 4, depth: 1.45, width: 1.2, back: 2.4, leg: 0.12, stride: 2.6, coat: '#6b3d22', legs: '#4f2c18', muzzle: '#8a6a58', horn: '#d8ccb2' },
  ram: { len: 2.3, depth: 0.95, width: 0.86, back: 1.6, leg: 0.055, stride: 1.6, coat: '#e8dfca', legs: '#cdb894', muzzle: '#d5c2a0', horn: '#bba98a', wool: true },
  goat: { len: 2.1, depth: 0.8, width: 0.62, back: 1.48, leg: 0.05, stride: 1.5, coat: '#2c2521', legs: '#231d19', muzzle: '#3a302a', horn: '#5b4b3b' },
};
const coatMats = {};
const coatMat = (c) => (coatMats[c] ??= new THREE.MeshStandardMaterial({ color: c, roughness: 1 }));
function beast(kind, coat) {
  const S = BEASTS[kind];
  const G = new THREE.Group();
  scene.add(G);
  const B = new THREE.Group();
  G.add(B);
  const cm = coatMat(coat ?? S.coat), lm = coatMat(S.legs), mm = coatMat(S.muzzle), hm = coatMat(S.horn);
  const cy = S.back - S.depth / 2, hl = S.len / 2;
  const blob = () => (S.wool ? lumpy(new THREE.SphereGeometry(1, 26, 16), 0.07, 8) : new THREE.SphereGeometry(1, 26, 16));
  // Shoulders, barrel and hindquarters.
  add(B, blob(), cm, hl * 0.42, cy + S.depth * 0.06, 0).scale.set(hl * 0.55, S.depth * 0.56, S.width * 0.5);
  add(B, blob(), cm, 0, cy, 0).scale.set(hl * 0.75, S.depth * 0.5, S.width * 0.52);
  add(B, blob(), cm, -hl * 0.5, cy + S.depth * 0.02, 0).scale.set(hl * 0.5, S.depth * 0.5, S.width * 0.48);
  const top = cy - S.depth * 0.18;
  const legs = [];
  for (const fx of [1, -1]) {
    for (const s of [-1, 1]) {
      const L = new THREE.Group();
      L.position.set(fx * hl * 0.6, top, s * S.width * 0.3);
      B.add(L);
      const r = S.leg;
      add(L, new THREE.CylinderGeometry(r * 1.9, r, top * 0.5, 10).translate(0, -top * 0.25, 0), S.wool ? lm : cm);
      add(L, new THREE.CylinderGeometry(r * 0.85, r * 0.95, top * 0.5, 8).translate(0, -top * 0.73, 0), lm);
      add(L, new THREE.CylinderGeometry(r * 1.05, r * 1.2, r * 1.4, 8).translate(0, -top + r * 0.7, 0), MAT.hoof);
      legs.push({ L, front: fx > 0, s });
    }
  }
  const N = new THREE.Group();
  N.position.set(hl * 0.78, cy + S.depth * 0.15, 0);
  B.add(N);
  const eyes = (x, y, z) => { for (const s of [-1, 1]) add(N, new THREE.SphereGeometry(0.03, 8, 6), MAT.eye, x, y, s * z); };
  let tip;
  if (kind === 'bull') {
    add(N, new THREE.SphereGeometry(1, 20, 14), cm, 0.25, 0, 0).scale.set(0.55, 0.5, 0.42);
    add(N, new THREE.SphereGeometry(1, 16, 12), cm, 0.42, -0.42, 0).scale.set(0.36, 0.3, 0.12);   // dewlap
    const h = add(N, new THREE.SphereGeometry(1, 20, 14), cm, 0.85, -0.05, 0);
    h.scale.set(0.42, 0.28, 0.25);
    h.rotation.z = -0.75;
    add(N, new THREE.SphereGeometry(0.19, 14, 10), mm, 1.1, -0.34, 0).scale.set(1, 0.8, 1.15);
    for (const s of [-1, 1]) {
      add(N, tubeThrough([[0.74, 0.2, s * 0.17], [0.76, 0.3, s * 0.4], [0.9, 0.44, s * 0.48]], 0.045, 10), hm);
      add(N, new THREE.SphereGeometry(1, 10, 8), cm, 0.68, 0.14, s * 0.32).scale.set(0.06, 0.08, 0.16);
    }
    eyes(0.92, 0.08, 0.2);
    tip = new THREE.Vector3(0.85, 0.2, 0);
    add(B, tubeThrough([[-hl * 0.98, cy + S.depth * 0.35, 0], [-hl * 1.05, cy, 0], [-hl * 1.02, 0.75, 0]], 0.035, 12), cm);
    add(B, new THREE.SphereGeometry(0.09, 10, 8), MAT.hoof, -hl * 1.02, 0.68, 0).scale.y = 1.6;
  } else if (kind === 'ram') {
    add(N, lumpy(new THREE.SphereGeometry(1, 18, 12), 0.07, 8), cm, 0.16, 0.08, 0).scale.set(0.34, 0.32, 0.26);
    const h = add(N, new THREE.SphereGeometry(1, 18, 12), mm, 0.48, 0.2, 0);
    h.scale.set(0.25, 0.15, 0.13);
    h.rotation.z = -0.6;
    add(N, new THREE.SphereGeometry(0.08, 12, 8), mm, 0.66, 0.05, 0);
    // Horns curling round from the top of the head, back, down and forward.
    for (const s of [-1, 1]) {
      const pts = [];
      for (let k = 0; k <= 14; k++) {
        const u = k / 14, a = Math.PI / 2 + u * Math.PI * 1.6, r = 0.17 * (1 - 0.55 * u);
        pts.push([0.36 + Math.cos(a) * r, 0.24 + Math.sin(a) * r * 0.9, s * (0.13 + 0.12 * u)]);
      }
      add(N, tubeThrough(pts, 0.04, 28), hm);
      add(N, new THREE.SphereGeometry(1, 8, 6), mm, 0.4, 0.18, s * 0.15).scale.set(0.04, 0.03, 0.08);
    }
    eyes(0.55, 0.26, 0.1);
    tip = new THREE.Vector3(0.45, 0.32, 0);
    add(B, lumpy(new THREE.SphereGeometry(1, 12, 10), 0.08, 6), cm, -hl * 0.98, cy - 0.05, 0).scale.set(0.14, 0.24, 0.16);
  } else {
    rod(N, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.34, 0.36, 0), 0.14, cm, 10);
    const h = add(N, new THREE.SphereGeometry(1, 18, 12), cm, 0.48, 0.42, 0);
    h.scale.set(0.23, 0.12, 0.1);
    h.rotation.z = -0.75;
    add(N, new THREE.SphereGeometry(0.065, 12, 8), mm, 0.62, 0.25, 0);
    for (const s of [-1, 1]) {
      // Long hanging ears and horns curving back.
      const ear = add(N, new THREE.BoxGeometry(0.05, 0.26, 0.09).translate(0, -0.13, 0), cm, 0.4, 0.44, s * 0.12);
      ear.rotation.x = s * 0.35;
      add(N, tubeThrough([[0.42, 0.52, s * 0.05], [0.32, 0.72, s * 0.09], [0.12, 0.78, s * 0.13]], 0.025, 10), hm);
    }
    add(N, new THREE.ConeGeometry(0.045, 0.2, 6).rotateZ(Math.PI), cm, 0.56, 0.13, 0);   // beard
    eyes(0.55, 0.47, 0.085);
    tip = new THREE.Vector3(0.45, 0.52, 0);
    add(B, new THREE.ConeGeometry(0.05, 0.22, 6), cm, -hl * 0.98, cy + S.depth * 0.42, 0).rotation.z = 0.7;
  }
  return { G, B, N, legs, S, top, tip, kind };
}
function poseBeast(b, { dist, moving }, down) {
  const sw = moving ? Math.sin((dist * Math.PI * 2) / b.S.stride) : 0;
  const d = smooth(clamp01(down));
  for (const { L, front, s } of b.legs) {
    const k = front ? s : -s;   // diagonal pairs move together
    L.rotation.z = lerp(k * sw * 0.42, front ? -1.5 : 1.5, d);
  }
  b.B.position.y = -d * (b.top - b.S.leg * 1.4) + (moving ? Math.abs(sw) * 0.02 : 0);
  b.N.rotation.z = -0.5 * d;
}

const bull = beast('bull');
const ramA = beast('ram');
const ramP = beast('ram', '#efe7d4');
const goatL = beast('goat');
const goatS = beast('goat', '#3e3027');

// ---------------------------------------------------------------- walks
// Everyone who moves has a start and a list of walks. Each walk is a group
// (named in STOPS[].build) and a smooth path from where the last one ended;
// its progress moves them along it, so jumping between stops puts everyone
// in the right place. A walk's length sets how long it takes.
const actors = {};
function actor(key, obj, at, face) {
  actors[key] = { key, obj, start: { ...at, yaw: yawTo(at, face) }, walks: [] };
}
function walk(key, group, pts, face, weight) {
  const a = actors[key];
  const last = a.walks.at(-1);
  const from = last ? last.end : a.start;
  const curve = new THREE.CatmullRomCurve3([from, ...pts].map(plan), false, 'centripetal');
  const len = curve.getLength();
  const end = pts.at(-1);
  const tan = curve.getTangentAt(1);
  const w = { group, curve, len, from, before: last ? last.before + last.len : 0, end: { ...end, yaw: face ? yawTo(end, face) : Math.atan2(-tan.z, tan.x) } };
  a.walks.push(w);
  if (!groups[group]) marker(group);
  const g = groups[group];
  g.walk = true;
  g.weight = Math.max(g.weight ?? 0, weight ?? len / WALK_UNIT);
  (g.actors ??= []).push(key);
}
const _pt = new THREE.Vector3(), _tan = new THREE.Vector3();
// Where someone is on a curve, s cubits along it, turning from `fromYaw` at the start to `endYaw` at the end.
function onCurve(curve, len, s, fromYaw, endYaw) {
  const u = len > 0.01 ? clamp01(s / len) : 1;
  curve.getPointAt(u, _pt);
  curve.getTangentAt(u, _tan);
  let yaw = lerpAngle(fromYaw, Math.atan2(-_tan.z, _tan.x), smooth(clamp01(s / 0.9)));
  if (endYaw != null) yaw = lerpAngle(endYaw, yaw, smooth(clamp01((len - s) / 0.9)));
  return { x: _pt.x, z: _pt.z, yaw };
}
function locate(a) {
  let w = null, p = 0;
  for (const wk of a.walks) {
    const q = groupP(wk.group);
    if (q > 0) { w = wk; p = q; }
  }
  if (!w) return { x: a.start.x, z: -a.start.n, yaw: a.start.yaw, moving: false, dist: 0 };
  const s = walkEase(p) * w.len;
  return { ...onCurve(w.curve, w.len, s, w.from.yaw, w.end.yaw), moving: p < 1 && w.len > 0.05, dist: w.before + s };
}

// Aaron goes between the basin, the doorway, the altar and the ark. Inside the
// tent he keeps to the south of the gold altar and goes through the doorway
// and the veil between their pillars.
const BULL_AT = P(25, 6.2), GOAT_AT = P(28.6, 6.4);   // north of the altar (1:11)
const ARK_STAND = P(-21.3, 0);                          // inside the veil, before the ark
const TO_ARK = [P(1.2, -1.2), P(-1.5, -1.2), P(-12, -1.1), P(-16.2, -1.6), P(-18.8, -1.3), P(-20.3, 0), ARK_STAND];
const FROM_ARK = [P(-20.3, 0), P(-18.8, -1.3), P(-16.2, -1.6), P(-12, -1.1), P(-1.5, -1.2), P(1.2, -1.2)];
const NORTH_WAY = [P(7, 2), P(14, 3.2)];               // from the doorway to the north side of the altar
const WEST = P(-40, 0);
actor('aaron', aaron, P(10.4, -1.6), LAVER);
walk('aaron', 'toDoor', [P(7.5, -1.2), P(3.8, 0)], P(10, 0));
walk('aaron', 'toBull', [...NORTH_WAY, P(22.4, 4.2)], P(22.6, 6.2));
walk('aaron', 'toFire', [P(21.4, 1.8), P(21.7, 0)], ALTAR);
walk('aaron', 'toArk', [P(17, -2.6), P(9, -2.4), P(4, -1.4), ...TO_ARK], WEST);
walk('aaron', 'outBull', [...FROM_ARK, ...NORTH_WAY, P(22.4, 4.2)], P(22.6, 6.2));
walk('aaron', 'inBull', [...NORTH_WAY.slice().reverse(), ...TO_ARK], WEST);
walk('aaron', 'outGoat', [...FROM_ARK, ...NORTH_WAY, P(20, 3.8), P(27, 4.6)], P(27.4, 6.4));
walk('aaron', 'inGoat', [P(20, 3.8), ...NORTH_WAY.slice().reverse(), ...TO_ARK], WEST);
// Round the altar, a horn at each corner, then to its south side to sprinkle it.
const CORNER = (h, sx, sn) => P(h.x + sx * 0.75, h.n + sn * 0.85);
walk('aaron', 'toNW', [...FROM_ARK, P(7, 2), P(14, 3.1), CORNER(HORNS.NW, -1, 1)], HORNS.NW);
walk('aaron', 'toNE', [P(25, 3.25), CORNER(HORNS.NE, 1, 1)], HORNS.NE);
walk('aaron', 'toSE', [P(28.5, 0), CORNER(HORNS.SE, 1, -1)], HORNS.SE);
walk('aaron', 'toSW', [P(25, -3.3), CORNER(HORNS.SW, -1, -1)], HORNS.SW);
walk('aaron', 'toSouth', [P(25, -3.7)], ALTAR);
walk('aaron', 'toLive', [P(18, -4.3), P(12, -3.4), P(6.5, -3.4), P(3.2, -2.8), P(4.0, -1.5)], P(10, -1.5));
walk('aaron', 'toTent', [P(1.4, -1.2), P(-3, -1.9), P(-5.2, -2.2)], P(-3.5, -6));
walk('aaron', 'toAltar', [P(-3, -1.9), P(-1.5, -1.2), P(1.2, -1.2), P(6, -2.6), P(14, -3.6), P(25, -3.8)], ALTAR);

// The offerings come in through the gate, each in its own lane, and wait north
// of the altar; the goats go to the doorway for the lots, and the LORD's goat
// goes back.
actor('bull', bull, P(57, 2.5), WEST);
actor('ramA', ramA, P(58.5, 5.5), WEST);
actor('ramP', ramP, P(60, 8), WEST);
actor('goatL', goatL, P(57.5, -0.5), WEST);
actor('goatS', goatS, P(59, -3), WEST);
walk('bull', 'bring', [P(40, 2.5), P(30, 6), BULL_AT], WEST);
walk('ramA', 'bring', [P(40, 5.5), P(28.5, 8.8), P(20.8, 8.6)], WEST);
walk('ramP', 'bring', [P(40, 8.6), P(30, 9.6), P(23.8, 9.4)], WEST);
walk('goatL', 'bring', [P(40, -0.2), P(31.5, 5.5), GOAT_AT], WEST);
walk('goatS', 'bring', [P(40, -2.6), P(32.5, 4.6), P(31.4, 8.3)], WEST);
walk('goatL', 'present', [P(28.2, 4.2), P(21, 3.8), P(13.5, 3), P(8.5, 1.6), P(6.3, 1.5)], WEST);
walk('goatS', 'present', [P(30.2, 3.5), P(29.6, -3.8), P(16, -4.2), P(9.4, -2.6), P(6.3, -1.5)], WEST);
walk('goatL', 'goatBack', [P(13.5, 3), P(21, 3.8), P(28.2, 4.4), GOAT_AT], WEST);

// The man who leads the goat away waits inside the gate. He walks to the goat,
// then leads it out along LEAD_PTS, a rope's length ahead.
const LEAD_GAP = 1.9;
const lead = { curve: new THREE.CatmullRomCurve3(LEAD_PTS.map(plan), false, 'centripetal') };
lead.len = lead.curve.getLength();
{
  let best = Infinity;
  for (let i = 0; i <= 4000; i++) {
    lead.curve.getPointAt(i / 4000, _pt);
    const d = Math.hypot(_pt.x - LEAD_END.x, -_pt.z - LEAD_END.n);
    if (d < best) { best = d; lead.end = (i / 4000) * lead.len; }
  }
}
lead.curve.getPointAt(LEAD_GAP / lead.len, _pt);
actor('man', man, P(42, -5.5), WEST);
walk('man', 'manToGoat', [P(30, -5.2), P(16, -5), P(10.6, -3.6), P(_pt.x, -_pt.z)], LEAD_PTS[0]);
marker('lead');
groups.lead.walk = true;
groups.lead.weight = 6;
groups.lead.actors = ['man', 'goatS'];
// s cubits along the way out, for whoever is `back` cubits behind the man.
function leading(back) {
  const p = groupP('lead');
  if (p <= 0) return null;
  const s = Math.max(0, LEAD_GAP + (lead.end - LEAD_GAP) * walkEase(p, 0.1, false) + tour.leadExtra - back);
  const fromYaw = actors[back ? 'goatS' : 'man'].walks.at(-1).end.yaw;
  const k = smooth(clamp01((s - (back ? 0 : LEAD_GAP)) / 1.4));
  const at = onCurve(lead.curve, lead.len, s, fromYaw, null);
  at.yaw = lerpAngle(fromYaw, at.yaw, k);
  return { ...at, moving: p < 1 || (tour.phase === 'hold' && tour.i === LEAD_STOP && tour.playing), dist: s };
}

// The one who burns the sin offerings stands by the fire outside the camp.
actor('burner', burner, P(PYRE.x - 2.6, PYRE.n - 2.2), PYRE);

// Places everyone, with steps while walking, and the animals' legs.
function placeActors() {
  for (const a of Object.values(actors)) {
    const at = (a.key === 'man' && leading(0)) || (a.key === 'goatS' && leading(LEAD_GAP)) || locate(a);
    a.at = at;
    const G = a.obj.G;
    G.position.set(at.x, 0, at.z);
    G.rotation.y = at.yaw;
    if (a.obj.arms) {
      const step = at.moving ? Math.sin((at.dist * Math.PI) / 1.5) : 0;
      G.position.y = Math.abs(step) * 0.035;
      a.obj.step = step;
      a.obj.legs.forEach((L, i) => { L.rotation.z = (i ? 1 : -1) * step * 0.32; });
    }
  }
  // Slaughtered, the animals lie down; burnt, they go.
  const gone = (key) => 1 - smooth(clamp01((groupP(key) - 0.5) * 2));
  poseBeast(bull, actors.bull.at, groupP('bullDown'));
  poseBeast(goatL, actors.goatL.at, groupP('goatDown'));
  poseBeast(goatS, actors.goatS.at, 0);
  poseBeast(ramA, actors.ramA.at, groupP('rams') * 2);
  poseBeast(ramP, actors.ramP.at, groupP('rams') * 2);
  for (const b of [bull, goatL]) b.G.scale.setScalar(Math.max(0.001, 1 - smooth(groupP('carry'))));
  for (const b of [ramA, ramP]) b.G.scale.setScalar(Math.max(0.001, gone('rams')));
  for (const b of [bull, goatL, ramA, ramP]) b.G.visible = b.G.scale.x > 0.002;
  // The goat and the man are out of sight once Aaron goes back into the tent.
  goatS.G.visible = man.G.visible = groupP('toTent') === 0;
  burner.G.visible = groupP('pyre') > 0;
}

// ---------------------------------------------------------------- things carried
// A bronze jug for bathing (the text doesn't say how he bathed), and its water.
const jug = new THREE.Group();
{
  add(jug, lathe([[0.001, 0], [0.07, 0.005], [0.1, 0.06], [0.095, 0.13], [0.05, 0.19], [0.045, 0.23], [0.06, 0.25]], 18), MAT.bronze.clone()).material.side = THREE.DoubleSide;
  add(jug, new THREE.CylinderGeometry(0.012, 0.02, 0.12, 8).rotateZ(-1.0), MAT.bronze, 0.09, 0.2, 0);
  add(jug, new THREE.TorusGeometry(0.06, 0.012, 6, 14, Math.PI), MAT.bronze, -0.07, 0.15, 0).rotation.z = Math.PI / 2;
  jug.visible = false;
  scene.add(jug);
}
const SPOUT = new THREE.Vector3(0.14, 0.24, 0);
const waterMat = new THREE.MeshStandardMaterial({ color: 0xcfeaf2, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.7, depthWrite: false });
const stream = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.018, 1, 6, 1, true).translate(0, 0.5, 0), waterMat);
stream.visible = false;
scene.add(stream);
const drops = [];
for (let i = 0; i < 36; i++) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(0.014, 6, 4), waterMat);
  m.visible = false;
  scene.add(m);
  drops.push({ m, phase: i / 36, a: rand() * Math.PI * 2, r: 0.25 + rand() * 0.2 });
}
const wet = add(scene, new THREE.CircleGeometry(0.75, 24).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({
  color: 0x8a7350, roughness: 0.35, transparent: true, opacity: 0, depthWrite: false,
}), 10.4, 0.025, 1.6);
wet.castShadow = false;
for (const k of ['bathe', 'lots', 'coals', 'cloud', 'bullDown', 'goatDown', 'sprinkle1', 'sprinkle2', 'sprinkle3', 'horn1', 'horn2', 'horn3', 'horn4', 'hands', 'rams', 'burn', 'carry']) marker(k);

// The two lots, plain stones (the text doesn't describe them), thrown down in front of the goats.
const LOT_AT = [P(5.05, 1.55), P(5.05, -1.55)];
const lots = LOT_AT.map(() => {
  const m = add(scene, new THREE.CylinderGeometry(0.07, 0.08, 0.035, 12), MAT.lot);
  m.visible = false;
  return m;
});

// The firepan of bronze with its coals (16:12), and the incense in Aaron's other hand.
const firepan = new THREE.Group();
{
  add(firepan, lathe([[0.001, 0], [0.15, 0.005], [0.17, 0.05], [0.175, 0.07]], 20), MAT.bronze.clone()).material.side = THREE.DoubleSide;
  add(firepan, new THREE.CylinderGeometry(0.014, 0.014, 0.42, 6).rotateZ(Math.PI / 2), MAT.bronze, -0.36, 0.05, 0);
  for (let i = 0; i < 9; i++) add(firepan, new THREE.DodecahedronGeometry(0.035 + rand() * 0.02), MAT.coals, (rand() - 0.5) * 0.18, 0.04, (rand() - 0.5) * 0.18).userData.coal = true;
  firepan.visible = false;
  scene.add(firepan);
}
const PAN_DOWN = v3(-22.4, 1.05, 0.02);      // set down before the ark (a guess)
const incense = add(scene, new THREE.SphereGeometry(0.075, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), MAT.incense);
incense.visible = false;
const panSmoke = smoke(new THREE.Vector3(), { count: 18, size: 0.13, rise: 3.2, color: 0xe8e4dc, speed: 0.12, spread: 0.4, alpha: 0.6, amount: () => clamp01((groupP('cloud') - 0.25) / 0.2) });
// The cloud of incense over the cover (16:13).
smoke(v3(ARK.x + 0.3, ARK.n, 0.9), { count: 46, size: 0.55, rise: 4.5, color: 0xece8de, speed: 0.035, spread: 0.6, area: [3.6, 2.8], alpha: 0.5, amount: () => smooth(clamp01((groupP('cloud') - 0.3) / 0.5)) });

// The blood, kept in a bowl by the bull (the text doesn't name the vessel), carried in Aaron's left hand.
const bowl = new THREE.Group();
{
  add(bowl, lathe([[0.001, 0], [0.1, 0.01], [0.15, 0.06], [0.17, 0.11]], 20), MAT.bronze.clone()).material.side = THREE.DoubleSide;
  add(bowl, new THREE.CircleGeometry(0.15, 20).rotateX(-Math.PI / 2), MAT.blood, 0, 0.085, 0);
  bowl.visible = false;
  scene.add(bowl);
}
const BOWL_DOWN = v3(22.75, 5.15, 0.02);

// Where the blood is sprinkled: on the east side of the cover, then seven
// times in front of it (16:14-15); seven times on the altar (16:19).
function spot(pos, up = true, r = 0.05) {
  const m = add(scene, new THREE.CircleGeometry(r + rand() * 0.03, 12), MAT.blood, pos.x, pos.y, pos.z);
  if (up) m.rotation.x = -Math.PI / 2;
  m.castShadow = false;
  m.visible = false;
  return m;
}
const ARK_EAST = ARK.x + ARK_L / 2;
function sprinkles(cover, x0, dn) {
  const list = [];
  if (cover != null) list.push({ target: v3(ARK_EAST - 0.25, cover, COVER_Y + 0.005), high: true });
  for (let k = 0; k < 7; k++) list.push({ target: v3(x0 + (k % 2) * 0.14, -0.6 + k * 0.2 + dn, 0.035) });
  return list;
}
const SPRINKLES = {
  sprinkle1: sprinkles(0.15, -22.95, 0),
  sprinkle2: sprinkles(-0.2, -22.7, 0.08),
  sprinkle3: Array.from({ length: 7 }, (_, k) => ({ target: new THREE.Vector3(ALTAR.x - 1.4 + k * 0.47, 1.85 + (k % 2) * 0.32 + (k % 3) * 0.08, 2.512), face: true })),
};
for (const list of Object.values(SPRINKLES)) {
  for (const s of list) s.mesh = spot(s.target, !s.face, s.high ? 0.06 : 0.05);
}
const bloodDrop = add(scene, new THREE.SphereGeometry(0.025, 8, 6), MAT.blood);
bloodDrop.visible = false;

// A rope from the man's hand to the goat.
const rope = add(scene, new THREE.CylinderGeometry(0.012, 0.012, 1, 5).translate(0, 0.5, 0), MAT.wood);
rope.visible = false;

// The fire outside the camp, with the remains of the bull and the goat on it (16:27).
{
  const y = ground(PYRE.x, PYRE.n);
  const F = placed(PYRE.x, PYRE.n, y);
  for (let k = 0; k < 9; k++) {
    const log = add(F, cylX(0.16, 2.4 + rand()), MAT.char, (rand() - 0.5) * 1.6, 0.16 + (k % 3) * 0.22, (rand() - 0.5) * 1.6);
    log.rotation.y = rand() * Math.PI;
  }
  add(F, new THREE.SphereGeometry(1, 14, 10), coatMat('#3a2418'), -0.3, 0.75, 0.2).scale.set(1.3, 0.5, 0.65);
  add(F, new THREE.SphereGeometry(1, 12, 8), coatMat('#1f1a17'), 0.8, 0.7, -0.45).scale.set(0.7, 0.35, 0.4);
  piece('pyre', F, 'grow');
  const L = placed(PYRE.x, PYRE.n, y);
  for (let k = 0; k < 8; k++) flame(L, (rand() - 0.5) * 2, 0.5, (rand() - 0.5) * 2, 1.4 + rand() * 1.2, 0.3 + rand() * 0.2);
  piece('pyre', L, 'grow');
  smoke(v3(PYRE.x, PYRE.n, y + 1.6), { count: 30, size: 0.9, rise: 34, color: 0x7d776f, speed: 0.07, spread: 1.6, amount: () => groupP('pyre') });
}

// Nothing has happened until its stop.
function applyStatic(i) {
  stops.forEach((st, j) => st.build.forEach((k) => setGroup(k, j < i ? 1 : 0)));
  tour.leadExtra = 0;
}

// ---------------------------------------------------------------- what Aaron does
// Bends an arm so its hand reaches (f forward, y up, z right) in its figure's
// frame, blended with the pose it has by `w`. Two joints in the plane of the arm.
const L1 = 0.72, L2 = 0.68;
function reachArm({ S, E, s }, f, y, z, w) {
  if (w <= 0) return;
  const dy = 2.55 - y, d = Math.min(L1 + L2 - 0.02, Math.max(0.3, Math.hypot(f, dy)));
  const th = Math.atan2(f, dy);
  const a = Math.acos(clamp01((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d)));
  const g = Math.acos(Math.max(-1, Math.min(1, (L1 * L1 + L2 * L2 - d * d) / (2 * L1 * L2))));
  S.rotation.z = lerp(S.rotation.z, th - a, w);
  E.rotation.z = lerp(E.rotation.z, Math.PI - g, w);
  S.rotation.x = lerp(S.rotation.x, -Math.atan2(z - s * 0.36, d), w);
}
// The same, to a point in the world.
function reachTo(fig, arm, world, w) {
  fig.G.updateMatrixWorld(true);
  const l = fig.G.worldToLocal(_tmp.copy(world));
  reachArm(arm, l.x, l.y, l.z, w);
}
const handOf = (arm, out) => { arm.E.updateMatrixWorld(true); return arm.E.localToWorld(out.set(0, -0.68, 0)); };
// Piecewise-smooth keyframes: [[p, value], ...], value a number or an array.
function keyed(keys, p) {
  let i = 0;
  while (i < keys.length - 2 && p > keys[i + 1][0]) i++;
  const [p0, a] = keys[i], [p1, b] = keys[i + 1];
  const k = smooth(clamp01((p - p0) / (p1 - p0)));
  return Array.isArray(a) ? a.map((v, j) => lerp(v, b[j], k)) : lerp(a, b, k);
}
const busy = (k) => { const p = groupP(k); return p > 0 && p < 1; };
const done = (k) => groupP(k) >= 1;

// Bathing (16:4): he fills the jug at the basin and pours it over himself, twice.
const JUG_HAND = [[0, [0.45, 1.9, 0.3]], [0.1, [1.25, 2.45, 0.2]], [0.16, [1.3, 2.28, 0.2]], [0.22, [1.2, 2.45, 0.2]], [0.32, [0.22, 3.72, 0.16]], [0.58, [0.22, 3.72, 0.16]],
  [0.66, [1.25, 2.45, 0.2]], [0.7, [1.3, 2.28, 0.2]], [0.74, [1.2, 2.45, 0.2]], [0.82, [0.28, 3.68, 0.26]], [0.93, [0.28, 3.68, 0.26]], [1, [0.45, 1.9, 0.3]]];
const JUG_TILT = [[0, 0], [0.34, 0], [0.39, 1.95], [0.55, 1.95], [0.6, 0], [0.84, 0], [0.87, 1.95], [0.92, 1.95], [0.95, 0], [1, 0]];
// Sprinkling: dip a finger in the bowl, lift, flick; `high` is the cover, the rest the ground or the altar's side.
const flickHand = (f, high, side) => keyed([[0, [0.46, 1.92, -0.05]], [0.3, [0.46, 1.92, -0.05]], [0.45, [0.72, high ? 2.32 : 2.15, 0.1]],
  [0.56, [0.95, high ? 2.08 : side ? 2.0 : 1.72, 0.1]], [0.72, [0.9, high ? 2.08 : side ? 2.0 : 1.75, 0.1]], [1, [0.46, 1.92, -0.05]]], f);

const _hand = new THREE.Vector3(), _hand2 = new THREE.Vector3(), _w = new THREE.Vector3();
const _fwd = new THREE.Vector3();
let lookAt = null;    // where Aaron looks

function rest(fig) {
  for (const { S, E, s, pose } of fig.arms) {
    S.rotation.z = pose.fwd - s * fig.step * 0.22;
    S.rotation.x = -s * pose.out;
    E.rotation.z = pose.bend;
  }
}

function rite(time) {
  for (const a of [aaron, man, burner]) rest(a);
  const [left, right] = aaron.arms;
  const yaw = A.rotation.y;
  _fwd.set(Math.cos(yaw), 0, -Math.sin(yaw));
  lookAt = null;

  // Bathing at the basin.
  const bp = groupP('bathe');
  jug.visible = bp > 0 && bp < 1;
  stream.visible = false;
  for (const d of drops) d.m.visible = false;
  wet.material.opacity = 0.45 * smooth(clamp01((bp - 0.35) / 0.3));
  if (jug.visible) {
    const [f, y, z] = keyed(JUG_HAND, bp);
    reachArm(right, f, y, z, 1);
    handOf(right, _hand);
    const tilt = keyed(JUG_TILT, bp);
    jug.position.copy(_hand).add(_tmp.set(0, -0.14, 0));
    jug.rotation.set(0, yaw, -tilt, 'YXZ');
    jug.updateMatrixWorld(true);
    const spout = jug.localToWorld(_w.copy(SPOUT));
    if (tilt > 1.5) {
      // Over his head, down his body, to the ground.
      stream.visible = true;
      stream.position.set(spout.x, 3.42, spout.z);
      stream.scale.set(1, Math.max(0.01, spout.y - 3.42), 1);
      stream.quaternion.identity();
      for (const d of drops) {
        const u = (time * 1.4 + d.phase) % 1;
        d.m.visible = true;
        d.m.position.set(A.position.x + Math.cos(d.a) * d.r * 0.8, 2.6 - 2.55 * u * u, A.position.z + Math.sin(d.a) * d.r);
      }
    }
    lookAt = bp < 0.3 || (bp > 0.6 && bp < 0.8) ? v3(LAVER.x, LAVER.n, BASIN_Y) : null;
  }

  // The lots: raised in both hands, thrown down before the goats.
  const lp = groupP('lots');
  const lotsShown = lp > 0 && !done('toBull');
  lots.forEach((m, i) => {
    m.visible = lotsShown;
    if (!lotsShown) return;
    const arm = aaron.arms[i];
    const at = v3(LOT_AT[i].x, LOT_AT[i].n, 0.04);
    if (lp < 0.55) m.position.copy(handOf(arm, _hand)).add(_tmp.set(0, -0.06, 0));
    else if (lp < 0.75) {
      const k = (lp - 0.55) / 0.2;
      handOf(arm, _hand);
      m.position.lerpVectors(_hand, at, k).y += Math.sin(Math.PI * k) * 0.3;
    } else m.position.copy(at);
  });
  if (lp > 0 && lp < 1) {
    const w = keyed([[0, 0], [0.08, 1], [0.85, 1], [1, 0]], lp);
    const [f, y] = keyed([[0, [0.4, 1.8]], [0.2, [0.55, 2.75]], [0.42, [0.55, 2.75]], [0.55, [0.9, 1.95]], [0.75, [0.6, 1.8]], [1, [0.4, 1.8]]], lp);
    for (const arm of aaron.arms) reachArm(arm, f, y, arm.s * 0.32, w);
  }

  // The firepan: filled with coals at the altar, carried in, set down before the ark.
  const cp = groupP('coals'), cl = groupP('cloud');
  firepan.visible = cp > 0;
  if (firepan.visible) {
    for (const c of firepan.children) if (c.userData.coal) c.visible = cp > 0.42;
    let [f, y, z] = cp < 1 ? keyed([[0, [0.45, 1.8, 0.25]], [0.25, [1.05, 3.25, 0.2]], [0.6, [1.05, 3.25, 0.2]], [0.85, [0.45, 1.75, 0.22]], [1, [0.45, 1.75, 0.22]]], cp) : [0.45, 1.75, 0.22];
    const down = smooth(clamp01((cl - 0.45) / 0.17));
    if (cl > 0) [f, y, z] = keyed([[0, [0.45, 1.75, 0.22]], [0.45, [0.5, 1.75, 0.22]], [0.6, [0.62, 1.2, 0.25]], [0.75, [0.45, 1.75, 0.3]]], cl);
    const holding = cl < 0.62;
    if (holding || cl < 0.75) reachArm(right, f, y, z, holding ? 1 : 1 - smooth((cl - 0.62) / 0.13));
    if (holding) {
      handOf(right, _hand);
      firepan.position.copy(_hand).addScaledVector(_fwd, 0.36).y -= 0.03;
      firepan.rotation.set(0, yaw, 0);
    }
    if (cl > 0.45) {
      firepan.position.lerp(PAN_DOWN, down);
      if (cl >= 0.62) { firepan.position.copy(PAN_DOWN); firepan.rotation.set(0, Math.PI * 0.9, 0); }
    }
    panSmoke.origin.copy(firepan.position).y += 0.08;
    if (cp < 1) lookAt = cp > 0.15 && cp < 0.7 ? v3(ALTAR.x, ALTAR.n, ALTAR_H) : null;
  }
  // The incense, in his left hand, put on the coals.
  const inc = cp > 0.75 && cl < 0.35;
  incense.visible = inc;
  if (inc) {
    const w = smooth(clamp01((cp - 0.75) / 0.1));
    if (cl > 0.02) {
      _w.copy(firepan.position).add(_tmp.set(0, 0.22, 0));
      reachTo(aaron, left, _w, keyed([[0, 0], [0.08, 1], [0.3, 1], [0.35, 0]], cl) || 0.001);
      lookAt = firepan.position;
    } else reachArm(left, 0.38, 1.85, -0.14, w);
    handOf(left, _hand);
    incense.position.copy(_hand).add(_tmp.set(0, -0.02, 0));
    incense.scale.setScalar(Math.max(0.001, w * (1 - smooth(clamp01((cl - 0.1) / 0.22)))));
  }

  // The bowl of blood: by the bull, then in Aaron's left hand until the altar is sprinkled.
  const ob = groupP('outBull');
  bowl.visible = groupP('bullDown') > 0.6 && !done('sprinkle3');
  if (bowl.visible) {
    const take = smooth(clamp01((ob - 0.94) / 0.06));
    if (take > 0) {
      reachArm(left, 0.42, 1.82, -0.1, take);
      handOf(left, _hand);
      bowl.position.copy(BOWL_DOWN).lerp(_hand.add(_tmp.set(0, -0.06, 0)), take);
    } else bowl.position.copy(BOWL_DOWN);
  }

  // Sprinkling with his finger.
  bloodDrop.visible = false;
  for (const [key, list] of Object.entries(SPRINKLES)) {
    const p = groupP(key), N = list.length;
    list.forEach((s, i) => { s.mesh.visible = p >= (i + 0.78) / N; });
    if (p <= 0 || p >= 1) continue;
    const i = Math.min(N - 1, Math.floor(p * N)), f = p * N - i, s = list[i];
    const [hf, hy, hz] = flickHand(f, s.high, s.face);
    reachArm(right, hf, hy, hz, 1);
    lookAt = s.target;
    if (f > 0.55 && f < 0.78) {
      const k = (f - 0.55) / 0.23;
      handOf(right, _hand);
      bloodDrop.visible = true;
      bloodDrop.position.lerpVectors(_hand, s.target, k).y += Math.sin(Math.PI * k) * 0.25;
    }
  }

  // Blood on the four horns of the altar.
  ['NW', 'NE', 'SE', 'SW'].forEach((k, i) => {
    const p = groupP(`horn${i + 1}`), b = hornBlood[k];
    b.visible = p > 0.45;
    b.scale.setScalar(Math.max(0.001, smooth(clamp01((p - 0.45) / 0.15))));
    if (p > 0 && p < 1) {
      const h = HORNS[k];
      reachTo(aaron, right, _w.set(h.x, ALTAR_H + 0.3, -h.n), keyed([[0, 0], [0.35, 1], [0.65, 1], [1, 0]], p));
      lookAt = _w;
    }
  });

  // Both hands on the live goat's head (16:21), until the man comes for it.
  const hp = groupP('hands') * (1 - smooth(clamp01(groupP('manToGoat') * 2.5)));
  if (hp > 0) {
    goatS.N.updateMatrixWorld(true);
    const head = goatS.N.localToWorld(_hand2.copy(goatS.tip));
    for (const arm of aaron.arms) reachTo(aaron, arm, _w.copy(head).add(_tmp.set(0, 0.06, 0).addScaledVector(_tmp2.set(-_fwd.z, 0, _fwd.x), arm.s * 0.12)), smooth(clamp01(hp * 1.5)));
    lookAt = head;
  }

  // The man holds the rope.
  rope.visible = groupP('lead') > 0 && man.G.visible;
  if (rope.visible) {
    reachArm(man.arms[1], -0.12, 1.45, 0.42, 1);
    handOf(man.arms[1], _hand);
    goatS.N.updateMatrixWorld(true);
    stretch(rope, _hand, goatS.N.localToWorld(_hand2.copy(goatS.tip).add(_tmp.set(-0.15, -0.2, 0))));
  }
}
const _tmp2 = new THREE.Vector3();

// Everyone blinks now and then; Aaron looks at what he is doing.
let headsT = 0;
function heads(time) {
  const dt = Math.min(0.1, Math.max(0, time - headsT));
  headsT = time;
  [aaron, man, burner].forEach((f, i) => {
    f.blink -= dt;
    if (f.blink < -0.14) f.blink = 2 + rand() * 4;
    f.eyes.scale.y = f.blink < 0 ? 0.15 : 1;
    let yaw = 0, pitch = -0.05;
    const target = f === aaron ? lookAt : f === burner ? v3(PYRE.x, PYRE.n, 1) : null;
    if (target && !f.step) {
      f.G.updateMatrixWorld();
      const l = f.G.worldToLocal(_tmp.copy(target));
      yaw = Math.max(-0.7, Math.min(0.7, Math.atan2(-l.z, l.x)));
      pitch = Math.max(-0.45, Math.min(0.25, Math.atan2(l.y - 3.15, Math.hypot(l.x, l.z))));
    }
    yaw += 0.1 * Math.sin(time * 0.31 + i * 3) + 0.05 * Math.sin(time * 0.73 + i);
    pitch += 0.03 * Math.sin(time * 0.47 + i * 2);
    const k = 1 - Math.exp(-dt * 4);
    f.neck.rotation.y = lerp(f.neck.rotation.y, yaw, k);
    f.neck.rotation.z = lerp(f.neck.rotation.z, pitch, k);
  });
}

// ---------------------------------------------------------------- labels
const labels = [];
const FOLLOWS = { firepan };
for (const [key, spec] of Object.entries(LABELS)) {
  const el = document.createElement('div');
  el.className = `label ${spec.kind}`;
  const obj = new CSS2DObject(el);
  if (spec.x != null) obj.position.copy(v3(spec.x, spec.n, spec.y));
  scene.add(obj);
  labels.push({ key, spec, el, obj, follow: spec.actor ? actors[spec.actor]?.obj.G ?? FOLLOWS[spec.actor] : null, opacity: -1, text: null });
}
const visibleChain = (o) => { for (; o; o = o.parent) if (!o.visible) return false; return true; };
function labelText(lb) {
  const { name, after } = lb.spec;
  const s = tr(after && done(after.group) ? after.name : name);
  if (s !== lb.text) lb.el.textContent = lb.text = s;
}

function updateLabels(activeKeys) {
  const overview = tour.phase === 'intro' || tour.phase === 'finale';
  for (const lb of labels) {
    const { kind, group, inside, lift = 0 } = lb.spec;
    if (lb.follow) {
      lb.follow.getWorldPosition(lb.obj.position);
      lb.obj.position.y = (lb.follow === firepan ? lb.obj.position.y : 0) + lift;
    }
    labelText(lb);
    const d = camera.position.distanceTo(lb.obj.position);
    const active = activeKeys.has(lb.key);
    let o;
    if (kind === 'item' || kind === 'region') o = active || (tour.explore && d < 14) ? 1 : 0;
    else o = overview ? 0 : active ? 1 : clamp01((d - 9) / 4) * clamp01((70 - d) / 25);
    if (group && groupP(group) <= 0) o = 0;
    if (lb.follow && !visibleChain(lb.follow)) o = 0;
    if (inside && tour.cut < 0.5 && !tour.explore) o = 0;
    o = Math.round(o * 20) / 20;
    if (o !== lb.opacity) { lb.el.style.opacity = o; lb.opacity = o; }
    lb.el.classList.toggle('active', active && kind === 'item');
  }
}

// ---------------------------------------------------------------- tour
const stops = STOPS.map((st, i) => ({
  ...st, i, build: st.build ?? [],
  look: v3(st.look.x, st.look.n, st.look.y), pos: v3(st.cam.x, st.cam.n, st.cam.y),
  activeKeys: new Set(st.labels ?? []),
}));
const LEAD_STOP = stops.findIndex((st) => st.build.includes('lead'));
const FINALE_KEYS = new Set();

function overviewPos(a, finale = false) {
  const c = finale ? FINALE_C : OVERVIEW_C, r = finale ? 100 : 118;
  return new THREE.Vector3(c.x + Math.cos(a) * r, finale ? 50 : 72, c.z + Math.sin(a) * r);
}

const view = { pos: overviewPos(SOUTH_EAST), look: OVERVIEW_C.clone() };
const tour = {
  phase: 'intro',     // intro | fly | hold | finale
  i: -1,
  playing: false,
  speed: 1,
  holdT: 0, holdDur: 10,
  holdScale: HOLD_SCALE,
  orbitA: SOUTH_EAST,
  introT: 0,
  detached: false,
  explore: false,
  cut: 0,             // cutaway amount, eased towards the current stop's
  follow: 0,          // how much the camera follows someone walking
  focus: null,        // who it follows
  leadExtra: 0,       // how far the man and the goat have walked on during the hold
};
let fly = null;

function wordCount(st) { return `${tr(st.quote)} ${tr(st.note)}`.split(/\s+/).length; }

function startFly(toIndex, auto = false) {
  const to = stops[toIndex];
  const from = tour.i >= 0 ? stops[tour.i] : null;
  const sequential = from && toIndex === tour.i + 1 && !tour.detached;
  if (!sequential) applyStatic(toIndex);
  if (toIndex === LEAD_STOP) tour.leadExtra = 0;
  const fromPos = view.pos.clone(), fromLook = view.look.clone();
  const d = fromPos.distanceTo(to.pos);
  // Walks start at once (the camera follows them); other steps once the camera is close.
  const start = to.build.some((k) => groups[k]?.walk) ? 0.06 : 0.3;
  const units = to.build.reduce((sum, k) => sum + weightOf(k), 0);
  const travel = sequential ? Math.min(9, Math.max(6.5, d / 2)) : Math.min(7.5, Math.max(5, d / 6));
  const dur = to.dur ?? Math.max(travel, (units * SEC_PER_UNIT) / (0.92 - start));
  fly = { t: 0, dur, d, fromPos, fromLook, to, build: to.build, start, done: () => arrive(toIndex) };
  tour.i = toIndex;
  tour.phase = 'fly';
  // Moving on by itself, the end of the verse is read during the flight.
  if (!auto) narrator.stop();
  tour.detached = false;
  if (tour.holdScale > 0 || !sequential) hidePopup();
  showNext(to);
  updateProgress();
}

function flyToOverview(then, finale = false) {
  const to = { pos: overviewPos(tour.orbitA, finale), look: (finale ? FINALE_C : OVERVIEW_C).clone() };
  fly = { t: 0, dur: 7, d: view.pos.distanceTo(to.pos), fromPos: view.pos.clone(), fromLook: view.look.clone(), to, build: null, done: then };
  tour.phase = 'fly';
  hidePopup();
}

function stepFly(dt) {
  fly.t += dt / fly.dur;
  const u = clamp01(fly.t);
  const e = easeArrive(u);
  const arc = Math.min(8, 0.25 + fly.d * 0.15) * Math.sin(Math.PI * u);
  view.pos.lerpVectors(fly.fromPos, fly.to.pos, e).y += arc;
  view.look.lerpVectors(fly.fromLook, fly.to.look, easeInOut(clamp01(u * 1.15)));
  if (fly.build) {
    // Each step of the rite takes its share of the time, one after another.
    const p = clamp01((u - fly.start) / (0.92 - fly.start));
    const ws = fly.build.map(weightOf), total = ws.reduce((a, b) => a + b, 0);
    let acc = 0;
    fly.build.forEach((k, i) => { setGroup(k, clamp01((p * total - acc) / ws[i])); acc += ws[i]; });
  }
  if (u >= 1) {
    const then = fly.done;
    if (fly.build) fly.build.forEach((k) => setGroup(k, 1));
    fly = null;
    then();
  }
}

function holdFor(st) {
  return Math.min(16, Math.max(8, 4 + wordCount(st) * 0.13)) * tour.holdScale * (st.holdX ?? 1);
}

function arrive(i) {
  track('tour_stop', { stop: i + 1 });
  const st = stops[i];
  tour.phase = 'hold';
  tour.holdT = 0;
  tour.holdDur = holdFor(st);
  hideNext();
  showPopup(st);
  narrator.sayNext(verseLine(tr(st.ref), tr(st.quote)));
}

function finish(auto = false) {
  track('tour_complete');
  if (!auto) narrator.stop();
  tour.i = stops.length;
  applyStatic(stops.length);
  flyToOverview(() => {
    tour.phase = 'finale';
    showCard(FINALE, true);
    narrator.sayNext(verseLine(tr(FINALE.ref), tr(FINALE.quote)));
  }, true);
  updateProgress();
}

function next() {
  if (tour.explore) setExplore(false);
  if (tour.phase === 'intro' || tour.phase === 'finale') return begin();
  if (fly && fly.build) {
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
  track('tour_start');
  hideCard();
  applyStatic(0);
  tour.i = -1;
  tour.detached = true;
  setPlaying(true);
  startFly(0);
  narrator.say(titleLine(t('atonement.title'), t('atonement.subtitle')));
}

// Who the camera follows: from the start of the flight's first walk until
// its last walk is over, so it stays with them between walks.
function walker() {
  if (!fly?.build) return null;
  let started = false;
  for (const k of fly.build) {
    const g = groups[k];
    if (g?.p > 0) started = true;
    if (g?.walk && g.p < 1) return started ? actors[g.actors[0]] : null;
  }
  return null;
}

const _f = new THREE.Vector3();
function update(dt) {
  const t = dt * tour.speed;
  narrator.update(dt);
  const inTour = tour.phase === 'hold' || tour.phase === 'fly';
  if (!tour.explore) {
    // The tent is cut away at the stops inside it, and while the camera follows someone in it.
    const f = tour.focus?.obj.G.position;
    const followIn = tour.follow > 0.05 && f && f.x < TENT.east + 0.4 && f.x > OUT_W && Math.abs(f.z) < OUT_N;
    const wantCut = inTour && (stops[tour.i]?.cutaway || followIn) ? 1 : 0;
    tour.cut = lerp(tour.cut, wantCut, 1 - Math.exp(-dt * 2.2));
  }
  if (tour.explore) return;
  if (tour.phase === 'intro') {
    tour.introT += dt;
    tour.orbitA = SOUTH_EAST + 0.15 * Math.sin(tour.introT * 0.12);
  } else if (tour.phase === 'finale') tour.orbitA += dt * 0.03;
  if ((tour.phase === 'intro' || tour.phase === 'finale') && !fly) {
    view.pos.copy(overviewPos(tour.orbitA, tour.phase === 'finale'));
    view.look.copy(tour.phase === 'finale' ? FINALE_C : OVERVIEW_C);
  }
  if (fly) {
    if (tour.playing || !fly.build || tour.i >= stops.length) stepFly(fly.build ? t : dt);
  } else if (tour.phase === 'hold') {
    const st = stops[tour.i];
    if (tour.playing) {
      tour.holdT += t;
      // The man and the goat walk on into the wilderness.
      if (tour.i === LEAD_STOP) tour.leadExtra += t * 2.6;
    }
    const k = tour.holdDur ? clamp01(tour.holdT / tour.holdDur) : 1;
    view.pos.copy(st.pos).lerp(st.look, 0.07 * smooth(k));
    view.look.copy(st.look);
    timerBar.style.transform = `scaleX(${k})`;
    if (tour.playing && tour.holdT >= tour.holdDur && narrator.ready()) {
      if (tour.i >= stops.length - 1) finish(true);
      else startFly(tour.i + 1, true);
    }
  }
  // Follow whoever is walking, then ease back to the stop's view.
  const st = stops[tour.i];
  const w = st && st.follow !== false ? walker() : null;
  if (w) tour.focus = w;
  tour.follow = lerp(tour.follow, w ? 1 : 0, 1 - Math.exp(-dt * 1.3));
  if (tour.focus && tour.follow > 0.001 && inTour) {
    const off = (st && st.follow) || FOLLOW;
    const G = tour.focus.obj.G;
    _f.set(G.position.x, 1.7, G.position.z);
    view.look.lerp(_f, tour.follow);
    view.pos.lerp(_tmp.set(_f.x + off.x, off.y, _f.z - off.n), tour.follow);
  }
}

// Fades the coverings and the south wall, so the inside of the tent can be seen.
let cutShown = -1;
function applyCut(cut) {
  const c = Math.round(cut * 50) / 50;
  if (c === cutShown) return;
  const was = cutShown > 0;
  cutShown = c;
  for (const m of [...COVER_MATS, MAT.boardsSouth, MAT.goldSouth, MAT.silverSouth]) {
    m.transparent = c > 0;
    m.depthWrite = c === 0;
    m.opacity = lerp(1, COVER_MATS.includes(m) ? 0.04 : 0.06, c);
    if (was !== c > 0) m.needsUpdate = true;
  }
  for (const m of coverMeshes) m.castShadow = c < 0.5;
  for (const m of southMeshes) m.castShadow = c < 0.5;
}

// Flames flicker; smoke rises; everyone moves.
function updateEffects(time) {
  for (const f of flames) {
    if (!f.mesh.parent.parent?.visible) continue;
    const k = time * 9 + f.phase, b = f.boost();
    f.mesh.scale.set((0.85 + 0.15 * Math.sin(k * 1.3)) * b, (0.8 + 0.35 * Math.abs(Math.sin(k))) * b, (0.85 + 0.15 * Math.cos(k * 1.1)) * b);
    f.mesh.rotation.set(0.12 * Math.sin(k * 0.7), 0, 0.12 * Math.cos(k * 0.9));
    f.core.scale.set((0.9 + 0.1 * Math.cos(k * 1.7)) * b, (0.85 + 0.25 * Math.abs(Math.sin(k * 1.4 + 1))) * b, (0.9 + 0.1 * Math.sin(k * 1.5)) * b);
    f.core.rotation.copy(f.mesh.rotation);
  }
  for (const s of smokes) {
    const amt = s.amount();
    for (const p of s.puffs) {
      p.m.visible = amt > 0.01;
      if (!p.m.visible) continue;
      const t = (time * s.speed + p.phase) % 1;
      const sway = Math.sin(time * 0.6 + p.drift) * s.spread * t;
      p.m.position.copy(s.origin).add(_tmp.set(p.ox + Math.cos(p.drift) * sway + t * s.spread, t * s.rise, p.oz + Math.sin(p.drift) * sway));
      p.m.scale.setScalar(s.size * (0.4 + t * 2.4));
      p.m.material.opacity = Math.min(0.9, amt * s.alpha * Math.sin(Math.PI * t));
    }
  }
  fireLight.intensity = (14 + 3 * Math.sin(time * 11)) * (1 + 0.5 * groupP('burn'));
  applyCut(tour.cut);
  placeActors();
  rite(time);
  syncSleeves();
  heads(time);
}

// ---------------------------------------------------------------- explore mode
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI * 0.49;
controls.minDistance = 0.8;
controls.maxDistance = 900;

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
    view.pos.copy(camera.position);
    view.look.copy(controls.target);
    tour.follow = 0;
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
      flyToOverview(() => { tour.phase = phase; }, phase === 'finale');
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
  const chips = st.atone?.length ? `<ul class="chips" aria-label="${t('atoneChips')}">
      ${Object.entries(ATONE)
        .map(([k, m]) => {
          const yes = st.atone.includes(k);
          return `<li class="${yes ? 'yes' : 'no'}" title="${t(yes ? 'named' : 'notMentioned')}">${esc(tr(m))}</li>`;
        }).join('')}
    </ul>` : '';
  ui.popup.innerHTML = `
    <div class="kicker">${t('stopOf', { n: st.i + 1, total: stops.length })} · ${esc(tr(st.ref))} (${VERSIONS[current.version].abbr})</div>
    <h2>${esc(tr(st.title))}</h2>
    <blockquote>${esc(tr(st.quote))}</blockquote>
    <p>${esc(tr(st.note))}</p>
    ${chips}
    ${st.where ? `<div class="facts"><span>${t('where')}</span> ${esc(tr(st.where))}</div>` : ''}
    ${st.wearing ? `<div class="facts"><span>${t('wearing')}</span> ${esc(tr(WEARING[st.wearing]))}</div>` : ''}
    <div class="timer"></div>`;
  ui.popup.querySelector('.timer').appendChild(timerBar);
  timerBar.style.transform = 'scaleX(0)';
  ui.popup.classList.add('show');
}
function hidePopup() { ui.popup.classList.remove('show'); }
function showNext(st) {
  ui.nextChip.innerHTML = `<span>${t('next')}</span> ${esc(tr(st.title))} <em>${esc(tr(st.ref))}</em>`;
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
  ui.card.classList.toggle('low', finale);
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
    b.title = `${tr(st.title)} (${tr(st.ref)})`;
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
  for (const lb of labels) labelText(lb);
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
applyStatic(0);
setVersion(current.version);
showCard(INTRO, false);
setPlaying(false);

const clock = new THREE.Clock();
const noKeys = new Set();
let viewShift = 0;   // shifts the frame right so the popup doesn't cover the subject
let viewLift = 0;    // shifts the frame up on phones (the popup, the finale card)
let time = 0;
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05);
  time += dt;
  update(dt);
  updateEffects(time);
  const wantShift = !tour.explore && (tour.phase === 'hold' || tour.phase === 'fly' || tour.phase === 'finale') && innerWidth > 900 ? 0.14 : 0;
  const wantLift = !tour.explore && tour.phase !== 'intro' && innerWidth <= 640 ? (tour.phase === 'finale' ? 0.22 : popupLift()) : 0;
  viewShift = lerp(viewShift, wantShift, 1 - Math.exp(-dt * 2.5));
  viewLift = lerp(viewLift, wantLift, 1 - Math.exp(-dt * 2.5));
  if (viewShift > 0.002 || viewLift > 0.002) camera.setViewOffset(innerWidth, innerHeight, -innerWidth * viewShift, innerHeight * viewLift, innerWidth, innerHeight);
  else camera.clearViewOffset();
  if (tour.explore) {
    controls.update();
  } else {
    camera.position.copy(view.pos);
    camera.lookAt(view.look);
  }
  const inTour = tour.phase === 'hold' || tour.phase === 'fly';
  updateLabels(inTour && tour.i < stops.length ? stops[tour.i].activeKeys : tour.phase === 'finale' ? FINALE_KEYS : noKeys);
  updateCompass();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
});

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
  tour, stops, jump, next, applyStatic, setGroup, view, groups, actors,
  advance(sec) { for (let t = 0; t < sec; t += 0.05) { update(0.05); updateEffects(time += 0.05); } },
};
