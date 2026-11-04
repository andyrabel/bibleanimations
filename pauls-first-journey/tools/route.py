"""Works out a journey's paths and writes its route.js.

Land legs follow the easiest way over the terrain (a least-cost path on
terrain.png, where steep ground costs more and water can't be crossed), through
the guide points below; sea legs are drawn by hand through the points below and
checked against the coastline. Places come from data.js (PLACES, lat / lon).

Run from the repository root after terrain.py, naming the journey:
  python3 pauls-first-journey/tools/route.py pauls-second-journey
"""
import heapq, math, os, re, sys
import numpy as np
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
# Each journey: the folder its map is in, the map's centre, and terrain.png's
# top-left pixel (x0, n1) and km per pixel (as in terrain.py and data.js MAP).
JOURNEYS = {
    'pauls-first-journey': ('pauls-first-journey', 33.2, 36.6, -375, 300, 0.5),
    'pauls-second-journey': ('pauls-second-journey', 29.25, 36.5, -740, 590, 1),
    'pauls-third-journey': ('pauls-second-journey', 29.25, 36.5, -740, 590, 1),
    'pauls-voyage-to-rome': ('pauls-voyage-to-rome', 24.0, 36.55, -1120, 640, 1.5),
}
NAME = sys.argv[1] if len(sys.argv) > 1 else 'pauls-first-journey'
MAPDIR, LON0, LAT0, X0, N1, STEP = JOURNEYS[NAME]
KX = 111.32 * math.cos(math.radians(LAT0))
KN = 110.96

src = open(os.path.join(ROOT, NAME, 'data.js'), encoding='utf-8').read()
PLACES = {k: (float(lat), float(lon)) for k, lat, lon in
          re.findall(r'(\w+): \{(?:[^{}]|\{[^{}]*\})*?lat: ([\d.]+), lon: ([\d.]+)', src)}

a = np.asarray(Image.open(os.path.join(ROOT, MAPDIR, 'terrain.png'))).astype(np.int32)
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


# Least-cost path on a 1 km grid.
K = max(1, round(1 / STEP))
h = H[::K, ::K]
water = WATER[::K, ::K]
gy, gx = np.gradient(h, STEP * K)            # metres per km
slope = np.hypot(gx, gy)
COST = 1 + (slope / 90) ** 2 + np.maximum(0, h - 1600) / 800
COST[water] = np.inf
R, C = h.shape


def snap(r, c, COST):
    """The nearest cell that can be crossed (a town on the shore, a harbour)."""
    if np.isfinite(COST[r, c]):
        return r, c
    for d in range(1, 40):
        best = None
        for rr in range(r - d, r + d + 1):
            for cc in range(c - d, c + d + 1):
                if 0 <= rr < COST.shape[0] and 0 <= cc < COST.shape[1] and np.isfinite(COST[rr, cc]):
                    e = (rr - r) ** 2 + (cc - c) ** 2
                    if best is None or e < best[0]:
                        best = (e, rr, cc)
        if best:
            return best[1], best[2]
    raise SystemExit(f'nothing to cross near {r}, {c}')


def least(a, b, COST=COST):
    (ra, ca), (rb, cb) = [snap(r // K, c // K, COST) for r, c in (cell(*a), cell(*b))]
    dist = np.full(h.shape, np.inf)
    prev = {}
    dist[ra, ca] = 0
    q = [(math.hypot(rb - ra, cb - ca), ra, ca)]
    steps = [(dr, dc, math.hypot(dr, dc)) for dr in (-1, 0, 1) for dc in (-1, 0, 1) if dr or dc]
    while q:
        f, r, c = heapq.heappop(q)
        if (r, c) == (rb, cb):
            break
        d = dist[r, c]
        if f - math.hypot(rb - r, cb - c) > d + 1e-9:
            continue
        for dr, dc, l in steps:
            rr, cc = r + dr, c + dc
            if 0 <= rr < R and 0 <= cc < C:
                cost = COST[rr, cc] if (rr, cc) != (rb, cb) else 1
                nd = d + l * (COST[r, c] + cost) / 2
                if nd < dist[rr, cc]:
                    dist[rr, cc] = nd
                    prev[(rr, cc)] = (r, c)
                    heapq.heappush(q, (nd + math.hypot(rb - rr, cb - cc), rr, cc))
    path, p = [], (rb, cb)
    while p != (ra, ca):
        path.append(p)
        p = prev[p]
    path.append((ra, ca))
    pts = [pos(r * K, c * K) for r, c in reversed(path)]
    pts[0], pts[-1] = a, b
    return pts


# The same over the sea, a little off the coasts (for the legs not drawn by hand).
_land = ~WATER[::K, ::K] | (a[::K, ::K, 2] > 0)
_near = _land.copy()
SEA = np.ones(h.shape)
for k in range(4):
    g = _near.copy()
    g[1:] |= _near[:-1]; g[:-1] |= _near[1:]; g[:, 1:] |= _near[:, :-1]; g[:, :-1] |= _near[:, 1:]
    _near = g
    SEA[_near & ~_land & (SEA == 1)] = 4 - k * 0.7
SEA[_land] = np.inf


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
    R = int(15 / STEP)
    for rr in range(r - R, r + R + 1):
        for cc in range(c - R, c + R + 1):
            if H[rr, cc] < -2 and not a[rr, cc, 2]:
                d = (rr - r) ** 2 + (cc - c) ** 2
                if best is None or d < best[0]:
                    best = (d, rr, cc)
    _, rr, cc = best
    # A little way out from the shore.
    x, n = pos(rr, cc)
    x0, n0 = point(place)
    L = math.hypot(x - x0, n - n0) or 1
    return XN((x + (x - x0) / L * STEP * 1.2, n + (n - n0) / L * STEP * 1.2))


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


def seaway(*via):
    """By sea through harbours and capes: the shortest way through open water."""
    pts = [point(v) for v in via]
    out = []
    for a_, b_ in zip(pts, pts[1:]):
        seg = least(a_, b_, SEA)
        out += seg if not out else seg[1:]
    out = catmull(simplify(smooth(out, 40), 0.4))
    dry = sum(1 for x, n in out[2:-2] if not WATER[cell(x, n)])
    if dry:
        print(f'  warning: {dry} points of a sea leg on land')
    return out


def rnd(pts): return [[round(float(x), 2), round(float(n), 2)] for x, n in pts]


LEGS = []
def leg(to, by, pts, back=False, wreck=False):
    """to: the place reached at the end (None for a harbour on the way);
    wreck: the ship is wrecked at the end of this sea leg."""
    LEGS.append({'to': to, 'by': by, 'back': back, 'pts': pts, 'wreck': wreck})


def ashore(place, back=False):
    """From a harbour to its town, or (reversed) back down."""
    pts = [harbour(place), point(place)]
    return pts if not back else pts[::-1]


# The guide points (lat, lon) say which way the roads went; see the README.
def first():
    KITION, AMATHUS, KOURION = (34.918, 33.629), (34.712, 33.142), (34.664, 32.888)
    ADADA = (37.574, 30.986)
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



# Roads used by more than one journey.
SYRIAN_GATES, ISSUS, MOPSUESTIA, CILICIAN_GATES = (36.49, 36.20), (36.84, 36.20), (36.96, 35.62), (37.28, 34.79)
AMPHIPOLIS, APOLLONIA = (40.82, 23.846), (40.65, 23.48)


def to_galatia():
    leg('derbe', 'land', land('antioch', SYRIAN_GATES, ISSUS, MOPSUESTIA, 'tarsus', CILICIAN_GATES, 'derbe'))
    leg('lystra', 'land', land('derbe', 'lystra'))
    leg('iconium', 'land', land('lystra', 'iconium'))
    leg('antiochP', 'land', land('iconium', 'antiochP'))


def second():
    to_galatia()
    leg('phrygiaPt', 'land', land('antiochP', 'phrygiaPt'))
    leg('mysiaPt', 'land', land('phrygiaPt', 'mysiaPt'))
    leg('troas', 'land', land('mysiaPt', (39.6, 28.0), 'troas'))
    leg(None, 'land', ashore('troas', True))
    leg(None, 'sea', seaway(harbour('troas'), harbour((40.505, 25.53)), harbour('neapolis')))
    leg('neapolis', 'land', ashore('neapolis'))
    leg('philippi', 'land', land('neapolis', 'philippi'))
    leg('thessalonica', 'land', land('philippi', AMPHIPOLIS, APOLLONIA, 'thessalonica'))
    leg('berea', 'land', land('thessalonica', 'berea'))
    leg(None, 'land', land('berea', 'pydna') + [harbour('pydna')])
    leg(None, 'sea', seaway(harbour('pydna'), harbour('piraeus')))
    leg('athens', 'land', [harbour('piraeus')] + land('piraeus', 'athens'))
    leg('corinth', 'land', land('athens', (38.0, 23.35), 'corinth'))
    leg('cenchrea', 'land', land('corinth', 'cenchrea'), True)
    leg(None, 'land', ashore('cenchrea', True), True)
    leg(None, 'sea', seaway(harbour('cenchrea'), harbour('ephesus')), True)
    leg('ephesus', 'land', ashore('ephesus'), True)
    leg(None, 'land', ashore('ephesus', True), True)
    leg(None, 'sea', seaway(harbour('ephesus'), harbour('caesarea')), True)
    leg('caesarea', 'land', ashore('caesarea'), True)
    leg('jerusalem', 'land', land('caesarea', 'jerusalem'), True)
    leg('antioch', 'land', land('jerusalem', (32.921, 35.069), (33.271, 35.196), (33.56, 35.37), (33.89, 35.50),
                               (34.43, 35.83), (35.52, 35.78), 'antioch'), True)


def third():
    to_galatia()
    leg('ephesus', 'land', land('antiochP', (38.07, 30.17), (38.35, 28.52), 'ephesus'))
    leg('troas', 'land', land('ephesus', (38.42, 27.14), (39.12, 27.18), 'troas'))
    leg(None, 'land', ashore('troas', True))
    leg(None, 'sea', seaway(harbour('troas'), harbour('neapolis')))
    leg('neapolis', 'land', ashore('neapolis'))
    leg('philippi', 'land', land('neapolis', 'philippi'))
    north = land('philippi', AMPHIPOLIS, APOLLONIA, 'thessalonica', 'berea')
    south = land('berea', (39.64, 22.42), (38.80, 22.54), (38.32, 23.32), (38.0, 23.35), 'corinth')
    leg('corinth', 'land', north + south[1:])
    leg('philippi', 'land', (north + south[1:])[::-1], True)
    leg('neapolis', 'land', land('philippi', 'neapolis'), True)
    leg(None, 'land', ashore('neapolis', True), True)
    leg(None, 'sea', seaway(harbour('neapolis'), harbour('troas')), True)
    leg('troas', 'land', ashore('troas'), True)
    leg('assos', 'land', land('troas', 'assos'), True)
    leg(None, 'land', ashore('assos', True), True)
    leg('mitylene', 'sea', seaway(harbour('assos'), harbour('mitylene')), True)
    leg(None, 'sea', seaway(harbour('mitylene'), harbour((38.37, 26.14)), harbour((37.69, 26.95)), harbour('miletus')), True)
    leg('miletus', 'land', ashore('miletus'), True)
    leg(None, 'land', ashore('miletus', True), True)
    leg('patara', 'sea', seaway(harbour('miletus'), harbour('cos'), harbour('rhodes'), harbour('patara')), True)
    leg('tyre', 'sea', seaway(harbour('patara'), harbour('tyre')), True)
    leg('ptolemais', 'sea', seaway(harbour('tyre'), harbour('ptolemais')), True)
    leg('caesarea', 'land', land('ptolemais', 'caesarea'), True)
    leg('jerusalem', 'land', land('caesarea', 'jerusalem'), True)


def voyage():
    leg(None, 'land', ashore('caesarea', True))
    leg(None, 'sea', seaway(harbour('caesarea'), harbour('sidon')))
    leg('sidon', 'land', ashore('sidon'))
    leg(None, 'land', ashore('sidon', True))
    # In the lee of Cyprus, east and north of it, then along Cilicia and Pamphylia (27:4–5).
    leg(None, 'sea', seaway(harbour('sidon'), harbour((35.85, 34.75)), harbour((36.2, 33.3)), harbour((36.45, 31.4)), harbour('myra')))
    leg('myra', 'land', ashore('myra'))
    leg(None, 'land', ashore('myra', True))
    leg('cnidus', 'sea', seaway(harbour('myra'), harbour((36.55, 28.0)), harbour('cnidus')))
    # Round Cape Salmone and along the south coast of Crete (27:7–8).
    leg(None, 'sea', seaway(harbour('cnidus'), harbour((35.30, 26.40)), harbour((34.98, 25.6)), harbour('fairHavens')))
    leg('fairHavens', 'land', ashore('fairHavens'))
    leg(None, 'land', ashore('fairHavens', True))
    leg('cauda', 'sea', seaway(harbour('fairHavens'), harbour('matala'), harbour('caudaPt')))
    # Fourteen days adrift, drawn straight (27:27).
    leg('bay', 'sea', sea(harbour('caudaPt'), (35.2, 21.3), (35.6, 18.3), (35.85, 15.6), end=harbour('bay')), wreck=True)
    leg('malta', 'land', [harbour('bay')] + land('bay', 'malta'))
    leg(None, 'land', land('malta', 'valletta') + [harbour('valletta')])
    leg(None, 'sea', seaway(harbour('valletta'), harbour('syracuse')))
    leg('syracuse', 'land', ashore('syracuse'))
    leg(None, 'land', ashore('syracuse', True))
    leg('rhegium', 'sea', seaway(harbour('syracuse'), harbour('rhegium')))
    leg('puteoli', 'sea', seaway(harbour('rhegium'), harbour('puteoli')))
    leg('forum', 'land', ashore('puteoli') + land('puteoli', (41.08, 14.25), (41.16, 13.84), (41.29, 13.25), 'forum')[1:])
    leg('taverns', 'land', land('forum', 'taverns'))
    leg('rome', 'land', land('taverns', (41.72, 12.67), 'rome'))


ROUTES = {'pauls-first-journey': first, 'pauls-second-journey': second, 'pauls-third-journey': third, 'pauls-voyage-to-rome': voyage}
ROUTES[NAME]()

with open(os.path.join(ROOT, NAME, 'route.js'), 'w', encoding='utf-8') as f:
    f.write('// Generated by tools/route.py from terrain.png and the PLACES in data.js. Do not edit.\n')
    f.write('// Plan kilometres [x east, n north]. by: land | sea; back: on the way home; wreck: the ship is wrecked at the end.\n')
    f.write('export const LEGS = [\n')
    for L in LEGS:
        to = f"'{L['to']}'" if L['to'] else 'null'
        wreck = ', wreck: true' if L['wreck'] else ''
        f.write(f"  {{ to: {to}, by: '{L['by']}', back: {str(L['back']).lower()}{wreck}, pts: {rnd(L['pts'])} }},\n")
    f.write('];\n')
for L in LEGS:
    p = np.array(L['pts'])
    print(L['to'], L['by'], len(p), 'pts', f"{np.hypot(*np.diff(p, axis=0).T).sum():.0f} km")
