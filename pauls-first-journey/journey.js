import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
// The engine shared by Paul's journeys: each journey's main.js calls start()
// with its own data.js (places, stops, MAP, OVERVIEW) and route.js (LEGS).
import { projection, loadMap, worldY } from './terrain.js';
import {
  VERSIONS, current, chooseVersion, setVersion as useVersion, remember, pick, t,
  localizeDOM, fillVersionSelect, noticeHTML, feedbackHTML, loadLanguages,
} from '../i18n.js';
import { createNarrator, titleLine, verseLine } from '../narrator.js';
import { track } from '../analytics.js';

// key: the UI key prefix for the title (`${key}.title`, `${key}.subtitle`);
// base: the journey's own import.meta.url, for its maps and lang/ files.
export async function start({ DATA, LEGS, base, key }) {
const { PLACES, FEATURES, STOPS, INTRO, FINALE, TERMS, MAP, OVERVIEW } = DATA;
const plan = projection(MAP.lon0, MAP.lat0);
const [fine, wide] = await Promise.all([loadMap(MAP.fine, base), loadMap(MAP.wide, base), loadLanguages(DATA, base)]);

// ---------------------------------------------------------------- constants
// One world unit is one kilometre; heights are raised (terrain.js).
const MESH = 2;                 // the fine terrain mesh uses every other pixel (1–3 km)
const SHIP_SCALE = 0.5;         // the ship is drawn 0.5 km long, about twenty times life size
const HOLD_SCALE = 0.5;         // default pause at each stop, relative to the reading-time estimate
const OVERVIEW_A = OVERVIEW.bearing;   // overview bearing (degrees)
const LINE = { out: 0xb3261e, back: 0xe08a1e };   // the route out, and back

// ---------------------------------------------------------------- helpers
function mulberry32(a) {
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(1347);
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const rad = (deg) => (deg * Math.PI) / 180;
const v3 = (x, n, y) => new THREE.Vector3(x, y, -n);
// Where a town is drawn: its real place, or nearby on the coast as drawn (`ashore`, below).
const ashore = new Map();
const where = (o) => ashore.get(o) ?? plan(o.lat, o.lon);

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
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, logarithmicDepthBuffer: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.0;
app.prepend(renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(innerWidth, innerHeight);
labelRenderer.domElement.className = 'labels';
app.insertBefore(labelRenderer.domElement, renderer.domElement.nextSibling);

const HAZE = new THREE.Color('#c9d6df');
const scene = new THREE.Scene();
scene.background = skyTexture();
scene.fog = new THREE.Fog(HAZE, 200, 2000);

const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.02, 16000);

const hemi = new THREE.HemisphereLight(0xe2ecf8, 0x8f7e62, 1.1);
scene.add(hemi);
// An afternoon sun from the west-south-west, so the relief reads from the south.
const SUN_DIR = new THREE.Vector3(-0.72, 0.6, 0.35).normalize();
const sun = new THREE.DirectionalLight(0xfff1d8, 2.6);
sun.position.copy(SUN_DIR).multiplyScalar(1000);
scene.add(sun);

// The sky: a gradient, repainted towards grey cloud as the storm comes in (k = 0..1).
function skyTexture() {
  const SKY = [['#5d93c8', '#3f4a52'], ['#a9c6de', '#5c656c'], ['#c9d6df', '#6b747b']];
  const c = document.createElement('canvas');
  c.width = 4; c.height = 512;
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.paint = (k) => {
    const g = c.getContext('2d'), mix = (i) => `#${new THREE.Color(SKY[i][0]).lerp(new THREE.Color(SKY[i][1]), k).getHexString()}`;
    const grad = g.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, mix(0));
    grad.addColorStop(0.45, mix(1));
    grad.addColorStop(0.62, mix(2));
    grad.addColorStop(1, mix(2));
    g.fillStyle = grad;
    g.fillRect(0, 0, 4, 512);
    t.needsUpdate = true;
  };
  t.paint(0);
  return t;
}

function canvasTexture(w, h, draw, srgb = true) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return t;
}

// ---------------------------------------------------------------- terrain
// Land colours by height and slope: green coastal plains, the dry plateau of
// Lycaonia, wooded slopes, bare rock and a little snow on the highest peaks.
const C = {
  plain: new THREE.Color('#a4a874'), dry: new THREE.Color('#c6b68f'), steppe: new THREE.Color('#d0bf98'),
  wood: new THREE.Color('#717c52'), rock: new THREE.Color('#a0978a'), high: new THREE.Color('#b4ad9f'),
  snow: new THREE.Color('#eeeeea'), shallow: new THREE.Color('#5aa7b3'), deep: new THREE.Color('#1f4d6e'),
  lake: new THREE.Color('#4b8fb0'),
};
const _c = new THREE.Color();
// Hash noise for colour variation.
function noise(x, n) {
  const s = Math.sin(x * 12.9898 + n * 78.233) * 43758.5453;
  return s - Math.floor(s);
}
function vnoise(x, n) {
  const xi = Math.floor(x), ni = Math.floor(n), fx = x - xi, fn = n - ni;
  const a = noise(xi, ni), b = noise(xi + 1, ni), c = noise(xi, ni + 1), d = noise(xi + 1, ni + 1);
  const u = smooth(fx), v = smooth(fn);
  return lerp(lerp(a, b, u), lerp(c, d, u), v);
}
function tint(m, lake, slope, x, n) {
  if (lake) return _c.copy(C.lake);
  if (m < 0) return _c.copy(C.shallow).lerp(C.deep, clamp01(Math.sqrt(-m) / 30));
  const v = vnoise(x / 9, n / 9) * 0.6 + vnoise(x / 2.5, n / 2.5) * 0.4;
  _c.copy(C.plain).lerp(C.dry, clamp01((m - 150) / 500));
  _c.lerp(C.steppe, clamp01((m - 850) / 250) * (1 - clamp01(slope * 4)));
  // Woods on the steeper slopes below the tree line.
  const woods = clamp01((slope - 0.08) * 6) * clamp01((1900 - m) / 500) * clamp01((m - 80) / 200);
  _c.lerp(C.wood, woods * (0.45 + 0.4 * v));
  _c.lerp(C.rock, clamp01((slope - 0.35) * 2.5) * 0.7);
  _c.lerp(C.high, clamp01((m - 2000) / 500));
  _c.lerp(C.snow, clamp01((m - 2700) / 400) * (1 - clamp01((slope - 0.6) * 2)));
  return _c.multiplyScalar(0.92 + v * 0.16);
}

// Heights in metres from a map, by pixel.
const hAt = (map, r, c) => map.h[Math.min(map.H - 1, Math.max(0, r)) * map.W + Math.min(map.W - 1, Math.max(0, c))];

// The fine terrain: a 1 km mesh, with colour and an object-space normal map at 0.5 km.
const fineMesh = (() => {
  const { W, H, step } = fine;
  const cols = Math.floor((W - 1) / MESH) + 1, rows = Math.floor((H - 1) / MESH) + 1;
  const ys = new Float32Array(cols * rows);
  const pos = new Float32Array(cols * rows * 3), uv = new Float32Array(cols * rows * 2);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const r = j * MESH, c = i * MESH, k = j * cols + i;
      const y = worldY(fine.h[r * W + c], fine.lake[r * W + c]);
      ys[k] = y;
      pos[k * 3] = fine.x0 + c * step;
      pos[k * 3 + 1] = y;
      pos[k * 3 + 2] = -(fine.n1 - r * step);
      uv[k * 2] = c / (W - 1);
      uv[k * 2 + 1] = r / (H - 1);
    }
  }
  const index = new Uint32Array((cols - 1) * (rows - 1) * 6);
  let q = 0;
  for (let j = 0; j < rows - 1; j++) {
    for (let i = 0; i < cols - 1; i++) {
      const a = j * cols + i, b = a + cols, c = b + 1, d = a + 1;
      index.set([a, b, d, b, c, d], q);
      q += 6;
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  geo.setIndex(new THREE.BufferAttribute(index, 1));
  geo.computeVertexNormals();

  // Colour and normals per pixel.
  const color = document.createElement('canvas'), normal = document.createElement('canvas');
  color.width = normal.width = W;
  color.height = normal.height = H;
  const cg = color.getContext('2d'), ng = normal.getContext('2d');
  const cd = cg.createImageData(W, H), nd = ng.createImageData(W, H);
  const wy = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) wy[i] = fine.h[i] >= 0 || fine.lake[i] ? worldY(fine.h[i], fine.lake[i]) : 0;
  const nv = new THREE.Vector3();
  for (let r = 0; r < H; r++) {
    for (let c = 0; c < W; c++) {
      const i = r * W + c;
      const m = fine.h[i], lake = fine.lake[i];
      const dx = (wy[r * W + Math.min(W - 1, c + 1)] - wy[r * W + Math.max(0, c - 1)]) / (2 * step);
      const dn = (wy[Math.max(0, r - 1) * W + c] - wy[Math.min(H - 1, r + 1) * W + c]) / (2 * step);
      const sea = m < 0 && !lake;
      nv.set(sea ? 0 : -dx, 1, sea ? 0 : dn).normalize();
      const slope = Math.hypot(dx, dn) / 3;   // real slope (rise over run)
      tint(m, lake, slope, fine.x0 + c * step, fine.n1 - r * step);
      cd.data[i * 4] = _c.r * 255; cd.data[i * 4 + 1] = _c.g * 255; cd.data[i * 4 + 2] = _c.b * 255; cd.data[i * 4 + 3] = 255;
      nd.data[i * 4] = (nv.x * 0.5 + 0.5) * 255; nd.data[i * 4 + 1] = (nv.y * 0.5 + 0.5) * 255;
      nd.data[i * 4 + 2] = (nv.z * 0.5 + 0.5) * 255; nd.data[i * 4 + 3] = 255;
    }
  }
  cg.putImageData(cd, 0, 0);
  ng.putImageData(nd, 0, 0);
  const map = new THREE.CanvasTexture(color);
  map.colorSpace = THREE.SRGBColorSpace;
  const nmap = new THREE.CanvasTexture(normal);
  for (const tx of [map, nmap]) {
    tx.flipY = false;
    tx.anisotropy = renderer.capabilities.getMaxAnisotropy();
  }
  const mat = new THREE.MeshStandardMaterial({ map, normalMap: nmap, normalMapType: THREE.ObjectSpaceNormalMap, roughness: 0.97 });
  const mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);
  return { cols, rows, ys };
})();

// The wider lands and seas round about, coarser, sunk a little under the fine mesh.
{
  const S = 2;
  const { W, H, step } = wide;
  const cols = Math.floor((W - 1) / S) + 1, rows = Math.floor((H - 1) / S) + 1;
  const geo = new THREE.PlaneGeometry(1, 1, cols - 1, rows - 1);
  const p = geo.attributes.position;
  const col = new Float32Array(p.count * 3);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const k = j * cols + i, r = j * S, c = i * S;
      const x = wide.x0 + c * step, n = wide.n1 - r * step;
      const m = hAt(wide, r, c), lake = wide.lake[r * W + c];
      // Well under the fine mesh, except along its edge where the two meet.
      const edge = Math.min(x - fine.x0, fine.x0 + (fine.W - 1) * fine.step - x, n - (fine.n1 - (fine.H - 1) * fine.step), fine.n1 - n);
      p.setXYZ(k, x, worldY(m, lake) - (edge > 0 ? Math.min(30, 0.8 + edge * 0.5) : 0), -n);
      const slope = Math.hypot(hAt(wide, r, c + S) - hAt(wide, r, c - S), hAt(wide, r - S, c) - hAt(wide, r + S, c)) / (4 * step * 1000);
      tint(m, lake, slope, x, n);
      col.set([_c.r, _c.g, _c.b], k * 3);
    }
  }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 }));
  scene.add(mesh);
}

// Where the ground is, in world height, exactly on the fine mesh's triangles
// (the wide map outside it).
function groundY(x, n) {
  const { cols, rows, ys } = fineMesh;
  const s = fine.step * MESH;
  const fc = (x - fine.x0) / s, fr = (fine.n1 - n) / s;
  if (fc < 0 || fr < 0 || fc >= cols - 1 || fr >= rows - 1) {
    const c = Math.round((x - wide.x0) / wide.step), r = Math.round((wide.n1 - n) / wide.step);
    return worldY(hAt(wide, r, c), wide.lake[r * wide.W + c]);
  }
  const i = Math.floor(fc), j = Math.floor(fr), u = fc - i, v = fr - j;
  const A = ys[j * cols + i], B = ys[(j + 1) * cols + i], Cc = ys[(j + 1) * cols + i + 1], D = ys[j * cols + i + 1];
  return u + v <= 1 ? A + (D - A) * u + (B - A) * v : Cc + (B - Cc) * (1 - u) + (D - Cc) * (1 - v);
}
function isWater(x, n) {
  const c = Math.round((x - fine.x0) / fine.step), r = Math.round((fine.n1 - n) / fine.step);
  return hAt(fine, r, c) < 0 || fine.lake[r * fine.W + c] === 1;
}
// Dry land as drawn. A mesh cell is 1–3 km, and on the coast a triangle with a
// corner on the deep sea floor runs under the water even where the height map
// is dry, so a town on the shore keeps to the coast as drawn: its houses and
// walls stand only where the mesh is above the sea, and a town whose own place
// is under it (Tyre's island, Caesarea's harbour, too small for the map) is
// drawn about the nearest dry point instead, a kilometre or two inland. The
// route and the ship still go to its real place.
const LAND = 0.01;
const onLand = (x, n) => !isWater(x, n) && groundY(x, n) >= LAND;
for (const o of [...Object.values(PLACES), ...Object.values(FEATURES).filter((f) => f.kind === 'town')]) {
  const p = plan(o.lat, o.lon);
  if (groundY(p.x, p.n) >= LAND + 0.01 && !isWater(p.x, p.n)) continue;
  search: for (let k = 1; k <= 40; k++) {
    for (let a = 0; a < 360; a += 6) {
      const x = p.x + Math.cos(rad(a)) * k * 0.2, n = p.n + Math.sin(rad(a)) * k * 0.2;
      if (groundY(x, n) >= LAND + 0.01 && !isWater(x, n)) { ashore.set(o, { x, n }); break search; }
    }
  }
}

// The sea: a sheet of water at sea level with moving ripples.
const waves = canvasTexture(256, 256, (g, s) => {
  const d = g.createImageData(s, s);
  const h = (x, y) => Math.sin(x * 0.15 + Math.sin(y * 0.08) * 2) * 0.5 + Math.sin(y * 0.21 + x * 0.05) * 0.3 + Math.sin((x + y) * 0.33) * 0.2;
  for (let y = 0; y < s; y++) {
    for (let x = 0; x < s; x++) {
      const dx = h(x + 1, y) - h(x - 1, y), dy = h(x, y + 1) - h(x, y - 1);
      const l = Math.hypot(dx, dy, 2);
      const i = (y * s + x) * 4;
      d.data[i] = (-dx / l * 0.5 + 0.5) * 255; d.data[i + 1] = (-dy / l * 0.5 + 0.5) * 255; d.data[i + 2] = (2 / l * 0.5 + 0.5) * 255; d.data[i + 3] = 255;
    }
  }
  g.putImageData(d, 0, 0);
}, false);
waves.repeat.set(24000, 24000);
const water = new THREE.Mesh(
  new THREE.PlaneGeometry(16000, 16000).rotateX(-Math.PI / 2),
  new THREE.MeshStandardMaterial({
    color: 0x2c6a8e, roughness: 0.8, metalness: 0, transparent: true, opacity: 0.86,
    normalMap: waves, normalScale: new THREE.Vector2(0.18, 0.18),
  }),
);
water.renderOrder = 1;
// A little below sea level, so the lowest coastal plains (0–10 m) stay clear of it from afar.
water.position.y = -0.03;
scene.add(water);

// ---------------------------------------------------------------- towns
// Not plans of the real towns: a wall where the town had one, houses of stone
// with tiled roofs, and a few larger public buildings, all drawn larger than life.
const MAT = {
  wall: new THREE.MeshStandardMaterial({ color: 0xd9ccb0, roughness: 0.95 }),
  house: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95 }),
  roof: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 }),
  marble: new THREE.MeshStandardMaterial({ color: 0xf0ebe0, roughness: 0.6 }),
};
const roofGeo = (() => {
  // A gable roof over a unit box: ridge along X.
  const g = new THREE.BufferGeometry();
  const v = [
    -0.5, 0, -0.5, 0.5, 0, -0.5, 0.5, 0.5, 0, -0.5, 0.5, 0,
    -0.5, 0, 0.5, 0.5, 0, 0.5, 0.5, 0.5, 0, -0.5, 0.5, 0,
  ];
  g.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
  g.setIndex([0, 3, 2, 0, 2, 1, 4, 5, 6, 4, 6, 7, 0, 4, 7, 0, 7, 3, 1, 2, 6, 1, 6, 5]);
  g.computeVertexNormals();
  return g;
})();
const boxGeo = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);

const houses = [], publics = [], wallSegs = [];
// Buildings drawn on their own (FEATURES with a `model`) keep the houses off.
const models = Object.values(FEATURES).filter((f) => f.model).map(where);
const nearModel = (x, n) => models.some((m) => Math.hypot(x - m.x, n - m.n) < 0.4);
function town(o, seed) {
  const r0 = mulberry32(seed);
  const { x, n } = where(o);
  const R = o.size;
  const grid = r0() * Math.PI;   // the street grid's angle
  const count = Math.round(R * R * 95 + 12);
  for (let k = 0; k < count * 3 && houses.length < 1e5; k++) {
    if (k >= count && !o.walls) break;
    const a = r0() * Math.PI * 2, d = Math.sqrt(r0()) * R * (k < count ? 0.95 : 1.4);
    const hx = x + Math.cos(a) * d, hn = n + Math.sin(a) * d;
    if (k >= count && r0() < 0.85) continue;   // a few houses outside the walls
    if (!onLand(hx, hn) || nearModel(hx, hn)) continue;
    const w = 0.045 + r0() * 0.05, l = 0.05 + r0() * 0.07, h = 0.03 + r0() * 0.03;
    houses.push({ x: hx, n: hn, w, l, h, rot: grid + (r0() < 0.5 ? 0 : Math.PI / 2) + (r0() - 0.5) * 0.12, tone: r0() });
  }
  // Public buildings near the middle: a temple or two, a market hall.
  const big = Math.max(1, Math.round(R * 2.2));
  for (let k = 0; k < big; k++) {
    const a = r0() * Math.PI * 2, d = r0() * R * 0.45;
    const px = x + Math.cos(a) * d, pn = n + Math.sin(a) * d;
    if (!onLand(px, pn) || nearModel(px, pn)) continue;
    publics.push({ x: px, n: pn, w: 0.1 + r0() * 0.06, l: 0.18 + r0() * 0.12, h: 0.07 + r0() * 0.03, rot: grid });
  }
  if (!o.walls) return;
  // The wall: an uneven ring, skipping the stretch along the sea.
  const N = Math.max(28, Math.round(R * 40));
  const ring = [];
  for (let k = 0; k <= N; k++) {
    const a = (k / N) * Math.PI * 2;
    const rr = R * (1.02 + 0.12 * Math.sin(a * 3 + seed) + 0.06 * Math.sin(a * 5 + seed * 2));
    ring.push([x + Math.cos(a) * rr, n + Math.sin(a) * rr]);
  }
  for (let k = 0; k < N; k++) {
    const [ax, an] = ring[k], [bx, bn] = ring[k + 1];
    if (!onLand(ax, an) || !onLand(bx, bn)) continue;
    wallSegs.push({ ax, an, bx, bn, tower: k % 3 === 0 });
  }
}
Object.entries(PLACES).forEach(([k, o], i) => town(o, 101 + i * 17));
Object.values(FEATURES).forEach((o, i) => { if (o.kind === 'town') town(o, 977 + i * 31); });

const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _s = new THREE.Vector3(), _p = new THREE.Vector3();
const UP = new THREE.Vector3(0, 1, 0);
function instanced(geo, mat, items, fill) {
  const im = new THREE.InstancedMesh(geo, mat, items.length);
  items.forEach((it, i) => { fill(it, i); im.setMatrixAt(i, _m); });
  im.instanceMatrix.needsUpdate = true;
  scene.add(im);
  return im;
}
{
  const wallTone = new THREE.Color(), roofTone = new THREE.Color();
  const body = instanced(boxGeo, MAT.house, houses, (h) => {
    const y = groundY(h.x, h.n) - 0.02;
    _m.compose(_p.set(h.x, y, -h.n), _q.setFromAxisAngle(UP, h.rot), _s.set(h.l, h.h + 0.02, h.w));
  });
  const roofs = instanced(roofGeo, MAT.roof, houses, (h) => {
    const y = groundY(h.x, h.n) + h.h;
    _m.compose(_p.set(h.x, y, -h.n), _q.setFromAxisAngle(UP, h.rot), _s.set(h.l * 1.04, h.w * 0.45, h.w * 1.08));
  });
  houses.forEach((h, i) => {
    body.setColorAt(i, wallTone.setHSL(0.11, 0.25, 0.72 + h.tone * 0.14));
    roofs.setColorAt(i, roofTone.setHSL(0.03 + h.tone * 0.03, 0.5, 0.42 + h.tone * 0.1));
  });
  instanced(boxGeo, MAT.marble, publics, (p) => {
    const y = groundY(p.x, p.n) - 0.02;
    _m.compose(_p.set(p.x, y, -p.n), _q.setFromAxisAngle(UP, p.rot), _s.set(p.l, p.h + 0.02, p.w));
  });
  instanced(roofGeo, MAT.roof, publics, (p) => {
    const y = groundY(p.x, p.n) + p.h;
    _m.compose(_p.set(p.x, y, -p.n), _q.setFromAxisAngle(UP, p.rot), _s.set(p.l * 1.05, p.w * 0.3, p.w * 1.1));
  });
  // Wall stretches follow the ground, with a tower at every third corner.
  const segs = instanced(boxGeo, MAT.wall, wallSegs, (w) => {
    const mx = (w.ax + w.bx) / 2, mn = (w.an + w.bn) / 2;
    const L = Math.hypot(w.bx - w.ax, w.bn - w.an);
    const y = Math.min(groundY(w.ax, w.an), groundY(w.bx, w.bn)) - 0.02;
    const top = Math.max(groundY(w.ax, w.an), groundY(w.bx, w.bn)) + 0.05;
    _m.compose(_p.set(mx, y, -mn), _q.setFromAxisAngle(UP, Math.atan2(w.bn - w.an, w.bx - w.ax)), _s.set(L + 0.02, top - y, 0.03));
  });
  segs.count = wallSegs.length;
  const towers = wallSegs.filter((w) => w.tower);
  instanced(boxGeo, MAT.wall, towers, (w) => {
    const y = groundY(w.ax, w.an) - 0.02;
    _m.compose(_p.set(w.ax, y, -w.an), _q.identity(), _s.set(0.07, 0.11, 0.07));
  });
  body.instanceColor.needsUpdate = roofs.instanceColor.needsUpdate = true;
}

// Buildings the text names (FEATURES with a `model`), drawn larger than life
// like the towns. A temple of the usual kind (the temple of Zeus at Lystra,
// 14:13), a guess.
function temple(f) {
  const { x, n } = where(f);
  const g = new THREE.Group();
  g.position.set(x, groundY(x, n) - 0.01, -n);
  g.rotation.y = rad(f.facing ?? 20);
  const add = (geo, px, py, pz) => { const m = new THREE.Mesh(geo, MAT.marble); m.position.set(px, py, pz); g.add(m); return m; };
  add(new THREE.BoxGeometry(0.22, 0.03, 0.13).translate(0, 0.015, 0), 0, 0, 0);
  const col = new THREE.CylinderGeometry(0.005, 0.006, 0.07, 8).translate(0, 0.035, 0);
  for (let i = 0; i < 8; i++) for (const s of [-1, 1]) add(col, -0.095 + i * 0.027, 0.03, s * 0.055);
  for (const s of [-1, 1]) for (let i = 1; i < 4; i++) add(col, s * 0.095, 0.03, -0.055 + i * 0.0275);
  add(new THREE.BoxGeometry(0.15, 0.06, 0.07).translate(0, 0.03, 0), 0, 0.03, 0);
  add(new THREE.BoxGeometry(0.215, 0.012, 0.125).translate(0, 0.006, 0), 0, 0.1, 0);
  const roof = new THREE.Mesh(roofGeo, MAT.roof);
  roof.scale.set(0.215, 0.035, 0.125);
  roof.position.y = 0.112;
  g.add(roof);
  scene.add(g);
}
// A theatre: tiers of seats in a half bowl, open towards `facing` (degrees
// from north), with the stage building across it (the theatre at Ephesus, 19:29).
function theater(f) {
  const { x, n } = where(f);
  const g = new THREE.Group();
  g.position.set(x, groundY(x, n) - 0.01, -n);
  const prof = [[0.05, 0]];
  for (let i = 0; i <= 8; i++) {
    const r = 0.05 + i * 0.014, y = 0.006 + i * 0.008;
    prof.push([r, y], [r + 0.014, y]);
  }
  prof.push([0.175, 0.08], [0.175, 0]);
  // The half bowl from +X round by -Z to -X: open towards local +Z, turned to face `facing`.
  const bowl = new THREE.Mesh(new THREE.LatheGeometry(prof.map(([r, y]) => new THREE.Vector2(r, y)), 24, Math.PI / 2, Math.PI), Object.assign(MAT.wall.clone(), { side: THREE.DoubleSide }));
  g.add(bowl);
  const stage = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.06, 0.03).translate(0, 0.03, 0), MAT.marble);
  stage.position.z = 0.03;
  g.add(stage);
  g.rotation.y = Math.PI - rad(f.facing ?? 180);
  g.scale.setScalar(1.6);
  scene.add(g);
}
for (const f of Object.values(FEATURES)) {
  if (f.model === 'temple') temple(f);
  if (f.model === 'theater') theater(f);
}

// ---------------------------------------------------------------- the route
// LEGS (route.js) joined into one path, resampled every 0.25 km, with its
// distance s from the start. Marks are where each named place is reached.
const route = [];      // { x, n, y, s, leg }
const marks = [];      // { place, s }
const legRange = [];   // { a, b, by, back }: s at the start and end of each leg
{
  let s = 0;
  LEGS.forEach((L, li) => {
    const a = s;
    const off = L.back ? 0.32 : 0;   // the way home runs beside the way out
    const pts = L.pts;
    for (let k = 0; k < pts.length - 1; k++) {
      const [x0, n0] = pts[k], [x1, n1] = pts[k + 1];
      const d = Math.hypot(x1 - x0, n1 - n0);
      const steps = Math.max(1, Math.ceil(d / 0.25));
      for (let q = k === 0 && route.length ? 1 : 0; q <= steps; q++) {
        if (q === 0 && k > 0) continue;
        const f = q / steps;
        route.push({ x: lerp(x0, x1, f), n: lerp(n0, n1, f), s: s + d * f, leg: li, off });
      }
      s += d;
    }
    legRange.push({ a, b: s, by: L.by, back: L.back, wreck: !!L.wreck });
    if (L.to) marks.push({ place: L.to, s });
  });
  // The journey starts where the first stop is.
  marks.unshift({ place: STOPS[0].at, s: 0 });
  // Side offsets (perpendicular to the way) and heights.
  for (let i = 0; i < route.length; i++) {
    const p = route[i], a = route[Math.max(0, i - 2)], b = route[Math.min(route.length - 1, i + 2)];
    const dx = b.x - a.x, dn = b.n - a.n, l = Math.hypot(dx, dn) || 1;
    // Right of the direction of travel, faded in and out at the ends of the leg.
    const r = legRange[p.leg];
    const fade = clamp01((p.s - r.a) / 3) * clamp01((r.b - p.s) / 3);
    p.x += (dn / l) * p.off * fade;
    p.n += (-dx / l) * p.off * fade;
    const sea = LEGS[p.leg].by === 'sea';
    p.y = sea ? 0.03 : Math.max(groundY(p.x, p.n), 0) + 0.06;
  }
}
const ROUTE_LEN = route[route.length - 1].s;

function routeIndex(s) {
  let lo = 0, hi = route.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (route[mid].s <= s) lo = mid; else hi = mid;
  }
  return lo;
}
// The point at distance s along the route (before the side offset is applied it's the same road).
function routeAt(s, out = { x: 0, n: 0, y: 0, leg: 0 }) {
  s = Math.max(0, Math.min(ROUTE_LEN, s));
  const i = routeIndex(s), a = route[i], b = route[Math.min(route.length - 1, i + 1)];
  const f = b.s > a.s ? (s - a.s) / (b.s - a.s) : 0;
  out.x = lerp(a.x, b.x, f); out.n = lerp(a.n, b.n, f); out.y = lerp(a.y, b.y, f); out.leg = a.leg;
  return out;
}
const legAt = (s) => legRange.findIndex((r) => s <= r.b + 1e-6);
// How much of the route near s is at sea (0..1), so the camera eases between land and sea.
function seaness(s) {
  let k = 0;
  for (let d = -6; d <= 6; d += 2) k += legRange[Math.max(0, legAt(s + d))]?.by === 'sea' ? 1 : 0;
  return k / 7;
}
// The general direction of travel at s, over the next and last few km.
function heading(s, span) {
  const a = routeAt(s - span * 0.4, {}), b = routeAt(s + span, {});
  const dx = b.x - a.x, dn = b.n - a.n, l = Math.hypot(dx, dn) || 1;
  return { x: dx / l, n: dn / l };
}

// The route drawn as lines a few pixels wide, one per leg, growing as we travel.
const lines = legRange.map((r, li) => {
  const pts = route.filter((p) => p.leg === li);
  const geo = new LineGeometry();
  geo.setPositions(pts.flatMap((p) => [p.x, p.y, -p.n]));
  const sea = r.by === 'sea';
  const mat = new LineMaterial({
    color: r.back ? LINE.back : LINE.out, linewidth: 3.2, worldUnits: false,
    dashed: sea, dashSize: 1.6, gapSize: 1.1,
  });
  const line = new Line2(geo, mat);
  line.computeLineDistances();
  line.renderOrder = 2;
  scene.add(line);
  return { line, geo, mat, pts, total: pts.length - 1 };
});
function showRoute(s) {
  for (const l of lines) {
    const r = legRange[lines.indexOf(l)];
    const f = clamp01((s - r.a) / Math.max(1e-6, r.b - r.a));
    const n = Math.round(f * l.total);
    l.line.visible = n > 0;
    l.geo.instanceCount = n;
  }
}

// The travellers' place on land: a soft light at the head of the route.
const glowTex = canvasTexture(128, 128, (g, s) => {
  const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  grad.addColorStop(0, 'rgba(255,255,245,1)');
  grad.addColorStop(0.2, 'rgba(255,236,190,0.9)');
  grad.addColorStop(0.5, 'rgba(240,170,80,0.35)');
  grad.addColorStop(1, 'rgba(230,150,60,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, s, s);
});
const head = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, sizeAttenuation: false, depthTest: false, transparent: true }));
head.scale.setScalar(0.045);
head.renderOrder = 5;
scene.add(head);

// ---------------------------------------------------------------- the ship
// A small Roman merchant ship of the first century: a rounded hull, a curved
// sternpost, one mast with a square sail, a small foresail (the artemon) and
// two steering oars. Acts doesn't describe the ships; this is a guess. The
// model is one unit long and faces +X.
const ship = (() => {
  const wood = new THREE.MeshStandardMaterial({ color: 0x6e4a2c, roughness: 0.8, side: THREE.DoubleSide });
  const dark = new THREE.MeshStandardMaterial({ color: 0x3a2617, roughness: 0.9 });
  const deck = new THREE.MeshStandardMaterial({ color: 0xa47c52, roughness: 0.9, side: THREE.DoubleSide });
  const sailTex = canvasTexture(128, 128, (g, s) => {
    g.fillStyle = '#efe6d0';
    g.fillRect(0, 0, s, s);
    g.fillStyle = 'rgba(120,90,50,0.35)';
    for (let x = 8; x < s; x += 16) g.fillRect(x, 0, 1.5, s);       // brailing lines
    g.fillStyle = 'rgba(120,90,50,0.15)';
    for (let y = 10; y < s; y += 21) g.fillRect(0, y, s, 1);        // seams
  });
  const sail = new THREE.MeshStandardMaterial({ map: sailTex, roughness: 1, side: THREE.DoubleSide });

  const outer = new THREE.Group(), g = new THREE.Group();
  outer.add(g);
  // The hull, lofted from cross-sections along its length.
  const NX = 28, NS = 12;
  const half = (t) => 0.15 * Math.pow(Math.max(0, 1 - Math.abs(t) ** 2.2), 0.55);
  const sheer = (t) => 0.05 + 0.07 * Math.abs(t) ** 3 + (t < 0 ? 0.03 * t * t : 0);
  const keel = (t) => -0.07 * (1 - 0.35 * t * t);
  const pos = [], idx = [], dpos = [], didx = [];
  for (let i = 0; i <= NX; i++) {
    const t = (i / NX) * 2 - 1, x = t * 0.5;
    for (let j = 0; j <= NS; j++) {
      const a = (j / NS) * Math.PI;
      const z = half(t) * Math.cos(a), y = sheer(t) + (keel(t) - sheer(t)) * Math.sin(a) ** 0.7;
      pos.push(x, y, z);
    }
    dpos.push(x, sheer(t) - 0.012, half(t) * 0.98, x, sheer(t) - 0.012, -half(t) * 0.98);
  }
  for (let i = 0; i < NX; i++) {
    for (let j = 0; j < NS; j++) {
      const a = i * (NS + 1) + j, b = a + NS + 1;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
    didx.push(i * 2, i * 2 + 2, i * 2 + 1, i * 2 + 1, i * 2 + 2, i * 2 + 3);
  }
  const hull = new THREE.BufferGeometry();
  hull.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  hull.setIndex(idx);
  hull.computeVertexNormals();
  g.add(new THREE.Mesh(hull, wood));
  const dg = new THREE.BufferGeometry();
  dg.setAttribute('position', new THREE.Float32BufferAttribute(dpos, 3));
  dg.setIndex(didx);
  dg.computeVertexNormals();
  g.add(new THREE.Mesh(dg, deck));
  // Sternpost curling up and forward like a goose's neck, and the stem.
  const tube = (pts, r, mat) => g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(([x, y]) => new THREE.Vector3(x, y, 0))), 16, r, 6), mat));
  tube([[-0.47, 0.1], [-0.53, 0.17], [-0.54, 0.25], [-0.5, 0.3], [-0.46, 0.29]], 0.014, wood);
  tube([[0.48, 0.09], [0.53, 0.13], [0.55, 0.17]], 0.011, wood);
  // A deckhouse at the stern.
  const house = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 0.13).translate(0, 0.025, 0), deck);
  house.position.set(-0.32, 0.07, 0);
  g.add(house);
  // Mast, yard and the square mainsail, bellied forward by the wind.
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.012, 0.52, 8).translate(0, 0.26, 0), dark);
  mast.position.set(0.04, 0.04, 0);
  g.add(mast);
  const yard = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.52, 6).rotateX(Math.PI / 2), dark);
  yard.position.set(0.05, 0.53, 0);
  g.add(yard);
  function sailGeo(w, h, belly) {
    const geo = new THREE.PlaneGeometry(w, h, 10, 8).rotateY(Math.PI / 2);
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const u = (p.getZ(i) / w) * 2, v = (p.getY(i) / h) * 2;
      p.setX(i, belly * (1 - u * u) * (1 - 0.6 * v * v));
    }
    geo.computeVertexNormals();
    return geo;
  }
  const main = new THREE.Mesh(sailGeo(0.48, 0.32, 0.06), sail);
  main.position.set(0.055, 0.36, 0);
  g.add(main);
  // The artemon: a small mast raked forward over the bow, with its own sail.
  const fore = new THREE.Group();
  fore.position.set(0.4, 0.08, 0);
  fore.rotation.z = -0.55;
  fore.add(new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.008, 0.24, 6).translate(0, 0.12, 0), dark));
  const fs = new THREE.Mesh(sailGeo(0.15, 0.1, 0.02), sail);
  fs.position.set(0.01, 0.16, 0);
  fs.rotation.z = 0.55;
  fore.add(fs);
  g.add(fore);
  // Two steering oars over the stern quarters.
  for (const s of [-1, 1]) {
    const oar = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.012, 0.02).translate(-0.13, 0, 0), dark);
    oar.position.set(-0.36, 0.1, s * 0.13);
    oar.rotation.z = 0.55;
    oar.rotation.y = -s * 0.1;
    g.add(oar);
  }
  // The wake: foam spreading behind.
  const wakeTex = canvasTexture(128, 256, (gg, w, h) => {
    gg.clearRect(0, 0, w, h);
    for (let i = 0; i < 900; i++) {
      const v = Math.random(), spread = 0.08 + v * 0.42;
      const side = Math.random() < 0.5 ? -1 : 1;
      const u = 0.5 + side * spread * (0.85 + Math.random() * 0.3) * 0.5 + (Math.random() - 0.5) * 0.02;
      gg.fillStyle = `rgba(255,255,255,${(1 - v) * 0.5})`;
      gg.fillRect(u * w, v * h, 2, 2);
    }
    const grad = gg.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(255,255,255,0.55)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    gg.fillStyle = grad;
    gg.fillRect(w * 0.44, 0, w * 0.12, h * 0.6);
  });
  const wake = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 2.2).rotateX(-Math.PI / 2).rotateY(-Math.PI / 2).translate(-1.55, 0.004, 0),
    new THREE.MeshBasicMaterial({ map: wakeTex, transparent: true, depthWrite: false, opacity: 0 }),
  );
  wake.renderOrder = 3;
  outer.add(wake);
  outer.traverse((o) => { if (o.isMesh) o.castShadow = false; });
  outer.scale.setScalar(SHIP_SCALE);
  outer.visible = false;
  scene.add(outer);
  return { outer, g, wake, sails: [main, fore], heading: 0, s: -1 };
})();

// The ship carries the route over the sea legs and waits in harbour just before and after.
function placeShip(s, dt, time) {
  const li = legRange.findIndex((r) => r.by === 'sea' && s >= r.a - 5 && s <= r.b + 22);
  ship.outer.visible = li >= 0;
  head.visible = li < 0 || s < legRange[li].a - 0.5 || s > legRange[li].b + 0.5;
  if (li < 0) { ship.s = -1; return; }
  const r = legRange[li];
  const cs = Math.max(r.a, Math.min(r.b, s));
  const p = routeAt(cs, {});
  const d = heading(Math.max(r.a + 0.5, Math.min(r.b - 0.5, cs)), 1.5);
  const want = Math.atan2(d.n, d.x);
  const speed = ship.s >= 0 && dt > 0 ? Math.abs(cs - ship.s) / dt : 0;
  ship.heading = ship.s < 0 ? want : ship.heading + ((((want - ship.heading + Math.PI * 3) % (Math.PI * 2)) - Math.PI) * (1 - Math.exp(-dt * 6)));
  ship.s = cs;
  ship.outer.position.set(p.x, water.position.y, -p.n);
  ship.outer.rotation.y = ship.heading;
  // Aground at the end of a leg that ends in shipwreck (Acts 27:41): bow stuck
  // fast, heeled over, the sails gone.
  const wrecked = r.wreck && s >= r.b - 0.3;
  for (const sl of ship.sails) sl.visible = !wrecked;
  // In a storm she rolls and pitches harder.
  const sea = 1 + tour.storm * 4;
  ship.g.rotation.x = wrecked ? 0.32 : Math.sin(time * 1.3) * 0.035 * sea;
  ship.g.rotation.z = wrecked ? 0.12 : Math.sin(time * 0.9) * 0.02 * sea;
  ship.g.position.y = wrecked ? -0.02 : Math.sin(time * 1.1) * 0.006 * sea;
  ship.wake.material.opacity = lerp(ship.wake.material.opacity, wrecked ? 0 : clamp01(speed / 4), 1 - Math.exp(-dt * 4));
}

// ---------------------------------------------------------------- labels
const labels = [];
function makeLabel(text, kind, pos, key) {
  const el = document.createElement('div');
  el.className = `label ${kind}`;
  el.textContent = tr(text);
  const obj = new CSS2DObject(el);
  obj.position.copy(pos);
  scene.add(obj);
  labels.push({ el, obj, kind, key, text, opacity: -1 });
}
for (const [k, o] of Object.entries(PLACES)) {
  const { x, n } = where(o);
  makeLabel(o.name, 'city', v3(x, n, Math.max(0, groundY(x, n)) + 0.35), k);
}
for (const [k, f] of Object.entries(FEATURES)) {
  if (f.kind === 'point') continue;   // a place the route goes through, not labelled
  const { x, n } = where(f);
  const base = f.kind === 'sea' ? 0 : Math.max(0, groundY(x, n));
  makeLabel(f.name, f.kind, v3(x, n, base + (f.lift ?? 0.3)), k);
}

const _wp = new THREE.Vector3();
function updateLabels(activeKeys) {
  const overview = tour.phase === 'intro' || tour.phase === 'finale';
  const alt = camera.position.y - Math.max(0, groundY(camera.position.x, -camera.position.z));
  for (const lb of labels) {
    const d = camera.position.distanceTo(lb.obj.getWorldPosition(_wp));
    let o;
    if (lb.kind === 'city') o = overview ? 1 : clamp01((Math.max(220, alt * 4) - d) / 80);
    else if (lb.kind === 'town') o = clamp01((300 - d) / 100) * clamp01((d - 6) / 6);
    else if (lb.kind === 'island') o = clamp01((400 - d) / 120) * clamp01((d - 15) / 10);
    else if (lb.kind === 'item') o = tour.explore ? clamp01((25 - d) / 10) : 0;
    else o = clamp01((alt - 12) / 14) * clamp01((d - 20) / 30);
    const active = activeKeys.has(lb.key);
    if (active) o = 1;
    o = Math.round(o * 20) / 20;
    if (o !== lb.opacity) { lb.el.style.opacity = o; lb.opacity = o; }
    lb.el.classList.toggle('active', active && (lb.kind === 'city' || lb.kind === 'item'));
  }
}

// ---------------------------------------------------------------- tour
// Each stop's place on the route: the next time the route reaches `at`, or
// `part` of the way there from the stop before.
function centre(keys) {
  const ps = keys.map((k) => where(PLACES[k] ?? FEATURES[k]));
  const x = ps.reduce((a, p) => a + p.x, 0) / ps.length, n = ps.reduce((a, p) => a + p.n, 0) / ps.length;
  return v3(x, n, Math.max(0, groundY(x, n)));
}
const stops = (() => {
  let prev = 0;
  return STOPS.map((st, i) => {
    const mark = marks.find((m) => m.place === st.at && m.s >= prev - 1e-6);
    const s = st.part != null ? lerp(prev, mark.s, st.part) : mark.s;
    const from = prev;
    prev = s;
    const p = routeAt(s, {});
    const look = st.look ? centre([].concat(st.look)) : v3(p.x, p.n, Math.max(0, groundY(p.x, p.n)));
    const { bearing, dist, h } = st.view;
    const pos = look.clone().add(new THREE.Vector3(Math.sin(rad(bearing)) * dist, h, -Math.cos(rad(bearing)) * dist));
    const activeKeys = new Set([st.part == null ? st.at : null, ...[].concat(st.look ?? []), ...(st.labels ?? [])].filter(Boolean));
    // What this stop's flight covers: by sea, overland, or both.
    let sea = 0, land = 0;
    legRange.forEach((r) => {
      const d = Math.max(0, Math.min(s, r.b) - Math.max(from, r.a));
      if (r.by === 'sea') sea += d; else land += d;
    });
    return { ...st, i, s, from, look, pos, activeKeys, sea, land };
  });
})();

// The overview: the whole route from the south-south-west.
const OVERVIEW_C = (() => {
  let x0 = Infinity, x1 = -Infinity, n0 = Infinity, n1 = -Infinity;
  for (const p of route) { x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x); n0 = Math.min(n0, p.n); n1 = Math.max(n1, p.n); }
  return v3((x0 + x1) / 2, (n0 + n1) / 2 + 20, 0);
})();
function overviewPos(a) {
  const r = OVERVIEW.dist;
  return new THREE.Vector3(OVERVIEW_C.x + Math.sin(rad(a)) * r, OVERVIEW.h, OVERVIEW_C.z - Math.cos(rad(a)) * r);
}

const view = { pos: overviewPos(OVERVIEW_A), look: OVERVIEW_C.clone() };
const tour = {
  phase: 'intro',     // intro | fly | hold | finale
  i: -1,
  playing: false,
  speed: 1,
  holdT: 0, holdDur: 10,
  holdScale: HOLD_SCALE,
  orbitA: OVERVIEW_A,
  introT: 0,
  detached: false,
  explore: false,
  finale: false,
  s: 0,               // how far along the route the travellers are (km)
  storm: 0,           // how stormy it is (0..1)
  time: 0,
};
let fly = null;

function wordCount(st) { return `${tr(st.quote)} ${tr(st.note)}`.split(/\s+/).length; }

// Following the travellers: behind and above the head of the route, higher and
// further back for long legs, low behind the ship at sea. On a long crossing
// the camera rises in mid-voyage (u = 0..1 through the flight) to show the way
// ahead across the sea, and comes back down to the ship.
const _f = { pos: new THREE.Vector3(), look: new THREE.Vector3() };
// dir: the direction of travel, smoothed over time by stepFly so that the
// bends of a road or a sea path don't swing the view.
function follow(s, L, u = 0, dir = null) {
  const k = seaness(s);
  const hLand = Math.min(45, Math.max(7, 5 + L * 0.07)), hSea = Math.min(5, Math.max(1.8, 1.6 + L * 0.006));
  // In a storm there is nothing to see from above, so stay with the ship and
  // swing round her instead.
  const arc = Math.sin(Math.PI * clamp01(u));
  const rise = k * (1 - tour.storm) * Math.min(L * 0.1, 45) * arc ** 1.5;
  const base = lerp(hLand, hSea, k), h = base + rise, dist = base * lerp(1.8, 2.4, k) + rise * 0.9;
  const d = dir ?? heading(s, lerp(Math.max(15, L * 0.15), 10, k));
  const swing = k * tour.storm * 0.6 * arc, cs = Math.cos(swing), sn = Math.sin(swing);
  const bx = d.x * cs - d.n * sn, bn = d.x * sn + d.n * cs;   // the camera's way back from the ship
  const p = routeAt(s, {});
  const y = Math.max(0, p.y);
  _f.pos.set(p.x - bx * dist, y + h, -(p.n - bn * dist));
  const ahead = base * lerp(1.8, 2.4, k) * 0.35;
  _f.look.set(p.x + d.x * ahead, y, -(p.n + d.n * ahead));
  return _f;
}

function startFly(toIndex) {
  const to = stops[toIndex];
  const from = tour.i >= 0 ? stops[tour.i] : null;
  const sequential = from && toIndex === tour.i + 1 && !tour.detached;
  const s0 = sequential ? from.s : to.from;
  if (!sequential) tour.s = s0;
  const L = to.s - s0;
  const fromPos = view.pos.clone(), fromLook = view.look.clone();
  const d = fromPos.distanceTo(to.pos);
  // Open sea counts for less than land: there is less to see on the way.
  // In a storm, less still: one rainy sea looks much like the next.
  const seaShare = to.sea / Math.max(1, to.sea + to.land);
  const dur = L > 0.5 ? Math.min(22, Math.max(6.5, 5.5 + (L * (1 - (0.6 + 0.25 * (to.storm ?? 0)) * seaShare)) / 26)) : Math.min(8, Math.max(4.5, 3 + d / 25));
  fly = { t: 0, dur, d, s0, s1: to.s, L, fromPos, fromLook, to, travel: true, done: () => arrive(toIndex) };
  tour.i = toIndex;
  tour.phase = 'fly';
  tour.finale = false;
  narrator.stop();
  tour.detached = false;
  // With no pause, the last stop's text stays up through the next flight.
  if (tour.holdScale > 0 || !sequential) hidePopup();
  showNext(to);
  caption.textContent = to.caption ? tr(to.caption) : '';
  updateProgress();
}

function flyToOverview(then) {
  const to = { pos: overviewPos(tour.orbitA), look: OVERVIEW_C.clone() };
  fly = { t: 0, dur: 7, d: view.pos.distanceTo(to.pos), s0: tour.s, s1: tour.s, L: 0, fromPos: view.pos.clone(), fromLook: view.look.clone(), to, travel: false, done: then };
  tour.phase = 'fly';
  hidePopup();
}

const _a = new THREE.Vector3(), _b = new THREE.Vector3();
function stepFly(dt) {
  fly.t += dt / fly.dur;
  const u = clamp01(fly.t);
  if (fly.L > 0.5) {
    // Travel along the route, the camera handed from the last view to the
    // follow view and on to the next stop's view.
    tour.s = lerp(fly.s0, fly.s1, easeInOut(clamp01((u - 0.1) / 0.8)));
    // The direction of travel turns slowly towards the route's.
    const raw = heading(tour.s, lerp(Math.max(15, fly.L * 0.15), 10, seaness(tour.s)));
    const want = Math.atan2(raw.n, raw.x);
    fly.dirA = fly.dirA == null ? want : fly.dirA + ((((want - fly.dirA + Math.PI * 3) % (Math.PI * 2)) - Math.PI) * (1 - Math.exp(-dt * 0.9)));
    const f = follow(tour.s, fly.L, (u - 0.1) / 0.8, { x: Math.cos(fly.dirA), n: Math.sin(fly.dirA) });
    const wIn = smooth(clamp01(u / 0.22)), wOut = smooth(clamp01((u - 0.8) / 0.2));
    _a.lerpVectors(fly.fromPos, f.pos, wIn);
    _b.lerpVectors(fly.fromLook, f.look, smooth(clamp01(u / 0.16)));
    view.pos.lerpVectors(_a, fly.to.pos, wOut);
    view.look.lerpVectors(_b, fly.to.look, wOut);
  } else {
    // Rise between views, more for long moves.
    const e = easeInOut(u);
    const arc = Math.min(60, fly.d * 0.25) * Math.sin(Math.PI * u);
    view.pos.lerpVectors(fly.fromPos, fly.to.pos, e).y += arc;
    view.look.lerpVectors(fly.fromLook, fly.to.look, easeInOut(clamp01(u * 1.1)));
  }
  caption.classList.toggle('show', !!fly.to.caption && fly.travel && u > 0.3 && u < 0.75);
  if (u >= 1) {
    const done = fly.done;
    caption.classList.remove('show');
    if (fly.travel) tour.s = fly.s1;
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
  tour.finale = true;
  tour.s = ROUTE_LEN;
  tour.orbitA = OVERVIEW_A;
  flyToOverview(() => {
    tour.phase = 'finale';
    showCard(FINALE, true);
    narrator.say(verseLine(tr(FINALE.ref), tr(FINALE.quote)));
  });
  updateProgress();
}

function next() {
  if (tour.explore) setExplore(false);
  if (tour.phase === 'intro' || tour.phase === 'finale') return begin();
  if (fly && fly.travel) {
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
  tour.s = 0;
  tour.i = -1;
  tour.finale = false;
  tour.detached = true;
  setPlaying(true);
  startFly(0);
  narrator.say(titleLine(t(`${key}.title`), t(`${key}.subtitle`)));
}

function update(dt) {
  const t = dt * tour.speed;
  narrator.update(dt);
  tour.time += dt;
  if (tour.explore) return;
  if (tour.phase === 'intro') {
    tour.introT += dt;
    tour.orbitA = OVERVIEW_A + 6 * Math.sin(tour.introT * 0.1);
  } else if (tour.phase === 'finale') tour.orbitA += dt * 1.2;
  if ((tour.phase === 'intro' || tour.phase === 'finale') && !fly) {
    view.pos.copy(overviewPos(tour.orbitA));
    view.look.copy(OVERVIEW_C);
  }
  if (fly) {
    if (tour.playing || !fly.travel) stepFly(fly.travel ? t : dt);
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
controls.minDistance = 0.4;
controls.maxDistance = 3000;
controls.zoomSpeed = 1.6;

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
      tour.s = st.s;
      fly = {
        t: 0, dur: 2.5, d: view.pos.distanceTo(st.pos), s0: st.s, s1: st.s, L: 0, fromPos: view.pos.clone(), fromLook: view.look.clone(),
        to: st, travel: false, done: () => { tour.phase = 'hold'; if (resume === 'fly') { tour.holdT = 0; arrive(st.i); } },
      };
      if (resume === 'fly') tour.detached = true;
    } else {
      const phase = tour.phase === 'fly' ? 'finale' : tour.phase;
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
const narrator = createNarrator({ box: ui.narration, mute: ui.mute, volume: ui.volume, voice: ui.voice });
// A stop's `caption` fades in over the map during the flight to it (e.g. crossing from Asia into Europe).
const caption = document.createElement('div');
caption.className = 'crossing';
app.appendChild(caption);
const timerBar = document.createElement('i');

const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
// Distances rounded the way a map would give them.
function km(d) {
  const k = d < 40 ? Math.round(d / 5) * 5 : Math.round(d / 10) * 10;
  return t('distance', { km: k.toLocaleString(current.lang), mi: (Math.round(k * 0.621 / 5) * 5).toLocaleString(current.lang) });
}

function showPopup(st) {
  const legs = [st.land > 2.5 && `${t('overland')} ${km(st.land)}`, st.sea > 2.5 && `${t('bySea')} ${km(st.sea)}`].filter(Boolean);
  ui.popup.innerHTML = `
    <div class="kicker">${t('stopOf', { n: st.i + 1, total: stops.length })} · ${esc(tr(st.ref))} (${VERSIONS[current.version].abbr})</div>
    <h2>${esc(tr(st.title))}</h2>
    <blockquote>${esc(tr(st.quote))}</blockquote>
    <p>${esc(tr(st.note))}</p>
    ${legs.length ? `<div class="facts"><span>${t('thisLeg')}</span> ${legs.join(' · ')}</div>` : ''}
    <div class="facts"><span>${t('soFar')}</span> ${km(st.s)}</div>
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
    ${finale ? `<div class="facts"><span>${t('wholeJourney')}</span> ${km(ROUTE_LEN)}</div>` : ''}
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
  if (st?.caption) caption.textContent = tr(st.caption);
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
  for (const l of lines) l.mat.resolution.set(innerWidth, innerHeight);
});
for (const l of lines) l.mat.resolution.set(innerWidth, innerHeight);

// ---------------------------------------------------------------- loop
setVersion(current.version);
showCard(INTRO, false);
setPlaying(false);

const clock = new THREE.Clock();
const noKeys = new Set();
let viewShift = 0;   // shifts the frame right so the popup doesn't cover the subject
let viewLift = 0;    // shifts the frame up on phones in the finale
// Weather: stops with `storm` (0..1) darken the sky and the sea, close in the
// haze, roughen the water and bring rain; tour.storm eases towards the stop's.
const rain = (() => {
  const N = 1400, pos = new Float32Array(N * 6), r = mulberry32(77);
  for (let i = 0; i < N; i++) {
    const x = r() * 2 - 1, y = r() * 2 - 1, z = r() * 2 - 1;
    pos.set([x, y, z, x + 0.012, y - 0.06, z], i * 6);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const lines = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: 0xd8e2ea, transparent: true, opacity: 0, depthWrite: false, fog: false }));
  lines.frustumCulled = false;
  lines.visible = false;
  scene.add(lines);
  return lines;
})();
const STORM = { sky: new THREE.Color('#6b747b'), sea: new THREE.Color('#1d3b4c'), water: water.material.color.clone() };
const _haze = new THREE.Color();
function weather(dt, d) {
  const inTour = tour.phase === 'hold' || (tour.phase === 'fly' && !tour.finale);
  const want = inTour && !tour.explore ? stops[tour.i]?.storm ?? 0 : tour.explore ? tour.storm : 0;
  tour.storm = lerp(tour.storm, want, 1 - Math.exp(-dt * 0.8));
  const k = tour.storm;
  sun.intensity = 2.6 * (1 - 0.75 * k);
  hemi.intensity = 1.1 * (1 - 0.4 * k);
  if (Math.abs(k - (scene.background.k ?? 0)) > 0.02) { scene.background.paint(k); scene.background.k = k; }
  scene.fog.color.copy(_haze.copy(HAZE).lerp(STORM.sky, k));
  scene.fog.near *= 1 - 0.85 * k;
  scene.fog.far *= 1 - 0.75 * k;
  water.material.color.copy(STORM.water).lerp(STORM.sea, k);
  water.material.normalScale.setScalar(0.18 + 0.5 * k);
  rain.visible = k > 0.05;
  if (rain.visible) {
    rain.material.opacity = 0.45 * k;
    rain.position.copy(camera.position);
    rain.scale.setScalar(Math.min(4, d * 0.25));
    const p = rain.geometry.attributes.position;
    for (let i = 0; i < p.count; i += 2) {
      let y = p.getY(i) - dt * 3;
      if (y < -1) y += 2;
      p.setY(i, y);
      p.setY(i + 1, y - 0.06);
    }
    p.needsUpdate = true;
  }
}

function frame(dt) {
  update(dt);
  showRoute(tour.phase === 'intro' ? 0 : tour.s);
  placeShip(tour.phase === 'intro' ? -99 : tour.s, dt, tour.time);
  const hp = routeAt(tour.s, {});
  head.position.set(hp.x, hp.y + 0.05, -hp.n);
  head.visible &&= tour.phase !== 'intro' && tour.phase !== 'finale' && !(fly && !fly.travel && tour.finale);
  waves.offset.x += dt * 0.004;
  waves.offset.y += dt * 0.0025;
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
    // Never below the ground.
    const g = Math.max(0, groundY(view.pos.x, -view.pos.z)) + 0.25;
    camera.position.copy(view.pos);
    if (camera.position.y < g) camera.position.y = g;
    camera.lookAt(view.look);
  }
  // The haze thickens with distance from what we're looking at.
  const d = camera.position.distanceTo(tour.explore ? controls.target : view.look);
  scene.fog.near = d * 1.1 + 30;
  scene.fog.far = d * 3.2 + 400;
  weather(dt, d);
  const inTour = tour.phase === 'hold' || (tour.phase === 'fly' && !tour.finale);
  updateLabels(inTour ? stops[tour.i]?.activeKeys ?? noKeys : noKeys);
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
  tour, stops, jump, next, view, route, marks, legRange, groundY, scene, water,
  advance(sec) { for (let t = 0; t < sec; t += 0.05) frame(0.05); },
  // Jump straight to stop i, arrived.
  show(i) {
    hideCard();
    fly = null;
    tour.i = i;
    tour.finale = false;
    tour.s = stops[i].s;
    view.pos.copy(stops[i].pos);
    view.look.copy(stops[i].look);
    arrive(i);
    updateProgress();
  },
  // Partway through the flight into stop i (u = 0..1).
  flying(i, u = 0.5) {
    hideCard();
    tour.i = i - 1;
    tour.detached = false;
    if (i > 0) { view.pos.copy(stops[i - 1].pos); view.look.copy(stops[i - 1].look); tour.s = stops[i - 1].s; }
    setPlaying(true);
    startFly(i);
    stepFly(fly.dur * u);
    setPlaying(false);
  },
};
requestAnimationFrame(() => requestAnimationFrame(() => { window.__ready = true; }));
}
