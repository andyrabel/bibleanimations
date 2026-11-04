"""Builds the height maps for "Paul's First Missionary Journey".

Downloads Terrarium elevation tiles (Mapzen / AWS open data, a mix of SRTM,
ETOPO1 and GMTED) and resamples them onto the animation's flat map grid:

  terrain.png       the journey's region, 0.5 km per pixel
  terrain-wide.png  the lands and seas around it, 3 km per pixel

Each pixel stores its height in metres as v = h + 3000 (clamped to 0..8000):
red = v >> 8, green = v & 255. Blue is 255 on lakes (flat water above sea level).

The map is an equirectangular projection centred on LON0, LAT0, in kilometres:
x = (lon - LON0) * KX east, n = (lat - LAT0) * KN north. main.js uses the same
constants (terrain.js).

Run from the repository root:  python3 pauls-first-journey/tools/terrain.py CACHE_DIR
"""
import io, math, os, sys, urllib.request
import numpy as np
from PIL import Image

LON0, LAT0 = 33.2, 36.6
KX = 111.32 * math.cos(math.radians(LAT0))
KN = 110.96
OUT = os.path.join(os.path.dirname(__file__), '..')
CACHE = sys.argv[1] if len(sys.argv) > 1 else '/tmp/terrarium'
os.makedirs(CACHE, exist_ok=True)


def tile(z, x, y):
    path = os.path.join(CACHE, f'{z}-{x}-{y}.png')
    if not os.path.exists(path):
        url = f'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'
        with urllib.request.urlopen(url) as r, open(path, 'wb') as f:
            f.write(r.read())
    a = np.asarray(Image.open(path).convert('RGB'), dtype=np.float64)
    return a[..., 0] * 256 + a[..., 1] + a[..., 2] / 256 - 32768


def merc(lon, lat, z):
    s = 2 ** z * 256
    px = (lon + 180) / 360 * s
    py = (1 - np.log(np.tan(np.radians(lat)) + 1 / np.cos(np.radians(lat))) / np.pi) / 2 * s
    return px, py


def grid(x0, x1, n0, n1, step, z):
    xs = np.arange(x0, x1 + step / 2, step)
    ns = np.arange(n1, n0 - step / 2, -step)          # row 0 is the north edge
    X, N = np.meshgrid(xs, ns)
    lon, lat = LON0 + X / KX, LAT0 + N / KN
    px, py = merc(lon, lat, z)
    tx0, ty0 = int(px.min() // 256), int(py.min() // 256)
    tx1, ty1 = int(px.max() // 256), int(py.max() // 256)
    mosaic = np.zeros(((ty1 - ty0 + 1) * 256, (tx1 - tx0 + 1) * 256))
    for ty in range(ty0, ty1 + 1):
        for tx in range(tx0, tx1 + 1):
            mosaic[(ty - ty0) * 256:(ty - ty0 + 1) * 256, (tx - tx0) * 256:(tx - tx0 + 1) * 256] = tile(z, tx, ty)
    u, v = px - tx0 * 256 - 0.5, py - ty0 * 256 - 0.5
    i0, j0 = np.floor(u).astype(int), np.floor(v).astype(int)
    fu, fv = u - i0, v - j0
    H, W = mosaic.shape
    def at(j, i): return mosaic[np.clip(j, 0, H - 1), np.clip(i, 0, W - 1)]
    h = (at(j0, i0) * (1 - fu) * (1 - fv) + at(j0, i0 + 1) * fu * (1 - fv)
         + at(j0 + 1, i0) * (1 - fu) * fv + at(j0 + 1, i0 + 1) * fu * fv)
    return h, mosaic, (tx0, ty0), (u, v)


def lakes(h, mosaic, uv, min_px):
    """Water above sea level: the tiles are dead flat there."""
    u, v = uv
    H, W = mosaic.shape
    m = mosaic
    flat = np.ones_like(m, dtype=bool)
    for dj in (-2, -1, 0, 1, 2):
        for di in (-2, -1, 0, 1, 2):
            flat &= np.abs(np.roll(np.roll(m, dj, 0), di, 1) - m) < 0.01
    flat &= m > 5
    # Keep the big flat patches only (a flood fill over the candidates).
    lab = np.zeros(m.shape, dtype=np.int32)
    keep = np.zeros(m.shape, dtype=bool)
    ys, xs = np.nonzero(flat)
    nid = 0
    for y0, x0 in zip(ys, xs):
        if lab[y0, x0]:
            continue
        nid += 1
        stack, comp = [(y0, x0)], []
        lab[y0, x0] = nid
        while stack:
            y, x = stack.pop()
            comp.append((y, x))
            for yy, xx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                if 0 <= yy < H and 0 <= xx < W and flat[yy, xx] and not lab[yy, xx]:
                    lab[yy, xx] = nid
                    stack.append((yy, xx))
        if len(comp) >= min_px:
            cy, cx = zip(*comp)
            keep[list(cy), list(cx)] = True
    # Grow by the window's radius (the test above trims the edges).
    for _ in range(2):
        keep = keep | (np.roll(keep, 1, 0) & (m > 5)) | (np.roll(keep, -1, 0) & (m > 5)) | (np.roll(keep, 1, 1) & (m > 5)) | (np.roll(keep, -1, 1) & (m > 5))
    i, j = np.clip(np.round(u).astype(int), 0, W - 1), np.clip(np.round(v).astype(int), 0, H - 1)
    return keep[j, i]


def save(name, h, lake):
    v = np.clip(np.round(h), -3000, 5000).astype(np.int32) + 3000
    img = np.zeros(h.shape + (3,), dtype=np.uint8)
    img[..., 0] = v >> 8
    img[..., 1] = v & 255
    img[..., 2] = np.where(lake, 255, 0)
    Image.fromarray(img, 'RGB').save(os.path.join(OUT, name), optimize=True)
    print(name, h.shape, f'{h.min():.0f}..{h.max():.0f} m', f'lakes {lake.sum()} px')


if __name__ == '__main__':
    h, mosaic, _, uv = grid(-375, 375, -300, 300, 0.5, 8)
    save('terrain.png', h, lakes(h, mosaic, uv, 60))
    np.save(os.path.join(CACHE, 'fine.npy'), h)
    h, mosaic, _, uv = grid(-1050, 1050, -950, 950, 3, 6)
    save('terrain-wide.png', h, lakes(h, mosaic, uv, 12))
