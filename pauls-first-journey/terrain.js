// The map: a flat projection of the eastern Mediterranean in kilometres, and
// the height maps made by tools/terrain.py from real elevation data.
//
// Plan coordinates: x = km east, n = km north of LON0, LAT0 (an equirectangular
// projection, true to scale near the middle of the map). World: X = x, Z = -n,
// Y = height in km, raised EXAG times so the mountains show.

export const LON0 = 33.2, LAT0 = 36.6;
export const KX = 111.32 * Math.cos((LAT0 * Math.PI) / 180);   // km per degree of longitude
export const KN = 110.96;                                       // km per degree of latitude
export const EXAG = 3;

export const plan = (lat, lon) => ({ x: (lon - LON0) * KX, n: (lat - LAT0) * KN });

// The two maps: column 0 is x = x0, row 0 is n = n1, `step` km per pixel.
export const FINE = { url: 'terrain.png', x0: -375, n1: 300, step: 0.5 };
export const WIDE = { url: 'terrain-wide.png', x0: -1050, n1: 950, step: 3 };

// Reads a height map: v = h + 3000 metres, red the high byte and green the low;
// blue marks lakes.
export async function loadMap(map) {
  const blob = await (await fetch(new URL(map.url, import.meta.url))).blob();
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
// squeezed so the coast shelves off without deep holes under the water.
export function worldY(m, lake) {
  if (lake) return (m * EXAG) / 1000;
  if (m > 0) return 0.015 + (m * EXAG) / 1000;
  return -0.05 - Math.sqrt(-m) * 0.012;
}
