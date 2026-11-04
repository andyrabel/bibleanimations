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

const { PEOPLE, PARTS, STONES, NAMES_HE, HOLY_HE, STOPS, INTRO, FINALE, TERMS, MATERIALS } = DATA;
await loadLanguages(DATA, import.meta.url);

// ---------------------------------------------------------------- constants
// One world unit is one cubit; the tent, court and furniture stand where they
// do in the Tabernacle animation.
const TENT = { west: -30, east: 0, half: 5, height: 10 };
const COURT = { west: -50, east: 50, half: 25, height: 5, gate: 10 };
const BT = 0.75;                 // board thickness (not given in the text)
const OUT_N = TENT.half + BT;
const OUT_W = TENT.west - BT;
const DOOR_PILLARS = [-4.75, -2.375, 0, 2.375, 4.75];
const LAVER = { x: 12, n: 0 };
const ALTAR = { x: 25, n: 0 };
const AARON = PEOPLE.aaron;
const OVERVIEW_C = new THREE.Vector3(3, 3, 1.5);
const FINALE_LOOK = new THREE.Vector3(5, 1.9, 2.4);   // Aaron and his sons
const HOLD_SCALE = 0.5;  // default pause at each stop, relative to the reading-time estimate
const SOUTH_EAST = 0.55; // overview angle: from the south-east, looking at the doorway
const DEPTH = 0.68;      // bodies and garments are lathes, squashed front to back by this much

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
// Morning sun from the south-east, on Aaron's front.
const sun = new THREE.DirectionalLight(0xfff0d4, 2.6);
sun.position.set(150, 210, 110);
sun.target.position.set(0, 0, 0);
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
Object.assign(sun.shadow.camera, { left: -42, right: 42, top: 42, bottom: -42, near: 120, far: 420 });
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
  // "A tunic of checkered work" of fine linen (28:39).
  tunic: canvasTexture(64, (g, s) => {
    weave(g, s, '#f2ede1');
    for (let y = 0; y < s; y += 8) for (let x = (y / 8) % 2 ? 8 : 0; x < s; x += 16) { g.fillStyle = 'rgba(150,130,100,0.18)'; g.fillRect(x, y, 8, 8); }
  }),
  // Plain linen: undergarments, turban and caps.
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
    // Gold thread worked in (39:3).
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
    // Read right to left, top to bottom.
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
  linen: new THREE.MeshStandardMaterial({ map: TEX.linen, roughness: 1 }),
  goat: new THREE.MeshStandardMaterial({ color: 0x3d322b, roughness: 1 }),
  rams: new THREE.MeshStandardMaterial({ color: 0x9a3a28, roughness: 0.9 }),
  outer: new THREE.MeshStandardMaterial({ color: 0x8c7b64, roughness: 0.95 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x241c15, roughness: 1 }),
  char: new THREE.MeshStandardMaterial({ color: 0x2a1f18, roughness: 1, emissive: 0x5a1a04, emissiveIntensity: 0.6 }),
  cord: new THREE.MeshStandardMaterial({ color: 0xcbb68a, roughness: 1 }),
  water: new THREE.MeshStandardMaterial({ color: 0x5aa0b8, roughness: 0.1, metalness: 0.2, emissive: 0x0b2a3a }),
  // Flames shade by height (vertex colours): a pale core inside an orange tongue.
  flame: new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.88, depthWrite: false, toneMapped: false, side: THREE.DoubleSide }),
  flameCore: new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false }),
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
  moses: new THREE.MeshStandardMaterial({ color: 0xd9ccb0, roughness: 1, side: THREE.DoubleSide }),
  cloak: new THREE.MeshStandardMaterial({ color: 0x7a5a3c, roughness: 1, side: THREE.DoubleSide }),
  headCloth: new THREE.MeshStandardMaterial({ color: 0xe6dcc6, roughness: 1, side: THREE.DoubleSide }),
  plain: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95 }),
};
const hairMats = {};
const hairMat = (c) => (hairMats[c] ??= new THREE.MeshStandardMaterial({ color: c, roughness: 1, side: THREE.DoubleSide }));

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
// head), 'grow' scales up in place, 'wrap' winds in round a body.
const groups = {};
function piece(key, obj, mode = 'drop', lift = 6) {
  groups[key] ??= { key, items: [], p: -1 };
  groups[key].items.push({ obj, mode, lift, pos: obj.position.clone(), scale: obj.scale.clone(), rot: obj.rotation.y });
  return obj;
}
function setItem(it, k) {
  const o = it.obj;
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

// ---------------------------------------------------------------- the tent (backdrop)
// Already set up (Exodus 40): gold boards and bars, the coverings over them,
// and the doorway curtain on five gold pillars. Only the doorway is seen close.
{
  const T = scene;
  const len = TENT.east - OUT_W;
  for (const s of [-1, 1]) add(T, box(len, TENT.height, BT, 1.5), MAT.boards, (TENT.east + OUT_W) / 2, 0.05, -s * (TENT.half + BT / 2));
  add(T, box(BT, TENT.height, OUT_N * 2, 1.5), MAT.boards, OUT_W + BT / 2, 0.05, 0);
  // Silver bases under the boards (26:19).
  for (const s of [-1, 1]) add(T, box(len, 0.7, BT + 0.25), MAT.silver, (TENT.east + OUT_W) / 2, 0, -s * (TENT.half + BT / 2));
  // Five bars a side, the middle one end to end (26:26-28).
  for (const s of [-1, 1]) {
    for (const [x, l, y] of [[OUT_W + len / 2, len, 5], [OUT_W + len * 0.75, len / 2 - 0.15, 8.2], [OUT_W + len * 0.25, len / 2 - 0.15, 8.2], [OUT_W + len * 0.75, len / 2 - 0.15, 1.8], [OUT_W + len * 0.25, len / 2 - 0.15, 1.8]]) {
      add(T, cylX(0.14, l), MAT.gold, x, y, -s * (OUT_N + 0.14));
    }
  }
  // The doorway: five gold pillars on bronze bases, and the embroidered curtain (26:36-37).
  for (const n of DOOR_PILLARS) {
    add(T, box(0.8, 0.7, 0.8), MAT.bronze, TENT.east, 0, -n);
    add(T, new THREE.CylinderGeometry(0.22, 0.26, TENT.height, 16).translate(0, TENT.height / 2, 0), MAT.gold, TENT.east, 0.05, -n);
    add(T, new THREE.CylinderGeometry(0.3, 0.24, 0.35, 16), MAT.gold, TENT.east, TENT.height - 0.3, -n);
  }
  add(T, box(0.08, TENT.height - 0.3, OUT_N * 2), MAT.screen, TENT.east + 0.34, 0.1, 0);
  // Goats' hair over the roof and down the sides and back, the sixth curtain
  // doubled over the front (26:7-13); rams' skins and the outer covering on top (26:14).
  const off = 0.18, east = TENT.east + 0.3 + off, west = OUT_W - off, top = TENT.height + off, half = OUT_N + off;
  add(T, box(east - west, 0.06, half * 2), MAT.goat, (east + west) / 2, top, 0);
  for (const s of [-1, 1]) add(T, box(east - west, top - 0.3, 0.06), MAT.goat, (east + west) / 2, 0.3, s * half);
  add(T, box(0.06, top - 0.3, half * 2), MAT.goat, west, 0.3, 0);
  add(T, box(0.06, 2, half * 2), MAT.goat, east + 0.03, top - 2, 0);
  for (const [mat, o] of [[MAT.rams, 0.34], [MAT.outer, 0.46]]) {
    const e = TENT.east + 0.3 + o, w = OUT_W - o, h = OUT_N + o, tp = TENT.height + o;
    add(T, box(e - w, 0.08, h * 2), mat, (e + w) / 2, tp, 0);
    for (const s of [-1, 1]) add(T, box(e - w, 1.2, 0.08), mat, (e + w) / 2, tp - 1.2, s * h);
  }
}

// ---------------------------------------------------------------- court, laver, altar (backdrop)
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
  flames.push({ mesh: f, core, phase: rand() * 10 });
  return holder;
}
const smokes = [];
// Puffs rise from (x, n, y) while `amount()` is above zero.
function smoke(x, n, y, { count, size, rise, color, speed, spread, alpha = 0.5, amount = () => 1 }) {
  const puffs = [];
  for (let i = 0; i < count; i++) {
    const m = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1, 1),
      new THREE.MeshStandardMaterial({ color, roughness: 1, transparent: true, opacity: 0, depthWrite: false }),
    );
    m.visible = false;
    scene.add(m);
    puffs.push({ m, phase: (i * 0.618) % 1, drift: rand() * Math.PI * 2 });
  }
  smokes.push({ origin: v3(x, n, y), puffs, size, rise, speed, spread, alpha, amount });
}

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
{
  const G = placed(LAVER.x, LAVER.n);
  add(G, new THREE.CylinderGeometry(0.5, 0.75, 0.3, 24), MAT.bronze);
  add(G, new THREE.CylinderGeometry(0.22, 0.32, 1.7, 16).translate(0, 0.85, 0), MAT.bronze);
  const bowl = add(G, new THREE.SphereGeometry(1, 32, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), MAT.bronze.clone(), 0, 2.35, 0);
  bowl.scale.set(1.15, 0.6, 1.15);
  bowl.material.side = THREE.DoubleSide;
  add(G, new THREE.CircleGeometry(1.07, 32).rotateX(-Math.PI / 2), MAT.water, 0, 2.22, 0).castShadow = false;
}

// The altar of burnt offering (27:1-8), its fire burning (Leviticus 6:13).
const fireLight = new THREE.PointLight(0xff8a3a, 12, 22, 1.4);
{
  const { x, n } = ALTAR;
  const S = 5, H = 3, t = 0.15;
  const G = placed(x, n);
  for (const s of [-1, 1]) {
    add(G, box(S, H, t), MAT.bronze, 0, 0, s * (S / 2 - t / 2));
    add(G, box(t, H, S), MAT.bronze, s * (S / 2 - t / 2), 0, 0);
    add(G, box(S + 0.24, 0.16, 0.12), MAT.bronze, 0, H / 2 - 0.1, s * (S / 2 + 0.06));
    add(G, box(0.12, 0.16, S + 0.24), MAT.bronze, s * (S / 2 + 0.06), H / 2 - 0.1, 0);
  }
  add(G, box(S - 2 * t, 0.08, S - 2 * t), MAT.dark, 0, H / 2, 0).castShadow = false;
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      add(G, new THREE.ConeGeometry(0.28, 0.5, 4).rotateY(Math.PI / 4).translate(0, 0.25, 0), MAT.bronze, sx * (S / 2 - 0.25), H, sz * (S / 2 - 0.25));
    }
  }
  const F = placed(x, n, H / 2 + 0.1);
  for (let k = 0; k < 7; k++) {
    const log = add(F, cylX(0.16, 2.4 + rand()), MAT.char, (rand() - 0.5) * 1.6, 0.16 + (k % 3) * 0.25, (rand() - 0.5) * 2.4);
    log.rotation.y = rand() * Math.PI;
  }
  for (let k = 0; k < 9; k++) flame(F, (rand() - 0.5) * 2.4, 0.4, (rand() - 0.5) * 2.4, 1.6 + rand() * 1.4, 0.35 + rand() * 0.25);
  for (let k = 0; k < 8; k++) flame(F, (rand() - 0.5) * 2.8, 0.35, (rand() - 0.5) * 2.8, 0.7 + rand() * 0.6, 0.25 + rand() * 0.15);
  smoke(x, n, H + 0.6, { count: 30, size: 0.9, rise: 32, color: 0x8d877f, speed: 0.07, spread: 1.6 });
  fireLight.position.copy(v3(x, n, H + 1.5));
  scene.add(fireLight);
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

// Displaces a geometry's vertices along their direction from `c` by a little
// bumpy noise, for hair and beards.
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
// The skull and face: an egg with a brow, cheekbones, eye sockets and a
// narrower jaw, centred on the origin, facing +X.
function headGeo() {
  const geo = new THREE.SphereGeometry(1, 36, 28);
  const pos = geo.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const front = Math.max(0, v.x), low = Math.max(0, -v.y);
    v.z *= 1 - 0.22 * low * low;                                             // jaw
    if (v.x < 0) v.x *= 1 + 0.08 * Math.max(0, v.y + 0.3) - 0.3 * low;     // back of the skull, nape
    v.x += 0.06 * front ** 4 * Math.exp(-(((v.y - 0.22) / 0.12) ** 2));     // brow
    v.x -= 0.07 * front ** 2 * Math.exp(-(((v.y - 0.06) / 0.11) ** 2) - (((Math.abs(v.z) - 0.36) / 0.16) ** 2));   // eye sockets
    v.z += Math.sign(v.z) * 0.04 * front * Math.exp(-(((v.y + 0.05) / 0.15) ** 2));   // cheekbones
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
// Tapered limbs hanging from their joints: lathe profiles of [radius, y], from the bottom up.
const UPPER_ARM = lathe([[0.074, -0.74], [0.078, -0.66], [0.096, -0.42], [0.104, -0.18], [0.098, 0]], 14);
const FOREARM = lathe([[0.05, -0.62], [0.052, -0.58], [0.07, -0.36], [0.082, -0.13], [0.075, 0]], 14);
const LEG = lathe([[0.05, -1.4], [0.046, -1.34], [0.062, -1.2], [0.088, -0.98], [0.083, -0.86], [0.076, -0.74], [0.11, -0.56], [0.134, -0.2], [0.135, 0.02]], 14);

// The body, wearing linen undergarments from the waist to the thighs (28:42).
// fig.head holds the head and anything worn on it, in the figure's own
// coordinates; fig.neck turns it.
function figure(p, { beard, hair, skin = '#a8754f', long = 0.5, pose = POSE }) {
  const G = placed(p.x, p.n);
  G.rotation.y = Math.atan2(p.face.n - p.n, p.face.x - p.x);
  const sk = skinMat(skin);
  const B = squashed(G);
  add(B, lathe([[0.001, 1.2], [0.25, 1.22], [0.29, 1.5], [0.28, 1.75], [0.3, 2.05], [0.35, 2.4], [0.37, 2.55], [0.3, 2.66], [0.12, 2.74], [0.001, 2.76]]), sk);
  add(B, lathe([[0.29, 1.12], [0.3, 1.3], [0.29, 1.5], [0.27, 1.62]]), MAT.plainLinen);
  // Legs hang from the hips, so they can swing when walking.
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
  // Shoulders, elbows and hands: the palm faces the body, fingers curled a little.
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
  // Neck, head and face.
  add(G, new THREE.CylinderGeometry(0.083, 0.1, 0.32, 14), sk, 0, 2.72, 0);
  const neck = new THREE.Group();
  neck.position.y = 2.8;
  G.add(neck);
  const head = new THREE.Group();
  head.position.y = -2.8;
  neck.add(head);
  add(head, headGeo(), sk, 0, 3.12, 0);
  // The nose: bridge, tip and nostrils.
  rod(head, new THREE.Vector3(0.185, 3.175, 0), new THREE.Vector3(0.215, 3.095, 0), 0.016, sk, 8);
  add(head, new THREE.SphereGeometry(0.021, 12, 8), sk, 0.21, 3.092, 0);
  for (const s of [-1, 1]) add(head, new THREE.SphereGeometry(0.016, 8, 6), sk, 0.198, 3.083, s * 0.02);
  // Ears.
  for (const s of [-1, 1]) {
    const e = add(head, new THREE.SphereGeometry(1, 12, 8), sk, -0.005, 3.125, s * 0.178);
    e.scale.set(0.038, 0.062, 0.016);
    e.rotation.set(s * 0.25, -s * 0.3, 0.12);
  }
  // Eyes in their sockets, under brows; they blink.
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
  // Hair, thick at the back and sides.
  add(head, lumpy(new THREE.SphereGeometry(0.214, 32, 18, -Math.PI / 2 - 0.15, Math.PI + 0.3, 0, Math.PI * 0.78), 0.01, 9), hm, -0.016, 3.14, 0).scale.set(1, 1.12, 0.94);
  add(head, lumpy(new THREE.SphereGeometry(0.214, 32, 10, 0, Math.PI * 2, 0, Math.PI * 0.28), 0.008, 9), hm, -0.02, 3.14, 0).scale.set(1, 1.12, 0.94);
  // A full beard and moustache.
  add(head, beardGeo(long), bm);
  add(head, lumpy(tubeThrough([[0.165, 3.015, -0.08], [0.198, 3.048, -0.05], [0.214, 3.058, 0], [0.198, 3.048, 0.05], [0.165, 3.015, 0.08]], 0.018, 16), 0.004, 14, new THREE.Vector3(0.1, 3.05, 0)), bm);
  return { G, arms, legs, neck, head, eyes, home: p, blink: rand() * 4, step: 0 };
}

// Garments. Each returns its group, which is the piece that goes on.
// `onArms` puts the sleeves on the figure's own arms, for clothes that are
// already on and arms that move.
function tunic(fig, mat = MAT.tunic, onArms = false) {
  const T = new THREE.Group();
  fig.G.add(T);
  add(squashed(T), lathe([[0.34, 0.22], [0.33, 0.7], [0.315, 1.2], [0.315, 1.6], [0.318, 1.9], [0.365, 2.35], [0.392, 2.53], [0.322, 2.67], [0.152, 2.77], [0.132, 2.8]]), mat);
  const sleeve = (S, E) => {
    add(S, new THREE.CylinderGeometry(0.128, 0.11, 0.76, 12, 1, true).translate(0, -0.37, 0), mat);
    add(E, new THREE.CylinderGeometry(0.105, 0.088, 0.56, 12, 1, true).translate(0, -0.28, 0), mat);
  };
  if (onArms) for (const { S, E } of fig.arms) sleeve(S, E);
  else limbs(T, fig.arms[0].pose, sleeve);
  return T;
}
// A sash wound round the waist, its ends hanging in front (39:29).
function sash(fig) {
  const S = new THREE.Group();
  fig.G.add(S);
  const B = squashed(S);
  add(B, new THREE.CylinderGeometry(0.335, 0.33, 0.17, 32, 1, true), MAT.sash, 0, 1.64, 0);
  add(B, new THREE.TorusGeometry(0.334, 0.012, 6, 32).rotateX(Math.PI / 2), MAT.yarn[2], 0, 1.56, 0);
  // Inside the robe's outline, which narrows towards the sides.
  add(S, new THREE.SphereGeometry(0.05, 10, 8), MAT.sash, 0.212, 1.6, -0.06).scale.set(0.45, 1, 1.2);
  for (const [dz, len, a] of [[-0.035, 0.62, 0.04], [-0.095, 0.52, -0.04]]) {
    add(S, box(0.014, len, 0.07), MAT.sash, 0.214, 1.58 - len, dz).rotation.x = a;
  }
  return S;
}
// A linen cap for the sons (28:40; 39:28).
function cap(fig) {
  const C = new THREE.Group();
  fig.head.add(C);
  add(C, new THREE.SphereGeometry(0.225, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), MAT.plainLinen, -0.01, 3.17, 0).scale.set(1, 1.25, 0.96);
  add(C, new THREE.TorusGeometry(0.218, 0.03, 8, 24).rotateX(Math.PI / 2), MAT.plainLinen, -0.01, 3.19, 0).scale.set(1, 1, 0.96);
  return C;
}

// Aaron, eighty-three (Exodus 7:7), grey-bearded.
const aaron = figure(AARON, { beard: '#b9b3aa', hair: '#8f877e', skin: '#a2704b', long: 0.95 });
const A = aaron.G;

// The tunic goes on over the head; the sash winds round it (8:7).
piece('tunic', tunic(aaron), 'lower', 3.2);
piece('sash', sash(aaron), 'wrap');

// The robe of the ephod, all blue, woven (28:31-32): a head opening with a
// woven binding; no sleeves are mentioned. To the calf: its length isn't given.
{
  const R = new THREE.Group();
  A.add(R);
  const B = squashed(R);
  add(B, lathe([[0.455, 0.55], [0.42, 0.8], [0.375, 1.3], [0.37, 1.62], [0.355, 1.9], [0.378, 2.3], [0.418, 2.53], [0.345, 2.69], [0.172, 2.8], [0.148, 2.83]], 40), MAT.robe);
  add(B, new THREE.TorusGeometry(0.157, 0.022, 8, 28).rotateX(Math.PI / 2), MAT.robe, 0, 2.83, 0);
  add(B, new THREE.TorusGeometry(0.455, 0.014, 6, 40).rotateX(Math.PI / 2), MAT.robe, 0, 0.55, 0);
  piece('robe', R, 'lower', 3.2);
  // Round the hem, pomegranates of blue, purple and scarlet, with a gold bell
  // between each (28:33-34). The count isn't given.
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

// The ephod (28:6-12): front and back of gold and coloured yarn worked into
// linen, joined over the shoulders, an onyx stone in a gold setting on each.
// Its shape isn't given: chest to hips, open at the sides.
const SHOULDER = (s) => new THREE.Vector3(0.05, 2.79, s * 0.25);   // where each onyx sits
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

  // Onyx stones engraved with the names, six on each, in gold filigree settings (28:9-11).
  for (const s of [-1, 1]) {
    const O = new THREE.Group();
    O.position.copy(SHOULDER(s));
    O.rotation.z = -0.62;   // the face turned forward and up
    A.add(O);
    const names = s > 0 ? NAMES_HE.slice(0, 6) : NAMES_HE.slice(6);   // his right shoulder first
    const stone = add(O, new THREE.CylinderGeometry(1, 1, 1, 32), [MAT.onyx, new THREE.MeshStandardMaterial({ map: onyxTexture(names), roughness: 0.18 }), MAT.onyx]);
    stone.scale.set(0.058, 0.03, 0.074);
    add(O, new THREE.TorusGeometry(1, 0.11, 8, 32).rotateX(Math.PI / 2), MAT.gold, 0, 0.004, 0).scale.set(0.064, 0.064, 0.08);
    piece('onyx', O, 'grow');
  }

  // Its band, of the same work, tied round him (28:8; Leviticus 8:7).
  const W = new THREE.Group();
  A.add(W);
  add(squashed(W), new THREE.CylinderGeometry(0.425, 0.43, 0.13, 36, 1, true), MAT.ephod, 0, 1.56, 0);
  add(W, new THREE.SphereGeometry(0.045, 10, 8), MAT.ephod, 0.3, 1.56, 0.12).scale.set(0.6, 1, 1.2);
  for (const [dz, len, a] of [[0.1, 0.42, 0.05], [0.16, 0.34, -0.08]]) add(W, box(0.02, len, 0.07), MAT.ephod, 0.3, 1.55 - len, dz).rotation.x = a;
  piece('band', W, 'wrap');
}

// The breastpiece (28:15-29): the same work as the ephod, folded double, a
// span square (half a cubit), twelve stones in four rows in gold settings,
// gold chains to the shoulder settings, a blue cord to the ephod.
const BP = { x: 0.31, y: 2.1, half: 0.25, t: 0.06 };
{
  const P = new THREE.Group();
  A.add(P);
  add(P, box(BP.t, BP.half * 2, BP.half * 2), MAT.ephod, BP.x, BP.y - BP.half, 0);
  // The fold along the top.
  add(P, cylZ(BP.t / 2, BP.half * 2, 10), MAT.ephod, BP.x, BP.y + BP.half, 0);
  // Gold settings for the stones.
  for (let r = 0; r < 4; r++) for (let k = 0; k < 3; k++) add(P, box(0.012, 0.094, 0.112), MAT.gold, BP.x + BP.t / 2, BP.y + 0.165 - r * 0.11 - 0.047, (1 - k) * 0.135);
  piece('breastpiece', P, 'lower', 1.4);
  // The stones, row by row, each engraved with a name (28:17-21).
  STONES.forEach((st, i) => {
    const r = Math.floor(i / 3), k = i % 3;
    const S = new THREE.Group();
    S.position.set(BP.x + BP.t / 2 + 0.012, BP.y + 0.165 - r * 0.11, (1 - k) * 0.135);
    S.rotation.z = -Math.PI / 2;   // the cap faces forward
    A.add(S);
    const mat = new THREE.MeshStandardMaterial({ color: st.color, roughness: 0.1, metalness: 0.05 });
    add(S, new THREE.CylinderGeometry(1, 1, 1, 24), [mat, new THREE.MeshStandardMaterial({ map: stoneTexture(st.color, NAMES_HE[i]), roughness: 0.08, metalness: 0.05 }), mat]).scale.set(0.036, 0.022, 0.044);
    piece('stones', S, 'grow');
  });
  // Rings, chains and cord (28:22-28).
  const C = new THREE.Group();
  A.add(C);
  for (const s of [-1, 1]) {
    const top = new THREE.Vector3(BP.x + 0.02, BP.y + BP.half + 0.01, s * (BP.half - 0.03));
    add(C, new THREE.TorusGeometry(0.022, 0.006, 6, 14).rotateY(Math.PI / 2), MAT.gold, top.x, top.y, top.z);
    const sh = SHOULDER(s);
    // Twisted chains of pure gold, braided like cords (28:14, 22).
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
    // The lower rings tied with blue cord to rings on the ephod, above its band.
    const lo = new THREE.Vector3(BP.x - 0.01, BP.y - BP.half + 0.03, s * (BP.half - 0.05));
    const ep = new THREE.Vector3(0.39 * DEPTH + 0.01, 1.68, s * (BP.half - 0.05));
    add(C, new THREE.TorusGeometry(0.018, 0.005, 6, 12).rotateY(Math.PI / 2), MAT.gold, lo.x, lo.y, lo.z);
    add(C, new THREE.TorusGeometry(0.018, 0.005, 6, 12).rotateY(Math.PI / 2), MAT.gold, ep.x, ep.y, ep.z);
    rod(C, lo, ep, 0.008, MAT.yarn[0]);
  }
  piece('chains', C, 'grow');

  // The Urim and Thummim, put in the breastpiece (28:30). The text doesn't
  // describe them, so they are plain shapes that disappear into the fold.
  for (const s of [-1, 1]) {
    const U = add(A, new THREE.CapsuleGeometry(0.018, 0.05, 4, 10), MAT.urim, BP.x, BP.y - 0.02, s * 0.07);
    piece('urim', U, 'lower', 0.9);
  }
}

// The turban of fine linen (28:39), wound round the head; its shape isn't given.
{
  const T = new THREE.Group();
  aaron.head.add(T);
  for (let k = 0; k < 4; k++) {
    const m = add(T, new THREE.TorusGeometry(0.2 - k * 0.026, 0.062 - k * 0.006, 10, 28).rotateX(Math.PI / 2), MAT.plainLinen, -0.015, 3.3 + k * 0.058, 0);
    m.rotation.z = (k % 2 ? 1 : -1) * 0.06;
    m.scale.z = 0.94;
  }
  add(T, new THREE.SphereGeometry(0.17, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), MAT.plainLinen, -0.015, 3.44, 0).scale.y = 0.6;
  piece('turban', T, 'lower', 1.6);
}

// The plate of pure gold on a blue cord, on the front of the turban (28:36-38).
{
  const P = new THREE.Group();
  aaron.head.add(P);
  const r = 0.27, arc = 0.8;
  const plate = add(P, new THREE.CylinderGeometry(r, r, 0.072, 24, 1, true, Math.PI / 2 - arc / 2, arc), MAT.plate, -0.015, 3.29, 0);
  plate.castShadow = false;
  add(P, new THREE.TorusGeometry(r - 0.004, 0.007, 6, 48).rotateX(Math.PI / 2), MAT.yarn[0], -0.015, 3.305, 0).scale.z = 0.94;
  piece('plate', P, 'lower', 0.8);
}

// Moses, eighty (Exodus 7:7), in a plain tunic and cloak. He washes Aaron and
// his sons at the basin and reaches out to dress Aaron while each garment goes on.
const moses = (() => {
  const pose = { out: 0.12, fwd: 0.05, bend: 0.3 };
  const fig = figure(PEOPLE.moses, { beard: '#d8d2c8', hair: '#bdb6aa', skin: '#9d6b47', long: 1.05, pose });
  tunic(fig, MAT.moses, true);
  const B = squashed(fig.G);
  add(B, lathe([[0.42, 0.9], [0.38, 1.6], [0.36, 2.3], [0.41, 2.6], [0.26, 2.78]]), MAT.cloak);
  add(fig.head, new THREE.SphereGeometry(0.235, 16, 10, 0, Math.PI * 2, 0, Math.PI / 1.75), MAT.headCloth, -0.02, 3.15, 0).scale.set(1, 1.15, 0.97);
  return fig;
})();

// The four sons, in their undergarments, washed with Aaron and then waiting. In the finale
// they are dressed: tunics, sashes and caps (Leviticus 8:13).
const SONS = ['nadab', 'abihu', 'eleazar', 'ithamar'];
const sons = SONS.map((k, i) => {
  const fig = figure(PEOPLE[k], {
    beard: ['#3a2a1e', '#2e2218', '#4a3424', '#3a2a1e'][i], hair: '#2e2218',
    skin: ['#a8754f', '#b07c55', '#9f6c48', '#ab7852'][i], long: [0.55, 0.4, 0.5, 0.3][i],
  });
  piece('sons', tunic(fig), 'lower', 3);
  piece('sons', sash(fig), 'wrap');
  piece('sons', cap(fig), 'lower', 1);
  return fig;
});

// ---------------------------------------------------------------- washing
// Moses brings Aaron and his sons to the basin and washes them (8:6). The
// priests washed their hands and feet from it (Exodus 30:19-21; 40:31-32):
// here Moses draws water in a jug, which the text doesn't mention, and pours
// it over each man's hands and then his feet, Aaron first. They wait in line;
// each in turn steps up to face Moses beside the basin, then joins the washed.
// The walk there follows the 'wash' group and the walk back the 'walk' group,
// so jumping between stops puts everyone in the right place.
const WASH_ORDER = ['aaron', 'nadab', 'abihu', 'eleazar', 'ithamar'];
const POURER = { x: 10.3, n: 0.4 };                      // Moses, beside the basin
const WASH_AT = { x: 10.3, n: -1.25 };                   // the man being washed, facing Moses
const QUEUE = (j) => ({ x: WASH_AT.x - 0.75 * j, n: WASH_AT.n - 1.0 * j });
const WASHED = (k) => ({ x: 9.2 - 0.45 * k, n: 1.6 + 0.9 * k });
const plan = (p) => new THREE.Vector3(p.x, 0, -p.n);
const yawTo = (a, b) => Math.atan2(b.n - a.n, b.x - a.x);
const TURN = 3.4;   // seconds for each man
// Where someone stands, and which way they face, t seconds into the washing.
function washPlace(key, t) {
  if (key === 'moses') return { pos: plan(POURER), yaw: yawTo(POURER, WASH_AT), moving: false };
  const k = WASH_ORDER.indexOf(key);
  const turn = Math.min(Math.floor(t / TURN), WASH_ORDER.length);
  // Place in line: < 0 washed, 0 being washed, > 0 waiting.
  const at = (j) => {
    if (j < 0) { const w = WASHED(k); return { p: w, yaw: yawTo(w, WASH_AT) }; }
    if (j === 0) return { p: WASH_AT, yaw: yawTo(WASH_AT, POURER) };
    const q = QUEUE(j);
    return { p: q, yaw: yawTo(q, QUEUE(j - 1)) };
  };
  const now = at(k - turn);
  // Each turn starts with everyone moving up one place.
  const m = turn === 0 ? 1 : turn >= WASH_ORDER.length ? 1 : smooth(clamp01(((t / TURN) % 1) / 0.18));
  const was = turn === 0 ? now : at(k - turn + 1);
  const pos = plan(was.p).lerp(plan(now.p), m);
  const d = Math.atan2(Math.sin(now.yaw - was.yaw), Math.cos(now.yaw - was.yaw));
  return { pos, yaw: was.yaw + d * m, moving: was.p !== now.p && m > 0.02 && m < 0.98 };
}
const walkers = [aaron, moses, ...sons].map((fig, i) => {
  const key = Object.keys(PEOPLE).find((k) => PEOPLE[k] === fig.home);
  return { fig, key, phase: i * 0.7, from: new THREE.Vector3(fig.home.x, 0, -fig.home.n), fromYaw: fig.G.rotation.y };
});
const walkerOf = Object.fromEntries(walkers.map((w) => [w.key, w]));

// A bronze jug, and the water poured from it.
const jug = new THREE.Group();
{
  add(jug, lathe([[0.001, 0], [0.07, 0.005], [0.1, 0.06], [0.095, 0.13], [0.05, 0.19], [0.045, 0.23], [0.06, 0.25]], 18), MAT.bronze.clone()).material.side = THREE.DoubleSide;
  add(jug, new THREE.CylinderGeometry(0.012, 0.02, 0.12, 8).rotateZ(-1.0), MAT.bronze, 0.09, 0.2, 0);
  add(jug, new THREE.TorusGeometry(0.06, 0.012, 6, 14, Math.PI), MAT.bronze, -0.07, 0.15, 0).rotation.z = Math.PI / 2;
  jug.visible = false;
  scene.add(jug);
}
const SPOUT = new THREE.Vector3(0.14, 0.24, 0);   // in the jug's frame
const stream = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.016, 1, 6, 1, true).translate(0, -0.5, 0), new THREE.MeshStandardMaterial({
  color: 0xcfeaf2, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.7, depthWrite: false,
}));
stream.visible = false;
scene.add(stream);
const drops = [];
for (let i = 0; i < 28; i++) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(0.014, 6, 4), stream.material);
  m.visible = false;
  scene.add(m);
  drops.push({ m, phase: i / 28, dx: (rand() - 0.5) * 0.12, dz: (rand() - 0.5) * 0.12 });
}
// Wet ground at each man's feet once they are washed.
const wet = Object.fromEntries(WASH_ORDER.map((k) => {
  const m = add(scene, new THREE.CircleGeometry(0.5, 20).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({
    color: 0x8a7350, roughness: 0.35, transparent: true, opacity: 0, depthWrite: false,
  }), 0, 0.025, 0);
  m.castShadow = false;
  return [k, m];
}));

for (const k of ['wash', 'walk']) piece(k, new THREE.Object3D(), 'grow');
// 1 at the basin, 0 at the doorway.
const atBasin = () => groupP('wash') * (1 - groupP('walk'));
// b: 1 at the basin, 0 at the doorway. The walk there ends where the washing
// starts; the walk back starts from wherever the washing got to.
function placePeople(b, time) {
  const e = smooth(b);
  const walking = b > 0.001 && b < 0.999;
  for (const w of walkers) {
    const G = w.fig.G;
    const at = washPlace(w.key, tour.washT);
    G.position.lerpVectors(w.from, at.pos, e);
    const d = Math.atan2(Math.sin(at.yaw - w.fromYaw), Math.cos(at.yaw - w.fromYaw));
    G.rotation.y = w.fromYaw + d * e;
    // A step every half cubit or so: legs swing, the body bobs.
    const step = walking || at.moving ? Math.sin(time * 7 + w.phase) : 0;
    G.position.y = Math.abs(step) * 0.035;
    w.fig.step = step;
    w.fig.legs.forEach((L, i) => { L.rotation.z = (i ? 1 : -1) * step * 0.32; });
  }
}

// ---------------------------------------------------------------- congregation
// "All the congregation" gathered at the doorway (8:3-4), shown outside the
// court gate. One figure stands for many.
{
  const r = mulberry32(8);
  const list = [];
  for (let i = 0; i < 520; i++) {
    const x = COURT.east + 4 + r() ** 0.8 * 34, n = (r() - 0.5) * 70;
    if (Math.abs(n) < 2.5 && x < COURT.east + 12) continue;   // a way kept clear to the gate
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

// Nothing is put on until its stop; the sons are dressed only in the finale.
function applyStatic(i) {
  stops.forEach((st, j) => st.build.forEach((k) => setGroup(k, j < i ? 1 : 0)));
  setGroup('sons', i > stops.length ? 1 : 0);
}

// ---------------------------------------------------------------- labels
const labels = [];
function makeLabel(text, kind, pos, keys, group, follow) {
  const el = document.createElement('div');
  el.className = `label ${kind}`;
  el.textContent = tr(text);
  const obj = new CSS2DObject(el);
  obj.position.copy(pos);
  scene.add(obj);
  labels.push({ el, obj, kind, keys, group, text, follow, lift: pos.y, opacity: -1 });
}
for (const [k, p] of Object.entries(PARTS)) makeLabel(p.name, 'item', v3(p.x, p.n, p.y), [`part:${k}`], k);
for (const w of walkers) makeLabel(PEOPLE[w.key].name, 'person', v3(0, 0, w.key === 'aaron' ? 4.15 : 3.85), [`person:${w.key}`], null, w.fig.G);

function updateLabels(activeKeys) {
  const overview = tour.phase === 'intro';
  for (const lb of labels) {
    if (lb.follow) lb.obj.position.set(lb.follow.position.x, lb.lift, lb.follow.position.z);
    const d = camera.position.distanceTo(lb.obj.position);
    const active = lb.keys.some((k) => activeKeys.has(k));
    let o;
    if (lb.kind === 'item') o = active || (tour.explore && d < 4.5) ? 1 : 0;
    else o = overview ? 0 : active ? 1 : clamp01((d - 6.5) / 3);
    if (lb.group && groupP(lb.group) < 0.9) o = 0;
    o = Math.round(o * 20) / 20;
    if (o !== lb.opacity) { lb.el.style.opacity = o; lb.opacity = o; }
    lb.el.classList.toggle('active', active && lb.kind === 'item');
  }
}

// ---------------------------------------------------------------- tour
const stops = STOPS.map((st, i) => {
  const look = v3(st.look.x, st.look.n, st.look.y);
  const pos = v3(st.cam.x, st.cam.n, st.cam.y);
  const activeKeys = new Set(st.build.filter((k) => PARTS[k]).map((k) => `part:${k}`));
  if (st.build.includes('wash')) for (const k of Object.keys(PEOPLE)) activeKeys.add(`person:${k}`);
  return { ...st, i, look, pos, activeKeys };
});
const FINALE_KEYS = new Set(SONS.map((k) => `person:${k}`));

function overviewPos(a, finale = false) {
  const c = finale ? FINALE_LOOK : OVERVIEW_C, r = finale ? 12.5 : 34;
  return new THREE.Vector3(c.x + Math.cos(a) * r, finale ? 4.6 : 15, c.z + Math.sin(a) * r);
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
  washT: 0,           // seconds into the washing at the basin
  reach: 0,           // Moses' arms, reaching while a garment goes on
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
  const dur = to.dur ?? (sequential ? Math.min(9, Math.max(6.5, d / 2)) : Math.min(7.5, Math.max(5, d / 6)));
  fly = { t: 0, dur, d, fromPos, fromLook, to, build: to.build, done: () => arrive(toIndex) };
  tour.i = toIndex;
  tour.phase = 'fly';
  narrator.stop();
  tour.detached = false;
  // With no pause, the last stop's text stays up through the next flight.
  if (tour.holdScale > 0 || !sequential) hidePopup();
  showNext(to);
  updateProgress();
}

function flyToOverview(then, finale = false) {
  const to = { pos: overviewPos(tour.orbitA, finale), look: (finale ? FINALE_LOOK : OVERVIEW_C).clone() };
  fly = { t: 0, dur: 6, d: view.pos.distanceTo(to.pos), fromPos: view.pos.clone(), fromLook: view.look.clone(), to, build: null, done: then };
  tour.phase = 'fly';
  hidePopup();
}

// Garments go on in the second half of the flight, once the camera is close.
const buildP = (u) => smooth(clamp01((u - 0.3) / 0.62));

function stepFly(dt) {
  fly.t += dt / fly.dur;
  const u = clamp01(fly.t);
  const e = easeArrive(u);
  // A small rise on the way, more on long hops.
  const arc = Math.min(6, 0.25 + fly.d * 0.2) * Math.sin(Math.PI * u);
  view.pos.lerpVectors(fly.fromPos, fly.to.pos, e).y += arc;
  view.look.lerpVectors(fly.fromLook, fly.to.look, easeInOut(clamp01(u * 1.15)));
  if (fly.build) {
    const p = buildP(u);
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

// The finale: the camera draws back while the sons are dressed (8:13).
function finish() {
  track('tour_complete');
  narrator.stop();
  tour.i = stops.length;
  applyStatic(stops.length);
  flyToOverview(() => {
    tour.phase = 'finale';
    showCard(FINALE, true);
    narrator.say(verseLine(tr(FINALE.ref), tr(FINALE.quote)));
  }, true);
  fly.dur = 8;
  fly.build = ['sons'];
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
  track('tour_start');
  hideCard();
  applyStatic(0);
  tour.i = -1;
  tour.detached = true;
  setPlaying(true);
  startFly(0);
  narrator.say(titleLine(t('garments.title'), t('garments.subtitle')));
}

function update(dt) {
  const t = dt * tour.speed;
  narrator.update(dt);
  const inTour = tour.phase === 'hold' || tour.phase === 'fly';
  if (!tour.explore) {
    // The washing runs while everyone is at the basin; Moses reaches out
    // while a garment goes on.
    if (groupP('wash') < 1) tour.washT = 0;
    else if (atBasin() > 0.999 && tour.playing) tour.washT += t;
    const dressing = !!fly?.build && fly.build.some((k) => k !== 'walk' && k !== 'wash' && groupP(k) > 0 && groupP(k) < 1);
    tour.reach = lerp(tour.reach, dressing ? 1 : 0, 1 - Math.exp(-dt * 3));
  }
  if (tour.explore) return;
  if (tour.phase === 'intro') {
    tour.introT += dt;
    tour.orbitA = SOUTH_EAST + 0.15 * Math.sin(tour.introT * 0.12);
  } else if (tour.phase === 'finale') tour.orbitA += dt * 0.035;
  if ((tour.phase === 'intro' || tour.phase === 'finale') && !fly) {
    view.pos.copy(overviewPos(tour.orbitA, tour.phase === 'finale'));
    view.look.copy(tour.phase === 'finale' ? FINALE_LOOK : OVERVIEW_C);
  }
  if (fly) {
    if (tour.playing || !fly.build || tour.i >= stops.length) stepFly(fly.build ? t : dt);
  } else if (tour.phase === 'hold') {
    const st = stops[tour.i];
    if (tour.playing) tour.holdT += t;
    const k = tour.holdDur ? clamp01(tour.holdT / tour.holdDur) : 1;
    // A slow push-in while we read.
    view.pos.copy(st.pos).lerp(st.look, 0.07 * smooth(k));
    view.look.copy(st.look);
    timerBar.style.transform = `scaleX(${k})`;
    // Stay until the verse has been read.
    if (tour.playing && tour.holdT >= tour.holdDur && !narrator.busy()) {
      if (tour.i >= stops.length - 1) finish();
      else startFly(tour.i + 1);
    }
  }
}

// Flames flicker; smoke rises; water falls; Moses' arms move.
function updateEffects(time) {
  for (const f of flames) {
    const k = time * 9 + f.phase;
    f.mesh.scale.set(0.85 + 0.15 * Math.sin(k * 1.3), 0.8 + 0.35 * Math.abs(Math.sin(k)), 0.85 + 0.15 * Math.cos(k * 1.1));
    f.mesh.rotation.set(0.12 * Math.sin(k * 0.7), 0, 0.12 * Math.cos(k * 0.9));
    f.core.scale.set(0.9 + 0.1 * Math.cos(k * 1.7), 0.85 + 0.25 * Math.abs(Math.sin(k * 1.4 + 1)), 0.9 + 0.1 * Math.sin(k * 1.5));
    f.core.rotation.copy(f.mesh.rotation);
  }
  for (const s of smokes) {
    const amt = s.amount();
    for (const p of s.puffs) {
      p.m.visible = amt > 0.01;
      if (!p.m.visible) continue;
      const t = (time * s.speed + p.phase) % 1;
      const sway = Math.sin(time * 0.6 + p.drift) * s.spread * t;
      p.m.position.copy(s.origin).add(_tmp.set(Math.cos(p.drift) * sway + t * s.spread, t * s.rise, Math.sin(p.drift) * sway));
      p.m.scale.setScalar(s.size * (0.4 + t * 2.4));
      p.m.material.opacity = amt * s.alpha * Math.sin(Math.PI * t);
    }
  }
  fireLight.intensity = 14 + 3 * Math.sin(time * 11);
  placePeople(atBasin(), time);
  // Arms at rest, swinging when walking, or Moses reaching out to dress Aaron.
  for (const { fig } of walkers) {
    const reach = fig === moses ? tour.reach : 0;
    for (const { S, E, s, pose } of fig.arms) {
      S.rotation.z = pose.fwd + reach * (0.85 + 0.05 * Math.sin(time * 2.1 + s)) - s * fig.step * 0.22;
      S.rotation.x = -s * pose.out + reach * s * 0.12;
      E.rotation.z = pose.bend + reach * 0.35;
    }
  }
  washing(time);
  heads(time);
}
const _tmp = new THREE.Vector3();

// Everyone blinks now and then and looks at what is happening: the water
// being poured, or Aaron while he is dressed. Walking, they look ahead.
const _look = new THREE.Vector3();
let headsT = 0;
function heads(time) {
  const dt = Math.min(0.1, Math.max(0, time - headsT));
  headsT = time;
  const pouring = atBasin() > 0.999 && tour.washT < TURN * WASH_ORDER.length;
  const walking = atBasin() > 0.001 && atBasin() < 0.999;
  for (const w of walkers) {
    const f = w.fig;
    f.blink -= dt;
    if (f.blink < -0.14) f.blink = 2 + rand() * 4;
    f.eyes.scale.y = f.blink < 0 ? 0.15 : 1;
    let yaw = 0, pitch = -0.05;
    const target = walking || f.step ? null : pouring ? _spout : f === aaron ? null
      : _look.set(A.position.x, f === moses ? lerp(2.9, 2.2, tour.reach) : 2.9, A.position.z);
    if (target) {
      f.G.updateMatrixWorld();
      const l = f.G.worldToLocal(_tmp.copy(target));
      yaw = Math.max(-0.7, Math.min(0.7, Math.atan2(-l.z, l.x)));
      pitch = Math.max(-0.35, Math.min(0.2, Math.atan2(l.y - 3.15, Math.hypot(l.x, l.z))));
    }
    // A little restlessness.
    yaw += 0.12 * Math.sin(time * 0.31 + w.phase * 3) + 0.06 * Math.sin(time * 0.73 + w.phase);
    pitch += 0.03 * Math.sin(time * 0.47 + w.phase * 2);
    const k = 1 - Math.exp(-dt * 4);
    f.neck.rotation.y = lerp(f.neck.rotation.y, yaw, k);
    f.neck.rotation.z = lerp(f.neck.rotation.z, pitch, k);
  }
}

// Bends an arm so its hand reaches (f forward, y up, z right) in its figure's
// frame, blended with the pose it has by `w`. Two joints in the plane of the arm.
const L1 = 0.72, L2 = 0.68;
function reachArm({ S, E, s }, f, y, z, w) {
  const dy = 2.55 - y, d = Math.min(L1 + L2 - 0.02, Math.max(0.3, Math.hypot(f, dy)));
  const th = Math.atan2(f, dy);
  const a = Math.acos(clamp01((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d)));
  const g = Math.acos(Math.max(-1, Math.min(1, (L1 * L1 + L2 * L2 - d * d) / (2 * L1 * L2))));
  S.rotation.z = lerp(S.rotation.z, th - a, w);
  E.rotation.z = lerp(E.rotation.z, Math.PI - g, w);
  S.rotation.x = lerp(S.rotation.x, -Math.atan2(z - s * 0.36, d), w);
}
// Piecewise-smooth keyframes: [[p, value], ...], value a number or [f, y].
function keyed(keys, p) {
  let i = 0;
  while (i < keys.length - 2 && p > keys[i + 1][0]) i++;
  const [p0, a] = keys[i], [p1, b] = keys[i + 1];
  const k = smooth(clamp01((p - p0) / (p1 - p0)));
  return Array.isArray(a) ? a.map((v, j) => lerp(v, b[j], k)) : lerp(a, b, k);
}
// One man's turn, p from 0 to 1: Moses turns to the basin and fills the jug,
// turns and steps to the man, pours over his cupped hands, then his feet.
const MOSES_STEP = [[0, 0], [0.3, 0], [0.4, 0.3], [0.88, 0.3], [1, 0]];
const JUG_HAND = [[0, [0.45, 2.1]], [0.11, [1.05, 2.6]], [0.17, [1.05, 2.32]], [0.23, [1.05, 2.32]], [0.3, [0.45, 2.15]],
  [0.42, [0.62, 2.25]], [0.63, [0.62, 2.25]], [0.71, [0.95, 1.62]], [0.87, [0.95, 1.62]], [0.95, [0.45, 2.1]], [1, [0.45, 2.1]]];
const JUG_TILT = [[0, 0], [0.45, 0], [0.5, 1.3], [0.62, 1.3], [0.66, 0.4], [0.73, 1.35], [0.86, 1.35], [0.92, 0], [1, 0]];
const HANDS_OUT = [[0, 0], [0.34, 0], [0.43, 1], [0.64, 1], [0.7, 0], [1, 0]];
const _hand = new THREE.Vector3(), _spout = new THREE.Vector3(), _q = new THREE.Quaternion();
function washing(time) {
  const on = atBasin() > 0.999;
  jug.visible = on;
  stream.visible = false;
  for (const d of drops) d.m.visible = false;
  for (const k of WASH_ORDER) {
    const done = on ? clamp01((tour.washT - TURN * (WASH_ORDER.indexOf(k) + 0.7)) / (TURN * 0.2)) : 0;
    wet[k].material.opacity = 0.45 * done;
  }
  if (!on) return;
  const M = moses.G;
  const turn = Math.floor(tour.washT / TURN);
  const all = turn >= WASH_ORDER.length;
  const p = all ? 1 : (tour.washT / TURN) % 1;
  const man = walkerOf[WASH_ORDER[Math.min(turn, WASH_ORDER.length - 1)]];
  // Moses turns to the basin to fill the jug, back to the man, and steps towards him.
  const toMan = yawTo(POURER, WASH_AT), basin = yawTo(POURER, LAVER);
  const turnTo = (a, b, k) => a + Math.atan2(Math.sin(b - a), Math.cos(b - a)) * k;
  M.rotation.y = all ? toMan : p < 0.26 ? turnTo(toMan, basin, keyed([[0, 0], [0.12, 1]], p)) : turnTo(basin, toMan, keyed([[0.26, 0], [0.38, 1]], p));
  const step = all ? 0 : keyed(MOSES_STEP, p);
  M.position.copy(plan(POURER)).add(_tmp.set(Math.cos(toMan), 0, -Math.sin(toMan)).multiplyScalar(step));
  M.updateMatrixWorld(true);
  // The jug in his right hand.
  const right = moses.arms[1];
  const [hf, hy] = keyed(JUG_HAND, p);
  reachArm(right, hf, hy, 0.3, 1);
  right.E.updateMatrixWorld(true);
  right.E.localToWorld(_hand.set(0, -0.68, 0));
  const tilt = keyed(JUG_TILT, p);
  jug.position.copy(_hand).add(_tmp.set(0, -0.14, 0));
  jug.rotation.set(0, M.rotation.y, -tilt, 'YXZ');
  jug.updateMatrixWorld(true);
  jug.localToWorld(_spout.copy(SPOUT));
  // The man holds out his hands under the spout while it pours on them.
  const out = keyed(HANDS_OUT, p);
  if (out > 0 && !all) {
    const G = man.fig.G;
    G.updateMatrixWorld(true);
    const local = G.worldToLocal(_tmp.copy(_spout));
    for (const arm of man.fig.arms) {
      reachArm(arm, Math.max(0.3, local.x), _spout.y - 0.32 + 0.02 * Math.sin(time * 9 + arm.s), local.z + arm.s * 0.05, out);
    }
  }
  // Water runs while the jug is tipped: onto the hands, then the feet.
  if (tilt > 0.95 && !all) {
    const top = _spout.y, floor = 0.03;
    const onHands = p < 0.66;
    const stop = onHands ? Math.max(floor, top - 0.3) : floor;
    stream.visible = true;
    stream.position.copy(_spout);
    stream.scale.set(1, top - stop, 1);
    for (const d of drops) {
      const u = (time * 1.6 + d.phase) % 1;
      // Drips falling from the hands, or splashing round the feet.
      const y0 = onHands ? stop : floor + 0.15;
      d.m.visible = true;
      d.m.position.set(_spout.x + d.dx * (onHands ? 1 : 2.5), y0 - (y0 - floor) * u * u, _spout.z + d.dz * (onHands ? 1 : 2.5));
    }
    const wm = wet[WASH_ORDER[turn]];
    wm.position.set(_spout.x, 0.025, _spout.z);
    if (!onHands) wm.material.opacity = Math.max(wm.material.opacity, 0.45 * keyed([[0.7, 0], [0.86, 1]], p));
  }
}
// ---------------------------------------------------------------- explore mode
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI * 0.49;
controls.minDistance = 0.8;
controls.maxDistance = 600;

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
const capital = (s) => s[0].toUpperCase() + s.slice(1);

function showPopup(st) {
  const chips = `<ul class="chips" aria-label="${t('materialChips')}">
      ${Object.entries(MATERIALS)
        .map(([k, m]) => {
          const yes = st.materials.includes(k);
          return `<li class="${yes ? 'yes' : 'no'}" title="${t(yes ? 'named' : 'notUsed')}">${esc(tr(m))}</li>`;
        }).join('')}
    </ul>`;
  const stones = st.stones ? `<div class="stones-title">${t('stoneRows')}</div>
    <ol class="stones">${STONES.map((s) => `<li><i style="background:${s.color}"></i>${esc(capital(tr(s.name)))}</li>`).join('')}</ol>` : '';
  ui.popup.innerHTML = `
    <div class="kicker">${t('stopOf', { n: st.i + 1, total: stops.length })} · ${esc(tr(st.ref))} (${VERSIONS[current.version].abbr})</div>
    <h2>${esc(tr(st.title))}</h2>
    <blockquote>${esc(tr(st.quote))}</blockquote>
    <p>${esc(tr(st.note))}</p>
    ${chips}
    ${stones}
    ${st.size ? `<div class="facts"><span>${t('size')}</span> ${esc(tr(st.size))}</div>` : ''}
    ${st.made ? `<div class="facts"><span>${t('madeBy')}</span> ${esc(tr(st.made))}</div>` : ''}
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
    </div>
    <p class="credits">${noticeHTML()}<br>${feedbackHTML()}</p>`;
  ui.card.classList.toggle('low', finale);
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
applyStatic(0);
setVersion(current.version);
showCard(INTRO, false);
setPlaying(false);

const clock = new THREE.Clock();
const noKeys = new Set();
let viewShift = 0;   // shifts the frame right so the popup doesn't cover the subject
let viewLift = 0;    // shifts the frame up on phones in the finale
let time = 0;
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05);
  time += dt;
  update(dt);
  updateEffects(time);
  const wantShift = !tour.explore && (tour.phase === 'hold' || tour.phase === 'fly' || tour.phase === 'finale') && innerWidth > 900 ? 0.14 : 0;
  // On phones the popup and finale card sit at the bottom, so lift the frame instead.
  const wantLift = !tour.explore && tour.phase !== 'intro' && innerWidth <= 640 ? 0.22 : 0;
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
  tour, stops, jump, next, applyStatic, view, groups,
  advance(sec) { for (let t = 0; t < sec; t += 0.05) update(0.05); },
};
