import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { ground, noise2, COURT_Y } from './terrain.js';
import * as DATA from './data.js';
import {
  VERSIONS, current, chooseVersion, setVersion as useVersion, remember, pick, t,
  localizeDOM, fillVersionSelect, noticeHTML, feedbackHTML, loadLanguages,
} from '../i18n.js';
import { createNarrator, titleLine, verseLine } from '../narrator.js';
import { track } from '../analytics.js';

const { HOUSE, PORCH, COURT, GREAT, PLACES, FEATURES, STOPS, INTRO, FINALE, TERMS, MATERIALS } = DATA;
await loadLanguages(DATA, import.meta.url);

// ---------------------------------------------------------------- constants
// One world unit is one cubit. The floor of the house is at y = 0.
const COURSE = 1.5;                  // height of a course of stone (a guess)
const STEPS = [5, 11];               // where the house wall steps in for the side chambers (6:6)
const thick = (y) => (y < STEPS[0] ? 6 : y < STEPS[1] ? 5 : 4);   // the house wall's thickness
const CH_IN = 21;                    // inner face of the side chambers' outer wall, from the axis
const CH_T = 3;                      // that wall's thickness (not given)
const CH_W = HOUSE.west - 6 - 5;     // the same at the back (x)
const CH_TOP = 18;                   // three storeys of 5 cubits with their floors (6:10)
const FRONT = HOUSE.east + 6;        // outer face of the front wall
const PORCH_E = FRONT + PORCH.depth; // front of the porch
const DOOR = { half: 2.5, h: 10 };   // the main room's doorway: a fourth of the wall (6:33); its height is a guess
const INNER_DOOR = { half: 2, h: 8, apex: 10 };   // the inner sanctuary's: a fifth, five-sided (6:31)
const STAIR = { x: -20.5, n: -18.5 };
const OVERVIEW_C = new THREE.Vector3(-5, 4, 10);
const FINALE_LOOK = new THREE.Vector3(-15, 14, 0);
const HOLD_SCALE = 0.5;  // default pause at each stop, relative to the reading-time estimate
const SOUTH_EAST = 0.75; // overview angle: from the south-east, over the Kidron

// ---------------------------------------------------------------- helpers
function mulberry32(a) {
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(966);
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
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
scene.fog = new THREE.Fog(0xe6dcc8, 1400, 7500);
// A soft environment so the gold and bronze read as metal.
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.55;

const camera = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, 0.5, 16000);

scene.add(new THREE.HemisphereLight(0xdfeaff, 0xc4a77a, 1.1));
const sun = new THREE.DirectionalLight(0xfff0d4, 2.7);
sun.position.copy(OVERVIEW_C).add(new THREE.Vector3(260, 420, 200));
sun.target.position.copy(OVERVIEW_C);
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
Object.assign(sun.shadow.camera, { left: -175, right: 175, top: 175, bottom: -175, near: 100, far: 1400 });
sun.shadow.bias = -0.0003;
sun.shadow.normalBias = 0.05;
scene.add(sun, sun.target);

function skyTexture() {
  const c = document.createElement('canvas');
  c.width = 4; c.height = 512;
  const g = c.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#5f9fdc');
  grad.addColorStop(0.55, '#bcd6ea');
  grad.addColorStop(1, '#efe2c6');
  g.fillStyle = grad;
  g.fillRect(0, 0, 4, 512);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ---------------------------------------------------------------- materials
const YARN = ['#3b3f8f', '#6b2d6b', '#b3242c'];   // blue (violet), purple, crimson

function canvasTexture(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return t;
}
function speckle(g, w, h, n, dark = 0.06, light = 0.06) {
  for (let i = 0; i < n; i++) {
    g.fillStyle = rand() < 0.5 ? `rgba(60,45,30,${rand() * dark})` : `rgba(255,250,235,${rand() * light})`;
    g.fillRect(rand() * w, rand() * h, 1 + rand() * 3, 1 + rand() * 2);
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
  }
  g.fillStyle = body;
  g.beginPath();
  g.ellipse(cx, cy + 40 * k, 15 * k, 42 * k, 0, 0, Math.PI * 2);
  g.fill();
  g.beginPath();
  g.arc(cx, cy - 12 * k, 13 * k, 0, Math.PI * 2);
  g.fill();
}
function palm(g, cx, base, top, k, color) {
  g.strokeStyle = color;
  g.lineWidth = 7 * k;
  g.beginPath();
  g.moveTo(cx, base);
  g.quadraticCurveTo(cx - 6 * k, (base + top) / 2, cx, top);
  g.stroke();
  g.lineWidth = 5 * k;
  for (let i = 0; i < 7; i++) {
    const a = Math.PI * (0.05 + (i / 6) * 0.9);
    g.beginPath();
    g.moveTo(cx, top);
    g.quadraticCurveTo(cx + Math.cos(a) * 30 * k, top - Math.sin(a) * 34 * k, cx + Math.cos(a) * 52 * k, top - Math.sin(a) * 14 * k);
    g.stroke();
  }
}
function flower(g, cx, cy, r, color) {
  g.fillStyle = color;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    g.beginPath();
    g.ellipse(cx + Math.cos(a) * r * 0.55, cy + Math.sin(a) * r * 0.55, r * 0.42, r * 0.2, a, 0, Math.PI * 2);
    g.fill();
  }
  g.beginPath();
  g.arc(cx, cy, r * 0.25, 0, Math.PI * 2);
  g.fill();
}

const TEX = {
  // Dressed limestone in courses (6:7). One tile = 6 cubits by 2 courses (3 cubits).
  stone: canvasTexture(512, 256, (g, w, h) => {
    g.fillStyle = '#d6c8a8';
    g.fillRect(0, 0, w, h);
    speckle(g, w, h, 3000, 0.08, 0.1);
    for (let r = 0; r < 2; r++) {
      const off = r ? w / 4 : 0;
      for (let k = -1; k < 3; k++) {
        const x = off + (k * w) / 2;
        g.fillStyle = `rgba(${120 + rand() * 40},${100 + rand() * 30},${70 + rand() * 20},${0.06 + rand() * 0.08})`;
        g.fillRect(x + 3, r * h / 2 + 3, w / 2 - 6, h / 2 - 6);
        g.fillStyle = 'rgba(90,72,48,0.55)';
        g.fillRect(x - 1, r * h / 2, 3, h / 2);
      }
      g.fillRect(0, r * h / 2 - 1, w, 3);
    }
  }),
  // Cedar boards, carved with gourds and open flowers (6:18). One tile = 4 cubits.
  // Drawn pale: the colour comes from the material, so the same carving shows through the gold.
  cedar: canvasTexture(256, 256, (g, s) => {
    g.fillStyle = '#e4d6ca';
    g.fillRect(0, 0, s, s);
    for (let x = 0; x < s; x += 2) { g.fillStyle = `rgba(60,40,30,${rand() * 0.1})`; g.fillRect(x, 0, 1 + rand() * 2, s); }
    for (let x = 0; x < s; x += 32) { g.fillStyle = 'rgba(50,35,25,0.3)'; g.fillRect(x, 0, 2, s); }
    // A band of gourds, a row of open flowers, a band of gourds.
    for (const y of [40, 216]) {
      g.fillStyle = 'rgba(70,50,35,0.3)';
      g.fillRect(0, y - 14, s, 28);
      for (let x = 8; x < s; x += 16) {
        g.fillStyle = '#fff4ea';
        g.beginPath(); g.ellipse(x, y, 6, 9, 0, 0, Math.PI * 2); g.fill();
      }
    }
    for (let x = 32; x < s; x += 64) flower(g, x, 128, 26, '#fff4ea');
  }),
  // Cypress floorboards (6:15). One tile = 4 cubits. Pale, like the cedar.
  cypress: canvasTexture(256, 256, (g, s) => {
    g.fillStyle = '#efe4d4';
    g.fillRect(0, 0, s, s);
    for (let y = 0; y < s; y += 32) {
      g.fillStyle = 'rgba(80,55,30,0.35)';
      g.fillRect(0, y, s, 2);
      for (let k = 0; k < 40; k++) { g.fillStyle = `rgba(90,60,30,${rand() * 0.15})`; g.fillRect(rand() * s, y + 3 + rand() * 26, 20 + rand() * 60, 1); }
      g.fillStyle = 'rgba(80,55,30,0.4)';
      g.fillRect(((y / 32) * 97) % s, y, 2, 32);
    }
  }),
  // Cedar beams and planks, seen from below. One tile = 4 cubits.
  beams: canvasTexture(128, 128, (g, s) => {
    g.fillStyle = '#8e5532';
    g.fillRect(0, 0, s, s);
    for (let x = 0; x < s; x += 2) { g.fillStyle = `rgba(50,25,10,${rand() * 0.15})`; g.fillRect(x, 0, 1, s); }
    for (let y = 0; y < s; y += 16) { g.fillStyle = 'rgba(40,20,8,0.3)'; g.fillRect(0, y, s, 1); }
  }),
  // Carved cherubim between palm trees, over a row of open flowers (6:29). One tile = 8 x 8 cubits.
  carving: canvasTexture(512, 512, (g, s) => {
    g.clearRect(0, 0, s, s);
    const c = '#d9a838';
    for (const x of [0, s / 2, s]) palm(g, x, 300, 120, 1.6, c);
    for (const x of [s / 4, (3 * s) / 4]) cherub(g, x, 150, 1.2, c, c);
    for (let x = 32; x < s; x += 64) flower(g, x, 400, 24, c);
    g.fillStyle = c;
    g.fillRect(0, 352, s, 5); g.fillRect(0, 446, s, 5);
  }),
  // The veil: blue, purple and crimson and fine linen, with cherubim (2 Chronicles 3:14).
  veil: canvasTexture(512, 512, (g, s) => {
    const grad = g.createLinearGradient(0, 0, 0, s);
    grad.addColorStop(0, YARN[0]); grad.addColorStop(0.5, YARN[1]); grad.addColorStop(1, YARN[2]);
    g.fillStyle = grad;
    g.fillRect(0, 0, s, s);
    for (let i = 0; i < s; i += 2) { g.fillStyle = `rgba(0,0,0,${rand() * 0.07})`; g.fillRect(0, i, s, 1); }
    g.fillStyle = '#efe6d2';
    g.fillRect(0, 0, s, 10); g.fillRect(0, s - 10, s, 10);
    for (const [x, y] of [[128, 150], [384, 150], [128, 380], [384, 380]]) cherub(g, x, y, 1.05, '#d8b24a', '#efe6d2');
  }),
  // Lattice of checker work (7:17), drawn over the capitals' bowls. One tile = 1 cubit.
  lattice: canvasTexture(64, 64, (g, s) => {
    g.clearRect(0, 0, s, s);
    g.strokeStyle = '#ffffff';
    g.lineWidth = 6;
    g.beginPath();
    g.moveTo(0, 0); g.lineTo(s, s); g.moveTo(s, 0); g.lineTo(0, s);
    g.stroke();
  }),
  // Panels of the stands: lions, oxen and cherubim, with wreaths (7:29, 36). One tile per side.
  panel: canvasTexture(256, 256, (g, s) => {
    g.fillStyle = '#b07a42';
    g.fillRect(0, 0, s, s);
    g.fillStyle = 'rgba(60,35,15,0.5)';
    g.fillRect(0, 0, s, 14); g.fillRect(0, s - 14, s, 14); g.fillRect(0, 0, 14, s); g.fillRect(s - 14, 0, 14, s);
    g.fillRect(s / 2 - 5, 14, 10, s - 28);
    const c = '#7a4e22';
    cherub(g, s / 4, 100, 0.55, c, c);
    // A lion and an ox, schematically.
    g.fillStyle = c;
    g.beginPath(); g.ellipse((3 * s) / 4, 90, 34, 16, 0, 0, Math.PI * 2); g.fill();
    g.beginPath(); g.arc((3 * s) / 4 + 34, 78, 15, 0, Math.PI * 2); g.fill();
    g.beginPath(); g.ellipse((3 * s) / 4, 180, 36, 17, 0, 0, Math.PI * 2); g.fill();
    g.fillRect((3 * s) / 4 + 28, 164, 18, 16);
    for (const x of [-24, -8, 10, 26]) { g.fillRect((3 * s) / 4 + x, 98, 5, 22); g.fillRect((3 * s) / 4 + x, 190, 5, 22); }
    for (let x = 22; x < s; x += 26) { g.strokeStyle = c; g.lineWidth = 3; g.beginPath(); g.arc(x, 232, 8, 0, Math.PI * 2); g.stroke(); }
  }),
  // Gold doors carved with cherubim, palm trees and open flowers (6:32, 35).
  door: canvasTexture(256, 512, (g, w, h) => {
    g.fillStyle = '#e0ad3c';
    g.fillRect(0, 0, w, h);
    const c = 'rgba(120,80,10,0.75)';
    g.strokeStyle = c; g.lineWidth = 6;
    g.strokeRect(10, 10, w - 20, h - 20);
    cherub(g, w / 2, 150, 0.9, c, c);
    palm(g, w / 2, 470, 330, 1.1, c);
    flower(g, w / 4, 300, 18, c); flower(g, (3 * w) / 4, 300, 18, c);
  }),
};
TEX.lattice.repeat.set(16, 2);

const MAT = {
  stone: new THREE.MeshStandardMaterial({ map: TEX.stone, roughness: 0.92 }),
  great: new THREE.MeshStandardMaterial({ map: TEX.stone, color: 0xd9ccb4, roughness: 0.95 }),
  cedar: new THREE.MeshStandardMaterial({ map: TEX.cedar, color: 0xa9663f, roughness: 0.75 }),
  cypress: new THREE.MeshStandardMaterial({ map: TEX.cypress, color: 0xc89a66, roughness: 0.8 }),
  beams: new THREE.MeshStandardMaterial({ map: TEX.beams, roughness: 0.85 }),
  olive: new THREE.MeshStandardMaterial({ color: 0xa88a5a, roughness: 0.75 }),
  gold: new THREE.MeshStandardMaterial({ color: 0xe0ad3c, metalness: 0.85, roughness: 0.3 }),
  door: new THREE.MeshStandardMaterial({ map: TEX.door, metalness: 0.8, roughness: 0.35 }),
  bronze: new THREE.MeshStandardMaterial({ color: 0xb5773d, metalness: 0.8, roughness: 0.38 }),
  panel: new THREE.MeshStandardMaterial({ map: TEX.panel, metalness: 0.75, roughness: 0.42 }),
  lattice: new THREE.MeshStandardMaterial({ alphaMap: TEX.lattice, color: 0xa86c34, metalness: 0.8, roughness: 0.4, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide }),
  veil: new THREE.MeshStandardMaterial({ map: TEX.veil, roughness: 1, side: THREE.DoubleSide }),
  water: new THREE.MeshStandardMaterial({ color: 0x5aa0b8, roughness: 0.1, metalness: 0.2, emissive: 0x0b2a3a }),
  bread: new THREE.MeshStandardMaterial({ color: 0xd9ac6c, roughness: 0.9 }),
  flame: new THREE.MeshBasicMaterial({ color: 0xffb347 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x2a2018, roughness: 1 }),
  plain: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95 }),
  carving: new THREE.MeshStandardMaterial({ map: TEX.carving, transparent: true, opacity: 0, alphaTest: 0.05, depthWrite: false, metalness: 0.9, roughness: 0.25, polygonOffset: true, polygonOffsetFactor: -2 }),
  skin: new THREE.MeshStandardMaterial({ color: 0xa8754f, roughness: 0.8 }),
  hair: new THREE.MeshStandardMaterial({ color: 0x3a2a1e, roughness: 1 }),
  linen: new THREE.MeshStandardMaterial({ color: 0xf2ede1, roughness: 1, side: THREE.DoubleSide }),
  rope: new THREE.MeshStandardMaterial({ color: 0xcbb68a, roughness: 1 }),
  log: new THREE.MeshStandardMaterial({ color: 0x7a5a3c, roughness: 1 }),
};

// Gilding: a material that turns to gold as group `key` goes up (6:20–22, 28, 30, 32, 35).
const GILD = [];
const GOLD = new THREE.Color(0xf2c55e);
function gilded(base, key) {
  const m = base.clone();
  GILD.push({ m, key, c0: m.color.clone(), m0: m.metalness, r0: m.roughness });
  return m;
}
function updateGilding() {
  for (const g of GILD) {
    const p = smooth(groupP(g.key));
    g.m.color.copy(g.c0).lerp(GOLD, p);
    g.m.metalness = lerp(g.m0, 0.85, p);
    g.m.roughness = lerp(g.r0, 0.32, p);
  }
}

// Cutaways: materials that fade for stops with `cutaway` (sets: 'house', 'chambers').
const CUTS = [];
function cutMat(m, sets) {
  m.userData.cut = sets;
  CUTS.push(m);
  return m;
}
Object.assign(MAT, {
  stoneS: cutMat(MAT.stone.clone(), ['house']),                  // the house's south wall
  stoneCh: cutMat(MAT.stone.clone(), ['house', 'chambers']),     // the side chambers' south wall
  beamsS: cutMat(MAT.beams.clone(), ['house']),                  // the south chambers' floors
  roof: cutMat(MAT.beams.clone(), ['house']),                    // the roof of the house
});
// Lining that turns to gold; the south lining and the ceilings also fade for the cutaway.
Object.assign(MAT, {
  lining: gilded(MAT.cedar, 'gold'),
  liningS: cutMat(gilded(MAT.cedar, 'gold'), ['house']),
  ceiling: cutMat(gilded(MAT.cedar, 'gold'), ['house']),
  floor: gilded(MAT.cypress, 'goldFloor'),
  partition: gilded(MAT.cedar, 'gold'),
  cherub: gilded(MAT.olive, 'cherubGold'),
});

// Box geometry in world coordinates, plan x0..x1, n0..n1, y0..y1, with UVs
// that follow the world: u along the face, v up, so courses line up across pieces.
function worldBox(x0, x1, n0, n1, y0, y1, tu = 6, tv = 3) {
  const geo = new THREE.BoxGeometry(x1 - x0, y1 - y0, n1 - n0).translate((x0 + x1) / 2, (y0 + y1) / 2, -(n0 + n1) / 2);
  const p = geo.attributes.position, nr = geo.attributes.normal, uv = geo.attributes.uv;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    if (Math.abs(nr.getY(i)) > 0.5) uv.setXY(i, x / tu, z / tu);
    else if (Math.abs(nr.getX(i)) > 0.5) uv.setXY(i, -z / tu, y / tv);
    else uv.setXY(i, x / tu, y / tv);
  }
  return geo;
}
// A mesh made from world-space geometry, re-centred so it can be animated in place.
function worldMesh(geos, mat, parent = scene) {
  const geo = geos.length > 1 ? mergeGeometries(geos) : geos[0];
  geo.computeBoundingBox();
  const c = geo.boundingBox.getCenter(new THREE.Vector3());
  geo.translate(-c.x, -c.y, -c.z);
  const m = new THREE.Mesh(geo, mat);
  m.position.copy(c);
  m.castShadow = m.receiveShadow = true;
  parent.add(m);
  return m;
}
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
const lathe = (pts, seg = 28) => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), seg);

// ---------------------------------------------------------------- terrain
{
  const X0 = -1700, X1 = 2700, N0 = -2900, N1 = 1500, SEG = 220;
  const geo = new THREE.PlaneGeometry(X1 - X0, N1 - N0, SEG, SEG);
  geo.rotateX(-Math.PI / 2);
  geo.translate((X0 + X1) / 2, 0, -(N0 + N1) / 2);
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) p.setY(i, ground(p.getX(i), -p.getZ(i)) - 0.15);
  const g2 = geo.toNonIndexed();
  g2.computeVertexNormals();
  const pos = g2.attributes.position, nor = g2.attributes.normal;
  const col = new Float32Array(pos.count * 3);
  const C = {
    soil: new THREE.Color('#c7ac80'), rock: new THREE.Color('#b9ab92'), scrub: new THREE.Color('#9c9a66'),
    valley: new THREE.Color('#8f9a5e'), court: new THREE.Color('#e3d6b8'),
  };
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i += 3) {
    const x = (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3;
    const n = -(pos.getZ(i) + pos.getZ(i + 1) + pos.getZ(i + 2)) / 3;
    const h = (pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3;
    const slope = 1 - nor.getY(i);
    c.copy(C.soil).lerp(C.scrub, clamp01((noise2(x / 140, n / 140) - 0.3) * 1.6));
    c.lerp(C.valley, clamp01((-h - 150) / 120));
    c.lerp(C.rock, clamp01((slope - 0.12) / 0.25));
    const j = 0.93 + noise2(x / 20, n / 20) * 0.12;
    for (let k = 0; k < 3; k++) {
      col[(i + k) * 3] = c.r * j; col[(i + k) * 3 + 1] = c.g * j; col[(i + k) * 3 + 2] = c.b * j;
    }
  }
  g2.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const terrain = new THREE.Mesh(g2, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true }));
  terrain.receiveShadow = true;
  scene.add(terrain);

  // Level ground of the courts, a little paler where it is trodden.
  const greatPad = new THREE.Mesh(
    new THREE.PlaneGeometry(GREAT.east - GREAT.west, GREAT.north - GREAT.south).rotateX(-Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0xd6c6a2, roughness: 1 }),
  );
  greatPad.position.set((GREAT.east + GREAT.west) / 2, -1.48, -(GREAT.north + GREAT.south) / 2);
  const courtPad = new THREE.Mesh(
    new THREE.PlaneGeometry(COURT.east - COURT.west, COURT.half * 2).rotateX(-Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: C.court, roughness: 1 }),
  );
  courtPad.position.set((COURT.east + COURT.west) / 2, COURT_Y + 0.02, 0);
  greatPad.receiveShadow = courtPad.receiveShadow = true;
  scene.add(greatPad, courtPad);
}

// ---------------------------------------------------------------- build groups
// Each piece belongs to a group named in STOPS[].build. A group's progress p
// (0..1) raises its pieces one after another: 'drop' falls in with a little
// overshoot, 'lower' comes down at full size (courses of stone), 'grow' scales up in place.
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
  const w = Math.min(1, Math.max(0.06, 4 / n));   // each piece's share of the group's time
  g.items.forEach((it, i) => setItem(it, clamp01((p - (n > 1 ? i / (n - 1) : 0) * (1 - w)) / w)));
}
const groupP = (key) => Math.max(0, groups[key]?.p ?? 0);
// A group with nothing to raise still needs to exist, for the effects keyed to it.
function marker(key) { piece(key, placed(0, 0), 'grow'); }

// Things shown from one group's start until another's end, such as the builders.
const showings = [];
function shown(obj, from, until) { showings.push({ obj, from, until }); return obj; }
function updateShowings() {
  for (const s of showings) s.obj.visible = groupP(s.from) > 0 && !(s.until && groupP(s.until) >= 1);
}

// ---------------------------------------------------------------- walls of stone
// A wall run is laid course by course. `along` 'x': from a to b in x, inner face
// at n = inner, thickening outwards in n by `dir`; 'n': from a to b in n, inner
// face at x = inner. a, b and t may be functions of the height. `open` cuts
// openings { a, b, y0, y1 } along the run. All the runs given to one call are
// laid together, course by course, as the pieces of group `key`.
function layRuns(key, runs, lift = 4) {
  const top = Math.max(...runs.map((r) => r.y1));
  const val = (v, y) => (typeof v === 'function' ? v(y) : v);
  for (let ya = 0; ya < top - 1e-6; ya += COURSE) {
    const yb = ya + COURSE;
    for (const r of runs) {
      const lo = Math.max(ya, r.y0 ?? 0), hi = Math.min(yb, r.y1);
      if (hi - lo < 1e-6) continue;
      const cuts = [lo, hi];
      if (typeof r.t === 'function' || typeof r.a === 'function' || typeof r.b === 'function') cuts.push(...STEPS);
      for (const o of r.open ?? []) cuts.push(o.y0, o.y1);
      const ys = [...new Set(cuts.filter((y) => y >= lo && y <= hi))].sort((p, q) => p - q);
      const geos = [];
      for (let i = 1; i < ys.length; i++) {
        const y0 = ys[i - 1], y1 = ys[i], mid = (y0 + y1) / 2;
        if (y1 - y0 < 1e-6) continue;
        const t = val(r.t, mid), a = val(r.a, mid), b = val(r.b, mid);
        let spans = [[a, b]];
        for (const o of r.open ?? []) {
          if (o.y1 <= y0 || o.y0 >= y1) continue;
          spans = spans.flatMap(([u, v]) => [[u, Math.min(v, o.a)], [Math.max(u, o.b), v]]).filter(([u, v]) => v - u > 0.01);
        }
        const f0 = r.inner, f1 = r.inner + r.dir * t;
        for (const [u, v] of spans) {
          geos.push(r.along === 'x'
            ? worldBox(u, v, Math.min(f0, f1), Math.max(f0, f1), y0, y1)
            : worldBox(Math.min(f0, f1), Math.max(f0, f1), u, v, y0, y1));
        }
      }
      if (geos.length) piece(key, worldMesh(geos, r.mat ?? MAT.stone), 'lower', lift);
    }
  }
}

// The foundation of great stones (5:17; 6:37), under the house, the porch and the pillars.
{
  const X0 = CH_W - CH_T, X1 = PORCH_E + 10, N = CH_IN + CH_T;
  const nx = 12, nn = 6;
  for (let i = 0; i < nx; i++) {
    for (let j = 0; j < nn; j++) {
      const x0 = lerp(X0, X1, i / nx), x1 = lerp(X0, X1, (i + 1) / nx);
      const n0 = lerp(-N, N, j / nn), n1 = lerp(-N, N, (j + 1) / nn);
      const m = worldMesh([worldBox(x0 + 0.08, x1 - 0.08, n0 + 0.08, n1 - 0.08, -2, 0, 9, 3)], MAT.great);
      piece('foundation', m, 'drop', 5);
    }
  }
}

// The house (6:2): walls six cubits thick at the foot, stepping in for the
// side chambers (6:6). Windows high in the side walls of the main room (6:4).
const WINDOWS = [-34, -26, -18, -10, -3.5];
const WIN = { half: 1.25, y0: 21, y1: 27 };
{
  const winOpen = WINDOWS.map((x) => ({ a: x - WIN.half, b: x + WIN.half, y0: WIN.y0, y1: WIN.y1 }));
  const westOut = (y) => HOUSE.west - thick(y);
  layRuns('walls', [
    { along: 'x', a: westOut, b: FRONT, inner: -HOUSE.half, dir: -1, t: thick, y1: HOUSE.height, open: winOpen, mat: MAT.stoneS },
    { along: 'x', a: westOut, b: FRONT, inner: HOUSE.half, dir: 1, t: thick, y1: HOUSE.height, open: winOpen },
    { along: 'n', a: -HOUSE.half, b: HOUSE.half, inner: HOUSE.west, dir: -1, t: thick, y1: HOUSE.height },
    { along: 'n', a: -HOUSE.half, b: HOUSE.half, inner: HOUSE.east, dir: 1, t: 6, y1: HOUSE.height, open: [{ a: -DOOR.half, b: DOOR.half, y0: 0, y1: DOOR.h }] },
  ]);
}

// The porch, twenty by ten (6:3), twenty high (2 Chronicles 3:4), open at the front
// under a lintel, overlaid with gold inside (2 Chronicles 3:4).
{
  layRuns('porch', [
    { along: 'x', a: FRONT, b: PORCH_E, inner: -HOUSE.half, dir: -1, t: 6, y1: PORCH.height, mat: MAT.stoneS },
    { along: 'x', a: FRONT, b: PORCH_E, inner: HOUSE.half, dir: 1, t: 6, y1: PORCH.height },
  ], 3);
  piece('porch', worldMesh([worldBox(PORCH_E - 1.5, PORCH_E, -HOUSE.half, HOUSE.half, PORCH.height - 3, PORCH.height)], MAT.stone), 'lower', 3);
  for (const s of [-1, 1]) {
    piece('porch', worldMesh([worldBox(FRONT, PORCH_E - 1.5, s * (HOUSE.half - 0.06) - 0.03, s * (HOUSE.half - 0.06) + 0.03, 0, PORCH.height)], MAT.gold), 'grow');
  }
  for (const [a, b] of [[-HOUSE.half, -DOOR.half - 0.6], [DOOR.half + 0.6, HOUSE.half]]) {
    piece('porch', worldMesh([worldBox(FRONT + 0.03, FRONT + 0.09, a, b, 0, PORCH.height)], MAT.gold), 'grow');
  }
  piece('porch', worldMesh([worldBox(FRONT + 0.03, FRONT + 0.09, -DOOR.half - 0.6, DOOR.half + 0.6, DOOR.h + 0.8, PORCH.height)], MAT.gold), 'grow');
  // Its roof of cedar beams.
  const geos = [];
  for (let n = -HOUSE.half - 6; n < HOUSE.half + 6; n += 2.5) geos.push(worldBox(FRONT, PORCH_E, n + 0.2, n + 1.0, PORCH.height, PORCH.height + 0.8, 4, 4));
  geos.push(worldBox(FRONT, PORCH_E, -HOUSE.half - 6, HOUSE.half + 6, PORCH.height + 0.8, PORCH.height + 1.1, 4, 4));
  piece('porch', worldMesh(geos, MAT.beams), 'lower', 4);
}

// Window frames that narrow inwards, with a lattice (6:4).
for (const s of [-1, 1]) {
  for (const x of WINDOWS) {
    const mat = s < 0 ? MAT.stoneS : MAT.stone;
    const geos = [];
    const face = s * (HOUSE.half + 4);
    for (let k = 0; k < 3; k++) {
      const d = 0.35 + k * 0.35, n0 = face - s * (k + 1) * 1.1, n1 = face - s * k * 1.1;
      const lo = Math.min(n0, n1), hi = Math.max(n0, n1);
      geos.push(worldBox(x - WIN.half, x - WIN.half + d, lo, hi, WIN.y0, WIN.y1));
      geos.push(worldBox(x + WIN.half - d, x + WIN.half, lo, hi, WIN.y0, WIN.y1));
      geos.push(worldBox(x - WIN.half, x + WIN.half, lo, hi, WIN.y1 - d, WIN.y1));
      geos.push(worldBox(x - WIN.half, x + WIN.half, lo, hi, WIN.y0, WIN.y0 + d * 0.6));
    }
    for (let k = 1; k < 4; k++) geos.push(worldBox(x - WIN.half + (k * WIN.half * 2) / 4 - 0.06, x - WIN.half + (k * WIN.half * 2) / 4 + 0.06, face - s * 2.2 - 0.06, face - s * 2.2 + 0.06, WIN.y0, WIN.y1));
    for (let k = 1; k < 6; k++) geos.push(worldBox(x - WIN.half, x + WIN.half, face - s * 2.2 - 0.06, face - s * 2.2 + 0.06, WIN.y0 + k - 0.06, WIN.y0 + k + 0.06));
    piece('windows', worldMesh(geos, mat), 'drop', 3);
  }
}

// The side chambers (6:5–6, 10): three storeys round the sides and back, their
// floors resting on the ledges, the door on the south side (6:8).
const CH_DOOR = { a: -27, b: -24.5, y1: 4 };
{
  const wallFace = (y) => HOUSE.half + thick(y);
  layRuns('chambers', [
    { along: 'x', a: CH_W - CH_T, b: FRONT, inner: -CH_IN, dir: -1, t: CH_T, y1: CH_TOP, open: [{ a: CH_DOOR.a, b: CH_DOOR.b, y0: 0, y1: CH_DOOR.y1 }], mat: MAT.stoneCh },
    { along: 'x', a: CH_W - CH_T, b: FRONT, inner: CH_IN, dir: 1, t: CH_T, y1: CH_TOP },
    { along: 'n', a: -CH_IN, b: CH_IN, inner: CH_W, dir: -1, t: CH_T, y1: CH_TOP },
    { along: 'n', a: -CH_IN, b: (y) => -wallFace(y), inner: FRONT - CH_T, dir: 1, t: CH_T, y1: CH_TOP, mat: MAT.stoneS },
    { along: 'n', a: (y) => wallFace(y), b: CH_IN, inner: FRONT - CH_T, dir: 1, t: CH_T, y1: CH_TOP },
  ], 3);
  // Floors at 5 and 11, roof at 17 (each storey five cubits high), with a stairwell in the south floors.
  for (const y of [5, 11, 17]) {
    const roof = y === 17;
    const face = HOUSE.half + thick(y + 0.5), back = HOUSE.west - thick(y + 0.5);
    // Between the outer walls, not over them: the roof's top is level with theirs.
    const out = CH_IN;
    for (const s of [-1, 1]) {
      const spans = s < 0 && !roof ? [[back, STAIR.x - 3], [STAIR.x + 3, FRONT - CH_T]] : [[back, FRONT - CH_T]];
      const geos = spans.map(([a, b]) => worldBox(a, b, Math.min(s * face, s * out), Math.max(s * face, s * out), y, y + 1, 4, 4));
      piece('chambers', worldMesh(geos, s < 0 ? MAT.beamsS : MAT.beams), 'lower', 3);
    }
    piece('chambers', worldMesh([worldBox(CH_W, back, -out, out, y, y + 1, 4, 4)], MAT.beams), 'lower', 3);
  }
}

// The winding stair inside the door (6:8), up to the third storey's floor.
{
  const G = placed(STAIR.x, STAIR.n);
  const steps = 24, r = 2.3;
  // It fades with the house's south wall, so it doesn't stand in front of the views inside.
  const mat = cutMat(MAT.stone.clone(), ['house']);
  add(G, new THREE.CylinderGeometry(0.35, 0.35, 12, 10).translate(0, 6, 0), mat);
  for (let i = 0; i < steps; i++) {
    const a = (i / 12) * Math.PI * 2;
    const step = add(G, new THREE.CylinderGeometry(r, r, 0.3, 16, 1, false, 0, Math.PI / 6).translate(0, 0.15, 0), mat, 0, (i + 1) * 0.5 - 0.3, 0);
    step.rotation.y = a;
  }
  piece('stair', G, 'grow');
}

// The roof: cedar beams across the house, then planks (6:9).
{
  const geos = [], out = HOUSE.half + 4, west = HOUSE.west - 4;
  for (let x = west + 0.5; x < FRONT - 0.5; x += 2.5) geos.push(worldBox(x, x + 0.9, -out, out, HOUSE.height, HOUSE.height + 0.9, 4, 4));
  piece('roof', worldMesh(geos, MAT.roof), 'lower', 4);
  piece('roof', worldMesh([worldBox(west, FRONT, -out, out, HOUSE.height + 0.9, HOUSE.height + 1.2, 4, 4)], MAT.roof), 'lower', 4);
}

// ---------------------------------------------------------------- inside
// Cedar lining from the floor to the ceiling, the floor of cypress (6:15, 18).
// The lining turns to gold with the 'gold' group, the floor with 'goldFloor'.
const LINE = 0.08;
{
  const H = HOUSE, L = H.half - LINE;
  const lining = (geos, mat) => piece('panels', worldMesh(geos, mat), 'grow');
  // Main room: the side walls, the front wall round the door, the ceiling.
  lining([worldBox(H.inner, H.east, -H.half, -L, 0, H.height, 4, 4)], MAT.liningS);
  lining([worldBox(H.inner, H.east, L, H.half, 0, H.height, 4, 4)], MAT.lining);
  lining([
    worldBox(H.east - LINE, H.east, -L, -DOOR.half, 0, H.height, 4, 4),
    worldBox(H.east - LINE, H.east, DOOR.half, L, 0, H.height, 4, 4),
    worldBox(H.east - LINE, H.east, -DOOR.half, DOOR.half, DOOR.h, H.height, 4, 4),
  ], MAT.lining);
  lining([worldBox(H.inner, H.east, -H.half, H.half, H.height - LINE, H.height, 4, 4)], MAT.ceiling);
  // Inner sanctuary: its three walls up to its own ceiling.
  lining([worldBox(H.west, H.inner, -H.half, -L, 0, H.innerHeight, 4, 4)], MAT.liningS);
  lining([worldBox(H.west, H.inner, L, H.half, 0, H.innerHeight, 4, 4)], MAT.lining);
  lining([worldBox(H.west, H.west + LINE, -L, L, 0, H.innerHeight, 4, 4)], MAT.lining);
  piece('floor', worldMesh([worldBox(H.west, H.east, -H.half, H.half, 0, 0.12, 4, 4)], MAT.floor), 'grow');
  marker('gold');
}

// The inner sanctuary: a partition of cedar from floor to ceiling, twenty cubits
// from the back (6:16), with a five-sided doorway (6:31), and its own ceiling at twenty (6:20).
{
  const s = new THREE.Shape();
  const D = INNER_DOOR, H = HOUSE.half;
  s.moveTo(-H, 0); s.lineTo(-D.half, 0); s.lineTo(-D.half, D.h); s.lineTo(0, D.apex); s.lineTo(D.half, D.h);
  s.lineTo(D.half, 0); s.lineTo(H, 0); s.lineTo(H, HOUSE.height); s.lineTo(-H, HOUSE.height); s.closePath();
  const geo = new THREE.ExtrudeGeometry(s, { depth: 1, bevelEnabled: false });
  const uv = geo.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) / 4, uv.getY(i) / 4);
  geo.rotateY(Math.PI / 2);
  const m = add(scene, geo, MAT.partition, HOUSE.inner - 1, 0, 0);
  piece('partition', m, 'grow');
  piece('partition', worldMesh([worldBox(HOUSE.west, HOUSE.inner - 1, -HOUSE.half, HOUSE.half, HOUSE.innerHeight, HOUSE.innerHeight + 0.6, 4, 4)], MAT.ceiling), 'lower', 4);
}

// Gold chains across the front of the inner sanctuary (6:21).
{
  const link = new THREE.TorusGeometry(0.09, 0.025, 5, 8);
  for (const y of [13, 16, 19]) {
    const count = 120;
    const chain = new THREE.InstancedMesh(link, MAT.gold, count);
    const mtx = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
    for (let i = 0; i < count; i++) {
      const u = i / (count - 1), n = lerp(-HOUSE.half, HOUSE.half, u);
      const sag = 1.6 * (1 - (2 * u - 1) ** 2);
      e.set(i % 2 ? Math.PI / 2 : 0, 0, 0);
      q.setFromEuler(e);
      mtx.compose(new THREE.Vector3(HOUSE.inner + 0.25, y - sag, -n), q, new THREE.Vector3(1, 1, 1));
      chain.setMatrixAt(i, mtx);
    }
    chain.castShadow = true;
    scene.add(chain);
    piece('chains', chain, 'lower', 2);
  }
}

// The altar of cedar overlaid with gold by the inner sanctuary (6:20, 22; 7:48).
// No size is given; drawn like the wooden altar of Ezekiel 41:22, two cubits square, three high.
{
  const { x, n } = PLACES.incense;
  const G = placed(x, n);
  add(G, box(2, 3, 2), MAT.gold);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) add(G, box(0.25, 0.25, 0.25), MAT.gold, sx * 0.85, 3, sz * 0.85);
  add(G, box(2.2, 0.12, 2.2), MAT.gold, 0, 2.6, 0);
  piece('altarGold', G, 'drop', 4);
}

// The two cherubim of olive wood, ten cubits high, wings of five cubits, wall to
// wall (6:23–28), standing on their feet facing the main room (2 Chronicles 3:13).
{
  const wingShape = new THREE.Shape();
  const W = [[0, 0.6], [1.2, 1.25], [2.6, 1.45], [3.8, 1.55], [4.3, 1.5], [4.3, 1.0], [3.6, 0.45], [2.8, -0.25], [2.0, -0.85], [1.2, -1.35], [0.5, -1.4], [0, -0.7]];
  wingShape.moveTo(...W[0]);
  for (const p of W.slice(1)) wingShape.lineTo(...p);
  wingShape.closePath();
  const wingGeo = new THREE.ExtrudeGeometry(wingShape, { depth: 0.18, bevelEnabled: false }).rotateY(-Math.PI / 2);
  for (const side of [-1, 1]) {
    const C = placed(HOUSE.west + 8, side * 5);
    add(C, lathe([[0.001, 0], [1.15, 0], [1.05, 1.0], [0.9, 3.5], [0.85, 5.5], [0.95, 7.2], [1.0, 7.8], [0.55, 8.3], [0.3, 8.45]]), MAT.cherub);
    add(C, new THREE.CylinderGeometry(0.28, 0.32, 0.5, 10), MAT.cherub, 0, 8.4, 0);
    add(C, new THREE.SphereGeometry(0.72, 18, 12), MAT.cherub, 0.05, 9.25, 0);
    for (const s of [-1, 1]) add(C, box(0.9, 0.3, 0.45), MAT.cherub, 0.55, 0, s * 0.4);
    // Arms at the sides.
    for (const s of [-1, 1]) {
      const A = new THREE.Group();
      A.position.set(0, 7.7, s * 0.95);
      A.rotation.x = s * 0.12;
      C.add(A);
      add(A, new THREE.CylinderGeometry(0.24, 0.2, 3.4, 8).translate(0, -1.7, 0), MAT.cherub);
    }
    // Wings from the shoulders: one to the wall, one to the other cherub's.
    for (const s of [-1, 1]) {
      const w = add(C, wingGeo, MAT.cherub, -0.3, 8.0, s * 0.7);
      w.scale.z = s;
      w.rotation.x = s * -0.06;
    }
    piece('cherubim', C, 'grow');
  }
  marker('cherubGold');
}

// Carved cherubim, palm trees and open flowers on the walls (6:29), in gold.
const carvingMats = [];
{
  const H = HOUSE, d = 0.12;
  const band = (geo, cut) => {
    const m = cut ? MAT.carving.clone() : MAT.carving;
    if (cut) carvingMats.push(m);
    const mesh = worldMesh([geo], m);
    mesh.castShadow = false;
    piece('carvings', mesh, 'grow');
  };
  for (const [x0, x1, top] of [[H.inner, H.east, H.height - 2], [H.west, H.inner - 1, H.innerHeight - 2]]) {
    band(worldBox(x0, x1, H.half - d - 0.02, H.half - d, 2, top, 8, 8), false);
    band(worldBox(x0, x1, -H.half + d, -H.half + d + 0.02, 2, top, 8, 8), true);
  }
  band(worldBox(H.west + d, H.west + d + 0.02, -H.half + 0.2, H.half - 0.2, 2, H.innerHeight - 2, 8, 8), false);
  marker('goldFloor');
}

// The doors of olive wood, carved and overlaid with gold, on gold hinges (6:31–32; 7:50),
// open; the five-sided frame; the veil behind them (2 Chronicles 3:14).
{
  const D = INNER_DOOR, x = HOUSE.inner;
  const frame = [];
  frame.push(worldBox(x - 1.1, x + 0.15, -D.half - 0.4, -D.half, 0, D.h));
  frame.push(worldBox(x - 1.1, x + 0.15, D.half, D.half + 0.4, 0, D.h));
  piece('innerDoors', worldMesh(frame, MAT.gold), 'grow');
  for (const s of [-1, 1]) {
    const slant = add(scene, new THREE.BoxGeometry(1.25, 0.4, Math.hypot(D.half, D.apex - D.h) + 0.4), MAT.gold, x - 0.48, D.h + (D.apex - D.h) / 2, -s * D.half / 2);
    slant.rotation.x = -s * Math.atan2(D.apex - D.h, D.half);
    piece('innerDoors', slant, 'grow');
  }
  for (const s of [-1, 1]) {
    const hinge = new THREE.Group();
    hinge.position.set(x - 1, 0.05, -s * D.half);
    hinge.rotation.y = s * -1.75;     // swung back into the inner sanctuary
    scene.add(hinge);
    const leaf = add(hinge, box(0.18, D.h - 0.1, D.half - 0.05), MAT.door, 0, 0, s * (D.half - 0.05) / 2);
    leaf.material = MAT.door;
    piece('innerDoors', hinge, 'grow');
  }
  const veil = add(scene, box(0.08, D.apex + 1.5, D.half * 2 + 3), MAT.veil, x - 3.2, 0.05, 0);
  piece('veil', veil, 'lower', 8);
}

// The doors of the main room: two of cypress, each of two folding leaves, in
// square doorposts of olive wood, carved and overlaid with gold (6:33–35).
{
  const x = HOUSE.east, leaf = DOOR.half / 2;
  piece('outerDoors', worldMesh([
    worldBox(x + 6, x + 6.5, -DOOR.half - 0.6, -DOOR.half, 0, DOOR.h + 0.6),
    worldBox(x + 6, x + 6.5, DOOR.half, DOOR.half + 0.6, 0, DOOR.h + 0.6),
    worldBox(x + 6, x + 6.5, -DOOR.half - 0.6, DOOR.half + 0.6, DOOR.h, DOOR.h + 0.6),
  ], MAT.olive), 'grow');
  for (const s of [-1, 1]) {
    // Hinged at the doorpost, swung in; the outer leaf folds back on the inner.
    const H1 = new THREE.Group();
    H1.position.set(x + 0.4, 0.05, s * DOOR.half);
    H1.rotation.y = s * 1.2;
    scene.add(H1);
    add(H1, box(0.16, DOOR.h - 0.1, leaf - 0.04), MAT.door, 0, 0, -s * leaf / 2);
    const H2 = new THREE.Group();
    H2.position.set(0, 0, -s * leaf);
    H2.rotation.y = s * -2.2;
    H1.add(H2);
    add(H2, box(0.16, DOOR.h - 0.1, leaf - 0.04), MAT.door, 0, 0, -s * leaf / 2);
    piece('outerDoors', H1, 'grow');
  }
}

// ---------------------------------------------------------------- courts
// The inner court: three courses of cut stone and a course of cedar beams (6:36).
// The great court round it was built the same way (7:12), with doors overlaid
// with bronze (2 Chronicles 4:9). Sizes and gates aren't given.
function courtWall(key, { west, east, south, north }, y0, gates) {
  const T = 2, H = 3 * COURSE;
  const runs = [
    { along: 'x', a: west - T, b: east + T, inner: south, dir: -1, open: gates.south },
    { along: 'x', a: west - T, b: east + T, inner: north, dir: 1, open: gates.north },
    { along: 'n', a: south, b: north, inner: west, dir: -1, open: gates.west },
    { along: 'n', a: south, b: north, inner: east, dir: 1, open: gates.east },
  ];
  const all = [];
  for (let k = 0; k < 4; k++) {
    for (const r of runs) {
      const ya = y0 + k * COURSE, yb = k < 3 ? ya + COURSE : y0 + H + 0.8;
      let spans = [[r.a, r.b]];
      for (const o of r.open ?? []) spans = spans.flatMap(([u, v]) => [[u, Math.min(v, o[0])], [Math.max(u, o[1]), v]]).filter(([u, v]) => v - u > 0.01);
      const f0 = r.inner, f1 = r.inner + r.dir * T;
      const geos = spans.map(([u, v]) => (r.along === 'x'
        ? worldBox(u, v, Math.min(f0, f1), Math.max(f0, f1), ya, yb, k < 3 ? 6 : 4, k < 3 ? 3 : 4)
        : worldBox(Math.min(f0, f1), Math.max(f0, f1), u, v, ya, yb, k < 3 ? 6 : 4, k < 3 ? 3 : 4)));
      all.push(piece(key, worldMesh(geos, k < 3 ? MAT.stone : MAT.beams), 'lower', 3));
    }
  }
  return all;
}
courtWall('court', { west: COURT.west, east: COURT.east, south: -COURT.half, north: COURT.half }, COURT_Y, { east: [[-8, 8]] });
const GATE = 8;
courtWall('greatCourt', GREAT, -1.5, { east: [[-GATE, GATE]], south: [[-GATE, GATE]] });
// Gateways of the great court with doors overlaid with bronze, standing open.
for (const [x, n, along] of [[GREAT.east, 0, 'n'], [0, GREAT.south, 'x']]) {
  const G = placed(x, n, -1.5);
  if (along === 'x') G.rotation.y = -Math.PI / 2;
  for (const s of [-1, 1]) {
    add(G, box(3, 8, 3), MAT.stone, 1, 0, s * (GATE + 1.5));
    const hinge = new THREE.Group();
    hinge.position.set(0.5, 0, s * GATE);
    hinge.rotation.y = s * 1.3;
    G.add(hinge);
    add(hinge, box(0.3, 7, GATE - 0.1), MAT.bronze, 0, 0, -s * (GATE - 0.1) / 2);
  }
  add(G, box(3, 1.2, GATE * 2 + 6), MAT.stone, 1, 8, 0);
  piece('greatCourt', G, 'drop', 4);
}

// ---------------------------------------------------------------- Hiram's bronze work
// Jachin and Boaz (7:15–22): shafts eighteen cubits high and twelve round;
// capitals of five cubits, a bowl with lattice, chains and two rows of
// pomegranates, lily work above.
{
  const R = 12 / (2 * Math.PI), SHAFT = 18;
  for (const key of ['jachin', 'boaz']) {
    const { x, n } = PLACES[key];
    const S = placed(x, n);
    add(S, new THREE.CylinderGeometry(R, R * 1.02, SHAFT, 32).translate(0, SHAFT / 2, 0), MAT.bronze);
    piece('pillars', S, 'drop', 12);
    // The capital: the rounded bowl (7:20, 41), then the lily work (7:19, 22).
    const C = placed(x, n, SHAFT);
    add(C, lathe([[R, 0], [R + 0.25, 0.1], [R + 0.55, 0.45], [R + 0.6, 0.8], [R + 0.4, 1.15], [R + 0.05, 1.3], [R, 1.4]], 40), MAT.bronze);
    add(C, lathe([[R, 1.35], [R - 0.05, 2.0], [R + 0.1, 3.0], [R + 0.45, 3.9], [R + 0.85, 4.6], [R + 1.05, 4.95], [R + 0.6, 5.0], [0.001, 5.0]], 40), MAT.bronze);
    // Petals round the lily work.
    for (let k = 0; k < 16; k++) {
      const a = (k / 16) * Math.PI * 2;
      const p = add(C, new THREE.SphereGeometry(1, 10, 8), MAT.bronze, Math.cos(a) * (R + 0.55), 3.9, -Math.sin(a) * (R + 0.55));
      p.scale.set(0.18, 1.2, 0.5);
      p.rotation.y = a;
      p.rotation.z = Math.cos(a) * -0.35;
      p.rotation.x = Math.sin(a) * -0.35;
    }
    piece('capitals', C, 'lower', 6);
    // Lattice over the bowl, and seven wreaths of chain work (7:17).
    const L = placed(x, n, SHAFT);
    add(L, lathe([[R + 0.3, 0.1], [R + 0.62, 0.45], [R + 0.67, 0.8], [R + 0.47, 1.15], [R + 0.1, 1.3]], 40), MAT.lattice).castShadow = false;
    for (let k = 0; k < 7; k++) {
      const y = 0.25 + (k * 1.0) / 6;
      const r = R + 0.62 - Math.abs(y - 0.7) * 0.6;
      add(L, new THREE.TorusGeometry(r + 0.06, 0.04, 5, 48).rotateX(Math.PI / 2), MAT.bronze, 0, y, 0);
    }
    piece('network', L, 'grow');
    // Two hundred pomegranates in two rows (7:20).
    const pom = new THREE.SphereGeometry(0.13, 8, 6);
    for (const [y, r] of [[0.5, R + 0.78], [1.0, R + 0.74]]) {
      const im = new THREE.InstancedMesh(pom, MAT.bronze, 100);
      const mtx = new THREE.Matrix4();
      for (let i = 0; i < 100; i++) {
        const a = (i / 100) * Math.PI * 2 + (y > 0.6 ? 0.03 : 0);
        im.setMatrixAt(i, mtx.makeTranslation(Math.cos(a) * r, y, -Math.sin(a) * r));
      }
      im.position.copy(v3(x, n, SHAFT));
      scene.add(im);
      piece('pomegranates', im, 'grow');
    }
  }
}

// An ox of cast bronze, facing local +X (for the Sea, 7:25).
function ox(mat) {
  const G = new THREE.Group();
  const body = add(G, new THREE.SphereGeometry(1, 16, 10), mat, -0.1, 1.85, 0);
  body.scale.set(1.55, 0.72, 0.62);
  add(G, new THREE.CylinderGeometry(0.42, 0.5, 0.9, 10).rotateZ(-1.0), mat, 1.4, 2.15, 0);
  add(G, box(0.85, 0.6, 0.55), mat, 1.85, 1.95, 0);
  for (const s of [-1, 1]) {
    add(G, new THREE.ConeGeometry(0.08, 0.55, 6).rotateX(s * -1.2), mat, 1.75, 2.6, s * 0.4);
    for (const fx of [-1.0, 0.9]) add(G, new THREE.CylinderGeometry(0.15, 0.12, 1.5, 6).translate(0, 0.75, 0), mat, fx, 0, s * 0.33);
  }
  return G;
}

// The Sea of cast metal (7:23–26): ten cubits across, five high, a handbreadth
// thick, its brim like a lily, two rows of gourds under it, on twelve oxen.
{
  const { x, n } = PLACES.sea;
  const BASE = COURT_Y + 2.6;
  const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];   // east, north, west, south
  for (const [dx, dn] of dirs) {
    for (const k of [-1, 0, 1]) {
      const o = ox(MAT.bronze);
      const px = dx * 1.9 - dn * k * 1.3, pn = dn * 1.9 + dx * k * 1.3;
      o.position.copy(v3(x + px, n + pn, COURT_Y));
      o.rotation.y = Math.atan2(dn, dx);
      scene.add(o);
      piece('oxen', o, 'drop', 4);
    }
  }
  const S = placed(x, n, BASE);
  const outer = [[0.001, 0], [3.3, 0], [3.95, 0.5], [4.45, 1.6], [4.75, 3.0], [4.88, 4.2], [5.0, 4.75], [5.3, 5.0]];
  const mat = MAT.bronze.clone();
  mat.side = THREE.DoubleSide;
  add(S, lathe(outer, 56), mat);
  add(S, new THREE.TorusGeometry(5.25, 0.08, 6, 64).rotateX(Math.PI / 2), MAT.bronze, 0, 5.0, 0);
  // Gourds, ten to a cubit, in two rows under the brim (7:24).
  const gourd = new THREE.SphereGeometry(0.07, 6, 4);
  const im = new THREE.InstancedMesh(gourd, MAT.bronze, 600);
  const mtx = new THREE.Matrix4();
  for (let i = 0; i < 600; i++) {
    const row = i < 300 ? 0 : 1, a = ((i % 300) / 300) * Math.PI * 2 + row * 0.01;
    const y = row ? 4.1 : 3.8, r = row ? 4.92 : 4.86;
    im.setMatrixAt(i, mtx.makeTranslation(Math.cos(a) * r, y, Math.sin(a) * r));
  }
  S.add(im);
  const W = add(S, new THREE.CircleGeometry(4.85, 48).rotateX(-Math.PI / 2), MAT.water, 0, 4.3, 0);
  W.castShadow = false;
  piece('sea', S, 'lower', 8);
}

// The ten stands, four cubits square and three high, with panels, wheels and a
// round band at the top (7:27–37), and the ten basins on them (7:38). Five on each side (7:39).
{
  const wheel = new THREE.CylinderGeometry(0.75, 0.75, 0.15, 16).rotateX(Math.PI / 2);
  const panelSide = new THREE.PlaneGeometry(4, 2.2);
  for (const s of [-1, 1]) {
    for (const x of PLACES.standsX) {
      const n = s * PLACES.standsN;
      const G = placed(x, n, COURT_Y);
      add(G, box(3.9, 2.3, 3.9), MAT.bronze, 0, 0.7, 0);
      for (let f = 0; f < 4; f++) {
        const p = add(G, panelSide, MAT.panel, Math.cos((f * Math.PI) / 2) * 1.97, 1.85, Math.sin((f * Math.PI) / 2) * 1.97);
        p.rotation.y = Math.PI / 2 - (f * Math.PI) / 2;
      }
      for (const cx of [-1, 1]) for (const cz of [-1, 1]) add(G, box(0.3, 2.4, 0.3), MAT.bronze, cx * 1.95, 0.6, cz * 1.95);
      for (const cx of [-1.3, 1.3]) for (const cz of [-1, 1]) add(G, wheel, MAT.bronze, cx, 0.75, cz * 2.12);
      add(G, new THREE.CylinderGeometry(1.1, 1.25, 0.5, 24), MAT.bronze, 0, 3.0 + 0.25, 0);
      piece('stands', G, 'drop', 5);
      const B = placed(x, n, COURT_Y + 3.5);
      const bowl = add(B, lathe([[0.001, 0], [0.8, 0], [1.5, 0.35], [1.9, 0.9], [2.0, 1.35]], 32), MAT.bronze.clone());
      bowl.material.side = THREE.DoubleSide;
      add(B, new THREE.CircleGeometry(1.88, 32).rotateX(-Math.PI / 2), MAT.water, 0, 1.05, 0).castShadow = false;
      piece('basins', B, 'drop', 4);
    }
  }
}

// The bronze altar, twenty cubits square and ten high (2 Chronicles 4:1). No
// steps, ledges or horns are described for it.
{
  const { x, n } = PLACES.altar;
  const G = placed(x, n, COURT_Y);
  const panel = MAT.bronze.clone();
  add(G, box(20, 10, 20), panel);
  for (const s of [-1, 1]) {
    for (let k = -1; k <= 1; k += 2) {
      add(G, box(20.2, 0.5, 0.5), MAT.bronze, 0, 4.5 + k * 3, s * 10.05);
      add(G, box(0.5, 0.5, 20.2), MAT.bronze, s * 10.05, 4.5 + k * 3, 0);
    }
    add(G, box(20.6, 0.6, 0.6), MAT.bronze, 0, 9.6, s * 10.1);
    add(G, box(0.6, 0.6, 20.6), MAT.bronze, s * 10.1, 9.6, 0);
  }
  piece('altar', G, 'drop', 10);
}

// ---------------------------------------------------------------- gold furnishings
// Ten tables and ten lampstands, five on the right and five on the left
// (7:48–49; 2 Chronicles 4:7–8). Sizes aren't given: tables like the
// tabernacle's (Exodus 25:23), lampstands with seven lamps (Exodus 25:31–37).
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
const LAMPS_X = [-33, -26, -19, -12, -5];
const TABLES_X = [-29.5, -22.5, -15.5, -8.5, -1.8];
const lampLight = new THREE.PointLight(0xffb560, 0, 60, 1.4);
{
  for (const s of [-1, 1]) {
    for (const x of TABLES_X) {
      const n = s * 7.5;
      const G = placed(x, n);
      const L = 2, W = 1, H = 1.5;
      add(G, box(L, 0.08, W), MAT.gold, 0, H - 0.08, 0);
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) add(G, box(0.09, H - 0.08, 0.09), MAT.gold, sx * (L / 2 - 0.1), 0, sz * (W / 2 - 0.1));
      for (const sz of [-1, 1]) add(G, box(L + 0.04, 0.12, 0.04), MAT.gold, 0, H, sz * (W / 2));
      piece('tables', G, 'drop', 3);
      const loaves = [];
      for (const sx of [-1, 1]) for (let k = 0; k < 6; k++) loaves.push(new THREE.CylinderGeometry(0.3, 0.3, 0.09, 14).translate(sx * 0.48, H + 0.055 + k * 0.1, 0));
      piece('bread', add(G, mergeGeometries(loaves), MAT.bread), 'drop', 1.5);
    }
    for (const x of LAMPS_X) {
      const n = s * 5.5;
      const top = 3.1;
      const G = placed(x, n);
      add(G, new THREE.CylinderGeometry(0.2, 0.42, 0.25, 16), MAT.gold);
      add(G, new THREE.CylinderGeometry(0.055, 0.07, top, 10).translate(0, top / 2, 0), MAT.gold);
      for (const y of [0.9, 1.5, top - 1.05, top - 0.7, top - 0.35]) add(G, new THREE.SphereGeometry(0.1, 10, 8), MAT.gold, 0, y, 0);
      const tips = [0];
      for (const r of [0.38, 0.76, 1.14]) {
        add(G, new THREE.TorusGeometry(r, 0.045, 8, 32, Math.PI).rotateZ(Math.PI), MAT.gold, 0, top, 0);
        for (const sx of [-1, 1]) tips.push(sx * r);
      }
      for (const u of tips) add(G, new THREE.CylinderGeometry(0.11, 0.05, 0.12, 12), MAT.gold, u, top + 0.02, 0);
      piece('lampstands', G, 'drop', 4);
      for (const u of tips) piece('lamps', flame(placed(x, n), u, top + 0.08, 0), 'grow');
    }
  }
  lampLight.position.copy(v3(-18, 0, 8));
  scene.add(lampLight);
}

// ---------------------------------------------------------------- people
// A few builders and priests, standing, only to show the scale. Local +X is the way each faces.
function person(x, n, faceDeg, { priest, robe = 0x8a6a48, cloth = 0xe6dcc6, y = 0 }) {
  const G = placed(x, n, y);
  G.rotation.y = (faceDeg * Math.PI) / 180;
  const tunic = priest ? MAT.linen : new THREE.MeshStandardMaterial({ color: robe, roughness: 1, side: THREE.DoubleSide });
  const hem = priest ? 0 : 1.1;
  if (!priest) for (const s of [-1, 1]) add(G, new THREE.CylinderGeometry(0.11, 0.09, 1.3, 6).translate(0, 0.65, 0), MAT.skin, 0, 0, s * 0.17);
  add(G, lathe([[0.001, hem], [0.38, hem + 0.02], [0.35, hem + 0.6], [0.31, 1.6], [0.29, 2.2], [0.33, 2.58], [0.36, 2.7], [0.2, 2.86], [0.08, 2.92]], 18), tunic);
  for (const s of [-1, 1]) {
    const A = new THREE.Group();
    A.position.set(0, 2.62, s * 0.35);
    A.rotation.set(s * -0.12, 0, 0.12);
    G.add(A);
    add(A, new THREE.CylinderGeometry(0.11, 0.09, 1, 8).translate(0, -0.5, 0), tunic);
    add(A, new THREE.SphereGeometry(0.085, 8, 6), MAT.skin, 0, -1.05, 0);
  }
  add(G, new THREE.CylinderGeometry(0.1, 0.12, 0.2, 8), MAT.skin, 0, 2.86, 0);
  add(G, new THREE.SphereGeometry(0.25, 14, 10), MAT.skin, 0, 3.16, 0);
  add(G, new THREE.ConeGeometry(0.17, 0.36, 10).rotateZ(Math.PI), MAT.hair, 0.09, 2.98, 0);
  if (priest) {
    // Linen with a sash and a cap, like the tabernacle's priests (Exodus 28:40).
    add(G, new THREE.TorusGeometry(0.31, 0.06, 6, 20).rotateX(Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x6b2d6b, roughness: 1 }), 0, 1.7, 0);
    add(G, new THREE.SphereGeometry(0.26, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), MAT.linen, 0, 3.2, 0).scale.y = 1.5;
  } else {
    add(G, new THREE.TorusGeometry(0.31, 0.05, 6, 20).rotateX(Math.PI / 2), MAT.log, 0, 1.75, 0);
    add(G, new THREE.SphereGeometry(0.28, 12, 8, 0, Math.PI * 2, 0, Math.PI / 1.8), new THREE.MeshStandardMaterial({ color: cloth, roughness: 1, side: THREE.DoubleSide }), -0.02, 3.17, 0);
  }
  return G;
}
{
  // Builders by a dressed block on rollers, brought ready from the quarry (6:7).
  const B = placed(30, -26, COURT_Y);
  add(B, box(4, 1.5, 2, 3), MAT.stone, 0, 0.5, 0);
  for (const dx of [-1.4, 0, 1.4]) add(B, new THREE.CylinderGeometry(0.25, 0.25, 2.6, 8).rotateX(Math.PI / 2), MAT.log, dx, 0.25, 0);
  const rope = add(B, cylX(0.04, 4), MAT.rope, 4, 0.9, 0);
  rope.rotation.z = 0.15;
  shown(B, 'walls', 'court');
  const crew = [[36, -25.6, 180, 0x8a6a48], [36.6, -27, 180, 0x6f5a44], [27.6, -27.8, 10, 0x9a7a52], [31, -23.5, -60, 0x7d6448]];
  for (const [x, n, f, c] of crew) shown(person(x, n, f, { robe: c, y: COURT_Y }), 'walls', 'court');
  // Two inside while the cedar goes up (6:15).
  for (const [x, n, f] of [[-14, 3, 160], [-10.5, -2.5, 120]]) shown(person(x, n, f, { robe: 0x7a5e44 }), 'panels', 'outerDoors');
  // Priests in the court once the bronze work is done, and in the main room.
  const priests = [[29, -31.5, 200, 'sea'], [-26, -28.5, 240, 'stands'], [42, -13, 20, 'altar'], [43.5, 12, 340, 'altar'], [-27, 1, 0, 'tables']];
  for (const [x, n, f, from] of priests) shown(person(x, n, f, { priest: true, y: from === 'tables' ? 0 : COURT_Y }), from);
}

// ---------------------------------------------------------------- the city
// The City of David on the ridge to the south: houses and its wall, only sketched.
const CITY = [[-60, -560], [200, -600], [300, -1000], [330, -1500], [280, -2000], [180, -2380], [20, -2460], [-110, -2150], [-170, -1600], [-170, -1050], [-130, -700]];
function inCity(x, n) {
  let c = false;
  for (let i = 0, j = CITY.length - 1; i < CITY.length; j = i++) {
    const [xi, ni] = CITY[i], [xj, nj] = CITY[j];
    if (ni > n !== nj > n && x < ((xj - xi) * (n - ni)) / (nj - ni) + xi) c = !c;
  }
  return c;
}
{
  const r = mulberry32(7);
  const list = [];
  for (let k = 0; k < 4000 && list.length < 520; k++) {
    const x = -180 + r() * 520, n = -2470 + r() * 1920;
    if (!inCity(x, n)) continue;
    const h0 = ground(x, n), slope = Math.abs(ground(x + 8, n) - h0) + Math.abs(ground(x, n + 8) - h0);
    if (slope > 9) continue;
    if (list.some((o) => Math.hypot(o.x - x, o.n - n) < 15)) continue;
    list.push({ x, n, y: h0, w: 10 + r() * 7, d: 9 + r() * 6, h: 7 + r() * 4, yaw: (r() - 0.5) * 0.3 });
  }
  const houses = new THREE.InstancedMesh(box(1, 1, 1), MAT.plain, list.length);
  const cols = ['#d8c8a6', '#cdbb96', '#e0d2b2', '#c9b58e', '#d2c09c'].map((h) => new THREE.Color(h));
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), p = new THREE.Vector3(), s = new THREE.Vector3();
  list.forEach((o, i) => {
    q.setFromAxisAngle(UP, o.yaw);
    houses.setMatrixAt(i, m.compose(p.set(o.x, o.y - 2, -o.n), q, s.set(o.w, o.h, o.d)));
    houses.setColorAt(i, cols[i % cols.length]);
  });
  houses.castShadow = houses.receiveShadow = true;
  scene.add(houses);
  // The wall, in segments following the ground.
  const segs = [];
  for (let i = 0; i < CITY.length; i++) {
    const [ax, an] = CITY[i], [bx, bn] = CITY[(i + 1) % CITY.length];
    const L = Math.hypot(bx - ax, bn - an), k = Math.ceil(L / 24);
    for (let j = 0; j < k; j++) {
      const u0 = j / k, u1 = (j + 1) / k;
      segs.push({ x: lerp(ax, bx, (u0 + u1) / 2), n: lerp(an, bn, (u0 + u1) / 2), len: L / k + 1, yaw: Math.atan2(bn - an, bx - ax) });
    }
  }
  const wall = new THREE.InstancedMesh(box(1, 1, 1), MAT.great, segs.length);
  segs.forEach((o, i) => {
    q.setFromAxisAngle(UP, o.yaw);
    wall.setMatrixAt(i, m.compose(p.set(o.x, ground(o.x, o.n) - 4, -o.n), q, s.set(o.len, 18, 7)));
  });
  wall.castShadow = wall.receiveShadow = true;
  scene.add(wall);
}

// Olive trees and scrub on the slopes round about.
{
  const r = mulberry32(31);
  const spots = [];
  for (let k = 0; k < 9000 && spots.length < 1400; k++) {
    const x = -1600 + r() * 4200, n = -2800 + r() * 4200;
    if (inCity(x, n) || (x > GREAT.west - 40 && x < GREAT.east + 40 && n > GREAT.south - 40 && n < GREAT.north + 40)) continue;
    const olivesSlope = x > 700 && x < 2400;
    if (r() > (olivesSlope ? 0.9 : 0.35)) continue;
    spots.push({ x, n, s: 0.8 + r() * 0.6 });
  }
  const crown = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 1), new THREE.MeshStandardMaterial({ color: 0x7c8a5a, roughness: 1, flatShading: true }), spots.length);
  const trunk = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.5, 0.7, 1, 6).translate(0, 0.5, 0), MAT.log, spots.length);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), p = new THREE.Vector3(), s = new THREE.Vector3();
  spots.forEach((o, i) => {
    const y = ground(o.x, o.n);
    crown.setMatrixAt(i, m.compose(p.set(o.x, y + 7 * o.s, -o.n), q, s.set(6 * o.s, 4.5 * o.s, 6 * o.s)));
    trunk.setMatrixAt(i, m.compose(p.set(o.x, y - 0.5, -o.n), q, s.set(o.s, 5 * o.s, o.s)));
  });
  crown.castShadow = trunk.castShadow = true;
  scene.add(crown, trunk);
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
for (const [k, f] of Object.entries(FEATURES)) {
  const base = f.kind === 'region' || f.kind === 'mount' ? ground(f.x, f.n) : 0;
  makeLabel(f.name, f.kind, v3(f.x, f.n, base + f.lift), [`feature:${k}`], f.group, f.inside);
}

function updateLabels(activeKeys) {
  const overview = tour.phase === 'intro' || tour.phase === 'finale';
  const far = camera.position.distanceTo(OVERVIEW_C);
  for (const lb of labels) {
    const d = camera.position.distanceTo(lb.obj.position);
    let o = 1;
    if (lb.kind === 'item') o = overview ? 0 : clamp01((130 - d) / 50);
    else if (lb.kind === 'feature') o = overview ? 0 : clamp01((220 - d) / 80);
    else o = clamp01((far - 250) / 150);
    if (lb.inside && !tour.explore && cutOf(lb.inside === true ? ['house'] : [lb.inside], tour.cut) < 0.5) o = 0;
    if (lb.kind === 'feature' && !tour.explore && tour.cut.house > 0.5) o = 0;
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

function overviewPos(a, finale = false) {
  const c = finale ? FINALE_LOOK : OVERVIEW_C, r = finale ? 260 : 360;
  return new THREE.Vector3(c.x + Math.cos(a) * r, finale ? 105 : 150, c.z + Math.sin(a) * r);
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
  cut: { house: 0, chambers: 0 },   // cutaway amounts, eased towards the current stop's
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
  const dur = sequential ? Math.min(10, Math.max(6.5, d / 12)) : Math.min(7.5, Math.max(4.5, d / 60));
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

function stepFly(dt) {
  fly.t += dt / fly.dur;
  const u = clamp01(fly.t);
  const e = easeArrive(u);
  // Rise over the house between stops, and back for a wider view on long hops.
  const arc = Math.min(60, 4 + fly.d * 0.25) * Math.sin(Math.PI * u);
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
  track('tour_stop', { stop: i + 1 });
  const st = stops[i];
  tour.phase = 'hold';
  tour.holdT = 0;
  tour.holdDur = holdFor(st);
  hideNext();
  showPopup(st);
  narrator.sayNext(verseLine(tr(st.ref), tr(st.quote)));
}

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
  narrator.say(titleLine(t('solomon.title'), t('solomon.subtitle')));
}

function update(dt) {
  const t = dt * tour.speed;
  narrator.update(dt);
  // Cutaways ease towards where the tour is.
  const inTour = tour.phase === 'hold' || tour.phase === 'fly';
  if (!tour.explore) {
    for (const set of Object.keys(tour.cut)) {
      const want = inTour && stops[tour.i]?.cutaway === set ? 1 : 0;
      tour.cut[set] = lerp(tour.cut[set], want, 1 - Math.exp(-dt * 2.2));
    }
  }
  if (tour.explore) return;
  if (tour.phase === 'intro') {
    tour.introT += dt;
    tour.orbitA = SOUTH_EAST + 0.15 * Math.sin(tour.introT * 0.12);
  } else if (tour.phase === 'finale') tour.orbitA += dt * 0.03;
  if ((tour.phase === 'intro' || tour.phase === 'finale') && !fly) {
    view.pos.copy(overviewPos(tour.orbitA, tour.phase === 'finale'));
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
    // Stay until the verse has been read.
    if (tour.playing && tour.holdT >= tour.holdDur && !narrator.busy()) {
      if (tour.i >= stops.length - 1) finish();
      else startFly(tour.i + 1);
    }
  }
}

// Fades the materials of each cutaway set, and their shadows.
const cutMeshes = [];
scene.traverse((o) => { if (o.isMesh && o.material.userData.cut) cutMeshes.push(o); });
const cutShown = new Map();
const cutOf = (sets, cut) => Math.max(...sets.map((s) => cut[s]));
function applyCut(cut) {
  for (const m of CUTS) {
    const c = Math.round(cutOf(m.userData.cut, cut) * 50) / 50;
    const was = cutShown.get(m);
    if (c === was) continue;
    cutShown.set(m, c);
    m.transparent = c > 0;
    m.depthWrite = c === 0;
    m.opacity = lerp(1, 0.04, c);
    if (was === undefined || (was > 0) !== (c > 0)) m.needsUpdate = true;
  }
  for (const o of cutMeshes) o.castShadow = cutOf(o.material.userData.cut, cut) < 0.5;
  const p = groupP('carvings');
  MAT.carving.opacity = p;
  for (const m of carvingMats) m.opacity = p * (1 - cut.house * 0.96);
}

// Flames flicker; the lamps light the main room.
function updateEffects(time) {
  for (const f of flames) {
    if (!f.mesh.parent.visible) continue;
    const k = time * 9 + f.phase;
    f.mesh.scale.set(0.85 + 0.15 * Math.sin(k * 1.3), 0.8 + 0.35 * Math.abs(Math.sin(k)), 0.85 + 0.15 * Math.cos(k * 1.1));
  }
  lampLight.intensity = groupP('lamps') * 30;
}

// ---------------------------------------------------------------- explore mode
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI * 0.48;
controls.minDistance = 2;
controls.maxDistance = 5000;

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

function showPopup(st) {
  const chips = `<ul class="chips" aria-label="${t('materialChips')}">
      ${Object.entries(MATERIALS)
        .map(([k, m]) => {
          const yes = st.materials.includes(k);
          return `<li class="${yes ? 'yes' : 'no'}" title="${t(yes ? 'named' : 'notUsed')}">${esc(tr(m))}</li>`;
        }).join('')}
    </ul>`;
  ui.popup.innerHTML = `
    <div class="kicker">${t('stopOf', { n: st.i + 1, total: stops.length })} · ${esc(tr(st.ref))} (${VERSIONS[current.version].abbr})</div>
    <h2>${esc(tr(st.title))}</h2>
    <blockquote>${esc(tr(st.quote))}</blockquote>
    <p>${esc(tr(st.note))}</p>
    ${chips}
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
  updateShowings();
  updateGilding();
  applyCut(tour.cut);
  updateEffects(time);
  const wantShift = !tour.explore && (tour.phase === 'hold' || tour.phase === 'fly' || tour.phase === 'finale') && innerWidth > 900 ? 0.14 : 0;
  // On phones the finale card sits at the bottom, so lift the frame instead.
  const wantLift = !tour.explore && tour.phase === 'finale' && innerWidth <= 640 ? 0.24 : 0;
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
  updateLabels(inTour ? stops[tour.i]?.activeKeys ?? noKeys : noKeys);
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
  tour, stops, jump, next, applyStatic, view, groups, setGroup,
  advance(sec) { for (let t = 0; t < sec; t += 0.05) update(0.05); },
  // Jump straight to stop i, arrived.
  show(i) {
    hideCard();
    applyStatic(i + 1);
    fly = null;
    tour.i = i;
    view.pos.copy(stops[i].pos);
    view.look.copy(stops[i].look);
    for (const k of Object.keys(tour.cut)) tour.cut[k] = stops[i].cutaway === k ? 1 : 0;
    arrive(i);
    updateProgress();
  },
};
requestAnimationFrame(() => requestAnimationFrame(() => { window.__ready = true; }));
