import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
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

const { LEVEL, OUTER, INNER, FEATURES, PEOPLE, START, STOPS, INTRO, FINALE, GLORY, TERMS } = DATA;
await loadLanguages(DATA, import.meta.url);

// ---------------------------------------------------------------- constants
// One world unit is one long cubit (40:5). The outer court is at y = 0.
const COURSE = 2;                    // height of a course of stone (a guess)
const WALL_T = 6;                    // the outer wall, a rod thick and a rod high (40:5)
const WALL_IN = OUTER - WALL_T;      // its inner face
const GATE = { len: 50, half: 12.5, pass: 5, room: 11, h: 11, jamb: 15 };   // 40:6–16; heights are guesses
const STEP = { rise: 0.5, run: 0.6 };
const PAVE = OUTER - GATE.len;       // inner edge of the pavement, as wide as the gates are long (40:18)
// The house (40:48–41:15), x from the front of the porch westwards. Its floor is LEVEL.house.
const H = {
  front: -50, porchIn: -55, porchBack: -67, naveE: -73, naveW: -113, holyE: -115, holyW: -135,
  half: 10, door: 5, porchDoor: 7, innerDoor: 3, height: 30, porchH: 24,
};
const STOREY = 6;                    // the side chambers' storeys (not given)
const thick = (r) => (r < STOREY ? 6 : r < 2 * STOREY ? 5 : 4);   // the house wall, stepping in at each storey (41:7)
const CH = { in: 20, out: 25, back: -145, backOut: -150, east: -67, top: 3 * STOREY + 1 };
const PLAT = { x0: -150, x1: -50, half: 30 };   // the raised platform (41:8) with its free space (41:11)
const WEST = { x0: INNER.west, x1: INNER.west + 80, half: 50, wall: 5, h: 15 };   // the building to the west (41:12)
const OVERVIEW_C = new THREE.Vector3(0, 0, 0);
const FINALE_LOOK = new THREE.Vector3(40, 8, 0);
const HOLD_SCALE = 0.5;
const TRACE = 6;        // seconds for the man's line to go round a square  // default pause at each stop, relative to the reading-time estimate
const SOUTH_EAST = 0.75; // overview angle
const FINALE_A = Math.PI / 2 - 0.35;   // the finale looks north, from a little east of south

// ---------------------------------------------------------------- helpers
function mulberry32(a) {
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(573);
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
const rad = (deg) => (deg * Math.PI) / 180;
// The shortest turn from angle a to b.
const turn = (a, b, k) => a + (((b - a + Math.PI * 3) % (Math.PI * 2)) - Math.PI) * k;

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

// ---------------------------------------------------------------- renderer & scene
const app = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 0.98;
app.prepend(renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(innerWidth, innerHeight);
labelRenderer.domElement.className = 'labels';
app.insertBefore(labelRenderer.domElement, renderer.domElement.nextSibling);

const scene = new THREE.Scene();
scene.background = skyTexture();
scene.fog = new THREE.Fog(0xdfe2e2, 3000, 26000);
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.5;

const camera = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, 0.5, 40000);

const hemi = new THREE.HemisphereLight(0xdfeaff, 0x9c8a6a, 0.9);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff0d4, 2.5);
sun.position.set(420, 650, -320);
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
Object.assign(sun.shadow.camera, { left: -320, right: 320, top: 320, bottom: -320, near: 100, far: 2000 });
sun.shadow.bias = -0.0003;
sun.shadow.normalBias = 0.06;
scene.add(sun, sun.target);
const LIGHT = { hemi: hemi.intensity, sun: sun.intensity };

function skyTexture() {
  const c = document.createElement('canvas');
  c.width = 4; c.height = 512;
  const g = c.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#4f8fd0');
  grad.addColorStop(0.5, '#b4d0e6');
  grad.addColorStop(1, '#e8e4d8');
  g.fillStyle = grad;
  g.fillRect(0, 0, 4, 512);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ---------------------------------------------------------------- materials
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
  for (let i = 0; i < 3; i++) {
    g.fillStyle = color;
    g.beginPath();
    g.arc(cx + (i - 1) * 7 * k, top + 6 * k, 4 * k, 0, Math.PI * 2);
    g.fill();
  }
}
// A cherub with two faces, a man's towards one palm and a young lion's towards the other (41:18–19).
function cherub(g, cx, cy, k, c) {
  g.fillStyle = c;
  for (const s of [-1, 1]) {
    g.beginPath();
    g.moveTo(cx, cy + 10 * k);
    g.quadraticCurveTo(cx + s * 50 * k, cy - 70 * k, cx + s * 92 * k, cy - 40 * k);
    g.quadraticCurveTo(cx + s * 56 * k, cy - 10 * k, cx + s * 10 * k, cy + 30 * k);
    g.fill();
  }
  g.beginPath();
  g.ellipse(cx, cy + 62 * k, 16 * k, 46 * k, 0, 0, Math.PI * 2);
  g.fill();
  // The man's face, to the left.
  g.beginPath();
  g.arc(cx - 13 * k, cy + 6 * k, 11 * k, 0, Math.PI * 2);
  g.fill();
  g.beginPath();
  g.moveTo(cx - 23 * k, cy + 4 * k); g.lineTo(cx - 28 * k, cy + 9 * k); g.lineTo(cx - 22 * k, cy + 11 * k);
  g.fill();
  // The lion's, to the right, with its mane.
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    g.beginPath();
    g.arc(cx + 14 * k + Math.cos(a) * 12 * k, cy + 6 * k + Math.sin(a) * 12 * k, 5 * k, 0, Math.PI * 2);
    g.fill();
  }
  g.beginPath();
  g.ellipse(cx + 27 * k, cy + 9 * k, 7 * k, 5 * k, 0, 0, Math.PI * 2);
  g.fill();
}

const TEX = {
  // Dressed stone in courses. One tile = 6 cubits by 2 courses (4 cubits).
  stone: canvasTexture(512, 256, (g, w, h) => {
    g.fillStyle = '#d0c3a3';
    g.fillRect(0, 0, w, h);
    speckle(g, w, h, 3000, 0.08, 0.1);
    for (let r = 0; r < 2; r++) {
      const off = r ? w / 4 : 0;
      for (let k = -1; k < 3; k++) {
        const x = off + (k * w) / 2;
        g.fillStyle = `rgba(${120 + rand() * 40},${100 + rand() * 30},${70 + rand() * 20},${0.06 + rand() * 0.08})`;
        g.fillRect(x + 3, r * h / 2 + 3, w / 2 - 6, h / 2 - 6);
        g.fillStyle = 'rgba(90,72,48,0.5)';
        g.fillRect(x - 1, r * h / 2, 3, h / 2);
      }
      g.fillRect(0, r * h / 2 - 1, w, 3);
    }
  }),
  // Paving slabs. One tile = 6 cubits.
  pave: canvasTexture(256, 256, (g, s) => {
    g.fillStyle = '#cfc2a6';
    g.fillRect(0, 0, s, s);
    speckle(g, s, s, 1600, 0.07, 0.08);
    for (let r = 0; r < 4; r++) {
      const off = (r % 2) * 32;
      for (let k = -1; k < 4; k++) {
        g.fillStyle = `rgba(${130 + rand() * 30},${110 + rand() * 25},${80 + rand() * 20},${0.05 + rand() * 0.08})`;
        g.fillRect(off + k * 64 + 2, r * 64 + 2, 60, 60);
        g.fillStyle = 'rgba(100,82,58,0.45)';
        g.fillRect(off + k * 64, r * 64, 2, 64);
      }
      g.fillRect(0, r * 64, s, 2);
    }
  }),
  // Wood panelling (41:16). One tile = 4 cubits.
  wood: canvasTexture(256, 256, (g, s) => {
    g.fillStyle = '#a7703f';
    g.fillRect(0, 0, s, s);
    for (let x = 0; x < s; x += 2) { g.fillStyle = `rgba(60,35,15,${rand() * 0.14})`; g.fillRect(x, 0, 1 + rand() * 2, s); }
    for (let x = 0; x < s; x += 32) { g.fillStyle = 'rgba(50,28,12,0.35)'; g.fillRect(x, 0, 2, s); }
  }),
  // Beams and planks of a roof, seen from below. One tile = 4 cubits.
  beams: canvasTexture(128, 128, (g, s) => {
    g.fillStyle = '#8e5a36';
    g.fillRect(0, 0, s, s);
    for (let x = 0; x < s; x += 2) { g.fillStyle = `rgba(50,25,10,${rand() * 0.15})`; g.fillRect(x, 0, 1, s); }
    for (let y = 0; y < s; y += 16) { g.fillStyle = 'rgba(40,20,8,0.3)'; g.fillRect(0, y, s, 1); }
  }),
  // Carved cherubim between palm trees, on a band 10 cubits wide and 20 high.
  carving: canvasTexture(256, 512, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    const c = '#4a2a12';
    for (const x of [0, w]) palm(g, x, 470, 150, 1.5, c);
    cherub(g, w / 2, 150, 1.05, c);
  }),
  // A palm tree carved on a jamb (40:16), 4 cubits wide.
  palm: canvasTexture(128, 384, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    palm(g, w / 2, h - 10, 90, 1.05, '#ffffff');
  }),
  // Doors of wood carved with cherubim and palm trees (41:25).
  door: canvasTexture(256, 512, (g, w, h) => {
    g.fillStyle = '#9a6538';
    g.fillRect(0, 0, w, h);
    for (let x = 0; x < w; x += 2) { g.fillStyle = `rgba(50,28,12,${rand() * 0.12})`; g.fillRect(x, 0, 1, h); }
    const c = 'rgba(60,32,12,0.75)';
    g.strokeStyle = c; g.lineWidth = 6;
    g.strokeRect(10, 10, w - 20, h - 20);
    cherub(g, w / 2, 120, 0.85, c);
    palm(g, w / 2, 480, 320, 1.0, c);
  }),
  // The glory: a soft round light.
  glow: canvasTexture(128, 128, (g, s) => {
    const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    grad.addColorStop(0, 'rgba(255,255,250,1)');
    grad.addColorStop(0.25, 'rgba(255,244,214,0.75)');
    grad.addColorStop(0.6, 'rgba(255,226,170,0.2)');
    grad.addColorStop(1, 'rgba(255,220,160,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, s, s);
  }),
};

const MAT = {
  stone: new THREE.MeshStandardMaterial({ map: TEX.stone, roughness: 0.92 }),
  pale: new THREE.MeshStandardMaterial({ map: TEX.stone, color: 0xf2ecdf, roughness: 0.92 }),
  pave: new THREE.MeshStandardMaterial({ map: TEX.pave, roughness: 0.95 }),
  paveYard: new THREE.MeshStandardMaterial({ map: TEX.pave, color: 0xd2c6b0, roughness: 0.95 }),
  court: new THREE.MeshStandardMaterial({ color: 0xc4b28c, roughness: 1 }),
  wood: new THREE.MeshStandardMaterial({ map: TEX.wood, roughness: 0.75 }),
  beams: new THREE.MeshStandardMaterial({ map: TEX.beams, roughness: 0.85 }),
  door: new THREE.MeshStandardMaterial({ map: TEX.door, roughness: 0.7 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x2a2018, roughness: 1 }),
  palm: new THREE.MeshStandardMaterial({ alphaMap: TEX.palm, color: 0x9c8460, roughness: 0.95, transparent: true, alphaTest: 0.4, polygonOffset: true, polygonOffsetFactor: -2 }),
  carving: new THREE.MeshStandardMaterial({ map: TEX.carving, transparent: true, opacity: 0, alphaTest: 0.05, depthWrite: false, roughness: 0.8, polygonOffset: true, polygonOffsetFactor: -2 }),
  skin: new THREE.MeshStandardMaterial({ color: 0xa8754f, roughness: 0.8 }),
  hair: new THREE.MeshStandardMaterial({ color: 0x3a2a1e, roughness: 1 }),
  robe: new THREE.MeshStandardMaterial({ color: 0x7a5a3e, roughness: 1, side: THREE.DoubleSide }),
  cloth: new THREE.MeshStandardMaterial({ color: 0xe4dac4, roughness: 1, side: THREE.DoubleSide }),
  sandal: new THREE.MeshStandardMaterial({ color: 0x5a3e26, roughness: 1 }),
  linen: new THREE.MeshStandardMaterial({ color: 0xf2ede1, roughness: 1 }),
  reed: new THREE.MeshStandardMaterial({ color: 0xc9b07a, roughness: 0.7 }),
  // The man "whose appearance was like bronze" (40:3), shining a little.
  bronze: new THREE.MeshStandardMaterial({ color: 0xd08a48, metalness: 0.9, roughness: 0.28, emissive: 0x6a3410, emissiveIntensity: 0.5 }),
  line: new THREE.MeshStandardMaterial({ color: 0xf4dc98, roughness: 1, emissive: 0xd8a040, emissiveIntensity: 0.9 }),
};

// Cutaways: materials that fade for stops with `cutaway`.
const CUTS = [];
function cutMat(m) {
  m.userData.cut = true;
  CUTS.push(m);
  return m;
}
Object.assign(MAT, {
  stoneS: cutMat(MAT.stone.clone()),   // the house's south wall, the porch's, the side chambers'
  beamsS: cutMat(MAT.beams.clone()),   // the south chambers' floors
  roof: cutMat(MAT.beams.clone()),     // the roof of the house
  woodS: cutMat(MAT.wood.clone()),     // the south lining
});

// Box geometry in world coordinates, plan x0..x1, n0..n1, y0..y1, with UVs
// that follow the world: u along the face, v up, so courses line up across pieces.
function worldBox(x0, x1, n0, n1, y0, y1, tu = 6, tv = 4) {
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
// The same, with v running 0..1 from the bottom to the top (for a carved band).
function bandBox(x0, x1, n0, n1, y0, y1, tu) {
  const geo = worldBox(x0, x1, n0, n1, y0, y1, tu, 1);
  const p = geo.attributes.position, uv = geo.attributes.uv;
  for (let i = 0; i < p.count; i++) uv.setY(i, (p.getY(i) - y0) / (y1 - y0));
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
// Box with its base at y = 0.
const box = (w, h, d) => new THREE.BoxGeometry(w, h, d).translate(0, h / 2, 0);
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
const lathe = (pts, seg = 28) => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), seg);

// ---------------------------------------------------------------- terrain
// A fine mesh over the summit and its upper slopes, and a coarse one out to the
// horizon, sunk a little where the fine one covers it.
{
  const FINE = 1700;
  const C = {
    soil: new THREE.Color('#b29a72'), rock: new THREE.Color('#a39782'), scrub: new THREE.Color('#9a9a68'),
    green: new THREE.Color('#7f8d58'), dark: new THREE.Color('#6d6a52'),
  };
  const c = new THREE.Color();
  function sheet(half, seg, sink) {
    const geo = new THREE.PlaneGeometry(half * 2, half * 2, seg, seg);
    geo.rotateX(-Math.PI / 2);
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), n = -p.getZ(i);
      const inside = sink && Math.max(Math.abs(x), Math.abs(n)) < FINE - 1;
      p.setY(i, ground(x, n) - 0.15 - (inside ? 60 : 0));
    }
    const g2 = geo.toNonIndexed();
    g2.computeVertexNormals();
    const pos = g2.attributes.position, nor = g2.attributes.normal;
    const col = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i += 3) {
      const x = (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3;
      const n = -(pos.getZ(i) + pos.getZ(i + 1) + pos.getZ(i + 2)) / 3;
      const h = (pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3;
      const slope = 1 - nor.getY(i);
      c.copy(C.soil).lerp(C.scrub, clamp01((noise2(x / 300, n / 300) - 0.35) * 1.6));
      c.lerp(C.green, clamp01((-h - 1200) / 900));
      c.lerp(C.rock, clamp01((slope - 0.1) / 0.3));
      c.lerp(C.dark, clamp01((slope - 0.45) / 0.3) * 0.6);
      const j = 0.93 + noise2(x / 40, n / 40) * 0.12;
      for (let k = 0; k < 3; k++) {
        col[(i + k) * 3] = c.r * j; col[(i + k) * 3 + 1] = c.g * j; col[(i + k) * 3 + 2] = c.b * j;
      }
    }
    g2.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const m = new THREE.Mesh(g2, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true }));
    m.receiveShadow = true;
    scene.add(m);
  }
  sheet(FINE, 340, false);
  sheet(26000, 260, true);

  // The floor of the outer court, level inside the wall.
  const court = new THREE.Mesh(new THREE.PlaneGeometry(WALL_IN * 2, WALL_IN * 2).rotateX(-Math.PI / 2), MAT.court);
  court.position.y = LEVEL.outer + 0.02;
  court.receiveShadow = true;
  scene.add(court);
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

// ---------------------------------------------------------------- walls of stone
// Laid course by course. Each wall is a box { x0, x1, n0, n1, y0, y1, mat },
// with openings { a, b, y0, y1 } cut along its longer side. With `merge`, each
// course of all the walls is one piece of group `key` (per material); without,
// each wall's course is a piece of its own.
function lay(key, walls, { lift = 4, course = COURSE, merge = false } = {}) {
  const bottom = Math.min(...walls.map((w) => w.y0)), top = Math.max(...walls.map((w) => w.y1));
  for (let ya = bottom; ya < top - 1e-6; ya += course) {
    const yb = ya + course;
    const byMat = new Map();
    for (const w of walls) {
      const lo = Math.max(ya, w.y0), hi = Math.min(yb, w.y1);
      if (hi - lo < 1e-6) continue;
      const alongX = w.x1 - w.x0 >= w.n1 - w.n0;
      const ys = [...new Set([lo, hi, ...(w.open ?? []).flatMap((o) => [o.y0, o.y1])].filter((y) => y >= lo && y <= hi))].sort((p, q) => p - q);
      const geos = [];
      for (let i = 1; i < ys.length; i++) {
        const y0 = ys[i - 1], y1 = ys[i];
        if (y1 - y0 < 1e-6) continue;
        let spans = [alongX ? [w.x0, w.x1] : [w.n0, w.n1]];
        for (const o of w.open ?? []) {
          if (o.y1 <= y0 || o.y0 >= y1) continue;
          spans = spans.flatMap(([u, v]) => [[u, Math.min(v, o.a)], [Math.max(u, o.b), v]]).filter(([u, v]) => v - u > 0.01);
        }
        for (const [u, v] of spans) {
          geos.push(alongX ? worldBox(u, v, w.n0, w.n1, y0, y1) : worldBox(w.x0, w.x1, u, v, y0, y1));
        }
      }
      if (!geos.length) continue;
      const mat = w.mat ?? MAT.stone;
      if (merge) byMat.set(mat, [...(byMat.get(mat) ?? []), ...geos]);
      else piece(key, worldMesh(geos, mat), 'lower', lift);
    }
    for (const [mat, geos] of byMat) piece(key, worldMesh(geos, mat), 'lower', lift);
  }
}
const wallBox = (x0, x1, n0, n1, y0, y1, extra) => ({
  x0: Math.min(x0, x1), x1: Math.max(x0, x1), n0: Math.min(n0, n1), n1: Math.max(n0, n1), y0, y1, ...extra,
});

// The outer wall, a rod thick and a rod high (40:5), round the square, with gaps
// for the gates on the east, north and south. Its foot goes down to the ground outside.
{
  const y0 = LEVEL.outside - 0.5, y1 = WALL_T;
  const walls = [];
  // Each side is cut into lengths, so the wall goes up round the square.
  const side = (from, to, gaps, mk) => {
    const cuts = [from, ...gaps.flat(), to].sort((a, b) => a - b);
    for (let i = 0; i < cuts.length; i += 2) {
      const a = cuts[i], b = cuts[i + 1], k = Math.max(1, Math.round((b - a) / 62));
      for (let j = 0; j < k; j++) walls.push(mk(lerp(a, b, j / k), lerp(a, b, (j + 1) / k)));
    }
  };
  const gap = [[-GATE.half, GATE.half]];
  side(-OUTER, OUTER, gap, (a, b) => wallBox(WALL_IN, OUTER, a, b, y0, y1));               // east
  side(-WALL_IN, WALL_IN, gap, (a, b) => wallBox(a, b, WALL_IN, OUTER, y0, y1));          // north
  side(-OUTER, OUTER, [], (a, b) => wallBox(-OUTER, -WALL_IN, a, b, y0, y1));               // west
  side(-WALL_IN, WALL_IN, gap, (a, b) => wallBox(a, b, -OUTER, -WALL_IN, y0, y1));        // south
  lay('wall', walls, { lift: 3 });
}

// ---------------------------------------------------------------- gates
// A gate (40:6–16): local u runs along its axis from the outer threshold (u = 0)
// to the porch (u = 50), w across it. The outer gates face out with their porch
// inwards (40:9); the inner gates are turned round, their porch towards the
// outer court (40:31). `steps` go down from the u = 0 end (outer gates) or the
// porch end (inner gates).
const GATES = [];
const ROOMS = [[6, 12], [17, 23], [28, 34]];   // three guardrooms a side, a rod square, 5 cubits apart (40:7)
function makeGate(key, { at, dir, y, steps, base }) {
  const [ax, an] = at, [dx, dn] = dir, px = -dn, pn = dx;
  const P = (u, w) => [ax + dx * u + px * w, an + dn * u + pn * w];
  const rect = (u0, u1, w0, w1) => {
    const [xa, na] = P(u0, w0), [xb, nb] = P(u1, w1);
    return [Math.min(xa, xb), Math.max(xa, xb), Math.min(na, nb), Math.max(na, nb)];
  };
  const gbox = (u0, u1, w0, w1, y0, y1, tu, tv) => {
    const [x0, x1, n0, n1] = rect(u0, u1, w0, w1);
    return worldBox(x0, x1, n0, n1, y0, y1, tu, tv);
  };
  // Openings along u: windows in the guardrooms and the porch (40:16).
  const along = (u0, u1) => { const [x0, x1, n0, n1] = rect(u0, u1, 0, 0); return dx ? [x0, x1] : [n0, n1]; };
  const win = (u) => { const [a, b] = along(u - 0.8, u + 0.8); return { a, b, y0: y + 5, y1: y + 8 }; };
  const G = GATE, top = y + G.h;

  // The floor, on a solid base, and the steps.
  piece(key, worldMesh([gbox(0, G.len, -G.half, G.half, base, y)], MAT.stone), 'lower', 3);
  const stepGeos = [];
  for (let k = 0; k < steps; k++) {
    const u0 = steps === 7 ? -(k + 1) * STEP.run : G.len + k * STEP.run;
    stepGeos.push(gbox(u0, u0 + STEP.run, -6, 6, base, y - k * STEP.rise, 2, 2));
  }
  piece(key, worldMesh(stepGeos, MAT.pale), 'lower', 2);

  // Walls: the piers at each threshold, the guardrooms' outer walls with their
  // windows, the 5 cubits between the guardrooms, the porch's sides.
  const walls = [];
  for (const s of [-1, 1]) {
    const W = (a, b) => [s * a, s * b];
    const wb = (u0, u1, w, open) => { const [x0, x1, n0, n1] = rect(u0, u1, ...W(...w)); return wallBox(x0, x1, n0, n1, y, top, { open }); };
    walls.push(wb(0, 6, [G.pass, G.half]));
    walls.push(wb(6, 34, [G.room, G.half], ROOMS.map(([a, b]) => win((a + b) / 2))));
    for (const [a, b] of [[12, 17], [23, 28]]) walls.push(wb(a, b, [G.pass, G.room]));
    walls.push(wb(34, 40, [G.pass, G.half]));
    walls.push(wb(40, 48, [G.room, G.half], [win(44)]));
    // A barrier a cubit wide in front of the guardrooms (40:12).
    for (const [a, b] of ROOMS) {
      const [x0, x1, n0, n1] = rect(a, b, ...W(G.pass - 1, G.pass));
      walls.push(wallBox(x0, x1, n0, n1, y, y + 1));
    }
  }
  lay(key, walls, { merge: true, lift: 3 });

  // The roof over the guardrooms (40:13), a lintel over the passage at each end.
  const roof = [];
  for (const s of [-1, 1]) roof.push(gbox(0, 40, s * G.pass, s * G.half, top, top + 0.8));
  roof.push(gbox(0, 1.5, -G.pass, G.pass, top - 2, top + 0.8), gbox(38.5, 40, -G.pass, G.pass, top - 2, top + 0.8));
  roof.push(gbox(40, 48, -G.half, G.half, top, top + 0.8));
  piece(key, worldMesh(roof, MAT.stone), 'lower', 3);

  // The porch's jambs, two cubits (40:9), taller than the rest, and a lintel between them.
  const jamb = [];
  for (const s of [-1, 1]) jamb.push(gbox(48, 50, s * 7, s * G.half, y, y + G.jamb));
  jamb.push(gbox(48, 50, -7, 7, y + G.jamb - 3, y + G.jamb));
  piece(key, worldMesh(jamb, MAT.stone), 'lower', 4);

  // Palm trees on the jambs and on the walls between the guardrooms (40:16).
  const palms = [];
  const face = (u, w0, w1, y0, y1) => {
    const [x0, x1, n0, n1] = rect(u, u, w0, w1);
    return worldBox(x0 - (dx ? 0.03 : 0), x1 + (dx ? 0.03 : 0), n0 - (dn ? 0.03 : 0), n1 + (dn ? 0.03 : 0), y0, y1);
  };
  for (const s of [-1, 1]) {
    const [w0, w1] = [s * 7.6, s * 11.6].sort((a, b) => a - b);
    palms.push(face(50.05, w0, w1, y + 1, y + 11));
    for (const [a, b] of [[12.3, 16.7], [23.3, 27.7]]) {
      const [x0, x1, n0, n1] = rect(a, b, s * (G.pass - 0.05), s * (G.pass - 0.05));
      palms.push(worldBox(x0 - (dn ? 0.03 : 0), x1 + (dn ? 0.03 : 0), n0 - (dx ? 0.03 : 0), n1 + (dx ? 0.03 : 0), y + 1.5, y + 9.5));
    }
  }
  const pm = worldMesh(palms.map((g) => uvSquash(g)), MAT.palm);
  pm.castShadow = false;
  piece(key, pm, 'grow');

  GATES.push({ at, dir, y, steps, base });
}
// Panels get the whole texture: u and v from 0 to 1 over each face.
function uvSquash(geo) {
  const uv = geo.attributes.uv;
  for (let f = 0; f < 6; f++) {
    let u0 = Infinity, u1 = -Infinity, v0 = Infinity, v1 = -Infinity;
    for (let k = 0; k < 4; k++) { const i = f * 4 + k; u0 = Math.min(u0, uv.getX(i)); u1 = Math.max(u1, uv.getX(i)); v0 = Math.min(v0, uv.getY(i)); v1 = Math.max(v1, uv.getY(i)); }
    for (let k = 0; k < 4; k++) {
      const i = f * 4 + k;
      uv.setXY(i, (uv.getX(i) - u0) / (u1 - u0 || 1), (uv.getY(i) - v0) / (v1 - v0 || 1));
    }
  }
  return geo;
}
const OUT_GATE = { y: LEVEL.outer, steps: 7, base: LEVEL.outside - 0.5 };
const IN_GATE = { y: LEVEL.inner, steps: 8, base: LEVEL.outer - 0.2 };
makeGate('gateE', { at: [OUTER, 0], dir: [-1, 0], ...OUT_GATE });
makeGate('gateN', { at: [0, OUTER], dir: [0, -1], ...OUT_GATE });
makeGate('gateS', { at: [0, -OUTER], dir: [0, 1], ...OUT_GATE });

// ---------------------------------------------------------------- the outer court
// The pavement along the wall (40:17–18), and thirty chambers on it: their size
// and layout aren't given, so they are drawn in rows of five beside each gate.
{
  const y0 = LEVEL.outer - 0.3, y1 = LEVEL.outer + 0.25;
  const run = (from, to, mk) => {
    const k = Math.max(1, Math.round((to - from) / 44));
    for (let j = 0; j < k; j++) piece('pavement', worldMesh([mk(lerp(from, to, j / k), lerp(from, to, (j + 1) / k))], MAT.pave), 'drop', 1);
  };
  // The east and west strips run the full length; the north and south ones fit between them.
  // The west has no gate, and the inner court's terrace comes through it.
  for (const [a, b] of [[-WALL_IN, -GATE.half], [GATE.half, WALL_IN]]) run(a, b, (u, v) => worldBox(PAVE, WALL_IN, u, v, y0, y1));
  for (const s of [-1, 1]) {
    for (const [a, b] of [[-PAVE, -GATE.half], [GATE.half, PAVE]]) run(a, b, (u, v) => worldBox(u, v, Math.min(s * PAVE, s * WALL_IN), Math.max(s * PAVE, s * WALL_IN), y0, y1));
  }
  for (const [a, b] of [[-WALL_IN, -INNER.half], [INNER.half, WALL_IN]]) run(a, b, (u, v) => worldBox(-WALL_IN, -PAVE, u, v, y0, y1));

  const ROOM = { len: 20, d: 12, h: 8 };
  const rooms = [];
  for (const s of [-1, 1]) {
    for (let k = 0; k < 5; k++) {
      const a = 30 + k * 24, b = a + ROOM.len;
      rooms.push({ x0: WALL_IN - ROOM.d, x1: WALL_IN, n0: s < 0 ? -b : a, n1: s < 0 ? -a : b, door: 'w' });
      for (const t of [-1, 1]) rooms.push({ x0: s < 0 ? -b : a, x1: s < 0 ? -a : b, n0: t > 0 ? WALL_IN - ROOM.d : -WALL_IN, n1: t > 0 ? WALL_IN : -WALL_IN + ROOM.d, door: t > 0 ? 's' : 'n' });
    }
  }
  rooms.sort((p, q) => Math.atan2((p.n0 + p.n1) / 2, (p.x0 + p.x1) / 2) - Math.atan2((q.n0 + q.n1) / 2, (q.x0 + q.x1) / 2));
  for (const r of rooms) {
    const geos = [worldBox(r.x0, r.x1, r.n0, r.n1, LEVEL.outer, LEVEL.outer + ROOM.h)];
    const cx = (r.x0 + r.x1) / 2, cn = (r.n0 + r.n1) / 2;
    const door = r.door === 'w' ? worldBox(r.x0 - 0.1, r.x0, cn - 1.2, cn + 1.2, 0, 4.5)
      : r.door === 's' ? worldBox(cx - 1.2, cx + 1.2, r.n0 - 0.1, r.n0, 0, 4.5)
        : worldBox(cx - 1.2, cx + 1.2, r.n1, r.n1 + 0.1, 0, 4.5);
    const G = new THREE.Group();
    scene.add(G);
    worldMesh(geos, MAT.stone, G);
    worldMesh([door], MAT.dark, G);
    worldMesh([worldBox(r.x0 - 0.3, r.x1 + 0.3, r.n0 - 0.3, r.n1 + 0.3, LEVEL.outer + ROOM.h, LEVEL.outer + ROOM.h + 0.5, 4, 4)], MAT.beams, G);
    piece('rooms', G, 'drop', 5);
  }
}

// ---------------------------------------------------------------- the inner court
// A terrace eight steps above the outer court (40:31), with the house, its yard
// and the building to the west on it. Its wall isn't described; a low one is drawn.
{
  const { west, east, half } = INNER;
  piece('innerCourt', worldMesh([worldBox(west, east, -half, half, LEVEL.outer - 0.3, LEVEL.inner - 0.05)], MAT.stone), 'lower', 3);
  // The court's square paved paler than the yards behind it, with a kerb where
  // the court ends (40:47) and where the house's square ends (41:13–14).
  const top = (x0, x1, mat) => piece('innerCourt', worldMesh([worldBox(x0, x1, -half, half, LEVEL.inner - 0.05, LEVEL.inner + 0.02, 6, 6)], mat), 'lower', 2);
  top(H.front, east, MAT.pave);
  top(west, H.front, MAT.paveYard);
  const kerbs = [];
  for (const s of [-1, 1]) {
    for (const x of [H.front, PLAT.x0]) kerbs.push(worldBox(x - 1, x, Math.min(s * PLAT.half, s * (half - 1.5)), Math.max(s * PLAT.half, s * (half - 1.5)), LEVEL.inner, LEVEL.inner + 0.35, 2, 2));
  }
  piece('innerCourt', worldMesh(kerbs, MAT.pale), 'lower', 2);
  const y0 = LEVEL.inner, y1 = LEVEL.inner + 2.5, T = 1.5;
  const walls = [
    wallBox(east - T, east, -half, -GATE.half, y0, y1), wallBox(east - T, east, GATE.half, half, y0, y1),
    wallBox(WEST.x1, east, half - T, half, y0, y1, { open: [{ a: -GATE.half, b: GATE.half, y0, y1 }] }),
    wallBox(WEST.x1, east, -half, -half + T, y0, y1, { open: [{ a: -GATE.half, b: GATE.half, y0, y1 }] }),
  ];
  lay('innerCourt', walls, { course: 2.5, lift: 2 });
}
makeGate('innerS', { at: [0, -INNER.half], dir: [0, -1], ...IN_GATE });
makeGate('innerE', { at: [INNER.east, 0], dir: [1, 0], ...IN_GATE });
makeGate('innerN', { at: [0, INNER.half], dir: [0, 1], ...IN_GATE });

// The tables at the north gate (40:38–43): two on each side in the porch, two on
// each side outside it, and four of cut stone, a cubit and a half square and a
// cubit high. A chamber beside the gate for rinsing the burnt offering.
{
  const y = LEVEL.inner, n0 = INNER.half;
  for (const s of [-1, 1]) {
    for (const n of [n0 + 41.5, n0 + 45.5]) {
      const G = placed(s * 8.6, n, y);
      add(G, box(1.6, 0.18, 3), MAT.pale, 0, 1.4, 0);
      add(G, box(1.2, 1.4, 2.4), MAT.stone);
      piece('tables', G, 'drop', 3);
    }
    for (const n of [n0 + 52.5, n0 + 56]) {
      const G = placed(s * 9.5, n, LEVEL.outer);
      add(G, box(1.5, 1, 1.5), MAT.pale);
      piece('tables', G, 'drop', 3);
    }
  }
  const G = new THREE.Group();
  scene.add(G);
  worldMesh([worldBox(GATE.half + 0.5, GATE.half + 8.5, n0 + 36, n0 + 49, LEVEL.outer, LEVEL.outer + 7)], MAT.stone, G);
  worldMesh([worldBox(GATE.half + 3, GATE.half + 5.5, n0 + 49, n0 + 49.1, LEVEL.outer, LEVEL.outer + 4.5)], MAT.dark, G);
  worldMesh([worldBox(GATE.half + 0.2, GATE.half + 8.8, n0 + 35.7, n0 + 49.3, LEVEL.outer + 7, LEVEL.outer + 7.5, 4, 4)], MAT.beams, G);
  piece('rinse', G, 'drop', 4);
}

// The chambers by the north and south gates, for the priests (40:44–46). Size not given.
for (const s of [-1, 1]) {
  const G = new THREE.Group();
  scene.add(G);
  const n0 = s * 39, n1 = s * 48, y = LEVEL.inner;
  worldMesh([worldBox(18, 42, Math.min(n0, n1), Math.max(n0, n1), y, y + 8)], MAT.stone, G);
  worldMesh([worldBox(18.2, 41.8, Math.min(n0, n1) - 0.2, Math.max(n0, n1) + 0.2, y + 8, y + 8.5, 4, 4)], MAT.beams, G);
  for (const x of [24, 36]) worldMesh([worldBox(x - 1.2, x + 1.2, n0 - s * 0.1 - 0.05, n0 - s * 0.1 + 0.05, y, y + 4.5)], MAT.dark, G);
  piece('priestRooms', G, 'drop', 5);
}

// The altar (40:47), as measured in 43:13–17: a base a cubit high with a gutter
// and rim, a ledge two cubits up, another four above it, and the hearth of four
// with four horns, twelve cubits square; its steps face east.
{
  const G = placed(0, 0, LEVEL.inner);
  let y = 0;
  for (const [w, h] of [[18, 1], [16, 2], [14, 4], [12, 4]]) {
    add(G, box(w, h, w), MAT.pale, 0, y, 0);
    y += h;
  }
  // The rim round the base (43:13, 17).
  for (const s of [-1, 1]) {
    add(G, box(18, 0.5, 0.5), MAT.pale, 0, 1, s * 8.75);
    add(G, box(0.5, 0.5, 18), MAT.pale, s * 8.75, 1, 0);
  }
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) add(G, box(1, 1, 1), MAT.pale, sx * 5.5, y, sz * 5.5);
  const steps = [];
  for (let k = 0; k < 14; k++) steps.push(box(0.6, 7 - k * 0.5, 4).translate(7.3 + k * 0.6, 0, 0));
  add(G, mergeGeometries(steps), MAT.pale);
  piece('altar', G, 'drop', 10);
}

// ---------------------------------------------------------------- the house
// The platform a full rod high (41:8), the free space round the side chambers
// on it (41:11), and ten steps up to the porch (the Greek of 40:49).
{
  const y0 = LEVEL.inner - 0.05, y1 = LEVEL.house;
  piece('platform', worldMesh([worldBox(PLAT.x0, PLAT.x1, -PLAT.half, PLAT.half, y0, y1)], MAT.stone), 'lower', 4);
  piece('platform', worldMesh([worldBox(PLAT.x0 + 0.01, PLAT.x1 - 0.01, -PLAT.half + 0.01, PLAT.half - 0.01, y1 - 0.1, y1 + 0.02, 6, 6)], MAT.pave), 'lower', 2);
  const geos = [];
  for (let k = 0; k < 10; k++) geos.push(worldBox(H.front + k * 0.6, H.front + (k + 1) * 0.6, -H.porchDoor, H.porchDoor, y0, y1 - k * 0.6, 2, 2));
  piece('platform', worldMesh(geos, MAT.pale), 'lower', 2);
}

// Relative heights in the house are from its floor.
const HY = LEVEL.house;
const hb = (x0, x1, n0, n1, r0, r1, extra) => wallBox(x0, x1, n0, n1, HY + r0, HY + r1, extra);

// The porch (40:48–49): 20 × 12 inside, its entrance 14 wide between jambs of
// 5 and sidewalls of 3. Windows and palm trees on its sides (41:26). Its height isn't given.
{
  const P = H.porchH;
  const sideWin = { a: -63, b: -60, y0: HY + 14, y1: HY + 19 };
  lay('porch', [
    hb(H.porchBack, H.front, H.half, H.half + 5, 0, P, { open: [sideWin] }),
    hb(H.porchBack, H.front, -H.half - 5, -H.half, 0, P, { open: [sideWin], mat: MAT.stoneS }),
    hb(H.porchIn, H.front, H.porchDoor, H.half, 0, P),
    hb(H.porchIn, H.front, -H.half, -H.porchDoor, 0, P, { mat: MAT.stoneS }),
    hb(H.porchIn, H.front, -H.porchDoor, H.porchDoor, 18, P),
  ], { lift: 3 });
  const roof = [];
  for (let n = -H.half - 5; n < H.half + 5; n += 2.5) roof.push(worldBox(H.porchBack, H.front, n + 0.2, n + 1.0, HY + P, HY + P + 0.8, 4, 4));
  roof.push(worldBox(H.porchBack, H.front, -H.half - 5, H.half + 5, HY + P + 0.8, HY + P + 1.1, 4, 4));
  piece('porch', worldMesh(roof, MAT.roof), 'lower', 4);
}

// The two columns by the jambs (40:49). Their size isn't given.
for (const s of [-1, 1]) {
  const G = placed(H.front + 3.5, s * 10.5, LEVEL.inner);
  add(G, new THREE.CylinderGeometry(1.5, 1.6, 18, 28).translate(0, 9, 0), MAT.pale);
  add(G, box(4, 1, 4), MAT.pale);
  add(G, new THREE.CylinderGeometry(2.2, 1.5, 1.5, 28).translate(0, 18.75, 0), MAT.pale);
  piece('columns', G, 'drop', 10);
}

// The walls of the house (41:1–5): six cubits thick, stepping in at each storey
// of the side chambers (41:7), thirty cubits high (not given). The entrance of
// the nave ten cubits wide (41:2); windows high in the side walls (41:16).
const WINDOWS = [-79, -89, -99, -108, -121, -129];
{
  const walls = [];
  const bands = [[0, STOREY], [STOREY, 2 * STOREY], [2 * STOREY, H.height]];
  const win = WINDOWS.map((x) => ({ a: x - 1.3, b: x + 1.3, y0: HY + 21, y1: HY + 27 }));
  for (const [r0, r1] of bands) {
    const t = thick(r0), back = H.holyW - t;
    walls.push(hb(back, H.porchBack, H.half, H.half + t, r0, r1, { open: win }));
    walls.push(hb(back, H.porchBack, -H.half - t, -H.half, r0, r1, { open: win, mat: MAT.stoneS }));
    walls.push(hb(back, H.holyW, -H.half, H.half, r0, r1));
  }
  walls.push(hb(H.naveE, H.porchBack, -H.half, H.half, 0, H.height, { open: [{ a: -H.door, b: H.door, y0: HY, y1: HY + 18 }] }));
  lay('walls', walls, { lift: 3 });
}

// The wall between the nave and the most holy place, two cubits, with an entrance of six (41:3).
lay('partition', [
  hb(H.holyE, H.naveW, -H.half, H.half, 0, H.height, { open: [{ a: -H.innerDoor, b: H.innerDoor, y0: HY, y1: HY + 14 }] }),
], { lift: 3 });

// The side chambers (41:5–11): four cubits wide at the bottom, wider at each
// storey, thirty to a storey, round the sides and back; their outer wall five
// thick, with a door on the north and on the south.
{
  const walls = [];
  const door = [{ a: -97.5, b: -94.5, y0: HY, y1: HY + 4.5 }];
  walls.push(hb(CH.backOut, CH.east, CH.in, CH.out, 0, CH.top, { open: door }));
  walls.push(hb(CH.backOut, CH.east, -CH.out, -CH.in, 0, CH.top, { open: door, mat: MAT.stoneS }));
  walls.push(hb(CH.backOut, CH.back, -CH.in, CH.in, 0, CH.top));
  // Closing them off at the front, and the rooms' cross walls.
  for (let k = 0; k < 3; k++) {
    const r0 = k * STOREY, r1 = r0 + STOREY, face = H.half + thick(r0), back = H.holyW - thick(r0);
    for (const s of [-1, 1]) {
      const mat = s < 0 ? MAT.stoneS : MAT.stone;
      walls.push(hb(H.naveE + 1, CH.east, s * face, s * CH.in, r0, r1, { mat }));
      for (let i = 1; i < 12; i++) {
        const x = lerp(CH.back + 4, H.naveE + 1, i / 12);
        walls.push(hb(x - 0.3, x + 0.3, s * face, s * CH.in, r0, r1, { mat }));
      }
    }
    for (let j = 1; j < 6; j++) {
      const n = lerp(-CH.in, CH.in, j / 6);
      walls.push(hb(CH.back, back, n - 0.3, n + 0.3, r0, r1));
    }
  }
  lay('chambers', walls, { lift: 3, course: STOREY / 2 });
  // Floors at each storey, on the ledges, and the roof.
  for (const r of [STOREY, 2 * STOREY, 3 * STOREY]) {
    const face = H.half + thick(Math.min(r, 2 * STOREY)), back = H.holyW - thick(Math.min(r, 2 * STOREY));
    for (const s of [-1, 1]) {
      const geo = worldBox(back, CH.east, Math.min(s * face, s * CH.in), Math.max(s * face, s * CH.in), HY + r, HY + r + 1, 4, 4);
      piece('chambers', worldMesh([geo], s < 0 ? MAT.beamsS : MAT.beams), 'lower', 3);
    }
    piece('chambers', worldMesh([worldBox(CH.back, back, -CH.in, CH.in, HY + r, HY + r + 1, 4, 4)], MAT.beams), 'lower', 3);
  }
}

// The roof (not mentioned): beams across, then planks.
{
  const geos = [], out = H.half + 4, west = H.holyW - 4;
  for (let x = west + 0.5; x < H.porchBack - 0.5; x += 2.5) geos.push(worldBox(x, x + 0.9, -out, out, HY + H.height, HY + H.height + 0.9, 4, 4));
  piece('roof', worldMesh(geos, MAT.roof), 'lower', 4);
  piece('roof', worldMesh([worldBox(west, H.porchBack, -out, out, HY + H.height + 0.9, HY + H.height + 1.2, 4, 4)], MAT.roof), 'lower', 4);
}

// The building to the west (41:12): 70 × 90 inside, walls five thick. Its height,
// roof and doors aren't given.
{
  const { x0, x1, half, wall, h } = WEST, y = LEVEL.inner;
  lay('westBuilding', [
    wallBox(x0, x1, half - wall, half, y, y + h), wallBox(x0, x1, -half, -half + wall, y, y + h),
    wallBox(x0, x0 + wall, -half + wall, half - wall, y, y + h), wallBox(x1 - wall, x1, -half + wall, half - wall, y, y + h),
  ], { lift: 3, course: 3 });
  piece('westBuilding', worldMesh([worldBox(x0, x1, -half, half, y + h, y + h + 0.8, 4, 4)], MAT.beams), 'lower', 3);
}

// ---------------------------------------------------------------- inside
// Wood panelling from the floor up to the windows (41:16), the floor too, carved
// with cherubim and palm trees from the floor to above the entrance (41:17–20).
{
  const L = 0.08, top = 21;
  const panel = (geos, mat) => piece('panels', worldMesh(geos, mat), 'grow');
  for (const [x0, x1] of [[H.holyW, H.holyE], [H.naveW, H.naveE]]) {
    panel([worldBox(x0, x1, H.half - L, H.half, HY, HY + top, 4, 4)], MAT.wood);
    panel([worldBox(x0, x1, -H.half, -H.half + L, HY, HY + top, 4, 4)], MAT.woodS);
  }
  panel([worldBox(H.holyW, H.holyW + L, -H.half, H.half, HY, HY + top, 4, 4)], MAT.wood);
  panel([
    worldBox(H.naveE - L, H.naveE, -H.half, -H.door, HY, HY + top, 4, 4),
    worldBox(H.naveE - L, H.naveE, H.door, H.half, HY, HY + top, 4, 4),
    worldBox(H.naveE - L, H.naveE, -H.door, H.door, HY + 18, HY + top, 4, 4),
  ], MAT.wood);
  // Both faces of the wall between the rooms, round its entrance.
  for (const [x0, x1] of [[H.naveW, H.naveW + L], [H.holyE - L, H.holyE]]) {
    panel([
      worldBox(x0, x1, -H.half, -H.innerDoor, HY, HY + top, 4, 4),
      worldBox(x0, x1, H.innerDoor, H.half, HY, HY + top, 4, 4),
      worldBox(x0, x1, -H.innerDoor, H.innerDoor, HY + 14, HY + top, 4, 4),
    ], MAT.wood);
  }
  piece('panels', worldMesh([worldBox(H.holyW, H.naveE, -H.half, H.half, HY, HY + 0.1, 4, 4)], MAT.wood), 'grow');
}

const carvingMats = [];
{
  const d = 0.1;
  const band = (geo, cut) => {
    const m = cut ? MAT.carving.clone() : MAT.carving;
    if (cut) carvingMats.push(m);
    const mesh = worldMesh([geo], m);
    mesh.castShadow = false;
    piece('carvings', mesh, 'grow');
  };
  for (const [x0, x1] of [[H.naveW, H.naveE], [H.holyW, H.holyE]]) {
    band(bandBox(x0, x1, H.half - d - 0.02, H.half - d, HY + 0.5, HY + 20, 10), false);
    band(bandBox(x0, x1, -H.half + d, -H.half + d + 0.02, HY + 0.5, HY + 20, 10), true);
  }
  band(bandBox(H.holyW + d, H.holyW + d + 0.02, -H.half + 0.2, H.half - 0.2, HY + 0.5, HY + 20, 10), false);
}

// The altar of wood, three cubits high and two long, "the table that is before
// the LORD" (41:22), in front of the most holy place. Its width isn't given.
{
  const G = placed(-109, 0, HY);
  add(G, box(2, 2.8, 2), MAT.wood);
  add(G, box(2.2, 0.15, 2.2), MAT.wood, 0, 2.8, 0);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) add(G, box(0.25, 0.3, 0.25), MAT.wood, sx * 0.9, 2.95, sz * 0.9);
  piece('table', G, 'drop', 4);
}

// Double doors, each of two leaves (41:23–24), carved like the walls (41:25),
// standing open into the nave and the most holy place.
function doors(x, half, h) {
  const leaf = half / 2;
  for (const s of [-1, 1]) {
    // Hinged at the doorpost, swung in; the outer leaf folds back on the inner.
    const H1 = new THREE.Group();
    H1.position.set(x + 0.4, HY + 0.05, s * half);
    H1.rotation.y = s * 1.2;
    scene.add(H1);
    add(H1, box(0.16, h - 0.1, leaf - 0.04), MAT.door, 0, 0, -s * leaf / 2);
    const H2 = new THREE.Group();
    H2.position.set(0, 0, -s * leaf);
    H2.rotation.y = s * -2.2;
    H1.add(H2);
    add(H2, box(0.16, h - 0.1, leaf - 0.04), MAT.door, 0, 0, -s * leaf / 2);
    piece('doors', H1, 'grow');
  }
}
doors(H.naveE, H.door, 18);
doors(H.holyE, H.innerDoor, 14);

// A canopy of wood in front of the porch (41:25; the word is uncertain), and
// palm trees on the porch's front (41:26).
{
  const y = HY + 18.2;
  piece('canopy', worldMesh([worldBox(H.front, H.front + 4, -H.porchDoor - 2, H.porchDoor + 2, y, y + 0.6, 4, 4)], MAT.wood), 'grow');
  for (const s of [-1, 1]) {
    piece('canopy', worldMesh([worldBox(H.front, H.front + 3.6, s * (H.porchDoor + 1.6) - 0.2, s * (H.porchDoor + 1.6) + 0.2, y - 2.5, y, 4, 4)], MAT.wood), 'grow');
    const pm = worldMesh([uvSquash(worldBox(H.front + 0.02, H.front + 0.05, Math.min(s * 8, s * 14.5), Math.max(s * 8, s * 14.5), HY + 1, HY + 15))], MAT.palm);
    pm.castShadow = false;
    piece('canopy', pm, 'grow');
  }
}

// ---------------------------------------------------------------- the holy chambers
// North and south of the house (42:1–12): a block 100 long beside the yard and
// one 50 long on the outer side, three storeys, each set back (42:5–6), with a
// passage ten wide between them (42:4), a wall 50 long beside the shorter one
// (42:7), and the way in from the east (42:9). One reading of a hard passage.
for (const s of [-1, 1]) {
  const key = s > 0 ? 'priestsN' : 'priestsS';
  const N = (a, b) => [Math.min(s * a, s * b), Math.max(s * a, s * b)];
  const y = LEVEL.outer, SH = 5;
  for (let k = 0; k < 3; k++) {
    const G = new THREE.Group();
    scene.add(G);
    const r0 = y + k * SH, r1 = r0 + SH;
    worldMesh([worldBox(-150, -50, ...N(52, 72 - 4 * k), r0, r1)], MAT.stone, G);
    worldMesh([worldBox(-150, -100, ...N(82 + 4 * k, 100), r0, r1)], MAT.stone, G);
    worldMesh([worldBox(-150.3, -49.7, ...N(51.7, 72.3 - 4 * k), r1, r1 + 0.4, 4, 4), worldBox(-150.3, -99.7, ...N(81.7 + 4 * k, 100.3), r1, r1 + 0.4, 4, 4)], MAT.beams, G);
    // Doors on the passage (42:4), on each storey.
    const doors = [];
    for (let x = -142; x < -55; x += 11) doors.push(worldBox(x - 1, x + 1, ...N(72 - 4 * k, 72 - 4 * k + 0.1), r0, r0 + 3.6));
    for (let x = -144; x < -104; x += 11) doors.push(worldBox(x - 1, x + 1, ...N(82 + 4 * k - 0.1, 82 + 4 * k), r0, r0 + 3.6));
    worldMesh(doors, MAT.dark, G);
    piece(key, G, 'lower', 4);
  }
  piece(key, worldMesh([worldBox(-100, -50, ...N(98, 100), y, y + 4)], MAT.stone), 'lower', 3);
}

// ---------------------------------------------------------------- measuring lines
// The man's line, laid out round what he measures: the inner court (40:47) and
// the house with its yards (41:13–14), traced while the verse is read, and the
// wall (42:15–20). Each follows its group's progress.
const LINES = [];
function measureLine(key, corners) {
  const seg = 3, pts = [];
  for (let i = 1; i < corners.length; i++) {
    const [ax, an] = corners[i - 1], [bx, bn] = corners[i];
    const L = Math.hypot(bx - ax, bn - an), k = Math.round(L / seg);
    for (let j = 0; j < k; j++) pts.push([lerp(ax, bx, (j + 0.5) / k), lerp(an, bn, (j + 0.5) / k), Math.atan2(bn - an, bx - ax), L / k]);
  }
  const im = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 0.4, 2.4), MAT.line, pts.length);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), p = new THREE.Vector3(), sc = new THREE.Vector3();
  pts.forEach(([x, n, a, len], i) => {
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), a);
    im.setMatrixAt(i, m.compose(p.set(x, floorAt(x, n) + 0.4, -n), q, sc.set(len + 0.05, 1, 1)));
  });
  im.count = 0;
  scene.add(im);
  marker(key);
  LINES.push({ key, im });
}
{
  const R = OUTER + 7, C = INNER.half - 2.5, E = H.front + 0.4;
  measureLine('courtLine', [[INNER.east - 2.5, -C], [INNER.east - 2.5, C], [E, C], [E, -C], [INNER.east - 2.5, -C]]);
  const W = PLAT.x0 - 0.6, F = H.front - 0.6;   // the house's line runs just behind the court's
  measureLine('houseLine', [[W, -C], [F, -C], [F, C], [W, C], [W, -C]]);
  measureLine('line', [[R, 0], [R, R], [-R, R], [-R, -R], [R, -R], [R, 0]]);
}

// ---------------------------------------------------------------- where people stand
// The floor at (x, n): the platform and its steps, the gates and their steps,
// the inner court, the outer court, else the ground.
function floorAt(x, n) {
  const an = Math.abs(n);
  if (x > H.front && x < H.front + 6 && an < H.porchDoor) return lerp(LEVEL.house, LEVEL.inner, (x - H.front) / 6);
  if (x >= PLAT.x0 && x <= PLAT.x1 && an <= PLAT.half) return LEVEL.house;
  for (const g of GATES) {
    const [ax, an0] = g.at, [dx, dn] = g.dir;
    const u = (x - ax) * dx + (n - an0) * dn, w = -(x - ax) * dn + (n - an0) * dx;
    if (Math.abs(w) > GATE.half) continue;
    if (u >= 0 && u <= GATE.len) return g.y;
    const run = g.steps * STEP.run, drop = g.steps * STEP.rise;
    if (g.steps === 7 && u < 0 && u > -run) return g.y + (u / run) * drop;
    if (g.steps === 8 && u > GATE.len && u < GATE.len + run) return g.y - ((u - GATE.len) / run) * drop;
  }
  if (x >= INNER.west && x <= INNER.east && an <= INNER.half) return LEVEL.inner;
  if (Math.abs(x) <= OUTER && an <= OUTER) return LEVEL.outer;
  return ground(x, n);
}

// ---------------------------------------------------------------- people
// The man, shining like bronze with a linen line and a measuring rod (40:3), and
// Ezekiel. Each faces local +X with +Z on the right; the body (B) can fall forward.
function figure(kind) {
  const man = kind === 'man';
  const body = man ? MAT.bronze : MAT.robe, skin = man ? MAT.bronze : MAT.skin;
  const R = new THREE.Group();
  scene.add(R);
  const B = new THREE.Group();
  R.add(B);
  const legs = [-1, 1].map((s) => {
    const L = new THREE.Group();
    L.position.set(0, 1.25, s * 0.16);
    B.add(L);
    add(L, new THREE.CylinderGeometry(0.12, 0.09, 1.25, 7).translate(0, -0.625, 0), skin);
    add(L, box(0.36, 0.1, 0.17), man ? MAT.bronze : MAT.sandal, 0.08, -1.27, 0);
    return L;
  });
  add(B, lathe([[0.001, 0.72], [0.4, 0.74], [0.36, 1.3], [0.31, 1.7], [0.29, 2.2], [0.33, 2.58], [0.36, 2.7], [0.2, 2.86], [0.08, 2.92]], 18), body);
  add(B, new THREE.TorusGeometry(0.31, 0.05, 6, 20).rotateX(Math.PI / 2), man ? MAT.linen : MAT.sandal, 0, 1.75, 0);
  const arms = [-1, 1].map((s) => {
    const A = new THREE.Group();
    A.position.set(0, 2.62, s * 0.36);
    A.rotation.x = s * -0.1;
    B.add(A);
    add(A, new THREE.CylinderGeometry(0.11, 0.09, 1, 8).translate(0, -0.5, 0), body);
    add(A, new THREE.SphereGeometry(0.09, 8, 6), skin, 0, -1.05, 0);
    return A;
  });
  add(B, new THREE.CylinderGeometry(0.1, 0.12, 0.2, 8), skin, 0, 2.86, 0);
  add(B, new THREE.SphereGeometry(0.25, 14, 10), skin, 0, 3.16, 0);
  let rod = null;
  if (man) {
    add(B, new THREE.SphereGeometry(0.26, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2.2), MAT.bronze, -0.02, 3.18, 0);
    // The linen line, coiled at his belt.
    for (let k = 0; k < 3; k++) {
      const c = add(B, new THREE.TorusGeometry(0.22 - k * 0.015, 0.03, 5, 18), MAT.linen, 0.05, 1.45 - k * 0.04, -0.34);
      c.rotation.y = Math.PI / 2 - 0.2;
    }
    // The rod: six long cubits (40:5), held in the right hand.
    rod = new THREE.Group();
    rod.position.set(0, -1.05, 0);
    arms[1].add(rod);
    add(rod, new THREE.CylinderGeometry(0.045, 0.05, 6, 8).translate(0, 1.5, 0), MAT.reed);
  } else {
    add(B, new THREE.ConeGeometry(0.17, 0.4, 10).rotateZ(Math.PI), MAT.hair, 0.12, 2.96, 0);
    add(B, new THREE.SphereGeometry(0.29, 12, 8, 0, Math.PI * 2, 0, Math.PI / 1.7), MAT.cloth, -0.03, 3.17, 0);
    add(B, new THREE.CylinderGeometry(0.3, 0.36, 0.9, 12, 1, true), MAT.cloth, -0.08, 2.75, 0).scale.set(0.8, 1, 1);
  }
  const f = { R, B, legs, arms, rod, man, phase: 0, x: 0, n: 0, face: 0, last: null };
  piece('people', B, 'grow');
  return f;
}
const man = figure('man');
const ezekiel = figure('ezekiel');
const FIGS = { man, ezekiel };

// A path for one person into stop i: from where they stood at the stop before,
// through the stop's `via` points.
function pathTo(i, who) {
  const from = i > 0 ? stops[i - 1][who] : START[who];
  const st = stops[i];
  return [[from[0], from[1]], ...(st.via ?? []), [st[who][0], st[who][1]]];
}
function along(pts, u) {
  const lens = [];
  let total = 0;
  for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); lens.push(l); total += l; }
  let d = u * total;
  for (let i = 0; i < lens.length; i++) {
    if (d <= lens[i] || i === lens.length - 1) {
      const k = lens[i] ? clamp01(d / lens[i]) : 1;
      const [ax, an] = pts[i], [bx, bn] = pts[i + 1];
      return { x: lerp(ax, bx, k), n: lerp(an, bn, k), dir: Math.atan2(bn - an, bx - ax), left: total * (1 - u) };
    }
    d -= lens[i];
  }
  const p = pts[pts.length - 1];
  return { x: p[0], n: p[1], dir: 0, left: 0 };
}

// Where each person is this frame: { x, n, face, fall, lift }.
function place(who) {
  const fin = tour.phase === 'finale' || tour.finale;
  if (fin) {
    const g = tour.gloryT, gate = GLORY.gate[who], inner = GLORY.inner[who];
    if (tour.phase !== 'finale' && fly) {
      // Walking to the east gate (43:1).
      const last = stops[stops.length - 1][who];
      const pts = [[last[0], last[1]], [gate[0], gate[1]]];
      const a = along(pts, smooth(clamp01(fly.t * 1.2)));
      return { x: a.x, n: a.n, face: a.left > 1 ? a.dir : rad(gate[2]), walking: a.left > 0.2 };
    }
    // Ezekiel falls on his face as the glory passes (43:3), and is lifted into the inner court (43:5).
    const k = smooth(clamp01((g - GLORY_T.lift) / 3.5));
    const fall = who === 'ezekiel' ? smooth(clamp01((g - GLORY_T.fall) / 1.2)) * (1 - smooth(clamp01((g - GLORY_T.lift) / 1.5))) : 0;
    return {
      x: lerp(gate[0], inner[0], k), n: lerp(gate[1], inner[1], k),
      face: rad(k > 0.5 ? inner[2] : gate[2]), fall, lift: Math.sin(Math.PI * k) * 14,
    };
  }
  if (tour.i < 0) return { x: START[who][0], n: START[who][1], face: rad(START[who][2]) };
  const st = stops[Math.min(tour.i, stops.length - 1)];
  if (fly && fly.build && fly.to === st) {
    const pts = pathTo(st.i, who);
    const u = smooth(clamp01((fly.t - 0.04) / 0.86));
    const a = along(pts, u);
    const face = a.left > 2 ? a.dir : turn(a.dir, rad(st[who][2]), clamp01(1 - a.left / 2));
    return { x: a.x, n: a.n, face, walking: a.left > 0.2 && u > 0 && u < 1 };
  }
  return { x: st[who][0], n: st[who][1], face: rad(st[who][2]) };
}

function updatePeople(dt) {
  const holding = tour.phase === 'hold' && stops[tour.i]?.measure !== false;
  tour.measure = lerp(tour.measure, holding ? 1 : 0, 1 - Math.exp(-dt * 2));
  for (const [who, f] of Object.entries(FIGS)) {
    const p = place(who);
    const moved = f.last ? Math.hypot(p.x - f.last.x, p.n - f.last.n) : 0;
    f.last = { x: p.x, n: p.n };
    // Legs swing at a walking pace, however fast the vision carries them.
    const speed = dt > 0 ? moved / dt : 0;
    const walking = p.walking && speed > 0.3;
    f.phase += dt * (walking ? 7 : 0);
    f.swing = lerp(f.swing ?? 0, walking ? 1 : 0, 1 - Math.exp(-dt * 6));
    const sw = Math.sin(f.phase) * 0.42 * f.swing;
    f.legs[0].rotation.z = sw;
    f.legs[1].rotation.z = -sw;
    f.arms[0].rotation.z = -sw * 0.7 + 0.05;
    f.face = p.face;
    f.R.position.set(p.x, floorAt(p.x, p.n) + (p.lift ?? 0), -p.n);
    f.R.rotation.y = p.face;
    f.B.rotation.z = -(p.fall ?? 0) * Math.PI / 2;
    f.B.position.y = (p.fall ?? 0) * 0.35;
    if (f.rod) {
      const m = tour.measure;
      const th = lerp(0.12 + sw * 0.4, 1.45, m);
      f.arms[1].rotation.z = th;
      f.rod.rotation.z = -th - (m * Math.PI) / 2;
    } else {
      f.arms[1].rotation.z = sw * 0.7 + 0.05;
    }
  }
}

// ---------------------------------------------------------------- the glory
// The glory of the God of Israel comes from the east (43:2), in by the east gate
// (43:4), and fills the house (43:5).
const GLORY_T = { appear: 0, enter: 3, fall: 7.2, house: 12.5, lift: 13.5, full: 17 };
const GLORY_PATH = [[900, 190], [340, 40], [250, 14], [200, 12], [100, 16], [50, 16], [0, 24], [-60, 22], [-100, 26]].map(([x, y]) => new THREE.Vector3(x, y, 0));
const glory = (() => {
  const G = new THREE.Group();
  scene.add(G);
  const sprite = (s, o) => {
    const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: TEX.glow, color: 0xfff4d8, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: o, fog: false }));
    m.scale.setScalar(s);
    G.add(m);
    return m;
  };
  const core = sprite(26, 1), halo = sprite(110, 0.55);
  const motes = Array.from({ length: 14 }, (_, i) => ({ s: sprite(10 + (i % 4) * 4, 0.6), a: i * 2.3, r: 14 + (i % 5) * 6 }));
  // Filling the house: soft light in the porch, the nave and the most holy place.
  const fill = [[-58, 22, 40], [-93, 24, 60], [-125, 22, 50], [-95, 40, 160]].map(([x, y, s]) => {
    const m = sprite(s, 0);
    m.userData.at = new THREE.Vector3(x, HY + y - 10, 0);
    return m;
  });
  const light = new THREE.PointLight(0xfff0c8, 0, 260, 1);
  G.add(light);
  G.visible = false;
  return { G, core, halo, motes, fill, light };
})();
const curve = new THREE.CatmullRomCurve3(GLORY_PATH);
function updateGlory(dt) {
  const on = tour.phase === 'finale';
  glory.G.visible = on;
  if (!on) {
    hemi.intensity = LIGHT.hemi;
    sun.intensity = LIGHT.sun;
    return;
  }
  tour.gloryT += dt * tour.speed;
  const g = tour.gloryT, T = GLORY_T;
  const appear = smooth(clamp01((g - T.appear) / 2.5));
  const u = smooth(clamp01((g - T.enter) / (T.house - T.enter)));
  const full = smooth(clamp01((g - T.house) / (T.full - T.house)));
  const pos = curve.getPointAt(u);
  glory.core.position.copy(pos);
  glory.halo.position.copy(pos);
  glory.light.position.copy(pos);
  const pulse = 1 + 0.06 * Math.sin(g * 2.1);
  glory.core.material.opacity = appear * (1 - full * 0.6);
  glory.halo.material.opacity = appear * 0.55 * (1 - full * 0.7);
  glory.core.scale.setScalar(26 * pulse);
  glory.halo.scale.setScalar(110 * pulse * (1 - full * 0.4));
  for (const m of glory.motes) {
    const a = m.a + g * 0.7;
    m.s.position.set(pos.x + Math.cos(a) * m.r, pos.y + Math.sin(a * 1.3) * m.r * 0.5, pos.z + Math.sin(a) * m.r);
    m.s.material.opacity = appear * 0.5 * (1 - full);
  }
  for (const m of glory.fill) {
    m.position.copy(m.userData.at);
    m.material.opacity = full * (0.85 + 0.15 * Math.sin(g * 1.7 + m.userData.at.x));
  }
  glory.light.intensity = appear * 800 * (1 + full);
  // "The earth shone with his glory" (43:2).
  const shine = appear * (1 - 0.5 * full) + full * 0.6;
  hemi.intensity = LIGHT.hemi * (1 + 0.35 * shine);
  sun.intensity = LIGHT.sun * (1 + 0.15 * shine);
}

// Everything up to (not including) stop i is built; the rest is not.
function applyStatic(i) {
  stops.forEach((st, j) => [...st.build, ...(st.trace ? [st.trace] : [])].forEach((k) => setGroup(k, j < i ? 1 : 0)));
}

// ---------------------------------------------------------------- labels
const labels = [];
function makeLabel(text, kind, pos, keys, group, inside, parent = scene) {
  const el = document.createElement('div');
  el.className = `label ${kind}`;
  el.textContent = tr(text);
  const obj = new CSS2DObject(el);
  obj.position.copy(pos);
  parent.add(obj);
  labels.push({ el, obj, kind, keys, group, inside, text, opacity: -1 });
}
for (const [k, f] of Object.entries(FEATURES)) {
  const base = f.kind === 'region' || f.kind === 'mount' ? ground(f.x, f.n) : 0;
  makeLabel(f.name, f.kind, v3(f.x, f.n, base + f.lift), [`feature:${k}`], f.group, f.inside);
}
for (const [k, p] of Object.entries(PEOPLE)) makeLabel(p.name, 'item', new THREE.Vector3(0, 4.3, 0), [`person:${k}`], 'people', false, FIGS[k].R);

const _wp = new THREE.Vector3();
function updateLabels(activeKeys) {
  const overview = tour.phase === 'intro' || tour.phase === 'finale';
  const far = camera.position.distanceTo(OVERVIEW_C);
  for (const lb of labels) {
    const d = camera.position.distanceTo(lb.obj.getWorldPosition(_wp));
    let o = 1;
    if (lb.kind === 'item') o = overview ? 0 : clamp01((110 - d) / 40);
    else if (lb.kind === 'feature') o = overview ? 0 : clamp01((260 - d) / 90);
    else o = clamp01((far - 300) / 200);
    if (lb.inside && !tour.explore && tour.cut < 0.5) o = 0;
    if (lb.kind === 'feature' && !tour.explore && tour.cut > 0.5) o = 0;
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
  if (st.build.includes('people')) for (const k of Object.keys(PEOPLE)) activeKeys.add(`person:${k}`);
  return { ...st, i, look, pos, activeKeys };
});

function overviewPos(a, finale = false) {
  const c = finale ? FINALE_LOOK : OVERVIEW_C, r = finale ? 600 : 820;
  return new THREE.Vector3(c.x + Math.cos(a) * r, finale ? 240 : 380, c.z + Math.sin(a) * r);
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
  measure: 0,         // how far the man holds out his rod
  finale: false,      // on the way to (or in) the finale
  gloryT: 0,
  traceT: 0,          // how long the line has been going round
};
let fly = null;

function wordCount(st) { return `${tr(st.quote)} ${tr(st.note)}`.split(/\s+/).length; }

function startFly(toIndex, auto = false) {
  const to = stops[toIndex];
  const from = tour.i >= 0 ? stops[tour.i] : null;
  const sequential = from && toIndex === tour.i + 1 && !tour.detached;
  if (!sequential) applyStatic(toIndex);
  else if (from.trace) setGroup(from.trace, 1);
  const fromPos = view.pos.clone(), fromLook = view.look.clone();
  const d = fromPos.distanceTo(to.pos);
  const dur = to.fly ?? (sequential ? Math.min(10, Math.max(6.5, d / 12)) : Math.min(7.5, Math.max(4.5, d / 60)));
  fly = { t: 0, dur, d, fromPos, fromLook, to, build: to.build, done: () => arrive(toIndex) };
  tour.i = toIndex;
  tour.phase = 'fly';
  tour.finale = false;
  // Moving on by itself, the end of the verse is read during the flight.
  if (!auto) narrator.stop();
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
  // Rise between stops, and back for a wider view on long hops.
  const arc = Math.min(80, 4 + fly.d * 0.25) * Math.sin(Math.PI * u);
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
  const read = Math.min(16, Math.max(8, 4 + wordCount(st) * 0.13)) * tour.holdScale;
  // Long enough for the line to go round, unless there's no pause at all.
  return st.trace && tour.holdScale > 0 ? Math.max(read, TRACE + 1) : read;
}

function arrive(i) {
  track('tour_stop', { stop: i + 1 });
  const st = stops[i];
  tour.phase = 'hold';
  tour.holdT = 0;
  tour.traceT = 0;
  tour.holdDur = holdFor(st);
  hideNext();
  showPopup(st);
  narrator.sayNext(verseLine(tr(st.ref), tr(st.quote)));
}

function finish(auto = false) {
  track('tour_complete');
  if (!auto) narrator.stop();
  tour.i = stops.length;
  tour.finale = true;
  tour.gloryT = 0;
  tour.orbitA = FINALE_A;
  applyStatic(stops.length);
  flyToOverview(() => {
    tour.phase = 'finale';
    tour.gloryT = 0;
    showCard(FINALE, true);
    narrator.sayNext(verseLine(tr(FINALE.ref), tr(FINALE.quote)));
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
  const target = tour.phase === 'finale' || tour.finale ? stops.length - 1 : Math.max(0, tour.i - 1);
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
  tour.finale = false;
  tour.detached = true;
  setPlaying(true);
  startFly(0);
  narrator.say(titleLine(t('ezekiel.title'), t('ezekiel.subtitle')));
}

function update(dt) {
  const t = dt * tour.speed;
  narrator.update(dt);
  // The cutaway eases towards where the tour is.
  const inTour = tour.phase === 'hold' || (tour.phase === 'fly' && !tour.finale);
  if (!tour.explore) tour.cut = lerp(tour.cut, inTour && stops[tour.i]?.cutaway ? 1 : 0, 1 - Math.exp(-dt * 2.2));
  // The measuring lines go round as the man measures, and stay.
  for (const l of LINES) l.im.count = Math.round(l.im.instanceMatrix.count * groupP(l.key));
  if (tour.explore) return;
  if (tour.phase === 'intro') {
    tour.introT += dt;
    tour.orbitA = SOUTH_EAST + 0.15 * Math.sin(tour.introT * 0.12);
  } else if (tour.phase === 'finale' && tour.gloryT > GLORY_T.full + 2) tour.orbitA += dt * 0.03;
  if ((tour.phase === 'intro' || tour.phase === 'finale') && !fly) {
    view.pos.copy(overviewPos(tour.orbitA, tour.phase === 'finale'));
    view.look.copy(tour.phase === 'finale' ? FINALE_LOOK : OVERVIEW_C);
  }
  if (fly) {
    if (tour.playing || !fly.build) stepFly(fly.build ? t : dt);
  } else if (tour.phase === 'hold') {
    const st = stops[tour.i];
    if (tour.playing) tour.holdT += t;
    // The man lays his line round what he measured, even while paused.
    if (st.trace) {
      tour.traceT += t;
      setGroup(st.trace, tour.holdScale > 0 ? smooth(clamp01(tour.traceT / TRACE)) : 1);
    }
    const k = tour.holdDur ? clamp01(tour.holdT / tour.holdDur) : 1;
    // A slow push-in while we read.
    view.pos.copy(st.pos).lerp(st.look, 0.08 * smooth(k));
    view.look.copy(st.look);
    timerBar.style.transform = `scaleX(${k})`;
    // Stay until the verse has been read, or nearly (narrator.js: OVERLAP).
    if (tour.playing && tour.holdT >= tour.holdDur && narrator.ready()) {
      if (tour.i >= stops.length - 1) finish(true);
      else startFly(tour.i + 1, true);
    }
  }
}

// Fades the cutaway materials, and their shadows.
const cutMeshes = [];
scene.traverse((o) => { if (o.isMesh && o.material.userData.cut) cutMeshes.push(o); });
let cutShown;
function applyCut(cut) {
  const c = Math.round(cut * 50) / 50;
  if (c !== cutShown) {
    for (const m of CUTS) {
      m.transparent = c > 0;
      m.depthWrite = c === 0;
      m.opacity = lerp(1, 0.04, c);
      if (cutShown === undefined || (cutShown > 0) !== (c > 0)) m.needsUpdate = true;
    }
    for (const o of cutMeshes) o.castShadow = c < 0.5;
    cutShown = c;
  }
  const p = groupP('carvings');
  MAT.carving.opacity = p;
  for (const m of carvingMats) m.opacity = p * (1 - cut * 0.96);
}

// ---------------------------------------------------------------- explore mode
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI * 0.48;
controls.minDistance = 2;
controls.maxDistance = 8000;

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
    if ((tour.phase === 'hold' || tour.phase === 'fly') && !tour.finale) {
      const st = stops[tour.i];
      const resume = tour.phase;
      fly = {
        t: 0, dur: 2.5, d: view.pos.distanceTo(st.pos), fromPos: view.pos.clone(), fromLook: view.look.clone(),
        to: st, build: null, done: () => { tour.phase = 'hold'; if (resume === 'fly') tour.holdT = 0; },
      };
      if (resume === 'fly') { applyStatic(st.i + 1); tour.detached = true; }
    } else {
      const phase = tour.phase === 'fly' ? 'finale' : tour.phase;
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
  ui.popup.innerHTML = `
    <div class="kicker">${t('stopOf', { n: st.i + 1, total: stops.length })} · ${esc(tr(st.ref))} (${VERSIONS[current.version].abbr})</div>
    <h2>${esc(tr(st.title))}</h2>
    <blockquote>${esc(tr(st.quote))}</blockquote>
    <p>${esc(tr(st.note))}</p>
    ${st.size ? `<div class="facts"><span>${t('measured')}</span> ${esc(tr(st.size))}</div>` : ''}
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
let viewLift = 0;    // shifts the frame up on phones (the popup, the finale card)
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05);
  update(dt);
  updatePeople(dt);
  updateGlory(dt);
  applyCut(tour.cut);
  const wantShift = !tour.explore && (tour.phase === 'hold' || tour.phase === 'fly' || tour.phase === 'finale') && innerWidth > 900 ? 0.14 : 0;
  // On phones the finale card sits at the bottom, so lift the frame instead.
  const wantLift = !tour.explore && innerWidth <= 640
    ? (tour.phase === 'finale' ? 0.24 : tour.phase === 'hold' || tour.phase === 'fly' ? popupLift() : 0) : 0;
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
  // The shadow follows the view, so it stays sharp close up.
  sun.target.position.copy(tour.explore ? controls.target : view.look);
  sun.position.copy(sun.target.position).add(new THREE.Vector3(420, 650, -320));
  const inTour = tour.phase === 'hold' || (tour.phase === 'fly' && !tour.finale);
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
  tour, stops, jump, next, applyStatic, view, groups, setGroup, floorAt,
  advance(sec) { for (let t = 0; t < sec; t += 0.05) { update(0.05); updatePeople(0.05); updateGlory(0.05); } },
  // Jump straight to stop i, arrived.
  show(i) {
    hideCard();
    applyStatic(i + 1);
    fly = null;
    tour.i = i;
    tour.finale = false;
    view.pos.copy(stops[i].pos);
    view.look.copy(stops[i].look);
    tour.cut = stops[i].cutaway ? 1 : 0;
    arrive(i);
    updateProgress();
  },
  // Straight to the finale, the glory `sec` seconds in.
  glory(sec = 0) {
    hidePopup();
    hideNext();
    applyStatic(stops.length);
    fly = null;
    tour.i = stops.length;
    tour.finale = true;
    tour.phase = 'finale';
    tour.orbitA = FINALE_A;
    tour.gloryT = sec;
    tour.cut = 0;
    showCard(FINALE, true);
  },
};
requestAnimationFrame(() => requestAnimationFrame(() => { window.__ready = true; }));
