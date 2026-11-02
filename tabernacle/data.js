// Content for "The Tabernacle".
// Plan coordinates: x = cubits east, n = cubits north, with the origin at the
// centre of the court. One world unit is one cubit (about 45 cm), so the
// sizes in the text can be used directly.
//
// The tour follows Exodus 40:17-33, the order in which Moses set the
// tabernacle up: bases, boards, curtains and coverings, then the furniture
// from the ark outwards, and the court last.

// Bible versions offered. Any text field below may be a plain string (the same
// in every version) or an object keyed by version id, with an optional
// `default` used by versions not listed. A version with a `link` must show it
// beside its notice.
export const VERSIONS = {
  nasb: {
    abbr: 'NASB', name: 'New American Standard Bible (2020)',
    notice: 'Scripture quotations taken from the (NASB®) New American Standard Bible®, Copyright © 1960, 1971, 1977, 1995, 2020 by The Lockman Foundation. Used by permission. All rights reserved.',
    link: 'https://www.Lockman.org',
  },
  niv: {
    abbr: 'NIV', name: 'New International Version',
    notice: 'Scripture quotations taken from The Holy Bible, New International Version® NIV®. Copyright © 1973, 1978, 1984, 2011 by Biblica, Inc.® Used by permission. All rights reserved worldwide.',
  },
  esv: {
    abbr: 'ESV', name: 'English Standard Version',
    notice: 'Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved.',
  },
  kjv: {
    abbr: 'KJV', name: 'King James Version',
    notice: 'Scripture quotations are from the King James Version (KJV), which is in the public domain.',
  },
};
export const DEFAULT_VERSION = 'nasb';

// Words that differ between versions. Any text field may contain {term}
// (or {Term} for a capital first letter) and gets the current version's word.
export const TERMS = {
  bases: { kjv: 'sockets', default: 'bases' },
  boards: { niv: 'frames', esv: 'frames', default: 'boards' },
  board: { niv: 'frame', esv: 'frame', default: 'board' },
  bars: { niv: 'crossbars', default: 'bars' },
  pillars: { niv: 'posts', default: 'pillars' },
  acacia: { kjv: 'shittim wood', default: 'acacia wood' },
  bronze: { kjv: 'brass', default: 'bronze' },
  blue: { nasb: 'violet', default: 'blue' },
  cover: { nasb: 'atoning cover', niv: 'atonement cover', default: 'mercy seat' },
  ark: { niv: 'ark of the covenant law', default: 'ark of the testimony' },
  veil: { niv: 'shielding curtain', kjv: 'vail', default: 'veil' },
  lampstand: { kjv: 'candlestick', default: 'lampstand' },
  laver: { kjv: 'laver', default: 'basin' },
  court: { nasb: 'courtyard', niv: 'courtyard', default: 'court' },
  tent: { kjv: 'tabernacle of the congregation', default: 'tent of meeting' },
  clasps: { kjv: 'taches', default: 'clasps' },
  bread: { kjv: 'shewbread', default: 'bread of the Presence' },
  goatsHair: { niv: 'goat hair', default: 'goats’ hair' },
  rams: { esv: 'tanned rams’ skins', niv: 'ram skins dyed red', default: 'rams’ skins dyed red' },
  outer: { nasb: 'fine leather', niv: 'the other durable leather', esv: 'goatskins', kjv: 'badgers’ skins' },
  bezalel: { kjv: 'Bezaleel', default: 'Bezalel' },
  oholiab: { kjv: 'Aholiab', default: 'Oholiab' },
};

// Materials the popup lists for each stop; those the text doesn't use there are greyed out.
export const MATERIALS = {
  acacia: '{Acacia}',
  gold: 'Gold',
  silver: 'Silver',
  bronze: '{Bronze}',
  linen: 'Fine linen',
  yarn: '{Blue}, purple & scarlet',
};

// The tent: boards stand on x from TENT.west to TENT.east, n from -TENT.half to TENT.half
// (inner faces), TENT.height high. The veil hangs at TENT.veil.
export const TENT = { west: -30, east: 0, half: 5, height: 10, veil: -20 };
export const COURT = { west: -50, east: 50, half: 25, height: 5, gate: 10 };

// Where the furniture stands. Exodus gives the sides (40:22-30); exact spots
// within the Holy Place and the court are a guess.
export const PLACES = {
  ark: { x: -25, n: 0 },
  table: { x: -10, n: 3 },
  lampstand: { x: -10, n: -3 },
  incense: { x: -17.5, n: 0 },
  laver: { x: 12, n: 0 },
  altar: { x: 25, n: 0 },
};

// Labelled things. kind: 'item' (boxed), 'feature' (small), 'region' (large),
// 'mount' (large, italic). `group` hides the label until that piece is built.
export const FEATURES = {
  ark: { name: { niv: 'Ark of the Covenant Law', default: 'Ark of the Testimony' }, x: -25, n: 0, lift: 5.5, kind: 'item', group: 'ark' },
  table: { name: { kjv: 'Table of Shewbread', default: 'Table' }, x: -10, n: 3, lift: 4, kind: 'item', group: 'table' },
  lampstand: { name: '{Lampstand}', x: -10, n: -3, lift: 5.5, kind: 'item', group: 'lampstand' },
  incense: { name: { esv: 'Golden Altar', kjv: 'Golden Altar', default: 'Gold Altar' }, x: -17.5, n: 0, lift: 4, kind: 'item', group: 'incense' },
  veil: { name: { niv: 'Shielding Curtain', kjv: 'Vail', default: 'Veil' }, x: -20, n: 0, lift: 11.5, kind: 'item', group: 'veil' },
  screen: {
    name: { nasb: 'Doorway Curtain', niv: 'Entrance Curtain', esv: 'Screen for the Door', kjv: 'Hanging for the Door' },
    x: 0, n: 0, lift: 11.5, kind: 'item', group: 'screen',
  },
  altar: { name: 'Altar of Burnt Offering', x: 25, n: 0, lift: 7, kind: 'item', group: 'altar' },
  laver: { name: '{Laver}', x: 12, n: 0, lift: 6, kind: 'item', group: 'laver' },
  gate: {
    name: { nasb: 'Gate of the Courtyard', niv: 'Entrance to the Courtyard', esv: 'Gate of the Court', kjv: 'Court Gate' },
    x: 50, n: 0, lift: 8.5, kind: 'item', group: 'gate',
  },
  holyPlace: { name: 'Holy Place', x: -10, n: 0, lift: 14, kind: 'feature', group: 'goathair' },
  mostHoly: { name: 'Most Holy Place', x: -25, n: 0, lift: 14, kind: 'feature', group: 'goathair' },
  sinai: { name: 'Mount Sinai', x: -350, n: -2200, lift: 560, kind: 'mount' },
};

// The camp (Numbers 2-3): four camps of three tribes, each under its flag,
// round the tabernacle "at a distance" (2:2), with the Levites between them and
// the tabernacle. `men` is the census of each tribe (2:4-30); one tent stands
// for every thousand. Numbers gives each tribe's side, not its place within
// the side, so the leading tribe is put in the middle (`place` 0).
export const TRIBES = [
  { name: 'Judah', side: 'east', place: 0, men: 74600 },
  { name: 'Issachar', side: 'east', place: -1, men: 54400 },
  { name: 'Zebulun', side: 'east', place: 1, men: 57400 },
  { name: 'Reuben', side: 'south', place: 0, men: 46500 },
  { name: 'Simeon', side: 'south', place: -1, men: 59300 },
  { name: 'Gad', side: 'south', place: 1, men: 45650 },
  { name: 'Ephraim', side: 'west', place: 0, men: 40500 },
  { name: 'Manasseh', side: 'west', place: -1, men: 32200 },
  { name: 'Benjamin', side: 'west', place: 1, men: 35400 },
  { name: 'Dan', side: 'north', place: 0, men: 62700 },
  { name: 'Asher', side: 'north', place: -1, men: 41500 },
  { name: 'Naphtali', side: 'north', place: 1, men: 53400 },
];
// The Levites camp next to the tabernacle (Numbers 3:23-38); one tent for every 500 males counted.
export const LEVITES = [
  { name: 'Gershonites', side: 'west', count: 7500 },
  { name: 'Kohathites', side: 'south', count: 8600 },
  { name: 'Merarites', side: 'north', count: 6200 },
  { name: 'Moses, Aaron & his sons', side: 'east', tents: 4 },
];

export const INTRO = {
  title: 'The Wilderness of Sinai',
  ref: 'Exodus 25:8',
  quote: {
    nasb: '“Have them construct a sanctuary for Me, so that I may dwell among them.”',
    niv: '“Then have them make a sanctuary for me, and I will dwell among them.”',
    esv: '“And let them make me a sanctuary, that I may dwell in their midst.”',
    kjv: '“And let them make me a sanctuary; that I may dwell among them.”',
  },
  note: 'On the mountain, God showed Moses the pattern of a sanctuary that could be carried (25:9, 40). Chapters 25–31 give the instructions and chapters 35–39 tell how the people made each piece. In chapter 40 Moses set it all up in one day, in a set order. This tour follows that order, and each piece goes up as we arrive.',
  aside: 'Everything is drawn to the sizes the text gives, in cubits (1 cubit ≈ 45 cm). Where the text gives no size or position, as for the {lampstand} and the {laver}, the model is a modest guess.',
};

export const FINALE = {
  title: 'The Glory of the LORD',
  ref: 'Exodus 40:34',
  quote: {
    nasb: '“Then the cloud covered the tent of meeting, and the glory of the LORD filled the tabernacle.”',
    niv: '“Then the cloud covered the tent of meeting, and the glory of the LORD filled the tabernacle.”',
    esv: '“Then the cloud covered the tent of meeting, and the glory of the LORD filled the tabernacle.”',
    kjv: '“Then a cloud covered the tent of the congregation, and the glory of the LORD filled the tabernacle.”',
  },
  note: 'Moses could not go into the {tent}, because the cloud had settled on it (40:35). From then on the cloud over the tabernacle by day, and fire in it by night, told Israel when to set out and when to stay (40:36–38).',
};

// Tour stops, in the order of Exodus 40.
// build: groups (made in main.js) that go up on the way in, one after another.
// look / cam: where the camera looks and where it sits ({ x, n } plan, y height).
// cutaway: fade the coverings and the south wall so the inside can be seen.
// materials: keys of MATERIALS the text uses for this stop.
export const STOPS = [
  {
    title: 'The {Bases}', ref: '40:17–18', build: ['bases'],
    quote: {
      nasb: '“Now in the first month of the second year, on the first day of the month, the tabernacle was erected.”',
      niv: '“So the tabernacle was set up on the first day of the first month in the second year.”',
      esv: '“In the first month in the second year, on the first day of the month, the tabernacle was erected.”',
      kjv: '“And it came to pass in the first month in the second year, on the first day of the month, that the tabernacle was reared up.”',
    },
    note: 'Almost a year after leaving Egypt, Moses sets up the tabernacle, starting with the {bases}. Two silver {bases} go under every {board}: a hundred in all, counting the four under the {pillars} of the {veil}. Each was cast from a talent of silver given as ransom money by the men counted in the census (30:11–16; 38:25–27). The five {pillars} at the doorway stand on {bronze} {bases} (26:37).',
    materials: ['silver', 'bronze'],
    size: 'A talent each, about 34 kg · 100 of silver, 5 of {bronze}',
    look: { x: -14, n: 0, y: 0 }, cam: { x: 8, n: -26, y: 16 },
  },
  {
    title: 'The {Boards} and {Bars}', ref: '40:18', build: ['boards', 'bars', 'pillars'],
    quote: {
      nasb: '“Moses erected the tabernacle and laid its bases, and set up its boards, and inserted its bars, and erected its pillars.”',
      niv: '“When Moses set up the tabernacle, he put the bases in place, erected the frames, inserted the crossbars and set up the posts.”',
      esv: '“Moses erected the tabernacle. He laid its bases, and set up its frames, and put in its poles, and raised up its pillars.”',
      kjv: '“And Moses reared up the tabernacle, and fastened his sockets, and set up the boards thereof, and put in the bars thereof, and reared up his pillars.”',
    },
    note: 'Each {board} is {acacia} overlaid with gold, ten cubits tall and a cubit and a half wide (26:16, 29). Twenty stand on the south side, twenty on the north and six at the back, with two more at the rear corners (26:18–23). Five {bars} on each side hold them together; the middle one runs from end to end (26:26–28). Then the {pillars} go up: four for the {veil} and five for the doorway.',
    materials: ['acacia', 'gold'],
    size: 'Each {board} 10 × 1½ cubits (4.5 × 0.7 m) · 48 in all',
    made: 'The skilled workers (36:8, 20–38)',
    look: { x: -15, n: 0, y: 4 }, cam: { x: 12, n: -30, y: 18 },
  },
  {
    title: 'The Curtains', ref: '26:1–6', build: ['linen'],
    quote: {
      nasb: '“Moreover, you shall make the tabernacle with ten curtains of fine twisted linen and violet, purple, and scarlet material; you shall make them with cherubim, the work of a skilled embroiderer.”',
      niv: '“Make the tabernacle with ten curtains of finely twisted linen and blue, purple and scarlet yarn, with cherubim woven into them by a skilled worker.”',
      esv: '“Moreover, you shall make the tabernacle with ten curtains of fine twined linen and blue and purple and scarlet yarns; you shall make them with cherubim skillfully worked into them.”',
      kjv: '“Moreover thou shalt make the tabernacle with ten curtains of fine twined linen, and blue, and purple, and scarlet: with cherubims of cunning work shalt thou make them.”',
    },
    note: 'Strictly, “the tabernacle” is these ten linen curtains (26:1). Each is 28 cubits by 4. They are sewn into two sets of five, and fifty gold {clasps} join the two sets (26:3–6). Spread over the {boards}, they make the ceiling, and from inside the woven cherubim are seen overhead.',
    materials: ['linen', 'yarn', 'gold'],
    size: 'Ten curtains, each 28 × 4 cubits (12.6 × 1.8 m)',
    made: 'The skilled workers (36:8–13)',
    look: { x: -15, n: 0, y: 7 }, cam: { x: 10, n: -28, y: 24 },
  },
  {
    title: 'The Tent and Its Coverings', ref: '40:19', build: ['goathair', 'skins'],
    quote: {
      nasb: '“And he spread the tent over the tabernacle and put the covering of the tent on top of it, just as the LORD had commanded Moses.”',
      niv: '“Then he spread the tent over the tabernacle and put the covering over the tent, as the LORD commanded him.”',
      esv: '“And he spread the tent over the tabernacle and put the covering of the tent over it, as the LORD had commanded Moses.”',
      kjv: '“And he spread abroad the tent over the tabernacle, and put the covering of the tent above upon it; as the LORD commanded Moses.”',
    },
    note: 'Over the linen goes a tent of eleven curtains of {goatsHair}, each 30 cubits by 4, joined with {bronze} {clasps}; the sixth is folded double at the front (26:7–11). On top go two more coverings, {rams} and {outer} (26:14). No sizes are given for these two, so they are drawn over the roof only. This is the first of seven times chapter 40 says Moses did it as the LORD commanded.',
    materials: ['bronze'],
    size: '{GoatsHair}: eleven curtains, each 30 × 4 cubits (13.5 × 1.8 m)',
    made: 'The skilled workers (36:14–19)',
    look: { x: -15, n: 0, y: 5 }, cam: { x: 20, n: -32, y: 14 },
  },
  {
    title: 'The Ark', ref: '40:20', build: ['ark', 'tablets', 'poles', 'cover'], cutaway: true,
    quote: {
      nasb: '“Then he took the testimony and put it into the ark, and attached the poles to the ark, and put the atoning cover on top of the ark.”',
      niv: '“He took the tablets of the covenant law and placed them in the ark, attached the poles to the ark and put the atonement cover over it.”',
      esv: '“He took the testimony and put it into the ark, and put the poles on the ark and set the mercy seat above on the ark.”',
      kjv: '“And he took and put the testimony into the ark, and set the staves on the ark, and put the mercy seat above upon the ark.”',
    },
    note: 'A chest of {acacia} overlaid with pure gold inside and out, with a gold moulding and four gold rings for the poles (25:10–15). Inside go the two stone tablets (31:18). Its lid, the {cover}, is pure gold, with two gold cherubim of one piece with it, facing each other, wings spread over it (25:17–20). God promised to meet Moses there, between the cherubim (25:22).',
    materials: ['acacia', 'gold'],
    size: '2½ × 1½ × 1½ cubits (1.1 × 0.7 × 0.7 m)',
    made: '{Bezalel} (37:1–9)',
    look: { x: -25, n: 0, y: 1.2 }, cam: { x: -21, n: -7.5, y: 5 },
  },
  {
    title: { niv: 'The Shielding Curtain', kjv: 'The Vail', default: 'The Veil' }, ref: '40:21', build: ['veil'], cutaway: true,
    quote: {
      nasb: '“He then brought the ark into the tabernacle, and set up a veil for the covering, and screened off the ark of the testimony, just as the LORD had commanded Moses.”',
      niv: '“Then he brought the ark into the tabernacle and hung the shielding curtain and shielded the ark of the covenant law, as the LORD commanded him.”',
      esv: '“And he brought the ark into the tabernacle and set up the veil of the screen, and screened the ark of the testimony, as the LORD had commanded Moses.”',
      kjv: '“And he brought the ark into the tabernacle, and set up the vail of the covering, and covered the ark of the testimony; as the LORD commanded Moses.”',
    },
    note: 'The {veil} is {blue}, purple and scarlet yarn and fine linen, worked with cherubim (26:31). It hangs from gold hooks on the four {pillars}, under the {clasps} (26:32–33), and divides the Holy Place from the Most Holy Place, a cube ten cubits each way. Only the high priest went behind it, once a year (Leviticus 16).',
    materials: ['linen', 'yarn', 'gold'],
    size: 'Most Holy Place 10 × 10 × 10 cubits (4.5 m each way)',
    look: { x: -20, n: 0, y: 4.5 }, cam: { x: -5, n: -15, y: 9 },
  },
  {
    title: 'The Table', ref: '40:22–23', build: ['table', 'bread'], cutaway: true,
    quote: {
      nasb: '“He also put the table in the tent of meeting on the north side of the tabernacle, outside the veil. And he set the arrangement of bread in order on it before the LORD…”',
      niv: '“Moses placed the table in the tent of meeting on the north side of the tabernacle outside the curtain and set out the bread on it before the LORD…”',
      esv: '“He put the table in the tent of meeting, on the north side of the tabernacle, outside the veil, and arranged the bread on it before the LORD…”',
      kjv: '“And he put the table in the tent of the congregation, upon the side of the tabernacle northward, without the vail. And he set the bread in order upon it before the LORD…”',
    },
    note: '{Acacia} overlaid with pure gold, with a gold moulding, a rim a handbreadth wide, and rings for its poles (25:23–28). On it the {bread} was kept before the LORD at all times (25:30). Leviticus 24:5–6 gives twelve loaves, set in two rows of six.',
    materials: ['acacia', 'gold'],
    size: '2 × 1 × 1½ cubits (90 × 45 × 70 cm)',
    made: '{Bezalel} (37:10–16)',
    look: { x: -10, n: 2.5, y: 1.2 }, cam: { x: -6.5, n: -7, y: 5 },
  },
  {
    title: 'The {Lampstand}', ref: '40:24–25', build: ['lampstand', 'lamps'], cutaway: true,
    quote: {
      nasb: '“Then he placed the lampstand in the tent of meeting, opposite the table, on the south side of the tabernacle. And he lighted the lamps before the LORD…”',
      niv: '“He placed the lampstand in the tent of meeting opposite the table on the south side of the tabernacle and set up the lamps before the LORD…”',
      esv: '“He put the lampstand in the tent of meeting, opposite the table on the south side of the tabernacle, and set up the lamps before the LORD…”',
      kjv: '“And he put the candlestick in the tent of the congregation, over against the table, on the side of the tabernacle southward. And he lighted the lamps before the LORD…”',
    },
    note: 'Hammered from a talent of pure gold: a central shaft with three branches on each side, decorated with cups shaped like almond blossoms (25:31–39). Its seven lamps give light to the space in front of it (25:37), the only light in the Holy Place. No height is given.',
    materials: ['gold'],
    size: 'Height not given · a talent of gold, about 34 kg',
    made: '{Bezalel} (37:17–24)',
    look: { x: -10, n: -2.5, y: 2.5 }, cam: { x: -3, n: -12, y: 6 },
  },
  {
    title: { esv: 'The Golden Altar', kjv: 'The Golden Altar', default: 'The Gold Altar' }, ref: '40:26–27', build: ['incense', 'smoke'], cutaway: true,
    quote: {
      nasb: '“Then he placed the gold altar in the tent of meeting in front of the veil; and he burned fragrant incense on it…”',
      niv: '“Moses placed the gold altar in the tent of meeting in front of the curtain and burned fragrant incense on it…”',
      esv: '“He put the golden altar in the tent of meeting before the veil, and burned fragrant incense on it…”',
      kjv: '“And he put the golden altar in the tent of the congregation before the vail: and he burnt sweet incense thereon…”',
    },
    note: 'The altar of incense: {acacia} overlaid with pure gold, with horns at its corners, a gold moulding and rings for poles (30:1–5). It stands in front of the {veil}, before the ark behind it (30:6). Incense was burned on it every morning and evening, when the lamps were tended (30:7–8).',
    materials: ['acacia', 'gold'],
    size: '1 × 1 × 2 cubits (45 × 45 × 90 cm)',
    made: '{Bezalel} (37:25–28)',
    look: { x: -17.5, n: 0, y: 1.8 }, cam: { x: -12.5, n: -8.5, y: 5.5 },
  },
  {
    title: { nasb: 'The Doorway Curtain', niv: 'The Entrance Curtain', esv: 'The Screen for the Door', kjv: 'The Hanging for the Door' },
    ref: '40:28', build: ['screen'],
    quote: {
      nasb: '“Then he set up the curtain for the doorway of the tabernacle.”',
      niv: '“Then he put up the curtain at the entrance to the tabernacle.”',
      esv: '“He put in place the screen for the door of the tabernacle.”',
      kjv: '“And he set up the hanging at the door of the tabernacle.”',
    },
    note: 'The tabernacle faces east, with its back to the west (26:22). The doorway is closed by a curtain of {blue}, purple and scarlet yarn and fine linen, embroidered but without the cherubim of the {veil} (26:36). It hangs from gold hooks on five {pillars} overlaid with gold, on {bronze} {bases} (26:37).',
    materials: ['linen', 'yarn', 'gold'],
    look: { x: 0, n: 0, y: 5 }, cam: { x: 19, n: -9, y: 7 },
  },
  {
    title: 'The Altar of Burnt Offering', ref: '40:29', build: ['altar', 'fire'],
    quote: {
      nasb: '“And he set the altar of burnt offering in front of the doorway of the tabernacle of the tent of meeting, and offered on it the burnt offering and the meal offering…”',
      niv: '“He set the altar of burnt offering near the entrance to the tabernacle, the tent of meeting, and offered on it burnt offerings and grain offerings…”',
      esv: '“And he set the altar of burnt offering at the entrance of the tabernacle of the tent of meeting, and offered on it the burnt offering and the grain offering…”',
      kjv: '“And he put the altar of burnt offering by the door of the tabernacle of the tent of the congregation, and offered upon it the burnt offering and the meat offering…”',
    },
    note: 'A hollow box of {acacia} boards overlaid with {bronze}, with a horn at each corner, a {bronze} grating halfway down, and rings and poles for carrying (27:1–8). It stands in the open, before the doorway. How far from the door is not given.',
    materials: ['acacia', 'bronze'],
    size: '5 × 5 × 3 cubits (2.3 × 2.3 × 1.4 m)',
    made: '{Bezalel} (38:1–7)',
    look: { x: 24, n: 0, y: 2 }, cam: { x: 38, n: -13, y: 9 },
  },
  {
    title: 'The {Laver}', ref: '40:30–32', build: ['laver', 'water', 'priests'],
    quote: {
      nasb: '“He placed the basin between the tent of meeting and the altar, and put water in it for washing. From it Moses and Aaron and his sons washed their hands and their feet.”',
      niv: '“He placed the basin between the tent of meeting and the altar and put water in it for washing, and Moses and Aaron and his sons used it to wash their hands and feet.”',
      esv: '“He set the basin between the tent of meeting and the altar, and put water in it for washing, with which Moses and Aaron and his sons washed their hands and their feet.”',
      kjv: '“And he set the laver between the tent of the congregation and the altar, and put water there, to wash withal. And Moses and Aaron and his sons washed their hands and their feet thereat…”',
    },
    note: '{Bronze}, on a {bronze} stand, made from the mirrors of the women who served at the entrance of the {tent} (38:8). The priests washed here whenever they went into the tent or came near the altar (30:19–21). No size or shape is given. Aaron wears the high priest’s garments (28:4–39): a checkered linen tunic; the robe of {blue}, with gold bells and pomegranates round its hem; the ephod, with an onyx stone on each shoulder; the breastpiece with twelve stones, one for each tribe; and the linen turban with its gold plate. His sons wear linen tunics, sashes and caps (28:40).',
    materials: ['bronze'],
    size: 'Size and shape not given',
    made: '{Bezalel} (38:8)',
    look: { x: 13.4, n: -0.8, y: 2.4 }, cam: { x: 19.5, n: -7.5, y: 4.6 },
  },
  {
    title: 'The {Court}', ref: '40:33', build: ['courtPillars', 'hangings', 'gate'],
    quote: {
      nasb: '“And he erected the courtyard all around the tabernacle and the altar, and hung up the curtain for the gate of the courtyard. So Moses finished the work.”',
      niv: '“Then Moses set up the courtyard around the tabernacle and altar and put up the curtain at the entrance to the courtyard. And so Moses finished the work.”',
      esv: '“And he erected the court around the tabernacle and the altar, and set up the screen of the gate of the court. So Moses finished the work.”',
      kjv: '“And he reared up the court round about the tabernacle and the altar, and set up the hanging of the court gate. So Moses finished the work.”',
    },
    note: 'A hundred cubits by fifty, closed by hangings of fine linen five cubits high on {pillars} with {bronze} {bases} and silver hooks and bands, held by {bronze} pegs and cords (27:9–19; 35:18). The entrance on the east is twenty cubits wide, with a curtain of {blue}, purple and scarlet (27:16). Sixty {pillars}, five cubits apart, fit the counts given for each side.',
    materials: ['linen', 'yarn', 'silver', 'bronze'],
    size: '100 × 50 cubits (45 × 22.5 m)',
    made: '{Bezalel} (38:9–20)',
    look: { x: 0, n: 0, y: 2 }, cam: { x: 78, n: -58, y: 42 },
  },
];
