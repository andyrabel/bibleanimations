// Content for "The Priestly Garments".
// Plan coordinates: x = cubits east, n = cubits north, with the origin at the
// middle of the tabernacle's doorway (the tent runs west from x = 0). One
// world unit is one cubit (about 45 cm), as in the Tabernacle animation.
//
// The tour follows Leviticus 8:6-9, the order in which Moses washed Aaron and
// dressed him. Exodus 28 describes each garment and Exodus 39 tells how it was
// made; the notes draw on both.

// Text fields below are English. Any of them may be a plain string (the same in
// every English version) or an object keyed by version id (see VERSIONS in ../i18n.js),
// with an optional `default` used by versions not listed. Other languages are in
// lang/<lang>.js.

// Words that differ between versions. Any text field may contain {term}
// (or {Term} for a capital first letter) and gets the current version's word.
export const TERMS = {
  tunic: { esv: 'coat', kjv: 'coat', default: 'tunic' },
  sash: { kjv: 'girdle', default: 'sash' },
  band: { nasb: 'artistic band', niv: 'decorative waistband', esv: 'skillfully woven band', kjv: 'curious girdle' },
  breastpiece: { kjv: 'breastplate', default: 'breastpiece' },
  turban: { kjv: 'mitre', default: 'turban' },
  plate: { niv: 'gold plate', default: 'golden plate' },
  crown: { niv: 'sacred emblem', default: 'holy crown' },
  caps: { kjv: 'bonnets', default: 'caps' },
  undergarments: { kjv: 'linen breeches', default: 'linen undergarments' },
  blue: { nasb: 'violet', default: 'blue' },
  laver: { kjv: 'laver', default: 'basin' },
  tent: { kjv: 'tabernacle of the congregation', default: 'tent of meeting' },
  glory: { niv: 'to give them dignity and honor', default: '“for glory and for beauty”' },
  // The words engraved on the plate (Exodus 28:36).
  holy: { nasb: 'Holy to the LORD', niv: 'HOLY TO THE LORD', esv: 'Holy to the LORD', kjv: 'HOLINESS TO THE LORD' },
};

// Materials the popup lists for each stop; those the text doesn't name there are greyed out.
export const MATERIALS = {
  linen: 'Fine linen',
  yarn: '{Blue}, purple & scarlet',
  gold: 'Gold',
  stones: 'Precious stones',
};

// Where everyone stands. Aaron faces east, out of the doorway towards the
// court; Moses stands beside him to dress him; the four sons (28:1) wait to
// the south. The text doesn't give places, only "the doorway of the tent of
// meeting" (8:3-4).
export const PEOPLE = {
  aaron: { name: 'Aaron', x: 5, n: 0, face: { x: 12, n: 0 } },
  moses: { name: 'Moses', x: 5.75, n: 1.45, face: { x: 5, n: 0.2 } },
  nadab: { name: 'Nadab', x: 5.7, n: -2.6, face: { x: 12, n: 1 } },
  abihu: { name: 'Abihu', x: 5.3, n: -3.8, face: { x: 12, n: 1 } },
  eleazar: { name: 'Eleazar', x: 4.9, n: -5, face: { x: 12, n: 1 } },
  ithamar: { name: 'Ithamar', x: 4.5, n: -6.2, face: { x: 12, n: 1 } },
};

// Labels on Aaron's garments. Each shows while its group (made in main.js) is
// going on, and stays hidden until then.
export const PARTS = {
  tunic: { name: '{Tunic}', x: 5.3, n: -0.45, y: 0.75 },
  sash: { name: '{Sash}', x: 5.3, n: -0.42, y: 1.64 },
  robe: { name: 'Robe', x: 5.35, n: -0.5, y: 0.95 },
  ephod: { name: 'Ephod', x: 5.32, n: -0.36, y: 1.3 },
  onyx: { name: 'Onyx stones', x: 5.1, n: -0.3, y: 3.0 },
  band: { name: '{Band}', x: 5.33, n: 0.36, y: 1.52 },
  breastpiece: { name: '{Breastpiece}', x: 5.4, n: 0, y: 1.72 },
  urim: { name: 'Urim and Thummim', x: 5.36, n: 0.05, y: 2.45 },
  turban: { name: '{Turban}', x: 5, n: 0, y: 3.72 },
  plate: { name: { niv: 'Gold Plate', default: 'Golden Plate' }, x: 5.3, n: 0, y: 3.6 },
};

// The twelve stones of the breastpiece, row by row (28:17-20). Several
// identifications are uncertain, which is why the versions differ so much;
// the colours follow the NASB's names.
export const STONES = [
  { name: { nasb: 'ruby', niv: 'carnelian', esv: 'sardius', kjv: 'sardius' }, color: '#b0302a' },
  { name: { nasb: 'topaz', niv: 'chrysolite', default: 'topaz' }, color: '#d8c25a' },
  { name: { nasb: 'emerald', niv: 'beryl', default: 'carbuncle' }, color: '#3f9a5a' },
  { name: { esv: 'emerald', kjv: 'emerald', default: 'turquoise' }, color: '#2f9c8a' },
  { name: { niv: 'lapis lazuli', default: 'sapphire' }, color: '#2c4fb0' },
  { name: { niv: 'emerald', default: 'diamond' }, color: '#eef2f4' },
  { name: { kjv: 'ligure', default: 'jacinth' }, color: '#d07a2a' },
  { name: 'agate', color: '#9a8a7a' },
  { name: 'amethyst', color: '#7a3fa0' },
  { name: { niv: 'topaz', default: 'beryl' }, color: '#e0c860' },
  { name: 'onyx', color: '#262626' },
  { name: 'jasper', color: '#4f7f4a' },
];

// The sons of Israel in order of birth (28:10), in Hebrew, as engraved on the
// two onyx stones, six on each. The breastpiece has one name on each stone
// (28:21); the text doesn't give their order, so birth order is used there too.
export const NAMES_HE = ['ראובן', 'שמעון', 'לוי', 'יהודה', 'דן', 'נפתלי', 'גד', 'אשר', 'יששכר', 'זבולן', 'יוסף', 'בנימן'];
// "Holy to the LORD" (28:36), as engraved on the plate.
export const HOLY_HE = 'קדש ליהוה';

export const INTRO = {
  title: 'Holy Garments',
  ref: 'Exodus 28:2',
  quote: {
    nasb: '“And you shall make holy garments for Aaron your brother, for glory and for beauty.”',
    niv: '“Make sacred garments for your brother Aaron to give him dignity and honor.”',
    esv: '“And you shall make holy garments for Aaron your brother, for glory and for beauty.”',
    kjv: '“And thou shalt make holy garments for Aaron thy brother for glory and for beauty.”',
  },
  note: 'God told Moses to make garments for Aaron and his sons, so that they could serve Him as priests (28:1–4). Exodus 28 describes each piece and Exodus 39 tells how it was made. In Leviticus 8, at the doorway of the {tent}, with the whole congregation gathered, Moses washed Aaron and dressed him, one garment after another. This tour follows that order.',
  aside: 'Sizes are in cubits (1 cubit ≈ 45 cm) where the text gives them. Most shapes and lengths are not given, so those are a modest guess; the notes say where.',
};

export const FINALE = {
  title: { niv: 'Dignity and Honor', default: 'For Glory and for Beauty' },
  ref: 'Leviticus 8:13',
  quote: {
    nasb: '“Next Moses had Aaron’s sons come near, and he clothed them with tunics and wrapped their waists with sashes, and bound caps on them, just as the LORD had commanded Moses.”',
    niv: '“Then he brought Aaron’s sons forward, put tunics on them, tied sashes around them and fastened caps on them, as the LORD commanded Moses.”',
    esv: '“And Moses brought Aaron’s sons and clothed them with coats and tied sashes around their waists and bound caps on them, as the LORD commanded Moses.”',
    kjv: '“And Moses brought Aaron’s sons, and put coats upon them, and girded them with girdles, and put bonnets upon them; as the LORD commanded Moses.”',
  },
  note: 'Between dressing Aaron and his sons, Moses anointed the tabernacle and everything in it, and poured the anointing oil on Aaron’s head (8:10–12). The sons’ garments, too, were made {glory} (28:40). For seven days the priests stayed at the doorway of the {tent} until their ordination was complete (8:33–35).',
};

// Tour stops, in the order of Leviticus 8:6-9.
// build: groups (made in main.js) that go on during the flight in, one after another
// ('wash' walks everyone to the basin, 'walk' back to the doorway).
// dur: seconds for the flight in, where the default is too short.
// holdX: stay this many times longer than the reading time (the washing takes a while).
// look / cam: where the camera looks and where it sits ({ x, n } plan, y height).
// materials: keys of MATERIALS the text names for this garment.
// stones: show the twelve stones in the popup.
export const STOPS = [
  {
    title: 'The Washing', ref: 'Leviticus 8:6', build: ['wash'],
    quote: {
      nasb: '“Then Moses had Aaron and his sons come near, and he washed them with water.”',
      niv: '“Then Moses brought Aaron and his sons forward and washed them with water.”',
      esv: '“And Moses brought Aaron and his sons and washed them with water.”',
      kjv: '“And Moses brought Aaron and his sons, and washed them with water.”',
    },
    note: 'Moses brings Aaron and his four sons, Nadab, Abihu, Eleazar and Ithamar (Exodus 28:1), to the bronze {laver} between the {tent} and the altar, and washes them. The priests washed their hands and their feet from it, whenever they went in to serve (30:19–21; 40:31–32). The text doesn’t say how the water was drawn; here Moses pours it from a jug, over each man’s hands and then his feet. Under everything else, the priests wore {undergarments} reaching from the waist to the thighs (28:42–43).',
    materials: ['linen'],
    made: 'The skilled workers (39:28)',
    look: { x: 9.9, n: -0.6, y: 1.5 }, cam: { x: 3.3, n: -2.2, y: 4.3 }, holdX: 2.25,
  },
  {
    title: 'The {Tunic}', ref: 'Leviticus 8:7', build: ['walk', 'tunic'], dur: 9,
    quote: {
      nasb: '“Then he put the tunic on Aaron…”',
      niv: '“He put the tunic on Aaron…”',
      esv: '“And he put the coat on him…”',
      kjv: '“And he put upon him the coat…”',
    },
    note: 'The {tunic} goes on first, over the undergarments. It is fine linen, woven in a checkered pattern (28:39). Its length and sleeves are not described; it is drawn to the ankles. The same tunics were woven for Aaron’s sons (39:27).',
    materials: ['linen'],
    size: 'Not given',
    made: 'The skilled workers (39:27)',
    look: { x: 5, n: 0, y: 1.75 }, cam: { x: 10.4, n: -2, y: 2.5 },
  },
  {
    title: 'The {Sash}', ref: 'Leviticus 8:7', build: ['sash'],
    quote: {
      nasb: '“…and wrapped his waist with the sash…”',
      niv: '“…tied the sash around him…”',
      esv: '“…and tied the sash around his waist…”',
      kjv: '“…and girded him with the girdle…”',
    },
    note: 'Fine twisted linen and {blue}, purple and scarlet yarn, the work of an embroiderer (28:39; 39:29). The text doesn’t say how long it was or how it was tied; here it wraps the waist with its ends hanging in front. The robe goes on over it.',
    materials: ['linen', 'yarn'],
    size: 'Not given',
    made: 'The embroiderers (39:29)',
    look: { x: 5, n: 0, y: 1.55 }, cam: { x: 8.3, n: -1.5, y: 2.05 },
  },
  {
    title: 'The Robe', ref: 'Leviticus 8:7', build: ['robe', 'hem'],
    quote: {
      nasb: '“…and clothed him with the robe…”',
      niv: '“…clothed him with the robe…”',
      esv: '“…and clothed him with the robe…”',
      kjv: '“…and clothed him with the robe…”',
    },
    note: 'The robe of the ephod is all {blue}, woven in one piece, with an opening for the head bound by a woven edge so that it would not tear (28:31–32; 39:22–23). Round its hem hang pomegranates of {blue}, purple and scarlet, with a gold bell between each (28:33–34). The bells were to be heard when Aaron went into the holy place and came out, so that he would not die (28:35). No length or number is given: it is drawn to the calf, with 18 of each.',
    materials: ['yarn', 'linen', 'gold'],
    size: 'Not given',
    made: 'The weavers (39:22–26)',
    look: { x: 5, n: 0, y: 1.4 }, cam: { x: 10, n: -2.6, y: 2.1 },
  },
  {
    title: 'The Ephod', ref: 'Leviticus 8:7', build: ['ephod', 'onyx', 'band'],
    quote: {
      nasb: '“…and put the ephod on him; and he wrapped his waist with the artistic band of the ephod, with which he fitted it to him.”',
      niv: '“…and put the ephod on him. He also fastened the ephod with a decorative waistband, which he tied around him.”',
      esv: '“…and put the ephod on him and tied the skillfully woven band of the ephod around him, binding it to him with the band.”',
      kjv: '“…and put the ephod upon him, and he girded him with the curious girdle of the ephod, and bound it unto him therewith.”',
    },
    note: 'Gold, {blue}, purple and scarlet yarn and fine twisted linen, skilfully worked (28:6); the gold was beaten thin and cut into threads to weave in (39:3). Two shoulder pieces join it front and back, and its {band} is of the same work (28:7–8). On each shoulder, an onyx stone in a gold setting is engraved with six names of the sons of Israel, in order of birth, so that Aaron bears their names before the LORD (28:9–12). The ephod’s shape isn’t given; here it covers the body from chest to hips.',
    materials: ['gold', 'yarn', 'linen', 'stones'],
    made: 'The skilled workers (39:2–7)',
    look: { x: 5, n: 0, y: 2.1 }, cam: { x: 8.3, n: -1.9, y: 2.95 },
  },
  {
    title: 'The {Breastpiece}', ref: 'Leviticus 8:8', build: ['breastpiece', 'stones', 'chains'], stones: true,
    quote: {
      nasb: '“He then placed the breastpiece on him…”',
      niv: '“He placed the breastpiece on him…”',
      esv: '“And he placed the breastpiece on him…”',
      kjv: '“And he put the breastplate upon him…”',
    },
    note: 'Made like the ephod and folded double into a square, a span each way (28:15–16). It holds twelve stones in four rows, each in a gold setting and engraved with the name of one of the tribes, so that Aaron carries their names over his heart (28:17–21, 29). Gold chains tie its top corners to the shoulder settings, and a {blue} cord ties its lower rings to the ephod just above the band, so that it does not come loose (28:22–28). The text doesn’t give the order of the names; birth order is used here.',
    materials: ['gold', 'yarn', 'linen', 'stones'],
    size: 'A span square, about 22 cm, folded double',
    made: 'The skilled workers (39:8–21)',
    look: { x: 5.3, n: 0, y: 2.18 }, cam: { x: 7.25, n: -0.75, y: 2.5 },
  },
  {
    title: 'The Urim and Thummim', ref: 'Leviticus 8:8', build: ['urim'],
    quote: {
      nasb: '“…and in the breastpiece he put the Urim and the Thummim.”',
      niv: '“…and put the Urim and Thummim in the breastpiece.”',
      esv: '“…and in the breastpiece he put the Urim and the Thummim.”',
      kjv: '“…also he put in the breastplate the Urim and the Thummim.”',
    },
    note: 'They go inside the folded {breastpiece}, to be over Aaron’s heart when he goes in before the LORD (28:30). Through them the priest sought the LORD’s decisions for Israel (Numbers 27:21). The text never says what they were made of or what they looked like, so here they are only two plain shapes slipped into the pouch.',
    materials: [],
    size: 'Not described',
    look: { x: 5.3, n: 0, y: 2.28 }, cam: { x: 6.95, n: 0.55, y: 2.75 },
  },
  {
    title: 'The {Turban}', ref: 'Leviticus 8:9', build: ['turban'],
    quote: {
      nasb: '“He also placed the turban on his head…”',
      niv: '“Then he placed the turban on Aaron’s head…”',
      esv: '“And he set the turban on his head…”',
      kjv: '“And he put the mitre upon his head…”',
    },
    note: 'Fine linen (28:39; 39:28). Its shape isn’t described; it is drawn as a long cloth wound round the head. Aaron’s sons wore {caps} instead (28:40).',
    materials: ['linen'],
    size: 'Not given',
    made: 'The skilled workers (39:28)',
    look: { x: 5, n: 0, y: 3.18 }, cam: { x: 7.5, n: -1.15, y: 3.5 },
  },
  {
    title: { niv: 'The Gold Plate', default: 'The Golden Plate' }, ref: 'Leviticus 8:9', build: ['plate'],
    quote: {
      nasb: '“…and on the turban, at its front, he placed the golden plate, the holy crown, just as the LORD had commanded Moses.”',
      niv: '“…and set the gold plate, the sacred emblem, on the front of it, as the LORD commanded Moses.”',
      esv: '“…and on the turban, in front, he set the golden plate, the holy crown, as the LORD commanded Moses.”',
      kjv: '“…also upon the mitre, even upon his forefront, did he put the golden plate, the holy crown; as the LORD commanded Moses.”',
    },
    note: 'Pure gold, engraved like a seal with the words “{holy}” (28:36; 39:30), shown here in Hebrew. A {blue} cord ties it to the front of the {turban} (28:37), so that it rests on Aaron’s forehead: he bears the guilt of the holy gifts Israel brings, so that they are accepted before the LORD (28:38). Its size isn’t given.',
    materials: ['gold', 'yarn'],
    size: 'Not given',
    made: 'The skilled workers (39:30–31)',
    look: { x: 5.25, n: 0, y: 3.26 }, cam: { x: 6.75, n: -0.45, y: 3.42 },
  },
];
