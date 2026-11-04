"""Works out the journey's paths and writes route.js.

Land legs follow the easiest way over the terrain (a least-cost path on
terrain.png, where steep ground costs more and water can't be crossed), through
the guide points below; sea legs are drawn by hand through the points below and
checked against the coastline. Places come from data.js (PLACES, lat / lon).

Run from the repository root after terrain.py:  python3 pauls-first-journey/tools/route.py
"""
import heapq, math, os, re
import numpy as np
from PIL import Image

HERE = os.path.dirname(__file__)
LON0, LAT0 = 33.2, 36.6
KX = 111.32 * math.cos(math.radians(LAT0))
KN = 110.96
X0, N1, STEP = -375, 300, 0.5      # terrain.png: column 0 is x = X0, row 0 is n = N1

src = open(os.path.join(HERE, '..', 'data.js'), encoding='utf-8').read()
PLACES = {k: (float(lat), float(lon)) for k, lat, lon in
          re.findall(r'(\w+): \{(?:[^{}]|\{[^{}]*\})*?lat: ([\d.]+), lon: ([\d.]+)', src)}

a = np.asarray(Image.open(os.path.join(HERE, '..', 'terrain.png'))).astype(np.int32)
H = a[..., 0] * 256 + a[..., 1] - 3000.0
WATER = (H <= 0) | (a[..., 2] > 0)


def xn(lat, lon): return ((lon - LON0) * KX, (lat - LAT0) * KN)
def cell(x, n): return (int(round((N1 - n) / STEP)), int(round((x - X0) / STEP)))
def pos(r, c): return (X0 + c * STEP, N1 - r * STEP)


class XN(tuple):
    """A point already in plan kilometres (not lat, lon)."""


def point(p):
    if isinstance(p, XN):
        return p
    return xn(*PLACES[p]) if isinstance(p, str) else xn(*p)


# Least-cost path on a 1 km grid (every other pixel).
K = 2
h = H[::K, ::K]
water = WATER[::K, ::K]
gy, gx = np.gradient(h, STEP * K)            # metres per km
slope = np.hypot(gx, gy)
COST = 1 + (slope / 90) ** 2 + np.maximum(0, h - 1600) / 800
COST[water] = np.inf
R, C = h.shape


def least(a, b):
    (ra, ca), (rb, cb) = [(r // K, c // K) for r, c in (cell(*a), cell(*b))]
    dist = np.full(h.shape, np.inf)
    prev = {}
    dist[ra, ca] = 0
    q = [(0, ra, ca)]
    steps = [(dr, dc, math.hypot(dr, dc)) for dr in (-1, 0, 1) for dc in (-1, 0, 1) if dr or dc]
    while q:
        d, r, c = heapq.heappop(q)
        if (r, c) == (rb, cb):
            break
        if d > dist[r, c]:
            continue
        for dr, dc, l in steps:
            rr, cc = r + dr, c + dc
            if 0 <= rr < R and 0 <= cc < C:
                cost = COST[rr, cc] if (rr, cc) != (rb, cb) else 1
                nd = d + l * (COST[r, c] + cost) / 2
                if nd < dist[rr, cc]:
                    dist[rr, cc] = nd
                    prev[(rr, cc)] = (r, c)
                    heapq.heappush(q, (nd, rr, cc))
    path, p = [], (rb, cb)
    while p != (ra, ca):
        path.append(p)
        p = prev[p]
    path.append((ra, ca))
    pts = [pos(r * K, c * K) for r, c in reversed(path)]
    pts[0], pts[-1] = a, b
    return pts


def smooth(pts, n=3):
    p = np.array(pts)
    for _ in range(n):
        p[1:-1] = (p[:-2] + 2 * p[1:-1] + p[2:]) / 4
    return [tuple(v) for v in p]


def simplify(pts, tol):
    if len(pts) < 3:
        return pts
    a, b = np.array(pts[0]), np.array(pts[-1])
    ab = b - a
    L = np.hypot(*ab) or 1
    d = [abs(ab[0] * (p[1] - a[1]) - ab[1] * (p[0] - a[0])) / L for p in pts[1:-1]]
    i = int(np.argmax(d)) + 1
    if d[i - 1] < tol:
        return [pts[0], pts[-1]]
    return simplify(pts[:i + 1], tol)[:-1] + simplify(pts[i:], tol)


def catmull(pts, step=2.0):
    p = [pts[0]] + pts + [pts[-1]]
    out = []
    for i in range(1, len(p) - 2):
        p0, p1, p2, p3 = map(np.array, p[i - 1:i + 3])
        n = max(2, int(np.hypot(*(p2 - p1)) / step))
        for k in range(n):
            t = k / n
            out.append(tuple(0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t
                                    + (-p0 + 3 * p1 - 3 * p2 + p3) * t ** 3)))
    out.append(tuple(p[-2]))
    return out


def harbour(place):
    """The nearest water to a coastal town."""
    r, c = cell(*point(place))
    best = None
    for rr in range(r - 30, r + 31):
        for cc in range(c - 30, c + 31):
            if H[rr, cc] < -2 and not a[rr, cc, 2]:
                d = (rr - r) ** 2 + (cc - c) ** 2
                if best is None or d < best[0]:
                    best = (d, rr, cc)
    _, rr, cc = best
    # A little way out from the shore.
    x, n = pos(rr, cc)
    x0, n0 = point(place)
    L = math.hypot(x - x0, n - n0) or 1
    return XN((x + (x - x0) / L * 0.6, n + (n - n0) / L * 0.6))


def land(*via):
    pts = [point(v) for v in via]
    out = []
    for a_, b_ in zip(pts, pts[1:]):
        seg = least(a_, b_)
        out += seg if not out else seg[1:]
    return simplify(smooth(out), 0.25)


def sea(start, *via, end):
    pts = [start] + [point(v) for v in via] + [end]
    path = catmull(pts)
    for x, n in path[3:-3]:
        r, c = cell(x, n)
        if not WATER[r, c]:
            raise SystemExit(f'sea leg crosses land at {x:.1f}, {n:.1f}')
    return path


def rnd(pts): return [[round(float(x), 2), round(float(n), 2)] for x, n in pts]


# The guide points (lat, lon) say which way the roads went; see the README.
KITION, AMATHUS, KOURION = (34.918, 33.629), (34.712, 33.142), (34.664, 32.888)
ADADA = (37.574, 30.986)
LEGS = []
def leg(to, by, pts, back=False):
    """to: the place reached at the end (None for a harbour on the way)."""
    LEGS.append({'to': to, 'by': by, 'back': back, 'pts': pts})

def ashore(place, back=False):
    """From a harbour to its town, or (reversed) back down."""
    pts = [harbour(place), point(place)]
    return pts if not back else pts[::-1]

syria = land('antioch', 'seleucia') + [harbour('seleucia')]
cyprus = land('salamis', KITION, AMATHUS, KOURION, 'paphos')
taurus = land('perga', ADADA, 'antiochP')
pisidia = land('antiochP', 'iconium')
lycaonia = land('iconium', 'lystra')
derbe = land('lystra', 'derbe')
cestrus = harbour((36.853, 30.92))

leg('seleucia', 'land', syria)
leg(None, 'sea', sea(harbour('seleucia'), (35.85, 35.45), (35.45, 34.7), (35.24, 34.12), end=harbour('salamis')))
leg('salamis', 'land', ashore('salamis'))
leg('paphos', 'land', cyprus)
leg(None, 'land', ashore('paphos', True))
leg(None, 'sea', sea(harbour('paphos'), (35.0, 32.12), (35.6, 31.7), (36.35, 31.15), end=cestrus))
leg('perga', 'land', [cestrus] + land((36.87, 30.905), 'perga'))
leg('antiochP', 'land', taurus)
leg('iconium', 'land', pisidia)
leg('lystra', 'land', lycaonia)
leg('derbe', 'land', derbe)
leg('lystra', 'land', derbe[::-1], True)
leg('iconium', 'land', lycaonia[::-1], True)
leg('antiochP', 'land', pisidia[::-1], True)
leg('perga', 'land', taurus[::-1], True)
leg('attalia', 'land', land('perga', 'attalia'), True)
leg(None, 'land', ashore('attalia', True), True)
leg(None, 'sea', sea(harbour('attalia'), (36.55, 30.95), (36.1, 32.2), (35.9, 33.2), (35.98, 34.65), (36.1, 35.5), end=harbour('seleucia')), True)
leg('antioch', 'land', syria[::-1], True)

with open(os.path.join(HERE, '..', 'route.js'), 'w', encoding='utf-8') as f:
    f.write('// Generated by tools/route.py from terrain.png and the PLACES in data.js. Do not edit.\n')
    f.write('// Plan kilometres [x east, n north]. by: land | sea; back: on the way home.\n')
    f.write('export const LEGS = [\n')
    for L in LEGS:
        to = f"'{L['to']}'" if L['to'] else 'null'
        f.write(f"  {{ to: {to}, by: '{L['by']}', back: {str(L['back']).lower()}, pts: {rnd(L['pts'])} }},\n")
    f.write('];\n')
for L in LEGS:
    p = np.array(L['pts'])
    print(L['to'], L['by'], len(p), 'pts', f"{np.hypot(*np.diff(p, axis=0).T).sum():.0f} km")
