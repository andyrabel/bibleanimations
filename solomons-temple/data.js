// Content for "Solomon's Temple".
// Plan coordinates: x = cubits east, n = cubits north, with the origin at the
// inside face of the front wall, in the middle of the doorway of the main room.
// One world unit is one cubit (about 45 cm), so the sizes in the text can be
// used directly. The house faces east, like the tabernacle.
//
// The tour follows 1 Kings 6–7, with what 2 Chronicles 3–4 adds: the house
// from the foundation up, its inside from the cedar to the gold, the court,
// then Hiram's bronze work and the gold furnishings.

// Text fields below are English. Any of them may be a plain string (the same in
// every English version) or an object keyed by version id (see VERSIONS in ../i18n.js),
// with an optional `default` used by versions not listed. Other languages are in
// lang/<lang>.js.

// Words that differ between versions. Any text field may contain {term}
// (or {Term} for a capital first letter) and gets the current version's word.
export const TERMS = {
  house: { niv: 'temple', default: 'house' },
  porch: { niv: 'portico', esv: 'vestibule', default: 'porch' },
  mainRoom: { nasb: 'main room', niv: 'main hall', esv: 'nave', kjv: 'temple' },
  inner: { kjv: 'oracle', default: 'inner sanctuary' },
  cypress: { nasb: 'juniper', niv: 'juniper', esv: 'cypress', kjv: 'fir' },
  olive: { kjv: 'olive tree', default: 'olive wood' },
  bronze: { kjv: 'brass', default: 'bronze' },
  court: { nasb: 'courtyard', niv: 'courtyard', default: 'court' },
  hiram: { niv: 'Huram', default: 'Hiram' },
  jachin: { niv: 'Jakin', default: 'Jachin' },
  capitals: { kjv: 'chapiters', default: 'capitals' },
  sea: { kjv: 'molten sea', default: 'Sea' },
  oxen: { niv: 'bulls', default: 'oxen' },
  stands: { kjv: 'bases', default: 'stands' },
  basins: { kjv: 'lavers', default: 'basins' },
  lampstands: { kjv: 'candlesticks', default: 'lampstands' },
  bread: { kjv: 'shewbread', default: 'bread of the Presence' },
  veil: { niv: 'curtain', kjv: 'vail', default: 'veil' },
  blue: { nasb: 'violet', default: 'blue' },
  ziv: { kjv: 'Zif', default: 'Ziv' },
};

// Materials the popup lists for each stop; those the text doesn't use there are greyed out.
export const MATERIALS = {
  stone: 'Stone',
  cedar: 'Cedar',
  cypress: '{Cypress}',
  olive: '{Olive}',
  gold: 'Gold',
  bronze: '{Bronze}',
};

// The house, inside faces: the main room runs from HOUSE.inner (the cedar
// partition) to HOUSE.east, the inner sanctuary from HOUSE.west to HOUSE.inner (6:2, 16–17, 20).
export const HOUSE = { west: -60, inner: -40, east: 0, half: 10, height: 30, innerHeight: 20 };
export const PORCH = { depth: 10, height: 20 };   // 6:3; the height is from 2 Chronicles 3:4 (see the stop)
// The inner court (6:36) and the great court (7:12; 2 Chronicles 4:9). Their sizes aren't given.
export const COURT = { west: -100, east: 100, half: 50 };
export const GREAT = { west: -150, east: 150, south: -120, north: 90 };

// Where things stand. Kings gives the sides (7:21, 39, 49); exact spots are a guess.
export const PLACES = {
  jachin: { x: 21, n: -6 },
  boaz: { x: 21, n: 6 },
  sea: { x: 34, n: -38 },
  altar: { x: 56, n: 0 },
  standsX: [-52, -38, -24, -10, 4],
  standsN: 33,
  incense: { x: -36, n: 0 },
};

// Labelled things. kind: 'item' (boxed), 'feature' (small), 'region' (large),
// 'mount' (large, italic). `group` hides the label until that piece is built;
// `inside` hides it unless the walls are cut away (true: the house; 'chambers': the side chambers too).
export const FEATURES = {
  mainRoom: { name: { nasb: 'Main Room', niv: 'Main Hall', esv: 'Nave', kjv: 'Temple' }, x: -20, n: 0, lift: 36, kind: 'feature', group: 'roof' },
  mostHoly: { name: 'Most Holy Place', x: -50, n: 0, lift: 36, kind: 'feature', group: 'roof' },
  porch: { name: '{Porch}', x: 11, n: 0, lift: 25, kind: 'feature', group: 'porch' },
  chambers: { name: { niv: 'Side Rooms', kjv: 'Chambers', default: 'Side Chambers' }, x: -30, n: -22.5, lift: 21, kind: 'feature', group: 'chambers' },
  stair: { name: { niv: 'Stairway', esv: 'Stairs', default: 'Winding Stair' }, x: -20.5, n: -18.5, lift: 14, kind: 'item', group: 'stair', inside: 'chambers' },
  incense: { name: { kjv: 'Altar of Gold', default: 'Golden Altar' }, x: -36, n: 0, lift: 4.5, kind: 'item', group: 'altarGold', inside: true },
  cherubim: { name: { kjv: 'Cherubims', default: 'Cherubim' }, x: -50, n: 0, lift: 12, kind: 'item', group: 'cherubim', inside: true },
  innerDoors: { name: { kjv: 'Doors of the Oracle', default: 'Doors of the Inner Sanctuary' }, x: -40, n: 0, lift: 11, kind: 'item', group: 'innerDoors', inside: true },
  veil: { name: { niv: 'Curtain', kjv: 'Vail', default: 'Veil' }, x: -43.2, n: 0, lift: 13, kind: 'item', group: 'veil', inside: true },
  doors: { name: { nasb: 'Doors of the Main Room', niv: 'Doors of the Main Hall', esv: 'Doors of the Nave', kjv: 'Doors of the Temple' }, x: 0, n: 0, lift: 13, kind: 'item', group: 'outerDoors' },
  lampstands: { name: '{Lampstands}', x: -20, n: -6.5, lift: 6, kind: 'item', group: 'lampstands', inside: true },
  tables: { name: { kjv: 'Tables of Shewbread', default: 'Tables' }, x: -20, n: 7.5, lift: 4.5, kind: 'item', group: 'tables', inside: true },
  jachin: { name: '{Jachin}', x: 21, n: -6, lift: 27, kind: 'item', group: 'pillars' },
  boaz: { name: 'Boaz', x: 21, n: 6, lift: 27, kind: 'item', group: 'pillars' },
  sea: { name: { kjv: 'Molten Sea', default: 'The Sea' }, x: 34, n: -38, lift: 11, kind: 'item', group: 'sea' },
  standsS: { name: '{Stands}', x: -24, n: -33, lift: 8, kind: 'item', group: 'stands' },
  standsN: { name: '{Stands}', x: -24, n: 33, lift: 8, kind: 'item', group: 'stands' },
  altar: { name: { kjv: 'Altar of Brass', default: 'Bronze Altar' }, x: 56, n: 0, lift: 14, kind: 'item', group: 'altar' },
  innerCourt: { name: { nasb: 'Inner Courtyard', niv: 'Inner Courtyard', default: 'Inner Court' }, x: 80, n: -44, lift: 8, kind: 'feature', group: 'court' },
  greatCourt: { name: { nasb: 'Great Courtyard', niv: 'Large Court', default: 'Great Court' }, x: 120, n: -105, lift: 10, kind: 'feature', group: 'greatCourt' },
  cityOfDavid: { name: 'City of David', x: 30, n: -1500, lift: 60, kind: 'region' },
  kidron: { name: 'Kidron Valley', x: 600, n: -500, lift: 40, kind: 'region' },
  olives: { name: 'Mount of Olives', x: 1950, n: 150, lift: 120, kind: 'mount' },
};

export const INTRO = {
  title: 'Jerusalem, Mount Moriah',
  ref: '1 Kings 6:1',
  quote: {
    nasb: '“Now it came about in the four hundred and eightieth year after the sons of Israel came out of the land of Egypt, in the fourth year of Solomon’s reign over Israel, in the month of Ziv, that is, the second month, that he began to build the house of the LORD.”',
    niv: '“In the four hundred and eightieth year after the Israelites came out of Egypt, in the fourth year of Solomon’s reign over Israel, in the month of Ziv, the second month, he began to build the temple of the LORD.”',
    esv: '“In the four hundred and eightieth year after the people of Israel came out of the land of Egypt, in the fourth year of Solomon’s reign over Israel, in the month of Ziv, which is the second month, he began to build the house of the LORD.”',
    kjv: '“And it came to pass in the four hundred and eightieth year after the children of Israel were come out of the land of Egypt, in the fourth year of Solomon’s reign over Israel, in the month Zif, which is the second month, that he began to build the house of the LORD.”',
  },
  note: 'David wanted to build a house for the LORD, but God said that his son would build it (2 Samuel 7:12–13; 1 Kings 5:3–5). Solomon made a treaty with Hiram, king of Tyre, for cedar and {cypress} from Lebanon, and his men quarried great stones for the foundation (5:6–18). This tour follows 1 Kings 6–7, with what 2 Chronicles 3–4 adds, and each part goes up as we arrive.',
  aside: 'Everything is drawn to the sizes the text gives, in cubits. 2 Chronicles 3:3 says the cubit was “of the old standard”; here 1 cubit ≈ 45 cm. Where the text gives no size or position, as for the walls’ thickness or the courts, the model is a guess, and the notes say so. The few people are only there to show the scale.',
};

export const FINALE = {
  title: 'The Word of the LORD to Solomon',
  ref: '1 Kings 6:13',
  quote: {
    nasb: '“And I will dwell among the sons of Israel, and will not abandon My people Israel.”',
    niv: '“And I will live among the Israelites and will not abandon my people Israel.”',
    esv: '“And I will dwell among the children of Israel and will not forsake my people Israel.”',
    kjv: '“And I will dwell among the children of Israel, and will not forsake my people Israel.”',
  },
  note: 'The word came while the house was being built, and it came with a condition: if Solomon walked in God’s statutes, God would keep his promise to David (6:11–12). When the house was dedicated, the cloud filled it, and the priests could not stand to minister (8:10–11). About four centuries later, the Babylonians burned it (2 Kings 25:9).',
};

// Tour stops, in the order of 1 Kings 6–7.
// build: groups (made in main.js) that go up on the way in, one after another.
// look / cam: where the camera looks and where it sits ({ x, n } plan, y height).
// cutaway: 'house' fades the south walls, the south side chambers and the
// roofs so the inside can be seen; 'chambers' fades only the side chambers' south wall.
// materials: keys of MATERIALS the text uses for this stop.
export const STOPS = [
  {
    title: 'Mount Moriah', ref: '2 Chronicles 3:1', build: ['foundation'],
    quote: {
      nasb: '“Then Solomon began to build the house of the LORD in Jerusalem on Mount Moriah, where the LORD had appeared to his father David, at the place that David had prepared on the threshing floor of Ornan the Jebusite.”',
      niv: '“Then Solomon began to build the temple of the LORD in Jerusalem on Mount Moriah, where the LORD had appeared to his father David. It was on the threshing floor of Araunah the Jebusite, the place provided by David.”',
      esv: '“Then Solomon began to build the house of the LORD in Jerusalem on Mount Moriah, where the LORD had appeared to David his father, at the place that David had appointed, on the threshing floor of Ornan the Jebusite.”',
      kjv: '“Then Solomon began to build the house of the LORD at Jerusalem in mount Moriah, where the LORD appeared unto David his father, in the place that David had prepared in the threshingfloor of Ornan the Jebusite.”',
    },
    note: 'David bought this threshing floor on the hill north of his city and built an altar there when the plague stopped (2 Samuel 24:18–25; 1 Chronicles 21:18–22:1). The foundation was laid in the month of {Ziv}, in Solomon’s fourth year (6:37), on the usual reckoning about 966 BC. The great stones had been cut and dressed by Solomon’s and Hiram’s builders and the men of Gebal (5:17–18).',
    materials: ['stone'],
    size: 'The house 60 × 20 cubits inside (27 × 9 m)',
    look: { x: -25, n: -5, y: 0 }, cam: { x: 70, n: -110, y: 70 },
  },
  {
    title: 'The {House} Goes Up', ref: '1 Kings 6:7', build: ['walls'],
    quote: {
      nasb: '“The house, while it was being built, was built of stone finished at the quarry, and neither hammer, nor axe, nor any iron tool was heard in the house while it was being built.”',
      niv: '“In building the temple, only blocks dressed at the quarry were used, and no hammer, chisel or any other iron tool was heard at the temple site while it was being built.”',
      esv: '“When the house was built, it was with stone prepared at the quarry, so that neither hammer nor axe nor any tool of iron was heard in the house while it was being built.”',
      kjv: '“And the house, when it was in building, was built of stone made ready before it was brought thither: so that there was neither hammer nor axe nor any tool of iron heard in the house, while it was in building.”',
    },
    note: 'Sixty cubits long, twenty wide and thirty high (6:2): twice the length and width of the tabernacle’s tent, and three times its height. The thickness of the walls isn’t given; they are drawn six cubits thick at the foot, like those of Ezekiel’s temple (Ezekiel 41:5), stepping in a cubit at the second and third storeys of the side chambers (see stop 5).',
    materials: ['stone'],
    size: '60 × 20 × 30 cubits inside (27 × 9 × 13.5 m)',
    look: { x: -28, n: 0, y: 10 }, cam: { x: 45, n: -80, y: 38 },
  },
  {
    title: 'The {Porch}', ref: '1 Kings 6:3', build: ['porch'],
    quote: {
      nasb: '“The porch in front of the main room of the house was twenty cubits in length, corresponding to the width of the house, and its width along the front of the house was ten cubits.”',
      niv: '“The portico at the front of the main hall of the temple extended the width of the temple, that is twenty cubits, and projected ten cubits from the front of the temple.”',
      esv: '“The vestibule in front of the nave of the house was twenty cubits long, equal to the width of the house, and ten cubits deep in front of the house.”',
      kjv: '“And the porch before the temple of the house, twenty cubits was the length thereof, according to the breadth of the house; and ten cubits was the breadth thereof before the house.”',
    },
    note: 'Kings gives no height. 2 Chronicles 3:4 gives twenty cubits in some ancient translations and 120 in the Hebrew text; a tower four times the height of the house seems unlikely, so it is drawn twenty, the reading of NASB and NIV. Inside it was overlaid with pure gold (2 Chronicles 3:4). Whether the front was open isn’t said; it is drawn open.',
    materials: ['stone', 'gold'],
    size: '20 × 10 cubits (9 × 4.5 m)',
    look: { x: 8, n: 0, y: 10 }, cam: { x: 62, n: -42, y: 22 },
  },
  {
    title: 'The Windows', ref: '1 Kings 6:4', build: ['windows'],
    quote: {
      nasb: '“Also for the house he made windows with artistic frames.”',
      niv: '“He made narrow windows high up in the temple walls.”',
      esv: '“And he made for the house windows with recessed frames.”',
      kjv: '“And for the house he made windows of narrow lights.”',
    },
    note: 'The Hebrew words are uncertain: frames that narrow inwards, or windows closed with lattices. They can only have been high in the walls, above the side chambers. Their number isn’t given; five a side are drawn, all in the {mainRoom}. None are mentioned for the {inner}, and Solomon would say that the LORD dwells in thick darkness (8:12).',
    materials: [],
    size: 'Number and size not given',
    look: { x: -18, n: -12, y: 24 }, cam: { x: 8, n: -62, y: 30 },
  },
  {
    title: 'The Side Chambers', ref: '1 Kings 6:6', build: ['chambers'],
    quote: {
      nasb: '“The lowest story was five cubits wide, the middle was six cubits wide, and the third was seven cubits wide; for on the outside he made offsets in the wall of the house all around so that the beams would not be inserted into the walls of the house.”',
      niv: '“The lowest floor was five cubits wide, the middle floor six cubits and the third floor seven. He made offset ledges around the outside of the temple so that nothing would be inserted into the temple walls.”',
      esv: '“The lowest story was five cubits broad, the middle one was six cubits broad, and the third was seven cubits broad. For around the outside of the house he made offsets on the wall in order that the supporting beams should not be inserted into the walls of the house.”',
      kjv: '“The nethermost chamber was five cubits broad, and the middle was six cubits broad, and the third was seven cubits broad: for without in the wall of the house he made narrowed rests round about, that the beams should not be fastened in the walls of the house.”',
    },
    note: 'Three storeys of rooms run round the sides and back of the house (6:5), each five cubits high, joined to it with cedar timbers (6:10). The wall steps in a cubit at each storey, so each storey is a cubit wider than the one below, and its beams rest on the ledge. The number of rooms and the outer wall’s thickness aren’t given; Ezekiel’s temple had thirty rooms on each storey (Ezekiel 41:6).',
    materials: ['stone', 'cedar'],
    size: 'Storeys 5, 6 and 7 cubits wide, each 5 high',
    look: { x: -38, n: -18, y: 7 }, cam: { x: -2, n: -66, y: 18 },
  },
  {
    title: 'The Winding Stair', ref: '1 Kings 6:8', build: ['stair'], cutaway: 'chambers',
    quote: {
      nasb: '“The doorway for the lowest side chamber was on the right side of the house; and they would go up by a winding staircase to the middle story, and from the middle to the third.”',
      niv: '“The entrance to the lowest floor was on the south side of the temple; a stairway led up to the middle level and from there to the third.”',
      esv: '“The entrance for the lowest story was on the south side of the house, and one went up by stairs to the middle story, and from the middle story to the third.”',
      kjv: '“The door for the middle chamber was in the right side of the house: and they went up with winding stairs into the middle chamber, and out of the middle into the third.”',
    },
    note: 'The right side is the south, for someone facing out of the house towards the east. The Hebrew text says the door led to the middle chamber, the Greek to the lowest. The word for the stair is rare and may mean a winding stair or trapdoors with ladders; where it stood isn’t said. It is drawn as a winding stair inside the door, with the outer wall cut away.',
    materials: [],
    look: { x: -20, n: -19, y: 7 }, cam: { x: -4, n: -50, y: 12 },
  },
  {
    title: 'The Roof of Cedar', ref: '1 Kings 6:9', build: ['roof'],
    quote: {
      nasb: '“So he built the house and finished it; and he covered the house with beams and planks of cedar.”',
      niv: '“So he built the temple and completed it, roofing it with beams and cedar planks.”',
      esv: '“So he built the house and finished it, and he made the ceiling of the house of beams and planks of cedar.”',
      kjv: '“So he built the house, and finished it; and covered the house with beams and boards of cedar.”',
    },
    note: 'The cedar was cut in Lebanon by Hiram’s men and Solomon’s, brought down to the sea and floated in rafts down the coast (5:6–9). The beams span the twenty cubits of the {mainRoom}. The roof is drawn flat; nothing is said of a parapet. The {porch} and the side chambers have their own roofs.',
    materials: ['cedar'],
    look: { x: -28, n: 0, y: 26 }, cam: { x: 30, n: -70, y: 62 },
  },
  {
    title: 'Cedar Within', ref: '1 Kings 6:18', build: ['panels', 'floor'], cutaway: 'house',
    quote: {
      nasb: '“There was cedar inside the house, carved in the shape of gourds and open flowers; everything was cedar, there was no stone visible.”',
      niv: '“The inside of the temple was cedar, carved with gourds and open flowers. Everything was cedar; no stone was to be seen.”',
      esv: '“The cedar within the house was carved in the form of gourds and open flowers. All was cedar; no stone was seen.”',
      kjv: '“And the cedar of the house within was carved with knops and open flowers: all was cedar; there was no stone seen.”',
    },
    note: 'Cedar boards line the walls from the floor to the ceiling, and the floor is boarded with {cypress} (6:15). The south wall is cut away here, and in the stops that look inside.',
    materials: ['cedar', 'cypress'],
    look: { x: -22, n: 2, y: 9 }, cam: { x: 4, n: -46, y: 20 },
  },
  {
    title: 'The {Inner}', ref: '1 Kings 6:16', build: ['partition'], cutaway: 'house',
    quote: {
      nasb: '“He also built twenty cubits on the rear part of the house with boards of cedar from the floor to the ceiling; he built them for it on the inside as an inner sanctuary, as the Most Holy Place.”',
      niv: '“He partitioned off twenty cubits at the rear of the temple with cedar boards from floor to ceiling to form within the temple an inner sanctuary, the Most Holy Place.”',
      esv: '“He built twenty cubits of the rear of the house with boards of cedar from the floor to the walls, and he built this within as an inner sanctuary, as the Most Holy Place.”',
      kjv: '“And he built twenty cubits on the sides of the house, both the floor and the walls with boards of cedar: he even built them for it within, even for the oracle, even for the most holy place.”',
    },
    note: 'A cube of twenty cubits each way (6:20), prepared for the ark of the covenant (6:19). The house is thirty cubits high, so either the floor was raised or the ceiling was lower; it is drawn with a lower ceiling. 2 Chronicles 3:9 mentions upper rooms overlaid with gold, which may be the space above. The {mainRoom} in front is forty cubits long (6:17).',
    materials: ['cedar'],
    size: '20 × 20 × 20 cubits (9 m each way)',
    look: { x: -46, n: 0, y: 9 }, cam: { x: -24, n: -44, y: 18 },
  },
  {
    title: 'Overlaid with Gold', ref: '1 Kings 6:21', build: ['gold', 'chains', 'altarGold'], cutaway: 'house',
    quote: {
      nasb: '“So Solomon overlaid the inside of the house with pure gold. And he extended chains of gold across the front of the inner sanctuary, and he overlaid it with gold.”',
      niv: '“Solomon covered the inside of the temple with pure gold, and he extended gold chains across the front of the inner sanctuary, which was overlaid with gold.”',
      esv: '“And Solomon overlaid the inside of the house with pure gold, and he drew chains of gold across, in front of the inner sanctuary, and overlaid it with gold.”',
      kjv: '“So Solomon overlaid the house within with pure gold: and he made a partition by the chains of gold before the oracle; and he overlaid it with gold.”',
    },
    note: 'The whole house is overlaid with gold, and the altar of cedar that belongs to the {inner} (6:20–22), the altar of incense in front of it (7:48). 2 Chronicles 3:6–8 adds precious stones, gold of Parvaim, and 600 talents of gold for the Most Holy Place, about twenty tonnes. How the chains hung isn’t said; they are drawn across the front of the partition.',
    materials: ['cedar', 'gold'],
    size: 'Altar of incense: size not given',
    look: { x: -38, n: 0, y: 8 }, cam: { x: -10, n: -40, y: 16 },
  },
  {
    title: 'The Cherubim', ref: '1 Kings 6:27', build: ['cherubim', 'cherubGold'], cutaway: 'house',
    quote: {
      nasb: '“He placed the cherubim in the midst of the inner house, and the wings of the cherubim spread out so that the wing of the one was touching the one wall, and the wing of the other cherub was touching the other wall. And their wings were touching end to end in the center of the house.”',
      niv: '“He placed the cherubim inside the innermost room of the temple, with their wings spread out. The wing of one cherub touched one wall, while the wing of the other touched the other wall, and their wings touched each other in the middle of the room.”',
      esv: '“He put the cherubim in the innermost part of the house. And the wings of the cherubim were spread out so that a wing of one touched the one wall, and a wing of the other cherub touched the other wall; their other wings touched each other in the middle of the house.”',
      kjv: '“And he set the cherubims within the inner house: and they stretched forth the wings of the cherubims, so that the wing of the one touched the one wall, and the wing of the other cherub touched the other wall; and their wings touched one another in the midst of the house.”',
    },
    note: 'Two cherubim of {olive}, each ten cubits high, with wings of five cubits, alike in size and form (6:23–26), overlaid with gold (6:28). They stood on their feet facing the {mainRoom} (2 Chronicles 3:13). Their look isn’t described, so they are drawn as plain standing winged figures. At the dedication the ark was set under their wings (8:6–7).',
    materials: ['olive', 'gold'],
    size: 'Each 10 cubits high, 10 from wing to wing (4.5 m)',
    look: { x: -53, n: 0, y: 5 }, cam: { x: -41.6, n: -9.6, y: 27 },
  },
  {
    title: 'Cherubim, Palms and Flowers', ref: '1 Kings 6:29', build: ['carvings', 'goldFloor'], cutaway: 'house',
    quote: {
      nasb: '“Then he carved all the surrounding walls of the house with engravings of cherubim, palm trees, and open flowers, for the inner and outer sanctuaries.”',
      niv: '“On the walls all around the temple, in both the inner and outer rooms, he carved cherubim, palm trees and open flowers.”',
      esv: '“Around all the walls of the house he carved engraved figures of cherubim and palm trees and open flowers, in the inner and outer rooms.”',
      kjv: '“And he carved all the walls of the house round about with carved figures of cherubims and palm trees and open flowers, within and without.”',
    },
    note: 'The floor too is overlaid with gold (6:30), and 2 Chronicles 3:5–7 adds palm trees and chains on the gold of the {mainRoom}, and gold on the beams, thresholds, walls and doors. How the carvings were laid out isn’t described; they are drawn in bands, a cherub between two palm trees, as in Ezekiel’s temple (Ezekiel 41:18).',
    materials: ['cedar', 'gold'],
    look: { x: -24, n: 6, y: 10 }, cam: { x: -6, n: -36, y: 14 },
  },
  {
    title: 'Doors of Olive Wood', ref: '1 Kings 6:32', build: ['innerDoors', 'veil'], cutaway: 'house',
    quote: {
      nasb: '“So he made two doors of olive wood, and he carved on them carvings of cherubim, palm trees, and open flowers, and overlaid them with gold; and he overlaid the cherubim and the palm trees with gold.”',
      niv: '“And on the two olive-wood doors he carved cherubim, palm trees and open flowers, and overlaid the cherubim and palm trees with hammered gold.”',
      esv: '“He covered the two doors of olivewood with carvings of cherubim, palm trees, and open flowers. He overlaid them with gold and spread gold on the cherubim and on the palm trees.”',
      kjv: '“The two doors also were of olive tree; and he carved upon them carvings of cherubims and palm trees and open flowers, and overlaid them with gold, and spread gold upon the cherubims, and upon the palm trees.”',
    },
    note: 'The lintel and doorposts of the {inner} were “five-sided” (6:31), perhaps a pointed frame or a fifth of the wall’s width; the doorway is drawn four cubits wide with a pointed top. They turned on hinges of gold (7:50). 2 Chronicles 3:14 also tells of a {veil} of {blue}, purple and crimson and fine linen, with cherubim worked on it; Kings tells only of the doors. Both are drawn, the doors open and the {veil} behind them.',
    materials: ['olive', 'gold'],
    size: 'Doorway width: a fifth of the wall?',
    look: { x: -40, n: 0, y: 6 }, cam: { x: -22, n: -26, y: 9 },
  },
  {
    title: 'The Doors of the {MainRoom}', ref: '1 Kings 6:33–34', build: ['outerDoors'],
    quote: {
      nasb: '“So too he made for the entrance of the main room four-sided doorposts of olive wood, and two doors of juniper wood; the two leaves of the one door turned on pivots, and the two leaves of the other door turned on pivots.”',
      niv: '“In the same way, for the entrance to the main hall he made doorframes out of olive wood that were one fourth of the width of the hall. He also made two doors out of juniper wood, each having two leaves that turned in sockets.”',
      esv: '“So also he made for the entrance to the nave doorposts of olivewood, in the form of a square, and two doors of cypress wood. The two leaves of the one door were folding, and the two leaves of the other door were folding.”',
      kjv: '“So also made he for the door of the temple posts of olive tree, a fourth part of the wall. And the two doors were of fir tree: the two leaves of the one door were folding, and the two leaves of the other door were folding.”',
    },
    note: 'Carved with cherubim, palm trees and open flowers and overlaid with gold fitted to the carving (6:35). The doorway is drawn five cubits wide, a fourth of the wall; its height isn’t given. Each door folds in two, so the doorway can open part way or all the way.',
    materials: ['olive', 'cypress', 'gold'],
    look: { x: 3, n: 0, y: 6 }, cam: { x: 46, n: -9, y: 11 },
  },
  {
    title: 'The Inner {Court}', ref: '1 Kings 6:36', build: ['court', 'greatCourt'],
    quote: {
      nasb: '“And he built the inner courtyard with three rows of cut stone and a row of cedar beams.”',
      niv: '“And he built the inner courtyard of three courses of dressed stone and one course of trimmed cedar beams.”',
      esv: '“He built the inner court with three courses of cut stone and one course of cedar beams.”',
      kjv: '“And he built the inner court with three rows of hewed stone, and a row of cedar beams.”',
    },
    note: 'Its size isn’t given; it is drawn twice the length and width of the tabernacle’s {court}. Chronicles calls it the {court} of the priests, and around it was the great {court}, with doors overlaid with {bronze} (2 Chronicles 4:9), built the same way (7:12). The great {court} also held Solomon’s palace, which took thirteen years to build (7:1); it isn’t shown.',
    materials: ['stone', 'cedar', 'bronze'],
    size: 'Not given · drawn 200 × 100 cubits (90 × 45 m)',
    look: { x: 0, n: -15, y: 0 }, cam: { x: 250, n: -250, y: 150 },
  },
  {
    title: '{Jachin} and Boaz', ref: '1 Kings 7:21', build: ['pillars', 'capitals', 'network', 'pomegranates'],
    quote: {
      nasb: '“And he set up the pillars at the porch of the main room: he set up the right pillar and named it Jachin, and he set up the left pillar and named it Boaz.”',
      niv: '“He erected the pillars at the portico of the temple. The pillar to the south he named Jakin and the one to the north Boaz.”',
      esv: '“He set up the pillars at the vestibule of the temple. He set up the pillar on the south and called its name Jachin, and he set up the pillar on the north and called its name Boaz.”',
      kjv: '“And he set up the pillars in the porch of the temple: and he set up the right pillar, and called the name thereof Jachin: and he set up the left pillar, and called the name thereof Boaz.”',
    },
    note: '{Hiram}, a bronze worker of Tyre whose mother was from Naphtali (7:13–14), cast two pillars eighteen cubits high and twelve round. On each he set a capital of five cubits, with lattice and chains, two rows of pomegranates, two hundred to a capital, and lily work at the top (7:15–22). 2 Chronicles 3:15 gives thirty-five cubits, perhaps the two together. Whether they held anything up isn’t said; they are drawn standing free.',
    materials: ['bronze'],
    size: '18 cubits high, 12 round (8 × 1.7 m) · {capitals} 5 cubits',
    made: '{Hiram} of Tyre (7:13–22)',
    look: { x: 21, n: 0, y: 15 }, cam: { x: 58, n: -24, y: 16 },
  },
  {
    title: { kjv: 'The Molten Sea', default: 'The Sea' }, ref: '1 Kings 7:23', build: ['oxen', 'sea'],
    quote: {
      nasb: '“He also made the Sea of cast metal ten cubits from brim to brim, circular in shape, and its height was five cubits, and it was thirty cubits in circumference.”',
      niv: '“He made the Sea of cast metal, circular in shape, measuring ten cubits from rim to rim and five cubits high. It took a line of thirty cubits to measure around it.”',
      esv: '“Then he made the sea of cast metal. It was round, ten cubits from brim to brim, and five cubits high, and a line of thirty cubits measured its circumference.”',
      kjv: '“And he made a molten sea, ten cubits from the one brim to the other: it was round all about, and his height was five cubits: and a line of thirty cubits did compass it round about.”',
    },
    note: 'It stands on twelve {oxen}, three facing each way, their rear parts inward (7:25), with two rows of gourds cast under the brim, a handbreadth thick, its brim like a lily (7:24–26). Kings says it held 2,000 baths, 2 Chronicles 4:5 says 3,000. It was for the priests to wash in (2 Chronicles 4:6), and stood at the south-east corner of the house (7:39).',
    materials: ['bronze'],
    size: '10 cubits across, 5 high (4.5 × 2.3 m)',
    made: '{Hiram} (7:23–26)',
    look: { x: 34, n: -38, y: 5 }, cam: { x: 52, n: -60, y: 13 },
  },
  {
    title: 'The {Stands} and {Basins}', ref: '1 Kings 7:38', build: ['stands', 'basins'],
    quote: {
      nasb: '“And he made ten basins of bronze, each holding forty baths; each basin was four cubits, and on each of the ten stands was one basin.”',
      niv: '“He then made ten bronze basins, each holding forty baths and measuring four cubits across, one basin to go on each of the ten stands.”',
      esv: '“And he made ten basins of bronze. Each basin held forty baths, each basin measured four cubits, and there was a basin for each of the ten stands.”',
      kjv: '“Then made he ten lavers of brass: one laver contained forty baths: and every laver was four cubits: and upon every one of the ten bases one laver.”',
    },
    note: 'Each stand is four cubits square and three high, with panels of lions, {oxen} and cherubim and wreaths, on four {bronze} wheels like a chariot’s, a cubit and a half high (7:27–37). Five stand on the south side of the house and five on the north (7:39). In the {basins} they rinsed what was used for the burnt offering (2 Chronicles 4:6). How each {basin} sat on its stand isn’t clear.',
    materials: ['bronze'],
    size: '{Stands} 4 × 4 × 3 cubits · {basins} 4 cubits across',
    made: '{Hiram} (7:27–39)',
    look: { x: -18, n: -33, y: 3 }, cam: { x: 6, n: -54, y: 11 },
  },
  {
    title: 'The {Bronze} Altar', ref: '2 Chronicles 4:1', build: ['altar'],
    quote: {
      nasb: '“Then he made a bronze altar, twenty cubits in length, twenty cubits in width, and ten cubits in height.”',
      niv: '“He made a bronze altar twenty cubits long, twenty cubits wide and ten cubits high.”',
      esv: '“He made an altar of bronze, twenty cubits long and twenty cubits wide and ten cubits high.”',
      kjv: '“Moreover he made an altar of brass, twenty cubits the length thereof, and twenty cubits the breadth thereof, and ten cubits the height thereof.”',
    },
    note: 'Kings leaves it out of the list, but calls it “the {bronze} altar that was before the LORD” (8:64). How the priests reached the top isn’t said; altars were not to have steps (Exodus 20:26), so none are drawn. All the {bronze} was cast in the clay ground of the Jordan valley, between Succoth and Zarethan, and there was too much of it to weigh (7:46–47).',
    materials: ['bronze'],
    size: '20 × 20 × 10 cubits (9 × 9 × 4.5 m)',
    look: { x: 50, n: 0, y: 5 }, cam: { x: 98, n: -36, y: 22 },
  },
  {
    title: 'The Gold Furnishings', ref: '1 Kings 7:48–49', build: ['tables', 'bread', 'lampstands', 'lamps'], cutaway: 'house',
    quote: {
      nasb: '“Solomon also made all the furniture that was in the house of the LORD: the golden altar and the golden table on which was set the bread of the Presence; and the lampstands of pure gold, five on the right side and five on the left, in front of the inner sanctuary…”',
      niv: '“Solomon also made all the furnishings that were in the LORD’s temple: the golden altar; the golden table on which was the bread of the Presence; the lampstands of pure gold (five on the right and five on the left, in front of the inner sanctuary)…”',
      esv: '“So Solomon made all the vessels that were in the house of the LORD: the golden altar, the golden table for the bread of the Presence, the lampstands of pure gold, five on the south side and five on the north, before the inner sanctuary…”',
      kjv: '“And Solomon made all the vessels that pertained unto the house of the LORD: the altar of gold, and the table of gold, whereupon the shewbread was, And the candlesticks of pure gold, five on the right side, and five on the left, before the oracle…”',
    },
    note: 'Kings tells of one table; 2 Chronicles 4:7–8 of ten tables and ten {lampstands}, five on each side, made as prescribed. Ten tables are drawn, with the bread on them (2 Chronicles 4:19), and {lampstands} like the tabernacle’s (Exodus 25:31–37). Their sizes aren’t given. With them came gold cups, snuffers, bowls, spoons and firepans (7:50).',
    materials: ['gold'],
    look: { x: -20, n: 2, y: 3 }, cam: { x: -2, n: -30, y: 10 },
  },
  {
    title: 'Seven Years', ref: '1 Kings 6:38', build: [],
    quote: {
      nasb: '“And in the eleventh year, in the month of Bul, that is, the eighth month, the house was finished in all its parts and in accordance with all its plans. So he was seven years in building it.”',
      niv: '“In the eleventh year in the month of Bul, the eighth month, the temple was finished in all its details according to its specifications. He had spent seven years building it.”',
      esv: '“And in the eleventh year, in the month of Bul, which is the eighth month, the house was finished in all its parts, and according to all its specifications. He was seven years in building it.”',
      kjv: '“And in the eleventh year, in the month Bul, which is the eighth month, was the house finished throughout all the parts thereof, and according to all the fashion of it. So was he seven years in building it.”',
    },
    note: 'When all the work was finished, Solomon brought in the silver, the gold and the vessels his father David had dedicated, and put them in the treasuries of the house of the LORD (7:51). The ark was brought in at the dedication, at the feast in the seventh month (8:1–6).',
    materials: ['stone', 'cedar', 'cypress', 'olive', 'gold', 'bronze'],
    look: { x: -5, n: -5, y: 10 }, cam: { x: 120, n: -95, y: 55 },
  },
];
