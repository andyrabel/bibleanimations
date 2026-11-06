import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ground, noise2, valleyDist, VALLEYS, addPad } from './terrain.js';
import * as DATA from './data.js';
import {
  VERSIONS, current, chooseVersion, setVersion as useVersion, remember, pick, t,
  localizeDOM, fillVersionSelect, noticeHTML, feedbackHTML, loadLanguages,
} from '../i18n.js';
import { createNarrator, titleLine, verseLine } from '../narrator.js';
import { track } from '../analytics.js';
import { openShare } from '../share.js';

const { PLATFORM, WALLS, GATES, SITES, TERMS, DAYS, LABELS, STOPS, INTRO, FINALE } = DATA;
await loadLanguages(DATA, import.meta.url);

// ---------------------------------------------------------------- constants
// One world unit is a metre. People are built in cubits, as in the other
// animations, and scaled down by FIG.
const FIG = 0.5;             // metres per figure unit: a man stands about 1.7 m
const COURT_Y = PLATFORM.y;  // the temple court
const TERRACE_Y = COURT_Y + 3;   // the terrace round the inner courts, and the Court of the Women
const INNER_Y = COURT_Y + 6;     // the Court of Israel and of the priests
const HOLY_Y = INNER_Y + 3;      // the sanctuary's floor
const OVERVIEW_C = new THREE.Vector3(-150, 140, 60);
const FINALE_C = new THREE.Vector3(-300, 150, 0);
const HOLD_SCALE = 0.5;      // default pause at each stop, relative to the reading-time estimate
const SOUTH_EAST = 0.75;     // overview angle: from the south-east
const DEPTH = 0.68;          // bodies and garments are lathes, squashed front to back by this much
const WALK_UNIT = 40;        // metres of walking that take as long as one step of a scene
const SEC_PER_UNIT = 1.1;
const FOLLOW = { x: 14, n: -22, y: 12 };   // the camera's offset from someone walking
const ROW_GAP = 1.5;         // metres between ranks of people walking together

// ---------------------------------------------------------------- helpers
function mulberry32(a) {
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(33);
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
// Steady speed with a short start and stop (`a` of the time at each end).
function walkEase(t, a = 0.08) {
  if (t < a) return (t * t) / (2 * a * (1 - a));
  if (t > 1 - a) return 1 - ((1 - t) * (1 - t)) / (2 * a * (1 - a));
  return (t - a / 2) / (1 - a);
}
const v3 = (x, n, y) => new THREE.Vector3(x, y, -n);
const P = (x, n) => ({ x, n });
// A plan point on the ground (or `lift` metres above it).
const onGround = (p, lift = 0) => new THREE.Vector3(p.x, (p.y ?? ground(p.x, p.n)) + lift, -p.n);
const yawTo = (a, b) => Math.atan2(b.n - a.n, b.x - a.x);
const lerpAngle = (a, b, k) => a + Math.atan2(Math.sin(b - a), Math.cos(b - a)) * k;
// Distance in plan from (x, n) to a polyline of plan points.
function distToPath(x, n, pts) {
  let best = Infinity;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i];
    const dx = b.x - a.x, dn = b.n - a.n;
    const k = clamp01(((x - a.x) * dx + (n - a.n) * dn) / (dx * dx + dn * dn || 1));
    best = Math.min(best, Math.hypot(x - a.x - dx * k, n - a.n - dn * k));
  }
  return best;
}
function inPoly(x, n, poly) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, ni] = poly[i], [xj, nj] = poly[j];
    if (ni > n !== nj > n && x < ((xj - xi) * (n - ni)) / (nj - ni) + xi) c = !c;
  }
  return c;
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
scene.fog = new THREE.Fog(0xe6dcc8, 1400, 5200);
// A soft environment so the gold reads as metal.
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.5;

const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 16000);

// ---------------------------------------------------------------- sky & time of day
// The hour moves the sun (and, at night, the full moon of Passover) across the
// sky; the sky, the light and the fog follow it. `dark` is the darkness over
// the land from the sixth hour to the ninth (Mark 15:33).
const hemi = new THREE.HemisphereLight(0xdfeaff, 0xb39b70, 1.4);
scene.add(hemi);
const key = new THREE.DirectionalLight(0xfff0d4, 2.7);
key.castShadow = true;
key.shadow.mapSize.set(4096, 4096);
key.shadow.bias = -0.0003;
key.shadow.normalBias = 0.05;
scene.add(key, key.target);

const skyMat = new THREE.ShaderMaterial({
  side: THREE.BackSide, depthWrite: false, fog: false,
  uniforms: {
    top: { value: new THREE.Color() }, horizon: { value: new THREE.Color() }, below: { value: new THREE.Color() },
    sunDir: { value: new THREE.Vector3() }, glow: { value: new THREE.Color() },
  },
  vertexShader: 'varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: `uniform vec3 top, horizon, below, sunDir, glow; varying vec3 vDir;
    void main() {
      float h = vDir.y;
      vec3 c = h > 0.0 ? mix(horizon, top, pow(clamp(h, 0.0, 1.0), 0.55)) : mix(horizon, below, clamp(-h * 6.0, 0.0, 1.0));
      float s = max(dot(vDir, sunDir), 0.0);
      c += glow * (pow(s, 6.0) * 0.45 + pow(s, 600.0) * 2.0);
      gl_FragColor = vec4(c, 1.0);
    }`,
});
const sky = new THREE.Mesh(new THREE.SphereGeometry(12000, 32, 16), skyMat);
sky.renderOrder = -2;
scene.add(sky);
// Stars, and the moon.
const stars = (() => {
  const r = mulberry32(7), pos = [];
  for (let i = 0; i < 1600; i++) {
    const a = r() * Math.PI * 2, y = r() ** 0.7;
    const s = Math.sqrt(1 - y * y);
    pos.push(Math.cos(a) * s * 11000, y * 11000, Math.sin(a) * s * 11000);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  const m = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 1.6, sizeAttenuation: false, transparent: true, opacity: 0, fog: false, depthWrite: false }));
  m.renderOrder = -1;
  scene.add(m);
  return m;
})();
const moon = new THREE.Mesh(new THREE.SphereGeometry(150, 24, 16), new THREE.MeshBasicMaterial({ color: 0xf4f0e2, fog: false, transparent: true, opacity: 0 }));
moon.renderOrder = -1;
scene.add(moon);

const SKY = {
  day: { top: new THREE.Color('#4a8bd4'), horizon: new THREE.Color('#d3e2ec'), below: new THREE.Color('#e9dcc2') },
  dusk: { top: new THREE.Color('#3d5590'), horizon: new THREE.Color('#f2a868'), below: new THREE.Color('#8c6a50') },
  night: { top: new THREE.Color('#050a1c'), horizon: new THREE.Color('#1a2442'), below: new THREE.Color('#10141f') },
  dark: { top: new THREE.Color('#2c2a2e'), horizon: new THREE.Color('#4d463e'), below: new THREE.Color('#2f2a25') },
};
const SUN_WARM = new THREE.Color('#ffb46a'), SUN_DAY = new THREE.Color('#fff0d4'), MOON_C = new THREE.Color('#9fb4e0');
const sunDir = new THREE.Vector3(), moonDir = new THREE.Vector3();
const _c1 = new THREE.Color(), _c2 = new THREE.Color();
const light = { day: 1, night: 0 };
// hour: 0-24 (it may run on past 24); dark: 0-1.
function setTime(hour, dark = 0) {
  const a = ((hour - 6) / 12) * Math.PI;
  // The sun crosses the southern sky (south is +Z); the full moon is opposite it.
  sunDir.set(Math.cos(a), Math.sin(a) * 0.85, Math.sin(a) * 0.53).normalize();
  moonDir.set(-Math.cos(a), -Math.sin(a) * 0.85, -Math.sin(a) * 0.53).normalize();
  const alt = sunDir.y;
  const day = smooth(clamp01((alt + 0.08) / 0.3));
  const dusk = Math.exp(-(((alt - 0.04) / 0.13) ** 2));
  light.day = day * (1 - dark * 0.85);
  light.night = 1 - day;
  for (const k of ['top', 'horizon', 'below']) {
    _c1.copy(SKY.night[k]).lerp(SKY.day[k], day).lerp(SKY.dusk[k], dusk * 0.85);
    _c1.lerp(SKY.dark[k], dark * 0.85);
    skyMat.uniforms[k].value.copy(_c1);
  }
  skyMat.uniforms.sunDir.value.copy(day > 0.02 ? sunDir : moonDir);
  skyMat.uniforms.glow.value.copy(day > 0.02 ? SUN_WARM : MOON_C).multiplyScalar(day > 0.02 ? (0.25 + dusk * 0.6) * (1 - dark) : 0.15);
  scene.fog.color.copy(skyMat.uniforms.horizon.value).lerp(skyMat.uniforms.below.value, 0.25);
  const useSun = alt > -0.04;
  key.color.copy(useSun ? _c2.copy(SUN_DAY).lerp(SUN_WARM, dusk) : MOON_C);
  key.intensity = useSun ? 2.5 * smooth(clamp01((alt + 0.04) / 0.2)) * (1 - dark * 0.92) : 0.95 * smooth(clamp01((moonDir.y - 0.02) / 0.2));
  key.userData.dir = useSun ? sunDir : moonDir;
  hemi.intensity = lerp(0.45, 1.15, day) * (1 - dark * 0.7);
  hemi.color.copy(_c1.set('#304066')).lerp(_c2.set('#dfeaff'), day);
  hemi.groundColor.copy(_c1.set('#202020')).lerp(_c2.set('#b39b70'), day);
  stars.material.opacity = clamp01(1 - day * 1.6) * 0.9;
  moon.material.opacity = clamp01((moonDir.y + 0.05) * 8) * (1 - day * 0.7);
  moon.visible = moon.material.opacity > 0.01;
  scene.environmentIntensity = lerp(0.12, 0.5, day);
  renderer.toneMappingExposure = lerp(1.3, 0.92, day);
}
// The shadows follow what the camera looks at, sized to the view.
function placeLight(look, dist) {
  const ext = Math.min(1600, Math.max(30, dist * 1.1));
  const dir = key.userData.dir ?? sunDir;
  key.target.position.copy(look);
  key.position.copy(look).addScaledVector(dir, ext * 2 + 400);
  const cam = key.shadow.camera;
  if (Math.abs(cam.right - ext) > ext * 0.05) {
    Object.assign(cam, { left: -ext, right: ext, top: ext, bottom: -ext, near: 10, far: ext * 4 + 800 });
    cam.updateProjectionMatrix();
  }
  moon.position.copy(camera.position).addScaledVector(moonDir, 9000);
  sky.position.copy(camera.position);
  stars.position.copy(camera.position);
}

// ---------------------------------------------------------------- materials
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
function weave(g, s, base, r = rand) {
  g.fillStyle = base;
  g.fillRect(0, 0, s, s);
  for (let i = 0; i < s; i += 2) {
    g.fillStyle = `rgba(110,90,60,${0.03 + r() * 0.05})`;
    g.fillRect(0, i, s, 1);
    g.fillStyle = `rgba(255,255,255,${0.03 + r() * 0.05})`;
    g.fillRect(i, 0, 1, s);
  }
}
// Herodian ashlar: one tile is 4 m by 2 m, two courses with drafted margins.
function ashlar(base, hue) {
  return canvasTexture(512, (g) => {
    g.fillStyle = base;
    g.fillRect(0, 0, 512, 256);
    for (let r = 0; r < 2; r++) {
      for (let k = -1; k < 3; k++) {
        const x0 = k * 256 + (r ? 128 : 0) + (rand() - 0.5) * 30, y0 = r * 128;
        const l = 80 + rand() * 9;
        g.fillStyle = `hsl(${hue + rand() * 6}, ${24 + rand() * 12}%, ${l}%)`;
        g.fillRect(x0 + 3, y0 + 3, 250, 122);
        g.fillStyle = 'rgba(255,255,255,0.16)';
        g.fillRect(x0 + 15, y0 + 14, 226, 98);
        for (let i = 0; i < 40; i++) {
          g.fillStyle = `rgba(120,100,70,${0.06 + rand() * 0.1})`;
          g.fillRect(x0 + 6 + rand() * 240, y0 + 6 + rand() * 116, 2 + rand() * 4, 2 + rand() * 3);
        }
      }
    }
  }, 256);
}
// Paving: one tile is 4 m square.
const paving = canvasTexture(256, (g, s) => {
  g.fillStyle = '#d6c7a2';
  g.fillRect(0, 0, s, s);
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      g.fillStyle = `hsl(${40 + rand() * 6}, ${22 + rand() * 10}%, ${76 + rand() * 9}%)`;
      g.fillRect(x * 64 + 1 + (y % 2) * 32, y * 64 + 1, 62, 62);
      g.fillRect(x * 64 + 1 + (y % 2) * 32 - 256, y * 64 + 1, 62, 62);
    }
  }
});
const MAT = {
  stone: new THREE.MeshStandardMaterial({ map: ashlar('#b9a57c', 40), roughness: 0.95 }),
  white: new THREE.MeshStandardMaterial({ map: ashlar('#d8d3c6', 44), roughness: 0.6 }),
  paving: new THREE.MeshStandardMaterial({ map: paving, roughness: 0.95 }),
  plain: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95 }),
  plaster: new THREE.MeshStandardMaterial({ color: 0xe8dcc0, roughness: 1 }),
  rock: new THREE.MeshStandardMaterial({ color: 0xcdbb92, roughness: 1, flatShading: true }),
  wood: new THREE.MeshStandardMaterial({ color: 0x7d5130, roughness: 0.8 }),
  darkWood: new THREE.MeshStandardMaterial({ color: 0x4a2f1a, roughness: 0.85 }),
  roof: new THREE.MeshStandardMaterial({ color: 0xb98f5c, roughness: 0.9 }),
  tiles: new THREE.MeshStandardMaterial({ color: 0x9a5a36, roughness: 0.85 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x18120c, roughness: 1 }),
  gold: new THREE.MeshStandardMaterial({ color: 0xe0ad3c, metalness: 0.85, roughness: 0.3 }),
  bronze: new THREE.MeshStandardMaterial({ color: 0xb5773d, metalness: 0.8, roughness: 0.38 }),
  silver: new THREE.MeshStandardMaterial({ color: 0xdcdce2, metalness: 0.85, roughness: 0.28 }),
  water: new THREE.MeshStandardMaterial({ color: 0x3f8fb0, roughness: 0.12, metalness: 0.1, emissive: 0x0b2a3a }),
  trunk: new THREE.MeshStandardMaterial({ color: 0x6b5238, roughness: 1 }),
  leaf: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, flatShading: true }),
  // Flames shade by height (vertex colours): a pale core inside an orange tongue.
  flame: new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.88, depthWrite: false, toneMapped: false, side: THREE.DoubleSide }),
  flameCore: new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false }),
  embers: new THREE.MeshStandardMaterial({ color: 0x2a1408, emissive: 0xff5a14, emissiveIntensity: 1.2, roughness: 1 }),
};
// Buildings that are cut away for the scenes inside them have their own materials.
MAT.cutWall = MAT.plaster.clone();
MAT.cutRoof = MAT.roof.clone();
MAT.cutRock = MAT.rock.clone();
const CUT_MATS = [MAT.cutWall, MAT.cutRoof, MAT.cutRock];
const cutMeshes = [];

// Box with its base at y = 0. With `tile`, UVs repeat the texture every `tile`
// units across and `tileV` up (the ashlar tile is 4 m by 2 m).
function box(w, h, d, tile, tileV = tile) {
  const geo = new THREE.BoxGeometry(w, h, d);
  if (tile) {
    const uv = geo.attributes.uv;
    for (let f = 0; f < 6; f++) {
      const [du, dv] = f < 2 ? [d, h] : f < 4 ? [w, d] : [w, h];
      for (let k = 0; k < 4; k++) {
        const i = f * 4 + k;
        uv.setXY(i, (uv.getX(i) * du) / tile, (uv.getY(i) * dv) / tileV);
      }
    }
  }
  return geo.translate(0, h / 2, 0);
}
const stoneBox = (w, h, d) => box(w, h, d, 4, 2);
// A ramp w wide, rising to h over d, high end at z = 0, running down towards +Z.
function wedge(w, h, d) {
  const s = new THREE.Shape([new THREE.Vector2(0, 0), new THREE.Vector2(d, 0), new THREE.Vector2(0, h)]);
  return new THREE.ExtrudeGeometry(s, { depth: w, bevelEnabled: false }).rotateY(-Math.PI / 2).translate(w / 2, 0, 0);
}
function add(parent, geo, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = m.receiveShadow = true;
  parent.add(m);
  return m;
}
// A group at plan position (x, n), base height y, local +X east, +Z south,
// turned by `yaw` (anticlockwise from east, seen from above).
function placed(x, n, y = 0, yaw = 0) {
  const g = new THREE.Group();
  g.position.set(x, y, -n);
  g.rotation.y = yaw;
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
// A unit rod along +Y, stretched between two points each frame (a stream of oil).
function stretch(m, a, b) {
  const d = _tmp.copy(b).sub(a);
  const len = d.length();
  m.position.copy(a);
  m.quaternion.setFromUnitVectors(UP, d.divideScalar(len || 1));
  m.scale.set(1, len, 1);
}
const _tmp = new THREE.Vector3(), _tmp2 = new THREE.Vector3();

// Displaces a geometry's vertices along their direction from `c` by a little
// bumpy noise, for hair, beards, rock and wool.
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
// The lowest and highest ground under a footprint w x d centred on (x, n), turned by yaw.
function footprint(x, n, w, d, yaw = 0) {
  const c = Math.cos(yaw), s = Math.sin(yaw);
  let lo = Infinity, hi = -Infinity;
  for (const u of [-w / 2, 0, w / 2]) for (const v of [-d / 2, 0, d / 2]) {
    // local +X = (c, s) in plan, local +Z = (s, -c) (south when yaw = 0)
    const g = ground(x + u * c + v * s, n + u * s - v * c);
    lo = Math.min(lo, g);
    hi = Math.max(hi, g);
  }
  return { lo, hi };
}
// A stretch of wall from plan a to b, `thick` deep, standing from below the
// ground to `top` (a function of plan position) in pieces of at most `step` metres.
function wallRun(a, b, thick, top, mat, step = 10, out = 0) {
  const len = Math.hypot(b.x - a.x, b.n - a.n);
  const k = Math.max(1, Math.ceil(len / step)), yaw = Math.atan2(b.n - a.n, b.x - a.x);
  const tx = (b.x - a.x) / len, tn = (b.n - a.n) / len;
  for (let i = 0; i < k; i++) {
    const u = (i + 0.5) / k;
    const x = lerp(a.x, b.x, u) + tn * out, n = lerp(a.n, b.n, u) - tx * out;
    const { lo } = footprint(x, n, len / k, thick, yaw);
    const y = top(x, n);
    if (y - lo < 0.2) continue;
    const G = placed(x, n, lo - 1, yaw);
    add(G, stoneBox(len / k + 0.06, y - lo + 1, thick), mat);
  }
}

// ---------------------------------------------------------------- routes
// The ways the walks follow (plan points), made here so that houses and trees
// keep clear of them.
const ROUTES = {
  // Bethany to Bethphage and over the Mount of Olives to the temple's east gate.
  bethany: [P(2300, -575), P(2120, -420), P(1950, -230), P(1800, -60), P(1700, 40), P(1600, 160), P(1520, 235)],
  ride1: [P(1500, 238), P(1380, 230), P(1240, 205), P(1100, 170), P(980, 140), P(880, 110), P(780, 85), P(700, 62)],
  ride2: [P(660, 50), P(600, 30), P(540, 20), P(470, 30), P(410, 50), P(350, 40), P(300, 25), P(250, 12), P(215, 4), P(182, 0), P(160, 0), P(140, 0), P(128, -8), P(118, -22)],
};

// ---------------------------------------------------------------- terrain
// Level pads under the places built on the slopes.
for (const [k, r] of [['herodsPalace', 140], ['pavement', 40], ['hasmonean', 30], ['upperRoom', 18], ['caiaphas', 26], ['siloam', 40], ['bethesda', 40], ['simon', 22]]) {
  addPad(SITES[k].x, SITES[k].n, r);
}
const ROADS = Object.values(ROUTES);
{
  const X0 = -1400, X1 = 2900, N0 = -1750, N1 = 1300, CELL = 10;
  const geo = new THREE.PlaneGeometry(X1 - X0, N1 - N0, (X1 - X0) / CELL, (N1 - N0) / CELL);
  geo.rotateX(-Math.PI / 2);
  geo.translate((X0 + X1) / 2, 0, -(N0 + N1) / 2);
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) p.setY(i, ground(p.getX(i), -p.getZ(i)));
  const g2 = geo.toNonIndexed();
  g2.computeVertexNormals();
  const pos = g2.attributes.position, nor = g2.attributes.normal;
  const col = new Float32Array(pos.count * 3);
  const C = {
    scrub: new THREE.Color('#a3a26a'), grass: new THREE.Color('#84a055'), rock: new THREE.Color('#d2c29a'),
    dirt: new THREE.Color('#cdb68e'), terra: new THREE.Color('#b47850'), road: new THREE.Color('#ddcca6'),
  };
  const city = [WALLS.first.concat([[PLATFORM.pts[0][0], PLATFORM.pts[0][1]]]), WALLS.second.concat([[-150, 186], [-134, -40]])];
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i += 3) {
    const x = (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3;
    const n = -(pos.getZ(i) + pos.getZ(i + 1) + pos.getZ(i + 2)) / 3;
    const h = (pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3;
    const slope = 1 - nor.getY(i);
    const nz = noise2(x / 35, n / 35);
    c.copy(C.scrub).lerp(C.grass, clamp01((110 - h) / 60) * 0.6);
    c.lerp(C.rock, clamp01((slope - 0.07) / 0.18 + (nz - 0.5) * 0.7));
    // Patches of red terra rossa soil on the gentler slopes.
    c.lerp(C.terra, clamp01((noise2(x / 110, n / 110) - 0.5) * 3.5) * clamp01(1 - slope / 0.2) * 0.45);
    if (city.some((poly) => inPoly(x, n, poly))) c.lerp(C.dirt, 0.75);
    for (const r of ROADS) {
      const d = distToPath(x, n, r);
      if (d < 7) c.lerp(C.road, 0.75 * clamp01((7 - d) / 3));
    }
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

// ---------------------------------------------------------------- the temple
// Herod's temple (begun 20/19 BC), after Josephus (Antiquities 15.11, War 5.5)
// and the Mishnah (Middot): the great platform with porticoes round it, the
// Royal Stoa along the south, the terrace and the inner courts, the sanctuary
// facing east, and the altar. Sizes are in metres, at about half a metre to
// the cubit, and simplified.
const PP = PLATFORM.pts.map(([x, n]) => P(x, n));
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
// Puffs rise from `origin` while `amount()` is above zero.
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
// Columns, all one instanced mesh: [x, n, base y, height, radius].
const columns = [];
function colonnade(a, b, inward, y, h, r = 0.7, gap = 5.5, skip = () => false) {
  const len = Math.hypot(b.x - a.x, b.n - a.n), tx = (b.x - a.x) / len, tn = (b.n - a.n) / len;
  const k = Math.round(len / gap);
  for (let i = 0; i <= k; i++) {
    const x = a.x + tx * (len * i) / k - tn * inward, n = a.n + tn * (len * i) / k + tx * inward;
    if (!skip(x, n)) columns.push([x, n, y, h, r]);
  }
}
function buildColumns() {
  const geo = lathe([[0.001, 0], [1.25, 0], [1.25, 0.03], [1, 0.05], [1, 0.95], [1.2, 0.97], [1.2, 1], [0.001, 1]], 14);
  const mesh = new THREE.InstancedMesh(geo, MAT.white, columns.length);
  const m = new THREE.Matrix4(), p = new THREE.Vector3(), s = new THREE.Vector3(), q = new THREE.Quaternion();
  columns.forEach(([x, n, y, h, r], i) => mesh.setMatrixAt(i, m.compose(p.set(x, y, -n), q, s.set(r, h, r))));
  mesh.castShadow = mesh.receiveShadow = true;
  scene.add(mesh);
}
// A flat roof over a strip from a to b, between `from` and `to` metres inside it.
function strip(a, b, from, to, y, th, mat) {
  const len = Math.hypot(b.x - a.x, b.n - a.n), tx = (b.x - a.x) / len, tn = (b.n - a.n) / len;
  const mid = (from + to) / 2;
  const G = placed((a.x + b.x) / 2 - tn * mid, (a.n + b.n) / 2 + tx * mid, y, Math.atan2(tn, tx));
  add(G, box(len, th, to - from), mat);
  return G;
}
const PORTICO = 15, PORTICO_H = 12.5, STOA = 32;
const gateAt = (x, n, w) => Object.values(GATES).some((g) => g.wall === 'platform' && Math.abs(g.n - n) < w && Math.abs(g.x - x) < 25);
{
  // The retaining walls, rising above the court as the back walls of the porticoes.
  PP.forEach((a, i) => {
    const b = PP[(i + 1) % PP.length];
    const south = i === 0;
    const len = Math.hypot(b.x - a.x, b.n - a.n), k = Math.ceil(len / 8);
    const tx = (b.x - a.x) / len, tn = (b.n - a.n) / len, yaw = Math.atan2(tn, tx);
    for (let j = 0; j < k; j++) {
      const u = (j + 0.5) / k;
      // The wall's outer face is on the edge; it is 5 m thick, inward.
      const x = lerp(a.x, b.x, u) - tn * 2.5, n = lerp(a.n, b.n, u) + tx * 2.5;
      const top = COURT_Y + (south ? 26 : PORTICO_H + 1.2);
      const { lo } = footprint(x, n, len / k, 5, yaw);
      const G = placed(x, n, lo - 1, yaw);
      if (gateAt(x, n, 5)) {
        add(G, stoneBox(len / k + 0.05, top - COURT_Y - 8, 5), MAT.stone, 0, COURT_Y + 8 - lo + 1, 0);
        add(G, stoneBox(len / k + 0.05, COURT_Y - lo + 1, 5), MAT.stone);
        continue;
      }
      add(G, stoneBox(len / k + 0.05, top - lo + 1, 5), MAT.stone);
    }
  });
  // The court, paved.
  const shape = new THREE.Shape(PP.map((p) => new THREE.Vector2(p.x, p.n)));
  const court = new THREE.Mesh(new THREE.ShapeGeometry(shape).rotateX(-Math.PI / 2), MAT.paving);
  court.geometry.attributes.uv.array.forEach((v, i, a) => { a[i] = v / 4; });
  court.position.y = COURT_Y;
  court.receiveShadow = true;
  scene.add(court);

  // Porticoes on the west, north and east (Solomon's Portico, John 10:23): two
  // rows of columns and a cedar roof (War 5.5.2).
  for (const i of [1, 2, 3]) {
    const a = PP[i], b = PP[(i + 1) % 4];
    colonnade(a, b, 7.5, COURT_Y, PORTICO_H - 0.6, 0.6, 5.5, (x, n) => gateAt(x, n, 4));
    colonnade(a, b, PORTICO, COURT_Y, PORTICO_H - 0.6, 0.6, 5.5, (x, n) => gateAt(x, n, 4));
    strip(a, b, 0, PORTICO + 1, COURT_Y + PORTICO_H - 0.6, 1, MAT.roof);
  }
  // The Royal Stoa on the south: four rows of columns, the middle aisle higher
  // (Antiquities 15.11.5). Its market is where the tables were overturned.
  {
    const a = PP[0], b = PP[1];
    for (const [inward, h] of [[8, 14], [16, 26], [24, 26], [STOA, 14]]) colonnade(a, b, inward, COURT_Y, h, 0.8, 6);
    strip(a, b, 0, 16, COURT_Y + 14, 1, MAT.roof);
    strip(a, b, 24, STOA + 1, COURT_Y + 14, 1, MAT.roof);
    strip(a, b, 15.4, 24.6, COURT_Y + 26, 1.2, MAT.roof);
    for (const w of [16, 24]) {
      const S = strip(a, b, w - 0.5, w + 0.5, COURT_Y + 15, 11, MAT.white);
      S.children[0].material = MAT.white;
    }
  }
  // The east gate (Shushan Gate, Middot 1:3), facing the sanctuary, with steps
  // up to it from the Kidron (the steps are a guess).
  {
    const g = GATES.east;
    const G = placed(g.x + 1, g.n, COURT_Y);
    for (const s of [-1, 1]) add(G, stoneBox(9, 15, 4), MAT.stone, -2, 0, s * 5.5);
    add(G, stoneBox(9, 3, 15), MAT.stone, -2, 11, 0);
    add(G, box(9.5, 0.3, 7.2), MAT.paving, -2, -0.3, 0);
    const from = P(212, 2), to = P(g.x + 6, 0);
    const k = 26, y0 = ground(from.x, from.n);
    for (let i = 0; i < k; i++) {
      const u = (i + 0.5) / k;
      const x = lerp(from.x, to.x, u), n = lerp(from.n, to.n, u);
      const y = lerp(y0, COURT_Y - 0.1, (i + 1) / k);
      const { lo } = footprint(x, n, 2, 8);
      add(placed(x, n, lo - 1), stoneBox((to.x - from.x) / -k + 0.05, y - lo + 1, 8), MAT.stone);
    }
  }
  // The Huldah Gates in the south wall, with the steps below them.
  for (const x of [-38, 62]) {
    const G = placed(x, -300, COURT_Y - 12);
    add(G, box(x < 0 ? 12 : 16, 5, 0.6), MAT.dark, 0, 0, 0.1);
    const y = ground(x, -318);
    const S = placed(x, -315, y - 2);
    add(S, stoneBox(40, COURT_Y - 12 - y + 2, 22), MAT.stone);
  }
}

// The Antonia fortress at the north-west corner, with four towers, the
// south-east one the tallest (War 5.5.8).
{
  const { x, n } = SITES.antonia;
  const W = 120, D = 46;
  const { lo } = footprint(x, n, W, D);
  const G = placed(x, n, lo - 1);
  const base = COURT_Y + 26 - lo + 1;
  add(G, stoneBox(W, base, D), MAT.stone);
  for (const [sx, sz, h, s] of [[-1, -1, 12, 12], [1, -1, 12, 12], [-1, 1, 12, 12], [1, 1, 24, 14]]) {
    add(G, stoneBox(s, base + h, s), MAT.stone, sx * (W / 2 - s / 2), 0, sz * (D / 2 - s / 2));
    add(G, box(s + 0.6, 0.6, s + 0.6), MAT.roof, sx * (W / 2 - s / 2), base + h, sz * (D / 2 - s / 2));
  }
  add(G, box(W - 2, 0.5, D - 2), MAT.roof, 0, base, 0);
}

// The inner courts: the terrace with the balustrade (the soreg) round it, the
// Court of the Women, the Nicanor Gate up fifteen steps, the Court of Israel
// and of the priests, the altar and the sanctuary.
const INNER = { x0: -46, x1: 128, n: 42, nicanor: 62 };
const ALTAR = { x: 40, n: 0, s: 16, h: 7.5 };
const SANCT = { back: -32, porch: 14, front: 21, body: 18, wide: 26, h: 46, porchH: 52 };
// The treasury chests in the Court of the Women (Mishnah Shekalim 6:5): thirteen, against its walls.
const CHESTS = [];
for (let i = 0; i < 13; i++) {
  const north = i < 7, k = north ? i : i - 7;
  CHESTS.push(P(72 + k * 8 + (north ? 0 : 4), north ? INNER.n - 2.2 : -INNER.n + 2.2));
}
{
  const T = placed(0, 0, 0);
  add(T, box(INNER.x1 - INNER.x0 + 24, 3, INNER.n * 2 + 24), MAT.paving, (INNER.x0 + INNER.x1) / 2, COURT_Y, 0);
  // The balustrade, three cubits high, round the terrace.
  const sx0 = INNER.x0 - 16, sx1 = INNER.x1 + 16, sn = INNER.n + 16;
  for (const [a, b] of [[P(sx0, -sn), P(sx1, -sn)], [P(sx1, -sn), P(sx1, sn)], [P(sx1, sn), P(sx0, sn)], [P(sx0, sn), P(sx0, -sn)]]) {
    const len = Math.hypot(b.x - a.x, b.n - a.n), yaw = Math.atan2(b.n - a.n, b.x - a.x);
    for (let u = 0; u < len; u += 12) {
      const k = Math.min(10, len - u);
      if (k <= 1) continue;
      const tx = Math.cos(yaw), tn = Math.sin(yaw);
      add(placed(a.x + tx * (u + k / 2), a.n + tn * (u + k / 2), COURT_Y, yaw), box(k, 1.5, 0.4), MAT.white);
    }
  }
  // The walls of the inner courts, with gates.
  const H = 18, th = 2.5;
  const wall = (a, b, y0, top, gaps = []) => {
    const len = Math.hypot(b.x - a.x, b.n - a.n), yaw = Math.atan2(b.n - a.n, b.x - a.x);
    const tx = (b.x - a.x) / len, tn = (b.n - a.n) / len;
    let u = 0;
    for (const [g, w] of [...gaps, [len + 100, 0]]) {
      const e = Math.min(len, g - w / 2);
      if (e - u > 0.1) add(placed(a.x + tx * (u + e) / 2, a.n + tn * (u + e) / 2, y0, yaw), stoneBox(e - u, top - y0, th), MAT.white);
      if (g < len) {
        add(placed(a.x + tx * g, a.n + tn * g, y0 + 9, yaw), stoneBox(w, top - y0 - 9, th), MAT.white);
        add(placed(a.x + tx * g, a.n + tn * g, y0 + 9, yaw), box(w - 1, 0.6, th + 0.3), MAT.gold);
      }
      u = g + w / 2;
    }
  };
  const { x0, x1, n, nicanor } = INNER;
  const top = TERRACE_Y + H;
  wall(P(x0, -n), P(x1, -n), TERRACE_Y, top, [[x1 - x0 - 33, 7], [20, 6], [50, 6], [80, 6]]);
  wall(P(x1, n), P(x0, n), TERRACE_Y, top, [[33, 7], [x1 - x0 - 20, 6], [x1 - x0 - 50, 6], [x1 - x0 - 80, 6]]);
  wall(P(x0, n), P(x0, -n), TERRACE_Y, top);
  wall(P(x1, -n), P(x1, n), TERRACE_Y, top, [[n, 8]]);           // the Beautiful Gate (Acts 3:2)
  wall(P(nicanor, -n), P(nicanor, n), INNER_Y, top + 4, [[n, 8]]);  // the Nicanor Gate
  // The Court of Israel and of the priests, raised above the Court of the Women,
  // and the fifteen steps up to the Nicanor Gate (Middot 2:5).
  add(T, box(nicanor - x0, INNER_Y - TERRACE_Y, n * 2), MAT.paving, (x0 + nicanor) / 2, TERRACE_Y, 0);
  for (let k = 0; k < 6; k++) add(T, box(1, (INNER_Y - TERRACE_Y) * (6 - k) / 6, 14 - k * 0.8), MAT.white, nicanor + 0.5 + k, TERRACE_Y, 0);
  // Colonnades inside the Court of the Women, and the chests of the treasury.
  for (const s of [-1, 1]) colonnade(P(nicanor + 4, s * (n - 5)), P(x1 - 4, s * (n - 5)), 0, TERRACE_Y, 9, 0.45, 5);
  for (const c of CHESTS) {
    const G = placed(c.x, c.n, TERRACE_Y);
    add(G, box(1, 1.1, 0.9), MAT.darkWood);
    const horn = add(G, new THREE.CylinderGeometry(0.12, 0.38, 0.9, 12, 1, true), MAT.bronze, 0, 1.5, 0);
    horn.material = MAT.bronze.clone();
    horn.material.side = THREE.DoubleSide;
  }

  // The sanctuary: white stone and gold, wider in front (the porch) than behind
  // (War 5.5.4-6; Middot 4), on a base of twelve steps, its doorway open with
  // the embroidered curtain hanging in it.
  const S = placed(0, 0, INNER_Y);
  add(S, stoneBox(SANCT.front - SANCT.back + 6, HOLY_Y - INNER_Y, SANCT.wide * 2 + 4), MAT.white, (SANCT.front + SANCT.back) / 2 + 1, 0, 0);
  const hy = HOLY_Y - INNER_Y;
  add(S, stoneBox(SANCT.porch - SANCT.back, SANCT.h, SANCT.body * 2), MAT.white, (SANCT.porch + SANCT.back) / 2, hy, 0);
  add(S, stoneBox(SANCT.front - SANCT.porch, SANCT.porchH, SANCT.wide * 2), MAT.white, (SANCT.front + SANCT.porch) / 2, hy, 0);
  add(S, box(SANCT.front - SANCT.porch + 0.4, 1, SANCT.wide * 2 + 0.4), MAT.gold, (SANCT.front + SANCT.porch) / 2, hy + SANCT.porchH, 0);
  add(S, box(SANCT.porch - SANCT.back + 0.4, 1, SANCT.body * 2 + 0.4), MAT.gold, (SANCT.porch + SANCT.back) / 2, hy + SANCT.h, 0);
  add(S, box(0.3, 21, 10), MAT.dark, SANCT.front + 0.02, hy, 0);
  add(S, box(0.4, 1.2, 14), MAT.gold, SANCT.front + 0.1, hy + 21.5, 0);
  // Gold spikes along the roof, to keep the birds off (War 5.5.6).
  for (let z = -SANCT.wide + 1; z <= SANCT.wide - 1; z += 2.5) add(S, new THREE.ConeGeometry(0.15, 1.4, 6).translate(0, 0.7, 0), MAT.gold, SANCT.front - 0.6, hy + SANCT.porchH + 1, z);
  // The doorway curtain: blue, scarlet, linen and purple (War 5.5.4).
  const veil = canvasTexture(256, (g, s) => {
    const grad = g.createLinearGradient(0, 0, 0, s);
    grad.addColorStop(0, '#2f3a8a'); grad.addColorStop(0.35, '#a8242c'); grad.addColorStop(0.65, '#e8e0cc'); grad.addColorStop(1, '#5e2a6a');
    g.fillStyle = grad;
    g.fillRect(0, 0, s, s);
    for (let i = 0; i < s; i += 2) { g.fillStyle = `rgba(0,0,0,${rand() * 0.06})`; g.fillRect(0, i, s, 1); }
  });
  add(S, box(0.1, 20, 9), new THREE.MeshStandardMaterial({ map: veil, roughness: 1 }), SANCT.front - 2, hy, 0);

  // The altar of unhewn stones with its ramp on the south (Middot 3:1-4), its fire burning.
  const A = placed(ALTAR.x, ALTAR.n, INNER_Y);
  add(A, stoneBox(ALTAR.s, ALTAR.h, ALTAR.s), MAT.white);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) add(A, box(1, 1, 1), MAT.white, sx * (ALTAR.s / 2 - 0.5), ALTAR.h, sz * (ALTAR.s / 2 - 0.5));
  add(A, wedge(6, ALTAR.h, 16), MAT.white, 0, 0, ALTAR.s / 2);
  add(A, box(6, 0.4, 6), MAT.embers, 0, ALTAR.h, 0).castShadow = false;
  const F = placed(ALTAR.x, ALTAR.n, INNER_Y + ALTAR.h + 0.2);
  for (let k = 0; k < 8; k++) flame(F, (rand() - 0.5) * 4, 0, (rand() - 0.5) * 4, 1.4 + rand() * 1.2, 0.35 + rand() * 0.2);
  smoke(v3(ALTAR.x, ALTAR.n, INNER_Y + ALTAR.h + 1.5), { count: 30, size: 1.4, rise: 40, color: 0x8d877f, speed: 0.05, spread: 3, alpha: 0.4 });
}

// ---------------------------------------------------------------- walls & gates
// The first and second walls, with towers (War 5.4.2-3), and gates where the
// tour passes through them.
const WALL_H = 11, WALL_T = 4;
{
  const wallTop = (x, n) => ground(x, n) + WALL_H;
  for (const [name, pts] of Object.entries(WALLS)) {
    const line = pts.map(([x, n]) => P(x, n));
    const gates = Object.values(GATES).filter((g) => g.wall === name);
    for (let i = 1; i < line.length; i++) {
      const a = line[i - 1], b = line[i];
      const len = Math.hypot(b.x - a.x, b.n - a.n), tx = (b.x - a.x) / len, tn = (b.n - a.n) / len;
      // Cut the run round any gate on it.
      const cuts = gates.map((g) => (g.x - a.x) * tx + (g.n - a.n) * tn)
        .filter((u, k) => u > -4 && u < len + 4 && distToPath(gates[k].x, gates[k].n, [a, b]) < 3);
      let u0 = 0;
      for (const u of [...cuts.sort((p, q) => p - q), null]) {
        const e = u == null ? len : u - 4;
        if (e - u0 > 1) wallRun(P(a.x + tx * u0, a.n + tn * u0), P(a.x + tx * e, a.n + tn * e), WALL_T, wallTop, MAT.stone);
        if (u != null) u0 = u + 4;
      }
      // Towers every 60 m or so.
      const k = Math.max(1, Math.round(len / 60));
      for (let j = 0; j < k; j++) {
        const x = a.x + tx * (len * j) / k, n = a.n + tn * (len * j) / k;
        if (gates.some((g) => Math.hypot(g.x - x, g.n - n) < 12)) continue;
        const { lo } = footprint(x, n, 9, 9);
        const G = placed(x, n, lo - 1, Math.atan2(tn, tx));
        add(G, stoneBox(9, ground(x, n) + WALL_H + 5 - lo + 1, 9), MAT.stone);
      }
    }
    for (const g of gates) {
      const line2 = line.findIndex((p, k) => k > 0 && distToPath(g.x, g.n, [line[k - 1], p]) < 3);
      const a = line[line2 - 1], b = line[line2];
      const yaw = Math.atan2(b.n - a.n, b.x - a.x);
      const y = ground(g.x, g.n);
      const G = placed(g.x, g.n, y - 1, yaw);
      for (const s of [-1, 1]) add(G, stoneBox(5, WALL_H + 7, 9), MAT.stone, s * 6.5, 0, 0);
      add(G, stoneBox(8, 4, WALL_T + 1), MAT.stone, 0, WALL_H - 2, 0);
    }
  }
}

// ---------------------------------------------------------------- palaces & houses
// A flat-roofed building, sunk to its lowest corner, `h` metres high.
function building(x, n, w, d, h, yaw = 0, mat = MAT.plaster, roof = MAT.roof) {
  const { lo } = footprint(x, n, w, d, yaw);
  const G = placed(x, n, lo - 1, yaw);
  const top = ground(x, n) + h;
  add(G, box(w, top - lo + 1, d), mat);
  add(G, box(w + 0.4, 0.35, d + 0.4), roof, 0, top - lo + 1, 0);
  G.userData.top = top;
  return G;
}

// Herod's palace on the west of the Upper City (War 5.4.4), with the three
// towers Hippicus, Phasael and Mariamne at its north end (War 5.4.3). Roman
// governors stayed there when they came up to Jerusalem; it is shown here as
// the Praetorium (Mark 15:16), with the Stone Pavement and the judgement seat
// at its gate (John 19:13). Others place the Praetorium in the Antonia.
const PAVE = { x: SITES.pavement.x, n: SITES.pavement.n, y: ground(SITES.pavement.x, SITES.pavement.n) };
const BEMA = P(PAVE.x - 18, PAVE.n);
{
  const { x, n } = SITES.herodsPalace;
  const y = ground(x, n);
  const G = placed(x, n, y);
  add(G, stoneBox(118, 4, 270), MAT.stone, 0, -6, 0);
  for (const s of [-1, 1]) {
    add(G, stoneBox(110, 14, 34), MAT.white, 0, -2, s * 110);
    add(G, box(111, 0.5, 35), MAT.roof, 0, 12, s * 110);
    // Colonnades round the gardens between the two wings.
    for (let k = -6; k <= 6; k++) add(G, new THREE.CylinderGeometry(0.5, 0.55, 6, 10).translate(0, 3, 0), MAT.white, k * 8, -2, s * 86);
    add(G, box(110, 0.6, 10), MAT.roof, 0, 4, s * 86);
  }
  // Gardens, pools and the gate on the east.
  for (const s of [-1, 1]) add(G, box(26, 0.4, 14), MAT.water, s * 28, -1.8, 0).castShadow = false;
  add(G, stoneBox(4, 12, 160), MAT.stone, -57, -2, 0);
  for (const s of [-1, 1]) add(G, stoneBox(4, 8, 64), MAT.stone, 57, -2, s * 50);
  for (const s of [-1, 1]) add(G, stoneBox(6, 14, 6), MAT.stone, 59, -2, s * 12);
  add(G, box(6, 2, 18), MAT.stone, 59, 10, 0);
  // The towers.
  for (const [tx, tn, w, h] of [[-700, -60, 12, 38], [-662, -66, 18, 46], [-626, -64, 11, 28]]) {
    const { lo } = footprint(tx, tn, w, w);
    const T = placed(tx, tn, lo - 1);
    add(T, stoneBox(w, ground(tx, tn) + h - lo + 1, w), MAT.stone);
    add(T, box(w + 1, 0.8, w + 1), MAT.white, 0, ground(tx, tn) + h - lo + 1, 0);
  }
  // The Pavement, and the judgement seat on its platform.
  const Pv = placed(PAVE.x, PAVE.n, PAVE.y);
  add(Pv, box(70, 0.3, 60), MAT.paving, 0, -0.25, 0);
  const B = placed(BEMA.x, BEMA.n, PAVE.y);
  add(B, stoneBox(8, 1.6, 7), MAT.white);
  for (let k = 0; k < 3; k++) add(B, box(1.4, 1.6 * (k + 1) / 4, 4), MAT.white, 4.7 + (2 - k) * 0.6, 0, 0);
  add(B, box(1.2, 0.5, 1.2), MAT.white, -1.5, 1.6, 0);
  add(B, box(0.25, 1.4, 1.2), MAT.white, -2.2, 1.6, 0);
}

// The Hasmonean palace by the Xystus, overlooking the temple (Antiquities 20.8.11),
// where Herod Antipas may have stayed (Luke 23:7).
{
  const { x, n } = SITES.hasmonean;
  const G = building(x, n, 46, 30, 16, 0.05, MAT.white);
  add(G, stoneBox(12, G.userData.top - G.position.y + 8, 12), MAT.white, 17, 0, -9);
}

// The house of the high priest (Mark 14:53-54): rooms round a courtyard, the
// hall open on to it. The place is the traditional one on the east slope of
// Mount Zion (St Peter in Gallicantu); the Armenian Quarter is another.
const HP = { ...SITES.caiaphas, y: ground(SITES.caiaphas.x, SITES.caiaphas.n) };
const HP_FIRE = P(HP.x + 4, HP.n + 2);
{
  const G = placed(HP.x, HP.n, HP.y);
  const W = 34, D = 28, R = 7, h = 7;
  add(G, box(W + 2, 0.6, D + 2), MAT.paving, 0, -0.55, 0);
  // The hall on the south, open to the courtyard behind columns.
  add(G, box(W, h, 1), MAT.plaster, 0, 0, D / 2 - 0.5);
  for (const s of [-1, 1]) add(G, box(1, h, R), MAT.plaster, s * (W / 2 - 0.5), 0, D / 2 - R / 2);
  for (let k = -3; k <= 3; k++) add(G, new THREE.CylinderGeometry(0.35, 0.4, h, 10).translate(0, h / 2, 0), MAT.white, k * 4.4, 0, D / 2 - R);
  add(G, box(W, 0.5, R + 0.5), MAT.roof, 0, h, D / 2 - R / 2);
  // Rooms on the west and east, the gate in the north wall.
  for (const s of [-1, 1]) add(G, box(R, h - 1, D - R), MAT.plaster, s * (W / 2 - R / 2), 0, -R / 2);
  for (const s of [-1, 1]) add(G, box(W / 2 - 2.5, 4, 1), MAT.plaster, s * (W / 4 + 1.25), 0, -D / 2 + 0.5);
  add(G, box(5, 1, 1), MAT.plaster, 0, 3.2, -D / 2 + 0.5);
  for (const s of [-1, 1]) add(G, box(R + 0.4, 0.4, D - R + 0.4), MAT.roof, s * (W / 2 - R / 2), h - 1, -R / 2);
  // The fire in the courtyard (Mark 14:54; John 18:18).
  const F = placed(HP_FIRE.x, HP_FIRE.n, HP.y);
  for (let k = 0; k < 6; k++) {
    const log = add(F, cylX(0.07, 0.8), MAT.darkWood, 0, 0.08, 0);
    log.rotation.y = (k * Math.PI) / 3;
  }
  add(F, new THREE.CircleGeometry(0.6, 16).rotateX(-Math.PI / 2), MAT.embers, 0, 0.02, 0).castShadow = false;
  for (let k = 0; k < 5; k++) flame(F, (rand() - 0.5) * 0.4, 0.05, (rand() - 0.5) * 0.4, 0.5 + rand() * 0.4, 0.12);
}

// The house with the large upper room (Mark 14:15). The place is the
// traditional one on Mount Zion; the text doesn't say where in the city it was.
// Its roof and south wall are cut away for the supper.
const UR = { ...SITES.upperRoom, y: ground(SITES.upperRoom.x, SITES.upperRoom.n) };
const UR_FLOOR = UR.y + 3.3;
const UR_STAIR = [P(UR.x + 9.5, UR.n - 4), P(UR.x + 9.5, UR.n + 4)];
{
  const G = placed(UR.x, UR.n, UR.y);
  const W = 16, D = 10;
  add(G, box(W, 4, D), MAT.plaster, 0, -1, 0);
  add(G, box(W, 0.3, D), MAT.paving, 0, 3, 0);
  add(G, box(1.4, 2.2, 0.2), MAT.dark, 4, 0, -D / 2 - 0.02).castShadow = false;
  const wall = (geo, x, y, z) => { const m = add(G, geo, MAT.cutWall, x, y, z); cutMeshes.push(m); return m; };
  wall(box(W, 3.6, 0.4), 0, 3.3, D / 2 - 0.2);
  add(G, box(W, 3.6, 0.4), MAT.plaster, 0, 3.3, -D / 2 + 0.2);
  add(G, box(0.4, 3.6, D), MAT.plaster, -W / 2 + 0.2, 3.3, 0);
  add(G, box(0.4, 3.6, D), MAT.plaster, W / 2 - 0.2, 3.3, 0);
  add(G, box(0.42, 2.2, 1.2), MAT.dark, W / 2 - 0.2, 3.3, 3.4).castShadow = false;
  const roof = add(G, box(W + 0.4, 0.35, D + 0.4), MAT.cutRoof, 0, 6.9, 0);
  cutMeshes.push(roof);
  // An outside stair up to the door of the upper room.
  for (let k = 0; k < 12; k++) add(G, box(1.2, 0.275 * (k + 1) + 1, 0.67), MAT.plaster, W / 2 + 1.5, -1, -4 + k * 0.67);
  add(G, box(1.6, 0.3, 2), MAT.plaster, W / 2 + 1.3, 3, 3.4);
}

// Simon the leper's house at Bethany (Mark 14:3), its dining room cut away.
const SH = { ...SITES.simon, y: ground(SITES.simon.x, SITES.simon.n) };
{
  const G = placed(SH.x, SH.n, SH.y);
  const W = 14, D = 10, h = 3.6;
  add(G, box(W + 8, 0.3, D + 10), MAT.paving, 0, -0.28, 4);
  const wall = (geo, x, y, z) => { const m = add(G, geo, MAT.cutWall, x, y, z); cutMeshes.push(m); return m; };
  add(G, box(W, h, 0.4), MAT.plaster, 0, 0, -D / 2);
  add(G, box(0.4, h, D), MAT.plaster, -W / 2, 0, 0);
  add(G, box(0.4, h, D), MAT.plaster, W / 2, 0, 0);
  wall(box(W / 2 - 1, h, 0.4), -W / 4 - 0.5, 0, D / 2);
  wall(box(W / 2 - 1, h, 0.4), W / 4 + 0.5, 0, D / 2);
  wall(box(2, h - 2.3, 0.4), 0, 2.3, D / 2);
  cutMeshes.push(add(G, box(W + 0.4, 0.35, D + 0.4), MAT.cutRoof, 0, h, 0));
  // A courtyard wall.
  for (const s of [-1, 1]) add(G, box(0.5, 2.2, 10), MAT.plaster, s * (W / 2 + 3.8), 0, D / 2 + 5);
}

// Houses: flat-roofed, of plaster and stone, close together inside the walls,
// grander in the Upper City; scattered outside them, and two villages on the
// Mount of Olives. They keep clear of the walks and the places built above.
const CITY1 = WALLS.first.concat([PLATFORM.pts[0]]);
const CITY2 = WALLS.second.concat([PLATFORM.pts[3], [-134, -40]]);
const KEEP = [];   // { x, n, r } discs kept clear
const keepClear = (x, n, r) => KEEP.push({ x, n, r });
const PATHS = [];  // polylines kept clear (the walks add theirs)
{
  keepClear(SITES.herodsPalace.x, SITES.herodsPalace.n, 0);
  for (const [k, r] of [['pavement', 40], ['hasmonean', 30], ['upperRoom', 16], ['caiaphas', 26], ['siloam', 34], ['bethesda', 34], ['simon', 16], ['golgotha', 30], ['tomb', 26], ['gethsemane', 45], ['figTree', 14]]) {
    keepClear(SITES[k].x, SITES[k].n, r);
  }
}
const palaceBox = (x, n) => x > -728 && x < -596 && n > -336 && n < -54;
const nearSite = (x, n) => KEEP.some((k) => Math.hypot(k.x - x, k.n - n) < k.r);
const onPath = (x, n, d) => PATHS.some((p) => distToPath(x, n, p) < d) || ROADS.some((p) => distToPath(x, n, p) < d);
function houses() {
  const list = [];
  const r = mulberry32(731);
  const wallLines = Object.values(WALLS).map((w) => w.map(([x, n]) => P(x, n)));
  const tryHouse = (x, n, w, d, yaw, h) => {
    if (palaceBox(x, n) || nearSite(x, n) || onPath(x, n, 6 + Math.max(w, d) / 2)) return;
    if (inPoly(x, n, PLATFORM.pts) || distToPath(x, n, PP.concat([PP[0]])) < 10) return;
    if (Math.hypot(x - SITES.antonia.x, n - SITES.antonia.n) < 75) return;
    if (wallLines.some((l) => distToPath(x, n, l) < 8)) return;
    const { lo, hi } = footprint(x, n, w, d, yaw);
    if (hi - lo > 5) return;
    list.push({ x, n, w, d, yaw, h, lo });
  };
  // Inside the walls, on a grid of blocks.
  for (let x = -735; x < 160; x += 14) {
    for (let n = -1000; n < 260; n += 14) {
      const jx = x + (r() - 0.5) * 4, jn = n + (r() - 0.5) * 4;
      const inside = inPoly(jx, jn, CITY1) || inPoly(jx, jn, CITY2);
      if (!inside) continue;
      // Streets every third row and column.
      if (Math.round((x + 735) / 14) % 4 === 0 || Math.round((n + 1000) / 14) % 4 === 0) continue;
      const upper = jx < -250 && jn < -40;
      if (r() < (upper ? 0.18 : 0.08)) continue;
      const w = (upper ? 9 : 7) + r() * 4, d = (upper ? 9 : 7) + r() * 4;
      tryHouse(jx, jn, w, d, (r() - 0.5) * 0.12, (upper ? 6 : 4) + r() * 4);
    }
  }
  // Outside the walls: a few houses and the two villages.
  for (let i = 0; i < 2600; i++) {
    const x = -900 + r() * 1300, n = -1100 + r() * 1700;
    if (inPoly(x, n, CITY1) || inPoly(x, n, CITY2)) continue;
    if (r() > 0.12) continue;
    tryHouse(x, n, 6 + r() * 4, 6 + r() * 4, r() * Math.PI, 3.5 + r() * 2);
  }
  for (const [c, want, rad] of [[SITES.bethphage, 26, 70], [SITES.bethany, 46, 110]]) {
    let count = want;
    for (let i = 0; i < want * 6 && count > 0; i++) {
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * rad;
      const x = c.x + Math.cos(a) * d, n = c.n + Math.sin(a) * d;
      if (list.some((h) => Math.hypot(h.x - x, h.n - n) < 11)) continue;
      const before = list.length;
      tryHouse(x, n, 6 + r() * 4, 6 + r() * 4, r() * 0.4 - 0.2, 3.5 + r() * 2);
      if (list.length > before) count--;
    }
  }
  return list;
}
let houseMesh = null;
function buildHouses() {
  const list = houses();
  const body = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0), MAT.plain, list.length);
  const roof = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0), MAT.plain, list.length);
  const door = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0), MAT.dark, list.length);
  const plaster = ['#ecdcb6', '#e0c595', '#f1e6cb', '#d9bf8c', '#e8cfa2', '#d8c8a8'].map((h) => new THREE.Color(h));
  const roofs = ['#bfa070', '#b0865a', '#c9aa76', '#a88a62'].map((h) => new THREE.Color(h));
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), p = new THREE.Vector3(), s = new THREE.Vector3(), o = new THREE.Vector3();
  list.forEach((h, i) => {
    q.setFromAxisAngle(UP, h.yaw);
    const top = h.lo + h.h;
    body.setMatrixAt(i, m.compose(p.set(h.x, h.lo - 1.5, -h.n), q, s.set(h.w, h.h + 1.5, h.d)));
    body.setColorAt(i, plaster[i % plaster.length]);
    roof.setMatrixAt(i, m.compose(p.set(h.x, top, -h.n), q, s.set(h.w + 0.4, 0.4, h.d + 0.4)));
    roof.setColorAt(i, roofs[i % roofs.length]);
    o.set(0, 0, h.d / 2 + 0.02).applyQuaternion(q);
    door.setMatrixAt(i, m.compose(p.set(h.x + o.x, h.lo, -h.n + o.z), q, s.set(1.1, 2, 0.1)));
  });
  for (const mesh of [body, roof, door]) { mesh.castShadow = mesh.receiveShadow = true; scene.add(mesh); }
  door.castShadow = false;
  houseMesh = body;
}

// ---------------------------------------------------------------- pools, gardens, Golgotha
function pool(x, n, w, d, steps = 4, yaw = 0) {
  const y = ground(x, n);
  const G = placed(x, n, y, yaw);
  add(G, stoneBox(w + 4, 1, d + 4), MAT.stone, 0, -1, 0);
  for (let k = 0; k < steps; k++) add(G, box(w - k * 2, 0.4, d - k * 2), MAT.white, 0, -0.4 - k * 0.4 + 0.4, 0).position.y = -0.1 - k * 0.45;
  add(G, box(w - steps * 2, 0.2, d - steps * 2), MAT.water, 0, -steps * 0.45 + 0.2, 0).castShadow = false;
  return G;
}
// The Pool of Siloam, with steps down to it (John 9:7), and the Pool of
// Bethesda, two pools with porticoes (John 5:2).
pool(SITES.siloam.x, SITES.siloam.n, 50, 30, 5, 0.3);
{
  const { x, n } = SITES.bethesda;
  pool(x, n - 14, 40, 22, 4);
  pool(x, n + 14, 40, 22, 4);
  const y = ground(x, n);
  for (const z of [-27, 0, 27]) colonnade(P(x - 22, n + z), P(x + 22, n + z), 0, y, 5, 0.35, 4);
  for (const xx of [-22, 22]) colonnade(P(x + xx, n - 27), P(x + xx, n + 27), 0, y, 5, 0.35, 4.5);
}

// Golgotha: a knoll of rock in an old quarry outside the second wall, by a road
// (Mark 15:29), near the city (John 19:20). The place is the traditional one,
// now in the Church of the Holy Sepulchre; another tradition (the Garden Tomb)
// is north of the Damascus Gate.
const GOLG = { ...SITES.golgotha };
GOLG.y = ground(GOLG.x, GOLG.n) + 7.1;   // the top of the rock
{
  const G = placed(GOLG.x, GOLG.n, ground(GOLG.x, GOLG.n) - 1);
  const rock = add(G, lumpy(new THREE.DodecahedronGeometry(1, 2), 0.12, 5), MAT.rock, 0, 0, 0);
  rock.scale.set(13, 8.2, 11);
  add(G, new THREE.CylinderGeometry(4.5, 6, 1, 14), MAT.rock, 0, 7.6, 0);
}
// The tomb in a garden nearby (John 19:41), cut in the rock (Mark 15:46):
// a low doorway facing east, a chamber with a bench on the right as you go in
// (Mark 16:5), and a round stone rolled across the door in a groove.
const TOMB = { ...SITES.tomb, y: ground(SITES.tomb.x, SITES.tomb.n) };
const DOOR = { x: TOMB.x + 4.2, n: TOMB.n };     // the doorway, in the east face
const tombStone = new THREE.Group();
{
  const G = placed(TOMB.x, TOMB.n, TOMB.y - 0.5);
  // The rock: a hollow chamber (3 m square, 2.2 m high) inside a mass of rock.
  const t = 1.4, cw = 3, ch = 2.4;
  const rockBox = (w, h, d, x, y, z, mat = MAT.rock) => add(G, lumpy(new THREE.BoxGeometry(w, h, d, 6, 4, 6), 0.08, 4).translate(0, h / 2, 0), mat, x, y, z);
  rockBox(cw + 2 * t, ch + 3.5, t, 0, 0, -(cw / 2 + t / 2));
  cutMeshes.push(rockBox(cw + 2 * t, ch + 3.5, t, 0, 0, cw / 2 + t / 2, MAT.cutRock));
  rockBox(t, ch + 3.5, cw, -(cw / 2 + t / 2), 0, 0);
  cutMeshes.push(rockBox(cw, 3.5, cw, 0, ch, 0, MAT.cutRock));
  // The east face, with the doorway.
  rockBox(t, ch + 3.5, (cw - 1.2) / 2, cw / 2 + t / 2, 0, -(cw / 4 + 0.3));
  rockBox(t, ch + 3.5, (cw - 1.2) / 2, cw / 2 + t / 2, 0, cw / 4 + 0.3);
  rockBox(t, ch + 1.5, 1.3, cw / 2 + t / 2, 1.6, 0);
  // More rock behind and round it, and the forecourt cut level in front.
  const back = add(G, lumpy(new THREE.DodecahedronGeometry(1, 2), 0.12, 4), MAT.rock, -8.4, 1, 0);
  back.scale.set(5.6, 6, 9);
  add(G, box(t + 0.2, 0.2, cw + 2 * t), MAT.rock, cw / 2 + t / 2, -0.1, 0);
  add(G, box(cw, 0.1, cw), MAT.rock, 0, 0.4, 0);
  // The bench on the right (north) side, and the floor.
  add(G, box(cw - 0.2, 0.6, 0.9), MAT.rock, 0, 0.45, -(cw / 2 - 0.45));
  add(G, box(6, 0.5, 8), MAT.rock, cw / 2 + t + 3, -0.1, 0);
  // The groove and the stone.
  add(G, box(0.5, 0.3, 4.6), MAT.rock, cw / 2 + t + 0.3, 0, 0.4);
  tombStone.position.set(TOMB.x + 3.15, TOMB.y - 0.4 + 1.1, -DOOR.n);
  scene.add(tombStone);
  add(tombStone, new THREE.CylinderGeometry(1.1, 1.1, 0.35, 28).rotateZ(Math.PI / 2), MAT.rock);
}
// Gethsemane: an olive grove at the foot of the Mount of Olives, across the
// Kidron (John 18:1). The low wall round it is a guess.
{
  const { x, n } = SITES.gethsemane;
  for (const [a, b] of [[P(x - 35, n - 25), P(x + 35, n - 25)], [P(x + 35, n - 25), P(x + 35, n + 25)], [P(x + 35, n + 25), P(x - 35, n + 25)], [P(x - 35, n + 25), P(x - 35, n - 5)]]) {
    wallRun(a, b, 0.7, (px, pn) => ground(px, pn) + 1.2, MAT.stone, 6);
  }
}

// Trees: olives on the Mount of Olives and in Gethsemane, date palms towards
// Bethany (John 12:13), and a few in the gardens round the city.
const TREES = [];
function trees() {
  const r = mulberry32(99);
  const geth = SITES.gethsemane;
  for (let i = 0; i < 70000 && TREES.length < 6500; i++) {
    const x = -1300 + r() * 4100, n = -1650 + r() * 2900;
    if (inPoly(x, n, CITY1) || inPoly(x, n, CITY2) || inPoly(x, n, PLATFORM.pts)) continue;
    if (onPath(x, n, 7) || palaceBox(x, n)) continue;
    const ing = Math.abs(x - geth.x) < 33 && Math.abs(n - geth.n) < 23;
    if (!ing && nearSite(x, n)) continue;
    const h = ground(x, n);
    let p = 0.02;
    if (x > 320 && x < 1500 && h > 90) p = 0.32;
    if (valleyDist(VALLEYS.kidron, x, n).d < 28) p = 0.22;
    if (valleyDist(VALLEYS.hinnom, x, n).d < 40) p = 0.12;
    if (Math.hypot(x - SITES.siloam.x - 60, n - SITES.siloam.n + 160) < 90) p = 0.7;   // the King's Garden
    if (ing) p = 1;
    if (r() > p) continue;
    const palm = x > 1400 && r() < 0.18;
    TREES.push({ x, n, y: h, k: 0.8 + r() * 0.6, yaw: r() * 6.28, palm });
  }
  // A few trees in the garden by the tomb.
  for (const [dx, dn] of [[14, 10], [18, -8], [10, -16], [22, 4]]) TREES.push({ x: TOMB.x + dx, n: TOMB.n + dn, y: ground(TOMB.x + dx, TOMB.n + dn), k: 0.9, yaw: dx, palm: false });
  const olives = TREES.filter((t) => !t.palm), palms = TREES.filter((t) => t.palm);
  const trunk = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.22, 0.38, 2.4, 5).translate(0, 1.2, 0), MAT.trunk, olives.length);
  const crown = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(2.4, 0), MAT.leaf, olives.length);
  const greens = ['#7d9a5a', '#6d8a4c', '#8ea466', '#6f8f56'].map((h) => new THREE.Color(h));
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), p = new THREE.Vector3(), s = new THREE.Vector3();
  olives.forEach((tr_, i) => {
    q.setFromAxisAngle(UP, tr_.yaw);
    trunk.setMatrixAt(i, m.compose(p.set(tr_.x, tr_.y - 0.3, -tr_.n), q, s.setScalar(tr_.k)));
    crown.setMatrixAt(i, m.compose(p.set(tr_.x, tr_.y + 3 * tr_.k, -tr_.n), q, s.set(1.3 * tr_.k, 0.75 * tr_.k, 1.2 * tr_.k)));
    crown.setColorAt(i, greens[i % greens.length]);
  });
  const pTrunk = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.2, 0.3, 9, 6).translate(0, 4.5, 0), MAT.trunk, palms.length);
  const frond = new THREE.BoxGeometry(4.2, 0.06, 0.7).translate(2.1, 0, 0).rotateZ(-0.45);
  const frondGeos = [];
  for (let k = 0; k < 9; k++) frondGeos.push(frond.clone().rotateY((k / 9) * Math.PI * 2).translate(0, 9, 0));
  const fronds = new THREE.InstancedMesh(mergeGeos(frondGeos), MAT.leaf, palms.length);
  palms.forEach((tr_, i) => {
    q.setFromAxisAngle(UP, tr_.yaw);
    pTrunk.setMatrixAt(i, m.compose(p.set(tr_.x, tr_.y - 0.3, -tr_.n), q, s.setScalar(tr_.k)));
    fronds.setMatrixAt(i, m.compose(p.set(tr_.x, tr_.y - 0.3, -tr_.n), q, s.setScalar(tr_.k)));
    fronds.setColorAt(i, greens[(i + 1) % greens.length]);
  });
  for (const mesh of [trunk, crown, pTrunk, fronds]) { mesh.castShadow = true; mesh.receiveShadow = true; scene.add(mesh); }
}
// Joins geometries (same attributes) into one.
function mergeGeos(list) {
  const out = new THREE.BufferGeometry();
  const geos = list.map((g) => (g.index ? g.toNonIndexed() : g));
  for (const name of ['position', 'normal', 'uv']) {
    const parts = geos.map((g) => g.attributes[name].array);
    const arr = new Float32Array(parts.reduce((a, b) => a + b.length, 0));
    let o = 0;
    for (const a of parts) { arr.set(a, o); o += a.length; }
    out.setAttribute(name, new THREE.BufferAttribute(arr, geos[0].attributes[name].itemSize));
  }
  return out;
}
// The fig tree in leaf by the road from Bethany (Mark 11:13), with no fruit.
const FIG_AT = { ...SITES.figTree, y: ground(SITES.figTree.x, SITES.figTree.n) };
const figTree = placed(FIG_AT.x, FIG_AT.n, FIG_AT.y);
{
  const leaf = new THREE.MeshStandardMaterial({ color: 0x5f8f3a, roughness: 0.9, flatShading: true });
  for (const [a, l] of [[0.3, 2.2], [2.4, 2], [4.3, 2.3]]) {
    const b = rod(figTree, new THREE.Vector3(0, 0, 0), new THREE.Vector3(Math.cos(a) * 1.1, l, Math.sin(a) * 1.1), 0.16, MAT.trunk);
    b.castShadow = true;
  }
  for (let k = 0; k < 9; k++) {
    const c = add(figTree, lumpy(new THREE.IcosahedronGeometry(1.5, 1), 0.2, 3), leaf, Math.cos(k * 2.4) * 1.8, 2.6 + (k % 3) * 0.6, Math.sin(k * 2.4) * 1.8);
    c.scale.set(1.2, 0.8, 1.2);
  }
}

// ---------------------------------------------------------------- build groups
// Each piece belongs to a group named in STOPS[].build. A group's progress p
// (0..1) raises its pieces one after another: 'drop' falls in with a little
// overshoot, 'grow' scales up in place, 'tip' falls over (a table overturned),
// 'off' lifts away and goes. Walks and poses (below) are groups too.
const groups = {};
function piece(key, obj, mode = 'drop', lift = 1.5) {
  groups[key] ??= { key, items: [], p: -1 };
  groups[key].items.push({ obj, mode, lift, pos: obj.position.clone(), scale: obj.scale.clone(), rot: obj.rotation.clone() });
  return obj;
}
function setItem(it, k) {
  const o = it.obj;
  o.userData.on = it.mode === 'off' ? k < 1 : it.mode === 'tip' || k > 0;
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
  o.rotation.copy(it.rot);
  if (it.mode === 'drop') {
    o.position.y += (1 - k) ** 2 * it.lift;
    o.scale.multiplyScalar(k >= 1 ? 1 : Math.max(0.001, easeOutBack(k)));
  } else if (it.mode === 'tip') {
    o.visible = true;
    const e = smooth(k);
    o.rotation.x = it.rot.x + e * it.lift;
    o.position.y += Math.sin(e * Math.PI) * 0.3;
  } else {
    o.scale.multiplyScalar(Math.max(0.001, smooth(k)));
  }
}
function setGroup(key, p) {
  const g = groups[key];
  if (!g || p === g.p) return;
  g.p = p;
  const n = g.items.length;
  const w = g.together ? 1 : Math.min(1, Math.max(0.12, 4 / n));   // each piece's share of the group's time
  g.items.forEach((it, i) => setItem(it, clamp01((p - (n > 1 && !g.together ? i / (n - 1) : 0) * (1 - w)) / w)));
}
const groupP = (key) => Math.max(0, groups[key]?.p ?? 0);
const done = (key) => groupP(key) >= 1;
// A group that only drives something computed each frame (an arm, the light).
const marker = (key) => piece(key, new THREE.Object3D(), 'grow');
// How long a group takes during a flight, in WALK_UNITs (walks set their own).
const WEIGHT = {};
const weightOf = (k) => groups[k]?.weight ?? WEIGHT[k] ?? 1;
// Things that are there only from one group until another: shown(obj, 'a', 'b').
const showings = [];
function shown(obj, from, until) {
  showings.push({ obj, from, until });
  for (const k of [from, until]) if (k && !groups[k]) marker(k);
  return obj;
}
const isShown = (from, until) => (!from || groupP(from) > 0) && (!until || groupP(until) <= 0);

// ---------------------------------------------------------------- people
// Figures are built in cubits and face local +X; local +Z is their right
// hand. Bodies and garments are lathes inside a group squashed front to back
// by DEPTH. Heights in figure units: hips 1.5, shoulders 2.55, head 3.1.
// R stands on the ground and turns; G inside it takes the pose (sitting,
// lying down, riding); the skirt of a garment hangs from the hips and folds
// up when they sit.

// Arms from the shoulders: `out` away from the body, `fwd` forward, `bend` at the elbow.
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
    const H = new THREE.Group();
    H.position.y = -0.61;
    E.add(H);
    fn(S, E, H, s);
    return { S, E, H, s };
  });
}
function squashed(parent) {
  const B = new THREE.Group();
  B.scale.x = DEPTH;
  parent.add(B);
  return B;
}
const POSE = { out: 0.14, fwd: 0.06, bend: 0.3 };

// The skull and face: an egg with a brow, cheekbones, eye sockets and a
// narrower jaw, centred on the origin, facing +X.
function headGeo() {
  const geo = new THREE.SphereGeometry(1, 30, 22);
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
const HEAD = headGeo();
// A beard round the jaw and chin, `long` drawing it down to a point.
const beardGeos = {};
function beardGeo(long) {
  return (beardGeos[long] ??= (() => {
    const geo = new THREE.SphereGeometry(1, 28, 18, Math.PI - 2.15, 4.3, Math.PI * 0.44, Math.PI * 0.56);
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
  })());
}
const HAIR = lumpy(new THREE.SphereGeometry(0.214, 28, 16, -Math.PI / 2 - 0.15, Math.PI + 0.3, 0, Math.PI * 0.74), 0.01, 9);
const HAIR_TOP = lumpy(new THREE.SphereGeometry(0.214, 28, 10, 0, Math.PI * 2, 0, Math.PI * 0.28), 0.008, 9);
const HAIR_LONG = lumpy(new THREE.SphereGeometry(0.218, 28, 18, -Math.PI / 2 - 0.4, Math.PI + 0.8, 0, Math.PI * 0.92), 0.012, 9);
const MOUSTACHE = lumpy(tubeThrough([[0.165, 3.015, -0.08], [0.198, 3.048, -0.05], [0.214, 3.058, 0], [0.198, 3.048, 0.05], [0.165, 3.015, 0.08]], 0.018, 16), 0.004, 14, new THREE.Vector3(0.1, 3.05, 0));
const UPPER_ARM = lathe([[0.074, -0.74], [0.078, -0.66], [0.096, -0.42], [0.104, -0.18], [0.098, 0]], 12);
const FOREARM = lathe([[0.05, -0.62], [0.052, -0.58], [0.07, -0.36], [0.082, -0.13], [0.075, 0]], 12);
const LEG = lathe([[0.05, -1.4], [0.046, -1.34], [0.062, -1.2], [0.088, -0.98], [0.083, -0.86], [0.076, -0.74], [0.11, -0.56], [0.134, -0.2], [0.135, 0.02]], 12);
const skinMats = {}, clothMats = {};
const skinMat = (c) => (skinMats[c] ??= new THREE.MeshStandardMaterial({ color: c, roughness: 0.72 }));
const cloth = (c) => (clothMats[c] ??= new THREE.MeshStandardMaterial({ color: c, roughness: 1, side: THREE.DoubleSide }));
// Wool or linen with two stripes (clavi) down the front and back, as tunics of the time had.
const stripedMats = {};
function striped(base, stripe) {
  return (stripedMats[base + stripe] ??= new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide, roughness: 1,
    map: canvasTexture(128, (g, s) => {
      weave(g, s, base);
      g.fillStyle = stripe;
      // The lathe's U runs round the body from the back (u = 0) through the right, front and left.
      for (const u of [0.18, 0.32, 0.68, 0.82]) g.fillRect(u * s - 3, 0, 6, s);
    }),
  }));
}
const MAT_P = {
  eye: new THREE.MeshStandardMaterial({ color: 0x1a120c, roughness: 0.25 }),
  eyeWhite: new THREE.MeshStandardMaterial({ color: 0xe4dccd, roughness: 0.35 }),
  sandal: new THREE.MeshStandardMaterial({ color: 0x4a3020, roughness: 0.9 }),
  iron: new THREE.MeshStandardMaterial({ color: 0x5b5a58, metalness: 0.7, roughness: 0.4 }),
  helmet: new THREE.MeshStandardMaterial({ color: 0x8a6a3a, metalness: 0.75, roughness: 0.35 }),
  shield: new THREE.MeshStandardMaterial({ color: 0x8a2a20, roughness: 0.7 }),
};

// Garment profiles: [radius, height] from the hips (1.5) up, and from the hips down.
const TORSO = [[0.315, 1.5], [0.318, 1.9], [0.365, 2.35], [0.392, 2.53], [0.322, 2.67], [0.152, 2.77], [0.132, 2.8]];
const skirtTo = (hem, flare = 0.36) => [[flare, hem - 1.5], [0.33 + (flare - 0.33) * 0.5, (hem - 1.5) * 0.5], [0.315, 0], [0.316, 0.02]];

// o: { skin, hair, beard, long, hem, tunic (a material), sleeves ('short'|'long'), mantle, veil,
//      cloth (a head cloth), female, young, soldier, white }
function figure(o) {
  const R = new THREE.Group();
  R.scale.setScalar(FIG * (o.k ?? 1));
  scene.add(R);
  const G = new THREE.Group();
  R.add(G);
  const sk = skinMat(o.skin ?? '#a8754f');
  const B = squashed(G);
  add(B, lathe([[0.001, 1.2], [0.25, 1.22], [0.29, 1.5], [0.28, 1.75], [0.3, 2.05], [0.35, 2.4], [0.37, 2.55], [0.3, 2.66], [0.12, 2.74], [0.001, 2.76]], 20), sk);
  const legs = [-1, 1].map((s) => {
    const L = new THREE.Group();
    L.position.set(0, 1.5, s * 0.14);
    G.add(L);
    add(L, LEG, sk);
    add(L, new THREE.SphereGeometry(1, 12, 8), sk, 0.08, -1.45, 0).scale.set(0.13, 0.045, 0.062);
    add(L, new THREE.SphereGeometry(1, 12, 8), MAT_P.sandal, 0.08, -1.49, 0).scale.set(0.15, 0.02, 0.075);
    return L;
  });
  const tunicMat = o.tunic ?? cloth('#d9ccb0');
  const arms = limbs(G, POSE, (S, E, H, s) => {
    add(S, new THREE.SphereGeometry(0.1, 12, 8), sk, 0, -0.09, 0);
    add(S, UPPER_ARM, sk);
    add(E, new THREE.SphereGeometry(0.074, 10, 8), sk);
    add(E, FOREARM, sk);
    add(H, new THREE.SphereGeometry(1, 12, 8), sk, 0, -0.05, 0).scale.set(0.052, 0.068, 0.032);
    add(H, new THREE.CapsuleGeometry(0.024, 0.05, 4, 8), sk, 0.002, -0.115, -s * 0.008).scale.set(1.9, 1, 1);
    const T = add(H, new THREE.CapsuleGeometry(0.014, 0.04, 4, 8), sk, 0.042, -0.06, -s * 0.012);
    T.rotation.set(-s * 0.35, 0, 0.35);
    H.rotation.x = s * 0.12;
    // Sleeves: to the elbow, or (for women and the long tunics) to the wrist.
    add(S, new THREE.CylinderGeometry(0.13, 0.115, 0.76, 10, 1, true).translate(0, -0.36, 0), tunicMat);
    if (o.sleeves === 'long') add(E, new THREE.CylinderGeometry(0.108, 0.09, 0.5, 10, 1, true).translate(0, -0.25, 0), tunicMat);
  });
  add(G, new THREE.CylinderGeometry(0.083, 0.1, 0.32, 12), sk, 0, 2.72, 0);
  const neck = new THREE.Group();
  neck.position.y = 2.8;
  G.add(neck);
  const head = new THREE.Group();
  head.position.y = -2.8;
  neck.add(head);
  add(head, HEAD, sk, 0, 3.12, 0);
  rod(head, new THREE.Vector3(0.185, 3.175, 0), new THREE.Vector3(0.215, 3.095, 0), 0.016, sk, 8);
  add(head, new THREE.SphereGeometry(0.021, 10, 8), sk, 0.21, 3.092, 0);
  for (const s of [-1, 1]) {
    const e = add(head, new THREE.SphereGeometry(1, 10, 8), sk, -0.005, 3.125, s * 0.178);
    e.scale.set(0.038, 0.062, 0.016);
    e.rotation.set(s * 0.25, -s * 0.3, 0.12);
  }
  const eyes = new THREE.Group();
  eyes.position.set(0.168, 3.162, 0);
  head.add(eyes);
  for (const s of [-1, 1]) {
    add(eyes, new THREE.SphereGeometry(0.024, 12, 8), MAT_P.eyeWhite, 0, 0, s * 0.066).scale.set(0.8, 0.75, 1);
    add(eyes, new THREE.SphereGeometry(0.014, 10, 8), MAT_P.eye, 0.015, 0, s * 0.064).scale.set(0.6, 1, 1);
    add(head, new THREE.SphereGeometry(0.026, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.36), sk, 0.166, 3.166, s * 0.066).scale.set(0.85, 0.8, 1.05);
  }
  const hm = cloth(o.hair ?? '#2e2218');
  for (const s of [-1, 1]) {
    const b = add(head, new THREE.CapsuleGeometry(0.011, 0.05, 4, 8).rotateX(Math.PI / 2), hm, 0.18, 3.207, s * 0.068);
    b.rotation.set(s * 0.1, -s * 0.35, 0);
  }
  add(head, o.female ? HAIR_LONG : HAIR, hm, -0.016, 3.14, 0).scale.set(1, 1.12, 0.94);
  add(head, HAIR_TOP, hm, -0.02, 3.14, 0).scale.set(1, 1.12, 0.94);
  if (o.beard) {
    add(head, beardGeo(o.long ?? 0.4), cloth(o.beard));
    add(head, MOUSTACHE, cloth(o.beard));
  }
  // The tunic, its skirt hanging from the hips to the hem.
  add(squashed(G), lathe(TORSO, 28), tunicMat);
  const skirt = new THREE.Group();
  skirt.position.y = 1.5;
  G.add(skirt);
  add(squashed(skirt), lathe(skirtTo(o.hem ?? 0.75, o.hem < 0.4 ? 0.4 : 0.36), 28), tunicMat);
  // A belt.
  if (!o.female) add(squashed(G), new THREE.CylinderGeometry(0.325, 0.322, 0.08, 24, 1, true), cloth(o.belt ?? '#5a4530'), 0, 1.62, 0);
  // The mantle, over the shoulders and round the body to the knees.
  if (o.mantle) {
    add(squashed(G), lathe([[0.4, 1.5], [0.38, 1.9], [0.4, 2.3], [0.43, 2.56], [0.33, 2.7], [0.2, 2.78]], 28, 0, Math.PI * 1.5), o.mantle);
    add(squashed(skirt), lathe([[0.42, -0.55], [0.41, -0.3], [0.4, 0]], 28, 0, Math.PI * 1.5), o.mantle);
  }
  // A woman's veil over the head and shoulders, open at the face.
  if (o.veil) {
    add(head, lathe([[0.001, 3.42], [0.12, 3.4], [0.23, 3.3], [0.25, 3.12], [0.24, 2.95], [0.3, 2.78], [0.44, 2.55], [0.44, 2.2]], 28, Math.PI / 2 + 0.75, Math.PI * 2 - 1.5), o.veil);
  }
  if (o.cloth) add(head, new THREE.SphereGeometry(0.235, 16, 10, 0, Math.PI * 2, 0, Math.PI / 1.75), o.cloth, -0.02, 3.15, 0).scale.set(1, 1.15, 0.97);
  const fig = { R, G, arms, legs, neck, head, eyes, skirt, blink: rand() * 4, phase: rand() * 6, step: 0, pose: {}, held: {} };
  return fig;
}

// A Roman soldier: a short red tunic, a belt and sword, a helmet and a spear.
function soldier(look = {}) {
  const f = figure({ skin: '#b07a52', hair: '#3a2a1e', hem: 1.05, tunic: cloth('#9a3a2a'), belt: '#3a2a1a', ...look });
  const hm = new THREE.Group();
  f.head.add(hm);
  add(hm, new THREE.SphereGeometry(0.235, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), MAT_P.helmet, -0.02, 3.2, 0).scale.y = 0.95;
  add(hm, new THREE.CylinderGeometry(0.25, 0.27, 0.1, 18, 1, true, Math.PI, Math.PI), MAT_P.helmet, -0.04, 3.1, 0);
  for (const s of [-1, 1]) add(hm, box(0.12, 0.2, 0.02), MAT_P.helmet, 0.08, 2.95, s * 0.2);
  add(squashed(f.G), lathe([[0.42, 1.95], [0.43, 2.3], [0.45, 2.56], [0.34, 2.7], [0.2, 2.78]], 24, Math.PI * 0.6, Math.PI * 0.8), cloth('#6e2a22'));
  add(f.G, box(0.06, 0.5, 0.08), MAT_P.iron, -0.05, 1.15, -0.34).rotation.z = -0.2;
  const spear = new THREE.Group();
  f.arms[1].H.add(spear);
  add(spear, new THREE.CylinderGeometry(0.022, 0.022, 4.4, 6).translate(0, 1.0, 0), MAT.wood, 0, -0.08, 0);
  add(spear, new THREE.ConeGeometry(0.045, 0.3, 6).translate(0, 3.35, 0), MAT_P.iron, 0, -0.08, 0);
  f.spear = spear;
  f.soldier = true;
  return f;
}

// ---------------------------------------------------------------- animals
// The colt (Mark 11:2), a young donkey, built in cubits like the people and
// facing local +X. Legs hang from the body so they can swing.
function donkey() {
  const R = new THREE.Group();
  R.scale.setScalar(FIG);
  scene.add(R);
  const B = new THREE.Group();
  R.add(B);
  const coat = cloth('#857565'), dark = cloth('#3e342c'), muzzle = cloth('#d8d0c4');
  const len = 2.6, back = 2.2, depth = 0.95, width = 0.7;
  const cy = back - depth / 2, hl = len / 2;
  add(B, new THREE.SphereGeometry(1, 22, 14), coat, hl * 0.4, cy + 0.05, 0).scale.set(hl * 0.55, depth * 0.55, width * 0.5);
  add(B, new THREE.SphereGeometry(1, 22, 14), coat, 0, cy, 0).scale.set(hl * 0.78, depth * 0.5, width * 0.52);
  add(B, new THREE.SphereGeometry(1, 22, 14), coat, -hl * 0.5, cy + 0.02, 0).scale.set(hl * 0.5, depth * 0.5, width * 0.5);
  // The dark stripe along the back and across the shoulders.
  add(B, box(len * 0.9, 0.04, 0.1), dark, -0.05, back - 0.02, 0);
  add(B, box(0.1, 0.04, width * 0.9), dark, hl * 0.4, back - 0.04, 0).rotation.x = 0;
  const top = cy - depth * 0.2;
  const legs = [];
  for (const fx of [1, -1]) {
    for (const s of [-1, 1]) {
      const L = new THREE.Group();
      L.position.set(fx * hl * 0.58, top, s * width * 0.28);
      B.add(L);
      add(L, new THREE.CylinderGeometry(0.11, 0.06, top * 0.55, 8).translate(0, -top * 0.27, 0), coat);
      add(L, new THREE.CylinderGeometry(0.05, 0.055, top * 0.45, 8).translate(0, -top * 0.75, 0), coat);
      add(L, new THREE.CylinderGeometry(0.06, 0.07, 0.1, 8).translate(0, -top + 0.05, 0), dark);
      legs.push({ L, front: fx > 0, s });
    }
  }
  const N = new THREE.Group();
  N.position.set(hl * 0.8, cy + 0.15, 0);
  B.add(N);
  rod(N, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.36, 0.5, 0), 0.17, coat, 10);
  add(N, box(0.5, 0.08, 0.06), dark, 0.12, 0.42, 0).rotation.z = 0.95;
  const h = add(N, new THREE.SphereGeometry(1, 16, 12), coat, 0.55, 0.52, 0);
  h.scale.set(0.3, 0.15, 0.13);
  h.rotation.z = -0.7;
  add(N, new THREE.SphereGeometry(0.1, 12, 8), muzzle, 0.76, 0.34, 0).scale.set(1, 0.9, 1.1);
  for (const s of [-1, 1]) {
    const ear = add(N, new THREE.CylinderGeometry(0.03, 0.06, 0.42, 8).translate(0, 0.21, 0), coat, 0.42, 0.66, s * 0.07);
    ear.rotation.set(s * 0.35, 0, -0.25);
    add(N, new THREE.SphereGeometry(0.025, 8, 6), MAT_P.eye, 0.6, 0.6, s * 0.1);
  }
  add(B, tubeThrough([[-hl * 0.98, cy + 0.25, 0], [-hl * 1.04, cy - 0.1, 0], [-hl * 1.0, 1.0, 0]], 0.025, 10), coat);
  return { R, B, N, legs, back, stride: 1.4, top };
}
function poseBeast(b, moving, dist) {
  const sw = moving ? Math.sin((dist * Math.PI * 2) / b.stride) : 0;
  for (const { L, front, s } of b.legs) L.rotation.z = (front ? s : -s) * sw * 0.42;
  b.B.position.y = moving ? Math.abs(sw) * 0.02 : 0;
}

// ---------------------------------------------------------------- floors
// The height people stand at: the ground, or the floors built over it.
function floorAt(x, n) {
  const { x0, x1, n: hn, nicanor } = INNER;
  if (inPoly(x, n, PLATFORM.pts)) {
    if (x > x0 - 12 && x < x1 + 12 && Math.abs(n) < hn + 12) return x > x0 && x < nicanor && Math.abs(n) < hn ? INNER_Y : TERRACE_Y;
    return COURT_Y;
  }
  // The steps up to the east gate.
  if (x > GATES.east.x && x < 212 && Math.abs(n) < 4.5) return lerp(COURT_Y, ground(212, 2), (x - GATES.east.x) / (212 - GATES.east.x));
  // The upper room, its landing and the stair up to it.
  const ux = x - UR.x, un = n - UR.n;
  if (Math.abs(ux) < 7.8 && Math.abs(un) < 4.8) return UR_FLOOR;
  if (ux > 7.8 && ux < 10.4 && un > -4.4 && un < -2.4) return UR_FLOOR;
  if (ux > 8.8 && ux < 10.2 && un > -3.4 && un < 4.4) return lerp(UR_FLOOR, ground(x, n), (un + 3.4) / 7.8);
  // Golgotha's rock.
  const r = Math.hypot((x - GOLG.x) / 12.5, (n - GOLG.n) / 10.5);
  if (r < 1) return Math.max(ground(x, n), GOLG.y + 0.1 - 7.1 * (1 - smooth(clamp01((1 - r) / 0.55))));
  return ground(x, n);
}

// ---------------------------------------------------------------- walks & poses
// Everyone who moves has a start and a timeline. A walk is a group (named in
// STOPS[].build) and a smooth path from where the last one ended; its progress
// moves them along it, so jumping between stops puts everyone in the right
// place. A jump puts them somewhere at once (between days). A pose (sitting,
// lying down, riding) holds until their next walk. A walk's length sets how
// long it takes.
const actors = {};
function actor(key, obj, at, face) {
  actors[key] = { key, obj, start: { x: at.x, n: at.n, yaw: typeof face === 'number' ? face : yawTo(at, face) }, line: [], speed: 0 };
  return actors[key];
}
const yawOf = (face, at) => (typeof face === 'number' ? face : yawTo(at, face));
function lastEnd(a) {
  for (let i = a.line.length - 1; i >= 0; i--) if (a.line[i].end) return a.line[i].end;
  return a.start;
}
function walk(key, group, pts, { face, t0 = 0, t1 = 1, weight, jump } = {}) {
  const a = actors[key];
  const from = lastEnd(a);
  const end = pts.at(-1);
  if (!groups[group]) marker(group);
  const g = groups[group];
  (g.actors ??= []).push(key);
  if (jump) {
    const e = { kind: 'jump', group, end: { x: end.x, n: end.n, yaw: face != null ? yawOf(face, end) : from.yaw } };
    a.line.push(e);
    return e;
  }
  const curve = new THREE.CatmullRomCurve3([from, ...pts].map((p) => new THREE.Vector3(p.x, 0, -p.n)), false, 'centripetal');
  const len = curve.getLength();
  const tan = curve.getTangentAt(1);
  const w = { kind: 'walk', group, curve, len, from, t0, t1, end: { x: end.x, n: end.n, yaw: face != null ? yawOf(face, end) : Math.atan2(-tan.z, tan.x) } };
  a.line.push(w);
  PATHS.push([from, ...pts]);
  g.walk = true;
  g.weight = Math.max(g.weight ?? 0, weight ?? len / WALK_UNIT);
  return w;
}
function pose(key, group, p) {
  if (!groups[group]) marker(group);
  actors[key].line.push({ kind: 'pose', group, pose: p });
}
// Points `lane` metres to the right of a path.
function offsetPath(pts, lane) {
  return pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const l = Math.hypot(b.x - a.x, b.n - a.n) || 1;
    return P(p.x + ((b.n - a.n) / l) * lane, p.n - ((b.x - a.x) / l) * lane);
  });
}
// Where the i-th of n companions ends up round someone at `end` ({ x, n, yaw }).
function formSpot(form, i, n, end) {
  const c = Math.cos(end.yaw), s = Math.sin(end.yaw);
  let f, r, face = end.yaw, toLeader = false;
  if (Array.isArray(form)) [f, r, toLeader] = form[i];
  else if (form === 'follow') { f = -(1.3 + Math.floor(i / 2) * ROW_GAP); r = i % 2 ? 0.6 : -0.6; }
  else if (form === 'around' || form === 'behind') {
    const a = (form === 'behind' ? Math.PI : 0) + lerp(-1.2, 1.2, n > 1 ? i / (n - 1) : 0.5);
    const R = 2.4 + (i % 2) * 1.1;
    f = Math.cos(a) * R; r = Math.sin(a) * R; toLeader = true;
  } else if (form === 'ring') {
    const a = (i / n) * Math.PI * 2 + 0.4, R = 2.4 + (i % 2) * 0.8;
    f = Math.cos(a) * R; r = Math.sin(a) * R; toLeader = true;
  }
  const spot = { x: end.x + c * f + s * r, n: end.n + s * f - c * r };
  spot.face = toLeader ? yawTo(spot, end) : face;
  return spot;
}
// The leader walks `pts`; the others come too, a little behind, each in their
// own lane, and end in a formation round the leader (or jump there with them).
function together(group, lead, members, pts, { face, form = 'follow', weight, jump } = {}) {
  const lw = walk(lead, group, pts, { face, jump, weight });
  const n = members.length;
  const spots = members.map((k, i) => formSpot(form, i, n, lw.end));
  if (jump) {
    members.forEach((k, i) => walk(k, group, [spots[i]], { face: spots[i].face, jump: true }));
    return lw;
  }
  const maxRank = Math.ceil(n / 2);
  const D = Math.min(0.45, (maxRank * ROW_GAP + 1) / Math.max(lw.len, 1));
  lw.t1 = 1 - D;
  members.forEach((k, i) => {
    const rank = Math.floor(i / 2) + 1, lane = (i % 2 ? 1 : -1) * (0.45 + 0.2 * (rank % 2));
    const d = (D * rank) / maxRank;
    walk(k, group, [...offsetPath(pts.slice(0, -1), lane), spots[i]], { face: spots[i].face, t0: d, t1: 1 - D + d });
  });
  return lw;
}

const _pt = new THREE.Vector3(), _tan = new THREE.Vector3();
// Where someone is on a curve, s metres along it, turning from `fromYaw` at the start to `endYaw` at the end.
function onCurve(curve, len, s, fromYaw, endYaw) {
  const u = len > 0.01 ? clamp01(s / len) : 1;
  curve.getPointAt(u, _pt);
  curve.getTangentAt(u, _tan);
  let yaw = lerpAngle(fromYaw, Math.atan2(-_tan.z, _tan.x), smooth(clamp01(s / 0.9)));
  if (endYaw != null) yaw = lerpAngle(endYaw, yaw, smooth(clamp01((len - s) / 0.9)));
  return { x: _pt.x, z: _pt.z, yaw };
}
const STAND = {};
// Where someone is and the poses they are in ({ pose, w } blended in order).
function locate(a) {
  let at = { x: a.start.x, z: -a.start.n, yaw: a.start.yaw, moving: false }, ps = STAND, pw = 0, prev = null;
  for (const e of a.line) {
    const q = groupP(e.group);
    if (q <= 0) continue;
    if (e.kind === 'pose') {
      prev = pw > 0 ? { pose: ps, w: pw } : null;
      ps = e.pose; pw = smooth(clamp01(q * 1.6));
      continue;
    }
    if (e.kind === 'jump') { at = { x: e.end.x, z: -e.end.n, yaw: e.end.yaw, moving: false }; ps = STAND; pw = 0; prev = null; continue; }
    const u = clamp01((q - e.t0) / (e.t1 - e.t0));
    at = { ...onCurve(e.curve, e.len, walkEase(u) * e.len, e.from.yaw, e.end.yaw), moving: u > 0 && u < 1 };
    // Getting up at the start of a walk.
    prev = pw > 0 ? { pose: ps, w: pw * (1 - smooth(clamp01(u * 8))) } : null;
    ps = STAND; pw = 0;
  }
  at.mix = prev ? [prev, { pose: ps, w: pw }] : [{ pose: ps, w: pw }];
  return at;
}
// The pose a figure takes, blended in by w: sit (seat = metres up), lie
// ('front': face down; 'side': asleep), recline (at table), ride, cross, and
// the arms (out, fwd, bend).
function poseTarget(p, w) {
  const t = { sit: 0, seat: 0, front: 0, side: 0, recline: 0, ride: 0, cross: 0, out: POSE.out, fwd: POSE.fwd, bend: POSE.bend };
  if (p.sit != null) { t.sit = w; t.seat = p.seat ?? 0; }
  if (p.lie === 'front') { t.front = w; t.fwd = lerp(POSE.fwd, 2.9, w); t.bend = lerp(POSE.bend, 0.2, w); }
  if (p.lie === 'side') t.side = w;
  if (p.recline) { t.recline = w; t.bend = lerp(POSE.bend, 1.2, w); t.fwd = lerp(POSE.fwd, 0.5, w); }
  if (p.ride) { t.ride = w; t.fwd = lerp(POSE.fwd, 0.45, w); t.bend = lerp(POSE.bend, 0.9, w); }
  if (p.cross) { t.cross = w; t.out = lerp(POSE.out, 1.42, w); t.fwd = 0; t.bend = lerp(POSE.bend, 0.05, w); }
  for (const k of ['out', 'fwd', 'bend']) if (p[k] != null) t[k] = lerp(t[k], p[k], w);
  return t;
}
function applyPose(fig, t, step) {
  const { G, legs, arms, skirt } = fig;
  const seatU = t.seat / FIG;
  G.position.set(0, -(1.5 - seatU) * t.sit, 0);
  G.rotation.set(0, 0, 0);
  G.rotation.z = -Math.PI / 2 * t.front;
  G.position.y += 0.34 * t.front + 0.36 * t.side + 1.2 * t.recline;
  G.rotation.x = -Math.PI / 2 * t.side - (Math.PI / 2 - 0.55) * t.recline;
  const legSit = t.sit * (seatU > 0.5 ? 1.15 : 1.5);
  legs.forEach((L, i) => {
    const s = i ? 1 : -1;
    L.rotation.z = legSit + s * step * 0.32 + t.ride * 0.75 + (t.side + t.recline) * (i ? 0.25 : 0.6);
    L.rotation.x = t.ride * -s * 0.42;
  });
  skirt.scale.y = Math.max(0.12, 1 - 0.85 * Math.max(t.sit, t.ride * 0.8));
  skirt.rotation.z = (t.sit * 1.2 + t.ride * 0.3) * 0.35;
  for (const { S, E, s } of arms) {
    S.rotation.set(-s * t.out, 0, t.fwd - s * step * 0.22);
    E.rotation.set(0, 0, t.bend + Math.abs(step) * 0.1);
  }
}

// ---------------------------------------------------------------- the cast
// Clothes of the time: a tunic with two stripes, a belt, and a mantle; women
// in long tunics with a veil. Colours are natural wools and a few dyes; none of
// this is described in the Gospels. Jesus' tunic is woven in one piece (John 19:23).
const wool = (c) => cloth(c);
const DISCIPLES = ['peter', 'andrew', 'james', 'john', 'philip', 'bartholomew', 'matthew', 'thomas', 'jamesA', 'thaddaeus', 'simonZ', 'judas'];
const LOOKS = {
  jesus: { skin: '#a06c48', hair: '#24180f', beard: '#24180f', long: 0.35, hem: 0.45, tunic: striped('#e6dcc4', '#6a5a78'), mantle: wool('#cbbd9c'), sleeves: 'long' },
  peter: { skin: '#9c6a46', hair: '#6a645c', beard: '#7a746a', long: 0.5, tunic: striped('#a8926e', '#5a4632'), mantle: wool('#6e5a44') },
  andrew: { skin: '#a2714c', hair: '#3a2a1e', beard: '#3a2a1e', long: 0.6, tunic: striped('#c9b48e', '#6e4a2e'), mantle: wool('#7a6a50') },
  james: { skin: '#a8754f', hair: '#2e2218', beard: '#2e2218', long: 0.4, tunic: striped('#d2c3a0', '#3e4e6e'), mantle: wool('#5e6a72') },
  john: { skin: '#b07a52', hair: '#3a2618', beard: '#3a2618', long: 0.15, tunic: striped('#e0d4b8', '#8a3a2a'), mantle: wool('#8f7a5a') },
  philip: { skin: '#9a6644', hair: '#2a1e16', beard: '#2a1e16', long: 0.45, tunic: striped('#b8a27a', '#4a3a2a'), mantle: wool('#6a5e4e') },
  bartholomew: { skin: '#a06e4a', hair: '#463426', beard: '#463426', long: 0.7, tunic: striped('#cdbb95', '#5a6a3a'), mantle: wool('#8a7656') },
  matthew: { skin: '#aa7650', hair: '#2a2018', beard: '#2a2018', long: 0.3, tunic: striped('#d8cdb2', '#3a4a6a'), mantle: wool('#4e5a6a') },
  thomas: { skin: '#9e6c48', hair: '#30241a', beard: '#30241a', long: 0.5, tunic: striped('#bca884', '#7a4a2a'), mantle: wool('#7e6c52') },
  jamesA: { skin: '#a67450', hair: '#3e2e20', beard: '#3e2e20', long: 0.35, tunic: striped('#c4b08a', '#4a3a2e'), mantle: wool('#5c5044') },
  thaddaeus: { skin: '#a2704c', hair: '#2a1c14', beard: '#2a1c14', long: 0.55, tunic: striped('#d0bf9c', '#5e3a4a'), mantle: wool('#7a6248') },
  simonZ: { skin: '#9a6846', hair: '#3a2c20', beard: '#3a2c20', long: 0.45, tunic: striped('#b4a07c', '#4a5a3a'), mantle: wool('#6a5640') },
  judas: { skin: '#a6724e', hair: '#22180f', beard: '#22180f', long: 0.4, tunic: striped('#c8b896', '#6a2e2a'), mantle: wool('#5a4636') },
};
const cast = {};
for (const [k, look] of Object.entries(LOOKS)) cast[k] = figure(look);
const woman = (tunic, veil, o = {}) => figure({ skin: '#a87650', hair: '#2a1c12', female: true, hem: 0.12, sleeves: 'long', tunic: wool(tunic), veil: wool(veil), ...o });
Object.assign(cast, {
  maryM: woman('#9a6a5a', '#5e4a6a'),
  maryJ: woman('#7a6a52', '#4a5a6e'),
  salome: woman('#a88a5e', '#7a5a4a'),
  anointer: woman('#8a5a4a', '#c9b48e'),
  widow: woman('#5a5046', '#3a342e', { skin: '#9c6c4c', k: 0.94 }),
  girl: woman('#b09a74', '#8a6a4e', { k: 0.92 }),
  jarMan: figure({ skin: '#9e6a46', hair: '#2e2218', beard: '#2e2218', long: 0.3, tunic: striped('#c0ac86', '#5a4a3a'), hem: 0.8 }),
  simonC: figure({ skin: '#7a4e34', hair: '#1e1610', beard: '#1e1610', long: 0.4, tunic: striped('#b89c70', '#4a3020'), mantle: wool('#6a4a30') }),
  joseph: figure({ skin: '#a8754f', hair: '#8a8278', beard: '#9a9288', long: 0.8, hem: 0.4, sleeves: 'long', tunic: striped('#ece4d0', '#3a3a7a'), mantle: wool('#3e4a7a') }),
  nicodemus: figure({ skin: '#a2704c', hair: '#b8b2a8', beard: '#c8c2b8', long: 0.9, hem: 0.4, sleeves: 'long', tunic: striped('#e8e0cc', '#6a3a4a'), mantle: wool('#7a4a3a') }),
  youngMan: figure({ skin: '#b07a52', hair: '#2e2218', hem: 0.3, sleeves: 'long', tunic: wool('#fbfaf6') }),
  pilate: figure({ skin: '#c08e6a', hair: '#4a3a2a', hem: 0.7, sleeves: 'long', tunic: striped('#f2eee4', '#7a2a4a'), mantle: wool('#8e2a28') }),
  caiaphas: figure({ skin: '#a8754f', hair: '#4a4038', beard: '#5a5048', long: 0.8, hem: 0.3, sleeves: 'long', tunic: wool('#f0eadc'), mantle: wool('#4a5a8a'), cloth: wool('#f0eadc') }),
  barabbas: figure({ skin: '#9a6644', hair: '#1e1610', beard: '#1e1610', long: 0.5, hem: 0.9, tunic: wool('#8a7a60') }),
  q1: figure({ skin: '#a8754f', hair: '#3a2e24', beard: '#3a2e24', long: 0.7, hem: 0.35, sleeves: 'long', tunic: wool('#e6dcc6'), mantle: striped('#dcd2bc', '#3a4a7a'), cloth: wool('#e6dcc6') }),
  q2: figure({ skin: '#a2704c', hair: '#2a2018', beard: '#2a2018', long: 0.6, hem: 0.35, sleeves: 'long', tunic: wool('#d8ccb0'), mantle: striped('#e2d8c0', '#3a4a7a'), cloth: wool('#d8ccb0') }),
  q3: figure({ skin: '#aa7852', hair: '#2e2218', hem: 0.6, tunic: striped('#cfc6b0', '#7a2a3a'), mantle: wool('#7a3a3a') }),
  robber1: figure({ skin: '#9a6644', hair: '#2a1e16', beard: '#2a1e16', hem: 1.1, tunic: wool('#d8ccb0') }),
  robber2: figure({ skin: '#a06c48', hair: '#3a2a1e', beard: '#3a2a1e', hem: 1.1, tunic: wool('#d8ccb0') }),
  centurion: soldier({ mantle: wool('#6e2a22') }),
  s1: soldier(), s2: soldier(), s3: soldier(), s4: soldier(),
});
const colt = donkey();
// Everyone shows only while their part of the story is told.
const SHOW = {
  ...Object.fromEntries(DISCIPLES.map((k) => [k, ['', k === 'peter' ? 'toPilate' : 'ledAway']])),
  colt: ['', 'monday'], maryM: ['crucified', ''], maryJ: ['crucified', ''], salome: ['crucified', 'takenDown'],
  anointer: ['wednesday', 'thursday'], widow: ['toTreasury', 'leaveTemple'], girl: ['ledAway', 'toPilate'], jarMan: ['thursday', 'evening'],
  simonC: ['toGate', 'takenDown'], joseph: ['takenDown', 'saturday'], nicodemus: ['takenDown', 'saturday'], youngMan: ['sunday', ''],
  pilate: ['toPilate', 'toGate'], caiaphas: ['ledAway', 'toGate'], barabbas: ['toPilate', 'toGate'],
  q1: ['tuesday', 'toTreasury'], q2: ['tuesday', 'toTreasury'], q3: ['tuesday', 'toTreasury'],
  robber1: ['crucified', 'takenDown'], robber2: ['crucified', 'takenDown'], centurion: ['crucified', 'takenDown'],
  s1: ['arrestCome', 'takenDown'], s2: ['arrestCome', 'takenDown'], s3: ['toGate', 'takenDown'], s4: ['toGate', 'takenDown'],
  jesus: ['', 'takenDown'],
};
// The guards at the tomb (Matthew 27:65-66) are the same four soldiers, back on the Saturday.
const GUARD_SHOW = ['saturday', 'sunday'];

// ---------------------------------------------------------------- the week
// Who goes where, stop by stop, in the order of the tour (walks must be
// declared in that order). Each name is a group in STOPS[].build.
const ELEVEN = DISCIPLES.filter((k) => k !== 'judas');
const OTHERS = (...keys) => DISCIPLES.filter((k) => !keys.includes(k));
// Places at a low table, reclining round three sides of it, feet outward.
function diners(c, keys, R, a0 = -Math.PI * 0.75, a1 = Math.PI * 0.75) {
  return keys.map((k, i) => {
    const a = lerp(a0, a1, keys.length > 1 ? i / (keys.length - 1) : 0.5);
    return { k, x: c.x + Math.cos(a) * R, n: c.n + Math.sin(a) * R, face: Math.atan2(Math.cos(a), -Math.sin(a)) };
  });
}
const reclineAt = (group, list) => list.forEach(({ k, x, n, face }) => { walk(k, group, [P(x, n)], { face, jump: true }); pose(k, group, { recline: true }); });

// Sunday: on the road from Bethany, at Bethphage (Mark 11:1).
const J0 = { x: 1528, n: 226, yaw: Math.PI * 0.93 };
actor('colt', colt, P(1478, 280), -Math.PI / 2);
actor('jesus', cast.jesus, J0, J0.yaw);
DISCIPLES.forEach((k, i) => { const s = formSpot('follow', i, 12, J0); actor(k, cast[k], s, s.face); });
for (const k of Object.keys(cast)) if (!actors[k]) actor(k, cast[k], P(0, -2000), 0);
// Bethphage: two disciples fetch the colt, tied at a door outside in the street (11:4).
{
  const two = ['andrew', 'philip'];
  walk('andrew', 'twoGo', [P(1500, 262), P(1480, 276.5)], { face: P(1478, 280) });
  walk('philip', 'twoGo', [P(1502, 258), P(1476.6, 277)], { face: P(1478, 280) });
  walk('colt', 'twoBack', [P(1490, 266), P(1508, 244), P(1525, 229.4)], { face: Math.PI });
  walk('andrew', 'twoBack', [P(1492, 268), P(1508, 247), P(1522, 233)]);
  walk('philip', 'twoBack', [P(1488, 264), P(1505, 242), P(1520, 231)]);
  void two;
}
// They throw their cloaks on it, and he sits on it (11:7).
const coltCloaks = new THREE.Group();
colt.B.add(coltCloaks);
for (const [c, y, w] of [['#6e5a44', 2.22, 1.25], ['#7a6a50', 2.3, 1.05], ['#5e6a72', 2.36, 0.85]]) {
  const m = add(coltCloaks, box(w, 0.06, 1.05), cloth(c), -0.05, y - 0.04, 0);
  piece('cloaks', m, 'drop', 0.8);
}
pose('jesus', 'mount', { ride: 'colt' });
// Down the Mount of Olives, the crowd spreading cloaks and branches on the road (11:8-10).
together('ride1', 'colt', DISCIPLES, ROUTES.ride1, { face: P(0, 0) });
// He weeps over the city (Luke 19:41): no one moves.
marker('wept');
together('ride2', 'colt', DISCIPLES, ROUTES.ride2.slice(0, 9).concat([P(224, 4.5)]), { face: Math.PI });
walk('jesus', 'dismount', [P(221, 2.2)], { face: Math.PI });
const INTO = [P(214, 1), P(190, 0.5), P(166, 0), P(150, -2), P(134, -14), P(120, -34), P(100, -62)];
together('inTemple', 'jesus', DISCIPLES, INTO, { face: P(40, 0), form: 'behind' });

// Monday: the fig tree on the way from Bethany (11:12-14), then the temple (11:15-17).
together('monday', 'jesus', DISCIPLES, [P(1790, -48)], { jump: true, face: P(1700, 40) });
together('toFig', 'jesus', DISCIPLES, [P(1760, -12), P(1730, 14), P(1708.6, 33.8)], { face: SITES.figTree, form: 'behind' });
marker('searchFig');
together('templeMon', 'jesus', DISCIPLES, [P(150, -4)], { jump: true, face: Math.PI });
const TABLES_N = -271.5;
together('toStoa', 'jesus', DISCIPLES, [P(134, -50), P(110, -140), P(90, -220), P(76, TABLES_N + 3)], { face: Math.PI, form: 'behind' });
walk('jesus', 'overturn', [P(60, TABLES_N + 1.6), P(40, TABLES_N + 1.6), P(24, TABLES_N + 1.8)], { face: Math.PI, weight: 3 });
pose('jesus', 'overturn', { fwd: 1.0, bend: 0.5, out: 0.3 });

// Tuesday: questions in the temple courts (12:13-17), in Solomon's Portico (the place is a guess).
together('tuesday', 'jesus', DISCIPLES, [P(146, -120)], { jump: true, face: Math.PI, form: 'behind' });
for (const [k, f, r] of [['q1', 2.6, -0.9], ['q2', 2.8, 0.7], ['q3', 3.3, -2]]) {
  walk(k, 'tuesday', [P(90, -150)], { jump: true });
  const sp = { x: 146 - f, n: -120 - r * -1 };
  walk(k, 'questioners', [P(110, -140), P(sp.x, sp.n)], { face: P(146, -120) });
}
marker('coin');
// The widow's two coins at the treasury, in the Court of the Women (12:41-44).
const TREASURY_SEAT = P(100, -31);
together('toTreasury', 'jesus', DISCIPLES, [P(150, -80), P(140, -10), P(129, 0), P(118, -4), P(106, -22), TREASURY_SEAT], { face: Math.PI / 2, form: 'around' });
for (const k of ['jesus', ...DISCIPLES]) pose(k, 'sitTreasury', { sit: true });
const WIDOW_CHEST = CHESTS[3];
walk('widow', 'toTreasury', [P(118, 6)], { jump: true });
walk('widow', 'widowGives', [P(112, 16), P(WIDOW_CHEST.x + 0.4, WIDOW_CHEST.n - 1.15)], { face: Math.PI / 2 });
// Out of the temple and over to the Mount of Olives, opposite it (13:1-3).
const OLIVE_SEAT = P(560, 4);
together('leaveTemple', 'jesus', DISCIPLES, [P(106, -12), P(118, -2), P(129, 0), P(145, 0), P(166, 0), P(190, 0.5), P(214, 1), P(250, 8), P(300, 16), P(360, 24), P(430, 22), P(500, 12), OLIVE_SEAT], { face: Math.PI, form: 'around' });
for (const k of ['jesus', 'peter', 'james', 'john', 'andrew']) pose(k, 'sitOlives', { sit: true });

// Wednesday: at table in Simon's house at Bethany; the woman with the flask of nard (14:3-9).
const SH_TABLE = P(SH.x - 0.5, SH.n + 0.6);
const SH_PLACES = diners(SH_TABLE, ['bartholomew', 'thomas', 'matthew', 'philip', 'andrew', 'john', 'jesus', 'peter', 'james', 'judas', 'jamesA', 'thaddaeus', 'simonZ'], 2.9, -Math.PI * 0.2, Math.PI * 1.2);
reclineAt('wednesday', SH_PLACES);
const JESUS_SH = SH_PLACES.find((p) => p.k === 'jesus');
walk('anointer', 'wednesday', [P(SH.x + 1, SH.n - 9)], { jump: true });
walk('anointer', 'woman', [P(SH.x + 0.2, SH.n - 5.6), P(JESUS_SH.x + (JESUS_SH.x - SH_TABLE.x) * 0.1 - 0.9, JESUS_SH.n - 0.4)], { face: P(JESUS_SH.x - 0.3, JESUS_SH.n + 1.2) });
marker('pour');
// Judas goes to the chief priests (14:10-11).
walk('judas', 'judasGoes', [P(SH.x + 0.3, SH.n - 3.5), P(SH.x + 0.2, SH.n - 6), P(SH.x - 20, SH.n - 14), P(SH.x - 80, SH.n + 10), P(SH.x - 170, SH.n + 60)]);

// Thursday: the man carrying a jar of water leads two of them to the house (14:12-16).
const UR_DOOR = P(UR.x + 7.6, UR.n - 3.4);
const UR_UP = [P(UR.x + 9.5, UR.n + 5), P(UR.x + 9.5, UR.n + 4), P(UR.x + 9.5, UR.n - 3.1), UR_DOOR];
walk('jarMan', 'thursday', [P(SITES.siloam.x - 4, SITES.siloam.n + 22)], { jump: true, face: Math.PI * 0.9 });
together('thursday', 'peter', ['john'], [P(-58, -892)], { jump: true, face: Math.PI * 0.8 });
together('thursday', 'jesus', OTHERS('peter', 'john'), [P(2290, -650)], { jump: true });
const JAR_WAY = [P(-110, -812), P(-200, -800), P(-320, -770), P(-450, -742), P(-540, -712), P(UR.x + 9.5, UR.n + 9), ...UR_UP];
walk('jarMan', 'followJar', JAR_WAY, { face: Math.PI });
walk('peter', 'followJar', [P(-90, -840), ...JAR_WAY.slice(0, -2), P(UR.x + 9.5, UR.n + 1.5), P(UR.x + 9.5, UR.n - 1.2)], { t0: 0.04, face: Math.PI / 2 });
walk('john', 'followJar', [P(-92, -846), ...offsetPath(JAR_WAY.slice(0, -3), 0.7), P(UR.x + 9.5, UR.n + 4.8)], { t0: 0.07, face: Math.PI / 2 });
// The supper in the upper room (14:17-25), Judas going out into the night (John 13:30).
const UR_TABLE = P(UR.x - 0.8, UR.n + 0.2);
const UR_PLACES = diners(UR_TABLE, ['thaddaeus', 'simonZ', 'jamesA', 'thomas', 'james', 'judas', 'jesus', 'john', 'peter', 'andrew', 'philip', 'bartholomew', 'matthew'], 2.85, -Math.PI * 0.15, Math.PI * 1.15);
reclineAt('evening', UR_PLACES);
marker('bread');
marker('cup');
walk('judas', 'judasOut', [P(UR.x + 4, UR.n - 2.6), UR_DOOR, P(UR.x + 9.5, UR.n - 3.1), P(UR.x + 9.5, UR.n + 4.4), P(UR.x + 12, UR.n + 12), P(-520, -640), P(-470, -560)]);
// They sing a hymn and go out to the Mount of Olives (14:26), across the Kidron to the garden (John 18:1).
const DOWN = [UR_DOOR, P(UR.x + 9.5, UR.n - 3.1), P(UR.x + 9.5, UR.n + 4.4), P(UR.x + 12, UR.n + 9)];
const TO_GETH = [...DOWN, P(-540, -720), P(-420, -762), P(-300, -800), P(-180, -828), P(-110, -862), P(-62, -896), P(-40, -914), P(-12, -936), P(60, -930), P(150, -890), P(200, -700), P(245, -450), P(272, -200), P(288, 0), P(306, 62), P(323, 98), P(340, 108)];
together('hymn', 'jesus', ELEVEN, TO_GETH, { face: 0.5 });
// "Sit here while I pray" (14:32); Peter, James and John a little farther; he farther still and falls on the ground (14:33-35).
const PRAY_AT = P(381, 129);
together('toPray', 'jesus', ['peter', 'james', 'john'], [P(356, 116), P(368, 123), PRAY_AT], { face: 0.6, form: [[-6, -1.6, true], [-6.6, 0.4, true], [-5.4, 2.0, true]] });
pose('jesus', 'pray', { lie: 'front' });
for (const k of ELEVEN) pose(k, 'sleep', { lie: 'side' });

// Friday, in the night: Judas comes with a crowd from the chief priests (14:43-50).
const MEET = P(352, 114);
walk('judas', 'arrestCome', [P(214, 4)], { jump: true });
const COME = [P(240, 8), P(275, 18), P(300, 40), P(318, 90), P(323, 100), P(338, 109), P(MEET.x - 2.2, MEET.n - 0.6)];
walk('judas', 'arrestCome', COME, { face: 0.3 });
walk('s1', 'arrestCome', [P(208, 0)], { jump: true });
walk('s2', 'arrestCome', [P(206, 6)], { jump: true });
walk('s1', 'arrestCome', offsetPath(COME, 1.4).slice(0, -1).concat([P(MEET.x - 4, MEET.n - 2.4)]), { t0: 0.08, face: 0.3 });
walk('s2', 'arrestCome', offsetPath(COME, -1.4).slice(0, -1).concat([P(MEET.x - 4.6, MEET.n + 1.2)]), { t0: 0.1, face: 0.3 });
// "Get up, let us go" (14:42).
walk('jesus', 'rise', [P(372, 124), P(360, 118), P(MEET.x + 0.4, MEET.n)], { face: Math.PI });
for (const k of ELEVEN) pose(k, 'rise', { up: true });
walk('judas', 'kiss', [P(MEET.x - 0.55, MEET.n)], { face: 0 });
walk('s1', 'seize', [P(MEET.x + 0.3, MEET.n - 0.75)], { face: Math.PI / 2 });
walk('s2', 'seize', [P(MEET.x + 0.3, MEET.n + 0.75)], { face: -Math.PI / 2 });
// "And they all left him and fled" (14:50).
ELEVEN.forEach((k, i) => {
  const a = 0.3 + (i / 10) * 2.6 - 1.3, d = 70 + (i % 3) * 20;
  const at = lastEnd(actors[k]);
  walk(k, 'flee', [P(at.x + Math.cos(a) * d * 0.4, at.n + Math.sin(a) * d * 0.4), P(at.x + Math.cos(a) * d, at.n + Math.sin(a) * d)], { weight: 1.2 });
});
// Jesus is led to the high priest; Peter follows at a distance into the courtyard (14:53-54).
const HP_IN = [P(HP.x, HP.n + 22), P(HP.x, HP.n + 14.5), P(HP.x, HP.n + 6)];
const TO_HP = [P(330, 100), P(305, 60), P(286, 0), P(270, -200), P(244, -450), P(200, -700), P(150, -890), P(60, -930), P(-12, -936), P(-40, -914), P(-70, -880), P(-150, -836), P(-260, -790), P(-340, -756), P(-380, -720), ...HP_IN];
const HALL = P(HP.x - 1, HP.n - 9);
together('ledAway', 'jesus', ['s1', 's2'], [...TO_HP, HALL], { face: -Math.PI / 2, form: [[1.4, -1.2, false], [1.4, 1.2, false]] });
walk('judas', 'ledAway', [P(0, -2000)], { jump: true });
walk('caiaphas', 'ledAway', [P(HP.x - 1, HP.n - 12.8)], { jump: true, face: Math.PI / 2 });
walk('peter', 'ledAway', [...TO_HP, P(HP_FIRE.x + 1.1, HP_FIRE.n + 0.9)], { t0: 0.2, face: P(HP_FIRE.x, HP_FIRE.n) });
pose('peter', 'warm', { sit: true, seat: 0.35 });
walk('girl', 'ledAway', [P(HP.x + 8, HP.n - 9)], { jump: true });
walk('girl', 'girl', [P(HP.x + 8, HP.n - 4), P(HP_FIRE.x + 1.6, HP_FIRE.n + 2.4)], { face: P(HP_FIRE.x + 1.1, HP_FIRE.n + 0.9) });

// Early in the morning they lead him to Pilate (15:1-15).
const BEFORE_BEMA = P(BEMA.x + 7.5, BEMA.n);
const TO_PILATE = [P(HP.x - 1, HP.n - 2), ...HP_IN.slice().reverse(), P(-420, -650), P(-470, -540), P(-515, -420), P(-545, -310), P(-556, -240), P(-563, -205), BEFORE_BEMA];
together('toPilate', 'jesus', ['s1', 's2'], TO_PILATE, { face: Math.PI, form: [[-0.5, -1.4, false], [-0.5, 1.4, false]] });
walk('peter', 'toPilate', [P(0, -2000)], { jump: true });
walk('pilate', 'toPilate', [P(BEMA.x - 1.2, BEMA.n)], { jump: true, face: 0 });
pose('pilate', 'toPilate', { sit: true, seat: 2.1 });
walk('caiaphas', 'toPilate', [P(BEMA.x + 10.5, BEMA.n + 3.5)], { jump: true, face: P(BEMA.x, BEMA.n) });
walk('barabbas', 'toPilate', [P(BEMA.x - 8, BEMA.n - 5)], { jump: true, face: 0 });
walk('barabbas', 'barabbas', [P(BEMA.x + 2, BEMA.n - 8), P(BEMA.x + 20, BEMA.n - 18), P(BEMA.x + 60, BEMA.n - 26), P(BEMA.x + 110, BEMA.n - 30)]);

// Simon of Cyrene, coming in from the country, is made to carry the cross (15:20-22),
// behind Jesus (Luke 23:26), out to Golgotha.
const GATE_OUT = P(-528, -22);
const TO_GATE = [P(BEMA.x + 9, BEMA.n + 6), P(-558, -150), P(-543, -95), P(-524, -62), GATES.gennath, GATE_OUT];
together('toGate', 'jesus', ['s1', 's2', 's3', 's4'], TO_GATE, { face: Math.PI * 0.7, form: [[1.2, -1.3, false], [1.2, 1.3, false], [-2.6, -1.1, false], [-2.6, 1.1, false]] });
walk('s3', 'toGate', [P(BEMA.x + 4, BEMA.n - 3)], { jump: true });
walk('s4', 'toGate', [P(BEMA.x + 4, BEMA.n + 3)], { jump: true });
walk('simonC', 'toGate', [P(-760, 30)], { jump: true });
walk('simonC', 'toGate', [P(-680, 14), P(-600, -4), P(GATE_OUT.x - 2.2, GATE_OUT.n + 1.2)], { face: 0 });
marker('compel');
const UP_ROCK = [P(-540, -2), P(-556, 22), P(-566, 40), P(GOLG.x + 1.6, GOLG.n)];
together('toGolgotha', 'jesus', ['simonC', 's1', 's2', 's3', 's4'], UP_ROCK, { face: 0, form: [[-1.8, 0, false], [1.4, -1.5, false], [1.6, 1.6, false], [-3.2, -1.6, false], [-3.4, 1.5, false]] });

// The crucifixion, with the two robbers (15:24-27), and the darkness (15:33).
const CROSS = (k) => ({ x: GOLG.x, n: GOLG.n + k * 3.4, y: GOLG.y + 2.15, yaw: 0 });
pose('jesus', 'crucified', { cross: CROSS(0) });
pose('robber1', 'crucified', { cross: CROSS(-1) });
pose('robber2', 'crucified', { cross: CROSS(1) });
[['s1', 4.5, -3], ['s2', 5.5, -1], ['s3', 5, 1.4], ['s4', 3.8, 3]].forEach(([k, dx, dn]) => {
  walk(k, 'crucified', [P(GOLG.x + dx, GOLG.n + dn)], { jump: true, face: P(GOLG.x + 4.7, GOLG.n) });
  pose(k, 'crucified', { sit: true });
});
walk('centurion', 'crucified', [P(GOLG.x + 3.6, GOLG.n - 6)], { jump: true, face: P(GOLG.x, GOLG.n) });
// The women looking on from a distance (15:40).
[['maryM', 0, 0], ['maryJ', 1.1, 0.9], ['salome', -1, 1.2]].forEach(([k, dx, dn]) => walk(k, 'crucified', [P(-516 + dx, 92 + dn)], { jump: true, face: P(GOLG.x, GOLG.n) }));
walk('simonC', 'crucified', [P(0, -2000)], { jump: true });
marker('dark');
// Joseph of Arimathea takes the body down and lays it in a tomb cut in the rock (15:42-47),
// with Nicodemus (John 19:39); the two Marys see where he is laid.
walk('joseph', 'takenDown', [P(GOLG.x + 1.4, GOLG.n - 0.4)], { jump: true, face: Math.PI / 2 });
walk('nicodemus', 'takenDown', [P(GOLG.x + 1.4, GOLG.n + 1.6)], { jump: true, face: -Math.PI / 2 });
walk('maryM', 'takenDown', [P(DOOR.x + 15, DOOR.n - 5)], { jump: true, face: P(DOOR.x, DOOR.n) });
walk('maryJ', 'takenDown', [P(DOOR.x + 15.5, DOOR.n - 3.6)], { jump: true, face: P(DOOR.x, DOOR.n) });
for (const k of ['maryM', 'maryJ']) pose(k, 'takenDown', { sit: true });
const TO_TOMB = [P(GOLG.x - 3, GOLG.n - 2), P(GOLG.x - 7, GOLG.n - 8), P(DOOR.x + 10, DOOR.n + 6), P(DOOR.x + 4, DOOR.n + 0.5), P(DOOR.x + 0.4, DOOR.n), P(TOMB.x + 0.6, TOMB.n + 0.1)];
const BEARER_GAP = 1.9;
walk('joseph', 'carry', TO_TOMB, { t1: 0.92 });
walk('nicodemus', 'carry', [P(GOLG.x - 1.5, GOLG.n - 0.5), ...TO_TOMB.slice(0, -1), P(TOMB.x + 0.6 + BEARER_GAP, TOMB.n + 0.05)], { t0: 0.06, face: Math.PI });
walk('joseph', 'outTomb', [P(DOOR.x + 2.2, DOOR.n - 0.4), P(DOOR.x + 1.4, DOOR.n + 1.9)], { face: -Math.PI / 2 });
walk('nicodemus', 'outTomb', [P(DOOR.x + 3, DOOR.n + 0.4), P(DOOR.x + 3.6, DOOR.n - 1.6)], { face: Math.PI * 0.8 });
marker('rollStone');
// The Sabbath: the stone sealed and a guard set (Matthew 27:62-66).
[['s1', 2.6, -2.6], ['s2', 2.6, 2.6], ['s3', 6, -3.2], ['s4', 6, 3.2]].forEach(([k, dx, dn]) => walk(k, 'saturday', [P(DOOR.x + dx, DOOR.n + dn)], { jump: true, face: 0 }));
for (const k of ['maryM', 'maryJ', 'joseph', 'nicodemus']) walk(k, 'saturday', [P(0, -2000)], { jump: true });
marker('seal');
// The first day of the week: the women come with spices at sunrise (16:1-8).
walk('youngMan', 'sunday', [P(TOMB.x + 0.3, TOMB.n + 0.62)], { jump: true, face: -Math.PI / 2 + 0.5 });
pose('youngMan', 'sunday', { sit: true, seat: 0.55 });
for (const [k, dx, dn] of [['maryM', 0, 0], ['maryJ', -1.2, 1], ['salome', -1.2, -1]]) walk(k, 'sunday', [P(GATE_OUT.x + dx, GATE_OUT.n + dn)], { jump: true });
together('womenCome', 'maryM', ['maryJ', 'salome'], [P(-545, 0), P(-570, 6), P(DOOR.x + 9, DOOR.n + 3), P(DOOR.x + 3.2, DOOR.n)], { face: Math.PI, form: [[-1, -1.1, false], [-1.2, 1.1, false]] });
together('lookIn', 'maryM', ['maryJ', 'salome'], [P(DOOR.x + 1.2, DOOR.n), P(TOMB.x + 1.1, TOMB.n - 0.3)], { face: Math.PI * 0.85, form: [[0.2, -0.5, false], [1.4, 0.1, false]] });

// ---------------------------------------------------------------- things carried
// The cross beam, carried first by Jesus (John 19:17), then by Simon (Mark 15:21).
function beam(fig) {
  const b = add(fig.G, box(0.32, 0.32, 3.8), MAT.darkWood, -0.12, 2.66, 0);
  b.position.y -= 0.16;
  return b;
}
const beams = { jesus: shown(beam(cast.jesus), 'toGate', 'compel'), simonC: shown(beam(cast.simonC), 'compel', 'crucified') };
// The crosses on the rock, with the charge written over him (15:26).
const crosses = new THREE.Group();
scene.add(crosses);
shown(crosses, 'crucified', 'saturday');
for (const k of [-1, 0, 1]) {
  const c = CROSS(k);
  const G = new THREE.Group();
  G.position.set(c.x - 0.12, GOLG.y - 0.5, -c.n);
  crosses.add(G);
  add(G, box(0.22, 4.9 + (k ? 0 : 0.5), 0.22), MAT.darkWood);
  add(G, box(0.18, 0.18, 2.1), MAT.darkWood, 0.05, 2.15 + 1.28 + 0.4 + 0.18, 0);
  if (!k) {
    const sign = canvasTexture(128, (g, w, h) => {
      g.fillStyle = '#e8dfca'; g.fillRect(0, 0, w, h);
      g.fillStyle = '#2a2018';
      for (let r = 0; r < 3; r++) for (let x = 10; x < w - 10; x += 6 + rand() * 6) g.fillRect(x, 9 + r * 15, 3 + rand() * 3, 7);
    }, 52);
    add(G, box(0.04, 0.32, 0.8), new THREE.MeshStandardMaterial({ map: sign, roughness: 1 }), 0.13, 5.0, 0);
  }
}
// His body, wrapped in linen (15:46).
const body = new THREE.Group();
scene.add(body);
shown(body, 'takenDown', 'sunday');
add(body, new THREE.CapsuleGeometry(0.2, 1.4, 6, 14).rotateZ(Math.PI / 2), new THREE.MeshStandardMaterial({ map: canvasTexture(64, (g, sz) => weave(g, sz, '#f1ecdf')), roughness: 1 }));
const BENCH = v3(TOMB.x, TOMB.n + 1.05, TOMB.y + 0.75);
// The stone across the door, and the seal on it (Matthew 27:66).
const STONE_OPEN = TOMB.n - 2.1;
const seal = new THREE.Group();
scene.add(seal);
shown(seal, 'seal', 'sunday');
add(seal, box(0.03, 0.03, 3.2), cloth('#8a6a3a'), TOMB.x + 3.35, TOMB.y + 1.1, -TOMB.n);
add(seal, new THREE.SphereGeometry(0.09, 10, 8), cloth('#9a4a2a'), TOMB.x + 3.36, TOMB.y + 1.1, -TOMB.n - 0.9);
add(seal, new THREE.SphereGeometry(0.09, 10, 8), cloth('#9a4a2a'), TOMB.x + 3.36, TOMB.y + 1.1, -TOMB.n + 1.25);
piece('seal', seal, 'grow');
// In someone's hand: a group in figure units at the hand.
function inHand(fig, side, obj) {
  fig.arms[side].H.add(obj);
  return obj;
}
// The coin with Caesar's likeness (12:16).
const coin = shown(inHand(cast.jesus, 1, add(new THREE.Group(), cylX(0.06, 0.012, 16).rotateY(Math.PI / 2), MAT.silver, 0.02, -0.16, 0).parent), 'coin', 'toTreasury');
// The widow's two small copper coins (12:42).
const coinsDrop = [0, 1].map((i) => {
  const m = add(scene, new THREE.CylinderGeometry(0.018, 0.018, 0.005, 10), MAT.bronze, WIDOW_CHEST.x + 0.05 * i, TERRACE_Y + 1.92, -WIDOW_CHEST.n);
  return piece('twoCoins', m, 'drop', 0.6);
});
// The flask of nard (14:3).
const flask = new THREE.Group();
add(flask, lathe([[0.001, -0.25], [0.07, -0.24], [0.1, -0.15], [0.09, -0.04], [0.04, 0.02], [0.04, 0.09], [0.06, 0.1]], 16), new THREE.MeshStandardMaterial({ color: 0xf2ece0, roughness: 0.35 }), 0, -0.05, 0);
inHand(cast.anointer, 1, flask).position.set(0.05, -0.12, 0);
const oilMat = new THREE.MeshStandardMaterial({ color: 0xd9b860, roughness: 0.2, transparent: true, opacity: 0.8 });
const oil = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.012, 1, 6, 1, true).translate(0, 0.5, 0), oilMat);
oil.visible = false;
scene.add(oil);
// The water jar on the man's shoulder (14:13).
const jar = add(cast.jarMan.G, lathe([[0.001, -0.5], [0.12, -0.48], [0.26, -0.3], [0.28, -0.05], [0.2, 0.2], [0.09, 0.32], [0.08, 0.42], [0.11, 0.45]], 18), cloth('#b8744a'), 0, 2.95, -0.34);
jar.rotation.x = 0.35;
// Bread and the cup (14:22-23), on the table and in his hand.
const bread = shown(inHand(cast.jesus, 1, add(new THREE.Group(), new THREE.CylinderGeometry(0.16, 0.16, 0.06, 14).rotateX(Math.PI / 2), cloth('#c99a5c'), 0.06, -0.14, 0).parent), 'bread', 'cup');
const cup = shown(inHand(cast.jesus, 1, add(new THREE.Group(), lathe([[0.001, 0], [0.05, 0.01], [0.03, 0.06], [0.03, 0.1], [0.09, 0.16], [0.1, 0.24]], 14), MAT.bronze, 0.06, -0.12, 0).parent), 'cup', 'hymn');
// Spices for the women (16:1).
for (const k of ['maryM', 'maryJ', 'salome']) shown(inHand(cast[k], 1, add(new THREE.Group(), lathe([[0.001, -0.2], [0.07, -0.19], [0.08, -0.05], [0.04, 0.02], [0.05, 0.05]], 12), cloth('#c8b48a'), 0.04, -0.1, 0).parent), 'womenCome', '');

// Low tables with bread, cups and lamps, in Simon's house and the upper room.
const lamps = [];
function table(c, y) {
  const G = placed(c.x, c.n, y);
  add(G, new THREE.CylinderGeometry(1.35, 1.35, 0.06, 28), MAT.wood, 0, 0.42, 0);
  add(G, new THREE.CylinderGeometry(0.9, 1.1, 0.42, 20), MAT.darkWood);
  for (let k = 0; k < 4; k++) add(G, new THREE.CylinderGeometry(0.12, 0.12, 0.05, 12), cloth('#c99a5c'), Math.cos(k * 1.6) * 0.6, 0.48, Math.sin(k * 1.6) * 0.6);
  for (let k = 0; k < 3; k++) add(G, lathe([[0.001, 0], [0.04, 0.01], [0.03, 0.05], [0.06, 0.1], [0.06, 0.13]], 10), cloth('#9a6a4a'), Math.cos(k * 2.1 + 0.5) * 0.35, 0.45, Math.sin(k * 2.1 + 0.5) * 0.35);
  add(G, new THREE.CylinderGeometry(0.28, 0.2, 0.08, 16), cloth('#8a5a3a'), 0, 0.48, 0);
  for (const [lx, lz] of [[0.95, 0.4], [-0.9, -0.5]]) {
    add(G, new THREE.SphereGeometry(0.07, 10, 6), cloth('#a8744a'), lx, 0.48, lz).scale.y = 0.5;
    flame(G, lx + 0.06, 0.5, lz, 0.06, 0.018);
    lamps.push(new THREE.Vector3(c.x + lx, y + 0.9, -c.n + lz));
  }
  return G;
}
table(SH_TABLE, SH.y);
table(UR_TABLE, UR_FLOOR);

// The tables of the money changers and the seats of those who sold doves
// (11:15), in the Royal Stoa, overturned one after another.
{
  const r = mulberry32(5);
  for (let x = 62, i = 0; x > 20; x -= 6, i++) {
    const G = placed(x, TABLES_N - 1.2, COURT_Y);
    const doves = i % 3 === 2;
    add(G, box(1.8, 0.06, 0.8), MAT.wood, 0, 0.78, 0);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) add(G, box(0.06, 0.78, 0.06), MAT.wood, sx * 0.8, 0, sz * 0.33);
    if (doves) {
      piece('overturn', G, 'tip', -1.45);
      for (const k of [-0.5, 0.45]) {
        add(G, box(0.6, 0.4, 0.5), cloth('#a07a4a'), k, 0.84, 0);
        for (let b = 0; b < 3; b++) {
          const d = add(scene, new THREE.SphereGeometry(0.08, 8, 6), cloth('#f2f0ea'), x + k + (b - 1) * 0.14, COURT_Y + 1.1, -(TABLES_N - 1.2) + (r() - 0.5) * 0.2);
          d.scale.set(1.5, 0.9, 1);
          piece('overturn', d, 'off', 9);
        }
      }
    } else {
      for (let c = 0; c < 14; c++) add(G, new THREE.CylinderGeometry(0.03, 0.03, 0.01, 8), r() < 0.5 ? MAT.silver : MAT.bronze, (r() - 0.5) * 1.5, 0.82, (r() - 0.5) * 0.6);
      piece('overturn', G, 'tip', -1.45);
    }
  }
}

// The cloaks and branches spread on the road (11:8), a little ahead of him.
{
  const r = mulberry32(12);
  const COLORS = ['#6e5a44', '#8a3a2a', '#5e6a72', '#a88a5e', '#4a5a3a', '#7a6a50', '#c9b48e'];
  const leaf = cloth('#5f8a3e');
  for (const [group, route, from, to] of [['ride1', ROUTES.ride1, 0.1, 1], ['ride2', ROUTES.ride2.slice(0, 9).concat([P(224, 4.5)]), 0, 1]]) {
    const curve = new THREE.CatmullRomCurve3(route.map((p) => new THREE.Vector3(p.x, 0, -p.n)), false, 'centripetal');
    const len = curve.getLength(), k = Math.floor(len / 7);
    for (let i = 0; i < k; i++) {
      const u = lerp(from, to, (i + 0.5) / k);
      if (u > 0.985) continue;
      curve.getPointAt(u, _pt);
      curve.getTangentAt(u, _tan);
      const side = (r() - 0.5) * 2.4;
      const x = _pt.x + _tan.z * side, z = _pt.z - _tan.x * side;
      const G = placed(x, -z, ground(x, -z) + 0.04, Math.atan2(-_tan.z, _tan.x) + (r() - 0.5) * 0.8);
      if (r() < 0.55) add(G, box(1.3, 0.04, 0.9), cloth(COLORS[i % COLORS.length]));
      else for (let b = 0; b < 3; b++) add(G, box(1.6, 0.05, 0.3), leaf, (r() - 0.5) * 0.4, b * 0.03, (b - 1) * 0.28).rotation.y = (r() - 0.5) * 0.6;
      piece(group, G, 'grow');
      shown(G, group, 'monday');
    }
  }
}

// ---------------------------------------------------------------- crowds
// Everyone else, in simple instanced figures. A crowd is there from one group
// until another; it stands at its places, or keeps round someone walking
// (`escort`: places are { along, side } metres from them). `wave`: palm
// branches (John 12:13); `torch`: torches and lanterns (John 18:3).
const CROWDS = [];
const PEOPLE_C = ['#8a6a48', '#6b4e36', '#c9b48e', '#a33a2c', '#3f4f7a', '#e6dcc6', '#7a5a3c', '#5f7656', '#9c7a5a', '#b8a27a', '#5e4a6a'].map((h) => new THREE.Color(h));
const SKIN_C = ['#a8714c', '#8e5c3c', '#b98262', '#9a6646'].map((h) => new THREE.Color(h));
function crowd(from, until, places, o = {}) {
  const r = mulberry32(CROWDS.length * 31 + 7);
  const c = { from, until, ...o, places: places.map((p) => ({ k: 0.92 + r() * 0.16, c: PEOPLE_C[Math.floor(r() * PEOPLE_C.length)], h: r() < 0.4 ? PEOPLE_C[5] : SKIN_C[Math.floor(r() * 4)], ph: r() * 10, ...p })) };
  for (const k of [from, until]) if (k && !groups[k]) marker(k);
  CROWDS.push(c);
  return c;
}
// Places scattered in a box (centre, half-sizes), facing a point, keeping clear of `clear` discs.
function scatter(count, cx, cn, hx, hn, face, seed, clear = []) {
  const r = mulberry32(seed), out = [];
  for (let i = 0; out.length < count && i < count * 20; i++) {
    const x = cx + (r() * 2 - 1) * hx, n = cn + (r() * 2 - 1) * hn;
    if (clear.some((d) => Math.hypot(d.x - x, d.n - n) < d.r)) continue;
    if (out.some((p) => Math.hypot(p.x - x, p.n - n) < 0.75)) continue;
    out.push({ x, n, yaw: (face ? yawTo({ x, n }, face) : r() * 6.28) + (r() - 0.5) * 0.5 });
  }
  return out;
}
function ring(count, c, r0, r1, seed, a0 = 0, a1 = Math.PI * 2) {
  const r = mulberry32(seed), out = [];
  for (let i = 0; i < count; i++) {
    const a = lerp(a0, a1, r()), d = lerp(r0, r1, Math.sqrt(r()));
    const x = c.x + Math.cos(a) * d, n = c.n + Math.sin(a) * d;
    out.push({ x, n, yaw: yawTo({ x, n }, c) + (r() - 0.5) * 0.4 });
  }
  return out;
}
const escortPlaces = (count, a0, a1, side, seed) => {
  const r = mulberry32(seed);
  return Array.from({ length: count }, () => ({ along: lerp(a0, a1, r()), side: (r() < 0.5 ? -1 : 1) * lerp(side[0], side[1], r()) }));
};
// The crowds going before him and following, with branches (11:9).
crowd('ride1', 'dismount', escortPlaces(70, -46, -10, [0.6, 6], 1).concat(escortPlaces(40, 7, 34, [0.5, 6], 2)), { escort: 'colt', wave: true });
crowd('ride2', 'inTemple', ROUTES.ride2.slice(4, 9).flatMap((p, i) => scatter(14, p.x, p.n, 12, 12, p, 40 + i, [{ ...p, r: 4.5 }])), { wave: true });
// In the temple courts at Passover.
const inCourt = (count, seed) => scatter(count, 10, -60, 150, 230, null, seed).filter((p) => !(p.x > INNER.x0 - 18 && p.x < INNER.x1 + 18 && Math.abs(p.n) < INNER.n + 18) && inPoly(p.x, p.n, PLATFORM.pts) && !inPoly(p.x, p.n, [[-150, 186], [168, 190], [168, 170], [-150, 166]]));
crowd('inTemple', 'monday', inCourt(600, 3));
crowd('templeMon', 'tuesday', inCourt(500, 4).concat(scatter(26, 34, TABLES_N - 4.5, 30, 1.5, P(34, TABLES_N - 1.2), 5)));
crowd('tuesday', 'leaveTemple', inCourt(500, 6).concat(scatter(22, 141, -119, 5, 6, P(146, -120), 7, [{ x: 146, n: -120, r: 2.4 }, { x: 143, n: -120, r: 2 }])));
crowd('toTreasury', 'leaveTemple', scatter(70, 96, 6, 26, 28, null, 8, [{ ...TREASURY_SEAT, r: 5 }, { x: 112, n: 16, r: 2 }]));
// The crowd with swords and clubs (14:43), with torches (John 18:3).
crowd('arrestCome', 'ledAway', escortPlaces(46, -18, -2, [0.4, 4.5], 9), { escort: 'judas', torch: 0.22 });
// They lead him away to the high priest (14:53).
crowd('ledAway', 'warm', escortPlaces(46, -22, -3, [0.4, 4.5], 9).concat(escortPlaces(10, 3, 9, [0.4, 3], 19)), { escort: 'jesus', torch: 0.22 });
// In the high priest's house: the council in the hall (14:53, 55), the guards at the fire (14:54).
crowd('ledAway', 'toPilate', ring(14, P(HP.x - 1, HP.n - 9.6), 2.4, 3.4, 10, Math.PI * 1.05, Math.PI * 1.95).map((p) => ({ ...p, yaw: Math.PI / 2 + (p.x - HP.x) * -0.1 })).concat(ring(5, HP_FIRE, 1.4, 1.8, 11, 0.6, 5.6)));
// Before Pilate on the Pavement (15:8-15).
crowd('toPilate', 'toGate', scatter(140, BEMA.x + 22, BEMA.n, 13, 22, BEMA, 12, [{ ...BEFORE_BEMA, r: 3.5 }, { x: BEMA.x + 10.5, n: BEMA.n + 3.5, r: 1.2 }]));
// Following him, among them the women who mourned (Luke 23:27).
crowd('toGate', 'crucified', escortPlaces(50, -24, -6, [0.6, 5], 13), { escort: 'jesus' });
// At Golgotha: passers-by and the chief priests mocking (15:29-32).
crowd('crucified', 'takenDown', ring(60, P(GOLG.x, GOLG.n), 16, 30, 14, -1.1, 1.6));

const CROWD_MAX = CROWDS.reduce((m, c) => m + c.places.length, 0);
const CROWD = {
  body: new THREE.InstancedMesh(lathe([[0.001, 0], [0.25, 0.02], [0.23, 0.6], [0.2, 1.0], [0.24, 1.32], [0.17, 1.44], [0.06, 1.48]], 10), MAT.plain, CROWD_MAX),
  head: new THREE.InstancedMesh(new THREE.SphereGeometry(0.115, 10, 8).translate(0, 1.6, 0), MAT.plain, CROWD_MAX),
  branch: new THREE.InstancedMesh(new THREE.BoxGeometry(0.04, 1.3, 0.24).translate(0, 0.65, 0), cloth('#5f8a3e'), CROWD_MAX),
  torch: new THREE.InstancedMesh(new THREE.CylinderGeometry(0.025, 0.03, 1.1, 6).translate(0, 0.55, 0), MAT.darkWood, CROWD_MAX),
  fire: new THREE.InstancedMesh(new THREE.ConeGeometry(0.1, 0.36, 7).translate(0, 0.18, 0), MAT.flame, CROWD_MAX),
};
for (const m of Object.values(CROWD)) { m.castShadow = true; m.frustumCulled = false; m.count = 0; scene.add(m); }
CROWD.fire.castShadow = false;
const torchSpots = [];
const _m4 = new THREE.Matrix4(), _q4 = new THREE.Quaternion(), _s4 = new THREE.Vector3(), _p4 = new THREE.Vector3(), _e4 = new THREE.Euler(), _l4 = new THREE.Matrix4();
function updateCrowds(time) {
  let n = 0, b = 0, t = 0;
  torchSpots.length = 0;
  for (const c of CROWDS) {
    if (!isShown(c.from, c.until)) continue;
    const lead = c.escort ? actors[c.escort] : null;
    if (lead && !lead.at) continue;
    for (const p of c.places) {
      let x = p.x, nn = p.n, yaw = p.yaw, moving = false;
      if (lead) {
        const { x: lx, z: lz, yaw: ly } = lead.at;
        x = lx + Math.cos(ly) * p.along + Math.sin(ly) * p.side;
        nn = -lz + Math.sin(ly) * p.along - Math.cos(ly) * p.side;
        yaw = ly;
        moving = lead.at.moving;
      }
      const y = floorAt(x, nn);
      const bob = moving ? Math.abs(Math.sin(time * 9 + p.ph)) * 0.06 : 0;
      _e4.set(moving ? 0 : 0.03 * Math.sin(time * 1.3 + p.ph), yaw, 0, 'YXZ');
      _q4.setFromEuler(_e4);
      _m4.compose(_p4.set(x, y + bob, -nn), _q4, _s4.setScalar(p.k));
      CROWD.body.setMatrixAt(n, _m4);
      CROWD.head.setMatrixAt(n, _m4);
      CROWD.body.setColorAt(n, p.c);
      CROWD.head.setColorAt(n, p.h);
      n++;
      if (c.wave && p.ph % 1 < 0.7) {
        _e4.set(0.35 + 0.35 * Math.sin(time * 4 + p.ph * 3), 0, -0.25);
        _l4.makeRotationFromEuler(_e4).setPosition(0.12, 1.25, 0.22);
        CROWD.branch.setMatrixAt(b++, _m4.clone().multiply(_l4));
      }
      if (c.torch && p.ph % 1 < c.torch * 2) {
        _l4.makeRotationZ(-0.25).setPosition(0.25, 0.9, 0.22);
        const tm = _m4.clone().multiply(_l4);
        CROWD.torch.setMatrixAt(t, tm);
        _l4.makeTranslation(0, 1.1, 0).multiply(new THREE.Matrix4().makeScale(1, 0.8 + 0.3 * Math.abs(Math.sin(time * 11 + p.ph)), 1));
        CROWD.fire.setMatrixAt(t, tm.multiply(_l4));
        if (torchSpots.length < 8) torchSpots.push(_p4.set(x, y + 2.1, -nn).clone());
        t++;
      }
    }
  }
  CROWD.body.count = CROWD.head.count = n;
  CROWD.branch.count = b;
  CROWD.torch.count = CROWD.fire.count = t;
  for (const m of Object.values(CROWD)) {
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }
}

// ---------------------------------------------------------------- placing everyone
const mixT = (a, b, w) => Object.fromEntries(Object.keys(a).map((k) => [k, lerp(a[k], b[k], w)]));
const BASE_T = poseTarget(STAND, 0);
const shownBy = (k) => {
  const sh = SHOW[k];
  const on = !sh || isShown(sh[0] || null, sh[1] || null);
  return on || (/^s\d$/.test(k) && isShown(...GUARD_SHOW));
};
function placeActors(dt) {
  for (const a of Object.values(actors)) {
    const at = locate(a);
    a.at = at;
    const f = a.obj;
    const n = -at.z;
    const moved = a.prev ? Math.hypot(at.x - a.prev.x, n - a.prev.n) : 0;
    a.prev = { x: at.x, n };
    a.speed = at.moving && dt > 0 ? lerp(a.speed, Math.min(40, moved / dt), 1 - Math.exp(-dt * 5)) : 0;
    f.R.position.set(at.x, floorAt(at.x, n), at.z);
    f.R.rotation.y = at.yaw;
    f.R.visible = n > -1900 && shownBy(a.key);
    f.phase = (f.phase ?? 0) + dt * Math.PI * 2 * Math.min(1.8, a.speed / 1.3);
    if (a.key === 'colt') {
      const sw = at.moving ? Math.sin(f.phase) : 0;
      for (const { L, front, s } of colt.legs) L.rotation.z = (front ? s : -s) * sw * 0.42;
      colt.B.position.y = Math.abs(sw) * 0.03;
      continue;
    }
    let tg = BASE_T;
    for (const m of at.mix) if (m.w > 0) tg = mixT(tg, poseTarget(m.pose, 1), m.w);
    for (const m of at.mix) {
      if (m.pose.ride && m.w > 0) {
        const c = actors.colt.obj.R;
        _tmp.set(Math.cos(c.rotation.y), 0, -Math.sin(c.rotation.y)).multiplyScalar(-0.06);
        f.R.position.lerp(_tmp.add(c.position).add(_tmp2.set(0, colt.back * FIG - 1.5 * FIG + 0.06 + colt.B.position.y * FIG, 0)), m.w);
        f.R.rotation.y = lerpAngle(at.yaw, c.rotation.y, m.w);
      }
      if (m.pose.cross && m.w > 0.5) {
        const c = m.pose.cross;
        f.R.position.set(c.x + 0.2, c.y, -c.n);
        f.R.rotation.y = c.yaw;
      }
    }
    const step = at.moving ? Math.sin(f.phase) * Math.min(1, a.speed / 0.8) : 0;
    f.step = step;
    f.R.position.y += Math.abs(step) * 0.015;
    applyPose(f, tg, step);
  }
}

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
function reachTo(fig, side, world, w) {
  if (w <= 0) return;
  fig.G.updateMatrixWorld(true);
  const l = fig.G.worldToLocal(_tmp.copy(world));
  reachArm(fig.arms[side], l.x, l.y, l.z, w);
}
function handOf(fig, side, out) {
  fig.arms[side].H.updateMatrixWorld(true);
  return fig.arms[side].H.localToWorld(out.set(0, -0.1, 0));
}
// A point in front of someone: f forward, up, r right (metres), from where they stand.
function before(fig, f, up, r = 0, out = new THREE.Vector3()) {
  const y = fig.R.rotation.y;
  return out.set(fig.R.position.x + Math.cos(y) * f + Math.sin(y) * r, fig.R.position.y + up, fig.R.position.z - Math.sin(y) * f + Math.cos(y) * r);
}
// A value that rises at a, holds, and falls at b (all in 0..1).
const bell = (p, a = 0.25, b = 0.75) => smooth(clamp01(p / a)) * (1 - smooth(clamp01((p - b) / (1 - b))));
const headOf = (fig, out = new THREE.Vector3()) => fig.head.localToWorld(out.set(0.02, 3.2, 0));

// What people do with their hands, from the groups alone.
const _h1 = new THREE.Vector3(), _h2 = new THREE.Vector3(), _w = new THREE.Vector3();
const C = cast;
function scenes(time) {
  for (const f of Object.values(cast)) f.R.updateMatrixWorld(true);
  colt.R.updateMatrixWorld(true);
  // He looks for figs among the leaves (11:13).
  if (isShown('searchFig', 'templeMon')) reachTo(C.jesus, 1, before(C.jesus, 1.2, 2.1, 0.4, _w), bell(groupP('searchFig'), 0.3, 0.8));
  // The coin (12:15-16).
  const cp = groupP('coin') * (1 - groupP('toTreasury'));
  if (cp > 0) reachTo(C.jesus, 1, before(C.jesus, 0.55, 1.55, 0.25, _w), smooth(clamp01(cp * 2)));
  // Two copper coins into the horn of a chest.
  const tc = groupP('twoCoins') * (1 - groupP('leaveTemple'));
  if (tc > 0) reachTo(C.widow, 1, _w.set(WIDOW_CHEST.x, TERRACE_Y + 1.95, -WIDOW_CHEST.n), bell(tc, 0.3, 0.85));
  // She breaks the flask and pours it over his head (14:3).
  const pp = groupP('pour') * (1 - groupP('thursday'));
  const head = headOf(C.jesus, _h2);
  oil.visible = false;
  flask.rotation.z = 0;
  if (pp > 0 && C.anointer.R.visible) {
    reachTo(C.anointer, 1, _w.copy(head).add(_tmp2.set(0, 0.32, 0)), bell(pp, 0.25, 0.92));
    flask.rotation.z = -2.2 * smooth(clamp01((pp - 0.25) / 0.2)) * (1 - smooth(clamp01((pp - 0.85) / 0.1)));
    if (pp > 0.42 && pp < 0.86) {
      oil.visible = true;
      flask.updateMatrixWorld(true);
      stretch(oil, flask.localToWorld(_h1.set(0, 0.06, 0)), head);
    }
  }
  // Bread, then the cup (14:22-23).
  for (const [k, next] of [['bread', 'cup'], ['cup', 'hymn']]) {
    const q = groupP(k) * (1 - groupP(next));
    if (q > 0) reachTo(C.jesus, 1, _w.set(UR_TABLE.x + 1.2, UR_FLOOR + 1.1, -UR_TABLE.n - 0.3), smooth(clamp01(q * 2)));
  }
  // The jar on the man's shoulder; the beam on a shoulder.
  if (C.jarMan.R.visible) reachTo(C.jarMan, 0, before(C.jarMan, 0.1, 1.45, -0.32, _w), 1);
  for (const k of ['jesus', 'simonC']) {
    if (!beams[k].visible || !C[k].R.visible) continue;
    for (const side of [0, 1]) reachTo(C[k], side, before(C[k], 0.05, 1.32, side ? 0.6 : -0.6, _w), 1);
  }
  // Peter warms himself at the fire (14:54).
  if (isShown('warm', 'toPilate')) for (const side of [0, 1]) reachTo(C.peter, side, before(C.peter, 0.55, 0.55, side ? 0.12 : -0.12, _w), 0.8);
  // The body: at the foot of the cross, carried between them, then on the bench.
  if (body.visible) {
    if (groupP('carry') <= 0 || groupP('outTomb') <= 0) {
      const j = C.joseph.R.position, nn = C.nicodemus.R.position;
      _h1.copy(j).lerp(nn, 0.5);
      const carried = groupP('carry') > 0;
      body.position.set(_h1.x, (carried ? Math.max(j.y, nn.y) + 0.85 : GOLG.y + 0.25), _h1.z);
      body.rotation.y = Math.atan2(-(nn.z - j.z), nn.x - j.x);
      if (!carried) body.position.y = floorAt(_h1.x, -_h1.z) + 0.22;
      for (const [fig, end] of [[C.joseph, 0.75], [C.nicodemus, -0.75]]) {
        _w.set(Math.cos(body.rotation.y) * end, 0, -Math.sin(body.rotation.y) * end).add(body.position);
        for (const side of [0, 1]) reachTo(fig, side, _tmp2.copy(_w).add(new THREE.Vector3(0, 0.05, side ? 0.18 : -0.18)), 1);
      }
    } else {
      body.position.copy(BENCH);
      body.rotation.y = 0;
    }
  }
  // The stone, rolled across the door (15:46), and found rolled back (16:4).
  const shut = groupP('rollStone') * (1 - groupP('sunday'));
  const sn = lerp(STONE_OPEN, TOMB.n, smooth(shut));
  tombStone.position.z = -sn;
  tombStone.rotation.x = (sn - STONE_OPEN) / 1.1;
  if (shut > 0 && shut < 1) reachTo(C.joseph, 1, _w.set(TOMB.x + 3.4, TOMB.y + 1.2, -sn - 1.0), 1);
}

// Everyone blinks now and then and looks about; people near Jesus look at him.
let headsT = 0;
function heads(time) {
  const dt = Math.min(0.1, Math.max(0, time - headsT));
  headsT = time;
  const jh = headOf(C.jesus, _h1);
  Object.values(cast).forEach((f, i) => {
    if (!f.R.visible) return;
    f.blink -= dt;
    if (f.blink < -0.14) f.blink = 2 + rand() * 4;
    f.eyes.scale.y = f.blink < 0 ? 0.15 : 1;
    let yaw = 0, pitch = -0.05;
    let target = f.lookAt;
    if (!target && f !== C.jesus && C.jesus.R.visible && f.R.position.distanceTo(C.jesus.R.position) < 9) target = jh;
    if (target && !f.step) {
      const l = f.G.worldToLocal(_tmp.copy(target));
      yaw = Math.max(-0.8, Math.min(0.8, Math.atan2(-l.z, l.x)));
      pitch = Math.max(-0.5, Math.min(0.35, Math.atan2(l.y - 3.15, Math.hypot(l.x, l.z))));
    }
    yaw += 0.1 * Math.sin(time * 0.31 + i * 3) + 0.05 * Math.sin(time * 0.73 + i);
    pitch += 0.03 * Math.sin(time * 0.47 + i * 2);
    const k = 1 - Math.exp(-dt * 4);
    f.neck.rotation.y = lerp(f.neck.rotation.y, yaw, k);
    f.neck.rotation.z = lerp(f.neck.rotation.z, pitch, k);
  });
}
// Who looks at what, where it isn't Jesus.
C.jesus.lookAt = null;
C.anointer.lookAt = null;

// ---------------------------------------------------------------- lights
// Lamps, the fire in the courtyard and the torches light the night scenes: a
// few point lights go to whichever are lit nearest the view.
const pointLights = Array.from({ length: 3 }, () => {
  const l = new THREE.PointLight(0xffa04a, 0, 18, 1.6);
  scene.add(l);
  return l;
});
function updateLights(look, time) {
  const list = [];
  if (isShown('wednesday', 'thursday')) list.push({ p: lamps[0], i: 3 }, { p: lamps[1], i: 3 });
  if (isShown('evening', 'hymn')) list.push({ p: lamps[2], i: 3 }, { p: lamps[3], i: 3 });
  if (isShown('ledAway', 'toPilate')) list.push({ p: v3(HP_FIRE.x, HP_FIRE.n, HP.y + 1), i: 8 });
  for (const p of torchSpots) list.push({ p, i: 5 });
  list.sort((a, b) => a.p.distanceTo(look) - b.p.distanceTo(look));
  const night = 0.35 + 0.65 * light.night;
  pointLights.forEach((l, k) => {
    const c = list[k];
    l.intensity = c ? c.i * night * (0.9 + 0.1 * Math.sin(time * 13 + k)) : 0;
    if (c) l.position.copy(c.p);
  });
}

// ---------------------------------------------------------------- labels
const labels = [];
for (const [key, spec] of Object.entries(LABELS)) {
  const el = document.createElement('div');
  el.className = `label ${spec.kind}`;
  const obj = new CSS2DObject(el);
  if (spec.x != null) obj.position.copy(v3(spec.x, spec.n, ground(spec.x, spec.n) + (spec.lift ?? 10)));
  scene.add(obj);
  labels.push({ key, spec, el, obj, follow: spec.actor ? actors[spec.actor]?.obj.R : null, opacity: -1, text: null, hidden: false });
}
function labelText(lb) {
  const s = tr(lb.spec.name);
  if (s !== lb.text) lb.el.textContent = lb.text = s;
}
// Is the label behind a hill as seen from the camera?
const _ray = new THREE.Vector3();
function behindTerrain(from, to) {
  for (let k = 1; k < 24; k++) {
    _ray.lerpVectors(from, to, k / 24);
    if (ground(_ray.x, -_ray.z) > _ray.y + 3) return true;
  }
  return false;
}
let occlusionFrame = 0;
function updateLabels(activeKeys) {
  const overview = tour.phase === 'intro' || tour.phase === 'finale';
  const check = occlusionFrame++ % 6 === 0;
  for (const lb of labels) {
    const { kind, from, until, lift = 0 } = lb.spec;
    if (lb.follow) {
      lb.obj.position.copy(lb.follow.position);
      lb.obj.position.y += lift;
    }
    labelText(lb);
    if (check) lb.hidden = behindTerrain(camera.position, lb.obj.position);
    const d = camera.position.distanceTo(lb.obj.position);
    const active = activeKeys.has(lb.key);
    let o;
    if (kind === 'person') o = active || (tour.explore && d < 40) ? clamp01((140 - d) / 60) : 0;
    else if (kind === 'item') o = active ? 1 : overview ? (lb.spec.big ? 1 : 0) : stops[tour.i]?.context || tour.explore ? clamp01((d - 60) / 60) * clamp01((1100 - d) / 400) : 0;
    else o = overview || active ? 1 : clamp01((d - 300) / 300) * clamp01((3400 - d) / 800);
    if (!isShown(from, until)) o = 0;
    if (lb.follow && !lb.follow.visible) o = 0;
    if (lb.hidden && !active) o = 0;
    o = Math.round(o * 20) / 20;
    if (o !== lb.opacity) { lb.el.style.opacity = o; lb.opacity = o; }
    lb.el.classList.toggle('active', active && kind === 'item');
  }
}

// ---------------------------------------------------------------- tour
const at3 = (p) => v3(p.x, p.n, floorAt(p.x, p.n) + p.y);
const stops = STOPS.map((st, i) => ({
  ...st, i, build: st.build ?? [],
  look: at3(st.look), pos: at3(st.cam),
  T: st.day * 24 + st.hour,
  activeKeys: new Set(st.labels ?? []),
}));
const FINALE_KEYS = new Set(FINALE.labels ?? []);
const INTRO_T = INTRO.day * 24 + INTRO.hour, FINALE_T = FINALE.day * 24 + FINALE.hour;

function overviewPos(a, finale = false) {
  const c = finale ? FINALE_C : OVERVIEW_C, r = finale ? 1150 : 1350;
  return new THREE.Vector3(c.x + Math.cos(a) * r, finale ? 520 : 640, c.z + Math.sin(a) * r);
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
  T: INTRO_T,         // the time: hours from midnight before the first Sunday
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
  // Walks start at once (the camera follows them); other steps once the camera is close.
  const start = to.start ?? (to.build.some((k) => groups[k]?.walk) ? 0.04 : 0.3);
  const units = to.build.reduce((sum, k) => sum + weightOf(k), 0);
  const travel = Math.min(9, Math.max(5.5, Math.sqrt(d) / 3));
  const dur = to.dur ?? Math.min(34, Math.max(travel, (units * SEC_PER_UNIT) / (0.92 - start)));
  fly = { t: 0, dur, d, fromPos, fromLook, to, build: to.build, start, fromT: sequential || tour.i < 0 ? tour.T : to.T, done: () => arrive(toIndex) };
  if (fly.fromT > to.T) fly.fromT = to.T;
  tour.i = toIndex;
  tour.phase = 'fly';
  narrator.stop();
  tour.detached = false;
  if (tour.holdScale > 0 || !sequential) hidePopup();
  showNext(to);
  updateProgress();
}

function flyToOverview(then, finale = false) {
  const to = { pos: overviewPos(tour.orbitA, finale), look: (finale ? FINALE_C : OVERVIEW_C).clone(), T: finale ? FINALE_T : tour.T };
  fly = { t: 0, dur: 8, d: view.pos.distanceTo(to.pos), fromPos: view.pos.clone(), fromLook: view.look.clone(), to, build: null, fromT: tour.T, done: then };
  tour.phase = 'fly';
  hidePopup();
}

function stepFly(dt) {
  fly.t += dt / fly.dur;
  const u = clamp01(fly.t);
  const e = easeArrive(u);
  const arc = Math.min(300, 2 + fly.d * 0.22) * Math.sin(Math.PI * u) * (fly.follow ? 0.2 : 1);
  view.pos.lerpVectors(fly.fromPos, fly.to.pos, e).y += arc;
  view.look.lerpVectors(fly.fromLook, fly.to.look, easeInOut(clamp01(u * 1.15)));
  tour.T = lerp(fly.fromT, fly.to.T, smooth(clamp01(u * 1.25)));
  if (fly.build) {
    // Each step takes its share of the time, one after another.
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

// Nothing has happened until its stop.
function applyStatic(i) {
  stops.forEach((st, j) => st.build.forEach((k) => setGroup(k, j < i ? 1 : 0)));
  for (const k of Object.keys(groups)) if (!stops.some((st) => st.build.includes(k))) setGroup(k, 0);
  tour.T = i < stops.length ? (i > 0 ? stops[i - 1].T : INTRO_T) : FINALE_T;
}

function finish() {
  track('tour_complete');
  narrator.stop();
  tour.i = stops.length;
  applyStatic(stops.length);
  tour.T = stops.at(-1).T;
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
  tour.detached = false;
  setPlaying(true);
  startFly(0);
  narrator.say(titleLine(t('holyweek.title'), t('holyweek.subtitle')));
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

// The darkness over the whole land from the sixth hour to the ninth (15:33).
const darkness = () => groupP('dark') * (1 - groupP('takenDown'));
const _f = new THREE.Vector3();
function update(dt) {
  const t = dt * tour.speed;
  narrator.update(dt);
  const inTour = tour.phase === 'hold' || tour.phase === 'fly';
  if (!tour.explore) {
    const wantCut = inTour && stops[tour.i]?.cutaway ? 1 : 0;
    tour.cut = lerp(tour.cut, wantCut, 1 - Math.exp(-dt * 2.2));
  }
  if (tour.explore) return;
  if (tour.phase === 'intro') {
    tour.introT += dt;
    tour.orbitA = SOUTH_EAST + 0.15 * Math.sin(tour.introT * 0.1);
  } else if (tour.phase === 'finale') tour.orbitA += dt * 0.025;
  if ((tour.phase === 'intro' || tour.phase === 'finale') && !fly) {
    view.pos.copy(overviewPos(tour.orbitA, tour.phase === 'finale'));
    view.look.copy(tour.phase === 'finale' ? FINALE_C : OVERVIEW_C);
    if (tour.phase === 'finale') tour.T = lerp(tour.T, FINALE_T + 0.6, 1 - Math.exp(-dt * 0.05));
  }
  if (fly) {
    if (tour.playing || !fly.build || tour.i >= stops.length) stepFly(fly.build ? t : dt);
  } else if (tour.phase === 'hold') {
    const st = stops[tour.i];
    if (tour.playing) tour.holdT += t;
    const k = tour.holdDur ? clamp01(tour.holdT / tour.holdDur) : 1;
    view.pos.copy(st.pos).lerp(st.look, 0.06 * smooth(k));
    view.look.copy(st.look);
    timerBar.style.transform = `scaleX(${k})`;
    if (tour.playing && tour.holdT >= tour.holdDur && !narrator.busy()) {
      if (tour.i >= stops.length - 1) finish();
      else startFly(tour.i + 1);
    }
  }
  // Follow whoever is walking, then ease back to the stop's view.
  const st = stops[tour.i];
  const w = st && st.follow !== false ? walker() : null;
  if (w) tour.focus = w;
  tour.follow = lerp(tour.follow, w ? 1 : 0, 1 - Math.exp(-dt * 1.2));
  if (fly) fly.follow = !!w;
  if (tour.focus && tour.follow > 0.001 && inTour) {
    const off = (st && st.follow) || FOLLOW;
    const R = tour.focus.obj.R;
    _f.set(R.position.x, R.position.y + 1.2, R.position.z);
    view.look.lerp(_f, tour.follow);
    view.pos.lerp(_tmp.set(_f.x + off.x, _f.y + off.y, _f.z - off.n), tour.follow);
  }
}

// Fades the roofs and walls of the buildings cut away for the scenes inside them.
let cutShown = -1;
function applyCut(cut) {
  const c = Math.round(cut * 50) / 50;
  if (c === cutShown) return;
  const was = cutShown > 0;
  cutShown = c;
  for (const m of CUT_MATS) {
    m.transparent = c > 0;
    m.depthWrite = c === 0;
    m.opacity = lerp(1, 0.05, c);
    if (was !== c > 0) m.needsUpdate = true;
  }
  for (const m of cutMeshes) m.castShadow = c < 0.5;
}

// Flames flicker; smoke rises; everyone moves.
let lastT = 0;
function updateEffects(time) {
  const dt = Math.min(0.1, Math.max(0, time - lastT));
  lastT = time;
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
  for (const sh of showings) sh.obj.visible = isShown(sh.from, sh.until) && (sh.obj.userData.on ?? true);
  applyCut(tour.cut);
  placeActors(dt);
  scenes(time);
  heads(time);
  updateCrowds(time);
  setTime(tour.T % 24, darkness());
  updateLights(view.look, time);
}

// ---------------------------------------------------------------- explore mode
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI * 0.49;
controls.minDistance = 1;
controls.maxDistance = 4000;

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
        to: st, build: null, fromT: st.T, done: () => { tour.phase = 'hold'; if (resume === 'fly') tour.holdT = 0; },
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
  ui.popup.innerHTML = `
    <div class="kicker">${t('stopOf', { n: st.i + 1, total: stops.length })} · ${esc(tr(st.ref))} (${VERSIONS[current.version].abbr})</div>
    <div class="when">${esc(tr(st.when))}</div>
    <h2>${esc(tr(st.title))}</h2>
    <blockquote>${esc(tr(st.quote))}</blockquote>
    <p>${esc(tr(st.note))}</p>
    ${st.where ? `<div class="facts"><span>${t('where')}</span> ${esc(tr(st.where))}</div>` : ''}
    <div class="timer"></div>`;
  ui.popup.querySelector('.timer').appendChild(timerBar);
  timerBar.style.transform = 'scaleX(0)';
  ui.popup.classList.add('show');
}
function hidePopup() { ui.popup.classList.remove('show'); }
function showNext(st) {
  ui.nextChip.innerHTML = `<span>${esc(tr(DAYS[st.day]))}</span> ${esc(tr(st.title))} <em>${esc(tr(st.ref))}</em>`;
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

// The progress dots, a gap between the days.
stops.forEach((st, i) => {
  const b = document.createElement('button');
  b.onclick = () => jump(i);
  if (i > 0 && st.day !== stops[i - 1].day) b.classList.add('day');
  ui.progress.appendChild(b);
});
function titleProgress() {
  stops.forEach((st, i) => {
    const b = ui.progress.children[i];
    b.title = `${tr(DAYS[st.day])}: ${tr(st.title)} (${tr(st.ref)})`;
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
buildColumns();
buildHouses();
trees();
applyStatic(0);
tour.T = INTRO_T;
setVersion(current.version);
showCard(INTRO, false);
setPlaying(false);

const clock = new THREE.Clock();
const noKeys = new Set();
let viewShift = 0;   // shifts the frame right so the popup doesn't cover the subject
let viewLift = 0;    // shifts the frame up on phones
let time = 0;
function frame(dt) {
  time += dt;
  update(dt);
  updateEffects(time);
  const wantShift = !tour.explore && (tour.phase === 'hold' || tour.phase === 'fly' || tour.phase === 'finale') && innerWidth > 900 ? 0.14 : 0;
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
  placeLight(tour.explore ? controls.target : view.look, camera.position.distanceTo(tour.explore ? controls.target : view.look));
  const inTour = tour.phase === 'hold' || tour.phase === 'fly';
  updateLabels(inTour && tour.i < stops.length ? stops[tour.i].activeKeys : tour.phase === 'finale' ? FINALE_KEYS : noKeys);
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
  tour, stops, jump, next, applyStatic, setGroup, view, groups, actors, cast,
  advance(sec) { for (let t = 0; t < sec; t += 0.05) { update(0.05); updateEffects(time += 0.05); } },
  // Shows stop i as it is when the camera arrives (for checking the views).
  show(i) { tour.detached = true; startFly(i); fly.t = 1; stepFly(0); tour.follow = 0; tour.focus = null; for (let k = 0; k < 40; k++) frame(0.05); },
  finish,
};
window.__ready = true;
