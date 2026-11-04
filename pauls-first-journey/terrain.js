// The maps for Paul's journeys: a flat projection in kilometres, and the
// height maps made by tools/terrain.py from real elevation data.
//
// Plan coordinates: x = km east, n = km north of a journey's centre (MAP.lon0,
// MAP.lat0 in its data.js), an equirectangular projection true to scale along
// that latitude. World: X = x, Z = -n, Y = height in km, raised EXAG times so
// the mountains show.

export const EXAG = 3;

// plan(lat, lon) for a map centred on lon0, lat0.
export function projection(lon0, lat0) {
  const kx = 111.32 * Math.cos((lat0 * Math.PI) / 180);   // km per degree of longitude
  const kn = 110.96;                                     // km per degree of latitude
  return (lat, lon) => ({ x: (lon - lon0) * kx, n: (lat - lat0) * kn });
}

// Reads a height map { url, x0, n1, step } (column 0 is x = x0, row 0 is
// n = n1, `step` km per pixel; url relative to `base`): v = h + 3000 metres,
// red the high byte and green the low; blue marks lakes.
export async function loadMap(map, base) {
  const blob = await (await fetch(new URL(map.url, base))).blob();
  const bmp = await createImageBitmap(blob, { colorSpaceConversion: 'none', premultiplyAlpha: 'none' });
  const c = document.createElement('canvas');
  c.width = bmp.width; c.height = bmp.height;
  const g = c.getContext('2d', { willReadFrequently: true });
  g.drawImage(bmp, 0, 0);
  const d = g.getImageData(0, 0, c.width, c.height).data;
  const W = c.width, H = c.height;
  const h = new Float32Array(W * H), lake = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) {
    h[i] = d[i * 4] * 256 + d[i * 4 + 1] - 3000;
    lake[i] = d[i * 4 + 2] > 127 ? 1 : 0;
  }
  return { ...map, W, H, h, lake };
}

// World height (km, exaggerated) for a height in metres. The sea floor is
// squeezed so there are no deep holes under the water, but it starts well
// below the sea surface (at y = -0.03, see journey.js): a shallow floor just
// under it fights it for depth from far away, and the shoreline flickers.
export function worldY(m, lake) {
  if (lake) return (m * EXAG) / 1000;
  if (m >= 0) return 0.015 + (m * EXAG) / 1000;   // 0 m is low coast, not sea
  return -0.3 - Math.sqrt(-m) * 0.012;
}
